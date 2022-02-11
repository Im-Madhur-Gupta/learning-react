import mealImg from "../../assests/meals.jpg";
import styles from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Indian Meals</h1>
        <HeaderCartButton showCartHandler={props.showCartHandler} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImg} alt="Meal" />
      </div>
    </>
  );
};

export default Header;
