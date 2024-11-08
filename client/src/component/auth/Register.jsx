import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import "../style/Register.css";

const Register = () => {
  const { signup, error } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (error) {
      setPopup(error);
    }
  }, [error]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(userDetails);
  };
  return (
    <div className="container">
      <div className="signup-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              name="userName"
              value={userDetails.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email ID:</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signin">
            Register
          </button>
        </form>
        {popup && (
          <div className="popup">
            <span>{popup}</span>
            <button onClick={() => setPopup(null)}>Close</button>
          </div>
        )}
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
