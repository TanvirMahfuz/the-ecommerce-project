const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { isAuthenticated } = require("./auth/authTools");
// router.use(multer);
router.get("", isAuthenticated, (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/add.html"));
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

router.post("", isAuthenticated, async (req, res) => {
  try {
    const addItem = await require("../database/additem")(req.body);
    const createNewItem = await require("../controllers/product.controller")(
      req,
      res,
    );
    if (typeof createNewItem == "undefined")
      res.status(200).send({ msg: addItem });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
  }
});

module.exports = router;
//"https://avatar.iran.liara.run/username?username=Mangosteen"
// { "_id": "668f3843a8be1fc8c8025d4c", "ProductName": "Mangosteen", "ProductCode": "6296687648", "Img": "https://avatar.iran.liara.run/username?username=Mangosteen", "UnitPrice": "194 TK", "Qty": "8", "TotalPrice": "1552 TK", "CreatedDate": "2024-07-09T11:25:59.323Z" }
