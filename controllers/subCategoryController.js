import slugify from "slugify";
import SubCategory from "../models/subCategoryModel.js";
import asyncHandeler from "express-async-handler";
import ApiError from "../utils/apiErrors.js";
import Category from "../models/categoryModel.js";
/*
  @desc get SubCategory
  @route GET /api/subcategories
  @access Public
*/
const getSubCategories = asyncHandeler(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;

  const findByCategoryID =
    req.params.categoryId === undefined
      ? {}
      : { category: req.params.categoryId };

  const subCategories = await SubCategory.find(findByCategoryID)
    .limit(limit)
    .skip(skip);
  if (subCategories.length < 1)
    return next(new ApiError("Not subCategories found", 404));
  res.json({ result: subCategories.lenght, page, limit, data: subCategories });
});

/*
  @desc get SubCategory by id
  @route GET /api/subcategories/:id
  @access Public
 
*/

const getSubCategory = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) return next(new ApiError("SubCategory not found", 404));
  res.json({ data: subCategory });
});

/*
  @desc Create SubCategory
  @route POST /api/subcategories
  @access Privte
*/

const createSubCategory = asyncHandeler(async (req, res, next) => {
  const categoryID =
    req.params.categoryID === undefined
      ? req.body.categoryID
      : req.params.categoryID;

    console.log(categoryID)

  const { name } = req.body;

  const category = await Category.findById(categoryID);
  if (!category) return next(new ApiError("Category id not found", 404));

  const findSubCategory = await SubCategory.findOne({ name });
  if (findSubCategory) {
    return next(new ApiError("SubCategory with this name already exists", 400));
  }

  const subCategory = await SubCategory.create({
    name,
    sulg: slugify(name),
    category: categoryID,
  });
  return res.status(201).json({ data: subCategory });
});

/*
  @desc Update subCategory
  @route PUT /api/subcategories/:id
  @access Private
 
*/

const updateSubCategory = asyncHandeler(async (req, res, next) => {
  const { name, categoryID } = req.body;
  const { id } = req.params;

  const category = await Category.findById(categoryID);
  if (!category) return next(new ApiError("Category not found", 404));

  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category: categoryID },
    { new: true }
  );
  if (!subCategory) return next(new ApiError("SubCategory not found", 404));
  res.json({ data: subCategory });
});

/*
  @desc Delete subCategory
  @route DELETE /api/subcategories/:id
  @access Private
  @param id - id of the subcategory to delete
 @return 204 No Content response if successful, 404 if subcategory not found
*/
const deleteSubCategory = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) return next(new ApiError("SubCategory not found", 404));
  res.status(204).end();
});

/*
  @desc delete all subCategories
  @route DELETE /api/subcategories
  @access Private
 @return 204 No Content response if successful, 404 if no subcategories found
*/
const deleteSubCategories = asyncHandeler(async (req, res, next) => {
  const subcategories = await SubCategory.deleteMany({});
  if (subcategories.deletedCount === 0)
    return next(new ApiError("No subcategories found", 404));
  return res.status(200).json({
    result: `successfully deleted ${subcategories.deletedCount} SubCategoreis`,
  });
});

export {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteSubCategories,
};
