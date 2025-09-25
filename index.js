/**
 * Title: Uptime monitoring api
 * Description: A restful api to monitor up/down time
 * Author: Sagar Biswas
 * Date: 24/8/25
 */

// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
// app object - module scaffolding
const app = {};

// configurations
app.config = {
  port: 4000,
};

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log("listing to port: ", app.config.port);
  });
};

// handle request response

app.handleReqRes = handleReqRes;

// start server

app.createServer();
