class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4)
      ? (this.status = "fail")
      : (this.status = "error");
  }
}
export default ApiError;
