const checkCategoryId = (req, res, next) => {
  if (req.params.categoryId) {
    req.params.category = req.params.categoryId;
  } else {
    req.params.category = {};
  }
  next();
};

export default checkCategoryId;
