import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, MapPin, Globe, Languages, Heart } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    country: user?.country || '',
    interests: user?.interests || [],
    languages: user?.languages || [],
  });

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500" />

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Profile Image */}
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src={user?.profileImage}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            {isEditing ? (
              <div className="space-x-3">
                <Button variant="outline\" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Content */}
          <div className="mt-8">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <Input
                  label="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h1>

                <div className="mt-4 flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{user?.country}</span>
                </div>

                <p className="mt-4 text-gray-600">{user?.bio}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Languages
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user?.languages?.map((language) => (
                        <span
                          key={language}
                          className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Interests
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {user?.interests?.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 rounded-full bg-secondary-100 text-secondary-800 text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip History */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Trip History</h2>
        {/* Add trip history component here */}
      </div>
    </div>
  );
};

export default Profile;