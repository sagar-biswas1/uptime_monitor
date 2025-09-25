/**
 * Title: Sample Handlers
 * Description: Sample Handlers
 * Author: Sagar biswas
 * Date: 24/9/25
 */

const handler = {};

handler.notFoundHandler = (requestProperties, cb) => {
  console.log(requestProperties);
  cb(404, {
    message: "Your request url was not found",
  });
};

module.exports = handler;
