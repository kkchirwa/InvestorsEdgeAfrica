import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import {
  ArrowRight,
  User,
  Mail,
  Loader2,
  QrCode,
  School,
  GraduationCap,
  Check,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn, Magnetic } from "../components/UIEffects";

const Register: React.FC = () => {
  const { addRegistration, registrationConfig, setRegistrationConfig } =
    useData();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    institution: "",
    course: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [showPayment, setShowPayment] = useState(false);
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"airtel_money" | "mpamba">(
    "airtel_money"
  );
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "waiting"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePayment = async () => {
    try {
      setPaymentStatus("initiating");

      const res = await fetch(
        "https://investorsedgeafrica.onrender.com/api/paychangu/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            phone,
            method,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setPaymentStatus("waiting");
      } else {
        alert("Payment failed to start");
        setPaymentStatus("idle");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error");
      setPaymentStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 PAYMENT PAGE (HIGHEST PRIORITY)
  if (showPayment) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

          <label className="block text-sm font-bold mb-2">Mobile Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0999XXXXXX"
            className="w-full p-4 border rounded-xl mb-4"
          />

          <label className="block text-sm font-bold mb-2">Payment Method</label>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod("airtel_money")}
              className={`flex-1 p-4 rounded-xl font-bold ${
                method === "airtel_money"
                  ? "bg-brand-blue text-white"
                  : "bg-slate-100"
              }`}
            >
              Airtel Money
            </button>

            <button
              onClick={() => setMethod("mpamba")}
              className={`flex-1 p-4 rounded-xl font-bold ${
                method === "mpamba"
                  ? "bg-brand-blue text-white"
                  : "bg-slate-100"
              }`}
            >
              Mpamba
            </button>
          </div>

          {paymentStatus === "waiting" ? (
            <div className="text-center">
              <Loader2 className="animate-spin mx-auto mb-4" />
              <p className="font-bold">Waiting for payment confirmation…</p>
              <p className="text-sm text-slate-500">
                Enter your PIN on your phone
              </p>
            </div>
          ) : (
            <button
              onClick={handlePayment}
              className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/30 via-brand-dark to-black"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-blue/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

        <FadeIn className="relative z-10 w-full max-w-2xl flex flex-col items-center">
          {/* Success Indicator */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] mb-6 animate-[bounce-subtle_2s_infinite]">
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              You're Confirmed!
            </h2>
            <p className="text-blue-100 text-lg font-medium">
              Your student pass has been sent to{" "}
              <span className="text-brand-yellow">{formData.email}</span>...
            </p>
          </div>

          {/* Premium Digital Ticket */}
          <div className="w-full relative group perspective-1000">
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:rotate-1 hover:scale-[1.01]">
              {/* Ticket Header */}
              <div className="bg-gradient-to-r from-brand-blue to-blue-900 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-yellow/20 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-4">
                      <Sparkles size={10} /> Official Summit Pass
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
                      Next Gem <br /> Founders
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white/10">2025</p>
                  </div>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-8 bg-white text-slate-900 relative">
                {/* Decorative Holes */}
                <div className="absolute -left-3 top-0 transform -translate-y-1/2 w-6 h-6 bg-brand-dark rounded-full"></div>
                <div className="absolute -right-3 top-0 transform -translate-y-1/2 w-6 h-6 bg-brand-dark rounded-full"></div>
                <div className="absolute top-0 left-8 right-8 border-t-2 border-dashed border-slate-300"></div>

                <div className="flex flex-col md:flex-row gap-8 items-center pt-4">
                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Attendee
                        </p>
                        <p className="font-bold text-lg leading-none">
                          {formData.fullName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <School size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Institution
                        </p>
                        <p className="font-bold text-lg leading-none">
                          {formData.institution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <QrCode className="w-24 h-24 text-slate-900" />
                    <p className="text-[10px] font-bold uppercase text-slate-400 mt-2 tracking-widest">
                      Entry Code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12">
            <Magnetic>
              <Link
                to="/"
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    fullName: "",
                    email: "",
                    institution: "",
                    course: "",
                  });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-dark rounded-full font-bold hover:bg-brand-yellow transition-colors shadow-lg"
              >
                Back to Home <ArrowRight size={18} />
              </Link>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative">
      {/* LEFT: Content & Visuals (40%) */}
      <div className="md:w-[40%] bg-slate-900 relative flex flex-col justify-center p-8 md:p-12 lg:p-16 text-white overflow-hidden min-h-[400px]">
        {/* Dynamic BG Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={registrationConfig.heroImage}
            className="w-full h-full object-cover opacity-40"
            alt="Event"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-brand-yellow text-brand-dark font-bold text-xs uppercase tracking-widest rounded-full mb-6">
            Registration Open
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter">
            {registrationConfig.title}
          </h1>
          <p className="text-blue-100 text-lg font-light leading-relaxed mb-8 max-w-md">
            {registrationConfig.description}
          </p>

          {/* Simple Stats */}
          <div className="flex gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-black text-white">0</p>
              <p className="text-xs text-slate-400 font-bold uppercase">
                Cost (Free)
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">400+</p>
              <p className="text-xs text-slate-400 font-bold uppercase">
                Attending
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Form (60%) */}
      <div className="md:w-[60%] bg-slate-50 flex items-center justify-center p-8 md:p-12 relative">
        <div className="w-full max-w-lg">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Student Details
            </h2>
            <p className="text-slate-500">
              Please provide your academic information below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User size={16} /> Full Name
                </label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="john@uni.ac.mw"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <School size={16} /> University / College
                </label>
                <input
                  required
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="e.g. MUBAS"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <GraduationCap size={16} /> Course & Year
                </label>
                <input
                  required
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
                  placeholder="e.g. Entrepreneurship Yr 3"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-5 bg-brand-blue text-white font-bold rounded-xl shadow-xl hover:bg-blue-800 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Confirm Student Registration <ArrowRight size={20} />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                Valid Student ID will be required at the venue entrance.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
