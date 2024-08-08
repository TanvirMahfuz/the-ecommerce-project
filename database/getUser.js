function getUser(refreshKey) {
  const users = require("./users.json");
  for (let i = 0; i < users.length; i++) {
    console.log(users[i].refreshtoken);
    console.log(refreshKey);
    if (users[i].refreshtoken == refreshKey) {
      return users[i];
    }
  }
  return null;
}

module.exports = getUser;
