import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onRemove, onClearCompleted }) {
  return (
    <section>
      <ul>
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button onClick={onClearCompleted}>Clear completed</button>
      </div>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      createdAt: PropTypes.number.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};