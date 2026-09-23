export default function RecipeCard({ recipe }) {
  if (!recipe.discovered) {
    return (
      <div className="card-surface flex flex-col items-center gap-2 rounded-lg p-4 text-center opacity-70">
        <span className="text-3xl">🔒</span>
        <p className="font-display text-sm text-stone-500">???</p>
        <p className="text-xs italic text-stone-600">{recipe.hint}</p>
      </div>
    );
  }

  return (
    <div className="card-surface flex flex-col items-center gap-2 rounded-lg p-4 text-center shadow-goldGlow">
      <span className="text-3xl">{recipe.result?.icon}</span>
      <p className="font-display text-sm font-semibold text-potion-gold">{recipe.name}</p>
      <p className="text-xs text-stone-400">
        {recipe.ingredientSlugs?.join(" + ")}
      </p>
    </div>
  );
}
