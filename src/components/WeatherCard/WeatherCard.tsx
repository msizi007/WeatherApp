import styles from "./weathercard.module.css";
import { Link } from "react-router-dom";

import { FaCloudRain, FaSun } from "react-icons/fa6";
import { BsCloudSun } from "react-icons/bs";
import { IoRainyOutline } from "react-icons/io5";

interface Props {
  day: string;
  temperature: number;
}

export default function WeatherCard(props: Props) {
  const statusIcon = {
    Freezing: <IoRainyOutline size={50} />,
    Cool: <BsCloudSun size={50} />,
    Warm: <FaCloudRain size={50} />,
    Sunny: <FaSun size={50} />,
    "Extremely Hot": <FaCloudRain size={50} />,
    unknown: null, // or you can provide a default icon here
  };

  function getStatus(temp: number) {
    switch (true) {
      case temp <= 10:
        return "Freezing";
      case temp <= 20:
        return "Cool";
      case temp <= 30:
        return "Sunny";
      case temp <= 40:
        return "Extremely Hot";

      default:
        return "unknown";
    }
  }
  const status = getStatus(props.temperature);
  return (
    <div className={styles.card}>
      <h2 className={styles.day}>{props.day}</h2>
      {statusIcon[status]}
      <h2 className={styles.temperature}>{props.temperature}°</h2>
      <p className={styles.status}>{status}</p>
      <span className={styles.more}>
        <Link to="">more &gt;</Link>
      </span>
    </div>
  );
}
