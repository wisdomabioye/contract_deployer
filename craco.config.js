const webpack = require("webpack");

module.exports = {
	webpack: {
		plugins: [
			new webpack.ProvidePlugin({
				process: "process/browser",
				Buffer: ["buffer", "Buffer"],
			}),
		],
		configure: {
			resolve: {
				/*fallback: {
					"stream": false,
					"crypto": false,
					"assert": false,
					"http": false,
					"https": false,
					"url": false,
					"os": false,
				},*/

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
					"os": require.resolve("os-browserify"),
				}
			}
		}
	}
}
 