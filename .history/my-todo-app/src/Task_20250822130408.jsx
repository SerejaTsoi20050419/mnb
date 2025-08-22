import React from "react";


function Task({ task, toggleTask, deleteTask }) {
  return (
    <li className={`task ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
    </li>
  );
}

export default Task;