import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { matchesApi } from '../../api/mockApi';
import { Match } from '../../types';

interface MatchesState {
  matches: Match[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (_, { rejectWithValue }) => {
    try {
      return await matchesApi.getMatches();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const respondToMatch = createAsyncThunk(
  'matches/respondToMatch',
  async ({ matchId, accept }: { matchId: number; accept: boolean }, { rejectWithValue }) => {
    try {
      return await matchesApi.respondToMatch(matchId, accept);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Matches slice
const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch matches cases
    builder.addCase(fetchMatches.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action: PayloadAction<Match[]>) => {
      state.loading = false;
      state.matches = action.payload;
    });
    builder.addCase(fetchMatches.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Respond to match cases
    builder.addCase(respondToMatch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(respondToMatch.fulfilled, (state, action: PayloadAction<Match>) => {
      state.loading = false;
      const index = state.matches.findIndex(match => match.id === action.payload.id);
      if (index !== -1) {
        state.matches[index] = action.payload;
      }
    });
    builder.addCase(respondToMatch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = matchesSlice.actions;
export default matchesSlice.reducer;