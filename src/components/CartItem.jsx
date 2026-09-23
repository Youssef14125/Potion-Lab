import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartItem, removeFromCart } from "../features/cart/cartSlice.js";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { product, quantity } = item;
  if (!product) return null;

  const changeQty = (delta) => {
    const next = quantity + delta;
    if (next < 1) return;
    dispatch(updateCartItem({ productId: product._id, quantity: next }));
  };

  return (
    <div className="card-surface flex items-center gap-4 rounded-lg p-4">
      <Link to={`/product/${product.slug}`} className="text-4xl">{product.icon}</Link>
      <div className="flex-1">
        <Link to={`/product/${product.slug}`} className="font-display font-semibold text-stone-100 hover:text-potion-purple">
          {product.name}
        </Link>
        <p className="text-xs text-stone-500">{product.rarity} · {product.element}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => changeQty(-1)} className="h-7 w-7 rounded border border-cauldron-600 text-stone-300 hover:border-potion-purple">−</button>
        <span className="w-6 text-center">{quantity}</span>
        <button onClick={() => changeQty(1)} className="h-7 w-7 rounded border border-cauldron-600 text-stone-300 hover:border-potion-purple">+</button>
      </div>

      <div className="w-20 text-right font-display font-semibold text-potion-gold">
        🪙 {product.price * quantity}
      </div>

      <button
        onClick={() => dispatch(removeFromCart(product._id))}
        className="text-stone-500 hover:text-potion-ember"
        aria-label="Remove"
      >
        ✕
      </button>
    </div>
  );
}
