import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    counter: "./src/site/counter.ts",
    whiteboard: "./src/site/whiteboard.ts",
    counter_webrtc: "./src/site/counter_webrtc.ts",
    minesweeper: "./src/site/minesweeper.ts",
    aspace: "./src/site/aspace.ts",
    matrix_widget: "./src/site/matrix_widget.ts",
    // TODO: Add more entries as needed for new pages
  },
  output: {
    path: path.resolve(__dirname, "build/site"),
    filename: "[name].js",
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
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.site.json",
        },
      },
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
        { from: "./src/site/index.html", to: "index.html" },
        { from: "./src/site/counter.html", to: "counter.html" },
        { from: "./src/site/whiteboard.html", to: "whiteboard.html" },
        { from: "./src/site/counter_webrtc.html", to: "counter_webrtc.html" },
        { from: "./src/site/minesweeper.html", to: "minesweeper.html" },
        { from: "./src/site/aspace.html", to: "aspace.html" },
        { from: "./src/site/matrix_widget.html", to: "matrix_widget.html" },
        // TODO: Add more entries as needed for new pages
      ],
    }),
  ],
};

export default config;
