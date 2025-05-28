import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAccommodations } from "../../store/slices/accommodationsSlice";
import AccommodationCard from "../../components/accommodations/AccommodationCard";
import Input from "../../components/ui/Input";
import { MapPin, Calendar } from "lucide-react";

const Accommodations = () => {
  const dispatch = useAppDispatch();
  const { accommodations, loading } = useAppSelector(
    (state) => state.accommodations
  );
  const [filters, setFilters] = useState({
    location: "",
    startDate: "",
    endDate: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredAccommodations = accommodations.filter((accommodation) => {
    if (
      filters.location &&
      !accommodation.location
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (filters.type && accommodation.type !== filters.type) {
      return false;
    }
    if (
      filters.minPrice &&
      accommodation.pricePerNight < parseInt(filters.minPrice)
    ) {
      return false;
    }
    if (
      filters.maxPrice &&
      accommodation.pricePerNight > parseInt(filters.maxPrice)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
        Find Accommodations
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          <div className="sm:col-span-2 xl:col-span-2">
            <Input
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Where are you going?"
              icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
            />
          </div>

          <Input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Check-in"
            icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
          />

          <Input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="Check-out"
            icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="">All Types</option>
            <option value="hotel">Hotel</option>
            <option value="hostel">Hostel</option>
            <option value="apartment">Apartment</option>
            <option value="guesthouse">Guesthouse</option>
          </select>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <Input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min $"
              className="text-xs sm:text-sm"
            />

            <Input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max $"
              className="text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-8 sm:py-12">
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-500" />
            <p className="text-xs sm:text-sm text-gray-500">
              Loading accommodations...
            </p>
          </div>
        </div>
      ) : filteredAccommodations.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="max-w-md mx-auto">
            <p className="text-sm sm:text-base text-gray-500 mb-2">
              No accommodations found matching your criteria.
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              Try adjusting your filters or search in a different location.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-1">
            <p className="text-sm sm:text-base text-gray-600">
              <span className="hidden sm:inline">Showing </span>
              {filteredAccommodations.length}
              <span className="hidden sm:inline">
                {" "}
                accommodation{filteredAccommodations.length !== 1 ? "s" : ""}
              </span>
              <span className="sm:hidden">
                {" "}
                result{filteredAccommodations.length !== 1 ? "s" : ""}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAccommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Accommodations;
