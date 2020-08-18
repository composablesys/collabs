window["Compoventuals"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/assert/assert.js":
/*!***********************************************!*\
  !*** (webpack)/node_modules/assert/assert.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var objectAssign = __webpack_require__(/*! object-assign */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/object-assign/index.js");

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = __webpack_require__(/*! util/ */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/util/util.js");
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buildin/global.js */ "../../../../../../compoventuals_extra/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/object-assign/index.js":
/*!*****************************************************!*\
  !*** (webpack)/node_modules/object-assign/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/process/browser.js":
/*!*************************************************!*\
  !*** (webpack)/node_modules/process/browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*****************************************************************************!*\
  !*** (webpack)/node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/util/support/isBufferBrowser.js":
/*!**************************************************************!*\
  !*** (webpack)/node_modules/util/support/isBufferBrowser.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/util/util.js":
/*!*******************************************!*\
  !*** (webpack)/node_modules/util/util.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/process/browser.js")))

/***/ }),

/***/ "./src/crdts/basic_crdts.ts":
/*!**********************************!*\
  !*** ./src/crdts/basic_crdts.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiValueRegister = exports.GSetCrdt = exports.MultRegisterCrdt = exports.MultRegisterInternal = exports.CounterCrdt = exports.CounterInternal = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "./src/crdts/crdt_core.ts");
/**
 * Operations, messages, and descriptions are all just the
 * number to add/added.
 * TODO: optimize away 0 adds?
 */
class CounterInternal {
    create(initialData) {
        if (initialData !== undefined)
            return initialData;
        else
            return 0;
    }
    prepare(operation, _state) {
        return operation;
    }
    effect(message, state, _replicaId, _timestamp) {
        return [state + message, message];
    }
}
exports.CounterInternal = CounterInternal;
CounterInternal.instance = new CounterInternal();
/**
 * A simple counter CRDT.
 *
 * In onchange, event.description is the number that was added.
 *
 * Warning: addition is not actually commutative if there is an
 * overflow or if you use floating point numbers.  TODO: is there a
 * better type we can use?
 */
class CounterCrdt extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, CounterInternal.instance, runtime, initialData);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n) {
        this.applyOp(n);
    }
    get value() {
        return this.state;
    }
    /**
     * Performs an equivalent add.  As a consequence,
     * counter.value += n and counter.value -= n work
     * as expected (converted to CRDT additions).
     */
    set value(newValue) {
        this.add(newValue - this.value);
    }
}
exports.CounterCrdt = CounterCrdt;
/**
 * Operations, messages, and descriptions are all just the
 * number to multiply/multiplied.
 * TODO: optimize away 1 mults?
 */
class MultRegisterInternal {
    create(initialData) {
        if (initialData !== undefined)
            return initialData;
        else
            return 1;
    }
    prepare(operation, _state) {
        return operation;
    }
    effect(message, state, _replicaId, _timestamp) {
        return [state * message, message];
    }
}
exports.MultRegisterInternal = MultRegisterInternal;
MultRegisterInternal.instance = new MultRegisterInternal();
/**
 * A simple numerical register CRDT with multiplication operations.
 *
 * In onchange, event.description is the number that was multiplied.
 *
 * Warning: multiplication is not actually commutative if there is an
 * overflow or if you use floating point numbers.  TODO: is there a
 * better type we can use?
 */
class MultRegisterCrdt extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, MultRegisterInternal.instance, runtime, initialData);
    }
    mult(n) {
        this.applyOp(n);
    }
    get value() {
        return this.state;
    }
    /**
     * Performs an equivalent multiplication.  As a consequence,
     * register.value *= n and register.value /= n work
     * as expected (converted to CRDT multiplications).
     * Throws an error if the current value is 0.
     */
    set value(newValue) {
        if (this.value === 0) {
            if (newValue !== 0) {
                throw new Error("Impossible to set to nonzero value when current value is zero");
            }
            else
                return; // 0 -> 0 is no-op
        }
        this.mult(newValue / this.value);
    }
}
exports.MultRegisterCrdt = MultRegisterCrdt;
// export class CounterModInternal implements CrdtInternal<number> {
//     constructor(readonly modulus: number) {
//         if (modulus < 0) throw new Error("modulus is negative: " + modulus);
//     }
//     create(initialData?: number): number {
//         if (initialData !== undefined) return initialData;
//         else return 0;
//     }
//     prepare(operation: number, _state: number): number {
//         return this.mod(operation);
//     }
//     effect(message: number, state: number, _replicaId: any, _timestamp: CausalTimestamp): [number, number] {
//         return [this.mod(state + message), message];
//     }
//     mod(x: number): number {
//         if (x >= 0) return x % this.modulus;
//         else return this.modulus - ((-x) % this.modulus);
//     }
// }
/**
 * Operations and messages are the element to add.  TODO:
 * this means that adding null won't work as GSetCrdt will treat
 * its message as a no-op.  Description is the element added
 * (if it's redundant, description is null, so onchange won't
 * see anything).
 */
class GSetInternal {
    create(initialData) {
        if (initialData)
            return new Set(initialData);
        else
            return new Set();
    }
    prepare(operation, state) {
        if (state.has(operation))
            return null;
        else
            return operation;
    }
    effect(message, state, _timestamp) {
        if (state.has(message)) {
            // does nothing
            return [state, null];
        }
        else {
            state.add(message);
            return [state, message];
        }
    }
}
GSetInternal.instance = new GSetInternal();
/**
 * A grow-only set.
 *
 * In onchange, event.description is the array of elements added
 * ([] or [added element]).
 *
 * TODO: adding a null value will be ignored.
 * TODO: add a type annotation
 * TODO: same interface as JS Set
 */
class GSetCrdt extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, GSetInternal.instance, runtime, initialData);
    }
    add(element) {
        this.applyOp(element);
    }
    /**
     * @return The current set.  This should be treated as immutable.
     */
    get value() {
        return new Set(this.state);
    }
}
exports.GSetCrdt = GSetCrdt;
class MultiValueRegisterInternal {
    /**
     * @param  initialData An initial value to set.
     */
    create(initialData) {
        if (initialData !== undefined)
            return new Set([[initialData, null, -1]]);
        else
            return new Set();
    }
    /**
     * Operations:
     * - ["set", value]: set to the given single value.
     * - ["reset"]: reset, setting the value set to [].
     * @param  operation [description]
     * @param  _state    [description]
     * @return           [description]
     */
    prepare(operation, _state, _replicaId) {
        if (!((operation[0] === "set" && operation[1] !== undefined)
            || operation[0] === "reset")) {
            throw new Error("Unrecognized operation: " + JSON.stringify(operation));
        }
        return operation;
    }
    /**
     * Returned description is:
     * - for set message, ["set", set value] (even if it
     * doesn't eliminate all causally prior values).
     * - for resets, ["reset"].
     */
    effect(message, state, _replicaId, timestamp) {
        if (!((message[0] === "set" && message[1] !== undefined)
            || message[0] === "reset")) {
            throw new Error("Unrecognized message: " + JSON.stringify(message));
        }
        let vc = timestamp.asVectorClock();
        for (let value of state) {
            if (value[1] === null)
                state.delete(value); //initial element
            else {
                let vcEntry = vc.get(value[1]);
                if (vcEntry !== undefined && vcEntry >= value[2])
                    state.delete(value);
            }
        }
        if (message[0] === "set") {
            state.add([message[1], timestamp.getSender(), timestamp.getSenderCounter()]);
        }
        return [state, message];
    }
}
MultiValueRegisterInternal.instance = new MultiValueRegisterInternal();
class MultiValueRegister extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, MultiValueRegisterInternal.instance, runtime, initialData);
    }
    set value(value) {
        this.applyOp(["set", value]);
    }
    get valueSet() {
        let values = new Set();
        for (let value of this.state)
            values.add(value[0]);
        return values;
    }
    reset() {
        this.applyOp(["reset"]);
    }
    getUniversalResetMessage() {
        return ["reset"];
    }
}
exports.MultiValueRegister = MultiValueRegister;


/***/ }),

/***/ "./src/crdts/crdt_core.ts":
/*!********************************!*\
  !*** ./src/crdts/crdt_core.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Crdt = exports.CrdtChangeEvent = void 0;
/**
 * An event issued when a CRDT is changed by another replica.
 * @param caller      The Crdt instance that was changed.
 * @param description An implementation-specific descrption of the change.
 * @param timestamp   The causal timestamp of the change. Note that
 * because several CRDTs can share the same runtime, timestamps
 * may not be continguous (e.g., entries in their vector clocks
 * might skip numbers).  However, causally ordered delivery is
 * still guaranteed.
 */
class CrdtChangeEvent {
    constructor(caller, description, timestamp) {
        this.caller = caller;
        this.description = description;
        this.timestamp = timestamp;
    }
}
exports.CrdtChangeEvent = CrdtChangeEvent;
// User-facing wrappers around CRDTs should extend this class,
// adding methods for the CRDT's operations (e.g., increment())
// which call this class's apply method.
/**
 * Base class for application-facing CRDT implementations.
 * Instead of exposing CrdtInternal implementations directly,
 * which have an unfriendly prepare/effect interface,
 * each CRDT implementation should define a subclass of this
 * class with ordinary-looking methods to perform operations
 * and query the state.  Methods performing operations should
 * call applyOp with the corresponding CrdtInternal operation.
 * This class then automatically handles sending and receiving
 * of messages.
 * Cf. Algorithm 1 in the semidirect product paper.
 * @param S The state type of C.
 */
class Crdt {
    /**
     * [constructor description]
     * @param id      An id for this CRDT.  All CRDTs using the
     * same CrdtRuntime must have distinct ids, and the ids must
     * be the same for all replicas of a given CRDT, in order
     * for the CrdtRuntime to route messages to them properly.
     * @param crdtInternal    The CrdtInternal to use.  Note that since
     * CrdtInternal's don't store states, multiple objects may
     * share the same CrdtInternal instance.
     * @param runtime The CrdtRuntime to use for sending and
     * receiving messages.
     * @param initialData  Optional initial data to use when
     * setting the CrdtInternal's initial state.
     */
    constructor(id, crdtInternal, runtime, initialData) {
        this.id = id;
        this.crdtInternal = crdtInternal;
        this.runtime = runtime;
        /**
         * Set this to listen for when another replica updates
         * this object's state.
         */
        this.onchange = ((_) => { });
        // TODO: describe "transactions".  Right word?  Rename
        // "atomic" stuff below.  Must happen synchronously so
        // that runtime.getTimestamp() doesn't change and
        // no messages are received in the interim.
        // Allow caller to start/end transactions?
        this.inTransaction = false;
        this.transactionMessages = [];
        this.transactionDescriptions = [];
        this.state = this.crdtInternal.create(initialData);
        this.runtime.register(this, this.id);
    }
    startTransaction() {
        if (this.inTransaction) {
            throw new Error("A transaction is already in progress.");
        }
        this.inTransaction = true;
    }
    // TODO: Returns the descriptions (translated)
    endTransaction() {
        if (!this.inTransaction) {
            throw new Error("No transaction is in progress.");
        }
        if (this.transactionMessages.length !== 0) {
            this.runtime.send(this.transactionMessages, this.id);
        }
        let descriptions = this.transactionDescriptions;
        this.inTransaction = false;
        this.transactionMessages = [];
        this.transactionDescriptions = [];
        if (descriptions.length === 0)
            return null;
        else
            return this.translateDescriptions(descriptions);
    }
    /**
     * Apply the given operation to the state, using prepare and effect,
     * and sends the generated message over the network.
     * If a transaction is in progress, this sending is delayed
     * until
     * @param  operation The operation to apply.
     * @return           The description of the changes.
     * This is the list of individual message descriptions returned by
     * effect (skipping null messages),
     * after being passed through translateDescription.  An exception
     * is that if all messages are
     * null, null is returned without calling translateDescription.
     * TODO: null if in a transaction (use endTransaction instead).
     * TODO: but what if we want it to decide what to do next?
     */
    applyOp(operation) {
        let ownTransaction = false;
        if (!this.inTransaction) {
            ownTransaction = true;
            this.startTransaction();
        }
        let timestamp = this.runtime.getNextTimestamp(this.id);
        let message = this.crdtInternal.prepare(operation, this.state, this.runtime.getReplicaId());
        if (message !== null) {
            this.transactionMessages.push(message);
            let result = this.crdtInternal.effect(message, this.state, this.runtime.getReplicaId(), timestamp);
            this.state = result[0];
            this.transactionDescriptions.push(result[1]);
        }
        if (ownTransaction)
            return this.endTransaction();
        else
            return null;
    }
    /**
     * Override this to translate the descriptions returned by the
     * CrdtInternal before passing it to onchange.  This is
     * useful for semidirect products because the default
     * SemidirectInternal descriptions are not user-friendly.
     * If this method returns null, onchange is not called.
     *
     * The default implemention returns descriptions[0].  It is
     * appropriate when this.crdtInternal.effect already returns
     * user-friendly descriptions and applyOps is only ever called
     * with single operations.
     *
     * @param  descriptions A list of the descriptions returned by
     * this.crdtInternal.effect.  This will always be non-empty.
     * @return The translated description to pass to this.onchange,
     * or null if this.onchange should not be called.
     */
    translateDescriptions(descriptions) {
        return descriptions[0];
    }
    /**
     * Override this to implement non-trivial observed resets
     * for when a CrdtObject containing this Crdt is
     * reset.  The
     * default returns null, so such map resets do nothing.
     * @return A message (not operation) that can be applied to
     * this Crdt together with any timestamp
     * to cause an observed-reset operation, or null to do
     * nothing.  For this Crdt
     * to be correct (eventually consistent) when used as a
     * property in an CrdtObject, the returned message
     * must satisfy:
     * - when paired with any CausalTimestamp, it commutes with
     * concurrent messages (usual Crdt requirement), including
     * concurrent resets and strong-resets.
     * - when applied to a state which has not received any
     * messages causally prior to the timestamp, it has
     * no effect.  In other words, applying it to a concurrently
     * initialized state has no effect.
     * Otherwise, it is free to have any semantics, including
     * doing nothing.  However, the intent is that it
     * at least approximates
     * the observed-reset semantics.
     *
     * TODO: return list of messages instead, for generality?
     */
    getUniversalResetMessage() {
        return null;
    }
    /**
     * Override this to implement nontrivial observed-resets.
     * Unlike getUniversalResetMessage(), there are no special
     * requirements (other than the usual Crdt commutativity).
     * However, the intent is that it
     * at least approximates
     * the observed-reset semantics.
     */
    reset() { }
    /**
     * Override this to implement nontrivial strong-resets.
     * Unlike getUniversalResetMessage(), there are no special
     * requirements (other than the usual Crdt commutativity).
     * However, the intent is that it
     * at least approximates
     * the strong-reset semantics.
     */
    resetStrong() { }
    // /**
    //  * Override this to implement non-trivial strong resets.  The
    //  * default returns null, so resets do nothing.
    //  * @return A message (not operation) that can be applied to
    //  * this Crdt together with any timestamp
    //  * to cause a strong-reset operation, or null to do
    //  * nothing.  For this Crdt
    //  * to be correct (eventually consistent) when used as a
    //  * property in an CrdtObject, the returned message
    //  * must satisfy:
    //  * - when paired with any CausalTimestamp, it commutes with
    //  * concurrent messages (usual Crdt requirement), including
    //  * concurrent resets and strong-resets.
    //  * Otherwise, it is free to have any semantics, including
    //  * doing nothing.  However, the intent is that it
    //  * at least approximates
    //  * the strong-reset semantics.
    //  */
    // getUniversalResetStrongMessage(): any {
    //     return null;
    // }
    /**
     * Callback for this.runtime when an atomic list of
     * messages is received from another replica.
     */
    receive(messages, timestamp) {
        if (this.inTransaction) {
            throw new Error("In transaction; the transaction must " +
                "be ended synchronously so that messages " +
                "cannot be received in the interim.");
        }
        let descriptions = [];
        for (let message of messages) {
            let result = this.crdtInternal.effect(message, this.state, this.runtime.getReplicaId(), timestamp);
            this.state = result[0];
            descriptions.push(result[1]);
        }
        if (this.onchange && descriptions.length !== 0) {
            let translated = this.translateDescriptions(descriptions);
            if (translated !== null) {
                this.onchange(new CrdtChangeEvent(this, translated, timestamp));
            }
        }
    }
}
exports.Crdt = Crdt;


/***/ }),

/***/ "./src/crdts/json.ts":
/*!***************************!*\
  !*** ./src/crdts/json.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCrdt = void 0;
const standard_1 = __webpack_require__(/*! ./standard */ "./src/crdts/standard.ts");
const basic_crdts_1 = __webpack_require__(/*! ./basic_crdts */ "./src/crdts/basic_crdts.ts");
class JsonCrdt extends standard_1.CrdtObject {
    // TODO: arrays (sequences).  Uses maps for now.
    // TODO: nulls?
    // TODO: ability to pass initial value (which is not synced).
    // More generally, ability to perform operations on your
    // predefined properties that are not synced?
    // Use the existing flag and block messages in CrdtObject.
    constructor(crdtId, runtime) {
        super(crdtId, runtime);
        this.startPredefinedPropertyCreation();
        this.booleans = new standard_1.MapCrdt("booleans", this, (key, internalRuntime) => new standard_1.EnableWinsFlag(key, internalRuntime));
        this.numbers = new standard_1.MapCrdt("numbers", this, (key, internalRuntime) => new standard_1.IntRegisterCrdt(key, internalRuntime));
        this.strings = new standard_1.MapCrdt("strings", this, (key, internalRuntime) => new basic_crdts_1.MultiValueRegister(key, internalRuntime));
        this.sets = new standard_1.MapCrdt("sets", this, (key, internalRuntime) => new standard_1.AddWinsSet(key, internalRuntime));
        this.objects = new standard_1.MapCrdt("objects", this, (key, internalRuntime) => new JsonCrdt(key, internalRuntime));
        this.endPredefinedPropertyCreation();
    }
    /**
     * Return the Crdt value at the given key storing
     * values with the same type as typeIndicator,
     * or undefined if the key is not present (including
     * if it previously was present but was removed).
     * (Use init instead if you want a guaranteed-defined
     * return value.)
     * (TODO: explain keys are
     * segregated by value type).
     * E.g. get("a", 0) to get the number value with key 0.
     * Standard typeIndicator values:
     * - false: boolean (EnableWinsFlag)
     * - 0: number (IntRegisterCrdt)
     * - "": string (MultiValueRegister<string>)
     * - new Set(): set (AddWinsSet)
     * - {}: object (JsonCrdt)
     *
     * TODO: explictly typed versions?  Can we do this cleverly
     * with generics and type polymorphism or something?
     *
     * @param  key           [description]
     * @param  typeIndicator [description]
     * @return               [description]
     */
    get(key, typeIndicator) {
        switch (typeof typeIndicator) {
            case "boolean": return this.booleans.get(key);
            case "number": return this.numbers.get(key);
            case "string": return this.strings.get(key);
            case "object":
                if (typeIndicator instanceof Set) {
                    return this.sets.get(key);
                }
                else
                    return this.objects.get(key);
            default:
                throw new Error("Unrecognized typeIndicator type: " +
                    (typeof typeIndicator) + " (" + typeIndicator + ")");
        }
    }
    has(key, typeIndicator) {
        switch (typeof typeIndicator) {
            case "boolean": return this.booleans.has(key);
            case "number": return this.numbers.has(key);
            case "string": return this.strings.has(key);
            case "object":
                if (typeIndicator instanceof Set) {
                    return this.sets.has(key);
                }
                else
                    return this.objects.has(key);
            default:
                throw new Error("Unrecognized typeIndicator type: " +
                    (typeof typeIndicator) + " (" + typeIndicator + ")");
        }
    }
    delete(key, typeIndicator) {
        switch (typeof typeIndicator) {
            case "boolean":
                this.booleans.delete(key);
                return;
            case "number":
                this.numbers.delete(key);
                return;
            case "string":
                this.strings.delete(key);
                return;
            case "object":
                if (typeIndicator instanceof Set) {
                    this.sets.delete(key);
                    return;
                }
                else
                    this.objects.delete(key);
                return;
            default:
                throw new Error("Unrecognized typeIndicator type: " +
                    (typeof typeIndicator) + " (" + typeIndicator + ")");
        }
    }
    /**
     * Like get, but instead of returning the value Crdt,
     * returns its value.  Note for strings, if the Crdt
     * does not have a single value (either or 2+),
     * which is possible due to the MultiValueRegister
     * semantics, we return the set of all current values
     * instead of a single string.
     *
     * TODO: use generics to say that return value is
     * same as typeIndicator type | undefined?
     * Works except for strings,
     * which could instead return a Set<string>.
     * Could instead have specifically typed versions of the method.
     */
    getValue(key, typeIndicator) {
        let valueCrdt = this.get(key, typeIndicator);
        if (valueCrdt === undefined)
            return undefined;
        else {
            if (valueCrdt instanceof basic_crdts_1.MultiValueRegister) {
                let valueSet = valueCrdt.valueSet;
                if (valueSet.size === 1) {
                    return valueSet.values().next().value;
                }
                else
                    return valueSet;
            }
            else
                return valueCrdt.value;
        }
    }
    /**
     * Initializes/revives the given key with the indicated type if
     * needed, making it present in the state
     * @param  key           [description]
     * @param  typeIndicator [description]
     * @return the value Crdt.
     */
    init(key, typeIndicator) {
        // TODO: can we generify this function pattern?
        switch (typeof typeIndicator) {
            case "boolean": return this.booleans.init(key);
            case "number": return this.numbers.init(key);
            case "string": return this.strings.init(key);
            case "object":
                if (typeIndicator instanceof Set) {
                    return this.sets.init(key);
                }
                else
                    return this.objects.init(key);
            default:
                throw new Error("Unrecognized typeIndicator type: " +
                    (typeof typeIndicator) + " (" + typeIndicator + ")");
        }
    }
    /**
     * Sets the value at the given key to a copy of the given
     * (non-Crdt) value, using the Crdt's .value = method.
     * This generally has the effect of resetting the current Crdt
     * and then performing operations to drive it to the desired
     * value.  If you want more control over how the value is set
     * (e.g., passing an option to JsonCrdt.getAsObject when setting
     * an object's value), you can instead get the Crdt with
     * this.init(key, value) and then perform operations on it
     * directly.
     *
     * @param  key           [description]
     * @param  value [description]
     * @return The resulting value Crdt (this.get(key, value)).
     */
    setValue(key, value) {
        this.startTransaction();
        let valueCrdt = this.setValueInternal(key, value);
        this.endTransaction();
        return valueCrdt;
    }
    setValueInternal(key, value) {
        let valueCrdt = this.init(key, value);
        valueCrdt.value = value;
        return valueCrdt;
    }
    keysByType(typeIndicator) {
        switch (typeof typeIndicator) {
            case "boolean": return this.booleans.keys();
            case "number": return this.numbers.keys();
            case "string": return this.strings.keys();
            case "object":
                if (typeIndicator instanceof Set) {
                    return this.sets.keys();
                }
                else
                    return this.objects.keys();
            default:
                throw new Error("Unrecognized typeIndicator type: " +
                    (typeof typeIndicator) + " (" + typeIndicator + ")");
        }
    }
    /**
     * @return Array of [key, type name] pairs
     */
    keys() {
        let result = [];
        for (let key of this.booleans.keys())
            result.push([key, "boolean"]);
        for (let key of this.numbers.keys())
            result.push([key, "number"]);
        for (let key of this.strings.keys())
            result.push([key, "string"]);
        for (let key of this.sets.keys())
            result.push([key, "set"]);
        for (let key of this.objects.keys())
            result.push([key, "object"]);
        return result;
    }
    static checkKeyConflictRule(keyConflictRule) {
        if (!(keyConflictRule === JsonCrdt.PrefixTypes ||
            keyConflictRule === JsonCrdt.ErrorOnConflict ||
            keyConflictRule === JsonCrdt.ExpandOnConflict)) {
            throw new Error("Unrecognized keyConflictRule: " +
                keyConflictRule);
        }
    }
    /**
     * Returns a copy of this Crdt's value in Object form.
     * Changing the returned value has no effect on the Crdt state.
     * Note that set values are converted to Javascript Sets,
     * resulting in a not-quite-JSON format object.
     * A string MultiValueRegister is converted to a string if it has
     * a single value; otherwise (0 or 2+ values) it
     * is converted to a Set<string>
     * (Array<string> if setsAsArrays=true)
     * of all current values.
     *
     * @param  keyConflictRule=JsonCrdt.ExpandOnConflict
     * Policy for handling keys of different types that have the
     * same name.  Options:
     * - ErrorOnConflict (default): throw an error if there is a key conflict.
     * - PrefixTypes: prefix the type name followed by ":" to each key,
     * e.g. "number:myKey".  Type names are "boolean", "number",
     * "string", "set", "object".
     * - ExpandOnConflict: if there is a conflict on
     * a key, set its value to equal an object containing each of
     * the conflicting values, plus a flag "jsonCrdtKeyExpanded = true".  E.g.
     * "myKey": {"jsonCrdtKeyExpanded": true, "string": "stringValue",
     * "number": 7}
     * @param setsAsArrays = false If true, Set values are converted
     * to arrays, so that the resulting Object is in regular JSON
     * format.  This includes Set<string> values resulting from
     * string MultiValueRegisters that have 0 or 2+ values.
     */
    getAsObject(keyConflictRule = JsonCrdt.ErrorOnConflict, setsAsArrays = false) {
        JsonCrdt.checkKeyConflictRule(keyConflictRule);
        let object = {};
        // Maps keys to the name of their first type
        let keysSoFar = new Map();
        let conflictedKeysSoFar = new Set();
        this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar, keyConflictRule, this.booleans, "boolean", value => value.value);
        this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar, keyConflictRule, this.numbers, "number", value => value.value);
        this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar, keyConflictRule, this.strings, "string", value => {
            let result = value.valueSet;
            if (result.size === 1)
                return result.values().next().value;
            else
                return (setsAsArrays ? [...result.values()] : result);
        });
        this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar, keyConflictRule, this.sets, "set", value => (setsAsArrays ? [...value.value] : value.value));
        this.getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar, keyConflictRule, this.objects, "object", value => value.getAsObject(keyConflictRule, setsAsArrays));
        return object;
    }
    getAsObjectInternal(object, keysSoFar, conflictedKeysSoFar, keyConflictRule, map, typeName, valueFunc) {
        for (let key of map.keys()) {
            let value = valueFunc(map.get(key));
            if (keyConflictRule === JsonCrdt.PrefixTypes) {
                object[typeName + ":" + key] = value;
            }
            else if (keysSoFar.has(key)) {
                // Key conflict
                if (keyConflictRule === JsonCrdt.ErrorOnConflict) {
                    throw new Error("Duplicate key: " + key
                        + " when keyConflictRule=" +
                        "JsonCrdt.ErrorOnConflict");
                }
                else {
                    // keyConflictRule === JsonCrdt.ExpandOnConflict
                    if (!conflictedKeysSoFar.has(key)) {
                        // Expand the existing value
                        conflictedKeysSoFar.add(key);
                        let expanded = {
                            "jsonCrdtKeyExpanded": true,
                        };
                        expanded[keysSoFar.get(key)] = object[key];
                        object[key] = expanded;
                    }
                    object[key][typeName] = value;
                }
            }
            else {
                // No key conflict
                object[key] = value;
                keysSoFar.set(key, typeName);
            }
        }
    }
    /**
     * Resets this object and then performs operations to
     * drive its value to the given JSON-like Object.
     * Properties that are not booleans, numbers, strings,
     * Sets, or objects are ignored; objects besides Sets
     * are processed recursively.
     *
     * TODO: for now, arrays are converted to sets.
     *
     * If newValue comes from a JsonCrdt's .value or getAsObject
     * methods, note that sets/arrays of strings resulting from
     * multi-value registers will be treated as sets, not
     * string values.
     *
     * @param  newValue The value to set to.
     * @param newValueKeyConflictRule = JsonCrdt.ErrorOnConflict
     * If newValue was generated by getAsObject, the keyConflictRule
     * used to generate it, so that we can undo the effect
     * of that rule.  Options:
     * - ErrorOnConflict (default): keys and values are used literally,
     * with inferred types.
     * This is appropriate for Objects not coming from a JsonCrdt's
     * getAsObject function, in which we want to keep keys as
     * they are.
     * - PrefixTypes: Types are taken from prefixes on keys.  If a
     * key does not have a type prefix, it is ignored.
     * - ExpandOnConflict: objects with a property "jsonCrdtKeyExpanded" set
     * to true are interpreted as the result of expanding a
     * key due to a conflict.  If such an object does not have
     * the expected format, any properties with unrecognized names
     * are ignored.
     */
    setToObject(newValue, newValueKeyConflictRule = JsonCrdt.ErrorOnConflict) {
        this.startTransaction();
        this.reset();
        this.mergeObjectInternal(newValue, newValueKeyConflictRule);
        this.endTransaction();
    }
    /**
     * Perform operations to drive this Crdt's value to the
     * given JSON-like Object's state, but without resetting
     * the current value.  The main effect of this is to
     * merge keys; in case of key conflicts, the values are merged
     * in a type-specific way (TODO: details).
     *
     * Note this is not a merge in the sense of a state-based Crdt.
     * Instead, it the Crdt version of merging ordinary (non-Crdt)
     * Objects, by recursively combining their key-value pairs.
     *
     * TODO: for now, arrays are converted to sets.
     *
     * See the description of setToObject for disclaimers and
     * otherKeyConflictRule.
     *
     * TODO: return list of changes?
     * @param  other [description]
     */
    mergeObject(other, otherKeyConflictRule = JsonCrdt.ErrorOnConflict) {
        this.startTransaction();
        this.mergeObjectInternal(other, otherKeyConflictRule);
        this.endTransaction();
    }
    mergeObjectInternal(other, otherKeyConflictRule = JsonCrdt.ErrorOnConflict) {
        JsonCrdt.checkKeyConflictRule(otherKeyConflictRule);
        // Extract properties as an array of [name, type, value]
        let properties = [];
        for (let propName in other) {
            let propValue = other[propName];
            let type;
            if (otherKeyConflictRule === JsonCrdt.PrefixTypes) {
                let index = propName.indexOf(':');
                type = propName.slice(0, index);
                propName = propName.slice(index);
                // Multi-valued strings are treated as sets
                if (type === "string" && (propValue instanceof Set || propValue instanceof Array)) {
                    type = "set";
                }
            }
            else {
                type = typeof propValue;
                if (type === "object") {
                    if (propValue instanceof Set || propValue instanceof Array)
                        type = "set";
                }
            }
            properties.push([propName, type, other[propName]]);
        }
        // Note properties may grow during execution due to
        // unpacking expanded keys.
        let originalLength = properties.length;
        for (let i = 0; i < properties.length; i++) {
            let propName = properties[i][0];
            let type = properties[i][1];
            let propValue = properties[i][2];
            // Check for an expanded key
            if (otherKeyConflictRule === JsonCrdt.ExpandOnConflict &&
                i < originalLength &&
                typeof propValue === "object" &&
                propValue["jsonCrdtKeyExpanded"] === true) {
                // Unpack the object onto the end of properties
                for (let expandedName in propValue) {
                    if (expandedName !== "jsonCrdtKeyExpanded") {
                        properties.push([propName, expandedName, propValue[expandedName]]);
                    }
                }
            }
            else {
                // Process the property, checking that it's type
                // is one we expect.
                if (typeof propValue === type) {
                    if (type === "object") {
                        // object: merge
                        this.init(propName, {}).mergeObjectInternal(propValue, otherKeyConflictRule);
                    }
                    else if (type === "boolean" || type === "number" || type === "string") {
                        // boolean, number, string: overwrite
                        this.setValueInternal(propName, propValue);
                    }
                }
                else if (type === "set" && (propValue instanceof Set || propValue instanceof Array)) {
                    // set: add all values in set
                    let setCrdt = this.init(propName, new Set());
                    for (let entry of propValue)
                        setCrdt.add(entry);
                }
                // Else skip the entry (not a recognized type).
            }
        }
    }
    /**
     * Alias for this.getAsObject().
     */
    get value() {
        return this.getAsObject();
    }
    /**
     * Alias for this.setAsObject(newValue).
     */
    set value(newValue) {
        this.setToObject(newValue);
    }
}
exports.JsonCrdt = JsonCrdt;
// TODO: delete
// TODO: deleteStrong (once map supports it.  Perhaps throw
// error on map values only?)
JsonCrdt.ErrorOnConflict = 1;
JsonCrdt.PrefixTypes = 2;
JsonCrdt.ExpandOnConflict = 3;


/***/ }),

/***/ "./src/crdts/resettable.ts":
/*!*********************************!*\
  !*** ./src/crdts/resettable.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResettableCrdt = exports.ObservedResetComponent = exports.DefaultResetWinsCrdt = exports.ResetWinsComponent = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "./src/crdts/crdt_core.ts");
const semidirect_1 = __webpack_require__(/*! ./semidirect */ "./src/crdts/semidirect.ts");
// TODO: how to do garbage collection of reset-wins operations?
// E.g. for flags in a set: garbage collection will fail if
// there are reset-wins ops in the history, as it should, but
// we would like to garbage collect anyway once all the reset-wins
// are causally stable.
class ResetWinsComponent {
    constructor(originalCrdt, resetInitialData) {
        this.originalCrdt = originalCrdt;
        this.resetInitialData = resetInitialData;
    }
    create(initialData) {
        return this.originalCrdt.create(initialData);
    }
    prepare(operation, _state) {
        if (operation !== "reset") {
            throw new Error("Unrecognized operation: " +
                JSON.stringify(operation));
        }
        return "reset";
    }
    /**
     * Returned description is always "reset".
     */
    effect(message, _state, _replicaId, _timestamp) {
        if (message !== "reset") {
            throw new Error("Unrecognized message: " +
                JSON.stringify(message));
        }
        // Note we should return a clone of the reset state, not
        // a fixed "reset state", since the returned state may
        // be mutated later.
        return [this.originalCrdt.create(this.resetInitialData), "reset"];
    }
    static addTo(originalCrdt, resetInitialData) {
        return new semidirect_1.SemidirectInternal(originalCrdt, new ResetWinsComponent(originalCrdt, resetInitialData), (_m2, _m1) => null, 1, false, false, true);
    }
}
exports.ResetWinsComponent = ResetWinsComponent;
class DefaultResetWinsCrdt extends crdt_core_1.Crdt {
    /**
     * [constructor description]
     * @param id                    [description]
     * @param originalCrdtInternal  [description]
     * @param resetInitialData      [description]
     * @param runtime               [description]
     * @param initialData           [description]
     */
    constructor(id, originalCrdtInternal, resetInitialData, runtime, initialData) {
        let crdtWrapped = ResetWinsComponent.addTo(originalCrdtInternal, resetInitialData);
        super(id, crdtWrapped, runtime, initialData);
        this.originalCrdtInternalResetWins = originalCrdtInternal;
    }
    resetStrong() {
        super.applyOp([2, "reset"]);
    }
    getUniversalResetStrongMessage() {
        return [2, "reset"];
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    applyOp(operation) {
        return super.applyOp([1, operation]);
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateDescriptionsResetWins instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of a reset-wins operation is
     * ["resetStrong"], regardless of whether it changed the state.
     * - The description of an operation that gets killed by
     * a concurrent reset-wins is skipped.
     * - The description of an originalCrdtInternal
     * operations is unchanged, except for null descriptions,
     * which are skipped.
     * Then returns the result of passing this list to
     * translateDescriptionsResetWins, or null if all
     * descriptions are null.
     */
    translateDescriptions(descriptions) {
        let translated = [];
        for (let desc of descriptions) {
            if (desc === null)
                continue;
            // Reset-wins description is [2, "reset"]
            else if (desc[0] === 2 && desc[1] === "reset") {
                translated.push(["resetStrong"]);
            }
            // originalCrdtOperation is of the form [1, desc]
            else if (desc[0] === 1) {
                translated.push(desc[1]);
            }
            else {
                throw new Error("Unrecognized description: " + JSON.stringify(desc));
            }
        }
        if (translated.length === 0)
            return null;
        else
            return this.translateDescriptionsResetWins(translated);
    }
    /**
     * Override this instead of translateDescriptions.
     * See Crdt.translateDescriptions.
     */
    translateDescriptionsResetWins(descriptions) {
        return descriptions[0];
    }
    get originalStateResetWins() {
        return this.state.internalState;
    }
}
exports.DefaultResetWinsCrdt = DefaultResetWinsCrdt;
// TODO: rename originalCrdtInternal (above) and originalCrdt
// to reflect reset-wins vs reset, to avoid confusion.
class ObservedResetComponent {
    constructor(originalCrdt, resetInitialData) {
        this.originalCrdt = originalCrdt;
        this.resetInitialData = resetInitialData;
    }
    create(initialData) {
        return this.originalCrdt.create(initialData);
    }
    prepare(operation, _state) {
        if (operation !== "reset") {
            throw new Error("Unrecognized operation: " +
                JSON.stringify(operation));
        }
        return [];
    }
    /**
     * The returned description is ["reset", list of
     * the descriptions returned by originalCrdt when processing
     * the messages appearing in message (i.e., the messages that
     * avoided being reset because they were concurrent to the
     * reset operation)].
     */
    effect(message, _state, replicaId, _timestamp) {
        let resetState = this.originalCrdt.create(this.resetInitialData);
        let descriptions = [];
        for (let concurrentMessage of message) {
            let result = this.originalCrdt.effect(concurrentMessage[0], resetState, replicaId, concurrentMessage[1]);
            resetState = result[0];
            descriptions.push(result[1]);
        }
        return [resetState, ["reset", descriptions]];
    }
    static addTo(originalCrdt, resetInitialData, keepOnlyMaximal = false) {
        return new semidirect_1.SemidirectInternal(new ObservedResetComponent(originalCrdt, resetInitialData), originalCrdt, (m2, m1) => { m1.push(m2); return m1; }, 2, true, true, keepOnlyMaximal);
    }
}
exports.ObservedResetComponent = ObservedResetComponent;
class DefaultResettableCrdt extends DefaultResetWinsCrdt {
    /**
     * [constructor description]
     * @param id                    [description]
     * @param originalCrdtInternal  [description]
     * @param resetInitialData      [description]
     * @param runtime               [description]
     * @param initialData           [description]
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(id, originalCrdtInternal, resetInitialData, runtime, initialData, keepOnlyMaximal = false) {
        let crdtWrapped = ObservedResetComponent.addTo(originalCrdtInternal, resetInitialData, keepOnlyMaximal);
        super(id, crdtWrapped, resetInitialData, runtime, initialData);
        this.originalCrdtInternal = originalCrdtInternal;
    }
    reset() {
        // Ignore the op if we're already reset (okay given
        // observe-reset semantics).
        if (!this.state.internalState.isHistoryEmpty()) {
            super.applyOp([1, "reset"]);
        }
    }
    getUniversalResetMessage() {
        // Note here we have to account for the reset-wins layer
        // (it's not wrapped automatically like in super.applyOps).
        return [1, [1, []]];
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    applyOp(operation) {
        return super.applyOp([2, operation]);
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateDescriptionsResettable instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of an observed-reset operation is
     * ["reset", [TODO: re-applied ops]].
     * - The description of an originalCrdtInternal
     * is unchanged, except for null descriptions, which
     * are skipped.
     * Then returns the result of passing this list to
     * translateDescriptionsResettable, or null if all
     * descriptions are null.
     */
    translateDescriptionsResetWins(descriptions) {
        let translated = [];
        for (let desc of descriptions) {
            if (desc === null)
                continue;
            // Reset-strong (already translated by DefaultResetWinsCrdt)
            // description is "resetStrong"
            else if (desc[0] === "resetStrong") {
                translated.push(desc);
            }
            // Observed reset description is [1, ["reset",
            // list of re-applied ops]]
            else if (desc[0] === 1 && desc[1][0] === "reset") {
                // TODO: in the second entry, put the translated
                // operations that didn't get reset.  Keep in
                // mind that these will be descriptions from the
                // innermost semidirect product.  What to do
                // about operations that were originally grouped
                // atomically, since translate expects those
                // to be delivered together?
                translated.push(["reset", desc[1][1]]);
            }
            // originalCrdtOperation is of the form [2, desc]
            else if (desc[0] === 2) {
                translated.push(desc[1]);
            }
            else {
                throw new Error("Unrecognized description: " + JSON.stringify(desc));
            }
        }
        if (translated.length === 0)
            return null;
        else
            return this.translateDescriptionsResettable(translated);
    }
    /**
     * Override this instead of translateDescriptions.
     * See Crdt.translateDescriptions.
     */
    translateDescriptionsResettable(descriptions) {
        return descriptions[0];
    }
    get originalStateResettable() {
        return this.state.internalState.internalState;
    }
}
exports.DefaultResettableCrdt = DefaultResettableCrdt;


/***/ }),

/***/ "./src/crdts/semidirect.ts":
/*!*********************************!*\
  !*** ./src/crdts/semidirect.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectInternal = exports.SemidirectInternal = exports.SemidirectState = void 0;
// TODO: future opts: indexed messages; setting the history
// to a subset; causal stability.
// TODO: for this to work, replicaId's must be comparable according
// to the same-equals approach.  Typically, this requires them
// to be primitive types, as objects which are equal-valued but have
// different pointers will be considered different.
// TODO: mention that to get a proper CRDT (equal internal states),
// we technically must compare receipt orders as equivalent if
// they are both in causal order.
class SemidirectState {
    constructor(internalState, historyTimestamps, historyDiscard1Dominated, historyDiscard2Dominated) {
        this.internalState = internalState;
        this.historyTimestamps = historyTimestamps;
        this.historyDiscard1Dominated = historyDiscard1Dominated;
        this.historyDiscard2Dominated = historyDiscard2Dominated;
        this.receiptCounter = 0;
        /**
         * Maps a replica id to an array of messages sent by that
         * replica, in order.  Specifically, array elements are tuples
         * [per-sender message counter, this replica's receipt counter,
         * message].  Keep in mind that per-sender message
         * counters may not be contiguous, since they are shared between
         * all Crdts with a given CrdtRuntime and between
         * a semidirect product and its components.
         */
        this.history = new Map();
    }
    /**
     * Add message to the history with the given timestamp.
     * replicaId is our replica id.
     */
    add(replicaId, message, timestamp) {
        if (this.historyDiscard2Dominated) {
            this.processTimestamp(replicaId, timestamp, false, true);
        }
        let senderHistory = this.history.get(timestamp.getSender());
        if (senderHistory === undefined) {
            senderHistory = [];
            this.history.set(timestamp.getSender(), senderHistory);
        }
        let messageMaybeWithTimestamp = this.historyTimestamps ?
            [message, timestamp] : message;
        senderHistory.push([timestamp.getSenderCounter(), this.receiptCounter, messageMaybeWithTimestamp]);
        this.receiptCounter++;
    }
    /**
     * Return all messages in the history concurrent to the given
     * timestamp, in some causal order (specifically, this replica's
     * receipt order).  If we are the sender (i.e., replicaId ===
     * timestamp.getSender()), it is assumed that the timestamp is
     * causally greater than all prior messages, as described in
     * CrdtInternal.effect, hence [] is returned.
     */
    getConcurrent(replicaId, timestamp) {
        return this.processTimestamp(replicaId, timestamp, true, this.historyDiscard1Dominated);
    }
    /**
     * Performs specified actions on all messages in the history:
     * - if returnConcurrent is true, returns the list of
     * all messages in the history concurrent to timestamp, in
     * receipt order.
     * - if discardDominated is true, deletes all messages from
     * the history whose timestamps are causally dominated by
     * or equal to the given timestamp.  (Note that this means that
     * if we want to keep a message with the given timestamp in
     * the history, it must be added to the history after calling
     * this method.)
     */
    processTimestamp(replicaId, timestamp, returnConcurrent, discardDominated) {
        if (replicaId === timestamp.getSender()) {
            if (discardDominated) {
                // Nothing's concurrent, so clear everything
                this.history.clear();
            }
            return [];
        }
        // Gather up the concurrent messages.  These are all
        // messages by each replicaId with sender counter
        // greater than timestamp.asVectorClock().get(replicaId).
        let concurrent = [];
        let vc = timestamp.asVectorClock();
        for (let entry of vc.entries()) {
            let senderHistory = this.history.get(entry[0]);
            if (senderHistory !== undefined) {
                let concurrentIndexStart = SemidirectState.indexAfter(senderHistory, entry[1]);
                if (returnConcurrent) {
                    for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
                        concurrent.push(senderHistory[i]);
                    }
                }
                if (discardDominated) {
                    // Keep only the messages with index
                    // >= concurrentIndexStart
                    senderHistory.splice(0, concurrentIndexStart);
                    // TODO: delete it from the map if empty,
                    // as a form of garbage collection.
                    // This also makes isHistoryEmpty simpler.
                }
            }
        }
        if (returnConcurrent) {
            // Sort the concurrent messages in receipt order (i.e.,
            // by the second entry in each triple).
            concurrent.sort((a, b) => (a[1] - b[1]));
            // Strip away everything except the messages.
            return concurrent.map(a => a[2]);
        }
        else
            return [];
    }
    /**
     * Returns true if there are no messages stored in the history,
     * i.e., either there have been no crd1 messages, or
     * our SemidirectInternal's historyKeepOnlyConcurrent flag is true
     * and all crdt1 messages have been causally less than a crdt2
     * message.
     */
    isHistoryEmpty() {
        for (let value of this.history.values()) {
            if (value.length !== 0)
                return false;
        }
        return true;
    }
    /**
     * Utility method for working with the per-sender history
     * arrays.  Returns the index after the last entry whose
     * per-sender counter (the first tuple element) is <=
     * value.
     */
    static indexAfter(sparseArray, value) {
        // TODO: binary search when sparseArray is large
        // Note that there may be duplicate timestamps.
        // So it would be inappropriate to find an entry whose
        // per-sender counter equals value and infer that
        // the desired index is 1 greater.
        for (let i = 0; i < sparseArray.length; i++) {
            if (sparseArray[i][0] > value)
                return i;
        }
        return sparseArray.length;
    }
}
exports.SemidirectState = SemidirectState;
class SemidirectInternal {
    /**
     * CrdtInternal implementing the semidirect product of
     * crdt1 and crdt2 with the given action, which is a function
     * (m2: crdt2 message, m1: crdt1 message): crdt1 message.
     * crdt1, crdt2, and action must satisfy the semidirect product
     * assumptions from our paper.
     *
     * TODO: options and their theoretical significance.  Formally,
     * historyTimestamps = true means that timestamps become
     * part of the crdt2 messages.  Also createCrdtIndex.
     * Dominated stats control whether you discard messages in the
     * history that are causally dominated by crdt1/crdt2 messages;
     * need to ensure that action is the same with those messages
     * discarded.  If dominated1 is set, then state.isHistoryEmpty()
     * becomes (there exists a crdt2 message not causally dominated by a
     * crdt1 message).  Check this is still true if dominated2 is set.)
     * Explain examples where this is used (resettable, flags); it's
     * not quite in the semidirect product spirit unless you think
     * of it as using the history as part of the crdt1/2 state.
     * Potential optimization: only delete dominated messages when
     * receiving our own message (it's basically free and always
     * clears the history), or only sometimes (will miss some
     * messages, so need to ensure correctness in that case
     * (I think it is okay for dominated2 but not dominated1 in our
     * target use cases), but
     * should be more efficient due to batching and still kill
     * off most messages).  This trades a small increase in space
     * usage for a decrease in CPU time.
     *
     * As described in CrdtInternal and Crdt, null messages are treated
     * as the identity function id, allowing them to be optimized away.
     * Because of this, action will never be called with null as
     * either input.  Instead, we behave as if
     * (action(id (i.e., null), m1) = m1)
     * for all m1 and (action(m2, id) = id) for all m2.  The semidirect
     * product assumptions must hold given these assignments.
     */
    constructor(crdt1, crdt2, action, createCrdtIndex, historyTimestamps = false, historyDiscard1Dominated = false, historyDiscard2Dominated = false) {
        this.crdt1 = crdt1;
        this.crdt2 = crdt2;
        this.action = action;
        this.createCrdtIndex = createCrdtIndex;
        this.historyTimestamps = historyTimestamps;
        this.historyDiscard1Dominated = historyDiscard1Dominated;
        this.historyDiscard2Dominated = historyDiscard2Dominated;
        if (createCrdtIndex !== 1 && createCrdtIndex !== 2) {
            throw new Error("Bad createCrdtIndex (must be 1 or 2):" +
                createCrdtIndex);
        }
    }
    /**
     * @param  initialData Initial data used to initialize this.crdt1.
     * @return
     */
    create(initialData) {
        let internalState;
        if (this.createCrdtIndex === 1)
            internalState = this.crdt1.create(initialData);
        else
            internalState = this.crdt2.create(initialData);
        return new SemidirectState(internalState, this.historyTimestamps, this.historyDiscard1Dominated, this.historyDiscard2Dominated);
    }
    /**
     * Operation/message format: [crdt number (1 or 2),
     * operation/message for that crdt].  An exception is if
     * the internal crdt returns a null message, in which case
     * we just return null, not [1, null] or [2, null].  This
     * allows the Crdt class to optimize away sending the
     * message.
     *
     * TODO (general): error checking
     */
    prepare(operation, state, replicaId) {
        if (operation[0] === 1) {
            let op1 = this.crdt1.prepare(operation[1], state.internalState, replicaId);
            if (op1 === null)
                return null;
            else
                return [1, op1];
        }
        else {
            let op2 = this.crdt2.prepare(operation[1], state.internalState, replicaId);
            if (op2 === null)
                return null;
            else
                return [2, op2];
        }
    }
    /**
     * Message/descrption format: [crdt number (1 or 2),
     * message for/description from that crdt].  For this.crdt1
     * messages, the description is for the acted-on message that
     * is actually applied to this.internalState, not the input
     * message.  An exception is if the description from the internal
     * crdt is null (or if the message gets acted on to become null),
     * the returned description is just null, not [1, null] or [2, null].
     * This allows the Crdt class to optimize away calling onchange.
     */
    effect(message, state, replicaId, timestamp) {
        if (message[0] === 2) {
            let result = this.crdt2.effect(message[1], state.internalState, replicaId, timestamp);
            state.internalState = result[0];
            state.add(replicaId, message[1], timestamp);
            if (result[1] === null)
                return [state, null];
            else
                return [state, [2, result[1]]];
        }
        else {
            let concurrent = state.getConcurrent(replicaId, timestamp);
            let mAct = message[1];
            for (let i = 0; i < concurrent.length; i++) {
                mAct = this.action(concurrent[i], mAct);
                if (mAct === null)
                    return [state, null];
            }
            let result = this.crdt1.effect(mAct, state.internalState, replicaId, timestamp);
            state.internalState = result[0];
            if (result[1] === null)
                return [state, null];
            else
                return [state, [1, result[1]]];
        }
    }
}
exports.SemidirectInternal = SemidirectInternal;
class DirectInternal {
    /**
     * Direct product of CrdtInternal's.  This is the
     * special case of SemidirectInternal when the action is trivial
     * ((m_2, m1) => m1).  In this case we can optimize
     * by not keeping the history or acting on messages.
     *
     * For this to be a Crdt, concurrent messages of the two input
     * Crdts must commute.
     *
     * Note this construction is symmetric (switching crdt1 and
     * crdt2 doesn't change the semantics), except for swapping
     * the meaning of the numbers 1/2 in createCrdtIndex and
     * in the first coordinates of messages and operations.
     *
     * @param createCrdtIndex Which crdt's create method to use
     * in create.
     */
    constructor(crdt1, crdt2, createCrdtIndex) {
        this.crdt1 = crdt1;
        this.crdt2 = crdt2;
        this.createCrdtIndex = createCrdtIndex;
        if (createCrdtIndex !== 1 && createCrdtIndex !== 2) {
            throw new Error("Bad createCrdtIndex (must be 1 or 2):" +
                createCrdtIndex);
        }
    }
    /**
     * @param  initialData Initial data used to initialize this.crdt1.
     * @return
     */
    create(initialData) {
        if (this.createCrdtIndex === 1)
            return this.crdt1.create(initialData);
        else
            return this.crdt2.create(initialData);
    }
    /**
     * Operation/message format: [crdt number (1 or 2),
     * operation/message for that crdt].  An exception is if
     * the internal crdt returns a null message, in which case
     * we just return null, not [1, null] or [2, null].  This
     * allows the Crdt class to optimize away sending the
     * message.
     */
    prepare(operation, state, replicaId) {
        let message;
        switch (operation[0]) {
            case 1:
                message = this.crdt1.prepare(operation[1], state, replicaId);
                break;
            case 2:
                message = this.crdt2.prepare(operation[1], state, replicaId);
                break;
            default:
                throw new Error("Bad crdt number in operation: " + operation);
        }
        if (message == null)
            return null;
        else
            return [operation[0], message];
    }
    /**
     * Message/descrption format: [crdt number (1 or 2),
     * message for/description from that crdt].
     * An exception is if the description from the internal
     * crdt is null,
     * the returned description is just null, not [1, null] or [2, null].
     * This allows the Crdt class to optimize away calling onchange.
     * TODO: perhaps add translating descriptions to this class, so
     * the Crdt doesn't have to understand all of the layers at
     * once?
     */
    effect(message, state, replicaId, timestamp) {
        let result;
        switch (message[0]) {
            case 1:
                result = this.crdt1.effect(message[1], state, replicaId, timestamp);
                break;
            case 2:
                result = this.crdt2.effect(message[1], state, replicaId, timestamp);
                break;
            default:
                throw new Error("Bad crdt number in message: " + message);
        }
        if (result[1] === null)
            return [result[0], null];
        else
            return [result[0], [message[0], result[1]]];
    }
}
exports.DirectInternal = DirectInternal;


/***/ }),

/***/ "./src/crdts/standard.ts":
/*!*******************************!*\
  !*** ./src/crdts/standard.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCrdt = exports.AddWinsSet = exports.CrdtObject = exports.GMapInternal = exports.DisableWinsFlag = exports.EnableWinsFlag = exports.NoOpCrdtInternal = exports.OrthogonalCrdt = exports.IntRegisterCrdt = exports.UnresettableIntRegisterCrdt = void 0;
const resettable_1 = __webpack_require__(/*! ./resettable */ "./src/crdts/resettable.ts");
const basic_crdts_1 = __webpack_require__(/*! ./basic_crdts */ "./src/crdts/basic_crdts.ts");
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "./src/crdts/crdt_core.ts");
const semidirect_1 = __webpack_require__(/*! ./semidirect */ "./src/crdts/semidirect.ts");
class UnresettableIntRegisterCrdt extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, IntRegisterCrdt.semidirectInstance, runtime, initialData);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n) {
        this.applyOp([1, n]);
    }
    mult(n) {
        this.applyOp([2, n]);
    }
    get value() {
        return this.state.internalState;
    }
    translateDescriptions(descriptions) {
        let description = descriptions[0];
        if (description[0] === 1)
            return ["add", description[1]];
        else
            return ["mult", description[1]];
    }
}
exports.UnresettableIntRegisterCrdt = UnresettableIntRegisterCrdt;
// semidirectInstance completely describes this semidirect product
UnresettableIntRegisterCrdt.semidirectInstance = new semidirect_1.SemidirectInternal(basic_crdts_1.CounterInternal.instance, basic_crdts_1.MultRegisterInternal.instance, (m2, m1) => m2 * m1, 1);
class IntRegisterCrdt extends resettable_1.DefaultResettableCrdt {
    constructor(id, runtime, initialValue = 0, resetValue = 0) {
        super(id, IntRegisterCrdt.semidirectInstance, resetValue, runtime, initialValue);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n) {
        this.applyOp([1, n]);
    }
    mult(n) {
        this.applyOp([2, n]);
    }
    get value() {
        return this.originalStateResettable.internalState;
    }
    /**
     * Performs an equivalent reset-then-add.
     */
    set value(newValue) {
        this.startTransaction();
        this.reset();
        this.add(newValue);
        this.endTransaction();
    }
    translateDescriptionsResettable(descriptions) {
        if (descriptions.length === 2) {
            // Transaction due to set value, return the resulting state
            return ["set", descriptions[1][1]];
        }
        let description = descriptions[0];
        if (description[0] === 1)
            return ["add", description[1]];
        else if (description[0] === 1)
            return ["mult", description[1]];
        else
            return [description[0], this.value]; // resets
    }
}
exports.IntRegisterCrdt = IntRegisterCrdt;
IntRegisterCrdt.semidirectInstance = new semidirect_1.SemidirectInternal(basic_crdts_1.CounterInternal.instance, basic_crdts_1.MultRegisterInternal.instance, (m2, m1) => m2 * m1, 1);
function positiveMod(a, b) {
    if (a >= 0)
        return a % b;
    else
        return b - ((-a) % b);
}
class OrthogonalRotationInternal {
    create(initialData) {
        if (initialData === undefined)
            return [0, false];
        else
            return initialData;
    }
    prepare(operation, _state, _replicaId) {
        return positiveMod(operation, 2 * Math.PI);
    }
    effect(message, state, _replicaId, _timestamp) {
        return [[positiveMod(state[0] + message, 2 * Math.PI), state[1]], message];
    }
}
OrthogonalRotationInternal.instance = new OrthogonalRotationInternal();
class OrthogonalReflectionInternal {
    create(_initialData) {
        throw new Error("Not implemented");
    }
    prepare(operation, _state, _replicaId) {
        if (operation !== "reflect")
            throw new Error("Unrecognized operation: " + operation);
        return "reflect";
    }
    effect(message, state, _replicaId, _timestamp) {
        if (message !== "reflect")
            throw new Error("Unrecognized message: " + message);
        // Reflection operation is multiplying on the left,
        // so to put it in canonical form (g1, g2), we have to
        // commute it with the current g1 (rotation) value by
        // acting on it.
        return [[positiveMod(-state[0], 2 * Math.PI), !state[1]], "reflect"];
    }
}
OrthogonalReflectionInternal.instance = new OrthogonalReflectionInternal();
/**
 * Crdt for the 2-dimensional orthogonal group, which allows
 * rotations and reflections (about the origin) of an object in the
 * plane.  Example usage: rotating and reflecting objects in
 * Powerpoint.
 *
 * State is stored as the canonical element of the semidirect
 * product group, i.e., in the form (g1, g2) for g1 in the rotation
 * group (reals mod 2pi) and g2 in the reflection group (booleans
 * with true for 1 and false for 0).
 */
class OrthogonalCrdt extends resettable_1.DefaultResettableCrdt {
    constructor(id, runtime, initialValue = [0, false], resetValue = [0, false]) {
        super(id, OrthogonalCrdt.semidirectInstance, resetValue, runtime, initialValue);
    }
    /**
     * Angle is in radians CCW.
     */
    rotate(angle) {
        this.applyOp([1, angle]);
    }
    reflectHorizontalAxis() {
        this.applyOp([2, "reflect"]);
    }
    reflectVerticalAxis() {
        this.reflect(Math.PI / 2);
    }
    reflect(angleAxis) {
        this.startTransaction();
        this.rotate(-angleAxis);
        this.reflectHorizontalAxis();
        this.rotate(angleAxis);
        this.endTransaction();
    }
    /**
     * The current state is given by: reflect across the x-axis
     * if reflected is true, then rotate by angle (CCW, in radians).
     */
    get reflected() {
        return this.originalStateResettable.internalState[1];
    }
    /**
     * The current state is given by: reflect across the x-axis
     * if reflected is true, then rotate by angle (CCW, in radians).
     */
    get angle() {
        return this.originalStateResettable.internalState[0];
    }
    /**
     * [reflected, angle]
     */
    get value() {
        return [this.angle, this.reflected];
    }
    /**
     * Performs an equivalent reset-then-set.
     */
    set value(newValue) {
        this.startTransaction();
        this.reset();
        this.rotate(newValue[0]);
        if (newValue[1])
            this.reflectHorizontalAxis();
        this.endTransaction();
    }
    // TODO: matrix versions of get and set.
    // /**
    //  * @return The current transformation as a 2x2 orthogonal
    //  * matrix.
    //  */
    // get matrix(): [[number, number], [number, number]] {
    //
    // }
    translateDescriptionsResettable(_descriptions) {
        // TODO.  Just returns the resulting state for now.
        return this.value;
        // if (descriptions.length === 2) {
        //     // Transaction due to set value, return the resulting state
        //     return ["set", descriptions[1][1]];
        // }
        // let description = descriptions[0];
        // if (description[0] === 1) return ["add", description[1]];
        // else if (description[0] === 1) return ["mult", description[1]];
        // else return [description[0] as string, this.value]; // resets
    }
}
exports.OrthogonalCrdt = OrthogonalCrdt;
OrthogonalCrdt.semidirectInstance = new semidirect_1.SemidirectInternal(OrthogonalRotationInternal.instance, OrthogonalReflectionInternal.instance, (_m2, m1) => -m1, 1);
/**
 * CrdtInternal which uses any string as an operation/message
 * which does nothing.  Unlike using null messages to indicate that
 * nothing happened, the noop message is an explicit non-null
 * string supplied as the operation.
 *
 * Two use cases:
 * - To unreset a state (e.g. in EnableWinsFlag below).
 * - As a "header" for sequence of operations passed to applyOps,
 * so that recipients can know what end-user operation the sequence
 * corresponds to.
 */
class NoOpCrdtInternal {
    constructor(createFunc) {
        this.createFunc = createFunc;
    }
    create(initialData) {
        if (this.createFunc)
            return this.createFunc(initialData);
        else
            throw new Error("CreateFunc not supplied");
    }
    prepare(operation, _state) {
        return operation;
    }
    /**
     * The returned description is the original operation.
     */
    effect(message, state, _replicaId, _timestamp) {
        return [state, message];
    }
    static addTo(originalCrdt) {
        return new semidirect_1.DirectInternal(originalCrdt, new NoOpCrdtInternal(), 1);
    }
}
exports.NoOpCrdtInternal = NoOpCrdtInternal;
class EnableWinsFlag extends resettable_1.DefaultResettableCrdt {
    constructor(id, runtime) {
        super(id, new NoOpCrdtInternal(() => null), null, runtime, undefined, true);
    }
    enable() {
        this.applyOp("e");
    }
    disable() {
        this.reset();
    }
    disableStrong() {
        this.resetStrong();
    }
    get enabled() {
        return !this.state.internalState.isHistoryEmpty();
    }
    set enabled(newValue) {
        if (newValue)
            this.enable();
        else
            this.disable();
    }
    get value() {
        return this.enabled;
    }
    set value(newValue) {
        // Note this is equivalent to doing a reset before setting
        // to newValue, in either case, since any message obviates
        // causally lesser messages.
        this.enabled = newValue;
    }
    // TODO: would also like to translate observed-resets to
    // disable (but only if it actually worked).  Perhaps add noop indicator out front?
    // (Need to add a no-op crdt at the top level)
    translateDescriptionsResettable(descriptions) {
        if (descriptions.length === 1 && descriptions[0] === "e") {
            return "enable";
        }
        else if (descriptions.length === 1 && descriptions[0][0] === "reset") {
            return "disable";
        }
        else if (descriptions.length === 1 && descriptions[0][0] === "resetStrong") {
            return "disableStrong";
        }
        else {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions));
        }
    }
}
exports.EnableWinsFlag = EnableWinsFlag;
class DisableWinsFlag extends resettable_1.DefaultResettableCrdt {
    constructor(id, runtime) {
        super(id, new NoOpCrdtInternal(() => null), null, runtime, undefined, true);
    }
    enable() {
        this.reset();
    }
    enableStrong() {
        this.resetStrong();
    }
    disable() {
        this.applyOp("d");
    }
    get enabled() {
        return this.state.internalState.isHistoryEmpty();
    }
    set enabled(newValue) {
        if (newValue)
            this.enable();
        else
            this.disable();
    }
    get value() {
        return this.enabled;
    }
    set value(newValue) {
        // Note this is equivalent to doing a reset before setting
        // to newValue, in either case, since any message obviates
        // causally lesser messages.
        this.enabled = newValue;
    }
    // TODO: would also like to translate observed-resets to
    // enable (but only if it actually worked).  Perhaps add noop indicator out front?
    // (Need to add a no-op crdt at the top level)
    translateDescriptionsResettable(descriptions) {
        if (descriptions.length === 1 && descriptions[0] === "d") {
            return "disable";
        }
        else if (descriptions.length === 1 && descriptions[0][0] === "reset") {
            return "enable";
        }
        else if (descriptions.length === 1 && descriptions[0][0] === "resetStrong") {
            return "enableStrong";
        }
        else {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions));
        }
    }
}
exports.DisableWinsFlag = DisableWinsFlag;
class GMapInternal {
    /**
     * [constructor description]
     * @param valueCrdtInternal [description]
     * @param shouldGc Given a value state, return whether it is safe
     * to garbage collect it, removing its key-value pair from the
     * map.  For correctness, if shouldGc(valueState) is true, then
     * valueState must be identical to valueCrdtInternal.create(valueInitialData);
     * and if shouldGc is nontrivial, then users should keep in
     * mind that state.has(key) is not reliable, since it may be
     * false even after key has been initialized because the value
     * has been garbage collected.
     */
    constructor(shouldGc = (() => false)) {
        this.shouldGc = shouldGc;
    }
    create(_initialData) {
        return new Map();
    }
    /**
     * Operations:
     * - ["apply", key, C message]: applies the C message to
     * the given key, initializing the key if needed.
     * - ["applySkip", key, C message]: applies the C message to
     * the given key, except for their sender, who is assumed
     * to have already applied the message.  This is used by
     * CrdtValuedGrowOnlyMapInternal, whose messages are
     * sometimes derived from values applying messages to
     * themselves.  TODO: in principle can optimize so we
     * don't have to send "skip" over the network.
     * - ["init", key]: initializes the given key using initFactory
     * if it is not already present in the map.
     * - ["reset"]: resets every value in the map (using
     * each value's getUniversalResetOperation()).
     */
    prepare(operation, state, _replicaId) {
        let key = operation[1];
        switch (operation[0]) {
            case "apply":
                return ["apply", key, operation[2]];
            case "applySkip":
                return ["applySkip", key, operation[2]];
            case "init":
                if (!state.has(key))
                    return ["init", key];
            case "reset": return ["reset"];
            default:
                throw new Error("Unrecognized operation: " + JSON.stringify(operation));
        }
    }
    /**
     * In addition to the message output by prepare, we have
     * messages (arising through semdirect product):
     * - ["initReset", key]: does ["init", key] followed by
     * delivering a reset message to the key.
     * - ["initResetStrong", key]: does ["init", key] followed
     * by delivering a reset-strong message to the key.
     *
     * Description format:
     * - for an apply/applySkip operation:
     * null (TODO)
     * - for an init operation: null if the key already existed,
     * otherwise ["init", key]
     * - for a reset operation: ["reset"] (TODO: descriptions from
     * reset keys)
     */
    effect(message, state, replicaId, timestamp) {
        let key = message[1];
        switch (message[0]) {
            case "applySkip":
                if (replicaId === timestamp.getSender()) {
                    // Skip applying it to the state.
                    // We can still gc, though, in case the
                    // already-applied message has made it
                    // gc-able.
                    let keyState = state.get(key);
                    if (keyState !== undefined &&
                        this.shouldGc(keyState)) {
                        state.delete(key);
                    }
                    return [state, null];
                }
            // Otherwise fall through.
            case "apply": {
                let keyState = state.get(key);
                if (keyState === undefined) {
                    keyState = this.initFactory(key);
                }
                keyState.receive(message[2], timestamp);
                if (this.shouldGc(keyState)) {
                    state.delete(key);
                }
                return [state, null];
            }
            case "init":
                if (state.has(key))
                    return [state, null];
                else {
                    let initState = this.initFactory(key);
                    if (!this.shouldGc(initState)) {
                        state.set(key, initState);
                    }
                    return [state, ["init", key]];
                }
            case "reset":
                for (let entry of state.entries()) {
                    let resetMessage = entry[1].getUniversalResetMessage();
                    if (resetMessage !== null)
                        entry[1].receive([resetMessage], timestamp);
                    if (this.shouldGc(entry[1])) {
                        state.delete(entry[0]);
                    }
                }
                return [state, ["reset"]];
            default:
                throw new Error("Unrecognized message: " + JSON.stringify(message));
        }
    }
}
exports.GMapInternal = GMapInternal;
/**
 * Convenient representation of a Crdt-valued grow-only map.
 *
 * TODO: Somewhere: note that initial values of properties must be
 * a function of their key only (so can't have varying types or
 * initial data).
 *
 * N is the type of member names (typically string).
 */
class CrdtObject extends crdt_core_1.Crdt {
    /**
     * TODO: predefined vs dynamic property creation.  Predefined ones
     * have to be created identically on all replicas in
     * between startPredefinedPropertyCreation() and
     * endPredefinedPropertyCreation(), ideally in the constructor. They
     * are not synced (for efficiency and to save the trouble
     * of specifying propertyFactory).  Dynamic properties
     * can only be created through init.
     *
     * @param id              [description]
     * @param runtime         [description]
     * @param propertyFactory [description]
     */
    constructor(id, runtime, propertyFactory = CrdtObject.defaultPropertyFactory) {
        // TODO: gc ability
        let crdtInternal = new GMapInternal();
        super(id, crdtInternal, runtime);
        crdtInternal.initFactory = (key) => {
            this.inInit = true;
            let result = propertyFactory(key, this);
            this.inInit = false;
            return result;
        };
        this.inPredefinedPropertyCreation = false;
        this.inInit = false;
    }
    startPredefinedPropertyCreation() {
        this.inPredefinedPropertyCreation = true;
    }
    endPredefinedPropertyCreation() {
        this.inPredefinedPropertyCreation = false;
    }
    register(crdt, name) {
        if (!(this.inPredefinedPropertyCreation || this.inInit)) {
            throw new Error("Properties can only be directly " +
                "registered between startPredefinedPropertyCreation() " +
                "and endPredefinedPropertyCreation().  Dynamic properties " +
                "must be created with init(name).");
        }
        if (this.state.has(name)) {
            throw new Error("Duplicate property name: " + name);
        }
        this.state.set(name, crdt);
        // Skip sending an init message about it.  Okay because of the
        // predefined initialization contract.
    }
    /**
     * @param  name [description]
     * @return      The initialized Crdt.
     */
    initProperty(name) {
        let currentValue = this.state.get(name);
        if (currentValue !== undefined)
            return currentValue;
        else {
            this.applyOp(["init", name]);
            return this.state.get(name);
        }
    }
    reset() {
        this.applyOp(this.getUniversalResetMessage());
    }
    getUniversalResetMessage() {
        return ["reset"];
    }
    getProperty(name) {
        return this.state.get(name);
    }
    propertyNames() {
        return this.state.keys();
    }
    propertyValues() {
        return this.state.values();
    }
    propertyEntries() {
        return this.state.entries();
    }
    send(message, name) {
        // Convert into an applySkip message for the map value
        // at name.  Here we want to skip because
        // our replica's value has already applied the
        // operation internally.
        this.applyOp(["applySkip", name, message]);
    }
    getReplicaId() {
        return this.runtime.getReplicaId();
    }
    getNextTimestamp(_crdtId) {
        return this.runtime.getNextTimestamp(this.id);
    }
}
exports.CrdtObject = CrdtObject;
CrdtObject.defaultPropertyFactory = () => {
    throw new Error("Dynamically created properties are only " +
        "allowed if propertyFactory is passed to the " +
        "CrdtObject constructor");
};
class AddWinsSet extends CrdtObject {
    constructor(id, runtime) {
        // TODO: add gc once we have transactions
        super(id, runtime, (name, internalRuntime) => new EnableWinsFlag(name, internalRuntime));
    }
    add(value) {
        this.startTransaction();
        this.initProperty(value).enable();
        this.endTransaction();
    }
    delete(value) {
        if (this.has(value)) {
            this.getProperty(value).disable();
        }
    }
    deleteStrong(value) {
        if (this.has(value)) {
            this.getProperty(value).resetStrong();
        }
    }
    has(value) {
        let valueFlag = this.getProperty(value);
        if (valueFlag === undefined)
            return false;
        else
            return valueFlag.enabled;
    }
    get value() {
        let result = new Set();
        for (let entry of this.propertyEntries()) {
            if (entry[1].enabled)
                result.add(entry[0]);
        }
        return result;
    }
    set value(newValue) {
        this.startTransaction();
        this.reset();
        for (let element of newValue) {
            this.add(element);
        }
        this.endTransaction();
    }
    values() {
        // TODO: once it's gc'd we can just use this.state.keys()
        return this.value.values();
    }
}
exports.AddWinsSet = AddWinsSet;
class MapCrdt extends CrdtObject {
    constructor(id, runtime, valueFactory) {
        super(id, runtime);
        /**
         * Flag indicating that we are in the body of a delete/
         * deleteStrong call, hence we should not add things
         * to keySet (as an optimization).
         */
        this.inDelete = false;
        this.startPredefinedPropertyCreation();
        this.keySet = new AddWinsSet("keySet", this);
        this.valueMap = new CrdtObject("valueMap", this, valueFactory);
        this.endPredefinedPropertyCreation();
    }
    /**
     * Override CrdtObject.send so that we can capture
     * a send by a valueMap value and follow it up with
     * an add to keySet, thus reviving the value's key
     * if appropriate.
     *
     * TODO: skip adding the key if it's a reset message?
     * Not sure if this is possible in general.  But should at
     * least be possible for our own deletes.
     */
    send(message, name) {
        super.send(message, name);
        if (!this.inDelete && name === "valueMap") {
            // TODO: do this receiver side instead, for network efficiency?
            // Would need to place the add first, so that it can
            // be overridden by any included deletes.
            // Would also need to account for possibility of
            // transactions.
            // Also, need to make sure we (sender) do it too.
            for (let submessage of message) {
                if (submessage[0] === "applySkip") {
                    let key = submessage[1];
                    this.keySet.add(key);
                }
            }
        }
    }
    init(key) {
        this.startTransaction();
        if (!this.inDelete)
            this.keySet.add(key);
        let result = this.valueMap.initProperty(key);
        this.endTransaction();
        return result;
    }
    has(key) {
        return this.keySet.has(key);
    }
    get(key) {
        if (this.has(key))
            return this.valueMap.getProperty(key);
        else
            return undefined;
    }
    delete(key) {
        if (this.has(key)) {
            this.startTransaction();
            this.inDelete = true;
            this.get(key).reset();
            this.keySet.delete(key);
            this.inDelete = false;
            this.endTransaction();
        }
    }
    deleteStrong(key) {
        this.inDelete = true;
        this.init(key).resetStrong();
        this.keySet.deleteStrong(key);
        this.inDelete = false;
    }
    keys() {
        return this.keySet.values();
    }
}
exports.MapCrdt = MapCrdt;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../test/test */ "./test/test.ts"); // run test.ts
const basic_crdts_1 = __webpack_require__(/*! ../src/crdts/basic_crdts */ "./src/crdts/basic_crdts.ts");
const crdt_network_runtime_1 = __webpack_require__(/*! ../src/network/crdt_network_runtime */ "./src/network/crdt_network_runtime.ts");
/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, 'ws');
/**
 * Create CRDTs (e.g. CounterCrdt).
 */
let client = new crdt_network_runtime_1.CrdtNetworkRuntime("client", HOST);
let clientCounter = new basic_crdts_1.CounterCrdt("counterId", client);
/* HTML variables */
var counter = document.getElementById("counter");
/* Customize the onchange() for CRDT as refresh the value */
clientCounter.onchange = (event => {
    counter.innerHTML = clientCounter.value.toString();
});
/* Customize onclick() function of increment button with CRDT operation */
document.getElementById("increment").onclick = function () {
    console.log("clicked increment");
    clientCounter.add(100);
    counter.innerHTML = clientCounter.value.toString();
};
/* Customize onclick() function of decrement button with CRDT operation */
document.getElementById("decrement").onclick = function () {
    console.log("clicked decrement");
    clientCounter.add(-100);
    counter.innerHTML = clientCounter.value.toString();
};
// /* Customize onclick() function of sync to synchronize the value */
// document.getElementById("sync")!.onclick = function() {
//     counter!.innerHTML = clientCounter.value.toString();
// }


/***/ }),

/***/ "./src/network/crdt_network_runtime.ts":
/*!*********************************************!*\
  !*** ./src/network/crdt_network_runtime.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CrdtNetworkRuntime = exports.myMessage = void 0;
const vector_clock_1 = __webpack_require__(/*! ./vector_clock */ "./src/network/vector_clock.ts");
// import WebSocket = require("ws");
// The casual broadcast network designed for a two-way interactive
// communication session between user and server using WebSocket API.
//
// Also ensure the order of delivery with casuality check.
/**
 * Customized message event that travel through
 * casualbroadcast network.
 */
class myMessage {
    constructor(message, crdtId, timestamp) {
        this.message = message;
        this.crdtId = crdtId;
        this.timestamp = timestamp;
    }
    /**
     * customized toJSON function to convert message as JSON format.
     *
     * @returns package info in JSON format.
     */
    toJSON() {
        return JSON.stringify({ "message": this.message,
            "crdtId": this.crdtId,
            "timestamp": {
                "uid": this.timestamp.uid,
                "vectorMap": Array.from(this.timestamp.vectorMap.entries())
            }
        });
    }
}
exports.myMessage = myMessage;
/**
 * CasualBroadcastNetwork:
 *
 * Process initialization when starting a new user node.
 *
 * Communicate with CRDT's runtime and send/receive message via
 * central broadcast server with WebSocket protocol.
 *
 * Perform casuality check to ensure message ordering.
 */
class CrdtNetworkRuntime {
    constructor(replicaId, webSocketArgs) {
        /**
         * Check if the send message buffer has any message waiting to be sent.
         * If there exist, then send it via WebSocket and remove the item from buffer.
         * If not, then wait a customized time period and check again.
         */
        this.sendAction = () => {
            let index = 0;
            while (index < this.sendBuffer.length) {
                this.ws.send(this.sendBuffer[index].toJSON());
                index++;
            }
            this.sendBuffer = new Array();
        };
        /**
         * Parse JSON format data back into myMessage type.
         * Push the message into received message buffer.
         * Check the casuality of all the messages and deliver to application.
         *
         * @param data the JSON format data send via network
         */
        this.receiveAction = (data) => {
            let myPackage = this.parseJSON(data.data);
            this.messageBuffer.push([myPackage.message, myPackage.crdtId, myPackage.timestamp]);
            this.checkMessageBuffer();
        };
        this.uid = replicaId;
        this.vcMap = new Map();
        this.messageBuffer = new Array();
        this.sendBuffer = new Array();
        this.listenersById = new Map();
        /**
         * Open WebSocket connection with server.
         * Register EventListener with corresponding event handler.
         */
        this.ws = new WebSocket(webSocketArgs);
        this.ws.addEventListener('open', this.sendAction);
        this.ws.addEventListener('message', this.receiveAction);
    }
    /**
     * Implement the function defined in CrdtRuntime interfaces.
     *
     * @returns This replica's id, used by some CRDTs internally
     * (e.g., to generate unique identifiers of the form (replica id, counter)).
     *
     */
    getReplicaId() {
        return this.uid;
    }
    /**
     * Register newly created crdtId on CasualBroadcastNetwork.
     *
     * @param crdtId
     */
    registerCrdtId(crdtId) {
        if (this.vcMap.has(crdtId)) {
            throw new Error("Duplicate crdtId: " + crdtId);
        }
        this.vcMap.set(crdtId, new vector_clock_1.VectorClock(this.uid));
    }
    /**
     * Register newly created crdt with its ID and corresponding message
     * listener on CasualBroadcastNetwork.
     *
     * @param crdtMessageListener the message listener of each crdt.
     * @param crdtId the ID of each crdt.
     *
     */
    register(crdtMessageListener, crdtId) {
        if (this.listenersById.has(crdtId) || this.vcMap.has(crdtId)) {
            throw new Error("Duplicate crdtId: " + crdtId);
        }
        this.listenersById.set(crdtId, crdtMessageListener);
        this.vcMap.set(crdtId, new vector_clock_1.VectorClock(this.uid));
    }
    /**
     * Send function on casualbroadcast network layer, which called
     * by crdt's runtime layer.
     *
     * The message is wrapped with its corresponding timestamp (basic sender node
     * info and vector clock).
     *
     * Using WebSocket as network transmission protocol.
     * Using JSON format as message type.
     *
     * If the WebSocket Readystate is not Open, then buffer the message and
     * wait until WebSocket open.
     * If the WebSocket Readystate is Open, then send it with ws.send().
     *
     * @param message the crdt update message.
     * @param crdtId the unique ID for each crdt.
     */
    send(message, crdtId) {
        var _a;
        // Check if the crdtId exist in the map.
        if (this.vcMap.has(crdtId)) {
            this.vcMap.get(crdtId).increment();
        }
        else {
            this.vcMap.set(crdtId, new vector_clock_1.VectorClock(this.uid));
            this.vcMap.get(crdtId).increment();
        }
        // Copy a new vector clock for sending
        let vcCopy = new vector_clock_1.VectorClock(this.uid);
        vcCopy.vectorMap = new Map((_a = this.vcMap.get(crdtId)) === null || _a === void 0 ? void 0 : _a.asVectorClock());
        let myPackage = new myMessage(message, crdtId, vcCopy);
        // Convert the message into JSON
        if (this.ws.readyState === 1) {
            this.ws.send(myPackage.toJSON());
        }
        else {
            this.sendBuffer.push(myPackage);
        }
    }
    /**
     * Get the next timestamp of the given crdtId in this replica.
     *
     * This is passed to CrdtInternal.effect when a replica processes its own
     * message.
     *
     * @param crdtId the crdtId that would like to return.
     * @returns The timestamp that would be assigned to a CRDT
     * message sent by this replica and given crdtId right now.
     *
     */
    getNextTimestamp(crdtId) {
        var _a;
        // Copy a new vector clock.  
        let vcCopy = new vector_clock_1.VectorClock(this.uid);
        vcCopy.vectorMap = new Map((_a = this.vcMap.get(crdtId)) === null || _a === void 0 ? void 0 : _a.asVectorClock());
        // Update the timestamp of this replica with next value. 
        vcCopy.vectorMap.set(this.uid, vcCopy.vectorMap.get(this.uid) + 1);
        return vcCopy;
    }
    /**
     * Parse JSON format data back to customized data type.
     *
     * @param data the JSON format data travel through network.
     * @returns the customized data type => myMessage
     */
    parseJSON(data) {
        let dataJSON = JSON.parse(data);
        let vc = new vector_clock_1.VectorClock(dataJSON.timestamp.uid);
        vc.vectorMap = new Map(dataJSON.timestamp.vectorMap);
        let myPackage = new myMessage(dataJSON.message, dataJSON.crdtId, vc);
        return myPackage;
    }
    /**
     * Check the casuality of buffered messages and delivery the
     * messages back to crdtMessageListener which are ready.
     *
     * The checking order is from the lastest to the oldest.
     * Update the VectorClock entry and MessageBuffer when necessary.
     *
     * Send the message back to crdtRuntime with corresponding
     * crdtMessageListener.
     */
    checkMessageBuffer() {
        var _a;
        let index = this.messageBuffer.length - 1;
        while (index >= 0) {
            let curCrdtId = this.messageBuffer[index][1];
            let curVectorClock = this.messageBuffer[index][2];
            if (!this.vcMap.has(curCrdtId)) {
                this.messageBuffer.splice(index, 1);
            }
            else {
                let myVectorClock = this.vcMap.get(curCrdtId);
                if (myVectorClock === null || myVectorClock === void 0 ? void 0 : myVectorClock.isready(curVectorClock)) {
                    /**
                     * Send back the received messages to crdtMessageListener.
                    
                     */
                    if (this.listenersById.has(curCrdtId)) {
                        (_a = this.listenersById.get(curCrdtId)) === null || _a === void 0 ? void 0 : _a.receive(this.messageBuffer[index][0], curVectorClock);
                        myVectorClock.incrementSender(curVectorClock);
                        this.messageBuffer.splice(index, 1);
                    }
                }
            }
            index--;
        }
    }
}
exports.CrdtNetworkRuntime = CrdtNetworkRuntime;


/***/ }),

/***/ "./src/network/vector_clock.ts":
/*!*************************************!*\
  !*** ./src/network/vector_clock.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorClock = void 0;
// The vector clock designed for CRDT library and casual broadcasting
// runtime to ensure correct causality.
/**
 * The vector clock class for ensuring casuality.
 */
class VectorClock {
    /**
     * Initialize the vector with replica's own entry.
     */
    constructor(replicaId) {
        this.uid = replicaId;
        this.vectorMap = new Map();
        this.vectorMap.set(this.uid, 0);
    }
    /**
     * @returns the unique ID for this replica(replicaId).
     */
    getSender() {
        return this.uid;
    }
    /**
     * @returns the vector clock with all the entries.
     */
    asVectorClock() {
        return this.vectorMap;
    }
    /**
     * @returns the visible number of the counter from sender in
     * this vectorclock.
     */
    getSenderCounter() {
        return this.vectorMap.get(this.uid);
    }
    /**
     * @returns the total number of replicas invovled in this crdts.
     */
    getSize() {
        return this.vectorMap.size;
    }
    /**
     * Update the vector of the uid(replicaId) entry.
     */
    increment() {
        const oldValue = this.vectorMap.get(this.uid);
        if (oldValue !== undefined) {
            this.vectorMap.set(this.uid, oldValue + 1);
        }
    }
    /**
     * Check a message with a certain timestamp is ready for delivery
     * to ensure correct casuality.
     *
     * @param vc the VectorClock from other replica.
     * @returns the message is ready or not.
     */
    isready(vc) {
        let otherUid = vc.getSender();
        let otherVectorMap = vc.asVectorClock();
        if (this.vectorMap.has(otherUid)) {
            if (this.vectorMap.get(otherUid) === otherVectorMap.get(otherUid) - 1) {
                for (let id of otherVectorMap.keys()) {
                    if (id !== otherUid && !this.vectorMap.has(id)) {
                        return false;
                    }
                    else if (id !== otherUid && (this.vectorMap.get(id) < otherVectorMap.get(id))) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        else {
            if (otherVectorMap.get(otherUid) !== 1) {
                console.log(otherVectorMap.get(otherUid));
                return false;
            }
            for (let id of otherVectorMap.keys()) {
                if (id !== otherUid && !this.vectorMap.has(id)) {
                    return false;
                }
                else if (id !== otherUid && (this.vectorMap.get(id) < otherVectorMap.get(id))) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Increment sender's lastest entry received in this VectorClock
     * in the replica's own vectorMap.
     *
     * This operation is mainly done after correctly deliver the message
     * when isReady() function returns true.
     *
     * @param vc the VectorClock from other replica.
     */
    incrementSender(vc) {
        let otherUid = vc.getSender();
        let otherVectorMap = vc.asVectorClock();
        this.vectorMap.set(otherUid, otherVectorMap.get(otherUid));
    }
    /**
     * Merge current VectorClock with the vector clock recevied from
     * other replica.
     *
     * @param vc the VectorClock from other replica.
     */
    merge(vc) {
        let otherVectorMap = vc.asVectorClock();
        for (let id of otherVectorMap.keys()) {
            if (!this.vectorMap.has(id)) {
                this.vectorMap.set(id, otherVectorMap.get(id));
            }
            else {
                this.vectorMap.set(id, Math.max(this.vectorMap.get(id), otherVectorMap.get(id)));
            }
        }
    }
    /**
     *
     * @param someUid the replica's uid.
     * @param clockValue the clock number of the replica.
     */
    setEntry(someUid, clockValue) {
        this.vectorMap.set(someUid, clockValue);
    }
}
exports.VectorClock = VectorClock;


/***/ }),

/***/ "./test/crdts/basic_crdts_tests.ts":
/*!*****************************************!*\
  !*** ./test/crdts/basic_crdts_tests.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/assert/assert.js"));
const runtime_for_testing_1 = __webpack_require__(/*! ../runtime_for_testing */ "./test/runtime_for_testing.ts");
const basic_crdts_1 = __webpack_require__(/*! ../../src/crdts/basic_crdts */ "./src/crdts/basic_crdts.ts");
let runtimeGen = new runtime_for_testing_1.TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");
function testCounter() {
    console.log("testCounter()...");
    let aliceCounter = new basic_crdts_1.CounterCrdt("counterId", alice);
    aliceCounter.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " added " + event.description));
    let bobCounter = new basic_crdts_1.CounterCrdt("counterId", bob);
    bobCounter.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " added " + event.description));
    assert_1.default.equal(aliceCounter.value, 0);
    assert_1.default.equal(bobCounter.value, 0);
    aliceCounter.add(3);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 3);
    assert_1.default.equal(bobCounter.value, 3);
    bobCounter.add(-4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, -1);
    assert_1.default.equal(bobCounter.value, -1);
    aliceCounter.value = 11;
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 11);
    assert_1.default.equal(bobCounter.value, 11);
    // Out of order test
    aliceCounter.add(2);
    assert_1.default.equal(aliceCounter.value, 13);
    assert_1.default.equal(bobCounter.value, 11);
    bobCounter.add(-5);
    assert_1.default.equal(aliceCounter.value, 13);
    assert_1.default.equal(bobCounter.value, 6);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 8);
    assert_1.default.equal(bobCounter.value, 8);
    console.log("...ok");
}
function testMultRegister() {
    console.log("testMultRegister()...");
    let aliceRegister = new basic_crdts_1.MultRegisterCrdt("multId", alice, 2);
    aliceRegister.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " multed " + event.description));
    let bobRegister = new basic_crdts_1.MultRegisterCrdt("multId", bob, 2);
    bobRegister.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " multed " + event.description));
    assert_1.default.equal(aliceRegister.value, 2);
    assert_1.default.equal(bobRegister.value, 2);
    aliceRegister.mult(3);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceRegister.value, 6);
    assert_1.default.equal(bobRegister.value, 6);
    bobRegister.mult(-4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceRegister.value, -24);
    assert_1.default.equal(bobRegister.value, -24);
    aliceRegister.value = 11;
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceRegister.value, 11);
    assert_1.default.equal(bobRegister.value, 11);
    // Out of order test
    aliceRegister.mult(2);
    assert_1.default.equal(aliceRegister.value, 22);
    assert_1.default.equal(bobRegister.value, 11);
    bobRegister.mult(-8);
    assert_1.default.equal(aliceRegister.value, 22);
    assert_1.default.equal(bobRegister.value, -88);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceRegister.value, -176);
    assert_1.default.equal(bobRegister.value, -176);
    console.log("...ok");
}
function testGSet() {
    console.log("testGSet()...");
    let aliceGSet = new basic_crdts_1.GSetCrdt("gsetId", alice);
    aliceGSet.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " added " + event.description));
    let bobGSet = new basic_crdts_1.GSetCrdt("gsetId", bob);
    bobGSet.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " added " + event.description));
    assertSetEquals(aliceGSet.value, new Set());
    assertSetEquals(bobGSet.value, new Set());
    aliceGSet.add("element");
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element"]));
    assertSetEquals(bobGSet.value, new Set(["element"]));
    bobGSet.add(7);
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element", 7]));
    assertSetEquals(bobGSet.value, new Set(["element", 7]));
    aliceGSet.add(7);
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element", 7]));
    assertSetEquals(bobGSet.value, new Set(["element", 7]));
    // Out of order test
    aliceGSet.add("first");
    assertSetEquals(aliceGSet.value, new Set(["element", 7, "first"]));
    assertSetEquals(bobGSet.value, new Set(["element", 7]));
    bobGSet.add("second");
    assertSetEquals(aliceGSet.value, new Set(["element", 7, "first"]));
    assertSetEquals(bobGSet.value, new Set(["element", 7, "second"]));
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element", 7, "first", "second"]));
    assertSetEquals(bobGSet.value, new Set(["element", 7, "first", "second"]));
    console.log("...ok");
}
function testMvr() {
    console.log("testMvr()...");
    let aliceMvr = new basic_crdts_1.MultiValueRegister("mvrId", alice, "initial");
    aliceMvr.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " set to " + JSON.stringify(event.description)));
    let bobMvr = new basic_crdts_1.MultiValueRegister("mvrId", bob, "initial");
    bobMvr.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " set to " + JSON.stringify(event.description)));
    assertSetEquals(aliceMvr.valueSet, new Set(["initial"]));
    assertSetEquals(bobMvr.valueSet, new Set(["initial"]));
    aliceMvr.value = "second";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["second"]));
    assertSetEquals(bobMvr.valueSet, new Set(["second"]));
    aliceMvr.value = "third";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["third"]));
    assertSetEquals(bobMvr.valueSet, new Set(["third"]));
    bobMvr.value = "bob's";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["bob's"]));
    assertSetEquals(bobMvr.valueSet, new Set(["bob's"]));
    // Concurrent test
    aliceMvr.value = "concA";
    bobMvr.value = "concB";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["concA", "concB"]));
    assertSetEquals(bobMvr.valueSet, new Set(["concB", "concA"]));
    aliceMvr.value = "concA2";
    assertSetEquals(aliceMvr.valueSet, new Set(["concA2"]));
    bobMvr.value = "concB2";
    assertSetEquals(bobMvr.valueSet, new Set(["concB2"]));
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["concA2", "concB2"]));
    assertSetEquals(bobMvr.valueSet, new Set(["concB2", "concA2"]));
    // Multiple adds are redundant, unless they're overwritten
    aliceMvr.value = "redundant";
    bobMvr.value = "redundant";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["redundant"]));
    assertSetEquals(bobMvr.valueSet, new Set(["redundant"]));
    aliceMvr.value = "redundant";
    bobMvr.value = "redundant";
    aliceMvr.value = "overwrite";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["redundant", "overwrite"]));
    assertSetEquals(bobMvr.valueSet, new Set(["redundant", "overwrite"]));
    // Reset test
    aliceMvr.reset();
    assertSetEquals(aliceMvr.valueSet, new Set());
    bobMvr.value = "conc";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["conc"]));
    assertSetEquals(bobMvr.valueSet, new Set(["conc"]));
    console.log("...ok");
}
testCounter();
testMultRegister();
testGSet();
testMvr();
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}
function setEquals(set1, set2) {
    return isSuperset(set1, set2) && isSuperset(set2, set1);
}
function assertSetEquals(set1, set2) {
    if (!setEquals(set1, set2)) {
        throw new Error("setEquals failed, actual: " +
            JSON.stringify([...set1.values()]) + ", expected: " +
            JSON.stringify([...set2.values()]));
    }
    assert_1.default(setEquals(set1, set2));
}


/***/ }),

/***/ "./test/crdts/json_tests.ts":
/*!**********************************!*\
  !*** ./test/crdts/json_tests.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/assert/assert.js"));
const runtime_for_testing_1 = __webpack_require__(/*! ../runtime_for_testing */ "./test/runtime_for_testing.ts");
const json_1 = __webpack_require__(/*! ../../src/crdts/json */ "./src/crdts/json.ts");
let runtimeGen = new runtime_for_testing_1.TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");
function testJsonMapFeatures() {
    console.log("testJsonMapFeatures()...");
    let aliceJson = new json_1.JsonCrdt("jsonMap", alice);
    let bobJson = new json_1.JsonCrdt("jsonMap", bob);
    assertSetEquals(new Set(aliceJson.keys()), new Set([]));
    assertSetEquals(new Set(bobJson.keys()), new Set([]));
    // Inits go through
    aliceJson.init("test", 0);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceJson.keysByType(0)), new Set(["test"]));
    assertSetEquals(new Set(bobJson.keysByType(0)), new Set(["test"]));
    assert_1.default(aliceJson.has("test", 0));
    assert_1.default(bobJson.has("test", 0));
    let aliceTest = aliceJson.get("test", 0);
    assert_1.default(aliceTest);
    let bobTest = bobJson.get("test", 0);
    assert_1.default(bobTest);
    assert_1.default.equal(aliceTest.value, 0);
    assert_1.default.equal(bobTest.value, 0);
    // Value ops work
    aliceTest.add(3);
    bobTest.add(4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceTest.value, 7);
    assert_1.default.equal(bobTest.value, 7);
    // Delete works
    bobJson.delete("test", 0);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceJson.keys()), new Set([]));
    assertSetEquals(new Set(bobJson.keys()), new Set([]));
    assert_1.default(aliceJson.get("test", 0) === undefined);
    assert_1.default(bobJson.get("test", 0) === undefined);
    aliceJson.init("register", 0);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceJson.keysByType(0)), new Set(["register"]));
    assertSetEquals(new Set(bobJson.keysByType(0)), new Set(["register"]));
    // Concurrent operation revives key
    let bobRegister = bobJson.get("register", 0);
    aliceJson.delete("register", 0);
    bobRegister.add(3);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceJson.keysByType(0)), new Set(["register"]));
    assertSetEquals(new Set(bobJson.keysByType(0)), new Set(["register"]));
    assert_1.default.equal(bobRegister.value, 3);
    assert_1.default.equal(aliceJson.get("register", 0).value, 3);
    // // Reset tests
    // // Concurrent op revives
    // let aliceRegister = aliceJson.get("register") as IntRegisterCrdt;
    // aliceJson.reset();
    // assertSetEquals(new Set(aliceJson.keys()), new Set([]));
    // assert.equal(aliceJson.get("register"), undefined);
    // assert.equal(aliceRegister.value, 0);
    // bobRegister.add(5);
    // runtimeGen.releaseAll();
    // assertSetEquals(new Set(aliceJson.keys()), new Set(["register"]));
    // assertSetEquals(new Set(bobJson.keys()), new Set(["register"]));
    // assert.equal(bobRegister.value, 5);
    // assert.equal(aliceRegister, aliceJson.get("register"));
    // assert.equal(aliceRegister.value, 5);
    //
    // // Causally later op revives
    // bobJson.reset();
    // bobRegister.add(7);
    // runtimeGen.releaseAll();
    // assertSetEquals(new Set(aliceJson.keys()), new Set(["register"]));
    // assertSetEquals(new Set(bobJson.keys()), new Set(["register"]));
    // assert.equal(bobRegister.value, 7);
    // assert.equal(aliceRegister, aliceJson.get("register"));
    // assert.equal(aliceRegister.value, 7);
    // TODO: strong delete, strong resets, nesting?
    console.log("...ok");
}
function testJsonConversion() {
    console.log("testJsonMapFeatures()...");
    let aliceJson = new json_1.JsonCrdt("json2", alice);
    let bobJson = new json_1.JsonCrdt("json2", bob);
    let testObj = {
        "topic": "games",
        "reviews": [
            { "name": "monopoly", "rating": 7 },
            { "name": "life", "rating": 6 }
        ]
    };
    let nestedObj = {
        "topic": "nesting",
        "nested": testObj
    };
    aliceJson.value = nestedObj;
    runtimeGen.releaseAll();
    console.log("alice: " + JSON.stringify(aliceJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true)));
    console.log("bob: " + JSON.stringify(bobJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true)));
    assert_1.default.deepStrictEqual(aliceJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true), nestedObj);
    assert_1.default.deepStrictEqual(bobJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true), nestedObj);
    bobJson.setValue("flag", true);
    nestedObj.flag = true;
    runtimeGen.releaseAll();
    console.log("alice: " + JSON.stringify(aliceJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true)));
    console.log("bob: " + JSON.stringify(bobJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true)));
    assert_1.default.deepStrictEqual(aliceJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true), nestedObj);
    assert_1.default.deepStrictEqual(bobJson.getAsObject(json_1.JsonCrdt.ErrorOnConflict, true), nestedObj);
    console.log("...ok");
}
testJsonMapFeatures();
testJsonConversion();
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}
function setEquals(set1, set2) {
    return isSuperset(set1, set2) && isSuperset(set2, set1);
}
function assertSetEquals(set1, set2) {
    if (!setEquals(set1, set2)) {
        throw new Error("setEquals failed, actual: " +
            JSON.stringify([...set1.values()]) + ", expected: " +
            JSON.stringify([...set2.values()]));
    }
    assert_1.default(setEquals(set1, set2));
}


/***/ }),

/***/ "./test/crdts/resettable_tests.ts":
/*!****************************************!*\
  !*** ./test/crdts/resettable_tests.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/assert/assert.js"));
const runtime_for_testing_1 = __webpack_require__(/*! ../runtime_for_testing */ "./test/runtime_for_testing.ts");
const standard_1 = __webpack_require__(/*! ../../src/crdts/standard */ "./src/crdts/standard.ts");
let runtimeGen = new runtime_for_testing_1.TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");
function testResettableCounter() {
    // Test DefaultResettableCrdt by testing IntRegisterCrdt's
    // add and reset operations, since it's a simple example.
    console.log("testResettableCounter()...");
    let aliceCounter = new standard_1.IntRegisterCrdt("resettableCounterId", alice);
    aliceCounter.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " did " + event.description));
    let bobCounter = new standard_1.IntRegisterCrdt("resettableCounterId", bob);
    bobCounter.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " did " + event.description));
    assert_1.default.equal(aliceCounter.value, 0);
    assert_1.default.equal(bobCounter.value, 0);
    aliceCounter.add(3);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 3);
    assert_1.default.equal(bobCounter.value, 3);
    bobCounter.add(-4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, -1);
    assert_1.default.equal(bobCounter.value, -1);
    aliceCounter.value = 11;
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 11);
    assert_1.default.equal(bobCounter.value, 11);
    // Out of order test
    aliceCounter.add(2);
    assert_1.default.equal(aliceCounter.value, 13);
    assert_1.default.equal(bobCounter.value, 11);
    bobCounter.add(-5);
    assert_1.default.equal(aliceCounter.value, 13);
    assert_1.default.equal(bobCounter.value, 6);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 8);
    assert_1.default.equal(bobCounter.value, 8);
    // Observed reset tests
    aliceCounter.reset();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 0);
    assert_1.default.equal(bobCounter.value, 0);
    bobCounter.add(7);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 7);
    assert_1.default.equal(bobCounter.value, 7);
    // Concurrent add should survive
    aliceCounter.reset();
    bobCounter.add(10);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 10);
    assert_1.default.equal(bobCounter.value, 10);
    // Reset-wins tests
    bobCounter.resetStrong();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 0);
    assert_1.default.equal(bobCounter.value, 0);
    aliceCounter.add(6);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 6);
    assert_1.default.equal(bobCounter.value, 6);
    // Concurrent add should not survive
    aliceCounter.resetStrong();
    bobCounter.add(20);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 0);
    assert_1.default.equal(bobCounter.value, 0);
    // Lots of concurrency
    aliceCounter.add(3);
    bobCounter.add(7);
    aliceCounter.reset();
    runtimeGen.release(bob);
    assert_1.default.equal(aliceCounter.value, 7);
    assert_1.default.equal(bobCounter.value, 7);
    bobCounter.resetStrong();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceCounter.value, 0);
    assert_1.default.equal(bobCounter.value, 0);
    console.log("...ok");
}
testResettableCounter();


/***/ }),

/***/ "./test/crdts/standard_tests.ts":
/*!**************************************!*\
  !*** ./test/crdts/standard_tests.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "../../../../../../compoventuals_extra/node_modules/webpack/node_modules/assert/assert.js"));
const runtime_for_testing_1 = __webpack_require__(/*! ../runtime_for_testing */ "./test/runtime_for_testing.ts");
const standard_1 = __webpack_require__(/*! ../../src/crdts/standard */ "./src/crdts/standard.ts");
let runtimeGen = new runtime_for_testing_1.TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");
function testEwFlag() {
    console.log("testEwFlag()...");
    let aliceFlag = new standard_1.EnableWinsFlag("ewFlagId", alice);
    aliceFlag.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " did " + event.description));
    let bobFlag = new standard_1.EnableWinsFlag("ewFlagId", bob);
    bobFlag.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " did " + event.description));
    assert_1.default.equal(aliceFlag.enabled, false);
    assert_1.default.equal(bobFlag.enabled, false);
    aliceFlag.enable();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, true);
    assert_1.default.equal(bobFlag.enabled, true);
    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, false);
    assert_1.default.equal(bobFlag.enabled, false);
    aliceFlag.enable();
    bobFlag.disable();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, true);
    assert_1.default.equal(bobFlag.enabled, true);
    console.log("...ok");
}
function testDwFlag() {
    console.log("testDwFlag()...");
    let aliceFlag = new standard_1.DisableWinsFlag("dwFlagId", alice);
    aliceFlag.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " did " + event.description));
    let bobFlag = new standard_1.DisableWinsFlag("dwFlagId", bob);
    bobFlag.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " did " + event.description));
    assert_1.default.equal(aliceFlag.enabled, true);
    assert_1.default.equal(bobFlag.enabled, true);
    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, false);
    assert_1.default.equal(bobFlag.enabled, false);
    bobFlag.enable();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, true);
    assert_1.default.equal(bobFlag.enabled, true);
    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, false);
    assert_1.default.equal(bobFlag.enabled, false);
    aliceFlag.enable();
    bobFlag.disable();
    assert_1.default.equal(aliceFlag.enabled, true);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceFlag.enabled, false);
    assert_1.default.equal(bobFlag.enabled, false);
    console.log("...ok");
}
function testIntRegister() {
    console.log("testIntRegister()...");
    let aliceIntRegister = new standard_1.IntRegisterCrdt("intRegisterId", alice);
    aliceIntRegister.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    let bobIntRegister = new standard_1.IntRegisterCrdt("intRegisterId", bob);
    bobIntRegister.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert_1.default.equal(aliceIntRegister.value, 0);
    assert_1.default.equal(bobIntRegister.value, 0);
    aliceIntRegister.add(3);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, 3);
    assert_1.default.equal(bobIntRegister.value, 3);
    bobIntRegister.mult(-4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, -12);
    assert_1.default.equal(bobIntRegister.value, -12);
    aliceIntRegister.add(7);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, -5);
    assert_1.default.equal(bobIntRegister.value, -5);
    // Out of order tests
    aliceIntRegister.add(2);
    assert_1.default.equal(aliceIntRegister.value, -3);
    assert_1.default.equal(bobIntRegister.value, -5);
    bobIntRegister.mult(5);
    assert_1.default.equal(aliceIntRegister.value, -3);
    assert_1.default.equal(bobIntRegister.value, -25);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, -15);
    assert_1.default.equal(bobIntRegister.value, -15);
    console.log("...ok");
}
function testFromPaper() {
    // The +/x example from the figure in the paper
    console.log("testFromPaper()...");
    let aliceIntRegister = new standard_1.IntRegisterCrdt("intRegisterId2", alice, 1);
    aliceIntRegister.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    let bobIntRegister = new standard_1.IntRegisterCrdt("intRegisterId2", bob, 1);
    bobIntRegister.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert_1.default.equal(aliceIntRegister.value, 1);
    assert_1.default.equal(bobIntRegister.value, 1);
    aliceIntRegister.mult(2);
    aliceIntRegister.add(1);
    bobIntRegister.mult(3);
    bobIntRegister.add(4);
    assert_1.default.equal(aliceIntRegister.value, 3);
    assert_1.default.equal(bobIntRegister.value, 7);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, 17);
    assert_1.default.equal(bobIntRegister.value, 17);
    console.log("...ok");
}
function testUnresettableIntRegister() {
    console.log("testIntRegister()...");
    let aliceIntRegister = new standard_1.UnresettableIntRegisterCrdt("intRegisterId3", alice);
    aliceIntRegister.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    let bobIntRegister = new standard_1.UnresettableIntRegisterCrdt("intRegisterId3", bob);
    bobIntRegister.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert_1.default.equal(aliceIntRegister.value, 0);
    assert_1.default.equal(bobIntRegister.value, 0);
    aliceIntRegister.add(3);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, 3);
    assert_1.default.equal(bobIntRegister.value, 3);
    bobIntRegister.mult(-4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, -12);
    assert_1.default.equal(bobIntRegister.value, -12);
    aliceIntRegister.add(7);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, -5);
    assert_1.default.equal(bobIntRegister.value, -5);
    // Out of order tests
    aliceIntRegister.add(2);
    assert_1.default.equal(aliceIntRegister.value, -3);
    assert_1.default.equal(bobIntRegister.value, -5);
    bobIntRegister.mult(5);
    assert_1.default.equal(aliceIntRegister.value, -3);
    assert_1.default.equal(bobIntRegister.value, -25);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceIntRegister.value, -15);
    assert_1.default.equal(bobIntRegister.value, -15);
    console.log("...ok");
}
function testOrthogonal() {
    console.log("testOrthogonal()...");
    let aliceOrthogonal = new standard_1.OrthogonalCrdt("orthogonalId", alice);
    aliceOrthogonal.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " set to " +
        event.description));
    let bobOrthogonal = new standard_1.OrthogonalCrdt("orthogonalId", bob);
    bobOrthogonal.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " set to " +
        event.description));
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [0, false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [0, false]);
    aliceOrthogonal.rotate(1);
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [1, false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [1, false]);
    aliceOrthogonal.rotate(10);
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [11 % (2 * Math.PI), false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [11 % (2 * Math.PI), false]);
    aliceOrthogonal.rotate(-10);
    runtimeGen.releaseAll();
    bobOrthogonal.reflectHorizontalAxis();
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [2 * Math.PI - 1, true]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [2 * Math.PI - 1, true]);
    aliceOrthogonal.rotate(1.5);
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [0.5, true]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [0.5, true]);
    bobOrthogonal.reflect(0.5);
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [0.5, false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [0.5, false]);
    // Out of order tests
    aliceOrthogonal.reset();
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [0, false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [0, false]);
    aliceOrthogonal.rotate(Math.PI / 2);
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [Math.PI / 2, false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [0, false]);
    bobOrthogonal.reflectHorizontalAxis();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [Math.PI / 2, false]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [0, true]);
    runtimeGen.releaseAll();
    assert_1.default.deepStrictEqual(aliceOrthogonal.value, [3 * Math.PI / 2, true]);
    assert_1.default.deepStrictEqual(bobOrthogonal.value, [3 * Math.PI / 2, true]);
    console.log("...ok");
}
class BiCounter extends standard_1.CrdtObject {
    constructor(crdtId, runtime) {
        super(crdtId, runtime);
        this.startPredefinedPropertyCreation();
        this.a = new standard_1.IntRegisterCrdt("a", this, 1);
        this.b = new standard_1.IntRegisterCrdt("b", this, 1);
        this.endPredefinedPropertyCreation();
    }
}
function testCrdtObject() {
    console.log("testCrdtObject()...");
    let aliceBi = new BiCounter("biId", alice);
    let bobBi = new BiCounter("biId", bob);
    // Do testFromPaper() on each counter
    aliceBi.a.onchange = (event => console.log("Alice a: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    bobBi.a.onchange = (event => console.log("Bob a: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    aliceBi.b.onchange = (event => console.log("Alice b: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    bobBi.b.onchange = (event => console.log("Bob b: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert_1.default.equal(aliceBi.a.value, 1);
    assert_1.default.equal(bobBi.a.value, 1);
    aliceBi.a.mult(2);
    aliceBi.a.add(1);
    bobBi.a.mult(3);
    bobBi.a.add(4);
    assert_1.default.equal(aliceBi.a.value, 3);
    assert_1.default.equal(bobBi.a.value, 7);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceBi.a.value, 17);
    assert_1.default.equal(bobBi.a.value, 17);
    assert_1.default.equal(aliceBi.b.value, 1);
    assert_1.default.equal(bobBi.b.value, 1);
    aliceBi.b.mult(2);
    aliceBi.b.add(1);
    bobBi.b.mult(3);
    bobBi.b.add(4);
    assert_1.default.equal(aliceBi.b.value, 3);
    assert_1.default.equal(bobBi.b.value, 7);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceBi.b.value, 17);
    assert_1.default.equal(bobBi.b.value, 17);
    console.log("...ok");
}
function testAwSet() {
    console.log("testAwSet()...");
    let aliceSet = new standard_1.AddWinsSet("awSetId", alice);
    aliceSet.onchange = (event => console.log("Alice: " + event.timestamp.getSender() + " did " +
        JSON.stringify(event.description)));
    let bobSet = new standard_1.AddWinsSet("awSetId", bob);
    bobSet.onchange = (event => console.log("Bob: " + event.timestamp.getSender() + " did " +
        JSON.stringify(event.description)));
    assertSetEquals(new Set(aliceSet.values()), new Set());
    assertSetEquals(new Set(bobSet.values()), new Set());
    aliceSet.add("element");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element"]));
    bobSet.add("7");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7"]));
    aliceSet.add("7");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7"]));
    // Out of order test
    aliceSet.add("first");
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7", "first"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7"]));
    bobSet.add("second");
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7", "first"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7", "second"]));
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7", "first", "second"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7", "first", "second"]));
    // Delete tests on single element (copying EwFlag tests)
    aliceSet.delete("element");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["7", "first", "second"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["7", "first", "second"]));
    bobSet.delete("nonexistent");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["7", "first", "second"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["7", "first", "second"]));
    aliceSet.add("concurrent");
    aliceSet.delete("concurrent");
    bobSet.add("concurrent");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["7", "first", "second", "concurrent"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["7", "first", "second", "concurrent"]));
    // TODO: test deleteStrong
    // Observed-reset test
    bobSet.reset();
    assertSetEquals(new Set(bobSet.values()), new Set());
    aliceSet.add("survivor");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["survivor"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["survivor"]));
    //
    // // Reset-wins test
    // aliceSet.resetStrong();
    // aliceSet.add("alice's");
    // bobSet.reset();
    // bobSet.add("bob's");
    // assertSetEquals(new Set(aliceSet.values()), new Set(["alice's"]));
    // assertSetEquals(new Set(bobSet.values()), new Set(["bob's"]));
    // runtimeGen.releaseAll();
    // assertSetEquals(new Set(aliceSet.values()), new Set(["alice's"]));
    // assertSetEquals(new Set(bobSet.values()), new Set(["alice's"]));
    console.log("...ok");
}
function testMap() {
    console.log("testMap()...");
    let aliceMap = new standard_1.MapCrdt("map", alice, (key, internalRuntime) => new standard_1.IntRegisterCrdt(key, internalRuntime));
    let bobMap = new standard_1.MapCrdt("map", bob, (key, internalRuntime) => new standard_1.IntRegisterCrdt(key, internalRuntime));
    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assertSetEquals(new Set(bobMap.keys()), new Set([]));
    // Inits go through
    aliceMap.init("test");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["test"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["test"]));
    assert_1.default(aliceMap.has("test"));
    assert_1.default(bobMap.has("test"));
    let aliceTest = aliceMap.get("test");
    assert_1.default(aliceTest);
    let bobTest = bobMap.get("test");
    assert_1.default(bobTest);
    assert_1.default.equal(aliceTest.value, 0);
    assert_1.default.equal(bobTest.value, 0);
    // Value ops work
    aliceTest.add(3);
    bobTest.add(4);
    runtimeGen.releaseAll();
    assert_1.default.equal(aliceTest.value, 7);
    assert_1.default.equal(bobTest.value, 7);
    // Delete works
    bobMap.delete("test");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assertSetEquals(new Set(bobMap.keys()), new Set([]));
    assert_1.default(aliceMap.get("test") === undefined);
    assert_1.default(bobMap.get("test") === undefined);
    aliceMap.init("register");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    // Concurrent operation revives key
    let bobRegister = bobMap.get("register");
    aliceMap.delete("register");
    bobRegister.add(3);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    assert_1.default.equal(bobRegister.value, 3);
    assert_1.default.equal(aliceMap.get("register").value, 3);
    // Reset tests
    // Concurrent op revives
    let aliceRegister = aliceMap.get("register");
    aliceMap.reset();
    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assert_1.default.equal(aliceMap.get("register"), undefined);
    assert_1.default.equal(aliceRegister.value, 0);
    bobRegister.add(5);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    assert_1.default.equal(bobRegister.value, 5);
    assert_1.default.equal(aliceRegister, aliceMap.get("register"));
    assert_1.default.equal(aliceRegister.value, 5);
    // Causally later op revives
    bobMap.reset();
    bobRegister.add(7);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    assert_1.default.equal(bobRegister.value, 7);
    assert_1.default.equal(aliceRegister, aliceMap.get("register"));
    assert_1.default.equal(aliceRegister.value, 7);
    // TODO: strong delete, strong resets, nesting?
    console.log("...ok");
}
testEwFlag();
testDwFlag();
testIntRegister();
testFromPaper();
testUnresettableIntRegister();
testOrthogonal();
testCrdtObject();
testAwSet();
testMap();
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}
function setEquals(set1, set2) {
    return isSuperset(set1, set2) && isSuperset(set2, set1);
}
function assertSetEquals(set1, set2) {
    if (!setEquals(set1, set2)) {
        throw new Error("setEquals failed, actual: " +
            JSON.stringify([...set1.values()]) + ", expected: " +
            JSON.stringify([...set2.values()]));
    }
    assert_1.default(setEquals(set1, set2));
}


/***/ }),

/***/ "./test/runtime_for_testing.ts":
/*!*************************************!*\
  !*** ./test/runtime_for_testing.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingRuntimeGenerator = void 0;
class TestingRuntime {
    constructor(generator, replicaId) {
        this.generator = generator;
        this.replicaId = replicaId;
        this.listenersById = new Map();
        this.vectorClock = new Map();
        this.vectorClock.set(replicaId, 0);
    }
    send(message, crdtId) {
        this.vectorClock.set(this.replicaId, this.vectorClock.get(this.replicaId) + 1);
        let myReplicaId = this.replicaId;
        let vcCopy = new Map(this.vectorClock);
        let timestamp = {
            getSender() { return myReplicaId; },
            getSenderCounter() { return vcCopy.get(this.getSender()); },
            asVectorClock() { return vcCopy; }
        };
        let queueMap = this.generator.messageQueues.get(this);
        for (let queue of queueMap.values()) {
            // Use different copies for each Crdt, in case they
            // modify message while processing it
            queue.push([JSON.parse(JSON.stringify(message)), crdtId, timestamp]);
        }
    }
    register(crdtMessageListener, crdtId) {
        if (this.listenersById.has(crdtId)) {
            throw new Error("Duplicate crdtId: " + crdtId);
        }
        this.listenersById.set(crdtId, crdtMessageListener);
    }
    getReplicaId() {
        return this.replicaId;
    }
    getNextTimestamp() {
        let vcCopy = new Map(this.vectorClock);
        vcCopy.set(this.replicaId, this.vectorClock.get(this.replicaId) + 1);
        let myReplicaId = this.replicaId;
        let timestamp = {
            getSender() { return myReplicaId; },
            getSenderCounter() { return vcCopy.get(this.getSender()); },
            asVectorClock() { return vcCopy; }
        };
        return timestamp;
    }
}
/**
 * Creates a collection of CrdtRuntimes linked together
 * (i.e., in-memory networking) that deliver messages
 * when release is called.
 */
class TestingRuntimeGenerator {
    constructor() {
        // Maps sender and recipient to an array of queued [message,
        // crdtId, timestamp] tuples.
        this.messageQueues = new Map();
    }
    newRuntime(replicaId) {
        if (replicaId === undefined)
            replicaId = this.messageQueues.size;
        let runtime = new TestingRuntime(this, replicaId);
        let newQueue = new Map();
        for (let oldEntry of this.messageQueues.entries()) {
            newQueue.set(oldEntry[0], []);
            oldEntry[1].set(runtime, []);
        }
        this.messageQueues.set(runtime, newQueue);
        return runtime;
    }
    /**
     * Release all queued messages sender to the specified recipients.
     * If recipients are not specified, releases them to all
     * recipients.  Only recipients that existed at the time
     * of sending will receive a message.
     */
    release(sender, ...recipients) {
        if (recipients.length === 0)
            recipients = [...this.messageQueues.keys()];
        let senderMap = this.messageQueues.get(sender);
        for (let recipient of recipients) {
            if (recipient === sender)
                continue;
            for (let messagePair of senderMap.get(recipient)) {
                let listener = recipient.listenersById.get(messagePair[1]);
                if (listener === undefined) {
                    throw new Error("No Crdt with id " + messagePair[1] +
                        " on replica " + recipient.getReplicaId());
                }
                listener.receive(messagePair[0], messagePair[2]);
                recipient.vectorClock.set(sender.getReplicaId(), messagePair[2].getSenderCounter());
            }
            senderMap.set(recipient, []);
        }
    }
    releaseAll() {
        for (let sender of this.messageQueues.keys())
            this.release(sender);
    }
}
exports.TestingRuntimeGenerator = TestingRuntimeGenerator;


/***/ }),

/***/ "./test/test.ts":
/*!**********************!*\
  !*** ./test/test.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

console.log("Running tests");
__webpack_require__(/*! ./crdts/basic_crdts_tests */ "./test/crdts/basic_crdts_tests.ts");
__webpack_require__(/*! ./crdts/resettable_tests */ "./test/crdts/resettable_tests.ts");
__webpack_require__(/*! ./crdts/standard_tests */ "./test/crdts/standard_tests.ts");
__webpack_require__(/*! ./crdts/json_tests */ "./test/crdts/json_tests.ts");
// const howLongTillLunch = require('..');
//
// class MockDate {
// 	private date = 0;
// 	private hours = 0;
// 	private minutes = 0;
// 	private seconds = 0;
// 	private milliseconds = 0;
//
// 	getDate (): number { return this.date; }
// 	setDate (date: number): void { this.date = date; }
// 	setHours (h: number) { this.hours = h; }
// 	setMinutes (m: number): void { this.minutes = m; }
// 	setSeconds (s: number): void { this.seconds = s; }
// 	setMilliseconds (ms: number): void { this.milliseconds = ms; }
// 	getTime (): number { return this.valueOf(); }
// 	valueOf (): number {
// 		return (
// 			this.milliseconds +
// 			this.seconds * 1e3 +
// 			this.minutes * 1e3 * 60 +
// 			this.hours * 1e3 * 60 * 60 +
// 			this.date * 1e3 * 60 * 60 * 24
// 		);
// 	}
//
// 	static now () { return now.valueOf(); }
// }
//
// const now = new MockDate();
//
// global.Date = MockDate as any as typeof Date;
//
// function test(hours: number, minutes: number, seconds: number, expected: string): void {
// 	now.setHours(hours);
// 	now.setMinutes(minutes);
// 	now.setSeconds(seconds);
//
// 	assert.equal(howLongTillLunch(...lunchtime), expected);
// 	console.log(`\u001B[32m✓\u001B[39m ${expected}`);
// }
//
// let lunchtime = [ 12, 30 ];
// test(11, 30, 0, '1 hour');
// test(10, 30, 0, '2 hours');
// test(12, 25, 0, '5 minutes');
// test(12, 29, 15, '45 seconds');
// test(13, 30, 0, '23 hours');
//
// // some of us like an early lunch
// lunchtime = [ 11, 0 ];
// test(10, 30, 0, '30 minutes');


/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL25vZGVfbW9kdWxlcy9hc3NlcnQvYXNzZXJ0LmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3V0aWwvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2Jhc2ljX2NyZHRzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvY3JkdF9jb3JlLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvanNvbi50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL3Jlc2V0dGFibGUudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9zZW1pZGlyZWN0LnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvc3RhbmRhcmQudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvbmV0d29yay9jcmR0X25ldHdvcmtfcnVudGltZS50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL25ldHdvcmsvdmVjdG9yX2Nsb2NrLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL2Jhc2ljX2NyZHRzX3Rlc3RzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL2pzb25fdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvY3JkdHMvcmVzZXR0YWJsZV90ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9zdGFuZGFyZF90ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9ydW50aW1lX2Zvcl90ZXN0aW5nLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7QUNuQkEsOENBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMscUhBQWU7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsbUdBQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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QUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsbUlBQW9COztBQUUvQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsd0lBQVU7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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LENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDcEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxD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Q0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDN0IsbUJBQU8sQ0FBQyxvRUFBMkIsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFPLENBQUMsa0VBQTBCLENBQUMsQ0FBQztBQUNwQyxtQkFBTyxDQUFDLDhEQUF3QixDQUFDLENBQUM7QUFDbEMsbUJBQU8sQ0FBQyxzREFBb0IsQ0FBQyxDQUFDO0FBRzlCLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0YsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4Qiw2QkFBNkI7QUFDN0IsRUFBRTtBQUNGLDRDQUE0QztBQUM1QyxzREFBc0Q7QUFDdEQsNENBQTRDO0FBQzVDLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFDdEQsa0VBQWtFO0FBQ2xFLGlEQUFpRDtBQUNqRCx3QkFBd0I7QUFDeEIsYUFBYTtBQUNiLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsT0FBTztBQUNQLEtBQUs7QUFDTCxFQUFFO0FBQ0YsMkNBQTJDO0FBQzNDLElBQUk7QUFDSixFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLEVBQUU7QUFDRixnREFBZ0Q7QUFDaEQsRUFBRTtBQUNGLDJGQUEyRjtBQUMzRix3QkFBd0I7QUFDeEIsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QixFQUFFO0FBQ0YsMkRBQTJEO0FBQzNELHFEQUFxRDtBQUNyRCxJQUFJO0FBQ0osRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLEVBQUU7QUFDRixvQ0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLGlDQUFpQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuLy8gY29tcGFyZSBhbmQgaXNCdWZmZXIgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9ibG9iLzY4MGU5ZTVlNDg4ZjIyYWFjMjc1OTlhNTdkYzg0NGE2MzE1OTI4ZGQvaW5kZXguanNcbi8vIG9yaWdpbmFsIG5vdGljZTpcblxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgeCA9IGEubGVuZ3RoO1xuICB2YXIgeSA9IGIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldO1xuICAgICAgeSA9IGJbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgaWYgKHkgPCB4KSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5mdW5jdGlvbiBpc0J1ZmZlcihiKSB7XG4gIGlmIChnbG9iYWwuQnVmZmVyICYmIHR5cGVvZiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIoYik7XG4gIH1cbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcik7XG59XG5cbi8vIGJhc2VkIG9uIG5vZGUgYXNzZXJ0LCBvcmlnaW5hbCBub3RpY2U6XG4vLyBOQjogVGhlIFVSTCB0byB0aGUgQ29tbW9uSlMgc3BlYyBpcyBrZXB0IGp1c3QgZm9yIHRyYWRpdGlvbi5cbi8vICAgICBub2RlLWFzc2VydCBoYXMgZXZvbHZlZCBhIGxvdCBzaW5jZSB0aGVuLCBib3RoIGluIEFQSSBhbmQgYmVoYXZpb3IuXG5cbi8vIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1VuaXRfVGVzdGluZy8xLjBcbi8vXG4vLyBUSElTIElTIE5PVCBURVNURUQgTk9SIExJS0VMWSBUTyBXT1JLIE9VVFNJREUgVjghXG4vL1xuLy8gT3JpZ2luYWxseSBmcm9tIG5hcndoYWwuanMgKGh0dHA6Ly9uYXJ3aGFsanMub3JnKVxuLy8gQ29weXJpZ2h0IChjKSAyMDA5IFRob21hcyBSb2JpbnNvbiA8Mjgwbm9ydGguY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICdTb2Z0d2FyZScpLCB0b1xuLy8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbi8vIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuLy8gc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgZnVuY3Rpb25zSGF2ZU5hbWVzID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZvbygpIHt9Lm5hbWUgPT09ICdmb28nO1xufSgpKTtcbmZ1bmN0aW9uIHBUb1N0cmluZyAob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbn1cbmZ1bmN0aW9uIGlzVmlldyhhcnJidWYpIHtcbiAgaWYgKGlzQnVmZmVyKGFycmJ1ZikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBnbG9iYWwuQXJyYXlCdWZmZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KGFycmJ1Zik7XG4gIH1cbiAgaWYgKCFhcnJidWYpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGFycmJ1ZiBpbnN0YW5jZW9mIERhdGFWaWV3KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGFycmJ1Zi5idWZmZXIgJiYgYXJyYnVmLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLy8gMS4gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xuXG4vLyAyLiBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBhc3NlcnQuXG4vLyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHsgbWVzc2FnZTogbWVzc2FnZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQgfSlcblxudmFyIHJlZ2V4ID0gL1xccypmdW5jdGlvblxccysoW15cXChcXHNdKilcXHMqLztcbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvZnVuY3Rpb24ucHJvdG90eXBlLm5hbWUvYmxvYi9hZGVlZWVjOGJmY2M2MDY4YjE4N2Q3ZDlmYjNkNWJiMWQzYTMwODk5L2ltcGxlbWVudGF0aW9uLmpzXG5mdW5jdGlvbiBnZXROYW1lKGZ1bmMpIHtcbiAgaWYgKCF1dGlsLmlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGZ1bmN0aW9uc0hhdmVOYW1lcykge1xuICAgIHJldHVybiBmdW5jLm5hbWU7XG4gIH1cbiAgdmFyIHN0ciA9IGZ1bmMudG9TdHJpbmcoKTtcbiAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKHJlZ2V4KTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdO1xufVxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICB0aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICB0aGlzLmFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsO1xuICB0aGlzLmV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3I7XG4gIGlmIChvcHRpb25zLm1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZ2V0TWVzc2FnZSh0aGlzKTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG4gIHZhciBzdGFja1N0YXJ0RnVuY3Rpb24gPSBvcHRpb25zLnN0YWNrU3RhcnRGdW5jdGlvbiB8fCBmYWlsO1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzdGFja1N0YXJ0RnVuY3Rpb24pO1xuICB9IGVsc2Uge1xuICAgIC8vIG5vbiB2OCBicm93c2VycyBzbyB3ZSBjYW4gaGF2ZSBhIHN0YWNrdHJhY2VcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgaWYgKGVyci5zdGFjaykge1xuICAgICAgdmFyIG91dCA9IGVyci5zdGFjaztcblxuICAgICAgLy8gdHJ5IHRvIHN0cmlwIHVzZWxlc3MgZnJhbWVzXG4gICAgICB2YXIgZm5fbmFtZSA9IGdldE5hbWUoc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgICAgIHZhciBpZHggPSBvdXQuaW5kZXhPZignXFxuJyArIGZuX25hbWUpO1xuICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgIC8vIG9uY2Ugd2UgaGF2ZSBsb2NhdGVkIHRoZSBmdW5jdGlvbiBmcmFtZVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGJlZm9yZSBpdCAoYW5kIGl0cyBsaW5lKVxuICAgICAgICB2YXIgbmV4dF9saW5lID0gb3V0LmluZGV4T2YoJ1xcbicsIGlkeCArIDEpO1xuICAgICAgICBvdXQgPSBvdXQuc3Vic3RyaW5nKG5leHRfbGluZSArIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWNrID0gb3V0O1xuICAgIH1cbiAgfVxufTtcblxuLy8gYXNzZXJ0LkFzc2VydGlvbkVycm9yIGluc3RhbmNlb2YgRXJyb3JcbnV0aWwuaW5oZXJpdHMoYXNzZXJ0LkFzc2VydGlvbkVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHMsIG4pIHtcbiAgaWYgKHR5cGVvZiBzID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzLmxlbmd0aCA8IG4gPyBzIDogcy5zbGljZSgwLCBuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcztcbiAgfVxufVxuZnVuY3Rpb24gaW5zcGVjdChzb21ldGhpbmcpIHtcbiAgaWYgKGZ1bmN0aW9uc0hhdmVOYW1lcyB8fCAhdXRpbC5pc0Z1bmN0aW9uKHNvbWV0aGluZykpIHtcbiAgICByZXR1cm4gdXRpbC5pbnNwZWN0KHNvbWV0aGluZyk7XG4gIH1cbiAgdmFyIHJhd25hbWUgPSBnZXROYW1lKHNvbWV0aGluZyk7XG4gIHZhciBuYW1lID0gcmF3bmFtZSA/ICc6ICcgKyByYXduYW1lIDogJyc7XG4gIHJldHVybiAnW0Z1bmN0aW9uJyArICBuYW1lICsgJ10nO1xufVxuZnVuY3Rpb24gZ2V0TWVzc2FnZShzZWxmKSB7XG4gIHJldHVybiB0cnVuY2F0ZShpbnNwZWN0KHNlbGYuYWN0dWFsKSwgMTI4KSArICcgJyArXG4gICAgICAgICBzZWxmLm9wZXJhdG9yICsgJyAnICtcbiAgICAgICAgIHRydW5jYXRlKGluc3BlY3Qoc2VsZi5leHBlY3RlZCksIDEyOCk7XG59XG5cbi8vIEF0IHByZXNlbnQgb25seSB0aGUgdGhyZWUga2V5cyBtZW50aW9uZWQgYWJvdmUgYXJlIHVzZWQgYW5kXG4vLyB1bmRlcnN0b29kIGJ5IHRoZSBzcGVjLiBJbXBsZW1lbnRhdGlvbnMgb3Igc3ViIG1vZHVsZXMgY2FuIHBhc3Ncbi8vIG90aGVyIGtleXMgdG8gdGhlIEFzc2VydGlvbkVycm9yJ3MgY29uc3RydWN0b3IgLSB0aGV5IHdpbGwgYmVcbi8vIGlnbm9yZWQuXG5cbi8vIDMuIEFsbCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBtdXN0IHRocm93IGFuIEFzc2VydGlvbkVycm9yXG4vLyB3aGVuIGEgY29ycmVzcG9uZGluZyBjb25kaXRpb24gaXMgbm90IG1ldCwgd2l0aCBhIG1lc3NhZ2UgdGhhdFxuLy8gbWF5IGJlIHVuZGVmaW5lZCBpZiBub3QgcHJvdmlkZWQuICBBbGwgYXNzZXJ0aW9uIG1ldGhvZHMgcHJvdmlkZVxuLy8gYm90aCB0aGUgYWN0dWFsIGFuZCBleHBlY3RlZCB2YWx1ZXMgdG8gdGhlIGFzc2VydGlvbiBlcnJvciBmb3Jcbi8vIGRpc3BsYXkgcHVycG9zZXMuXG5cbmZ1bmN0aW9uIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IsIHN0YWNrU3RhcnRGdW5jdGlvbikge1xuICB0aHJvdyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHtcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgIGFjdHVhbDogYWN0dWFsLFxuICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICBvcGVyYXRvcjogb3BlcmF0b3IsXG4gICAgc3RhY2tTdGFydEZ1bmN0aW9uOiBzdGFja1N0YXJ0RnVuY3Rpb25cbiAgfSk7XG59XG5cbi8vIEVYVEVOU0lPTiEgYWxsb3dzIGZvciB3ZWxsIGJlaGF2ZWQgZXJyb3JzIGRlZmluZWQgZWxzZXdoZXJlLlxuYXNzZXJ0LmZhaWwgPSBmYWlsO1xuXG4vLyA0LiBQdXJlIGFzc2VydGlvbiB0ZXN0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdHJ1dGh5LCBhcyBkZXRlcm1pbmVkXG4vLyBieSAhIWd1YXJkLlxuLy8gYXNzZXJ0Lm9rKGd1YXJkLCBtZXNzYWdlX29wdCk7XG4vLyBUaGlzIHN0YXRlbWVudCBpcyBlcXVpdmFsZW50IHRvIGFzc2VydC5lcXVhbCh0cnVlLCAhIWd1YXJkLFxuLy8gbWVzc2FnZV9vcHQpOy4gVG8gdGVzdCBzdHJpY3RseSBmb3IgdGhlIHZhbHVlIHRydWUsIHVzZVxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKHRydWUsIGd1YXJkLCBtZXNzYWdlX29wdCk7LlxuXG5mdW5jdGlvbiBvayh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAoIXZhbHVlKSBmYWlsKHZhbHVlLCB0cnVlLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQub2spO1xufVxuYXNzZXJ0Lm9rID0gb2s7XG5cbi8vIDUuIFRoZSBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc2hhbGxvdywgY29lcmNpdmUgZXF1YWxpdHkgd2l0aFxuLy8gPT0uXG4vLyBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuZXF1YWwgPSBmdW5jdGlvbiBlcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09JywgYXNzZXJ0LmVxdWFsKTtcbn07XG5cbi8vIDYuIFRoZSBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciB3aGV0aGVyIHR3byBvYmplY3RzIGFyZSBub3QgZXF1YWxcbi8vIHdpdGggIT0gYXNzZXJ0Lm5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gbm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT0nLCBhc3NlcnQubm90RXF1YWwpO1xuICB9XG59O1xuXG4vLyA3LiBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cbi8vIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuZGVlcEVxdWFsID0gZnVuY3Rpb24gZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKCFfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIGZhbHNlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBFcXVhbCcsIGFzc2VydC5kZWVwRXF1YWwpO1xuICB9XG59O1xuXG5hc3NlcnQuZGVlcFN0cmljdEVxdWFsID0gZnVuY3Rpb24gZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKCFfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHRydWUpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcFN0cmljdEVxdWFsJywgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgc3RyaWN0LCBtZW1vcykge1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0J1ZmZlcihhY3R1YWwpICYmIGlzQnVmZmVyKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBjb21wYXJlKGFjdHVhbCwgZXhwZWN0ZWQpID09PSAwO1xuXG4gIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgRGF0ZSBvYmplY3QgdGhhdCByZWZlcnMgdG8gdGhlIHNhbWUgdGltZS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzRGF0ZShhY3R1YWwpICYmIHV0aWwuaXNEYXRlKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgUmVnRXhwIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNvdXJjZSBhbmRcbiAgLy8gcHJvcGVydGllcyAoYGdsb2JhbGAsIGBtdWx0aWxpbmVgLCBgbGFzdEluZGV4YCwgYGlnbm9yZUNhc2VgKS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzUmVnRXhwKGFjdHVhbCkgJiYgdXRpbC5pc1JlZ0V4cChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLnNvdXJjZSA9PT0gZXhwZWN0ZWQuc291cmNlICYmXG4gICAgICAgICAgIGFjdHVhbC5nbG9iYWwgPT09IGV4cGVjdGVkLmdsb2JhbCAmJlxuICAgICAgICAgICBhY3R1YWwubXVsdGlsaW5lID09PSBleHBlY3RlZC5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgYWN0dWFsLmxhc3RJbmRleCA9PT0gZXhwZWN0ZWQubGFzdEluZGV4ICYmXG4gICAgICAgICAgIGFjdHVhbC5pZ25vcmVDYXNlID09PSBleHBlY3RlZC5pZ25vcmVDYXNlO1xuXG4gIC8vIDcuNC4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICgoYWN0dWFsID09PSBudWxsIHx8IHR5cGVvZiBhY3R1YWwgIT09ICdvYmplY3QnKSAmJlxuICAgICAgICAgICAgIChleHBlY3RlZCA9PT0gbnVsbCB8fCB0eXBlb2YgZXhwZWN0ZWQgIT09ICdvYmplY3QnKSkge1xuICAgIHJldHVybiBzdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIElmIGJvdGggdmFsdWVzIGFyZSBpbnN0YW5jZXMgb2YgdHlwZWQgYXJyYXlzLCB3cmFwIHRoZWlyIHVuZGVybHlpbmdcbiAgLy8gQXJyYXlCdWZmZXJzIGluIGEgQnVmZmVyIGVhY2ggdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAgLy8gVGhpcyBvcHRpbWl6YXRpb24gcmVxdWlyZXMgdGhlIGFycmF5cyB0byBoYXZlIHRoZSBzYW1lIHR5cGUgYXMgY2hlY2tlZCBieVxuICAvLyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nIChha2EgcFRvU3RyaW5nKS4gTmV2ZXIgcGVyZm9ybSBiaW5hcnlcbiAgLy8gY29tcGFyaXNvbnMgZm9yIEZsb2F0KkFycmF5cywgdGhvdWdoLCBzaW5jZSBlLmcuICswID09PSAtMCBidXQgdGhlaXJcbiAgLy8gYml0IHBhdHRlcm5zIGFyZSBub3QgaWRlbnRpY2FsLlxuICB9IGVsc2UgaWYgKGlzVmlldyhhY3R1YWwpICYmIGlzVmlldyhleHBlY3RlZCkgJiZcbiAgICAgICAgICAgICBwVG9TdHJpbmcoYWN0dWFsKSA9PT0gcFRvU3RyaW5nKGV4cGVjdGVkKSAmJlxuICAgICAgICAgICAgICEoYWN0dWFsIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5IHx8XG4gICAgICAgICAgICAgICBhY3R1YWwgaW5zdGFuY2VvZiBGbG9hdDY0QXJyYXkpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUobmV3IFVpbnQ4QXJyYXkoYWN0dWFsLmJ1ZmZlciksXG4gICAgICAgICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZXhwZWN0ZWQuYnVmZmVyKSkgPT09IDA7XG5cbiAgLy8gNy41IEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIGlmIChpc0J1ZmZlcihhY3R1YWwpICE9PSBpc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgbWVtb3MgPSBtZW1vcyB8fCB7YWN0dWFsOiBbXSwgZXhwZWN0ZWQ6IFtdfTtcblxuICAgIHZhciBhY3R1YWxJbmRleCA9IG1lbW9zLmFjdHVhbC5pbmRleE9mKGFjdHVhbCk7XG4gICAgaWYgKGFjdHVhbEluZGV4ICE9PSAtMSkge1xuICAgICAgaWYgKGFjdHVhbEluZGV4ID09PSBtZW1vcy5leHBlY3RlZC5pbmRleE9mKGV4cGVjdGVkKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vcy5hY3R1YWwucHVzaChhY3R1YWwpO1xuICAgIG1lbW9zLmV4cGVjdGVkLnB1c2goZXhwZWN0ZWQpO1xuXG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIHN0cmljdCwgbWVtb3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIHN0cmljdCwgYWN0dWFsVmlzaXRlZE9iamVjdHMpIHtcbiAgaWYgKGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gaWYgb25lIGlzIGEgcHJpbWl0aXZlLCB0aGUgb3RoZXIgbXVzdCBiZSBzYW1lXG4gIGlmICh1dGlsLmlzUHJpbWl0aXZlKGEpIHx8IHV0aWwuaXNQcmltaXRpdmUoYikpXG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIGlmIChzdHJpY3QgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGEpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB2YXIgYUlzQXJncyA9IGlzQXJndW1lbnRzKGEpO1xuICB2YXIgYklzQXJncyA9IGlzQXJndW1lbnRzKGIpO1xuICBpZiAoKGFJc0FyZ3MgJiYgIWJJc0FyZ3MpIHx8ICghYUlzQXJncyAmJiBiSXNBcmdzKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmIChhSXNBcmdzKSB7XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gX2RlZXBFcXVhbChhLCBiLCBzdHJpY3QpO1xuICB9XG4gIHZhciBrYSA9IG9iamVjdEtleXMoYSk7XG4gIHZhciBrYiA9IG9iamVjdEtleXMoYik7XG4gIHZhciBrZXksIGk7XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT09IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9PSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghX2RlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgc3RyaWN0LCBhY3R1YWxWaXNpdGVkT2JqZWN0cykpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIDguIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuLy8gYXNzZXJ0Lm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiBub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBmYWxzZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwRXF1YWwnLCBhc3NlcnQubm90RGVlcEVxdWFsKTtcbiAgfVxufTtcblxuYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbCA9IG5vdERlZXBTdHJpY3RFcXVhbDtcbmZ1bmN0aW9uIG5vdERlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHRydWUpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcFN0cmljdEVxdWFsJywgbm90RGVlcFN0cmljdEVxdWFsKTtcbiAgfVxufVxuXG5cbi8vIDkuIFRoZSBzdHJpY3QgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHN0cmljdCBlcXVhbGl0eSwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT09JywgYXNzZXJ0LnN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gMTAuIFRoZSBzdHJpY3Qgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igc3RyaWN0IGluZXF1YWxpdHksIGFzXG4vLyBkZXRlcm1pbmVkIGJ5ICE9PS4gIGFzc2VydC5ub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPT0nLCBhc3NlcnQubm90U3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXhwZWN0ZWQpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBJZ25vcmUuICBUaGUgaW5zdGFuY2VvZiBjaGVjayBkb2Vzbid0IHdvcmsgZm9yIGFycm93IGZ1bmN0aW9ucy5cbiAgfVxuXG4gIGlmIChFcnJvci5pc1Byb3RvdHlwZU9mKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfdHJ5QmxvY2soYmxvY2spIHtcbiAgdmFyIGVycm9yO1xuICB0cnkge1xuICAgIGJsb2NrKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlcnJvciA9IGU7XG4gIH1cbiAgcmV0dXJuIGVycm9yO1xufVxuXG5mdW5jdGlvbiBfdGhyb3dzKHNob3VsZFRocm93LCBibG9jaywgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGFjdHVhbDtcblxuICBpZiAodHlwZW9mIGJsb2NrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJibG9ja1wiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBleHBlY3RlZCA9PT0gJ3N0cmluZycpIHtcbiAgICBtZXNzYWdlID0gZXhwZWN0ZWQ7XG4gICAgZXhwZWN0ZWQgPSBudWxsO1xuICB9XG5cbiAgYWN0dWFsID0gX3RyeUJsb2NrKGJsb2NrKTtcblxuICBtZXNzYWdlID0gKGV4cGVjdGVkICYmIGV4cGVjdGVkLm5hbWUgPyAnICgnICsgZXhwZWN0ZWQubmFtZSArICcpLicgOiAnLicpICtcbiAgICAgICAgICAgIChtZXNzYWdlID8gJyAnICsgbWVzc2FnZSA6ICcuJyk7XG5cbiAgaWYgKHNob3VsZFRocm93ICYmICFhY3R1YWwpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdNaXNzaW5nIGV4cGVjdGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIHZhciB1c2VyUHJvdmlkZWRNZXNzYWdlID0gdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnO1xuICB2YXIgaXNVbndhbnRlZEV4Y2VwdGlvbiA9ICFzaG91bGRUaHJvdyAmJiB1dGlsLmlzRXJyb3IoYWN0dWFsKTtcbiAgdmFyIGlzVW5leHBlY3RlZEV4Y2VwdGlvbiA9ICFzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgIWV4cGVjdGVkO1xuXG4gIGlmICgoaXNVbndhbnRlZEV4Y2VwdGlvbiAmJlxuICAgICAgdXNlclByb3ZpZGVkTWVzc2FnZSAmJlxuICAgICAgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8XG4gICAgICBpc1VuZXhwZWN0ZWRFeGNlcHRpb24pIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdHb3QgdW53YW50ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiZcbiAgICAgICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHwgKCFzaG91bGRUaHJvdyAmJiBhY3R1YWwpKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbi8vIDExLiBFeHBlY3RlZCB0byB0aHJvdyBhbiBlcnJvcjpcbi8vIGFzc2VydC50aHJvd3MoYmxvY2ssIEVycm9yX29wdCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3ModHJ1ZSwgYmxvY2ssIGVycm9yLCBtZXNzYWdlKTtcbn07XG5cbi8vIEVYVEVOU0lPTiEgVGhpcyBpcyBhbm5veWluZyB0byB3cml0ZSBvdXRzaWRlIHRoaXMgbW9kdWxlLlxuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzKGZhbHNlLCBibG9jaywgZXJyb3IsIG1lc3NhZ2UpO1xufTtcblxuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbihlcnIpIHsgaWYgKGVycikgdGhyb3cgZXJyOyB9O1xuXG4vLyBFeHBvc2UgYSBzdHJpY3Qgb25seSB2YXJpYW50IG9mIGFzc2VydFxuZnVuY3Rpb24gc3RyaWN0KHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIGZhaWwodmFsdWUsIHRydWUsIG1lc3NhZ2UsICc9PScsIHN0cmljdCk7XG59XG5hc3NlcnQuc3RyaWN0ID0gb2JqZWN0QXNzaWduKHN0cmljdCwgYXNzZXJ0LCB7XG4gIGVxdWFsOiBhc3NlcnQuc3RyaWN0RXF1YWwsXG4gIGRlZXBFcXVhbDogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCxcbiAgbm90RXF1YWw6IGFzc2VydC5ub3RTdHJpY3RFcXVhbCxcbiAgbm90RGVlcEVxdWFsOiBhc3NlcnQubm90RGVlcFN0cmljdEVxdWFsXG59KTtcbmFzc2VydC5zdHJpY3Quc3RyaWN0ID0gYXNzZXJ0LnN0cmljdDtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHx8XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgZGVzY3JpcHRvcnNba2V5c1tpXV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfTtcblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG52YXIga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ3V0aWwucHJvbWlzaWZ5LmN1c3RvbScpIDogdW5kZWZpbmVkO1xuXG5leHBvcnRzLnByb21pc2lmeSA9IGZ1bmN0aW9uIHByb21pc2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCAmJiBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdKSB7XG4gICAgdmFyIGZuID0gb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJ1dGlsLnByb21pc2lmeS5jdXN0b21cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgdmFyIHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgcHJvbWlzZVJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGZuLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgZm4sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbClcbiAgKTtcbn1cblxuZXhwb3J0cy5wcm9taXNpZnkuY3VzdG9tID0ga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5T25SZWplY3RlZChyZWFzb24sIGNiKSB7XG4gIC8vIGAhcmVhc29uYCBndWFyZCBpbnNwaXJlZCBieSBibHVlYmlyZCAoUmVmOiBodHRwczovL2dvby5nbC90NUlTNk0pLlxuICAvLyBCZWNhdXNlIGBudWxsYCBpcyBhIHNwZWNpYWwgZXJyb3IgdmFsdWUgaW4gY2FsbGJhY2tzIHdoaWNoIG1lYW5zIFwibm8gZXJyb3JcbiAgLy8gb2NjdXJyZWRcIiwgd2UgZXJyb3Itd3JhcCBzbyB0aGUgY2FsbGJhY2sgY29uc3VtZXIgY2FuIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAgLy8gXCJ0aGUgcHJvbWlzZSByZWplY3RlZCB3aXRoIG51bGxcIiBvciBcInRoZSBwcm9taXNlIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZFwiLlxuICBpZiAoIXJlYXNvbikge1xuICAgIHZhciBuZXdSZWFzb24gPSBuZXcgRXJyb3IoJ1Byb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBmYWxzeSB2YWx1ZScpO1xuICAgIG5ld1JlYXNvbi5yZWFzb24gPSByZWFzb247XG4gICAgcmVhc29uID0gbmV3UmVhc29uO1xuICB9XG4gIHJldHVybiBjYihyZWFzb24pO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIC8vIFdlIERPIE5PVCByZXR1cm4gdGhlIHByb21pc2UgYXMgaXQgZ2l2ZXMgdGhlIHVzZXIgYSBmYWxzZSBzZW5zZSB0aGF0XG4gIC8vIHRoZSBwcm9taXNlIGlzIGFjdHVhbGx5IHNvbWVob3cgcmVsYXRlZCB0byB0aGUgY2FsbGJhY2sncyBleGVjdXRpb25cbiAgLy8gYW5kIHRoYXQgdGhlIGNhbGxiYWNrIHRocm93aW5nIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlLlxuICBmdW5jdGlvbiBjYWxsYmFja2lmaWVkKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIHZhciBtYXliZUNiID0gYXJncy5wb3AoKTtcbiAgICBpZiAodHlwZW9mIG1heWJlQ2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsYXN0IGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbWF5YmVDYi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgLy8gSW4gdHJ1ZSBub2RlIHN0eWxlIHdlIHByb2Nlc3MgdGhlIGNhbGxiYWNrIG9uIGBuZXh0VGlja2Agd2l0aCBhbGwgdGhlXG4gICAgLy8gaW1wbGljYXRpb25zIChzdGFjaywgYHVuY2F1Z2h0RXhjZXB0aW9uYCwgYGFzeW5jX2hvb2tzYClcbiAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmV0KSB7IHByb2Nlc3MubmV4dFRpY2soY2IsIG51bGwsIHJldCkgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlaikgeyBwcm9jZXNzLm5leHRUaWNrKGNhbGxiYWNraWZ5T25SZWplY3RlZCwgcmVqLCBjYikgfSk7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2FsbGJhY2tpZmllZCwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhbGxiYWNraWZpZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpKTtcbiAgcmV0dXJuIGNhbGxiYWNraWZpZWQ7XG59XG5leHBvcnRzLmNhbGxiYWNraWZ5ID0gY2FsbGJhY2tpZnk7XG4iLCJpbXBvcnQge0NhdXNhbFRpbWVzdGFtcCwgQ3JkdFJ1bnRpbWV9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5pbXBvcnQge0NyZHRJbnRlcm5hbCwgQ3JkdH0gZnJvbSBcIi4vY3JkdF9jb3JlXCI7XG5cbi8qKlxuICogT3BlcmF0aW9ucywgbWVzc2FnZXMsIGFuZCBkZXNjcmlwdGlvbnMgYXJlIGFsbCBqdXN0IHRoZVxuICogbnVtYmVyIHRvIGFkZC9hZGRlZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMCBhZGRzP1xuICovXG5leHBvcnQgY2xhc3MgQ291bnRlckludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDA7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IG51bWJlciwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSArIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgQ291bnRlckludGVybmFsKCk7XG59XG5cbi8qKlxuICogQSBzaW1wbGUgY291bnRlciBDUkRULlxuICpcbiAqIEluIG9uY2hhbmdlLCBldmVudC5kZXNjcmlwdGlvbiBpcyB0aGUgbnVtYmVyIHRoYXQgd2FzIGFkZGVkLlxuICpcbiAqIFdhcm5pbmc6IGFkZGl0aW9uIGlzIG5vdCBhY3R1YWxseSBjb21tdXRhdGl2ZSBpZiB0aGVyZSBpcyBhblxuICogb3ZlcmZsb3cgb3IgaWYgeW91IHVzZSBmbG9hdGluZyBwb2ludCBudW1iZXJzLiAgVE9ETzogaXMgdGhlcmUgYVxuICogYmV0dGVyIHR5cGUgd2UgY2FuIHVzZT9cbiAqL1xuZXhwb3J0IGNsYXNzIENvdW50ZXJDcmR0IGV4dGVuZHMgQ3JkdDxudW1iZXI+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoaWQsIENvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgYWRkLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiBjb3VudGVyLnZhbHVlICs9IG4gYW5kIGNvdW50ZXIudmFsdWUgLT0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIGFkZGl0aW9ucykuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hZGQobmV3VmFsdWUgLSB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5cbi8qKlxuICogT3BlcmF0aW9ucywgbWVzc2FnZXMsIGFuZCBkZXNjcmlwdGlvbnMgYXJlIGFsbCBqdXN0IHRoZVxuICogbnVtYmVyIHRvIG11bHRpcGx5L211bHRpcGxpZWQuXG4gKiBUT0RPOiBvcHRpbWl6ZSBhd2F5IDEgbXVsdHM/XG4gKi9cbmV4cG9ydCBjbGFzcyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxudW1iZXI+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlIHJldHVybiAxO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogbnVtYmVyLCBfc3RhdGU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKiBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IE11bHRSZWdpc3RlckludGVybmFsKCk7XG59XG5cbi8qKlxuICogQSBzaW1wbGUgbnVtZXJpY2FsIHJlZ2lzdGVyIENSRFQgd2l0aCBtdWx0aXBsaWNhdGlvbiBvcGVyYXRpb25zLlxuICpcbiAqIEluIG9uY2hhbmdlLCBldmVudC5kZXNjcmlwdGlvbiBpcyB0aGUgbnVtYmVyIHRoYXQgd2FzIG11bHRpcGxpZWQuXG4gKlxuICogV2FybmluZzogbXVsdGlwbGljYXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5leHBvcnQgY2xhc3MgTXVsdFJlZ2lzdGVyQ3JkdCBleHRlbmRzIENyZHQ8bnVtYmVyPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKGlkLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBtdWx0KG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdGlwbGljYXRpb24uICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIHJlZ2lzdGVyLnZhbHVlICo9IG4gYW5kIHJlZ2lzdGVyLnZhbHVlIC89IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBtdWx0aXBsaWNhdGlvbnMpLlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgY3VycmVudCB2YWx1ZSBpcyAwLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbXBvc3NpYmxlIHRvIHNldCB0byBub256ZXJvIHZhbHVlIHdoZW4gY3VycmVudCB2YWx1ZSBpcyB6ZXJvXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSByZXR1cm47IC8vIDAgLT4gMCBpcyBuby1vcFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubXVsdChuZXdWYWx1ZSAvIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGNsYXNzIENvdW50ZXJNb2RJbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxudW1iZXI+IHtcbi8vICAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBtb2R1bHVzOiBudW1iZXIpIHtcbi8vICAgICAgICAgaWYgKG1vZHVsdXMgPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJtb2R1bHVzIGlzIG5lZ2F0aXZlOiBcIiArIG1vZHVsdXMpO1xuLy8gICAgIH1cbi8vICAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGluaXRpYWxEYXRhO1xuLy8gICAgICAgICBlbHNlIHJldHVybiAwO1xuLy8gICAgIH1cbi8vICAgICBwcmVwYXJlKG9wZXJhdGlvbjogbnVtYmVyLCBfc3RhdGU6IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLm1vZChvcGVyYXRpb24pO1xuLy8gICAgIH1cbi8vICAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogbnVtYmVyLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtudW1iZXIsIG51bWJlcl0ge1xuLy8gICAgICAgICByZXR1cm4gW3RoaXMubW9kKHN0YXRlICsgbWVzc2FnZSksIG1lc3NhZ2VdO1xuLy8gICAgIH1cbi8vICAgICBtb2QoeDogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgaWYgKHggPj0gMCkgcmV0dXJuIHggJSB0aGlzLm1vZHVsdXM7XG4vLyAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMubW9kdWx1cyAtICgoLXgpICUgdGhpcy5tb2R1bHVzKTtcbi8vICAgICB9XG4vLyB9XG5cbi8qKlxuICogT3BlcmF0aW9ucyBhbmQgbWVzc2FnZXMgYXJlIHRoZSBlbGVtZW50IHRvIGFkZC4gIFRPRE86XG4gKiB0aGlzIG1lYW5zIHRoYXQgYWRkaW5nIG51bGwgd29uJ3Qgd29yayBhcyBHU2V0Q3JkdCB3aWxsIHRyZWF0XG4gKiBpdHMgbWVzc2FnZSBhcyBhIG5vLW9wLiAgRGVzY3JpcHRpb24gaXMgdGhlIGVsZW1lbnQgYWRkZWRcbiAqIChpZiBpdCdzIHJlZHVuZGFudCwgZGVzY3JpcHRpb24gaXMgbnVsbCwgc28gb25jaGFuZ2Ugd29uJ3RcbiAqIHNlZSBhbnl0aGluZykuXG4gKi9cbmNsYXNzIEdTZXRJbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTZXQ8YW55Pj4ge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IFNldDxhbnk+KTogU2V0PGFueT4ge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEpIHJldHVybiBuZXcgU2V0PGFueT4oaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU2V0PGFueT4oKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IGFueSwgc3RhdGU6IFNldDxhbnk+KSB7XG4gICAgICAgIGlmIChzdGF0ZS5oYXMob3BlcmF0aW9uKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2U6IGFueSwgc3RhdGU6IFNldDxhbnk+LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbU2V0PGFueT4sIGFueV0ge1xuICAgICAgICBpZiAoc3RhdGUuaGFzKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAvLyBkb2VzIG5vdGhpbmdcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUuYWRkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IEdTZXRJbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIEEgZ3Jvdy1vbmx5IHNldC5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIGFycmF5IG9mIGVsZW1lbnRzIGFkZGVkXG4gKiAoW10gb3IgW2FkZGVkIGVsZW1lbnRdKS5cbiAqXG4gKiBUT0RPOiBhZGRpbmcgYSBudWxsIHZhbHVlIHdpbGwgYmUgaWdub3JlZC5cbiAqIFRPRE86IGFkZCBhIHR5cGUgYW5ub3RhdGlvblxuICogVE9ETzogc2FtZSBpbnRlcmZhY2UgYXMgSlMgU2V0XG4gKi9cbmV4cG9ydCBjbGFzcyBHU2V0Q3JkdCBleHRlbmRzIENyZHQ8U2V0PGFueT4+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBTZXQ8YW55Pikge1xuICAgICAgICBzdXBlcihpZCwgR1NldEludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGFkZChlbGVtZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKGVsZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHNldC4gIFRoaXMgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIDogU2V0PGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzLnN0YXRlKTtcbiAgICB9XG59XG5cbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsPFQ+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFNldDxbVCwgYW55LCBudW1iZXJdPj4ge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgQW4gaW5pdGlhbCB2YWx1ZSB0byBzZXQuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogVCk6IFNldDxbVCwgYW55LCBudW1iZXJdPiB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IFNldChbW2luaXRpYWxEYXRhLCBudWxsLCAtMV1dKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wic2V0XCIsIHZhbHVlXTogc2V0IHRvIHRoZSBnaXZlbiBzaW5nbGUgdmFsdWUuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXQsIHNldHRpbmcgdGhlIHZhbHVlIHNldCB0byBbXS5cbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBfc3RhdGUgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogW3N0cmluZywgYW55P10sIF9zdGF0ZTogU2V0PFtULCBhbnksIG51bWJlcl0+LCBfcmVwbGljYUlkOiBhbnkpIHtcbiAgICAgICAgaWYgKCEoKG9wZXJhdGlvblswXSA9PT0gXCJzZXRcIiAmJiBvcGVyYXRpb25bMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB8fCBvcGVyYXRpb25bMF0gPT09IFwicmVzZXRcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXM6XG4gICAgICogLSBmb3Igc2V0IG1lc3NhZ2UsIFtcInNldFwiLCBzZXQgdmFsdWVdIChldmVuIGlmIGl0XG4gICAgICogZG9lc24ndCBlbGltaW5hdGUgYWxsIGNhdXNhbGx5IHByaW9yIHZhbHVlcykuXG4gICAgICogLSBmb3IgcmVzZXRzLCBbXCJyZXNldFwiXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogW3N0cmluZywgYW55P10sIHN0YXRlOiBTZXQ8W1QsIGFueSwgbnVtYmVyXT4sIF9yZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbU2V0PFtULCBhbnksIG51bWJlcl0+LCBhbnldIHtcbiAgICAgICAgaWYgKCEoKG1lc3NhZ2VbMF0gPT09IFwic2V0XCIgJiYgbWVzc2FnZVsxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHx8IG1lc3NhZ2VbMF0gPT09IFwicmVzZXRcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlWzFdID09PSBudWxsKSBzdGF0ZS5kZWxldGUodmFsdWUpOy8vaW5pdGlhbCBlbGVtZW50XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdmNFbnRyeSA9IHZjLmdldCh2YWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHZjRW50cnkgIT09IHVuZGVmaW5lZCAmJiB2Y0VudHJ5ID49IHZhbHVlWzJdKSBzdGF0ZS5kZWxldGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlWzBdID09PSBcInNldFwiKSB7XG4gICAgICAgICAgICBzdGF0ZS5hZGQoW21lc3NhZ2VbMV0sIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwoKTtcbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpVmFsdWVSZWdpc3RlcjxUPiBleHRlbmRzIENyZHQ8U2V0PFtULCBhbnksIG51bWJlcl0+PiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogVCkge1xuICAgICAgICBzdXBlcihpZCxcbiAgICAgICAgICAgIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsLmluc3RhbmNlIGFzIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsPFQ+LFxuICAgICAgICAgICAgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInNldFwiLCB2YWx1ZV0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWVTZXQoKTogU2V0PFQ+IHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IG5ldyBTZXQ8VD4oKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5zdGF0ZSkgdmFsdWVzLmFkZCh2YWx1ZVswXSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoW1wicmVzZXRcIl0pO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbXCJyZXNldFwiXTtcbiAgICB9XG4gICAgLy8gVE9ETzogcmVzZXQgc3Ryb25nXG59XG4iLCJpbXBvcnQge0NhdXNhbFRpbWVzdGFtcCwgQ3JkdFJ1bnRpbWUsIENyZHRNZXNzYWdlTGlzdGVuZXJ9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5cbi8vIFRPRE86IGlkcyBhcyBzdHJpbmdzIGluc3RlYWQgb2YgYW55XG5cbi8qKlxuICogSW50ZXJmYWNlIGRlc2NyaWJpbmcgdGhlIGludGVybmFsIHdvcmtpbmdzIG9mIGEgQ1JEVCBpbiB0aGVcbiAqIHByZXBhcmUvZWZmZWN0IHN0eWxlIG9mIFwiUHVyZSBPcGVyYXRpb24tQmFzZWQgUmVwbGljYXRlZCBEYXRhIFR5cGVzXCJcbiAqIGJ5IEJhcXVlcm8gZXQgYWwuICBUaGlzIGludGVyZmFjZSBpcyBhbHNvIGluc3BpcmVkIGJ5IFNoYXJlREIncyBPVFxuICogdHlwZXMgKGh0dHBzOi8vZ2l0aHViLmNvbS9vdHR5cGVzL2RvY3MpLlxuICogQHBhcmFtIFMgVGhlIENSRFQncyBzdGF0ZSB0eXBlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3JkdEludGVybmFsPFM+IHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGluaXRpYWwgc3RhdGUsIHBvc3NpYmx5IGJhc2luZyBpdHMgdmFsdWVcbiAgICAgKiBvZmYgb2YgaW5pdGlhbERhdGEuICBOb3RlIHRoYXQgaWYgc3RhdGVzIGNhbiBiZSBtdXRhdGVkXG4gICAgICogYnkgZWZmZWN0LCB0aGVuIGVhY2ggcmV0dXJuZWQgc3RhdGUgc2hvdWxkIGJlIGEgZnJlc2hcbiAgICAgKiBvYmplY3QuXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBBIHZhbHVlIHVzZWQgdG8gb3B0aW9uYWxseSBzZXQgdGhlIHN0YXRlJ3NcbiAgICAgKiBpbml0aWFsIHZhbHVlLlxuICAgICAqIEByZXR1cm4gIEEgZnJlc2ggaW5pdGlhbCBzdGF0ZS5cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBtZXNzYWdlIGRlc2NyaWJpbmcgdGhlIGdpdmVuIG9wZXJhdGlvbiwgcG9zc2libHlcbiAgICAgKiByZWFkaW5nIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBpc3N1aW5nIHJlcGxpY2EgaWQuXG4gICAgICogTWVzc2FnZXMgYW5kIG9wZXJhdGlvbnMgd2lsbCBoYXZlIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljXG4gICAgICogZm9ybS5cbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBBbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBkZXNjcmlwdGlvbiBvZlxuICAgICAqIHRoZSBvcGVyYXRpb24uXG4gICAgICogQHBhcmFtICBzdGF0ZSBUaGUgY3VycmVudCBzdGF0ZSwgd2hpY2ggbWF5IGJlIHJlYWQgdG8gZGV0ZXJtaW5lXG4gICAgICogdGhlIG1lc3NhZ2UuICBUaGlzIHNob3VsZCBub3QgYmUgbXV0YXRlZC5cbiAgICAgKiBAcGFyYW0gcmVwbGljYUlkIFRoZSBpZCBvZiB0aGUgcmVwbGljYSBpc3N1aW5nIHRoaXMgb3BlcmF0aW9uLFxuICAgICAqIHdoaWNoIG1heSBiZSByZWFkIHRvIGRldGVybWluZSB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcmV0dXJuIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NyaXB0aW9uIG9mIHRoZSByZXN1bHRpbmdcbiAgICAgKiBtZXNzYWdlLiAgTm90ZSB0aGlzIHdpbGwgYmUgc2VudCBvbiB0aGUgd2lyZSB1c2luZyBUT0RPXG4gICAgICogKHNlcmlhbGl6YXRpb24pLlxuICAgICAqIFRoZSBtZXNzYWdlIG1zdXQgYmUgbnVsbCBvbmx5IGlmIHRoaXMgb3BlcmF0aW9uIGRvZXMgbm90XG4gICAgICogY2hhbmdlIHRoZSBpbnRlcm5hbCBzdGF0ZSwgc2luY2UgaWYgdGhlIG1lc3NhZ2UgaXMgbnVsbCxcbiAgICAgKiBDcmR0IHdpbGwgc2tpcCBzZW5kaW5nIHRoZSBtZXNzYWdlIHRvIG90aGVyIHJlcGxpY2FzLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBhbnksIHN0YXRlOiBTLCByZXBsaWNhSWQ6IGFueSk6IGFueTtcbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIHRoZSBzdGF0ZSwgcmV0dXJuaW5nIHRoZVxuICAgICAqIHJlc3VsdGluZyBzdGF0ZSBhcyB3ZWxsIGFzIGEgZGVzY3JpcHRpb24gb2YgdGhlIHJlc3VsdGluZ1xuICAgICAqIGNoYW5nZS4gIE1lc3NhZ2VzIGFyZSBhc3N1bWVkIHRvIGJlIGRlbGl2ZXJlZCBpbiBjYXVzYWxcbiAgICAgKiBvcmRlci4gIEZvciBlZmZpY2llbmN5LCB0aGUgaW5wdXQgc3RhdGUgd2lsbFxuICAgICAqIG5vdCBiZSByZXVzZWQsIHNvIGFuIGltcGxlbWVudGF0aW9uIGlzIGZyZWUgdG8gbXV0YXRlXG4gICAgICogaXQgaW4tcGxhY2UgYW5kIHJldHVybiBpdC5cbiAgICAgKiBAcGFyYW0gIG1lc3NhZ2UgICBUaGUgbWVzc2FnZSB0byBiZSBhcHBsaWVkLCBjb21pbmcgZnJvbVxuICAgICAqIHNvbWUgcmVwbGljYSdzIHByZXBhcmUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtICBzdGF0ZSAgICAgVGhlIGlucHV0IHN0YXRlLlxuICAgICAqIEBwYXJhbSByZXBsaWNhSWQgVGhlIGlkIG9mIHRoZSByZXBsaWNhIGFwcGx5aW5nIHRoaXMgb3BlcmF0aW9uXG4gICAgICogKG5vdCB0aGUgaWQgb2YgdGhlIHJlcGxpY2EgdGhhdCBpc3N1ZWQgdGhpcyBtZXNzYWdlKS5cbiAgICAgKiBAcGFyYW0gIHRpbWVzdGFtcCBUaGUgbWVzc2FnZSdzIGNhdXNhbCB0aW1lc3RhbXAuICBOb3RlIHRoYXRcbiAgICAgKiBiZWNhdXNlIHNldmVyYWwgQ1JEVHMgY2FuIHNoYXJlIHRoZSBzYW1lIHJ1bnRpbWUsIHRpbWVzdGFtcHNcbiAgICAgKiBtYXkgbm90IGJlIGNvbnRpbmd1b3VzIChlLmcuLCBlbnRyaWVzIGluIHRoZWlyIHZlY3RvciBjbG9ja3NcbiAgICAgKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICAgICAqIHN0aWxsIGd1YXJhbnRlZWQuICBJZiB3ZSBhcmUgcHJvY2Vzc2luZyBvdXIgb3duIG1lc3NhZ2VcbiAgICAgKiAoaS5lLiwgcmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpLCB0aGVuIGl0IGlzXG4gICAgICogZ3VhcmFudGVlZCB0aGF0IHRoZSBtZXNzYWdlIGlzIGNhdXNhbGx5IGdyZWF0ZXIgdGhhbiBhbGwgcHJpb3JcbiAgICAgKiBtZXNzYWdlcy4gIEl0IGlzIHBvc3NpYmxlIHRoYXQgbXVsdGlwbGUgbWVzc2FnZXMgc2hhcmUgdGhlIHNhbWVcbiAgICAgKiB0aW1lc3RhbXA7IGlmIHNvLCB0aGV5IGFyZSB0b3RhbGx5IG9yZGVyZWQgYnkgdGhlIGNhdXNhbCBvcmRlcixcbiAgICAgKiB0aGV5IHdpbGwgYWxsIGJlIGRlbGl2ZXJlZCBpbiBhIHJvdyBpbiBjYXVzYWwgb3JkZXIsIGFuZCB0aGVcbiAgICAgKiB0aW1lc3RhbXAgYWNjdXJhdGVseSByZWZsZWN0cyB0aGVpciBjYXVzYWwgcmVsYXRpb25zaGlwIHRvXG4gICAgICogb3RoZXIgbWVzc2FnZXMgKGluIHBhcnRpY3VsYXIsIHRoZXkgYWxsIHNoYXJlIHRoZSBzYW1lIGNhdXNhbFxuICAgICAqIHJlbGF0aW9uc2hpcHMgd2l0aCBvdGhlciBtZXNzYWdlcykuXG4gICAgICogQHJldHVybiAgICAgICAgICAgW1RoZSBvdXRwdXQgc3RhdGUsIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljXG4gICAgICogZGVzY3JpcHRpb24gb2YgdGhlIGNoYW5nZS5dICBUaGUgZGVzY3JpcHRpb24gd2lsbCBiZSBwYXNzZWRcbiAgICAgKiB0byB0aGUgYXBwbGljYXRpb24gdXNpbmcgdGhpcyBDUkRUIHNvIHRoZXkga25vdyB3aGF0IG9jY3VycmVkLlxuICAgICAqIElkZWFsbHksIGl0IHNob3VsZCBiZSBkZXNjcmliZWQgaW4gdGVybXMgb2Ygb3JkaW5hcnkgZGF0YVxuICAgICAqIHR5cGUgb3BlcmF0aW9ucywgc28gdGhhdCBhcHBsaWNhdGlvbnMgY2FuIHVuZGVyc3RhbmQgdGhlIGNoYW5nZVxuICAgICAqIHdpdGhvdXQgbmVlZGluZyB0byB1bmRlcnN0YW5kIHRoZSBDUkRUJ3Mgc2VtYW50aWNzLlxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiBtdXN0IGJlIG51bGwgb25seSBpZiB0aGUgZXh0ZXJuYWxseSB2aXNpYmxlXG4gICAgICogc3RhdGUgaXMgdW5jaGFuZ2VkLFxuICAgICAqIHNpbmNlIENyZHQgd2lsbCBza2lwIGNhbGxpbmcgb25jaGFuZ2UgaWYgZGVzY3JpcHRpb24gaXMgbnVsbC5cbiAgICAgKiAoVGhlIGNvbnZlcnNlLS0taWYgdGhlIHN0YXRlIHdhcyB1bmNoYW5nZWQsIHRoZW4gZGVzY3JpcHRpb25cbiAgICAgKiBpcyBudWxsLS0tbmVlZCBub3QgaG9sZCwgYWx0aG91Z2ggaXQgaXMgbmljZSBpZiBpdCBkb2VzLilcbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogYW55LCBzdGF0ZTogUywgcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIGFueV07XG59XG5cbi8qKlxuICogQW4gZXZlbnQgaXNzdWVkIHdoZW4gYSBDUkRUIGlzIGNoYW5nZWQgYnkgYW5vdGhlciByZXBsaWNhLlxuICogQHBhcmFtIGNhbGxlciAgICAgIFRoZSBDcmR0IGluc3RhbmNlIHRoYXQgd2FzIGNoYW5nZWQuXG4gKiBAcGFyYW0gZGVzY3JpcHRpb24gQW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZGVzY3JwdGlvbiBvZiB0aGUgY2hhbmdlLlxuICogQHBhcmFtIHRpbWVzdGFtcCAgIFRoZSBjYXVzYWwgdGltZXN0YW1wIG9mIHRoZSBjaGFuZ2UuIE5vdGUgdGhhdFxuICogYmVjYXVzZSBzZXZlcmFsIENSRFRzIGNhbiBzaGFyZSB0aGUgc2FtZSBydW50aW1lLCB0aW1lc3RhbXBzXG4gKiBtYXkgbm90IGJlIGNvbnRpbmd1b3VzIChlLmcuLCBlbnRyaWVzIGluIHRoZWlyIHZlY3RvciBjbG9ja3NcbiAqIG1pZ2h0IHNraXAgbnVtYmVycykuICBIb3dldmVyLCBjYXVzYWxseSBvcmRlcmVkIGRlbGl2ZXJ5IGlzXG4gKiBzdGlsbCBndWFyYW50ZWVkLlxuICovXG5leHBvcnQgY2xhc3MgQ3JkdENoYW5nZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY2FsbGVyOiBDcmR0PGFueT4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbjogYW55LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApIHsgfVxufVxuXG4vLyBVc2VyLWZhY2luZyB3cmFwcGVycyBhcm91bmQgQ1JEVHMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzLFxuLy8gYWRkaW5nIG1ldGhvZHMgZm9yIHRoZSBDUkRUJ3Mgb3BlcmF0aW9ucyAoZS5nLiwgaW5jcmVtZW50KCkpXG4vLyB3aGljaCBjYWxsIHRoaXMgY2xhc3MncyBhcHBseSBtZXRob2QuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFwcGxpY2F0aW9uLWZhY2luZyBDUkRUIGltcGxlbWVudGF0aW9ucy5cbiAqIEluc3RlYWQgb2YgZXhwb3NpbmcgQ3JkdEludGVybmFsIGltcGxlbWVudGF0aW9ucyBkaXJlY3RseSxcbiAqIHdoaWNoIGhhdmUgYW4gdW5mcmllbmRseSBwcmVwYXJlL2VmZmVjdCBpbnRlcmZhY2UsXG4gKiBlYWNoIENSRFQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGRlZmluZSBhIHN1YmNsYXNzIG9mIHRoaXNcbiAqIGNsYXNzIHdpdGggb3JkaW5hcnktbG9va2luZyBtZXRob2RzIHRvIHBlcmZvcm0gb3BlcmF0aW9uc1xuICogYW5kIHF1ZXJ5IHRoZSBzdGF0ZS4gIE1ldGhvZHMgcGVyZm9ybWluZyBvcGVyYXRpb25zIHNob3VsZFxuICogY2FsbCBhcHBseU9wIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgQ3JkdEludGVybmFsIG9wZXJhdGlvbi5cbiAqIFRoaXMgY2xhc3MgdGhlbiBhdXRvbWF0aWNhbGx5IGhhbmRsZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nXG4gKiBvZiBtZXNzYWdlcy5cbiAqIENmLiBBbGdvcml0aG0gMSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHBhcGVyLlxuICogQHBhcmFtIFMgVGhlIHN0YXRlIHR5cGUgb2YgQy5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHQ8Uz4gaW1wbGVtZW50cyBDcmR0TWVzc2FnZUxpc3RlbmVyIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBDcmR0SW50ZXJuYWwgc3RhdGUuICBUaGlzIHNob3VsZCBub3RcbiAgICAgKiBiZSBtdXRhdGVkIGRpcmVjdGx5IGJ1dCBtYXkgYmUgcmVhZCB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXRcbiAgICAgKiB0aGUgc3RhdGUuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHN0YXRlOiBTO1xuICAgIC8qKlxuICAgICAqIFNldCB0aGlzIHRvIGxpc3RlbiBmb3Igd2hlbiBhbm90aGVyIHJlcGxpY2EgdXBkYXRlc1xuICAgICAqIHRoaXMgb2JqZWN0J3Mgc3RhdGUuXG4gICAgICovXG4gICAgb25jaGFuZ2UgOiAoZXZlbnQ6IENyZHRDaGFuZ2VFdmVudCkgPT4gdm9pZCA9ICgoXykgPT4ge30pO1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICBBbiBpZCBmb3IgdGhpcyBDUkRULiAgQWxsIENSRFRzIHVzaW5nIHRoZVxuICAgICAqIHNhbWUgQ3JkdFJ1bnRpbWUgbXVzdCBoYXZlIGRpc3RpbmN0IGlkcywgYW5kIHRoZSBpZHMgbXVzdFxuICAgICAqIGJlIHRoZSBzYW1lIGZvciBhbGwgcmVwbGljYXMgb2YgYSBnaXZlbiBDUkRULCBpbiBvcmRlclxuICAgICAqIGZvciB0aGUgQ3JkdFJ1bnRpbWUgdG8gcm91dGUgbWVzc2FnZXMgdG8gdGhlbSBwcm9wZXJseS5cbiAgICAgKiBAcGFyYW0gY3JkdEludGVybmFsICAgIFRoZSBDcmR0SW50ZXJuYWwgdG8gdXNlLiAgTm90ZSB0aGF0IHNpbmNlXG4gICAgICogQ3JkdEludGVybmFsJ3MgZG9uJ3Qgc3RvcmUgc3RhdGVzLCBtdWx0aXBsZSBvYmplY3RzIG1heVxuICAgICAqIHNoYXJlIHRoZSBzYW1lIENyZHRJbnRlcm5hbCBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0gcnVudGltZSBUaGUgQ3JkdFJ1bnRpbWUgdG8gdXNlIGZvciBzZW5kaW5nIGFuZFxuICAgICAqIHJlY2VpdmluZyBtZXNzYWdlcy5cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgIE9wdGlvbmFsIGluaXRpYWwgZGF0YSB0byB1c2Ugd2hlblxuICAgICAqIHNldHRpbmcgdGhlIENyZHRJbnRlcm5hbCdzIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGlkOiBhbnksIHB1YmxpYyByZWFkb25seSBjcmR0SW50ZXJuYWw6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuY3JkdEludGVybmFsLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMucnVudGltZS5yZWdpc3Rlcih0aGlzLCB0aGlzLmlkKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBkZXNjcmliZSBcInRyYW5zYWN0aW9uc1wiLiAgUmlnaHQgd29yZD8gIFJlbmFtZVxuICAgIC8vIFwiYXRvbWljXCIgc3R1ZmYgYmVsb3cuICBNdXN0IGhhcHBlbiBzeW5jaHJvbm91c2x5IHNvXG4gICAgLy8gdGhhdCBydW50aW1lLmdldFRpbWVzdGFtcCgpIGRvZXNuJ3QgY2hhbmdlIGFuZFxuICAgIC8vIG5vIG1lc3NhZ2VzIGFyZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cbiAgICAvLyBBbGxvdyBjYWxsZXIgdG8gc3RhcnQvZW5kIHRyYW5zYWN0aW9ucz9cbiAgICBwcml2YXRlIGluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uTWVzc2FnZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcml2YXRlIHRyYW5zYWN0aW9uRGVzY3JpcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJvdGVjdGVkIHN0YXJ0VHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgdHJhbnNhY3Rpb24gaXMgYWxyZWFkeSBpbiBwcm9ncmVzcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbnMgKHRyYW5zbGF0ZWQpXG4gICAgcHJvdGVjdGVkIGVuZFRyYW5zYWN0aW9uKCk6IGFueSB7XG4gICAgICAgIGlmICghdGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0cmFuc2FjdGlvbiBpcyBpbiBwcm9ncmVzcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucnVudGltZS5zZW5kKHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcywgdGhpcy5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnM7XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbHkgdGhlIGdpdmVuIG9wZXJhdGlvbiB0byB0aGUgc3RhdGUsIHVzaW5nIHByZXBhcmUgYW5kIGVmZmVjdCxcbiAgICAgKiBhbmQgc2VuZHMgdGhlIGdlbmVyYXRlZCBtZXNzYWdlIG92ZXIgdGhlIG5ldHdvcmsuXG4gICAgICogSWYgYSB0cmFuc2FjdGlvbiBpcyBpbiBwcm9ncmVzcywgdGhpcyBzZW5kaW5nIGlzIGRlbGF5ZWRcbiAgICAgKiB1bnRpbFxuICAgICAqIEBwYXJhbSAgb3BlcmF0aW9uIFRoZSBvcGVyYXRpb24gdG8gYXBwbHkuXG4gICAgICogQHJldHVybiAgICAgICAgICAgVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjaGFuZ2VzLlxuICAgICAqIFRoaXMgaXMgdGhlIGxpc3Qgb2YgaW5kaXZpZHVhbCBtZXNzYWdlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIGVmZmVjdCAoc2tpcHBpbmcgbnVsbCBtZXNzYWdlcyksXG4gICAgICogYWZ0ZXIgYmVpbmcgcGFzc2VkIHRocm91Z2ggdHJhbnNsYXRlRGVzY3JpcHRpb24uICBBbiBleGNlcHRpb25cbiAgICAgKiBpcyB0aGF0IGlmIGFsbCBtZXNzYWdlcyBhcmVcbiAgICAgKiBudWxsLCBudWxsIGlzIHJldHVybmVkIHdpdGhvdXQgY2FsbGluZyB0cmFuc2xhdGVEZXNjcmlwdGlvbi5cbiAgICAgKiBUT0RPOiBudWxsIGlmIGluIGEgdHJhbnNhY3Rpb24gKHVzZSBlbmRUcmFuc2FjdGlvbiBpbnN0ZWFkKS5cbiAgICAgKiBUT0RPOiBidXQgd2hhdCBpZiB3ZSB3YW50IGl0IHRvIGRlY2lkZSB3aGF0IHRvIGRvIG5leHQ/XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFwcGx5T3Aob3BlcmF0aW9uOiBhbnkpIDogYW55IHtcbiAgICAgICAgbGV0IG93blRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICBvd25UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCk7XG4gICAgICAgIGxldCBtZXNzYWdlID0gdGhpcy5jcmR0SW50ZXJuYWwucHJlcGFyZShvcGVyYXRpb24sIHRoaXMuc3RhdGUsXG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCkpO1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG93blRyYW5zYWN0aW9uKSByZXR1cm4gdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gdHJhbnNsYXRlIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogQ3JkdEludGVybmFsIGJlZm9yZSBwYXNzaW5nIGl0IHRvIG9uY2hhbmdlLiAgVGhpcyBpc1xuICAgICAqIHVzZWZ1bCBmb3Igc2VtaWRpcmVjdCBwcm9kdWN0cyBiZWNhdXNlIHRoZSBkZWZhdWx0XG4gICAgICogU2VtaWRpcmVjdEludGVybmFsIGRlc2NyaXB0aW9ucyBhcmUgbm90IHVzZXItZnJpZW5kbHkuXG4gICAgICogSWYgdGhpcyBtZXRob2QgcmV0dXJucyBudWxsLCBvbmNoYW5nZSBpcyBub3QgY2FsbGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50aW9uIHJldHVybnMgZGVzY3JpcHRpb25zWzBdLiAgSXQgaXNcbiAgICAgKiBhcHByb3ByaWF0ZSB3aGVuIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdCBhbHJlYWR5IHJldHVybnNcbiAgICAgKiB1c2VyLWZyaWVuZGx5IGRlc2NyaXB0aW9ucyBhbmQgYXBwbHlPcHMgaXMgb25seSBldmVyIGNhbGxlZFxuICAgICAqIHdpdGggc2luZ2xlIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGRlc2NyaXB0aW9ucyBBIGxpc3Qgb2YgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdC4gIFRoaXMgd2lsbCBhbHdheXMgYmUgbm9uLWVtcHR5LlxuICAgICAqIEByZXR1cm4gVGhlIHRyYW5zbGF0ZWQgZGVzY3JpcHRpb24gdG8gcGFzcyB0byB0aGlzLm9uY2hhbmdlLFxuICAgICAqIG9yIG51bGwgaWYgdGhpcy5vbmNoYW5nZSBzaG91bGQgbm90IGJlIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9uczogQXJyYXk8YW55Pik6IGFueSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIG9ic2VydmVkIHJlc2V0c1xuICAgICAqIGZvciB3aGVuIGEgQ3JkdE9iamVjdCBjb250YWluaW5nIHRoaXMgQ3JkdCBpc1xuICAgICAqIHJlc2V0LiAgVGhlXG4gICAgICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHN1Y2ggbWFwIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgICAqIHRvIGNhdXNlIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgICogbXVzdCBzYXRpc2Z5OlxuICAgICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgICAqIC0gd2hlbiBhcHBsaWVkIHRvIGEgc3RhdGUgd2hpY2ggaGFzIG5vdCByZWNlaXZlZCBhbnlcbiAgICAgKiBtZXNzYWdlcyBjYXVzYWxseSBwcmlvciB0byB0aGUgdGltZXN0YW1wLCBpdCBoYXNcbiAgICAgKiBubyBlZmZlY3QuICBJbiBvdGhlciB3b3JkcywgYXBwbHlpbmcgaXQgdG8gYSBjb25jdXJyZW50bHlcbiAgICAgKiBpbml0aWFsaXplZCBzdGF0ZSBoYXMgbm8gZWZmZWN0LlxuICAgICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgbWVzc2FnZXMgaW5zdGVhZCwgZm9yIGdlbmVyYWxpdHk/XG4gICAgICovXG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub250cml2aWFsIG9ic2VydmVkLXJlc2V0cy5cbiAgICAgKiBVbmxpa2UgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCksIHRoZXJlIGFyZSBubyBzcGVjaWFsXG4gICAgICogcmVxdWlyZW1lbnRzIChvdGhlciB0aGFuIHRoZSB1c3VhbCBDcmR0IGNvbW11dGF0aXZpdHkpLlxuICAgICAqIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBvYnNlcnZlZC1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXQoKTogdm9pZCB7IH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub250cml2aWFsIHN0cm9uZy1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKi9cbiAgICByZXNldFN0cm9uZygpOiB2b2lkIHsgfVxuICAgIC8vIC8qKlxuICAgIC8vICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIHN0cm9uZyByZXNldHMuICBUaGVcbiAgICAvLyAgKiBkZWZhdWx0IHJldHVybnMgbnVsbCwgc28gcmVzZXRzIGRvIG5vdGhpbmcuXG4gICAgLy8gICogQHJldHVybiBBIG1lc3NhZ2UgKG5vdCBvcGVyYXRpb24pIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG9cbiAgICAvLyAgKiB0aGlzIENyZHQgdG9nZXRoZXIgd2l0aCBhbnkgdGltZXN0YW1wXG4gICAgLy8gICogdG8gY2F1c2UgYSBzdHJvbmctcmVzZXQgb3BlcmF0aW9uLCBvciBudWxsIHRvIGRvXG4gICAgLy8gICogbm90aGluZy4gIEZvciB0aGlzIENyZHRcbiAgICAvLyAgKiB0byBiZSBjb3JyZWN0IChldmVudHVhbGx5IGNvbnNpc3RlbnQpIHdoZW4gdXNlZCBhcyBhXG4gICAgLy8gICogcHJvcGVydHkgaW4gYW4gQ3JkdE9iamVjdCwgdGhlIHJldHVybmVkIG1lc3NhZ2VcbiAgICAvLyAgKiBtdXN0IHNhdGlzZnk6XG4gICAgLy8gICogLSB3aGVuIHBhaXJlZCB3aXRoIGFueSBDYXVzYWxUaW1lc3RhbXAsIGl0IGNvbW11dGVzIHdpdGhcbiAgICAvLyAgKiBjb25jdXJyZW50IG1lc3NhZ2VzICh1c3VhbCBDcmR0IHJlcXVpcmVtZW50KSwgaW5jbHVkaW5nXG4gICAgLy8gICogY29uY3VycmVudCByZXNldHMgYW5kIHN0cm9uZy1yZXNldHMuXG4gICAgLy8gICogT3RoZXJ3aXNlLCBpdCBpcyBmcmVlIHRvIGhhdmUgYW55IHNlbWFudGljcywgaW5jbHVkaW5nXG4gICAgLy8gICogZG9pbmcgbm90aGluZy4gIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgIC8vICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgIC8vICAqIHRoZSBzdHJvbmctcmVzZXQgc2VtYW50aWNzLlxuICAgIC8vICAqL1xuICAgIC8vIGdldFVuaXZlcnNhbFJlc2V0U3Ryb25nTWVzc2FnZSgpOiBhbnkge1xuICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3IgdGhpcy5ydW50aW1lIHdoZW4gYW4gYXRvbWljIGxpc3Qgb2ZcbiAgICAgKiBtZXNzYWdlcyBpcyByZWNlaXZlZCBmcm9tIGFub3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICByZWNlaXZlKG1lc3NhZ2VzOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7XG4gICAgICAgIGlmICh0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluIHRyYW5zYWN0aW9uOyB0aGUgdHJhbnNhY3Rpb24gbXVzdCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYmUgZW5kZWQgc3luY2hyb25vdXNseSBzbyB0aGF0IG1lc3NhZ2VzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJjYW5ub3QgYmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLCB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbmNoYW5nZSAmJiBkZXNjcmlwdGlvbnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucyk7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25jaGFuZ2UobmV3IENyZHRDaGFuZ2VFdmVudCh0aGlzLCB0cmFuc2xhdGVkLCB0aW1lc3RhbXApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENyZHRPYmplY3QsIE1hcENyZHQsIEVuYWJsZVdpbnNGbGFnLCBJbnRSZWdpc3RlckNyZHQsIEFkZFdpbnNTZXQgfSBmcm9tIFwiLi9zdGFuZGFyZFwiO1xuaW1wb3J0IHsgQ3JkdCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuaW1wb3J0IHsgTXVsdGlWYWx1ZVJlZ2lzdGVyIH0gZnJvbSBcIi4vYmFzaWNfY3JkdHNcIjtcbmltcG9ydCB7IENyZHRSdW50aW1lIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcblxuaW50ZXJmYWNlIEpzb25JbmRleFR5cGUge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEpzb25DcmR0IGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIENyZHQ8YW55Pj4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYm9vbGVhbnM6IE1hcENyZHQ8c3RyaW5nLCBFbmFibGVXaW5zRmxhZz47XG4gICAgLy8gVE9ETzogZHdGbGFncyB0b28/XG4gICAgcHJpdmF0ZSByZWFkb25seSBudW1iZXJzOiBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN0cmluZ3M6IE1hcENyZHQ8c3RyaW5nLCBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPj47XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXRzOiBNYXBDcmR0PHN0cmluZywgQWRkV2luc1NldDxhbnk+PjtcbiAgICAvLyBUT0RPOiBSV1NldHMgdG9vP1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb2JqZWN0czogTWFwQ3JkdDxzdHJpbmcsIEpzb25DcmR0PjtcbiAgICAvLyBUT0RPOiBhcnJheXMgKHNlcXVlbmNlcykuICBVc2VzIG1hcHMgZm9yIG5vdy5cbiAgICAvLyBUT0RPOiBudWxscz9cblxuICAgIC8vIFRPRE86IGFiaWxpdHkgdG8gcGFzcyBpbml0aWFsIHZhbHVlICh3aGljaCBpcyBub3Qgc3luY2VkKS5cbiAgICAvLyBNb3JlIGdlbmVyYWxseSwgYWJpbGl0eSB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24geW91clxuICAgIC8vIHByZWRlZmluZWQgcHJvcGVydGllcyB0aGF0IGFyZSBub3Qgc3luY2VkP1xuICAgIC8vIFVzZSB0aGUgZXhpc3RpbmcgZmxhZyBhbmQgYmxvY2sgbWVzc2FnZXMgaW4gQ3JkdE9iamVjdC5cbiAgICBjb25zdHJ1Y3RvcihjcmR0SWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoY3JkdElkLCBydW50aW1lKTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYm9vbGVhbnMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwiYm9vbGVhbnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEVuYWJsZVdpbnNGbGFnKGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm51bWJlcnMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwibnVtYmVyc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmluZ3MgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwic3RyaW5nc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0cyA9IG5ldyBNYXBDcmR0KFxuICAgICAgICAgICAgXCJzZXRzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBBZGRXaW5zU2V0KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwib2JqZWN0c1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgSnNvbkNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBDcmR0IHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgc3RvcmluZ1xuICAgICAqIHZhbHVlcyB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdHlwZUluZGljYXRvcixcbiAgICAgKiBvciB1bmRlZmluZWQgaWYgdGhlIGtleSBpcyBub3QgcHJlc2VudCAoaW5jbHVkaW5nXG4gICAgICogaWYgaXQgcHJldmlvdXNseSB3YXMgcHJlc2VudCBidXQgd2FzIHJlbW92ZWQpLlxuICAgICAqIChVc2UgaW5pdCBpbnN0ZWFkIGlmIHlvdSB3YW50IGEgZ3VhcmFudGVlZC1kZWZpbmVkXG4gICAgICogcmV0dXJuIHZhbHVlLilcbiAgICAgKiAoVE9ETzogZXhwbGFpbiBrZXlzIGFyZVxuICAgICAqIHNlZ3JlZ2F0ZWQgYnkgdmFsdWUgdHlwZSkuXG4gICAgICogRS5nLiBnZXQoXCJhXCIsIDApIHRvIGdldCB0aGUgbnVtYmVyIHZhbHVlIHdpdGgga2V5IDAuXG4gICAgICogU3RhbmRhcmQgdHlwZUluZGljYXRvciB2YWx1ZXM6XG4gICAgICogLSBmYWxzZTogYm9vbGVhbiAoRW5hYmxlV2luc0ZsYWcpXG4gICAgICogLSAwOiBudW1iZXIgKEludFJlZ2lzdGVyQ3JkdClcbiAgICAgKiAtIFwiXCI6IHN0cmluZyAoTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4pXG4gICAgICogLSBuZXcgU2V0KCk6IHNldCAoQWRkV2luc1NldClcbiAgICAgKiAtIHt9OiBvYmplY3QgKEpzb25DcmR0KVxuICAgICAqXG4gICAgICogVE9ETzogZXhwbGljdGx5IHR5cGVkIHZlcnNpb25zPyAgQ2FuIHdlIGRvIHRoaXMgY2xldmVybHlcbiAgICAgKiB3aXRoIGdlbmVyaWNzIGFuZCB0eXBlIHBvbHltb3JwaGlzbSBvciBzb21ldGhpbmc/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmdldChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXMoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmhhcyhrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogdGhpcy5ib29sZWFucy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiB0aGlzLm51bWJlcnMuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogdGhpcy5zdHJpbmdzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5vYmplY3RzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpa2UgZ2V0LCBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlIHZhbHVlIENyZHQsXG4gICAgICogcmV0dXJucyBpdHMgdmFsdWUuICBOb3RlIGZvciBzdHJpbmdzLCBpZiB0aGUgQ3JkdFxuICAgICAqIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgdmFsdWUgKGVpdGhlciBvciAyKyksXG4gICAgICogd2hpY2ggaXMgcG9zc2libGUgZHVlIHRvIHRoZSBNdWx0aVZhbHVlUmVnaXN0ZXJcbiAgICAgKiBzZW1hbnRpY3MsIHdlIHJldHVybiB0aGUgc2V0IG9mIGFsbCBjdXJyZW50IHZhbHVlc1xuICAgICAqIGluc3RlYWQgb2YgYSBzaW5nbGUgc3RyaW5nLlxuICAgICAqXG4gICAgICogVE9ETzogdXNlIGdlbmVyaWNzIHRvIHNheSB0aGF0IHJldHVybiB2YWx1ZSBpc1xuICAgICAqIHNhbWUgYXMgdHlwZUluZGljYXRvciB0eXBlIHwgdW5kZWZpbmVkP1xuICAgICAqIFdvcmtzIGV4Y2VwdCBmb3Igc3RyaW5ncyxcbiAgICAgKiB3aGljaCBjb3VsZCBpbnN0ZWFkIHJldHVybiBhIFNldDxzdHJpbmc+LlxuICAgICAqIENvdWxkIGluc3RlYWQgaGF2ZSBzcGVjaWZpY2FsbHkgdHlwZWQgdmVyc2lvbnMgb2YgdGhlIG1ldGhvZC5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZShrZXk6IHN0cmluZywgdHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCk6XG4gICAgICAgICAgICBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHwgU2V0PHN0cmluZz4gfCBTZXQ8YW55PiB8IE9iamVjdCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLmdldChrZXksIHR5cGVJbmRpY2F0b3IpO1xuICAgICAgICBpZiAodmFsdWVDcmR0ID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlQ3JkdCBpbnN0YW5jZW9mIE11bHRpVmFsdWVSZWdpc3Rlcikge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVNldCA9IHZhbHVlQ3JkdC52YWx1ZVNldDtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTZXQuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTZXQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZVNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlQ3JkdC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcy9yZXZpdmVzIHRoZSBnaXZlbiBrZXkgd2l0aCB0aGUgaW5kaWNhdGVkIHR5cGUgaWZcbiAgICAgKiBuZWVkZWQsIG1ha2luZyBpdCBwcmVzZW50IGluIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHRoZSB2YWx1ZSBDcmR0LlxuICAgICAqL1xuICAgIGluaXQoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgLy8gVE9ETzogY2FuIHdlIGdlbmVyaWZ5IHRoaXMgZnVuY3Rpb24gcGF0dGVybj9cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5pbml0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5pbml0KGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgdG8gYSBjb3B5IG9mIHRoZSBnaXZlblxuICAgICAqIChub24tQ3JkdCkgdmFsdWUsIHVzaW5nIHRoZSBDcmR0J3MgLnZhbHVlID0gbWV0aG9kLlxuICAgICAqIFRoaXMgZ2VuZXJhbGx5IGhhcyB0aGUgZWZmZWN0IG9mIHJlc2V0dGluZyB0aGUgY3VycmVudCBDcmR0XG4gICAgICogYW5kIHRoZW4gcGVyZm9ybWluZyBvcGVyYXRpb25zIHRvIGRyaXZlIGl0IHRvIHRoZSBkZXNpcmVkXG4gICAgICogdmFsdWUuICBJZiB5b3Ugd2FudCBtb3JlIGNvbnRyb2wgb3ZlciBob3cgdGhlIHZhbHVlIGlzIHNldFxuICAgICAqIChlLmcuLCBwYXNzaW5nIGFuIG9wdGlvbiB0byBKc29uQ3JkdC5nZXRBc09iamVjdCB3aGVuIHNldHRpbmdcbiAgICAgKiBhbiBvYmplY3QncyB2YWx1ZSksIHlvdSBjYW4gaW5zdGVhZCBnZXQgdGhlIENyZHQgd2l0aFxuICAgICAqIHRoaXMuaW5pdChrZXksIHZhbHVlKSBhbmQgdGhlbiBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaXRcbiAgICAgKiBkaXJlY3RseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB2YWx1ZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIHZhbHVlIENyZHQgKHRoaXMuZ2V0KGtleSwgdmFsdWUpKS5cbiAgICAgKi9cbiAgICBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLnNldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZhbHVlSW50ZXJuYWwoa2V5OiBzdHJpbmcsIHZhbHVlOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLmluaXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHZhbHVlQ3JkdC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWVDcmR0O1xuICAgIH1cblxuICAgIGtleXNCeVR5cGUodHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmtleXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmtleXMoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBBcnJheSBvZiBba2V5LCB0eXBlIG5hbWVdIHBhaXJzXG4gICAgICovXG4gICAga2V5cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuYm9vbGVhbnMua2V5cygpKSByZXN1bHQucHVzaChba2V5LCBcImJvb2xlYW5cIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5udW1iZXJzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJudW1iZXJcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zdHJpbmdzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJzdHJpbmdcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zZXRzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJzZXRcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5vYmplY3RzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJvYmplY3RcIl0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIFRPRE86IGRlbGV0ZVxuICAgIC8vIFRPRE86IGRlbGV0ZVN0cm9uZyAob25jZSBtYXAgc3VwcG9ydHMgaXQuICBQZXJoYXBzIHRocm93XG4gICAgLy8gZXJyb3Igb24gbWFwIHZhbHVlcyBvbmx5PylcblxuICAgIHN0YXRpYyByZWFkb25seSBFcnJvck9uQ29uZmxpY3QgPSAxO1xuICAgIHN0YXRpYyByZWFkb25seSBQcmVmaXhUeXBlcyA9IDI7XG4gICAgc3RhdGljIHJlYWRvbmx5IEV4cGFuZE9uQ29uZmxpY3QgPSAzO1xuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrS2V5Q29uZmxpY3RSdWxlKGtleUNvbmZsaWN0UnVsZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMgfHxcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkVycm9yT25Db25mbGljdCB8fFxuICAgICAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBrZXlDb25mbGljdFJ1bGU6IFwiICtcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoaXMgQ3JkdCdzIHZhbHVlIGluIE9iamVjdCBmb3JtLlxuICAgICAqIENoYW5naW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBDcmR0IHN0YXRlLlxuICAgICAqIE5vdGUgdGhhdCBzZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gSmF2YXNjcmlwdCBTZXRzLFxuICAgICAqIHJlc3VsdGluZyBpbiBhIG5vdC1xdWl0ZS1KU09OIGZvcm1hdCBvYmplY3QuXG4gICAgICogQSBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVyIGlzIGNvbnZlcnRlZCB0byBhIHN0cmluZyBpZiBpdCBoYXNcbiAgICAgKiBhIHNpbmdsZSB2YWx1ZTsgb3RoZXJ3aXNlICgwIG9yIDIrIHZhbHVlcykgaXRcbiAgICAgKiBpcyBjb252ZXJ0ZWQgdG8gYSBTZXQ8c3RyaW5nPlxuICAgICAqIChBcnJheTxzdHJpbmc+IGlmIHNldHNBc0FycmF5cz10cnVlKVxuICAgICAqIG9mIGFsbCBjdXJyZW50IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5Q29uZmxpY3RSdWxlPUpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgKiBQb2xpY3kgZm9yIGhhbmRsaW5nIGtleXMgb2YgZGlmZmVyZW50IHR5cGVzIHRoYXQgaGF2ZSB0aGVcbiAgICAgKiBzYW1lIG5hbWUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KTogdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3QuXG4gICAgICogLSBQcmVmaXhUeXBlczogcHJlZml4IHRoZSB0eXBlIG5hbWUgZm9sbG93ZWQgYnkgXCI6XCIgdG8gZWFjaCBrZXksXG4gICAgICogZS5nLiBcIm51bWJlcjpteUtleVwiLiAgVHlwZSBuYW1lcyBhcmUgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsXG4gICAgICogXCJzdHJpbmdcIiwgXCJzZXRcIiwgXCJvYmplY3RcIi5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IGlmIHRoZXJlIGlzIGEgY29uZmxpY3Qgb25cbiAgICAgKiBhIGtleSwgc2V0IGl0cyB2YWx1ZSB0byBlcXVhbCBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIG9mXG4gICAgICogdGhlIGNvbmZsaWN0aW5nIHZhbHVlcywgcGx1cyBhIGZsYWcgXCJqc29uQ3JkdEtleUV4cGFuZGVkID0gdHJ1ZVwiLiAgRS5nLlxuICAgICAqIFwibXlLZXlcIjoge1wianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLCBcInN0cmluZ1wiOiBcInN0cmluZ1ZhbHVlXCIsXG4gICAgICogXCJudW1iZXJcIjogN31cbiAgICAgKiBAcGFyYW0gc2V0c0FzQXJyYXlzID0gZmFsc2UgSWYgdHJ1ZSwgU2V0IHZhbHVlcyBhcmUgY29udmVydGVkXG4gICAgICogdG8gYXJyYXlzLCBzbyB0aGF0IHRoZSByZXN1bHRpbmcgT2JqZWN0IGlzIGluIHJlZ3VsYXIgSlNPTlxuICAgICAqIGZvcm1hdC4gIFRoaXMgaW5jbHVkZXMgU2V0PHN0cmluZz4gdmFsdWVzIHJlc3VsdGluZyBmcm9tXG4gICAgICogc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlcnMgdGhhdCBoYXZlIDAgb3IgMisgdmFsdWVzLlxuICAgICAqL1xuICAgIGdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCxcbiAgICAgICAgICAgIHNldHNBc0FycmF5cyA9IGZhbHNlKTogT2JqZWN0IHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgbGV0IG9iamVjdDogSnNvbkluZGV4VHlwZSA9IHt9O1xuICAgICAgICAvLyBNYXBzIGtleXMgdG8gdGhlIG5hbWUgb2YgdGhlaXIgZmlyc3QgdHlwZVxuICAgICAgICBsZXQga2V5c1NvRmFyID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgICAgbGV0IGNvbmZsaWN0ZWRLZXlzU29GYXIgPSBuZXcgU2V0PFN0cmluZz4oKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLmJvb2xlYW5zLCBcImJvb2xlYW5cIixcbiAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlLnZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5udW1iZXJzLCBcIm51bWJlclwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gdmFsdWUudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLnN0cmluZ3MsIFwic3RyaW5nXCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLnZhbHVlU2V0O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc2l6ZSA9PT0gMSkgcmV0dXJuIHJlc3VsdC52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gKHNldHNBc0FycmF5cz8gWy4uLnJlc3VsdC52YWx1ZXMoKV06IHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5zZXRzLCBcInNldFwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gKHNldHNBc0FycmF5cz8gWy4uLnZhbHVlLnZhbHVlXTogdmFsdWUudmFsdWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5vYmplY3RzLCBcIm9iamVjdFwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gdmFsdWUuZ2V0QXNPYmplY3Qoa2V5Q29uZmxpY3RSdWxlLCBzZXRzQXNBcnJheXMpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0QXNPYmplY3RJbnRlcm5hbDxWIGV4dGVuZHMgQ3JkdDxhbnk+PihcbiAgICAgICAgb2JqZWN0OiBKc29uSW5kZXhUeXBlLCBrZXlzU29GYXI6IE1hcDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGNvbmZsaWN0ZWRLZXlzU29GYXI6IFNldDxTdHJpbmc+LCBrZXlDb25mbGljdFJ1bGU6IG51bWJlcixcbiAgICAgICAgbWFwOiBNYXBDcmR0PHN0cmluZywgVj4sIHR5cGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHZhbHVlRnVuYzogKHZhbHVlQ3JkdDogVikgPT4gYW55KSB7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBtYXAua2V5cygpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUZ1bmMobWFwLmdldChrZXkpIGFzIFYpO1xuICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbdHlwZU5hbWUgKyBcIjpcIiArIGtleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIEtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIGlmIChrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUga2V5OiBcIiArIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB3aGVuIGtleUNvbmZsaWN0UnVsZT1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkpzb25DcmR0LkVycm9yT25Db25mbGljdFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmZsaWN0ZWRLZXlzU29GYXIuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4cGFuZCB0aGUgZXhpc3RpbmcgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZsaWN0ZWRLZXlzU29GYXIuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhwYW5kZWQ6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFtrZXlzU29GYXIuZ2V0KGtleSkgYXMgc3RyaW5nXSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBleHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAob2JqZWN0W2tleV0gYXMgSnNvbkluZGV4VHlwZSlbdHlwZU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8ga2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBrZXlzU29GYXIuc2V0KGtleSwgdHlwZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGlzIG9iamVjdCBhbmQgdGhlbiBwZXJmb3JtcyBvcGVyYXRpb25zIHRvXG4gICAgICogZHJpdmUgaXRzIHZhbHVlIHRvIHRoZSBnaXZlbiBKU09OLWxpa2UgT2JqZWN0LlxuICAgICAqIFByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGJvb2xlYW5zLCBudW1iZXJzLCBzdHJpbmdzLFxuICAgICAqIFNldHMsIG9yIG9iamVjdHMgYXJlIGlnbm9yZWQ7IG9iamVjdHMgYmVzaWRlcyBTZXRzXG4gICAgICogYXJlIHByb2Nlc3NlZCByZWN1cnNpdmVseS5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBJZiBuZXdWYWx1ZSBjb21lcyBmcm9tIGEgSnNvbkNyZHQncyAudmFsdWUgb3IgZ2V0QXNPYmplY3RcbiAgICAgKiBtZXRob2RzLCBub3RlIHRoYXQgc2V0cy9hcnJheXMgb2Ygc3RyaW5ncyByZXN1bHRpbmcgZnJvbVxuICAgICAqIG11bHRpLXZhbHVlIHJlZ2lzdGVycyB3aWxsIGJlIHRyZWF0ZWQgYXMgc2V0cywgbm90XG4gICAgICogc3RyaW5nIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbmV3VmFsdWUgVGhlIHZhbHVlIHRvIHNldCB0by5cbiAgICAgKiBAcGFyYW0gbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3RcbiAgICAgKiBJZiBuZXdWYWx1ZSB3YXMgZ2VuZXJhdGVkIGJ5IGdldEFzT2JqZWN0LCB0aGUga2V5Q29uZmxpY3RSdWxlXG4gICAgICogdXNlZCB0byBnZW5lcmF0ZSBpdCwgc28gdGhhdCB3ZSBjYW4gdW5kbyB0aGUgZWZmZWN0XG4gICAgICogb2YgdGhhdCBydWxlLiAgT3B0aW9uczpcbiAgICAgKiAtIEVycm9yT25Db25mbGljdCAoZGVmYXVsdCk6IGtleXMgYW5kIHZhbHVlcyBhcmUgdXNlZCBsaXRlcmFsbHksXG4gICAgICogd2l0aCBpbmZlcnJlZCB0eXBlcy5cbiAgICAgKiBUaGlzIGlzIGFwcHJvcHJpYXRlIGZvciBPYmplY3RzIG5vdCBjb21pbmcgZnJvbSBhIEpzb25DcmR0J3NcbiAgICAgKiBnZXRBc09iamVjdCBmdW5jdGlvbiwgaW4gd2hpY2ggd2Ugd2FudCB0byBrZWVwIGtleXMgYXNcbiAgICAgKiB0aGV5IGFyZS5cbiAgICAgKiAtIFByZWZpeFR5cGVzOiBUeXBlcyBhcmUgdGFrZW4gZnJvbSBwcmVmaXhlcyBvbiBrZXlzLiAgSWYgYVxuICAgICAqIGtleSBkb2VzIG5vdCBoYXZlIGEgdHlwZSBwcmVmaXgsIGl0IGlzIGlnbm9yZWQuXG4gICAgICogLSBFeHBhbmRPbkNvbmZsaWN0OiBvYmplY3RzIHdpdGggYSBwcm9wZXJ0eSBcImpzb25DcmR0S2V5RXhwYW5kZWRcIiBzZXRcbiAgICAgKiB0byB0cnVlIGFyZSBpbnRlcnByZXRlZCBhcyB0aGUgcmVzdWx0IG9mIGV4cGFuZGluZyBhXG4gICAgICoga2V5IGR1ZSB0byBhIGNvbmZsaWN0LiAgSWYgc3VjaCBhbiBvYmplY3QgZG9lcyBub3QgaGF2ZVxuICAgICAqIHRoZSBleHBlY3RlZCBmb3JtYXQsIGFueSBwcm9wZXJ0aWVzIHdpdGggdW5yZWNvZ25pemVkIG5hbWVzXG4gICAgICogYXJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgc2V0VG9PYmplY3QobmV3VmFsdWU6IE9iamVjdCwgbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5tZXJnZU9iamVjdEludGVybmFsKG5ld1ZhbHVlLCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBvcGVyYXRpb25zIHRvIGRyaXZlIHRoaXMgQ3JkdCdzIHZhbHVlIHRvIHRoZVxuICAgICAqIGdpdmVuIEpTT04tbGlrZSBPYmplY3QncyBzdGF0ZSwgYnV0IHdpdGhvdXQgcmVzZXR0aW5nXG4gICAgICogdGhlIGN1cnJlbnQgdmFsdWUuICBUaGUgbWFpbiBlZmZlY3Qgb2YgdGhpcyBpcyB0b1xuICAgICAqIG1lcmdlIGtleXM7IGluIGNhc2Ugb2Yga2V5IGNvbmZsaWN0cywgdGhlIHZhbHVlcyBhcmUgbWVyZ2VkXG4gICAgICogaW4gYSB0eXBlLXNwZWNpZmljIHdheSAoVE9ETzogZGV0YWlscykuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgaXMgbm90IGEgbWVyZ2UgaW4gdGhlIHNlbnNlIG9mIGEgc3RhdGUtYmFzZWQgQ3JkdC5cbiAgICAgKiBJbnN0ZWFkLCBpdCB0aGUgQ3JkdCB2ZXJzaW9uIG9mIG1lcmdpbmcgb3JkaW5hcnkgKG5vbi1DcmR0KVxuICAgICAqIE9iamVjdHMsIGJ5IHJlY3Vyc2l2ZWx5IGNvbWJpbmluZyB0aGVpciBrZXktdmFsdWUgcGFpcnMuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiBzZXRUb09iamVjdCBmb3IgZGlzY2xhaW1lcnMgYW5kXG4gICAgICogb3RoZXJLZXlDb25mbGljdFJ1bGUuXG4gICAgICpcbiAgICAgKiBUT0RPOiByZXR1cm4gbGlzdCBvZiBjaGFuZ2VzP1xuICAgICAqIEBwYXJhbSAgb3RoZXIgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIG1lcmdlT2JqZWN0KG90aGVyOiBPYmplY3QsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBwcml2YXRlIG1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXI6IEpzb25JbmRleFR5cGUsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIEpzb25DcmR0LmNoZWNrS2V5Q29uZmxpY3RSdWxlKG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcblxuICAgICAgICAvLyBFeHRyYWN0IHByb3BlcnRpZXMgYXMgYW4gYXJyYXkgb2YgW25hbWUsIHR5cGUsIHZhbHVlXVxuICAgICAgICBsZXQgcHJvcGVydGllczogQXJyYXk8W3N0cmluZywgc3RyaW5nLCBhbnldPiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBvdGhlcikge1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IG90aGVyW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGxldCB0eXBlOiBzdHJpbmc7XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gcHJvcE5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBwcm9wTmFtZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBwcm9wTmFtZS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gTXVsdGktdmFsdWVkIHN0cmluZ3MgYXJlIHRyZWF0ZWQgYXMgc2V0c1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChbcHJvcE5hbWUsIHR5cGUsIG90aGVyW3Byb3BOYW1lXV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90ZSBwcm9wZXJ0aWVzIG1heSBncm93IGR1cmluZyBleGVjdXRpb24gZHVlIHRvXG4gICAgICAgIC8vIHVucGFja2luZyBleHBhbmRlZCBrZXlzLlxuICAgICAgICBsZXQgb3JpZ2luYWxMZW5ndGggPSBwcm9wZXJ0aWVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvcE5hbWUgPSBwcm9wZXJ0aWVzW2ldWzBdO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBwcm9wZXJ0aWVzW2ldWzFdO1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IHByb3BlcnRpZXNbaV1bMl07XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgYW4gZXhwYW5kZWQga2V5XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgaSA8IG9yaWdpbmFsTGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW1wianNvbkNyZHRLZXlFeHBhbmRlZFwiXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFVucGFjayB0aGUgb2JqZWN0IG9udG8gdGhlIGVuZCBvZiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZXhwYW5kZWROYW1lIGluIHByb3BWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwYW5kZWROYW1lICE9PSBcImpzb25DcmR0S2V5RXhwYW5kZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKFtwcm9wTmFtZSwgZXhwYW5kZWROYW1lLCBwcm9wVmFsdWVbZXhwYW5kZWROYW1lXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgcHJvcGVydHksIGNoZWNraW5nIHRoYXQgaXQncyB0eXBlXG4gICAgICAgICAgICAgICAgLy8gaXMgb25lIHdlIGV4cGVjdC5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0OiBtZXJnZVxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuaW5pdChwcm9wTmFtZSwge30pIGFzIEpzb25DcmR0KS5tZXJnZU9iamVjdEludGVybmFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSwgb3RoZXJLZXlDb25mbGljdFJ1bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBib29sZWFuLCBudW1iZXIsIHN0cmluZzogb3ZlcndyaXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlSW50ZXJuYWwocHJvcE5hbWUsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gXCJzZXRcIiAmJiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQ6IGFkZCBhbGwgdmFsdWVzIGluIHNldFxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0Q3JkdCA9IHRoaXMuaW5pdChwcm9wTmFtZSwgbmV3IFNldCgpKSBhcyBBZGRXaW5zU2V0PGFueT47XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHByb3BWYWx1ZSkgc2V0Q3JkdC5hZGQoZW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbHNlIHNraXAgdGhlIGVudHJ5IChub3QgYSByZWNvZ25pemVkIHR5cGUpLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuZ2V0QXNPYmplY3QoKS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXNPYmplY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuc2V0QXNPYmplY3QobmV3VmFsdWUpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuc2V0VG9PYmplY3QobmV3VmFsdWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENyZHQsIENyZHRJbnRlcm5hbCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuaW1wb3J0IHsgU2VtaWRpcmVjdFN0YXRlLCBTZW1pZGlyZWN0SW50ZXJuYWwgfSBmcm9tIFwiLi9zZW1pZGlyZWN0XCI7XG5pbXBvcnQgeyBDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcblxuLy8gVE9ETzogaG93IHRvIGRvIGdhcmJhZ2UgY29sbGVjdGlvbiBvZiByZXNldC13aW5zIG9wZXJhdGlvbnM/XG4vLyBFLmcuIGZvciBmbGFncyBpbiBhIHNldDogZ2FyYmFnZSBjb2xsZWN0aW9uIHdpbGwgZmFpbCBpZlxuLy8gdGhlcmUgYXJlIHJlc2V0LXdpbnMgb3BzIGluIHRoZSBoaXN0b3J5LCBhcyBpdCBzaG91bGQsIGJ1dFxuLy8gd2Ugd291bGQgbGlrZSB0byBnYXJiYWdlIGNvbGxlY3QgYW55d2F5IG9uY2UgYWxsIHRoZSByZXNldC13aW5zXG4vLyBhcmUgY2F1c2FsbHkgc3RhYmxlLlxuZXhwb3J0IGNsYXNzIFJlc2V0V2luc0NvbXBvbmVudDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmVzZXRJbml0aWFsRGF0YTogYW55KSB7IH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogUykge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBhbHdheXMgXCJyZXNldFwiLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBzdHJpbmcsIF9zdGF0ZTogUywgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgc3RyaW5nXSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdGUgd2Ugc2hvdWxkIHJldHVybiBhIGNsb25lIG9mIHRoZSByZXNldCBzdGF0ZSwgbm90XG4gICAgICAgIC8vIGEgZml4ZWQgXCJyZXNldCBzdGF0ZVwiLCBzaW5jZSB0aGUgcmV0dXJuZWQgc3RhdGUgbWF5XG4gICAgICAgIC8vIGJlIG11dGF0ZWQgbGF0ZXIuXG4gICAgICAgIHJldHVybiBbdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSksIFwicmVzZXRcIl07XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFRvPFM+KG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55KSA6IFNlbWlkaXJlY3RJbnRlcm5hbDxTPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2VtaWRpcmVjdEludGVybmFsPFM+KFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0LCBuZXcgUmVzZXRXaW5zQ29tcG9uZW50KG9yaWdpbmFsQ3JkdCxcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGEpLFxuICAgICAgICAgICAgKF9tMiA6IHN0cmluZywgX20xOiBhbnkpID0+IG51bGwsXG4gICAgICAgICAgICAxLCBmYWxzZSwgZmFsc2UsIHRydWVcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVzZXRXaW5zQ3JkdDxTPlxuICAgICAgICBleHRlbmRzIENyZHQ8U2VtaWRpcmVjdFN0YXRlPFM+PiB7XG4gICAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdEludGVybmFsUmVzZXRXaW5zOiBDcmR0SW50ZXJuYWw8Uz47XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIG9yaWdpbmFsQ3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhOiBhbnksXG4gICAgICAgICAgICBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBhbnkpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gUmVzZXRXaW5zQ29tcG9uZW50LmFkZFRvKFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGFcbiAgICAgICAgKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWxSZXNldFdpbnMgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXRTdHJvbmcoKSB7XG4gICAgICAgIHN1cGVyLmFwcGx5T3AoWzIsIFwicmVzZXRcIl0pO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbMiwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFwcGx5T3Aob3BlcmF0aW9uOiBhbnkpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzEsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhIHJlc2V0LXdpbnMgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRTdHJvbmdcIl0sIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBpdCBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcGVyYXRpb24gdGhhdCBnZXRzIGtpbGxlZCBieVxuICAgICAqIGEgY29uY3VycmVudCByZXNldC13aW5zIGlzIHNraXBwZWQuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBvcGVyYXRpb25zIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucyxcbiAgICAgKiB3aGljaCBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucywgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gUmVzZXQtd2lucyBkZXNjcmlwdGlvbiBpcyBbMiwgXCJyZXNldFwiXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMiAmJiBkZXNjWzFdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goW1wicmVzZXRTdHJvbmdcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3JpZ2luYWxDcmR0T3BlcmF0aW9uIGlzIG9mIHRoZSBmb3JtIFsxLCBkZXNjXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXNjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZWQubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnModHJhbnNsYXRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpbnN0ZWFkIG9mIHRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKiBTZWUgQ3JkdC50cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cblxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXRXaW5zKCk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cblxuLy8gVE9ETzogcmVuYW1lIG9yaWdpbmFsQ3JkdEludGVybmFsIChhYm92ZSkgYW5kIG9yaWdpbmFsQ3JkdFxuLy8gdG8gcmVmbGVjdCByZXNldC13aW5zIHZzIHJlc2V0LCB0byBhdm9pZCBjb25mdXNpb24uXG5cbmV4cG9ydCBjbGFzcyBPYnNlcnZlZFJlc2V0Q29tcG9uZW50PFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFM+IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByZXNldEluaXRpYWxEYXRhOiBhbnkpIHsgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IHN0cmluZywgX3N0YXRlOiBTKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIFtcInJlc2V0XCIsIGxpc3Qgb2ZcbiAgICAgKiB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5IG9yaWdpbmFsQ3JkdCB3aGVuIHByb2Nlc3NpbmdcbiAgICAgKiB0aGUgbWVzc2FnZXMgYXBwZWFyaW5nIGluIG1lc3NhZ2UgKGkuZS4sIHRoZSBtZXNzYWdlcyB0aGF0XG4gICAgICogYXZvaWRlZCBiZWluZyByZXNldCBiZWNhdXNlIHRoZXkgd2VyZSBjb25jdXJyZW50IHRvIHRoZVxuICAgICAqIHJlc2V0IG9wZXJhdGlvbildLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBBcnJheTxbYW55LCBDYXVzYWxUaW1lc3RhbXBdPiwgX3N0YXRlOiBTLFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBbc3RyaW5nLCBBcnJheTxhbnk+XV0ge1xuICAgICAgICBsZXQgcmVzZXRTdGF0ZSA9IHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZSh0aGlzLnJlc2V0SW5pdGlhbERhdGEpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGNvbmN1cnJlbnRNZXNzYWdlIG9mIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLm9yaWdpbmFsQ3JkdC5lZmZlY3QoY29uY3VycmVudE1lc3NhZ2VbMF0sXG4gICAgICAgICAgICAgICAgcmVzZXRTdGF0ZSwgcmVwbGljYUlkLCBjb25jdXJyZW50TWVzc2FnZVsxXSk7XG4gICAgICAgICAgICByZXNldFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Jlc2V0U3RhdGUsIFtcInJlc2V0XCIsIGRlc2NyaXB0aW9uc11dO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUbzxTPihvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIDogU2VtaWRpcmVjdEludGVybmFsPFM+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4oXG4gICAgICAgICAgICBuZXcgT2JzZXJ2ZWRSZXNldENvbXBvbmVudChvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpLFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0LFxuICAgICAgICAgICAgKG0yOiBbYW55LCBDYXVzYWxUaW1lc3RhbXBdLCBtMTogQXJyYXk8W2FueSwgQ2F1c2FsVGltZXN0YW1wXT4pID0+XG4gICAgICAgICAgICAgICAge20xLnB1c2gobTIpOyByZXR1cm4gbTF9LFxuICAgICAgICAgICAgMiwgdHJ1ZSwgdHJ1ZSwga2VlcE9ubHlNYXhpbWFsXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlc2V0dGFibGVDcmR0PFM+XG4gICAgICAgIGV4dGVuZHMgRGVmYXVsdFJlc2V0V2luc0NyZHQ8U2VtaWRpcmVjdFN0YXRlPFM+PiB7XG4gICAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz47XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBvcmlnaW5hbENyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55LFxuICAgICAgICAgICAgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55LFxuICAgICAgICAgICAga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudC5hZGRUbyhcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YSwga2VlcE9ubHlNYXhpbWFsXG4gICAgICAgICk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIG9wIGlmIHdlJ3JlIGFscmVhZHkgcmVzZXQgKG9rYXkgZ2l2ZW5cbiAgICAgICAgLy8gb2JzZXJ2ZS1yZXNldCBzZW1hbnRpY3MpLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpKSB7XG4gICAgICAgICAgICBzdXBlci5hcHBseU9wKFsxLCBcInJlc2V0XCJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIE5vdGUgaGVyZSB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIHRoZSByZXNldC13aW5zIGxheWVyXG4gICAgICAgIC8vIChpdCdzIG5vdCB3cmFwcGVkIGF1dG9tYXRpY2FsbHkgbGlrZSBpbiBzdXBlci5hcHBseU9wcykuXG4gICAgICAgIHJldHVybiBbMSwgWzEsIFtdXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsyLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0XCIsIFtUT0RPOiByZS1hcHBsaWVkIG9wc11dLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLCB3aGljaFxuICAgICAqIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSwgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gUmVzZXQtc3Ryb25nIChhbHJlYWR5IHRyYW5zbGF0ZWQgYnkgRGVmYXVsdFJlc2V0V2luc0NyZHQpXG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvbiBpcyBcInJlc2V0U3Ryb25nXCJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE9ic2VydmVkIHJlc2V0IGRlc2NyaXB0aW9uIGlzIFsxLCBbXCJyZXNldFwiLFxuICAgICAgICAgICAgLy8gbGlzdCBvZiByZS1hcHBsaWVkIG9wc11dXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAxICYmIGRlc2NbMV1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGluIHRoZSBzZWNvbmQgZW50cnksIHB1dCB0aGUgdHJhbnNsYXRlZFxuICAgICAgICAgICAgICAgIC8vIG9wZXJhdGlvbnMgdGhhdCBkaWRuJ3QgZ2V0IHJlc2V0LiAgS2VlcCBpblxuICAgICAgICAgICAgICAgIC8vIG1pbmQgdGhhdCB0aGVzZSB3aWxsIGJlIGRlc2NyaXB0aW9ucyBmcm9tIHRoZVxuICAgICAgICAgICAgICAgIC8vIGlubmVybW9zdCBzZW1pZGlyZWN0IHByb2R1Y3QuICBXaGF0IHRvIGRvXG4gICAgICAgICAgICAgICAgLy8gYWJvdXQgb3BlcmF0aW9ucyB0aGF0IHdlcmUgb3JpZ2luYWxseSBncm91cGVkXG4gICAgICAgICAgICAgICAgLy8gYXRvbWljYWxseSwgc2luY2UgdHJhbnNsYXRlIGV4cGVjdHMgdGhvc2VcbiAgICAgICAgICAgICAgICAvLyB0byBiZSBkZWxpdmVyZWQgdG9nZXRoZXI/XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKFtcInJlc2V0XCIsIGRlc2NbMV1bMV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsQ3JkdE9wZXJhdGlvbiBpcyBvZiB0aGUgZm9ybSBbMiwgZGVzY11cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzY1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVkLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSh0cmFuc2xhdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGluc3RlYWQgb2YgdHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqIFNlZSBDcmR0LnRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cblxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXR0YWJsZSgpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENhdXNhbFRpbWVzdGFtcCB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDcmR0SW50ZXJuYWwgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcblxuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmV4cG9ydCBjbGFzcyBTZW1pZGlyZWN0U3RhdGU8Uz4ge1xuICAgIHByaXZhdGUgcmVjZWlwdENvdW50ZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAqIHJlcGxpY2EsIGluIG9yZGVyLiAgU3BlY2lmaWNhbGx5LCBhcnJheSBlbGVtZW50cyBhcmUgdHVwbGVzXG4gICAgICogW3Blci1zZW5kZXIgbWVzc2FnZSBjb3VudGVyLCB0aGlzIHJlcGxpY2EncyByZWNlaXB0IGNvdW50ZXIsXG4gICAgICogbWVzc2FnZV0uICBLZWVwIGluIG1pbmQgdGhhdCBwZXItc2VuZGVyIG1lc3NhZ2VcbiAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICogYWxsIENyZHRzIHdpdGggYSBnaXZlbiBDcmR0UnVudGltZSBhbmQgYmV0d2VlblxuICAgICAqIGEgc2VtaWRpcmVjdCBwcm9kdWN0IGFuZCBpdHMgY29tcG9uZW50cy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpc3Rvcnk6IE1hcDxhbnksIEFycmF5PFtudW1iZXIsIG51bWJlciwgYW55XT4+ID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnRlcm5hbFN0YXRlOiBTLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeVRpbWVzdGFtcHM6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ6IGJvb2xlYW4pIHsgfVxuICAgIC8qKlxuICAgICAqIEFkZCBtZXNzYWdlIHRvIHRoZSBoaXN0b3J5IHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcC5cbiAgICAgKiByZXBsaWNhSWQgaXMgb3VyIHJlcGxpY2EgaWQuXG4gICAgICovXG4gICAgYWRkKHJlcGxpY2FJZDogYW55LCBtZXNzYWdlOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSk7XG4gICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbmRlckhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeS5zZXQodGltZXN0YW1wLmdldFNlbmRlcigpLCBzZW5kZXJIaXN0b3J5KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcCA9IHRoaXMuaGlzdG9yeVRpbWVzdGFtcHM/XG4gICAgICAgICAgICAgICAgW21lc3NhZ2UsIHRpbWVzdGFtcF06IG1lc3NhZ2U7XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChbdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKSwgdGhpcy5yZWNlaXB0Q291bnRlciwgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcF0pO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyKys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCB0cnVlLFxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNwZWNpZmllZCBhY3Rpb25zIG9uIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeTpcbiAgICAgKiAtIGlmIHJldHVybkNvbmN1cnJlbnQgaXMgdHJ1ZSwgcmV0dXJucyB0aGUgbGlzdCBvZlxuICAgICAqIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRpbWVzdGFtcCwgaW5cbiAgICAgKiByZWNlaXB0IG9yZGVyLlxuICAgICAqIC0gaWYgZGlzY2FyZERvbWluYXRlZCBpcyB0cnVlLCBkZWxldGVzIGFsbCBtZXNzYWdlcyBmcm9tXG4gICAgICogdGhlIGhpc3Rvcnkgd2hvc2UgdGltZXN0YW1wcyBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5XG4gICAgICogb3IgZXF1YWwgdG8gdGhlIGdpdmVuIHRpbWVzdGFtcC4gIChOb3RlIHRoYXQgdGhpcyBtZWFucyB0aGF0XG4gICAgICogaWYgd2Ugd2FudCB0byBrZWVwIGEgbWVzc2FnZSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAgaW5cbiAgICAgKiB0aGUgaGlzdG9yeSwgaXQgbXVzdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBhZnRlciBjYWxsaW5nXG4gICAgICogdGhpcyBtZXRob2QuKVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQ6IGFueSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wLCByZXR1cm5Db25jdXJyZW50OiBib29sZWFuLFxuICAgICAgICAgICAgZGlzY2FyZERvbWluYXRlZDogYm9vbGVhbik6IEFycmF5PGFueT4ge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50OiBBcnJheTxbbnVtYmVyLCBudW1iZXIsIGFueV0+ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPVxuICAgICAgICAgICAgICAgICAgICBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyIChpLmUuLFxuICAgICAgICAgICAgLy8gYnkgdGhlIHNlY29uZCBlbnRyeSBpbiBlYWNoIHRyaXBsZSkuXG4gICAgICAgICAgICBjb25jdXJyZW50LnNvcnQoKGEsIGIpID0+IChhWzFdIC0gYlsxXSkpO1xuICAgICAgICAgICAgLy8gU3RyaXAgYXdheSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgbWVzc2FnZXMuXG4gICAgICAgICAgICByZXR1cm4gY29uY3VycmVudC5tYXAoYSA9PiBhWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3Igd29ya2luZyB3aXRoIHRoZSBwZXItc2VuZGVyIGhpc3RvcnlcbiAgICAgKiBhcnJheXMuICBSZXR1cm5zIHRoZSBpbmRleCBhZnRlciB0aGUgbGFzdCBlbnRyeSB3aG9zZVxuICAgICAqIHBlci1zZW5kZXIgY291bnRlciAodGhlIGZpcnN0IHR1cGxlIGVsZW1lbnQpIGlzIDw9XG4gICAgICogdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5kZXhBZnRlcihzcGFyc2VBcnJheTogQXJyYXk8W251bWJlciwgbnVtYmVyLCBhbnldPixcbiAgICAgICAgICAgIHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAvLyBUT0RPOiBiaW5hcnkgc2VhcmNoIHdoZW4gc3BhcnNlQXJyYXkgaXMgbGFyZ2VcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZXJlIG1heSBiZSBkdXBsaWNhdGUgdGltZXN0YW1wcy5cbiAgICAgICAgLy8gU28gaXQgd291bGQgYmUgaW5hcHByb3ByaWF0ZSB0byBmaW5kIGFuIGVudHJ5IHdob3NlXG4gICAgICAgIC8vIHBlci1zZW5kZXIgY291bnRlciBlcXVhbHMgdmFsdWUgYW5kIGluZmVyIHRoYXRcbiAgICAgICAgLy8gdGhlIGRlc2lyZWQgaW5kZXggaXMgMSBncmVhdGVyLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYXJzZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3BhcnNlQXJyYXlbaV1bMF0gPiB2YWx1ZSkgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYXJzZUFycmF5Lmxlbmd0aDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8U2VtaWRpcmVjdFN0YXRlPFM+PiB7XG4gICAgLyoqXG4gICAgICogQ3JkdEludGVybmFsIGltcGxlbWVudGluZyB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IG9mXG4gICAgICogY3JkdDEgYW5kIGNyZHQyIHdpdGggdGhlIGdpdmVuIGFjdGlvbiwgd2hpY2ggaXMgYSBmdW5jdGlvblxuICAgICAqIChtMjogY3JkdDIgbWVzc2FnZSwgbTE6IGNyZHQxIG1lc3NhZ2UpOiBjcmR0MSBtZXNzYWdlLlxuICAgICAqIGNyZHQxLCBjcmR0MiwgYW5kIGFjdGlvbiBtdXN0IHNhdGlzZnkgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdFxuICAgICAqIGFzc3VtcHRpb25zIGZyb20gb3VyIHBhcGVyLlxuICAgICAqXG4gICAgICogVE9ETzogb3B0aW9ucyBhbmQgdGhlaXIgdGhlb3JldGljYWwgc2lnbmlmaWNhbmNlLiAgRm9ybWFsbHksXG4gICAgICogaGlzdG9yeVRpbWVzdGFtcHMgPSB0cnVlIG1lYW5zIHRoYXQgdGltZXN0YW1wcyBiZWNvbWVcbiAgICAgKiBwYXJ0IG9mIHRoZSBjcmR0MiBtZXNzYWdlcy4gIEFsc28gY3JlYXRlQ3JkdEluZGV4LlxuICAgICAqIERvbWluYXRlZCBzdGF0cyBjb250cm9sIHdoZXRoZXIgeW91IGRpc2NhcmQgbWVzc2FnZXMgaW4gdGhlXG4gICAgICogaGlzdG9yeSB0aGF0IGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnkgY3JkdDEvY3JkdDIgbWVzc2FnZXM7XG4gICAgICogbmVlZCB0byBlbnN1cmUgdGhhdCBhY3Rpb24gaXMgdGhlIHNhbWUgd2l0aCB0aG9zZSBtZXNzYWdlc1xuICAgICAqIGRpc2NhcmRlZC4gIElmIGRvbWluYXRlZDEgaXMgc2V0LCB0aGVuIHN0YXRlLmlzSGlzdG9yeUVtcHR5KClcbiAgICAgKiBiZWNvbWVzICh0aGVyZSBleGlzdHMgYSBjcmR0MiBtZXNzYWdlIG5vdCBjYXVzYWxseSBkb21pbmF0ZWQgYnkgYVxuICAgICAqIGNyZHQxIG1lc3NhZ2UpLiAgQ2hlY2sgdGhpcyBpcyBzdGlsbCB0cnVlIGlmIGRvbWluYXRlZDIgaXMgc2V0LilcbiAgICAgKiBFeHBsYWluIGV4YW1wbGVzIHdoZXJlIHRoaXMgaXMgdXNlZCAocmVzZXR0YWJsZSwgZmxhZ3MpOyBpdCdzXG4gICAgICogbm90IHF1aXRlIGluIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3Qgc3Bpcml0IHVubGVzcyB5b3UgdGhpbmtcbiAgICAgKiBvZiBpdCBhcyB1c2luZyB0aGUgaGlzdG9yeSBhcyBwYXJ0IG9mIHRoZSBjcmR0MS8yIHN0YXRlLlxuICAgICAqIFBvdGVudGlhbCBvcHRpbWl6YXRpb246IG9ubHkgZGVsZXRlIGRvbWluYXRlZCBtZXNzYWdlcyB3aGVuXG4gICAgICogcmVjZWl2aW5nIG91ciBvd24gbWVzc2FnZSAoaXQncyBiYXNpY2FsbHkgZnJlZSBhbmQgYWx3YXlzXG4gICAgICogY2xlYXJzIHRoZSBoaXN0b3J5KSwgb3Igb25seSBzb21ldGltZXMgKHdpbGwgbWlzcyBzb21lXG4gICAgICogbWVzc2FnZXMsIHNvIG5lZWQgdG8gZW5zdXJlIGNvcnJlY3RuZXNzIGluIHRoYXQgY2FzZVxuICAgICAqIChJIHRoaW5rIGl0IGlzIG9rYXkgZm9yIGRvbWluYXRlZDIgYnV0IG5vdCBkb21pbmF0ZWQxIGluIG91clxuICAgICAqIHRhcmdldCB1c2UgY2FzZXMpLCBidXRcbiAgICAgKiBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgZHVlIHRvIGJhdGNoaW5nIGFuZCBzdGlsbCBraWxsXG4gICAgICogb2ZmIG1vc3QgbWVzc2FnZXMpLiAgVGhpcyB0cmFkZXMgYSBzbWFsbCBpbmNyZWFzZSBpbiBzcGFjZVxuICAgICAqIHVzYWdlIGZvciBhIGRlY3JlYXNlIGluIENQVSB0aW1lLlxuICAgICAqXG4gICAgICogQXMgZGVzY3JpYmVkIGluIENyZHRJbnRlcm5hbCBhbmQgQ3JkdCwgbnVsbCBtZXNzYWdlcyBhcmUgdHJlYXRlZFxuICAgICAqIGFzIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBpZCwgYWxsb3dpbmcgdGhlbSB0byBiZSBvcHRpbWl6ZWQgYXdheS5cbiAgICAgKiBCZWNhdXNlIG9mIHRoaXMsIGFjdGlvbiB3aWxsIG5ldmVyIGJlIGNhbGxlZCB3aXRoIG51bGwgYXNcbiAgICAgKiBlaXRoZXIgaW5wdXQuICBJbnN0ZWFkLCB3ZSBiZWhhdmUgYXMgaWZcbiAgICAgKiAoYWN0aW9uKGlkIChpLmUuLCBudWxsKSwgbTEpID0gbTEpXG4gICAgICogZm9yIGFsbCBtMSBhbmQgKGFjdGlvbihtMiwgaWQpID0gaWQpIGZvciBhbGwgbTIuICBUaGUgc2VtaWRpcmVjdFxuICAgICAqIHByb2R1Y3QgYXNzdW1wdGlvbnMgbXVzdCBob2xkIGdpdmVuIHRoZXNlIGFzc2lnbm1lbnRzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjcmR0MTogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JkdDI6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGFjdGlvbjogKG0yOiBhbnksIG0xOiBhbnkpID0+IGFueSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZWF0ZUNyZHRJbmRleDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeVRpbWVzdGFtcHMgPSBmYWxzZSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZWF0ZUNyZHRJbmRleCAobXVzdCBiZSAxIG9yIDIpOlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogU2VtaWRpcmVjdFN0YXRlPFM+IHtcbiAgICAgICAgbGV0IGludGVybmFsU3RhdGU6IFM7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNyZHRJbmRleCA9PT0gMSkgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RTdGF0ZShpbnRlcm5hbFN0YXRlLFxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcywgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbi9tZXNzYWdlIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG9wZXJhdGlvbi9tZXNzYWdlIGZvciB0aGF0IGNyZHRdLiAgQW4gZXhjZXB0aW9uIGlzIGlmXG4gICAgICogdGhlIGludGVybmFsIGNyZHQgcmV0dXJucyBhIG51bGwgbWVzc2FnZSwgaW4gd2hpY2ggY2FzZVxuICAgICAqIHdlIGp1c3QgcmV0dXJuIG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLiAgVGhpc1xuICAgICAqIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IHNlbmRpbmcgdGhlXG4gICAgICogbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIFRPRE8gKGdlbmVyYWwpOiBlcnJvciBjaGVja2luZ1xuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogU2VtaWRpcmVjdFN0YXRlPFM+LFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnkpOiBbbnVtYmVyLCBhbnldIHwgbnVsbCB7XG4gICAgICAgIGlmIChvcGVyYXRpb25bMF0gPT09IDEpIHtcbiAgICAgICAgICAgIGxldCBvcDEgPSB0aGlzLmNyZHQxLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbMSwgb3AxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcDIgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMiA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbMiwgb3AyXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLiAgRm9yIHRoaXMuY3JkdDFcbiAgICAgKiBtZXNzYWdlcywgdGhlIGRlc2NyaXB0aW9uIGlzIGZvciB0aGUgYWN0ZWQtb24gbWVzc2FnZSB0aGF0XG4gICAgICogaXMgYWN0dWFsbHkgYXBwbGllZCB0byB0aGlzLmludGVybmFsU3RhdGUsIG5vdCB0aGUgaW5wdXRcbiAgICAgKiBtZXNzYWdlLiAgQW4gZXhjZXB0aW9uIGlzIGlmIHRoZSBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbFxuICAgICAqIGNyZHQgaXMgbnVsbCAob3IgaWYgdGhlIG1lc3NhZ2UgZ2V0cyBhY3RlZCBvbiB0byBiZWNvbWUgbnVsbCksXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogU2VtaWRpcmVjdFN0YXRlPFM+LCByZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbU2VtaWRpcmVjdFN0YXRlPFM+LCBbbnVtYmVyLCBhbnldIHwgbnVsbF0ge1xuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gMikge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDIuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBzdGF0ZS5hZGQocmVwbGljYUlkLCBtZXNzYWdlWzFdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbCkgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbc3RhdGUsIFsyLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb25jdXJyZW50ID0gc3RhdGUuZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBsZXQgbUFjdCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtQWN0ID0gdGhpcy5hY3Rpb24oY29uY3VycmVudFtpXSwgbUFjdCk7XG4gICAgICAgICAgICAgICAgaWYgKG1BY3QgPT09IG51bGwpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1BY3QsIHN0YXRlLmludGVybmFsU3RhdGUsXG4gICAgICAgICAgICAgICAgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gW3N0YXRlLCBbMSwgcmVzdWx0WzFdXV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERpcmVjdEludGVybmFsPFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFM+IHtcbiAgICAvKipcbiAgICAgKiBEaXJlY3QgcHJvZHVjdCBvZiBDcmR0SW50ZXJuYWwncy4gIFRoaXMgaXMgdGhlXG4gICAgICogc3BlY2lhbCBjYXNlIG9mIFNlbWlkaXJlY3RJbnRlcm5hbCB3aGVuIHRoZSBhY3Rpb24gaXMgdHJpdmlhbFxuICAgICAqICgobV8yLCBtMSkgPT4gbTEpLiAgSW4gdGhpcyBjYXNlIHdlIGNhbiBvcHRpbWl6ZVxuICAgICAqIGJ5IG5vdCBrZWVwaW5nIHRoZSBoaXN0b3J5IG9yIGFjdGluZyBvbiBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEZvciB0aGlzIHRvIGJlIGEgQ3JkdCwgY29uY3VycmVudCBtZXNzYWdlcyBvZiB0aGUgdHdvIGlucHV0XG4gICAgICogQ3JkdHMgbXVzdCBjb21tdXRlLlxuICAgICAqXG4gICAgICogTm90ZSB0aGlzIGNvbnN0cnVjdGlvbiBpcyBzeW1tZXRyaWMgKHN3aXRjaGluZyBjcmR0MSBhbmRcbiAgICAgKiBjcmR0MiBkb2Vzbid0IGNoYW5nZSB0aGUgc2VtYW50aWNzKSwgZXhjZXB0IGZvciBzd2FwcGluZ1xuICAgICAqIHRoZSBtZWFuaW5nIG9mIHRoZSBudW1iZXJzIDEvMiBpbiBjcmVhdGVDcmR0SW5kZXggYW5kXG4gICAgICogaW4gdGhlIGZpcnN0IGNvb3JkaW5hdGVzIG9mIG1lc3NhZ2VzIGFuZCBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZWF0ZUNyZHRJbmRleCBXaGljaCBjcmR0J3MgY3JlYXRlIG1ldGhvZCB0byB1c2VcbiAgICAgKiBpbiBjcmVhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNyZHQxOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JkdDI6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjcmVhdGVDcmR0SW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoY3JlYXRlQ3JkdEluZGV4ICE9PSAxICYmIGNyZWF0ZUNyZHRJbmRleCAhPT0gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZWF0ZUNyZHRJbmRleCAobXVzdCBiZSAxIG9yIDIpOlwiICtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ3JkdEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNyZHRJbmRleCA9PT0gMSkgcmV0dXJuIHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtudW1iZXIsIGFueV0sIHN0YXRlOiBTLFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnkpOiBbbnVtYmVyLCBhbnldIHwgbnVsbCB7XG4gICAgICAgIGxldCBtZXNzYWdlOiBhbnk7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiBbb3BlcmF0aW9uWzBdLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS5cbiAgICAgKiBBbiBleGNlcHRpb24gaXMgaWYgdGhlIGRlc2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsXG4gICAgICogY3JkdCBpcyBudWxsLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKiBUT0RPOiBwZXJoYXBzIGFkZCB0cmFuc2xhdGluZyBkZXNjcmlwdGlvbnMgdG8gdGhpcyBjbGFzcywgc29cbiAgICAgKiB0aGUgQ3JkdCBkb2Vzbid0IGhhdmUgdG8gdW5kZXJzdGFuZCBhbGwgb2YgdGhlIGxheWVycyBhdFxuICAgICAqIG9uY2U/XG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtudW1iZXIsIGFueV0sIHN0YXRlOiBTLCByZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgW251bWJlciwgYW55XSB8IG51bGxdIHtcbiAgICAgICAgbGV0IHJlc3VsdDogW1MsIGFueV07XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbCkgcmV0dXJuIFtyZXN1bHRbMF0sIG51bGxdO1xuICAgICAgICBlbHNlIHJldHVybiBbcmVzdWx0WzBdLCBbbWVzc2FnZVswXSwgcmVzdWx0WzFdXV07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ3JkdFJ1bnRpbWUsIENhdXNhbFRpbWVzdGFtcCB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQgfSBmcm9tIFwiLi9yZXNldHRhYmxlXCI7XG5pbXBvcnQgeyBDb3VudGVySW50ZXJuYWwsIE11bHRSZWdpc3RlckludGVybmFsIH0gZnJvbSBcIi4vYmFzaWNfY3JkdHNcIjtcbmltcG9ydCB7IENyZHQsIENyZHRJbnRlcm5hbCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuaW1wb3J0IHsgU2VtaWRpcmVjdFN0YXRlLCBTZW1pZGlyZWN0SW50ZXJuYWwsIERpcmVjdEludGVybmFsIH0gZnJvbSBcIi4vc2VtaWRpcmVjdFwiO1xuXG5leHBvcnQgY2xhc3MgVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgQ3JkdDxTZW1pZGlyZWN0U3RhdGU8bnVtYmVyPj4ge1xuICAgIC8vIHNlbWlkaXJlY3RJbnN0YW5jZSBjb21wbGV0ZWx5IGRlc2NyaWJlcyB0aGlzIHNlbWlkaXJlY3QgcHJvZHVjdFxuICAgIHN0YXRpYyBzZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgU2VtaWRpcmVjdEludGVybmFsPG51bWJlcj4oXG4gICAgICAgIENvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsXG4gICAgICAgIChtMjogbnVtYmVyLCBtMTogbnVtYmVyKSA9PiBtMiptMSwgMVxuICAgICk7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSxuXSk7XG4gICAgfVxuICAgIG11bHQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMixuXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+KTogW3N0cmluZywgbnVtYmVyXSB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PFNlbWlkaXJlY3RTdGF0ZTxudW1iZXI+PiB7XG4gICAgc3RhdGljIHNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8bnVtYmVyPihcbiAgICAgICAgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSxcbiAgICAgICAgKG0yOiBudW1iZXIsIG0xOiBudW1iZXIpID0+IG0yKm0xLCAxXG4gICAgKTtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbnVtYmVyID0gMCwgcmVzZXRWYWx1ZTogbnVtYmVyID0gMCkge1xuICAgICAgICBzdXBlcihpZCwgSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcmVzZXRWYWx1ZSwgcnVudGltZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBuXSk7XG4gICAgfVxuICAgIG11bHQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1hZGQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5hZGQobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8W251bWJlciB8IHN0cmluZywgbnVtYmVyXT4pOiBbc3RyaW5nLCBudW1iZXJdIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vIFRyYW5zYWN0aW9uIGR1ZSB0byBzZXQgdmFsdWUsIHJldHVybiB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gICAgICAgICAgICByZXR1cm4gW1wic2V0XCIsIGRlc2NyaXB0aW9uc1sxXVsxXV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIHJldHVybiBbZGVzY3JpcHRpb25bMF0gYXMgc3RyaW5nLCB0aGlzLnZhbHVlXTsgLy8gcmVzZXRzXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3NpdGl2ZU1vZChhOiBudW1iZXIsIGI6IG51bWJlcikge1xuICAgIGlmIChhID49IDApIHJldHVybiBhICUgYjtcbiAgICBlbHNlIHJldHVybiBiIC0gKCgtYSkgJSBiKTtcbn1cblxuY2xhc3MgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8W251bWJlciwgYm9vbGVhbl0+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBbbnVtYmVyLCBib29sZWFuXSk6IFtudW1iZXIsIGJvb2xlYW5dIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhID09PSB1bmRlZmluZWQpIHJldHVybiBbMCwgZmFsc2VdO1xuICAgICAgICBlbHNlIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBbbnVtYmVyLCBib29sZWFuXSwgX3JlcGxpY2FJZDogYW55KSB7XG4gICAgICAgIHJldHVybiBwb3NpdGl2ZU1vZChvcGVyYXRpb24sIDIqTWF0aC5QSSk7XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBbbnVtYmVyLCBib29sZWFuXSwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbW251bWJlciwgYm9vbGVhbl0sIG51bWJlcl0ge1xuICAgICAgICByZXR1cm4gW1twb3NpdGl2ZU1vZChzdGF0ZVswXSArIG1lc3NhZ2UsIDIqTWF0aC5QSSksIHN0YXRlWzFdXSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbCgpO1xufVxuXG5jbGFzcyBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPFtudW1iZXIsIGJvb2xlYW5dPiB7XG4gICAgY3JlYXRlKF9pbml0aWFsRGF0YT86IFtudW1iZXIsIGJvb2xlYW5dKTogW251bWJlciwgYm9vbGVhbl0ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlZmxlY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICByZXR1cm4gXCJyZWZsZWN0XCI7XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBzdHJpbmcsIHN0YXRlOiBbbnVtYmVyLCBib29sZWFuXSwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbW251bWJlciwgYm9vbGVhbl0sIHN0cmluZ10ge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJyZWZsZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAvLyBSZWZsZWN0aW9uIG9wZXJhdGlvbiBpcyBtdWx0aXBseWluZyBvbiB0aGUgbGVmdCxcbiAgICAgICAgLy8gc28gdG8gcHV0IGl0IGluIGNhbm9uaWNhbCBmb3JtIChnMSwgZzIpLCB3ZSBoYXZlIHRvXG4gICAgICAgIC8vIGNvbW11dGUgaXQgd2l0aCB0aGUgY3VycmVudCBnMSAocm90YXRpb24pIHZhbHVlIGJ5XG4gICAgICAgIC8vIGFjdGluZyBvbiBpdC5cbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2QoLXN0YXRlWzBdLCAyKk1hdGguUEkpLCAhc3RhdGVbMV1dLCBcInJlZmxlY3RcIl07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsKCk7XG59XG5cbi8qKlxuICogQ3JkdCBmb3IgdGhlIDItZGltZW5zaW9uYWwgb3J0aG9nb25hbCBncm91cCwgd2hpY2ggYWxsb3dzXG4gKiByb3RhdGlvbnMgYW5kIHJlZmxlY3Rpb25zIChhYm91dCB0aGUgb3JpZ2luKSBvZiBhbiBvYmplY3QgaW4gdGhlXG4gKiBwbGFuZS4gIEV4YW1wbGUgdXNhZ2U6IHJvdGF0aW5nIGFuZCByZWZsZWN0aW5nIG9iamVjdHMgaW5cbiAqIFBvd2VycG9pbnQuXG4gKlxuICogU3RhdGUgaXMgc3RvcmVkIGFzIHRoZSBjYW5vbmljYWwgZWxlbWVudCBvZiB0aGUgc2VtaWRpcmVjdFxuICogcHJvZHVjdCBncm91cCwgaS5lLiwgaW4gdGhlIGZvcm0gKGcxLCBnMikgZm9yIGcxIGluIHRoZSByb3RhdGlvblxuICogZ3JvdXAgKHJlYWxzIG1vZCAycGkpIGFuZCBnMiBpbiB0aGUgcmVmbGVjdGlvbiBncm91cCAoYm9vbGVhbnNcbiAqIHdpdGggdHJ1ZSBmb3IgMSBhbmQgZmFsc2UgZm9yIDApLlxuICovXG5leHBvcnQgY2xhc3MgT3J0aG9nb25hbENyZHQgZXh0ZW5kcyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ8U2VtaWRpcmVjdFN0YXRlPFtudW1iZXIsIGJvb2xlYW5dPj4ge1xuICAgIHN0YXRpYyBzZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgU2VtaWRpcmVjdEludGVybmFsPFtudW1iZXIsIGJvb2xlYW5dPihcbiAgICAgICAgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwuaW5zdGFuY2UsIE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwuaW5zdGFuY2UsXG4gICAgICAgIChfbTI6IHN0cmluZywgbTE6IG51bWJlcikgPT4gLW0xLCAxXG4gICAgKTtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogW251bWJlciwgYm9vbGVhbl0gPSBbMCwgZmFsc2VdLFxuICAgICAgICAgICAgcmVzZXRWYWx1ZTogW251bWJlciwgYm9vbGVhbl0gPSBbMCwgZmFsc2VdKSB7XG4gICAgICAgIHN1cGVyKGlkLCBPcnRob2dvbmFsQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJlc2V0VmFsdWUsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuZ2xlIGlzIGluIHJhZGlhbnMgQ0NXLlxuICAgICAqL1xuICAgIHJvdGF0ZShhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgYW5nbGVdKTtcbiAgICB9XG4gICAgcmVmbGVjdEhvcml6b250YWxBeGlzKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIFwicmVmbGVjdFwiXSk7XG4gICAgfVxuICAgIHJlZmxlY3RWZXJ0aWNhbEF4aXMoKSB7XG4gICAgICAgIHRoaXMucmVmbGVjdChNYXRoLlBJLzIpO1xuICAgIH1cbiAgICByZWZsZWN0KGFuZ2xlQXhpczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJvdGF0ZSgtYW5nbGVBeGlzKTtcbiAgICAgICAgdGhpcy5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoYW5nbGVBeGlzKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAqIGlmIHJlZmxlY3RlZCBpcyB0cnVlLCB0aGVuIHJvdGF0ZSBieSBhbmdsZSAoQ0NXLCBpbiByYWRpYW5zKS5cbiAgICAgKi9cbiAgICAgZ2V0IHJlZmxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMV07XG4gICAgIH1cbiAgICAgLyoqXG4gICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIGlzIGdpdmVuIGJ5OiByZWZsZWN0IGFjcm9zcyB0aGUgeC1heGlzXG4gICAgICAqIGlmIHJlZmxlY3RlZCBpcyB0cnVlLCB0aGVuIHJvdGF0ZSBieSBhbmdsZSAoQ0NXLCBpbiByYWRpYW5zKS5cbiAgICAgICovXG4gICAgIGdldCBhbmdsZSgpOiBudW1iZXIge1xuICAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZVswXTtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogW3JlZmxlY3RlZCwgYW5nbGVdXG4gICAgICAqL1xuICAgICBnZXQgdmFsdWUoKTogW251bWJlciwgYm9vbGVhbl0ge1xuICAgICAgICAgcmV0dXJuIFt0aGlzLmFuZ2xlLCB0aGlzLnJlZmxlY3RlZF07XG4gICAgIH1cbiAgICAgLyoqXG4gICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1zZXQuXG4gICAgICAqL1xuICAgICBzZXQgdmFsdWUobmV3VmFsdWU6IFtudW1iZXIsIGJvb2xlYW5dKSB7XG4gICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgIHRoaXMucm90YXRlKG5ld1ZhbHVlWzBdKTtcbiAgICAgICAgIGlmIChuZXdWYWx1ZVsxXSkgdGhpcy5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgfVxuICAgICAvLyBUT0RPOiBtYXRyaXggdmVyc2lvbnMgb2YgZ2V0IGFuZCBzZXQuXG4gICAgIC8vIC8qKlxuICAgICAvLyAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHRyYW5zZm9ybWF0aW9uIGFzIGEgMngyIG9ydGhvZ29uYWxcbiAgICAgLy8gICogbWF0cml4LlxuICAgICAvLyAgKi9cbiAgICAgLy8gZ2V0IG1hdHJpeCgpOiBbW251bWJlciwgbnVtYmVyXSwgW251bWJlciwgbnVtYmVyXV0ge1xuICAgICAvL1xuICAgICAvLyB9XG5cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShfZGVzY3JpcHRpb25zOiBBcnJheTxbbnVtYmVyIHwgc3RyaW5nLCBudW1iZXJdPikge1xuICAgICAgICAvLyBUT0RPLiAgSnVzdCByZXR1cm5zIHRoZSByZXN1bHRpbmcgc3RhdGUgZm9yIG5vdy5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIC8vICAgICAvLyBUcmFuc2FjdGlvbiBkdWUgdG8gc2V0IHZhbHVlLCByZXR1cm4gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICAgICAgICAvLyAgICAgcmV0dXJuIFtcInNldFwiLCBkZXNjcmlwdGlvbnNbMV1bMV1dO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgLy8gaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgLy8gZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgLy8gZWxzZSByZXR1cm4gW2Rlc2NyaXB0aW9uWzBdIGFzIHN0cmluZywgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmR0SW50ZXJuYWwgd2hpY2ggdXNlcyBhbnkgc3RyaW5nIGFzIGFuIG9wZXJhdGlvbi9tZXNzYWdlXG4gKiB3aGljaCBkb2VzIG5vdGhpbmcuICBVbmxpa2UgdXNpbmcgbnVsbCBtZXNzYWdlcyB0byBpbmRpY2F0ZSB0aGF0XG4gKiBub3RoaW5nIGhhcHBlbmVkLCB0aGUgbm9vcCBtZXNzYWdlIGlzIGFuIGV4cGxpY2l0IG5vbi1udWxsXG4gKiBzdHJpbmcgc3VwcGxpZWQgYXMgdGhlIG9wZXJhdGlvbi5cbiAqXG4gKiBUd28gdXNlIGNhc2VzOlxuICogLSBUbyB1bnJlc2V0IGEgc3RhdGUgKGUuZy4gaW4gRW5hYmxlV2luc0ZsYWcgYmVsb3cpLlxuICogLSBBcyBhIFwiaGVhZGVyXCIgZm9yIHNlcXVlbmNlIG9mIG9wZXJhdGlvbnMgcGFzc2VkIHRvIGFwcGx5T3BzLFxuICogc28gdGhhdCByZWNpcGllbnRzIGNhbiBrbm93IHdoYXQgZW5kLXVzZXIgb3BlcmF0aW9uIHRoZSBzZXF1ZW5jZVxuICogY29ycmVzcG9uZHMgdG8uXG4gKi9cbmV4cG9ydCBjbGFzcyBOb09wQ3JkdEludGVybmFsPFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFM+IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY3JlYXRlRnVuYz86IChpbml0aWFsRGF0YTogYW55KSA9PiBTKSB7fVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFMge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVGdW5jKSByZXR1cm4gdGhpcy5jcmVhdGVGdW5jKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJDcmVhdGVGdW5jIG5vdCBzdXBwbGllZFwiKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IHN0cmluZywgX3N0YXRlOiBTKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyB0aGUgb3JpZ2luYWwgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBzdHJpbmcsIHN0YXRlOiBTLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBzdHJpbmddIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFRvPFM+KG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+KSB7XG4gICAgICAgIHJldHVybiBuZXcgRGlyZWN0SW50ZXJuYWw8Uz4ob3JpZ2luYWxDcmR0LFxuICAgICAgICAgICAgbmV3IE5vT3BDcmR0SW50ZXJuYWw8Uz4oKSwgMVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVuYWJsZVdpbnNGbGFnIGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PG51bGw+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSkge1xuICAgICAgICBzdXBlcihpZCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKCkgPT4gbnVsbCksIG51bGwsXG4gICAgICAgICAgICBydW50aW1lLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChcImVcIik7XG4gICAgfVxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZGlzYWJsZVN0cm9uZygpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0cm9uZygpO1xuICAgIH1cbiAgICBnZXQgZW5hYmxlZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCk7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgZWxzZSB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZG9pbmcgYSByZXNldCBiZWZvcmUgc2V0dGluZ1xuICAgICAgICAvLyB0byBuZXdWYWx1ZSwgaW4gZWl0aGVyIGNhc2UsIHNpbmNlIGFueSBtZXNzYWdlIG9idmlhdGVzXG4gICAgICAgIC8vIGNhdXNhbGx5IGxlc3NlciBtZXNzYWdlcy5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIFRPRE86IHdvdWxkIGFsc28gbGlrZSB0byB0cmFuc2xhdGUgb2JzZXJ2ZWQtcmVzZXRzIHRvXG4gICAgLy8gZGlzYWJsZSAoYnV0IG9ubHkgaWYgaXQgYWN0dWFsbHkgd29ya2VkKS4gIFBlcmhhcHMgYWRkIG5vb3AgaW5kaWNhdG9yIG91dCBmcm9udD9cbiAgICAvLyAoTmVlZCB0byBhZGQgYSBuby1vcCBjcmR0IGF0IHRoZSB0b3AgbGV2ZWwpXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdID09PSBcImVcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEaXNhYmxlV2luc0ZsYWcgZXh0ZW5kcyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ8bnVsbD4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCxcbiAgICAgICAgICAgIHJ1bnRpbWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBlbmFibGVTdHJvbmcoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTdHJvbmcoKTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFwiZFwiKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCk7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgZWxzZSB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZG9pbmcgYSByZXNldCBiZWZvcmUgc2V0dGluZ1xuICAgICAgICAvLyB0byBuZXdWYWx1ZSwgaW4gZWl0aGVyIGNhc2UsIHNpbmNlIGFueSBtZXNzYWdlIG9idmlhdGVzXG4gICAgICAgIC8vIGNhdXNhbGx5IGxlc3NlciBtZXNzYWdlcy5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIFRPRE86IHdvdWxkIGFsc28gbGlrZSB0byB0cmFuc2xhdGUgb2JzZXJ2ZWQtcmVzZXRzIHRvXG4gICAgLy8gZW5hYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlU3Ryb25nXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb25zOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVzY3JpcHRpb25zKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBHTWFwSW50ZXJuYWw8SywgQyBleHRlbmRzIENyZHQ8YW55Pj4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8TWFwPEssIEM+PiB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSB2YWx1ZUNyZHRJbnRlcm5hbCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHNob3VsZEdjIEdpdmVuIGEgdmFsdWUgc3RhdGUsIHJldHVybiB3aGV0aGVyIGl0IGlzIHNhZmVcbiAgICAgKiB0byBnYXJiYWdlIGNvbGxlY3QgaXQsIHJlbW92aW5nIGl0cyBrZXktdmFsdWUgcGFpciBmcm9tIHRoZVxuICAgICAqIG1hcC4gIEZvciBjb3JyZWN0bmVzcywgaWYgc2hvdWxkR2ModmFsdWVTdGF0ZSkgaXMgdHJ1ZSwgdGhlblxuICAgICAqIHZhbHVlU3RhdGUgbXVzdCBiZSBpZGVudGljYWwgdG8gdmFsdWVDcmR0SW50ZXJuYWwuY3JlYXRlKHZhbHVlSW5pdGlhbERhdGEpO1xuICAgICAqIGFuZCBpZiBzaG91bGRHYyBpcyBub250cml2aWFsLCB0aGVuIHVzZXJzIHNob3VsZCBrZWVwIGluXG4gICAgICogbWluZCB0aGF0IHN0YXRlLmhhcyhrZXkpIGlzIG5vdCByZWxpYWJsZSwgc2luY2UgaXQgbWF5IGJlXG4gICAgICogZmFsc2UgZXZlbiBhZnRlciBrZXkgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgYmVjYXVzZSB0aGUgdmFsdWVcbiAgICAgKiBoYXMgYmVlbiBnYXJiYWdlIGNvbGxlY3RlZC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgc2hvdWxkR2M6ICh2YWx1ZVN0YXRlOiBDKSA9PiBib29sZWFuID0gKCgpID0+IGZhbHNlKSkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUT0RPLiAgTmVlZHMgdG8gYmUgc2V0LiAgQWxsb3cgaXQgdG8gYmUgc2V0IG91dHNpZGUgY29uc3RydWN0b3JcbiAgICAgKiBiZWNhdXNlIENyZHRPYmplY3QgbmVlZHMgdG8gY2FsbCBzdXBlciBiZWZvcmUgaXQgY2FuIHNldCB0aGlzLlxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0RmFjdG9yeSE6IChrZXk6IEspID0+IEM7XG4gICAgY3JlYXRlKF9pbml0aWFsRGF0YT86IGFueSk6IE1hcDxLLCBDPiB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwPEssIEM+KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnM6XG4gICAgICogLSBbXCJhcHBseVwiLCBrZXksIEMgbWVzc2FnZV06IGFwcGxpZXMgdGhlIEMgbWVzc2FnZSB0b1xuICAgICAqIHRoZSBnaXZlbiBrZXksIGluaXRpYWxpemluZyB0aGUga2V5IGlmIG5lZWRlZC5cbiAgICAgKiAtIFtcImFwcGx5U2tpcFwiLCBrZXksIEMgbWVzc2FnZV06IGFwcGxpZXMgdGhlIEMgbWVzc2FnZSB0b1xuICAgICAqIHRoZSBnaXZlbiBrZXksIGV4Y2VwdCBmb3IgdGhlaXIgc2VuZGVyLCB3aG8gaXMgYXNzdW1lZFxuICAgICAqIHRvIGhhdmUgYWxyZWFkeSBhcHBsaWVkIHRoZSBtZXNzYWdlLiAgVGhpcyBpcyB1c2VkIGJ5XG4gICAgICogQ3JkdFZhbHVlZEdyb3dPbmx5TWFwSW50ZXJuYWwsIHdob3NlIG1lc3NhZ2VzIGFyZVxuICAgICAqIHNvbWV0aW1lcyBkZXJpdmVkIGZyb20gdmFsdWVzIGFwcGx5aW5nIG1lc3NhZ2VzIHRvXG4gICAgICogdGhlbXNlbHZlcy4gIFRPRE86IGluIHByaW5jaXBsZSBjYW4gb3B0aW1pemUgc28gd2VcbiAgICAgKiBkb24ndCBoYXZlIHRvIHNlbmQgXCJza2lwXCIgb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiAtIFtcImluaXRcIiwga2V5XTogaW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGtleSB1c2luZyBpbml0RmFjdG9yeVxuICAgICAqIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQgaW4gdGhlIG1hcC5cbiAgICAgKiAtIFtcInJlc2V0XCJdOiByZXNldHMgZXZlcnkgdmFsdWUgaW4gdGhlIG1hcCAodXNpbmdcbiAgICAgKiBlYWNoIHZhbHVlJ3MgZ2V0VW5pdmVyc2FsUmVzZXRPcGVyYXRpb24oKSkuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtzdHJpbmcsIEssIGFueV0sIHN0YXRlOiBNYXA8SywgQz4sIF9yZXBsaWNhSWQ6IGFueSk6IFtzdHJpbmcsIEs/LCBhbnk/XSB7XG4gICAgICAgIGxldCBrZXkgPSBvcGVyYXRpb25bMV07XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlcIiwga2V5LCBvcGVyYXRpb25bMl1dO1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5U2tpcFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJhcHBseVNraXBcIiwga2V5LCBvcGVyYXRpb25bMl1dO1xuICAgICAgICAgICAgY2FzZSBcImluaXRcIjpcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmhhcyhrZXkpKSByZXR1cm4gW1wiaW5pdFwiLCBrZXldO1xuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6IHJldHVybiBbXCJyZXNldFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbiBhZGRpdGlvbiB0byB0aGUgbWVzc2FnZSBvdXRwdXQgYnkgcHJlcGFyZSwgd2UgaGF2ZVxuICAgICAqIG1lc3NhZ2VzIChhcmlzaW5nIHRocm91Z2ggc2VtZGlyZWN0IHByb2R1Y3QpOlxuICAgICAqIC0gW1wiaW5pdFJlc2V0XCIsIGtleV06IGRvZXMgW1wiaW5pdFwiLCBrZXldIGZvbGxvd2VkIGJ5XG4gICAgICogZGVsaXZlcmluZyBhIHJlc2V0IG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKiAtIFtcImluaXRSZXNldFN0cm9uZ1wiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZFxuICAgICAqIGJ5IGRlbGl2ZXJpbmcgYSByZXNldC1zdHJvbmcgbWVzc2FnZSB0byB0aGUga2V5LlxuICAgICAqXG4gICAgICogRGVzY3JpcHRpb24gZm9ybWF0OlxuICAgICAqIC0gZm9yIGFuIGFwcGx5L2FwcGx5U2tpcCBvcGVyYXRpb246XG4gICAgICogbnVsbCAoVE9ETylcbiAgICAgKiAtIGZvciBhbiBpbml0IG9wZXJhdGlvbjogbnVsbCBpZiB0aGUga2V5IGFscmVhZHkgZXhpc3RlZCxcbiAgICAgKiBvdGhlcndpc2UgW1wiaW5pdFwiLCBrZXldXG4gICAgICogLSBmb3IgYSByZXNldCBvcGVyYXRpb246IFtcInJlc2V0XCJdIChUT0RPOiBkZXNjcmlwdGlvbnMgZnJvbVxuICAgICAqIHJlc2V0IGtleXMpXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtzdHJpbmcsIEssIGFueT9dLCBzdGF0ZTogTWFwPEssIEM+LFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTpcbiAgICAgICAgICAgIFtNYXA8SywgQz4sIFtzdHJpbmcsIEs/LCBhbnk/XSB8IG51bGxdIHtcbiAgICAgICAgbGV0IGtleSA9IG1lc3NhZ2VbMV07XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5U2tpcFwiOlxuICAgICAgICAgICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHRpbWVzdGFtcC5nZXRTZW5kZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGFwcGx5aW5nIGl0IHRvIHRoZSBzdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuIHN0aWxsIGdjLCB0aG91Z2gsIGluIGNhc2UgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGFscmVhZHktYXBwbGllZCBtZXNzYWdlIGhhcyBtYWRlIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGdjLWFibGUuXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlTdGF0ZSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5U3RhdGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkR2Moa2V5U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGZhbGwgdGhyb3VnaC5cbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOntcbiAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5U3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5U3RhdGUucmVjZWl2ZShtZXNzYWdlWzJdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07fVxuICAgICAgICAgICAgY2FzZSBcImluaXRcIjpcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaGFzKGtleSkpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdFN0YXRlID0gdGhpcy5pbml0RmFjdG9yeShrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvdWxkR2MoaW5pdFN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2V0KGtleSwgaW5pdFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbXCJpbml0XCIsIGtleV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHN0YXRlLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzZXRNZXNzYWdlID0gZW50cnlbMV0uZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNldE1lc3NhZ2UgIT09IG51bGwpIGVudHJ5WzFdLnJlY2VpdmUoW3Jlc2V0TWVzc2FnZV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZEdjKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGVudHJ5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbXCJyZXNldFwiXV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKipcbiAqIENvbnZlbmllbnQgcmVwcmVzZW50YXRpb24gb2YgYSBDcmR0LXZhbHVlZCBncm93LW9ubHkgbWFwLlxuICpcbiAqIFRPRE86IFNvbWV3aGVyZTogbm90ZSB0aGF0IGluaXRpYWwgdmFsdWVzIG9mIHByb3BlcnRpZXMgbXVzdCBiZVxuICogYSBmdW5jdGlvbiBvZiB0aGVpciBrZXkgb25seSAoc28gY2FuJ3QgaGF2ZSB2YXJ5aW5nIHR5cGVzIG9yXG4gKiBpbml0aWFsIGRhdGEpLlxuICpcbiAqIE4gaXMgdGhlIHR5cGUgb2YgbWVtYmVyIG5hbWVzICh0eXBpY2FsbHkgc3RyaW5nKS5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHRPYmplY3Q8TiwgQyBleHRlbmRzIENyZHQ8YW55Pj4gZXh0ZW5kcyBDcmR0PE1hcDxOLCBDPj4gaW1wbGVtZW50cyBDcmR0UnVudGltZSB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0eUZhY3RvcnkgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR5bmFtaWNhbGx5IGNyZWF0ZWQgcHJvcGVydGllcyBhcmUgb25seSBcIiArXG4gICAgICAgICAgICAgICAgXCJhbGxvd2VkIGlmIHByb3BlcnR5RmFjdG9yeSBpcyBwYXNzZWQgdG8gdGhlIFwiICtcbiAgICAgICAgICAgICAgICBcIkNyZHRPYmplY3QgY29uc3RydWN0b3JcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUT0RPOiBwcmVkZWZpbmVkIHZzIGR5bmFtaWMgcHJvcGVydHkgY3JlYXRpb24uICBQcmVkZWZpbmVkIG9uZXNcbiAgICAgKiBoYXZlIHRvIGJlIGNyZWF0ZWQgaWRlbnRpY2FsbHkgb24gYWxsIHJlcGxpY2FzIGluXG4gICAgICogYmV0d2VlbiBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkgYW5kXG4gICAgICogZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSwgaWRlYWxseSBpbiB0aGUgY29uc3RydWN0b3IuIFRoZXlcbiAgICAgKiBhcmUgbm90IHN5bmNlZCAoZm9yIGVmZmljaWVuY3kgYW5kIHRvIHNhdmUgdGhlIHRyb3VibGVcbiAgICAgKiBvZiBzcGVjaWZ5aW5nIHByb3BlcnR5RmFjdG9yeSkuICBEeW5hbWljIHByb3BlcnRpZXNcbiAgICAgKiBjYW4gb25seSBiZSBjcmVhdGVkIHRocm91Z2ggaW5pdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUZhY3RvcnkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLFxuICAgICAgICAgICAgcHJvcGVydHlGYWN0b3J5OiAobmFtZTogTiwgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT4gQ1xuICAgICAgICAgICAgPSBDcmR0T2JqZWN0LmRlZmF1bHRQcm9wZXJ0eUZhY3RvcnkpIHtcbiAgICAgICAgLy8gVE9ETzogZ2MgYWJpbGl0eVxuICAgICAgICBsZXQgY3JkdEludGVybmFsID0gbmV3IEdNYXBJbnRlcm5hbDxOLCBDPigpO1xuICAgICAgICBzdXBlcihpZCwgY3JkdEludGVybmFsLCBydW50aW1lKTtcbiAgICAgICAgY3JkdEludGVybmFsLmluaXRGYWN0b3J5ID0gKGtleTogTikgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbkluaXQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHByb3BlcnR5RmFjdG9yeShrZXksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluSW5pdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbjogYm9vbGVhbjtcbiAgICBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHByaXZhdGUgaW5Jbml0OiBib29sZWFuO1xuICAgIHJlZ2lzdGVyKGNyZHQ6IEMsIG5hbWU6IE4pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uIHx8IHRoaXMuaW5Jbml0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvcGVydGllcyBjYW4gb25seSBiZSBkaXJlY3RseSBcIiArXG4gICAgICAgICAgICAgICAgXCJyZWdpc3RlcmVkIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIFwiICtcbiAgICAgICAgICAgICAgICBcImFuZCBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpLiAgRHluYW1pYyBwcm9wZXJ0aWVzIFwiICtcbiAgICAgICAgICAgICAgICBcIm11c3QgYmUgY3JlYXRlZCB3aXRoIGluaXQobmFtZSkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIHByb3BlcnR5IG5hbWU6IFwiICsgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5zZXQobmFtZSwgY3JkdCk7XG4gICAgICAgIC8vIFNraXAgc2VuZGluZyBhbiBpbml0IG1lc3NhZ2UgYWJvdXQgaXQuICBPa2F5IGJlY2F1c2Ugb2YgdGhlXG4gICAgICAgIC8vIHByZWRlZmluZWQgaW5pdGlhbGl6YXRpb24gY29udHJhY3QuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgbmFtZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgIFRoZSBpbml0aWFsaXplZCBDcmR0LlxuICAgICAqL1xuICAgIGluaXRQcm9wZXJ0eShuYW1lOiBOKTogQyB7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlPcChbXCJpbml0XCIsIG5hbWVdKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKSBhcyBDO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AodGhpcy5nZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cblxuICAgIGdldFByb3BlcnR5KG5hbWU6IE4pOiBDIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgIH1cbiAgICBwcm9wZXJ0eU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5rZXlzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZXMoKTtcbiAgICB9XG4gICAgcHJvcGVydHlFbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5lbnRyaWVzKCk7XG4gICAgfVxuXG4gICAgc2VuZChtZXNzYWdlOiBhbnksIG5hbWU6IE4pOiB2b2lkIHtcbiAgICAgICAgLy8gQ29udmVydCBpbnRvIGFuIGFwcGx5U2tpcCBtZXNzYWdlIGZvciB0aGUgbWFwIHZhbHVlXG4gICAgICAgIC8vIGF0IG5hbWUuICBIZXJlIHdlIHdhbnQgdG8gc2tpcCBiZWNhdXNlXG4gICAgICAgIC8vIG91ciByZXBsaWNhJ3MgdmFsdWUgaGFzIGFscmVhZHkgYXBwbGllZCB0aGVcbiAgICAgICAgLy8gb3BlcmF0aW9uIGludGVybmFsbHkuXG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJhcHBseVNraXBcIiwgbmFtZSwgbWVzc2FnZV0pO1xuICAgIH1cblxuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKTtcbiAgICB9XG4gICAgZ2V0TmV4dFRpbWVzdGFtcChfY3JkdElkOiBhbnkpOiBDYXVzYWxUaW1lc3RhbXAge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWRkV2luc1NldDxUPiBleHRlbmRzIENyZHRPYmplY3Q8VCwgRW5hYmxlV2luc0ZsYWc+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgZ2Mgb25jZSB3ZSBoYXZlIHRyYW5zYWN0aW9uc1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSwgKG5hbWU6IFQsIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+XG4gICAgICAgICAgICAgICAgbmV3IEVuYWJsZVdpbnNGbGFnKG5hbWUsIGludGVybmFsUnVudGltZSkpO1xuICAgIH1cbiAgICBhZGQodmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMuaW5pdFByb3BlcnR5KHZhbHVlKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBkZWxldGUodmFsdWU6IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgKHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpIGFzIEVuYWJsZVdpbnNGbGFnKS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKHZhbHVlOiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICh0aGlzLmdldFByb3BlcnR5KHZhbHVlKSBhcyBFbmFibGVXaW5zRmxhZykucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXModmFsdWU6IFQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmxhZyA9IHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVGbGFnID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVGbGFnLmVuYWJsZWQ7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpOiBTZXQ8VD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNldDxUPigpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnByb3BlcnR5RW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoZW50cnlbMV0uZW5hYmxlZCkgcmVzdWx0LmFkZChlbnRyeVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBTZXQ8VD4pIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIC8vIFRPRE86IG9uY2UgaXQncyBnYydkIHdlIGNhbiBqdXN0IHVzZSB0aGlzLnN0YXRlLmtleXMoKVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS52YWx1ZXMoKTtcbiAgICB9XG4gICAgLy8gVE9ETzogb3RoZXIgc2V0IHByb3BlcnRpZXMgKGUuZy4gc3ltYm9sIGl0ZXJhdG9yKVxuICAgIC8vIFRPRE86IGNhcHR1cmluZyBhbmQgdHJhbnNsYXRpbmcgZGVzY3JpcHRpb25zXG59XG5cbmV4cG9ydCBjbGFzcyBNYXBDcmR0PEssIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIEFkZFdpbnNTZXQ8Sz4gfCBDcmR0T2JqZWN0PEssIEM+PiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBrZXlTZXQ6IEFkZFdpbnNTZXQ8Sz47XG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWx1ZU1hcDogQ3JkdE9iamVjdDxLLCBDPjtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIHZhbHVlRmFjdG9yeTogKGtleTogSywgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT4gQykge1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmtleVNldCA9IG5ldyBBZGRXaW5zU2V0KFwia2V5U2V0XCIsIHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlTWFwID0gbmV3IENyZHRPYmplY3QoXCJ2YWx1ZU1hcFwiLCB0aGlzLCB2YWx1ZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsYWcgaW5kaWNhdGluZyB0aGF0IHdlIGFyZSBpbiB0aGUgYm9keSBvZiBhIGRlbGV0ZS9cbiAgICAgKiBkZWxldGVTdHJvbmcgY2FsbCwgaGVuY2Ugd2Ugc2hvdWxkIG5vdCBhZGQgdGhpbmdzXG4gICAgICogdG8ga2V5U2V0IChhcyBhbiBvcHRpbWl6YXRpb24pLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5EZWxldGUgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBDcmR0T2JqZWN0LnNlbmQgc28gdGhhdCB3ZSBjYW4gY2FwdHVyZVxuICAgICAqIGEgc2VuZCBieSBhIHZhbHVlTWFwIHZhbHVlIGFuZCBmb2xsb3cgaXQgdXAgd2l0aFxuICAgICAqIGFuIGFkZCB0byBrZXlTZXQsIHRodXMgcmV2aXZpbmcgdGhlIHZhbHVlJ3Mga2V5XG4gICAgICogaWYgYXBwcm9wcmlhdGUuXG4gICAgICpcbiAgICAgKiBUT0RPOiBza2lwIGFkZGluZyB0aGUga2V5IGlmIGl0J3MgYSByZXNldCBtZXNzYWdlP1xuICAgICAqIE5vdCBzdXJlIGlmIHRoaXMgaXMgcG9zc2libGUgaW4gZ2VuZXJhbC4gIEJ1dCBzaG91bGQgYXRcbiAgICAgKiBsZWFzdCBiZSBwb3NzaWJsZSBmb3Igb3VyIG93biBkZWxldGVzLlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZTogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2VuZChtZXNzYWdlLCBuYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlICYmIG5hbWUgPT09IFwidmFsdWVNYXBcIikge1xuICAgICAgICAgICAgLy8gVE9ETzogZG8gdGhpcyByZWNlaXZlciBzaWRlIGluc3RlYWQsIGZvciBuZXR3b3JrIGVmZmljaWVuY3k/XG4gICAgICAgICAgICAvLyBXb3VsZCBuZWVkIHRvIHBsYWNlIHRoZSBhZGQgZmlyc3QsIHNvIHRoYXQgaXQgY2FuXG4gICAgICAgICAgICAvLyBiZSBvdmVycmlkZGVuIGJ5IGFueSBpbmNsdWRlZCBkZWxldGVzLlxuICAgICAgICAgICAgLy8gV291bGQgYWxzbyBuZWVkIHRvIGFjY291bnQgZm9yIHBvc3NpYmlsaXR5IG9mXG4gICAgICAgICAgICAvLyB0cmFuc2FjdGlvbnMuXG4gICAgICAgICAgICAvLyBBbHNvLCBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSAoc2VuZGVyKSBkbyBpdCB0b28uXG4gICAgICAgICAgICBmb3IgKGxldCBzdWJtZXNzYWdlIG9mIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VibWVzc2FnZVswXSA9PT0gXCJhcHBseVNraXBcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gc3VibWVzc2FnZVsxXSBhcyBLO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdChrZXk6IEspOiBDIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSkgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnZhbHVlTWFwLmluaXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhhcyhrZXk6IEspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5OiBLKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSByZXR1cm4gdGhpcy52YWx1ZU1hcC5nZXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGRlbGV0ZShrZXk6IEspIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAodGhpcy5nZXQoa2V5KSBhcyBDKS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKGtleTogSykge1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0KGtleSkucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlU3Ryb25nKGtleSk7XG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LnZhbHVlcygpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG90aGVyIG1hcCBtZXRob2RzIChlLmcuIHN5bWJvbCBpdGVyYXRvcilcbiAgICAvLyBUT0RPOiBzdHJvbmctcmVzZXRcbiAgICAvLyBUT0RPOiBwcmVzZXJ2ZS1zdGF0ZSBkZWxldGUsIHJlc2V0P1xufVxuIiwicmVxdWlyZSgnLi4vdGVzdC90ZXN0Jyk7IC8vIHJ1biB0ZXN0LnRzXG5cbmltcG9ydCB7IENvdW50ZXJDcmR0IH0gZnJvbSBcIi4uL3NyYy9jcmR0cy9iYXNpY19jcmR0c1wiO1xuaW1wb3J0IHsgQ3JkdE5ldHdvcmtSdW50aW1lIH0gZnJvbSAnLi4vc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUnO1xuXG4vKipcbiAqIEdldCBIZXJva3Ugc2VydmVyIGhvc3QgV2Vic29ja2V0LlxuICovXG52YXIgSE9TVCA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpXG5cbi8qKlxuICogQ3JlYXRlIENSRFRzIChlLmcuIENvdW50ZXJDcmR0KS5cbiAqL1xubGV0IGNsaWVudCA9IG5ldyBDcmR0TmV0d29ya1J1bnRpbWUoXCJjbGllbnRcIiwgSE9TVCk7XG5sZXQgY2xpZW50Q291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBjbGllbnQpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgb25jaGFuZ2UoKSBmb3IgQ1JEVCBhcyByZWZyZXNoIHRoZSB2YWx1ZSAqL1xuY2xpZW50Q291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiB7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpfSk7XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgaW5jcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpbmNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgZGVjcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBkZWNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoLTEwMCk7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufVxuXG4vLyAvKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIHN5bmMgdG8gc3luY2hyb25pemUgdGhlIHZhbHVlICovXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5bmNcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbi8vICAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG4vLyB9XG4iLCJpbXBvcnQgeyBDcmR0UnVudGltZSwgQ2F1c2FsVGltZXN0YW1wIH0gZnJvbSAnLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZSc7XG5pbXBvcnQgeyBDcmR0TWVzc2FnZUxpc3RlbmVyIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFZlY3RvckNsb2NrIH0gZnJvbSAnLi92ZWN0b3JfY2xvY2snO1xuLy8gaW1wb3J0IFdlYlNvY2tldCA9IHJlcXVpcmUoXCJ3c1wiKTtcblxuLy8gVGhlIGNhc3VhbCBicm9hZGNhc3QgbmV0d29yayBkZXNpZ25lZCBmb3IgYSB0d28td2F5IGludGVyYWN0aXZlXG4vLyBjb21tdW5pY2F0aW9uIHNlc3Npb24gYmV0d2VlbiB1c2VyIGFuZCBzZXJ2ZXIgdXNpbmcgV2ViU29ja2V0IEFQSS5cbi8vXG4vLyBBbHNvIGVuc3VyZSB0aGUgb3JkZXIgb2YgZGVsaXZlcnkgd2l0aCBjYXN1YWxpdHkgY2hlY2suXG5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5leHBvcnQgY2xhc3MgbXlNZXNzYWdlIHtcbiAgICAvKipcbiAgICAgKiBDcmR0IHVwZGF0ZSBtZXNzYWdlLlxuICAgICAqL1xuICAgIG1lc3NhZ2UgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIGNyZHRJZCBmb3IgaWRlbnRpZmljYXRpb24uXG4gICAgICovXG4gICAgY3JkdElkIDogYW55O1xuICAgIC8qKlxuICAgICAqIFRpbWVzdGFtcCBmb3IgY2FzdWFsaXR5L2NvbmN1cnJlbmN5IGNoZWNrLlxuICAgICAqXG4gICAgICogUHJvdmlkZSBiYXNpYyBmdW5jdGlvbnMgc3VjaCBhcyA6XG4gICAgICogZ2V0U2VuZGVyKCkgLyBnZXRTZW5kZXJDb3VudGVyKCkgLyBhc1ZlY3RvckNsb2NrKCkuXG4gICAgICovXG4gICAgdGltZXN0YW1wIDogVmVjdG9yQ2xvY2s7XG5cbiAgICBjb25zdHJ1Y3RvciAobWVzc2FnZSA6IGFueSwgY3JkdElkIDogYW55LCB0aW1lc3RhbXAgOiBWZWN0b3JDbG9jaykge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNyZHRJZCA9IGNyZHRJZDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGN1c3RvbWl6ZWQgdG9KU09OIGZ1bmN0aW9uIHRvIGNvbnZlcnQgbWVzc2FnZSBhcyBKU09OIGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHBhY2thZ2UgaW5mbyBpbiBKU09OIGZvcm1hdC5cbiAgICAgKi9cbiAgICB0b0pTT04oKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIHsgICBcIm1lc3NhZ2VcIiA6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBcImNyZHRJZFwiIDogdGhpcy5jcmR0SWQsXG4gICAgICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ1aWRcIiA6IHRoaXMudGltZXN0YW1wLnVpZCxcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZWN0b3JNYXBcIiA6IEFycmF5LmZyb20odGhpcy50aW1lc3RhbXAudmVjdG9yTWFwLmVudHJpZXMoKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG4vKipcbiAqIENhc3VhbEJyb2FkY2FzdE5ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgYnJvYWRjYXN0IHNlcnZlciB3aXRoIFdlYlNvY2tldCBwcm90b2NvbC5cbiAqXG4gKiBQZXJmb3JtIGNhc3VhbGl0eSBjaGVjayB0byBlbnN1cmUgbWVzc2FnZSBvcmRlcmluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHROZXR3b3JrUnVudGltZSBpbXBsZW1lbnRzIENyZHRSdW50aW1le1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBJRCBmb3IgcmVwbGljYSBmb3IgaWRlbnRpZmljYXRpb24uXG4gICAgICovXG4gICAgdWlkIDogYW55O1xuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCBmb3IgY29ubmVjdGlvbiB0byBzZXJ2ZXIuXG4gICAgICovXG4gICAgd3MgOiBXZWJTb2NrZXQ7XG4gICAgLyoqXG4gICAgICogTWFwIHN0b3JlcyBhbGwgY3JkdElkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdmVjdG9yIGNsb2NrLlxuICAgICAqL1xuICAgIHZjTWFwIDogTWFwPGFueSwgVmVjdG9yQ2xvY2s+O1xuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYnVmZmVyIHRvIHN0b3JlIHJlY2VpdmVkIG1lc3NhZ2UgdG8gZW5zdXJlIGNhc3VhbCBkZWxpdmVyeS5cbiAgICAgKi9cbiAgICBtZXNzYWdlQnVmZmVyIDogQXJyYXk8W2FueSwgYW55LCBWZWN0b3JDbG9ja10+O1xuICAgIC8qKlxuICAgICAqIE1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50IGJ5IHRoZSBXZWJTb2NrZXRcbiAgICAgKi9cbiAgICBzZW5kQnVmZmVyIDogQXJyYXk8bXlNZXNzYWdlPjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVnaXN0ZXJlZCBDUkRUIHdpdGggY29ycmVzcG9uZGluZyBDcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGxpc3RlbmVyc0J5SWQgOiBNYXA8YW55LCBDcmR0TWVzc2FnZUxpc3RlbmVyPjtcblxuICAgIGNvbnN0cnVjdG9yIChyZXBsaWNhSWQ6IGFueSwgd2ViU29ja2V0QXJnczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZjTWFwID0gbmV3IE1hcDxhbnksIFZlY3RvckNsb2NrPigpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIgPSBuZXcgQXJyYXk8W2FueSwgYW55LCBWZWN0b3JDbG9ja10+KCk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheTxteU1lc3NhZ2U+KCk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZCA9IG5ldyBNYXA8YW55LCBDcmR0TWVzc2FnZUxpc3RlbmVyPigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aXRoIHNlcnZlci5cbiAgICAgICAgICogUmVnaXN0ZXIgRXZlbnRMaXN0ZW5lciB3aXRoIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldEFyZ3MpO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLnNlbmRBY3Rpb24pO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLnJlY2VpdmVBY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAqIElmIG5vdCwgdGhlbiB3YWl0IGEgY3VzdG9taXplZCB0aW1lIHBlcmlvZCBhbmQgY2hlY2sgYWdhaW4uXG4gICAgICovXG4gICAgc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXk8bXlNZXNzYWdlPigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgaW50byBteU1lc3NhZ2UgdHlwZS5cbiAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBhbGwgdGhlIG1lc3NhZ2VzIGFuZCBkZWxpdmVyIHRvIGFwcGxpY2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAqL1xuICAgIHJlY2VpdmVBY3Rpb24gPSAoZGF0YSA6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gdGhpcy5wYXJzZUpTT04oZGF0YS5kYXRhKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuY3JkdElkLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHRJZCBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3JkdElkKGNyZHRJZCA6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBjcmR0SWQ6IFwiICsgY3JkdElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyBWZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHQgd2l0aCBpdHMgSUQgYW5kIGNvcnJlc3BvbmRpbmcgbWVzc2FnZVxuICAgICAqIGxpc3RlbmVyIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdE1lc3NhZ2VMaXN0ZW5lciB0aGUgbWVzc2FnZSBsaXN0ZW5lciBvZiBlYWNoIGNyZHQuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgSUQgb2YgZWFjaCBjcmR0LlxuICAgICAqXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lcjogQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc0J5SWQuaGFzKGNyZHRJZCkgfHwgdGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBmdW5jdGlvbiBvbiBjYXN1YWxicm9hZGNhc3QgbmV0d29yayBsYXllciwgd2hpY2ggY2FsbGVkXG4gICAgICogYnkgY3JkdCdzIHJ1bnRpbWUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBpcyB3cmFwcGVkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdGltZXN0YW1wIChiYXNpYyBzZW5kZXIgbm9kZVxuICAgICAqIGluZm8gYW5kIHZlY3RvciBjbG9jaykuXG4gICAgICpcbiAgICAgKiBVc2luZyBXZWJTb2NrZXQgYXMgbmV0d29yayB0cmFuc21pc3Npb24gcHJvdG9jb2wuXG4gICAgICogVXNpbmcgSlNPTiBmb3JtYXQgYXMgbWVzc2FnZSB0eXBlLlxuICAgICAqXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIG5vdCBPcGVuLCB0aGVuIGJ1ZmZlciB0aGUgbWVzc2FnZSBhbmRcbiAgICAgKiB3YWl0IHVudGlsIFdlYlNvY2tldCBvcGVuLlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBPcGVuLCB0aGVuIHNlbmQgaXQgd2l0aCB3cy5zZW5kKCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgY3JkdCB1cGRhdGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSB1bmlxdWUgSUQgZm9yIGVhY2ggY3JkdC5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UgOiBhbnksIGNyZHRJZCA6IGFueSkgOiB2b2lke1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3JkdElkIGV4aXN0IGluIHRoZSBtYXAuXG4gICAgICAgIGlmICh0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpIS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpIS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrIGZvciBzZW5kaW5nXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4odGhpcy52Y01hcC5nZXQoY3JkdElkKT8uYXNWZWN0b3JDbG9jaygpISk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGNyZHRJZCwgdmNDb3B5ISk7XG5cbiAgICAgICAgLy8gQ29udmVydCB0aGUgbWVzc2FnZSBpbnRvIEpTT05cbiAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKG15UGFja2FnZS50b0pTT04oKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChteVBhY2thZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmV4dCB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGNyZHRJZCBpbiB0aGlzIHJlcGxpY2EuXG4gICAgICogXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICogXG4gICAgICovXG4gICAgZ2V0TmV4dFRpbWVzdGFtcChjcmR0SWQ6IGFueSkgOiBDYXVzYWxUaW1lc3RhbXAge1xuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jay4gIFxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KHRoaXMudmNNYXAuZ2V0KGNyZHRJZCk/LmFzVmVjdG9yQ2xvY2soKSEpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuIFxuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgdmNDb3B5LnZlY3Rvck1hcC5nZXQodGhpcy51aWQpIGFzIG51bWJlciArIDEpO1xuXG4gICAgICAgIHJldHVybiB2Y0NvcHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayB0byBjdXN0b21pemVkIGRhdGEgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHRyYXZlbCB0aHJvdWdoIG5ldHdvcmsuXG4gICAgICogQHJldHVybnMgdGhlIGN1c3RvbWl6ZWQgZGF0YSB0eXBlID0+IG15TWVzc2FnZVxuICAgICAqL1xuICAgIHBhcnNlSlNPTihkYXRhIDogc3RyaW5nKSA6IG15TWVzc2FnZSB7XG4gICAgICAgIGxldCBkYXRhSlNPTiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGxldCB2YyA9IG5ldyBWZWN0b3JDbG9jayhkYXRhSlNPTi50aW1lc3RhbXAudWlkKTtcbiAgICAgICAgdmMudmVjdG9yTWFwID0gbmV3IE1hcChkYXRhSlNPTi50aW1lc3RhbXAudmVjdG9yTWFwKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UoZGF0YUpTT04ubWVzc2FnZSwgZGF0YUpTT04uY3JkdElkLCB2Yyk7XG5cbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmcgXG4gICAgICogY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBjaGVja01lc3NhZ2VCdWZmZXIoKSA6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcblxuICAgICAgICB3aGlsZShpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgY3VyQ3JkdElkID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXTtcbiAgICAgICAgICAgIGxldCBjdXJWZWN0b3JDbG9jayA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl07XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52Y01hcC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlWZWN0b3JDbG9jayA9IHRoaXMudmNNYXAuZ2V0KGN1ckNyZHRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKG15VmVjdG9yQ2xvY2s/LmlzcmVhZHkoY3VyVmVjdG9yQ2xvY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBTZW5kIGJhY2sgdGhlIHJlY2VpdmVkIG1lc3NhZ2VzIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLmdldChjdXJDcmR0SWQpPy5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENhdXNhbFRpbWVzdGFtcCB9IGZyb20gJy4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2UnO1xuXG4vLyBUaGUgdmVjdG9yIGNsb2NrIGRlc2lnbmVkIGZvciBDUkRUIGxpYnJhcnkgYW5kIGNhc3VhbCBicm9hZGNhc3Rpbmdcbi8vIHJ1bnRpbWUgdG8gZW5zdXJlIGNvcnJlY3QgY2F1c2FsaXR5LlxuXG4vKipcbiAqIFRoZSB2ZWN0b3IgY2xvY2sgY2xhc3MgZm9yIGVuc3VyaW5nIGNhc3VhbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZlY3RvckNsb2NrIGltcGxlbWVudHMgQ2F1c2FsVGltZXN0YW1we1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBJRCBmb3IgZWFjaCByZXBsaWNhIHRvIGlkZW50aWZ5IGl0c2VsZihyZXBsaWNhSWQpLlxuICAgICAqLyAgICBcbiAgICB1aWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVGhlIHJlY29yZCBtYXAgZnJvbSByZXBsaWNhIGlkcyB0byB0aGUgbnVtYmVyIG9mIGxhc3Rlc3QgbWVzc2FnZS5cbiAgICAgKi9cbiAgICB2ZWN0b3JNYXAgOiBNYXA8YW55LCBudW1iZXI+O1xuXG4gICAgLyoqIFxuICAgICAqIEluaXRpYWxpemUgdGhlIHZlY3RvciB3aXRoIHJlcGxpY2EncyBvd24gZW50cnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkIDogYW55KSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVwbGljYShyZXBsaWNhSWQpLlxuICAgICAqL1xuICAgIGdldFNlbmRlcigpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmVjdG9yIGNsb2NrIHdpdGggYWxsIHRoZSBlbnRyaWVzLlxuICAgICAqL1xuICAgIGFzVmVjdG9yQ2xvY2soKSA6IE1hcDxhbnksIG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpbiBcbiAgICAgKiB0aGlzIHZlY3RvcmNsb2NrLlxuICAgICAqL1xuICAgIGdldFNlbmRlckNvdW50ZXIoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpITtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiByZXBsaWNhcyBpbnZvdmxlZCBpbiB0aGlzIGNyZHRzLlxuICAgICAqL1xuICAgIGdldFNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZlY3RvciBvZiB0aGUgdWlkKHJlcGxpY2FJZCkgZW50cnkuXG4gICAgICovXG4gICAgaW5jcmVtZW50KCkgOiB2b2lkIHsgXG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcblxuICAgICAgICBpZihvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgb2xkVmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBhIG1lc3NhZ2Ugd2l0aCBhIGNlcnRhaW4gdGltZXN0YW1wIGlzIHJlYWR5IGZvciBkZWxpdmVyeSBcbiAgICAgKiB0byBlbnN1cmUgY29ycmVjdCBjYXN1YWxpdHkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMgOiBWZWN0b3JDbG9jaykgOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuaGFzKG90aGVyVWlkKSkgeyBcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpISAtIDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSEgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkgeyAgXG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkhIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICogXG4gICAgICogVGhpcyBvcGVyYXRpb24gaXMgbWFpbmx5IGRvbmUgYWZ0ZXIgY29ycmVjdGx5IGRlbGl2ZXIgdGhlIG1lc3NhZ2VcbiAgICAgKiB3aGVuIGlzUmVhZHkoKSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgaW5jcmVtZW50U2VuZGVyKHZjIDogVmVjdG9yQ2xvY2spIDogdm9pZCB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG5cbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KG90aGVyVWlkLCBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpISk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIGN1cnJlbnQgVmVjdG9yQ2xvY2sgd2l0aCB0aGUgdmVjdG9yIGNsb2NrIHJlY2V2aWVkIGZyb20gXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBtZXJnZSh2YyA6IFZlY3RvckNsb2NrKSA6IHZvaWR7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIE1hdGgubWF4KHRoaXMudmVjdG9yTWFwLmdldChpZCkhLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzb21lVWlkIHRoZSByZXBsaWNhJ3MgdWlkLlxuICAgICAqIEBwYXJhbSBjbG9ja1ZhbHVlIHRoZSBjbG9jayBudW1iZXIgb2YgdGhlIHJlcGxpY2EuXG4gICAgICovXG4gICAgc2V0RW50cnkoc29tZVVpZCA6IGFueSwgY2xvY2tWYWx1ZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQgeyBDb3VudGVyQ3JkdCwgTXVsdFJlZ2lzdGVyQ3JkdCwgR1NldENyZHQsIE11bHRpVmFsdWVSZWdpc3RlciB9IGZyb20gXCIuLi8uLi9zcmMvY3JkdHMvYmFzaWNfY3JkdHNcIjtcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdENvdW50ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0Q291bnRlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlQ291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGFkZGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iQ291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBib2IpO1xuICAgIGJvYkNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGFkZGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUNvdW50ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkNvdW50ZXIuYWRkKC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAtMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIC0xKTtcblxuICAgIGFsaWNlQ291bnRlci52YWx1ZSA9IDExO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDExKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMTEpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RcbiAgICBhbGljZUNvdW50ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDEzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMTEpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDEzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNik7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA4KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgOCk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE11bHRSZWdpc3RlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNdWx0UmVnaXN0ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZVJlZ2lzdGVyID0gbmV3IE11bHRSZWdpc3RlckNyZHQoXCJtdWx0SWRcIiwgYWxpY2UsIDIpO1xuICAgIGFsaWNlUmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgbXVsdGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iUmVnaXN0ZXIgPSBuZXcgTXVsdFJlZ2lzdGVyQ3JkdChcIm11bHRJZFwiLCBib2IsIDIpO1xuICAgIGJvYlJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBtdWx0ZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDIpO1xuXG4gICAgYWxpY2VSZWdpc3Rlci5tdWx0KDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDYpO1xuXG4gICAgYm9iUmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIC0yNCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAtMjQpO1xuXG4gICAgYWxpY2VSZWdpc3Rlci52YWx1ZSA9IDExO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAxMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlUmVnaXN0ZXIubXVsdCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMjIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMTEpO1xuXG4gICAgYm9iUmVnaXN0ZXIubXVsdCgtOCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDIyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC04OCk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgLTE3Nik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAtMTc2KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0R1NldCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RHU2V0KCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VHU2V0ID0gbmV3IEdTZXRDcmR0KFwiZ3NldElkXCIsIGFsaWNlKTtcbiAgICBhbGljZUdTZXQub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JHU2V0ID0gbmV3IEdTZXRDcmR0KFwiZ3NldElkXCIsIGJvYik7XG4gICAgYm9iR1NldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoKSk7XG5cbiAgICBhbGljZUdTZXQuYWRkKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG5cbiAgICBib2JHU2V0LmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG5cbiAgICBhbGljZUdTZXQuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VHU2V0LmFkZChcImZpcnN0XCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuXG4gICAgYm9iR1NldC5hZGQoXCJzZWNvbmRcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RNdnIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0TXZyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VNdnIgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oXCJtdnJJZFwiLCBhbGljZSwgXCJpbml0aWFsXCIpO1xuICAgIGFsaWNlTXZyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGxldCBib2JNdnIgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oXCJtdnJJZFwiLCBib2IsIFwiaW5pdGlhbFwiKTtcbiAgICBib2JNdnIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJpbml0aWFsXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJpbml0aWFsXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwic2Vjb25kXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wic2Vjb25kXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwidGhpcmRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1widGhpcmRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInRoaXJkXCJdKSk7XG5cbiAgICBib2JNdnIudmFsdWUgPSBcImJvYidzXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImJvYidzXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJib2Inc1wiXSkpO1xuXG4gICAgLy8gQ29uY3VycmVudCB0ZXN0XG4gICAgYWxpY2VNdnIudmFsdWUgPSBcImNvbmNBXCI7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJjb25jQlwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQVwiLCBcImNvbmNCXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQlwiLCBcImNvbmNBXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwiY29uY0EyXCI7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNBMlwiXSkpO1xuICAgIGJvYk12ci52YWx1ZSA9IFwiY29uY0IyXCI7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQjJcIl0pKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY0EyXCIsIFwiY29uY0IyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQjJcIiwgXCJjb25jQTJcIl0pKTtcblxuICAgIC8vIE11bHRpcGxlIGFkZHMgYXJlIHJlZHVuZGFudCwgdW5sZXNzIHRoZXkncmUgb3ZlcndyaXR0ZW5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwicmVkdW5kYW50XCI7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wicmVkdW5kYW50XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJvdmVyd3JpdGVcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wicmVkdW5kYW50XCIsIFwib3ZlcndyaXRlXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIiwgXCJvdmVyd3JpdGVcIl0pKTtcblxuICAgIC8vIFJlc2V0IHRlc3RcbiAgICBhbGljZU12ci5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldCgpKTtcbiAgICBib2JNdnIudmFsdWUgPSBcImNvbmNcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY1wiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY1wiXSkpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdENvdW50ZXIoKTtcbnRlc3RNdWx0UmVnaXN0ZXIoKTtcbnRlc3RHU2V0KCk7XG50ZXN0TXZyKCk7XG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5mdW5jdGlvbiBpc1N1cGVyc2V0PFQ+KHNldDogU2V0PFQ+LCBzdWJzZXQ6IFNldDxUPikge1xuICAgIGZvciAobGV0IGVsZW0gb2Ygc3Vic2V0KSB7XG4gICAgICAgIGlmICghc2V0LmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIHNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIHJldHVybiBpc1N1cGVyc2V0KHNldDEsIHNldDIpICYmIGlzU3VwZXJzZXQoc2V0Miwgc2V0MSk7XG59XG5mdW5jdGlvbiBhc3NlcnRTZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICBpZighc2V0RXF1YWxzKHNldDEsIHNldDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEVxdWFscyBmYWlsZWQsIGFjdHVhbDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDEudmFsdWVzKCldKSArIFwiLCBleHBlY3RlZDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDIudmFsdWVzKCldKSk7XG4gICAgfVxuICAgIGFzc2VydChzZXRFcXVhbHMoc2V0MSwgc2V0MikpO1xufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7IEpzb25DcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL2pzb24nO1xuaW1wb3J0IHsgSW50UmVnaXN0ZXJDcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkJztcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdEpzb25NYXBGZWF0dXJlcygpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RKc29uTWFwRmVhdHVyZXMoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uTWFwXCIsIGFsaWNlKTtcbiAgICBsZXQgYm9iSnNvbiA9IG5ldyBKc29uQ3JkdChcImpzb25NYXBcIiwgYm9iKTtcblxuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG5cbiAgICAvLyBJbml0cyBnbyB0aHJvdWdoXG4gICAgYWxpY2VKc29uLmluaXQoXCJ0ZXN0XCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0KGFsaWNlSnNvbi5oYXMoXCJ0ZXN0XCIsIDApKTtcbiAgICBhc3NlcnQoYm9iSnNvbi5oYXMoXCJ0ZXN0XCIsIDApKTtcblxuICAgIGxldCBhbGljZVRlc3QgPSBhbGljZUpzb24uZ2V0KFwidGVzdFwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGFsaWNlVGVzdCk7XG4gICAgbGV0IGJvYlRlc3QgPSBib2JKc29uLmdldChcInRlc3RcIiwgMCkgYXMgSW50UmVnaXN0ZXJDcmR0O1xuICAgIGFzc2VydChib2JUZXN0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgMCk7XG5cbiAgICAvLyBWYWx1ZSBvcHMgd29ya1xuICAgIGFsaWNlVGVzdC5hZGQoMyk7XG4gICAgYm9iVGVzdC5hZGQoNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlVGVzdC52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlRlc3QudmFsdWUsIDcpO1xuXG4gICAgLy8gRGVsZXRlIHdvcmtzXG4gICAgYm9iSnNvbi5kZWxldGUoXCJ0ZXN0XCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0KGFsaWNlSnNvbi5nZXQoXCJ0ZXN0XCIsIDApID09PSB1bmRlZmluZWQpO1xuICAgIGFzc2VydChib2JKc29uLmdldChcInRlc3RcIiwgMCkgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBhbGljZUpzb24uaW5pdChcInJlZ2lzdGVyXCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcblxuICAgIC8vIENvbmN1cnJlbnQgb3BlcmF0aW9uIHJldml2ZXMga2V5XG4gICAgbGV0IGJvYlJlZ2lzdGVyID0gYm9iSnNvbi5nZXQoXCJyZWdpc3RlclwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VKc29uLmRlbGV0ZShcInJlZ2lzdGVyXCIsIDApO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZUpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoKGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQpLnZhbHVlLCAzKTtcblxuICAgIC8vIC8vIFJlc2V0IHRlc3RzXG4gICAgLy8gLy8gQ29uY3VycmVudCBvcCByZXZpdmVzXG4gICAgLy8gbGV0IGFsaWNlUmVnaXN0ZXIgPSBhbGljZUpzb24uZ2V0KFwicmVnaXN0ZXJcIikgYXMgSW50UmVnaXN0ZXJDcmR0O1xuICAgIC8vIGFsaWNlSnNvbi5yZXNldCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSwgdW5kZWZpbmVkKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgLy8gYm9iUmVnaXN0ZXIuYWRkKDUpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgNSk7XG4gICAgLy9cbiAgICAvLyAvLyBDYXVzYWxseSBsYXRlciBvcCByZXZpdmVzXG4gICAgLy8gYm9iSnNvbi5yZXNldCgpO1xuICAgIC8vIGJvYlJlZ2lzdGVyLmFkZCg3KTtcbiAgICAvLyBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZUpzb24ua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIC8vIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgNyk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIsIGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gVE9ETzogc3Ryb25nIGRlbGV0ZSwgc3Ryb25nIHJlc2V0cywgbmVzdGluZz9cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SnNvbkNvbnZlcnNpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0SnNvbk1hcEZlYXR1cmVzKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VKc29uID0gbmV3IEpzb25DcmR0KFwianNvbjJcIiwgYWxpY2UpO1xuICAgIGxldCBib2JKc29uID0gbmV3IEpzb25DcmR0KFwianNvbjJcIiwgYm9iKTtcblxuICAgIGxldCB0ZXN0T2JqID0ge1xuICAgICAgICBcInRvcGljXCI6IFwiZ2FtZXNcIixcbiAgICAgICAgXCJyZXZpZXdzXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtb25vcG9seVwiLCBcInJhdGluZ1wiOiA3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWZlXCIsIFwicmF0aW5nXCI6IDZ9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIGxldCBuZXN0ZWRPYmogPSB7XG4gICAgICAgIFwidG9waWNcIjogXCJuZXN0aW5nXCIsXG4gICAgICAgIFwibmVzdGVkXCI6IHRlc3RPYmpcbiAgICB9O1xuICAgIGFsaWNlSnNvbi52YWx1ZSA9IG5lc3RlZE9iajtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhcImFsaWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgY29uc29sZS5sb2coXCJib2I6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZUpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYkpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcblxuICAgIGJvYkpzb24uc2V0VmFsdWUoXCJmbGFnXCIsIHRydWUpO1xuICAgIChuZXN0ZWRPYmogYXMgYW55KS5mbGFnID0gdHJ1ZTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhcImFsaWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgY29uc29sZS5sb2coXCJib2I6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZUpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYkpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcblxuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbnRlc3RKc29uTWFwRmVhdHVyZXMoKTtcbnRlc3RKc29uQ29udmVyc2lvbigpO1xuXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1NldFxuZnVuY3Rpb24gaXNTdXBlcnNldDxUPihzZXQ6IFNldDxUPiwgc3Vic2V0OiBTZXQ8VD4pIHtcbiAgICBmb3IgKGxldCBlbGVtIG9mIHN1YnNldCkge1xuICAgICAgICBpZiAoIXNldC5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5mdW5jdGlvbiBzZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICByZXR1cm4gaXNTdXBlcnNldChzZXQxLCBzZXQyKSAmJiBpc1N1cGVyc2V0KHNldDIsIHNldDEpO1xufVxuZnVuY3Rpb24gYXNzZXJ0U2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgaWYoIXNldEVxdWFscyhzZXQxLCBzZXQyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXRFcXVhbHMgZmFpbGVkLCBhY3R1YWw6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQxLnZhbHVlcygpXSkgKyBcIiwgZXhwZWN0ZWQ6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQyLnZhbHVlcygpXSkpO1xuICAgIH1cbiAgICBhc3NlcnQoc2V0RXF1YWxzKHNldDEsIHNldDIpKTtcbn1cbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQge0ludFJlZ2lzdGVyQ3JkdH0gZnJvbSBcIi4uLy4uL3NyYy9jcmR0cy9zdGFuZGFyZFwiO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKSB7XG4gICAgLy8gVGVzdCBEZWZhdWx0UmVzZXR0YWJsZUNyZHQgYnkgdGVzdGluZyBJbnRSZWdpc3RlckNyZHQnc1xuICAgIC8vIGFkZCBhbmQgcmVzZXQgb3BlcmF0aW9ucywgc2luY2UgaXQncyBhIHNpbXBsZSBleGFtcGxlLlxuICAgIGNvbnNvbGUubG9nKFwidGVzdFJlc2V0dGFibGVDb3VudGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VDb3VudGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcInJlc2V0dGFibGVDb3VudGVySWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlQ291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JDb3VudGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcInJlc2V0dGFibGVDb3VudGVySWRcIiwgYm9iKTtcbiAgICBib2JDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIC0xKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgLTEpO1xuXG4gICAgYWxpY2VDb3VudGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlQ291bnRlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA2KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDgpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA4KTtcblxuICAgIC8vIE9ic2VydmVkIHJlc2V0IHRlc3RzXG4gICAgYWxpY2VDb3VudGVyLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYm9iQ291bnRlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gQ29uY3VycmVudCBhZGQgc2hvdWxkIHN1cnZpdmVcbiAgICBhbGljZUNvdW50ZXIucmVzZXQoKTtcbiAgICBib2JDb3VudGVyLmFkZCgxMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMCk7XG5cbiAgICAvLyBSZXNldC13aW5zIHRlc3RzXG4gICAgYm9iQ291bnRlci5yZXNldFN0cm9uZygpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoNik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDYpO1xuXG4gICAgLy8gQ29uY3VycmVudCBhZGQgc2hvdWxkIG5vdCBzdXJ2aXZlXG4gICAgYWxpY2VDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgYm9iQ291bnRlci5hZGQoMjApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIC8vIExvdHMgb2YgY29uY3VycmVuY3lcbiAgICBhbGljZUNvdW50ZXIuYWRkKDMpO1xuICAgIGJvYkNvdW50ZXIuYWRkKDcpO1xuICAgIGFsaWNlQ291bnRlci5yZXNldCgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZShib2IpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA3KTtcbiAgICBib2JDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdFJlc2V0dGFibGVDb3VudGVyKCk7XG4iLCJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge1Rlc3RpbmdSdW50aW1lR2VuZXJhdG9yfSBmcm9tIFwiLi4vcnVudGltZV9mb3JfdGVzdGluZ1wiO1xuaW1wb3J0IHsgRW5hYmxlV2luc0ZsYWcsIERpc2FibGVXaW5zRmxhZywgSW50UmVnaXN0ZXJDcmR0LCBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQsIEFkZFdpbnNTZXQsIENyZHRPYmplY3QsIE1hcENyZHQsIE9ydGhvZ29uYWxDcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkJztcbmltcG9ydCB7IENyZHRSdW50aW1lIH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRfcnVudGltZV9pbnRlcmZhY2UnO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0RXdGbGFnKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEV3RmxhZygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlRmxhZyA9IG5ldyBFbmFibGVXaW5zRmxhZyhcImV3RmxhZ0lkXCIsIGFsaWNlKTtcbiAgICBhbGljZUZsYWcub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iRmxhZyA9IG5ldyBFbmFibGVXaW5zRmxhZyhcImV3RmxhZ0lkXCIsIGJvYik7XG4gICAgYm9iRmxhZy5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBhbGljZUZsYWcuZW5hYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIGJvYkZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0RHdGbGFnKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdER3RmxhZygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlRmxhZyA9IG5ldyBEaXNhYmxlV2luc0ZsYWcoXCJkd0ZsYWdJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkZsYWcgPSBuZXcgRGlzYWJsZVdpbnNGbGFnKFwiZHdGbGFnSWRcIiwgYm9iKTtcbiAgICBib2JGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBhbGljZUZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGJvYkZsYWcuZW5hYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIGJvYkZsYWcuZGlzYWJsZSgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEludFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEludFJlZ2lzdGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkXCIsIGFsaWNlKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBsZXQgYm9iSW50UmVnaXN0ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZFwiLCBib2IpO1xuICAgIGJvYkludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTEyKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdHNcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCg1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTI1KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTE1KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0RnJvbVBhcGVyKCkge1xuICAgIC8vIFRoZSArL3ggZXhhbXBsZSBmcm9tIHRoZSBmaWd1cmUgaW4gdGhlIHBhcGVyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0RnJvbVBhcGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkMlwiLCBhbGljZSwgMSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQyXCIsIGJvYiwgMSk7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIubXVsdCgyKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgxKTtcbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDMpO1xuICAgIGJvYkludFJlZ2lzdGVyLmFkZCg0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAxNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAxNyk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdFVucmVzZXR0YWJsZUludFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEludFJlZ2lzdGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkM1wiLCBhbGljZSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQzXCIsIGJvYik7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xMik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0c1xuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMjUpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RPcnRob2dvbmFsKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE9ydGhvZ29uYWwoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU9ydGhvZ29uYWwgPSBuZXcgT3J0aG9nb25hbENyZHQoXCJvcnRob2dvbmFsSWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlT3J0aG9nb25hbC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBzZXQgdG8gXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JPcnRob2dvbmFsID0gbmV3IE9ydGhvZ29uYWxDcmR0KFwib3J0aG9nb25hbElkXCIsIGJvYik7XG4gICAgYm9iT3J0aG9nb25hbC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFsxLCBmYWxzZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzEsIGZhbHNlXSk7XG5cbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKDEwKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzExICUgKDIqTWF0aC5QSSksIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMTEgJSAoMipNYXRoLlBJKSwgZmFsc2VdKTtcbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKC0xMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG5cbiAgICBib2JPcnRob2dvbmFsLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWxpY2VPcnRob2dvbmFsLnZhbHVlLCBbMipNYXRoLlBJIC0gMSwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzIqTWF0aC5QSSAtIDEsIHRydWVdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMS41KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgdHJ1ZV0pO1xuXG4gICAgYm9iT3J0aG9nb25hbC5yZWZsZWN0KDAuNSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFswLjUsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMC41LCBmYWxzZV0pO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RzXG4gICAgYWxpY2VPcnRob2dvbmFsLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFswLCBmYWxzZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG5cbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKE1hdGguUEkvMik7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFtNYXRoLlBJLzIsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGJvYk9ydGhvZ29uYWwucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFtNYXRoLlBJLzIsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgdHJ1ZV0pO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFszKk1hdGguUEkvMiwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzMqTWF0aC5QSS8yLCB0cnVlXSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuY2xhc3MgQmlDb3VudGVyIGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD4ge1xuICAgIGE6IEludFJlZ2lzdGVyQ3JkdDtcbiAgICBiOiBJbnRSZWdpc3RlckNyZHQ7XG4gICAgY29uc3RydWN0b3IoY3JkdElkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmEgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiYVwiLCB0aGlzLCAxKTtcbiAgICAgICAgdGhpcy5iID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImJcIiwgdGhpcywgMSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RDcmR0T2JqZWN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdENyZHRPYmplY3QoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUJpID0gbmV3IEJpQ291bnRlcihcImJpSWRcIiwgYWxpY2UpO1xuICAgIGxldCBib2JCaSA9IG5ldyBCaUNvdW50ZXIoXCJiaUlkXCIsIGJvYik7XG5cbiAgICAvLyBEbyB0ZXN0RnJvbVBhcGVyKCkgb24gZWFjaCBjb3VudGVyXG4gICAgYWxpY2VCaS5hLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlIGE6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGJvYkJpLmEub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iIGE6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFsaWNlQmkuYi5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZSBiOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBib2JCaS5iLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYiBiOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAxKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgMSk7XG5cbiAgICBhbGljZUJpLmEubXVsdCgyKTtcbiAgICBhbGljZUJpLmEuYWRkKDEpO1xuICAgIGJvYkJpLmEubXVsdCgzKTtcbiAgICBib2JCaS5hLmFkZCg0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgNyk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAxNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmEudmFsdWUsIDE3KTtcblxuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDEpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlQmkuYi5tdWx0KDIpO1xuICAgIGFsaWNlQmkuYi5hZGQoMSk7XG4gICAgYm9iQmkuYi5tdWx0KDMpO1xuICAgIGJvYkJpLmIuYWRkKDQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDE3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYi52YWx1ZSwgMTcpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEF3U2V0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEF3U2V0KCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VTZXQgPSBuZXcgQWRkV2luc1NldDxzdHJpbmc+KFwiYXdTZXRJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VTZXQub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICtcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGxldCBib2JTZXQgPSBuZXcgQWRkV2luc1NldDxzdHJpbmc+KFwiYXdTZXRJZFwiLCBib2IpO1xuICAgIGJvYlNldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICtcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldCgpKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KCkpO1xuXG4gICAgYWxpY2VTZXQuYWRkKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuXG4gICAgYm9iU2V0LmFkZChcIjdcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuXG4gICAgYWxpY2VTZXQuYWRkKFwiN1wiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlU2V0LmFkZChcImZpcnN0XCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuXG4gICAgYm9iU2V0LmFkZChcInNlY29uZFwiKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIiwgXCJmaXJzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICAvLyBEZWxldGUgdGVzdHMgb24gc2luZ2xlIGVsZW1lbnQgKGNvcHlpbmcgRXdGbGFnIHRlc3RzKVxuICAgIGFsaWNlU2V0LmRlbGV0ZShcImVsZW1lbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBib2JTZXQuZGVsZXRlKFwibm9uZXhpc3RlbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCJjb25jdXJyZW50XCIpO1xuICAgIGFsaWNlU2V0LmRlbGV0ZShcImNvbmN1cnJlbnRcIik7XG4gICAgYm9iU2V0LmFkZChcImNvbmN1cnJlbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiLCBcImNvbmN1cnJlbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiLCBcImNvbmN1cnJlbnRcIl0pKTtcbiAgICAvLyBUT0RPOiB0ZXN0IGRlbGV0ZVN0cm9uZ1xuXG4gICAgLy8gT2JzZXJ2ZWQtcmVzZXQgdGVzdFxuICAgIGJvYlNldC5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoKSk7XG4gICAgYWxpY2VTZXQuYWRkKFwic3Vydml2b3JcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcInN1cnZpdm9yXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJzdXJ2aXZvclwiXSkpO1xuICAgIC8vXG4gICAgLy8gLy8gUmVzZXQtd2lucyB0ZXN0XG4gICAgLy8gYWxpY2VTZXQucmVzZXRTdHJvbmcoKTtcbiAgICAvLyBhbGljZVNldC5hZGQoXCJhbGljZSdzXCIpO1xuICAgIC8vIGJvYlNldC5yZXNldCgpO1xuICAgIC8vIGJvYlNldC5hZGQoXCJib2Inc1wiKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYm9iJ3NcIl0pKTtcbiAgICAvLyBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE1hcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNYXAoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU1hcCA9IG5ldyBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PihcIm1hcFwiLCBhbGljZSxcbiAgICAgICAgICAgIChrZXk6IHN0cmluZywgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT4gbmV3IEludFJlZ2lzdGVyQ3JkdChrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgIGxldCBib2JNYXAgPSBuZXcgTWFwQ3JkdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD4oXCJtYXBcIiwgYm9iLFxuICAgICAgICAgICAgKGtleTogc3RyaW5nLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG5cbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcblxuICAgIC8vIEluaXRzIGdvIHRocm91Z2hcbiAgICBhbGljZU1hcC5pbml0KFwidGVzdFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0KGFsaWNlTWFwLmhhcyhcInRlc3RcIikpO1xuICAgIGFzc2VydChib2JNYXAuaGFzKFwidGVzdFwiKSk7XG5cbiAgICBsZXQgYWxpY2VUZXN0ID0gYWxpY2VNYXAuZ2V0KFwidGVzdFwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGFsaWNlVGVzdCk7XG4gICAgbGV0IGJvYlRlc3QgPSBib2JNYXAuZ2V0KFwidGVzdFwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGJvYlRlc3QpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCAwKTtcblxuICAgIC8vIFZhbHVlIG9wcyB3b3JrXG4gICAgYWxpY2VUZXN0LmFkZCgzKTtcbiAgICBib2JUZXN0LmFkZCg0KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgNyk7XG5cbiAgICAvLyBEZWxldGUgd29ya3NcbiAgICBib2JNYXAuZGVsZXRlKFwidGVzdFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQoYWxpY2VNYXAuZ2V0KFwidGVzdFwiKSA9PT0gdW5kZWZpbmVkKTtcbiAgICBhc3NlcnQoYm9iTWFwLmdldChcInRlc3RcIikgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBhbGljZU1hcC5pbml0KFwicmVnaXN0ZXJcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG5cbiAgICAvLyBDb25jdXJyZW50IG9wZXJhdGlvbiByZXZpdmVzIGtleVxuICAgIGxldCBib2JSZWdpc3RlciA9IGJvYk1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VNYXAuZGVsZXRlKFwicmVnaXN0ZXJcIik7XG4gICAgYm9iUmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKChhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQpLnZhbHVlLCAzKTtcblxuICAgIC8vIFJlc2V0IHRlc3RzXG4gICAgLy8gQ29uY3VycmVudCBvcCByZXZpdmVzXG4gICAgbGV0IGFsaWNlUmVnaXN0ZXIgPSBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VNYXAucmVzZXQoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpLCB1bmRlZmluZWQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoNSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA1KTtcblxuICAgIC8vIENhdXNhbGx5IGxhdGVyIG9wIHJldml2ZXNcbiAgICBib2JNYXAucmVzZXQoKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA3KTtcblxuICAgIC8vIFRPRE86IHN0cm9uZyBkZWxldGUsIHN0cm9uZyByZXNldHMsIG5lc3Rpbmc/XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdEV3RmxhZygpO1xudGVzdER3RmxhZygpO1xudGVzdEludFJlZ2lzdGVyKCk7XG50ZXN0RnJvbVBhcGVyKCk7XG50ZXN0VW5yZXNldHRhYmxlSW50UmVnaXN0ZXIoKTtcbnRlc3RPcnRob2dvbmFsKCk7XG50ZXN0Q3JkdE9iamVjdCgpO1xudGVzdEF3U2V0KCk7XG50ZXN0TWFwKCk7XG5cblxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXRcbmZ1bmN0aW9uIGlzU3VwZXJzZXQ8VD4oc2V0OiBTZXQ8VD4sIHN1YnNldDogU2V0PFQ+KSB7XG4gICAgZm9yIChsZXQgZWxlbSBvZiBzdWJzZXQpIHtcbiAgICAgICAgaWYgKCFzZXQuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuZnVuY3Rpb24gc2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgcmV0dXJuIGlzU3VwZXJzZXQoc2V0MSwgc2V0MikgJiYgaXNTdXBlcnNldChzZXQyLCBzZXQxKTtcbn1cbmZ1bmN0aW9uIGFzc2VydFNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIGlmKCFzZXRFcXVhbHMoc2V0MSwgc2V0MikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0RXF1YWxzIGZhaWxlZCwgYWN0dWFsOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0MS52YWx1ZXMoKV0pICsgXCIsIGV4cGVjdGVkOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0Mi52YWx1ZXMoKV0pKTtcbiAgICB9XG4gICAgYXNzZXJ0KHNldEVxdWFscyhzZXQxLCBzZXQyKSk7XG59XG4iLCJpbXBvcnQge0NyZHRSdW50aW1lLCBDcmR0TWVzc2FnZUxpc3RlbmVyLCBDYXVzYWxUaW1lc3RhbXB9IGZyb20gXCIuLi9zcmMvY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG5jbGFzcyBUZXN0aW5nUnVudGltZSBpbXBsZW1lbnRzIENyZHRSdW50aW1lIHtcbiAgICBsaXN0ZW5lcnNCeUlkID0gbmV3IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+KCk7XG4gICAgdmVjdG9yQ2xvY2sgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2VuZXJhdG9yIDogVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IsXG4gICAgICAgICAgICBwcml2YXRlIHJlcGxpY2FJZCA6IGFueSkge1xuICAgICAgICB0aGlzLnZlY3RvckNsb2NrLnNldChyZXBsaWNhSWQsIDApO1xuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2U6IGFueSwgY3JkdElkOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52ZWN0b3JDbG9jay5zZXQodGhpcy5yZXBsaWNhSWQsIHRoaXMudmVjdG9yQ2xvY2suZ2V0KFxuICAgICAgICAgICAgdGhpcy5yZXBsaWNhSWQpIGFzIG51bWJlciArIDFcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG15UmVwbGljYUlkID0gdGhpcy5yZXBsaWNhSWQ7XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgTWFwKHRoaXMudmVjdG9yQ2xvY2spO1xuICAgICAgICBsZXQgdGltZXN0YW1wID0ge1xuICAgICAgICAgICAgZ2V0U2VuZGVyKCkgeyByZXR1cm4gbXlSZXBsaWNhSWQ7IH0sXG4gICAgICAgICAgICBnZXRTZW5kZXJDb3VudGVyKCkgeyByZXR1cm4gdmNDb3B5LmdldCh0aGlzLmdldFNlbmRlcigpKSBhcyBudW1iZXI7fSxcbiAgICAgICAgICAgIGFzVmVjdG9yQ2xvY2soKSB7IHJldHVybiB2Y0NvcHk7IH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVldWVNYXAgPSB0aGlzLmdlbmVyYXRvci5tZXNzYWdlUXVldWVzLmdldCh0aGlzKSBhc1xuICAgICAgICAgICAgTWFwPFRlc3RpbmdSdW50aW1lLCBBcnJheTxbYW55LCBhbnksIENhdXNhbFRpbWVzdGFtcF0+PjtcbiAgICAgICAgZm9yIChsZXQgcXVldWUgb2YgcXVldWVNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIC8vIFVzZSBkaWZmZXJlbnQgY29waWVzIGZvciBlYWNoIENyZHQsIGluIGNhc2UgdGhleVxuICAgICAgICAgICAgLy8gbW9kaWZ5IG1lc3NhZ2Ugd2hpbGUgcHJvY2Vzc2luZyBpdFxuICAgICAgICAgICAgcXVldWUucHVzaChbSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSksIGNyZHRJZCwgdGltZXN0YW1wXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lcjogQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsaWNhSWQ7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoKSB7XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgTWFwKHRoaXMudmVjdG9yQ2xvY2spO1xuICAgICAgICB2Y0NvcHkuc2V0KHRoaXMucmVwbGljYUlkLCB0aGlzLnZlY3RvckNsb2NrLmdldChcbiAgICAgICAgICAgIHRoaXMucmVwbGljYUlkKSBhcyBudW1iZXIgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGxldCBteVJlcGxpY2FJZCA9IHRoaXMucmVwbGljYUlkO1xuICAgICAgICBsZXQgdGltZXN0YW1wID0ge1xuICAgICAgICAgICAgZ2V0U2VuZGVyKCkgeyByZXR1cm4gbXlSZXBsaWNhSWQ7IH0sXG4gICAgICAgICAgICBnZXRTZW5kZXJDb3VudGVyKCkgeyByZXR1cm4gdmNDb3B5LmdldCh0aGlzLmdldFNlbmRlcigpKSBhcyBudW1iZXI7fSxcbiAgICAgICAgICAgIGFzVmVjdG9yQ2xvY2soKSB7IHJldHVybiB2Y0NvcHk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY29sbGVjdGlvbiBvZiBDcmR0UnVudGltZXMgbGlua2VkIHRvZ2V0aGVyXG4gKiAoaS5lLiwgaW4tbWVtb3J5IG5ldHdvcmtpbmcpIHRoYXQgZGVsaXZlciBtZXNzYWdlc1xuICogd2hlbiByZWxlYXNlIGlzIGNhbGxlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yIHtcbiAgICBuZXdSdW50aW1lKHJlcGxpY2FJZD86IGFueSkgOiBUZXN0aW5nUnVudGltZSB7XG4gICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHVuZGVmaW5lZCkgcmVwbGljYUlkID0gdGhpcy5tZXNzYWdlUXVldWVzLnNpemU7XG4gICAgICAgIGxldCBydW50aW1lID0gbmV3IFRlc3RpbmdSdW50aW1lKHRoaXMsIHJlcGxpY2FJZCk7XG4gICAgICAgIGxldCBuZXdRdWV1ZSA9IG5ldyBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PGFueT4+KCk7XG4gICAgICAgIGZvciAobGV0IG9sZEVudHJ5IG9mIHRoaXMubWVzc2FnZVF1ZXVlcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIG5ld1F1ZXVlLnNldChvbGRFbnRyeVswXSwgW10pO1xuICAgICAgICAgICAgb2xkRW50cnlbMV0uc2V0KHJ1bnRpbWUsIFtdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lc3NhZ2VRdWV1ZXMuc2V0KHJ1bnRpbWUsIG5ld1F1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIE1hcHMgc2VuZGVyIGFuZCByZWNpcGllbnQgdG8gYW4gYXJyYXkgb2YgcXVldWVkIFttZXNzYWdlLFxuICAgIC8vIGNyZHRJZCwgdGltZXN0YW1wXSB0dXBsZXMuXG4gICAgbWVzc2FnZVF1ZXVlcyA9IG5ldyBNYXA8VGVzdGluZ1J1bnRpbWUsXG4gICAgICAgIE1hcDxUZXN0aW5nUnVudGltZSwgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPj4+KCk7XG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBhbGwgcXVldWVkIG1lc3NhZ2VzIHNlbmRlciB0byB0aGUgc3BlY2lmaWVkIHJlY2lwaWVudHMuXG4gICAgICogSWYgcmVjaXBpZW50cyBhcmUgbm90IHNwZWNpZmllZCwgcmVsZWFzZXMgdGhlbSB0byBhbGxcbiAgICAgKiByZWNpcGllbnRzLiAgT25seSByZWNpcGllbnRzIHRoYXQgZXhpc3RlZCBhdCB0aGUgdGltZVxuICAgICAqIG9mIHNlbmRpbmcgd2lsbCByZWNlaXZlIGEgbWVzc2FnZS5cbiAgICAgKi9cbiAgICByZWxlYXNlKHNlbmRlcjogVGVzdGluZ1J1bnRpbWUsIC4uLnJlY2lwaWVudHM6IFRlc3RpbmdSdW50aW1lW10pIHtcbiAgICAgICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoID09PSAwKSByZWNpcGllbnRzID0gWy4uLnRoaXMubWVzc2FnZVF1ZXVlcy5rZXlzKCldO1xuICAgICAgICBsZXQgc2VuZGVyTWFwID0gdGhpcy5tZXNzYWdlUXVldWVzLmdldChzZW5kZXIpIGFzXG4gICAgICAgICAgICBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PGFueT4+O1xuICAgICAgICBmb3IgKGxldCByZWNpcGllbnQgb2YgcmVjaXBpZW50cykge1xuICAgICAgICAgICAgaWYgKHJlY2lwaWVudCA9PT0gc2VuZGVyKSBjb250aW51ZTtcbiAgICAgICAgICAgIGZvciAobGV0IG1lc3NhZ2VQYWlyIG9mIChzZW5kZXJNYXAuZ2V0KHJlY2lwaWVudCkgYXMgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPikpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSByZWNpcGllbnQubGlzdGVuZXJzQnlJZC5nZXQoXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYWlyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBDcmR0IHdpdGggaWQgXCIgKyBtZXNzYWdlUGFpclsxXSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBvbiByZXBsaWNhIFwiICsgcmVjaXBpZW50LmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucmVjZWl2ZShtZXNzYWdlUGFpclswXSwgbWVzc2FnZVBhaXJbMl0pO1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudC52ZWN0b3JDbG9jay5zZXQoc2VuZGVyLmdldFJlcGxpY2FJZCgpLCBtZXNzYWdlUGFpclsyXS5nZXRTZW5kZXJDb3VudGVyKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZGVyTWFwLnNldChyZWNpcGllbnQsIFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxlYXNlQWxsKCkge1xuICAgICAgICBmb3IgKGxldCBzZW5kZXIgb2YgdGhpcy5tZXNzYWdlUXVldWVzLmtleXMoKSkgdGhpcy5yZWxlYXNlKHNlbmRlcik7XG4gICAgfVxufVxuIiwiY29uc29sZS5sb2coXCJSdW5uaW5nIHRlc3RzXCIpO1xucmVxdWlyZSgnLi9jcmR0cy9iYXNpY19jcmR0c190ZXN0cycpO1xucmVxdWlyZSgnLi9jcmR0cy9yZXNldHRhYmxlX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL3N0YW5kYXJkX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL2pzb25fdGVzdHMnKTtcblxuXG4vLyBjb25zdCBob3dMb25nVGlsbEx1bmNoID0gcmVxdWlyZSgnLi4nKTtcbi8vXG4vLyBjbGFzcyBNb2NrRGF0ZSB7XG4vLyBcdHByaXZhdGUgZGF0ZSA9IDA7XG4vLyBcdHByaXZhdGUgaG91cnMgPSAwO1xuLy8gXHRwcml2YXRlIG1pbnV0ZXMgPSAwO1xuLy8gXHRwcml2YXRlIHNlY29uZHMgPSAwO1xuLy8gXHRwcml2YXRlIG1pbGxpc2Vjb25kcyA9IDA7XG4vL1xuLy8gXHRnZXREYXRlICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kYXRlOyB9XG4vLyBcdHNldERhdGUgKGRhdGU6IG51bWJlcik6IHZvaWQgeyB0aGlzLmRhdGUgPSBkYXRlOyB9XG4vLyBcdHNldEhvdXJzIChoOiBudW1iZXIpIHsgdGhpcy5ob3VycyA9IGg7IH1cbi8vIFx0c2V0TWludXRlcyAobTogbnVtYmVyKTogdm9pZCB7IHRoaXMubWludXRlcyA9IG07IH1cbi8vIFx0c2V0U2Vjb25kcyAoczogbnVtYmVyKTogdm9pZCB7IHRoaXMuc2Vjb25kcyA9IHM7IH1cbi8vIFx0c2V0TWlsbGlzZWNvbmRzIChtczogbnVtYmVyKTogdm9pZCB7IHRoaXMubWlsbGlzZWNvbmRzID0gbXM7IH1cbi8vIFx0Z2V0VGltZSAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmFsdWVPZigpOyB9XG4vLyBcdHZhbHVlT2YgKCk6IG51bWJlciB7XG4vLyBcdFx0cmV0dXJuIChcbi8vIFx0XHRcdHRoaXMubWlsbGlzZWNvbmRzICtcbi8vIFx0XHRcdHRoaXMuc2Vjb25kcyAqIDFlMyArXG4vLyBcdFx0XHR0aGlzLm1pbnV0ZXMgKiAxZTMgKiA2MCArXG4vLyBcdFx0XHR0aGlzLmhvdXJzICogMWUzICogNjAgKiA2MCArXG4vLyBcdFx0XHR0aGlzLmRhdGUgKiAxZTMgKiA2MCAqIDYwICogMjRcbi8vIFx0XHQpO1xuLy8gXHR9XG4vL1xuLy8gXHRzdGF0aWMgbm93ICgpIHsgcmV0dXJuIG5vdy52YWx1ZU9mKCk7IH1cbi8vIH1cbi8vXG4vLyBjb25zdCBub3cgPSBuZXcgTW9ja0RhdGUoKTtcbi8vXG4vLyBnbG9iYWwuRGF0ZSA9IE1vY2tEYXRlIGFzIGFueSBhcyB0eXBlb2YgRGF0ZTtcbi8vXG4vLyBmdW5jdGlvbiB0ZXN0KGhvdXJzOiBudW1iZXIsIG1pbnV0ZXM6IG51bWJlciwgc2Vjb25kczogbnVtYmVyLCBleHBlY3RlZDogc3RyaW5nKTogdm9pZCB7XG4vLyBcdG5vdy5zZXRIb3Vycyhob3Vycyk7XG4vLyBcdG5vdy5zZXRNaW51dGVzKG1pbnV0ZXMpO1xuLy8gXHRub3cuc2V0U2Vjb25kcyhzZWNvbmRzKTtcbi8vXG4vLyBcdGFzc2VydC5lcXVhbChob3dMb25nVGlsbEx1bmNoKC4uLmx1bmNodGltZSksIGV4cGVjdGVkKTtcbi8vIFx0Y29uc29sZS5sb2coYFxcdTAwMUJbMzJt4pyTXFx1MDAxQlszOW0gJHtleHBlY3RlZH1gKTtcbi8vIH1cbi8vXG4vLyBsZXQgbHVuY2h0aW1lID0gWyAxMiwgMzAgXTtcbi8vIHRlc3QoMTEsIDMwLCAwLCAnMSBob3VyJyk7XG4vLyB0ZXN0KDEwLCAzMCwgMCwgJzIgaG91cnMnKTtcbi8vIHRlc3QoMTIsIDI1LCAwLCAnNSBtaW51dGVzJyk7XG4vLyB0ZXN0KDEyLCAyOSwgMTUsICc0NSBzZWNvbmRzJyk7XG4vLyB0ZXN0KDEzLCAzMCwgMCwgJzIzIGhvdXJzJyk7XG4vL1xuLy8gLy8gc29tZSBvZiB1cyBsaWtlIGFuIGVhcmx5IGx1bmNoXG4vLyBsdW5jaHRpbWUgPSBbIDExLCAwIF07XG4vLyB0ZXN0KDEwLCAzMCwgMCwgJzMwIG1pbnV0ZXMnKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=