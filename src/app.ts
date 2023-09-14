import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user";
import error404 from "./middleware/404";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

app.use(error404);
app.use(errorHandler);

const MONGODB_URI: string = process.env.MONGODB_URI!;
const PORT = process.env.PORT;

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI!)
  .then((result) => {
    app.listen(PORT);
    console.log("Server started at " + process.env.PORT!);
  })
  .catch((err) => console.log(err));
