import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
    const { user, initialized } = useSelector((state) => state.auth);

    if (!initialized) return null;

    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
