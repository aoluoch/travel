import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  Users,
  MapPin,
  MessageSquare,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Travel Matching",
      description:
        "Connect with like-minded travelers visiting the same destinations",
    },
    {
      icon: MapPin,
      title: "Trip Planning",
      description: "Create, manage and share your travel itineraries with ease",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Communicate with potential travel companions instantly",
    },
    {
      icon: Shield,
      title: "Safe & Verified",
      description: "All users are verified for a safe travel experience",
    },
  ];

  const stats = [
    { number: "10K+", label: "Travelers Connected" },
    { number: "50+", label: "Countries Covered" },
    { number: "500+", label: "Trips Created Monthly" },
    { number: "4.8★", label: "Average Rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      text: "Found my perfect travel buddy for a trip to Japan. Best decision ever!",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      name: "Marco Silva",
      location: "Barcelona, Spain",
      text: "The matching algorithm is incredible. Met amazing people with similar interests.",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      name: "Emily Chen",
      location: "Toronto, Canada",
      text: "From solo traveler to group explorer. This platform changed how I travel.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                Travel Buddy
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-primary-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-primary-600"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-primary-600"
              >
                Stories
              </a>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary-600"
              >
                Sign In
              </Link>
              <Button onClick={() => navigate("/register")} size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button - simplified for now */}
            <div className="md:hidden">
              <Button onClick={() => navigate("/register")} size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-primary-600 block">Travel Companion</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with like-minded travelers, plan amazing trips together,
              and create unforgettable memories. Your next adventure is just a
              match away.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="px-8 py-4 text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="px-8 py-4 text-lg"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary-600">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Amazing Trips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From finding the perfect travel buddy to booking accommodations,
              we've got everything covered in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Travel Buddy Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to find your perfect travel companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Tell us about your travel style, interests, and dream
                destinations. Our smart algorithm will use this to find perfect
                matches.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Matched
              </h3>
              <p className="text-gray-600">
                Browse potential travel companions or create a trip and let
                others find you. Connect with people heading to the same
                destinations.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Plan & Travel
              </h3>
              <p className="text-gray-600">
                Plan your trip together, book accommodations, and embark on an
                unforgettable adventure with your new travel buddies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travelers Love Travel Buddy
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from our amazing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Travel Buddy?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect companions.
            Your next adventure starts here.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/register")}
            className="px-8 py-4 text-lg"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-bold">Travel Buddy</span>
              </div>
              <p className="text-gray-400">
                Connecting travelers worldwide for amazing adventures.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link
                  to="/trips"
                  className="block text-gray-400 hover:text-white"
                >
                  Find Trips
                </Link>
                <Link
                  to="/matches"
                  className="block text-gray-400 hover:text-white"
                >
                  Travel Buddies
                </Link>
                <Link
                  to="/accommodations"
                  className="block text-gray-400 hover:text-white"
                >
                  Accommodations
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Careers
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Terms of Service
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Safety
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Travel Buddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
