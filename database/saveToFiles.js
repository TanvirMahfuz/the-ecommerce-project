const fs = require("fs");

const saveToFile = (fileName, data) => {
  try {
    fs.writeFileSync("./database/" + fileName, data);
    console.log(`Data successfully written to ${fileName}`);
    return "ok";
  } catch (error) {
    console.log(error);
    return "Not ok";
  }
};
module.exports = saveToFile;
