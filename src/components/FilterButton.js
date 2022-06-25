import React from "react";

function FilterButton(props) {
  const handleClassName = () => {
    if (props.filter === props.category || props.filter === "all") {
      return props.category;
    } else {
      return "grey";
    }
  };

  const handleSetFilter = () => {
    if (props.filter === props.category) {
      props.setFilter("all");
    } else {
      props.setFilter(props.category);
    }
  };

  return (
    <li className={`box ${handleClassName()}`} onClick={handleSetFilter}>
      <span className="text">{props.categoryLength(props.category)} Tasks</span>
      <h3 className="capitalize">{props.category}</h3>
    </li>
  );
}

export default FilterButton;
