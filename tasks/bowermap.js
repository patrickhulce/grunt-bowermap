/*
 * grunt-bowermap
 * https://github.com/patrickhulce/grunt-bowermap
 *
 * Copyright (c) 2015 Patrick Hulce
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('bowermap', 'Handles extracting relevant files from bower_components directory.', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode: 'concat', // [concat, copy]
      filter: '.*',
      bowermap: '.bowermap',
      bowerDir: 'bower_components/'
    });

    var pathTo = function (file, pkg) {
      return options.bowerDir + pkg + '/' + file;
    };

    var inferMapping = function (packageName) {
      var base = options.bowerDir + packageName + '/';
      var endings = ['.js', '.css'];
      var locations = ['%s.min', 'dist/%s.min', '%s', 'dist/%s'];
      var files = [];
      endings.forEach(function (ending) {
        for (var i = 0; i < locations.length; i++) {
          var fileName = locations[i].replace('%s', packageName) + ending;
          if (grunt.file.exists(base + fileName)) {
            files.push(fileName);
            return;
          }
        }
      });
      return files;
    };

    var dest = this.data.dest;
    var packages = this.data.packages;
    var mappings = grunt.file.readYAML(options.bowermap);

    var filesToUse = [];

    packages.forEach(function (name) {
      var mapping = mappings[name];
      if (!mapping) {
        mapping = inferMapping(name);
        grunt.log.warn('No mapping found for ' + name + ', inferring: [' + mapping.join(', ') + ']');
      }
      mapping = mapping.map(function (path) {
        return [name, path];
      });
      Array.prototype.push.apply(filesToUse, mapping);
    });

    var existingFiles = filesToUse.filter(function (file) {
      var pkg = file[0];
      var relativePath = file[1];
      var filepath = pathTo(relativePath, pkg);
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('File "' + filepath + '" does not exist');
        return false;
      } else if (!relativePath.match(options.filter)) {
        grunt.log.debug('Removing file "' + filepath + '" for not matching filter');
        return false;
      } else {
        return true;
      }
    });

    grunt.log.oklns('Found ' + existingFiles.length + ' files.');

    var fileContents = existingFiles.map(function (file) {
      return [file[1], grunt.file.read(pathTo(file[1], file[0]))];
    });

    if (options.mode === 'concat') {
      var concatedContents = fileContents.map(function (x) {
        return x[1];
      }).join('\n\n');
      grunt.file.write(dest, concatedContents);
    } else if (options.mode === 'copy') {
      dest = dest.substr(dest.length - 1) === '/' ? dest : dest + '/';
      fileContents.forEach(function (fileToWrite) {
        grunt.file.write(dest + fileToWrite[0], fileToWrite[1]);
      });
    }
  });

};
