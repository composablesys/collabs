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
 * Generate uuid for client.
 * Create CRDTs (e.g. CounterCrdt).
 */
const client_uuid = uuid_1.v4();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvYXNzZXJ0L2Fzc2VydC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy91dGlsL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9iYXNpY19jcmR0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2NyZHRfY29yZS50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL2pzb24udHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9jcmR0cy9yZXNldHRhYmxlLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvY3JkdHMvc2VtaWRpcmVjdC50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL2NyZHRzL3N0YW5kYXJkLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3NyYy9uZXR3b3JrL3ZlY3Rvcl9jbG9jay50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9iYXNpY19jcmR0c190ZXN0cy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC9jcmR0cy9qc29uX3Rlc3RzLnRzIiwid2VicGFjazovL0NvbXBvdmVudHVhbHMvLi90ZXN0L2NyZHRzL3Jlc2V0dGFibGVfdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvY3JkdHMvc3RhbmRhcmRfdGVzdHMudHMiLCJ3ZWJwYWNrOi8vQ29tcG92ZW50dWFscy8uL3Rlc3QvcnVudGltZV9mb3JfdGVzdGluZy50cyIsIndlYnBhY2s6Ly9Db21wb3ZlbnR1YWxzLy4vdGVzdC90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBLDhDQUFhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLDREQUFlOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxtQkFBTyxDQUFDLDBDQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EsbURBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsZ0RBQWdEOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxvQkFBb0I7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN6ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6RkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Q0FBNEMsS0FBSzs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixtQkFBTyxDQUFDLDBFQUFvQjs7QUFFL0M7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLG1CQUFtQixtQkFBTyxDQUFDLCtFQUFVOztBQUVyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtDQUFrQztBQUM3RCwyQkFBMkIsbURBQW1EO0FBQzlFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlyQkEsU0FBUyxtQkFBTyxDQUFDLHVDQUFNO0FBQ3ZCLFNBQVMsbUJBQU8sQ0FBQyx1Q0FBTTs7QUFFdkI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pDQSxVQUFVLG1CQUFPLENBQUMseURBQVc7QUFDN0Isa0JBQWtCLG1CQUFPLENBQUMsaUVBQW1COztBQUU3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUdBLFVBQVUsbUJBQU8sQ0FBQyx5REFBVztBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRTdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBLHVGQUErQztBQUUvQzs7OztHQUlHO0FBQ0gsTUFBYSxlQUFlO0lBQ3hCLE1BQU0sQ0FBQyxXQUFvQjtRQUN2QixJQUFJLFdBQVcsS0FBSyxTQUFTO1lBQUUsT0FBTyxXQUFXLENBQUM7O1lBQzdDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDRCxPQUFPLENBQUMsU0FBaUIsRUFBRSxNQUFjO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBZSxFQUFFLEtBQWEsRUFBRSxVQUFlLEVBQUUsVUFBMkI7UUFDL0UsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7QUFWTCwwQ0FZQztBQURVLHdCQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUc1Qzs7Ozs7Ozs7R0FRRztBQUNILE1BQWEsV0FBWSxTQUFRLGdCQUFZO0lBQ3pDLFlBQVksRUFBTyxFQUFFLE9BQW9CLEVBQUUsV0FBb0I7UUFDM0QsS0FBSyxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNELEdBQUcsQ0FBQyxDQUFTO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsSUFBSSxLQUFLLENBQUMsUUFBZ0I7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDSjtBQXhCRCxrQ0F3QkM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBYSxvQkFBb0I7SUFDN0IsTUFBTSxDQUFDLFdBQW9CO1FBQ3ZCLElBQUksV0FBVyxLQUFLLFNBQVM7WUFBRSxPQUFPLFdBQVcsQ0FBQzs7WUFDN0MsT0FBTyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFpQixFQUFFLE1BQWM7UUFDckMsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFlLEVBQUUsS0FBYSxFQUFFLFVBQWUsRUFBRSxVQUEyQjtRQUMvRSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDOztBQVZMLG9EQVlDO0FBRFUsNkJBQVEsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFHakQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFhLGdCQUFpQixTQUFRLGdCQUFZO0lBQzlDLFlBQVksRUFBTyxFQUFFLE9BQW9CLEVBQUUsV0FBb0I7UUFDM0QsS0FBSyxDQUFDLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxJQUFJLENBQUMsQ0FBUztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxJQUFJLEtBQUssQ0FBQyxRQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO2FBQ3BGOztnQkFDSSxPQUFPLENBQUMsa0JBQWtCO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXpCRCw0Q0F5QkM7QUFFRCxvRUFBb0U7QUFDcEUsOENBQThDO0FBQzlDLCtFQUErRTtBQUMvRSxRQUFRO0FBQ1IsNkNBQTZDO0FBQzdDLDZEQUE2RDtBQUM3RCx5QkFBeUI7QUFDekIsUUFBUTtBQUNSLDJEQUEyRDtBQUMzRCxzQ0FBc0M7QUFDdEMsUUFBUTtBQUNSLCtHQUErRztBQUMvRyx1REFBdUQ7QUFDdkQsUUFBUTtBQUNSLCtCQUErQjtBQUMvQiwrQ0FBK0M7QUFDL0MsNERBQTREO0FBQzVELFFBQVE7QUFDUixJQUFJO0FBRUo7Ozs7OztHQU1HO0FBQ0gsTUFBTSxZQUFZO0lBQ2QsTUFBTSxDQUFDLFdBQXNCO1FBQ3pCLElBQUksV0FBVztZQUFFLE9BQU8sSUFBSSxHQUFHLENBQU0sV0FBVyxDQUFDLENBQUM7O1lBQzdDLE9BQU8sSUFBSSxHQUFHLEVBQU8sQ0FBQztJQUMvQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQWMsRUFBRSxLQUFlO1FBQ25DLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFDakMsT0FBTyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFZLEVBQUUsS0FBZSxFQUFFLFVBQTJCO1FBQzdELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNwQixlQUFlO1lBQ2YsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4QjthQUNJO1lBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQixPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQzs7QUFDTSxxQkFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFHekM7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBYSxRQUFTLFNBQVEsZ0JBQWM7SUFDeEMsWUFBWSxFQUFPLEVBQUUsT0FBb0IsRUFBRSxXQUFzQjtRQUM3RCxLQUFLLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDRCxHQUFHLENBQUMsT0FBWTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBYkQsNEJBYUM7QUFFRCxNQUFNLDBCQUEwQjtJQUM1Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxXQUFlO1FBQ2xCLElBQUksV0FBVyxLQUFLLFNBQVM7WUFBRSxPQUFPLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNwRSxPQUFPLElBQUksR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7Ozs7O09BT0c7SUFDSCxPQUFPLENBQUMsU0FBeUIsRUFBRSxNQUE2QixFQUFFLFVBQWU7UUFDN0UsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7ZUFDakQsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLE9BQXVCLEVBQUUsS0FBNEIsRUFBRSxVQUFlLEVBQUUsU0FBMEI7UUFDckcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7ZUFDN0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO1lBQ3JCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7Z0JBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBaUI7aUJBQ3ZEO2dCQUNELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pFO1NBQ0o7UUFDRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QixDQUFDOztBQUNNLG1DQUFRLEdBQUcsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO0FBR3ZELE1BQWEsa0JBQXNCLFNBQVEsZ0JBQTJCO0lBQ2xFLFlBQVksRUFBTyxFQUFFLE9BQW9CLEVBQUUsV0FBZTtRQUN0RCxLQUFLLENBQUMsRUFBRSxFQUNKLDBCQUEwQixDQUFDLFFBQXlDLEVBQ3BFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBUTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1IsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUssQ0FBQztRQUMxQixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCx3QkFBd0I7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Q0FFSjtBQXJCRCxnREFxQkM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoTEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBYSxlQUFlO0lBQ3hCLFlBQTRCLE1BQWlCLEVBQ3pCLFdBQWdCLEVBQ2hCLFNBQTBCO1FBRmxCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDekIsZ0JBQVcsR0FBWCxXQUFXLENBQUs7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7SUFBSSxDQUFDO0NBQ3REO0FBSkQsMENBSUM7QUFFRCw4REFBOEQ7QUFDOUQsK0RBQStEO0FBQy9ELHdDQUF3QztBQUN4Qzs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFhLElBQUk7SUFZYjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsWUFBNEIsRUFBTyxFQUFrQixZQUE2QixFQUMxRCxPQUFvQixFQUFFLFdBQWlCO1FBRG5DLE9BQUUsR0FBRixFQUFFLENBQUs7UUFBa0IsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQzFELFlBQU8sR0FBUCxPQUFPLENBQWE7UUFwQjVDOzs7V0FHRztRQUNILGFBQVEsR0FBc0MsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFxQjFELHNEQUFzRDtRQUN0RCxzREFBc0Q7UUFDdEQsaURBQWlEO1FBQ2pELDJDQUEyQztRQUMzQywwQ0FBMEM7UUFDbEMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsd0JBQW1CLEdBQWUsRUFBRSxDQUFDO1FBQ3JDLDRCQUF1QixHQUFlLEVBQUUsQ0FBQztRQVg3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQVVTLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVELDhDQUE4QztJQUNwQyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFDdEMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ08sT0FBTyxDQUFDLFNBQWM7UUFDNUIsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNsQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDekMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUN2QyxTQUFTLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxJQUFJLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7WUFDNUMsT0FBTyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ08scUJBQXFCLENBQUMsWUFBd0I7UUFDcEQsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsd0JBQXdCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxLQUFXLENBQUM7SUFDakI7Ozs7Ozs7T0FPRztJQUNILFdBQVcsS0FBVyxDQUFDO0lBQ3ZCLE1BQU07SUFDTixnRUFBZ0U7SUFDaEUsaURBQWlEO0lBQ2pELDhEQUE4RDtJQUM5RCwyQ0FBMkM7SUFDM0Msc0RBQXNEO0lBQ3RELDZCQUE2QjtJQUM3QiwwREFBMEQ7SUFDMUQscURBQXFEO0lBQ3JELG1CQUFtQjtJQUNuQiw4REFBOEQ7SUFDOUQsNkRBQTZEO0lBQzdELDBDQUEwQztJQUMxQyw0REFBNEQ7SUFDNUQsb0RBQW9EO0lBQ3BELDJCQUEyQjtJQUMzQixpQ0FBaUM7SUFDakMsTUFBTTtJQUNOLDBDQUEwQztJQUMxQyxtQkFBbUI7SUFDbkIsSUFBSTtJQUVKOzs7T0FHRztJQUNILE9BQU8sQ0FBQyxRQUFhLEVBQUUsU0FBMEI7UUFDN0MsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDO2dCQUMvQywwQ0FBMEM7Z0JBQzFDLG9DQUFvQyxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLFlBQVksR0FBZSxFQUFFLENBQUM7UUFDbEMsS0FBSyxJQUFJLE9BQU8sSUFBSSxRQUFRLEVBQUU7WUFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUQsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNuRTtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBcE5ELG9CQW9OQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JVRCxvRkFBOEY7QUFFOUYsNkZBQW1EO0FBT25ELE1BQWEsUUFBUyxTQUFRLHFCQUE2QjtJQVF2RCxnREFBZ0Q7SUFDaEQsZUFBZTtJQUVmLDZEQUE2RDtJQUM3RCx3REFBd0Q7SUFDeEQsNkNBQTZDO0lBQzdDLDBEQUEwRDtJQUMxRCxZQUFZLE1BQVcsRUFBRSxPQUFvQjtRQUN6QyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBTyxDQUN2QixVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQzNDLElBQUkseUJBQWMsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQzNDLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0JBQU8sQ0FDdEIsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUMxQyxJQUFJLDBCQUFlLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUM1QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFPLENBQ3RCLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FDMUMsSUFBSSxnQ0FBa0IsQ0FBUyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQ3ZELENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksa0JBQU8sQ0FDbkIsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUN2QyxJQUFJLHFCQUFVLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUN2QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFPLENBQ3RCLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FDMUMsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUNyQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDekMsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILEdBQUcsQ0FBQyxHQUFXLEVBQUUsYUFDUTtRQUNyQixRQUFRLE9BQU8sYUFBYSxFQUFFO1lBQzFCLEtBQUssU0FBUyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxLQUFLLFFBQVEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEtBQUssUUFBUTtnQkFDVCxJQUFJLGFBQWEsWUFBWSxHQUFHLEVBQUU7b0JBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzdCOztvQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DO29CQUMzQyxDQUFDLE9BQU8sYUFBYSxDQUFDLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFDRCxHQUFHLENBQUMsR0FBVyxFQUFFLGFBQ1E7UUFDckIsUUFBUSxPQUFPLGFBQWEsRUFBRTtZQUMxQixLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxhQUFhLFlBQVksR0FBRyxFQUFFO29CQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM3Qjs7b0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QztnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQztvQkFDM0MsQ0FBQyxPQUFPLGFBQWEsQ0FBQyxHQUFHLElBQUksR0FBRyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQVcsRUFBRSxhQUNLO1FBQ3JCLFFBQVEsT0FBTyxhQUFhLEVBQUU7WUFDMUIsS0FBSyxTQUFTO2dCQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE9BQU87WUFDbEQsS0FBSyxRQUFRO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE9BQU87WUFDaEQsS0FBSyxRQUFRO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE9BQU87WUFDaEQsS0FBSyxRQUFRO2dCQUNULElBQUksYUFBYSxZQUFZLEdBQUcsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsT0FBTztpQkFDakM7O29CQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLE9BQU87WUFDMUM7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUM7b0JBQzNDLENBQUMsT0FBTyxhQUFhLENBQUMsR0FBRyxJQUFJLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxRQUFRLENBQUMsR0FBVyxFQUFFLGFBQ0c7UUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDN0MsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxTQUFTLFlBQVksZ0NBQWtCLEVBQUU7Z0JBQ3pDLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ2xDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztpQkFDekM7O29CQUNJLE9BQU8sUUFBUSxDQUFDO2FBQ3hCOztnQkFDSSxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsSUFBSSxDQUFDLEdBQVcsRUFBRSxhQUNPO1FBQ3JCLCtDQUErQztRQUMvQyxRQUFRLE9BQU8sYUFBYSxFQUFFO1lBQzFCLEtBQUssU0FBUyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLEtBQUssUUFBUTtnQkFDVCxJQUFJLGFBQWEsWUFBWSxHQUFHLEVBQUU7b0JBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzlCOztvQkFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DO29CQUMzQyxDQUFDLE9BQU8sYUFBYSxDQUFDLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FDRztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU8sZ0JBQWdCLENBQUMsR0FBVyxFQUFFLEtBQ2I7UUFDckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDeEIsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELFVBQVUsQ0FBQyxhQUNjO1FBQ3JCLFFBQVEsT0FBTyxhQUFhLEVBQUU7WUFDMUIsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUMsS0FBSyxRQUFRO2dCQUNULElBQUksYUFBYSxZQUFZLEdBQUcsRUFBRTtvQkFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMzQjs7b0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DO29CQUMzQyxDQUFDLE9BQU8sYUFBYSxDQUFDLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFDRDs7T0FFRztJQUNILElBQUk7UUFDQSxJQUFJLE1BQU0sR0FBNEIsRUFBRSxDQUFDO1FBQ3pDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDNUQsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBU08sTUFBTSxDQUFDLG9CQUFvQixDQUFDLGVBQXVCO1FBQ3ZELElBQUksQ0FBQyxDQUFDLGVBQWUsS0FBSyxRQUFRLENBQUMsV0FBVztZQUN0QyxlQUFlLEtBQUssUUFBUSxDQUFDLGVBQWU7WUFDNUMsZUFBZSxLQUFLLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3BELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDO2dCQUM1QyxlQUFlLENBQUMsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsV0FBVyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsZUFBZSxFQUM5QyxZQUFZLEdBQUcsS0FBSztRQUN4QixRQUFRLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLEdBQWtCLEVBQUUsQ0FBQztRQUMvQiw0Q0FBNEM7UUFDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFDMUMsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQzVDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUMzRCxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQ3pDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUMzRCxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQ3ZDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUMzRCxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQ3ZDLEtBQUssQ0FBQyxFQUFFO1lBQ0osSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQztnQkFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7O2dCQUN0RCxPQUFPLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFDM0QsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUNqQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDekQsQ0FBQztRQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUMzRCxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQ3ZDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQzVELENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ08sbUJBQW1CLENBQ3ZCLE1BQXFCLEVBQUUsU0FBOEIsRUFDckQsbUJBQWdDLEVBQUUsZUFBdUIsRUFDekQsR0FBdUIsRUFBRSxRQUFnQixFQUN6QyxTQUFnQztRQUNoQyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQU0sQ0FBQyxDQUFDO1lBQ3pDLElBQUksZUFBZSxLQUFLLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN4QztpQkFDSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLGVBQWU7Z0JBQ2YsSUFBSSxlQUFlLEtBQUssUUFBUSxDQUFDLGVBQWUsRUFBRTtvQkFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxHQUFHOzBCQUNqQyx3QkFBd0I7d0JBQzFCLDBCQUEwQixDQUFDLENBQUM7aUJBQ25DO3FCQUNJO29CQUNELGdEQUFnRDtvQkFDaEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDL0IsNEJBQTRCO3dCQUM1QixtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzdCLElBQUksUUFBUSxHQUFROzRCQUNoQixxQkFBcUIsRUFBRSxJQUFJO3lCQUM5QixDQUFDO3dCQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO3FCQUMxQjtvQkFDQSxNQUFNLENBQUMsR0FBRyxDQUFtQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDcEQ7YUFDSjtpQkFDSTtnQkFDRCxrQkFBa0I7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQkc7SUFDSCxXQUFXLENBQUMsUUFBZ0IsRUFBRSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsZUFBZTtRQUM1RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsV0FBVyxDQUFDLEtBQWEsRUFBRSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZUFBZTtRQUN0RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDTyxtQkFBbUIsQ0FBQyxLQUFvQixFQUFFLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxlQUFlO1FBQzdGLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXBELHdEQUF3RDtRQUN4RCxJQUFJLFVBQVUsR0FBaUMsRUFBRSxDQUFDO1FBQ2xELEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3hCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQVksQ0FBQztZQUNqQixJQUFJLG9CQUFvQixLQUFLLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQy9DLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLDJDQUEyQztnQkFDM0MsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsU0FBUyxZQUFZLEdBQUcsSUFBSSxTQUFTLFlBQVksS0FBSyxDQUFDLEVBQUU7b0JBQy9FLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0o7aUJBQ0k7Z0JBQ0QsSUFBSSxHQUFHLE9BQU8sU0FBUyxDQUFDO2dCQUN4QixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQ25CLElBQUksU0FBUyxZQUFZLEdBQUcsSUFBSSxTQUFTLFlBQVksS0FBSzt3QkFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO2lCQUM1RTthQUNKO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUVELG1EQUFtRDtRQUNuRCwyQkFBMkI7UUFDM0IsSUFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyw0QkFBNEI7WUFDNUIsSUFBSSxvQkFBb0IsS0FBSyxRQUFRLENBQUMsZ0JBQWdCO2dCQUM5QyxDQUFDLEdBQUcsY0FBYztnQkFDbEIsT0FBTyxTQUFTLEtBQUssUUFBUTtnQkFDN0IsU0FBUyxDQUFDLHFCQUFxQixDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUMvQywrQ0FBK0M7Z0JBQy9DLEtBQUssSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFO29CQUNoQyxJQUFJLFlBQVksS0FBSyxxQkFBcUIsRUFBRTt3QkFDeEMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdEU7aUJBQ0o7YUFDSjtpQkFDSTtnQkFDRCxnREFBZ0Q7Z0JBQ2hELG9CQUFvQjtnQkFDcEIsSUFBSSxPQUFPLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQzNCLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDbkIsZ0JBQWdCO3dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBYyxDQUFDLG1CQUFtQixDQUNyRCxTQUFTLEVBQUUsb0JBQW9CLENBQ2xDLENBQUM7cUJBQ0w7eUJBQ0ksSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDbkUscUNBQXFDO3dCQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3FCQUM5QztpQkFDSjtxQkFDSSxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLFlBQVksR0FBRyxJQUFJLFNBQVMsWUFBWSxLQUFLLENBQUMsRUFBRTtvQkFDakYsNkJBQTZCO29CQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFvQixDQUFDO29CQUNoRSxLQUFLLElBQUksS0FBSyxJQUFJLFNBQVM7d0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkQ7Z0JBQ0QsK0NBQStDO2FBQ2xEO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxJQUFJLEtBQUssQ0FBQyxRQUFnQjtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7O0FBbGVMLDRCQW1lQztBQWxRRyxlQUFlO0FBQ2YsMkRBQTJEO0FBQzNELDZCQUE2QjtBQUViLHdCQUFlLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLG9CQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLHlCQUFnQixHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hQekMsdUZBQWlEO0FBQ2pELDBGQUFtRTtBQUduRSwrREFBK0Q7QUFDL0QsMkRBQTJEO0FBQzNELDZEQUE2RDtBQUM3RCxrRUFBa0U7QUFDbEUsdUJBQXVCO0FBQ3ZCLE1BQWEsa0JBQWtCO0lBQzNCLFlBQTRCLFlBQTZCLEVBQ3JDLGdCQUFxQjtRQURiLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUNyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQUs7SUFBSSxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxXQUFpQjtRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxPQUFPLENBQUMsU0FBaUIsRUFBRSxNQUFTO1FBQ2hDLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQjtnQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQWUsRUFBRSxNQUFTLEVBQUUsVUFBZSxFQUFFLFVBQTJCO1FBQzNFLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QjtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0Qsd0RBQXdEO1FBQ3hELHNEQUFzRDtRQUN0RCxvQkFBb0I7UUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFJLFlBQTZCLEVBQ3JDLGdCQUFxQjtRQUN6QixPQUFPLElBQUksK0JBQWtCLENBQ3pCLFlBQVksRUFBRSxJQUFJLGtCQUFrQixDQUFDLFlBQVksRUFDakQsZ0JBQWdCLENBQUMsRUFDakIsQ0FBQyxHQUFZLEVBQUUsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQ2hDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FDeEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXBDRCxnREFvQ0M7QUFFRCxNQUFhLG9CQUNMLFNBQVEsZ0JBQXdCO0lBRXBDOzs7Ozs7O09BT0c7SUFDSCxZQUFZLEVBQU8sRUFBRSxvQkFBcUMsRUFDbEQsZ0JBQXFCLEVBQ3JCLE9BQW9CLEVBQUUsV0FBaUI7UUFDM0MsSUFBSSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUN0QyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FDekMsQ0FBQztRQUNGLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsb0JBQW9CLENBQUM7SUFDOUQsQ0FBQztJQUNELFdBQVc7UUFDUCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELDhCQUE4QjtRQUMxQixPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7OztPQUlHO0lBQ08sT0FBTyxDQUFDLFNBQWM7UUFDNUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNPLHFCQUFxQixDQUFDLFlBQXdCO1FBQ3BELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksSUFBSSxJQUFJLFlBQVksRUFBRTtZQUMzQixJQUFJLElBQUksS0FBSyxJQUFJO2dCQUFFLFNBQVM7WUFDNUIseUNBQXlDO2lCQUNwQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDM0MsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEM7WUFDRCxpREFBaUQ7aUJBQzVDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QjtpQkFDSTtnQkFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RTtTQUNKO1FBQ0QsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFDcEMsT0FBTyxJQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNPLDhCQUE4QixDQUFDLFlBQXdCO1FBQzdELE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLHNCQUFzQjtRQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQ3BDLENBQUM7Q0FDSjtBQW5GRCxvREFtRkM7QUFFRCw2REFBNkQ7QUFDN0Qsc0RBQXNEO0FBRXRELE1BQWEsc0JBQXNCO0lBQy9CLFlBQTRCLFlBQTZCLEVBQ3JDLGdCQUFxQjtRQURiLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUNyQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQUs7SUFBSSxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxXQUFpQjtRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxPQUFPLENBQUMsU0FBaUIsRUFBRSxNQUFTO1FBQ2hDLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQjtnQkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLE9BQXNDLEVBQUUsTUFBUyxFQUNoRCxTQUFjLEVBQUUsVUFBMkI7UUFDL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssSUFBSSxpQkFBaUIsSUFBSSxPQUFPLEVBQUU7WUFDbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQ3RELFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUksWUFBNkIsRUFDckMsZ0JBQXFCLEVBQUUsZUFBZSxHQUFHLEtBQUs7UUFDbEQsT0FBTyxJQUFJLCtCQUFrQixDQUN6QixJQUFJLHNCQUFzQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxFQUMxRCxZQUFZLEVBQ1osQ0FBQyxFQUEwQixFQUFFLEVBQWlDLEVBQUUsRUFBRSxHQUM3RCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUMsRUFDNUIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUNqQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0NELHdEQTJDQztBQUVELE1BQWEscUJBQ0wsU0FBUSxvQkFBd0M7SUFFcEQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLEVBQU8sRUFBRSxvQkFBcUMsRUFDbEQsZ0JBQXFCLEVBQ3JCLE9BQW9CLEVBQUUsV0FBaUIsRUFDdkMsZUFBZSxHQUFHLEtBQUs7UUFDM0IsSUFBSSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUMxQyxvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQUUsZUFBZSxDQUNwQyxDQUFDO1FBQ0YsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsS0FBSztRQUNELG1EQUFtRDtRQUNuRCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFDRCx3QkFBd0I7UUFDcEIsd0RBQXdEO1FBQ3hELDJEQUEyRDtRQUMzRCxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7O09BSUc7SUFDTyxPQUFPLENBQUMsU0FBYztRQUM1QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ08sOEJBQThCLENBQUMsWUFBd0I7UUFDN0QsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxJQUFJLElBQUksWUFBWSxFQUFFO1lBQzNCLElBQUksSUFBSSxLQUFLLElBQUk7Z0JBQUUsU0FBUztZQUM1Qiw0REFBNEQ7WUFDNUQsK0JBQStCO2lCQUMxQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxhQUFhLEVBQUU7Z0JBQ2hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7WUFDRCw4Q0FBOEM7WUFDOUMsMkJBQTJCO2lCQUN0QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDOUMsZ0RBQWdEO2dCQUNoRCw2Q0FBNkM7Z0JBQzdDLGdEQUFnRDtnQkFDaEQsNENBQTRDO2dCQUM1QyxnREFBZ0Q7Z0JBQ2hELDRDQUE0QztnQkFDNUMsNEJBQTRCO2dCQUM1QixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUM7WUFDRCxpREFBaUQ7aUJBQzVDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QjtpQkFDSTtnQkFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN4RTtTQUNKO1FBQ0QsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFDcEMsT0FBTyxJQUFJLENBQUMsK0JBQStCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7T0FHRztJQUNPLCtCQUErQixDQUFDLFlBQXdCO1FBQzlELE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLHVCQUF1QjtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNsRCxDQUFDO0NBQ0o7QUExR0Qsc0RBMEdDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM1JELDJEQUEyRDtBQUMzRCxpQ0FBaUM7QUFDakMsbUVBQW1FO0FBQ25FLDhEQUE4RDtBQUM5RCxvRUFBb0U7QUFDcEUsbURBQW1EO0FBQ25ELG1FQUFtRTtBQUNuRSw4REFBOEQ7QUFDOUQsaUNBQWlDO0FBQ2pDLE1BQWEsZUFBZTtJQVl4QixZQUFtQixhQUFnQixFQUNmLGlCQUEwQixFQUMxQix3QkFBaUMsRUFDakMsd0JBQWlDO1FBSGxDLGtCQUFhLEdBQWIsYUFBYSxDQUFHO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFTO1FBQzFCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBUztRQUNqQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQVM7UUFkN0MsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDM0I7Ozs7Ozs7O1dBUUc7UUFDSyxZQUFPLEdBQTJDLElBQUksR0FBRyxFQUFFLENBQUM7SUFJWCxDQUFDO0lBQzFEOzs7T0FHRztJQUNILEdBQUcsQ0FBQyxTQUFjLEVBQUUsT0FBWSxFQUFFLFNBQTBCO1FBQ3hELElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUM3QixhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUkseUJBQXlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFDO1lBQy9DLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3RDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxhQUFhLENBQUMsU0FBYyxFQUFFLFNBQTBCO1FBQ3BELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUNuRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSyxnQkFBZ0IsQ0FBQyxTQUFjLEVBQy9CLFNBQTBCLEVBQUUsZ0JBQXlCLEVBQ3JELGdCQUF5QjtRQUM3QixJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDckMsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDbEIsNENBQTRDO2dCQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELG9EQUFvRDtRQUNwRCxpREFBaUQ7UUFDakQseURBQXlEO1FBQ3pELElBQUksVUFBVSxHQUFpQyxFQUFFLENBQUM7UUFDbEQsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLEtBQUssSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzVCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDN0IsSUFBSSxvQkFBb0IsR0FDcEIsZUFBZSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELElBQUksZ0JBQWdCLEVBQUU7b0JBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzlELFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3JDO2lCQUNKO2dCQUNELElBQUksZ0JBQWdCLEVBQUU7b0JBQ2xCLG9DQUFvQztvQkFDcEMsMEJBQTBCO29CQUMxQixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO29CQUM5Qyx5Q0FBeUM7b0JBQ3pDLG1DQUFtQztvQkFDbkMsMENBQTBDO2lCQUM3QzthQUNKO1NBQ0o7UUFDRCxJQUFJLGdCQUFnQixFQUFFO1lBQ2xCLHVEQUF1RDtZQUN2RCx1Q0FBdUM7WUFDdkMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsNkNBQTZDO1lBQzdDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BDOztZQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxjQUFjO1FBQ1YsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUF5QyxFQUMzRCxLQUFhO1FBQ2pCLGdEQUFnRDtRQUNoRCwrQ0FBK0M7UUFDL0Msc0RBQXNEO1FBQ3RELGlEQUFpRDtRQUNqRCxrQ0FBa0M7UUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSztnQkFBRSxPQUFPLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUF6SUQsMENBeUlDO0FBRUQsTUFBYSxrQkFBa0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9DRztJQUNILFlBQTRCLEtBQXNCLEVBQzlCLEtBQXNCLEVBQ3RCLE1BQWlDLEVBQ2pDLGVBQXVCLEVBQ3ZCLG9CQUFvQixLQUFLLEVBQ3pCLDJCQUEyQixLQUFLLEVBQ2hDLDJCQUEyQixLQUFLO1FBTnhCLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQTJCO1FBQ2pDLG9CQUFlLEdBQWYsZUFBZSxDQUFRO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUN6Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQVE7UUFDaEMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFRO1FBQzVDLElBQUksZUFBZSxLQUFLLENBQUMsSUFBSSxlQUFlLEtBQUssQ0FBQyxFQUFFO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDO2dCQUMvQyxlQUFlLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFDTDs7O09BR0c7SUFDSCxNQUFNLENBQUMsV0FBaUI7UUFDcEIsSUFBSSxhQUFnQixDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDO1lBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztZQUMxRSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxhQUFhLEVBQ3BDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQ3JELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSCxPQUFPLENBQUMsU0FBd0IsRUFBRSxLQUF5QixFQUNuRCxTQUFjO1FBQ2xCLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMzRSxJQUFJLEdBQUcsS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDOztnQkFDekIsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDM0UsSUFBSSxHQUFHLEtBQUssSUFBSTtnQkFBRSxPQUFPLElBQUksQ0FBQzs7Z0JBQ3pCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLE9BQXNCLEVBQUUsS0FBeUIsRUFBRSxTQUFjLEVBQUUsU0FBMEI7UUFDaEcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN0RixLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSTtnQkFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOztnQkFDeEMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO2FBQ0k7WUFDRCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxJQUFJLEtBQUssSUFBSTtvQkFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQ3BELFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxQixLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7O2dCQUN4QyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0NBQ0o7QUFySEQsZ0RBcUhDO0FBR0QsTUFBYSxjQUFjO0lBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsWUFBNEIsS0FBc0IsRUFDMUIsS0FBc0IsRUFDdEIsZUFBdUI7UUFGbkIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFDM0MsSUFBSSxlQUFlLEtBQUssQ0FBQyxJQUFJLGVBQWUsS0FBSyxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUM7Z0JBQy9DLGVBQWUsQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxXQUFpQjtRQUNwQixJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7O1lBQ2pFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNEOzs7Ozs7O09BT0c7SUFDSCxPQUFPLENBQUMsU0FBd0IsRUFBRSxLQUFRLEVBQ2xDLFNBQWM7UUFDbEIsSUFBSSxPQUFZLENBQUM7UUFDakIsUUFBUSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEIsS0FBSyxDQUFDO2dCQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxTQUFTLENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksT0FBTyxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQzs7WUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sQ0FBQyxPQUFzQixFQUFFLEtBQVEsRUFBRSxTQUFjLEVBQUUsU0FBMEI7UUFDL0UsSUFBSSxNQUFnQixDQUFDO1FBQ3JCLFFBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEtBQUssQ0FBQztnQkFDRixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsR0FBRyxPQUFPLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7WUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUM1QyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNKO0FBcEZELHdDQW9GQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xXRCwwRkFBcUQ7QUFDckQsNkZBQXNFO0FBQ3RFLHVGQUFpRDtBQUNqRCwwRkFBbUY7QUFFbkYsTUFBYSwyQkFBNEIsU0FBUSxnQkFBNkI7SUFNMUUsWUFBWSxFQUFPLEVBQUUsT0FBb0IsRUFBRSxXQUFpQjtRQUN4RCxLQUFLLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxHQUFHLENBQUMsQ0FBUztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQVM7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDcEMsQ0FBQztJQUNTLHFCQUFxQixDQUFDLFlBQXFDO1FBQ2pFLElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDcEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDOztBQTVCTCxrRUE2QkM7QUE1Qkcsa0VBQWtFO0FBQzNELDhDQUFrQixHQUFHLElBQUksK0JBQWtCLENBQzlDLDZCQUFlLENBQUMsUUFBUSxFQUFFLGtDQUFvQixDQUFDLFFBQVEsRUFDdkQsQ0FBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFFLENBQUMsQ0FDdkMsQ0FBQztBQTBCTixNQUFhLGVBQWdCLFNBQVEsa0NBQThDO0lBSy9FLFlBQVksRUFBTyxFQUFFLE9BQW9CLEVBQ2pDLGVBQXVCLENBQUMsRUFBRSxhQUFxQixDQUFDO1FBQ3BELEtBQUssQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxHQUFHLENBQUMsQ0FBUztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQVM7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQztJQUN0RCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxJQUFJLEtBQUssQ0FBQyxRQUFnQjtRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ1MsK0JBQStCLENBQUMsWUFBOEM7UUFDcEYsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQiwyREFBMkQ7WUFDM0QsT0FBTyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDMUQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ2pFLENBQUM7O0FBMUNMLDBDQTJDQztBQTFDVSxrQ0FBa0IsR0FBRyxJQUFJLCtCQUFrQixDQUM5Qyw2QkFBZSxDQUFDLFFBQVEsRUFBRSxrQ0FBb0IsQ0FBQyxRQUFRLEVBQ3ZELENBQUMsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3ZDLENBQUM7QUF5Q04sU0FBUyxXQUFXLENBQUMsQ0FBUyxFQUFFLENBQVM7SUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELE1BQU0sMEJBQTBCO0lBQzVCLE1BQU0sQ0FBQyxXQUErQjtRQUNsQyxJQUFJLFdBQVcsS0FBSyxTQUFTO1lBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzs7WUFDNUMsT0FBTyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFpQixFQUFFLE1BQXlCLEVBQUUsVUFBZTtRQUNqRSxPQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQWUsRUFBRSxLQUF3QixFQUFFLFVBQWUsRUFBRSxVQUEyQjtRQUMxRixPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLENBQUM7O0FBQ00sbUNBQVEsR0FBRyxJQUFJLDBCQUEwQixFQUFFLENBQUM7QUFHdkQsTUFBTSw0QkFBNEI7SUFDOUIsTUFBTSxDQUFDLFlBQWdDO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQWlCLEVBQUUsTUFBeUIsRUFBRSxVQUFlO1FBQ2pFLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixHQUFHLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBZSxFQUFFLEtBQXdCLEVBQUUsVUFBZSxFQUFFLFVBQTJCO1FBQzFGLElBQUksT0FBTyxLQUFLLFNBQVM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQy9FLG1EQUFtRDtRQUNuRCxzREFBc0Q7UUFDdEQscURBQXFEO1FBQ3JELGdCQUFnQjtRQUNoQixPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7O0FBQ00scUNBQVEsR0FBRyxJQUFJLDRCQUE0QixFQUFFLENBQUM7QUFHekQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsY0FBZSxTQUFRLGtDQUF5RDtJQUt6RixZQUFZLEVBQU8sRUFBRSxPQUFvQixFQUNqQyxlQUFrQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFDNUMsYUFBZ0MsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxxQkFBcUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFpQjtRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7T0FHRztJQUNGLElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDRDs7T0FFRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxJQUFJLEtBQUssQ0FBQyxRQUEyQjtRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLE1BQU07SUFDTiw0REFBNEQ7SUFDNUQsYUFBYTtJQUNiLE1BQU07SUFDTix1REFBdUQ7SUFDdkQsRUFBRTtJQUNGLElBQUk7SUFFSywrQkFBK0IsQ0FBQyxhQUErQztRQUNyRixtREFBbUQ7UUFDbkQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xCLG1DQUFtQztRQUNuQyxrRUFBa0U7UUFDbEUsMENBQTBDO1FBQzFDLElBQUk7UUFDSixxQ0FBcUM7UUFDckMsNERBQTREO1FBQzVELGtFQUFrRTtRQUNsRSxnRUFBZ0U7SUFDcEUsQ0FBQzs7QUEvRUwsd0NBZ0ZDO0FBL0VVLGlDQUFrQixHQUFHLElBQUksK0JBQWtCLENBQzlDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSw0QkFBNEIsQ0FBQyxRQUFRLEVBQzFFLENBQUMsR0FBVyxFQUFFLEVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUN0QyxDQUFDO0FBOEVOOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFDekIsWUFBbUIsVUFBb0M7UUFBcEMsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7SUFBRyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxXQUFpQjtRQUNwQixJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFpQixFQUFFLE1BQVM7UUFDaEMsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQWUsRUFBRSxLQUFRLEVBQUUsVUFBZSxFQUFFLFVBQTJCO1FBQzFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUksWUFBNkI7UUFDekMsT0FBTyxJQUFJLDJCQUFjLENBQUksWUFBWSxFQUNyQyxJQUFJLGdCQUFnQixFQUFLLEVBQUUsQ0FBQyxDQUMvQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBckJELDRDQXFCQztBQUVELE1BQWEsY0FBZSxTQUFRLGtDQUEyQjtJQUMzRCxZQUFZLEVBQU8sRUFBRSxPQUFvQjtRQUNyQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0QsT0FBTztRQUNILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0QsYUFBYTtRQUNULElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFpQjtRQUN6QixJQUFJLFFBQVE7WUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFpQjtRQUN2QiwwREFBMEQ7UUFDMUQsMERBQTBEO1FBQzFELDRCQUE0QjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBQ0Qsd0RBQXdEO0lBQ3hELG1GQUFtRjtJQUNuRiw4Q0FBOEM7SUFDcEMsK0JBQStCLENBQUMsWUFBMkI7UUFDakUsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ3RELE9BQU8sUUFBUSxDQUFDO1NBQ25CO2FBQ0ksSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO1lBQ2xFLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO2FBQ0ksSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBYSxFQUFFO1lBQ3hFLE9BQU8sZUFBZSxDQUFDO1NBQzFCO2FBQ0k7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QjtnQkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7Q0FDSjtBQWhERCx3Q0FnREM7QUFHRCxNQUFhLGVBQWdCLFNBQVEsa0NBQTJCO0lBQzVELFlBQVksRUFBTyxFQUFFLE9BQW9CO1FBQ3JDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELFlBQVk7UUFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELE9BQU87UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFpQjtRQUN6QixJQUFJLFFBQVE7WUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFpQjtRQUN2QiwwREFBMEQ7UUFDMUQsMERBQTBEO1FBQzFELDRCQUE0QjtRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBQ0Qsd0RBQXdEO0lBQ3hELGtGQUFrRjtJQUNsRiw4Q0FBOEM7SUFDcEMsK0JBQStCLENBQUMsWUFBMkI7UUFDakUsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ3RELE9BQU8sU0FBUyxDQUFDO1NBQ3BCO2FBQ0ksSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO1lBQ2xFLE9BQU8sUUFBUSxDQUFDO1NBQ25CO2FBQ0ksSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBYSxFQUFFO1lBQ3hFLE9BQU8sY0FBYyxDQUFDO1NBQ3pCO2FBQ0k7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QjtnQkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7Q0FDSjtBQWhERCwwQ0FnREM7QUFJRCxNQUFhLFlBQVk7SUFDckI7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUE0QixXQUF1QyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUFwRCxhQUFRLEdBQVIsUUFBUSxDQUE0QztJQUNoRixDQUFDO0lBTUQsTUFBTSxDQUFDLFlBQWtCO1FBQ3JCLE9BQU8sSUFBSSxHQUFHLEVBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsT0FBTyxDQUFDLFNBQTJCLEVBQUUsS0FBZ0IsRUFBRSxVQUFlO1FBQ2xFLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixRQUFRLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsQixLQUFLLE9BQU87Z0JBQ1IsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsS0FBSyxXQUFXO2dCQUNaLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QyxLQUFLLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQjtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsT0FBMEIsRUFBRSxLQUFnQixFQUMzQyxTQUFjLEVBQUUsU0FBMEI7UUFFOUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLFFBQVEsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEtBQUssV0FBVztnQkFDWixJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ3JDLGlDQUFpQztvQkFDakMsdUNBQXVDO29CQUN2QyxzQ0FBc0M7b0JBQ3RDLFdBQVc7b0JBQ1gsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxRQUFRLEtBQUssU0FBUzt3QkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDN0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDckI7b0JBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDeEI7WUFDRCwwQkFBMEI7WUFDOUIsS0FBSyxPQUFPLENBQUM7Z0JBQ1QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUN4QixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDckI7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUFDO1lBQzFCLEtBQUssTUFBTTtnQkFDUCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3BDO29CQUNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUMzQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztxQkFDN0I7b0JBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztZQUNMLEtBQUssT0FBTztnQkFDUixLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDL0IsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQ3ZELElBQUksWUFBWSxLQUFLLElBQUk7d0JBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN2RSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzFCO2lCQUNKO2dCQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlCO2dCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztDQUNKO0FBeEhELG9DQXdIQztBQUdEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBYSxVQUFtQyxTQUFRLGdCQUFlO0lBTW5FOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFlBQVksRUFBTyxFQUFFLE9BQW9CLEVBQ2pDLGtCQUNFLFVBQVUsQ0FBQyxzQkFBc0I7UUFDdkMsbUJBQW1CO1FBQ25CLElBQUksWUFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakMsWUFBWSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQU0sRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLDRCQUE0QixHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBR0QsK0JBQStCO1FBQzNCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUNELDZCQUE2QjtRQUN6QixJQUFJLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBTyxFQUFFLElBQU87UUFDckIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQztnQkFDOUMsdURBQXVEO2dCQUN2RCwyREFBMkQ7Z0JBQzNELGtDQUFrQyxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDdkQ7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsOERBQThEO1FBQzlELHNDQUFzQztJQUMxQyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsWUFBWSxDQUFDLElBQU87UUFDaEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxZQUFZLEtBQUssU0FBUztZQUFFLE9BQU8sWUFBWSxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFNLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0Qsd0JBQXdCO1FBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsV0FBVyxDQUFDLElBQU87UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCxlQUFlO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBWSxFQUFFLElBQU87UUFDdEIsc0RBQXNEO1FBQ3RELHlDQUF5QztRQUN6Qyw4Q0FBOEM7UUFDOUMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNELGdCQUFnQixDQUFDLE9BQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDOztBQXRHTCxnQ0F1R0M7QUF0R1UsaUNBQXNCLEdBQUcsR0FBRyxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDO1FBQ2xELDhDQUE4QztRQUM5Qyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQW9HTixNQUFhLFVBQWMsU0FBUSxVQUE2QjtJQUM1RCxZQUFZLEVBQU8sRUFBRSxPQUFvQjtRQUNyQyx5Q0FBeUM7UUFDekMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFPLEVBQUUsZUFBNEIsRUFBRSxFQUFFLENBQ3JELElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxHQUFHLENBQUMsS0FBUTtRQUNSLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBUTtRQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFDRCxZQUFZLENBQUMsS0FBUTtRQUNqQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBQ0QsR0FBRyxDQUFDLEtBQVE7UUFDUixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFDckMsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDTCxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBSyxDQUFDO1FBQzFCLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3RDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFnQjtRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixLQUFLLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRTtZQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxNQUFNO1FBQ0YseURBQXlEO1FBQ3pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQixDQUFDO0NBR0o7QUEvQ0QsZ0NBK0NDO0FBRUQsTUFBYSxPQUFnQyxTQUFRLFVBQW9EO0lBR3JHLFlBQVksRUFBTyxFQUFFLE9BQW9CLEVBQ2pDLFlBQXlEO1FBQzdELEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFNdkI7Ozs7V0FJRztRQUNLLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFWckIsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFPRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLENBQUMsT0FBWSxFQUFFLElBQVk7UUFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUN2QywrREFBK0Q7WUFDL0Qsb0RBQW9EO1lBQ3BELHlDQUF5QztZQUN6QyxnREFBZ0Q7WUFDaEQsZ0JBQWdCO1lBQ2hCLGlEQUFpRDtZQUNqRCxLQUFLLElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUMvQixJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFNLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsSUFBSSxDQUFDLEdBQU07UUFDUCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNELEdBQUcsQ0FBQyxHQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsR0FBRyxDQUFDLEdBQU07UUFDTixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDcEQsT0FBTyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFNO1FBQ1QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ0QsWUFBWSxDQUFDLEdBQU07UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FLSjtBQWpGRCwwQkFpRkM7Ozs7Ozs7Ozs7Ozs7OztBQzlzQkQsbUJBQU8sQ0FBQyxvQ0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjO0FBRXZDLHdHQUF1RDtBQUN2RCx1SUFBeUU7QUFDekUsK0VBQWtDO0FBRWxDOztHQUVHO0FBQ0gsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztBQUVqRDs7O0dBR0c7QUFDSCxNQUFNLFdBQVcsR0FBVyxTQUFJLEVBQUUsQ0FBQztBQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLHlDQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2RCxJQUFJLGFBQWEsR0FBRyxJQUFJLHlCQUFXLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRXpELG9CQUFvQjtBQUNwQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpELDREQUE0RDtBQUM1RCxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDOUIsT0FBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUFBLENBQUMsQ0FBQyxDQUFDO0FBRTFELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDSixrR0FBNkM7QUFDN0Msb0NBQW9DO0FBRXBDLGtFQUFrRTtBQUNsRSxxRUFBcUU7QUFDckUsRUFBRTtBQUNGLDBEQUEwRDtBQUUxRDs7O0dBR0c7QUFDSCxNQUFhLFNBQVM7SUFpQmxCLFlBQWEsT0FBYSxFQUFFLE1BQVksRUFBRSxTQUF1QjtRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQ2pCLEVBQUksU0FBUyxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQ3hCLFFBQVEsRUFBRyxJQUFJLENBQUMsTUFBTTtZQUN0QixXQUFXLEVBQUc7Z0JBQ1YsS0FBSyxFQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDMUIsV0FBVyxFQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDL0Q7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF0Q0QsOEJBc0NDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBYSxrQkFBa0I7SUEwQjNCLFlBQWEsU0FBYyxFQUFFLGFBQXFCO1FBY2xEOzs7O1dBSUc7UUFDSCxlQUFVLEdBQUcsR0FBRyxFQUFFO1lBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxFQUFFLENBQUM7YUFDWDtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQWEsQ0FBQztRQUM3QyxDQUFDO1FBQ0Q7Ozs7OztXQU1HO1FBQ0gsa0JBQWEsR0FBRyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQzNCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQztRQXJDRSxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLEVBQTJCLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7UUFDekQ7OztXQUdHO1FBQ0gsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUEwQkQ7Ozs7OztPQU1HO0lBQ0gsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxNQUFZO1FBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNEOzs7Ozs7O09BT0c7SUFDSCxRQUFRLENBQUMsbUJBQXdDLEVBQUUsTUFBVztRQUMxRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSwwQkFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILElBQUksQ0FBQyxPQUFhLEVBQUUsTUFBWTs7UUFDNUIsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDdkM7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDdkM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxNQUFNLEdBQUcsSUFBSSwwQkFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxDQUFjLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxhQUFhLEVBQUcsQ0FBQyxDQUFDO1FBQ2xGLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTyxDQUFDLENBQUM7UUFFeEQsZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsZ0JBQWdCLENBQUMsTUFBVzs7UUFDeEIsNkJBQTZCO1FBQzdCLElBQUksTUFBTSxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBYyxVQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsMENBQUUsYUFBYSxFQUFHLENBQUMsQ0FBQztRQUVsRix5REFBeUQ7UUFDekQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFN0UsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLElBQWE7UUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLDBCQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSCxrQkFBa0I7O1FBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTFDLE9BQU0sS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNkLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsT0FBTyxDQUFDLGNBQWMsR0FBRztvQkFDeEM7Ozt1QkFHRztvQkFDSCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNuQyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsMENBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFO3dCQUN6RixhQUFhLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZDO2lCQUNKO2FBQ0o7WUFDRCxLQUFLLEVBQUUsQ0FBQztTQUNYO0lBQ0wsQ0FBQztDQUNKO0FBbE5ELGdEQWtOQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hSRCxxRUFBcUU7QUFDckUsdUNBQXVDO0FBRXZDOztHQUVHO0FBQ0gsTUFBYSxXQUFXO0lBVXBCOztPQUVHO0lBQ0gsWUFBWSxTQUFlO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRDs7T0FFRztJQUNILFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUM7SUFDekMsQ0FBQztJQUNEOztPQUVHO0lBQ0gsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUNEOztPQUVHO0lBQ0gsU0FBUztRQUNMLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QyxJQUFHLFFBQVEsS0FBSyxTQUFTLEVBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsT0FBTyxDQUFDLEVBQWdCO1FBQ3BCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNwRSxLQUFLLElBQUksRUFBRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxFQUFFLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQzVDLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjt5QkFBTSxJQUFJLEVBQUUsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQUU7d0JBQy9FLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtpQkFDSjthQUNKO2lCQUFNO2dCQUNILE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7YUFBTTtZQUNILElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxFQUFFLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzVDLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUFJLEVBQUUsS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQUU7b0JBQy9FLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0Q7Ozs7Ozs7O09BUUc7SUFDSCxlQUFlLENBQUMsRUFBZ0I7UUFDNUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV4QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxFQUFnQjtRQUNsQixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFeEMsS0FBSyxJQUFJLEVBQUUsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUUsQ0FBQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNILElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBRSxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3RGO1NBQ0o7SUFDTCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxPQUFhLEVBQUUsVUFBbUI7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQW5JRCxrQ0FtSUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNJRCx1R0FBNEI7QUFDNUIsaUhBQStEO0FBQy9ELDJHQUEwRztBQUUxRyxJQUFJLFVBQVUsR0FBRyxJQUFJLDZDQUF1QixFQUFFLENBQUM7QUFDL0MsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZDLFNBQVMsV0FBVztJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFaEMsSUFBSSxZQUFZLEdBQUcsSUFBSSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxZQUFZLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN6QyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDOUUsSUFBSSxVQUFVLEdBQUcsSUFBSSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN2QyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDNUUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWxDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDeEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVuQyxvQkFBb0I7SUFDcEIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFbkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVyQyxJQUFJLGFBQWEsR0FBRyxJQUFJLDhCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsYUFBYSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDMUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQy9FLElBQUksV0FBVyxHQUFHLElBQUksOEJBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN4QyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRW5DLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFckMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDekIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVwQyxvQkFBb0I7SUFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXJDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsUUFBUTtJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFN0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxzQkFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QyxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUN0QyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDOUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxzQkFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNwQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDNUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUUxQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2YsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RCxvQkFBb0I7SUFDcEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxPQUFPO0lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUU1QixJQUFJLFFBQVEsR0FBRyxJQUFJLGdDQUFrQixDQUFTLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekUsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDckMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRixJQUFJLE1BQU0sR0FBRyxJQUFJLGdDQUFrQixDQUFTLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckUsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDbkMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RCxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUMxQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEQsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDekIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJELE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQ3ZCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRCxrQkFBa0I7SUFDbEIsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDekIsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDdkIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUQsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7SUFDMUIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7SUFDeEIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEUsMERBQTBEO0lBQzFELFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRCxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RCxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztJQUM3QixNQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztJQUMzQixRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztJQUM3QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0RSxhQUFhO0lBQ2IsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUN0QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsV0FBVyxFQUFFLENBQUM7QUFDZCxnQkFBZ0IsRUFBRSxDQUFDO0FBQ25CLFFBQVEsRUFBRSxDQUFDO0FBQ1gsT0FBTyxFQUFFLENBQUM7QUFFViw0RkFBNEY7QUFDNUYsU0FBUyxVQUFVLENBQUksR0FBVyxFQUFFLE1BQWM7SUFDOUMsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsT0FBTyxLQUFLO1NBQ2Y7S0FDSjtJQUNELE9BQU8sSUFBSTtBQUNmLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBSSxJQUFZLEVBQUUsSUFBWTtJQUM1QyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUksSUFBWSxFQUFFLElBQVk7SUFDbEQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEI7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxjQUFjO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUNELGdCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pPRCx1R0FBNEI7QUFDNUIsaUhBQStEO0FBQy9ELHNGQUFnRDtBQUdoRCxJQUFJLFVBQVUsR0FBRyxJQUFJLDZDQUF1QixFQUFFLENBQUM7QUFDL0MsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZDLFNBQVMsbUJBQW1CO0lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUV4QyxJQUFJLFNBQVMsR0FBRyxJQUFJLGVBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxlQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTNDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hELGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRELG1CQUFtQjtJQUNuQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGdCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0IsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFvQixDQUFDO0lBQzVELGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFvQixDQUFDO0lBQ3hELGdCQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLGlCQUFpQjtJQUNqQixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLGVBQWU7SUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQztJQUMvQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBRTdDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkUsbUNBQW1DO0lBQ25DLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBb0IsQ0FBQztJQUNoRSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxnQkFBTSxDQUFDLEtBQUssQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQXFCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXpFLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isb0VBQW9FO0lBQ3BFLHFCQUFxQjtJQUNyQiwyREFBMkQ7SUFDM0Qsc0RBQXNEO0lBQ3RELHdDQUF3QztJQUN4QyxzQkFBc0I7SUFDdEIsMkJBQTJCO0lBQzNCLHFFQUFxRTtJQUNyRSxtRUFBbUU7SUFDbkUsc0NBQXNDO0lBQ3RDLDBEQUEwRDtJQUMxRCx3Q0FBd0M7SUFDeEMsRUFBRTtJQUNGLCtCQUErQjtJQUMvQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLDJCQUEyQjtJQUMzQixxRUFBcUU7SUFDckUsbUVBQW1FO0lBQ25FLHNDQUFzQztJQUN0QywwREFBMEQ7SUFDMUQsd0NBQXdDO0lBRXhDLCtDQUErQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLGtCQUFrQjtJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFFeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLElBQUksT0FBTyxHQUFHLElBQUksZUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV6QyxJQUFJLE9BQU8sR0FBRztRQUNWLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFNBQVMsRUFBRTtZQUNQLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDO1lBQ2pDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDO1NBQ2hDO0tBQ0osQ0FBQztJQUNGLElBQUksU0FBUyxHQUFHO1FBQ1osT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLE9BQU87S0FDcEIsQ0FBQztJQUNGLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQzVCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLGdCQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RixnQkFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFdkYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsU0FBaUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQy9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLGdCQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6RixnQkFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGVBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsbUJBQW1CLEVBQUUsQ0FBQztBQUN0QixrQkFBa0IsRUFBRSxDQUFDO0FBRXJCLDRGQUE0RjtBQUM1RixTQUFTLFVBQVUsQ0FBSSxHQUFXLEVBQUUsTUFBYztJQUM5QyxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQixPQUFPLEtBQUs7U0FDZjtLQUNKO0lBQ0QsT0FBTyxJQUFJO0FBQ2YsQ0FBQztBQUNELFNBQVMsU0FBUyxDQUFJLElBQVksRUFBRSxJQUFZO0lBQzVDLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFDRCxTQUFTLGVBQWUsQ0FBSSxJQUFZLEVBQUUsSUFBWTtJQUNsRCxJQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QjtZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLGNBQWM7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNDO0lBQ0QsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckpELHVHQUE0QjtBQUM1QixpSEFBK0Q7QUFDL0Qsa0dBQXlEO0FBRXpELElBQUksVUFBVSxHQUFHLElBQUksNkNBQXVCLEVBQUUsQ0FBQztBQUMvQyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdkMsU0FBUyxxQkFBcUI7SUFDMUIsMERBQTBEO0lBQzFELHlEQUF5RDtJQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFFMUMsSUFBSSxZQUFZLEdBQUcsSUFBSSwwQkFBZSxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLFlBQVksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3pDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM1RSxJQUFJLFVBQVUsR0FBRyxJQUFJLDBCQUFlLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakUsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdkMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzFFLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5DLFlBQVksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFbkMsb0JBQW9CO0lBQ3BCLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRW5DLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsQyx1QkFBdUI7SUFDdkIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWxDLGdDQUFnQztJQUNoQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRW5DLG1CQUFtQjtJQUNuQixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsb0NBQW9DO0lBQ3BDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQixVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsc0JBQXNCO0lBQ3RCLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLGdCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQscUJBQXFCLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckd4Qix1R0FBNEI7QUFDNUIsaUhBQStEO0FBQy9ELGtHQUEwSztBQUcxSyxJQUFJLFVBQVUsR0FBRyxJQUFJLDZDQUF1QixFQUFFLENBQUM7QUFDL0MsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXZDLFNBQVMsVUFBVTtJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUUvQixJQUFJLFNBQVMsR0FBRyxJQUFJLHlCQUFjLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM1RSxJQUFJLE9BQU8sR0FBRyxJQUFJLHlCQUFjLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMxRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFckMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFckMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUUvQixJQUFJLFNBQVMsR0FBRyxJQUFJLDBCQUFlLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3RDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM1RSxJQUFJLE9BQU8sR0FBRyxJQUFJLDBCQUFlLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMxRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFckMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFcEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFckMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxlQUFlO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUVwQyxJQUFJLGdCQUFnQixHQUFHLElBQUksMEJBQWUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkUsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUM3QyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHO1FBQzdDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELElBQUksY0FBYyxHQUFHLElBQUksMEJBQWUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0QsY0FBYyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDM0MsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMzQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV0QyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZDLHFCQUFxQjtJQUNyQixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxhQUFhO0lBQ2xCLCtDQUErQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFbEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLDBCQUFlLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDN0MsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxJQUFJLGNBQWMsR0FBRyxJQUFJLDBCQUFlLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGNBQWMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQzNDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUc7UUFDM0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLGdCQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsMkJBQTJCO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUVwQyxJQUFJLGdCQUFnQixHQUFHLElBQUksc0NBQTJCLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEYsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUM3QyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHO1FBQzdDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELElBQUksY0FBYyxHQUFHLElBQUksc0NBQTJCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDNUUsY0FBYyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDM0MsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMzQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV0QyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZDLHFCQUFxQjtJQUNyQixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXhDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVuQyxJQUFJLGVBQWUsR0FBRyxJQUFJLHlCQUFjLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLGVBQWUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQzVDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLFVBQVU7UUFDcEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEIsSUFBSSxhQUFhLEdBQUcsSUFBSSx5QkFBYyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM1RCxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUMxQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxVQUFVO1FBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxRCxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFeEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFELGdCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUV4RCxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLGdCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUV4QixhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUN0QyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLGdCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVuRSxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXpELGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1RCxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFMUQscUJBQXFCO0lBQ3JCLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFELGdCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUV4RCxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXhELGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ3RDLGdCQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLGdCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV2RCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGdCQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxNQUFNLFNBQVUsU0FBUSxxQkFBbUM7SUFHdkQsWUFBWSxNQUFXLEVBQUUsT0FBb0I7UUFDekMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksMEJBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSwwQkFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNKO0FBRUQsU0FBUyxjQUFjO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXZDLHFDQUFxQztJQUNyQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDcEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDdEMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDcEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRztRQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLGdCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLGdCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRS9CLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixnQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFOUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxxQkFBVSxDQUFTLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RCxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNyQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxPQUFPO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLHFCQUFVLENBQVMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ25DLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLE9BQU87UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkQsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVyRCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckUsb0JBQW9CO0lBQ3BCLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVyRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9FLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhGLHdEQUF3RDtJQUN4RCxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RSxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdGLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRiwwQkFBMEI7SUFFMUIsc0JBQXNCO0lBQ3RCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxFQUFFO0lBQ0YscUJBQXFCO0lBQ3JCLDBCQUEwQjtJQUMxQiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLHVCQUF1QjtJQUN2QixxRUFBcUU7SUFDckUsaUVBQWlFO0lBQ2pFLDJCQUEyQjtJQUMzQixxRUFBcUU7SUFDckUsbUVBQW1FO0lBRW5FLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsT0FBTztJQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFNUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxrQkFBTyxDQUEwQixLQUFLLEVBQUUsS0FBSyxFQUN4RCxDQUFDLEdBQVcsRUFBRSxlQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLDBCQUFlLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDbEcsSUFBSSxNQUFNLEdBQUcsSUFBSSxrQkFBTyxDQUEwQixLQUFLLEVBQUUsR0FBRyxFQUNwRCxDQUFDLEdBQVcsRUFBRSxlQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLDBCQUFlLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFFbEcsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckQsbUJBQW1CO0lBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0IsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFM0IsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQW9CLENBQUM7SUFDeEQsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBb0IsQ0FBQztJQUNwRCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixpQkFBaUI7SUFDakIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2YsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGdCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUvQixlQUFlO0lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckQsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLGdCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQztJQUV6QyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9ELG1DQUFtQztJQUNuQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBb0IsQ0FBQztJQUM1RCxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxnQkFBTSxDQUFDLEtBQUssQ0FBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckUsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBb0IsQ0FBQztJQUNoRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3RELGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckMsNEJBQTRCO0lBQzVCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLGVBQWUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3RELGdCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckMsK0NBQStDO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELFVBQVUsRUFBRSxDQUFDO0FBQ2IsVUFBVSxFQUFFLENBQUM7QUFDYixlQUFlLEVBQUUsQ0FBQztBQUNsQixhQUFhLEVBQUUsQ0FBQztBQUNoQiwyQkFBMkIsRUFBRSxDQUFDO0FBQzlCLGNBQWMsRUFBRSxDQUFDO0FBQ2pCLGNBQWMsRUFBRSxDQUFDO0FBQ2pCLFNBQVMsRUFBRSxDQUFDO0FBQ1osT0FBTyxFQUFFLENBQUM7QUFHViw0RkFBNEY7QUFDNUYsU0FBUyxVQUFVLENBQUksR0FBVyxFQUFFLE1BQWM7SUFDOUMsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsT0FBTyxLQUFLO1NBQ2Y7S0FDSjtJQUNELE9BQU8sSUFBSTtBQUNmLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBSSxJQUFZLEVBQUUsSUFBWTtJQUM1QyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUksSUFBWSxFQUFFLElBQVk7SUFDbEQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEI7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxjQUFjO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUNELGdCQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoZ0JELE1BQU0sY0FBYztJQUdoQixZQUFvQixTQUFtQyxFQUN2QyxTQUFlO1FBRFgsY0FBUyxHQUFULFNBQVMsQ0FBMEI7UUFDdkMsY0FBUyxHQUFULFNBQVMsQ0FBTTtRQUgvQixrQkFBYSxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBQ3BELGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQWUsQ0FBQztRQUdqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELElBQUksQ0FBQyxPQUFZLEVBQUUsTUFBVztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFXLEdBQUcsQ0FBQyxDQUNoQyxDQUFDO1FBQ0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsSUFBSSxTQUFTLEdBQUc7WUFDWixTQUFTLEtBQUssT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25DLGdCQUFnQixLQUFLLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQVcsQ0FBQyxFQUFDO1lBQ3BFLGFBQWEsS0FBSyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUNPLENBQUM7UUFDNUQsS0FBSyxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakMsbURBQW1EO1lBQ25ELHFDQUFxQztZQUNyQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDeEU7SUFDTCxDQUFDO0lBQ0QsUUFBUSxDQUFDLG1CQUF3QyxFQUFFLE1BQVc7UUFDMUQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELGdCQUFnQjtRQUNaLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQzNDLElBQUksQ0FBQyxTQUFTLENBQVcsR0FBRyxDQUFDLENBQ2hDLENBQUM7UUFDRixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksU0FBUyxHQUFHO1lBQ1osU0FBUyxLQUFLLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQyxnQkFBZ0IsS0FBSyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFXLENBQUMsRUFBQztZQUNwRSxhQUFhLEtBQUssT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBRUQ7Ozs7R0FJRztBQUNILE1BQWEsdUJBQXVCO0lBQXBDO1FBWUksNERBQTREO1FBQzVELDZCQUE2QjtRQUM3QixrQkFBYSxHQUFHLElBQUksR0FBRyxFQUN1QyxDQUFDO0lBNkJuRSxDQUFDO0lBM0NHLFVBQVUsQ0FBQyxTQUFlO1FBQ3RCLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDakUsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBQ3JELEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMvQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBS0Q7Ozs7O09BS0c7SUFDSCxPQUFPLENBQUMsTUFBc0IsRUFBRSxHQUFHLFVBQTRCO1FBQzNELElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUNWLENBQUM7UUFDcEMsS0FBSyxJQUFJLFNBQVMsSUFBSSxVQUFVLEVBQUU7WUFDOUIsSUFBSSxTQUFTLEtBQUssTUFBTTtnQkFBRSxTQUFTO1lBQ25DLEtBQUssSUFBSSxXQUFXLElBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQXdDLEVBQUU7Z0JBQ3RGLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUN0QyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztpQkFDbEQ7Z0JBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZGO1lBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBQ0QsVUFBVTtRQUNOLEtBQUssSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDSjtBQTVDRCwwREE0Q0M7Ozs7Ozs7Ozs7Ozs7O0FDckdELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDN0IsbUJBQU8sQ0FBQyxvRUFBMkIsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFPLENBQUMsa0VBQTBCLENBQUMsQ0FBQztBQUNwQyxtQkFBTyxDQUFDLDhEQUF3QixDQUFDLENBQUM7QUFDbEMsbUJBQU8sQ0FBQyxzREFBb0IsQ0FBQyxDQUFDO0FBRzlCLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0YsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsd0JBQXdCO0FBQ3hCLHdCQUF3QjtBQUN4Qiw2QkFBNkI7QUFDN0IsRUFBRTtBQUNGLDRDQUE0QztBQUM1QyxzREFBc0Q7QUFDdEQsNENBQTRDO0FBQzVDLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFDdEQsa0VBQWtFO0FBQ2xFLGlEQUFpRDtBQUNqRCx3QkFBd0I7QUFDeEIsYUFBYTtBQUNiLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsT0FBTztBQUNQLEtBQUs7QUFDTCxFQUFFO0FBQ0YsMkNBQTJDO0FBQzNDLElBQUk7QUFDSixFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLEVBQUU7QUFDRixnREFBZ0Q7QUFDaEQsRUFBRTtBQUNGLDJGQUEyRjtBQUMzRix3QkFBd0I7QUFDeEIsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QixFQUFFO0FBQ0YsMkRBQTJEO0FBQzNELHFEQUFxRDtBQUNyRCxJQUFJO0FBQ0osRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLEVBQUU7QUFDRixvQ0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLGlDQUFpQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuLy8gY29tcGFyZSBhbmQgaXNCdWZmZXIgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9ibG9iLzY4MGU5ZTVlNDg4ZjIyYWFjMjc1OTlhNTdkYzg0NGE2MzE1OTI4ZGQvaW5kZXguanNcbi8vIG9yaWdpbmFsIG5vdGljZTpcblxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgeCA9IGEubGVuZ3RoO1xuICB2YXIgeSA9IGIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldO1xuICAgICAgeSA9IGJbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgaWYgKHkgPCB4KSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5mdW5jdGlvbiBpc0J1ZmZlcihiKSB7XG4gIGlmIChnbG9iYWwuQnVmZmVyICYmIHR5cGVvZiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIoYik7XG4gIH1cbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcik7XG59XG5cbi8vIGJhc2VkIG9uIG5vZGUgYXNzZXJ0LCBvcmlnaW5hbCBub3RpY2U6XG4vLyBOQjogVGhlIFVSTCB0byB0aGUgQ29tbW9uSlMgc3BlYyBpcyBrZXB0IGp1c3QgZm9yIHRyYWRpdGlvbi5cbi8vICAgICBub2RlLWFzc2VydCBoYXMgZXZvbHZlZCBhIGxvdCBzaW5jZSB0aGVuLCBib3RoIGluIEFQSSBhbmQgYmVoYXZpb3IuXG5cbi8vIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1VuaXRfVGVzdGluZy8xLjBcbi8vXG4vLyBUSElTIElTIE5PVCBURVNURUQgTk9SIExJS0VMWSBUTyBXT1JLIE9VVFNJREUgVjghXG4vL1xuLy8gT3JpZ2luYWxseSBmcm9tIG5hcndoYWwuanMgKGh0dHA6Ly9uYXJ3aGFsanMub3JnKVxuLy8gQ29weXJpZ2h0IChjKSAyMDA5IFRob21hcyBSb2JpbnNvbiA8Mjgwbm9ydGguY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICdTb2Z0d2FyZScpLCB0b1xuLy8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbi8vIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuLy8gc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgZnVuY3Rpb25zSGF2ZU5hbWVzID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZvbygpIHt9Lm5hbWUgPT09ICdmb28nO1xufSgpKTtcbmZ1bmN0aW9uIHBUb1N0cmluZyAob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbn1cbmZ1bmN0aW9uIGlzVmlldyhhcnJidWYpIHtcbiAgaWYgKGlzQnVmZmVyKGFycmJ1ZikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBnbG9iYWwuQXJyYXlCdWZmZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KGFycmJ1Zik7XG4gIH1cbiAgaWYgKCFhcnJidWYpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGFycmJ1ZiBpbnN0YW5jZW9mIERhdGFWaWV3KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGFycmJ1Zi5idWZmZXIgJiYgYXJyYnVmLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLy8gMS4gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xuXG4vLyAyLiBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBhc3NlcnQuXG4vLyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHsgbWVzc2FnZTogbWVzc2FnZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQgfSlcblxudmFyIHJlZ2V4ID0gL1xccypmdW5jdGlvblxccysoW15cXChcXHNdKilcXHMqLztcbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvZnVuY3Rpb24ucHJvdG90eXBlLm5hbWUvYmxvYi9hZGVlZWVjOGJmY2M2MDY4YjE4N2Q3ZDlmYjNkNWJiMWQzYTMwODk5L2ltcGxlbWVudGF0aW9uLmpzXG5mdW5jdGlvbiBnZXROYW1lKGZ1bmMpIHtcbiAgaWYgKCF1dGlsLmlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGZ1bmN0aW9uc0hhdmVOYW1lcykge1xuICAgIHJldHVybiBmdW5jLm5hbWU7XG4gIH1cbiAgdmFyIHN0ciA9IGZ1bmMudG9TdHJpbmcoKTtcbiAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKHJlZ2V4KTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdO1xufVxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICB0aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICB0aGlzLmFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsO1xuICB0aGlzLmV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3I7XG4gIGlmIChvcHRpb25zLm1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZ2V0TWVzc2FnZSh0aGlzKTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG4gIHZhciBzdGFja1N0YXJ0RnVuY3Rpb24gPSBvcHRpb25zLnN0YWNrU3RhcnRGdW5jdGlvbiB8fCBmYWlsO1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzdGFja1N0YXJ0RnVuY3Rpb24pO1xuICB9IGVsc2Uge1xuICAgIC8vIG5vbiB2OCBicm93c2VycyBzbyB3ZSBjYW4gaGF2ZSBhIHN0YWNrdHJhY2VcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgaWYgKGVyci5zdGFjaykge1xuICAgICAgdmFyIG91dCA9IGVyci5zdGFjaztcblxuICAgICAgLy8gdHJ5IHRvIHN0cmlwIHVzZWxlc3MgZnJhbWVzXG4gICAgICB2YXIgZm5fbmFtZSA9IGdldE5hbWUoc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgICAgIHZhciBpZHggPSBvdXQuaW5kZXhPZignXFxuJyArIGZuX25hbWUpO1xuICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgIC8vIG9uY2Ugd2UgaGF2ZSBsb2NhdGVkIHRoZSBmdW5jdGlvbiBmcmFtZVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGJlZm9yZSBpdCAoYW5kIGl0cyBsaW5lKVxuICAgICAgICB2YXIgbmV4dF9saW5lID0gb3V0LmluZGV4T2YoJ1xcbicsIGlkeCArIDEpO1xuICAgICAgICBvdXQgPSBvdXQuc3Vic3RyaW5nKG5leHRfbGluZSArIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWNrID0gb3V0O1xuICAgIH1cbiAgfVxufTtcblxuLy8gYXNzZXJ0LkFzc2VydGlvbkVycm9yIGluc3RhbmNlb2YgRXJyb3JcbnV0aWwuaW5oZXJpdHMoYXNzZXJ0LkFzc2VydGlvbkVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHMsIG4pIHtcbiAgaWYgKHR5cGVvZiBzID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBzLmxlbmd0aCA8IG4gPyBzIDogcy5zbGljZSgwLCBuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcztcbiAgfVxufVxuZnVuY3Rpb24gaW5zcGVjdChzb21ldGhpbmcpIHtcbiAgaWYgKGZ1bmN0aW9uc0hhdmVOYW1lcyB8fCAhdXRpbC5pc0Z1bmN0aW9uKHNvbWV0aGluZykpIHtcbiAgICByZXR1cm4gdXRpbC5pbnNwZWN0KHNvbWV0aGluZyk7XG4gIH1cbiAgdmFyIHJhd25hbWUgPSBnZXROYW1lKHNvbWV0aGluZyk7XG4gIHZhciBuYW1lID0gcmF3bmFtZSA/ICc6ICcgKyByYXduYW1lIDogJyc7XG4gIHJldHVybiAnW0Z1bmN0aW9uJyArICBuYW1lICsgJ10nO1xufVxuZnVuY3Rpb24gZ2V0TWVzc2FnZShzZWxmKSB7XG4gIHJldHVybiB0cnVuY2F0ZShpbnNwZWN0KHNlbGYuYWN0dWFsKSwgMTI4KSArICcgJyArXG4gICAgICAgICBzZWxmLm9wZXJhdG9yICsgJyAnICtcbiAgICAgICAgIHRydW5jYXRlKGluc3BlY3Qoc2VsZi5leHBlY3RlZCksIDEyOCk7XG59XG5cbi8vIEF0IHByZXNlbnQgb25seSB0aGUgdGhyZWUga2V5cyBtZW50aW9uZWQgYWJvdmUgYXJlIHVzZWQgYW5kXG4vLyB1bmRlcnN0b29kIGJ5IHRoZSBzcGVjLiBJbXBsZW1lbnRhdGlvbnMgb3Igc3ViIG1vZHVsZXMgY2FuIHBhc3Ncbi8vIG90aGVyIGtleXMgdG8gdGhlIEFzc2VydGlvbkVycm9yJ3MgY29uc3RydWN0b3IgLSB0aGV5IHdpbGwgYmVcbi8vIGlnbm9yZWQuXG5cbi8vIDMuIEFsbCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBtdXN0IHRocm93IGFuIEFzc2VydGlvbkVycm9yXG4vLyB3aGVuIGEgY29ycmVzcG9uZGluZyBjb25kaXRpb24gaXMgbm90IG1ldCwgd2l0aCBhIG1lc3NhZ2UgdGhhdFxuLy8gbWF5IGJlIHVuZGVmaW5lZCBpZiBub3QgcHJvdmlkZWQuICBBbGwgYXNzZXJ0aW9uIG1ldGhvZHMgcHJvdmlkZVxuLy8gYm90aCB0aGUgYWN0dWFsIGFuZCBleHBlY3RlZCB2YWx1ZXMgdG8gdGhlIGFzc2VydGlvbiBlcnJvciBmb3Jcbi8vIGRpc3BsYXkgcHVycG9zZXMuXG5cbmZ1bmN0aW9uIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IsIHN0YWNrU3RhcnRGdW5jdGlvbikge1xuICB0aHJvdyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHtcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgIGFjdHVhbDogYWN0dWFsLFxuICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICBvcGVyYXRvcjogb3BlcmF0b3IsXG4gICAgc3RhY2tTdGFydEZ1bmN0aW9uOiBzdGFja1N0YXJ0RnVuY3Rpb25cbiAgfSk7XG59XG5cbi8vIEVYVEVOU0lPTiEgYWxsb3dzIGZvciB3ZWxsIGJlaGF2ZWQgZXJyb3JzIGRlZmluZWQgZWxzZXdoZXJlLlxuYXNzZXJ0LmZhaWwgPSBmYWlsO1xuXG4vLyA0LiBQdXJlIGFzc2VydGlvbiB0ZXN0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdHJ1dGh5LCBhcyBkZXRlcm1pbmVkXG4vLyBieSAhIWd1YXJkLlxuLy8gYXNzZXJ0Lm9rKGd1YXJkLCBtZXNzYWdlX29wdCk7XG4vLyBUaGlzIHN0YXRlbWVudCBpcyBlcXVpdmFsZW50IHRvIGFzc2VydC5lcXVhbCh0cnVlLCAhIWd1YXJkLFxuLy8gbWVzc2FnZV9vcHQpOy4gVG8gdGVzdCBzdHJpY3RseSBmb3IgdGhlIHZhbHVlIHRydWUsIHVzZVxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKHRydWUsIGd1YXJkLCBtZXNzYWdlX29wdCk7LlxuXG5mdW5jdGlvbiBvayh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAoIXZhbHVlKSBmYWlsKHZhbHVlLCB0cnVlLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQub2spO1xufVxuYXNzZXJ0Lm9rID0gb2s7XG5cbi8vIDUuIFRoZSBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc2hhbGxvdywgY29lcmNpdmUgZXF1YWxpdHkgd2l0aFxuLy8gPT0uXG4vLyBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuZXF1YWwgPSBmdW5jdGlvbiBlcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09JywgYXNzZXJ0LmVxdWFsKTtcbn07XG5cbi8vIDYuIFRoZSBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciB3aGV0aGVyIHR3byBvYmplY3RzIGFyZSBub3QgZXF1YWxcbi8vIHdpdGggIT0gYXNzZXJ0Lm5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gbm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT0nLCBhc3NlcnQubm90RXF1YWwpO1xuICB9XG59O1xuXG4vLyA3LiBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cbi8vIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuZGVlcEVxdWFsID0gZnVuY3Rpb24gZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKCFfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIGZhbHNlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBFcXVhbCcsIGFzc2VydC5kZWVwRXF1YWwpO1xuICB9XG59O1xuXG5hc3NlcnQuZGVlcFN0cmljdEVxdWFsID0gZnVuY3Rpb24gZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKCFfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHRydWUpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcFN0cmljdEVxdWFsJywgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgc3RyaWN0LCBtZW1vcykge1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0J1ZmZlcihhY3R1YWwpICYmIGlzQnVmZmVyKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBjb21wYXJlKGFjdHVhbCwgZXhwZWN0ZWQpID09PSAwO1xuXG4gIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgRGF0ZSBvYmplY3QgdGhhdCByZWZlcnMgdG8gdGhlIHNhbWUgdGltZS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzRGF0ZShhY3R1YWwpICYmIHV0aWwuaXNEYXRlKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgUmVnRXhwIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNvdXJjZSBhbmRcbiAgLy8gcHJvcGVydGllcyAoYGdsb2JhbGAsIGBtdWx0aWxpbmVgLCBgbGFzdEluZGV4YCwgYGlnbm9yZUNhc2VgKS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzUmVnRXhwKGFjdHVhbCkgJiYgdXRpbC5pc1JlZ0V4cChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLnNvdXJjZSA9PT0gZXhwZWN0ZWQuc291cmNlICYmXG4gICAgICAgICAgIGFjdHVhbC5nbG9iYWwgPT09IGV4cGVjdGVkLmdsb2JhbCAmJlxuICAgICAgICAgICBhY3R1YWwubXVsdGlsaW5lID09PSBleHBlY3RlZC5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgYWN0dWFsLmxhc3RJbmRleCA9PT0gZXhwZWN0ZWQubGFzdEluZGV4ICYmXG4gICAgICAgICAgIGFjdHVhbC5pZ25vcmVDYXNlID09PSBleHBlY3RlZC5pZ25vcmVDYXNlO1xuXG4gIC8vIDcuNC4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICgoYWN0dWFsID09PSBudWxsIHx8IHR5cGVvZiBhY3R1YWwgIT09ICdvYmplY3QnKSAmJlxuICAgICAgICAgICAgIChleHBlY3RlZCA9PT0gbnVsbCB8fCB0eXBlb2YgZXhwZWN0ZWQgIT09ICdvYmplY3QnKSkge1xuICAgIHJldHVybiBzdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIElmIGJvdGggdmFsdWVzIGFyZSBpbnN0YW5jZXMgb2YgdHlwZWQgYXJyYXlzLCB3cmFwIHRoZWlyIHVuZGVybHlpbmdcbiAgLy8gQXJyYXlCdWZmZXJzIGluIGEgQnVmZmVyIGVhY2ggdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAgLy8gVGhpcyBvcHRpbWl6YXRpb24gcmVxdWlyZXMgdGhlIGFycmF5cyB0byBoYXZlIHRoZSBzYW1lIHR5cGUgYXMgY2hlY2tlZCBieVxuICAvLyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nIChha2EgcFRvU3RyaW5nKS4gTmV2ZXIgcGVyZm9ybSBiaW5hcnlcbiAgLy8gY29tcGFyaXNvbnMgZm9yIEZsb2F0KkFycmF5cywgdGhvdWdoLCBzaW5jZSBlLmcuICswID09PSAtMCBidXQgdGhlaXJcbiAgLy8gYml0IHBhdHRlcm5zIGFyZSBub3QgaWRlbnRpY2FsLlxuICB9IGVsc2UgaWYgKGlzVmlldyhhY3R1YWwpICYmIGlzVmlldyhleHBlY3RlZCkgJiZcbiAgICAgICAgICAgICBwVG9TdHJpbmcoYWN0dWFsKSA9PT0gcFRvU3RyaW5nKGV4cGVjdGVkKSAmJlxuICAgICAgICAgICAgICEoYWN0dWFsIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5IHx8XG4gICAgICAgICAgICAgICBhY3R1YWwgaW5zdGFuY2VvZiBGbG9hdDY0QXJyYXkpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUobmV3IFVpbnQ4QXJyYXkoYWN0dWFsLmJ1ZmZlciksXG4gICAgICAgICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZXhwZWN0ZWQuYnVmZmVyKSkgPT09IDA7XG5cbiAgLy8gNy41IEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIGlmIChpc0J1ZmZlcihhY3R1YWwpICE9PSBpc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgbWVtb3MgPSBtZW1vcyB8fCB7YWN0dWFsOiBbXSwgZXhwZWN0ZWQ6IFtdfTtcblxuICAgIHZhciBhY3R1YWxJbmRleCA9IG1lbW9zLmFjdHVhbC5pbmRleE9mKGFjdHVhbCk7XG4gICAgaWYgKGFjdHVhbEluZGV4ICE9PSAtMSkge1xuICAgICAgaWYgKGFjdHVhbEluZGV4ID09PSBtZW1vcy5leHBlY3RlZC5pbmRleE9mKGV4cGVjdGVkKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vcy5hY3R1YWwucHVzaChhY3R1YWwpO1xuICAgIG1lbW9zLmV4cGVjdGVkLnB1c2goZXhwZWN0ZWQpO1xuXG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIHN0cmljdCwgbWVtb3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIHN0cmljdCwgYWN0dWFsVmlzaXRlZE9iamVjdHMpIHtcbiAgaWYgKGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkIHx8IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gaWYgb25lIGlzIGEgcHJpbWl0aXZlLCB0aGUgb3RoZXIgbXVzdCBiZSBzYW1lXG4gIGlmICh1dGlsLmlzUHJpbWl0aXZlKGEpIHx8IHV0aWwuaXNQcmltaXRpdmUoYikpXG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIGlmIChzdHJpY3QgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGEpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB2YXIgYUlzQXJncyA9IGlzQXJndW1lbnRzKGEpO1xuICB2YXIgYklzQXJncyA9IGlzQXJndW1lbnRzKGIpO1xuICBpZiAoKGFJc0FyZ3MgJiYgIWJJc0FyZ3MpIHx8ICghYUlzQXJncyAmJiBiSXNBcmdzKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmIChhSXNBcmdzKSB7XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gX2RlZXBFcXVhbChhLCBiLCBzdHJpY3QpO1xuICB9XG4gIHZhciBrYSA9IG9iamVjdEtleXMoYSk7XG4gIHZhciBrYiA9IG9iamVjdEtleXMoYik7XG4gIHZhciBrZXksIGk7XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT09IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9PSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghX2RlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgc3RyaWN0LCBhY3R1YWxWaXNpdGVkT2JqZWN0cykpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIDguIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuLy8gYXNzZXJ0Lm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiBub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBmYWxzZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwRXF1YWwnLCBhc3NlcnQubm90RGVlcEVxdWFsKTtcbiAgfVxufTtcblxuYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbCA9IG5vdERlZXBTdHJpY3RFcXVhbDtcbmZ1bmN0aW9uIG5vdERlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHRydWUpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcFN0cmljdEVxdWFsJywgbm90RGVlcFN0cmljdEVxdWFsKTtcbiAgfVxufVxuXG5cbi8vIDkuIFRoZSBzdHJpY3QgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHN0cmljdCBlcXVhbGl0eSwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT09JywgYXNzZXJ0LnN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gMTAuIFRoZSBzdHJpY3Qgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igc3RyaWN0IGluZXF1YWxpdHksIGFzXG4vLyBkZXRlcm1pbmVkIGJ5ICE9PS4gIGFzc2VydC5ub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPT0nLCBhc3NlcnQubm90U3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXhwZWN0ZWQpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBJZ25vcmUuICBUaGUgaW5zdGFuY2VvZiBjaGVjayBkb2Vzbid0IHdvcmsgZm9yIGFycm93IGZ1bmN0aW9ucy5cbiAgfVxuXG4gIGlmIChFcnJvci5pc1Byb3RvdHlwZU9mKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBfdHJ5QmxvY2soYmxvY2spIHtcbiAgdmFyIGVycm9yO1xuICB0cnkge1xuICAgIGJsb2NrKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlcnJvciA9IGU7XG4gIH1cbiAgcmV0dXJuIGVycm9yO1xufVxuXG5mdW5jdGlvbiBfdGhyb3dzKHNob3VsZFRocm93LCBibG9jaywgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGFjdHVhbDtcblxuICBpZiAodHlwZW9mIGJsb2NrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJibG9ja1wiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBleHBlY3RlZCA9PT0gJ3N0cmluZycpIHtcbiAgICBtZXNzYWdlID0gZXhwZWN0ZWQ7XG4gICAgZXhwZWN0ZWQgPSBudWxsO1xuICB9XG5cbiAgYWN0dWFsID0gX3RyeUJsb2NrKGJsb2NrKTtcblxuICBtZXNzYWdlID0gKGV4cGVjdGVkICYmIGV4cGVjdGVkLm5hbWUgPyAnICgnICsgZXhwZWN0ZWQubmFtZSArICcpLicgOiAnLicpICtcbiAgICAgICAgICAgIChtZXNzYWdlID8gJyAnICsgbWVzc2FnZSA6ICcuJyk7XG5cbiAgaWYgKHNob3VsZFRocm93ICYmICFhY3R1YWwpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdNaXNzaW5nIGV4cGVjdGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIHZhciB1c2VyUHJvdmlkZWRNZXNzYWdlID0gdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnO1xuICB2YXIgaXNVbndhbnRlZEV4Y2VwdGlvbiA9ICFzaG91bGRUaHJvdyAmJiB1dGlsLmlzRXJyb3IoYWN0dWFsKTtcbiAgdmFyIGlzVW5leHBlY3RlZEV4Y2VwdGlvbiA9ICFzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgIWV4cGVjdGVkO1xuXG4gIGlmICgoaXNVbndhbnRlZEV4Y2VwdGlvbiAmJlxuICAgICAgdXNlclByb3ZpZGVkTWVzc2FnZSAmJlxuICAgICAgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8XG4gICAgICBpc1VuZXhwZWN0ZWRFeGNlcHRpb24pIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdHb3QgdW53YW50ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiZcbiAgICAgICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHwgKCFzaG91bGRUaHJvdyAmJiBhY3R1YWwpKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbi8vIDExLiBFeHBlY3RlZCB0byB0aHJvdyBhbiBlcnJvcjpcbi8vIGFzc2VydC50aHJvd3MoYmxvY2ssIEVycm9yX29wdCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3ModHJ1ZSwgYmxvY2ssIGVycm9yLCBtZXNzYWdlKTtcbn07XG5cbi8vIEVYVEVOU0lPTiEgVGhpcyBpcyBhbm5veWluZyB0byB3cml0ZSBvdXRzaWRlIHRoaXMgbW9kdWxlLlxuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzKGZhbHNlLCBibG9jaywgZXJyb3IsIG1lc3NhZ2UpO1xufTtcblxuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbihlcnIpIHsgaWYgKGVycikgdGhyb3cgZXJyOyB9O1xuXG4vLyBFeHBvc2UgYSBzdHJpY3Qgb25seSB2YXJpYW50IG9mIGFzc2VydFxuZnVuY3Rpb24gc3RyaWN0KHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIGZhaWwodmFsdWUsIHRydWUsIG1lc3NhZ2UsICc9PScsIHN0cmljdCk7XG59XG5hc3NlcnQuc3RyaWN0ID0gb2JqZWN0QXNzaWduKHN0cmljdCwgYXNzZXJ0LCB7XG4gIGVxdWFsOiBhc3NlcnQuc3RyaWN0RXF1YWwsXG4gIGRlZXBFcXVhbDogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCxcbiAgbm90RXF1YWw6IGFzc2VydC5ub3RTdHJpY3RFcXVhbCxcbiAgbm90RGVlcEVxdWFsOiBhc3NlcnQubm90RGVlcFN0cmljdEVxdWFsXG59KTtcbmFzc2VydC5zdHJpY3Quc3RyaWN0ID0gYXNzZXJ0LnN0cmljdDtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHx8XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgZGVzY3JpcHRvcnNba2V5c1tpXV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfTtcblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG52YXIga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ3V0aWwucHJvbWlzaWZ5LmN1c3RvbScpIDogdW5kZWZpbmVkO1xuXG5leHBvcnRzLnByb21pc2lmeSA9IGZ1bmN0aW9uIHByb21pc2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCAmJiBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdKSB7XG4gICAgdmFyIGZuID0gb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJ1dGlsLnByb21pc2lmeS5jdXN0b21cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgdmFyIHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgcHJvbWlzZVJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGZuLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgZm4sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbClcbiAgKTtcbn1cblxuZXhwb3J0cy5wcm9taXNpZnkuY3VzdG9tID0ga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5T25SZWplY3RlZChyZWFzb24sIGNiKSB7XG4gIC8vIGAhcmVhc29uYCBndWFyZCBpbnNwaXJlZCBieSBibHVlYmlyZCAoUmVmOiBodHRwczovL2dvby5nbC90NUlTNk0pLlxuICAvLyBCZWNhdXNlIGBudWxsYCBpcyBhIHNwZWNpYWwgZXJyb3IgdmFsdWUgaW4gY2FsbGJhY2tzIHdoaWNoIG1lYW5zIFwibm8gZXJyb3JcbiAgLy8gb2NjdXJyZWRcIiwgd2UgZXJyb3Itd3JhcCBzbyB0aGUgY2FsbGJhY2sgY29uc3VtZXIgY2FuIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAgLy8gXCJ0aGUgcHJvbWlzZSByZWplY3RlZCB3aXRoIG51bGxcIiBvciBcInRoZSBwcm9taXNlIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZFwiLlxuICBpZiAoIXJlYXNvbikge1xuICAgIHZhciBuZXdSZWFzb24gPSBuZXcgRXJyb3IoJ1Byb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBmYWxzeSB2YWx1ZScpO1xuICAgIG5ld1JlYXNvbi5yZWFzb24gPSByZWFzb247XG4gICAgcmVhc29uID0gbmV3UmVhc29uO1xuICB9XG4gIHJldHVybiBjYihyZWFzb24pO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIC8vIFdlIERPIE5PVCByZXR1cm4gdGhlIHByb21pc2UgYXMgaXQgZ2l2ZXMgdGhlIHVzZXIgYSBmYWxzZSBzZW5zZSB0aGF0XG4gIC8vIHRoZSBwcm9taXNlIGlzIGFjdHVhbGx5IHNvbWVob3cgcmVsYXRlZCB0byB0aGUgY2FsbGJhY2sncyBleGVjdXRpb25cbiAgLy8gYW5kIHRoYXQgdGhlIGNhbGxiYWNrIHRocm93aW5nIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlLlxuICBmdW5jdGlvbiBjYWxsYmFja2lmaWVkKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIHZhciBtYXliZUNiID0gYXJncy5wb3AoKTtcbiAgICBpZiAodHlwZW9mIG1heWJlQ2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsYXN0IGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbWF5YmVDYi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgLy8gSW4gdHJ1ZSBub2RlIHN0eWxlIHdlIHByb2Nlc3MgdGhlIGNhbGxiYWNrIG9uIGBuZXh0VGlja2Agd2l0aCBhbGwgdGhlXG4gICAgLy8gaW1wbGljYXRpb25zIChzdGFjaywgYHVuY2F1Z2h0RXhjZXB0aW9uYCwgYGFzeW5jX2hvb2tzYClcbiAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmV0KSB7IHByb2Nlc3MubmV4dFRpY2soY2IsIG51bGwsIHJldCkgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlaikgeyBwcm9jZXNzLm5leHRUaWNrKGNhbGxiYWNraWZ5T25SZWplY3RlZCwgcmVqLCBjYikgfSk7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2FsbGJhY2tpZmllZCwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9yaWdpbmFsKSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNhbGxiYWNraWZpZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3JpZ2luYWwpKTtcbiAgcmV0dXJuIGNhbGxiYWNraWZpZWQ7XG59XG5leHBvcnRzLmNhbGxiYWNraWZ5ID0gY2FsbGJhY2tpZnk7XG4iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IHtDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHtDcmR0SW50ZXJuYWwsIENyZHR9IGZyb20gXCIuL2NyZHRfY29yZVwiO1xuXG4vKipcbiAqIE9wZXJhdGlvbnMsIG1lc3NhZ2VzLCBhbmQgZGVzY3JpcHRpb25zIGFyZSBhbGwganVzdCB0aGVcbiAqIG51bWJlciB0byBhZGQvYWRkZWQuXG4gKiBUT0RPOiBvcHRpbWl6ZSBhd2F5IDAgYWRkcz9cbiAqL1xuZXhwb3J0IGNsYXNzIENvdW50ZXJJbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxudW1iZXI+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlIHJldHVybiAwO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogbnVtYmVyLCBfc3RhdGU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKyBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IENvdW50ZXJJbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIGNvdW50ZXIgQ1JEVC5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIG51bWJlciB0aGF0IHdhcyBhZGRlZC5cbiAqXG4gKiBXYXJuaW5nOiBhZGRpdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmV4cG9ydCBjbGFzcyBDb3VudGVyQ3JkdCBleHRlbmRzIENyZHQ8bnVtYmVyPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKGlkLCBDb3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG4pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IGFkZC4gIEFzIGEgY29uc2VxdWVuY2UsXG4gICAgICogY291bnRlci52YWx1ZSArPSBuIGFuZCBjb3VudGVyLnZhbHVlIC09IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBhZGRpdGlvbnMpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlIC0gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIE9wZXJhdGlvbnMsIG1lc3NhZ2VzLCBhbmQgZGVzY3JpcHRpb25zIGFyZSBhbGwganVzdCB0aGVcbiAqIG51bWJlciB0byBtdWx0aXBseS9tdWx0aXBsaWVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAxIG11bHRzP1xuICovXG5leHBvcnQgY2xhc3MgTXVsdFJlZ2lzdGVySW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZSByZXR1cm4gMTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogbnVtYmVyLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICByZXR1cm4gW3N0YXRlICogbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIEEgc2ltcGxlIG51bWVyaWNhbCByZWdpc3RlciBDUkRUIHdpdGggbXVsdGlwbGljYXRpb24gb3BlcmF0aW9ucy5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIG51bWJlciB0aGF0IHdhcyBtdWx0aXBsaWVkLlxuICpcbiAqIFdhcm5pbmc6IG11bHRpcGxpY2F0aW9uIGlzIG5vdCBhY3R1YWxseSBjb21tdXRhdGl2ZSBpZiB0aGVyZSBpcyBhblxuICogb3ZlcmZsb3cgb3IgaWYgeW91IHVzZSBmbG9hdGluZyBwb2ludCBudW1iZXJzLiAgVE9ETzogaXMgdGhlcmUgYVxuICogYmV0dGVyIHR5cGUgd2UgY2FuIHVzZT9cbiAqL1xuZXhwb3J0IGNsYXNzIE11bHRSZWdpc3RlckNyZHQgZXh0ZW5kcyBDcmR0PG51bWJlcj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IG51bWJlcikge1xuICAgICAgICBzdXBlcihpZCwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgbXVsdChuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG4pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IG11bHRpcGxpY2F0aW9uLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiByZWdpc3Rlci52YWx1ZSAqPSBuIGFuZCByZWdpc3Rlci52YWx1ZSAvPSBuIHdvcmtcbiAgICAgKiBhcyBleHBlY3RlZCAoY29udmVydGVkIHRvIENSRFQgbXVsdGlwbGljYXRpb25zKS5cbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGN1cnJlbnQgdmFsdWUgaXMgMC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1wb3NzaWJsZSB0byBzZXQgdG8gbm9uemVybyB2YWx1ZSB3aGVuIGN1cnJlbnQgdmFsdWUgaXMgemVyb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuOyAvLyAwIC0+IDAgaXMgbm8tb3BcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm11bHQobmV3VmFsdWUgLyB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBDb3VudGVyTW9kSW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4vLyAgICAgY29uc3RydWN0b3IocmVhZG9ubHkgbW9kdWx1czogbnVtYmVyKSB7XG4vLyAgICAgICAgIGlmIChtb2R1bHVzIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwibW9kdWx1cyBpcyBuZWdhdGl2ZTogXCIgKyBtb2R1bHVzKTtcbi8vICAgICB9XG4vLyAgICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbi8vICAgICAgICAgZWxzZSByZXR1cm4gMDtcbi8vICAgICB9XG4vLyAgICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5tb2Qob3BlcmF0aW9uKTtcbi8vICAgICB9XG4vLyAgICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IG51bWJlciwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbbnVtYmVyLCBudW1iZXJdIHtcbi8vICAgICAgICAgcmV0dXJuIFt0aGlzLm1vZChzdGF0ZSArIG1lc3NhZ2UpLCBtZXNzYWdlXTtcbi8vICAgICB9XG4vLyAgICAgbW9kKHg6IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmICh4ID49IDApIHJldHVybiB4ICUgdGhpcy5tb2R1bHVzO1xuLy8gICAgICAgICBlbHNlIHJldHVybiB0aGlzLm1vZHVsdXMgLSAoKC14KSAlIHRoaXMubW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gfVxuXG4vKipcbiAqIE9wZXJhdGlvbnMgYW5kIG1lc3NhZ2VzIGFyZSB0aGUgZWxlbWVudCB0byBhZGQuICBUT0RPOlxuICogdGhpcyBtZWFucyB0aGF0IGFkZGluZyBudWxsIHdvbid0IHdvcmsgYXMgR1NldENyZHQgd2lsbCB0cmVhdFxuICogaXRzIG1lc3NhZ2UgYXMgYSBuby1vcC4gIERlc2NyaXB0aW9uIGlzIHRoZSBlbGVtZW50IGFkZGVkXG4gKiAoaWYgaXQncyByZWR1bmRhbnQsIGRlc2NyaXB0aW9uIGlzIG51bGwsIHNvIG9uY2hhbmdlIHdvbid0XG4gKiBzZWUgYW55dGhpbmcpLlxuICovXG5jbGFzcyBHU2V0SW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8U2V0PGFueT4+IHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBTZXQ8YW55Pik6IFNldDxhbnk+IHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhKSByZXR1cm4gbmV3IFNldDxhbnk+KGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbmV3IFNldDxhbnk+KCk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBhbnksIHN0YXRlOiBTZXQ8YW55Pikge1xuICAgICAgICBpZiAoc3RhdGUuaGFzKG9wZXJhdGlvbikpIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlOiBhbnksIHN0YXRlOiBTZXQ8YW55PiwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NldDxhbnk+LCBhbnldIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBHU2V0SW50ZXJuYWwoKTtcbn1cblxuLyoqXG4gKiBBIGdyb3ctb25seSBzZXQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBhcnJheSBvZiBlbGVtZW50cyBhZGRlZFxuICogKFtdIG9yIFthZGRlZCBlbGVtZW50XSkuXG4gKlxuICogVE9ETzogYWRkaW5nIGEgbnVsbCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gKiBUT0RPOiBhZGQgYSB0eXBlIGFubm90YXRpb25cbiAqIFRPRE86IHNhbWUgaW50ZXJmYWNlIGFzIEpTIFNldFxuICovXG5leHBvcnQgY2xhc3MgR1NldENyZHQgZXh0ZW5kcyBDcmR0PFNldDxhbnk+PiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogU2V0PGFueT4pIHtcbiAgICAgICAgc3VwZXIoaWQsIEdTZXRJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBhZGQoZWxlbWVudDogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChlbGVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBzZXQuICBUaGlzIHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSA6IFNldDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQodGhpcy5zdGF0ZSk7XG4gICAgfVxufVxuXG5jbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDxUPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTZXQ8W1QsIGFueSwgbnVtYmVyXT4+IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGluaXRpYWwgdmFsdWUgdG8gc2V0LlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IFQpOiBTZXQ8W1QsIGFueSwgbnVtYmVyXT4ge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIG5ldyBTZXQoW1tpbml0aWFsRGF0YSwgbnVsbCwgLTFdXSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcInNldFwiLCB2YWx1ZV06IHNldCB0byB0aGUgZ2l2ZW4gc2luZ2xlIHZhbHVlLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0LCBzZXR0aW5nIHRoZSB2YWx1ZSBzZXQgdG8gW10uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgX3N0YXRlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb246IFtzdHJpbmcsIGFueT9dLCBfc3RhdGU6IFNldDxbVCwgYW55LCBudW1iZXJdPiwgX3JlcGxpY2FJZDogYW55KSB7XG4gICAgICAgIGlmICghKChvcGVyYXRpb25bMF0gPT09IFwic2V0XCIgJiYgb3BlcmF0aW9uWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgfHwgb3BlcmF0aW9uWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybmVkIGRlc2NyaXB0aW9uIGlzOlxuICAgICAqIC0gZm9yIHNldCBtZXNzYWdlLCBbXCJzZXRcIiwgc2V0IHZhbHVlXSAoZXZlbiBpZiBpdFxuICAgICAqIGRvZXNuJ3QgZWxpbWluYXRlIGFsbCBjYXVzYWxseSBwcmlvciB2YWx1ZXMpLlxuICAgICAqIC0gZm9yIHJlc2V0cywgW1wicmVzZXRcIl0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IFtzdHJpbmcsIGFueT9dLCBzdGF0ZTogU2V0PFtULCBhbnksIG51bWJlcl0+LCBfcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NldDxbVCwgYW55LCBudW1iZXJdPiwgYW55XSB7XG4gICAgICAgIGlmICghKChtZXNzYWdlWzBdID09PSBcInNldFwiICYmIG1lc3NhZ2VbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB8fCBtZXNzYWdlWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSA9PT0gbnVsbCkgc3RhdGUuZGVsZXRlKHZhbHVlKTsvL2luaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQodmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSB2YWx1ZVsyXSkgc3RhdGUuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gXCJzZXRcIikge1xuICAgICAgICAgICAgc3RhdGUuYWRkKFttZXNzYWdlWzFdLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXI8VD4gZXh0ZW5kcyBDcmR0PFNldDxbVCwgYW55LCBudW1iZXJdPj4ge1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IFQpIHtcbiAgICAgICAgc3VwZXIoaWQsXG4gICAgICAgICAgICBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSBhcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDxUPixcbiAgICAgICAgICAgIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJzZXRcIiwgdmFsdWVdKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlU2V0KCk6IFNldDxUPiB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0PFQ+KCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUpIHZhbHVlcy5hZGQodmFsdWVbMF0pO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInJlc2V0XCJdKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxuICAgIC8vIFRPRE86IHJlc2V0IHN0cm9uZ1xufVxuIiwiaW1wb3J0IHtDYXVzYWxUaW1lc3RhbXAsIENyZHRSdW50aW1lLCBDcmR0TWVzc2FnZUxpc3RlbmVyfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG4vLyBUT0RPOiBpZHMgYXMgc3RyaW5ncyBpbnN0ZWFkIG9mIGFueVxuXG4vKipcbiAqIEludGVyZmFjZSBkZXNjcmliaW5nIHRoZSBpbnRlcm5hbCB3b3JraW5ncyBvZiBhIENSRFQgaW4gdGhlXG4gKiBwcmVwYXJlL2VmZmVjdCBzdHlsZSBvZiBcIlB1cmUgT3BlcmF0aW9uLUJhc2VkIFJlcGxpY2F0ZWQgRGF0YSBUeXBlc1wiXG4gKiBieSBCYXF1ZXJvIGV0IGFsLiAgVGhpcyBpbnRlcmZhY2UgaXMgYWxzbyBpbnNwaXJlZCBieSBTaGFyZURCJ3MgT1RcbiAqIHR5cGVzIChodHRwczovL2dpdGh1Yi5jb20vb3R0eXBlcy9kb2NzKS5cbiAqIEBwYXJhbSBTIFRoZSBDUkRUJ3Mgc3RhdGUgdHlwZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpbml0aWFsIHN0YXRlLCBwb3NzaWJseSBiYXNpbmcgaXRzIHZhbHVlXG4gICAgICogb2ZmIG9mIGluaXRpYWxEYXRhLiAgTm90ZSB0aGF0IGlmIHN0YXRlcyBjYW4gYmUgbXV0YXRlZFxuICAgICAqIGJ5IGVmZmVjdCwgdGhlbiBlYWNoIHJldHVybmVkIHN0YXRlIHNob3VsZCBiZSBhIGZyZXNoXG4gICAgICogb2JqZWN0LlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgQSB2YWx1ZSB1c2VkIHRvIG9wdGlvbmFsbHkgc2V0IHRoZSBzdGF0ZSdzXG4gICAgICogaW5pdGlhbCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuICBBIGZyZXNoIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUztcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBnaXZlbiBvcGVyYXRpb24sIHBvc3NpYmx5XG4gICAgICogcmVhZGluZyB0aGUgY3VycmVudCBzdGF0ZSBhbmQgaXNzdWluZyByZXBsaWNhIGlkLlxuICAgICAqIE1lc3NhZ2VzIGFuZCBvcGVyYXRpb25zIHdpbGwgaGF2ZSBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpY1xuICAgICAqIGZvcm0uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gQW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZGVzY3JpcHRpb24gb2ZcbiAgICAgKiB0aGUgb3BlcmF0aW9uLlxuICAgICAqIEBwYXJhbSAgc3RhdGUgVGhlIGN1cnJlbnQgc3RhdGUsIHdoaWNoIG1heSBiZSByZWFkIHRvIGRldGVybWluZVxuICAgICAqIHRoZSBtZXNzYWdlLiAgVGhpcyBzaG91bGQgbm90IGJlIG11dGF0ZWQuXG4gICAgICogQHBhcmFtIHJlcGxpY2FJZCBUaGUgaWQgb2YgdGhlIHJlcGxpY2EgaXNzdWluZyB0aGlzIG9wZXJhdGlvbixcbiAgICAgKiB3aGljaCBtYXkgYmUgcmVhZCB0byBkZXRlcm1pbmUgdGhlIG1lc3NhZ2UuXG4gICAgICogQHJldHVybiBBbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBkZXNjcmlwdGlvbiBvZiB0aGUgcmVzdWx0aW5nXG4gICAgICogbWVzc2FnZS4gIE5vdGUgdGhpcyB3aWxsIGJlIHNlbnQgb24gdGhlIHdpcmUgdXNpbmcgVE9ET1xuICAgICAqIChzZXJpYWxpemF0aW9uKS5cbiAgICAgKiBUaGUgbWVzc2FnZSBtc3V0IGJlIG51bGwgb25seSBpZiB0aGlzIG9wZXJhdGlvbiBkb2VzIG5vdFxuICAgICAqIGNoYW5nZSB0aGUgaW50ZXJuYWwgc3RhdGUsIHNpbmNlIGlmIHRoZSBtZXNzYWdlIGlzIG51bGwsXG4gICAgICogQ3JkdCB3aWxsIHNraXAgc2VuZGluZyB0aGUgbWVzc2FnZSB0byBvdGhlciByZXBsaWNhcy5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogYW55LCBzdGF0ZTogUywgcmVwbGljYUlkOiBhbnkpOiBhbnk7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgZ2l2ZW4gbWVzc2FnZSB0byB0aGUgc3RhdGUsIHJldHVybmluZyB0aGVcbiAgICAgKiByZXN1bHRpbmcgc3RhdGUgYXMgd2VsbCBhcyBhIGRlc2NyaXB0aW9uIG9mIHRoZSByZXN1bHRpbmdcbiAgICAgKiBjaGFuZ2UuICBNZXNzYWdlcyBhcmUgYXNzdW1lZCB0byBiZSBkZWxpdmVyZWQgaW4gY2F1c2FsXG4gICAgICogb3JkZXIuICBGb3IgZWZmaWNpZW5jeSwgdGhlIGlucHV0IHN0YXRlIHdpbGxcbiAgICAgKiBub3QgYmUgcmV1c2VkLCBzbyBhbiBpbXBsZW1lbnRhdGlvbiBpcyBmcmVlIHRvIG11dGF0ZVxuICAgICAqIGl0IGluLXBsYWNlIGFuZCByZXR1cm4gaXQuXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgVGhlIG1lc3NhZ2UgdG8gYmUgYXBwbGllZCwgY29taW5nIGZyb21cbiAgICAgKiBzb21lIHJlcGxpY2EncyBwcmVwYXJlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSAgc3RhdGUgICAgIFRoZSBpbnB1dCBzdGF0ZS5cbiAgICAgKiBAcGFyYW0gcmVwbGljYUlkIFRoZSBpZCBvZiB0aGUgcmVwbGljYSBhcHBseWluZyB0aGlzIG9wZXJhdGlvblxuICAgICAqIChub3QgdGhlIGlkIG9mIHRoZSByZXBsaWNhIHRoYXQgaXNzdWVkIHRoaXMgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtICB0aW1lc3RhbXAgVGhlIG1lc3NhZ2UncyBjYXVzYWwgdGltZXN0YW1wLiAgTm90ZSB0aGF0XG4gICAgICogYmVjYXVzZSBzZXZlcmFsIENSRFRzIGNhbiBzaGFyZSB0aGUgc2FtZSBydW50aW1lLCB0aW1lc3RhbXBzXG4gICAgICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gICAgICogbWlnaHQgc2tpcCBudW1iZXJzKS4gIEhvd2V2ZXIsIGNhdXNhbGx5IG9yZGVyZWQgZGVsaXZlcnkgaXNcbiAgICAgKiBzdGlsbCBndWFyYW50ZWVkLiAgSWYgd2UgYXJlIHByb2Nlc3Npbmcgb3VyIG93biBtZXNzYWdlXG4gICAgICogKGkuZS4sIHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSwgdGhlbiBpdCBpc1xuICAgICAqIGd1YXJhbnRlZWQgdGhhdCB0aGUgbWVzc2FnZSBpcyBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yXG4gICAgICogbWVzc2FnZXMuICBJdCBpcyBwb3NzaWJsZSB0aGF0IG11bHRpcGxlIG1lc3NhZ2VzIHNoYXJlIHRoZSBzYW1lXG4gICAgICogdGltZXN0YW1wOyBpZiBzbywgdGhleSBhcmUgdG90YWxseSBvcmRlcmVkIGJ5IHRoZSBjYXVzYWwgb3JkZXIsXG4gICAgICogdGhleSB3aWxsIGFsbCBiZSBkZWxpdmVyZWQgaW4gYSByb3cgaW4gY2F1c2FsIG9yZGVyLCBhbmQgdGhlXG4gICAgICogdGltZXN0YW1wIGFjY3VyYXRlbHkgcmVmbGVjdHMgdGhlaXIgY2F1c2FsIHJlbGF0aW9uc2hpcCB0b1xuICAgICAqIG90aGVyIG1lc3NhZ2VzIChpbiBwYXJ0aWN1bGFyLCB0aGV5IGFsbCBzaGFyZSB0aGUgc2FtZSBjYXVzYWxcbiAgICAgKiByZWxhdGlvbnNoaXBzIHdpdGggb3RoZXIgbWVzc2FnZXMpLlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtUaGUgb3V0cHV0IHN0YXRlLCBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpY1xuICAgICAqIGRlc2NyaXB0aW9uIG9mIHRoZSBjaGFuZ2UuXSAgVGhlIGRlc2NyaXB0aW9uIHdpbGwgYmUgcGFzc2VkXG4gICAgICogdG8gdGhlIGFwcGxpY2F0aW9uIHVzaW5nIHRoaXMgQ1JEVCBzbyB0aGV5IGtub3cgd2hhdCBvY2N1cnJlZC5cbiAgICAgKiBJZGVhbGx5LCBpdCBzaG91bGQgYmUgZGVzY3JpYmVkIGluIHRlcm1zIG9mIG9yZGluYXJ5IGRhdGFcbiAgICAgKiB0eXBlIG9wZXJhdGlvbnMsIHNvIHRoYXQgYXBwbGljYXRpb25zIGNhbiB1bmRlcnN0YW5kIHRoZSBjaGFuZ2VcbiAgICAgKiB3aXRob3V0IG5lZWRpbmcgdG8gdW5kZXJzdGFuZCB0aGUgQ1JEVCdzIHNlbWFudGljcy5cbiAgICAgKiBUaGUgZGVzY3JpcHRpb24gbXVzdCBiZSBudWxsIG9ubHkgaWYgdGhlIGV4dGVybmFsbHkgdmlzaWJsZVxuICAgICAqIHN0YXRlIGlzIHVuY2hhbmdlZCxcbiAgICAgKiBzaW5jZSBDcmR0IHdpbGwgc2tpcCBjYWxsaW5nIG9uY2hhbmdlIGlmIGRlc2NyaXB0aW9uIGlzIG51bGwuXG4gICAgICogKFRoZSBjb252ZXJzZS0tLWlmIHRoZSBzdGF0ZSB3YXMgdW5jaGFuZ2VkLCB0aGVuIGRlc2NyaXB0aW9uXG4gICAgICogaXMgbnVsbC0tLW5lZWQgbm90IGhvbGQsIGFsdGhvdWdoIGl0IGlzIG5pY2UgaWYgaXQgZG9lcy4pXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2U6IGFueSwgc3RhdGU6IFMsIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtTLCBhbnldO1xufVxuXG4vKipcbiAqIEFuIGV2ZW50IGlzc3VlZCB3aGVuIGEgQ1JEVCBpcyBjaGFuZ2VkIGJ5IGFub3RoZXIgcmVwbGljYS5cbiAqIEBwYXJhbSBjYWxsZXIgICAgICBUaGUgQ3JkdCBpbnN0YW5jZSB0aGF0IHdhcyBjaGFuZ2VkLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NycHRpb24gb2YgdGhlIGNoYW5nZS5cbiAqIEBwYXJhbSB0aW1lc3RhbXAgICBUaGUgY2F1c2FsIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLiBOb3RlIHRoYXRcbiAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICogc3RpbGwgZ3VhcmFudGVlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHRDaGFuZ2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNhbGxlcjogQ3JkdDxhbnk+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb246IGFueSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKSB7IH1cbn1cblxuLy8gVXNlci1mYWNpbmcgd3JhcHBlcnMgYXJvdW5kIENSRFRzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzcyxcbi8vIGFkZGluZyBtZXRob2RzIGZvciB0aGUgQ1JEVCdzIG9wZXJhdGlvbnMgKGUuZy4sIGluY3JlbWVudCgpKVxuLy8gd2hpY2ggY2FsbCB0aGlzIGNsYXNzJ3MgYXBwbHkgbWV0aG9kLlxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhcHBsaWNhdGlvbi1mYWNpbmcgQ1JEVCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJbnN0ZWFkIG9mIGV4cG9zaW5nIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbnMgZGlyZWN0bHksXG4gKiB3aGljaCBoYXZlIGFuIHVuZnJpZW5kbHkgcHJlcGFyZS9lZmZlY3QgaW50ZXJmYWNlLFxuICogZWFjaCBDUkRUIGltcGxlbWVudGF0aW9uIHNob3VsZCBkZWZpbmUgYSBzdWJjbGFzcyBvZiB0aGlzXG4gKiBjbGFzcyB3aXRoIG9yZGluYXJ5LWxvb2tpbmcgbWV0aG9kcyB0byBwZXJmb3JtIG9wZXJhdGlvbnNcbiAqIGFuZCBxdWVyeSB0aGUgc3RhdGUuICBNZXRob2RzIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyBzaG91bGRcbiAqIGNhbGwgYXBwbHlPcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIENyZHRJbnRlcm5hbCBvcGVyYXRpb24uXG4gKiBUaGlzIGNsYXNzIHRoZW4gYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgYW5kIHJlY2VpdmluZ1xuICogb2YgbWVzc2FnZXMuXG4gKiBDZi4gQWxnb3JpdGhtIDEgaW4gdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBwYXBlci5cbiAqIEBwYXJhbSBTIFRoZSBzdGF0ZSB0eXBlIG9mIEMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0PFM+IGltcGxlbWVudHMgQ3JkdE1lc3NhZ2VMaXN0ZW5lciB7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgQ3JkdEludGVybmFsIHN0YXRlLiAgVGhpcyBzaG91bGQgbm90XG4gICAgICogYmUgbXV0YXRlZCBkaXJlY3RseSBidXQgbWF5IGJlIHJlYWQgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0XG4gICAgICogdGhlIHN0YXRlLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBzdGF0ZTogUztcbiAgICAvKipcbiAgICAgKiBTZXQgdGhpcyB0byBsaXN0ZW4gZm9yIHdoZW4gYW5vdGhlciByZXBsaWNhIHVwZGF0ZXNcbiAgICAgKiB0aGlzIG9iamVjdCdzIHN0YXRlLlxuICAgICAqL1xuICAgIG9uY2hhbmdlIDogKGV2ZW50OiBDcmR0Q2hhbmdlRXZlbnQpID0+IHZvaWQgPSAoKF8pID0+IHt9KTtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIGNyZHRJbnRlcm5hbCAgICBUaGUgQ3JkdEludGVybmFsIHRvIHVzZS4gIE5vdGUgdGhhdCBzaW5jZVxuICAgICAqIENyZHRJbnRlcm5hbCdzIGRvbid0IHN0b3JlIHN0YXRlcywgbXVsdGlwbGUgb2JqZWN0cyBtYXlcbiAgICAgKiBzaGFyZSB0aGUgc2FtZSBDcmR0SW50ZXJuYWwgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICBPcHRpb25hbCBpbml0aWFsIGRhdGEgdG8gdXNlIHdoZW5cbiAgICAgKiBzZXR0aW5nIHRoZSBDcmR0SW50ZXJuYWwncyBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBpZDogYW55LCBwdWJsaWMgcmVhZG9ubHkgY3JkdEludGVybmFsOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNyZHRJbnRlcm5hbC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZGVzY3JpYmUgXCJ0cmFuc2FjdGlvbnNcIi4gIFJpZ2h0IHdvcmQ/ICBSZW5hbWVcbiAgICAvLyBcImF0b21pY1wiIHN0dWZmIGJlbG93LiAgTXVzdCBoYXBwZW4gc3luY2hyb25vdXNseSBzb1xuICAgIC8vIHRoYXQgcnVudGltZS5nZXRUaW1lc3RhbXAoKSBkb2Vzbid0IGNoYW5nZSBhbmRcbiAgICAvLyBubyBtZXNzYWdlcyBhcmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXG4gICAgLy8gQWxsb3cgY2FsbGVyIHRvIHN0YXJ0L2VuZCB0cmFuc2FjdGlvbnM/XG4gICAgcHJpdmF0ZSBpblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbk1lc3NhZ2VzOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHJpdmF0ZSB0cmFuc2FjdGlvbkRlc2NyaXB0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuICAgIHByb3RlY3RlZCBzdGFydFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmV0dXJucyB0aGUgZGVzY3JpcHRpb25zICh0cmFuc2xhdGVkKVxuICAgIHByb3RlY3RlZCBlbmRUcmFuc2FjdGlvbigpOiBhbnkge1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZCh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMsIHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzID0gW107XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHRoZSBnaXZlbiBvcGVyYXRpb24gdG8gdGhlIHN0YXRlLCB1c2luZyBwcmVwYXJlIGFuZCBlZmZlY3QsXG4gICAgICogYW5kIHNlbmRzIHRoZSBnZW5lcmF0ZWQgbWVzc2FnZSBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIElmIGEgdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MsIHRoaXMgc2VuZGluZyBpcyBkZWxheWVkXG4gICAgICogdW50aWxcbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBUaGUgb3BlcmF0aW9uIHRvIGFwcGx5LlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY2hhbmdlcy5cbiAgICAgKiBUaGlzIGlzIHRoZSBsaXN0IG9mIGluZGl2aWR1YWwgbWVzc2FnZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiBlZmZlY3QgKHNraXBwaW5nIG51bGwgbWVzc2FnZXMpLFxuICAgICAqIGFmdGVyIGJlaW5nIHBhc3NlZCB0aHJvdWdoIHRyYW5zbGF0ZURlc2NyaXB0aW9uLiAgQW4gZXhjZXB0aW9uXG4gICAgICogaXMgdGhhdCBpZiBhbGwgbWVzc2FnZXMgYXJlXG4gICAgICogbnVsbCwgbnVsbCBpcyByZXR1cm5lZCB3aXRob3V0IGNhbGxpbmcgdHJhbnNsYXRlRGVzY3JpcHRpb24uXG4gICAgICogVE9ETzogbnVsbCBpZiBpbiBhIHRyYW5zYWN0aW9uICh1c2UgZW5kVHJhbnNhY3Rpb24gaW5zdGVhZCkuXG4gICAgICogVE9ETzogYnV0IHdoYXQgaWYgd2Ugd2FudCBpdCB0byBkZWNpZGUgd2hhdCB0byBkbyBuZXh0P1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIGxldCBvd25UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgb3duVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuY3JkdEludGVybmFsLnByZXBhcmUob3BlcmF0aW9uLCB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvd25UcmFuc2FjdGlvbikgcmV0dXJuIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHRyYW5zbGF0ZSB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIENyZHRJbnRlcm5hbCBiZWZvcmUgcGFzc2luZyBpdCB0byBvbmNoYW5nZS4gIFRoaXMgaXNcbiAgICAgKiB1c2VmdWwgZm9yIHNlbWlkaXJlY3QgcHJvZHVjdHMgYmVjYXVzZSB0aGUgZGVmYXVsdFxuICAgICAqIFNlbWlkaXJlY3RJbnRlcm5hbCBkZXNjcmlwdGlvbnMgYXJlIG5vdCB1c2VyLWZyaWVuZGx5LlxuICAgICAqIElmIHRoaXMgbWV0aG9kIHJldHVybnMgbnVsbCwgb25jaGFuZ2UgaXMgbm90IGNhbGxlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGlvbiByZXR1cm5zIGRlc2NyaXB0aW9uc1swXS4gIEl0IGlzXG4gICAgICogYXBwcm9wcmlhdGUgd2hlbiB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QgYWxyZWFkeSByZXR1cm5zXG4gICAgICogdXNlci1mcmllbmRseSBkZXNjcmlwdGlvbnMgYW5kIGFwcGx5T3BzIGlzIG9ubHkgZXZlciBjYWxsZWRcbiAgICAgKiB3aXRoIHNpbmdsZSBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtICBkZXNjcmlwdGlvbnMgQSBsaXN0IG9mIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QuICBUaGlzIHdpbGwgYWx3YXlzIGJlIG5vbi1lbXB0eS5cbiAgICAgKiBAcmV0dXJuIFRoZSB0cmFuc2xhdGVkIGRlc2NyaXB0aW9uIHRvIHBhc3MgdG8gdGhpcy5vbmNoYW5nZSxcbiAgICAgKiBvciBudWxsIGlmIHRoaXMub25jaGFuZ2Ugc2hvdWxkIG5vdCBiZSBjYWxsZWQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnM6IEFycmF5PGFueT4pOiBhbnkge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBvYnNlcnZlZCByZXNldHNcbiAgICAgKiBmb3Igd2hlbiBhIENyZHRPYmplY3QgY29udGFpbmluZyB0aGlzIENyZHQgaXNcbiAgICAgKiByZXNldC4gIFRoZVxuICAgICAqIGRlZmF1bHQgcmV0dXJucyBudWxsLCBzbyBzdWNoIG1hcCByZXNldHMgZG8gbm90aGluZy5cbiAgICAgKiBAcmV0dXJuIEEgbWVzc2FnZSAobm90IG9wZXJhdGlvbikgdGhhdCBjYW4gYmUgYXBwbGllZCB0b1xuICAgICAqIHRoaXMgQ3JkdCB0b2dldGhlciB3aXRoIGFueSB0aW1lc3RhbXBcbiAgICAgKiB0byBjYXVzZSBhbiBvYnNlcnZlZC1yZXNldCBvcGVyYXRpb24sIG9yIG51bGwgdG8gZG9cbiAgICAgKiBub3RoaW5nLiAgRm9yIHRoaXMgQ3JkdFxuICAgICAqIHRvIGJlIGNvcnJlY3QgKGV2ZW50dWFsbHkgY29uc2lzdGVudCkgd2hlbiB1c2VkIGFzIGFcbiAgICAgKiBwcm9wZXJ0eSBpbiBhbiBDcmR0T2JqZWN0LCB0aGUgcmV0dXJuZWQgbWVzc2FnZVxuICAgICAqIG11c3Qgc2F0aXNmeTpcbiAgICAgKiAtIHdoZW4gcGFpcmVkIHdpdGggYW55IENhdXNhbFRpbWVzdGFtcCwgaXQgY29tbXV0ZXMgd2l0aFxuICAgICAqIGNvbmN1cnJlbnQgbWVzc2FnZXMgKHVzdWFsIENyZHQgcmVxdWlyZW1lbnQpLCBpbmNsdWRpbmdcbiAgICAgKiBjb25jdXJyZW50IHJlc2V0cyBhbmQgc3Ryb25nLXJlc2V0cy5cbiAgICAgKiAtIHdoZW4gYXBwbGllZCB0byBhIHN0YXRlIHdoaWNoIGhhcyBub3QgcmVjZWl2ZWQgYW55XG4gICAgICogbWVzc2FnZXMgY2F1c2FsbHkgcHJpb3IgdG8gdGhlIHRpbWVzdGFtcCwgaXQgaGFzXG4gICAgICogbm8gZWZmZWN0LiAgSW4gb3RoZXIgd29yZHMsIGFwcGx5aW5nIGl0IHRvIGEgY29uY3VycmVudGx5XG4gICAgICogaW5pdGlhbGl6ZWQgc3RhdGUgaGFzIG5vIGVmZmVjdC5cbiAgICAgKiBPdGhlcndpc2UsIGl0IGlzIGZyZWUgdG8gaGF2ZSBhbnkgc2VtYW50aWNzLCBpbmNsdWRpbmdcbiAgICAgKiBkb2luZyBub3RoaW5nLiAgSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIG9ic2VydmVkLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIG1lc3NhZ2VzIGluc3RlYWQsIGZvciBnZW5lcmFsaXR5P1xuICAgICAqL1xuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBvYnNlcnZlZC1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0KCk6IHZvaWQgeyB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBzdHJvbmctcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXRTdHJvbmcoKTogdm9pZCB7IH1cbiAgICAvLyAvKipcbiAgICAvLyAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBzdHJvbmcgcmVzZXRzLiAgVGhlXG4gICAgLy8gICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgIC8vICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgLy8gICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgIC8vICAqIHRvIGNhdXNlIGEgc3Ryb25nLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgIC8vICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgLy8gICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgIC8vICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgLy8gICogbXVzdCBzYXRpc2Z5OlxuICAgIC8vICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgLy8gICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgIC8vICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgIC8vICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgIC8vICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAvLyAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAvLyAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAvLyAgKi9cbiAgICAvLyBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKTogYW55IHtcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIHRoaXMucnVudGltZSB3aGVuIGFuIGF0b21pYyBsaXN0IG9mXG4gICAgICogbWVzc2FnZXMgaXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgcmVjZWl2ZShtZXNzYWdlczogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbiB0cmFuc2FjdGlvbjsgdGhlIHRyYW5zYWN0aW9uIG11c3QgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJlIGVuZGVkIHN5bmNocm9ub3VzbHkgc28gdGhhdCBtZXNzYWdlcyBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiY2Fubm90IGJlIHJlY2VpdmVkIGluIHRoZSBpbnRlcmltLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QobWVzc2FnZSwgdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25jaGFuZ2UgJiYgZGVzY3JpcHRpb25zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2hhbmdlKG5ldyBDcmR0Q2hhbmdlRXZlbnQodGhpcywgdHJhbnNsYXRlZCwgdGltZXN0YW1wKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDcmR0T2JqZWN0LCBNYXBDcmR0LCBFbmFibGVXaW5zRmxhZywgSW50UmVnaXN0ZXJDcmR0LCBBZGRXaW5zU2V0IH0gZnJvbSBcIi4vc3RhbmRhcmRcIjtcbmltcG9ydCB7IENyZHQgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcbmltcG9ydCB7IE11bHRpVmFsdWVSZWdpc3RlciB9IGZyb20gXCIuL2Jhc2ljX2NyZHRzXCI7XG5pbXBvcnQgeyBDcmR0UnVudGltZSB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5cbmludGVyZmFjZSBKc29uSW5kZXhUeXBlIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBKc29uQ3JkdCBleHRlbmRzIENyZHRPYmplY3Q8c3RyaW5nLCBDcmR0PGFueT4+IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJvb2xlYW5zOiBNYXBDcmR0PHN0cmluZywgRW5hYmxlV2luc0ZsYWc+O1xuICAgIC8vIFRPRE86IGR3RmxhZ3MgdG9vP1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbnVtYmVyczogTWFwQ3JkdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD47XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdHJpbmdzOiBNYXBDcmR0PHN0cmluZywgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2V0czogTWFwQ3JkdDxzdHJpbmcsIEFkZFdpbnNTZXQ8YW55Pj47XG4gICAgLy8gVE9ETzogUldTZXRzIHRvbz9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9iamVjdHM6IE1hcENyZHQ8c3RyaW5nLCBKc29uQ3JkdD47XG4gICAgLy8gVE9ETzogYXJyYXlzIChzZXF1ZW5jZXMpLiAgVXNlcyBtYXBzIGZvciBub3cuXG4gICAgLy8gVE9ETzogbnVsbHM/XG5cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHBhc3MgaW5pdGlhbCB2YWx1ZSAod2hpY2ggaXMgbm90IHN5bmNlZCkuXG4gICAgLy8gTW9yZSBnZW5lcmFsbHksIGFiaWxpdHkgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIHlvdXJcbiAgICAvLyBwcmVkZWZpbmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHN5bmNlZD9cbiAgICAvLyBVc2UgdGhlIGV4aXN0aW5nIGZsYWcgYW5kIGJsb2NrIG1lc3NhZ2VzIGluIENyZHRPYmplY3QuXG4gICAgY29uc3RydWN0b3IoY3JkdElkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmJvb2xlYW5zID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcImJvb2xlYW5zXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT5cbiAgICAgICAgICAgIG5ldyBFbmFibGVXaW5zRmxhZyhrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5udW1iZXJzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcIm51bWJlcnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEludFJlZ2lzdGVyQ3JkdChrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcInN0cmluZ3NcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IE11bHRpVmFsdWVSZWdpc3RlcjxzdHJpbmc+KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldHMgPSBuZXcgTWFwQ3JkdChcbiAgICAgICAgICAgIFwic2V0c1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+XG4gICAgICAgICAgICBuZXcgQWRkV2luc1NldChrZXksIGludGVybmFsUnVudGltZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5vYmplY3RzID0gbmV3IE1hcENyZHQoXG4gICAgICAgICAgICBcIm9iamVjdHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PlxuICAgICAgICAgICAgbmV3IEpzb25DcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgQ3JkdCB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHN0b3JpbmdcbiAgICAgKiB2YWx1ZXMgd2l0aCB0aGUgc2FtZSB0eXBlIGFzIHR5cGVJbmRpY2F0b3IsXG4gICAgICogb3IgdW5kZWZpbmVkIGlmIHRoZSBrZXkgaXMgbm90IHByZXNlbnQgKGluY2x1ZGluZ1xuICAgICAqIGlmIGl0IHByZXZpb3VzbHkgd2FzIHByZXNlbnQgYnV0IHdhcyByZW1vdmVkKS5cbiAgICAgKiAoVXNlIGluaXQgaW5zdGVhZCBpZiB5b3Ugd2FudCBhIGd1YXJhbnRlZWQtZGVmaW5lZFxuICAgICAqIHJldHVybiB2YWx1ZS4pXG4gICAgICogKFRPRE86IGV4cGxhaW4ga2V5cyBhcmVcbiAgICAgKiBzZWdyZWdhdGVkIGJ5IHZhbHVlIHR5cGUpLlxuICAgICAqIEUuZy4gZ2V0KFwiYVwiLCAwKSB0byBnZXQgdGhlIG51bWJlciB2YWx1ZSB3aXRoIGtleSAwLlxuICAgICAqIFN0YW5kYXJkIHR5cGVJbmRpY2F0b3IgdmFsdWVzOlxuICAgICAqIC0gZmFsc2U6IGJvb2xlYW4gKEVuYWJsZVdpbnNGbGFnKVxuICAgICAqIC0gMDogbnVtYmVyIChJbnRSZWdpc3RlckNyZHQpXG4gICAgICogLSBcIlwiOiBzdHJpbmcgKE11bHRpVmFsdWVSZWdpc3RlcjxzdHJpbmc+KVxuICAgICAqIC0gbmV3IFNldCgpOiBzZXQgKEFkZFdpbnNTZXQpXG4gICAgICogLSB7fTogb2JqZWN0IChKc29uQ3JkdClcbiAgICAgKlxuICAgICAqIFRPRE86IGV4cGxpY3RseSB0eXBlZCB2ZXJzaW9ucz8gIENhbiB3ZSBkbyB0aGlzIGNsZXZlcmx5XG4gICAgICogd2l0aCBnZW5lcmljcyBhbmQgdHlwZSBwb2x5bW9ycGhpc20gb3Igc29tZXRoaW5nP1xuICAgICAqXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHR5cGVJbmRpY2F0b3IgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlKGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHRoaXMuYm9vbGVhbnMuZGVsZXRlKGtleSk7IHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogdGhpcy5udW1iZXJzLmRlbGV0ZShrZXkpOyByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHRoaXMuc3RyaW5ncy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0cy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMub2JqZWN0cy5kZWxldGUoa2V5KTsgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaWtlIGdldCwgYnV0IGluc3RlYWQgb2YgcmV0dXJuaW5nIHRoZSB2YWx1ZSBDcmR0LFxuICAgICAqIHJldHVybnMgaXRzIHZhbHVlLiAgTm90ZSBmb3Igc3RyaW5ncywgaWYgdGhlIENyZHRcbiAgICAgKiBkb2VzIG5vdCBoYXZlIGEgc2luZ2xlIHZhbHVlIChlaXRoZXIgb3IgMispLFxuICAgICAqIHdoaWNoIGlzIHBvc3NpYmxlIGR1ZSB0byB0aGUgTXVsdGlWYWx1ZVJlZ2lzdGVyXG4gICAgICogc2VtYW50aWNzLCB3ZSByZXR1cm4gdGhlIHNldCBvZiBhbGwgY3VycmVudCB2YWx1ZXNcbiAgICAgKiBpbnN0ZWFkIG9mIGEgc2luZ2xlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIFRPRE86IHVzZSBnZW5lcmljcyB0byBzYXkgdGhhdCByZXR1cm4gdmFsdWUgaXNcbiAgICAgKiBzYW1lIGFzIHR5cGVJbmRpY2F0b3IgdHlwZSB8IHVuZGVmaW5lZD9cbiAgICAgKiBXb3JrcyBleGNlcHQgZm9yIHN0cmluZ3MsXG4gICAgICogd2hpY2ggY291bGQgaW5zdGVhZCByZXR1cm4gYSBTZXQ8c3RyaW5nPi5cbiAgICAgKiBDb3VsZCBpbnN0ZWFkIGhhdmUgc3BlY2lmaWNhbGx5IHR5cGVkIHZlcnNpb25zIG9mIHRoZSBtZXRob2QuXG4gICAgICovXG4gICAgZ2V0VmFsdWUoa2V5OiBzdHJpbmcsIHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpOlxuICAgICAgICAgICAgYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8IFNldDxzdHJpbmc+IHwgU2V0PGFueT4gfCBPYmplY3QgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5nZXQoa2V5LCB0eXBlSW5kaWNhdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlQ3JkdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNyZHQgaW5zdGFuY2VvZiBNdWx0aVZhbHVlUmVnaXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTZXQgPSB2YWx1ZUNyZHQudmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU2V0LnNpemUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVTZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZUNyZHQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMvcmV2aXZlcyB0aGUgZ2l2ZW4ga2V5IHdpdGggdGhlIGluZGljYXRlZCB0eXBlIGlmXG4gICAgICogbmVlZGVkLCBtYWtpbmcgaXQgcHJlc2VudCBpbiB0aGUgc3RhdGVcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB0aGUgdmFsdWUgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0KGtleTogc3RyaW5nLCB0eXBlSW5kaWNhdG9yOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIC8vIFRPRE86IGNhbiB3ZSBnZW5lcmlmeSB0aGlzIGZ1bmN0aW9uIHBhdHRlcm4/XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLm9iamVjdHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHRvIGEgY29weSBvZiB0aGUgZ2l2ZW5cbiAgICAgKiAobm9uLUNyZHQpIHZhbHVlLCB1c2luZyB0aGUgQ3JkdCdzIC52YWx1ZSA9IG1ldGhvZC5cbiAgICAgKiBUaGlzIGdlbmVyYWxseSBoYXMgdGhlIGVmZmVjdCBvZiByZXNldHRpbmcgdGhlIGN1cnJlbnQgQ3JkdFxuICAgICAqIGFuZCB0aGVuIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyB0byBkcml2ZSBpdCB0byB0aGUgZGVzaXJlZFxuICAgICAqIHZhbHVlLiAgSWYgeW91IHdhbnQgbW9yZSBjb250cm9sIG92ZXIgaG93IHRoZSB2YWx1ZSBpcyBzZXRcbiAgICAgKiAoZS5nLiwgcGFzc2luZyBhbiBvcHRpb24gdG8gSnNvbkNyZHQuZ2V0QXNPYmplY3Qgd2hlbiBzZXR0aW5nXG4gICAgICogYW4gb2JqZWN0J3MgdmFsdWUpLCB5b3UgY2FuIGluc3RlYWQgZ2V0IHRoZSBDcmR0IHdpdGhcbiAgICAgKiB0aGlzLmluaXQoa2V5LCB2YWx1ZSkgYW5kIHRoZW4gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGl0XG4gICAgICogZGlyZWN0bHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdmFsdWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyB2YWx1ZSBDcmR0ICh0aGlzLmdldChrZXksIHZhbHVlKSkuXG4gICAgICovXG4gICAgc2V0VmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nIHxcbiAgICAgICAgICAgIFNldDxhbnk+IHwgT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZUludGVybmFsKGtleTogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZyB8XG4gICAgICAgICAgICBTZXQ8YW55PiB8IE9iamVjdCkge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5pbml0KGtleSwgdmFsdWUpO1xuICAgICAgICB2YWx1ZUNyZHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG5cbiAgICBrZXlzQnlUeXBlKHR5cGVJbmRpY2F0b3I6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcgfFxuICAgICAgICAgICAgU2V0PGFueT4gfCBPYmplY3QpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5rZXlzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMub2JqZWN0cy5rZXlzKCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gQXJyYXkgb2YgW2tleSwgdHlwZSBuYW1lXSBwYWlyc1xuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PFtzdHJpbmcsIHN0cmluZ10+ID0gW107XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLmJvb2xlYW5zLmtleXMoKSkgcmVzdWx0LnB1c2goW2tleSwgXCJib29sZWFuXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMubnVtYmVycy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwibnVtYmVyXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuc3RyaW5ncy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwic3RyaW5nXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuc2V0cy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwic2V0XCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub2JqZWN0cy5rZXlzKCkpIHJlc3VsdC5wdXNoKFtrZXksIFwib2JqZWN0XCJdKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBkZWxldGVcbiAgICAvLyBUT0RPOiBkZWxldGVTdHJvbmcgKG9uY2UgbWFwIHN1cHBvcnRzIGl0LiAgUGVyaGFwcyB0aHJvd1xuICAgIC8vIGVycm9yIG9uIG1hcCB2YWx1ZXMgb25seT8pXG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgRXJyb3JPbkNvbmZsaWN0ID0gMTtcbiAgICBzdGF0aWMgcmVhZG9ubHkgUHJlZml4VHlwZXMgPSAyO1xuICAgIHN0YXRpYyByZWFkb25seSBFeHBhbmRPbkNvbmZsaWN0ID0gMztcbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGU6IG51bWJlcikge1xuICAgICAgICBpZiAoIShrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzIHx8XG4gICAgICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QgfHxcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQga2V5Q29uZmxpY3RSdWxlOiBcIiArXG4gICAgICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY29weSBvZiB0aGlzIENyZHQncyB2YWx1ZSBpbiBPYmplY3QgZm9ybS5cbiAgICAgKiBDaGFuZ2luZyB0aGUgcmV0dXJuZWQgdmFsdWUgaGFzIG5vIGVmZmVjdCBvbiB0aGUgQ3JkdCBzdGF0ZS5cbiAgICAgKiBOb3RlIHRoYXQgc2V0IHZhbHVlcyBhcmUgY29udmVydGVkIHRvIEphdmFzY3JpcHQgU2V0cyxcbiAgICAgKiByZXN1bHRpbmcgaW4gYSBub3QtcXVpdGUtSlNPTiBmb3JtYXQgb2JqZWN0LlxuICAgICAqIEEgc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlciBpcyBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgaWYgaXQgaGFzXG4gICAgICogYSBzaW5nbGUgdmFsdWU7IG90aGVyd2lzZSAoMCBvciAyKyB2YWx1ZXMpIGl0XG4gICAgICogaXMgY29udmVydGVkIHRvIGEgU2V0PHN0cmluZz5cbiAgICAgKiAoQXJyYXk8c3RyaW5nPiBpZiBzZXRzQXNBcnJheXM9dHJ1ZSlcbiAgICAgKiBvZiBhbGwgY3VycmVudCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleUNvbmZsaWN0UnVsZT1Kc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICogUG9saWN5IGZvciBoYW5kbGluZyBrZXlzIG9mIGRpZmZlcmVudCB0eXBlcyB0aGF0IGhhdmUgdGhlXG4gICAgICogc2FtZSBuYW1lLiAgT3B0aW9uczpcbiAgICAgKiAtIEVycm9yT25Db25mbGljdCAoZGVmYXVsdCk6IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIGEga2V5IGNvbmZsaWN0LlxuICAgICAqIC0gUHJlZml4VHlwZXM6IHByZWZpeCB0aGUgdHlwZSBuYW1lIGZvbGxvd2VkIGJ5IFwiOlwiIHRvIGVhY2gga2V5LFxuICAgICAqIGUuZy4gXCJudW1iZXI6bXlLZXlcIi4gIFR5cGUgbmFtZXMgYXJlIFwiYm9vbGVhblwiLCBcIm51bWJlclwiLFxuICAgICAqIFwic3RyaW5nXCIsIFwic2V0XCIsIFwib2JqZWN0XCIuXG4gICAgICogLSBFeHBhbmRPbkNvbmZsaWN0OiBpZiB0aGVyZSBpcyBhIGNvbmZsaWN0IG9uXG4gICAgICogYSBrZXksIHNldCBpdHMgdmFsdWUgdG8gZXF1YWwgYW4gb2JqZWN0IGNvbnRhaW5pbmcgZWFjaCBvZlxuICAgICAqIHRoZSBjb25mbGljdGluZyB2YWx1ZXMsIHBsdXMgYSBmbGFnIFwianNvbkNyZHRLZXlFeHBhbmRlZCA9IHRydWVcIi4gIEUuZy5cbiAgICAgKiBcIm15S2V5XCI6IHtcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSwgXCJzdHJpbmdcIjogXCJzdHJpbmdWYWx1ZVwiLFxuICAgICAqIFwibnVtYmVyXCI6IDd9XG4gICAgICogQHBhcmFtIHNldHNBc0FycmF5cyA9IGZhbHNlIElmIHRydWUsIFNldCB2YWx1ZXMgYXJlIGNvbnZlcnRlZFxuICAgICAqIHRvIGFycmF5cywgc28gdGhhdCB0aGUgcmVzdWx0aW5nIE9iamVjdCBpcyBpbiByZWd1bGFyIEpTT05cbiAgICAgKiBmb3JtYXQuICBUaGlzIGluY2x1ZGVzIFNldDxzdHJpbmc+IHZhbHVlcyByZXN1bHRpbmcgZnJvbVxuICAgICAqIHN0cmluZyBNdWx0aVZhbHVlUmVnaXN0ZXJzIHRoYXQgaGF2ZSAwIG9yIDIrIHZhbHVlcy5cbiAgICAgKi9cbiAgICBnZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsXG4gICAgICAgICAgICBzZXRzQXNBcnJheXMgPSBmYWxzZSk6IE9iamVjdCB7XG4gICAgICAgIEpzb25DcmR0LmNoZWNrS2V5Q29uZmxpY3RSdWxlKGtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIGxldCBvYmplY3Q6IEpzb25JbmRleFR5cGUgPSB7fTtcbiAgICAgICAgLy8gTWFwcyBrZXlzIHRvIHRoZSBuYW1lIG9mIHRoZWlyIGZpcnN0IHR5cGVcbiAgICAgICAgbGV0IGtleXNTb0ZhciA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgIGxldCBjb25mbGljdGVkS2V5c1NvRmFyID0gbmV3IFNldDxTdHJpbmc+KCk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5ib29sZWFucywgXCJib29sZWFuXCIsXG4gICAgICAgICAgICB2YWx1ZSA9PiB2YWx1ZS52YWx1ZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMubnVtYmVycywgXCJudW1iZXJcIixcbiAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlLnZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0ZhcixcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5zdHJpbmdzLCBcInN0cmluZ1wiLFxuICAgICAgICAgICAgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZS52YWx1ZVNldDtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnNpemUgPT09IDEpIHJldHVybiByZXN1bHQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIChzZXRzQXNBcnJheXM/IFsuLi5yZXN1bHQudmFsdWVzKCldOiByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc2V0cywgXCJzZXRcIixcbiAgICAgICAgICAgIHZhbHVlID0+IChzZXRzQXNBcnJheXM/IFsuLi52YWx1ZS52YWx1ZV06IHZhbHVlLnZhbHVlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsXG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUsIHRoaXMub2JqZWN0cywgXCJvYmplY3RcIixcbiAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlLmdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSwgc2V0c0FzQXJyYXlzKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBwcml2YXRlIGdldEFzT2JqZWN0SW50ZXJuYWw8ViBleHRlbmRzIENyZHQ8YW55Pj4oXG4gICAgICAgIG9iamVjdDogSnNvbkluZGV4VHlwZSwga2V5c1NvRmFyOiBNYXA8c3RyaW5nLCBzdHJpbmc+LFxuICAgICAgICBjb25mbGljdGVkS2V5c1NvRmFyOiBTZXQ8U3RyaW5nPiwga2V5Q29uZmxpY3RSdWxlOiBudW1iZXIsXG4gICAgICAgIG1hcDogTWFwQ3JkdDxzdHJpbmcsIFY+LCB0eXBlTmFtZTogc3RyaW5nLFxuICAgICAgICB2YWx1ZUZ1bmM6ICh2YWx1ZUNyZHQ6IFYpID0+IGFueSkge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgbWFwLmtleXMoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVGdW5jKG1hcC5nZXQoa2V5KSBhcyBWKTtcbiAgICAgICAgICAgIGlmIChrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W3R5cGVOYW1lICsgXCI6XCIgKyBrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlzU29GYXIuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBLZXkgY29uZmxpY3RcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGtleTogXCIgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgd2hlbiBrZXlDb25mbGljdFJ1bGU9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3RcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25mbGljdGVkS2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHBhbmQgdGhlIGV4aXN0aW5nIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mbGljdGVkS2V5c1NvRmFyLmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4cGFuZGVkOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRba2V5c1NvRmFyLmdldChrZXkpIGFzIHN0cmluZ10gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gZXhwYW5kZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKG9iamVjdFtrZXldIGFzIEpzb25JbmRleFR5cGUpW3R5cGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAga2V5c1NvRmFyLnNldChrZXksIHR5cGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhpcyBvYmplY3QgYW5kIHRoZW4gcGVyZm9ybXMgb3BlcmF0aW9ucyB0b1xuICAgICAqIGRyaXZlIGl0cyB2YWx1ZSB0byB0aGUgZ2l2ZW4gSlNPTi1saWtlIE9iamVjdC5cbiAgICAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBib29sZWFucywgbnVtYmVycywgc3RyaW5ncyxcbiAgICAgKiBTZXRzLCBvciBvYmplY3RzIGFyZSBpZ25vcmVkOyBvYmplY3RzIGJlc2lkZXMgU2V0c1xuICAgICAqIGFyZSBwcm9jZXNzZWQgcmVjdXJzaXZlbHkuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogSWYgbmV3VmFsdWUgY29tZXMgZnJvbSBhIEpzb25DcmR0J3MgLnZhbHVlIG9yIGdldEFzT2JqZWN0XG4gICAgICogbWV0aG9kcywgbm90ZSB0aGF0IHNldHMvYXJyYXlzIG9mIHN0cmluZ3MgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBtdWx0aS12YWx1ZSByZWdpc3RlcnMgd2lsbCBiZSB0cmVhdGVkIGFzIHNldHMsIG5vdFxuICAgICAqIHN0cmluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG5ld1ZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdG8uXG4gICAgICogQHBhcmFtIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XG4gICAgICogSWYgbmV3VmFsdWUgd2FzIGdlbmVyYXRlZCBieSBnZXRBc09iamVjdCwgdGhlIGtleUNvbmZsaWN0UnVsZVxuICAgICAqIHVzZWQgdG8gZ2VuZXJhdGUgaXQsIHNvIHRoYXQgd2UgY2FuIHVuZG8gdGhlIGVmZmVjdFxuICAgICAqIG9mIHRoYXQgcnVsZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiBrZXlzIGFuZCB2YWx1ZXMgYXJlIHVzZWQgbGl0ZXJhbGx5LFxuICAgICAqIHdpdGggaW5mZXJyZWQgdHlwZXMuXG4gICAgICogVGhpcyBpcyBhcHByb3ByaWF0ZSBmb3IgT2JqZWN0cyBub3QgY29taW5nIGZyb20gYSBKc29uQ3JkdCdzXG4gICAgICogZ2V0QXNPYmplY3QgZnVuY3Rpb24sIGluIHdoaWNoIHdlIHdhbnQgdG8ga2VlcCBrZXlzIGFzXG4gICAgICogdGhleSBhcmUuXG4gICAgICogLSBQcmVmaXhUeXBlczogVHlwZXMgYXJlIHRha2VuIGZyb20gcHJlZml4ZXMgb24ga2V5cy4gIElmIGFcbiAgICAgKiBrZXkgZG9lcyBub3QgaGF2ZSBhIHR5cGUgcHJlZml4LCBpdCBpcyBpZ25vcmVkLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogb2JqZWN0cyB3aXRoIGEgcHJvcGVydHkgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIgc2V0XG4gICAgICogdG8gdHJ1ZSBhcmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHJlc3VsdCBvZiBleHBhbmRpbmcgYVxuICAgICAqIGtleSBkdWUgdG8gYSBjb25mbGljdC4gIElmIHN1Y2ggYW4gb2JqZWN0IGRvZXMgbm90IGhhdmVcbiAgICAgKiB0aGUgZXhwZWN0ZWQgZm9ybWF0LCBhbnkgcHJvcGVydGllcyB3aXRoIHVucmVjb2duaXplZCBuYW1lc1xuICAgICAqIGFyZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHNldFRvT2JqZWN0KG5ld1ZhbHVlOiBPYmplY3QsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMubWVyZ2VPYmplY3RJbnRlcm5hbChuZXdWYWx1ZSwgbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gb3BlcmF0aW9ucyB0byBkcml2ZSB0aGlzIENyZHQncyB2YWx1ZSB0byB0aGVcbiAgICAgKiBnaXZlbiBKU09OLWxpa2UgT2JqZWN0J3Mgc3RhdGUsIGJ1dCB3aXRob3V0IHJlc2V0dGluZ1xuICAgICAqIHRoZSBjdXJyZW50IHZhbHVlLiAgVGhlIG1haW4gZWZmZWN0IG9mIHRoaXMgaXMgdG9cbiAgICAgKiBtZXJnZSBrZXlzOyBpbiBjYXNlIG9mIGtleSBjb25mbGljdHMsIHRoZSB2YWx1ZXMgYXJlIG1lcmdlZFxuICAgICAqIGluIGEgdHlwZS1zcGVjaWZpYyB3YXkgKFRPRE86IGRldGFpbHMpLlxuICAgICAqXG4gICAgICogTm90ZSB0aGlzIGlzIG5vdCBhIG1lcmdlIGluIHRoZSBzZW5zZSBvZiBhIHN0YXRlLWJhc2VkIENyZHQuXG4gICAgICogSW5zdGVhZCwgaXQgdGhlIENyZHQgdmVyc2lvbiBvZiBtZXJnaW5nIG9yZGluYXJ5IChub24tQ3JkdClcbiAgICAgKiBPYmplY3RzLCBieSByZWN1cnNpdmVseSBjb21iaW5pbmcgdGhlaXIga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogVE9ETzogZm9yIG5vdywgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgdG8gc2V0cy5cbiAgICAgKlxuICAgICAqIFNlZSB0aGUgZGVzY3JpcHRpb24gb2Ygc2V0VG9PYmplY3QgZm9yIGRpc2NsYWltZXJzIGFuZFxuICAgICAqIG90aGVyS2V5Q29uZmxpY3RSdWxlLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgY2hhbmdlcz9cbiAgICAgKiBAcGFyYW0gIG90aGVyIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBtZXJnZU9iamVjdChvdGhlcjogT2JqZWN0LCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5tZXJnZU9iamVjdEludGVybmFsKG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBtZXJnZU9iamVjdEludGVybmFsKG90aGVyOiBKc29uSW5kZXhUeXBlLCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShvdGhlcktleUNvbmZsaWN0UnVsZSk7XG5cbiAgICAgICAgLy8gRXh0cmFjdCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5IG9mIFtuYW1lLCB0eXBlLCB2YWx1ZV1cbiAgICAgICAgbGV0IHByb3BlcnRpZXM6IEFycmF5PFtzdHJpbmcsIHN0cmluZywgYW55XT4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gb3RoZXIpIHtcbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWUgPSBvdGhlcltwcm9wTmFtZV07XG4gICAgICAgICAgICBsZXQgdHlwZTogc3RyaW5nO1xuICAgICAgICAgICAgaWYgKG90aGVyS2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHByb3BOYW1lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgICAgICB0eXBlID0gcHJvcE5hbWUuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHByb3BOYW1lID0gcHJvcE5hbWUuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vIE11bHRpLXZhbHVlZCBzdHJpbmdzIGFyZSB0cmVhdGVkIGFzIHNldHNcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCB0eXBlLCBvdGhlcltwcm9wTmFtZV1dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGUgcHJvcGVydGllcyBtYXkgZ3JvdyBkdXJpbmcgZXhlY3V0aW9uIGR1ZSB0b1xuICAgICAgICAvLyB1bnBhY2tpbmcgZXhwYW5kZWQga2V5cy5cbiAgICAgICAgbGV0IG9yaWdpbmFsTGVuZ3RoID0gcHJvcGVydGllcy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByb3BOYW1lID0gcHJvcGVydGllc1tpXVswXTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gcHJvcGVydGllc1tpXVsxXTtcbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWUgPSBwcm9wZXJ0aWVzW2ldWzJdO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGFuIGV4cGFuZGVkIGtleVxuICAgICAgICAgICAgaWYgKG90aGVyS2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0ICYmXG4gICAgICAgICAgICAgICAgICAgIGkgPCBvcmlnaW5hbExlbmd0aCAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcHJvcFZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtcImpzb25DcmR0S2V5RXhwYW5kZWRcIl0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBVbnBhY2sgdGhlIG9iamVjdCBvbnRvIHRoZSBlbmQgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGV4cGFuZGVkTmFtZSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGFuZGVkTmFtZSAhPT0gXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChbcHJvcE5hbWUsIGV4cGFuZGVkTmFtZSwgcHJvcFZhbHVlW2V4cGFuZGVkTmFtZV1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHByb3BlcnR5LCBjaGVja2luZyB0aGF0IGl0J3MgdHlwZVxuICAgICAgICAgICAgICAgIC8vIGlzIG9uZSB3ZSBleHBlY3QuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdDogbWVyZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmluaXQocHJvcE5hbWUsIHt9KSBhcyBKc29uQ3JkdCkubWVyZ2VPYmplY3RJbnRlcm5hbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUsIG90aGVyS2V5Q29uZmxpY3RSdWxlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmc6IG92ZXJ3cml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUludGVybmFsKHByb3BOYW1lLCBwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwic2V0XCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0OiBhZGQgYWxsIHZhbHVlcyBpbiBzZXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldENyZHQgPSB0aGlzLmluaXQocHJvcE5hbWUsIG5ldyBTZXQoKSkgYXMgQWRkV2luc1NldDxhbnk+O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBwcm9wVmFsdWUpIHNldENyZHQuYWRkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBza2lwIHRoZSBlbnRyeSAobm90IGEgcmVjb2duaXplZCB0eXBlKS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGlzLmdldEFzT2JqZWN0KCkuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCk6IE9iamVjdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFzT2JqZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGlzLnNldEFzT2JqZWN0KG5ld1ZhbHVlKS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWU6IE9iamVjdCkge1xuICAgICAgICB0aGlzLnNldFRvT2JqZWN0KG5ld1ZhbHVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDcmR0LCBDcmR0SW50ZXJuYWwgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcbmltcG9ydCB7IFNlbWlkaXJlY3RTdGF0ZSwgU2VtaWRpcmVjdEludGVybmFsIH0gZnJvbSBcIi4vc2VtaWRpcmVjdFwiO1xuaW1wb3J0IHsgQ2F1c2FsVGltZXN0YW1wLCBDcmR0UnVudGltZSB9IGZyb20gXCIuLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCI7XG5cbi8vIFRPRE86IGhvdyB0byBkbyBnYXJiYWdlIGNvbGxlY3Rpb24gb2YgcmVzZXQtd2lucyBvcGVyYXRpb25zP1xuLy8gRS5nLiBmb3IgZmxhZ3MgaW4gYSBzZXQ6IGdhcmJhZ2UgY29sbGVjdGlvbiB3aWxsIGZhaWwgaWZcbi8vIHRoZXJlIGFyZSByZXNldC13aW5zIG9wcyBpbiB0aGUgaGlzdG9yeSwgYXMgaXQgc2hvdWxkLCBidXRcbi8vIHdlIHdvdWxkIGxpa2UgdG8gZ2FyYmFnZSBjb2xsZWN0IGFueXdheSBvbmNlIGFsbCB0aGUgcmVzZXQtd2luc1xuLy8gYXJlIGNhdXNhbGx5IHN0YWJsZS5cbmV4cG9ydCBjbGFzcyBSZXNldFdpbnNDb21wb25lbnQ8Uz4gaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8Uz4ge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHJlc2V0SW5pdGlhbERhdGE6IGFueSkgeyB9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogYW55KTogUyB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFMpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwicmVzZXRcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgYWx3YXlzIFwicmVzZXRcIi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogc3RyaW5nLCBfc3RhdGU6IFMsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIHN0cmluZ10ge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIHdlIHNob3VsZCByZXR1cm4gYSBjbG9uZSBvZiB0aGUgcmVzZXQgc3RhdGUsIG5vdFxuICAgICAgICAvLyBhIGZpeGVkIFwicmVzZXQgc3RhdGVcIiwgc2luY2UgdGhlIHJldHVybmVkIHN0YXRlIG1heVxuICAgICAgICAvLyBiZSBtdXRhdGVkIGxhdGVyLlxuICAgICAgICByZXR1cm4gW3RoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZSh0aGlzLnJlc2V0SW5pdGlhbERhdGEpLCBcInJlc2V0XCJdO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUbzxTPihvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSkgOiBTZW1pZGlyZWN0SW50ZXJuYWw8Uz4ge1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxTPihcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdCwgbmV3IFJlc2V0V2luc0NvbXBvbmVudChvcmlnaW5hbENyZHQsXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhKSxcbiAgICAgICAgICAgIChfbTIgOiBzdHJpbmcsIF9tMTogYW55KSA9PiBudWxsLFxuICAgICAgICAgICAgMSwgZmFsc2UsIGZhbHNlLCB0cnVlXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlc2V0V2luc0NyZHQ8Uz5cbiAgICAgICAgZXh0ZW5kcyBDcmR0PFNlbWlkaXJlY3RTdGF0ZTxTPj4ge1xuICAgIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHRJbnRlcm5hbFJlc2V0V2luczogQ3JkdEludGVybmFsPFM+O1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBvcmlnaW5hbENyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcmVzZXRJbml0aWFsRGF0YTogYW55LFxuICAgICAgICAgICAgcnVudGltZTogQ3JkdFJ1bnRpbWUsIGluaXRpYWxEYXRhPzogYW55KSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IFJlc2V0V2luc0NvbXBvbmVudC5hZGRUbyhcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhXG4gICAgICAgICk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsUmVzZXRXaW5zID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0U3Ryb25nKCkge1xuICAgICAgICBzdXBlci5hcHBseU9wKFsyLCBcInJlc2V0XCJdKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRTdHJvbmdNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gWzIsIFwicmVzZXRcIl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseU9wKG9wZXJhdGlvbjogYW55KSA6IGFueSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsxLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zIGluc3RlYWQgb2YgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBUcmFuc2xhdGVzIGludGVybmFsIChzZW1pZGlyZWN0IHByb2R1Y3QtYmFzZWQpIGRlc2NyaXB0aW9uc1xuICAgICAqIHNvIHRoYXQ6XG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYSByZXNldC13aW5zIG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0U3Ryb25nXCJdLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgaXQgY2hhbmdlZCB0aGUgc3RhdGUuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3BlcmF0aW9uIHRoYXQgZ2V0cyBraWxsZWQgYnlcbiAgICAgKiBhIGNvbmN1cnJlbnQgcmVzZXQtd2lucyBpcyBza2lwcGVkLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogb3BlcmF0aW9ucyBpcyB1bmNoYW5nZWQsIGV4Y2VwdCBmb3IgbnVsbCBkZXNjcmlwdGlvbnMsXG4gICAgICogd2hpY2ggYXJlIHNraXBwZWQuXG4gICAgICogVGhlbiByZXR1cm5zIHRoZSByZXN1bHQgb2YgcGFzc2luZyB0aGlzIGxpc3QgdG9cbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMsIG9yIG51bGwgaWYgYWxsXG4gICAgICogZGVzY3JpcHRpb25zIGFyZSBudWxsLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgZGVzYyBvZiBkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChkZXNjID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXdpbnMgZGVzY3JpcHRpb24gaXMgWzIsIFwicmVzZXRcIl1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDIgJiYgZGVzY1sxXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKFtcInJlc2V0U3Ryb25nXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsQ3JkdE9wZXJhdGlvbiBpcyBvZiB0aGUgZm9ybSBbMSwgZGVzY11cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzY1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVkLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKHRyYW5zbGF0ZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG5cbiAgICBnZXQgb3JpZ2luYWxTdGF0ZVJlc2V0V2lucygpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG59XG5cbi8vIFRPRE86IHJlbmFtZSBvcmlnaW5hbENyZHRJbnRlcm5hbCAoYWJvdmUpIGFuZCBvcmlnaW5hbENyZHRcbi8vIHRvIHJlZmxlY3QgcmVzZXQtd2lucyB2cyByZXNldCwgdG8gYXZvaWQgY29uZnVzaW9uLlxuXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZWRSZXNldENvbXBvbmVudDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9yaWdpbmFsQ3JkdDogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcmVzZXRJbml0aWFsRGF0YTogYW55KSB7IH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogUykge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBbXCJyZXNldFwiLCBsaXN0IG9mXG4gICAgICogdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieSBvcmlnaW5hbENyZHQgd2hlbiBwcm9jZXNzaW5nXG4gICAgICogdGhlIG1lc3NhZ2VzIGFwcGVhcmluZyBpbiBtZXNzYWdlIChpLmUuLCB0aGUgbWVzc2FnZXMgdGhhdFxuICAgICAqIGF2b2lkZWQgYmVpbmcgcmVzZXQgYmVjYXVzZSB0aGV5IHdlcmUgY29uY3VycmVudCB0byB0aGVcbiAgICAgKiByZXNldCBvcGVyYXRpb24pXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogQXJyYXk8W2FueSwgQ2F1c2FsVGltZXN0YW1wXT4sIF9zdGF0ZTogUyxcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgW3N0cmluZywgQXJyYXk8YW55Pl1dIHtcbiAgICAgICAgbGV0IHJlc2V0U3RhdGUgPSB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBjb25jdXJyZW50TWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5vcmlnaW5hbENyZHQuZWZmZWN0KGNvbmN1cnJlbnRNZXNzYWdlWzBdLFxuICAgICAgICAgICAgICAgIHJlc2V0U3RhdGUsIHJlcGxpY2FJZCwgY29uY3VycmVudE1lc3NhZ2VbMV0pO1xuICAgICAgICAgICAgcmVzZXRTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyZXNldFN0YXRlLCBbXCJyZXNldFwiLCBkZXNjcmlwdGlvbnNdXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkVG88Uz4ob3JpZ2luYWxDcmR0OiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICByZXNldEluaXRpYWxEYXRhOiBhbnksIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSA6IFNlbWlkaXJlY3RJbnRlcm5hbDxTPiB7XG4gICAgICAgIHJldHVybiBuZXcgU2VtaWRpcmVjdEludGVybmFsPFM+KFxuICAgICAgICAgICAgbmV3IE9ic2VydmVkUmVzZXRDb21wb25lbnQob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSxcbiAgICAgICAgICAgIG9yaWdpbmFsQ3JkdCxcbiAgICAgICAgICAgIChtMjogW2FueSwgQ2F1c2FsVGltZXN0YW1wXSwgbTE6IEFycmF5PFthbnksIENhdXNhbFRpbWVzdGFtcF0+KSA9PlxuICAgICAgICAgICAgICAgIHttMS5wdXNoKG0yKTsgcmV0dXJuIG0xfSxcbiAgICAgICAgICAgIDIsIHRydWUsIHRydWUsIGtlZXBPbmx5TWF4aW1hbFxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxTPlxuICAgICAgICBleHRlbmRzIERlZmF1bHRSZXNldFdpbnNDcmR0PFNlbWlkaXJlY3RTdGF0ZTxTPj4ge1xuICAgIHB1YmxpYyByZWFkb25seSBvcmlnaW5hbENyZHRJbnRlcm5hbDogQ3JkdEludGVybmFsPFM+O1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgb3JpZ2luYWxDcmR0SW50ZXJuYWw6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGE6IGFueSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IGFueSxcbiAgICAgICAgICAgIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IE9ic2VydmVkUmVzZXRDb21wb25lbnQuYWRkVG8oXG4gICAgICAgICAgICBvcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgICAgICAgIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbFxuICAgICAgICApO1xuICAgICAgICBzdXBlcihpZCwgY3JkdFdyYXBwZWQsIHJlc2V0SW5pdGlhbERhdGEsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCA9IG9yaWdpbmFsQ3JkdEludGVybmFsO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBvcCBpZiB3ZSdyZSBhbHJlYWR5IHJlc2V0IChva2F5IGdpdmVuXG4gICAgICAgIC8vIG9ic2VydmUtcmVzZXQgc2VtYW50aWNzKS5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKSkge1xuICAgICAgICAgICAgc3VwZXIuYXBwbHlPcChbMSwgXCJyZXNldFwiXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICAvLyBOb3RlIGhlcmUgd2UgaGF2ZSB0byBhY2NvdW50IGZvciB0aGUgcmVzZXQtd2lucyBsYXllclxuICAgICAgICAvLyAoaXQncyBub3Qgd3JhcHBlZCBhdXRvbWF0aWNhbGx5IGxpa2UgaW4gc3VwZXIuYXBwbHlPcHMpLlxuICAgICAgICByZXR1cm4gWzEsIFsxLCBbXV1dO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSBvcGVyYXRpb25zIGludGVuZGVkIGZvciB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAqIGJ5IHRyYW5zbGF0aW5nIHRoZW0gZm9yIHRoZSByZXNldHRhYmxlIENSRFQgYW5kIGNhbGxpbmdcbiAgICAgKiBzdXBlci5hcHBseU9wcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXBwbHlPcChvcGVyYXRpb246IGFueSkgOiBhbnkge1xuICAgICAgICByZXR1cm4gc3VwZXIuYXBwbHlPcChbMiwgb3BlcmF0aW9uXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YmNsYXNzZXMgdGhhdCB3YW50IHRvIHRyYW5zbGF0ZSBvcGVyYXRpb25zIGZyb21cbiAgICAgKiB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsIHNob3VsZCBvdmVycmlkZVxuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvYnNlcnZlZC1yZXNldCBvcGVyYXRpb24gaXNcbiAgICAgKiBbXCJyZXNldFwiLCBbVE9ETzogcmUtYXBwbGllZCBvcHNdXS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcmlnaW5hbENyZHRJbnRlcm5hbFxuICAgICAqIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucywgd2hpY2hcbiAgICAgKiBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUsIG9yIG51bGwgaWYgYWxsXG4gICAgICogZGVzY3JpcHRpb25zIGFyZSBudWxsLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgZGVzYyBvZiBkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChkZXNjID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXN0cm9uZyAoYWxyZWFkeSB0cmFuc2xhdGVkIGJ5IERlZmF1bHRSZXNldFdpbnNDcmR0KVxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb24gaXMgXCJyZXNldFN0cm9uZ1wiXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPYnNlcnZlZCByZXNldCBkZXNjcmlwdGlvbiBpcyBbMSwgW1wicmVzZXRcIixcbiAgICAgICAgICAgIC8vIGxpc3Qgb2YgcmUtYXBwbGllZCBvcHNdXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMSAmJiBkZXNjWzFdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbiB0aGUgc2Vjb25kIGVudHJ5LCBwdXQgdGhlIHRyYW5zbGF0ZWRcbiAgICAgICAgICAgICAgICAvLyBvcGVyYXRpb25zIHRoYXQgZGlkbid0IGdldCByZXNldC4gIEtlZXAgaW5cbiAgICAgICAgICAgICAgICAvLyBtaW5kIHRoYXQgdGhlc2Ugd2lsbCBiZSBkZXNjcmlwdGlvbnMgZnJvbSB0aGVcbiAgICAgICAgICAgICAgICAvLyBpbm5lcm1vc3Qgc2VtaWRpcmVjdCBwcm9kdWN0LiAgV2hhdCB0byBkb1xuICAgICAgICAgICAgICAgIC8vIGFib3V0IG9wZXJhdGlvbnMgdGhhdCB3ZXJlIG9yaWdpbmFsbHkgZ3JvdXBlZFxuICAgICAgICAgICAgICAgIC8vIGF0b21pY2FsbHksIHNpbmNlIHRyYW5zbGF0ZSBleHBlY3RzIHRob3NlXG4gICAgICAgICAgICAgICAgLy8gdG8gYmUgZGVsaXZlcmVkIHRvZ2V0aGVyP1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFwiLCBkZXNjWzFdWzFdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzIsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUodHJhbnNsYXRlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpbnN0ZWFkIG9mIHRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKiBTZWUgQ3JkdC50cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zOiBBcnJheTxhbnk+KTogYW55IHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG5cbiAgICBnZXQgb3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUoKTogUyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDYXVzYWxUaW1lc3RhbXAgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ3JkdEludGVybmFsIH0gZnJvbSBcIi4vY3JkdF9jb3JlXCI7XG5cbi8vIFRPRE86IGZ1dHVyZSBvcHRzOiBpbmRleGVkIG1lc3NhZ2VzOyBzZXR0aW5nIHRoZSBoaXN0b3J5XG4vLyB0byBhIHN1YnNldDsgY2F1c2FsIHN0YWJpbGl0eS5cbi8vIFRPRE86IGZvciB0aGlzIHRvIHdvcmssIHJlcGxpY2FJZCdzIG11c3QgYmUgY29tcGFyYWJsZSBhY2NvcmRpbmdcbi8vIHRvIHRoZSBzYW1lLWVxdWFscyBhcHByb2FjaC4gIFR5cGljYWxseSwgdGhpcyByZXF1aXJlcyB0aGVtXG4vLyB0byBiZSBwcmltaXRpdmUgdHlwZXMsIGFzIG9iamVjdHMgd2hpY2ggYXJlIGVxdWFsLXZhbHVlZCBidXQgaGF2ZVxuLy8gZGlmZmVyZW50IHBvaW50ZXJzIHdpbGwgYmUgY29uc2lkZXJlZCBkaWZmZXJlbnQuXG4vLyBUT0RPOiBtZW50aW9uIHRoYXQgdG8gZ2V0IGEgcHJvcGVyIENSRFQgKGVxdWFsIGludGVybmFsIHN0YXRlcyksXG4vLyB3ZSB0ZWNobmljYWxseSBtdXN0IGNvbXBhcmUgcmVjZWlwdCBvcmRlcnMgYXMgZXF1aXZhbGVudCBpZlxuLy8gdGhleSBhcmUgYm90aCBpbiBjYXVzYWwgb3JkZXIuXG5leHBvcnQgY2xhc3MgU2VtaWRpcmVjdFN0YXRlPFM+IHtcbiAgICBwcml2YXRlIHJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAvKipcbiAgICAgKiBNYXBzIGEgcmVwbGljYSBpZCB0byBhbiBhcnJheSBvZiBtZXNzYWdlcyBzZW50IGJ5IHRoYXRcbiAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIFNwZWNpZmljYWxseSwgYXJyYXkgZWxlbWVudHMgYXJlIHR1cGxlc1xuICAgICAqIFtwZXItc2VuZGVyIG1lc3NhZ2UgY291bnRlciwgdGhpcyByZXBsaWNhJ3MgcmVjZWlwdCBjb3VudGVyLFxuICAgICAqIG1lc3NhZ2VdLiAgS2VlcCBpbiBtaW5kIHRoYXQgcGVyLXNlbmRlciBtZXNzYWdlXG4gICAgICogY291bnRlcnMgbWF5IG5vdCBiZSBjb250aWd1b3VzLCBzaW5jZSB0aGV5IGFyZSBzaGFyZWQgYmV0d2VlblxuICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gQ3JkdFJ1bnRpbWUgYW5kIGJldHdlZW5cbiAgICAgKiBhIHNlbWlkaXJlY3QgcHJvZHVjdCBhbmQgaXRzIGNvbXBvbmVudHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaXN0b3J5OiBNYXA8YW55LCBBcnJheTxbbnVtYmVyLCBudW1iZXIsIGFueV0+PiA9IG5ldyBNYXAoKTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW50ZXJuYWxTdGF0ZTogUyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlUaW1lc3RhbXBzOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkOiBib29sZWFuKSB7IH1cbiAgICAvKipcbiAgICAgKiBBZGQgbWVzc2FnZSB0byB0aGUgaGlzdG9yeSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAuXG4gICAgICogcmVwbGljYUlkIGlzIG91ciByZXBsaWNhIGlkLlxuICAgICAqL1xuICAgIGFkZChyZXBsaWNhSWQ6IGFueSwgbWVzc2FnZTogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpO1xuICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW5kZXJIaXN0b3J5ID0gW107XG4gICAgICAgICAgICB0aGlzLmhpc3Rvcnkuc2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgc2VuZGVySGlzdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1lc3NhZ2VNYXliZVdpdGhUaW1lc3RhbXAgPSB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzP1xuICAgICAgICAgICAgICAgIFttZXNzYWdlLCB0aW1lc3RhbXBdOiBtZXNzYWdlO1xuICAgICAgICBzZW5kZXJIaXN0b3J5LnB1c2goW3RpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCksIHRoaXMucmVjZWlwdENvdW50ZXIsIG1lc3NhZ2VNYXliZVdpdGhUaW1lc3RhbXBdKTtcbiAgICAgICAgdGhpcy5yZWNlaXB0Q291bnRlcisrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aGUgZ2l2ZW5cbiAgICAgKiB0aW1lc3RhbXAsIGluIHNvbWUgY2F1c2FsIG9yZGVyIChzcGVjaWZpY2FsbHksIHRoaXMgcmVwbGljYSdzXG4gICAgICogcmVjZWlwdCBvcmRlcikuICBJZiB3ZSBhcmUgdGhlIHNlbmRlciAoaS5lLiwgcmVwbGljYUlkID09PVxuICAgICAqIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSksIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdGltZXN0YW1wIGlzXG4gICAgICogY2F1c2FsbHkgZ3JlYXRlciB0aGFuIGFsbCBwcmlvciBtZXNzYWdlcywgYXMgZGVzY3JpYmVkIGluXG4gICAgICogQ3JkdEludGVybmFsLmVmZmVjdCwgaGVuY2UgW10gaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgZ2V0Q29uY3VycmVudChyZXBsaWNhSWQ6IGFueSwgdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgdHJ1ZSxcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBzcGVjaWZpZWQgYWN0aW9ucyBvbiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3Rvcnk6XG4gICAgICogLSBpZiByZXR1cm5Db25jdXJyZW50IGlzIHRydWUsIHJldHVybnMgdGhlIGxpc3Qgb2ZcbiAgICAgKiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aW1lc3RhbXAsIGluXG4gICAgICogcmVjZWlwdCBvcmRlci5cbiAgICAgKiAtIGlmIGRpc2NhcmREb21pbmF0ZWQgaXMgdHJ1ZSwgZGVsZXRlcyBhbGwgbWVzc2FnZXMgZnJvbVxuICAgICAqIHRoZSBoaXN0b3J5IHdob3NlIHRpbWVzdGFtcHMgYXJlIGNhdXNhbGx5IGRvbWluYXRlZCBieVxuICAgICAqIG9yIGVxdWFsIHRvIHRoZSBnaXZlbiB0aW1lc3RhbXAuICAoTm90ZSB0aGF0IHRoaXMgbWVhbnMgdGhhdFxuICAgICAqIGlmIHdlIHdhbnQgdG8ga2VlcCBhIG1lc3NhZ2Ugd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wIGluXG4gICAgICogdGhlIGhpc3RvcnksIGl0IG11c3QgYmUgYWRkZWQgdG8gdGhlIGhpc3RvcnkgYWZ0ZXIgY2FsbGluZ1xuICAgICAqIHRoaXMgbWV0aG9kLilcbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkOiBhbnksXG4gICAgICAgICAgICB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudDogYm9vbGVhbixcbiAgICAgICAgICAgIGRpc2NhcmREb21pbmF0ZWQ6IGJvb2xlYW4pOiBBcnJheTxhbnk+IHtcbiAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcncyBjb25jdXJyZW50LCBzbyBjbGVhciBldmVyeXRoaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5LmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2F0aGVyIHVwIHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzLiAgVGhlc2UgYXJlIGFsbFxuICAgICAgICAvLyBtZXNzYWdlcyBieSBlYWNoIHJlcGxpY2FJZCB3aXRoIHNlbmRlciBjb3VudGVyXG4gICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpLmdldChyZXBsaWNhSWQpLlxuICAgICAgICBsZXQgY29uY3VycmVudDogQXJyYXk8W251bWJlciwgbnVtYmVyLCBhbnldPiA9IFtdO1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB2Yy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldChlbnRyeVswXSk7XG4gICAgICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnRJbmRleFN0YXJ0ID1cbiAgICAgICAgICAgICAgICAgICAgU2VtaWRpcmVjdFN0YXRlLmluZGV4QWZ0ZXIoc2VuZGVySGlzdG9yeSwgZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb25jdXJyZW50SW5kZXhTdGFydDsgaSA8IHNlbmRlckhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmN1cnJlbnQucHVzaChzZW5kZXJIaXN0b3J5W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIG1lc3NhZ2VzIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLy8gPj0gY29uY3VycmVudEluZGV4U3RhcnRcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVySGlzdG9yeS5zcGxpY2UoMCwgY29uY3VycmVudEluZGV4U3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxldGUgaXQgZnJvbSB0aGUgbWFwIGlmIGVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBhIGZvcm0gb2YgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsc28gbWFrZXMgaXNIaXN0b3J5RW1wdHkgc2ltcGxlci5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNvcnQgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMgaW4gcmVjZWlwdCBvcmRlciAoaS5lLixcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBzZWNvbmQgZW50cnkgaW4gZWFjaCB0cmlwbGUpLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYVsxXSAtIGJbMV0pKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQubWFwKGEgPT4gYVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBtZXNzYWdlcyBzdG9yZWQgaW4gdGhlIGhpc3RvcnksXG4gICAgICogaS5lLiwgZWl0aGVyIHRoZXJlIGhhdmUgYmVlbiBubyBjcmQxIG1lc3NhZ2VzLCBvclxuICAgICAqIG91ciBTZW1pZGlyZWN0SW50ZXJuYWwncyBoaXN0b3J5S2VlcE9ubHlDb25jdXJyZW50IGZsYWcgaXMgdHJ1ZVxuICAgICAqIGFuZCBhbGwgY3JkdDEgbWVzc2FnZXMgaGF2ZSBiZWVuIGNhdXNhbGx5IGxlc3MgdGhhbiBhIGNyZHQyXG4gICAgICogbWVzc2FnZS5cbiAgICAgKi9cbiAgICBpc0hpc3RvcnlFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5oaXN0b3J5LnZhbHVlcygpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoICE9PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIHdvcmtpbmcgd2l0aCB0aGUgcGVyLXNlbmRlciBoaXN0b3J5XG4gICAgICogYXJyYXlzLiAgUmV0dXJucyB0aGUgaW5kZXggYWZ0ZXIgdGhlIGxhc3QgZW50cnkgd2hvc2VcbiAgICAgKiBwZXItc2VuZGVyIGNvdW50ZXIgKHRoZSBmaXJzdCB0dXBsZSBlbGVtZW50KSBpcyA8PVxuICAgICAqIHZhbHVlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGluZGV4QWZ0ZXIoc3BhcnNlQXJyYXk6IEFycmF5PFtudW1iZXIsIG51bWJlciwgYW55XT4sXG4gICAgICAgICAgICB2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy8gVE9ETzogYmluYXJ5IHNlYXJjaCB3aGVuIHNwYXJzZUFycmF5IGlzIGxhcmdlXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGVyZSBtYXkgYmUgZHVwbGljYXRlIHRpbWVzdGFtcHMuXG4gICAgICAgIC8vIFNvIGl0IHdvdWxkIGJlIGluYXBwcm9wcmlhdGUgdG8gZmluZCBhbiBlbnRyeSB3aG9zZVxuICAgICAgICAvLyBwZXItc2VuZGVyIGNvdW50ZXIgZXF1YWxzIHZhbHVlIGFuZCBpbmZlciB0aGF0XG4gICAgICAgIC8vIHRoZSBkZXNpcmVkIGluZGV4IGlzIDEgZ3JlYXRlci5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGFyc2VBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNwYXJzZUFycmF5W2ldWzBdID4gdmFsdWUpIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2VtaWRpcmVjdEludGVybmFsPFM+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPFNlbWlkaXJlY3RTdGF0ZTxTPj4ge1xuICAgIC8qKlxuICAgICAqIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRpbmcgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBvZlxuICAgICAqIGNyZHQxIGFuZCBjcmR0MiB3aXRoIHRoZSBnaXZlbiBhY3Rpb24sIHdoaWNoIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAobTI6IGNyZHQyIG1lc3NhZ2UsIG0xOiBjcmR0MSBtZXNzYWdlKTogY3JkdDEgbWVzc2FnZS5cbiAgICAgKiBjcmR0MSwgY3JkdDIsIGFuZCBhY3Rpb24gbXVzdCBzYXRpc2Z5IHRoZSBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICAgKiBhc3N1bXB0aW9ucyBmcm9tIG91ciBwYXBlci5cbiAgICAgKlxuICAgICAqIFRPRE86IG9wdGlvbnMgYW5kIHRoZWlyIHRoZW9yZXRpY2FsIHNpZ25pZmljYW5jZS4gIEZvcm1hbGx5LFxuICAgICAqIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSBtZWFucyB0aGF0IHRpbWVzdGFtcHMgYmVjb21lXG4gICAgICogcGFydCBvZiB0aGUgY3JkdDIgbWVzc2FnZXMuICBBbHNvIGNyZWF0ZUNyZHRJbmRleC5cbiAgICAgKiBEb21pbmF0ZWQgc3RhdHMgY29udHJvbCB3aGV0aGVyIHlvdSBkaXNjYXJkIG1lc3NhZ2VzIGluIHRoZVxuICAgICAqIGhpc3RvcnkgdGhhdCBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGNyZHQxL2NyZHQyIG1lc3NhZ2VzO1xuICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoYXQgYWN0aW9uIGlzIHRoZSBzYW1lIHdpdGggdGhvc2UgbWVzc2FnZXNcbiAgICAgKiBkaXNjYXJkZWQuICBJZiBkb21pbmF0ZWQxIGlzIHNldCwgdGhlbiBzdGF0ZS5pc0hpc3RvcnlFbXB0eSgpXG4gICAgICogYmVjb21lcyAodGhlcmUgZXhpc3RzIGEgY3JkdDIgbWVzc2FnZSBub3QgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGFcbiAgICAgKiBjcmR0MSBtZXNzYWdlKS4gIENoZWNrIHRoaXMgaXMgc3RpbGwgdHJ1ZSBpZiBkb21pbmF0ZWQyIGlzIHNldC4pXG4gICAgICogRXhwbGFpbiBleGFtcGxlcyB3aGVyZSB0aGlzIGlzIHVzZWQgKHJlc2V0dGFibGUsIGZsYWdzKTsgaXQnc1xuICAgICAqIG5vdCBxdWl0ZSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHNwaXJpdCB1bmxlc3MgeW91IHRoaW5rXG4gICAgICogb2YgaXQgYXMgdXNpbmcgdGhlIGhpc3RvcnkgYXMgcGFydCBvZiB0aGUgY3JkdDEvMiBzdGF0ZS5cbiAgICAgKiBQb3RlbnRpYWwgb3B0aW1pemF0aW9uOiBvbmx5IGRlbGV0ZSBkb21pbmF0ZWQgbWVzc2FnZXMgd2hlblxuICAgICAqIHJlY2VpdmluZyBvdXIgb3duIG1lc3NhZ2UgKGl0J3MgYmFzaWNhbGx5IGZyZWUgYW5kIGFsd2F5c1xuICAgICAqIGNsZWFycyB0aGUgaGlzdG9yeSksIG9yIG9ubHkgc29tZXRpbWVzICh3aWxsIG1pc3Mgc29tZVxuICAgICAqIG1lc3NhZ2VzLCBzbyBuZWVkIHRvIGVuc3VyZSBjb3JyZWN0bmVzcyBpbiB0aGF0IGNhc2VcbiAgICAgKiAoSSB0aGluayBpdCBpcyBva2F5IGZvciBkb21pbmF0ZWQyIGJ1dCBub3QgZG9taW5hdGVkMSBpbiBvdXJcbiAgICAgKiB0YXJnZXQgdXNlIGNhc2VzKSwgYnV0XG4gICAgICogc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IGR1ZSB0byBiYXRjaGluZyBhbmQgc3RpbGwga2lsbFxuICAgICAqIG9mZiBtb3N0IG1lc3NhZ2VzKS4gIFRoaXMgdHJhZGVzIGEgc21hbGwgaW5jcmVhc2UgaW4gc3BhY2VcbiAgICAgKiB1c2FnZSBmb3IgYSBkZWNyZWFzZSBpbiBDUFUgdGltZS5cbiAgICAgKlxuICAgICAqIEFzIGRlc2NyaWJlZCBpbiBDcmR0SW50ZXJuYWwgYW5kIENyZHQsIG51bGwgbWVzc2FnZXMgYXJlIHRyZWF0ZWRcbiAgICAgKiBhcyB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gaWQsIGFsbG93aW5nIHRoZW0gdG8gYmUgb3B0aW1pemVkIGF3YXkuXG4gICAgICogQmVjYXVzZSBvZiB0aGlzLCBhY3Rpb24gd2lsbCBuZXZlciBiZSBjYWxsZWQgd2l0aCBudWxsIGFzXG4gICAgICogZWl0aGVyIGlucHV0LiAgSW5zdGVhZCwgd2UgYmVoYXZlIGFzIGlmXG4gICAgICogKGFjdGlvbihpZCAoaS5lLiwgbnVsbCksIG0xKSA9IG0xKVxuICAgICAqIGZvciBhbGwgbTEgYW5kIChhY3Rpb24obTIsIGlkKSA9IGlkKSBmb3IgYWxsIG0yLiAgVGhlIHNlbWlkaXJlY3RcbiAgICAgKiBwcm9kdWN0IGFzc3VtcHRpb25zIG11c3QgaG9sZCBnaXZlbiB0aGVzZSBhc3NpZ25tZW50cy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY3JkdDE6IENyZHRJbnRlcm5hbDxTPixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZHQyOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBhY3Rpb246IChtMjogYW55LCBtMTogYW55KSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBjcmVhdGVDcmR0SW5kZXg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoY3JlYXRlQ3JkdEluZGV4ICE9PSAxICYmIGNyZWF0ZUNyZHRJbmRleCAhPT0gMikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVDcmR0SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFNlbWlkaXJlY3RTdGF0ZTxTPiB7XG4gICAgICAgIGxldCBpbnRlcm5hbFN0YXRlOiBTO1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpIGludGVybmFsU3RhdGUgPSB0aGlzLmNyZHQxLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0U3RhdGUoaW50ZXJuYWxTdGF0ZSxcbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkLFxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBUT0RPIChnZW5lcmFsKTogZXJyb3IgY2hlY2tpbmdcbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogW251bWJlciwgYW55XSwgc3RhdGU6IFNlbWlkaXJlY3RTdGF0ZTxTPixcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55KTogW251bWJlciwgYW55XSB8IG51bGwge1xuICAgICAgICBpZiAob3BlcmF0aW9uWzBdID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgb3AxID0gdGhpcy5jcmR0MS5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgIGlmIChvcDEgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gWzEsIG9wMV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgb3AyID0gdGhpcy5jcmR0Mi5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgIGlmIChvcDIgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gWzIsIG9wMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS4gIEZvciB0aGlzLmNyZHQxXG4gICAgICogbWVzc2FnZXMsIHRoZSBkZXNjcmlwdGlvbiBpcyBmb3IgdGhlIGFjdGVkLW9uIG1lc3NhZ2UgdGhhdFxuICAgICAqIGlzIGFjdHVhbGx5IGFwcGxpZWQgdG8gdGhpcy5pbnRlcm5hbFN0YXRlLCBub3QgdGhlIGlucHV0XG4gICAgICogbWVzc2FnZS4gIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwgKG9yIGlmIHRoZSBtZXNzYWdlIGdldHMgYWN0ZWQgb24gdG8gYmVjb21lIG51bGwpLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogW251bWJlciwgYW55XSwgc3RhdGU6IFNlbWlkaXJlY3RTdGF0ZTxTPiwgcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1NlbWlkaXJlY3RTdGF0ZTxTPiwgW251bWJlciwgYW55XSB8IG51bGxdIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VbMF0gPT09IDIpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHQyLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcm5hbFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgc3RhdGUuYWRkKHJlcGxpY2FJZCwgbWVzc2FnZVsxXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gW3N0YXRlLCBbMiwgcmVzdWx0WzFdXV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY29uY3VycmVudCA9IHN0YXRlLmdldENvbmN1cnJlbnQocmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgbGV0IG1BY3QgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbUFjdCA9IHRoaXMuYWN0aW9uKGNvbmN1cnJlbnRbaV0sIG1BY3QpO1xuICAgICAgICAgICAgICAgIGlmIChtQWN0ID09PSBudWxsKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHQxLmVmZmVjdChtQWN0LCBzdGF0ZS5pbnRlcm5hbFN0YXRlLFxuICAgICAgICAgICAgICAgIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIFtzdGF0ZSwgWzEsIHJlc3VsdFsxXV1dO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEaXJlY3RJbnRlcm5hbDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgLyoqXG4gICAgICogRGlyZWN0IHByb2R1Y3Qgb2YgQ3JkdEludGVybmFsJ3MuICBUaGlzIGlzIHRoZVxuICAgICAqIHNwZWNpYWwgY2FzZSBvZiBTZW1pZGlyZWN0SW50ZXJuYWwgd2hlbiB0aGUgYWN0aW9uIGlzIHRyaXZpYWxcbiAgICAgKiAoKG1fMiwgbTEpID0+IG0xKS4gIEluIHRoaXMgY2FzZSB3ZSBjYW4gb3B0aW1pemVcbiAgICAgKiBieSBub3Qga2VlcGluZyB0aGUgaGlzdG9yeSBvciBhY3Rpbmcgb24gbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBGb3IgdGhpcyB0byBiZSBhIENyZHQsIGNvbmN1cnJlbnQgbWVzc2FnZXMgb2YgdGhlIHR3byBpbnB1dFxuICAgICAqIENyZHRzIG11c3QgY29tbXV0ZS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBjb25zdHJ1Y3Rpb24gaXMgc3ltbWV0cmljIChzd2l0Y2hpbmcgY3JkdDEgYW5kXG4gICAgICogY3JkdDIgZG9lc24ndCBjaGFuZ2UgdGhlIHNlbWFudGljcyksIGV4Y2VwdCBmb3Igc3dhcHBpbmdcbiAgICAgKiB0aGUgbWVhbmluZyBvZiB0aGUgbnVtYmVycyAxLzIgaW4gY3JlYXRlQ3JkdEluZGV4IGFuZFxuICAgICAqIGluIHRoZSBmaXJzdCBjb29yZGluYXRlcyBvZiBtZXNzYWdlcyBhbmQgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmVhdGVDcmR0SW5kZXggV2hpY2ggY3JkdCdzIGNyZWF0ZSBtZXRob2QgdG8gdXNlXG4gICAgICogaW4gY3JlYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjcmR0MTogQ3JkdEludGVybmFsPFM+LFxuICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNyZHQyOiBDcmR0SW50ZXJuYWw8Uz4sXG4gICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY3JlYXRlQ3JkdEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGNyZWF0ZUNyZHRJbmRleCAhPT0gMSAmJiBjcmVhdGVDcmR0SW5kZXggIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IGFueSk6IFMge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpIHJldHVybiB0aGlzLmNyZHQxLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogUyxcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55KTogW251bWJlciwgYW55XSB8IG51bGwge1xuICAgICAgICBsZXQgbWVzc2FnZTogYW55O1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQxLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5jcmR0Mi5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmR0IG51bWJlciBpbiBvcGVyYXRpb246IFwiICsgb3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZSByZXR1cm4gW29wZXJhdGlvblswXSwgbWVzc2FnZV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UvZGVzY3JwdGlvbiBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBtZXNzYWdlIGZvci9kZXNjcmlwdGlvbiBmcm9tIHRoYXQgY3JkdF0uXG4gICAgICogQW4gZXhjZXB0aW9uIGlzIGlmIHRoZSBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbFxuICAgICAqIGNyZHQgaXMgbnVsbCxcbiAgICAgKiB0aGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMganVzdCBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS5cbiAgICAgKiBUaGlzIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IGNhbGxpbmcgb25jaGFuZ2UuXG4gICAgICogVE9ETzogcGVyaGFwcyBhZGQgdHJhbnNsYXRpbmcgZGVzY3JpcHRpb25zIHRvIHRoaXMgY2xhc3MsIHNvXG4gICAgICogdGhlIENyZHQgZG9lc24ndCBoYXZlIHRvIHVuZGVyc3RhbmQgYWxsIG9mIHRoZSBsYXllcnMgYXRcbiAgICAgKiBvbmNlP1xuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbbnVtYmVyLCBhbnldLCBzdGF0ZTogUywgcmVwbGljYUlkOiBhbnksIHRpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1MsIFtudW1iZXIsIGFueV0gfCBudWxsXSB7XG4gICAgICAgIGxldCByZXN1bHQ6IFtTLCBhbnldO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNyZHQxLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDIuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmR0IG51bWJlciBpbiBtZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpIHJldHVybiBbcmVzdWx0WzBdLCBudWxsXTtcbiAgICAgICAgZWxzZSByZXR1cm4gW3Jlc3VsdFswXSwgW21lc3NhZ2VbMF0sIHJlc3VsdFsxXV1dO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENyZHRSdW50aW1lLCBDYXVzYWxUaW1lc3RhbXAgfSBmcm9tIFwiLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgRGVmYXVsdFJlc2V0dGFibGVDcmR0IH0gZnJvbSBcIi4vcmVzZXR0YWJsZVwiO1xuaW1wb3J0IHsgQ291bnRlckludGVybmFsLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbCB9IGZyb20gXCIuL2Jhc2ljX2NyZHRzXCI7XG5pbXBvcnQgeyBDcmR0LCBDcmR0SW50ZXJuYWwgfSBmcm9tIFwiLi9jcmR0X2NvcmVcIjtcbmltcG9ydCB7IFNlbWlkaXJlY3RTdGF0ZSwgU2VtaWRpcmVjdEludGVybmFsLCBEaXJlY3RJbnRlcm5hbCB9IGZyb20gXCIuL3NlbWlkaXJlY3RcIjtcblxuZXhwb3J0IGNsYXNzIFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCBleHRlbmRzIENyZHQ8U2VtaWRpcmVjdFN0YXRlPG51bWJlcj4+IHtcbiAgICAvLyBzZW1pZGlyZWN0SW5zdGFuY2UgY29tcGxldGVseSBkZXNjcmliZXMgdGhpcyBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICBzdGF0aWMgc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxudW1iZXI+KFxuICAgICAgICBDb3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLFxuICAgICAgICAobTI6IG51bWJlciwgbTE6IG51bWJlcikgPT4gbTIqbTEsIDFcbiAgICApO1xuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lLCBpbml0aWFsRGF0YT86IGFueSkge1xuICAgICAgICBzdXBlcihpZCwgSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsbl0pO1xuICAgIH1cbiAgICBtdWx0KG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPik6IFtzdHJpbmcsIG51bWJlcl0ge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2UgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludFJlZ2lzdGVyQ3JkdCBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxTZW1pZGlyZWN0U3RhdGU8bnVtYmVyPj4ge1xuICAgIHN0YXRpYyBzZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgU2VtaWRpcmVjdEludGVybmFsPG51bWJlcj4oXG4gICAgICAgIENvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsXG4gICAgICAgIChtMjogbnVtYmVyLCBtMTogbnVtYmVyKSA9PiBtMiptMSwgMVxuICAgICk7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU6IG51bWJlciA9IDAsIHJlc2V0VmFsdWU6IG51bWJlciA9IDApIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJlc2V0VmFsdWUsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgbl0pO1xuICAgIH1cbiAgICBtdWx0KG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIG5dKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tYWRkLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnM6IEFycmF5PFtudW1iZXIgfCBzdHJpbmcsIG51bWJlcl0+KTogW3N0cmluZywgbnVtYmVyXSB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAvLyBUcmFuc2FjdGlvbiBkdWUgdG8gc2V0IHZhbHVlLCByZXR1cm4gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICAgICAgICAgICAgcmV0dXJuIFtcInNldFwiLCBkZXNjcmlwdGlvbnNbMV1bMV1dO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSByZXR1cm4gW2Rlc2NyaXB0aW9uWzBdIGFzIHN0cmluZywgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9zaXRpdmVNb2QoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgICBpZiAoYSA+PSAwKSByZXR1cm4gYSAlIGI7XG4gICAgZWxzZSByZXR1cm4gYiAtICgoLWEpICUgYik7XG59XG5cbmNsYXNzIE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPFtudW1iZXIsIGJvb2xlYW5dPiB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhPzogW251bWJlciwgYm9vbGVhbl0pOiBbbnVtYmVyLCBib29sZWFuXSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gWzAsIGZhbHNlXTtcbiAgICAgICAgZWxzZSByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSkge1xuICAgICAgICByZXR1cm4gcG9zaXRpdmVNb2Qob3BlcmF0aW9uLCAyKk1hdGguUEkpO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1tudW1iZXIsIGJvb2xlYW5dLCBudW1iZXJdIHtcbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2Qoc3RhdGVbMF0gKyBtZXNzYWdlLCAyKk1hdGguUEkpLCBzdGF0ZVsxXV0sIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwoKTtcbn1cblxuY2xhc3MgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxbbnVtYmVyLCBib29sZWFuXT4ge1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGE/OiBbbnVtYmVyLCBib29sZWFuXSk6IFtudW1iZXIsIGJvb2xlYW5dIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbjogc3RyaW5nLCBfc3RhdGU6IFtudW1iZXIsIGJvb2xlYW5dLCBfcmVwbGljYUlkOiBhbnkpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZWZsZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgb3BlcmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIFwicmVmbGVjdFwiO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZTogc3RyaW5nLCBzdGF0ZTogW251bWJlciwgYm9vbGVhbl0sIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW1tudW1iZXIsIGJvb2xlYW5dLCBzdHJpbmddIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVmbGVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgLy8gUmVmbGVjdGlvbiBvcGVyYXRpb24gaXMgbXVsdGlwbHlpbmcgb24gdGhlIGxlZnQsXG4gICAgICAgIC8vIHNvIHRvIHB1dCBpdCBpbiBjYW5vbmljYWwgZm9ybSAoZzEsIGcyKSwgd2UgaGF2ZSB0b1xuICAgICAgICAvLyBjb21tdXRlIGl0IHdpdGggdGhlIGN1cnJlbnQgZzEgKHJvdGF0aW9uKSB2YWx1ZSBieVxuICAgICAgICAvLyBhY3Rpbmcgb24gaXQuXG4gICAgICAgIHJldHVybiBbW3Bvc2l0aXZlTW9kKC1zdGF0ZVswXSwgMipNYXRoLlBJKSwgIXN0YXRlWzFdXSwgXCJyZWZsZWN0XCJdO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIENyZHQgZm9yIHRoZSAyLWRpbWVuc2lvbmFsIG9ydGhvZ29uYWwgZ3JvdXAsIHdoaWNoIGFsbG93c1xuICogcm90YXRpb25zIGFuZCByZWZsZWN0aW9ucyAoYWJvdXQgdGhlIG9yaWdpbikgb2YgYW4gb2JqZWN0IGluIHRoZVxuICogcGxhbmUuICBFeGFtcGxlIHVzYWdlOiByb3RhdGluZyBhbmQgcmVmbGVjdGluZyBvYmplY3RzIGluXG4gKiBQb3dlcnBvaW50LlxuICpcbiAqIFN0YXRlIGlzIHN0b3JlZCBhcyB0aGUgY2Fub25pY2FsIGVsZW1lbnQgb2YgdGhlIHNlbWlkaXJlY3RcbiAqIHByb2R1Y3QgZ3JvdXAsIGkuZS4sIGluIHRoZSBmb3JtIChnMSwgZzIpIGZvciBnMSBpbiB0aGUgcm90YXRpb25cbiAqIGdyb3VwIChyZWFscyBtb2QgMnBpKSBhbmQgZzIgaW4gdGhlIHJlZmxlY3Rpb24gZ3JvdXAgKGJvb2xlYW5zXG4gKiB3aXRoIHRydWUgZm9yIDEgYW5kIGZhbHNlIGZvciAwKS5cbiAqL1xuZXhwb3J0IGNsYXNzIE9ydGhvZ29uYWxDcmR0IGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PFNlbWlkaXJlY3RTdGF0ZTxbbnVtYmVyLCBib29sZWFuXT4+IHtcbiAgICBzdGF0aWMgc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IFNlbWlkaXJlY3RJbnRlcm5hbDxbbnVtYmVyLCBib29sZWFuXT4oXG4gICAgICAgIE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsLmluc3RhbmNlLCBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsLmluc3RhbmNlLFxuICAgICAgICAoX20yOiBzdHJpbmcsIG0xOiBudW1iZXIpID0+IC1tMSwgMVxuICAgICk7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICBpbml0aWFsVmFsdWU6IFtudW1iZXIsIGJvb2xlYW5dID0gWzAsIGZhbHNlXSxcbiAgICAgICAgICAgIHJlc2V0VmFsdWU6IFtudW1iZXIsIGJvb2xlYW5dID0gWzAsIGZhbHNlXSkge1xuICAgICAgICBzdXBlcihpZCwgT3J0aG9nb25hbENyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbmdsZSBpcyBpbiByYWRpYW5zIENDVy5cbiAgICAgKi9cbiAgICByb3RhdGUoYW5nbGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIGFuZ2xlXSk7XG4gICAgfVxuICAgIHJlZmxlY3RIb3Jpem9udGFsQXhpcygpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBcInJlZmxlY3RcIl0pO1xuICAgIH1cbiAgICByZWZsZWN0VmVydGljYWxBeGlzKCkge1xuICAgICAgICB0aGlzLnJlZmxlY3QoTWF0aC5QSS8yKTtcbiAgICB9XG4gICAgcmVmbGVjdChhbmdsZUF4aXM6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoLWFuZ2xlQXhpcyk7XG4gICAgICAgIHRoaXMucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgICAgIHRoaXMucm90YXRlKGFuZ2xlQXhpcyk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RhdGUgaXMgZ2l2ZW4gYnk6IHJlZmxlY3QgYWNyb3NzIHRoZSB4LWF4aXNcbiAgICAgKiBpZiByZWZsZWN0ZWQgaXMgdHJ1ZSwgdGhlbiByb3RhdGUgYnkgYW5nbGUgKENDVywgaW4gcmFkaWFucykuXG4gICAgICovXG4gICAgIGdldCByZWZsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlWzFdO1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAgKiBpZiByZWZsZWN0ZWQgaXMgdHJ1ZSwgdGhlbiByb3RhdGUgYnkgYW5nbGUgKENDVywgaW4gcmFkaWFucykuXG4gICAgICAqL1xuICAgICBnZXQgYW5nbGUoKTogbnVtYmVyIHtcbiAgICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMF07XG4gICAgIH1cbiAgICAgLyoqXG4gICAgICAqIFtyZWZsZWN0ZWQsIGFuZ2xlXVxuICAgICAgKi9cbiAgICAgZ2V0IHZhbHVlKCk6IFtudW1iZXIsIGJvb2xlYW5dIHtcbiAgICAgICAgIHJldHVybiBbdGhpcy5hbmdsZSwgdGhpcy5yZWZsZWN0ZWRdO1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tc2V0LlxuICAgICAgKi9cbiAgICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBbbnVtYmVyLCBib29sZWFuXSkge1xuICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICB0aGlzLnJvdGF0ZShuZXdWYWx1ZVswXSk7XG4gICAgICAgICBpZiAobmV3VmFsdWVbMV0pIHRoaXMucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgIH1cbiAgICAgLy8gVE9ETzogbWF0cml4IHZlcnNpb25zIG9mIGdldCBhbmQgc2V0LlxuICAgICAvLyAvKipcbiAgICAgLy8gICogQHJldHVybiBUaGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbiBhcyBhIDJ4MiBvcnRob2dvbmFsXG4gICAgIC8vICAqIG1hdHJpeC5cbiAgICAgLy8gICovXG4gICAgIC8vIGdldCBtYXRyaXgoKTogW1tudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl1dIHtcbiAgICAgLy9cbiAgICAgLy8gfVxuXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoX2Rlc2NyaXB0aW9uczogQXJyYXk8W251bWJlciB8IHN0cmluZywgbnVtYmVyXT4pIHtcbiAgICAgICAgLy8gVE9ETy4gIEp1c3QgcmV0dXJucyB0aGUgcmVzdWx0aW5nIHN0YXRlIGZvciBub3cuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAvLyAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgLy8gICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgcmV0dXJuIFtkZXNjcmlwdGlvblswXSBhcyBzdHJpbmcsIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5cbi8qKlxuICogQ3JkdEludGVybmFsIHdoaWNoIHVzZXMgYW55IHN0cmluZyBhcyBhbiBvcGVyYXRpb24vbWVzc2FnZVxuICogd2hpY2ggZG9lcyBub3RoaW5nLiAgVW5saWtlIHVzaW5nIG51bGwgbWVzc2FnZXMgdG8gaW5kaWNhdGUgdGhhdFxuICogbm90aGluZyBoYXBwZW5lZCwgdGhlIG5vb3AgbWVzc2FnZSBpcyBhbiBleHBsaWNpdCBub24tbnVsbFxuICogc3RyaW5nIHN1cHBsaWVkIGFzIHRoZSBvcGVyYXRpb24uXG4gKlxuICogVHdvIHVzZSBjYXNlczpcbiAqIC0gVG8gdW5yZXNldCBhIHN0YXRlIChlLmcuIGluIEVuYWJsZVdpbnNGbGFnIGJlbG93KS5cbiAqIC0gQXMgYSBcImhlYWRlclwiIGZvciBzZXF1ZW5jZSBvZiBvcGVyYXRpb25zIHBhc3NlZCB0byBhcHBseU9wcyxcbiAqIHNvIHRoYXQgcmVjaXBpZW50cyBjYW4ga25vdyB3aGF0IGVuZC11c2VyIG9wZXJhdGlvbiB0aGUgc2VxdWVuY2VcbiAqIGNvcnJlc3BvbmRzIHRvLlxuICovXG5leHBvcnQgY2xhc3MgTm9PcENyZHRJbnRlcm5hbDxTPiBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxTPiB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGNyZWF0ZUZ1bmM/OiAoaW5pdGlhbERhdGE6IGFueSkgPT4gUykge31cbiAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBhbnkpOiBTIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlRnVuYykgcmV0dXJuIHRoaXMuY3JlYXRlRnVuYyhpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiQ3JlYXRlRnVuYyBub3Qgc3VwcGxpZWRcIik7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uOiBzdHJpbmcsIF9zdGF0ZTogUykge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgdGhlIG9yaWdpbmFsIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZTogc3RyaW5nLCBzdGF0ZTogUywgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbUywgc3RyaW5nXSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGRUbzxTPihvcmlnaW5hbENyZHQ6IENyZHRJbnRlcm5hbDxTPikge1xuICAgICAgICByZXR1cm4gbmV3IERpcmVjdEludGVybmFsPFM+KG9yaWdpbmFsQ3JkdCxcbiAgICAgICAgICAgIG5ldyBOb09wQ3JkdEludGVybmFsPFM+KCksIDFcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbmFibGVXaW5zRmxhZyBleHRlbmRzIERlZmF1bHRSZXNldHRhYmxlQ3JkdDxudWxsPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLFxuICAgICAgICAgICAgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJlXCIpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGRpc2FibGVTdHJvbmcoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTdHJvbmcoKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2UgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGRvaW5nIGEgcmVzZXQgYmVmb3JlIHNldHRpbmdcbiAgICAgICAgLy8gdG8gbmV3VmFsdWUsIGluIGVpdGhlciBjYXNlLCBzaW5jZSBhbnkgbWVzc2FnZSBvYnZpYXRlc1xuICAgICAgICAvLyBjYXVzYWxseSBsZXNzZXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3b3VsZCBhbHNvIGxpa2UgdG8gdHJhbnNsYXRlIG9ic2VydmVkLXJlc2V0cyB0b1xuICAgIC8vIGRpc2FibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9uczogQXJyYXk8c3RyaW5nPik6IHN0cmluZyB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlU3Ryb25nXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb25zOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVzY3JpcHRpb25zKSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRGlzYWJsZVdpbnNGbGFnIGV4dGVuZHMgRGVmYXVsdFJlc2V0dGFibGVDcmR0PG51bGw+IHtcbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSkge1xuICAgICAgICBzdXBlcihpZCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKCkgPT4gbnVsbCksIG51bGwsXG4gICAgICAgICAgICBydW50aW1lLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZW5hYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChcImRcIik7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2UgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGRvaW5nIGEgcmVzZXQgYmVmb3JlIHNldHRpbmdcbiAgICAgICAgLy8gdG8gbmV3VmFsdWUsIGluIGVpdGhlciBjYXNlLCBzaW5jZSBhbnkgbWVzc2FnZSBvYnZpYXRlc1xuICAgICAgICAvLyBjYXVzYWxseSBsZXNzZXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3b3VsZCBhbHNvIGxpa2UgdG8gdHJhbnNsYXRlIG9ic2VydmVkLXJlc2V0cyB0b1xuICAgIC8vIGVuYWJsZSAoYnV0IG9ubHkgaWYgaXQgYWN0dWFsbHkgd29ya2VkKS4gIFBlcmhhcHMgYWRkIG5vb3AgaW5kaWNhdG9yIG91dCBmcm9udD9cbiAgICAvLyAoTmVlZCB0byBhZGQgYSBuby1vcCBjcmR0IGF0IHRoZSB0b3AgbGV2ZWwpXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdID09PSBcImRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5leHBvcnQgY2xhc3MgR01hcEludGVybmFsPEssIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGltcGxlbWVudHMgQ3JkdEludGVybmFsPE1hcDxLLCBDPj4ge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gdmFsdWVDcmR0SW50ZXJuYWwgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBzaG91bGRHYyBHaXZlbiBhIHZhbHVlIHN0YXRlLCByZXR1cm4gd2hldGhlciBpdCBpcyBzYWZlXG4gICAgICogdG8gZ2FyYmFnZSBjb2xsZWN0IGl0LCByZW1vdmluZyBpdHMga2V5LXZhbHVlIHBhaXIgZnJvbSB0aGVcbiAgICAgKiBtYXAuICBGb3IgY29ycmVjdG5lc3MsIGlmIHNob3VsZEdjKHZhbHVlU3RhdGUpIGlzIHRydWUsIHRoZW5cbiAgICAgKiB2YWx1ZVN0YXRlIG11c3QgYmUgaWRlbnRpY2FsIHRvIHZhbHVlQ3JkdEludGVybmFsLmNyZWF0ZSh2YWx1ZUluaXRpYWxEYXRhKTtcbiAgICAgKiBhbmQgaWYgc2hvdWxkR2MgaXMgbm9udHJpdmlhbCwgdGhlbiB1c2VycyBzaG91bGQga2VlcCBpblxuICAgICAqIG1pbmQgdGhhdCBzdGF0ZS5oYXMoa2V5KSBpcyBub3QgcmVsaWFibGUsIHNpbmNlIGl0IG1heSBiZVxuICAgICAqIGZhbHNlIGV2ZW4gYWZ0ZXIga2V5IGhhcyBiZWVuIGluaXRpYWxpemVkIGJlY2F1c2UgdGhlIHZhbHVlXG4gICAgICogaGFzIGJlZW4gZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHNob3VsZEdjOiAodmFsdWVTdGF0ZTogQykgPT4gYm9vbGVhbiA9ICgoKSA9PiBmYWxzZSkpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ETy4gIE5lZWRzIHRvIGJlIHNldC4gIEFsbG93IGl0IHRvIGJlIHNldCBvdXRzaWRlIGNvbnN0cnVjdG9yXG4gICAgICogYmVjYXVzZSBDcmR0T2JqZWN0IG5lZWRzIHRvIGNhbGwgc3VwZXIgYmVmb3JlIGl0IGNhbiBzZXQgdGhpcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdEZhY3RvcnkhOiAoa2V5OiBLKSA9PiBDO1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGE/OiBhbnkpOiBNYXA8SywgQz4ge1xuICAgICAgICByZXR1cm4gbmV3IE1hcDxLLCBDPigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wiYXBwbHlcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBpbml0aWFsaXppbmcgdGhlIGtleSBpZiBuZWVkZWQuXG4gICAgICogLSBbXCJhcHBseVNraXBcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBleGNlcHQgZm9yIHRoZWlyIHNlbmRlciwgd2hvIGlzIGFzc3VtZWRcbiAgICAgKiB0byBoYXZlIGFscmVhZHkgYXBwbGllZCB0aGUgbWVzc2FnZS4gIFRoaXMgaXMgdXNlZCBieVxuICAgICAqIENyZHRWYWx1ZWRHcm93T25seU1hcEludGVybmFsLCB3aG9zZSBtZXNzYWdlcyBhcmVcbiAgICAgKiBzb21ldGltZXMgZGVyaXZlZCBmcm9tIHZhbHVlcyBhcHBseWluZyBtZXNzYWdlcyB0b1xuICAgICAqIHRoZW1zZWx2ZXMuICBUT0RPOiBpbiBwcmluY2lwbGUgY2FuIG9wdGltaXplIHNvIHdlXG4gICAgICogZG9uJ3QgaGF2ZSB0byBzZW5kIFwic2tpcFwiIG92ZXIgdGhlIG5ldHdvcmsuXG4gICAgICogLSBbXCJpbml0XCIsIGtleV06IGluaXRpYWxpemVzIHRoZSBnaXZlbiBrZXkgdXNpbmcgaW5pdEZhY3RvcnlcbiAgICAgKiBpZiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGluIHRoZSBtYXAuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXRzIGV2ZXJ5IHZhbHVlIGluIHRoZSBtYXAgKHVzaW5nXG4gICAgICogZWFjaCB2YWx1ZSdzIGdldFVuaXZlcnNhbFJlc2V0T3BlcmF0aW9uKCkpLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uOiBbc3RyaW5nLCBLLCBhbnldLCBzdGF0ZTogTWFwPEssIEM+LCBfcmVwbGljYUlkOiBhbnkpOiBbc3RyaW5nLCBLPywgYW55P10ge1xuICAgICAgICBsZXQga2V5ID0gb3BlcmF0aW9uWzFdO1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5XCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlTa2lwXCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXMoa2V5KSkgcmV0dXJuIFtcImluaXRcIiwga2V5XTtcbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOiByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW4gYWRkaXRpb24gdG8gdGhlIG1lc3NhZ2Ugb3V0cHV0IGJ5IHByZXBhcmUsIHdlIGhhdmVcbiAgICAgKiBtZXNzYWdlcyAoYXJpc2luZyB0aHJvdWdoIHNlbWRpcmVjdCBwcm9kdWN0KTpcbiAgICAgKiAtIFtcImluaXRSZXNldFwiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZCBieVxuICAgICAqIGRlbGl2ZXJpbmcgYSByZXNldCBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICogLSBbXCJpbml0UmVzZXRTdHJvbmdcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWRcbiAgICAgKiBieSBkZWxpdmVyaW5nIGEgcmVzZXQtc3Ryb25nIG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKlxuICAgICAqIERlc2NyaXB0aW9uIGZvcm1hdDpcbiAgICAgKiAtIGZvciBhbiBhcHBseS9hcHBseVNraXAgb3BlcmF0aW9uOlxuICAgICAqIG51bGwgKFRPRE8pXG4gICAgICogLSBmb3IgYW4gaW5pdCBvcGVyYXRpb246IG51bGwgaWYgdGhlIGtleSBhbHJlYWR5IGV4aXN0ZWQsXG4gICAgICogb3RoZXJ3aXNlIFtcImluaXRcIiwga2V5XVxuICAgICAqIC0gZm9yIGEgcmVzZXQgb3BlcmF0aW9uOiBbXCJyZXNldFwiXSAoVE9ETzogZGVzY3JpcHRpb25zIGZyb21cbiAgICAgKiByZXNldCBrZXlzKVxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlOiBbc3RyaW5nLCBLLCBhbnk/XSwgc3RhdGU6IE1hcDxLLCBDPixcbiAgICAgICAgICAgIHJlcGxpY2FJZDogYW55LCB0aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6XG4gICAgICAgICAgICBbTWFwPEssIEM+LCBbc3RyaW5nLCBLPywgYW55P10gfCBudWxsXSB7XG4gICAgICAgIGxldCBrZXkgPSBtZXNzYWdlWzFdO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBhcHBseWluZyBpdCB0byB0aGUgc3RhdGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCBnYywgdGhvdWdoLCBpbiBjYXNlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5LWFwcGxpZWQgbWVzc2FnZSBoYXMgbWFkZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBnYy1hYmxlLlxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBmYWxsIHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjp7XG4gICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVN0YXRlLnJlY2VpdmUobWVzc2FnZVsyXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO31cbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhcyhrZXkpKSByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3VsZEdjKGluaXRTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnNldChrZXksIGluaXRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wiaW5pdFwiLCBrZXldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBzdGF0ZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc2V0TWVzc2FnZSA9IGVudHJ5WzFdLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzZXRNZXNzYWdlICE9PSBudWxsKSBlbnRyeVsxXS5yZWNlaXZlKFtyZXNldE1lc3NhZ2VdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShlbnRyeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wicmVzZXRcIl1dO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBDb252ZW5pZW50IHJlcHJlc2VudGF0aW9uIG9mIGEgQ3JkdC12YWx1ZWQgZ3Jvdy1vbmx5IG1hcC5cbiAqXG4gKiBUT0RPOiBTb21ld2hlcmU6IG5vdGUgdGhhdCBpbml0aWFsIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG11c3QgYmVcbiAqIGEgZnVuY3Rpb24gb2YgdGhlaXIga2V5IG9ubHkgKHNvIGNhbid0IGhhdmUgdmFyeWluZyB0eXBlcyBvclxuICogaW5pdGlhbCBkYXRhKS5cbiAqXG4gKiBOIGlzIHRoZSB0eXBlIG9mIG1lbWJlciBuYW1lcyAodHlwaWNhbGx5IHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBDcmR0T2JqZWN0PE4sIEMgZXh0ZW5kcyBDcmR0PGFueT4+IGV4dGVuZHMgQ3JkdDxNYXA8TiwgQz4+IGltcGxlbWVudHMgQ3JkdFJ1bnRpbWUge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcGVydHlGYWN0b3J5ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEeW5hbWljYWxseSBjcmVhdGVkIHByb3BlcnRpZXMgYXJlIG9ubHkgXCIgK1xuICAgICAgICAgICAgICAgIFwiYWxsb3dlZCBpZiBwcm9wZXJ0eUZhY3RvcnkgaXMgcGFzc2VkIHRvIHRoZSBcIiArXG4gICAgICAgICAgICAgICAgXCJDcmR0T2JqZWN0IGNvbnN0cnVjdG9yXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVE9ETzogcHJlZGVmaW5lZCB2cyBkeW5hbWljIHByb3BlcnR5IGNyZWF0aW9uLiAgUHJlZGVmaW5lZCBvbmVzXG4gICAgICogaGF2ZSB0byBiZSBjcmVhdGVkIGlkZW50aWNhbGx5IG9uIGFsbCByZXBsaWNhcyBpblxuICAgICAqIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIGFuZFxuICAgICAqIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCksIGlkZWFsbHkgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGV5XG4gICAgICogYXJlIG5vdCBzeW5jZWQgKGZvciBlZmZpY2llbmN5IGFuZCB0byBzYXZlIHRoZSB0cm91YmxlXG4gICAgICogb2Ygc3BlY2lmeWluZyBwcm9wZXJ0eUZhY3RvcnkpLiAgRHluYW1pYyBwcm9wZXJ0aWVzXG4gICAgICogY2FuIG9ubHkgYmUgY3JlYXRlZCB0aHJvdWdoIGluaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlGYWN0b3J5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBDcmR0UnVudGltZSxcbiAgICAgICAgICAgIHByb3BlcnR5RmFjdG9yeTogKG5hbWU6IE4sIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IENcbiAgICAgICAgICAgID0gQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5KSB7XG4gICAgICAgIC8vIFRPRE86IGdjIGFiaWxpdHlcbiAgICAgICAgbGV0IGNyZHRJbnRlcm5hbCA9IG5ldyBHTWFwSW50ZXJuYWw8TiwgQz4oKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRJbnRlcm5hbCwgcnVudGltZSk7XG4gICAgICAgIGNyZHRJbnRlcm5hbC5pbml0RmFjdG9yeSA9IChrZXk6IE4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBwcm9wZXJ0eUZhY3Rvcnkoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb246IGJvb2xlYW47XG4gICAgc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICBwcml2YXRlIGluSW5pdDogYm9vbGVhbjtcbiAgICByZWdpc3RlcihjcmR0OiBDLCBuYW1lOiBOKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiB8fCB0aGlzLmluSW5pdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BlcnRpZXMgY2FuIG9ubHkgYmUgZGlyZWN0bHkgXCIgK1xuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJlZCBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBcIiArXG4gICAgICAgICAgICAgICAgXCJhbmQgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKS4gIER5bmFtaWMgcHJvcGVydGllcyBcIiArXG4gICAgICAgICAgICAgICAgXCJtdXN0IGJlIGNyZWF0ZWQgd2l0aCBpbml0KG5hbWUpLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KG5hbWUsIGNyZHQpO1xuICAgICAgICAvLyBTa2lwIHNlbmRpbmcgYW4gaW5pdCBtZXNzYWdlIGFib3V0IGl0LiAgT2theSBiZWNhdXNlIG9mIHRoZVxuICAgICAgICAvLyBwcmVkZWZpbmVkIGluaXRpYWxpemF0aW9uIGNvbnRyYWN0LlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICBUaGUgaW5pdGlhbGl6ZWQgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0UHJvcGVydHkobmFtZTogTik6IEMge1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3AoW1wiaW5pdFwiLCBuYW1lXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSkgYXMgQztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKHRoaXMuZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbXCJyZXNldFwiXTtcbiAgICB9XG5cbiAgICBnZXRQcm9wZXJ0eShuYW1lOiBOKTogQyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICB9XG4gICAgcHJvcGVydHlOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUua2V5cygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWVzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5RW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICAgIH1cblxuICAgIHNlbmQobWVzc2FnZTogYW55LCBuYW1lOiBOKTogdm9pZCB7XG4gICAgICAgIC8vIENvbnZlcnQgaW50byBhbiBhcHBseVNraXAgbWVzc2FnZSBmb3IgdGhlIG1hcCB2YWx1ZVxuICAgICAgICAvLyBhdCBuYW1lLiAgSGVyZSB3ZSB3YW50IHRvIHNraXAgYmVjYXVzZVxuICAgICAgICAvLyBvdXIgcmVwbGljYSdzIHZhbHVlIGhhcyBhbHJlYWR5IGFwcGxpZWQgdGhlXG4gICAgICAgIC8vIG9wZXJhdGlvbiBpbnRlcm5hbGx5LlxuICAgICAgICB0aGlzLmFwcGx5T3AoW1wiYXBwbHlTa2lwXCIsIG5hbWUsIG1lc3NhZ2VdKTtcbiAgICB9XG5cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCk7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoX2NyZHRJZDogYW55KTogQ2F1c2FsVGltZXN0YW1wIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZFdpbnNTZXQ8VD4gZXh0ZW5kcyBDcmR0T2JqZWN0PFQsIEVuYWJsZVdpbnNGbGFnPiB7XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIGdjIG9uY2Ugd2UgaGF2ZSB0cmFuc2FjdGlvbnNcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUsIChuYW1lOiBULCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PlxuICAgICAgICAgICAgICAgIG5ldyBFbmFibGVXaW5zRmxhZyhuYW1lLCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICB9XG4gICAgYWRkKHZhbHVlOiBUKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRQcm9wZXJ0eSh2YWx1ZSkuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgZGVsZXRlKHZhbHVlOiBUKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICh0aGlzLmdldFByb3BlcnR5KHZhbHVlKSBhcyBFbmFibGVXaW5zRmxhZykuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyh2YWx1ZTogVCkge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAodGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSkgYXMgRW5hYmxlV2luc0ZsYWcpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKHZhbHVlOiBUKSB7XG4gICAgICAgIGxldCB2YWx1ZUZsYWcgPSB0aGlzLmdldFByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlRmxhZyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlRmxhZy5lbmFibGVkO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKTogU2V0PFQ+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZXQ8VD4oKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5wcm9wZXJ0eUVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5WzFdLmVuYWJsZWQpIHJlc3VsdC5hZGQoZW50cnlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZTogU2V0PFQ+KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgdmFsdWVzKCkge1xuICAgICAgICAvLyBUT0RPOiBvbmNlIGl0J3MgZ2MnZCB3ZSBjYW4ganVzdCB1c2UgdGhpcy5zdGF0ZS5rZXlzKClcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUudmFsdWVzKCk7XG4gICAgfVxuICAgIC8vIFRPRE86IG90aGVyIHNldCBwcm9wZXJ0aWVzIChlLmcuIHN5bWJvbCBpdGVyYXRvcilcbiAgICAvLyBUT0RPOiBjYXB0dXJpbmcgYW5kIHRyYW5zbGF0aW5nIGRlc2NyaXB0aW9uc1xufVxuXG5leHBvcnQgY2xhc3MgTWFwQ3JkdDxLLCBDIGV4dGVuZHMgQ3JkdDxhbnk+PiBleHRlbmRzIENyZHRPYmplY3Q8c3RyaW5nLCBBZGRXaW5zU2V0PEs+IHwgQ3JkdE9iamVjdDxLLCBDPj4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkga2V5U2V0OiBBZGRXaW5zU2V0PEs+O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsdWVNYXA6IENyZHRPYmplY3Q8SywgQz47XG4gICAgY29uc3RydWN0b3IoaWQ6IGFueSwgcnVudGltZTogQ3JkdFJ1bnRpbWUsXG4gICAgICAgICAgICB2YWx1ZUZhY3Rvcnk6IChrZXk6IEssIGludGVybmFsUnVudGltZTogQ3JkdFJ1bnRpbWUpID0+IEMpIHtcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUpO1xuICAgICAgICB0aGlzLnN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICAgICAgdGhpcy5rZXlTZXQgPSBuZXcgQWRkV2luc1NldChcImtleVNldFwiLCB0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZU1hcCA9IG5ldyBDcmR0T2JqZWN0KFwidmFsdWVNYXBcIiwgdGhpcywgdmFsdWVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbGFnIGluZGljYXRpbmcgdGhhdCB3ZSBhcmUgaW4gdGhlIGJvZHkgb2YgYSBkZWxldGUvXG4gICAgICogZGVsZXRlU3Ryb25nIGNhbGwsIGhlbmNlIHdlIHNob3VsZCBub3QgYWRkIHRoaW5nc1xuICAgICAqIHRvIGtleVNldCAoYXMgYW4gb3B0aW1pemF0aW9uKS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGluRGVsZXRlID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgQ3JkdE9iamVjdC5zZW5kIHNvIHRoYXQgd2UgY2FuIGNhcHR1cmVcbiAgICAgKiBhIHNlbmQgYnkgYSB2YWx1ZU1hcCB2YWx1ZSBhbmQgZm9sbG93IGl0IHVwIHdpdGhcbiAgICAgKiBhbiBhZGQgdG8ga2V5U2V0LCB0aHVzIHJldml2aW5nIHRoZSB2YWx1ZSdzIGtleVxuICAgICAqIGlmIGFwcHJvcHJpYXRlLlxuICAgICAqXG4gICAgICogVE9ETzogc2tpcCBhZGRpbmcgdGhlIGtleSBpZiBpdCdzIGEgcmVzZXQgbWVzc2FnZT9cbiAgICAgKiBOb3Qgc3VyZSBpZiB0aGlzIGlzIHBvc3NpYmxlIGluIGdlbmVyYWwuICBCdXQgc2hvdWxkIGF0XG4gICAgICogbGVhc3QgYmUgcG9zc2libGUgZm9yIG91ciBvd24gZGVsZXRlcy5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2U6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNlbmQobWVzc2FnZSwgbmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSAmJiBuYW1lID09PSBcInZhbHVlTWFwXCIpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvIHRoaXMgcmVjZWl2ZXIgc2lkZSBpbnN0ZWFkLCBmb3IgbmV0d29yayBlZmZpY2llbmN5P1xuICAgICAgICAgICAgLy8gV291bGQgbmVlZCB0byBwbGFjZSB0aGUgYWRkIGZpcnN0LCBzbyB0aGF0IGl0IGNhblxuICAgICAgICAgICAgLy8gYmUgb3ZlcnJpZGRlbiBieSBhbnkgaW5jbHVkZWQgZGVsZXRlcy5cbiAgICAgICAgICAgIC8vIFdvdWxkIGFsc28gbmVlZCB0byBhY2NvdW50IGZvciBwb3NzaWJpbGl0eSBvZlxuICAgICAgICAgICAgLy8gdHJhbnNhY3Rpb25zLlxuICAgICAgICAgICAgLy8gQWxzbywgbmVlZCB0byBtYWtlIHN1cmUgd2UgKHNlbmRlcikgZG8gaXQgdG9vLlxuICAgICAgICAgICAgZm9yIChsZXQgc3VibWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Ym1lc3NhZ2VbMF0gPT09IFwiYXBwbHlTa2lwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IHN1Ym1lc3NhZ2VbMV0gYXMgSztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoa2V5OiBLKTogQyB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMuaW5EZWxldGUpIHRoaXMua2V5U2V0LmFkZChrZXkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy52YWx1ZU1hcC5pbml0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYXMoa2V5OiBLKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC5oYXMoa2V5KTtcbiAgICB9XG4gICAgZ2V0KGtleTogSykge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkgcmV0dXJuIHRoaXMudmFsdWVNYXAuZ2V0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBkZWxldGUoa2V5OiBLKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaW5EZWxldGUgPSB0cnVlO1xuICAgICAgICAgICAgKHRoaXMuZ2V0KGtleSkgYXMgQykucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyhrZXk6IEspIHtcbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdChrZXkpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZVN0cm9uZyhrZXkpO1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC52YWx1ZXMoKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBvdGhlciBtYXAgbWV0aG9kcyAoZS5nLiBzeW1ib2wgaXRlcmF0b3IpXG4gICAgLy8gVE9ETzogc3Ryb25nLXJlc2V0XG4gICAgLy8gVE9ETzogcHJlc2VydmUtc3RhdGUgZGVsZXRlLCByZXNldD9cbn1cbiIsInJlcXVpcmUoJy4uL3Rlc3QvdGVzdCcpOyAvLyBydW4gdGVzdC50c1xuXG5pbXBvcnQgeyBDb3VudGVyQ3JkdCB9IGZyb20gXCIuLi9zcmMvY3JkdHMvYmFzaWNfY3JkdHNcIjtcbmltcG9ydCB7IENyZHROZXR3b3JrUnVudGltZSB9IGZyb20gJy4uL3NyYy9uZXR3b3JrL2NyZHRfbmV0d29ya19ydW50aW1lJztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuLyoqXG4gKiBHZXQgSGVyb2t1IHNlcnZlciBob3N0IFdlYnNvY2tldC5cbiAqL1xudmFyIEhPU1QgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKVxuXG4vKipcbiAqIEdlbmVyYXRlIHV1aWQgZm9yIGNsaWVudC5cbiAqIENyZWF0ZSBDUkRUcyAoZS5nLiBDb3VudGVyQ3JkdCkuXG4gKi9cbmNvbnN0IGNsaWVudF91dWlkOiBzdHJpbmcgPSB1dWlkKCk7XG5sZXQgY2xpZW50ID0gbmV3IENyZHROZXR3b3JrUnVudGltZShjbGllbnRfdXVpZCwgSE9TVCk7XG5sZXQgY2xpZW50Q291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBjbGllbnQpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgb25jaGFuZ2UoKSBmb3IgQ1JEVCBhcyByZWZyZXNoIHRoZSB2YWx1ZSAqL1xuY2xpZW50Q291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiB7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpfSk7XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgaW5jcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpbmNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgZGVjcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBkZWNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoLTEwMCk7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufVxuXG4vLyAvKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIHN5bmMgdG8gc3luY2hyb25pemUgdGhlIHZhbHVlICovXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5bmNcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbi8vICAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG4vLyB9XG4iLCJpbXBvcnQgeyBDcmR0UnVudGltZSwgQ2F1c2FsVGltZXN0YW1wIH0gZnJvbSAnLi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZSc7XG5pbXBvcnQgeyBDcmR0TWVzc2FnZUxpc3RlbmVyIH0gZnJvbSBcIi4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFZlY3RvckNsb2NrIH0gZnJvbSAnLi92ZWN0b3JfY2xvY2snO1xuLy8gaW1wb3J0IFdlYlNvY2tldCA9IHJlcXVpcmUoXCJ3c1wiKTtcblxuLy8gVGhlIGNhc3VhbCBicm9hZGNhc3QgbmV0d29yayBkZXNpZ25lZCBmb3IgYSB0d28td2F5IGludGVyYWN0aXZlXG4vLyBjb21tdW5pY2F0aW9uIHNlc3Npb24gYmV0d2VlbiB1c2VyIGFuZCBzZXJ2ZXIgdXNpbmcgV2ViU29ja2V0IEFQSS5cbi8vXG4vLyBBbHNvIGVuc3VyZSB0aGUgb3JkZXIgb2YgZGVsaXZlcnkgd2l0aCBjYXN1YWxpdHkgY2hlY2suXG5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5leHBvcnQgY2xhc3MgbXlNZXNzYWdlIHtcbiAgICAvKipcbiAgICAgKiBDcmR0IHVwZGF0ZSBtZXNzYWdlLlxuICAgICAqL1xuICAgIG1lc3NhZ2UgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIGNyZHRJZCBmb3IgaWRlbnRpZmljYXRpb24uXG4gICAgICovXG4gICAgY3JkdElkIDogYW55O1xuICAgIC8qKlxuICAgICAqIFRpbWVzdGFtcCBmb3IgY2FzdWFsaXR5L2NvbmN1cnJlbmN5IGNoZWNrLlxuICAgICAqXG4gICAgICogUHJvdmlkZSBiYXNpYyBmdW5jdGlvbnMgc3VjaCBhcyA6XG4gICAgICogZ2V0U2VuZGVyKCkgLyBnZXRTZW5kZXJDb3VudGVyKCkgLyBhc1ZlY3RvckNsb2NrKCkuXG4gICAgICovXG4gICAgdGltZXN0YW1wIDogVmVjdG9yQ2xvY2s7XG5cbiAgICBjb25zdHJ1Y3RvciAobWVzc2FnZSA6IGFueSwgY3JkdElkIDogYW55LCB0aW1lc3RhbXAgOiBWZWN0b3JDbG9jaykge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNyZHRJZCA9IGNyZHRJZDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGN1c3RvbWl6ZWQgdG9KU09OIGZ1bmN0aW9uIHRvIGNvbnZlcnQgbWVzc2FnZSBhcyBKU09OIGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHBhY2thZ2UgaW5mbyBpbiBKU09OIGZvcm1hdC5cbiAgICAgKi9cbiAgICB0b0pTT04oKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIHsgICBcIm1lc3NhZ2VcIiA6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBcImNyZHRJZFwiIDogdGhpcy5jcmR0SWQsXG4gICAgICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ1aWRcIiA6IHRoaXMudGltZXN0YW1wLnVpZCxcbiAgICAgICAgICAgICAgICAgICAgXCJ2ZWN0b3JNYXBcIiA6IEFycmF5LmZyb20odGhpcy50aW1lc3RhbXAudmVjdG9yTWFwLmVudHJpZXMoKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxufVxuXG4vKipcbiAqIENhc3VhbEJyb2FkY2FzdE5ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgYnJvYWRjYXN0IHNlcnZlciB3aXRoIFdlYlNvY2tldCBwcm90b2NvbC5cbiAqXG4gKiBQZXJmb3JtIGNhc3VhbGl0eSBjaGVjayB0byBlbnN1cmUgbWVzc2FnZSBvcmRlcmluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIENyZHROZXR3b3JrUnVudGltZSBpbXBsZW1lbnRzIENyZHRSdW50aW1le1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBJRCBmb3IgcmVwbGljYSBmb3IgaWRlbnRpZmljYXRpb24uXG4gICAgICovXG4gICAgdWlkIDogYW55O1xuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCBmb3IgY29ubmVjdGlvbiB0byBzZXJ2ZXIuXG4gICAgICovXG4gICAgd3MgOiBXZWJTb2NrZXQ7XG4gICAgLyoqXG4gICAgICogTWFwIHN0b3JlcyBhbGwgY3JkdElkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdmVjdG9yIGNsb2NrLlxuICAgICAqL1xuICAgIHZjTWFwIDogTWFwPGFueSwgVmVjdG9yQ2xvY2s+O1xuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYnVmZmVyIHRvIHN0b3JlIHJlY2VpdmVkIG1lc3NhZ2UgdG8gZW5zdXJlIGNhc3VhbCBkZWxpdmVyeS5cbiAgICAgKi9cbiAgICBtZXNzYWdlQnVmZmVyIDogQXJyYXk8W2FueSwgYW55LCBWZWN0b3JDbG9ja10+O1xuICAgIC8qKlxuICAgICAqIE1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50IGJ5IHRoZSBXZWJTb2NrZXRcbiAgICAgKi9cbiAgICBzZW5kQnVmZmVyIDogQXJyYXk8bXlNZXNzYWdlPjtcbiAgICAvKipcbiAgICAgKiBUaGUgcmVnaXN0ZXJlZCBDUkRUIHdpdGggY29ycmVzcG9uZGluZyBDcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGxpc3RlbmVyc0J5SWQgOiBNYXA8YW55LCBDcmR0TWVzc2FnZUxpc3RlbmVyPjtcblxuICAgIGNvbnN0cnVjdG9yIChyZXBsaWNhSWQ6IGFueSwgd2ViU29ja2V0QXJnczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZjTWFwID0gbmV3IE1hcDxhbnksIFZlY3RvckNsb2NrPigpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIgPSBuZXcgQXJyYXk8W2FueSwgYW55LCBWZWN0b3JDbG9ja10+KCk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheTxteU1lc3NhZ2U+KCk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZCA9IG5ldyBNYXA8YW55LCBDcmR0TWVzc2FnZUxpc3RlbmVyPigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aXRoIHNlcnZlci5cbiAgICAgICAgICogUmVnaXN0ZXIgRXZlbnRMaXN0ZW5lciB3aXRoIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldEFyZ3MpO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLnNlbmRBY3Rpb24pO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLnJlY2VpdmVBY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAqIElmIG5vdCwgdGhlbiB3YWl0IGEgY3VzdG9taXplZCB0aW1lIHBlcmlvZCBhbmQgY2hlY2sgYWdhaW4uXG4gICAgICovXG4gICAgc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXk8bXlNZXNzYWdlPigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgaW50byBteU1lc3NhZ2UgdHlwZS5cbiAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBhbGwgdGhlIG1lc3NhZ2VzIGFuZCBkZWxpdmVyIHRvIGFwcGxpY2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAqL1xuICAgIHJlY2VpdmVBY3Rpb24gPSAoZGF0YSA6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gdGhpcy5wYXJzZUpTT04oZGF0YS5kYXRhKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuY3JkdElkLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHRJZCBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3JkdElkKGNyZHRJZCA6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBjcmR0SWQ6IFwiICsgY3JkdElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyBWZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHQgd2l0aCBpdHMgSUQgYW5kIGNvcnJlc3BvbmRpbmcgbWVzc2FnZVxuICAgICAqIGxpc3RlbmVyIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdE1lc3NhZ2VMaXN0ZW5lciB0aGUgbWVzc2FnZSBsaXN0ZW5lciBvZiBlYWNoIGNyZHQuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgSUQgb2YgZWFjaCBjcmR0LlxuICAgICAqXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lcjogQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc0J5SWQuaGFzKGNyZHRJZCkgfHwgdGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBmdW5jdGlvbiBvbiBjYXN1YWxicm9hZGNhc3QgbmV0d29yayBsYXllciwgd2hpY2ggY2FsbGVkXG4gICAgICogYnkgY3JkdCdzIHJ1bnRpbWUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBpcyB3cmFwcGVkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdGltZXN0YW1wIChiYXNpYyBzZW5kZXIgbm9kZVxuICAgICAqIGluZm8gYW5kIHZlY3RvciBjbG9jaykuXG4gICAgICpcbiAgICAgKiBVc2luZyBXZWJTb2NrZXQgYXMgbmV0d29yayB0cmFuc21pc3Npb24gcHJvdG9jb2wuXG4gICAgICogVXNpbmcgSlNPTiBmb3JtYXQgYXMgbWVzc2FnZSB0eXBlLlxuICAgICAqXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIG5vdCBPcGVuLCB0aGVuIGJ1ZmZlciB0aGUgbWVzc2FnZSBhbmRcbiAgICAgKiB3YWl0IHVudGlsIFdlYlNvY2tldCBvcGVuLlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBPcGVuLCB0aGVuIHNlbmQgaXQgd2l0aCB3cy5zZW5kKCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgY3JkdCB1cGRhdGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSB1bmlxdWUgSUQgZm9yIGVhY2ggY3JkdC5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UgOiBhbnksIGNyZHRJZCA6IGFueSkgOiB2b2lke1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3JkdElkIGV4aXN0IGluIHRoZSBtYXAuXG4gICAgICAgIGlmICh0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpIS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpIS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrIGZvciBzZW5kaW5nXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4odGhpcy52Y01hcC5nZXQoY3JkdElkKT8uYXNWZWN0b3JDbG9jaygpISk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGNyZHRJZCwgdmNDb3B5ISk7XG5cbiAgICAgICAgLy8gQ29udmVydCB0aGUgbWVzc2FnZSBpbnRvIEpTT05cbiAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKG15UGFja2FnZS50b0pTT04oKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChteVBhY2thZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmV4dCB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGNyZHRJZCBpbiB0aGlzIHJlcGxpY2EuXG4gICAgICogXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICogXG4gICAgICovXG4gICAgZ2V0TmV4dFRpbWVzdGFtcChjcmR0SWQ6IGFueSkgOiBDYXVzYWxUaW1lc3RhbXAge1xuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jay4gIFxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IFZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KHRoaXMudmNNYXAuZ2V0KGNyZHRJZCk/LmFzVmVjdG9yQ2xvY2soKSEpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuIFxuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgdmNDb3B5LnZlY3Rvck1hcC5nZXQodGhpcy51aWQpIGFzIG51bWJlciArIDEpO1xuXG4gICAgICAgIHJldHVybiB2Y0NvcHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayB0byBjdXN0b21pemVkIGRhdGEgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHRyYXZlbCB0aHJvdWdoIG5ldHdvcmsuXG4gICAgICogQHJldHVybnMgdGhlIGN1c3RvbWl6ZWQgZGF0YSB0eXBlID0+IG15TWVzc2FnZVxuICAgICAqL1xuICAgIHBhcnNlSlNPTihkYXRhIDogc3RyaW5nKSA6IG15TWVzc2FnZSB7XG4gICAgICAgIGxldCBkYXRhSlNPTiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGxldCB2YyA9IG5ldyBWZWN0b3JDbG9jayhkYXRhSlNPTi50aW1lc3RhbXAudWlkKTtcbiAgICAgICAgdmMudmVjdG9yTWFwID0gbmV3IE1hcChkYXRhSlNPTi50aW1lc3RhbXAudmVjdG9yTWFwKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UoZGF0YUpTT04ubWVzc2FnZSwgZGF0YUpTT04uY3JkdElkLCB2Yyk7XG5cbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmcgXG4gICAgICogY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBjaGVja01lc3NhZ2VCdWZmZXIoKSA6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcblxuICAgICAgICB3aGlsZShpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgY3VyQ3JkdElkID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXTtcbiAgICAgICAgICAgIGxldCBjdXJWZWN0b3JDbG9jayA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl07XG5cbiAgICAgICAgICAgIGlmICghdGhpcy52Y01hcC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlWZWN0b3JDbG9jayA9IHRoaXMudmNNYXAuZ2V0KGN1ckNyZHRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKG15VmVjdG9yQ2xvY2s/LmlzcmVhZHkoY3VyVmVjdG9yQ2xvY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBTZW5kIGJhY2sgdGhlIHJlY2VpdmVkIG1lc3NhZ2VzIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLmdldChjdXJDcmR0SWQpPy5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENhdXNhbFRpbWVzdGFtcCB9IGZyb20gJy4uL2NyZHRfcnVudGltZV9pbnRlcmZhY2UnO1xuXG4vLyBUaGUgdmVjdG9yIGNsb2NrIGRlc2lnbmVkIGZvciBDUkRUIGxpYnJhcnkgYW5kIGNhc3VhbCBicm9hZGNhc3Rpbmdcbi8vIHJ1bnRpbWUgdG8gZW5zdXJlIGNvcnJlY3QgY2F1c2FsaXR5LlxuXG4vKipcbiAqIFRoZSB2ZWN0b3IgY2xvY2sgY2xhc3MgZm9yIGVuc3VyaW5nIGNhc3VhbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZlY3RvckNsb2NrIGltcGxlbWVudHMgQ2F1c2FsVGltZXN0YW1we1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBJRCBmb3IgZWFjaCByZXBsaWNhIHRvIGlkZW50aWZ5IGl0c2VsZihyZXBsaWNhSWQpLlxuICAgICAqLyAgICBcbiAgICB1aWQgOiBhbnk7XG4gICAgLyoqXG4gICAgICogVGhlIHJlY29yZCBtYXAgZnJvbSByZXBsaWNhIGlkcyB0byB0aGUgbnVtYmVyIG9mIGxhc3Rlc3QgbWVzc2FnZS5cbiAgICAgKi9cbiAgICB2ZWN0b3JNYXAgOiBNYXA8YW55LCBudW1iZXI+O1xuXG4gICAgLyoqIFxuICAgICAqIEluaXRpYWxpemUgdGhlIHZlY3RvciB3aXRoIHJlcGxpY2EncyBvd24gZW50cnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkIDogYW55KSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVwbGljYShyZXBsaWNhSWQpLlxuICAgICAqL1xuICAgIGdldFNlbmRlcigpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmVjdG9yIGNsb2NrIHdpdGggYWxsIHRoZSBlbnRyaWVzLlxuICAgICAqL1xuICAgIGFzVmVjdG9yQ2xvY2soKSA6IE1hcDxhbnksIG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpbiBcbiAgICAgKiB0aGlzIHZlY3RvcmNsb2NrLlxuICAgICAqL1xuICAgIGdldFNlbmRlckNvdW50ZXIoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpITtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiByZXBsaWNhcyBpbnZvdmxlZCBpbiB0aGlzIGNyZHRzLlxuICAgICAqL1xuICAgIGdldFNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZlY3RvciBvZiB0aGUgdWlkKHJlcGxpY2FJZCkgZW50cnkuXG4gICAgICovXG4gICAgaW5jcmVtZW50KCkgOiB2b2lkIHsgXG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcblxuICAgICAgICBpZihvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgb2xkVmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBhIG1lc3NhZ2Ugd2l0aCBhIGNlcnRhaW4gdGltZXN0YW1wIGlzIHJlYWR5IGZvciBkZWxpdmVyeSBcbiAgICAgKiB0byBlbnN1cmUgY29ycmVjdCBjYXN1YWxpdHkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMgOiBWZWN0b3JDbG9jaykgOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuaGFzKG90aGVyVWlkKSkgeyBcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpISAtIDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSEgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkgeyAgXG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkhIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICogXG4gICAgICogVGhpcyBvcGVyYXRpb24gaXMgbWFpbmx5IGRvbmUgYWZ0ZXIgY29ycmVjdGx5IGRlbGl2ZXIgdGhlIG1lc3NhZ2VcbiAgICAgKiB3aGVuIGlzUmVhZHkoKSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgaW5jcmVtZW50U2VuZGVyKHZjIDogVmVjdG9yQ2xvY2spIDogdm9pZCB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG5cbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KG90aGVyVWlkLCBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpISk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIGN1cnJlbnQgVmVjdG9yQ2xvY2sgd2l0aCB0aGUgdmVjdG9yIGNsb2NrIHJlY2V2aWVkIGZyb20gXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBtZXJnZSh2YyA6IFZlY3RvckNsb2NrKSA6IHZvaWR7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcblxuICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIE1hdGgubWF4KHRoaXMudmVjdG9yTWFwLmdldChpZCkhLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpISkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzb21lVWlkIHRoZSByZXBsaWNhJ3MgdWlkLlxuICAgICAqIEBwYXJhbSBjbG9ja1ZhbHVlIHRoZSBjbG9jayBudW1iZXIgb2YgdGhlIHJlcGxpY2EuXG4gICAgICovXG4gICAgc2V0RW50cnkoc29tZVVpZCA6IGFueSwgY2xvY2tWYWx1ZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQgeyBDb3VudGVyQ3JkdCwgTXVsdFJlZ2lzdGVyQ3JkdCwgR1NldENyZHQsIE11bHRpVmFsdWVSZWdpc3RlciB9IGZyb20gXCIuLi8uLi9zcmMvY3JkdHMvYmFzaWNfY3JkdHNcIjtcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdENvdW50ZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0Q291bnRlcigpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlQ291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGFkZGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iQ291bnRlciA9IG5ldyBDb3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBib2IpO1xuICAgIGJvYkNvdW50ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGFkZGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUNvdW50ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkNvdW50ZXIuYWRkKC00KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCAtMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIC0xKTtcblxuICAgIGFsaWNlQ291bnRlci52YWx1ZSA9IDExO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDExKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMTEpO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RcbiAgICBhbGljZUNvdW50ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDEzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgMTEpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDEzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgNik7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VDb3VudGVyLnZhbHVlLCA4KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgOCk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE11bHRSZWdpc3RlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNdWx0UmVnaXN0ZXIoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZVJlZ2lzdGVyID0gbmV3IE11bHRSZWdpc3RlckNyZHQoXCJtdWx0SWRcIiwgYWxpY2UsIDIpO1xuICAgIGFsaWNlUmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgbXVsdGVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iUmVnaXN0ZXIgPSBuZXcgTXVsdFJlZ2lzdGVyQ3JkdChcIm11bHRJZFwiLCBib2IsIDIpO1xuICAgIGJvYlJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBtdWx0ZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDIpO1xuXG4gICAgYWxpY2VSZWdpc3Rlci5tdWx0KDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA2KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIDYpO1xuXG4gICAgYm9iUmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIC0yNCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAtMjQpO1xuXG4gICAgYWxpY2VSZWdpc3Rlci52YWx1ZSA9IDExO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAxMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlUmVnaXN0ZXIubXVsdCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMjIpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMTEpO1xuXG4gICAgYm9iUmVnaXN0ZXIubXVsdCgtOCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDIyKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iUmVnaXN0ZXIudmFsdWUsIC04OCk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgLTE3Nik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAtMTc2KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0R1NldCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RHU2V0KCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VHU2V0ID0gbmV3IEdTZXRDcmR0KFwiZ3NldElkXCIsIGFsaWNlKTtcbiAgICBhbGljZUdTZXQub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JHU2V0ID0gbmV3IEdTZXRDcmR0KFwiZ3NldElkXCIsIGJvYik7XG4gICAgYm9iR1NldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgYWRkZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoKSk7XG5cbiAgICBhbGljZUdTZXQuYWRkKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCJdKSk7XG5cbiAgICBib2JHU2V0LmFkZCg3KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDddKSk7XG5cbiAgICBhbGljZUdTZXQuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgN10pKTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0XG4gICAgYWxpY2VHU2V0LmFkZChcImZpcnN0XCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZUdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3LCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYkdTZXQudmFsdWUsIG5ldyBTZXQoW1wiZWxlbWVudFwiLCA3XSkpO1xuXG4gICAgYm9iR1NldC5hZGQoXCJzZWNvbmRcIik7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwiZmlyc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iR1NldC52YWx1ZSwgbmV3IFNldChbXCJlbGVtZW50XCIsIDcsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JHU2V0LnZhbHVlLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgNywgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RNdnIoKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0TXZyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VNdnIgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oXCJtdnJJZFwiLCBhbGljZSwgXCJpbml0aWFsXCIpO1xuICAgIGFsaWNlTXZyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGxldCBib2JNdnIgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4oXCJtdnJJZFwiLCBib2IsIFwiaW5pdGlhbFwiKTtcbiAgICBib2JNdnIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIHNldCB0byBcIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJpbml0aWFsXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJpbml0aWFsXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwic2Vjb25kXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wic2Vjb25kXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwidGhpcmRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1widGhpcmRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYm9iTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcInRoaXJkXCJdKSk7XG5cbiAgICBib2JNdnIudmFsdWUgPSBcImJvYidzXCI7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImJvYidzXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJib2Inc1wiXSkpO1xuXG4gICAgLy8gQ29uY3VycmVudCB0ZXN0XG4gICAgYWxpY2VNdnIudmFsdWUgPSBcImNvbmNBXCI7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJjb25jQlwiO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQVwiLCBcImNvbmNCXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQlwiLCBcImNvbmNBXCJdKSk7XG5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwiY29uY0EyXCI7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGFsaWNlTXZyLnZhbHVlU2V0LCBuZXcgU2V0KFtcImNvbmNBMlwiXSkpO1xuICAgIGJvYk12ci52YWx1ZSA9IFwiY29uY0IyXCI7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQjJcIl0pKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY0EyXCIsIFwiY29uY0IyXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJjb25jQjJcIiwgXCJjb25jQTJcIl0pKTtcblxuICAgIC8vIE11bHRpcGxlIGFkZHMgYXJlIHJlZHVuZGFudCwgdW5sZXNzIHRoZXkncmUgb3ZlcndyaXR0ZW5cbiAgICBhbGljZU12ci52YWx1ZSA9IFwicmVkdW5kYW50XCI7XG4gICAgYm9iTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wicmVkdW5kYW50XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIl0pKTtcblxuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJyZWR1bmRhbnRcIjtcbiAgICBib2JNdnIudmFsdWUgPSBcInJlZHVuZGFudFwiO1xuICAgIGFsaWNlTXZyLnZhbHVlID0gXCJvdmVyd3JpdGVcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wicmVkdW5kYW50XCIsIFwib3ZlcndyaXRlXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKGJvYk12ci52YWx1ZVNldCwgbmV3IFNldChbXCJyZWR1bmRhbnRcIiwgXCJvdmVyd3JpdGVcIl0pKTtcblxuICAgIC8vIFJlc2V0IHRlc3RcbiAgICBhbGljZU12ci5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhhbGljZU12ci52YWx1ZVNldCwgbmV3IFNldCgpKTtcbiAgICBib2JNdnIudmFsdWUgPSBcImNvbmNcIjtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMoYWxpY2VNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY1wiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhib2JNdnIudmFsdWVTZXQsIG5ldyBTZXQoW1wiY29uY1wiXSkpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdENvdW50ZXIoKTtcbnRlc3RNdWx0UmVnaXN0ZXIoKTtcbnRlc3RHU2V0KCk7XG50ZXN0TXZyKCk7XG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU2V0XG5mdW5jdGlvbiBpc1N1cGVyc2V0PFQ+KHNldDogU2V0PFQ+LCBzdWJzZXQ6IFNldDxUPikge1xuICAgIGZvciAobGV0IGVsZW0gb2Ygc3Vic2V0KSB7XG4gICAgICAgIGlmICghc2V0LmhhcyhlbGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIHNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIHJldHVybiBpc1N1cGVyc2V0KHNldDEsIHNldDIpICYmIGlzU3VwZXJzZXQoc2V0Miwgc2V0MSk7XG59XG5mdW5jdGlvbiBhc3NlcnRTZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICBpZighc2V0RXF1YWxzKHNldDEsIHNldDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInNldEVxdWFscyBmYWlsZWQsIGFjdHVhbDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDEudmFsdWVzKCldKSArIFwiLCBleHBlY3RlZDogXCIgK1xuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoWy4uLnNldDIudmFsdWVzKCldKSk7XG4gICAgfVxuICAgIGFzc2VydChzZXRFcXVhbHMoc2V0MSwgc2V0MikpO1xufVxuIiwiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtUZXN0aW5nUnVudGltZUdlbmVyYXRvcn0gZnJvbSBcIi4uL3J1bnRpbWVfZm9yX3Rlc3RpbmdcIjtcbmltcG9ydCB7IEpzb25DcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL2pzb24nO1xuaW1wb3J0IHsgSW50UmVnaXN0ZXJDcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkJztcblxubGV0IHJ1bnRpbWVHZW4gPSBuZXcgVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IoKTtcbmxldCBhbGljZSA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImFsaWNlXCIpO1xubGV0IGJvYiA9IHJ1bnRpbWVHZW4ubmV3UnVudGltZShcImJvYlwiKTtcblxuZnVuY3Rpb24gdGVzdEpzb25NYXBGZWF0dXJlcygpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RKc29uTWFwRmVhdHVyZXMoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUpzb24gPSBuZXcgSnNvbkNyZHQoXCJqc29uTWFwXCIsIGFsaWNlKTtcbiAgICBsZXQgYm9iSnNvbiA9IG5ldyBKc29uQ3JkdChcImpzb25NYXBcIiwgYm9iKTtcblxuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG5cbiAgICAvLyBJbml0cyBnbyB0aHJvdWdoXG4gICAgYWxpY2VKc29uLmluaXQoXCJ0ZXN0XCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0KGFsaWNlSnNvbi5oYXMoXCJ0ZXN0XCIsIDApKTtcbiAgICBhc3NlcnQoYm9iSnNvbi5oYXMoXCJ0ZXN0XCIsIDApKTtcblxuICAgIGxldCBhbGljZVRlc3QgPSBhbGljZUpzb24uZ2V0KFwidGVzdFwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGFsaWNlVGVzdCk7XG4gICAgbGV0IGJvYlRlc3QgPSBib2JKc29uLmdldChcInRlc3RcIiwgMCkgYXMgSW50UmVnaXN0ZXJDcmR0O1xuICAgIGFzc2VydChib2JUZXN0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCAwKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgMCk7XG5cbiAgICAvLyBWYWx1ZSBvcHMgd29ya1xuICAgIGFsaWNlVGVzdC5hZGQoMyk7XG4gICAgYm9iVGVzdC5hZGQoNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlVGVzdC52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlRlc3QudmFsdWUsIDcpO1xuXG4gICAgLy8gRGVsZXRlIHdvcmtzXG4gICAgYm9iSnNvbi5kZWxldGUoXCJ0ZXN0XCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0KGFsaWNlSnNvbi5nZXQoXCJ0ZXN0XCIsIDApID09PSB1bmRlZmluZWQpO1xuICAgIGFzc2VydChib2JKc29uLmdldChcInRlc3RcIiwgMCkgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBhbGljZUpzb24uaW5pdChcInJlZ2lzdGVyXCIsIDApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzQnlUeXBlKDApKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcblxuICAgIC8vIENvbmN1cnJlbnQgb3BlcmF0aW9uIHJldml2ZXMga2V5XG4gICAgbGV0IGJvYlJlZ2lzdGVyID0gYm9iSnNvbi5nZXQoXCJyZWdpc3RlclwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VKc29uLmRlbGV0ZShcInJlZ2lzdGVyXCIsIDApO1xuICAgIGJvYlJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZUpzb24ua2V5c0J5VHlwZSgwKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JKc29uLmtleXNCeVR5cGUoMCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoKGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiLCAwKSBhcyBJbnRSZWdpc3RlckNyZHQpLnZhbHVlLCAzKTtcblxuICAgIC8vIC8vIFJlc2V0IHRlc3RzXG4gICAgLy8gLy8gQ29uY3VycmVudCBvcCByZXZpdmVzXG4gICAgLy8gbGV0IGFsaWNlUmVnaXN0ZXIgPSBhbGljZUpzb24uZ2V0KFwicmVnaXN0ZXJcIikgYXMgSW50UmVnaXN0ZXJDcmR0O1xuICAgIC8vIGFsaWNlSnNvbi5yZXNldCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSwgdW5kZWZpbmVkKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgLy8gYm9iUmVnaXN0ZXIuYWRkKDUpO1xuICAgIC8vIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iSnNvbi5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VKc29uLmdldChcInJlZ2lzdGVyXCIpKTtcbiAgICAvLyBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3Rlci52YWx1ZSwgNSk7XG4gICAgLy9cbiAgICAvLyAvLyBDYXVzYWxseSBsYXRlciBvcCByZXZpdmVzXG4gICAgLy8gYm9iSnNvbi5yZXNldCgpO1xuICAgIC8vIGJvYlJlZ2lzdGVyLmFkZCg3KTtcbiAgICAvLyBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZUpzb24ua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYkpzb24ua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIC8vIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgNyk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIsIGFsaWNlSnNvbi5nZXQoXCJyZWdpc3RlclwiKSk7XG4gICAgLy8gYXNzZXJ0LmVxdWFsKGFsaWNlUmVnaXN0ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gVE9ETzogc3Ryb25nIGRlbGV0ZSwgc3Ryb25nIHJlc2V0cywgbmVzdGluZz9cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SnNvbkNvbnZlcnNpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJ0ZXN0SnNvbk1hcEZlYXR1cmVzKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VKc29uID0gbmV3IEpzb25DcmR0KFwianNvbjJcIiwgYWxpY2UpO1xuICAgIGxldCBib2JKc29uID0gbmV3IEpzb25DcmR0KFwianNvbjJcIiwgYm9iKTtcblxuICAgIGxldCB0ZXN0T2JqID0ge1xuICAgICAgICBcInRvcGljXCI6IFwiZ2FtZXNcIixcbiAgICAgICAgXCJyZXZpZXdzXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtb25vcG9seVwiLCBcInJhdGluZ1wiOiA3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWZlXCIsIFwicmF0aW5nXCI6IDZ9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIGxldCBuZXN0ZWRPYmogPSB7XG4gICAgICAgIFwidG9waWNcIjogXCJuZXN0aW5nXCIsXG4gICAgICAgIFwibmVzdGVkXCI6IHRlc3RPYmpcbiAgICB9O1xuICAgIGFsaWNlSnNvbi52YWx1ZSA9IG5lc3RlZE9iajtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhcImFsaWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgY29uc29sZS5sb2coXCJib2I6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZUpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYkpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcblxuICAgIGJvYkpzb24uc2V0VmFsdWUoXCJmbGFnXCIsIHRydWUpO1xuICAgIChuZXN0ZWRPYmogYXMgYW55KS5mbGFnID0gdHJ1ZTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBjb25zb2xlLmxvZyhcImFsaWNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFsaWNlSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgY29uc29sZS5sb2coXCJib2I6IFwiICsgSlNPTi5zdHJpbmdpZnkoYm9iSnNvbi5nZXRBc09iamVjdChKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHRydWUpKSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZUpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGJvYkpzb24uZ2V0QXNPYmplY3QoSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCB0cnVlKSwgbmVzdGVkT2JqKTtcblxuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbnRlc3RKc29uTWFwRmVhdHVyZXMoKTtcbnRlc3RKc29uQ29udmVyc2lvbigpO1xuXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1NldFxuZnVuY3Rpb24gaXNTdXBlcnNldDxUPihzZXQ6IFNldDxUPiwgc3Vic2V0OiBTZXQ8VD4pIHtcbiAgICBmb3IgKGxldCBlbGVtIG9mIHN1YnNldCkge1xuICAgICAgICBpZiAoIXNldC5oYXMoZWxlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5mdW5jdGlvbiBzZXRFcXVhbHM8VD4oc2V0MTogU2V0PFQ+LCBzZXQyOiBTZXQ8VD4pIHtcbiAgICByZXR1cm4gaXNTdXBlcnNldChzZXQxLCBzZXQyKSAmJiBpc1N1cGVyc2V0KHNldDIsIHNldDEpO1xufVxuZnVuY3Rpb24gYXNzZXJ0U2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgaWYoIXNldEVxdWFscyhzZXQxLCBzZXQyKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZXRFcXVhbHMgZmFpbGVkLCBhY3R1YWw6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQxLnZhbHVlcygpXSkgKyBcIiwgZXhwZWN0ZWQ6IFwiICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFsuLi5zZXQyLnZhbHVlcygpXSkpO1xuICAgIH1cbiAgICBhc3NlcnQoc2V0RXF1YWxzKHNldDEsIHNldDIpKTtcbn1cbiIsImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7VGVzdGluZ1J1bnRpbWVHZW5lcmF0b3J9IGZyb20gXCIuLi9ydW50aW1lX2Zvcl90ZXN0aW5nXCI7XG5pbXBvcnQge0ludFJlZ2lzdGVyQ3JkdH0gZnJvbSBcIi4uLy4uL3NyYy9jcmR0cy9zdGFuZGFyZFwiO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0UmVzZXR0YWJsZUNvdW50ZXIoKSB7XG4gICAgLy8gVGVzdCBEZWZhdWx0UmVzZXR0YWJsZUNyZHQgYnkgdGVzdGluZyBJbnRSZWdpc3RlckNyZHQnc1xuICAgIC8vIGFkZCBhbmQgcmVzZXQgb3BlcmF0aW9ucywgc2luY2UgaXQncyBhIHNpbXBsZSBleGFtcGxlLlxuICAgIGNvbnNvbGUubG9nKFwidGVzdFJlc2V0dGFibGVDb3VudGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VDb3VudGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcInJlc2V0dGFibGVDb3VudGVySWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlQ291bnRlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JDb3VudGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcInJlc2V0dGFibGVDb3VudGVySWRcIiwgYm9iKTtcbiAgICBib2JDb3VudGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoMyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iQ291bnRlci5hZGQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIC0xKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQ291bnRlci52YWx1ZSwgLTEpO1xuXG4gICAgYWxpY2VDb3VudGVyLnZhbHVlID0gMTE7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTEpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlQ291bnRlci5hZGQoMik7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMSk7XG5cbiAgICBib2JDb3VudGVyLmFkZCgtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA2KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDgpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA4KTtcblxuICAgIC8vIE9ic2VydmVkIHJlc2V0IHRlc3RzXG4gICAgYWxpY2VDb3VudGVyLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgYm9iQ291bnRlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDcpO1xuXG4gICAgLy8gQ29uY3VycmVudCBhZGQgc2hvdWxkIHN1cnZpdmVcbiAgICBhbGljZUNvdW50ZXIucmVzZXQoKTtcbiAgICBib2JDb3VudGVyLmFkZCgxMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMTApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAxMCk7XG5cbiAgICAvLyBSZXNldC13aW5zIHRlc3RzXG4gICAgYm9iQ291bnRlci5yZXNldFN0cm9uZygpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlQ291bnRlci5hZGQoNik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgNik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDYpO1xuXG4gICAgLy8gQ29uY3VycmVudCBhZGQgc2hvdWxkIG5vdCBzdXJ2aXZlXG4gICAgYWxpY2VDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgYm9iQ291bnRlci5hZGQoMjApO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCAwKTtcblxuICAgIC8vIExvdHMgb2YgY29uY3VycmVuY3lcbiAgICBhbGljZUNvdW50ZXIuYWRkKDMpO1xuICAgIGJvYkNvdW50ZXIuYWRkKDcpO1xuICAgIGFsaWNlQ291bnRlci5yZXNldCgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZShib2IpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUNvdW50ZXIudmFsdWUsIDcpO1xuICAgIGFzc2VydC5lcXVhbChib2JDb3VudGVyLnZhbHVlLCA3KTtcbiAgICBib2JDb3VudGVyLnJlc2V0U3Ryb25nKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlQ291bnRlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkNvdW50ZXIudmFsdWUsIDApO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdFJlc2V0dGFibGVDb3VudGVyKCk7XG4iLCJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQge1Rlc3RpbmdSdW50aW1lR2VuZXJhdG9yfSBmcm9tIFwiLi4vcnVudGltZV9mb3JfdGVzdGluZ1wiO1xuaW1wb3J0IHsgRW5hYmxlV2luc0ZsYWcsIERpc2FibGVXaW5zRmxhZywgSW50UmVnaXN0ZXJDcmR0LCBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQsIEFkZFdpbnNTZXQsIENyZHRPYmplY3QsIE1hcENyZHQsIE9ydGhvZ29uYWxDcmR0IH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRzL3N0YW5kYXJkJztcbmltcG9ydCB7IENyZHRSdW50aW1lIH0gZnJvbSAnLi4vLi4vc3JjL2NyZHRfcnVudGltZV9pbnRlcmZhY2UnO1xuXG5sZXQgcnVudGltZUdlbiA9IG5ldyBUZXN0aW5nUnVudGltZUdlbmVyYXRvcigpO1xubGV0IGFsaWNlID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYWxpY2VcIik7XG5sZXQgYm9iID0gcnVudGltZUdlbi5uZXdSdW50aW1lKFwiYm9iXCIpO1xuXG5mdW5jdGlvbiB0ZXN0RXdGbGFnKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEV3RmxhZygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlRmxhZyA9IG5ldyBFbmFibGVXaW5zRmxhZyhcImV3RmxhZ0lkXCIsIGFsaWNlKTtcbiAgICBhbGljZUZsYWcub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBsZXQgYm9iRmxhZyA9IG5ldyBFbmFibGVXaW5zRmxhZyhcImV3RmxhZ0lkXCIsIGJvYik7XG4gICAgYm9iRmxhZy5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICsgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VGbGFnLmVuYWJsZWQsIGZhbHNlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCBmYWxzZSk7XG5cbiAgICBhbGljZUZsYWcuZW5hYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIGJvYkZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0RHdGbGFnKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdER3RmxhZygpLi4uXCIpO1xuXG4gICAgbGV0IGFsaWNlRmxhZyA9IG5ldyBEaXNhYmxlV2luc0ZsYWcoXCJkd0ZsYWdJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIGRpZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uKSk7XG4gICAgbGV0IGJvYkZsYWcgPSBuZXcgRGlzYWJsZVdpbnNGbGFnKFwiZHdGbGFnSWRcIiwgYm9iKTtcbiAgICBib2JGbGFnLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBkaWQgXCIgKyBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG5cbiAgICBhbGljZUZsYWcuZGlzYWJsZSgpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuICAgIGFzc2VydC5lcXVhbChib2JGbGFnLmVuYWJsZWQsIGZhbHNlKTtcblxuICAgIGJvYkZsYWcuZW5hYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCB0cnVlKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iRmxhZy5lbmFibGVkLCB0cnVlKTtcblxuICAgIGFsaWNlRmxhZy5kaXNhYmxlKCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgYWxpY2VGbGFnLmVuYWJsZSgpO1xuICAgIGJvYkZsYWcuZGlzYWJsZSgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUZsYWcuZW5hYmxlZCwgdHJ1ZSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlRmxhZy5lbmFibGVkLCBmYWxzZSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkZsYWcuZW5hYmxlZCwgZmFsc2UpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEludFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEludFJlZ2lzdGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkXCIsIGFsaWNlKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBsZXQgYm9iSW50UmVnaXN0ZXIgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiaW50UmVnaXN0ZXJJZFwiLCBib2IpO1xuICAgIGJvYkludFJlZ2lzdGVyLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYjogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG5cbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgzKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAzKTtcblxuICAgIGJvYkludFJlZ2lzdGVyLm11bHQoLTQpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTEyKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDcpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdHNcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgyKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTUpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCg1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgLTMpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTI1KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGFzc2VydC5lcXVhbChib2JJbnRSZWdpc3Rlci52YWx1ZSwgLTE1KTtcbiAgICBjb25zb2xlLmxvZyhcIi4uLm9rXCIpO1xufVxuXG5mdW5jdGlvbiB0ZXN0RnJvbVBhcGVyKCkge1xuICAgIC8vIFRoZSArL3ggZXhhbXBsZSBmcm9tIHRoZSBmaWd1cmUgaW4gdGhlIHBhcGVyXG4gICAgY29uc29sZS5sb2coXCJ0ZXN0RnJvbVBhcGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkMlwiLCBhbGljZSwgMSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQyXCIsIGJvYiwgMSk7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIubXVsdCgyKTtcbiAgICBhbGljZUludFJlZ2lzdGVyLmFkZCgxKTtcbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDMpO1xuICAgIGJvYkludFJlZ2lzdGVyLmFkZCg0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAxNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAxNyk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdFVucmVzZXR0YWJsZUludFJlZ2lzdGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEludFJlZ2lzdGVyKCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VJbnRSZWdpc3RlciA9IG5ldyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQoXCJpbnRSZWdpc3RlcklkM1wiLCBhbGljZSk7XG4gICAgYWxpY2VJbnRSZWdpc3Rlci5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBcIiArXG4gICAgICAgIGV2ZW50LmRlc2NyaXB0aW9uWzBdICsgXCJlZCBcIiArIGV2ZW50LmRlc2NyaXB0aW9uWzFdKSk7XG4gICAgbGV0IGJvYkludFJlZ2lzdGVyID0gbmV3IFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdChcImludFJlZ2lzdGVySWQzXCIsIGJvYik7XG4gICAgYm9iSW50UmVnaXN0ZXIub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VJbnRSZWdpc3Rlci52YWx1ZSwgMCk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAwKTtcblxuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIDMpO1xuXG4gICAgYm9iSW50UmVnaXN0ZXIubXVsdCgtNCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xMik7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTIpO1xuXG4gICAgYWxpY2VJbnRSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iSW50UmVnaXN0ZXIudmFsdWUsIC01KTtcblxuICAgIC8vIE91dCBvZiBvcmRlciB0ZXN0c1xuICAgIGFsaWNlSW50UmVnaXN0ZXIuYWRkKDIpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtNSk7XG5cbiAgICBib2JJbnRSZWdpc3Rlci5tdWx0KDUpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUludFJlZ2lzdGVyLnZhbHVlLCAtMyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMjUpO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlSW50UmVnaXN0ZXIudmFsdWUsIC0xNSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkludFJlZ2lzdGVyLnZhbHVlLCAtMTUpO1xuICAgIGNvbnNvbGUubG9nKFwiLi4ub2tcIik7XG59XG5cbmZ1bmN0aW9uIHRlc3RPcnRob2dvbmFsKCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdE9ydGhvZ29uYWwoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU9ydGhvZ29uYWwgPSBuZXcgT3J0aG9nb25hbENyZHQoXCJvcnRob2dvbmFsSWRcIiwgYWxpY2UpO1xuICAgIGFsaWNlT3J0aG9nb25hbC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZTogXCIgKyBldmVudC50aW1lc3RhbXAuZ2V0U2VuZGVyKCkgKyBcIiBzZXQgdG8gXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvbikpO1xuICAgIGxldCBib2JPcnRob2dvbmFsID0gbmV3IE9ydGhvZ29uYWxDcmR0KFwib3J0aG9nb25hbElkXCIsIGJvYik7XG4gICAgYm9iT3J0aG9nb25hbC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgc2V0IHRvIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb24pKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFsxLCBmYWxzZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzEsIGZhbHNlXSk7XG5cbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKDEwKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzExICUgKDIqTWF0aC5QSSksIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMTEgJSAoMipNYXRoLlBJKSwgZmFsc2VdKTtcbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKC0xMCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG5cbiAgICBib2JPcnRob2dvbmFsLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWxpY2VPcnRob2dvbmFsLnZhbHVlLCBbMipNYXRoLlBJIC0gMSwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzIqTWF0aC5QSSAtIDEsIHRydWVdKTtcblxuICAgIGFsaWNlT3J0aG9nb25hbC5yb3RhdGUoMS41KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFsaWNlT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzAuNSwgdHJ1ZV0pO1xuXG4gICAgYm9iT3J0aG9nb25hbC5yZWZsZWN0KDAuNSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFswLjUsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMC41LCBmYWxzZV0pO1xuXG4gICAgLy8gT3V0IG9mIG9yZGVyIHRlc3RzXG4gICAgYWxpY2VPcnRob2dvbmFsLnJlc2V0KCk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFswLCBmYWxzZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzAsIGZhbHNlXSk7XG5cbiAgICBhbGljZU9ydGhvZ29uYWwucm90YXRlKE1hdGguUEkvMik7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFtNYXRoLlBJLzIsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgZmFsc2VdKTtcblxuICAgIGJvYk9ydGhvZ29uYWwucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFtNYXRoLlBJLzIsIGZhbHNlXSk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChib2JPcnRob2dvbmFsLnZhbHVlLCBbMCwgdHJ1ZV0pO1xuXG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhbGljZU9ydGhvZ29uYWwudmFsdWUsIFszKk1hdGguUEkvMiwgdHJ1ZV0pO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYm9iT3J0aG9nb25hbC52YWx1ZSwgWzMqTWF0aC5QSS8yLCB0cnVlXSk7XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuY2xhc3MgQmlDb3VudGVyIGV4dGVuZHMgQ3JkdE9iamVjdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD4ge1xuICAgIGE6IEludFJlZ2lzdGVyQ3JkdDtcbiAgICBiOiBJbnRSZWdpc3RlckNyZHQ7XG4gICAgY29uc3RydWN0b3IoY3JkdElkOiBhbnksIHJ1bnRpbWU6IENyZHRSdW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmEgPSBuZXcgSW50UmVnaXN0ZXJDcmR0KFwiYVwiLCB0aGlzLCAxKTtcbiAgICAgICAgdGhpcy5iID0gbmV3IEludFJlZ2lzdGVyQ3JkdChcImJcIiwgdGhpcywgMSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RDcmR0T2JqZWN0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdENyZHRPYmplY3QoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZUJpID0gbmV3IEJpQ291bnRlcihcImJpSWRcIiwgYWxpY2UpO1xuICAgIGxldCBib2JCaSA9IG5ldyBCaUNvdW50ZXIoXCJiaUlkXCIsIGJvYik7XG5cbiAgICAvLyBEbyB0ZXN0RnJvbVBhcGVyKCkgb24gZWFjaCBjb3VudGVyXG4gICAgYWxpY2VCaS5hLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkFsaWNlIGE6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGJvYkJpLmEub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQm9iIGE6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgXCIgK1xuICAgICAgICBldmVudC5kZXNjcmlwdGlvblswXSArIFwiZWQgXCIgKyBldmVudC5kZXNjcmlwdGlvblsxXSkpO1xuICAgIGFsaWNlQmkuYi5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJBbGljZSBiOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBib2JCaS5iLm9uY2hhbmdlID0gKGV2ZW50ID0+IGNvbnNvbGUubG9nKFxuICAgICAgICBcIkJvYiBiOiBcIiArIGV2ZW50LnRpbWVzdGFtcC5nZXRTZW5kZXIoKSArIFwiIFwiICtcbiAgICAgICAgZXZlbnQuZGVzY3JpcHRpb25bMF0gKyBcImVkIFwiICsgZXZlbnQuZGVzY3JpcHRpb25bMV0pKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAxKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgMSk7XG5cbiAgICBhbGljZUJpLmEubXVsdCgyKTtcbiAgICBhbGljZUJpLmEuYWRkKDEpO1xuICAgIGJvYkJpLmEubXVsdCgzKTtcbiAgICBib2JCaS5hLmFkZCg0KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAzKTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYS52YWx1ZSwgNyk7XG5cbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VCaS5hLnZhbHVlLCAxNyk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYkJpLmEudmFsdWUsIDE3KTtcblxuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDEpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCAxKTtcblxuICAgIGFsaWNlQmkuYi5tdWx0KDIpO1xuICAgIGFsaWNlQmkuYi5hZGQoMSk7XG4gICAgYm9iQmkuYi5tdWx0KDMpO1xuICAgIGJvYkJpLmIuYWRkKDQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDMpO1xuICAgIGFzc2VydC5lcXVhbChib2JCaS5iLnZhbHVlLCA3KTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZUJpLmIudmFsdWUsIDE3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iQmkuYi52YWx1ZSwgMTcpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdEF3U2V0KCkge1xuICAgIGNvbnNvbGUubG9nKFwidGVzdEF3U2V0KCkuLi5cIik7XG5cbiAgICBsZXQgYWxpY2VTZXQgPSBuZXcgQWRkV2luc1NldDxzdHJpbmc+KFwiYXdTZXRJZFwiLCBhbGljZSk7XG4gICAgYWxpY2VTZXQub25jaGFuZ2UgPSAoZXZlbnQgPT4gY29uc29sZS5sb2coXG4gICAgICAgIFwiQWxpY2U6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICtcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGxldCBib2JTZXQgPSBuZXcgQWRkV2luc1NldDxzdHJpbmc+KFwiYXdTZXRJZFwiLCBib2IpO1xuICAgIGJvYlNldC5vbmNoYW5nZSA9IChldmVudCA9PiBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJCb2I6IFwiICsgZXZlbnQudGltZXN0YW1wLmdldFNlbmRlcigpICsgXCIgZGlkIFwiICtcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRlc2NyaXB0aW9uKSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldCgpKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KCkpO1xuXG4gICAgYWxpY2VTZXQuYWRkKFwiZWxlbWVudFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiXSkpO1xuXG4gICAgYm9iU2V0LmFkZChcIjdcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuXG4gICAgYWxpY2VTZXQuYWRkKFwiN1wiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcImVsZW1lbnRcIiwgXCI3XCJdKSk7XG5cbiAgICAvLyBPdXQgb2Ygb3JkZXIgdGVzdFxuICAgIGFsaWNlU2V0LmFkZChcImZpcnN0XCIpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiXSkpO1xuXG4gICAgYm9iU2V0LmFkZChcInNlY29uZFwiKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIiwgXCJmaXJzdFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiZWxlbWVudFwiLCBcIjdcIiwgXCJzZWNvbmRcIl0pKTtcblxuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJlbGVtZW50XCIsIFwiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICAvLyBEZWxldGUgdGVzdHMgb24gc2luZ2xlIGVsZW1lbnQgKGNvcHlpbmcgRXdGbGFnIHRlc3RzKVxuICAgIGFsaWNlU2V0LmRlbGV0ZShcImVsZW1lbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBib2JTZXQuZGVsZXRlKFwibm9uZXhpc3RlbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiN1wiLCBcImZpcnN0XCIsIFwic2Vjb25kXCJdKSk7XG5cbiAgICBhbGljZVNldC5hZGQoXCJjb25jdXJyZW50XCIpO1xuICAgIGFsaWNlU2V0LmRlbGV0ZShcImNvbmN1cnJlbnRcIik7XG4gICAgYm9iU2V0LmFkZChcImNvbmN1cnJlbnRcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiLCBcImNvbmN1cnJlbnRcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcIjdcIiwgXCJmaXJzdFwiLCBcInNlY29uZFwiLCBcImNvbmN1cnJlbnRcIl0pKTtcbiAgICAvLyBUT0RPOiB0ZXN0IGRlbGV0ZVN0cm9uZ1xuXG4gICAgLy8gT2JzZXJ2ZWQtcmVzZXQgdGVzdFxuICAgIGJvYlNldC5yZXNldCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoKSk7XG4gICAgYWxpY2VTZXQuYWRkKFwic3Vydml2b3JcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VTZXQudmFsdWVzKCkpLCBuZXcgU2V0KFtcInN1cnZpdm9yXCJdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iU2V0LnZhbHVlcygpKSwgbmV3IFNldChbXCJzdXJ2aXZvclwiXSkpO1xuICAgIC8vXG4gICAgLy8gLy8gUmVzZXQtd2lucyB0ZXN0XG4gICAgLy8gYWxpY2VTZXQucmVzZXRTdHJvbmcoKTtcbiAgICAvLyBhbGljZVNldC5hZGQoXCJhbGljZSdzXCIpO1xuICAgIC8vIGJvYlNldC5yZXNldCgpO1xuICAgIC8vIGJvYlNldC5hZGQoXCJib2Inc1wiKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYm9iJ3NcIl0pKTtcbiAgICAvLyBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICAvLyBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZVNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuICAgIC8vIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYlNldC52YWx1ZXMoKSksIG5ldyBTZXQoW1wiYWxpY2Unc1wiXSkpO1xuXG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxuZnVuY3Rpb24gdGVzdE1hcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInRlc3RNYXAoKS4uLlwiKTtcblxuICAgIGxldCBhbGljZU1hcCA9IG5ldyBNYXBDcmR0PHN0cmluZywgSW50UmVnaXN0ZXJDcmR0PihcIm1hcFwiLCBhbGljZSxcbiAgICAgICAgICAgIChrZXk6IHN0cmluZywgaW50ZXJuYWxSdW50aW1lOiBDcmR0UnVudGltZSkgPT4gbmV3IEludFJlZ2lzdGVyQ3JkdChrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgIGxldCBib2JNYXAgPSBuZXcgTWFwQ3JkdDxzdHJpbmcsIEludFJlZ2lzdGVyQ3JkdD4oXCJtYXBcIiwgYm9iLFxuICAgICAgICAgICAgKGtleTogc3RyaW5nLCBpbnRlcm5hbFJ1bnRpbWU6IENyZHRSdW50aW1lKSA9PiBuZXcgSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG5cbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcblxuICAgIC8vIEluaXRzIGdvIHRocm91Z2hcbiAgICBhbGljZU1hcC5pbml0KFwidGVzdFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInRlc3RcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXCJ0ZXN0XCJdKSk7XG4gICAgYXNzZXJ0KGFsaWNlTWFwLmhhcyhcInRlc3RcIikpO1xuICAgIGFzc2VydChib2JNYXAuaGFzKFwidGVzdFwiKSk7XG5cbiAgICBsZXQgYWxpY2VUZXN0ID0gYWxpY2VNYXAuZ2V0KFwidGVzdFwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGFsaWNlVGVzdCk7XG4gICAgbGV0IGJvYlRlc3QgPSBib2JNYXAuZ2V0KFwidGVzdFwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYXNzZXJ0KGJvYlRlc3QpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVRlc3QudmFsdWUsIDApO1xuICAgIGFzc2VydC5lcXVhbChib2JUZXN0LnZhbHVlLCAwKTtcblxuICAgIC8vIFZhbHVlIG9wcyB3b3JrXG4gICAgYWxpY2VUZXN0LmFkZCgzKTtcbiAgICBib2JUZXN0LmFkZCg0KTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VUZXN0LnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYm9iVGVzdC52YWx1ZSwgNyk7XG5cbiAgICAvLyBEZWxldGUgd29ya3NcbiAgICBib2JNYXAuZGVsZXRlKFwidGVzdFwiKTtcbiAgICBydW50aW1lR2VuLnJlbGVhc2VBbGwoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYm9iTWFwLmtleXMoKSksIG5ldyBTZXQoW10pKTtcbiAgICBhc3NlcnQoYWxpY2VNYXAuZ2V0KFwidGVzdFwiKSA9PT0gdW5kZWZpbmVkKTtcbiAgICBhc3NlcnQoYm9iTWFwLmdldChcInRlc3RcIikgPT09IHVuZGVmaW5lZCk7XG5cbiAgICBhbGljZU1hcC5pbml0KFwicmVnaXN0ZXJcIik7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG5cbiAgICAvLyBDb25jdXJyZW50IG9wZXJhdGlvbiByZXZpdmVzIGtleVxuICAgIGxldCBib2JSZWdpc3RlciA9IGJvYk1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VNYXAuZGVsZXRlKFwicmVnaXN0ZXJcIik7XG4gICAgYm9iUmVnaXN0ZXIuYWRkKDMpO1xuICAgIHJ1bnRpbWVHZW4ucmVsZWFzZUFsbCgpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGFsaWNlTWFwLmtleXMoKSksIG5ldyBTZXQoW1wicmVnaXN0ZXJcIl0pKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChib2JNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydC5lcXVhbChib2JSZWdpc3Rlci52YWx1ZSwgMyk7XG4gICAgYXNzZXJ0LmVxdWFsKChhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQpLnZhbHVlLCAzKTtcblxuICAgIC8vIFJlc2V0IHRlc3RzXG4gICAgLy8gQ29uY3VycmVudCBvcCByZXZpdmVzXG4gICAgbGV0IGFsaWNlUmVnaXN0ZXIgPSBhbGljZU1hcC5nZXQoXCJyZWdpc3RlclwiKSBhcyBJbnRSZWdpc3RlckNyZHQ7XG4gICAgYWxpY2VNYXAucmVzZXQoKTtcbiAgICBhc3NlcnRTZXRFcXVhbHMobmV3IFNldChhbGljZU1hcC5rZXlzKCkpLCBuZXcgU2V0KFtdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGFsaWNlTWFwLmdldChcInJlZ2lzdGVyXCIpLCB1bmRlZmluZWQpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCAwKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoNSk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA1KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA1KTtcblxuICAgIC8vIENhdXNhbGx5IGxhdGVyIG9wIHJldml2ZXNcbiAgICBib2JNYXAucmVzZXQoKTtcbiAgICBib2JSZWdpc3Rlci5hZGQoNyk7XG4gICAgcnVudGltZUdlbi5yZWxlYXNlQWxsKCk7XG4gICAgYXNzZXJ0U2V0RXF1YWxzKG5ldyBTZXQoYWxpY2VNYXAua2V5cygpKSwgbmV3IFNldChbXCJyZWdpc3RlclwiXSkpO1xuICAgIGFzc2VydFNldEVxdWFscyhuZXcgU2V0KGJvYk1hcC5rZXlzKCkpLCBuZXcgU2V0KFtcInJlZ2lzdGVyXCJdKSk7XG4gICAgYXNzZXJ0LmVxdWFsKGJvYlJlZ2lzdGVyLnZhbHVlLCA3KTtcbiAgICBhc3NlcnQuZXF1YWwoYWxpY2VSZWdpc3RlciwgYWxpY2VNYXAuZ2V0KFwicmVnaXN0ZXJcIikpO1xuICAgIGFzc2VydC5lcXVhbChhbGljZVJlZ2lzdGVyLnZhbHVlLCA3KTtcblxuICAgIC8vIFRPRE86IHN0cm9uZyBkZWxldGUsIHN0cm9uZyByZXNldHMsIG5lc3Rpbmc/XG4gICAgY29uc29sZS5sb2coXCIuLi5va1wiKTtcbn1cblxudGVzdEV3RmxhZygpO1xudGVzdER3RmxhZygpO1xudGVzdEludFJlZ2lzdGVyKCk7XG50ZXN0RnJvbVBhcGVyKCk7XG50ZXN0VW5yZXNldHRhYmxlSW50UmVnaXN0ZXIoKTtcbnRlc3RPcnRob2dvbmFsKCk7XG50ZXN0Q3JkdE9iamVjdCgpO1xudGVzdEF3U2V0KCk7XG50ZXN0TWFwKCk7XG5cblxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TZXRcbmZ1bmN0aW9uIGlzU3VwZXJzZXQ8VD4oc2V0OiBTZXQ8VD4sIHN1YnNldDogU2V0PFQ+KSB7XG4gICAgZm9yIChsZXQgZWxlbSBvZiBzdWJzZXQpIHtcbiAgICAgICAgaWYgKCFzZXQuaGFzKGVsZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuZnVuY3Rpb24gc2V0RXF1YWxzPFQ+KHNldDE6IFNldDxUPiwgc2V0MjogU2V0PFQ+KSB7XG4gICAgcmV0dXJuIGlzU3VwZXJzZXQoc2V0MSwgc2V0MikgJiYgaXNTdXBlcnNldChzZXQyLCBzZXQxKTtcbn1cbmZ1bmN0aW9uIGFzc2VydFNldEVxdWFsczxUPihzZXQxOiBTZXQ8VD4sIHNldDI6IFNldDxUPikge1xuICAgIGlmKCFzZXRFcXVhbHMoc2V0MSwgc2V0MikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2V0RXF1YWxzIGZhaWxlZCwgYWN0dWFsOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0MS52YWx1ZXMoKV0pICsgXCIsIGV4cGVjdGVkOiBcIiArXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShbLi4uc2V0Mi52YWx1ZXMoKV0pKTtcbiAgICB9XG4gICAgYXNzZXJ0KHNldEVxdWFscyhzZXQxLCBzZXQyKSk7XG59XG4iLCJpbXBvcnQge0NyZHRSdW50aW1lLCBDcmR0TWVzc2FnZUxpc3RlbmVyLCBDYXVzYWxUaW1lc3RhbXB9IGZyb20gXCIuLi9zcmMvY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiO1xuXG5jbGFzcyBUZXN0aW5nUnVudGltZSBpbXBsZW1lbnRzIENyZHRSdW50aW1lIHtcbiAgICBsaXN0ZW5lcnNCeUlkID0gbmV3IE1hcDxhbnksIENyZHRNZXNzYWdlTGlzdGVuZXI+KCk7XG4gICAgdmVjdG9yQ2xvY2sgPSBuZXcgTWFwPGFueSwgbnVtYmVyPigpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2VuZXJhdG9yIDogVGVzdGluZ1J1bnRpbWVHZW5lcmF0b3IsXG4gICAgICAgICAgICBwcml2YXRlIHJlcGxpY2FJZCA6IGFueSkge1xuICAgICAgICB0aGlzLnZlY3RvckNsb2NrLnNldChyZXBsaWNhSWQsIDApO1xuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2U6IGFueSwgY3JkdElkOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52ZWN0b3JDbG9jay5zZXQodGhpcy5yZXBsaWNhSWQsIHRoaXMudmVjdG9yQ2xvY2suZ2V0KFxuICAgICAgICAgICAgdGhpcy5yZXBsaWNhSWQpIGFzIG51bWJlciArIDFcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IG15UmVwbGljYUlkID0gdGhpcy5yZXBsaWNhSWQ7XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgTWFwKHRoaXMudmVjdG9yQ2xvY2spO1xuICAgICAgICBsZXQgdGltZXN0YW1wID0ge1xuICAgICAgICAgICAgZ2V0U2VuZGVyKCkgeyByZXR1cm4gbXlSZXBsaWNhSWQ7IH0sXG4gICAgICAgICAgICBnZXRTZW5kZXJDb3VudGVyKCkgeyByZXR1cm4gdmNDb3B5LmdldCh0aGlzLmdldFNlbmRlcigpKSBhcyBudW1iZXI7fSxcbiAgICAgICAgICAgIGFzVmVjdG9yQ2xvY2soKSB7IHJldHVybiB2Y0NvcHk7IH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVldWVNYXAgPSB0aGlzLmdlbmVyYXRvci5tZXNzYWdlUXVldWVzLmdldCh0aGlzKSBhc1xuICAgICAgICAgICAgTWFwPFRlc3RpbmdSdW50aW1lLCBBcnJheTxbYW55LCBhbnksIENhdXNhbFRpbWVzdGFtcF0+PjtcbiAgICAgICAgZm9yIChsZXQgcXVldWUgb2YgcXVldWVNYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIC8vIFVzZSBkaWZmZXJlbnQgY29waWVzIGZvciBlYWNoIENyZHQsIGluIGNhc2UgdGhleVxuICAgICAgICAgICAgLy8gbW9kaWZ5IG1lc3NhZ2Ugd2hpbGUgcHJvY2Vzc2luZyBpdFxuICAgICAgICAgICAgcXVldWUucHVzaChbSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSksIGNyZHRJZCwgdGltZXN0YW1wXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lcjogQ3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsaWNhSWQ7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoKSB7XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgTWFwKHRoaXMudmVjdG9yQ2xvY2spO1xuICAgICAgICB2Y0NvcHkuc2V0KHRoaXMucmVwbGljYUlkLCB0aGlzLnZlY3RvckNsb2NrLmdldChcbiAgICAgICAgICAgIHRoaXMucmVwbGljYUlkKSBhcyBudW1iZXIgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGxldCBteVJlcGxpY2FJZCA9IHRoaXMucmVwbGljYUlkO1xuICAgICAgICBsZXQgdGltZXN0YW1wID0ge1xuICAgICAgICAgICAgZ2V0U2VuZGVyKCkgeyByZXR1cm4gbXlSZXBsaWNhSWQ7IH0sXG4gICAgICAgICAgICBnZXRTZW5kZXJDb3VudGVyKCkgeyByZXR1cm4gdmNDb3B5LmdldCh0aGlzLmdldFNlbmRlcigpKSBhcyBudW1iZXI7fSxcbiAgICAgICAgICAgIGFzVmVjdG9yQ2xvY2soKSB7IHJldHVybiB2Y0NvcHk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY29sbGVjdGlvbiBvZiBDcmR0UnVudGltZXMgbGlua2VkIHRvZ2V0aGVyXG4gKiAoaS5lLiwgaW4tbWVtb3J5IG5ldHdvcmtpbmcpIHRoYXQgZGVsaXZlciBtZXNzYWdlc1xuICogd2hlbiByZWxlYXNlIGlzIGNhbGxlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RpbmdSdW50aW1lR2VuZXJhdG9yIHtcbiAgICBuZXdSdW50aW1lKHJlcGxpY2FJZD86IGFueSkgOiBUZXN0aW5nUnVudGltZSB7XG4gICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHVuZGVmaW5lZCkgcmVwbGljYUlkID0gdGhpcy5tZXNzYWdlUXVldWVzLnNpemU7XG4gICAgICAgIGxldCBydW50aW1lID0gbmV3IFRlc3RpbmdSdW50aW1lKHRoaXMsIHJlcGxpY2FJZCk7XG4gICAgICAgIGxldCBuZXdRdWV1ZSA9IG5ldyBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PGFueT4+KCk7XG4gICAgICAgIGZvciAobGV0IG9sZEVudHJ5IG9mIHRoaXMubWVzc2FnZVF1ZXVlcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIG5ld1F1ZXVlLnNldChvbGRFbnRyeVswXSwgW10pO1xuICAgICAgICAgICAgb2xkRW50cnlbMV0uc2V0KHJ1bnRpbWUsIFtdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lc3NhZ2VRdWV1ZXMuc2V0KHJ1bnRpbWUsIG5ld1F1ZXVlKTtcbiAgICAgICAgcmV0dXJuIHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIE1hcHMgc2VuZGVyIGFuZCByZWNpcGllbnQgdG8gYW4gYXJyYXkgb2YgcXVldWVkIFttZXNzYWdlLFxuICAgIC8vIGNyZHRJZCwgdGltZXN0YW1wXSB0dXBsZXMuXG4gICAgbWVzc2FnZVF1ZXVlcyA9IG5ldyBNYXA8VGVzdGluZ1J1bnRpbWUsXG4gICAgICAgIE1hcDxUZXN0aW5nUnVudGltZSwgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPj4+KCk7XG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBhbGwgcXVldWVkIG1lc3NhZ2VzIHNlbmRlciB0byB0aGUgc3BlY2lmaWVkIHJlY2lwaWVudHMuXG4gICAgICogSWYgcmVjaXBpZW50cyBhcmUgbm90IHNwZWNpZmllZCwgcmVsZWFzZXMgdGhlbSB0byBhbGxcbiAgICAgKiByZWNpcGllbnRzLiAgT25seSByZWNpcGllbnRzIHRoYXQgZXhpc3RlZCBhdCB0aGUgdGltZVxuICAgICAqIG9mIHNlbmRpbmcgd2lsbCByZWNlaXZlIGEgbWVzc2FnZS5cbiAgICAgKi9cbiAgICByZWxlYXNlKHNlbmRlcjogVGVzdGluZ1J1bnRpbWUsIC4uLnJlY2lwaWVudHM6IFRlc3RpbmdSdW50aW1lW10pIHtcbiAgICAgICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoID09PSAwKSByZWNpcGllbnRzID0gWy4uLnRoaXMubWVzc2FnZVF1ZXVlcy5rZXlzKCldO1xuICAgICAgICBsZXQgc2VuZGVyTWFwID0gdGhpcy5tZXNzYWdlUXVldWVzLmdldChzZW5kZXIpIGFzXG4gICAgICAgICAgICBNYXA8VGVzdGluZ1J1bnRpbWUsIEFycmF5PGFueT4+O1xuICAgICAgICBmb3IgKGxldCByZWNpcGllbnQgb2YgcmVjaXBpZW50cykge1xuICAgICAgICAgICAgaWYgKHJlY2lwaWVudCA9PT0gc2VuZGVyKSBjb250aW51ZTtcbiAgICAgICAgICAgIGZvciAobGV0IG1lc3NhZ2VQYWlyIG9mIChzZW5kZXJNYXAuZ2V0KHJlY2lwaWVudCkgYXMgQXJyYXk8W2FueSwgYW55LCBDYXVzYWxUaW1lc3RhbXBdPikpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSByZWNpcGllbnQubGlzdGVuZXJzQnlJZC5nZXQoXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VQYWlyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBDcmR0IHdpdGggaWQgXCIgKyBtZXNzYWdlUGFpclsxXSArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBvbiByZXBsaWNhIFwiICsgcmVjaXBpZW50LmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucmVjZWl2ZShtZXNzYWdlUGFpclswXSwgbWVzc2FnZVBhaXJbMl0pO1xuICAgICAgICAgICAgICAgIHJlY2lwaWVudC52ZWN0b3JDbG9jay5zZXQoc2VuZGVyLmdldFJlcGxpY2FJZCgpLCBtZXNzYWdlUGFpclsyXS5nZXRTZW5kZXJDb3VudGVyKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZGVyTWFwLnNldChyZWNpcGllbnQsIFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxlYXNlQWxsKCkge1xuICAgICAgICBmb3IgKGxldCBzZW5kZXIgb2YgdGhpcy5tZXNzYWdlUXVldWVzLmtleXMoKSkgdGhpcy5yZWxlYXNlKHNlbmRlcik7XG4gICAgfVxufVxuIiwiY29uc29sZS5sb2coXCJSdW5uaW5nIHRlc3RzXCIpO1xucmVxdWlyZSgnLi9jcmR0cy9iYXNpY19jcmR0c190ZXN0cycpO1xucmVxdWlyZSgnLi9jcmR0cy9yZXNldHRhYmxlX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL3N0YW5kYXJkX3Rlc3RzJyk7XG5yZXF1aXJlKCcuL2NyZHRzL2pzb25fdGVzdHMnKTtcblxuXG4vLyBjb25zdCBob3dMb25nVGlsbEx1bmNoID0gcmVxdWlyZSgnLi4nKTtcbi8vXG4vLyBjbGFzcyBNb2NrRGF0ZSB7XG4vLyBcdHByaXZhdGUgZGF0ZSA9IDA7XG4vLyBcdHByaXZhdGUgaG91cnMgPSAwO1xuLy8gXHRwcml2YXRlIG1pbnV0ZXMgPSAwO1xuLy8gXHRwcml2YXRlIHNlY29uZHMgPSAwO1xuLy8gXHRwcml2YXRlIG1pbGxpc2Vjb25kcyA9IDA7XG4vL1xuLy8gXHRnZXREYXRlICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kYXRlOyB9XG4vLyBcdHNldERhdGUgKGRhdGU6IG51bWJlcik6IHZvaWQgeyB0aGlzLmRhdGUgPSBkYXRlOyB9XG4vLyBcdHNldEhvdXJzIChoOiBudW1iZXIpIHsgdGhpcy5ob3VycyA9IGg7IH1cbi8vIFx0c2V0TWludXRlcyAobTogbnVtYmVyKTogdm9pZCB7IHRoaXMubWludXRlcyA9IG07IH1cbi8vIFx0c2V0U2Vjb25kcyAoczogbnVtYmVyKTogdm9pZCB7IHRoaXMuc2Vjb25kcyA9IHM7IH1cbi8vIFx0c2V0TWlsbGlzZWNvbmRzIChtczogbnVtYmVyKTogdm9pZCB7IHRoaXMubWlsbGlzZWNvbmRzID0gbXM7IH1cbi8vIFx0Z2V0VGltZSAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmFsdWVPZigpOyB9XG4vLyBcdHZhbHVlT2YgKCk6IG51bWJlciB7XG4vLyBcdFx0cmV0dXJuIChcbi8vIFx0XHRcdHRoaXMubWlsbGlzZWNvbmRzICtcbi8vIFx0XHRcdHRoaXMuc2Vjb25kcyAqIDFlMyArXG4vLyBcdFx0XHR0aGlzLm1pbnV0ZXMgKiAxZTMgKiA2MCArXG4vLyBcdFx0XHR0aGlzLmhvdXJzICogMWUzICogNjAgKiA2MCArXG4vLyBcdFx0XHR0aGlzLmRhdGUgKiAxZTMgKiA2MCAqIDYwICogMjRcbi8vIFx0XHQpO1xuLy8gXHR9XG4vL1xuLy8gXHRzdGF0aWMgbm93ICgpIHsgcmV0dXJuIG5vdy52YWx1ZU9mKCk7IH1cbi8vIH1cbi8vXG4vLyBjb25zdCBub3cgPSBuZXcgTW9ja0RhdGUoKTtcbi8vXG4vLyBnbG9iYWwuRGF0ZSA9IE1vY2tEYXRlIGFzIGFueSBhcyB0eXBlb2YgRGF0ZTtcbi8vXG4vLyBmdW5jdGlvbiB0ZXN0KGhvdXJzOiBudW1iZXIsIG1pbnV0ZXM6IG51bWJlciwgc2Vjb25kczogbnVtYmVyLCBleHBlY3RlZDogc3RyaW5nKTogdm9pZCB7XG4vLyBcdG5vdy5zZXRIb3Vycyhob3Vycyk7XG4vLyBcdG5vdy5zZXRNaW51dGVzKG1pbnV0ZXMpO1xuLy8gXHRub3cuc2V0U2Vjb25kcyhzZWNvbmRzKTtcbi8vXG4vLyBcdGFzc2VydC5lcXVhbChob3dMb25nVGlsbEx1bmNoKC4uLmx1bmNodGltZSksIGV4cGVjdGVkKTtcbi8vIFx0Y29uc29sZS5sb2coYFxcdTAwMUJbMzJt4pyTXFx1MDAxQlszOW0gJHtleHBlY3RlZH1gKTtcbi8vIH1cbi8vXG4vLyBsZXQgbHVuY2h0aW1lID0gWyAxMiwgMzAgXTtcbi8vIHRlc3QoMTEsIDMwLCAwLCAnMSBob3VyJyk7XG4vLyB0ZXN0KDEwLCAzMCwgMCwgJzIgaG91cnMnKTtcbi8vIHRlc3QoMTIsIDI1LCAwLCAnNSBtaW51dGVzJyk7XG4vLyB0ZXN0KDEyLCAyOSwgMTUsICc0NSBzZWNvbmRzJyk7XG4vLyB0ZXN0KDEzLCAzMCwgMCwgJzIzIGhvdXJzJyk7XG4vL1xuLy8gLy8gc29tZSBvZiB1cyBsaWtlIGFuIGVhcmx5IGx1bmNoXG4vLyBsdW5jaHRpbWUgPSBbIDExLCAwIF07XG4vLyB0ZXN0KDEwLCAzMCwgMCwgJzMwIG1pbnV0ZXMnKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=