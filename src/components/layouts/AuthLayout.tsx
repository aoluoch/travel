import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Compass } from "lucide-react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Image and Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-500 text-white flex-col justify-between">
        <div className="p-6 lg:p-8">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8" />
            <span className="text-xl font-bold">Travel Buddy</span>
          </Link>
        </div>

        <div
          className="flex-1 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(8, 145, 178, 0.4)",
          }}
        ></div>

        <div className="p-6 lg:p-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            Find Your Perfect Travel Companions
          </h1>
          <p className="text-base lg:text-lg opacity-90">
            Connect with like-minded travelers, plan amazing trips, and create
            unforgettable memories together.
          </p>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-lg p-4 sm:p-6 lg:p-8">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
