import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export function useLogout() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
  
    function logout(): void {
      setAuth(null);
      localStorage.removeItem("auth");
      navigate("/signin");
    }
  
    return logout;
  }