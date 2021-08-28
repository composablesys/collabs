import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

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
        // Copy all HTML files to the build dir.
        {
          from: "./src/site/",
          to: "./",
          filter: (resourcePath: string) => resourcePath.endsWith(".html"),
        },
      ],
    }),
  ],
};

export default config;
