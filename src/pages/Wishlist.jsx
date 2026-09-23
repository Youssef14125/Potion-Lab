import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../features/wishlist/wishlistSlice.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Wishlist() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">♥ Your Wishlist</h1>
      <div className="mt-8">
        <ProductGrid products={items} />
      </div>
    </div>
  );
}
