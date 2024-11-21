'use client'
import ForecastPage from "@/components/currentWeather/currentWeather";
import styles from "./page.module.css";
import Geolocation from "@/components/geolocation";
import Wrapper from "@/components/wrapper";
import CurrentWeather from "@/components/currentWeather/currentWeather";
import CitySearchInput from "@/components/locationInput";
import GetUserLocation from "@/components/getUserLocation";
import { useLocation } from "@/context/LocationContext";


export default function Home() {
  const { city } = useLocation()
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <GetUserLocation/>

        { city &&
          <Wrapper>
            <CurrentWeather/>
            {/* <p>{city}</p> */}
          </Wrapper>
        }

      </main>
    </div>
  );
}
