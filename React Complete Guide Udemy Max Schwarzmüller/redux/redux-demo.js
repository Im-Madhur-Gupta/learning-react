const redux = require("redux");
// purane style se import kar liya Node doesnt support ES6 syntax.

// making the reducer function for the store (state), it recieves prevState and action object as inputs.
// Ye reducer func by default ek baar chalta he to give out the default store value, but is initial state change/updation pe subscriber functions ni chalte.
// initial state de diya maine reducer function ko using default parameters, taki 1st time store ki default value dete waqt iske pass kuch initial state rahe.
// Ab default initialization of store pai action object ka type match ni karega to wo prevState hi return kar dega.
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
  return prevState; // agr increment type ni he to prevstate hi return kardo.
};

// creating the store (state)
const store = redux.createStore(counterReducerFunction);

// store after initialization run of reducer function
console.log("store state just after initialization ", store.getState());

// creating a subscriber for our store
const counterSubscriber = () => {
  const latestState = store.getState(); // store ka getState() method returns the latest state after an updation.
  console.log("store state after 1st action is dispatched ", latestState);
};

// making redux aware that a subscriber for its store exists -
store.subscribe(counterSubscriber);
// Now, redux will execute the counterSubscriber function whenever the store (state) data gets updated.

// dispatching an action
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
