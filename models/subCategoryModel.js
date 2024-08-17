  import mongoose from "mongoose";

  const subCategorySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, "SubCategory name must be provided"],
        unique: true,
        minlength: [3, "Too short category name"],
        maxlength: [24, "Too long category name"],
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true,"Category id must be provided"],
      },
      slug: {
        type: String,
        lowercase: true,
      },
    },
    { timestamps: true }
  );

  const subCategory = mongoose.model("SubCategory", subCategorySchema);

  export default subCategory;
