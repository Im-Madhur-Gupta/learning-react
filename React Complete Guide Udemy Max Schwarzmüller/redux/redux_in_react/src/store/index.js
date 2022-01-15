import { createStore } from "redux";

const counterReducerFunction = (prevState = { counter: 0 }, action) => {
  if (action.type === "INCREMENT") {
    return {
      counter: prevState.counter + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      counter: prevState.counter - 1,
    };
  }
  return prevState;
};

const store = createStore(counterReducerFunction);

export default store; // exporting my redux store so that I can "provide" it to my React app. Go to index.js of React app.
