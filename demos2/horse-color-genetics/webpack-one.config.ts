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
  // mode: "development",
  // devtool: "inline-source-map",
  mode: "production",
  devtool: false,
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: {
    "horse-color-genetics_files/horsegenetics2":
      "./src-one/horse-color-genetics_files/horsegenetics2.js",
    "horse-color-genetics_files/grabUrl":
      "./src-one/horse-color-genetics_files/grabUrl.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist-one"),
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
      {
        test: /\.(png|gif|jpg)/,
        type: "asset/inline",
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src-one/horse-color-genetics.html",
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]) as any,
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["**/*.js"],
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
    }),
  ],
};

export default config;
