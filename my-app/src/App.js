import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      // Updated fetch URL to listen on port 5002
      const response = await fetch(`http://127.0.0.1:5002/weather?city=${city}`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setError(null);
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (error) {
      setError("Failed to fetch data");
      setWeather(null);
    }
  };

  return (
    <div className="App min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <div className="p-6 max-w-sm w-full bg-gray-900 rounded-lg shadow-lg">
        {/* Changed title to SHIKS WA RIIS APP */}
        <h1 className="text-3xl font-bold mb-4">SHIKS WA RIIS APP</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full p-2 mb-4 text-black"
        />
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          weather && (
            <div className="text-center">
              <h2 className="text-xl">{weather.city}</h2>
              <p className="text-4xl font-semibold">
                {weather.temperature}°C
              </p>
              <p>{weather.weather}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                alt="weather icon"
                className="mx-auto mt-4"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;



