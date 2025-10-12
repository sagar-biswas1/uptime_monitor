/**
 * Title: token Handlers
 * Description: Handle token related routes
 * Author: Sagar biswas
 * Date: 8/10/25
 */

// dependencies
const {
  hash,
  parseJSON,
  createRandomString,
} = require("../../helpers/utilities");
const data = require("../../lib/data");

const handler = {};

handler.tokenHandler = (requestProperties, cb) => {
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, cb);
  } else {
    cb(405, {
      message: "Request is not allowed",
    });
  }
};

handler._token = {};

handler._token.post = (requestProperties, cb) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone.trim()
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone && password) {
    data.read("users", phone, (err1, userData) => {
      const parsedUser = parseJSON(userData);
      const hashPass = hash(password);
      if (hashPass === parsedUser.password) {
        const tokenId = createRandomString(20);
        const expires = Date.now() + 60 * 60 * 60;
        const tokenObject = {
          phone,
          id: tokenId,
          expires,
        };

        data.create("tokens", tokenId, tokenObject, (err2, data) => {
          if (!err2) {
            cb(200, tokenObject);
          } else {
            cb(600, {
              error: "Server side error",
            });
          }
        });
      } else {
        cb(400, {
          error: "Invalid credentials",
        });
      }
    });
  } else {
    cb(400, {
      error: "You have a problem in your request",
    });
  }
};
handler._token.get = (requestProperties, callback) => {
  const tokenId =
    typeof requestProperties.queryStringObject.token === "string" &&
    requestProperties.queryStringObject.token.trim().length === 20
      ? requestProperties.queryStringObject.token.trim()
      : false;
  if (tokenId) {
    data.read("tokens", tokenId, (err1, token) => {
      if (!err1 && token) {
        const parsedToken = parseJSON(token);
        cb(200, parsedToken);
      } else {
        cb(500, {
          error: "Problem in server side",
        });
      }
    });
  } else {
    cb(400, {
      error: "You have not provided tokenId in query string",
    });
  }
};
handler._token.put = (requestProperties, callback) => {
  const tokenId =
    typeof requestProperties.body.token === "string" &&
    requestProperties.body.token.trim().length === 20
      ? requestProperties.body.token.trim()
      : false;
  const extend =
    typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend === true
      ? requestProperties.body.extend
      : false;
  if (tokenId) {
    data.read("tokens", tokenId, (err1, token) => {
      if (!err1 && token) {
        const parsedToken = parseJSON(token);
        if (parsedToken.expires > Date.now()) {
          parsedToken.expires = Date.now() + 60 * 60 * 1000;

          data.update("tokens", tokenId, parsedToken, (err2) => {
            if (!err2) {
              callback(200);
            } else {
              cb(500, {
                error: "Problem in server side",
              });
            }
          });
        } else {
          cb(400, {
            error: "Token already expired",
          });
        }
      } else {
        cb(500, {
          error: "Problem in server side",
        });
      }
    });
  } else {
    cb(400, {
      error: "You have not provided tokenId in query string",
    });
  }
};
handler._token.delete = (requestProperties, callback) => {
  const tokenId =
    typeof requestProperties.queryStringObject.token === "string" &&
    requestProperties.queryStringObject.token.trim().length === 20
      ? requestProperties.queryStringObject.token.trim()
      : false;

  if (tokenId) {
    data.read("tokens", tokenId, (err, u) => {
      if (!err && u) {
        const parsedToken = { ...parseJSON(u) };
        data.delete("tokens", tokenId, (err) => {
          if (!err) {
            callback(200, {
              message: "token was successfully deleted",
            });
          } else {
            callback(500, {
              error: "There was an error in server side",
            });
          }
        });
      } else {
        callback(500, {
          error: "There was an error in server side",
        });
      }
    });
  } else {
    callback(404, {
      error: "There was a problem in your request",
    });
  }
};

handler._token.verify = (id, phone, cb) => {
  data.read("tokens", id, (err, tokenData) => {
    if (!err && tokenData) {
      const parsedToken = parseJSON(tokenData);
      if (parsedToken.phone === phone && parsedToken.expires > Date.now()) {
        cb(true);
      } else {
        cb(false);
      }
    } else {
      cb(false);
    }
  });
};
module.exports = handler;
