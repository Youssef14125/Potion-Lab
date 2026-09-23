import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCartTotal } from "../features/cart/cartSlice.js";
import CartItem from "../components/CartItem.jsx";

const TAX_RATE = 0.05;

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const subtotal = useSelector(selectCartTotal);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-4xl">🎒</p>
        <p className="mt-4 text-stone-400">Sign in to view your satchel.</p>
        <Link to="/login" className="btn-primary mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">🛒 YOUR SATCHEL</h1>

      {items.length === 0 ? (
        <div className="card-surface mt-8 rounded-lg p-12 text-center text-stone-400">
          <p className="text-4xl">🪶</p>
          <p className="mt-4">Your satchel is empty.</p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">Browse the Shop</Link>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-3">
            {items.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>

          <div className="card-surface mt-8 ml-auto max-w-sm rounded-lg p-5">
            <div className="flex justify-between text-sm text-stone-400">
              <span>Subtotal</span>
              <span>🪙 {subtotal}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-stone-400">
              <span>Alchemy Tax (5%)</span>
              <span>🪙 {tax}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-cauldron-600 pt-3 font-display text-lg font-bold text-potion-gold">
              <span>Total</span>
              <span>🪙 {total}</span>
            </div>
            <button onClick={() => navigate("/checkout")} className="btn-primary mt-5 w-full">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
}
