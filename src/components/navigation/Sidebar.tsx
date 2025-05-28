import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Map,
  Users,
  MessageSquare,
  Compass,
  Hotel,
  User,
  Settings,
  Shield,
  Star,
  Handshake,
  LogOut,
} from "lucide-react";
import { cn } from "../../utils";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../store/slices/authSlice";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: Home },
    { name: "Trips", to: "/trips", icon: Map },
    { name: "Matches", to: "/matches", icon: Users },
    { name: "Messages", to: "/chats", icon: MessageSquare },
    { name: "Explore", to: "/explore", icon: Compass },
    { name: "Accommodations", to: "/accommodations", icon: Hotel },
    { name: "Safety", to: "/safety", icon: Shield },
    { name: "Reviews", to: "/reviews", icon: Star },
    { name: "Partnerships", to: "/partnerships", icon: Handshake },
    { name: "Profile", to: "/profile", icon: User },
    { name: "Settings", to: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white shadow-lg">
      {/* Sidebar Header */}
      <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Navigation
        </h2>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <div className="flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                    isActive
                      ? "bg-primary-100 text-primary-700 border-l-4 border-primary-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200",
                        isActive
                          ? "text-primary-600"
                          : "text-gray-500 group-hover:text-gray-600"
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className="flex-shrink-0 px-2 pb-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">Travel Buddy v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
