# glslify-require 

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

**Browserify plugin to require() OpenGL Shading Language (GLSL) files**

*NOTE*: Has not been tested on Node below version 6.0.0. Please report any bugs you may find.

## Installation

```bash
npm install glslify-require
```
## Usage ##

### Command Line ###

```bash
browserify index.js -p [ glslify-require ] > bundle.js
```

### Middleware ###

```javascript
let browserify = require('browserify');
let glslifyRequire = require('glslify-require');

let bundle = browserify()
    .plugin(glslifyRequire)
    .add('index.js');
```

Now, you can use require() to retrieve GLSL source code as a JavaScript string:

```javascript
var src = require('../path/to/my/glsl/file.glsl');

console.log(src);
````

## Events ##

Being fueled by [glslify](https://www.npmjs.com/package/glslify) and [glslify-deps](https://www.npmjs.com/package/glslify-deps), you can [import](https://www.npmjs.com/package/glslify#importing-a-glsl-module) and [export](https://www.npmjs.com/package/glslify#exporting-a-glsl-module) GLSL modules. glslify-require will emit *file* events accordingly on browserify pipeline to keep your middleware up-to-date with dependencies.

Let's consider the following files:

index.js
```javascript
var src = require('./main.glsl');
````

main.glsl
```
#pragma glslify: foo = require(./foo)

void main() {
  bar = foo;
};
````

foo.glsl
```
struct Foo {
  vec3 bar;
};

#pragma glslify: export(Foo)
````

The *file* event handler would be called for index.js, main.glsl and foo.glsl:

```javascript
let browserify = require('browserify');
let glslifyRequire = require('glslify-require');

let bundle = browserify()
    .plugin(glslifyRequire)
    .add('index.js')
    .on('file', function (file, id, parent) {
        // called for index.js, main.glsl and foo.glsl
     });
```

## Contributing

* Fork the main repository
* Code
* Implement tests using [node-tap](https://github.com/tapjs/node-tap)
* Issue a pull request keeping in mind that all pull requests must reference an issue in the issue queue

## License

Apache-2.0 © [Eric MORAND]()

[npm-image]: https://badge.fury.io/js/glslify-require.svg
[npm-url]: https://npmjs.org/package/glslify-require
[travis-image]: https://travis-ci.org/ericmorand/glslify-require.svg?branch=master
[travis-url]: https://travis-ci.org/ericmorand/glslify-require
[daviddm-image]: https://david-dm.org/ericmorand/glslify-require.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ericmorand/glslify-require
[coveralls-image]: https://coveralls.io/repos/github/ericmorand/glslify-require/badge.svg
[coveralls-url]: https://coveralls.io/github/ericmorand/glslify-require
