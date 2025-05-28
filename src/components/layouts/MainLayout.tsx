import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../../hooks";
import { loadUser } from "../../store/slices/authSlice";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import Footer from "../navigation/Footer";
import MobileMenu from "../navigation/MobileMenu";
import NotificationsPanel from "../notifications/NotificationsPanel";
import {
  closeMobileMenu,
  closeNotifications,
} from "../../store/slices/uiSlice";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, user } = useAuth();
  const { mobileMenuOpen, notificationsOpen } = useAppSelector(
    (state) => state.ui
  );

  // Load user data on mount if token exists
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleCloseMenu = () => {
    dispatch(closeMobileMenu());
  };

  const handleCloseNotifications = () => {
    dispatch(closeNotifications());
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 relative">
        {/* Fixed Sidebar - Responsive positioning */}
        <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:top-16 lg:z-40 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content with responsive spacing */}
        <main className="flex-1 lg:ml-64 px-3 sm:px-4 md:px-6 py-4 sm:py-6 pb-16 sm:pb-20 lg:pb-6">
          {children || <Outlet />}
        </main>
      </div>

      {/* Footer with responsive positioning */}
      <div className="lg:ml-64">
        <Footer />
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={handleCloseMenu} />

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={notificationsOpen}
        onClose={handleCloseNotifications}
      />
    </div>
  );
};

export default MainLayout;
