import { param, body} from "express-validator";
import validator from "../../middlewares/validatorMidlleware.js";

const getBrandValidator = [
  param("id").isMongoId().withMessage("invalid brand id format"),
  validator,
];

const createBrandValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters")
    .isLength({ max: 24 })
    .withMessage("Brand name should not be more than 24 characters"),
  validator,
];

const updateBrandValidator = [
  param("id").isMongoId().withMessage("invalid brand id format"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Brand name must be at least 3 characters")
    .isLength({ max: 24 })
    .withMessage("Brand name should not be more than 24 characters"),
  validator,
];

const deleteBrandValidator = [
  param("id").isMongoId().withMessage("invalid brand id format"),
  validator,
];

export {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
};
