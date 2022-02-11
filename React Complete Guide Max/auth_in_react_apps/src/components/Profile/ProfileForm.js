import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const inputPasswordRef = useRef();

  const history = useHistory();
  const { token } = useContext(AuthContext);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = inputPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDHoQGaKOUULcq8azmFg6Omv-a33P_R3-w",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecuretoken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // Assume all the things went well.
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={inputPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
