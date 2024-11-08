import { useState, createContext } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:8000";

  //fetch All employee
  const getAllEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/employees/`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  //create a new employee
  const createEmployee = async (employeeData) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/employees/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      if (data.success) {
        setEmployees((prev) => [...prev, data.employee]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  //update employee
  const updateEmployee = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.success) {
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
        );
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error updating employee");
    } finally {
      setLoading(false);
    }
  };
  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/deleteEmployee/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error deleting employee");
    } finally {
      setLoading(false);
    }
  };
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        getAllEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
