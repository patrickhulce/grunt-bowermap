/*
 * grunt-bowermap
 * https://github.com/patrickhulce/grunt-bowermap
 *
 * Copyright (c) 2015 Patrick Hulce
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bowermap: {
      inferred_priority: {
        options: {
          bowerDir: 'test/fixtures/'
        },
        packages: ['angular'],
        dest: 'tmp/inferred_priority'
      },
      explicit_mapping: {
        options: {
          bowermap: "test/fixtures/full_mapping",
          bowerDir: 'test/fixtures/'
        },
        packages: ['angular'],
        dest: 'tmp/explicit_mapping'
      },
      concat_files: {
        options: {
          bowerDir: 'test/fixtures/'
        },
        packages: ['angular', 'jquery'],
        dest: 'tmp/concat_files'
      },
      full_copy: {
        options: {
          mode: 'copy',
          bowermap: "test/fixtures/full_mapping",
          bowerDir: 'test/fixtures/'
        },
        packages: ['font-awesome'],
        dest: 'tmp/full_copy/'
      },
      filtered_copy: {
        options: {
          filter: ".css$",
          mode: 'copy',
          bowermap: "test/fixtures/full_mapping",
          bowerDir: 'test/fixtures/'
        },
        packages: ['font-awesome'],
        dest: 'tmp/filtered_copy/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'bowermap', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
