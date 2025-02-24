import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthListener = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log("storage event triggered");
            console.log("🔹 Storage event detected:", event);

            if (event.key === "isLoggedIn") {
                console.log("🔸 isLoggedIn changed:", event.newValue);
                
                if (event.newValue === "false") {
                    console.log("🚨 Logging out from another tab...");
                    navigate("/");
                }
            }
        };

        // Listen for changes in localStorage
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [navigate]);

    return null; // This component does not render anything
};

export default AuthListener;
