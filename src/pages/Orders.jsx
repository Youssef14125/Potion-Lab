import { useEffect, useState } from "react";
import api from "../api/axiosClient.js";

const STATUS_COLORS = {
  Pending: "text-stone-400",
  Brewing: "text-potion-purple",
  Dispatched: "text-potion-teal",
  Delivered: "text-potion-gold",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/mine").then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">📦 Your Orders</h1>

      {loading ? (
        <p className="mt-6 text-stone-400">Loading order history...</p>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-stone-400">No orders yet. Your future purchases will brew up here.</p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o._id} className="card-surface rounded-lg p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {new Date(o.createdAt).toLocaleDateString()} · Order #{o._id.slice(-6)}
                </span>
                <span className={`font-display text-sm font-semibold ${STATUS_COLORS[o.status]}`}>
                  {o.status}
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1 text-sm text-stone-400">
                {o.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{i.icon} {i.name} × {i.quantity}</span>
                    <span>🪙 {i.price * i.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-cauldron-600 pt-3 font-display font-semibold text-potion-gold">
                <span>Total</span>
                <span>🪙 {o.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
