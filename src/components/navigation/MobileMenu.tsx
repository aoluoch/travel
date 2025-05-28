import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  Home,
  Map,
  Users,
  MessageSquare,
  Compass,
  Hotel,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "../../utils";
import { useAuth, useAppDispatch } from "../../hooks";
import { logout } from "../../store/slices/authSlice";
import Avatar from "../ui/Avatar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      onClose();
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
    { name: "Profile", to: "/profile", icon: User },
    { name: "Settings", to: "/settings", icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div
        ref={menuRef}
        className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 animate-slide-in"
      >
        <div className="absolute top-0 right-0 pt-2 pr-2">
          <button
            onClick={onClose}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-shrink-0 items-center px-4">
          <div className="flex items-center space-x-3">
            <Avatar
              src={user?.profileImage}
              alt={`${user?.firstName} ${user?.lastName}`}
              size="md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-gray-500">{user?.country}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                  onClick={onClose}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn(
                          "mr-4 h-6 w-6 flex-shrink-0",
                          isActive
                            ? "text-primary-600"
                            : "text-gray-500 group-hover:text-gray-600"
                        )}
                      />
                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="border-t border-gray-200 mt-4 pt-4 px-2">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-2 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-4 h-6 w-6 flex-shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
