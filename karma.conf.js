module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'browserify'],
    files: [
      'app/scripts/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'app/scripts/**/*.spec.js': ['coverage', 'browserify']
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
          {'type': 'html'},
          {'type': 'html', dir: 'coverage'},
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    browserify: {
      debug: true,
      transform: [
        [
          'babelify',
          {
            presets: 'es2015'
          }
        ],
        [
          'browserify-istanbul',
          {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    }
  });
};
