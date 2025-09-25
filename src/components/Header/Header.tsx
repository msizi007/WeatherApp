import styles from "./header.module.css";
import { BsMenuButton, BsPin } from "react-icons/bs";

interface Props {
  location: string;
}

export default function Header(props: Props) {
  return (
    <div className={styles.header}>
      <BsPin />
      <p className={styles.location}>{props.location}</p>
      <BsMenuButton />
    </div>
  );
}
