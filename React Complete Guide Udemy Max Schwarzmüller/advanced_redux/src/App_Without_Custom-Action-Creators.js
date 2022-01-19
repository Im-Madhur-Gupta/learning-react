import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

// As I have kept the variable outside of the App component, is variable ki value reset ni hogi on a re-evaluation of the App component.
// This the behaviour I want.
let isFirstRender = true;

function App() {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const showCart = useSelector((state) => state.cartSlice.showCart);

  // Note - useEffect ka function khud async ni ho sakta, uske andar async function ko call zaroor kar sakte he. useEffect ke function ke andar async func call ke promises handle kar sakte he.
  // BUT mujhe yaha async await karne ki zaroorat NI he, kyoki cart ki PUT request complete hona ka user experience pe koi pharak ni padega, to usko hone do aram se asynchronously.
  // SUPER IMP - Ye implementation mai ek major problem he, jab ye useEffect 1st time chalega to cartItems empty hogi to wo empty cartItems PUT ho jaengi backend pe, overwritting the stored data on the backend.
  // Easy fix will be using a flag for the 1st render.
  useEffect(() => {
    if (!isFirstRender) {
      fetch(
        "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/cart-items.json",
        {
          // IMP - Yaha mujhe PUT request karni he kyoki mai backend pai cart data overwrite karwana chahta hu.
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        }
      ).catch((error) => {
        console.log("ERROR AA GAYA. -> ", error);
      });
    } else {
      isFirstRender = false;
    }
  }, [cartItems]);

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
