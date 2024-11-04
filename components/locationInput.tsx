import { useState, useEffect } from 'react';
import { fetchLocation } from '@/lib/weatherService';
import styles from './locationInput.module.css';
import Image from 'next/image';

interface City {
  id: string;
  name: string;
  country: string;
}

interface CitySearchInputProps {
  onSelectCity: (city: City) => void;
}

interface CityResultListProps {
  isLoading: boolean;
  results: City[];
  onCitySelect: (city: City) => void;
}

const CityResultList: React.FC<CityResultListProps> = ({ isLoading, results, onCitySelect }) => {
  return (
    <ul className={styles.searchLocation_results}>
      {results.map((city) => (
        <li key={city.id} onClick={() => onCitySelect(city)}>
          {city.name}, {city.country}
        </li>
      ))}
      {isLoading && <li>Loading...</li>}
    </ul>
  );
};

const CitySearchInput: React.FC<CitySearchInputProps> = ({ onSelectCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLocation(query);
        const cities = data.map((city: any) => ({
          id: city.id,
          name: city.name,
          country: city.country,
        }));
        setSuggestions(cities);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error with fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (city: City) => {
    setQuery(city.name);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelectCity(city);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value === '' || value.length <= 2) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={styles.searchLocation}>
      <div className={styles.searchLocation_inputContainer}>
        <input
          id="locationInput"
          className={styles.searchLocation_input}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your city"
        />
        <label htmlFor="locationInput" className={styles.searchInput_icon}>
          <Image
            src="/search-line-icon.svg"
            width={15}
            height={15}
            alt="search"
          />
        </label>
      </div>

      {showSuggestions && (
        <CityResultList
          isLoading={isLoading}
          results={suggestions}
          onCitySelect={handleSelect}
        />
      )}
    </div>
  );
};

export default CitySearchInput;
