const express = require("express");
const router = express.Router();
const path = require("path");
const {
  register,
  logIn,
  logout,
} = require("../../controllers/user.controller");
const isLoggedIn = require("../../middleware/auth.middleware");

router.get("", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../static/html/login.html"));
});

router.post("/in", logIn);
router.post("/out", isLoggedIn, logout);
// router.post("/in", (req, res) => {
//   try {
//     user = checkLogIn(req.body);
//     if (user != false) {
//       const ok = login(user);
//       console.log(ok);
//       res.cookie("accessKey", user.accesstoken);
//       res.cookie("refreshKey", user.refreshtoken);
//     } else {
//       console.log(checkLogIn(req.body));
//     }
//     res.status(200).send({msg: "ok"});
//   } catch (err) {
//     res.status(500).send({msg: "Internal server error"});
//   }
// });
//
//
//
//

// router.post("/out", (req, res) => {
//   try {
//     const ok = logOut(req.cookies.refreshKey);
//     console.log(ok);
//     res.clearCookie("accessKey");
//     res.clearCookie("refreshKey");
//     res.json({ msg: "ok" });
//   } catch (err) {
//     res.status(500).send({ msg: "Internal ServerError" });
//   }
// });
module.exports = router;
