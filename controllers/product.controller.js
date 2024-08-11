const createNewProduct = require("./product_management/create.js");
const getAllProducts = require("./product_management/getAll.js");
const search = require("./product_management/search.js");
const deleteProduct = require("./product_management/delete.js");
console.log(typeof getAllProducts);
module.exports = {createNewProduct, getAllProducts, search, deleteProduct};
