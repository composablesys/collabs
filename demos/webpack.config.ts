import * as path from "path";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const config: webpack.Configuration = {
  mode: "development",
  devtool: false,
  optimization: {
    usedExports: true,
    innerGraph: true,
    sideEffects: true,
  },
  entry: {
    "containers/aspace": "./src/site/containers/aspace.ts",
    "containers/counter": "./src/site/containers/counter.ts",
    "containers/minesweeper": "./src/site/containers/minesweeper.ts",
    "containers/plaintext": "./src/site/containers/plaintext.ts",
    "containers/text": "./src/site/containers/text.ts",
    "containers/whiteboard": "./src/site/containers/whiteboard.ts",
    "hosts/plain": "./src/site/hosts/plain.ts",
    "hosts/selector": "./src/site/hosts/selector.ts",
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
    publicPath: "/",
    filename: "[name].js",
    clean: true,
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // Copy index.html, reset.html.
        {
          from: "./src/site/*.html",
          to: "./[base]",
        },
        // Copy hosts html files.
        {
          from: "./src/site/hosts/*.html",
          to: "./hosts/[base]",
        },
        // Copy non_container_demos html files.
        {
          from: "./src/site/non_container_demos/*.html",
          to: "./non_container_demos/[base]",
        },
      ],
    }),
    // Works with HtmlWebpackPlugin to inlines chunks
    // with "container" in the name.
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/containers\/.*/]) as any,
    // At the end of the build, pop up a browser window showing
    // the causes of bundle size.
    // Disable this before pushing to github as it may freeze
    // the CI.
    // new BundleAnalyzerPlugin(),
    // Delete js files that have been inlined by InlineChunkHtmlPlugin.
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["containers/*.js"],
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      verbose: true,
    }) as any,
  ],
};
// Add one HtmlWebpackPlugin entry per container entrypoint.
// (If we do this the naive way, it puts every .js file
// into every generated .html file.
// Per this issue, there doesn't seem to be an easier way:
// https://github.com/jantimon/html-webpack-plugin/issues/218
// Anyway, this lets us customize the template per-container.)
for (const entry of Object.keys(config.entry!)) {
  if (entry.startsWith("containers/")) {
    config.plugins!.push(
      // Use each container's companion HTML file as the template.
      // That way the result does basically what you'd except
      // from the source files, except that in the source
      // HTML files, it is important not to import the script
      // (HtmlWebpackPlugin does that for us).
      new HtmlWebpackPlugin({
        title: "Compoventuals Demo",
        filename: entry + ".html",
        chunks: [entry],
        inject: "body",
        template: `./src/site/${entry}.html`,
      })
    );
  }
}

export default config;
