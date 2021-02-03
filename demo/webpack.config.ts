import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    counter: "./src/site/counter.ts",
    whiteboard: "./src/site/whiteboard.ts",
    tests: "./src/site/tests.ts",
    counterwebrtc: "./src/site/counterwebrtc.ts",
    // TODO: Add more entries as needed for new pages
  },
  output: {
    path: path.resolve(__dirname, "demoserver/public"),
    filename: "deploy/site/[name].js",
    library: "compoventuals-demo",
    libraryTarget: "window", // this needs to be changed
    libraryExport: "default",
  },
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  //   optimization: {
  //     minimize: true,
  //     minimizer: [new TerserPlugin({
  //         sourceMap: true,
  //     })]
  //   },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/site/index.html", to: "./deploy/site/index.html" },
        { from: "./src/site/counter.html", to: "./deploy/site/counter.html" },
        { from: "./src/site/whiteboard.html", to: "./deploy/site/whiteboard.html" },
        { from: "./src/site/tests.html", to: "./deploy/site/tests.html" },
        { from: "./src/site/counter_webrtc.html", to: "./deploy/site/counter_webrtc.html" },
        // TODO: Add more entries as needed for new pages
      ],
    }),
  ],
};

export default config;
