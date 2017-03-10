let transformTools = require('browserify-transform-tools');
let glslDeps = require('glslify-deps/sync');
let glsl = require('glslify');

let options = {
  includeExtensions: [".glsl"]
};

module.exports = transformTools.makeStringTransform("glslify-require", options,
  function (content, transformOptions, done) {
    let file = transformOptions.file;

    let src = glsl.file(file);

    if (transformOptions.config && transformOptions.config.b) {
      let b = transformOptions.config.b;
      let dependencies = glslDeps().add(file);
      let results = [];

      let processDependency = function (dependency) {
        for (let id in dependency.deps) {
          if (dependency.deps.hasOwnProperty(id)) {
            let subDependency = dependencies.find(function (item) {
              return (item.id == dependency.deps[id]);
            });

            results.push({
              id: id,
              file: subDependency.file
            });

            processDependency(subDependency);
          }
        }
      };

      dependencies.forEach(function (dependency) {
        processDependency(dependency);
      });

      results.forEach(function (result) {
        b.emit('file', result.file, result.id);
      });
    }

    done(null, 'module.exports = ' + JSON.stringify(src) + ';');
  }
);