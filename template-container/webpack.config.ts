import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// TODO: separate dev/prod files?
const config: webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: "./src/my_container.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
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
    // Create an HTML file as the entry point, instead of just
    // a .js file.
    new HtmlWebpackPlugin({
      filename: "my_container.html",
      // Use [name].html as the HTML file (minus scripts), instead of
      // the plugin's default file.
      template: "./src/my_container.html",
      // Inject the compiled .js into the <body> instead of the
      // <head>.  This is useful together with the template option,
      // since then you can access HTML elements immediately
      // in your .ts file, instead of awaiting window.onload.
      inject: "body",
    }),
    // Works with HtmlWebpackPlugin so that the main script
    // is inlined in the output HTML file, instead of just
    // begin linked.  This lets your container be distributed
    // as a single HTML file.
    // See https://github.com/facebook/create-react-app/tree/main/packages/react-dev-utils#new-inlinechunkhtmlpluginhtmlwebpackplugin-htmlwebpackplugin-tests-regex
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]) as any,
    // Delete built .js files.  We don't need them since they
    // are inlined by InlineChunkHtmlPlugin.
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["*.js"],
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
    }),
  ],
};

export default config;
