'use strict';

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['browserify', 'mocha', 'chai-sinon'],
    autoWatch: true,
    browsers: ['PhantomJS'],

    plugins: [
      'karma-mocha',
      'karma-chai-sinon',
      'karma-browserify',
      'karma-phantomjs-launcher'
    ],

    port: 7357,
    reporters: ['dots'],
    preprocessors: {
      'test/**/*.js': ['browserify']
    },
    browserify: {
      extensions: ['.js', '.json'],
      ignore: [],
      watch: true,
      debug: true,
      noParse: []
    },
    files: [
      'test/**/*.js'
    ],
    exclude: ['**/*.swp']
  });
};
