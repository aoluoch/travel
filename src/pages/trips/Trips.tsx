import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTrips } from '../../store/slices/tripsSlice';
import TripCard from '../../components/trips/TripCard';
import Button from '../../components/ui/Button';
import { Plus, Search } from 'lucide-react';
import Input from '../../components/ui/Input';

const Trips = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { trips, loading } = useAppSelector((state) => state.trips);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const filteredTrips = trips.filter((trip) =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trips</h1>
        <Button
          onClick={() => navigate('/trips/create')}
          leftIcon={<Plus className="w-5 h-5" />}
        >
          Create Trip
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search trips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-5 h-5 text-gray-400" />}
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No trips found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Trips;