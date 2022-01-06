import useInput from "../hooks/use-input";
import isEmailValid from "./isEmailValid";

const BasicForm = () => {
  const [
    enteredFName,
    enteredFNameIsValid,
    fNameHasError,
    fNameChangeHandler,
    fNameBlurHandler,
    fNameReset,
  ] = useInput((fname) => fname.trim() !== "");

  const [
    enteredLName,
    enteredLNameIsValid,
    lNameHasError,
    lNameChangeHandler,
    lNameBlurHandler,
    lNameReset,
  ] = useInput((lname) => lname.trim() !== "");

  const [
    enteredEmail,
    enteredEmailIsValid,
    emailHasError,
    emailChangeHandler,
    emailBlurHandler,
    emailReset,
  ] = useInput(isEmailValid);

  const fNameClasses = fNameHasError ? "form-control invalid" : "form-control";
  const lNameClasses = lNameHasError ? "form-control invalid" : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  const formIsValid =
    enteredFNameIsValid && enteredLNameIsValid && enteredEmailIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submitted");
    fNameReset();
    lNameReset();
    emailReset();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={fNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFName}
            onChange={fNameChangeHandler}
            onBlur={fNameBlurHandler}
          />
          {fNameHasError && (
            <p className="error-text">Invalid First Name entered.</p>
          )}
        </div>

        <div className={lNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLName}
            onChange={lNameChangeHandler}
            onBlur={lNameBlurHandler}
          />
          {lNameHasError && (
            <p className="error-text">Invalid Last Name entered.</p>
          )}
        </div>
      </div>

      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Invalid Email entered.</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
