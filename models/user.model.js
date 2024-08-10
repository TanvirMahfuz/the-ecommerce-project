const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      unique: true,
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      unique: true,
    },
  ],
  refreshToken: {
    type: String,
  },
};

const userSchema = new mongoose.Schema(obj, { timestaps: true });
// we need to add some mothods to this schema. whenever a user is grabbed from the database, they will inherit these methods also
//1. we need to encryp the password before we save it to the database
userSchema.pre("save", async function (next) {
  //q: where is this next coming from
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log(this.password, password);
  return await bcrypt.compare(password, this.password); //retuns a booleanss
};

// we should generate the access and refresh tokens aswell. because they are connected to the user its better to decalre them here
userSchema.methods.generateAccessToken = function () {
  // access tokens are not saved in the database, they are regrenerated and given to users. they are also short lived
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: "1d" },
  );
};

userSchema.methods.generateRefreshToken = function () {
  this.refreshToken = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.SECRET_REFRESH_KEY,
    { expiresIn: "30d" },
  );
  return this.refreshToken;
};
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
