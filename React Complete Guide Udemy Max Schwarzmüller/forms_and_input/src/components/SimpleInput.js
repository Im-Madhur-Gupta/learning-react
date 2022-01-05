import isEmailValid from "./isEmailValid";
import useInput from "../hooks/use-input";

const SimpleInput = () => {
  const [
    enteredName,
    setEnteredName,
    enteredNameIsValid,
    setEnteredNameIsTouched,
    nameIsValid,
    nameChangeHandler,
    nameBlurHandler,
  ] = useInput((name) => {
    return name.trim() !== "";
  });
  const [
    enteredEmail,
    setEnteredEmail,
    enteredEmailIsValid,
    setEnteredEmailIsTouched,
    emailIsValid,
    emailChangeHandler,
    emailBlurHandler,
  ] = useInput(isEmailValid);

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setEnteredName("");
      setEnteredEmail("");
      setEnteredNameIsTouched(false);
      setEnteredEmailIsTouched(false);
    } else {
      setEnteredNameIsTouched(true);
      setEnteredEmailIsTouched(true);
    }
  };

  const inputNameClasses = nameIsValid
    ? "form-control"
    : "form-control invalid";
  const inputEmailClasses = emailIsValid
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
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
        />
        {!nameIsValid && (
          <p className="error-text">Entered name is not valid.</p>
        )}
      </div>

      <div className={inputEmailClasses}>
        <label htmlFor="email">Your E-Mail</label>
        <input
          type="text"
          id="email"
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {!emailIsValid && (
          <p className="error-text">Entered email is not valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
