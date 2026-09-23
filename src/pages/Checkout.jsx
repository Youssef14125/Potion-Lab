import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkout, selectCartTotal } from "../features/cart/cartSlice.js";
import { fetchMe } from "../features/auth/authSlice.js";

const TAX_RATE = 0.05;

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const subtotal = useSelector(selectCartTotal);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    const result = await dispatch(checkout());
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(fetchMe());
      setPlaced(true);
      setTimeout(() => navigate("/orders"), 1800);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-6xl">✨</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-potion-gold">Order Sealed with Wax!</h1>
        <p className="mt-2 text-stone-400">Your goods are being prepared. Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">Seal the Deal</h1>

      <div className="card-surface mt-6 rounded-lg p-5">
        <h2 className="font-display font-semibold text-stone-200">Order Summary</h2>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          {items.map((i) => (
            <div key={i.product._id} className="flex justify-between text-stone-400">
              <span>{i.product.icon} {i.product.name} × {i.quantity}</span>
              <span>🪙 {i.product.price * i.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-cauldron-600 pt-3 text-sm text-stone-400">
          <div className="flex justify-between"><span>Subtotal</span><span>🪙 {subtotal}</span></div>
          <div className="flex justify-between"><span>Alchemy Tax</span><span>🪙 {tax}</span></div>
          <div className="mt-2 flex justify-between font-display text-lg font-bold text-potion-gold">
            <span>Total</span><span>🪙 {total}</span>
          </div>
        </div>
      </div>

      <div className="card-surface mt-4 flex items-center justify-between rounded-lg p-5">
        <span className="text-stone-400">Your Gold Balance</span>
        <span className="font-display text-lg font-semibold text-potion-gold">🪙 {user?.gold}</span>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={status === "loading" || items.length === 0}
        className="btn-primary mt-6 w-full py-3 text-base"
      >
        {status === "loading" ? "Sealing..." : "CONFIRM & PAY"}
      </button>
    </div>
  );
}
