const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

const options = {
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
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        use: 'file-loader?name=/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PLATFORM': JSON.stringify(process.env.PLATFORM),
    }),
    new CopyWebpackPlugin({
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
          from: 'src/icons',
          to: 'icons',
        },
        {
          from: 'src/popup.html',
          to: '',
        },
        {
          from: 'src/popup-disabled.html',
          to: '',
        },
      ],
    }),
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
};

options.mode = 'production';
options.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  })
);

module.exports = options;
