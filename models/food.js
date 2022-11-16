const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    //vendorId: { type: String },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "vendor" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    readyTime: { type: Number },
    price: { type: Number, required: true },
    rating: { type: Number },
    images: { type: [String] },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Food = mongoose.model("food", foodSchema, "foods");

module.exports = Food;
