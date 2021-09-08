// From Hooks
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";

const App = () => {
    return(
        <div>
            <h1>Adopt ME!</h1>
            <SearchParams />
        </div>
    )
}

ReactDOM.render(<StrictMode><App/></StrictMode>,document.getElementById("root"))
// StrictMode just enforces some stronger set of rules on how components should be written.