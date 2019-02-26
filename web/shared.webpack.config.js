// @flow
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const webpack = require("webpack");
const __DEV__ = process.env.NODE_ENV === "development";

// const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  productionPlugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        // drop_console: !__DEV__,
        drop_console: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
      exclude: [/\.min\.js$/gi], // skip pre-minified libs
    }),
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'zopfli',
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],

  loaders: [
    // {
    //   test: /postMock.html$/,
    //   use: {
    //     loader: 'file-loader',
    //     options: {
    //       name: '[name].[ext]',
    //     },
    //   },
    // },
    {
      test: /\.ttf$/,
      loader: "url-loader",
      include: path.resolve(
        __dirname,
        "../node_modules/react-native-vector-icons",
      ),
    },
    {
      test: /\.json$/,
      loader: "json-loader",
    },
    // {
    //   test: /\.js?$/,
    //   loader: "ts-loader",
    //   include: [
    //     path.resolve(
    //       __dirname,
    //       "../node_modules/react-navigation-fluid-transitions",
    //     ),
    //     // path.resolve(__dirname, "../node_modules/react-native-tab-view"),
    //     // path.resolve(__dirname, "../node_modules/react-native-gesture-handler"),
    //   ],
    // },
    {
      // Many react-native libraries do not compile their ES6 JS.
      test: /\.js$/,
      loader: "babel-loader",
      query: {
        presets: [
          "@babel/preset-react",
          "@babel/typescript",
          ["@babel/preset-env", { modules: false, targets: { node: "6" } }],
          "@babel/flow",
        ],
        plugins: [
          "@babel/plugin-proposal-optional-chaining",
          ["@babel/plugin-transform-regenerator", {}],
          "flow-react-proptypes",
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          "@babel/plugin-proposal-export-default-from",
        ],
      },
    },
    {
      test: /\.(gif|jpe?g|png|svg)$/,
      loader: "url-loader",
      query: { name: "images/[name]-[hash:16].[ext]" },
    },
    {
      test: /\.(mp3|wav)$/,
      loader: "file-loader",
      query: { name: "sounds/[name]-[hash:16].[ext]" },
    },
  ],
};
