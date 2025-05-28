import { useState } from "react";
import { useAuth } from "../../hooks";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Bell, Lock, Globe, Shield } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const { user } = useAuth();

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
        Settings
      </h1>

      {/* Tabs */}
      <div className="mt-4 sm:mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                group inline-flex items-center py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap
                ${
                  activeTab === id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <Icon
                className={`
                mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5
                ${
                  activeTab === id
                    ? "text-primary-500"
                    : "text-gray-400 group-hover:text-gray-500"
                }
              `}
              />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4 sm:mt-6">
        {activeTab === "notifications" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Notification Preferences
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Receive updates about your trips and matches
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Push Notifications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Get instant updates on your device
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Marketing Communications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Receive travel tips and special offers
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Security Settings
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />

              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
              />

              <Button className="w-full sm:w-auto">Update Password</Button>
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="text-sm font-medium text-gray-900">
                Two-Factor Authentication
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
              <Button
                variant="outline"
                className="mt-3 sm:mt-4 w-full sm:w-auto"
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Travel Preferences
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Currency
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Zone
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base">
                  <option>Pacific Time (PT)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Central European Time (CET)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Privacy Settings
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Profile Visibility
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Control who can see your profile
                  </p>
                </div>
                <select className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base w-full sm:w-auto">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Location Sharing
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Share your location with other travelers
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Activity Status
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Show when you're online
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <Button variant="danger" className="w-full sm:w-auto">
                Delete Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
