import { useContext } from "react";
import { EmployeeContext } from "../provider/EmployeeProvider";

// Custom hook to use EmployeeContext
export const useEmployees = () => {
  return useContext(EmployeeContext);
};
