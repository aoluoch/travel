import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { tripsApi } from '../../api/mockApi';
import { Trip } from '../../types';

interface TripsState {
  trips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  error: string | null;
}

const initialState: TripsState = {
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (_, { rejectWithValue }) => {
    try {
      return await tripsApi.getTrips();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchTripById = createAsyncThunk(
  'trips/fetchTripById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await tripsApi.getTripById(id);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const createTrip = createAsyncThunk(
  'trips/createTrip',
  async (tripData: Partial<Trip>, { rejectWithValue }) => {
    try {
      return await tripsApi.createTrip(tripData);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateTrip = createAsyncThunk(
  'trips/updateTrip',
  async ({ id, tripData }: { id: number; tripData: Partial<Trip> }, { rejectWithValue }) => {
    try {
      return await tripsApi.updateTrip(id, tripData);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const joinTrip = createAsyncThunk(
  'trips/joinTrip',
  async (tripId: number, { rejectWithValue }) => {
    try {
      return await tripsApi.joinTrip(tripId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const leaveTrip = createAsyncThunk(
  'trips/leaveTrip',
  async (tripId: number, { rejectWithValue }) => {
    try {
      return await tripsApi.leaveTrip(tripId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Trips slice
const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    clearCurrentTrip: (state) => {
      state.currentTrip = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch trips cases
    builder.addCase(fetchTrips.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTrips.fulfilled, (state, action: PayloadAction<Trip[]>) => {
      state.loading = false;
      state.trips = action.payload;
    });
    builder.addCase(fetchTrips.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch trip by ID cases
    builder.addCase(fetchTripById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTripById.fulfilled, (state, action: PayloadAction<Trip>) => {
      state.loading = false;
      state.currentTrip = action.payload;
    });
    builder.addCase(fetchTripById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create trip cases
    builder.addCase(createTrip.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
      state.loading = false;
      state.trips.push(action.payload);
      state.currentTrip = action.payload;
    });
    builder.addCase(createTrip.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update trip cases
    builder.addCase(updateTrip.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
      state.loading = false;
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
      state.currentTrip = action.payload;
    });
    builder.addCase(updateTrip.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Join trip cases
    builder.addCase(joinTrip.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(joinTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
      state.loading = false;
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
      state.currentTrip = action.payload;
    });
    builder.addCase(joinTrip.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Leave trip cases
    builder.addCase(leaveTrip.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(leaveTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
      state.loading = false;
      const index = state.trips.findIndex(trip => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
      state.currentTrip = action.payload;
    });
    builder.addCase(leaveTrip.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentTrip, clearError } = tripsSlice.actions;
export default tripsSlice.reducer;