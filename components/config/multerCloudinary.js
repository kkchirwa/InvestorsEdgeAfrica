import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config(); // make sure env is loaded

// configure cloudinary with your CLOUDINARY_URL
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

// create storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "summit_uploads", // optional folder name in your Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"]
  },
});

const upload = multer({ storage });

export default upload;
