import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

// TODO: automatically create the Config from a list of
// projects, to reduce duplication.

const config: webpack.Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    counter: "./src/site/counter.ts",
    whiteboard: "./src/site/whiteboard.ts",
    aspace: "./src/site/aspace.ts",
    counter_webrtc: "./src/site/counter_webrtc.ts",
    minesweeper: "./src/site/minesweeper.ts",
    variablecounter: "./src/site/variablecounter.ts",
    text: "./src/site/text.ts",
    plaintext: "./src/site/plaintext.ts",
    host: "./src/site/host.ts",
    host_iframe: "./src/site/host_iframe.ts",
    "matrix/widget_test": "./src/site/matrix/widget_test.ts",
    "matrix/whiteboard": "./src/site/matrix/whiteboard.ts",
    "matrix/minesweeper": "./src/site/matrix/minesweeper.ts",
    "matrix/plaintext": "./src/site/matrix/plaintext.ts",
    "containers/counter": "./src/site/containers/counter.ts",
    // TODO: Add more entries as needed for new pages
  },
  output: {
    path: path.resolve(__dirname, "build/site"),
    filename: "[name].js",
    library: "compoventuals-demos",
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
    parser: {
      javascript: {
        // Required for dynamic import statements.
        commonjsMagicComments: true,
      },
    },
    // // Don't let the dynamic import in host_iframe.ts scare
    // // webpack into bundling every file just in case;
    // // instead, we will manually add entrypoints for each
    // // file that could be loaded this way.
    // exprContextRegExp: /$^/,
    // exprContextCritical: false,
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
        { from: "./src/site/variablecounter.html", to: "variablecounter.html" },
        { from: "./src/site/text.html", to: "text.html" },
        { from: "./src/site/plaintext.html", to: "plaintext.html" },
        { from: "./src/site/host.html", to: "host.html" },
        { from: "./src/site/host_iframe.html", to: "host_iframe.html" },
        {
          from: "./src/site/matrix/widget_test.html",
          to: "matrix/widget_test.html",
        },
        {
          from: "./src/site/matrix/whiteboard.html",
          to: "matrix/whiteboard.html",
        },
        {
          from: "./src/site/matrix/minesweeper.html",
          to: "matrix/minesweeper.html",
        },
        {
          from: "./src/site/matrix/plaintext.html",
          to: "matrix/plaintext.html",
        },
        { from: "./src/site/reset.html", to: "reset.html" },
        // TODO: Add more entries as needed for new pages
      ],
    }),
  ],
};

export default config;
