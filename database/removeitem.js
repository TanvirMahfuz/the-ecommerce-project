const save = require("./saveToFiles");
const removeItem = (id) => {
  let items = require("./db.json");
  items = items.filter((item) => item._id != id);
  const ok = save("db.json", items);
  console.log(ok);
};

module.exports = removeItem;
