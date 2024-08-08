const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();
//
//
const generateAccessToken = function (obj) {
  return jwt.sign({username: obj.username}, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "1h",
  });
};
//
//
const saveToDB = function (fName, callBack) {
  let instance = require("../../database/" + fName);
  instance = callBack(instance);
  return require("../../database/saveToFiles")(fName, JSON.stringify(instance));
};

const checkLogIn = function (obj) {
  const arr = require("../../database/users.json");
  const val = arr.find(
    (item) => item.username == obj.username && item.password == obj.password
  );
  if (val == undefined) return false;
  else return val;
};
//
//
//
//

const login = function (user) {
  // we have to generate access and refresh keys for the new user and save the user in the databse
  const acctoken = generateAccessToken({username: user.username});

  const reftoken = jwt.sign(
    {usernae: user.username},
    process.env.SECRET_REFRESH_KEY
  );

  user.accesstoken = acctoken;
  user.refreshtoken = reftoken;

  const ok = saveToDB("users.json", (instance) => {
    for (let item of instance) {
      if (item.username == user.username) {
        item = user;
        break;
      }
    }
    return instance;
  });

  const okk = saveToDB("usersRefTokn.json", (instance) => {
    instance.push(reftoken);
    return instance;
  });
  if (okk == "ok" && ok == "ok") return user;
  else return "something went wrong";
};
//
//

const logOut = function (obj) {
  return saveToDB("usersRefTokn.json", (instance) => {
    return instance.filter((item) => item != obj);
  });
};
//
//
//
//
function isAuthenticated(req, res, next) {
  const reftokens = require("../../database/usersRefTokn.json");
  if (reftokens.includes(req.cookies.refreshKey)) {
    console.log("user found");
    next();
  } else
    res
      .status(401)
      .sendFile(path.join(__dirname + "/../../static/html/login.html"));
}
//
//
//
//

module.exports = {
  generateAccessToken,
  saveToDB,
  checkLogIn,
  logOut,
  login,
  isAuthenticated,
};
