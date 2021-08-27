import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

// TODO: automatically create the Config from a list of
// projects, to reduce duplication.

const config: webpack.Configuration = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    "containers/aspace": "./src/site/containers/aspace.ts",
    "containers/counter": "./src/site/containers/counter.ts",
    "containers/minesweeper": "./src/site/containers/minesweeper.ts",
    "containers/plaintext": "./src/site/containers/plaintext.ts",
    "containers/text": "./src/site/containers/text.ts",
    "containers/whiteboard": "./src/site/containers/whiteboard.ts",
    "hosts/plain": "./src/site/hosts/plain.ts",
    "hosts/sandbox_iframe": "./src/site/hosts/sandbox_iframe.ts",
    "hosts/sandbox": "./src/site/hosts/sandbox.ts",
    "non_container_demos/counter_matrix":
      "./src/site/non_container_demos/counter_matrix.ts",
    "non_container_demos/counter_webrtc":
      "./src/site/non_container_demos/counter_webrtc.ts",
    "non_container_demos/counter_ws":
      "./src/site/non_container_demos/counter_ws.ts",
    // TODO: Add more entries as needed for new pages
  },
  output: {
    path: path.resolve(__dirname, "build/site"),
    filename: "[name].js",
    library: "compoventuals_ContainerSource",
    libraryTarget: "window",
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
        {
          from: "./src/site/hosts/plain.html",
          to: "hosts/plain.html",
        },
        {
          from: "./src/site/hosts/sandbox_iframe.html",
          to: "hosts/sandbox_iframe.html",
        },
        {
          from: "./src/site/hosts/sandbox.html",
          to: "hosts/sandbox.html",
        },
        {
          from: "./src/site/non_container_demos/counter_matrix.html",
          to: "non_container_demos/counter_matrix.html",
        },
        {
          from: "./src/site/non_container_demos/counter_webrtc.html",
          to: "non_container_demos/counter_webrtc.html",
        },
        {
          from: "./src/site/non_container_demos/counter_ws.html",
          to: "non_container_demos/counter_ws.html",
        },
        {
          from: "./src/site/index.html",
          to: "index.html",
        },
        {
          from: "./src/site/reset.html",
          to: "reset.html",
        },
        // TODO: Add more entries as needed for new pages
      ],
    }),
  ],
};

export default config;
