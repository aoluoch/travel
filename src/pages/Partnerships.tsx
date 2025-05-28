import { useState } from 'react';
import { Star, MapPin, Users, Calendar, Shield, Award, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  specialization: string[];
  destinations: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  established: string;
  highlights: string[];
  image: string;
  offers: string[];
  contactInfo: {
    website: string;
    email: string;
    phone: string;
  };
}

const Partnerships = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const partners: Partner[] = [
    {
      id: 1,
      name: "Jambo Jambo Tours",
      logo: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      description: "Premium safari experiences across East Africa with professional guides and luxury accommodations.",
      specialization: ["Safari Tours", "Wildlife Photography", "Cultural Experiences"],
      destinations: ["Kenya", "Tanzania", "Uganda", "Rwanda"],
      rating: 4.9,
      reviewCount: 1247,
      verified: true,
      established: "2015",
      highlights: [
        "Professional wildlife photographers as guides",
        "Luxury safari lodges and camps",
        "Small group sizes (max 8 people)",
        "Conservation-focused tourism"
      ],
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      offers: [
        "15% discount for Travel Buddy users",
        "Free photography workshop",
        "Complimentary airport transfers",
        "All meals included"
      ],
      contactInfo: {
        website: "www.jambojambo.com",
        email: "info@jambojambo.com",
        phone: "+254 700 123 456"
      }
    },
    {
      id: 2,
      name: "EcoPeru Adventures",
      logo: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      description: "Sustainable Amazon rainforest expeditions with indigenous community partnerships.",
      specialization: ["Eco Tourism", "Amazon Expeditions", "Community Tourism"],
      destinations: ["Peru", "Ecuador", "Colombia", "Brazil"],
      rating: 4.8,
      reviewCount: 892,
      verified: true,
      established: "2012",
      highlights: [
        "20% of profits support local communities",
        "Certified eco-guides",
        "Carbon-neutral expeditions",
        "Authentic cultural exchanges"
      ],
      image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      offers: [
        "Carbon offset included",
        "Community craft workshops",
        "Medicinal plant education",
        "River transportation included"
      ],
      contactInfo: {
        website: "www.ecoperu.com",
        email: "reservas@ecoperu.com",
        phone: "+51 984 123 456"
      }
    },
    {
      id: 3,
      name: "NomadSpace Bali",
      logo: "https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      description: "Premium co-working spaces and digital nomad community hubs across Southeast Asia.",
      specialization: ["Digital Nomad", "Co-working", "Networking"],
      destinations: ["Bali", "Thailand", "Vietnam", "Malaysia"],
      rating: 4.7,
      reviewCount: 2156,
      verified: true,
      established: "2018",
      highlights: [
        "High-speed internet guaranteed",
        "24/7 co-working access",
        "Weekly networking events",
        "Mentor program for entrepreneurs"
      ],
      image: "https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      offers: [
        "First week 50% off",
        "Free welcome networking dinner",
        "Complimentary surf lessons",
        "Airport pickup service"
      ],
      contactInfo: {
        website: "www.nomadspace.co",
        email: "hello@nomadspace.co",
        phone: "+62 361 123 456"
      }
    },
    {
      id: 4,
      name: "La Cuisine Academy",
      logo: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      description: "Michelin-starred chef instruction and authentic French culinary experiences.",
      specialization: ["Culinary Tours", "Cooking Classes", "Wine Education"],
      destinations: ["France", "Italy", "Spain", "Portugal"],
      rating: 4.9,
      reviewCount: 687,
      verified: true,
      established: "2010",
      highlights: [
        "Michelin-starred chef instructors",
        "Professional certification available",
        "Market tours and wine pairings",
        "Small class sizes (max 12)"
      ],
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      offers: [
        "Professional certificate included",
        "Recipe collection provided",
        "Wine pairing masterclass",
        "Local market tour"
      ],
      contactInfo: {
        website: "www.lacuisine.fr",
        email: "info@lacuisine.fr",
        phone: "+33 4 1234 5678"
      }
    },
    {
      id: 5,
      name: "Nordic Explorer",
      logo: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      description: "Arctic adventures and Northern Lights expeditions across Scandinavia.",
      specialization: ["Arctic Tours", "Northern Lights", "Winter Activities"],
      destinations: ["Norway", "Iceland", "Finland", "Sweden"],
      rating: 4.8,
      reviewCount: 1034,
      verified: true,
      established: "2013",
      highlights: [
        "Expert Aurora guides",
        "Traditional Sami experiences",
        "Winter survival training",
        "Dog sledding adventures"
      ],
      image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      offers: [
        "Aurora photography workshop",
        "Traditional Sami dinner",
        "Winter gear provided",
        "Husky sledding experience"
      ],
      contactInfo: {
        website: "www.nordicexplorer.no",
        email: "booking@nordicexplorer.no",
        phone: "+47 123 45 678"
      }
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Globe className="w-8 h-8 mr-3 text-primary-600" />
          Travel Partnerships
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing experiences with our verified travel partners. From luxury safaris 
          to digital nomad co-working spaces, we've partnered with the best in the industry.
        </p>
      </div>

      {/* Partnership Benefits */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Verified Partners</h3>
                <p className="text-gray-600 text-sm">All partners are thoroughly vetted for quality and safety standards.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Award className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Exclusive Offers</h3>
                <p className="text-gray-600 text-sm">Get special discounts and perks available only to Travel Buddy users.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="w-6 h-6 text-purple-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Community Support</h3>
                <p className="text-gray-600 text-sm">Connect with other travelers who've used our partner services.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={partner.image}
                alt={partner.name}
                className="h-full w-full object-cover"
              />
              {partner.verified && (
                <div className="absolute top-4 right-4">
                  <Badge variant="success" className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{renderStars(partner.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {partner.rating} ({partner.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3">{partner.description}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {partner.specialization.slice(0, 2).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {partner.specialization.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{partner.specialization.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{partner.destinations.slice(0, 2).join(', ')}</span>
                  {partner.destinations.length > 2 && (
                    <span> +{partner.destinations.length - 2} more</span>
                  )}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Established {partner.established}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => setSelectedPartner(partner)}
              >
                View Details & Offers
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedPartner.image}
                alt={selectedPartner.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPartner.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{renderStars(selectedPartner.rating)}</div>
                    <span className="text-gray-600">
                      {selectedPartner.rating} ({selectedPartner.reviewCount} reviews)
                    </span>
                    <Badge variant="success" className="ml-2">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Partner
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{selectedPartner.description}</p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Highlights</h3>
                <div className="space-y-2">
                  {selectedPartner.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="w-4 h-4 text-primary-600 mr-2 mt-0.5" />
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Exclusive Offers for Travel Buddy Users</h3>
                <div className="space-y-2">
                  {selectedPartner.offers.map((offer, index) => (
                    <div key={index} className="flex items-start">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                      <span className="text-gray-700 text-sm">{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Website:</strong> {selectedPartner.contactInfo.website}</p>
                  <p><strong>Email:</strong> {selectedPartner.contactInfo.email}</p>
                  <p><strong>Phone:</strong> {selectedPartner.contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">
                  Book with Partner
                </Button>
                <Button variant="outline" className="flex-1">
                  Contact Partner
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partnerships;
