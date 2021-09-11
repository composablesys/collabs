import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// TODO: separate dev/prod files?
const config: webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  // Tree-shaking optimizations.  These help make
  // small dist files in mode: "production".
  // See https://blog.theodo.com/2021/04/library-tree-shaking/
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: "./src/my_container.ts",
  // TypeScript configuration.
  // See https://webpack.js.org/guides/typescript/ for more info,
  // including advice on importing third-party libraries and
  // non-ts assets.
  module: {
    rules: [
      // All files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // Use the source maps from compoventuals and other
      // dependencies, so that the browser debugger shows
      // line numbers and files in their original TypeScript.
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
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  // We use several plugins in combination to build the container
  // as a single HTML file, which as all of its resources
  // inlined.
  plugins: [
    // Create an HTML file as the entry point, instead of just
    // a .js file.
    new HtmlWebpackPlugin({
      filename: "[name].html",
      // Use [name].html as the HTML file (minus scripts), instead of
      // the plugin's default file.  This lets you write plain
      // HTML for your app.  You can instead delete this option
      // and create the HTML within your .ts file (more
      // traditional for Webpack projects).
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
    // Docs: https://github.com/facebook/create-react-app/tree/main/packages/react-dev-utils#new-inlinechunkhtmlpluginhtmlwebpackplugin-htmlwebpackplugin-tests-regex
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
