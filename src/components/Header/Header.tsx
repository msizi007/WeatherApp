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
import Sidebar from "../Sidebar/Sidebar";

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
      <Sidebar
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
      />
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
