const express = require("express");
const router = require("./routes/index_router");
const connectDB = require("./configs/db_config");
require("dotenv").config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});


module.exports = app