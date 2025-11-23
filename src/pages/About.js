import React, { useState, useEffect, useRef } from "react";
import {
  useScrollAnimation,
  getAnimationClasses,
  getAnimationStyle,
} from "../hooks/useScrollAnimation";
import ScrollToTopButton from "../contexts/ScrollToTopButton";
import ScrollDownButton from "../contexts/ScrollDownButton";

// Custom styles for animations
const customStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-200px) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(200px) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
  }

  @keyframes slideInBottom {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .slide-in-left.animate {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  
  .slide-in-right.animate {
    animation: slideInRight 0.8s ease-out forwards;
  }
  
  .slide-in-bottom.animate {
    animation: slideInBottom 0.8s ease-out forwards;
  }

  .team-card {
    transform: scale(1);
    transition: transform 3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    will-change: transform;
  }

  .team-card:hover {
    transform: scale(1.05) !important;
    transition: transform 3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
  }

  .team-card .social-icons {
    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(10px) !important;
    transition: opacity 3s cubic-bezier(0.16, 1, 0.3, 1), transform 3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s 3s !important;
  }

  .team-card:hover .social-icons {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    transition: opacity 3s cubic-bezier(0.16, 1, 0.3, 1), transform 3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s 0s !important;
}`;

// Inject styles
if (
  typeof document !== "undefined" &&
  !document.getElementById("about-custom-styles")
) {
  const styleElement = document.createElement("style");
  styleElement.id = "about-custom-styles";
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

// Timeline component with scroll animations
const TimelineSection = ({ milestones }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.3,
        // small rootMargin to ensure elements near the viewport are detected
        rootMargin: "50px",
      }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    // Fallback: on some mobile browsers a refresh can leave elements already
    // in-view but IntersectionObserver callbacks may not fire immediately.
    // Check bounding rects and mark items visible on mount if they are in the
    // viewport — this ensures the timeline is visible after a refresh.
    try {
      const initiallyVisible = [];
      timelineItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const index = parseInt(item.dataset.index);
        // Consider the item visible if any part of it is within the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (!initiallyVisible.includes(index)) initiallyVisible.push(index);
        }
      });
      if (initiallyVisible.length > 0) {
        setVisibleItems((prev) => {
          const merged = Array.from(new Set([...prev, ...initiallyVisible]));
          return merged.sort((a, b) => a - b);
        });
      }
    } catch (e) {
      // ignore in non-browser env
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-gradient-to-r from-black/80 via-black/50 to-transparent "
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1652868801016-e91c9b295239?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJpc2h0aW5hfGVufDB8fDB8fHww')`,
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile Timeline - Vertical Stack */}
        <div className="md:hidden max-w-md mx-auto">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`timeline-item mb-8 transition-all duration-700 transform ${
                visibleItems.includes(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              data-index={index}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    {milestone.year}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {milestone.title}
                  </div>
                </div>
                <p className="text-white font-bold leading-relaxed group-hover:text-white transition-colors duration-300 text-center">
                  {milestone.description}
                </p>
              </div>
              {/* Connector line for mobile - only show if not last item */}
              {index < milestones.length - 1 && (
                <div className="flex justify-center my-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden md:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`timeline-item flex items-center mb-16 transition-all duration-700 transform ${
                  visibleItems.includes(index)
                    ? index % 2 === 0
                      ? "translate-x-0 opacity-100"
                      : "translate-x-0 opacity-100"
                    : index % 2 === 0
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
                data-index={index}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                {/* Left side - Even indices */}
                {index % 2 === 0 ? (
                  <>
                    <div className="w-1/2 pr-12 text-right">
                      <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                        <div className="text-center mb-6">
                          <div className="text-3xl font-bold text-orange-400 mb-1">
                            {milestone.year}
                          </div>
                          <div className="text-xl font-bold text-white">
                            {milestone.title}
                          </div>
                        </div>
                        <p className="text-white font-bold leading-relaxed group-hover:text-white transition-colors duration-300 text-center">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    {/* Empty right side */}
                    <div className="w-1/2"></div>
                  </>
                ) : (
                  /* Right side - Odd indices */
                  <>
                    {/* Empty left side */}
                    <div className="w-1/2"></div>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-1/2 pl-12">
                      <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                        <div className="text-center mb-6">
                          <div className="text-3xl font-bold text-orange-400 mb-1">
                            {milestone.year}
                          </div>
                          <div className="text-xl font-bold text-white">
                            {milestone.title}
                          </div>
                        </div>
                        <p className="text-white font-semibold leading-relaxed group-hover:text-white transition-colors duration-300 text-center">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const visibleItems = useScrollAnimation();

  const milestones = [
    {
      year: "2005",
      title: "Humble Beginnings",
      description:
        "Shaip Osmani launches OSMANI Taxi with just 3 vehicles and a vision to transform transportation in KOSOVA.",
    },
    {
      year: "2012",
      title: "Fleet Expansion",
      description:
        "Grew to 25 premium vehicles, establishing service in Prishtina and expanding to surrounding municipalities.",
    },
    {
      year: "2015",
      title: "Technology Integration",
      description:
        "Launched first mobile app and introduced GPS tracking, revolutionizing the booking experience for customers.",
    },
    {
      year: "2018",
      title: "Regional Leader",
      description:
        "Expanded operations to 7 cities across KOSOVA, becoming the region's premier taxi service provider.",
    },
    {
      year: "2021",
      title: "AI Innovation",
      description:
        "Introduced groundbreaking AI-powered routing system, reducing average journey times by 25% and improving efficiency.",
    },
    {
      year: "2025",
      title: "Future Ready",
      description:
        "Launched electric vehicle fleet and sustainable operations initiative, setting new standards for eco-friendly transportation.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${require("../assets/images/Mercedes-Banner.jpg")})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight animate-fade-in-left`}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="text-white">OSMANI Taxi</span>
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light leading-relaxed px-2 animate-fade-in-right`}
            >
              Pioneering Luxury Transportation in KOSOVA
            </p>
            <p
              className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed px-4 animate-fade-in-left`}
            >
              For over 15 years, we've been redefining premium transportation
              services in KOSOVA. From our humble beginnings to becoming the
              region's most trusted taxi service, our commitment to excellence
              remains unwavering.
            </p>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton targetId="story-section" />
      </div>

      {/* Our Story Section */}
      <section
        id="story-section"
        className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Our Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the story of innovation, excellence, and dedication
                that defines OSMANI Taxi
              </p>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 scroll-animate"
              data-index="1"
            >
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl p-8 shadow-xl border border-gray-100 ${getAnimationClasses(
                  "left",
                  visibleItems.includes("1")
                )}`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                  About Us
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                  Founded in 2009 by Shaip Osmani, OSMANI Taxi began as a vision
                  to transform transportation in KOSOVA. What started with just
                  three vehicles has evolved into the region's most trusted taxi
                  service, operating a fleet of over 200 premium automobiles.
                </p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  As pioneers in the industry, we've consistently pushed
                  boundaries with innovative technology solutions, including
                  mobile booking, GPS tracking, and AI-powered route
                  optimization. Today, we continue to lead with our electric
                  vehicle initiative and sustainable operations, setting new
                  standards for eco-friendly transportation.
                </p>
                {/* <div
                  className={`flex justify-center mt-6 ${getAnimationClasses(
                    "up",
                    visibleItems.includes("1"),
                    500
                  )}`}
                >
                  <img
                    src={require("../assets/images/osmanileaf.png")}
                    alt="OSMANI Leaf"
                    className="h-16 w-auto"
                  />
                </div> */}
              </div>
              <div
                className={`relative ${getAnimationClasses(
                  "right",
                  visibleItems.includes("1")
                )}`}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="OSMANI Taxi Founding"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 scroll-animate"
              data-index="2"
            >
              <div
                className={`relative ${getAnimationClasses(
                  "left",
                  visibleItems.includes("2")
                )}`}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="OSMANI Taxi Founding"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl p-8 shadow-xl border border-gray-100 ${getAnimationClasses(
                  "right",
                  visibleItems.includes("2")
                )}`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                  Our Services
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                  We provide reliable taxi services throughout KOSOVA. Our
                  vehicles are well-maintained and our drivers are professional
                  and courteous.
                </p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Whether you need a ride to the airport, a city tour, or just
                  getting around town, we're here to help with comfortable and
                  punctual service.
                </p>
                <div
                  className={`flex justify-center mt-6 ${getAnimationClasses(
                    "up",
                    visibleItems.includes("2"),
                    500
                  )}`}
                >
                  <img
                    src={require("../assets/images/osmanileaf.png")}
                    alt="OSMANI Leaf"
                    className="h-16 w-auto"
                  />
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 scroll-animate"
              data-index="3"
            >
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl p-8 shadow-xl border border-gray-100 ${getAnimationClasses(
                  "left",
                  visibleItems.includes("3")
                )}`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                  Your Experience
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    <span className="font-semibold">Clean Vehicles:</span> All
                    our cars are regularly cleaned and maintained for your
                    comfort and safety.
                  </p>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    <span className="font-semibold">Reliable Drivers:</span> Our
                    professional drivers are knowledgeable about the area and
                    committed to getting you to your destination safely.
                  </p>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    <span className="font-semibold">Easy Booking:</span> Reserve
                    your ride through our simple phone or online booking system.
                  </p>
                </div>
                <div
                  className={`flex justify-center mt-6 ${getAnimationClasses(
                    "up",
                    visibleItems.includes("3"),
                    500
                  )}`}
                >
                  <img
                    src={require("../assets/images/osmanileaf.png")}
                    alt="OSMANI Leaf"
                    className="h-16 w-auto"
                  />
                </div>
              </div>
              <div
                className={`relative ${getAnimationClasses(
                  "right",
                  visibleItems.includes("3")
                )}`}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="OSMANI Taxi Excellence"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center scroll-animate"
              data-index="4"
            >
              <div
                className={`relative ${getAnimationClasses(
                  "left",
                  visibleItems.includes("4")
                )}`}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="OSMANI Taxi Innovation"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl p-8 shadow-xl border border-gray-100 ${getAnimationClasses(
                  "right",
                  visibleItems.includes("4")
                )}`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                  What Makes Us Different
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      First in KOSOVA
                    </h4>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      As the pioneering premium taxi service in KOSOVA, we've
                      been setting industry standards since 2009 with innovative
                      solutions and unmatched service quality.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Sustainability Leaders
                    </h4>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      We're at the forefront of eco-friendly transportation with
                      our electric vehicle fleet and sustainable operations
                      initiative, reducing our carbon footprint while
                      maintaining excellence.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Community Focused
                    </h4>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      Deeply rooted in KOSOVA, we support local initiatives and
                      contribute to our community's growth while providing
                      exceptional transportation services.
                    </p>
                  </div>
                </div>
                <div
                  className={`flex justify-center mt-6 ${getAnimationClasses(
                    "up",
                    visibleItems.includes("4"),
                    500
                  )}`}
                >
                  <img
                    src={require("../assets/images/osmanileaf.png")}
                    alt="OSMANI Leaf"
                    className="h-16 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection milestones={milestones} />

      {/* CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 mb-0.5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-white">
              Ready to Experience
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Premium Transportation?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust OSMANI Taxi for
              their transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="group bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Book Your Ride
                </span>
              </a>
              <a
                href="/fleet"
                className="group bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-white hover:text-gray-900"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  View Our Fleet
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default About;
