import { useState } from "react";

const useFetcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (fetch_obj) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://react-http-course-499da-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        fetch_obj
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };
  return [isLoading, setIsLoading, error, setError, makeRequest];
};

export default useFetcher;
