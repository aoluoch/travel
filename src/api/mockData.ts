import { User, Trip, Match, Chat, Message, Accommodation, Booking, Notification } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 1,
    username: "alexjohnson",
    email: "alex@example.com",
    firstName: "Alex",
    lastName: "Johnson",
    bio: "Solo traveler exploring Europe! Love hiking and photography.",
    profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "USA",
    interests: ["Hiking", "Photography", "Food", "Museums"],
    createdAt: "2023-01-15T10:30:00Z",
    age: 28,
    languages: ["English", "Spanish"],
    travelStyle: ["Budget", "Adventure", "Cultural"]
  },
  {
    id: 2,
    username: "sophiawilson",
    email: "sophia@example.com",
    firstName: "Sophia",
    lastName: "Wilson",
    bio: "Travel blogger seeking authentic experiences around the world.",
    profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "Canada",
    interests: ["Blogging", "Photography", "Beaches", "Local Cuisine"],
    createdAt: "2023-02-18T14:45:00Z",
    age: 31,
    languages: ["English", "French"],
    travelStyle: ["Luxury", "Slow Travel", "Cultural"]
  },
  {
    id: 3,
    username: "marcotorres",
    email: "marco@example.com",
    firstName: "Marco",
    lastName: "Torres",
    bio: "Backpacker exploring Southeast Asia on a budget.",
    profileImage: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "Italy",
    interests: ["Backpacking", "Street Food", "Hiking", "Beaches"],
    createdAt: "2023-03-22T09:15:00Z",
    age: 25,
    languages: ["Italian", "English", "Basic Thai"],
    travelStyle: ["Budget", "Backpacking", "Adventure"]
  },
  {
    id: 4,
    username: "emilyyoung",
    email: "emily@example.com",
    firstName: "Emily",
    lastName: "Young",
    bio: "Digital nomad working while traveling the world.",
    profileImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "UK",
    interests: ["Remote Work", "Cafes", "City Life", "Art"],
    createdAt: "2023-01-30T11:20:00Z",
    age: 33,
    languages: ["English", "Basic Japanese"],
    travelStyle: ["Digital Nomad", "Mid-range", "City Exploration"]
  },
  {
    id: 5,
    username: "davidkim",
    email: "david@example.com",
    firstName: "David",
    lastName: "Kim",
    bio: "Food enthusiast traveling for the best culinary experiences.",
    profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "South Korea",
    interests: ["Cooking", "Food Tours", "Markets", "Restaurants"],
    createdAt: "2023-04-05T16:30:00Z",
    age: 30,
    languages: ["Korean", "English"],
    travelStyle: ["Foodie", "Cultural", "Mid-range"]
  },
  // Adding more diverse users to reflect global platform
  {
    id: 6,
    username: "amara_nairobi",
    email: "amara@example.com",
    firstName: "Amara",
    lastName: "Kimani",
    bio: "Safari guide and wildlife photographer from Kenya. Love showing travelers the real Africa!",
    profileImage: "https://images.pexels.com/photos/1853892/pexels-photo-1853892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "Kenya",
    interests: ["Wildlife", "Safari", "Photography", "Conservation", "Local Culture"],
    createdAt: "2023-03-10T09:15:00Z",
    age: 29,
    languages: ["Swahili", "English"],
    travelStyle: ["Adventure", "Eco-tourism", "Cultural", "Budget"]
  },
  {
    id: 7,
    username: "carlos_buenos_aires",
    email: "carlos@example.com",
    firstName: "Carlos",
    lastName: "Rodriguez",
    bio: "Tango dancer and food lover from Argentina. Always ready for a new adventure!",
    profileImage: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "Argentina",
    interests: ["Tango", "Food", "Wine", "Music", "Football"],
    createdAt: "2023-04-12T16:45:00Z",
    age: 35,
    languages: ["Spanish", "English", "Portuguese"],
    travelStyle: ["Cultural", "Mid-range", "Food & Wine"]
  },
  {
    id: 8,
    username: "mei_shanghai",
    email: "mei@example.com",
    firstName: "Mei",
    lastName: "Chen",
    bio: "Digital nomad and tech enthusiast exploring Asia. Love connecting cultures through technology.",
    profileImage: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "China",
    interests: ["Technology", "Digital Art", "Street Food", "Temples", "Innovation"],
    createdAt: "2023-05-22T11:30:00Z",
    age: 27,
    languages: ["Mandarin", "English", "Korean"],
    travelStyle: ["Digital Nomad", "Cultural", "Tech-savvy", "Budget"]
  },
  {
    id: 9,
    username: "olaf_nordic",
    email: "olaf@example.com",
    firstName: "Olaf",
    lastName: "Eriksson",
    bio: "Outdoor enthusiast from Norway. Passionate about sustainable travel and Arctic adventures.",
    profileImage: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "Norway",
    interests: ["Hiking", "Aurora", "Sustainability", "Fjords", "Winter Sports"],
    createdAt: "2023-06-08T14:20:00Z",
    age: 32,
    languages: ["Norwegian", "English", "Swedish", "Danish"],
    travelStyle: ["Eco-tourism", "Adventure", "Sustainable", "Mid-range"]
  },
  {
    id: 10,
    username: "priya_mumbai",
    email: "priya@example.com",
    firstName: "Priya",
    lastName: "Sharma",
    bio: "Yoga instructor and spiritual seeker from India. Love sharing mindful travel experiences.",
    profileImage: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    country: "India",
    interests: ["Yoga", "Meditation", "Spirituality", "Ayurveda", "Local Markets"],
    createdAt: "2023-07-15T08:45:00Z",
    age: 30,
    languages: ["Hindi", "English", "Sanskrit"],
    travelStyle: ["Spiritual", "Budget", "Cultural", "Wellness"]
  }
];

