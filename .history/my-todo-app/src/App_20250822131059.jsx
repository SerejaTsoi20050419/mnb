import { useState } from "react";
import React from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  // Переключение выполненности задачи
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Очистить завершённые
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Счётчик активных задач
  const activeCount = tasks.filter((task) => !task.completed).length;

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>

      {/* Добавление задачи */}
      <div className="add-task">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите задачу..."
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      {/* Список задач */}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.text}
          </li>
        ))}
      </ul>

      {/* Нижняя панель */}
      <div className="footer">
        <span>{activeCount} задач осталось</span>
        <div className="filters">
          <button onClick={() => setFilter("all")}>Все</button>
          <button onClick={() => setFilter("active")}>Активные</button>
          <button onClick={() => setFilter("completed")}>Завершенные</button>
        </div>
        <button onClick={clearCompleted}>Очистить завершенные</button>
      </div>
    </div>
  );
}