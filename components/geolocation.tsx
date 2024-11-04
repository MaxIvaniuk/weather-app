'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/context/LocationContext';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { setLocation } = useLocation();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        //   router.push('/forecast');
        },
        (error) => {
          console.error("Не вдалося отримати геолокацію:", error.message);
        }
      );
    } else {
      console.error("Геолокація не підтримується вашим браузером");
    }
  }, [router, setLocation]);

  return (
    <div>
      <p>Отримання геолокації...</p>
    </div>
  );
};

export default HomePage;
