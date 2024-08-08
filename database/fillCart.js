const fillCart = (cart) => {
  let data = [];
  const darr = require("./db.json");
  for (let item of darr) {
    if (cart.includes(item._id)) {
      data.push(item);
    }
  }
  return data;
};
module.exports = fillCart;
