import React from "react";

const SortDropdown = (props) => {
  const { onSortChange } = props;

  const onChangeHandler = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <form>
      <label htmlFor="sort">Sort By:</label>

      <select name="sort" id="sort" onChange={onChangeHandler}>
        <option value="relevance">Relevance</option>
        <option value="released">Released</option>
        <option value="created">created</option>
        <option value="name">name</option>
        <option value="added">added</option>
        <option value="rating">rating</option>
      </select>
    </form>
  );
};

export default SortDropdown;
