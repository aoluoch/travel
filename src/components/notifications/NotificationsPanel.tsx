import React, { useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNotifications, markAllAsRead, markAsRead } from '../../store/slices/notificationsSlice';
import Button from '../ui/Button';
import NotificationItem from './NotificationItem';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { notifications, loading } = useAppSelector(state => state.notifications);
  
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch]);
  
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };
  
  const handleMarkAsRead = (id: number) => {
    dispatch(markAsRead(id));
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white shadow-xl h-full animate-slide-in">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Mark all as read
            </button>
            
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="h-full overflow-y-auto pb-20">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No notifications yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                When you receive notifications, they'll appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onClose={onClose}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;