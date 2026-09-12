import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { FiShoppingCart, FiStar } from "react-icons/fi";

const DISCOUNTS = [10, 15, 20, 25, 30];

function getDiscount(id) {
  return DISCOUNTS[id % DISCOUNTS.length];
}

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();
  const discount = getDiscount(product.id);
  const original = (product.price * (1 + discount / 100)).toFixed(2);

  return (
    <div
      className="card group animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="bg-[#F5F5F5] h-56 flex items-center justify-center p-6 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-44 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 bg-red-50 text-red-500 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            -{discount}%
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="no-underline">
          <p className="text-sm font-semibold text-[#111] leading-snug line-clamp-1 mb-1 hover:underline">
            {product.title}
          </p>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className="w-3 h-3"
                fill={i < Math.round(product.rating?.rate || 4) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            {(product.rating?.rate || 4).toFixed(1)}/5
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-base">${product.price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-xs">${original}</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full flex items-center justify-center gap-2 bg-[#111] text-white text-xs font-semibold py-2.5 rounded-full hover:bg-[#333] active:scale-95 transition-all duration-150"
        >
          <FiShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
