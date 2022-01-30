import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// named export for AuthContextProvider
export const AuthContextProvider = (props) => {
  const storedToken = localStorage.getItem("token");
  // Ye line ko useEffect with empty dependency array mai bhi use kar sakte the.
  // useEffect wala function sirf synchronous hona chahiye. Aur ye localStorage vali API bhi synchronous hoti he.

  // Agr token stored ni hoga to undefined hogi value.
  const [token, setToken] = useState(storedToken);

  // agr token falsy value he to !!token will return false.
  // agr token truthy value he to !!token will return true.
  const isUserLoggedIn = !!token;

  const loginHandler = (genToken) => {
    setToken(genToken);
    localStorage.setItem("token", genToken);
  };
  const logoutHandler = () => {
    // logout karne pe simply deleting the stored token.
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
  };

  const contextVal = {
    token: token,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextVal}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
