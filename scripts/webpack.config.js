const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const WorkboxPlugin = require('workbox-webpack-plugin');

const appTitle=require('../package').name;

const configs=require('../configs');

const appName=configs.APP_NAME;

const publics=path.resolve(__dirname,configs.PUBLIC_DIR);
const app=path.resolve(__dirname,`../app/${appName}`);

const appConf={
  react:{
    entry:{
      app:[path.resolve(app,'index.jsx')],
      // vendors:['react','react-dom'],
    },
    templ:path.resolve(publics,'reactTempl.html'),
  },
  reactTS:{
    entry:{
      app:[path.resolve(app,'index.jsx')],
      // vendors:['react','react-dom'],
    },
    templ:path.resolve(publics,'tsTempl.html'),
  },
  vue:{
    entry:{
      app:[path.resolve(app,'index.js')],
      // vendors:['vue'/*,'vue-router'*/],
    },
    templ:path.resolve(publics,'vueTempl.html'),
  },
  angular:{
    entry:{
      // polyfills: path.resolve(app,'polyfills.ts'),
      app:[path.resolve(app,'index.ts')],
      // vendors: path.resolve(app,'vendors.ts'),
    },
    templ:path.resolve(publics,'ngTempl.html'),
  },
  microfe:{
    entry:{
      app:[path.resolve(app,'index.tsx')],
      // vendors:['react','react-dom'],
    },
    templ:path.resolve(publics,'microTempl.html'),
  },
};

const entry=appConf[appName].entry;
const templ=appConf[appName].templ;

const htmlPlugin=()=>new HtmlWebpackPlugin({
  title:appName,
  template:templ,
  favicon:path.resolve(publics,'favicon.ico'),
  inject:true,
  minify:{
    html5:true,
    collapseWhitespace:true,
    // conservativeCollapse:true,
    removeScriptTypeAttributes:true,
    removeStyleLinkTypeAttributes:true,
    removeComments:true,
    removeTagWhitespace:true,
    removeEmptyAttributes:true,
    removeRedundantAttributes:true,
    useShortDoctype:true,
    keepClosingSlash:true,
    minifyJS:true,
    minifyCSS:true,
    minifyURLs:true,
  },
});

const plugins=[
  htmlPlugin(),
  new webpack.DefinePlugin({
    EMAIL:JSON.stringify('ah.yiru@gmail.com'),
    VERSION:JSON.stringify('0.0.x'),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  /*new WorkboxPlugin.GenerateSW({
    // include: [/\.html$/, /\.js$/, /\.css$/],
    // exclude: '/node_modules'
    // swDest: 'service-worker.js',
    // importWorkboxFrom: 'local',
    cacheId: 'demo-pwa',
    clientsClaim: true,
    skipWaiting: true,
  }),*/
];

const rules=[
  {
    test:/\.(js|jsx|mjs)$/,
    loader:'babel-loader',
    exclude:[/node_modules/,path.resolve(__dirname,'node')],
  }, {
    test:/\.tsx?$/,
    use:[
      {loader:'babel-loader'},
      {loader:'ts-loader'},
    ],
    exclude:[/node_modules/],
  },{
    test: /\.html$/,
    use: {
      loader: 'html-loader',
      options: {
        minimize:true,
      },
    },
    include:[app],
  },{
    test:/\.(jpe?g|png|gif|psd|bmp|ico|webp|svg)/i,
    loader:'url-loader',
    options:{
      limit:8192,
      name:'img/img_[hash:8].[ext]',
      // publicPath:'../',
    },
    exclude:[/node_modules/],
  },{
    test:/\.(ttf|eot|svg|woff|woff2|otf)/,
    loader:'url-loader',
    options:{
      limit:8192,
      name:'fonts/[hash:8].[ext]',
      publicPath:'../',
    },
    exclude:[/images/],
  },{
    test:/\.(pdf)/,
    loader:'url-loader',
    options:{
      limit:8192,
      name:'pdf/[hash].[ext]',
    },
  },{
    test:/\.(swf|xap|mp4|webm)/,
    loader:'url-loader',
    options:{
      limit:8192,
      name:'video/[hash].[ext]',
    },
  },
];

/*
const styleRules=[
  {
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
  },
  {
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
  },
];
const stylePlugin=new MiniCssExtractPlugin({
  filename:'css/[name]_[contenthash:8].css',
  chunkFilename:'css/[id]_[name]_[contenthash:8].css',
  // publicPath:'../',
});
rules.push(...styleRules);
plugins.push(stylePlugin);
*/

if(appName==='vue'){
  plugins.push(new VueLoaderPlugin());
  rules.push({
    test: /\.vue$/,
    loader:'vue-loader',
    exclude:/node_modules/,
  });
}
if(appName==='angular'){
  plugins.push(new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/,app,{}));
}

module.exports={
  context:app,
  entry:entry,
  output:{
    path:path.resolve(app,configs.BUILD_DIR),
    publicPath:configs.DEV_ROOT_DIR,
    filename:'js/[name].js',//'js/[name]_[hash:8].js'
    // chunkFilename:'js/[name].js',//js/[name]_[chunkhash:8].chunk.js
    library:`${appName}App`,
    // libraryTarget:'umd',// 'window'
  },
  optimization:{
    minimize:true,
    concatenateModules:true,
    occurrenceOrder:true,
    splitChunks:{
      chunks:'all',// initial
      minSize:0,
      minChunks:2,
      maxInitialRequests:5,
      cacheGroups:{
        commons:{//提取公共组件
          chunks:'all',
          name:'commons',
          reuseExistingChunk:true,
        },
        /*vendors:{//提取第三方插件
          chunks:'all',
          name:'vendors',
          test:/[\\/]node_modules[\\/]/,
          enforce:true,
          priority:10,
        },*/
        /*login:{
          chunks:'initial',
          name:'login',
          test:/[\\/]login[\\/]/,
          reuseExistingChunk:false,
        },*/
        // styles:{//
        //   name:'styles',
        //   test:/\.(less|css)$/,
        //   chunks:'all',
        //   minChunks:1,
        //   enforce:true,
        // },
      },
    },
    // runtimeChunk:true,
    // runtimeChunk:{
    //   name:'manifest',
    // },
    moduleIds:'hashed',
    chunkIds:'named',
  },
  resolve:{
    modules:[
      app,
      path.resolve(__dirname, '../node_modules'),
      path.resolve(app,'node_modules'),
      // 'node_modules',
    ],
    alias:{
      '@common':path.resolve(__dirname, '../common'),
      '@router':path.resolve(__dirname, '../../../yiru/demo/router/router'),
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions:['.js','.mjs','.jsx','.ts','.tsx','.json','.css','.less','.vue','.vuex'],
  },
  /*externals:{
    react:'react',
    'react-dom':'react-dom',
  },*/
  module:{
    rules:rules,
  },

  plugins:plugins,
};
