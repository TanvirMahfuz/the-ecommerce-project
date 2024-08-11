const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("../middleware/auth.middleware.js");
const {getUser} = require("../controllers/user.controller.js");

router.get("", isAuthenticated, (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/../static/html/profile.html"));
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

router.post("", isAuthenticated, getUser);

module.exports = router;
