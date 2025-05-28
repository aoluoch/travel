import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { chatsApi } from '../../api/mockApi';
import { Chat, Message } from '../../types';

interface ChatsState {
  chats: Chat[];
  currentChat: Chat | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatsState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      return await chatsApi.getChats();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchChatById = createAsyncThunk(
  'chats/fetchChatById',
  async (chatId: number, { rejectWithValue }) => {
    try {
      return await chatsApi.getChatById(chatId);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async ({ chatId, content }: { chatId: number; content: string }, { rejectWithValue }) => {
    try {
      return await chatsApi.sendMessage(chatId, content);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Chats slice
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    clearCurrentChat: (state) => {
      state.currentChat = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch chats cases
    builder.addCase(fetchChats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
      state.loading = false;
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch chat by ID cases
    builder.addCase(fetchChatById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchChatById.fulfilled, (state, action: PayloadAction<Chat>) => {
      state.loading = false;
      state.currentChat = action.payload;
      // Update the chat in the chats array as well
      const index = state.chats.findIndex(chat => chat.id === action.payload.id);
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    });
    builder.addCase(fetchChatById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Send message cases
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
      state.loading = false;
      // Update the current chat if it's the same chat
      if (state.currentChat && state.currentChat.id === action.payload.chatId) {
        state.currentChat.messages.push(action.payload);
        state.currentChat.lastActivity = action.payload.timestamp;
      }
      // Update the chat in the chats array
      const chatIndex = state.chats.findIndex(chat => chat.id === action.payload.chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastActivity = action.payload.timestamp;
      }
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentChat, clearError } = chatsSlice.actions;
export default chatsSlice.reducer;