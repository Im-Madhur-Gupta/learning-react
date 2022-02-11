import React, { useEffect, useState, useMemo } from "react";

// Isme timer store hoga. Is independent of the component.
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calcRemainingTime = (expTimeInMS) => {
  const currTimeInMS = Date.now();
  return expTimeInMS - currTimeInMS;
};

const getStoredData = () => {
  const storedToken = localStorage.getItem("token");

  const storedExpDate = localStorage.getItem("expDate");
  const storedExpDateInMS = new Date(storedExpDate).getTime();

  const remainingTime = calcRemainingTime(storedExpDateInMS);

  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expDate");
    return null;
  }
  return { storedToken, remainingTime };
  // Agr token valid he to is token ke corresponding mujhe timer start karna he.
};

export const AuthContextProvider = (props) => {
  // getStoredData mujhe SIRF component ke initial render ke baad chalwana he. Isliye useMemo() ka use kiya with empty dependency array.
  const storedData = useMemo(() => getStoredData(), []);

  let initialToken;
  if (storedData) {
    initialToken = storedData.storedToken;
  }

  const [token, setToken] = useState(initialToken);
  const isUserLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expDate");
    clearTimeout(logoutTimer);
  };
  const loginHandler = (genToken, expTimeInMS) => {
    setToken(genToken);
    localStorage.setItem("token", genToken);

    const remainingTime = calcRemainingTime(expTimeInMS);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    localStorage.setItem("expDate", new Date(expTimeInMS).toUTCString());
  };

  // Ye useEffect sirf 1st render ke baad chalega.
  // Will provide the auto-logout func. in case we already had a valid token in local storage.
  useEffect(() => {
    if (storedData) {
      console.log(storedData.remainingTime);
      logoutTimer = setTimeout(logoutHandler, storedData.remainingTime);
    }
  }, [storedData]);

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
