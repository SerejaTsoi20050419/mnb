import { useState } from "react";
import { FaTrash, FaCheck, FaPencilAlt } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false, editing: false },
    { id: 2, text: "Build To-Do App", completed: false, editing: false },
  ]);
  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, editing: false },
    ]);
    setNewTask("");
  };

  // Toggle completed
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing
  const startEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, editing: true } : task
      )
    );
  };

  // Save edited text
  const saveEdit = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, editing: false }
          : task
      )
    );
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>✅ To-Do List</h2>

      {/* Add new task */}
      <form onSubmit={addTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: "8px", width: "70%" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "10px" }}>
          Add
        </button>
      </form>

      {/* Task list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* Toggle complete */}
            <button
              onClick={() => toggleTask(task.id)}
              style={{
                marginRight: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaCheck color={task.completed ? "green" : "lightgray"} />
            </button>

            {/* Task text or edit input */}
            {task.editing ? (
              <input
                type="text"
                defaultValue={task.text}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit(task.id, e.target.value);
                  }
                }}
                onBlur={(e) => saveEdit(task.id, e.target.value)}
                style={{
                  flex: 1,
                  padding: "6px",
                }}
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  flex: 1,
                }}
              >
                {task.text}
              </span>
            )}

            {/* Edit button */}
            {!task.editing && (
              <button
                onClick={() => startEditing(task.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                <FaPencilAlt />
              </button>
            )}

            {/* Delete button */}
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                marginLeft: "8px",
              }}
            >
              <FaTrash color="red" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;