import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true],
      minlength: [3, "too short product title"],
      maxlength: [100, "too long product title"],
    },
    slug: { type: String, trim: true, lowercase: true },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [10, "too short product description"],
      minlength: [2000, "too long product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      max: [999999, "too long product price"],
    },
    priceAfterDiscount: { type: Number },
    avalibleColors: [{ type: String }],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    images: [{ type: String }],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    ratingReviews: {
      type: Number,
      min: [1, "rating review must be greater than or equl 1"],
      max: [5, "rating review must be lower than or equl 5"],
    },
    ratingQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
