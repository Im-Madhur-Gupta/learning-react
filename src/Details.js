import { Component } from "react";
import { withRouter } from "react-router-dom";

// Class Components -

class Details extends Component {
  // 1. contructor()
  constructor() {
    super(); // hamesha dalna he ye taki Component ka constructor call ho jae.

    // Instantiating an instance of this class -
    this.state = { loading: true };
  }

  // Class components ke lifecycle methods hote he
  // Unmese ek he componentDidMount() ye sirf ek baar chalta he jab mera component pehli baar render hota he
  // To mai jab kisi id ke liye pehli bar details wala page render karwaunga tab mujhe api se data fetch karna padega aur phir agr phirse render karna he to mujhe api se fetch ni karna locally store karke wahi dikha denge.  
  async componentDidMount(){
    const res = await fetch(
        ``
    )
  }

  // All the class components in React have a render() method which work same as a function's body and have a return with some JSX. (Jaisa function components me tha)
  // Ex. -
  // render(){
  //     // function body
  //     return (
  //         <h2>My 1st class Component.</h2>
  //     )
  // }

  render() {
    return <h2>My 1st class Component.</h2>;
  }
}
export default Details;
