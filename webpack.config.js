const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const setName = (ext) => !isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`;

const setPlugins = () => {
  const plugins = [ 
    new HtmlWebpackPlugin({
    minify: !isDev,
    template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: setName('css')
    }),
    new WebpackCopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets'),
          to: path.join(__dirname, 'dist', 'assets')
        }
      ]
    })
  ];
  return plugins;
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './scripts/main.ts',
  output: {
    filename: 'main[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: isDev ? 'source-map' : false,
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: !isDev
  },
  devServer: {
    port: 3000,
    compress: true,
    liveReload: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: 'url-loader?limit=100000' }
    ]
  },
  plugins: setPlugins()
}