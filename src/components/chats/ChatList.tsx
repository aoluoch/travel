import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat, User } from '../../types';
import { formatRelativeTime } from '../../utils';
import Avatar from '../ui/Avatar';

interface ChatListProps {
  chats: Chat[];
  users: { [key: number]: User };
  currentUserId: number;
  currentChatId?: number;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  users,
  currentUserId,
  currentChatId,
}) => {
  const navigate = useNavigate();
  
  const handleSelectChat = (chatId: number) => {
    navigate(`/chats/${chatId}`);
  };
  
  const getChatPartner = (chat: Chat) => {
    const partnerId = chat.participants.find(id => id !== currentUserId);
    return partnerId ? users[partnerId] : null;
  };
  
  const getLastMessage = (chat: Chat) => {
    if (chat.messages.length === 0) return 'No messages yet';
    return chat.messages[chat.messages.length - 1].content;
  };
  
  return (
    <div className="h-full overflow-y-auto">
      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">No conversations yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Connect with other travelers to start chatting.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {chats.map(chat => {
            const partner = getChatPartner(chat);
            if (!partner) return null;
            
            return (
              <li
                key={chat.id}
                className={`
                  cursor-pointer hover:bg-gray-50 transition-colors
                  ${currentChatId === chat.id ? 'bg-primary-50' : ''}
                `}
                onClick={() => handleSelectChat(chat.id)}
              >
                <div className="flex items-center px-4 py-3">
                  <div className="relative">
                    <Avatar
                      src={partner.profileImage}
                      alt={`${partner.firstName} ${partner.lastName}`}
                      size="md"
                    />
                    {chat.unreadCount && chat.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {partner.firstName} {partner.lastName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(chat.lastActivity)}
                      </p>
                    </div>
                    
                    <p className={`
                      text-sm truncate
                      ${chat.unreadCount && chat.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}
                    `}>
                      {getLastMessage(chat)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;