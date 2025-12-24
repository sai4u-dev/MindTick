import { useEffect } from "react";

export default function Toast({ message, show, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${show
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
                }`}
        >
            <div className="bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
                {message}
            </div>
        </div>
    );
}
