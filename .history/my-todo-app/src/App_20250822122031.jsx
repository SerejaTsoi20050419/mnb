import { useState } from "react";
import Task from "./Task";
import React from 'react';`                                                                                                     `

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Learn React", completed: false },
    { id: 2, name: "Build a To-Do App", completed: false },
  ]);

  const addTask = (name) => {
    const newTask = { id: Date.now(), name, completed: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newName) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
    );
  };

  return (
    <div className="app">
      <h1>My To-Do App</h1>

      <input
        type="text"
        placeholder="Add new task"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addTask(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />

      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;