// Hooks "use___" type ke name ke hote he, *** we'll use useState hook here *** -
// It allows us to keep track of state.

// IMP - Yaha maine data binding ki he using hooks, user jo input me dal raha he usko mai ek location name ke variable me store kr raha hu. Yani mai asani se location ki value update karta rahunga using hooks.

import { useState } from "react";

// const something = "here"; ye const re-rendering me obvs. change ni hoga.

const ANIMALS = ["cat", "dog", "bird", "hamster"]; // used in providing a dropdown list of animals for user to choose from.


const SearchParams = () => {
  const [location, updateLocation] = useState("Bhopal, MP");
  // useState() ko mujhe default value deni he.
  // updateLocation location ke state ko track karega
  // console.log(location) --> just to check whether location is getting updated or not.
  
  // actually useState() ek tuple return karega
  // const locationTuple = useState("Bhopal, MP")
  // const location = locationTuple[0];
  // const updateLocation = locationTuple[1];
  // Previous way is just to write a one-liner for this.
  
  // Ab Manle ki tujhe location ki values/states ke hisab se ek variable set karna he using conditionals
  const isRaining = location === "Bhopal, Mp" ? true : false;
  // === is called strict equality operator, ye value compare karne ke liye type conversion ni karta
  // == type conversion karta he before equality check
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
  
  // Hook for animal (drop down selection) -
  const [animal, setAnimal] = useState("");
  
  const [breed, setBreed] = useState("");
  const BREEDS = []; // **** we'll come back to this
  
  return (
    <div className="search-params">
      {/* React uses className instead of class as class is a keyword of JS */}
      <form>
        <label htmlFor="location">
          Location
          {/* same thing as above for "for" -> "htmlFor" */}
          <input
            id="location"
            value={location}
            placeholder="Your Location"
            onChange={(event) => updateLocation(event.target.value)}
          />
          {/* onChange() will return an event, is event ke target ki value ko mai updateLocation() ko dunga aur wo us value ko location (const) pe dal dega (uski value ko update kr dega). */}
        </label>

        {/* Dropdown list of animals */}
        <label htmlFor="animal">
          <select
            id="animal"
            value={animal}
            onChange={(event) => setAnimal(event.target.value)}
            onBlur={(event) => setAnimal(event.target.value)}
          >
            {/* option for selecting nothing */}
            <option />

            {/* Fir mujhe ANIMALS array ke har ek element ke correspondng options banane he */}
            {
              ANIMALS.map((animal) => (
                <option value={animal} key={animal}>
                  {animal}
                </option>
              ))
              // Arrow func. shortcut used (...) => return(...) is equivalent to (...) => (...)
            }
          </select>
        </label>

        <label htmlFor="color">
          <select
            // this dropdown should remain disabed until length of breed string is >=1
            disabled={!(breed.length)}
            id="breed"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
            onBlur={(event) => setBreed(event.target.value)}
          >
            <option />
            {BREEDS.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

// Ill use hooks for frequently updating a variable after a re-render cycle.

// Important Point about Hooks - Never put hooks inside a conditional or a loop, because the order in which hooks are being called is essentaial for react's re-render cycle meaning once the order of hooks is decided it should remain same for all the re-render cycles.

// React me jo re-rendering hoti he that is localised to a component in which react senses a change, due to this react's rerendering is fast.
