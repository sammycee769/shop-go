import { useState } from "react";
import { useParams, Link } from "react-router";
import { useGetProductByIdQuery, useGetProductsQuery } from "../apis/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import ProductCard from "./ProductCard";
import {
  FiStar,
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiShare2,
} from "react-icons/fi";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["#4B5320", "#111111", "#8B4513"];

const TABS = ["Product Details", "Rating & Reviews", "FAQs"];

const REVIEWS = [
  { name: "Sarah M.", rating: 5, text: "Absolutely love this item. Premium quality and ships fast!" },
  { name: "Alex K.", rating: 4, text: "Looks exactly like the photos. Very satisfied with my purchase." },
  { name: "Jordan P.", rating: 5, text: "Best purchase I've made this year. Highly recommend!" },
];

function Stars({ n = 5, size = "w-4 h-4" }) {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={size} fill={i < Math.round(n) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const { data: allProducts = [] } = useGetProductsQuery();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [activeTab, setActiveTab] = useState("Rating & Reviews");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3" />
            <div className="h-24 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const discount = 20;
  const originalPrice = (product.price * 1.25).toFixed(2);
  const thumbnails = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const suggested = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/products" className="flex items-center gap-1.5 hover:text-[#111] transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#111] transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize text-gray-500">{product.category}</span>
          <span>/</span>
          <span className="text-[#111] font-medium truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* LEFT: Image gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="bg-[#F5F5F5] rounded-3xl h-96 flex items-center justify-center p-8 relative">
              <img
                src={thumbnails[activeImage]}
                alt={product.title}
                className="max-h-80 max-w-full object-contain transition-all duration-300"
              />
              <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                <FiShare2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`bg-[#F5F5F5] rounded-xl h-24 flex items-center justify-center p-3 border-2 transition-all cursor-pointer ${
                    activeImage === i ? "border-[#111]" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="max-h-16 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div>
            <h1 className="font-display text-4xl tracking-wide leading-tight text-[#111] mb-3">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <Stars n={Math.round(product.rating?.rate || 4)} />
              <span className="text-sm text-gray-400">
                {(product.rating?.rate || 4).toFixed(1)}/5
                <span className="ml-1">({product.rating?.count || 120} reviews)</span>
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-3xl tracking-wide">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 line-through text-lg">${originalPrice}</span>
              <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-full">
                -{discount}%
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Select Color</p>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className="w-8 h-8 rounded-full cursor-pointer transition-all"
                    style={{
                      background: c,
                      outline: selectedColor === c ? `2px solid ${c}` : "none",
                      outlineOffset: 2,
                      boxShadow: selectedColor === c ? "0 0 0 3px white, 0 0 0 5px " + c : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Choose Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                      selectedSize === s
                        ? "bg-[#111] text-white border-[#111]"
                        : "bg-[#F0F0F0] text-[#111] border-transparent hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0 bg-[#F0F0F0] rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-[#111] text-white hover:bg-[#333] active:scale-95"
                }`}
              >
                <FiShoppingCart className="w-4 h-4" />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-16">
          <div className="flex border-b border-gray-100 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  activeTab === tab
                    ? "border-[#111] text-[#111]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Rating & Reviews" && (
            <div className="grid md:grid-cols-3 gap-5">
              {REVIEWS.map((r) => (
                <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <Stars n={r.rating} />
                  <p className="font-bold mt-3 mb-1">
                    {r.name} <span className="text-green-500 font-normal text-sm">✓</span>
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Product Details" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Category", product.category],
                    ["Rating", `${product.rating?.rate}/5 (${product.rating?.count} reviews)`],
                    ["Price", `$${product.price.toFixed(2)}`],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-50">
                      <td className="py-2.5 text-gray-400 capitalize w-36">{k}</td>
                      <td className="py-2.5 font-medium text-[#111] capitalize">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "FAQs" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4">
              {[
                ["What sizes do you offer?", "We offer sizes XS through XXL. Please refer to our size guide."],
                ["How long does shipping take?", "Standard shipping takes 3-7 business days."],
                ["What is your return policy?", "We offer free returns within 30 days of purchase."],
              ].map(([q, a]) => (
                <div key={q} className="border-b border-gray-50 pb-4 last:border-0">
                  <p className="font-semibold text-sm mb-1">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* YOU MIGHT ALSO LIKE */}
        {suggested.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-4xl tracking-widest text-center mb-8">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {suggested.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
