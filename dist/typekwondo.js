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

System.registerDynamic("node_modules/gl-matrix/src/gl-matrix/common.js", [], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var glMatrix = {};
  glMatrix.EPSILON = 0.000001;
  glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
  glMatrix.RANDOM = Math.random;
  glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
  };
  var degree = Math.PI / 180;
  glMatrix.toRadian = function(a) {
    return a * degree;
  };
  module.exports = glMatrix;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/lucidjs/lib/event-emitter.js", [], true, function(require, exports, module) {
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

System.registerDynamic("node_modules/gl-matrix/src/gl-matrix/vec2.js", ["node_modules/gl-matrix/src/gl-matrix/common.js"], true, function(require, exports, module) {
  var global = this,
      __define = global.define;
  global.define = undefined;
  var glMatrix = require("node_modules/gl-matrix/src/gl-matrix/common.js");
  var vec2 = {};
  vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
  };
  vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
  };
  vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  };
  vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  };
  vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  };
  vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  };
  vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  };
  vec2.sub = vec2.subtract;
  vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  };
  vec2.mul = vec2.multiply;
  vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  };
  vec2.div = vec2.divide;
  vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
  };
  vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
  };
  vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  };
  vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
  };
  vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
  };
  vec2.dist = vec2.distance;
  vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
  };
  vec2.sqrDist = vec2.squaredDistance;
  vec2.length = function(a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
  };
  vec2.len = vec2.length;
  vec2.squaredLength = function(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
  };
  vec2.sqrLen = vec2.squaredLength;
  vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  };
  vec2.inverse = function(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
  };
  vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
    }
    return out;
  };
  vec2.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  };
  vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  };
  vec2.lerp = function(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  };
  vec2.random = function(out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
  };
  vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  };
  vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  };
  vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  };
  vec2.transformMat4 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  };
  vec2.forEach = (function() {
    var vec = vec2.create();
    return function(a, stride, offset, count, fn, arg) {
      var i,
          l;
      if (!stride) {
        stride = 2;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }
      return a;
    };
  })();
  vec2.str = function(a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
  };
  module.exports = vec2;
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

System.register('src/id-generator.js', [], function (_export) {
  'use strict';

  var idGenerator;
  return {
    setters: [],
    execute: function () {
      /**
       * Returns Creaates a generator function that will generate a unique id
       * @param  {String} prefix - A Prefix for the unique Id
       * @return {Generator}      - a Generator that will give you the next unique id
       *
       * @example
       * <pre>
       * let uniqueObjectId = idGenerator('Object');
       * let id = uniqueObjectId.next().value;
       * // id === 'Object0'
       * id = uniqueObjectId.next().value;
       * // id === 'Object1'
       * </pre>
       */

      idGenerator = function idGenerator() {
        var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        return regeneratorRuntime.mark(function callee$1$0() {
          var index;
          return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                index = 0;

              case 1:
                if (!true) {
                  context$2$0.next = 6;
                  break;
                }

                context$2$0.next = 4;
                return prefix + index++;

              case 4:
                context$2$0.next = 1;
                break;

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, callee$1$0, this);
        })();
      };

      _export('default', idGenerator);
    }
  };
});

System.register('src/sprite.js', ['src/positionable.js', 'src/id-generator.js'], function (_export) {
  'use strict';

  var Positionable, idGenerator, spriteIdGenerator, Sprite;
  return {
    setters: [function (_srcPositionableJs) {
      Positionable = _srcPositionableJs['default'];
    }, function (_srcIdGeneratorJs) {
      idGenerator = _srcIdGeneratorJs['default'];
    }],
    execute: function () {
      spriteIdGenerator = idGenerator('Sprite');

      Sprite = (function (_Positionable) {
        babelHelpers.inherits(Sprite, _Positionable);

        function Sprite() {
          var id = arguments.length <= 0 || arguments[0] === undefined ? spriteIdGenerator.next().value : arguments[0];
          babelHelpers.classCallCheck(this, Sprite);

          babelHelpers.get(Object.getPrototypeOf(Sprite.prototype), 'constructor', this).call(this);

          this.id = id;
        }

        babelHelpers.createClass(Sprite, [{
          key: 'image',
          get: function get() {
            return this._image;
          },
          set: function set(img) {
            this._image = img;
            return this;
          }
        }]);
        return Sprite;
      })(Positionable);

      _export('default', Sprite);
    }
  };
});

