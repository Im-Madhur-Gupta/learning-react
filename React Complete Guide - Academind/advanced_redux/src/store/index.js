import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart";

const store = configureStore({
  reducer: { cartSlice: cartSlice.reducer },
});

export default store;
