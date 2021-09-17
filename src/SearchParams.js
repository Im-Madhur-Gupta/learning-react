import { useState, useEffect, useContext } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["cat", "dog", "bird", "hamster"];

const SearchParams = () => {
  const [location, updateLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  const [breeds, status] = useBreedList(animal);

  const [theme, setTheme] = useContext(ThemeContext); // Now I have access to theme context, I have just pulled it out of ThemeContext using the hook useContext(), "theme" mai basically wo color wali string aa jaegi.

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        // adding submit functionality to our form
        onSubmit={(event) => {
          event.preventDefault(); // preventing our page from refreshing once the form is submitted.
          requestPets();
        }}
      >
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
          Animal
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
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
            onBlur={(event) => setBreed(event.target.value)}
          >
            <option />
            {breeds.map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            onBlur={(event) => setTheme(event.target.value)}
          >
            <option value="black">Black</option>
            <option value="grey">Grey</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>

        <button type="submit" style={{ backgroundColor: theme }}>
          {/* style me bahar wala {} is for a JS expression and andar wala is for style object that we provide to style ppt. */}
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
