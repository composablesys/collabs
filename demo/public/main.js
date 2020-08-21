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

/***/ "./node_modules/assert/assert.js":
/*!***************************************!*\
  !*** ./node_modules/assert/assert.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

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

var util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
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

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
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

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
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

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

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
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/util/node_modules/inherits/inherits_browser.js");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

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
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, 'ws');
/**
 * Generate uuid for each client.
 */
const client_uuid = uuid_1.v4();
/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new crdt_network_runtime_1.CrdtNetworkRuntime(client_uuid, HOST);
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
            // Use heartbeat to keep client alive.
            // this.heartbeat();
        };
        /**
         * Invoke heartbeat function to keep clients alive.
         *
         * TODO:
         * The message sending to server is 'heartbeat' right now.
         * The timeout interval is set to 5000 millionseconds.
         */
        // heartbeat() : void {
        //     setTimeout(() => {
        //         this.ws.send('heartbeat');
        //         this.heartbeat();
        //     }, 5000);
        // }
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
        // this.ws.addEventListener('ping', function(pingMessage){
        //     console.log('Receive a ping : ' + pingMessage);
        // });
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/assert.js"));
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/assert.js"));
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/assert.js"));
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
const assert_1 = __importDefault(__webpack_require__(/*! assert */ "./node_modules/assert/assert.js"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvYXNzZXJ0L2Fzc2VydC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy91dGlsL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9iYXNpY19jcmR0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2NyZHRfY29yZS50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2pzb24udHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9yZXNldHRhYmxlLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvc2VtaWRpcmVjdC50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL3N0YW5kYXJkLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9uZXR3b3JrL3ZlY3Rvcl9jbG9jay50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9iYXNpY19jcmR0c190ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9qc29uX3Rlc3RzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL3Jlc2V0dGFibGVfdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvY3JkdHMvc3RhbmRhcmRfdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvcnVudGltZV9mb3JfdGVzdGluZy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBLDhDQUFhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLDREQUFlOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLDBDQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EsbURBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxvQkFBb0I7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN6ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMsS0FBSzs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixtQkFBTyxDQUFDLDBFQUFvQjs7QUFFL0M7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtB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Q0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUc7UUFDN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFD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LG1CQUFtQjtBQUNuQixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsNkJBQTZCO0FBQzdCLEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsc0RBQXNEO0FBQ3RELDRDQUE0QztBQUM1QyxzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELGtFQUFrRTtBQUNsRSxpREFBaUQ7QUFDakQsd0JBQXdCO0FBQ3hCLGFBQWE7QUFDYix5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCLCtCQUErQjtBQUMvQixrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLE9BQU87QUFDUCxLQUFLO0FBQ0wsRUFBRTtBQUNGLDJDQUEyQztBQUMzQyxJQUFJO0FBQ0osRUFBRTtBQUNGLDhCQUE4QjtBQUM5QixFQUFFO0FBQ0YsZ0RBQWdEO0FBQ2hELEVBQUU7QUFDRiwyRkFBMkY7QUFDM0Ysd0JBQXdCO0FBQ3hCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsRUFBRTtBQUNGLDJEQUEyRDtBQUMzRCxxREFBcUQ7QUFDckQsSUFBSTtBQUNKLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQixFQUFFO0FBQ0Ysb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixpQ0FBaUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbi8vIGNvbXBhcmUgYW5kIGlzQnVmZmVyIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvYmxvYi82ODBlOWU1ZTQ4OGYyMmFhYzI3NTk5YTU3ZGM4NDRhNjMxNTkyOGRkL2luZGV4LmpzXG4vLyBvcmlnaW5hbCBub3RpY2U6XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIHggPSBhLmxlbmd0aDtcbiAgdmFyIHkgPSBiLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXTtcbiAgICAgIHkgPSBiW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIGlmICh5IDwgeCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAwO1xufVxuZnVuY3Rpb24gaXNCdWZmZXIoYikge1xuICBpZiAoZ2xvYmFsLkJ1ZmZlciAmJiB0eXBlb2YgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKGIpO1xuICB9XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpO1xufVxuXG4vLyBiYXNlZCBvbiBub2RlIGFzc2VydCwgb3JpZ2luYWwgbm90aWNlOlxuLy8gTkI6IFRoZSBVUkwgdG8gdGhlIENvbW1vbkpTIHNwZWMgaXMga2VwdCBqdXN0IGZvciB0cmFkaXRpb24uXG4vLyAgICAgbm9kZS1hc3NlcnQgaGFzIGV2b2x2ZWQgYSBsb3Qgc2luY2UgdGhlbiwgYm90aCBpbiBBUEkgYW5kIGJlaGF2aW9yLlxuXG4vLyBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Vbml0X1Rlc3RpbmcvMS4wXG4vL1xuLy8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuLy9cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGZ1bmN0aW9uc0hhdmVOYW1lcyA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmb28oKSB7fS5uYW1lID09PSAnZm9vJztcbn0oKSk7XG5mdW5jdGlvbiBwVG9TdHJpbmcgKG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5mdW5jdGlvbiBpc1ZpZXcoYXJyYnVmKSB7XG4gIGlmIChpc0J1ZmZlcihhcnJidWYpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEFycmF5QnVmZmVyLmlzVmlldyhhcnJidWYpO1xuICB9XG4gIGlmICghYXJyYnVmKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChhcnJidWYgaW5zdGFuY2VvZiBEYXRhVmlldykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChhcnJidWYuYnVmZmVyICYmIGFycmJ1Zi5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8vIDEuIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcblxuLy8gMi4gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gYXNzZXJ0LlxuLy8gbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7IG1lc3NhZ2U6IG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pXG5cbnZhciByZWdleCA9IC9cXHMqZnVuY3Rpb25cXHMrKFteXFwoXFxzXSopXFxzKi87XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL2Z1bmN0aW9uLnByb3RvdHlwZS5uYW1lL2Jsb2IvYWRlZWVlYzhiZmNjNjA2OGIxODdkN2Q5ZmIzZDViYjFkM2EzMDg5OS9pbXBsZW1lbnRhdGlvbi5qc1xuZnVuY3Rpb24gZ2V0TmFtZShmdW5jKSB7XG4gIGlmICghdXRpbC5pc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMpIHtcbiAgICByZXR1cm4gZnVuYy5uYW1lO1xuICB9XG4gIHZhciBzdHIgPSBmdW5jLnRvU3RyaW5nKCk7XG4gIHZhciBtYXRjaCA9IHN0ci5tYXRjaChyZWdleCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXTtcbn1cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgdGhpcy5hY3R1YWwgPSBvcHRpb25zLmFjdHVhbDtcbiAgdGhpcy5leHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yO1xuICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWVzc2FnZSA9IGdldE1lc3NhZ2UodGhpcyk7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuICB2YXIgc3RhY2tTdGFydEZ1bmN0aW9uID0gb3B0aW9ucy5zdGFja1N0YXJ0RnVuY3Rpb24gfHwgZmFpbDtcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBub24gdjggYnJvd3NlcnMgc28gd2UgY2FuIGhhdmUgYSBzdGFja3RyYWNlXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlmIChlcnIuc3RhY2spIHtcbiAgICAgIHZhciBvdXQgPSBlcnIuc3RhY2s7XG5cbiAgICAgIC8vIHRyeSB0byBzdHJpcCB1c2VsZXNzIGZyYW1lc1xuICAgICAgdmFyIGZuX25hbWUgPSBnZXROYW1lKHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgbG9jYXRlZCB0aGUgZnVuY3Rpb24gZnJhbWVcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcbiAgICAgICAgdmFyIG5leHRfbGluZSA9IG91dC5pbmRleE9mKCdcXG4nLCBpZHggKyAxKTtcbiAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyhuZXh0X2xpbmUgKyAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFjayA9IG91dDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFzc2VydC5Bc3NlcnRpb25FcnJvciBpbnN0YW5jZW9mIEVycm9yXG51dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShzLCBuKSB7XG4gIGlmICh0eXBlb2YgcyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn1cbmZ1bmN0aW9uIGluc3BlY3Qoc29tZXRoaW5nKSB7XG4gIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMgfHwgIXV0aWwuaXNGdW5jdGlvbihzb21ldGhpbmcpKSB7XG4gICAgcmV0dXJuIHV0aWwuaW5zcGVjdChzb21ldGhpbmcpO1xuICB9XG4gIHZhciByYXduYW1lID0gZ2V0TmFtZShzb21ldGhpbmcpO1xuICB2YXIgbmFtZSA9IHJhd25hbWUgPyAnOiAnICsgcmF3bmFtZSA6ICcnO1xuICByZXR1cm4gJ1tGdW5jdGlvbicgKyAgbmFtZSArICddJztcbn1cbmZ1bmN0aW9uIGdldE1lc3NhZ2Uoc2VsZikge1xuICByZXR1cm4gdHJ1bmNhdGUoaW5zcGVjdChzZWxmLmFjdHVhbCksIDEyOCkgKyAnICcgK1xuICAgICAgICAgc2VsZi5vcGVyYXRvciArICcgJyArXG4gICAgICAgICB0cnVuY2F0ZShpbnNwZWN0KHNlbGYuZXhwZWN0ZWQpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBmYWxzZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwRXF1YWwnLCBhc3NlcnQuZGVlcEVxdWFsKTtcbiAgfVxufTtcblxuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIGRlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBTdHJpY3RFcXVhbCcsIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHN0cmljdCwgbWVtb3MpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNCdWZmZXIoYWN0dWFsKSAmJiBpc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gY29tcGFyZShhY3R1YWwsIGV4cGVjdGVkKSA9PT0gMDtcblxuICAvLyA3LjIuIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIERhdGUgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIERhdGUgb2JqZWN0IHRoYXQgcmVmZXJzIHRvIHRoZSBzYW1lIHRpbWUuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0RhdGUoYWN0dWFsKSAmJiB1dGlsLmlzRGF0ZShleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMyBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIFJlZ0V4cCBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzb3VyY2UgYW5kXG4gIC8vIHByb3BlcnRpZXMgKGBnbG9iYWxgLCBgbXVsdGlsaW5lYCwgYGxhc3RJbmRleGAsIGBpZ25vcmVDYXNlYCkuXG4gIH0gZWxzZSBpZiAodXRpbC5pc1JlZ0V4cChhY3R1YWwpICYmIHV0aWwuaXNSZWdFeHAoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5zb3VyY2UgPT09IGV4cGVjdGVkLnNvdXJjZSAmJlxuICAgICAgICAgICBhY3R1YWwuZ2xvYmFsID09PSBleHBlY3RlZC5nbG9iYWwgJiZcbiAgICAgICAgICAgYWN0dWFsLm11bHRpbGluZSA9PT0gZXhwZWN0ZWQubXVsdGlsaW5lICYmXG4gICAgICAgICAgIGFjdHVhbC5sYXN0SW5kZXggPT09IGV4cGVjdGVkLmxhc3RJbmRleCAmJlxuICAgICAgICAgICBhY3R1YWwuaWdub3JlQ2FzZSA9PT0gZXhwZWN0ZWQuaWdub3JlQ2FzZTtcblxuICAvLyA3LjQuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoKGFjdHVhbCA9PT0gbnVsbCB8fCB0eXBlb2YgYWN0dWFsICE9PSAnb2JqZWN0JykgJiZcbiAgICAgICAgICAgICAoZXhwZWN0ZWQgPT09IG51bGwgfHwgdHlwZW9mIGV4cGVjdGVkICE9PSAnb2JqZWN0JykpIHtcbiAgICByZXR1cm4gc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyBJZiBib3RoIHZhbHVlcyBhcmUgaW5zdGFuY2VzIG9mIHR5cGVkIGFycmF5cywgd3JhcCB0aGVpciB1bmRlcmx5aW5nXG4gIC8vIEFycmF5QnVmZmVycyBpbiBhIEJ1ZmZlciBlYWNoIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG4gIC8vIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoZSBhcnJheXMgdG8gaGF2ZSB0aGUgc2FtZSB0eXBlIGFzIGNoZWNrZWQgYnlcbiAgLy8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAoYWthIHBUb1N0cmluZykuIE5ldmVyIHBlcmZvcm0gYmluYXJ5XG4gIC8vIGNvbXBhcmlzb25zIGZvciBGbG9hdCpBcnJheXMsIHRob3VnaCwgc2luY2UgZS5nLiArMCA9PT0gLTAgYnV0IHRoZWlyXG4gIC8vIGJpdCBwYXR0ZXJucyBhcmUgbm90IGlkZW50aWNhbC5cbiAgfSBlbHNlIGlmIChpc1ZpZXcoYWN0dWFsKSAmJiBpc1ZpZXcoZXhwZWN0ZWQpICYmXG4gICAgICAgICAgICAgcFRvU3RyaW5nKGFjdHVhbCkgPT09IHBUb1N0cmluZyhleHBlY3RlZCkgJiZcbiAgICAgICAgICAgICAhKGFjdHVhbCBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSB8fFxuICAgICAgICAgICAgICAgYWN0dWFsIGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5KSkge1xuICAgIHJldHVybiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGFjdHVhbC5idWZmZXIpLFxuICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGV4cGVjdGVkLmJ1ZmZlcikpID09PSAwO1xuXG4gIC8vIDcuNSBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSBpZiAoaXNCdWZmZXIoYWN0dWFsKSAhPT0gaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIG1lbW9zID0gbWVtb3MgfHwge2FjdHVhbDogW10sIGV4cGVjdGVkOiBbXX07XG5cbiAgICB2YXIgYWN0dWFsSW5kZXggPSBtZW1vcy5hY3R1YWwuaW5kZXhPZihhY3R1YWwpO1xuICAgIGlmIChhY3R1YWxJbmRleCAhPT0gLTEpIHtcbiAgICAgIGlmIChhY3R1YWxJbmRleCA9PT0gbWVtb3MuZXhwZWN0ZWQuaW5kZXhPZihleHBlY3RlZCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb3MuYWN0dWFsLnB1c2goYWN0dWFsKTtcbiAgICBtZW1vcy5leHBlY3RlZC5wdXNoKGV4cGVjdGVkKTtcblxuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBzdHJpY3QsIG1lbW9zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBzdHJpY3QsIGFjdHVhbFZpc2l0ZWRPYmplY3RzKSB7XG4gIGlmIChhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGlmIG9uZSBpcyBhIHByaW1pdGl2ZSwgdGhlIG90aGVyIG11c3QgYmUgc2FtZVxuICBpZiAodXRpbC5pc1ByaW1pdGl2ZShhKSB8fCB1dGlsLmlzUHJpbWl0aXZlKGIpKVxuICAgIHJldHVybiBhID09PSBiO1xuICBpZiAoc3RyaWN0ICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihhKSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKTtcbiAgdmFyIGJJc0FyZ3MgPSBpc0FyZ3VtZW50cyhiKTtcbiAgaWYgKChhSXNBcmdzICYmICFiSXNBcmdzKSB8fCAoIWFJc0FyZ3MgJiYgYklzQXJncykpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoYUlzQXJncykge1xuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIF9kZWVwRXF1YWwoYSwgYiwgc3RyaWN0KTtcbiAgfVxuICB2YXIga2EgPSBvYmplY3RLZXlzKGEpO1xuICB2YXIga2IgPSBvYmplY3RLZXlzKGIpO1xuICB2YXIga2V5LCBpO1xuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9PSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIV9kZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIHN0cmljdCwgYWN0dWFsVmlzaXRlZE9iamVjdHMpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyA4LiBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cbi8vIGFzc2VydC5ub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgZmFsc2UpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcEVxdWFsJywgYXNzZXJ0Lm5vdERlZXBFcXVhbCk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWwgPSBub3REZWVwU3RyaWN0RXF1YWw7XG5mdW5jdGlvbiBub3REZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBTdHJpY3RFcXVhbCcsIG5vdERlZXBTdHJpY3RFcXVhbCk7XG4gIH1cbn1cblxuXG4vLyA5LiBUaGUgc3RyaWN0IGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzdHJpY3QgZXF1YWxpdHksIGFzIGRldGVybWluZWQgYnkgPT09LlxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09PScsIGFzc2VydC5zdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDEwLiBUaGUgc3RyaWN0IG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHN0cmljdCBpbmVxdWFsaXR5LCBhc1xuLy8gZGV0ZXJtaW5lZCBieSAhPT0uICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT09JywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuICBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4cGVjdGVkKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSWdub3JlLiAgVGhlIGluc3RhbmNlb2YgY2hlY2sgZG9lc24ndCB3b3JrIGZvciBhcnJvdyBmdW5jdGlvbnMuXG4gIH1cblxuICBpZiAoRXJyb3IuaXNQcm90b3R5cGVPZihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX3RyeUJsb2NrKGJsb2NrKSB7XG4gIHZhciBlcnJvcjtcbiAgdHJ5IHtcbiAgICBibG9jaygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSBlO1xuICB9XG4gIHJldHVybiBlcnJvcjtcbn1cblxuZnVuY3Rpb24gX3Rocm93cyhzaG91bGRUaHJvdywgYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIHZhciBhY3R1YWw7XG5cbiAgaWYgKHR5cGVvZiBibG9jayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYmxvY2tcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgbWVzc2FnZSA9IGV4cGVjdGVkO1xuICAgIGV4cGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIGFjdHVhbCA9IF90cnlCbG9jayhibG9jayk7XG5cbiAgbWVzc2FnZSA9IChleHBlY3RlZCAmJiBleHBlY3RlZC5uYW1lID8gJyAoJyArIGV4cGVjdGVkLm5hbWUgKyAnKS4nIDogJy4nKSArXG4gICAgICAgICAgICAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG4gIGlmIChzaG91bGRUaHJvdyAmJiAhYWN0dWFsKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnTWlzc2luZyBleHBlY3RlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICB2YXIgdXNlclByb3ZpZGVkTWVzc2FnZSA9IHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJztcbiAgdmFyIGlzVW53YW50ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgdXRpbC5pc0Vycm9yKGFjdHVhbCk7XG4gIHZhciBpc1VuZXhwZWN0ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmICFleHBlY3RlZDtcblxuICBpZiAoKGlzVW53YW50ZWRFeGNlcHRpb24gJiZcbiAgICAgIHVzZXJQcm92aWRlZE1lc3NhZ2UgJiZcbiAgICAgIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fFxuICAgICAgaXNVbmV4cGVjdGVkRXhjZXB0aW9uKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnR290IHVud2FudGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICgoc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmIGV4cGVjdGVkICYmXG4gICAgICAhZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8ICghc2hvdWxkVGhyb3cgJiYgYWN0dWFsKSkge1xuICAgIHRocm93IGFjdHVhbDtcbiAgfVxufVxuXG4vLyAxMS4gRXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3I6XG4vLyBhc3NlcnQudGhyb3dzKGJsb2NrLCBFcnJvcl9vcHQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzKHRydWUsIGJsb2NrLCBlcnJvciwgbWVzc2FnZSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cyhmYWxzZSwgYmxvY2ssIGVycm9yLCBtZXNzYWdlKTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHRocm93IGVycjsgfTtcblxuLy8gRXhwb3NlIGEgc3RyaWN0IG9ubHkgdmFyaWFudCBvZiBhc3NlcnRcbmZ1bmN0aW9uIHN0cmljdCh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAoIXZhbHVlKSBmYWlsKHZhbHVlLCB0cnVlLCBtZXNzYWdlLCAnPT0nLCBzdHJpY3QpO1xufVxuYXNzZXJ0LnN0cmljdCA9IG9iamVjdEFzc2lnbihzdHJpY3QsIGFzc2VydCwge1xuICBlcXVhbDogYXNzZXJ0LnN0cmljdEVxdWFsLFxuICBkZWVwRXF1YWw6IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwsXG4gIG5vdEVxdWFsOiBhc3NlcnQubm90U3RyaWN0RXF1YWwsXG4gIG5vdERlZXBFcXVhbDogYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbFxufSk7XG5hc3NlcnQuc3RyaWN0LnN0cmljdCA9IGFzc2VydC5zdHJpY3Q7XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyB8fFxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaikge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB2YXIgZGVzY3JpcHRvcnMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlc2NyaXB0b3JzW2tleXNbaV1dID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY3JpcHRvcnM7XG4gIH07XG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxudmFyIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sKCd1dGlsLnByb21pc2lmeS5jdXN0b20nKSA6IHVuZGVmaW5lZDtcblxuZXhwb3J0cy5wcm9taXNpZnkgPSBmdW5jdGlvbiBwcm9taXNpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgJiYgb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXSkge1xuICAgIHZhciBmbiA9IG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF07XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwidXRpbC5wcm9taXNpZnkuY3VzdG9tXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZuKCkge1xuICAgIHZhciBwcm9taXNlUmVzb2x2ZSwgcHJvbWlzZVJlamVjdDtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHByb21pc2VSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHByb21pc2VSZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG5cbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgYXJncy5wdXNoKGZ1bmN0aW9uIChlcnIsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihmbiwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuICAgIGZuLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpXG4gICk7XG59XG5cbmV4cG9ydHMucHJvbWlzaWZ5LmN1c3RvbSA9IGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbFxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeU9uUmVqZWN0ZWQocmVhc29uLCBjYikge1xuICAvLyBgIXJlYXNvbmAgZ3VhcmQgaW5zcGlyZWQgYnkgYmx1ZWJpcmQgKFJlZjogaHR0cHM6Ly9nb28uZ2wvdDVJUzZNKS5cbiAgLy8gQmVjYXVzZSBgbnVsbGAgaXMgYSBzcGVjaWFsIGVycm9yIHZhbHVlIGluIGNhbGxiYWNrcyB3aGljaCBtZWFucyBcIm5vIGVycm9yXG4gIC8vIG9jY3VycmVkXCIsIHdlIGVycm9yLXdyYXAgc28gdGhlIGNhbGxiYWNrIGNvbnN1bWVyIGNhbiBkaXN0aW5ndWlzaCBiZXR3ZWVuXG4gIC8vIFwidGhlIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBudWxsXCIgb3IgXCJ0aGUgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB1bmRlZmluZWRcIi5cbiAgaWYgKCFyZWFzb24pIHtcbiAgICB2YXIgbmV3UmVhc29uID0gbmV3IEVycm9yKCdQcm9taXNlIHdhcyByZWplY3RlZCB3aXRoIGEgZmFsc3kgdmFsdWUnKTtcbiAgICBuZXdSZWFzb24ucmVhc29uID0gcmVhc29uO1xuICAgIHJlYXNvbiA9IG5ld1JlYXNvbjtcbiAgfVxuICByZXR1cm4gY2IocmVhc29uKTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gIH1cblxuICAvLyBXZSBETyBOT1QgcmV0dXJuIHRoZSBwcm9taXNlIGFzIGl0IGdpdmVzIHRoZSB1c2VyIGEgZmFsc2Ugc2Vuc2UgdGhhdFxuICAvLyB0aGUgcHJvbWlzZSBpcyBhY3R1YWxseSBzb21laG93IHJlbGF0ZWQgdG8gdGhlIGNhbGxiYWNrJ3MgZXhlY3V0aW9uXG4gIC8vIGFuZCB0aGF0IHRoZSBjYWxsYmFjayB0aHJvd2luZyB3aWxsIHJlamVjdCB0aGUgcHJvbWlzZS5cbiAgZnVuY3Rpb24gY2FsbGJhY2tpZmllZCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbWF5YmVDYiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKHR5cGVvZiBtYXliZUNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGFzdCBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1heWJlQ2IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIC8vIEluIHRydWUgbm9kZSBzdHlsZSB3ZSBwcm9jZXNzIHRoZSBjYWxsYmFjayBvbiBgbmV4dFRpY2tgIHdpdGggYWxsIHRoZVxuICAgIC8vIGltcGxpY2F0aW9ucyAoc3RhY2ssIGB1bmNhdWdodEV4Y2VwdGlvbmAsIGBhc3luY19ob29rc2ApXG4gICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJldCkgeyBwcm9jZXNzLm5leHRUaWNrKGNiLCBudWxsLCByZXQpIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihyZWopIHsgcHJvY2Vzcy5uZXh0VGljayhjYWxsYmFja2lmeU9uUmVqZWN0ZWQsIHJlaiwgY2IpIH0pO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNhbGxiYWNraWZpZWQsIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjYWxsYmFja2lmaWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKSk7XG4gIHJldHVybiBjYWxsYmFja2lmaWVkO1xufVxuZXhwb3J0cy5jYWxsYmFja2lmeSA9IGNhbGxiYWNraWZ5O1xuIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1cbiAgXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcbnZhciBfY2xvY2tzZXE7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCB7Q2F1c2FsVGltZXN0YW1wLCBDcmR0UnVudGltZX0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcbmltcG9ydCB7Q3JkdEludGVybmFsLCBDcmR0fSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcblxuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gYWRkL2FkZGVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAwIGFkZHM/XG4gKi9cbmV4cG9ydCBjbGFzcyBDb3VudGVySW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZSByZXR1cm4gMDtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogbnVtYmVyLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICByZXR1cm4gW3N0YXRlICsgbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBDb3VudGVySW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBjb3VudGVyIENSRFQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgYWRkZWQuXG4gKlxuICogV2FybmluZzogYWRkaXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5leHBvcnQgY2xhc3MgQ291bnRlckNyZHQgZXh0ZW5kcyBDcmR0PG51bWJlcj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IG51bWJlcikge1xuICAgICAgICBzdXBlcihpZCwgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBhZGQuICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIGNvdW50ZXIudmFsdWUgKz0gbiBhbmQgY291bnRlci52YWx1ZSAtPSBuIHdvcmtcbiAgICAgKiBhcyBleHBlY3RlZCAoY29udmVydGVkIHRvIENSRFQgYWRkaXRpb25zKS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFkZChuZXdWYWx1ZSAtIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gbXVsdGlwbHkvbXVsdGlwbGllZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMSBtdWx0cz9cbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRSZWdpc3RlckludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2UgcmV0dXJuIDE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IG51bWJlciwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSAqIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTXVsdFJlZ2lzdGVySW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSBudW1lcmljYWwgcmVnaXN0ZXIgQ1JEVCB3aXRoIG11bHRpcGxpY2F0aW9uIG9wZXJhdGlvbnMuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgbXVsdGlwbGllZC5cbiAqXG4gKiBXYXJuaW5nOiBtdWx0aXBsaWNhdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmV4cG9ydCBjbGFzcyBNdWx0UmVnaXN0ZXJDcmR0IGV4dGVuZHMgQ3JkdDxudW1iZXI+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoaWQsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIG11bHQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBtdWx0aXBsaWNhdGlvbi4gIEFzIGEgY29uc2VxdWVuY2UsXG4gICAgICogcmVnaXN0ZXIudmFsdWUgKj0gbiBhbmQgcmVnaXN0ZXIudmFsdWUgLz0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIG11bHRpcGxpY2F0aW9ucykuXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjdXJyZW50IHZhbHVlIGlzIDAuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltcG9zc2libGUgdG8gc2V0IHRvIG5vbnplcm8gdmFsdWUgd2hlbiBjdXJyZW50IHZhbHVlIGlzIHplcm9cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJldHVybjsgLy8gMCAtPiAwIGlzIG5vLW9wXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tdWx0KG5ld1ZhbHVlIC8gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuXG4vLyBleHBvcnQgY2xhc3MgQ291bnRlck1vZEludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuLy8gICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1vZHVsdXM6IG51bWJlcikge1xuLy8gICAgICAgICBpZiAobW9kdWx1cyA8IDApIHRocm93IG5ldyBFcnJvcihcIm1vZHVsdXMgaXMgbmVnYXRpdmU6IFwiICsgbW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4vLyAgICAgICAgIGVsc2UgcmV0dXJuIDA7XG4vLyAgICAgfVxuLy8gICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMubW9kKG9wZXJhdGlvbik7XG4vLyAgICAgfVxuLy8gICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4vLyAgICAgICAgIHJldHVybiBbdGhpcy5tb2Qoc3RhdGUgKyBtZXNzYWdlKSwgbWVzc2FnZV07XG4vLyAgICAgfVxuLy8gICAgIG1vZCh4OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICBpZiAoeCA+PSAwKSByZXR1cm4geCAlIHRoaXMubW9kdWx1cztcbi8vICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5tb2R1bHVzIC0gKCgteCkgJSB0aGlzLm1vZHVsdXMpO1xuLy8gICAgIH1cbi8vIH1cblxuLyoqXG4gKiBPcGVyYXRpb25zIGFuZCBtZXNzYWdlcyBhcmUgdGhlIGVsZW1lbnQgdG8gYWRkLiAgVE9ETzpcbiAqIHRoaXMgbWVhbnMgdGhhdCBhZGRpbmcgbnVsbCB3b24ndCB3b3JrIGFzIEdTZXRDcmR0IHdpbGwgdHJlYXRcbiAqIGl0cyBtZXNzYWdlIGFzIGEgbm8tb3AuICBEZXNjcmlwdGlvbiBpcyB0aGUgZWxlbWVudCBhZGRlZFxuICogKGlmIGl0J3MgcmVkdW5kYW50LCBkZXNjcmlwdGlvbiBpcyBudWxsLCBzbyBvbmNoYW5nZSB3b24ndFxuICogc2VlIGFueXRoaW5nKS5cbiAqL1xuY2xhc3MgR1NldEludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPFNldDxhbnk+PiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogU2V0PGFueT4pOiBTZXQ8YW55PiB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSkgcmV0dXJuIG5ldyBTZXQ8YW55Pihpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTZXQ8YW55PigpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogYW55LCBzdGF0ZTogU2V0PGFueT4pIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhvcGVyYXRpb24pKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogYW55LCBzdGF0ZTogU2V0PGFueT4sIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTZXQ8YW55PiwgYW55XSB7XG4gICAgICAgIGlmIChzdGF0ZS5oYXMobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIC8vIGRvZXMgbm90aGluZ1xuICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZS5hZGQobWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgR1NldEludGVybmFsKCk7XG59XG5cbi8qKlxuICogQSBncm93LW9ubHkgc2V0LlxuICpcbiAqIEluIG9uY2hhbmdlLCBldmVudC5kZXNjcmlwdGlvbiBpcyB0aGUgYXJyYXkgb2YgZWxlbWVudHMgYWRkZWRcbiAqIChbXSBvciBbYWRkZWQgZWxlbWVudF0pLlxuICpcbiAqIFRPRE86IGFkZGluZyBhIG51bGwgdmFsdWUgd2lsbCBiZSBpZ25vcmVkLlxuICogVE9ETzogYWRkIGEgdHlwZSBhbm5vdGF0aW9uXG4gKiBUT0RPOiBzYW1lIGludGVyZmFjZSBhcyBKUyBTZXRcbiAqL1xuZXhwb3J0IGNsYXNzIEdTZXRDcmR0IGV4dGVuZHMgQ3JkdDxTZXQ8YW55Pj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IFNldDxhbnk+KSB7XG4gICAgICAgIHN1cGVyKGlkLCBHU2V0SW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgYWRkKGVsZW1lbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoZWxlbWVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgc2V0LiAgVGhpcyBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkgOiBTZXQ8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMuc3RhdGUpO1xuICAgIH1cbn1cblxuY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWw8VD4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8U2V0PFtULCBhbnksIG51bWJlcl0+PiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBBbiBpbml0aWFsIHZhbHVlIHRvIHNldC5cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBUKTogU2V0PFtULCBhbnksIG51bWJlcl0+IHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBuZXcgU2V0KFtbaW5pdGlhbERhdGEsIG51bGwsIC0xXV0pO1xuICAgICAgICBlbHNlIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnM6XG4gICAgICogLSBbXCJzZXRcIiwgdmFsdWVdOiBzZXQgdG8gdGhlIGdpdmVuIHNpbmdsZSB2YWx1ZS5cbiAgICAgKiAtIFtcInJlc2V0XCJdOiByZXNldCwgc2V0dGluZyB0aGUgdmFsdWUgc2V0IHRvIFtdLlxuICAgICAqIEBwYXJhbSAgb3BlcmF0aW9uIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIF9zdGF0ZSAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbc3RyaW5nLCBhbnk/XSwgX3N0YXRlOiBTZXQ8W1QsIGFueSwgbnVtYmVyXT4sIF9yZXBsaWNhSWQ6IGFueSkge1xuICAgICAgICBpZiAoISgob3BlcmF0aW9uWzBdID09PSBcInNldFwiICYmIG9wZXJhdGlvblsxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHx8IG9wZXJhdGlvblswXSA9PT0gXCJyZXNldFwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpczpcbiAgICAgKiAtIGZvciBzZXQgbWVzc2FnZSwgW1wic2V0XCIsIHNldCB2YWx1ZV0gKGV2ZW4gaWYgaXRcbiAgICAgKiBkb2Vzbid0IGVsaW1pbmF0ZSBhbGwgY2F1c2FsbHkgcHJpb3IgdmFsdWVzKS5cbiAgICAgKiAtIGZvciByZXNldHMsIFtcInJlc2V0XCJdLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbc3RyaW5nLCBhbnk/XSwgc3RhdGU6IFNldDxbVCwgYW55LCBudW1iZXJdPiwgX3JlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTZXQ8W1QsIGFueSwgbnVtYmVyXT4sIGFueV0ge1xuICAgICAgICBpZiAoISgobWVzc2FnZVswXSA9PT0gXCJzZXRcIiAmJiBtZXNzYWdlWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgfHwgbWVzc2FnZVswXSA9PT0gXCJyZXNldFwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVbMV0gPT09IG51bGwpIHN0YXRlLmRlbGV0ZSh2YWx1ZSk7Ly9pbml0aWFsIGVsZW1lbnRcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB2Y0VudHJ5ID0gdmMuZ2V0KHZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAodmNFbnRyeSAhPT0gdW5kZWZpbmVkICYmIHZjRW50cnkgPj0gdmFsdWVbMl0pIHN0YXRlLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2VbMF0gPT09IFwic2V0XCIpIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChbbWVzc2FnZVsxXSwgdGltZXN0YW1wLmdldFNlbmRlcigpLCB0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCgpO1xufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVyPFQ+IGV4dGVuZHMgQ3JkdDxTZXQ8W1QsIGFueSwgbnVtYmVyXT4+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBUKSB7XG4gICAgICAgIHN1cGVyKGlkLFxuICAgICAgICAgICAgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UgYXMgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWw8VD4sXG4gICAgICAgICAgICBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoW1wic2V0XCIsIHZhbHVlXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZVNldCgpOiBTZXQ8VD4ge1xuICAgICAgICBsZXQgdmFsdWVzID0gbmV3IFNldDxUPigpO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLnN0YXRlKSB2YWx1ZXMuYWRkKHZhbHVlWzBdKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJyZXNldFwiXSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cbiAgICAvLyBUT0RPOiByZXNldCBzdHJvbmdcbn1cbiIsImltcG9ydCB7Q2F1c2FsVGltZXN0YW1wLCBDcmR0UnVudGltZSwgQ3JkdE1lc3NhZ2VMaXN0ZW5lcn0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcblxuLy8gVE9ETzogaWRzIGFzIHN0cmluZ3MgaW5zdGVhZCBvZiBhbnlcblxuLyoqXG4gKiBJbnRlcmZhY2UgZGVzY3JpYmluZyB0aGUgaW50ZXJuYWwgd29ya2luZ3Mgb2YgYSBDUkRUIGluIHRoZVxuICogcHJlcGFyZS9lZmZlY3Qgc3R5bGUgb2YgXCJQdXJlIE9wZXJhdGlvbi1CYXNlZCBSZXBsaWNhdGVkIERhdGEgVHlwZXNcIlxuICogYnkgQmFxdWVybyBldCBhbC4gIFRoaXMgaW50ZXJmYWNlIGlzIGFsc28gaW5zcGlyZWQgYnkgU2hhcmVEQidzIE9UXG4gKiB0eXBlcyAoaHR0cHM6Ly9naXRodWIuY29tL290dHlwZXMvZG9jcykuXG4gKiBAcGFyYW0gUyBUaGUgQ1JEVCdzIHN0YXRlIHR5cGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaW5pdGlhbCBzdGF0ZSwgcG9zc2libHkgYmFzaW5nIGl0cyB2YWx1ZVxuICAgICAqIG9mZiBvZiBpbml0aWFsRGF0YS4gIE5vdGUgdGhhdCBpZiBzdGF0ZXMgY2FuIGJlIG11dGF0ZWRcbiAgICAgKiBieSBlZmZlY3QsIHRoZW4gZWFjaCByZXR1cm5lZCBzdGF0ZSBzaG91bGQgYmUgYSBmcmVzaFxuICAgICAqIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEEgdmFsdWUgdXNlZCB0byBvcHRpb25hbGx5IHNldCB0aGUgc3RhdGUnc1xuICAgICAqIGluaXRpYWwgdmFsdWUuXG4gICAgICogQHJldHVybiAgQSBmcmVzaCBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG1lc3NhZ2UgZGVzY3JpYmluZyB0aGUgZ2l2ZW4gb3BlcmF0aW9uLCBwb3NzaWJseVxuICAgICAqIHJlYWRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgYW5kIGlzc3VpbmcgcmVwbGljYSBpZC5cbiAgICAgKiBNZXNzYWdlcyBhbmQgb3BlcmF0aW9ucyB3aWxsIGhhdmUgYW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWNcbiAgICAgKiBmb3JtLlxuICAgICAqIEBwYXJhbSAgb3BlcmF0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NyaXB0aW9uIG9mXG4gICAgICogdGhlIG9wZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gIHN0YXRlIFRoZSBjdXJyZW50IHN0YXRlLCB3aGljaCBtYXkgYmUgcmVhZCB0byBkZXRlcm1pbmVcbiAgICAgKiB0aGUgbWVzc2FnZS4gIFRoaXMgc2hvdWxkIG5vdCBiZSBtdXRhdGVkLlxuICAgICAqIEBwYXJhbSByZXBsaWNhSWQgVGhlIGlkIG9mIHRoZSByZXBsaWNhIGlzc3VpbmcgdGhpcyBvcGVyYXRpb24sXG4gICAgICogd2hpY2ggbWF5IGJlIHJlYWQgdG8gZGV0ZXJtaW5lIHRoZSBtZXNzYWdlLlxuICAgICAqIEByZXR1cm4gQW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZGVzY3JpcHRpb24gb2YgdGhlIHJlc3VsdGluZ1xuICAgICAqIG1lc3NhZ2UuICBOb3RlIHRoaXMgd2lsbCBiZSBzZW50IG9uIHRoZSB3aXJlIHVzaW5nIFRPRE9cbiAgICAgKiAoc2VyaWFsaXphdGlvbikuXG4gICAgICogVGhlIG1lc3NhZ2UgbXN1dCBiZSBudWxsIG9ubHkgaWYgdGhpcyBvcGVyYXRpb24gZG9lcyBub3RcbiAgICAgKiBjaGFuZ2UgdGhlIGludGVybmFsIHN0YXRlLCBzaW5jZSBpZiB0aGUgbWVzc2FnZSBpcyBudWxsLFxuICAgICAqIENyZHQgd2lsbCBza2lwIHNlbmRpbmcgdGhlIG1lc3NhZ2UgdG8gb3RoZXIgcmVwbGljYXMuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IGFueSwgc3RhdGU6IFMsIHJlcGxpY2FJZDogYW55KTogYW55O1xuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdGhlIGdpdmVuIG1lc3NhZ2UgdG8gdGhlIHN0YXRlLCByZXR1cm5pbmcgdGhlXG4gICAgICogcmVzdWx0aW5nIHN0YXRlIGFzIHdlbGwgYXMgYSBkZXNjcmlwdGlvbiBvZiB0aGUgcmVzdWx0aW5nXG4gICAgICogY2hhbmdlLiAgTWVzc2FnZXMgYXJlIGFzc3VtZWQgdG8gYmUgZGVsaXZlcmVkIGluIGNhdXNhbFxuICAgICAqIG9yZGVyLiAgRm9yIGVmZmljaWVuY3ksIHRoZSBpbnB1dCBzdGF0ZSB3aWxsXG4gICAgICogbm90IGJlIHJldXNlZCwgc28gYW4gaW1wbGVtZW50YXRpb24gaXMgZnJlZSB0byBtdXRhdGVcbiAgICAgKiBpdCBpbi1wbGFjZSBhbmQgcmV0dXJuIGl0LlxuICAgICAqIEBwYXJhbSAgbWVzc2FnZSAgIFRoZSBtZXNzYWdlIHRvIGJlIGFwcGxpZWQsIGNvbWluZyBmcm9tXG4gICAgICogc29tZSByZXBsaWNhJ3MgcHJlcGFyZSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0gIHN0YXRlICAgICBUaGUgaW5wdXQgc3RhdGUuXG4gICAgICogQHBhcmFtIHJlcGxpY2FJZCBUaGUgaWQgb2YgdGhlIHJlcGxpY2EgYXBwbHlpbmcgdGhpcyBvcGVyYXRpb25cbiAgICAgKiAobm90IHRoZSBpZCBvZiB0aGUgcmVwbGljYSB0aGF0IGlzc3VlZCB0aGlzIG1lc3NhZ2UpLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wIFRoZSBtZXNzYWdlJ3MgY2F1c2FsIHRpbWVzdGFtcC4gIE5vdGUgdGhhdFxuICAgICAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICAgICAqIG1heSBub3QgYmUgY29udGluZ3VvdXMgKGUuZy4sIGVudHJpZXMgaW4gdGhlaXIgdmVjdG9yIGNsb2Nrc1xuICAgICAqIG1pZ2h0IHNraXAgbnVtYmVycykuICBIb3dldmVyLCBjYXVzYWxseSBvcmRlcmVkIGRlbGl2ZXJ5IGlzXG4gICAgICogc3RpbGwgZ3VhcmFudGVlZC4gIElmIHdlIGFyZSBwcm9jZXNzaW5nIG91ciBvd24gbWVzc2FnZVxuICAgICAqIChpLmUuLCByZXBsaWNhSWQgPT09IHRpbWVzdGFtcC5nZXRTZW5kZXIoKSksIHRoZW4gaXQgaXNcbiAgICAgKiBndWFyYW50ZWVkIHRoYXQgdGhlIG1lc3NhZ2UgaXMgY2F1c2FsbHkgZ3JlYXRlciB0aGFuIGFsbCBwcmlvclxuICAgICAqIG1lc3NhZ2VzLiAgSXQgaXMgcG9zc2libGUgdGhhdCBtdWx0aXBsZSBtZXNzYWdlcyBzaGFyZSB0aGUgc2FtZVxuICAgICAqIHRpbWVzdGFtcDsgaWYgc28sIHRoZXkgYXJlIHRvdGFsbHkgb3JkZXJlZCBieSB0aGUgY2F1c2FsIG9yZGVyLFxuICAgICAqIHRoZXkgd2lsbCBhbGwgYmUgZGVsaXZlcmVkIGluIGEgcm93IGluIGNhdXNhbCBvcmRlciwgYW5kIHRoZVxuICAgICAqIHRpbWVzdGFtcCBhY2N1cmF0ZWx5IHJlZmxlY3RzIHRoZWlyIGNhdXNhbCByZWxhdGlvbnNoaXAgdG9cbiAgICAgKiBvdGhlciBtZXNzYWdlcyAoaW4gcGFydGljdWxhciwgdGhleSBhbGwgc2hhcmUgdGhlIHNhbWUgY2F1c2FsXG4gICAgICogcmVsYXRpb25zaGlwcyB3aXRoIG90aGVyIG1lc3NhZ2VzKS5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBbVGhlIG91dHB1dCBzdGF0ZSwgYW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWNcbiAgICAgKiBkZXNjcmlwdGlvbiBvZiB0aGUgY2hhbmdlLl0gIFRoZSBkZXNjcmlwdGlvbiB3aWxsIGJlIHBhc3NlZFxuICAgICAqIHRvIHRoZSBhcHBsaWNhdGlvbiB1c2luZyB0aGlzIENSRFQgc28gdGhleSBrbm93IHdoYXQgb2NjdXJyZWQuXG4gICAgICogSWRlYWxseSwgaXQgc2hvdWxkIGJlIGRlc2NyaWJlZCBpbiB0ZXJtcyBvZiBvcmRpbmFyeSBkYXRhXG4gICAgICogdHlwZSBvcGVyYXRpb25zLCBzbyB0aGF0IGFwcGxpY2F0aW9ucyBjYW4gdW5kZXJzdGFuZCB0aGUgY2hhbmdlXG4gICAgICogd2l0aG91dCBuZWVkaW5nIHRvIHVuZGVyc3RhbmQgdGhlIENSRFQncyBzZW1hbnRpY3MuXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIG11c3QgYmUgbnVsbCBvbmx5IGlmIHRoZSBleHRlcm5hbGx5IHZpc2libGVcbiAgICAgKiBzdGF0ZSBpcyB1bmNoYW5nZWQsXG4gICAgICogc2luY2UgQ3JkdCB3aWxsIHNraXAgY2FsbGluZyBvbmNoYW5nZSBpZiBkZXNjcmlwdGlvbiBpcyBudWxsLlxuICAgICAqIChUaGUgY29udmVyc2UtLS1pZiB0aGUgc3RhdGUgd2FzIHVuY2hhbmdlZCwgdGhlbiBkZXNjcmlwdGlvblxuICAgICAqIGlzIG51bGwtLS1uZWVkIG5vdCBob2xkLCBhbHRob3VnaCBpdCBpcyBuaWNlIGlmIGl0IGRvZXMuKVxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBhbnksIHN0YXRlOiBTLCByZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgYW55XTtcbn1cblxuLyoqXG4gKiBBbiBldmVudCBpc3N1ZWQgd2hlbiBhIENSRFQgaXMgY2hhbmdlZCBieSBhbm90aGVyIHJlcGxpY2EuXG4gKiBAcGFyYW0gY2FsbGVyICAgICAgVGhlIENyZHQgaW5zdGFuY2UgdGhhdCB3YXMgY2hhbmdlZC5cbiAqIEBwYXJhbSBkZXNjcmlwdGlvbiBBbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBkZXNjcnB0aW9uIG9mIHRoZSBjaGFuZ2UuXG4gKiBAcGFyYW0gdGltZXN0YW1wICAgVGhlIGNhdXNhbCB0aW1lc3RhbXAgb2YgdGhlIGNoYW5nZS4gTm90ZSB0aGF0XG4gKiBiZWNhdXNlIHNldmVyYWwgQ1JEVHMgY2FuIHNoYXJlIHRoZSBzYW1lIHJ1bnRpbWUsIHRpbWVzdGFtcHNcbiAqIG1heSBub3QgYmUgY29udGluZ3VvdXMgKGUuZy4sIGVudHJpZXMgaW4gdGhlaXIgdmVjdG9yIGNsb2Nrc1xuICogbWlnaHQgc2tpcCBudW1iZXJzKS4gIEhvd2V2ZXIsIGNhdXNhbGx5IG9yZGVyZWQgZGVsaXZlcnkgaXNcbiAqIHN0aWxsIGd1YXJhbnRlZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0Q2hhbmdlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjYWxsZXI6IENyZHQ8YW55PixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBhbnksXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCkgeyB9XG59XG5cbi8vIFVzZXItZmFjaW5nIHdyYXBwZXJzIGFyb3VuZCBDUkRUcyBzaG91bGQgZXh0ZW5kIHRoaXMgY2xhc3MsXG4vLyBhZGRpbmcgbWV0aG9kcyBmb3IgdGhlIENSRFQncyBvcGVyYXRpb25zIChlLmcuLCBpbmNyZW1lbnQoKSlcbi8vIHdoaWNoIGNhbGwgdGhpcyBjbGFzcydzIGFwcGx5IG1ldGhvZC5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYXBwbGljYXRpb24tZmFjaW5nIENSRFQgaW1wbGVtZW50YXRpb25zLlxuICogSW5zdGVhZCBvZiBleHBvc2luZyBDcmR0SW50ZXJuYWwgaW1wbGVtZW50YXRpb25zIGRpcmVjdGx5LFxuICogd2hpY2ggaGF2ZSBhbiB1bmZyaWVuZGx5IHByZXBhcmUvZWZmZWN0IGludGVyZmFjZSxcbiAqIGVhY2ggQ1JEVCBpbXBsZW1lbnRhdGlvbiBzaG91bGQgZGVmaW5lIGEgc3ViY2xhc3Mgb2YgdGhpc1xuICogY2xhc3Mgd2l0aCBvcmRpbmFyeS1sb29raW5nIG1ldGhvZHMgdG8gcGVyZm9ybSBvcGVyYXRpb25zXG4gKiBhbmQgcXVlcnkgdGhlIHN0YXRlLiAgTWV0aG9kcyBwZXJmb3JtaW5nIG9wZXJhdGlvbnMgc2hvdWxkXG4gKiBjYWxsIGFwcGx5T3Agd2l0aCB0aGUgY29ycmVzcG9uZGluZyBDcmR0SW50ZXJuYWwgb3BlcmF0aW9uLlxuICogVGhpcyBjbGFzcyB0aGVuIGF1dG9tYXRpY2FsbHkgaGFuZGxlcyBzZW5kaW5nIGFuZCByZWNlaXZpbmdcbiAqIG9mIG1lc3NhZ2VzLlxuICogQ2YuIEFsZ29yaXRobSAxIGluIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3QgcGFwZXIuXG4gKiBAcGFyYW0gUyBUaGUgc3RhdGUgdHlwZSBvZiBDLlxuICovXG5leHBvcnQgY2xhc3MgQ3JkdDxTPiBpbXBsZW1lbnRzIENyZHRNZXNzYWdlTGlzdGVuZXIge1xuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IENyZHRJbnRlcm5hbCBzdGF0ZS4gIFRoaXMgc2hvdWxkIG5vdFxuICAgICAqIGJlIG11dGF0ZWQgZGlyZWN0bHkgYnV0IG1heSBiZSByZWFkIHRvIGdldCBpbmZvcm1hdGlvbiBhYm91dFxuICAgICAqIHRoZSBzdGF0ZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhdGU6IFM7XG4gICAgLyoqXG4gICAgICogU2V0IHRoaXMgdG8gbGlzdGVuIGZvciB3aGVuIGFub3RoZXIgcmVwbGljYSB1cGRhdGVzXG4gICAgICogdGhpcyBvYmplY3QncyBzdGF0ZS5cbiAgICAgKi9cbiAgICBvbmNoYW5nZSA6IChldmVudDogQ3JkdENoYW5nZUV2ZW50KSA9PiB2b2lkID0gKChfKSA9PiB7fSk7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgIEFuIGlkIGZvciB0aGlzIENSRFQuICBBbGwgQ1JEVHMgdXNpbmcgdGhlXG4gICAgICogc2FtZSBDcmR0UnVudGltZSBtdXN0IGhhdmUgZGlzdGluY3QgaWRzLCBhbmQgdGhlIGlkcyBtdXN0XG4gICAgICogYmUgdGhlIHNhbWUgZm9yIGFsbCByZXBsaWNhcyBvZiBhIGdpdmVuIENSRFQsIGluIG9yZGVyXG4gICAgICogZm9yIHRoZSBDcmR0UnVudGltZSB0byByb3V0ZSBtZXNzYWdlcyB0byB0aGVtIHByb3Blcmx5LlxuICAgICAqIEBwYXJhbSBjcmR0SW50ZXJuYWwgICAgVGhlIENyZHRJbnRlcm5hbCB0byB1c2UuICBOb3RlIHRoYXQgc2luY2VcbiAgICAgKiBDcmR0SW50ZXJuYWwncyBkb24ndCBzdG9yZSBzdGF0ZXMsIG11bHRpcGxlIG9iamVjdHMgbWF5XG4gICAgICogc2hhcmUgdGhlIHNhbWUgQ3JkdEludGVybmFsIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBydW50aW1lIFRoZSBDcmR0UnVudGltZSB0byB1c2UgZm9yIHNlbmRpbmcgYW5kXG4gICAgICogcmVjZWl2aW5nIG1lc3NhZ2VzLlxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIHRvIHVzZSB3aGVuXG4gICAgICogc2V0dGluZyB0aGUgQ3JkdEludGVybmFsJ3MgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgaWQ6IGFueSwgcHVibGljIHJlYWRvbmx5IGNyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IGFueSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5jcmR0SW50ZXJuYWwuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5ydW50aW1lLnJlZ2lzdGVyKHRoaXMsIHRoaXMuaWQpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGRlc2NyaWJlIFwidHJhbnNhY3Rpb25zXCIuICBSaWdodCB3b3JkPyAgUmVuYW1lXG4gICAgLy8gXCJhdG9taWNcIiBzdHVmZiBiZWxvdy4gIE11c3QgaGFwcGVuIHN5bmNocm9ub3VzbHkgc29cbiAgICAvLyB0aGF0IHJ1bnRpbWUuZ2V0VGltZXN0YW1wKCkgZG9lc24ndCBjaGFuZ2UgYW5kXG4gICAgLy8gbm8gbWVzc2FnZXMgYXJlIHJlY2VpdmVkIGluIHRoZSBpbnRlcmltLlxuICAgIC8vIEFsbG93IGNhbGxlciB0byBzdGFydC9lbmQgdHJhbnNhY3Rpb25zP1xuICAgIHByaXZhdGUgaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25NZXNzYWdlczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByaXZhdGUgdHJhbnNhY3Rpb25EZXNjcmlwdGlvbnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwcm90ZWN0ZWQgc3RhcnRUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSB0cmFuc2FjdGlvbiBpcyBhbHJlYWR5IGluIHByb2dyZXNzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFJldHVybnMgdGhlIGRlc2NyaXB0aW9ucyAodHJhbnNsYXRlZClcbiAgICBwcm90ZWN0ZWQgZW5kVHJhbnNhY3Rpb24oKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLCB0aGlzLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucztcbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgZ2l2ZW4gb3BlcmF0aW9uIHRvIHRoZSBzdGF0ZSwgdXNpbmcgcHJlcGFyZSBhbmQgZWZmZWN0LFxuICAgICAqIGFuZCBzZW5kcyB0aGUgZ2VuZXJhdGVkIG1lc3NhZ2Ugb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiBJZiBhIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLCB0aGlzIHNlbmRpbmcgaXMgZGVsYXllZFxuICAgICAqIHVudGlsXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gVGhlIG9wZXJhdGlvbiB0byBhcHBseS5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNoYW5nZXMuXG4gICAgICogVGhpcyBpcyB0aGUgbGlzdCBvZiBpbmRpdmlkdWFsIG1lc3NhZ2UgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5XG4gICAgICogZWZmZWN0IChza2lwcGluZyBudWxsIG1lc3NhZ2VzKSxcbiAgICAgKiBhZnRlciBiZWluZyBwYXNzZWQgdGhyb3VnaCB0cmFuc2xhdGVEZXNjcmlwdGlvbi4gIEFuIGV4Y2VwdGlvblxuICAgICAqIGlzIHRoYXQgaWYgYWxsIG1lc3NhZ2VzIGFyZVxuICAgICAqIG51bGwsIG51bGwgaXMgcmV0dXJuZWQgd2l0aG91dCBjYWxsaW5nIHRyYW5zbGF0ZURlc2NyaXB0aW9uLlxuICAgICAqIFRPRE86IG51bGwgaWYgaW4gYSB0cmFuc2FjdGlvbiAodXNlIGVuZFRyYW5zYWN0aW9uIGluc3RlYWQpLlxuICAgICAqIFRPRE86IGJ1dCB3aGF0IGlmIHdlIHdhbnQgaXQgdG8gZGVjaWRlIHdoYXQgdG8gZG8gbmV4dD9cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXBwbHlPcChvcGVyYXRpb246IGFueSkgOiBhbnkge1xuICAgICAgICBsZXQgb3duVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIG93blRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmNyZHRJbnRlcm5hbC5wcmVwYXJlKG9wZXJhdGlvbiwgdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSk7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QobWVzc2FnZSxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLCB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3duVHJhbnNhY3Rpb24pIHJldHVybiB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byB0cmFuc2xhdGUgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieSB0aGVcbiAgICAgKiBDcmR0SW50ZXJuYWwgYmVmb3JlIHBhc3NpbmcgaXQgdG8gb25jaGFuZ2UuICBUaGlzIGlzXG4gICAgICogdXNlZnVsIGZvciBzZW1pZGlyZWN0IHByb2R1Y3RzIGJlY2F1c2UgdGhlIGRlZmF1bHRcbiAgICAgKiBTZW1pZGlyZWN0SW50ZXJuYWwgZGVzY3JpcHRpb25zIGFyZSBub3QgdXNlci1mcmllbmRseS5cbiAgICAgKiBJZiB0aGlzIG1ldGhvZCByZXR1cm5zIG51bGwsIG9uY2hhbmdlIGlzIG5vdCBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRpb24gcmV0dXJucyBkZXNjcmlwdGlvbnNbMF0uICBJdCBpc1xuICAgICAqIGFwcHJvcHJpYXRlIHdoZW4gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0IGFscmVhZHkgcmV0dXJuc1xuICAgICAqIHVzZXItZnJpZW5kbHkgZGVzY3JpcHRpb25zIGFuZCBhcHBseU9wcyBpcyBvbmx5IGV2ZXIgY2FsbGVkXG4gICAgICogd2l0aCBzaW5nbGUgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgZGVzY3JpcHRpb25zIEEgbGlzdCBvZiB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5XG4gICAgICogdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0LiAgVGhpcyB3aWxsIGFsd2F5cyBiZSBub24tZW1wdHkuXG4gICAgICogQHJldHVybiBUaGUgdHJhbnNsYXRlZCBkZXNjcmlwdGlvbiB0byBwYXNzIHRvIHRoaXMub25jaGFuZ2UsXG4gICAgICogb3IgbnVsbCBpZiB0aGlzLm9uY2hhbmdlIHNob3VsZCBub3QgYmUgY2FsbGVkLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9uLXRyaXZpYWwgb2JzZXJ2ZWQgcmVzZXRzXG4gICAgICogZm9yIHdoZW4gYSBDcmR0T2JqZWN0IGNvbnRhaW5pbmcgdGhpcyBDcmR0IGlzXG4gICAgICogcmVzZXQuICBUaGVcbiAgICAgKiBkZWZhdWx0IHJldHVybnMgbnVsbCwgc28gc3VjaCBtYXAgcmVzZXRzIGRvIG5vdGhpbmcuXG4gICAgICogQHJldHVybiBBIG1lc3NhZ2UgKG5vdCBvcGVyYXRpb24pIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG9cbiAgICAgKiB0aGlzIENyZHQgdG9nZXRoZXIgd2l0aCBhbnkgdGltZXN0YW1wXG4gICAgICogdG8gY2F1c2UgYW4gb2JzZXJ2ZWQtcmVzZXQgb3BlcmF0aW9uLCBvciBudWxsIHRvIGRvXG4gICAgICogbm90aGluZy4gIEZvciB0aGlzIENyZHRcbiAgICAgKiB0byBiZSBjb3JyZWN0IChldmVudHVhbGx5IGNvbnNpc3RlbnQpIHdoZW4gdXNlZCBhcyBhXG4gICAgICogcHJvcGVydHkgaW4gYW4gQ3JkdE9iamVjdCwgdGhlIHJldHVybmVkIG1lc3NhZ2VcbiAgICAgKiBtdXN0IHNhdGlzZnk6XG4gICAgICogLSB3aGVuIHBhaXJlZCB3aXRoIGFueSBDYXVzYWxUaW1lc3RhbXAsIGl0IGNvbW11dGVzIHdpdGhcbiAgICAgKiBjb25jdXJyZW50IG1lc3NhZ2VzICh1c3VhbCBDcmR0IHJlcXVpcmVtZW50KSwgaW5jbHVkaW5nXG4gICAgICogY29uY3VycmVudCByZXNldHMgYW5kIHN0cm9uZy1yZXNldHMuXG4gICAgICogLSB3aGVuIGFwcGxpZWQgdG8gYSBzdGF0ZSB3aGljaCBoYXMgbm90IHJlY2VpdmVkIGFueVxuICAgICAqIG1lc3NhZ2VzIGNhdXNhbGx5IHByaW9yIHRvIHRoZSB0aW1lc3RhbXAsIGl0IGhhc1xuICAgICAqIG5vIGVmZmVjdC4gIEluIG90aGVyIHdvcmRzLCBhcHBseWluZyBpdCB0byBhIGNvbmN1cnJlbnRseVxuICAgICAqIGluaXRpYWxpemVkIHN0YXRlIGhhcyBubyBlZmZlY3QuXG4gICAgICogT3RoZXJ3aXNlLCBpdCBpcyBmcmVlIHRvIGhhdmUgYW55IHNlbWFudGljcywgaW5jbHVkaW5nXG4gICAgICogZG9pbmcgbm90aGluZy4gIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBvYnNlcnZlZC1yZXNldCBzZW1hbnRpY3MuXG4gICAgICpcbiAgICAgKiBUT0RPOiByZXR1cm4gbGlzdCBvZiBtZXNzYWdlcyBpbnN0ZWFkLCBmb3IgZ2VuZXJhbGl0eT9cbiAgICAgKi9cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbnRyaXZpYWwgb2JzZXJ2ZWQtcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIG9ic2VydmVkLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKi9cbiAgICByZXNldCgpOiB2b2lkIHsgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbnRyaXZpYWwgc3Ryb25nLXJlc2V0cy5cbiAgICAgKiBVbmxpa2UgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCksIHRoZXJlIGFyZSBubyBzcGVjaWFsXG4gICAgICogcmVxdWlyZW1lbnRzIChvdGhlciB0aGFuIHRoZSB1c3VhbCBDcmR0IGNvbW11dGF0aXZpdHkpLlxuICAgICAqIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBzdHJvbmctcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0U3Ryb25nKCk6IHZvaWQgeyB9XG4gICAgLy8gLyoqXG4gICAgLy8gICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9uLXRyaXZpYWwgc3Ryb25nIHJlc2V0cy4gIFRoZVxuICAgIC8vICAqIGRlZmF1bHQgcmV0dXJucyBudWxsLCBzbyByZXNldHMgZG8gbm90aGluZy5cbiAgICAvLyAgKiBAcmV0dXJuIEEgbWVzc2FnZSAobm90IG9wZXJhdGlvbikgdGhhdCBjYW4gYmUgYXBwbGllZCB0b1xuICAgIC8vICAqIHRoaXMgQ3JkdCB0b2dldGhlciB3aXRoIGFueSB0aW1lc3RhbXBcbiAgICAvLyAgKiB0byBjYXVzZSBhIHN0cm9uZy1yZXNldCBvcGVyYXRpb24sIG9yIG51bGwgdG8gZG9cbiAgICAvLyAgKiBub3RoaW5nLiAgRm9yIHRoaXMgQ3JkdFxuICAgIC8vICAqIHRvIGJlIGNvcnJlY3QgKGV2ZW50dWFsbHkgY29uc2lzdGVudCkgd2hlbiB1c2VkIGFzIGFcbiAgICAvLyAgKiBwcm9wZXJ0eSBpbiBhbiBDcmR0T2JqZWN0LCB0aGUgcmV0dXJuZWQgbWVzc2FnZVxuICAgIC8vICAqIG11c3Qgc2F0aXNmeTpcbiAgICAvLyAgKiAtIHdoZW4gcGFpcmVkIHdpdGggYW55IENhdXNhbFRpbWVzdGFtcCwgaXQgY29tbXV0ZXMgd2l0aFxuICAgIC8vICAqIGNvbmN1cnJlbnQgbWVzc2FnZXMgKHVzdWFsIENyZHQgcmVxdWlyZW1lbnQpLCBpbmNsdWRpbmdcbiAgICAvLyAgKiBjb25jdXJyZW50IHJlc2V0cyBhbmQgc3Ryb25nLXJlc2V0cy5cbiAgICAvLyAgKiBPdGhlcndpc2UsIGl0IGlzIGZyZWUgdG8gaGF2ZSBhbnkgc2VtYW50aWNzLCBpbmNsdWRpbmdcbiAgICAvLyAgKiBkb2luZyBub3RoaW5nLiAgSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgLy8gICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgLy8gICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgLy8gICovXG4gICAgLy8gZ2V0VW5pdmVyc2FsUmVzZXRTdHJvbmdNZXNzYWdlKCk6IGFueSB7XG4gICAgLy8gICAgIHJldHVybiBudWxsO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciB0aGlzLnJ1bnRpbWUgd2hlbiBhbiBhdG9taWMgbGlzdCBvZlxuICAgICAqIG1lc3NhZ2VzIGlzIHJlY2VpdmVkIGZyb20gYW5vdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIHJlY2VpdmUobWVzc2FnZXM6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW4gdHJhbnNhY3Rpb247IHRoZSB0cmFuc2FjdGlvbiBtdXN0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJiZSBlbmRlZCBzeW5jaHJvbm91c2x5IHNvIHRoYXQgbWVzc2FnZXMgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImNhbm5vdCBiZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsIHRoaXMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uY2hhbmdlICYmIGRlc2NyaXB0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkID0gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNoYW5nZShuZXcgQ3JkdENoYW5nZUV2ZW50KHRoaXMsIHRyYW5zbGF0ZWQsIHRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ3JkdE9iamVjdCwgTWFwQ3JkdCwgRW5hYmxlV2luc0ZsYWcsIEludFJlZ2lzdGVyQ3JkdCwgQWRkV2luc1NldCB9IGZyb20gXCIuL3N0YW5kYXJkXCI7XG5pbXBvcnQgeyBDcmR0IH0gZnJvbSBcIi4vY3JkdF9jb3JlXCI7XG5pbXBvcnQgeyBNdWx0aVZhbHVlUmVnaXN0ZXIgfSBmcm9tIFwiLi9iYXNpY19jcmR0c1wiO1xuaW1wb3J0IHsgQ3JkdFJ1bnRpbWUgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG5pbnRlcmZhY2UgSnNvbkluZGV4VHlwZSB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgSnNvbkNyZHQgZXh0ZW5kcyBDcmR0T2JqZWN0PHN0cmluZywgQ3JkdDxhbnk+PiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBib29sZWFuczogTWFwQ3JkdDxzdHJpbmcsIEVuYWJsZVdpbnNGbGFnPjtcbiAgICAvLyBUT0RPOiBkd0ZsYWdzIHRvbz9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG51bWJlcnM6IE1hcENyZHQ8c3RyaW5nLCBJbnRSZWdpc3RlckNyZHQ+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3RyaW5nczogTWFwQ3JkdDxzdHJpbmcsIE11bHRpVmFsdWVSZWdpc3RlcjxzdHJpbmc+PjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNldHM6IE1hcENyZHQ8c3RyaW5nLCBBZGRXaW5zU2V0PGFueT4+O1xuICAgIC8vIFRPRE86IFJXU2V0cyB0b28/XG4gICAgcHJpdmF0ZSByZWFkb25seSBvYmplY3RzOiBNYXBDcmR0PHN0cmluZywgSnNvbkNyZHQ+O1xuICAgIC8vIFRPRE86IGFycmF5cyAoc2VxdWVuY2VzKS4gIFVzZXMgbWFwcyBmb3Igbm93LlxuICAgIC8vIFRPRE86IG51bGxzP1xuXG4gICAgLy8gVE9ETzogYWJpbGl0eSB0byBwYXNzIGluaXRpYWwgdmFsdWUgKHdoaWNoIGlzIG5vdCBzeW5jZWQpLlxuICAgIC8vIE1vcmUgZ2VuZXJhbGx5LCBhYmlsaXR5IHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiB5b3VyXG4gICAgLy8gcHJlZGVmaW5lZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBzeW5jZWQ/XG4gICAgLy8gVXNlIHRoZSBleGlzdGluZyBmbGFnIGFuZCBibG9jayBtZXNzYWdlcyBpbiBDcmR0T2JqZWN0LlxuICAgIGNvbnN0cnVjdG9yKGNyZHRJZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSkge1xuICAgICAgICBzdXBlcihjcmR0SWQsIHJ1bnRpbWUpO1xuICAgICAgICB0aGlzLnN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICAgICAgdGhpcy5ib29sZWFucyA9IG5ldyBNYXBDcmR0KFxuICAgICAgICAgICAgXCJib29sZWFuc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgRW5hYmxlV2luc0ZsYWcoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubnVtYmVycyA9IG5ldyBNYXBDcmR0KFxuICAgICAgICAgICAgXCJudW1iZXJzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBJbnRSZWdpc3RlckNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyaW5ncyA9IG5ldyBNYXBDcmR0KFxuICAgICAgICAgICAgXCJzdHJpbmdzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPihrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZXRzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcInNldHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEFkZFdpbnNTZXQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMub2JqZWN0cyA9IG5ldyBNYXBDcmR0KFxuICAgICAgICAgICAgXCJvYmplY3RzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBKc29uQ3JkdChrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIENyZHQgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSBzdG9yaW5nXG4gICAgICogdmFsdWVzIHdpdGggdGhlIHNhbWUgdHlwZSBhcyB0eXBlSW5kaWNhdG9yLFxuICAgICAqIG9yIHVuZGVmaW5lZCBpZiB0aGUga2V5IGlzIG5vdCBwcmVzZW50IChpbmNsdWRpbmdcbiAgICAgKiBpZiBpdCBwcmV2aW91c2x5IHdhcyBwcmVzZW50IGJ1dCB3YXMgcmVtb3ZlZCkuXG4gICAgICogKFVzZSBpbml0IGluc3RlYWQgaWYgeW91IHdhbnQgYSBndWFyYW50ZWVkLWRlZmluZWRcbiAgICAgKiByZXR1cm4gdmFsdWUuKVxuICAgICAqIChUT0RPOiBleHBsYWluIGtleXMgYXJlXG4gICAgICogc2VncmVnYXRlZCBieSB2YWx1ZSB0eXBlKS5cbiAgICAgKiBFLmcuIGdldChcImFcIiwgMCkgdG8gZ2V0IHRoZSBudW1iZXIgdmFsdWUgd2l0aCBrZXkgMC5cbiAgICAgKiBTdGFuZGFyZCB0eXBlSW5kaWNhdG9yIHZhbHVlczpcbiAgICAgKiAtIGZhbHNlOiBib29sZWFuIChFbmFibGVXaW5zRmxhZylcbiAgICAgKiAtIDA6IG51bWJlciAoSW50UmVnaXN0ZXJDcmR0KVxuICAgICAqIC0gXCJcIjogc3RyaW5nIChNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPilcbiAgICAgKiAtIG5ldyBTZXQoKTogc2V0IChBZGRXaW5zU2V0KVxuICAgICAqIC0ge306IG9iamVjdCAoSnNvbkNyZHQpXG4gICAgICpcbiAgICAgKiBUT0RPOiBleHBsaWN0bHkgdHlwZWQgdmVyc2lvbnM/ICBDYW4gd2UgZG8gdGhpcyBjbGV2ZXJseVxuICAgICAqIHdpdGggZ2VuZXJpY3MgYW5kIHR5cGUgcG9seW1vcnBoaXNtIG9yIHNvbWV0aGluZz9cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZywgdHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLm9iamVjdHMuZ2V0KGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcyhrZXk6IHN0cmluZywgdHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmhhcyhrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLm9iamVjdHMuaGFzKGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZShrZXk6IHN0cmluZywgdHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiB0aGlzLmJvb2xlYW5zLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHRoaXMubnVtYmVycy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiB0aGlzLnN0cmluZ3MuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHMuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLm9iamVjdHMuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBnZXQsIGJ1dCBpbnN0ZWFkIG9mIHJldHVybmluZyB0aGUgdmFsdWUgQ3JkdCxcbiAgICAgKiByZXR1cm5zIGl0cyB2YWx1ZS4gIE5vdGUgZm9yIHN0cmluZ3MsIGlmIHRoZSBDcmR0XG4gICAgICogZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSB2YWx1ZSAoZWl0aGVyIG9yIDIrKSxcbiAgICAgKiB3aGljaCBpcyBwb3NzaWJsZSBkdWUgdG8gdGhlIE11bHRpVmFsdWVSZWdpc3RlclxuICAgICAqIHNlbWFudGljcywgd2UgcmV0dXJuIHRoZSBzZXQgb2YgYWxsIGN1cnJlbnQgdmFsdWVzXG4gICAgICogaW5zdGVhZCBvZiBhIHNpbmdsZSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBUT0RPOiB1c2UgZ2VuZXJpY3MgdG8gc2F5IHRoYXQgcmV0dXJuIHZhbHVlIGlzXG4gICAgICogc2FtZSBhcyB0eXBlSW5kaWNhdG9yIHR5cGUgfCB1bmRlZmluZWQ/XG4gICAgICogV29ya3MgZXhjZXB0IGZvciBzdHJpbmdzLFxuICAgICAqIHdoaWNoIGNvdWxkIGluc3RlYWQgcmV0dXJuIGEgU2V0PHN0cmluZz4uXG4gICAgICogQ291bGQgaW5zdGVhZCBoYXZlIHNwZWNpZmljYWxseSB0eXBlZCB2ZXJzaW9ucyBvZiB0aGUgbWV0aG9kLlxuICAgICAqL1xuICAgIGdldFZhbHVlKGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KTpcbiAgICAgICAgICAgIGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfCBTZXQ8c3RyaW5nPiB8IFNldDxhbnk+IHwgT2JqZWN0IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IHZhbHVlQ3JkdCA9IHRoaXMuZ2V0KGtleSwgdHlwZUluZGljYXRvcik7XG4gICAgICAgIGlmICh2YWx1ZUNyZHQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDcmR0IGluc3RhbmNlb2YgTXVsdGlWYWx1ZVJlZ2lzdGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlU2V0ID0gdmFsdWVDcmR0LnZhbHVlU2V0O1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNldC5zaXplID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVNldC52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlU2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVDcmR0LnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzL3Jldml2ZXMgdGhlIGdpdmVuIGtleSB3aXRoIHRoZSBpbmRpY2F0ZWQgdHlwZSBpZlxuICAgICAqIG5lZWRlZCwgbWFraW5nIGl0IHByZXNlbnQgaW4gdGhlIHN0YXRlXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHR5cGVJbmRpY2F0b3IgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gdGhlIHZhbHVlIENyZHQuXG4gICAgICovXG4gICAgaW5pdChrZXk6IHN0cmluZywgdHlwZUluZGljYXRvcjogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICAvLyBUT0RPOiBjYW4gd2UgZ2VuZXJpZnkgdGhpcyBmdW5jdGlvbiBwYXR0ZXJuP1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmluaXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5vYmplY3RzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSB0byBhIGNvcHkgb2YgdGhlIGdpdmVuXG4gICAgICogKG5vbi1DcmR0KSB2YWx1ZSwgdXNpbmcgdGhlIENyZHQncyAudmFsdWUgPSBtZXRob2QuXG4gICAgICogVGhpcyBnZW5lcmFsbHkgaGFzIHRoZSBlZmZlY3Qgb2YgcmVzZXR0aW5nIHRoZSBjdXJyZW50IENyZHRcbiAgICAgKiBhbmQgdGhlbiBwZXJmb3JtaW5nIG9wZXJhdGlvbnMgdG8gZHJpdmUgaXQgdG8gdGhlIGRlc2lyZWRcbiAgICAgKiB2YWx1ZS4gIElmIHlvdSB3YW50IG1vcmUgY29udHJvbCBvdmVyIGhvdyB0aGUgdmFsdWUgaXMgc2V0XG4gICAgICogKGUuZy4sIHBhc3NpbmcgYW4gb3B0aW9uIHRvIEpzb25DcmR0LmdldEFzT2JqZWN0IHdoZW4gc2V0dGluZ1xuICAgICAqIGFuIG9iamVjdCdzIHZhbHVlKSwgeW91IGNhbiBpbnN0ZWFkIGdldCB0aGUgQ3JkdCB3aXRoXG4gICAgICogdGhpcy5pbml0KGtleSwgdmFsdWUpIGFuZCB0aGVuIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpdFxuICAgICAqIGRpcmVjdGx5LlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHZhbHVlIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFRoZSByZXN1bHRpbmcgdmFsdWUgQ3JkdCAodGhpcy5nZXQoa2V5LCB2YWx1ZSkpLlxuICAgICAqL1xuICAgIHNldFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgbGV0IHZhbHVlQ3JkdCA9IHRoaXMuc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICByZXR1cm4gdmFsdWVDcmR0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VmFsdWVJbnRlcm5hbChrZXk6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgbGV0IHZhbHVlQ3JkdCA9IHRoaXMuaW5pdChrZXksIHZhbHVlKTtcbiAgICAgICAgdmFsdWVDcmR0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuXG4gICAga2V5c0J5VHlwZSh0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3Mua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMua2V5cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLm9iamVjdHMua2V5cygpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIEFycmF5IG9mIFtrZXksIHR5cGUgbmFtZV0gcGFpcnNcbiAgICAgKi9cbiAgICBrZXlzKCkge1xuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxbc3RyaW5nLCBzdHJpbmddPiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5ib29sZWFucy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwiYm9vbGVhblwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLm51bWJlcnMua2V5cygpKSByZXN1bHQucHVzaChba2V5LCBcIm51bWJlclwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnN0cmluZ3Mua2V5cygpKSByZXN1bHQucHVzaChba2V5LCBcInN0cmluZ1wiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnNldHMua2V5cygpKSByZXN1bHQucHVzaChba2V5LCBcInNldFwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLm9iamVjdHMua2V5cygpKSByZXN1bHQucHVzaChba2V5LCBcIm9iamVjdFwiXSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZGVsZXRlXG4gICAgLy8gVE9ETzogZGVsZXRlU3Ryb25nIChvbmNlIG1hcCBzdXBwb3J0cyBpdC4gIFBlcmhhcHMgdGhyb3dcbiAgICAvLyBlcnJvciBvbiBtYXAgdmFsdWVzIG9ubHk/KVxuXG4gICAgc3RhdGljIHJlYWRvbmx5IEVycm9yT25Db25mbGljdCA9IDE7XG4gICAgc3RhdGljIHJlYWRvbmx5IFByZWZpeFR5cGVzID0gMjtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRXhwYW5kT25Db25mbGljdCA9IDM7XG4gICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCEoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcyB8fFxuICAgICAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0IHx8XG4gICAgICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGtleUNvbmZsaWN0UnVsZTogXCIgK1xuICAgICAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhpcyBDcmR0J3MgdmFsdWUgaW4gT2JqZWN0IGZvcm0uXG4gICAgICogQ2hhbmdpbmcgdGhlIHJldHVybmVkIHZhbHVlIGhhcyBubyBlZmZlY3Qgb24gdGhlIENyZHQgc3RhdGUuXG4gICAgICogTm90ZSB0aGF0IHNldCB2YWx1ZXMgYXJlIGNvbnZlcnRlZCB0byBKYXZhc2NyaXB0IFNldHMsXG4gICAgICogcmVzdWx0aW5nIGluIGEgbm90LXF1aXRlLUpTT04gZm9ybWF0IG9iamVjdC5cbiAgICAgKiBBIHN0cmluZyBNdWx0aVZhbHVlUmVnaXN0ZXIgaXMgY29udmVydGVkIHRvIGEgc3RyaW5nIGlmIGl0IGhhc1xuICAgICAqIGEgc2luZ2xlIHZhbHVlOyBvdGhlcndpc2UgKDAgb3IgMisgdmFsdWVzKSBpdFxuICAgICAqIGlzIGNvbnZlcnRlZCB0byBhIFNldDxzdHJpbmc+XG4gICAgICogKEFycmF5PHN0cmluZz4gaWYgc2V0c0FzQXJyYXlzPXRydWUpXG4gICAgICogb2YgYWxsIGN1cnJlbnQgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlDb25mbGljdFJ1bGU9SnNvbkNyZHQuRXhwYW5kT25Db25mbGljdFxuICAgICAqIFBvbGljeSBmb3IgaGFuZGxpbmcga2V5cyBvZiBkaWZmZXJlbnQgdHlwZXMgdGhhdCBoYXZlIHRoZVxuICAgICAqIHNhbWUgbmFtZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhIGtleSBjb25mbGljdC5cbiAgICAgKiAtIFByZWZpeFR5cGVzOiBwcmVmaXggdGhlIHR5cGUgbmFtZSBmb2xsb3dlZCBieSBcIjpcIiB0byBlYWNoIGtleSxcbiAgICAgKiBlLmcuIFwibnVtYmVyOm15S2V5XCIuICBUeXBlIG5hbWVzIGFyZSBcImJvb2xlYW5cIiwgXCJudW1iZXJcIixcbiAgICAgKiBcInN0cmluZ1wiLCBcInNldFwiLCBcIm9iamVjdFwiLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogaWYgdGhlcmUgaXMgYSBjb25mbGljdCBvblxuICAgICAqIGEga2V5LCBzZXQgaXRzIHZhbHVlIHRvIGVxdWFsIGFuIG9iamVjdCBjb250YWluaW5nIGVhY2ggb2ZcbiAgICAgKiB0aGUgY29uZmxpY3RpbmcgdmFsdWVzLCBwbHVzIGEgZmxhZyBcImpzb25DcmR0S2V5RXhwYW5kZWQgPSB0cnVlXCIuICBFLmcuXG4gICAgICogXCJteUtleVwiOiB7XCJqc29uQ3JkdEtleUV4cGFuZGVkXCI6IHRydWUsIFwic3RyaW5nXCI6IFwic3RyaW5nVmFsdWVcIixcbiAgICAgKiBcIm51bWJlclwiOiA3fVxuICAgICAqIEBwYXJhbSBzZXRzQXNBcnJheXMgPSBmYWxzZSBJZiB0cnVlLCBTZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWRcbiAgICAgKiB0byBhcnJheXMsIHNvIHRoYXQgdGhlIHJlc3VsdGluZyBPYmplY3QgaXMgaW4gcmVndWxhciBKU09OXG4gICAgICogZm9ybWF0LiAgVGhpcyBpbmNsdWRlcyBTZXQ8c3RyaW5nPiB2YWx1ZXMgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVycyB0aGF0IGhhdmUgMCBvciAyKyB2YWx1ZXMuXG4gICAgICovXG4gICAgZ2V0QXNPYmplY3Qoa2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LFxuICAgICAgICAgICAgc2V0c0FzQXJyYXlzID0gZmFsc2UpOiBPYmplY3Qge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICBsZXQgb2JqZWN0OiBKc29uSW5kZXhUeXBlID0ge307XG4gICAgICAgIC8vIE1hcHMga2V5cyB0byB0aGUgbmFtZSBvZiB0aGVpciBmaXJzdCB0eXBlXG4gICAgICAgIGxldCBrZXlzU29GYXIgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgICBsZXQgY29uZmxpY3RlZEtleXNTb0ZhciA9IG5ldyBTZXQ8U3RyaW5nPigpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMuYm9vbGVhbnMsIFwiYm9vbGVhblwiLFxuICAgICAgICAgICAgdmFsdWUgPT4gdmFsdWUudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLm51bWJlcnMsIFwibnVtYmVyXCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiB2YWx1ZS52YWx1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc3RyaW5ncywgXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUudmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zaXplID09PSAxKSByZXR1cm4gcmVzdWx0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAoc2V0c0FzQXJyYXlzPyBbLi4ucmVzdWx0LnZhbHVlcygpXTogcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLnNldHMsIFwic2V0XCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiAoc2V0c0FzQXJyYXlzPyBbLi4udmFsdWUudmFsdWVdOiB2YWx1ZS52YWx1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlLCB0aGlzLm9iamVjdHMsIFwib2JqZWN0XCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiB2YWx1ZS5nZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUsIHNldHNBc0FycmF5cylcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRBc09iamVjdEludGVybmFsPFYgZXh0ZW5kcyBDcmR0PGFueT4+KFxuICAgICAgICBvYmplY3Q6IEpzb25JbmRleFR5cGUsIGtleXNTb0ZhcjogTWFwPHN0cmluZywgc3RyaW5nPixcbiAgICAgICAgY29uZmxpY3RlZEtleXNTb0ZhcjogU2V0PFN0cmluZz4sIGtleUNvbmZsaWN0UnVsZTogbnVtYmVyLFxuICAgICAgICBtYXA6IE1hcENyZHQ8c3RyaW5nLCBWPiwgdHlwZU5hbWU6IHN0cmluZyxcbiAgICAgICAgdmFsdWVGdW5jOiAodmFsdWVDcmR0OiBWKSA9PiBhbnkpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIG1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHZhbHVlRnVuYyhtYXAuZ2V0KGtleSkgYXMgVik7XG4gICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIG9iamVjdFt0eXBlTmFtZSArIFwiOlwiICsga2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gS2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBrZXk6IFwiICsga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIHdoZW4ga2V5Q29uZmxpY3RSdWxlPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29uZmxpY3RlZEtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhwYW5kIHRoZSBleGlzdGluZyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmxpY3RlZEtleXNTb0Zhci5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHBhbmRlZDogYW55ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkW2tleXNTb0Zhci5nZXQoa2V5KSBhcyBzdHJpbmddID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IGV4cGFuZGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIChvYmplY3Rba2V5XSBhcyBKc29uSW5kZXhUeXBlKVt0eXBlTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBObyBrZXkgY29uZmxpY3RcbiAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGtleXNTb0Zhci5zZXQoa2V5LCB0eXBlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoaXMgb2JqZWN0IGFuZCB0aGVuIHBlcmZvcm1zIG9wZXJhdGlvbnMgdG9cbiAgICAgKiBkcml2ZSBpdHMgdmFsdWUgdG8gdGhlIGdpdmVuIEpTT04tbGlrZSBPYmplY3QuXG4gICAgICogUHJvcGVydGllcyB0aGF0IGFyZSBub3QgYm9vbGVhbnMsIG51bWJlcnMsIHN0cmluZ3MsXG4gICAgICogU2V0cywgb3Igb2JqZWN0cyBhcmUgaWdub3JlZDsgb2JqZWN0cyBiZXNpZGVzIFNldHNcbiAgICAgKiBhcmUgcHJvY2Vzc2VkIHJlY3Vyc2l2ZWx5LlxuICAgICAqXG4gICAgICogVE9ETzogZm9yIG5vdywgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgdG8gc2V0cy5cbiAgICAgKlxuICAgICAqIElmIG5ld1ZhbHVlIGNvbWVzIGZyb20gYSBKc29uQ3JkdCdzIC52YWx1ZSBvciBnZXRBc09iamVjdFxuICAgICAqIG1ldGhvZHMsIG5vdGUgdGhhdCBzZXRzL2FycmF5cyBvZiBzdHJpbmdzIHJlc3VsdGluZyBmcm9tXG4gICAgICogbXVsdGktdmFsdWUgcmVnaXN0ZXJzIHdpbGwgYmUgdHJlYXRlZCBhcyBzZXRzLCBub3RcbiAgICAgKiBzdHJpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICBuZXdWYWx1ZSBUaGUgdmFsdWUgdG8gc2V0IHRvLlxuICAgICAqIEBwYXJhbSBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdFxuICAgICAqIElmIG5ld1ZhbHVlIHdhcyBnZW5lcmF0ZWQgYnkgZ2V0QXNPYmplY3QsIHRoZSBrZXlDb25mbGljdFJ1bGVcbiAgICAgKiB1c2VkIHRvIGdlbmVyYXRlIGl0LCBzbyB0aGF0IHdlIGNhbiB1bmRvIHRoZSBlZmZlY3RcbiAgICAgKiBvZiB0aGF0IHJ1bGUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KToga2V5cyBhbmQgdmFsdWVzIGFyZSB1c2VkIGxpdGVyYWxseSxcbiAgICAgKiB3aXRoIGluZmVycmVkIHR5cGVzLlxuICAgICAqIFRoaXMgaXMgYXBwcm9wcmlhdGUgZm9yIE9iamVjdHMgbm90IGNvbWluZyBmcm9tIGEgSnNvbkNyZHQnc1xuICAgICAqIGdldEFzT2JqZWN0IGZ1bmN0aW9uLCBpbiB3aGljaCB3ZSB3YW50IHRvIGtlZXAga2V5cyBhc1xuICAgICAqIHRoZXkgYXJlLlxuICAgICAqIC0gUHJlZml4VHlwZXM6IFR5cGVzIGFyZSB0YWtlbiBmcm9tIHByZWZpeGVzIG9uIGtleXMuICBJZiBhXG4gICAgICoga2V5IGRvZXMgbm90IGhhdmUgYSB0eXBlIHByZWZpeCwgaXQgaXMgaWdub3JlZC5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IG9iamVjdHMgd2l0aCBhIHByb3BlcnR5IFwianNvbkNyZHRLZXlFeHBhbmRlZFwiIHNldFxuICAgICAqIHRvIHRydWUgYXJlIGludGVycHJldGVkIGFzIHRoZSByZXN1bHQgb2YgZXhwYW5kaW5nIGFcbiAgICAgKiBrZXkgZHVlIHRvIGEgY29uZmxpY3QuICBJZiBzdWNoIGFuIG9iamVjdCBkb2VzIG5vdCBoYXZlXG4gICAgICogdGhlIGV4cGVjdGVkIGZvcm1hdCwgYW55IHByb3BlcnRpZXMgd2l0aCB1bnJlY29nbml6ZWQgbmFtZXNcbiAgICAgKiBhcmUgaWdub3JlZC5cbiAgICAgKi9cbiAgICBzZXRUb09iamVjdChuZXdWYWx1ZTogT2JqZWN0LCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwobmV3VmFsdWUsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIG9wZXJhdGlvbnMgdG8gZHJpdmUgdGhpcyBDcmR0J3MgdmFsdWUgdG8gdGhlXG4gICAgICogZ2l2ZW4gSlNPTi1saWtlIE9iamVjdCdzIHN0YXRlLCBidXQgd2l0aG91dCByZXNldHRpbmdcbiAgICAgKiB0aGUgY3VycmVudCB2YWx1ZS4gIFRoZSBtYWluIGVmZmVjdCBvZiB0aGlzIGlzIHRvXG4gICAgICogbWVyZ2Uga2V5czsgaW4gY2FzZSBvZiBrZXkgY29uZmxpY3RzLCB0aGUgdmFsdWVzIGFyZSBtZXJnZWRcbiAgICAgKiBpbiBhIHR5cGUtc3BlY2lmaWMgd2F5IChUT0RPOiBkZXRhaWxzKS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBpcyBub3QgYSBtZXJnZSBpbiB0aGUgc2Vuc2Ugb2YgYSBzdGF0ZS1iYXNlZCBDcmR0LlxuICAgICAqIEluc3RlYWQsIGl0IHRoZSBDcmR0IHZlcnNpb24gb2YgbWVyZ2luZyBvcmRpbmFyeSAobm9uLUNyZHQpXG4gICAgICogT2JqZWN0cywgYnkgcmVjdXJzaXZlbHkgY29tYmluaW5nIHRoZWlyIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHNldFRvT2JqZWN0IGZvciBkaXNjbGFpbWVycyBhbmRcbiAgICAgKiBvdGhlcktleUNvbmZsaWN0UnVsZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIGNoYW5nZXM/XG4gICAgICogQHBhcmFtICBvdGhlciBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgbWVyZ2VPYmplY3Qob3RoZXI6IE9iamVjdCwgb3RoZXJLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMubWVyZ2VPYmplY3RJbnRlcm5hbChvdGhlciwgb3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIHByaXZhdGUgbWVyZ2VPYmplY3RJbnRlcm5hbChvdGhlcjogSnNvbkluZGV4VHlwZSwgb3RoZXJLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUob3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgcHJvcGVydGllcyBhcyBhbiBhcnJheSBvZiBbbmFtZSwgdHlwZSwgdmFsdWVdXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzOiBBcnJheTxbc3RyaW5nLCBzdHJpbmcsIGFueV0+ID0gW107XG4gICAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIG90aGVyKSB7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb3RoZXJbcHJvcE5hbWVdO1xuICAgICAgICAgICAgbGV0IHR5cGU6IHN0cmluZztcbiAgICAgICAgICAgIGlmIChvdGhlcktleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBwcm9wTmFtZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICAgdHlwZSA9IHByb3BOYW1lLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZSA9IHByb3BOYW1lLnNsaWNlKGluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyBNdWx0aS12YWx1ZWQgc3RyaW5ncyBhcmUgdHJlYXRlZCBhcyBzZXRzXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwic2V0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgdHlwZSA9IFwic2V0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKFtwcm9wTmFtZSwgdHlwZSwgb3RoZXJbcHJvcE5hbWVdXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3RlIHByb3BlcnRpZXMgbWF5IGdyb3cgZHVyaW5nIGV4ZWN1dGlvbiBkdWUgdG9cbiAgICAgICAgLy8gdW5wYWNraW5nIGV4cGFuZGVkIGtleXMuXG4gICAgICAgIGxldCBvcmlnaW5hbExlbmd0aCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IHByb3BlcnRpZXNbaV1bMF07XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHByb3BlcnRpZXNbaV1bMV07XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gcHJvcGVydGllc1tpXVsyXTtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhbiBleHBhbmRlZCBrZXlcbiAgICAgICAgICAgIGlmIChvdGhlcktleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCAmJlxuICAgICAgICAgICAgICAgICAgICBpIDwgb3JpZ2luYWxMZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHByb3BWYWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbXCJqc29uQ3JkdEtleUV4cGFuZGVkXCJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gVW5wYWNrIHRoZSBvYmplY3Qgb250byB0aGUgZW5kIG9mIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBleHBhbmRlZE5hbWUgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBhbmRlZE5hbWUgIT09IFwianNvbkNyZHRLZXlFeHBhbmRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCBleHBhbmRlZE5hbWUsIHByb3BWYWx1ZVtleHBhbmRlZE5hbWVdXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBwcm9wZXJ0eSwgY2hlY2tpbmcgdGhhdCBpdCdzIHR5cGVcbiAgICAgICAgICAgICAgICAvLyBpcyBvbmUgd2UgZXhwZWN0LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3Q6IG1lcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5pbml0KHByb3BOYW1lLCB7fSkgYXMgSnNvbkNyZHQpLm1lcmdlT2JqZWN0SW50ZXJuYWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlLCBvdGhlcktleUNvbmZsaWN0UnVsZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBcImJvb2xlYW5cIiB8fCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJvb2xlYW4sIG51bWJlciwgc3RyaW5nOiBvdmVyd3JpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVJbnRlcm5hbChwcm9wTmFtZSwgcHJvcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBcInNldFwiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldDogYWRkIGFsbCB2YWx1ZXMgaW4gc2V0XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRDcmR0ID0gdGhpcy5pbml0KHByb3BOYW1lLCBuZXcgU2V0KCkpIGFzIEFkZFdpbnNTZXQ8YW55PjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgcHJvcFZhbHVlKSBzZXRDcmR0LmFkZChlbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVsc2Ugc2tpcCB0aGUgZW50cnkgKG5vdCBhIHJlY29nbml6ZWQgdHlwZSkuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgdGhpcy5nZXRBc09iamVjdCgpLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpOiBPYmplY3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBc09iamVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgdGhpcy5zZXRBc09iamVjdChuZXdWYWx1ZSkuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5zZXRUb09iamVjdChuZXdWYWx1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ3JkdCwgQ3JkdEludGVybmFsIH0gZnJvbSBcIi4vY3JkdF9jb3JlXCI7XG5pbXBvcnQgeyBTZW1pZGlyZWN0U3RhdGUsIFNlbWlkaXJlY3RJbnRlcm5hbCB9IGZyb20gXCIuL3NlbWlkaXJlY3RcIjtcbmltcG9ydCB7IENhdXNhbFRpbWVzdGFtcCwgQ3JkdFJ1bnRpbWUgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG4vLyBUT0RPOiBob3cgdG8gZG8gZ2FyYmFnZSBjb2xsZWN0aW9uIG9mIHJlc2V0LXdpbnMgb3BlcmF0aW9ucz9cbi8vIEUuZy4gZm9yIGZsYWdzIGluIGEgc2V0OiBnYXJiYWdlIGNvbGxlY3Rpb24gd2lsbCBmYWlsIGlmXG4vLyB0aGVyZSBhcmUgcmVzZXQtd2lucyBvcHMgaW4gdGhlIGhpc3RvcnksIGFzIGl0IHNob3VsZCwgYnV0XG4vLyB3ZSB3b3VsZCBsaWtlIHRvIGdhcmJhZ2UgY29sbGVjdCBhbnl3YXkgb25jZSBhbGwgdGhlIHJlc2V0LXdpbnNcbi8vIGFyZSBjYXVzYWxseSBzdGFibGUuXG5leHBvcnQgY2xhc3MgUmVzZXRXaW5zQ29tcG9uZW50PFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFM+IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSByZXNldEluaXRpYWxEYXRhOiBhbnkpIHsgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IHN0cmluZywgX3N0YXRlOiBTKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcInJlc2V0XCI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGFsd2F5cyBcInJlc2V0XCIuXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IHN0cmluZywgX3N0YXRlOiBTLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBzdHJpbmddIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSB3ZSBzaG91bGQgcmV0dXJuIGEgY2xvbmUgb2YgdGhlIHJlc2V0IHN0YXRlLCBub3RcbiAgICAgICAgLy8gYSBmaXhlZCBcInJlc2V0IHN0YXRlXCIsIHNpbmNlIHRoZSByZXR1cm5lZCBzdGF0ZSBtYXlcbiAgICAgICAgLy8gYmUgbXV0YXRlZCBsYXRlci5cbiAgICAgICAgcmV0dXJuIFt0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKSwgXCJyZXNldFwiXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVG88Uz4ob3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhOiBhbnkpIDogU2VtaWRpcmVjdEludGVybmFsPFM+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4oXG4gICAgICAgICAgICBvcmlnaW5hbENyZHQsIG5ldyBSZXNldFdpbnNDb21wb25lbnQob3JpZ2luYWxDcmR0LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YSksXG4gICAgICAgICAgICAoX20yIDogc3RyaW5nLCBfbTE6IGFueSkgPT4gbnVsbCxcbiAgICAgICAgICAgIDEsIGZhbHNlLCBmYWxzZSwgdHJ1ZVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRSZXNldFdpbnNDcmR0PFM+XG4gICAgICAgIGV4dGVuZHMgQ3JkdDxTZW1pZGlyZWN0U3RhdGU8Uz4+IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWxDcmR0SW50ZXJuYWxSZXNldFdpbnM6IENyZHRJbnRlcm5hbDxTPjtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIG9yaWdpbmFsQ3JkdEludGVybmFsICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJlc2V0SW5pdGlhbERhdGEgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgb3JpZ2luYWxDcmR0SW50ZXJuYWw6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IGFueSkge1xuICAgICAgICBsZXQgY3JkdFdyYXBwZWQgPSBSZXNldFdpbnNDb21wb25lbnQuYWRkVG8oXG4gICAgICAgICAgICBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YVxuICAgICAgICApO1xuICAgICAgICBzdXBlcihpZCwgY3JkdFdyYXBwZWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbFJlc2V0V2lucyA9IG9yaWdpbmFsQ3JkdEludGVybmFsO1xuICAgIH1cbiAgICByZXNldFN0cm9uZygpIHtcbiAgICAgICAgc3VwZXIuYXBwbHlPcChbMiwgXCJyZXNldFwiXSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0U3Ryb25nTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFsyLCBcInJlc2V0XCJdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSBvcGVyYXRpb25zIGludGVuZGVkIGZvciB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAqIGJ5IHRyYW5zbGF0aW5nIHRoZW0gZm9yIHRoZSByZXNldHRhYmxlIENSRFQgYW5kIGNhbGxpbmdcbiAgICAgKiBzdXBlci5hcHBseU9wcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXBwbHlPcChvcGVyYXRpb246IGFueSkgOiBhbnkge1xuICAgICAgICByZXR1cm4gc3VwZXIuYXBwbHlPcChbMSwgb3BlcmF0aW9uXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YmNsYXNzZXMgdGhhdCB3YW50IHRvIHRyYW5zbGF0ZSBvcGVyYXRpb25zIGZyb21cbiAgICAgKiB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsIHNob3VsZCBvdmVycmlkZVxuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGEgcmVzZXQtd2lucyBvcGVyYXRpb24gaXNcbiAgICAgKiBbXCJyZXNldFN0cm9uZ1wiXSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGl0IGNoYW5nZWQgdGhlIHN0YXRlLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9wZXJhdGlvbiB0aGF0IGdldHMga2lsbGVkIGJ5XG4gICAgICogYSBjb25jdXJyZW50IHJlc2V0LXdpbnMgaXMgc2tpcHBlZC5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcmlnaW5hbENyZHRJbnRlcm5hbFxuICAgICAqIG9wZXJhdGlvbnMgaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLFxuICAgICAqIHdoaWNoIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zLCBvciBudWxsIGlmIGFsbFxuICAgICAqIGRlc2NyaXB0aW9ucyBhcmUgbnVsbC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9uczogQXJyYXk8YW55Pik6IGFueSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gW107XG4gICAgICAgIGZvciAobGV0IGRlc2Mgb2YgZGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZGVzYyA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC13aW5zIGRlc2NyaXB0aW9uIGlzIFsyLCBcInJlc2V0XCJdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyICYmIGRlc2NbMV0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFN0cm9uZ1wiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzEsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyh0cmFuc2xhdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGluc3RlYWQgb2YgdHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqIFNlZSBDcmR0LnRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKGRlc2NyaXB0aW9uczogQXJyYXk8YW55Pik6IGFueSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuXG4gICAgZ2V0IG9yaWdpbmFsU3RhdGVSZXNldFdpbnMoKTogUyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxufVxuXG4vLyBUT0RPOiByZW5hbWUgb3JpZ2luYWxDcmR0SW50ZXJuYWwgKGFib3ZlKSBhbmQgb3JpZ2luYWxDcmR0XG4vLyB0byByZWZsZWN0IHJlc2V0LXdpbnMgdnMgcmVzZXQsIHRvIGF2b2lkIGNvbmZ1c2lvbi5cblxuZXhwb3J0IGNsYXNzIE9ic2VydmVkUmVzZXRDb21wb25lbnQ8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJlc2V0SW5pdGlhbERhdGE6IGFueSkgeyB9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFMpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgW1wicmVzZXRcIiwgbGlzdCBvZlxuICAgICAqIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgb3JpZ2luYWxDcmR0IHdoZW4gcHJvY2Vzc2luZ1xuICAgICAqIHRoZSBtZXNzYWdlcyBhcHBlYXJpbmcgaW4gbWVzc2FnZSAoaS5lLiwgdGhlIG1lc3NhZ2VzIHRoYXRcbiAgICAgKiBhdm9pZGVkIGJlaW5nIHJlc2V0IGJlY2F1c2UgdGhleSB3ZXJlIGNvbmN1cnJlbnQgdG8gdGhlXG4gICAgICogcmVzZXQgb3BlcmF0aW9uKV0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IEFycmF5PFthbnksIENhdXNhbFRpbWVzdGFtcF0+LCBfc3RhdGU6IFMsXG4gICAgICAgICAgICByZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIFtzdHJpbmcsIEFycmF5PGFueT5dXSB7XG4gICAgICAgIGxldCByZXNldFN0YXRlID0gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgY29uY3VycmVudE1lc3NhZ2Ugb2YgbWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMub3JpZ2luYWxDcmR0LmVmZmVjdChjb25jdXJyZW50TWVzc2FnZVswXSxcbiAgICAgICAgICAgICAgICByZXNldFN0YXRlLCByZXBsaWNhSWQsIGNvbmN1cnJlbnRNZXNzYWdlWzFdKTtcbiAgICAgICAgICAgIHJlc2V0U3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmVzZXRTdGF0ZSwgW1wicmVzZXRcIiwgZGVzY3JpcHRpb25zXV07XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZFRvPFM+KG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55LCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkgOiBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4ge1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxTPihcbiAgICAgICAgICAgIG5ldyBPYnNlcnZlZFJlc2V0Q29tcG9uZW50KG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSksXG4gICAgICAgICAgICBvcmlnaW5hbENyZHQsXG4gICAgICAgICAgICAobTI6IFthbnksIENhdXNhbFRpbWVzdGFtcF0sIG0xOiBBcnJheTxbYW55LCBDYXVzYWxUaW1lc3RhbXBdPikgPT5cbiAgICAgICAgICAgICAgICB7bTEucHVzaChtMik7IHJldHVybiBtMX0sXG4gICAgICAgICAgICAyLCB0cnVlLCB0cnVlLCBrZWVwT25seU1heGltYWxcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ8Uz5cbiAgICAgICAgZXh0ZW5kcyBEZWZhdWx0UmVzZXRXaW5zQ3JkdDxTZW1pZGlyZWN0U3RhdGU8Uz4+IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3JpZ2luYWxDcmR0SW50ZXJuYWw6IENyZHRJbnRlcm5hbDxTPjtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIG9yaWdpbmFsQ3JkdEludGVybmFsICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJlc2V0SW5pdGlhbERhdGEgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGtlZXBPbmx5TWF4aW1hbD1mYWxzZSBTdG9yZSBvbmx5IGNhdXNhbGx5IG1heGltYWxcbiAgICAgKiBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSwgdG8gc2F2ZSBzcGFjZSAoYWx0aG91Z2ggcG9zc2libHlcbiAgICAgKiBhdCBzb21lIENQVSBjb3N0KS4gIFRoaXMgaXMgb25seSBhbGxvd2VkIGlmIHRoZSBzdGF0ZVxuICAgICAqIG9ubHkgZXZlciBkZXBlbmRzIG9uIHRoZSBjYXVzYWxseSBtYXhpbWFsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIG9yaWdpbmFsQ3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhOiBhbnksXG4gICAgICAgICAgICBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBhbnksXG4gICAgICAgICAgICBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICBsZXQgY3JkdFdyYXBwZWQgPSBPYnNlcnZlZFJlc2V0Q29tcG9uZW50LmFkZFRvKFxuICAgICAgICAgICAgb3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhLCBrZWVwT25seU1heGltYWxcbiAgICAgICAgKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCByZXNldEluaXRpYWxEYXRhLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgb3AgaWYgd2UncmUgYWxyZWFkeSByZXNldCAob2theSBnaXZlblxuICAgICAgICAvLyBvYnNlcnZlLXJlc2V0IHNlbWFudGljcykuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCkpIHtcbiAgICAgICAgICAgIHN1cGVyLmFwcGx5T3AoWzEsIFwicmVzZXRcIl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gTm90ZSBoZXJlIHdlIGhhdmUgdG8gYWNjb3VudCBmb3IgdGhlIHJlc2V0LXdpbnMgbGF5ZXJcbiAgICAgICAgLy8gKGl0J3Mgbm90IHdyYXBwZWQgYXV0b21hdGljYWxseSBsaWtlIGluIHN1cGVyLmFwcGx5T3BzKS5cbiAgICAgICAgcmV0dXJuIFsxLCBbMSwgW11dXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFwcGx5T3Aob3BlcmF0aW9uOiBhbnkpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzIsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlIGluc3RlYWQgb2YgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBUcmFuc2xhdGVzIGludGVybmFsIChzZW1pZGlyZWN0IHByb2R1Y3QtYmFzZWQpIGRlc2NyaXB0aW9uc1xuICAgICAqIHNvIHRoYXQ6XG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb2JzZXJ2ZWQtcmVzZXQgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRcIiwgW1RPRE86IHJlLWFwcGxpZWQgb3BzXV0uXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBpcyB1bmNoYW5nZWQsIGV4Y2VwdCBmb3IgbnVsbCBkZXNjcmlwdGlvbnMsIHdoaWNoXG4gICAgICogYXJlIHNraXBwZWQuXG4gICAgICogVGhlbiByZXR1cm5zIHRoZSByZXN1bHQgb2YgcGFzc2luZyB0aGlzIGxpc3QgdG9cbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlLCBvciBudWxsIGlmIGFsbFxuICAgICAqIGRlc2NyaXB0aW9ucyBhcmUgbnVsbC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKGRlc2NyaXB0aW9uczogQXJyYXk8YW55Pik6IGFueSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gW107XG4gICAgICAgIGZvciAobGV0IGRlc2Mgb2YgZGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZGVzYyA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC1zdHJvbmcgKGFscmVhZHkgdHJhbnNsYXRlZCBieSBEZWZhdWx0UmVzZXRXaW5zQ3JkdClcbiAgICAgICAgICAgIC8vIGRlc2NyaXB0aW9uIGlzIFwicmVzZXRTdHJvbmdcIlxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT2JzZXJ2ZWQgcmVzZXQgZGVzY3JpcHRpb24gaXMgWzEsIFtcInJlc2V0XCIsXG4gICAgICAgICAgICAvLyBsaXN0IG9mIHJlLWFwcGxpZWQgb3BzXV1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEgJiYgZGVzY1sxXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW4gdGhlIHNlY29uZCBlbnRyeSwgcHV0IHRoZSB0cmFuc2xhdGVkXG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9ucyB0aGF0IGRpZG4ndCBnZXQgcmVzZXQuICBLZWVwIGluXG4gICAgICAgICAgICAgICAgLy8gbWluZCB0aGF0IHRoZXNlIHdpbGwgYmUgZGVzY3JpcHRpb25zIGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gaW5uZXJtb3N0IHNlbWlkaXJlY3QgcHJvZHVjdC4gIFdoYXQgdG8gZG9cbiAgICAgICAgICAgICAgICAvLyBhYm91dCBvcGVyYXRpb25zIHRoYXQgd2VyZSBvcmlnaW5hbGx5IGdyb3VwZWRcbiAgICAgICAgICAgICAgICAvLyBhdG9taWNhbGx5LCBzaW5jZSB0cmFuc2xhdGUgZXhwZWN0cyB0aG9zZVxuICAgICAgICAgICAgICAgIC8vIHRvIGJlIGRlbGl2ZXJlZCB0b2dldGhlcj9cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goW1wicmVzZXRcIiwgZGVzY1sxXVsxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3JpZ2luYWxDcmR0T3BlcmF0aW9uIGlzIG9mIHRoZSBmb3JtIFsyLCBkZXNjXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXNjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZWQubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKHRyYW5zbGF0ZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8YW55Pik6IGFueSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuXG4gICAgZ2V0IG9yaWdpbmFsU3RhdGVSZXNldHRhYmxlKCk6IFMge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2F1c2FsVGltZXN0YW1wIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcbmltcG9ydCB7IENyZHRJbnRlcm5hbCB9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuXG4vLyBUT0RPOiBmdXR1cmUgb3B0czogaW5kZXhlZCBtZXNzYWdlczsgc2V0dGluZyB0aGUgaGlzdG9yeVxuLy8gdG8gYSBzdWJzZXQ7IGNhdXNhbCBzdGFiaWxpdHkuXG4vLyBUT0RPOiBmb3IgdGhpcyB0byB3b3JrLCByZXBsaWNhSWQncyBtdXN0IGJlIGNvbXBhcmFibGUgYWNjb3JkaW5nXG4vLyB0byB0aGUgc2FtZS1lcXVhbHMgYXBwcm9hY2guICBUeXBpY2FsbHksIHRoaXMgcmVxdWlyZXMgdGhlbVxuLy8gdG8gYmUgcHJpbWl0aXZlIHR5cGVzLCBhcyBvYmplY3RzIHdoaWNoIGFyZSBlcXVhbC12YWx1ZWQgYnV0IGhhdmVcbi8vIGRpZmZlcmVudCBwb2ludGVycyB3aWxsIGJlIGNvbnNpZGVyZWQgZGlmZmVyZW50LlxuLy8gVE9ETzogbWVudGlvbiB0aGF0IHRvIGdldCBhIHByb3BlciBDUkRUIChlcXVhbCBpbnRlcm5hbCBzdGF0ZXMpLFxuLy8gd2UgdGVjaG5pY2FsbHkgbXVzdCBjb21wYXJlIHJlY2VpcHQgb3JkZXJzIGFzIGVxdWl2YWxlbnQgaWZcbi8vIHRoZXkgYXJlIGJvdGggaW4gY2F1c2FsIG9yZGVyLlxuZXhwb3J0IGNsYXNzIFNlbWlkaXJlY3RTdGF0ZTxTPiB7XG4gICAgcHJpdmF0ZSByZWNlaXB0Q291bnRlciA9IDA7XG4gICAgLyoqXG4gICAgICogTWFwcyBhIHJlcGxpY2EgaWQgdG8gYW4gYXJyYXkgb2YgbWVzc2FnZXMgc2VudCBieSB0aGF0XG4gICAgICogcmVwbGljYSwgaW4gb3JkZXIuICBTcGVjaWZpY2FsbHksIGFycmF5IGVsZW1lbnRzIGFyZSB0dXBsZXNcbiAgICAgKiBbcGVyLXNlbmRlciBtZXNzYWdlIGNvdW50ZXIsIHRoaXMgcmVwbGljYSdzIHJlY2VpcHQgY291bnRlcixcbiAgICAgKiBtZXNzYWdlXS4gIEtlZXAgaW4gbWluZCB0aGF0IHBlci1zZW5kZXIgbWVzc2FnZVxuICAgICAqIGNvdW50ZXJzIG1heSBub3QgYmUgY29udGlndW91cywgc2luY2UgdGhleSBhcmUgc2hhcmVkIGJldHdlZW5cbiAgICAgKiBhbGwgQ3JkdHMgd2l0aCBhIGdpdmVuIENyZHRSdW50aW1lIGFuZCBiZXR3ZWVuXG4gICAgICogYSBzZW1pZGlyZWN0IHByb2R1Y3QgYW5kIGl0cyBjb21wb25lbnRzLlxuICAgICAqL1xuICAgIHByaXZhdGUgaGlzdG9yeTogTWFwPGFueSwgQXJyYXk8W251bWJlciwgbnVtYmVyLCBhbnldPj4gPSBuZXcgTWFwKCk7XG4gICAgY29uc3RydWN0b3IocHVibGljIGludGVybmFsU3RhdGU6IFMsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5VGltZXN0YW1wczogYm9vbGVhbixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDogYm9vbGVhbixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZDogYm9vbGVhbikgeyB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkOiBhbnksIG1lc3NhZ2U6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wID0gdGhpcy5oaXN0b3J5VGltZXN0YW1wcz9cbiAgICAgICAgICAgICAgICBbbWVzc2FnZSwgdGltZXN0YW1wXTogbWVzc2FnZTtcbiAgICAgICAgc2VuZGVySGlzdG9yeS5wdXNoKFt0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpLCB0aGlzLnJlY2VpcHRDb3VudGVyLCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wXSk7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGhlIGdpdmVuXG4gICAgICogdGltZXN0YW1wLCBpbiBzb21lIGNhdXNhbCBvcmRlciAoc3BlY2lmaWNhbGx5LCB0aGlzIHJlcGxpY2Enc1xuICAgICAqIHJlY2VpcHQgb3JkZXIpLiAgSWYgd2UgYXJlIHRoZSBzZW5kZXIgKGkuZS4sIHJlcGxpY2FJZCA9PT1cbiAgICAgKiB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpLCBpdCBpcyBhc3N1bWVkIHRoYXQgdGhlIHRpbWVzdGFtcCBpc1xuICAgICAqIGNhdXNhbGx5IGdyZWF0ZXIgdGhhbiBhbGwgcHJpb3IgbWVzc2FnZXMsIGFzIGRlc2NyaWJlZCBpblxuICAgICAqIENyZHRJbnRlcm5hbC5lZmZlY3QsIGhlbmNlIFtdIGlzIHJldHVybmVkLlxuICAgICAqL1xuICAgIGdldENvbmN1cnJlbnQocmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHRydWUsXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc3BlY2lmaWVkIGFjdGlvbnMgb24gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5OlxuICAgICAqIC0gaWYgcmV0dXJuQ29uY3VycmVudCBpcyB0cnVlLCByZXR1cm5zIHRoZSBsaXN0IG9mXG4gICAgICogYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGltZXN0YW1wLCBpblxuICAgICAqIHJlY2VpcHQgb3JkZXIuXG4gICAgICogLSBpZiBkaXNjYXJkRG9taW5hdGVkIGlzIHRydWUsIGRlbGV0ZXMgYWxsIG1lc3NhZ2VzIGZyb21cbiAgICAgKiB0aGUgaGlzdG9yeSB3aG9zZSB0aW1lc3RhbXBzIGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnlcbiAgICAgKiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gdGltZXN0YW1wLiAgKE5vdGUgdGhhdCB0aGlzIG1lYW5zIHRoYXRcbiAgICAgKiBpZiB3ZSB3YW50IHRvIGtlZXAgYSBtZXNzYWdlIHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcCBpblxuICAgICAqIHRoZSBoaXN0b3J5LCBpdCBtdXN0IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IGFmdGVyIGNhbGxpbmdcbiAgICAgKiB0aGlzIG1ldGhvZC4pXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZDogYW55LFxuICAgICAgICAgICAgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXAsIHJldHVybkNvbmN1cnJlbnQ6IGJvb2xlYW4sXG4gICAgICAgICAgICBkaXNjYXJkRG9taW5hdGVkOiBib29sZWFuKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHRpbWVzdGFtcC5nZXRTZW5kZXIoKSkge1xuICAgICAgICAgICAgaWYgKGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RoaW5nJ3MgY29uY3VycmVudCwgc28gY2xlYXIgZXZlcnl0aGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuaGlzdG9yeS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdhdGhlciB1cCB0aGUgY29uY3VycmVudCBtZXNzYWdlcy4gIFRoZXNlIGFyZSBhbGxcbiAgICAgICAgLy8gbWVzc2FnZXMgYnkgZWFjaCByZXBsaWNhSWQgd2l0aCBzZW5kZXIgY291bnRlclxuICAgICAgICAvLyBncmVhdGVyIHRoYW4gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKS5nZXQocmVwbGljYUlkKS5cbiAgICAgICAgbGV0IGNvbmN1cnJlbnQ6IEFycmF5PFtudW1iZXIsIG51bWJlciwgYW55XT4gPSBbXTtcbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdmMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQoZW50cnlbMF0pO1xuICAgICAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCBjb25jdXJyZW50SW5kZXhTdGFydCA9XG4gICAgICAgICAgICAgICAgICAgIFNlbWlkaXJlY3RTdGF0ZS5pbmRleEFmdGVyKHNlbmRlckhpc3RvcnksIGVudHJ5WzFdKTtcbiAgICAgICAgICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gY29uY3VycmVudEluZGV4U3RhcnQ7IGkgPCBzZW5kZXJIaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jdXJyZW50LnB1c2goc2VuZGVySGlzdG9yeVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBvbmx5IHRoZSBtZXNzYWdlcyB3aXRoIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIC8vID49IGNvbmN1cnJlbnRJbmRleFN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIHNlbmRlckhpc3Rvcnkuc3BsaWNlKDAsIGNvbmN1cnJlbnRJbmRleFN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZGVsZXRlIGl0IGZyb20gdGhlIG1hcCBpZiBlbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgYSBmb3JtIG9mIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBhbHNvIG1ha2VzIGlzSGlzdG9yeUVtcHR5IHNpbXBsZXIuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBTb3J0IHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzIGluIHJlY2VpcHQgb3JkZXIgKGkuZS4sXG4gICAgICAgICAgICAvLyBieSB0aGUgc2Vjb25kIGVudHJ5IGluIGVhY2ggdHJpcGxlKS5cbiAgICAgICAgICAgIGNvbmN1cnJlbnQuc29ydCgoYSwgYikgPT4gKGFbMV0gLSBiWzFdKSk7XG4gICAgICAgICAgICAvLyBTdHJpcCBhd2F5IGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBtZXNzYWdlcy5cbiAgICAgICAgICAgIHJldHVybiBjb25jdXJyZW50Lm1hcChhID0+IGFbMl0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbWVzc2FnZXMgc3RvcmVkIGluIHRoZSBoaXN0b3J5LFxuICAgICAqIGkuZS4sIGVpdGhlciB0aGVyZSBoYXZlIGJlZW4gbm8gY3JkMSBtZXNzYWdlcywgb3JcbiAgICAgKiBvdXIgU2VtaWRpcmVjdEludGVybmFsJ3MgaGlzdG9yeUtlZXBPbmx5Q29uY3VycmVudCBmbGFnIGlzIHRydWVcbiAgICAgKiBhbmQgYWxsIGNyZHQxIG1lc3NhZ2VzIGhhdmUgYmVlbiBjYXVzYWxseSBsZXNzIHRoYW4gYSBjcmR0MlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgaXNIaXN0b3J5RW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuaGlzdG9yeS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciB3b3JraW5nIHdpdGggdGhlIHBlci1zZW5kZXIgaGlzdG9yeVxuICAgICAqIGFycmF5cy4gIFJldHVybnMgdGhlIGluZGV4IGFmdGVyIHRoZSBsYXN0IGVudHJ5IHdob3NlXG4gICAgICogcGVyLXNlbmRlciBjb3VudGVyICh0aGUgZmlyc3QgdHVwbGUgZWxlbWVudCkgaXMgPD1cbiAgICAgKiB2YWx1ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpbmRleEFmdGVyKHNwYXJzZUFycmF5OiBBcnJheTxbbnVtYmVyLCBudW1iZXIsIGFueV0+LFxuICAgICAgICAgICAgdmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIC8vIFRPRE86IGJpbmFyeSBzZWFyY2ggd2hlbiBzcGFyc2VBcnJheSBpcyBsYXJnZVxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlcmUgbWF5IGJlIGR1cGxpY2F0ZSB0aW1lc3RhbXBzLlxuICAgICAgICAvLyBTbyBpdCB3b3VsZCBiZSBpbmFwcHJvcHJpYXRlIHRvIGZpbmQgYW4gZW50cnkgd2hvc2VcbiAgICAgICAgLy8gcGVyLXNlbmRlciBjb3VudGVyIGVxdWFscyB2YWx1ZSBhbmQgaW5mZXIgdGhhdFxuICAgICAgICAvLyB0aGUgZGVzaXJlZCBpbmRleCBpcyAxIGdyZWF0ZXIuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhcnNlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzcGFyc2VBcnJheVtpXVswXSA+IHZhbHVlKSByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhcnNlQXJyYXkubGVuZ3RoO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlbWlkaXJlY3RJbnRlcm5hbDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTZW1pZGlyZWN0U3RhdGU8Uz4+IHtcbiAgICAvKipcbiAgICAgKiBDcmR0SW50ZXJuYWwgaW1wbGVtZW50aW5nIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3Qgb2ZcbiAgICAgKiBjcmR0MSBhbmQgY3JkdDIgd2l0aCB0aGUgZ2l2ZW4gYWN0aW9uLCB3aGljaCBpcyBhIGZ1bmN0aW9uXG4gICAgICogKG0yOiBjcmR0MiBtZXNzYWdlLCBtMTogY3JkdDEgbWVzc2FnZSk6IGNyZHQxIG1lc3NhZ2UuXG4gICAgICogY3JkdDEsIGNyZHQyLCBhbmQgYWN0aW9uIG11c3Qgc2F0aXNmeSB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0XG4gICAgICogYXNzdW1wdGlvbnMgZnJvbSBvdXIgcGFwZXIuXG4gICAgICpcbiAgICAgKiBUT0RPOiBvcHRpb25zIGFuZCB0aGVpciB0aGVvcmV0aWNhbCBzaWduaWZpY2FuY2UuICBGb3JtYWxseSxcbiAgICAgKiBoaXN0b3J5VGltZXN0YW1wcyA9IHRydWUgbWVhbnMgdGhhdCB0aW1lc3RhbXBzIGJlY29tZVxuICAgICAqIHBhcnQgb2YgdGhlIGNyZHQyIG1lc3NhZ2VzLiAgQWxzbyBjcmVhdGVDcmR0SW5kZXguXG4gICAgICogRG9taW5hdGVkIHN0YXRzIGNvbnRyb2wgd2hldGhlciB5b3UgZGlzY2FyZCBtZXNzYWdlcyBpbiB0aGVcbiAgICAgKiBoaXN0b3J5IHRoYXQgYXJlIGNhdXNhbGx5IGRvbWluYXRlZCBieSBjcmR0MS9jcmR0MiBtZXNzYWdlcztcbiAgICAgKiBuZWVkIHRvIGVuc3VyZSB0aGF0IGFjdGlvbiBpcyB0aGUgc2FtZSB3aXRoIHRob3NlIG1lc3NhZ2VzXG4gICAgICogZGlzY2FyZGVkLiAgSWYgZG9taW5hdGVkMSBpcyBzZXQsIHRoZW4gc3RhdGUuaXNIaXN0b3J5RW1wdHkoKVxuICAgICAqIGJlY29tZXMgKHRoZXJlIGV4aXN0cyBhIGNyZHQyIG1lc3NhZ2Ugbm90IGNhdXNhbGx5IGRvbWluYXRlZCBieSBhXG4gICAgICogY3JkdDEgbWVzc2FnZSkuICBDaGVjayB0aGlzIGlzIHN0aWxsIHRydWUgaWYgZG9taW5hdGVkMiBpcyBzZXQuKVxuICAgICAqIEV4cGxhaW4gZXhhbXBsZXMgd2hlcmUgdGhpcyBpcyB1c2VkIChyZXNldHRhYmxlLCBmbGFncyk7IGl0J3NcbiAgICAgKiBub3QgcXVpdGUgaW4gdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBzcGlyaXQgdW5sZXNzIHlvdSB0aGlua1xuICAgICAqIG9mIGl0IGFzIHVzaW5nIHRoZSBoaXN0b3J5IGFzIHBhcnQgb2YgdGhlIGNyZHQxLzIgc3RhdGUuXG4gICAgICogUG90ZW50aWFsIG9wdGltaXphdGlvbjogb25seSBkZWxldGUgZG9taW5hdGVkIG1lc3NhZ2VzIHdoZW5cbiAgICAgKiByZWNlaXZpbmcgb3VyIG93biBtZXNzYWdlIChpdCdzIGJhc2ljYWxseSBmcmVlIGFuZCBhbHdheXNcbiAgICAgKiBjbGVhcnMgdGhlIGhpc3RvcnkpLCBvciBvbmx5IHNvbWV0aW1lcyAod2lsbCBtaXNzIHNvbWVcbiAgICAgKiBtZXNzYWdlcywgc28gbmVlZCB0byBlbnN1cmUgY29ycmVjdG5lc3MgaW4gdGhhdCBjYXNlXG4gICAgICogKEkgdGhpbmsgaXQgaXMgb2theSBmb3IgZG9taW5hdGVkMiBidXQgbm90IGRvbWluYXRlZDEgaW4gb3VyXG4gICAgICogdGFyZ2V0IHVzZSBjYXNlcyksIGJ1dFxuICAgICAqIHNob3VsZCBiZSBtb3JlIGVmZmljaWVudCBkdWUgdG8gYmF0Y2hpbmcgYW5kIHN0aWxsIGtpbGxcbiAgICAgKiBvZmYgbW9zdCBtZXNzYWdlcykuICBUaGlzIHRyYWRlcyBhIHNtYWxsIGluY3JlYXNlIGluIHNwYWNlXG4gICAgICogdXNhZ2UgZm9yIGEgZGVjcmVhc2UgaW4gQ1BVIHRpbWUuXG4gICAgICpcbiAgICAgKiBBcyBkZXNjcmliZWQgaW4gQ3JkdEludGVybmFsIGFuZCBDcmR0LCBudWxsIG1lc3NhZ2VzIGFyZSB0cmVhdGVkXG4gICAgICogYXMgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGlkLCBhbGxvd2luZyB0aGVtIHRvIGJlIG9wdGltaXplZCBhd2F5LlxuICAgICAqIEJlY2F1c2Ugb2YgdGhpcywgYWN0aW9uIHdpbGwgbmV2ZXIgYmUgY2FsbGVkIHdpdGggbnVsbCBhc1xuICAgICAqIGVpdGhlciBpbnB1dC4gIEluc3RlYWQsIHdlIGJlaGF2ZSBhcyBpZlxuICAgICAqIChhY3Rpb24oaWQgKGkuZS4sIG51bGwpLCBtMSkgPSBtMSlcbiAgICAgKiBmb3IgYWxsIG0xIGFuZCAoYWN0aW9uKG0yLCBpZCkgPSBpZCkgZm9yIGFsbCBtMi4gIFRoZSBzZW1pZGlyZWN0XG4gICAgICogcHJvZHVjdCBhc3N1bXB0aW9ucyBtdXN0IGhvbGQgZ2l2ZW4gdGhlc2UgYXNzaWdubWVudHMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNyZHQxOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjcmR0MjogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgYWN0aW9uOiAobTI6IGFueSwgbTE6IGFueSkgPT4gYW55LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JlYXRlQ3JkdEluZGV4OiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5VGltZXN0YW1wcyA9IGZhbHNlLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKGNyZWF0ZUNyZHRJbmRleCAhPT0gMSAmJiBjcmVhdGVDcmR0SW5kZXggIT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ3JkdEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgSW5pdGlhbCBkYXRhIHVzZWQgdG8gaW5pdGlhbGl6ZSB0aGlzLmNyZHQxLlxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTZW1pZGlyZWN0U3RhdGU8Uz4ge1xuICAgICAgICBsZXQgaW50ZXJuYWxTdGF0ZTogUztcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ3JkdEluZGV4ID09PSAxKSBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlIGludGVybmFsU3RhdGUgPSB0aGlzLmNyZHQyLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIHJldHVybiBuZXcgU2VtaWRpcmVjdFN0YXRlKGludGVybmFsU3RhdGUsXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzLCB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCxcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogVE9ETyAoZ2VuZXJhbCk6IGVycm9yIGNoZWNraW5nXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtudW1iZXIsIGFueV0sIHN0YXRlOiBTZW1pZGlyZWN0U3RhdGU8Uz4sXG4gICAgICAgICAgICByZXBsaWNhSWQ6IGFueSk6IFtudW1iZXIsIGFueV0gfCBudWxsIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvblswXSA9PT0gMSkge1xuICAgICAgICAgICAgbGV0IG9wMSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AxID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFsxLCBvcDFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG9wMiA9IHRoaXMuY3JkdDIucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AyID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFsyLCBvcDJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UvZGVzY3JwdGlvbiBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBtZXNzYWdlIGZvci9kZXNjcmlwdGlvbiBmcm9tIHRoYXQgY3JkdF0uICBGb3IgdGhpcy5jcmR0MVxuICAgICAqIG1lc3NhZ2VzLCB0aGUgZGVzY3JpcHRpb24gaXMgZm9yIHRoZSBhY3RlZC1vbiBtZXNzYWdlIHRoYXRcbiAgICAgKiBpcyBhY3R1YWxseSBhcHBsaWVkIHRvIHRoaXMuaW50ZXJuYWxTdGF0ZSwgbm90IHRoZSBpbnB1dFxuICAgICAqIG1lc3NhZ2UuICBBbiBleGNlcHRpb24gaXMgaWYgdGhlIGRlc2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsXG4gICAgICogY3JkdCBpcyBudWxsIChvciBpZiB0aGUgbWVzc2FnZSBnZXRzIGFjdGVkIG9uIHRvIGJlY29tZSBudWxsKSxcbiAgICAgKiB0aGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMganVzdCBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS5cbiAgICAgKiBUaGlzIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IGNhbGxpbmcgb25jaGFuZ2UuXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtudW1iZXIsIGFueV0sIHN0YXRlOiBTZW1pZGlyZWN0U3RhdGU8Uz4sIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTZW1pZGlyZWN0U3RhdGU8Uz4sIFtudW1iZXIsIGFueV0gfCBudWxsXSB7XG4gICAgICAgIGlmIChtZXNzYWdlWzBdID09PSAyKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHN0YXRlLmFkZChyZXBsaWNhSWQsIG1lc3NhZ2VbMV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFtzdGF0ZSwgWzIsIHJlc3VsdFsxXV1dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnQgPSBzdGF0ZS5nZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIGxldCBtQWN0ID0gbWVzc2FnZVsxXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uY3VycmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG1BY3QgPSB0aGlzLmFjdGlvbihjb25jdXJyZW50W2ldLCBtQWN0KTtcbiAgICAgICAgICAgICAgICBpZiAobUFjdCA9PT0gbnVsbCkgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0MS5lZmZlY3QobUFjdCwgc3RhdGUuaW50ZXJuYWxTdGF0ZSxcbiAgICAgICAgICAgICAgICByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcm5hbFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbCkgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICBlbHNlIHJldHVybiBbc3RhdGUsIFsxLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRGlyZWN0SW50ZXJuYWw8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIC8qKlxuICAgICAqIERpcmVjdCBwcm9kdWN0IG9mIENyZHRJbnRlcm5hbCdzLiAgVGhpcyBpcyB0aGVcbiAgICAgKiBzcGVjaWFsIGNhc2Ugb2YgU2VtaWRpcmVjdEludGVybmFsIHdoZW4gdGhlIGFjdGlvbiBpcyB0cml2aWFsXG4gICAgICogKChtXzIsIG0xKSA9PiBtMSkuICBJbiB0aGlzIGNhc2Ugd2UgY2FuIG9wdGltaXplXG4gICAgICogYnkgbm90IGtlZXBpbmcgdGhlIGhpc3Rvcnkgb3IgYWN0aW5nIG9uIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogRm9yIHRoaXMgdG8gYmUgYSBDcmR0LCBjb25jdXJyZW50IG1lc3NhZ2VzIG9mIHRoZSB0d28gaW5wdXRcbiAgICAgKiBDcmR0cyBtdXN0IGNvbW11dGUuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgY29uc3RydWN0aW9uIGlzIHN5bW1ldHJpYyAoc3dpdGNoaW5nIGNyZHQxIGFuZFxuICAgICAqIGNyZHQyIGRvZXNuJ3QgY2hhbmdlIHRoZSBzZW1hbnRpY3MpLCBleGNlcHQgZm9yIHN3YXBwaW5nXG4gICAgICogdGhlIG1lYW5pbmcgb2YgdGhlIG51bWJlcnMgMS8yIGluIGNyZWF0ZUNyZHRJbmRleCBhbmRcbiAgICAgKiBpbiB0aGUgZmlyc3QgY29vcmRpbmF0ZXMgb2YgbWVzc2FnZXMgYW5kIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JlYXRlQ3JkdEluZGV4IFdoaWNoIGNyZHQncyBjcmVhdGUgbWV0aG9kIHRvIHVzZVxuICAgICAqIGluIGNyZWF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY3JkdDE6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjcmR0MjogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZWF0ZUNyZHRJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDcmR0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgSW5pdGlhbCBkYXRhIHVzZWQgdG8gaW5pdGlhbGl6ZSB0aGlzLmNyZHQxLlxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ3JkdEluZGV4ID09PSAxKSByZXR1cm4gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLmNyZHQyLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbi9tZXNzYWdlIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG9wZXJhdGlvbi9tZXNzYWdlIGZvciB0aGF0IGNyZHRdLiAgQW4gZXhjZXB0aW9uIGlzIGlmXG4gICAgICogdGhlIGludGVybmFsIGNyZHQgcmV0dXJucyBhIG51bGwgbWVzc2FnZSwgaW4gd2hpY2ggY2FzZVxuICAgICAqIHdlIGp1c3QgcmV0dXJuIG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLiAgVGhpc1xuICAgICAqIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IHNlbmRpbmcgdGhlXG4gICAgICogbWVzc2FnZS5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogW251bWJlciwgYW55XSwgc3RhdGU6IFMsXG4gICAgICAgICAgICByZXBsaWNhSWQ6IGFueSk6IFtudW1iZXIsIGFueV0gfCBudWxsIHtcbiAgICAgICAgbGV0IG1lc3NhZ2U6IGFueTtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb25bMF0pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5jcmR0MS5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDIucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JkdCBudW1iZXIgaW4gb3BlcmF0aW9uOiBcIiArIG9wZXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIFtvcGVyYXRpb25bMF0sIG1lc3NhZ2VdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLlxuICAgICAqIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwsXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqIFRPRE86IHBlcmhhcHMgYWRkIHRyYW5zbGF0aW5nIGRlc2NyaXB0aW9ucyB0byB0aGlzIGNsYXNzLCBzb1xuICAgICAqIHRoZSBDcmR0IGRvZXNuJ3QgaGF2ZSB0byB1bmRlcnN0YW5kIGFsbCBvZiB0aGUgbGF5ZXJzIGF0XG4gICAgICogb25jZT9cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogW251bWJlciwgYW55XSwgc3RhdGU6IFMsIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBbbnVtYmVyLCBhbnldIHwgbnVsbF0ge1xuICAgICAgICBsZXQgcmVzdWx0OiBbUywgYW55XTtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0MS5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNyZHQyLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JkdCBudW1iZXIgaW4gbWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKSByZXR1cm4gW3Jlc3VsdFswXSwgbnVsbF07XG4gICAgICAgIGVsc2UgcmV0dXJuIFtyZXN1bHRbMF0sIFttZXNzYWdlWzBdLCByZXN1bHRbMV1dXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDcmR0UnVudGltZSwgQ2F1c2FsVGltZXN0YW1wIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcbmltcG9ydCB7IERlZmF1bHRSZXNldHRhYmxlQ3JkdCB9IGZyb20gXCIuL3Jlc2V0dGFibGVcIjtcbmltcG9ydCB7IENvdW50ZXJJbnRlcm5hbCwgTXVsdFJlZ2lzdGVySW50ZXJuYWwgfSBmcm9tIFwiLi9iYXNpY19jcmR0c1wiO1xuaW1wb3J0IHsgQ3JkdCwgQ3JkdEludGVybmFsIH0gZnJvbSBcIi4vY3JkdF9jb3JlXCI7XG5pbXBvcnQgeyBTZW1pZGlyZWN0U3RhdGUsIFNlbWlkaXJlY3RJbnRlcm5hbCwgRGlyZWN0SW50ZXJuYWwgfSBmcm9tIFwiLi9zZW1pZGlyZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgZXh0ZW5kcyBDcmR0PFNlbWlkaXJlY3RTdGF0ZTxudW1iZXI+PiB7XG4gICAgLy8gc2VtaWRpcmVjdEluc3RhbmNlIGNvbXBsZXRlbHkgZGVzY3JpYmVzIHRoaXMgc2VtaWRpcmVjdCBwcm9kdWN0XG4gICAgc3RhdGljIHNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8bnVtYmVyPihcbiAgICAgICAgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSxcbiAgICAgICAgKG0yOiBudW1iZXIsIG0xOiBudW1iZXIpID0+IG0yKm0xLCAxXG4gICAgKTtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSwgaW5pdGlhbERhdGE/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLG5dKTtcbiAgICB9XG4gICAgbXVsdChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLG5dKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9uczogQXJyYXk8W251bWJlciwgbnVtYmVyXT4pOiBbc3RyaW5nLCBudW1iZXJdIHtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRSZWdpc3RlckNyZHQgZXh0ZW5kcyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ8U2VtaWRpcmVjdFN0YXRlPG51bWJlcj4+IHtcbiAgICBzdGF0aWMgc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxudW1iZXI+KFxuICAgICAgICBDb3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLFxuICAgICAgICAobTI6IG51bWJlciwgbTE6IG51bWJlcikgPT4gbTIqbTEsIDFcbiAgICApO1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLFxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBudW1iZXIgPSAwLCByZXNldFZhbHVlOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIG5dKTtcbiAgICB9XG4gICAgbXVsdChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBuXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCByZXNldC10aGVuLWFkZC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmFkZChuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zOiBBcnJheTxbbnVtYmVyIHwgc3RyaW5nLCBudW1iZXJdPik6IFtzdHJpbmcsIG51bWJlcl0ge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2UgcmV0dXJuIFtkZXNjcmlwdGlvblswXSBhcyBzdHJpbmcsIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvc2l0aXZlTW9kKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gICAgaWYgKGEgPj0gMCkgcmV0dXJuIGEgJSBiO1xuICAgIGVsc2UgcmV0dXJuIGIgLSAoKC1hKSAlIGIpO1xufVxuXG5jbGFzcyBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxbbnVtYmVyLCBib29sZWFuXT4ge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IFtudW1iZXIsIGJvb2xlYW5dKTogW251bWJlciwgYm9vbGVhbl0ge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFswLCBmYWxzZV07XG4gICAgICAgIGVsc2UgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogbnVtYmVyLCBfc3RhdGU6IFtudW1iZXIsIGJvb2xlYW5dLCBfcmVwbGljYUlkOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aXZlTW9kKG9wZXJhdGlvbiwgMipNYXRoLlBJKTtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IFtudW1iZXIsIGJvb2xlYW5dLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtbbnVtYmVyLCBib29sZWFuXSwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbW3Bvc2l0aXZlTW9kKHN0YXRlWzBdICsgbWVzc2FnZSwgMipNYXRoLlBJKSwgc3RhdGVbMV1dLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsKCk7XG59XG5cbmNsYXNzIE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8W251bWJlciwgYm9vbGVhbl0+IHtcbiAgICBjcmVhdGUoX2luaXRpYWxEYXRhPzogW251bWJlciwgYm9vbGVhbl0pOiBbbnVtYmVyLCBib29sZWFuXSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IHN0cmluZywgX3N0YXRlOiBbbnVtYmVyLCBib29sZWFuXSwgX3JlcGxpY2FJZDogYW55KSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVmbGVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIG9wZXJhdGlvbik7XG4gICAgICAgIHJldHVybiBcInJlZmxlY3RcIjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2U6IHN0cmluZywgc3RhdGU6IFtudW1iZXIsIGJvb2xlYW5dLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtbbnVtYmVyLCBib29sZWFuXSwgc3RyaW5nXSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBcInJlZmxlY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIC8vIFJlZmxlY3Rpb24gb3BlcmF0aW9uIGlzIG11bHRpcGx5aW5nIG9uIHRoZSBsZWZ0LFxuICAgICAgICAvLyBzbyB0byBwdXQgaXQgaW4gY2Fub25pY2FsIGZvcm0gKGcxLCBnMiksIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gY29tbXV0ZSBpdCB3aXRoIHRoZSBjdXJyZW50IGcxIChyb3RhdGlvbikgdmFsdWUgYnlcbiAgICAgICAgLy8gYWN0aW5nIG9uIGl0LlxuICAgICAgICByZXR1cm4gW1twb3NpdGl2ZU1vZCgtc3RhdGVbMF0sIDIqTWF0aC5QSSksICFzdGF0ZVsxXV0sIFwicmVmbGVjdFwiXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBDcmR0IGZvciB0aGUgMi1kaW1lbnNpb25hbCBvcnRob2dvbmFsIGdyb3VwLCB3aGljaCBhbGxvd3NcbiAqIHJvdGF0aW9ucyBhbmQgcmVmbGVjdGlvbnMgKGFib3V0IHRoZSBvcmlnaW4pIG9mIGFuIG9iamVjdCBpbiB0aGVcbiAqIHBsYW5lLiAgRXhhbXBsZSB1c2FnZTogcm90YXRpbmcgYW5kIHJlZmxlY3Rpbmcgb2JqZWN0cyBpblxuICogUG93ZXJwb2ludC5cbiAqXG4gKiBTdGF0ZSBpcyBzdG9yZWQgYXMgdGhlIGNhbm9uaWNhbCBlbGVtZW50IG9mIHRoZSBzZW1pZGlyZWN0XG4gKiBwcm9kdWN0IGdyb3VwLCBpLmUuLCBpbiB0aGUgZm9ybSAoZzEsIGcyKSBmb3IgZzEgaW4gdGhlIHJvdGF0aW9uXG4gKiBncm91cCAocmVhbHMgbW9kIDJwaSkgYW5kIGcyIGluIHRoZSByZWZsZWN0aW9uIGdyb3VwIChib29sZWFuc1xuICogd2l0aCB0cnVlIGZvciAxIGFuZCBmYWxzZSBmb3IgMCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBPcnRob2dvbmFsQ3JkdCBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxTZW1pZGlyZWN0U3RhdGU8W251bWJlciwgYm9vbGVhbl0+PiB7XG4gICAgc3RhdGljIHNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBTZW1pZGlyZWN0SW50ZXJuYWw8W251bWJlciwgYm9vbGVhbl0+KFxuICAgICAgICBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbC5pbnN0YW5jZSwgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbC5pbnN0YW5jZSxcbiAgICAgICAgKF9tMjogc3RyaW5nLCBtMTogbnVtYmVyKSA9PiAtbTEsIDFcbiAgICApO1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLFxuICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBbbnVtYmVyLCBib29sZWFuXSA9IFswLCBmYWxzZV0sXG4gICAgICAgICAgICByZXNldFZhbHVlOiBbbnVtYmVyLCBib29sZWFuXSA9IFswLCBmYWxzZV0pIHtcbiAgICAgICAgc3VwZXIoaWQsIE9ydGhvZ29uYWxDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcmVzZXRWYWx1ZSwgcnVudGltZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW5nbGUgaXMgaW4gcmFkaWFucyBDQ1cuXG4gICAgICovXG4gICAgcm90YXRlKGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBhbmdsZV0pO1xuICAgIH1cbiAgICByZWZsZWN0SG9yaXpvbnRhbEF4aXMoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgXCJyZWZsZWN0XCJdKTtcbiAgICB9XG4gICAgcmVmbGVjdFZlcnRpY2FsQXhpcygpIHtcbiAgICAgICAgdGhpcy5yZWZsZWN0KE1hdGguUEkvMik7XG4gICAgfVxuICAgIHJlZmxlY3QoYW5nbGVBeGlzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucm90YXRlKC1hbmdsZUF4aXMpO1xuICAgICAgICB0aGlzLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgICAgICB0aGlzLnJvdGF0ZShhbmdsZUF4aXMpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIGlzIGdpdmVuIGJ5OiByZWZsZWN0IGFjcm9zcyB0aGUgeC1heGlzXG4gICAgICogaWYgcmVmbGVjdGVkIGlzIHRydWUsIHRoZW4gcm90YXRlIGJ5IGFuZ2xlIChDQ1csIGluIHJhZGlhbnMpLlxuICAgICAqL1xuICAgICBnZXQgcmVmbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZVsxXTtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogVGhlIGN1cnJlbnQgc3RhdGUgaXMgZ2l2ZW4gYnk6IHJlZmxlY3QgYWNyb3NzIHRoZSB4LWF4aXNcbiAgICAgICogaWYgcmVmbGVjdGVkIGlzIHRydWUsIHRoZW4gcm90YXRlIGJ5IGFuZ2xlIChDQ1csIGluIHJhZGlhbnMpLlxuICAgICAgKi9cbiAgICAgZ2V0IGFuZ2xlKCk6IG51bWJlciB7XG4gICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlWzBdO1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBbcmVmbGVjdGVkLCBhbmdsZV1cbiAgICAgICovXG4gICAgIGdldCB2YWx1ZSgpOiBbbnVtYmVyLCBib29sZWFuXSB7XG4gICAgICAgICByZXR1cm4gW3RoaXMuYW5nbGUsIHRoaXMucmVmbGVjdGVkXTtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCByZXNldC10aGVuLXNldC5cbiAgICAgICovXG4gICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogW251bWJlciwgYm9vbGVhbl0pIHtcbiAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgdGhpcy5yb3RhdGUobmV3VmFsdWVbMF0pO1xuICAgICAgICAgaWYgKG5ld1ZhbHVlWzFdKSB0aGlzLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICB9XG4gICAgIC8vIFRPRE86IG1hdHJpeCB2ZXJzaW9ucyBvZiBnZXQgYW5kIHNldC5cbiAgICAgLy8gLyoqXG4gICAgIC8vICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgdHJhbnNmb3JtYXRpb24gYXMgYSAyeDIgb3J0aG9nb25hbFxuICAgICAvLyAgKiBtYXRyaXguXG4gICAgIC8vICAqL1xuICAgICAvLyBnZXQgbWF0cml4KCk6IFtbbnVtYmVyLCBudW1iZXJdLCBbbnVtYmVyLCBudW1iZXJdXSB7XG4gICAgIC8vXG4gICAgIC8vIH1cblxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKF9kZXNjcmlwdGlvbnM6IEFycmF5PFtudW1iZXIgfCBzdHJpbmcsIG51bWJlcl0+KSB7XG4gICAgICAgIC8vIFRPRE8uICBKdXN0IHJldHVybnMgdGhlIHJlc3VsdGluZyBzdGF0ZSBmb3Igbm93LlxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgLy8gaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgLy8gICAgIC8vIFRyYW5zYWN0aW9uIGR1ZSB0byBzZXQgdmFsdWUsIHJldHVybiB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gICAgICAgIC8vICAgICByZXR1cm4gW1wic2V0XCIsIGRlc2NyaXB0aW9uc1sxXVsxXV07XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICAvLyBlbHNlIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICAvLyBlbHNlIHJldHVybiBbZGVzY3JpcHRpb25bMF0gYXMgc3RyaW5nLCB0aGlzLnZhbHVlXTsgLy8gcmVzZXRzXG4gICAgfVxufVxuXG4vKipcbiAqIENyZHRJbnRlcm5hbCB3aGljaCB1c2VzIGFueSBzdHJpbmcgYXMgYW4gb3BlcmF0aW9uL21lc3NhZ2VcbiAqIHdoaWNoIGRvZXMgbm90aGluZy4gIFVubGlrZSB1c2luZyBudWxsIG1lc3NhZ2VzIHRvIGluZGljYXRlIHRoYXRcbiAqIG5vdGhpbmcgaGFwcGVuZWQsIHRoZSBub29wIG1lc3NhZ2UgaXMgYW4gZXhwbGljaXQgbm9uLW51bGxcbiAqIHN0cmluZyBzdXBwbGllZCBhcyB0aGUgb3BlcmF0aW9uLlxuICpcbiAqIFR3byB1c2UgY2FzZXM6XG4gKiAtIFRvIHVucmVzZXQgYSBzdGF0ZSAoZS5nLiBpbiBFbmFibGVXaW5zRmxhZyBiZWxvdykuXG4gKiAtIEFzIGEgXCJoZWFkZXJcIiBmb3Igc2VxdWVuY2Ugb2Ygb3BlcmF0aW9ucyBwYXNzZWQgdG8gYXBwbHlPcHMsXG4gKiBzbyB0aGF0IHJlY2lwaWVudHMgY2FuIGtub3cgd2hhdCBlbmQtdXNlciBvcGVyYXRpb24gdGhlIHNlcXVlbmNlXG4gKiBjb3JyZXNwb25kcyB0by5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vT3BDcmR0SW50ZXJuYWw8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjcmVhdGVGdW5jPzogKGluaXRpYWxEYXRhOiBhbnkpID0+IFMpIHt9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUZ1bmMpIHJldHVybiB0aGlzLmNyZWF0ZUZ1bmMoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkNyZWF0ZUZ1bmMgbm90IHN1cHBsaWVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFMpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIHRoZSBvcmlnaW5hbCBvcGVyYXRpb24uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IHN0cmluZywgc3RhdGU6IFMsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIHN0cmluZ10ge1xuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVG88Uz4ob3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEaXJlY3RJbnRlcm5hbDxTPihvcmlnaW5hbENyZHQsXG4gICAgICAgICAgICBuZXcgTm9PcENyZHRJbnRlcm5hbDxTPigpLCAxXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW5hYmxlV2luc0ZsYWcgZXh0ZW5kcyBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ8bnVsbD4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCxcbiAgICAgICAgICAgIHJ1bnRpbWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFwiZVwiKTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBkaXNhYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKTtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBkaXNhYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERpc2FibGVXaW5zRmxhZyBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxudWxsPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLFxuICAgICAgICAgICAgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGVuYWJsZVN0cm9uZygpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0cm9uZygpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJkXCIpO1xuICAgIH1cbiAgICBnZXQgZW5hYmxlZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKTtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBlbmFibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8c3RyaW5nPik6IHN0cmluZyB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuZXhwb3J0IGNsYXNzIEdNYXBJbnRlcm5hbDxLLCBDIGV4dGVuZHMgQ3JkdDxhbnk+PiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxNYXA8SywgQz4+IHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHZhbHVlQ3JkdEludGVybmFsIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gc2hvdWxkR2MgR2l2ZW4gYSB2YWx1ZSBzdGF0ZSwgcmV0dXJuIHdoZXRoZXIgaXQgaXMgc2FmZVxuICAgICAqIHRvIGdhcmJhZ2UgY29sbGVjdCBpdCwgcmVtb3ZpbmcgaXRzIGtleS12YWx1ZSBwYWlyIGZyb20gdGhlXG4gICAgICogbWFwLiAgRm9yIGNvcnJlY3RuZXNzLCBpZiBzaG91bGRHYyh2YWx1ZVN0YXRlKSBpcyB0cnVlLCB0aGVuXG4gICAgICogdmFsdWVTdGF0ZSBtdXN0IGJlIGlkZW50aWNhbCB0byB2YWx1ZUNyZHRJbnRlcm5hbC5jcmVhdGUodmFsdWVJbml0aWFsRGF0YSk7XG4gICAgICogYW5kIGlmIHNob3VsZEdjIGlzIG5vbnRyaXZpYWwsIHRoZW4gdXNlcnMgc2hvdWxkIGtlZXAgaW5cbiAgICAgKiBtaW5kIHRoYXQgc3RhdGUuaGFzKGtleSkgaXMgbm90IHJlbGlhYmxlLCBzaW5jZSBpdCBtYXkgYmVcbiAgICAgKiBmYWxzZSBldmVuIGFmdGVyIGtleSBoYXMgYmVlbiBpbml0aWFsaXplZCBiZWNhdXNlIHRoZSB2YWx1ZVxuICAgICAqIGhhcyBiZWVuIGdhcmJhZ2UgY29sbGVjdGVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzaG91bGRHYzogKHZhbHVlU3RhdGU6IEMpID0+IGJvb2xlYW4gPSAoKCkgPT4gZmFsc2UpKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRPRE8uICBOZWVkcyB0byBiZSBzZXQuICBBbGxvdyBpdCB0byBiZSBzZXQgb3V0c2lkZSBjb25zdHJ1Y3RvclxuICAgICAqIGJlY2F1c2UgQ3JkdE9iamVjdCBuZWVkcyB0byBjYWxsIHN1cGVyIGJlZm9yZSBpdCBjYW4gc2V0IHRoaXMuXG4gICAgICovXG4gICAgcHVibGljIGluaXRGYWN0b3J5ITogKGtleTogSykgPT4gQztcbiAgICBjcmVhdGUoX2luaXRpYWxEYXRhPzogYW55KTogTWFwPEssIEM+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXA8SywgQz4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcImFwcGx5XCIsIGtleSwgQyBtZXNzYWdlXTogYXBwbGllcyB0aGUgQyBtZXNzYWdlIHRvXG4gICAgICogdGhlIGdpdmVuIGtleSwgaW5pdGlhbGl6aW5nIHRoZSBrZXkgaWYgbmVlZGVkLlxuICAgICAqIC0gW1wiYXBwbHlTa2lwXCIsIGtleSwgQyBtZXNzYWdlXTogYXBwbGllcyB0aGUgQyBtZXNzYWdlIHRvXG4gICAgICogdGhlIGdpdmVuIGtleSwgZXhjZXB0IGZvciB0aGVpciBzZW5kZXIsIHdobyBpcyBhc3N1bWVkXG4gICAgICogdG8gaGF2ZSBhbHJlYWR5IGFwcGxpZWQgdGhlIG1lc3NhZ2UuICBUaGlzIGlzIHVzZWQgYnlcbiAgICAgKiBDcmR0VmFsdWVkR3Jvd09ubHlNYXBJbnRlcm5hbCwgd2hvc2UgbWVzc2FnZXMgYXJlXG4gICAgICogc29tZXRpbWVzIGRlcml2ZWQgZnJvbSB2YWx1ZXMgYXBwbHlpbmcgbWVzc2FnZXMgdG9cbiAgICAgKiB0aGVtc2VsdmVzLiAgVE9ETzogaW4gcHJpbmNpcGxlIGNhbiBvcHRpbWl6ZSBzbyB3ZVxuICAgICAqIGRvbid0IGhhdmUgdG8gc2VuZCBcInNraXBcIiBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIC0gW1wiaW5pdFwiLCBrZXldOiBpbml0aWFsaXplcyB0aGUgZ2l2ZW4ga2V5IHVzaW5nIGluaXRGYWN0b3J5XG4gICAgICogaWYgaXQgaXMgbm90IGFscmVhZHkgcHJlc2VudCBpbiB0aGUgbWFwLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0cyBldmVyeSB2YWx1ZSBpbiB0aGUgbWFwICh1c2luZ1xuICAgICAqIGVhY2ggdmFsdWUncyBnZXRVbml2ZXJzYWxSZXNldE9wZXJhdGlvbigpKS5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogW3N0cmluZywgSywgYW55XSwgc3RhdGU6IE1hcDxLLCBDPiwgX3JlcGxpY2FJZDogYW55KTogW3N0cmluZywgSz8sIGFueT9dIHtcbiAgICAgICAgbGV0IGtleSA9IG9wZXJhdGlvblsxXTtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb25bMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJhcHBseVwiLCBrZXksIG9wZXJhdGlvblsyXV07XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlTa2lwXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5U2tpcFwiLCBrZXksIG9wZXJhdGlvblsyXV07XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGlmICghc3RhdGUuaGFzKGtleSkpIHJldHVybiBbXCJpbml0XCIsIGtleV07XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjogcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluIGFkZGl0aW9uIHRvIHRoZSBtZXNzYWdlIG91dHB1dCBieSBwcmVwYXJlLCB3ZSBoYXZlXG4gICAgICogbWVzc2FnZXMgKGFyaXNpbmcgdGhyb3VnaCBzZW1kaXJlY3QgcHJvZHVjdCk6XG4gICAgICogLSBbXCJpbml0UmVzZXRcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWQgYnlcbiAgICAgKiBkZWxpdmVyaW5nIGEgcmVzZXQgbWVzc2FnZSB0byB0aGUga2V5LlxuICAgICAqIC0gW1wiaW5pdFJlc2V0U3Ryb25nXCIsIGtleV06IGRvZXMgW1wiaW5pdFwiLCBrZXldIGZvbGxvd2VkXG4gICAgICogYnkgZGVsaXZlcmluZyBhIHJlc2V0LXN0cm9uZyBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICpcbiAgICAgKiBEZXNjcmlwdGlvbiBmb3JtYXQ6XG4gICAgICogLSBmb3IgYW4gYXBwbHkvYXBwbHlTa2lwIG9wZXJhdGlvbjpcbiAgICAgKiBudWxsIChUT0RPKVxuICAgICAqIC0gZm9yIGFuIGluaXQgb3BlcmF0aW9uOiBudWxsIGlmIHRoZSBrZXkgYWxyZWFkeSBleGlzdGVkLFxuICAgICAqIG90aGVyd2lzZSBbXCJpbml0XCIsIGtleV1cbiAgICAgKiAtIGZvciBhIHJlc2V0IG9wZXJhdGlvbjogW1wicmVzZXRcIl0gKFRPRE86IGRlc2NyaXB0aW9ucyBmcm9tXG4gICAgICogcmVzZXQga2V5cylcbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogW3N0cmluZywgSywgYW55P10sIHN0YXRlOiBNYXA8SywgQz4sXG4gICAgICAgICAgICByZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOlxuICAgICAgICAgICAgW01hcDxLLCBDPiwgW3N0cmluZywgSz8sIGFueT9dIHwgbnVsbF0ge1xuICAgICAgICBsZXQga2V5ID0gbWVzc2FnZVsxXTtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlTa2lwXCI6XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgYXBwbHlpbmcgaXQgdG8gdGhlIHN0YXRlLlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4gc3RpbGwgZ2MsIHRob3VnaCwgaW4gY2FzZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxyZWFkeS1hcHBsaWVkIG1lc3NhZ2UgaGFzIG1hZGUgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2MtYWJsZS5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlTdGF0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgZmFsbCB0aHJvdWdoLlxuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6e1xuICAgICAgICAgICAgICAgIGxldCBrZXlTdGF0ZSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChrZXlTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleVN0YXRlID0gdGhpcy5pbml0RmFjdG9yeShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXlTdGF0ZS5yZWNlaXZlKG1lc3NhZ2VbMl0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkR2Moa2V5U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTt9XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5oYXMoa2V5KSkgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbml0U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zaG91bGRHYyhpbml0U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zZXQoa2V5LCBpbml0U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFtcImluaXRcIiwga2V5XV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2Ygc3RhdGUuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNldE1lc3NhZ2UgPSBlbnRyeVsxXS5nZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2V0TWVzc2FnZSAhPT0gbnVsbCkgZW50cnlbMV0ucmVjZWl2ZShbcmVzZXRNZXNzYWdlXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkR2MoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoZW50cnlbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFtcInJlc2V0XCJdXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKlxuICogQ29udmVuaWVudCByZXByZXNlbnRhdGlvbiBvZiBhIENyZHQtdmFsdWVkIGdyb3ctb25seSBtYXAuXG4gKlxuICogVE9ETzogU29tZXdoZXJlOiBub3RlIHRoYXQgaW5pdGlhbCB2YWx1ZXMgb2YgcHJvcGVydGllcyBtdXN0IGJlXG4gKiBhIGZ1bmN0aW9uIG9mIHRoZWlyIGtleSBvbmx5IChzbyBjYW4ndCBoYXZlIHZhcnlpbmcgdHlwZXMgb3JcbiAqIGluaXRpYWwgZGF0YSkuXG4gKlxuICogTiBpcyB0aGUgdHlwZSBvZiBtZW1iZXIgbmFtZXMgKHR5cGljYWxseSBzdHJpbmcpLlxuICovXG5leHBvcnQgY2xhc3MgQ3JkdE9iamVjdDxOLCBDIGV4dGVuZHMgQ3JkdDxhbnk+PiBleHRlbmRzIENyZHQ8TWFwPE4sIEM+PiBpbXBsZW1lbnRzIENyZHRSdW50aW1lIHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BlcnR5RmFjdG9yeSA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHluYW1pY2FsbHkgY3JlYXRlZCBwcm9wZXJ0aWVzIGFyZSBvbmx5IFwiICtcbiAgICAgICAgICAgICAgICBcImFsbG93ZWQgaWYgcHJvcGVydHlGYWN0b3J5IGlzIHBhc3NlZCB0byB0aGUgXCIgK1xuICAgICAgICAgICAgICAgIFwiQ3JkdE9iamVjdCBjb25zdHJ1Y3RvclwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRPRE86IHByZWRlZmluZWQgdnMgZHluYW1pYyBwcm9wZXJ0eSBjcmVhdGlvbi4gIFByZWRlZmluZWQgb25lc1xuICAgICAqIGhhdmUgdG8gYmUgY3JlYXRlZCBpZGVudGljYWxseSBvbiBhbGwgcmVwbGljYXMgaW5cbiAgICAgKiBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBhbmRcbiAgICAgKiBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpLCBpZGVhbGx5IGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhleVxuICAgICAqIGFyZSBub3Qgc3luY2VkIChmb3IgZWZmaWNpZW5jeSBhbmQgdG8gc2F2ZSB0aGUgdHJvdWJsZVxuICAgICAqIG9mIHNwZWNpZnlpbmcgcHJvcGVydHlGYWN0b3J5KS4gIER5bmFtaWMgcHJvcGVydGllc1xuICAgICAqIGNhbiBvbmx5IGJlIGNyZWF0ZWQgdGhyb3VnaCBpbml0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHByb3BlcnR5RmFjdG9yeSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICBwcm9wZXJ0eUZhY3Rvcnk6IChuYW1lOiBOLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBDXG4gICAgICAgICAgICA9IENyZHRPYmplY3QuZGVmYXVsdFByb3BlcnR5RmFjdG9yeSkge1xuICAgICAgICAvLyBUT0RPOiBnYyBhYmlsaXR5XG4gICAgICAgIGxldCBjcmR0SW50ZXJuYWwgPSBuZXcgR01hcEludGVybmFsPE4sIEM+KCk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0SW50ZXJuYWwsIHJ1bnRpbWUpO1xuICAgICAgICBjcmR0SW50ZXJuYWwuaW5pdEZhY3RvcnkgPSAoa2V5OiBOKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluSW5pdCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gcHJvcGVydHlGYWN0b3J5KGtleSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmluSW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uOiBib29sZWFuO1xuICAgIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBpbkluaXQ6IGJvb2xlYW47XG4gICAgcmVnaXN0ZXIoY3JkdDogQywgbmFtZTogTik6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gfHwgdGhpcy5pbkluaXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQcm9wZXJ0aWVzIGNhbiBvbmx5IGJlIGRpcmVjdGx5IFwiICtcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyZWQgYmV0d2VlbiBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkgXCIgK1xuICAgICAgICAgICAgICAgIFwiYW5kIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkuICBEeW5hbWljIHByb3BlcnRpZXMgXCIgK1xuICAgICAgICAgICAgICAgIFwibXVzdCBiZSBjcmVhdGVkIHdpdGggaW5pdChuYW1lKS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgcHJvcGVydHkgbmFtZTogXCIgKyBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNldChuYW1lLCBjcmR0KTtcbiAgICAgICAgLy8gU2tpcCBzZW5kaW5nIGFuIGluaXQgbWVzc2FnZSBhYm91dCBpdC4gIE9rYXkgYmVjYXVzZSBvZiB0aGVcbiAgICAgICAgLy8gcHJlZGVmaW5lZCBpbml0aWFsaXphdGlvbiBjb250cmFjdC5cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBuYW1lIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgVGhlIGluaXRpYWxpemVkIENyZHQuXG4gICAgICovXG4gICAgaW5pdFByb3BlcnR5KG5hbWU6IE4pOiBDIHtcbiAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseU9wKFtcImluaXRcIiwgbmFtZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KG5hbWUpIGFzIEM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcCh0aGlzLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxuXG4gICAgZ2V0UHJvcGVydHkobmFtZTogTik6IEMgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgfVxuICAgIHByb3BlcnR5TmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmtleXMoKTtcbiAgICB9XG4gICAgcHJvcGVydHlWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlcygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eUVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVudHJpZXMoKTtcbiAgICB9XG5cbiAgICBzZW5kKG1lc3NhZ2U6IGFueSwgbmFtZTogTik6IHZvaWQge1xuICAgICAgICAvLyBDb252ZXJ0IGludG8gYW4gYXBwbHlTa2lwIG1lc3NhZ2UgZm9yIHRoZSBtYXAgdmFsdWVcbiAgICAgICAgLy8gYXQgbmFtZS4gIEhlcmUgd2Ugd2FudCB0byBza2lwIGJlY2F1c2VcbiAgICAgICAgLy8gb3VyIHJlcGxpY2EncyB2YWx1ZSBoYXMgYWxyZWFkeSBhcHBsaWVkIHRoZVxuICAgICAgICAvLyBvcGVyYXRpb24gaW50ZXJuYWxseS5cbiAgICAgICAgdGhpcy5hcHBseU9wKFtcImFwcGx5U2tpcFwiLCBuYW1lLCBtZXNzYWdlXSk7XG4gICAgfVxuXG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpO1xuICAgIH1cbiAgICBnZXROZXh0VGltZXN0YW1wKF9jcmR0SWQ6IGFueSk6IENhdXNhbFRpbWVzdGFtcCB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRXaW5zU2V0PFQ+IGV4dGVuZHMgQ3JkdE9iamVjdDxULCBFbmFibGVXaW5zRmxhZz4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBnYyBvbmNlIHdlIGhhdmUgdHJhbnNhY3Rpb25zXG4gICAgICAgIHN1cGVyKGlkLCBydW50aW1lLCAobmFtZTogVCwgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT5cbiAgICAgICAgICAgICAgICBuZXcgRW5hYmxlV2luc0ZsYWcobmFtZSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgfVxuICAgIGFkZCh2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5pbml0UHJvcGVydHkodmFsdWUpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIGRlbGV0ZSh2YWx1ZTogVCkge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAodGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSkgYXMgRW5hYmxlV2luc0ZsYWcpLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVTdHJvbmcodmFsdWU6IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgKHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpIGFzIEVuYWJsZVdpbnNGbGFnKS5yZXNldFN0cm9uZygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcyh2YWx1ZTogVCkge1xuICAgICAgICBsZXQgdmFsdWVGbGFnID0gdGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZUZsYWcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlIHJldHVybiB2YWx1ZUZsYWcuZW5hYmxlZDtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCk6IFNldDxUPiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgU2V0PFQ+KCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMucHJvcGVydHlFbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeVsxXS5lbmFibGVkKSByZXN1bHQuYWRkKGVudHJ5WzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IFNldDxUPikge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgLy8gVE9ETzogb25jZSBpdCdzIGdjJ2Qgd2UgY2FuIGp1c3QgdXNlIHRoaXMuc3RhdGUua2V5cygpXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnZhbHVlcygpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBvdGhlciBzZXQgcHJvcGVydGllcyAoZS5nLiBzeW1ib2wgaXRlcmF0b3IpXG4gICAgLy8gVE9ETzogY2FwdHVyaW5nIGFuZCB0cmFuc2xhdGluZyBkZXNjcmlwdGlvbnNcbn1cblxuZXhwb3J0IGNsYXNzIE1hcENyZHQ8SywgQyBleHRlbmRzIENyZHQ8YW55Pj4gZXh0ZW5kcyBDcmR0T2JqZWN0PHN0cmluZywgQWRkV2luc1NldDxLPiB8IENyZHRPYmplY3Q8SywgQz4+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGtleVNldDogQWRkV2luc1NldDxLPjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZhbHVlTWFwOiBDcmR0T2JqZWN0PEssIEM+O1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLFxuICAgICAgICAgICAgdmFsdWVGYWN0b3J5OiAoa2V5OiBLLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBDKSB7XG4gICAgICAgIHN1cGVyKGlkLCBydW50aW1lKTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMua2V5U2V0ID0gbmV3IEFkZFdpbnNTZXQoXCJrZXlTZXRcIiwgdGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWVNYXAgPSBuZXcgQ3JkdE9iamVjdChcInZhbHVlTWFwXCIsIHRoaXMsIHZhbHVlRmFjdG9yeSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmxhZyBpbmRpY2F0aW5nIHRoYXQgd2UgYXJlIGluIHRoZSBib2R5IG9mIGEgZGVsZXRlL1xuICAgICAqIGRlbGV0ZVN0cm9uZyBjYWxsLCBoZW5jZSB3ZSBzaG91bGQgbm90IGFkZCB0aGluZ3NcbiAgICAgKiB0byBrZXlTZXQgKGFzIGFuIG9wdGltaXphdGlvbikuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbkRlbGV0ZSA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIENyZHRPYmplY3Quc2VuZCBzbyB0aGF0IHdlIGNhbiBjYXB0dXJlXG4gICAgICogYSBzZW5kIGJ5IGEgdmFsdWVNYXAgdmFsdWUgYW5kIGZvbGxvdyBpdCB1cCB3aXRoXG4gICAgICogYW4gYWRkIHRvIGtleVNldCwgdGh1cyByZXZpdmluZyB0aGUgdmFsdWUncyBrZXlcbiAgICAgKiBpZiBhcHByb3ByaWF0ZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHNraXAgYWRkaW5nIHRoZSBrZXkgaWYgaXQncyBhIHJlc2V0IG1lc3NhZ2U/XG4gICAgICogTm90IHN1cmUgaWYgdGhpcyBpcyBwb3NzaWJsZSBpbiBnZW5lcmFsLiAgQnV0IHNob3VsZCBhdFxuICAgICAqIGxlYXN0IGJlIHBvc3NpYmxlIGZvciBvdXIgb3duIGRlbGV0ZXMuXG4gICAgICovXG4gICAgc2VuZChtZXNzYWdlOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzdXBlci5zZW5kKG1lc3NhZ2UsIG5hbWUpO1xuICAgICAgICBpZiAoIXRoaXMuaW5EZWxldGUgJiYgbmFtZSA9PT0gXCJ2YWx1ZU1hcFwiKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBkbyB0aGlzIHJlY2VpdmVyIHNpZGUgaW5zdGVhZCwgZm9yIG5ldHdvcmsgZWZmaWNpZW5jeT9cbiAgICAgICAgICAgIC8vIFdvdWxkIG5lZWQgdG8gcGxhY2UgdGhlIGFkZCBmaXJzdCwgc28gdGhhdCBpdCBjYW5cbiAgICAgICAgICAgIC8vIGJlIG92ZXJyaWRkZW4gYnkgYW55IGluY2x1ZGVkIGRlbGV0ZXMuXG4gICAgICAgICAgICAvLyBXb3VsZCBhbHNvIG5lZWQgdG8gYWNjb3VudCBmb3IgcG9zc2liaWxpdHkgb2ZcbiAgICAgICAgICAgIC8vIHRyYW5zYWN0aW9ucy5cbiAgICAgICAgICAgIC8vIEFsc28sIG5lZWQgdG8gbWFrZSBzdXJlIHdlIChzZW5kZXIpIGRvIGl0IHRvby5cbiAgICAgICAgICAgIGZvciAobGV0IHN1Ym1lc3NhZ2Ugb2YgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJtZXNzYWdlWzBdID09PSBcImFwcGx5U2tpcFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzdWJtZXNzYWdlWzFdIGFzIEs7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5U2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KGtleTogSyk6IEMge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlKSB0aGlzLmtleVNldC5hZGQoa2V5KTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMudmFsdWVNYXAuaW5pdFByb3BlcnR5KGtleSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFzKGtleTogSykge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlTZXQuaGFzKGtleSk7XG4gICAgfVxuICAgIGdldChrZXk6IEspIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHJldHVybiB0aGlzLnZhbHVlTWFwLmdldFByb3BlcnR5KGtleSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZGVsZXRlKGtleTogSykge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICh0aGlzLmdldChrZXkpIGFzIEMpLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmtleVNldC5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVTdHJvbmcoa2V5OiBLKSB7XG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmluaXQoa2V5KS5yZXNldFN0cm9uZygpO1xuICAgICAgICB0aGlzLmtleVNldC5kZWxldGVTdHJvbmcoa2V5KTtcbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlTZXQudmFsdWVzKCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogb3RoZXIgbWFwIG1ldGhvZHMgKGUuZy4gc3ltYm9sIGl0ZXJhdG9yKVxuICAgIC8vIFRPRE86IHN0cm9uZy1yZXNldFxuICAgIC8vIFRPRE86IHByZXNlcnZlLXN0YXRlIGRlbGV0ZSwgcmVzZXQ/XG59XG4iLCJyZXF1aXJlKCcuLi90ZXN0L3Rlc3QnKTsgLy8gcnVuIHRlc3QudHNcblxuaW1wb3J0IHsgQ291bnRlckNyZHQgfSBmcm9tIFwiLi4vc3JjL2NyZHRzL2Jhc2ljX2NyZHRzXCI7XG5pbXBvcnQgeyBDcmR0TmV0d29ya1J1bnRpbWUgfSBmcm9tICcuLi9zcmMvbmV0d29yay9jcmR0X25ldHdvcmtfcnVudGltZSc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbi8qKlxuICogR2V0IEhlcm9rdSBzZXJ2ZXIgaG9zdCBXZWJzb2NrZXQuXG4gKi9cbnZhciBIT1NUID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJylcblxuLyoqXG4gKiBHZW5lcmF0ZSB1dWlkIGZvciBlYWNoIGNsaWVudC5cbiAqL1xuY29uc3QgY2xpZW50X3V1aWQgOiBzdHJpbmcgPSB1dWlkKCk7XG5cbi8qKlxuICogR2VuZXJhdGUgQ1JEVHMnIFJ1bnRpbWUgb24gZWFjaCBjbGllbnQgYW5kIGNyZWF0ZSBDUkRUcyAoZS5nLiBDb3VudGVyQ3JkdCkuXG4gKi9cbmxldCBjbGllbnQgPSBuZXcgQ3JkdE5ldHdvcmtSdW50aW1lKGNsaWVudF91dWlkLCBIT1NUKTtcbmxldCBjbGllbnRDb3VudGVyID0gbmV3IENvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGNsaWVudCk7XG5cbi8qIEhUTUwgdmFyaWFibGVzICovXG52YXIgY291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRlclwiKTtcblxuLyogQ3VzdG9taXplIHRoZSBvbmNoYW5nZSgpIGZvciBDUkRUIGFzIHJlZnJlc2ggdGhlIHZhbHVlICovXG5jbGllbnRDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IHtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCl9KTtcblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBpbmNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5jcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGluY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgxMDApO1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbn1cblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBkZWNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVjcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGRlY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgtMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8vIC8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2Ygc3luYyB0byBzeW5jaHJvbml6ZSB0aGUgdmFsdWUgKi9cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3luY1wiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbi8vIH1cbiIsImltcG9ydCB7IENyZHRSdW50aW1lLCBDYXVzYWxUaW1lc3RhbXAgfSBmcm9tICcuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlJztcbmltcG9ydCB7IENyZHRNZXNzYWdlTGlzdGVuZXIgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgVmVjdG9yQ2xvY2sgfSBmcm9tICcuL3ZlY3Rvcl9jbG9jayc7XG4vLyBpbXBvcnQgV2ViU29ja2V0ID0gcmVxdWlyZShcIndzXCIpO1xuXG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cblxuLyoqXG4gKiBDdXN0b21pemVkIG1lc3NhZ2UgZXZlbnQgdGhhdCB0cmF2ZWwgdGhyb3VnaFxuICogY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsuXG4gKi9cbmV4cG9ydCBjbGFzcyBteU1lc3NhZ2Uge1xuICAgIC8qKlxuICAgICAqIENyZHQgdXBkYXRlIG1lc3NhZ2UuXG4gICAgICovXG4gICAgbWVzc2FnZSA6IGFueTtcbiAgICAvKipcbiAgICAgKiBVbmlxdWUgY3JkdElkIGZvciBpZGVudGlmaWNhdGlvbi5cbiAgICAgKi9cbiAgICBjcmR0SWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVGltZXN0YW1wIGZvciBjYXN1YWxpdHkvY29uY3VycmVuY3kgY2hlY2suXG4gICAgICpcbiAgICAgKiBQcm92aWRlIGJhc2ljIGZ1bmN0aW9ucyBzdWNoIGFzIDpcbiAgICAgKiBnZXRTZW5kZXIoKSAvIGdldFNlbmRlckNvdW50ZXIoKSAvIGFzVmVjdG9yQ2xvY2soKS5cbiAgICAgKi9cbiAgICB0aW1lc3RhbXAgOiBWZWN0b3JDbG9jaztcblxuICAgIGNvbnN0cnVjdG9yIChtZXNzYWdlIDogYW55LCBjcmR0SWQgOiBhbnksIHRpbWVzdGFtcCA6IFZlY3RvckNsb2NrKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY3JkdElkID0gY3JkdElkO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgcGFja2FnZSBpbmZvIGluIEpTT04gZm9ybWF0LlxuICAgICAqL1xuICAgIHRvSlNPTigpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgeyAgIFwibWVzc2FnZVwiIDogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIFwiY3JkdElkXCIgOiB0aGlzLmNyZHRJZCxcbiAgICAgICAgICAgICAgICBcInRpbWVzdGFtcFwiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInVpZFwiIDogdGhpcy50aW1lc3RhbXAudWlkLFxuICAgICAgICAgICAgICAgICAgICBcInZlY3Rvck1hcFwiIDogQXJyYXkuZnJvbSh0aGlzLnRpbWVzdGFtcC52ZWN0b3JNYXAuZW50cmllcygpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FzdWFsQnJvYWRjYXN0TmV0d29yazpcbiAqXG4gKiBQcm9jZXNzIGluaXRpYWxpemF0aW9uIHdoZW4gc3RhcnRpbmcgYSBuZXcgdXNlciBub2RlLlxuICpcbiAqIENvbW11bmljYXRlIHdpdGggQ1JEVCdzIHJ1bnRpbWUgYW5kIHNlbmQvcmVjZWl2ZSBtZXNzYWdlIHZpYVxuICogY2VudHJhbCBicm9hZGNhc3Qgc2VydmVyIHdpdGggV2ViU29ja2V0IHByb3RvY29sLlxuICpcbiAqIFBlcmZvcm0gY2FzdWFsaXR5IGNoZWNrIHRvIGVuc3VyZSBtZXNzYWdlIG9yZGVyaW5nLlxuICovXG5leHBvcnQgY2xhc3MgQ3JkdE5ldHdvcmtSdW50aW1lIGltcGxlbWVudHMgQ3JkdFJ1bnRpbWV7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIElEIGZvciByZXBsaWNhIGZvciBpZGVudGlmaWNhdGlvbi5cbiAgICAgKi9cbiAgICB1aWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogV2ViU29ja2V0IGZvciBjb25uZWN0aW9uIHRvIHNlcnZlci5cbiAgICAgKi9cbiAgICB3cyA6IFdlYlNvY2tldDtcbiAgICAvKipcbiAgICAgKiBNYXAgc3RvcmVzIGFsbCBjcmR0SWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB2ZWN0b3IgY2xvY2suXG4gICAgICovXG4gICAgdmNNYXAgOiBNYXA8YW55LCBWZWN0b3JDbG9jaz47XG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBidWZmZXIgdG8gc3RvcmUgcmVjZWl2ZWQgbWVzc2FnZSB0byBlbnN1cmUgY2FzdWFsIGRlbGl2ZXJ5LlxuICAgICAqL1xuICAgIG1lc3NhZ2VCdWZmZXIgOiBBcnJheTxbYW55LCBhbnksIFZlY3RvckNsb2NrXT47XG4gICAgLyoqXG4gICAgICogTWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQgYnkgdGhlIFdlYlNvY2tldFxuICAgICAqL1xuICAgIHNlbmRCdWZmZXIgOiBBcnJheTxteU1lc3NhZ2U+O1xuICAgIC8qKlxuICAgICAqIFRoZSByZWdpc3RlcmVkIENSRFQgd2l0aCBjb3JyZXNwb25kaW5nIENyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICovXG4gICAgbGlzdGVuZXJzQnlJZCA6IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+O1xuXG4gICAgY29uc3RydWN0b3IgKHJlcGxpY2FJZDogYW55LCB3ZWJTb2NrZXRBcmdzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmNNYXAgPSBuZXcgTWFwPGFueSwgVmVjdG9yQ2xvY2s+KCk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlciA9IG5ldyBBcnJheTxbYW55LCBhbnksIFZlY3RvckNsb2NrXT4oKTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5PG15TWVzc2FnZT4oKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkID0gbmV3IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+KCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8vIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcigncGluZycsIGZ1bmN0aW9uKHBpbmdNZXNzYWdlKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlIGEgcGluZyA6ICcgKyBwaW5nTWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAqIElmIG5vdCwgdGhlbiB3YWl0IGEgY3VzdG9taXplZCB0aW1lIHBlcmlvZCBhbmQgY2hlY2sgYWdhaW4uXG4gICAgICovXG4gICAgc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXk8bXlNZXNzYWdlPigpO1xuXG4gICAgICAgIC8vIFVzZSBoZWFydGJlYXQgdG8ga2VlcCBjbGllbnQgYWxpdmUuXG4gICAgICAgIC8vIHRoaXMuaGVhcnRiZWF0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZSBoZWFydGJlYXQgZnVuY3Rpb24gdG8ga2VlcCBjbGllbnRzIGFsaXZlLlxuICAgICAqIFxuICAgICAqIFRPRE86XG4gICAgICogVGhlIG1lc3NhZ2Ugc2VuZGluZyB0byBzZXJ2ZXIgaXMgJ2hlYXJ0YmVhdCcgcmlnaHQgbm93LlxuICAgICAqIFRoZSB0aW1lb3V0IGludGVydmFsIGlzIHNldCB0byA1MDAwIG1pbGxpb25zZWNvbmRzLlxuICAgICAqL1xuICAgIC8vIGhlYXJ0YmVhdCgpIDogdm9pZCB7XG4gICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICAgICAgdGhpcy53cy5zZW5kKCdoZWFydGJlYXQnKTtcbiAgICAvLyAgICAgICAgIHRoaXMuaGVhcnRiZWF0KCk7XG4gICAgLy8gICAgIH0sIDUwMDApO1xuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgaW50byBteU1lc3NhZ2UgdHlwZS5cbiAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBhbGwgdGhlIG1lc3NhZ2VzIGFuZCBkZWxpdmVyIHRvIGFwcGxpY2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAqL1xuICAgIHJlY2VpdmVBY3Rpb24gPSAoZGF0YSA6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gdGhpcy5wYXJzZUpTT04oZGF0YS5kYXRhKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuY3JkdElkLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHRJZCBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3JkdElkKGNyZHRJZCA6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBjcmR0SWQ6IFwiICsgY3JkdElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyBWZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHQgd2l0aCBpdHMgSUQgYW5kIGNvcnJlc3BvbmRpbmcgbWVzc2FnZVxuICAgICAqIGxpc3RlbmVyIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdE1lc3NhZ2VMaXN0ZW5lciB0aGUgbWVzc2FnZSBsaXN0ZW5lciBvZiBlYWNoIGNyZHQuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgSUQgb2YgZWFjaCBjcmR0LlxuICAgICAqXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lcjogQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc0J5SWQuaGFzKGNyZHRJZCkgfHwgdGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBmdW5jdGlvbiBvbiBjYXN1YWxicm9hZGNhc3QgbmV0d29yayBsYXllciwgd2hpY2ggY2FsbGVkXG4gICAgICogYnkgY3JkdCdzIHJ1bnRpbWUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBpcyB3cmFwcGVkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdGltZXN0YW1wIChiYXNpYyBzZW5kZXIgbm9kZVxuICAgICAqIGluZm8gYW5kIHZlY3RvciBjbG9jaykuXG4gICAgICpcbiAgICAgKiBVc2luZyBXZWJTb2NrZXQgYXMgbmV0d29yayB0cmFuc21pc3Npb24gcHJvdG9jb2wuXG4gICAgICogVXNpbmcgSlNPTiBmb3JtYXQgYXMgbWVzc2FnZSB0eXBlLlxuICAgICAqXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIG5vdCBPcGVuLCB0aGVuIGJ1ZmZlciB0aGUgbWVzc2FnZSBhbmRcbiAgICAgKiB3YWl0IHVudGlsIFdlYlNvY2tldCBvcGVuLlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBPcGVuLCB0aGVuIHNlbmQgaXQgd2l0aCB3cy5zZW5kKCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgY3JkdCB1cGRhdGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSB1bmlxdWUgSUQgZm9yIGVhY2ggY3JkdC5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UgOiBhbnksIGNyZHRJZCA6IGFueSkgOiB2b2lke1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3JkdElkIGV4aXN0IGluIHRoZSBtYXAuXG4gICAgICAgIGlmICh0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpIS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpIS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrIGZvciBzZW5kaW5nXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4odGhpcy52Y01hcC5nZXQoY3JkdElkKT8uYXNWZWN0b3JDbG9jaygpISk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGNyZHRJZCwgdmNDb3B5ISk7XG5cbiAgICAgICAgLy8gQ29udmVydCB0aGUgbWVzc2FnZSBpbnRvIEpTT05cbiAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKG15UGFja2FnZS50b0pTT04oKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChteVBhY2thZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmV4dCB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGNyZHRJZCBpbiB0aGlzIHJlcGxpY2EuXG4gICAgICogXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICogXG4gICAgICovXG4gICAgZ2V0TmV4dFRpbWVzdGFtcChjcmR0SWQ6IGFueSkgOiBDYXVzYWxUaW1lc3RhbXAge1xuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jay4gIFxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KHRoaXMudmNNYXAuZ2V0KGNyZHRJZCk/LmFzVmVjdG9yQ2xvY2soKSEpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuIFxuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgdmNDb3B5LnZlY3Rvck1hcC5nZXQodGhpcy51aWQpIGFzIG51bWJlciArIDEpO1xuXG4gICAgICAgIHJldHVybiB2Y0NvcHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayB0byBjdXN0b21pemVkIGRhdGEgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHRyYXZlbCB0aHJvdWdoIG5ldHdvcmsuXG4gICAgICogQHJldHVybnMgdGhlIGN1c3RvbWl6ZWQgZGF0YSB0eXBlID0+IG15TWVzc2FnZVxuICAgICAqL1xuICAgIHBhcnNlSlNPTihkYXRhIDogc3RyaW5nKSA6IG15TWVzc2FnZSB7XG4gICAgICAgIGxldCBkYXRhSlNPTiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGxldCB2YyA9IG5ldyBWZWN0b3JDbG9jayhkYXRhSlNPTi50aW1lc3RhbXAudWlkKTtcbiAgICAgICAgdmMudmVjdG9yTWFwID0gbmV3IE1hcChkYXRhSlNPTi50aW1lc3RhbXAudmVjdG9yTWFwKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UoZGF0YUpTT04ubWVzc2FnZSwgZGF0YUpTT04uY3JkdElkLCB2Yyk7XG5cbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmcgXG4gICAgICogY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBjaGVja01lc3NhZ2VCdWZmZXIoKSA6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcblxuICAgICAgICB3aGlsZShpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgY3VyQ3JkdElkID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXTtcbiAgICAgICAgICAgIGxldCBjdXJWZWN0b3JDbG9jayA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl07XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52Y01hcC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlWZWN0b3JDbG9jayA9IHRoaXMudmNNYXAuZ2V0KGN1ckNyZHRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKG15VmVjdG9yQ2xvY2s/LmlzcmVhZHkoY3VyVmVjdG9yQ2xvY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBTZW5kIGJhY2sgdGhlIHJlY2VpdmVkIG1lc3NhZ2VzIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLmdldChjdXJDcmR0SWQpPy5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENhdXNhbFRpbWVzdGFtcCB9IGZyb20gJy4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2UnO1xuXG4vLyBUaGUgdmVjdG9yIGNsb2NrIGRlc2lnbmVkIGZvciBDUkRUIGxpYnJhcnkgYW5kIGNhc3VhbCBicm9hZGNhc3Rpbmdcbi8vIHJ1bnRpbWUgdG8gZW5zdXJlIGNvcnJlY3QgY2F1c2FsaXR5LlxuXG4vKipcbiAqIFRoZSB2ZWN0b3IgY2xvY2sgY2xhc3MgZm9yIGVuc3VyaW5nIGNhc3VhbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZlY3RvckNsb2NrIGltcGxlbWVudHMgQ2F1c2FsVGltZXN0YW1we1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBJRCBmb3IgZWFjaCByZXBsaWNhIHRvIGlkZW50aWZ5IGl0c2VsZihyZXBsaWNhSWQpLlxuICAgICAqLyAgICBcbiAgICB1aWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVGhlIHJlY29yZCBtYXAgZnJvbSByZXBsaWNhIGlkcyB0byB0aGUgbnVtYmVyIG9mIGxhc3Rlc3QgbWVzc2FnZS5cbiAgICAgKi9cbiAgICB2ZWN0b3JNYXAgOiBNYXA8YW55LCBudW1iZXI+O1xuXG4gICAgLyoqIFxuICAgICAqIEluaXRpYWxpemUgdGhlIHZlY3RvciB3aXRoIHJlcGxpY2EncyBvd24gZW50cnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkIDogYW55KSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVwbGljYShyZXBsaWNhSWQpLlxuICAgICAqL1xuICAgIGdldFNlbmRlcigpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmVjdG9yIGNsb2NrIHdpdGggYWxsIHRoZSBlbnRyaWVzLlxuICAgICAqL1xuICAgIGFzVmVjdG9yQ2xvY2soKSA6IE1hcDxhbnksIG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpbiBcbiAgICAgKiB0aGlzIHZlY3RvcmNsb2NrLlxuICAgICAqL1xuICAgIGdldFNlbmRlckNvdW50ZXIoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpITtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiByZXBsaWNhcyBpbnZvdmxlZCBpbiB0aGlzIGNyZHRzLlxuICAgICAqL1xuICAgIGdldFNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZlY3RvciBvZiB0aGUgdWlkKHJlcGxpY2FJZCkgZW50cnkuXG4gICAgICovXG4gICAgaW5jcmVtZW50KCkgOiB2b2lkIHsgXG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcblxuICAgICAgICBpZihvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgb2xkVmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBhIG1lc3NhZ2Ugd2l0aCBhIGNlcnRhaW4gdGltZXN0YW1wIGlzIHJlYWR5IGZvciBkZWxpdmVyeSBcbiAgICAgKiB0byBlbnN1cmUgY29ycmVjdCBjYXN1YWxpdHkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMgOiBWZWN0b3JDbG9jaykgOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuaGFzKG90aGVyVWlkKSkgeyBcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpISAtIDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSEgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkgeyAgXG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkhIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICogXG4gICAgICogVGhpcyBvcGVyYXRpb24gaXMgbWFpbmx5IGRvbmUgYWZ0ZXIgY29ycmVjdGx5IGRlbGl2ZXIgdGhlIG1lc3NhZ2VcbiAgICAgKiB3aGVuIGlzUmVhZHkoKSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgaW5jcmVtZW50U2VuZGVyKHZjIDogVmVjdG9yQ2xvY2spIDogdm9pZCB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG5cbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KG90aGVyVWlkLCBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpISk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIGN1cnJlbnQgVmVjdG9yQ2xvY2sgd2l0aCB0aGUgdmVjdG9yIGNsb2NrIHJlY2V2aWVkIGZyb20gXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBtZXJnZSh2YyA6IFZlY3RvckNsb2NrKSA6IHZvaWR7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIE1hdGgubWF4KHRoaXMudmVjdG9yTWFwLmdldChpZCkhLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzb21lVWlkIHRoZSByZXBsaWNhJ3MgdWlkLlxuICAgICAqIEBwYXJhbSBjbG9ja1ZhbHVlIHRoZSBjbG9jayBudW1iZXIgb2YgdGhlIHJlcGxpY2EuXG4gICAgICovXG4gICAgc2V0RW50cnkoc29tZVVpZCA6IGFueSwgY2xvY2tWYWx1ZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQgeyBDb3VudGVyQ3JkdCwgTXVsdFJlZ2lzdGVyQ3JkdCwgR1NldENyZHQsIE11bHRpVmFsdWVSZWdpc3RlciB9IGZyb20gXCIuLi8uLi9zcmMvY3JkdHMvYmFzaWNfY3JkdHNcIjtcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdENvdW50ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0Q291bnRlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlQ291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGFkZGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iQ291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBib2IpO1xuICAgIGJvYkNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGFkZGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUNvdW50ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkNvdW50ZXIuYWRkKC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAtMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIC0xKTtcblxuICAgIGFsaWNlQ291bnRlci52YWx1ZSA9IDExO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDExKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMTEpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RcbiAgICBhbGljZUNvdW50ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDEzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMTEpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDEzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNik7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA4KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgOCk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE11bHRSZWdpc3RlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNdWx0UmVnaXN0ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZVJlZ2lzdGVyID0gbmV3IE11bHRSZWdpc3RlckNyZHQoXCJtdWx0SWRcIiwgYWxpY2UsIDIpO1xuICAgIGFsaWNlUmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgbXVsdGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iUmVnaXN0ZXIgPSBuZXcgTXVsdFJlZ2lzdGVyQ3JkdChcIm11bHRJZFwiLCBib2IsIDIpO1xuICAgIGJvYlJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBtdWx0ZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDIpO1xuXG4gICAgYWxpY2VSZWdpc3Rlci5tdWx0KDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDYpO1xuXG4gICAgYm9iUmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIC0yNCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAtMjQpO1xuXG4gICAgYWxpY2VSZWdpc3Rlci52YWx1ZSA9IDExO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAxMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlUmVnaXN0ZXIubXVsdCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMjIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMTEpO1xuXG4gICAgYm9iUmVnaXN0ZXIubXVsdCgtOCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDIyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC04OCk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgLTE3Nik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAtMTc2KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0R1NldCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RHU2V0KCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VHU2V0ID0gbmV3IEdTZXRDcmR0KFwiZ3NldElkXCIsIGFsaWNlKTtcbiAgICBhbGljZUdTZXQub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JHU2V0ID0gbmV3IEdTZXRDcmR0KFwiZ3NldElkXCIsIGJvYik7XG4gICAgYm9iR1NldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoKSk7XG5cbiAgICBhbGljZUdTZXQuYWRkKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG5cbiAgICBib2JHU2V0LmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG5cbiAgICBhbGljZUdTZXQuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VHU2V0LmFkZChcImZpcnN0XCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuXG4gICAgYm9iR1NldC5hZGQoXCJzZWNvbmRcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RNdnIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0TXZyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VNdnIgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oXCJtdnJJZFwiLCBhbGljZSwgXCJpbml0aWFsXCIpO1xuICAgIGFsaWNlTXZyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGxldCBib2JNdnIgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oXCJtdnJJZFwiLCBib2IsIFwiaW5pdGlhbFwiKTtcbiAgICBib2JNdnIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJpbml0aWFsXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJpbml0aWFsXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwic2Vjb25kXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wic2Vjb25kXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwidGhpcmRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1widGhpcmRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInRoaXJkXCJdKSk7XG5cbiAgICBib2JNdnIudmFsdWUgPSBcImJvYidzXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImJvYidzXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJib2Inc1wiXSkpO1xuXG4gICAgLy8gQ29uY3VycmVudCB0ZXN0XG4gICAgYWxpY2VNdnIudmFsdWUgPSBcImNvbmNBXCI7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJjb25jQlwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQVwiLCBcImNvbmNCXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQlwiLCBcImNvbmNBXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwiY29uY0EyXCI7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNBMlwiXSkpO1xuICAgIGJvYk12ci52YWx1ZSA9IFwiY29uY0IyXCI7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQjJcIl0pKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY0EyXCIsIFwiY29uY0IyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQjJcIiwgXCJjb25jQTJcIl0pKTtcblxuICAgIC8vIE11bHRpcGxlIGFkZHMgYXJlIHJlZHVuZGFudCwgdW5sZXNzIHRoZXkncmUgb3ZlcndyaXR0ZW5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwicmVkdW5kYW50XCI7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wicmVkdW5kYW50XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJvdmVyd3JpdGVcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wicmVkdW5kYW50XCIsIFwib3ZlcndyaXRlXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIiwgXCJvdmVyd3JpdGVcIl0pKTtcblxuICAgIC8vIFJlc2V0IHRlc3RcbiAgICBhbGljZU12ci5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldCgpKTtcbiAgICBib2JNdnIudmFsdWUgPSBcImNvbmNcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY1wiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY1wiXSkpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdENvdW50ZXIoKTtcbnRlc3RNdWx0UmVnaXN0ZXIoKTtcbnRlc3RHU2V0KCk7XG50ZXN0TXZyKCk7XG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5mdW5jdGlvbiBpc1N1cGVyc2V0PFQ+KHNldDogU2V0PFQ+LCBzdWJzZXQ6IFNldDxUPikge1xuICAgIGZvciAobGV0IGVsZW0gb2Ygc3Vic2V0KSB7XG4gICAgICAgIGlmICghc2V0LmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIHNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIHJldHVybiBpc1N1cGVyc2V0KHNldDEsIHNldDIpICYmIGlzU3VwZXJzZXQoc2V0Miwgc2V0MSk7XG59XG5mdW5jdGlvbiBhc3NlcnRTZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICBpZighc2V0RXF1YWxzKHNldDEsIHNldDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEVxdWFscyBmYWlsZWQsIGFjdHVhbDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDEudmFsdWVzKCldKSArIFwiLCBleHBlY3RlZDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDIudmFsdWVzKCldKSk7XG4gICAgfVxuICAgIGFzc2VydChzZXRFcXVhbHMoc2V0MSwgc2V0MikpO1xufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7IEpzb25DcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL2pzb24nO1xuaW1wb3J0IHsgSW50UmVnaXN0ZXJDcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkJztcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdEpzb25NYXBGZWF0dXJlcygpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RKc29uTWFwRmVhdHVyZXMoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uTWFwXCIsIGFsaWNlKTtcbiAgICBsZXQgYm9iSnNvbiA9IG5ldyBKc29uQ3JkdChcImpzb25NYXBcIiwgYm9iKTtcblxuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG5cbiAgICAvLyBJbml0cyBnbyB0aHJvdWdoXG4gICAgYWxpY2VKc29uLmluaXQoXCJ0ZXN0XCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0KGFsaWNlSnNvbi5oYXMoXCJ0ZXN0XCIsIDApKTtcbiAgICBhc3NlcnQoYm9iSnNvbi5oYXMoXCJ0ZXN0XCIsIDApKTtcblxuICAgIGxldCBhbGljZVRlc3QgPSBhbGljZUpzb24uZ2V0KFwidGVzdFwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGFsaWNlVGVzdCk7XG4gICAgbGV0IGJvYlRlc3QgPSBib2JKc29uLmdldChcInRlc3RcIiwgMCkgYXMgSW50UmVnaXN0ZXJDcmR0O1xuICAgIGFzc2VydChib2JUZXN0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgMCk7XG5cbiAgICAvLyBWYWx1ZSBvcHMgd29ya1xuICAgIGFsaWNlVGVzdC5hZGQoMyk7XG4gICAgYm9iVGVzdC5hZGQoNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlVGVzdC52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlRlc3QudmFsdWUsIDcpO1xuXG4gICAgLy8gRGVsZXRlIHdvcmtzXG4gICAgYm9iSnNvbi5kZWxldGUoXCJ0ZXN0XCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0KGFsaWNlSnNvbi5nZXQoXCJ0ZXN0XCIsIDApID09PSB1bmRlZmluZWQpO1xuICAgIGFzc2VydChib2JKc29uLmdldChcInRlc3RcIiwgMCkgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBhbGljZUpzb24uaW5pdChcInJlZ2lzdGVyXCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcblxuICAgIC8vIENvbmN1cnJlbnQgb3BlcmF0aW9uIHJldml2ZXMga2V5XG4gICAgbGV0IGJvYlJlZ2lzdGVyID0gYm9iSnNvbi5nZXQoXCJyZWdpc3RlclwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VKc29uLmRlbGV0ZShcInJlZ2lzdGVyXCIsIDApO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZUpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoKGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQpLnZhbHVlLCAzKTtcblxuICAgIC8vIC8vIFJlc2V0IHRlc3RzXG4gICAgLy8gLy8gQ29uY3VycmVudCBvcCByZXZpdmVzXG4gICAgLy8gbGV0IGFsaWNlUmVnaXN0ZXIgPSBhbGljZUpzb24uZ2V0KFwicmVnaXN0ZXJcIikgYXMgSW50UmVnaXN0ZXJDcmR0O1xuICAgIC8vIGFsaWNlSnNvbi5yZXNldCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSwgdW5kZWZpbmVkKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgLy8gYm9iUmVnaXN0ZXIuYWRkKDUpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgNSk7XG4gICAgLy9cbiAgICAvLyAvLyBDYXVzYWxseSBsYXRlciBvcCByZXZpdmVzXG4gICAgLy8gYm9iSnNvbi5yZXNldCgpO1xuICAgIC8vIGJvYlJlZ2lzdGVyLmFkZCg3KTtcbiAgICAvLyBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZUpzb24ua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIC8vIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgNyk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIsIGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gVE9ETzogc3Ryb25nIGRlbGV0ZSwgc3Ryb25nIHJlc2V0cywgbmVzdGluZz9cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SnNvbkNvbnZlcnNpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0SnNvbk1hcEZlYXR1cmVzKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VKc29uID0gbmV3IEpzb25DcmR0KFwianNvbjJcIiwgYWxpY2UpO1xuICAgIGxldCBib2JKc29uID0gbmV3IEpzb25DcmR0KFwianNvbjJcIiwgYm9iKTtcblxuICAgIGxldCB0ZXN0T2JqID0ge1xuICAgICAgICBcInRvcGljXCI6IFwiZ2FtZXNcIixcbiAgICAgICAgXCJyZXZpZXdzXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtb25vcG9seVwiLCBcInJhdGluZ1wiOiA3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWZlXCIsIFwicmF0aW5nXCI6IDZ9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIGxldCBuZXN0ZWRPYmogPSB7XG4gICAgICAgIFwidG9waWNcIjogXCJuZXN0aW5nXCIsXG4gICAgICAgIFwibmVzdGVkXCI6IHRlc3RPYmpcbiAgICB9O1xuICAgIGFsaWNlSnNvbi52YWx1ZSA9IG5lc3RlZE9iajtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhcImFsaWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgY29uc29sZS5sb2coXCJib2I6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZUpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYkpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcblxuICAgIGJvYkpzb24uc2V0VmFsdWUoXCJmbGFnXCIsIHRydWUpO1xuICAgIChuZXN0ZWRPYmogYXMgYW55KS5mbGFnID0gdHJ1ZTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhcImFsaWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgY29uc29sZS5sb2coXCJib2I6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZUpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYkpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcblxuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbnRlc3RKc29uTWFwRmVhdHVyZXMoKTtcbnRlc3RKc29uQ29udmVyc2lvbigpO1xuXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1NldFxuZnVuY3Rpb24gaXNTdXBlcnNldDxUPihzZXQ6IFNldDxUPiwgc3Vic2V0OiBTZXQ8VD4pIHtcbiAgICBmb3IgKGxldCBlbGVtIG9mIHN1YnNldCkge1xuICAgICAgICBpZiAoIXNldC5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5mdW5jdGlvbiBzZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICByZXR1cm4gaXNTdXBlcnNldChzZXQxLCBzZXQyKSAmJiBpc1N1cGVyc2V0KHNldDIsIHNldDEpO1xufVxuZnVuY3Rpb24gYXNzZXJ0U2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgaWYoIXNldEVxdWFscyhzZXQxLCBzZXQyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXRFcXVhbHMgZmFpbGVkLCBhY3R1YWw6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQxLnZhbHVlcygpXSkgKyBcIiwgZXhwZWN0ZWQ6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQyLnZhbHVlcygpXSkpO1xuICAgIH1cbiAgICBhc3NlcnQoc2V0RXF1YWxzKHNldDEsIHNldDIpKTtcbn1cbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQge0ludFJlZ2lzdGVyQ3JkdH0gZnJvbSBcIi4uLy4uL3NyYy9jcmR0cy9zdGFuZGFyZFwiO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKSB7XG4gICAgLy8gVGVzdCBEZWZhdWx0UmVzZXR0YWJsZUNyZHQgYnkgdGVzdGluZyBJbnRSZWdpc3RlckNyZHQnc1xuICAgIC8vIGFkZCBhbmQgcmVzZXQgb3BlcmF0aW9ucywgc2luY2UgaXQncyBhIHNpbXBsZSBleGFtcGxlLlxuICAgIGNvbnNvbGUubG9nKFwidGVzdFJlc2V0dGFibGVDb3VudGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VDb3VudGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcInJlc2V0dGFibGVDb3VudGVySWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlQ291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JDb3VudGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcInJlc2V0dGFibGVDb3VudGVySWRcIiwgYm9iKTtcbiAgICBib2JDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIC0xKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgLTEpO1xuXG4gICAgYWxpY2VDb3VudGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlQ291bnRlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA2KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDgpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA4KTtcblxuICAgIC8vIE9ic2VydmVkIHJlc2V0IHRlc3RzXG4gICAgYWxpY2VDb3VudGVyLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYm9iQ291bnRlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gQ29uY3VycmVudCBhZGQgc2hvdWxkIHN1cnZpdmVcbiAgICBhbGljZUNvdW50ZXIucmVzZXQoKTtcbiAgICBib2JDb3VudGVyLmFkZCgxMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMCk7XG5cbiAgICAvLyBSZXNldC13aW5zIHRlc3RzXG4gICAgYm9iQ291bnRlci5yZXNldFN0cm9uZygpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoNik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDYpO1xuXG4gICAgLy8gQ29uY3VycmVudCBhZGQgc2hvdWxkIG5vdCBzdXJ2aXZlXG4gICAgYWxpY2VDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgYm9iQ291bnRlci5hZGQoMjApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIC8vIExvdHMgb2YgY29uY3VycmVuY3lcbiAgICBhbGljZUNvdW50ZXIuYWRkKDMpO1xuICAgIGJvYkNvdW50ZXIuYWRkKDcpO1xuICAgIGFsaWNlQ291bnRlci5yZXNldCgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZShib2IpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA3KTtcbiAgICBib2JDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdFJlc2V0dGFibGVDb3VudGVyKCk7XG4iLCJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge1Rlc3RpbmdSdW50aW1lR2VuZXJhdG9yfSBmcm9tIFwiLi4vcnVudGltZV9mb3JfdGVzdGluZ1wiO1xuaW1wb3J0IHsgRW5hYmxlV2luc0ZsYWcsIERpc2FibGVXaW5zRmxhZywgSW50UmVnaXN0ZXJDcmR0LCBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQsIEFkZFdpbnNTZXQsIENyZHRPYmplY3QsIE1hcENyZHQsIE9ydGhvZ29uYWxDcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkJztcbmltcG9ydCB7IENyZHRSdW50aW1lIH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRfcnVudGltZV9pbnRlcmZhY2UnO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0RXdGbGFnKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEV3RmxhZygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlRmxhZyA9IG5ldyBFbmFibGVXaW5zRmxhZyhcImV3RmxhZ0lkXCIsIGFsaWNlKTtcbiAgICBhbGljZUZsYWcub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iRmxhZyA9IG5ldyBFbmFibGVXaW5zRmxhZyhcImV3RmxhZ0lkXCIsIGJvYik7XG4gICAgYm9iRmxhZy5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBhbGljZUZsYWcuZW5hYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIGJvYkZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0RHdGbGFnKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdER3RmxhZygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlRmxhZyA9IG5ldyBEaXNhYmxlV2luc0ZsYWcoXCJkd0ZsYWdJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkZsYWcgPSBuZXcgRGlzYWJsZVdpbnNGbGFnKFwiZHdGbGFnSWRcIiwgYm9iKTtcbiAgICBib2JGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBhbGljZUZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGJvYkZsYWcuZW5hYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIGJvYkZsYWcuZGlzYWJsZSgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEludFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEludFJlZ2lzdGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkXCIsIGFsaWNlKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBsZXQgYm9iSW50UmVnaXN0ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZFwiLCBib2IpO1xuICAgIGJvYkludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTEyKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdHNcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCg1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTI1KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTE1KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0RnJvbVBhcGVyKCkge1xuICAgIC8vIFRoZSArL3ggZXhhbXBsZSBmcm9tIHRoZSBmaWd1cmUgaW4gdGhlIHBhcGVyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0RnJvbVBhcGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkMlwiLCBhbGljZSwgMSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQyXCIsIGJvYiwgMSk7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIubXVsdCgyKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgxKTtcbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDMpO1xuICAgIGJvYkludFJlZ2lzdGVyLmFkZCg0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAxNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAxNyk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdFVucmVzZXR0YWJsZUludFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEludFJlZ2lzdGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkM1wiLCBhbGljZSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQzXCIsIGJvYik7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xMik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0c1xuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMjUpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RPcnRob2dvbmFsKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE9ydGhvZ29uYWwoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU9ydGhvZ29uYWwgPSBuZXcgT3J0aG9nb25hbENyZHQoXCJvcnRob2dvbmFsSWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlT3J0aG9nb25hbC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBzZXQgdG8gXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JPcnRob2dvbmFsID0gbmV3IE9ydGhvZ29uYWxDcmR0KFwib3J0aG9nb25hbElkXCIsIGJvYik7XG4gICAgYm9iT3J0aG9nb25hbC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFsxLCBmYWxzZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzEsIGZhbHNlXSk7XG5cbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKDEwKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzExICUgKDIqTWF0aC5QSSksIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMTEgJSAoMipNYXRoLlBJKSwgZmFsc2VdKTtcbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKC0xMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG5cbiAgICBib2JPcnRob2dvbmFsLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWxpY2VPcnRob2dvbmFsLnZhbHVlLCBbMipNYXRoLlBJIC0gMSwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzIqTWF0aC5QSSAtIDEsIHRydWVdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMS41KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgdHJ1ZV0pO1xuXG4gICAgYm9iT3J0aG9nb25hbC5yZWZsZWN0KDAuNSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFswLjUsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMC41LCBmYWxzZV0pO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RzXG4gICAgYWxpY2VPcnRob2dvbmFsLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFswLCBmYWxzZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG5cbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKE1hdGguUEkvMik7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFtNYXRoLlBJLzIsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGJvYk9ydGhvZ29uYWwucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFtNYXRoLlBJLzIsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgdHJ1ZV0pO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFszKk1hdGguUEkvMiwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzMqTWF0aC5QSS8yLCB0cnVlXSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuY2xhc3MgQmlDb3VudGVyIGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD4ge1xuICAgIGE6IEludFJlZ2lzdGVyQ3JkdDtcbiAgICBiOiBJbnRSZWdpc3RlckNyZHQ7XG4gICAgY29uc3RydWN0b3IoY3JkdElkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmEgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiYVwiLCB0aGlzLCAxKTtcbiAgICAgICAgdGhpcy5iID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImJcIiwgdGhpcywgMSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RDcmR0T2JqZWN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdENyZHRPYmplY3QoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUJpID0gbmV3IEJpQ291bnRlcihcImJpSWRcIiwgYWxpY2UpO1xuICAgIGxldCBib2JCaSA9IG5ldyBCaUNvdW50ZXIoXCJiaUlkXCIsIGJvYik7XG5cbiAgICAvLyBEbyB0ZXN0RnJvbVBhcGVyKCkgb24gZWFjaCBjb3VudGVyXG4gICAgYWxpY2VCaS5hLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlIGE6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGJvYkJpLmEub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iIGE6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFsaWNlQmkuYi5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZSBiOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBib2JCaS5iLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYiBiOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAxKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgMSk7XG5cbiAgICBhbGljZUJpLmEubXVsdCgyKTtcbiAgICBhbGljZUJpLmEuYWRkKDEpO1xuICAgIGJvYkJpLmEubXVsdCgzKTtcbiAgICBib2JCaS5hLmFkZCg0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgNyk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAxNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmEudmFsdWUsIDE3KTtcblxuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDEpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlQmkuYi5tdWx0KDIpO1xuICAgIGFsaWNlQmkuYi5hZGQoMSk7XG4gICAgYm9iQmkuYi5tdWx0KDMpO1xuICAgIGJvYkJpLmIuYWRkKDQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDE3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYi52YWx1ZSwgMTcpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEF3U2V0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEF3U2V0KCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VTZXQgPSBuZXcgQWRkV2luc1NldDxzdHJpbmc+KFwiYXdTZXRJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VTZXQub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICtcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGxldCBib2JTZXQgPSBuZXcgQWRkV2luc1NldDxzdHJpbmc+KFwiYXdTZXRJZFwiLCBib2IpO1xuICAgIGJvYlNldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICtcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldCgpKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KCkpO1xuXG4gICAgYWxpY2VTZXQuYWRkKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuXG4gICAgYm9iU2V0LmFkZChcIjdcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuXG4gICAgYWxpY2VTZXQuYWRkKFwiN1wiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlU2V0LmFkZChcImZpcnN0XCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuXG4gICAgYm9iU2V0LmFkZChcInNlY29uZFwiKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIiwgXCJmaXJzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICAvLyBEZWxldGUgdGVzdHMgb24gc2luZ2xlIGVsZW1lbnQgKGNvcHlpbmcgRXdGbGFnIHRlc3RzKVxuICAgIGFsaWNlU2V0LmRlbGV0ZShcImVsZW1lbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBib2JTZXQuZGVsZXRlKFwibm9uZXhpc3RlbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCJjb25jdXJyZW50XCIpO1xuICAgIGFsaWNlU2V0LmRlbGV0ZShcImNvbmN1cnJlbnRcIik7XG4gICAgYm9iU2V0LmFkZChcImNvbmN1cnJlbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiLCBcImNvbmN1cnJlbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiLCBcImNvbmN1cnJlbnRcIl0pKTtcbiAgICAvLyBUT0RPOiB0ZXN0IGRlbGV0ZVN0cm9uZ1xuXG4gICAgLy8gT2JzZXJ2ZWQtcmVzZXQgdGVzdFxuICAgIGJvYlNldC5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoKSk7XG4gICAgYWxpY2VTZXQuYWRkKFwic3Vydml2b3JcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcInN1cnZpdm9yXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJzdXJ2aXZvclwiXSkpO1xuICAgIC8vXG4gICAgLy8gLy8gUmVzZXQtd2lucyB0ZXN0XG4gICAgLy8gYWxpY2VTZXQucmVzZXRTdHJvbmcoKTtcbiAgICAvLyBhbGljZVNldC5hZGQoXCJhbGljZSdzXCIpO1xuICAgIC8vIGJvYlNldC5yZXNldCgpO1xuICAgIC8vIGJvYlNldC5hZGQoXCJib2Inc1wiKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYm9iJ3NcIl0pKTtcbiAgICAvLyBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE1hcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNYXAoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU1hcCA9IG5ldyBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PihcIm1hcFwiLCBhbGljZSxcbiAgICAgICAgICAgIChrZXk6IHN0cmluZywgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT4gbmV3IEludFJlZ2lzdGVyQ3JkdChrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgIGxldCBib2JNYXAgPSBuZXcgTWFwQ3JkdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD4oXCJtYXBcIiwgYm9iLFxuICAgICAgICAgICAgKGtleTogc3RyaW5nLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG5cbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcblxuICAgIC8vIEluaXRzIGdvIHRocm91Z2hcbiAgICBhbGljZU1hcC5pbml0KFwidGVzdFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0KGFsaWNlTWFwLmhhcyhcInRlc3RcIikpO1xuICAgIGFzc2VydChib2JNYXAuaGFzKFwidGVzdFwiKSk7XG5cbiAgICBsZXQgYWxpY2VUZXN0ID0gYWxpY2VNYXAuZ2V0KFwidGVzdFwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGFsaWNlVGVzdCk7XG4gICAgbGV0IGJvYlRlc3QgPSBib2JNYXAuZ2V0KFwidGVzdFwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGJvYlRlc3QpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCAwKTtcblxuICAgIC8vIFZhbHVlIG9wcyB3b3JrXG4gICAgYWxpY2VUZXN0LmFkZCgzKTtcbiAgICBib2JUZXN0LmFkZCg0KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgNyk7XG5cbiAgICAvLyBEZWxldGUgd29ya3NcbiAgICBib2JNYXAuZGVsZXRlKFwidGVzdFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQoYWxpY2VNYXAuZ2V0KFwidGVzdFwiKSA9PT0gdW5kZWZpbmVkKTtcbiAgICBhc3NlcnQoYm9iTWFwLmdldChcInRlc3RcIikgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBhbGljZU1hcC5pbml0KFwicmVnaXN0ZXJcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG5cbiAgICAvLyBDb25jdXJyZW50IG9wZXJhdGlvbiByZXZpdmVzIGtleVxuICAgIGxldCBib2JSZWdpc3RlciA9IGJvYk1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VNYXAuZGVsZXRlKFwicmVnaXN0ZXJcIik7XG4gICAgYm9iUmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKChhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQpLnZhbHVlLCAzKTtcblxuICAgIC8vIFJlc2V0IHRlc3RzXG4gICAgLy8gQ29uY3VycmVudCBvcCByZXZpdmVzXG4gICAgbGV0IGFsaWNlUmVnaXN0ZXIgPSBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VNYXAucmVzZXQoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpLCB1bmRlZmluZWQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoNSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA1KTtcblxuICAgIC8vIENhdXNhbGx5IGxhdGVyIG9wIHJldml2ZXNcbiAgICBib2JNYXAucmVzZXQoKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA3KTtcblxuICAgIC8vIFRPRE86IHN0cm9uZyBkZWxldGUsIHN0cm9uZyByZXNldHMsIG5lc3Rpbmc/XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdEV3RmxhZygpO1xudGVzdER3RmxhZygpO1xudGVzdEludFJlZ2lzdGVyKCk7XG50ZXN0RnJvbVBhcGVyKCk7XG50ZXN0VW5yZXNldHRhYmxlSW50UmVnaXN0ZXIoKTtcbnRlc3RPcnRob2dvbmFsKCk7XG50ZXN0Q3JkdE9iamVjdCgpO1xudGVzdEF3U2V0KCk7XG50ZXN0TWFwKCk7XG5cblxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXRcbmZ1bmN0aW9uIGlzU3VwZXJzZXQ8VD4oc2V0OiBTZXQ8VD4sIHN1YnNldDogU2V0PFQ+KSB7XG4gICAgZm9yIChsZXQgZWxlbSBvZiBzdWJzZXQpIHtcbiAgICAgICAgaWYgKCFzZXQuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuZnVuY3Rpb24gc2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgcmV0dXJuIGlzU3VwZXJzZXQoc2V0MSwgc2V0MikgJiYgaXNTdXBlcnNldChzZXQyLCBzZXQxKTtcbn1cbmZ1bmN0aW9uIGFzc2VydFNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIGlmKCFzZXRFcXVhbHMoc2V0MSwgc2V0MikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0RXF1YWxzIGZhaWxlZCwgYWN0dWFsOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0MS52YWx1ZXMoKV0pICsgXCIsIGV4cGVjdGVkOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0Mi52YWx1ZXMoKV0pKTtcbiAgICB9XG4gICAgYXNzZXJ0KHNldEVxdWFscyhzZXQxLCBzZXQyKSk7XG59XG4iLCJpbXBvcnQge0NyZHRSdW50aW1lLCBDcmR0TWVzc2FnZUxpc3RlbmVyLCBDYXVzYWxUaW1lc3RhbXB9IGZyb20gXCIuLi9zcmMvY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG5jbGFzcyBUZXN0aW5nUnVudGltZSBpbXBsZW1lbnRzIENyZHRSdW50aW1lIHtcbiAgICBsaXN0ZW5lcnNCeUlkID0gbmV3IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+KCk7XG4gICAgdmVjdG9yQ2xvY2sgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2VuZXJhdG9yIDogVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IsXG4gICAgICAgICAgICBwcml2YXRlIHJlcGxpY2FJZCA6IGFueSkge1xuICAgICAgICB0aGlzLnZlY3RvckNsb2NrLnNldChyZXBsaWNhSWQsIDApO1xuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2U6IGFueSwgY3JkdElkOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52ZWN0b3JDbG9jay5zZXQodGhpcy5yZXBsaWNhSWQsIHRoaXMudmVjdG9yQ2xvY2suZ2V0KFxuICAgICAgICAgICAgdGhpcy5yZXBsaWNhSWQpIGFzIG51bWJlciArIDFcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG15UmVwbGljYUlkID0gdGhpcy5yZXBsaWNhSWQ7XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgTWFwKHRoaXMudmVjdG9yQ2xvY2spO1xuICAgICAgICBsZXQgdGltZXN0YW1wID0ge1xuICAgICAgICAgICAgZ2V0U2VuZGVyKCkgeyByZXR1cm4gbXlSZXBsaWNhSWQ7IH0sXG4gICAgICAgICAgICBnZXRTZW5kZXJDb3VudGVyKCkgeyByZXR1cm4gdmNDb3B5LmdldCh0aGlzLmdldFNlbmRlcigpKSBhcyBudW1iZXI7fSxcbiAgICAgICAgICAgIGFzVmVjdG9yQ2xvY2soKSB7IHJldHVybiB2Y0NvcHk7IH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVldWVNYXAgPSB0aGlzLmdlbmVyYXRvci5tZXNzYWdlUXVldWVzLmdldCh0aGlzKSBhc1xuICAgICAgICAgICAgTWFwPFRlc3RpbmdSdW50aW1lLCBBcnJheTxbYW55LCBhbnksIENhdXNhbFRpbWVzdGFtcF0+PjtcbiAgICAgICAgZm9yIChsZXQgcXVldWUgb2YgcXVldWVNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIC8vIFVzZSBkaWZmZXJlbnQgY29waWVzIGZvciBlYWNoIENyZHQsIGluIGNhc2UgdGhleVxuICAgICAgICAgICAgLy8gbW9kaWZ5IG1lc3NhZ2Ugd2hpbGUgcHJvY2Vzc2luZyBpdFxuICAgICAgICAgICAgcXVldWUucHVzaChbSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSksIGNyZHRJZCwgdGltZXN0YW1wXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lcjogQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsaWNhSWQ7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoKSB7XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgTWFwKHRoaXMudmVjdG9yQ2xvY2spO1xuICAgICAgICB2Y0NvcHkuc2V0KHRoaXMucmVwbGljYUlkLCB0aGlzLnZlY3RvckNsb2NrLmdldChcbiAgICAgICAgICAgIHRoaXMucmVwbGljYUlkKSBhcyBudW1iZXIgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGxldCBteVJlcGxpY2FJZCA9IHRoaXMucmVwbGljYUlkO1xuICAgICAgICBsZXQgdGltZXN0YW1wID0ge1xuICAgICAgICAgICAgZ2V0U2VuZGVyKCkgeyByZXR1cm4gbXlSZXBsaWNhSWQ7IH0sXG4gICAgICAgICAgICBnZXRTZW5kZXJDb3VudGVyKCkgeyByZXR1cm4gdmNDb3B5LmdldCh0aGlzLmdldFNlbmRlcigpKSBhcyBudW1iZXI7fSxcbiAgICAgICAgICAgIGFzVmVjdG9yQ2xvY2soKSB7IHJldHVybiB2Y0NvcHk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY29sbGVjdGlvbiBvZiBDcmR0UnVudGltZXMgbGlua2VkIHRvZ2V0aGVyXG4gKiAoaS5lLiwgaW4tbWVtb3J5IG5ldHdvcmtpbmcpIHRoYXQgZGVsaXZlciBtZXNzYWdlc1xuICogd2hlbiByZWxlYXNlIGlzIGNhbGxlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yIHtcbiAgICBuZXdSdW50aW1lKHJlcGxpY2FJZD86IGFueSkgOiBUZXN0aW5nUnVudGltZSB7XG4gICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHVuZGVmaW5lZCkgcmVwbGljYUlkID0gdGhpcy5tZXNzYWdlUXVldWVzLnNpemU7XG4gICAgICAgIGxldCBydW50aW1lID0gbmV3IFRlc3RpbmdSdW50aW1lKHRoaXMsIHJlcGxpY2FJZCk7XG4gICAgICAgIGxldCBuZXdRdWV1ZSA9IG5ldyBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PGFueT4+KCk7XG4gICAgICAgIGZvciAobGV0IG9sZEVudHJ5IG9mIHRoaXMubWVzc2FnZVF1ZXVlcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIG5ld1F1ZXVlLnNldChvbGRFbnRyeVswXSwgW10pO1xuICAgICAgICAgICAgb2xkRW50cnlbMV0uc2V0KHJ1bnRpbWUsIFtdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lc3NhZ2VRdWV1ZXMuc2V0KHJ1bnRpbWUsIG5ld1F1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIE1hcHMgc2VuZGVyIGFuZCByZWNpcGllbnQgdG8gYW4gYXJyYXkgb2YgcXVldWVkIFttZXNzYWdlLFxuICAgIC8vIGNyZHRJZCwgdGltZXN0YW1wXSB0dXBsZXMuXG4gICAgbWVzc2FnZVF1ZXVlcyA9IG5ldyBNYXA8VGVzdGluZ1J1bnRpbWUsXG4gICAgICAgIE1hcDxUZXN0aW5nUnVudGltZSwgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPj4+KCk7XG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBhbGwgcXVldWVkIG1lc3NhZ2VzIHNlbmRlciB0byB0aGUgc3BlY2lmaWVkIHJlY2lwaWVudHMuXG4gICAgICogSWYgcmVjaXBpZW50cyBhcmUgbm90IHNwZWNpZmllZCwgcmVsZWFzZXMgdGhlbSB0byBhbGxcbiAgICAgKiByZWNpcGllbnRzLiAgT25seSByZWNpcGllbnRzIHRoYXQgZXhpc3RlZCBhdCB0aGUgdGltZVxuICAgICAqIG9mIHNlbmRpbmcgd2lsbCByZWNlaXZlIGEgbWVzc2FnZS5cbiAgICAgKi9cbiAgICByZWxlYXNlKHNlbmRlcjogVGVzdGluZ1J1bnRpbWUsIC4uLnJlY2lwaWVudHM6IFRlc3RpbmdSdW50aW1lW10pIHtcbiAgICAgICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoID09PSAwKSByZWNpcGllbnRzID0gWy4uLnRoaXMubWVzc2FnZVF1ZXVlcy5rZXlzKCldO1xuICAgICAgICBsZXQgc2VuZGVyTWFwID0gdGhpcy5tZXNzYWdlUXVldWVzLmdldChzZW5kZXIpIGFzXG4gICAgICAgICAgICBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PGFueT4+O1xuICAgICAgICBmb3IgKGxldCByZWNpcGllbnQgb2YgcmVjaXBpZW50cykge1xuICAgICAgICAgICAgaWYgKHJlY2lwaWVudCA9PT0gc2VuZGVyKSBjb250aW51ZTtcbiAgICAgICAgICAgIGZvciAobGV0IG1lc3NhZ2VQYWlyIG9mIChzZW5kZXJNYXAuZ2V0KHJlY2lwaWVudCkgYXMgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPikpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSByZWNpcGllbnQubGlzdGVuZXJzQnlJZC5nZXQoXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYWlyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBDcmR0IHdpdGggaWQgXCIgKyBtZXNzYWdlUGFpclsxXSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBvbiByZXBsaWNhIFwiICsgcmVjaXBpZW50LmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucmVjZWl2ZShtZXNzYWdlUGFpclswXSwgbWVzc2FnZVBhaXJbMl0pO1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudC52ZWN0b3JDbG9jay5zZXQoc2VuZGVyLmdldFJlcGxpY2FJZCgpLCBtZXNzYWdlUGFpclsyXS5nZXRTZW5kZXJDb3VudGVyKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZGVyTWFwLnNldChyZWNpcGllbnQsIFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxlYXNlQWxsKCkge1xuICAgICAgICBmb3IgKGxldCBzZW5kZXIgb2YgdGhpcy5tZXNzYWdlUXVldWVzLmtleXMoKSkgdGhpcy5yZWxlYXNlKHNlbmRlcik7XG4gICAgfVxufVxuIiwiY29uc29sZS5sb2coXCJSdW5uaW5nIHRlc3RzXCIpO1xucmVxdWlyZSgnLi9jcmR0cy9iYXNpY19jcmR0c190ZXN0cycpO1xucmVxdWlyZSgnLi9jcmR0cy9yZXNldHRhYmxlX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL3N0YW5kYXJkX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL2pzb25fdGVzdHMnKTtcblxuXG4vLyBjb25zdCBob3dMb25nVGlsbEx1bmNoID0gcmVxdWlyZSgnLi4nKTtcbi8vXG4vLyBjbGFzcyBNb2NrRGF0ZSB7XG4vLyBcdHByaXZhdGUgZGF0ZSA9IDA7XG4vLyBcdHByaXZhdGUgaG91cnMgPSAwO1xuLy8gXHRwcml2YXRlIG1pbnV0ZXMgPSAwO1xuLy8gXHRwcml2YXRlIHNlY29uZHMgPSAwO1xuLy8gXHRwcml2YXRlIG1pbGxpc2Vjb25kcyA9IDA7XG4vL1xuLy8gXHRnZXREYXRlICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kYXRlOyB9XG4vLyBcdHNldERhdGUgKGRhdGU6IG51bWJlcik6IHZvaWQgeyB0aGlzLmRhdGUgPSBkYXRlOyB9XG4vLyBcdHNldEhvdXJzIChoOiBudW1iZXIpIHsgdGhpcy5ob3VycyA9IGg7IH1cbi8vIFx0c2V0TWludXRlcyAobTogbnVtYmVyKTogdm9pZCB7IHRoaXMubWludXRlcyA9IG07IH1cbi8vIFx0c2V0U2Vjb25kcyAoczogbnVtYmVyKTogdm9pZCB7IHRoaXMuc2Vjb25kcyA9IHM7IH1cbi8vIFx0c2V0TWlsbGlzZWNvbmRzIChtczogbnVtYmVyKTogdm9pZCB7IHRoaXMubWlsbGlzZWNvbmRzID0gbXM7IH1cbi8vIFx0Z2V0VGltZSAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmFsdWVPZigpOyB9XG4vLyBcdHZhbHVlT2YgKCk6IG51bWJlciB7XG4vLyBcdFx0cmV0dXJuIChcbi8vIFx0XHRcdHRoaXMubWlsbGlzZWNvbmRzICtcbi8vIFx0XHRcdHRoaXMuc2Vjb25kcyAqIDFlMyArXG4vLyBcdFx0XHR0aGlzLm1pbnV0ZXMgKiAxZTMgKiA2MCArXG4vLyBcdFx0XHR0aGlzLmhvdXJzICogMWUzICogNjAgKiA2MCArXG4vLyBcdFx0XHR0aGlzLmRhdGUgKiAxZTMgKiA2MCAqIDYwICogMjRcbi8vIFx0XHQpO1xuLy8gXHR9XG4vL1xuLy8gXHRzdGF0aWMgbm93ICgpIHsgcmV0dXJuIG5vdy52YWx1ZU9mKCk7IH1cbi8vIH1cbi8vXG4vLyBjb25zdCBub3cgPSBuZXcgTW9ja0RhdGUoKTtcbi8vXG4vLyBnbG9iYWwuRGF0ZSA9IE1vY2tEYXRlIGFzIGFueSBhcyB0eXBlb2YgRGF0ZTtcbi8vXG4vLyBmdW5jdGlvbiB0ZXN0KGhvdXJzOiBudW1iZXIsIG1pbnV0ZXM6IG51bWJlciwgc2Vjb25kczogbnVtYmVyLCBleHBlY3RlZDogc3RyaW5nKTogdm9pZCB7XG4vLyBcdG5vdy5zZXRIb3Vycyhob3Vycyk7XG4vLyBcdG5vdy5zZXRNaW51dGVzKG1pbnV0ZXMpO1xuLy8gXHRub3cuc2V0U2Vjb25kcyhzZWNvbmRzKTtcbi8vXG4vLyBcdGFzc2VydC5lcXVhbChob3dMb25nVGlsbEx1bmNoKC4uLmx1bmNodGltZSksIGV4cGVjdGVkKTtcbi8vIFx0Y29uc29sZS5sb2coYFxcdTAwMUJbMzJt4pyTXFx1MDAxQlszOW0gJHtleHBlY3RlZH1gKTtcbi8vIH1cbi8vXG4vLyBsZXQgbHVuY2h0aW1lID0gWyAxMiwgMzAgXTtcbi8vIHRlc3QoMTEsIDMwLCAwLCAnMSBob3VyJyk7XG4vLyB0ZXN0KDEwLCAzMCwgMCwgJzIgaG91cnMnKTtcbi8vIHRlc3QoMTIsIDI1LCAwLCAnNSBtaW51dGVzJyk7XG4vLyB0ZXN0KDEyLCAyOSwgMTUsICc0NSBzZWNvbmRzJyk7XG4vLyB0ZXN0KDEzLCAzMCwgMCwgJzIzIGhvdXJzJyk7XG4vL1xuLy8gLy8gc29tZSBvZiB1cyBsaWtlIGFuIGVhcmx5IGx1bmNoXG4vLyBsdW5jaHRpbWUgPSBbIDExLCAwIF07XG4vLyB0ZXN0KDEwLCAzMCwgMCwgJzMwIG1pbnV0ZXMnKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=