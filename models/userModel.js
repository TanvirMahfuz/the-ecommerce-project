const jwt = require("jsonwebtoken");
require("dotenv").config();

class User {
  constructor(name, email, password, refreshtoken) {
    this.__name = name;
    this.__email = email;
    this.__password = password;
    this.__username = email.split("@")[0];
    this.generateAccessToken();
    this.__refreshtoken =
      refreshtoken == undefined || refreshtoken == null
        ? jwt.sign(
            {name: name, password: password},
            process.env.SECRET_REFRESH_KEY
          )
        : refreshtoken;
    this.__cart = [];
    this.__myProducts = [];
    this.ok =
      this.saveToDB("users.json") == "ok" &&
      this.saveToDB("usersRefTokn.json") == "ok"
        ? "ok"
        : "error";
  }
}
User.prototype.generateAccessToken = function () {
  this.__accesstoken = jwt.sign(
    {username: this.__username},
    process.env.SECRET_ACCESS_KEY,
    {
      expiresIn: "1h",
    }
  );
};
User.prototype.saveToDB = function (fName) {
  let instance = require("../database/" + fName);
  instance.push(fName == "users.json" ? this.toObject() : this.__refreshtoken);
  return require("../database/saveToFiles")(fName, JSON.stringify(instance));
};

User.prototype.toObject = function () {
  return {
    name: this.__name,
    email: this.__email,
    password: this.__password,
    username: this.__username,
    accesstoken: this.__accesstoken,
    refreshtoken: this.__refreshtoken,
    cart: this.__cart,
    myProducts: this.__myProducts,
    exists: this.__exists,
    ok: this.__ok,
  };
};
module.exports = User;
