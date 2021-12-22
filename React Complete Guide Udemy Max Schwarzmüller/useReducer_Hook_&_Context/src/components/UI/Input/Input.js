import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  // React.forwardRef mai component ko wrap karna mat bhoolo.
  (
    {
      inputTitle,
      inputIsValid,
      inputValue,
      inputChangeHandler,
      validateInputHandler,
    },
    ref
    // props ke sath sath React component mai ref bhi as argument le sakte he ye wahi ref hoga jo parent component ne diya hoga.
  ) => {
    const inputRef = useRef();
    const focusInput = () => {
      inputRef.current.focus();
      // Ref bana kr focus() method trigger kar diya input tag ka (std html tag).
    };
    // useImperativeHandle se jaha is component ka Ref banaya waha iske internal functions bhi use kar sakte.
    // Takes 2 arguments (ref, func that returns an object that should contain all the methods/variables that we want to access with its ref in its parent)
    // Below object ke hisab se activate name se focusInput method available ho jaega.
    useImperativeHandle(ref, () => ({
      activate: focusInput,
    }));

    return (
      <div
        className={`${classes.control} ${
          inputIsValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={`${inputTitle.toLowerCase()}`}>{inputTitle}</label>
        <input
          type={`${inputTitle.toLowerCase()}`}
          id={`${inputTitle.toLowerCase()}`}
          value={inputValue}
          onChange={inputChangeHandler}
          onBlur={validateInputHandler}
          ref={inputRef}
        />
      </div>
    );
  }
);

export default Input;
