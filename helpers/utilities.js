/**
 * Title: Utilities
 * Description: important utilities function
 * Author: Sagar Biswas
 * Date: 5/10/25
 */

// dependencies
const crypto = require("crypto");
const environmentToExport = require("./environments");
// module scaffolding

const utilities = {};

// parse JSON string to object
utilities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch (err) {
    output = {};
  }
  return output;
};

utilities.hash = (string) => {
  if (typeof string === "string" && string.length > 0) {
    const hash = crypto
      .createHmac("sha256", environmentToExport.hashSecretKey)
      .update(string)
      .digest("hex");

    return hash;
  } else {
    return false;
  }
};

// create random string
utilities.createRandomString = (stringLength = 20) => {
  let length = stringLength;
  length =
    typeof stringLength === "number" && stringLength > 20
      ? stringLength
      : false;
  if (length) {
    let possibleCharacter = "qwertyuiopasdfghjklmnbvcxz1234567890";
    let output = "";
    for (let i = 0; i <= length; i++) {
      const randomCharacter = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length)
      );
      output += randomCharacter;
    }
  } else {
    return false;
  }
};

module.exports = utilities;
