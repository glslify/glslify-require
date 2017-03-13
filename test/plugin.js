const tap = require('tap');
const path = require('path');
const Browserify = require('browserify');

const plugin = require('../src');

tap.test('plugin', function (test) {
  test.plan(2);

  test.test('should render a valid bundle', function (t) {
    let browserify = new Browserify();
    let deps = [];
    let file = path.resolve('test/plugin/index.js');

    browserify
      .add(file)
      .on('file', function (file, id, parent) {
        deps.push(file);
      })
      .plugin(plugin)
      .bundle(function (err, buf) {
        if (err) {
          t.fail(err.message);
        }
        else {
          t.equal(deps.length, 5);

          let wantedDeps = [
            path.resolve('test/fixtures/main.glsl'),
            path.resolve('test/fixtures/foo.glsl'),
            path.resolve('test/fixtures/sub/bar.glsl'),
            path.resolve('test/fixtures/secondary.glsl'),
          ];

          wantedDeps.forEach(function (wantedDep) {
            t.notEqual(deps.indexOf(wantedDep), -1);
          });

          t.pass();
        }

        t.end();
      });
  });

  test.test('should return an error if configured as a transform', function (t) {
    try {
      plugin('foo');

      t.fail();
    }
    catch (err) {
      t.pass();
    }

    t.end();
  });
});