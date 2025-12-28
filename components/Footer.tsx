import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Lock, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-50 pb-8 px-4">
      <div className="max-w-7xl mx-auto ios-glass-dark rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative border border-white/10">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Investors Edge <span className="text-brand-yellow">Africa</span></h3>
            <p className="text-blue-100 mb-8 text-lg font-light leading-relaxed max-w-md">
              Bridging the information gap in Malawi's and Africa's investment landscape. We empower the next generation of visionaries.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/12KkZYvDZqT/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/investors_edge_africa" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
               <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-blue-100 hover:text-white hover:translate-x-2 transition-all inline-block">About Us</Link></li>
              <li><Link to="/services" className="text-blue-100 hover:text-white hover:translate-x-2 transition-all inline-block">Our Services</Link></li>
              <li><Link to="/register" className="text-blue-100 hover:text-white hover:translate-x-2 transition-all inline-block">Summit Registration</Link></li>
              <li><Link to="/team" className="text-blue-100 hover:text-white hover:translate-x-2 transition-all inline-block">Leadership Team</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-brand-blue/20 p-2 rounded-lg mr-4"><MapPin className="h-5 w-5 text-brand-yellow" /></div>
                <span className="text-blue-100">Blantyre Urban, Malawi<br/>SADC Region</span>
              </li>
              <li className="flex items-center">
                 <div className="bg-brand-blue/20 p-2 rounded-lg mr-4"><Phone className="h-5 w-5 text-brand-yellow" /></div>
                <span className="text-blue-100">+265 880 888 3335</span>
              </li>
              <li className="flex items-center">
                 <div className="bg-brand-blue/20 p-2 rounded-lg mr-4"><Mail className="h-5 w-5 text-brand-yellow" /></div>
                <span className="text-blue-100">joseph@investorsedgeafrica.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-sm text-blue-200/60 font-medium">&copy; {new Date().getFullYear()} Investors Edge Africa. BRN: G5SJNDN.</p>
          <Link to="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-blue-200 hover:text-brand-dark hover:bg-brand-yellow transition-all duration-300 group">
            <Lock size={12} /> 
            Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;