import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useAuth } from "../../hooks";
import { fetchMatches, respondToMatch } from "../../store/slices/matchesSlice";
import MatchCard from "../../components/matches/MatchCard";
import { findUserById } from "../../utils";

const Matches = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { matches, loading } = useAppSelector((state) => state.matches);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const handleAcceptMatch = (matchId: number) => {
    dispatch(respondToMatch({ matchId, accept: true }));
  };

  const handleRejectMatch = (matchId: number) => {
    dispatch(respondToMatch({ matchId, accept: false }));
  };

  const handleViewProfile = (_userId: number) => {
    // Navigate to user profile
    // TODO: Implement navigation to user profile
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8 sm:py-12">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  const pendingMatches = matches.filter((match) => match.status === "pending");
  const acceptedMatches = matches.filter(
    (match) => match.status === "accepted"
  );

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Pending Matches
        </h2>
        {pendingMatches.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-sm sm:text-base text-gray-500">
              No pending matches at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pendingMatches.map((match) => {
              const otherUserId =
                match.userId === user?.id ? match.matchedUserId : match.userId;
              const otherUser = findUserById(otherUserId);

              if (!otherUser) return null;

              return (
                <MatchCard
                  key={match.id}
                  match={match}
                  user={otherUser}
                  onAccept={() => handleAcceptMatch(match.id)}
                  onReject={() => handleRejectMatch(match.id)}
                  onViewProfile={handleViewProfile}
                />
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Connected Travelers
        </h2>
        {acceptedMatches.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <p className="text-sm sm:text-base text-gray-500">
              No connections yet. Start matching with travelers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {acceptedMatches.map((match) => {
              const otherUserId =
                match.userId === user?.id ? match.matchedUserId : match.userId;
              const otherUser = findUserById(otherUserId);

              if (!otherUser) return null;

              return (
                <MatchCard
                  key={match.id}
                  match={match}
                  user={otherUser}
                  onViewProfile={handleViewProfile}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
