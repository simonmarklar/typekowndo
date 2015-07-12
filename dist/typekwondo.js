(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) subClass.__proto__ = superClass;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer.call(target);
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function dedupe(deps) {
    var newDeps = [];
    for (var i = 0, l = deps.length; i < l; i++)
      if (indexOf.call(newDeps, deps[i]) == -1)
        newDeps.push(deps[i])
    return newDeps;
  }

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry; 

    entry.deps = dedupe(entry.deps);

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;
      exports[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          var importerIndex = indexOf.call(importerModule.dependencies, module);
          importerModule.setters[importerIndex](exports);
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      var hasOwnProperty = exports && exports.hasOwnProperty;
      entry.esModule = {};
      for (var p in exports) {
        if (!hasOwnProperty || exports.hasOwnProperty(p))
          entry.esModule[p] = exports[p];
      }
      entry.esModule['default'] = exports;
      entry.esModule.__useDefault = true;
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, declare) {
    return function(formatDetect) {
      formatDetect(function() {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          },
          'import': function() {
            throw new TypeError('Dynamic System.import calls are not supported for SFX bundles. Rather use a named bundle.');
          }
        };
        System.set('@empty', {});

        declare(System);

        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], function(System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(factory);
  // etc UMD / module pattern
})*/

(['src/typekwondo.js'], function(System) {

System.registerDynamic("node_modules/js-typed-errors/src/make-error-type.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  function makeErrorType(name, ErrorConstructor) {
    'use strict';
    ErrorConstructor.prototype = Object.create(Error.prototype, {'name': {
        configurable: false,
        writable: false,
        value: name
      }});
    ErrorConstructor.constructor = ErrorConstructor;
    return ErrorConstructor;
  }
  module.exports = makeErrorType;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/js-typed-errors/src/typed-errors/NotFoundError.js", ["node_modules/js-typed-errors/src/make-error-type.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var makeErrorType = require("node_modules/js-typed-errors/src/make-error-type.js");
  function NotFoundError(msg) {
    this.msg = msg || 'The specified url was not found';
  }
  module.exports = makeErrorType('NotFound', NotFoundError);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_curry1.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0) {
        return f1;
      } else if (a != null && a['@@functional/placeholder'] === true) {
        return f1;
      } else {
        return fn(a);
      }
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_curry2.js", ["node_modules/ramda/src/internal/_curry1.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry1 = require("node_modules/ramda/src/internal/_curry1.js");
  module.exports = function _curry2(fn) {
    return function f2(a, b) {
      var n = arguments.length;
      if (n === 0) {
        return f2;
      } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
        return f2;
      } else if (n === 1) {
        return _curry1(function(b) {
          return fn(a, b);
        });
      } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
        return f2;
      } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
        return _curry1(function(a) {
          return fn(a, b);
        });
      } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
        return _curry1(function(b) {
          return fn(a, b);
        });
      } else {
        return fn(a, b);
      }
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_xwrap.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = (function() {
    function XWrap(fn) {
      this.f = fn;
    }
    XWrap.prototype['@@transducer/init'] = function() {
      throw new Error('init not implemented on XWrap');
    };
    XWrap.prototype['@@transducer/result'] = function(acc) {
      return acc;
    };
    XWrap.prototype['@@transducer/step'] = function(acc, x) {
      return this.f(acc, x);
    };
    return function _xwrap(fn) {
      return new XWrap(fn);
    };
  }());
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/arity.js", ["node_modules/ramda/src/internal/_curry2.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  module.exports = _curry2(function(n, fn) {
    switch (n) {
      case 0:
        return function() {
          return fn.apply(this, arguments);
        };
      case 1:
        return function(a0) {
          return fn.apply(this, arguments);
        };
      case 2:
        return function(a0, a1) {
          return fn.apply(this, arguments);
        };
      case 3:
        return function(a0, a1, a2) {
          return fn.apply(this, arguments);
        };
      case 4:
        return function(a0, a1, a2, a3) {
          return fn.apply(this, arguments);
        };
      case 5:
        return function(a0, a1, a2, a3, a4) {
          return fn.apply(this, arguments);
        };
      case 6:
        return function(a0, a1, a2, a3, a4, a5) {
          return fn.apply(this, arguments);
        };
      case 7:
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return fn.apply(this, arguments);
        };
      case 8:
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return fn.apply(this, arguments);
        };
      case 9:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
          return fn.apply(this, arguments);
        };
      case 10:
        return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return fn.apply(this, arguments);
        };
      default:
        throw new Error('First argument to arity must be a non-negative integer no greater than ten');
    }
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_isArray.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = Array.isArray || function _isArray(val) {
    return (val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]');
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_isTransformer.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function _isTransformer(obj) {
    return typeof obj['@@transducer/step'] === 'function';
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_slice.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function _slice(args, from, to) {
    switch (arguments.length) {
      case 1:
        return _slice(args, 0, args.length);
      case 2:
        return _slice(args, from, args.length);
      default:
        var list = [];
        var idx = 0;
        var len = Math.max(0, Math.min(args.length, to) - from);
        while (idx < len) {
          list[idx] = args[from + idx];
          idx += 1;
        }
        return list;
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_map.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function _map(fn, list) {
    var idx = 0,
        len = list.length,
        result = [];
    while (idx < len) {
      result[idx] = fn(list[idx]);
      idx += 1;
    }
    return result;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_xfBase.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    init: function() {
      return this.xf['@@transducer/init']();
    },
    result: function(result) {
      return this.xf['@@transducer/result'](result);
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_curryN.js", ["node_modules/ramda/src/arity.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var arity = require("node_modules/ramda/src/arity.js");
  module.exports = function _curryN(length, received, fn) {
    return function() {
      var combined = [];
      var argsIdx = 0;
      var left = length;
      var combinedIdx = 0;
      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;
        if (combinedIdx < received.length && (received[combinedIdx] == null || received[combinedIdx]['@@functional/placeholder'] !== true || argsIdx >= arguments.length)) {
          result = received[combinedIdx];
        } else {
          result = arguments[argsIdx];
          argsIdx += 1;
        }
        combined[combinedIdx] = result;
        if (result == null || result['@@functional/placeholder'] !== true) {
          left -= 1;
        }
        combinedIdx += 1;
      }
      return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_filter.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function _filter(fn, list) {
    var idx = 0,
        len = list.length,
        result = [];
    while (idx < len) {
      if (fn(list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_xfilter.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/internal/_xfBase.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var _xfBase = require("node_modules/ramda/src/internal/_xfBase.js");
  module.exports = (function() {
    function XFilter(f, xf) {
      this.xf = xf;
      this.f = f;
    }
    XFilter.prototype['@@transducer/init'] = _xfBase.init;
    XFilter.prototype['@@transducer/result'] = _xfBase.result;
    XFilter.prototype['@@transducer/step'] = function(result, input) {
      return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
    };
    return _curry2(function _xfilter(f, xf) {
      return new XFilter(f, xf);
    });
  })();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_forEach.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function _forEach(fn, list) {
    var idx = 0,
        len = list.length;
    while (idx < len) {
      fn(list[idx]);
      idx += 1;
    }
    return list;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_hasMethod.js", ["node_modules/ramda/src/internal/_isArray.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _isArray = require("node_modules/ramda/src/internal/_isArray.js");
  module.exports = function _hasMethod(methodName, obj) {
    return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/just-debounce/index.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = debounce;
  function debounce(fn, delay, at_start, guarantee) {
    var timeout;
    var args;
    var self;
    return function debounced() {
      self = this;
      args = Array.prototype.slice.call(arguments);
      if (timeout && (at_start || guarantee)) {
        return;
      } else if (!at_start) {
        clear();
        timeout = setTimeout(run, delay);
        return timeout;
      }
      timeout = setTimeout(clear, delay);
      fn.apply(self, args);
      function run() {
        clear();
        fn.apply(self, args);
      }
      function clear() {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/lucidjs//lib/event-emitter.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  function EventEmitter() {
    this._listeners = {};
    this._pipedEmitters = [];
    this._flags = {};
    this.source = null;
    this.event = null;
    this.cancelBubble = false;
  }
  EventEmitter.prototype._expandEvent = function(event) {
    var ec = event.split('.');
    var e = [];
    while (ec.length > 0) {
      e.push(ec.join('.'));
      ec.pop();
    }
    return e;
  };
  EventEmitter.prototype.emit = function(event) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        switch (arguments.length) {
          case 1:
            this.emit(event[i]);
            break;
          case 2:
            this.emit(event[i], arguments[1]);
            break;
          case 3:
            this.emit(event[i], arguments[1], arguments[2]);
            break;
          default:
            var args = arguments.slice ? arguments.slice(1) : Array.prototype.slice.call(arguments, 1);
            args.unshift(event[i]);
            this.emit.apply(this, args);
        }
      }
      return this;
    }
    var prevSource = this.source;
    this.source = this._remoteSource || this;
    if (this._remoteSource) {
      this._remoteSource = null;
    }
    if (event.slice(0, 7) !== 'emitter') {
      var prevEvent = this.event;
      this.event = event;
      switch (arguments.length) {
        case 1:
          this.emit('emitter.emit', event);
          break;
        case 2:
          this.emit('emitter.emit', event, arguments[1]);
          break;
        case 3:
          this.emit('emitter.emit', event, arguments[1], arguments[2]);
          break;
        default:
          var args = arguments.slice ? arguments.slice(1) : Array.prototype.slice.call(arguments, 1);
          args.unshift('emitter.emit', event);
          this.emit.apply(this, args);
      }
    }
    var prevCancelBubble = this.cancelBubble;
    this.cancelBubble = false;
    var expandedEvents = this._expandEvent(event);
    for (var i = 0; i < expandedEvents.length; i += 1) {
      var expandedEvent = expandedEvents[i];
      if (!this._listeners[expandedEvent] || !this._listeners[expandedEvent].length) {
        if (event === 'error') {
          throw arguments[1] || new Error('Unknown emitter error');
        }
        continue;
      }
      var _cancelBubble;
      var listeners = this._listeners[expandedEvent].slice(0);
      for (var j = 0; j < listeners.length; j += 1) {
        switch (arguments.length) {
          case 1:
            _cancelBubble = listeners[j].call(this);
            break;
          case 2:
            _cancelBubble = listeners[j].call(this, arguments[1]);
            break;
          case 3:
            _cancelBubble = listeners[j].call(this, arguments[1], arguments[2]);
            break;
          default:
            var args = arguments.slice ? arguments.slice(1) : Array.prototype.slice.call(arguments, 1);
            _cancelBubble = listeners[j].apply(this, args);
        }
        if (_cancelBubble === false) {
          this.cancelBubble = false;
        }
      }
    }
    if (event.slice(0, 7) !== 'emitter') {
      this.event = prevEvent;
    }
    this.source = prevSource;
    if (!this.cancelBubble) {
      for (var i = 0; i < this._pipedEmitters.length; i += 1) {
        var eventEmitter = this._pipedEmitters[i];
        eventEmitter._remoteSource = this;
        eventEmitter.emit.apply(eventEmitter, arguments);
      }
      for (var i = 0; i < expandedEvents.length; i += 1) {
        var expandedEvent = expandedEvents[i];
        var eventEmitters = this._pipedEmitters[expandedEvent];
        if (!eventEmitters) {
          continue;
        }
        for (var j = 0; j < eventEmitters.length; j += 1) {
          eventEmitter = eventEmitters[i];
          if (!eventEmitter) {
            continue;
          }
          eventEmitter._remoteSource = this;
          eventEmitter.emit.apply(eventEmitter, arguments);
        }
      }
    }
    this.cancelBubble = prevCancelBubble;
    return this;
  };
  EventEmitter.prototype.trigger = EventEmitter.prototype.emit;
  EventEmitter.prototype.bind = function(event, listener) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.bind(event[i], listener);
      }
      return this;
    }
    var prevEvent = this.event;
    var prevSource = this.source;
    this.event = event;
    this.source = this;
    this.emit('emitter.bind', listener);
    this.event = prevEvent;
    this.source = prevSource;
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    ;
    if (typeof listener === 'function') {
      this._listeners[event].push(listener);
    } else if (listener !== null && typeof listener === 'object' && typeof listener.length === 'number') {
      for (var i = 0; i < listener.length; i += 1) {
        this._listeners[event].push(listener[i]);
      }
    }
    this._executeFlag(event, listener);
    for (var i = 0; i < this._pipedEmitters.length; i += 1) {
      var eventEmitter = this._pipedEmitters[i];
      eventEmitter._executeFlag(event, listener);
    }
    if (this._pipedEmitters[event]) {
      for (var i = 0; i < this._pipedEmitters[event].length; i += 1) {
        var eventEmitter = this._pipedEmitters[event][i];
        eventEmitter._executeFlag(event, listener);
      }
    }
    return this;
  };
  EventEmitter.prototype.addListener = EventEmitter.prototype.bind;
  EventEmitter.prototype.on = EventEmitter.prototype.bind;
  EventEmitter.prototype._executeFlag = function(event, listener) {
    if (this._flags[event]) {
      var prevSource = this.source;
      var prevEvent = this.event;
      this.source = this;
      this.event = event;
      if (typeof listener === 'function') {
        listener.apply(this, this._flags[event]);
      } else if (listener !== null && typeof listener === 'object' && typeof listener.length === 'number') {
        for (var i = 0; i < listener.length; i += 1) {
          listener[i].apply(this, this._flags[event]);
        }
      }
      this.source = prevSource;
      this.event = prevEvent;
    }
  };
  EventEmitter.prototype.weakBind = function(event, listener) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.weakBind(event[i], listener);
      }
      return this;
    }
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    ;
    if (typeof listener === 'function') {
      this._listeners[event].push(listener);
    } else if (listener !== null && typeof listener === 'object' && typeof listener.length === 'number') {
      for (var i = 0; i < listener.length; i += 1) {
        this._listeners[event].push(listener[i]);
      }
    }
    this._listeners[event].push(function unbindHandler() {
      if (typeof listener === 'function') {
        var i = this._listeners[event].indexOf(listener);
        if (i > -1) {
          this._listeners[event].splice(i, 1);
        }
      } else if (listener !== null && typeof listener === 'object' && typeof listener.length === 'number') {
        for (var i = 0; i < listener.length; i += 1) {
          var j = this._listeners[event].indexOf(listener[i]);
          if (j > -1) {
            this._listeners[event].splice(j, 1);
            i -= 1;
          }
        }
      }
      var i = this._listeners[event].indexOf(unbindHandler);
      if (i > -1) {
        this._listeners[event].splice(i, 1);
      }
    });
    this._executeFlag(event, listener);
    for (var i = 0; i < this._pipedEmitters.length; i += 1) {
      var eventEmitter = this._pipedEmitters[i];
      eventEmitter._executeFlag(event, listener);
    }
    if (this._pipedEmitters[event]) {
      for (var i = 0; i < this._pipedEmitters[event].length; i += 1) {
        var eventEmitter = this._pipedEmitters[i];
        eventEmitter._executeFlag(event, listener);
      }
    }
    return this;
  };
  EventEmitter.prototype.once = EventEmitter.prototype.weakBind;
  EventEmitter.prototype.unbind = function(event, listener) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.unbind(event[i], listener);
      }
      return this;
    }
    if (this._listeners[event]) {
      var prevEvent = this.event;
      var prevSource = this.source;
      this.event = event;
      this.source = this;
      var listeners = this._listeners[event];
      if (listener !== null && typeof listener === 'object' && typeof listener.length === 'number') {
        for (var i = 0; i < listener.length; i += 1) {
          var j = listeners.indexOf(listener[i]);
          if (j > -1) {
            this.emit('emitter.unbind', listener[i]);
            listeners.splice(j, 1);
            i -= 1;
          }
        }
      } else if (typeof listener === 'function') {
        var j = listeners.indexOf(listener);
        if (j > -1) {
          this.emit('emitter.unbind', listener);
          listeners.splice(j, 1);
        }
      }
      this.event = prevEvent;
      this.source = prevSource;
    }
    return this;
  };
  EventEmitter.prototype.removeListener = EventEmitter.prototype.unbind;
  EventEmitter.prototype.off = EventEmitter.prototype.unbind;
  EventEmitter.prototype.unbindAll = function(event) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.unbindAll(event[i]);
      }
      return this;
    }
    if (typeof event === 'string' && this._listeners[event]) {
      for (var i = 0; i < this._listeners[event].length; i += 1) {
        this.unbind(event, this._listeners[event][i]);
      }
      return this;
    }
    for (var event in this._listeners) {
      for (var i = 0; i < this._listeners[event].length; i += 1) {
        this.unbind(event, this._listeners[event][i]);
      }
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = EventEmitter.prototype.unbindAll;
  EventEmitter.prototype.flag = function(event) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        switch (arguments.length) {
          case 1:
            this.flag(event[i]);
            break;
          case 2:
            this.flag(event[i], arguments[1]);
            break;
          case 3:
            this.flag(event[i], arguments[1], arguments[2]);
            break;
          default:
            var args = arguments.slice ? arguments.slice(1) : Array.prototype.slice.call(arguments, 1);
            args.unshift(event[i]);
            this.flag.apply(this, args);
        }
      }
      return this;
    }
    var prevEvent = this.event;
    var prevSource = this.source;
    this.event = event;
    this.source = this;
    switch (arguments.length) {
      case 1:
        this.emit('emitter.flag', event);
        break;
      case 2:
        this.emit('emitter.flag', event, arguments[1]);
        break;
      case 3:
        this.emit('emitter.flag', event, arguments[1], arguments[2]);
        break;
      default:
        var args = arguments.slice ? arguments.slice(1) : Array.prototype.slice.call(arguments, 1);
        args.unshift('emitter.flag', event);
        this.emit.apply(this, args);
    }
    this.event = prevEvent;
    this.source = prevSource;
    this._flags[event] = arguments.slice ? arguments.slice(1) : Array.prototype.slice.call(arguments, 1);
    if (this._listeners[event]) {
      var listeners = this._listeners[event].splice(0);
      for (var i = 0; i < listeners.length; i += 1) {
        this._executeFlag(event, listeners[i]);
      }
    }
    return this;
  };
  EventEmitter.prototype.unflag = function(event) {
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.unflag(event[i]);
      }
      return this;
    }
    if (this._flags[event]) {
      var prevEvent = this.event;
      var prevSource = this.source;
      this.event = event;
      this.source = this;
      this.emit('emitter.unflag', event);
      this.event = prevEvent;
      this.source = prevSource;
      delete this._flags[event];
    }
    return this;
  };
  EventEmitter.prototype.pipe = function(event, targetEmitter) {
    if (event !== null && typeof event === 'object' && targetEmitter === undefined) {
      targetEmitter = event;
      event = null;
    }
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.pipe(event[i], targetEmitter);
      }
      return this;
    }
    var prevSource = this.source;
    this.source = this;
    var prevEvent = this.event;
    this.event = event;
    this.emit('emitter.pipe', targetEmitter, event);
    this.event = prevEvent;
    this.source = prevSource;
    if (event === null) {
      this._pipedEmitters.push(targetEmitter);
    } else {
      if (!this._pipedEmitters[event]) {
        this._pipedEmitters[event] = [];
      }
      this._pipedEmitters[event].push(targetEmitter);
    }
    return this;
  };
  EventEmitter.prototype.unpipe = function(event, targetEmitter) {
    if (event !== null && typeof event === 'object' && targetEmitter === undefined) {
      targetEmitter = event;
      event = null;
    }
    if (event !== null && typeof event === 'object' && typeof event.length === 'number') {
      for (var i = 0; i < event.length; i += 1) {
        this.unpipe(event[i], targetEmitter);
      }
      return this;
    }
    var prevSource = this.source;
    this.source = this;
    var prevEvent = this.event;
    this.event = event;
    if (event === null) {
      var j = this._pipedEmitters.indexOf(targetEmitter);
      if (j > -1) {
        this.emit('emitter.unpipe', this._pipedEmitters[j]);
        this._pipedEmitters.splice(j, 1);
      }
    } else {
      if (!this._pipedEmitters[event]) {
        return this;
      }
      var j = this._pipedEmitters[event].indexOf(targetEmitter);
      if (j > -1) {
        this.emit('emitter.unpipe', this._pipedEmitters[event][j], event);
        this._pipedEmitters[event].splice(j, 1);
      }
    }
    this.event = prevEvent;
    this.source = prevSource;
    return this;
  };
  EventEmitter.prototype.listeners = function(event) {
    if (event) {
      return this._listeners[event];
    }
    return this._listeners;
  };
  module.exports = EventEmitter;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/js-typed-errors/src/typed-errors/ActionAbortedError.js", ["node_modules/js-typed-errors/src/make-error-type.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var makeErrorType = require("node_modules/js-typed-errors/src/make-error-type.js");
  function ActionAbortedError(msg) {
    this.msg = msg || 'The action was aborted';
  }
  module.exports = makeErrorType('ActionAborted', ActionAbortedError);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_curry3.js", ["node_modules/ramda/src/internal/_curry1.js", "node_modules/ramda/src/internal/_curry2.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry1 = require("node_modules/ramda/src/internal/_curry1.js");
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  module.exports = function _curry3(fn) {
    return function f3(a, b, c) {
      var n = arguments.length;
      if (n === 0) {
        return f3;
      } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
        return f3;
      } else if (n === 1) {
        return _curry2(function(b, c) {
          return fn(a, b, c);
        });
      } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
        return f3;
      } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
        return _curry2(function(a, c) {
          return fn(a, b, c);
        });
      } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
        return _curry2(function(b, c) {
          return fn(a, b, c);
        });
      } else if (n === 2) {
        return _curry1(function(c) {
          return fn(a, b, c);
        });
      } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
        return f3;
      } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
        return _curry2(function(a, b) {
          return fn(a, b, c);
        });
      } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
        return _curry2(function(a, c) {
          return fn(a, b, c);
        });
      } else if (n === 3 && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
        return _curry2(function(b, c) {
          return fn(a, b, c);
        });
      } else if (n === 3 && a != null && a['@@functional/placeholder'] === true) {
        return _curry1(function(a) {
          return fn(a, b, c);
        });
      } else if (n === 3 && b != null && b['@@functional/placeholder'] === true) {
        return _curry1(function(b) {
          return fn(a, b, c);
        });
      } else if (n === 3 && c != null && c['@@functional/placeholder'] === true) {
        return _curry1(function(c) {
          return fn(a, b, c);
        });
      } else {
        return fn(a, b, c);
      }
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/bind.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/arity.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var arity = require("node_modules/ramda/src/arity.js");
  module.exports = _curry2(function bind(fn, thisObj) {
    return arity(fn.length, function() {
      return fn.apply(thisObj, arguments);
    });
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/isArrayLike.js", ["node_modules/ramda/src/internal/_curry1.js", "node_modules/ramda/src/internal/_isArray.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry1 = require("node_modules/ramda/src/internal/_curry1.js");
  var _isArray = require("node_modules/ramda/src/internal/_isArray.js");
  module.exports = _curry1(function isArrayLike(x) {
    if (_isArray(x)) {
      return true;
    }
    if (!x) {
      return false;
    }
    if (typeof x !== 'object') {
      return false;
    }
    if (x instanceof String) {
      return false;
    }
    if (x.nodeType === 1) {
      return !!x.length;
    }
    if (x.length === 0) {
      return true;
    }
    if (x.length > 0) {
      return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_dispatchable.js", ["node_modules/ramda/src/internal/_isArray.js", "node_modules/ramda/src/internal/_isTransformer.js", "node_modules/ramda/src/internal/_slice.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _isArray = require("node_modules/ramda/src/internal/_isArray.js");
  var _isTransformer = require("node_modules/ramda/src/internal/_isTransformer.js");
  var _slice = require("node_modules/ramda/src/internal/_slice.js");
  module.exports = function _dispatchable(methodname, xf, fn) {
    return function() {
      var length = arguments.length;
      if (length === 0) {
        return fn();
      }
      var obj = arguments[length - 1];
      if (!_isArray(obj)) {
        var args = _slice(arguments, 0, length - 1);
        if (typeof obj[methodname] === 'function') {
          return obj[methodname].apply(obj, args);
        }
        if (_isTransformer(obj)) {
          var transducer = xf.apply(null, args);
          return transducer(obj);
        }
      }
      return fn.apply(this, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_xmap.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/internal/_xfBase.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var _xfBase = require("node_modules/ramda/src/internal/_xfBase.js");
  module.exports = (function() {
    function XMap(f, xf) {
      this.xf = xf;
      this.f = f;
    }
    XMap.prototype['@@transducer/init'] = _xfBase.init;
    XMap.prototype['@@transducer/result'] = _xfBase.result;
    XMap.prototype['@@transducer/step'] = function(result, input) {
      return this.xf['@@transducer/step'](result, this.f(input));
    };
    return _curry2(function _xmap(f, xf) {
      return new XMap(f, xf);
    });
  })();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/curryN.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/internal/_curryN.js", "node_modules/ramda/src/arity.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var _curryN = require("node_modules/ramda/src/internal/_curryN.js");
  var arity = require("node_modules/ramda/src/arity.js");
  module.exports = _curry2(function curryN(length, fn) {
    return arity(length, _curryN(length, [], fn));
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/filter.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/internal/_dispatchable.js", "node_modules/ramda/src/internal/_filter.js", "node_modules/ramda/src/internal/_xfilter.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var _dispatchable = require("node_modules/ramda/src/internal/_dispatchable.js");
  var _filter = require("node_modules/ramda/src/internal/_filter.js");
  var _xfilter = require("node_modules/ramda/src/internal/_xfilter.js");
  module.exports = _curry2(_dispatchable('filter', _xfilter, _filter));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/forEach.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/internal/_forEach.js", "node_modules/ramda/src/internal/_hasMethod.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var _forEach = require("node_modules/ramda/src/internal/_forEach.js");
  var _hasMethod = require("node_modules/ramda/src/internal/_hasMethod.js");
  module.exports = _curry2(function forEach(fn, list) {
    return _hasMethod('forEach', list) ? list.forEach(fn) : _forEach(fn, list);
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/internal/_reduce.js", ["node_modules/ramda/src/internal/_xwrap.js", "node_modules/ramda/src/bind.js", "node_modules/ramda/src/isArrayLike.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _xwrap = require("node_modules/ramda/src/internal/_xwrap.js");
  var bind = require("node_modules/ramda/src/bind.js");
  var isArrayLike = require("node_modules/ramda/src/isArrayLike.js");
  module.exports = (function() {
    function _arrayReduce(xf, acc, list) {
      var idx = 0,
          len = list.length;
      while (idx < len) {
        acc = xf['@@transducer/step'](acc, list[idx]);
        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value'];
          break;
        }
        idx += 1;
      }
      return xf['@@transducer/result'](acc);
    }
    function _iterableReduce(xf, acc, iter) {
      var step = iter.next();
      while (!step.done) {
        acc = xf['@@transducer/step'](acc, step.value);
        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value'];
          break;
        }
        step = iter.next();
      }
      return xf['@@transducer/result'](acc);
    }
    function _methodReduce(xf, acc, obj) {
      return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
    }
    var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
    return function _reduce(fn, acc, list) {
      if (typeof fn === 'function') {
        fn = _xwrap(fn);
      }
      if (isArrayLike(list)) {
        return _arrayReduce(fn, acc, list);
      }
      if (typeof list.reduce === 'function') {
        return _methodReduce(fn, acc, list);
      }
      if (list[symIterator] != null) {
        return _iterableReduce(fn, acc, list[symIterator]());
      }
      if (typeof list.next === 'function') {
        return _iterableReduce(fn, acc, list);
      }
      throw new TypeError('reduce: list must be array or iterable');
    };
  })();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/map.js", ["node_modules/ramda/src/internal/_curry2.js", "node_modules/ramda/src/internal/_dispatchable.js", "node_modules/ramda/src/internal/_map.js", "node_modules/ramda/src/internal/_xmap.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry2 = require("node_modules/ramda/src/internal/_curry2.js");
  var _dispatchable = require("node_modules/ramda/src/internal/_dispatchable.js");
  var _map = require("node_modules/ramda/src/internal/_map.js");
  var _xmap = require("node_modules/ramda/src/internal/_xmap.js");
  module.exports = _curry2(_dispatchable('map', _xmap, _map));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/curry.js", ["node_modules/ramda/src/internal/_curry1.js", "node_modules/ramda/src/curryN.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry1 = require("node_modules/ramda/src/internal/_curry1.js");
  var curryN = require("node_modules/ramda/src/curryN.js");
  module.exports = _curry1(function curry(fn) {
    return curryN(fn.length, fn);
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/reduce.js", ["node_modules/ramda/src/internal/_curry3.js", "node_modules/ramda/src/internal/_reduce.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _curry3 = require("node_modules/ramda/src/internal/_curry3.js");
  var _reduce = require("node_modules/ramda/src/internal/_reduce.js");
  module.exports = _curry3(_reduce);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/ramda/src/invoke.js", ["node_modules/ramda/src/curry.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var curry = require("node_modules/ramda/src/curry.js");
  module.exports = curry(function invoke(methodName, args, obj) {
    return obj[methodName].apply(obj, args);
  });
  global.define = __define;
  return module.exports;
});

System.register('src/image-loader/data-url-loader.js', [], function (_export) {
  'use strict';

  return {
    setters: [],
    execute: function () {
      _export('default', {
        name: 'data-url-loader',

        predicate: function isDataURL(url) {
          if (typeof url !== 'string') return false;

          return url.indexOf('data:image') === 0;
        },

        loader: function loadDataURLImage(url) {
          var i = new Image();
          i.src = url;
          return Promise.resolve(i);
        }
      });
    }
  };
});
System.register('src/message-bus.js', ['node_modules/lucidjs//lib/event-emitter.js'], function (_export) {
  'use strict';

  var Emitter;
  return {
    setters: [function (_node_modulesLucidjsLibEventEmitterJs) {
      Emitter = _node_modulesLucidjsLibEventEmitterJs['default'];
    }],
    execute: function () {
      _export('default', new Emitter());
    }
  };
});
System.register('src/image-loader/url-loader.js', ['node_modules/js-typed-errors/src/typed-errors/ActionAbortedError.js', 'node_modules/js-typed-errors/src/typed-errors/NotFoundError.js'], function (_export) {
  'use strict';

  var ActionAbortedError, NotFoundError;
  return {
    setters: [function (_node_modulesJsTypedErrorsSrcTypedErrorsActionAbortedErrorJs) {
      ActionAbortedError = _node_modulesJsTypedErrorsSrcTypedErrorsActionAbortedErrorJs['default'];
    }, function (_node_modulesJsTypedErrorsSrcTypedErrorsNotFoundErrorJs) {
      NotFoundError = _node_modulesJsTypedErrorsSrcTypedErrorsNotFoundErrorJs['default'];
    }],
    execute: function () {
      _export('default', {
        name: 'url-loader',

        predicate: function isURL(url) {
          if (typeof url !== 'string') return false;

          return /(\.jpg|\.jpeg|\.png)/i.test(url);
        },

        loader: function loadURLImage(url) {
          return new Promise(function (resolve, reject) {
            var i = new Image();
            i.addEventListener('load', function () {
              return resolve(i);
            });
            i.addEventListener('abort', function () {
              return reject(new ActionAbortedError('Could not load ' + url));
            });
            i.addEventListener('error', function () {
              return reject(new NotFoundError('Could not find ' + url));
            });
            i.src = url;
          });
        }
      });
    }
  };
});
System.register('src/canvas/canvas.js', ['node_modules/just-debounce/index.js', 'src/message-bus.js'], function (_export) {
  'use strict';

  var debounce, messageBus, canvasEl, height, width, contextType, getContext, canvasHeight, canvasWidth;

  _export('setup', setup);

  function sizeToContainer(containerEl) {
    return function () {
      height = containerEl.offsetHeight;
      width = containerEl.offsetWidth;

      canvasEl.setAttribute('width', width);
      canvasEl.setAttribute('height', height);

      messageBus.emit('canvas.resize', width, height);
    };
  }

  function setup() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var containerEl = config.containerEl ? config.containerEl : document.body;
    contextType = config.contextType ? config.contextType : contextType;

    window.onresize = debounce(sizeToContainer(containerEl), 250);
    window.onresize();

    containerEl.appendChild(canvasEl);
  }

  return {
    setters: [function (_node_modulesJustDebounceIndexJs) {
      debounce = _node_modulesJustDebounceIndexJs['default'];
    }, function (_srcMessageBusJs) {
      messageBus = _srcMessageBusJs['default'];
    }],
    execute: function () {
      canvasEl = document.createElement('canvas');
      height = 800;
      width = 600;
      contextType = '2d';

      getContext = function getContext() {
        return canvasEl.getContext(contextType);
      };

      _export('getContext', getContext);

      canvasHeight = function canvasHeight() {
        return height;
      };

      _export('canvasHeight', canvasHeight);

      canvasWidth = function canvasWidth() {
        return width;
      };

      _export('canvasWidth', canvasWidth);
    }
  };
});
System.register('src/image-loader/image-loader.js', ['src/image-loader/url-loader.js', 'src/image-loader/data-url-loader.js', 'node_modules/ramda/src/reduce.js', 'node_modules/ramda/src/map.js', 'node_modules/ramda/src/invoke.js', 'node_modules/ramda/src/filter.js', 'node_modules/ramda/src/forEach.js'], function (_export) {
  'use strict';

  var urlLoader, dataUrlLoader, reduce, map, invoke, filter, forEach, loaders, defaultImageName, ImageLoader;
  return {
    setters: [function (_srcImageLoaderUrlLoaderJs) {
      urlLoader = _srcImageLoaderUrlLoaderJs['default'];
    }, function (_srcImageLoaderDataUrlLoaderJs) {
      dataUrlLoader = _srcImageLoaderDataUrlLoaderJs['default'];
    }, function (_node_modulesRamdaSrcReduceJs) {
      reduce = _node_modulesRamdaSrcReduceJs['default'];
    }, function (_node_modulesRamdaSrcMapJs) {
      map = _node_modulesRamdaSrcMapJs['default'];
    }, function (_node_modulesRamdaSrcInvokeJs) {
      invoke = _node_modulesRamdaSrcInvokeJs['default'];
    }, function (_node_modulesRamdaSrcFilterJs) {
      filter = _node_modulesRamdaSrcFilterJs['default'];
    }, function (_node_modulesRamdaSrcForEachJs) {
      forEach = _node_modulesRamdaSrcForEachJs['default'];
    }],
    execute: function () {
      loaders = [urlLoader, dataUrlLoader];

      defaultImageName = (function (index) {
        return function () {
          return 'Image' + index++;
        };
      })(0);

      ImageLoader = (function () {
        function ImageLoader() {
          babelHelpers.classCallCheck(this, ImageLoader);

          this.images = new Map();

          this.queued = [];
        }

        babelHelpers.createClass(ImageLoader, [{
          key: 'get',
          value: function get(name) {
            return this.images.get(name);
          }
        }, {
          key: 'set',
          value: function set(name, image) {
            this.images.set(name, image);
          }
        }, {
          key: 'addLoader',
          value: function addLoader(name, loader) {
            var predicate = arguments.length <= 2 || arguments[2] === undefined ? function () {
              return false;
            } : arguments[2];

            loaders.push({ name: name, predicate: predicate, loader: loader });
          }
        }, {
          key: 'prepareForLoad',
          value: function prepareForLoad(name, meta) {
            var _this = this;

            var test = function test(result, loaderDef) {
              if (result) return result;

              var loader = { name: name, load: function load() {
                  return loaderDef.loader(meta).then(function (img) {
                    return _this.set(name, img);
                  });
                } };
              return loaderDef.predicate(meta) ? loader : result;
            };

            return reduce(test, undefined, loaders);
          }
        }, {
          key: 'queue',
          value: function queue(name, meta) {
            var loader = this.prepareForLoad(name, meta);

            loader && this.queued.push(loader);
          }
        }, {
          key: 'processQueue',
          value: function processQueue() {
            return Promise.all(map(function (loader) {
              return loader.load();
            }, this.queued)).then(this.emptyQueue.bind(this))['catch'](function (err) {
              return console.log('ImageLoader:', err);
            });
          }
        }, {
          key: 'emptyQueue',
          value: function emptyQueue() {
            this.queued.splice(0);
          }
        }, {
          key: 'load',
          value: function load(name, meta) {
            var loader = this.prepareForLoad(name, meta);
            return loader.load()['catch'](function (err) {
              return console.log('ImageLoader:', err);
            });
          }
        }, {
          key: 'fromDocument',
          value: function fromDocument(predicate) {
            var nameProp = arguments.length <= 1 || arguments[1] === undefined ? 'name' : arguments[1];

            var images = predicate ? fiter(predicate, document.images) : document.images;

            if (!images.length) return;

            forEach(this.set(img[nameProp] || defaultImageName(), img), images);
          }
        }]);
        return ImageLoader;
      })();

      _export('default', ImageLoader);
    }
  };
});
System.register('src/typekwondo.js', ['src/image-loader/image-loader.js', 'src/canvas/canvas.js', 'src/message-bus.js'], function (_export) {
  'use strict';

  var ImageLoader, setupCanvas, getContext, messageBus, imageLoader, ctx;
  return {
    setters: [function (_srcImageLoaderImageLoaderJs) {
      ImageLoader = _srcImageLoaderImageLoaderJs['default'];
    }, function (_srcCanvasCanvasJs) {
      setupCanvas = _srcCanvasCanvasJs.setup;
      getContext = _srcCanvasCanvasJs.getContext;
    }, function (_srcMessageBusJs) {
      messageBus = _srcMessageBusJs['default'];
    }],
    execute: function () {
      imageLoader = new ImageLoader();

      setupCanvas();

      ctx = getContext('2d');

      messageBus.bind('canvas.resize', function () {
        ctx.fillStyle = 'rgb(200,0,0)';
        ctx.fillRect(10, 10, 55, 50);
      });
    }
  };
});
})
(function(factory) {
  factory();
});