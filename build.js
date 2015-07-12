/* eslint-env node */
'use strict';

//TODO: gulp plugin ?

var Builder = require('systemjs-builder');

var builder = new Builder({
  
  defaultJSExtensions: true,
  // opt in to Babel for transpiling over Traceur
  transpiler: 'babel',

  map: {
    debounce: 'node_modules/just-debounce/index.js',
    lucidjs: 'node_modules/lucidjs//lib/event-emitter.js',
    ramda: 'node_modules/ramda/src',
    math: 'node_modules/gl-matrix/src/gl-matrix',
    'typed-errors': 'node_modules/js-typed-errors/src/typed-errors'
  }

  // etc. any SystemJS config
})
.buildSFX('src/typekwondo.js', 'dist/typekwondo.js')
.then(function() {
  console.log('Build complete');
})
.catch(function(err) {
  console.log('Build error');
  console.log(err);
});