import React from "react";
import {
  FaChartBar,
  FaCog,
  FaHome,
  FaBed,
  FaUsers,
  FaDoorOpen,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onSectionSelect,
  activeSection,
}) {
  const menuItems = [
    { key: "dashboard", name: "Dashboard", icon: <FaHome /> },
    { key: "booking", name: "Bookings", icon: <FaBed /> },
    { key: "rooms", name: "Rooms", icon: <FaBed /> },
    { key: "customers", name: "Customers", icon: <FaUsers /> },
    { key: "reports", name: "Reports", icon: <FaChartBar /> },

  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 pt-32 shadow-md flex flex-col transition-all duration-300
      ${sidebarOpen ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        {sidebarOpen && (
          <h1 className="text-2xl font-extrabold text-indigo-600 tracking-wide">
            Stayelo Admin
          </h1>
        )}
        <button
          className="text-gray-600 hover:text-indigo-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2 mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSectionSelect(item.key)}
            className={`flex items-center w-full gap-3 p-2 rounded font-medium transition-all duration-200 
              ${
                activeSection === item.key
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              }
              ${!sidebarOpen && "justify-center"}`}
          >
            <span className="text-lg">{item.icon}</span>
            {sidebarOpen && <span>{item.name}</span>}
          </button>
        ))}
      </div>

      {/* Footer (hidden when collapsed) */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col items-center gap-2">
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-xs text-gray-500">admin@hotel.com</p>
          <button
            className="w-full bg-red-500 text-white py-1.5 rounded-lg hover:bg-red-600 transition text-sm flex justify-center items-center gap-2"
            onClick={handleLogout}
          >
            <FaDoorOpen size={14} /> Logout
          </button>
        </div>
      )}
    </aside>
  );
}
