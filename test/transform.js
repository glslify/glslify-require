const fs = require('fs');
const tap = require('tap');
const path = require('path');
const transformTools = require('browserify-transform-tools');

const transform = require('../src/transform');

tap.test('transform', function (test) {
  test.plan(1);

  test.test('should return a valid source', function (t) {
    let file = path.resolve('test/fixtures/main.glsl');

    transformTools.runTransform(transform, file, {},
      function (err, transformed) {
        if (err) {
          t.fail(err);
        }
        else {
          let wanted = fs.readFileSync(path.resolve('test/transform/wanted.js'));

          t.same(transformed, wanted.toString());
        }

        t.end();
      }
    );
  });
});