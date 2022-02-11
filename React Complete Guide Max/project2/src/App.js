import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  // Simple Note - Sare jo indivisual Modals dikhane he wo sab independent states ke correspondng honge. Agr ek hi state mai sare modals laga diye to ek Modal kholne pe dusre sare khul jaenge same for close.
  const [showCartModal, setShowCartModal] = useState(false);
  const showCartHandler = () => {
    setShowCartModal(true);
  };
  const hideCartHandler = () => {
    setShowCartModal(false);
  };
  return (
    <CartContextProvider>
      {/* Yaha showCartModal wali state Context se bhi de sakte the but kyoki iske liye sirf 2 level of components he props ke liye to its fine. Also, isse Modal specific ek cheez ke liye ni ho raha he.
      Is project mai Context ki zaroorat cart items ke liye padegi, kyoki uske liye props chain bohot lambi padh jaegi (from AvialableMeals to Cart). 
      */}
      {showCartModal && <Cart hideCartHandler={hideCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
