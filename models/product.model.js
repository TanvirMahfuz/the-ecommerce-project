const mongoose = require("mongoose");

const obj = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: True,
  },
  productImg: {
    type: String,
  },
  owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
};

const Products = mongoose.model(
  "Products",
  new mongoose.Schema(obj, { timestaps: true }),
);
module.exports = Products;
