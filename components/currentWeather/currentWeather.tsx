'use client'
import { useEffect, useState } from 'react';

import WeatherLocation from './weatherLocation';
import styles from "./currentWeather.module.css";

import { fetchWeatherByCity } from '@/lib/weatherService';
import { TWeatherData, TCoordinates } from '@/types/types';
import { useLocation } from '@/context/LocationContext';

export default function CurrentWeather() {
  const { city } = useLocation()

  const [weather, setWeather] = useState<TWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city.length > 1) {
      try {
        fetchWeatherByCity(city)
          .then(data => {
            setWeather(data)
          })
      } catch (err) {
        setError(`Something went wrong: ${err}`)
      }
    }
  }, [city])

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Завантаження...</p>;

  return (
    <>
      { weather &&
        <div className={styles.currentWeather_container}>
          <div className={styles.currentWeather_header}>
            <p className={styles.currentWeather_headerTime}>{weather?.location.localtime.split(" ")[1]}</p>
            <WeatherLocation
              city={`${weather?.location.name}, ${weather?.location.country}`}
            />
          </div>
    
          <p className={styles.currentWeather_temp}>{weather?.current.temp_c}<span>°</span></p>
          <p className={styles.currentWeather_condition}>{weather?.current.condition.text}</p>
        </div>
      }
    </>
  );
};
