import { BiSearch } from "react-icons/bi";
import styles from "./searchbar.module.css";

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <input
        className={styles.input}
        type="text"
        placeholder="search for a city..."
      />
      <BiSearch className={styles.icon} size={30} />
    </div>
  );
}
