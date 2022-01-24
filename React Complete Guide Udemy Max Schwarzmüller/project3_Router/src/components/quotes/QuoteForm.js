import { useRef, useState } from "react";

// Prompt component ki madad se mai user ko warn kar sakta hu jab they are trying to navigate away from the current page.
import { useHistory, Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  // state to manage if the form was in focus at some time or not.
  let [isEntering, setIsEntering] = useState(false);

  // const history = useHistory();

  const authorInputRef = useRef();
  const textInputRef = useRef();

  async function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });

    // programmatically redirecting -
    // could be done using history.push() or history.replace()
    // push mai wo pages ke stack pe add kardega.
    // replace mai wo current page ko stack maise replace kardega.
    // replace mai history.back() karke back ni ja sakte.
    // history.push("/all-quotes"); --> Took this to AddQuote.js -> useEffect func.
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
    // Closure ki wajah se milegi to abhi bhi purani value hi yaha.
    console.log("inside finish entering handler", isEntering);
  };

  // bahar new value milegi.
  console.log("outside finish entering handler", isEntering);

  return (
    <>
      {/* Prompt component takes 2 arguments - */}
      {/* 1. when - Jab user page chodd ke jaa raha ho aur ye "when" wali condition follow ho rahi ho tab prompt dikhana. */}
      {/* 2. message - a function that returns the prompt message (string) which we want to show. */}
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave?"}
        // location parameter stores the data regarding where the user wants to navigate to, leaving the current page.
      ></Prompt>

      <Card>
        {/* Ye paat lagane ke liye ki form focus mai he ki ni we can use the onFocus event handler - */}
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button
              // Pehle btn click pai isEntering false karwa dunga taki submit karne ke baad Prompt na dikhe.
              // Is prompt wali situation after submission can be handled simply using another state.
              onClick={finishEnteringHandler}
              type="submit"
              className="btn"
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
