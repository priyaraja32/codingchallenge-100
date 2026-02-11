import { Link } from "react-router-dom";
import { ShoppingCart, Moon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">FakeStore</Link>

        <div className="flex items-center gap-6">
          <button onClick={() => setDark(!dark)}>
            <Moon className="text-gray-600 dark:text-white" />
          </button>

          <Link to="/cart" className="relative">
            <ShoppingCart className="text-gray-700 dark:text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

