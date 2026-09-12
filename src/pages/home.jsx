import { useState } from "react";
import { useGetProductsQuery } from "../apis/productApi";
import ProductCard from "../components/ProductCard";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const BRANDS = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

const DRESS_STYLES = [
  { label: "Casual", bg: "bg-amber-50" },
  { label: "Formal", bg: "bg-blue-50" },
  { label: "Party", bg: "bg-pink-50" },
  { label: "Gym", bg: "bg-green-50" },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely love the quality! The fit is perfect and the material feels premium. Will definitely be ordering again.",
  },
  {
    name: "Alex K.",
    rating: 5,
    text: "Fast delivery and the product exceeded my expectations. Looks even better in person than in the photos.",
  },
  {
    name: "James L.",
    rating: 4,
    text: "Great value for money. The stitching is solid and the sizing is accurate to the chart. Really happy with this.",
  },
];

const CATEGORIES = ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];

function Stars({ n = 5 }) {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

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

export default function Home() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* HERO */}
      <section className="bg-[#F2F0F1]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-6xl md:text-7xl leading-none tracking-wide text-[#111] mb-6">
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className="bg-[#111] text-white font-semibold rounded-full px-10 py-3.5 hover:bg-[#333] transition-colors cursor-pointer mb-10">
              Shop Now
            </button>
            <div className="flex gap-8">
              {[
                ["300+", "International Brands"],
                ["2,000+", "High-Quality Products"],
                ["30,000+", "Happy Customers"],
              ].map(([num, label], i) => (
                <div key={label} className={`${i < 2 ? "border-r border-gray-300 pr-8" : ""}`}>
                  <div className="font-display text-3xl tracking-wide">{num}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl h-36 flex items-center justify-center p-4 shadow-sm">
                <img src={p.image} alt="" className="max-h-28 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="bg-[#111] py-5">
        <div className="max-w-7xl mx-auto px-6 flex justify-around items-center flex-wrap gap-5">
          {BRANDS.map((b) => (
            <span key={b} className="font-display text-xl tracking-[0.25em] text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              {b}
            </span>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* NEW ARRIVALS */}
        <section className="py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl tracking-widest">NEW ARRIVALS</h2>
            <button className="border border-gray-200 rounded-full px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {isLoading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* TOP SELLING */}
        <section className="py-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl tracking-widest">TOP SELLING</h2>
            <button className="border border-gray-200 rounded-full px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer">
              View All <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {isLoading
              ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
              : topSelling.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* BROWSE BY STYLE */}
        <section className="py-10 mb-6">
          <div className="bg-[#F0F0F0] rounded-3xl p-8 md:p-12">
            <h2 className="font-display text-4xl tracking-widest text-center mb-8">BROWSE BY DRESS STYLE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DRESS_STYLES.map(({ label, bg }) => (
                <div key={label} className={`${bg} rounded-2xl h-40 flex items-end p-5 cursor-pointer hover:opacity-90 transition-opacity`}>
                  <span className="font-bold text-lg text-[#111]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALL PRODUCTS + FILTER */}
        <section className="py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-4xl tracking-widest">ALL PRODUCTS</h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                    activeCategory === c
                      ? "bg-[#111] text-white border-[#111]"
                      : "bg-white text-[#111] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {c === "All" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </section>

        {/* HAPPY CUSTOMERS */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl tracking-widest">OUR HAPPY CUSTOMERS</h2>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <Stars n={r.rating} />
                <p className="font-bold mt-3 mb-1">{r.name} <span className="text-green-500 text-sm font-normal">✓</span></p>
                <p className="text-sm text-gray-500 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NEWSLETTER */}
      <section className="px-6 pb-14">
        <div className="max-w-7xl mx-auto bg-[#111] text-white rounded-3xl px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-display text-4xl tracking-widest max-w-xs leading-tight">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
              <input
                placeholder="Enter your email address"
                className="w-full rounded-full py-3.5 pl-10 pr-4 bg-white text-[#111] text-sm outline-none"
              />
            </div>
            <button className="bg-white text-[#111] font-bold rounded-full py-3.5 text-sm hover:bg-gray-100 transition-colors cursor-pointer">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-12 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="font-display text-2xl tracking-widest mb-3">SHOP.GO</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                We have clothes that suits your style and which you're proud to wear.
              </p>
            </div>
            {[
              ["Company", ["About", "Features", "Works", "Career"]],
              ["Help", ["Support", "Delivery Details", "Terms", "Privacy Policy"]],
              ["FAQ", ["Account", "Manage Orders", "Payments", "Returns"]],
            ].map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-xs tracking-widest uppercase mb-4">{title}</h4>
                {links.map((l) => (
                  <p key={l} className="text-sm text-gray-500 mb-2.5 cursor-pointer hover:text-[#111] transition-colors">{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">Shop.Go © 2024. All Rights Reserved.</p>
            <div className="flex gap-2">
              {["💳", "💵", "🏦", "💰"].map((ic, i) => (
                <span key={i} className="bg-gray-50 rounded-md px-2.5 py-1 text-lg">{ic}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
