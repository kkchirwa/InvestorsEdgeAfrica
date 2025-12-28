import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Facebook, Instagram, Send, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Failed to send message');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden pb-20">
      
       {/* Background Blobs */}
       <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-lightBlue/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob"></div>
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-yellow/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative pt-32 pb-24 text-center z-10">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 inline-block ios-glass px-4 py-1 rounded-full">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-lightBlue">Us</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="ios-glass p-10 rounded-[3rem] h-full">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300"><MapPin className="h-6 w-6" /></div>
                <div className="ml-6"><p className="text-lg font-bold text-gray-900">Visit Us</p><p className="text-gray-600 font-medium text-lg">Blantyre Urban<br />Malawi</p></div>
              </div>
              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300"><Phone className="h-6 w-6" /></div>
                <div className="ml-6"><p className="text-lg font-bold text-gray-900">Call Us</p><p className="text-gray-600 font-medium text-lg">+265 880 888 3335</p></div>
              </div>
              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300"><Mail className="h-6 w-6" /></div>
                <div className="ml-6"><p className="text-lg font-bold text-gray-900">Email Us</p><p className="text-gray-600 font-medium text-lg break-all">joseph@investorsedgeafrica.org</p></div>
              </div>
            </div>
            <div className="mt-16">
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/12KkZYvDZqT/?mibextid=wwXIfr" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1"><Facebook className="h-6 w-6" /></a>
                <a href="https://www.instagram.com/investors_edge_africa" className="bg-pink-600 text-white p-4 rounded-full hover:bg-pink-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1"><Instagram className="h-6 w-6" /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="ios-glass p-10 rounded-[3rem] shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input required type="text" className="w-full px-5 py-4 rounded-2xl border border-white/40 bg-white/50 focus:ring-2 focus:ring-brand-blue transition outline-none backdrop-blur-sm" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input required type="email" className="w-full px-5 py-4 rounded-2xl border border-white/40 bg-white/50 focus:ring-2 focus:ring-brand-blue transition outline-none backdrop-blur-sm" placeholder="Your email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea required rows={5} className="w-full px-5 py-4 rounded-2xl border border-white/40 bg-white/50 focus:ring-2 focus:ring-brand-blue transition outline-none backdrop-blur-sm" placeholder="How can we help?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" disabled={submitted} className={`w-full font-bold py-4 px-6 rounded-full transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 ${submitted ? 'bg-green-500 text-white' : 'bg-brand-blue text-white hover:bg-blue-800'}`}>
                {submitted ? <><Check size={20} /> Sent Successfully</> : <><Send size={20} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;