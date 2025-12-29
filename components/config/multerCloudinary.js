import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "summit_uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

export default multer({ storage });
