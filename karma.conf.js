// Karma configuration
// Generated on Sat Sep 28 2024 21:26:42 GMT-0300 (Horário Padrão de Brasília)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.ts'  // Remova as aspas extras
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      '**/*.ts': ['typescript'] // Adicione isso para processar arquivos TypeScript
    },

    // test results reporter to use
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome'],

    // Continuous Integration mode
    singleRun: false,

    // Concurrency level
    concurrency: Infinity
  })
}
