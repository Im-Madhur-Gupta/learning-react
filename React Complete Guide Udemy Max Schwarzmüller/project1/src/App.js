import "./App.css";
import { useState } from "react";
import AddUser from "./components/AddUser/AddUser";
import DisplayUser from "./components/DisplayUser/DisplayUser";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <AddUser setUsers={setUsers} />
      <div className="display-users">
        <DisplayUser users={users} />
      </div>
      
    </div>
  );
}

export default App;
