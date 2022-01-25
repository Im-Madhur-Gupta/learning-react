import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  // jab bhi quoteId change ho to mujhe comments firse fetch karne padenge.
  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddedCommentHandler = () => {
    // comment add karne pai mai new data fetch karna chahta hu.
    sendRequest(quoteId);
    console.log("added comment handler get");
  };

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Comments Found.</p>;
  }

  // we have our data
  if (status === "completed" && loadedComments) {
    comments = <CommentsList comments={loadedComments} />;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddedComment={onAddedCommentHandler}
          quoteId={quoteId}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
