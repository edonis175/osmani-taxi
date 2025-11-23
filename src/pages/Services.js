import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useScrollAnimation,
  getAnimationClasses,
  getAnimationStyle,
} from "../hooks/useScrollAnimation";
import ScrollToTopButton from "../contexts/ScrollToTopButton";
import ScrollDownButton from "../contexts/ScrollDownButton";

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

    const element = document.getElementById(
      `counter-services-${end}-${suffix}`
    );
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, suffix, hasStarted]);

  return (
    <span id={`counter-services-${end}-${suffix}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const Services = () => {
  const visibleItems = useScrollAnimation();
  const [selectedService, setSelectedService] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    passengers: 1,
  });

  const services = [
    {
      title: "Premium City Taxi",
      description:
        "Experience luxury urban transportation with our premium city taxi service. Available 24/7 with professional drivers who know every street and shortcut in KOSOVA's cities.",
      details: [
        "Available 24/7 with instant booking",
        "Transparent metered fares with no surprises",
        "Multiple payment options including digital",
        "Luxury sedans with premium amenities",
      ],
      image: require("../assets/images/PremiumCity-Card1.png"),
      price: "€1.20/km",
    },
    {
      title: "VIP Airport Transfer",
      description:
        "Arrive in style with our VIP airport transfer service. Flight tracking technology ensures we're there when you land, with meet-and-greet service and luxury vehicle options.",
      details: [
        "Real-time flight tracking technology",
        "Professional meet and greet service",
        "Fixed transparent pricing structure",
        "Complimentary luggage assistance",
      ],

      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      price: "€45 fixed",
    },
    {
      title: "Luxury Hotel Shuttle",
      description:
        "Seamless hotel transfers with our luxury shuttle service. We partner with premium hotels throughout KOSOVA to provide guests with exceptional transportation experiences.",
      details: [
        "Exclusive hotel partnerships",
        "Pre-scheduled pickup services",
        "Group transportation available",
        "Professional luggage handling",
      ],

      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "€25 per trip",
    },
    {
      title: "Executive Corporate",
      description:
        "Tailored transportation solutions for discerning business professionals. Our corporate service features premium vehicles, dedicated account management, and flexible billing options.",
      details: [
        "Monthly corporate invoicing",
        "Dedicated account manager",
        "Executive-class premium vehicles",
        "Priority 24/7 support line",
      ],

      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "Custom packages",
    },
    {
      title: "Spectacular Events",
      description:
        "Make your special occasions unforgettable with our event transportation service. From weddings to celebrations, we coordinate with event planners for perfect timing.",
      details: [
        "Luxury and exotic vehicle fleet",
        "Professional chauffeur service",
        "Coordinated event scheduling",
        "Custom vehicle decorations",
      ],

      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
      price: "€150 per event",
    },
    {
      title: "Premium Long Distance",
      description:
        "Comfortable inter-city travel throughout KOSOVA and beyond. Our long-distance service features spacious vehicles, experienced drivers, and optional scenic stops.",
      details: [
        "Fixed competitive inter-city pricing",
        "Scenic comfort stops available",
        "Spacious luxury vehicles",
        "Experienced regional drivers",
      ],

      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      price: "€2.50/km",
    },
    // New services
    {
      title: "Wedding Transportation",
      description:
        "Make your special day unforgettable with our elegant wedding transportation service. From bridal transfers to guest shuttles, we ensure everything runs smoothly.",
      details: [
        "Luxury fleet of premium vehicles",
        "Professional chauffeurs in uniform",
        "Flexible scheduling for ceremonies",
        "Decorative vehicle options",
      ],
      image:
        "https://images.unsplash.com/photo-1511276975707-9d9d01d0b45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "€200 per event",
    },
    {
      title: "Medical Transport",
      description:
        "Reliable and comfortable transportation for medical appointments. Our vehicles are equipped to accommodate mobility needs with professional, compassionate drivers.",
      details: [
        "Wheelchair accessible vehicles",
        "Trained medical support staff",
        "Insurance billing assistance",
        "24/7 emergency availability",
      ],
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "€35 per trip",
    },
    {
      title: "Nightlife Service",
      description:
        "Safe and reliable transportation for your evening adventures. Our late-night service ensures you get home securely after nights out.",
      details: [
        "24/7 availability for nightlife",
        "Discreet and professional service",
        "Multiple pickup/drop-off points",
        "Fixed pricing with no surprises",
      ],
      image:
        "https://images.unsplash.com/photo-1523978512162-48e0d3c217ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      price: "€25 per trip",
    },
  ];

  const openBookingPopup = (service) => {
    setSelectedService(service);
    setIsPopupOpen(true);
  };

  const closeBookingPopup = () => {
    setIsPopupOpen(false);
    setSelectedService(null);
    setBookingInfo({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      passengers: 1,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert(
      `Thank you for booking ${selectedService.title}! We'll contact you shortly to confirm your reservation.`
    );
    closeBookingPopup();
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
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 ">
          <div className="max-w-6xl mx-auto pb-20 background-blur-sm">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight animate-fade-in-left`}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent  ">
                Premium
              </span>
              <br />
              <span className="text-white">Services</span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-5xl mt-30 leading-relaxed px-4 animate-fade-in-right`}
            >
              From quick city rides to special events, discover our
              comprehensive range of premium transportation services designed to
              exceed your expectations and elevate every journey.
            </p>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton targetId="services-section" />
      </div>
      {/* Services Introduction Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 relative inline-block">
              <span className="relative z-10 text-black">
                Our Premium Transportation Info
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              At OSMANI Taxi, we've been providing exceptional transportation
              services throughout KOSOVA for over 15 years. Our commitment to
              excellence means every journey with us is comfortable, reliable,
              and tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease transform hover:-translate-y-2 flex flex-col border border-white/30 group">
              <div className="relative mb-6"></div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4 ">
                Professional Drivers
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4 flex-grow">
                Our experienced, courteous drivers know the region well and
                prioritize your safety and comfort.
              </p>
              <p className="text-gray-600 leading-relaxed pb-6">
                All our drivers undergo rigorous background checks and
                professional training. They are fluent in multiple languages and
                committed to providing a premium travel experience. With
                real-time GPS tracking, you can monitor your journey and
                estimated arrival times.
              </p>
              <div className="mt-auto pt-4 flex justify-center">
                <img
                  src={require("../assets/images/osmanileaf.png")}
                  alt="OSMANI Leaf"
                  className="h-16 w-auto"
                />
              </div>
            </div>

            <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease transform hover:-translate-y-2 flex flex-col border border-white/30 group">
              <div className="relative mb-6"></div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Punctual Service
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4 flex-grow">
                We value your time with on-time pickups and reliable scheduling
                for all our services.
              </p>
              <p className="text-gray-600 leading-relaxed pb-6">
                Our advanced booking system ensures your driver arrives exactly
                when promised. With traffic monitoring technology, we optimize
                routes in real-time to avoid delays. For airport transfers, we
                track your flight status and adjust pickup times accordingly to
                ensure seamless travel.
              </p>
              <div className="mt-auto pt-4 flex justify-center">
                <img
                  src={require("../assets/images/osmanileaf.png")}
                  alt="OSMANI Leaf"
                  className="h-16 w-auto"
                />
              </div>
            </div>

            <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease transform hover:-translate-y-2 flex flex-col border border-white/30 group">
              <div className="relative mb-6"></div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4 ">
                Quality Vehicles
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4 flex-grow">
                Our modern, well-maintained fleet ensures a comfortable and safe
                journey every time.
              </p>
              <p className="text-gray-600 leading-relaxed pb-6">
                Our vehicles are serviced regularly and inspected for safety
                compliance. Each car features premium amenities including
                climate control, charging ports, and luxury seating. We offer a
                range of vehicle types from sedans to SUVs to accommodate your
                specific needs.
              </p>
              <div className="mt-auto pt-4 flex justify-center">
                <img
                  src={require("../assets/images/osmanileaf.png")}
                  alt="OSMANI Leaf"
                  className="h-16 w-auto "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section
        id="services-section-cards"
        className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 relative inline-block">
              <span className="relative z-10 text-black">
                Our Transportation Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Discover our premium transportation solutions designed to elevate
              your travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openBookingPopup(service)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-orange-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                    {service.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.details.slice(0, 3).map((detail, i) => (
                      <span
                        key={i}
                        className="bg-orange-50/80 backdrop-blur-sm text-orange-700 px-2 py-1 rounded-md text-xs"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <button
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        openBookingPopup(service);
                      }}
                    >
                      Book Now
                    </button>
                    <button className="bg-white/30 backdrop-blur-sm text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-white/50 transition-all text-sm">
                      Click for details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Booking Popup Modal */}
      {isPopupOpen && selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeBookingPopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="h-48 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {selectedService.title}
                  </h3>
                  <span className="bg-orange-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-lg font-bold">
                    {selectedService.price}
                  </span>
                </div>

                <p className="text-gray-700 mb-6">
                  {selectedService.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    Service Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedService.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeBookingPopup}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50/80 backdrop-blur-sm transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // In a real app, you would open a booking form here
                      alert(
                        `Booking ${selectedService.title}! In a complete implementation, this would open a booking form.`
                      );
                      closeBookingPopup();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Simple CTA Section */}
      <section className="py-16 bg-gray-900 backdrop-blur-sm text-white mb-0.5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Transportation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for reliable, comfortable service throughout KOSOVA
          </p>
          <Link
            to="/contact#contact-form"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 backdrop-blur-sm"
          >
            Book Your Ride
          </Link>
        </div>
      </section>
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Services;
