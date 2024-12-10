"use client"
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async () => {
    try {
      const lat = 19.0760; // Example latitude
      const lon = 72.8777; // Example longitude
  
      const response = await axios.get(`http://localhost:3001/dev/api/weather`, {
        params: { lat, lon }, // Pass lat and lon as query parameters
      });
  
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const togglePin = async (provider) => {
    await axios.post("http://localhost:3001/dev/api/weather/togglePin", { provider });
    fetchWeatherData();
  };

  return (
    <div>
      <button onClick={fetchWeatherData}>Fetch Weather Data</button>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Temperature</th>
            <th>Wind Speed</th>
            <th>Conditions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data) => (
            <tr key={data.provider}>
              <td>{data.provider}</td>
              <td>{data.temperature}</td>
              <td>{data.wind_speed}</td>
              <td>{data.conditions}</td>
              <td>
                <button onClick={() => togglePin(data.provider)}>
                  {data.pinned ? "Unpin" : "Pin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
