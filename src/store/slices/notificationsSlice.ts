import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notificationsApi } from '../../api/mockApi';
import { Notification } from '../../types';

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      return await notificationsApi.getNotifications();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: number, { rejectWithValue }) => {
    try {
      return await notificationsApi.markAsRead(notificationId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationsApi.markAllAsRead();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch notifications cases
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
      state.loading = false;
      state.notifications = action.payload;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Mark as read cases
    builder.addCase(markAsRead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(markAsRead.fulfilled, (state, action: PayloadAction<Notification>) => {
      state.loading = false;
      const index = state.notifications.findIndex(notif => notif.id === action.payload.id);
      if (index !== -1) {
        state.notifications[index].read = true;
      }
    });
    builder.addCase(markAsRead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Mark all as read cases
    builder.addCase(markAllAsRead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.loading = false;
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    });
    builder.addCase(markAllAsRead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = notificationsSlice.actions;
export default notificationsSlice.reducer;