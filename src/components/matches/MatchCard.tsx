import React from "react";
import { User, Match } from "../../types";
import { MapPin, Heart, X } from "lucide-react";
import Card, { CardContent } from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

interface MatchCardProps {
  match: Match;
  user: User;
  onAccept?: (matchId: number) => void;
  onReject?: (matchId: number) => void;
  onViewProfile?: (userId: number) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  user,
  onAccept,
  onReject,
  onViewProfile,
}) => {
  const handleAccept = () => {
    if (onAccept) onAccept(match.id);
  };

  const handleReject = () => {
    if (onReject) onReject(match.id);
  };

  const handleViewProfile = () => {
    if (onViewProfile) onViewProfile(user.id);
  };

  return (
    <Card hoverable className="h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={user.profileImage}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={
              match.status === "accepted"
                ? "success"
                : match.status === "pending"
                ? "warning"
                : "error"
            }
          >
            {match.status === "accepted"
              ? "Matched"
              : match.status === "pending"
              ? "Pending"
              : "Rejected"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </h3>

          <Badge variant="primary">{match.compatibilityScore}% Match</Badge>
        </div>

        <div className="mt-2 flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1 text-primary-500" />
          <span className="text-sm">{user.country}</span>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {(user.interests || []).slice(0, 3).map((interest, index) => (
              <Badge key={index} variant="outline" size="sm">
                {interest}
              </Badge>
            ))}
            {(user.interests || []).length > 3 && (
              <Badge variant="outline" size="sm">
                +{(user.interests || []).length - 3}
              </Badge>
            )}
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          {user.bio.length > 100
            ? `${user.bio.substring(0, 100)}...`
            : user.bio}
        </p>

        <div className="mt-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProfile}
            fullWidth
          >
            View Profile
          </Button>

          {match.status === "pending" && (
            <div className="flex space-x-2">
              <Button
                variant="danger"
                size="sm"
                onClick={handleReject}
                leftIcon={<X className="h-4 w-4" />}
                className="flex-1"
              >
                Decline
              </Button>

              <Button
                variant="success"
                size="sm"
                onClick={handleAccept}
                leftIcon={<Heart className="h-4 w-4" />}
                className="flex-1"
              >
                Accept
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
