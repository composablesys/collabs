import { merge } from "webpack-merge";
import * as path from "path";
import common from "./webpack-common.config";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default merge(common, {
  output: {
    path: path.resolve(__dirname, "dist/standalone"),
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg)/,
        // Use "asset/inline" to inline the images.
        type: "asset/inline",
      },
    ],
  },
});
