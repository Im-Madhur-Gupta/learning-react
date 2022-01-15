import classes from "./Counter.module.css";
import { useSelector } from "react-redux";
// useSelector hook se mai access karunga selected part of redux store (state) ko.
// useStore hook se bhi access kar sakte he but wo pura ka pura store (state) de dega.
// connect function bhi hota he class based components ke liye.

const Counter = () => {
  // getting the counter state from the redux store and attaching it to this component -
  const counter = useSelector((state) => state.counter);
  // Ab useSelector apne app "SUBSCRIPTION" bana dega is component aur redux store ke beech,
  // To jab bhi store mai counter ki value update hogi to wo updated value yaha mil jaegi, aur ye component re-evaluate hoga.
  // Aur agr ye component DOM se hat gya to react redux ye "SUBSCRIPTION" ko bhi delete kar dega.

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
