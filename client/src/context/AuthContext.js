import { createContext, useContext } from "react";

//creating context
const AuthContext = createContext();

//custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
