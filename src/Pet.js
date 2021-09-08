// Written using JSX
import React from "react";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg"; // default image
  if (images.length) {
    hero = images[0];
  }
  return (
    // agr app JSX me kahi bhi kuch JS expression use karna chah rahe ho to apko usko {} curly braces me enclose karna padega.

    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </a>
  );
};

export default Pet;
