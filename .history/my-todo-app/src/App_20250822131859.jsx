import { useEffect, useState, useMemo } from "react";
import TaskList from "./TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [tick, setTick] = useState(0); // глобальный тик каждую секунду

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      done: false,
      createdAt: Date.now(),
    };
    if (!newTask.text) return;
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((t) => !t.done));

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "completed") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="app">
      <h1>To-Do</h1>
      <TaskForm onAdd={addTask} />
      <Filters value={filter} onChange={setFilter} />
      <TaskList
        tasks={filtered}
        onToggle={toggleTask}
        onClearCompleted={clearCompleted}
        tick={tick} // <- просто прокидываем, чтобы элементы пересчитали «time ago»
      />
    </div>
  );
}

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(text);
        setText("");
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача…"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

function Filters({ value, onChange }) {
  return (
    <div className="filters">
      <button
        onClick={() => onChange("all")}
        aria-pressed={value === "all"}
      >
        Все
      </button>
      <button
        onClick={() => onChange("active")}
        aria-pressed={value === "active"}
      >
        Активные
      </button>
      <button
        onClick={() => onChange("completed")}
        aria-pressed={value === "completed"}
      >
        Завершенные
      </button>
    </div>
  );
}