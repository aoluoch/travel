import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { fetchTripById, joinTrip, leaveTrip } from '../../store/slices/tripsSlice';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { MapPin, Calendar, Users, Edit2 } from 'lucide-react';
import { formatDateRange } from '../../utils';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { currentTrip, loading } = useAppSelector((state) => state.trips);

  useEffect(() => {
    if (id) {
      dispatch(fetchTripById(parseInt(id)));
    }
  }, [dispatch, id]);

  if (loading || !currentTrip) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  const isCreator = currentTrip.creatorId === user?.id;
  const isParticipant = currentTrip.participants.includes(user?.id || 0);
  const isFull = currentTrip.participants.length >= currentTrip.maxParticipants;

  const handleJoinTrip = () => {
    if (id) {
      dispatch(joinTrip(parseInt(id)));
    }
  };

  const handleLeaveTrip = () => {
    if (id) {
      dispatch(leaveTrip(parseInt(id)));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-64 rounded-lg overflow-hidden">
        <img
          src={currentTrip.image}
          alt={currentTrip.title}
          className="w-full h-full object-cover"
        />
        {isCreator && (
          <Button
            variant="primary"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => navigate(`/trips/${id}/edit`)}
            leftIcon={<Edit2 className="w-4 h-4" />}
          >
            Edit Trip
          </Button>
        )}
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{currentTrip.title}</h1>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2 text-primary-500" />
            <span>{currentTrip.destination}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-primary-500" />
            <span>{formatDateRange(currentTrip.startDate, currentTrip.endDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2 text-primary-500" />
            <span>{currentTrip.participants.length}/{currentTrip.maxParticipants} travelers</span>
          </div>
        </div>

        <p className="mt-6 text-gray-600">{currentTrip.description}</p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentTrip.activities?.map((activity, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Participants</h2>
          <div className="mt-4 flex -space-x-2">
            {currentTrip.participants.map((participantId) => (
              <Avatar
                key={participantId}
                src={`https://i.pravatar.cc/150?u=${participantId}`}
                alt={`Participant ${participantId}`}
                className="border-2 border-white"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {!isCreator && !isParticipant && (
            <Button
              onClick={handleJoinTrip}
              disabled={isFull}
              className="w-full max-w-sm"
            >
              {isFull ? 'Trip is Full' : 'Join Trip'}
            </Button>
          )}
          {!isCreator && isParticipant && (
            <Button
              variant="outline"
              onClick={handleLeaveTrip}
              className="w-full max-w-sm"
            >
              Leave Trip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;