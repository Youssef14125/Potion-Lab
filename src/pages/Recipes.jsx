import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeBook } from "../features/recipes/recipeSlice.js";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Recipes() {
  const dispatch = useDispatch();
  const { book, discoveredCount, totalCount } = useSelector((s) => s.recipes);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (user) dispatch(fetchRecipeBook());
  }, [dispatch, user]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">📜 Recipe Book</h1>

      {!user ? (
        <p className="mt-6 text-stone-400">Sign in and start brewing to fill your Recipe Book.</p>
      ) : (
        <>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-cauldron-800">
              <div
                className="h-full bg-gradient-to-r from-potion-purple to-potion-gold transition-all"
                style={{ width: `${totalCount ? (discoveredCount / totalCount) * 100 : 0}%` }}
              />
            </div>
            <span className="whitespace-nowrap font-display text-sm text-potion-gold">
              {discoveredCount} / {totalCount} Recipes Discovered
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {book.map((r) => (
              <RecipeCard key={r._id} recipe={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
