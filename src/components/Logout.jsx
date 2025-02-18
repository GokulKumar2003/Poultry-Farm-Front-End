import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    // Redirect to login page

    navigate("/");
  }, [navigate]);
  
}