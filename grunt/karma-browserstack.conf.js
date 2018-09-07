'use strict';

var ip = require('ip');
var browserConfig = require('./browsers');

module.exports = function (config) {
  config.set({
    hostname: ip.address(),
    browserStack: {
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
      build: 'bootstrap-v3-' + new Date().toISOString(),
      project: 'Bootstrap v3',
      retryLimit: 1
    },
    basePath: '../',
    frameworks: ['qunit'],
    plugins: [
      'karma-qunit',
      'karma-browserstack-launcher'
    ],
    // list of files / patterns to load in the browser
    files: [
      'js/tests/vendor/jquery.min.js',
      'js/tests/unit/config.js',
      'js/tooltip.js',
      'js/!(tooltip).js',
      'js/tests/unit/!(phantom|config).js'
    ],
    customLaunchers: browserConfig.list,
    browsers: browserConfig.keys,
    reporters: ['dots', 'BrowserStack'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR || config.LOG_WARN,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    client: {
      qunit: {
        showUI: true
      }
    }
  });
};
