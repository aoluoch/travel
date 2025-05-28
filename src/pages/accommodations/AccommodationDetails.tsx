import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchAccommodationById,
  createBooking,
} from "../../store/slices/accommodationsSlice";
import Button from "../../components/ui/Button";
import { Star, MapPin, Check } from "lucide-react";
import { formatCurrency } from "../../utils";
import Modal from "../../components/ui/Modal";

const AccommodationDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentAccommodation, loading } = useAppSelector(
    (state) => state.accommodations
  );
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchAccommodationById(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleBooking = async () => {
    if (!currentAccommodation) return;

    try {
      await dispatch(
        createBooking({
          accommodationId: currentAccommodation.id,
          ...bookingData,
          totalPrice:
            currentAccommodation.pricePerNight *
            ((new Date(bookingData.checkOut).getTime() -
              new Date(bookingData.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)),
        })
      ).unwrap();
      setShowBookingModal(false);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (loading || !currentAccommodation) {
    return (
      <div className="flex justify-center py-8 sm:py-12">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {currentAccommodation.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${currentAccommodation.name} - Image ${index + 1}`}
            className="w-full h-48 sm:h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Main Info */}
      <div className="mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {currentAccommodation.name}
            </h1>
            <div className="mt-2 flex items-center text-gray-600">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 flex-shrink-0" />
              <span className="text-sm sm:text-base">
                {currentAccommodation.location}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold text-sm sm:text-base">
              {currentAccommodation.rating}
            </span>
            <span className="ml-1 text-gray-500 text-sm sm:text-base">
              ({currentAccommodation.review_count} reviews)
            </span>
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            About this place
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            {currentAccommodation.description}
          </p>
        </div>

        {/* Amenities */}
        <div className="mt-4 sm:mt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Amenities
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {currentAccommodation.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-gray-600">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {formatCurrency(currentAccommodation.pricePerNight)}
              </span>
              <span className="text-gray-500 text-sm sm:text-base">
                {" "}
                / night
              </span>
            </div>
            <Button
              onClick={() => setShowBookingModal(true)}
              className="w-full sm:w-auto"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Book Your Stay"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-in
            </label>
            <input
              type="date"
              value={bookingData.checkIn}
              onChange={(e) =>
                setBookingData({ ...bookingData, checkIn: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-out
            </label>
            <input
              type="date"
              value={bookingData.checkOut}
              onChange={(e) =>
                setBookingData({ ...bookingData, checkOut: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <input
              type="number"
              min="1"
              value={bookingData.guests}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  guests: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowBookingModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleBooking}>Confirm Booking</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccommodationDetails;
