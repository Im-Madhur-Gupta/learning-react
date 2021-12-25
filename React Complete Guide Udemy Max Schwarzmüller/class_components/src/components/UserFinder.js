import { Fragment, Component } from "react";
import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

// Will get this from Context
// const DUMMY_USERS = [
//   { id: "u1", name: "Max" },
//   { id: "u2", name: "Manuel" },
//   { id: "u3", name: "Julie" },
// ];

class UserFinder extends Component {
  // For using Context in class components. Step 1 -
  static contextType = UsersContext;

  state = {
    filteredUsers: [],
    searchTerm: "",
  };

  // componentDidMount() runs AFTER the 1st render.
  componentDidMount() {
    this.setState({
      filteredUsers: this.context.users,
    });
  }

  // componentDidMount() runs after a component gets updated (state change ke baad).
  // componentDidUpdate() recieves 2 arguments prevProps and prevState which are the props and state snapshots BEFORE the update / state change.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        ),
      });
    }
  }

  render() {
    const searchChangeHandler = (event) => {
      this.setState({ searchTerm: event.target.value });
    };
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={searchChangeHandler} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
