import React, { useState } from "react";

// Компонент отдельной задачи
function Task({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEdit(task.id, newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            flexGrow: 1,
          }}
        >
          {task.title}
        </span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>✏️</button>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  );
}

// Родительский компонент со списком задач
function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Купить хлеб", completed: false },
    { id: 2, title: "Сделать домашку", completed: true },
  ]);

  // Переключение состояния задачи
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Редактирование названия задачи
  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "16px" }}>
      <h1>Мой To-Do список</h1>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      ))}
    </div>
  );
}

export default TodoApp;