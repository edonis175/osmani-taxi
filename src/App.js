import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Contact from "./pages/Contact";
import PopularPlaces from "./pages/PopularPlaces";
import RouteCalculator from "./pages/RouteCalculator";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">{this.state.error?.toString()}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Use /osmani-taxi as basename for GitHub Pages deployment only
  // In local development, use empty basename
  // Simple check: if PUBLIC_URL exists and contains "osmani-taxi", use basename
  // Otherwise, check NODE_ENV for production
  const hasPublicUrl =
    process.env.PUBLIC_URL && process.env.PUBLIC_URL.includes("osmani-taxi");
  const isProduction = process.env.NODE_ENV === "production";
  const basename = hasPublicUrl || isProduction ? "/osmani-taxi" : "";

  return (
    <ErrorBoundary>
      <Router basename={basename}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow page-content">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/popular-places" element={<PopularPlaces />} />
              <Route path="/route-calculator" element={<RouteCalculator />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
