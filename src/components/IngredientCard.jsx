export default function IngredientCard({ ingredient, selected, onToggle, disabled }) {
  return (
    <button
      onClick={() => onToggle(ingredient)}
      disabled={disabled}
      className={`card-surface flex flex-col items-center gap-1 rounded-lg p-3 text-center transition-all disabled:opacity-30 ${
        selected ? "ring-2 ring-potion-purple shadow-glow" : "hover:border-potion-purple/50"
      }`}
    >
      <span className="text-4xl">{ingredient.icon}</span>
      <span className="text-xs font-medium text-stone-200">{ingredient.name}</span>
      <span className={`rarity-${ingredient.rarity} text-[10px]`}>{ingredient.rarity}</span>
    </button>
  );
}
