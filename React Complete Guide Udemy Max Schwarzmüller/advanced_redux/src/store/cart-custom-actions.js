import { cartActions } from "./cart";

// A custom action creator function aka a Thunk -
// JS allows me to return a function from a function.
export const sendCartData = (cartInfo) => {
  // IMPORTANT -
  // sendCartData func async ni ho sakta kyoki reducers async ni ho sakte.
  // Ye returned function async ho sakta he.
  // isse ye dispatch() function as argument redux ne provide kara he.
  return async (dispatch) => {
    // Ab yaha mai store state pe dispatch() ki madad se actions dispatch kar sakta hu.
    const res = await fetch(
      "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/cart-info.json",
      {
        // IMP - Yaha mujhe PUT request karni he kyoki mai backend pai cart data overwrite karwana chahta hu.
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartInfo),
      }
    );
    if (!res.ok) {
      console.log("ERROR AA GAYA. -> ", res.statusText);
    }
  };
};

export const getCartData = () => {
  return async (dispatch) => {
    const res = await fetch(
      "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/cart-info.json"
    );
    if (!res.ok) {
      console.log("ERROR AA GAYA. -> ", res.statusText);
    }
    const data = await res.json();
    console.log(data);
    // IMP - manlo backend pe abhi kuch data he hi ni to "data" null hoga
    // to sirf "data" jab truthy ho tab mujhe cartInfo replace karwani he
    data && dispatch(cartActions.replaceCart({ cartInfo: data }));
  };
};
