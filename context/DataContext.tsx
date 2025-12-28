import React, { createContext, useContext, useState, useEffect } from "react";

// --- Types ---
export interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  institution: string; // Changed from organization for students
  course: string; // Changed from role for students
  date: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface Story {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Highlight {
  id: string;
  url: string;
  type: "image" | "video";
  caption: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  desc: string;
  iconName: string; // 'Mic', 'Coffee', 'Award', 'Zap'
  colorClass: string;
}

export interface SummitStat {
  value: string;
  label: string;
}

export interface SummitConfig {
  headline: string;
  subHeadline: string;
  description: string;
  dateText: string;
  targetDate: string; // ISO string for countdown
  location: string;
  heroImage: string;
  stats: SummitStat[];
}

export interface RegistrationConfig {
  title: string;
  description: string;
  successMessage: string;
  heroImage: string;
}

interface DataContextType {
  messages: Message[];
  addMessage: (msg: Omit<Message, "id" | "date">) => void;

  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, "id" | "date">) => void;

  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, "id">) => void;
  deleteTestimonial: (id: string) => void;

  stories: Story[];
  addStory: (s: Omit<Story, "id">) => void;
  deleteStory: (id: string) => void;

  speakers: Speaker[];
  addSpeaker: (s: Omit<Speaker, "id">) => void;
  deleteSpeaker: (id: string) => void;

  teamMembers: TeamMember[];
  addTeamMember: (m: Omit<TeamMember, "id">) => void;
  deleteTeamMember: (id: string) => void;

  highlights: Highlight[];
  addHighlight: (h: Omit<Highlight, "id">) => void;
  deleteHighlight: (id: string) => void;

  sponsors: Sponsor[];
  addSponsor: (s: Omit<Sponsor, "id">) => void;
  deleteSponsor: (id: string) => void;

  experienceItems: ExperienceItem[];
  updateExperienceItem: (id: string, item: Partial<ExperienceItem>) => void;

  summitConfig: SummitConfig;
  updateSummitConfig: (c: Partial<SummitConfig>) => void;

  registrationConfig: RegistrationConfig;
  updateRegistrationConfig: (c: Partial<RegistrationConfig>) => void;
}

// --- Initial Data ---
const initialTestimonials = [
  {
    id: "1",
    quote:
      "The mentorship I received completely shifted our business model. We went from struggling to break even to securing our first major contract in 3 months.",
    author: "Grace M.",
    role: "Founder, AgriTech Solutions",
    image: "https://picsum.photos/seed/grace/200/200",
  },
  {
    id: "2",
    quote:
      "Investors Edge Africa doesn't just talk about funding; they prepare you for it. The summit was the turning point for our logistics startup.",
    author: "Daniel K.",
    role: "CEO, SwiftLogistics",
    image: "https://picsum.photos/seed/daniel/200/200",
  },
  {
    id: "3",
    quote:
      "Finding vetted investment opportunities in Malawi was a challenge until we partnered with IEA. Their due diligence is world-class.",
    author: "Sarah J.",
    role: "Angel Investor",
    image: "https://picsum.photos/seed/sarah_investor/200/200",
  },
];

const initialStories = [
  {
    id: "1",
    category: "Market Trends",
    date: "Oct 12, 2024",
    title: "The Rise of Fintech in Southern Africa",
    excerpt:
      "Analyzing the rapid adoption of digital payment systems in rural Malawi.",
    image: "https://picsum.photos/seed/fintech/600/400",
  },
  {
    id: "2",
    category: "Investment",
    date: "Sep 28, 2024",
    title: "De-risking Early Stage Ventures",
    excerpt:
      "How Investors Edge Africa validates startup viability before funding.",
    image: "https://picsum.photos/seed/risk/600/400",
  },
  {
    id: "3",
    category: "Success Story",
    date: "Sep 15, 2024",
    title: "GreenHarvest: From Idea to Export",
    excerpt:
      "A look at how one agri-tech startup scaled production by 300% in 6 months.",
    image: "https://picsum.photos/seed/agri/600/400",
  },
];

