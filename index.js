const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(router);

mongoose
  .connect(DB_URI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`server running at ${PORT}`);
      console.log("Helloe");
    });
  })
  .catch((err) => {
    console.log(" mongodb connection catch err", err);
  });
