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

function App() {
  // Use /osmani-taxi as basename for GitHub Pages deployment only
  // In local development, use empty basename
  const basename = process.env.NODE_ENV === "production" ? "/osmani-taxi" : "";

  return (
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
  );
}

export default App;
