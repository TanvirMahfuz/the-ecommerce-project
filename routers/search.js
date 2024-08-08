const express = require("express");
const router = express.Router();
const path = require("path");
router.post("", async (req, res) => {
  const items = await require("../database/searchItem")(req.body.name);
  res.status(200).send({ data: items });
});
module.exports = router;
