import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAccommodations } from '../../store/slices/accommodationsSlice';
import AccommodationCard from '../../components/accommodations/AccommodationCard';
import Input from '../../components/ui/Input';
import { Search, MapPin, Calendar } from 'lucide-react';

const Accommodations = () => {
  const dispatch = useAppDispatch();
  const { accommodations, loading } = useAppSelector((state) => state.accommodations);
  const [filters, setFilters] = useState({
    location: '',
    startDate: '',
    endDate: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredAccommodations = accommodations.filter((accommodation) => {
    if (filters.location && !accommodation.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.type && accommodation.type !== filters.type) {
      return false;
    }
    if (filters.minPrice && accommodation.pricePerNight < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && accommodation.pricePerNight > parseInt(filters.maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Find Accommodations</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Where are you going?"
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
          />

          <Input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Check-in"
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
          />

          <Input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="Check-out"
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="apartment">Apartment</option>
            <option value="guesthouse">Guesthouse</option>
          </select>

          <Input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
          />

          <Input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
          />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
        </div>
      ) : filteredAccommodations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No accommodations found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Accommodations;