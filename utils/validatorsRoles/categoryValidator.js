import { param, body, check, validationResult } from "express-validator";
import validator from "../../middlewares/validatorMidlleware.js";

const getCategoryValidator = [
  param("id").isMongoId().withMessage("invalid category id format"),
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
    .withMessage("category name should not be more than 24 characters"),
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
