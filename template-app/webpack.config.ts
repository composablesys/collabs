import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";

// Basic Webpack config for TypeScript, based on
// https://webpack.js.org/guides/typescript/ .
const config: webpack.Configuration = {
  // mode and devtool are overridden by `npm run build` for production mode.
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/main.ts",
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
      // Other loaders here...
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    // Use src/index.html as the entry point.
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // webpack-dev-server config.
  devServer: {
    port: 3000,
    compress: true,
    static: path.join(__dirname, "dist"),
  },
};

export default config;
