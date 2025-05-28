import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Map, Info } from 'lucide-react';
import { Notification } from '../../types';
import { formatRelativeTime } from '../../utils';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onClose: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onClose,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.actionLink) {
      navigate(notification.actionLink);
      onClose();
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'match':
        return <Users className="h-6 w-6 text-secondary-500" />;
      case 'message':
        return <MessageSquare className="h-6 w-6 text-accent-400" />;
      case 'trip':
        return <Map className="h-6 w-6 text-primary-500" />;
      case 'system':
        return <Info className="h-6 w-6 text-warning-500" />;
      default:
        return <Info className="h-6 w-6 text-gray-400" />;
    }
  };
  
  return (
    <li 
      className={`
        px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors
        ${!notification.read ? 'bg-primary-50' : ''}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          {getIcon()}
        </div>
        
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
            <p className="text-xs text-gray-500">
              {formatRelativeTime(notification.timestamp)}
            </p>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          
          {!notification.read && (
            <div className="mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary-500" />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;