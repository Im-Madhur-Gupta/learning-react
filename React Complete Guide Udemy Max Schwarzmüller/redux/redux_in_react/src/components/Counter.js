import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
// useSelector hook se mai access karunga selected part of redux store (state) ko.
// useStore hook se bhi access kar sakte he but wo pura ka pura store (state) de dega.
// connect function bhi hota he class based components ke liye.
// useDispatch se mai action dispatch kar sakta hu.

import { counterActions } from "../store/counter-slice";

const Counter = () => {
  const dispatch = useDispatch(); // useDispatch returns a function which we can execute with an action object to "dispatch an action".

  // getting the counter state from the redux store and attaching it to this component -
  const counter = useSelector((state) => state.counterSlice.counter);
  // Ab useSelector apne app "SUBSCRIPTION" bana dega is component aur redux store ke beech,
  // To jab bhi store mai counter ki value update hogi to wo updated value yaha mil jaegi, aur ye component re-evaluate hoga.
  // Aur agr ye component DOM se hat gya to react redux ye "SUBSCRIPTION" ko bhi delete kar dega.

  const isCounterHidden = useSelector(
    (state) => state.counterSlice.isCounterHidden
  );

  // Bina redux toolkit ke likha.
  // const incrementHandler = (value) => {
  //   dispatch({ type: "INCREMENT", value: value });
  // };

  // const decrementHandler = () => {
  //   dispatch({ type: "DECREMENT" });
  // };

  // const toggleCounterHandler = () => {
  //   dispatch({ type: "TOGGLE_COUNTER" });
  // };

  // Redux toolkit ke sath -
  const incrementHandler = (value) => {
    dispatch(counterActions.increment(value));
    // the action object which will be given to dispatch() func -
    // {type:SOME_UNIQUE_IDENTIFIER, payload: value}
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isCounterHidden ? (
        <p>Counter is Hidden.</p>
      ) : (
        <div className={classes.value}>{counter}</div>
      )}
      <div>
        <button
          onClick={() => {
            incrementHandler(1);
          }}
        >
          Increment by 1
        </button>
        <button
          onClick={() => {
            incrementHandler(5);
          }}
        >
          Increment by 5
        </button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
