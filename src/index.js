let transform = require('./transform');
let path = require('path');

module.exports = function (b, opts) {
  if (typeof b === 'string') {
    throw new Error('glslify-require appears to have been configured as a transform; it must be configured as a plugin.');
  }

  b.transform(transform, {
    b: b
  });
};
