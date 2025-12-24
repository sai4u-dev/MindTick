import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [signIn, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signIn(form).unwrap();
            dispatch(setUser(user)); // OK
            navigate("/dashboard", { replace: true });
        } catch (err) {
            alert(err?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>

                <input
                    className="input"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    className="input mt-3"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button className="btn-primary w-full mt-4" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
