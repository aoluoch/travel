import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { accommodationsApi } from '../../api/mockApi';
import { Accommodation, Booking } from '../../types';

interface AccommodationsState {
  accommodations: Accommodation[];
  currentAccommodation: Accommodation | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: AccommodationsState = {
  accommodations: [],
  currentAccommodation: null,
  bookings: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchAccommodations = createAsyncThunk(
  'accommodations/fetchAccommodations',
  async (filters?: {
    location?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }, { rejectWithValue }) => {
    try {
      return await accommodationsApi.getAccommodations(filters);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchAccommodationById = createAsyncThunk(
  'accommodations/fetchAccommodationById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await accommodationsApi.getAccommodationById(id);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const createBooking = createAsyncThunk(
  'accommodations/createBooking',
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      return await accommodationsApi.createBooking(bookingData);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Accommodations slice
const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState,
  reducers: {
    clearCurrentAccommodation: (state) => {
      state.currentAccommodation = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch accommodations cases
    builder.addCase(fetchAccommodations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAccommodations.fulfilled, (state, action: PayloadAction<Accommodation[]>) => {
      state.loading = false;
      state.accommodations = action.payload;
    });
    builder.addCase(fetchAccommodations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch accommodation by ID cases
    builder.addCase(fetchAccommodationById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAccommodationById.fulfilled, (state, action: PayloadAction<Accommodation>) => {
      state.loading = false;
      state.currentAccommodation = action.payload;
    });
    builder.addCase(fetchAccommodationById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create booking cases
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
      state.loading = false;
      state.bookings.push(action.payload);
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentAccommodation, clearError } = accommodationsSlice.actions;
export default accommodationsSlice.reducer;