'use client'
import { createContext, useContext, ReactNode, useState } from 'react';
import { LocationContextType } from '@/types/types';

const weatherContextDefaultValues: LocationContextType = {
  city: '',
  coordinates: { latitude: null, longitude: null },
  setCity: () => {},
  setCoordinates: () => {}, 
  clearLocation: () => {}
};

const LocationContext = createContext<LocationContextType>(weatherContextDefaultValues);

export const LocationProvider: React.FC<{ children: ReactNode }>  = ({ children }) => {
  const [city, setCity] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

  const clearLocation = () => {
    setCity('');
    setCoordinates(undefined);
  };

  return (
    <LocationContext.Provider value={{ city, coordinates, setCity, setCoordinates, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
