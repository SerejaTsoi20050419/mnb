import { useState } from "react";
import React from 'react';

function Task({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEditSubmit = (e) => {
    if (e.key === "Enter") {
      editTask(task.id, newName.trim() || task.name);
      setIsEditing(false);
    }
  };

  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleEditSubmit}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <>
          <span onClick={() => toggleTask(task.id)}>{task.name}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => deleteTask(task.id)}>🗑️</button>
        </>
      )}
    </li>
  );
}

export default Task;