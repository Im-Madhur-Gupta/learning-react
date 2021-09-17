import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    // ye static he, ie wo jisse class ke obj banaye bina use kiya ja sakta he.
    // yaha mai basically default props / default images de raha hu ki agr manlo images api se ni ayi to mai ye default wali use karunga.
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active:Number(event.target.dataset.index),
    })
  }

  render() {
    // state is mutable/changable using this.setState(). Also, if I want to modify the state of Carousel component I can do it ONLY inside Carousel component.
    const { active } = this.state;

    // props is the data that is getting passed to a child component from its parent comp., so a child component cant mutate/change it, only the parent comp. can.
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => {
            return (
              // eslint-disable-next-line
              <img
                src={photo}
                alt="animal-thumbnail"
                key={photo}

                // setting the event listener functionality -
                // passing index in dataset -
                data-index={index}
                // adding event listener -
                // Actually event listener jab bhi define karte he to hame usme ye batana padta he ki "this" kisko refer karega, ye kar sakte he using this.handleIndexClick.bind(this)
                // Lekin mai agr handleIndexClick ko arrow function style me define kardu to wo apna "this" waha se leta he jaha usse create kiya gaya he naki waha se jaha se usse call kiya ho. Yani handleIndexClick arrow func. style ke liye "this" will be the Carousel comp. automatically (jaha usse create kiya tha) lekin agr normal tarike se handleIndexClick ko banaya gaya to wo "this" waha se mangega jaha usse call kiya jaa raha he yani at onClick={}.
                onClick={this.handleIndexClick} // handleIndexClick ko => style me likha he to yaha kuch extra add karne ki zaroorat ni he.

                className={index === active ? "active" : ""}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel; // yaha pe withRouter() likhne ki zaroorat ni he kyoki props react-router NI de raha, isme props simple/normal way se hi ayenge.
