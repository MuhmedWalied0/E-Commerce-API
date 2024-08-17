import express from "express";

import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validatorsRoles/brandValidator.js";

import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  deleteBrands,
} from "../controllers/brandController.js";
const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(createBrandValidator, createBrand)
  .delete(deleteBrands);

router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export const BrandRoute = router;
