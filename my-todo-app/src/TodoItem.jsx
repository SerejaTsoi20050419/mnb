import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Utility: convert milliseconds -> "created N seconds/minutes ago"
 * Returns a short, human relative string (seconds/minutes/hours/days).
 */
function relativeTime(msSinceEpoch) {
  const diff = Math.max(0, Date.now() - msSinceEpoch);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `created ${sec} second${sec !== 1 ? "s" : ""} ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `created ${min} minute${min !== 1 ? "s" : ""} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `created ${hr} hour${hr !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hr / 24);
  return `created ${days} day${days !== 1 ? "s" : ""} ago`;
}

export default function TodoItem({ todo, onToggle, onRemove, refreshIntervalMs }) {
  // we keep a piece of state used only to trigger re-render on interval
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // choose update frequency: small for recent tasks, longer for older ones
    const id = setInterval(() => setTick((t) => t + 1), refreshIntervalMs);
    return () => clearInterval(id);
  }, [refreshIntervalMs]);

  return (
    <li style={{ display: "flex", gap: 8, alignItems: "center", padding: 8 }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.text} ${todo.done ? "undone" : "done"}`}
      />
      <div style={{ flex: 1 }}>
        <div style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</div>
        <small style={{ color: "#666" }}>{relativeTime(todo.createdAt)}</small>
      </div>
      <button onClick={() => onRemove(todo.id)} aria-label={`Remove ${todo.text}`}>
        ×
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    createdAt: PropTypes.number.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  refreshIntervalMs: PropTypes.number,
};

TodoItem.defaultProps = {
  refreshIntervalMs: 15000, // update every 15s by default (reduces work)
};