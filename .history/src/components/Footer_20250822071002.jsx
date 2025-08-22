import TasksFilter from "./TasksFilter";

function Footer({ tasks }) {
  const leftCount = tasks.filter((t) => !t.completed).length;

  return (
    <footer>
      <span>{leftCount} задач осталось</span>
      <TasksFilter />
      <button>Очистить выполненные</button>
    </footer>
  );
}

export default Footer;