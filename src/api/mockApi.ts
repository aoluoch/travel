import { 
  users, trips, matches, chats, messages, 
  accommodations, bookings, notifications 
} from './mockData';
import { 
  User, Trip, Chat, Message, Booking 
} from '../types';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    await delay(800);
    const user = users.find(u => u.email === email);
    
    if (!user || password !== 'password') { // Mock password check
      throw new Error('Invalid email or password');
    }
    
    return {
      user,
      token: 'mock-jwt-token-' + user.id
    };
  },
  
  register: async (userData: Partial<User>) => {
    await delay(1000);
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already in use');
    }
    
    const newUser: User = {
      id: users.length + 1,
      username: userData.username || '',
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      bio: userData.bio || '',
      profileImage: userData.profileImage || 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      country: userData.country || '',
      interests: userData.interests || [],
      createdAt: new Date().toISOString(),
      age: userData.age,
      languages: userData.languages || [],
      travelStyle: userData.travelStyle || []
    };
    
    users.push(newUser);
    
    return {
      user: newUser,
      token: 'mock-jwt-token'
    };
  },
  
  getCurrentUser: async () => {
    await delay(500);
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    // Extract user ID from token (mock implementation)
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  },
  
  logout: async () => {
    await delay(300);
    return { success: true };
  }
};

// Trips API
export const tripsApi = {
  getTrips: async () => {
    await delay(700);
    return trips;
  },
  
  getTripById: async (id: number) => {
    await delay(500);
    const trip = trips.find(t => t.id === id);
    
    if (!trip) {
      throw new Error('Trip not found');
    }
    
    return trip;
  },
  
  createTrip: async (tripData: Partial<Trip>) => {
    await delay(900);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    
    const newTrip: Trip = {
      id: trips.length + 1,
      title: tripData.title || '',
      destination: tripData.destination || '',
      startDate: tripData.startDate || '',
      endDate: tripData.endDate || '',
      creatorId: userId,
      participants: [userId],
      maxParticipants: tripData.maxParticipants || 4,
      description: tripData.description || '',
      image: tripData.image || 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      activities: tripData.activities || [],
      status: 'planning',
      createdAt: new Date().toISOString()
    };
    
    trips.push(newTrip);
    
    return newTrip;
  },
  
  updateTrip: async (id: number, tripData: Partial<Trip>) => {
    await delay(800);
    
    const index = trips.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error('Trip not found');
    }
    
    const updatedTrip = { ...trips[index], ...tripData };
    trips[index] = updatedTrip;
    
    return updatedTrip;
  },
  
  joinTrip: async (tripId: number) => {
    await delay(600);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const trip = trips.find(t => t.id === tripId);
    
    if (!trip) {
      throw new Error('Trip not found');
    }
    
    if (trip.participants.includes(userId)) {
      throw new Error('Already joined this trip');
    }
    
    if (trip.participants.length >= trip.maxParticipants) {
      throw new Error('Trip is already full');
    }
    
    trip.participants.push(userId);
    
    return trip;
  },

  leaveTrip: async (tripId: number) => {
    await delay(600);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const trip = trips.find(t => t.id === tripId);
    
    if (!trip) {
      throw new Error('Trip not found');
    }
    
    if (!trip.participants.includes(userId)) {
      throw new Error('Not a member of this trip');
    }
    
    // Can't leave if you're the creator
    if (trip.creatorId === userId) {
      throw new Error('Trip creator cannot leave the trip');
    }
    
    trip.participants = trip.participants.filter(id => id !== userId);
    
    return trip;
  }
};

