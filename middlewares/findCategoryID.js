import mongoose, { Mongoose } from "mongoose";


const checkCategoryId = (req, res, next) => {
  if (req.params.categoryId) {
    req.query.category = req.params.categoryId;
  }
  next();
};

export default checkCategoryId;
