import styles from "./sidebar.module.css";

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
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
          <label className={styles.switch}>
            <input
              className={styles.input}
              type="checkbox"
              onClick={() => props.setIsDarkMode(!props.isDarkMode)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </span>
        <span className={styles.unitFilter}>
          <span className={styles.text}>Celcius (°C)</span>
          <label className={styles.switch}>
            <input
              className={styles.input}
              type="checkbox"
              onClick={() => props.setIsDarkMode(!props.isDarkMode)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <span className={styles.text}>Fahrenheit (°F)</span>
        </span>
      </div>
      {/* <div className={styles.sidebarMenus}>
          {JSON.parse(localStorage.getItem("cities")!).map(
            (city: City) =>
              city.name !== props.location.split(",")[0] && (
                <button
                  key={city.name}
                  onClick={() => {
                    props.onSearch(city.name);
                    setShowMenu(false);
                  }}
                >
                  {city.name}
                </button>
              )
          )}
        </div> */}
    </div>
  );
}
