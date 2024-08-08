require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("server is running on : http://localhost:3000/api/home");
    });
  })
  .catch((err) => {
    console.log(err);
  });
