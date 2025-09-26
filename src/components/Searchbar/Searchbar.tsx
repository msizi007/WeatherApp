import { BiSearch } from "react-icons/bi";
import styles from "./searchbar.module.css";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}
export default function Searchbar(props: Props) {
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.searchbar}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSearch();
        }}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="search for a city..."
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
        />
        <BiSearch className={styles.icon} size={30} onClick={props.onSearch} />
      </form>
    </div>
  );
}
