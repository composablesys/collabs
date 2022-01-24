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
  entry: {
    web_socket: "./src/site/web_socket.ts",
    matrix: "./src/site/matrix.ts",
  },
  output: {
    filename: "[name].js",
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
      chunks: ["web_socket"],
      filename: "web_socket.html",
      template: "./src/site/web_socket.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["matrix"],
      filename: "matrix.html",
      template: "./src/site/matrix.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copy index.html, reset.html, more_info.html.
        {
          from: "./src/site/index.html",
          to: "./[base]",
        },
        {
          from: "./src/site/reset.html",
          to: "./[base]",
        },
        {
          from: "./src/site/more_info.html",
          to: "./[base]",
        },
      ],
    }),
  ],
};

export default config;
