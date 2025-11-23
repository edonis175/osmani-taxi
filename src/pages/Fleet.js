import React, { useState, useEffect } from "react";
import {
  useScrollAnimation,
  getAnimationClasses,
  getAnimationStyle,
} from "../hooks/useScrollAnimation";
import ScrollToTopButton from "../contexts/ScrollToTopButton";
import ScrollDownButton from "../contexts/ScrollDownButton";
import { vehicles } from "../data/vehicles";

// Counter animation component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          const startTime = Date.now();
          const startValue = 0;

          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(
              startValue + (end - startValue) * easeOutCubic
            );

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          updateCount();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-fleet-${end}-${suffix}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, suffix, hasStarted]);

  return (
    <span id={`counter-fleet-${end}-${suffix}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

// Popup Booking Form Component
const BookingPopup = ({ vehicle, isOpen, onClose, onSubmit }) => {
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    location: "",
    destination: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...bookingData, vehicleType: vehicle.type });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Book Your Ride</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center">
              <img
                src={vehicle.image}
                alt={vehicle.type}
                className="w-24 h-24 object-cover rounded-xl mr-6"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {vehicle.type}
                </h3>
                <p className="text-xl font-semibold text-gray-700">
                  {vehicle.price}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={bookingData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pickup location"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={bookingData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter destination"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={bookingData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-6 py-4 bg-gradient-to-r ${vehicle.gradient} text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl`}
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Vehicle Details Popup Component
const VehicleDetailsPopup = ({ vehicle, isOpen, onClose, onBookNow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{vehicle.type}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="mb-8">
            <img
              src={vehicle.image}
              alt={vehicle.type}
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Description
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <svg
                    className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {vehicle.price}
            </div>
            <button
              onClick={() => onBookNow(vehicle)}
              className={`px-8 py-4 bg-gradient-to-r ${vehicle.gradient} text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:scale-105`}
            >
              Book This Car Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Fleet = () => {
  const visibleItems = useScrollAnimation();
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  // State for tracking expanded cards
  const [expandedCards, setExpandedCards] = useState({
    digital: false,
    comfort: false,
    support: false,
  });

  const standards = [
    {
      title: "24/7 Maintenance",
      description:
        "Our vehicles undergo rigorous daily inspections and maintenance to ensure peak performance and your safety at all times.",
      stat: "365 Days",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Professional Drivers",
      description:
        "All our drivers are professionally trained, licensed, and undergo regular performance evaluations to maintain our high service standards.",
      stat: "100% Certified",
      gradient: "from-purple-500 to-indigo-400",
    },
    {
      title: "Premium Cleanliness",
      description:
        "Every vehicle is professionally detailed daily with hospital-grade disinfection to ensure a pristine environment for every ride.",
      stat: "Daily Cleaning",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      title: "Real-time Tracking",
      description:
        "Advanced GPS tracking systems provide real-time vehicle location updates and estimated arrival times for complete transparency.",
      stat: "Live Updates",
      gradient: "from-orange-500 to-red-400",
    },
  ];

  const contactInfo = [
    {
      icon: "📞",
      title: "Call Us Directly",
      details: ["+383 44 123 456"],
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: "📍",
      title: "Visit Our Office",
      details: ["123 Taxi Street, Pristina"],
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: "✉️",
      title: "Send Us an Email",
      details: ["info@kosova.com"],
      gradient: "from-purple-500 to-indigo-400",
    },
    {
      icon: "🌏",
      title: "Open Hours",
      details: ["Mon-Fri: 8AM - 8PM", "Sat-Sun: 9AM - 7PM"],
      gradient: "from-orange-500 to-red-400",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleBookVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowBookingPopup(true);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsPopup(true);
  };

  const handleBookNowFromDetails = (vehicle) => {
    setShowDetailsPopup(false);
    handleBookVehicle(vehicle);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log("Booking submitted:", bookingData);
    // Here you would typically send the data to your backend
    setShowBookingPopup(false);
    setShowNotification(true);

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Function to toggle card expansion
  const toggleCardExpansion = (cardType) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardType]: !prev[cardType],
    }));
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${require("../assets/images/Mercedes-Banner.jpg")})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/25 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight animate-fade-in-left`}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              <span className="text-white">Fleet</span>
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light leading-relaxed px-2 animate-fade-in-right`}
            >
              KOSOVA's Most Luxurious Vehicle Collection
            </p>
            <p
              className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed px-4 animate-fade-in-left`}
            >
              Experience unparalleled comfort and style with our meticulously
              maintained fleet of premium vehicles, each designed to exceed your
              expectations for luxury transportation.
            </p>

            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 px-4 animate-fade-in-up`}
            >
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={200} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Premium Vehicles
                </div>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Safety Certified
                </div>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Maintenance
                </div>
              </div>
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pink-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={5} suffix="/5" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  Fleet Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton targetId="fleet-section" />
      </div>

      {/* Vehicle Showcase */}
      <section
        id="fleet-section"
        className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23000000" fill-opacity="1"><circle cx="30" cy="30" r="4"/></g></g></svg>')`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="scroll-animate text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
              data-id="fleet-title"
            >
              Vehicle Collection
            </h2>
            <p
              className="scroll-animate text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              data-id="fleet-subtitle"
            >
              Each vehicle in our fleet represents the pinnacle of comfort,
              safety, and luxury transportation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className={`scroll-animate group relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 ${getAnimationClasses(
                  index % 2 === 0 ? "left" : "right",
                  visibleItems.includes(`vehicle-${index}`)
                )}`}
                data-id={`vehicle-${index}`}
                style={getAnimationStyle(index * 200)}
              >
                {/* Badge */}
                {vehicle.badge && (
                  <div
                    className={`absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r ${vehicle.gradient} text-white font-bold rounded-full text-sm shadow-lg`}
                  >
                    {vehicle.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.type}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all duration-500"></div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-6 right-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div
                      className={`px-6 py-3 bg-gradient-to-r ${vehicle.gradient} text-white font-bold rounded-2xl text-xl shadow-lg`}
                    >
                      {vehicle.price}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                    {vehicle.type}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {vehicle.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Premium Features:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {vehicle.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start group/item">
                          <svg
                            className="w-6 h-6 text-green-500 mr-3 mt-0.5 group-hover/item:scale-125 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700 group-hover/item:text-gray-800 transition-colors font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleBookVehicle(vehicle)}
                      className={`group/btn flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r ${vehicle.gradient} text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                    >
                      Book This Vehicle
                      <svg
                        className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleViewDetails(vehicle)}
                      className="flex-1 inline-flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${vehicle.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-32 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2128&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/75 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="scroll-animate text-5xl md:text-6xl font-extrabold mb-6 text-white"
              data-id="fleet-excellence-title"
            >
              Fleet
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p
              className="scroll-animate text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-id="fleet-excellence-subtitle"
            >
              Our commitment to excellence means every vehicle meets the highest
              standards of safety, comfort, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {standards.map((standard, index) => (
              <div
                key={index}
                className={`scroll-animate group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden ${getAnimationClasses(
                  "up",
                  visibleItems.includes(`standard-${index}`),
                  index * 300
                )}`}
                data-id={`standard-${index}`}
                style={getAnimationStyle(index * 300)}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${standard.gradient}`}
                ></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
                    {standard.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {standard.description}
                  </p>
                  <div
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${standard.gradient} text-black font-bold rounded-full text-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    {standard.stat}
                  </div>
                </div>

                {/* Animated background elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Experience Section - Replaces "Choose Your Perfect Ride" */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-3000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="scroll-animate text-5xl md:text-7xl font-extrabold mb-6"
              data-id="premium-experience-title"
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Premium
              </span>
              <span className="text-white"> Experience</span>
            </h2>
            <p
              className="scroll-animate text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              data-id="premium-experience-subtitle"
            >
              Discover the future of luxury transportation with our cutting-edge
              fleet and services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Digital Dashboard Card - Modern Design with Expandable Text */}
            <div
              className="scroll-animate group relative"
              data-id="digital-card"
              style={getAnimationStyle(0)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${getAnimationClasses(
                  "up",
                  visibleItems.includes("digital-card"),
                  0
                )}`}
              >
                {/* Floating element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-lg border border-cyan-500/30">
                      <div className="text-3xl">📱</div>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold border border-cyan-500/30">
                      APP
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    Digital Website
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    Our state-of-the-art mobile app provides real-time vehicle
                    tracking, instant fare calculation, and seamless booking
                    experience. Monitor your ride progress, communicate with
                    your driver, and receive estimated arrival times all in one
                    place.
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Featuring one-tap booking, payment integration, and ride
                    history for your convenience.
                  </p>
                  {!expandedCards.digital && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => toggleCardExpansion("digital")}
                        className="text-cyan-400 text-sm font-medium flex items-center justify-center mx-auto"
                      >
                        Show more details
                        <svg
                          className="w-4 h-4 ml-1 transform transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {expandedCards.digital && (
                    <>
                      <p className="text-gray-300 text-sm leading-relaxed mt-2 expanded-text">
                        Advanced security features include encrypted
                        communications, driver verification, and emergency
                        assistance. The Website also offers personalized
                        recommendations based on your travel patterns, preferred
                        routes,favorite destinations and AI quotes for every
                        city. Integration with calendar apps allows automatic
                        scheduling of rides for recurring appointments.
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mt-2 expanded-text">
                        Real-time traffic updates help optimize routes for
                        faster arrivals. The Website supports multiple payment
                        methods including cash,credit cards, digital wallets,
                        and loyalty points .
                      </p>
                      <div className="text-center mt-4">
                        <button
                          onClick={() => toggleCardExpansion("digital")}
                          className="text-cyan-400 text-sm font-medium flex items-center justify-center mx-auto"
                        >
                          Show less
                          <svg
                            className="w-4 h-4 ml-1 transform rotate-90 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Luxury Comfort Card - Modern Design with Expandable Text */}
            <div
              className="scroll-animate group relative"
              data-id="comfort-card"
              style={getAnimationStyle(200)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${getAnimationClasses(
                  "up",
                  visibleItems.includes("comfort-card"),
                  200
                )}`}
              >
                {/* Floating element */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center backdrop-blur-lg border border-purple-500/30">
                      <div className="text-3xl">🛋️</div>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold border border-purple-500/30">
                      COMFORT
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                    Luxury Comfort
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    Experience unparalleled comfort with our premium leather
                    seating, personalized climate control, and ambient interior
                    lighting. Each vehicle is equipped with noise-reducing
                    materials and advanced suspension systems for a smooth,
                    quiet ride.
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Includes premium sound system, USB charging ports, and
                    refreshment service for longer journeys.
                  </p>
                  {!expandedCards.comfort && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => toggleCardExpansion("comfort")}
                        className="text-purple-400 text-sm font-medium flex items-center justify-center mx-auto"
                      >
                        Show more details
                        <svg
                          className="w-4 h-4 ml-1 transform transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {expandedCards.comfort && (
                    <>
                      <p className="text-gray-300 text-sm leading-relaxed mt-2 expanded-text">
                        Our vehicles feature massaging seats with multiple
                        adjustment options, allowing you to customize your
                        comfort level. Advanced air filtration systems ensure
                        clean, fresh air throughout your journey. Temperature
                        zones can be individually controlled for each passenger.
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mt-2 expanded-text">
                        Entertainment options include high-definition screens,
                        streaming service integration, and noise-canceling
                        headphones. Privacy partitions are available for
                        business discussions or personal relaxation. Child
                        safety seats and accessibility features are available
                        upon request.
                      </p>
                      <div className="text-center mt-4">
                        <button
                          onClick={() => toggleCardExpansion("comfort")}
                          className="text-purple-400 text-sm font-medium flex items-center justify-center mx-auto"
                        >
                          Show less
                          <svg
                            className="w-4 h-4 ml-1 transform rotate-90 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 24/7 Support Card - Modern Design with Expandable Text */}
            <div
              className="scroll-animate group relative"
              data-id="support-card"
              style={getAnimationStyle(400)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-green-500/30 transition-all duration-500 transform hover:-translate-y-3 overflow-hidden ${getAnimationClasses(
                  "up",
                  visibleItems.includes("support-card"),
                  400
                )}`}
              >
                {/* Floating element */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center backdrop-blur-lg border border-green-500/30">
                      <div className="text-3xl">🎧</div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold border border-green-500/30">
                      SUPPORT
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                    24/7 Support
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    Our dedicated multilingual support team is available around
                    the clock to assist with bookings, special requests, and any
                    questions. With real-time communication channels, we ensure
                    prompt responses and immediate assistance whenever you need
                    it.
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Available via phone, chat, and email with average response
                    time under 4 minutes.
                  </p>
                  {!expandedCards.support && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => toggleCardExpansion("support")}
                        className="text-green-400 text-sm font-medium flex items-center justify-center mx-auto"
                      >
                        Show more details
                        <svg
                          className="w-4 h-4 ml-1 transform transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {expandedCards.support && (
                    <>
                      <p className="text-gray-300 text-sm leading-relaxed mt-2 expanded-text">
                        Our support team consists of trained professionals who
                        understand local areas, traffic patterns, and special
                        requirements. They can assist with accessibility needs,
                        and special event planning. VIP clients have access to
                        dedicated account managers.
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed mt-2 expanded-text">
                        In case of emergencies or unexpected changes, our
                        support team can quickly rebook rides, provide
                        alternative transportation options, and coordinate with
                        drivers for special requests. Feedback is actively
                        collected and used to improve our services continuously.
                      </p>
                      <div className="text-center mt-4">
                        <button
                          onClick={() => toggleCardExpansion("support")}
                          className="text-green-400 text-sm font-medium flex items-center justify-center mx-auto"
                        >
                          Show less
                          <svg
                            className="w-4 h-4 ml-1 transform rotate-90 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div
            className="scroll-animate text-center mt-20"
            data-id="cta-button"
            style={getAnimationStyle(600)}
          >
            <a
              href="/contact"
              className={`group inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900 hover:shadow-2xl shadow-2xl ${getAnimationClasses(
                "up",
                visibleItems.includes("cta-button"),
                600
              )}`}
            >
              Book Your Premium Ride
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section - Need a Ride Right Now with improved text visibility */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >
          {/* Added dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Need a Ride
            </span>
            <br />
            Right Now?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't wait! Call us directly for instant booking or use our other
            premium services.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="tel:+38344123456"
              className="group bg-white text-gray-900 font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                📞 Call Now: +383 44 123 456
              </span>
            </a>
            <a
              href="/popular-places"
              className="group bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                🧭 Calculate Route
                <svg
                  className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Booking Popup */}
      <BookingPopup
        vehicle={selectedVehicle}
        isOpen={showBookingPopup}
        onClose={() => setShowBookingPopup(false)}
        onSubmit={handleBookingSubmit}
      />

      {/* Vehicle Details Popup */}
      <VehicleDetailsPopup
        vehicle={selectedVehicle}
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        onBookNow={handleBookNowFromDetails}
      />

      {/* Booking Confirmation Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-l-4 border-green-500 animate-fade-in">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Thank You for Choosing OSMANI Taxi! 🚗
                </h3>
                <p className="text-gray-600">
                  We've received your message and will send you an email with
                  all the details within 10 minutes. Our premium service team is
                  already preparing your personalized transportation solution.
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-500 hover:text-gray-700 ml-4"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Fleet;
