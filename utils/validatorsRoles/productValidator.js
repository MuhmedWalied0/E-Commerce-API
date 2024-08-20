import { param, body, check, validationResult } from "express-validator";
import validator from "../../middlewares/validatorMidlleware.js";
import Category from "../../models/categoryModel.js";
import SubCategory from "../../models/subCategoryModel.js";
import Brand from "../../models/brandModel.js";
import mongoose from "mongoose";
const { Promise } = mongoose;

const getProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product id must be provied")
    .isMongoId()
    .withMessage("invalid Product id format"),
  validator,
];

const createProductValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ minLength: 3 })
    .withMessage("too short product title")
    .isLength({ maxLength: 100 })
    .withMessage("too long product title"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ minLength: 10 })
    .withMessage("too short product description")
    .isLength({ maxLength: 2000 })
    .withMessage("too long product description"),
  body("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("quantity must be a number"),
  body("sold").optional(true).isNumeric("sold must be a number"),
  body("price")
    .isNumeric()
    .withMessage("price must be a number")
    .notEmpty()
    .withMessage("Product price is required")
    .isLength({ max: 999999 })
    .withMessage("too long product price"),
  body("priceAfterDiscount")
    .optional(true)
    .isNumeric("price after discount must be a number")
    .custom((val, { req }) => {
      if (val >= req.body.price) {
        throw new Error("price after discount must be less than price");
      }
      return true;
    }),
  body("avalibleColors")
    .optional(true)
    .isArray()
    .withMessage("colors must be an array"),
  body("imageCover").notEmpty().withMessage("image cover must be required"),
  body("images")
    .optional(true)
    .isArray()
    .withMessage("images must be an array"),
  body("brand")
    .optional(true)
    .isMongoId()
    .withMessage("invalid brand id")
    .custom(async (val) => {
      const brand = await Brand.findOne(val);
      if (!brand) {
        throw new Error("invalid brand id");
      }
      return true;
    }),
  body("category")
    .notEmpty()
    .withMessage("category id must be provied")
    .isMongoId()
    .withMessage("invalid category id")
    .custom(async (val) => {
      const category = await Category.findById(val);
      if (!category) {
        throw new Error("invalid category id");
      }
      return true;
    }),
  body("subCategory")
    .optional(true)
    .isArray()
    .withMessage("subCategory must be an array")
    .custom(async (val, { req }) => {
      const subCategory = await SubCategory.find({
        category: req.body.category,
      }).select('_id');
      const validSubCategoryIds = subCategory.map(subCat => subCat._id.toString());
      console.log(validSubCategoryIds);
      for (const id of val) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`invalid subCategory id: ${id}`);
        }
        if (!validSubCategoryIds.includes(id)) {
          throw new Error(`subCategory id not found in the specified category: ${id}`);
        }
      }
      return true;
    }),
  body("ratingReviews")
    .optional(true)
    .isLength({ min: 1 })
    .withMessage("rating review must be greater than or equl 1")
    .isLength({ max: 5 })
    .withMessage("rating review must be lower than or equl 5"),
  body("ratingQuantity")
    .optional(true)
    .isNumeric()
    .withMessage("rating quantity must be number"),
  validator,
];

const updateProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product id must be provied")
    .isMongoId()
    .withMessage("invalid Product id format"),
  validator,
];

const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product id must be provied")
    .isMongoId()
    .withMessage("invalid Product id format"),
  validator,
];

export {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