System.register('src/message-bus.js', ['node_modules/lucidjs/lib/event-emitter.js'], function (_export) {
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

System.register('src/positionable.js', ['node_modules/gl-matrix/src/gl-matrix/vec2.js'], function (_export) {
  'use strict';

  var vec2, Positionable;
  return {
    setters: [function (_node_modulesGlMatrixSrcGlMatrixVec2Js) {
      vec2 = _node_modulesGlMatrixSrcGlMatrixVec2Js['default'];
    }],
    execute: function () {
      Positionable = (function () {
        function Positionable() {
          babelHelpers.classCallCheck(this, Positionable);

          this.scale = 1;
          this.position = vec2.create(0, 0);
          this.z = 0;

          this._width = 0;
          this._height = 0;
        }

        babelHelpers.createClass(Positionable, [{
          key: 'width',
          get: function get() {
            return this._width * this.scale;
          },
          set: function set(val) {
            this._width = val;
            return this;
          }
        }, {
          key: 'height',
          get: function get() {
            return this._height * this.scale;
          },
          set: function set(val) {
            this._height = val;
            return this;
          }
        }, {
          key: 'x',
          get: function get() {
            return this.position[0];
          },
          set: function set(val) {
            this.position[0] = val;
            return this;
          }
        }, {
          key: 'y',
          get: function get() {
            return this.position[1];
          },
          set: function set(val) {
            this.position[1] = val;
            return this;
          }
        }]);
        return Positionable;
      })();

      _export('default', Positionable);
    }
  };
});

System.register('src/canvas/canvas.js', ['src/id-generator.js', 'src/positionable.js'], function (_export) {
  'use strict';

  var idGenerator, Positionable, canvasIdGenerator, Canvas;
  return {
    setters: [function (_srcIdGeneratorJs) {
      idGenerator = _srcIdGeneratorJs['default'];
    }, function (_srcPositionableJs) {
      Positionable = _srcPositionableJs['default'];
    }],
    execute: function () {
      canvasIdGenerator = idGenerator('Canvas');

      Canvas = (function (_Positionable) {
        babelHelpers.inherits(Canvas, _Positionable);

        function Canvas() {
          var id = arguments.length <= 0 || arguments[0] === undefined ? canvasIdGenerator.next().value : arguments[0];
          babelHelpers.classCallCheck(this, Canvas);

          babelHelpers.get(Object.getPrototypeOf(Canvas.prototype), 'constructor', this).call(this);

          this.id = id;
          this.contextType = '2d';
          this.element = document.createElement('canvas');
          this.context = this.element.getContext(this.contextType);

          this.height = 800;
          this.width = 600;

          this.x = 0;
          this.y = 0;

          this.element.style.position = 'absolute';

          this.reposition();
        }

        babelHelpers.createClass(Canvas, [{
          key: 'resize',

          /**
           * resizes the canvas
           */
          value: function resize() {
            this.element.setAttribute('width', this.width);
            this.element.setAttribute('height', this.height);
          }
        }, {
          key: 'reposition',

          /**
           * repositions the canvas
           */
          value: function reposition() {
            this.element.style.top = this.y + 'px';
            this.element.style.left = this.x + 'px';
          }
        }, {
          key: 'width',

          /**
           * Sets the width of the canvas then modifies the width attribute of the element
           * @param  {number} width 
           */
          set: function set(width) {
            babelHelpers.set(Object.getPrototypeOf(Canvas.prototype), 'width', width, this);
            this.element.setAttribute('width', width);
          },
          get: function get() {
            return babelHelpers.get(Object.getPrototypeOf(Canvas.prototype), 'width', this);
          }
        }, {
          key: 'height',

          /**
           * Sets the height of the canvas then modifies the height attribute of the element
           * @param  {number} height 
           */
          set: function set(height) {
            babelHelpers.set(Object.getPrototypeOf(Canvas.prototype), 'height', height, this);
            this.element.setAttribute('height', height);
          },
          get: function get() {
            return babelHelpers.get(Object.getPrototypeOf(Canvas.prototype), 'height', this);
          }
        }]);
        return Canvas;
      })(Positionable);

      _export('default', Canvas);
    }
  };
});

System.register('src/image-loader/image-loader.js', ['node_modules/ramda/src/reduce.js', 'node_modules/ramda/src/map.js', 'node_modules/ramda/src/filter.js', 'node_modules/ramda/src/forEach.js', 'src/image-loader/url-loader.js', 'src/image-loader/data-url-loader.js', 'src/id-generator.js'], function (_export) {
  'use strict';

  var reduce, map, filter, forEach, urlLoader, dataUrlLoader, idGenerator, imageIdGenerator, loaders, ImageLoader;
  return {
    setters: [function (_node_modulesRamdaSrcReduceJs) {
      reduce = _node_modulesRamdaSrcReduceJs['default'];
    }, function (_node_modulesRamdaSrcMapJs) {
      map = _node_modulesRamdaSrcMapJs['default'];
    }, function (_node_modulesRamdaSrcFilterJs) {
      filter = _node_modulesRamdaSrcFilterJs['default'];
    }, function (_node_modulesRamdaSrcForEachJs) {
      forEach = _node_modulesRamdaSrcForEachJs['default'];
    }, function (_srcImageLoaderUrlLoaderJs) {
      urlLoader = _srcImageLoaderUrlLoaderJs['default'];
    }, function (_srcImageLoaderDataUrlLoaderJs) {
      dataUrlLoader = _srcImageLoaderDataUrlLoaderJs['default'];
    }, function (_srcIdGeneratorJs) {
      idGenerator = _srcIdGeneratorJs['default'];
    }],
    execute: function () {
      imageIdGenerator = idGenerator('Image');
      loaders = [urlLoader, dataUrlLoader];

      ImageLoader = (function () {
        function ImageLoader() {
          babelHelpers.classCallCheck(this, ImageLoader);

          this.images = new Map();

          this.queued = [];
        }

        babelHelpers.createClass(ImageLoader, [{
          key: 'get',

          /**
           * Gets the image fro mthe specified key
           * @param  {string} name The key used to store the image
           * @return {[type]}      [description]
           */
          value: function get(name) {
            return this.images.get(name);
          }
        }, {
          key: 'add',

          /**
           * Adds an image to the map
           * @param {string} name  - a name that can be used with .get to get the image
           * @param {Imge Element} image A fully loaded DOM Image element.
           *
           * @returns {Image Element} The Image element being saved
           */
          value: function add(name, image) {
            this.images.set(name, image);

            return image;
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
          key: 'queue',

          /**
           * Add an image to the queue to be loaded at a later time
           * @param  {string} src  - the url (or data url) to load
           * @param  {string} [name='Image0...n'] The key to store the image agaist in the ImageLoader.images Map
           *
           * @returns {string} The key that can be used to get the image.
           */
          value: function queue(src) {
            var name = arguments.length <= 1 || arguments[1] === undefined ? imageIdGenerator.next().value : arguments[1];

            var loader = this.__prepareForLoad(src, name);

            loader && this.queued.push(loader);

            return name;
          }
        }, {
          key: 'processQueue',

          /**
           * Load the queued images and empty the queue 
           * @return {Promise} Resolved with the results of all the queued images
           */
          value: function processQueue() {
            var _this = this;

            return Promise.all(map(function (loader) {
              return loader.load();
            }, this.queued)).then(function (result) {
              _this.emptyQueue();return result;
            })['catch'](function (err) {
              return console.log('ImageLoader:', err);
            });
          }
        }, {
          key: 'emptyQueue',

          /**
           * Removes every queued image load
           * @return {[type]} [description]
           */
          value: function emptyQueue() {
            this.queued.splice(0);
          }
        }, {
          key: 'load',

          /**
           * Loads an image
           * @param  {[type]} src - a url (or data url) of the image to load
           * @param  {string} [name='Image0...n'] The key to store the image agaist in the ImageLoader.images Map
           * @return {Promise} Resolved with the Image element (with its name property set to _name_) or rejected with the loaders failure error
           */
          value: function load(src) {
            var name = arguments.length <= 1 || arguments[1] === undefined ? imageIdGenerator.next().value : arguments[1];

            var loader = this.__prepareForLoad(src, name);
            return loader.load().then(function (img) {
              img.name = name;return img;
            })['catch'](function (err) {
              return console.log('ImageLoader:', err);
            });
          }
        }, {
          key: 'fromDocument',

          /**
           * stores all images found on the current document in the image loader
           * @param  {function} predicate - If you need to filter the image list
           * @param  {String} [nameProp='name']  - Property of the image element to use as a key in the ImageLoader.images Map. 
           *                                       If the value of the property is undefined, the id generator  will be used giving 'Image0..n'
           */
          value: function fromDocument(predicate) {
            var nameProp = arguments.length <= 1 || arguments[1] === undefined ? 'name' : arguments[1];

            var images = predicate ? fiter(predicate, document.images) : document.images;

            if (!images.length) return;

            forEach(this.set(img[nameProp] || imageIdGenerator.next().value, img), images);
          }
        }, {
          key: '__prepareForLoad',
          value: function __prepareForLoad(src) {
            var _this2 = this;

            var name = arguments.length <= 1 || arguments[1] === undefined ? imageIdGenerator.next().value : arguments[1];

            var test = function test(result, loaderDef) {
              if (result) return result;

              var loader = {
                name: name,
                load: function load() {
                  return loaderDef.loader(src).then(function (img) {
                    _this2.add(name, img);return img;
                  });
                }
              };

              return loaderDef.predicate(src) ? loader : result;
            };

            return reduce(test, undefined, loaders);
          }
        }]);
        return ImageLoader;
      })();

      _export('default', ImageLoader);
    }
  };
});

System.register('src/typekwondo.js', ['src/image-loader/image-loader.js', 'node_modules/just-debounce/index.js', 'src/canvas/canvas.js', 'src/message-bus.js', 'src/sprite.js'], function (_export) {
  'use strict';

  var ImageLoader, debounce, Canvas, messageBus, Sprite, imageLoader, background, backgroundCanvas;

  function renderBackground() {
    backgroundCanvas.context.drawImage(background.image, background.x, background.y, backgroundCanvas.width, backgroundCanvas.height);
  }

  function onViewportResize() {
    backgroundCanvas.height = document.body.offsetHeight;
    backgroundCanvas.width = document.body.offsetWidth;
    renderBackground();
  }

  return {
    setters: [function (_srcImageLoaderImageLoaderJs) {
      ImageLoader = _srcImageLoaderImageLoaderJs['default'];
    }, function (_node_modulesJustDebounceIndexJs) {
      debounce = _node_modulesJustDebounceIndexJs['default'];
    }, function (_srcCanvasCanvasJs) {
      Canvas = _srcCanvasCanvasJs['default'];
    }, function (_srcMessageBusJs) {
      messageBus = _srcMessageBusJs['default'];
    }, function (_srcSpriteJs) {
      Sprite = _srcSpriteJs['default'];
    }],
    execute: function () {
      imageLoader = new ImageLoader();
      background = new Sprite('background');
      backgroundCanvas = new Canvas('background');

      document.body.appendChild(backgroundCanvas.element);

      imageLoader.load('images/dojo_background.jpg', 'background').then(function (img) {
        background.image = img;renderBackground();
      }).then(onViewportResize);window.onresize = debounce(onViewportResize, 100);
    }
  };
});

})
(function(factory) {
  factory();
});