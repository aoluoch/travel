import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useAuth } from "../../hooks";
import { fetchChats } from "../../store/slices/chatsSlice";
import ChatList from "../../components/chats/ChatList";

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
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Messages
          </h1>
        </div>
        <ChatList chats={chats} users={{}} currentUserId={user?.id || 0} />
      </div>
    </div>
  );
};

export default Chats;
