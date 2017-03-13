let through = require('through2');
let glslifyDeps = require('glslify-deps');
let path = require('path');

module.exports = function(glslify) {
  let Glslyfier = function() {
    this.emitter = require('event-emitter')();
  };

  Glslyfier.prototype.transform = function(file) {
    if (path.extname(file) == '.glsl') {
      let emitter = this.emitter;
      let src = null;

      let transform = function (chunk, enc, cb) {
        src = glslify.compile(chunk, {
          basedir: path.dirname(file)
        });

        cb();
      };

      let flush = function (cb) {
        let self = this;
        let depper = glslifyDeps();

        depper.add(file, function(err, deps) {
          deps.forEach(function(dep) {
            if (!dep.entry) {
              emitter.emit('file', dep.file);
            }
          });

          self.push('module.exports = ' + JSON.stringify(src) + ';');

          cb();
        });
      };

      return through(transform, flush);
    }

    return through();
  };

  return Glslyfier;
};