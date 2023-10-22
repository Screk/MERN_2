import React, { useState, useEffect } from "react";
import "./PrevisionCities.css";
import weatherBackgrounds from "../constants/Weather_images";

const URL = "https://api.openweathermap.org/data/2.5/forecast?";
const APIKey = "b784781030092ccc8a59b354ad745056";

const PrevisionCities = () => {
  const [city, setCity] = useState("");
  const [citiesData, setCitiesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    // Realizar el fetch aquí
    // eslint-disable-next-line no-prototype-builtins
    if (selectedCity && cityCoordinates.hasOwnProperty(selectedCity)) {
      const { latitude, longitude } = cityCoordinates[selectedCity];
      const getWeatherHere = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${URL}lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
          );
          if (response.ok) {
            const weatherJson = await response.json();
            console.log(weatherJson);

            // Filtrar los datos para mostrar solo las previsiones de las 12:00 PM
            const noonPrevision = weatherJson.list.filter((interval) =>
              interval.dt_txt.endsWith("12:00:00")
            );

            // Actualizar el estado para la ciudad seleccionada
            setCitiesData({
              ...citiesData,
              [selectedCity]: {
                list: noonPrevision,
              },
            });

            setError(null); // Reiniciar cualquier error previo
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
  };

  console.log(citiesData);

  const getBackgroundImage = (description) => {
    <weatherBackgrounds />;
    return (
      weatherBackgrounds[description] ||
      "url(https://example.com/default-background.jpg)"
    );
  };

  return (
    <div className="PrevisionCities_container">
      <div>
        <h2>Selecciona una ciudad</h2>
      </div>
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
      {citiesData[city] && (
        <div className="icon-container">
          {citiesData[city].list.map((interval, index) => (
            <>
            <div>
              <div
                key={index}
                className="weather_prevision"
                style={{
                  backgroundImage: getBackgroundImage(
                    interval.weather[0].description
                  ),
                }}
              ></div>
              <div className="previsionCities_information">
                <h3> {interval.dt_txt}</h3>
                <h3>{interval.weather[0].description}</h3>
                <h3>Temperature: {interval.main.temp} ºC</h3>
                <h3>Temp feels like: {interval.main.feels_like} ºC</h3>
                <h3>Wind speed: {interval.wind.speed} m/s</h3>
                <div>
                  <img
                    src={`https://openweathermap.org/img/w/${interval.weather[0].icon}.png`}
                    alt="Icono"
                  />
                  <img
                    src={`https://openweathermap.org/img/w/${interval.weather[0].icon}.png`}
                    alt="Icono"
                  />
                  <img
                    src={`https://openweathermap.org/img/w/${interval.weather[0].icon}.png`}
                    alt="Icono"
                  />
                </div>
              </div>
            </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrevisionCities;
