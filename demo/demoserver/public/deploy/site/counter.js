window["compoventuals-demo"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/site/counter.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../client/build/index.js":
/*!********************************!*\
  !*** ../client/build/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crdts = __importStar(__webpack_require__(/*! ./src/crdts */ "../client/build/src/crdts/index.js"));
exports.network = __importStar(__webpack_require__(/*! ./src/network */ "../client/build/src/network/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../client/build/src/crdts/basic_crdts.js":
/*!************************************************!*\
  !*** ../client/build/src/crdts/basic_crdts.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiValueRegister = exports.MultiValueRegisterInternal = exports.GSetCrdt = exports.MultRegisterCrdt = exports.MultRegisterInternal = exports.CounterCrdt = exports.CounterInternal = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
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
    prepare(operation, _state, _replicaId) {
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
exports.MultiValueRegisterInternal = MultiValueRegisterInternal;
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
//# sourceMappingURL=basic_crdts.js.map

/***/ }),

/***/ "../client/build/src/crdts/crdt_core.js":
/*!**********************************************!*\
  !*** ../client/build/src/crdts/crdt_core.js ***!
  \**********************************************/
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
//# sourceMappingURL=crdt_core.js.map

/***/ }),

/***/ "../client/build/src/crdts/crdts2.js":
/*!*******************************************!*\
  !*** ../client/build/src/crdts/crdts2.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter2 = exports.Counter2AddEvent = exports.Crdt2 = void 0;
class CrdtMessage {
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
}
class Crdt2 {
    /**
     * @param id      An id for this CRDT.  All CRDTs using the
     * same CrdtRuntime must have distinct ids, and the ids must
     * be the same for all replicas of a given CRDT, in order
     * for the CrdtRuntime to route messages to them properly.
     * @param runtime The CrdtRuntime to use for sending and
     * receiving messages.
     */
    constructor(id, runtime) {
        this.id = id;
        this.runtime = runtime;
        this.runtime.register(this, this.id);
    }
    callRemote(method, ...args) {
        // Serialize the method name and args
        // Do this first in case calling method changes them
        let message = JSON.stringify(new CrdtMessage(method.name, args));
        // Call the local function
        let result = method(false, this.runtime.getNextTimestamp(this.id), ...args);
        // Send message on the network
        this.runtime.send(message, this.id);
        // Return local result
        return result;
    }
    /**
     * Callback for this.runtime when an atomic list of
     * messages is received from another replica.
     */
    receive(message, timestamp) {
        let messageObj = JSON.parse(message);
        if (!(messageObj instanceof CrdtMessage)) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            throw new Error("Failed to parse CrdtMessage: " + message);
        }
        // @ts-ignore: Call method by name
        let method = this[messageObj.method]();
        if (method === undefined) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            throw new Error("Unknown method called remotely: " + messageObj.method);
        }
        // TODO: Check type?  At least make sure it's a function?
        method(true, timestamp, messageObj.args);
    }
}
exports.Crdt2 = Crdt2;
class Counter2AddEvent {
    constructor(caller, timestamp, valueAdded, newValue) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.valueAdded = valueAdded;
        this.newValue = newValue;
        this.type = "add";
    }
}
exports.Counter2AddEvent = Counter2AddEvent;
class Counter2 extends Crdt2 {
    constructor(id, runtime, initialValue) {
        super(id, runtime);
        this.id = id;
        this.runtime = runtime;
        if (initialValue === undefined)
            this.state = 0;
        else
            this.state = initialValue;
    }
    remoteAdd(remoteCaller, timestamp, toAdd) {
        this.state += toAdd;
        if (remoteCaller && this.onchange) {
            this.onchange(new Counter2AddEvent(this, timestamp, toAdd, this.state));
        }
    }
    add(toAdd) {
        super.callRemote(this.remoteAdd.bind(this), toAdd);
    }
    get value() {
        return this.state;
    }
}
exports.Counter2 = Counter2;
//# sourceMappingURL=crdts2.js.map

/***/ }),

/***/ "../client/build/src/crdts/index.js":
/*!******************************************!*\
  !*** ../client/build/src/crdts/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./basic_crdts */ "../client/build/src/crdts/basic_crdts.js"), exports);
__exportStar(__webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js"), exports);
__exportStar(__webpack_require__(/*! ./json */ "../client/build/src/crdts/json.js"), exports);
//export * from './multi_semidirect';
__exportStar(__webpack_require__(/*! ./resettable */ "../client/build/src/crdts/resettable.js"), exports);
__exportStar(__webpack_require__(/*! ./semidirect */ "../client/build/src/crdts/semidirect.js"), exports);
__exportStar(__webpack_require__(/*! ./standard */ "../client/build/src/crdts/standard.js"), exports);
__exportStar(__webpack_require__(/*! ./crdts2 */ "../client/build/src/crdts/crdts2.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../client/build/src/crdts/json.js":
/*!*****************************************!*\
  !*** ../client/build/src/crdts/json.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCrdt = void 0;
const standard_1 = __webpack_require__(/*! ./standard */ "../client/build/src/crdts/standard.js");
const basic_crdts_1 = __webpack_require__(/*! ./basic_crdts */ "../client/build/src/crdts/basic_crdts.js");
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
//# sourceMappingURL=json.js.map

/***/ }),

/***/ "../client/build/src/crdts/resettable.js":
/*!***********************************************!*\
  !*** ../client/build/src/crdts/resettable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResettableCrdt = exports.ObservedResetComponent = exports.DefaultResetWinsCrdt = exports.ResetWinsComponent = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
const semidirect_1 = __webpack_require__(/*! ./semidirect */ "../client/build/src/crdts/semidirect.js");
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
//# sourceMappingURL=resettable.js.map

/***/ }),

/***/ "../client/build/src/crdts/semidirect.js":
/*!***********************************************!*\
  !*** ../client/build/src/crdts/semidirect.js ***!
  \***********************************************/
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
//# sourceMappingURL=semidirect.js.map

/***/ }),

/***/ "../client/build/src/crdts/standard.js":
/*!*********************************************!*\
  !*** ../client/build/src/crdts/standard.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCrdtInternal = exports.MapCrdt = exports.AddWinsSet = exports.CrdtObject = exports.GMapInternal = exports.DisableWinsFlag = exports.EnableWinsFlag = exports.NoOpCrdtInternal = exports.OrthogonalCrdt = exports.IntRegisterCrdt = exports.UnresettableIntRegisterCrdt = void 0;
const resettable_1 = __webpack_require__(/*! ./resettable */ "../client/build/src/crdts/resettable.js");
const basic_crdts_1 = __webpack_require__(/*! ./basic_crdts */ "../client/build/src/crdts/basic_crdts.js");
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
const semidirect_1 = __webpack_require__(/*! ./semidirect */ "../client/build/src/crdts/semidirect.js");
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
// TODO: make corresponding Crdt for use in CrdtObject's,
// so users don't have to worry about translating ops
// and to support bulk/RPC/homap ops.
class ArrayCrdtInternal {
    constructor(elementCrdt) {
        this.elementCrdt = elementCrdt;
    }
    /**
     * @param  initialData An array of initialData to
     * pass to each entry's create method.  The entries
     * may be undefined, in which case undefined will
     * be passed to the entry's create method.  In any
     * case, initialData.length is used to set the
     * length.
     * @return             [description]
     */
    create(initialData) {
        if (!Array.isArray(initialData)) {
            throw new Error("Not an array: " + initialData);
        }
        let state = [];
        state.length = initialData.length;
        for (let i = 0; i < initialData.length; i++) {
            state[i] = this.elementCrdt.create(initialData[i]);
        }
        return state;
    }
    /**
     * @param  operation [index, op]
     * @return message of the form [index, message]
     */
    prepare(operation, state, replicaId) {
        if (!(operation[0] >= 0 && operation[0] < state.length && Number.isInteger(operation[0]))) {
            throw new Error("Index out of bounds: " + operation[0]);
        }
        return [operation[0], this.elementCrdt.prepare(operation[1], state[1], replicaId)];
    }
    /**
     * Description format: [index, returned description]
     * (same as message).
     * @param  message    [index, message]
     */
    effect(message, state, replicaId, timestamp) {
        let desc;
        [state[message[0]], desc] = this.elementCrdt.effect(message[1], state[message[0]], replicaId, timestamp);
        return [state, [message[0], desc]];
    }
}
exports.ArrayCrdtInternal = ArrayCrdtInternal;
//# sourceMappingURL=standard.js.map

/***/ }),

/***/ "../client/build/src/network/crdt_network_runtime.js":
/*!***********************************************************!*\
  !*** ../client/build/src/network/crdt_network_runtime.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CrdtNetworkRuntime = exports.myMessage = void 0;
const vector_clock_1 = __webpack_require__(/*! ./vector_clock */ "../client/build/src/network/vector_clock.js");
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
//# sourceMappingURL=crdt_network_runtime.js.map

/***/ }),

/***/ "../client/build/src/network/crdt_runtime_interface.js":
/*!*************************************************************!*\
  !*** ../client/build/src/network/crdt_runtime_interface.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// First attempt at the interface between the runtime
// (causal broadcast network, etc.) and the CRDTs.
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=crdt_runtime_interface.js.map

/***/ }),

/***/ "../client/build/src/network/index.js":
/*!********************************************!*\
  !*** ../client/build/src/network/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./crdt_runtime_interface */ "../client/build/src/network/crdt_runtime_interface.js"), exports);
