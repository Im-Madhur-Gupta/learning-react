import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const showCart = useSelector((state) => state.cartSlice.showCart);
  console.log(cartItems);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
