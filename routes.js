/**
 * Title: Routes
 * Description: Application Routes
 * Author: Sagar biswas
 * Date: 24/9/25
 */

// dependencies

const { sampleHandler } = require("./handlers/routeHandlers/sampleHandlers");

const routes = {
  sample: sampleHandler,
};

module.exports = routes;
