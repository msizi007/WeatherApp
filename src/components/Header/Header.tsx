import { useState } from "react";
import styles from "./header.module.css";
import {
  BsMenuButtonFill,
  BsMoonFill,
  BsPin,
  BsPinFill,
  BsSunFill,
} from "react-icons/bs";
import { isCityPinned, pinCity, type City } from "../../utils/storage";

interface Props {
  city: string;
  country: string;
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
      <div className={styles.header}>
        {/* {isCityPinned(props.location.split(",")[0]) ? (
          <BsPinFill
            size={30}
            onClick={() => pinCity(props.location.split(",")[0])}
          />
        ) : (
          <BsPin
            size={30}
            onClick={() => pinCity(props.location.split(",")[0])}
          />
        )} */}

        <p className={styles.location}>
          {props.city}, {props.country}
        </p>

        <div className={styles.topRight}>
          <div className={styles.theme}>
            {props.isDarkMode ? (
              <BsSunFill
                size={30}
                color="gold"
                onClick={() => props.setIsDarkMode(false)}
              />
            ) : (
              <BsMoonFill
                size={30}
                color="black"
                onClick={() => props.setIsDarkMode(true)}
              />
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
