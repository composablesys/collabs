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

/***/ "./node_modules/webpack/buildin/global.js":
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

/***/ "./node_modules/webpack/node_modules/assert/assert.js":
/*!***********************************************!*\
  !*** (webpack)/node_modules/assert/assert.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/webpack/node_modules/object-assign/index.js");

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

var util = __webpack_require__(/*! util/ */ "./node_modules/webpack/node_modules/util/util.js");
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/node_modules/object-assign/index.js":
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

/***/ "./node_modules/webpack/node_modules/process/browser.js":
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

/***/ "./node_modules/webpack/node_modules/util/node_modules/inherits/inherits_browser.js":
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

/***/ "./node_modules/webpack/node_modules/util/support/isBufferBrowser.js":
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

/***/ "./node_modules/webpack/node_modules/util/util.js":
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

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/webpack/node_modules/util/support/isBufferBrowser.js");

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
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/webpack/node_modules/util/node_modules/inherits/inherits_browser.js");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/webpack/node_modules/process/browser.js")))

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
        let timestamp = this.runtime.getNextTimestamp();
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
exports.MapCrdt = exports.AddWinsSet = exports.CrdtObject = exports.GMapInternal = exports.DisableWinsFlag = exports.EnableWinsFlag = exports.NoOpCrdtInternal = exports.IntRegisterCrdt = exports.UnresettableIntRegisterCrdt = void 0;
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
    getNextTimestamp() {
        return this.runtime.getNextTimestamp();
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
function Compoventuals(hi) {
}
exports.default = Compoventuals;


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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/webpack/node_modules/assert/assert.js"));
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/webpack/node_modules/assert/assert.js"));
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/webpack/node_modules/assert/assert.js"));
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/webpack/node_modules/assert/assert.js"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL25vZGVfbW9kdWxlcy9hc3NlcnQvYXNzZXJ0LmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvKHdlYnBhY2spL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3V0aWwvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2Jhc2ljX2NyZHRzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvY3JkdF9jb3JlLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvanNvbi50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL3Jlc2V0dGFibGUudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9zZW1pZGlyZWN0LnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvc3RhbmRhcmQudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL2Jhc2ljX2NyZHRzX3Rlc3RzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL2pzb25fdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvY3JkdHMvcmVzZXR0YWJsZV90ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9zdGFuZGFyZF90ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9ydW50aW1lX2Zvcl90ZXN0aW5nLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7QUNuQkEsOENBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsaUZBQWU7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsK0RBQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsK0ZBQW9COztBQUUvQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsb0dBQVU7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7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T0FBTyxDQUFDLEdBQUcsQ0FDdEMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDcEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDcEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxD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Q0YsMkZBQTJGO0FBQzNGLHdCQUF3QjtBQUN4Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLEVBQUU7QUFDRiwyREFBMkQ7QUFDM0QscURBQXFEO0FBQ3JELElBQUk7QUFDSixFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLDZCQUE2QjtBQUM3Qiw4QkFBOEI7QUFDOUIsZ0NBQWdDO0FBQ2hDLGtDQUFrQztBQUNsQywrQkFBK0I7QUFDL0IsRUFBRTtBQUNGLG9DQUFvQztBQUNwQyx5QkFBeUI7QUFDekIsaUNBQWlDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG4vLyBjb21wYXJlIGFuZCBpc0J1ZmZlciB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvNjgwZTllNWU0ODhmMjJhYWMyNzU5OWE1N2RjODQ0YTYzMTU5MjhkZC9pbmRleC5qc1xuLy8gb3JpZ2luYWwgbm90aWNlOlxuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciB4ID0gYS5sZW5ndGg7XG4gIHZhciB5ID0gYi5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV07XG4gICAgICB5ID0gYltpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuICBpZiAoeSA8IHgpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbmZ1bmN0aW9uIGlzQnVmZmVyKGIpIHtcbiAgaWYgKGdsb2JhbC5CdWZmZXIgJiYgdHlwZW9mIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihiKTtcbiAgfVxuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKTtcbn1cblxuLy8gYmFzZWQgb24gbm9kZSBhc3NlcnQsIG9yaWdpbmFsIG5vdGljZTpcbi8vIE5COiBUaGUgVVJMIHRvIHRoZSBDb21tb25KUyBzcGVjIGlzIGtlcHQganVzdCBmb3IgdHJhZGl0aW9uLlxuLy8gICAgIG5vZGUtYXNzZXJ0IGhhcyBldm9sdmVkIGEgbG90IHNpbmNlIHRoZW4sIGJvdGggaW4gQVBJIGFuZCBiZWhhdmlvci5cblxuLy8gaHR0cDovL3dpa2kuY29tbW9uanMub3JnL3dpa2kvVW5pdF9UZXN0aW5nLzEuMFxuLy9cbi8vIFRISVMgSVMgTk9UIFRFU1RFRCBOT1IgTElLRUxZIFRPIFdPUksgT1VUU0lERSBWOCFcbi8vXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBmdW5jdGlvbnNIYXZlTmFtZXMgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZm9vKCkge30ubmFtZSA9PT0gJ2Zvbyc7XG59KCkpO1xuZnVuY3Rpb24gcFRvU3RyaW5nIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xufVxuZnVuY3Rpb24gaXNWaWV3KGFycmJ1Zikge1xuICBpZiAoaXNCdWZmZXIoYXJyYnVmKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIGdsb2JhbC5BcnJheUJ1ZmZlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBBcnJheUJ1ZmZlci5pc1ZpZXcoYXJyYnVmKTtcbiAgfVxuICBpZiAoIWFycmJ1Zikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoYXJyYnVmIGluc3RhbmNlb2YgRGF0YVZpZXcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoYXJyYnVmLmJ1ZmZlciAmJiBhcnJidWYuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vLyAxLiBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuLy8gQXNzZXJ0aW9uRXJyb3IncyB3aGVuIHBhcnRpY3VsYXIgY29uZGl0aW9ucyBhcmUgbm90IG1ldC4gVGhlXG4vLyBhc3NlcnQgbW9kdWxlIG11c3QgY29uZm9ybSB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS5cblxudmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG5cbi8vIDIuIFRoZSBBc3NlcnRpb25FcnJvciBpcyBkZWZpbmVkIGluIGFzc2VydC5cbi8vIG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IoeyBtZXNzYWdlOiBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCB9KVxuXG52YXIgcmVnZXggPSAvXFxzKmZ1bmN0aW9uXFxzKyhbXlxcKFxcc10qKVxccyovO1xuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9mdW5jdGlvbi5wcm90b3R5cGUubmFtZS9ibG9iL2FkZWVlZWM4YmZjYzYwNjhiMTg3ZDdkOWZiM2Q1YmIxZDNhMzA4OTkvaW1wbGVtZW50YXRpb24uanNcbmZ1bmN0aW9uIGdldE5hbWUoZnVuYykge1xuICBpZiAoIXV0aWwuaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZnVuY3Rpb25zSGF2ZU5hbWVzKSB7XG4gICAgcmV0dXJuIGZ1bmMubmFtZTtcbiAgfVxuICB2YXIgc3RyID0gZnVuYy50b1N0cmluZygpO1xuICB2YXIgbWF0Y2ggPSBzdHIubWF0Y2gocmVnZXgpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV07XG59XG5hc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG4gIHRoaXMubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG4gIHRoaXMuYWN0dWFsID0gb3B0aW9ucy5hY3R1YWw7XG4gIHRoaXMuZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvcjtcbiAgaWYgKG9wdGlvbnMubWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNZXNzYWdlKHRoaXMpO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gIH1cbiAgdmFyIHN0YWNrU3RhcnRGdW5jdGlvbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZ1bmN0aW9uIHx8IGZhaWw7XG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbm9uIHY4IGJyb3dzZXJzIHNvIHdlIGNhbiBoYXZlIGEgc3RhY2t0cmFjZVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICBpZiAoZXJyLnN0YWNrKSB7XG4gICAgICB2YXIgb3V0ID0gZXJyLnN0YWNrO1xuXG4gICAgICAvLyB0cnkgdG8gc3RyaXAgdXNlbGVzcyBmcmFtZXNcbiAgICAgIHZhciBmbl9uYW1lID0gZ2V0TmFtZShzdGFja1N0YXJ0RnVuY3Rpb24pO1xuICAgICAgdmFyIGlkeCA9IG91dC5pbmRleE9mKCdcXG4nICsgZm5fbmFtZSk7XG4gICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgLy8gb25jZSB3ZSBoYXZlIGxvY2F0ZWQgdGhlIGZ1bmN0aW9uIGZyYW1lXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgYmVmb3JlIGl0IChhbmQgaXRzIGxpbmUpXG4gICAgICAgIHZhciBuZXh0X2xpbmUgPSBvdXQuaW5kZXhPZignXFxuJywgaWR4ICsgMSk7XG4gICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcobmV4dF9saW5lICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhY2sgPSBvdXQ7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgaW5zdGFuY2VvZiBFcnJvclxudXRpbC5pbmhlcml0cyhhc3NlcnQuQXNzZXJ0aW9uRXJyb3IsIEVycm9yKTtcblxuZnVuY3Rpb24gdHJ1bmNhdGUocywgbikge1xuICBpZiAodHlwZW9mIHMgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoIDwgbiA/IHMgOiBzLnNsaWNlKDAsIG4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59XG5mdW5jdGlvbiBpbnNwZWN0KHNvbWV0aGluZykge1xuICBpZiAoZnVuY3Rpb25zSGF2ZU5hbWVzIHx8ICF1dGlsLmlzRnVuY3Rpb24oc29tZXRoaW5nKSkge1xuICAgIHJldHVybiB1dGlsLmluc3BlY3Qoc29tZXRoaW5nKTtcbiAgfVxuICB2YXIgcmF3bmFtZSA9IGdldE5hbWUoc29tZXRoaW5nKTtcbiAgdmFyIG5hbWUgPSByYXduYW1lID8gJzogJyArIHJhd25hbWUgOiAnJztcbiAgcmV0dXJuICdbRnVuY3Rpb24nICsgIG5hbWUgKyAnXSc7XG59XG5mdW5jdGlvbiBnZXRNZXNzYWdlKHNlbGYpIHtcbiAgcmV0dXJuIHRydW5jYXRlKGluc3BlY3Qoc2VsZi5hY3R1YWwpLCAxMjgpICsgJyAnICtcbiAgICAgICAgIHNlbGYub3BlcmF0b3IgKyAnICcgK1xuICAgICAgICAgdHJ1bmNhdGUoaW5zcGVjdChzZWxmLmV4cGVjdGVkKSwgMTI4KTtcbn1cblxuLy8gQXQgcHJlc2VudCBvbmx5IHRoZSB0aHJlZSBrZXlzIG1lbnRpb25lZCBhYm92ZSBhcmUgdXNlZCBhbmRcbi8vIHVuZGVyc3Rvb2QgYnkgdGhlIHNwZWMuIEltcGxlbWVudGF0aW9ucyBvciBzdWIgbW9kdWxlcyBjYW4gcGFzc1xuLy8gb3RoZXIga2V5cyB0byB0aGUgQXNzZXJ0aW9uRXJyb3IncyBjb25zdHJ1Y3RvciAtIHRoZXkgd2lsbCBiZVxuLy8gaWdub3JlZC5cblxuLy8gMy4gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gIEFsbCBhc3NlcnRpb24gbWV0aG9kcyBwcm92aWRlXG4vLyBib3RoIHRoZSBhY3R1YWwgYW5kIGV4cGVjdGVkIHZhbHVlcyB0byB0aGUgYXNzZXJ0aW9uIGVycm9yIGZvclxuLy8gZGlzcGxheSBwdXJwb3Nlcy5cblxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZ1bmN0aW9uKSB7XG4gIHRocm93IG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3Ioe1xuICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcbiAgICBzdGFja1N0YXJ0RnVuY3Rpb246IHN0YWNrU3RhcnRGdW5jdGlvblxuICB9KTtcbn1cblxuLy8gRVhURU5TSU9OISBhbGxvd3MgZm9yIHdlbGwgYmVoYXZlZCBlcnJvcnMgZGVmaW5lZCBlbHNld2hlcmUuXG5hc3NlcnQuZmFpbCA9IGZhaWw7XG5cbi8vIDQuIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcbi8vIGJ5ICEhZ3VhcmQuXG4vLyBhc3NlcnQub2soZ3VhcmQsIG1lc3NhZ2Vfb3B0KTtcbi8vIFRoaXMgc3RhdGVtZW50IGlzIGVxdWl2YWxlbnQgdG8gYXNzZXJ0LmVxdWFsKHRydWUsICEhZ3VhcmQsXG4vLyBtZXNzYWdlX29wdCk7LiBUbyB0ZXN0IHN0cmljdGx5IGZvciB0aGUgdmFsdWUgdHJ1ZSwgdXNlXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwodHJ1ZSwgZ3VhcmQsIG1lc3NhZ2Vfb3B0KTsuXG5cbmZ1bmN0aW9uIG9rKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIGZhaWwodmFsdWUsIHRydWUsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5vayk7XG59XG5hc3NlcnQub2sgPSBvaztcblxuLy8gNS4gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoXG4vLyA9PS5cbi8vIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQuZXF1YWwpO1xufTtcblxuLy8gNi4gVGhlIG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHdoZXRoZXIgdHdvIG9iamVjdHMgYXJlIG5vdCBlcXVhbFxuLy8gd2l0aCAhPSBhc3NlcnQubm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPScsIGFzc2VydC5ub3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDcuIFRoZSBlcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgYSBkZWVwIGVxdWFsaXR5IHJlbGF0aW9uLlxuLy8gYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoIV9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgZmFsc2UpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcEVxdWFsJywgYXNzZXJ0LmRlZXBFcXVhbCk7XG4gIH1cbn07XG5cbmFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBkZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoIV9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgdHJ1ZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwU3RyaWN0RXF1YWwnLCBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBzdHJpY3QsIG1lbW9zKSB7XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGlzQnVmZmVyKGFjdHVhbCkgJiYgaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUoYWN0dWFsLCBleHBlY3RlZCkgPT09IDA7XG5cbiAgLy8gNy4yLiBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBEYXRlIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBEYXRlIG9iamVjdCB0aGF0IHJlZmVycyB0byB0aGUgc2FtZSB0aW1lLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNEYXRlKGFjdHVhbCkgJiYgdXRpbC5pc0RhdGUoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMgSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBSZWdFeHAgb2JqZWN0IHdpdGggdGhlIHNhbWUgc291cmNlIGFuZFxuICAvLyBwcm9wZXJ0aWVzIChgZ2xvYmFsYCwgYG11bHRpbGluZWAsIGBsYXN0SW5kZXhgLCBgaWdub3JlQ2FzZWApLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNSZWdFeHAoYWN0dWFsKSAmJiB1dGlsLmlzUmVnRXhwKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuc291cmNlID09PSBleHBlY3RlZC5zb3VyY2UgJiZcbiAgICAgICAgICAgYWN0dWFsLmdsb2JhbCA9PT0gZXhwZWN0ZWQuZ2xvYmFsICYmXG4gICAgICAgICAgIGFjdHVhbC5tdWx0aWxpbmUgPT09IGV4cGVjdGVkLm11bHRpbGluZSAmJlxuICAgICAgICAgICBhY3R1YWwubGFzdEluZGV4ID09PSBleHBlY3RlZC5sYXN0SW5kZXggJiZcbiAgICAgICAgICAgYWN0dWFsLmlnbm9yZUNhc2UgPT09IGV4cGVjdGVkLmlnbm9yZUNhc2U7XG5cbiAgLy8gNy40LiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKChhY3R1YWwgPT09IG51bGwgfHwgdHlwZW9mIGFjdHVhbCAhPT0gJ29iamVjdCcpICYmXG4gICAgICAgICAgICAgKGV4cGVjdGVkID09PSBudWxsIHx8IHR5cGVvZiBleHBlY3RlZCAhPT0gJ29iamVjdCcpKSB7XG4gICAgcmV0dXJuIHN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gSWYgYm90aCB2YWx1ZXMgYXJlIGluc3RhbmNlcyBvZiB0eXBlZCBhcnJheXMsIHdyYXAgdGhlaXIgdW5kZXJseWluZ1xuICAvLyBBcnJheUJ1ZmZlcnMgaW4gYSBCdWZmZXIgZWFjaCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZVxuICAvLyBUaGlzIG9wdGltaXphdGlvbiByZXF1aXJlcyB0aGUgYXJyYXlzIHRvIGhhdmUgdGhlIHNhbWUgdHlwZSBhcyBjaGVja2VkIGJ5XG4gIC8vIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgKGFrYSBwVG9TdHJpbmcpLiBOZXZlciBwZXJmb3JtIGJpbmFyeVxuICAvLyBjb21wYXJpc29ucyBmb3IgRmxvYXQqQXJyYXlzLCB0aG91Z2gsIHNpbmNlIGUuZy4gKzAgPT09IC0wIGJ1dCB0aGVpclxuICAvLyBiaXQgcGF0dGVybnMgYXJlIG5vdCBpZGVudGljYWwuXG4gIH0gZWxzZSBpZiAoaXNWaWV3KGFjdHVhbCkgJiYgaXNWaWV3KGV4cGVjdGVkKSAmJlxuICAgICAgICAgICAgIHBUb1N0cmluZyhhY3R1YWwpID09PSBwVG9TdHJpbmcoZXhwZWN0ZWQpICYmXG4gICAgICAgICAgICAgIShhY3R1YWwgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkgfHxcbiAgICAgICAgICAgICAgIGFjdHVhbCBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheSkpIHtcbiAgICByZXR1cm4gY29tcGFyZShuZXcgVWludDhBcnJheShhY3R1YWwuYnVmZmVyKSxcbiAgICAgICAgICAgICAgICAgICBuZXcgVWludDhBcnJheShleHBlY3RlZC5idWZmZXIpKSA9PT0gMDtcblxuICAvLyA3LjUgRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2UgaWYgKGlzQnVmZmVyKGFjdHVhbCkgIT09IGlzQnVmZmVyKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBtZW1vcyA9IG1lbW9zIHx8IHthY3R1YWw6IFtdLCBleHBlY3RlZDogW119O1xuXG4gICAgdmFyIGFjdHVhbEluZGV4ID0gbWVtb3MuYWN0dWFsLmluZGV4T2YoYWN0dWFsKTtcbiAgICBpZiAoYWN0dWFsSW5kZXggIT09IC0xKSB7XG4gICAgICBpZiAoYWN0dWFsSW5kZXggPT09IG1lbW9zLmV4cGVjdGVkLmluZGV4T2YoZXhwZWN0ZWQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9zLmFjdHVhbC5wdXNoKGFjdHVhbCk7XG4gICAgbWVtb3MuZXhwZWN0ZWQucHVzaChleHBlY3RlZCk7XG5cbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgc3RyaWN0LCBtZW1vcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgc3RyaWN0LCBhY3R1YWxWaXNpdGVkT2JqZWN0cykge1xuICBpZiAoYSA9PT0gbnVsbCB8fCBhID09PSB1bmRlZmluZWQgfHwgYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBpZiBvbmUgaXMgYSBwcmltaXRpdmUsIHRoZSBvdGhlciBtdXN0IGJlIHNhbWVcbiAgaWYgKHV0aWwuaXNQcmltaXRpdmUoYSkgfHwgdXRpbC5pc1ByaW1pdGl2ZShiKSlcbiAgICByZXR1cm4gYSA9PT0gYjtcbiAgaWYgKHN0cmljdCAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYSkgIT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIHZhciBhSXNBcmdzID0gaXNBcmd1bWVudHMoYSk7XG4gIHZhciBiSXNBcmdzID0gaXNBcmd1bWVudHMoYik7XG4gIGlmICgoYUlzQXJncyAmJiAhYklzQXJncykgfHwgKCFhSXNBcmdzICYmIGJJc0FyZ3MpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKGFJc0FyZ3MpIHtcbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBfZGVlcEVxdWFsKGEsIGIsIHN0cmljdCk7XG4gIH1cbiAgdmFyIGthID0gb2JqZWN0S2V5cyhhKTtcbiAgdmFyIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgdmFyIGtleSwgaTtcbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT09IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFfZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBzdHJpY3QsIGFjdHVhbFZpc2l0ZWRPYmplY3RzKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gOC4gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG4vLyBhc3NlcnQubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIGZhbHNlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBFcXVhbCcsIGFzc2VydC5ub3REZWVwRXF1YWwpO1xuICB9XG59O1xuXG5hc3NlcnQubm90RGVlcFN0cmljdEVxdWFsID0gbm90RGVlcFN0cmljdEVxdWFsO1xuZnVuY3Rpb24gbm90RGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgdHJ1ZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwU3RyaWN0RXF1YWwnLCBub3REZWVwU3RyaWN0RXF1YWwpO1xuICB9XG59XG5cblxuLy8gOS4gVGhlIHN0cmljdCBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc3RyaWN0IGVxdWFsaXR5LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbi8vIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PT0nLCBhc3NlcnQuc3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG4vLyAxMC4gVGhlIHN0cmljdCBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciBzdHJpY3QgaW5lcXVhbGl0eSwgYXNcbi8vIGRldGVybWluZWQgYnkgIT09LiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9PScsIGFzc2VydC5ub3RTdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChleHBlY3RlZCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElnbm9yZS4gIFRoZSBpbnN0YW5jZW9mIGNoZWNrIGRvZXNuJ3Qgd29yayBmb3IgYXJyb3cgZnVuY3Rpb25zLlxuICB9XG5cbiAgaWYgKEVycm9yLmlzUHJvdG90eXBlT2YoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIF90cnlCbG9jayhibG9jaykge1xuICB2YXIgZXJyb3I7XG4gIHRyeSB7XG4gICAgYmxvY2soKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGVycm9yID0gZTtcbiAgfVxuICByZXR1cm4gZXJyb3I7XG59XG5cbmZ1bmN0aW9uIF90aHJvd3Moc2hvdWxkVGhyb3csIGJsb2NrLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICB2YXIgYWN0dWFsO1xuXG4gIGlmICh0eXBlb2YgYmxvY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJsb2NrXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGV4cGVjdGVkID09PSAnc3RyaW5nJykge1xuICAgIG1lc3NhZ2UgPSBleHBlY3RlZDtcbiAgICBleHBlY3RlZCA9IG51bGw7XG4gIH1cblxuICBhY3R1YWwgPSBfdHJ5QmxvY2soYmxvY2spO1xuXG4gIG1lc3NhZ2UgPSAoZXhwZWN0ZWQgJiYgZXhwZWN0ZWQubmFtZSA/ICcgKCcgKyBleHBlY3RlZC5uYW1lICsgJykuJyA6ICcuJykgK1xuICAgICAgICAgICAgKG1lc3NhZ2UgPyAnICcgKyBtZXNzYWdlIDogJy4nKTtcblxuICBpZiAoc2hvdWxkVGhyb3cgJiYgIWFjdHVhbCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ01pc3NpbmcgZXhwZWN0ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgdmFyIHVzZXJQcm92aWRlZE1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZyc7XG4gIHZhciBpc1Vud2FudGVkRXhjZXB0aW9uID0gIXNob3VsZFRocm93ICYmIHV0aWwuaXNFcnJvcihhY3R1YWwpO1xuICB2YXIgaXNVbmV4cGVjdGVkRXhjZXB0aW9uID0gIXNob3VsZFRocm93ICYmIGFjdHVhbCAmJiAhZXhwZWN0ZWQ7XG5cbiAgaWYgKChpc1Vud2FudGVkRXhjZXB0aW9uICYmXG4gICAgICB1c2VyUHJvdmlkZWRNZXNzYWdlICYmXG4gICAgICBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHxcbiAgICAgIGlzVW5leHBlY3RlZEV4Y2VwdGlvbikge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ0dvdCB1bndhbnRlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICBpZiAoKHNob3VsZFRocm93ICYmIGFjdHVhbCAmJiBleHBlY3RlZCAmJlxuICAgICAgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fCAoIXNob3VsZFRocm93ICYmIGFjdHVhbCkpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cblxuLy8gMTEuIEV4cGVjdGVkIHRvIHRocm93IGFuIGVycm9yOlxuLy8gYXNzZXJ0LnRocm93cyhibG9jaywgRXJyb3Jfb3B0LCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cyh0cnVlLCBibG9jaywgZXJyb3IsIG1lc3NhZ2UpO1xufTtcblxuLy8gRVhURU5TSU9OISBUaGlzIGlzIGFubm95aW5nIHRvIHdyaXRlIG91dHNpZGUgdGhpcyBtb2R1bGUuXG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MoZmFsc2UsIGJsb2NrLCBlcnJvciwgbWVzc2FnZSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uKGVycikgeyBpZiAoZXJyKSB0aHJvdyBlcnI7IH07XG5cbi8vIEV4cG9zZSBhIHN0cmljdCBvbmx5IHZhcmlhbnQgb2YgYXNzZXJ0XG5mdW5jdGlvbiBzdHJpY3QodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09Jywgc3RyaWN0KTtcbn1cbmFzc2VydC5zdHJpY3QgPSBvYmplY3RBc3NpZ24oc3RyaWN0LCBhc3NlcnQsIHtcbiAgZXF1YWw6IGFzc2VydC5zdHJpY3RFcXVhbCxcbiAgZGVlcEVxdWFsOiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsLFxuICBub3RFcXVhbDogYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLFxuICBub3REZWVwRXF1YWw6IGFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWxcbn0pO1xuYXNzZXJ0LnN0cmljdC5zdHJpY3QgPSBhc3NlcnQuc3RyaWN0O1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgfHxcbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXNjcmlwdG9yc1trZXlzW2ldXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXlzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICB9O1xuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbnZhciBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbCgndXRpbC5wcm9taXNpZnkuY3VzdG9tJykgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydHMucHJvbWlzaWZ5ID0gZnVuY3Rpb24gcHJvbWlzaWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sICYmIG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF0pIHtcbiAgICB2YXIgZm4gPSBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInV0aWwucHJvbWlzaWZ5LmN1c3RvbVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICBmdW5jdGlvbiBmbigpIHtcbiAgICB2YXIgcHJvbWlzZVJlc29sdmUsIHByb21pc2VSZWplY3Q7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBwcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBwcm9taXNlUmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuXG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZm4sIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICBmbixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKVxuICApO1xufVxuXG5leHBvcnRzLnByb21pc2lmeS5jdXN0b20gPSBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xcblxuZnVuY3Rpb24gY2FsbGJhY2tpZnlPblJlamVjdGVkKHJlYXNvbiwgY2IpIHtcbiAgLy8gYCFyZWFzb25gIGd1YXJkIGluc3BpcmVkIGJ5IGJsdWViaXJkIChSZWY6IGh0dHBzOi8vZ29vLmdsL3Q1SVM2TSkuXG4gIC8vIEJlY2F1c2UgYG51bGxgIGlzIGEgc3BlY2lhbCBlcnJvciB2YWx1ZSBpbiBjYWxsYmFja3Mgd2hpY2ggbWVhbnMgXCJubyBlcnJvclxuICAvLyBvY2N1cnJlZFwiLCB3ZSBlcnJvci13cmFwIHNvIHRoZSBjYWxsYmFjayBjb25zdW1lciBjYW4gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAvLyBcInRoZSBwcm9taXNlIHJlamVjdGVkIHdpdGggbnVsbFwiIG9yIFwidGhlIHByb21pc2UgZnVsZmlsbGVkIHdpdGggdW5kZWZpbmVkXCIuXG4gIGlmICghcmVhc29uKSB7XG4gICAgdmFyIG5ld1JlYXNvbiA9IG5ldyBFcnJvcignUHJvbWlzZSB3YXMgcmVqZWN0ZWQgd2l0aCBhIGZhbHN5IHZhbHVlJyk7XG4gICAgbmV3UmVhc29uLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZWFzb24gPSBuZXdSZWFzb247XG4gIH1cbiAgcmV0dXJuIGNiKHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICB9XG5cbiAgLy8gV2UgRE8gTk9UIHJldHVybiB0aGUgcHJvbWlzZSBhcyBpdCBnaXZlcyB0aGUgdXNlciBhIGZhbHNlIHNlbnNlIHRoYXRcbiAgLy8gdGhlIHByb21pc2UgaXMgYWN0dWFsbHkgc29tZWhvdyByZWxhdGVkIHRvIHRoZSBjYWxsYmFjaydzIGV4ZWN1dGlvblxuICAvLyBhbmQgdGhhdCB0aGUgY2FsbGJhY2sgdGhyb3dpbmcgd2lsbCByZWplY3QgdGhlIHByb21pc2UuXG4gIGZ1bmN0aW9uIGNhbGxiYWNraWZpZWQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG1heWJlQ2IgPSBhcmdzLnBvcCgpO1xuICAgIGlmICh0eXBlb2YgbWF5YmVDYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxhc3QgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtYXliZUNiLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICAvLyBJbiB0cnVlIG5vZGUgc3R5bGUgd2UgcHJvY2VzcyB0aGUgY2FsbGJhY2sgb24gYG5leHRUaWNrYCB3aXRoIGFsbCB0aGVcbiAgICAvLyBpbXBsaWNhdGlvbnMgKHN0YWNrLCBgdW5jYXVnaHRFeGNlcHRpb25gLCBgYXN5bmNfaG9va3NgKVxuICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXQpIHsgcHJvY2Vzcy5uZXh0VGljayhjYiwgbnVsbCwgcmV0KSB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVqKSB7IHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2tpZnlPblJlamVjdGVkLCByZWosIGNiKSB9KTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihjYWxsYmFja2lmaWVkLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2FsbGJhY2tpZmllZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbCkpO1xuICByZXR1cm4gY2FsbGJhY2tpZmllZDtcbn1cbmV4cG9ydHMuY2FsbGJhY2tpZnkgPSBjYWxsYmFja2lmeTtcbiIsImltcG9ydCB7Q2F1c2FsVGltZXN0YW1wLCBDcmR0UnVudGltZX0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcbmltcG9ydCB7Q3JkdEludGVybmFsLCBDcmR0fSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcblxuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gYWRkL2FkZGVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAwIGFkZHM/XG4gKi9cbmV4cG9ydCBjbGFzcyBDb3VudGVySW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogbnVtYmVyLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICByZXR1cm4gW3N0YXRlICsgbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBDb3VudGVySW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBjb3VudGVyIENSRFQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgYWRkZWQuXG4gKlxuICogV2FybmluZzogYWRkaXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5leHBvcnQgY2xhc3MgQ291bnRlckNyZHQgZXh0ZW5kcyBDcmR0PG51bWJlcj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IG51bWJlcikge1xuICAgICAgICBzdXBlcihpZCwgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBhZGQuICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIGNvdW50ZXIudmFsdWUgKz0gbiBhbmQgY291bnRlci52YWx1ZSAtPSBuIHdvcmtcbiAgICAgKiBhcyBleHBlY3RlZCAoY29udmVydGVkIHRvIENSRFQgYWRkaXRpb25zKS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFkZChuZXdWYWx1ZSAtIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gbXVsdGlwbHkvbXVsdGlwbGllZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMSBtdWx0cz9cbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRSZWdpc3RlckludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IG51bWJlciwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSAqIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTXVsdFJlZ2lzdGVySW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBudW1lcmljYWwgcmVnaXN0ZXIgQ1JEVCB3aXRoIG11bHRpcGxpY2F0aW9uIG9wZXJhdGlvbnMuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgbXVsdGlwbGllZC5cbiAqXG4gKiBXYXJuaW5nOiBtdWx0aXBsaWNhdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmV4cG9ydCBjbGFzcyBNdWx0UmVnaXN0ZXJDcmR0IGV4dGVuZHMgQ3JkdDxudW1iZXI+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoaWQsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIG11bHQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBtdWx0aXBsaWNhdGlvbi4gIEFzIGEgY29uc2VxdWVuY2UsXG4gICAgICogcmVnaXN0ZXIudmFsdWUgKj0gbiBhbmQgcmVnaXN0ZXIudmFsdWUgLz0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIG11bHRpcGxpY2F0aW9ucykuXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjdXJyZW50IHZhbHVlIGlzIDAuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltcG9zc2libGUgdG8gc2V0IHRvIG5vbnplcm8gdmFsdWUgd2hlbiBjdXJyZW50IHZhbHVlIGlzIHplcm9cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJldHVybjsgLy8gMCAtPiAwIGlzIG5vLW9wXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tdWx0KG5ld1ZhbHVlIC8gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIE9wZXJhdGlvbnMgYW5kIG1lc3NhZ2VzIGFyZSB0aGUgZWxlbWVudCB0byBhZGQuICBUT0RPOlxuICogdGhpcyBtZWFucyB0aGF0IGFkZGluZyBudWxsIHdvbid0IHdvcmsgYXMgR1NldENyZHQgd2lsbCB0cmVhdFxuICogaXRzIG1lc3NhZ2UgYXMgYSBuby1vcC4gIERlc2NyaXB0aW9uIGlzIHRoZSBlbGVtZW50IGFkZGVkXG4gKiAoaWYgaXQncyByZWR1bmRhbnQsIGRlc2NyaXB0aW9uIGlzIG51bGwsIHNvIG9uY2hhbmdlIHdvbid0XG4gKiBzZWUgYW55dGhpbmcpLlxuICovXG5jbGFzcyBHU2V0SW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8U2V0PGFueT4+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBTZXQ8YW55Pik6IFNldDxhbnk+IHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhKSByZXR1cm4gbmV3IFNldDxhbnk+KGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNldDxhbnk+KCk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBhbnksIHN0YXRlOiBTZXQ8YW55Pikge1xuICAgICAgICBpZiAoc3RhdGUuaGFzKG9wZXJhdGlvbikpIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBhbnksIHN0YXRlOiBTZXQ8YW55PiwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NldDxhbnk+LCBhbnldIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBHU2V0SW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIGdyb3ctb25seSBzZXQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBhcnJheSBvZiBlbGVtZW50cyBhZGRlZFxuICogKFtdIG9yIFthZGRlZCBlbGVtZW50XSkuXG4gKlxuICogVE9ETzogYWRkaW5nIGEgbnVsbCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gKiBUT0RPOiBhZGQgYSB0eXBlIGFubm90YXRpb25cbiAqIFRPRE86IHNhbWUgaW50ZXJmYWNlIGFzIEpTIFNldFxuICovXG5leHBvcnQgY2xhc3MgR1NldENyZHQgZXh0ZW5kcyBDcmR0PFNldDxhbnk+PiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogU2V0PGFueT4pIHtcbiAgICAgICAgc3VwZXIoaWQsIEdTZXRJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBhZGQoZWxlbWVudDogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChlbGVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBzZXQuICBUaGlzIHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSA6IFNldDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQodGhpcy5zdGF0ZSk7XG4gICAgfVxufVxuXG5jbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDxUPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTZXQ8W1QsIGFueSwgbnVtYmVyXT4+IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGluaXRpYWwgdmFsdWUgdG8gc2V0LlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IFQpOiBTZXQ8W1QsIGFueSwgbnVtYmVyXT4ge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTZXQoW1tpbml0aWFsRGF0YSwgbnVsbCwgLTFdXSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcInNldFwiLCB2YWx1ZV06IHNldCB0byB0aGUgZ2l2ZW4gc2luZ2xlIHZhbHVlLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0LCBzZXR0aW5nIHRoZSB2YWx1ZSBzZXQgdG8gW10uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgX3N0YXRlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtzdHJpbmcsIGFueT9dLCBfc3RhdGU6IFNldDxbVCwgYW55LCBudW1iZXJdPiwgX3JlcGxpY2FJZDogYW55KSB7XG4gICAgICAgIGlmICghKChvcGVyYXRpb25bMF0gPT09IFwic2V0XCIgJiYgb3BlcmF0aW9uWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgfHwgb3BlcmF0aW9uWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybmVkIGRlc2NyaXB0aW9uIGlzOlxuICAgICAqIC0gZm9yIHNldCBtZXNzYWdlLCBbXCJzZXRcIiwgc2V0IHZhbHVlXSAoZXZlbiBpZiBpdFxuICAgICAqIGRvZXNuJ3QgZWxpbWluYXRlIGFsbCBjYXVzYWxseSBwcmlvciB2YWx1ZXMpLlxuICAgICAqIC0gZm9yIHJlc2V0cywgW1wicmVzZXRcIl0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtzdHJpbmcsIGFueT9dLCBzdGF0ZTogU2V0PFtULCBhbnksIG51bWJlcl0+LCBfcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NldDxbVCwgYW55LCBudW1iZXJdPiwgYW55XSB7XG4gICAgICAgIGlmICghKChtZXNzYWdlWzBdID09PSBcInNldFwiICYmIG1lc3NhZ2VbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB8fCBtZXNzYWdlWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSA9PT0gbnVsbCkgc3RhdGUuZGVsZXRlKHZhbHVlKTsvL2luaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQodmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSB2YWx1ZVsyXSkgc3RhdGUuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gXCJzZXRcIikge1xuICAgICAgICAgICAgc3RhdGUuYWRkKFttZXNzYWdlWzFdLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXI8VD4gZXh0ZW5kcyBDcmR0PFNldDxbVCwgYW55LCBudW1iZXJdPj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IFQpIHtcbiAgICAgICAgc3VwZXIoaWQsXG4gICAgICAgICAgICBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSBhcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDxUPixcbiAgICAgICAgICAgIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJzZXRcIiwgdmFsdWVdKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlU2V0KCk6IFNldDxUPiB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0PFQ+KCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUpIHZhbHVlcy5hZGQodmFsdWVbMF0pO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInJlc2V0XCJdKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxuICAgIC8vIFRPRE86IHJlc2V0IHN0cm9uZ1xufVxuIiwiaW1wb3J0IHtDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lLCBDcmR0TWVzc2FnZUxpc3RlbmVyfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG4vLyBUT0RPOiBpZHMgYXMgc3RyaW5ncyBpbnN0ZWFkIG9mIGFueVxuXG4vKipcbiAqIEludGVyZmFjZSBkZXNjcmliaW5nIHRoZSBpbnRlcm5hbCB3b3JraW5ncyBvZiBhIENSRFQgaW4gdGhlXG4gKiBwcmVwYXJlL2VmZmVjdCBzdHlsZSBvZiBcIlB1cmUgT3BlcmF0aW9uLUJhc2VkIFJlcGxpY2F0ZWQgRGF0YSBUeXBlc1wiXG4gKiBieSBCYXF1ZXJvIGV0IGFsLiAgVGhpcyBpbnRlcmZhY2UgaXMgYWxzbyBpbnNwaXJlZCBieSBTaGFyZURCJ3MgT1RcbiAqIHR5cGVzIChodHRwczovL2dpdGh1Yi5jb20vb3R0eXBlcy9kb2NzKS5cbiAqIEBwYXJhbSBTIFRoZSBDUkRUJ3Mgc3RhdGUgdHlwZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpbml0aWFsIHN0YXRlLCBwb3NzaWJseSBiYXNpbmcgaXRzIHZhbHVlXG4gICAgICogb2ZmIG9mIGluaXRpYWxEYXRhLiAgTm90ZSB0aGF0IGlmIHN0YXRlcyBjYW4gYmUgbXV0YXRlZFxuICAgICAqIGJ5IGVmZmVjdCwgdGhlbiBlYWNoIHJldHVybmVkIHN0YXRlIHNob3VsZCBiZSBhIGZyZXNoXG4gICAgICogb2JqZWN0LlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgQSB2YWx1ZSB1c2VkIHRvIG9wdGlvbmFsbHkgc2V0IHRoZSBzdGF0ZSdzXG4gICAgICogaW5pdGlhbCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuICBBIGZyZXNoIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBnaXZlbiBvcGVyYXRpb24sIHBvc3NpYmx5XG4gICAgICogcmVhZGluZyB0aGUgY3VycmVudCBzdGF0ZSBhbmQgaXNzdWluZyByZXBsaWNhIGlkLlxuICAgICAqIE1lc3NhZ2VzIGFuZCBvcGVyYXRpb25zIHdpbGwgaGF2ZSBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpY1xuICAgICAqIGZvcm0uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gQW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZGVzY3JpcHRpb24gb2ZcbiAgICAgKiB0aGUgb3BlcmF0aW9uLlxuICAgICAqIEBwYXJhbSAgc3RhdGUgVGhlIGN1cnJlbnQgc3RhdGUsIHdoaWNoIG1heSBiZSByZWFkIHRvIGRldGVybWluZVxuICAgICAqIHRoZSBtZXNzYWdlLiAgVGhpcyBzaG91bGQgbm90IGJlIG11dGF0ZWQuXG4gICAgICogQHBhcmFtIHJlcGxpY2FJZCBUaGUgaWQgb2YgdGhlIHJlcGxpY2EgaXNzdWluZyB0aGlzIG9wZXJhdGlvbixcbiAgICAgKiB3aGljaCBtYXkgYmUgcmVhZCB0byBkZXRlcm1pbmUgdGhlIG1lc3NhZ2UuXG4gICAgICogQHJldHVybiBBbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBkZXNjcmlwdGlvbiBvZiB0aGUgcmVzdWx0aW5nXG4gICAgICogbWVzc2FnZS4gIE5vdGUgdGhpcyB3aWxsIGJlIHNlbnQgb24gdGhlIHdpcmUgdXNpbmcgVE9ET1xuICAgICAqIChzZXJpYWxpemF0aW9uKS5cbiAgICAgKiBUaGUgbWVzc2FnZSBtc3V0IGJlIG51bGwgb25seSBpZiB0aGlzIG9wZXJhdGlvbiBkb2VzIG5vdFxuICAgICAqIGNoYW5nZSB0aGUgaW50ZXJuYWwgc3RhdGUsIHNpbmNlIGlmIHRoZSBtZXNzYWdlIGlzIG51bGwsXG4gICAgICogQ3JkdCB3aWxsIHNraXAgc2VuZGluZyB0aGUgbWVzc2FnZSB0byBvdGhlciByZXBsaWNhcy5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogYW55LCBzdGF0ZTogUywgcmVwbGljYUlkOiBhbnkpOiBhbnk7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgZ2l2ZW4gbWVzc2FnZSB0byB0aGUgc3RhdGUsIHJldHVybmluZyB0aGVcbiAgICAgKiByZXN1bHRpbmcgc3RhdGUgYXMgd2VsbCBhcyBhIGRlc2NyaXB0aW9uIG9mIHRoZSByZXN1bHRpbmdcbiAgICAgKiBjaGFuZ2UuICBNZXNzYWdlcyBhcmUgYXNzdW1lZCB0byBiZSBkZWxpdmVyZWQgaW4gY2F1c2FsXG4gICAgICogb3JkZXIuICBGb3IgZWZmaWNpZW5jeSwgdGhlIGlucHV0IHN0YXRlIHdpbGxcbiAgICAgKiBub3QgYmUgcmV1c2VkLCBzbyBhbiBpbXBsZW1lbnRhdGlvbiBpcyBmcmVlIHRvIG11dGF0ZVxuICAgICAqIGl0IGluLXBsYWNlIGFuZCByZXR1cm4gaXQuXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgVGhlIG1lc3NhZ2UgdG8gYmUgYXBwbGllZCwgY29taW5nIGZyb21cbiAgICAgKiBzb21lIHJlcGxpY2EncyBwcmVwYXJlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSAgc3RhdGUgICAgIFRoZSBpbnB1dCBzdGF0ZS5cbiAgICAgKiBAcGFyYW0gcmVwbGljYUlkIFRoZSBpZCBvZiB0aGUgcmVwbGljYSBhcHBseWluZyB0aGlzIG9wZXJhdGlvblxuICAgICAqIChub3QgdGhlIGlkIG9mIHRoZSByZXBsaWNhIHRoYXQgaXNzdWVkIHRoaXMgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtICB0aW1lc3RhbXAgVGhlIG1lc3NhZ2UncyBjYXVzYWwgdGltZXN0YW1wLiAgTm90ZSB0aGF0XG4gICAgICogYmVjYXVzZSBzZXZlcmFsIENSRFRzIGNhbiBzaGFyZSB0aGUgc2FtZSBydW50aW1lLCB0aW1lc3RhbXBzXG4gICAgICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gICAgICogbWlnaHQgc2tpcCBudW1iZXJzKS4gIEhvd2V2ZXIsIGNhdXNhbGx5IG9yZGVyZWQgZGVsaXZlcnkgaXNcbiAgICAgKiBzdGlsbCBndWFyYW50ZWVkLiAgSWYgd2UgYXJlIHByb2Nlc3Npbmcgb3VyIG93biBtZXNzYWdlXG4gICAgICogKGkuZS4sIHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSwgdGhlbiBpdCBpc1xuICAgICAqIGd1YXJhbnRlZWQgdGhhdCB0aGUgbWVzc2FnZSBpcyBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yXG4gICAgICogbWVzc2FnZXMuICBJdCBpcyBwb3NzaWJsZSB0aGF0IG11bHRpcGxlIG1lc3NhZ2VzIHNoYXJlIHRoZSBzYW1lXG4gICAgICogdGltZXN0YW1wOyBpZiBzbywgdGhleSBhcmUgdG90YWxseSBvcmRlcmVkIGJ5IHRoZSBjYXVzYWwgb3JkZXIsXG4gICAgICogdGhleSB3aWxsIGFsbCBiZSBkZWxpdmVyZWQgaW4gYSByb3cgaW4gY2F1c2FsIG9yZGVyLCBhbmQgdGhlXG4gICAgICogdGltZXN0YW1wIGFjY3VyYXRlbHkgcmVmbGVjdHMgdGhlaXIgY2F1c2FsIHJlbGF0aW9uc2hpcCB0b1xuICAgICAqIG90aGVyIG1lc3NhZ2VzIChpbiBwYXJ0aWN1bGFyLCB0aGV5IGFsbCBzaGFyZSB0aGUgc2FtZSBjYXVzYWxcbiAgICAgKiByZWxhdGlvbnNoaXBzIHdpdGggb3RoZXIgbWVzc2FnZXMpLlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtUaGUgb3V0cHV0IHN0YXRlLCBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpY1xuICAgICAqIGRlc2NyaXB0aW9uIG9mIHRoZSBjaGFuZ2UuXSAgVGhlIGRlc2NyaXB0aW9uIHdpbGwgYmUgcGFzc2VkXG4gICAgICogdG8gdGhlIGFwcGxpY2F0aW9uIHVzaW5nIHRoaXMgQ1JEVCBzbyB0aGV5IGtub3cgd2hhdCBvY2N1cnJlZC5cbiAgICAgKiBJZGVhbGx5LCBpdCBzaG91bGQgYmUgZGVzY3JpYmVkIGluIHRlcm1zIG9mIG9yZGluYXJ5IGRhdGFcbiAgICAgKiB0eXBlIG9wZXJhdGlvbnMsIHNvIHRoYXQgYXBwbGljYXRpb25zIGNhbiB1bmRlcnN0YW5kIHRoZSBjaGFuZ2VcbiAgICAgKiB3aXRob3V0IG5lZWRpbmcgdG8gdW5kZXJzdGFuZCB0aGUgQ1JEVCdzIHNlbWFudGljcy5cbiAgICAgKiBUaGUgZGVzY3JpcHRpb24gbXVzdCBiZSBudWxsIG9ubHkgaWYgdGhlIGV4dGVybmFsbHkgdmlzaWJsZVxuICAgICAqIHN0YXRlIGlzIHVuY2hhbmdlZCxcbiAgICAgKiBzaW5jZSBDcmR0IHdpbGwgc2tpcCBjYWxsaW5nIG9uY2hhbmdlIGlmIGRlc2NyaXB0aW9uIGlzIG51bGwuXG4gICAgICogKFRoZSBjb252ZXJzZS0tLWlmIHRoZSBzdGF0ZSB3YXMgdW5jaGFuZ2VkLCB0aGVuIGRlc2NyaXB0aW9uXG4gICAgICogaXMgbnVsbC0tLW5lZWQgbm90IGhvbGQsIGFsdGhvdWdoIGl0IGlzIG5pY2UgaWYgaXQgZG9lcy4pXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IGFueSwgc3RhdGU6IFMsIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBhbnldO1xufVxuXG4vKipcbiAqIEFuIGV2ZW50IGlzc3VlZCB3aGVuIGEgQ1JEVCBpcyBjaGFuZ2VkIGJ5IGFub3RoZXIgcmVwbGljYS5cbiAqIEBwYXJhbSBjYWxsZXIgICAgICBUaGUgQ3JkdCBpbnN0YW5jZSB0aGF0IHdhcyBjaGFuZ2VkLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NycHRpb24gb2YgdGhlIGNoYW5nZS5cbiAqIEBwYXJhbSB0aW1lc3RhbXAgICBUaGUgY2F1c2FsIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLiBOb3RlIHRoYXRcbiAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICogc3RpbGwgZ3VhcmFudGVlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHRDaGFuZ2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNhbGxlcjogQ3JkdDxhbnk+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb246IGFueSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7IH1cbn1cblxuLy8gVXNlci1mYWNpbmcgd3JhcHBlcnMgYXJvdW5kIENSRFRzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzcyxcbi8vIGFkZGluZyBtZXRob2RzIGZvciB0aGUgQ1JEVCdzIG9wZXJhdGlvbnMgKGUuZy4sIGluY3JlbWVudCgpKVxuLy8gd2hpY2ggY2FsbCB0aGlzIGNsYXNzJ3MgYXBwbHkgbWV0aG9kLlxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhcHBsaWNhdGlvbi1mYWNpbmcgQ1JEVCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJbnN0ZWFkIG9mIGV4cG9zaW5nIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbnMgZGlyZWN0bHksXG4gKiB3aGljaCBoYXZlIGFuIHVuZnJpZW5kbHkgcHJlcGFyZS9lZmZlY3QgaW50ZXJmYWNlLFxuICogZWFjaCBDUkRUIGltcGxlbWVudGF0aW9uIHNob3VsZCBkZWZpbmUgYSBzdWJjbGFzcyBvZiB0aGlzXG4gKiBjbGFzcyB3aXRoIG9yZGluYXJ5LWxvb2tpbmcgbWV0aG9kcyB0byBwZXJmb3JtIG9wZXJhdGlvbnNcbiAqIGFuZCBxdWVyeSB0aGUgc3RhdGUuICBNZXRob2RzIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyBzaG91bGRcbiAqIGNhbGwgYXBwbHlPcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIENyZHRJbnRlcm5hbCBvcGVyYXRpb24uXG4gKiBUaGlzIGNsYXNzIHRoZW4gYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgYW5kIHJlY2VpdmluZ1xuICogb2YgbWVzc2FnZXMuXG4gKiBDZi4gQWxnb3JpdGhtIDEgaW4gdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBwYXBlci5cbiAqIEBwYXJhbSBTIFRoZSBzdGF0ZSB0eXBlIG9mIEMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0PFM+IGltcGxlbWVudHMgQ3JkdE1lc3NhZ2VMaXN0ZW5lciB7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgQ3JkdEludGVybmFsIHN0YXRlLiAgVGhpcyBzaG91bGQgbm90XG4gICAgICogYmUgbXV0YXRlZCBkaXJlY3RseSBidXQgbWF5IGJlIHJlYWQgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0XG4gICAgICogdGhlIHN0YXRlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdGF0ZTogUztcbiAgICAvKipcbiAgICAgKiBTZXQgdGhpcyB0byBsaXN0ZW4gZm9yIHdoZW4gYW5vdGhlciByZXBsaWNhIHVwZGF0ZXNcbiAgICAgKiB0aGlzIG9iamVjdCdzIHN0YXRlLlxuICAgICAqL1xuICAgIG9uY2hhbmdlIDogKGV2ZW50OiBDcmR0Q2hhbmdlRXZlbnQpID0+IHZvaWQgPSAoKF8pID0+IHt9KTtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIGNyZHRJbnRlcm5hbCAgICBUaGUgQ3JkdEludGVybmFsIHRvIHVzZS4gIE5vdGUgdGhhdCBzaW5jZVxuICAgICAqIENyZHRJbnRlcm5hbCdzIGRvbid0IHN0b3JlIHN0YXRlcywgbXVsdGlwbGUgb2JqZWN0cyBtYXlcbiAgICAgKiBzaGFyZSB0aGUgc2FtZSBDcmR0SW50ZXJuYWwgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICBPcHRpb25hbCBpbml0aWFsIGRhdGEgdG8gdXNlIHdoZW5cbiAgICAgKiBzZXR0aW5nIHRoZSBDcmR0SW50ZXJuYWwncyBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBpZDogYW55LCBwdWJsaWMgcmVhZG9ubHkgY3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNyZHRJbnRlcm5hbC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZGVzY3JpYmUgXCJ0cmFuc2FjdGlvbnNcIi4gIFJpZ2h0IHdvcmQ/ICBSZW5hbWVcbiAgICAvLyBcImF0b21pY1wiIHN0dWZmIGJlbG93LiAgTXVzdCBoYXBwZW4gc3luY2hyb25vdXNseSBzb1xuICAgIC8vIHRoYXQgcnVudGltZS5nZXRUaW1lc3RhbXAoKSBkb2Vzbid0IGNoYW5nZSBhbmRcbiAgICAvLyBubyBtZXNzYWdlcyBhcmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXG4gICAgLy8gQWxsb3cgY2FsbGVyIHRvIHN0YXJ0L2VuZCB0cmFuc2FjdGlvbnM/XG4gICAgcHJpdmF0ZSBpblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbk1lc3NhZ2VzOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbkRlc2NyaXB0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByb3RlY3RlZCBzdGFydFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmV0dXJucyB0aGUgZGVzY3JpcHRpb25zICh0cmFuc2xhdGVkKVxuICAgIHByb3RlY3RlZCBlbmRUcmFuc2FjdGlvbigpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZCh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMsIHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzID0gW107XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHRoZSBnaXZlbiBvcGVyYXRpb24gdG8gdGhlIHN0YXRlLCB1c2luZyBwcmVwYXJlIGFuZCBlZmZlY3QsXG4gICAgICogYW5kIHNlbmRzIHRoZSBnZW5lcmF0ZWQgbWVzc2FnZSBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIElmIGEgdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MsIHRoaXMgc2VuZGluZyBpcyBkZWxheWVkXG4gICAgICogdW50aWxcbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBUaGUgb3BlcmF0aW9uIHRvIGFwcGx5LlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY2hhbmdlcy5cbiAgICAgKiBUaGlzIGlzIHRoZSBsaXN0IG9mIGluZGl2aWR1YWwgbWVzc2FnZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiBlZmZlY3QgKHNraXBwaW5nIG51bGwgbWVzc2FnZXMpLFxuICAgICAqIGFmdGVyIGJlaW5nIHBhc3NlZCB0aHJvdWdoIHRyYW5zbGF0ZURlc2NyaXB0aW9uLiAgQW4gZXhjZXB0aW9uXG4gICAgICogaXMgdGhhdCBpZiBhbGwgbWVzc2FnZXMgYXJlXG4gICAgICogbnVsbCwgbnVsbCBpcyByZXR1cm5lZCB3aXRob3V0IGNhbGxpbmcgdHJhbnNsYXRlRGVzY3JpcHRpb24uXG4gICAgICogVE9ETzogbnVsbCBpZiBpbiBhIHRyYW5zYWN0aW9uICh1c2UgZW5kVHJhbnNhY3Rpb24gaW5zdGVhZCkuXG4gICAgICogVE9ETzogYnV0IHdoYXQgaWYgd2Ugd2FudCBpdCB0byBkZWNpZGUgd2hhdCB0byBkbyBuZXh0P1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIGxldCBvd25UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgb3duVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKCk7XG4gICAgICAgIGxldCBtZXNzYWdlID0gdGhpcy5jcmR0SW50ZXJuYWwucHJlcGFyZShvcGVyYXRpb24sIHRoaXMuc3RhdGUsXG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCkpO1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG93blRyYW5zYWN0aW9uKSByZXR1cm4gdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gdHJhbnNsYXRlIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogQ3JkdEludGVybmFsIGJlZm9yZSBwYXNzaW5nIGl0IHRvIG9uY2hhbmdlLiAgVGhpcyBpc1xuICAgICAqIHVzZWZ1bCBmb3Igc2VtaWRpcmVjdCBwcm9kdWN0cyBiZWNhdXNlIHRoZSBkZWZhdWx0XG4gICAgICogU2VtaWRpcmVjdEludGVybmFsIGRlc2NyaXB0aW9ucyBhcmUgbm90IHVzZXItZnJpZW5kbHkuXG4gICAgICogSWYgdGhpcyBtZXRob2QgcmV0dXJucyBudWxsLCBvbmNoYW5nZSBpcyBub3QgY2FsbGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50aW9uIHJldHVybnMgZGVzY3JpcHRpb25zWzBdLiAgSXQgaXNcbiAgICAgKiBhcHByb3ByaWF0ZSB3aGVuIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdCBhbHJlYWR5IHJldHVybnNcbiAgICAgKiB1c2VyLWZyaWVuZGx5IGRlc2NyaXB0aW9ucyBhbmQgYXBwbHlPcHMgaXMgb25seSBldmVyIGNhbGxlZFxuICAgICAqIHdpdGggc2luZ2xlIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGRlc2NyaXB0aW9ucyBBIGxpc3Qgb2YgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdC4gIFRoaXMgd2lsbCBhbHdheXMgYmUgbm9uLWVtcHR5LlxuICAgICAqIEByZXR1cm4gVGhlIHRyYW5zbGF0ZWQgZGVzY3JpcHRpb24gdG8gcGFzcyB0byB0aGlzLm9uY2hhbmdlLFxuICAgICAqIG9yIG51bGwgaWYgdGhpcy5vbmNoYW5nZSBzaG91bGQgbm90IGJlIGNhbGxlZC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9uczogQXJyYXk8YW55Pik6IGFueSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIG9ic2VydmVkIHJlc2V0c1xuICAgICAqIGZvciB3aGVuIGEgQ3JkdE9iamVjdCBjb250YWluaW5nIHRoaXMgQ3JkdCBpc1xuICAgICAqIHJlc2V0LiAgVGhlXG4gICAgICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHN1Y2ggbWFwIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgICAqIHRvIGNhdXNlIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgICogbXVzdCBzYXRpc2Z5OlxuICAgICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgICAqIC0gd2hlbiBhcHBsaWVkIHRvIGEgc3RhdGUgd2hpY2ggaGFzIG5vdCByZWNlaXZlZCBhbnlcbiAgICAgKiBtZXNzYWdlcyBjYXVzYWxseSBwcmlvciB0byB0aGUgdGltZXN0YW1wLCBpdCBoYXNcbiAgICAgKiBubyBlZmZlY3QuICBJbiBvdGhlciB3b3JkcywgYXBwbHlpbmcgaXQgdG8gYSBjb25jdXJyZW50bHlcbiAgICAgKiBpbml0aWFsaXplZCBzdGF0ZSBoYXMgbm8gZWZmZWN0LlxuICAgICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgbWVzc2FnZXMgaW5zdGVhZCwgZm9yIGdlbmVyYWxpdHk/XG4gICAgICovXG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub250cml2aWFsIG9ic2VydmVkLXJlc2V0cy5cbiAgICAgKiBVbmxpa2UgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCksIHRoZXJlIGFyZSBubyBzcGVjaWFsXG4gICAgICogcmVxdWlyZW1lbnRzIChvdGhlciB0aGFuIHRoZSB1c3VhbCBDcmR0IGNvbW11dGF0aXZpdHkpLlxuICAgICAqIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBvYnNlcnZlZC1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXQoKTogdm9pZCB7IH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub250cml2aWFsIHN0cm9uZy1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKi9cbiAgICByZXNldFN0cm9uZygpOiB2b2lkIHsgfVxuICAgIC8vIC8qKlxuICAgIC8vICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIHN0cm9uZyByZXNldHMuICBUaGVcbiAgICAvLyAgKiBkZWZhdWx0IHJldHVybnMgbnVsbCwgc28gcmVzZXRzIGRvIG5vdGhpbmcuXG4gICAgLy8gICogQHJldHVybiBBIG1lc3NhZ2UgKG5vdCBvcGVyYXRpb24pIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG9cbiAgICAvLyAgKiB0aGlzIENyZHQgdG9nZXRoZXIgd2l0aCBhbnkgdGltZXN0YW1wXG4gICAgLy8gICogdG8gY2F1c2UgYSBzdHJvbmctcmVzZXQgb3BlcmF0aW9uLCBvciBudWxsIHRvIGRvXG4gICAgLy8gICogbm90aGluZy4gIEZvciB0aGlzIENyZHRcbiAgICAvLyAgKiB0byBiZSBjb3JyZWN0IChldmVudHVhbGx5IGNvbnNpc3RlbnQpIHdoZW4gdXNlZCBhcyBhXG4gICAgLy8gICogcHJvcGVydHkgaW4gYW4gQ3JkdE9iamVjdCwgdGhlIHJldHVybmVkIG1lc3NhZ2VcbiAgICAvLyAgKiBtdXN0IHNhdGlzZnk6XG4gICAgLy8gICogLSB3aGVuIHBhaXJlZCB3aXRoIGFueSBDYXVzYWxUaW1lc3RhbXAsIGl0IGNvbW11dGVzIHdpdGhcbiAgICAvLyAgKiBjb25jdXJyZW50IG1lc3NhZ2VzICh1c3VhbCBDcmR0IHJlcXVpcmVtZW50KSwgaW5jbHVkaW5nXG4gICAgLy8gICogY29uY3VycmVudCByZXNldHMgYW5kIHN0cm9uZy1yZXNldHMuXG4gICAgLy8gICogT3RoZXJ3aXNlLCBpdCBpcyBmcmVlIHRvIGhhdmUgYW55IHNlbWFudGljcywgaW5jbHVkaW5nXG4gICAgLy8gICogZG9pbmcgbm90aGluZy4gIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgIC8vICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgIC8vICAqIHRoZSBzdHJvbmctcmVzZXQgc2VtYW50aWNzLlxuICAgIC8vICAqL1xuICAgIC8vIGdldFVuaXZlcnNhbFJlc2V0U3Ryb25nTWVzc2FnZSgpOiBhbnkge1xuICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3IgdGhpcy5ydW50aW1lIHdoZW4gYW4gYXRvbWljIGxpc3Qgb2ZcbiAgICAgKiBtZXNzYWdlcyBpcyByZWNlaXZlZCBmcm9tIGFub3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICByZWNlaXZlKG1lc3NhZ2VzOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7XG4gICAgICAgIGlmICh0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluIHRyYW5zYWN0aW9uOyB0aGUgdHJhbnNhY3Rpb24gbXVzdCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYmUgZW5kZWQgc3luY2hyb25vdXNseSBzbyB0aGF0IG1lc3NhZ2VzIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJjYW5ub3QgYmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLCB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbmNoYW5nZSAmJiBkZXNjcmlwdGlvbnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucyk7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25jaGFuZ2UobmV3IENyZHRDaGFuZ2VFdmVudCh0aGlzLCB0cmFuc2xhdGVkLCB0aW1lc3RhbXApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENyZHRPYmplY3QsIE1hcENyZHQsIEVuYWJsZVdpbnNGbGFnLCBJbnRSZWdpc3RlckNyZHQsIEFkZFdpbnNTZXQgfSBmcm9tIFwiLi9zdGFuZGFyZFwiO1xuaW1wb3J0IHsgQ3JkdCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuaW1wb3J0IHsgTXVsdGlWYWx1ZVJlZ2lzdGVyIH0gZnJvbSBcIi4vYmFzaWNfY3JkdHNcIjtcbmltcG9ydCB7IENyZHRSdW50aW1lIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcblxuaW50ZXJmYWNlIEpzb25JbmRleFR5cGUge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEpzb25DcmR0IGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIENyZHQ8YW55Pj4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYm9vbGVhbnM6IE1hcENyZHQ8c3RyaW5nLCBFbmFibGVXaW5zRmxhZz47XG4gICAgLy8gVE9ETzogZHdGbGFncyB0b28/XG4gICAgcHJpdmF0ZSByZWFkb25seSBudW1iZXJzOiBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN0cmluZ3M6IE1hcENyZHQ8c3RyaW5nLCBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPj47XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZXRzOiBNYXBDcmR0PHN0cmluZywgQWRkV2luc1NldDxhbnk+PjtcbiAgICAvLyBUT0RPOiBSV1NldHMgdG9vP1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb2JqZWN0czogTWFwQ3JkdDxzdHJpbmcsIEpzb25DcmR0PjtcbiAgICAvLyBUT0RPOiBhcnJheXMgKHNlcXVlbmNlcykuICBVc2VzIG1hcHMgZm9yIG5vdy5cbiAgICAvLyBUT0RPOiBudWxscz9cblxuICAgIC8vIFRPRE86IGFiaWxpdHkgdG8gcGFzcyBpbml0aWFsIHZhbHVlICh3aGljaCBpcyBub3Qgc3luY2VkKS5cbiAgICAvLyBNb3JlIGdlbmVyYWxseSwgYWJpbGl0eSB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24geW91clxuICAgIC8vIHByZWRlZmluZWQgcHJvcGVydGllcyB0aGF0IGFyZSBub3Qgc3luY2VkP1xuICAgIC8vIFVzZSB0aGUgZXhpc3RpbmcgZmxhZyBhbmQgYmxvY2sgbWVzc2FnZXMgaW4gQ3JkdE9iamVjdC5cbiAgICBjb25zdHJ1Y3RvcihjcmR0SWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoY3JkdElkLCBydW50aW1lKTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYm9vbGVhbnMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwiYm9vbGVhbnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEVuYWJsZVdpbnNGbGFnKGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm51bWJlcnMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwibnVtYmVyc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmluZ3MgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwic3RyaW5nc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0cyA9IG5ldyBNYXBDcmR0KFxuICAgICAgICAgICAgXCJzZXRzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBBZGRXaW5zU2V0KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwib2JqZWN0c1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgSnNvbkNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBDcmR0IHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgc3RvcmluZ1xuICAgICAqIHZhbHVlcyB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdHlwZUluZGljYXRvcixcbiAgICAgKiBvciB1bmRlZmluZWQgaWYgdGhlIGtleSBpcyBub3QgcHJlc2VudCAoaW5jbHVkaW5nXG4gICAgICogaWYgaXQgcHJldmlvdXNseSB3YXMgcHJlc2VudCBidXQgd2FzIHJlbW92ZWQpLlxuICAgICAqIChVc2UgaW5pdCBpbnN0ZWFkIGlmIHlvdSB3YW50IGEgZ3VhcmFudGVlZC1kZWZpbmVkXG4gICAgICogcmV0dXJuIHZhbHVlLilcbiAgICAgKiAoVE9ETzogZXhwbGFpbiBrZXlzIGFyZVxuICAgICAqIHNlZ3JlZ2F0ZWQgYnkgdmFsdWUgdHlwZSkuXG4gICAgICogRS5nLiBnZXQoXCJhXCIsIDApIHRvIGdldCB0aGUgbnVtYmVyIHZhbHVlIHdpdGgga2V5IDAuXG4gICAgICogU3RhbmRhcmQgdHlwZUluZGljYXRvciB2YWx1ZXM6XG4gICAgICogLSBmYWxzZTogYm9vbGVhbiAoRW5hYmxlV2luc0ZsYWcpXG4gICAgICogLSAwOiBudW1iZXIgKEludFJlZ2lzdGVyQ3JkdClcbiAgICAgKiAtIFwiXCI6IHN0cmluZyAoTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4pXG4gICAgICogLSBuZXcgU2V0KCk6IHNldCAoQWRkV2luc1NldClcbiAgICAgKiAtIHt9OiBvYmplY3QgKEpzb25DcmR0KVxuICAgICAqXG4gICAgICogVE9ETzogZXhwbGljdGx5IHR5cGVkIHZlcnNpb25zPyAgQ2FuIHdlIGRvIHRoaXMgY2xldmVybHlcbiAgICAgKiB3aXRoIGdlbmVyaWNzIGFuZCB0eXBlIHBvbHltb3JwaGlzbSBvciBzb21ldGhpbmc/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmdldChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXMoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmhhcyhrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogdGhpcy5ib29sZWFucy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiB0aGlzLm51bWJlcnMuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogdGhpcy5zdHJpbmdzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5vYmplY3RzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpa2UgZ2V0LCBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlIHZhbHVlIENyZHQsXG4gICAgICogcmV0dXJucyBpdHMgdmFsdWUuICBOb3RlIGZvciBzdHJpbmdzLCBpZiB0aGUgQ3JkdFxuICAgICAqIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgdmFsdWUgKGVpdGhlciBvciAyKyksXG4gICAgICogd2hpY2ggaXMgcG9zc2libGUgZHVlIHRvIHRoZSBNdWx0aVZhbHVlUmVnaXN0ZXJcbiAgICAgKiBzZW1hbnRpY3MsIHdlIHJldHVybiB0aGUgc2V0IG9mIGFsbCBjdXJyZW50IHZhbHVlc1xuICAgICAqIGluc3RlYWQgb2YgYSBzaW5nbGUgc3RyaW5nLlxuICAgICAqXG4gICAgICogVE9ETzogdXNlIGdlbmVyaWNzIHRvIHNheSB0aGF0IHJldHVybiB2YWx1ZSBpc1xuICAgICAqIHNhbWUgYXMgdHlwZUluZGljYXRvciB0eXBlIHwgdW5kZWZpbmVkP1xuICAgICAqIFdvcmtzIGV4Y2VwdCBmb3Igc3RyaW5ncyxcbiAgICAgKiB3aGljaCBjb3VsZCBpbnN0ZWFkIHJldHVybiBhIFNldDxzdHJpbmc+LlxuICAgICAqIENvdWxkIGluc3RlYWQgaGF2ZSBzcGVjaWZpY2FsbHkgdHlwZWQgdmVyc2lvbnMgb2YgdGhlIG1ldGhvZC5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZShrZXk6IHN0cmluZywgdHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCk6XG4gICAgICAgICAgICBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHwgU2V0PHN0cmluZz4gfCBTZXQ8YW55PiB8IE9iamVjdCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLmdldChrZXksIHR5cGVJbmRpY2F0b3IpO1xuICAgICAgICBpZiAodmFsdWVDcmR0ID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlQ3JkdCBpbnN0YW5jZW9mIE11bHRpVmFsdWVSZWdpc3Rlcikge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVNldCA9IHZhbHVlQ3JkdC52YWx1ZVNldDtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTZXQuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTZXQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZVNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlQ3JkdC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcy9yZXZpdmVzIHRoZSBnaXZlbiBrZXkgd2l0aCB0aGUgaW5kaWNhdGVkIHR5cGUgaWZcbiAgICAgKiBuZWVkZWQsIG1ha2luZyBpdCBwcmVzZW50IGluIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHRoZSB2YWx1ZSBDcmR0LlxuICAgICAqL1xuICAgIGluaXQoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgLy8gVE9ETzogY2FuIHdlIGdlbmVyaWZ5IHRoaXMgZnVuY3Rpb24gcGF0dGVybj9cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5pbml0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5pbml0KGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgdG8gYSBjb3B5IG9mIHRoZSBnaXZlblxuICAgICAqIChub24tQ3JkdCkgdmFsdWUsIHVzaW5nIHRoZSBDcmR0J3MgLnZhbHVlID0gbWV0aG9kLlxuICAgICAqIFRoaXMgZ2VuZXJhbGx5IGhhcyB0aGUgZWZmZWN0IG9mIHJlc2V0dGluZyB0aGUgY3VycmVudCBDcmR0XG4gICAgICogYW5kIHRoZW4gcGVyZm9ybWluZyBvcGVyYXRpb25zIHRvIGRyaXZlIGl0IHRvIHRoZSBkZXNpcmVkXG4gICAgICogdmFsdWUuICBJZiB5b3Ugd2FudCBtb3JlIGNvbnRyb2wgb3ZlciBob3cgdGhlIHZhbHVlIGlzIHNldFxuICAgICAqIChlLmcuLCBwYXNzaW5nIGFuIG9wdGlvbiB0byBKc29uQ3JkdC5nZXRBc09iamVjdCB3aGVuIHNldHRpbmdcbiAgICAgKiBhbiBvYmplY3QncyB2YWx1ZSksIHlvdSBjYW4gaW5zdGVhZCBnZXQgdGhlIENyZHQgd2l0aFxuICAgICAqIHRoaXMuaW5pdChrZXksIHZhbHVlKSBhbmQgdGhlbiBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaXRcbiAgICAgKiBkaXJlY3RseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB2YWx1ZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIHZhbHVlIENyZHQgKHRoaXMuZ2V0KGtleSwgdmFsdWUpKS5cbiAgICAgKi9cbiAgICBzZXRWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLnNldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZhbHVlSW50ZXJuYWwoa2V5OiBzdHJpbmcsIHZhbHVlOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLmluaXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHZhbHVlQ3JkdC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWVDcmR0O1xuICAgIH1cblxuICAgIGtleXNCeVR5cGUodHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmtleXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmtleXMoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBBcnJheSBvZiBba2V5LCB0eXBlIG5hbWVdIHBhaXJzXG4gICAgICovXG4gICAga2V5cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuYm9vbGVhbnMua2V5cygpKSByZXN1bHQucHVzaChba2V5LCBcImJvb2xlYW5cIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5udW1iZXJzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJudW1iZXJcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zdHJpbmdzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJzdHJpbmdcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zZXRzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJzZXRcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5vYmplY3RzLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJvYmplY3RcIl0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIFRPRE86IGRlbGV0ZVxuICAgIC8vIFRPRE86IGRlbGV0ZVN0cm9uZyAob25jZSBtYXAgc3VwcG9ydHMgaXQuICBQZXJoYXBzIHRocm93XG4gICAgLy8gZXJyb3Igb24gbWFwIHZhbHVlcyBvbmx5PylcblxuICAgIHN0YXRpYyByZWFkb25seSBFcnJvck9uQ29uZmxpY3QgPSAxO1xuICAgIHN0YXRpYyByZWFkb25seSBQcmVmaXhUeXBlcyA9IDI7XG4gICAgc3RhdGljIHJlYWRvbmx5IEV4cGFuZE9uQ29uZmxpY3QgPSAzO1xuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrS2V5Q29uZmxpY3RSdWxlKGtleUNvbmZsaWN0UnVsZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMgfHxcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkVycm9yT25Db25mbGljdCB8fFxuICAgICAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBrZXlDb25mbGljdFJ1bGU6IFwiICtcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoaXMgQ3JkdCdzIHZhbHVlIGluIE9iamVjdCBmb3JtLlxuICAgICAqIENoYW5naW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBDcmR0IHN0YXRlLlxuICAgICAqIE5vdGUgdGhhdCBzZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gSmF2YXNjcmlwdCBTZXRzLFxuICAgICAqIHJlc3VsdGluZyBpbiBhIG5vdC1xdWl0ZS1KU09OIGZvcm1hdCBvYmplY3QuXG4gICAgICogQSBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVyIGlzIGNvbnZlcnRlZCB0byBhIHN0cmluZyBpZiBpdCBoYXNcbiAgICAgKiBhIHNpbmdsZSB2YWx1ZTsgb3RoZXJ3aXNlICgwIG9yIDIrIHZhbHVlcykgaXRcbiAgICAgKiBpcyBjb252ZXJ0ZWQgdG8gYSBTZXQ8c3RyaW5nPlxuICAgICAqIChBcnJheTxzdHJpbmc+IGlmIHNldHNBc0FycmF5cz10cnVlKVxuICAgICAqIG9mIGFsbCBjdXJyZW50IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5Q29uZmxpY3RSdWxlPUpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgKiBQb2xpY3kgZm9yIGhhbmRsaW5nIGtleXMgb2YgZGlmZmVyZW50IHR5cGVzIHRoYXQgaGF2ZSB0aGVcbiAgICAgKiBzYW1lIG5hbWUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KTogdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3QuXG4gICAgICogLSBQcmVmaXhUeXBlczogcHJlZml4IHRoZSB0eXBlIG5hbWUgZm9sbG93ZWQgYnkgXCI6XCIgdG8gZWFjaCBrZXksXG4gICAgICogZS5nLiBcIm51bWJlcjpteUtleVwiLiAgVHlwZSBuYW1lcyBhcmUgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsXG4gICAgICogXCJzdHJpbmdcIiwgXCJzZXRcIiwgXCJvYmplY3RcIi5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IGlmIHRoZXJlIGlzIGEgY29uZmxpY3Qgb25cbiAgICAgKiBhIGtleSwgc2V0IGl0cyB2YWx1ZSB0byBlcXVhbCBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIG9mXG4gICAgICogdGhlIGNvbmZsaWN0aW5nIHZhbHVlcywgcGx1cyBhIGZsYWcgXCJqc29uQ3JkdEtleUV4cGFuZGVkID0gdHJ1ZVwiLiAgRS5nLlxuICAgICAqIFwibXlLZXlcIjoge1wianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLCBcInN0cmluZ1wiOiBcInN0cmluZ1ZhbHVlXCIsXG4gICAgICogXCJudW1iZXJcIjogN31cbiAgICAgKiBAcGFyYW0gc2V0c0FzQXJyYXlzID0gZmFsc2UgSWYgdHJ1ZSwgU2V0IHZhbHVlcyBhcmUgY29udmVydGVkXG4gICAgICogdG8gYXJyYXlzLCBzbyB0aGF0IHRoZSByZXN1bHRpbmcgT2JqZWN0IGlzIGluIHJlZ3VsYXIgSlNPTlxuICAgICAqIGZvcm1hdC4gIFRoaXMgaW5jbHVkZXMgU2V0PHN0cmluZz4gdmFsdWVzIHJlc3VsdGluZyBmcm9tXG4gICAgICogc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlcnMgdGhhdCBoYXZlIDAgb3IgMisgdmFsdWVzLlxuICAgICAqL1xuICAgIGdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCxcbiAgICAgICAgICAgIHNldHNBc0FycmF5cyA9IGZhbHNlKTogT2JqZWN0IHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgbGV0IG9iamVjdDogSnNvbkluZGV4VHlwZSA9IHt9O1xuICAgICAgICAvLyBNYXBzIGtleXMgdG8gdGhlIG5hbWUgb2YgdGhlaXIgZmlyc3QgdHlwZVxuICAgICAgICBsZXQga2V5c1NvRmFyID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgICAgbGV0IGNvbmZsaWN0ZWRLZXlzU29GYXIgPSBuZXcgU2V0PFN0cmluZz4oKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLmJvb2xlYW5zLCBcImJvb2xlYW5cIixcbiAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlLnZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5udW1iZXJzLCBcIm51bWJlclwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gdmFsdWUudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLnN0cmluZ3MsIFwic3RyaW5nXCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLnZhbHVlU2V0O1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc2l6ZSA9PT0gMSkgcmV0dXJuIHJlc3VsdC52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gKHNldHNBc0FycmF5cz8gWy4uLnJlc3VsdC52YWx1ZXMoKV06IHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5zZXRzLCBcInNldFwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gKHNldHNBc0FycmF5cz8gWy4uLnZhbHVlLnZhbHVlXTogdmFsdWUudmFsdWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5vYmplY3RzLCBcIm9iamVjdFwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gdmFsdWUuZ2V0QXNPYmplY3Qoa2V5Q29uZmxpY3RSdWxlLCBzZXRzQXNBcnJheXMpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIHByaXZhdGUgZ2V0QXNPYmplY3RJbnRlcm5hbDxWIGV4dGVuZHMgQ3JkdDxhbnk+PihcbiAgICAgICAgb2JqZWN0OiBKc29uSW5kZXhUeXBlLCBrZXlzU29GYXI6IE1hcDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIGNvbmZsaWN0ZWRLZXlzU29GYXI6IFNldDxTdHJpbmc+LCBrZXlDb25mbGljdFJ1bGU6IG51bWJlcixcbiAgICAgICAgbWFwOiBNYXBDcmR0PHN0cmluZywgVj4sIHR5cGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHZhbHVlRnVuYzogKHZhbHVlQ3JkdDogVikgPT4gYW55KSB7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBtYXAua2V5cygpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUZ1bmMobWFwLmdldChrZXkpIGFzIFYpO1xuICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbdHlwZU5hbWUgKyBcIjpcIiArIGtleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIEtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIGlmIChrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUga2V5OiBcIiArIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB3aGVuIGtleUNvbmZsaWN0UnVsZT1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkpzb25DcmR0LkVycm9yT25Db25mbGljdFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmZsaWN0ZWRLZXlzU29GYXIuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4cGFuZCB0aGUgZXhpc3RpbmcgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZsaWN0ZWRLZXlzU29GYXIuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhwYW5kZWQ6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFtrZXlzU29GYXIuZ2V0KGtleSkgYXMgc3RyaW5nXSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBleHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAob2JqZWN0W2tleV0gYXMgSnNvbkluZGV4VHlwZSlbdHlwZU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8ga2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBrZXlzU29GYXIuc2V0KGtleSwgdHlwZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGlzIG9iamVjdCBhbmQgdGhlbiBwZXJmb3JtcyBvcGVyYXRpb25zIHRvXG4gICAgICogZHJpdmUgaXRzIHZhbHVlIHRvIHRoZSBnaXZlbiBKU09OLWxpa2UgT2JqZWN0LlxuICAgICAqIFByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGJvb2xlYW5zLCBudW1iZXJzLCBzdHJpbmdzLFxuICAgICAqIFNldHMsIG9yIG9iamVjdHMgYXJlIGlnbm9yZWQ7IG9iamVjdHMgYmVzaWRlcyBTZXRzXG4gICAgICogYXJlIHByb2Nlc3NlZCByZWN1cnNpdmVseS5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBJZiBuZXdWYWx1ZSBjb21lcyBmcm9tIGEgSnNvbkNyZHQncyAudmFsdWUgb3IgZ2V0QXNPYmplY3RcbiAgICAgKiBtZXRob2RzLCBub3RlIHRoYXQgc2V0cy9hcnJheXMgb2Ygc3RyaW5ncyByZXN1bHRpbmcgZnJvbVxuICAgICAqIG11bHRpLXZhbHVlIHJlZ2lzdGVycyB3aWxsIGJlIHRyZWF0ZWQgYXMgc2V0cywgbm90XG4gICAgICogc3RyaW5nIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbmV3VmFsdWUgVGhlIHZhbHVlIHRvIHNldCB0by5cbiAgICAgKiBAcGFyYW0gbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3RcbiAgICAgKiBJZiBuZXdWYWx1ZSB3YXMgZ2VuZXJhdGVkIGJ5IGdldEFzT2JqZWN0LCB0aGUga2V5Q29uZmxpY3RSdWxlXG4gICAgICogdXNlZCB0byBnZW5lcmF0ZSBpdCwgc28gdGhhdCB3ZSBjYW4gdW5kbyB0aGUgZWZmZWN0XG4gICAgICogb2YgdGhhdCBydWxlLiAgT3B0aW9uczpcbiAgICAgKiAtIEVycm9yT25Db25mbGljdCAoZGVmYXVsdCk6IGtleXMgYW5kIHZhbHVlcyBhcmUgdXNlZCBsaXRlcmFsbHksXG4gICAgICogd2l0aCBpbmZlcnJlZCB0eXBlcy5cbiAgICAgKiBUaGlzIGlzIGFwcHJvcHJpYXRlIGZvciBPYmplY3RzIG5vdCBjb21pbmcgZnJvbSBhIEpzb25DcmR0J3NcbiAgICAgKiBnZXRBc09iamVjdCBmdW5jdGlvbiwgaW4gd2hpY2ggd2Ugd2FudCB0byBrZWVwIGtleXMgYXNcbiAgICAgKiB0aGV5IGFyZS5cbiAgICAgKiAtIFByZWZpeFR5cGVzOiBUeXBlcyBhcmUgdGFrZW4gZnJvbSBwcmVmaXhlcyBvbiBrZXlzLiAgSWYgYVxuICAgICAqIGtleSBkb2VzIG5vdCBoYXZlIGEgdHlwZSBwcmVmaXgsIGl0IGlzIGlnbm9yZWQuXG4gICAgICogLSBFeHBhbmRPbkNvbmZsaWN0OiBvYmplY3RzIHdpdGggYSBwcm9wZXJ0eSBcImpzb25DcmR0S2V5RXhwYW5kZWRcIiBzZXRcbiAgICAgKiB0byB0cnVlIGFyZSBpbnRlcnByZXRlZCBhcyB0aGUgcmVzdWx0IG9mIGV4cGFuZGluZyBhXG4gICAgICoga2V5IGR1ZSB0byBhIGNvbmZsaWN0LiAgSWYgc3VjaCBhbiBvYmplY3QgZG9lcyBub3QgaGF2ZVxuICAgICAqIHRoZSBleHBlY3RlZCBmb3JtYXQsIGFueSBwcm9wZXJ0aWVzIHdpdGggdW5yZWNvZ25pemVkIG5hbWVzXG4gICAgICogYXJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgc2V0VG9PYmplY3QobmV3VmFsdWU6IE9iamVjdCwgbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5tZXJnZU9iamVjdEludGVybmFsKG5ld1ZhbHVlLCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBvcGVyYXRpb25zIHRvIGRyaXZlIHRoaXMgQ3JkdCdzIHZhbHVlIHRvIHRoZVxuICAgICAqIGdpdmVuIEpTT04tbGlrZSBPYmplY3QncyBzdGF0ZSwgYnV0IHdpdGhvdXQgcmVzZXR0aW5nXG4gICAgICogdGhlIGN1cnJlbnQgdmFsdWUuICBUaGUgbWFpbiBlZmZlY3Qgb2YgdGhpcyBpcyB0b1xuICAgICAqIG1lcmdlIGtleXM7IGluIGNhc2Ugb2Yga2V5IGNvbmZsaWN0cywgdGhlIHZhbHVlcyBhcmUgbWVyZ2VkXG4gICAgICogaW4gYSB0eXBlLXNwZWNpZmljIHdheSAoVE9ETzogZGV0YWlscykuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgaXMgbm90IGEgbWVyZ2UgaW4gdGhlIHNlbnNlIG9mIGEgc3RhdGUtYmFzZWQgQ3JkdC5cbiAgICAgKiBJbnN0ZWFkLCBpdCB0aGUgQ3JkdCB2ZXJzaW9uIG9mIG1lcmdpbmcgb3JkaW5hcnkgKG5vbi1DcmR0KVxuICAgICAqIE9iamVjdHMsIGJ5IHJlY3Vyc2l2ZWx5IGNvbWJpbmluZyB0aGVpciBrZXktdmFsdWUgcGFpcnMuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiBzZXRUb09iamVjdCBmb3IgZGlzY2xhaW1lcnMgYW5kXG4gICAgICogb3RoZXJLZXlDb25mbGljdFJ1bGUuXG4gICAgICpcbiAgICAgKiBUT0RPOiByZXR1cm4gbGlzdCBvZiBjaGFuZ2VzP1xuICAgICAqIEBwYXJhbSAgb3RoZXIgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIG1lcmdlT2JqZWN0KG90aGVyOiBPYmplY3QsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBwcml2YXRlIG1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXI6IEpzb25JbmRleFR5cGUsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIEpzb25DcmR0LmNoZWNrS2V5Q29uZmxpY3RSdWxlKG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcblxuICAgICAgICAvLyBFeHRyYWN0IHByb3BlcnRpZXMgYXMgYW4gYXJyYXkgb2YgW25hbWUsIHR5cGUsIHZhbHVlXVxuICAgICAgICBsZXQgcHJvcGVydGllczogQXJyYXk8W3N0cmluZywgc3RyaW5nLCBhbnldPiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBvdGhlcikge1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IG90aGVyW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGxldCB0eXBlOiBzdHJpbmc7XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gcHJvcE5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBwcm9wTmFtZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBwcm9wTmFtZS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gTXVsdGktdmFsdWVkIHN0cmluZ3MgYXJlIHRyZWF0ZWQgYXMgc2V0c1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChbcHJvcE5hbWUsIHR5cGUsIG90aGVyW3Byb3BOYW1lXV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm90ZSBwcm9wZXJ0aWVzIG1heSBncm93IGR1cmluZyBleGVjdXRpb24gZHVlIHRvXG4gICAgICAgIC8vIHVucGFja2luZyBleHBhbmRlZCBrZXlzLlxuICAgICAgICBsZXQgb3JpZ2luYWxMZW5ndGggPSBwcm9wZXJ0aWVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvcE5hbWUgPSBwcm9wZXJ0aWVzW2ldWzBdO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBwcm9wZXJ0aWVzW2ldWzFdO1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IHByb3BlcnRpZXNbaV1bMl07XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgYW4gZXhwYW5kZWQga2V5XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QgJiZcbiAgICAgICAgICAgICAgICAgICAgaSA8IG9yaWdpbmFsTGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW1wianNvbkNyZHRLZXlFeHBhbmRlZFwiXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFVucGFjayB0aGUgb2JqZWN0IG9udG8gdGhlIGVuZCBvZiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZXhwYW5kZWROYW1lIGluIHByb3BWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwYW5kZWROYW1lICE9PSBcImpzb25DcmR0S2V5RXhwYW5kZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKFtwcm9wTmFtZSwgZXhwYW5kZWROYW1lLCBwcm9wVmFsdWVbZXhwYW5kZWROYW1lXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgcHJvcGVydHksIGNoZWNraW5nIHRoYXQgaXQncyB0eXBlXG4gICAgICAgICAgICAgICAgLy8gaXMgb25lIHdlIGV4cGVjdC5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0OiBtZXJnZVxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuaW5pdChwcm9wTmFtZSwge30pIGFzIEpzb25DcmR0KS5tZXJnZU9iamVjdEludGVybmFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZSwgb3RoZXJLZXlDb25mbGljdFJ1bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBib29sZWFuLCBudW1iZXIsIHN0cmluZzogb3ZlcndyaXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlSW50ZXJuYWwocHJvcE5hbWUsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gXCJzZXRcIiAmJiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQ6IGFkZCBhbGwgdmFsdWVzIGluIHNldFxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0Q3JkdCA9IHRoaXMuaW5pdChwcm9wTmFtZSwgbmV3IFNldCgpKSBhcyBBZGRXaW5zU2V0PGFueT47XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHByb3BWYWx1ZSkgc2V0Q3JkdC5hZGQoZW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbHNlIHNraXAgdGhlIGVudHJ5IChub3QgYSByZWNvZ25pemVkIHR5cGUpLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuZ2V0QXNPYmplY3QoKS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXNPYmplY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuc2V0QXNPYmplY3QobmV3VmFsdWUpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuc2V0VG9PYmplY3QobmV3VmFsdWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENyZHQsIENyZHRJbnRlcm5hbCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuaW1wb3J0IHsgU2VtaWRpcmVjdFN0YXRlLCBTZW1pZGlyZWN0SW50ZXJuYWwgfSBmcm9tIFwiLi9zZW1pZGlyZWN0XCI7XG5pbXBvcnQgeyBDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcblxuLy8gVE9ETzogaG93IHRvIGRvIGdhcmJhZ2UgY29sbGVjdGlvbiBvZiByZXNldC13aW5zIG9wZXJhdGlvbnM/XG4vLyBFLmcuIGZvciBmbGFncyBpbiBhIHNldDogZ2FyYmFnZSBjb2xsZWN0aW9uIHdpbGwgZmFpbCBpZlxuLy8gdGhlcmUgYXJlIHJlc2V0LXdpbnMgb3BzIGluIHRoZSBoaXN0b3J5LCBhcyBpdCBzaG91bGQsIGJ1dFxuLy8gd2Ugd291bGQgbGlrZSB0byBnYXJiYWdlIGNvbGxlY3QgYW55d2F5IG9uY2UgYWxsIHRoZSByZXNldC13aW5zXG4vLyBhcmUgY2F1c2FsbHkgc3RhYmxlLlxuZXhwb3J0IGNsYXNzIFJlc2V0V2luc0NvbXBvbmVudDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmVzZXRJbml0aWFsRGF0YTogYW55KSB7IH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogUykge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBhbHdheXMgXCJyZXNldFwiLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBzdHJpbmcsIF9zdGF0ZTogUywgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgc3RyaW5nXSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdGUgd2Ugc2hvdWxkIHJldHVybiBhIGNsb25lIG9mIHRoZSByZXNldCBzdGF0ZSwgbm90XG4gICAgICAgIC8vIGEgZml4ZWQgXCJyZXNldCBzdGF0ZVwiLCBzaW5jZSB0aGUgcmV0dXJuZWQgc3RhdGUgbWF5XG4gICAgICAgIC8vIGJlIG11dGF0ZWQgbGF0ZXIuXG4gICAgICAgIHJldHVybiBbdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSksIFwicmVzZXRcIl07XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFRvPFM+KG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55KSA6IFNlbWlkaXJlY3RJbnRlcm5hbDxTPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2VtaWRpcmVjdEludGVybmFsPFM+KFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0LCBuZXcgUmVzZXRXaW5zQ29tcG9uZW50KG9yaWdpbmFsQ3JkdCxcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGEpLFxuICAgICAgICAgICAgKF9tMiA6IHN0cmluZywgX20xOiBhbnkpID0+IG51bGwsXG4gICAgICAgICAgICAxLCBmYWxzZSwgZmFsc2UsIHRydWVcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVzZXRXaW5zQ3JkdDxTPlxuICAgICAgICBleHRlbmRzIENyZHQ8U2VtaWRpcmVjdFN0YXRlPFM+PiB7XG4gICAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdEludGVybmFsUmVzZXRXaW5zOiBDcmR0SW50ZXJuYWw8Uz47XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIG9yaWdpbmFsQ3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhOiBhbnksXG4gICAgICAgICAgICBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBhbnkpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gUmVzZXRXaW5zQ29tcG9uZW50LmFkZFRvKFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGFcbiAgICAgICAgKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWxSZXNldFdpbnMgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXRTdHJvbmcoKSB7XG4gICAgICAgIHN1cGVyLmFwcGx5T3AoWzIsIFwicmVzZXRcIl0pO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbMiwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFwcGx5T3Aob3BlcmF0aW9uOiBhbnkpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzEsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhIHJlc2V0LXdpbnMgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRTdHJvbmdcIl0sIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBpdCBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcGVyYXRpb24gdGhhdCBnZXRzIGtpbGxlZCBieVxuICAgICAqIGEgY29uY3VycmVudCByZXNldC13aW5zIGlzIHNraXBwZWQuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBvcGVyYXRpb25zIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucyxcbiAgICAgKiB3aGljaCBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucywgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gUmVzZXQtd2lucyBkZXNjcmlwdGlvbiBpcyBbMiwgXCJyZXNldFwiXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMiAmJiBkZXNjWzFdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goW1wicmVzZXRTdHJvbmdcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3JpZ2luYWxDcmR0T3BlcmF0aW9uIGlzIG9mIHRoZSBmb3JtIFsxLCBkZXNjXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXNjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZWQubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnModHJhbnNsYXRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpbnN0ZWFkIG9mIHRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKiBTZWUgQ3JkdC50cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cblxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXRXaW5zKCk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cblxuLy8gVE9ETzogcmVuYW1lIG9yaWdpbmFsQ3JkdEludGVybmFsIChhYm92ZSkgYW5kIG9yaWdpbmFsQ3JkdFxuLy8gdG8gcmVmbGVjdCByZXNldC13aW5zIHZzIHJlc2V0LCB0byBhdm9pZCBjb25mdXNpb24uXG5cbmV4cG9ydCBjbGFzcyBPYnNlcnZlZFJlc2V0Q29tcG9uZW50PFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFM+IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByZXNldEluaXRpYWxEYXRhOiBhbnkpIHsgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IHN0cmluZywgX3N0YXRlOiBTKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIFtcInJlc2V0XCIsIGxpc3Qgb2ZcbiAgICAgKiB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5IG9yaWdpbmFsQ3JkdCB3aGVuIHByb2Nlc3NpbmdcbiAgICAgKiB0aGUgbWVzc2FnZXMgYXBwZWFyaW5nIGluIG1lc3NhZ2UgKGkuZS4sIHRoZSBtZXNzYWdlcyB0aGF0XG4gICAgICogYXZvaWRlZCBiZWluZyByZXNldCBiZWNhdXNlIHRoZXkgd2VyZSBjb25jdXJyZW50IHRvIHRoZVxuICAgICAqIHJlc2V0IG9wZXJhdGlvbildLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBBcnJheTxbYW55LCBDYXVzYWxUaW1lc3RhbXBdPiwgX3N0YXRlOiBTLFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBbc3RyaW5nLCBBcnJheTxhbnk+XV0ge1xuICAgICAgICBsZXQgcmVzZXRTdGF0ZSA9IHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZSh0aGlzLnJlc2V0SW5pdGlhbERhdGEpO1xuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGNvbmN1cnJlbnRNZXNzYWdlIG9mIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLm9yaWdpbmFsQ3JkdC5lZmZlY3QoY29uY3VycmVudE1lc3NhZ2VbMF0sXG4gICAgICAgICAgICAgICAgcmVzZXRTdGF0ZSwgcmVwbGljYUlkLCBjb25jdXJyZW50TWVzc2FnZVsxXSk7XG4gICAgICAgICAgICByZXNldFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Jlc2V0U3RhdGUsIFtcInJlc2V0XCIsIGRlc2NyaXB0aW9uc11dO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUbzxTPihvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIDogU2VtaWRpcmVjdEludGVybmFsPFM+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4oXG4gICAgICAgICAgICBuZXcgT2JzZXJ2ZWRSZXNldENvbXBvbmVudChvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpLFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0LFxuICAgICAgICAgICAgKG0yOiBbYW55LCBDYXVzYWxUaW1lc3RhbXBdLCBtMTogQXJyYXk8W2FueSwgQ2F1c2FsVGltZXN0YW1wXT4pID0+XG4gICAgICAgICAgICAgICAge20xLnB1c2gobTIpOyByZXR1cm4gbTF9LFxuICAgICAgICAgICAgMiwgdHJ1ZSwgdHJ1ZSwga2VlcE9ubHlNYXhpbWFsXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlc2V0dGFibGVDcmR0PFM+XG4gICAgICAgIGV4dGVuZHMgRGVmYXVsdFJlc2V0V2luc0NyZHQ8U2VtaWRpcmVjdFN0YXRlPFM+PiB7XG4gICAgcHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz47XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBvcmlnaW5hbENyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55LFxuICAgICAgICAgICAgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55LFxuICAgICAgICAgICAga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudC5hZGRUbyhcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YSwga2VlcE9ubHlNYXhpbWFsXG4gICAgICAgICk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIG9wIGlmIHdlJ3JlIGFscmVhZHkgcmVzZXQgKG9rYXkgZ2l2ZW5cbiAgICAgICAgLy8gb2JzZXJ2ZS1yZXNldCBzZW1hbnRpY3MpLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpKSB7XG4gICAgICAgICAgICBzdXBlci5hcHBseU9wKFsxLCBcInJlc2V0XCJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIE5vdGUgaGVyZSB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIHRoZSByZXNldC13aW5zIGxheWVyXG4gICAgICAgIC8vIChpdCdzIG5vdCB3cmFwcGVkIGF1dG9tYXRpY2FsbHkgbGlrZSBpbiBzdXBlci5hcHBseU9wcykuXG4gICAgICAgIHJldHVybiBbMSwgWzEsIFtdXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsyLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0XCIsIFtUT0RPOiByZS1hcHBsaWVkIG9wc11dLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLCB3aGljaFxuICAgICAqIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSwgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gUmVzZXQtc3Ryb25nIChhbHJlYWR5IHRyYW5zbGF0ZWQgYnkgRGVmYXVsdFJlc2V0V2luc0NyZHQpXG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvbiBpcyBcInJlc2V0U3Ryb25nXCJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE9ic2VydmVkIHJlc2V0IGRlc2NyaXB0aW9uIGlzIFsxLCBbXCJyZXNldFwiLFxuICAgICAgICAgICAgLy8gbGlzdCBvZiByZS1hcHBsaWVkIG9wc11dXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAxICYmIGRlc2NbMV1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGluIHRoZSBzZWNvbmQgZW50cnksIHB1dCB0aGUgdHJhbnNsYXRlZFxuICAgICAgICAgICAgICAgIC8vIG9wZXJhdGlvbnMgdGhhdCBkaWRuJ3QgZ2V0IHJlc2V0LiAgS2VlcCBpblxuICAgICAgICAgICAgICAgIC8vIG1pbmQgdGhhdCB0aGVzZSB3aWxsIGJlIGRlc2NyaXB0aW9ucyBmcm9tIHRoZVxuICAgICAgICAgICAgICAgIC8vIGlubmVybW9zdCBzZW1pZGlyZWN0IHByb2R1Y3QuICBXaGF0IHRvIGRvXG4gICAgICAgICAgICAgICAgLy8gYWJvdXQgb3BlcmF0aW9ucyB0aGF0IHdlcmUgb3JpZ2luYWxseSBncm91cGVkXG4gICAgICAgICAgICAgICAgLy8gYXRvbWljYWxseSwgc2luY2UgdHJhbnNsYXRlIGV4cGVjdHMgdGhvc2VcbiAgICAgICAgICAgICAgICAvLyB0byBiZSBkZWxpdmVyZWQgdG9nZXRoZXI/XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKFtcInJlc2V0XCIsIGRlc2NbMV1bMV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsQ3JkdE9wZXJhdGlvbiBpcyBvZiB0aGUgZm9ybSBbMiwgZGVzY11cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzY1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVkLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSh0cmFuc2xhdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGluc3RlYWQgb2YgdHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqIFNlZSBDcmR0LnRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cblxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXR0YWJsZSgpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENhdXNhbFRpbWVzdGFtcCB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDcmR0SW50ZXJuYWwgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcblxuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmV4cG9ydCBjbGFzcyBTZW1pZGlyZWN0U3RhdGU8Uz4ge1xuICAgIHByaXZhdGUgcmVjZWlwdENvdW50ZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAqIHJlcGxpY2EsIGluIG9yZGVyLiAgU3BlY2lmaWNhbGx5LCBhcnJheSBlbGVtZW50cyBhcmUgdHVwbGVzXG4gICAgICogW3Blci1zZW5kZXIgbWVzc2FnZSBjb3VudGVyLCB0aGlzIHJlcGxpY2EncyByZWNlaXB0IGNvdW50ZXIsXG4gICAgICogbWVzc2FnZV0uICBLZWVwIGluIG1pbmQgdGhhdCBwZXItc2VuZGVyIG1lc3NhZ2VcbiAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICogYWxsIENyZHRzIHdpdGggYSBnaXZlbiBDcmR0UnVudGltZSBhbmQgYmV0d2VlblxuICAgICAqIGEgc2VtaWRpcmVjdCBwcm9kdWN0IGFuZCBpdHMgY29tcG9uZW50cy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpc3Rvcnk6IE1hcDxhbnksIEFycmF5PFtudW1iZXIsIG51bWJlciwgYW55XT4+ID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnRlcm5hbFN0YXRlOiBTLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeVRpbWVzdGFtcHM6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ6IGJvb2xlYW4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ6IGJvb2xlYW4pIHsgfVxuICAgIC8qKlxuICAgICAqIEFkZCBtZXNzYWdlIHRvIHRoZSBoaXN0b3J5IHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcC5cbiAgICAgKiByZXBsaWNhSWQgaXMgb3VyIHJlcGxpY2EgaWQuXG4gICAgICovXG4gICAgYWRkKHJlcGxpY2FJZDogYW55LCBtZXNzYWdlOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSk7XG4gICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbmRlckhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeS5zZXQodGltZXN0YW1wLmdldFNlbmRlcigpLCBzZW5kZXJIaXN0b3J5KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcCA9IHRoaXMuaGlzdG9yeVRpbWVzdGFtcHM/XG4gICAgICAgICAgICAgICAgW21lc3NhZ2UsIHRpbWVzdGFtcF06IG1lc3NhZ2U7XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChbdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKSwgdGhpcy5yZWNlaXB0Q291bnRlciwgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcF0pO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyKys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCB0cnVlLFxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNwZWNpZmllZCBhY3Rpb25zIG9uIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeTpcbiAgICAgKiAtIGlmIHJldHVybkNvbmN1cnJlbnQgaXMgdHJ1ZSwgcmV0dXJucyB0aGUgbGlzdCBvZlxuICAgICAqIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRpbWVzdGFtcCwgaW5cbiAgICAgKiByZWNlaXB0IG9yZGVyLlxuICAgICAqIC0gaWYgZGlzY2FyZERvbWluYXRlZCBpcyB0cnVlLCBkZWxldGVzIGFsbCBtZXNzYWdlcyBmcm9tXG4gICAgICogdGhlIGhpc3Rvcnkgd2hvc2UgdGltZXN0YW1wcyBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5XG4gICAgICogb3IgZXF1YWwgdG8gdGhlIGdpdmVuIHRpbWVzdGFtcC4gIChOb3RlIHRoYXQgdGhpcyBtZWFucyB0aGF0XG4gICAgICogaWYgd2Ugd2FudCB0byBrZWVwIGEgbWVzc2FnZSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAgaW5cbiAgICAgKiB0aGUgaGlzdG9yeSwgaXQgbXVzdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBhZnRlciBjYWxsaW5nXG4gICAgICogdGhpcyBtZXRob2QuKVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQ6IGFueSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wLCByZXR1cm5Db25jdXJyZW50OiBib29sZWFuLFxuICAgICAgICAgICAgZGlzY2FyZERvbWluYXRlZDogYm9vbGVhbik6IEFycmF5PGFueT4ge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50OiBBcnJheTxbbnVtYmVyLCBudW1iZXIsIGFueV0+ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPVxuICAgICAgICAgICAgICAgICAgICBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyIChpLmUuLFxuICAgICAgICAgICAgLy8gYnkgdGhlIHNlY29uZCBlbnRyeSBpbiBlYWNoIHRyaXBsZSkuXG4gICAgICAgICAgICBjb25jdXJyZW50LnNvcnQoKGEsIGIpID0+IChhWzFdIC0gYlsxXSkpO1xuICAgICAgICAgICAgLy8gU3RyaXAgYXdheSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgbWVzc2FnZXMuXG4gICAgICAgICAgICByZXR1cm4gY29uY3VycmVudC5tYXAoYSA9PiBhWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3Igd29ya2luZyB3aXRoIHRoZSBwZXItc2VuZGVyIGhpc3RvcnlcbiAgICAgKiBhcnJheXMuICBSZXR1cm5zIHRoZSBpbmRleCBhZnRlciB0aGUgbGFzdCBlbnRyeSB3aG9zZVxuICAgICAqIHBlci1zZW5kZXIgY291bnRlciAodGhlIGZpcnN0IHR1cGxlIGVsZW1lbnQpIGlzIDw9XG4gICAgICogdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5kZXhBZnRlcihzcGFyc2VBcnJheTogQXJyYXk8W251bWJlciwgbnVtYmVyLCBhbnldPixcbiAgICAgICAgICAgIHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAvLyBUT0RPOiBiaW5hcnkgc2VhcmNoIHdoZW4gc3BhcnNlQXJyYXkgaXMgbGFyZ2VcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZXJlIG1heSBiZSBkdXBsaWNhdGUgdGltZXN0YW1wcy5cbiAgICAgICAgLy8gU28gaXQgd291bGQgYmUgaW5hcHByb3ByaWF0ZSB0byBmaW5kIGFuIGVudHJ5IHdob3NlXG4gICAgICAgIC8vIHBlci1zZW5kZXIgY291bnRlciBlcXVhbHMgdmFsdWUgYW5kIGluZmVyIHRoYXRcbiAgICAgICAgLy8gdGhlIGRlc2lyZWQgaW5kZXggaXMgMSBncmVhdGVyLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYXJzZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3BhcnNlQXJyYXlbaV1bMF0gPiB2YWx1ZSkgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYXJzZUFycmF5Lmxlbmd0aDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8U2VtaWRpcmVjdFN0YXRlPFM+PiB7XG4gICAgLyoqXG4gICAgICogQ3JkdEludGVybmFsIGltcGxlbWVudGluZyB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IG9mXG4gICAgICogY3JkdDEgYW5kIGNyZHQyIHdpdGggdGhlIGdpdmVuIGFjdGlvbiwgd2hpY2ggaXMgYSBmdW5jdGlvblxuICAgICAqIChtMjogY3JkdDIgbWVzc2FnZSwgbTE6IGNyZHQxIG1lc3NhZ2UpOiBjcmR0MSBtZXNzYWdlLlxuICAgICAqIGNyZHQxLCBjcmR0MiwgYW5kIGFjdGlvbiBtdXN0IHNhdGlzZnkgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdFxuICAgICAqIGFzc3VtcHRpb25zIGZyb20gb3VyIHBhcGVyLlxuICAgICAqXG4gICAgICogVE9ETzogb3B0aW9ucyBhbmQgdGhlaXIgdGhlb3JldGljYWwgc2lnbmlmaWNhbmNlLiAgRm9ybWFsbHksXG4gICAgICogaGlzdG9yeVRpbWVzdGFtcHMgPSB0cnVlIG1lYW5zIHRoYXQgdGltZXN0YW1wcyBiZWNvbWVcbiAgICAgKiBwYXJ0IG9mIHRoZSBjcmR0MiBtZXNzYWdlcy4gIEFsc28gY3JlYXRlQ3JkdEluZGV4LlxuICAgICAqIERvbWluYXRlZCBzdGF0cyBjb250cm9sIHdoZXRoZXIgeW91IGRpc2NhcmQgbWVzc2FnZXMgaW4gdGhlXG4gICAgICogaGlzdG9yeSB0aGF0IGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnkgY3JkdDEvY3JkdDIgbWVzc2FnZXM7XG4gICAgICogbmVlZCB0byBlbnN1cmUgdGhhdCBhY3Rpb24gaXMgdGhlIHNhbWUgd2l0aCB0aG9zZSBtZXNzYWdlc1xuICAgICAqIGRpc2NhcmRlZC4gIElmIGRvbWluYXRlZDEgaXMgc2V0LCB0aGVuIHN0YXRlLmlzSGlzdG9yeUVtcHR5KClcbiAgICAgKiBiZWNvbWVzICh0aGVyZSBleGlzdHMgYSBjcmR0MiBtZXNzYWdlIG5vdCBjYXVzYWxseSBkb21pbmF0ZWQgYnkgYVxuICAgICAqIGNyZHQxIG1lc3NhZ2UpLiAgQ2hlY2sgdGhpcyBpcyBzdGlsbCB0cnVlIGlmIGRvbWluYXRlZDIgaXMgc2V0LilcbiAgICAgKiBFeHBsYWluIGV4YW1wbGVzIHdoZXJlIHRoaXMgaXMgdXNlZCAocmVzZXR0YWJsZSwgZmxhZ3MpOyBpdCdzXG4gICAgICogbm90IHF1aXRlIGluIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3Qgc3Bpcml0IHVubGVzcyB5b3UgdGhpbmtcbiAgICAgKiBvZiBpdCBhcyB1c2luZyB0aGUgaGlzdG9yeSBhcyBwYXJ0IG9mIHRoZSBjcmR0MS8yIHN0YXRlLlxuICAgICAqIFBvdGVudGlhbCBvcHRpbWl6YXRpb246IG9ubHkgZGVsZXRlIGRvbWluYXRlZCBtZXNzYWdlcyB3aGVuXG4gICAgICogcmVjZWl2aW5nIG91ciBvd24gbWVzc2FnZSAoaXQncyBiYXNpY2FsbHkgZnJlZSBhbmQgYWx3YXlzXG4gICAgICogY2xlYXJzIHRoZSBoaXN0b3J5KSwgb3Igb25seSBzb21ldGltZXMgKHdpbGwgbWlzcyBzb21lXG4gICAgICogbWVzc2FnZXMsIHNvIG5lZWQgdG8gZW5zdXJlIGNvcnJlY3RuZXNzIGluIHRoYXQgY2FzZVxuICAgICAqIChJIHRoaW5rIGl0IGlzIG9rYXkgZm9yIGRvbWluYXRlZDIgYnV0IG5vdCBkb21pbmF0ZWQxIGluIG91clxuICAgICAqIHRhcmdldCB1c2UgY2FzZXMpLCBidXRcbiAgICAgKiBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgZHVlIHRvIGJhdGNoaW5nIGFuZCBzdGlsbCBraWxsXG4gICAgICogb2ZmIG1vc3QgbWVzc2FnZXMpLiAgVGhpcyB0cmFkZXMgYSBzbWFsbCBpbmNyZWFzZSBpbiBzcGFjZVxuICAgICAqIHVzYWdlIGZvciBhIGRlY3JlYXNlIGluIENQVSB0aW1lLlxuICAgICAqXG4gICAgICogQXMgZGVzY3JpYmVkIGluIENyZHRJbnRlcm5hbCBhbmQgQ3JkdCwgbnVsbCBtZXNzYWdlcyBhcmUgdHJlYXRlZFxuICAgICAqIGFzIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBpZCwgYWxsb3dpbmcgdGhlbSB0byBiZSBvcHRpbWl6ZWQgYXdheS5cbiAgICAgKiBCZWNhdXNlIG9mIHRoaXMsIGFjdGlvbiB3aWxsIG5ldmVyIGJlIGNhbGxlZCB3aXRoIG51bGwgYXNcbiAgICAgKiBlaXRoZXIgaW5wdXQuICBJbnN0ZWFkLCB3ZSBiZWhhdmUgYXMgaWZcbiAgICAgKiAoYWN0aW9uKGlkIChpLmUuLCBudWxsKSwgbTEpID0gbTEpXG4gICAgICogZm9yIGFsbCBtMSBhbmQgKGFjdGlvbihtMiwgaWQpID0gaWQpIGZvciBhbGwgbTIuICBUaGUgc2VtaWRpcmVjdFxuICAgICAqIHByb2R1Y3QgYXNzdW1wdGlvbnMgbXVzdCBob2xkIGdpdmVuIHRoZXNlIGFzc2lnbm1lbnRzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjcmR0MTogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JkdDI6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGFjdGlvbjogKG0yOiBhbnksIG0xOiBhbnkpID0+IGFueSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZWF0ZUNyZHRJbmRleDogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeVRpbWVzdGFtcHMgPSBmYWxzZSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZWF0ZUNyZHRJbmRleCAobXVzdCBiZSAxIG9yIDIpOlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogU2VtaWRpcmVjdFN0YXRlPFM+IHtcbiAgICAgICAgbGV0IGludGVybmFsU3RhdGU6IFM7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNyZHRJbmRleCA9PT0gMSkgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RTdGF0ZShpbnRlcm5hbFN0YXRlLFxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcywgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbi9tZXNzYWdlIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG9wZXJhdGlvbi9tZXNzYWdlIGZvciB0aGF0IGNyZHRdLiAgQW4gZXhjZXB0aW9uIGlzIGlmXG4gICAgICogdGhlIGludGVybmFsIGNyZHQgcmV0dXJucyBhIG51bGwgbWVzc2FnZSwgaW4gd2hpY2ggY2FzZVxuICAgICAqIHdlIGp1c3QgcmV0dXJuIG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLiAgVGhpc1xuICAgICAqIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IHNlbmRpbmcgdGhlXG4gICAgICogbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIFRPRE8gKGdlbmVyYWwpOiBlcnJvciBjaGVja2luZ1xuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogU2VtaWRpcmVjdFN0YXRlPFM+LFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnkpOiBbbnVtYmVyLCBhbnldIHwgbnVsbCB7XG4gICAgICAgIGlmIChvcGVyYXRpb25bMF0gPT09IDEpIHtcbiAgICAgICAgICAgIGxldCBvcDEgPSB0aGlzLmNyZHQxLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbMSwgb3AxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcDIgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMiA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbMiwgb3AyXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLiAgRm9yIHRoaXMuY3JkdDFcbiAgICAgKiBtZXNzYWdlcywgdGhlIGRlc2NyaXB0aW9uIGlzIGZvciB0aGUgYWN0ZWQtb24gbWVzc2FnZSB0aGF0XG4gICAgICogaXMgYWN0dWFsbHkgYXBwbGllZCB0byB0aGlzLmludGVybmFsU3RhdGUsIG5vdCB0aGUgaW5wdXRcbiAgICAgKiBtZXNzYWdlLiAgQW4gZXhjZXB0aW9uIGlzIGlmIHRoZSBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbFxuICAgICAqIGNyZHQgaXMgbnVsbCAob3IgaWYgdGhlIG1lc3NhZ2UgZ2V0cyBhY3RlZCBvbiB0byBiZWNvbWUgbnVsbCksXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogU2VtaWRpcmVjdFN0YXRlPFM+LCByZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbU2VtaWRpcmVjdFN0YXRlPFM+LCBbbnVtYmVyLCBhbnldIHwgbnVsbF0ge1xuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gMikge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDIuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBzdGF0ZS5hZGQocmVwbGljYUlkLCBtZXNzYWdlWzFdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbCkgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbc3RhdGUsIFsyLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb25jdXJyZW50ID0gc3RhdGUuZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBsZXQgbUFjdCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtQWN0ID0gdGhpcy5hY3Rpb24oY29uY3VycmVudFtpXSwgbUFjdCk7XG4gICAgICAgICAgICAgICAgaWYgKG1BY3QgPT09IG51bGwpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1BY3QsIHN0YXRlLmludGVybmFsU3RhdGUsXG4gICAgICAgICAgICAgICAgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gW3N0YXRlLCBbMSwgcmVzdWx0WzFdXV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERpcmVjdEludGVybmFsPFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFM+IHtcbiAgICAvKipcbiAgICAgKiBEaXJlY3QgcHJvZHVjdCBvZiBDcmR0SW50ZXJuYWwncy4gIFRoaXMgaXMgdGhlXG4gICAgICogc3BlY2lhbCBjYXNlIG9mIFNlbWlkaXJlY3RJbnRlcm5hbCB3aGVuIHRoZSBhY3Rpb24gaXMgdHJpdmlhbFxuICAgICAqICgobV8yLCBtMSkgPT4gbTEpLiAgSW4gdGhpcyBjYXNlIHdlIGNhbiBvcHRpbWl6ZVxuICAgICAqIGJ5IG5vdCBrZWVwaW5nIHRoZSBoaXN0b3J5IG9yIGFjdGluZyBvbiBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEZvciB0aGlzIHRvIGJlIGEgQ3JkdCwgY29uY3VycmVudCBtZXNzYWdlcyBvZiB0aGUgdHdvIGlucHV0XG4gICAgICogQ3JkdHMgbXVzdCBjb21tdXRlLlxuICAgICAqXG4gICAgICogTm90ZSB0aGlzIGNvbnN0cnVjdGlvbiBpcyBzeW1tZXRyaWMgKHN3aXRjaGluZyBjcmR0MSBhbmRcbiAgICAgKiBjcmR0MiBkb2Vzbid0IGNoYW5nZSB0aGUgc2VtYW50aWNzKSwgZXhjZXB0IGZvciBzd2FwcGluZ1xuICAgICAqIHRoZSBtZWFuaW5nIG9mIHRoZSBudW1iZXJzIDEvMiBpbiBjcmVhdGVDcmR0SW5kZXggYW5kXG4gICAgICogaW4gdGhlIGZpcnN0IGNvb3JkaW5hdGVzIG9mIG1lc3NhZ2VzIGFuZCBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZWF0ZUNyZHRJbmRleCBXaGljaCBjcmR0J3MgY3JlYXRlIG1ldGhvZCB0byB1c2VcbiAgICAgKiBpbiBjcmVhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNyZHQxOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JkdDI6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjcmVhdGVDcmR0SW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoY3JlYXRlQ3JkdEluZGV4ICE9PSAxICYmIGNyZWF0ZUNyZHRJbmRleCAhPT0gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZWF0ZUNyZHRJbmRleCAobXVzdCBiZSAxIG9yIDIpOlwiICtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ3JkdEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNyZHRJbmRleCA9PT0gMSkgcmV0dXJuIHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtudW1iZXIsIGFueV0sIHN0YXRlOiBTLFxuICAgICAgICAgICAgcmVwbGljYUlkOiBhbnkpOiBbbnVtYmVyLCBhbnldIHwgbnVsbCB7XG4gICAgICAgIGxldCBtZXNzYWdlOiBhbnk7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiBbb3BlcmF0aW9uWzBdLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS5cbiAgICAgKiBBbiBleGNlcHRpb24gaXMgaWYgdGhlIGRlc2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsXG4gICAgICogY3JkdCBpcyBudWxsLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKiBUT0RPOiBwZXJoYXBzIGFkZCB0cmFuc2xhdGluZyBkZXNjcmlwdGlvbnMgdG8gdGhpcyBjbGFzcywgc29cbiAgICAgKiB0aGUgQ3JkdCBkb2Vzbid0IGhhdmUgdG8gdW5kZXJzdGFuZCBhbGwgb2YgdGhlIGxheWVycyBhdFxuICAgICAqIG9uY2U/XG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtudW1iZXIsIGFueV0sIHN0YXRlOiBTLCByZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgW251bWJlciwgYW55XSB8IG51bGxdIHtcbiAgICAgICAgbGV0IHJlc3VsdDogW1MsIGFueV07XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbCkgcmV0dXJuIFtyZXN1bHRbMF0sIG51bGxdO1xuICAgICAgICBlbHNlIHJldHVybiBbcmVzdWx0WzBdLCBbbWVzc2FnZVswXSwgcmVzdWx0WzFdXV07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ3JkdFJ1bnRpbWUsIENhdXNhbFRpbWVzdGFtcCB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQgfSBmcm9tIFwiLi9yZXNldHRhYmxlXCI7XG5pbXBvcnQgeyBDb3VudGVySW50ZXJuYWwsIE11bHRSZWdpc3RlckludGVybmFsIH0gZnJvbSBcIi4vYmFzaWNfY3JkdHNcIjtcbmltcG9ydCB7IENyZHQsIENyZHRJbnRlcm5hbCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuaW1wb3J0IHsgU2VtaWRpcmVjdFN0YXRlLCBTZW1pZGlyZWN0SW50ZXJuYWwsIERpcmVjdEludGVybmFsIH0gZnJvbSBcIi4vc2VtaWRpcmVjdFwiO1xuXG5leHBvcnQgY2xhc3MgVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgQ3JkdDxTZW1pZGlyZWN0U3RhdGU8bnVtYmVyPj4ge1xuICAgIC8vIHNlbWlkaXJlY3RJbnN0YW5jZSBjb21wbGV0ZWx5IGRlc2NyaWJlcyB0aGlzIHNlbWlkaXJlY3QgcHJvZHVjdFxuICAgIHN0YXRpYyBzZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgU2VtaWRpcmVjdEludGVybmFsPG51bWJlcj4oXG4gICAgICAgIENvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsXG4gICAgICAgIChtMjogbnVtYmVyLCBtMTogbnVtYmVyKSA9PiBtMiptMSwgMVxuICAgICk7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSxuXSk7XG4gICAgfVxuICAgIG11bHQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMixuXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+KTogW3N0cmluZywgbnVtYmVyXSB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PFNlbWlkaXJlY3RTdGF0ZTxudW1iZXI+PiB7XG4gICAgc3RhdGljIHNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8bnVtYmVyPihcbiAgICAgICAgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSxcbiAgICAgICAgKG0yOiBudW1iZXIsIG0xOiBudW1iZXIpID0+IG0yKm0xLCAxXG4gICAgKTtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogbnVtYmVyID0gMCwgcmVzZXRWYWx1ZTogbnVtYmVyID0gMCkge1xuICAgICAgICBzdXBlcihpZCwgSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcmVzZXRWYWx1ZSwgcnVudGltZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBuXSk7XG4gICAgfVxuICAgIG11bHQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1hZGQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5hZGQobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8W251bWJlciB8IHN0cmluZywgbnVtYmVyXT4pOiBbc3RyaW5nLCBudW1iZXJdIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vIFRyYW5zYWN0aW9uIGR1ZSB0byBzZXQgdmFsdWUsIHJldHVybiB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gICAgICAgICAgICByZXR1cm4gW1wic2V0XCIsIGRlc2NyaXB0aW9uc1sxXVsxXV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIHJldHVybiBbZGVzY3JpcHRpb25bMF0gYXMgc3RyaW5nLCB0aGlzLnZhbHVlXTsgLy8gcmVzZXRzXG4gICAgfVxufVxuXG4vKipcbiAqIENyZHRJbnRlcm5hbCB3aGljaCB1c2VzIGFueSBzdHJpbmcgYXMgYW4gb3BlcmF0aW9uL21lc3NhZ2VcbiAqIHdoaWNoIGRvZXMgbm90aGluZy4gIFVubGlrZSB1c2luZyBudWxsIG1lc3NhZ2VzIHRvIGluZGljYXRlIHRoYXRcbiAqIG5vdGhpbmcgaGFwcGVuZWQsIHRoZSBub29wIG1lc3NhZ2UgaXMgYW4gZXhwbGljaXQgbm9uLW51bGxcbiAqIHN0cmluZyBzdXBwbGllZCBhcyB0aGUgb3BlcmF0aW9uLlxuICpcbiAqIFR3byB1c2UgY2FzZXM6XG4gKiAtIFRvIHVucmVzZXQgYSBzdGF0ZSAoZS5nLiBpbiBFbmFibGVXaW5zRmxhZyBiZWxvdykuXG4gKiAtIEFzIGEgXCJoZWFkZXJcIiBmb3Igc2VxdWVuY2Ugb2Ygb3BlcmF0aW9ucyBwYXNzZWQgdG8gYXBwbHlPcHMsXG4gKiBzbyB0aGF0IHJlY2lwaWVudHMgY2FuIGtub3cgd2hhdCBlbmQtdXNlciBvcGVyYXRpb24gdGhlIHNlcXVlbmNlXG4gKiBjb3JyZXNwb25kcyB0by5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vT3BDcmR0SW50ZXJuYWw8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjcmVhdGVGdW5jPzogKGluaXRpYWxEYXRhOiBhbnkpID0+IFMpIHt9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUZ1bmMpIHJldHVybiB0aGlzLmNyZWF0ZUZ1bmMoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkNyZWF0ZUZ1bmMgbm90IHN1cHBsaWVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFMpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIHRoZSBvcmlnaW5hbCBvcGVyYXRpb24uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IHN0cmluZywgc3RhdGU6IFMsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIHN0cmluZ10ge1xuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVG88Uz4ob3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEaXJlY3RJbnRlcm5hbDxTPihvcmlnaW5hbENyZHQsXG4gICAgICAgICAgICBuZXcgTm9PcENyZHRJbnRlcm5hbDxTPigpLCAxXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW5hYmxlV2luc0ZsYWcgZXh0ZW5kcyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ8bnVsbD4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCxcbiAgICAgICAgICAgIHJ1bnRpbWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFwiZVwiKTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBkaXNhYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKTtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBkaXNhYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERpc2FibGVXaW5zRmxhZyBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxudWxsPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLFxuICAgICAgICAgICAgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGVuYWJsZVN0cm9uZygpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0cm9uZygpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJkXCIpO1xuICAgIH1cbiAgICBnZXQgZW5hYmxlZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKTtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBlbmFibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8c3RyaW5nPik6IHN0cmluZyB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR01hcEludGVybmFsPEssIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPE1hcDxLLCBDPj4ge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gdmFsdWVDcmR0SW50ZXJuYWwgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBzaG91bGRHYyBHaXZlbiBhIHZhbHVlIHN0YXRlLCByZXR1cm4gd2hldGhlciBpdCBpcyBzYWZlXG4gICAgICogdG8gZ2FyYmFnZSBjb2xsZWN0IGl0LCByZW1vdmluZyBpdHMga2V5LXZhbHVlIHBhaXIgZnJvbSB0aGVcbiAgICAgKiBtYXAuICBGb3IgY29ycmVjdG5lc3MsIGlmIHNob3VsZEdjKHZhbHVlU3RhdGUpIGlzIHRydWUsIHRoZW5cbiAgICAgKiB2YWx1ZVN0YXRlIG11c3QgYmUgaWRlbnRpY2FsIHRvIHZhbHVlQ3JkdEludGVybmFsLmNyZWF0ZSh2YWx1ZUluaXRpYWxEYXRhKTtcbiAgICAgKiBhbmQgaWYgc2hvdWxkR2MgaXMgbm9udHJpdmlhbCwgdGhlbiB1c2VycyBzaG91bGQga2VlcCBpblxuICAgICAqIG1pbmQgdGhhdCBzdGF0ZS5oYXMoa2V5KSBpcyBub3QgcmVsaWFibGUsIHNpbmNlIGl0IG1heSBiZVxuICAgICAqIGZhbHNlIGV2ZW4gYWZ0ZXIga2V5IGhhcyBiZWVuIGluaXRpYWxpemVkIGJlY2F1c2UgdGhlIHZhbHVlXG4gICAgICogaGFzIGJlZW4gZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHNob3VsZEdjOiAodmFsdWVTdGF0ZTogQykgPT4gYm9vbGVhbiA9ICgoKSA9PiBmYWxzZSkpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ETy4gIE5lZWRzIHRvIGJlIHNldC4gIEFsbG93IGl0IHRvIGJlIHNldCBvdXRzaWRlIGNvbnN0cnVjdG9yXG4gICAgICogYmVjYXVzZSBDcmR0T2JqZWN0IG5lZWRzIHRvIGNhbGwgc3VwZXIgYmVmb3JlIGl0IGNhbiBzZXQgdGhpcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdEZhY3RvcnkhOiAoa2V5OiBLKSA9PiBDO1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGE/OiBhbnkpOiBNYXA8SywgQz4ge1xuICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBDPigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wiYXBwbHlcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBpbml0aWFsaXppbmcgdGhlIGtleSBpZiBuZWVkZWQuXG4gICAgICogLSBbXCJhcHBseVNraXBcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBleGNlcHQgZm9yIHRoZWlyIHNlbmRlciwgd2hvIGlzIGFzc3VtZWRcbiAgICAgKiB0byBoYXZlIGFscmVhZHkgYXBwbGllZCB0aGUgbWVzc2FnZS4gIFRoaXMgaXMgdXNlZCBieVxuICAgICAqIENyZHRWYWx1ZWRHcm93T25seU1hcEludGVybmFsLCB3aG9zZSBtZXNzYWdlcyBhcmVcbiAgICAgKiBzb21ldGltZXMgZGVyaXZlZCBmcm9tIHZhbHVlcyBhcHBseWluZyBtZXNzYWdlcyB0b1xuICAgICAqIHRoZW1zZWx2ZXMuICBUT0RPOiBpbiBwcmluY2lwbGUgY2FuIG9wdGltaXplIHNvIHdlXG4gICAgICogZG9uJ3QgaGF2ZSB0byBzZW5kIFwic2tpcFwiIG92ZXIgdGhlIG5ldHdvcmsuXG4gICAgICogLSBbXCJpbml0XCIsIGtleV06IGluaXRpYWxpemVzIHRoZSBnaXZlbiBrZXkgdXNpbmcgaW5pdEZhY3RvcnlcbiAgICAgKiBpZiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGluIHRoZSBtYXAuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXRzIGV2ZXJ5IHZhbHVlIGluIHRoZSBtYXAgKHVzaW5nXG4gICAgICogZWFjaCB2YWx1ZSdzIGdldFVuaXZlcnNhbFJlc2V0T3BlcmF0aW9uKCkpLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbc3RyaW5nLCBLLCBhbnldLCBzdGF0ZTogTWFwPEssIEM+LCBfcmVwbGljYUlkOiBhbnkpOiBbc3RyaW5nLCBLPywgYW55P10ge1xuICAgICAgICBsZXQga2V5ID0gb3BlcmF0aW9uWzFdO1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5XCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlTa2lwXCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXMoa2V5KSkgcmV0dXJuIFtcImluaXRcIiwga2V5XTtcbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOiByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW4gYWRkaXRpb24gdG8gdGhlIG1lc3NhZ2Ugb3V0cHV0IGJ5IHByZXBhcmUsIHdlIGhhdmVcbiAgICAgKiBtZXNzYWdlcyAoYXJpc2luZyB0aHJvdWdoIHNlbWRpcmVjdCBwcm9kdWN0KTpcbiAgICAgKiAtIFtcImluaXRSZXNldFwiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZCBieVxuICAgICAqIGRlbGl2ZXJpbmcgYSByZXNldCBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICogLSBbXCJpbml0UmVzZXRTdHJvbmdcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWRcbiAgICAgKiBieSBkZWxpdmVyaW5nIGEgcmVzZXQtc3Ryb25nIG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKlxuICAgICAqIERlc2NyaXB0aW9uIGZvcm1hdDpcbiAgICAgKiAtIGZvciBhbiBhcHBseS9hcHBseVNraXAgb3BlcmF0aW9uOlxuICAgICAqIG51bGwgKFRPRE8pXG4gICAgICogLSBmb3IgYW4gaW5pdCBvcGVyYXRpb246IG51bGwgaWYgdGhlIGtleSBhbHJlYWR5IGV4aXN0ZWQsXG4gICAgICogb3RoZXJ3aXNlIFtcImluaXRcIiwga2V5XVxuICAgICAqIC0gZm9yIGEgcmVzZXQgb3BlcmF0aW9uOiBbXCJyZXNldFwiXSAoVE9ETzogZGVzY3JpcHRpb25zIGZyb21cbiAgICAgKiByZXNldCBrZXlzKVxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbc3RyaW5nLCBLLCBhbnk/XSwgc3RhdGU6IE1hcDxLLCBDPixcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6XG4gICAgICAgICAgICBbTWFwPEssIEM+LCBbc3RyaW5nLCBLPywgYW55P10gfCBudWxsXSB7XG4gICAgICAgIGxldCBrZXkgPSBtZXNzYWdlWzFdO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBhcHBseWluZyBpdCB0byB0aGUgc3RhdGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCBnYywgdGhvdWdoLCBpbiBjYXNlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5LWFwcGxpZWQgbWVzc2FnZSBoYXMgbWFkZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBnYy1hYmxlLlxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBmYWxsIHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjp7XG4gICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVN0YXRlLnJlY2VpdmUobWVzc2FnZVsyXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO31cbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhcyhrZXkpKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3VsZEdjKGluaXRTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnNldChrZXksIGluaXRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wiaW5pdFwiLCBrZXldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBzdGF0ZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc2V0TWVzc2FnZSA9IGVudHJ5WzFdLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzZXRNZXNzYWdlICE9PSBudWxsKSBlbnRyeVsxXS5yZWNlaXZlKFtyZXNldE1lc3NhZ2VdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShlbnRyeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wicmVzZXRcIl1dO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBDb252ZW5pZW50IHJlcHJlc2VudGF0aW9uIG9mIGEgQ3JkdC12YWx1ZWQgZ3Jvdy1vbmx5IG1hcC5cbiAqXG4gKiBUT0RPOiBTb21ld2hlcmU6IG5vdGUgdGhhdCBpbml0aWFsIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG11c3QgYmVcbiAqIGEgZnVuY3Rpb24gb2YgdGhlaXIga2V5IG9ubHkgKHNvIGNhbid0IGhhdmUgdmFyeWluZyB0eXBlcyBvclxuICogaW5pdGlhbCBkYXRhKS5cbiAqXG4gKiBOIGlzIHRoZSB0eXBlIG9mIG1lbWJlciBuYW1lcyAodHlwaWNhbGx5IHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0T2JqZWN0PE4sIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGV4dGVuZHMgQ3JkdDxNYXA8TiwgQz4+IGltcGxlbWVudHMgQ3JkdFJ1bnRpbWUge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcGVydHlGYWN0b3J5ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEeW5hbWljYWxseSBjcmVhdGVkIHByb3BlcnRpZXMgYXJlIG9ubHkgXCIgK1xuICAgICAgICAgICAgICAgIFwiYWxsb3dlZCBpZiBwcm9wZXJ0eUZhY3RvcnkgaXMgcGFzc2VkIHRvIHRoZSBcIiArXG4gICAgICAgICAgICAgICAgXCJDcmR0T2JqZWN0IGNvbnN0cnVjdG9yXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVE9ETzogcHJlZGVmaW5lZCB2cyBkeW5hbWljIHByb3BlcnR5IGNyZWF0aW9uLiAgUHJlZGVmaW5lZCBvbmVzXG4gICAgICogaGF2ZSB0byBiZSBjcmVhdGVkIGlkZW50aWNhbGx5IG9uIGFsbCByZXBsaWNhcyBpblxuICAgICAqIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIGFuZFxuICAgICAqIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCksIGlkZWFsbHkgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGV5XG4gICAgICogYXJlIG5vdCBzeW5jZWQgKGZvciBlZmZpY2llbmN5IGFuZCB0byBzYXZlIHRoZSB0cm91YmxlXG4gICAgICogb2Ygc3BlY2lmeWluZyBwcm9wZXJ0eUZhY3RvcnkpLiAgRHluYW1pYyBwcm9wZXJ0aWVzXG4gICAgICogY2FuIG9ubHkgYmUgY3JlYXRlZCB0aHJvdWdoIGluaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlGYWN0b3J5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIHByb3BlcnR5RmFjdG9yeTogKG5hbWU6IE4sIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IENcbiAgICAgICAgICAgID0gQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5KSB7XG4gICAgICAgIC8vIFRPRE86IGdjIGFiaWxpdHlcbiAgICAgICAgbGV0IGNyZHRJbnRlcm5hbCA9IG5ldyBHTWFwSW50ZXJuYWw8TiwgQz4oKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRJbnRlcm5hbCwgcnVudGltZSk7XG4gICAgICAgIGNyZHRJbnRlcm5hbC5pbml0RmFjdG9yeSA9IChrZXk6IE4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBwcm9wZXJ0eUZhY3Rvcnkoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb246IGJvb2xlYW47XG4gICAgc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICBwcml2YXRlIGluSW5pdDogYm9vbGVhbjtcbiAgICByZWdpc3RlcihjcmR0OiBDLCBuYW1lOiBOKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiB8fCB0aGlzLmluSW5pdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BlcnRpZXMgY2FuIG9ubHkgYmUgZGlyZWN0bHkgXCIgK1xuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJlZCBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBcIiArXG4gICAgICAgICAgICAgICAgXCJhbmQgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKS4gIER5bmFtaWMgcHJvcGVydGllcyBcIiArXG4gICAgICAgICAgICAgICAgXCJtdXN0IGJlIGNyZWF0ZWQgd2l0aCBpbml0KG5hbWUpLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KG5hbWUsIGNyZHQpO1xuICAgICAgICAvLyBTa2lwIHNlbmRpbmcgYW4gaW5pdCBtZXNzYWdlIGFib3V0IGl0LiAgT2theSBiZWNhdXNlIG9mIHRoZVxuICAgICAgICAvLyBwcmVkZWZpbmVkIGluaXRpYWxpemF0aW9uIGNvbnRyYWN0LlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICBUaGUgaW5pdGlhbGl6ZWQgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0UHJvcGVydHkobmFtZTogTik6IEMge1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3AoW1wiaW5pdFwiLCBuYW1lXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSkgYXMgQztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKHRoaXMuZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbXCJyZXNldFwiXTtcbiAgICB9XG5cbiAgICBnZXRQcm9wZXJ0eShuYW1lOiBOKTogQyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICB9XG4gICAgcHJvcGVydHlOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUua2V5cygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWVzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5RW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICAgIH1cblxuICAgIHNlbmQobWVzc2FnZTogYW55LCBuYW1lOiBOKTogdm9pZCB7XG4gICAgICAgIC8vIENvbnZlcnQgaW50byBhbiBhcHBseVNraXAgbWVzc2FnZSBmb3IgdGhlIG1hcCB2YWx1ZVxuICAgICAgICAvLyBhdCBuYW1lLiAgSGVyZSB3ZSB3YW50IHRvIHNraXAgYmVjYXVzZVxuICAgICAgICAvLyBvdXIgcmVwbGljYSdzIHZhbHVlIGhhcyBhbHJlYWR5IGFwcGxpZWQgdGhlXG4gICAgICAgIC8vIG9wZXJhdGlvbiBpbnRlcm5hbGx5LlxuICAgICAgICB0aGlzLmFwcGx5T3AoW1wiYXBwbHlTa2lwXCIsIG5hbWUsIG1lc3NhZ2VdKTtcbiAgICB9XG5cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCk7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoKTogQ2F1c2FsVGltZXN0YW1wIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQWRkV2luc1NldDxUPiBleHRlbmRzIENyZHRPYmplY3Q8VCwgRW5hYmxlV2luc0ZsYWc+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgZ2Mgb25jZSB3ZSBoYXZlIHRyYW5zYWN0aW9uc1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSwgKG5hbWU6IFQsIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+XG4gICAgICAgICAgICAgICAgbmV3IEVuYWJsZVdpbnNGbGFnKG5hbWUsIGludGVybmFsUnVudGltZSkpO1xuICAgIH1cbiAgICBhZGQodmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMuaW5pdFByb3BlcnR5KHZhbHVlKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBkZWxldGUodmFsdWU6IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgKHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpIGFzIEVuYWJsZVdpbnNGbGFnKS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKHZhbHVlOiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICh0aGlzLmdldFByb3BlcnR5KHZhbHVlKSBhcyBFbmFibGVXaW5zRmxhZykucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXModmFsdWU6IFQpIHtcbiAgICAgICAgbGV0IHZhbHVlRmxhZyA9IHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVGbGFnID09PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVGbGFnLmVuYWJsZWQ7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpOiBTZXQ8VD4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNldDxUPigpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnByb3BlcnR5RW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoZW50cnlbMV0uZW5hYmxlZCkgcmVzdWx0LmFkZChlbnRyeVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBTZXQ8VD4pIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIC8vIFRPRE86IG9uY2UgaXQncyBnYydkIHdlIGNhbiBqdXN0IHVzZSB0aGlzLnN0YXRlLmtleXMoKVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS52YWx1ZXMoKTtcbiAgICB9XG4gICAgLy8gVE9ETzogb3RoZXIgc2V0IHByb3BlcnRpZXMgKGUuZy4gc3ltYm9sIGl0ZXJhdG9yKVxuICAgIC8vIFRPRE86IGNhcHR1cmluZyBhbmQgdHJhbnNsYXRpbmcgZGVzY3JpcHRpb25zXG59XG5cbmV4cG9ydCBjbGFzcyBNYXBDcmR0PEssIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIEFkZFdpbnNTZXQ8Sz4gfCBDcmR0T2JqZWN0PEssIEM+PiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBrZXlTZXQ6IEFkZFdpbnNTZXQ8Sz47XG4gICAgcHJpdmF0ZSByZWFkb25seSB2YWx1ZU1hcDogQ3JkdE9iamVjdDxLLCBDPjtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIHZhbHVlRmFjdG9yeTogKGtleTogSywgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT4gQykge1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmtleVNldCA9IG5ldyBBZGRXaW5zU2V0KFwia2V5U2V0XCIsIHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlTWFwID0gbmV3IENyZHRPYmplY3QoXCJ2YWx1ZU1hcFwiLCB0aGlzLCB2YWx1ZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsYWcgaW5kaWNhdGluZyB0aGF0IHdlIGFyZSBpbiB0aGUgYm9keSBvZiBhIGRlbGV0ZS9cbiAgICAgKiBkZWxldGVTdHJvbmcgY2FsbCwgaGVuY2Ugd2Ugc2hvdWxkIG5vdCBhZGQgdGhpbmdzXG4gICAgICogdG8ga2V5U2V0IChhcyBhbiBvcHRpbWl6YXRpb24pLlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5EZWxldGUgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBDcmR0T2JqZWN0LnNlbmQgc28gdGhhdCB3ZSBjYW4gY2FwdHVyZVxuICAgICAqIGEgc2VuZCBieSBhIHZhbHVlTWFwIHZhbHVlIGFuZCBmb2xsb3cgaXQgdXAgd2l0aFxuICAgICAqIGFuIGFkZCB0byBrZXlTZXQsIHRodXMgcmV2aXZpbmcgdGhlIHZhbHVlJ3Mga2V5XG4gICAgICogaWYgYXBwcm9wcmlhdGUuXG4gICAgICpcbiAgICAgKiBUT0RPOiBza2lwIGFkZGluZyB0aGUga2V5IGlmIGl0J3MgYSByZXNldCBtZXNzYWdlP1xuICAgICAqIE5vdCBzdXJlIGlmIHRoaXMgaXMgcG9zc2libGUgaW4gZ2VuZXJhbC4gIEJ1dCBzaG91bGQgYXRcbiAgICAgKiBsZWFzdCBiZSBwb3NzaWJsZSBmb3Igb3VyIG93biBkZWxldGVzLlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZTogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2VuZChtZXNzYWdlLCBuYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlICYmIG5hbWUgPT09IFwidmFsdWVNYXBcIikge1xuICAgICAgICAgICAgLy8gVE9ETzogZG8gdGhpcyByZWNlaXZlciBzaWRlIGluc3RlYWQsIGZvciBuZXR3b3JrIGVmZmljaWVuY3k/XG4gICAgICAgICAgICAvLyBXb3VsZCBuZWVkIHRvIHBsYWNlIHRoZSBhZGQgZmlyc3QsIHNvIHRoYXQgaXQgY2FuXG4gICAgICAgICAgICAvLyBiZSBvdmVycmlkZGVuIGJ5IGFueSBpbmNsdWRlZCBkZWxldGVzLlxuICAgICAgICAgICAgLy8gV291bGQgYWxzbyBuZWVkIHRvIGFjY291bnQgZm9yIHBvc3NpYmlsaXR5IG9mXG4gICAgICAgICAgICAvLyB0cmFuc2FjdGlvbnMuXG4gICAgICAgICAgICAvLyBBbHNvLCBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSAoc2VuZGVyKSBkbyBpdCB0b28uXG4gICAgICAgICAgICBmb3IgKGxldCBzdWJtZXNzYWdlIG9mIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VibWVzc2FnZVswXSA9PT0gXCJhcHBseVNraXBcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gc3VibWVzc2FnZVsxXSBhcyBLO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdChrZXk6IEspOiBDIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSkgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnZhbHVlTWFwLmluaXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhhcyhrZXk6IEspIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5OiBLKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSByZXR1cm4gdGhpcy52YWx1ZU1hcC5nZXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGRlbGV0ZShrZXk6IEspIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAodGhpcy5nZXQoa2V5KSBhcyBDKS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKGtleTogSykge1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0KGtleSkucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlU3Ryb25nKGtleSk7XG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LnZhbHVlcygpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG90aGVyIG1hcCBtZXRob2RzIChlLmcuIHN5bWJvbCBpdGVyYXRvcilcbiAgICAvLyBUT0RPOiBzdHJvbmctcmVzZXRcbiAgICAvLyBUT0RPOiBwcmVzZXJ2ZS1zdGF0ZSBkZWxldGUsIHJlc2V0P1xufVxuIiwicmVxdWlyZSgnLi4vdGVzdC90ZXN0Jyk7Ly8gcnVuIHRlc3QudHNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcG92ZW50dWFscyhoaTogc3RyaW5nKTogdm9pZCB7XG5cblxufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7IENvdW50ZXJDcmR0LCBNdWx0UmVnaXN0ZXJDcmR0LCBHU2V0Q3JkdCwgTXVsdGlWYWx1ZVJlZ2lzdGVyIH0gZnJvbSBcIi4uLy4uL3NyYy9jcmR0cy9iYXNpY19jcmR0c1wiO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0Q291bnRlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RDb3VudGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VDb3VudGVyID0gbmV3IENvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGFsaWNlKTtcbiAgICBhbGljZUNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JDb3VudGVyID0gbmV3IENvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGJvYik7XG4gICAgYm9iQ291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIC0xKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgLTEpO1xuXG4gICAgYWxpY2VDb3VudGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlQ291bnRlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA2KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDgpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA4KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0TXVsdFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE11bHRSZWdpc3RlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlUmVnaXN0ZXIgPSBuZXcgTXVsdFJlZ2lzdGVyQ3JkdChcIm11bHRJZFwiLCBhbGljZSwgMik7XG4gICAgYWxpY2VSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBtdWx0ZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JSZWdpc3RlciA9IG5ldyBNdWx0UmVnaXN0ZXJDcmR0KFwibXVsdElkXCIsIGJvYiwgMik7XG4gICAgYm9iUmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIG11bHRlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMik7XG5cbiAgICBhbGljZVJlZ2lzdGVyLm11bHQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDYpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgNik7XG5cbiAgICBib2JSZWdpc3Rlci5tdWx0KC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgLTI0KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC0yNCk7XG5cbiAgICBhbGljZVJlZ2lzdGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDExKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDExKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VSZWdpc3Rlci5tdWx0KDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAyMik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JSZWdpc3Rlci5tdWx0KC04KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMjIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgLTg4KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAtMTc2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC0xNzYpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RHU2V0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEdTZXQoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUdTZXQgPSBuZXcgR1NldENyZHQoXCJnc2V0SWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlR1NldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBhZGRlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkdTZXQgPSBuZXcgR1NldENyZHQoXCJnc2V0SWRcIiwgYm9iKTtcbiAgICBib2JHU2V0Lm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBhZGRlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldCgpKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldCgpKTtcblxuICAgIGFsaWNlR1NldC5hZGQoXCJlbGVtZW50XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIl0pKTtcblxuICAgIGJvYkdTZXQuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcblxuICAgIGFsaWNlR1NldC5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RcbiAgICBhbGljZUdTZXQuYWRkKFwiZmlyc3RcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG5cbiAgICBib2JHU2V0LmFkZChcInNlY29uZFwiKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJzZWNvbmRcIl0pKTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE12cigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNdnIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU12ciA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPihcIm12cklkXCIsIGFsaWNlLCBcImluaXRpYWxcIik7XG4gICAgYWxpY2VNdnIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgbGV0IGJvYk12ciA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPihcIm12cklkXCIsIGJvYiwgXCJpbml0aWFsXCIpO1xuICAgIGJvYk12ci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImluaXRpYWxcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImluaXRpYWxcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJzZWNvbmRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJzZWNvbmRcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJ0aGlyZFwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJ0aGlyZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1widGhpcmRcIl0pKTtcblxuICAgIGJvYk12ci52YWx1ZSA9IFwiYm9iJ3NcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiYm9iJ3NcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImJvYidzXCJdKSk7XG5cbiAgICAvLyBDb25jdXJyZW50IHRlc3RcbiAgICBhbGljZU12ci52YWx1ZSA9IFwiY29uY0FcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcImNvbmNCXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNBXCIsIFwiY29uY0JcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNCXCIsIFwiY29uY0FcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJjb25jQTJcIjtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY0EyXCJdKSk7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJjb25jQjJcIjtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNCMlwiXSkpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQTJcIiwgXCJjb25jQjJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNCMlwiLCBcImNvbmNBMlwiXSkpO1xuXG4gICAgLy8gTXVsdGlwbGUgYWRkcyBhcmUgcmVkdW5kYW50LCB1bmxlc3MgdGhleSdyZSBvdmVyd3JpdHRlblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInJlZHVuZGFudFwiXSkpO1xuXG4gICAgYWxpY2VNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIGJvYk12ci52YWx1ZSA9IFwicmVkdW5kYW50XCI7XG4gICAgYWxpY2VNdnIudmFsdWUgPSBcIm92ZXJ3cml0ZVwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIiwgXCJvdmVyd3JpdGVcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInJlZHVuZGFudFwiLCBcIm92ZXJ3cml0ZVwiXSkpO1xuXG4gICAgLy8gUmVzZXQgdGVzdFxuICAgIGFsaWNlTXZyLnJlc2V0KCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KCkpO1xuICAgIGJvYk12ci52YWx1ZSA9IFwiY29uY1wiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jXCJdKSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG50ZXN0Q291bnRlcigpO1xudGVzdE11bHRSZWdpc3RlcigpO1xudGVzdEdTZXQoKTtcbnRlc3RNdnIoKTtcblxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXRcbmZ1bmN0aW9uIGlzU3VwZXJzZXQ8VD4oc2V0OiBTZXQ8VD4sIHN1YnNldDogU2V0PFQ+KSB7XG4gICAgZm9yIChsZXQgZWxlbSBvZiBzdWJzZXQpIHtcbiAgICAgICAgaWYgKCFzZXQuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuZnVuY3Rpb24gc2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgcmV0dXJuIGlzU3VwZXJzZXQoc2V0MSwgc2V0MikgJiYgaXNTdXBlcnNldChzZXQyLCBzZXQxKTtcbn1cbmZ1bmN0aW9uIGFzc2VydFNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIGlmKCFzZXRFcXVhbHMoc2V0MSwgc2V0MikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0RXF1YWxzIGZhaWxlZCwgYWN0dWFsOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0MS52YWx1ZXMoKV0pICsgXCIsIGV4cGVjdGVkOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0Mi52YWx1ZXMoKV0pKTtcbiAgICB9XG4gICAgYXNzZXJ0KHNldEVxdWFscyhzZXQxLCBzZXQyKSk7XG59XG4iLCJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge1Rlc3RpbmdSdW50aW1lR2VuZXJhdG9yfSBmcm9tIFwiLi4vcnVudGltZV9mb3JfdGVzdGluZ1wiO1xuaW1wb3J0IHsgSnNvbkNyZHQgfSBmcm9tICcuLi8uLi9zcmMvY3JkdHMvanNvbic7XG5pbXBvcnQgeyBJbnRSZWdpc3RlckNyZHQgfSBmcm9tICcuLi8uLi9zcmMvY3JkdHMvc3RhbmRhcmQnO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0SnNvbk1hcEZlYXR1cmVzKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEpzb25NYXBGZWF0dXJlcygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlSnNvbiA9IG5ldyBKc29uQ3JkdChcImpzb25NYXBcIiwgYWxpY2UpO1xuICAgIGxldCBib2JKc29uID0gbmV3IEpzb25DcmR0KFwianNvbk1hcFwiLCBib2IpO1xuXG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcblxuICAgIC8vIEluaXRzIGdvIHRocm91Z2hcbiAgICBhbGljZUpzb24uaW5pdChcInRlc3RcIiwgMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnQoYWxpY2VKc29uLmhhcyhcInRlc3RcIiwgMCkpO1xuICAgIGFzc2VydChib2JKc29uLmhhcyhcInRlc3RcIiwgMCkpO1xuXG4gICAgbGV0IGFsaWNlVGVzdCA9IGFsaWNlSnNvbi5nZXQoXCJ0ZXN0XCIsIDApIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhc3NlcnQoYWxpY2VUZXN0KTtcbiAgICBsZXQgYm9iVGVzdCA9IGJvYkpzb24uZ2V0KFwidGVzdFwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGJvYlRlc3QpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCAwKTtcblxuICAgIC8vIFZhbHVlIG9wcyB3b3JrXG4gICAgYWxpY2VUZXN0LmFkZCgzKTtcbiAgICBib2JUZXN0LmFkZCg0KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgNyk7XG5cbiAgICAvLyBEZWxldGUgd29ya3NcbiAgICBib2JKc29uLmRlbGV0ZShcInRlc3RcIiwgMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQoYWxpY2VKc29uLmdldChcInRlc3RcIiwgMCkgPT09IHVuZGVmaW5lZCk7XG4gICAgYXNzZXJ0KGJvYkpzb24uZ2V0KFwidGVzdFwiLCAwKSA9PT0gdW5kZWZpbmVkKTtcblxuICAgIGFsaWNlSnNvbi5pbml0KFwicmVnaXN0ZXJcIiwgMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuXG4gICAgLy8gQ29uY3VycmVudCBvcGVyYXRpb24gcmV2aXZlcyBrZXlcbiAgICBsZXQgYm9iUmVnaXN0ZXIgPSBib2JKc29uLmdldChcInJlZ2lzdGVyXCIsIDApIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhbGljZUpzb24uZGVsZXRlKFwicmVnaXN0ZXJcIiwgMCk7XG4gICAgYm9iUmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbCgoYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIsIDApIGFzIEludFJlZ2lzdGVyQ3JkdCkudmFsdWUsIDMpO1xuXG4gICAgLy8gLy8gUmVzZXQgdGVzdHNcbiAgICAvLyAvLyBDb25jdXJyZW50IG9wIHJldml2ZXNcbiAgICAvLyBsZXQgYWxpY2VSZWdpc3RlciA9IGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgLy8gYWxpY2VKc29uLnJlc2V0KCk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpLCB1bmRlZmluZWQpO1xuICAgIC8vIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICAvLyBib2JSZWdpc3Rlci5hZGQoNSk7XG4gICAgLy8gcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDUpO1xuICAgIC8vIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLCBhbGljZUpzb24uZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIC8vIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICAvL1xuICAgIC8vIC8vIENhdXNhbGx5IGxhdGVyIG9wIHJldml2ZXNcbiAgICAvLyBib2JKc29uLnJlc2V0KCk7XG4gICAgLy8gYm9iUmVnaXN0ZXIuYWRkKDcpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA3KTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgNyk7XG5cbiAgICAvLyBUT0RPOiBzdHJvbmcgZGVsZXRlLCBzdHJvbmcgcmVzZXRzLCBuZXN0aW5nP1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RKc29uQ29udmVyc2lvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RKc29uTWFwRmVhdHVyZXMoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uMlwiLCBhbGljZSk7XG4gICAgbGV0IGJvYkpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uMlwiLCBib2IpO1xuXG4gICAgbGV0IHRlc3RPYmogPSB7XG4gICAgICAgIFwidG9waWNcIjogXCJnYW1lc1wiLFxuICAgICAgICBcInJldmlld3NcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1vbm9wb2x5XCIsIFwicmF0aW5nXCI6IDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImxpZmVcIiwgXCJyYXRpbmdcIjogNn1cbiAgICAgICAgXVxuICAgIH07XG4gICAgbGV0IG5lc3RlZE9iaiA9IHtcbiAgICAgICAgXCJ0b3BpY1wiOiBcIm5lc3RpbmdcIixcbiAgICAgICAgXCJuZXN0ZWRcIjogdGVzdE9ialxuICAgIH07XG4gICAgYWxpY2VKc29uLnZhbHVlID0gbmVzdGVkT2JqO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGNvbnNvbGUubG9nKFwiYWxpY2U6IFwiICsgSlNPTi5zdHJpbmdpZnkoYWxpY2VKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBjb25zb2xlLmxvZyhcImJvYjogXCIgKyBKU09OLnN0cmluZ2lmeShib2JKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuXG4gICAgYm9iSnNvbi5zZXRWYWx1ZShcImZsYWdcIiwgdHJ1ZSk7XG4gICAgKG5lc3RlZE9iaiBhcyBhbnkpLmZsYWcgPSB0cnVlO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGNvbnNvbGUubG9nKFwiYWxpY2U6IFwiICsgSlNPTi5zdHJpbmdpZnkoYWxpY2VKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBjb25zb2xlLmxvZyhcImJvYjogXCIgKyBKU09OLnN0cmluZ2lmeShib2JKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdEpzb25NYXBGZWF0dXJlcygpO1xudGVzdEpzb25Db252ZXJzaW9uKCk7XG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5mdW5jdGlvbiBpc1N1cGVyc2V0PFQ+KHNldDogU2V0PFQ+LCBzdWJzZXQ6IFNldDxUPikge1xuICAgIGZvciAobGV0IGVsZW0gb2Ygc3Vic2V0KSB7XG4gICAgICAgIGlmICghc2V0LmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIHNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIHJldHVybiBpc1N1cGVyc2V0KHNldDEsIHNldDIpICYmIGlzU3VwZXJzZXQoc2V0Miwgc2V0MSk7XG59XG5mdW5jdGlvbiBhc3NlcnRTZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICBpZighc2V0RXF1YWxzKHNldDEsIHNldDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEVxdWFscyBmYWlsZWQsIGFjdHVhbDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDEudmFsdWVzKCldKSArIFwiLCBleHBlY3RlZDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDIudmFsdWVzKCldKSk7XG4gICAgfVxuICAgIGFzc2VydChzZXRFcXVhbHMoc2V0MSwgc2V0MikpO1xufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7SW50UmVnaXN0ZXJDcmR0fSBmcm9tIFwiLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkXCI7XG5cbmxldCBydW50aW1lR2VuID0gbmV3IFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yKCk7XG5sZXQgYWxpY2UgPSBydW50aW1lR2VuLm5ld1J1bnRpbWUoXCJhbGljZVwiKTtcbmxldCBib2IgPSBydW50aW1lR2VuLm5ld1J1bnRpbWUoXCJib2JcIik7XG5cbmZ1bmN0aW9uIHRlc3RSZXNldHRhYmxlQ291bnRlcigpIHtcbiAgICAvLyBUZXN0IERlZmF1bHRSZXNldHRhYmxlQ3JkdCBieSB0ZXN0aW5nIEludFJlZ2lzdGVyQ3JkdCdzXG4gICAgLy8gYWRkIGFuZCByZXNldCBvcGVyYXRpb25zLCBzaW5jZSBpdCdzIGEgc2ltcGxlIGV4YW1wbGUuXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUNvdW50ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwicmVzZXR0YWJsZUNvdW50ZXJJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkNvdW50ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwicmVzZXR0YWJsZUNvdW50ZXJJZFwiLCBib2IpO1xuICAgIGJvYkNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYWxpY2VDb3VudGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMyk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgLTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAtMSk7XG5cbiAgICBhbGljZUNvdW50ZXIudmFsdWUgPSAxMTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDExKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VDb3VudGVyLmFkZCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDExKTtcblxuICAgIGJvYkNvdW50ZXIuYWRkKC01KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDYpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgOCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDgpO1xuXG4gICAgLy8gT2JzZXJ2ZWQgcmVzZXQgdGVzdHNcbiAgICBhbGljZUNvdW50ZXIucmVzZXQoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBib2JDb3VudGVyLmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNyk7XG5cbiAgICAvLyBDb25jdXJyZW50IGFkZCBzaG91bGQgc3Vydml2ZVxuICAgIGFsaWNlQ291bnRlci5yZXNldCgpO1xuICAgIGJvYkNvdW50ZXIuYWRkKDEwKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDEwKTtcblxuICAgIC8vIFJlc2V0LXdpbnMgdGVzdHNcbiAgICBib2JDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYWxpY2VDb3VudGVyLmFkZCg2KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNik7XG5cbiAgICAvLyBDb25jdXJyZW50IGFkZCBzaG91bGQgbm90IHN1cnZpdmVcbiAgICBhbGljZUNvdW50ZXIucmVzZXRTdHJvbmcoKTtcbiAgICBib2JDb3VudGVyLmFkZCgyMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgLy8gTG90cyBvZiBjb25jdXJyZW5jeVxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgYm9iQ291bnRlci5hZGQoNyk7XG4gICAgYWxpY2VDb3VudGVyLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlKGJvYik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDcpO1xuICAgIGJvYkNvdW50ZXIucmVzZXRTdHJvbmcoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG50ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKTtcbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQgeyBFbmFibGVXaW5zRmxhZywgRGlzYWJsZVdpbnNGbGFnLCBJbnRSZWdpc3RlckNyZHQsIFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCwgQWRkV2luc1NldCwgQ3JkdE9iamVjdCwgTWFwQ3JkdCB9IGZyb20gJy4uLy4uL3NyYy9jcmR0cy9zdGFuZGFyZCc7XG5pbXBvcnQgeyBDcmR0UnVudGltZSB9IGZyb20gJy4uLy4uL3NyYy9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlJztcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdEV3RmxhZygpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RFd0ZsYWcoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUZsYWcgPSBuZXcgRW5hYmxlV2luc0ZsYWcoXCJld0ZsYWdJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkZsYWcgPSBuZXcgRW5hYmxlV2luc0ZsYWcoXCJld0ZsYWdJZFwiLCBib2IpO1xuICAgIGJvYkZsYWcub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBhbGljZUZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGFsaWNlRmxhZy5lbmFibGUoKTtcbiAgICBib2JGbGFnLmRpc2FibGUoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIHRydWUpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIHRydWUpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdER3RmxhZygpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3REd0ZsYWcoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUZsYWcgPSBuZXcgRGlzYWJsZVdpbnNGbGFnKFwiZHdGbGFnSWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlRmxhZy5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JGbGFnID0gbmV3IERpc2FibGVXaW5zRmxhZyhcImR3RmxhZ0lkXCIsIGJvYik7XG4gICAgYm9iRmxhZy5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIHRydWUpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIHRydWUpO1xuXG4gICAgYWxpY2VGbGFnLmRpc2FibGUoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBib2JGbGFnLmVuYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBhbGljZUZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGFsaWNlRmxhZy5lbmFibGUoKTtcbiAgICBib2JGbGFnLmRpc2FibGUoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIHRydWUpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RJbnRSZWdpc3RlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RJbnRSZWdpc3RlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlSW50UmVnaXN0ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWRcIiwgYm9iKTtcbiAgICBib2JJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDApO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG5cbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTEyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC0xMik7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RzXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0zKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcblxuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0zKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC0yNSk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTE1KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC0xNSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEZyb21QYXBlcigpIHtcbiAgICAvLyBUaGUgKy94IGV4YW1wbGUgZnJvbSB0aGUgZmlndXJlIGluIHRoZSBwYXBlclxuICAgIGNvbnNvbGUubG9nKFwidGVzdEZyb21QYXBlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlSW50UmVnaXN0ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZDJcIiwgYWxpY2UsIDEpO1xuICAgIGFsaWNlSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGxldCBib2JJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkMlwiLCBib2IsIDEpO1xuICAgIGJvYkludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDEpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMSk7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLm11bHQoMik7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoMSk7XG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCgzKTtcbiAgICBib2JJbnRSZWdpc3Rlci5hZGQoNCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgNyk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMTcpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMTcpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RVbnJlc2V0dGFibGVJbnRSZWdpc3RlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RJbnRSZWdpc3RlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlSW50UmVnaXN0ZXIgPSBuZXcgVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZDNcIiwgYWxpY2UpO1xuICAgIGFsaWNlSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGxldCBib2JJbnRSZWdpc3RlciA9IG5ldyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkM1wiLCBib2IpO1xuICAgIGJvYkludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTEyKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdHNcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCg1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTI1KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTE1KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5jbGFzcyBCaUNvdW50ZXIgZXh0ZW5kcyBDcmR0T2JqZWN0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PiB7XG4gICAgYTogSW50UmVnaXN0ZXJDcmR0O1xuICAgIGI6IEludFJlZ2lzdGVyQ3JkdDtcbiAgICBjb25zdHJ1Y3RvcihjcmR0SWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoY3JkdElkLCBydW50aW1lKTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYSA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJhXCIsIHRoaXMsIDEpO1xuICAgICAgICB0aGlzLmIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiYlwiLCB0aGlzLCAxKTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGVzdENyZHRPYmplY3QoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0Q3JkdE9iamVjdCgpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlQmkgPSBuZXcgQmlDb3VudGVyKFwiYmlJZFwiLCBhbGljZSk7XG4gICAgbGV0IGJvYkJpID0gbmV3IEJpQ291bnRlcihcImJpSWRcIiwgYm9iKTtcblxuICAgIC8vIERvIHRlc3RGcm9tUGFwZXIoKSBvbiBlYWNoIGNvdW50ZXJcbiAgICBhbGljZUJpLmEub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2UgYTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYm9iQmkuYS5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2IgYTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYWxpY2VCaS5iLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlIGI6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGJvYkJpLmIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iIGI6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmEudmFsdWUsIDEpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5hLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlQmkuYS5tdWx0KDIpO1xuICAgIGFsaWNlQmkuYS5hZGQoMSk7XG4gICAgYm9iQmkuYS5tdWx0KDMpO1xuICAgIGJvYkJpLmEuYWRkKDQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmEudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5hLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmEudmFsdWUsIDE3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgMTcpO1xuXG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQmkuYi52YWx1ZSwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmIudmFsdWUsIDEpO1xuXG4gICAgYWxpY2VCaS5iLm11bHQoMik7XG4gICAgYWxpY2VCaS5iLmFkZCgxKTtcbiAgICBib2JCaS5iLm11bHQoMyk7XG4gICAgYm9iQmkuYi5hZGQoNCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQmkuYi52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmIudmFsdWUsIDcpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQmkuYi52YWx1ZSwgMTcpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCAxNyk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0QXdTZXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0QXdTZXQoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZVNldCA9IG5ldyBBZGRXaW5zU2V0PHN0cmluZz4oXCJhd1NldElkXCIsIGFsaWNlKTtcbiAgICBhbGljZVNldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgK1xuICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgbGV0IGJvYlNldCA9IG5ldyBBZGRXaW5zU2V0PHN0cmluZz4oXCJhd1NldElkXCIsIGJvYik7XG4gICAgYm9iU2V0Lm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgK1xuICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KCkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCJlbGVtZW50XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG5cbiAgICBib2JTZXQuYWRkKFwiN1wiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCI3XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VTZXQuYWRkKFwiZmlyc3RcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCIsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICBib2JTZXQuYWRkKFwic2Vjb25kXCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcInNlY29uZFwiXSkpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIC8vIERlbGV0ZSB0ZXN0cyBvbiBzaW5nbGUgZWxlbWVudCAoY29weWluZyBFd0ZsYWcgdGVzdHMpXG4gICAgYWxpY2VTZXQuZGVsZXRlKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIGJvYlNldC5kZWxldGUoXCJub25leGlzdGVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIGFsaWNlU2V0LmFkZChcImNvbmN1cnJlbnRcIik7XG4gICAgYWxpY2VTZXQuZGVsZXRlKFwiY29uY3VycmVudFwiKTtcbiAgICBib2JTZXQuYWRkKFwiY29uY3VycmVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCIsIFwiY29uY3VycmVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCIsIFwiY29uY3VycmVudFwiXSkpO1xuICAgIC8vIFRPRE86IHRlc3QgZGVsZXRlU3Ryb25nXG5cbiAgICAvLyBPYnNlcnZlZC1yZXNldCB0ZXN0XG4gICAgYm9iU2V0LnJlc2V0KCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldCgpKTtcbiAgICBhbGljZVNldC5hZGQoXCJzdXJ2aXZvclwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wic3Vydml2b3JcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcInN1cnZpdm9yXCJdKSk7XG4gICAgLy9cbiAgICAvLyAvLyBSZXNldC13aW5zIHRlc3RcbiAgICAvLyBhbGljZVNldC5yZXNldFN0cm9uZygpO1xuICAgIC8vIGFsaWNlU2V0LmFkZChcImFsaWNlJ3NcIik7XG4gICAgLy8gYm9iU2V0LnJlc2V0KCk7XG4gICAgLy8gYm9iU2V0LmFkZChcImJvYidzXCIpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJhbGljZSdzXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJib2Inc1wiXSkpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJhbGljZSdzXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJhbGljZSdzXCJdKSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0TWFwKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE1hcCgpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlTWFwID0gbmV3IE1hcENyZHQ8c3RyaW5nLCBJbnRSZWdpc3RlckNyZHQ+KFwibWFwXCIsIGFsaWNlLFxuICAgICAgICAgICAgKGtleTogc3RyaW5nLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgbGV0IGJvYk1hcCA9IG5ldyBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PihcIm1hcFwiLCBib2IsXG4gICAgICAgICAgICAoa2V5OiBzdHJpbmcsIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IG5ldyBJbnRSZWdpc3RlckNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcblxuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXSkpO1xuXG4gICAgLy8gSW5pdHMgZ28gdGhyb3VnaFxuICAgIGFsaWNlTWFwLmluaXQoXCJ0ZXN0XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW1widGVzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnQoYWxpY2VNYXAuaGFzKFwidGVzdFwiKSk7XG4gICAgYXNzZXJ0KGJvYk1hcC5oYXMoXCJ0ZXN0XCIpKTtcblxuICAgIGxldCBhbGljZVRlc3QgPSBhbGljZU1hcC5nZXQoXCJ0ZXN0XCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhc3NlcnQoYWxpY2VUZXN0KTtcbiAgICBsZXQgYm9iVGVzdCA9IGJvYk1hcC5nZXQoXCJ0ZXN0XCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhc3NlcnQoYm9iVGVzdCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlVGVzdC52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlRlc3QudmFsdWUsIDApO1xuXG4gICAgLy8gVmFsdWUgb3BzIHdvcmtcbiAgICBhbGljZVRlc3QuYWRkKDMpO1xuICAgIGJvYlRlc3QuYWRkKDQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCA3KTtcblxuICAgIC8vIERlbGV0ZSB3b3Jrc1xuICAgIGJvYk1hcC5kZWxldGUoXCJ0ZXN0XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXSkpO1xuICAgIGFzc2VydChhbGljZU1hcC5nZXQoXCJ0ZXN0XCIpID09PSB1bmRlZmluZWQpO1xuICAgIGFzc2VydChib2JNYXAuZ2V0KFwidGVzdFwiKSA9PT0gdW5kZWZpbmVkKTtcblxuICAgIGFsaWNlTWFwLmluaXQoXCJyZWdpc3RlclwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcblxuICAgIC8vIENvbmN1cnJlbnQgb3BlcmF0aW9uIHJldml2ZXMga2V5XG4gICAgbGV0IGJvYlJlZ2lzdGVyID0gYm9iTWFwLmdldChcInJlZ2lzdGVyXCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhbGljZU1hcC5kZWxldGUoXCJyZWdpc3RlclwiKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoKGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpIGFzIEludFJlZ2lzdGVyQ3JkdCkudmFsdWUsIDMpO1xuXG4gICAgLy8gUmVzZXQgdGVzdHNcbiAgICAvLyBDb25jdXJyZW50IG9wIHJldml2ZXNcbiAgICBsZXQgYWxpY2VSZWdpc3RlciA9IGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhbGljZU1hcC5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIiksIHVuZGVmaW5lZCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDApO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCg1KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLCBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDUpO1xuXG4gICAgLy8gQ2F1c2FsbHkgbGF0ZXIgb3AgcmV2aXZlc1xuICAgIGJvYk1hcC5yZXNldCgpO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLCBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gVE9ETzogc3Ryb25nIGRlbGV0ZSwgc3Ryb25nIHJlc2V0cywgbmVzdGluZz9cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG50ZXN0RXdGbGFnKCk7XG50ZXN0RHdGbGFnKCk7XG50ZXN0SW50UmVnaXN0ZXIoKTtcbnRlc3RGcm9tUGFwZXIoKTtcbnRlc3RVbnJlc2V0dGFibGVJbnRSZWdpc3RlcigpO1xudGVzdENyZHRPYmplY3QoKTtcbnRlc3RBd1NldCgpO1xudGVzdE1hcCgpO1xuXG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5mdW5jdGlvbiBpc1N1cGVyc2V0PFQ+KHNldDogU2V0PFQ+LCBzdWJzZXQ6IFNldDxUPikge1xuICAgIGZvciAobGV0IGVsZW0gb2Ygc3Vic2V0KSB7XG4gICAgICAgIGlmICghc2V0LmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIHNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIHJldHVybiBpc1N1cGVyc2V0KHNldDEsIHNldDIpICYmIGlzU3VwZXJzZXQoc2V0Miwgc2V0MSk7XG59XG5mdW5jdGlvbiBhc3NlcnRTZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICBpZighc2V0RXF1YWxzKHNldDEsIHNldDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEVxdWFscyBmYWlsZWQsIGFjdHVhbDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDEudmFsdWVzKCldKSArIFwiLCBleHBlY3RlZDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDIudmFsdWVzKCldKSk7XG4gICAgfVxuICAgIGFzc2VydChzZXRFcXVhbHMoc2V0MSwgc2V0MikpO1xufVxuIiwiaW1wb3J0IHtDcmR0UnVudGltZSwgQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgQ2F1c2FsVGltZXN0YW1wfSBmcm9tIFwiLi4vc3JjL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcblxuY2xhc3MgVGVzdGluZ1J1bnRpbWUgaW1wbGVtZW50cyBDcmR0UnVudGltZSB7XG4gICAgbGlzdGVuZXJzQnlJZCA9IG5ldyBNYXA8YW55LCBDcmR0TWVzc2FnZUxpc3RlbmVyPigpO1xuICAgIHZlY3RvckNsb2NrID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdlbmVyYXRvciA6IFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yLFxuICAgICAgICAgICAgcHJpdmF0ZSByZXBsaWNhSWQgOiBhbnkpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JDbG9jay5zZXQocmVwbGljYUlkLCAwKTtcbiAgICB9XG4gICAgc2VuZChtZXNzYWdlOiBhbnksIGNyZHRJZDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmVjdG9yQ2xvY2suc2V0KHRoaXMucmVwbGljYUlkLCB0aGlzLnZlY3RvckNsb2NrLmdldChcbiAgICAgICAgICAgIHRoaXMucmVwbGljYUlkKSBhcyBudW1iZXIgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGxldCBteVJlcGxpY2FJZCA9IHRoaXMucmVwbGljYUlkO1xuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IE1hcCh0aGlzLnZlY3RvckNsb2NrKTtcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHtcbiAgICAgICAgICAgIGdldFNlbmRlcigpIHsgcmV0dXJuIG15UmVwbGljYUlkOyB9LFxuICAgICAgICAgICAgZ2V0U2VuZGVyQ291bnRlcigpIHsgcmV0dXJuIHZjQ29weS5nZXQodGhpcy5nZXRTZW5kZXIoKSkgYXMgbnVtYmVyO30sXG4gICAgICAgICAgICBhc1ZlY3RvckNsb2NrKCkgeyByZXR1cm4gdmNDb3B5OyB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHF1ZXVlTWFwID0gdGhpcy5nZW5lcmF0b3IubWVzc2FnZVF1ZXVlcy5nZXQodGhpcykgYXNcbiAgICAgICAgICAgIE1hcDxUZXN0aW5nUnVudGltZSwgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPj47XG4gICAgICAgIGZvciAobGV0IHF1ZXVlIG9mIHF1ZXVlTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAvLyBVc2UgZGlmZmVyZW50IGNvcGllcyBmb3IgZWFjaCBDcmR0LCBpbiBjYXNlIHRoZXlcbiAgICAgICAgICAgIC8vIG1vZGlmeSBtZXNzYWdlIHdoaWxlIHByb2Nlc3NpbmcgaXRcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goW0pTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpLCBjcmR0SWQsIHRpbWVzdGFtcF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZ2lzdGVyKGNyZHRNZXNzYWdlTGlzdGVuZXI6IENyZHRNZXNzYWdlTGlzdGVuZXIsIGNyZHRJZDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc0J5SWQuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBjcmR0SWQ6IFwiICsgY3JkdElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbmVyc0J5SWQuc2V0KGNyZHRJZCwgY3JkdE1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgfVxuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGljYUlkO1xuICAgIH1cbiAgICBnZXROZXh0VGltZXN0YW1wKCkge1xuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IE1hcCh0aGlzLnZlY3RvckNsb2NrKTtcbiAgICAgICAgdmNDb3B5LnNldCh0aGlzLnJlcGxpY2FJZCwgdGhpcy52ZWN0b3JDbG9jay5nZXQoXG4gICAgICAgICAgICB0aGlzLnJlcGxpY2FJZCkgYXMgbnVtYmVyICsgMVxuICAgICAgICApO1xuICAgICAgICBsZXQgbXlSZXBsaWNhSWQgPSB0aGlzLnJlcGxpY2FJZDtcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHtcbiAgICAgICAgICAgIGdldFNlbmRlcigpIHsgcmV0dXJuIG15UmVwbGljYUlkOyB9LFxuICAgICAgICAgICAgZ2V0U2VuZGVyQ291bnRlcigpIHsgcmV0dXJuIHZjQ29weS5nZXQodGhpcy5nZXRTZW5kZXIoKSkgYXMgbnVtYmVyO30sXG4gICAgICAgICAgICBhc1ZlY3RvckNsb2NrKCkgeyByZXR1cm4gdmNDb3B5OyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNvbGxlY3Rpb24gb2YgQ3JkdFJ1bnRpbWVzIGxpbmtlZCB0b2dldGhlclxuICogKGkuZS4sIGluLW1lbW9yeSBuZXR3b3JraW5nKSB0aGF0IGRlbGl2ZXIgbWVzc2FnZXNcbiAqIHdoZW4gcmVsZWFzZSBpcyBjYWxsZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0aW5nUnVudGltZUdlbmVyYXRvciB7XG4gICAgbmV3UnVudGltZShyZXBsaWNhSWQ/OiBhbnkpIDogVGVzdGluZ1J1bnRpbWUge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB1bmRlZmluZWQpIHJlcGxpY2FJZCA9IHRoaXMubWVzc2FnZVF1ZXVlcy5zaXplO1xuICAgICAgICBsZXQgcnVudGltZSA9IG5ldyBUZXN0aW5nUnVudGltZSh0aGlzLCByZXBsaWNhSWQpO1xuICAgICAgICBsZXQgbmV3UXVldWUgPSBuZXcgTWFwPFRlc3RpbmdSdW50aW1lLCBBcnJheTxhbnk+PigpO1xuICAgICAgICBmb3IgKGxldCBvbGRFbnRyeSBvZiB0aGlzLm1lc3NhZ2VRdWV1ZXMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBuZXdRdWV1ZS5zZXQob2xkRW50cnlbMF0sIFtdKTtcbiAgICAgICAgICAgIG9sZEVudHJ5WzFdLnNldChydW50aW1lLCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tZXNzYWdlUXVldWVzLnNldChydW50aW1lLCBuZXdRdWV1ZSk7XG4gICAgICAgIHJldHVybiBydW50aW1lO1xuICAgIH1cbiAgICAvLyBNYXBzIHNlbmRlciBhbmQgcmVjaXBpZW50IHRvIGFuIGFycmF5IG9mIHF1ZXVlZCBbbWVzc2FnZSxcbiAgICAvLyBjcmR0SWQsIHRpbWVzdGFtcF0gdHVwbGVzLlxuICAgIG1lc3NhZ2VRdWV1ZXMgPSBuZXcgTWFwPFRlc3RpbmdSdW50aW1lLFxuICAgICAgICBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PFthbnksIGFueSwgQ2F1c2FsVGltZXN0YW1wXT4+PigpO1xuICAgIC8qKlxuICAgICAqIFJlbGVhc2UgYWxsIHF1ZXVlZCBtZXNzYWdlcyBzZW5kZXIgdG8gdGhlIHNwZWNpZmllZCByZWNpcGllbnRzLlxuICAgICAqIElmIHJlY2lwaWVudHMgYXJlIG5vdCBzcGVjaWZpZWQsIHJlbGVhc2VzIHRoZW0gdG8gYWxsXG4gICAgICogcmVjaXBpZW50cy4gIE9ubHkgcmVjaXBpZW50cyB0aGF0IGV4aXN0ZWQgYXQgdGhlIHRpbWVcbiAgICAgKiBvZiBzZW5kaW5nIHdpbGwgcmVjZWl2ZSBhIG1lc3NhZ2UuXG4gICAgICovXG4gICAgcmVsZWFzZShzZW5kZXI6IFRlc3RpbmdSdW50aW1lLCAuLi5yZWNpcGllbnRzOiBUZXN0aW5nUnVudGltZVtdKSB7XG4gICAgICAgIGlmIChyZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkgcmVjaXBpZW50cyA9IFsuLi50aGlzLm1lc3NhZ2VRdWV1ZXMua2V5cygpXTtcbiAgICAgICAgbGV0IHNlbmRlck1hcCA9IHRoaXMubWVzc2FnZVF1ZXVlcy5nZXQoc2VuZGVyKSBhc1xuICAgICAgICAgICAgTWFwPFRlc3RpbmdSdW50aW1lLCBBcnJheTxhbnk+PjtcbiAgICAgICAgZm9yIChsZXQgcmVjaXBpZW50IG9mIHJlY2lwaWVudHMpIHtcbiAgICAgICAgICAgIGlmIChyZWNpcGllbnQgPT09IHNlbmRlcikgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKGxldCBtZXNzYWdlUGFpciBvZiAoc2VuZGVyTWFwLmdldChyZWNpcGllbnQpIGFzIEFycmF5PFthbnksIGFueSwgQ2F1c2FsVGltZXN0YW1wXT4pKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gcmVjaXBpZW50Lmxpc3RlbmVyc0J5SWQuZ2V0KFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlUGFpclsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gQ3JkdCB3aXRoIGlkIFwiICsgbWVzc2FnZVBhaXJbMV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIgb24gcmVwbGljYSBcIiArIHJlY2lwaWVudC5nZXRSZXBsaWNhSWQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnJlY2VpdmUobWVzc2FnZVBhaXJbMF0sIG1lc3NhZ2VQYWlyWzJdKTtcbiAgICAgICAgICAgICAgICByZWNpcGllbnQudmVjdG9yQ2xvY2suc2V0KHNlbmRlci5nZXRSZXBsaWNhSWQoKSwgbWVzc2FnZVBhaXJbMl0uZ2V0U2VuZGVyQ291bnRlcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRlck1hcC5zZXQocmVjaXBpZW50LCBbXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsZWFzZUFsbCgpIHtcbiAgICAgICAgZm9yIChsZXQgc2VuZGVyIG9mIHRoaXMubWVzc2FnZVF1ZXVlcy5rZXlzKCkpIHRoaXMucmVsZWFzZShzZW5kZXIpO1xuICAgIH1cbn1cbiIsImNvbnNvbGUubG9nKFwiUnVubmluZyB0ZXN0c1wiKTtcbnJlcXVpcmUoJy4vY3JkdHMvYmFzaWNfY3JkdHNfdGVzdHMnKTtcbnJlcXVpcmUoJy4vY3JkdHMvcmVzZXR0YWJsZV90ZXN0cycpO1xucmVxdWlyZSgnLi9jcmR0cy9zdGFuZGFyZF90ZXN0cycpO1xucmVxdWlyZSgnLi9jcmR0cy9qc29uX3Rlc3RzJyk7XG5cblxuLy8gY29uc3QgaG93TG9uZ1RpbGxMdW5jaCA9IHJlcXVpcmUoJy4uJyk7XG4vL1xuLy8gY2xhc3MgTW9ja0RhdGUge1xuLy8gXHRwcml2YXRlIGRhdGUgPSAwO1xuLy8gXHRwcml2YXRlIGhvdXJzID0gMDtcbi8vIFx0cHJpdmF0ZSBtaW51dGVzID0gMDtcbi8vIFx0cHJpdmF0ZSBzZWNvbmRzID0gMDtcbi8vIFx0cHJpdmF0ZSBtaWxsaXNlY29uZHMgPSAwO1xuLy9cbi8vIFx0Z2V0RGF0ZSAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZGF0ZTsgfVxuLy8gXHRzZXREYXRlIChkYXRlOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5kYXRlID0gZGF0ZTsgfVxuLy8gXHRzZXRIb3VycyAoaDogbnVtYmVyKSB7IHRoaXMuaG91cnMgPSBoOyB9XG4vLyBcdHNldE1pbnV0ZXMgKG06IG51bWJlcik6IHZvaWQgeyB0aGlzLm1pbnV0ZXMgPSBtOyB9XG4vLyBcdHNldFNlY29uZHMgKHM6IG51bWJlcik6IHZvaWQgeyB0aGlzLnNlY29uZHMgPSBzOyB9XG4vLyBcdHNldE1pbGxpc2Vjb25kcyAobXM6IG51bWJlcik6IHZvaWQgeyB0aGlzLm1pbGxpc2Vjb25kcyA9IG1zOyB9XG4vLyBcdGdldFRpbWUgKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnZhbHVlT2YoKTsgfVxuLy8gXHR2YWx1ZU9mICgpOiBudW1iZXIge1xuLy8gXHRcdHJldHVybiAoXG4vLyBcdFx0XHR0aGlzLm1pbGxpc2Vjb25kcyArXG4vLyBcdFx0XHR0aGlzLnNlY29uZHMgKiAxZTMgK1xuLy8gXHRcdFx0dGhpcy5taW51dGVzICogMWUzICogNjAgK1xuLy8gXHRcdFx0dGhpcy5ob3VycyAqIDFlMyAqIDYwICogNjAgK1xuLy8gXHRcdFx0dGhpcy5kYXRlICogMWUzICogNjAgKiA2MCAqIDI0XG4vLyBcdFx0KTtcbi8vIFx0fVxuLy9cbi8vIFx0c3RhdGljIG5vdyAoKSB7IHJldHVybiBub3cudmFsdWVPZigpOyB9XG4vLyB9XG4vL1xuLy8gY29uc3Qgbm93ID0gbmV3IE1vY2tEYXRlKCk7XG4vL1xuLy8gZ2xvYmFsLkRhdGUgPSBNb2NrRGF0ZSBhcyBhbnkgYXMgdHlwZW9mIERhdGU7XG4vL1xuLy8gZnVuY3Rpb24gdGVzdChob3VyczogbnVtYmVyLCBtaW51dGVzOiBudW1iZXIsIHNlY29uZHM6IG51bWJlciwgZXhwZWN0ZWQ6IHN0cmluZyk6IHZvaWQge1xuLy8gXHRub3cuc2V0SG91cnMoaG91cnMpO1xuLy8gXHRub3cuc2V0TWludXRlcyhtaW51dGVzKTtcbi8vIFx0bm93LnNldFNlY29uZHMoc2Vjb25kcyk7XG4vL1xuLy8gXHRhc3NlcnQuZXF1YWwoaG93TG9uZ1RpbGxMdW5jaCguLi5sdW5jaHRpbWUpLCBleHBlY3RlZCk7XG4vLyBcdGNvbnNvbGUubG9nKGBcXHUwMDFCWzMybeKck1xcdTAwMUJbMzltICR7ZXhwZWN0ZWR9YCk7XG4vLyB9XG4vL1xuLy8gbGV0IGx1bmNodGltZSA9IFsgMTIsIDMwIF07XG4vLyB0ZXN0KDExLCAzMCwgMCwgJzEgaG91cicpO1xuLy8gdGVzdCgxMCwgMzAsIDAsICcyIGhvdXJzJyk7XG4vLyB0ZXN0KDEyLCAyNSwgMCwgJzUgbWludXRlcycpO1xuLy8gdGVzdCgxMiwgMjksIDE1LCAnNDUgc2Vjb25kcycpO1xuLy8gdGVzdCgxMywgMzAsIDAsICcyMyBob3VycycpO1xuLy9cbi8vIC8vIHNvbWUgb2YgdXMgbGlrZSBhbiBlYXJseSBsdW5jaFxuLy8gbHVuY2h0aW1lID0gWyAxMSwgMCBdO1xuLy8gdGVzdCgxMCwgMzAsIDAsICczMCBtaW51dGVzJyk7XG4iXSwic291cmNlUm9vdCI6IiJ9