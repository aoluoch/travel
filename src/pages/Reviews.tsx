import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare, Search, User } from "lucide-react";
import Button from "../components/ui/Button";
import Card, { CardContent } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Avatar from "../components/ui/Avatar";
import { useAuth } from "../hooks";

interface Review {
  id: number;
  reviewerId: number;
  revieweeId: number;
  tripId: number;
  rating: number;
  title: string;
  content: string;
  categories: {
    communication: number;
    reliability: number;
    friendliness: number;
    cleanliness: number;
  };
  helpful: number;
  timestamp: string;
  tripTitle: string;
  reviewerName: string;
  revieweeName: string;
  reviewerAvatar: string;
}

const Reviews = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "given" | "received">(
    "all"
  );
  const [reviews, setReviews] = useState<Review[]>([]);

  // Mock reviews data
  useEffect(() => {
    const mockReviews: Review[] = [
      {
        id: 1,
        reviewerId: 1,
        revieweeId: 3,
        tripId: 1,
        rating: 5,
        title: "Excellent travel companion!",
        content:
          "Marco was an amazing travel buddy for our Barcelona trip. Very organized, friendly, and always up for new adventures. His knowledge of Spanish really helped us navigate the city and connect with locals. Would definitely travel with him again!",
        categories: {
          communication: 5,
          reliability: 5,
          friendliness: 5,
          cleanliness: 4,
        },
        helpful: 12,
        timestamp: "2023-07-25T14:30:00Z",
        tripTitle: "Summer in Barcelona",
        reviewerName: "Alex Johnson",
        revieweeName: "Marco Torres",
        reviewerAvatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 2,
        reviewerId: 3,
        revieweeId: 1,
        tripId: 1,
        rating: 5,
        title: "Great trip organizer",
        content:
          "Alex did a fantastic job organizing our Barcelona adventure. Well-planned itinerary, great communication before and during the trip, and very respectful of everyone's preferences. The photography skills were a bonus - we got amazing shots throughout the trip!",
        categories: {
          communication: 5,
          reliability: 5,
          friendliness: 5,
          cleanliness: 5,
        },
        helpful: 8,
        timestamp: "2023-07-26T10:15:00Z",
        tripTitle: "Summer in Barcelona",
        reviewerName: "Marco Torres",
        revieweeName: "Alex Johnson",
        reviewerAvatar:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 3,
        reviewerId: 4,
        revieweeId: 5,
        tripId: 2,
        rating: 4,
        title: "Fun and knowledgeable",
        content:
          "David's passion for food really made our Tokyo culinary experience special. He found amazing local spots and taught us about Japanese food culture. Sometimes a bit too focused on food (we missed some sightseeing) but overall a great companion for food lovers.",
        categories: {
          communication: 4,
          reliability: 4,
          friendliness: 5,
          cleanliness: 4,
        },
        helpful: 6,
        timestamp: "2023-09-20T16:45:00Z",
        tripTitle: "Tokyo Adventure",
        reviewerName: "Emma Wilson",
        revieweeName: "David Kim",
        reviewerAvatar:
          "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 4,
        reviewerId: 2,
        revieweeId: 6,
        tripId: 6,
        rating: 5,
        title: "Incredible safari guide and companion",
        content:
          "Amara made our Kenyan safari absolutely unforgettable! Her knowledge of wildlife and local culture is incredible. She spotted animals we never would have seen and shared fascinating stories about conservation efforts. Professional, friendly, and passionate about her work.",
        categories: {
          communication: 5,
          reliability: 5,
          friendliness: 5,
          cleanliness: 5,
        },
        helpful: 15,
        timestamp: "2024-08-30T12:20:00Z",
        tripTitle: "Jambo Jambo Safari Adventure",
        reviewerName: "Sophia Wilson",
        revieweeName: "Amara Kimani",
        reviewerAvatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ];
    setReviews(mockReviews);
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.tripTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === "given") {
      return matchesSearch && review.reviewerId === user?.id;
    }
    if (filterType === "received") {
      return matchesSearch && review.revieweeId === user?.id;
    }
    return matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      communication: "Communication",
      reliability: "Reliability",
      friendliness: "Friendliness",
      cleanliness: "Cleanliness",
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Star className="w-8 h-8 mr-3 text-yellow-500" />
          Reviews & Ratings
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Read and share experiences with fellow travelers. Help build a trusted
          community by leaving honest reviews after your trips.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search reviews by title, content, or trip..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5 text-gray-400" />}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "primary" : "outline"}
            onClick={() => setFilterType("all")}
            size="sm"
          >
            All Reviews
          </Button>
          <Button
            variant={filterType === "given" ? "primary" : "outline"}
            onClick={() => setFilterType("given")}
            size="sm"
          >
            Given by Me
          </Button>
          <Button
            variant={filterType === "received" ? "primary" : "outline"}
            onClick={() => setFilterType("received")}
            size="sm"
          >
            Received
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
            <div className="flex justify-center mt-2">{renderStars(5)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Positive Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">18</div>
            <div className="text-sm text-gray-600">Successful Trips</div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Reviews ({filteredReviews.length})
          </h2>
          <Button variant="primary">Write a Review</Button>
        </div>

        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Avatar
                    src={review.reviewerAvatar}
                    alt={review.reviewerName}
                    size="md"
                    className="mr-4"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </h3>
                      <span className="text-gray-500">reviewed</span>
                      <span className="font-medium text-gray-900">
                        {review.revieweeName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Trip: {review.tripTitle}</span>
                      <span>•</span>
                      <span>
                        {new Date(review.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-lg font-semibold text-gray-900">
                    {review.rating}.0
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {review.title}
              </h4>
              <p className="text-gray-700 mb-4">{review.content}</p>

              {/* Category Ratings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {Object.entries(review.categories).map(([category, rating]) => (
                  <div key={category} className="text-center">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {getCategoryLabel(category)}
                    </div>
                    <div className="flex justify-center mb-1">
                      {renderStars(rating)}
                    </div>
                    <div className="text-xs text-gray-600">{rating}.0</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ThumbsUp className="w-4 h-4" />}
                >
                  Helpful ({review.helpful})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No reviews found</p>
            <p className="text-gray-400">
              {filterType === "all"
                ? "Be the first to write a review!"
                : `No ${filterType} reviews yet.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
