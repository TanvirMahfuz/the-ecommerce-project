const Product = require("../../models/product.model.js");
const search = async (req, res) => {
  try {
    const items = await Product.find({name: req.body.name});
    res.status(200).send({data: items});
  } catch (error) {
    console.error("search Error");
  }
};
module.exports = search;
