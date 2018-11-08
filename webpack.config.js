const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const autoprefixer = require("autoprefixer");
const CleanPlugin = require("./utils/clean-plugin");
const NodeUtils = require("./src/services/common/node-service");
const appConfig = require("./config/config");
const environment = process.env.NODE_ENV;

const config = {
  mode: environment,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: NodeUtils.isProduction() ? "[name].[chunkhash:8].bundle.js" : "[name].[hash:8].bundle.js",
    chunkFilename: NodeUtils.isProduction() ? "[name].[chunkhash:8].bundle.js" : "[name].[hash:8].bundle.js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules")
    ],
    extensions: [".js", ".jsx", ".json", ".scss"]
  },
  plugins: [
    new CleanPlugin({ files: ["dist/*"] }),
    new MiniCssExtractPlugin({
      filename: NodeUtils.isProduction() ? "css/[name].[chunkhash:8].bundle.css" : "css/[name].[hash:8].bundle.css",
      chunkFilename: NodeUtils.isProduction() ? "css/[id].[chunkhash:8].bundle.css" : "css/[id].[hash:8].bundle.css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer({ browsers: ["last 2 version"] })],
        sassLoader: {
          data: "@import \"" + path.resolve(__dirname, "theme/_theme.scss") + "\";"
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      favicon: "favicon.ico",
      inject: "body"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_CONFIG: JSON.stringify(appConfig)
      }
    }),
    new Dotenv()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          chunks: "all",
          test: /node_modules/,
          priority: 20
        },
        common: {
          name: "common",
          minChunks: 2,
          minSize: 0,
          maxInitialRequests: 5,
          chunks: "initial",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    exprContextCritical: false, // Suppress "The request of a dependency is an expression"
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: !!NodeUtils.isProduction()
            }
          }, "sass-loader"
        ],
        include: path.join(__dirname, "src")
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: "url-loader?limit=10000&name=[name]-[hash].[ext]",
        include: path.join(__dirname, "src")
      }
    ]
  }
};

if (NodeUtils.isProduction()) {
  config.entry = {
    vendor: ["react", "react-dom", "redux", "lodash"],
    main: ["@babel/polyfill", "./src/App"]
  };
  config.plugins.push(new UglifyJSPlugin({
    cache: true,
    parallel: true,
    sourceMap: true
  }));
  config.plugins.push(new OptimizeCssAssetsPlugin({}));
} else {
  config.devtool = "eval";
  config.entry = ["react-hot-loader/patch", `webpack-dev-server/client?http://localhost:${process.env.PORT}`, "webpack/hot/only-dev-server", "@babel/polyfill","./src/App"];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
