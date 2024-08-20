import express from "express";
import { subCategoryRoute }  from "./subCategoryRoute.js"
import {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validatorsRoles/categoryValidator.js";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
} from "../controllers/categoryController.js";
const router = express.Router();
router.use("/:categoryId/subcategories",subCategoryRoute)
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory)
  .delete(deleteCategories);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export const categoryRoute = router;
