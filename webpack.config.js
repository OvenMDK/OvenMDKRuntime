const path = require("path");
const package = require("./package.json");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "AC_OvenMDK.js", // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src"),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpg|gif|txt|ttf)$/i,
        type: "asset/inline",
      },
      { test: /\.css$/, use: "css-loader" },
    ],
  },
  optimization: {
    mangleExports: 'deterministic',
    minimize: true,
  }
};
