const User = require("../../models/user.model.js");
const generateAccessAndRefreshTokens = async function (userID) {
  const user = await User.findById(userID);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  await user.save({ validateBeforeSave: false });
  console.log({ accessToken, refreshToken });
  return { accessToken, refreshToken };
};
module.exports = generateAccessAndRefreshTokens;
