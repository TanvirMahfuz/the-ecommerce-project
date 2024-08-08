const express = require("express");
const router = express.Router();
const path = require("path");
router.get("", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/cart.html"));
  } catch (error) {
    console.log(error);
    res.send(500, { messege: "internel server error" });
  }
});

router.post("", (req, res) => {
  console.log("-------------------------------");
  const id = req.body;
  console.log(id);
  cart = cart.filter((item) => item.pro_id != id.pro_id);
  console.log(cart);
  res.status(200).send(id);
});

module.exports = router;
