import React, { useState } from "react";
import TaskList from "./TaskList";
import React from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [newTask, setNewTask] = useState("");

  // Добавление задачи
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  // Изменение статуса задачи
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Очистка всех завершенных задач
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Счетчик незавершенных задач
  const unfinishedCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <h1>TO-DO App</h1>

      {/* Форма добавления задачи */}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Введите задачу..."
        />
        <button type="submit">Добавить</button>
      </form>

      {/* Фильтры */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("completed")}>Завершенные</button>
      </div>

      {/* Список задач */}
      <TaskList
        tasks={tasks}
        filter={filter}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {/* Нижняя панель */}
      <div className="footer">
        <span>Осталось задач: {unfinishedCount}</span>
        <button onClick={clearCompleted}>Очистить завершенные</button>
      </div>
    </div>
  );
}

export default App;