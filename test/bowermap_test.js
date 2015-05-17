'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bowermap = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  inferred_priority: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/inferred_priority');
    var expected = grunt.file.read('test/fixtures/angular/angular.min.js');
    test.equal(actual, expected, 'should infer min.js files when mapping absent');

    test.done();
  },
  explicit_mapping: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/explicit_mapping');
    var expected = grunt.file.read('test/fixtures/angular/angular.js');
    test.equal(actual, expected, 'should use whatever files are specified by mapping');

    test.done();
  },
  concat_files: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/concat_files');
    var expected = grunt.file.read('test/expected/angular_jquery_concat');
    test.equal(actual, expected, 'should concatenate two files');

    test.done();
  },
  full_copy: function(test) {
    test.expect(2);

    test.equal(grunt.file.exists('tmp/full_copy/awesome.css'), true, 'should copy first file');
    test.equal(grunt.file.exists('tmp/full_copy/test.font'), true, 'should copy second file');

    test.done();
  },
  filtered_copy: function(test) {
    test.expect(2);

    test.equal(grunt.file.exists('tmp/filtered_copy/awesome.css'), true, 'should copy css file');
    test.equal(grunt.file.exists('tmp/filtered_copy/test.font'), false, 'should not copy font file');

    test.done();
  },
};
