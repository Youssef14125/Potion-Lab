import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice.js";
import SearchBar from "../components/SearchBar.jsx";
import FilterPanel from "../components/FilterPanel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { items, status, page, pages } = useSelector((s) => s.products);

  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "",
    rarity: "",
    element: "",
    sort: "",
    search: "",
  });
  const [pageNum, setPageNum] = useState(1);

  const runSearch = useCallback(
    (f, p) => {
      const params = Object.fromEntries(Object.entries(f).filter(([, v]) => v));
      dispatch(fetchProducts({ ...params, page: p }));
    },
    [dispatch]
  );

  useEffect(() => {
    runSearch(filters, pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pageNum]);

  const handleFilterChange = (next) => {
    setFilters(next);
    setPageNum(1);
  };

  const handleSearch = (value) => {
    setFilters((f) => ({ ...f, search: value }));
    setPageNum(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">🏪 Main Store</h1>
      <p className="mt-1 text-stone-400">Potions, ingredients, artifacts and spellbooks await.</p>

      <div className="mt-6 flex flex-col gap-4">
        <SearchBar value={filters.search} onChange={handleSearch} />
        <FilterPanel filters={filters} onChange={handleFilterChange} />
      </div>

      <div className="mt-8">
        <ProductGrid products={items} loading={status === "loading"} />
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPageNum(i + 1)}
              className={`h-9 w-9 rounded-md font-display text-sm ${
                page === i + 1
                  ? "bg-potion-purple text-white"
                  : "border border-cauldron-600 text-stone-400 hover:border-potion-purple"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
