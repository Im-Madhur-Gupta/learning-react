import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index";

// Ab jin bhi components mai mujhe redux store (state) ka use karna he unko ya unke parents ko Provider component mai wrap karna padta he, wahi jo Context mai kiya tha.
// Fir Provider component ko batna padta he ki wo kis redux store ke liye he using the "store" prop.
// Now, to use the store in React components go to Counter component.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
