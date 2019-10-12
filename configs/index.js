const ports={
  react:{
    dev:7070,
    pro:7071,
  },
  reactTS:{
    dev:7080,
    pro:7081,
  },
  vue:{
    dev:7090,
    pro:7091,
  },
  angular:{
    dev:8000,
    pro:8001,
  },
  microfe:{
    dev:8010,
    pro:8011,
  },
};

const appName=process.argv[2]||process.env.APP_NAME||'react';
const PORT=process.argv[3]||process.env.PORT||ports[appName]['dev'];
const PRO_PORT=process.argv[3]||process.env.PRO_PORT||ports[appName]['pro'];

module.exports={
  HOST:process.env.IP||'localhost',
  APP_NAME:appName,
  PORT:PORT,
  PRO_PORT:PRO_PORT,
  BUILD_DIR:'./build',
  PUBLIC_DIR:'../public',
  DEV_ROOT_DIR:'/',
  PRD_ROOT_DIR:'./',
  DEFAULT_TOKEN:'Basic 123456',
  PROXY_URI:'http://192.168.100.150:8010',
};