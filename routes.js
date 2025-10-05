/**
 * Title: Routes
 * Description: Application Routes
 * Author: Sagar biswas
 * Date: 24/9/25
 */

// dependencies

const { sampleHandler } = require("./handlers/routeHandlers/sampleHandlers");
const { userHandler } = require("./handlers/routeHandlers/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
