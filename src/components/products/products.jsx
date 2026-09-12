import { useState } from "react";
import { useGetProductsQuery } from "../../apis/productApi";
import ProductCard from "../ProductCard";

const CATEGORIES = ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="h-56 w-full bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
        <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
        <div className="h-9 w-full bg-gray-200 animate-pulse rounded-full" />
      </div>
    </div>
  );
}

export default function Products() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered =
    activeCategory === "All"
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-5xl tracking-widest mb-2">ALL PRODUCTS</h1>
        <p className="text-gray-400 text-sm">{sorted.length} products</p>
      </div>

      {/* Filters + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer ${
                activeCategory === c
                  ? "bg-[#111] text-white border-[#111]"
                  : "bg-white text-[#111] border-gray-200 hover:bg-gray-50"
              }`}
            >
              {c === "All" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-full px-4 py-2 text-sm text-[#111] outline-none bg-white cursor-pointer"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-24 text-gray-400">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
