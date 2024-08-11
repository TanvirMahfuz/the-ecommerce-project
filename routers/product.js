const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("../middleware/auth.middleware.js");
const {
  createNewProduct,
  getAllProducts,
  search,
  deleteProduct,
} = require("../controllers/product.controller.js");

router.get("", isAuthenticated, (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/add.html"));
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

router.post("/add", isAuthenticated, createNewProduct);
router.post("/search", isAuthenticated, search);
router.post("/delete", isAuthenticated, deleteProduct);

module.exports = router;
