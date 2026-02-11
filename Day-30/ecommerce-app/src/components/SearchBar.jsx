export default function SearchBar({ setSearch }) {
  return (
    <input
      placeholder="Search products..."
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
    />
  );
}
