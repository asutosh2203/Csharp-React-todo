import { useState } from "react";

const TaskInput = ({ setTasks }) => {
  const [newTask, setNewTask] = useState("");

  function generateId() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    let randomLetters = "";
    for (let i = 0; i < 5; i++) {
      randomLetters += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }

    let randomNumbers = "";
    for (let i = 0; i < 5; i++) {
      randomNumbers += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }

    return `${randomLetters}-${randomNumbers}`;
  }

  const addTask = () => {
    if (newTask.length <= 0) return;

    var taskObj = { id: generateId(), title: newTask, isComplete: false };

    fetch("http://localhost:5001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}. New task could not be added.`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log("Successfully added: ", data);
        setTasks((prev) => [...prev, taskObj]);
      })
      .catch((error) => {
        console.log("Operation failed: ", error);
      })
      .finally(() => {
        setNewTask("");
      });
  };

  return (
    <div>
      <input
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
        placeholder="New Task?"
        className="border-2 border-white bg-transparent focus:outline-none focus:bg-white text-black px-5 py-3 rounded-full m-8"
      />
      <button
        className="border-2 border-white py-4 px-3 rounded-full bg-pink-500 hover:bg-pink-700 transition-colors font-bold"
        onClick={addTask}
      >
        ADD
      </button>
    </div>
  );
};

export default TaskInput;
