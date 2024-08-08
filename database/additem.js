function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function item(obj) {
  let { ProductName, Img, UnitPrice, Qty } = obj;
  return {
    ProductName,
    ProductCode: random(1000000, 9999999).toString(),
    Img:
      Img == ""
        ? "https://avatar.iran.liara.run/username?username=" + ProductName
        : Img,
    UnitPrice: `${UnitPrice} TK`,
    Qty: Qty,
    TotalPrice: `${parseInt(UnitPrice) * parseInt(Qty)} TK`,
    CreatedDate: Date.now().toString(),
  };
}
const additem = async (obj) => {
  // let items = require("./db.json");
  // items.push(item(obj));
  // const save = require("./saveToFiles");
  // const ok = save("db.json", JSON.stringify(items));
  try {
    let res = await fetch("https://crud.teamrabbil.com/api/v1/CreateProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item(obj)),
    });
    if (res.status == 200) return "ok";
    return "not ok";
  } catch (error) {
    console.error(error);
    return "not okay";
  }
};

module.exports = additem;
