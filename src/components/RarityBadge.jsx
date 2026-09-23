const STARS = { Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Legendary: 5 };

export default function RarityBadge({ rarity, size = "sm" }) {
  const stars = STARS[rarity] || 1;
  const textSize = size === "lg" ? "text-sm" : "text-xs";
  return (
    <span className={`rarity-${rarity} ${textSize} font-semibold tracking-wide`}>
      {"★".repeat(stars)}
      <span className="text-stone-700">{"★".repeat(5 - stars)}</span>
      <span className="ml-1 text-stone-400">{rarity}</span>
    </span>
  );
}
