const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config();
const User = require("../../models/userModel");
router.get("", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../static/html/signup.html"));
});

router.post("", (req, res) => {
  try {
    const {name, email, password} = req.body;
    const muser = new User(name, email, password);
    res.cookie("accessKey", muser.__accesstoken);
    res.cookie("refreshKey", muser.__refreshtoken);
    res.json({msg: "ok"});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});
module.exports = router;
