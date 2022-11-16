//import Utilities
const passwordUtility = require("../utility/passwordutility");
//Import model
const Vendor = require("../models/vendor");
const Food = require("../models/food");

const defaultRoute = (req, res, next) => {
  res.status(200).json({
    message: "Vendor route OK",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existingVendor = await Vendor.findOne({ email: email });

  if (existingVendor !== null) {
    const validated = await passwordUtility.validatePassword(
      password,
      existingVendor.password
    );
    console.log(existingVendor.password);
    console.log(validated);
    if (validated) {
      const signature = await passwordUtility.generateSignature(
        existingVendor._id,
        existingVendor.email,
        existingVendor.name,
        "Vendor"
      );

      //   console.log("Signature here");

      //   console.log(signature);
      return res.status(200).json({
        atuh_token: signature,
        vendor: existingVendor,
      });
    } else {
      return res.status(403).json({
        message: "Invalid Login Credentials",
      });
    }
  } else {
    return res.status(403).json({
      message: "Invalid Login Credentials, User email doesnot exist",
    });
  }
};

const getVendorProfile = async (req, res, next) => {
  const uId = res.locals.user;

  if (uId) {
    try {
      const existingVendor = await Vendor.findOne({ _id: uId });
      return res.status(200).json(existingVendor);
    } catch (error) {
      return res.status(500).json({
        message: "error OCcured while fetching vendor",
        error: error,
      });
    }
  }

  return res.status(500).json({
    message: "Error Occured while fetching vendor",
  });
};

const updateVendorProfile = async (req, res, next) => {
  const uId = res.locals.user;

  const { foodType, name, address, phone } = req.body;

  if (uId) {
    try {
      const existingVendor = await Vendor.findOne({ _id: uId });

      if (existingVendor != null) {
        existingVendor.name = name;
        existingVendor.address = address;
        existingVendor.phone = phone;
        existingVendor.foodType = foodType;

        const savedResult = await existingVendor.save();

        return res.status(200).json(savedResult);
      } else {
        return res.status(500).json({
          message: "Error occured while updating vendor profile",
          error: error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating vendor profile",
        error: error,
      });
    }
  } else {
    res.status(403).json({
      message: "Invalid User",
    });
  }
};

const updateVendorCoverImage = async (req, res, next) => {
  const uId = res.locals.user;

  if (uId) {
    try {
      const vendor = await Vendor.findOne({ _id: uId });

      if (vendor != null) {
        const files = req.files;

        const images = files.map((file) => file.filename);

        vendor.coverImages.push(...images);

        const result = await vendor.save();

        return res.json(result);
      } else {
        return res.status(500).json({
          message: "Error occured while Updating Cover Image",
          error: error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating cover image",
        error: error,
      });
    }
  } else {
    res.status(403).json({
      message: "Invalid User",
    });
  }
};

const updateVendorService = async (req, res, next) => {
  const uId = res.locals.user;

  const { serviceAvailable } = req.body;

  if (uId) {
    try {
      const existingVendor = await Vendor.findOne({ _id: uId });

      if (existingVendor != null) {
        existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

        const savedResult = await existingVendor.save();

        return res.status(200).json(savedResult);
      } else {
        return res.status(500).json({
          message: "Error occured while setting service availability",
          error: error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while setting service availability",
        error: error,
      });
    }
  } else {
    res.status(403).json({
      message: "Invalid User",
    });
  }
};

const addFood = async (req, res, next) => {
  const uId = res.locals.user;

  const { name, description, category, foodType, readyTime, price } = req.body;

  if (uId) {
    try {
      const vendor = await Vendor.findOne({ _id: uId });

      if (vendor != null) {
        const files = req.files;

        const images = files.map((file) => file.filename);

        const createdFood = await Food.create({
          vendorId: vendor._id,
          name: name,
          description: description,
          category: category,
          foodType: foodType,
          readyTime: readyTime,
          price: price,
          images: images,
          rating: 0,
        });

        vendor.foods.push(createdFood);

        const result = await vendor.save();

        return res.json(result);
      } else {
        return res.status(500).json({
          message: "Error occured while adding food",
          error: error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while adding food",
        error: error,
      });
    }
  } else {
    res.status(403).json({
      message: "Invalid User",
    });
  }
};

const getFoods = async (req, res, next) => {
  const uId = res.locals.user;

  if (uId) {
    const foods = await Food.find({ vendorId: uId });

    if (foods !== null) {
      return res.status(200).json(foods);
    }
  }

  return res.status(404).json({
    message: "Food info not found",
  });
};

module.exports = {
  defaultRoute,
  login,
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  updateVendorCoverImage,
  addFood,
  getFoods,
};
