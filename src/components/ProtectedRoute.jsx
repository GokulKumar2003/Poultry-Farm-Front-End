import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Ensure it's a boolean

    return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
