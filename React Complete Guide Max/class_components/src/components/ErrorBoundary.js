import { Component } from "react";

class ErrorBoundary extends Component {
  // Kisi bhi class component ke through Error Boundary implement karwane ke liye we write componentDidCatch() method in it.
  // componentDidCatch() method recieves an error object as a parameter, this corresponds to the error encountered.
  componentDidCatch(error) {
    // Simply, console.log() kar dunga error obj ko.
    // Development mode mai jab he mera React app to wo error handle hone ke baad bhi show karega ki Error has occured, production mode mai error handle ho jaega.
    console.log(error);
  }
  render() {
    return this.props.children;
  }
  // Now we have to wrap the "ErrorBoundary" component over all the components which may throw error, which we want to catch.
}

export default ErrorBoundary;
