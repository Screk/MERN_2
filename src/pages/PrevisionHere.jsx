import React, { useEffect, useState } from 'react';
import './PrevisionHere.css';
import weatherBackgrounds from '../constants/Weather_images'

const URL = 'https://api.openweathermap.org/data/2.5/forecast?';
const APIKey = 'b784781030092ccc8a59b354ad745056';

const PrevisionHere = () => {
  const [latitude, setLatitude] = useState('null');
  const [longitude, setLongitude] = useState('null');
  const [previsionHere, setPrevisionHere] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude !== 'null' && longitude !== 'null' && previsionHere === null) {
      const getPrevisionHere = async () => {
        const response = await fetch(
          `${URL}lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`
        );
        if (response.ok) {
          const weatherJson = await response.json();
          console.log(weatherJson)
          setPrevisionHere({
            list: weatherJson.list,
          });
        }
      };
      getPrevisionHere();
    }
  }, [latitude, longitude, previsionHere]);


  const filterNoonPrevision = (list) => {
    return list.filter((interval) => {
      return interval.dt_txt.endsWith('12:00:00');
    });
  };

  const getBackgroundImage = (description) => {
    < weatherBackgrounds />

    return weatherBackgrounds[description] || 'url(https://example.com/default-background.jpg)';
  };

  return (
    <div className="big_container">
      <h2>Previsión del Tiempo en tu Ubicación</h2>
      {previsionHere ? (
        <div className="prevision_container">
          {filterNoonPrevision(previsionHere.list).map((interval, index) => (
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
                >
                </div>
                <div className='previsionHere_information'>
                  <h3> {interval.dt_txt}</h3>
                  <h3>{interval.weather[0].description}</h3>
                  <h3>Temperature: {interval.main.temp} ºC</h3>
                  <h3>
                    Temp feels like: {interval.main.feels_like} ºC
                  </h3>
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
      ) : (
        <p>Cargando la previsión del tiempo...</p>
      )}
    </div>
  );
};

export default PrevisionHere;



