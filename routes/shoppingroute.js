const express = require("express");
const router = express.Router();
const checkAuth = require("../utility/check-auth");

// Import Controller
const ShoppingController = require("../controllers/shoppingcontroller");





// Food availability
router.get("/:pincode", ShoppingController.getFoodAvailability);

// Top resturants
router.get("/top-resturants/:pincode", ShoppingController.getTopResturants)

// foods available in 30 minutes
router.get("/foods-in-30/:pincode", ShoppingController.getFoodIn30)

// search foods
router.get("/search/:pincode", ShoppingController.searchFoods)

//Find resturant by id
router.get("/resturant/:id", ShoppingController.resturantById);

router.get("/",(req,res,next)=>{
    res.json({message:"Shopping route working"})
})



module.exports = router;