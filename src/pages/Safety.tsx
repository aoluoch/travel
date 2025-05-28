import { useState } from "react";
import {
  Shield,
  Check,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card, { CardContent } from "../components/ui/Card";
import Input from "../components/ui/Input";

const Safety = () => {
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });
  const [checkInStatus, setCheckInStatus] = useState<"safe" | "help" | null>(
    null
  );

  const handleEmergencyCheckIn = (status: "safe" | "help") => {
    setCheckInStatus(status);
    // In a real app, this would send the status to backend/emergency services
    console.log(`Emergency check-in: ${status}`);
  };

  const safetyFeatures = [
    {
      icon: Shield,
      title: "Profile Verification",
      description: "Verify your identity with government ID to increase trust",
      status: "incomplete",
      action: "Verify Now",
    },
    {
      icon: Phone,
      title: "Emergency Contacts",
      description: "Add trusted contacts for emergency situations",
      status: "incomplete",
      action: "Add Contact",
    },
    {
      icon: MapPin,
      title: "Location Sharing",
      description: "Share your location with trusted contacts during trips",
      status: "enabled",
      action: "Manage",
    },
    {
      icon: Users,
      title: "Traveler Reviews",
      description: "View and leave reviews for fellow travelers",
      status: "enabled",
      action: "View Reviews",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Shield className="w-8 h-8 mr-3 text-primary-600" />
          Safety Center
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your safety is our priority. Manage your safety settings, emergency
          contacts, and access help when you need it.
        </p>
      </div>

      {/* Emergency Check-in */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Emergency Check-in
              </h2>
              <p className="text-gray-600">
                Let us know you're safe during your travels
              </p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>

          {checkInStatus ? (
            <div
              className={`p-4 rounded-lg border-2 ${
                checkInStatus === "safe"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center">
                {checkInStatus === "safe" ? (
                  <>
                    <Check className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold text-green-800">
                        Check-in Successful
                      </p>
                      <p className="text-green-700">
                        Emergency contacts have been notified that you're safe.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    <div>
                      <p className="font-semibold text-red-800">
                        Help Request Sent
                      </p>
                      <p className="text-red-700">
                        Emergency services and contacts have been notified.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                onClick={() => handleEmergencyCheckIn("safe")}
                variant="primary"
                className="flex-1"
                leftIcon={<Check className="w-5 h-5" />}
              >
                I'm Safe
              </Button>
              <Button
                onClick={() => handleEmergencyCheckIn("help")}
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                leftIcon={<AlertTriangle className="w-5 h-5" />}
              >
                I Need Help
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Features */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Safety Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyFeatures.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <feature.icon className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      feature.status === "enabled"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {feature.status === "enabled"
                      ? "Enabled"
                      : "Setup Required"}
                  </div>
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  {feature.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contact Form */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Add Emergency Contact
          </h2>
          <div className="space-y-4">
            <Input
              label="Contact Name"
              value={emergencyContact.name}
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  name: e.target.value,
                })
              }
              placeholder="Enter full name"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={emergencyContact.phone}
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  phone: e.target.value,
                })
              }
              placeholder="Enter phone number"
            />
            <Input
              label="Relationship"
              value={emergencyContact.relationship}
              onChange={(e) =>
                setEmergencyContact({
                  ...emergencyContact,
                  relationship: e.target.value,
                })
              }
              placeholder="e.g., Parent, Spouse, Friend"
            />
            <Button variant="primary" className="w-full">
              Save Emergency Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Safety Tips
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Meet in Public Places
                </p>
                <p className="text-gray-600 text-sm">
                  Always meet new travel companions in public areas before
                  traveling together.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Share Your Itinerary
                </p>
                <p className="text-gray-600 text-sm">
                  Keep friends and family informed about your travel plans and
                  schedule regular check-ins.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Trust Your Instincts
                </p>
                <p className="text-gray-600 text-sm">
                  If something doesn't feel right, trust your gut and prioritize
                  your safety.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  Verify Fellow Travelers
                </p>
                <p className="text-gray-600 text-sm">
                  Check profiles, read reviews, and verify identity before
                  committing to travel together.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Safety;
