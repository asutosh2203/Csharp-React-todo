import { useState } from "react";

const TodoItem = ({ id, title, isCompleted, setTasks, deadline }) => {
  console.log(deadline);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const updateTask = (e) => {
    setIsChecked(e.target.checked);
    console.log("ID - ", id);

    var taskObj = { id, title, isComplete: e.target.checked };

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

  const formatDeadline = () => {
    var formattedDL = "";
    if (deadline) {
      formattedDL =
        new Date(deadline).toLocaleDateString() +
        ", " +
        new Date(deadline).toLocaleTimeString();
    }
    return formattedDL;
  };

  return (
    <div className="border-4 border-white py-8 rounded-2xl">
      <div className="flex items-center justify-around">
        <button
          className="border-2 py-1 p-[0.3rem] border-white rounded-lg"
          onClick={deleteTask}
        >
          ❌
        </button>
        <p className="font-bold">{title && title}</p>
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

      <p className="mt-4">
        {deadline ? (
          <p>
            <span className="font-bold">Deadline: </span>
            {formatDeadline()}
          </p>
        ) : (
          <p>No worries, you got time 😉</p>
        )}
      </p>
    </div>
  );
};

export default TodoItem;
