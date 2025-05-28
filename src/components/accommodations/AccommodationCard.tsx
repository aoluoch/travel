import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Users } from "lucide-react";
import { Accommodation } from "../../types";
import { formatCurrency } from "../../utils";
import Card, { CardContent } from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/accommodations/${accommodation.id}`);
  };

  const getTypeColor = () => {
    switch (accommodation.type) {
      case "hotel":
        return "primary";
      case "hostel":
        return "secondary";
      case "apartment":
        return "accent";
      case "guesthouse":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Card
      hoverable
      className="h-full transition-transform hover:translate-y-[-4px]"
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <img
          src={accommodation.images[0]}
          alt={accommodation.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={getTypeColor()} className="text-xs sm:text-sm">
            {accommodation.type.charAt(0).toUpperCase() +
              accommodation.type.slice(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
            {accommodation.name}
          </h3>

          <div className="flex items-center flex-shrink-0">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-warning-400 fill-warning-400" />
            <span className="ml-1 text-xs sm:text-sm font-medium text-gray-900">
              {accommodation.rating}
            </span>
            <span className="ml-1 text-xs text-gray-500">
              ({accommodation.reviewCount})
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center text-gray-600">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary-500 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">
            {accommodation.location}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {accommodation.amenities.slice(0, 3).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {amenity}
              </Badge>
            ))}
            {accommodation.amenities.length > 3 && (
              <Badge variant="outline" size="sm" className="text-xs">
                +{accommodation.amenities.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-base sm:text-lg font-semibold text-gray-900">
              {formatCurrency(accommodation.pricePerNight)}
            </p>
            <p className="text-xs text-gray-500">per night</p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleView}
            className="text-xs sm:text-sm w-full sm:w-auto"
          >
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">View</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;
