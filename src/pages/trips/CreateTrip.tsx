import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { createTrip } from '../../store/slices/tripsSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { MapPin, Calendar, Users, Image } from 'lucide-react';

const CreateTrip = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    maxParticipants: 4,
    description: '',
    image: '',
    activities: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(createTrip(formData)).unwrap();
      navigate(`/trips/${result.id}`);
    } catch (error) {
      console.error('Failed to create trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityAdd = (activity: string) => {
    if (activity && !formData.activities.includes(activity)) {
      setFormData({
        ...formData,
        activities: [...formData.activities, activity],
      });
    }
  };

  const handleActivityRemove = (activity: string) => {
    setFormData({
      ...formData,
      activities: formData.activities.filter((a) => a !== activity),
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Create New Trip</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Input
          label="Trip Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter trip title"
          required
        />

        <Input
          label="Destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="Where are you going?"
          icon={<MapPin className="w-5 h-5 text-gray-400" />}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
            required
          />

          <Input
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
            required
          />
        </div>

        <Input
          label="Maximum Participants"
          type="number"
          value={formData.maxParticipants}
          onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
          min={1}
          max={10}
          icon={<Users className="w-5 h-5 text-gray-400" />}
          required
        />

        <Input
          label="Cover Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="Enter image URL"
          icon={<Image className="w-5 h-5 text-gray-400" />}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Describe your trip..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Activities
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.activities.map((activity) => (
              <span
                key={activity}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {activity}
                <button
                  type="button"
                  onClick={() => handleActivityRemove(activity)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <Input
            className="mt-2"
            placeholder="Add an activity"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleActivityAdd((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/trips')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={loading}
          >
            Create Trip
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;