import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tripsReducer from './slices/tripsSlice';
import matchesReducer from './slices/matchesSlice';
import chatsReducer from './slices/chatsSlice';
import accommodationsReducer from './slices/accommodationsSlice';
import notificationsReducer from './slices/notificationsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripsReducer,
    matches: matchesReducer,
    chats: chatsReducer,
    accommodations: accommodationsReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;