import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/all-quotes");
    }, 3000);
  }, []);
  return (
    <>
      <h1>404 Page Not Found.</h1>
      <p>Redirecting to All Quotes in 3 seconds.</p>
    </>
  );
};

export default NotFound;