// Mock Trips
export const trips: Trip[] = [
  {
    id: 1,
    title: "Summer in Barcelona",
    destination: "Barcelona, Spain",
    startDate: "2023-07-10T00:00:00Z",
    endDate: "2023-07-20T00:00:00Z",
    creatorId: 1,
    participants: [1, 3],
    maxParticipants: 4,
    description: "Exploring Gaudí architecture, local cuisine, and beautiful beaches!",
    image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Sagrada Familia", "Park Güell", "La Rambla", "Beach Day", "Tapas Tour"],
    status: "planning",
    createdAt: "2023-04-15T08:30:00Z"
  },
  {
    id: 2,
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    startDate: "2023-09-05T00:00:00Z",
    endDate: "2023-09-15T00:00:00Z",
    creatorId: 4,
    participants: [4, 5],
    maxParticipants: 3,
    description: "Exploring the vibrant city of Tokyo, from traditional temples to modern districts.",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Shibuya Crossing", "Meiji Shrine", "Tokyo Tower", "Akihabara", "Sushi Workshop"],
    status: "planning",
    createdAt: "2023-05-20T14:15:00Z"
  },
  {
    id: 3,
    title: "Backpacking Thailand",
    destination: "Thailand",
    startDate: "2023-11-10T00:00:00Z",
    endDate: "2023-12-05T00:00:00Z",
    creatorId: 3,
    participants: [3],
    maxParticipants: 5,
    description: "Budget-friendly backpacking trip through Thailand's beaches, jungles, and cities.",
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Full Moon Party", "Elephant Sanctuary", "Island Hopping", "Street Food Tour"],
    status: "planning",
    createdAt: "2023-06-10T11:45:00Z"
  },
  {
    id: 4,
    title: "Italian Food Tour",
    destination: "Italy",
    startDate: "2023-10-01T00:00:00Z",
    endDate: "2023-10-12T00:00:00Z",
    creatorId: 5,
    participants: [5, 2],
    maxParticipants: 4,
    description: "A culinary journey through Italy, focusing on regional specialties and cooking classes.",
    image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Pasta Making Class", "Wine Tasting", "Truffle Hunting", "Market Tours"],
    status: "planning",
    createdAt: "2023-05-05T09:20:00Z"
  },
  {
    id: 5,
    title: "Iceland Road Trip",
    destination: "Iceland",
    startDate: "2024-03-15T00:00:00Z",
    endDate: "2024-03-25T00:00:00Z",
    creatorId: 2,
    participants: [2],
    maxParticipants: 3,
    description: "Road trip around Iceland's Ring Road, chasing waterfalls and northern lights.",
    image: "https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Northern Lights", "Blue Lagoon", "Golden Circle", "Glacier Hiking"],
    status: "planning",
    createdAt: "2023-07-01T15:30:00Z"
  },
  // Adding group trips and highlighted trips as mentioned in README
  {
    id: 6,
    title: "Jambo Jambo Safari Adventure", // Partnership with Jambo Jambo Tours mentioned in README
    destination: "Maasai Mara, Kenya",
    startDate: "2024-08-15T00:00:00Z",
    endDate: "2024-08-25T00:00:00Z",
    creatorId: 6,
    participants: [6, 7, 8],
    maxParticipants: 8,
    description: "Experience the Great Migration with professional guides from Jambo Jambo Tours. This highlighted trip includes luxury safari lodges, game drives, and cultural visits to Maasai villages.",
    image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Game Drives", "Maasai Village Visit", "Hot Air Balloon", "Wildlife Photography", "Bush Breakfast"],
    status: "active",
    isHighlighted: true, // Featured trip
    isGroupTrip: true,
    partnershipInfo: {
      partner: "Jambo Jambo Tours",
      verified: true,
      specialOffers: ["Professional guide included", "Luxury lodge accommodation", "All meals included"]
    },
    createdAt: "2023-06-20T10:15:00Z"
  },
  {
    id: 7,
    title: "Arctic Aurora Expedition",
    destination: "Tromsø, Norway",
    startDate: "2024-12-10T00:00:00Z",
    endDate: "2024-12-20T00:00:00Z",
    creatorId: 9,
    participants: [9, 10, 1],
    maxParticipants: 6,
    description: "Chase the Northern Lights in the Arctic wilderness. This group expedition includes dog sledding, ice hotels, and professional aurora photography workshops.",
    image: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Northern Lights", "Dog Sledding", "Ice Hotel", "Photography Workshop", "Reindeer Farm"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    createdAt: "2023-08-05T15:30:00Z"
  },
  {
    id: 8,
    title: "Tango & Wine in Argentina",
    destination: "Buenos Aires & Mendoza, Argentina",
    startDate: "2024-11-05T00:00:00Z",
    endDate: "2024-11-18T00:00:00Z",
    creatorId: 7,
    participants: [7, 2, 5],
    maxParticipants: 10,
    description: "Immerse yourself in Argentine culture with tango lessons in Buenos Aires and wine tasting in Mendoza. Perfect for cultural enthusiasts and food lovers.",
    image: "https://images.pexels.com/photos/2884866/pexels-photo-2884866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Tango Lessons", "Wine Tasting", "Steak Houses", "Football Match", "Glacier Excursion"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    createdAt: "2023-09-12T12:45:00Z"
  },
  {
    id: 9,
    title: "Tech & Tradition in Asia",
    destination: "Tokyo, Seoul & Shanghai",
    startDate: "2024-10-01T00:00:00Z",
    endDate: "2024-10-21T00:00:00Z",
    creatorId: 8,
    participants: [8, 4, 6],
    maxParticipants: 5,
    description: "Explore the perfect blend of cutting-edge technology and ancient traditions across three Asian megacities. Digital nomad friendly with co-working spaces included.",
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Tech Museums", "Temple Visits", "Street Food Tours", "Co-working Spaces", "Traditional Crafts"],
    status: "planning",
    isGroupTrip: true,
    createdAt: "2023-07-28T14:20:00Z"
  },
  {
    id: 10,
    title: "Spiritual Journey Through India",
    destination: "Delhi, Rishikesh & Varanasi, India",
    startDate: "2024-02-15T00:00:00Z",
    endDate: "2024-03-05T00:00:00Z",
    creatorId: 10,
    participants: [10, 3, 9],
    maxParticipants: 8,
    description: "Transform your mind, body, and spirit on this wellness retreat through India's most sacred destinations. Includes yoga sessions, meditation, and Ayurvedic treatments.",
    image: "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Yoga Classes", "Meditation", "Ayurvedic Spa", "Ganges Ceremony", "Ashram Stay"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    createdAt: "2023-10-10T09:30:00Z"
  },
  // Additional partnership trips
  {
    id: 11,
    title: "Amazon Adventure with EcoPeru",
    destination: "Iquitos, Peru",
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-06-10T00:00:00Z",
    creatorId: 6,
    participants: [6, 4, 8],
    maxParticipants: 6,
    description: "Explore the Amazon rainforest with certified eco-guides from EcoPeru. This sustainable tourism initiative includes wildlife spotting, indigenous community visits, and conservation education.",
    image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Jungle Trekking", "Wildlife Spotting", "River Cruise", "Community Visit", "Conservation Workshop"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    partnershipInfo: {
      partner: "EcoPeru Adventures",
      verified: true,
      specialOffers: ["Certified eco-guides", "Carbon-neutral travel", "20% profits to conservation"]
    },
    createdAt: "2023-09-15T11:20:00Z"
  },
  {
    id: 12,
    title: "Nomad Hub: Bali Digital Retreat",
    destination: "Canggu, Bali",
    startDate: "2024-04-15T00:00:00Z",
    endDate: "2024-05-15T00:00:00Z",
    creatorId: 8,
    participants: [8, 4, 7, 5],
    maxParticipants: 12,
    description: "Work remotely from paradise with NomadSpace Bali. Premium co-working spaces, networking events, and weekend adventures included in this month-long digital nomad experience.",
    image: "https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Co-working Sessions", "Networking Events", "Surf Lessons", "Temple Tours", "Rice Terrace Walks"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    partnershipInfo: {
      partner: "NomadSpace Bali",
      verified: true,
      specialOffers: ["Premium co-working access", "Welcome networking dinner", "Free surf lessons"]
    },
    createdAt: "2023-11-20T14:30:00Z"
  },
  {
    id: 13,
    title: "Culinary Masters: France",
    destination: "Lyon & Provence, France",
    startDate: "2024-09-10T00:00:00Z",
    endDate: "2024-09-20T00:00:00Z",
    creatorId: 5,
    participants: [5, 2, 7, 9],
    maxParticipants: 8,
    description: "Master French cuisine with Michelin-starred chefs through La Cuisine Academy. Professional cooking classes, market tours, and wine pairings in the gastronomic capital of France.",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Michelin Chef Classes", "Market Tours", "Wine Pairing", "Bakery Workshops", "Farm Visits"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    partnershipInfo: {
      partner: "La Cuisine Academy",
      verified: true,
      specialOffers: ["Michelin-starred chef instruction", "Professional certificates", "Exclusive wine tastings"]
    },
    createdAt: "2023-12-05T16:45:00Z"
  },
  {
    id: 14,
    title: "Great Wall Trek Challenge",
    destination: "Beijing & Mutianyu, China",
    startDate: "2024-05-20T00:00:00Z",
    endDate: "2024-05-30T00:00:00Z",
    creatorId: 8,
    participants: [8, 1, 6, 3],
    maxParticipants: 10,
    description: "Conquer the Great Wall with professional trekking guides from Beijing Adventure Club. This challenging expedition includes camping on the wall and sunrise photography sessions.",
    image: "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Great Wall Trekking", "Wall Camping", "Sunrise Photography", "Cultural Workshops", "Forbidden City Tour"],
    status: "planning",
    isHighlighted: true,
    isGroupTrip: true,
    partnershipInfo: {
      partner: "Beijing Adventure Club",
      verified: true,
      specialOffers: ["Professional trekking guides", "Camping equipment included", "Cultural immersion program"]
    },
    createdAt: "2024-01-10T08:15:00Z"
  },
  {
    id: 15,
    title: "Fjords & Northern Lights",
    destination: "Bergen & Lofoten, Norway",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-01-25T00:00:00Z",
    creatorId: 9,
    participants: [9, 2, 6],
    maxParticipants: 6,
    description: "Experience Norway's dramatic fjords and hunt for the Northern Lights with Nordic Explorer. Winter activities include dog sledding, ice fishing, and traditional Sami culture experiences.",
    image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    activities: ["Fjord Cruises", "Northern Lights Hunt", "Dog Sledding", "Ice Fishing", "Sami Culture"],
    status: "active",
    isHighlighted: true,
    isGroupTrip: true,
    partnershipInfo: {
      partner: "Nordic Explorer",
      verified: true,
      specialOffers: ["Expert northern lights guides", "Traditional Sami experiences", "Winter survival training"]
    },
    createdAt: "2023-10-25T13:20:00Z"
  }
];

