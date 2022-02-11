import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // We can make fetch() request using JS promises syntax and async / await syntax -

  // Using JS Promises - then() chains.
  /*
  const fetchMovieHandler = () => {
    // Using the fetch API
    // Ye fetch() function 2 arguments leta he, 1st URL, 2nd a JS object that has got many parameters like method, body for our request.
    // If we omit the JS object then by default a GET request is sent.
    // fetch() is an async function, so, it returns a promise. Ye promise ka jab response/result ayega tab then() wala function chalega aur koi error aya to catch() wala function chalega.
    // Is syntax mai error catch karne ke liye .catch() use karte he, ex - fetch().catch()
    fetch("https://swapi.dev/api/films")
    .then((response) => {
      return response.json();
      // jo repsonse mila GET request ka usse json() mai parse kar diya, json() khud async method he to iska bhi .then() likhna padega.
    })
      .then((data) => {
        const transformedData = data.results.map((result) => {
          return {
            id: result.episode_id,
            title: result.title,
            releaseDate: result.release_date,
            openingText: result.opening_crawl,
          };
        });
        setDummyMovies(transformedData);
      });
    };
    */

  // Using JS async await - (a bit easier to read)
  // function ke samne "async" likh dena he aur jo asynchronous function call kara he he uske samne "await" likh dena.
  // Aisa likh dene se called asynchronous func. ka promise jab tak return ni hota tab tak compiler age us line ke ni badta.
  // Yaha error handle karne ke liye try-catch block ka use karte he.
  // IMP - fetch() api doesnt throw a technical error when it gets back a error status code, axios package does that though.
  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(""); // removing previous error (if any)
    try {
      const response = await fetch(
        "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      // fetch() api jo JS object return karta he uske pass "ok" field aur "status" field.
      // ok field is true for no error.
      // status field contains the status code of the http request.
      if (!response.ok) {
        console.log("Error aya.");
        throw new Error(
          `Error encountered - status code -> ${response.status}.`
        );
      }
      const data = await response.json();
      // json() bhi async function he to uske samne "await" keyword likh diya.

      console.log(data);

      const transformedData = [];
      for (let movieKey in data) {
        transformedData.push({
          id: movieKey,
          title: data[movieKey].title,
          releaseDate: data[movieKey].releaseDate,
          openingText: data[movieKey].openingText,
          // movieKey mai "-" bhi ho sakta he to [] notation use karenge for object.
        });
      }

      setDummyMovies(transformedData);
      // yaha loading band isliye ni ki kyoki agr error aya to loading kabhi band ni hogi.
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); // Error mile ya na mile loading to band karni padegi.
  }, []); // No dependency for useCallback().

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]); // Mai 1st render ke baad automatic fetch karna chahta hu aur jab fetchMovieHandler() change ho tab fetch() karwana chahta hu.
  // function ko re-evaluation se preserve karne ke liye useCallback use kiya.
  // Agr data hota to useMemo use karte.

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST", // POST request ke liye.
        // body mai jo data post karna he usse dete he, and this data should be in JSON format.
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
          // "headers" mai kaisa data diya he wo batate he. 
        },
      }
    );
    const data = await response.json();
    console.log(data);
    // Yaha bhi error handling kar sakte he
    fetchMovieHandler();
  };

  let content;
  // I wanna render the movies list only if we are not loading and dummyMovies array length is > 0.
  // JS non-empty string ko true ki tarah treat karta.
  if (!isLoading && dummyMovies.length === 0 && !error) {
    content = <h1>No movies fetched yet.</h1>;
  }
  if (!isLoading && dummyMovies.length > 0 && !error) {
    content = <MoviesList movies={dummyMovies} />;
  }
  if (!isLoading && error) {
    content = <h1>{error}</h1>;
  }
  if (isLoading) {
    content = <h1>LOADING...</h1>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
