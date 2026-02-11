import { useState } from "react";
import { Ruler, Weight, Activity, RotateCcw } from "lucide-react";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!height || !weight || height <= 0 || weight <= 0) return;

    const h = height / 100;
    const result = weight / (h * h); // keep as number
    const rounded = result.toFixed(1);

    setBmi(rounded);

    if (result < 18.5) setCategory("Underweight");
    else if (result < 24.9) setCategory("Normal");
    else if (result < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  const categoryColor = {
    Underweight: "text-blue-300",
    Normal: "text-green-300",
    Overweight: "text-yellow-300",
    Obese: "text-red-400",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Activity size={28} /> BMI Calculator
        </h1>

        {/* Height */}
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-1 text-sm">
            <Ruler size={16} /> Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculateBMI()}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Enter height"
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-1 text-sm">
            <Weight size={16} /> Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculateBMI()}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Enter weight"
          />
        </div>

        {/* Buttons */}
        <button
          onClick={calculateBMI}
          disabled={!height || !weight}
          className="w-full py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:scale-105 transition mb-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculate BMI
        </button>

        <button
          onClick={reset}
          className="w-full py-2 border border-white/40 rounded-lg flex justify-center items-center gap-2 hover:bg-white/10 transition"
        >
          <RotateCcw size={16} /> Reset
        </button>

        {/* Result */}
        {bmi && (
          <div className="mt-6 text-center bg-white/10 p-4 rounded-xl animate-fadeIn">
            <h2 className="text-xl font-semibold">Your BMI: {bmi}</h2>
            <p className={`mt-1 text-lg font-bold ${categoryColor[category]}`}>
              {category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
