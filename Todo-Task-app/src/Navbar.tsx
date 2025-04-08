import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/Task-List">Task List</Link>
        </li>
      </ul>
      <div className="navbar-title"></div>
      <ul className="navbar-right">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
