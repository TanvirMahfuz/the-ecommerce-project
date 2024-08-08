const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const storage = require("./static/uploads/upload");
const cookie = require("cookie-parser");
const upload = multer({storage: storage}).single("file");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/static")));
app.use(express.urlencoded({extended: true, limit: 10000}));
app.use(cookie());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const home = require("./routers/home");
app.use("/api/home", home);

const cart = require("./routers/cart");
app.use("/api/cart", cart);

const newItem = require("./routers/newItem");
app.use("/api/add", newItem);

const search = require("./routers/search");
app.use("/api/search", search);

app.use("/api/log", require("./routers/auth/login"));
app.use("/api/sign-up", require("./routers/auth/signUp"));
app.listen(3000, () => {
  console.log("server is running on : http://localhost:3000/api/home");
});
