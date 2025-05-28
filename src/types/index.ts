// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  profileImage: string;
  country: string;
  city?: string;
  interests: string[];
  createdAt: string;
  age?: number;
  languages?: string[];
  travelStyle?: string[];
  // Enhanced profile fields for travel buddy matching
  occupation?: string;
  education?: string;
  travelExperience?: 'beginner' | 'intermediate' | 'expert';
  budgetRange?: 'budget' | 'mid-range' | 'luxury';
  accommodationPreference?: 'hostel' | 'hotel' | 'apartment' | 'any';
  transportPreference?: 'flight' | 'train' | 'bus' | 'car' | 'any';
  smokingPreference?: 'smoker' | 'non-smoker' | 'no-preference';
  drinkingPreference?: 'drinker' | 'non-drinker' | 'social-drinker' | 'no-preference';
  isVerified?: boolean;
  verificationBadges?: ('email' | 'phone' | 'id' | 'social')[];
  rating?: number;
  reviewCount?: number;
  lastActive?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// Authentication Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Trip Types
export interface Trip {
  id: number;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  creatorId: number;
  participants: number[];
  maxParticipants: number;
  description: string;
  image: string;
  activities?: string[];
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  // Enhanced trip features
  budget?: {
    total: number;
    perPerson: number;
    currency: string;
    breakdown?: {
      accommodation: number;
      transport: number;
      food: number;
      activities: number;
      other: number;
    };
  };
  itinerary?: TripDay[];
  requirements?: {
    ageRange?: { min: number; max: number };
    gender?: 'male' | 'female' | 'any';
    experience?: 'beginner' | 'intermediate' | 'expert' | 'any';
    languages?: string[];
  };
  tags?: string[];
  difficulty?: 'easy' | 'moderate' | 'challenging';
  tripType?: 'adventure' | 'cultural' | 'relaxation' | 'business' | 'backpacking' | 'luxury';
  isPublic?: boolean;
  joinRequests?: number[];
  expenses?: Expense[];
  // New fields for README requirements
  isHighlighted?: boolean; // For featured trips shown on platform
  isGroupTrip?: boolean; // For group expeditions
  partnershipInfo?: {
    partner: string;
    verified: boolean;
    specialOffers?: string[];
  };
}

export interface TripDay {
  id: number;
  date: string;
  activities: Activity[];
  accommodation?: {
    name: string;
    address: string;
    checkIn?: string;
    checkOut?: string;
  };
  transport?: {
    type: string;
    details: string;
    time?: string;
  };
}

export interface Activity {
  id: number;
  name: string;
  description?: string;
  time?: string;
  duration?: number;
  cost?: number;
  location?: string;
  type?: 'sightseeing' | 'food' | 'adventure' | 'cultural' | 'shopping' | 'nightlife';
}

export interface Expense {
  id: number;
  tripId: number;
  description: string;
  amount: number;
  currency: string;
  paidBy: number;
  splitBetween: number[];
  category: 'accommodation' | 'transport' | 'food' | 'activities' | 'other';
  date: string;
  receipt?: string;
}

// Match Types
export interface Match {
  id: number;
  userId: number;
  matchedUserId: number;
  tripId?: number;
  compatibilityScore: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  // Enhanced matching features
  commonInterests?: string[];
  matchReason?: string;
  compatibilityBreakdown?: {
    interests: number;
    travelStyle: number;
    budget: number;
    destination: number;
    dates: number;
    personality: number;
  };
  mutualConnections?: number;
  sharedTrips?: number[];
  lastInteraction?: string;
}

// Review System
export interface Review {
  id: number;
  reviewerId: number;
  revieweeId: number;
  tripId?: number;
  rating: number; // 1-5 stars
  comment?: string;
  categories?: {
    communication: number;
    reliability: number;
    friendliness: number;
    cleanliness: number;
    safety: number;
  };
  isPublic: boolean;
  createdAt: string;
  helpful?: number; // number of users who found this review helpful
}

// Chat Types
export interface Message {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: number;
  participants: number[];
  messages: Message[];
  lastActivity: string;
  unreadCount?: number;
}

// Accommodation Types
export interface Accommodation {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  images: string[];
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  type: 'hotel' | 'hostel' | 'apartment' | 'guesthouse';
  availableDates?: { start: string; end: string }[];
}

export interface Booking {
  id: number;
  userId: number;
  accommodationId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

// UI Types
export interface Notification {
  id: number;
  userId: number;
  type: 'match' | 'trip' | 'message' | 'system' | 'safety' | 'partnership' | 'review' | 'verification' | 'expense' | 'group' | 'accommodation' | 'promotion' | 'community' | 'weather';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionLink?: string;
}