import Category from "../models/categoryModel.js";
import asyncHandeler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiErrors.js";

/* 
    @desc get all categories
    @route GET /api/categories/
    @access Public
*/
const getCategories = asyncHandeler(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 2;
  const skip = (page - 1) * limit;

  const categories = await Category.find().limit(limit).skip(skip);
  if (categories.length < 1)
    return next(new ApiError("Categories not found", 404));

  res
    .status(200)
    .json({ result: categories.length, page, limit, data: categories });
});

/* 
    @desc get single category
    @route GET /api/categories/:id
    @access Public
*/
const getCategory = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return next(new ApiError("Category not found", 404));
  res.json({ data: category });
});

/*
    @desc create a new category
    @route POST /api/categories/
    @access Private
*/
const createCategory = asyncHandeler(async (req, res, next) => {
  const { name } = req.body;

  const findCategory = await Category.findOne({ name });
  if (findCategory) {
    return next(new ApiError("Category with this name already exists", 400));
  }

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
