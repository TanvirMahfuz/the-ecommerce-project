const Product = require("../../models/product.model.js");
const addToCart = async function (req, res) {
  try {
    const productIds = req.user.cart;
    let products = [];
    for (let item of productIds) {
      products.push(await Product.findById(item));
    }
    return res.status(200).send({ data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

module.exports = addToCart;
