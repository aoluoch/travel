import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { fetchChats } from '../../store/slices/chatsSlice';
import ChatList from '../../components/chats/ChatList';

const Chats = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { chats, loading } = useAppSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatList
        chats={chats}
        users={{}}
        currentUserId={user?.id || 0}
      />
    </div>
  );
};

export default Chats;