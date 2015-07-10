'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
      useminPrepare: 'grunt-usemin'
  });

  // Configurable paths
  var config = {
    js: 'public/js',
    css: 'public/css',
    coffee: 'public/coffee',
    dist: 'public/dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['**/*.js', '!node_modules/**/*.js'],
        tasks: ['jshint']
      },
      coffee: {
        files: ['<%= config.coffee %>/*.coffee'],
        tasks: ['coffeelint', 'coffee']
      }
    },

    jshint: {
      src:'**/*.js',
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          '<%= config.js %>/main.js',
          'node_modules/**/*.js'
        ]
      }
    },

    coffeelint: {
      options: {
        configFile: 'coffeelint.json'
      },
      all: ['<%= config.coffee %>/*.coffee']
    },

    coffee: {
      all: {
        files:{
          '<%= config.js %>/main.js':'<%= config.coffee %>/*.coffee'
        }
      }
    },

    mochaTest: {
      all: {
        src: ['test/*.js']
      }
    },

    nodemon: {
      local: {
        script: 'app.js'
      }
    }
  });

  grunt.registerTask('local', function() {
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run(['watch']);
  });

  grunt.registerTask('build', [
    'jshint',
    'mochaTest',
    'coffeelint',
    'coffee'
  ]);

  grunt.registerTask('default', 'build');
};
