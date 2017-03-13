const fs = require('fs');
const tap = require('tap');
const path = require('path');
const glslify = require('glslify');
const through = require('through2');

tap.test('transform', function (test) {
  test.plan(1);

  let Glslyfier = require('../src/lib/glslyfier')(glslify);
  let glslyfier = new Glslyfier();

  let transform = glslyfier.transform.bind(glslyfier);

  test.test('should return a valid source', function (t) {
    let file = path.resolve('test/fixtures/main.glsl');
    let data = null;

    fs.createReadStream(file)
      .pipe(transform(file))
      .pipe(through(function(chunk, enc, cb) {
        data = chunk.toString();

        cb();
      }))
      .on('finish', function () {
        fs.readFile(path.resolve('test/transform/wanted.js'), function(err, readData) {
          t.same(data, readData.toString());

          t.end();
        });
      })
      .on('error', function (err) {
          t.fail(err);

          t.end();
        }
      );
  });
});