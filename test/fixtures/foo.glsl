#pragma glslify: bar = require(./sub/bar)

float foo() {
  return bar;
}

#pragma glslify: export(foo)