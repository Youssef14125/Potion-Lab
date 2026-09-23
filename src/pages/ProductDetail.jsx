import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, clearCurrentProduct } from "../features/products/productSlice.js";
import { addToCart } from "../features/cart/cartSlice.js";
import { toggleWishlist, selectIsWishlisted } from "../features/wishlist/wishlistSlice.js";
import RarityBadge from "../components/RarityBadge.jsx";

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { current, status } = useSelector((s) => s.products);
  const { user } = useSelector((s) => s.auth);
  const isWishlisted = useSelector(current ? selectIsWishlisted(current._id) : () => false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(slug));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, slug]);

  if (status === "loading" || !current) {
    return <div className="mx-auto max-w-5xl px-4 py-20 text-center text-stone-400">Consulting the grimoire...</div>;
  }

  const p = current;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link to="/shop" className="text-sm text-potion-purple hover:underline">← Back to Shop</Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="card-surface flex items-center justify-center rounded-lg py-20">
          <span className="text-[8rem] drop-shadow-[0_0_25px_rgba(139,92,246,0.5)]">{p.icon}</span>
        </div>

        <div>
          <RarityBadge rarity={p.rarity} size="lg" />
          <h1 className="mt-2 font-display text-3xl font-bold text-white">{p.name}</h1>
          <p className="mt-3 text-stone-400">{p.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="card-surface rounded-lg p-3">
              <p className="text-stone-500">Element</p>
              <p className="font-semibold text-stone-100">{p.element}</p>
            </div>
            {p.effect && (
              <div className="card-surface rounded-lg p-3">
                <p className="text-stone-500">Effect</p>
                <p className="font-semibold text-stone-100">{p.effect}</p>
              </div>
            )}
            {p.duration && (
              <div className="card-surface rounded-lg p-3">
                <p className="text-stone-500">Duration</p>
                <p className="font-semibold text-stone-100">{p.duration}</p>
              </div>
            )}
            <div className="card-surface rounded-lg p-3">
              <p className="text-stone-500">In Stock</p>
              <p className="font-semibold text-stone-100">{p.stock}</p>
            </div>
          </div>

          {p.ingredients?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-stone-500">Brewed from:</p>
              <p className="mt-1 text-stone-200">{p.ingredients.join(", ")}</p>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-9 w-9 rounded border border-cauldron-600 text-stone-300 hover:border-potion-purple">−</button>
              <span className="w-8 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-9 w-9 rounded border border-cauldron-600 text-stone-300 hover:border-potion-purple">+</button>
            </div>
            <span className="font-display text-2xl font-bold text-potion-gold">🪙 {p.price * qty}</span>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              disabled={!user}
              onClick={() => dispatch(addToCart({ productId: p._id, quantity: qty }))}
              className="btn-primary flex-1"
            >
              ADD TO CART
            </button>
            <button
              disabled={!user}
              onClick={() => dispatch(toggleWishlist({ productId: p._id, isWishlisted }))}
              className={`btn-secondary ${isWishlisted ? "!border-potion-ember !text-potion-ember" : ""}`}
            >
              ♥ {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
          {!user && <p className="mt-3 text-xs text-stone-500">Sign in to purchase or wishlist items.</p>}
        </div>
      </div>
    </div>
  );
}
