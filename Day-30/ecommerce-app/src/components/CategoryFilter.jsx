export default function CategoryFilter({ cats, setSelected }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={() => setSelected("all")} className="px-3 py-1 bg-gray-200 rounded">All</button>
      {cats.map(c => (
        <button key={c} onClick={() => setSelected(c)} className="px-3 py-1 bg-gray-200 rounded">{c}</button>
      ))}
    </div>
  );
}

