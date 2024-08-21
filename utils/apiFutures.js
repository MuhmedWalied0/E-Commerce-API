class ApiFutures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.count = 0;
  }

  async filter() {
    let queryStringOpj = { ...this.queryString };

    const excludesFields = ["limit", "sort", "page", "fields", "keyword"];

    excludesFields.forEach((field) => delete queryStringOpj[field]);

    let queryString = JSON.stringify(queryStringOpj);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    queryStringOpj = JSON.parse(queryString);
    this.count = await this.mongooseQuery.model.countDocuments(queryStringOpj);
    this.mongooseQuery = this.mongooseQuery.find(queryStringOpj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }
  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  async search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if(modelName ==="Product"){
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      }
      else{
        query.$or = [
          { name: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
      this.count = await this.mongooseQuery.model.countDocuments(query);
    }
    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 2;
    const skip = (page - 1) * limit;
    const count = this.count;
    const endIndex = page * limit;
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(count / limit);
    if (endIndex < count) {
      pagination.next = page + 1;
    } else {
      pagination.next = 0;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    } else {
      pagination.prev = 0;
    }
    this.pagination = pagination;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
}

export default ApiFutures;
