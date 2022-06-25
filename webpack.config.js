const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const options = {
  mode: 'production',
  entry: {
    background: path.join(__dirname, 'src', 'scripts', 'background.ts'),
    popup: path.join(__dirname, 'src', 'scripts', 'popup.ts'),
    content: path.join(__dirname, 'src', 'scripts', 'content.ts'),
  },
  output: {
    path: path.join(__dirname, 'build', process.env.PLATFORM),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `src/platforms/manifest.${process.env.PLATFORM}.json`,
          to: 'manifest.json',
          transform: (content) =>
            Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            ),
        },
        {
          from: path.join(__dirname, 'src', 'icons/*.png'),
          to: 'icons/[name][ext]',
        },
        {
          from: path.join(__dirname, 'src', '*.html'),
          to: '[name].html',
        },
        {
          from: path.join(__dirname, 'node_modules', 'file-icons-js', 'fonts'),
          to: 'fonts/[name][ext]',
        },
        {
          from: path.join(__dirname, 'src', 'assets'),
          to: 'assets',
        },
      ],
    }),
    new HtmlMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          parallel: true,
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        parallel: true,
        extractComments: 'all',
        minify: TerserPlugin.uglifyJsMinify,
      }),
    ],
    minimize: true,
  },
};

module.exports = options;
