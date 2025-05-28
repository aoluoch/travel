import { useState } from "react";
import { useAuth } from "../../hooks";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { User, MapPin, Globe, Heart } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    country: user?.country || "",
    interests: user?.interests || [],
    languages: user?.languages || [],
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save profile changes
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
      country: user?.country || "",
      interests: user?.interests || [],
      languages: user?.languages || [],
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 sm:h-48 bg-gradient-to-r from-primary-500 to-secondary-500" />

        {/* Profile Info */}
        <div className="relative px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Profile Image */}
          <div className="absolute -top-12 sm:-top-16 left-4 sm:left-6">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary-100">
                  <User className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-3 sm:pt-4">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span className="text-sm sm:text-base">Saving...</span>
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base">Save Changes</span>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </Button>
            )}
          </div>

          {/* Profile Content */}
          <div className="mt-6 sm:mt-8">
            {isEditing ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    icon={
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    }
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    icon={
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us about yourself..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm sm:text-base resize-none"
                  />
                  <div className="mt-1 text-right">
                    <span className="text-xs text-gray-500">
                      {formData.bio.length}/500 characters
                    </span>
                  </div>
                </div>

                <Input
                  label="Country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  icon={
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  }
                />
              </div>
            ) : (
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>

                <div className="mt-3 sm:mt-4 flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base">
                    {user?.country || "Location not specified"}
                  </span>
                </div>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {user?.bio || "No bio available. Edit your profile to add a bio!"}
                </p>

                <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Languages
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                      {user?.languages && user.languages.length > 0 ? (
                        user.languages.map((language) => (
                          <span
                            key={language}
                            className="px-2 sm:px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs sm:text-sm"
                          >
                            {language}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-500 italic">
                          No languages added yet
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Interests
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                      {user?.interests && user.interests.length > 0 ? (
                        user.interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-2 sm:px-3 py-1 rounded-full bg-secondary-100 text-secondary-800 text-xs sm:text-sm"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-500 italic">
                          No interests added yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip History */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Trip History
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
          <div className="text-gray-400 mb-3">
            <MapPin className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No trips yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4">
            Your travel adventures will appear here once you start exploring!
          </p>
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            onClick={() => window.location.href = '/trips/create'}
          >
            Plan Your First Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
