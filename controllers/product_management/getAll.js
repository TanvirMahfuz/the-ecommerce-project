const Product = require("../../models/product.model.js");
const ApiError = require("../../utils/apiErrors");
const getAllProducts = async function (req, res) {
  const products = await Product.find();
  if (!products) {
    console.error(new ApiError(500, "Error Fetching Data"));
    return res.status(500).send("internal server error");
  }

  return res.status(200).send({ msg: "ok", data: products });
};
module.exports = getAllProducts;
