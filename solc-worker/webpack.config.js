const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
        "path": require.resolve("path-browserify"),
        // "fs": require.resolve("fs"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "string_decoder": require.resolve("string_decoder/"),
        "os": require.resolve("os-browserify"),
    }
  },
  output: {
    filename: "solcompiler.worker.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  ]
};