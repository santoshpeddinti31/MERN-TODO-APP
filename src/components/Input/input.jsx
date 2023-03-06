import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../Input/input.css";
const InputValue = function () {
  const [todo, setTodo] = useState([]); //get method
  const [newTask, setNewtask] = useState(""); //post method

  useEffect(() => {
    const fetchData = async function () {
      await axios
        .get("http://localhost:8000/read")
        .then((arr) => setTodo(arr.data));
    };
    fetchData();
  }, []);

  const inputHandler = (e) => {
    setNewtask(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/data", { todo: newTask })
      .then((arr) => setTodo(arr.data));
  };
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((arr) => setTodo(arr.data));
  };

  const clearAll = () => {
    axios.delete(`http://localhost:8000/deleteall`).then(() => setTodo([]));
  };
  return (
    <Fragment>
      <div className="input_data">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="add your work here..."
            value={newTask}
            onChange={inputHandler}
            autoFocus
          />
          <button type="submit" value="Submit">
            OK
          </button>
        </form>
      </div>
      <div className="tasks">
        <h6>Add your tasks:</h6>
      </div>
      <div className="ui">
        <ul>
          {todo.map((task) => (
            <li key={task._id}>
              {task.todo}
              <button
                className="delete"
                onClick={() => deleteHandler(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="clear" onClick={clearAll}>
          clear all
        </button>
      </div>
    </Fragment>
  );
};
export default InputValue;
