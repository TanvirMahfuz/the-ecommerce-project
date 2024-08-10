const mongoose = require("mongoose");
const User = require("../../models/user.model.js");
const ApiError = require("../../utils/apiErrors.js");
const generateTokens = require("./generateAccessAndRefreshTokens.js");
const logIn = async function (req, res) {
  try {
    const { username, email, password } = req.body;
    //we just need to verify these information and create tokens then set them as cookies
    if (!username && !email && !password) {
      console.error(
        new ApiError(400, "empty fields", "fill out the input fields"),
      );
      return res.status(400).send({ msg: "fill out the input fields" });
    }
    //since we are letting them log in using both username and email we have to add some extra logic.
    const searchparams = username ? { username } : { email }; // searchparams is an object we will use to perform mongoose search.

    //we are ready to search for the user.
    const user = await User.findOne(searchparams);
    if (!user) {
      console.error(new ApiError(404, "Error 404", "User not found"));
      return res.status(400).send({ msg: "Error: 404 User not found" });
    }
    //validate with the function that came with the user "isPasswordCorrect"
    //the created user will have access to the userSchema methods
    if (!user.isPasswordCorrect(password)) {
      console.error(new ApiError(401, "CredentialError", "wrong password"));
      return res.status(401).send({ msg: "wrong password" });
    }
    // now the token business. better to generate a function for that.
    const { accessToken, refreshToken } = await generateTokens(user._id);
    console.log(accessToken, refreshToken);
    //since we have all the information now. lets reform the user so it can be sent to client
    const data = {
      name: user.name,
      username: user.username,
      email: user.email,
      cart: user.cart,
      products: user.products,
      profileImg: user.profileImg,
    };
    //now set option for the cookies and send the response
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken, options)
      .send({ msg: "ok", data: data });
  } catch (error) {
    console.error(error.name, error.message);
  }
};

module.exports = logIn;
