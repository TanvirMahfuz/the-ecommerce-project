const User = require("../../models/user.model.js");
const ApiError = require("../../utils/apiErrors.js");

const unSelectItem = async function (req, res) {
  console.log("unselect middleware reached");
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { cart: req.body.pro_id } },
      { new: true },
    );
    if (!user) {
      console.error(new ApiError(500, "DatabaseError"));
      return res.status(500).send({ msg: "internal server error" });
    }

    return res.status(200).send({ msg: "ok" });
  } catch (error) {
    console.error(new ApiError(500, "DatabaseError"));
    return res.status(500).send({ msg: "internal server error" });
  }
};
module.exports = unSelectItem;
