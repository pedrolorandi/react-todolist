import React, { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newName !== "") {
      props.editTask(props.id, newName);
      setNewName("");
    }

    setEditing(false);
  };

  const editingTemplate = (
    <li className="task-edit box mt flex">
      <form onSubmit={handleSubmit} className="flex">
        <label className="checkbox flex disabled">
          <input type="checkbox" disabled />
          <input
            id={props.id}
            type="text"
            className="ml"
            value={newName}
            placeholder={props.name}
            onChange={handleChange}
            autoFocus
          />
        </label>
        <div className="buttons">
          <button type="submit" className="box green save">
            <i className="fa-solid fa-cloud-arrow-down"></i>
          </button>
          <button
            type="button"
            className="box red cancel"
            onClick={() => setEditing(false)}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
      </form>
    </li>
  );
  const viewTemplate = (
    <li className="box mt flex">
      <label className="checkbox flex">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          className={`flex ${props.category}`}
        />
        <span className="ml">{props.name}</span>
      </label>
      <div className="buttons">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="box blue edit"
        >
          <i className="fa-solid fa-pen"></i>
        </button>
        <button
          type="button"
          onClick={() => props.deleteTask(props.id)}
          className="box red delete"
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    </li>
  );

  return <>{isEditing ? editingTemplate : viewTemplate}</>;
}

export default Todo;
