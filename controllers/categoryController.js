import Category from "../models/categoryModel.js";
import asyncHandeler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiErrors.js";
import ApiFutures from "../utils/apiFutures.js";

/* 
    @desc get all categories
    @route GET /api/categories/
    @access Public
*/
const getCategories = asyncHandeler(async (req, res, next) => {
  //build query
  const apiFutures = new ApiFutures(Category.find(), req.query).sort().fields();
  await apiFutures.filter();
  await apiFutures.search();
  apiFutures.paginate();
  const { mongooseQuery, pagination } = apiFutures;

  const categories = await mongooseQuery;
  if (categories.length < 1) return next(new ApiError("Brands not found", 404));

  res.status(200).json({
    result: categories.length,
    info: pagination,
    data: categories,
  });
});

/* 
    @desc get single category
    @route GET /api/categories/:id
    @access Public
*/
const getCategory = asyncHandeler(async (req, res, next) => {
  res.json({ data: req.category });
});

/*
    @desc create a new category
    @route POST /api/categories/
    @access Private
*/
const createCategory = asyncHandeler(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json(category);
});

/*
    @desc update a category
    @route PUT /api/categories/:id
    @access Private
*/
const updateCategory = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) return next(new ApiError("Category not found", 404));

  res.json(category);
});

/*
    @desc delete a category
    @route DELETE /api/categories/:id
    @access Private
*/
const deleteCategory = asyncHandeler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return next(new ApiError("Category not found", 404));
  res.status(204);
  res.end();
});

/*
    @desc delete all categories
    @route DELETE /api/categories/
    @access Private
*/

const deleteCategories = asyncHandeler(async (req, res, next) => {
  const categories = await Category.deleteMany({});
  if (categories.deletedCount < 1)
    return next(new ApiError("Not Categories found", 404));
  return res.status(200).json({
    result: `successfully deleted ${categories.deletedCount} Categoreis`,
  });
});

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
};
