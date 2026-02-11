import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { getProduct } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => { getProduct(id).then(setProduct); }, [id]);
  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <img src={product.image} className="h-80 object-contain" />
      <div>
        <h1 className="text-2xl font-bold dark:text-white">{product.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</p>
        <p className="text-xl text-indigo-600 mt-4">${product.price}</p>
        <button onClick={() => addToCart(product)} className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded">
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}


