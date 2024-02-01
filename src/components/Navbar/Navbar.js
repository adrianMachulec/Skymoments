import styles from "./Navbar.module.scss";
import logoImg from "./../../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogoContainer}>
        <img className={styles.logo} src={logoImg} alt="logo" />
      </div>

      <div className={styles.navbarMenuContainer}>
        <ul className={styles.menu}>
          <li className={styles.menuElement}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.menuElementLinkActive : styles.menuElementLink
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className={styles.menuElement}>
            <NavLink
              to="/aboutme"
              className={({ isActive }) =>
                isActive ? styles.menuElementLinkActive : styles.menuElementLink
              }
              end
            >
              O mnie
            </NavLink>
          </li>
          <li className={styles.menuElement}>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive ? styles.menuElementLinkActive : styles.menuElementLink
              }
              end
            >
              Portfolio
            </NavLink>
          </li>
          <li className={styles.menuElement}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? styles.menuElementLinkActive : styles.menuElementLink
              }
              end
            >
              Kontakt
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
