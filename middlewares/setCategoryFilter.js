const filterCategoryId = (req, res, next) => {
    if (req.params.categoryId) {
      req.params.filterCategoryId = req.params.categoryId;
    } else {
      req.params.filterCategoryId = req.body.categoryId;
    }
    next();
  };
  
  export default filterCategoryId;