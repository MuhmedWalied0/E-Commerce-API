import Product from "../models/productModel.js";
import asyncHandeler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiErrors.js";
import ApiFutures from "../utils/apiFutures.js";
/* 
    @desc get all Products
    @route GET /api/products/
    @access Public
*/
const getProducts = asyncHandeler(async (req, res, next) => {
  //build query
  const apiFutures = new ApiFutures(Product.find(), req.query).sort().fields();
  await apiFutures.filter();
  await apiFutures.search();
  apiFutures.paginate();
  const{mongooseQuery,pagination}=apiFutures

  const products = await mongooseQuery;
  if (products.length < 1) return next(new ApiError("Produts not found", 404));
  res.status(200).json({
    result: products.length,
    info: pagination,
    data: products,
  });
});

/* 
    @desc get single product
    @route GET /api/products/:id
    @access Public
*/
const getProduct = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return next(new ApiError("Product not found", 404));
  res.json({ data: product });
});

/*
    @desc create a new product
    @route POST /api/products/
    @access Private
*/
const createProduct = asyncHandeler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

/*
    @desc update a product
    @route PUT /api/products/:id
    @access Private
*/
const updateProduct = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) return next(new ApiError("Product not found", 404));

  res.json(product);
});

/*
    @desc delete a product
    @route DELETE /api/products/:id
    @access Private
*/
const deleteProduct = asyncHandeler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return next(new ApiError("Product not found", 404));
  res.status(204);
  res.end();
});

/*
    @desc delete all products
    @route DELETE /api/products/
    @access Private
*/

const deleteProducts = asyncHandeler(async (req, res, next) => {
  const products = await Product.deleteMany({});
  if (products.deletedCount < 1)
    return next(new ApiError("Not Products found", 404));
  return res.status(200).json({
    result: `successfully deleted ${products.deletedCount} Products`,
  });
});

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
};
