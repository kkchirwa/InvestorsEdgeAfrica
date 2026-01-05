import React from "react";
import { ArrowRight } from "lucide-react";

const Register: React.FC = () => {
  // ✅ Hard redirect to external ticketing URL
  const handleGetTicket = () => {
    window.location.href = "https://www.ulinzinga.com/ev-GKosnwjQ";
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
          Get Your NextGen Founders Summit Ticket
        </h1>
        <p className="text-lg text-blue-100 mb-8">
          Secure your spot at Malawi’s premier entrepreneurship and investment event. Click below to get your ticket instantly.
        </p>

        <button
          onClick={handleGetTicket}
          className="px-8 py-5 bg-brand-blue text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          Get Ticket <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Register;
