import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Loader from "../components/Loader";
import { getProducts, getCategories, getByCategory } from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [selected, setSelected] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { getCategories().then(setCats); }, []);

  useEffect(() => {
    setLoading(true);
    (selected === "all" ? getProducts() : getByCategory(selected)).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [selected]);

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <SearchBar setSearch={setSearch} />
      <CategoryFilter cats={cats} setSelected={setSelected} />

      {loading ? <Loader /> : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}


