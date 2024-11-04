import styles from './wLocation.module.css'

interface WeatherLocation {
    city: string;
}

const WeatherLocation: React.FC<WeatherLocation> = ({ city }) => (
    <div className={styles.location_wrapper}>
        <h3 className={styles.location_city}>{city}</h3>
    </div>
)

export default WeatherLocation;