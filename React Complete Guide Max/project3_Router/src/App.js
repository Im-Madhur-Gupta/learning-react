import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AddQuote from "./pages/AddQuote";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/add-quote">
            <AddQuote />
          </Route>
          <Route exact path="/all-quotes">
            <AllQuotes />
          </Route>
          <Route path="/all-quotes/:quoteId">
            <QuoteDetail />
          </Route>
          {/* Setting the redirect for ANY invalid path - */}
          {/* "*" is called wildcart character and it matches any path that reaches it. */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
