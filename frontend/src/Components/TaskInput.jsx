import { useState } from "react";

const TaskInput = ({ setTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");

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

  const updateDeadline = (unformatted_deadline) => {
    if (unformatted_deadline !== "") {
      var formatted_deadline = new Date(unformatted_deadline).toISOString();
      return formatted_deadline;
    }
  };

  const addTask = () => {
    if (newTask.length <= 0) return;

    var createdAt = new Date().toISOString();

    var taskObj = {
      id: generateId(),
      title: newTask,
      isComplete: false,
      createdAt,
      deadline: updateDeadline(deadline),
    };

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
        setDeadline("");
      });
  };

  return (
    <div className="">
      <div className="">
        <div>
          <label className="font-bold" htmlFor="newTask">
            New Task
          </label>
          <input
            id="newTask"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
            placeholder="New Task?"
            className="border-2 border-white bg-transparent focus:outline-none focus:bg-white text-white focus:text-black px-5 py-3 rounded-full mx-8 my-2"
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="newTask">
            Deadline?
          </label>
          <input
            id="deadline"
            className="border-2 border-white bg-transparent focus:outline-none focus:bg-white text-white focus:text-black px-5 py-3 rounded-full mx-8 my-2"
            value={deadline}
            type="datetime-local"
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline?"
          />
        </div>
      </div>
      <button
        className="w-64 py-3 px-3 mt-8 border-2 border-white rounded-full bg-pink-500 hover:bg-pink-700 transition-colors font-bold"
        // className="border-2 border-white py-4 px-3 rounded-full bg-pink-500 hover:bg-pink-700 transition-colors font-bold"
        onClick={addTask}
      >
        ADD
      </button>
    </div>
  );
};

export default TaskInput;
