import { useDispatch, useSelector } from "react-redux";
import classes from "./Auth.module.css";
import { authActions } from "../store/auth-slice";

const Auth = () => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.authSlice.email);

  const emailBlurHandler = (event) => {
    dispatch(authActions.setEmail(event.target.value));
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    // some validation checks ...
    dispatch(authActions.setIsLoggedIn(true));
  };
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onBlur={emailBlurHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
