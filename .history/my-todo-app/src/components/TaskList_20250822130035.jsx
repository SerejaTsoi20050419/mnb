import React from "react";
import Task from "./Taskюо";

function TaskList({ tasks, filter, toggleTask, deleteTask }) {
  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;