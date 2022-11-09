import React, { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (URL) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(URL);

      if (!response.ok) throw new Error("Something went wrong!!");

      const data = await response.json();

      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error.message);
      console.log(error.cause);
      setError(error.message || `Something went Wong!!`);
      setIsLoading(false);
    }
  }, []);

  return { fetchData, isLoading, error };
};

export default useFetch;
