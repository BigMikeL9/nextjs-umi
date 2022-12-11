import React from "react";

const SortDropdown = (props) => {
  console.log(props);

  const { onSortChange } = props;

  const onChangeHandler = (event) => {
    console.log(event.target.value);
    onSortChange(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="sort">Sort By:</label>

      <select name="sort" id="sort" onChange={onChangeHandler}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </form>
  );
};

export default SortDropdown;
