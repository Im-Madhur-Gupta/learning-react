import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  // state mai bhi rakh sakte he entered value ko ya input html element ka ref bhi bana sakte he.
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // initially enteredNameIsValid ko true rakhna galat he.
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value.trim().length > 0) {
      setEnteredNameIsValid(true);
    } 
    else {
      setEnteredNameIsValid(false);
    }
  };
  const formSubmitHandler = (event) => {
    event.preventDefault(); // page refresh prevent karne ke liye.

    // ref bana ke value update karna is NOT RECOMMENDED.
    if(enteredNameIsValid){
      setEnteredName("");
      console.log("submitted");
    }
    else{
      console.log("not submitted");
    }
  };

  const inputClasses =
    !enteredNameIsTouched || enteredNameIsValid
      ? "form-control"
      : "form-control invalid";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputClasses}>
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
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
