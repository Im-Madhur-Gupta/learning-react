import React, {Suspense} from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// Aise import karte he to ye NewQuote component ka code hamesha import ho jaega bhale hi uski requirement abhi Current Route pe he ya ni.
// import NewQuote from "./pages/NewQuote";

// Special importing technique to optimize our app -
// Is technique se NewQuote component ka code sirf tabhi import hoga jab uski requirement Current Route par hogi.
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
// Ek cheez aur dalni he, jin bhi components ko mai lazy load karna chah raha hu unko mujhe Suspense component se wrap karna padega. Aur Suspense component ko ek fallback prop dena padta he.
// fallback prop mai kuch alternate UI ie some alternate JSX code dena padta he. Ye alt. JSX code uss loading component pai dikhta he, during its download.

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
