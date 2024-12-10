import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDo from "./components/ToDo";
import { baseURL } from "./utils/constant";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState(""); // State to store new task input

  // Fetch tasks when the component mounts
  useEffect(() => {
    axios.get(`${baseURL}/get`).then((response) => {
      setTodos(response.data);
    });
  }, []);

  // Handle adding a new task
  const addTask = () => {
    if (!newTask.trim()) return; // Don't add empty tasks

    axios
      .post(`${baseURL}/save`, { toDo: newTask })
      .then((response) => {
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setNewTask(""); // Clear the input after adding
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding task");
      });
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Update the input state
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="toDoList">
        {todos.map((todo) => (
          <ToDo
            key={todo._id}
            id={todo._id}
            text={todo.toDo}
            setUpdateUI={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
