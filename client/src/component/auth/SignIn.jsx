import { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../style/SignIn.css";

const SignIn = () => {
  const { login, error } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setPopup("Username and password are required");
      return;
    }

    const success = await login(userName, password);
    if (success) {
      navigate("/");
    } else {
      setPopup(error || "Login failed");
    }
  };
  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login">
            Login
          </button>
        </form>
        {popup && (
          <div className="popup">
            <span>{popup}</span>
            <button onClick={() => setPopup(null)}>Close</button>
          </div>
        )}
        <div className="signin-link">
          Already have an account? <Link to="/signup">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
