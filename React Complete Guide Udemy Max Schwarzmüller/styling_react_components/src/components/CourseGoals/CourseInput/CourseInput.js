import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault(); // to cancel page reload
    if (isValid) {
      props.onAddGoal(enteredValue);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* Dynamic Inline styles dene ki jagah maine dynamic css class names de diye he. */}
      {/* <div className={`form-control ${!isValid ? "invalid" : ""}`}> WITHOUT CSS MODULES WALA 
          Yaha styles.form-control ni chalega as this is invalid syntax in JS to mai JS object ke ppt ke corresponding value lene ke liye dusri technique use karunga, [] wali*/}
      <div
        className={`${styles["form-control"]} ${
          !isValid ? styles["invalid"] : ""
        }`}
      >
        {/* Yaha pe conditional styling kari he */}
        <label
        // style={{ color: !isValid ? "red" : "black" }}
        >
          Course Goal
        </label>
        <input
          // style={{
          //   backgroundColor: !isValid ? "salmon" : "transparent",
          //   borderColor: !isValid ? "white" : "#ccc",
          // }}
          type="text"
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
