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
  entry: {
    horsegenetics2: "./src/horse-color-genetics_files/horsegenetics2.js",
    grabUrl: "./src/horse-color-genetics_files/grabUrl.js",
  },
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    // Make functions available to scripts in the source HTML file.
    library: { type: "window" },
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    // Use src/index.html as the entry point.
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // Copy assets to the dist folder.
    new CopyPlugin({
      patterns: [
        { from: "src/about.html", to: "[name][ext]" },
        {
          from: "src/horse-color-genetics_files/*.png",
          to: "horse-color-genetics_files/[name][ext]",
        },
        {
          from: "src/horse-color-genetics_files/*.gif",
          to: "horse-color-genetics_files/[name][ext]",
        },
        {
          from: "src/horse-color-genetics_files/*.jpg",
          to: "horse-color-genetics_files/[name][ext]",
        },
      ],
    }),
  ],
};

export default config;
