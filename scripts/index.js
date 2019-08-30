const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.development');
const colors=require('colors');

// const path=require('path');
// const fs=require('fs');

const app = express();

const compiler = webpack(webpackConfig);

const configs=require('../configs');

const appName=configs.APP_NAME;

const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware');

const proxy=require('http-proxy-middleware');

const options={
  // target:`http://127.0.0.1:${configs.PORT}`,
  target:`http://127.0.0.1:7070`,
  changeOrigin:true,
  /*pathRewrite:{
    '^/test-api/':'',
  },*/
};
// app.use('/test-api',proxy(options));
// app.use(proxy('/test-api',options));


const devMiddleware=webpackDevMiddleware(compiler,{
  contentBase:webpackConfig.output.path,
  publicPath:webpackConfig.output.publicPath,
  hot:true,
  inline:true,
  historyApiFallback:true,
  compress:true, 
  noInfo:true,
  stats:{
    colors:true,
  },
});

app.use(webpackHotMiddleware(compiler));
app.use(devMiddleware);

app.set('host', configs.HOST);
app.set('port', configs.PORT);

const cors=require('cors');
const logger=require('morgan');
const bodyParser=require('body-parser');
const compression=require('compression');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({limit:'20mb',extended:true}));

app.use(compression());

if(app.get('env')==='production'){
  app.use(function(req,res,next) {
    const protocol=req.get('x-forwarded-proto');
    protocol==='https'?next():res.redirect('https://'+req.hostname+req.url);
  });
}

app.get('*',(req,res)=>{
  const htmlBuffer=devMiddleware.fileSystem.readFileSync(`${webpackConfig.output.path}/index.html`);
  res.send(htmlBuffer.toString());
});

// 设置跨域访问，方便开发
/*app.all('*',function(req,res,next){
  const origin=req.headers.origin||'*';
  res.header('Access-Control-Allow-Origin',origin);
  res.header('Access-Control-Allow-Credentials','true');
  res.header('Access-Control-Allow-Headers','X-Requested-With,Authorization,Accept,Origin,Content-Type');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By','3.2.1');
  res.header('Content-Type','application/json;charset=utf-8');
  if(req.method==='OPTIONS'){
    res.status(200).end();
  }else{
    next();
  }
});*/

const server=app.listen(app.get('port'),(err)=>{
  if (err) {
    console.log(err);
    return false;
  }
  console.log('\n'+appName.magenta+': 服务已启动! '.black+'✓'.green);
  console.log(`\n监听端口: ${app.get('port')} ,正在构建,请稍后...`.cyan);
  console.log('-----------------------------------'.grey);
  console.log(` 本地地址: http://${app.get('host')}:${app.get('port')}`.magenta);
  console.log('-----------------------------------'.grey);
  console.log('\n按下 CTRL-C 停止服务\n'.blue);
});

















