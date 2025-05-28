import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Bell, Lock, Globe, Shield } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingCommunications: false,
    locationSharing: true,
    activityStatus: true,
    profileVisibility: "public",
    currency: "USD",
    language: "English",
    timezone: "Pacific Time (PT)",
  });

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Settings saved successfully
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Notification Preferences
              </h2>
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="w-full sm:w-auto text-sm"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Receive updates about your trips and matches
                  </p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 sm:hidden">
                    {settings.emailNotifications ? "On" : "Off"}
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Push Notifications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Get instant updates on your device
                  </p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      handleSettingChange("pushNotifications", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 sm:hidden">
                    {settings.pushNotifications ? "On" : "Off"}
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Marketing Communications
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Receive travel tips and special offers
                  </p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.marketingCommunications}
                    onChange={(e) =>
                      handleSettingChange(
                        "marketingCommunications",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 sm:hidden">
                    {settings.marketingCommunications ? "On" : "Off"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              Security Settings
            </h2>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Change Password
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />

                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password (min 8 characters)"
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                />

                <Button className="w-full sm:w-auto" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Two-Factor Authentication
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Add an extra layer of security to your account by requiring a
                verification code
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="w-full sm:w-auto">
                  Enable 2FA
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-xs sm:text-sm"
                >
                  Download Backup Codes
                </Button>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-sm font-medium text-red-900 mb-2">
                Account Sessions
              </h3>
              <p className="text-xs sm:text-sm text-red-700 mb-4">
                Sign out of all devices except this one
              </p>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-red-300 text-red-700 hover:bg-red-100"
              >
                Sign Out All Devices
              </Button>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Travel Preferences
              </h2>
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="w-full sm:w-auto text-sm"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      handleSettingChange("currency", e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange("language", e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Italian">Italian</option>
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      handleSettingChange("timezone", e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                  >
                    <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                    <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                    <option value="Central European Time (CET)">
                      Central European Time (CET)
                    </option>
                    <option value="Greenwich Mean Time (GMT)">
                      Greenwich Mean Time (GMT)
                    </option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  Travel Style Preferences
                </h3>
                <p className="text-xs sm:text-sm text-blue-700 mb-3">
                  Help us recommend better matches and accommodations
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Budget",
                    "Luxury",
                    "Adventure",
                    "Cultural",
                    "Relaxation",
                    "Business",
                  ].map((style) => (
                    <label key={style} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-3 w-3 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs text-blue-800">
                        {style}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">
                Privacy Settings
              </h2>
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="w-full sm:w-auto text-sm"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Profile Visibility
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Control who can see your profile
                  </p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) =>
                    handleSettingChange("profileVisibility", e.target.value)
                  }
                  className="w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Location Sharing
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Share your location with other travelers
                  </p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.locationSharing}
                    onChange={(e) =>
                      handleSettingChange("locationSharing", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 sm:hidden">
                    {settings.locationSharing ? "On" : "Off"}
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    Activity Status
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Show when you're online
                  </p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.activityStatus}
                    onChange={(e) =>
                      handleSettingChange("activityStatus", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 sm:hidden">
                    {settings.activityStatus ? "On" : "Off"}
                  </span>
                </label>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-sm font-medium text-amber-900 mb-2">
                  Data Management
                </h3>
                <p className="text-xs sm:text-sm text-amber-700 mb-4">
                  Manage your personal data and download a copy of your
                  information
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Request Data Deletion
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8">
              <h3 className="text-sm font-medium text-red-900 mb-2">
                Danger Zone
              </h3>
              <p className="text-xs sm:text-sm text-red-700 mb-4">
                This action cannot be undone. This will permanently delete your
                account and all associated data.
              </p>
              <Button
                variant="danger"
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
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
