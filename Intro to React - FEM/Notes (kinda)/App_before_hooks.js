// Kyoki ab react npm se aa raha he to mujhe usse import karna padega
import React from "react";
import ReactDOM from "react-dom";

// The most basic building block in React is creating resuable components using functions and classes.
// To React me mai class of components banata hu jinke mai jab chahu tab instances bana sakta hu.



// CREATING A REACT COMPONENT -
// App is a React component, so, its resuable. Think of it as a rubber stamp to jaha bhi mujhe "App" component ki zaroorat padegi waha mai is "Stamp" ko use karunga.
const App = () => {
  // Note the capitalization of 'a' in "App" its actually critical to do so, agge jake mai JSX name ka tool use karunga jo ki ye assume karega ki anything thats capitalized is something that programmer has created and non-capitalized as something thats an actual HTML element
  return React.createElement(
    "div", // agr mai yaha "div" ki jagah "x-custom-element" likh do div ke name ke bajae given name se render hoga.
    {},
    React.createElement("h1", { id: "brand", class: "products" }, "Adopt ME!")
  );
  // To create any element in React - React.createElement("konsa element",{uske attributes yani id, class},uske andar kya hona chahiye);
  // atributes wale {} me mai ek JS object dunga with ppts like id, class, style (in-line css) etc. More about createElement() -> below.
};




// RENDERING A REACT COMPONENT -
ReactDOM.render(React.createElement(App), document.getElementById("root"));
// ReactDOM.render(Kya render karna he, kaha render karna he);
// Remember upar React.createElement(___) hi likhna padega, think of createElement()the action of stamping (refer above), thats how render() works usko ye chahiye hotaki (konsa rendering action karna he, kaha par karna he).

// Ye sab mai simple html likhke bhi kar sakta tha, but the thing is this is a smcomponent jab component bada ho jaega aur component ke andar mai kisi aur componentuse kar paunga to this resuablity of components will be extremely beneficial.




// USING COMPONENTS INSIDE ANOTHER COMPONENT
import Pet from "./Pet";
// Maine Pet wale component ke corresponding dusri js file bana di aur waha se usse export kardiya taki mai usse yaha use kar saku

import Pet_JSX from "./Pet_JSX";

const App2 = () => {
  // is component ke andar aur bhi component aa rahe he
  // map() function basically forEach loop wala kaam karega
  return React.createElement(
    "div",
    { id: "my-brand" },
    React.createElement("h1", { id: "brand", class: "products" }, "Adopt ME!"),
    ...[1, 2, 3].map((i) => React.createElement("h2", {}, `iteration ${i}`)),
    ...["Madhur", "Kalash", "Prathak", "Mugdha", "Akhilesh"].map((i) =>
      React.createElement("h2", {}, i)
    ),
    // "..." is called spread operator, ye operator keh raha he ki jo list of componenets he usme mujhe apne generated components ko Jod / concatenate kar dena he.
    React.createElement(Pet, { name: "Shiro", color: "white" }),
    React.createElement(Pet, { name: "Snowy", color: "white" }),
    React.createElement(Pet_JSX, { name: "Shiro", color: "white" }),
    React.createElement(Pet_JSX, { name: "Snowy", color: "white" }) // Isko maine Pet_JSX se banaya
  );
};
ReactDOM.render(React.createElement(App2), document.getElementById("root"));

// Imp point - React me data flow parent components (eg App2) to child components (eg Pet) hota he, there is no way to send data in the other direc. (at least by default)

// Writing App2 using JSX
// Note - JSX se component likhte waqt mujhe hamesha sare tags ko ek parent tag me rakhna hoga
const App2_JSX = () => {
  return (
    <div>
      <h1>"Adopt ME!"</h1>
      
      {/* component inside a component using JSX */}
      <Pet name="Shiro" color="white"></Pet>
      
      {/* You dont have to write the complete closing tag for a React component just a / like below works for JSX */}
      <Pet_JSX name="Shiro" color="white" id="pet_comp" />
      {/* UPDATE - Pet_JSX has been updated */}
      {/* Jo maine id di he wo Pet_JSX ke is instance ko jaegi */}
    </div>
  )
};


// New / better way to write ReactDOM.render() using JSX
ReactDOM.render(<App2_JSX/>, document.getElementById("root"));



// ************************ HOOKS STARTED IN A NEW App.js *************************