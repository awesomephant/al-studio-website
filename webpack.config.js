const path = require("path");
module.exports = {
  entry: {
    dist: "./js/index.js",
    admin: "./admin/admin.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
