import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
    const { user, initialized } = useSelector((state) => state.auth);


    if (!initialized) return null; // wait for auth

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
}

