/**
 * Title: user Handlers
 * Description: user Handlers to handle user related routes
 * Author: Sagar biswas
 * Date: 5/10/25
 */

// dependencies
const { hash, parseJSON } = require("../../helpers/utilities");
const data = require("../../lib/data");

const handler = {};

handler.userHandler = (requestProperties, cb) => {
  const acceptedMethod = ["get", "post", "put", "delete"];

  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, cb);
  } else {
    cb(405, {
      message: "Request is not allowed",
    });
  }
};

handler._user = {};

handler._user.post = (requestProperties, cb) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName.trim()
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName.trim()
      : false;

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

  const tosAgreement = requestProperties.body.tosAgreement;

  if (firstName && lastName && phone && password) {
    // make sure that the user does not already exists
    data.read("users", phone, (err1, user) => {
      if (err1) {
        const hashPass = hash(password);
        let userObj = {
          firstName,
          lastName,
          phone,
          password: hashPass,
          tosAgreement,
        };
        data.create("users", phone, userObj, (err2) => {
          if (!err2) {
            cb(200, {
              message: "User was created successfully",
            });
          } else {
            cb(500, {
              error: "Could not create the user",
            });
          }
        });
      } else {
        cb(500, {
          error: "The user is already exists",
        });
      }
    });
  } else {
    cb(400, {
      error: "You have a problem in your request",
    });
  }
};
handler._user.get = (requestProperties, callback) => {
  // check if the phone is valid

  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone.trim()
      : false;

  if (phone) {
    data.read("users", phone, (err, u) => {
      if (!err && u) {
        const user = { ...parseJSON(u) };
        delete user.password;
        callback(200, {
          user,
        });
      } else {
        callback(404, {
          error: "requested user was not found",
        });
      }
    });
  } else {
    callback(404, {
      error: "requested user was not found",
    });
  }
};
handler._user.put = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName.trim()
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName.trim()
      : false;

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

  if (phone) {
    if (firstName || lastName || password) {
      // Lookup the user
      data.read("users", phone, (err, user) => {
        if (!err && user) {
          const updatedUser = { ...parseJSON(user) };
          if (firstName) updatedUser.firstName = firstName;
          if (lastName) updatedUser.lastName = lastName;
          if (password) updatedUser.password = password;

          data.update("users", phone, updatedUser, (err) => {
            if (!err) {
              callback(200, {
                message: "user updated successfully",
              });
            } else {
              callback(500, {
                error: "There was a problem in server side",
              });
            }
          });
        } else {
          callback(404, {
            error: "requested user was not found",
          });
        }
      });
    } else {
      cb(400, {
        error: "You have problem in your response",
      });
    }
  } else {
    cb(400, {
      error: "Invalid phone number",
    });
  }
};
handler._user.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone.trim()
      : false;

  if (phone) {
    data.read("users", phone, (err, u) => {
      if (!err && u) {
        const user = { ...parseJSON(u) };
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, {
              message: "user was successfully deleted",
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

module.exports = handler;
