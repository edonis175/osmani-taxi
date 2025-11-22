import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useScrollAnimation,
  getAnimationClasses,
  getAnimationStyle,
} from "../hooks/useScrollAnimation";
import ScrollToTopButton from "../contexts/ScrollToTopButton";
import ScrollDownButton from "../contexts/ScrollDownButton";
import MercedesBanner from "../assets/images/Mercedes-Banner.jpg";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Counter animation component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  id = "",
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

    const element = document.getElementById(`counter-${id}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, suffix, hasStarted, id]);

  return (
    <span id={`counter-${id}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const Home = () => {
  const visibleItems = useScrollAnimation();

  const features = [
    {
      title: "AI-Powered Routing",
      description:
        "Advanced algorithms calculate the fastest, most efficient routes in real-time, saving you time and money on every journey.",
      stats: "99.8% accuracy",
      color: "from-blue-500 to-cyan-400",
      bgImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Premium Fleet",
      description:
        "Our luxury vehicles are meticulously maintained and equipped with cutting-edge technology for your comfort and safety.",
      stats: "100% satisfaction",
      color: "from-purple-500 to-pink-400",
      bgImage:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "24/7 Availability",
      description:
        "Round-the-clock service with professional drivers ready to take you anywhere, anytime - because your schedule never stops.",
      stats: "Always on time",
      color: "from-yellow-500 to-orange-400",
      bgImage:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Safety First",
      description:
        "Rigorous driver training, vehicle inspections, and real-time tracking ensure your journey is secure from start to finish.",
      stats: "Zero incidents",
      color: "from-green-500 to-teal-400",
      bgImage:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${MercedesBanner})`,
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-transparent`}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1
              className={`text-6xl md:text-8xl font-extrabold mb-6 leading-tight text-white animate-fade-in-left`}
            >
              <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 bg-clip-text text-transparent">
                OSMANI
              </span>
              <br />
              <span className="text-white">Luxury Taxi</span>
            </h1>
            <p
              className={`text-2xl md:text-3xl mb-8 font-light leading-relaxed text-white animate-fade-in-right`}
            >
              Experience the future of transportation in KOSOVA
            </p>
            <p
              className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-200 animate-fade-in-left`}
            >
              Premium rides, AI-powered routing, and unparalleled service that
              transforms every journey into an experience
            </p>

            <div
              className={`flex flex-col sm:flex-row justify-center gap-6 mb-16 animate-fade-in-up`}
            >
              <Link
                to="/popular-places"
                className="group bg-gradient-to-r from-yellow-700 to-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300  hover:shadow-2xl hover:-translate-y-2"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  AI Route Calculator
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </Link>
              <Link
                to="/popular-places"
                className="group bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-115 hover:bg-white hover:text-gray-900 hover:shadow-2xl hover:-translate-y-2"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  Discover KOSOVA
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up`}
            >
              <div className="group hover:scale-125 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={15} suffix="+" id="hero-years" />
                </div>
                <div className={`text-sm text-gray-300`}>Years Experience</div>
              </div>
              <div className="group hover:scale-125 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={50} suffix="K+" id="hero-customers" />
                </div>
                <div className={`text-sm text-gray-300`}>Happy Customers</div>
              </div>
              <div className="group hover:scale-125 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={200} suffix="+" id="hero-vehicles" />
                </div>
                <div className={`text-sm text-gray-300`}>Premium Vehicles</div>
              </div>
              <div className="group hover:scale-125 hover:-translate-y-2 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                  24/7
                </div>
                <div className={`text-sm text-gray-300`}>Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton targetId="features-section" />
      </div>

      {/* Creative Features Showcase */}
      <section
        id="features-section"
        className={`py-20 relative overflow-hidden bg-white`}
      >
        {/* Floating Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-35 animate-pulse animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Text with Modern Typography */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-2"></div>
            <h3
              className={`scroll-animate text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-transparent leading-tight`}
              data-id="creative-title"
            >
              <p className="text-black font-bold text-7xl md:text-6xl lg:text-7xl md:ml-0 ml-[-11px]">
                Experience the
              </p>
              <span
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent font-bold text-6xl pt-2"
                style={{ marginTop: "30px" }}
              >
                Future of Travel
              </span>
            </h3>
            <p
              className={`scroll-animate text-xl max-w-3xl mx-auto leading-relaxed text-gray-600`}
              data-id="creative-subtitle"
            >
              Revolutionary transportation solutions powered by cutting-edge
              technology and unmatched service excellence
            </p>
          </div>

          {/* Interactive Feature Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Card 1 - AI Technology */}
            <div
              className={`scroll-animate group relative ${getAnimationClasses(
                "left",
                visibleItems.includes("creative-card-1")
              )}`}
              data-id="creative-card-1"
              style={getAnimationStyle(100)}
            >
              <div
                className={`rounded-3xl p-8 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100`}
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center  group-hover:scale-125 transition-transform duration-500">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-3 text-gray-800`}>
                    AI-Powered Intelligence
                  </h3>
                  <p className={`leading-relaxed text-gray-600`}>
                    Advanced algorithms optimize every aspect of your journey,
                    from route planning to arrival predictions.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    99.8%
                  </div>
                  <div className={`text-sm text-gray-500`}>Accuracy Rate</div>
                </div>
              </div>
            </div>

            {/* Card 2 - Premium Fleet */}
            <div
              className={`scroll-animate group relative ${getAnimationClasses(
                "up",
                visibleItems.includes("creative-card-2")
              )}`}
              data-id="creative-card-2"
              style={getAnimationStyle(200)}
            >
              <div
                className={`rounded-3xl p-8 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-translate-y-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100`}
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                  <svg
                    className="w-6 h-6 text-white "
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
                </div>
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-3 text-gray-800`}>
                    Luxury Fleet
                  </h3>
                  <p className={`leading-relaxed text-gray-600`}>
                    Premium vehicles equipped with the latest amenities and
                    maintained to the highest standards.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                    200+
                  </div>
                  <div className={`text-sm text-gray-500`}>Premium Cars</div>
                </div>
              </div>
            </div>

            {/* Card 3 - 24/7 Service */}
            <div
              className={`scroll-animate group relative ${getAnimationClasses(
                "right",
                visibleItems.includes("creative-card-3")
              )}`}
              data-id="creative-card-3"
              style={getAnimationStyle(300)}
            >
              <div
                className={`rounded-3xl p-8 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-translate-y-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100`}
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center group-hover:rotate-180 group-hover:scale-125 transition-transform duration-700">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-3 text-gray-800`}>
                    Always Available
                  </h3>
                  <p className={`leading-relaxed text-gray-600`}>
                    Round-the-clock service ensuring you're never left stranded,
                    wherever you are.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className={`text-sm text-gray-500`}>Service Hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Statistics Banner */}
          <div
            className={`scroll-animate rounded-3xl p-8 md:p-12 relative overflow-hidden ${getAnimationClasses(
              "scale-up",
              visibleItems.includes("creative-stats")
            )} bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900`}
            data-id="creative-stats"
            style={getAnimationStyle(400)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><path d="M30 30c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/></g></g></svg>')`,
                  backgroundSize: "60px 60px",
                }}
              ></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className={`text-3xl md:text-4xl font-bold mb-8 text-white`}>
                Trusted by <span className="text-yellow-400">Thousands</span>{" "}
                Across KOSOVA
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter end={15} suffix="+" id="trusted-years" />
                  </div>
                  <div className={`text-sm md:text-base text-gray-300`}>
                    Years Excellence
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter
                      end={50}
                      suffix="K+"
                      id="trusted-customers"
                    />
                  </div>
                  <div className={`text-sm md:text-base text-gray-300`}>
                    Happy Customers
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter end={500} suffix="K+" id="trusted-rides" />
                  </div>
                  <div className={`text-sm md:text-base text-gray-300`}>
                    Rides Completed
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter
                      end={98}
                      suffix="%"
                      id="trusted-satisfaction"
                    />
                  </div>
                  <div className={`text-sm md:text-base text-gray-300`}>
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${require("../assets/images/Why-Choose.BannerBg.png")})`,
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/70 to-black/60`}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="scroll-animate text-5xl md:text-6xl font-extrabold mb-6 text-white"
              data-id="features-title"
            >
              Why Choose
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent p-2">
                OSMANI
              </span>
            </h2>
            <p
              className="scroll-animate text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              data-id="features-subtitle"
            >
              Experience the perfect blend of luxury, technology, and
              reliability that sets us apart from the rest.
            </p>
          </div>

          {/* Dynamic Feature Showcase with Swiper */}
          <div className="max-w-7xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="feature-swiper pb-12"
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    {/* Background Image with Overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${feature.bgImage}')` }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                      {/* Main Content */}
                      <div className="transform group-hover:-translate-y-2 transition-all duration-500">
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Driver Excellence Section */}
      <section
        className={`py-32 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 shadow-lg">
              <span className="text-black font-bold text-sm tracking-wide uppercase">
                Professional Excellence
              </span>
            </div>
            <h2
              className={`text-5xl md:text-7xl font-black mb-6 text-gray-900`}
            >
              Meet Our
              <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {" "}
                Elite Drivers
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto leading-relaxed text-gray-600`}
            >
              Handpicked professionals with years of experience, extensive
              training, and an unwavering commitment to your safety and comfort.
            </p>
          </div>

          {/* Driver Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-5xl mx-auto">
            <div
              className={`group text-center rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white`}
            >
              <div className="text-4xl font-black text-yellow-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={500} suffix="+" start={1} />
              </div>
              <div
                className={`font-semibold group-hover:text-yellow-600 transition-colors duration-300 text-gray-600`}
              >
                Certified Drivers
              </div>
            </div>
            <div
              className={`group text-center rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white`}
            >
              <div className="text-4xl font-black text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={98} suffix=".5%" start={1} />
              </div>
              <div
                className={`font-semibold group-hover:text-orange-600 transition-colors duration-300 text-gray-600`}
              >
                Customer Rating
              </div>
            </div>
            <div
              className={`group text-center rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white`}
            >
              <div className="text-4xl font-black text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={15} suffix="+ yrs" start={1} />
              </div>
              <div
                className={`font-semibold group-hover:text-green-600 transition-colors duration-300 text-gray-600`}
              >
                Avg Experience
              </div>
            </div>
            <div
              className={`group text-center rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white`}
            >
              <div className="text-4xl font-black text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div
                className={`font-semibold group-hover:text-blue-600 transition-colors duration-300 text-gray-600`}
              >
                Available
              </div>
            </div>
          </div>

          {/* Quality Assurance */}
          <div
            className={`rounded-3xl p-12 text-center bg-gradient-to-r from-gray-900 to-black`}
          >
            <h3 className="text-4xl font-bold text-white mb-6">
              Our Commitment to{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Every OSMANI driver undergoes rigorous background checks,
              professional training, and continuous performance monitoring to
              ensure you receive the highest quality service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Background Verified
                </h4>
                <p className="text-gray-400 text-sm">
                  Comprehensive criminal and driving record checks
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Professionally Trained
                </h4>
                <p className="text-gray-400 text-sm">
                  Customer service and safety protocol certification
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  5-Star Rated
                </h4>
                <p className="text-gray-400 text-sm">
                  Continuous monitoring and customer feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`py-32 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
              What Our
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent p-1">
                Customers Say
              </span>{" "}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust OSMANI for their
              transportation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Business Executive",
                avatar: (
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                ),
                rating: 5,
                text: "Absolutely exceptional service! The AI route calculator saved me 30 minutes on my daily commute. The drivers are professional and the vehicles are immaculate.",
              },
              {
                name: "Mehmet Krasniqi",
                role: "Local Resident",
                avatar: (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                ),
                rating: 5,
                text: "I've been using OSMANI for over 2 years. Their reliability is unmatched, and the new AI features make booking so much easier. Highly recommended!",
              },
              {
                name: "Emma Thompson",
                role: "Tourist",
                avatar: (
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                ),
                rating: 5,
                text: "As a tourist, their popular places feature was a game-changer. Discovered amazing spots I would never have found otherwise. The drivers also shared great local insights!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`group rounded-3xl p-8 border hover:scale-105 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20`}
              >
                <div className="text-center mb-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {testimonial.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-yellow-400 text-sm">{testimonial.role}</p>
                  <div className="flex justify-center mt-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 text-center italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${require("../assets/images/CTABgBanner.png")})`,
          }}
        >
          <div className="absolute inset-0 "></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div
            className={`rounded-3xl p-12 text-center bg-gradient-to-r from-gray-900 to-black`}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight">
              Ready for the
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Ultimate Ride?
              </span>
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience luxury transportation like never before. Book your
              premium ride today and discover why we're KOSOVA's #1 taxi
              service.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/contact"
                className="group bg-white text-gray-900 font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center justify-center">
                  📞 Book Now
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
              </Link>
              <Link
                to="/fleet"
                className="group bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900 hover:shadow-2xl"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center justify-center">
                  🚗 View Fleet
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
