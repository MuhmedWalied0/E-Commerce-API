import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      trim: true,
      required: [true,"Category name must be provided"],
      unique: true,
      minlength: [3, "Too short category name"],
      maxlength: [24, "Too long category name"], 
    },
    slug: {
      type: String, 
      lowercase: true,
    },
  },

  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category; 
