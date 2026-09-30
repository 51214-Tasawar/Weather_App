import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Change this URL to your backend endpoint
      const response = await fetch(
        `http://localhost:3002/api/weather?city=${city}`
      );

      if (!response.ok) {
        throw new Error("Unable to get weather data.");
      }

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 p-4 flex items-center justify-center">

      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-white">
          <div>
            <h1 className="text-3xl font-bold">
              Weather<span className="text-yellow-300">ly</span>
            </h1>

            <p className="text-white/70 mt-1">
              Your daily weather companion
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
              🌤️ Weather Dashboard
            </span>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex gap-3 shadow-xl mb-6"
        >
          <div className="flex-1 relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-white rounded-xl py-3.5 pl-12 pr-4 text-gray-800 outline-none focus:ring-4 focus:ring-white/30"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition px-6 rounded-xl font-semibold text-white shadow-lg"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-300/30 text-white rounded-2xl p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Weather Data */}
        {weather && (
          <div className="grid md:grid-cols-3 gap-5">

            {/* Main Weather */}
            <div className="md:col-span-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-white/70 text-sm">
                    Current Weather
                  </p>

                  <h2 className="text-3xl font-bold mt-1">
                    {weather.city}
                  </h2>
                </div>

                <div className="text-6xl">
                  {weather.icon}
                </div>

              </div>

              <div className="mt-8 flex items-end gap-5">

                <span className="text-8xl font-light">
                  {weather.temperature}
                </span>

                <div className="pb-3">

                  <p className="text-2xl font-semibold">
                    {weather.temperature}
                  </p>

                  <p className="text-white/70">
                    Feels like {weather.temperature}°
                  </p>

                </div>

              </div>

              <div className="border-t border-white/20 mt-8 pt-6 grid grid-cols-3 gap-4">

                <div>
                  <p className="text-white/60 text-sm">
                    💧 Humidity
                  </p>

                  <p className="text-xl font-semibold mt-1">
                    {weather.humidity}%
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-sm">
                    💨 Wind
                  </p>

                  <p className="text-xl font-semibold mt-1">
                    {weather.windSpeed} km/h
                  </p>
                </div>

                <div>
                  <p className="text-white/60 text-sm">
                    👁️ Visibility
                  </p>

                  <p className="text-xl font-semibold mt-1">
                    {weather.visibility} km
                  </p>
                </div>

              </div>
            </div>

            {/* Details */}
            <div className="space-y-5">

              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-xl">

                <h3 className="font-semibold text-lg mb-5">
                  Today's Details
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-white/60">
                      Sunrise
                    </span>

                    <span className="font-semibold">
                      {weather.sunrise}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60">
                      Sunset
                    </span>

                    <span className="font-semibold">
                      {weather.sunset}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60">
                      Pressure
                    </span>

                    <span className="font-semibold">
                      {weather.pressure} hPa
                    </span>
                  </div>

                </div>
              </div>

              {/* Forecast */}
              {weather.forecast && (
                <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-xl">

                  <h3 className="font-semibold text-lg mb-4">
                    Forecast
                  </h3>

                  <div className="space-y-4">

                    {weather.forecast.map((day, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {day.date}
                        </span>

                        <span className="text-2xl">
                          {day.icon}
                        </span>

                        <span className="font-semibold">
                          {day.temperature}°
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-16 text-center text-white shadow-2xl">

            <div className="text-8xl mb-6">
              🌤️
            </div>

            <h2 className="text-3xl font-bold">
              Check the Weather
            </h2>

            <p className="text-white/70 mt-3 max-w-md mx-auto">
              Search for a city to get the latest weather information.
            </p>

          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white/50 text-sm mt-6">
          Weatherly • React + Vite + Tailwind
        </p>

      </div>
    </div>
  );
}

export default App;