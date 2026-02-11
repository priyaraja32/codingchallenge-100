import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:scale-105 transition">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="h-40 object-contain mx-auto" />
        <h2 className="text-sm font-semibold mt-2 dark:text-white line-clamp-2">
          {product.title}
        </h2>
      </Link>

      <div className="flex justify-between mt-3 items-center">
        <span className="text-indigo-600 font-bold">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-500 text-white p-2 rounded"
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
}
