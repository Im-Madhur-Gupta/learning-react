import { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  // upar jo state management hua he wo redundant aur complex he. In cases mai mujhe useReducer hook ka use karna chahiye instead of useState.

  useEffect(() => {
    const timeoutIdentifier = setTimeout(() => {
      console.log("form validation triggered.");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    // IMPORTANT - Clean-up function
    // Ye clean up function har "Effect" / change ke PEHLE run hota he except the 1st time its triggered for a side-effect run, ye function tab bhi run hota he jab ye component DOM se nikal raha ho.
    return () => {
      console.log("Clean up function triggered.");
      clearTimeout(timeoutIdentifier);
    };
  }, [enteredEmail, enteredPassword]);

  // Ye wala useEffect thoda sahi ni he kyoki emailIsValid and passwordIsValid sirf onBlur pe trigger ho rahe he.
  // useEffect(()=>{
  //   setFormIsValid(emailIsValid && passwordIsValid)
  // }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    // This is not recommended as we are updating a state based on some other state. (Yaha useReducer() ka use karke kaam thik ho jaega)
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
