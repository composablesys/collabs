const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/client/main.ts",
  },
  output: {
    path: path.resolve(__dirname, 'demoserver/public'),
    filename: "main.js",
    library: 'compoventuals-demo',
    libraryTarget: 'window', // this needs to be changed
    libraryExport: 'default'
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
    new CopyWebpackPlugin([
      {
        from: './src',
      }
    ]),
  ],
};
