import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTrips } from "../store/slices/tripsSlice";
import TripCard from "../components/trips/TripCard";
import Button from "../components/ui/Button";
import { Search, Star, Globe, Users } from "lucide-react";
import Input from "../components/ui/Input";

const Explore = () => {
  const dispatch = useAppDispatch();
  const { trips, loading } = useAppSelector((state) => state.trips);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "highlighted" | "group">(
    "all"
  );

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === "highlighted") {
      return matchesSearch && trip.isHighlighted;
    }
    if (filterType === "group") {
      return matchesSearch && trip.isGroupTrip;
    }
    return matchesSearch;
  });

  const highlightedTrips = trips.filter((trip) => trip.isHighlighted);
  const groupTrips = trips.filter((trip) => trip.isGroupTrip);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Explore Amazing Destinations
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover highlighted trips, join group expeditions, and find your next
          adventure from travelers around the world.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search destinations, trips, activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "primary" : "outline"}
            onClick={() => setFilterType("all")}
            leftIcon={<Globe className="w-4 h-4" />}
          >
            All Trips
          </Button>
          <Button
            variant={filterType === "highlighted" ? "primary" : "outline"}
            onClick={() => setFilterType("highlighted")}
            leftIcon={<Star className="w-4 h-4" />}
          >
            Featured
          </Button>
          <Button
            variant={filterType === "group" ? "primary" : "outline"}
            onClick={() => setFilterType("group")}
            leftIcon={<Users className="w-4 h-4" />}
          >
            Group Trips
          </Button>
        </div>
      </div>

      {/* Highlighted Trips Section */}
      {filterType === "all" && highlightedTrips.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Trips
              </h2>
            </div>
            <Button
              variant="outline"
              onClick={() => setFilterType("highlighted")}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedTrips.slice(0, 3).map((trip) => (
              <div key={trip.id} className="relative">
                <TripCard trip={trip} />
                <div className="absolute top-4 left-4">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Group Trips Section */}
      {filterType === "all" && groupTrips.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Group Expeditions
              </h2>
            </div>
            <Button variant="outline" onClick={() => setFilterType("group")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupTrips.slice(0, 3).map((trip) => (
              <div key={trip.id} className="relative">
                <TripCard trip={trip} />
                <div className="absolute top-4 left-4">
                  <div className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    Group Trip
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Filtered Results */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filterType === "highlighted" && "Featured Trips"}
            {filterType === "group" && "Group Expeditions"}
            {filterType === "all" && "All Trips"}
          </h2>
          <span className="text-gray-500">
            {filteredTrips.length} trips found
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No trips found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="relative">
                <TripCard trip={trip} />
                {trip.isHighlighted && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </div>
                  </div>
                )}
                {trip.isGroupTrip && !trip.isHighlighted && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Group Trip
                    </div>
                  </div>
                )}
                {trip.partnershipInfo && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Partner
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Explore;
