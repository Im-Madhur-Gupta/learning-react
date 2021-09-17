// From Hooks
import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";

// Importing React Router
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("black");
  return (
    <ThemeContext.Provider value={themeHook}> {/* Everything wrapped inside of this comp. can access the context. */}
    {/* Agr mai aisa ni karta to alt. mujhe sare comp. ko alag alag theme (context) provide karna padta. */}
      <div>
        {/* Using React Router */}
        <Router>
          <header>
            {/* Maine React Router use karna start kar diya he to mai anchor tags ki jagah Link tag ko use karunga.
            Bcz anchor tag ek new page pe le jaega yani wo reload karega page ko ie React ko but this isnt req. so we use Link tag jo ki mere Navigation ko capture karlega aur result provide karega acc. to the Routes WITHOUT reloading. IMP - Every Link tag should have a Router tag to refer to, matlab har ek Link tag kisi na kisi Router tag ke andar aeyega. */}
            <Link to="/">
              <h1>Adopt ME!</h1>
            </Link>
          </header>

          <Switch>
            {/* Ye kisi pet ke anchor tag pe click hone ke baad jo kholna he
           IMP - :id is the way to write a variable (here, id) in a path, so that we can read it while rendering the Details component for a requested id */}
            <Route path="/details/:id">
              <Details />
            </Route>

            {/* Ye wo jo mai "/" pe kholunga yani jab meri website open ho to 1st ye dikhe */}
            <Route path="/">
              {/* <ThemeContext.Provider value={["green"]}>  This will overwrite the black "theme" to green. */}
              <SearchParams />
              {/* </ThemeContext.Provider> */}
            </Route>

            {/* IMP - path="/details/:id" MATCHES with path="/", path="/details" and path="/details/:id". 
            To jab "/details/:id" pe request dunga to wo actually "/" se bhi match ho jaega aur "/" ka bhi render kar dega.
            
            ** Basically jis address pe user request de raha he usse left se read karna start kro aur routes ke paths se match karwa STARTING FORM TOP MOST ROUTE. 
            
            This is the behaviour of React Router, we can get around this using Switch.
          Switch basically ye kehta he ki just render the FIRST matching Route and DONT care about the rest of the Routes. BETTER ALTERNATE TO Switch - We can use 'exact' keyword inside a Route to match the exact path. */}
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
// StrictMode just enforces some stronger set of rules on how components should be written.
