const createNewProduct = require("./product_management/create.js");
const getAllProducts = require("./product_management/getAll.js");
console.log(typeof getAllProducts);
module.exports = { createNewProduct, getAllProducts };
