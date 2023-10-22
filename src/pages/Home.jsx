import React, { useEffect, useState } from "react";
import "./Home.css";
import weatherBackgrounds from '../constants/Weather_images'; 

const URL = 'https://api.openweathermap.org/data/2.5/weather?';
const APIKey = 'b784781030092ccc8a59b354ad745056';

const Home = () => {
  const [latitude, setLatitude] = useState('null');
  const [longitude, setLongitude] = useState('null');
  const [weatherHere, setWeatherHere] = useState(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(true);

  useEffect(() => {
    const checkGeolocationPermission = async () => {
      const geolocationPermission = await navigator.permissions.query({ name: 'geolocation' });
      if (geolocationPermission.state === 'granted') {
        setLocationPermissionGranted(true);
      } else {
        setLocationPermissionGranted(false);
      }
    };

    checkGeolocationPermission();
  }, []);

  const backgroundStyle = {
    backgroundImage: weatherBackgrounds[weatherHere?.weather] || 'url(https://example.com/default-background.jpg)',
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude !== 'null' && longitude !== 'null' && weatherHere === null) {
      const getWeatherHere = async () => {
        const response = await fetch(
          `${URL}lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
        );
        if (response.ok) {
          const weatherJson = await response.json();
          console.log(weatherJson);
          setWeatherHere({
            weather: weatherJson.weather[0].description,
            icon: weatherJson.weather[0].icon,
            main: weatherJson.weather[0].main,
            temperature: weatherJson.main.temp,
            temperature_feelslike: weatherJson.main.feels_like,
            name: weatherJson.name,
            wind: weatherJson.wind.speed,
          });
        }
      };
      getWeatherHere();
    }
  }, [latitude, longitude, weatherHere]);

  return (
    <div className="home_container">
      <h2>Weather information</h2>
      <div className="home_container_weather">
      {!locationPermissionGranted ? (
        <p>Debes otorgar permisos de geolocalización para utilizar la aplicación.</p>
      ) : (
        <>
        <div className="weather_container" style={backgroundStyle}>

        </div>
        <div className="Home_weather_information">
        {weatherHere ? (
            <div>
              <h2>The weather in {weatherHere.name} is:</h2>
              <h2>{weatherHere.weather}</h2>
              <h3>Temperature: {weatherHere.temperature} ºC</h3>
              <h3>Temperature feels like: {weatherHere.temperature_feelslike} ºC</h3>
              <h3>Wind speed: {weatherHere.wind} m/s</h3>
              <div>
                <img src={`https://openweathermap.org/img/w/${weatherHere.icon}.png`} alt="Icono" />
                <img src={`https://openweathermap.org/img/w/${weatherHere.icon}.png`} alt="Icono" />
                <img src={`https://openweathermap.org/img/w/${weatherHere.icon}.png`} alt="Icono" />
              </div>
            </div>
          ) : (
            <p>Cargando el clima...</p>
          )}
        </div>
        </>)}
      </div>
    </div>
  );
};

export default Home;
