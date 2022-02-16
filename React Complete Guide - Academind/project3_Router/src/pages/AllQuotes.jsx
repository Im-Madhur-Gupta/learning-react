import { useEffect } from "react";

import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// import DUMMY_QUOTES from "../components/quotes/quoteData.json";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes, // data ko ek alias name de diya he -> loadedQuotes.
    error,
  } = useHttp(getAllQuotes,true);

  useEffect(() => {
    sendRequest();
  }, []);

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

  // firebase se GET request complete to ho gai par usne null ya empty array return kar diya to Not Found component dikhana he.
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  console.log("loadedQuotes", loadedQuotes);
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
