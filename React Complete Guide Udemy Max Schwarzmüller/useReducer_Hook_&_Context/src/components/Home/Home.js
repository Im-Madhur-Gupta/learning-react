import { useContext } from "react";
import AuthContext from "../Store/AuthContext";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  const { logoutHandler: onLogout } = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={onLogout}>Log Out</Button>
    </Card>
  );
};

export default Home;
