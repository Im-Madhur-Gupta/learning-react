import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map(
          ({
            // while de-structuring the object, alais name dene wali technique use ki he.
            title: itemTitle,
            quantity: itemQuantity,
            price: itemPrice,
            total: itemTotal,
          }) => (
            <CartItem
              key={itemTitle}
              item={{
                title: itemTitle,
                quantity: itemQuantity,
                total: itemPrice,
                price: itemTotal,
              }}
            />
          )
        )}
      </ul>
    </Card>
  );
};

export default Cart;
