'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
}

interface LocationContextProps {
  location: Location;
  setLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
