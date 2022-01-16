import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, isCounterHidden: false };
const counterSlice = createSlice({
  name: "counterSlice",
  initialState: initialCounterState,
  reducers: {
    increment(state, action) {
      state.counter = state.counter + action.payload;
    },
    decrement(state) {
      state.counter--;
    },
    toggleCounter(state) {
      state.isCounterHidden = !state.isCounterHidden;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
