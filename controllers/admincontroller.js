const { findById } = require("../models/vendor");
const Vendor = require("../models/vendor");
const generateHash = require("../utility/passwordutility");

const defaultRoute = (req, res) => {
  res.status(200).json({
    message: "Admin Route and Controller OK",
  });
};

const createVendor = async (req, res) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = req.body;

  const existingVendor = await Vendor.findOne({ email: email });

  if (existingVendor != null) {
    return res.status(409).json({
      error: "Vendor with the same email already exists",
    });
  }

  //Generate passord and encrypt it
  const userPassword = await generateHash.generatePassHash(password);
  if (userPassword === null) {
    res.status(500).json({
      error: "Error Occured",
    });
  }

  try {
    const createdVendor = await Vendor.create({
      name: name,
      ownerName: ownerName,
      foodtype: foodType,
      pincode: pincode,
      address: address,
      phone: phone,
      email: email,
      password: userPassword,
      serviceAvailable: false,
      coverImages: [],
      rating: 3,
      foods:[]
    });

    return res.status(200).json(createdVendor);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    if (vendors !== null) {
      return res.status(200).json(vendors);
    }

    return res.status(404).json({
      message: "Vendors Data not Available",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Finding all Vendors",
    });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;

  try {
    const vendor = await Vendor.findById(vendorId);

    if (vendor !== null) {
      return res.status(200).json(vendor);
    } else {
      return res.status(404).json({
        message: "Error getting the Vendor, No Such Vendor exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error getting the Vendor",
      error: error,
    });
  }
};

module.exports = {
  defaultRoute,
  createVendor,
  getVendors,
  getVendorById,
};
