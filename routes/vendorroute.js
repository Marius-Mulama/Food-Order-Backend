const express = require("express");
const router = express.Router();
const checkAuth = require("../utility/check-auth");
const multer = require("multer");

const VendorController = require("../controllers/vendorcontroller");

//Images using multer
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", VendorController.login);
router.get("/profile", checkAuth, VendorController.getVendorProfile);
router.patch("/profile", checkAuth, VendorController.updateVendorProfile);
router.patch("/services", checkAuth, VendorController.updateVendorService);
router.patch(
  "/coverimage",
  checkAuth,
  images,
  VendorController.updateVendorCoverImage
);
router.post("/food", checkAuth, images, VendorController.addFood);
router.get("/foods", checkAuth, VendorController.getFoods);

router.get("/", VendorController.defaultRoute);

module.exports = router;
