import React, { useState } from 'react';
import { Ticket, CheckCircle, Plus, Minus } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    ticketType: 'General Admission',
    quantity: 1
  });
  const [submitted, setSubmitted] = useState(false);

  
  const ticketTypes = [
    'General Admission',
    'VIP Access',
    'Student Pass',
    'Exhibitor'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, parseInt(value) || 1) : value
    }));
  };

  const adjustQuantity = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Failed to register ticket');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-2">
            Thank you, {formData.fullName}.
          </p>
          <p className="text-gray-500 mb-6 text-sm">
            {formData.quantity}x {formData.ticketType} ticket(s). Check your email at {formData.email} to view your QR code.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({ fullName: '', email: '', ticketType: 'General Admission', quantity: 1 });
            }}
            className="text-brand-blue font-medium hover:underline"
          >
            Register another attendee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Left Side: Info */}
        <div className="md:col-span-2 bg-brand-blue p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Ticket className="h-8 w-8 text-brand-yellow" />
              <h2 className="text-2xl font-bold">Summit Registration</h2>
            </div>
            <p className="text-blue-100 mb-6">
              Secure your spot at the upcoming "Next Gem Founders Summit". Connect with investors, learn from experts, and pitch your ideas.
            </p>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></span>
                Network with 400+ attendees
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></span>
                Access to investor panels
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></span>
                Lunch & Refreshments included
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <p className="text-xs text-blue-200">
              Need help? Call +265 880 888 3335
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-3 p-8 md:p-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Get Your Ticket</h3>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Free Entry</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition"
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">
                  Ticket Type
                </label>
                <select
                  id="ticketType"
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue transition"
                >
                  {ticketTypes.map((type) => (
                    <option key={type} value={type}>
                      {type} (Free)
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      type="button" 
                      onClick={() => adjustQuantity(-1)} 
                      className="p-3 hover:bg-gray-100 text-gray-600 rounded-l-lg transition focus:outline-none"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input 
                      type="number" 
                      name="quantity" 
                      value={formData.quantity} 
                      onChange={handleChange}
                      min="1"
                      className="w-16 text-center border-none focus:ring-0 p-0 text-gray-900 font-semibold h-full"
                    />
                    <button 
                      type="button" 
                      onClick={() => adjustQuantity(1)} 
                      className="p-3 hover:bg-gray-100 text-gray-600 rounded-r-lg transition focus:outline-none"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Maximum 10 tickets per order
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-blue">Total Cost</span>
                <span className="text-2xl font-bold text-green-600">Free</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * No payment required. Your ticket will be emailed to you instantly.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-blue-900 bg-brand-yellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-all transform hover:-translate-y-1"
            >
              <Ticket className="mr-2 h-5 w-5" />
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
