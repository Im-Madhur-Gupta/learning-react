import { useContext} from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = cartContext.totalAmount;
  const hasItems = cartContext.items.length > 0; // Yaha state lagane ki zarorat ni he, kyoki ye pehle se hi cartContext (state) ka use karta he.
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
    // Note - Remove karne me ek sath bohot sare items remove karne ka mai user ko allow hi ni kar raha. Ek baar mai sirf amount -= 1. 
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          // map function ke andar key prop dena padta he
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          // SUPER IMPORTANT - bind() method allows us to preconfigure the arguments of a function that it should recieve while execution. If argument list is different from what is provided then function doesn't run.
          // Ye dono functions buttons ke onClick pe lage he jo ki event dega lekin us event ka koi kaam ni he to uss event to configure kardiya as null.
        />
      ))}
    </ul>
  );
  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`₹${totalAmount.toFixed(0)}`}</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles["button--alt"]}
          onClick={props.hideCartHandler}
        >
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
