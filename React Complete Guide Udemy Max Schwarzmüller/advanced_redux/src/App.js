import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { getCartData, sendCartData } from "./store/cart-custom-actions";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();

  const { cartItems, totalItemsInCart, showCart, changed } = useSelector(
    (state) => state.cartSlice
  );

  useEffect(() => {
    if (isFirstRender) {
      dispatch(getCartData());
      console.log("data fetched");
      isFirstRender = false;
      return;
    }
    if (changed) {
      // Redux ka dispatch function can not only handle action objects but it can also handle functions that return functions.
      dispatch(
        sendCartData({
          cartItems: cartItems,
          totalItemsInCart: totalItemsInCart,
        })
      );
      console.log("data sent");
    }
  }, [cartItems, totalItemsInCart]);
  return (
    <>
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
