import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatured } from "../features/products/productSlice.js";
import ProductGrid from "../components/ProductGrid.jsx";

const CATEGORIES = [
  { type: "potion", label: "Potions", icon: "🧪" },
  { type: "ingredient", label: "Ingredients", icon: "🌿" },
  { type: "artifact", label: "Artifacts", icon: "🗡️" },
  { type: "spellbook", label: "Spellbooks", icon: "📖" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { featured, status } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-potion-purple/20 bg-radial-fade">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-potion-gold">
            Est. Beneath the Cauldron Spire
          </p>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl">
            🧪 POTION <span className="text-potion-purple">LAB</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg italic text-stone-400">
            "Brew Something Extraordinary."
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/shop" className="btn-primary">Enter the Shop</Link>
            <Link to="/potion-lab" className="btn-secondary">Try the Potion Lab ⚗️</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.type}
              to={`/shop?type=${c.type}`}
              className="card-surface flex flex-col items-center gap-2 rounded-lg py-8 transition-transform hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="text-5xl">{c.icon}</span>
              <span className="font-display text-sm uppercase tracking-wide text-stone-200">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-white">✨ Featured Discoveries</h2>
          <Link to="/shop" className="text-sm text-potion-purple hover:underline">View all →</Link>
        </div>
        <ProductGrid products={featured} loading={status === "loading" && featured.length === 0} />
      </section>

      <section className="border-t border-potion-purple/20 bg-cauldron-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl">⚗️</p>
            <h3 className="mt-3 font-display font-semibold text-stone-100">Brew Your Own</h3>
            <p className="mt-1 text-sm text-stone-400">Combine ingredients in the Potion Lab and discover recipes no shopkeeper will sell you.</p>
          </div>
          <div className="text-center">
            <p className="text-4xl">📜</p>
            <h3 className="mt-3 font-display font-semibold text-stone-100">Fill the Recipe Book</h3>
            <p className="mt-1 text-sm text-stone-400">Every successful brew is recorded. Track your progress toward mastering all 10 known recipes.</p>
          </div>
          <div className="text-center">
            <p className="text-4xl">🎒</p>
            <h3 className="mt-3 font-display font-semibold text-stone-100">Manage Your Satchel</h3>
            <p className="mt-1 text-sm text-stone-400">Buy, brew, and stockpile — your inventory tracks everything you've gathered.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
