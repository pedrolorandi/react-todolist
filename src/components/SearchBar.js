import React, { useState } from "react";

function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");

  const handleDefault = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleTyping = (e) => {
    console.log(e.target.value);
    props.setSearch(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setInputValue("");
    props.setSearch("");
  };

  return (
    <div className="search-bar-container">
      <form className="flex">
        <img
          className="icon magnifying-glass ml"
          src="https://www.svgrepo.com/show/127033/magnifying-glass.svg"
          alt=""
        />
        <input
          type="text"
          className="search-bar box"
          placeholder="Search for a task"
          value={inputValue}
          onChange={handleInput}
          onKeyUp={handleTyping}
          onKeyDown={handleDefault}
        />
        <button
          className={`icon clear-search mr ${props.search ? null : "none"}`}
          onClick={handleButtonClick}
        >
          <i className="fa-solid fa-circle-xmark fa-2x"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
