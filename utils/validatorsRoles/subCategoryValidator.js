import { param, body, check, validationResult } from "express-validator";
import validator from "../../middlewares/validatorMidlleware.js";

const getSubCategoryValidator = [
  param("id").isMongoId().withMessage("invalid subCategory id format"),
  validator,
];

const createSubCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 3 })
    .withMessage("subCategory name must be at least 3 characters")
    .isLength({ max: 24 })
    .withMessage("subCategory name should not be more than 24 characters"),
  check("categoryID").isMongoId().withMessage("invalid subCategory id format"),
  validator,
];

const updateSubCategoryValidator = [
  param("id").isMongoId().withMessage("invalid subCategory id format"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 3 })
    .withMessage("subCategory name must be at least 3 characters")
    .isLength({ max: 24 })
    .withMessage("subCategory name should not be more than 24 characters"),
  check("categoryID").isMongoId().withMessage("invalid subCategory id format"),
  validator,
];

const deleteSubCategoryValidator = [
  param("id").isMongoId().withMessage("invalid subCategory id format"),
  validator,
];

export {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
};
