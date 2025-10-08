/**
 * Title: Routes
 * Description: Application Routes
 * Author: Sagar biswas
 * Date: 24/9/25
 */

// dependencies

const { sampleHandler } = require("./handlers/routeHandlers/sampleHandlers");
const { tokenHandler } = require("./handlers/routeHandlers/tokenHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
