"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchOpenWeather } from "@/utils";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite.config";

const Dashboard: React.FC = () => {
  const [city, setCity] = useState<string>("London"); // Default city
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  const fetchWeather = async (query: string) => {
    setLoading(true); // Start loading
    try {
      const data = await fetchOpenWeather(query);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    // Fetch weather data for the default city when the component mounts
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await account.get()
      console.log(user)
      // const user = await account.deleteSession("current");
      // console.log(user) // Ends the current session
      // if (user) {
      //   router.push("/login");
      // } // Redirects to the login page
    } catch (err) {
      console.error("Failed to log out:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: "url('/images/weather.jpg')",
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent p-6">
        {/* Content */}
        <div className="relative z-10 text-white flex flex-col gap-8 items-center max-w-screen-md mx-auto">
          {/* Search Bar */}
          <div className="flex sm:text-md text-sm justify-between gap-10">
            <div className="flex items-center px-4 py-2 border border-gray-400 rounded-2xl bg-gray-800 space-x-3 w-full max-w-md">
              <CiLocationOn className="text-xl text-gray-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city"
                className="bg-transparent text-white placeholder-gray-400 focus:outline-none flex-1"
              />
              {loading ? (
                <Image
                  src="/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              ) : (
                <FaSearch
                  onClick={handleSearch}
                  className="text-xl text-white cursor-pointer hover:text-blue-600"
                />
              )}
            </div>
            <button
              onClick={(e) => handleLogout(e)}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition w-auto"
            >
              {loading ? (
                <Image
                  src="/icons/loader.svg"
                  alt="Logging out"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              ) : (
                "Log Out"
              )}
            </button>
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}
          {/* Weather Data */}
          {weatherData && !loading && (
            <div className="text-center w-full px-4">
              <h2 className="sm:text-3xl text-lg font-bold">
                Weather in {weatherData.name}, {weatherData.sys.country}
              </h2>
              <div className="flex flex-col items-center mt-4">
                <div className="flex items-center">
                  <Image
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    width={100}
                    height={100}
                  />
                  <p className="sm:text-4xl text-lg font-bold">
                    {(weatherData.main.temp - 273.15).toFixed(1)} °C
                  </p>
                </div>
                <p className="sm:text-xl text-lg font-medium capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>
              {/* Weather Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 gap-2 sm:p-4 p-3 bg-gray-800 rounded-lg shadow-md text-white sm:mt-8 mt-4 w-full sm:max-w-lg max-w-sm  mx-auto">
                {/* Humidity */}
                <div className="flex flex-col items-center bg-gray-700 sm:p-4 p-2 rounded-lg">
                  <h3 className="sm:text-lg text-md font-bold">Humidity</h3>
                  <p className="sm:text-2xl text-lg font-semibold">
                    {weatherData.main.humidity}%
                  </p>
                </div>
                {/* Pressure */}
                <div className="flex flex-col items-center bg-gray-700  sm:p-4 p-2 rounded-lg">
                  <h3 className="sm:text-lg text-md font-bold">Pressure</h3>
                  <p className="sm:text-2xl text-lg font-semibold">
                    {weatherData.main.pressure} hPa
                  </p>
                </div>
                {/* Sunrise */}
                <div className="flex flex-col items-center bg-gray-700  sm:p-4 p-2 rounded-lg">
                  <h3 className="sm:text-lg text-md font-bold">Sunrise</h3>
                  <p className="sm:text-2xl text-lg font-semibold">
                    {formatTime(weatherData.sys.sunrise)}
                  </p>
                </div>
                {/* Sunset */}
                <div className="flex flex-col items-center bg-gray-700  sm:p-4 p-2 rounded-lg">
                  <h3 className="sm:text-lg text-md font-bold">Sunset</h3>
                  <p className="sm:text-2xl text-lg font-semibold">
                    {formatTime(weatherData.sys.sunset)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
