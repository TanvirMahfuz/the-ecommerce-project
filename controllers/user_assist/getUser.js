const Product = require("../../models/product.model.js");
const ApiError = require("../../utils/apiErrors.js");
async function fill(items) {
  let products = [];
  for (let item of items) {
    const product = await Product.findOne({_id: item});
    if (product) products.push(product);
  }
  return products;
}
const getUser = async function (req, res) {
  const temp = await fill(req.user.products);
  req.user.products = [];
  for (let item of temp) {
    req.user.products.push(item);
  }
  return res.status(200).send({msg: "ok", data: req.user});
};
module.exports = getUser;
