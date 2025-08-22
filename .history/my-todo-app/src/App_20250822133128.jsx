import React, { useState } from "react";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([
      ...tasks,
      { text, createdAt: Date.now(), id: Date.now() }
    ]);
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <button onClick={() => addTask("Новая задача")}>Добавить задачу</button>
      <ul>
        {tasks.map(task => (
          <Task key={task.id} text={task.text} createdAt={task.createdAt} />
        ))}
      </ul>
    </div>
  );
}

export default App;