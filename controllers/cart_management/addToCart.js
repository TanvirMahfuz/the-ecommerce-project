const User = require("../../models/user.model");
const addToCart = async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { cart: req.body.pro_id } },
      { new: true },
    );
    if (!user) {
      console.error(new ApiError(500, "database error"));
    }
    return res.status(200).send({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

module.exports = addToCart;
