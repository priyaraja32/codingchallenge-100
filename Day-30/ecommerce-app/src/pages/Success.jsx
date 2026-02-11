import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Order Successful 🎉</h1>
      <Link to="/" className="mt-4 inline-block text-indigo-600 underline">Continue Shopping</Link>
    </div>
  );
}
