import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients, brewPotion, clearBrewResult } from "../features/recipes/recipeSlice.js";
import { fetchMe } from "../features/auth/authSlice.js";
import IngredientCard from "../components/IngredientCard.jsx";
import PotionBottle from "../components/PotionBottle.jsx";

export default function PotionLab() {
  const dispatch = useDispatch();
  const { ingredients, lastBrewResult, status } = useSelector((s) => s.recipes);
  const { user } = useSelector((s) => s.auth);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const toggleIngredient = (ing) => {
    setSelected((prev) => {
      const exists = prev.find((i) => i.slug === ing.slug);
      if (exists) return prev.filter((i) => i.slug !== ing.slug);
      if (prev.length >= 4) return prev;
      return [...prev, ing];
    });
  };

  const handleBrew = async () => {
    if (selected.length < 2) return;
    const result = await dispatch(brewPotion(selected.map((i) => i.slug)));
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(fetchMe());
      setSelected([]);
    }
  };

  const bottleState = status === "loading" ? "brewing" : lastBrewResult ? (lastBrewResult.success ? "success" : "failed") : "idle";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-white">⚗️ CREATE YOUR POTION</h1>
        <p className="mt-2 text-stone-400">Choose 2–4 ingredients and see what your cauldron produces.</p>
      </div>

      {!user && (
        <p className="mt-6 rounded-lg border border-potion-gold/40 bg-cauldron-900/60 p-4 text-center text-sm text-potion-gold">
          Sign in to brew potions and save your discoveries to the Recipe Book.
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-6">
        <PotionBottle state={bottleState} resultIcon={lastBrewResult?.result?.icon} />

        {lastBrewResult && (
          <div className={`max-w-md rounded-lg border p-4 text-center text-sm ${
            lastBrewResult.success ? "border-potion-gold/50 bg-potion-gold/10 text-potion-gold" : "border-stone-700 bg-stone-900/40 text-stone-400"
          }`}>
            <p>{lastBrewResult.message}</p>
            {lastBrewResult.success && <p className="mt-1 text-xs">+{lastBrewResult.xpGained} XP</p>}
            <button onClick={() => dispatch(clearBrewResult())} className="mt-2 text-xs underline">Dismiss</button>
          </div>
        )}

        <button
          onClick={handleBrew}
          disabled={!user || selected.length < 2 || status === "loading"}
          className="btn-primary px-10 py-3 text-base"
        >
          {status === "loading" ? "Brewing..." : "BREW POTION"}
        </button>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 font-display text-lg font-semibold text-stone-200">
          Your Ingredients ({selected.length}/4 selected)
        </h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {ingredients.map((ing) => (
            <IngredientCard
              key={ing.slug}
              ingredient={ing}
              selected={selected.some((i) => i.slug === ing.slug)}
              onToggle={toggleIngredient}
              disabled={!user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
