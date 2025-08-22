import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onClearCompleted, tick }) {
  const hasCompleted = tasks.some((t) => t.done);

  return (
    <div>
      <ul>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onToggle={onToggle} tick={tick} />
        ))}
      </ul>

      {hasCompleted && (
        <button onClick={onClearCompleted}>Очистить завершенные</button>
      )}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      createdAt: PropTypes.number.isRequired,
    })
  ),
  onToggle: PropTypes.func,
  onClearCompleted: PropTypes.func,
  tick: PropTypes.number, // сам по себе не используется, только триггерит ререндер
};

TaskList.defaultProps = {
  tasks: [],
  onToggle: () => {},
  onClearCompleted: () => {},
  tick: 0,
};