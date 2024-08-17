import express from "express";
import {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validatorsRoles/subCategoryValidator.js";
import {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteSubCategories,
} from "../controllers/subCategoryController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getSubCategories)
  .post(createSubCategoryValidator, createSubCategory)
  .delete(deleteSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export const subCategoryRoute = router;
