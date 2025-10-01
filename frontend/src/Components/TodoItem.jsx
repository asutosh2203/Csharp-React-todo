import { useState } from "react";

const TodoItem = ({ id, title, isCompleted, setTasks }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const updateTask = (e) => {
    setIsChecked(e.target.checked);
    console.log("ID - ", id);

    var taskObj = {id, title, isComplete: e.target.checked };

    console.log(taskObj);

    fetch("http://localhost:5001/api/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}.`);
        }

        return response.json();
      })
      .catch((error) => {
        console.log("Sorry, couldn't update task. Error occured: " + error);
        setIsChecked(isCompleted);
      });
  };

  const deleteTask = () => {
    fetch("http://localhost:5001/api/tasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}.`);
        }

        fetch("http://localhost:5001/api/tasks/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}.`);
            }

            return response.json();
          })
          .then((data) => setTasks(data));
      })
      .catch((error) => {
        console.log("Sorry, couldn't delete task. Error occured: " + error);
        setIsChecked(isCompleted);
      });
  };

  return (
    <div className="border-4 border-white flex items-center justify-around h-32">
      <button onClick={deleteTask}>❌</button>
      <div className="">
        <p className="font-bold">{title && title}</p>
        {/* <p>{isCompleted ? "Done" : "Yet to be done"}</p> */}
      </div>
      <input
        className="w-5 h-5 rounded-md border-gray-300 text-blue-600 
             focus:ring-2 focus:ring-blue-500 cursor-pointer 
             hover:border-blue-400 transition"
        checked={isChecked}
        type="checkbox"
        name="isComplete"
        id="isComplete"
        onChange={(e) => {
          updateTask(e);
        }}
      />
    </div>
  );
};

export default TodoItem;
