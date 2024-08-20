import { param, body, check, validationResult } from "express-validator";
import validator from "../../middlewares/validatorMidlleware.js";
import Category from "../../models/categoryModel.js";

const getCategoryValidator = [
  param("id")
    .isMongoId()
    .withMessage("invalid category id format")
    .custom(async (val, { req }) => {
      const category = await Category.findById(val);
      if (!category) {
        throw new Error("category not found");
      }
      req.category = category;
      return true;
    }),
  validator,
];

const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3 })
    .withMessage("category name must be at least 3 characters")
    .isLength({ max: 24 })
    .withMessage("category name should not be more than 24 characters")
    .custom(async (val, { req }) => {
      const findCategory = await Category.findOne({ name: val });
      if (findCategory) {
        throw new Error("Category with this name already exists");
      }
    }),
  validator,
];

const updateCategoryValidator = [
  param("id").isMongoId().withMessage("invalid category id format"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3 })
    .withMessage("category name must be at least 3 characters")
    .isLength({ max: 24 })
    .withMessage("category name should not be more than 24 characters"),
  validator,
];

const deleteCategoryValidator = [
  param("id").isMongoId().withMessage("invalid category id format"),
  validator,
];

export {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
