import React, { useContext } from "react";
import AuthContext from "../Store/AuthContext";

import classes from "./Navigation.module.css";

const Navigation = () => {
  // Using the useContext Hook -
  const context = useContext(AuthContext);
  return (
    // OLD Way -
    // <AuthContext.Consumer>
    //   {(context) => {
    //     return (
    //       <nav className={classes.nav}>
    //         <ul>
    //           {context.isLoggedIn && (
    //             <li>
    //               <a href="/">Users</a>
    //             </li>
    //           )}
    //           {context.isLoggedIn && (
    //             <li>
    //               <a href="/">Admin</a>
    //             </li>
    //           )}
    //           {context.isLoggedIn && (
    //             <li>
    //               <button onClick={props.onLogout}>Logout</button>
    //             </li>
    //           )}
    //         </ul>
    //       </nav>
    //     );
    //   }}
    // </AuthContext.Consumer>

    // NEW WAY -
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
