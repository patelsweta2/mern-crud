import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

//custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
