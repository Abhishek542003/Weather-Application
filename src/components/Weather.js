import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");


  const API_KEY = "f04adefa8c477d7d5b3fdb3e41391051";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    fetchRandomImage();
  }, []);


  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=nature&client_id=hz9HCH6TB3ct3CAVsSS6Kpnm43YGWED1o4dbieo9okw`
      );
      setBackgroundImage(response.data.urls.regular);
    } catch (error) {
      console.error(error);
      // Display a default image if an error occurs or API limit is exceeded
      setBackgroundImage(
        "https://th.bing.com/th/id/R.9947136ca87532ad092cd7ccce2ba658?rik=viXo8nVY2aD2KQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fQqoJ2H2.jpg&ehk=JkNYHMfy82ktW8E1c7szOLWEad2xq%2bqQnisyQQE0ni8%3d&risl=&pid=ImgRaw&r=0"
      );
    }
  };



  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="content">
        <h2>Weather App <i class="fa-sharp fa-solid fa-sun " style={{ color: "red" }}></i></h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p className="loading">Loading...</p>}
        {weatherData && (
          <div className="weather-card">
            <h3>
              Weather in <span>{weatherData.name}</span>
            </h3>
            <p className="data">
              Temperature: {Math.round(weatherData.main.temp - 273.15)} °C
            </p>
            <p className="data">
              Weather: {weatherData.weather[0].description}
            </p>
            <p className="data">Date: {currentDateTime.split(",")[0]}</p>
            <p className="data">Time: {currentDateTime.split(",")[1]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
