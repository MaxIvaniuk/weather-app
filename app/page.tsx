import ForecastPage from "@/components/currentWeather/currentWeather";
import styles from "./page.module.css";
import Geolocation from "@/components/geolocation";
import Wrapper from "@/components/wrapper";
import CurrentWeather from "@/components/currentWeather/currentWeather";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          {/* <div className={styles.greeting}> */}
            {/* <h1>Welcome to simple weather app!</h1>
            <p>Please enable your location to get forecast.</p> */}
            {/* <Geolocation/>
            <ForecastPage/> */}
          {/* </div> */}
          <Wrapper>
            <CurrentWeather/>
          </Wrapper>
      </main>
      <footer className={styles.footer}>
        <p>By Max Ivaniuk</p>
      </footer>
    </div>
  );
}
