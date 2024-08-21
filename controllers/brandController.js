import Brand from "../models/brandModel.js";
import asyncHandeler from "express-async-handler";
import ApiError from "../utils/apiErrors.js";
import ApiFutures from "../utils/apiFutures.js";
import slugify from "slugify";
/* 
    @desc get all brand
    @route GET /api/brands/
    @access Public
*/
const getBrands = asyncHandeler(async (req, res, next) => {
  //build query
  const apiFutures = new ApiFutures(Brand.find(), req.query).sort().fields();
  await apiFutures.filter();
  await apiFutures.search();
  apiFutures.paginate();
  const { mongooseQuery, pagination } = apiFutures;

  const brands = await mongooseQuery;
  if (brands.length < 1) return next(new ApiError("Brands not found", 404));

  res.status(200).json({
    result: brands.length,
    info: pagination,
    data: brands,
  });
});

/* 
    @desc get single brand
    @route GET /api/brands/:id
    @access Public
*/
const getBrand = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) return next(new ApiError("Brand not found", 404));
  res.json({ data: brand });
});

/*
    @desc create a new brand
    @route POST /api/brands/
    @access Private
*/
const createBrand = asyncHandeler(async (req, res, next) => {
  const { name } = req.body;

  const findBrand = await Brand.findOne({ name });
  if (findBrand) {
    return next(new ApiError("Brand with this name already exists", 400));
  }

  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json(brand);
});

/*
    @desc update a brand
    @route PUT /api/brands/:id
    @access Private
*/
const updateBrand = asyncHandeler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) return next(new ApiError("Brand not found", 404));

  res.json(brand);
});

/*
    @desc delete a brand
    @route DELETE /api/brands/:id
    @access Private
*/
const deleteBrand = asyncHandeler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) return next(new ApiError("Brand not found", 404));
  res.status(204);
  res.end();
});

/*
    @desc delete all Brands
    @route DELETE /api/Brands/
    @access Private
*/

const deleteBrands = asyncHandeler(async (req, res, next) => {
  const brands = await Brand.deleteMany({});
  if (brands.deletedCount < 1)
    return next(new ApiError("Not brands found", 404));
  return res.status(200).json({
    result: `successfully deleted ${brands.deletedCount} Brands`,
  });
});

export {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  deleteBrands,
};
