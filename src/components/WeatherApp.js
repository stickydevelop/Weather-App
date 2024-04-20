// src/components/WeatherApp.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../tailwind.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [error, setError] = useState('');

  const API_KEY = '00f36bb42f4f6d5ffc6120a8095b94d8';
  const API_URL = 'https://api.openweathermap.org/data/2.5';

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError(''); // Clear error when user starts typing again
  };

  const handleUnitToggle = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const fetchData = async () => {
    try {
      // Clear error message when fetching new data
      setError('');
  
      const response = await axios.get(`${API_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: unit,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('City not found. Please enter a valid city name.');
    }
  };

  useEffect(() => {
    if (city.trim() !== '') {
      fetchData();
    }
  }, [city, unit]);

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2018/05/20/22/55/thunderstorm-3417042_1280.jpg")', backgroundSize: 'cover' }}
    >
      <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md">
        <h1 className="text-5xl font-bold mb-4">Weather Forecast App</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="flex mb-4">
          <button onClick={fetchData} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
            Get Weather
          </button>
          <button onClick={handleUnitToggle} className="bg-gray-300 py-2 px-4 rounded-md">
            Toggle Unit ({unit === 'metric' ? 'C' : 'F'})
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {weatherData && !error && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Current Weather</h2>
            <p>Temperature: {weatherData.main.temp} °{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Min Temperature: {weatherData.main.temp_min} °{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Max Temperature: {weatherData.main.temp_max} °{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Wind Direction: {weatherData.wind.deg}°</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
