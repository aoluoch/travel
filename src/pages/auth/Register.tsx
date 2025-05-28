import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Registration logic will be implemented here
      // For now, just simulate a delay and navigate to login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 sm:space-y-8 px-4 sm:px-0">
      <div className="text-center">
        <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      <form
        className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-3 sm:space-y-4 rounded-md shadow-sm">
          <div>
            <Input
              id="username"
              name="username"
              type="text"
              required
              icon={<User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full ${
                errors.username ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <Input
              id="email"
              name="email"
              type="email"
              required
              icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full ${
                errors.email ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              icon={<Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className={`w-full ${
                errors.password ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              icon={<Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="text-sm sm:text-base">
                  Creating Account...
                </span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">Create Account</span>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm">
        <p className="text-gray-600 px-2 sm:px-0">
          By registering, you agree to our{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
