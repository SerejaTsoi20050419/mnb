import React, { useState } from "react";

// Компонент задачи
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
    <li className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="border rounded px-1"
        />
      ) : (
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>✏️</button>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </li>
  );
}

// Компонент списка задач
function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul className="list-none p-0">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

// Родительский компонент
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Купить хлеб", completed: false },
    { id: 2, title: "Сделать уроки", completed: false },
    { id: 3, title: "Позвонить другу", completed: true },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3">📝 To-Do List</h1>
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}