import React from "react";
import {
  Home,
  Calendar,
  Users2,
  BarChart2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Home", icon: <Home className="w-5 h-5" />, to: "/" },
    { name: "Schedule", icon: <Calendar className="w-5 h-5" />, to: "/schedule" },
    { name: "Team", icon: <Users2 className="w-5 h-5" />, to: "/team" },
    { name: "Reports", icon: <BarChart2 className="w-5 h-5" />, to: "/reports" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm p-6 flex flex-col space-y-8">
      <img src="/logos.jpg" alt="Logo" className="w-24 h-24 object-contain" />
      <nav className="space-y-4">
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-100 ${
                isActive ? "bg-blue-100 font-medium text-blue-600" : "text-gray-700"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
