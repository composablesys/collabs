import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: "./src/tile_board.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
      filename: "tile_board.html",
      // Use tile_board.html as the HTML file,
      // instead of the plugin's default file.
      template: "./src/tile_board.html",
      // Inject the compiled .js into <body> instead of
      // <head>.  This lets use access HTML elements immediately
      // in tile_board.ts file, instead of awaiting window.onload.
      // (Normally you don't have to do this because scripts are
      // deferred, but inline scripts can't be deferred.)
      inject: "body",
    }),
    // Inline scripts in the HtmlWebpackPlugin's generated
    // HTML file.
    // Docs: https://github.com/facebook/create-react-app/tree/main/packages/react-dev-utils#new-inlinechunkhtmlpluginhtmlwebpackplugin-htmlwebpackplugin-tests-regex
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]) as any,
    // Delete built .js files.  We don't need them since they
    // are inlined by InlineChunkHtmlPlugin.
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["**/*.js"],
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
    }),
  ],
};

export default config;
