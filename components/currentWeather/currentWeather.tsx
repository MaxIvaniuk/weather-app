'use client'
import { useEffect, useState } from 'react';

import { fetchWeather } from '@/lib/weatherService';
import WeatherLocation from './weatherLocation';
import styles from "./currentWeather.module.css";
import CitySearchInput from '../locationInput';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export default function CurrentWeather() {
  const [location, setLocation] = useState<Location | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Не вдалося отримати геолокацію:", error.message);
          setError("Не вдалося отримати геолокацію");
        }
      );
    } else {
      console.error("Геолокація не підтримується вашим браузером");
      setError("Геолокація не підтримується вашим браузером");
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather(location.latitude!, location.longitude!)
        .then((data) => {
          console.log(data)
          setWeather(data);
        })
        .catch(() => {
          setError('Не вдалося отримати дані про погоду');
        });
    }
  }, [location]);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Завантаження...</p>;

  return (
    <div className={styles.currentWeather_container}>
      <div className={styles.currentWeather_header}>
        <CitySearchInput />
        <p className={styles.currentWeather_headerTime}>{weather.location.localtime.split(" ")[1]}</p>
        <WeatherLocation
          city={`${weather.location.name}, ${weather.location.country}`}
        />
      </div>

      <p className={styles.currentWeather_temp}>{weather.current.temp_c}<span>°</span></p>
      <p className={styles.currentWeather_condition}>{weather.current.condition.text}</p>
    </div>
  );
};
