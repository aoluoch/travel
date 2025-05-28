import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../hooks";
import { fetchTrips } from "../store/slices/tripsSlice";
import { fetchMatches } from "../store/slices/matchesSlice";
import { fetchNotifications } from "../store/slices/notificationsSlice";
import TripCard from "../components/trips/TripCard";
import MatchCard from "../components/matches/MatchCard";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Plus, MapPin } from "lucide-react";
import { findUserById } from "../utils";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trips } = useAppSelector((state) => state.trips);
  const { matches } = useAppSelector((state) => state.matches);

  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(fetchMatches());
    dispatch(fetchNotifications());
  }, [dispatch]);

  const upcomingTrips = trips
    .filter((trip) => new Date(trip.startDate) > new Date())
    .slice(0, 3);

  const recentMatches = matches
    .filter((match) => match.status === "pending")
    .slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Ready to plan your next adventure?
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            onClick={() => navigate("/trips/create")}
            leftIcon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
            size="sm"
            className="sm:size-default"
          >
            Create New Trip
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/explore")}
            leftIcon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
            size="sm"
            className="sm:size-default"
          >
            Explore Destinations
          </Button>
        </div>
      </div>

      {/* Upcoming Trips */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Trips</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/trips")}
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingTrips.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No upcoming trips. Time to plan one!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} compact />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Matches</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/matches")}
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentMatches.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No new matches yet. Keep exploring!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {recentMatches.map((match) => {
                const otherUserId =
                  match.userId === user?.id
                    ? match.matchedUserId
                    : match.userId;
                const otherUser = findUserById(otherUserId);

                if (!otherUser) return null;

                return (
                  <MatchCard key={match.id} match={match} user={otherUser} />
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
