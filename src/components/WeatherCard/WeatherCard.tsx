import type { IconType } from "react-icons";
import styles from "./weathercard.module.css";
import { Link } from "react-router-dom";

interface Props {
  day: string;
  icon: IconType;
  temperature: number;
  status: string;
}

export default function WeatherCard(props: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.day}>{props.day}</h2>
      <props.icon size={60} />
      <h2 className={styles.temperature}>{props.temperature}°</h2>
      <p className={styles.status}>{props.status}</p>
      <span className={styles.more}>
        <Link to="">more &gt;</Link>
      </span>
    </div>
  );
}
