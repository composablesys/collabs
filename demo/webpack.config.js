const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    counter: "./src/site/counter.ts",
    whiteboard: "./src/site/whiteboard.ts"
    // TODO: Add more entries as needed for new pages
  },
  output: {
    path: path.resolve(__dirname, 'demoserver/public'),
    filename: "deploy/site/[name].js",
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
      { from: './src/site/index.html', to: './deploy/site/index.html' },
      { from: './src/site/counter.html', to: './deploy/site/counter.html' }
      { from: './src/site/whiteboard.html', to: './deploy/site/whiteboard.html' }
      // TODO: Add more entries as needed for new pages
    ]),
  ],
};
