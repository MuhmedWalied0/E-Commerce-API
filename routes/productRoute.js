import express from "express";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validatorsRoles/productValidator.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} from "../controllers/productController.js";
const router = express.Router();
router
  .route("/")
  .get(getProducts)
  .post(createProductValidator, createProduct)
  .delete(deleteProducts);

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export const productRoute = router;
