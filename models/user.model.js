const mongoose = require("mongoose");

const obj = {
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  refreshToken: {
    type: String,
  },
};

const Users = mongoose.model(
  "Users",
  new mongoose.Schema(obj, { timestaps: true }),
);
module.exports = Users;
