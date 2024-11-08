import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style/NavBar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleAddEmployeeClick = () => {
    navigate("/add-employee");
  };

  const handleLogoutClick = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <Link to="/" className="navbar-home-link">
          Employee List
        </Link>
      </div>
      {user ? (
        <div className="after-login">
          <button
            className="navbar-button add-employee-button"
            onClick={handleAddEmployeeClick}
          >
            <FaUserPlus className="icon" />
            Add Employee
          </button>
          <div className="navbar-user">Welcome, {user.userName}</div>
          <button
            className="navbar-button logout-button"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="navbar-button login-button"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
