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
  entry: "./src/my_container.ts",
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
      // If you include assets in your HTML file, uncomment
      // the next rule and install html-loader as a devDependency,
      // so that Webpack knows to include those assets.
      // {
      //   test: /\.(html)$/,
      //   use: ["html-loader"],
      // },
      // Add loaders for other assets as needed, e.g., the
      // next rule loads images.  "asset/inline" inlines
      // them so you get a single .html file in the end.
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: "asset/inline",
      // },
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
      // Use my_container.html as the HTML file,
      // instead of the plugin's default file.
      template: "./src/my_container.html",
      // Inject the compiled .js into <body> instead of
      // <head>.  This lets you access HTML elements immediately
      // in your .ts file, instead of awaiting window.onload.
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
