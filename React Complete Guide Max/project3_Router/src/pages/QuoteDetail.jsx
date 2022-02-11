import { useEffect } from "react";
import { Route, useParams, useRouteMatch, Link } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// import DUMMY_QUOTES from "../components/quotes/quoteData.json";

const QuoteDetail = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote, // data ko ek alias name de diya he -> loadedQuotes.
    error,
  } = useHttp(getSingleQuote, true);

  // useRouteMatch hook gives me the path and url of a component so that I can navigate.
  const match = useRouteMatch();
  console.log(match);
  const { path, url } = match;

  const { quoteId } = useParams();

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId]);

  // const quoteData = DUMMY_QUOTES.find((quote) => quote.id === quoteId);

  // Loading spinner ke liye -
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  // agr error aya -
  if (error) {
    return (
      <div className="centered focused">
        <p>{error}</p>
      </div>
    );
  }

  const quoteData = loadedQuote;

  // quote not found --> us quote ka text falsy he.
  if (!quoteData.text) {
    return <h1>No Quote Found.</h1>;
  }

  return (
    <>
      <HighlightedQuote text={quoteData.text} author={quoteData.author} />

      {/* Conditional Content Rendering through Routes - */}
      <Route exact path={`${path}`}>
        <div className="centered">
          <Link className="btn--flat" to={`${url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>
      <Route path={`${path}/comments`}>
        <div className="centered">
          <Link className="btn--flat" to={`${url}`}>
            Hide Comments
          </Link>
        </div>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
