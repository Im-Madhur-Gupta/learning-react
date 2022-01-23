import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

// BrowserRouter se wrap karte he Route tags ko, BrowserRouter maine index.js mai lagaya he.

// (For React Router v5) exact keyword agr apn use karte he Route tag mai to wo component sirf tab dikhega jab route EXATCLY match karegi.

// React Router v5 mai "/products/p1" will match the route "/products/:productId" AND "/products" by default, isse bachne ke liye yato Switch ka use kar sakte he jisse sirf 1st matched path (upar se) render hoga YA exact keyword ka use kar sakte he.
// Note - Switch component should be wrapped around the Routes inside of the Router.

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        {/* <Switch> */}

        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        {/* Ye ek dynamic route he jisme productId ek parameter he.
            Dynamic routes mai ek se zyada parameters bhi ho sakte he. */}
        <Route path="/products/:productId" exact>
          <ProductDetail />
        </Route>

        {/* </Switch> */}
      </main>
    </div>
  );
}

export default App;
