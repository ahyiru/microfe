const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
module.exports=merge(webpackConfig,{
  mode:'development',
  // devtool: 'eval',
  devtool:'cheap-module-eval-source-map',
  // devtool:'cheap-module-source-map',
  cache:true,
  target:'web',
  /*devServer:{
    proxy:{
      '/test-api':{
        target:'http://127.0.0.1:9527',
        changeOrigin:true,
        // secure:false,
        // pathRewrite:{
        //   '^/test-api':'/test-api',
        // },
      }
    },
  },*/
  entry:{
    app:['webpack-hot-middleware/client'],
  },
  module:{
    rules:[{
      test:/\.css$/,
      use:[
        'style-loader',
        {
          loader: 'css-loader',
          // options:{
          //   modules:true,
          //   localIdentName:'[hash:base64:8]',
          // },
        },
      ],
      // exclude:[/node_modules/],
    },{
      test:/\.less$/,
      use: [
        'style-loader',
        {
          loader:'css-loader',
          // options:{
          //   modules:true,
          //   localIdentName:'[hash:base64:6]',
          // },
        },
        {
          loader:'less-loader',
          options:{
            javascriptEnabled:true,
          },
        },
      ],
      // exclude:[/node_modules/],
    }],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
});
