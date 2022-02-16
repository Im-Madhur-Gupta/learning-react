// *** we'll use useEffect hook here ***
// useEffect() ye kehta he ki agr kisi variable pe change/effect aya to mai us variable pe ya kuch aur piece of code run karwa sakta hu.
import { useState, useEffect } from "react";
import Pet_JSX from "./Pet_JSX";

const ANIMALS = ["cat", "dog", "bird", "hamster"];

const SearchParams = () => {
  const [location, updateLocation] = useState("");

  const [animal, setAnimal] = useState("");

  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]); // API se jo pets milegenge unko mai pets array me rakhna chahta hu isliye pets array ka state hook bana diya.
  const BREEDS = [];

  useEffect(() => {
    // yaha mai apna async code likh sakta hu
    requestPets();
  }, []);
  // IMP - useEffect() ka second arguement ye batata he ki usko ek baar chalne ke baad kab rerun karna he, to agr maine [] NI diye matlab wo har re-render (by React) pe rerun hoga, this is creating infinite loop as requestPets() ek baar chalega to wo pets variable ko update kardega to React bolega ki pets variable change ho gaya to re-render karta hu to requestPets() firse chal jaega.

  // Maine agr 2nd agruement [] dediya to requestPets() sirf total me ek baar chalega (not after a re-render) unless maine usse alag se call kiya ho.
  // Agr 2nd arguement [animal] de diya to requestPets() tab tab phirse chalega jab animal wala variable change ho raha hoga.

  async function requestPets() {
    // storing the response we recieved from an API request created using fetch
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    // await keyword se mai async code mai ye bolta hu ki jab tak ek particular promise returning function/expression (like fetch(), res.json()) apna promise fulfil ni karta tab tak age ni badna uss line se.

    // storing the response we recieved in a json object -
    const json = await res.json();
    // console.log(json);

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Your Location"
            onChange={(event) => updateLocation(event.target.value)}
          />
        </label>

        <label htmlFor="animal">
          <select
            id="animal"
            value={animal}
            onChange={(event) => setAnimal(event.target.value)}
            onBlur={(event) => setAnimal(event.target.value)}
          >
            <option />

            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          <select
            disabled={!breed.length}
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

      {pets.map((pet) => (
        <Pet_JSX
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
