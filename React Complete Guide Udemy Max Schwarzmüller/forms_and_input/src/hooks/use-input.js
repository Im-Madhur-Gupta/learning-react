import { useState, useReducer } from "react";

// const inputReducer = (prevState, action) => {
//   if (action.type === "SET_INPUT") {
//     return {
//       enteredInput: action.inputValue,
//       enteredInputIsTouched: prevState.enteredInputIsTouched,
//     };
//   }
//   if (action.type === "SET_INPUT_TOUCHED") {
//     return {
//       enteredInput: prevState.enteredInput,
//       enteredInputIsTouched: action.touchValue,
//     };
//   }
//   return {
//     enteredInput: "",
//     enteredInputIsTouched: false,
//   };
// };
const useInput = (isInputValid) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [enteredInputIsTouched, setEnteredInputIsTouched] = useState(false);

  // useReducer ka use karna yaha pe is NOT worth it as the states are NOT complicated and are NOT inter-dependent.
  // const [inputState, inputDispatch] = useReducer(inputReducer, {
  //   enteredInput: "",
  //   enteredInputIsTouched: false,
  // });
  // const enteredInput = inputState.enteredInput;
  // const setEnteredInput = (value) => {
  //   const action = { type: "SET_INPUT", inputValue: value };
  //   inputDispatch(action);
  // };
  // const enteredInputIsTouched = inputState.enteredInputIsTouched;
  // const setEnteredInputIsTouched = (value) => {
  //   const action = { type: "SET_INPUT_TOUCHED", touchValue: value };
  //   inputDispatch(action);
  // };

  const enteredInputIsValid = isInputValid(enteredInput);
  const inputHasError = enteredInputIsTouched && !enteredInputIsValid;
  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  const inputBlurHandler = () => {
    setEnteredInputIsTouched(true);
  };
  const resetInput = () => {
    setEnteredInput("");
    setEnteredInputIsTouched(false);
  };
  return [
    enteredInput,
    enteredInputIsValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  ];
};

export default useInput;
