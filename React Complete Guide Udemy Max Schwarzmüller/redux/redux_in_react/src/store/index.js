import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./counter-slice";
import authSliceReducer from "./auth-slice";

const store = configureStore({
  // IMPORTANT - Combining reducers of various state slices.
  // useSelector mai state.counterSlice se 1st slice access hogi.
  reducer: { counterSlice: counterSliceReducer, authSlice: authSliceReducer },
});

export default store;
