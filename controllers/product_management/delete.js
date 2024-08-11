const Products = require("../../models/product.model.js");
const User = require("../../models/user.model.js");
const ApiError = require("../../utils/apiErrors.js");

const deleteProduct = async (req, res) => {
  try {
    // 1. convert object name to database name to database name
    const product = await Products.findByIdAndDelete(req.body.id);
    if (!product) {
      console.error(new ApiError(500, "DatabaseError"));
      return res.status(500).send({msg: "internal server error"});
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {$pull: {products: req.body.id}},
      {new: true}
    );
    if (!user) {
      console.error(new ApiError(500, "DatabaseError"));
      return res.status(500).send({msg: "internal server error"});
    }
    return res.status(200).send({msg: "ok"});
  } catch (error) {
    console.log(new ApiError(500, "ServerError"));
    return res.status(500).send("internal server error");
  }
};
module.exports = deleteProduct;
