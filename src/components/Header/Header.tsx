import { useState } from "react";
import styles from "./header.module.css";
import {
  BsMenuButtonFill,
  BsMoon,
  BsMoonFill,
  BsPin,
  BsPinFill,
  BsSun,
  BsSunFill,
} from "react-icons/bs";
import { isCityPinned, pinCity, type City } from "../../utils/storage";

interface Props {
  location: string;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (city: string) => void;
}

export default function Header(props: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={styles.sidebar}
        style={{ display: showMenu ? "block" : "none" }}
      >
        <span
          className={styles.closeSidebar}
          onClick={() => setShowMenu(false)}
        >
          X
        </span>
        <div className={styles.sidebarMenus}>
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
        </div>
      </div>
      <div className={styles.header}>
        {isCityPinned(props.location.split(",")[0]) ? (
          <BsPinFill
            size={30}
            onClick={() => pinCity(props.location.split(",")[0])}
          />
        ) : (
          <BsPin
            size={30}
            onClick={() => pinCity(props.location.split(",")[0])}
          />
        )}

        <p className={styles.location}>{props.location}</p>

        <div className={styles.topRight}>
          <div className={styles.themeMode}>
            {props.isDarkMode ? (
              <>
                <BsMoonFill size={30} />
                <BsSun size={30} onClick={() => props.setIsDarkMode(false)} />
              </>
            ) : (
              <>
                <BsMoon size={30} onClick={() => props.setIsDarkMode(true)} />
                <BsSunFill size={30} color="gold" />
              </>
            )}
          </div>
          {props.isDarkMode ? (
            <BsMenuButtonFill
              style={{ cursor: "pointer" }}
              size={30}
              color="white"
              onClick={() => setShowMenu(true)}
            />
          ) : (
            <BsMenuButtonFill
              style={{ cursor: "pointer" }}
              size={30}
              color="black"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