// Mock Matches
export const matches: Match[] = [
  {
    id: 1,
    userId: 1,
    matchedUserId: 2,
    tripId: 1,
    compatibilityScore: 85,
    status: 'pending',
    createdAt: "2023-04-20T10:15:00Z"
  },
  {
    id: 2,
    userId: 1,
    matchedUserId: 3,
    tripId: 1,
    compatibilityScore: 92,
    status: 'accepted',
    createdAt: "2023-04-22T14:30:00Z"
  },
  {
    id: 3,
    userId: 4,
    matchedUserId: 5,
    tripId: 2,
    compatibilityScore: 78,
    status: 'accepted',
    createdAt: "2023-05-25T09:45:00Z"
  },
  {
    id: 4,
    userId: 2,
    matchedUserId: 5,
    tripId: 4,
    compatibilityScore: 88,
    status: 'accepted',
    createdAt: "2023-05-10T16:20:00Z"
  },
  {
    id: 5,
    userId: 3,
    matchedUserId: 4,
    tripId: 5,
    compatibilityScore: 75,
    status: 'pending',
    createdAt: "2023-06-15T11:10:00Z"
  }
];

// Mock Chats
export const chats: Chat[] = [
  {
    id: 1,
    participants: [1, 3],
    messages: [],
    lastActivity: "2023-04-22T14:30:00Z",
    unreadCount: 0
  },
  {
    id: 2,
    participants: [4, 5],
    messages: [],
    lastActivity: "2023-05-25T09:45:00Z",
    unreadCount: 0
  },
  {
    id: 3,
    participants: [2, 5],
    messages: [],
    lastActivity: "2023-05-10T16:20:00Z",
    unreadCount: 0
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: 1,
    chatId: 1,
    senderId: 1,
    content: "Hey Marco! Excited to plan our Barcelona trip together.",
    timestamp: "2023-04-22T14:30:00Z",
    read: true
  },
  {
    id: 2,
    chatId: 1,
    senderId: 3,
    content: "Hi Alex! Me too. I've been to Barcelona before, so I can suggest some places.",
    timestamp: "2023-04-22T14:32:00Z",
    read: true
  },
  {
    id: 3,
    chatId: 1,
    senderId: 1,
    content: "That would be great! Any recommendations for where to stay?",
    timestamp: "2023-04-22T14:35:00Z",
    read: true
  },
  {
    id: 4,
    chatId: 1,
    senderId: 3,
    content: "El Born area is nice, central and has lots of great restaurants.",
    timestamp: "2023-04-22T14:40:00Z",
    read: true
  },
  {
    id: 5,
    chatId: 2,
    senderId: 4,
    content: "David, have you booked your flight to Tokyo yet?",
    timestamp: "2023-05-25T09:45:00Z",
    read: true
  },
  {
    id: 6,
    chatId: 2,
    senderId: 5,
    content: "Not yet, I'm looking at options. Found any good deals?",
    timestamp: "2023-05-25T09:48:00Z",
    read: true
  },
  {
    id: 7,
    chatId: 2,
    senderId: 4,
    content: "I found a good deal with JAL. I'll send you the link.",
    timestamp: "2023-05-25T09:50:00Z",
    read: false
  },
  {
    id: 8,
    chatId: 3,
    senderId: 2,
    content: "Hi David! Looking forward to our Italian food adventure!",
    timestamp: "2023-05-10T16:20:00Z",
    read: true
  },
  {
    id: 9,
    chatId: 3,
    senderId: 5,
    content: "Sophia! Yes, I've been researching some amazing restaurants in Rome.",
    timestamp: "2023-05-10T16:25:00Z",
    read: true
  },
  {
    id: 10,
    chatId: 3,
    senderId: 2,
    content: "Perfect! I'm particularly interested in trying authentic carbonara.",
    timestamp: "2023-05-10T16:30:00Z",
    read: false
  }
];

