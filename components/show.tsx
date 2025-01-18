"use client";
import React, { useState } from "react";
import Image from "next/image";
import { fetchOpenWeather } from "@/utils";

const Dashboard: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const data = await fetchOpenWeather(city);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeatherData(null);
    }
  };
console.log(weatherData)
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6 max-w-4xl text-black mx-auto">
      <h1 className="text-3xl font-bold mb-6">Comprehensive Weather Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city"
          className="px-4 py-2 border rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="flex items-center mb-6">
            <Image
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              width={100}
              height={100}
            />
            <div className="ml-4">
              <p className="text-xl">
                <strong>{weatherData.weather[0].main}</strong> -{" "}
                {weatherData.weather[0].description}
              </p>
              <p className="text-lg">
                Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C
              </p>
              <p className="text-lg">
                Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)} °C
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <ul>
                <li>Pressure: {weatherData.main.pressure} hPa</li>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>Visibility: {weatherData.visibility / 1000} km</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Wind</h3>
              <ul>
                <li>Speed: {weatherData.wind.speed} m/s</li>
                <li>Direction: {weatherData.wind.deg}°</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sun Times</h3>
              <ul>
                <li>Sunrise: {formatTime(weatherData.sys.sunrise)}</li>
                <li>Sunset: {formatTime(weatherData.sys.sunset)}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Coordinates</h3>
              <ul>
                <li>Latitude: {weatherData.coord.lat}</li>
                <li>Longitude: {weatherData.coord.lon}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
