"use strict";
const express = require("express");
const path = require("path");

const isLoggedIn = require("../middleware/auth.middleware");
const {
  addToCart,
  cartData,
  unSelectItem,
} = require("../controllers/cart.controller.js");

const router = express.Router();

router.get("", isLoggedIn, (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/cart.html"));
  } catch (error) {
    console.log(error);
    res.send(500, { message: "internal server error" });
  }
});

router.get("/cartData", isLoggedIn, cartData);

router.post("", isLoggedIn, addToCart);

router.post("/unselectItem", isLoggedIn, unSelectItem);

module.exports = router;
