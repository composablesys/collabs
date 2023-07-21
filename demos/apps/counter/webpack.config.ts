import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

// Basic Webpack config for TypeScript, based on
// https://webpack.js.org/guides/typescript/ .
const config: webpack.Configuration = {
  // mode and devtool are overridden by `npm run build` for production mode.
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/app.ts",
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
    // Copy about.html to the dist folder.
    new CopyPlugin({
      patterns: [{ from: "src/about.html", to: "[name][ext]" }],
    }),
  ],
};

export default config;
