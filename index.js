/**
 * Title: Uptime monitoring api
 * Description: A restful api to monitor up/down time
 * Author: Sagar Biswas
 * Date: 24/8/25
 */

// dependencies
const data = require("./lib/data");
const environmentToExport = require("./helpers/environments");
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
// app object - module scaffolding
const app = {};

// data.update(
//   "test",
//   "newfile",
//   {
//     name: "gello",
//   },
//   (err) => {
//     console.log(err);
//   }
// );

data.read("test", "newFile", (err, data) => {
  console.log(err, data);
});
// configurations
app.config = {
  port: environmentToExport.port,
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
