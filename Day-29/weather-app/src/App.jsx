import { useState } from "react";
import { Search } from "lucide-react";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!cityInput.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // 🌍 Geocoding
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`
      );
      const geoData = await geoRes.json();

      // 🔥 FIX: check results length properly
      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found ❌");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      setCity(name);

      // 🌦 Weather API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData.current_weather);
    } catch (err) {
      setError("Something went wrong ⚠️");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="text-white w-full px-4 flex flex-col items-center">

      <h1 className="text-4xl font-bold mb-6">Weather Dashboard</h1>

      {/* SEARCH BOX */}
      <div className="flex w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg">
        <input
          type="text"
          placeholder="Search city..."
          className="flex-1 px-4 py-3 bg-transparent outline-none text-white placeholder-gray-400"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={fetchWeather}
          className="px-5 bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center"
        >
          <Search size={20} />
        </button>
      </div>

      {loading && (
        <p className="mt-6 animate-pulse text-gray-300">Fetching weather...</p>
      )}

      {error && <p className="mt-4 text-red-400">{error}</p>}

      <WeatherCard weather={weather} city={city} />
    </div>
  );
}

