/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// Below would do the same thing as above, its just that this is imperative approach which is time consuming and difficult to write.
// const div = document.createElement("div");
// div.innerHTML = "<h2>Let's get started!</h2>";
// document.getElementById("root").appendChild(div);
