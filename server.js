/* eslint no-console: 0 */

const config = require("./config/config");
const NodeService = require("./src/services/common/node-service");
require("dotenv").config();

if (!config) { throw new Error("configuration cannot be null/undefined"); }

const PORT = process.env.PORT;

var monitoring = require("appmetrics-dash");

if (NodeService.isProduction()) {
  const express = require("express");
  const path = require("path");

  const app = express();

  // Configure static resources
  app.use(express.static(path.join(__dirname, "/dist")));

  // Configure server-side routing
  app.get("*", (req, res) => {
    const dist = path.join(__dirname, "/dist/index.html");
    res.sendFile(dist);
  });

  monitoring.attach();

  // Open socket
  app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
  });
} else {
  const webpack = require("webpack");
  const WebpackDevServer = require("webpack-dev-server");
  const config = require("./webpack.config.js");

  monitoring.monitor();

  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true
  }).listen(PORT, "localhost", error => {
    console.error(error || `Started WebpackDevServer on port ${PORT}`);
  });
}
