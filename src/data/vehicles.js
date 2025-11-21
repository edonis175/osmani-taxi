// Shared vehicles data for use across the application
export const vehicles = [
  {
    type: "Red Golf II Taxi",
    image: require("../assets/images/Red-Golf-2.jpg"),
    description:
      "Our iconic Red Golf II taxis provide reliable and comfortable transportation for everyday needs. These well-maintained vehicles are perfect for city travel with their compact size and efficient performance.",
    features: [
      "4 passengers maximum",
      "2 large luggage pieces",
      "Air conditioning",
      "Professional driver",
      "Fuel-efficient engine",
      "Easy city maneuverability",
    ],
    price: "€1.00/km",
    gradient: "from-red-500 to-orange-500",
    badge: "Classic Choice",
  },
  {
    type: "Mercedes Benz C220",
    image: require("../assets/images/Mercedes-Benz.png"),
    description:
      "Experience luxury transportation with our Mercedes Benz C220. Featuring premium interiors, advanced comfort systems, and professional chauffeur service for discerning customers.",
    features: [
      "4 passengers in luxury",
      "3 large luggage pieces",
      "Premium leather seats",
      "Wi-Fi and charging ports",
      "Climate control system",
      "Professional chauffeur",
    ],
    price: "€2.50/km",
    gradient: "from-gray-700 to-gray-900",
    badge: "Luxury Choice",
  },
  {
    type: "Family Luxury Minivan",
    image: require("../assets/images/Minivan.png"),
    description:
      "Spacious luxury minivans designed for families and groups, combining comfort with ample space for all your needs.",
    features: [
      "7-8 passengers comfortably",
      "5+ large luggage pieces",
      "Individual climate control",
      "Entertainment system",
      "Ample legroom",
      "Child safety features",
    ],
    price: "€2.20/km",
    gradient: "from-green-500 to-emerald-400",
    badge: "Family Favorite",
  },
  {
    type: "Premium All-Terrain SUV",
    image: require("../assets/images/All-Terrain-SUV.png"),
    description:
      "Conquer any terrain in style with our premium SUVs, perfect for adventures and challenging weather conditions.",
    features: [
      "5-7 passengers",
      "4 large luggage pieces",
      "All-wheel drive capability",
      "Premium sound system",
      "Advanced safety features",
      "Roof rack for extra storage",
    ],
    price: "€2.00/km",
    gradient: "from-orange-500 to-red-400",
    badge: "Adventure Ready",
  },
  {
    type: "Standard Taxi Sedan",
    image: require("../assets/images/Sedan-taxi.jpg"),
    description:
      "Reliable and comfortable standard taxi service for everyday transportation needs. Clean, well-maintained vehicles for your convenience.",
    features: [
      "4 passengers",
      "2 large luggage pieces",
      "Air conditioning",
      "Professional driver",
      "Clean interior",
      "On-time service guarantee",
    ],
    price: "€1.20/km",
    gradient: "from-blue-500 to-cyan-400",
    badge: "Best Value",
  },
  {
    type: "Executive Business Sedan",
    image: require("../assets/images/Bussines-Sedan-Taxi.png"),
    description:
      "Elevate your business travel with our executive sedans featuring premium leather interiors and advanced connectivity.",
    features: [
      "4 passengers in luxury",
      "3 large luggage pieces",
      "Premium leather seats",
      "Business-class Wi-Fi",
      "Mobile office setup",
      "Professional chauffeur",
    ],
    price: "€1.80/km",
    gradient: "from-purple-500 to-indigo-400",
    badge: "Executive Choice",
  },
];
