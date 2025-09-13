import "./Task-List.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Our type for tasks
type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

// Basic Test tasks used for testing without backend running
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Finish Vite project",
    description: "Have you completed the Vite project?",
    completed: false,
  },
  {
    id: 2,
    title: "Write unit tests",
    description: "Have you completed the unit tests?",
    completed: false,
  },
  {
    id: 3,
    title: "Push to GitHub",
    description: "You need to push to github!",
    completed: true,
  },
];

// Pulls list of tasks from the database and displays to the screen
function TaskListPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  // Full list of tasks in the middle of screen and handles if someone clicks on one
  const ListofTasks = tasks.map((task) => (
    <li key={task.taskid}>
      <div onClick={() => handleClick(task)}>
        <div className="title">{task.taskname}</div>
        <div className="description">{task.taskdescription}</div>
        <div className="completed">{task.taskdate}</div>
      </div>
    </li>
  ));

  // Logic for handling the sumbit button of adding tasks
  const handleSubmit = async () => {
    // Create payload
    const payload = {
      taskname: title,
      taskdescription: desc,
      // This line takes a JavaScript Date and converts it into a YYYY-MM-DD string (? is an if else operator)
      taskdate: startDate ? startDate.toISOString().split("T")[0] : null,
    };

    console.log("Sending payload:", payload);
    // Send payload to our backend
    try {
      const response = await fetch("http://127.0.0.1:8000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("FastAPI validation error:", errorDetails);
        throw new Error("Failed to create task");
      }
      // Output created tasks to console and update tasks in the center of page
      const data = await response.json();
      console.log("Task created:", data);
      // Reset our input fields
      setTitle("");
      setDesc("");
      const tasksfetch = await fetch("http://127.0.0.1:8000");
      const updatedTasks = await tasksfetch.json();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Delete logic for the delete button
  const handleDelete = async (taskid: number) => {
    // Pop up window asking user to confirm deletion of task
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    // Send API request for deletion
    const res = await fetch(`http://127.0.0.1:8000/items/${taskid}`, {
      method: "DELETE",
    });
    // If deletion is successful refresh task list on the page without our deleted task
    if (res.ok) {
      setTasks(tasks.filter((task) => task.taskid !== taskid));
    } else {
      console.error("Failed to delete task");
    }
  };
  // Update the task show in task details section based on task clicked
  const handleClick = (task) => {
    console.log("clicked!!");
    setcurrentTitle(task.taskname);
    setcurrentDescription(task.taskdescription);
    setcurrentDate(task.taskdate);
    setcurrentID(task.taskid);
  };
  // Logic for keeping track of most recently clicked task
  const [currentTitle, setcurrentTitle] = useState("Template Title");
  const [currentDescription, setcurrentDescription] = useState(
    "Template Description"
  );
  const [currentDate, setcurrentDate] = useState("Template Date");
  const [currentID, setcurrentID] = useState(1);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="task-list-container">
      <div className="NewTaskEntry">
        <input
          type="text"
          placeholder="New Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Task Desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          placeholderText="Select a date"
          dateFormat="MM/dd/yyyy"
        />
        <button className="button-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="task-list">
        <h1>Your Task List</h1>
        <ul>{}</ul>
        <ul>{ListofTasks}</ul>
      </div>
      <div className="task-details">
        <h2>Task Details</h2>
        <div className="task-details-title">{currentTitle}</div>
        <div className="task-details-description">{currentDescription}</div>
        <div className="task-details-date">{currentDate}</div>
        <Link to={`/edit/${currentID}`} className="button-edit">
          Edit
        </Link>
        <button
          onClick={() => handleDelete(currentID)}
          className="button-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskListPage;
