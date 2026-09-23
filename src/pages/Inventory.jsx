import { useEffect, useState } from "react";
import api from "../api/axiosClient.js";

const SECTIONS = [
  { key: "potion", label: "Potions", icon: "🧪" },
  { key: "ingredient", label: "Ingredients", icon: "🌿" },
  { key: "artifact", label: "Artifacts", icon: "🗡️" },
  { key: "spellbook", label: "Spellbooks", icon: "📖" },
];

export default function Inventory() {
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    api.get("/users/inventory").then(({ data }) => setInventory(data));
  }, []);

  const total = inventory
    ? Object.values(inventory).reduce((sum, arr) => sum + arr.length, 0)
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">🎒 My Inventory</h1>
      <p className="mt-1 text-stone-400">{total} unique items gathered so far.</p>

      {!inventory ? (
        <p className="mt-6 text-stone-400">Rummaging through your satchel...</p>
      ) : (
        <div className="mt-8 flex flex-col gap-8">
          {SECTIONS.map((section) => {
            const entries = inventory[section.key] || [];
            return (
              <div key={section.key}>
                <h2 className="font-display text-lg font-semibold text-stone-200">
                  {section.icon} {section.label} <span className="text-stone-500">({entries.length} items)</span>
                </h2>
                {entries.length === 0 ? (
                  <p className="mt-2 text-sm text-stone-600">Nothing here yet.</p>
                ) : (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                    {entries.map(({ product, quantity }) => (
                      <div key={product._id} className="card-surface flex flex-col items-center gap-1 rounded-lg p-3 text-center">
                        <span className="text-3xl">{product.icon}</span>
                        <span className="text-xs text-stone-300">{product.name}</span>
                        <span className="text-xs font-semibold text-potion-gold">× {quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
