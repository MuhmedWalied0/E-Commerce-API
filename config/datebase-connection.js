import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB"))
