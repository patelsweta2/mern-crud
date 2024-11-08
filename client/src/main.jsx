import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./provider/AuthProvider.jsx";
import { EmployeeProvider } from "./provider/EmployeeProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </AuthProvider>
);
