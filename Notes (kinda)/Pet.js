// Without JSX
import React from "react";

const Pet = (props) => {
  // Props ki madad se mai apne component ko ek template jaisa bana sakta hu, to wo given object of data ke hisab se render hoga naki static data ke hisab se. Now my component is Reactive to the properties given to it.
  return React.createElement("div", {}, [
    React.createElement("h2", {}, props.name),
    React.createElement("h3", {}, props.color),
  ]);
  // Ye [] laga ke likhna is optional aap bina [] bracket ke bhi same work kar sakte ho
  // Array ye bata raha he ki mere pet ke instance me div element he jike andar ek Array / no. of elements he.
};

export default Pet;
// To export this component I use the above command, so that I can use it inside a different .js file (another component).
