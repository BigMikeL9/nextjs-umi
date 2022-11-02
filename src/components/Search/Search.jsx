import React, { useEffect, useState } from "react";

import httpRequest from "../../lib/httpRequest";

import { Control, Form, Input } from "./Search.style";

const SearchForm = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const { onSearchResults } = props;

  // DEBOUNCING
  useEffect(() => {
    if (enteredValue.length === 0) return;

    const runLater = setTimeout(async () => {
      const data = await httpRequest(
        `https://api.rawg.io/api/games?key=7624d1052a1c4ec68b3300e9bb3f12e7&search="${enteredValue}"&search_precise=true&search_exact=true&ordering=-released&ordering=-metacritic`
      );

      // console.log(data);

      onSearchResults(data.results);
    }, 100);

    return () => {
      clearTimeout(runLater);
    };
  }, [enteredValue]);

  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const onBlurHandler = () => {};

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Control>
        <Input
          type="text"
          value={enteredValue}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </Control>
    </Form>
  );
};

export default SearchForm;
