import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";
import { clearUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            dispatch(clearUser());
            navigate("/signin");
        }
    };


    return (
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
            <h1 className="font-semibold">Welcome, {user?.name}</h1>

            <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 rounded bg-black text-white hover:bg-gray-800"
            >
                Logout
            </button>
        </header>
    );
}
