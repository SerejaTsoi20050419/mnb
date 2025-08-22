import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Добавление задачи
  const addTask = () => {
    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  // Переключение состояния задачи
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  // Очистка завершённых задач
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="app">
      <h1>To-Do App</h1>

      {/* Добавление задачи */}
      <div className="task-input">
        <input
          type="text"
          value={inputValue}
          placeholder="Введите задачу..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      {/* Список задач */}
      <ul className="task-list">
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

      {/* Фильтры */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("completed")}>Завершенные</button>
      </div>

      {/* Очистка завершённых */}
      <div className="clear-btn">
        <button onClick={clearCompleted}>Очистить завершенные</button>
      </div>
    </div>
  );
}

export default App;