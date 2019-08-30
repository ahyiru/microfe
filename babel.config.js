const config=require('./configs');

const appName=config.APP_NAME;

module.exports=(api)=>{
  // api.cache(true);
  api.cache.using(() => process.env.NODE_ENV === 'development');
  const presets=[
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        loose: true,
        useBuiltIns: 'usage',//'entry',
        shippedProposals:true,
        corejs: {
          version: 3,
          proposals: true,
        },
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
    [
      '@babel/preset-react',
      /*{
        pragma:'dom',
        pragmaFrag:'DomFrag',
        throwIfNamespace:false,
      }*/
    ],
  ];

  if(appName==='vue'){
    presets.push(['@vue/babel-preset-jsx',{
      functional:true,
      injectH:true,
      vModel:true,
      vOn:true,
    }]);
  }

  const plugins=[
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//'css',
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-pipeline-operator',{'proposal':'minimal'}],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
  ];

  const env={
    development: {
      presets: [
        '@babel/preset-env',
      ],
      plugins: [
        // 'react-hot-loader/babel',
      ],
    },
    production: {
      plugins: [],
    },
    test: {
      plugins: [
        // '@babel/plugin-transform-modules-commonjs',
      ],
    },
  };

  return {
    presets,
    plugins,
    // env,
  };
};
