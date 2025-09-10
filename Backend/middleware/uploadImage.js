import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const parser = multer({ storage:storage });

export default parser;
