import { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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
  const orderHandler = () => {
    setShowCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          userData: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.hideCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`₹${totalAmount.toFixed(0)}`}</span>
      </div>
      {showCheckout && (
        <Checkout
          placeOrderHandler={submitOrderHandler}
          onCancel={props.hideCartHandler}
        />
      )}
      {!showCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Placing Order...</p>;
  const didSubmitModalContent = (
    <>
      <p>Your order has been placed successfully.</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.hideCartHandler}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
