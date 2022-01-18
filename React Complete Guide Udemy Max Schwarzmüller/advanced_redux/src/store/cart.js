import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  totalItemsInCart: 0,
  cartItems: [],
  showCart: false,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const { title, quantity, price } = action.payload;
      const total = quantity * price;
      state.totalItemsInCart += quantity;
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
