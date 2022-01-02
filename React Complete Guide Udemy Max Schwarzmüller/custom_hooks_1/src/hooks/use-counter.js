import { useState, useEffect } from "react";

// yaha mai "custom hook" banaunga aka a function.
// IMP - The name should start with "use____". "use" prefix tells React that its a custom hook.

// Jaha jaha ye custom hook ka use kiya hoga waha waha DIFFERENT state hoga us component mai.

const useCounter = (operation) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      operation === "+"
        ? setCounter((prevCounter) => prevCounter + 1)
        : setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [operation]);

  return counter;
};

export default useCounter;
