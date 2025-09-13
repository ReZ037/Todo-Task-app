import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Task-Edit.css";

interface Task {
  taskid: number;
  taskname: string;
  taskdescription: string;
  taskdate: string;
}

export default function TaskEdit() {
  // retrieve task id passed in
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/items/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  // Will update task with new details
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const res = await fetch(`http://127.0.0.1:8000/items/${task.taskid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskid: task.taskid,
        taskname: task.taskname,
        taskdescription: task.taskdescription,
        taskdate: task.taskdate,
      }),
    });

    if (res.ok) {
      navigate("/");
    } else {
      console.error("Failed to update task");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="task-edit-container">
      <h1>Edit Task</h1>
      {task && (
        <form onSubmit={handleSubmit} className="task-edit-form">
          <input
            type="text"
            value={task.taskname}
            onChange={(e) => setTask({ ...task, taskname: e.target.value })}
          />
          <textarea
            value={task.taskdescription}
            onChange={(e) =>
              setTask({ ...task, taskdescription: e.target.value })
            }
          />
          <input
            type="date"
            value={task.taskdate}
            onChange={(e) => setTask({ ...task, taskdate: e.target.value })}
          />

          <div className="task-edit-buttons">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
