import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import Header
import AddQuote from "./pages/AddQuote";
import ListQuotes from "./pages/ListQuotes";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add-quote">
          <AddQuote />
        </Route>
        <Route exact path="/list-quotes">
          <ListQuotes />
        </Route>
        <Route path="/list-quotes/:quoteId">
          <QuoteDetail />
        </Route>
        {/* Setting the redirect for ANY invalid path - */}
        <Route path="/">
          <Redirect to="/list-quotes" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
