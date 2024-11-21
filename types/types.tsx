export interface City {
    id: string;
    name: string;
    country: string;
}
  
// export interface CitySearchInputProps {
//     onSelectCity: (city: string) => void;
// }
  
export interface CityResultListProps {
    isLoading: boolean;
    results: City[];
    onCitySelect: (city: City) => void;
}

export interface TCity {
    value: number,
    label: string
}

export interface SelectedCity {
    label: string,
    value: number
}

export type LocationContextType = {
    city: string;
    coordinates?: { latitude: number|null; longitude: number|null };
    setCity: (city: string) => void;
    setCoordinates: (coords: { latitude: number; longitude: number }) => void;
    clearLocation: () => void;
}

export interface WeatherData {
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

export interface TCoordinates {
    latitude: number | null;
    longitude: number | null;
}