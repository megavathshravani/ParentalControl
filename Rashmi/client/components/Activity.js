import React, { useState } from "react";
import ReactConfetti from "react-confetti"; // Import react-confetti for confetti effect
import "./Activity.css";


const Activity = () => {
  const [toDos, setToDos] = useState([]); // State to store tasks
  const [toDo, setToDo] = useState("");   // State to bind with input field
  const [filter, setFilter] = useState("all");  // State to filter tasks
  const [congratulationsVisible, setCongratulationsVisible] = useState(false);

  // Function to add new task
  const addTask = () => {
    if (toDo.trim()) {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo(""); // Clear the input field after adding
    }
  };

  // Function to toggle task completion status
  const toggleTaskStatus = (id) => {
    const updatedToDos = toDos.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setToDos(updatedToDos);

    // Show congratulations message if the task is completed
    const task = updatedToDos.find((task) => task.id === id);
    if (task.status === true) {
      setCongratulationsVisible(true);

      // Hide the congratulations message after 3 seconds
      setTimeout(() => {
        setCongratulationsVisible(false);
      }, 3000); // 3000ms = 3 seconds
    } else {
      setCongratulationsVisible(false);
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setToDos(toDos.filter((task) => task.id !== id));
  };

  // Filter tasks based on active/completed/all
  const filteredToDos = toDos.filter((task) => {
    if (filter === "completed") return task.status;
    if (filter === "active") return !task.status;
    return true;
  });

  return (
    <div className="activityList">
      <div className="mainHeading">
        <h1>Activity List</h1>
      </div>
      <div className="subHeading">
        <h2>Your tasks for today</h2>
      </div>
      <div className="inputContainer">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)} // Update toDo state on input change
          type="text"
          placeholder="🖊️ Add item..."
        />
        <button onClick={addTask} className="addButton">
          Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filterOptions">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      {/* Congratulations Message */}
      <div
        className={`congratulations-message ${
          congratulationsVisible ? "show-congratulations" : ""
        }`}
      >
        🎉 Congratulations! Task Completed! 🎉
      </div>

      {/* Confetti Animation */}
      {congratulationsVisible && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={150}
          recycle={false}
        />
      )}

      {/* Task List */}
      <div className="todos">
        {filteredToDos.map((task) => (
          <div
            key={task.id}
            className={'todo ${task.status ? "completed" : ""}'}
          >
            <div className="left">
              <input
                type="checkbox"
                checked={task.status}
                onChange={() => toggleTaskStatus(task.id)}
              />
              <p>{task.text}</p>
            </div>
            <div className="right">
              <button
                onClick={() => deleteTask(task.id)}
                className="deleteButton"
              >
                ✖️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
