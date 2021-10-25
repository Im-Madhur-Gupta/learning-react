// Error boundary is something exclusive to class components, as this cant be done using hooks so not in function components.
// It basically handles errors, matlab agr error mile to uske sath kaise deal karna he.
// Ex - agr /details/1231312, /details/asdjkla par request ayi to 404 dalna chahiye

import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasErrors: false, redirect: false };
  static getDerivedStateFromError() {
    // Error mile to bolo error mila.
    return { hasErrors: true };
  }
  componentDidCatch(error, info) {
    // Here I can log found errors. Ye basically, errors ko catch karta he.
    console.error("Error Boundary caught an error.", error, info);
    setTimeout(() => {
      this.setState({
        redirect: true,
      });
    }, 5000);
    // Agr errors aa rahe he component mei to 5s ke baad redirect true kardo, yani state change kardo, implies re-render hoga.
  }

  //   componentDidUpdate() {
  //     // This function runs every time our component gets updated just NOT at the very FIRST render of this component.
  //     if (this.state.hasErrors) {
  //       setTimeout(() => {
  //         this.setState({
  //           redirect: true,
  //         });
  //       }, 5000);
  //     }
  //   }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } 
    else if (this.state.hasErrors) {
      // Agr error aye to ye karo.
      return (
        <h2>
          Error Occurred, to go back to Homepage
          <Link to="/"> click here.</Link> or wait 5 seconds.
        </h2>
      );
    }
    return this.props.children;

    // jaha par bhi mai ErrorBoundary component use karunga to uske andar ke sare tags, components ko refer karne ke liye mai children keyword ka use karta hu.
    // <ErrorBoundary>
    //   <h1>Bla Bla Bla</h1>
    //   <Comp_1 />
    //   <Comp_2 />
    // </ErrorBoundary>;
    // Upar wale ErrorBoundary comp. ke liye children will be -
    //   <h1>Bla bLa Bla</h1>
    //   <Comp_1 />
    //   <Comp_2 />

    // Basically hoga ye, ki agr error milega to "Error occurred" wala message dikhe, lekin agr error NA mile to simply ErrorBoundary comp. ke CHILDREN ko render kiya jae.

    // To ye ErrorBoundary wala comp. mai top-level me dal sakta hu.
  }
}

// Higher order component is such a component that adds functionality but doesn't display anything. ErrorBoundary is a higher order comp.

export default ErrorBoundary;
