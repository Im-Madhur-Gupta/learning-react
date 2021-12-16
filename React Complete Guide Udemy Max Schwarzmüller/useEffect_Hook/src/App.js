import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Ye useEffect sirf mai tab run karwana chahta hu jab mera component ** 1st time render ** ho raha ho, isliye dependencies array empty diya he.
    const logInStatus = localStorage.getItem("isLoggedIn");
    if (logInStatus === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // Storing the log in status in local storage so that it persists a reload -
    localStorage.setItem("isLoggedIn", "1");
    // key-value pairs dete, he both strings.

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn"); // removing the key-value pair from session storage.
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
