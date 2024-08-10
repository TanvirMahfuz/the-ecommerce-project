const mongoose = require("mongoose");
const User = require("../../models/user.model.js");
const ApiError = require("../../utils/apiErrors.js");
const register = async function (req, res) {
  const { name, email, password, conpassword } = req.body;
  const username = email.split("@")[0];

  // 1. check password validation
  if (password != conpassword) {
    console.error(new ApiError(500, "Api Error", "passwords dont match"));
    return res.status(200).send({ msg: "passwords didn't match" });
  }

  // 2. checking if there are any empty fields
  if (
    [name, email, password, conpassword].some(
      (element) => element?.trim() === "",
    )
  ) {
    console.error(new ApiError(500, "Api Error", "empty fields detected"));
    return res.status(409).send({ msg: "you've put in some empty fileds" });
  }

  // 3. check if the user already exsists
  const preUser = await User.findOne({ email });
  if (preUser) {
    console.error(
      new ApiError(500, "Api Error", "email or username aleady exists"),
    );
    return res.status(409).send({ msg: "email or username aleady exists" });
  }

  // 4. add the user to the database. user Create method since it will be the first time
  const user = await User.create({ name, email, password, username });

  // 5. check if the user is created or not
  const createdUser = await User.findOne({ _id: user._id }).select("-password");
  if (!createdUser) {
    console.error(new ApiError(500, "Api Error", "User Creation failed"));
    return res.status(500).send({ msg: "Database error" });
  }

  res.status(200).send({ msg: "ok" });
};

module.exports = register;
