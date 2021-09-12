import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// TODO: replace any absolute links (jenniferhoffman.net)

// TODO: separate dev/prod files?
const config: webpack.Configuration = {
  mode: "development",
  devtool: false,
  // devtool: "eval-source-map",
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: "./src/main.js",
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
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // Create an HTML file as the entry point, instead of just
    // a .js file.
    new HtmlWebpackPlugin({
      filename: "main.html",
    }),
    // Works with HtmlWebpackPlugin so that the main script
    // is inlined in the output HTML file, instead of just
    // begin linked.  This lets your container be distributed
    // as a single HTML file.
    // See https://github.com/facebook/create-react-app/tree/main/packages/react-dev-utils#new-inlinechunkhtmlpluginhtmlwebpackplugin-htmlwebpackplugin-tests-regex
    // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]) as any,
    // Delete built .js files.  We don't need them since they
    // are inlined by InlineChunkHtmlPlugin.
    // new CleanWebpackPlugin({
    //   cleanAfterEveryBuildPatterns: ["*.js"],
    //   cleanStaleWebpackAssets: false,
    //   protectWebpackAssets: false,
    // }),
  ],
};

export default config;
