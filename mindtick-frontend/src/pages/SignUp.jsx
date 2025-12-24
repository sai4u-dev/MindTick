import { useState } from "react";
import { useSignupMutation } from "../features/auth/authApi";
import Toast from "../components/ui/Toast";

export default function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [signUp, { isLoading }] = useSignupMutation();
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(form).unwrap();
        setShowToast(true);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center">
                        Create an Account
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6  space-y-4">
                        <input
                            className="input"
                            placeholder="Full Name"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                        <input
                            className="input"
                            placeholder="Email"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />

                        <button
                            className="btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast */}
            <Toast
                show={showToast}
                message="Account created successfully!"
                onClose={() => setShowToast(false)}
            />
        </>
    );
}