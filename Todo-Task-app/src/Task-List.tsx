import "./Task-List.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

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

function TaskListPage() {
  const ListofTasks = initialTasks.map((Task) => (
    <li>
      <div onClick={() => handleClick(Task)}>
        <div className="title">{Task.title}</div>
        <div className="description">{Task.description}</div>
        <div className="completed">{Task.completed}</div>
      </div>
    </li>
  ));

  const handleClick = (task: Task) => {
    //alert(`You clicked: ${task.title}`);
    setcurrentTitle(task.title);
    setcurrentDescription(task.description);
    // Or do something more complex like opening a modal or toggling state
  };
  const [currentTitle, setcurrentTitle] = useState("Template Title");
  const [currentDescription, setcurrentDescription] = useState(
    "Template Description"
  );
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="task-list-container">
      <div className="NewTaskEntry">
        <input type="Name" placeholder="New Task Title"></input>
        <input type="Name" placeholder="New Task Desc"></input>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          placeholderText="Select a date"
          dateFormat="MM/dd/yyyy"
        />
        <button className="button">Submit</button>
      </div>
      <div className="task-list">
        <h1>Your Task List</h1>
        <ul>{ListofTasks}</ul>
      </div>
      <div className="task-details">
        <h2>Task Details</h2>
        <div className="task-details-title">{currentTitle}</div>
        <div className="task-details-description">{currentDescription}</div>
      </div>
    </div>
  );
}

export default TaskListPage;
