/**
 * Title: Sample Handlers
 * Description: Sample Handlers
 * Author: Sagar biswas
 * Date: 24/9/25
 */

const handler = {};

handler.sampleHandler = (requestProperties, cb) => {
  console.log(requestProperties);
  cb(200, {
    message: "This is a sample url",
  });
};

module.exports = handler;
