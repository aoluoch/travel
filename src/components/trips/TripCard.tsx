import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Trip, User } from '../../types';
import { useDateFormat } from '../../hooks';
import { truncateText } from '../../utils';
import Card, { CardContent } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface TripCardProps {
  trip: Trip;
  creator?: User;
  participants?: User[];
  compact?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({
  trip,
  creator,
  participants = [],
  compact = false,
}) => {
  const navigate = useNavigate();
  const { formatDateRange } = useDateFormat();
  
  const handleViewTrip = () => {
    navigate(`/trips/${trip.id}`);
  };
  
  const getStatusBadge = () => {
    switch (trip.status) {
      case 'planning':
        return <Badge variant="primary">Planning</Badge>;
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card
      className={`h-full transition-transform hover:translate-y-[-4px] ${compact ? '' : 'overflow-hidden'}`}
      hoverable
    >
      {!compact && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={trip.image}
            alt={trip.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {getStatusBadge()}
          </div>
        </div>
      )}
      
      <CardContent className={compact ? 'p-3' : 'p-4'}>
        <div className="flex justify-between items-start">
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-base' : 'text-lg'}`}>
            {trip.title}
          </h3>
          
          {compact && (
            <div className="ml-2">{getStatusBadge()}</div>
          )}
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1 text-primary-500" />
            <span className="text-sm">{trip.destination}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1 text-primary-500" />
            <span className="text-sm">
              {formatDateRange(trip.startDate, trip.endDate)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-1 text-primary-500" />
              <span className="text-sm">
                {trip.participants.length}/{trip.maxParticipants} travelers
              </span>
            </div>
            
            {creator && (
              <div className="flex items-center">
                <Avatar
                  src={creator.profileImage}
                  alt={`${creator.firstName} ${creator.lastName}`}
                  size="xs"
                />
                <span className="ml-1 text-xs text-gray-500">
                  by {creator.firstName}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {!compact && (
          <>
            <p className="mt-3 text-sm text-gray-600">
              {truncateText(trip.description, 100)}
            </p>
            
            {participants.length > 0 && (
              <div className="mt-4">
                <div className="flex -space-x-2">
                  {participants.slice(0, 3).map(participant => (
                    <Avatar
                      key={participant.id}
                      src={participant.profileImage}
                      alt={`${participant.firstName} ${participant.lastName}`}
                      size="sm"
                      className="border-2 border-white"
                    />
                  ))}
                  
                  {participants.length > 3 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-800 border-2 border-white">
                      +{participants.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={handleViewTrip}
                fullWidth
              >
                View Trip
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TripCard;