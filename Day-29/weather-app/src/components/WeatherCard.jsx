import { Thermometer, Wind, MapPin, CloudSun } from "lucide-react";

export default function WeatherCard({ weather, city }) {
  if (!weather) return null;

  const weatherTypes = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    61: "Rain",
    71: "Snow",
    95: "Thunderstorm",
  };

  return (
    <div className="w-full max-w-sm mt-8 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
      <div className="flex justify-center mb-4">
        <CloudSun size={42} />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-200 mb-2">
        <MapPin size={18} />
        <span>{city}</span>
      </div>

      <h2 className="text-center text-xl font-semibold mb-4">
        {weatherTypes[weather.weathercode] || "Weather"}
      </h2>

      <div className="flex items-center justify-center gap-2 text-5xl font-bold mb-4">
        <Thermometer size={34} />
        {weather.temperature}°C
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-300">
        <Wind size={20} />
        Wind Speed: {weather.windspeed} km/h
      </div>
    </div>
  );
}


