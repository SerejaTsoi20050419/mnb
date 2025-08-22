import React, { useState, useCallback } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    // example item shape: { id: 1, text: "Buy milk", done: false, createdAt: 1692710000000 }
  ]);

  const addTodo = useCallback((text) => {
    if (!text || !text.trim()) return;
    const newTodo = {
      id: Date.now(), // simple unique id for demo
      text: text.trim(),
      done: false,
      createdAt: Date.now(), // record creation time here
    };
    setTodos((t) => [newTodo, ...t]);
  }, []);

  const toggleDone = useCallback((id) => {
    setTodos((t) => t.map(item => item.id === id ? { ...item, done: !item.done } : item));
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos((t) => t.filter(item => item.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((t) => t.filter(item => !item.done));
  }, []);

  return (
    <div className="app">
      <h1>Todo</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleDone}
        onRemove={removeTodo}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}