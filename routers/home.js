"use strict";
const express = require("express");
const path = require("path");
const isLoggedIn = require("../middleware/auth.middleware");
const router = express.Router();
const isauthenticated = require("../middleware/auth.middleware");

router.get("", (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/home.html"));
  } catch (error) {
    res.send(500, { messege: "internel server error" });
  }
});

router.get("/getData", (req, res) => {
  try {
    const data = require("../database/db.json");
    res.status(200).send({ data: data });
  } catch (error) {
    res.send(500, { messege: "internel server error" });
  }
});
router.post("", isauthenticated, (req, res) => {
  try {
    const saveToFile = require("../database/saveToFiles");
    const saveStatus = saveToFile("db.json", JSON.stringify(req.body));
    res.status(200).send({ message: "data received" });
  } catch (error) {
    console.log(error);
    res.send(500, { messege: "internel server error" });
  }
});

module.exports = router;
