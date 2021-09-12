import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// TODO: replace XML get with plain file ref
// TODO: single file bundle
// TODO: field for URL hashes, so you can set/get easily

// TODO: separate dev/prod files?
const config: webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: {
    "horse-color-genetics_files/horsegenetics2":
      "./src/horse-color-genetics_files/horsegenetics2.js",
    "horse-color-genetics_files/grabUrl":
      "./src/horse-color-genetics_files/grabUrl.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "window",
    },
    clean: true,
  },
  // TypeScript configuration.
  // See https://webpack.js.org/guides/typescript/
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/horse-color-genetics.html",
          to: "./[base]",
        },
        {
          from: "./src/horse-color-genetics_files/*.png",
          to: "./horse-color-genetics_files/[base]",
        },
        {
          from: "./src/horse-color-genetics_files/*.jpg",
          to: "./horse-color-genetics_files/[base]",
        },
        {
          from: "./src/horse-color-genetics_files/*.gif",
          to: "./horse-color-genetics_files/[base]",
        },
        {
          from: "./src/horse-color-genetics_files/*.css",
          to: "./horse-color-genetics_files/[base]",
        },
        {
          from: "./src/horse-color-genetics_files/*.xml",
          to: "./horse-color-genetics_files/[base]",
        },
      ],
    }),
  ],
};

export default config;
