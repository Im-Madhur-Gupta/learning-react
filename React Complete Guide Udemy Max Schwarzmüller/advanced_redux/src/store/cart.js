import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  totalItemsInCart: 0,
  cartItems: [],
  showCart: false,
  changed: false,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.cartItems = action.payload.cartInfo.cartItems;
      state.totalItemsInCart = action.payload.cartInfo.totalItemsInCart;
    },
    addItem(state, action) {
      const { title, quantity, price } = action.payload;
      const total = quantity * price;
      state.totalItemsInCart += quantity;
      state.changed=true;
      let matchedItem = state.cartItems.find(
        (element) => element.title === title
        );
        if (matchedItem) {
          matchedItem.quantity += quantity;
          matchedItem.total += total;
        } else {
        state.cartItems.push({ ...action.payload, total: total });
      }
    },
    removeItem(state, action) {
      state.totalItemsInCart--;
      state.changed=true;
      let matchedItem = state.cartItems.find(
        (element) => element.title === action.payload.title
      );
      matchedItem.quantity--;
      matchedItem.total -= matchedItem.price;
      state.cartItems = state.cartItems.filter(
        (element) => element.quantity !== 0
      );
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
