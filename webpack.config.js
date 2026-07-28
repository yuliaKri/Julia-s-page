const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'build'),
    port: 4201,
    host: 'localhost',
    historyApiFallback: true,
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[id].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
            },
          },
          {
            loader: 'source-map-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webm)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new Dotenv({ systemvars: true, silent: true }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
