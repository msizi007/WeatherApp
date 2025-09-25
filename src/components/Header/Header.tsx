import { useState } from "react";
import styles from "./header.module.css";
import { BsMenuButtonFill, BsPin } from "react-icons/bs";

interface Props {
  location: string;
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
          <button className={styles.sidebarButton}>User</button>
          <button className={styles.sidebarButton}>Locations</button>
          <button className={styles.sidebarButton}>Others</button>
        </div>
      </div>
      <div className={styles.header}>
        <BsPin size={20} />
        <p className={styles.location}>{props.location}</p>

        <BsMenuButtonFill
          style={{ cursor: "pointer" }}
          size={20}
          enableBackground={"white"}
          color="black"
          onClick={() => setShowMenu(true)}
        />
      </div>
    </>
  );
}
