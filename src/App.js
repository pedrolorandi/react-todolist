import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

const FILTER_MAP = {
  all: () => true,
  business: (task) => task.category === "business",
  personal: (task) => task.category === "personal",
  other: (task) => task.category === "other",
};

const FILTER_CATEGORIES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = useState([{}]);
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const usersCollectionRef = collection(db, "tasks");
  const q = query(usersCollectionRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    async function getTasks() {
      const data = await getDocs(q);
      const dataMap = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(dataMap);
    }

    getTasks();
  }, []);

  const handleVisible = () => {
    visible ? setVisible(false) : setVisible(true);
  };

  const handleSearch = (task) => {
    if (search === "") {
      return task;
    } else if (task.name.toLowerCase().includes(search.toLowerCase())) {
      return task;
    }
  };

  const categoryLength = (category) => {
    const categoryList = tasks.filter((task) => category === task.category);
    return categoryList.length;
  };

  const filterList = FILTER_CATEGORIES.slice(1).map((category) => (
    <FilterButton
      key={category}
      category={category}
      categoryLength={categoryLength}
      filter={filter}
      setFilter={setFilter}
    />
  ));

  const addTask = async (name, category) => {
    const uniqueId = Date.now();
    const newTask = {
      id: `todo-${uniqueId}`,
      name: name,
      category: category,
      completed: false,
      createdAt: uniqueId,
    };
    await setDoc(doc(db, "tasks", `todo-${uniqueId}`), newTask);
    setTasks([newTask, ...tasks]);
  };

  const toggleTaskCompleted = async (id) => {
    let isTaskCompleted = "";
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        isTaskCompleted = task.completed;
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    await updateDoc(doc(db, "tasks", id), { completed: !isTaskCompleted });
    setTasks(updatedTasks);
  };

  const editTask = async (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    await updateDoc(doc(db, "tasks", id), { name: newName });
    setTasks(editedTaskList);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    deleteDoc(doc(db, "tasks", id));
    setTasks(remainingTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .filter(handleSearch)
    .map((task) => (
      <Todo
        id={task.id}
        key={task.id}
        name={task.name}
        category={task.category}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    ));

  const loading = (
    <>
      <div className={`no-click flex`}></div>
      <div className="container flex">
        <div className="search-bar-container">
          <form className="flex">
            <img
              className="icon magnifying-glass ml"
              src="https://www.svgrepo.com/show/127033/magnifying-glass.svg"
              alt=""
            />
            <input type="text" className="search-bar box" disabled />
          </form>
        </div>
        <div className="tasks-container">
          <h1>Just a minute, please!</h1>
          <ul className="categories flex mt">
            <li className="box">
              <span className="skeleton skeleton-text"></span>
              <span className="skeleton skeleton-heading"></span>
            </li>
            <li className="box">
              <span className="skeleton skeleton-text"></span>
              <span className="skeleton skeleton-heading"></span>
            </li>
            <li className="box">
              <span className="skeleton skeleton-text"></span>
              <span className="skeleton skeleton-heading"></span>
            </li>
            <li className="box new-task grey flex">
              <i className="fa-solid fa-circle-plus fa-2x opacity"></i>
              <div className="button-text">
                <span className="text opacity">New</span>
                <h3 className="opacity">Task</h3>
              </div>
            </li>
          </ul>
          <ul className="tasks">
            <li className="box mt flex">
              <span className="skeleton skeleton-heading"></span>
              <div className="buttons">
                <button type="button" className="box skeleton">
                  <i className="fa-solid fa-pen opacity"></i>
                </button>
                <button type="button" className="box skeleton">
                  <i className="fa-solid fa-circle-xmark opacity"></i>
                </button>
              </div>
            </li>
            <li className="box mt flex">
              <span className="skeleton skeleton-heading"></span>
              <div className="buttons">
                <button type="button" className="box skeleton">
                  <i className="fa-solid fa-pen opacity"></i>
                </button>
                <button type="button" className="box skeleton">
                  <i className="fa-solid fa-circle-xmark opacity"></i>
                </button>
              </div>
            </li>
            <li className="box mt flex">
              <span className="skeleton skeleton-heading"></span>
              <div className="buttons">
                <button type="button" className="box skeleton">
                  <i className="fa-solid fa-pen opacity"></i>
                </button>
                <button type="button" className="box skeleton">
                  <i className="fa-solid fa-circle-xmark opacity"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );

  const loaded = (
    <>
      <div className={`no-click ${visible ? "flex" : "none"}`}></div>
      <div className="container flex">
        <SearchBar setSearch={setSearch} search={search} />
        <div className="tasks-container">
          <h1>Here's what we have to do!</h1>
          <ul className="categories flex mt">
            {filterList}
            <li className="box new-task grey flex" onClick={handleVisible}>
              <i className="fa-solid fa-circle-plus fa-2x"></i>
              <div className="button-text">
                <span className="text">New</span>
                <h3>Task</h3>
              </div>
            </li>
          </ul>
          <Form
            addTask={addTask}
            visible={visible}
            handleVisible={handleVisible}
          />
          <ul className="tasks">{taskList}</ul>
        </div>
      </div>
    </>
  );

  return document.readyState === "complete" ? loaded : loading;
}

export default App;
