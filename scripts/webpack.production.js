const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'production';

const configs=require('../configs');
const rootDir=configs.PRD_ROOT_DIR;

module.exports = merge(webpackConfig, {
  mode:'production',
  devtool:'cheap-module-source-map',
  cache:false,
  output:{
    publicPath:rootDir,
  },
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        // cache:true,
        // sourceMap:true,
        parallel:true,
        uglifyOptions:{
          // warnings:false,
          parse:{},
          compress:{
            // warnings:false,
            drop_console:true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module:{
    rules:[{
      test:/\.css$/,
      use:[
        {
          loader:MiniCssExtractPlugin.loader,
          options:{
            // publicPath: '../',
          },
        },
        {
          loader:'css-loader',
          options:{
            // minimize:true,
            // modules:true,
            // sourceMap:true,
            // importLoader:2,
          },
        },
      ],
      // exclude: /components/,
    },{
      test:/\.less$/,
      use:[
        {
          loader:MiniCssExtractPlugin.loader,
          options:{
            // publicPath: '../',
          },
        },
        {
          loader:'css-loader',
          options:{
            // minimize:true,
            // modules:true,
            // sourceMap:true,
            // importLoader:2,
          },
        },
        {
          loader:'less-loader',
          options: {
            javascriptEnabled:true,
          },
        },
      ],
      // exclude: /components/,
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
      // filename:'css/[name]_[contenthash:8].css',
      // chunkFilename:'css/[id]_[name]_[contenthash:8].css',
      // publicPath:'../',
    }),
  ],
});
