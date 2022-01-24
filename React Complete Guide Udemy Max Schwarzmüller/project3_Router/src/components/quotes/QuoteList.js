import { Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// sorting function -
const sortQuotes = (quotes, inAscending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (inAscending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  // creating an object of the URLSearchParams class -
  const queryParams = new URLSearchParams(location.search);

  // Accessing the search param -
  const isSortAscending = queryParams.get("sort") === "asc";
  console.log("isSortAscending", isSortAscending);

  const sortedQuotes = sortQuotes(props.quotes, isSortAscending);

  const toggleSortingHandler = () => {
    // history.push() seedha ka seedha url ko utha ke dal dega, is liye mujhe concrete URL chahiye -> "url" chahiye.
    // match.url ki jagah location.pathname use kar sakte he.
    // history.push(match.url + "?sort=" + (isSortAscending ? "desc" : "asc"));

    // OR
    
    // for handling complex urls -
    history.push({
      pathname: match.url,
      search: "?sort=" + (isSortAscending ? "desc" : "asc"),
    });
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={toggleSortingHandler}>
          Sort {isSortAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
