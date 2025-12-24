import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, User } from "lucide-react";

const navItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard size={18} />,
    },
    {
        name: "Tasks",
        path: "/dashboard",
        icon: <CheckSquare size={18} />,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <User size={18} />,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r hidden md:flex flex-col">
            <div className="p-6 text-xl font-bold">
                🧠 MindTick
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-md transition
              ${isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

