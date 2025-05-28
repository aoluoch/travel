import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../store/slices/authSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card, { CardContent } from "../../components/ui/Card";
import { Mail, Lock, User, Info } from "lucide-react";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Demo accounts for testing
  const demoAccounts = [
    {
      email: "alex@example.com",
      name: "Alex Johnson",
      role: "Adventure Traveler",
    },
    {
      email: "sophia@example.com",
      name: "Sophia Wilson",
      role: "Travel Blogger",
    },
    {
      email: "marco@example.com",
      name: "Marco Torres",
      role: "Budget Backpacker",
    },
    { email: "emma@example.com", name: "Emma Wilson", role: "Food Enthusiast" },
    {
      email: "david@example.com",
      name: "David Kim",
      role: "Cultural Explorer",
    },
    { email: "amara@example.com", name: "Amara Kimani", role: "Safari Guide" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleDemoLogin = async (email: string) => {
    setFormData({ email, password: "password" });

    try {
      await dispatch(login({ email, password: "password" })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Demo login failed:", error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back!
        </h2>
        <p className="mt-2 text-xs sm:text-sm lg:text-base text-gray-600">
          Please sign in to your Travel Buddy account
        </p>
      </div>

      {/* Demo Accounts Section */}
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
              Demo Accounts
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Try out Travel Buddy with these demo accounts. All passwords are
            "password".
          </p>

          {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleDemoLogin(account.email)}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                disabled={loading}
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {account.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {account.role}
                  </div>
                  <div className="text-xs text-gray-400 truncate sm:hidden">
                    {account.email}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Login Hint for Mobile */}
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg sm:hidden">
            <p className="text-xs text-blue-700">
              💡 Tip: Tap any demo account to login instantly
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Manual Login Form */}
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Or sign in manually
          </h3>

          {error && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs sm:text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <Input
              label="Email"
              type="email"
              icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              required
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs sm:text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-xs sm:text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </Link>
            </div>

            <Button type="submit" fullWidth isLoading={loading}>
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Sign up for Travel Buddy
        </Link>
      </p>
    </div>
  );
};

export default Login;
