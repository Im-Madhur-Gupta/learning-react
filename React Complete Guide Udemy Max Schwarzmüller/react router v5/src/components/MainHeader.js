import { NavLink } from "react-router-dom";
// NavLink over Link because -
// NavLink pai styling kar sakte he Link pe ni.
// Navlink jo clicked/active he usse special css classes deke highlight karwa sakte he using the activeClassName prop.

import styles from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
