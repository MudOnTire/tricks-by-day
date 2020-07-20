const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// environment variables
const { TARGET } = process.env;
const production = TARGET === "production";

// entries
const entry = { main: path.resolve(__dirname, "../src/index.js") };
// pages
const pages = fs
  .readdirSync(path.resolve(__dirname, "../src/pages"))
  .filter((p) => p !== ".DS_Store");
for (const page of pages) {
  entry[page] = path.resolve(__dirname, `../src/pages/${page}/index.js`);
}

console.log("entry===", entry);

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: production ? "js/[name].[contentHash:8].js" : "js/[name].js",
    publicPath: "/",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader-srcset",
            options: {
              minimize: false,
              interpolate: true,
              attrs: [":src", ":srcset", ":data-src", ":data-srcset"],
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "../src/common/libs"),
        ],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|woff|woff2|eot|ttf|otf|webm)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false,
              name: "assets/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          production ? MiniCSSExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              prependData: `
                @import "~Src/common/styles/_vars.scss";
                @import "~Src/common/styles/_funcs.scss";
                @import "~Src/common/styles/_mixins.scss";
                @import "~Src/common/styles/_shares.scss";
              `,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.DefinePlugin({
      ENV_STRING: JSON.stringify("this is a env string"),
      ENV_OBJECT: JSON.stringify({ name: "mudontire" }),
      ENV_BOOLEAN: true,
      ENV_BOOLEAN_STR: JSON.stringify(true),
      "typeof window": JSON.stringify("object"),
    }),
    // html webpack plugin
    ...pages.map((page) => {
      const chunks = ["main", page];
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `../src/pages/${page}/index.html`),
        filename: `${page}.html`,
        chunks,
      });
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
  externals: {
    jquery: "jQuery",
  },
};
