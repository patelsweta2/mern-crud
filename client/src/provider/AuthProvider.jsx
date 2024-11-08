import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  //check if user data exists in localstorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (userName, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();
      console.log("login response:", data);

      if (data.message === "Login successful") {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return true;
      } else {
        setError(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.log("error--", error);
      setError("Something went wrong");
      return false;
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
      localStorage.removeItem("user");
    } catch (error) {
      console.log("error--", error);
      setError("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userDetails) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/users/signup`, {
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
      console.log("error :", error);
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
