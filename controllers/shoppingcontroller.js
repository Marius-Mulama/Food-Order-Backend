const Vendor = require("../models/vendor");
const Food = require("../models/food");

const getFoodAvailability = async (req, res, next) => {
  const pincode = req.params.pincode;

  const result = await Vendor.find({pincode: pincode, serviceAvailability: true})
  .sort([["rating", "descending"]])
  .populate({ path: "foods", model: Food });

  if (result.length > 0) {
    return res.status(200).json(result);
  }

  return res.status(400).json({
    message: "Data not found"
  });
};

const getTopResturants = async (req, res, next) => {
    const pincode = req.params.pincode;

    const result = await Vendor.find({pincode: pincode,serviceAvailability: true})
    .sort([["rating", "descending"]])
    .limit(10);
  
    if (result.length > 0) {
      return res.status(200).json(result);
    }
  
    return res.status(400).json({
      message: "Data not found",
    });

};

const getFoodIn30 = async (req, res, next) => {
    const pincode = req.params.pincode;

    const result = await Vendor.find({pincode: pincode,serviceAvailability: true})
    .populate("foods")
  
    if (result.length > 0) {
        let foodResult = [];

        result.map(Vendor=>{
            const foods = Vendor.foods

            foodResult.push(...foods.filter(food=> food.readyTime <= 30));
        })
      return res.status(200).json(foodResult);
    }
  
    return res.status(400).json({
      message: "Data not found",
    });

};

const searchFoods = async (req, res, next) => {
    const pincode = req.params.pincode;

    const result = await Vendor.find({pincode: pincode,serviceAvailability: true})
    .populate("foods")
  
    if (result.length > 0) {
        let foodResult = [];

        result.map(item=> foodResult.push(...item.foods))
      return res.status(200).json(foodResult);
    }
  
    return res.status(400).json({
      message: "Data not found",
    });
};

const resturantById = async (req, res, next) => {
    const id = req.params.id;

  const result = await Vendor.findById(id).populate("foods")

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(400).json({
    message: "Data not found"
  });
};

module.exports = {
  getFoodAvailability,
  getTopResturants,
  getFoodIn30,
  searchFoods,
  resturantById,
};
