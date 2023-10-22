import React, { useState, useEffect } from "react";
import "./Cities.css";
import weatherBackgrounds from "../constants/Weather_images";

const URL = "https://api.openweathermap.org/data/2.5/weather?";
const APIKey = "b784781030092ccc8a59b354ad745056";

const Cities = () => {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherCity, setWeatherCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  <weatherBackgrounds />;

  const backgroundStyle = {
    backgroundImage:
      weatherBackgrounds[weatherCity?.weather] ||
      "url(https://example.com/default-background.jpg)",
  };

  const cityCoordinates = {
    madrid: { latitude: 40.4168220618605, longitude: -3.689073326470221 },
    barcelona: { latitude: 41.3935930031402, longitude: 2.161456875328097 },
    sevilla: { latitude: 37.38736717591267, longitude: -5.984241425187374 },
    murcia: { latitude: 37.99013137882087, longitude: -1.1282060067349104 },
    ourense: { latitude: 42.33670642866253, longitude: -7.8642017127746575 },
  };

  const onchangeCity = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
  };

  useEffect(() => {
    if (city && cityCoordinates.hasOwnProperty(city)) {
      const { latitude, longitude } = cityCoordinates[city];
      const getWeatherHere = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${URL}lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
          );
          if (response.ok) {
            const weatherJson = await response.json();
            console.log(weatherJson);
            setWeatherCity({
              weather: weatherJson.weather[0].description,
              icon: weatherJson.weather[0].icon,
              main: weatherJson.weather[0].main,
              temperature: weatherJson.main.temp,
              temperature_feelslike: weatherJson.main.feels_like,
              name: weatherJson.name,
              wind: weatherJson.wind.speed,
            });
            setError(null);
          } else {
            setError("Error al obtener el clima");
          }
        } catch (error) {
          setError("Error de red al obtener el clima");
        } finally {
          setLoading(false);
        }
      };
      getWeatherHere();
    }
  }, [city]);

  console.log(latitude);
  console.log(longitude);

  return (
    <>
      <div className="Cities_container">
        <div>
          <h2>Select one city</h2>
        </div>
        <div className="container">
          <select onChange={onchangeCity}>
            <option value=""></option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
            <option value="sevilla">Sevilla</option>
            <option value="murcia">Murcia</option>
            <option value="ourense">Ourense</option>
          </select>
          {loading && <p>Cargando el clima...</p>}
          {error && <p>{error}</p>}
          <div className="big_container2">
            <div className="weather_image" style={backgroundStyle}></div>
            <div className="Cities_weather_information">
              {weatherCity ? (
                <div>
                  <h2>The weather in {weatherCity.name} is:</h2>
                  <h2>{weatherCity.weather}</h2>
                  <h3>Temperature: {weatherCity.temperature} ºC</h3>
                  <h3>
                    Temperature feels like: {weatherCity.temperature_feelslike} ºC
                  </h3>
                  <h3>Wind speed: {weatherCity.wind} m/s</h3>
                  <div>
                    <img
                      src={`https://openweathermap.org/img/w/${weatherCity.icon}.png`}
                      alt="Icono"
                    />
                    <img
                      src={`https://openweathermap.org/img/w/${weatherCity.icon}.png`}
                      alt="Icono"
                    />
                    <img
                      src={`https://openweathermap.org/img/w/${weatherCity.icon}.png`}
                      alt="Icono"
                    />
                  </div>
                </div>
              ) : (
                <p>Cargando el clima...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cities;
