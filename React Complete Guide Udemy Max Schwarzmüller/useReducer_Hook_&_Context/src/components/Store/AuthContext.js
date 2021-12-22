import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

// .createContext({Initial State of the Context}) returns an object which contains a component.
// 2 steps that follow creating a context are -

// 1. Wrap the Context_Object.Provider component over all the components that would need the context data/state. (here App.js). IMPORTANT - Give Context_Object.Provider a value={our context object} prop and this context object which we have provided to the "value" can be managed in the App.js, all the changes in the context object would be reflected everywhere context is used under the Context_Object.Provider.

// 2. Consume the context in the required component, this could be done in 2 ways - (Navigation.js)
// 1. Context_Object.Consumer
// 2. React Hook -> useContext()

// ****************************************************

// I am doing the following to move all of the login & logout logic to AuthContext.js
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
