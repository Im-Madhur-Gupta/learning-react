import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = inputRef.current.value.trim();
    const enteredAmountNumber = Number(enteredAmount);
    if (
      enteredAmount.length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      // console.log(enteredAmountNumber);
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          type: "number",
          id: props.id,
          // below are some input html element specific props.
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
        ref={inputRef}
      />
      <button type="submit">Add</button>
      {!amountIsValid && (
        <p>Amount is Invalid. Enter a nmumber between 1-10.</p>
      )}
    </form>
  );
};

export default MealItemForm;
