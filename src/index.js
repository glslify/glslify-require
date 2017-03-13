let glslify = require('glslify');

module.exports = function (b, opts) {
  if (typeof b === 'string') {
    throw new Error('glslify-require appears to have been configured as a transform; it must be configured as a plugin.');
  }

  let Glslyfier = require('./lib/glslyfier')(glslify);
  let glslyfier = new Glslyfier(opts);

  glslyfier.emitter.on('file', function(file) {
    b.emit('file', file);
  });

  b.transform(glslyfier.transform.bind(glslyfier));
};
