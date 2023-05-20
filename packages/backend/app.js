const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 4000;
const dbUrl = process.env.MONGODB_URL;

const app = express();
app.use(cors());
app.use(express.json());

const crawlersRoutes = require("./routes/crawlers");

app.use("/crawlers", crawlersRoutes);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}/`);
    });
  })
  .catch((err) => console.log(err));
