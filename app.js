import express from "express";
import "dotenv/config";
import "./config/datebase-connection.js";
import morgan from "morgan";
import ApiError from "./utils/apiErrors.js";
import globalErrorHandller from "./middlewares/errorMiddleware.js";
/*---------------------------------------*/
import { categoryRoute } from "./routes/categoryRoute.js";
import { subCategoryRoute } from "./routes/subCategoryRoute.js";
import { BrandRoute } from "./routes/brandRoute.js";
/*---------------------------------------*/
const port = process.env.PORT || 3001;
const app = express();
/*---------------------------------------*/
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
/*---------------------------------------*/
app.use("/api/categories/", categoryRoute);
app.use("/api/subcategories/", subCategoryRoute);
app.use("/api/brands/", BrandRoute);
/*---------------------------------------*/

app.use("*", (req, res, next) => {
  next(new ApiError("page not found", 404));
});
app.use(globalErrorHandller);
process.on("uncaughtException", (err) => {
  console.error(
    `UncaughtException error....ErrorName: ${err.name} |ErrorMessage: ${err.message}`
  );
  server.close(() => {
    console.error("Server is closing due to uncaught exception");
    process.exit(1);
  });
});

const server = app.listen(port, () => console.log(`listening on port ${port}`));
