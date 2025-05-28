import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAccommodationById, createBooking } from '../../store/slices/accommodationsSlice';
import Button from '../../components/ui/Button';
import { Star, MapPin, Check } from 'lucide-react';
import { formatCurrency } from '../../utils';
import Modal from '../../components/ui/Modal';

const AccommodationDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentAccommodation, loading } = useAppSelector((state) => state.accommodations);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
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
      await dispatch(createBooking({
        accommodationId: currentAccommodation.id,
        ...bookingData,
        totalPrice: currentAccommodation.pricePerNight * 
          ((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / 
          (1000 * 60 * 60 * 24)),
      })).unwrap();
      setShowBookingModal(false);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (loading || !currentAccommodation) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-4">
        {currentAccommodation.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${currentAccommodation.name} - Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Main Info */}
      <div className="mt-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {currentAccommodation.name}
            </h1>
            <div className="mt-2 flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{currentAccommodation.location}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{currentAccommodation.rating}</span>
            <span className="ml-1 text-gray-500">
              ({currentAccommodation.review_count} reviews)
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">About this place</h2>
          <p className="mt-2 text-gray-600">{currentAccommodation.description}</p>
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {currentAccommodation.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-gray-600">
                <Check className="w-5 h-5 mr-2 text-green-500" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentAccommodation.pricePerNight)}
              </span>
              <span className="text-gray-500"> / night</span>
            </div>
            <Button onClick={() => setShowBookingModal(true)}>
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
            <label className="block text-sm font-medium text-gray-700">Check-in</label>
            <input
              type="date"
              value={bookingData.checkIn}
              onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Check-out</label>
            <input
              type="date"
              value={bookingData.checkOut}
              onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Guests</label>
            <input
              type="number"
              min="1"
              value={bookingData.guests}
              onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleBooking}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccommodationDetails;