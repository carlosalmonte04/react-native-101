/* eslint-disable */
const enableOfflinePlugin = false;
const _react2 = require("react");

const __DEV__ = process.env.NODE_ENV === "development";
const __OFFLINE__ = enableOfflinePlugin && !__DEV__;
const Dotenv = require("dotenv-webpack");

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const config = require("./shared.webpack.config.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const OfflinePlugin = require("offline-plugin");

const vendorConfig = require("./vendor.webpack.config.js");
const outputPath = path.join(__dirname, "/build/");

const addAssetHtmlFiles = Object.keys(vendorConfig.entry).map(name => {
  const fileGlob = `${name}*.dll.js`;
  const paths = glob.sync(path.join(vendorConfig.output.path, fileGlob));
  if (paths.length === 0) throw new Error(`Could not find ${fileGlob}!`);
  if (paths.length > 1)
    throw new Error(
      `Too many files for ${fileGlob}! You should clean and rebuild.`,
    );
  return {
    filepath: require.resolve(paths[0]),
    includeSourcemap: false,
    outputPath: "javascript/vendor",
    publicPath: "/javascript/vendor",
  };
});

const plugins = [
  new Dotenv({
    // path: './some.other.env', // load this now instead of the ones in '.env'
    safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    silent: true, // hide any errors
    defaults: false, // load '.env.defaults' as the default values if empty.
  }),

  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    __DEV__,
    __OFFLINE__,
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "web/templates/index.ejs",
  }),
  new AddAssetHtmlPlugin(addAssetHtmlFiles),

  new CopyWebpackPlugin([
    // Workaround for AddAssetHtmlPlugin not copying compressed .gz files
    { context: "web/vendor/", from: "*.js.gz", to: "javascript/vendor/" },
  ]),

  ...(__DEV__
    ? []
    : [
        ...config.productionPlugins,

        // Add any app-specific production plugins here.
      ]),
];

// If offline plugin is enabled, it has to come last.
if (__OFFLINE__) plugins.push(new OfflinePlugin());

module.exports = {
  devServer: {
    contentBase: outputPath,
    after: function(app, server) {
      app.get("/connect", function(req, res) {
        const { path, query } = req;

        console.log("Wild card called!");

        // var _app = require(`${outputPath}javascript/app-f631b0d865eb5d4e.js`);

        // var _handleServerRequest = (0, _web.handleServerRequest)({}, path, query),
        //   navigation = _handleServerRequest.navigation,
        //   title = _handleServerRequest.title,
        //   options = _handleServerRequest.options;

        // console.log('hello', navigation)

        // var markup = (0, _server.renderToString)(_react2.default.createElement(_app.AppContainer, { navigation: navigation }));

        res.sendFile(`${outputPath}index.html`);
      });
    },
  },
  entry: {
    app: path.join(__dirname, "../index.js"),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        // react-native-web is already compiled.
        exclude: [/node_modules/, /node_modules\/react-native-web\//],
        include: [
          /node_modules\/react-native-/,
          path.resolve(__dirname, "node_modules/create-react-context"),
          path.resolve(__dirname, "node_modules/react-native-animatable"),
          path.resolve(__dirname, "node_modules/react-native-gesture-handler"),
          path.resolve(__dirname, "node_modules/react-native-uncompiled"),
          path.resolve(__dirname, "node_modules/react-native-vector-icons"),
          path.resolve(__dirname, "node_modules/react-navigation-drawer"),
          path.resolve(__dirname, "node_modules/react-navigation-stack"),
          path.resolve(__dirname, "node_modules/react-navigation-tabs"),
          path.resolve(__dirname, "node_modules/react-native-drawer-layout"),
          path.resolve(__dirname, "node_modules/react-native-dismiss-keyboard"),
          path.resolve(__dirname, "node_modules/react-native-safe-area-view"),
          path.resolve(__dirname, "node_modules/react-native-tab-view"),
          path.resolve(__dirname, "node_modules/react-native-svg"),
          path.resolve(__dirname, "node_modules/rn-content-loader"),
          path.resolve(__dirname, "node_modules/react-native-snap-carousel"),
          path.resolve(
            __dirname,
            "node_modules/react-navigation-fluid-transitions",
          ),
          // path.resolve(__dirname, "node_modules/@react-navigation"),
          path.resolve(__dirname, "node_modules/react-native-vector-icons"),
        ],
        // TODO: Set up react-hot-loader during development.
        // loaders: ["babel-loader?cacheDirectory=true"],
      },
      ...config.loaders,
    ],
  },
  output: {
    path: outputPath,
    filename: "javascript/[name].js",
    publicPath: "/",
  },
  plugins: plugins,
  node: {
    fs: "empty",
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react-native-svg": "svgs",
      "react-native-linear-gradient": "react-native-web-linear-gradient",
      "glamorous-native": "react-native",
      "lottie-react-native": "lottie-web",
      "react-native-firebase": "firebase",
      // WebView: 'react-native-web-webview',
      "@components": path.join(__dirname, "../src/components"),
      "@common": path.join(__dirname, "../src/components/common"),
      "@assets": path.join(__dirname, "../src/assets"),
      "@constants": path.join(__dirname, "../src/constants"),
      "@navigation": path.join(__dirname, "../src/navigation"),
      "@config": path.join(__dirname, "../src/config"),
      "@modules": path.join(__dirname, "../src/modules"),
      "@services": path.join(__dirname, "../src/services"),
      "@mocks": path.join(__dirname, "../src/mockData"),
      "@contexts": path.join(__dirname, "../src/components/Context"),
      "@store": path.join(__dirname, "../src/store"),
      "@redux": path.join(__dirname, "../src/redux"),
      "@mocks": path.join(__dirname, "../src/mocks"),
      "@img": path.join(__dirname, "../src/img"),
      "react-native/Libraries/StyleSheet/processColor": path.join(
        __dirname,
        "../node_modules/react-native/Libraries/StyleSheet/processColor",
      ),
    },
    extensions: [".web.js", ".js", ".json"],
  },
};
