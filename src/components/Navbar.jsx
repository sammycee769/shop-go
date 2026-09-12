import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQty, decrementQty } from "../../store/cartSlice";
import { FiSearch, FiShoppingCart, FiUser, FiX, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.cart);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${search.trim()}`);
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT */}
      <div className="bg-[#111] text-white text-xs text-center py-2 tracking-wide">
        Free shipping on orders over $50 &nbsp;·&nbsp; Use code{" "}
        <span className="font-bold">SHOPGO20</span> for 20% off
      </div>

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
          {/* Logo */}
          <Link
            to="/home"
            className="font-display text-3xl tracking-widest text-[#111] shrink-0"
          >
            SHOP.GO
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#111]">
            <Link to="/products" className="hover:text-gray-500 transition-colors">Shop</Link>
            <a href="#" className="hover:text-gray-500 transition-colors">On Sale</a>
            <a href="#" className="hover:text-gray-500 transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Brands</a>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-[#F5F5F5] rounded-full pl-10 pr-4 py-2.5 text-sm outline-none border border-transparent focus:border-gray-200 transition-colors"
            />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-gray-500 transition-colors">
              <FiUser className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative hover:text-gray-500 transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#111] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* CART DRAWER OVERLAY */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* CART DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-display text-2xl tracking-widest">YOUR CART</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <FiShoppingCart className="w-16 h-16 opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                className="btn-primary text-sm px-6 py-2.5"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-[#F8F8F8] rounded-2xl"
              >
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug line-clamp-2 mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 capitalize mb-2">
                    {item.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decrementQty(item.id))}
                        className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => dispatch(incrementQty(item.id))}
                        className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors ml-1"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-[#111]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">
                {subtotal >= 50 ? "Free" : "$5.99"}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3">
              <span>Total</span>
              <span>
                ${(subtotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
            <button className="btn-primary w-full text-center text-sm">
              Checkout
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="btn-outline w-full text-center text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
