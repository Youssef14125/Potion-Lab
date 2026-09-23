const TYPES = ["potion", "ingredient", "artifact", "spellbook"];
const RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
const ELEMENTS = ["Fire", "Water", "Earth", "Air", "Shadow", "Light", "Arcane", "Nature"];
const SORTS = [
  { value: "", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rarity", label: "Rarity" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const Select = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs uppercase tracking-wide text-stone-500">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="input-field !py-2 text-sm">
      <option value="">All</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default function FilterPanel({ filters, onChange }) {
  const update = (key) => (value) => onChange({ ...filters, [key]: value });

  return (
    <div className="card-surface flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <Select label="Type" value={filters.type} onChange={update("type")} options={TYPES} />
      <Select label="Rarity" value={filters.rarity} onChange={update("rarity")} options={RARITIES} />
      <Select label="Element" value={filters.element} onChange={update("element")} options={ELEMENTS} />

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-wide text-stone-500">Sort By</label>
        <select
          value={filters.sort}
          onChange={(e) => update("sort")(e.target.value)}
          className="input-field !py-2 text-sm"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onChange({ type: "", rarity: "", element: "", sort: "", search: filters.search })}
        className="btn-secondary !px-3 !py-2 text-xs"
      >
        Clear Filters
      </button>
    </div>
  );
}
