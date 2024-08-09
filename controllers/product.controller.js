const Products = require("../models/product.model.js");
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function item(obj) {
  let { ProductName, Img, UnitPrice, Qty } = obj;
  return {
    name: ProductName,
    productImg:
      Img == ""
        ? "https://avatar.iran.liara.run/username?username=" + ProductName
        : Img,
    unitPrice: `${UnitPrice} TK`,
    qty: Qty,
  };
}
const createNewProduct = async (req, res) => {
  // 1. convert object name to database name to database name
  const product = item(req.body);
  product.unitPrice = parseFloat(product.unitPrice);
  product.qty = parseInt(product.qty);
  if (!product.unitPrice || !product.qty) {
    return res
      .status(400)
      .send({ msg: "Use number value for unit price and quantity" });
  }

  // 2. save product to database
  let newProduct = null;
  try {
    newProduct = await Products.create(product);
  } catch (error) {
    console.log(error.name, error.message);
  }

  // 3. check creation
  const createdProduct = await Products.findOne({ _id: newProduct._id });
  if (!createdProduct) {
    return res.status(500).send({ msg: "Database Error" });
  }
  // res.status(200).send({ msg: "ok" });
};

module.exports = createNewProduct;
