import { merge } from "webpack-merge";
import * as path from "path";
import common from "./webpack-common.config";

export default merge(common, {
  output: {
    path: path.resolve(__dirname, "dist/multi"),
    // TODO: set this to final image file destination folder.
    // "" works for testing (perhaps set it that way in dev mode?)
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
