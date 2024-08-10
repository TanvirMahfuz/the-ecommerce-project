const Products = require("../../models/product.model.js");
const User = require("../../models/user.model.js");
const ApiError = require("../../utils/apiErrors.js");
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
  try {
    // 1. convert object name to database name to database name
    const product = item(req.body);
    product.unitPrice = parseFloat(product.unitPrice);
    product.qty = parseInt(product.qty);
    if (!product.unitPrice || !product.qty) {
      return res
        .status(400)
        .send({ msg: "Use number value for unit price and quantity" });
    }
    product.owner = req.user._id;

    // 2. save product to database

    const newProduct = await Products.create(product);
    if (!newProduct) {
      console.log(error.name, error.message);
    }

    // 3. add the created product to the user arsenal
    const userWithItem = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { products: newProduct._id } },
      { new: true },
    );
    if (!userWithItem) {
      console.log(new ApiError(500, "ServerError"));
      return res.status(500).send("internal server error");
    }
    return res.status(200).send({ msg: "ok" });
  } catch (error) {
    console.log(new ApiError(500, "ServerError"));
    return res.status(500).send("internal server error");
  }
};
module.exports = createNewProduct;
