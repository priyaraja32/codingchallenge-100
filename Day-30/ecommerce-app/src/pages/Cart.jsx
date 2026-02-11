import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!cart.length) return <p className="text-center mt-10">Cart Empty</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded shadow">
          <span className="dark:text-white">{item.title}</span>
          <div className="flex gap-2 items-center">
            <button onClick={() => decreaseQty(item.id)}><Minus /></button>
            <span className="dark:text-white">{item.quantity}</span>
            <button onClick={() => increaseQty(item.id)}><Plus /></button>
          </div>
          <button onClick={() => removeFromCart(item.id)}><Trash2 className="text-red-500" /></button>
        </div>
      ))}

      <div className="text-right mt-6">
        <h2 className="text-2xl font-bold dark:text-white">Total: ${total.toFixed(2)}</h2>
        <Link to="/checkout" className="mt-3 inline-block bg-indigo-600 text-white px-5 py-2 rounded">Checkout</Link>
      </div>
    </div>
  );
}
