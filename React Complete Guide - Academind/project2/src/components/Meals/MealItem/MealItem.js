import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";
import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const onAddToCartHandler = (amount) => {
    cartContext.addItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price,
    })
  }

  return (
    <li className={styles.meal}>
      <div>
        {props.name}
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{`₹${props.price}`}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={onAddToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
