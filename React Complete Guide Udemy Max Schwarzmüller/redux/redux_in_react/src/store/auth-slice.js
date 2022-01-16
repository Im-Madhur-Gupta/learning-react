import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { email: "", isLoggedIn: false };
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
