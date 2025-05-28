import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTrips } from "../../store/slices/tripsSlice";
import TripCard from "../../components/trips/TripCard";
import Button from "../../components/ui/Button";
import { Plus, Search } from "lucide-react";
import Input from "../../components/ui/Input";

const Trips = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { trips, loading } = useAppSelector((state) => state.trips);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          My Trips
        </h1>
        <Button
          onClick={() => navigate("/trips/create")}
          leftIcon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
          size="sm"
          className="w-full sm:w-auto"
        >
          <span className="hidden sm:inline">Create Trip</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>

      <div className="max-w-full sm:max-w-md">
        <Input
          placeholder="Search trips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
          className="w-full"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-500" />
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <p className="text-sm sm:text-base text-gray-500">
            No trips found. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Trips;
