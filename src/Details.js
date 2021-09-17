import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext"; // for using theming inside of class comp.
import Modal from "./Modal";

// Class Components -

class Details extends Component {
  // 1. contructor() - Earlier the constructor was called componentWillMount().
  // OLD way of writing constructor code of a classComponent -
  // constructor() {
  //   super(); // hamesha dalna he ye taki Component ka constructor call ho jae.

  //   // Instantiating the state object of an instance of this class -
  //   this.state = { loading: true };
  // }

  // MODERN way of writing constructor code of a classComponent -
  state = { loading: true, showModal: false };

  // Class components ke lifecycle methods hote he
  // Unmese ek he componentDidMount() ye sirf ek baar chalta which is AFTER the first render of a classComponent.
  // To mai jab kisi id ke liye pehli bar details wala page render karwaunga tab mujhe api se data fetch karna padega aur phir agr phirse render karna he to mujhe api se fetch ni karna locally store karke wahi dikha denge.
  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    // mujhe us id ke corresponding fecth req. marni he jiske corresponding ye details wala page render ho raha he, wo id maine Route ke path me di thi, to us id ko extract karne ke liye ye upar ka likha he, 'this' is the instance of classcomp for an id that wants to get rendered, '.props' yani usko jo props parent se mile, '.match.params' ye react router se aa rahe he matched path pe jo parameters he wo, '.id' in parameters me id wala parameter jo hame chahiye tha.
    // Function component me props as arguements milte the and state ke liye useState hook use karta tha. Class comp. me props milte he this.props se and state milta he this.state wale 'state object' se.

    const json = await res.json();

    // Now I want to change the state object -
    // setState kya karega ki wo given JS object ko state object ke sath merge kar dega overwrite karte hue, yani jo loading ppt maine true set ki thi contructor me usse ye false set kardega

    // this.setState({
    //   loading: false,
    //   name: json.pets[0].name,
    //   animal: json.pets[0].animal,
    // });
    //Aese hi mai , laga ke sari ppts de sakta hu, but there is a easier way as pet[0] is itself a JS object with fields name, animal, .... (all what we wanted).

    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      ) // Object.assign() basically 2 given objects ko merge karke return kar raha he.
    );
  }

  // All the class components in React have a render() method which work same as a function's body and have a return with some JSX. (Jaisa function components me tha)
  // Ex. -
  // render(){
  //     // function body
  //     return (
  //         <h2>My 1st class Component.</h2>
  //     )
  // }

  // For Modal -
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt"); 
  // if someone is sure that they want to adopt a pet then we'll run adopt() function

  render() {
    if (this.state.loading) {
      // Jab loading chal rahi ho to ye dikhao.
      return <h2>Loading..........</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } = this.state;
    // Remember yaha mai json.pets[0] use ni kar sakta bcz json is a local variable of componentDidMount() function.

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>

          {/* ThemeContext.Consumer mujhe wo theme provide karega array me actually array me 2 elements he lekin mujhe unme se sirf 1 ka kaam he to maine 2nd ko ignore kar diya. */}
          {/* Ye ThemeContext.Consumer wala work function comp. me useContext() hook ne kiya tha. */}
          <ThemeContext.Consumer>
            {([theme]) => {
              return (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
              );
            }}
          </ThemeContext.Consumer>

          <p>{description}</p>
          
          {/* Yaha directly showModal ab chal jaega kyoki maine usse this.state se pehle hi le liya tha. */}
          {showModal ? (
            <Modal>
              <h2>Would you like to adopt {name}?</h2>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
          {/* false me null dala matlab don't render anything. */}
        </div>
      </div>
    );
    // Jaise hi kisi component ki state change hoti he to React re-render karta he us component ko.
    // Ab class component ko re-render karna matlab uska render() function chalana.
  }
}

const DetailsWithRouter = withRouter(Details);
// Ye withRouter() likh ke mai export isliye kar raha hu is classComponent ko taki react-router mujhe sari info/props de.

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  ); // Error Boundary mai wrap karke withRouter(Details) dala taki error boundary can catch errors in Details.
}
