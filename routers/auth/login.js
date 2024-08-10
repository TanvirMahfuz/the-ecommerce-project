const express = require("express");
const router = express.Router();
const path = require("path");
const { logIn, logout } = require("../../controllers/user.controller");
const isLoggedIn = require("../../middleware/auth.middleware");

router.get("", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../static/html/login.html"));
});

router.post("/in", logIn);
router.post("/out", isLoggedIn, logout);

module.exports = router;