const initialSpeakers = [
  {
    id: "1",
    name: "Sarah N. Phiri",
    role: "Investment Banker",
    image: "https://picsum.photos/seed/sarah/400/400",
  },
  {
    id: "2",
    name: "Dr. James Mwale",
    role: "Tech Entrepreneur",
    image: "https://picsum.photos/seed/james/400/400",
  },
  {
    id: "3",
    name: "Linda Chitembeya",
    role: "Venture Capitalist",
    image: "https://picsum.photos/seed/linda/400/400",
  },
  {
    id: "4",
    name: "Francis K. Banda",
    role: "Policy Advisor",
    image: "https://picsum.photos/seed/francis/400/400",
  },
];

const initialTeam = [
  {
    id: "1",
    name: "Joseph David Magombo",
    role: "Chief Executive Officer",
    bio: "Currently a 3rd year Entrepreneurship student, Joseph leads the strategic direction and overall operations.",
    image: "https://picsum.photos/seed/joseph/400/400",
  },
  {
    id: "2",
    name: "Chikondi Nkalango",
    role: "Chief Financial Officer",
    bio: "Currently a 3rd year Accountancy student. He leads in finances and portfolio management on the stock market.",
    image: "https://picsum.photos/seed/chikondi/400/400",
  },
  {
    id: "3",
    name: "David Mwanja",
    role: "Chief Marketing Officer",
    bio: "Leads the marketing department with creativity, ensuring our message reaches the right audience.",
    image: "https://picsum.photos/seed/david/400/400",
  },
  {
    id: "4",
    name: "Joshua Chrissford",
    role: "Chief of Investment",
    bio: "Leads a team in consultancy, providing expert advice to our clients.",
    image: "https://picsum.photos/seed/joshua/400/400",
  },
  {
    id: "5",
    name: "Modester Luhana",
    role: "Admin Assistant",
    bio: "Ensures smooth day-to-day operations and administrative efficiency.",
    image: "https://picsum.photos/seed/modester/400/400",
  },
];

const initialHighlights: Highlight[] = [
  {
    id: "1",
    url: "https://picsum.photos/seed/summit1/800/600",
    type: "image",
    caption: "2024 Networking Session",
  },
  {
    id: "2",
    url: "https://picsum.photos/seed/summit2/800/600",
    type: "image",
    caption: "Keynote Address",
  },
  {
    id: "3",
    url: "https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-casual-office-environment-4340-large.mp4",
    type: "video",
    caption: "Live Pitching",
  },
];

