const User = require("../../models/user.model.js");
const ApiError = require("../../utils/apiErrors.js");
const generateTokens = require("./generateAccessAndRefreshTokens.js");

const logout = async function (req, res) {
  //in a logout call, the client isn't actually sending any information. so to know which client is logged in, we check the information in the cookies. a better approach is: we create a middleware the validates the user and creates a req.user field. then we come to the logout function and work with the user data
  try {
    await User.findByIdAndUpdate(
      req.user._id, //finding by id
      { $set: { refreshToken: undefined } }, //setting refressh token to undefined
      { new: true }, // it returns the saved user info, not necessary here
    );
    //logout basically means clearing the cookies and changing the refresh token
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out successfully",
        msg: "ok",
      });
  } catch (error) {
    console.error(new ApiError(500, "Internal Error"));
    return res.status(500).send({ msg: "internal Server Error" });
  }
};
module.exports = logout;
