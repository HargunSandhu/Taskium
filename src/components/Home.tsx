import React, { useState } from "react";

const Home = () => {
  const [input, setInput] = useState("");
  const [values, setValues] = useState([]);

  const add = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      item: input,
      completed: false,
    };
    setValues([...values, newTask]);
    setInput("");
  };

  const taskCompleted = (id) => {
    setValues((prevValues) =>
      prevValues.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const listTasks = values.map((task) => (
    <li
      key={task.id}
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        color: task.completed ? "#888" : "white",
      }}
    >
      {task.item}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => taskCompleted(task.id)}
        style={{ marginLeft: "10px" }}
      />
    </li>
  ));

  return (
    <div>
      <h1>Todo App</h1>
      <div className="container">
        <div className="input">
          <input
            type="text"
            className="inputField"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="addBtn" onClick={add}>
            +
          </button>
        </div>
        <h2>Tasks to do</h2>
        <ul className="items">{listTasks}</ul>
      </div>
    </div>
  );
};

export default Home;
