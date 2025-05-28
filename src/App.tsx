import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";

// Layouts
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Main Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Safety from "./pages/Safety";
import Reviews from "./pages/Reviews";
import Partnerships from "./pages/Partnerships";
import Trips from "./pages/trips/Trips";
import TripDetails from "./pages/trips/TripDetails";
import CreateTrip from "./pages/trips/CreateTrip";
import Matches from "./pages/matches/Matches";
import Chats from "./pages/chats/Chats";
import ChatRoom from "./pages/chats/ChatRoom";
import Accommodations from "./pages/accommodations/Accommodations";
import AccommodationDetails from "./pages/accommodations/AccommodationDetails";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Public */}
          <Route path="/" element={<Landing />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Main Routes - Protected */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/trips/create" element={<CreateTrip />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/:id" element={<ChatRoom />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route
              path="/accommodations/:id"
              element={<AccommodationDetails />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
