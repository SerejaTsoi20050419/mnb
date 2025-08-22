import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Learn React", completed: false, editing: false },
    { id: 2, name: "Build a To-Do App", completed: false, editing: false },
  ]);

  const [newTask, setNewTask] = useState("");

  // Добавление задачи
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), name: newTask, completed: false, editing: false },
    ]);
    setNewTask("");
  };

  // Переключение выполненности
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Удаление
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Включить режим редактирования
  const startEditing = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, editing: true } : t
    ));
  };

  // Обновление имени при Enter
  const handleEditKey = (id, e) => {
    if (e.key === "Enter") {
      setTasks(tasks.map((t) =>
        t.id === id ? { ...t, name: e.target.value, editing: false } : t
      ));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1>To-Do App</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 0",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            {task.editing ? (
              <input
                type="text"
                defaultValue={task.name}
                onKeyDown={(e) => handleEditKey(task.id, e)}
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  flex: 1,
                  marginLeft: "8px",
                }}
              >
                {task.name}
              </span>
            )}

            <button onClick={() => startEditing(task.id)}>✏️</button>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;