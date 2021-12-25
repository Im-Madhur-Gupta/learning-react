import { Component } from "react";
import classes from "./User.module.css";

class User extends Component {
  componentWillUnmount(){
    console.log("List of users has been unmounted from the DOM.")
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
