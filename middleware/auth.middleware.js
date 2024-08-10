const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiErrors");
const User = require("../models/user.model");
const verifyJWT = async function (req, res, next) {
  //cookis can come form the cookies, or they can come from a authorization header (the `bearer "token"`)
  const accessToken =
    req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
  if (!accessToken) {
    console.error(new ApiError(401, "InvalidLogin", "User not logged in"));
    return res.status(400).send({ msg: "user not looged in" });
  }
  console.log(accessToken);
  //now that we got the access token, we have to decode it to get any sort of information out of it
  const userObj = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

  // now get the user from database and set req.user = user
  const user = await User.findById(userObj?._id).select(
    "-password -refreshToken",
  );
  if (!userObj) {
    console.error(new ApiError(404, "404", "User not found"));
    return res.status(404).send({ msg: "User not found" });
  }
  req.user = User;
  next();
};
module.exports = verifyJWT;
