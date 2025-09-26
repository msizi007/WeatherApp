import styles from "./weathercard.module.css";

import { FaSnowflake, FaCloudRain, FaBolt, FaSmog } from "react-icons/fa";
import { BsSnow, BsSun } from "react-icons/bs";
import { getWeatherCategory } from "../../utils/weather";

interface Props {
  day: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  status: string;
}

export default function WeatherCard(props: Props) {
  const weatherIcons = {
    freezing: <FaSnowflake size={50} color="#00bfff" />,
    extremelyCold: <BsSnow size={50} color="#1e90ff" />,
    coldRainy: <FaCloudRain size={50} color="#00aaff" />,
    stormy: <FaBolt size={50} color="gold" />,
    foggy: <FaSmog size={50} color="gray" />,
    clearOrCloudy: <BsSun size={50} color="gold" />,
  };

  // Example: render icon by category
  // const category = "stormy";
  // return weatherCategoryIcons[category];

  const category = getWeatherCategory(props.status);

  return (
    <div className={styles.card}>
      <h2 className={styles.day}>{props.day}</h2>
      {weatherIcons[category!]}
      <h2 className={styles.temperature}>{props.temperature}°</h2>
      <p className={styles.status}>{props.status}</p>
      <div className={styles.row}>
        <div className={styles.col}>
          <h4>Humidity</h4>
          <p>{props.humidity}%</p>
        </div>
        <div className={styles.col}>
          <h4>Wind Speed</h4>
          <p>{props.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
