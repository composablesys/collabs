import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: "./src/site/host.ts",
  output: {
    filename: "host.js",
    path: path.resolve(__dirname, "build/site"),
    clean: true,
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
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "host.html",
      template: "./src/site/host.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copy index.html, reset.html.
        {
          from: "./src/site/index.html",
          to: "./[base]",
        },
        {
          from: "./src/site/reset.html",
          to: "./[base]",
        },
      ],
    }),
  ],
};

export default config;
