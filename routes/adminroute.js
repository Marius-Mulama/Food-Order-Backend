const express = require("express");
const router = express.Router();

//import Controller
const AdminController = require("../controllers/admincontroller");


router.post("/vendor",AdminController.createVendor);
router.get("/vendors", AdminController.getVendors);
router.get("/vendor/:id", AdminController.getVendorById)
router.get("/", AdminController.defaultRoute);



module.exports  =  router;