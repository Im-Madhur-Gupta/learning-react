import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit"; // Redux code asani se likhne ke liye.

const initialState = { counter: 0, isCounterHidden: false };

// Jo store mai state he uski "slice" banaunga -
const counterSlice = createSlice({
  name: "counterSlice",
  initialState: initialState,
  // yaha mai action types ko unke corresponding reducer functions ke sath map kar deta hu. ye sare reducer functions ko prevState (of the slice) milti he redux toolkit se.
  reducers: {
    increment(state, action) {
      state.counter = state.counter + action.payload; 
      // Jo bhi value/object/array mai action object banate waqt supply karunga wo action object ke andar "payload" name ki key pe milegi.
      // aisa karne se state update ho jaega, direct state mutation ki chinta karne ki zaroorat ni he, neeche padho.
    },
    decrement(state) {
      // yaha action object ni chahiye tha to action ko parameter mai accept ni kiya.
      state.counter--; // Redux Toolkit allows prevState mutation.
      // IMP - Normal reducer function mai prevState ko mutate ni karna chahiye, but redux toolkit mai ek module ("Immer") hota he jo apne app prevState mutation wale code ko immutable code mai convert kardeta he, state ki copy banake aur fir overwritten parts ko overwrite karke.
    },
    toggleCounter(state) {
      state.isCounterHidden = !state.isCounterHidden;
    },
  },
});

// Ye bina redux toolkit wala reducer he -
// const counterReducerFunction = (prevState = initialState, action) => {
//   if (action.type === "INCREMENT") {
//     // IMP - Kabhi bhi prevState ko mutate ni karna chahiye. Below is NOT GOOD -
//     //   prevState.counter++;
//     //   return prevState;
//     // Note that the above would work but is NOT the correct way.

//     // yaha ...prevState karna zaroori he warna redux "isCounterHidden" ko hata dega from the store (state)
//     // IMP - Redux returned state object ko current state ke sath merge ni karta balki wo overwrite karta he. (as expected)
//     return {
//       ...prevState,
//       counter: prevState.counter + action.value,
//     };
//   }
//   if (action.type === "DECREMENT") {
//     return {
//       ...prevState,
//       counter: prevState.counter - 1,
//     };
//   }
//   if (action.type === "TOGGLE_COUNTER") {
//     return {
//       ...prevState,
//       isCounterHidden: !prevState.isCounterHidden,
//     };
//   }
//   return prevState;
// };

// Bina redux toolkit ke store banana -
// const store = createStore(counterReducerFunction);

// Ab redux toolkit wale mai kai sare state slices aa sakte he to unsab ke liye store ko set karne ke liye.
const store = configureStore({
  // yaha reducer ppt ko mujhe sare reducers ek ek karke dene he object mai.
  reducer: {counterSlice: counterSlice.reducer} ,
});

// state slice bana di jisme reducers bhi he, store bhi bana diya, but abhi actions ko dispatch karte waqt mujhe ye kasie pata chalega ki kaise mai ek particular "type" ke action ko dispatch karu.
// Matlab action ka type kya dalke dispatch karu
// counterSlice.actions object holds all the action types as keys acc. to my state slice (here increment, decrement, toggleCounter).
// Value for these keys is a function (called action creators) which when executed returns an action object for that action type.
// Detail - is action object mai jo "type" key hogi uski redux toolkit ek unique value dega.
export const counterActions = counterSlice.actions;
// counterActions object named export kar dunga taki jaha zarorat pade waha mai action object bana pau.

export default store; // exporting my redux store so that I can "provide" it to my React app. Go to index.js of React app.
