import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  // Aese state initialize karne ki jagah contructor() bhi likh sakte the but this is the easier way.
  state = {
    showUsers: true,
  };

  componentDidUpdate(){
    if(this.props.users.length===0){
      throw new Error("No Users Found.")
    }
  }

  // toggleUserHandler bhi class ki ppt bangai he, arrow function ki jagah normal wala function bhi likh sakte he but fir usme "this" keyword ka use dekhke karna padega.
  // Yaha pe bhi same functional component wali cheez he yani agr prev state pe state change depend kar raha he to (prevstate)=>{} wala syntax use karte he inside of setState().
  // Another thing related to "this" keyword, arrow function he to "this" waha se aa raha he jaha function defined he, normal function hota to "this" waha se ata jaha se function call hui he. Normal function wale case mai sahi karne ke liye mai "this" ko .bind() karwa ke sahi kar sakta hu, ye bind wala "this" sahi wala hona chaiye.
  toggleUsersHandler = () => {
    this.setState((prevState) => ({ showUsers: !prevState.showUsers }));
  };

  render() {
    // render() method ke andar mai helper constants to rakh hi sakta hu.
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