const initialSponsors = [
  {
    id: "1",
    name: "TechHub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  },
  {
    id: "2",
    name: "Ventures",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
  },
  {
    id: "3",
    name: "FutureFund",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
  },
  {
    id: "4",
    name: "Innovate",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  },
  {
    id: "5",
    name: "Growth",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
  },
];

const initialExperience = [
  {
    id: "1",
    title: "Pitch Arena",
    desc: "Live startup battles with real-time feedback from a panel of heavyweights.",
    iconName: "Mic",
    colorClass: "bg-red-500 text-white",
  },
  {
    id: "2",
    title: "Investor Lounge",
    desc: "Exclusive zones for 1-on-1 meetings and deal structuring.",
    iconName: "Coffee",
    colorClass: "bg-brand-yellow text-brand-dark",
  },
  {
    id: "3",
    title: "Masterclasses",
    desc: "Technical sessions led by industry experts on legal and tax compliance.",
    iconName: "Award",
    colorClass: "bg-brand-blue text-white",
  },
  {
    id: "4",
    title: "Networking Mixer",
    desc: "Unwind and build genuine relationships in a curated social setting.",
    iconName: "Zap",
    colorClass: "bg-purple-500 text-white",
  },
];

// https://picsum.photos/seed/summit_bg/800/1000

const initialSummitConfig: SummitConfig = {
  headline: "NEXT GEM FOUNDERS SUMMIT",
  subHeadline: "The Future is Now",
  description:
    "The definitive gathering where Malawi's most ambitious entrepreneurs meet global capital, strategy, and partnership. Join us for a transformative experience.",
  dateText: "June 24-25, 2025",
  targetDate: "2025-06-24T09:00:00",
  location: "Amaryllis Hotel, Blantyre",
  heroImage: "https://picsum.photos/seed/summit_bg/800/1000",
  stats: [
    { value: "400+", label: "Attendees" },
    { value: "$2M+", label: "Deal Flow" },
  ],
};

const initialRegistrationConfig: RegistrationConfig = {
  title: "Student Summit Pass",
  description:
    "Join over 400 students and innovators for the premier youth entrepreneurship summit. Valid student ID required at entry.",
  successMessage:
    "Your student pass has been generated and sent to your email. Please present this QR code and your Student ID at the entrance.",
  heroImage: "https://picsum.photos/seed/reg_hero/800/1000",
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper for safe storage
const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error("Storage limit exceeded or error saving data", e);
    alert(
      "Warning: Local storage is full. Some data (likely large images) could not be saved. Please try using smaller images."
    );
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load from local storage or use initial
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("iea_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem("iea_registrations");
    return saved ? JSON.parse(saved) : [];
  });

  const [testimonials, setTestimonials] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const [stories, setStories] = useState<Story | null>(null);

  const fetchStories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/stories");
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error("Failed to fetch stories", err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const [speakers, setSpeakers] = useState<Speaker | null>(null);

  const fetchSpeakers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/speakers");
      const data = await res.json();
      setSpeakers(data);
    } catch (err) {
      console.error("Failed to fetch speakers", err);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const [teamMembers, setTeamMembers] = useState<TeamMember | null>(null);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/team");
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error("Failed to fetch team members", err);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const [highlights, setHighlights] = useState<Highlight | null>(null);

    const fetchHighlights = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/highlights");
      const data = await res.json();
      setHighlights(data);
    } catch (err) {
      console.error("Failed to fetch summit info", err);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  const [sponsors, setSponsors] = useState<Sponsor | null>(null);

  const fetchSponsors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sponsors");
      const data = await res.json();
      setSponsors(data);
      alert(data.logo.name);
    } catch (err) {
      console.error("Failed to fetch sponsors", err);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>(
    () => {
      const saved = localStorage.getItem("iea_experience");
      return saved ? JSON.parse(saved) : initialExperience;
    }
  );

  const [summitConfig, setSummitConfig] = useState<SummitConfig | null>(null);

  const fetchSummitInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/summit-info");
      const data = await res.json();
      setSummitConfig(data);
    } catch (err) {
      console.error("Failed to fetch summit info", err);
    }
  };

  useEffect(() => {
    fetchSummitInfo();
  }, []);

  const [registrationConfig, setRegistrationConfig] =
    useState<RegistrationConfig | null>(null);
  useEffect(() => {
    const fetchRegistrationConfig = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/registration-config"
        );
        const data = await res.json();
        setRegistrationConfig(data);
      } catch (err) {
        console.error("Failed to fetch registration config", err);
      }
    };

    fetchRegistrationConfig();
  }, []);

  // Persist effects with safety check
  useEffect(
    () => safeSetItem("iea_messages", JSON.stringify(messages)),
    [messages]
  );
  useEffect(
    () => safeSetItem("iea_registrations", JSON.stringify(registrations)),
    [registrations]
  );
  useEffect(
    () => safeSetItem("iea_testimonials", JSON.stringify(testimonials)),
    [testimonials]
  );
  useEffect(
    () => safeSetItem("iea_stories", JSON.stringify(stories)),
    [stories]
  );
  useEffect(
    () => safeSetItem("iea_speakers", JSON.stringify(speakers)),
    [speakers]
  );
  useEffect(
    () => safeSetItem("iea_team", JSON.stringify(teamMembers)),
    [teamMembers]
  );
  useEffect(
    () => safeSetItem("iea_highlights", JSON.stringify(highlights)),
    [highlights]
  );
  useEffect(
    () => safeSetItem("iea_sponsors", JSON.stringify(sponsors)),
    [sponsors]
  );
  useEffect(
    () => safeSetItem("iea_experience", JSON.stringify(experienceItems)),
    [experienceItems]
  );
  useEffect(
    () => safeSetItem("iea_summit_config", JSON.stringify(summitConfig)),
    [summitConfig]
  );
  useEffect(
    () =>
      safeSetItem(
        "iea_registration_config",
        JSON.stringify(registrationConfig)
      ),
    [registrationConfig]
  );

  // Actions
  const addMessage = (msg: Omit<Message, "id" | "date">) => {
    const newMessage = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const addRegistration = (reg: Omit<Registration, "id" | "date">) => {
    const newReg = {
      ...reg,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };
    setRegistrations((prev) => [newReg, ...prev]);
  };

  const addTestimonial = (t: Omit<Testimonial, "id">) => {
    setTestimonials((prev) => [{ ...t, id: Date.now().toString() }, ...prev]);
  };

  const deleteTestimonial = async (id: string) => {
    const ans = confirm("Are you sure you want to delete this testimonial?");
    if (!ans) return;
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      alert("Testimonial deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete testimonial");
    }
  };

  const addStory = (s: Omit<Story, "id">) => {
    setStories((prev) => [{ ...s, id: Date.now().toString() }, ...prev]);
  };

  const deleteStory = async (id: string) => {
    const ans = confirm("Are you sure you want to delete this story?");
    if (!ans) return;
    try {
      const res = await fetch(`http://localhost:5000/api/stories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setStories((prev) => prev.filter((s) => s._id !== id));
      alert("Story deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete story");
    }
  };

  const addSpeaker = (s: Omit<Speaker, "id">) => {
    setSpeakers((prev) => [{ ...s, id: Date.now().toString() }, ...prev]);
  };

  const deleteSpeaker = async (id: string) => {
    const ans = confirm("Are you sure you want to delete this speaker?");
    if (!ans) return;
    try {
      const res = await fetch(`http://localhost:5000/api/speakers/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setSpeakers((prev) => prev.filter((s) => s._id !== id));
      alert("Speaker deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete speaker");
    }
  };

  const addTeamMember = (m: Omit<TeamMember, "id">) => {
    setTeamMembers((prev) => [{ ...m, id: Date.now().toString() }, ...prev]);
  };

  const deleteTeamMember = async (id: string) => {
    const ans = confirm("Are you sure you want to delete this team member?");
    if (!ans) return;
    try {
      const res = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      alert("Team member deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete team member");
    }
  };

  const addHighlight = (h: Omit<Highlight, "id">) => {
    setHighlights((prev) => [{ ...h, id: Date.now().toString() }, ...prev]);
  };

 const deleteHighlight = async (id: string) => {
  const ans = confirm("Are you sure you want to delete this highlight?");
    if (!ans) return;
    try {
      const res = await fetch(`http://localhost:5000/api/highlights/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setHighlights((prev) => prev.filter((h) => h._id !== id));
      alert("Highlight deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete highlight");
    }
  };

  const addSponsor = (s: Omit<Sponsor, "id">) => {
    setSponsors((prev) => [{ ...s, id: Date.now().toString() }, ...prev]);
  };

  const deleteSponsor = async (id: string) => {
    const ans = confirm("Are you sure you want to delete this sponsor?");
    if (!ans) return;
    try {
      const res = await fetch(`http://localhost:5000/api/sponsors/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setSponsors((prev) => prev.filter((s) => s._id !== id));
      alert("Sponsor deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete sponsor");
    }
  };

  const updateExperienceItem = (id: string, item: Partial<ExperienceItem>) => {
    setExperienceItems((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, ...item } : ex))
    );
  };

  const updateSummitConfig = (c: Partial<SummitConfig>) => {
    setSummitConfig((prev) => ({ ...prev, ...c }));
  };

  const updateRegistrationConfig = (c: Partial<RegistrationConfig>) => {
    setRegistrationConfig((prev) => ({ ...prev, ...c }));
  };

  return (
    <DataContext.Provider
      value={{
        messages,
        addMessage,
        registrations,
        addRegistration,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        stories,
        addStory,
        deleteStory,
        speakers,
        addSpeaker,
        deleteSpeaker,
        teamMembers,
        addTeamMember,
        deleteTeamMember,
        highlights,
        addHighlight,
        deleteHighlight,
        sponsors,
        addSponsor,
        deleteSponsor,
        experienceItems,
        updateExperienceItem,
        summitConfig,
        updateSummitConfig,
        registrationConfig,
        updateRegistrationConfig,
        fetchSponsors,
        fetchSpeakers,
        fetchStories,
        fetchTeamMembers,
        fetchTestimonials,
        fetchHighlights,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
