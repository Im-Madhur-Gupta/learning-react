import { useState } from "react";

const useInput = (isInputValid) => {
  const [enteredInput, setEnteredInput] = useState("");
  const enteredInputIsValid = isInputValid(enteredInput);
  const [enteredInputIsTouched, setEnteredInputIsTouched] = useState(false);
  const inputIsValid = !enteredInputIsTouched || enteredInputIsValid;
  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  const inputBlurHandler = () => {
    setEnteredInputIsTouched(true);
  };
  return [
    enteredInput,
    setEnteredInput,
    enteredInputIsValid,
    setEnteredInputIsTouched,
    inputIsValid,
    inputChangeHandler,
    inputBlurHandler,
  ];
};

export default useInput;
