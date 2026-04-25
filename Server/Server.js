import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./Router/route.js";
import loginRouter from "./Router/loginroutes.js";
import productRoute from "./Router/addProRout.js";
import productRouter from "./Router/productFetch.js";
import chatRouter from "./Router/chat.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));

//  Use Environment Variables for MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/medicine_shop";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

//  Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/", router);
app.use("/", loginRouter);
app.use("/api/products", productRoute);
app.use("/api/products", productRouter);
app.use("/api/chat", chatRouter);

//  Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
