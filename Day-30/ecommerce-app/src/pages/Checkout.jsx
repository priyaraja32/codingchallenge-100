import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Checkout</h1>
      <p className="dark:text-white">Total: ${total.toFixed(2)}</p>
      <button onClick={handlePay} className="mt-4 w-full bg-green-600 text-white py-2 rounded">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
