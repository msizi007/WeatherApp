import styles from "./switch.module.css";

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Switch(props: Props) {
  return (
    <label className={styles.switch}>
      <input
        className={styles.input}
        type="checkbox"
        onClick={() => props.setState(!props.state)}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
}
