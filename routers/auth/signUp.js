const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config();
const User = require("../../models/userModel");
router.get("", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../static/html/signup.html"));
});

const { register } = require("../../controllers/user.controller");
router.post("", register);

module.exports = router;
