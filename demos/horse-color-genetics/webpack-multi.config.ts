import { merge } from "webpack-merge";
import * as path from "path";
import common from "./webpack-common.config";
import CopyWebpackPlugin from "copy-webpack-plugin";

export default merge(common, {
  output: {
    path: path.resolve(__dirname, "dist/multi"),
    // This option is for development mode; in production
    // mode, it is overwritten in the package.json script
    // to point to the image's destination on our Heroku server.
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg)/,
        // Use "asset/resource" to NOT inline the images.
        type: "asset/resource",
      },
    ],
  },
});
