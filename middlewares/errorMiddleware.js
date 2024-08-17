const globalErrorHandller = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    errorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    errorForProd(err, res);
  }
};
const errorForDev = (err, res) => {
  const status = err.status || "error";
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    status,

    error: err,

    message,

    stack: err.stack,
  });
};

const errorForProd = (err, res) => {
  const status = err.status || "error";
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    status,
    message,
  });
};
export default globalErrorHandller;
