import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook to get the current user
export const useAuth = () => {
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  
  return {
    user,
    isAuthenticated,
    loading,
    error,
  };
};

// Custom hook to manage notifications
export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector((state) => state.notifications);
  
  const unreadCount = useMemo(() => {
    return notifications.filter(notif => !notif.read).length;
  }, [notifications]);
  
  return {
    notifications,
    loading,
    unreadCount,
  };
};

// Custom hook to format dates
export const useDateFormat = () => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }, []);
  
  const formatDateRange = useCallback((startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleString('en-US', { month: 'short' });
    const endMonth = end.toLocaleString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    
    if (startYear !== endYear) {
      return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
    } else if (startMonth !== endMonth) {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
    } else {
      return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
    }
  }, []);
  
  return { formatDate, formatDateRange };
};

// Custom hook for UI state
export const useUI = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);
  
  return {
    ...ui,
  };
};