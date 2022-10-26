const config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    /*  '^src/(.*)$': '<rootDir>/../src/$1' */ //эта строка вызывает ошибку src не ссылаеться на <rootDir>/src
    '\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/tests/__mocks__/styleMock.js'
  },
  modulePaths: ['<rootDir>']
};

module.exports = config;
