import TodoItem from "./TodoItem";

const Todo = ({ tasks, setTasks }) => {
  // console.log(tasks);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 mt-8">
      {tasks &&
        tasks.map((taskItem, id) => (
          <TodoItem
            key={taskItem.id}
            id={taskItem.id}
            title={taskItem.title}
            isCompleted={taskItem.isComplete}
            setTasks={setTasks}
            deadline={taskItem.deadline}
          />
        ))}
    </div>
  );
};

export default Todo;