// Link messages to chats
chats.forEach(chat => {
  chat.messages = messages.filter(message => message.chatId === chat.id);
});

// Mock Accommodations
export const accommodations: Accommodation[] = [
  {
    id: 1,
    name: "Seaside Boutique Hotel",
    location: "Barcelona, Spain",
    pricePerNight: 120,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Stylish boutique hotel located just 5 minutes from the beach with rooftop pool and bar.",
    amenities: ["WiFi", "Pool", "Air Conditioning", "Breakfast", "Bar"],
    rating: 4.8,
    reviewCount: 127,
    type: "hotel",
    availableDates: [{ start: "2023-07-01", end: "2023-07-30" }]
  },
  {
    id: 2,
    name: "Modern City Apartment",
    location: "Tokyo, Japan",
    pricePerNight: 95,
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Compact but modern apartment in the heart of Shinjuku, perfect for exploring the city.",
    amenities: ["WiFi", "Kitchen", "Washing Machine", "Air Conditioning"],
    rating: 4.5,
    reviewCount: 89,
    type: "apartment",
    availableDates: [{ start: "2023-09-01", end: "2023-09-30" }]
  },
  {
    id: 3,
    name: "Beachfront Hostel",
    location: "Koh Phangan, Thailand",
    pricePerNight: 25,
    images: [
      "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Budget-friendly hostel with private and shared rooms, right on the beach with vibrant social atmosphere.",
    amenities: ["WiFi", "Shared Kitchen", "Bar", "Beach Access", "Tours"],
    rating: 4.2,
    reviewCount: 215,
    type: "hostel",
    availableDates: [{ start: "2023-11-01", end: "2023-12-31" }]
  },
  {
    id: 4,
    name: "Tuscan Villa Guesthouse",
    location: "Florence, Italy",
    pricePerNight: 150,
    images: [
      "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3773577/pexels-photo-3773577.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Charming guesthouse in a renovated villa with garden views and authentic Italian atmosphere.",
    amenities: ["WiFi", "Breakfast", "Garden", "Air Conditioning", "Parking"],
    rating: 4.9,
    reviewCount: 73,
    type: "guesthouse",
    availableDates: [{ start: "2023-10-01", end: "2023-10-31" }]
  },
  {
    id: 5,
    name: "Northern Lights Lodge",
    location: "Reykjavik, Iceland",
    pricePerNight: 180,
    images: [
      "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3735133/pexels-photo-3735133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    description: "Cozy lodge with panoramic windows perfect for viewing the Northern Lights. Hot tub and sauna included.",
    amenities: ["WiFi", "Hot Tub", "Sauna", "Breakfast", "Tour Desk"],
    rating: 4.7,
    reviewCount: 108,
    type: "hotel",
    availableDates: [{ start: "2024-01-01", end: "2024-04-30" }]
  }
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: 1,
    userId: 1,
    accommodationId: 1,
    checkIn: "2023-07-10",
    checkOut: "2023-07-20",
    guests: 2,
    totalPrice: 1200,
    status: "confirmed",
    createdAt: "2023-05-15T09:30:00Z"
  },
  {
    id: 2,
    userId: 4,
    accommodationId: 2,
    checkIn: "2023-09-05",
    checkOut: "2023-09-15",
    guests: 2,
    totalPrice: 950,
    status: "confirmed",
    createdAt: "2023-06-20T11:15:00Z"
  },
  {
    id: 3,
    userId: 3,
    accommodationId: 3,
    checkIn: "2023-11-10",
    checkOut: "2023-11-20",
    guests: 1,
    totalPrice: 250,
    status: "pending",
    createdAt: "2023-07-05T14:45:00Z"
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    type: "match",
    title: "New Match!",
    message: "You have a new match with Sophia for your Barcelona trip!",
    read: false,
    timestamp: "2023-04-20T10:15:00Z",
    actionLink: "/matches/1"
  },
  {
    id: 2,
    userId: 1,
    type: "trip",
    title: "Trip Update",
    message: "Marco has joined your Barcelona trip!",
    read: true,
    timestamp: "2023-04-22T14:30:00Z",
    actionLink: "/trips/1"
  },
  {
    id: 3,
    userId: 3,
    type: "message",
    title: "New Message",
    message: "You have a new message from Alex about your Barcelona trip!",
    read: false,
    timestamp: "2023-04-22T14:35:00Z",
    actionLink: "/chats/1"
  },
  {
    id: 4,
    userId: 4,
    type: "match",
    title: "New Match!",
    message: "You have a new match with David for your Tokyo trip!",
    read: true,
    timestamp: "2023-05-25T09:45:00Z",
    actionLink: "/matches/3"
  },
  {
    id: 5,
    userId: 2,
    type: "system",
    title: "Welcome to Travel Buddy",
    message: "Thanks for joining Travel Buddy! Complete your profile to find travel companions.",
    read: false,
    timestamp: "2023-02-18T14:45:00Z",
    actionLink: "/profile"
  },
  // Enhanced notifications for better social features
  {
    id: 6,
    userId: 1,
    type: "safety",
    title: "Safety Check-in Reminder",
    message: "Your Barcelona trip starts tomorrow. Don't forget to check in with our safety feature!",
    read: false,
    timestamp: "2024-01-09T09:00:00Z",
    actionLink: "/trips/1"
  },
  {
    id: 7,
    userId: 1,
    type: "partnership",
    title: "New Partnership Opportunity",
    message: "Jambo Jambo Tours has a special offer for your upcoming safari trip!",
    read: false,
    timestamp: "2024-01-08T14:30:00Z",
    actionLink: "/trips/6"
  },
  {
    id: 8,
    userId: 1,
    type: "review",
    title: "Please Leave a Review",
    message: "How was your experience with Marco on the Barcelona trip? Help others by leaving a review.",
    read: false,
    timestamp: "2024-01-07T16:20:00Z",
    actionLink: "/reviews/create?user=3&trip=1"
  },
  {
    id: 9,
    userId: 1,
    type: "verification",
    title: "Profile Verification Available",
    message: "Increase your trustworthiness by verifying your profile with ID verification.",
    read: true,
    timestamp: "2024-01-06T10:15:00Z",
    actionLink: "/profile/verification"
  },
  {
    id: 10,
    userId: 1,
    type: "expense",
    title: "Trip Expense Added",
    message: "Marco added a new expense of €45 for dinner to your Barcelona trip.",
    read: false,
    timestamp: "2024-01-05T19:30:00Z",
    actionLink: "/trips/1/expenses"
  },
  {
    id: 11,
    userId: 1,
    type: "group",
    title: "Group Trip Invitation",
    message: "You've been invited to join the 'Arctic Aurora Expedition' group trip!",
    read: false,
    timestamp: "2024-01-04T12:45:00Z",
    actionLink: "/trips/7"
  },
  {
    id: 12,
    userId: 1,
    type: "accommodation",
    title: "Booking Confirmation",
    message: "Your accommodation booking at Seaside Boutique Hotel has been confirmed!",
    read: true,
    timestamp: "2024-01-03T15:20:00Z",
    actionLink: "/accommodations/1"
  },
  {
    id: 13,
    userId: 1,
    type: "promotion",
    title: "Limited Time Offer",
    message: "Get 20% off your next accommodation booking through our partner hotels!",
    read: false,
    timestamp: "2024-01-02T08:00:00Z",
    actionLink: "/accommodations?promo=WINTER20"
  },
  {
    id: 14,
    userId: 1,
    type: "community",
    title: "Community Milestone",
    message: "Travel Buddy just reached 10,000 successful trips! Thank you for being part of our community.",
    read: false,
    timestamp: "2024-01-01T12:00:00Z",
    actionLink: "/community"
  },
  {
    id: 15,
    userId: 1,
    type: "weather",
    title: "Weather Alert",
    message: "Weather update for your upcoming Tokyo trip: Expect sunny skies with 22°C average temperature.",
    read: false,
    timestamp: "2023-12-31T07:00:00Z",
    actionLink: "/trips/2/weather"
  }
];

// Mock Current User (for authentication purposes)
export const currentUser = users[0]; // Using Alex as the current user