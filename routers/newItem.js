const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("../middleware/auth.middleware");
const { createNewProduct } = require("../controllers/product.controller.js");

router.get("", isAuthenticated, (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/add.html"));
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

router.post("", isAuthenticated, createNewProduct);

module.exports = router;
