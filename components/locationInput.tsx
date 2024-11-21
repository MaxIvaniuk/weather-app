import Image from 'next/image';
import AsyncSelect from 'react-select/async';
import { StylesConfig } from 'react-select';

import { fetchLocation } from '@/lib/weatherService';
import { useLocation } from '@/context/LocationContext';
import { TCity, SelectedCity } from '@/types/types'
import styles from './locationInput.module.css';

const CitySearchInput: React.FC = () => {

  const { city, clearLocation, setCity } = useLocation(); //global context

  const customComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  };

  const onSelectHandler = (value: SelectedCity) => {
    setCity(value.label)
  }

  const customStyles: StylesConfig<TCity, false> = {
    control: (provided) => ({
      ...provided,
      textDecoration: 'none',
      textAlign: 'left',
      outline: 'none',
      cursor: 'pointer',
      boxShadow: 'none',
      border: 'none',
      borderBottom: '1px solid var(--greenish)',
      padding: '7px',
      paddingLeft: '25px', 
      paddingRight: '0px',
      width: '350px'
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: 'left',
    }),
    singleValue: (provided) => ({
      ...provided,
      opacity: 0.5
    }),
    option: (provided) => ({
      ...provided,
      ":hover": { 
        background: "var(--gray)" 
      }
    })
}

  const citySearchApiCall = async (inputValue: string): Promise<TCity[]> => {
    return fetchLocation(inputValue)
  };
  
  return (
    <div className={styles.searchLocation}>
      <div className={styles.searchLocation_inputContainer}>
        <AsyncSelect 
          loadOptions={citySearchApiCall}
          styles={customStyles}
          cacheOptions
          isClearable
          components={customComponents}
          placeholder="Enter your city"
          onChange={value => onSelectHandler(value)}
          // onInputChange={clearLocation}
        />
        <Image
            src="/search-line-icon.svg"
            width={15}
            height={15}
            alt="search"
            className={styles.searchIcon}
        />
      </div>


    </div>
  );
};

export default CitySearchInput;
