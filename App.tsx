import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Summit from "./pages/Summit";
import Admin from "./pages/Admin";
import ArticleDetail from "./pages/ArticleDetail";
import KnowledgeHub from "./pages/KnowledgeHub";
import { CustomCursor, Preloader } from "./components/UIEffects";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Helper to handle the transition from preloader
  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <DataProvider>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      {!loading && (
        <>
          {/* Only show cursor on desktop (simple check via media query in css preferred, but this renders unconditionally) */}
          <div className="hidden md:block">
            <CustomCursor />
          </div>

          <Router>
            <div className="flex flex-col min-h-screen font-sans text-slate-800 relative">
              <Navbar />
              <main className="flex-grow relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/summit" element={<Summit />} />
                  <Route path="/hub" element={<KnowledgeHub />} />
                  <Route path="/article/:id" element={<ArticleDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </>
      )}
    </DataProvider>
  );
};

export default App;
