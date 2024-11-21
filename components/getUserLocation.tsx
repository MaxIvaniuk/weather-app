'use client'
import React, { useState, useEffect } from 'react';
import CitySearchInput from './locationInput';
import styles from './getUserLocation.module.css'
import { fetchWeatherByCoordinates, fetchWeatherByCity } from '@/lib/weatherService';
import { useLocation } from '@/context/LocationContext';

// interface GetUserLocationProps {
//   onWeatherData: (data: any) => void;
// }

// type Coordinates = {
//   longitude: number,
//   latitude: number
// }

const GetUserLocation: React.FC<GetUserLocationProps> = () => {

  const { city, coordinates, setCity, setCoordinates, clearLocation } = useLocation()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleCitySelect = async (city: string ) => {
    setCity(city)
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(city);
      console.log(data)
    } catch (err) {
      setError('Не вдалося завантажити погоду для вибраного міста.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      handleCitySelect(city)
    }
  }, [city])

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude })
          try {
            const data = await fetchWeatherByCoordinates(latitude, longitude);
            // onWeatherData(data);
          } catch (err) {
            setError(`Can't get weather by coordinates: ${err}`);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError(`Geolocation was declined: ${err}`);
          setLoading(false);
        }
      );
    } else {
      setError('Your browser does not support geolocation.');
    }
  };

  return (
    <div className={styles.getLocation_wrapper}>
      <div className={styles.getLocation_text}>
          <h1>Welcome to simple weather app!</h1>
          {!city && 
          <p>Please   
            <button onClick={handleGetLocation}>enable your location</button>
            or enter your city manually.
          </p>}
      </div>
      <div>
          <CitySearchInput />
      </div>
      
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GetUserLocation;
