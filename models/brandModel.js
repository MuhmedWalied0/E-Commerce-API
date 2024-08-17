import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      trim: true,
      required: [true,"Brand name must be provided"],
      unique: true,
      minlength: [3, "Too short Brand name"],
      maxlength: [24, "Too long Brand name"], 
    },
    slug: {
      type: String, 
      lowercase: true,
    },
  },

  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand; 
