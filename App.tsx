import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGetTicket = () => {
    window.location.href = "https://www.ulinzinga.com/ev-GKosnwjQ";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900">
              Investor<span className="text-brand-blue">Edge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-semibold transition-colors ${
                  isActive ? "text-brand-blue" : "text-slate-700 hover:text-brand-blue"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/summit"
              className={({ isActive }) =>
                `font-semibold transition-colors ${
                  isActive ? "text-brand-blue" : "text-slate-700 hover:text-brand-blue"
                }`
              }
            >
              Summit
            </NavLink>

            <NavLink
              to="/hub"
              className={({ isActive }) =>
                `font-semibold transition-colors ${
                  isActive ? "text-brand-blue" : "text-slate-700 hover:text-brand-blue"
                }`
              }
            >
              Knowledge Hub
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-semibold transition-colors ${
                  isActive ? "text-brand-blue" : "text-slate-700 hover:text-brand-blue"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-semibold transition-colors ${
                  isActive ? "text-brand-blue" : "text-slate-700 hover:text-brand-blue"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleGetTicket}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-all"
            >
              Get Ticket <ArrowRight size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="flex flex-col px-6 py-6 gap-6">
            <Link to="/" onClick={() => setMenuOpen(false)} className="font-semibold">
              Home
            </Link>
            <Link to="/summit" onClick={() => setMenuOpen(false)} className="font-semibold">
              Summit
            </Link>
            <Link to="/hub" onClick={() => setMenuOpen(false)} className="font-semibold">
              Knowledge Hub
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="font-semibold">
              About
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="font-semibold">
              Contact
            </Link>

            <button
              onClick={handleGetTicket}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-blue text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all"
            >
              Get Ticket <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
