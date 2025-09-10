import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    category: {
      type: String,
      enum: [
        "Audio",
        "Wearables",
        "Accessories",
        "Furniture",
        "Smart Home",
        "Gaming",
        "Lifestyle",
        "Electronics",
        "Health",
        "Sports",
      ],
      required: true,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
