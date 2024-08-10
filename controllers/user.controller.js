const register = require("./user_assist/register.js");
const logIn = require("./user_assist/login.js");
const logout = require("./user_assist/logout.js");
console.log(register, logIn, logout);
module.exports = { register, logIn, logout };
