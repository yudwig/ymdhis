const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "umd"),
    filename: "ymdhis.js",
    library: "ymdhis",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.umd.json"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  }
};

