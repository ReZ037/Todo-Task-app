import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import TaskList from "./Task-List";

function App() {
  return (
    <>
      <div className="app-background">
        <Navbar></Navbar>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task-list" element={<TaskList />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
