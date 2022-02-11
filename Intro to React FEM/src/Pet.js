// Written using JSX
import React from "react";
import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg"; // default image
  if (images.length) {
    hero = images[0];
  }
  return (
    // agr app JSX me kahi bhi kuch JS expression use karna chah rahe ho to apko usko {} curly braces me enclose karna padega.

    // Maine React Router use karna start kar diya he to mai anchor tags ki jagah Link tag ko use karunga.
    // Bcz anchor tag ek new page pe le jaega yani wo reload karega page ko ie React ko but this isnt req. so we use Link tag jo ki mere Navigation ko capture karlega aur result provide karega acc. to the Routes WITHOUT reloading. 
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
