import "./Home.css";

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
        <button className="button">Get Started!</button>
      </div>
    </div>
  );
}

export default Home;
