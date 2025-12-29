// server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import dotenv from "dotenv";
import { University } from "lucide-react";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("logo"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});

router.post("/upload", upload.single("sponsorImg"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});

router.post("/upload", upload.single("speakerImg"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});

router.post("/upload", upload.single("teamImg"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});

router.post("/upload", upload.single("testimonialImg"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});

router.post("/upload", upload.single("storyImg"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});

router.post("/upload", upload.single("highlightImg"), (req, res) => {
  res.json({
    url: `uploads/${req.file.filename}`,
  });
});


export default router;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------
// CONNECT TO MONGODB
// ---------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ---------------------------
// TICKET MODEL
// ---------------------------
const ticketSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  institution: String,
  course: String,
  ticketId: String,
  qrCode: String, // store QR code
  used: { type: Boolean, default: false },
});

// ---------------------------
// REGISTRATION CONFIG SCHEMA
// ---------------------------
const registrationConfigSchema = new mongoose.Schema({
  title: String,
  description: String,
  successMessage: String,
  heroImage: String,
});

// ---------------------------
// SPONSOR SCHEMA
// ---------------------------
const sponsorSchema = new mongoose.Schema({
  id: String,
  name: String,
  logoUrl: String,
});

const highlightSchema = new mongoose.Schema({
  id: String,
  name: String,
  imageUrl: String,
});

const speakerSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  imageUrl: String,
});

const teamMemberSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  bio: String,
  imageUrl: String,
});

const testimonialSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  quote: String,
  imageUrl: String,
});

const storySchema = new mongoose.Schema({
  id: String,
  title: String,
  categories: [String],
  excerpt: String,
  date: String,
  logoUrl: String,
});

// ---------------------------
// MESSAGE SCHEMA
// ---------------------------

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

// ---------------------------
// SUMMIT INFORMATION SCHEMA
// ---------------------------
const summitInfoSchema = new mongoose.Schema({
  headline: String,
  subHeadline: String,
  description: String,
  dateText: String,
  targetDate: String, // ISO string for countdown
  location: String,
  heroImage: String,
  stats: [
    {
      value: String,
      label: String,
    },
    {
      value: String,
      label: String,
    },
  ],
});

