import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card-surface h-64 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="card-surface rounded-lg p-12 text-center text-stone-400">
        <p className="text-4xl">🕸️</p>
        <p className="mt-3">No items match your search. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
