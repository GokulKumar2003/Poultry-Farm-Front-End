import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/");
  }, [navigate]);
  
}