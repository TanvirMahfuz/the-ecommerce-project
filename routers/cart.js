"use strict";
const express = require("express");
const path = require("path");
const router = express.Router();
const { isAuthenticated, saveToDB } = require("./auth/authTools");
const getUser = require("../database/getUser");
const ApiError = require("../utils/apiErrors");
//returns the cart page
router.get("", isAuthenticated, (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/cart.html"));
  } catch (error) {
    console.log(error);
    res.send(500, { message: "internal server error" });
  }
});

let user = null;
//setting the user variable
router.use("", isAuthenticated, (req, res, next) => {
  user = getUser(req.cookies.refreshKey);
  cart.add(req.body.pro_id);
  next();
});
let cart = new Set();

//filling the data to send to the backend
router.get("/cartData", isAuthenticated, (req, res) => {
  const fillData = require("../database/fillCart");
  const data = fillData(user.cart);
  res.status(200).send({ data: data });
});

//adds item to the cart
router.post("", isAuthenticated, (req, res) => {
  try {
    console.log("Cart => ", cart);
    for (let item of cart) {
      user.cart.push(item);
    }
    user.cart = [...new Set(user.cart)];
    const ok = saveToDB("users.json", (instance) => {
      for (let item of instance) {
        if (item.username == user.username) {
          item = user;
          break;
        }
      }
      return instance;
    });
    res.status(200).send({ msg: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

// unselects item form the cart
router.post("/unselectItem", (req, res) => {
  const id = req.body.pro_id;
  user.cart = user.cart.filter((item) => item != id);
  const ok = saveToDB("users.json", (instance) => {
    for (let item of instance) {
      if (item.username == user.username) {
        item = user;
        break;
      }
    }
    return instance;
  });
  res.status(200).send({ msg: id });
});
module.exports = router;
