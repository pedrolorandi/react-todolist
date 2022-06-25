import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [radio, setRadio] = useState("");
  const [isEmpty, setEmpty] = useState();
  const [isSelected, setSelected] = useState();

  const handleRadioChange = (e) => {
    setCategory(e.target.value);
    setRadio(e.target);
    setSelected();
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    setEmpty();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setEmpty(true);
    } else if (radio === "") {
      setSelected(true);
    } else {
      props.addTask(name, category);
      radio.checked = false;
      setName("");
      setCategory("");
      setRadio("");
      props.handleVisible();
    }
  };

  const handleCancel = () => {
    if (radio !== "") radio.checked = false;
    setName("");
    setCategory("");
    setRadio("");
    props.handleVisible();
  };

  return (
    <div
      className={`new-task-container box mt ${props.visible ? "flex" : "none"}`}
    >
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`ml ${isEmpty ? "red-placeholder" : null}`}
          placeholder="What's coming up?"
          value={name}
          autoComplete="off"
          onChange={handleInputChange}
          autoFocus
        />
        <div className="buttons-categories flex">
          <span className={isSelected ? "color-red" : null}>
            Choose a category:
          </span>
          <div className="options flex">
            <input
              type="radio"
              value="business"
              name="category"
              id="category-button-1"
              className="radio-business"
              onChange={handleRadioChange}
            />
            <label className="box flex" htmlFor="category-button-1">
              Business
            </label>
            <input
              type="radio"
              value="personal"
              name="category"
              id="category-button-2"
              className="radio-personal"
              onChange={handleRadioChange}
            />
            <label className="box flex" htmlFor="category-button-2">
              Personal
            </label>
            <input
              type="radio"
              value="other"
              name="category"
              id="category-button-3"
              className="radio-other"
              onChange={handleRadioChange}
            />
            <label className="box flex" htmlFor="category-button-3">
              Other
            </label>
          </div>
          <div className="buttons">
            <button type="submit" className="box green save">
              <i className="fa-solid fa-cloud-arrow-down"></i>
            </button>
            <button
              type="button"
              className="box red cancel"
              onClick={handleCancel}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