__exportStar(__webpack_require__(/*! ./crdt_network_runtime */ "../client/build/src/network/crdt_network_runtime.js"), exports);
__exportStar(__webpack_require__(/*! ./vector_clock */ "../client/build/src/network/vector_clock.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../client/build/src/network/vector_clock.js":
/*!***************************************************!*\
  !*** ../client/build/src/network/vector_clock.js ***!
  \***************************************************/
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
//# sourceMappingURL=vector_clock.js.map

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

/***/ "./src/site/counter.ts":
/*!*****************************!*\
  !*** ./src/site/counter.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// require('../test/test'); // run test.ts
const compoventuals_client_1 = __webpack_require__(/*! compoventuals-client */ "../client/build/index.js");
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
let client = new compoventuals_client_1.network.CrdtNetworkRuntime(client_uuid, HOST);
//let clientCounter = new crdts.CounterCrdt("counterId", client);
let clientCounter = new compoventuals_client_1.crdts.Counter2(client_uuid, client);
/* HTML variables */
var counter = document.getElementById("counter");
/* Customize the onchange() for CRDT as refresh the value */
clientCounter.onchange = (() => {
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


/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvY3JkdHMyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2pzb24uanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3N0YW5kYXJkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jb3VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELDZCQUE2QixtQkFBTyxDQUFDLHVEQUFhO0FBQ2xELCtCQUErQixtQkFBTyxDQUFDLDJEQUFlO0FBQ3RELGlDOzs7Ozs7Ozs7Ozs7QUN2QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJEQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7QUM3UWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQ2xQYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7O0FDM0ZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLCtEQUFlO0FBQ3BDLGFBQWEsbUJBQU8sQ0FBQywyREFBYTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsaURBQVE7QUFDN0I7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkRBQWM7QUFDbkMsYUFBYSxtQkFBTyxDQUFDLDZEQUFjO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyx5REFBWTtBQUNqQyxhQUFhLG1CQUFPLENBQUMscURBQVU7QUFDL0IsaUM7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMseURBQVk7QUFDdkMsc0JBQXNCLG1CQUFPLENBQUMsK0RBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7OztBQ3RjYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsNkRBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMElBQTBJLGFBQWEsV0FBVyxFQUFFO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDdlFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx1Q0FBdUM7QUFDdkMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDOVdhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywrREFBZTtBQUM3QyxvQkFBb0IsbUJBQU8sQ0FBQywyREFBYTtBQUN6QyxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7O0FDaHZCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsbUVBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7Ozs7OztBQ3pQYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxrRDs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsdUZBQTBCO0FBQy9DLGFBQWEsbUJBQU8sQ0FBQyxtRkFBd0I7QUFDN0MsYUFBYSxtQkFBTyxDQUFDLG1FQUFnQjtBQUNyQyxpQzs7Ozs7Ozs7Ozs7O0FDZmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDcklBLFNBQVMsbUJBQU8sQ0FBQyx1Q0FBTTtBQUN2QixTQUFTLG1CQUFPLENBQUMsdUNBQU07O0FBRXZCO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqQ0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFXO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLGlFQUFtQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzVHQSxVQUFVLG1CQUFPLENBQUMseURBQVc7QUFDN0Isa0JBQWtCLG1CQUFPLENBQUMsaUVBQW1COztBQUU3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBLDBDQUEwQztBQUMxQywyR0FBc0Q7QUFDdEQsK0VBQWtDO0FBRWxDOztHQUVHO0FBQ0gsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztBQUVqRDs7R0FFRztBQUNILE1BQU0sV0FBVyxHQUFZLFNBQUksRUFBRSxDQUFDO0FBRXBDOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsSUFBSSw4QkFBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRCxpRUFBaUU7QUFDakUsSUFBSSxhQUFhLEdBQUcsSUFBSSw0QkFBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFNUQsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFakQsNERBQTREO0FBQzVELGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDM0IsT0FBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUFBLENBQUMsQ0FBQyxDQUFDO0FBRTFELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsSUFBSSIsImZpbGUiOiJkZXBsb3kvc2l0ZS9jb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2l0ZS9jb3VudGVyLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmR0cyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY3JkdHNcIikpO1xuZXhwb3J0cy5uZXR3b3JrID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9uZXR3b3JrXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXIgPSBleHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlckludGVybmFsID0gZXhwb3J0cy5HU2V0Q3JkdCA9IGV4cG9ydHMuTXVsdFJlZ2lzdGVyQ3JkdCA9IGV4cG9ydHMuTXVsdFJlZ2lzdGVySW50ZXJuYWwgPSBleHBvcnRzLkNvdW50ZXJDcmR0ID0gZXhwb3J0cy5Db3VudGVySW50ZXJuYWwgPSB2b2lkIDA7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbi8qKlxuICogT3BlcmF0aW9ucywgbWVzc2FnZXMsIGFuZCBkZXNjcmlwdGlvbnMgYXJlIGFsbCBqdXN0IHRoZVxuICogbnVtYmVyIHRvIGFkZC9hZGRlZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMCBhZGRzP1xuICovXG5jbGFzcyBDb3VudGVySW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKyBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXJJbnRlcm5hbCA9IENvdW50ZXJJbnRlcm5hbDtcbkNvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBDb3VudGVySW50ZXJuYWwoKTtcbi8qKlxuICogQSBzaW1wbGUgY291bnRlciBDUkRULlxuICpcbiAqIEluIG9uY2hhbmdlLCBldmVudC5kZXNjcmlwdGlvbiBpcyB0aGUgbnVtYmVyIHRoYXQgd2FzIGFkZGVkLlxuICpcbiAqIFdhcm5pbmc6IGFkZGl0aW9uIGlzIG5vdCBhY3R1YWxseSBjb21tdXRhdGl2ZSBpZiB0aGVyZSBpcyBhblxuICogb3ZlcmZsb3cgb3IgaWYgeW91IHVzZSBmbG9hdGluZyBwb2ludCBudW1iZXJzLiAgVE9ETzogaXMgdGhlcmUgYVxuICogYmV0dGVyIHR5cGUgd2UgY2FuIHVzZT9cbiAqL1xuY2xhc3MgQ291bnRlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIENvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG4pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IGFkZC4gIEFzIGEgY29uc2VxdWVuY2UsXG4gICAgICogY291bnRlci52YWx1ZSArPSBuIGFuZCBjb3VudGVyLnZhbHVlIC09IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBhZGRpdGlvbnMpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmFkZChuZXdWYWx1ZSAtIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ291bnRlckNyZHQgPSBDb3VudGVyQ3JkdDtcbi8qKlxuICogT3BlcmF0aW9ucywgbWVzc2FnZXMsIGFuZCBkZXNjcmlwdGlvbnMgYXJlIGFsbCBqdXN0IHRoZVxuICogbnVtYmVyIHRvIG11bHRpcGx5L211bHRpcGxpZWQuXG4gKiBUT0RPOiBvcHRpbWl6ZSBhd2F5IDEgbXVsdHM/XG4gKi9cbmNsYXNzIE11bHRSZWdpc3RlckludGVybmFsIHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gW3N0YXRlICogbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0UmVnaXN0ZXJJbnRlcm5hbCA9IE11bHRSZWdpc3RlckludGVybmFsO1xuTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgTXVsdFJlZ2lzdGVySW50ZXJuYWwoKTtcbi8qKlxuICogQSBzaW1wbGUgbnVtZXJpY2FsIHJlZ2lzdGVyIENSRFQgd2l0aCBtdWx0aXBsaWNhdGlvbiBvcGVyYXRpb25zLlxuICpcbiAqIEluIG9uY2hhbmdlLCBldmVudC5kZXNjcmlwdGlvbiBpcyB0aGUgbnVtYmVyIHRoYXQgd2FzIG11bHRpcGxpZWQuXG4gKlxuICogV2FybmluZzogbXVsdGlwbGljYXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5jbGFzcyBNdWx0UmVnaXN0ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBNdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBtdWx0KG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG4pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IG11bHRpcGxpY2F0aW9uLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiByZWdpc3Rlci52YWx1ZSAqPSBuIGFuZCByZWdpc3Rlci52YWx1ZSAvPSBuIHdvcmtcbiAgICAgKiBhcyBleHBlY3RlZCAoY29udmVydGVkIHRvIENSRFQgbXVsdGlwbGljYXRpb25zKS5cbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGN1cnJlbnQgdmFsdWUgaXMgMC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkltcG9zc2libGUgdG8gc2V0IHRvIG5vbnplcm8gdmFsdWUgd2hlbiBjdXJyZW50IHZhbHVlIGlzIHplcm9cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyAwIC0+IDAgaXMgbm8tb3BcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm11bHQobmV3VmFsdWUgLyB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRSZWdpc3RlckNyZHQgPSBNdWx0UmVnaXN0ZXJDcmR0O1xuLy8gZXhwb3J0IGNsYXNzIENvdW50ZXJNb2RJbnRlcm5hbCBpbXBsZW1lbnRzIENyZHRJbnRlcm5hbDxudW1iZXI+IHtcbi8vICAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBtb2R1bHVzOiBudW1iZXIpIHtcbi8vICAgICAgICAgaWYgKG1vZHVsdXMgPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJtb2R1bHVzIGlzIG5lZ2F0aXZlOiBcIiArIG1vZHVsdXMpO1xuLy8gICAgIH1cbi8vICAgICBjcmVhdGUoaW5pdGlhbERhdGE/OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGluaXRpYWxEYXRhO1xuLy8gICAgICAgICBlbHNlIHJldHVybiAwO1xuLy8gICAgIH1cbi8vICAgICBwcmVwYXJlKG9wZXJhdGlvbjogbnVtYmVyLCBfc3RhdGU6IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLm1vZChvcGVyYXRpb24pO1xuLy8gICAgIH1cbi8vICAgICBlZmZlY3QobWVzc2FnZTogbnVtYmVyLCBzdGF0ZTogbnVtYmVyLCBfcmVwbGljYUlkOiBhbnksIF90aW1lc3RhbXA6IENhdXNhbFRpbWVzdGFtcCk6IFtudW1iZXIsIG51bWJlcl0ge1xuLy8gICAgICAgICByZXR1cm4gW3RoaXMubW9kKHN0YXRlICsgbWVzc2FnZSksIG1lc3NhZ2VdO1xuLy8gICAgIH1cbi8vICAgICBtb2QoeDogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgaWYgKHggPj0gMCkgcmV0dXJuIHggJSB0aGlzLm1vZHVsdXM7XG4vLyAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMubW9kdWx1cyAtICgoLXgpICUgdGhpcy5tb2R1bHVzKTtcbi8vICAgICB9XG4vLyB9XG4vKipcbiAqIE9wZXJhdGlvbnMgYW5kIG1lc3NhZ2VzIGFyZSB0aGUgZWxlbWVudCB0byBhZGQuICBUT0RPOlxuICogdGhpcyBtZWFucyB0aGF0IGFkZGluZyBudWxsIHdvbid0IHdvcmsgYXMgR1NldENyZHQgd2lsbCB0cmVhdFxuICogaXRzIG1lc3NhZ2UgYXMgYSBuby1vcC4gIERlc2NyaXB0aW9uIGlzIHRoZSBlbGVtZW50IGFkZGVkXG4gKiAoaWYgaXQncyByZWR1bmRhbnQsIGRlc2NyaXB0aW9uIGlzIG51bGwsIHNvIG9uY2hhbmdlIHdvbid0XG4gKiBzZWUgYW55dGhpbmcpLlxuICovXG5jbGFzcyBHU2V0SW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldChpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBzdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUuaGFzKG9wZXJhdGlvbikpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChzdGF0ZS5oYXMobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIC8vIGRvZXMgbm90aGluZ1xuICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZS5hZGQobWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkdTZXRJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBHU2V0SW50ZXJuYWwoKTtcbi8qKlxuICogQSBncm93LW9ubHkgc2V0LlxuICpcbiAqIEluIG9uY2hhbmdlLCBldmVudC5kZXNjcmlwdGlvbiBpcyB0aGUgYXJyYXkgb2YgZWxlbWVudHMgYWRkZWRcbiAqIChbXSBvciBbYWRkZWQgZWxlbWVudF0pLlxuICpcbiAqIFRPRE86IGFkZGluZyBhIG51bGwgdmFsdWUgd2lsbCBiZSBpZ25vcmVkLlxuICogVE9ETzogYWRkIGEgdHlwZSBhbm5vdGF0aW9uXG4gKiBUT0RPOiBzYW1lIGludGVyZmFjZSBhcyBKUyBTZXRcbiAqL1xuY2xhc3MgR1NldENyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIEdTZXRJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBhZGQoZWxlbWVudCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoZWxlbWVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgc2V0LiAgVGhpcyBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzLnN0YXRlKTtcbiAgICB9XG59XG5leHBvcnRzLkdTZXRDcmR0ID0gR1NldENyZHQ7XG5jbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBBbiBpbml0aWFsIHZhbHVlIHRvIHNldC5cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldChbW2luaXRpYWxEYXRhLCBudWxsLCAtMV1dKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcInNldFwiLCB2YWx1ZV06IHNldCB0byB0aGUgZ2l2ZW4gc2luZ2xlIHZhbHVlLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0LCBzZXR0aW5nIHRoZSB2YWx1ZSBzZXQgdG8gW10uXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgX3N0YXRlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICBpZiAoISgob3BlcmF0aW9uWzBdID09PSBcInNldFwiICYmIG9wZXJhdGlvblsxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgfHwgb3BlcmF0aW9uWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybmVkIGRlc2NyaXB0aW9uIGlzOlxuICAgICAqIC0gZm9yIHNldCBtZXNzYWdlLCBbXCJzZXRcIiwgc2V0IHZhbHVlXSAoZXZlbiBpZiBpdFxuICAgICAqIGRvZXNuJ3QgZWxpbWluYXRlIGFsbCBjYXVzYWxseSBwcmlvciB2YWx1ZXMpLlxuICAgICAqIC0gZm9yIHJlc2V0cywgW1wicmVzZXRcIl0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKCEoKG1lc3NhZ2VbMF0gPT09IFwic2V0XCIgJiYgbWVzc2FnZVsxXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgfHwgbWVzc2FnZVswXSA9PT0gXCJyZXNldFwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVbMV0gPT09IG51bGwpXG4gICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKHZhbHVlKTsgLy9pbml0aWFsIGVsZW1lbnRcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB2Y0VudHJ5ID0gdmMuZ2V0KHZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAodmNFbnRyeSAhPT0gdW5kZWZpbmVkICYmIHZjRW50cnkgPj0gdmFsdWVbMl0pXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2VbMF0gPT09IFwic2V0XCIpIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChbbWVzc2FnZVsxXSwgdGltZXN0YW1wLmdldFNlbmRlcigpLCB0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCA9IE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsO1xuTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwoKTtcbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlciBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJzZXRcIiwgdmFsdWVdKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlU2V0KCkge1xuICAgICAgICBsZXQgdmFsdWVzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdmFsdWVzLmFkZCh2YWx1ZVswXSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoW1wicmVzZXRcIl0pO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbXCJyZXNldFwiXTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlciA9IE11bHRpVmFsdWVSZWdpc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2ljX2NyZHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmR0ID0gZXhwb3J0cy5DcmR0Q2hhbmdlRXZlbnQgPSB2b2lkIDA7XG4vKipcbiAqIEFuIGV2ZW50IGlzc3VlZCB3aGVuIGEgQ1JEVCBpcyBjaGFuZ2VkIGJ5IGFub3RoZXIgcmVwbGljYS5cbiAqIEBwYXJhbSBjYWxsZXIgICAgICBUaGUgQ3JkdCBpbnN0YW5jZSB0aGF0IHdhcyBjaGFuZ2VkLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NycHRpb24gb2YgdGhlIGNoYW5nZS5cbiAqIEBwYXJhbSB0aW1lc3RhbXAgICBUaGUgY2F1c2FsIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLiBOb3RlIHRoYXRcbiAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICogc3RpbGwgZ3VhcmFudGVlZC5cbiAqL1xuY2xhc3MgQ3JkdENoYW5nZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIGRlc2NyaXB0aW9uLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0Q2hhbmdlRXZlbnQgPSBDcmR0Q2hhbmdlRXZlbnQ7XG4vLyBVc2VyLWZhY2luZyB3cmFwcGVycyBhcm91bmQgQ1JEVHMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzLFxuLy8gYWRkaW5nIG1ldGhvZHMgZm9yIHRoZSBDUkRUJ3Mgb3BlcmF0aW9ucyAoZS5nLiwgaW5jcmVtZW50KCkpXG4vLyB3aGljaCBjYWxsIHRoaXMgY2xhc3MncyBhcHBseSBtZXRob2QuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFwcGxpY2F0aW9uLWZhY2luZyBDUkRUIGltcGxlbWVudGF0aW9ucy5cbiAqIEluc3RlYWQgb2YgZXhwb3NpbmcgQ3JkdEludGVybmFsIGltcGxlbWVudGF0aW9ucyBkaXJlY3RseSxcbiAqIHdoaWNoIGhhdmUgYW4gdW5mcmllbmRseSBwcmVwYXJlL2VmZmVjdCBpbnRlcmZhY2UsXG4gKiBlYWNoIENSRFQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGRlZmluZSBhIHN1YmNsYXNzIG9mIHRoaXNcbiAqIGNsYXNzIHdpdGggb3JkaW5hcnktbG9va2luZyBtZXRob2RzIHRvIHBlcmZvcm0gb3BlcmF0aW9uc1xuICogYW5kIHF1ZXJ5IHRoZSBzdGF0ZS4gIE1ldGhvZHMgcGVyZm9ybWluZyBvcGVyYXRpb25zIHNob3VsZFxuICogY2FsbCBhcHBseU9wIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgQ3JkdEludGVybmFsIG9wZXJhdGlvbi5cbiAqIFRoaXMgY2xhc3MgdGhlbiBhdXRvbWF0aWNhbGx5IGhhbmRsZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nXG4gKiBvZiBtZXNzYWdlcy5cbiAqIENmLiBBbGdvcml0aG0gMSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHBhcGVyLlxuICogQHBhcmFtIFMgVGhlIHN0YXRlIHR5cGUgb2YgQy5cbiAqL1xuY2xhc3MgQ3JkdCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgIEFuIGlkIGZvciB0aGlzIENSRFQuICBBbGwgQ1JEVHMgdXNpbmcgdGhlXG4gICAgICogc2FtZSBDcmR0UnVudGltZSBtdXN0IGhhdmUgZGlzdGluY3QgaWRzLCBhbmQgdGhlIGlkcyBtdXN0XG4gICAgICogYmUgdGhlIHNhbWUgZm9yIGFsbCByZXBsaWNhcyBvZiBhIGdpdmVuIENSRFQsIGluIG9yZGVyXG4gICAgICogZm9yIHRoZSBDcmR0UnVudGltZSB0byByb3V0ZSBtZXNzYWdlcyB0byB0aGVtIHByb3Blcmx5LlxuICAgICAqIEBwYXJhbSBjcmR0SW50ZXJuYWwgICAgVGhlIENyZHRJbnRlcm5hbCB0byB1c2UuICBOb3RlIHRoYXQgc2luY2VcbiAgICAgKiBDcmR0SW50ZXJuYWwncyBkb24ndCBzdG9yZSBzdGF0ZXMsIG11bHRpcGxlIG9iamVjdHMgbWF5XG4gICAgICogc2hhcmUgdGhlIHNhbWUgQ3JkdEludGVybmFsIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBydW50aW1lIFRoZSBDcmR0UnVudGltZSB0byB1c2UgZm9yIHNlbmRpbmcgYW5kXG4gICAgICogcmVjZWl2aW5nIG1lc3NhZ2VzLlxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIHRvIHVzZSB3aGVuXG4gICAgICogc2V0dGluZyB0aGUgQ3JkdEludGVybmFsJ3MgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgY3JkdEludGVybmFsLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY3JkdEludGVybmFsID0gY3JkdEludGVybmFsO1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoaXMgdG8gbGlzdGVuIGZvciB3aGVuIGFub3RoZXIgcmVwbGljYSB1cGRhdGVzXG4gICAgICAgICAqIHRoaXMgb2JqZWN0J3Mgc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uY2hhbmdlID0gKChfKSA9PiB7IH0pO1xuICAgICAgICAvLyBUT0RPOiBkZXNjcmliZSBcInRyYW5zYWN0aW9uc1wiLiAgUmlnaHQgd29yZD8gIFJlbmFtZVxuICAgICAgICAvLyBcImF0b21pY1wiIHN0dWZmIGJlbG93LiAgTXVzdCBoYXBwZW4gc3luY2hyb25vdXNseSBzb1xuICAgICAgICAvLyB0aGF0IHJ1bnRpbWUuZ2V0VGltZXN0YW1wKCkgZG9lc24ndCBjaGFuZ2UgYW5kXG4gICAgICAgIC8vIG5vIG1lc3NhZ2VzIGFyZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cbiAgICAgICAgLy8gQWxsb3cgY2FsbGVyIHRvIHN0YXJ0L2VuZCB0cmFuc2FjdGlvbnM/XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5jcmR0SW50ZXJuYWwuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5ydW50aW1lLnJlZ2lzdGVyKHRoaXMsIHRoaXMuaWQpO1xuICAgIH1cbiAgICBzdGFydFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIC8vIFRPRE86IFJldHVybnMgdGhlIGRlc2NyaXB0aW9ucyAodHJhbnNsYXRlZClcbiAgICBlbmRUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLCB0aGlzLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucztcbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgZ2l2ZW4gb3BlcmF0aW9uIHRvIHRoZSBzdGF0ZSwgdXNpbmcgcHJlcGFyZSBhbmQgZWZmZWN0LFxuICAgICAqIGFuZCBzZW5kcyB0aGUgZ2VuZXJhdGVkIG1lc3NhZ2Ugb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiBJZiBhIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLCB0aGlzIHNlbmRpbmcgaXMgZGVsYXllZFxuICAgICAqIHVudGlsXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gVGhlIG9wZXJhdGlvbiB0byBhcHBseS5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNoYW5nZXMuXG4gICAgICogVGhpcyBpcyB0aGUgbGlzdCBvZiBpbmRpdmlkdWFsIG1lc3NhZ2UgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5XG4gICAgICogZWZmZWN0IChza2lwcGluZyBudWxsIG1lc3NhZ2VzKSxcbiAgICAgKiBhZnRlciBiZWluZyBwYXNzZWQgdGhyb3VnaCB0cmFuc2xhdGVEZXNjcmlwdGlvbi4gIEFuIGV4Y2VwdGlvblxuICAgICAqIGlzIHRoYXQgaWYgYWxsIG1lc3NhZ2VzIGFyZVxuICAgICAqIG51bGwsIG51bGwgaXMgcmV0dXJuZWQgd2l0aG91dCBjYWxsaW5nIHRyYW5zbGF0ZURlc2NyaXB0aW9uLlxuICAgICAqIFRPRE86IG51bGwgaWYgaW4gYSB0cmFuc2FjdGlvbiAodXNlIGVuZFRyYW5zYWN0aW9uIGluc3RlYWQpLlxuICAgICAqIFRPRE86IGJ1dCB3aGF0IGlmIHdlIHdhbnQgaXQgdG8gZGVjaWRlIHdoYXQgdG8gZG8gbmV4dD9cbiAgICAgKi9cbiAgICBhcHBseU9wKG9wZXJhdGlvbikge1xuICAgICAgICBsZXQgb3duVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIG93blRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmNyZHRJbnRlcm5hbC5wcmVwYXJlKG9wZXJhdGlvbiwgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLCB0aGlzLnN0YXRlLCB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG93blRyYW5zYWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gdHJhbnNsYXRlIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogQ3JkdEludGVybmFsIGJlZm9yZSBwYXNzaW5nIGl0IHRvIG9uY2hhbmdlLiAgVGhpcyBpc1xuICAgICAqIHVzZWZ1bCBmb3Igc2VtaWRpcmVjdCBwcm9kdWN0cyBiZWNhdXNlIHRoZSBkZWZhdWx0XG4gICAgICogU2VtaWRpcmVjdEludGVybmFsIGRlc2NyaXB0aW9ucyBhcmUgbm90IHVzZXItZnJpZW5kbHkuXG4gICAgICogSWYgdGhpcyBtZXRob2QgcmV0dXJucyBudWxsLCBvbmNoYW5nZSBpcyBub3QgY2FsbGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50aW9uIHJldHVybnMgZGVzY3JpcHRpb25zWzBdLiAgSXQgaXNcbiAgICAgKiBhcHByb3ByaWF0ZSB3aGVuIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdCBhbHJlYWR5IHJldHVybnNcbiAgICAgKiB1c2VyLWZyaWVuZGx5IGRlc2NyaXB0aW9ucyBhbmQgYXBwbHlPcHMgaXMgb25seSBldmVyIGNhbGxlZFxuICAgICAqIHdpdGggc2luZ2xlIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGRlc2NyaXB0aW9ucyBBIGxpc3Qgb2YgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdC4gIFRoaXMgd2lsbCBhbHdheXMgYmUgbm9uLWVtcHR5LlxuICAgICAqIEByZXR1cm4gVGhlIHRyYW5zbGF0ZWQgZGVzY3JpcHRpb24gdG8gcGFzcyB0byB0aGlzLm9uY2hhbmdlLFxuICAgICAqIG9yIG51bGwgaWYgdGhpcy5vbmNoYW5nZSBzaG91bGQgbm90IGJlIGNhbGxlZC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIG9ic2VydmVkIHJlc2V0c1xuICAgICAqIGZvciB3aGVuIGEgQ3JkdE9iamVjdCBjb250YWluaW5nIHRoaXMgQ3JkdCBpc1xuICAgICAqIHJlc2V0LiAgVGhlXG4gICAgICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHN1Y2ggbWFwIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgICAqIHRvIGNhdXNlIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgICogbXVzdCBzYXRpc2Z5OlxuICAgICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgICAqIC0gd2hlbiBhcHBsaWVkIHRvIGEgc3RhdGUgd2hpY2ggaGFzIG5vdCByZWNlaXZlZCBhbnlcbiAgICAgKiBtZXNzYWdlcyBjYXVzYWxseSBwcmlvciB0byB0aGUgdGltZXN0YW1wLCBpdCBoYXNcbiAgICAgKiBubyBlZmZlY3QuICBJbiBvdGhlciB3b3JkcywgYXBwbHlpbmcgaXQgdG8gYSBjb25jdXJyZW50bHlcbiAgICAgKiBpbml0aWFsaXplZCBzdGF0ZSBoYXMgbm8gZWZmZWN0LlxuICAgICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgbWVzc2FnZXMgaW5zdGVhZCwgZm9yIGdlbmVyYWxpdHk/XG4gICAgICovXG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBvYnNlcnZlZC1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0KCkgeyB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBzdHJvbmctcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXRTdHJvbmcoKSB7IH1cbiAgICAvLyAvKipcbiAgICAvLyAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBzdHJvbmcgcmVzZXRzLiAgVGhlXG4gICAgLy8gICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgIC8vICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgLy8gICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgIC8vICAqIHRvIGNhdXNlIGEgc3Ryb25nLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgIC8vICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgLy8gICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgIC8vICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgLy8gICogbXVzdCBzYXRpc2Z5OlxuICAgIC8vICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgLy8gICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgIC8vICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgIC8vICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgIC8vICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAvLyAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAvLyAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAvLyAgKi9cbiAgICAvLyBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKTogYW55IHtcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciB0aGlzLnJ1bnRpbWUgd2hlbiBhbiBhdG9taWMgbGlzdCBvZlxuICAgICAqIG1lc3NhZ2VzIGlzIHJlY2VpdmVkIGZyb20gYW5vdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIHJlY2VpdmUobWVzc2FnZXMsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbiB0cmFuc2FjdGlvbjsgdGhlIHRyYW5zYWN0aW9uIG11c3QgXCIgK1xuICAgICAgICAgICAgICAgIFwiYmUgZW5kZWQgc3luY2hyb25vdXNseSBzbyB0aGF0IG1lc3NhZ2VzIFwiICtcbiAgICAgICAgICAgICAgICBcImNhbm5vdCBiZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uY2hhbmdlICYmIGRlc2NyaXB0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkID0gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNoYW5nZShuZXcgQ3JkdENoYW5nZUV2ZW50KHRoaXMsIHRyYW5zbGF0ZWQsIHRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0ID0gQ3JkdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfY29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ291bnRlcjIgPSBleHBvcnRzLkNvdW50ZXIyQWRkRXZlbnQgPSBleHBvcnRzLkNyZHQyID0gdm9pZCAwO1xuY2xhc3MgQ3JkdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgYXJncykge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG5jbGFzcyBDcmR0MiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuICAgIGNhbGxSZW1vdGUobWV0aG9kLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIFNlcmlhbGl6ZSB0aGUgbWV0aG9kIG5hbWUgYW5kIGFyZ3NcbiAgICAgICAgLy8gRG8gdGhpcyBmaXJzdCBpbiBjYXNlIGNhbGxpbmcgbWV0aG9kIGNoYW5nZXMgdGhlbVxuICAgICAgICBsZXQgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG5ldyBDcmR0TWVzc2FnZShtZXRob2QubmFtZSwgYXJncykpO1xuICAgICAgICAvLyBDYWxsIHRoZSBsb2NhbCBmdW5jdGlvblxuICAgICAgICBsZXQgcmVzdWx0ID0gbWV0aG9kKGZhbHNlLCB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKSwgLi4uYXJncyk7XG4gICAgICAgIC8vIFNlbmQgbWVzc2FnZSBvbiB0aGUgbmV0d29ya1xuICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZChtZXNzYWdlLCB0aGlzLmlkKTtcbiAgICAgICAgLy8gUmV0dXJuIGxvY2FsIHJlc3VsdFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3IgdGhpcy5ydW50aW1lIHdoZW4gYW4gYXRvbWljIGxpc3Qgb2ZcbiAgICAgKiBtZXNzYWdlcyBpcyByZWNlaXZlZCBmcm9tIGFub3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICByZWNlaXZlKG1lc3NhZ2UsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQgbWVzc2FnZU9iaiA9IEpTT04ucGFyc2UobWVzc2FnZSk7XG4gICAgICAgIGlmICghKG1lc3NhZ2VPYmogaW5zdGFuY2VvZiBDcmR0TWVzc2FnZSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvbid0IHRocm93IGhlcmUsIHRvIGF2b2lkIG1lc3NpbmdcbiAgICAgICAgICAgIC8vIHdpdGggY2FsbGVyLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIENyZHRNZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IENhbGwgbWV0aG9kIGJ5IG5hbWVcbiAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXNbbWVzc2FnZU9iai5tZXRob2RdKCk7XG4gICAgICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gVE9ETzogZG9uJ3QgdGhyb3cgaGVyZSwgdG8gYXZvaWQgbWVzc2luZ1xuICAgICAgICAgICAgLy8gd2l0aCBjYWxsZXIuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG1ldGhvZCBjYWxsZWQgcmVtb3RlbHk6IFwiICsgbWVzc2FnZU9iai5tZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IENoZWNrIHR5cGU/ICBBdCBsZWFzdCBtYWtlIHN1cmUgaXQncyBhIGZ1bmN0aW9uP1xuICAgICAgICBtZXRob2QodHJ1ZSwgdGltZXN0YW1wLCBtZXNzYWdlT2JqLmFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdDIgPSBDcmR0MjtcbmNsYXNzIENvdW50ZXIyQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZUFkZGVkLCBuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMubmV3VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy50eXBlID0gXCJhZGRcIjtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXIyQWRkRXZlbnQgPSBDb3VudGVyMkFkZEV2ZW50O1xuY2xhc3MgQ291bnRlcjIgZXh0ZW5kcyBDcmR0MiB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsVmFsdWU7XG4gICAgfVxuICAgIHJlbW90ZUFkZChyZW1vdGVDYWxsZXIsIHRpbWVzdGFtcCwgdG9BZGQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSArPSB0b0FkZDtcbiAgICAgICAgaWYgKHJlbW90ZUNhbGxlciAmJiB0aGlzLm9uY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLm9uY2hhbmdlKG5ldyBDb3VudGVyMkFkZEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgdG9BZGQsIHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGQodG9BZGQpIHtcbiAgICAgICAgc3VwZXIuY2FsbFJlbW90ZSh0aGlzLnJlbW90ZUFkZC5iaW5kKHRoaXMpLCB0b0FkZCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVyMiA9IENvdW50ZXIyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdHMyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2Jhc2ljX2NyZHRzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X2NvcmVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2pzb25cIiksIGV4cG9ydHMpO1xuLy9leHBvcnQgKiBmcm9tICcuL211bHRpX3NlbWlkaXJlY3QnO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3Jlc2V0dGFibGVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3NlbWlkaXJlY3RcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3N0YW5kYXJkXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0czJcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkpzb25DcmR0ID0gdm9pZCAwO1xuY29uc3Qgc3RhbmRhcmRfMSA9IHJlcXVpcmUoXCIuL3N0YW5kYXJkXCIpO1xuY29uc3QgYmFzaWNfY3JkdHNfMSA9IHJlcXVpcmUoXCIuL2Jhc2ljX2NyZHRzXCIpO1xuY2xhc3MgSnNvbkNyZHQgZXh0ZW5kcyBzdGFuZGFyZF8xLkNyZHRPYmplY3Qge1xuICAgIC8vIFRPRE86IGFycmF5cyAoc2VxdWVuY2VzKS4gIFVzZXMgbWFwcyBmb3Igbm93LlxuICAgIC8vIFRPRE86IG51bGxzP1xuICAgIC8vIFRPRE86IGFiaWxpdHkgdG8gcGFzcyBpbml0aWFsIHZhbHVlICh3aGljaCBpcyBub3Qgc3luY2VkKS5cbiAgICAvLyBNb3JlIGdlbmVyYWxseSwgYWJpbGl0eSB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24geW91clxuICAgIC8vIHByZWRlZmluZWQgcHJvcGVydGllcyB0aGF0IGFyZSBub3Qgc3luY2VkP1xuICAgIC8vIFVzZSB0aGUgZXhpc3RpbmcgZmxhZyBhbmQgYmxvY2sgbWVzc2FnZXMgaW4gQ3JkdE9iamVjdC5cbiAgICBjb25zdHJ1Y3RvcihjcmR0SWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoY3JkdElkLCBydW50aW1lKTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMuYm9vbGVhbnMgPSBuZXcgc3RhbmRhcmRfMS5NYXBDcmR0KFwiYm9vbGVhbnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5FbmFibGVXaW5zRmxhZyhrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgICAgICB0aGlzLm51bWJlcnMgPSBuZXcgc3RhbmRhcmRfMS5NYXBDcmR0KFwibnVtYmVyc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBzdGFuZGFyZF8xLkludFJlZ2lzdGVyQ3JkdChrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgICAgICB0aGlzLnN0cmluZ3MgPSBuZXcgc3RhbmRhcmRfMS5NYXBDcmR0KFwic3RyaW5nc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBiYXNpY19jcmR0c18xLk11bHRpVmFsdWVSZWdpc3RlcihrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgICAgICB0aGlzLnNldHMgPSBuZXcgc3RhbmRhcmRfMS5NYXBDcmR0KFwic2V0c1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBzdGFuZGFyZF8xLkFkZFdpbnNTZXQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5vYmplY3RzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcIm9iamVjdHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgSnNvbkNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIENyZHQgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSBzdG9yaW5nXG4gICAgICogdmFsdWVzIHdpdGggdGhlIHNhbWUgdHlwZSBhcyB0eXBlSW5kaWNhdG9yLFxuICAgICAqIG9yIHVuZGVmaW5lZCBpZiB0aGUga2V5IGlzIG5vdCBwcmVzZW50IChpbmNsdWRpbmdcbiAgICAgKiBpZiBpdCBwcmV2aW91c2x5IHdhcyBwcmVzZW50IGJ1dCB3YXMgcmVtb3ZlZCkuXG4gICAgICogKFVzZSBpbml0IGluc3RlYWQgaWYgeW91IHdhbnQgYSBndWFyYW50ZWVkLWRlZmluZWRcbiAgICAgKiByZXR1cm4gdmFsdWUuKVxuICAgICAqIChUT0RPOiBleHBsYWluIGtleXMgYXJlXG4gICAgICogc2VncmVnYXRlZCBieSB2YWx1ZSB0eXBlKS5cbiAgICAgKiBFLmcuIGdldChcImFcIiwgMCkgdG8gZ2V0IHRoZSBudW1iZXIgdmFsdWUgd2l0aCBrZXkgMC5cbiAgICAgKiBTdGFuZGFyZCB0eXBlSW5kaWNhdG9yIHZhbHVlczpcbiAgICAgKiAtIGZhbHNlOiBib29sZWFuIChFbmFibGVXaW5zRmxhZylcbiAgICAgKiAtIDA6IG51bWJlciAoSW50UmVnaXN0ZXJDcmR0KVxuICAgICAqIC0gXCJcIjogc3RyaW5nIChNdWx0aVZhbHVlUmVnaXN0ZXI8c3RyaW5nPilcbiAgICAgKiAtIG5ldyBTZXQoKTogc2V0IChBZGRXaW5zU2V0KVxuICAgICAqIC0ge306IG9iamVjdCAoSnNvbkNyZHQpXG4gICAgICpcbiAgICAgKiBUT0RPOiBleHBsaWN0bHkgdHlwZWQgdmVyc2lvbnM/ICBDYW4gd2UgZG8gdGhpcyBjbGV2ZXJseVxuICAgICAqIHdpdGggZ2VuZXJpY3MgYW5kIHR5cGUgcG9seW1vcnBoaXNtIG9yIHNvbWV0aGluZz9cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGdldChrZXksIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuZ2V0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmdldChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcyhrZXksIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaGFzKGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmhhcyhrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZShrZXksIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJvb2xlYW5zLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlcnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5ncy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaWtlIGdldCwgYnV0IGluc3RlYWQgb2YgcmV0dXJuaW5nIHRoZSB2YWx1ZSBDcmR0LFxuICAgICAqIHJldHVybnMgaXRzIHZhbHVlLiAgTm90ZSBmb3Igc3RyaW5ncywgaWYgdGhlIENyZHRcbiAgICAgKiBkb2VzIG5vdCBoYXZlIGEgc2luZ2xlIHZhbHVlIChlaXRoZXIgb3IgMispLFxuICAgICAqIHdoaWNoIGlzIHBvc3NpYmxlIGR1ZSB0byB0aGUgTXVsdGlWYWx1ZVJlZ2lzdGVyXG4gICAgICogc2VtYW50aWNzLCB3ZSByZXR1cm4gdGhlIHNldCBvZiBhbGwgY3VycmVudCB2YWx1ZXNcbiAgICAgKiBpbnN0ZWFkIG9mIGEgc2luZ2xlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIFRPRE86IHVzZSBnZW5lcmljcyB0byBzYXkgdGhhdCByZXR1cm4gdmFsdWUgaXNcbiAgICAgKiBzYW1lIGFzIHR5cGVJbmRpY2F0b3IgdHlwZSB8IHVuZGVmaW5lZD9cbiAgICAgKiBXb3JrcyBleGNlcHQgZm9yIHN0cmluZ3MsXG4gICAgICogd2hpY2ggY291bGQgaW5zdGVhZCByZXR1cm4gYSBTZXQ8c3RyaW5nPi5cbiAgICAgKiBDb3VsZCBpbnN0ZWFkIGhhdmUgc3BlY2lmaWNhbGx5IHR5cGVkIHZlcnNpb25zIG9mIHRoZSBtZXRob2QuXG4gICAgICovXG4gICAgZ2V0VmFsdWUoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLmdldChrZXksIHR5cGVJbmRpY2F0b3IpO1xuICAgICAgICBpZiAodmFsdWVDcmR0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNyZHQgaW5zdGFuY2VvZiBiYXNpY19jcmR0c18xLk11bHRpVmFsdWVSZWdpc3Rlcikge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVNldCA9IHZhbHVlQ3JkdC52YWx1ZVNldDtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTZXQuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTZXQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVDcmR0LnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzL3Jldml2ZXMgdGhlIGdpdmVuIGtleSB3aXRoIHRoZSBpbmRpY2F0ZWQgdHlwZSBpZlxuICAgICAqIG5lZWRlZCwgbWFraW5nIGl0IHByZXNlbnQgaW4gdGhlIHN0YXRlXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHR5cGVJbmRpY2F0b3IgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gdGhlIHZhbHVlIENyZHQuXG4gICAgICovXG4gICAgaW5pdChrZXksIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgLy8gVE9ETzogY2FuIHdlIGdlbmVyaWZ5IHRoaXMgZnVuY3Rpb24gcGF0dGVybj9cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5pbml0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5pbml0KGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSB0byBhIGNvcHkgb2YgdGhlIGdpdmVuXG4gICAgICogKG5vbi1DcmR0KSB2YWx1ZSwgdXNpbmcgdGhlIENyZHQncyAudmFsdWUgPSBtZXRob2QuXG4gICAgICogVGhpcyBnZW5lcmFsbHkgaGFzIHRoZSBlZmZlY3Qgb2YgcmVzZXR0aW5nIHRoZSBjdXJyZW50IENyZHRcbiAgICAgKiBhbmQgdGhlbiBwZXJmb3JtaW5nIG9wZXJhdGlvbnMgdG8gZHJpdmUgaXQgdG8gdGhlIGRlc2lyZWRcbiAgICAgKiB2YWx1ZS4gIElmIHlvdSB3YW50IG1vcmUgY29udHJvbCBvdmVyIGhvdyB0aGUgdmFsdWUgaXMgc2V0XG4gICAgICogKGUuZy4sIHBhc3NpbmcgYW4gb3B0aW9uIHRvIEpzb25DcmR0LmdldEFzT2JqZWN0IHdoZW4gc2V0dGluZ1xuICAgICAqIGFuIG9iamVjdCdzIHZhbHVlKSwgeW91IGNhbiBpbnN0ZWFkIGdldCB0aGUgQ3JkdCB3aXRoXG4gICAgICogdGhpcy5pbml0KGtleSwgdmFsdWUpIGFuZCB0aGVuIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpdFxuICAgICAqIGRpcmVjdGx5LlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHZhbHVlIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFRoZSByZXN1bHRpbmcgdmFsdWUgQ3JkdCAodGhpcy5nZXQoa2V5LCB2YWx1ZSkpLlxuICAgICAqL1xuICAgIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLnNldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG4gICAgc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKSB7XG4gICAgICAgIGxldCB2YWx1ZUNyZHQgPSB0aGlzLmluaXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHZhbHVlQ3JkdC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWVDcmR0O1xuICAgIH1cbiAgICBrZXlzQnlUeXBlKHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdHlwZUluZGljYXRvcikge1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIHRoaXMuYm9vbGVhbnMua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVJbmRpY2F0b3IgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0cy5rZXlzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5rZXlzKCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBBcnJheSBvZiBba2V5LCB0eXBlIG5hbWVdIHBhaXJzXG4gICAgICovXG4gICAga2V5cygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5ib29sZWFucy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcImJvb2xlYW5cIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5udW1iZXJzLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwibnVtYmVyXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuc3RyaW5ncy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcInN0cmluZ1wiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnNldHMua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJzZXRcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5vYmplY3RzLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwib2JqZWN0XCJdKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGNoZWNrS2V5Q29uZmxpY3RSdWxlKGtleUNvbmZsaWN0UnVsZSkge1xuICAgICAgICBpZiAoIShrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzIHx8XG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkVycm9yT25Db25mbGljdCB8fFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGtleUNvbmZsaWN0UnVsZTogXCIgK1xuICAgICAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhpcyBDcmR0J3MgdmFsdWUgaW4gT2JqZWN0IGZvcm0uXG4gICAgICogQ2hhbmdpbmcgdGhlIHJldHVybmVkIHZhbHVlIGhhcyBubyBlZmZlY3Qgb24gdGhlIENyZHQgc3RhdGUuXG4gICAgICogTm90ZSB0aGF0IHNldCB2YWx1ZXMgYXJlIGNvbnZlcnRlZCB0byBKYXZhc2NyaXB0IFNldHMsXG4gICAgICogcmVzdWx0aW5nIGluIGEgbm90LXF1aXRlLUpTT04gZm9ybWF0IG9iamVjdC5cbiAgICAgKiBBIHN0cmluZyBNdWx0aVZhbHVlUmVnaXN0ZXIgaXMgY29udmVydGVkIHRvIGEgc3RyaW5nIGlmIGl0IGhhc1xuICAgICAqIGEgc2luZ2xlIHZhbHVlOyBvdGhlcndpc2UgKDAgb3IgMisgdmFsdWVzKSBpdFxuICAgICAqIGlzIGNvbnZlcnRlZCB0byBhIFNldDxzdHJpbmc+XG4gICAgICogKEFycmF5PHN0cmluZz4gaWYgc2V0c0FzQXJyYXlzPXRydWUpXG4gICAgICogb2YgYWxsIGN1cnJlbnQgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICBrZXlDb25mbGljdFJ1bGU9SnNvbkNyZHQuRXhwYW5kT25Db25mbGljdFxuICAgICAqIFBvbGljeSBmb3IgaGFuZGxpbmcga2V5cyBvZiBkaWZmZXJlbnQgdHlwZXMgdGhhdCBoYXZlIHRoZVxuICAgICAqIHNhbWUgbmFtZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhIGtleSBjb25mbGljdC5cbiAgICAgKiAtIFByZWZpeFR5cGVzOiBwcmVmaXggdGhlIHR5cGUgbmFtZSBmb2xsb3dlZCBieSBcIjpcIiB0byBlYWNoIGtleSxcbiAgICAgKiBlLmcuIFwibnVtYmVyOm15S2V5XCIuICBUeXBlIG5hbWVzIGFyZSBcImJvb2xlYW5cIiwgXCJudW1iZXJcIixcbiAgICAgKiBcInN0cmluZ1wiLCBcInNldFwiLCBcIm9iamVjdFwiLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogaWYgdGhlcmUgaXMgYSBjb25mbGljdCBvblxuICAgICAqIGEga2V5LCBzZXQgaXRzIHZhbHVlIHRvIGVxdWFsIGFuIG9iamVjdCBjb250YWluaW5nIGVhY2ggb2ZcbiAgICAgKiB0aGUgY29uZmxpY3RpbmcgdmFsdWVzLCBwbHVzIGEgZmxhZyBcImpzb25DcmR0S2V5RXhwYW5kZWQgPSB0cnVlXCIuICBFLmcuXG4gICAgICogXCJteUtleVwiOiB7XCJqc29uQ3JkdEtleUV4cGFuZGVkXCI6IHRydWUsIFwic3RyaW5nXCI6IFwic3RyaW5nVmFsdWVcIixcbiAgICAgKiBcIm51bWJlclwiOiA3fVxuICAgICAqIEBwYXJhbSBzZXRzQXNBcnJheXMgPSBmYWxzZSBJZiB0cnVlLCBTZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWRcbiAgICAgKiB0byBhcnJheXMsIHNvIHRoYXQgdGhlIHJlc3VsdGluZyBPYmplY3QgaXMgaW4gcmVndWxhciBKU09OXG4gICAgICogZm9ybWF0LiAgVGhpcyBpbmNsdWRlcyBTZXQ8c3RyaW5nPiB2YWx1ZXMgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVycyB0aGF0IGhhdmUgMCBvciAyKyB2YWx1ZXMuXG4gICAgICovXG4gICAgZ2V0QXNPYmplY3Qoa2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0LCBzZXRzQXNBcnJheXMgPSBmYWxzZSkge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICBsZXQgb2JqZWN0ID0ge307XG4gICAgICAgIC8vIE1hcHMga2V5cyB0byB0aGUgbmFtZSBvZiB0aGVpciBmaXJzdCB0eXBlXG4gICAgICAgIGxldCBrZXlzU29GYXIgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBjb25mbGljdGVkS2V5c1NvRmFyID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5ib29sZWFucywgXCJib29sZWFuXCIsIHZhbHVlID0+IHZhbHVlLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMubnVtYmVycywgXCJudW1iZXJcIiwgdmFsdWUgPT4gdmFsdWUudmFsdWUpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5zdHJpbmdzLCBcInN0cmluZ1wiLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUudmFsdWVTZXQ7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnNpemUgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzZXRzQXNBcnJheXMgPyBbLi4ucmVzdWx0LnZhbHVlcygpXSA6IHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5zZXRzLCBcInNldFwiLCB2YWx1ZSA9PiAoc2V0c0FzQXJyYXlzID8gWy4uLnZhbHVlLnZhbHVlXSA6IHZhbHVlLnZhbHVlKSk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLm9iamVjdHMsIFwib2JqZWN0XCIsIHZhbHVlID0+IHZhbHVlLmdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSwgc2V0c0FzQXJyYXlzKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgbWFwLCB0eXBlTmFtZSwgdmFsdWVGdW5jKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBtYXAua2V5cygpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUZ1bmMobWFwLmdldChrZXkpKTtcbiAgICAgICAgICAgIGlmIChrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W3R5cGVOYW1lICsgXCI6XCIgKyBrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlzU29GYXIuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBLZXkgY29uZmxpY3RcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGtleTogXCIgKyBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgd2hlbiBrZXlDb25mbGljdFJ1bGU9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3RcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25mbGljdGVkS2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHBhbmQgdGhlIGV4aXN0aW5nIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mbGljdGVkS2V5c1NvRmFyLmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4cGFuZGVkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkW2tleXNTb0Zhci5nZXQoa2V5KV0gPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gZXhwYW5kZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2tleV1bdHlwZU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm8ga2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBrZXlzU29GYXIuc2V0KGtleSwgdHlwZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGlzIG9iamVjdCBhbmQgdGhlbiBwZXJmb3JtcyBvcGVyYXRpb25zIHRvXG4gICAgICogZHJpdmUgaXRzIHZhbHVlIHRvIHRoZSBnaXZlbiBKU09OLWxpa2UgT2JqZWN0LlxuICAgICAqIFByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGJvb2xlYW5zLCBudW1iZXJzLCBzdHJpbmdzLFxuICAgICAqIFNldHMsIG9yIG9iamVjdHMgYXJlIGlnbm9yZWQ7IG9iamVjdHMgYmVzaWRlcyBTZXRzXG4gICAgICogYXJlIHByb2Nlc3NlZCByZWN1cnNpdmVseS5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBJZiBuZXdWYWx1ZSBjb21lcyBmcm9tIGEgSnNvbkNyZHQncyAudmFsdWUgb3IgZ2V0QXNPYmplY3RcbiAgICAgKiBtZXRob2RzLCBub3RlIHRoYXQgc2V0cy9hcnJheXMgb2Ygc3RyaW5ncyByZXN1bHRpbmcgZnJvbVxuICAgICAqIG11bHRpLXZhbHVlIHJlZ2lzdGVycyB3aWxsIGJlIHRyZWF0ZWQgYXMgc2V0cywgbm90XG4gICAgICogc3RyaW5nIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgbmV3VmFsdWUgVGhlIHZhbHVlIHRvIHNldCB0by5cbiAgICAgKiBAcGFyYW0gbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3RcbiAgICAgKiBJZiBuZXdWYWx1ZSB3YXMgZ2VuZXJhdGVkIGJ5IGdldEFzT2JqZWN0LCB0aGUga2V5Q29uZmxpY3RSdWxlXG4gICAgICogdXNlZCB0byBnZW5lcmF0ZSBpdCwgc28gdGhhdCB3ZSBjYW4gdW5kbyB0aGUgZWZmZWN0XG4gICAgICogb2YgdGhhdCBydWxlLiAgT3B0aW9uczpcbiAgICAgKiAtIEVycm9yT25Db25mbGljdCAoZGVmYXVsdCk6IGtleXMgYW5kIHZhbHVlcyBhcmUgdXNlZCBsaXRlcmFsbHksXG4gICAgICogd2l0aCBpbmZlcnJlZCB0eXBlcy5cbiAgICAgKiBUaGlzIGlzIGFwcHJvcHJpYXRlIGZvciBPYmplY3RzIG5vdCBjb21pbmcgZnJvbSBhIEpzb25DcmR0J3NcbiAgICAgKiBnZXRBc09iamVjdCBmdW5jdGlvbiwgaW4gd2hpY2ggd2Ugd2FudCB0byBrZWVwIGtleXMgYXNcbiAgICAgKiB0aGV5IGFyZS5cbiAgICAgKiAtIFByZWZpeFR5cGVzOiBUeXBlcyBhcmUgdGFrZW4gZnJvbSBwcmVmaXhlcyBvbiBrZXlzLiAgSWYgYVxuICAgICAqIGtleSBkb2VzIG5vdCBoYXZlIGEgdHlwZSBwcmVmaXgsIGl0IGlzIGlnbm9yZWQuXG4gICAgICogLSBFeHBhbmRPbkNvbmZsaWN0OiBvYmplY3RzIHdpdGggYSBwcm9wZXJ0eSBcImpzb25DcmR0S2V5RXhwYW5kZWRcIiBzZXRcbiAgICAgKiB0byB0cnVlIGFyZSBpbnRlcnByZXRlZCBhcyB0aGUgcmVzdWx0IG9mIGV4cGFuZGluZyBhXG4gICAgICoga2V5IGR1ZSB0byBhIGNvbmZsaWN0LiAgSWYgc3VjaCBhbiBvYmplY3QgZG9lcyBub3QgaGF2ZVxuICAgICAqIHRoZSBleHBlY3RlZCBmb3JtYXQsIGFueSBwcm9wZXJ0aWVzIHdpdGggdW5yZWNvZ25pemVkIG5hbWVzXG4gICAgICogYXJlIGlnbm9yZWQuXG4gICAgICovXG4gICAgc2V0VG9PYmplY3QobmV3VmFsdWUsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMubWVyZ2VPYmplY3RJbnRlcm5hbChuZXdWYWx1ZSwgbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gb3BlcmF0aW9ucyB0byBkcml2ZSB0aGlzIENyZHQncyB2YWx1ZSB0byB0aGVcbiAgICAgKiBnaXZlbiBKU09OLWxpa2UgT2JqZWN0J3Mgc3RhdGUsIGJ1dCB3aXRob3V0IHJlc2V0dGluZ1xuICAgICAqIHRoZSBjdXJyZW50IHZhbHVlLiAgVGhlIG1haW4gZWZmZWN0IG9mIHRoaXMgaXMgdG9cbiAgICAgKiBtZXJnZSBrZXlzOyBpbiBjYXNlIG9mIGtleSBjb25mbGljdHMsIHRoZSB2YWx1ZXMgYXJlIG1lcmdlZFxuICAgICAqIGluIGEgdHlwZS1zcGVjaWZpYyB3YXkgKFRPRE86IGRldGFpbHMpLlxuICAgICAqXG4gICAgICogTm90ZSB0aGlzIGlzIG5vdCBhIG1lcmdlIGluIHRoZSBzZW5zZSBvZiBhIHN0YXRlLWJhc2VkIENyZHQuXG4gICAgICogSW5zdGVhZCwgaXQgdGhlIENyZHQgdmVyc2lvbiBvZiBtZXJnaW5nIG9yZGluYXJ5IChub24tQ3JkdClcbiAgICAgKiBPYmplY3RzLCBieSByZWN1cnNpdmVseSBjb21iaW5pbmcgdGhlaXIga2V5LXZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogVE9ETzogZm9yIG5vdywgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgdG8gc2V0cy5cbiAgICAgKlxuICAgICAqIFNlZSB0aGUgZGVzY3JpcHRpb24gb2Ygc2V0VG9PYmplY3QgZm9yIGRpc2NsYWltZXJzIGFuZFxuICAgICAqIG90aGVyS2V5Q29uZmxpY3RSdWxlLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgY2hhbmdlcz9cbiAgICAgKiBAcGFyYW0gIG90aGVyIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBtZXJnZU9iamVjdChvdGhlciwgb3RoZXJLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMubWVyZ2VPYmplY3RJbnRlcm5hbChvdGhlciwgb3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIG1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIEpzb25DcmR0LmNoZWNrS2V5Q29uZmxpY3RSdWxlKG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgLy8gRXh0cmFjdCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5IG9mIFtuYW1lLCB0eXBlLCB2YWx1ZV1cbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gb3RoZXIpIHtcbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWUgPSBvdGhlcltwcm9wTmFtZV07XG4gICAgICAgICAgICBsZXQgdHlwZTtcbiAgICAgICAgICAgIGlmIChvdGhlcktleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBwcm9wTmFtZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICAgdHlwZSA9IHByb3BOYW1lLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZSA9IHByb3BOYW1lLnNsaWNlKGluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyBNdWx0aS12YWx1ZWQgc3RyaW5ncyBhcmUgdHJlYXRlZCBhcyBzZXRzXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwic2V0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChbcHJvcE5hbWUsIHR5cGUsIG90aGVyW3Byb3BOYW1lXV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdGUgcHJvcGVydGllcyBtYXkgZ3JvdyBkdXJpbmcgZXhlY3V0aW9uIGR1ZSB0b1xuICAgICAgICAvLyB1bnBhY2tpbmcgZXhwYW5kZWQga2V5cy5cbiAgICAgICAgbGV0IG9yaWdpbmFsTGVuZ3RoID0gcHJvcGVydGllcy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByb3BOYW1lID0gcHJvcGVydGllc1tpXVswXTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gcHJvcGVydGllc1tpXVsxXTtcbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWUgPSBwcm9wZXJ0aWVzW2ldWzJdO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGFuIGV4cGFuZGVkIGtleVxuICAgICAgICAgICAgaWYgKG90aGVyS2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0ICYmXG4gICAgICAgICAgICAgICAgaSA8IG9yaWdpbmFsTGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIHByb3BWYWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtcImpzb25DcmR0S2V5RXhwYW5kZWRcIl0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBVbnBhY2sgdGhlIG9iamVjdCBvbnRvIHRoZSBlbmQgb2YgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGV4cGFuZGVkTmFtZSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGFuZGVkTmFtZSAhPT0gXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChbcHJvcE5hbWUsIGV4cGFuZGVkTmFtZSwgcHJvcFZhbHVlW2V4cGFuZGVkTmFtZV1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHByb3BlcnR5LCBjaGVja2luZyB0aGF0IGl0J3MgdHlwZVxuICAgICAgICAgICAgICAgIC8vIGlzIG9uZSB3ZSBleHBlY3QuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdDogbWVyZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdChwcm9wTmFtZSwge30pLm1lcmdlT2JqZWN0SW50ZXJuYWwocHJvcFZhbHVlLCBvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBib29sZWFuLCBudW1iZXIsIHN0cmluZzogb3ZlcndyaXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlSW50ZXJuYWwocHJvcE5hbWUsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gXCJzZXRcIiAmJiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQ6IGFkZCBhbGwgdmFsdWVzIGluIHNldFxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0Q3JkdCA9IHRoaXMuaW5pdChwcm9wTmFtZSwgbmV3IFNldCgpKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgcHJvcFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3JkdC5hZGQoZW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbHNlIHNraXAgdGhlIGVudHJ5IChub3QgYSByZWNvZ25pemVkIHR5cGUpLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGlzLmdldEFzT2JqZWN0KCkuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBc09iamVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgdGhpcy5zZXRBc09iamVjdChuZXdWYWx1ZSkuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0VG9PYmplY3QobmV3VmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuSnNvbkNyZHQgPSBKc29uQ3JkdDtcbi8vIFRPRE86IGRlbGV0ZVxuLy8gVE9ETzogZGVsZXRlU3Ryb25nIChvbmNlIG1hcCBzdXBwb3J0cyBpdC4gIFBlcmhhcHMgdGhyb3dcbi8vIGVycm9yIG9uIG1hcCB2YWx1ZXMgb25seT8pXG5Kc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QgPSAxO1xuSnNvbkNyZHQuUHJlZml4VHlwZXMgPSAyO1xuSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCA9IDM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc29uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EZWZhdWx0UmVzZXR0YWJsZUNyZHQgPSBleHBvcnRzLk9ic2VydmVkUmVzZXRDb21wb25lbnQgPSBleHBvcnRzLkRlZmF1bHRSZXNldFdpbnNDcmR0ID0gZXhwb3J0cy5SZXNldFdpbnNDb21wb25lbnQgPSB2b2lkIDA7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbmNvbnN0IHNlbWlkaXJlY3RfMSA9IHJlcXVpcmUoXCIuL3NlbWlkaXJlY3RcIik7XG4vLyBUT0RPOiBob3cgdG8gZG8gZ2FyYmFnZSBjb2xsZWN0aW9uIG9mIHJlc2V0LXdpbnMgb3BlcmF0aW9ucz9cbi8vIEUuZy4gZm9yIGZsYWdzIGluIGEgc2V0OiBnYXJiYWdlIGNvbGxlY3Rpb24gd2lsbCBmYWlsIGlmXG4vLyB0aGVyZSBhcmUgcmVzZXQtd2lucyBvcHMgaW4gdGhlIGhpc3RvcnksIGFzIGl0IHNob3VsZCwgYnV0XG4vLyB3ZSB3b3VsZCBsaWtlIHRvIGdhcmJhZ2UgY29sbGVjdCBhbnl3YXkgb25jZSBhbGwgdGhlIHJlc2V0LXdpbnNcbi8vIGFyZSBjYXVzYWxseSBzdGFibGUuXG5jbGFzcyBSZXNldFdpbnNDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdCA9IG9yaWdpbmFsQ3JkdDtcbiAgICAgICAgdGhpcy5yZXNldEluaXRpYWxEYXRhID0gcmVzZXRJbml0aWFsRGF0YTtcbiAgICB9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcInJlc2V0XCI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGFsd2F5cyBcInJlc2V0XCIuXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIF9zdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIHdlIHNob3VsZCByZXR1cm4gYSBjbG9uZSBvZiB0aGUgcmVzZXQgc3RhdGUsIG5vdFxuICAgICAgICAvLyBhIGZpeGVkIFwicmVzZXQgc3RhdGVcIiwgc2luY2UgdGhlIHJldHVybmVkIHN0YXRlIG1heVxuICAgICAgICAvLyBiZSBtdXRhdGVkIGxhdGVyLlxuICAgICAgICByZXR1cm4gW3RoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZSh0aGlzLnJlc2V0SW5pdGlhbERhdGEpLCBcInJlc2V0XCJdO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkVG8ob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChvcmlnaW5hbENyZHQsIG5ldyBSZXNldFdpbnNDb21wb25lbnQob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSwgKF9tMiwgX20xKSA9PiBudWxsLCAxLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVzZXRXaW5zQ29tcG9uZW50ID0gUmVzZXRXaW5zQ29tcG9uZW50O1xuY2xhc3MgRGVmYXVsdFJlc2V0V2luc0NyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIG9yaWdpbmFsQ3JkdEludGVybmFsICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJlc2V0SW5pdGlhbERhdGEgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBsZXQgY3JkdFdyYXBwZWQgPSBSZXNldFdpbnNDb21wb25lbnQuYWRkVG8ob3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGEpO1xuICAgICAgICBzdXBlcihpZCwgY3JkdFdyYXBwZWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbFJlc2V0V2lucyA9IG9yaWdpbmFsQ3JkdEludGVybmFsO1xuICAgIH1cbiAgICByZXNldFN0cm9uZygpIHtcbiAgICAgICAgc3VwZXIuYXBwbHlPcChbMiwgXCJyZXNldFwiXSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0U3Ryb25nTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFsyLCBcInJlc2V0XCJdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSBvcGVyYXRpb25zIGludGVuZGVkIGZvciB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAqIGJ5IHRyYW5zbGF0aW5nIHRoZW0gZm9yIHRoZSByZXNldHRhYmxlIENSRFQgYW5kIGNhbGxpbmdcbiAgICAgKiBzdXBlci5hcHBseU9wcy5cbiAgICAgKi9cbiAgICBhcHBseU9wKG9wZXJhdGlvbikge1xuICAgICAgICByZXR1cm4gc3VwZXIuYXBwbHlPcChbMSwgb3BlcmF0aW9uXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YmNsYXNzZXMgdGhhdCB3YW50IHRvIHRyYW5zbGF0ZSBvcGVyYXRpb25zIGZyb21cbiAgICAgKiB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsIHNob3VsZCBvdmVycmlkZVxuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGEgcmVzZXQtd2lucyBvcGVyYXRpb24gaXNcbiAgICAgKiBbXCJyZXNldFN0cm9uZ1wiXSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGl0IGNoYW5nZWQgdGhlIHN0YXRlLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9wZXJhdGlvbiB0aGF0IGdldHMga2lsbGVkIGJ5XG4gICAgICogYSBjb25jdXJyZW50IHJlc2V0LXdpbnMgaXMgc2tpcHBlZC5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcmlnaW5hbENyZHRJbnRlcm5hbFxuICAgICAqIG9wZXJhdGlvbnMgaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLFxuICAgICAqIHdoaWNoIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zLCBvciBudWxsIGlmIGFsbFxuICAgICAqIGRlc2NyaXB0aW9ucyBhcmUgbnVsbC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gW107XG4gICAgICAgIGZvciAobGV0IGRlc2Mgb2YgZGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZGVzYyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXdpbnMgZGVzY3JpcHRpb24gaXMgWzIsIFwicmVzZXRcIl1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDIgJiYgZGVzY1sxXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKFtcInJlc2V0U3Ryb25nXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsQ3JkdE9wZXJhdGlvbiBpcyBvZiB0aGUgZm9ybSBbMSwgZGVzY11cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzY1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVkLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnModHJhbnNsYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyhkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG4gICAgZ2V0IG9yaWdpbmFsU3RhdGVSZXNldFdpbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZhdWx0UmVzZXRXaW5zQ3JkdCA9IERlZmF1bHRSZXNldFdpbnNDcmR0O1xuLy8gVE9ETzogcmVuYW1lIG9yaWdpbmFsQ3JkdEludGVybmFsIChhYm92ZSkgYW5kIG9yaWdpbmFsQ3JkdFxuLy8gdG8gcmVmbGVjdCByZXNldC13aW5zIHZzIHJlc2V0LCB0byBhdm9pZCBjb25mdXNpb24uXG5jbGFzcyBPYnNlcnZlZFJlc2V0Q29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHQgPSBvcmlnaW5hbENyZHQ7XG4gICAgICAgIHRoaXMucmVzZXRJbml0aWFsRGF0YSA9IHJlc2V0SW5pdGlhbERhdGE7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBbXCJyZXNldFwiLCBsaXN0IG9mXG4gICAgICogdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieSBvcmlnaW5hbENyZHQgd2hlbiBwcm9jZXNzaW5nXG4gICAgICogdGhlIG1lc3NhZ2VzIGFwcGVhcmluZyBpbiBtZXNzYWdlIChpLmUuLCB0aGUgbWVzc2FnZXMgdGhhdFxuICAgICAqIGF2b2lkZWQgYmVpbmcgcmVzZXQgYmVjYXVzZSB0aGV5IHdlcmUgY29uY3VycmVudCB0byB0aGVcbiAgICAgKiByZXNldCBvcGVyYXRpb24pXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgX3N0YXRlLCByZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IHJlc2V0U3RhdGUgPSB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBjb25jdXJyZW50TWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5vcmlnaW5hbENyZHQuZWZmZWN0KGNvbmN1cnJlbnRNZXNzYWdlWzBdLCByZXNldFN0YXRlLCByZXBsaWNhSWQsIGNvbmN1cnJlbnRNZXNzYWdlWzFdKTtcbiAgICAgICAgICAgIHJlc2V0U3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmVzZXRTdGF0ZSwgW1wicmVzZXRcIiwgZGVzY3JpcHRpb25zXV07XG4gICAgfVxuICAgIHN0YXRpYyBhZGRUbyhvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChuZXcgT2JzZXJ2ZWRSZXNldENvbXBvbmVudChvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpLCBvcmlnaW5hbENyZHQsIChtMiwgbTEpID0+IHsgbTEucHVzaChtMik7IHJldHVybiBtMTsgfSwgMiwgdHJ1ZSwgdHJ1ZSwga2VlcE9ubHlNYXhpbWFsKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmVkUmVzZXRDb21wb25lbnQgPSBPYnNlcnZlZFJlc2V0Q29tcG9uZW50O1xuY2xhc3MgRGVmYXVsdFJlc2V0dGFibGVDcmR0IGV4dGVuZHMgRGVmYXVsdFJlc2V0V2luc0NyZHQge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhLCBydW50aW1lLCBpbml0aWFsRGF0YSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudC5hZGRUbyhvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwga2VlcE9ubHlNYXhpbWFsKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCByZXNldEluaXRpYWxEYXRhLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgb3AgaWYgd2UncmUgYWxyZWFkeSByZXNldCAob2theSBnaXZlblxuICAgICAgICAvLyBvYnNlcnZlLXJlc2V0IHNlbWFudGljcykuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCkpIHtcbiAgICAgICAgICAgIHN1cGVyLmFwcGx5T3AoWzEsIFwicmVzZXRcIl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gTm90ZSBoZXJlIHdlIGhhdmUgdG8gYWNjb3VudCBmb3IgdGhlIHJlc2V0LXdpbnMgbGF5ZXJcbiAgICAgICAgLy8gKGl0J3Mgbm90IHdyYXBwZWQgYXV0b21hdGljYWxseSBsaWtlIGluIHN1cGVyLmFwcGx5T3BzKS5cbiAgICAgICAgcmV0dXJuIFsxLCBbMSwgW11dXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgYXBwbHlPcChvcGVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzIsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlIGluc3RlYWQgb2YgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBUcmFuc2xhdGVzIGludGVybmFsIChzZW1pZGlyZWN0IHByb2R1Y3QtYmFzZWQpIGRlc2NyaXB0aW9uc1xuICAgICAqIHNvIHRoYXQ6XG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb2JzZXJ2ZWQtcmVzZXQgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRcIiwgW1RPRE86IHJlLWFwcGxpZWQgb3BzXV0uXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBpcyB1bmNoYW5nZWQsIGV4Y2VwdCBmb3IgbnVsbCBkZXNjcmlwdGlvbnMsIHdoaWNoXG4gICAgICogYXJlIHNraXBwZWQuXG4gICAgICogVGhlbiByZXR1cm5zIHRoZSByZXN1bHQgb2YgcGFzc2luZyB0aGlzIGxpc3QgdG9cbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlLCBvciBudWxsIGlmIGFsbFxuICAgICAqIGRlc2NyaXB0aW9ucyBhcmUgbnVsbC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gW107XG4gICAgICAgIGZvciAobGV0IGRlc2Mgb2YgZGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZGVzYyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXN0cm9uZyAoYWxyZWFkeSB0cmFuc2xhdGVkIGJ5IERlZmF1bHRSZXNldFdpbnNDcmR0KVxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb24gaXMgXCJyZXNldFN0cm9uZ1wiXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPYnNlcnZlZCByZXNldCBkZXNjcmlwdGlvbiBpcyBbMSwgW1wicmVzZXRcIixcbiAgICAgICAgICAgIC8vIGxpc3Qgb2YgcmUtYXBwbGllZCBvcHNdXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMSAmJiBkZXNjWzFdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbiB0aGUgc2Vjb25kIGVudHJ5LCBwdXQgdGhlIHRyYW5zbGF0ZWRcbiAgICAgICAgICAgICAgICAvLyBvcGVyYXRpb25zIHRoYXQgZGlkbid0IGdldCByZXNldC4gIEtlZXAgaW5cbiAgICAgICAgICAgICAgICAvLyBtaW5kIHRoYXQgdGhlc2Ugd2lsbCBiZSBkZXNjcmlwdGlvbnMgZnJvbSB0aGVcbiAgICAgICAgICAgICAgICAvLyBpbm5lcm1vc3Qgc2VtaWRpcmVjdCBwcm9kdWN0LiAgV2hhdCB0byBkb1xuICAgICAgICAgICAgICAgIC8vIGFib3V0IG9wZXJhdGlvbnMgdGhhdCB3ZXJlIG9yaWdpbmFsbHkgZ3JvdXBlZFxuICAgICAgICAgICAgICAgIC8vIGF0b21pY2FsbHksIHNpbmNlIHRyYW5zbGF0ZSBleHBlY3RzIHRob3NlXG4gICAgICAgICAgICAgICAgLy8gdG8gYmUgZGVsaXZlcmVkIHRvZ2V0aGVyP1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFwiLCBkZXNjWzFdWzFdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzIsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSh0cmFuc2xhdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpbnN0ZWFkIG9mIHRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKiBTZWUgQ3JkdC50cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG4gICAgZ2V0IG9yaWdpbmFsU3RhdGVSZXNldHRhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZhdWx0UmVzZXR0YWJsZUNyZHQgPSBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNldHRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaXJlY3RJbnRlcm5hbCA9IGV4cG9ydHMuU2VtaWRpcmVjdEludGVybmFsID0gZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSB2b2lkIDA7XG4vLyBUT0RPOiBmdXR1cmUgb3B0czogaW5kZXhlZCBtZXNzYWdlczsgc2V0dGluZyB0aGUgaGlzdG9yeVxuLy8gdG8gYSBzdWJzZXQ7IGNhdXNhbCBzdGFiaWxpdHkuXG4vLyBUT0RPOiBmb3IgdGhpcyB0byB3b3JrLCByZXBsaWNhSWQncyBtdXN0IGJlIGNvbXBhcmFibGUgYWNjb3JkaW5nXG4vLyB0byB0aGUgc2FtZS1lcXVhbHMgYXBwcm9hY2guICBUeXBpY2FsbHksIHRoaXMgcmVxdWlyZXMgdGhlbVxuLy8gdG8gYmUgcHJpbWl0aXZlIHR5cGVzLCBhcyBvYmplY3RzIHdoaWNoIGFyZSBlcXVhbC12YWx1ZWQgYnV0IGhhdmVcbi8vIGRpZmZlcmVudCBwb2ludGVycyB3aWxsIGJlIGNvbnNpZGVyZWQgZGlmZmVyZW50LlxuLy8gVE9ETzogbWVudGlvbiB0aGF0IHRvIGdldCBhIHByb3BlciBDUkRUIChlcXVhbCBpbnRlcm5hbCBzdGF0ZXMpLFxuLy8gd2UgdGVjaG5pY2FsbHkgbXVzdCBjb21wYXJlIHJlY2VpcHQgb3JkZXJzIGFzIGVxdWl2YWxlbnQgaWZcbi8vIHRoZXkgYXJlIGJvdGggaW4gY2F1c2FsIG9yZGVyLlxuY2xhc3MgU2VtaWRpcmVjdFN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihpbnRlcm5hbFN0YXRlLCBoaXN0b3J5VGltZXN0YW1wcywgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbFN0YXRlID0gaW50ZXJuYWxTdGF0ZTtcbiAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA9IGhpc3RvcnlUaW1lc3RhbXBzO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogTWFwcyBhIHJlcGxpY2EgaWQgdG8gYW4gYXJyYXkgb2YgbWVzc2FnZXMgc2VudCBieSB0aGF0XG4gICAgICAgICAqIHJlcGxpY2EsIGluIG9yZGVyLiAgU3BlY2lmaWNhbGx5LCBhcnJheSBlbGVtZW50cyBhcmUgdHVwbGVzXG4gICAgICAgICAqIFtwZXItc2VuZGVyIG1lc3NhZ2UgY291bnRlciwgdGhpcyByZXBsaWNhJ3MgcmVjZWlwdCBjb3VudGVyLFxuICAgICAgICAgKiBtZXNzYWdlXS4gIEtlZXAgaW4gbWluZCB0aGF0IHBlci1zZW5kZXIgbWVzc2FnZVxuICAgICAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gQ3JkdFJ1bnRpbWUgYW5kIGJldHdlZW5cbiAgICAgICAgICogYSBzZW1pZGlyZWN0IHByb2R1Y3QgYW5kIGl0cyBjb21wb25lbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgbWVzc2FnZSB0byB0aGUgaGlzdG9yeSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAuXG4gICAgICogcmVwbGljYUlkIGlzIG91ciByZXBsaWNhIGlkLlxuICAgICAqL1xuICAgIGFkZChyZXBsaWNhSWQsIG1lc3NhZ2UsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpO1xuICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW5kZXJIaXN0b3J5ID0gW107XG4gICAgICAgICAgICB0aGlzLmhpc3Rvcnkuc2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgc2VuZGVySGlzdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1lc3NhZ2VNYXliZVdpdGhUaW1lc3RhbXAgPSB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzID9cbiAgICAgICAgICAgIFttZXNzYWdlLCB0aW1lc3RhbXBdIDogbWVzc2FnZTtcbiAgICAgICAgc2VuZGVySGlzdG9yeS5wdXNoKFt0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpLCB0aGlzLnJlY2VpcHRDb3VudGVyLCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wXSk7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIrKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHRydWUsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc3BlY2lmaWVkIGFjdGlvbnMgb24gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5OlxuICAgICAqIC0gaWYgcmV0dXJuQ29uY3VycmVudCBpcyB0cnVlLCByZXR1cm5zIHRoZSBsaXN0IG9mXG4gICAgICogYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGltZXN0YW1wLCBpblxuICAgICAqIHJlY2VpcHQgb3JkZXIuXG4gICAgICogLSBpZiBkaXNjYXJkRG9taW5hdGVkIGlzIHRydWUsIGRlbGV0ZXMgYWxsIG1lc3NhZ2VzIGZyb21cbiAgICAgKiB0aGUgaGlzdG9yeSB3aG9zZSB0aW1lc3RhbXBzIGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnlcbiAgICAgKiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gdGltZXN0YW1wLiAgKE5vdGUgdGhhdCB0aGlzIG1lYW5zIHRoYXRcbiAgICAgKiBpZiB3ZSB3YW50IHRvIGtlZXAgYSBtZXNzYWdlIHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcCBpblxuICAgICAqIHRoZSBoaXN0b3J5LCBpdCBtdXN0IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IGFmdGVyIGNhbGxpbmdcbiAgICAgKiB0aGlzIG1ldGhvZC4pXG4gICAgICovXG4gICAgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudCwgZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPSBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyIChpLmUuLFxuICAgICAgICAgICAgLy8gYnkgdGhlIHNlY29uZCBlbnRyeSBpbiBlYWNoIHRyaXBsZSkuXG4gICAgICAgICAgICBjb25jdXJyZW50LnNvcnQoKGEsIGIpID0+IChhWzFdIC0gYlsxXSkpO1xuICAgICAgICAgICAgLy8gU3RyaXAgYXdheSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgbWVzc2FnZXMuXG4gICAgICAgICAgICByZXR1cm4gY29uY3VycmVudC5tYXAoYSA9PiBhWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbWVzc2FnZXMgc3RvcmVkIGluIHRoZSBoaXN0b3J5LFxuICAgICAqIGkuZS4sIGVpdGhlciB0aGVyZSBoYXZlIGJlZW4gbm8gY3JkMSBtZXNzYWdlcywgb3JcbiAgICAgKiBvdXIgU2VtaWRpcmVjdEludGVybmFsJ3MgaGlzdG9yeUtlZXBPbmx5Q29uY3VycmVudCBmbGFnIGlzIHRydWVcbiAgICAgKiBhbmQgYWxsIGNyZHQxIG1lc3NhZ2VzIGhhdmUgYmVlbiBjYXVzYWxseSBsZXNzIHRoYW4gYSBjcmR0MlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgaXNIaXN0b3J5RW1wdHkoKSB7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuaGlzdG9yeS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciB3b3JraW5nIHdpdGggdGhlIHBlci1zZW5kZXIgaGlzdG9yeVxuICAgICAqIGFycmF5cy4gIFJldHVybnMgdGhlIGluZGV4IGFmdGVyIHRoZSBsYXN0IGVudHJ5IHdob3NlXG4gICAgICogcGVyLXNlbmRlciBjb3VudGVyICh0aGUgZmlyc3QgdHVwbGUgZWxlbWVudCkgaXMgPD1cbiAgICAgKiB2YWx1ZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZXhBZnRlcihzcGFyc2VBcnJheSwgdmFsdWUpIHtcbiAgICAgICAgLy8gVE9ETzogYmluYXJ5IHNlYXJjaCB3aGVuIHNwYXJzZUFycmF5IGlzIGxhcmdlXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGVyZSBtYXkgYmUgZHVwbGljYXRlIHRpbWVzdGFtcHMuXG4gICAgICAgIC8vIFNvIGl0IHdvdWxkIGJlIGluYXBwcm9wcmlhdGUgdG8gZmluZCBhbiBlbnRyeSB3aG9zZVxuICAgICAgICAvLyBwZXItc2VuZGVyIGNvdW50ZXIgZXF1YWxzIHZhbHVlIGFuZCBpbmZlciB0aGF0XG4gICAgICAgIC8vIHRoZSBkZXNpcmVkIGluZGV4IGlzIDEgZ3JlYXRlci5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGFyc2VBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNwYXJzZUFycmF5W2ldWzBdID4gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYXJzZUFycmF5Lmxlbmd0aDtcbiAgICB9XG59XG5leHBvcnRzLlNlbWlkaXJlY3RTdGF0ZSA9IFNlbWlkaXJlY3RTdGF0ZTtcbmNsYXNzIFNlbWlkaXJlY3RJbnRlcm5hbCB7XG4gICAgLyoqXG4gICAgICogQ3JkdEludGVybmFsIGltcGxlbWVudGluZyB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IG9mXG4gICAgICogY3JkdDEgYW5kIGNyZHQyIHdpdGggdGhlIGdpdmVuIGFjdGlvbiwgd2hpY2ggaXMgYSBmdW5jdGlvblxuICAgICAqIChtMjogY3JkdDIgbWVzc2FnZSwgbTE6IGNyZHQxIG1lc3NhZ2UpOiBjcmR0MSBtZXNzYWdlLlxuICAgICAqIGNyZHQxLCBjcmR0MiwgYW5kIGFjdGlvbiBtdXN0IHNhdGlzZnkgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdFxuICAgICAqIGFzc3VtcHRpb25zIGZyb20gb3VyIHBhcGVyLlxuICAgICAqXG4gICAgICogVE9ETzogb3B0aW9ucyBhbmQgdGhlaXIgdGhlb3JldGljYWwgc2lnbmlmaWNhbmNlLiAgRm9ybWFsbHksXG4gICAgICogaGlzdG9yeVRpbWVzdGFtcHMgPSB0cnVlIG1lYW5zIHRoYXQgdGltZXN0YW1wcyBiZWNvbWVcbiAgICAgKiBwYXJ0IG9mIHRoZSBjcmR0MiBtZXNzYWdlcy4gIEFsc28gY3JlYXRlQ3JkdEluZGV4LlxuICAgICAqIERvbWluYXRlZCBzdGF0cyBjb250cm9sIHdoZXRoZXIgeW91IGRpc2NhcmQgbWVzc2FnZXMgaW4gdGhlXG4gICAgICogaGlzdG9yeSB0aGF0IGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnkgY3JkdDEvY3JkdDIgbWVzc2FnZXM7XG4gICAgICogbmVlZCB0byBlbnN1cmUgdGhhdCBhY3Rpb24gaXMgdGhlIHNhbWUgd2l0aCB0aG9zZSBtZXNzYWdlc1xuICAgICAqIGRpc2NhcmRlZC4gIElmIGRvbWluYXRlZDEgaXMgc2V0LCB0aGVuIHN0YXRlLmlzSGlzdG9yeUVtcHR5KClcbiAgICAgKiBiZWNvbWVzICh0aGVyZSBleGlzdHMgYSBjcmR0MiBtZXNzYWdlIG5vdCBjYXVzYWxseSBkb21pbmF0ZWQgYnkgYVxuICAgICAqIGNyZHQxIG1lc3NhZ2UpLiAgQ2hlY2sgdGhpcyBpcyBzdGlsbCB0cnVlIGlmIGRvbWluYXRlZDIgaXMgc2V0LilcbiAgICAgKiBFeHBsYWluIGV4YW1wbGVzIHdoZXJlIHRoaXMgaXMgdXNlZCAocmVzZXR0YWJsZSwgZmxhZ3MpOyBpdCdzXG4gICAgICogbm90IHF1aXRlIGluIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3Qgc3Bpcml0IHVubGVzcyB5b3UgdGhpbmtcbiAgICAgKiBvZiBpdCBhcyB1c2luZyB0aGUgaGlzdG9yeSBhcyBwYXJ0IG9mIHRoZSBjcmR0MS8yIHN0YXRlLlxuICAgICAqIFBvdGVudGlhbCBvcHRpbWl6YXRpb246IG9ubHkgZGVsZXRlIGRvbWluYXRlZCBtZXNzYWdlcyB3aGVuXG4gICAgICogcmVjZWl2aW5nIG91ciBvd24gbWVzc2FnZSAoaXQncyBiYXNpY2FsbHkgZnJlZSBhbmQgYWx3YXlzXG4gICAgICogY2xlYXJzIHRoZSBoaXN0b3J5KSwgb3Igb25seSBzb21ldGltZXMgKHdpbGwgbWlzcyBzb21lXG4gICAgICogbWVzc2FnZXMsIHNvIG5lZWQgdG8gZW5zdXJlIGNvcnJlY3RuZXNzIGluIHRoYXQgY2FzZVxuICAgICAqIChJIHRoaW5rIGl0IGlzIG9rYXkgZm9yIGRvbWluYXRlZDIgYnV0IG5vdCBkb21pbmF0ZWQxIGluIG91clxuICAgICAqIHRhcmdldCB1c2UgY2FzZXMpLCBidXRcbiAgICAgKiBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgZHVlIHRvIGJhdGNoaW5nIGFuZCBzdGlsbCBraWxsXG4gICAgICogb2ZmIG1vc3QgbWVzc2FnZXMpLiAgVGhpcyB0cmFkZXMgYSBzbWFsbCBpbmNyZWFzZSBpbiBzcGFjZVxuICAgICAqIHVzYWdlIGZvciBhIGRlY3JlYXNlIGluIENQVSB0aW1lLlxuICAgICAqXG4gICAgICogQXMgZGVzY3JpYmVkIGluIENyZHRJbnRlcm5hbCBhbmQgQ3JkdCwgbnVsbCBtZXNzYWdlcyBhcmUgdHJlYXRlZFxuICAgICAqIGFzIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBpZCwgYWxsb3dpbmcgdGhlbSB0byBiZSBvcHRpbWl6ZWQgYXdheS5cbiAgICAgKiBCZWNhdXNlIG9mIHRoaXMsIGFjdGlvbiB3aWxsIG5ldmVyIGJlIGNhbGxlZCB3aXRoIG51bGwgYXNcbiAgICAgKiBlaXRoZXIgaW5wdXQuICBJbnN0ZWFkLCB3ZSBiZWhhdmUgYXMgaWZcbiAgICAgKiAoYWN0aW9uKGlkIChpLmUuLCBudWxsKSwgbTEpID0gbTEpXG4gICAgICogZm9yIGFsbCBtMSBhbmQgKGFjdGlvbihtMiwgaWQpID0gaWQpIGZvciBhbGwgbTIuICBUaGUgc2VtaWRpcmVjdFxuICAgICAqIHByb2R1Y3QgYXNzdW1wdGlvbnMgbXVzdCBob2xkIGdpdmVuIHRoZXNlIGFzc2lnbm1lbnRzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNyZHQxLCBjcmR0MiwgYWN0aW9uLCBjcmVhdGVDcmR0SW5kZXgsIGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNyZHQxID0gY3JkdDE7XG4gICAgICAgIHRoaXMuY3JkdDIgPSBjcmR0MjtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMuY3JlYXRlQ3JkdEluZGV4ID0gY3JlYXRlQ3JkdEluZGV4O1xuICAgICAgICB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzID0gaGlzdG9yeVRpbWVzdGFtcHM7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZDtcbiAgICAgICAgaWYgKGNyZWF0ZUNyZHRJbmRleCAhPT0gMSAmJiBjcmVhdGVDcmR0SW5kZXggIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgY3JlYXRlQ3JkdEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGxldCBpbnRlcm5hbFN0YXRlO1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpXG4gICAgICAgICAgICBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RTdGF0ZShpbnRlcm5hbFN0YXRlLCB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzLCB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBUT0RPIChnZW5lcmFsKTogZXJyb3IgY2hlY2tpbmdcbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUsIHJlcGxpY2FJZCkge1xuICAgICAgICBpZiAob3BlcmF0aW9uWzBdID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgb3AxID0gdGhpcy5jcmR0MS5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgIGlmIChvcDEgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsxLCBvcDFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG9wMiA9IHRoaXMuY3JkdDIucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AyID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgb3AyXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLiAgRm9yIHRoaXMuY3JkdDFcbiAgICAgKiBtZXNzYWdlcywgdGhlIGRlc2NyaXB0aW9uIGlzIGZvciB0aGUgYWN0ZWQtb24gbWVzc2FnZSB0aGF0XG4gICAgICogaXMgYWN0dWFsbHkgYXBwbGllZCB0byB0aGlzLmludGVybmFsU3RhdGUsIG5vdCB0aGUgaW5wdXRcbiAgICAgKiBtZXNzYWdlLiAgQW4gZXhjZXB0aW9uIGlzIGlmIHRoZSBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbFxuICAgICAqIGNyZHQgaXMgbnVsbCAob3IgaWYgdGhlIG1lc3NhZ2UgZ2V0cyBhY3RlZCBvbiB0byBiZWNvbWUgbnVsbCksXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VbMF0gPT09IDIpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHQyLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcm5hbFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgc3RhdGUuYWRkKHJlcGxpY2FJZCwgbWVzc2FnZVsxXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgWzIsIHJlc3VsdFsxXV1dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnQgPSBzdGF0ZS5nZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIGxldCBtQWN0ID0gbWVzc2FnZVsxXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uY3VycmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG1BY3QgPSB0aGlzLmFjdGlvbihjb25jdXJyZW50W2ldLCBtQWN0KTtcbiAgICAgICAgICAgICAgICBpZiAobUFjdCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0MS5lZmZlY3QobUFjdCwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgWzEsIHJlc3VsdFsxXV1dO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0SW50ZXJuYWwgPSBTZW1pZGlyZWN0SW50ZXJuYWw7XG5jbGFzcyBEaXJlY3RJbnRlcm5hbCB7XG4gICAgLyoqXG4gICAgICogRGlyZWN0IHByb2R1Y3Qgb2YgQ3JkdEludGVybmFsJ3MuICBUaGlzIGlzIHRoZVxuICAgICAqIHNwZWNpYWwgY2FzZSBvZiBTZW1pZGlyZWN0SW50ZXJuYWwgd2hlbiB0aGUgYWN0aW9uIGlzIHRyaXZpYWxcbiAgICAgKiAoKG1fMiwgbTEpID0+IG0xKS4gIEluIHRoaXMgY2FzZSB3ZSBjYW4gb3B0aW1pemVcbiAgICAgKiBieSBub3Qga2VlcGluZyB0aGUgaGlzdG9yeSBvciBhY3Rpbmcgb24gbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBGb3IgdGhpcyB0byBiZSBhIENyZHQsIGNvbmN1cnJlbnQgbWVzc2FnZXMgb2YgdGhlIHR3byBpbnB1dFxuICAgICAqIENyZHRzIG11c3QgY29tbXV0ZS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBjb25zdHJ1Y3Rpb24gaXMgc3ltbWV0cmljIChzd2l0Y2hpbmcgY3JkdDEgYW5kXG4gICAgICogY3JkdDIgZG9lc24ndCBjaGFuZ2UgdGhlIHNlbWFudGljcyksIGV4Y2VwdCBmb3Igc3dhcHBpbmdcbiAgICAgKiB0aGUgbWVhbmluZyBvZiB0aGUgbnVtYmVycyAxLzIgaW4gY3JlYXRlQ3JkdEluZGV4IGFuZFxuICAgICAqIGluIHRoZSBmaXJzdCBjb29yZGluYXRlcyBvZiBtZXNzYWdlcyBhbmQgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmVhdGVDcmR0SW5kZXggV2hpY2ggY3JkdCdzIGNyZWF0ZSBtZXRob2QgdG8gdXNlXG4gICAgICogaW4gY3JlYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNyZHQxLCBjcmR0MiwgY3JlYXRlQ3JkdEluZGV4KSB7XG4gICAgICAgIHRoaXMuY3JkdDEgPSBjcmR0MTtcbiAgICAgICAgdGhpcy5jcmR0MiA9IGNyZHQyO1xuICAgICAgICB0aGlzLmNyZWF0ZUNyZHRJbmRleCA9IGNyZWF0ZUNyZHRJbmRleDtcbiAgICAgICAgaWYgKGNyZWF0ZUNyZHRJbmRleCAhPT0gMSAmJiBjcmVhdGVDcmR0SW5kZXggIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgY3JlYXRlQ3JkdEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUNyZHRJbmRleCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQxLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQyLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbi9tZXNzYWdlIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG9wZXJhdGlvbi9tZXNzYWdlIGZvciB0aGF0IGNyZHRdLiAgQW4gZXhjZXB0aW9uIGlzIGlmXG4gICAgICogdGhlIGludGVybmFsIGNyZHQgcmV0dXJucyBhIG51bGwgbWVzc2FnZSwgaW4gd2hpY2ggY2FzZVxuICAgICAqIHdlIGp1c3QgcmV0dXJuIG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLiAgVGhpc1xuICAgICAqIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IHNlbmRpbmcgdGhlXG4gICAgICogbWVzc2FnZS5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUsIHJlcGxpY2FJZCkge1xuICAgICAgICBsZXQgbWVzc2FnZTtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb25bMF0pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5jcmR0MS5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDIucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JkdCBudW1iZXIgaW4gb3BlcmF0aW9uOiBcIiArIG9wZXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW29wZXJhdGlvblswXSwgbWVzc2FnZV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UvZGVzY3JwdGlvbiBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBtZXNzYWdlIGZvci9kZXNjcmlwdGlvbiBmcm9tIHRoYXQgY3JkdF0uXG4gICAgICogQW4gZXhjZXB0aW9uIGlzIGlmIHRoZSBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbnRlcm5hbFxuICAgICAqIGNyZHQgaXMgbnVsbCxcbiAgICAgKiB0aGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMganVzdCBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS5cbiAgICAgKiBUaGlzIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IGNhbGxpbmcgb25jaGFuZ2UuXG4gICAgICogVE9ETzogcGVyaGFwcyBhZGQgdHJhbnNsYXRpbmcgZGVzY3JpcHRpb25zIHRvIHRoaXMgY2xhc3MsIHNvXG4gICAgICogdGhlIENyZHQgZG9lc24ndCBoYXZlIHRvIHVuZGVyc3RhbmQgYWxsIG9mIHRoZSBsYXllcnMgYXRcbiAgICAgKiBvbmNlP1xuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0MS5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNyZHQyLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JkdCBudW1iZXIgaW4gbWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRbMF0sIG51bGxdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW3Jlc3VsdFswXSwgW21lc3NhZ2VbMF0sIHJlc3VsdFsxXV1dO1xuICAgIH1cbn1cbmV4cG9ydHMuRGlyZWN0SW50ZXJuYWwgPSBEaXJlY3RJbnRlcm5hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbWlkaXJlY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFycmF5Q3JkdEludGVybmFsID0gZXhwb3J0cy5NYXBDcmR0ID0gZXhwb3J0cy5BZGRXaW5zU2V0ID0gZXhwb3J0cy5DcmR0T2JqZWN0ID0gZXhwb3J0cy5HTWFwSW50ZXJuYWwgPSBleHBvcnRzLkRpc2FibGVXaW5zRmxhZyA9IGV4cG9ydHMuRW5hYmxlV2luc0ZsYWcgPSBleHBvcnRzLk5vT3BDcmR0SW50ZXJuYWwgPSBleHBvcnRzLk9ydGhvZ29uYWxDcmR0ID0gZXhwb3J0cy5JbnRSZWdpc3RlckNyZHQgPSBleHBvcnRzLlVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHJlc2V0dGFibGVfMSA9IHJlcXVpcmUoXCIuL3Jlc2V0dGFibGVcIik7XG5jb25zdCBiYXNpY19jcmR0c18xID0gcmVxdWlyZShcIi4vYmFzaWNfY3JkdHNcIik7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbmNvbnN0IHNlbWlkaXJlY3RfMSA9IHJlcXVpcmUoXCIuL3NlbWlkaXJlY3RcIik7XG5jbGFzcyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgbl0pO1xuICAgIH1cbiAgICBtdWx0KG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBuXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgfVxufVxuZXhwb3J0cy5VbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgPSBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQ7XG4vLyBzZW1pZGlyZWN0SW5zdGFuY2UgY29tcGxldGVseSBkZXNjcmliZXMgdGhpcyBzZW1pZGlyZWN0IHByb2R1Y3RcblVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChiYXNpY19jcmR0c18xLkNvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgYmFzaWNfY3JkdHNfMS5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgKG0yLCBtMSkgPT4gbTIgKiBtMSwgMSk7XG5jbGFzcyBJbnRSZWdpc3RlckNyZHQgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbFZhbHVlID0gMCwgcmVzZXRWYWx1ZSA9IDApIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJlc2V0VmFsdWUsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIG5dKTtcbiAgICB9XG4gICAgbXVsdChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1hZGQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtkZXNjcmlwdGlvblswXSwgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cbmV4cG9ydHMuSW50UmVnaXN0ZXJDcmR0ID0gSW50UmVnaXN0ZXJDcmR0O1xuSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdEludGVybmFsKGJhc2ljX2NyZHRzXzEuQ291bnRlckludGVybmFsLmluc3RhbmNlLCBiYXNpY19jcmR0c18xLk11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCAobTIsIG0xKSA9PiBtMiAqIG0xLCAxKTtcbmZ1bmN0aW9uIHBvc2l0aXZlTW9kKGEsIGIpIHtcbiAgICBpZiAoYSA+PSAwKVxuICAgICAgICByZXR1cm4gYSAlIGI7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gYiAtICgoLWEpICUgYik7XG59XG5jbGFzcyBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIFswLCBmYWxzZV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICByZXR1cm4gcG9zaXRpdmVNb2Qob3BlcmF0aW9uLCAyICogTWF0aC5QSSk7XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gW1twb3NpdGl2ZU1vZChzdGF0ZVswXSArIG1lc3NhZ2UsIDIgKiBNYXRoLlBJKSwgc3RhdGVbMV1dLCBtZXNzYWdlXTtcbiAgICB9XG59XG5PcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbCgpO1xuY2xhc3MgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCB7XG4gICAgY3JlYXRlKF9pbml0aWFsRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZWZsZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIG9wZXJhdGlvbik7XG4gICAgICAgIHJldHVybiBcInJlZmxlY3RcIjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBcInJlZmxlY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAvLyBSZWZsZWN0aW9uIG9wZXJhdGlvbiBpcyBtdWx0aXBseWluZyBvbiB0aGUgbGVmdCxcbiAgICAgICAgLy8gc28gdG8gcHV0IGl0IGluIGNhbm9uaWNhbCBmb3JtIChnMSwgZzIpLCB3ZSBoYXZlIHRvXG4gICAgICAgIC8vIGNvbW11dGUgaXQgd2l0aCB0aGUgY3VycmVudCBnMSAocm90YXRpb24pIHZhbHVlIGJ5XG4gICAgICAgIC8vIGFjdGluZyBvbiBpdC5cbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2QoLXN0YXRlWzBdLCAyICogTWF0aC5QSSksICFzdGF0ZVsxXV0sIFwicmVmbGVjdFwiXTtcbiAgICB9XG59XG5PcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsLmluc3RhbmNlID0gbmV3IE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwoKTtcbi8qKlxuICogQ3JkdCBmb3IgdGhlIDItZGltZW5zaW9uYWwgb3J0aG9nb25hbCBncm91cCwgd2hpY2ggYWxsb3dzXG4gKiByb3RhdGlvbnMgYW5kIHJlZmxlY3Rpb25zIChhYm91dCB0aGUgb3JpZ2luKSBvZiBhbiBvYmplY3QgaW4gdGhlXG4gKiBwbGFuZS4gIEV4YW1wbGUgdXNhZ2U6IHJvdGF0aW5nIGFuZCByZWZsZWN0aW5nIG9iamVjdHMgaW5cbiAqIFBvd2VycG9pbnQuXG4gKlxuICogU3RhdGUgaXMgc3RvcmVkIGFzIHRoZSBjYW5vbmljYWwgZWxlbWVudCBvZiB0aGUgc2VtaWRpcmVjdFxuICogcHJvZHVjdCBncm91cCwgaS5lLiwgaW4gdGhlIGZvcm0gKGcxLCBnMikgZm9yIGcxIGluIHRoZSByb3RhdGlvblxuICogZ3JvdXAgKHJlYWxzIG1vZCAycGkpIGFuZCBnMiBpbiB0aGUgcmVmbGVjdGlvbiBncm91cCAoYm9vbGVhbnNcbiAqIHdpdGggdHJ1ZSBmb3IgMSBhbmQgZmFsc2UgZm9yIDApLlxuICovXG5jbGFzcyBPcnRob2dvbmFsQ3JkdCBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsVmFsdWUgPSBbMCwgZmFsc2VdLCByZXNldFZhbHVlID0gWzAsIGZhbHNlXSkge1xuICAgICAgICBzdXBlcihpZCwgT3J0aG9nb25hbENyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbmdsZSBpcyBpbiByYWRpYW5zIENDVy5cbiAgICAgKi9cbiAgICByb3RhdGUoYW5nbGUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBhbmdsZV0pO1xuICAgIH1cbiAgICByZWZsZWN0SG9yaXpvbnRhbEF4aXMoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgXCJyZWZsZWN0XCJdKTtcbiAgICB9XG4gICAgcmVmbGVjdFZlcnRpY2FsQXhpcygpIHtcbiAgICAgICAgdGhpcy5yZWZsZWN0KE1hdGguUEkgLyAyKTtcbiAgICB9XG4gICAgcmVmbGVjdChhbmdsZUF4aXMpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucm90YXRlKC1hbmdsZUF4aXMpO1xuICAgICAgICB0aGlzLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgICAgICB0aGlzLnJvdGF0ZShhbmdsZUF4aXMpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIGlzIGdpdmVuIGJ5OiByZWZsZWN0IGFjcm9zcyB0aGUgeC1heGlzXG4gICAgICogaWYgcmVmbGVjdGVkIGlzIHRydWUsIHRoZW4gcm90YXRlIGJ5IGFuZ2xlIChDQ1csIGluIHJhZGlhbnMpLlxuICAgICAqL1xuICAgIGdldCByZWZsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIGlzIGdpdmVuIGJ5OiByZWZsZWN0IGFjcm9zcyB0aGUgeC1heGlzXG4gICAgICogaWYgcmVmbGVjdGVkIGlzIHRydWUsIHRoZW4gcm90YXRlIGJ5IGFuZ2xlIChDQ1csIGluIHJhZGlhbnMpLlxuICAgICAqL1xuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZVswXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogW3JlZmxlY3RlZCwgYW5nbGVdXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuYW5nbGUsIHRoaXMucmVmbGVjdGVkXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCByZXNldC10aGVuLXNldC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5yb3RhdGUobmV3VmFsdWVbMF0pO1xuICAgICAgICBpZiAobmV3VmFsdWVbMV0pXG4gICAgICAgICAgICB0aGlzLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8vIFRPRE86IG1hdHJpeCB2ZXJzaW9ucyBvZiBnZXQgYW5kIHNldC5cbiAgICAvLyAvKipcbiAgICAvLyAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHRyYW5zZm9ybWF0aW9uIGFzIGEgMngyIG9ydGhvZ29uYWxcbiAgICAvLyAgKiBtYXRyaXguXG4gICAgLy8gICovXG4gICAgLy8gZ2V0IG1hdHJpeCgpOiBbW251bWJlciwgbnVtYmVyXSwgW251bWJlciwgbnVtYmVyXV0ge1xuICAgIC8vXG4gICAgLy8gfVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoX2Rlc2NyaXB0aW9ucykge1xuICAgICAgICAvLyBUT0RPLiAgSnVzdCByZXR1cm5zIHRoZSByZXN1bHRpbmcgc3RhdGUgZm9yIG5vdy5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIC8vICAgICAvLyBUcmFuc2FjdGlvbiBkdWUgdG8gc2V0IHZhbHVlLCByZXR1cm4gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICAgICAgICAvLyAgICAgcmV0dXJuIFtcInNldFwiLCBkZXNjcmlwdGlvbnNbMV1bMV1dO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgLy8gaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgLy8gZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgLy8gZWxzZSByZXR1cm4gW2Rlc2NyaXB0aW9uWzBdIGFzIHN0cmluZywgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cbmV4cG9ydHMuT3J0aG9nb25hbENyZHQgPSBPcnRob2dvbmFsQ3JkdDtcbk9ydGhvZ29uYWxDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdEludGVybmFsKE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsLmluc3RhbmNlLCBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsLmluc3RhbmNlLCAoX20yLCBtMSkgPT4gLW0xLCAxKTtcbi8qKlxuICogQ3JkdEludGVybmFsIHdoaWNoIHVzZXMgYW55IHN0cmluZyBhcyBhbiBvcGVyYXRpb24vbWVzc2FnZVxuICogd2hpY2ggZG9lcyBub3RoaW5nLiAgVW5saWtlIHVzaW5nIG51bGwgbWVzc2FnZXMgdG8gaW5kaWNhdGUgdGhhdFxuICogbm90aGluZyBoYXBwZW5lZCwgdGhlIG5vb3AgbWVzc2FnZSBpcyBhbiBleHBsaWNpdCBub24tbnVsbFxuICogc3RyaW5nIHN1cHBsaWVkIGFzIHRoZSBvcGVyYXRpb24uXG4gKlxuICogVHdvIHVzZSBjYXNlczpcbiAqIC0gVG8gdW5yZXNldCBhIHN0YXRlIChlLmcuIGluIEVuYWJsZVdpbnNGbGFnIGJlbG93KS5cbiAqIC0gQXMgYSBcImhlYWRlclwiIGZvciBzZXF1ZW5jZSBvZiBvcGVyYXRpb25zIHBhc3NlZCB0byBhcHBseU9wcyxcbiAqIHNvIHRoYXQgcmVjaXBpZW50cyBjYW4ga25vdyB3aGF0IGVuZC11c2VyIG9wZXJhdGlvbiB0aGUgc2VxdWVuY2VcbiAqIGNvcnJlc3BvbmRzIHRvLlxuICovXG5jbGFzcyBOb09wQ3JkdEludGVybmFsIHtcbiAgICBjb25zdHJ1Y3RvcihjcmVhdGVGdW5jKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRnVuYyA9IGNyZWF0ZUZ1bmM7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVGdW5jKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRnVuYyhpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNyZWF0ZUZ1bmMgbm90IHN1cHBsaWVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyB0aGUgb3JpZ2luYWwgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvKG9yaWdpbmFsQ3JkdCkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5EaXJlY3RJbnRlcm5hbChvcmlnaW5hbENyZHQsIG5ldyBOb09wQ3JkdEludGVybmFsKCksIDEpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm9PcENyZHRJbnRlcm5hbCA9IE5vT3BDcmR0SW50ZXJuYWw7XG5jbGFzcyBFbmFibGVXaW5zRmxhZyBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCwgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJlXCIpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGRpc2FibGVTdHJvbmcoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTdHJvbmcoKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCk7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBkaXNhYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FbmFibGVXaW5zRmxhZyA9IEVuYWJsZVdpbnNGbGFnO1xuY2xhc3MgRGlzYWJsZVdpbnNGbGFnIGV4dGVuZHMgcmVzZXR0YWJsZV8xLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLCBydW50aW1lLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZW5hYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChcImRcIik7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCk7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBlbmFibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRGlzYWJsZVdpbnNGbGFnID0gRGlzYWJsZVdpbnNGbGFnO1xuY2xhc3MgR01hcEludGVybmFsIHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHZhbHVlQ3JkdEludGVybmFsIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gc2hvdWxkR2MgR2l2ZW4gYSB2YWx1ZSBzdGF0ZSwgcmV0dXJuIHdoZXRoZXIgaXQgaXMgc2FmZVxuICAgICAqIHRvIGdhcmJhZ2UgY29sbGVjdCBpdCwgcmVtb3ZpbmcgaXRzIGtleS12YWx1ZSBwYWlyIGZyb20gdGhlXG4gICAgICogbWFwLiAgRm9yIGNvcnJlY3RuZXNzLCBpZiBzaG91bGRHYyh2YWx1ZVN0YXRlKSBpcyB0cnVlLCB0aGVuXG4gICAgICogdmFsdWVTdGF0ZSBtdXN0IGJlIGlkZW50aWNhbCB0byB2YWx1ZUNyZHRJbnRlcm5hbC5jcmVhdGUodmFsdWVJbml0aWFsRGF0YSk7XG4gICAgICogYW5kIGlmIHNob3VsZEdjIGlzIG5vbnRyaXZpYWwsIHRoZW4gdXNlcnMgc2hvdWxkIGtlZXAgaW5cbiAgICAgKiBtaW5kIHRoYXQgc3RhdGUuaGFzKGtleSkgaXMgbm90IHJlbGlhYmxlLCBzaW5jZSBpdCBtYXkgYmVcbiAgICAgKiBmYWxzZSBldmVuIGFmdGVyIGtleSBoYXMgYmVlbiBpbml0aWFsaXplZCBiZWNhdXNlIHRoZSB2YWx1ZVxuICAgICAqIGhhcyBiZWVuIGdhcmJhZ2UgY29sbGVjdGVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNob3VsZEdjID0gKCgpID0+IGZhbHNlKSkge1xuICAgICAgICB0aGlzLnNob3VsZEdjID0gc2hvdWxkR2M7XG4gICAgfVxuICAgIGNyZWF0ZShfaW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcImFwcGx5XCIsIGtleSwgQyBtZXNzYWdlXTogYXBwbGllcyB0aGUgQyBtZXNzYWdlIHRvXG4gICAgICogdGhlIGdpdmVuIGtleSwgaW5pdGlhbGl6aW5nIHRoZSBrZXkgaWYgbmVlZGVkLlxuICAgICAqIC0gW1wiYXBwbHlTa2lwXCIsIGtleSwgQyBtZXNzYWdlXTogYXBwbGllcyB0aGUgQyBtZXNzYWdlIHRvXG4gICAgICogdGhlIGdpdmVuIGtleSwgZXhjZXB0IGZvciB0aGVpciBzZW5kZXIsIHdobyBpcyBhc3N1bWVkXG4gICAgICogdG8gaGF2ZSBhbHJlYWR5IGFwcGxpZWQgdGhlIG1lc3NhZ2UuICBUaGlzIGlzIHVzZWQgYnlcbiAgICAgKiBDcmR0VmFsdWVkR3Jvd09ubHlNYXBJbnRlcm5hbCwgd2hvc2UgbWVzc2FnZXMgYXJlXG4gICAgICogc29tZXRpbWVzIGRlcml2ZWQgZnJvbSB2YWx1ZXMgYXBwbHlpbmcgbWVzc2FnZXMgdG9cbiAgICAgKiB0aGVtc2VsdmVzLiAgVE9ETzogaW4gcHJpbmNpcGxlIGNhbiBvcHRpbWl6ZSBzbyB3ZVxuICAgICAqIGRvbid0IGhhdmUgdG8gc2VuZCBcInNraXBcIiBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIC0gW1wiaW5pdFwiLCBrZXldOiBpbml0aWFsaXplcyB0aGUgZ2l2ZW4ga2V5IHVzaW5nIGluaXRGYWN0b3J5XG4gICAgICogaWYgaXQgaXMgbm90IGFscmVhZHkgcHJlc2VudCBpbiB0aGUgbWFwLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0cyBldmVyeSB2YWx1ZSBpbiB0aGUgbWFwICh1c2luZ1xuICAgICAqIGVhY2ggdmFsdWUncyBnZXRVbml2ZXJzYWxSZXNldE9wZXJhdGlvbigpKS5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgbGV0IGtleSA9IG9wZXJhdGlvblsxXTtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb25bMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJhcHBseVwiLCBrZXksIG9wZXJhdGlvblsyXV07XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlTa2lwXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5U2tpcFwiLCBrZXksIG9wZXJhdGlvblsyXV07XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGlmICghc3RhdGUuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJpbml0XCIsIGtleV07XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjogcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluIGFkZGl0aW9uIHRvIHRoZSBtZXNzYWdlIG91dHB1dCBieSBwcmVwYXJlLCB3ZSBoYXZlXG4gICAgICogbWVzc2FnZXMgKGFyaXNpbmcgdGhyb3VnaCBzZW1kaXJlY3QgcHJvZHVjdCk6XG4gICAgICogLSBbXCJpbml0UmVzZXRcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWQgYnlcbiAgICAgKiBkZWxpdmVyaW5nIGEgcmVzZXQgbWVzc2FnZSB0byB0aGUga2V5LlxuICAgICAqIC0gW1wiaW5pdFJlc2V0U3Ryb25nXCIsIGtleV06IGRvZXMgW1wiaW5pdFwiLCBrZXldIGZvbGxvd2VkXG4gICAgICogYnkgZGVsaXZlcmluZyBhIHJlc2V0LXN0cm9uZyBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICpcbiAgICAgKiBEZXNjcmlwdGlvbiBmb3JtYXQ6XG4gICAgICogLSBmb3IgYW4gYXBwbHkvYXBwbHlTa2lwIG9wZXJhdGlvbjpcbiAgICAgKiBudWxsIChUT0RPKVxuICAgICAqIC0gZm9yIGFuIGluaXQgb3BlcmF0aW9uOiBudWxsIGlmIHRoZSBrZXkgYWxyZWFkeSBleGlzdGVkLFxuICAgICAqIG90aGVyd2lzZSBbXCJpbml0XCIsIGtleV1cbiAgICAgKiAtIGZvciBhIHJlc2V0IG9wZXJhdGlvbjogW1wicmVzZXRcIl0gKFRPRE86IGRlc2NyaXB0aW9ucyBmcm9tXG4gICAgICogcmVzZXQga2V5cylcbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBrZXkgPSBtZXNzYWdlWzFdO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBhcHBseWluZyBpdCB0byB0aGUgc3RhdGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCBnYywgdGhvdWdoLCBpbiBjYXNlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5LWFwcGxpZWQgbWVzc2FnZSBoYXMgbWFkZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBnYy1hYmxlLlxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkR2Moa2V5U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgZmFsbCB0aHJvdWdoLlxuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6IHtcbiAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5U3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5U3RhdGUucmVjZWl2ZShtZXNzYWdlWzJdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbml0U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zaG91bGRHYyhpbml0U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zZXQoa2V5LCBpbml0U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFtcImluaXRcIiwga2V5XV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2Ygc3RhdGUuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNldE1lc3NhZ2UgPSBlbnRyeVsxXS5nZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2V0TWVzc2FnZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5WzFdLnJlY2VpdmUoW3Jlc2V0TWVzc2FnZV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZEdjKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGVudHJ5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbXCJyZXNldFwiXV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuR01hcEludGVybmFsID0gR01hcEludGVybmFsO1xuLyoqXG4gKiBDb252ZW5pZW50IHJlcHJlc2VudGF0aW9uIG9mIGEgQ3JkdC12YWx1ZWQgZ3Jvdy1vbmx5IG1hcC5cbiAqXG4gKiBUT0RPOiBTb21ld2hlcmU6IG5vdGUgdGhhdCBpbml0aWFsIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG11c3QgYmVcbiAqIGEgZnVuY3Rpb24gb2YgdGhlaXIga2V5IG9ubHkgKHNvIGNhbid0IGhhdmUgdmFyeWluZyB0eXBlcyBvclxuICogaW5pdGlhbCBkYXRhKS5cbiAqXG4gKiBOIGlzIHRoZSB0eXBlIG9mIG1lbWJlciBuYW1lcyAodHlwaWNhbGx5IHN0cmluZykuXG4gKi9cbmNsYXNzIENyZHRPYmplY3QgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBUT0RPOiBwcmVkZWZpbmVkIHZzIGR5bmFtaWMgcHJvcGVydHkgY3JlYXRpb24uICBQcmVkZWZpbmVkIG9uZXNcbiAgICAgKiBoYXZlIHRvIGJlIGNyZWF0ZWQgaWRlbnRpY2FsbHkgb24gYWxsIHJlcGxpY2FzIGluXG4gICAgICogYmV0d2VlbiBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkgYW5kXG4gICAgICogZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSwgaWRlYWxseSBpbiB0aGUgY29uc3RydWN0b3IuIFRoZXlcbiAgICAgKiBhcmUgbm90IHN5bmNlZCAoZm9yIGVmZmljaWVuY3kgYW5kIHRvIHNhdmUgdGhlIHRyb3VibGVcbiAgICAgKiBvZiBzcGVjaWZ5aW5nIHByb3BlcnR5RmFjdG9yeSkuICBEeW5hbWljIHByb3BlcnRpZXNcbiAgICAgKiBjYW4gb25seSBiZSBjcmVhdGVkIHRocm91Z2ggaW5pdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUZhY3RvcnkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBwcm9wZXJ0eUZhY3RvcnkgPSBDcmR0T2JqZWN0LmRlZmF1bHRQcm9wZXJ0eUZhY3RvcnkpIHtcbiAgICAgICAgLy8gVE9ETzogZ2MgYWJpbGl0eVxuICAgICAgICBsZXQgY3JkdEludGVybmFsID0gbmV3IEdNYXBJbnRlcm5hbCgpO1xuICAgICAgICBzdXBlcihpZCwgY3JkdEludGVybmFsLCBydW50aW1lKTtcbiAgICAgICAgY3JkdEludGVybmFsLmluaXRGYWN0b3J5ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbkluaXQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHByb3BlcnR5RmFjdG9yeShrZXksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluSW5pdCA9IGZhbHNlO1xuICAgIH1cbiAgICBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHJlZ2lzdGVyKGNyZHQsIG5hbWUpIHtcbiAgICAgICAgaWYgKCEodGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uIHx8IHRoaXMuaW5Jbml0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvcGVydGllcyBjYW4gb25seSBiZSBkaXJlY3RseSBcIiArXG4gICAgICAgICAgICAgICAgXCJyZWdpc3RlcmVkIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIFwiICtcbiAgICAgICAgICAgICAgICBcImFuZCBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpLiAgRHluYW1pYyBwcm9wZXJ0aWVzIFwiICtcbiAgICAgICAgICAgICAgICBcIm11c3QgYmUgY3JlYXRlZCB3aXRoIGluaXQobmFtZSkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIHByb3BlcnR5IG5hbWU6IFwiICsgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5zZXQobmFtZSwgY3JkdCk7XG4gICAgICAgIC8vIFNraXAgc2VuZGluZyBhbiBpbml0IG1lc3NhZ2UgYWJvdXQgaXQuICBPa2F5IGJlY2F1c2Ugb2YgdGhlXG4gICAgICAgIC8vIHByZWRlZmluZWQgaW5pdGlhbGl6YXRpb24gY29udHJhY3QuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgbmFtZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgIFRoZSBpbml0aWFsaXplZCBDcmR0LlxuICAgICAqL1xuICAgIGluaXRQcm9wZXJ0eShuYW1lKSB7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3AoW1wiaW5pdFwiLCBuYW1lXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcCh0aGlzLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxuICAgIGdldFByb3BlcnR5KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgIH1cbiAgICBwcm9wZXJ0eU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5rZXlzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZXMoKTtcbiAgICB9XG4gICAgcHJvcGVydHlFbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5lbnRyaWVzKCk7XG4gICAgfVxuICAgIHNlbmQobWVzc2FnZSwgbmFtZSkge1xuICAgICAgICAvLyBDb252ZXJ0IGludG8gYW4gYXBwbHlTa2lwIG1lc3NhZ2UgZm9yIHRoZSBtYXAgdmFsdWVcbiAgICAgICAgLy8gYXQgbmFtZS4gIEhlcmUgd2Ugd2FudCB0byBza2lwIGJlY2F1c2VcbiAgICAgICAgLy8gb3VyIHJlcGxpY2EncyB2YWx1ZSBoYXMgYWxyZWFkeSBhcHBsaWVkIHRoZVxuICAgICAgICAvLyBvcGVyYXRpb24gaW50ZXJuYWxseS5cbiAgICAgICAgdGhpcy5hcHBseU9wKFtcImFwcGx5U2tpcFwiLCBuYW1lLCBtZXNzYWdlXSk7XG4gICAgfVxuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKTtcbiAgICB9XG4gICAgZ2V0TmV4dFRpbWVzdGFtcChfY3JkdElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICB9XG59XG5leHBvcnRzLkNyZHRPYmplY3QgPSBDcmR0T2JqZWN0O1xuQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5ID0gKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkR5bmFtaWNhbGx5IGNyZWF0ZWQgcHJvcGVydGllcyBhcmUgb25seSBcIiArXG4gICAgICAgIFwiYWxsb3dlZCBpZiBwcm9wZXJ0eUZhY3RvcnkgaXMgcGFzc2VkIHRvIHRoZSBcIiArXG4gICAgICAgIFwiQ3JkdE9iamVjdCBjb25zdHJ1Y3RvclwiKTtcbn07XG5jbGFzcyBBZGRXaW5zU2V0IGV4dGVuZHMgQ3JkdE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIGdjIG9uY2Ugd2UgaGF2ZSB0cmFuc2FjdGlvbnNcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUsIChuYW1lLCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBFbmFibGVXaW5zRmxhZyhuYW1lLCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICB9XG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRQcm9wZXJ0eSh2YWx1ZSkuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgZGVsZXRlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVTdHJvbmcodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSkucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXModmFsdWUpIHtcbiAgICAgICAgbGV0IHZhbHVlRmxhZyA9IHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVGbGFnID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZUZsYWcuZW5hYmxlZDtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnByb3BlcnR5RW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoZW50cnlbMV0uZW5hYmxlZClcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGVudHJ5WzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIC8vIFRPRE86IG9uY2UgaXQncyBnYydkIHdlIGNhbiBqdXN0IHVzZSB0aGlzLnN0YXRlLmtleXMoKVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS52YWx1ZXMoKTtcbiAgICB9XG59XG5leHBvcnRzLkFkZFdpbnNTZXQgPSBBZGRXaW5zU2V0O1xuY2xhc3MgTWFwQ3JkdCBleHRlbmRzIENyZHRPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCB2YWx1ZUZhY3RvcnkpIHtcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRmxhZyBpbmRpY2F0aW5nIHRoYXQgd2UgYXJlIGluIHRoZSBib2R5IG9mIGEgZGVsZXRlL1xuICAgICAgICAgKiBkZWxldGVTdHJvbmcgY2FsbCwgaGVuY2Ugd2Ugc2hvdWxkIG5vdCBhZGQgdGhpbmdzXG4gICAgICAgICAqIHRvIGtleVNldCAoYXMgYW4gb3B0aW1pemF0aW9uKS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMua2V5U2V0ID0gbmV3IEFkZFdpbnNTZXQoXCJrZXlTZXRcIiwgdGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWVNYXAgPSBuZXcgQ3JkdE9iamVjdChcInZhbHVlTWFwXCIsIHRoaXMsIHZhbHVlRmFjdG9yeSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgQ3JkdE9iamVjdC5zZW5kIHNvIHRoYXQgd2UgY2FuIGNhcHR1cmVcbiAgICAgKiBhIHNlbmQgYnkgYSB2YWx1ZU1hcCB2YWx1ZSBhbmQgZm9sbG93IGl0IHVwIHdpdGhcbiAgICAgKiBhbiBhZGQgdG8ga2V5U2V0LCB0aHVzIHJldml2aW5nIHRoZSB2YWx1ZSdzIGtleVxuICAgICAqIGlmIGFwcHJvcHJpYXRlLlxuICAgICAqXG4gICAgICogVE9ETzogc2tpcCBhZGRpbmcgdGhlIGtleSBpZiBpdCdzIGEgcmVzZXQgbWVzc2FnZT9cbiAgICAgKiBOb3Qgc3VyZSBpZiB0aGlzIGlzIHBvc3NpYmxlIGluIGdlbmVyYWwuICBCdXQgc2hvdWxkIGF0XG4gICAgICogbGVhc3QgYmUgcG9zc2libGUgZm9yIG91ciBvd24gZGVsZXRlcy5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIuc2VuZChtZXNzYWdlLCBuYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlICYmIG5hbWUgPT09IFwidmFsdWVNYXBcIikge1xuICAgICAgICAgICAgLy8gVE9ETzogZG8gdGhpcyByZWNlaXZlciBzaWRlIGluc3RlYWQsIGZvciBuZXR3b3JrIGVmZmljaWVuY3k/XG4gICAgICAgICAgICAvLyBXb3VsZCBuZWVkIHRvIHBsYWNlIHRoZSBhZGQgZmlyc3QsIHNvIHRoYXQgaXQgY2FuXG4gICAgICAgICAgICAvLyBiZSBvdmVycmlkZGVuIGJ5IGFueSBpbmNsdWRlZCBkZWxldGVzLlxuICAgICAgICAgICAgLy8gV291bGQgYWxzbyBuZWVkIHRvIGFjY291bnQgZm9yIHBvc3NpYmlsaXR5IG9mXG4gICAgICAgICAgICAvLyB0cmFuc2FjdGlvbnMuXG4gICAgICAgICAgICAvLyBBbHNvLCBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSAoc2VuZGVyKSBkbyBpdCB0b28uXG4gICAgICAgICAgICBmb3IgKGxldCBzdWJtZXNzYWdlIG9mIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VibWVzc2FnZVswXSA9PT0gXCJhcHBseVNraXBcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gc3VibWVzc2FnZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoa2V5KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMuaW5EZWxldGUpXG4gICAgICAgICAgICB0aGlzLmtleVNldC5hZGQoa2V5KTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMudmFsdWVNYXAuaW5pdFByb3BlcnR5KGtleSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlTZXQuaGFzKGtleSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU1hcC5nZXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaW5EZWxldGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nZXQoa2V5KS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKGtleSkge1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0KGtleSkucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlU3Ryb25nKGtleSk7XG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LnZhbHVlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuTWFwQ3JkdCA9IE1hcENyZHQ7XG4vLyBUT0RPOiBtYWtlIGNvcnJlc3BvbmRpbmcgQ3JkdCBmb3IgdXNlIGluIENyZHRPYmplY3Qncyxcbi8vIHNvIHVzZXJzIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgdHJhbnNsYXRpbmcgb3BzXG4vLyBhbmQgdG8gc3VwcG9ydCBidWxrL1JQQy9ob21hcCBvcHMuXG5jbGFzcyBBcnJheUNyZHRJbnRlcm5hbCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudENyZHQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50Q3JkdCA9IGVsZW1lbnRDcmR0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGFycmF5IG9mIGluaXRpYWxEYXRhIHRvXG4gICAgICogcGFzcyB0byBlYWNoIGVudHJ5J3MgY3JlYXRlIG1ldGhvZC4gIFRoZSBlbnRyaWVzXG4gICAgICogbWF5IGJlIHVuZGVmaW5lZCwgaW4gd2hpY2ggY2FzZSB1bmRlZmluZWQgd2lsbFxuICAgICAqIGJlIHBhc3NlZCB0byB0aGUgZW50cnkncyBjcmVhdGUgbWV0aG9kLiAgSW4gYW55XG4gICAgICogY2FzZSwgaW5pdGlhbERhdGEubGVuZ3RoIGlzIHVzZWQgdG8gc2V0IHRoZVxuICAgICAqIGxlbmd0aC5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGluaXRpYWxEYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGFuIGFycmF5OiBcIiArIGluaXRpYWxEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3RhdGUgPSBbXTtcbiAgICAgICAgc3RhdGUubGVuZ3RoID0gaW5pdGlhbERhdGEubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRpYWxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdGF0ZVtpXSA9IHRoaXMuZWxlbWVudENyZHQuY3JlYXRlKGluaXRpYWxEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgb3BlcmF0aW9uIFtpbmRleCwgb3BdXG4gICAgICogQHJldHVybiBtZXNzYWdlIG9mIHRoZSBmb3JtIFtpbmRleCwgbWVzc2FnZV1cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUsIHJlcGxpY2FJZCkge1xuICAgICAgICBpZiAoIShvcGVyYXRpb25bMF0gPj0gMCAmJiBvcGVyYXRpb25bMF0gPCBzdGF0ZS5sZW5ndGggJiYgTnVtYmVyLmlzSW50ZWdlcihvcGVyYXRpb25bMF0pKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5kZXggb3V0IG9mIGJvdW5kczogXCIgKyBvcGVyYXRpb25bMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbb3BlcmF0aW9uWzBdLCB0aGlzLmVsZW1lbnRDcmR0LnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZVsxXSwgcmVwbGljYUlkKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlc2NyaXB0aW9uIGZvcm1hdDogW2luZGV4LCByZXR1cm5lZCBkZXNjcmlwdGlvbl1cbiAgICAgKiAoc2FtZSBhcyBtZXNzYWdlKS5cbiAgICAgKiBAcGFyYW0gIG1lc3NhZ2UgICAgW2luZGV4LCBtZXNzYWdlXVxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IGRlc2M7XG4gICAgICAgIFtzdGF0ZVttZXNzYWdlWzBdXSwgZGVzY10gPSB0aGlzLmVsZW1lbnRDcmR0LmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZVttZXNzYWdlWzBdXSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICByZXR1cm4gW3N0YXRlLCBbbWVzc2FnZVswXSwgZGVzY11dO1xuICAgIH1cbn1cbmV4cG9ydHMuQXJyYXlDcmR0SW50ZXJuYWwgPSBBcnJheUNyZHRJbnRlcm5hbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YW5kYXJkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmR0TmV0d29ya1J1bnRpbWUgPSBleHBvcnRzLm15TWVzc2FnZSA9IHZvaWQgMDtcbmNvbnN0IHZlY3Rvcl9jbG9ja18xID0gcmVxdWlyZShcIi4vdmVjdG9yX2Nsb2NrXCIpO1xuLy8gaW1wb3J0IFdlYlNvY2tldCA9IHJlcXVpcmUoXCJ3c1wiKTtcbi8vIFRoZSBjYXN1YWwgYnJvYWRjYXN0IG5ldHdvcmsgZGVzaWduZWQgZm9yIGEgdHdvLXdheSBpbnRlcmFjdGl2ZVxuLy8gY29tbXVuaWNhdGlvbiBzZXNzaW9uIGJldHdlZW4gdXNlciBhbmQgc2VydmVyIHVzaW5nIFdlYlNvY2tldCBBUEkuXG4vL1xuLy8gQWxzbyBlbnN1cmUgdGhlIG9yZGVyIG9mIGRlbGl2ZXJ5IHdpdGggY2FzdWFsaXR5IGNoZWNrLlxuLyoqXG4gKiBDdXN0b21pemVkIG1lc3NhZ2UgZXZlbnQgdGhhdCB0cmF2ZWwgdGhyb3VnaFxuICogY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsuXG4gKi9cbmNsYXNzIG15TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY3JkdElkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jcmR0SWQgPSBjcmR0SWQ7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjdXN0b21pemVkIHRvSlNPTiBmdW5jdGlvbiB0byBjb252ZXJ0IG1lc3NhZ2UgYXMgSlNPTiBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBwYWNrYWdlIGluZm8gaW4gSlNPTiBmb3JtYXQuXG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBcIm1lc3NhZ2VcIjogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgXCJjcmR0SWRcIjogdGhpcy5jcmR0SWQsXG4gICAgICAgICAgICBcInRpbWVzdGFtcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJ1aWRcIjogdGhpcy50aW1lc3RhbXAudWlkLFxuICAgICAgICAgICAgICAgIFwidmVjdG9yTWFwXCI6IEFycmF5LmZyb20odGhpcy50aW1lc3RhbXAudmVjdG9yTWFwLmVudHJpZXMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5teU1lc3NhZ2UgPSBteU1lc3NhZ2U7XG4vKipcbiAqIENhc3VhbEJyb2FkY2FzdE5ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgYnJvYWRjYXN0IHNlcnZlciB3aXRoIFdlYlNvY2tldCBwcm90b2NvbC5cbiAqXG4gKiBQZXJmb3JtIGNhc3VhbGl0eSBjaGVjayB0byBlbnN1cmUgbWVzc2FnZSBvcmRlcmluZy5cbiAqL1xuY2xhc3MgQ3JkdE5ldHdvcmtSdW50aW1lIHtcbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQsIHdlYlNvY2tldEFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBzZW5kIG1lc3NhZ2UgYnVmZmVyIGhhcyBhbnkgbWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQuXG4gICAgICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAgICAgKiBJZiBub3QsIHRoZW4gd2FpdCBhIGN1c3RvbWl6ZWQgdGltZSBwZXJpb2QgYW5kIGNoZWNrIGFnYWluLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZW5kQWN0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQodGhpcy5zZW5kQnVmZmVyW2luZGV4XS50b0pTT04oKSk7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgLy8gVXNlIGhlYXJ0YmVhdCB0byBrZWVwIGNsaWVudCBhbGl2ZS5cbiAgICAgICAgICAgIC8vIHRoaXMuaGVhcnRiZWF0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2UgaGVhcnRiZWF0IGZ1bmN0aW9uIHRvIGtlZXAgY2xpZW50cyBhbGl2ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogVE9ETzpcbiAgICAgICAgICogVGhlIG1lc3NhZ2Ugc2VuZGluZyB0byBzZXJ2ZXIgaXMgJ2hlYXJ0YmVhdCcgcmlnaHQgbm93LlxuICAgICAgICAgKiBUaGUgdGltZW91dCBpbnRlcnZhbCBpcyBzZXQgdG8gNTAwMCBtaWxsaW9uc2Vjb25kcy5cbiAgICAgICAgICovXG4gICAgICAgIC8vIGhlYXJ0YmVhdCgpIDogdm9pZCB7XG4gICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLndzLnNlbmQoJ2hlYXJ0YmVhdCcpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVhcnRiZWF0KCk7XG4gICAgICAgIC8vICAgICB9LCA1MDAwKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvKipcbiAgICAgICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIGludG8gbXlNZXNzYWdlIHR5cGUuXG4gICAgICAgICAqIFB1c2ggdGhlIG1lc3NhZ2UgaW50byByZWNlaXZlZCBtZXNzYWdlIGJ1ZmZlci5cbiAgICAgICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBhbGwgdGhlIG1lc3NhZ2VzIGFuZCBkZWxpdmVyIHRvIGFwcGxpY2F0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY2VpdmVBY3Rpb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IG15UGFja2FnZSA9IHRoaXMucGFyc2VKU09OKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIucHVzaChbbXlQYWNrYWdlLm1lc3NhZ2UsIG15UGFja2FnZS5jcmR0SWQsIG15UGFja2FnZS50aW1lc3RhbXBdKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZjTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9wZW4gV2ViU29ja2V0IGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXIuXG4gICAgICAgICAqIFJlZ2lzdGVyIEV2ZW50TGlzdGVuZXIgd2l0aCBjb3JyZXNwb25kaW5nIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndzID0gbmV3IFdlYlNvY2tldCh3ZWJTb2NrZXRBcmdzKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgdGhpcy5zZW5kQWN0aW9uKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5yZWNlaXZlQWN0aW9uKTtcbiAgICAgICAgLy8gdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdwaW5nJywgZnVuY3Rpb24ocGluZ01lc3NhZ2Upe1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1JlY2VpdmUgYSBwaW5nIDogJyArIHBpbmdNZXNzYWdlKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCB0aGUgZnVuY3Rpb24gZGVmaW5lZCBpbiBDcmR0UnVudGltZSBpbnRlcmZhY2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyByZXBsaWNhJ3MgaWQsIHVzZWQgYnkgc29tZSBDUkRUcyBpbnRlcm5hbGx5XG4gICAgICogKGUuZy4sIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZGVudGlmaWVycyBvZiB0aGUgZm9ybSAocmVwbGljYSBpZCwgY291bnRlcikpLlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdElkIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkXG4gICAgICovXG4gICAgcmVnaXN0ZXJDcmR0SWQoY3JkdElkKSB7XG4gICAgICAgIGlmICh0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgY3JkdElkOiBcIiArIGNyZHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgbmV3bHkgY3JlYXRlZCBjcmR0IHdpdGggaXRzIElEIGFuZCBjb3JyZXNwb25kaW5nIG1lc3NhZ2VcbiAgICAgKiBsaXN0ZW5lciBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRNZXNzYWdlTGlzdGVuZXIgdGhlIG1lc3NhZ2UgbGlzdGVuZXIgb2YgZWFjaCBjcmR0LlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIElEIG9mIGVhY2ggY3JkdC5cbiAgICAgKlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGNyZHRNZXNzYWdlTGlzdGVuZXIsIGNyZHRJZCkge1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNCeUlkLmhhcyhjcmR0SWQpIHx8IHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBjcmR0SWQ6IFwiICsgY3JkdElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbmVyc0J5SWQuc2V0KGNyZHRJZCwgY3JkdE1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgZnVuY3Rpb24gb24gY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsgbGF5ZXIsIHdoaWNoIGNhbGxlZFxuICAgICAqIGJ5IGNyZHQncyBydW50aW1lIGxheWVyLlxuICAgICAqXG4gICAgICogVGhlIG1lc3NhZ2UgaXMgd3JhcHBlZCB3aXRoIGl0cyBjb3JyZXNwb25kaW5nIHRpbWVzdGFtcCAoYmFzaWMgc2VuZGVyIG5vZGVcbiAgICAgKiBpbmZvIGFuZCB2ZWN0b3IgY2xvY2spLlxuICAgICAqXG4gICAgICogVXNpbmcgV2ViU29ja2V0IGFzIG5ldHdvcmsgdHJhbnNtaXNzaW9uIHByb3RvY29sLlxuICAgICAqIFVzaW5nIEpTT04gZm9ybWF0IGFzIG1lc3NhZ2UgdHlwZS5cbiAgICAgKlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBub3QgT3BlbiwgdGhlbiBidWZmZXIgdGhlIG1lc3NhZ2UgYW5kXG4gICAgICogd2FpdCB1bnRpbCBXZWJTb2NrZXQgb3Blbi5cbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgT3BlbiwgdGhlbiBzZW5kIGl0IHdpdGggd3Muc2VuZCgpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgdGhlIGNyZHQgdXBkYXRlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgdW5pcXVlIElEIGZvciBlYWNoIGNyZHQuXG4gICAgICovXG4gICAgc2VuZChtZXNzYWdlLCBjcmR0SWQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3JkdElkIGV4aXN0IGluIHRoZSBtYXAuXG4gICAgICAgIGlmICh0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpLmluY3JlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuZ2V0KGNyZHRJZCkuaW5jcmVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2sgZm9yIHNlbmRpbmdcbiAgICAgICAgbGV0IHZjQ29weSA9IG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCk7XG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAgPSBuZXcgTWFwKChfYSA9IHRoaXMudmNNYXAuZ2V0KGNyZHRJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hc1ZlY3RvckNsb2NrKCkpO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShtZXNzYWdlLCBjcmR0SWQsIHZjQ29weSk7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIG1lc3NhZ2UgaW50byBKU09OXG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud3Muc2VuZChteVBhY2thZ2UudG9KU09OKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gobXlQYWNrYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBjcmR0SWQgaW4gdGhpcyByZXBsaWNhLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBjcmR0SWQgdGhhdCB3b3VsZCBsaWtlIHRvIHJldHVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdGltZXN0YW1wIHRoYXQgd291bGQgYmUgYXNzaWduZWQgdG8gYSBDUkRUXG4gICAgICogbWVzc2FnZSBzZW50IGJ5IHRoaXMgcmVwbGljYSBhbmQgZ2l2ZW4gY3JkdElkIHJpZ2h0IG5vdy5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldE5leHRUaW1lc3RhbXAoY3JkdElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2suXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcCgoX2EgPSB0aGlzLnZjTWFwLmdldChjcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lc3RhbXAgb2YgdGhpcyByZXBsaWNhIHdpdGggbmV4dCB2YWx1ZS5cbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIHZjQ29weS52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKSArIDEpO1xuICAgICAgICByZXR1cm4gdmNDb3B5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgdG8gY3VzdG9taXplZCBkYXRhIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSB0cmF2ZWwgdGhyb3VnaCBuZXR3b3JrLlxuICAgICAqIEByZXR1cm5zIHRoZSBjdXN0b21pemVkIGRhdGEgdHlwZSA9PiBteU1lc3NhZ2VcbiAgICAgKi9cbiAgICBwYXJzZUpTT04oZGF0YSkge1xuICAgICAgICBsZXQgZGF0YUpTT04gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgdmMgPSBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2soZGF0YUpTT04udGltZXN0YW1wLnVpZCk7XG4gICAgICAgIHZjLnZlY3Rvck1hcCA9IG5ldyBNYXAoZGF0YUpTT04udGltZXN0YW1wLnZlY3Rvck1hcCk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKGRhdGFKU09OLm1lc3NhZ2UsIGRhdGFKU09OLmNyZHRJZCwgdmMpO1xuICAgICAgICByZXR1cm4gbXlQYWNrYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGJ1ZmZlcmVkIG1lc3NhZ2VzIGFuZCBkZWxpdmVyeSB0aGVcbiAgICAgKiBtZXNzYWdlcyBiYWNrIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIgd2hpY2ggYXJlIHJlYWR5LlxuICAgICAqXG4gICAgICogVGhlIGNoZWNraW5nIG9yZGVyIGlzIGZyb20gdGhlIGxhc3Rlc3QgdG8gdGhlIG9sZGVzdC5cbiAgICAgKiBVcGRhdGUgdGhlIFZlY3RvckNsb2NrIGVudHJ5IGFuZCBNZXNzYWdlQnVmZmVyIHdoZW4gbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogU2VuZCB0aGUgbWVzc2FnZSBiYWNrIHRvIGNyZHRSdW50aW1lIHdpdGggY29ycmVzcG9uZGluZ1xuICAgICAqIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICovXG4gICAgY2hlY2tNZXNzYWdlQnVmZmVyKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubWVzc2FnZUJ1ZmZlci5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgbGV0IGN1ckNyZHRJZCA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV07XG4gICAgICAgICAgICBsZXQgY3VyVmVjdG9yQ2xvY2sgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzJdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZjTWFwLmhhcyhjdXJDcmR0SWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlWZWN0b3JDbG9jayA9IHRoaXMudmNNYXAuZ2V0KGN1ckNyZHRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKG15VmVjdG9yQ2xvY2sgPT09IG51bGwgfHwgbXlWZWN0b3JDbG9jayA9PT0gdm9pZCAwID8gdm9pZCAwIDogbXlWZWN0b3JDbG9jay5pc3JlYWR5KGN1clZlY3RvckNsb2NrKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogU2VuZCBiYWNrIHRoZSByZWNlaXZlZCBtZXNzYWdlcyB0byBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNCeUlkLmhhcyhjdXJDcmR0SWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLmxpc3RlbmVyc0J5SWQuZ2V0KGN1ckNyZHRJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdE5ldHdvcmtSdW50aW1lID0gQ3JkdE5ldHdvcmtSdW50aW1lO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9uZXR3b3JrX3J1bnRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBGaXJzdCBhdHRlbXB0IGF0IHRoZSBpbnRlcmZhY2UgYmV0d2VlbiB0aGUgcnVudGltZVxuLy8gKGNhdXNhbCBicm9hZGNhc3QgbmV0d29yaywgZXRjLikgYW5kIHRoZSBDUkRUcy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfcnVudGltZV9pbnRlcmZhY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9ydW50aW1lX2ludGVyZmFjZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9uZXR3b3JrX3J1bnRpbWVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3ZlY3Rvcl9jbG9ja1wiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSB2b2lkIDA7XG4vLyBUaGUgdmVjdG9yIGNsb2NrIGRlc2lnbmVkIGZvciBDUkRUIGxpYnJhcnkgYW5kIGNhc3VhbCBicm9hZGNhc3Rpbmdcbi8vIHJ1bnRpbWUgdG8gZW5zdXJlIGNvcnJlY3QgY2F1c2FsaXR5LlxuLyoqXG4gKiBUaGUgdmVjdG9yIGNsb2NrIGNsYXNzIGZvciBlbnN1cmluZyBjYXN1YWxpdHkuXG4gKi9cbmNsYXNzIFZlY3RvckNsb2NrIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSB2ZWN0b3Igd2l0aCByZXBsaWNhJ3Mgb3duIGVudHJ5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcGxpY2FJZCkge1xuICAgICAgICB0aGlzLnVpZCA9IHJlcGxpY2FJZDtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVwbGljYShyZXBsaWNhSWQpLlxuICAgICAqL1xuICAgIGdldFNlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmVjdG9yIGNsb2NrIHdpdGggYWxsIHRoZSBlbnRyaWVzLlxuICAgICAqL1xuICAgIGFzVmVjdG9yQ2xvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZpc2libGUgbnVtYmVyIG9mIHRoZSBjb3VudGVyIGZyb20gc2VuZGVyIGluXG4gICAgICogdGhpcyB2ZWN0b3JjbG9jay5cbiAgICAgKi9cbiAgICBnZXRTZW5kZXJDb3VudGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiByZXBsaWNhcyBpbnZvdmxlZCBpbiB0aGlzIGNyZHRzLlxuICAgICAqL1xuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZlY3RvciBvZiB0aGUgdWlkKHJlcGxpY2FJZCkgZW50cnkuXG4gICAgICovXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIG9sZFZhbHVlICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYSBtZXNzYWdlIHdpdGggYSBjZXJ0YWluIHRpbWVzdGFtcCBpcyByZWFkeSBmb3IgZGVsaXZlcnlcbiAgICAgKiB0byBlbnN1cmUgY29ycmVjdCBjYXN1YWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKiBAcmV0dXJucyB0aGUgbWVzc2FnZSBpcyByZWFkeSBvciBub3QuXG4gICAgICovXG4gICAgaXNyZWFkeSh2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuaGFzKG90aGVyVWlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmdldChvdGhlclVpZCkgPT09IG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgLSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5jcmVtZW50IHNlbmRlcidzIGxhc3Rlc3QgZW50cnkgcmVjZWl2ZWQgaW4gdGhpcyBWZWN0b3JDbG9ja1xuICAgICAqIGluIHRoZSByZXBsaWNhJ3Mgb3duIHZlY3Rvck1hcC5cbiAgICAgKlxuICAgICAqIFRoaXMgb3BlcmF0aW9uIGlzIG1haW5seSBkb25lIGFmdGVyIGNvcnJlY3RseSBkZWxpdmVyIHRoZSBtZXNzYWdlXG4gICAgICogd2hlbiBpc1JlYWR5KCkgZnVuY3Rpb24gcmV0dXJucyB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgaW5jcmVtZW50U2VuZGVyKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChvdGhlclVpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIGN1cnJlbnQgVmVjdG9yQ2xvY2sgd2l0aCB0aGUgdmVjdG9yIGNsb2NrIHJlY2V2aWVkIGZyb21cbiAgICAgKiBvdGhlciByZXBsaWNhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgbWVyZ2UodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIE1hdGgubWF4KHRoaXMudmVjdG9yTWFwLmdldChpZCksIG90aGVyVmVjdG9yTWFwLmdldChpZCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb21lVWlkIHRoZSByZXBsaWNhJ3MgdWlkLlxuICAgICAqIEBwYXJhbSBjbG9ja1ZhbHVlIHRoZSBjbG9jayBudW1iZXIgb2YgdGhlIHJlcGxpY2EuXG4gICAgICovXG4gICAgc2V0RW50cnkoc29tZVVpZCwgY2xvY2tWYWx1ZSkge1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoc29tZVVpZCwgY2xvY2tWYWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5WZWN0b3JDbG9jayA9IFZlY3RvckNsb2NrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVjdG9yX2Nsb2NrLmpzLm1hcCIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW1xuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXG4gIF0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZihtc0NyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbXG4gICAgICAgIHNlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgICAgIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXG4gICAgICBdO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH1cblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCIvLyByZXF1aXJlKCcuLi90ZXN0L3Rlc3QnKTsgLy8gcnVuIHRlc3QudHNcbmltcG9ydCB7IGNyZHRzLCBuZXR3b3JrIH0gZnJvbSAnY29tcG92ZW50dWFscy1jbGllbnQnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG4vKipcbiAqIEdldCBIZXJva3Ugc2VydmVyIGhvc3QgV2Vic29ja2V0LlxuICovXG52YXIgSE9TVCA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpXG5cbi8qKlxuICogR2VuZXJhdGUgdXVpZCBmb3IgZWFjaCBjbGllbnQuXG4gKi9cbmNvbnN0IGNsaWVudF91dWlkIDogc3RyaW5nID0gdXVpZCgpO1xuXG4vKipcbiAqIEdlbmVyYXRlIENSRFRzJyBSdW50aW1lIG9uIGVhY2ggY2xpZW50IGFuZCBjcmVhdGUgQ1JEVHMgKGUuZy4gQ291bnRlckNyZHQpLlxuICovXG5sZXQgY2xpZW50ID0gbmV3IG5ldHdvcmsuQ3JkdE5ldHdvcmtSdW50aW1lKGNsaWVudF91dWlkLCBIT1NUKTtcbi8vbGV0IGNsaWVudENvdW50ZXIgPSBuZXcgY3JkdHMuQ291bnRlckNyZHQoXCJjb3VudGVySWRcIiwgY2xpZW50KTtcbmxldCBjbGllbnRDb3VudGVyID0gbmV3IGNyZHRzLkNvdW50ZXIyKGNsaWVudF91dWlkLCBjbGllbnQpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgb25jaGFuZ2UoKSBmb3IgQ1JEVCBhcyByZWZyZXNoIHRoZSB2YWx1ZSAqL1xuY2xpZW50Q291bnRlci5vbmNoYW5nZSA9ICgoKSA9PiB7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpfSk7XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgaW5jcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpbmNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgZGVjcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBkZWNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoLTEwMCk7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufVxuXG4vLyAvKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIHN5bmMgdG8gc3luY2hyb25pemUgdGhlIHZhbHVlICovXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5bmNcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbi8vICAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG4vLyB9XG4iXSwic291cmNlUm9vdCI6IiJ9