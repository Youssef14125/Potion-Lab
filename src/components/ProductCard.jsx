import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RarityBadge from "./RarityBadge.jsx";
import { addToCart } from "../features/cart/cartSlice.js";
import { toggleWishlist, selectIsWishlisted } from "../features/wishlist/wishlistSlice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const isWishlisted = useSelector(selectIsWishlisted(product._id));

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) return;
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) return;
    dispatch(toggleWishlist({ productId: product._id, isWishlisted }));
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="card-surface group relative flex flex-col overflow-hidden rounded-lg p-4 transition-all hover:shadow-glow"
    >
      {user && (
        <button
          onClick={handleWishlist}
          className={`absolute right-3 top-3 z-10 text-lg transition-transform hover:scale-125 ${
            isWishlisted ? "text-potion-ember" : "text-stone-600"
          }`}
          aria-label="Toggle wishlist"
        >
          ♥
        </button>
      )}

      <div className="flex h-28 items-center justify-center text-6xl transition-transform group-hover:scale-110">
        {product.icon}
      </div>

      <RarityBadge rarity={product.rarity} />
      <h3 className="mt-1 font-display text-base font-semibold text-stone-100">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-stone-400">{product.effect || product.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-lg font-bold text-potion-gold">🪙 {product.price}</span>
        <button
          onClick={handleAddToCart}
          disabled={!user}
          className="btn-primary !px-3 !py-1.5 text-xs"
          title={!user ? "Sign in to purchase" : "Add to satchel"}
        >
          Add
        </button>
      </div>
    </Link>
  );
}
