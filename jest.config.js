module.exports={
  verbose:true,
  coverageThreshold:{
    global:{
      branches:50,
      functions:50,
      lines:50,
      statements:50,
    },
  },
  coveragePathIgnorePatterns:['/node_modules/'],
  testRegex:'(/__tests__/.*\\.(test|spec))\\.(tsx?|jsx?)$',
  testPathIgnorePatterns:['/y_dist/','node'],
  moduleFileExtensions:['js','jsx','ts','tsx','mjs','json','node'],
  modulePathIgnorePatterns:['/node_modules/'],
  moduleNameMapper:{
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':'<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$':'<rootDir>/__mocks__/styleMock.js',
  },
  transform:{
    '^.+\\.tsx?$':'ts-jest',
    '^.+\\.jsx?$':'babel-jest',
  },
  transformIgnorePatterns:['/node_modules/'],
  unmockedModulePathPatterns:['<rootDir>/node_modules/react/','<rootDir>/node_modules/react-dom/'],
  collectCoverage: true,
};




















    