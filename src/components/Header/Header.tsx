import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { BsMenuButtonFill, BsStar, BsStarFill } from "react-icons/bs";
import { isCityPinned, pinCity } from "../../utils/storage";
import Sidebar from "../Sidebar/Sidebar";

interface Props {
  city: string;
  country: string;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (city: string) => void;
  isCelcius: boolean;
  setIsCelcius: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setCityChange: React.Dispatch<React.SetStateAction<string>>;
  fetchWeather: (q: string, days: number) => void;
}

export default function Header(props: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [isPinned, setIsPinned] = useState(isCityPinned(props.city));

  useEffect(() => {
    setIsPinned(isCityPinned(props.city));
  }, [isPinned, props.city]);

  return (
    <>
      <Sidebar
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
        isCelcius={props.isCelcius}
        setIsCelcius={props.setIsCelcius}
        setSearchInput={props.setSearchInput}
        setCityChange={props.setCityChange}
        fetchWeather={props.fetchWeather}
      />
      <div className={styles.header}>
        <div className={styles.favourites}>
          {isPinned ? (
            <>
              <BsStarFill
                color="#3f51b5ee"
                size={30}
                onClick={() => {
                  pinCity(props.city);
                  setIsPinned(!isPinned);
                }}
              />
            </>
          ) : (
            <>
              <BsStar
                size={30}
                onClick={() => {
                  setIsPinned(!isPinned);
                  pinCity(props.city);
                }}
              />
            </>
          )}
        </div>

        <p className={styles.location}>
          {props.city}, {props.country}
        </p>

        <div className={styles.topRight}>
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
              color="#3f51b5ee"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </div>
    </>
  );
}
