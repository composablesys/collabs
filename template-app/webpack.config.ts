import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: "./src/app.ts",
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
      // the next rule and add html-loader as a devDependency,
      // so that Webpack knows to include those assets.
      // {
      //   test: /\.(html)$/,
      //   use: ["html-loader"],
      // },
      // Add loaders for other assets as needed, e.g., the
      // next rule loads images.
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: "asset/resource",
      // },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // Create an HTML file as the entry point, instead of just
    // a .js file.
    new HtmlWebpackPlugin({
      filename: "app.html",
      // Use app.html as the HTML file, instead of
      // the plugin's default file.
      template: "./src/app.html",
    }),
  ],
};

export default config;
