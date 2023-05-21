import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import crawlersRoutes from "./routes/crawlers";

dotenv.config();

const port = 4000;
const dbUrl = process.env.MONGODB_URL as string;

const app = express();
app.use(cors());
app.use(express.json());


app.use("/crawlers", crawlersRoutes);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}/`);
    });
  })
  .catch((err: any) => console.log(err));
