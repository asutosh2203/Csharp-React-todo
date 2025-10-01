import "./App.css";
import { useState, useEffect } from "react";
import Todo from "./Components/Todo";
import TaskInput from "./Components/TaskInput";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="App bg-black h-[100vh] text-white">
      <TaskInput setTasks={setTasks} />
      <Todo tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
