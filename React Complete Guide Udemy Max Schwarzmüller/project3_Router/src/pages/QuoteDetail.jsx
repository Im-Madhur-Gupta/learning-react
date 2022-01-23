import { Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";

const QuoteDetail = () => {
  // useRouteMatch hook gives me the path and url of a component so that I can navigate.
  const { path, url } = useRouteMatch();
  const { quoteId } = useParams();
  console.log(quoteId);
  return (
    <>
      <h1>Quote Detail</h1>
      <Route path={`${path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
