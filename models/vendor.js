const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    foodtype: { type: [String] },
    rating: { type: Number },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    foods:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
    }]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Vendor = mongoose.model("vendor", vendorSchema, "vendors");

module.exports = Vendor;
