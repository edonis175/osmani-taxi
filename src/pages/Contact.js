import React, { useState } from "react";
import {
  useScrollAnimation,
  getAnimationClasses,
  getAnimationStyle,
} from "../hooks/useScrollAnimation";
import ScrollToTopButton from "../contexts/ScrollToTopButton";
import ScrollDownButton from "../contexts/ScrollDownButton";

const Contact = () => {
  const visibleItems = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    paymentMethod: "cash", // Default to cash payment
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false); // State for payment popup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If card payment is selected, show payment popup instead of submitting
    if (formData.paymentMethod === "card") {
      setShowPaymentPopup(true);
      return;
    }

    // Here you would handle form submission, e.g., send to an API
    console.log(formData);

    // Show success message
    setShowSuccessMessage(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      paymentMethod: "cash",
    });

    // Scroll to top to show the message
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Hide success message after 8 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 8000);
  };

  // Handle payment submission
  const handlePaymentSubmit = (paymentData) => {
    // Here you would integrate with a payment gateway API
    // Example: Stripe, PayPal, or local Kosovo payment providers like Raiffeisen Bank
    console.log("Payment data:", paymentData);
    console.log("Form data:", formData);

    /*
     * BACKEND INTEGRATION NOTES:
     * 1. For Stripe integration:
     *    - Use Stripe.js on frontend to collect card details securely
     *    - Send token to backend for processing
     *    - Backend uses Stripe API to charge the card
     *
     * 2. For Raiffeisen Bank Kosovo integration:
     *    - Contact Raiffeisen Bank for their payment gateway API
     *    - Typically requires server-to-server API calls
     *    - May need to implement 3D Secure authentication
     *
     * 3. For other Kosovo banks:
     *    - Contact respective banks for their payment APIs
     *    - Most require PCI DSS compliance for direct card processing
     *    - Consider using payment aggregators like PaySec, ePay, etc.
     *
     * 4. General security considerations:
     *    - Never store card details on your servers
     *    - Use HTTPS for all payment-related communications
     *    - Implement proper error handling and logging
     *    - Follow PCI DSS standards for payment processing
     */

    // Close payment popup
    setShowPaymentPopup(false);

    // Show success message
    setShowSuccessMessage(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      paymentMethod: "cash",
    });

    // Scroll to top to show the message
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Hide success message after 8 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 8000);
  };

  const contactInfo = [
    {
      title: "Our Premium Office",
      details: ["Rr. Agim Ramadani, Vushtrri 42000", "KOSOVA"],
      gradient: "from-red-500 to-pink-400",
    },
    {
      title: "24/7 Hotline",
      details: ["+383 44 123 456", "+383 44 789 012"],
      gradient: "from-green-500 to-emerald-400",
    },
    {
      title: "Email Support",
      details: ["info@osmanitaxi.com", "bookings@osmanitaxi.com"],
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: "Always Available",
      details: ["24 hours, 7 days a week", "Never closed"],
      gradient: "from-purple-500 to-pink-400",
    },
  ];

  // Payment Popup Component
  const PaymentPopup = () => {
    const [paymentData, setPaymentData] = useState({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });

    const handlePaymentChange = (e) => {
      const { name, value } = e.target;
      setPaymentData({ ...paymentData, [name]: value });
    };

    const handlePaymentFormSubmit = (e) => {
      e.preventDefault();
      handlePaymentSubmit(paymentData);
    };

    if (!showPaymentPopup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Card Payment</h2>
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600">
                Your payment information is securely processed. We support all
                major cards including local Kosovo banks.
              </p>
            </div>

            <form onSubmit={handlePaymentFormSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="absolute right-3 top-3 flex space-x-2">
                    <div className="w-8 h-5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-sm"></div>
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handlePaymentChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full name as on card"
                />
              </div>

              {/* Supported Cards */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  We Accept
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl mr-2">💳</span>
                    <span className="font-medium">Visa</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl mr-2"></span>
                    <span className="font-medium">Mastercard</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl mr-2">💳</span>
                    <span className="font-medium">American Express</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl mr-2">💳</span>
                    <span className="font-medium">Raiffeisen</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl mr-2">💳</span>
                    <span className="font-medium">NLB</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="text-2xl mr-2">💳</span>
                    <span className="font-medium">BKT</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentPopup(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-xl"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-4 sm:px-6 lg:px-8 shadow-2xl animate-slide-down">
          <div className="container mx-auto">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-2 mr-4">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl">
                    Thank You for Choosing OSMANI Taxi! 🚗
                  </h3>
                  <p className="text-sm sm:text-base text-green-100">
                    We've received your message and will send you an email with
                    all the details within 10 minutes. Our premium service team
                    is already preparing your personalized transportation
                    solution.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="ml-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      <PaymentPopup />

      {/* Hero Section */}
      <div
        className={`relative min-h-screen flex items-center justify-center ${
          showSuccessMessage ? "pt-24" : ""
        }`}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed "
          style={{
            backgroundImage: `url(${require("../assets/images/Carbanner.jpg")})`,
          }}
        >
          <div className="absolute inset-0 "></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 leading-tight animate-fade-in-left`}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-light leading-relaxed px-2 animate-fade-in-right`}
            >
              Ready for Your Premium Ride?
            </p>
            <p
              className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-200 max-w-5xl mx-auto leading-relaxed px-4 animate-fade-in-left`}
            >
              Connect with KOSOVA's #1 taxi service. Whether you need a quick
              ride, want to book in advance, or have questions about our
              services, we're here to help 24/7.
            </p>
          </div>
        </div>

        {/* Scroll Down Button */}
        <ScrollDownButton targetId="contact-section" />
      </div>

      {/* Contact Section */}
      <section
        id="contact-section"
        className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col xl:flex-row gap-12 lg:gap-16">
            {/* Form Section - Appears from left */}
            <div
              className="xl:w-1/2 scroll-animate"
              data-id="contact-form"
              style={getAnimationStyle(0)}
            >
              <div
                className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 hover:shadow-3xl transition-all duration-500 transform ${getAnimationClasses(
                  "left",
                  visibleItems.includes("contact-form"),
                  0
                )}`}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-t-3xl"></div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mt-4">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  Ready to experience premium transportation? Fill out the form
                  and we'll get back to you within minutes.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 text-base sm:text-lg backdrop-blur-sm bg-white/50"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 text-base sm:text-lg backdrop-blur-sm bg-white/50"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 text-base sm:text-lg backdrop-blur-sm bg-white/50"
                        placeholder="+383 44 123 456"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 mb-2 font-semibold"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 text-lg resize-none backdrop-blur-sm bg-white/50"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="group">
                    <label className="block text-gray-700 mb-4 font-semibold">
                      Preferred Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="group/radio cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm hover:bg-gray-200 ${
                            formData.paymentMethod === "cash"
                              ? "bg-gray-200"
                              : "bg-white/50"
                          }`}
                        >
                          <span className="font-semibold">Cash</span>
                        </div>
                      </label>

                      <label className="group/radio cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm hover:bg-gray-200 ${
                            formData.paymentMethod === "card"
                              ? "bg-gray-200"
                              : "bg-white/50"
                          }`}
                        >
                          <span className="font-semibold">Card</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center">
                      Send Message
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Section - Appears from right in a column */}
            <div className="lg:w-1/2 space-y-8">
              <div className="text-center lg:text-left mb-12">
                <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Reach Out Today
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Multiple ways to connect with KOSOVA's premier taxi service
                </p>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Service Areas
                </h3>
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.373291516093!2d20.965491315429688!3d42.79906997913029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13536bce97295987%3A0x8e4b9c7c6e1d9e0!2sVushtrri!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="OSMANI Taxi Service Areas"
                  ></iframe>
                </div>
                <p className="text-gray-600 text-center">
                  Serving all major cities in Kosovo with premium transportation
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={`group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden scroll-animate transform hover:scale-105 ${getAnimationClasses(
                      "right",
                      visibleItems.includes(`contact-info-${index}`),
                      index * 200
                    )}`}
                    data-id={`contact-info-${index}`}
                    style={getAnimationStyle(index * 200)}
                  >
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 `}></div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-gray-880 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, i) => (
                          <p
                            key={i}
                            className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 font-medium"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
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

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Contact;
