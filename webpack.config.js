const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const { default: mermaid } = require("mermaid");
module.exports = {
  externals: {
    mermaid: "mermaid",
  },

  mode: "production",

  entry: {
    diagram: "./js/diagram.js",
  },
  output: {
    filename: "[name]/bundle.js",
    path: path.resolve(__dirname, "static/js"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 3,
    }),
  ],
  optimization: {
    sideEffects: true,
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          output: { comments: false },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/](?!mermaid)/,
          name: "diagram/otherDeps",
          chunks: "all",
        },
      },
    },
    runtimeChunk: false,
  },
};
