import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = { items: [], totalAmount: 0 };
const cartReducer = (prevState, action) => {
  // yaha action ke according 3 cheeze hongi cart mai data add, modify, delete.
  if (action.type === "ADD") {
    // yaha pe prevState.push() use isliye ni kiya kyoki push() method actual array ko change kar deta he aur us original (now modified) array ko return karta he.
    // Whereas concat() method does not change the existing arrays, but instead returns a new array.

    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;

    // IMPORTANT - findIndex() method returns the 1st index of element for which its function returns true, if it doesnt return true for any element then it returns -1.
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems;
    // Agr pehle declare ni karunga to noob JS bura manjaegi.
    if (existingCartItemIndex > -1) {
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex].amount += action.item.amount;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = prevState.items[existingCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex].amount -= 1;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
