const getItem = async (name) => {
  try {
    let container = [];
    const items = require("./db.json");
    for (let item of items) {
      if (item.ProductName == name) {
        container.push(item);
      }
    }
    console.log("done searching");
    return container;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getItem;
