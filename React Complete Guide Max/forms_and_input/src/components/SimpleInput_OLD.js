import { useState } from "react";
import isEmailValid from "./EmailValidator";

const SimpleInput = (props) => {
  // state mai bhi rakh sakte he entered value ko ya input html element ka ref bhi bana sakte he.
  const [enteredName, setEnteredName] = useState("");

  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // initially enteredNameIsValid ko true rakhna galat he.
  // Also, validity ke liye seperate state bana zaroori ni he.
  const enteredNameIsValid = enteredName.trim() !== ""; // kyoki ye enteredName state pe depend kar raha he to jab enteredName change hoga tab enteredNameIsValid apne app change ho jaega.

  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const enteredEmailIsValid = isEmailValid(enteredEmail);
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    // Below code is no longer required as enteredName is valid will be automatically evaluated.
    // if (event.target.value.trim().length > 0) {
    //   // yaha seedha enteredName ko use ni kar sakta kyoki React ne update schedule kiya he instantly ni hota.
    //   setEnteredNameIsValid(true);
    // } else {
    //   setEnteredNameIsValid(false);
    // }
  };
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault(); // page refresh prevent karne ke liye.

    // ref bana ke value update karna is NOT RECOMMENDED.
    if (enteredNameIsValid) {
      // console.log("submitted");
      setEnteredName(""); // clearing the input field
      setEnteredEmail("");

      // Not req.
      // setEnteredNameIsValid(false); // reseting the validity to false, as enteredName is now "".

      setEnteredNameIsTouched(false); // reseting the touched state to false after submission.
      setEnteredEmailIsTouched(false);
    } else {
      setEnteredNameIsTouched(true); // the enteredName is invalid still user tried to submit meaning the input field has to be treated as touched.
      setEnteredEmailIsTouched(true);
      // console.log("not submitted");
    }
  };

  const inputNameClasses =
    !enteredNameIsTouched || enteredNameIsValid
      ? "form-control"
      : "form-control invalid";
  const inputEmailClasses =
    !enteredEmailIsTouched || enteredEmailIsValid
      ? "form-control"
      : "form-control invalid";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputNameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onBlur={() => {
            setEnteredNameIsTouched(true);
          }}
          onChange={nameInputChangeHandler}
        />
        {enteredNameIsTouched && !enteredNameIsValid && (
          <p className="error-text">Entered name is not valid.</p>
        )}
      </div>

      <div className={inputEmailClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onBlur={() => {
            setEnteredEmailIsTouched(true);
          }}
          onChange={emailInputChangeHandler}
        />
        {enteredEmailIsTouched && !enteredEmailIsValid && (
          <p className="error-text">Entered email is not valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button
          type="submit"
          disabled={!enteredEmailIsValid && !enteredNameIsValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
