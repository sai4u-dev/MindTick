import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomeRedirect() {
    const { user, initialized } = useSelector((state) => state.auth);

    if (!initialized) return null;

    return user
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/signin" replace />;
}
