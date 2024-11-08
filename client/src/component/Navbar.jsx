import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaUserPlus } from "react-icons/fa";
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
      <div className="navbar-title">Employee List</div>
      {user ? (
        <>
          <button
            className="navbar-button add-employee-button"
            onClick={handleAddEmployeeClick}
          >
            <FaUserPlus className="icon" />
            Add Employee
          </button>
          <div className="navbar-user">Welcome, {user.userName}</div>
          <button
            className="navbar-button login-button"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </>
      ) : (
        <button className="navbar-button" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
