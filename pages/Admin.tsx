import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  PenTool,
  Settings,
  LogOut,
  Trash2,
  Plus,
  Calendar,
  Save,
  Upload,
  Image as ImageIcon,
  X,
  Clock,
  MapPin,
  Sparkles,
  UserCheck,
  Briefcase,
  Mic,
  FileImage,
  AlertTriangle,
  Coffee,
  Award,
  Zap,
  Handshake,
  Ticket,
} from "lucide-react";
import { data } from "react-router-dom";
import { set } from "mongoose";

const Admin: React.FC = () => {
  const {
    testimonials,
    stories,
    summitConfig,
    speakers,
    teamMembers,
    highlights,
    sponsors,
    experienceItems,
    registrationConfig,
    deleteTestimonial,
    deleteStory,
    addTestimonial,
    addStory,
    updateRegistrationConfig,
    addSpeaker,
    deleteSpeaker,
    addTeamMember,
    deleteTeamMember,
    addHighlight,
    deleteHighlight,
    addSponsor,
    deleteSponsor,
    updateExperienceItem,
    fetchSponsors,
    fetchSpeakers,
    fetchStories,
    fetchTeamMembers,
    fetchTestimonials,
    fetchHighlights,
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [placeholder, setplaceholder] = useState<File | null>(null);

  // Form States
  const [messages, setMessages] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    author: "",
    role: "",
    quote: "",
    image: "https://picsum.photos/200",
  });
  const [newStory, setNewStory] = useState({
    title: "",
    category: "",
    excerpt: "",
    date: new Date().toLocaleDateString(),
    image: "https://picsum.photos/600/400",
  });
  const [newSpeaker, setNewSpeaker] = useState({
    name: "",
    role: "",
    image: "https://picsum.photos/400",
  });
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: "https://picsum.photos/400",
  });
  const [newHighlight, setNewHighlight] = useState<{
    url: string;
    type: "image" | "video";
    caption: string;
  }>({ url: "", type: "image", caption: "" });
  const [newSponsor, setNewSponsor] = useState({ name: "", logo: "" });

  // Summit Info Form State
  const [summitForm, setSummitForm] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [regConfigForm, setRegConfigForm] = useState(registrationConfig);

  // Message
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("https://investorsedgeafrica.onrender.com/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, []);

    useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("https://investorsedgeafrica.onrender.com/api/tickets");
        const data = await res.json();
        setRegistrations(data);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };

    fetchTickets();
  }, []);

  // Handle Summit Info Change

  const handleSummitChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    subfield?: string,
    index?: number
  ) => {
    if (subfield && index !== undefined) {
      setSummitForm((prev) => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [subfield]: prev[field as keyof typeof prev][subfield].map(
            (item, i) => (i === index ? e.target.value : item)
          ),
        },
      }));
    } else if (subfield) {
      setSummitForm((prev) => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [subfield]: e.target.value,
        },
      }));
    } else {
      setSummitForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  // Summit Info Form State
  const submitSummit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/summit-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summitForm),
      });
      const data = await res.json();
      if (data.success) {
        alert("Summit info updated!");
      } else {
        alert("Failed to update summit info");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  const submitRegistrationConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/registration-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regConfigForm),
      });
      const data = await res.json();
      if (data.success) {
        alert("Registration config updated!");
      } else {
        alert("Failed to update registration config");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  // Sponsor Management

  const submitSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", newSponsor.name);
      formData.append("logo", file);

      alert(file?.name);
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/sponsors", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchSponsors();
        setNewSponsor({ name: "", logo: "" });
      } else {
        alert("Failed to add sponsor");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again. rr");
    }
  };

  const submitSpeaker = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", newSpeaker.name);
      formData.append("role", newSpeaker.role);
      formData.append("speakerImg", file);

      alert(file?.name);
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/speakers", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchSpeakers();
        setNewSpeaker({ name: "", role: "", image: "" });
      } else {
        alert("Failed to add speaker");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again. rr");
    }
  };

    const submitTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", newTeamMember.name);
      formData.append("role", newTeamMember.role);
      formData.append("bio", newTeamMember.bio);  
      formData.append("teamImg", file);

      alert(file?.name);
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/team-members", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchTeamMembers();
        setNewTeamMember({ name: "", role: "", bio: "", image: "" });
      } else {
        alert("Failed to add team member");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again. rr");
    }
  };

    const submitTestimonials = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", newTestimonial.author);
      formData.append("role", newTestimonial.role);
      formData.append("quote", newTestimonial.quote);
      formData.append("testimonialImg", file);

      alert(file?.name);
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/testimonials", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
        setNewTestimonial({ name: "", role: "", image: "" });
      } else {
        alert("Failed to add testimonial");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again. rr");
    }
  };

    const submitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("title", newStory.title);
      formData.append("category", newStory.category);
      formData.append("excerpt", newStory.excerpt);
      formData.append("date", new Date().toLocaleDateString());
      formData.append("storyImg", file);

      alert(file?.name);
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/stories", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchStories();
        setNewStory({ title: "", category: "", excerpt: "", date: "", image: "" });
      } else {
        alert("Failed to add story");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again. rr");
    }
  };

    const submitHighlight = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("name", newHighlight.caption);
      formData.append("highlightImg", file);

      alert(file?.name);
    try {
      const res = await fetch("https://investorsedgeafrica.onrender.com/api/highlights", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchHighlights();
        setNewHighlight({ caption: "", image: "" });
      } else {
        alert("Failed to add highlight");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again. rr");
    }
  };



  // Sync local form with global config
  useEffect(() => {
    setSummitForm(summitConfig);
    setRegConfigForm(registrationConfig);
  }, [summitConfig, registrationConfig]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") setIsAuthenticated(true);
    else alert("Invalid password");
  };

  const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject("Failed to convert file");
    };

    reader.readAsDataURL(file); // <-- THIS creates base64
  });
};


  // Generic handler for form file inputs
  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<any>,
  fieldName: string
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const target = e.target as HTMLInputElement & { files: FileList }; setFile(target.files[0]);

  setter((prev: any) => ({
    ...prev,
    [fieldName]: file.name, // 👈 field-specific
  }));
};


  const handleHeroFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<any>,
  fieldName: string
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const base64 = await fileToBase64(file);

    setter((prev: any) => ({
      ...prev,
      [fieldName]: base64, // <-- store base64
    }));
  } catch (err) {
    console.error(err);
  }
};


  const handleSummitHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSummitForm((prev) => ({
          ...prev,
          heroImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegConfigForm((prev) => ({
          ...prev,
          heroImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const iconMap: any = {
    Mic: <Mic size={20} />,
    Coffee: <Coffee size={20} />,
    Award: <Award size={20} />,
    Zap: <Zap size={20} />,
  };

  // Preview Component for Summit Manager
  const SummitPreviewCard = ({ config }: { config: typeof summitConfig }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
      const target = new Date(config.targetDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [config.targetDate]);

    return (
      <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group cursor-default">
        <img
          src={config.heroImage}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/60 to-transparent opacity-90"></div>

        <div className="relative z-10 h-full flex flex-col p-8 text-white">
          <div className="flex justify-between items-start mb-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> 2025 Edition
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-brand-yellow font-medium text-sm tracking-widest uppercase mb-2">
              {config.subHeadline}
            </h3>
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter drop-shadow-xl">
              {config.headline.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <div className="flex gap-2 mb-6">
            {["Days", "Hours", "Mins"].map((label, i) => (
              <div
                key={label}
                className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-2 text-center border border-white/10"
              >
                <div className="text-2xl font-black">
                  {Object.values(timeLeft)[i] || 0}
                </div>
                <div className="text-[8px] text-brand-yellow uppercase font-bold">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-brand-yellow rounded-lg text-brand-blue">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-blue-200 text-xs font-bold uppercase">
                  Date
                </p>
                <p className="font-bold">{config.dateText}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-brand-yellow rounded-lg text-brand-blue">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-blue-200 text-xs font-bold uppercase">
                  Venue
                </p>
                <p className="font-bold truncate">{config.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Admin Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase">
                    Messages
                  </p>
                  <h3 className="text-3xl font-black text-slate-800 mt-2">
                    {messages.length}
                  </h3>
                </div>
                <div className="p-3 bg-blue-50 text-brand-blue rounded-xl">
                  <MessageSquare size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase">
                    Registrations
                  </p>
                  <h3 className="text-3xl font-black text-slate-800 mt-2">
                    {registrations.length}
                  </h3>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <Users size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase">
                    Speakers
                  </p>
                  <h3 className="text-3xl font-black text-slate-800 mt-2">
                    {speakers.length}
                  </h3>
                </div>
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <Mic size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase">
                    Highlights
                  </p>
                  <h3 className="text-3xl font-black text-slate-800 mt-2">
                    {highlights.length}
                  </h3>
                </div>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <FileImage size={24} />
                </div>
              </div>
            </div>
          </div>
        );
      // Manage Messages
      case "messages":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-xl">Inbox</h3>
            </div>
            {messages.length === 0 ? (
              <p className="p-6 text-slate-500">No messages yet.</p>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-bold text-slate-500">
                      Date
                    </th>
                    <th className="text-left p-4 text-sm font-bold text-slate-500">
                      Name
                    </th>
                    <th className="text-left p-4 text-sm font-bold text-slate-500">
                      Email
                    </th>
                    <th className="text-left p-4 text-sm font-bold text-slate-500">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map((msg) => (
                    <tr key={msg.email} className="hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                        {msg.date}
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {msg.name}
                      </td>
                      <td className="p-4 text-blue-600">{msg.email}</td>
                      <td className="p-4 text-slate-600 max-w-xs truncate">
                        {msg.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case "registrations":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left: Registration Page Editor */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full overflow-y-auto">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Ticket className="text-brand-blue" /> Page Config
              </h3>

              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-1">
                    Page Title
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    value={regConfigForm.title}
                    onChange={(e) =>
                      setRegConfigForm({
                        ...regConfigForm,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-2 border rounded"
                    value={regConfigForm.description}
                    onChange={(e) =>
                      setRegConfigForm({
                        ...regConfigForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-1">
                    Success Message
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border rounded"
                    value={regConfigForm.successMessage}
                    onChange={(e) =>
                      setRegConfigForm({
                        ...regConfigForm,
                        successMessage: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <label className="block text-slate-500 text-xs font-bold uppercase mb-2">
                    Registration Hero Image
                  </label>
                  <div className="relative group rounded-lg overflow-hidden border-2 border-dashed border-slate-200 aspect-video hover:bg-slate-50 cursor-pointer">
                    <img
                      src={regConfigForm.heroImage}
                      className="w-full h-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => { handleRegHeroUpload; handleHeroFileChange(e, setRegConfigForm, "heroImage"); }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Change Image
                    </div>
                  </div>
                </div>

                <button
                  onClick={submitRegistrationConfig}
                  className="w-full mt-4 bg-brand-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
                >
                  <Save size={18} /> Save Config
                </button>
              </div>
            </div>

            {/* Right: Attendees List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-xl">
                  Attendees List ({registrations.length})
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {registrations.length === 0 ? (
                  <p className="p-6 text-slate-500">No registrations yet.</p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        <th className="text-left p-4 text-sm font-bold text-slate-500">
                          Date
                        </th>
                        <th className="text-left p-4 text-sm font-bold text-slate-500">
                          Name
                        </th>
                        <th className="text-left p-4 text-sm font-bold text-slate-500">
                          Email
                        </th>
                        <th className="text-left p-4 text-sm font-bold text-slate-500">
                          Institution
                        </th>
                        <th className="text-left p-4 text-sm font-bold text-slate-500">
                          Course
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50">
                          <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                            {reg.date}
                          </td>
                          <td className="p-4 font-bold text-slate-800">
                            {reg.fullName}
                          </td>
                          <td className="p-4 text-blue-600">{reg.email}</td>
                          <td className="p-4 text-slate-600">
                            {reg.institution}
                          </td>
                          <td className="p-4 text-slate-600">{reg.course}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        );
      case "people":
        return (
          <div className="space-y-12">
            {/* Sponsors Manager */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Handshake className="text-brand-blue" /> Manage Sponsors
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                  <h4 className="font-bold text-sm uppercase text-slate-500 mb-4">
                    Add Sponsor
                  </h4>
                  <div className="space-y-4">
                    <input
                      className="w-full p-3 border rounded-lg bg-white"
                      placeholder="Company Name"
                      value={newSponsor.name}
                      onChange={(e) =>
                        setNewSponsor({ ...newSponsor, name: e.target.value })
                      }
                    />
                    <div className="relative">
                      <input
                        className="w-full p-3 border rounded-lg bg-white pr-10"
                        placeholder="Logo URL (or upload below)"
                        value={newSponsor.logo || placeholder || ""}
                        readOnly
                      />
                      <label
                        className="absolute right-2 top-2 p-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
                        title="Upload Logo"
                      >
                        <Upload size={16} className="text-slate-600" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(e, setNewSponsor, "logo")
                          }
                        />
                      </label>
                    </div>
                    <button
                      onClick={submitSponsor}
                      className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
                    >
                      <Plus size={18} /> Add Sponsor
                    </button>
                  </div>
                </div>
                {/* List */}
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sponsors.map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-col items-center justify-center p-4 border rounded-xl bg-white shadow-sm relative group h-32"
                    >
                      <img
                        src={`components/${s.logoUrl}`}
                        alt={s.name}
                        className="max-w-full max-h-20 object-contain"
                      />
                      <button
                        onClick={() => deleteSponsor(s._id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                      <p className="text-xs text-slate-500 mt-2 font-bold">
                        {s.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summit Speakers */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Briefcase className="text-brand-blue" /> Manage Summit Speakers
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                  <h4 className="font-bold text-sm uppercase text-slate-500 mb-4">
                    Add Speaker
                  </h4>
                  <div className="space-y-4">
                    <input
                      className="w-full p-3 border rounded-lg bg-white"
                      placeholder="Name (e.g. Dr. Jane Doe)"
                      value={newSpeaker.name}
                      onChange={(e) =>
                        setNewSpeaker({ ...newSpeaker, name: e.target.value })
                      }
                    />
                    <input
                      className="w-full p-3 border rounded-lg bg-white"
                      placeholder="Role (e.g. CEO, FinTech)"
                      value={newSpeaker.role}
                      onChange={(e) =>
                        setNewSpeaker({ ...newSpeaker, role: e.target.value })
                      }
                    />
                    <div className="relative">
                      <input
                        className="w-full p-3 border rounded-lg bg-white pr-10"
                        placeholder="Image URL (or upload below)"
                        value={newSpeaker.image || placeholder || ""}
                        readOnly
                      />
                      <label
                        className="absolute right-2 top-2 p-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
                        title="Upload Image"
                      >
                        <Upload size={16} className="text-slate-600" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setNewSpeaker , "image")}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-green-600 font-bold">
                      * High Quality Uploads Enabled
                    </p>
                    <button
                      onClick={
                        submitSpeaker
                      }
                      className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
                    >
                      <Plus size={18} /> Add Speaker
                    </button>
                  </div>
                </div>
                {/* List */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {speakers.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm"
                    >
                      <img
                        src={`components/${s.imageUrl}`}
                        alt={s.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{s.name}</h4>
                        <p className="text-xs text-slate-500">{s.role}</p>
                      </div>
                      <button
                        onClick={() => deleteSpeaker(s._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Team */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Users className="text-brand-blue" /> Manage Core Team
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Form */}
                <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                  <h4 className="font-bold text-sm uppercase text-slate-500 mb-4">
                    Add Team Member
                  </h4>
                  <div className="space-y-4">
                    <input
                      className="w-full p-3 border rounded-lg bg-white"
                      placeholder="Full Name"
                      value={newTeamMember.name}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      className="w-full p-3 border rounded-lg bg-white"
                      placeholder="Role (e.g. CMO)"
                      value={newTeamMember.role}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          role: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="w-full p-3 border rounded-lg bg-white"
                      placeholder="Short Bio..."
                      value={newTeamMember.bio}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          bio: e.target.value,
                        })
                      }
                    />
                    <div className="relative">
                      <input
                        className="w-full p-3 border rounded-lg bg-white pr-10"
                        placeholder="Image URL (or upload below)"
                        value={newTeamMember.image || placeholder || ""}
                        readOnly
                      />
                      <label
                        className="absolute right-2 top-2 p-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
                        title="Upload Image"
                      >
                        <Upload size={16} className="text-slate-600" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(e, setNewTeamMember, "image")
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs text-green-600 font-bold">
                      * High Quality Uploads Enabled
                    </p>
                    <button
                      onClick={submitTeamMember}
                      className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
                    >
                      <Plus size={18} /> Add Member
                    </button>
                  </div>
                </div>
                {/* List */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teamMembers.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-start gap-4 p-4 border rounded-xl bg-white shadow-sm"
                    >
                      <img
                        src={`components/${m.imageUrl}`}
                        alt={m.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{m.name}</h4>
                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-brand-blue text-[10px] font-bold uppercase rounded mb-1">
                          {m.role}
                        </span>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {m.bio}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTeamMember(m._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "cms":
        return (
          <div className="space-y-8">
            {uploadError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
                <AlertTriangle size={20} />
                {uploadError}
              </div>
            )}
            {/* Testimonials */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-xl mb-6">Manage Testimonials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4 border p-4 rounded-xl bg-slate-50">
                  <h4 className="font-bold text-sm uppercase text-slate-500">
                    Add New
                  </h4>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Author Name"
                    value={newTestimonial.author}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        author: e.target.value,
                      })
                    }
                  />
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Role / Company"
                    value={newTestimonial.role}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        role: e.target.value,
                      })
                    }
                  />
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Quote"
                    value={newTestimonial.quote}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        quote: e.target.value,
                      })
                    }
                  />
                  <div className="relative">
                    <input
                      className="w-full p-2 border rounded pr-10"
                      placeholder="Image URL"
                      value={newTestimonial.image || placeholder || ""}
                      readOnly
                    />
                    <label
                      className="absolute right-2 top-2 p-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
                      title="Upload Image"
                    >
                      <Upload size={14} className="text-slate-600" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setNewTestimonial, "image")}
                      />
                    </label>
                  </div>
                  <button
                    onClick={submitTestimonials}
                    className="bg-brand-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm"
                  >
                    <Plus size={16} /> Add Testimonial
                  </button>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="flex justify-between items-center p-3 border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`components/${t.imageUrl}`}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                        <div>
                          <p className="font-bold text-sm">{t.author}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[150px]">
                            {t.role}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTestimonial(t._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stories */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-xl mb-6">Manage Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 border p-4 rounded-xl bg-slate-50">
                  <h4 className="font-bold text-sm uppercase text-slate-500">
                    Add New Story
                  </h4>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Title"
                    value={newStory.title}
                    onChange={(e) =>
                      setNewStory({ ...newStory, title: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Category"
                    value={newStory.category}
                    onChange={(e) =>
                      setNewStory({ ...newStory, category: e.target.value })
                    }
                  />
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Excerpt"
                    value={newStory.excerpt}
                    onChange={(e) =>
                      setNewStory({ ...newStory, excerpt: e.target.value })
                    }
                  />
                  <div className="relative">
                    <input
                      className="w-full p-2 border rounded pr-10"
                      placeholder="Image URL"
                      value={newStory.image || placeholder || ""}
                      readOnly
                    />
                    <label
                      className="absolute right-2 top-2 p-1 bg-slate-100 rounded cursor-pointer hover:bg-slate-200"
                      title="Upload Image"
                    >
                      <Upload size={14} className="text-slate-600" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setNewStory, "image")}
                      />
                    </label>
                  </div>
                  <button
                    onClick={submitStory}
                    className="bg-brand-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm"
                  >
                    <Plus size={16} /> Add Story
                  </button>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {stories.map((s) => (
                    <div
                      key={s.id}
                      className="flex justify-between items-center p-3 border rounded-lg bg-white"
                    >
                      <div>
                        <p className="font-bold text-sm">{s.title}</p>
                        <p className="text-xs text-slate-500">{s.category}</p>
                      </div>
                      <button
                        onClick={() => deleteStory(s._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "summit":
        return (
          <div className="h-[calc(100vh-120px)] w-full rounded-3xl overflow-hidden bg-brand-dark border border-slate-800 shadow-2xl flex flex-col md:flex-row">
            {/* LEFT: Editor Panel */}
            <div className="md:w-1/2 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-blue scrollbar-track-slate-800">
              {uploadError && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 mb-6">
                  <AlertTriangle size={20} />
                  {uploadError}
                </div>
              )}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-blue rounded-xl text-brand-yellow">
                  <Settings size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Summit Editor
                  </h2>
                  <p className="text-blue-200 text-xs">
                    Real-time configuration for the landing page.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Experience Manager (NEW) */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles size={16} /> What to Expect
                  </h3>
                  <p className="text-xs text-blue-200 mb-4">
                    Edit the content for "The Experience" section.
                  </p>

                  <div className="space-y-4">
                    {experienceItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-900/50 rounded-xl border border-white/5"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="p-1 bg-white/10 rounded">
                            {iconMap[item.iconName]}
                          </span>
                          <span className="text-xs font-bold text-brand-yellow uppercase">
                            Slot {index + 1}
                          </span>
                        </div>
                        <input
                          className="w-full bg-slate-800 border border-slate-700 text-white p-2 rounded text-sm mb-2"
                          value={item.title}
                          onChange={(e) => {
                            handleSummitChange(e, "experience", "title", index);
                            updateExperienceItem(item.id, {
                              title: e.target.value,
                            });
                          }}
                          placeholder="Title"
                        />
                        <textarea
                          className="w-full bg-slate-800 border border-slate-700 text-slate-300 p-2 rounded text-xs"
                          value={item.desc}
                          onChange={(e) => {
                            handleSummitChange(e, "experience", "desc", index);
                            updateExperienceItem(item.id, {
                              desc: e.target.value,
                            });
                          }}
                          placeholder="Description"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights Manager */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileImage size={16} /> Past Highlights Gallery
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {highlights.map((h) => (
                      <div
                        key={h.id}
                        className="relative group rounded-lg overflow-hidden border border-white/10 aspect-video bg-black"
                      >
                        {h.type === "video" ? (
                          <video
                            src={h.url}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={`components/${h.imageUrl}`}
                            className="w-full h-full object-cover"
                            alt={h.caption}
                          />
                        )}
                        <button
                          onClick={() => deleteHighlight(h._id)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded shadow hover:bg-red-600 z-10"
                        >
                          <X size={12} />
                        </button>
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 p-1 text-[10px] text-white truncate">
                          {h.caption}
                        </div>
                        {h.type === "video" && (
                          <div className="absolute top-1 left-1 bg-brand-blue/80 text-white text-[8px] font-bold px-1 rounded">
                            VIDEO
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 p-4 bg-slate-900/50 rounded-xl border border-white/5">
                    <label className="block text-xs font-bold text-blue-200">
                      Add New Highlight
                    </label>
                    <input
                      className="w-full bg-slate-800 border border-slate-700 text-white p-2 rounded text-sm"
                      placeholder="Caption..."
                      value={newHighlight.caption}
                      onChange={(e) => {
                        handleSummitChange;
                        setNewHighlight({
                          ...newHighlight,
                          caption: e.target.value,
                        });
                      }}
                    />

                    <div className="flex gap-2">
                      <select
                        className="bg-slate-800 border border-slate-700 text-white p-2 rounded text-sm"
                        value={newHighlight.type}
                        onChange={(e) => {
                          handleSummitChange;
                          setNewHighlight({
                            ...newHighlight,
                            type: e.target.value as "image" | "video",
                          });
                        }}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>

                      {newHighlight.type === "image" ? (
                        <label className="flex-1 cursor-pointer bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white p-2 rounded text-sm flex items-center justify-center gap-2">
                          <Upload size={14} /> Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleSummitChange;
                              handleFileChange(e, setNewHighlight, "url");
                            }}
                          />
                        </label>
                      ) : (
                        <input
                          className="flex-1 bg-slate-800 border border-slate-700 text-white p-2 rounded text-sm"
                          placeholder="Video URL (mp4)"
                          value={newHighlight.url}
                          onChange={(e) => {
                            handleSummitChange;
                            setNewHighlight({
                              ...newHighlight,
                              url: e.target.value,
                            });
                          }}
                        />
                      )}
                    </div>
                    {newHighlight.type === "image" && newHighlight.url && (
                      <span className="text-green-400 text-xs font-bold">
                        Image Selected
                      </span>
                    )}

                    <button
                      onClick={submitHighlight}
                      className="w-full bg-brand-blue text-white py-2 rounded font-bold text-sm"
                    >
                      Add to Gallery
                    </button>
                  </div>
                </div>

                {/* Image Manager */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-4">
                    Hero Image
                  </h3>
                  <div className="relative group">
                    <div className="h-40 w-full rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer overflow-hidden">
                      {summitForm.heroImage ? (
                        <img
                          src={summitForm.heroImage}
                          alt="Preview"
                          className="w-full h-full object-cover opacity-60"
                        />
                      ) : (
                        <ImageIcon className="text-slate-400 w-10 h-10 mb-2" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <label className="cursor-pointer flex flex-col items-center">
                          <Upload className="text-brand-yellow w-8 h-8 mb-2 drop-shadow-md" />
                          <span className="text-white font-bold text-sm drop-shadow-md">
                            {summitForm.heroImage
                              ? "Replace Image"
                              : "Upload Image"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {handleSummitHeroUpload; handleHeroFileChange(e, setSummitForm, "heroImage")}}
                          />
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2 text-center">
                      * High Quality Uploads Enabled
                    </p>
                  </div>
                </div>

                {/* Typography Editor */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <h3 className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-2">
                    Typography
                  </h3>
                  <div>
                    <label className="block text-blue-200 text-xs font-bold mb-1">
                      Main Headline
                    </label>
                    <input
                      className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none"
                      value={summitForm.headline}
                      onChange={(e) => {
                        handleSummitChange(e, "typography", "headline");
                        setSummitForm({
                          ...summitForm,
                          headline: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-xs font-bold mb-1">
                      Sub Headline
                    </label>
                    <input
                      className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none"
                      value={summitForm.subHeadline}
                      onChange={(e) => {
                        handleSummitChange(e, "typography", "subHeadline");
                        setSummitForm({
                          ...summitForm,
                          subHeadline: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-xs font-bold mb-1">
                      Description Paragraph
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none"
                      value={summitForm.description}
                      onChange={(e) => {
                        handleSummitChange(e, "typography", "description");
                        setSummitForm({
                          ...summitForm,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Metrics & Data */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <h3 className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-2">
                    Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {summitForm.stats.map((stat, idx) => (
                      <div key={idx} className="space-y-2">
                        <input
                          className="w-full bg-slate-900 border border-slate-700 text-brand-yellow font-bold text-center p-2 rounded-lg"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...summitForm.stats];
                            newStats[idx].value = e.target.value;
                            setSummitForm({ ...summitForm, stats: newStats });
                            handleSummitChange;
                          }}
                        />
                        <input
                          className="w-full bg-slate-900 border border-slate-700 text-slate-400 text-xs text-center p-2 rounded-lg"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...summitForm.stats];
                            newStats[idx].label = e.target.value;
                            setSummitForm({ ...summitForm, stats: newStats });
                            handleSummitChange;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Logistics */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <h3 className="text-brand-yellow font-bold text-sm uppercase tracking-widest mb-2">
                    Logistics
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-blue-200 text-xs font-bold mb-1 flex items-center gap-2">
                        <Clock size={12} /> Event Date Text
                      </label>
                      <input
                        className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
                        value={summitForm.dateText}
                        onChange={(e) => {
                          handleSummitChange(e, "logistics", "dateText");
                          setSummitForm({
                            ...summitForm,
                            dateText: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 text-xs font-bold mb-1 flex items-center gap-2">
                        <MapPin size={12} /> Venue
                      </label>
                      <input
                        className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
                        value={summitForm.location}
                        onChange={(e) => {
                          handleSummitChange(e, "logistics", "venue");
                          setSummitForm({
                            ...summitForm,
                            location: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 text-xs font-bold mb-1">
                        Countdown Target (ISO)
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
                        value={summitForm.targetDate.slice(0, 16)}
                        onChange={(e) => {
                          handleSummitChange(e, "logistics", "countdown");
                          setSummitForm({
                            ...summitForm,
                            targetDate: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={submitSummit}
                  className="w-full py-4 bg-brand-yellow hover:bg-white text-brand-dark font-black rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Save size={20} /> PUBLISH CHANGES
                </button>
              </div>
            </div>

            {/* RIGHT: Live Preview */}
            <div className="md:w-1/2 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col items-center justify-center border-l border-slate-800 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="mb-6 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>{" "}
                Live Preview
              </div>
              <div className="w-full max-w-sm">
                <SummitPreviewCard config={summitForm} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <span className="font-black text-xl tracking-tight text-brand-yellow">
            IEA ADMIN
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "summit", icon: Settings, label: "Summit Editor" },
            { id: "registrations", icon: Ticket, label: "Registration Mgr" },
            { id: "people", icon: UserCheck, label: "People Manager" },
            { id: "messages", icon: MessageSquare, label: "Messages" },
            { id: "cms", icon: PenTool, label: "Content (CMS)" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-brand-blue font-bold shadow-lg text-white"
                  : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-slate-800 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 md:hidden">
          <span className="font-black text-xl text-slate-900">Admin Panel</span>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm font-bold text-red-500"
          >
            Logout
          </button>
        </header>

        {/* Mobile Nav Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 md:hidden pb-2">
          {[
            "dashboard",
            "summit",
            "registrations",
            "people",
            "messages",
            "cms",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                activeTab === t
                  ? "bg-brand-blue text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
