const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

//Connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/online_foods", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database Connected"))
  .catch("Database Connection Problem");

//import Routes
const AdminRoute = require("./routes/adminroute");
const VendorRoute = require("./routes/vendorroute");
const ShoppingRoute = require("./routes/shoppingroute");

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);
app.use("/shopping", ShoppingRoute);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Problemo From Backend",
  });
});

module.exports = app;
