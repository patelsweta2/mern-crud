import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await fetch(`${url}/api/users/logout`, {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
      });
      setUser(null);
    } catch (error) {
      setError("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user); // Assuming response contains user data
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};