// ---------------------------
// MODELS
// ---------------------------
const Highlight = mongoose.model("Highlight", highlightSchema);
const Story = mongoose.model("Story", storySchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
const Speaker = mongoose.model("Speaker", speakerSchema);
const Sponsor = mongoose.model("Sponsor", sponsorSchema);
const SummitInfo = mongoose.model("SummitInfo", summitInfoSchema);
const RegistrationConfig = mongoose.model(
  "RegistrationConfig",
  registrationConfigSchema
);
const Ticket = mongoose.model("Ticket", ticketSchema);
const Message = mongoose.model("Message", messageSchema);

// ---------------------------
// MESSAGING ENDPOINT
// ---------------------------
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ---------------------------
// VIEW MESSAGING
// ---------------------------
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ---------------------------
// NODEMAILER EMAIL SETUP
// ---------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------------------
// CREATE TICKET ENDPOINT
// ---------------------------
app.post("/api/tickets", async (req, res) => {
  try {
    const { fullName, email, institution, course } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "Full name and email required" });
    }

    const ticketId = uuidv4();

    // Generate QR code as base64
    const qrCode = await QRCode.toDataURL(ticketId);

    // Save ticket to DB
    const newTicket = new Ticket({
      fullName,
      email,
      institution,
      course,
      ticketId,
      qrCode,
    });

    await newTicket.save();

    // Ticket link
    const ticketLink = `https://investorsedgeafrica.onrender.com/ticket/${ticketId}`;

    // Send email
    await transporter.sendMail({
      from: `"Event Tickets" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your Event Ticket",
      html: `
        <h2>Hello ${fullName},</h2>
        <p>Your ticket is ready!</p>
        <p>Click the link below to view your QR code:</p>
        <a href="${ticketLink}">${ticketLink}</a>
        <br /><br />
        <p>Or scan this QR code:</p>
        <img src="${qrCode}" width="250" />
      `,
    });

    res.json({ success: true, ticketId, ticketLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

// ---------------------------
// VIEW TICKET & QR CODE (Styled)
// ---------------------------
app.get("/ticket/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).send("Ticket not found");

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Ticket</title>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      font-family: "Poppins", sans-serif;
      background: #e7e9fc;
    }

    .ticket {
      width: 650px;
      margin: 40px auto;
      background: linear-gradient(135deg, #3b60ff, #8e3bff);
      color: white;
      padding: 35px;
      border-radius: 25px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .header {
      text-align: center;
      margin-bottom: 25px;
    }

    .event-title {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .event-sub {
      font-size: 16px;
      font-weight: 300;
      margin-top: -5px;
    }

    .details {
      margin-top: 30px;
      font-size: 18px;
      line-height: 1.7;
    }

    .label {
      opacity: 0.8;
      font-size: 14px;
      text-transform: uppercase;
    }

    .value {
      font-size: 20px;
      font-weight: 600;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      margin-top: 15px;
    }

    .qr-container {
      margin-top: 30px;
      text-align: center;
    }

    .qr-container img {
      width: 150px;
      background: white;
      padding: 10px;
      border-radius: 12px;
    }

    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      opacity: 0.85;
    }
  </style>
</head>
<body>

<div class="ticket">

  <div class="header">
    <div class="event-title">Next Gem Founders Summit 2025</div>
    <div class="event-sub">Powered by Investors Edge Africa</div>
  </div>

  <div class="details">

    <div class="grid">
      <div>
        <div class="label">Ticket Holder</div>
        <div class="value">${ticket.fullName}</div>
      </div>

      <div>
        <div class="label">Ticket Number</div>
        <div class="value">${ticket.ticketId}</div>
      </div>
    </div>

    <div class="grid">
      <div>
        <div class="label">Event Date</div>
        <div class="value">June 24 – 25, 2025</div>
      </div>

      <div>
        <div class="label">Venue</div>
        <div class="value">Amaryllis Hotel, Blantyre</div>
      </div>
    </div>

  </div>

  <div class="qr-container">
    <img src="${ticket.qrCode}" alt="QR Code">
  </div>

  <div class="footer">
    Please present this ticket at the entrance. QR code is required for check-in.
  </div>

</div>

</body>
</html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/api/tickets/:ticketId/use", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (ticket.used) return res.json({ message: "Ticket already used" });

    ticket.used = true;
    await ticket.save();
    res.json({ message: "Ticket marked as used", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ fullName: 1 });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

app.post("/api/registration-config", async (req, res) => {
  try {
    const config = await RegistrationConfig.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    res.json({ success: true, data: config });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save registration config" });
  }
});

app.get("/api/registration-config", async (req, res) => {
  try {
    const config = await RegistrationConfig.findOne({});
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch registration config" });
  }
});

// ---------------------------
// SUMMIT INFORMATION ENDPOINT
// ---------------------------
app.post("/api/summit-info", async (req, res) => {
  try {
    const summitInfo = await SummitInfo.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
    });
    console.log(req.body);
    res.json({ success: true, data: summitInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save summit info" });
  }
});

// ---------------------------
// GET SUMMIT INFORMATION ENDPOINT
// ---------------------------
app.get("/api/summit-info", async (req, res) => {
  try {
    const summitInfo = await SummitInfo.findOne({});
    res.json(summitInfo);
    console.log(summitInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch summit info" });
  }
});

// ---------------------------
// SPONSOR ENDPOINT
// ---------------------------
app.post("/api/sponsors", upload.single("logo"), async (req, res) => {
  try {
    const { name } = req.body;
    const logoUrl = `uploads/${req.file.filename}`;

    const newSponsor = new Sponsor({
      id: uuidv4(),
      name,
      logoUrl,
    });
    await newSponsor.save();
    res.json({ success: true, data: newSponsor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add sponsor" });
  }
});

app.get("/api/sponsors", async (req, res) => {
  try {
    const sponsors = await Sponsor.find();
    res.json(sponsors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sponsors" });
  }
});

app.delete("/api/sponsors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sponsor = await Sponsor.findById(id);
    if (!sponsor) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (sponsor.logoUrl) {
      const filePath = path.join(process.cwd(), sponsor.logoUrl);

      console.log("Deleting file at:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Sponsor.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});

app.post("/api/speakers", upload.single("speakerImg"), async (req, res) => {
  try {
    const { name, role } = req.body;
    const imageUrl = `uploads/${req.file.filename}`;
    const newSpeaker = new Speaker({
      id: uuidv4(),
      name,
      role,
      imageUrl,
    });
    await newSpeaker.save();
    res.json({ success: true, data: newSpeaker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add speaker" });
  }
});

app.get("/api/speakers", async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.json(speakers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch speakers" });
  }
});

app.delete("/api/speakers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const speaker = await Speaker.findById(id);
    if (!speaker) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (speaker.imageUrl) {
      const filePath = path.join(process.cwd(), speaker.imageUrl);

      console.log("Deleting file at:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Speaker.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});

app.post("/api/team-members", upload.single("teamImg"), async (req, res) => {
  try {
    const { name, role, bio } = req.body;
    const imageUrl = `uploads/${req.file.filename}`;
    const newTeamMember = new TeamMember({
      id: uuidv4(),
      name,
      role,
      bio,
      imageUrl,
    });
    await newTeamMember.save();
    res.json({ success: true, data: newTeamMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add team member" });
  }
});

app.get("/api/team", async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

app.delete("/api/team/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (teamMember.imageUrl) {
      const filePath = path.join(process.cwd(), teamMember.imageUrl);

      console.log("Deleting file at:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await TeamMember.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});

app.post("/api/testimonials", upload.single("testimonialImg"), async (req, res) => {
  try {
    const { name, role, quote } = req.body;
    const imageUrl = `uploads/${req.file.filename}`;

    const newTestimonial = new Testimonial({
      id: uuidv4(),
      name,
      role,
      quote,
      imageUrl,
    });
    await newTestimonial.save();
    res.json({ success: true, data: newTestimonial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add testimonial" });
  }
});

app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

app.delete("/api/testimonials/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (testimonial.imageUrl) {
      const filePath = path.join(process.cwd(), testimonial.imageUrl);

      console.log("Deleting file at:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Testimonial.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});

app.post("/api/stories", upload.single("storyImg"), async (req, res) => {
  try {
    const { title, categories, excerpt, date } = req.body;
    const logoUrl = `uploads/${req.file.filename}`;

    const newStory = new Story({
      id: uuidv4(),
      title,
      categories,
      excerpt,
      date,
      logoUrl,
    });
    await newStory.save();
    res.json({ success: true, data: newStory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add story" });
  }
});

app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

app.delete("/api/stories/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (story.logoUrl) {
      const filePath = path.join(process.cwd(), story.logoUrl);

      console.log("Deleting file at:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Story.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});

app.post("/api/highlights", upload.single("highlightImg"), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = `uploads/${req.file.filename}`;

    const newHighlight = new Highlight({
      id: uuidv4(),
      name,
      imageUrl,
    });
    await newHighlight.save();
    res.json({ success: true, data: newHighlight });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add highlight" });
  }
});

app.get("/api/highlights", async (req, res) => {
  try {
    const highlights = await Highlight.find();
    res.json(highlights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch highlights" });
  }
});

app.delete("/api/highlights/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const highlight = await Highlight.findById(id);
    if (!highlight) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    if (highlight.imageUrl) {
      const filePath = path.join(process.cwd(), highlight.imageUrl);

      console.log("Deleting file at:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await Highlight.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});



// ---------------------------
// START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
