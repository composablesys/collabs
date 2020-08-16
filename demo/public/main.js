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
// export default function Compoventuals(hi: string): void {
// }
const basic_crdts_1 = __webpack_require__(/*! ../src/crdts/basic_crdts */ "./src/crdts/basic_crdts.ts");
const crdt_network_runtime_1 = __webpack_require__(/*! ../src/network/crdt_network_runtime */ "./src/network/crdt_network_runtime.ts");
var HOST = location.origin.replace(/^http/, 'ws');
let client = new crdt_network_runtime_1.CrdtNetworkRuntime("client", HOST);
let clientCounter = new basic_crdts_1.CounterCrdt("counterId", client);
var counter = document.getElementById("counter");
document.getElementById("increment").onclick = function () {
    console.log("clicked");
    clientCounter.add(100);
    counter.innerHTML = clientCounter.value.toString();
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvYXNzZXJ0L2Fzc2VydC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy91dGlsL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2Jhc2ljX2NyZHRzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvY3JkdF9jb3JlLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvanNvbi50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL3Jlc2V0dGFibGUudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9zZW1pZGlyZWN0LnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvc3RhbmRhcmQudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvbmV0d29yay9jcmR0X25ldHdvcmtfcnVudGltZS50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL25ldHdvcmsvdmVjdG9yX2Nsb2NrLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL2Jhc2ljX2NyZHRzX3Rlc3RzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL2pzb25fdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvY3JkdHMvcmVzZXR0YWJsZV90ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9zdGFuZGFyZF90ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9ydW50aW1lX2Zvcl90ZXN0aW5nLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkEsOENBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsNERBQWU7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLG1CQUFPLENBQUMsMENBQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixnREFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsMEVBQW9COztBQUUvQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsK0VBQVU7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7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ckMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RDLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUc7UUFDL0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUc7UUFDN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RDLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUc7UUFDL0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUc7UUFDN0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFaEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFH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QUNGLDJDQUEyQztBQUMzQyxJQUFJO0FBQ0osRUFBRTtBQUNGLDhCQUE4QjtBQUM5QixFQUFFO0FBQ0YsZ0RBQWdEO0FBQ2hELEVBQUU7QUFDRiwyRkFBMkY7QUFDM0Ysd0JBQXdCO0FBQ3hCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsRUFBRTtBQUNGLDJEQUEyRDtBQUMzRCxxREFBcUQ7QUFDckQsSUFBSTtBQUNKLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQixFQUFFO0FBQ0Ysb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixpQ0FBaUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4udHNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbi8vIGNvbXBhcmUgYW5kIGlzQnVmZmVyIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvYmxvYi82ODBlOWU1ZTQ4OGYyMmFhYzI3NTk5YTU3ZGM4NDRhNjMxNTkyOGRkL2luZGV4LmpzXG4vLyBvcmlnaW5hbCBub3RpY2U6XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIHggPSBhLmxlbmd0aDtcbiAgdmFyIHkgPSBiLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXTtcbiAgICAgIHkgPSBiW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIGlmICh5IDwgeCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAwO1xufVxuZnVuY3Rpb24gaXNCdWZmZXIoYikge1xuICBpZiAoZ2xvYmFsLkJ1ZmZlciAmJiB0eXBlb2YgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKGIpO1xuICB9XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpO1xufVxuXG4vLyBiYXNlZCBvbiBub2RlIGFzc2VydCwgb3JpZ2luYWwgbm90aWNlOlxuLy8gTkI6IFRoZSBVUkwgdG8gdGhlIENvbW1vbkpTIHNwZWMgaXMga2VwdCBqdXN0IGZvciB0cmFkaXRpb24uXG4vLyAgICAgbm9kZS1hc3NlcnQgaGFzIGV2b2x2ZWQgYSBsb3Qgc2luY2UgdGhlbiwgYm90aCBpbiBBUEkgYW5kIGJlaGF2aW9yLlxuXG4vLyBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Vbml0X1Rlc3RpbmcvMS4wXG4vL1xuLy8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuLy9cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGZ1bmN0aW9uc0hhdmVOYW1lcyA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmb28oKSB7fS5uYW1lID09PSAnZm9vJztcbn0oKSk7XG5mdW5jdGlvbiBwVG9TdHJpbmcgKG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5mdW5jdGlvbiBpc1ZpZXcoYXJyYnVmKSB7XG4gIGlmIChpc0J1ZmZlcihhcnJidWYpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEFycmF5QnVmZmVyLmlzVmlldyhhcnJidWYpO1xuICB9XG4gIGlmICghYXJyYnVmKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChhcnJidWYgaW5zdGFuY2VvZiBEYXRhVmlldykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChhcnJidWYuYnVmZmVyICYmIGFycmJ1Zi5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8vIDEuIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcblxuLy8gMi4gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gYXNzZXJ0LlxuLy8gbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7IG1lc3NhZ2U6IG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pXG5cbnZhciByZWdleCA9IC9cXHMqZnVuY3Rpb25cXHMrKFteXFwoXFxzXSopXFxzKi87XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL2Z1bmN0aW9uLnByb3RvdHlwZS5uYW1lL2Jsb2IvYWRlZWVlYzhiZmNjNjA2OGIxODdkN2Q5ZmIzZDViYjFkM2EzMDg5OS9pbXBsZW1lbnRhdGlvbi5qc1xuZnVuY3Rpb24gZ2V0TmFtZShmdW5jKSB7XG4gIGlmICghdXRpbC5pc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMpIHtcbiAgICByZXR1cm4gZnVuYy5uYW1lO1xuICB9XG4gIHZhciBzdHIgPSBmdW5jLnRvU3RyaW5nKCk7XG4gIHZhciBtYXRjaCA9IHN0ci5tYXRjaChyZWdleCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXTtcbn1cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgdGhpcy5hY3R1YWwgPSBvcHRpb25zLmFjdHVhbDtcbiAgdGhpcy5leHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yO1xuICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWVzc2FnZSA9IGdldE1lc3NhZ2UodGhpcyk7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuICB2YXIgc3RhY2tTdGFydEZ1bmN0aW9uID0gb3B0aW9ucy5zdGFja1N0YXJ0RnVuY3Rpb24gfHwgZmFpbDtcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBub24gdjggYnJvd3NlcnMgc28gd2UgY2FuIGhhdmUgYSBzdGFja3RyYWNlXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlmIChlcnIuc3RhY2spIHtcbiAgICAgIHZhciBvdXQgPSBlcnIuc3RhY2s7XG5cbiAgICAgIC8vIHRyeSB0byBzdHJpcCB1c2VsZXNzIGZyYW1lc1xuICAgICAgdmFyIGZuX25hbWUgPSBnZXROYW1lKHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgbG9jYXRlZCB0aGUgZnVuY3Rpb24gZnJhbWVcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcbiAgICAgICAgdmFyIG5leHRfbGluZSA9IG91dC5pbmRleE9mKCdcXG4nLCBpZHggKyAxKTtcbiAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyhuZXh0X2xpbmUgKyAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFjayA9IG91dDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFzc2VydC5Bc3NlcnRpb25FcnJvciBpbnN0YW5jZW9mIEVycm9yXG51dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShzLCBuKSB7XG4gIGlmICh0eXBlb2YgcyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn1cbmZ1bmN0aW9uIGluc3BlY3Qoc29tZXRoaW5nKSB7XG4gIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMgfHwgIXV0aWwuaXNGdW5jdGlvbihzb21ldGhpbmcpKSB7XG4gICAgcmV0dXJuIHV0aWwuaW5zcGVjdChzb21ldGhpbmcpO1xuICB9XG4gIHZhciByYXduYW1lID0gZ2V0TmFtZShzb21ldGhpbmcpO1xuICB2YXIgbmFtZSA9IHJhd25hbWUgPyAnOiAnICsgcmF3bmFtZSA6ICcnO1xuICByZXR1cm4gJ1tGdW5jdGlvbicgKyAgbmFtZSArICddJztcbn1cbmZ1bmN0aW9uIGdldE1lc3NhZ2Uoc2VsZikge1xuICByZXR1cm4gdHJ1bmNhdGUoaW5zcGVjdChzZWxmLmFjdHVhbCksIDEyOCkgKyAnICcgK1xuICAgICAgICAgc2VsZi5vcGVyYXRvciArICcgJyArXG4gICAgICAgICB0cnVuY2F0ZShpbnNwZWN0KHNlbGYuZXhwZWN0ZWQpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBmYWxzZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwRXF1YWwnLCBhc3NlcnQuZGVlcEVxdWFsKTtcbiAgfVxufTtcblxuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIGRlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBTdHJpY3RFcXVhbCcsIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHN0cmljdCwgbWVtb3MpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNCdWZmZXIoYWN0dWFsKSAmJiBpc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gY29tcGFyZShhY3R1YWwsIGV4cGVjdGVkKSA9PT0gMDtcblxuICAvLyA3LjIuIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIERhdGUgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIERhdGUgb2JqZWN0IHRoYXQgcmVmZXJzIHRvIHRoZSBzYW1lIHRpbWUuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0RhdGUoYWN0dWFsKSAmJiB1dGlsLmlzRGF0ZShleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMyBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIFJlZ0V4cCBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzb3VyY2UgYW5kXG4gIC8vIHByb3BlcnRpZXMgKGBnbG9iYWxgLCBgbXVsdGlsaW5lYCwgYGxhc3RJbmRleGAsIGBpZ25vcmVDYXNlYCkuXG4gIH0gZWxzZSBpZiAodXRpbC5pc1JlZ0V4cChhY3R1YWwpICYmIHV0aWwuaXNSZWdFeHAoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5zb3VyY2UgPT09IGV4cGVjdGVkLnNvdXJjZSAmJlxuICAgICAgICAgICBhY3R1YWwuZ2xvYmFsID09PSBleHBlY3RlZC5nbG9iYWwgJiZcbiAgICAgICAgICAgYWN0dWFsLm11bHRpbGluZSA9PT0gZXhwZWN0ZWQubXVsdGlsaW5lICYmXG4gICAgICAgICAgIGFjdHVhbC5sYXN0SW5kZXggPT09IGV4cGVjdGVkLmxhc3RJbmRleCAmJlxuICAgICAgICAgICBhY3R1YWwuaWdub3JlQ2FzZSA9PT0gZXhwZWN0ZWQuaWdub3JlQ2FzZTtcblxuICAvLyA3LjQuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoKGFjdHVhbCA9PT0gbnVsbCB8fCB0eXBlb2YgYWN0dWFsICE9PSAnb2JqZWN0JykgJiZcbiAgICAgICAgICAgICAoZXhwZWN0ZWQgPT09IG51bGwgfHwgdHlwZW9mIGV4cGVjdGVkICE9PSAnb2JqZWN0JykpIHtcbiAgICByZXR1cm4gc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyBJZiBib3RoIHZhbHVlcyBhcmUgaW5zdGFuY2VzIG9mIHR5cGVkIGFycmF5cywgd3JhcCB0aGVpciB1bmRlcmx5aW5nXG4gIC8vIEFycmF5QnVmZmVycyBpbiBhIEJ1ZmZlciBlYWNoIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG4gIC8vIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoZSBhcnJheXMgdG8gaGF2ZSB0aGUgc2FtZSB0eXBlIGFzIGNoZWNrZWQgYnlcbiAgLy8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAoYWthIHBUb1N0cmluZykuIE5ldmVyIHBlcmZvcm0gYmluYXJ5XG4gIC8vIGNvbXBhcmlzb25zIGZvciBGbG9hdCpBcnJheXMsIHRob3VnaCwgc2luY2UgZS5nLiArMCA9PT0gLTAgYnV0IHRoZWlyXG4gIC8vIGJpdCBwYXR0ZXJucyBhcmUgbm90IGlkZW50aWNhbC5cbiAgfSBlbHNlIGlmIChpc1ZpZXcoYWN0dWFsKSAmJiBpc1ZpZXcoZXhwZWN0ZWQpICYmXG4gICAgICAgICAgICAgcFRvU3RyaW5nKGFjdHVhbCkgPT09IHBUb1N0cmluZyhleHBlY3RlZCkgJiZcbiAgICAgICAgICAgICAhKGFjdHVhbCBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSB8fFxuICAgICAgICAgICAgICAgYWN0dWFsIGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5KSkge1xuICAgIHJldHVybiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGFjdHVhbC5idWZmZXIpLFxuICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGV4cGVjdGVkLmJ1ZmZlcikpID09PSAwO1xuXG4gIC8vIDcuNSBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSBpZiAoaXNCdWZmZXIoYWN0dWFsKSAhPT0gaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIG1lbW9zID0gbWVtb3MgfHwge2FjdHVhbDogW10sIGV4cGVjdGVkOiBbXX07XG5cbiAgICB2YXIgYWN0dWFsSW5kZXggPSBtZW1vcy5hY3R1YWwuaW5kZXhPZihhY3R1YWwpO1xuICAgIGlmIChhY3R1YWxJbmRleCAhPT0gLTEpIHtcbiAgICAgIGlmIChhY3R1YWxJbmRleCA9PT0gbWVtb3MuZXhwZWN0ZWQuaW5kZXhPZihleHBlY3RlZCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb3MuYWN0dWFsLnB1c2goYWN0dWFsKTtcbiAgICBtZW1vcy5leHBlY3RlZC5wdXNoKGV4cGVjdGVkKTtcblxuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBzdHJpY3QsIG1lbW9zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBzdHJpY3QsIGFjdHVhbFZpc2l0ZWRPYmplY3RzKSB7XG4gIGlmIChhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGlmIG9uZSBpcyBhIHByaW1pdGl2ZSwgdGhlIG90aGVyIG11c3QgYmUgc2FtZVxuICBpZiAodXRpbC5pc1ByaW1pdGl2ZShhKSB8fCB1dGlsLmlzUHJpbWl0aXZlKGIpKVxuICAgIHJldHVybiBhID09PSBiO1xuICBpZiAoc3RyaWN0ICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihhKSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKTtcbiAgdmFyIGJJc0FyZ3MgPSBpc0FyZ3VtZW50cyhiKTtcbiAgaWYgKChhSXNBcmdzICYmICFiSXNBcmdzKSB8fCAoIWFJc0FyZ3MgJiYgYklzQXJncykpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoYUlzQXJncykge1xuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIF9kZWVwRXF1YWwoYSwgYiwgc3RyaWN0KTtcbiAgfVxuICB2YXIga2EgPSBvYmplY3RLZXlzKGEpO1xuICB2YXIga2IgPSBvYmplY3RLZXlzKGIpO1xuICB2YXIga2V5LCBpO1xuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9PSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIV9kZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIHN0cmljdCwgYWN0dWFsVmlzaXRlZE9iamVjdHMpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyA4LiBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cbi8vIGFzc2VydC5ub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgZmFsc2UpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcEVxdWFsJywgYXNzZXJ0Lm5vdERlZXBFcXVhbCk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWwgPSBub3REZWVwU3RyaWN0RXF1YWw7XG5mdW5jdGlvbiBub3REZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBTdHJpY3RFcXVhbCcsIG5vdERlZXBTdHJpY3RFcXVhbCk7XG4gIH1cbn1cblxuXG4vLyA5LiBUaGUgc3RyaWN0IGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzdHJpY3QgZXF1YWxpdHksIGFzIGRldGVybWluZWQgYnkgPT09LlxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09PScsIGFzc2VydC5zdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDEwLiBUaGUgc3RyaWN0IG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHN0cmljdCBpbmVxdWFsaXR5LCBhc1xuLy8gZGV0ZXJtaW5lZCBieSAhPT0uICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT09JywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuICBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4cGVjdGVkKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSWdub3JlLiAgVGhlIGluc3RhbmNlb2YgY2hlY2sgZG9lc24ndCB3b3JrIGZvciBhcnJvdyBmdW5jdGlvbnMuXG4gIH1cblxuICBpZiAoRXJyb3IuaXNQcm90b3R5cGVPZihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX3RyeUJsb2NrKGJsb2NrKSB7XG4gIHZhciBlcnJvcjtcbiAgdHJ5IHtcbiAgICBibG9jaygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSBlO1xuICB9XG4gIHJldHVybiBlcnJvcjtcbn1cblxuZnVuY3Rpb24gX3Rocm93cyhzaG91bGRUaHJvdywgYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIHZhciBhY3R1YWw7XG5cbiAgaWYgKHR5cGVvZiBibG9jayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYmxvY2tcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgbWVzc2FnZSA9IGV4cGVjdGVkO1xuICAgIGV4cGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIGFjdHVhbCA9IF90cnlCbG9jayhibG9jayk7XG5cbiAgbWVzc2FnZSA9IChleHBlY3RlZCAmJiBleHBlY3RlZC5uYW1lID8gJyAoJyArIGV4cGVjdGVkLm5hbWUgKyAnKS4nIDogJy4nKSArXG4gICAgICAgICAgICAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG4gIGlmIChzaG91bGRUaHJvdyAmJiAhYWN0dWFsKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnTWlzc2luZyBleHBlY3RlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICB2YXIgdXNlclByb3ZpZGVkTWVzc2FnZSA9IHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJztcbiAgdmFyIGlzVW53YW50ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgdXRpbC5pc0Vycm9yKGFjdHVhbCk7XG4gIHZhciBpc1VuZXhwZWN0ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmICFleHBlY3RlZDtcblxuICBpZiAoKGlzVW53YW50ZWRFeGNlcHRpb24gJiZcbiAgICAgIHVzZXJQcm92aWRlZE1lc3NhZ2UgJiZcbiAgICAgIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fFxuICAgICAgaXNVbmV4cGVjdGVkRXhjZXB0aW9uKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnR290IHVud2FudGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICgoc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmIGV4cGVjdGVkICYmXG4gICAgICAhZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8ICghc2hvdWxkVGhyb3cgJiYgYWN0dWFsKSkge1xuICAgIHRocm93IGFjdHVhbDtcbiAgfVxufVxuXG4vLyAxMS4gRXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3I6XG4vLyBhc3NlcnQudGhyb3dzKGJsb2NrLCBFcnJvcl9vcHQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzKHRydWUsIGJsb2NrLCBlcnJvciwgbWVzc2FnZSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cyhmYWxzZSwgYmxvY2ssIGVycm9yLCBtZXNzYWdlKTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHRocm93IGVycjsgfTtcblxuLy8gRXhwb3NlIGEgc3RyaWN0IG9ubHkgdmFyaWFudCBvZiBhc3NlcnRcbmZ1bmN0aW9uIHN0cmljdCh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAoIXZhbHVlKSBmYWlsKHZhbHVlLCB0cnVlLCBtZXNzYWdlLCAnPT0nLCBzdHJpY3QpO1xufVxuYXNzZXJ0LnN0cmljdCA9IG9iamVjdEFzc2lnbihzdHJpY3QsIGFzc2VydCwge1xuICBlcXVhbDogYXNzZXJ0LnN0cmljdEVxdWFsLFxuICBkZWVwRXF1YWw6IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwsXG4gIG5vdEVxdWFsOiBhc3NlcnQubm90U3RyaWN0RXF1YWwsXG4gIG5vdERlZXBFcXVhbDogYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbFxufSk7XG5hc3NlcnQuc3RyaWN0LnN0cmljdCA9IGFzc2VydC5zdHJpY3Q7XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyB8fFxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaikge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB2YXIgZGVzY3JpcHRvcnMgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlc2NyaXB0b3JzW2tleXNbaV1dID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY3JpcHRvcnM7XG4gIH07XG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxudmFyIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sKCd1dGlsLnByb21pc2lmeS5jdXN0b20nKSA6IHVuZGVmaW5lZDtcblxuZXhwb3J0cy5wcm9taXNpZnkgPSBmdW5jdGlvbiBwcm9taXNpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgJiYgb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXSkge1xuICAgIHZhciBmbiA9IG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF07XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwidXRpbC5wcm9taXNpZnkuY3VzdG9tXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZuKCkge1xuICAgIHZhciBwcm9taXNlUmVzb2x2ZSwgcHJvbWlzZVJlamVjdDtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHByb21pc2VSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIHByb21pc2VSZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG5cbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gICAgYXJncy5wdXNoKGZ1bmN0aW9uIChlcnIsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHByb21pc2VSZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihmbiwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICB2YWx1ZTogZm4sIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFxuICAgIGZuLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpXG4gICk7XG59XG5cbmV4cG9ydHMucHJvbWlzaWZ5LmN1c3RvbSA9IGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbFxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeU9uUmVqZWN0ZWQocmVhc29uLCBjYikge1xuICAvLyBgIXJlYXNvbmAgZ3VhcmQgaW5zcGlyZWQgYnkgYmx1ZWJpcmQgKFJlZjogaHR0cHM6Ly9nb28uZ2wvdDVJUzZNKS5cbiAgLy8gQmVjYXVzZSBgbnVsbGAgaXMgYSBzcGVjaWFsIGVycm9yIHZhbHVlIGluIGNhbGxiYWNrcyB3aGljaCBtZWFucyBcIm5vIGVycm9yXG4gIC8vIG9jY3VycmVkXCIsIHdlIGVycm9yLXdyYXAgc28gdGhlIGNhbGxiYWNrIGNvbnN1bWVyIGNhbiBkaXN0aW5ndWlzaCBiZXR3ZWVuXG4gIC8vIFwidGhlIHByb21pc2UgcmVqZWN0ZWQgd2l0aCBudWxsXCIgb3IgXCJ0aGUgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB1bmRlZmluZWRcIi5cbiAgaWYgKCFyZWFzb24pIHtcbiAgICB2YXIgbmV3UmVhc29uID0gbmV3IEVycm9yKCdQcm9taXNlIHdhcyByZWplY3RlZCB3aXRoIGEgZmFsc3kgdmFsdWUnKTtcbiAgICBuZXdSZWFzb24ucmVhc29uID0gcmVhc29uO1xuICAgIHJlYXNvbiA9IG5ld1JlYXNvbjtcbiAgfVxuICByZXR1cm4gY2IocmVhc29uKTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tpZnkob3JpZ2luYWwpIHtcbiAgaWYgKHR5cGVvZiBvcmlnaW5hbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gIH1cblxuICAvLyBXZSBETyBOT1QgcmV0dXJuIHRoZSBwcm9taXNlIGFzIGl0IGdpdmVzIHRoZSB1c2VyIGEgZmFsc2Ugc2Vuc2UgdGhhdFxuICAvLyB0aGUgcHJvbWlzZSBpcyBhY3R1YWxseSBzb21laG93IHJlbGF0ZWQgdG8gdGhlIGNhbGxiYWNrJ3MgZXhlY3V0aW9uXG4gIC8vIGFuZCB0aGF0IHRoZSBjYWxsYmFjayB0aHJvd2luZyB3aWxsIHJlamVjdCB0aGUgcHJvbWlzZS5cbiAgZnVuY3Rpb24gY2FsbGJhY2tpZmllZCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICB2YXIgbWF5YmVDYiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKHR5cGVvZiBtYXliZUNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGFzdCBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1heWJlQ2IuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIC8vIEluIHRydWUgbm9kZSBzdHlsZSB3ZSBwcm9jZXNzIHRoZSBjYWxsYmFjayBvbiBgbmV4dFRpY2tgIHdpdGggYWxsIHRoZVxuICAgIC8vIGltcGxpY2F0aW9ucyAoc3RhY2ssIGB1bmNhdWdodEV4Y2VwdGlvbmAsIGBhc3luY19ob29rc2ApXG4gICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJldCkgeyBwcm9jZXNzLm5leHRUaWNrKGNiLCBudWxsLCByZXQpIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihyZWopIHsgcHJvY2Vzcy5uZXh0VGljayhjYWxsYmFja2lmeU9uUmVqZWN0ZWQsIHJlaiwgY2IpIH0pO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNhbGxiYWNraWZpZWQsIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjYWxsYmFja2lmaWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKSk7XG4gIHJldHVybiBjYWxsYmFja2lmaWVkO1xufVxuZXhwb3J0cy5jYWxsYmFja2lmeSA9IGNhbGxiYWNraWZ5O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IHtDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHtDcmR0SW50ZXJuYWwsIENyZHR9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuXG4vKipcbiAqIE9wZXJhdGlvbnMsIG1lc3NhZ2VzLCBhbmQgZGVzY3JpcHRpb25zIGFyZSBhbGwganVzdCB0aGVcbiAqIG51bWJlciB0byBhZGQvYWRkZWQuXG4gKiBUT0RPOiBvcHRpbWl6ZSBhd2F5IDAgYWRkcz9cbiAqL1xuZXhwb3J0IGNsYXNzIENvdW50ZXJJbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxudW1iZXI+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogbnVtYmVyLCBfc3RhdGU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKyBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IENvdW50ZXJJbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIGNvdW50ZXIgQ1JEVC5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIG51bWJlciB0aGF0IHdhcyBhZGRlZC5cbiAqXG4gKiBXYXJuaW5nOiBhZGRpdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmV4cG9ydCBjbGFzcyBDb3VudGVyQ3JkdCBleHRlbmRzIENyZHQ8bnVtYmVyPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKGlkLCBDb3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG4pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IGFkZC4gIEFzIGEgY29uc2VxdWVuY2UsXG4gICAgICogY291bnRlci52YWx1ZSArPSBuIGFuZCBjb3VudGVyLnZhbHVlIC09IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBhZGRpdGlvbnMpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlIC0gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIE9wZXJhdGlvbnMsIG1lc3NhZ2VzLCBhbmQgZGVzY3JpcHRpb25zIGFyZSBhbGwganVzdCB0aGVcbiAqIG51bWJlciB0byBtdWx0aXBseS9tdWx0aXBsaWVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAxIG11bHRzP1xuICovXG5leHBvcnQgY2xhc3MgTXVsdFJlZ2lzdGVySW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZSByZXR1cm4gMTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogbnVtYmVyLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICByZXR1cm4gW3N0YXRlICogbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIG51bWVyaWNhbCByZWdpc3RlciBDUkRUIHdpdGggbXVsdGlwbGljYXRpb24gb3BlcmF0aW9ucy5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIG51bWJlciB0aGF0IHdhcyBtdWx0aXBsaWVkLlxuICpcbiAqIFdhcm5pbmc6IG11bHRpcGxpY2F0aW9uIGlzIG5vdCBhY3R1YWxseSBjb21tdXRhdGl2ZSBpZiB0aGVyZSBpcyBhblxuICogb3ZlcmZsb3cgb3IgaWYgeW91IHVzZSBmbG9hdGluZyBwb2ludCBudW1iZXJzLiAgVE9ETzogaXMgdGhlcmUgYVxuICogYmV0dGVyIHR5cGUgd2UgY2FuIHVzZT9cbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRSZWdpc3RlckNyZHQgZXh0ZW5kcyBDcmR0PG51bWJlcj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IG51bWJlcikge1xuICAgICAgICBzdXBlcihpZCwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgbXVsdChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG4pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IG11bHRpcGxpY2F0aW9uLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiByZWdpc3Rlci52YWx1ZSAqPSBuIGFuZCByZWdpc3Rlci52YWx1ZSAvPSBuIHdvcmtcbiAgICAgKiBhcyBleHBlY3RlZCAoY29udmVydGVkIHRvIENSRFQgbXVsdGlwbGljYXRpb25zKS5cbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGN1cnJlbnQgdmFsdWUgaXMgMC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1wb3NzaWJsZSB0byBzZXQgdG8gbm9uemVybyB2YWx1ZSB3aGVuIGN1cnJlbnQgdmFsdWUgaXMgemVyb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuOyAvLyAwIC0+IDAgaXMgbm8tb3BcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm11bHQobmV3VmFsdWUgLyB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBDb3VudGVyTW9kSW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4vLyAgICAgY29uc3RydWN0b3IocmVhZG9ubHkgbW9kdWx1czogbnVtYmVyKSB7XG4vLyAgICAgICAgIGlmIChtb2R1bHVzIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwibW9kdWx1cyBpcyBuZWdhdGl2ZTogXCIgKyBtb2R1bHVzKTtcbi8vICAgICB9XG4vLyAgICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbi8vICAgICAgICAgZWxzZSByZXR1cm4gMDtcbi8vICAgICB9XG4vLyAgICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5tb2Qob3BlcmF0aW9uKTtcbi8vICAgICB9XG4vLyAgICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IG51bWJlciwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbbnVtYmVyLCBudW1iZXJdIHtcbi8vICAgICAgICAgcmV0dXJuIFt0aGlzLm1vZChzdGF0ZSArIG1lc3NhZ2UpLCBtZXNzYWdlXTtcbi8vICAgICB9XG4vLyAgICAgbW9kKHg6IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmICh4ID49IDApIHJldHVybiB4ICUgdGhpcy5tb2R1bHVzO1xuLy8gICAgICAgICBlbHNlIHJldHVybiB0aGlzLm1vZHVsdXMgLSAoKC14KSAlIHRoaXMubW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gfVxuXG4vKipcbiAqIE9wZXJhdGlvbnMgYW5kIG1lc3NhZ2VzIGFyZSB0aGUgZWxlbWVudCB0byBhZGQuICBUT0RPOlxuICogdGhpcyBtZWFucyB0aGF0IGFkZGluZyBudWxsIHdvbid0IHdvcmsgYXMgR1NldENyZHQgd2lsbCB0cmVhdFxuICogaXRzIG1lc3NhZ2UgYXMgYSBuby1vcC4gIERlc2NyaXB0aW9uIGlzIHRoZSBlbGVtZW50IGFkZGVkXG4gKiAoaWYgaXQncyByZWR1bmRhbnQsIGRlc2NyaXB0aW9uIGlzIG51bGwsIHNvIG9uY2hhbmdlIHdvbid0XG4gKiBzZWUgYW55dGhpbmcpLlxuICovXG5jbGFzcyBHU2V0SW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8U2V0PGFueT4+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBTZXQ8YW55Pik6IFNldDxhbnk+IHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhKSByZXR1cm4gbmV3IFNldDxhbnk+KGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNldDxhbnk+KCk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBhbnksIHN0YXRlOiBTZXQ8YW55Pikge1xuICAgICAgICBpZiAoc3RhdGUuaGFzKG9wZXJhdGlvbikpIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBhbnksIHN0YXRlOiBTZXQ8YW55PiwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NldDxhbnk+LCBhbnldIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBHU2V0SW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIGdyb3ctb25seSBzZXQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBhcnJheSBvZiBlbGVtZW50cyBhZGRlZFxuICogKFtdIG9yIFthZGRlZCBlbGVtZW50XSkuXG4gKlxuICogVE9ETzogYWRkaW5nIGEgbnVsbCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gKiBUT0RPOiBhZGQgYSB0eXBlIGFubm90YXRpb25cbiAqIFRPRE86IHNhbWUgaW50ZXJmYWNlIGFzIEpTIFNldFxuICovXG5leHBvcnQgY2xhc3MgR1NldENyZHQgZXh0ZW5kcyBDcmR0PFNldDxhbnk+PiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogU2V0PGFueT4pIHtcbiAgICAgICAgc3VwZXIoaWQsIEdTZXRJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBhZGQoZWxlbWVudDogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChlbGVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBzZXQuICBUaGlzIHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSA6IFNldDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQodGhpcy5zdGF0ZSk7XG4gICAgfVxufVxuXG5jbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDxUPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTZXQ8W1QsIGFueSwgbnVtYmVyXT4+IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGluaXRpYWwgdmFsdWUgdG8gc2V0LlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IFQpOiBTZXQ8W1QsIGFueSwgbnVtYmVyXT4ge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTZXQoW1tpbml0aWFsRGF0YSwgbnVsbCwgLTFdXSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcInNldFwiLCB2YWx1ZV06IHNldCB0byB0aGUgZ2l2ZW4gc2luZ2xlIHZhbHVlLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0LCBzZXR0aW5nIHRoZSB2YWx1ZSBzZXQgdG8gW10uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgX3N0YXRlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtzdHJpbmcsIGFueT9dLCBfc3RhdGU6IFNldDxbVCwgYW55LCBudW1iZXJdPiwgX3JlcGxpY2FJZDogYW55KSB7XG4gICAgICAgIGlmICghKChvcGVyYXRpb25bMF0gPT09IFwic2V0XCIgJiYgb3BlcmF0aW9uWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgfHwgb3BlcmF0aW9uWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybmVkIGRlc2NyaXB0aW9uIGlzOlxuICAgICAqIC0gZm9yIHNldCBtZXNzYWdlLCBbXCJzZXRcIiwgc2V0IHZhbHVlXSAoZXZlbiBpZiBpdFxuICAgICAqIGRvZXNuJ3QgZWxpbWluYXRlIGFsbCBjYXVzYWxseSBwcmlvciB2YWx1ZXMpLlxuICAgICAqIC0gZm9yIHJlc2V0cywgW1wicmVzZXRcIl0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtzdHJpbmcsIGFueT9dLCBzdGF0ZTogU2V0PFtULCBhbnksIG51bWJlcl0+LCBfcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NldDxbVCwgYW55LCBudW1iZXJdPiwgYW55XSB7XG4gICAgICAgIGlmICghKChtZXNzYWdlWzBdID09PSBcInNldFwiICYmIG1lc3NhZ2VbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB8fCBtZXNzYWdlWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSA9PT0gbnVsbCkgc3RhdGUuZGVsZXRlKHZhbHVlKTsvL2luaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQodmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSB2YWx1ZVsyXSkgc3RhdGUuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gXCJzZXRcIikge1xuICAgICAgICAgICAgc3RhdGUuYWRkKFttZXNzYWdlWzFdLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXI8VD4gZXh0ZW5kcyBDcmR0PFNldDxbVCwgYW55LCBudW1iZXJdPj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IFQpIHtcbiAgICAgICAgc3VwZXIoaWQsXG4gICAgICAgICAgICBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSBhcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDxUPixcbiAgICAgICAgICAgIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJzZXRcIiwgdmFsdWVdKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlU2V0KCk6IFNldDxUPiB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0PFQ+KCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUpIHZhbHVlcy5hZGQodmFsdWVbMF0pO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInJlc2V0XCJdKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxuICAgIC8vIFRPRE86IHJlc2V0IHN0cm9uZ1xufVxuIiwiaW1wb3J0IHtDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lLCBDcmR0TWVzc2FnZUxpc3RlbmVyfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG4vLyBUT0RPOiBpZHMgYXMgc3RyaW5ncyBpbnN0ZWFkIG9mIGFueVxuXG4vKipcbiAqIEludGVyZmFjZSBkZXNjcmliaW5nIHRoZSBpbnRlcm5hbCB3b3JraW5ncyBvZiBhIENSRFQgaW4gdGhlXG4gKiBwcmVwYXJlL2VmZmVjdCBzdHlsZSBvZiBcIlB1cmUgT3BlcmF0aW9uLUJhc2VkIFJlcGxpY2F0ZWQgRGF0YSBUeXBlc1wiXG4gKiBieSBCYXF1ZXJvIGV0IGFsLiAgVGhpcyBpbnRlcmZhY2UgaXMgYWxzbyBpbnNwaXJlZCBieSBTaGFyZURCJ3MgT1RcbiAqIHR5cGVzIChodHRwczovL2dpdGh1Yi5jb20vb3R0eXBlcy9kb2NzKS5cbiAqIEBwYXJhbSBTIFRoZSBDUkRUJ3Mgc3RhdGUgdHlwZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpbml0aWFsIHN0YXRlLCBwb3NzaWJseSBiYXNpbmcgaXRzIHZhbHVlXG4gICAgICogb2ZmIG9mIGluaXRpYWxEYXRhLiAgTm90ZSB0aGF0IGlmIHN0YXRlcyBjYW4gYmUgbXV0YXRlZFxuICAgICAqIGJ5IGVmZmVjdCwgdGhlbiBlYWNoIHJldHVybmVkIHN0YXRlIHNob3VsZCBiZSBhIGZyZXNoXG4gICAgICogb2JqZWN0LlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgQSB2YWx1ZSB1c2VkIHRvIG9wdGlvbmFsbHkgc2V0IHRoZSBzdGF0ZSdzXG4gICAgICogaW5pdGlhbCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuICBBIGZyZXNoIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBnaXZlbiBvcGVyYXRpb24sIHBvc3NpYmx5XG4gICAgICogcmVhZGluZyB0aGUgY3VycmVudCBzdGF0ZSBhbmQgaXNzdWluZyByZXBsaWNhIGlkLlxuICAgICAqIE1lc3NhZ2VzIGFuZCBvcGVyYXRpb25zIHdpbGwgaGF2ZSBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpY1xuICAgICAqIGZvcm0uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gQW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZGVzY3JpcHRpb24gb2ZcbiAgICAgKiB0aGUgb3BlcmF0aW9uLlxuICAgICAqIEBwYXJhbSAgc3RhdGUgVGhlIGN1cnJlbnQgc3RhdGUsIHdoaWNoIG1heSBiZSByZWFkIHRvIGRldGVybWluZVxuICAgICAqIHRoZSBtZXNzYWdlLiAgVGhpcyBzaG91bGQgbm90IGJlIG11dGF0ZWQuXG4gICAgICogQHBhcmFtIHJlcGxpY2FJZCBUaGUgaWQgb2YgdGhlIHJlcGxpY2EgaXNzdWluZyB0aGlzIG9wZXJhdGlvbixcbiAgICAgKiB3aGljaCBtYXkgYmUgcmVhZCB0byBkZXRlcm1pbmUgdGhlIG1lc3NhZ2UuXG4gICAgICogQHJldHVybiBBbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBkZXNjcmlwdGlvbiBvZiB0aGUgcmVzdWx0aW5nXG4gICAgICogbWVzc2FnZS4gIE5vdGUgdGhpcyB3aWxsIGJlIHNlbnQgb24gdGhlIHdpcmUgdXNpbmcgVE9ET1xuICAgICAqIChzZXJpYWxpemF0aW9uKS5cbiAgICAgKiBUaGUgbWVzc2FnZSBtc3V0IGJlIG51bGwgb25seSBpZiB0aGlzIG9wZXJhdGlvbiBkb2VzIG5vdFxuICAgICAqIGNoYW5nZSB0aGUgaW50ZXJuYWwgc3RhdGUsIHNpbmNlIGlmIHRoZSBtZXNzYWdlIGlzIG51bGwsXG4gICAgICogQ3JkdCB3aWxsIHNraXAgc2VuZGluZyB0aGUgbWVzc2FnZSB0byBvdGhlciByZXBsaWNhcy5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogYW55LCBzdGF0ZTogUywgcmVwbGljYUlkOiBhbnkpOiBhbnk7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgZ2l2ZW4gbWVzc2FnZSB0byB0aGUgc3RhdGUsIHJldHVybmluZyB0aGVcbiAgICAgKiByZXN1bHRpbmcgc3RhdGUgYXMgd2VsbCBhcyBhIGRlc2NyaXB0aW9uIG9mIHRoZSByZXN1bHRpbmdcbiAgICAgKiBjaGFuZ2UuICBNZXNzYWdlcyBhcmUgYXNzdW1lZCB0byBiZSBkZWxpdmVyZWQgaW4gY2F1c2FsXG4gICAgICogb3JkZXIuICBGb3IgZWZmaWNpZW5jeSwgdGhlIGlucHV0IHN0YXRlIHdpbGxcbiAgICAgKiBub3QgYmUgcmV1c2VkLCBzbyBhbiBpbXBsZW1lbnRhdGlvbiBpcyBmcmVlIHRvIG11dGF0ZVxuICAgICAqIGl0IGluLXBsYWNlIGFuZCByZXR1cm4gaXQuXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgVGhlIG1lc3NhZ2UgdG8gYmUgYXBwbGllZCwgY29taW5nIGZyb21cbiAgICAgKiBzb21lIHJlcGxpY2EncyBwcmVwYXJlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSAgc3RhdGUgICAgIFRoZSBpbnB1dCBzdGF0ZS5cbiAgICAgKiBAcGFyYW0gcmVwbGljYUlkIFRoZSBpZCBvZiB0aGUgcmVwbGljYSBhcHBseWluZyB0aGlzIG9wZXJhdGlvblxuICAgICAqIChub3QgdGhlIGlkIG9mIHRoZSByZXBsaWNhIHRoYXQgaXNzdWVkIHRoaXMgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtICB0aW1lc3RhbXAgVGhlIG1lc3NhZ2UncyBjYXVzYWwgdGltZXN0YW1wLiAgTm90ZSB0aGF0XG4gICAgICogYmVjYXVzZSBzZXZlcmFsIENSRFRzIGNhbiBzaGFyZSB0aGUgc2FtZSBydW50aW1lLCB0aW1lc3RhbXBzXG4gICAgICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gICAgICogbWlnaHQgc2tpcCBudW1iZXJzKS4gIEhvd2V2ZXIsIGNhdXNhbGx5IG9yZGVyZWQgZGVsaXZlcnkgaXNcbiAgICAgKiBzdGlsbCBndWFyYW50ZWVkLiAgSWYgd2UgYXJlIHByb2Nlc3Npbmcgb3VyIG93biBtZXNzYWdlXG4gICAgICogKGkuZS4sIHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSwgdGhlbiBpdCBpc1xuICAgICAqIGd1YXJhbnRlZWQgdGhhdCB0aGUgbWVzc2FnZSBpcyBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yXG4gICAgICogbWVzc2FnZXMuICBJdCBpcyBwb3NzaWJsZSB0aGF0IG11bHRpcGxlIG1lc3NhZ2VzIHNoYXJlIHRoZSBzYW1lXG4gICAgICogdGltZXN0YW1wOyBpZiBzbywgdGhleSBhcmUgdG90YWxseSBvcmRlcmVkIGJ5IHRoZSBjYXVzYWwgb3JkZXIsXG4gICAgICogdGhleSB3aWxsIGFsbCBiZSBkZWxpdmVyZWQgaW4gYSByb3cgaW4gY2F1c2FsIG9yZGVyLCBhbmQgdGhlXG4gICAgICogdGltZXN0YW1wIGFjY3VyYXRlbHkgcmVmbGVjdHMgdGhlaXIgY2F1c2FsIHJlbGF0aW9uc2hpcCB0b1xuICAgICAqIG90aGVyIG1lc3NhZ2VzIChpbiBwYXJ0aWN1bGFyLCB0aGV5IGFsbCBzaGFyZSB0aGUgc2FtZSBjYXVzYWxcbiAgICAgKiByZWxhdGlvbnNoaXBzIHdpdGggb3RoZXIgbWVzc2FnZXMpLlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtUaGUgb3V0cHV0IHN0YXRlLCBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpY1xuICAgICAqIGRlc2NyaXB0aW9uIG9mIHRoZSBjaGFuZ2UuXSAgVGhlIGRlc2NyaXB0aW9uIHdpbGwgYmUgcGFzc2VkXG4gICAgICogdG8gdGhlIGFwcGxpY2F0aW9uIHVzaW5nIHRoaXMgQ1JEVCBzbyB0aGV5IGtub3cgd2hhdCBvY2N1cnJlZC5cbiAgICAgKiBJZGVhbGx5LCBpdCBzaG91bGQgYmUgZGVzY3JpYmVkIGluIHRlcm1zIG9mIG9yZGluYXJ5IGRhdGFcbiAgICAgKiB0eXBlIG9wZXJhdGlvbnMsIHNvIHRoYXQgYXBwbGljYXRpb25zIGNhbiB1bmRlcnN0YW5kIHRoZSBjaGFuZ2VcbiAgICAgKiB3aXRob3V0IG5lZWRpbmcgdG8gdW5kZXJzdGFuZCB0aGUgQ1JEVCdzIHNlbWFudGljcy5cbiAgICAgKiBUaGUgZGVzY3JpcHRpb24gbXVzdCBiZSBudWxsIG9ubHkgaWYgdGhlIGV4dGVybmFsbHkgdmlzaWJsZVxuICAgICAqIHN0YXRlIGlzIHVuY2hhbmdlZCxcbiAgICAgKiBzaW5jZSBDcmR0IHdpbGwgc2tpcCBjYWxsaW5nIG9uY2hhbmdlIGlmIGRlc2NyaXB0aW9uIGlzIG51bGwuXG4gICAgICogKFRoZSBjb252ZXJzZS0tLWlmIHRoZSBzdGF0ZSB3YXMgdW5jaGFuZ2VkLCB0aGVuIGRlc2NyaXB0aW9uXG4gICAgICogaXMgbnVsbC0tLW5lZWQgbm90IGhvbGQsIGFsdGhvdWdoIGl0IGlzIG5pY2UgaWYgaXQgZG9lcy4pXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IGFueSwgc3RhdGU6IFMsIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBhbnldO1xufVxuXG4vKipcbiAqIEFuIGV2ZW50IGlzc3VlZCB3aGVuIGEgQ1JEVCBpcyBjaGFuZ2VkIGJ5IGFub3RoZXIgcmVwbGljYS5cbiAqIEBwYXJhbSBjYWxsZXIgICAgICBUaGUgQ3JkdCBpbnN0YW5jZSB0aGF0IHdhcyBjaGFuZ2VkLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NycHRpb24gb2YgdGhlIGNoYW5nZS5cbiAqIEBwYXJhbSB0aW1lc3RhbXAgICBUaGUgY2F1c2FsIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLiBOb3RlIHRoYXRcbiAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICogc3RpbGwgZ3VhcmFudGVlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHRDaGFuZ2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNhbGxlcjogQ3JkdDxhbnk+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb246IGFueSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7IH1cbn1cblxuLy8gVXNlci1mYWNpbmcgd3JhcHBlcnMgYXJvdW5kIENSRFRzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzcyxcbi8vIGFkZGluZyBtZXRob2RzIGZvciB0aGUgQ1JEVCdzIG9wZXJhdGlvbnMgKGUuZy4sIGluY3JlbWVudCgpKVxuLy8gd2hpY2ggY2FsbCB0aGlzIGNsYXNzJ3MgYXBwbHkgbWV0aG9kLlxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhcHBsaWNhdGlvbi1mYWNpbmcgQ1JEVCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJbnN0ZWFkIG9mIGV4cG9zaW5nIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbnMgZGlyZWN0bHksXG4gKiB3aGljaCBoYXZlIGFuIHVuZnJpZW5kbHkgcHJlcGFyZS9lZmZlY3QgaW50ZXJmYWNlLFxuICogZWFjaCBDUkRUIGltcGxlbWVudGF0aW9uIHNob3VsZCBkZWZpbmUgYSBzdWJjbGFzcyBvZiB0aGlzXG4gKiBjbGFzcyB3aXRoIG9yZGluYXJ5LWxvb2tpbmcgbWV0aG9kcyB0byBwZXJmb3JtIG9wZXJhdGlvbnNcbiAqIGFuZCBxdWVyeSB0aGUgc3RhdGUuICBNZXRob2RzIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyBzaG91bGRcbiAqIGNhbGwgYXBwbHlPcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIENyZHRJbnRlcm5hbCBvcGVyYXRpb24uXG4gKiBUaGlzIGNsYXNzIHRoZW4gYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgYW5kIHJlY2VpdmluZ1xuICogb2YgbWVzc2FnZXMuXG4gKiBDZi4gQWxnb3JpdGhtIDEgaW4gdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBwYXBlci5cbiAqIEBwYXJhbSBTIFRoZSBzdGF0ZSB0eXBlIG9mIEMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0PFM+IGltcGxlbWVudHMgQ3JkdE1lc3NhZ2VMaXN0ZW5lciB7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgQ3JkdEludGVybmFsIHN0YXRlLiAgVGhpcyBzaG91bGQgbm90XG4gICAgICogYmUgbXV0YXRlZCBkaXJlY3RseSBidXQgbWF5IGJlIHJlYWQgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0XG4gICAgICogdGhlIHN0YXRlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdGF0ZTogUztcbiAgICAvKipcbiAgICAgKiBTZXQgdGhpcyB0byBsaXN0ZW4gZm9yIHdoZW4gYW5vdGhlciByZXBsaWNhIHVwZGF0ZXNcbiAgICAgKiB0aGlzIG9iamVjdCdzIHN0YXRlLlxuICAgICAqL1xuICAgIG9uY2hhbmdlIDogKGV2ZW50OiBDcmR0Q2hhbmdlRXZlbnQpID0+IHZvaWQgPSAoKF8pID0+IHt9KTtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIGNyZHRJbnRlcm5hbCAgICBUaGUgQ3JkdEludGVybmFsIHRvIHVzZS4gIE5vdGUgdGhhdCBzaW5jZVxuICAgICAqIENyZHRJbnRlcm5hbCdzIGRvbid0IHN0b3JlIHN0YXRlcywgbXVsdGlwbGUgb2JqZWN0cyBtYXlcbiAgICAgKiBzaGFyZSB0aGUgc2FtZSBDcmR0SW50ZXJuYWwgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICBPcHRpb25hbCBpbml0aWFsIGRhdGEgdG8gdXNlIHdoZW5cbiAgICAgKiBzZXR0aW5nIHRoZSBDcmR0SW50ZXJuYWwncyBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBpZDogYW55LCBwdWJsaWMgcmVhZG9ubHkgY3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNyZHRJbnRlcm5hbC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZGVzY3JpYmUgXCJ0cmFuc2FjdGlvbnNcIi4gIFJpZ2h0IHdvcmQ/ICBSZW5hbWVcbiAgICAvLyBcImF0b21pY1wiIHN0dWZmIGJlbG93LiAgTXVzdCBoYXBwZW4gc3luY2hyb25vdXNseSBzb1xuICAgIC8vIHRoYXQgcnVudGltZS5nZXRUaW1lc3RhbXAoKSBkb2Vzbid0IGNoYW5nZSBhbmRcbiAgICAvLyBubyBtZXNzYWdlcyBhcmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXG4gICAgLy8gQWxsb3cgY2FsbGVyIHRvIHN0YXJ0L2VuZCB0cmFuc2FjdGlvbnM/XG4gICAgcHJpdmF0ZSBpblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbk1lc3NhZ2VzOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbkRlc2NyaXB0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByb3RlY3RlZCBzdGFydFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmV0dXJucyB0aGUgZGVzY3JpcHRpb25zICh0cmFuc2xhdGVkKVxuICAgIHByb3RlY3RlZCBlbmRUcmFuc2FjdGlvbigpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZCh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMsIHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzID0gW107XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHRoZSBnaXZlbiBvcGVyYXRpb24gdG8gdGhlIHN0YXRlLCB1c2luZyBwcmVwYXJlIGFuZCBlZmZlY3QsXG4gICAgICogYW5kIHNlbmRzIHRoZSBnZW5lcmF0ZWQgbWVzc2FnZSBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIElmIGEgdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MsIHRoaXMgc2VuZGluZyBpcyBkZWxheWVkXG4gICAgICogdW50aWxcbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBUaGUgb3BlcmF0aW9uIHRvIGFwcGx5LlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY2hhbmdlcy5cbiAgICAgKiBUaGlzIGlzIHRoZSBsaXN0IG9mIGluZGl2aWR1YWwgbWVzc2FnZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiBlZmZlY3QgKHNraXBwaW5nIG51bGwgbWVzc2FnZXMpLFxuICAgICAqIGFmdGVyIGJlaW5nIHBhc3NlZCB0aHJvdWdoIHRyYW5zbGF0ZURlc2NyaXB0aW9uLiAgQW4gZXhjZXB0aW9uXG4gICAgICogaXMgdGhhdCBpZiBhbGwgbWVzc2FnZXMgYXJlXG4gICAgICogbnVsbCwgbnVsbCBpcyByZXR1cm5lZCB3aXRob3V0IGNhbGxpbmcgdHJhbnNsYXRlRGVzY3JpcHRpb24uXG4gICAgICogVE9ETzogbnVsbCBpZiBpbiBhIHRyYW5zYWN0aW9uICh1c2UgZW5kVHJhbnNhY3Rpb24gaW5zdGVhZCkuXG4gICAgICogVE9ETzogYnV0IHdoYXQgaWYgd2Ugd2FudCBpdCB0byBkZWNpZGUgd2hhdCB0byBkbyBuZXh0P1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIGxldCBvd25UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgb3duVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuY3JkdEludGVybmFsLnByZXBhcmUob3BlcmF0aW9uLCB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvd25UcmFuc2FjdGlvbikgcmV0dXJuIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHRyYW5zbGF0ZSB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIENyZHRJbnRlcm5hbCBiZWZvcmUgcGFzc2luZyBpdCB0byBvbmNoYW5nZS4gIFRoaXMgaXNcbiAgICAgKiB1c2VmdWwgZm9yIHNlbWlkaXJlY3QgcHJvZHVjdHMgYmVjYXVzZSB0aGUgZGVmYXVsdFxuICAgICAqIFNlbWlkaXJlY3RJbnRlcm5hbCBkZXNjcmlwdGlvbnMgYXJlIG5vdCB1c2VyLWZyaWVuZGx5LlxuICAgICAqIElmIHRoaXMgbWV0aG9kIHJldHVybnMgbnVsbCwgb25jaGFuZ2UgaXMgbm90IGNhbGxlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGlvbiByZXR1cm5zIGRlc2NyaXB0aW9uc1swXS4gIEl0IGlzXG4gICAgICogYXBwcm9wcmlhdGUgd2hlbiB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QgYWxyZWFkeSByZXR1cm5zXG4gICAgICogdXNlci1mcmllbmRseSBkZXNjcmlwdGlvbnMgYW5kIGFwcGx5T3BzIGlzIG9ubHkgZXZlciBjYWxsZWRcbiAgICAgKiB3aXRoIHNpbmdsZSBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtICBkZXNjcmlwdGlvbnMgQSBsaXN0IG9mIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QuICBUaGlzIHdpbGwgYWx3YXlzIGJlIG5vbi1lbXB0eS5cbiAgICAgKiBAcmV0dXJuIFRoZSB0cmFuc2xhdGVkIGRlc2NyaXB0aW9uIHRvIHBhc3MgdG8gdGhpcy5vbmNoYW5nZSxcbiAgICAgKiBvciBudWxsIGlmIHRoaXMub25jaGFuZ2Ugc2hvdWxkIG5vdCBiZSBjYWxsZWQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBvYnNlcnZlZCByZXNldHNcbiAgICAgKiBmb3Igd2hlbiBhIENyZHRPYmplY3QgY29udGFpbmluZyB0aGlzIENyZHQgaXNcbiAgICAgKiByZXNldC4gIFRoZVxuICAgICAqIGRlZmF1bHQgcmV0dXJucyBudWxsLCBzbyBzdWNoIG1hcCByZXNldHMgZG8gbm90aGluZy5cbiAgICAgKiBAcmV0dXJuIEEgbWVzc2FnZSAobm90IG9wZXJhdGlvbikgdGhhdCBjYW4gYmUgYXBwbGllZCB0b1xuICAgICAqIHRoaXMgQ3JkdCB0b2dldGhlciB3aXRoIGFueSB0aW1lc3RhbXBcbiAgICAgKiB0byBjYXVzZSBhbiBvYnNlcnZlZC1yZXNldCBvcGVyYXRpb24sIG9yIG51bGwgdG8gZG9cbiAgICAgKiBub3RoaW5nLiAgRm9yIHRoaXMgQ3JkdFxuICAgICAqIHRvIGJlIGNvcnJlY3QgKGV2ZW50dWFsbHkgY29uc2lzdGVudCkgd2hlbiB1c2VkIGFzIGFcbiAgICAgKiBwcm9wZXJ0eSBpbiBhbiBDcmR0T2JqZWN0LCB0aGUgcmV0dXJuZWQgbWVzc2FnZVxuICAgICAqIG11c3Qgc2F0aXNmeTpcbiAgICAgKiAtIHdoZW4gcGFpcmVkIHdpdGggYW55IENhdXNhbFRpbWVzdGFtcCwgaXQgY29tbXV0ZXMgd2l0aFxuICAgICAqIGNvbmN1cnJlbnQgbWVzc2FnZXMgKHVzdWFsIENyZHQgcmVxdWlyZW1lbnQpLCBpbmNsdWRpbmdcbiAgICAgKiBjb25jdXJyZW50IHJlc2V0cyBhbmQgc3Ryb25nLXJlc2V0cy5cbiAgICAgKiAtIHdoZW4gYXBwbGllZCB0byBhIHN0YXRlIHdoaWNoIGhhcyBub3QgcmVjZWl2ZWQgYW55XG4gICAgICogbWVzc2FnZXMgY2F1c2FsbHkgcHJpb3IgdG8gdGhlIHRpbWVzdGFtcCwgaXQgaGFzXG4gICAgICogbm8gZWZmZWN0LiAgSW4gb3RoZXIgd29yZHMsIGFwcGx5aW5nIGl0IHRvIGEgY29uY3VycmVudGx5XG4gICAgICogaW5pdGlhbGl6ZWQgc3RhdGUgaGFzIG5vIGVmZmVjdC5cbiAgICAgKiBPdGhlcndpc2UsIGl0IGlzIGZyZWUgdG8gaGF2ZSBhbnkgc2VtYW50aWNzLCBpbmNsdWRpbmdcbiAgICAgKiBkb2luZyBub3RoaW5nLiAgSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIG9ic2VydmVkLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIG1lc3NhZ2VzIGluc3RlYWQsIGZvciBnZW5lcmFsaXR5P1xuICAgICAqL1xuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBvYnNlcnZlZC1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0KCk6IHZvaWQgeyB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBzdHJvbmctcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXRTdHJvbmcoKTogdm9pZCB7IH1cbiAgICAvLyAvKipcbiAgICAvLyAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBzdHJvbmcgcmVzZXRzLiAgVGhlXG4gICAgLy8gICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgIC8vICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgLy8gICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgIC8vICAqIHRvIGNhdXNlIGEgc3Ryb25nLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgIC8vICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgLy8gICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgIC8vICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgLy8gICogbXVzdCBzYXRpc2Z5OlxuICAgIC8vICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgLy8gICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgIC8vICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgIC8vICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgIC8vICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAvLyAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAvLyAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAvLyAgKi9cbiAgICAvLyBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKTogYW55IHtcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIHRoaXMucnVudGltZSB3aGVuIGFuIGF0b21pYyBsaXN0IG9mXG4gICAgICogbWVzc2FnZXMgaXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgcmVjZWl2ZShtZXNzYWdlczogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbiB0cmFuc2FjdGlvbjsgdGhlIHRyYW5zYWN0aW9uIG11c3QgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJlIGVuZGVkIHN5bmNocm9ub3VzbHkgc28gdGhhdCBtZXNzYWdlcyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiY2Fubm90IGJlIHJlY2VpdmVkIGluIHRoZSBpbnRlcmltLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QobWVzc2FnZSwgdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25jaGFuZ2UgJiYgZGVzY3JpcHRpb25zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2hhbmdlKG5ldyBDcmR0Q2hhbmdlRXZlbnQodGhpcywgdHJhbnNsYXRlZCwgdGltZXN0YW1wKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDcmR0T2JqZWN0LCBNYXBDcmR0LCBFbmFibGVXaW5zRmxhZywgSW50UmVnaXN0ZXJDcmR0LCBBZGRXaW5zU2V0IH0gZnJvbSBcIi4vc3RhbmRhcmRcIjtcbmltcG9ydCB7IENyZHQgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcbmltcG9ydCB7IE11bHRpVmFsdWVSZWdpc3RlciB9IGZyb20gXCIuL2Jhc2ljX2NyZHRzXCI7XG5pbXBvcnQgeyBDcmR0UnVudGltZSB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5cbmludGVyZmFjZSBKc29uSW5kZXhUeXBlIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBKc29uQ3JkdCBleHRlbmRzIENyZHRPYmplY3Q8c3RyaW5nLCBDcmR0PGFueT4+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvb2xlYW5zOiBNYXBDcmR0PHN0cmluZywgRW5hYmxlV2luc0ZsYWc+O1xuICAgIC8vIFRPRE86IGR3RmxhZ3MgdG9vP1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbnVtYmVyczogTWFwQ3JkdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD47XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdHJpbmdzOiBNYXBDcmR0PHN0cmluZywgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2V0czogTWFwQ3JkdDxzdHJpbmcsIEFkZFdpbnNTZXQ8YW55Pj47XG4gICAgLy8gVE9ETzogUldTZXRzIHRvbz9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9iamVjdHM6IE1hcENyZHQ8c3RyaW5nLCBKc29uQ3JkdD47XG4gICAgLy8gVE9ETzogYXJyYXlzIChzZXF1ZW5jZXMpLiAgVXNlcyBtYXBzIGZvciBub3cuXG4gICAgLy8gVE9ETzogbnVsbHM/XG5cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHBhc3MgaW5pdGlhbCB2YWx1ZSAod2hpY2ggaXMgbm90IHN5bmNlZCkuXG4gICAgLy8gTW9yZSBnZW5lcmFsbHksIGFiaWxpdHkgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIHlvdXJcbiAgICAvLyBwcmVkZWZpbmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHN5bmNlZD9cbiAgICAvLyBVc2UgdGhlIGV4aXN0aW5nIGZsYWcgYW5kIGJsb2NrIG1lc3NhZ2VzIGluIENyZHRPYmplY3QuXG4gICAgY29uc3RydWN0b3IoY3JkdElkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmJvb2xlYW5zID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcImJvb2xlYW5zXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBFbmFibGVXaW5zRmxhZyhrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5udW1iZXJzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcIm51bWJlcnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEludFJlZ2lzdGVyQ3JkdChrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcInN0cmluZ3NcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IE11bHRpVmFsdWVSZWdpc3RlcjxzdHJpbmc+KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldHMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwic2V0c1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgQWRkV2luc1NldChrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5vYmplY3RzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcIm9iamVjdHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEpzb25DcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgQ3JkdCB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHN0b3JpbmdcbiAgICAgKiB2YWx1ZXMgd2l0aCB0aGUgc2FtZSB0eXBlIGFzIHR5cGVJbmRpY2F0b3IsXG4gICAgICogb3IgdW5kZWZpbmVkIGlmIHRoZSBrZXkgaXMgbm90IHByZXNlbnQgKGluY2x1ZGluZ1xuICAgICAqIGlmIGl0IHByZXZpb3VzbHkgd2FzIHByZXNlbnQgYnV0IHdhcyByZW1vdmVkKS5cbiAgICAgKiAoVXNlIGluaXQgaW5zdGVhZCBpZiB5b3Ugd2FudCBhIGd1YXJhbnRlZWQtZGVmaW5lZFxuICAgICAqIHJldHVybiB2YWx1ZS4pXG4gICAgICogKFRPRE86IGV4cGxhaW4ga2V5cyBhcmVcbiAgICAgKiBzZWdyZWdhdGVkIGJ5IHZhbHVlIHR5cGUpLlxuICAgICAqIEUuZy4gZ2V0KFwiYVwiLCAwKSB0byBnZXQgdGhlIG51bWJlciB2YWx1ZSB3aXRoIGtleSAwLlxuICAgICAqIFN0YW5kYXJkIHR5cGVJbmRpY2F0b3IgdmFsdWVzOlxuICAgICAqIC0gZmFsc2U6IGJvb2xlYW4gKEVuYWJsZVdpbnNGbGFnKVxuICAgICAqIC0gMDogbnVtYmVyIChJbnRSZWdpc3RlckNyZHQpXG4gICAgICogLSBcIlwiOiBzdHJpbmcgKE11bHRpVmFsdWVSZWdpc3RlcjxzdHJpbmc+KVxuICAgICAqIC0gbmV3IFNldCgpOiBzZXQgKEFkZFdpbnNTZXQpXG4gICAgICogLSB7fTogb2JqZWN0IChKc29uQ3JkdClcbiAgICAgKlxuICAgICAqIFRPRE86IGV4cGxpY3RseSB0eXBlZCB2ZXJzaW9ucz8gIENhbiB3ZSBkbyB0aGlzIGNsZXZlcmx5XG4gICAgICogd2l0aCBnZW5lcmljcyBhbmQgdHlwZSBwb2x5bW9ycGhpc20gb3Igc29tZXRoaW5nP1xuICAgICAqXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHR5cGVJbmRpY2F0b3IgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlKGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHRoaXMuYm9vbGVhbnMuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogdGhpcy5udW1iZXJzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHRoaXMuc3RyaW5ncy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0cy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMub2JqZWN0cy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaWtlIGdldCwgYnV0IGluc3RlYWQgb2YgcmV0dXJuaW5nIHRoZSB2YWx1ZSBDcmR0LFxuICAgICAqIHJldHVybnMgaXRzIHZhbHVlLiAgTm90ZSBmb3Igc3RyaW5ncywgaWYgdGhlIENyZHRcbiAgICAgKiBkb2VzIG5vdCBoYXZlIGEgc2luZ2xlIHZhbHVlIChlaXRoZXIgb3IgMispLFxuICAgICAqIHdoaWNoIGlzIHBvc3NpYmxlIGR1ZSB0byB0aGUgTXVsdGlWYWx1ZVJlZ2lzdGVyXG4gICAgICogc2VtYW50aWNzLCB3ZSByZXR1cm4gdGhlIHNldCBvZiBhbGwgY3VycmVudCB2YWx1ZXNcbiAgICAgKiBpbnN0ZWFkIG9mIGEgc2luZ2xlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIFRPRE86IHVzZSBnZW5lcmljcyB0byBzYXkgdGhhdCByZXR1cm4gdmFsdWUgaXNcbiAgICAgKiBzYW1lIGFzIHR5cGVJbmRpY2F0b3IgdHlwZSB8IHVuZGVmaW5lZD9cbiAgICAgKiBXb3JrcyBleGNlcHQgZm9yIHN0cmluZ3MsXG4gICAgICogd2hpY2ggY291bGQgaW5zdGVhZCByZXR1cm4gYSBTZXQ8c3RyaW5nPi5cbiAgICAgKiBDb3VsZCBpbnN0ZWFkIGhhdmUgc3BlY2lmaWNhbGx5IHR5cGVkIHZlcnNpb25zIG9mIHRoZSBtZXRob2QuXG4gICAgICovXG4gICAgZ2V0VmFsdWUoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpOlxuICAgICAgICAgICAgYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IFNldDxzdHJpbmc+IHwgU2V0PGFueT4gfCBPYmplY3QgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5nZXQoa2V5LCB0eXBlSW5kaWNhdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlQ3JkdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNyZHQgaW5zdGFuY2VvZiBNdWx0aVZhbHVlUmVnaXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTZXQgPSB2YWx1ZUNyZHQudmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU2V0LnNpemUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVTZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZUNyZHQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMvcmV2aXZlcyB0aGUgZ2l2ZW4ga2V5IHdpdGggdGhlIGluZGljYXRlZCB0eXBlIGlmXG4gICAgICogbmVlZGVkLCBtYWtpbmcgaXQgcHJlc2VudCBpbiB0aGUgc3RhdGVcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB0aGUgdmFsdWUgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0KGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIC8vIFRPRE86IGNhbiB3ZSBnZW5lcmlmeSB0aGlzIGZ1bmN0aW9uIHBhdHRlcm4/XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLm9iamVjdHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHRvIGEgY29weSBvZiB0aGUgZ2l2ZW5cbiAgICAgKiAobm9uLUNyZHQpIHZhbHVlLCB1c2luZyB0aGUgQ3JkdCdzIC52YWx1ZSA9IG1ldGhvZC5cbiAgICAgKiBUaGlzIGdlbmVyYWxseSBoYXMgdGhlIGVmZmVjdCBvZiByZXNldHRpbmcgdGhlIGN1cnJlbnQgQ3JkdFxuICAgICAqIGFuZCB0aGVuIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyB0byBkcml2ZSBpdCB0byB0aGUgZGVzaXJlZFxuICAgICAqIHZhbHVlLiAgSWYgeW91IHdhbnQgbW9yZSBjb250cm9sIG92ZXIgaG93IHRoZSB2YWx1ZSBpcyBzZXRcbiAgICAgKiAoZS5nLiwgcGFzc2luZyBhbiBvcHRpb24gdG8gSnNvbkNyZHQuZ2V0QXNPYmplY3Qgd2hlbiBzZXR0aW5nXG4gICAgICogYW4gb2JqZWN0J3MgdmFsdWUpLCB5b3UgY2FuIGluc3RlYWQgZ2V0IHRoZSBDcmR0IHdpdGhcbiAgICAgKiB0aGlzLmluaXQoa2V5LCB2YWx1ZSkgYW5kIHRoZW4gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGl0XG4gICAgICogZGlyZWN0bHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdmFsdWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyB2YWx1ZSBDcmR0ICh0aGlzLmdldChrZXksIHZhbHVlKSkuXG4gICAgICovXG4gICAgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZUludGVybmFsKGtleTogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5pbml0KGtleSwgdmFsdWUpO1xuICAgICAgICB2YWx1ZUNyZHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG5cbiAgICBrZXlzQnlUeXBlKHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5rZXlzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5rZXlzKCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gQXJyYXkgb2YgW2tleSwgdHlwZSBuYW1lXSBwYWlyc1xuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PFtzdHJpbmcsIHN0cmluZ10+ID0gW107XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLmJvb2xlYW5zLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJib29sZWFuXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMubnVtYmVycy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwibnVtYmVyXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuc3RyaW5ncy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwic3RyaW5nXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuc2V0cy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwic2V0XCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub2JqZWN0cy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwib2JqZWN0XCJdKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBkZWxldGVcbiAgICAvLyBUT0RPOiBkZWxldGVTdHJvbmcgKG9uY2UgbWFwIHN1cHBvcnRzIGl0LiAgUGVyaGFwcyB0aHJvd1xuICAgIC8vIGVycm9yIG9uIG1hcCB2YWx1ZXMgb25seT8pXG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgRXJyb3JPbkNvbmZsaWN0ID0gMTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgUHJlZml4VHlwZXMgPSAyO1xuICAgIHN0YXRpYyByZWFkb25seSBFeHBhbmRPbkNvbmZsaWN0ID0gMztcbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGU6IG51bWJlcikge1xuICAgICAgICBpZiAoIShrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzIHx8XG4gICAgICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QgfHxcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQga2V5Q29uZmxpY3RSdWxlOiBcIiArXG4gICAgICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY29weSBvZiB0aGlzIENyZHQncyB2YWx1ZSBpbiBPYmplY3QgZm9ybS5cbiAgICAgKiBDaGFuZ2luZyB0aGUgcmV0dXJuZWQgdmFsdWUgaGFzIG5vIGVmZmVjdCBvbiB0aGUgQ3JkdCBzdGF0ZS5cbiAgICAgKiBOb3RlIHRoYXQgc2V0IHZhbHVlcyBhcmUgY29udmVydGVkIHRvIEphdmFzY3JpcHQgU2V0cyxcbiAgICAgKiByZXN1bHRpbmcgaW4gYSBub3QtcXVpdGUtSlNPTiBmb3JtYXQgb2JqZWN0LlxuICAgICAqIEEgc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlciBpcyBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgaWYgaXQgaGFzXG4gICAgICogYSBzaW5nbGUgdmFsdWU7IG90aGVyd2lzZSAoMCBvciAyKyB2YWx1ZXMpIGl0XG4gICAgICogaXMgY29udmVydGVkIHRvIGEgU2V0PHN0cmluZz5cbiAgICAgKiAoQXJyYXk8c3RyaW5nPiBpZiBzZXRzQXNBcnJheXM9dHJ1ZSlcbiAgICAgKiBvZiBhbGwgY3VycmVudCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleUNvbmZsaWN0UnVsZT1Kc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICogUG9saWN5IGZvciBoYW5kbGluZyBrZXlzIG9mIGRpZmZlcmVudCB0eXBlcyB0aGF0IGhhdmUgdGhlXG4gICAgICogc2FtZSBuYW1lLiAgT3B0aW9uczpcbiAgICAgKiAtIEVycm9yT25Db25mbGljdCAoZGVmYXVsdCk6IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIGEga2V5IGNvbmZsaWN0LlxuICAgICAqIC0gUHJlZml4VHlwZXM6IHByZWZpeCB0aGUgdHlwZSBuYW1lIGZvbGxvd2VkIGJ5IFwiOlwiIHRvIGVhY2gga2V5LFxuICAgICAqIGUuZy4gXCJudW1iZXI6bXlLZXlcIi4gIFR5cGUgbmFtZXMgYXJlIFwiYm9vbGVhblwiLCBcIm51bWJlclwiLFxuICAgICAqIFwic3RyaW5nXCIsIFwic2V0XCIsIFwib2JqZWN0XCIuXG4gICAgICogLSBFeHBhbmRPbkNvbmZsaWN0OiBpZiB0aGVyZSBpcyBhIGNvbmZsaWN0IG9uXG4gICAgICogYSBrZXksIHNldCBpdHMgdmFsdWUgdG8gZXF1YWwgYW4gb2JqZWN0IGNvbnRhaW5pbmcgZWFjaCBvZlxuICAgICAqIHRoZSBjb25mbGljdGluZyB2YWx1ZXMsIHBsdXMgYSBmbGFnIFwianNvbkNyZHRLZXlFeHBhbmRlZCA9IHRydWVcIi4gIEUuZy5cbiAgICAgKiBcIm15S2V5XCI6IHtcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSwgXCJzdHJpbmdcIjogXCJzdHJpbmdWYWx1ZVwiLFxuICAgICAqIFwibnVtYmVyXCI6IDd9XG4gICAgICogQHBhcmFtIHNldHNBc0FycmF5cyA9IGZhbHNlIElmIHRydWUsIFNldCB2YWx1ZXMgYXJlIGNvbnZlcnRlZFxuICAgICAqIHRvIGFycmF5cywgc28gdGhhdCB0aGUgcmVzdWx0aW5nIE9iamVjdCBpcyBpbiByZWd1bGFyIEpTT05cbiAgICAgKiBmb3JtYXQuICBUaGlzIGluY2x1ZGVzIFNldDxzdHJpbmc+IHZhbHVlcyByZXN1bHRpbmcgZnJvbVxuICAgICAqIHN0cmluZyBNdWx0aVZhbHVlUmVnaXN0ZXJzIHRoYXQgaGF2ZSAwIG9yIDIrIHZhbHVlcy5cbiAgICAgKi9cbiAgICBnZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsXG4gICAgICAgICAgICBzZXRzQXNBcnJheXMgPSBmYWxzZSk6IE9iamVjdCB7XG4gICAgICAgIEpzb25DcmR0LmNoZWNrS2V5Q29uZmxpY3RSdWxlKGtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIGxldCBvYmplY3Q6IEpzb25JbmRleFR5cGUgPSB7fTtcbiAgICAgICAgLy8gTWFwcyBrZXlzIHRvIHRoZSBuYW1lIG9mIHRoZWlyIGZpcnN0IHR5cGVcbiAgICAgICAgbGV0IGtleXNTb0ZhciA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgIGxldCBjb25mbGljdGVkS2V5c1NvRmFyID0gbmV3IFNldDxTdHJpbmc+KCk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5ib29sZWFucywgXCJib29sZWFuXCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiB2YWx1ZS52YWx1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMubnVtYmVycywgXCJudW1iZXJcIixcbiAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlLnZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5zdHJpbmdzLCBcInN0cmluZ1wiLFxuICAgICAgICAgICAgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZS52YWx1ZVNldDtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNpemUgPT09IDEpIHJldHVybiByZXN1bHQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIChzZXRzQXNBcnJheXM/IFsuLi5yZXN1bHQudmFsdWVzKCldOiByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc2V0cywgXCJzZXRcIixcbiAgICAgICAgICAgIHZhbHVlID0+IChzZXRzQXNBcnJheXM/IFsuLi52YWx1ZS52YWx1ZV06IHZhbHVlLnZhbHVlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMub2JqZWN0cywgXCJvYmplY3RcIixcbiAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlLmdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSwgc2V0c0FzQXJyYXlzKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBwcml2YXRlIGdldEFzT2JqZWN0SW50ZXJuYWw8ViBleHRlbmRzIENyZHQ8YW55Pj4oXG4gICAgICAgIG9iamVjdDogSnNvbkluZGV4VHlwZSwga2V5c1NvRmFyOiBNYXA8c3RyaW5nLCBzdHJpbmc+LFxuICAgICAgICBjb25mbGljdGVkS2V5c1NvRmFyOiBTZXQ8U3RyaW5nPiwga2V5Q29uZmxpY3RSdWxlOiBudW1iZXIsXG4gICAgICAgIG1hcDogTWFwQ3JkdDxzdHJpbmcsIFY+LCB0eXBlTmFtZTogc3RyaW5nLFxuICAgICAgICB2YWx1ZUZ1bmM6ICh2YWx1ZUNyZHQ6IFYpID0+IGFueSkge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgbWFwLmtleXMoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVGdW5jKG1hcC5nZXQoa2V5KSBhcyBWKTtcbiAgICAgICAgICAgIGlmIChrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W3R5cGVOYW1lICsgXCI6XCIgKyBrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlzU29GYXIuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBLZXkgY29uZmxpY3RcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGtleTogXCIgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgd2hlbiBrZXlDb25mbGljdFJ1bGU9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3RcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25mbGljdGVkS2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHBhbmQgdGhlIGV4aXN0aW5nIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mbGljdGVkS2V5c1NvRmFyLmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4cGFuZGVkOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRba2V5c1NvRmFyLmdldChrZXkpIGFzIHN0cmluZ10gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gZXhwYW5kZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKG9iamVjdFtrZXldIGFzIEpzb25JbmRleFR5cGUpW3R5cGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAga2V5c1NvRmFyLnNldChrZXksIHR5cGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhpcyBvYmplY3QgYW5kIHRoZW4gcGVyZm9ybXMgb3BlcmF0aW9ucyB0b1xuICAgICAqIGRyaXZlIGl0cyB2YWx1ZSB0byB0aGUgZ2l2ZW4gSlNPTi1saWtlIE9iamVjdC5cbiAgICAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBib29sZWFucywgbnVtYmVycywgc3RyaW5ncyxcbiAgICAgKiBTZXRzLCBvciBvYmplY3RzIGFyZSBpZ25vcmVkOyBvYmplY3RzIGJlc2lkZXMgU2V0c1xuICAgICAqIGFyZSBwcm9jZXNzZWQgcmVjdXJzaXZlbHkuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogSWYgbmV3VmFsdWUgY29tZXMgZnJvbSBhIEpzb25DcmR0J3MgLnZhbHVlIG9yIGdldEFzT2JqZWN0XG4gICAgICogbWV0aG9kcywgbm90ZSB0aGF0IHNldHMvYXJyYXlzIG9mIHN0cmluZ3MgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBtdWx0aS12YWx1ZSByZWdpc3RlcnMgd2lsbCBiZSB0cmVhdGVkIGFzIHNldHMsIG5vdFxuICAgICAqIHN0cmluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG5ld1ZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdG8uXG4gICAgICogQHBhcmFtIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XG4gICAgICogSWYgbmV3VmFsdWUgd2FzIGdlbmVyYXRlZCBieSBnZXRBc09iamVjdCwgdGhlIGtleUNvbmZsaWN0UnVsZVxuICAgICAqIHVzZWQgdG8gZ2VuZXJhdGUgaXQsIHNvIHRoYXQgd2UgY2FuIHVuZG8gdGhlIGVmZmVjdFxuICAgICAqIG9mIHRoYXQgcnVsZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiBrZXlzIGFuZCB2YWx1ZXMgYXJlIHVzZWQgbGl0ZXJhbGx5LFxuICAgICAqIHdpdGggaW5mZXJyZWQgdHlwZXMuXG4gICAgICogVGhpcyBpcyBhcHByb3ByaWF0ZSBmb3IgT2JqZWN0cyBub3QgY29taW5nIGZyb20gYSBKc29uQ3JkdCdzXG4gICAgICogZ2V0QXNPYmplY3QgZnVuY3Rpb24sIGluIHdoaWNoIHdlIHdhbnQgdG8ga2VlcCBrZXlzIGFzXG4gICAgICogdGhleSBhcmUuXG4gICAgICogLSBQcmVmaXhUeXBlczogVHlwZXMgYXJlIHRha2VuIGZyb20gcHJlZml4ZXMgb24ga2V5cy4gIElmIGFcbiAgICAgKiBrZXkgZG9lcyBub3QgaGF2ZSBhIHR5cGUgcHJlZml4LCBpdCBpcyBpZ25vcmVkLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogb2JqZWN0cyB3aXRoIGEgcHJvcGVydHkgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIgc2V0XG4gICAgICogdG8gdHJ1ZSBhcmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHJlc3VsdCBvZiBleHBhbmRpbmcgYVxuICAgICAqIGtleSBkdWUgdG8gYSBjb25mbGljdC4gIElmIHN1Y2ggYW4gb2JqZWN0IGRvZXMgbm90IGhhdmVcbiAgICAgKiB0aGUgZXhwZWN0ZWQgZm9ybWF0LCBhbnkgcHJvcGVydGllcyB3aXRoIHVucmVjb2duaXplZCBuYW1lc1xuICAgICAqIGFyZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHNldFRvT2JqZWN0KG5ld1ZhbHVlOiBPYmplY3QsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMubWVyZ2VPYmplY3RJbnRlcm5hbChuZXdWYWx1ZSwgbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gb3BlcmF0aW9ucyB0byBkcml2ZSB0aGlzIENyZHQncyB2YWx1ZSB0byB0aGVcbiAgICAgKiBnaXZlbiBKU09OLWxpa2UgT2JqZWN0J3Mgc3RhdGUsIGJ1dCB3aXRob3V0IHJlc2V0dGluZ1xuICAgICAqIHRoZSBjdXJyZW50IHZhbHVlLiAgVGhlIG1haW4gZWZmZWN0IG9mIHRoaXMgaXMgdG9cbiAgICAgKiBtZXJnZSBrZXlzOyBpbiBjYXNlIG9mIGtleSBjb25mbGljdHMsIHRoZSB2YWx1ZXMgYXJlIG1lcmdlZFxuICAgICAqIGluIGEgdHlwZS1zcGVjaWZpYyB3YXkgKFRPRE86IGRldGFpbHMpLlxuICAgICAqXG4gICAgICogTm90ZSB0aGlzIGlzIG5vdCBhIG1lcmdlIGluIHRoZSBzZW5zZSBvZiBhIHN0YXRlLWJhc2VkIENyZHQuXG4gICAgICogSW5zdGVhZCwgaXQgdGhlIENyZHQgdmVyc2lvbiBvZiBtZXJnaW5nIG9yZGluYXJ5IChub24tQ3JkdClcbiAgICAgKiBPYmplY3RzLCBieSByZWN1cnNpdmVseSBjb21iaW5pbmcgdGhlaXIga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogVE9ETzogZm9yIG5vdywgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgdG8gc2V0cy5cbiAgICAgKlxuICAgICAqIFNlZSB0aGUgZGVzY3JpcHRpb24gb2Ygc2V0VG9PYmplY3QgZm9yIGRpc2NsYWltZXJzIGFuZFxuICAgICAqIG90aGVyS2V5Q29uZmxpY3RSdWxlLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgY2hhbmdlcz9cbiAgICAgKiBAcGFyYW0gIG90aGVyIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBtZXJnZU9iamVjdChvdGhlcjogT2JqZWN0LCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5tZXJnZU9iamVjdEludGVybmFsKG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBtZXJnZU9iamVjdEludGVybmFsKG90aGVyOiBKc29uSW5kZXhUeXBlLCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShvdGhlcktleUNvbmZsaWN0UnVsZSk7XG5cbiAgICAgICAgLy8gRXh0cmFjdCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5IG9mIFtuYW1lLCB0eXBlLCB2YWx1ZV1cbiAgICAgICAgbGV0IHByb3BlcnRpZXM6IEFycmF5PFtzdHJpbmcsIHN0cmluZywgYW55XT4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gb3RoZXIpIHtcbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWUgPSBvdGhlcltwcm9wTmFtZV07XG4gICAgICAgICAgICBsZXQgdHlwZTogc3RyaW5nO1xuICAgICAgICAgICAgaWYgKG90aGVyS2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHByb3BOYW1lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgICAgICB0eXBlID0gcHJvcE5hbWUuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHByb3BOYW1lID0gcHJvcE5hbWUuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vIE11bHRpLXZhbHVlZCBzdHJpbmdzIGFyZSB0cmVhdGVkIGFzIHNldHNcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCB0eXBlLCBvdGhlcltwcm9wTmFtZV1dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGUgcHJvcGVydGllcyBtYXkgZ3JvdyBkdXJpbmcgZXhlY3V0aW9uIGR1ZSB0b1xuICAgICAgICAvLyB1bnBhY2tpbmcgZXhwYW5kZWQga2V5cy5cbiAgICAgICAgbGV0IG9yaWdpbmFsTGVuZ3RoID0gcHJvcGVydGllcy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByb3BOYW1lID0gcHJvcGVydGllc1tpXVswXTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gcHJvcGVydGllc1tpXVsxXTtcbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWUgPSBwcm9wZXJ0aWVzW2ldWzJdO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGFuIGV4cGFuZGVkIGtleVxuICAgICAgICAgICAgaWYgKG90aGVyS2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0ICYmXG4gICAgICAgICAgICAgICAgICAgIGkgPCBvcmlnaW5hbExlbmd0aCAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcHJvcFZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtcImpzb25DcmR0S2V5RXhwYW5kZWRcIl0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBVbnBhY2sgdGhlIG9iamVjdCBvbnRvIHRoZSBlbmQgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGV4cGFuZGVkTmFtZSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGFuZGVkTmFtZSAhPT0gXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChbcHJvcE5hbWUsIGV4cGFuZGVkTmFtZSwgcHJvcFZhbHVlW2V4cGFuZGVkTmFtZV1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHByb3BlcnR5LCBjaGVja2luZyB0aGF0IGl0J3MgdHlwZVxuICAgICAgICAgICAgICAgIC8vIGlzIG9uZSB3ZSBleHBlY3QuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdDogbWVyZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmluaXQocHJvcE5hbWUsIHt9KSBhcyBKc29uQ3JkdCkubWVyZ2VPYmplY3RJbnRlcm5hbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUsIG90aGVyS2V5Q29uZmxpY3RSdWxlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmc6IG92ZXJ3cml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUludGVybmFsKHByb3BOYW1lLCBwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwic2V0XCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0OiBhZGQgYWxsIHZhbHVlcyBpbiBzZXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldENyZHQgPSB0aGlzLmluaXQocHJvcE5hbWUsIG5ldyBTZXQoKSkgYXMgQWRkV2luc1NldDxhbnk+O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBwcm9wVmFsdWUpIHNldENyZHQuYWRkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBza2lwIHRoZSBlbnRyeSAobm90IGEgcmVjb2duaXplZCB0eXBlKS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGlzLmdldEFzT2JqZWN0KCkuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCk6IE9iamVjdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFzT2JqZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGlzLnNldEFzT2JqZWN0KG5ld1ZhbHVlKS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IE9iamVjdCkge1xuICAgICAgICB0aGlzLnNldFRvT2JqZWN0KG5ld1ZhbHVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDcmR0LCBDcmR0SW50ZXJuYWwgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcbmltcG9ydCB7IFNlbWlkaXJlY3RTdGF0ZSwgU2VtaWRpcmVjdEludGVybmFsIH0gZnJvbSBcIi4vc2VtaWRpcmVjdFwiO1xuaW1wb3J0IHsgQ2F1c2FsVGltZXN0YW1wLCBDcmR0UnVudGltZSB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5cbi8vIFRPRE86IGhvdyB0byBkbyBnYXJiYWdlIGNvbGxlY3Rpb24gb2YgcmVzZXQtd2lucyBvcGVyYXRpb25zP1xuLy8gRS5nLiBmb3IgZmxhZ3MgaW4gYSBzZXQ6IGdhcmJhZ2UgY29sbGVjdGlvbiB3aWxsIGZhaWwgaWZcbi8vIHRoZXJlIGFyZSByZXNldC13aW5zIG9wcyBpbiB0aGUgaGlzdG9yeSwgYXMgaXQgc2hvdWxkLCBidXRcbi8vIHdlIHdvdWxkIGxpa2UgdG8gZ2FyYmFnZSBjb2xsZWN0IGFueXdheSBvbmNlIGFsbCB0aGUgcmVzZXQtd2luc1xuLy8gYXJlIGNhdXNhbGx5IHN0YWJsZS5cbmV4cG9ydCBjbGFzcyBSZXNldFdpbnNDb21wb25lbnQ8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJlc2V0SW5pdGlhbERhdGE6IGFueSkgeyB9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFMpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwicmVzZXRcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgYWx3YXlzIFwicmVzZXRcIi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogc3RyaW5nLCBfc3RhdGU6IFMsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIHN0cmluZ10ge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIHdlIHNob3VsZCByZXR1cm4gYSBjbG9uZSBvZiB0aGUgcmVzZXQgc3RhdGUsIG5vdFxuICAgICAgICAvLyBhIGZpeGVkIFwicmVzZXQgc3RhdGVcIiwgc2luY2UgdGhlIHJldHVybmVkIHN0YXRlIG1heVxuICAgICAgICAvLyBiZSBtdXRhdGVkIGxhdGVyLlxuICAgICAgICByZXR1cm4gW3RoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZSh0aGlzLnJlc2V0SW5pdGlhbERhdGEpLCBcInJlc2V0XCJdO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUbzxTPihvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSkgOiBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4ge1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxTPihcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdCwgbmV3IFJlc2V0V2luc0NvbXBvbmVudChvcmlnaW5hbENyZHQsXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhKSxcbiAgICAgICAgICAgIChfbTIgOiBzdHJpbmcsIF9tMTogYW55KSA9PiBudWxsLFxuICAgICAgICAgICAgMSwgZmFsc2UsIGZhbHNlLCB0cnVlXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlc2V0V2luc0NyZHQ8Uz5cbiAgICAgICAgZXh0ZW5kcyBDcmR0PFNlbWlkaXJlY3RTdGF0ZTxTPj4ge1xuICAgIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHRJbnRlcm5hbFJlc2V0V2luczogQ3JkdEludGVybmFsPFM+O1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBvcmlnaW5hbENyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55LFxuICAgICAgICAgICAgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IFJlc2V0V2luc0NvbXBvbmVudC5hZGRUbyhcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhXG4gICAgICAgICk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsUmVzZXRXaW5zID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0U3Ryb25nKCkge1xuICAgICAgICBzdXBlci5hcHBseU9wKFsyLCBcInJlc2V0XCJdKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRTdHJvbmdNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gWzIsIFwicmVzZXRcIl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsxLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zIGluc3RlYWQgb2YgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBUcmFuc2xhdGVzIGludGVybmFsIChzZW1pZGlyZWN0IHByb2R1Y3QtYmFzZWQpIGRlc2NyaXB0aW9uc1xuICAgICAqIHNvIHRoYXQ6XG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYSByZXNldC13aW5zIG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0U3Ryb25nXCJdLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgaXQgY2hhbmdlZCB0aGUgc3RhdGUuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3BlcmF0aW9uIHRoYXQgZ2V0cyBraWxsZWQgYnlcbiAgICAgKiBhIGNvbmN1cnJlbnQgcmVzZXQtd2lucyBpcyBza2lwcGVkLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogb3BlcmF0aW9ucyBpcyB1bmNoYW5nZWQsIGV4Y2VwdCBmb3IgbnVsbCBkZXNjcmlwdGlvbnMsXG4gICAgICogd2hpY2ggYXJlIHNraXBwZWQuXG4gICAgICogVGhlbiByZXR1cm5zIHRoZSByZXN1bHQgb2YgcGFzc2luZyB0aGlzIGxpc3QgdG9cbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMsIG9yIG51bGwgaWYgYWxsXG4gICAgICogZGVzY3JpcHRpb25zIGFyZSBudWxsLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgZGVzYyBvZiBkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChkZXNjID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXdpbnMgZGVzY3JpcHRpb24gaXMgWzIsIFwicmVzZXRcIl1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDIgJiYgZGVzY1sxXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKFtcInJlc2V0U3Ryb25nXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsQ3JkdE9wZXJhdGlvbiBpcyBvZiB0aGUgZm9ybSBbMSwgZGVzY11cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzY1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVkLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKHRyYW5zbGF0ZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG5cbiAgICBnZXQgb3JpZ2luYWxTdGF0ZVJlc2V0V2lucygpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG59XG5cbi8vIFRPRE86IHJlbmFtZSBvcmlnaW5hbENyZHRJbnRlcm5hbCAoYWJvdmUpIGFuZCBvcmlnaW5hbENyZHRcbi8vIHRvIHJlZmxlY3QgcmVzZXQtd2lucyB2cyByZXNldCwgdG8gYXZvaWQgY29uZnVzaW9uLlxuXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZWRSZXNldENvbXBvbmVudDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmVzZXRJbml0aWFsRGF0YTogYW55KSB7IH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogUykge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBbXCJyZXNldFwiLCBsaXN0IG9mXG4gICAgICogdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieSBvcmlnaW5hbENyZHQgd2hlbiBwcm9jZXNzaW5nXG4gICAgICogdGhlIG1lc3NhZ2VzIGFwcGVhcmluZyBpbiBtZXNzYWdlIChpLmUuLCB0aGUgbWVzc2FnZXMgdGhhdFxuICAgICAqIGF2b2lkZWQgYmVpbmcgcmVzZXQgYmVjYXVzZSB0aGV5IHdlcmUgY29uY3VycmVudCB0byB0aGVcbiAgICAgKiByZXNldCBvcGVyYXRpb24pXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogQXJyYXk8W2FueSwgQ2F1c2FsVGltZXN0YW1wXT4sIF9zdGF0ZTogUyxcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgW3N0cmluZywgQXJyYXk8YW55Pl1dIHtcbiAgICAgICAgbGV0IHJlc2V0U3RhdGUgPSB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBjb25jdXJyZW50TWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5vcmlnaW5hbENyZHQuZWZmZWN0KGNvbmN1cnJlbnRNZXNzYWdlWzBdLFxuICAgICAgICAgICAgICAgIHJlc2V0U3RhdGUsIHJlcGxpY2FJZCwgY29uY3VycmVudE1lc3NhZ2VbMV0pO1xuICAgICAgICAgICAgcmVzZXRTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyZXNldFN0YXRlLCBbXCJyZXNldFwiLCBkZXNjcmlwdGlvbnNdXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVG88Uz4ob3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhOiBhbnksIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSA6IFNlbWlkaXJlY3RJbnRlcm5hbDxTPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2VtaWRpcmVjdEludGVybmFsPFM+KFxuICAgICAgICAgICAgbmV3IE9ic2VydmVkUmVzZXRDb21wb25lbnQob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSxcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdCxcbiAgICAgICAgICAgIChtMjogW2FueSwgQ2F1c2FsVGltZXN0YW1wXSwgbTE6IEFycmF5PFthbnksIENhdXNhbFRpbWVzdGFtcF0+KSA9PlxuICAgICAgICAgICAgICAgIHttMS5wdXNoKG0yKTsgcmV0dXJuIG0xfSxcbiAgICAgICAgICAgIDIsIHRydWUsIHRydWUsIGtlZXBPbmx5TWF4aW1hbFxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxTPlxuICAgICAgICBleHRlbmRzIERlZmF1bHRSZXNldFdpbnNDcmR0PFNlbWlkaXJlY3RTdGF0ZTxTPj4ge1xuICAgIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+O1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgb3JpZ2luYWxDcmR0SW50ZXJuYWw6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IGFueSxcbiAgICAgICAgICAgIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IE9ic2VydmVkUmVzZXRDb21wb25lbnQuYWRkVG8oXG4gICAgICAgICAgICBvcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbFxuICAgICAgICApO1xuICAgICAgICBzdXBlcihpZCwgY3JkdFdyYXBwZWQsIHJlc2V0SW5pdGlhbERhdGEsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCA9IG9yaWdpbmFsQ3JkdEludGVybmFsO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBvcCBpZiB3ZSdyZSBhbHJlYWR5IHJlc2V0IChva2F5IGdpdmVuXG4gICAgICAgIC8vIG9ic2VydmUtcmVzZXQgc2VtYW50aWNzKS5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKSkge1xuICAgICAgICAgICAgc3VwZXIuYXBwbHlPcChbMSwgXCJyZXNldFwiXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICAvLyBOb3RlIGhlcmUgd2UgaGF2ZSB0byBhY2NvdW50IGZvciB0aGUgcmVzZXQtd2lucyBsYXllclxuICAgICAgICAvLyAoaXQncyBub3Qgd3JhcHBlZCBhdXRvbWF0aWNhbGx5IGxpa2UgaW4gc3VwZXIuYXBwbHlPcHMpLlxuICAgICAgICByZXR1cm4gWzEsIFsxLCBbXV1dO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSBvcGVyYXRpb25zIGludGVuZGVkIGZvciB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAqIGJ5IHRyYW5zbGF0aW5nIHRoZW0gZm9yIHRoZSByZXNldHRhYmxlIENSRFQgYW5kIGNhbGxpbmdcbiAgICAgKiBzdXBlci5hcHBseU9wcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXBwbHlPcChvcGVyYXRpb246IGFueSkgOiBhbnkge1xuICAgICAgICByZXR1cm4gc3VwZXIuYXBwbHlPcChbMiwgb3BlcmF0aW9uXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YmNsYXNzZXMgdGhhdCB3YW50IHRvIHRyYW5zbGF0ZSBvcGVyYXRpb25zIGZyb21cbiAgICAgKiB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsIHNob3VsZCBvdmVycmlkZVxuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvYnNlcnZlZC1yZXNldCBvcGVyYXRpb24gaXNcbiAgICAgKiBbXCJyZXNldFwiLCBbVE9ETzogcmUtYXBwbGllZCBvcHNdXS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcmlnaW5hbENyZHRJbnRlcm5hbFxuICAgICAqIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucywgd2hpY2hcbiAgICAgKiBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUsIG9yIG51bGwgaWYgYWxsXG4gICAgICogZGVzY3JpcHRpb25zIGFyZSBudWxsLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgZGVzYyBvZiBkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChkZXNjID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXN0cm9uZyAoYWxyZWFkeSB0cmFuc2xhdGVkIGJ5IERlZmF1bHRSZXNldFdpbnNDcmR0KVxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb24gaXMgXCJyZXNldFN0cm9uZ1wiXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPYnNlcnZlZCByZXNldCBkZXNjcmlwdGlvbiBpcyBbMSwgW1wicmVzZXRcIixcbiAgICAgICAgICAgIC8vIGxpc3Qgb2YgcmUtYXBwbGllZCBvcHNdXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMSAmJiBkZXNjWzFdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbiB0aGUgc2Vjb25kIGVudHJ5LCBwdXQgdGhlIHRyYW5zbGF0ZWRcbiAgICAgICAgICAgICAgICAvLyBvcGVyYXRpb25zIHRoYXQgZGlkbid0IGdldCByZXNldC4gIEtlZXAgaW5cbiAgICAgICAgICAgICAgICAvLyBtaW5kIHRoYXQgdGhlc2Ugd2lsbCBiZSBkZXNjcmlwdGlvbnMgZnJvbSB0aGVcbiAgICAgICAgICAgICAgICAvLyBpbm5lcm1vc3Qgc2VtaWRpcmVjdCBwcm9kdWN0LiAgV2hhdCB0byBkb1xuICAgICAgICAgICAgICAgIC8vIGFib3V0IG9wZXJhdGlvbnMgdGhhdCB3ZXJlIG9yaWdpbmFsbHkgZ3JvdXBlZFxuICAgICAgICAgICAgICAgIC8vIGF0b21pY2FsbHksIHNpbmNlIHRyYW5zbGF0ZSBleHBlY3RzIHRob3NlXG4gICAgICAgICAgICAgICAgLy8gdG8gYmUgZGVsaXZlcmVkIHRvZ2V0aGVyP1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFwiLCBkZXNjWzFdWzFdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzIsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUodHJhbnNsYXRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpbnN0ZWFkIG9mIHRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKiBTZWUgQ3JkdC50cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG5cbiAgICBnZXQgb3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUoKTogUyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDYXVzYWxUaW1lc3RhbXAgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ3JkdEludGVybmFsIH0gZnJvbSBcIi4vY3JkdF9jb3JlXCI7XG5cbi8vIFRPRE86IGZ1dHVyZSBvcHRzOiBpbmRleGVkIG1lc3NhZ2VzOyBzZXR0aW5nIHRoZSBoaXN0b3J5XG4vLyB0byBhIHN1YnNldDsgY2F1c2FsIHN0YWJpbGl0eS5cbi8vIFRPRE86IGZvciB0aGlzIHRvIHdvcmssIHJlcGxpY2FJZCdzIG11c3QgYmUgY29tcGFyYWJsZSBhY2NvcmRpbmdcbi8vIHRvIHRoZSBzYW1lLWVxdWFscyBhcHByb2FjaC4gIFR5cGljYWxseSwgdGhpcyByZXF1aXJlcyB0aGVtXG4vLyB0byBiZSBwcmltaXRpdmUgdHlwZXMsIGFzIG9iamVjdHMgd2hpY2ggYXJlIGVxdWFsLXZhbHVlZCBidXQgaGF2ZVxuLy8gZGlmZmVyZW50IHBvaW50ZXJzIHdpbGwgYmUgY29uc2lkZXJlZCBkaWZmZXJlbnQuXG4vLyBUT0RPOiBtZW50aW9uIHRoYXQgdG8gZ2V0IGEgcHJvcGVyIENSRFQgKGVxdWFsIGludGVybmFsIHN0YXRlcyksXG4vLyB3ZSB0ZWNobmljYWxseSBtdXN0IGNvbXBhcmUgcmVjZWlwdCBvcmRlcnMgYXMgZXF1aXZhbGVudCBpZlxuLy8gdGhleSBhcmUgYm90aCBpbiBjYXVzYWwgb3JkZXIuXG5leHBvcnQgY2xhc3MgU2VtaWRpcmVjdFN0YXRlPFM+IHtcbiAgICBwcml2YXRlIHJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAvKipcbiAgICAgKiBNYXBzIGEgcmVwbGljYSBpZCB0byBhbiBhcnJheSBvZiBtZXNzYWdlcyBzZW50IGJ5IHRoYXRcbiAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIFNwZWNpZmljYWxseSwgYXJyYXkgZWxlbWVudHMgYXJlIHR1cGxlc1xuICAgICAqIFtwZXItc2VuZGVyIG1lc3NhZ2UgY291bnRlciwgdGhpcyByZXBsaWNhJ3MgcmVjZWlwdCBjb3VudGVyLFxuICAgICAqIG1lc3NhZ2VdLiAgS2VlcCBpbiBtaW5kIHRoYXQgcGVyLXNlbmRlciBtZXNzYWdlXG4gICAgICogY291bnRlcnMgbWF5IG5vdCBiZSBjb250aWd1b3VzLCBzaW5jZSB0aGV5IGFyZSBzaGFyZWQgYmV0d2VlblxuICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gQ3JkdFJ1bnRpbWUgYW5kIGJldHdlZW5cbiAgICAgKiBhIHNlbWlkaXJlY3QgcHJvZHVjdCBhbmQgaXRzIGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaXN0b3J5OiBNYXA8YW55LCBBcnJheTxbbnVtYmVyLCBudW1iZXIsIGFueV0+PiA9IG5ldyBNYXAoKTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW50ZXJuYWxTdGF0ZTogUyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlUaW1lc3RhbXBzOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkOiBib29sZWFuKSB7IH1cbiAgICAvKipcbiAgICAgKiBBZGQgbWVzc2FnZSB0byB0aGUgaGlzdG9yeSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAuXG4gICAgICogcmVwbGljYUlkIGlzIG91ciByZXBsaWNhIGlkLlxuICAgICAqL1xuICAgIGFkZChyZXBsaWNhSWQ6IGFueSwgbWVzc2FnZTogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpO1xuICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW5kZXJIaXN0b3J5ID0gW107XG4gICAgICAgICAgICB0aGlzLmhpc3Rvcnkuc2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgc2VuZGVySGlzdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1lc3NhZ2VNYXliZVdpdGhUaW1lc3RhbXAgPSB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzP1xuICAgICAgICAgICAgICAgIFttZXNzYWdlLCB0aW1lc3RhbXBdOiBtZXNzYWdlO1xuICAgICAgICBzZW5kZXJIaXN0b3J5LnB1c2goW3RpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCksIHRoaXMucmVjZWlwdENvdW50ZXIsIG1lc3NhZ2VNYXliZVdpdGhUaW1lc3RhbXBdKTtcbiAgICAgICAgdGhpcy5yZWNlaXB0Q291bnRlcisrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aGUgZ2l2ZW5cbiAgICAgKiB0aW1lc3RhbXAsIGluIHNvbWUgY2F1c2FsIG9yZGVyIChzcGVjaWZpY2FsbHksIHRoaXMgcmVwbGljYSdzXG4gICAgICogcmVjZWlwdCBvcmRlcikuICBJZiB3ZSBhcmUgdGhlIHNlbmRlciAoaS5lLiwgcmVwbGljYUlkID09PVxuICAgICAqIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSksIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdGltZXN0YW1wIGlzXG4gICAgICogY2F1c2FsbHkgZ3JlYXRlciB0aGFuIGFsbCBwcmlvciBtZXNzYWdlcywgYXMgZGVzY3JpYmVkIGluXG4gICAgICogQ3JkdEludGVybmFsLmVmZmVjdCwgaGVuY2UgW10gaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgZ2V0Q29uY3VycmVudChyZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgdHJ1ZSxcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBzcGVjaWZpZWQgYWN0aW9ucyBvbiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3Rvcnk6XG4gICAgICogLSBpZiByZXR1cm5Db25jdXJyZW50IGlzIHRydWUsIHJldHVybnMgdGhlIGxpc3Qgb2ZcbiAgICAgKiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aW1lc3RhbXAsIGluXG4gICAgICogcmVjZWlwdCBvcmRlci5cbiAgICAgKiAtIGlmIGRpc2NhcmREb21pbmF0ZWQgaXMgdHJ1ZSwgZGVsZXRlcyBhbGwgbWVzc2FnZXMgZnJvbVxuICAgICAqIHRoZSBoaXN0b3J5IHdob3NlIHRpbWVzdGFtcHMgYXJlIGNhdXNhbGx5IGRvbWluYXRlZCBieVxuICAgICAqIG9yIGVxdWFsIHRvIHRoZSBnaXZlbiB0aW1lc3RhbXAuICAoTm90ZSB0aGF0IHRoaXMgbWVhbnMgdGhhdFxuICAgICAqIGlmIHdlIHdhbnQgdG8ga2VlcCBhIG1lc3NhZ2Ugd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wIGluXG4gICAgICogdGhlIGhpc3RvcnksIGl0IG11c3QgYmUgYWRkZWQgdG8gdGhlIGhpc3RvcnkgYWZ0ZXIgY2FsbGluZ1xuICAgICAqIHRoaXMgbWV0aG9kLilcbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkOiBhbnksXG4gICAgICAgICAgICB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudDogYm9vbGVhbixcbiAgICAgICAgICAgIGRpc2NhcmREb21pbmF0ZWQ6IGJvb2xlYW4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcncyBjb25jdXJyZW50LCBzbyBjbGVhciBldmVyeXRoaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5LmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2F0aGVyIHVwIHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzLiAgVGhlc2UgYXJlIGFsbFxuICAgICAgICAvLyBtZXNzYWdlcyBieSBlYWNoIHJlcGxpY2FJZCB3aXRoIHNlbmRlciBjb3VudGVyXG4gICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpLmdldChyZXBsaWNhSWQpLlxuICAgICAgICBsZXQgY29uY3VycmVudDogQXJyYXk8W251bWJlciwgbnVtYmVyLCBhbnldPiA9IFtdO1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB2Yy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldChlbnRyeVswXSk7XG4gICAgICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnRJbmRleFN0YXJ0ID1cbiAgICAgICAgICAgICAgICAgICAgU2VtaWRpcmVjdFN0YXRlLmluZGV4QWZ0ZXIoc2VuZGVySGlzdG9yeSwgZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb25jdXJyZW50SW5kZXhTdGFydDsgaSA8IHNlbmRlckhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmN1cnJlbnQucHVzaChzZW5kZXJIaXN0b3J5W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIG1lc3NhZ2VzIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLy8gPj0gY29uY3VycmVudEluZGV4U3RhcnRcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVySGlzdG9yeS5zcGxpY2UoMCwgY29uY3VycmVudEluZGV4U3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxldGUgaXQgZnJvbSB0aGUgbWFwIGlmIGVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBhIGZvcm0gb2YgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsc28gbWFrZXMgaXNIaXN0b3J5RW1wdHkgc2ltcGxlci5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNvcnQgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMgaW4gcmVjZWlwdCBvcmRlciAoaS5lLixcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBzZWNvbmQgZW50cnkgaW4gZWFjaCB0cmlwbGUpLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYVsxXSAtIGJbMV0pKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQubWFwKGEgPT4gYVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBtZXNzYWdlcyBzdG9yZWQgaW4gdGhlIGhpc3RvcnksXG4gICAgICogaS5lLiwgZWl0aGVyIHRoZXJlIGhhdmUgYmVlbiBubyBjcmQxIG1lc3NhZ2VzLCBvclxuICAgICAqIG91ciBTZW1pZGlyZWN0SW50ZXJuYWwncyBoaXN0b3J5S2VlcE9ubHlDb25jdXJyZW50IGZsYWcgaXMgdHJ1ZVxuICAgICAqIGFuZCBhbGwgY3JkdDEgbWVzc2FnZXMgaGF2ZSBiZWVuIGNhdXNhbGx5IGxlc3MgdGhhbiBhIGNyZHQyXG4gICAgICogbWVzc2FnZS5cbiAgICAgKi9cbiAgICBpc0hpc3RvcnlFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5oaXN0b3J5LnZhbHVlcygpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIHdvcmtpbmcgd2l0aCB0aGUgcGVyLXNlbmRlciBoaXN0b3J5XG4gICAgICogYXJyYXlzLiAgUmV0dXJucyB0aGUgaW5kZXggYWZ0ZXIgdGhlIGxhc3QgZW50cnkgd2hvc2VcbiAgICAgKiBwZXItc2VuZGVyIGNvdW50ZXIgKHRoZSBmaXJzdCB0dXBsZSBlbGVtZW50KSBpcyA8PVxuICAgICAqIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGluZGV4QWZ0ZXIoc3BhcnNlQXJyYXk6IEFycmF5PFtudW1iZXIsIG51bWJlciwgYW55XT4sXG4gICAgICAgICAgICB2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy8gVE9ETzogYmluYXJ5IHNlYXJjaCB3aGVuIHNwYXJzZUFycmF5IGlzIGxhcmdlXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGVyZSBtYXkgYmUgZHVwbGljYXRlIHRpbWVzdGFtcHMuXG4gICAgICAgIC8vIFNvIGl0IHdvdWxkIGJlIGluYXBwcm9wcmlhdGUgdG8gZmluZCBhbiBlbnRyeSB3aG9zZVxuICAgICAgICAvLyBwZXItc2VuZGVyIGNvdW50ZXIgZXF1YWxzIHZhbHVlIGFuZCBpbmZlciB0aGF0XG4gICAgICAgIC8vIHRoZSBkZXNpcmVkIGluZGV4IGlzIDEgZ3JlYXRlci5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGFyc2VBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNwYXJzZUFycmF5W2ldWzBdID4gdmFsdWUpIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VtaWRpcmVjdEludGVybmFsPFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFNlbWlkaXJlY3RTdGF0ZTxTPj4ge1xuICAgIC8qKlxuICAgICAqIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRpbmcgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBvZlxuICAgICAqIGNyZHQxIGFuZCBjcmR0MiB3aXRoIHRoZSBnaXZlbiBhY3Rpb24sIHdoaWNoIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAobTI6IGNyZHQyIG1lc3NhZ2UsIG0xOiBjcmR0MSBtZXNzYWdlKTogY3JkdDEgbWVzc2FnZS5cbiAgICAgKiBjcmR0MSwgY3JkdDIsIGFuZCBhY3Rpb24gbXVzdCBzYXRpc2Z5IHRoZSBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICAgKiBhc3N1bXB0aW9ucyBmcm9tIG91ciBwYXBlci5cbiAgICAgKlxuICAgICAqIFRPRE86IG9wdGlvbnMgYW5kIHRoZWlyIHRoZW9yZXRpY2FsIHNpZ25pZmljYW5jZS4gIEZvcm1hbGx5LFxuICAgICAqIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSBtZWFucyB0aGF0IHRpbWVzdGFtcHMgYmVjb21lXG4gICAgICogcGFydCBvZiB0aGUgY3JkdDIgbWVzc2FnZXMuICBBbHNvIGNyZWF0ZUNyZHRJbmRleC5cbiAgICAgKiBEb21pbmF0ZWQgc3RhdHMgY29udHJvbCB3aGV0aGVyIHlvdSBkaXNjYXJkIG1lc3NhZ2VzIGluIHRoZVxuICAgICAqIGhpc3RvcnkgdGhhdCBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGNyZHQxL2NyZHQyIG1lc3NhZ2VzO1xuICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoYXQgYWN0aW9uIGlzIHRoZSBzYW1lIHdpdGggdGhvc2UgbWVzc2FnZXNcbiAgICAgKiBkaXNjYXJkZWQuICBJZiBkb21pbmF0ZWQxIGlzIHNldCwgdGhlbiBzdGF0ZS5pc0hpc3RvcnlFbXB0eSgpXG4gICAgICogYmVjb21lcyAodGhlcmUgZXhpc3RzIGEgY3JkdDIgbWVzc2FnZSBub3QgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGFcbiAgICAgKiBjcmR0MSBtZXNzYWdlKS4gIENoZWNrIHRoaXMgaXMgc3RpbGwgdHJ1ZSBpZiBkb21pbmF0ZWQyIGlzIHNldC4pXG4gICAgICogRXhwbGFpbiBleGFtcGxlcyB3aGVyZSB0aGlzIGlzIHVzZWQgKHJlc2V0dGFibGUsIGZsYWdzKTsgaXQnc1xuICAgICAqIG5vdCBxdWl0ZSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHNwaXJpdCB1bmxlc3MgeW91IHRoaW5rXG4gICAgICogb2YgaXQgYXMgdXNpbmcgdGhlIGhpc3RvcnkgYXMgcGFydCBvZiB0aGUgY3JkdDEvMiBzdGF0ZS5cbiAgICAgKiBQb3RlbnRpYWwgb3B0aW1pemF0aW9uOiBvbmx5IGRlbGV0ZSBkb21pbmF0ZWQgbWVzc2FnZXMgd2hlblxuICAgICAqIHJlY2VpdmluZyBvdXIgb3duIG1lc3NhZ2UgKGl0J3MgYmFzaWNhbGx5IGZyZWUgYW5kIGFsd2F5c1xuICAgICAqIGNsZWFycyB0aGUgaGlzdG9yeSksIG9yIG9ubHkgc29tZXRpbWVzICh3aWxsIG1pc3Mgc29tZVxuICAgICAqIG1lc3NhZ2VzLCBzbyBuZWVkIHRvIGVuc3VyZSBjb3JyZWN0bmVzcyBpbiB0aGF0IGNhc2VcbiAgICAgKiAoSSB0aGluayBpdCBpcyBva2F5IGZvciBkb21pbmF0ZWQyIGJ1dCBub3QgZG9taW5hdGVkMSBpbiBvdXJcbiAgICAgKiB0YXJnZXQgdXNlIGNhc2VzKSwgYnV0XG4gICAgICogc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IGR1ZSB0byBiYXRjaGluZyBhbmQgc3RpbGwga2lsbFxuICAgICAqIG9mZiBtb3N0IG1lc3NhZ2VzKS4gIFRoaXMgdHJhZGVzIGEgc21hbGwgaW5jcmVhc2UgaW4gc3BhY2VcbiAgICAgKiB1c2FnZSBmb3IgYSBkZWNyZWFzZSBpbiBDUFUgdGltZS5cbiAgICAgKlxuICAgICAqIEFzIGRlc2NyaWJlZCBpbiBDcmR0SW50ZXJuYWwgYW5kIENyZHQsIG51bGwgbWVzc2FnZXMgYXJlIHRyZWF0ZWRcbiAgICAgKiBhcyB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gaWQsIGFsbG93aW5nIHRoZW0gdG8gYmUgb3B0aW1pemVkIGF3YXkuXG4gICAgICogQmVjYXVzZSBvZiB0aGlzLCBhY3Rpb24gd2lsbCBuZXZlciBiZSBjYWxsZWQgd2l0aCBudWxsIGFzXG4gICAgICogZWl0aGVyIGlucHV0LiAgSW5zdGVhZCwgd2UgYmVoYXZlIGFzIGlmXG4gICAgICogKGFjdGlvbihpZCAoaS5lLiwgbnVsbCksIG0xKSA9IG0xKVxuICAgICAqIGZvciBhbGwgbTEgYW5kIChhY3Rpb24obTIsIGlkKSA9IGlkKSBmb3IgYWxsIG0yLiAgVGhlIHNlbWlkaXJlY3RcbiAgICAgKiBwcm9kdWN0IGFzc3VtcHRpb25zIG11c3QgaG9sZCBnaXZlbiB0aGVzZSBhc3NpZ25tZW50cy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY3JkdDE6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZHQyOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBhY3Rpb246IChtMjogYW55LCBtMTogYW55KSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjcmVhdGVDcmR0SW5kZXg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoY3JlYXRlQ3JkdEluZGV4ICE9PSAxICYmIGNyZWF0ZUNyZHRJbmRleCAhPT0gMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVDcmR0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFNlbWlkaXJlY3RTdGF0ZTxTPiB7XG4gICAgICAgIGxldCBpbnRlcm5hbFN0YXRlOiBTO1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpIGludGVybmFsU3RhdGUgPSB0aGlzLmNyZHQxLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0U3RhdGUoaW50ZXJuYWxTdGF0ZSxcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkLFxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBUT0RPIChnZW5lcmFsKTogZXJyb3IgY2hlY2tpbmdcbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogW251bWJlciwgYW55XSwgc3RhdGU6IFNlbWlkaXJlY3RTdGF0ZTxTPixcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55KTogW251bWJlciwgYW55XSB8IG51bGwge1xuICAgICAgICBpZiAob3BlcmF0aW9uWzBdID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgb3AxID0gdGhpcy5jcmR0MS5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgIGlmIChvcDEgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gWzEsIG9wMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgb3AyID0gdGhpcy5jcmR0Mi5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgIGlmIChvcDIgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gWzIsIG9wMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS4gIEZvciB0aGlzLmNyZHQxXG4gICAgICogbWVzc2FnZXMsIHRoZSBkZXNjcmlwdGlvbiBpcyBmb3IgdGhlIGFjdGVkLW9uIG1lc3NhZ2UgdGhhdFxuICAgICAqIGlzIGFjdHVhbGx5IGFwcGxpZWQgdG8gdGhpcy5pbnRlcm5hbFN0YXRlLCBub3QgdGhlIGlucHV0XG4gICAgICogbWVzc2FnZS4gIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwgKG9yIGlmIHRoZSBtZXNzYWdlIGdldHMgYWN0ZWQgb24gdG8gYmVjb21lIG51bGwpLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogW251bWJlciwgYW55XSwgc3RhdGU6IFNlbWlkaXJlY3RTdGF0ZTxTPiwgcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NlbWlkaXJlY3RTdGF0ZTxTPiwgW251bWJlciwgYW55XSB8IG51bGxdIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VbMF0gPT09IDIpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHQyLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcm5hbFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgc3RhdGUuYWRkKHJlcGxpY2FJZCwgbWVzc2FnZVsxXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gW3N0YXRlLCBbMiwgcmVzdWx0WzFdXV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY29uY3VycmVudCA9IHN0YXRlLmdldENvbmN1cnJlbnQocmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgbGV0IG1BY3QgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbUFjdCA9IHRoaXMuYWN0aW9uKGNvbmN1cnJlbnRbaV0sIG1BY3QpO1xuICAgICAgICAgICAgICAgIGlmIChtQWN0ID09PSBudWxsKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHQxLmVmZmVjdChtQWN0LCBzdGF0ZS5pbnRlcm5hbFN0YXRlLFxuICAgICAgICAgICAgICAgIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFtzdGF0ZSwgWzEsIHJlc3VsdFsxXV1dO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEaXJlY3RJbnRlcm5hbDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgLyoqXG4gICAgICogRGlyZWN0IHByb2R1Y3Qgb2YgQ3JkdEludGVybmFsJ3MuICBUaGlzIGlzIHRoZVxuICAgICAqIHNwZWNpYWwgY2FzZSBvZiBTZW1pZGlyZWN0SW50ZXJuYWwgd2hlbiB0aGUgYWN0aW9uIGlzIHRyaXZpYWxcbiAgICAgKiAoKG1fMiwgbTEpID0+IG0xKS4gIEluIHRoaXMgY2FzZSB3ZSBjYW4gb3B0aW1pemVcbiAgICAgKiBieSBub3Qga2VlcGluZyB0aGUgaGlzdG9yeSBvciBhY3Rpbmcgb24gbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBGb3IgdGhpcyB0byBiZSBhIENyZHQsIGNvbmN1cnJlbnQgbWVzc2FnZXMgb2YgdGhlIHR3byBpbnB1dFxuICAgICAqIENyZHRzIG11c3QgY29tbXV0ZS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBjb25zdHJ1Y3Rpb24gaXMgc3ltbWV0cmljIChzd2l0Y2hpbmcgY3JkdDEgYW5kXG4gICAgICogY3JkdDIgZG9lc24ndCBjaGFuZ2UgdGhlIHNlbWFudGljcyksIGV4Y2VwdCBmb3Igc3dhcHBpbmdcbiAgICAgKiB0aGUgbWVhbmluZyBvZiB0aGUgbnVtYmVycyAxLzIgaW4gY3JlYXRlQ3JkdEluZGV4IGFuZFxuICAgICAqIGluIHRoZSBmaXJzdCBjb29yZGluYXRlcyBvZiBtZXNzYWdlcyBhbmQgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmVhdGVDcmR0SW5kZXggV2hpY2ggY3JkdCdzIGNyZWF0ZSBtZXRob2QgdG8gdXNlXG4gICAgICogaW4gY3JlYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjcmR0MTogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZHQyOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JlYXRlQ3JkdEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGNyZWF0ZUNyZHRJbmRleCAhPT0gMSAmJiBjcmVhdGVDcmR0SW5kZXggIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFMge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpIHJldHVybiB0aGlzLmNyZHQxLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogUyxcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55KTogW251bWJlciwgYW55XSB8IG51bGwge1xuICAgICAgICBsZXQgbWVzc2FnZTogYW55O1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQxLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5jcmR0Mi5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmR0IG51bWJlciBpbiBvcGVyYXRpb246IFwiICsgb3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gW29wZXJhdGlvblswXSwgbWVzc2FnZV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UvZGVzY3JwdGlvbiBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBtZXNzYWdlIGZvci9kZXNjcmlwdGlvbiBmcm9tIHRoYXQgY3JkdF0uXG4gICAgICogQW4gZXhjZXB0aW9uIGlzIGlmIHRoZSBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbFxuICAgICAqIGNyZHQgaXMgbnVsbCxcbiAgICAgKiB0aGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMganVzdCBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS5cbiAgICAgKiBUaGlzIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IGNhbGxpbmcgb25jaGFuZ2UuXG4gICAgICogVE9ETzogcGVyaGFwcyBhZGQgdHJhbnNsYXRpbmcgZGVzY3JpcHRpb25zIHRvIHRoaXMgY2xhc3MsIHNvXG4gICAgICogdGhlIENyZHQgZG9lc24ndCBoYXZlIHRvIHVuZGVyc3RhbmQgYWxsIG9mIHRoZSBsYXllcnMgYXRcbiAgICAgKiBvbmNlP1xuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogUywgcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIFtudW1iZXIsIGFueV0gfCBudWxsXSB7XG4gICAgICAgIGxldCByZXN1bHQ6IFtTLCBhbnldO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNyZHQxLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDIuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmR0IG51bWJlciBpbiBtZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpIHJldHVybiBbcmVzdWx0WzBdLCBudWxsXTtcbiAgICAgICAgZWxzZSByZXR1cm4gW3Jlc3VsdFswXSwgW21lc3NhZ2VbMF0sIHJlc3VsdFsxXV1dO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENyZHRSdW50aW1lLCBDYXVzYWxUaW1lc3RhbXAgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgRGVmYXVsdFJlc2V0dGFibGVDcmR0IH0gZnJvbSBcIi4vcmVzZXR0YWJsZVwiO1xuaW1wb3J0IHsgQ291bnRlckludGVybmFsLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbCB9IGZyb20gXCIuL2Jhc2ljX2NyZHRzXCI7XG5pbXBvcnQgeyBDcmR0LCBDcmR0SW50ZXJuYWwgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcbmltcG9ydCB7IFNlbWlkaXJlY3RTdGF0ZSwgU2VtaWRpcmVjdEludGVybmFsLCBEaXJlY3RJbnRlcm5hbCB9IGZyb20gXCIuL3NlbWlkaXJlY3RcIjtcblxuZXhwb3J0IGNsYXNzIFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCBleHRlbmRzIENyZHQ8U2VtaWRpcmVjdFN0YXRlPG51bWJlcj4+IHtcbiAgICAvLyBzZW1pZGlyZWN0SW5zdGFuY2UgY29tcGxldGVseSBkZXNjcmliZXMgdGhpcyBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICBzdGF0aWMgc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxudW1iZXI+KFxuICAgICAgICBDb3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLFxuICAgICAgICAobTI6IG51bWJlciwgbTE6IG51bWJlcikgPT4gbTIqbTEsIDFcbiAgICApO1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IGFueSkge1xuICAgICAgICBzdXBlcihpZCwgSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsbl0pO1xuICAgIH1cbiAgICBtdWx0KG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPik6IFtzdHJpbmcsIG51bWJlcl0ge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2UgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludFJlZ2lzdGVyQ3JkdCBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxTZW1pZGlyZWN0U3RhdGU8bnVtYmVyPj4ge1xuICAgIHN0YXRpYyBzZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgU2VtaWRpcmVjdEludGVybmFsPG51bWJlcj4oXG4gICAgICAgIENvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsXG4gICAgICAgIChtMjogbnVtYmVyLCBtMTogbnVtYmVyKSA9PiBtMiptMSwgMVxuICAgICk7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU6IG51bWJlciA9IDAsIHJlc2V0VmFsdWU6IG51bWJlciA9IDApIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJlc2V0VmFsdWUsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgbl0pO1xuICAgIH1cbiAgICBtdWx0KG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIG5dKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tYWRkLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PFtudW1iZXIgfCBzdHJpbmcsIG51bWJlcl0+KTogW3N0cmluZywgbnVtYmVyXSB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAvLyBUcmFuc2FjdGlvbiBkdWUgdG8gc2V0IHZhbHVlLCByZXR1cm4gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICAgICAgICAgICAgcmV0dXJuIFtcInNldFwiLCBkZXNjcmlwdGlvbnNbMV1bMV1dO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSByZXR1cm4gW2Rlc2NyaXB0aW9uWzBdIGFzIHN0cmluZywgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9zaXRpdmVNb2QoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgICBpZiAoYSA+PSAwKSByZXR1cm4gYSAlIGI7XG4gICAgZWxzZSByZXR1cm4gYiAtICgoLWEpICUgYik7XG59XG5cbmNsYXNzIE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPFtudW1iZXIsIGJvb2xlYW5dPiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogW251bWJlciwgYm9vbGVhbl0pOiBbbnVtYmVyLCBib29sZWFuXSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gWzAsIGZhbHNlXTtcbiAgICAgICAgZWxzZSByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSkge1xuICAgICAgICByZXR1cm4gcG9zaXRpdmVNb2Qob3BlcmF0aW9uLCAyKk1hdGguUEkpO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1tudW1iZXIsIGJvb2xlYW5dLCBudW1iZXJdIHtcbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2Qoc3RhdGVbMF0gKyBtZXNzYWdlLCAyKk1hdGguUEkpLCBzdGF0ZVsxXV0sIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwoKTtcbn1cblxuY2xhc3MgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxbbnVtYmVyLCBib29sZWFuXT4ge1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGE/OiBbbnVtYmVyLCBib29sZWFuXSk6IFtudW1iZXIsIGJvb2xlYW5dIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFtudW1iZXIsIGJvb2xlYW5dLCBfcmVwbGljYUlkOiBhbnkpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZWZsZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgb3BlcmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIFwicmVmbGVjdFwiO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogc3RyaW5nLCBzdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1tudW1iZXIsIGJvb2xlYW5dLCBzdHJpbmddIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVmbGVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgLy8gUmVmbGVjdGlvbiBvcGVyYXRpb24gaXMgbXVsdGlwbHlpbmcgb24gdGhlIGxlZnQsXG4gICAgICAgIC8vIHNvIHRvIHB1dCBpdCBpbiBjYW5vbmljYWwgZm9ybSAoZzEsIGcyKSwgd2UgaGF2ZSB0b1xuICAgICAgICAvLyBjb21tdXRlIGl0IHdpdGggdGhlIGN1cnJlbnQgZzEgKHJvdGF0aW9uKSB2YWx1ZSBieVxuICAgICAgICAvLyBhY3Rpbmcgb24gaXQuXG4gICAgICAgIHJldHVybiBbW3Bvc2l0aXZlTW9kKC1zdGF0ZVswXSwgMipNYXRoLlBJKSwgIXN0YXRlWzFdXSwgXCJyZWZsZWN0XCJdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIENyZHQgZm9yIHRoZSAyLWRpbWVuc2lvbmFsIG9ydGhvZ29uYWwgZ3JvdXAsIHdoaWNoIGFsbG93c1xuICogcm90YXRpb25zIGFuZCByZWZsZWN0aW9ucyAoYWJvdXQgdGhlIG9yaWdpbikgb2YgYW4gb2JqZWN0IGluIHRoZVxuICogcGxhbmUuICBFeGFtcGxlIHVzYWdlOiByb3RhdGluZyBhbmQgcmVmbGVjdGluZyBvYmplY3RzIGluXG4gKiBQb3dlcnBvaW50LlxuICpcbiAqIFN0YXRlIGlzIHN0b3JlZCBhcyB0aGUgY2Fub25pY2FsIGVsZW1lbnQgb2YgdGhlIHNlbWlkaXJlY3RcbiAqIHByb2R1Y3QgZ3JvdXAsIGkuZS4sIGluIHRoZSBmb3JtIChnMSwgZzIpIGZvciBnMSBpbiB0aGUgcm90YXRpb25cbiAqIGdyb3VwIChyZWFscyBtb2QgMnBpKSBhbmQgZzIgaW4gdGhlIHJlZmxlY3Rpb24gZ3JvdXAgKGJvb2xlYW5zXG4gKiB3aXRoIHRydWUgZm9yIDEgYW5kIGZhbHNlIGZvciAwKS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9ydGhvZ29uYWxDcmR0IGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PFNlbWlkaXJlY3RTdGF0ZTxbbnVtYmVyLCBib29sZWFuXT4+IHtcbiAgICBzdGF0aWMgc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxbbnVtYmVyLCBib29sZWFuXT4oXG4gICAgICAgIE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsLmluc3RhbmNlLCBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsLmluc3RhbmNlLFxuICAgICAgICAoX20yOiBzdHJpbmcsIG0xOiBudW1iZXIpID0+IC1tMSwgMVxuICAgICk7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU6IFtudW1iZXIsIGJvb2xlYW5dID0gWzAsIGZhbHNlXSxcbiAgICAgICAgICAgIHJlc2V0VmFsdWU6IFtudW1iZXIsIGJvb2xlYW5dID0gWzAsIGZhbHNlXSkge1xuICAgICAgICBzdXBlcihpZCwgT3J0aG9nb25hbENyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbmdsZSBpcyBpbiByYWRpYW5zIENDVy5cbiAgICAgKi9cbiAgICByb3RhdGUoYW5nbGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIGFuZ2xlXSk7XG4gICAgfVxuICAgIHJlZmxlY3RIb3Jpem9udGFsQXhpcygpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBcInJlZmxlY3RcIl0pO1xuICAgIH1cbiAgICByZWZsZWN0VmVydGljYWxBeGlzKCkge1xuICAgICAgICB0aGlzLnJlZmxlY3QoTWF0aC5QSS8yKTtcbiAgICB9XG4gICAgcmVmbGVjdChhbmdsZUF4aXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoLWFuZ2xlQXhpcyk7XG4gICAgICAgIHRoaXMucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgICAgIHRoaXMucm90YXRlKGFuZ2xlQXhpcyk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RhdGUgaXMgZ2l2ZW4gYnk6IHJlZmxlY3QgYWNyb3NzIHRoZSB4LWF4aXNcbiAgICAgKiBpZiByZWZsZWN0ZWQgaXMgdHJ1ZSwgdGhlbiByb3RhdGUgYnkgYW5nbGUgKENDVywgaW4gcmFkaWFucykuXG4gICAgICovXG4gICAgIGdldCByZWZsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlWzFdO1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAgKiBpZiByZWZsZWN0ZWQgaXMgdHJ1ZSwgdGhlbiByb3RhdGUgYnkgYW5nbGUgKENDVywgaW4gcmFkaWFucykuXG4gICAgICAqL1xuICAgICBnZXQgYW5nbGUoKTogbnVtYmVyIHtcbiAgICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMF07XG4gICAgIH1cbiAgICAgLyoqXG4gICAgICAqIFtyZWZsZWN0ZWQsIGFuZ2xlXVxuICAgICAgKi9cbiAgICAgZ2V0IHZhbHVlKCk6IFtudW1iZXIsIGJvb2xlYW5dIHtcbiAgICAgICAgIHJldHVybiBbdGhpcy5hbmdsZSwgdGhpcy5yZWZsZWN0ZWRdO1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tc2V0LlxuICAgICAgKi9cbiAgICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBbbnVtYmVyLCBib29sZWFuXSkge1xuICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICB0aGlzLnJvdGF0ZShuZXdWYWx1ZVswXSk7XG4gICAgICAgICBpZiAobmV3VmFsdWVbMV0pIHRoaXMucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgIH1cbiAgICAgLy8gVE9ETzogbWF0cml4IHZlcnNpb25zIG9mIGdldCBhbmQgc2V0LlxuICAgICAvLyAvKipcbiAgICAgLy8gICogQHJldHVybiBUaGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbiBhcyBhIDJ4MiBvcnRob2dvbmFsXG4gICAgIC8vICAqIG1hdHJpeC5cbiAgICAgLy8gICovXG4gICAgIC8vIGdldCBtYXRyaXgoKTogW1tudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl1dIHtcbiAgICAgLy9cbiAgICAgLy8gfVxuXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoX2Rlc2NyaXB0aW9uczogQXJyYXk8W251bWJlciB8IHN0cmluZywgbnVtYmVyXT4pIHtcbiAgICAgICAgLy8gVE9ETy4gIEp1c3QgcmV0dXJucyB0aGUgcmVzdWx0aW5nIHN0YXRlIGZvciBub3cuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAvLyAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgLy8gICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgcmV0dXJuIFtkZXNjcmlwdGlvblswXSBhcyBzdHJpbmcsIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5cbi8qKlxuICogQ3JkdEludGVybmFsIHdoaWNoIHVzZXMgYW55IHN0cmluZyBhcyBhbiBvcGVyYXRpb24vbWVzc2FnZVxuICogd2hpY2ggZG9lcyBub3RoaW5nLiAgVW5saWtlIHVzaW5nIG51bGwgbWVzc2FnZXMgdG8gaW5kaWNhdGUgdGhhdFxuICogbm90aGluZyBoYXBwZW5lZCwgdGhlIG5vb3AgbWVzc2FnZSBpcyBhbiBleHBsaWNpdCBub24tbnVsbFxuICogc3RyaW5nIHN1cHBsaWVkIGFzIHRoZSBvcGVyYXRpb24uXG4gKlxuICogVHdvIHVzZSBjYXNlczpcbiAqIC0gVG8gdW5yZXNldCBhIHN0YXRlIChlLmcuIGluIEVuYWJsZVdpbnNGbGFnIGJlbG93KS5cbiAqIC0gQXMgYSBcImhlYWRlclwiIGZvciBzZXF1ZW5jZSBvZiBvcGVyYXRpb25zIHBhc3NlZCB0byBhcHBseU9wcyxcbiAqIHNvIHRoYXQgcmVjaXBpZW50cyBjYW4ga25vdyB3aGF0IGVuZC11c2VyIG9wZXJhdGlvbiB0aGUgc2VxdWVuY2VcbiAqIGNvcnJlc3BvbmRzIHRvLlxuICovXG5leHBvcnQgY2xhc3MgTm9PcENyZHRJbnRlcm5hbDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNyZWF0ZUZ1bmM/OiAoaW5pdGlhbERhdGE6IGFueSkgPT4gUykge31cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlRnVuYykgcmV0dXJuIHRoaXMuY3JlYXRlRnVuYyhpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiQ3JlYXRlRnVuYyBub3Qgc3VwcGxpZWRcIik7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogUykge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgdGhlIG9yaWdpbmFsIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogc3RyaW5nLCBzdGF0ZTogUywgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgc3RyaW5nXSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUbzxTPihvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPikge1xuICAgICAgICByZXR1cm4gbmV3IERpcmVjdEludGVybmFsPFM+KG9yaWdpbmFsQ3JkdCxcbiAgICAgICAgICAgIG5ldyBOb09wQ3JkdEludGVybmFsPFM+KCksIDFcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbmFibGVXaW5zRmxhZyBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxudWxsPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLFxuICAgICAgICAgICAgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJlXCIpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGRpc2FibGVTdHJvbmcoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTdHJvbmcoKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2UgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGRvaW5nIGEgcmVzZXQgYmVmb3JlIHNldHRpbmdcbiAgICAgICAgLy8gdG8gbmV3VmFsdWUsIGluIGVpdGhlciBjYXNlLCBzaW5jZSBhbnkgbWVzc2FnZSBvYnZpYXRlc1xuICAgICAgICAvLyBjYXVzYWxseSBsZXNzZXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3b3VsZCBhbHNvIGxpa2UgdG8gdHJhbnNsYXRlIG9ic2VydmVkLXJlc2V0cyB0b1xuICAgIC8vIGRpc2FibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8c3RyaW5nPik6IHN0cmluZyB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlU3Ryb25nXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb25zOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVzY3JpcHRpb25zKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRGlzYWJsZVdpbnNGbGFnIGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PG51bGw+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSkge1xuICAgICAgICBzdXBlcihpZCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKCkgPT4gbnVsbCksIG51bGwsXG4gICAgICAgICAgICBydW50aW1lLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZW5hYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChcImRcIik7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2UgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGRvaW5nIGEgcmVzZXQgYmVmb3JlIHNldHRpbmdcbiAgICAgICAgLy8gdG8gbmV3VmFsdWUsIGluIGVpdGhlciBjYXNlLCBzaW5jZSBhbnkgbWVzc2FnZSBvYnZpYXRlc1xuICAgICAgICAvLyBjYXVzYWxseSBsZXNzZXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3b3VsZCBhbHNvIGxpa2UgdG8gdHJhbnNsYXRlIG9ic2VydmVkLXJlc2V0cyB0b1xuICAgIC8vIGVuYWJsZSAoYnV0IG9ubHkgaWYgaXQgYWN0dWFsbHkgd29ya2VkKS4gIFBlcmhhcHMgYWRkIG5vb3AgaW5kaWNhdG9yIG91dCBmcm9udD9cbiAgICAvLyAoTmVlZCB0byBhZGQgYSBuby1vcCBjcmR0IGF0IHRoZSB0b3AgbGV2ZWwpXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdID09PSBcImRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgR01hcEludGVybmFsPEssIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPE1hcDxLLCBDPj4ge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gdmFsdWVDcmR0SW50ZXJuYWwgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBzaG91bGRHYyBHaXZlbiBhIHZhbHVlIHN0YXRlLCByZXR1cm4gd2hldGhlciBpdCBpcyBzYWZlXG4gICAgICogdG8gZ2FyYmFnZSBjb2xsZWN0IGl0LCByZW1vdmluZyBpdHMga2V5LXZhbHVlIHBhaXIgZnJvbSB0aGVcbiAgICAgKiBtYXAuICBGb3IgY29ycmVjdG5lc3MsIGlmIHNob3VsZEdjKHZhbHVlU3RhdGUpIGlzIHRydWUsIHRoZW5cbiAgICAgKiB2YWx1ZVN0YXRlIG11c3QgYmUgaWRlbnRpY2FsIHRvIHZhbHVlQ3JkdEludGVybmFsLmNyZWF0ZSh2YWx1ZUluaXRpYWxEYXRhKTtcbiAgICAgKiBhbmQgaWYgc2hvdWxkR2MgaXMgbm9udHJpdmlhbCwgdGhlbiB1c2VycyBzaG91bGQga2VlcCBpblxuICAgICAqIG1pbmQgdGhhdCBzdGF0ZS5oYXMoa2V5KSBpcyBub3QgcmVsaWFibGUsIHNpbmNlIGl0IG1heSBiZVxuICAgICAqIGZhbHNlIGV2ZW4gYWZ0ZXIga2V5IGhhcyBiZWVuIGluaXRpYWxpemVkIGJlY2F1c2UgdGhlIHZhbHVlXG4gICAgICogaGFzIGJlZW4gZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHNob3VsZEdjOiAodmFsdWVTdGF0ZTogQykgPT4gYm9vbGVhbiA9ICgoKSA9PiBmYWxzZSkpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ETy4gIE5lZWRzIHRvIGJlIHNldC4gIEFsbG93IGl0IHRvIGJlIHNldCBvdXRzaWRlIGNvbnN0cnVjdG9yXG4gICAgICogYmVjYXVzZSBDcmR0T2JqZWN0IG5lZWRzIHRvIGNhbGwgc3VwZXIgYmVmb3JlIGl0IGNhbiBzZXQgdGhpcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdEZhY3RvcnkhOiAoa2V5OiBLKSA9PiBDO1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGE/OiBhbnkpOiBNYXA8SywgQz4ge1xuICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBDPigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wiYXBwbHlcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBpbml0aWFsaXppbmcgdGhlIGtleSBpZiBuZWVkZWQuXG4gICAgICogLSBbXCJhcHBseVNraXBcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBleGNlcHQgZm9yIHRoZWlyIHNlbmRlciwgd2hvIGlzIGFzc3VtZWRcbiAgICAgKiB0byBoYXZlIGFscmVhZHkgYXBwbGllZCB0aGUgbWVzc2FnZS4gIFRoaXMgaXMgdXNlZCBieVxuICAgICAqIENyZHRWYWx1ZWRHcm93T25seU1hcEludGVybmFsLCB3aG9zZSBtZXNzYWdlcyBhcmVcbiAgICAgKiBzb21ldGltZXMgZGVyaXZlZCBmcm9tIHZhbHVlcyBhcHBseWluZyBtZXNzYWdlcyB0b1xuICAgICAqIHRoZW1zZWx2ZXMuICBUT0RPOiBpbiBwcmluY2lwbGUgY2FuIG9wdGltaXplIHNvIHdlXG4gICAgICogZG9uJ3QgaGF2ZSB0byBzZW5kIFwic2tpcFwiIG92ZXIgdGhlIG5ldHdvcmsuXG4gICAgICogLSBbXCJpbml0XCIsIGtleV06IGluaXRpYWxpemVzIHRoZSBnaXZlbiBrZXkgdXNpbmcgaW5pdEZhY3RvcnlcbiAgICAgKiBpZiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGluIHRoZSBtYXAuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXRzIGV2ZXJ5IHZhbHVlIGluIHRoZSBtYXAgKHVzaW5nXG4gICAgICogZWFjaCB2YWx1ZSdzIGdldFVuaXZlcnNhbFJlc2V0T3BlcmF0aW9uKCkpLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbc3RyaW5nLCBLLCBhbnldLCBzdGF0ZTogTWFwPEssIEM+LCBfcmVwbGljYUlkOiBhbnkpOiBbc3RyaW5nLCBLPywgYW55P10ge1xuICAgICAgICBsZXQga2V5ID0gb3BlcmF0aW9uWzFdO1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5XCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlTa2lwXCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXMoa2V5KSkgcmV0dXJuIFtcImluaXRcIiwga2V5XTtcbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOiByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW4gYWRkaXRpb24gdG8gdGhlIG1lc3NhZ2Ugb3V0cHV0IGJ5IHByZXBhcmUsIHdlIGhhdmVcbiAgICAgKiBtZXNzYWdlcyAoYXJpc2luZyB0aHJvdWdoIHNlbWRpcmVjdCBwcm9kdWN0KTpcbiAgICAgKiAtIFtcImluaXRSZXNldFwiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZCBieVxuICAgICAqIGRlbGl2ZXJpbmcgYSByZXNldCBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICogLSBbXCJpbml0UmVzZXRTdHJvbmdcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWRcbiAgICAgKiBieSBkZWxpdmVyaW5nIGEgcmVzZXQtc3Ryb25nIG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKlxuICAgICAqIERlc2NyaXB0aW9uIGZvcm1hdDpcbiAgICAgKiAtIGZvciBhbiBhcHBseS9hcHBseVNraXAgb3BlcmF0aW9uOlxuICAgICAqIG51bGwgKFRPRE8pXG4gICAgICogLSBmb3IgYW4gaW5pdCBvcGVyYXRpb246IG51bGwgaWYgdGhlIGtleSBhbHJlYWR5IGV4aXN0ZWQsXG4gICAgICogb3RoZXJ3aXNlIFtcImluaXRcIiwga2V5XVxuICAgICAqIC0gZm9yIGEgcmVzZXQgb3BlcmF0aW9uOiBbXCJyZXNldFwiXSAoVE9ETzogZGVzY3JpcHRpb25zIGZyb21cbiAgICAgKiByZXNldCBrZXlzKVxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbc3RyaW5nLCBLLCBhbnk/XSwgc3RhdGU6IE1hcDxLLCBDPixcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6XG4gICAgICAgICAgICBbTWFwPEssIEM+LCBbc3RyaW5nLCBLPywgYW55P10gfCBudWxsXSB7XG4gICAgICAgIGxldCBrZXkgPSBtZXNzYWdlWzFdO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBhcHBseWluZyBpdCB0byB0aGUgc3RhdGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCBnYywgdGhvdWdoLCBpbiBjYXNlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5LWFwcGxpZWQgbWVzc2FnZSBoYXMgbWFkZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBnYy1hYmxlLlxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBmYWxsIHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjp7XG4gICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVN0YXRlLnJlY2VpdmUobWVzc2FnZVsyXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO31cbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhcyhrZXkpKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3VsZEdjKGluaXRTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnNldChrZXksIGluaXRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wiaW5pdFwiLCBrZXldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBzdGF0ZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc2V0TWVzc2FnZSA9IGVudHJ5WzFdLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzZXRNZXNzYWdlICE9PSBudWxsKSBlbnRyeVsxXS5yZWNlaXZlKFtyZXNldE1lc3NhZ2VdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShlbnRyeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wicmVzZXRcIl1dO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBDb252ZW5pZW50IHJlcHJlc2VudGF0aW9uIG9mIGEgQ3JkdC12YWx1ZWQgZ3Jvdy1vbmx5IG1hcC5cbiAqXG4gKiBUT0RPOiBTb21ld2hlcmU6IG5vdGUgdGhhdCBpbml0aWFsIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG11c3QgYmVcbiAqIGEgZnVuY3Rpb24gb2YgdGhlaXIga2V5IG9ubHkgKHNvIGNhbid0IGhhdmUgdmFyeWluZyB0eXBlcyBvclxuICogaW5pdGlhbCBkYXRhKS5cbiAqXG4gKiBOIGlzIHRoZSB0eXBlIG9mIG1lbWJlciBuYW1lcyAodHlwaWNhbGx5IHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0T2JqZWN0PE4sIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGV4dGVuZHMgQ3JkdDxNYXA8TiwgQz4+IGltcGxlbWVudHMgQ3JkdFJ1bnRpbWUge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcGVydHlGYWN0b3J5ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEeW5hbWljYWxseSBjcmVhdGVkIHByb3BlcnRpZXMgYXJlIG9ubHkgXCIgK1xuICAgICAgICAgICAgICAgIFwiYWxsb3dlZCBpZiBwcm9wZXJ0eUZhY3RvcnkgaXMgcGFzc2VkIHRvIHRoZSBcIiArXG4gICAgICAgICAgICAgICAgXCJDcmR0T2JqZWN0IGNvbnN0cnVjdG9yXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVE9ETzogcHJlZGVmaW5lZCB2cyBkeW5hbWljIHByb3BlcnR5IGNyZWF0aW9uLiAgUHJlZGVmaW5lZCBvbmVzXG4gICAgICogaGF2ZSB0byBiZSBjcmVhdGVkIGlkZW50aWNhbGx5IG9uIGFsbCByZXBsaWNhcyBpblxuICAgICAqIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIGFuZFxuICAgICAqIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCksIGlkZWFsbHkgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGV5XG4gICAgICogYXJlIG5vdCBzeW5jZWQgKGZvciBlZmZpY2llbmN5IGFuZCB0byBzYXZlIHRoZSB0cm91YmxlXG4gICAgICogb2Ygc3BlY2lmeWluZyBwcm9wZXJ0eUZhY3RvcnkpLiAgRHluYW1pYyBwcm9wZXJ0aWVzXG4gICAgICogY2FuIG9ubHkgYmUgY3JlYXRlZCB0aHJvdWdoIGluaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlGYWN0b3J5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIHByb3BlcnR5RmFjdG9yeTogKG5hbWU6IE4sIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IENcbiAgICAgICAgICAgID0gQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5KSB7XG4gICAgICAgIC8vIFRPRE86IGdjIGFiaWxpdHlcbiAgICAgICAgbGV0IGNyZHRJbnRlcm5hbCA9IG5ldyBHTWFwSW50ZXJuYWw8TiwgQz4oKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRJbnRlcm5hbCwgcnVudGltZSk7XG4gICAgICAgIGNyZHRJbnRlcm5hbC5pbml0RmFjdG9yeSA9IChrZXk6IE4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBwcm9wZXJ0eUZhY3Rvcnkoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb246IGJvb2xlYW47XG4gICAgc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICBwcml2YXRlIGluSW5pdDogYm9vbGVhbjtcbiAgICByZWdpc3RlcihjcmR0OiBDLCBuYW1lOiBOKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiB8fCB0aGlzLmluSW5pdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BlcnRpZXMgY2FuIG9ubHkgYmUgZGlyZWN0bHkgXCIgK1xuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJlZCBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBcIiArXG4gICAgICAgICAgICAgICAgXCJhbmQgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKS4gIER5bmFtaWMgcHJvcGVydGllcyBcIiArXG4gICAgICAgICAgICAgICAgXCJtdXN0IGJlIGNyZWF0ZWQgd2l0aCBpbml0KG5hbWUpLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KG5hbWUsIGNyZHQpO1xuICAgICAgICAvLyBTa2lwIHNlbmRpbmcgYW4gaW5pdCBtZXNzYWdlIGFib3V0IGl0LiAgT2theSBiZWNhdXNlIG9mIHRoZVxuICAgICAgICAvLyBwcmVkZWZpbmVkIGluaXRpYWxpemF0aW9uIGNvbnRyYWN0LlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICBUaGUgaW5pdGlhbGl6ZWQgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0UHJvcGVydHkobmFtZTogTik6IEMge1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3AoW1wiaW5pdFwiLCBuYW1lXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSkgYXMgQztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKHRoaXMuZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbXCJyZXNldFwiXTtcbiAgICB9XG5cbiAgICBnZXRQcm9wZXJ0eShuYW1lOiBOKTogQyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICB9XG4gICAgcHJvcGVydHlOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUua2V5cygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWVzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5RW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICAgIH1cblxuICAgIHNlbmQobWVzc2FnZTogYW55LCBuYW1lOiBOKTogdm9pZCB7XG4gICAgICAgIC8vIENvbnZlcnQgaW50byBhbiBhcHBseVNraXAgbWVzc2FnZSBmb3IgdGhlIG1hcCB2YWx1ZVxuICAgICAgICAvLyBhdCBuYW1lLiAgSGVyZSB3ZSB3YW50IHRvIHNraXAgYmVjYXVzZVxuICAgICAgICAvLyBvdXIgcmVwbGljYSdzIHZhbHVlIGhhcyBhbHJlYWR5IGFwcGxpZWQgdGhlXG4gICAgICAgIC8vIG9wZXJhdGlvbiBpbnRlcm5hbGx5LlxuICAgICAgICB0aGlzLmFwcGx5T3AoW1wiYXBwbHlTa2lwXCIsIG5hbWUsIG1lc3NhZ2VdKTtcbiAgICB9XG5cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCk7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoX2NyZHRJZDogYW55KTogQ2F1c2FsVGltZXN0YW1wIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZFdpbnNTZXQ8VD4gZXh0ZW5kcyBDcmR0T2JqZWN0PFQsIEVuYWJsZVdpbnNGbGFnPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIGdjIG9uY2Ugd2UgaGF2ZSB0cmFuc2FjdGlvbnNcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUsIChuYW1lOiBULCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PlxuICAgICAgICAgICAgICAgIG5ldyBFbmFibGVXaW5zRmxhZyhuYW1lLCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICB9XG4gICAgYWRkKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRQcm9wZXJ0eSh2YWx1ZSkuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgZGVsZXRlKHZhbHVlOiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICh0aGlzLmdldFByb3BlcnR5KHZhbHVlKSBhcyBFbmFibGVXaW5zRmxhZykuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyh2YWx1ZTogVCkge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAodGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSkgYXMgRW5hYmxlV2luc0ZsYWcpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKHZhbHVlOiBUKSB7XG4gICAgICAgIGxldCB2YWx1ZUZsYWcgPSB0aGlzLmdldFByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlRmxhZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlRmxhZy5lbmFibGVkO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKTogU2V0PFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZXQ8VD4oKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5wcm9wZXJ0eUVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5WzFdLmVuYWJsZWQpIHJlc3VsdC5hZGQoZW50cnlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogU2V0PFQ+KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgdmFsdWVzKCkge1xuICAgICAgICAvLyBUT0RPOiBvbmNlIGl0J3MgZ2MnZCB3ZSBjYW4ganVzdCB1c2UgdGhpcy5zdGF0ZS5rZXlzKClcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUudmFsdWVzKCk7XG4gICAgfVxuICAgIC8vIFRPRE86IG90aGVyIHNldCBwcm9wZXJ0aWVzIChlLmcuIHN5bWJvbCBpdGVyYXRvcilcbiAgICAvLyBUT0RPOiBjYXB0dXJpbmcgYW5kIHRyYW5zbGF0aW5nIGRlc2NyaXB0aW9uc1xufVxuXG5leHBvcnQgY2xhc3MgTWFwQ3JkdDxLLCBDIGV4dGVuZHMgQ3JkdDxhbnk+PiBleHRlbmRzIENyZHRPYmplY3Q8c3RyaW5nLCBBZGRXaW5zU2V0PEs+IHwgQ3JkdE9iamVjdDxLLCBDPj4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkga2V5U2V0OiBBZGRXaW5zU2V0PEs+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsdWVNYXA6IENyZHRPYmplY3Q8SywgQz47XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICB2YWx1ZUZhY3Rvcnk6IChrZXk6IEssIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IEMpIHtcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUpO1xuICAgICAgICB0aGlzLnN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICAgICAgdGhpcy5rZXlTZXQgPSBuZXcgQWRkV2luc1NldChcImtleVNldFwiLCB0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZU1hcCA9IG5ldyBDcmR0T2JqZWN0KFwidmFsdWVNYXBcIiwgdGhpcywgdmFsdWVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbGFnIGluZGljYXRpbmcgdGhhdCB3ZSBhcmUgaW4gdGhlIGJvZHkgb2YgYSBkZWxldGUvXG4gICAgICogZGVsZXRlU3Ryb25nIGNhbGwsIGhlbmNlIHdlIHNob3VsZCBub3QgYWRkIHRoaW5nc1xuICAgICAqIHRvIGtleVNldCAoYXMgYW4gb3B0aW1pemF0aW9uKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluRGVsZXRlID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgQ3JkdE9iamVjdC5zZW5kIHNvIHRoYXQgd2UgY2FuIGNhcHR1cmVcbiAgICAgKiBhIHNlbmQgYnkgYSB2YWx1ZU1hcCB2YWx1ZSBhbmQgZm9sbG93IGl0IHVwIHdpdGhcbiAgICAgKiBhbiBhZGQgdG8ga2V5U2V0LCB0aHVzIHJldml2aW5nIHRoZSB2YWx1ZSdzIGtleVxuICAgICAqIGlmIGFwcHJvcHJpYXRlLlxuICAgICAqXG4gICAgICogVE9ETzogc2tpcCBhZGRpbmcgdGhlIGtleSBpZiBpdCdzIGEgcmVzZXQgbWVzc2FnZT9cbiAgICAgKiBOb3Qgc3VyZSBpZiB0aGlzIGlzIHBvc3NpYmxlIGluIGdlbmVyYWwuICBCdXQgc2hvdWxkIGF0XG4gICAgICogbGVhc3QgYmUgcG9zc2libGUgZm9yIG91ciBvd24gZGVsZXRlcy5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2U6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNlbmQobWVzc2FnZSwgbmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSAmJiBuYW1lID09PSBcInZhbHVlTWFwXCIpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvIHRoaXMgcmVjZWl2ZXIgc2lkZSBpbnN0ZWFkLCBmb3IgbmV0d29yayBlZmZpY2llbmN5P1xuICAgICAgICAgICAgLy8gV291bGQgbmVlZCB0byBwbGFjZSB0aGUgYWRkIGZpcnN0LCBzbyB0aGF0IGl0IGNhblxuICAgICAgICAgICAgLy8gYmUgb3ZlcnJpZGRlbiBieSBhbnkgaW5jbHVkZWQgZGVsZXRlcy5cbiAgICAgICAgICAgIC8vIFdvdWxkIGFsc28gbmVlZCB0byBhY2NvdW50IGZvciBwb3NzaWJpbGl0eSBvZlxuICAgICAgICAgICAgLy8gdHJhbnNhY3Rpb25zLlxuICAgICAgICAgICAgLy8gQWxzbywgbmVlZCB0byBtYWtlIHN1cmUgd2UgKHNlbmRlcikgZG8gaXQgdG9vLlxuICAgICAgICAgICAgZm9yIChsZXQgc3VibWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Ym1lc3NhZ2VbMF0gPT09IFwiYXBwbHlTa2lwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IHN1Ym1lc3NhZ2VbMV0gYXMgSztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoa2V5OiBLKTogQyB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMuaW5EZWxldGUpIHRoaXMua2V5U2V0LmFkZChrZXkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy52YWx1ZU1hcC5pbml0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYXMoa2V5OiBLKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC5oYXMoa2V5KTtcbiAgICB9XG4gICAgZ2V0KGtleTogSykge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkgcmV0dXJuIHRoaXMudmFsdWVNYXAuZ2V0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBkZWxldGUoa2V5OiBLKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaW5EZWxldGUgPSB0cnVlO1xuICAgICAgICAgICAgKHRoaXMuZ2V0KGtleSkgYXMgQykucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyhrZXk6IEspIHtcbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdChrZXkpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZVN0cm9uZyhrZXkpO1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC52YWx1ZXMoKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBvdGhlciBtYXAgbWV0aG9kcyAoZS5nLiBzeW1ib2wgaXRlcmF0b3IpXG4gICAgLy8gVE9ETzogc3Ryb25nLXJlc2V0XG4gICAgLy8gVE9ETzogcHJlc2VydmUtc3RhdGUgZGVsZXRlLCByZXNldD9cbn1cbiIsInJlcXVpcmUoJy4uL3Rlc3QvdGVzdCcpOy8vIHJ1biB0ZXN0LnRzXG5cbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBvdmVudHVhbHMoaGk6IHN0cmluZyk6IHZvaWQge1xuXG4vLyB9XG5cbmltcG9ydCB7IENvdW50ZXJDcmR0IH0gZnJvbSBcIi4uL3NyYy9jcmR0cy9iYXNpY19jcmR0c1wiO1xuaW1wb3J0IHsgQ3JkdE5ldHdvcmtSdW50aW1lIH0gZnJvbSAnLi4vc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUnO1xuXG52YXIgSE9TVCA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpXG5sZXQgY2xpZW50ID0gbmV3IENyZHROZXR3b3JrUnVudGltZShcImNsaWVudFwiLCBIT1NUKTtcbmxldCBjbGllbnRDb3VudGVyID0gbmV3IENvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGNsaWVudCk7XG5cbnZhciBjb3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGVyXCIpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgxMDApO1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbn1cbiIsImltcG9ydCB7IENyZHRSdW50aW1lLCBDYXVzYWxUaW1lc3RhbXAgfSBmcm9tICcuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlJztcbmltcG9ydCB7IENyZHRNZXNzYWdlTGlzdGVuZXIgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgVmVjdG9yQ2xvY2sgfSBmcm9tICcuL3ZlY3Rvcl9jbG9jayc7XG4vLyBpbXBvcnQgV2ViU29ja2V0ID0gcmVxdWlyZShcIndzXCIpO1xuXG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cblxuLyoqXG4gKiBDdXN0b21pemVkIG1lc3NhZ2UgZXZlbnQgdGhhdCB0cmF2ZWwgdGhyb3VnaFxuICogY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsuXG4gKi9cbmV4cG9ydCBjbGFzcyBteU1lc3NhZ2Uge1xuICAgIC8qKlxuICAgICAqIENyZHQgdXBkYXRlIG1lc3NhZ2UuXG4gICAgICovXG4gICAgbWVzc2FnZSA6IGFueTtcbiAgICAvKipcbiAgICAgKiBVbmlxdWUgY3JkdElkIGZvciBpZGVudGlmaWNhdGlvbi5cbiAgICAgKi9cbiAgICBjcmR0SWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVGltZXN0YW1wIGZvciBjYXN1YWxpdHkvY29uY3VycmVuY3kgY2hlY2suXG4gICAgICpcbiAgICAgKiBQcm92aWRlIGJhc2ljIGZ1bmN0aW9ucyBzdWNoIGFzIDpcbiAgICAgKiBnZXRTZW5kZXIoKSAvIGdldFNlbmRlckNvdW50ZXIoKSAvIGFzVmVjdG9yQ2xvY2soKS5cbiAgICAgKi9cbiAgICB0aW1lc3RhbXAgOiBWZWN0b3JDbG9jaztcblxuICAgIGNvbnN0cnVjdG9yIChtZXNzYWdlIDogYW55LCBjcmR0SWQgOiBhbnksIHRpbWVzdGFtcCA6IFZlY3RvckNsb2NrKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY3JkdElkID0gY3JkdElkO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgcGFja2FnZSBpbmZvIGluIEpTT04gZm9ybWF0LlxuICAgICAqL1xuICAgIHRvSlNPTigpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgeyAgIFwibWVzc2FnZVwiIDogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIFwiY3JkdElkXCIgOiB0aGlzLmNyZHRJZCxcbiAgICAgICAgICAgICAgICBcInRpbWVzdGFtcFwiIDoge1xuICAgICAgICAgICAgICAgICAgICBcInVpZFwiIDogdGhpcy50aW1lc3RhbXAudWlkLFxuICAgICAgICAgICAgICAgICAgICBcInZlY3Rvck1hcFwiIDogQXJyYXkuZnJvbSh0aGlzLnRpbWVzdGFtcC52ZWN0b3JNYXAuZW50cmllcygpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FzdWFsQnJvYWRjYXN0TmV0d29yazpcbiAqXG4gKiBQcm9jZXNzIGluaXRpYWxpemF0aW9uIHdoZW4gc3RhcnRpbmcgYSBuZXcgdXNlciBub2RlLlxuICpcbiAqIENvbW11bmljYXRlIHdpdGggQ1JEVCdzIHJ1bnRpbWUgYW5kIHNlbmQvcmVjZWl2ZSBtZXNzYWdlIHZpYVxuICogY2VudHJhbCBicm9hZGNhc3Qgc2VydmVyIHdpdGggV2ViU29ja2V0IHByb3RvY29sLlxuICpcbiAqIFBlcmZvcm0gY2FzdWFsaXR5IGNoZWNrIHRvIGVuc3VyZSBtZXNzYWdlIG9yZGVyaW5nLlxuICovXG5leHBvcnQgY2xhc3MgQ3JkdE5ldHdvcmtSdW50aW1lIGltcGxlbWVudHMgQ3JkdFJ1bnRpbWV7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIElEIGZvciByZXBsaWNhIGZvciBpZGVudGlmaWNhdGlvbi5cbiAgICAgKi9cbiAgICB1aWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogV2ViU29ja2V0IGZvciBjb25uZWN0aW9uIHRvIHNlcnZlci5cbiAgICAgKi9cbiAgICB3cyA6IFdlYlNvY2tldDtcbiAgICAvKipcbiAgICAgKiBNYXAgc3RvcmVzIGFsbCBjcmR0SWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB2ZWN0b3IgY2xvY2suXG4gICAgICovXG4gICAgdmNNYXAgOiBNYXA8YW55LCBWZWN0b3JDbG9jaz47XG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBidWZmZXIgdG8gc3RvcmUgcmVjZWl2ZWQgbWVzc2FnZSB0byBlbnN1cmUgY2FzdWFsIGRlbGl2ZXJ5LlxuICAgICAqL1xuICAgIG1lc3NhZ2VCdWZmZXIgOiBBcnJheTxbYW55LCBhbnksIFZlY3RvckNsb2NrXT47XG4gICAgLyoqXG4gICAgICogTWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQgYnkgdGhlIFdlYlNvY2tldFxuICAgICAqL1xuICAgIHNlbmRCdWZmZXIgOiBBcnJheTxteU1lc3NhZ2U+O1xuICAgIC8qKlxuICAgICAqIFRoZSByZWdpc3RlcmVkIENSRFQgd2l0aCBjb3JyZXNwb25kaW5nIENyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICovXG4gICAgbGlzdGVuZXJzQnlJZCA6IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+O1xuXG4gICAgY29uc3RydWN0b3IgKHJlcGxpY2FJZDogYW55LCB3ZWJTb2NrZXRBcmdzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmNNYXAgPSBuZXcgTWFwPGFueSwgVmVjdG9yQ2xvY2s+KCk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlciA9IG5ldyBBcnJheTxbYW55LCBhbnksIFZlY3RvckNsb2NrXT4oKTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5PG15TWVzc2FnZT4oKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkID0gbmV3IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+KCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBzZW5kIG1lc3NhZ2UgYnVmZmVyIGhhcyBhbnkgbWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQuXG4gICAgICogSWYgdGhlcmUgZXhpc3QsIHRoZW4gc2VuZCBpdCB2aWEgV2ViU29ja2V0IGFuZCByZW1vdmUgdGhlIGl0ZW0gZnJvbSBidWZmZXIuXG4gICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgKi9cbiAgICBzZW5kQWN0aW9uID0gKCkgPT4ge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQodGhpcy5zZW5kQnVmZmVyW2luZGV4XS50b0pTT04oKSk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheTxteU1lc3NhZ2U+KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayBpbnRvIG15TWVzc2FnZSB0eXBlLlxuICAgICAqIFB1c2ggdGhlIG1lc3NhZ2UgaW50byByZWNlaXZlZCBtZXNzYWdlIGJ1ZmZlci5cbiAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGFsbCB0aGUgbWVzc2FnZXMgYW5kIGRlbGl2ZXIgdG8gYXBwbGljYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrXG4gICAgICovXG4gICAgcmVjZWl2ZUFjdGlvbiA9IChkYXRhIDogYW55KSA9PiB7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihkYXRhLmRhdGEpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIucHVzaChbbXlQYWNrYWdlLm1lc3NhZ2UsIG15UGFja2FnZS5jcmR0SWQsIG15UGFja2FnZS50aW1lc3RhbXBdKTtcbiAgICAgICAgdGhpcy5jaGVja01lc3NhZ2VCdWZmZXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCB0aGUgZnVuY3Rpb24gZGVmaW5lZCBpbiBDcmR0UnVudGltZSBpbnRlcmZhY2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyByZXBsaWNhJ3MgaWQsIHVzZWQgYnkgc29tZSBDUkRUcyBpbnRlcm5hbGx5XG4gICAgICogKGUuZy4sIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZGVudGlmaWVycyBvZiB0aGUgZm9ybSAocmVwbGljYSBpZCwgY291bnRlcikpLlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0UmVwbGljYUlkKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdElkIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkXG4gICAgICovXG4gICAgcmVnaXN0ZXJDcmR0SWQoY3JkdElkIDogYW55KSA6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdCB3aXRoIGl0cyBJRCBhbmQgY29ycmVzcG9uZGluZyBtZXNzYWdlXG4gICAgICogbGlzdGVuZXIgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0TWVzc2FnZUxpc3RlbmVyIHRoZSBtZXNzYWdlIGxpc3RlbmVyIG9mIGVhY2ggY3JkdC5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBJRCBvZiBlYWNoIGNyZHQuXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0TWVzc2FnZUxpc3RlbmVyOiBDcmR0TWVzc2FnZUxpc3RlbmVyLCBjcmR0SWQ6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSB8fCB0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgY3JkdElkOiBcIiArIGNyZHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLnNldChjcmR0SWQsIGNyZHRNZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyBWZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGZ1bmN0aW9uIG9uIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrIGxheWVyLCB3aGljaCBjYWxsZWRcbiAgICAgKiBieSBjcmR0J3MgcnVudGltZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRoZSBtZXNzYWdlIGlzIHdyYXBwZWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0aW1lc3RhbXAgKGJhc2ljIHNlbmRlciBub2RlXG4gICAgICogaW5mbyBhbmQgdmVjdG9yIGNsb2NrKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIFdlYlNvY2tldCBhcyBuZXR3b3JrIHRyYW5zbWlzc2lvbiBwcm90b2NvbC5cbiAgICAgKiBVc2luZyBKU09OIGZvcm1hdCBhcyBtZXNzYWdlIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgbm90IE9wZW4sIHRoZW4gYnVmZmVyIHRoZSBtZXNzYWdlIGFuZFxuICAgICAqIHdhaXQgdW50aWwgV2ViU29ja2V0IG9wZW4uXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIE9wZW4sIHRoZW4gc2VuZCBpdCB3aXRoIHdzLnNlbmQoKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHRoZSBjcmR0IHVwZGF0ZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIHVuaXF1ZSBJRCBmb3IgZWFjaCBjcmR0LlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZSA6IGFueSwgY3JkdElkIDogYW55KSA6IHZvaWR7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjcmR0SWQgZXhpc3QgaW4gdGhlIG1hcC5cbiAgICAgICAgaWYgKHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuZ2V0KGNyZHRJZCkhLmluY3JlbWVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuZ2V0KGNyZHRJZCkhLmluY3JlbWVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2sgZm9yIHNlbmRpbmdcbiAgICAgICAgbGV0IHZjQ29weSA9IG5ldyBWZWN0b3JDbG9jayh0aGlzLnVpZCk7XG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAgPSBuZXcgTWFwPGFueSwgbnVtYmVyPih0aGlzLnZjTWFwLmdldChjcmR0SWQpPy5hc1ZlY3RvckNsb2NrKCkhKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgY3JkdElkLCB2Y0NvcHkhKTtcblxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBtZXNzYWdlIGludG8gSlNPTlxuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQobXlQYWNrYWdlLnRvSlNPTigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKG15UGFja2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuZXh0IHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gY3JkdElkIGluIHRoaXMgcmVwbGljYS5cbiAgICAgKiBcbiAgICAgKiBUaGlzIGlzIHBhc3NlZCB0byBDcmR0SW50ZXJuYWwuZWZmZWN0IHdoZW4gYSByZXBsaWNhIHByb2Nlc3NlcyBpdHMgb3duXG4gICAgICogbWVzc2FnZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBjcmR0SWQgdGhhdCB3b3VsZCBsaWtlIHRvIHJldHVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdGltZXN0YW1wIHRoYXQgd291bGQgYmUgYXNzaWduZWQgdG8gYSBDUkRUXG4gICAgICogbWVzc2FnZSBzZW50IGJ5IHRoaXMgcmVwbGljYSBhbmQgZ2l2ZW4gY3JkdElkIHJpZ2h0IG5vdy5cbiAgICAgKiBcbiAgICAgKi9cbiAgICBnZXROZXh0VGltZXN0YW1wKGNyZHRJZDogYW55KSA6IENhdXNhbFRpbWVzdGFtcCB7XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrLiAgXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4odGhpcy52Y01hcC5nZXQoY3JkdElkKT8uYXNWZWN0b3JDbG9jaygpISk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lc3RhbXAgb2YgdGhpcyByZXBsaWNhIHdpdGggbmV4dCB2YWx1ZS4gXG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCB2Y0NvcHkudmVjdG9yTWFwLmdldCh0aGlzLnVpZCkgYXMgbnVtYmVyICsgMSk7XG5cbiAgICAgICAgcmV0dXJuIHZjQ29weTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIHRvIGN1c3RvbWl6ZWQgZGF0YSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgdHJhdmVsIHRocm91Z2ggbmV0d29yay5cbiAgICAgKiBAcmV0dXJucyB0aGUgY3VzdG9taXplZCBkYXRhIHR5cGUgPT4gbXlNZXNzYWdlXG4gICAgICovXG4gICAgcGFyc2VKU09OKGRhdGEgOiBzdHJpbmcpIDogbXlNZXNzYWdlIHtcbiAgICAgICAgbGV0IGRhdGFKU09OID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IHZjID0gbmV3IFZlY3RvckNsb2NrKGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShkYXRhSlNPTi5tZXNzYWdlLCBkYXRhSlNPTi5jcmR0SWQsIHZjKTtcblxuICAgICAgICByZXR1cm4gbXlQYWNrYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGJ1ZmZlcmVkIG1lc3NhZ2VzIGFuZCBkZWxpdmVyeSB0aGVcbiAgICAgKiBtZXNzYWdlcyBiYWNrIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIgd2hpY2ggYXJlIHJlYWR5LlxuICAgICAqXG4gICAgICogVGhlIGNoZWNraW5nIG9yZGVyIGlzIGZyb20gdGhlIGxhc3Rlc3QgdG8gdGhlIG9sZGVzdC5cbiAgICAgKiBVcGRhdGUgdGhlIFZlY3RvckNsb2NrIGVudHJ5IGFuZCBNZXNzYWdlQnVmZmVyIHdoZW4gbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogU2VuZCB0aGUgbWVzc2FnZSBiYWNrIHRvIGNyZHRSdW50aW1lIHdpdGggY29ycmVzcG9uZGluZyBcbiAgICAgKiBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGNoZWNrTWVzc2FnZUJ1ZmZlcigpIDogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubWVzc2FnZUJ1ZmZlci5sZW5ndGggLSAxO1xuXG4gICAgICAgIHdoaWxlKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJDcmR0SWQgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdO1xuICAgICAgICAgICAgbGV0IGN1clZlY3RvckNsb2NrID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnZjTWFwLmhhcyhjdXJDcmR0SWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBteVZlY3RvckNsb2NrID0gdGhpcy52Y01hcC5nZXQoY3VyQ3JkdElkKTtcbiAgICAgICAgICAgICAgICBpZiAobXlWZWN0b3JDbG9jaz8uaXNyZWFkeShjdXJWZWN0b3JDbG9jaykpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNCeUlkLmhhcyhjdXJDcmR0SWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc0J5SWQuZ2V0KGN1ckNyZHRJZCk/LnJlY2VpdmUodGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVswXSwgY3VyVmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlWZWN0b3JDbG9jay5pbmNyZW1lbnRTZW5kZXIoY3VyVmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2F1c2FsVGltZXN0YW1wIH0gZnJvbSAnLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZSc7XG5cbi8vIFRoZSB2ZWN0b3IgY2xvY2sgZGVzaWduZWQgZm9yIENSRFQgbGlicmFyeSBhbmQgY2FzdWFsIGJyb2FkY2FzdGluZ1xuLy8gcnVudGltZSB0byBlbnN1cmUgY29ycmVjdCBjYXVzYWxpdHkuXG5cbi8qKlxuICogVGhlIHZlY3RvciBjbG9jayBjbGFzcyBmb3IgZW5zdXJpbmcgY2FzdWFsaXR5LlxuICovXG5leHBvcnQgY2xhc3MgVmVjdG9yQ2xvY2sgaW1wbGVtZW50cyBDYXVzYWxUaW1lc3RhbXB7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIElEIGZvciBlYWNoIHJlcGxpY2EgdG8gaWRlbnRpZnkgaXRzZWxmKHJlcGxpY2FJZCkuXG4gICAgICovICAgIFxuICAgIHVpZCA6IGFueTtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVjb3JkIG1hcCBmcm9tIHJlcGxpY2EgaWRzIHRvIHRoZSBudW1iZXIgb2YgbGFzdGVzdCBtZXNzYWdlLlxuICAgICAqL1xuICAgIHZlY3Rvck1hcCA6IE1hcDxhbnksIG51bWJlcj47XG5cbiAgICAvKiogXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgdmVjdG9yIHdpdGggcmVwbGljYSdzIG93biBlbnRyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQgOiBhbnkpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyByZXBsaWNhKHJlcGxpY2FJZCkuXG4gICAgICovXG4gICAgZ2V0U2VuZGVyKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2ZWN0b3IgY2xvY2sgd2l0aCBhbGwgdGhlIGVudHJpZXMuXG4gICAgICovXG4gICAgYXNWZWN0b3JDbG9jaygpIDogTWFwPGFueSwgbnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZpc2libGUgbnVtYmVyIG9mIHRoZSBjb3VudGVyIGZyb20gc2VuZGVyIGluIFxuICAgICAqIHRoaXMgdmVjdG9yY2xvY2suXG4gICAgICovXG4gICAgZ2V0U2VuZGVyQ291bnRlcigpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCkhO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIHJlcGxpY2FzIGludm92bGVkIGluIHRoaXMgY3JkdHMuXG4gICAgICovXG4gICAgZ2V0U2l6ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLnNpemU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmVjdG9yIG9mIHRoZSB1aWQocmVwbGljYUlkKSBlbnRyeS5cbiAgICAgKi9cbiAgICBpbmNyZW1lbnQoKSA6IHZvaWQgeyBcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuXG4gICAgICAgIGlmKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCBvbGRWYWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGEgbWVzc2FnZSB3aXRoIGEgY2VydGFpbiB0aW1lc3RhbXAgaXMgcmVhZHkgZm9yIGRlbGl2ZXJ5IFxuICAgICAqIHRvIGVuc3VyZSBjb3JyZWN0IGNhc3VhbGl0eS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKiBAcmV0dXJucyB0aGUgbWVzc2FnZSBpcyByZWFkeSBvciBub3QuXG4gICAgICovXG4gICAgaXNyZWFkeSh2YyA6IFZlY3RvckNsb2NrKSA6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuXG4gICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5oYXMob3RoZXJVaWQpKSB7IFxuICAgICAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmdldChvdGhlclVpZCkgPT09IG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkhIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpISA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkhKSkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7ICBcbiAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSEgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5jcmVtZW50IHNlbmRlcidzIGxhc3Rlc3QgZW50cnkgcmVjZWl2ZWQgaW4gdGhpcyBWZWN0b3JDbG9ja1xuICAgICAqIGluIHRoZSByZXBsaWNhJ3Mgb3duIHZlY3Rvck1hcC5cbiAgICAgKiBcbiAgICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBtYWlubHkgZG9uZSBhZnRlciBjb3JyZWN0bHkgZGVsaXZlciB0aGUgbWVzc2FnZVxuICAgICAqIHdoZW4gaXNSZWFkeSgpIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBpbmNyZW1lbnRTZW5kZXIodmMgOiBWZWN0b3JDbG9jaykgOiB2b2lkIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQob3RoZXJVaWQsIG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgY3VycmVudCBWZWN0b3JDbG9jayB3aXRoIHRoZSB2ZWN0b3IgY2xvY2sgcmVjZXZpZWQgZnJvbSBcbiAgICAgKiBvdGhlciByZXBsaWNhLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIG1lcmdlKHZjIDogVmVjdG9yQ2xvY2spIDogdm9pZHtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuXG4gICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgTWF0aC5tYXgodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSEsIG90aGVyVmVjdG9yTWFwLmdldChpZCkhKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHNvbWVVaWQgdGhlIHJlcGxpY2EncyB1aWQuXG4gICAgICogQHBhcmFtIGNsb2NrVmFsdWUgdGhlIGNsb2NrIG51bWJlciBvZiB0aGUgcmVwbGljYS5cbiAgICAgKi9cbiAgICBzZXRFbnRyeShzb21lVWlkIDogYW55LCBjbG9ja1ZhbHVlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoc29tZVVpZCwgY2xvY2tWYWx1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7IENvdW50ZXJDcmR0LCBNdWx0UmVnaXN0ZXJDcmR0LCBHU2V0Q3JkdCwgTXVsdGlWYWx1ZVJlZ2lzdGVyIH0gZnJvbSBcIi4uLy4uL3NyYy9jcmR0cy9iYXNpY19jcmR0c1wiO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0Q291bnRlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RDb3VudGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VDb3VudGVyID0gbmV3IENvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGFsaWNlKTtcbiAgICBhbGljZUNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JDb3VudGVyID0gbmV3IENvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGJvYik7XG4gICAgYm9iQ291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIC0xKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgLTEpO1xuXG4gICAgYWxpY2VDb3VudGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlQ291bnRlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA2KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDgpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA4KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0TXVsdFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE11bHRSZWdpc3RlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlUmVnaXN0ZXIgPSBuZXcgTXVsdFJlZ2lzdGVyQ3JkdChcIm11bHRJZFwiLCBhbGljZSwgMik7XG4gICAgYWxpY2VSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBtdWx0ZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JSZWdpc3RlciA9IG5ldyBNdWx0UmVnaXN0ZXJDcmR0KFwibXVsdElkXCIsIGJvYiwgMik7XG4gICAgYm9iUmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIG11bHRlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMik7XG5cbiAgICBhbGljZVJlZ2lzdGVyLm11bHQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDYpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgNik7XG5cbiAgICBib2JSZWdpc3Rlci5tdWx0KC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgLTI0KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC0yNCk7XG5cbiAgICBhbGljZVJlZ2lzdGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDExKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDExKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VSZWdpc3Rlci5tdWx0KDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAyMik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JSZWdpc3Rlci5tdWx0KC04KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMjIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgLTg4KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAtMTc2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC0xNzYpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RHU2V0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEdTZXQoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUdTZXQgPSBuZXcgR1NldENyZHQoXCJnc2V0SWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlR1NldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBhZGRlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkdTZXQgPSBuZXcgR1NldENyZHQoXCJnc2V0SWRcIiwgYm9iKTtcbiAgICBib2JHU2V0Lm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBhZGRlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldCgpKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldCgpKTtcblxuICAgIGFsaWNlR1NldC5hZGQoXCJlbGVtZW50XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIl0pKTtcblxuICAgIGJvYkdTZXQuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcblxuICAgIGFsaWNlR1NldC5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RcbiAgICBhbGljZUdTZXQuYWRkKFwiZmlyc3RcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG5cbiAgICBib2JHU2V0LmFkZChcInNlY29uZFwiKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJzZWNvbmRcIl0pKTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE12cigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNdnIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU12ciA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPihcIm12cklkXCIsIGFsaWNlLCBcImluaXRpYWxcIik7XG4gICAgYWxpY2VNdnIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgbGV0IGJvYk12ciA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPihcIm12cklkXCIsIGJvYiwgXCJpbml0aWFsXCIpO1xuICAgIGJvYk12ci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImluaXRpYWxcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImluaXRpYWxcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJzZWNvbmRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJzZWNvbmRcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJ0aGlyZFwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJ0aGlyZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1widGhpcmRcIl0pKTtcblxuICAgIGJvYk12ci52YWx1ZSA9IFwiYm9iJ3NcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiYm9iJ3NcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImJvYidzXCJdKSk7XG5cbiAgICAvLyBDb25jdXJyZW50IHRlc3RcbiAgICBhbGljZU12ci52YWx1ZSA9IFwiY29uY0FcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcImNvbmNCXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNBXCIsIFwiY29uY0JcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNCXCIsIFwiY29uY0FcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJjb25jQTJcIjtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY0EyXCJdKSk7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJjb25jQjJcIjtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNCMlwiXSkpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQTJcIiwgXCJjb25jQjJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNCMlwiLCBcImNvbmNBMlwiXSkpO1xuXG4gICAgLy8gTXVsdGlwbGUgYWRkcyBhcmUgcmVkdW5kYW50LCB1bmxlc3MgdGhleSdyZSBvdmVyd3JpdHRlblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInJlZHVuZGFudFwiXSkpO1xuXG4gICAgYWxpY2VNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIGJvYk12ci52YWx1ZSA9IFwicmVkdW5kYW50XCI7XG4gICAgYWxpY2VNdnIudmFsdWUgPSBcIm92ZXJ3cml0ZVwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIiwgXCJvdmVyd3JpdGVcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInJlZHVuZGFudFwiLCBcIm92ZXJ3cml0ZVwiXSkpO1xuXG4gICAgLy8gUmVzZXQgdGVzdFxuICAgIGFsaWNlTXZyLnJlc2V0KCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KCkpO1xuICAgIGJvYk12ci52YWx1ZSA9IFwiY29uY1wiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jXCJdKSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG50ZXN0Q291bnRlcigpO1xudGVzdE11bHRSZWdpc3RlcigpO1xudGVzdEdTZXQoKTtcbnRlc3RNdnIoKTtcblxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXRcbmZ1bmN0aW9uIGlzU3VwZXJzZXQ8VD4oc2V0OiBTZXQ8VD4sIHN1YnNldDogU2V0PFQ+KSB7XG4gICAgZm9yIChsZXQgZWxlbSBvZiBzdWJzZXQpIHtcbiAgICAgICAgaWYgKCFzZXQuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuZnVuY3Rpb24gc2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgcmV0dXJuIGlzU3VwZXJzZXQoc2V0MSwgc2V0MikgJiYgaXNTdXBlcnNldChzZXQyLCBzZXQxKTtcbn1cbmZ1bmN0aW9uIGFzc2VydFNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIGlmKCFzZXRFcXVhbHMoc2V0MSwgc2V0MikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0RXF1YWxzIGZhaWxlZCwgYWN0dWFsOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0MS52YWx1ZXMoKV0pICsgXCIsIGV4cGVjdGVkOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0Mi52YWx1ZXMoKV0pKTtcbiAgICB9XG4gICAgYXNzZXJ0KHNldEVxdWFscyhzZXQxLCBzZXQyKSk7XG59XG4iLCJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge1Rlc3RpbmdSdW50aW1lR2VuZXJhdG9yfSBmcm9tIFwiLi4vcnVudGltZV9mb3JfdGVzdGluZ1wiO1xuaW1wb3J0IHsgSnNvbkNyZHQgfSBmcm9tICcuLi8uLi9zcmMvY3JkdHMvanNvbic7XG5pbXBvcnQgeyBJbnRSZWdpc3RlckNyZHQgfSBmcm9tICcuLi8uLi9zcmMvY3JkdHMvc3RhbmRhcmQnO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0SnNvbk1hcEZlYXR1cmVzKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEpzb25NYXBGZWF0dXJlcygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlSnNvbiA9IG5ldyBKc29uQ3JkdChcImpzb25NYXBcIiwgYWxpY2UpO1xuICAgIGxldCBib2JKc29uID0gbmV3IEpzb25DcmR0KFwianNvbk1hcFwiLCBib2IpO1xuXG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcblxuICAgIC8vIEluaXRzIGdvIHRocm91Z2hcbiAgICBhbGljZUpzb24uaW5pdChcInRlc3RcIiwgMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnQoYWxpY2VKc29uLmhhcyhcInRlc3RcIiwgMCkpO1xuICAgIGFzc2VydChib2JKc29uLmhhcyhcInRlc3RcIiwgMCkpO1xuXG4gICAgbGV0IGFsaWNlVGVzdCA9IGFsaWNlSnNvbi5nZXQoXCJ0ZXN0XCIsIDApIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhc3NlcnQoYWxpY2VUZXN0KTtcbiAgICBsZXQgYm9iVGVzdCA9IGJvYkpzb24uZ2V0KFwidGVzdFwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGJvYlRlc3QpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCAwKTtcblxuICAgIC8vIFZhbHVlIG9wcyB3b3JrXG4gICAgYWxpY2VUZXN0LmFkZCgzKTtcbiAgICBib2JUZXN0LmFkZCg0KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgNyk7XG5cbiAgICAvLyBEZWxldGUgd29ya3NcbiAgICBib2JKc29uLmRlbGV0ZShcInRlc3RcIiwgMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQoYWxpY2VKc29uLmdldChcInRlc3RcIiwgMCkgPT09IHVuZGVmaW5lZCk7XG4gICAgYXNzZXJ0KGJvYkpzb24uZ2V0KFwidGVzdFwiLCAwKSA9PT0gdW5kZWZpbmVkKTtcblxuICAgIGFsaWNlSnNvbi5pbml0KFwicmVnaXN0ZXJcIiwgMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuXG4gICAgLy8gQ29uY3VycmVudCBvcGVyYXRpb24gcmV2aXZlcyBrZXlcbiAgICBsZXQgYm9iUmVnaXN0ZXIgPSBib2JKc29uLmdldChcInJlZ2lzdGVyXCIsIDApIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhbGljZUpzb24uZGVsZXRlKFwicmVnaXN0ZXJcIiwgMCk7XG4gICAgYm9iUmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbCgoYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIsIDApIGFzIEludFJlZ2lzdGVyQ3JkdCkudmFsdWUsIDMpO1xuXG4gICAgLy8gLy8gUmVzZXQgdGVzdHNcbiAgICAvLyAvLyBDb25jdXJyZW50IG9wIHJldml2ZXNcbiAgICAvLyBsZXQgYWxpY2VSZWdpc3RlciA9IGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgLy8gYWxpY2VKc29uLnJlc2V0KCk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpLCB1bmRlZmluZWQpO1xuICAgIC8vIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICAvLyBib2JSZWdpc3Rlci5hZGQoNSk7XG4gICAgLy8gcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VKc29uLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDUpO1xuICAgIC8vIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLCBhbGljZUpzb24uZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIC8vIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICAvL1xuICAgIC8vIC8vIENhdXNhbGx5IGxhdGVyIG9wIHJldml2ZXNcbiAgICAvLyBib2JKc29uLnJlc2V0KCk7XG4gICAgLy8gYm9iUmVnaXN0ZXIuYWRkKDcpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA3KTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgNyk7XG5cbiAgICAvLyBUT0RPOiBzdHJvbmcgZGVsZXRlLCBzdHJvbmcgcmVzZXRzLCBuZXN0aW5nP1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RKc29uQ29udmVyc2lvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RKc29uTWFwRmVhdHVyZXMoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uMlwiLCBhbGljZSk7XG4gICAgbGV0IGJvYkpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uMlwiLCBib2IpO1xuXG4gICAgbGV0IHRlc3RPYmogPSB7XG4gICAgICAgIFwidG9waWNcIjogXCJnYW1lc1wiLFxuICAgICAgICBcInJldmlld3NcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1vbm9wb2x5XCIsIFwicmF0aW5nXCI6IDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImxpZmVcIiwgXCJyYXRpbmdcIjogNn1cbiAgICAgICAgXVxuICAgIH07XG4gICAgbGV0IG5lc3RlZE9iaiA9IHtcbiAgICAgICAgXCJ0b3BpY1wiOiBcIm5lc3RpbmdcIixcbiAgICAgICAgXCJuZXN0ZWRcIjogdGVzdE9ialxuICAgIH07XG4gICAgYWxpY2VKc29uLnZhbHVlID0gbmVzdGVkT2JqO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGNvbnNvbGUubG9nKFwiYWxpY2U6IFwiICsgSlNPTi5zdHJpbmdpZnkoYWxpY2VKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBjb25zb2xlLmxvZyhcImJvYjogXCIgKyBKU09OLnN0cmluZ2lmeShib2JKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuXG4gICAgYm9iSnNvbi5zZXRWYWx1ZShcImZsYWdcIiwgdHJ1ZSk7XG4gICAgKG5lc3RlZE9iaiBhcyBhbnkpLmZsYWcgPSB0cnVlO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGNvbnNvbGUubG9nKFwiYWxpY2U6IFwiICsgSlNPTi5zdHJpbmdpZnkoYWxpY2VKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBjb25zb2xlLmxvZyhcImJvYjogXCIgKyBKU09OLnN0cmluZ2lmeShib2JKc29uLmdldEFzT2JqZWN0KEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgdHJ1ZSkpKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpLCBuZXN0ZWRPYmopO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdEpzb25NYXBGZWF0dXJlcygpO1xudGVzdEpzb25Db252ZXJzaW9uKCk7XG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5mdW5jdGlvbiBpc1N1cGVyc2V0PFQ+KHNldDogU2V0PFQ+LCBzdWJzZXQ6IFNldDxUPikge1xuICAgIGZvciAobGV0IGVsZW0gb2Ygc3Vic2V0KSB7XG4gICAgICAgIGlmICghc2V0LmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIHNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIHJldHVybiBpc1N1cGVyc2V0KHNldDEsIHNldDIpICYmIGlzU3VwZXJzZXQoc2V0Miwgc2V0MSk7XG59XG5mdW5jdGlvbiBhc3NlcnRTZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICBpZighc2V0RXF1YWxzKHNldDEsIHNldDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEVxdWFscyBmYWlsZWQsIGFjdHVhbDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDEudmFsdWVzKCldKSArIFwiLCBleHBlY3RlZDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDIudmFsdWVzKCldKSk7XG4gICAgfVxuICAgIGFzc2VydChzZXRFcXVhbHMoc2V0MSwgc2V0MikpO1xufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7SW50UmVnaXN0ZXJDcmR0fSBmcm9tIFwiLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkXCI7XG5cbmxldCBydW50aW1lR2VuID0gbmV3IFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yKCk7XG5sZXQgYWxpY2UgPSBydW50aW1lR2VuLm5ld1J1bnRpbWUoXCJhbGljZVwiKTtcbmxldCBib2IgPSBydW50aW1lR2VuLm5ld1J1bnRpbWUoXCJib2JcIik7XG5cbmZ1bmN0aW9uIHRlc3RSZXNldHRhYmxlQ291bnRlcigpIHtcbiAgICAvLyBUZXN0IERlZmF1bHRSZXNldHRhYmxlQ3JkdCBieSB0ZXN0aW5nIEludFJlZ2lzdGVyQ3JkdCdzXG4gICAgLy8gYWRkIGFuZCByZXNldCBvcGVyYXRpb25zLCBzaW5jZSBpdCdzIGEgc2ltcGxlIGV4YW1wbGUuXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUNvdW50ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwicmVzZXR0YWJsZUNvdW50ZXJJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkNvdW50ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwicmVzZXR0YWJsZUNvdW50ZXJJZFwiLCBib2IpO1xuICAgIGJvYkNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYWxpY2VDb3VudGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMyk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgLTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAtMSk7XG5cbiAgICBhbGljZUNvdW50ZXIudmFsdWUgPSAxMTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDExKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VDb3VudGVyLmFkZCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDExKTtcblxuICAgIGJvYkNvdW50ZXIuYWRkKC01KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDYpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgOCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDgpO1xuXG4gICAgLy8gT2JzZXJ2ZWQgcmVzZXQgdGVzdHNcbiAgICBhbGljZUNvdW50ZXIucmVzZXQoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBib2JDb3VudGVyLmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNyk7XG5cbiAgICAvLyBDb25jdXJyZW50IGFkZCBzaG91bGQgc3Vydml2ZVxuICAgIGFsaWNlQ291bnRlci5yZXNldCgpO1xuICAgIGJvYkNvdW50ZXIuYWRkKDEwKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAxMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDEwKTtcblxuICAgIC8vIFJlc2V0LXdpbnMgdGVzdHNcbiAgICBib2JDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYWxpY2VDb3VudGVyLmFkZCg2KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNik7XG5cbiAgICAvLyBDb25jdXJyZW50IGFkZCBzaG91bGQgbm90IHN1cnZpdmVcbiAgICBhbGljZUNvdW50ZXIucmVzZXRTdHJvbmcoKTtcbiAgICBib2JDb3VudGVyLmFkZCgyMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgLy8gTG90cyBvZiBjb25jdXJyZW5jeVxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgYm9iQ291bnRlci5hZGQoNyk7XG4gICAgYWxpY2VDb3VudGVyLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlKGJvYik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDcpO1xuICAgIGJvYkNvdW50ZXIucmVzZXRTdHJvbmcoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG50ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKTtcbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQgeyBFbmFibGVXaW5zRmxhZywgRGlzYWJsZVdpbnNGbGFnLCBJbnRSZWdpc3RlckNyZHQsIFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCwgQWRkV2luc1NldCwgQ3JkdE9iamVjdCwgTWFwQ3JkdCwgT3J0aG9nb25hbENyZHQgfSBmcm9tICcuLi8uLi9zcmMvY3JkdHMvc3RhbmRhcmQnO1xuaW1wb3J0IHsgQ3JkdFJ1bnRpbWUgfSBmcm9tICcuLi8uLi9zcmMvY3JkdF9ydW50aW1lX2ludGVyZmFjZSc7XG5cbmxldCBydW50aW1lR2VuID0gbmV3IFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yKCk7XG5sZXQgYWxpY2UgPSBydW50aW1lR2VuLm5ld1J1bnRpbWUoXCJhbGljZVwiKTtcbmxldCBib2IgPSBydW50aW1lR2VuLm5ld1J1bnRpbWUoXCJib2JcIik7XG5cbmZ1bmN0aW9uIHRlc3RFd0ZsYWcoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0RXdGbGFnKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VGbGFnID0gbmV3IEVuYWJsZVdpbnNGbGFnKFwiZXdGbGFnSWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlRmxhZy5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JGbGFnID0gbmV3IEVuYWJsZVdpbnNGbGFnKFwiZXdGbGFnSWRcIiwgYm9iKTtcbiAgICBib2JGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGFsaWNlRmxhZy5lbmFibGUoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIHRydWUpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIHRydWUpO1xuXG4gICAgYWxpY2VGbGFnLmRpc2FibGUoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBhbGljZUZsYWcuZW5hYmxlKCk7XG4gICAgYm9iRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3REd0ZsYWcoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0RHdGbGFnKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VGbGFnID0gbmV3IERpc2FibGVXaW5zRmxhZyhcImR3RmxhZ0lkXCIsIGFsaWNlKTtcbiAgICBhbGljZUZsYWcub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iRmxhZyA9IG5ldyBEaXNhYmxlV2luc0ZsYWcoXCJkd0ZsYWdJZFwiLCBib2IpO1xuICAgIGJvYkZsYWcub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYm9iRmxhZy5lbmFibGUoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIHRydWUpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIHRydWUpO1xuXG4gICAgYWxpY2VGbGFnLmRpc2FibGUoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBhbGljZUZsYWcuZW5hYmxlKCk7XG4gICAgYm9iRmxhZy5kaXNhYmxlKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SW50UmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0SW50UmVnaXN0ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUludFJlZ2lzdGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGxldCBib2JJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkXCIsIGJvYik7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xMik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0c1xuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMjUpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RGcm9tUGFwZXIoKSB7XG4gICAgLy8gVGhlICsveCBleGFtcGxlIGZyb20gdGhlIGZpZ3VyZSBpbiB0aGUgcGFwZXJcbiAgICBjb25zb2xlLmxvZyhcInRlc3RGcm9tUGFwZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUludFJlZ2lzdGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQyXCIsIGFsaWNlLCAxKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBsZXQgYm9iSW50UmVnaXN0ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZDJcIiwgYm9iLCAxKTtcbiAgICBib2JJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAxKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDEpO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5tdWx0KDIpO1xuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDEpO1xuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoMyk7XG4gICAgYm9iSW50UmVnaXN0ZXIuYWRkKDQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDcpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDE3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDE3KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0VW5yZXNldHRhYmxlSW50UmVnaXN0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0SW50UmVnaXN0ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUludFJlZ2lzdGVyID0gbmV3IFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQzXCIsIGFsaWNlKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBsZXQgYm9iSW50UmVnaXN0ZXIgPSBuZXcgVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZDNcIiwgYm9iKTtcbiAgICBib2JJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDApO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG5cbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTEyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC0xMik7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RzXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0zKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcblxuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0zKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC0yNSk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTE1KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC0xNSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE9ydGhvZ29uYWwoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0T3J0aG9nb25hbCgpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlT3J0aG9nb25hbCA9IG5ldyBPcnRob2dvbmFsQ3JkdChcIm9ydGhvZ29uYWxJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VPcnRob2dvbmFsLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYk9ydGhvZ29uYWwgPSBuZXcgT3J0aG9nb25hbENyZHQoXCJvcnRob2dvbmFsSWRcIiwgYm9iKTtcbiAgICBib2JPcnRob2dvbmFsLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBzZXQgdG8gXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWxpY2VPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYk9ydGhvZ29uYWwudmFsdWUsIFswLCBmYWxzZV0pO1xuXG4gICAgYWxpY2VPcnRob2dvbmFsLnJvdGF0ZSgxKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzEsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMSwgZmFsc2VdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMTApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWxpY2VPcnRob2dvbmFsLnZhbHVlLCBbMTEgJSAoMipNYXRoLlBJKSwgZmFsc2VdKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYk9ydGhvZ29uYWwudmFsdWUsIFsxMSAlICgyKk1hdGguUEkpLCBmYWxzZV0pO1xuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoLTEwKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcblxuICAgIGJvYk9ydGhvZ29uYWwucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFsyKk1hdGguUEkgLSAxLCB0cnVlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMipNYXRoLlBJIC0gMSwgdHJ1ZV0pO1xuXG4gICAgYWxpY2VPcnRob2dvbmFsLnJvdGF0ZSgxLjUpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWxpY2VPcnRob2dvbmFsLnZhbHVlLCBbMC41LCB0cnVlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMC41LCB0cnVlXSk7XG5cbiAgICBib2JPcnRob2dvbmFsLnJlZmxlY3QoMC41KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgZmFsc2VdKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYk9ydGhvZ29uYWwudmFsdWUsIFswLjUsIGZhbHNlXSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdHNcbiAgICBhbGljZU9ydGhvZ29uYWwucmVzZXQoKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoTWF0aC5QSS8yKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgW01hdGguUEkvMiwgZmFsc2VdKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYk9ydGhvZ29uYWwudmFsdWUsIFswLCBmYWxzZV0pO1xuXG4gICAgYm9iT3J0aG9nb25hbC5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgW01hdGguUEkvMiwgZmFsc2VdKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYk9ydGhvZ29uYWwudmFsdWUsIFswLCB0cnVlXSk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzMqTWF0aC5QSS8yLCB0cnVlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMypNYXRoLlBJLzIsIHRydWVdKTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5jbGFzcyBCaUNvdW50ZXIgZXh0ZW5kcyBDcmR0T2JqZWN0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PiB7XG4gICAgYTogSW50UmVnaXN0ZXJDcmR0O1xuICAgIGI6IEludFJlZ2lzdGVyQ3JkdDtcbiAgICBjb25zdHJ1Y3RvcihjcmR0SWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoY3JkdElkLCBydW50aW1lKTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYSA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJhXCIsIHRoaXMsIDEpO1xuICAgICAgICB0aGlzLmIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiYlwiLCB0aGlzLCAxKTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGVzdENyZHRPYmplY3QoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0Q3JkdE9iamVjdCgpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlQmkgPSBuZXcgQmlDb3VudGVyKFwiYmlJZFwiLCBhbGljZSk7XG4gICAgbGV0IGJvYkJpID0gbmV3IEJpQ291bnRlcihcImJpSWRcIiwgYm9iKTtcblxuICAgIC8vIERvIHRlc3RGcm9tUGFwZXIoKSBvbiBlYWNoIGNvdW50ZXJcbiAgICBhbGljZUJpLmEub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2UgYTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYm9iQmkuYS5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2IgYTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYWxpY2VCaS5iLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlIGI6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGJvYkJpLmIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iIGI6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmEudmFsdWUsIDEpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5hLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlQmkuYS5tdWx0KDIpO1xuICAgIGFsaWNlQmkuYS5hZGQoMSk7XG4gICAgYm9iQmkuYS5tdWx0KDMpO1xuICAgIGJvYkJpLmEuYWRkKDQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmEudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5hLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmEudmFsdWUsIDE3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgMTcpO1xuXG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQmkuYi52YWx1ZSwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmIudmFsdWUsIDEpO1xuXG4gICAgYWxpY2VCaS5iLm11bHQoMik7XG4gICAgYWxpY2VCaS5iLmFkZCgxKTtcbiAgICBib2JCaS5iLm11bHQoMyk7XG4gICAgYm9iQmkuYi5hZGQoNCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQmkuYi52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmIudmFsdWUsIDcpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQmkuYi52YWx1ZSwgMTcpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCAxNyk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0QXdTZXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0QXdTZXQoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZVNldCA9IG5ldyBBZGRXaW5zU2V0PHN0cmluZz4oXCJhd1NldElkXCIsIGFsaWNlKTtcbiAgICBhbGljZVNldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgK1xuICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgbGV0IGJvYlNldCA9IG5ldyBBZGRXaW5zU2V0PHN0cmluZz4oXCJhd1NldElkXCIsIGJvYik7XG4gICAgYm9iU2V0Lm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgK1xuICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGVzY3JpcHRpb24pKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KCkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCJlbGVtZW50XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG5cbiAgICBib2JTZXQuYWRkKFwiN1wiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCI3XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VTZXQuYWRkKFwiZmlyc3RcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCIsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICBib2JTZXQuYWRkKFwic2Vjb25kXCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcInNlY29uZFwiXSkpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIC8vIERlbGV0ZSB0ZXN0cyBvbiBzaW5nbGUgZWxlbWVudCAoY29weWluZyBFd0ZsYWcgdGVzdHMpXG4gICAgYWxpY2VTZXQuZGVsZXRlKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIGJvYlNldC5kZWxldGUoXCJub25leGlzdGVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCI3XCIsIFwiZmlyc3RcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIGFsaWNlU2V0LmFkZChcImNvbmN1cnJlbnRcIik7XG4gICAgYWxpY2VTZXQuZGVsZXRlKFwiY29uY3VycmVudFwiKTtcbiAgICBib2JTZXQuYWRkKFwiY29uY3VycmVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCIsIFwiY29uY3VycmVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCIsIFwiY29uY3VycmVudFwiXSkpO1xuICAgIC8vIFRPRE86IHRlc3QgZGVsZXRlU3Ryb25nXG5cbiAgICAvLyBPYnNlcnZlZC1yZXNldCB0ZXN0XG4gICAgYm9iU2V0LnJlc2V0KCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldCgpKTtcbiAgICBhbGljZVNldC5hZGQoXCJzdXJ2aXZvclwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wic3Vydml2b3JcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcInN1cnZpdm9yXCJdKSk7XG4gICAgLy9cbiAgICAvLyAvLyBSZXNldC13aW5zIHRlc3RcbiAgICAvLyBhbGljZVNldC5yZXNldFN0cm9uZygpO1xuICAgIC8vIGFsaWNlU2V0LmFkZChcImFsaWNlJ3NcIik7XG4gICAgLy8gYm9iU2V0LnJlc2V0KCk7XG4gICAgLy8gYm9iU2V0LmFkZChcImJvYidzXCIpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJhbGljZSdzXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJib2Inc1wiXSkpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJhbGljZSdzXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJhbGljZSdzXCJdKSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0TWFwKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE1hcCgpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlTWFwID0gbmV3IE1hcENyZHQ8c3RyaW5nLCBJbnRSZWdpc3RlckNyZHQ+KFwibWFwXCIsIGFsaWNlLFxuICAgICAgICAgICAgKGtleTogc3RyaW5nLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgbGV0IGJvYk1hcCA9IG5ldyBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PihcIm1hcFwiLCBib2IsXG4gICAgICAgICAgICAoa2V5OiBzdHJpbmcsIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IG5ldyBJbnRSZWdpc3RlckNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcblxuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXSkpO1xuXG4gICAgLy8gSW5pdHMgZ28gdGhyb3VnaFxuICAgIGFsaWNlTWFwLmluaXQoXCJ0ZXN0XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW1widGVzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnQoYWxpY2VNYXAuaGFzKFwidGVzdFwiKSk7XG4gICAgYXNzZXJ0KGJvYk1hcC5oYXMoXCJ0ZXN0XCIpKTtcblxuICAgIGxldCBhbGljZVRlc3QgPSBhbGljZU1hcC5nZXQoXCJ0ZXN0XCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhc3NlcnQoYWxpY2VUZXN0KTtcbiAgICBsZXQgYm9iVGVzdCA9IGJvYk1hcC5nZXQoXCJ0ZXN0XCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhc3NlcnQoYm9iVGVzdCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlVGVzdC52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlRlc3QudmFsdWUsIDApO1xuXG4gICAgLy8gVmFsdWUgb3BzIHdvcmtcbiAgICBhbGljZVRlc3QuYWRkKDMpO1xuICAgIGJvYlRlc3QuYWRkKDQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCA3KTtcblxuICAgIC8vIERlbGV0ZSB3b3Jrc1xuICAgIGJvYk1hcC5kZWxldGUoXCJ0ZXN0XCIpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXSkpO1xuICAgIGFzc2VydChhbGljZU1hcC5nZXQoXCJ0ZXN0XCIpID09PSB1bmRlZmluZWQpO1xuICAgIGFzc2VydChib2JNYXAuZ2V0KFwidGVzdFwiKSA9PT0gdW5kZWZpbmVkKTtcblxuICAgIGFsaWNlTWFwLmluaXQoXCJyZWdpc3RlclwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcblxuICAgIC8vIENvbmN1cnJlbnQgb3BlcmF0aW9uIHJldml2ZXMga2V5XG4gICAgbGV0IGJvYlJlZ2lzdGVyID0gYm9iTWFwLmdldChcInJlZ2lzdGVyXCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhbGljZU1hcC5kZWxldGUoXCJyZWdpc3RlclwiKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoKGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpIGFzIEludFJlZ2lzdGVyQ3JkdCkudmFsdWUsIDMpO1xuXG4gICAgLy8gUmVzZXQgdGVzdHNcbiAgICAvLyBDb25jdXJyZW50IG9wIHJldml2ZXNcbiAgICBsZXQgYWxpY2VSZWdpc3RlciA9IGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpIGFzIEludFJlZ2lzdGVyQ3JkdDtcbiAgICBhbGljZU1hcC5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIiksIHVuZGVmaW5lZCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDApO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCg1KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLCBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDUpO1xuXG4gICAgLy8gQ2F1c2FsbHkgbGF0ZXIgb3AgcmV2aXZlc1xuICAgIGJvYk1hcC5yZXNldCgpO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLCBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gVE9ETzogc3Ryb25nIGRlbGV0ZSwgc3Ryb25nIHJlc2V0cywgbmVzdGluZz9cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG50ZXN0RXdGbGFnKCk7XG50ZXN0RHdGbGFnKCk7XG50ZXN0SW50UmVnaXN0ZXIoKTtcbnRlc3RGcm9tUGFwZXIoKTtcbnRlc3RVbnJlc2V0dGFibGVJbnRSZWdpc3RlcigpO1xudGVzdE9ydGhvZ29uYWwoKTtcbnRlc3RDcmR0T2JqZWN0KCk7XG50ZXN0QXdTZXQoKTtcbnRlc3RNYXAoKTtcblxuXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1NldFxuZnVuY3Rpb24gaXNTdXBlcnNldDxUPihzZXQ6IFNldDxUPiwgc3Vic2V0OiBTZXQ8VD4pIHtcbiAgICBmb3IgKGxldCBlbGVtIG9mIHN1YnNldCkge1xuICAgICAgICBpZiAoIXNldC5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5mdW5jdGlvbiBzZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICByZXR1cm4gaXNTdXBlcnNldChzZXQxLCBzZXQyKSAmJiBpc1N1cGVyc2V0KHNldDIsIHNldDEpO1xufVxuZnVuY3Rpb24gYXNzZXJ0U2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgaWYoIXNldEVxdWFscyhzZXQxLCBzZXQyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXRFcXVhbHMgZmFpbGVkLCBhY3R1YWw6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQxLnZhbHVlcygpXSkgKyBcIiwgZXhwZWN0ZWQ6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQyLnZhbHVlcygpXSkpO1xuICAgIH1cbiAgICBhc3NlcnQoc2V0RXF1YWxzKHNldDEsIHNldDIpKTtcbn1cbiIsImltcG9ydCB7Q3JkdFJ1bnRpbWUsIENyZHRNZXNzYWdlTGlzdGVuZXIsIENhdXNhbFRpbWVzdGFtcH0gZnJvbSBcIi4uL3NyYy9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5cbmNsYXNzIFRlc3RpbmdSdW50aW1lIGltcGxlbWVudHMgQ3JkdFJ1bnRpbWUge1xuICAgIGxpc3RlbmVyc0J5SWQgPSBuZXcgTWFwPGFueSwgQ3JkdE1lc3NhZ2VMaXN0ZW5lcj4oKTtcbiAgICB2ZWN0b3JDbG9jayA9IG5ldyBNYXA8YW55LCBudW1iZXI+KCk7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnZW5lcmF0b3IgOiBUZXN0aW5nUnVudGltZUdlbmVyYXRvcixcbiAgICAgICAgICAgIHByaXZhdGUgcmVwbGljYUlkIDogYW55KSB7XG4gICAgICAgIHRoaXMudmVjdG9yQ2xvY2suc2V0KHJlcGxpY2FJZCwgMCk7XG4gICAgfVxuICAgIHNlbmQobWVzc2FnZTogYW55LCBjcmR0SWQ6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZlY3RvckNsb2NrLnNldCh0aGlzLnJlcGxpY2FJZCwgdGhpcy52ZWN0b3JDbG9jay5nZXQoXG4gICAgICAgICAgICB0aGlzLnJlcGxpY2FJZCkgYXMgbnVtYmVyICsgMVxuICAgICAgICApO1xuICAgICAgICBsZXQgbXlSZXBsaWNhSWQgPSB0aGlzLnJlcGxpY2FJZDtcbiAgICAgICAgbGV0IHZjQ29weSA9IG5ldyBNYXAodGhpcy52ZWN0b3JDbG9jayk7XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB7XG4gICAgICAgICAgICBnZXRTZW5kZXIoKSB7IHJldHVybiBteVJlcGxpY2FJZDsgfSxcbiAgICAgICAgICAgIGdldFNlbmRlckNvdW50ZXIoKSB7IHJldHVybiB2Y0NvcHkuZ2V0KHRoaXMuZ2V0U2VuZGVyKCkpIGFzIG51bWJlcjt9LFxuICAgICAgICAgICAgYXNWZWN0b3JDbG9jaygpIHsgcmV0dXJuIHZjQ29weTsgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBxdWV1ZU1hcCA9IHRoaXMuZ2VuZXJhdG9yLm1lc3NhZ2VRdWV1ZXMuZ2V0KHRoaXMpIGFzXG4gICAgICAgICAgICBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PFthbnksIGFueSwgQ2F1c2FsVGltZXN0YW1wXT4+O1xuICAgICAgICBmb3IgKGxldCBxdWV1ZSBvZiBxdWV1ZU1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgLy8gVXNlIGRpZmZlcmVudCBjb3BpZXMgZm9yIGVhY2ggQ3JkdCwgaW4gY2FzZSB0aGV5XG4gICAgICAgICAgICAvLyBtb2RpZnkgbWVzc2FnZSB3aGlsZSBwcm9jZXNzaW5nIGl0XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKFtKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKSwgY3JkdElkLCB0aW1lc3RhbXBdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWdpc3RlcihjcmR0TWVzc2FnZUxpc3RlbmVyOiBDcmR0TWVzc2FnZUxpc3RlbmVyLCBjcmR0SWQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNCeUlkLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgY3JkdElkOiBcIiArIGNyZHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLnNldChjcmR0SWQsIGNyZHRNZXNzYWdlTGlzdGVuZXIpO1xuICAgIH1cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxpY2FJZDtcbiAgICB9XG4gICAgZ2V0TmV4dFRpbWVzdGFtcCgpIHtcbiAgICAgICAgbGV0IHZjQ29weSA9IG5ldyBNYXAodGhpcy52ZWN0b3JDbG9jayk7XG4gICAgICAgIHZjQ29weS5zZXQodGhpcy5yZXBsaWNhSWQsIHRoaXMudmVjdG9yQ2xvY2suZ2V0KFxuICAgICAgICAgICAgdGhpcy5yZXBsaWNhSWQpIGFzIG51bWJlciArIDFcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG15UmVwbGljYUlkID0gdGhpcy5yZXBsaWNhSWQ7XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB7XG4gICAgICAgICAgICBnZXRTZW5kZXIoKSB7IHJldHVybiBteVJlcGxpY2FJZDsgfSxcbiAgICAgICAgICAgIGdldFNlbmRlckNvdW50ZXIoKSB7IHJldHVybiB2Y0NvcHkuZ2V0KHRoaXMuZ2V0U2VuZGVyKCkpIGFzIG51bWJlcjt9LFxuICAgICAgICAgICAgYXNWZWN0b3JDbG9jaygpIHsgcmV0dXJuIHZjQ29weTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lc3RhbXA7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjb2xsZWN0aW9uIG9mIENyZHRSdW50aW1lcyBsaW5rZWQgdG9nZXRoZXJcbiAqIChpLmUuLCBpbi1tZW1vcnkgbmV0d29ya2luZykgdGhhdCBkZWxpdmVyIG1lc3NhZ2VzXG4gKiB3aGVuIHJlbGVhc2UgaXMgY2FsbGVkLlxuICovXG5leHBvcnQgY2xhc3MgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3Ige1xuICAgIG5ld1J1bnRpbWUocmVwbGljYUlkPzogYW55KSA6IFRlc3RpbmdSdW50aW1lIHtcbiAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdW5kZWZpbmVkKSByZXBsaWNhSWQgPSB0aGlzLm1lc3NhZ2VRdWV1ZXMuc2l6ZTtcbiAgICAgICAgbGV0IHJ1bnRpbWUgPSBuZXcgVGVzdGluZ1J1bnRpbWUodGhpcywgcmVwbGljYUlkKTtcbiAgICAgICAgbGV0IG5ld1F1ZXVlID0gbmV3IE1hcDxUZXN0aW5nUnVudGltZSwgQXJyYXk8YW55Pj4oKTtcbiAgICAgICAgZm9yIChsZXQgb2xkRW50cnkgb2YgdGhpcy5tZXNzYWdlUXVldWVzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbmV3UXVldWUuc2V0KG9sZEVudHJ5WzBdLCBbXSk7XG4gICAgICAgICAgICBvbGRFbnRyeVsxXS5zZXQocnVudGltZSwgW10pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWVzc2FnZVF1ZXVlcy5zZXQocnVudGltZSwgbmV3UXVldWUpO1xuICAgICAgICByZXR1cm4gcnVudGltZTtcbiAgICB9XG4gICAgLy8gTWFwcyBzZW5kZXIgYW5kIHJlY2lwaWVudCB0byBhbiBhcnJheSBvZiBxdWV1ZWQgW21lc3NhZ2UsXG4gICAgLy8gY3JkdElkLCB0aW1lc3RhbXBdIHR1cGxlcy5cbiAgICBtZXNzYWdlUXVldWVzID0gbmV3IE1hcDxUZXN0aW5nUnVudGltZSxcbiAgICAgICAgTWFwPFRlc3RpbmdSdW50aW1lLCBBcnJheTxbYW55LCBhbnksIENhdXNhbFRpbWVzdGFtcF0+Pj4oKTtcbiAgICAvKipcbiAgICAgKiBSZWxlYXNlIGFsbCBxdWV1ZWQgbWVzc2FnZXMgc2VuZGVyIHRvIHRoZSBzcGVjaWZpZWQgcmVjaXBpZW50cy5cbiAgICAgKiBJZiByZWNpcGllbnRzIGFyZSBub3Qgc3BlY2lmaWVkLCByZWxlYXNlcyB0aGVtIHRvIGFsbFxuICAgICAqIHJlY2lwaWVudHMuICBPbmx5IHJlY2lwaWVudHMgdGhhdCBleGlzdGVkIGF0IHRoZSB0aW1lXG4gICAgICogb2Ygc2VuZGluZyB3aWxsIHJlY2VpdmUgYSBtZXNzYWdlLlxuICAgICAqL1xuICAgIHJlbGVhc2Uoc2VuZGVyOiBUZXN0aW5nUnVudGltZSwgLi4ucmVjaXBpZW50czogVGVzdGluZ1J1bnRpbWVbXSkge1xuICAgICAgICBpZiAocmVjaXBpZW50cy5sZW5ndGggPT09IDApIHJlY2lwaWVudHMgPSBbLi4udGhpcy5tZXNzYWdlUXVldWVzLmtleXMoKV07XG4gICAgICAgIGxldCBzZW5kZXJNYXAgPSB0aGlzLm1lc3NhZ2VRdWV1ZXMuZ2V0KHNlbmRlcikgYXNcbiAgICAgICAgICAgIE1hcDxUZXN0aW5nUnVudGltZSwgQXJyYXk8YW55Pj47XG4gICAgICAgIGZvciAobGV0IHJlY2lwaWVudCBvZiByZWNpcGllbnRzKSB7XG4gICAgICAgICAgICBpZiAocmVjaXBpZW50ID09PSBzZW5kZXIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgbWVzc2FnZVBhaXIgb2YgKHNlbmRlck1hcC5nZXQocmVjaXBpZW50KSBhcyBBcnJheTxbYW55LCBhbnksIENhdXNhbFRpbWVzdGFtcF0+KSkge1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHJlY2lwaWVudC5saXN0ZW5lcnNCeUlkLmdldChcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVBhaXJbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIENyZHQgd2l0aCBpZCBcIiArIG1lc3NhZ2VQYWlyWzFdICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIG9uIHJlcGxpY2EgXCIgKyByZWNpcGllbnQuZ2V0UmVwbGljYUlkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5yZWNlaXZlKG1lc3NhZ2VQYWlyWzBdLCBtZXNzYWdlUGFpclsyXSk7XG4gICAgICAgICAgICAgICAgcmVjaXBpZW50LnZlY3RvckNsb2NrLnNldChzZW5kZXIuZ2V0UmVwbGljYUlkKCksIG1lc3NhZ2VQYWlyWzJdLmdldFNlbmRlckNvdW50ZXIoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZW5kZXJNYXAuc2V0KHJlY2lwaWVudCwgW10pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbGVhc2VBbGwoKSB7XG4gICAgICAgIGZvciAobGV0IHNlbmRlciBvZiB0aGlzLm1lc3NhZ2VRdWV1ZXMua2V5cygpKSB0aGlzLnJlbGVhc2Uoc2VuZGVyKTtcbiAgICB9XG59XG4iLCJjb25zb2xlLmxvZyhcIlJ1bm5pbmcgdGVzdHNcIik7XG5yZXF1aXJlKCcuL2NyZHRzL2Jhc2ljX2NyZHRzX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL3Jlc2V0dGFibGVfdGVzdHMnKTtcbnJlcXVpcmUoJy4vY3JkdHMvc3RhbmRhcmRfdGVzdHMnKTtcbnJlcXVpcmUoJy4vY3JkdHMvanNvbl90ZXN0cycpO1xuXG5cbi8vIGNvbnN0IGhvd0xvbmdUaWxsTHVuY2ggPSByZXF1aXJlKCcuLicpO1xuLy9cbi8vIGNsYXNzIE1vY2tEYXRlIHtcbi8vIFx0cHJpdmF0ZSBkYXRlID0gMDtcbi8vIFx0cHJpdmF0ZSBob3VycyA9IDA7XG4vLyBcdHByaXZhdGUgbWludXRlcyA9IDA7XG4vLyBcdHByaXZhdGUgc2Vjb25kcyA9IDA7XG4vLyBcdHByaXZhdGUgbWlsbGlzZWNvbmRzID0gMDtcbi8vXG4vLyBcdGdldERhdGUgKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmRhdGU7IH1cbi8vIFx0c2V0RGF0ZSAoZGF0ZTogbnVtYmVyKTogdm9pZCB7IHRoaXMuZGF0ZSA9IGRhdGU7IH1cbi8vIFx0c2V0SG91cnMgKGg6IG51bWJlcikgeyB0aGlzLmhvdXJzID0gaDsgfVxuLy8gXHRzZXRNaW51dGVzIChtOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5taW51dGVzID0gbTsgfVxuLy8gXHRzZXRTZWNvbmRzIChzOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5zZWNvbmRzID0gczsgfVxuLy8gXHRzZXRNaWxsaXNlY29uZHMgKG1zOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5taWxsaXNlY29uZHMgPSBtczsgfVxuLy8gXHRnZXRUaW1lICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZU9mKCk7IH1cbi8vIFx0dmFsdWVPZiAoKTogbnVtYmVyIHtcbi8vIFx0XHRyZXR1cm4gKFxuLy8gXHRcdFx0dGhpcy5taWxsaXNlY29uZHMgK1xuLy8gXHRcdFx0dGhpcy5zZWNvbmRzICogMWUzICtcbi8vIFx0XHRcdHRoaXMubWludXRlcyAqIDFlMyAqIDYwICtcbi8vIFx0XHRcdHRoaXMuaG91cnMgKiAxZTMgKiA2MCAqIDYwICtcbi8vIFx0XHRcdHRoaXMuZGF0ZSAqIDFlMyAqIDYwICogNjAgKiAyNFxuLy8gXHRcdCk7XG4vLyBcdH1cbi8vXG4vLyBcdHN0YXRpYyBub3cgKCkgeyByZXR1cm4gbm93LnZhbHVlT2YoKTsgfVxuLy8gfVxuLy9cbi8vIGNvbnN0IG5vdyA9IG5ldyBNb2NrRGF0ZSgpO1xuLy9cbi8vIGdsb2JhbC5EYXRlID0gTW9ja0RhdGUgYXMgYW55IGFzIHR5cGVvZiBEYXRlO1xuLy9cbi8vIGZ1bmN0aW9uIHRlc3QoaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIsIGV4cGVjdGVkOiBzdHJpbmcpOiB2b2lkIHtcbi8vIFx0bm93LnNldEhvdXJzKGhvdXJzKTtcbi8vIFx0bm93LnNldE1pbnV0ZXMobWludXRlcyk7XG4vLyBcdG5vdy5zZXRTZWNvbmRzKHNlY29uZHMpO1xuLy9cbi8vIFx0YXNzZXJ0LmVxdWFsKGhvd0xvbmdUaWxsTHVuY2goLi4ubHVuY2h0aW1lKSwgZXhwZWN0ZWQpO1xuLy8gXHRjb25zb2xlLmxvZyhgXFx1MDAxQlszMm3inJNcXHUwMDFCWzM5bSAke2V4cGVjdGVkfWApO1xuLy8gfVxuLy9cbi8vIGxldCBsdW5jaHRpbWUgPSBbIDEyLCAzMCBdO1xuLy8gdGVzdCgxMSwgMzAsIDAsICcxIGhvdXInKTtcbi8vIHRlc3QoMTAsIDMwLCAwLCAnMiBob3VycycpO1xuLy8gdGVzdCgxMiwgMjUsIDAsICc1IG1pbnV0ZXMnKTtcbi8vIHRlc3QoMTIsIDI5LCAxNSwgJzQ1IHNlY29uZHMnKTtcbi8vIHRlc3QoMTMsIDMwLCAwLCAnMjMgaG91cnMnKTtcbi8vXG4vLyAvLyBzb21lIG9mIHVzIGxpa2UgYW4gZWFybHkgbHVuY2hcbi8vIGx1bmNodGltZSA9IFsgMTEsIDAgXTtcbi8vIHRlc3QoMTAsIDMwLCAwLCAnMzAgbWludXRlcycpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==