import { getCities, type City } from "../../utils/storage";
import Switch from "../SwitchInput/Switch";
import styles from "./sidebar.module.css";

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isCelcius: boolean;
  setIsCelcius: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setCityChange: React.Dispatch<React.SetStateAction<string>>;
  fetchWeather: (q: string, days: number) => void;
}
export default function Sidebar(props: Props) {
  return (
    <div
      className={styles.sidebar}
      style={{ display: props.showMenu ? "block" : "none" }}
    >
      <span
        className={styles.closeSidebar}
        onClick={() => props.setShowMenu(false)}
      >
        X
      </span>
      <div className={styles.sidebarMenus}>
        <span className={styles.themeFilter}>
          <span className={styles.text}>Dark Mode</span>
          <Switch state={props.isDarkMode} setState={props.setIsDarkMode} />
        </span>

        <span className={styles.unitFilter}>
          <span className={styles.text}>Celcius (°C)</span>
          <Switch state={props.isCelcius} setState={props.setIsCelcius} />
          <span className={styles.text}>Fahrenheit (°F)</span>
        </span>
      </div>
      <h2 className={styles.title}>Favourite Cities</h2>
      <hr className={styles.hr} />
      {getCities()
        .filter((city: City) => city.isPinned)
        .map((city: City) => (
          <button
            className={styles.button}
            key={city.name}
            onClick={() => {
              console.log("City", city.name);

              props.setSearchInput(city.name);
              props.setCityChange(city.name);
              props.fetchWeather(city.name, 7);
              props.setShowMenu(false);
            }}
          >
            {city.name}
          </button>
        ))}
    </div>
  );
}