// Matches API
export const matchesApi = {
  getMatches: async () => {
    await delay(800);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    
    // Return matches where current user is involved
    return matches.filter(m => 
      m.userId === userId || m.matchedUserId === userId
    );
  },
  
  respondToMatch: async (matchId: number, accept: boolean) => {
    await delay(600);
    
    const match = matches.find(m => m.id === matchId);
    
    if (!match) {
      throw new Error('Match not found');
    }
    
    match.status = accept ? 'accepted' : 'rejected';
    
    // If match is accepted, create a chat if it doesn't exist
    if (accept) {
      const chatExists = chats.some(c => 
        c.participants.includes(match.userId) && 
        c.participants.includes(match.matchedUserId)
      );
      
      if (!chatExists) {
        const newChat: Chat = {
          id: chats.length + 1,
          participants: [match.userId, match.matchedUserId],
          messages: [],
          lastActivity: new Date().toISOString(),
          unreadCount: 0
        };
        
        chats.push(newChat);
      }
    }
    
    return match;
  }
};

// Chats API
export const chatsApi = {
  getChats: async () => {
    await delay(700);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    
    // Return chats where current user is a participant
    return chats.filter(c => c.participants.includes(userId));
  },
  
  getChatById: async (chatId: number) => {
    await delay(500);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const chat = chats.find(c => c.id === chatId);
    
    if (!chat) {
      throw new Error('Chat not found');
    }
    
    // If current user is participant, mark messages as read
    if (chat.participants.includes(userId)) {
      chat.messages.forEach(m => {
        if (m.senderId !== userId) {
          m.read = true;
        }
      });
      chat.unreadCount = 0;
    }
    
    return chat;
  },

  sendMessage: async (chatId: number, content: string) => {
    await delay(600);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const chat = chats.find(c => c.id === chatId);
    
    if (!chat) {
      throw new Error('Chat not found');
    }
    
    const newMessage: Message = {
      id: messages.length + 1,
      chatId,
      senderId: userId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    messages.push(newMessage);
    chat.messages.push(newMessage);
    chat.lastActivity = newMessage.timestamp;
    
    // Update unread count for other participants
    chat.participants.forEach(participantId => {
      if (participantId !== userId) {
        chat.unreadCount = (chat.unreadCount || 0) + 1;
      }
    });
    
    return newMessage;
  }
};

// Accommodations API
export const accommodationsApi = {
  getAccommodations: async (filters?: {
    location?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    await delay(800);
    
    let filtered = [...accommodations];
    
    if (filters) {
      if (filters.location) {
        filtered = filtered.filter(a => 
          a.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      
      if (filters.type) {
        filtered = filtered.filter(a => a.type === filters.type);
      }
      
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(a => a.pricePerNight >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(a => a.pricePerNight <= filters.maxPrice!);
      }
      
      // Date filtering would be more complex, simplified here
    }
    
    return filtered;
  },
  
  getAccommodationById: async (id: number) => {
    await delay(500);
    
    const accommodation = accommodations.find(a => a.id === id);
    
    if (!accommodation) {
      throw new Error('Accommodation not found');
    }
    
    return accommodation;
  },
  
  createBooking: async (bookingData: Partial<Booking>) => {
    await delay(1000);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    
    const newBooking: Booking = {
      id: bookings.length + 1,
      userId: userId,
      accommodationId: bookingData.accommodationId || 0,
      checkIn: bookingData.checkIn || '',
      checkOut: bookingData.checkOut || '',
      guests: bookingData.guests || 1,
      totalPrice: bookingData.totalPrice || 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    
    return newBooking;
  }
};

// User API
export const userApi = {
  getUserById: async (id: number) => {
    await delay(600);
    
    const user = users.find(u => u.id === id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  },
  
  updateProfile: async (userData: Partial<User>) => {
    await delay(800);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...users[index], ...userData };
    users[index] = updatedUser;
    
    return updatedUser;
  },
  
  getUserTrips: async (userId: number) => {
    await delay(700);
    
    return trips.filter(t => t.participants.includes(userId));
  }
};

// Notifications API
export const notificationsApi = {
  getNotifications: async () => {
    await delay(600);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    
    return notifications.filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  
  markAsRead: async (notificationId: number) => {
    await delay(400);
    
    const notification = notifications.find(n => n.id === notificationId);
    
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    notification.read = true;
    
    return notification;
  },
  
  markAllAsRead: async () => {
    await delay(500);
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    
    notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
    
    return { success: true };
  }
};