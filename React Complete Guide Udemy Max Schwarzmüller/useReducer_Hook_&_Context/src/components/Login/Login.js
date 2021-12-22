import { useState, useEffect, useReducer, useContext, useRef } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Store/AuthContext";
import Input from "../UI/Input/Input";

// ye emailReducer wala function maine Login component ke bahar isliye likha kyoki ye uske data pe depend NI kar raha he isse jo bhi chahiye wo React isse dega.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  // Default state which I want to return -
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  // Default state which I want to return -
  return { value: "", isValid: false };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const { loginHandler: onLogin } = useContext(AuthContext);
  // object destructure kiya aur required key ko allias de diya.

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);
  // upar dependencies me agr emailState, passwordState deta to wo emailState.value ke change hone pe bhi trigger hota which we don't want, same for passwordState.value

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
    // Ye jo action object dispatchEmail() ko diya he usme ek type field he which holds a clearly understandable identifier and then a payload/value.
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      onLogin(emailState.value, passwordState.value);
    }
    // Now what I want to do is to "focus" on the 1st element that is invalid, ie if email is invalid then cursor/pointer should go to email field, same for password.
    // Agr simple html input component hota to simply us input ka ref bana ke uspe .current.focus() method laga dete. Note - focus() method comes from JS and DOM.
    else if (!emailState.isValid) {
      emailInputRef.current.activate();
    } else {
      // password isn't valid
      passwordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          inputTitle={"Email"}
          inputIsValid={emailState.isValid}
          inputValue={emailState.value}
          inputChangeHandler={emailChangeHandler}
          validateInputHandler={validateEmailHandler}
          ref={emailInputRef}
        />

        <Input
          inputTitle={"Password"}
          inputIsValid={passwordState.isValid}
          inputValue={passwordState.value}
          inputChangeHandler={passwordChangeHandler}
          validateInputHandler={validatePasswordHandler}
          ref={passwordInputRef}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
