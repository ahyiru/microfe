const devPorts={
  react:7070,
  reactTS:7080,
  vue:7090,
  angular:8000,
  microfe:8010,
};
const proPorts={
  react:7071,
  reactTS:7081,
  vue:7091,
  angular:8001,
  microfe:8011,
};
const appName=process.env.APP_NAME||'react';

module.exports={
  HOST:process.env.IP||'localhost',
  PORT:process.env.PORT||devPorts[appName],
  PRO_PORT:process.env.PORT||proPorts[appName],
  BUILD_DIR:'./build',
  PUBLIC_DIR:'../public',
  APP_NAME:appName,
  DEV_ROOT_DIR:'/',
  PRD_ROOT_DIR:'./',
  DEFAULT_TOKEN:'Basic 123456',
  PROXY_URI:'http://192.168.100.150:8010',
};