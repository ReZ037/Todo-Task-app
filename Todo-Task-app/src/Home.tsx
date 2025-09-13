import "./Home.css";
import { Link } from "react-router-dom";
// Function contains the basic description of the app and a button that links to the task list
function Home() {
  return (
    <div>
      <div className="box">
        <div className="Title">Welcome to the Todo App</div>
        <div className="Description">
          Your task management solution. This app will allow you to keep track
          of all your tasks with completion dates. You can add, edit, and delete
          tasks as needed. The app is designed to be simple and easy to use, so
          you can focus on what matters most to you.
        </div>
        <Link to="/Task-List">
          <button className="button">Get Started!</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
