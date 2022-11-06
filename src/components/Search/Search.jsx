import { useRouter } from "next/router.js";
import React, { useEffect, useState } from "react";

import httpRequest from "../../lib/httpRequest";

import { Control, Form, Input } from "./Search.style";

const SearchForm = (props) => {
  const router = useRouter();
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const { onSearchResults } = props;

  // --------------------------------
  // DEBOUNCING
  useEffect(() => {
    if (!isTouched || enteredValue.length === 0) return;

    const runLater = setTimeout(async () => {
      const data = await httpRequest(
        `https://api.rawg.io/api/games?key=7624d1052a1c4ec68b3300e9bb3f12e7&search="${enteredValue}"&page_size=20&page=1`
      );

      onSearchResults(data.results, enteredValue);
    }, 400);

    return () => {
      clearTimeout(runLater);
    };
  }, [enteredValue, onSearchResults, isTouched]);

  // --------------------------------
  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value);

    // console.log(router);

    // -- Push search input value to URL as a query Parameter

    if (event.target.value)
      router.replace({
        pathname: `${router.pathname}`,
        query: { search: encodeURI(event.target.value) },
      });

    if (!event.target.value)
      router.replace({
        pathname: `${router.pathname}`,
        query: {},
      });
  };

  // --------------------------------
  const onFocusHandler = () => {
    setIsTouched(true);
  };

  // --------------------------------
  const onBlurHandler = () => {
    setIsTouched(false);
  };

  // --------------------------------
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  // --------------------------------
  return (
    <Form onSubmit={onSubmitHandler}>
      <Control>
        <Input
          type="text"
          value={enteredValue}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
        />
      </Control>
    </Form>
  );
};

export default SearchForm;
