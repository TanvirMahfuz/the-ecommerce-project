const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
router.post("", async (req, res) => {
  try {
    const items = await Product.find({ name: req.body.name });
    res.status(200).send({ data: items });
  } catch (error) {
    console.error("search Error");
  }
});
module.exports = router;
