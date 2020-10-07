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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/site/checkers.ts");
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
exports.CheckersCrdt = exports.CheckersInternal = exports.MultiValueRegister = exports.MultiValueRegisterInternal = exports.GSetCrdt = exports.MultRegisterCrdt = exports.MultRegisterInternal = exports.CounterCrdt = exports.CounterInternal = void 0;
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
// Taken from Ignacio's Minesweeper CRDT - not sure what this does yet ... 
class CheckersInternal {
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
        if (state !== 0) {
            return [state, message];
        }
        else {
            return [message, message];
        }
    }
}
exports.CheckersInternal = CheckersInternal;
CheckersInternal.instance = new CheckersInternal();
class CheckersCrdt extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, CheckersInternal.instance, runtime, initialData);
    }
    get value() {
        return this.state;
    }
    set value(newValue) {
        this.applyOp(newValue);
    }
}
exports.CheckersCrdt = CheckersCrdt;
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
        // @ts-ignore: This should work but TS is confused by args[] vs Any
        let result = method.call(this, false, this.runtime.getNextTimestamp(this.id), ...args);
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
        if (messageObj.method === undefined) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            console.log("Failed to parse CrdtMessage: " + message);
            return;
        }
        // @ts-ignore: Call method by name
        let method = this[messageObj.method];
        if (method === undefined) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            console.log("Unknown method called remotely: " + messageObj.method);
            return;
        }
        // TODO: Check type?  At least make sure it's a function?
        method.call(this, true, timestamp, ...messageObj.args);
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
        super.callRemote(this.remoteAdd, toAdd);
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
        super.applyOp(this.getUniversalResetStrongMessage);
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

/***/ "./src/site/checkers.ts":
/*!******************************!*\
  !*** ./src/site/checkers.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const checkers_crdt_1 = __webpack_require__(/*! ./checkers_crdt */ "./src/site/checkers_crdt.ts");
const compoventuals_client_1 = __webpack_require__(/*! compoventuals-client */ "../client/build/index.js");
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
let HOST = location.origin.replace(/^http/, 'ws');
const client_uuid = uuid_1.v4();
console.log('Set Host & Unique Identifier');
/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new compoventuals_client_1.network.CrdtNetworkRuntime(client_uuid, HOST);
console.log('Generate CRDT Runtime');
let game = new checkers_crdt_1.CheckersCrdt("checkersID", client);
console.log('Created and Starting Checkers Game');
game.startGame();


/***/ }),

/***/ "./src/site/checkers_crdt.ts":
/*!***********************************!*\
  !*** ./src/site/checkers_crdt.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Adapted from https://github.com/RyanBranco/Checkers/blob/master/script.js (i.e. used their game logic)
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckersCrdt = void 0;
const compoventuals_client_1 = __webpack_require__(/*! compoventuals-client */ "../client/build/index.js");
const cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll(".red-piece");
let blacksPieces = document.querySelectorAll(".black-piece");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurntext = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider");
const cboard = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];
class CheckersCrdt extends compoventuals_client_1.crdts.Crdt {
    constructor(id, runtime) {
        super(id, new compoventuals_client_1.crdts.ArrayCrdtInternal(new compoventuals_client_1.crdts.CheckersInternal()), runtime, cboard);
        this.board = cboard;
        this.turn = 0;
        this.redScore = 12;
        this.blackScore = 12;
        this.playerPieces = redsPieces;
        this.selectedPiece = {
            pieceId: -1,
            indexOfBoardPiece: -1,
            isKing: false,
            seventhSpace: false,
            ninthSpace: false,
            fourteenthSpace: false,
            eighteenthSpace: false,
            minusSeventhSpace: false,
            minusNinthSpace: false,
            minusFourteenthSpace: false,
            minusEighteenthSpace: false
        };
    }
    // <------- EVENT LISTENERS ------->
    // begin the game!
    startGame() {
        console.log(cboard);
        console.log("Starting the Game!");
        this.givePiecesEventListeners();
        console.log("Listeners in Place");
    }
    // initialize event listeners on pieces
    givePiecesEventListeners() {
        if (this.turn == 0) {
            for (let i = 0; i < redsPieces.length; i++) {
                redsPieces[i].addEventListener("click", this.getPlayerPieces);
            }
        }
        else {
            for (let i = 0; i < blacksPieces.length; i++) {
                blacksPieces[i].addEventListener("click", this.getPlayerPieces);
            }
        }
    }
    // <------- GAME LOGIC ------->
    // parses pieceId's and returns the index of that piece's place on the board
    findPiece(pieceId) {
        let parsed = parseInt(pieceId);
        return this.board.indexOf(parsed);
    }
    ;
    // holds the length of the players piece count
    getPlayerPieces() {
        if (this.turn == 0) {
            this.playerPieces = redsPieces;
        }
        else {
            this.playerPieces = blacksPieces;
        }
        this.removeCellonclick();
        this.resetBorders();
    }
    // removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
    removeCellonclick() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("onclick");
        }
    }
    // resets borders to default
    resetBorders() {
        for (let i = 0; i < this.playerPieces.length; i++) {
            this.playerPieces[i].style.border = "1px solid white";
        }
        this.resetSelectedPieceProperties();
        this.getSelectedPiece();
    }
    // resets selected piece properties
    resetSelectedPieceProperties() {
        this.selectedPiece.pieceId = -1;
        this.selectedPiece.pieceId = -1;
        this.selectedPiece.isKing = false;
        this.selectedPiece.seventhSpace = false;
        this.selectedPiece.ninthSpace = false;
        this.selectedPiece.fourteenthSpace = false;
        this.selectedPiece.eighteenthSpace = false;
        this.selectedPiece.minusSeventhSpace = false;
        this.selectedPiece.minusNinthSpace = false;
        this.selectedPiece.minusFourteenthSpace = false;
        this.selectedPiece.minusEighteenthSpace = false;
    }
    // gets ID and index of the board cell its on
    getSelectedPiece() {
        const element = event.currentTarget;
        this.selectedPiece.pieceId = parseInt(element.id);
        this.selectedPiece.indexOfBoardPiece = this.findPiece(this.selectedPiece.pieceId);
        this.isPieceKing();
    }
    // checks if selected piece is a king
    isPieceKing() {
        if (document.getElementById(this.selectedPiece.pieceId).classList.contains("king")) {
            this.selectedPiece.isKing = true;
        }
        else {
            this.selectedPiece.isKing = false;
        }
        this.getAvailableSpaces();
    }
    // gets the moves that the selected piece can make
    getAvailableSpaces() {
        if (this.board[this.selectedPiece.indexOfBoardPiece + 7] === null &&
            cells[this.selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.seventhSpace = true;
        }
        if (this.board[this.selectedPiece.indexOfBoardPiece + 9] === null &&
            cells[this.selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.ninthSpace = true;
        }
        if (this.board[this.selectedPiece.indexOfBoardPiece - 7] === null &&
            cells[this.selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.minusSeventhSpace = true;
        }
        if (this.board[this.selectedPiece.indexOfBoardPiece - 9] === null &&
            cells[this.selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.minusNinthSpace = true;
        }
        this.checkAvailableJumpSpaces();
    }
    // gets the moves that the selected piece can jump
    checkAvailableJumpSpaces() {
        if (this.turn == 0) {
            if (this.board[this.selectedPiece.indexOfBoardPiece + 14] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 7] >= 12) {
                this.selectedPiece.fourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece + 18] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 9] >= 12) {
                this.selectedPiece.eighteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 14] === null
                && cells[this.selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 7] >= 12) {
                this.selectedPiece.minusFourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 18] === null
                && cells[this.selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 9] >= 12) {
                this.selectedPiece.minusEighteenthSpace = true;
            }
        }
        else {
            if (this.board[this.selectedPiece.indexOfBoardPiece + 14] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 7] < 12 && this.board[this.selectedPiece.indexOfBoardPiece + 7] !== null) {
                this.selectedPiece.fourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece + 18] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 9] < 12 && this.board[this.selectedPiece.indexOfBoardPiece + 9] !== null) {
                this.selectedPiece.eighteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 14] === null && cells[this.selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 7] < 12
                && this.board[this.selectedPiece.indexOfBoardPiece - 7] !== null) {
                this.selectedPiece.minusFourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 18] === null && cells[this.selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 9] < 12
                && this.board[this.selectedPiece.indexOfBoardPiece - 9] !== null) {
                this.selectedPiece.minusEighteenthSpace = true;
            }
        }
        this.checkPieceConditions();
    }
    // restricts movement if the piece is a king
    checkPieceConditions() {
        if (this.selectedPiece.isKing) {
            this.givePieceBorder();
        }
        else {
            if (this.turn == 0) {
                this.selectedPiece.minusSeventhSpace = false;
                this.selectedPiece.minusNinthSpace = false;
                this.selectedPiece.minusFourteenthSpace = false;
                this.selectedPiece.minusEighteenthSpace = false;
            }
            else {
                this.selectedPiece.seventhSpace = false;
                this.selectedPiece.ninthSpace = false;
                this.selectedPiece.fourteenthSpace = false;
                this.selectedPiece.eighteenthSpace = false;
            }
            this.givePieceBorder();
        }
    }
    // gives the piece a green highlight for the user (showing its movable)
    givePieceBorder() {
        if (this.selectedPiece.seventhSpace || this.selectedPiece.ninthSpace || this.selectedPiece.fourteenthSpace || this.selectedPiece.eighteenthSpace
            || this.selectedPiece.minusSeventhSpace || this.selectedPiece.minusNinthSpace || this.selectedPiece.minusFourteenthSpace || this.selectedPiece.minusEighteenthSpace) {
            document.getElementById(this.selectedPiece.pieceId).style.border = "3px solid green";
            this.giveCellsClick();
        }
        else {
            return;
        }
    }
    // gives the cells on the board a 'click' bassed on the possible moves
    giveCellsClick() {
        if (this.selectedPiece.seventhSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
        }
        if (this.selectedPiece.ninthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
        }
        if (this.selectedPiece.fourteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
        }
        if (this.selectedPiece.eighteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
        }
        if (this.selectedPiece.minusSeventhSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
        }
        if (this.selectedPiece.minusNinthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
        }
        if (this.selectedPiece.minusFourteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
        }
        if (this.selectedPiece.minusEighteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
        }
    }
    // makes the move that was clicked
    makeMove(number) {
        document.getElementById(this.selectedPiece.pieceId).remove();
        cells[this.selectedPiece.indexOfBoardPiece].innerHTML = "";
        if (this.turn == 0) {
            if (this.selectedPiece.isKing) {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="red-piece king" id="${this.selectedPiece.pieceId}"></p>`;
                redsPieces = document.querySelectorAll("p");
            }
            else {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="red-piece" id="${this.selectedPiece.pieceId}"></p>`;
                redsPieces = document.querySelectorAll("p");
            }
        }
        else {
            if (this.selectedPiece.isKing) {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${this.selectedPiece.pieceId}"></span>`;
                blacksPieces = document.querySelectorAll("span");
            }
            else {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${this.selectedPiece.pieceId}"></span>`;
                blacksPieces = document.querySelectorAll("span");
            }
        }
        let indexOfPiece = this.selectedPiece.indexOfBoardPiece;
        if (number === 14 || number === -14 || number === 18 || number === -18) {
            this.changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
        }
        else {
            this.changeData(indexOfPiece, indexOfPiece + number, 0);
        }
    }
    // Changes the board states data on the backend
    changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
        this.board[indexOfBoardPiece] = null;
        this.board[modifiedIndex] = parseInt(this.selectedPiece.pieceId);
        if (this.turn == 0 && this.selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
            document.getElementById(this.selectedPiece.pieceId).classList.add("king");
        }
        if (this.turn === 1 && this.selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
            document.getElementById(this.selectedPiece.pieceId).classList.add("king");
        }
        if (removePiece) {
            this.board[removePiece] = null;
            if (this.turn == 0 && this.selectedPiece.pieceId < 12) {
                cells[removePiece].innerHTML = "";
                this.blackScore--;
            }
            if (this.turn === 1 && this.selectedPiece.pieceId >= 12) {
                cells[removePiece].innerHTML = "";
                this.redScore--;
            }
        }
        this.resetSelectedPieceProperties();
        this.removeCellonclick();
        this.removeEventListeners();
    }
    // removes the 'onClick' event listeners for pieces
    removeEventListeners() {
        if (this.turn == 0) {
            for (let i = 0; i < redsPieces.length; i++) {
                redsPieces[i].removeEventListener("click", this.getPlayerPieces);
            }
        }
        else {
            for (let i = 0; i < blacksPieces.length; i++) {
                blacksPieces[i].removeEventListener("click", this.getPlayerPieces);
            }
        }
        this.checkForWin();
    }
    // Checks for a win
    checkForWin() {
        if (this.blackScore === 0) {
            divider.style.display = "none";
            for (let i = 0; i < redTurnText.length; i++) {
                redTurnText[i].style.color = "black";
                blackTurntext[i].style.display = "none";
                redTurnText[i].textContent = "RED WINS!";
            }
        }
        else if (this.redScore === 0) {
            divider.style.display = "none";
            for (let i = 0; i < blackTurntext.length; i++) {
                blackTurntext[i].style.color = "black";
                redTurnText[i].style.display = "none";
                blackTurntext[i].textContent = "BLACK WINS!";
            }
        }
        this.changePlayer();
    }
    // Switches players turn
    changePlayer() {
        if (this.turn == 0) {
            this.turn = 1;
            for (let i = 0; i < redTurnText.length; i++) {
                redTurnText[i].style.color = "lightGrey";
                blackTurntext[i].style.color = "black";
            }
        }
        else {
            this.turn = 0;
            for (let i = 0; i < blackTurntext.length; i++) {
                blackTurntext[i].style.color = "lightGrey";
                redTurnText[i].style.color = "black";
            }
        }
        this.givePiecesEventListeners();
    }
}
exports.CheckersCrdt = CheckersCrdt;


/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvY3JkdHMyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2pzb24uanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3N0YW5kYXJkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jaGVja2Vycy50cyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jaGVja2Vyc19jcmR0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELDZCQUE2QixtQkFBTyxDQUFDLHVEQUFhO0FBQ2xELCtCQUErQixtQkFBTyxDQUFDLDJEQUFlO0FBQ3RELGlDOzs7Ozs7Ozs7Ozs7QUN2QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJEQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUM7Ozs7Ozs7Ozs7OztBQy9TYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEVBQUU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7O0FDbFBhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDOzs7Ozs7Ozs7Ozs7QUM5RmE7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsK0RBQWU7QUFDcEMsYUFBYSxtQkFBTyxDQUFDLDJEQUFhO0FBQ2xDLGFBQWEsbUJBQU8sQ0FBQyxpREFBUTtBQUM3QjtBQUNBLGFBQWEsbUJBQU8sQ0FBQyw2REFBYztBQUNuQyxhQUFhLG1CQUFPLENBQUMsNkRBQWM7QUFDbkMsYUFBYSxtQkFBTyxDQUFDLHlEQUFZO0FBQ2pDLGFBQWEsbUJBQU8sQ0FBQyxxREFBVTtBQUMvQixpQzs7Ozs7Ozs7Ozs7O0FDcEJhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyx5REFBWTtBQUN2QyxzQkFBc0IsbUJBQU8sQ0FBQywrREFBZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQzs7Ozs7Ozs7Ozs7O0FDdGNhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQywyREFBYTtBQUN6QyxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwSUFBMEksYUFBYSxXQUFXLEVBQUU7QUFDcEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7QUN2UWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHVDQUF1QztBQUN2QyxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDBCQUEwQjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7QUM5V2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDZEQUFjO0FBQzNDLHNCQUFzQixtQkFBTyxDQUFDLCtEQUFlO0FBQzdDLG9CQUFvQixtQkFBTyxDQUFDLDJEQUFhO0FBQ3pDLHFCQUFxQixtQkFBTyxDQUFDLDZEQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUcsV0FBVyxDQUFDO2dCQUMzQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7YUFDeEM7U0FDSjtRQUNELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Q0FDSjtBQTdXRCxvQ0E2V0MiLCJmaWxlIjoiZGVwbG95L3NpdGUvY2hlY2tlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zaXRlL2NoZWNrZXJzLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmR0cyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY3JkdHNcIikpO1xuZXhwb3J0cy5uZXR3b3JrID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9uZXR3b3JrXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaGVja2Vyc0NyZHQgPSBleHBvcnRzLkNoZWNrZXJzSW50ZXJuYWwgPSBleHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlciA9IGV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwgPSBleHBvcnRzLkdTZXRDcmR0ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJJbnRlcm5hbCA9IGV4cG9ydHMuQ291bnRlckNyZHQgPSBleHBvcnRzLkNvdW50ZXJJbnRlcm5hbCA9IHZvaWQgMDtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gYWRkL2FkZGVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAwIGFkZHM/XG4gKi9cbmNsYXNzIENvdW50ZXJJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSArIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbn1cbmV4cG9ydHMuQ291bnRlckludGVybmFsID0gQ291bnRlckludGVybmFsO1xuQ291bnRlckludGVybmFsLmluc3RhbmNlID0gbmV3IENvdW50ZXJJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIHNpbXBsZSBjb3VudGVyIENSRFQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgYWRkZWQuXG4gKlxuICogV2FybmluZzogYWRkaXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5jbGFzcyBDb3VudGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgYWRkLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiBjb3VudGVyLnZhbHVlICs9IG4gYW5kIGNvdW50ZXIudmFsdWUgLT0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIGFkZGl0aW9ucykuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlIC0gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVyQ3JkdCA9IENvdW50ZXJDcmR0O1xuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gbXVsdGlwbHkvbXVsdGlwbGllZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMSBtdWx0cz9cbiAqL1xuY2xhc3MgTXVsdFJlZ2lzdGVySW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKiBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRSZWdpc3RlckludGVybmFsID0gTXVsdFJlZ2lzdGVySW50ZXJuYWw7XG5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIHNpbXBsZSBudW1lcmljYWwgcmVnaXN0ZXIgQ1JEVCB3aXRoIG11bHRpcGxpY2F0aW9uIG9wZXJhdGlvbnMuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgbXVsdGlwbGllZC5cbiAqXG4gKiBXYXJuaW5nOiBtdWx0aXBsaWNhdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmNsYXNzIE11bHRSZWdpc3RlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdGlwbGljYXRpb24uICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIHJlZ2lzdGVyLnZhbHVlICo9IG4gYW5kIHJlZ2lzdGVyLnZhbHVlIC89IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBtdWx0aXBsaWNhdGlvbnMpLlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgY3VycmVudCB2YWx1ZSBpcyAwLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1wb3NzaWJsZSB0byBzZXQgdG8gbm9uemVybyB2YWx1ZSB3aGVuIGN1cnJlbnQgdmFsdWUgaXMgemVyb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIDAgLT4gMCBpcyBuby1vcFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubXVsdChuZXdWYWx1ZSAvIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdFJlZ2lzdGVyQ3JkdCA9IE11bHRSZWdpc3RlckNyZHQ7XG4vLyBleHBvcnQgY2xhc3MgQ291bnRlck1vZEludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuLy8gICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1vZHVsdXM6IG51bWJlcikge1xuLy8gICAgICAgICBpZiAobW9kdWx1cyA8IDApIHRocm93IG5ldyBFcnJvcihcIm1vZHVsdXMgaXMgbmVnYXRpdmU6IFwiICsgbW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4vLyAgICAgICAgIGVsc2UgcmV0dXJuIDA7XG4vLyAgICAgfVxuLy8gICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMubW9kKG9wZXJhdGlvbik7XG4vLyAgICAgfVxuLy8gICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4vLyAgICAgICAgIHJldHVybiBbdGhpcy5tb2Qoc3RhdGUgKyBtZXNzYWdlKSwgbWVzc2FnZV07XG4vLyAgICAgfVxuLy8gICAgIG1vZCh4OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICBpZiAoeCA+PSAwKSByZXR1cm4geCAlIHRoaXMubW9kdWx1cztcbi8vICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5tb2R1bHVzIC0gKCgteCkgJSB0aGlzLm1vZHVsdXMpO1xuLy8gICAgIH1cbi8vIH1cbi8qKlxuICogT3BlcmF0aW9ucyBhbmQgbWVzc2FnZXMgYXJlIHRoZSBlbGVtZW50IHRvIGFkZC4gIFRPRE86XG4gKiB0aGlzIG1lYW5zIHRoYXQgYWRkaW5nIG51bGwgd29uJ3Qgd29yayBhcyBHU2V0Q3JkdCB3aWxsIHRyZWF0XG4gKiBpdHMgbWVzc2FnZSBhcyBhIG5vLW9wLiAgRGVzY3JpcHRpb24gaXMgdGhlIGVsZW1lbnQgYWRkZWRcbiAqIChpZiBpdCdzIHJlZHVuZGFudCwgZGVzY3JpcHRpb24gaXMgbnVsbCwgc28gb25jaGFuZ2Ugd29uJ3RcbiAqIHNlZSBhbnl0aGluZykuXG4gKi9cbmNsYXNzIEdTZXRJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5oYXMob3BlcmF0aW9uKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgfVxufVxuR1NldEludGVybmFsLmluc3RhbmNlID0gbmV3IEdTZXRJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIGdyb3ctb25seSBzZXQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBhcnJheSBvZiBlbGVtZW50cyBhZGRlZFxuICogKFtdIG9yIFthZGRlZCBlbGVtZW50XSkuXG4gKlxuICogVE9ETzogYWRkaW5nIGEgbnVsbCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gKiBUT0RPOiBhZGQgYSB0eXBlIGFubm90YXRpb25cbiAqIFRPRE86IHNhbWUgaW50ZXJmYWNlIGFzIEpTIFNldFxuICovXG5jbGFzcyBHU2V0Q3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgR1NldEludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGFkZChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChlbGVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBzZXQuICBUaGlzIHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMuc3RhdGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuR1NldENyZHQgPSBHU2V0Q3JkdDtcbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGluaXRpYWwgdmFsdWUgdG8gc2V0LlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KFtbaW5pdGlhbERhdGEsIG51bGwsIC0xXV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wic2V0XCIsIHZhbHVlXTogc2V0IHRvIHRoZSBnaXZlbiBzaW5nbGUgdmFsdWUuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXQsIHNldHRpbmcgdGhlIHZhbHVlIHNldCB0byBbXS5cbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBfc3RhdGUgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGlmICghKChvcGVyYXRpb25bMF0gPT09IFwic2V0XCIgJiYgb3BlcmF0aW9uWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB8fCBvcGVyYXRpb25bMF0gPT09IFwicmVzZXRcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXM6XG4gICAgICogLSBmb3Igc2V0IG1lc3NhZ2UsIFtcInNldFwiLCBzZXQgdmFsdWVdIChldmVuIGlmIGl0XG4gICAgICogZG9lc24ndCBlbGltaW5hdGUgYWxsIGNhdXNhbGx5IHByaW9yIHZhbHVlcykuXG4gICAgICogLSBmb3IgcmVzZXRzLCBbXCJyZXNldFwiXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAoISgobWVzc2FnZVswXSA9PT0gXCJzZXRcIiAmJiBtZXNzYWdlWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB8fCBtZXNzYWdlWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUodmFsdWUpOyAvL2luaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQodmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSB2YWx1ZVsyXSlcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gXCJzZXRcIikge1xuICAgICAgICAgICAgc3RhdGUuYWRkKFttZXNzYWdlWzFdLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlckludGVybmFsID0gTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWw7XG5NdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCgpO1xuY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVyIGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInNldFwiLCB2YWx1ZV0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWVTZXQoKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlWzBdKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJyZXNldFwiXSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVyID0gTXVsdGlWYWx1ZVJlZ2lzdGVyO1xuLy8gVGFrZW4gZnJvbSBJZ25hY2lvJ3MgTWluZXN3ZWVwZXIgQ1JEVCAtIG5vdCBzdXJlIHdoYXQgdGhpcyBkb2VzIHlldCAuLi4gXG5jbGFzcyBDaGVja2Vyc0ludGVybmFsIHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICBpZiAoc3RhdGUgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFttZXNzYWdlLCBtZXNzYWdlXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ2hlY2tlcnNJbnRlcm5hbCA9IENoZWNrZXJzSW50ZXJuYWw7XG5DaGVja2Vyc0ludGVybmFsLmluc3RhbmNlID0gbmV3IENoZWNrZXJzSW50ZXJuYWwoKTtcbmNsYXNzIENoZWNrZXJzQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgQ2hlY2tlcnNJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG5ld1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkNoZWNrZXJzQ3JkdCA9IENoZWNrZXJzQ3JkdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2ljX2NyZHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmR0ID0gZXhwb3J0cy5DcmR0Q2hhbmdlRXZlbnQgPSB2b2lkIDA7XG4vKipcbiAqIEFuIGV2ZW50IGlzc3VlZCB3aGVuIGEgQ1JEVCBpcyBjaGFuZ2VkIGJ5IGFub3RoZXIgcmVwbGljYS5cbiAqIEBwYXJhbSBjYWxsZXIgICAgICBUaGUgQ3JkdCBpbnN0YW5jZSB0aGF0IHdhcyBjaGFuZ2VkLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NycHRpb24gb2YgdGhlIGNoYW5nZS5cbiAqIEBwYXJhbSB0aW1lc3RhbXAgICBUaGUgY2F1c2FsIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLiBOb3RlIHRoYXRcbiAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICogc3RpbGwgZ3VhcmFudGVlZC5cbiAqL1xuY2xhc3MgQ3JkdENoYW5nZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIGRlc2NyaXB0aW9uLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0Q2hhbmdlRXZlbnQgPSBDcmR0Q2hhbmdlRXZlbnQ7XG4vLyBVc2VyLWZhY2luZyB3cmFwcGVycyBhcm91bmQgQ1JEVHMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzLFxuLy8gYWRkaW5nIG1ldGhvZHMgZm9yIHRoZSBDUkRUJ3Mgb3BlcmF0aW9ucyAoZS5nLiwgaW5jcmVtZW50KCkpXG4vLyB3aGljaCBjYWxsIHRoaXMgY2xhc3MncyBhcHBseSBtZXRob2QuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFwcGxpY2F0aW9uLWZhY2luZyBDUkRUIGltcGxlbWVudGF0aW9ucy5cbiAqIEluc3RlYWQgb2YgZXhwb3NpbmcgQ3JkdEludGVybmFsIGltcGxlbWVudGF0aW9ucyBkaXJlY3RseSxcbiAqIHdoaWNoIGhhdmUgYW4gdW5mcmllbmRseSBwcmVwYXJlL2VmZmVjdCBpbnRlcmZhY2UsXG4gKiBlYWNoIENSRFQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGRlZmluZSBhIHN1YmNsYXNzIG9mIHRoaXNcbiAqIGNsYXNzIHdpdGggb3JkaW5hcnktbG9va2luZyBtZXRob2RzIHRvIHBlcmZvcm0gb3BlcmF0aW9uc1xuICogYW5kIHF1ZXJ5IHRoZSBzdGF0ZS4gIE1ldGhvZHMgcGVyZm9ybWluZyBvcGVyYXRpb25zIHNob3VsZFxuICogY2FsbCBhcHBseU9wIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgQ3JkdEludGVybmFsIG9wZXJhdGlvbi5cbiAqIFRoaXMgY2xhc3MgdGhlbiBhdXRvbWF0aWNhbGx5IGhhbmRsZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nXG4gKiBvZiBtZXNzYWdlcy5cbiAqIENmLiBBbGdvcml0aG0gMSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHBhcGVyLlxuICogQHBhcmFtIFMgVGhlIHN0YXRlIHR5cGUgb2YgQy5cbiAqL1xuY2xhc3MgQ3JkdCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgIEFuIGlkIGZvciB0aGlzIENSRFQuICBBbGwgQ1JEVHMgdXNpbmcgdGhlXG4gICAgICogc2FtZSBDcmR0UnVudGltZSBtdXN0IGhhdmUgZGlzdGluY3QgaWRzLCBhbmQgdGhlIGlkcyBtdXN0XG4gICAgICogYmUgdGhlIHNhbWUgZm9yIGFsbCByZXBsaWNhcyBvZiBhIGdpdmVuIENSRFQsIGluIG9yZGVyXG4gICAgICogZm9yIHRoZSBDcmR0UnVudGltZSB0byByb3V0ZSBtZXNzYWdlcyB0byB0aGVtIHByb3Blcmx5LlxuICAgICAqIEBwYXJhbSBjcmR0SW50ZXJuYWwgICAgVGhlIENyZHRJbnRlcm5hbCB0byB1c2UuICBOb3RlIHRoYXQgc2luY2VcbiAgICAgKiBDcmR0SW50ZXJuYWwncyBkb24ndCBzdG9yZSBzdGF0ZXMsIG11bHRpcGxlIG9iamVjdHMgbWF5XG4gICAgICogc2hhcmUgdGhlIHNhbWUgQ3JkdEludGVybmFsIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBydW50aW1lIFRoZSBDcmR0UnVudGltZSB0byB1c2UgZm9yIHNlbmRpbmcgYW5kXG4gICAgICogcmVjZWl2aW5nIG1lc3NhZ2VzLlxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIHRvIHVzZSB3aGVuXG4gICAgICogc2V0dGluZyB0aGUgQ3JkdEludGVybmFsJ3MgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgY3JkdEludGVybmFsLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY3JkdEludGVybmFsID0gY3JkdEludGVybmFsO1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoaXMgdG8gbGlzdGVuIGZvciB3aGVuIGFub3RoZXIgcmVwbGljYSB1cGRhdGVzXG4gICAgICAgICAqIHRoaXMgb2JqZWN0J3Mgc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uY2hhbmdlID0gKChfKSA9PiB7IH0pO1xuICAgICAgICAvLyBUT0RPOiBkZXNjcmliZSBcInRyYW5zYWN0aW9uc1wiLiAgUmlnaHQgd29yZD8gIFJlbmFtZVxuICAgICAgICAvLyBcImF0b21pY1wiIHN0dWZmIGJlbG93LiAgTXVzdCBoYXBwZW4gc3luY2hyb25vdXNseSBzb1xuICAgICAgICAvLyB0aGF0IHJ1bnRpbWUuZ2V0VGltZXN0YW1wKCkgZG9lc24ndCBjaGFuZ2UgYW5kXG4gICAgICAgIC8vIG5vIG1lc3NhZ2VzIGFyZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cbiAgICAgICAgLy8gQWxsb3cgY2FsbGVyIHRvIHN0YXJ0L2VuZCB0cmFuc2FjdGlvbnM/XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5jcmR0SW50ZXJuYWwuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5ydW50aW1lLnJlZ2lzdGVyKHRoaXMsIHRoaXMuaWQpO1xuICAgIH1cbiAgICBzdGFydFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIC8vIFRPRE86IFJldHVybnMgdGhlIGRlc2NyaXB0aW9ucyAodHJhbnNsYXRlZClcbiAgICBlbmRUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLCB0aGlzLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucztcbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgZ2l2ZW4gb3BlcmF0aW9uIHRvIHRoZSBzdGF0ZSwgdXNpbmcgcHJlcGFyZSBhbmQgZWZmZWN0LFxuICAgICAqIGFuZCBzZW5kcyB0aGUgZ2VuZXJhdGVkIG1lc3NhZ2Ugb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiBJZiBhIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLCB0aGlzIHNlbmRpbmcgaXMgZGVsYXllZFxuICAgICAqIHVudGlsXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gVGhlIG9wZXJhdGlvbiB0byBhcHBseS5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNoYW5nZXMuXG4gICAgICogVGhpcyBpcyB0aGUgbGlzdCBvZiBpbmRpdmlkdWFsIG1lc3NhZ2UgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5XG4gICAgICogZWZmZWN0IChza2lwcGluZyBudWxsIG1lc3NhZ2VzKSxcbiAgICAgKiBhZnRlciBiZWluZyBwYXNzZWQgdGhyb3VnaCB0cmFuc2xhdGVEZXNjcmlwdGlvbi4gIEFuIGV4Y2VwdGlvblxuICAgICAqIGlzIHRoYXQgaWYgYWxsIG1lc3NhZ2VzIGFyZVxuICAgICAqIG51bGwsIG51bGwgaXMgcmV0dXJuZWQgd2l0aG91dCBjYWxsaW5nIHRyYW5zbGF0ZURlc2NyaXB0aW9uLlxuICAgICAqIFRPRE86IG51bGwgaWYgaW4gYSB0cmFuc2FjdGlvbiAodXNlIGVuZFRyYW5zYWN0aW9uIGluc3RlYWQpLlxuICAgICAqIFRPRE86IGJ1dCB3aGF0IGlmIHdlIHdhbnQgaXQgdG8gZGVjaWRlIHdoYXQgdG8gZG8gbmV4dD9cbiAgICAgKi9cbiAgICBhcHBseU9wKG9wZXJhdGlvbikge1xuICAgICAgICBsZXQgb3duVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIG93blRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmNyZHRJbnRlcm5hbC5wcmVwYXJlKG9wZXJhdGlvbiwgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLCB0aGlzLnN0YXRlLCB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG93blRyYW5zYWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gdHJhbnNsYXRlIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogQ3JkdEludGVybmFsIGJlZm9yZSBwYXNzaW5nIGl0IHRvIG9uY2hhbmdlLiAgVGhpcyBpc1xuICAgICAqIHVzZWZ1bCBmb3Igc2VtaWRpcmVjdCBwcm9kdWN0cyBiZWNhdXNlIHRoZSBkZWZhdWx0XG4gICAgICogU2VtaWRpcmVjdEludGVybmFsIGRlc2NyaXB0aW9ucyBhcmUgbm90IHVzZXItZnJpZW5kbHkuXG4gICAgICogSWYgdGhpcyBtZXRob2QgcmV0dXJucyBudWxsLCBvbmNoYW5nZSBpcyBub3QgY2FsbGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50aW9uIHJldHVybnMgZGVzY3JpcHRpb25zWzBdLiAgSXQgaXNcbiAgICAgKiBhcHByb3ByaWF0ZSB3aGVuIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdCBhbHJlYWR5IHJldHVybnNcbiAgICAgKiB1c2VyLWZyaWVuZGx5IGRlc2NyaXB0aW9ucyBhbmQgYXBwbHlPcHMgaXMgb25seSBldmVyIGNhbGxlZFxuICAgICAqIHdpdGggc2luZ2xlIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGRlc2NyaXB0aW9ucyBBIGxpc3Qgb2YgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdC4gIFRoaXMgd2lsbCBhbHdheXMgYmUgbm9uLWVtcHR5LlxuICAgICAqIEByZXR1cm4gVGhlIHRyYW5zbGF0ZWQgZGVzY3JpcHRpb24gdG8gcGFzcyB0byB0aGlzLm9uY2hhbmdlLFxuICAgICAqIG9yIG51bGwgaWYgdGhpcy5vbmNoYW5nZSBzaG91bGQgbm90IGJlIGNhbGxlZC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIG9ic2VydmVkIHJlc2V0c1xuICAgICAqIGZvciB3aGVuIGEgQ3JkdE9iamVjdCBjb250YWluaW5nIHRoaXMgQ3JkdCBpc1xuICAgICAqIHJlc2V0LiAgVGhlXG4gICAgICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHN1Y2ggbWFwIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgICAqIHRvIGNhdXNlIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgICogbXVzdCBzYXRpc2Z5OlxuICAgICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgICAqIC0gd2hlbiBhcHBsaWVkIHRvIGEgc3RhdGUgd2hpY2ggaGFzIG5vdCByZWNlaXZlZCBhbnlcbiAgICAgKiBtZXNzYWdlcyBjYXVzYWxseSBwcmlvciB0byB0aGUgdGltZXN0YW1wLCBpdCBoYXNcbiAgICAgKiBubyBlZmZlY3QuICBJbiBvdGhlciB3b3JkcywgYXBwbHlpbmcgaXQgdG8gYSBjb25jdXJyZW50bHlcbiAgICAgKiBpbml0aWFsaXplZCBzdGF0ZSBoYXMgbm8gZWZmZWN0LlxuICAgICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgbWVzc2FnZXMgaW5zdGVhZCwgZm9yIGdlbmVyYWxpdHk/XG4gICAgICovXG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBvYnNlcnZlZC1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0KCkgeyB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBzdHJvbmctcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXRTdHJvbmcoKSB7IH1cbiAgICAvLyAvKipcbiAgICAvLyAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBzdHJvbmcgcmVzZXRzLiAgVGhlXG4gICAgLy8gICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgIC8vICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgLy8gICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgIC8vICAqIHRvIGNhdXNlIGEgc3Ryb25nLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgIC8vICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgLy8gICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgIC8vICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgLy8gICogbXVzdCBzYXRpc2Z5OlxuICAgIC8vICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgLy8gICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgIC8vICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgIC8vICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgIC8vICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAvLyAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAvLyAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAvLyAgKi9cbiAgICAvLyBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKTogYW55IHtcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciB0aGlzLnJ1bnRpbWUgd2hlbiBhbiBhdG9taWMgbGlzdCBvZlxuICAgICAqIG1lc3NhZ2VzIGlzIHJlY2VpdmVkIGZyb20gYW5vdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIHJlY2VpdmUobWVzc2FnZXMsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbiB0cmFuc2FjdGlvbjsgdGhlIHRyYW5zYWN0aW9uIG11c3QgXCIgK1xuICAgICAgICAgICAgICAgIFwiYmUgZW5kZWQgc3luY2hyb25vdXNseSBzbyB0aGF0IG1lc3NhZ2VzIFwiICtcbiAgICAgICAgICAgICAgICBcImNhbm5vdCBiZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uY2hhbmdlICYmIGRlc2NyaXB0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkID0gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNoYW5nZShuZXcgQ3JkdENoYW5nZUV2ZW50KHRoaXMsIHRyYW5zbGF0ZWQsIHRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0ID0gQ3JkdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfY29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ291bnRlcjIgPSBleHBvcnRzLkNvdW50ZXIyQWRkRXZlbnQgPSBleHBvcnRzLkNyZHQyID0gdm9pZCAwO1xuY2xhc3MgQ3JkdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgYXJncykge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG5jbGFzcyBDcmR0MiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuICAgIGNhbGxSZW1vdGUobWV0aG9kLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIFNlcmlhbGl6ZSB0aGUgbWV0aG9kIG5hbWUgYW5kIGFyZ3NcbiAgICAgICAgLy8gRG8gdGhpcyBmaXJzdCBpbiBjYXNlIGNhbGxpbmcgbWV0aG9kIGNoYW5nZXMgdGhlbVxuICAgICAgICBsZXQgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG5ldyBDcmR0TWVzc2FnZShtZXRob2QubmFtZSwgYXJncykpO1xuICAgICAgICAvLyBDYWxsIHRoZSBsb2NhbCBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlOiBUaGlzIHNob3VsZCB3b3JrIGJ1dCBUUyBpcyBjb25mdXNlZCBieSBhcmdzW10gdnMgQW55XG4gICAgICAgIGxldCByZXN1bHQgPSBtZXRob2QuY2FsbCh0aGlzLCBmYWxzZSwgdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCksIC4uLmFyZ3MpO1xuICAgICAgICAvLyBTZW5kIG1lc3NhZ2Ugb24gdGhlIG5ldHdvcmtcbiAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQobWVzc2FnZSwgdGhpcy5pZCk7XG4gICAgICAgIC8vIFJldHVybiBsb2NhbCByZXN1bHRcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIHRoaXMucnVudGltZSB3aGVuIGFuIGF0b21pYyBsaXN0IG9mXG4gICAgICogbWVzc2FnZXMgaXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgcmVjZWl2ZShtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VPYmogPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZU9iai5tZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gVE9ETzogZG9uJ3QgdGhyb3cgaGVyZSwgdG8gYXZvaWQgbWVzc2luZ1xuICAgICAgICAgICAgLy8gd2l0aCBjYWxsZXIuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBwYXJzZSBDcmR0TWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlOiBDYWxsIG1ldGhvZCBieSBuYW1lXG4gICAgICAgIGxldCBtZXRob2QgPSB0aGlzW21lc3NhZ2VPYmoubWV0aG9kXTtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBkb24ndCB0aHJvdyBoZXJlLCB0byBhdm9pZCBtZXNzaW5nXG4gICAgICAgICAgICAvLyB3aXRoIGNhbGxlci5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtZXRob2QgY2FsbGVkIHJlbW90ZWx5OiBcIiArIG1lc3NhZ2VPYmoubWV0aG9kKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBDaGVjayB0eXBlPyAgQXQgbGVhc3QgbWFrZSBzdXJlIGl0J3MgYSBmdW5jdGlvbj9cbiAgICAgICAgbWV0aG9kLmNhbGwodGhpcywgdHJ1ZSwgdGltZXN0YW1wLCAuLi5tZXNzYWdlT2JqLmFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdDIgPSBDcmR0MjtcbmNsYXNzIENvdW50ZXIyQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZUFkZGVkLCBuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMubmV3VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy50eXBlID0gXCJhZGRcIjtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXIyQWRkRXZlbnQgPSBDb3VudGVyMkFkZEV2ZW50O1xuY2xhc3MgQ291bnRlcjIgZXh0ZW5kcyBDcmR0MiB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsVmFsdWU7XG4gICAgfVxuICAgIHJlbW90ZUFkZChyZW1vdGVDYWxsZXIsIHRpbWVzdGFtcCwgdG9BZGQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSArPSB0b0FkZDtcbiAgICAgICAgaWYgKHJlbW90ZUNhbGxlciAmJiB0aGlzLm9uY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLm9uY2hhbmdlKG5ldyBDb3VudGVyMkFkZEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgdG9BZGQsIHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGQodG9BZGQpIHtcbiAgICAgICAgc3VwZXIuY2FsbFJlbW90ZSh0aGlzLnJlbW90ZUFkZCwgdG9BZGQpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ291bnRlcjIgPSBDb3VudGVyMjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRzMi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9qc29uXCIpLCBleHBvcnRzKTtcbi8vZXhwb3J0ICogZnJvbSAnLi9tdWx0aV9zZW1pZGlyZWN0Jztcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9yZXNldHRhYmxlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zdGFuZGFyZFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdHMyXCIpLCBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Kc29uQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHN0YW5kYXJkXzEgPSByZXF1aXJlKFwiLi9zdGFuZGFyZFwiKTtcbmNvbnN0IGJhc2ljX2NyZHRzXzEgPSByZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKTtcbmNsYXNzIEpzb25DcmR0IGV4dGVuZHMgc3RhbmRhcmRfMS5DcmR0T2JqZWN0IHtcbiAgICAvLyBUT0RPOiBhcnJheXMgKHNlcXVlbmNlcykuICBVc2VzIG1hcHMgZm9yIG5vdy5cbiAgICAvLyBUT0RPOiBudWxscz9cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHBhc3MgaW5pdGlhbCB2YWx1ZSAod2hpY2ggaXMgbm90IHN5bmNlZCkuXG4gICAgLy8gTW9yZSBnZW5lcmFsbHksIGFiaWxpdHkgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIHlvdXJcbiAgICAvLyBwcmVkZWZpbmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHN5bmNlZD9cbiAgICAvLyBVc2UgdGhlIGV4aXN0aW5nIGZsYWcgYW5kIGJsb2NrIG1lc3NhZ2VzIGluIENyZHRPYmplY3QuXG4gICAgY29uc3RydWN0b3IoY3JkdElkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmJvb2xlYW5zID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcImJvb2xlYW5zXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IHN0YW5kYXJkXzEuRW5hYmxlV2luc0ZsYWcoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5udW1iZXJzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcIm51bWJlcnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5JbnRSZWdpc3RlckNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcInN0cmluZ3NcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgYmFzaWNfY3JkdHNfMS5NdWx0aVZhbHVlUmVnaXN0ZXIoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5zZXRzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcInNldHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5BZGRXaW5zU2V0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMub2JqZWN0cyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJvYmplY3RzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IEpzb25DcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBDcmR0IHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgc3RvcmluZ1xuICAgICAqIHZhbHVlcyB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdHlwZUluZGljYXRvcixcbiAgICAgKiBvciB1bmRlZmluZWQgaWYgdGhlIGtleSBpcyBub3QgcHJlc2VudCAoaW5jbHVkaW5nXG4gICAgICogaWYgaXQgcHJldmlvdXNseSB3YXMgcHJlc2VudCBidXQgd2FzIHJlbW92ZWQpLlxuICAgICAqIChVc2UgaW5pdCBpbnN0ZWFkIGlmIHlvdSB3YW50IGEgZ3VhcmFudGVlZC1kZWZpbmVkXG4gICAgICogcmV0dXJuIHZhbHVlLilcbiAgICAgKiAoVE9ETzogZXhwbGFpbiBrZXlzIGFyZVxuICAgICAqIHNlZ3JlZ2F0ZWQgYnkgdmFsdWUgdHlwZSkuXG4gICAgICogRS5nLiBnZXQoXCJhXCIsIDApIHRvIGdldCB0aGUgbnVtYmVyIHZhbHVlIHdpdGgga2V5IDAuXG4gICAgICogU3RhbmRhcmQgdHlwZUluZGljYXRvciB2YWx1ZXM6XG4gICAgICogLSBmYWxzZTogYm9vbGVhbiAoRW5hYmxlV2luc0ZsYWcpXG4gICAgICogLSAwOiBudW1iZXIgKEludFJlZ2lzdGVyQ3JkdClcbiAgICAgKiAtIFwiXCI6IHN0cmluZyAoTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4pXG4gICAgICogLSBuZXcgU2V0KCk6IHNldCAoQWRkV2luc1NldClcbiAgICAgKiAtIHt9OiBvYmplY3QgKEpzb25DcmR0KVxuICAgICAqXG4gICAgICogVE9ETzogZXhwbGljdGx5IHR5cGVkIHZlcnNpb25zPyAgQ2FuIHdlIGRvIHRoaXMgY2xldmVybHlcbiAgICAgKiB3aXRoIGdlbmVyaWNzIGFuZCB0eXBlIHBvbHltb3JwaGlzbSBvciBzb21ldGhpbmc/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBnZXQoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXMoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ib29sZWFucy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmluZ3MuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBnZXQsIGJ1dCBpbnN0ZWFkIG9mIHJldHVybmluZyB0aGUgdmFsdWUgQ3JkdCxcbiAgICAgKiByZXR1cm5zIGl0cyB2YWx1ZS4gIE5vdGUgZm9yIHN0cmluZ3MsIGlmIHRoZSBDcmR0XG4gICAgICogZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSB2YWx1ZSAoZWl0aGVyIG9yIDIrKSxcbiAgICAgKiB3aGljaCBpcyBwb3NzaWJsZSBkdWUgdG8gdGhlIE11bHRpVmFsdWVSZWdpc3RlclxuICAgICAqIHNlbWFudGljcywgd2UgcmV0dXJuIHRoZSBzZXQgb2YgYWxsIGN1cnJlbnQgdmFsdWVzXG4gICAgICogaW5zdGVhZCBvZiBhIHNpbmdsZSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBUT0RPOiB1c2UgZ2VuZXJpY3MgdG8gc2F5IHRoYXQgcmV0dXJuIHZhbHVlIGlzXG4gICAgICogc2FtZSBhcyB0eXBlSW5kaWNhdG9yIHR5cGUgfCB1bmRlZmluZWQ/XG4gICAgICogV29ya3MgZXhjZXB0IGZvciBzdHJpbmdzLFxuICAgICAqIHdoaWNoIGNvdWxkIGluc3RlYWQgcmV0dXJuIGEgU2V0PHN0cmluZz4uXG4gICAgICogQ291bGQgaW5zdGVhZCBoYXZlIHNwZWNpZmljYWxseSB0eXBlZCB2ZXJzaW9ucyBvZiB0aGUgbWV0aG9kLlxuICAgICAqL1xuICAgIGdldFZhbHVlKGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5nZXQoa2V5LCB0eXBlSW5kaWNhdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlQ3JkdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDcmR0IGluc3RhbmNlb2YgYmFzaWNfY3JkdHNfMS5NdWx0aVZhbHVlUmVnaXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTZXQgPSB2YWx1ZUNyZHQudmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU2V0LnNpemUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcy9yZXZpdmVzIHRoZSBnaXZlbiBrZXkgd2l0aCB0aGUgaW5kaWNhdGVkIHR5cGUgaWZcbiAgICAgKiBuZWVkZWQsIG1ha2luZyBpdCBwcmVzZW50IGluIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHRoZSB2YWx1ZSBDcmR0LlxuICAgICAqL1xuICAgIGluaXQoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIC8vIFRPRE86IGNhbiB3ZSBnZW5lcmlmeSB0aGlzIGZ1bmN0aW9uIHBhdHRlcm4/XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgdG8gYSBjb3B5IG9mIHRoZSBnaXZlblxuICAgICAqIChub24tQ3JkdCkgdmFsdWUsIHVzaW5nIHRoZSBDcmR0J3MgLnZhbHVlID0gbWV0aG9kLlxuICAgICAqIFRoaXMgZ2VuZXJhbGx5IGhhcyB0aGUgZWZmZWN0IG9mIHJlc2V0dGluZyB0aGUgY3VycmVudCBDcmR0XG4gICAgICogYW5kIHRoZW4gcGVyZm9ybWluZyBvcGVyYXRpb25zIHRvIGRyaXZlIGl0IHRvIHRoZSBkZXNpcmVkXG4gICAgICogdmFsdWUuICBJZiB5b3Ugd2FudCBtb3JlIGNvbnRyb2wgb3ZlciBob3cgdGhlIHZhbHVlIGlzIHNldFxuICAgICAqIChlLmcuLCBwYXNzaW5nIGFuIG9wdGlvbiB0byBKc29uQ3JkdC5nZXRBc09iamVjdCB3aGVuIHNldHRpbmdcbiAgICAgKiBhbiBvYmplY3QncyB2YWx1ZSksIHlvdSBjYW4gaW5zdGVhZCBnZXQgdGhlIENyZHQgd2l0aFxuICAgICAqIHRoaXMuaW5pdChrZXksIHZhbHVlKSBhbmQgdGhlbiBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaXRcbiAgICAgKiBkaXJlY3RseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB2YWx1ZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIHZhbHVlIENyZHQgKHRoaXMuZ2V0KGtleSwgdmFsdWUpKS5cbiAgICAgKi9cbiAgICBzZXRWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuICAgIHNldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5pbml0KGtleSwgdmFsdWUpO1xuICAgICAgICB2YWx1ZUNyZHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG4gICAga2V5c0J5VHlwZSh0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3Mua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMua2V5cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMua2V5cygpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gQXJyYXkgb2YgW2tleSwgdHlwZSBuYW1lXSBwYWlyc1xuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuYm9vbGVhbnMua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJib29sZWFuXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMubnVtYmVycy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcIm51bWJlclwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnN0cmluZ3Mua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJzdHJpbmdcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zZXRzLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwic2V0XCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub2JqZWN0cy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcIm9iamVjdFwiXSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBjaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGUpIHtcbiAgICAgICAgaWYgKCEoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcyB8fFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QgfHxcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBrZXlDb25mbGljdFJ1bGU6IFwiICtcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoaXMgQ3JkdCdzIHZhbHVlIGluIE9iamVjdCBmb3JtLlxuICAgICAqIENoYW5naW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBDcmR0IHN0YXRlLlxuICAgICAqIE5vdGUgdGhhdCBzZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gSmF2YXNjcmlwdCBTZXRzLFxuICAgICAqIHJlc3VsdGluZyBpbiBhIG5vdC1xdWl0ZS1KU09OIGZvcm1hdCBvYmplY3QuXG4gICAgICogQSBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVyIGlzIGNvbnZlcnRlZCB0byBhIHN0cmluZyBpZiBpdCBoYXNcbiAgICAgKiBhIHNpbmdsZSB2YWx1ZTsgb3RoZXJ3aXNlICgwIG9yIDIrIHZhbHVlcykgaXRcbiAgICAgKiBpcyBjb252ZXJ0ZWQgdG8gYSBTZXQ8c3RyaW5nPlxuICAgICAqIChBcnJheTxzdHJpbmc+IGlmIHNldHNBc0FycmF5cz10cnVlKVxuICAgICAqIG9mIGFsbCBjdXJyZW50IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5Q29uZmxpY3RSdWxlPUpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgKiBQb2xpY3kgZm9yIGhhbmRsaW5nIGtleXMgb2YgZGlmZmVyZW50IHR5cGVzIHRoYXQgaGF2ZSB0aGVcbiAgICAgKiBzYW1lIG5hbWUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KTogdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3QuXG4gICAgICogLSBQcmVmaXhUeXBlczogcHJlZml4IHRoZSB0eXBlIG5hbWUgZm9sbG93ZWQgYnkgXCI6XCIgdG8gZWFjaCBrZXksXG4gICAgICogZS5nLiBcIm51bWJlcjpteUtleVwiLiAgVHlwZSBuYW1lcyBhcmUgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsXG4gICAgICogXCJzdHJpbmdcIiwgXCJzZXRcIiwgXCJvYmplY3RcIi5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IGlmIHRoZXJlIGlzIGEgY29uZmxpY3Qgb25cbiAgICAgKiBhIGtleSwgc2V0IGl0cyB2YWx1ZSB0byBlcXVhbCBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIG9mXG4gICAgICogdGhlIGNvbmZsaWN0aW5nIHZhbHVlcywgcGx1cyBhIGZsYWcgXCJqc29uQ3JkdEtleUV4cGFuZGVkID0gdHJ1ZVwiLiAgRS5nLlxuICAgICAqIFwibXlLZXlcIjoge1wianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLCBcInN0cmluZ1wiOiBcInN0cmluZ1ZhbHVlXCIsXG4gICAgICogXCJudW1iZXJcIjogN31cbiAgICAgKiBAcGFyYW0gc2V0c0FzQXJyYXlzID0gZmFsc2UgSWYgdHJ1ZSwgU2V0IHZhbHVlcyBhcmUgY29udmVydGVkXG4gICAgICogdG8gYXJyYXlzLCBzbyB0aGF0IHRoZSByZXN1bHRpbmcgT2JqZWN0IGlzIGluIHJlZ3VsYXIgSlNPTlxuICAgICAqIGZvcm1hdC4gIFRoaXMgaW5jbHVkZXMgU2V0PHN0cmluZz4gdmFsdWVzIHJlc3VsdGluZyBmcm9tXG4gICAgICogc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlcnMgdGhhdCBoYXZlIDAgb3IgMisgdmFsdWVzLlxuICAgICAqL1xuICAgIGdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgc2V0c0FzQXJyYXlzID0gZmFsc2UpIHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgbGV0IG9iamVjdCA9IHt9O1xuICAgICAgICAvLyBNYXBzIGtleXMgdG8gdGhlIG5hbWUgb2YgdGhlaXIgZmlyc3QgdHlwZVxuICAgICAgICBsZXQga2V5c1NvRmFyID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgY29uZmxpY3RlZEtleXNTb0ZhciA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuYm9vbGVhbnMsIFwiYm9vbGVhblwiLCB2YWx1ZSA9PiB2YWx1ZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLm51bWJlcnMsIFwibnVtYmVyXCIsIHZhbHVlID0+IHZhbHVlLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc3RyaW5ncywgXCJzdHJpbmdcIiwgdmFsdWUgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLnZhbHVlU2V0O1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5zaXplID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAoc2V0c0FzQXJyYXlzID8gWy4uLnJlc3VsdC52YWx1ZXMoKV0gOiByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc2V0cywgXCJzZXRcIiwgdmFsdWUgPT4gKHNldHNBc0FycmF5cyA/IFsuLi52YWx1ZS52YWx1ZV0gOiB2YWx1ZS52YWx1ZSkpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5vYmplY3RzLCBcIm9iamVjdFwiLCB2YWx1ZSA9PiB2YWx1ZS5nZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUsIHNldHNBc0FycmF5cykpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBnZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIG1hcCwgdHlwZU5hbWUsIHZhbHVlRnVuYykge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgbWFwLmtleXMoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVGdW5jKG1hcC5nZXQoa2V5KSk7XG4gICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIG9iamVjdFt0eXBlTmFtZSArIFwiOlwiICsga2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gS2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBrZXk6IFwiICsga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIHdoZW4ga2V5Q29uZmxpY3RSdWxlPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29uZmxpY3RlZEtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhwYW5kIHRoZSBleGlzdGluZyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmxpY3RlZEtleXNTb0Zhci5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHBhbmRlZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFtrZXlzU29GYXIuZ2V0KGtleSldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IGV4cGFuZGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldW3R5cGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAga2V5c1NvRmFyLnNldChrZXksIHR5cGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhpcyBvYmplY3QgYW5kIHRoZW4gcGVyZm9ybXMgb3BlcmF0aW9ucyB0b1xuICAgICAqIGRyaXZlIGl0cyB2YWx1ZSB0byB0aGUgZ2l2ZW4gSlNPTi1saWtlIE9iamVjdC5cbiAgICAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBib29sZWFucywgbnVtYmVycywgc3RyaW5ncyxcbiAgICAgKiBTZXRzLCBvciBvYmplY3RzIGFyZSBpZ25vcmVkOyBvYmplY3RzIGJlc2lkZXMgU2V0c1xuICAgICAqIGFyZSBwcm9jZXNzZWQgcmVjdXJzaXZlbHkuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogSWYgbmV3VmFsdWUgY29tZXMgZnJvbSBhIEpzb25DcmR0J3MgLnZhbHVlIG9yIGdldEFzT2JqZWN0XG4gICAgICogbWV0aG9kcywgbm90ZSB0aGF0IHNldHMvYXJyYXlzIG9mIHN0cmluZ3MgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBtdWx0aS12YWx1ZSByZWdpc3RlcnMgd2lsbCBiZSB0cmVhdGVkIGFzIHNldHMsIG5vdFxuICAgICAqIHN0cmluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG5ld1ZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdG8uXG4gICAgICogQHBhcmFtIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XG4gICAgICogSWYgbmV3VmFsdWUgd2FzIGdlbmVyYXRlZCBieSBnZXRBc09iamVjdCwgdGhlIGtleUNvbmZsaWN0UnVsZVxuICAgICAqIHVzZWQgdG8gZ2VuZXJhdGUgaXQsIHNvIHRoYXQgd2UgY2FuIHVuZG8gdGhlIGVmZmVjdFxuICAgICAqIG9mIHRoYXQgcnVsZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiBrZXlzIGFuZCB2YWx1ZXMgYXJlIHVzZWQgbGl0ZXJhbGx5LFxuICAgICAqIHdpdGggaW5mZXJyZWQgdHlwZXMuXG4gICAgICogVGhpcyBpcyBhcHByb3ByaWF0ZSBmb3IgT2JqZWN0cyBub3QgY29taW5nIGZyb20gYSBKc29uQ3JkdCdzXG4gICAgICogZ2V0QXNPYmplY3QgZnVuY3Rpb24sIGluIHdoaWNoIHdlIHdhbnQgdG8ga2VlcCBrZXlzIGFzXG4gICAgICogdGhleSBhcmUuXG4gICAgICogLSBQcmVmaXhUeXBlczogVHlwZXMgYXJlIHRha2VuIGZyb20gcHJlZml4ZXMgb24ga2V5cy4gIElmIGFcbiAgICAgKiBrZXkgZG9lcyBub3QgaGF2ZSBhIHR5cGUgcHJlZml4LCBpdCBpcyBpZ25vcmVkLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogb2JqZWN0cyB3aXRoIGEgcHJvcGVydHkgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIgc2V0XG4gICAgICogdG8gdHJ1ZSBhcmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHJlc3VsdCBvZiBleHBhbmRpbmcgYVxuICAgICAqIGtleSBkdWUgdG8gYSBjb25mbGljdC4gIElmIHN1Y2ggYW4gb2JqZWN0IGRvZXMgbm90IGhhdmVcbiAgICAgKiB0aGUgZXhwZWN0ZWQgZm9ybWF0LCBhbnkgcHJvcGVydGllcyB3aXRoIHVucmVjb2duaXplZCBuYW1lc1xuICAgICAqIGFyZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHNldFRvT2JqZWN0KG5ld1ZhbHVlLCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwobmV3VmFsdWUsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIG9wZXJhdGlvbnMgdG8gZHJpdmUgdGhpcyBDcmR0J3MgdmFsdWUgdG8gdGhlXG4gICAgICogZ2l2ZW4gSlNPTi1saWtlIE9iamVjdCdzIHN0YXRlLCBidXQgd2l0aG91dCByZXNldHRpbmdcbiAgICAgKiB0aGUgY3VycmVudCB2YWx1ZS4gIFRoZSBtYWluIGVmZmVjdCBvZiB0aGlzIGlzIHRvXG4gICAgICogbWVyZ2Uga2V5czsgaW4gY2FzZSBvZiBrZXkgY29uZmxpY3RzLCB0aGUgdmFsdWVzIGFyZSBtZXJnZWRcbiAgICAgKiBpbiBhIHR5cGUtc3BlY2lmaWMgd2F5IChUT0RPOiBkZXRhaWxzKS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBpcyBub3QgYSBtZXJnZSBpbiB0aGUgc2Vuc2Ugb2YgYSBzdGF0ZS1iYXNlZCBDcmR0LlxuICAgICAqIEluc3RlYWQsIGl0IHRoZSBDcmR0IHZlcnNpb24gb2YgbWVyZ2luZyBvcmRpbmFyeSAobm9uLUNyZHQpXG4gICAgICogT2JqZWN0cywgYnkgcmVjdXJzaXZlbHkgY29tYmluaW5nIHRoZWlyIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHNldFRvT2JqZWN0IGZvciBkaXNjbGFpbWVycyBhbmRcbiAgICAgKiBvdGhlcktleUNvbmZsaWN0UnVsZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIGNoYW5nZXM/XG4gICAgICogQHBhcmFtICBvdGhlciBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgbWVyZ2VPYmplY3Qob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBtZXJnZU9iamVjdEludGVybmFsKG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIC8vIEV4dHJhY3QgcHJvcGVydGllcyBhcyBhbiBhcnJheSBvZiBbbmFtZSwgdHlwZSwgdmFsdWVdXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gW107XG4gICAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIG90aGVyKSB7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb3RoZXJbcHJvcE5hbWVdO1xuICAgICAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gcHJvcE5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBwcm9wTmFtZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBwcm9wTmFtZS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gTXVsdGktdmFsdWVkIHN0cmluZ3MgYXJlIHRyZWF0ZWQgYXMgc2V0c1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCB0eXBlLCBvdGhlcltwcm9wTmFtZV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIHByb3BlcnRpZXMgbWF5IGdyb3cgZHVyaW5nIGV4ZWN1dGlvbiBkdWUgdG9cbiAgICAgICAgLy8gdW5wYWNraW5nIGV4cGFuZGVkIGtleXMuXG4gICAgICAgIGxldCBvcmlnaW5hbExlbmd0aCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IHByb3BlcnRpZXNbaV1bMF07XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHByb3BlcnRpZXNbaV1bMV07XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gcHJvcGVydGllc1tpXVsyXTtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhbiBleHBhbmRlZCBrZXlcbiAgICAgICAgICAgIGlmIChvdGhlcktleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCAmJlxuICAgICAgICAgICAgICAgIGkgPCBvcmlnaW5hbExlbmd0aCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWVbXCJqc29uQ3JkdEtleUV4cGFuZGVkXCJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gVW5wYWNrIHRoZSBvYmplY3Qgb250byB0aGUgZW5kIG9mIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBleHBhbmRlZE5hbWUgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBhbmRlZE5hbWUgIT09IFwianNvbkNyZHRLZXlFeHBhbmRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCBleHBhbmRlZE5hbWUsIHByb3BWYWx1ZVtleHBhbmRlZE5hbWVdXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBwcm9wZXJ0eSwgY2hlY2tpbmcgdGhhdCBpdCdzIHR5cGVcbiAgICAgICAgICAgICAgICAvLyBpcyBvbmUgd2UgZXhwZWN0LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3Q6IG1lcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQocHJvcE5hbWUsIHt9KS5tZXJnZU9iamVjdEludGVybmFsKHByb3BWYWx1ZSwgb3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmc6IG92ZXJ3cml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUludGVybmFsKHByb3BOYW1lLCBwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwic2V0XCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0OiBhZGQgYWxsIHZhbHVlcyBpbiBzZXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldENyZHQgPSB0aGlzLmluaXQocHJvcE5hbWUsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHByb3BWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENyZHQuYWRkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBza2lwIHRoZSBlbnRyeSAobm90IGEgcmVjb2duaXplZCB0eXBlKS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgdGhpcy5nZXRBc09iamVjdCgpLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXNPYmplY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuc2V0QXNPYmplY3QobmV3VmFsdWUpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldFRvT2JqZWN0KG5ld1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkpzb25DcmR0ID0gSnNvbkNyZHQ7XG4vLyBUT0RPOiBkZWxldGVcbi8vIFRPRE86IGRlbGV0ZVN0cm9uZyAob25jZSBtYXAgc3VwcG9ydHMgaXQuICBQZXJoYXBzIHRocm93XG4vLyBlcnJvciBvbiBtYXAgdmFsdWVzIG9ubHk/KVxuSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0ID0gMTtcbkpzb25DcmR0LlByZWZpeFR5cGVzID0gMjtcbkpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QgPSAzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVmYXVsdFJlc2V0dGFibGVDcmR0ID0gZXhwb3J0cy5PYnNlcnZlZFJlc2V0Q29tcG9uZW50ID0gZXhwb3J0cy5EZWZhdWx0UmVzZXRXaW5zQ3JkdCA9IGV4cG9ydHMuUmVzZXRXaW5zQ29tcG9uZW50ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuLy8gVE9ETzogaG93IHRvIGRvIGdhcmJhZ2UgY29sbGVjdGlvbiBvZiByZXNldC13aW5zIG9wZXJhdGlvbnM/XG4vLyBFLmcuIGZvciBmbGFncyBpbiBhIHNldDogZ2FyYmFnZSBjb2xsZWN0aW9uIHdpbGwgZmFpbCBpZlxuLy8gdGhlcmUgYXJlIHJlc2V0LXdpbnMgb3BzIGluIHRoZSBoaXN0b3J5LCBhcyBpdCBzaG91bGQsIGJ1dFxuLy8gd2Ugd291bGQgbGlrZSB0byBnYXJiYWdlIGNvbGxlY3QgYW55d2F5IG9uY2UgYWxsIHRoZSByZXNldC13aW5zXG4vLyBhcmUgY2F1c2FsbHkgc3RhYmxlLlxuY2xhc3MgUmVzZXRXaW5zQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHQgPSBvcmlnaW5hbENyZHQ7XG4gICAgICAgIHRoaXMucmVzZXRJbml0aWFsRGF0YSA9IHJlc2V0SW5pdGlhbERhdGE7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBhbHdheXMgXCJyZXNldFwiLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBfc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSB3ZSBzaG91bGQgcmV0dXJuIGEgY2xvbmUgb2YgdGhlIHJlc2V0IHN0YXRlLCBub3RcbiAgICAgICAgLy8gYSBmaXhlZCBcInJlc2V0IHN0YXRlXCIsIHNpbmNlIHRoZSByZXR1cm5lZCBzdGF0ZSBtYXlcbiAgICAgICAgLy8gYmUgbXV0YXRlZCBsYXRlci5cbiAgICAgICAgcmV0dXJuIFt0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKSwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvKG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwob3JpZ2luYWxDcmR0LCBuZXcgUmVzZXRXaW5zQ29tcG9uZW50KG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSksIChfbTIsIF9tMSkgPT4gbnVsbCwgMSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG59XG5leHBvcnRzLlJlc2V0V2luc0NvbXBvbmVudCA9IFJlc2V0V2luc0NvbXBvbmVudDtcbmNsYXNzIERlZmF1bHRSZXNldFdpbnNDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gUmVzZXRXaW5zQ29tcG9uZW50LmFkZFRvKG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWxSZXNldFdpbnMgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXRTdHJvbmcoKSB7XG4gICAgICAgIHN1cGVyLmFwcGx5T3AodGhpcy5nZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UpO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbMiwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgYXBwbHlPcChvcGVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzEsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhIHJlc2V0LXdpbnMgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRTdHJvbmdcIl0sIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBpdCBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcGVyYXRpb24gdGhhdCBnZXRzIGtpbGxlZCBieVxuICAgICAqIGEgY29uY3VycmVudCByZXNldC13aW5zIGlzIHNraXBwZWQuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBvcGVyYXRpb25zIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucyxcbiAgICAgKiB3aGljaCBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucywgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC13aW5zIGRlc2NyaXB0aW9uIGlzIFsyLCBcInJlc2V0XCJdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyICYmIGRlc2NbMV0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFN0cm9uZ1wiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzEsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKHRyYW5zbGF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGluc3RlYWQgb2YgdHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqIFNlZSBDcmR0LnRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXRXaW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmYXVsdFJlc2V0V2luc0NyZHQgPSBEZWZhdWx0UmVzZXRXaW5zQ3JkdDtcbi8vIFRPRE86IHJlbmFtZSBvcmlnaW5hbENyZHRJbnRlcm5hbCAoYWJvdmUpIGFuZCBvcmlnaW5hbENyZHRcbi8vIHRvIHJlZmxlY3QgcmVzZXQtd2lucyB2cyByZXNldCwgdG8gYXZvaWQgY29uZnVzaW9uLlxuY2xhc3MgT2JzZXJ2ZWRSZXNldENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0ID0gb3JpZ2luYWxDcmR0O1xuICAgICAgICB0aGlzLnJlc2V0SW5pdGlhbERhdGEgPSByZXNldEluaXRpYWxEYXRhO1xuICAgIH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgW1wicmVzZXRcIiwgbGlzdCBvZlxuICAgICAqIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgb3JpZ2luYWxDcmR0IHdoZW4gcHJvY2Vzc2luZ1xuICAgICAqIHRoZSBtZXNzYWdlcyBhcHBlYXJpbmcgaW4gbWVzc2FnZSAoaS5lLiwgdGhlIG1lc3NhZ2VzIHRoYXRcbiAgICAgKiBhdm9pZGVkIGJlaW5nIHJlc2V0IGJlY2F1c2UgdGhleSB3ZXJlIGNvbmN1cnJlbnQgdG8gdGhlXG4gICAgICogcmVzZXQgb3BlcmF0aW9uKV0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIF9zdGF0ZSwgcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCByZXNldFN0YXRlID0gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgY29uY3VycmVudE1lc3NhZ2Ugb2YgbWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMub3JpZ2luYWxDcmR0LmVmZmVjdChjb25jdXJyZW50TWVzc2FnZVswXSwgcmVzZXRTdGF0ZSwgcmVwbGljYUlkLCBjb25jdXJyZW50TWVzc2FnZVsxXSk7XG4gICAgICAgICAgICByZXNldFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Jlc2V0U3RhdGUsIFtcInJlc2V0XCIsIGRlc2NyaXB0aW9uc11dO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkVG8ob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwobmV3IE9ic2VydmVkUmVzZXRDb21wb25lbnQob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSwgb3JpZ2luYWxDcmR0LCAobTIsIG0xKSA9PiB7IG0xLnB1c2gobTIpOyByZXR1cm4gbTE7IH0sIDIsIHRydWUsIHRydWUsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZlZFJlc2V0Q29tcG9uZW50ID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudDtcbmNsYXNzIERlZmF1bHRSZXNldHRhYmxlQ3JkdCBleHRlbmRzIERlZmF1bHRSZXNldFdpbnNDcmR0IHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIG9yaWdpbmFsQ3JkdEludGVybmFsICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJlc2V0SW5pdGlhbERhdGEgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGtlZXBPbmx5TWF4aW1hbD1mYWxzZSBTdG9yZSBvbmx5IGNhdXNhbGx5IG1heGltYWxcbiAgICAgKiBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSwgdG8gc2F2ZSBzcGFjZSAoYWx0aG91Z2ggcG9zc2libHlcbiAgICAgKiBhdCBzb21lIENQVSBjb3N0KS4gIFRoaXMgaXMgb25seSBhbGxvd2VkIGlmIHRoZSBzdGF0ZVxuICAgICAqIG9ubHkgZXZlciBkZXBlbmRzIG9uIHRoZSBjYXVzYWxseSBtYXhpbWFsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IE9ic2VydmVkUmVzZXRDb21wb25lbnQuYWRkVG8ob3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIG9wIGlmIHdlJ3JlIGFscmVhZHkgcmVzZXQgKG9rYXkgZ2l2ZW5cbiAgICAgICAgLy8gb2JzZXJ2ZS1yZXNldCBzZW1hbnRpY3MpLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpKSB7XG4gICAgICAgICAgICBzdXBlci5hcHBseU9wKFsxLCBcInJlc2V0XCJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIE5vdGUgaGVyZSB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIHRoZSByZXNldC13aW5zIGxheWVyXG4gICAgICAgIC8vIChpdCdzIG5vdCB3cmFwcGVkIGF1dG9tYXRpY2FsbHkgbGlrZSBpbiBzdXBlci5hcHBseU9wcykuXG4gICAgICAgIHJldHVybiBbMSwgWzEsIFtdXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIGFwcGx5T3Aob3BlcmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsyLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0XCIsIFtUT0RPOiByZS1hcHBsaWVkIG9wc11dLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLCB3aGljaFxuICAgICAqIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSwgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC1zdHJvbmcgKGFscmVhZHkgdHJhbnNsYXRlZCBieSBEZWZhdWx0UmVzZXRXaW5zQ3JkdClcbiAgICAgICAgICAgIC8vIGRlc2NyaXB0aW9uIGlzIFwicmVzZXRTdHJvbmdcIlxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT2JzZXJ2ZWQgcmVzZXQgZGVzY3JpcHRpb24gaXMgWzEsIFtcInJlc2V0XCIsXG4gICAgICAgICAgICAvLyBsaXN0IG9mIHJlLWFwcGxpZWQgb3BzXV1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEgJiYgZGVzY1sxXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW4gdGhlIHNlY29uZCBlbnRyeSwgcHV0IHRoZSB0cmFuc2xhdGVkXG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9ucyB0aGF0IGRpZG4ndCBnZXQgcmVzZXQuICBLZWVwIGluXG4gICAgICAgICAgICAgICAgLy8gbWluZCB0aGF0IHRoZXNlIHdpbGwgYmUgZGVzY3JpcHRpb25zIGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gaW5uZXJtb3N0IHNlbWlkaXJlY3QgcHJvZHVjdC4gIFdoYXQgdG8gZG9cbiAgICAgICAgICAgICAgICAvLyBhYm91dCBvcGVyYXRpb25zIHRoYXQgd2VyZSBvcmlnaW5hbGx5IGdyb3VwZWRcbiAgICAgICAgICAgICAgICAvLyBhdG9taWNhbGx5LCBzaW5jZSB0cmFuc2xhdGUgZXhwZWN0cyB0aG9zZVxuICAgICAgICAgICAgICAgIC8vIHRvIGJlIGRlbGl2ZXJlZCB0b2dldGhlcj9cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goW1wicmVzZXRcIiwgZGVzY1sxXVsxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3JpZ2luYWxDcmR0T3BlcmF0aW9uIGlzIG9mIHRoZSBmb3JtIFsyLCBkZXNjXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXNjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZWQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUodHJhbnNsYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXR0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmYXVsdFJlc2V0dGFibGVDcmR0ID0gRGVmYXVsdFJlc2V0dGFibGVDcmR0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzZXR0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlyZWN0SW50ZXJuYWwgPSBleHBvcnRzLlNlbWlkaXJlY3RJbnRlcm5hbCA9IGV4cG9ydHMuU2VtaWRpcmVjdFN0YXRlID0gdm9pZCAwO1xuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmNsYXNzIFNlbWlkaXJlY3RTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoaW50ZXJuYWxTdGF0ZSwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxTdGF0ZSA9IGludGVybmFsU3RhdGU7XG4gICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMgPSBoaXN0b3J5VGltZXN0YW1wcztcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIFNwZWNpZmljYWxseSwgYXJyYXkgZWxlbWVudHMgYXJlIHR1cGxlc1xuICAgICAgICAgKiBbcGVyLXNlbmRlciBtZXNzYWdlIGNvdW50ZXIsIHRoaXMgcmVwbGljYSdzIHJlY2VpcHQgY291bnRlcixcbiAgICAgICAgICogbWVzc2FnZV0uICBLZWVwIGluIG1pbmQgdGhhdCBwZXItc2VuZGVyIG1lc3NhZ2VcbiAgICAgICAgICogY291bnRlcnMgbWF5IG5vdCBiZSBjb250aWd1b3VzLCBzaW5jZSB0aGV5IGFyZSBzaGFyZWQgYmV0d2VlblxuICAgICAgICAgKiBhbGwgQ3JkdHMgd2l0aCBhIGdpdmVuIENyZHRSdW50aW1lIGFuZCBiZXR3ZWVuXG4gICAgICAgICAqIGEgc2VtaWRpcmVjdCBwcm9kdWN0IGFuZCBpdHMgY29tcG9uZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkLCBtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wID0gdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA/XG4gICAgICAgICAgICBbbWVzc2FnZSwgdGltZXN0YW1wXSA6IG1lc3NhZ2U7XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChbdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKSwgdGhpcy5yZWNlaXB0Q291bnRlciwgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcF0pO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyKys7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aGUgZ2l2ZW5cbiAgICAgKiB0aW1lc3RhbXAsIGluIHNvbWUgY2F1c2FsIG9yZGVyIChzcGVjaWZpY2FsbHksIHRoaXMgcmVwbGljYSdzXG4gICAgICogcmVjZWlwdCBvcmRlcikuICBJZiB3ZSBhcmUgdGhlIHNlbmRlciAoaS5lLiwgcmVwbGljYUlkID09PVxuICAgICAqIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSksIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdGltZXN0YW1wIGlzXG4gICAgICogY2F1c2FsbHkgZ3JlYXRlciB0aGFuIGFsbCBwcmlvciBtZXNzYWdlcywgYXMgZGVzY3JpYmVkIGluXG4gICAgICogQ3JkdEludGVybmFsLmVmZmVjdCwgaGVuY2UgW10gaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCB0cnVlLCB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNwZWNpZmllZCBhY3Rpb25zIG9uIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeTpcbiAgICAgKiAtIGlmIHJldHVybkNvbmN1cnJlbnQgaXMgdHJ1ZSwgcmV0dXJucyB0aGUgbGlzdCBvZlxuICAgICAqIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRpbWVzdGFtcCwgaW5cbiAgICAgKiByZWNlaXB0IG9yZGVyLlxuICAgICAqIC0gaWYgZGlzY2FyZERvbWluYXRlZCBpcyB0cnVlLCBkZWxldGVzIGFsbCBtZXNzYWdlcyBmcm9tXG4gICAgICogdGhlIGhpc3Rvcnkgd2hvc2UgdGltZXN0YW1wcyBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5XG4gICAgICogb3IgZXF1YWwgdG8gdGhlIGdpdmVuIHRpbWVzdGFtcC4gIChOb3RlIHRoYXQgdGhpcyBtZWFucyB0aGF0XG4gICAgICogaWYgd2Ugd2FudCB0byBrZWVwIGEgbWVzc2FnZSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAgaW5cbiAgICAgKiB0aGUgaGlzdG9yeSwgaXQgbXVzdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBhZnRlciBjYWxsaW5nXG4gICAgICogdGhpcyBtZXRob2QuKVxuICAgICAqL1xuICAgIHByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHJldHVybkNvbmN1cnJlbnQsIGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcncyBjb25jdXJyZW50LCBzbyBjbGVhciBldmVyeXRoaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5LmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2F0aGVyIHVwIHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzLiAgVGhlc2UgYXJlIGFsbFxuICAgICAgICAvLyBtZXNzYWdlcyBieSBlYWNoIHJlcGxpY2FJZCB3aXRoIHNlbmRlciBjb3VudGVyXG4gICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpLmdldChyZXBsaWNhSWQpLlxuICAgICAgICBsZXQgY29uY3VycmVudCA9IFtdO1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB2Yy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldChlbnRyeVswXSk7XG4gICAgICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnRJbmRleFN0YXJ0ID0gU2VtaWRpcmVjdFN0YXRlLmluZGV4QWZ0ZXIoc2VuZGVySGlzdG9yeSwgZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb25jdXJyZW50SW5kZXhTdGFydDsgaSA8IHNlbmRlckhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmN1cnJlbnQucHVzaChzZW5kZXJIaXN0b3J5W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIG1lc3NhZ2VzIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLy8gPj0gY29uY3VycmVudEluZGV4U3RhcnRcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVySGlzdG9yeS5zcGxpY2UoMCwgY29uY3VycmVudEluZGV4U3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxldGUgaXQgZnJvbSB0aGUgbWFwIGlmIGVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBhIGZvcm0gb2YgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsc28gbWFrZXMgaXNIaXN0b3J5RW1wdHkgc2ltcGxlci5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNvcnQgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMgaW4gcmVjZWlwdCBvcmRlciAoaS5lLixcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBzZWNvbmQgZW50cnkgaW4gZWFjaCB0cmlwbGUpLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYVsxXSAtIGJbMV0pKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQubWFwKGEgPT4gYVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCkge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3Igd29ya2luZyB3aXRoIHRoZSBwZXItc2VuZGVyIGhpc3RvcnlcbiAgICAgKiBhcnJheXMuICBSZXR1cm5zIHRoZSBpbmRleCBhZnRlciB0aGUgbGFzdCBlbnRyeSB3aG9zZVxuICAgICAqIHBlci1zZW5kZXIgY291bnRlciAodGhlIGZpcnN0IHR1cGxlIGVsZW1lbnQpIGlzIDw9XG4gICAgICogdmFsdWUuXG4gICAgICovXG4gICAgc3RhdGljIGluZGV4QWZ0ZXIoc3BhcnNlQXJyYXksIHZhbHVlKSB7XG4gICAgICAgIC8vIFRPRE86IGJpbmFyeSBzZWFyY2ggd2hlbiBzcGFyc2VBcnJheSBpcyBsYXJnZVxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlcmUgbWF5IGJlIGR1cGxpY2F0ZSB0aW1lc3RhbXBzLlxuICAgICAgICAvLyBTbyBpdCB3b3VsZCBiZSBpbmFwcHJvcHJpYXRlIHRvIGZpbmQgYW4gZW50cnkgd2hvc2VcbiAgICAgICAgLy8gcGVyLXNlbmRlciBjb3VudGVyIGVxdWFscyB2YWx1ZSBhbmQgaW5mZXIgdGhhdFxuICAgICAgICAvLyB0aGUgZGVzaXJlZCBpbmRleCBpcyAxIGdyZWF0ZXIuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhcnNlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzcGFyc2VBcnJheVtpXVswXSA+IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSBTZW1pZGlyZWN0U3RhdGU7XG5jbGFzcyBTZW1pZGlyZWN0SW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRpbmcgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBvZlxuICAgICAqIGNyZHQxIGFuZCBjcmR0MiB3aXRoIHRoZSBnaXZlbiBhY3Rpb24sIHdoaWNoIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAobTI6IGNyZHQyIG1lc3NhZ2UsIG0xOiBjcmR0MSBtZXNzYWdlKTogY3JkdDEgbWVzc2FnZS5cbiAgICAgKiBjcmR0MSwgY3JkdDIsIGFuZCBhY3Rpb24gbXVzdCBzYXRpc2Z5IHRoZSBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICAgKiBhc3N1bXB0aW9ucyBmcm9tIG91ciBwYXBlci5cbiAgICAgKlxuICAgICAqIFRPRE86IG9wdGlvbnMgYW5kIHRoZWlyIHRoZW9yZXRpY2FsIHNpZ25pZmljYW5jZS4gIEZvcm1hbGx5LFxuICAgICAqIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSBtZWFucyB0aGF0IHRpbWVzdGFtcHMgYmVjb21lXG4gICAgICogcGFydCBvZiB0aGUgY3JkdDIgbWVzc2FnZXMuICBBbHNvIGNyZWF0ZUNyZHRJbmRleC5cbiAgICAgKiBEb21pbmF0ZWQgc3RhdHMgY29udHJvbCB3aGV0aGVyIHlvdSBkaXNjYXJkIG1lc3NhZ2VzIGluIHRoZVxuICAgICAqIGhpc3RvcnkgdGhhdCBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGNyZHQxL2NyZHQyIG1lc3NhZ2VzO1xuICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoYXQgYWN0aW9uIGlzIHRoZSBzYW1lIHdpdGggdGhvc2UgbWVzc2FnZXNcbiAgICAgKiBkaXNjYXJkZWQuICBJZiBkb21pbmF0ZWQxIGlzIHNldCwgdGhlbiBzdGF0ZS5pc0hpc3RvcnlFbXB0eSgpXG4gICAgICogYmVjb21lcyAodGhlcmUgZXhpc3RzIGEgY3JkdDIgbWVzc2FnZSBub3QgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGFcbiAgICAgKiBjcmR0MSBtZXNzYWdlKS4gIENoZWNrIHRoaXMgaXMgc3RpbGwgdHJ1ZSBpZiBkb21pbmF0ZWQyIGlzIHNldC4pXG4gICAgICogRXhwbGFpbiBleGFtcGxlcyB3aGVyZSB0aGlzIGlzIHVzZWQgKHJlc2V0dGFibGUsIGZsYWdzKTsgaXQnc1xuICAgICAqIG5vdCBxdWl0ZSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHNwaXJpdCB1bmxlc3MgeW91IHRoaW5rXG4gICAgICogb2YgaXQgYXMgdXNpbmcgdGhlIGhpc3RvcnkgYXMgcGFydCBvZiB0aGUgY3JkdDEvMiBzdGF0ZS5cbiAgICAgKiBQb3RlbnRpYWwgb3B0aW1pemF0aW9uOiBvbmx5IGRlbGV0ZSBkb21pbmF0ZWQgbWVzc2FnZXMgd2hlblxuICAgICAqIHJlY2VpdmluZyBvdXIgb3duIG1lc3NhZ2UgKGl0J3MgYmFzaWNhbGx5IGZyZWUgYW5kIGFsd2F5c1xuICAgICAqIGNsZWFycyB0aGUgaGlzdG9yeSksIG9yIG9ubHkgc29tZXRpbWVzICh3aWxsIG1pc3Mgc29tZVxuICAgICAqIG1lc3NhZ2VzLCBzbyBuZWVkIHRvIGVuc3VyZSBjb3JyZWN0bmVzcyBpbiB0aGF0IGNhc2VcbiAgICAgKiAoSSB0aGluayBpdCBpcyBva2F5IGZvciBkb21pbmF0ZWQyIGJ1dCBub3QgZG9taW5hdGVkMSBpbiBvdXJcbiAgICAgKiB0YXJnZXQgdXNlIGNhc2VzKSwgYnV0XG4gICAgICogc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IGR1ZSB0byBiYXRjaGluZyBhbmQgc3RpbGwga2lsbFxuICAgICAqIG9mZiBtb3N0IG1lc3NhZ2VzKS4gIFRoaXMgdHJhZGVzIGEgc21hbGwgaW5jcmVhc2UgaW4gc3BhY2VcbiAgICAgKiB1c2FnZSBmb3IgYSBkZWNyZWFzZSBpbiBDUFUgdGltZS5cbiAgICAgKlxuICAgICAqIEFzIGRlc2NyaWJlZCBpbiBDcmR0SW50ZXJuYWwgYW5kIENyZHQsIG51bGwgbWVzc2FnZXMgYXJlIHRyZWF0ZWRcbiAgICAgKiBhcyB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gaWQsIGFsbG93aW5nIHRoZW0gdG8gYmUgb3B0aW1pemVkIGF3YXkuXG4gICAgICogQmVjYXVzZSBvZiB0aGlzLCBhY3Rpb24gd2lsbCBuZXZlciBiZSBjYWxsZWQgd2l0aCBudWxsIGFzXG4gICAgICogZWl0aGVyIGlucHV0LiAgSW5zdGVhZCwgd2UgYmVoYXZlIGFzIGlmXG4gICAgICogKGFjdGlvbihpZCAoaS5lLiwgbnVsbCksIG0xKSA9IG0xKVxuICAgICAqIGZvciBhbGwgbTEgYW5kIChhY3Rpb24obTIsIGlkKSA9IGlkKSBmb3IgYWxsIG0yLiAgVGhlIHNlbWlkaXJlY3RcbiAgICAgKiBwcm9kdWN0IGFzc3VtcHRpb25zIG11c3QgaG9sZCBnaXZlbiB0aGVzZSBhc3NpZ25tZW50cy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjcmR0MSwgY3JkdDIsIGFjdGlvbiwgY3JlYXRlQ3JkdEluZGV4LCBoaXN0b3J5VGltZXN0YW1wcyA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZUNyZHRJbmRleCA9IGNyZWF0ZUNyZHRJbmRleDtcbiAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA9IGhpc3RvcnlUaW1lc3RhbXBzO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBsZXQgaW50ZXJuYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ3JkdEluZGV4ID09PSAxKVxuICAgICAgICAgICAgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0U3RhdGUoaW50ZXJuYWxTdGF0ZSwgdGhpcy5oaXN0b3J5VGltZXN0YW1wcywgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogVE9ETyAoZ2VuZXJhbCk6IGVycm9yIGNoZWNraW5nXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvblswXSA9PT0gMSkge1xuICAgICAgICAgICAgbGV0IG9wMSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AxID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbMSwgb3AxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcDIgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMiA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG9wMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS4gIEZvciB0aGlzLmNyZHQxXG4gICAgICogbWVzc2FnZXMsIHRoZSBkZXNjcmlwdGlvbiBpcyBmb3IgdGhlIGFjdGVkLW9uIG1lc3NhZ2UgdGhhdFxuICAgICAqIGlzIGFjdHVhbGx5IGFwcGxpZWQgdG8gdGhpcy5pbnRlcm5hbFN0YXRlLCBub3QgdGhlIGlucHV0XG4gICAgICogbWVzc2FnZS4gIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwgKG9yIGlmIHRoZSBtZXNzYWdlIGdldHMgYWN0ZWQgb24gdG8gYmVjb21lIG51bGwpLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChtZXNzYWdlWzBdID09PSAyKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHN0YXRlLmFkZChyZXBsaWNhSWQsIG1lc3NhZ2VbMV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFsyLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb25jdXJyZW50ID0gc3RhdGUuZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBsZXQgbUFjdCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtQWN0ID0gdGhpcy5hY3Rpb24oY29uY3VycmVudFtpXSwgbUFjdCk7XG4gICAgICAgICAgICAgICAgaWYgKG1BY3QgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1BY3QsIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFsxLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtaWRpcmVjdEludGVybmFsID0gU2VtaWRpcmVjdEludGVybmFsO1xuY2xhc3MgRGlyZWN0SW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIERpcmVjdCBwcm9kdWN0IG9mIENyZHRJbnRlcm5hbCdzLiAgVGhpcyBpcyB0aGVcbiAgICAgKiBzcGVjaWFsIGNhc2Ugb2YgU2VtaWRpcmVjdEludGVybmFsIHdoZW4gdGhlIGFjdGlvbiBpcyB0cml2aWFsXG4gICAgICogKChtXzIsIG0xKSA9PiBtMSkuICBJbiB0aGlzIGNhc2Ugd2UgY2FuIG9wdGltaXplXG4gICAgICogYnkgbm90IGtlZXBpbmcgdGhlIGhpc3Rvcnkgb3IgYWN0aW5nIG9uIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogRm9yIHRoaXMgdG8gYmUgYSBDcmR0LCBjb25jdXJyZW50IG1lc3NhZ2VzIG9mIHRoZSB0d28gaW5wdXRcbiAgICAgKiBDcmR0cyBtdXN0IGNvbW11dGUuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgY29uc3RydWN0aW9uIGlzIHN5bW1ldHJpYyAoc3dpdGNoaW5nIGNyZHQxIGFuZFxuICAgICAqIGNyZHQyIGRvZXNuJ3QgY2hhbmdlIHRoZSBzZW1hbnRpY3MpLCBleGNlcHQgZm9yIHN3YXBwaW5nXG4gICAgICogdGhlIG1lYW5pbmcgb2YgdGhlIG51bWJlcnMgMS8yIGluIGNyZWF0ZUNyZHRJbmRleCBhbmRcbiAgICAgKiBpbiB0aGUgZmlyc3QgY29vcmRpbmF0ZXMgb2YgbWVzc2FnZXMgYW5kIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JlYXRlQ3JkdEluZGV4IFdoaWNoIGNyZHQncyBjcmVhdGUgbWV0aG9kIHRvIHVzZVxuICAgICAqIGluIGNyZWF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjcmR0MSwgY3JkdDIsIGNyZWF0ZUNyZHRJbmRleCkge1xuICAgICAgICB0aGlzLmNyZHQxID0gY3JkdDE7XG4gICAgICAgIHRoaXMuY3JkdDIgPSBjcmR0MjtcbiAgICAgICAgdGhpcy5jcmVhdGVDcmR0SW5kZXggPSBjcmVhdGVDcmR0SW5kZXg7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtvcGVyYXRpb25bMF0sIG1lc3NhZ2VdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLlxuICAgICAqIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwsXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqIFRPRE86IHBlcmhhcHMgYWRkIHRyYW5zbGF0aW5nIGRlc2NyaXB0aW9ucyB0byB0aGlzIGNsYXNzLCBzb1xuICAgICAqIHRoZSBDcmR0IGRvZXNuJ3QgaGF2ZSB0byB1bmRlcnN0YW5kIGFsbCBvZiB0aGUgbGF5ZXJzIGF0XG4gICAgICogb25jZT9cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0WzBdLCBudWxsXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRbMF0sIFttZXNzYWdlWzBdLCByZXN1bHRbMV1dXTtcbiAgICB9XG59XG5leHBvcnRzLkRpcmVjdEludGVybmFsID0gRGlyZWN0SW50ZXJuYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZW1pZGlyZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcnJheUNyZHRJbnRlcm5hbCA9IGV4cG9ydHMuTWFwQ3JkdCA9IGV4cG9ydHMuQWRkV2luc1NldCA9IGV4cG9ydHMuQ3JkdE9iamVjdCA9IGV4cG9ydHMuR01hcEludGVybmFsID0gZXhwb3J0cy5EaXNhYmxlV2luc0ZsYWcgPSBleHBvcnRzLkVuYWJsZVdpbnNGbGFnID0gZXhwb3J0cy5Ob09wQ3JkdEludGVybmFsID0gZXhwb3J0cy5PcnRob2dvbmFsQ3JkdCA9IGV4cG9ydHMuSW50UmVnaXN0ZXJDcmR0ID0gZXhwb3J0cy5VbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgPSB2b2lkIDA7XG5jb25zdCByZXNldHRhYmxlXzEgPSByZXF1aXJlKFwiLi9yZXNldHRhYmxlXCIpO1xuY29uc3QgYmFzaWNfY3JkdHNfMSA9IHJlcXVpcmUoXCIuL2Jhc2ljX2NyZHRzXCIpO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuY2xhc3MgVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIG5dKTtcbiAgICB9XG4gICAgbXVsdChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgIH1cbn1cbmV4cG9ydHMuVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0ID0gVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0O1xuLy8gc2VtaWRpcmVjdEluc3RhbmNlIGNvbXBsZXRlbHkgZGVzY3JpYmVzIHRoaXMgc2VtaWRpcmVjdCBwcm9kdWN0XG5VbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwoYmFzaWNfY3JkdHNfMS5Db3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIGJhc2ljX2NyZHRzXzEuTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIChtMiwgbTEpID0+IG0yICogbTEsIDEpO1xuY2xhc3MgSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgcmVzZXR0YWJsZV8xLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSA9IDAsIHJlc2V0VmFsdWUgPSAwKSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBuXSk7XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIG5dKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tYWRkLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmFkZChuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vIFRyYW5zYWN0aW9uIGR1ZSB0byBzZXQgdmFsdWUsIHJldHVybiB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gICAgICAgICAgICByZXR1cm4gW1wic2V0XCIsIGRlc2NyaXB0aW9uc1sxXVsxXV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbZGVzY3JpcHRpb25bMF0sIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5leHBvcnRzLkludFJlZ2lzdGVyQ3JkdCA9IEludFJlZ2lzdGVyQ3JkdDtcbkludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChiYXNpY19jcmR0c18xLkNvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgYmFzaWNfY3JkdHNfMS5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgKG0yLCBtMSkgPT4gbTIgKiBtMSwgMSk7XG5mdW5jdGlvbiBwb3NpdGl2ZU1vZChhLCBiKSB7XG4gICAgaWYgKGEgPj0gMClcbiAgICAgICAgcmV0dXJuIGEgJSBiO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGIgLSAoKC1hKSAlIGIpO1xufVxuY2xhc3MgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBbMCwgZmFsc2VdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aXZlTW9kKG9wZXJhdGlvbiwgMiAqIE1hdGguUEkpO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2Qoc3RhdGVbMF0gKyBtZXNzYWdlLCAyICogTWF0aC5QSSksIHN0YXRlWzFdXSwgbWVzc2FnZV07XG4gICAgfVxufVxuT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwoKTtcbmNsYXNzIE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwge1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVmbGVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICByZXR1cm4gXCJyZWZsZWN0XCI7XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJyZWZsZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgLy8gUmVmbGVjdGlvbiBvcGVyYXRpb24gaXMgbXVsdGlwbHlpbmcgb24gdGhlIGxlZnQsXG4gICAgICAgIC8vIHNvIHRvIHB1dCBpdCBpbiBjYW5vbmljYWwgZm9ybSAoZzEsIGcyKSwgd2UgaGF2ZSB0b1xuICAgICAgICAvLyBjb21tdXRlIGl0IHdpdGggdGhlIGN1cnJlbnQgZzEgKHJvdGF0aW9uKSB2YWx1ZSBieVxuICAgICAgICAvLyBhY3Rpbmcgb24gaXQuXG4gICAgICAgIHJldHVybiBbW3Bvc2l0aXZlTW9kKC1zdGF0ZVswXSwgMiAqIE1hdGguUEkpLCAhc3RhdGVbMV1dLCBcInJlZmxlY3RcIl07XG4gICAgfVxufVxuT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsKCk7XG4vKipcbiAqIENyZHQgZm9yIHRoZSAyLWRpbWVuc2lvbmFsIG9ydGhvZ29uYWwgZ3JvdXAsIHdoaWNoIGFsbG93c1xuICogcm90YXRpb25zIGFuZCByZWZsZWN0aW9ucyAoYWJvdXQgdGhlIG9yaWdpbikgb2YgYW4gb2JqZWN0IGluIHRoZVxuICogcGxhbmUuICBFeGFtcGxlIHVzYWdlOiByb3RhdGluZyBhbmQgcmVmbGVjdGluZyBvYmplY3RzIGluXG4gKiBQb3dlcnBvaW50LlxuICpcbiAqIFN0YXRlIGlzIHN0b3JlZCBhcyB0aGUgY2Fub25pY2FsIGVsZW1lbnQgb2YgdGhlIHNlbWlkaXJlY3RcbiAqIHByb2R1Y3QgZ3JvdXAsIGkuZS4sIGluIHRoZSBmb3JtIChnMSwgZzIpIGZvciBnMSBpbiB0aGUgcm90YXRpb25cbiAqIGdyb3VwIChyZWFscyBtb2QgMnBpKSBhbmQgZzIgaW4gdGhlIHJlZmxlY3Rpb24gZ3JvdXAgKGJvb2xlYW5zXG4gKiB3aXRoIHRydWUgZm9yIDEgYW5kIGZhbHNlIGZvciAwKS5cbiAqL1xuY2xhc3MgT3J0aG9nb25hbENyZHQgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbFZhbHVlID0gWzAsIGZhbHNlXSwgcmVzZXRWYWx1ZSA9IFswLCBmYWxzZV0pIHtcbiAgICAgICAgc3VwZXIoaWQsIE9ydGhvZ29uYWxDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcmVzZXRWYWx1ZSwgcnVudGltZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW5nbGUgaXMgaW4gcmFkaWFucyBDQ1cuXG4gICAgICovXG4gICAgcm90YXRlKGFuZ2xlKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgYW5nbGVdKTtcbiAgICB9XG4gICAgcmVmbGVjdEhvcml6b250YWxBeGlzKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIFwicmVmbGVjdFwiXSk7XG4gICAgfVxuICAgIHJlZmxlY3RWZXJ0aWNhbEF4aXMoKSB7XG4gICAgICAgIHRoaXMucmVmbGVjdChNYXRoLlBJIC8gMik7XG4gICAgfVxuICAgIHJlZmxlY3QoYW5nbGVBeGlzKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJvdGF0ZSgtYW5nbGVBeGlzKTtcbiAgICAgICAgdGhpcy5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoYW5nbGVBeGlzKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAqIGlmIHJlZmxlY3RlZCBpcyB0cnVlLCB0aGVuIHJvdGF0ZSBieSBhbmdsZSAoQ0NXLCBpbiByYWRpYW5zKS5cbiAgICAgKi9cbiAgICBnZXQgcmVmbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlWzFdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAqIGlmIHJlZmxlY3RlZCBpcyB0cnVlLCB0aGVuIHJvdGF0ZSBieSBhbmdsZSAoQ0NXLCBpbiByYWRpYW5zKS5cbiAgICAgKi9cbiAgICBnZXQgYW5nbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFtyZWZsZWN0ZWQsIGFuZ2xlXVxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLmFuZ2xlLCB0aGlzLnJlZmxlY3RlZF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1zZXQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMucm90YXRlKG5ld1ZhbHVlWzBdKTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlWzFdKVxuICAgICAgICAgICAgdGhpcy5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBtYXRyaXggdmVyc2lvbnMgb2YgZ2V0IGFuZCBzZXQuXG4gICAgLy8gLyoqXG4gICAgLy8gICogQHJldHVybiBUaGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbiBhcyBhIDJ4MiBvcnRob2dvbmFsXG4gICAgLy8gICogbWF0cml4LlxuICAgIC8vICAqL1xuICAgIC8vIGdldCBtYXRyaXgoKTogW1tudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl1dIHtcbiAgICAvL1xuICAgIC8vIH1cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKF9kZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgLy8gVE9ETy4gIEp1c3QgcmV0dXJucyB0aGUgcmVzdWx0aW5nIHN0YXRlIGZvciBub3cuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAvLyAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgLy8gICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgcmV0dXJuIFtkZXNjcmlwdGlvblswXSBhcyBzdHJpbmcsIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5leHBvcnRzLk9ydGhvZ29uYWxDcmR0ID0gT3J0aG9nb25hbENyZHQ7XG5PcnRob2dvbmFsQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbC5pbnN0YW5jZSwgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbC5pbnN0YW5jZSwgKF9tMiwgbTEpID0+IC1tMSwgMSk7XG4vKipcbiAqIENyZHRJbnRlcm5hbCB3aGljaCB1c2VzIGFueSBzdHJpbmcgYXMgYW4gb3BlcmF0aW9uL21lc3NhZ2VcbiAqIHdoaWNoIGRvZXMgbm90aGluZy4gIFVubGlrZSB1c2luZyBudWxsIG1lc3NhZ2VzIHRvIGluZGljYXRlIHRoYXRcbiAqIG5vdGhpbmcgaGFwcGVuZWQsIHRoZSBub29wIG1lc3NhZ2UgaXMgYW4gZXhwbGljaXQgbm9uLW51bGxcbiAqIHN0cmluZyBzdXBwbGllZCBhcyB0aGUgb3BlcmF0aW9uLlxuICpcbiAqIFR3byB1c2UgY2FzZXM6XG4gKiAtIFRvIHVucmVzZXQgYSBzdGF0ZSAoZS5nLiBpbiBFbmFibGVXaW5zRmxhZyBiZWxvdykuXG4gKiAtIEFzIGEgXCJoZWFkZXJcIiBmb3Igc2VxdWVuY2Ugb2Ygb3BlcmF0aW9ucyBwYXNzZWQgdG8gYXBwbHlPcHMsXG4gKiBzbyB0aGF0IHJlY2lwaWVudHMgY2FuIGtub3cgd2hhdCBlbmQtdXNlciBvcGVyYXRpb24gdGhlIHNlcXVlbmNlXG4gKiBjb3JyZXNwb25kcyB0by5cbiAqL1xuY2xhc3MgTm9PcENyZHRJbnRlcm5hbCB7XG4gICAgY29uc3RydWN0b3IoY3JlYXRlRnVuYykge1xuICAgICAgICB0aGlzLmNyZWF0ZUZ1bmMgPSBjcmVhdGVGdW5jO1xuICAgIH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlRnVuYylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZ1bmMoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDcmVhdGVGdW5jIG5vdCBzdXBwbGllZFwiKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgdGhlIG9yaWdpbmFsIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBhZGRUbyhvcmlnaW5hbENyZHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBzZW1pZGlyZWN0XzEuRGlyZWN0SW50ZXJuYWwob3JpZ2luYWxDcmR0LCBuZXcgTm9PcENyZHRJbnRlcm5hbCgpLCAxKTtcbiAgICB9XG59XG5leHBvcnRzLk5vT3BDcmR0SW50ZXJuYWwgPSBOb09wQ3JkdEludGVybmFsO1xuY2xhc3MgRW5hYmxlV2luc0ZsYWcgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSkge1xuICAgICAgICBzdXBlcihpZCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKCkgPT4gbnVsbCksIG51bGwsIHJ1bnRpbWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFwiZVwiKTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBkaXNhYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZG9pbmcgYSByZXNldCBiZWZvcmUgc2V0dGluZ1xuICAgICAgICAvLyB0byBuZXdWYWx1ZSwgaW4gZWl0aGVyIGNhc2UsIHNpbmNlIGFueSBtZXNzYWdlIG9idmlhdGVzXG4gICAgICAgIC8vIGNhdXNhbGx5IGxlc3NlciBtZXNzYWdlcy5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIFRPRE86IHdvdWxkIGFsc28gbGlrZSB0byB0cmFuc2xhdGUgb2JzZXJ2ZWQtcmVzZXRzIHRvXG4gICAgLy8gZGlzYWJsZSAoYnV0IG9ubHkgaWYgaXQgYWN0dWFsbHkgd29ya2VkKS4gIFBlcmhhcHMgYWRkIG5vb3AgaW5kaWNhdG9yIG91dCBmcm9udD9cbiAgICAvLyAoTmVlZCB0byBhZGQgYSBuby1vcCBjcmR0IGF0IHRoZSB0b3AgbGV2ZWwpXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdID09PSBcImVcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRW5hYmxlV2luc0ZsYWcgPSBFbmFibGVXaW5zRmxhZztcbmNsYXNzIERpc2FibGVXaW5zRmxhZyBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCwgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGVuYWJsZVN0cm9uZygpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0cm9uZygpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJkXCIpO1xuICAgIH1cbiAgICBnZXQgZW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZG9pbmcgYSByZXNldCBiZWZvcmUgc2V0dGluZ1xuICAgICAgICAvLyB0byBuZXdWYWx1ZSwgaW4gZWl0aGVyIGNhc2UsIHNpbmNlIGFueSBtZXNzYWdlIG9idmlhdGVzXG4gICAgICAgIC8vIGNhdXNhbGx5IGxlc3NlciBtZXNzYWdlcy5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIFRPRE86IHdvdWxkIGFsc28gbGlrZSB0byB0cmFuc2xhdGUgb2JzZXJ2ZWQtcmVzZXRzIHRvXG4gICAgLy8gZW5hYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlU3Ryb25nXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb25zOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVzY3JpcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRpc2FibGVXaW5zRmxhZyA9IERpc2FibGVXaW5zRmxhZztcbmNsYXNzIEdNYXBJbnRlcm5hbCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSB2YWx1ZUNyZHRJbnRlcm5hbCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHNob3VsZEdjIEdpdmVuIGEgdmFsdWUgc3RhdGUsIHJldHVybiB3aGV0aGVyIGl0IGlzIHNhZmVcbiAgICAgKiB0byBnYXJiYWdlIGNvbGxlY3QgaXQsIHJlbW92aW5nIGl0cyBrZXktdmFsdWUgcGFpciBmcm9tIHRoZVxuICAgICAqIG1hcC4gIEZvciBjb3JyZWN0bmVzcywgaWYgc2hvdWxkR2ModmFsdWVTdGF0ZSkgaXMgdHJ1ZSwgdGhlblxuICAgICAqIHZhbHVlU3RhdGUgbXVzdCBiZSBpZGVudGljYWwgdG8gdmFsdWVDcmR0SW50ZXJuYWwuY3JlYXRlKHZhbHVlSW5pdGlhbERhdGEpO1xuICAgICAqIGFuZCBpZiBzaG91bGRHYyBpcyBub250cml2aWFsLCB0aGVuIHVzZXJzIHNob3VsZCBrZWVwIGluXG4gICAgICogbWluZCB0aGF0IHN0YXRlLmhhcyhrZXkpIGlzIG5vdCByZWxpYWJsZSwgc2luY2UgaXQgbWF5IGJlXG4gICAgICogZmFsc2UgZXZlbiBhZnRlciBrZXkgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgYmVjYXVzZSB0aGUgdmFsdWVcbiAgICAgKiBoYXMgYmVlbiBnYXJiYWdlIGNvbGxlY3RlZC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzaG91bGRHYyA9ICgoKSA9PiBmYWxzZSkpIHtcbiAgICAgICAgdGhpcy5zaG91bGRHYyA9IHNob3VsZEdjO1xuICAgIH1cbiAgICBjcmVhdGUoX2luaXRpYWxEYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnM6XG4gICAgICogLSBbXCJhcHBseVwiLCBrZXksIEMgbWVzc2FnZV06IGFwcGxpZXMgdGhlIEMgbWVzc2FnZSB0b1xuICAgICAqIHRoZSBnaXZlbiBrZXksIGluaXRpYWxpemluZyB0aGUga2V5IGlmIG5lZWRlZC5cbiAgICAgKiAtIFtcImFwcGx5U2tpcFwiLCBrZXksIEMgbWVzc2FnZV06IGFwcGxpZXMgdGhlIEMgbWVzc2FnZSB0b1xuICAgICAqIHRoZSBnaXZlbiBrZXksIGV4Y2VwdCBmb3IgdGhlaXIgc2VuZGVyLCB3aG8gaXMgYXNzdW1lZFxuICAgICAqIHRvIGhhdmUgYWxyZWFkeSBhcHBsaWVkIHRoZSBtZXNzYWdlLiAgVGhpcyBpcyB1c2VkIGJ5XG4gICAgICogQ3JkdFZhbHVlZEdyb3dPbmx5TWFwSW50ZXJuYWwsIHdob3NlIG1lc3NhZ2VzIGFyZVxuICAgICAqIHNvbWV0aW1lcyBkZXJpdmVkIGZyb20gdmFsdWVzIGFwcGx5aW5nIG1lc3NhZ2VzIHRvXG4gICAgICogdGhlbXNlbHZlcy4gIFRPRE86IGluIHByaW5jaXBsZSBjYW4gb3B0aW1pemUgc28gd2VcbiAgICAgKiBkb24ndCBoYXZlIHRvIHNlbmQgXCJza2lwXCIgb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiAtIFtcImluaXRcIiwga2V5XTogaW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGtleSB1c2luZyBpbml0RmFjdG9yeVxuICAgICAqIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQgaW4gdGhlIG1hcC5cbiAgICAgKiAtIFtcInJlc2V0XCJdOiByZXNldHMgZXZlcnkgdmFsdWUgaW4gdGhlIG1hcCAodXNpbmdcbiAgICAgKiBlYWNoIHZhbHVlJ3MgZ2V0VW5pdmVyc2FsUmVzZXRPcGVyYXRpb24oKSkuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGxldCBrZXkgPSBvcGVyYXRpb25bMV07XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlcIiwga2V5LCBvcGVyYXRpb25bMl1dO1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5U2tpcFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJhcHBseVNraXBcIiwga2V5LCBvcGVyYXRpb25bMl1dO1xuICAgICAgICAgICAgY2FzZSBcImluaXRcIjpcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiaW5pdFwiLCBrZXldO1xuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6IHJldHVybiBbXCJyZXNldFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbiBhZGRpdGlvbiB0byB0aGUgbWVzc2FnZSBvdXRwdXQgYnkgcHJlcGFyZSwgd2UgaGF2ZVxuICAgICAqIG1lc3NhZ2VzIChhcmlzaW5nIHRocm91Z2ggc2VtZGlyZWN0IHByb2R1Y3QpOlxuICAgICAqIC0gW1wiaW5pdFJlc2V0XCIsIGtleV06IGRvZXMgW1wiaW5pdFwiLCBrZXldIGZvbGxvd2VkIGJ5XG4gICAgICogZGVsaXZlcmluZyBhIHJlc2V0IG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKiAtIFtcImluaXRSZXNldFN0cm9uZ1wiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZFxuICAgICAqIGJ5IGRlbGl2ZXJpbmcgYSByZXNldC1zdHJvbmcgbWVzc2FnZSB0byB0aGUga2V5LlxuICAgICAqXG4gICAgICogRGVzY3JpcHRpb24gZm9ybWF0OlxuICAgICAqIC0gZm9yIGFuIGFwcGx5L2FwcGx5U2tpcCBvcGVyYXRpb246XG4gICAgICogbnVsbCAoVE9ETylcbiAgICAgKiAtIGZvciBhbiBpbml0IG9wZXJhdGlvbjogbnVsbCBpZiB0aGUga2V5IGFscmVhZHkgZXhpc3RlZCxcbiAgICAgKiBvdGhlcndpc2UgW1wiaW5pdFwiLCBrZXldXG4gICAgICogLSBmb3IgYSByZXNldCBvcGVyYXRpb246IFtcInJlc2V0XCJdIChUT0RPOiBkZXNjcmlwdGlvbnMgZnJvbVxuICAgICAqIHJlc2V0IGtleXMpXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQga2V5ID0gbWVzc2FnZVsxXTtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlTa2lwXCI6XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgYXBwbHlpbmcgaXQgdG8gdGhlIHN0YXRlLlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4gc3RpbGwgZ2MsIHRob3VnaCwgaW4gY2FzZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxyZWFkeS1hcHBsaWVkIG1lc3NhZ2UgaGFzIG1hZGUgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2MtYWJsZS5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlTdGF0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGZhbGwgdGhyb3VnaC5cbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOiB7XG4gICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVN0YXRlLnJlY2VpdmUobWVzc2FnZVsyXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcImluaXRcIjpcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdFN0YXRlID0gdGhpcy5pbml0RmFjdG9yeShrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvdWxkR2MoaW5pdFN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2V0KGtleSwgaW5pdFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbXCJpbml0XCIsIGtleV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHN0YXRlLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzZXRNZXNzYWdlID0gZW50cnlbMV0uZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNldE1lc3NhZ2UgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeVsxXS5yZWNlaXZlKFtyZXNldE1lc3NhZ2VdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShlbnRyeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wicmVzZXRcIl1dO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkdNYXBJbnRlcm5hbCA9IEdNYXBJbnRlcm5hbDtcbi8qKlxuICogQ29udmVuaWVudCByZXByZXNlbnRhdGlvbiBvZiBhIENyZHQtdmFsdWVkIGdyb3ctb25seSBtYXAuXG4gKlxuICogVE9ETzogU29tZXdoZXJlOiBub3RlIHRoYXQgaW5pdGlhbCB2YWx1ZXMgb2YgcHJvcGVydGllcyBtdXN0IGJlXG4gKiBhIGZ1bmN0aW9uIG9mIHRoZWlyIGtleSBvbmx5IChzbyBjYW4ndCBoYXZlIHZhcnlpbmcgdHlwZXMgb3JcbiAqIGluaXRpYWwgZGF0YSkuXG4gKlxuICogTiBpcyB0aGUgdHlwZSBvZiBtZW1iZXIgbmFtZXMgKHR5cGljYWxseSBzdHJpbmcpLlxuICovXG5jbGFzcyBDcmR0T2JqZWN0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogVE9ETzogcHJlZGVmaW5lZCB2cyBkeW5hbWljIHByb3BlcnR5IGNyZWF0aW9uLiAgUHJlZGVmaW5lZCBvbmVzXG4gICAgICogaGF2ZSB0byBiZSBjcmVhdGVkIGlkZW50aWNhbGx5IG9uIGFsbCByZXBsaWNhcyBpblxuICAgICAqIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIGFuZFxuICAgICAqIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCksIGlkZWFsbHkgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGV5XG4gICAgICogYXJlIG5vdCBzeW5jZWQgKGZvciBlZmZpY2llbmN5IGFuZCB0byBzYXZlIHRoZSB0cm91YmxlXG4gICAgICogb2Ygc3BlY2lmeWluZyBwcm9wZXJ0eUZhY3RvcnkpLiAgRHluYW1pYyBwcm9wZXJ0aWVzXG4gICAgICogY2FuIG9ubHkgYmUgY3JlYXRlZCB0aHJvdWdoIGluaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlGYWN0b3J5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgcHJvcGVydHlGYWN0b3J5ID0gQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5KSB7XG4gICAgICAgIC8vIFRPRE86IGdjIGFiaWxpdHlcbiAgICAgICAgbGV0IGNyZHRJbnRlcm5hbCA9IG5ldyBHTWFwSW50ZXJuYWwoKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRJbnRlcm5hbCwgcnVudGltZSk7XG4gICAgICAgIGNyZHRJbnRlcm5hbC5pbml0RmFjdG9yeSA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBwcm9wZXJ0eUZhY3Rvcnkoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICByZWdpc3RlcihjcmR0LCBuYW1lKSB7XG4gICAgICAgIGlmICghKHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiB8fCB0aGlzLmluSW5pdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BlcnRpZXMgY2FuIG9ubHkgYmUgZGlyZWN0bHkgXCIgK1xuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJlZCBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBcIiArXG4gICAgICAgICAgICAgICAgXCJhbmQgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKS4gIER5bmFtaWMgcHJvcGVydGllcyBcIiArXG4gICAgICAgICAgICAgICAgXCJtdXN0IGJlIGNyZWF0ZWQgd2l0aCBpbml0KG5hbWUpLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KG5hbWUsIGNyZHQpO1xuICAgICAgICAvLyBTa2lwIHNlbmRpbmcgYW4gaW5pdCBtZXNzYWdlIGFib3V0IGl0LiAgT2theSBiZWNhdXNlIG9mIHRoZVxuICAgICAgICAvLyBwcmVkZWZpbmVkIGluaXRpYWxpemF0aW9uIGNvbnRyYWN0LlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICBUaGUgaW5pdGlhbGl6ZWQgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0UHJvcGVydHkobmFtZSkge1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseU9wKFtcImluaXRcIiwgbmFtZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AodGhpcy5nZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cbiAgICBnZXRQcm9wZXJ0eShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICB9XG4gICAgcHJvcGVydHlOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUua2V5cygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWVzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5RW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgICAgLy8gQ29udmVydCBpbnRvIGFuIGFwcGx5U2tpcCBtZXNzYWdlIGZvciB0aGUgbWFwIHZhbHVlXG4gICAgICAgIC8vIGF0IG5hbWUuICBIZXJlIHdlIHdhbnQgdG8gc2tpcCBiZWNhdXNlXG4gICAgICAgIC8vIG91ciByZXBsaWNhJ3MgdmFsdWUgaGFzIGFscmVhZHkgYXBwbGllZCB0aGVcbiAgICAgICAgLy8gb3BlcmF0aW9uIGludGVybmFsbHkuXG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJhcHBseVNraXBcIiwgbmFtZSwgbWVzc2FnZV0pO1xuICAgIH1cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCk7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoX2NyZHRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCk7XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0T2JqZWN0ID0gQ3JkdE9iamVjdDtcbkNyZHRPYmplY3QuZGVmYXVsdFByb3BlcnR5RmFjdG9yeSA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJEeW5hbWljYWxseSBjcmVhdGVkIHByb3BlcnRpZXMgYXJlIG9ubHkgXCIgK1xuICAgICAgICBcImFsbG93ZWQgaWYgcHJvcGVydHlGYWN0b3J5IGlzIHBhc3NlZCB0byB0aGUgXCIgK1xuICAgICAgICBcIkNyZHRPYmplY3QgY29uc3RydWN0b3JcIik7XG59O1xuY2xhc3MgQWRkV2luc1NldCBleHRlbmRzIENyZHRPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBnYyBvbmNlIHdlIGhhdmUgdHJhbnNhY3Rpb25zXG4gICAgICAgIHN1cGVyKGlkLCBydW50aW1lLCAobmFtZSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgRW5hYmxlV2luc0ZsYWcobmFtZSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgfVxuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5pbml0UHJvcGVydHkodmFsdWUpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIGRlbGV0ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmdldFByb3BlcnR5KHZhbHVlKS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKHZhbHVlKSB7XG4gICAgICAgIGxldCB2YWx1ZUZsYWcgPSB0aGlzLmdldFByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlRmxhZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVGbGFnLmVuYWJsZWQ7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5wcm9wZXJ0eUVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5WzFdLmVuYWJsZWQpXG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChlbnRyeVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgdmFsdWVzKCkge1xuICAgICAgICAvLyBUT0RPOiBvbmNlIGl0J3MgZ2MnZCB3ZSBjYW4ganVzdCB1c2UgdGhpcy5zdGF0ZS5rZXlzKClcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUudmFsdWVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BZGRXaW5zU2V0ID0gQWRkV2luc1NldDtcbmNsYXNzIE1hcENyZHQgZXh0ZW5kcyBDcmR0T2JqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgdmFsdWVGYWN0b3J5KSB7XG4gICAgICAgIHN1cGVyKGlkLCBydW50aW1lKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZsYWcgaW5kaWNhdGluZyB0aGF0IHdlIGFyZSBpbiB0aGUgYm9keSBvZiBhIGRlbGV0ZS9cbiAgICAgICAgICogZGVsZXRlU3Ryb25nIGNhbGwsIGhlbmNlIHdlIHNob3VsZCBub3QgYWRkIHRoaW5nc1xuICAgICAgICAgKiB0byBrZXlTZXQgKGFzIGFuIG9wdGltaXphdGlvbikuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmtleVNldCA9IG5ldyBBZGRXaW5zU2V0KFwia2V5U2V0XCIsIHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlTWFwID0gbmV3IENyZHRPYmplY3QoXCJ2YWx1ZU1hcFwiLCB0aGlzLCB2YWx1ZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIENyZHRPYmplY3Quc2VuZCBzbyB0aGF0IHdlIGNhbiBjYXB0dXJlXG4gICAgICogYSBzZW5kIGJ5IGEgdmFsdWVNYXAgdmFsdWUgYW5kIGZvbGxvdyBpdCB1cCB3aXRoXG4gICAgICogYW4gYWRkIHRvIGtleVNldCwgdGh1cyByZXZpdmluZyB0aGUgdmFsdWUncyBrZXlcbiAgICAgKiBpZiBhcHByb3ByaWF0ZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHNraXAgYWRkaW5nIHRoZSBrZXkgaWYgaXQncyBhIHJlc2V0IG1lc3NhZ2U/XG4gICAgICogTm90IHN1cmUgaWYgdGhpcyBpcyBwb3NzaWJsZSBpbiBnZW5lcmFsLiAgQnV0IHNob3VsZCBhdFxuICAgICAqIGxlYXN0IGJlIHBvc3NpYmxlIGZvciBvdXIgb3duIGRlbGV0ZXMuXG4gICAgICovXG4gICAgc2VuZChtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyLnNlbmQobWVzc2FnZSwgbmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSAmJiBuYW1lID09PSBcInZhbHVlTWFwXCIpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvIHRoaXMgcmVjZWl2ZXIgc2lkZSBpbnN0ZWFkLCBmb3IgbmV0d29yayBlZmZpY2llbmN5P1xuICAgICAgICAgICAgLy8gV291bGQgbmVlZCB0byBwbGFjZSB0aGUgYWRkIGZpcnN0LCBzbyB0aGF0IGl0IGNhblxuICAgICAgICAgICAgLy8gYmUgb3ZlcnJpZGRlbiBieSBhbnkgaW5jbHVkZWQgZGVsZXRlcy5cbiAgICAgICAgICAgIC8vIFdvdWxkIGFsc28gbmVlZCB0byBhY2NvdW50IGZvciBwb3NzaWJpbGl0eSBvZlxuICAgICAgICAgICAgLy8gdHJhbnNhY3Rpb25zLlxuICAgICAgICAgICAgLy8gQWxzbywgbmVlZCB0byBtYWtlIHN1cmUgd2UgKHNlbmRlcikgZG8gaXQgdG9vLlxuICAgICAgICAgICAgZm9yIChsZXQgc3VibWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Ym1lc3NhZ2VbMF0gPT09IFwiYXBwbHlTa2lwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IHN1Ym1lc3NhZ2VbMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5U2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KGtleSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlKVxuICAgICAgICAgICAgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnZhbHVlTWFwLmluaXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVNYXAuZ2V0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0KGtleSkucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyhrZXkpIHtcbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdChrZXkpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZVN0cm9uZyhrZXkpO1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC52YWx1ZXMoKTtcbiAgICB9XG59XG5leHBvcnRzLk1hcENyZHQgPSBNYXBDcmR0O1xuLy8gVE9ETzogbWFrZSBjb3JyZXNwb25kaW5nIENyZHQgZm9yIHVzZSBpbiBDcmR0T2JqZWN0J3MsXG4vLyBzbyB1c2VycyBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHRyYW5zbGF0aW5nIG9wc1xuLy8gYW5kIHRvIHN1cHBvcnQgYnVsay9SUEMvaG9tYXAgb3BzLlxuY2xhc3MgQXJyYXlDcmR0SW50ZXJuYWwge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRDcmR0KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudENyZHQgPSBlbGVtZW50Q3JkdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBBbiBhcnJheSBvZiBpbml0aWFsRGF0YSB0b1xuICAgICAqIHBhc3MgdG8gZWFjaCBlbnRyeSdzIGNyZWF0ZSBtZXRob2QuICBUaGUgZW50cmllc1xuICAgICAqIG1heSBiZSB1bmRlZmluZWQsIGluIHdoaWNoIGNhc2UgdW5kZWZpbmVkIHdpbGxcbiAgICAgKiBiZSBwYXNzZWQgdG8gdGhlIGVudHJ5J3MgY3JlYXRlIG1ldGhvZC4gIEluIGFueVxuICAgICAqIGNhc2UsIGluaXRpYWxEYXRhLmxlbmd0aCBpcyB1c2VkIHRvIHNldCB0aGVcbiAgICAgKiBsZW5ndGguXG4gICAgICogQHJldHVybiAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbml0aWFsRGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBhbiBhcnJheTogXCIgKyBpbml0aWFsRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXRlID0gW107XG4gICAgICAgIHN0YXRlLmxlbmd0aCA9IGluaXRpYWxEYXRhLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3RhdGVbaV0gPSB0aGlzLmVsZW1lbnRDcmR0LmNyZWF0ZShpbml0aWFsRGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBbaW5kZXgsIG9wXVxuICAgICAqIEByZXR1cm4gbWVzc2FnZSBvZiB0aGUgZm9ybSBbaW5kZXgsIG1lc3NhZ2VdXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKCEob3BlcmF0aW9uWzBdID49IDAgJiYgb3BlcmF0aW9uWzBdIDwgc3RhdGUubGVuZ3RoICYmIE51bWJlci5pc0ludGVnZXIob3BlcmF0aW9uWzBdKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluZGV4IG91dCBvZiBib3VuZHM6IFwiICsgb3BlcmF0aW9uWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW29wZXJhdGlvblswXSwgdGhpcy5lbGVtZW50Q3JkdC5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGVbMV0sIHJlcGxpY2FJZCldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvbiBmb3JtYXQ6IFtpbmRleCwgcmV0dXJuZWQgZGVzY3JpcHRpb25dXG4gICAgICogKHNhbWUgYXMgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtpbmRleCwgbWVzc2FnZV1cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBkZXNjO1xuICAgICAgICBbc3RhdGVbbWVzc2FnZVswXV0sIGRlc2NdID0gdGhpcy5lbGVtZW50Q3JkdC5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGVbbWVzc2FnZVswXV0sIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW21lc3NhZ2VbMF0sIGRlc2NdXTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5Q3JkdEludGVybmFsID0gQXJyYXlDcmR0SW50ZXJuYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGFuZGFyZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3JkdE5ldHdvcmtSdW50aW1lID0gZXhwb3J0cy5teU1lc3NhZ2UgPSB2b2lkIDA7XG5jb25zdCB2ZWN0b3JfY2xvY2tfMSA9IHJlcXVpcmUoXCIuL3ZlY3Rvcl9jbG9ja1wiKTtcbi8vIGltcG9ydCBXZWJTb2NrZXQgPSByZXF1aXJlKFwid3NcIik7XG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5jbGFzcyBteU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNyZHRJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY3JkdElkID0gY3JkdElkO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgcGFja2FnZSBpbmZvIGluIEpTT04gZm9ybWF0LlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgXCJtZXNzYWdlXCI6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIFwiY3JkdElkXCI6IHRoaXMuY3JkdElkLFxuICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIjoge1xuICAgICAgICAgICAgICAgIFwidWlkXCI6IHRoaXMudGltZXN0YW1wLnVpZCxcbiAgICAgICAgICAgICAgICBcInZlY3Rvck1hcFwiOiBBcnJheS5mcm9tKHRoaXMudGltZXN0YW1wLnZlY3Rvck1hcC5lbnRyaWVzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubXlNZXNzYWdlID0gbXlNZXNzYWdlO1xuLyoqXG4gKiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrOlxuICpcbiAqIFByb2Nlc3MgaW5pdGlhbGl6YXRpb24gd2hlbiBzdGFydGluZyBhIG5ldyB1c2VyIG5vZGUuXG4gKlxuICogQ29tbXVuaWNhdGUgd2l0aCBDUkRUJ3MgcnVudGltZSBhbmQgc2VuZC9yZWNlaXZlIG1lc3NhZ2UgdmlhXG4gKiBjZW50cmFsIGJyb2FkY2FzdCBzZXJ2ZXIgd2l0aCBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gKlxuICogUGVyZm9ybSBjYXN1YWxpdHkgY2hlY2sgdG8gZW5zdXJlIG1lc3NhZ2Ugb3JkZXJpbmcuXG4gKi9cbmNsYXNzIENyZHROZXR3b3JrUnVudGltZSB7XG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCB3ZWJTb2NrZXRBcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAgICAgKiBJZiB0aGVyZSBleGlzdCwgdGhlbiBzZW5kIGl0IHZpYSBXZWJTb2NrZXQgYW5kIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGJ1ZmZlci5cbiAgICAgICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIC8vIFVzZSBoZWFydGJlYXQgdG8ga2VlcCBjbGllbnQgYWxpdmUuXG4gICAgICAgICAgICAvLyB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlIGhlYXJ0YmVhdCBmdW5jdGlvbiB0byBrZWVwIGNsaWVudHMgYWxpdmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRPRE86XG4gICAgICAgICAqIFRoZSBtZXNzYWdlIHNlbmRpbmcgdG8gc2VydmVyIGlzICdoZWFydGJlYXQnIHJpZ2h0IG5vdy5cbiAgICAgICAgICogVGhlIHRpbWVvdXQgaW50ZXJ2YWwgaXMgc2V0IHRvIDUwMDAgbWlsbGlvbnNlY29uZHMuXG4gICAgICAgICAqL1xuICAgICAgICAvLyBoZWFydGJlYXQoKSA6IHZvaWQge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy53cy5zZW5kKCdoZWFydGJlYXQnKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICAvLyAgICAgfSwgNTAwMCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayBpbnRvIG15TWVzc2FnZSB0eXBlLlxuICAgICAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYWxsIHRoZSBtZXNzYWdlcyBhbmQgZGVsaXZlciB0byBhcHBsaWNhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihkYXRhLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuY3JkdElkLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWVzc2FnZUJ1ZmZlcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVpZCA9IHJlcGxpY2FJZDtcbiAgICAgICAgdGhpcy52Y01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyc0J5SWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8vIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcigncGluZycsIGZ1bmN0aW9uKHBpbmdNZXNzYWdlKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlIGEgcGluZyA6ICcgKyBwaW5nTWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHRJZCBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3JkdElkKGNyZHRJZCkge1xuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdCB3aXRoIGl0cyBJRCBhbmQgY29ycmVzcG9uZGluZyBtZXNzYWdlXG4gICAgICogbGlzdGVuZXIgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0TWVzc2FnZUxpc3RlbmVyIHRoZSBtZXNzYWdlIGxpc3RlbmVyIG9mIGVhY2ggY3JkdC5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBJRCBvZiBlYWNoIGNyZHQuXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0TWVzc2FnZUxpc3RlbmVyLCBjcmR0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSB8fCB0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgY3JkdElkOiBcIiArIGNyZHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLnNldChjcmR0SWQsIGNyZHRNZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGZ1bmN0aW9uIG9uIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrIGxheWVyLCB3aGljaCBjYWxsZWRcbiAgICAgKiBieSBjcmR0J3MgcnVudGltZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRoZSBtZXNzYWdlIGlzIHdyYXBwZWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0aW1lc3RhbXAgKGJhc2ljIHNlbmRlciBub2RlXG4gICAgICogaW5mbyBhbmQgdmVjdG9yIGNsb2NrKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIFdlYlNvY2tldCBhcyBuZXR3b3JrIHRyYW5zbWlzc2lvbiBwcm90b2NvbC5cbiAgICAgKiBVc2luZyBKU09OIGZvcm1hdCBhcyBtZXNzYWdlIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgbm90IE9wZW4sIHRoZW4gYnVmZmVyIHRoZSBtZXNzYWdlIGFuZFxuICAgICAqIHdhaXQgdW50aWwgV2ViU29ja2V0IG9wZW4uXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIE9wZW4sIHRoZW4gc2VuZCBpdCB3aXRoIHdzLnNlbmQoKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHRoZSBjcmR0IHVwZGF0ZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIHVuaXF1ZSBJRCBmb3IgZWFjaCBjcmR0LlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZSwgY3JkdElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNyZHRJZCBleGlzdCBpbiB0aGUgbWFwLlxuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhpcy52Y01hcC5nZXQoY3JkdElkKS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpLmluY3JlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrIGZvciBzZW5kaW5nXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcCgoX2EgPSB0aGlzLnZjTWFwLmdldChjcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgY3JkdElkLCB2Y0NvcHkpO1xuICAgICAgICAvLyBDb252ZXJ0IHRoZSBtZXNzYWdlIGludG8gSlNPTlxuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQobXlQYWNrYWdlLnRvSlNPTigpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKG15UGFja2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuZXh0IHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gY3JkdElkIGluIHRoaXMgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgcGFzc2VkIHRvIENyZHRJbnRlcm5hbC5lZmZlY3Qgd2hlbiBhIHJlcGxpY2EgcHJvY2Vzc2VzIGl0cyBvd25cbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXROZXh0VGltZXN0YW1wKGNyZHRJZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrLlxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAoKF9hID0gdGhpcy52Y01hcC5nZXQoY3JkdElkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFzVmVjdG9yQ2xvY2soKSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuXG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCB2Y0NvcHkudmVjdG9yTWFwLmdldCh0aGlzLnVpZCkgKyAxKTtcbiAgICAgICAgcmV0dXJuIHZjQ29weTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIHRvIGN1c3RvbWl6ZWQgZGF0YSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgdHJhdmVsIHRocm91Z2ggbmV0d29yay5cbiAgICAgKiBAcmV0dXJucyB0aGUgY3VzdG9taXplZCBkYXRhIHR5cGUgPT4gbXlNZXNzYWdlXG4gICAgICovXG4gICAgcGFyc2VKU09OKGRhdGEpIHtcbiAgICAgICAgbGV0IGRhdGFKU09OID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IHZjID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShkYXRhSlNPTi5tZXNzYWdlLCBkYXRhSlNPTi5jcmR0SWQsIHZjKTtcbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmdcbiAgICAgKiBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGNoZWNrTWVzc2FnZUJ1ZmZlcigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJDcmR0SWQgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdO1xuICAgICAgICAgICAgbGV0IGN1clZlY3RvckNsb2NrID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXTtcbiAgICAgICAgICAgIGlmICghdGhpcy52Y01hcC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG15VmVjdG9yQ2xvY2sgPSB0aGlzLnZjTWFwLmdldChjdXJDcmR0SWQpO1xuICAgICAgICAgICAgICAgIGlmIChteVZlY3RvckNsb2NrID09PSBudWxsIHx8IG15VmVjdG9yQ2xvY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG15VmVjdG9yQ2xvY2suaXNyZWFkeShjdXJWZWN0b3JDbG9jaykpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lci5cblxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5saXN0ZW5lcnNCeUlkLmdldChjdXJDcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVjZWl2ZSh0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzBdLCBjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrLmluY3JlbWVudFNlbmRlcihjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNyZHROZXR3b3JrUnVudGltZSA9IENyZHROZXR3b3JrUnVudGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya19ydW50aW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gRmlyc3QgYXR0ZW1wdCBhdCB0aGUgaW50ZXJmYWNlIGJldHdlZW4gdGhlIHJ1bnRpbWVcbi8vIChjYXVzYWwgYnJvYWRjYXN0IG5ldHdvcmssIGV0Yy4pIGFuZCB0aGUgQ1JEVHMuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya19ydW50aW1lXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi92ZWN0b3JfY2xvY2tcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZlY3RvckNsb2NrID0gdm9pZCAwO1xuLy8gVGhlIHZlY3RvciBjbG9jayBkZXNpZ25lZCBmb3IgQ1JEVCBsaWJyYXJ5IGFuZCBjYXN1YWwgYnJvYWRjYXN0aW5nXG4vLyBydW50aW1lIHRvIGVuc3VyZSBjb3JyZWN0IGNhdXNhbGl0eS5cbi8qKlxuICogVGhlIHZlY3RvciBjbG9jayBjbGFzcyBmb3IgZW5zdXJpbmcgY2FzdWFsaXR5LlxuICovXG5jbGFzcyBWZWN0b3JDbG9jayB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgdmVjdG9yIHdpdGggcmVwbGljYSdzIG93biBlbnRyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdW5pcXVlIElEIGZvciB0aGlzIHJlcGxpY2EocmVwbGljYUlkKS5cbiAgICAgKi9cbiAgICBnZXRTZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZlY3RvciBjbG9jayB3aXRoIGFsbCB0aGUgZW50cmllcy5cbiAgICAgKi9cbiAgICBhc1ZlY3RvckNsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpblxuICAgICAqIHRoaXMgdmVjdG9yY2xvY2suXG4gICAgICovXG4gICAgZ2V0U2VuZGVyQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVwbGljYXMgaW52b3ZsZWQgaW4gdGhpcyBjcmR0cy5cbiAgICAgKi9cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2ZWN0b3Igb2YgdGhlIHVpZChyZXBsaWNhSWQpIGVudHJ5LlxuICAgICAqL1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCBvbGRWYWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGEgbWVzc2FnZSB3aXRoIGEgY2VydGFpbiB0aW1lc3RhbXAgaXMgcmVhZHkgZm9yIGRlbGl2ZXJ5XG4gICAgICogdG8gZW5zdXJlIGNvcnJlY3QgY2FzdWFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmhhcyhvdGhlclVpZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICpcbiAgICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBtYWlubHkgZG9uZSBhZnRlciBjb3JyZWN0bHkgZGVsaXZlciB0aGUgbWVzc2FnZVxuICAgICAqIHdoZW4gaXNSZWFkeSgpIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIGluY3JlbWVudFNlbmRlcih2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQob3RoZXJVaWQsIG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSBjdXJyZW50IFZlY3RvckNsb2NrIHdpdGggdGhlIHZlY3RvciBjbG9jayByZWNldmllZCBmcm9tXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIG1lcmdlKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIG90aGVyVmVjdG9yTWFwLmdldChpZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBNYXRoLm1heCh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29tZVVpZCB0aGUgcmVwbGljYSdzIHVpZC5cbiAgICAgKiBAcGFyYW0gY2xvY2tWYWx1ZSB0aGUgY2xvY2sgbnVtYmVyIG9mIHRoZSByZXBsaWNhLlxuICAgICAqL1xuICAgIHNldEVudHJ5KHNvbWVVaWQsIGNsb2NrVmFsdWUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSBWZWN0b3JDbG9jaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlY3Rvcl9jbG9jay5qcy5tYXAiLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiaW1wb3J0IHtDaGVja2Vyc0NyZHR9IGZyb20gXCIuL2NoZWNrZXJzX2NyZHRcIjtcbmltcG9ydCB7IG5ldHdvcmsgfSBmcm9tICdjb21wb3ZlbnR1YWxzLWNsaWVudCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbmxldCBIT1NUID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJylcblxuY29uc3QgY2xpZW50X3V1aWQgOiBzdHJpbmcgPSB1dWlkKCk7XG5cbmNvbnNvbGUubG9nKCdTZXQgSG9zdCAmIFVuaXF1ZSBJZGVudGlmaWVyJylcblxuLyoqXG4gKiBHZW5lcmF0ZSBDUkRUcycgUnVudGltZSBvbiBlYWNoIGNsaWVudCBhbmQgY3JlYXRlIENSRFRzIChlLmcuIENvdW50ZXJDcmR0KS5cbiAqL1xubGV0IGNsaWVudCA9IG5ldyBuZXR3b3JrLkNyZHROZXR3b3JrUnVudGltZShjbGllbnRfdXVpZCwgSE9TVCk7XG5jb25zb2xlLmxvZygnR2VuZXJhdGUgQ1JEVCBSdW50aW1lJylcblxubGV0IGdhbWUgPSBuZXcgQ2hlY2tlcnNDcmR0KFwiY2hlY2tlcnNJRFwiLCBjbGllbnQpO1xuY29uc29sZS5sb2coJ0NyZWF0ZWQgYW5kIFN0YXJ0aW5nIENoZWNrZXJzIEdhbWUnKVxuXG5nYW1lLnN0YXJ0R2FtZSgpO1xuXG4iLCIvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL1J5YW5CcmFuY28vQ2hlY2tlcnMvYmxvYi9tYXN0ZXIvc2NyaXB0LmpzIChpLmUuIHVzZWQgdGhlaXIgZ2FtZSBsb2dpYylcblxuaW1wb3J0IHtjcmR0cywgbmV0d29ya30gZnJvbSBcImNvbXBvdmVudHVhbHMtY2xpZW50XCI7XG5cblxuY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XG5sZXQgcmVkc1BpZWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnJlZC1waWVjZVwiKTtcbmxldCBibGFja3NQaWVjZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi5ibGFjay1waWVjZVwiKVxuY29uc3QgcmVkVHVyblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi5yZWQtdHVybi10ZXh0XCIpO1xuY29uc3QgYmxhY2tUdXJudGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLmJsYWNrLXR1cm4tdGV4dFwiKTtcbmNvbnN0IGRpdmlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNkaXZpZGVyXCIpXG5cblxuY29uc3QgY2JvYXJkID0gW1xuICAgIG51bGwsIDAsIG51bGwsIDEsIG51bGwsIDIsIG51bGwsIDMsXG4gICAgNCwgbnVsbCwgNSwgbnVsbCwgNiwgbnVsbCwgNywgbnVsbCxcbiAgICBudWxsLCA4LCBudWxsLCA5LCBudWxsLCAxMCwgbnVsbCwgMTEsXG4gICAgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCxcbiAgICBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLFxuICAgIDEyLCBudWxsLCAxMywgbnVsbCwgMTQsIG51bGwsIDE1LCBudWxsLFxuICAgIG51bGwsIDE2LCBudWxsLCAxNywgbnVsbCwgMTgsIG51bGwsIDE5LFxuICAgIDIwLCBudWxsLCAyMSwgbnVsbCwgMjIsIG51bGwsIDIzLCBudWxsXG5dXG5cblxuZXhwb3J0IGNsYXNzIENoZWNrZXJzQ3JkdCBleHRlbmRzIGNyZHRzLkNyZHQ8bnVtYmVyW10+IHtcbiAgICAvLyBwbGF5ZXIgcHJvcGVydGllc1xuICAgIGJvYXJkOiBBcnJheTxhbnk+O1xuICAgIHR1cm46IG51bWJlcjtcbiAgICByZWRTY29yZTogbnVtYmVyO1xuICAgIGJsYWNrU2NvcmU6IG51bWJlcjtcbiAgICBwbGF5ZXJQaWVjZXM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+O1xuICAgIHNlbGVjdGVkUGllY2U6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBhbnksIHJ1bnRpbWU6IG5ldHdvcmsuQ3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIG5ldyBjcmR0cy5BcnJheUNyZHRJbnRlcm5hbChuZXcgY3JkdHMuQ2hlY2tlcnNJbnRlcm5hbCgpKSxcbiAgICAgICAgICAgIHJ1bnRpbWUsXG4gICAgICAgICAgICBjYm9hcmRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGNib2FyZFxuICAgICAgICB0aGlzLnR1cm4gPSAwXG4gICAgICAgIHRoaXMucmVkU2NvcmUgPSAxMlxuICAgICAgICB0aGlzLmJsYWNrU2NvcmUgPSAxMlxuICAgICAgICB0aGlzLnBsYXllclBpZWNlcyA9IHJlZHNQaWVjZXM7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZSA9IHtcbiAgICAgICAgICAgIHBpZWNlSWQ6IC0xLFxuICAgICAgICAgICAgaW5kZXhPZkJvYXJkUGllY2U6IC0xLFxuICAgICAgICAgICAgaXNLaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIHNldmVudGhTcGFjZTogZmFsc2UsXG4gICAgICAgICAgICBuaW50aFNwYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIGZvdXJ0ZWVudGhTcGFjZTogZmFsc2UsXG4gICAgICAgICAgICBlaWdodGVlbnRoU3BhY2U6IGZhbHNlLFxuICAgICAgICAgICAgbWludXNTZXZlbnRoU3BhY2U6IGZhbHNlLFxuICAgICAgICAgICAgbWludXNOaW50aFNwYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIG1pbnVzRm91cnRlZW50aFNwYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIG1pbnVzRWlnaHRlZW50aFNwYWNlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPC0tLS0tLS0gRVZFTlQgTElTVEVORVJTIC0tLS0tLS0+XG5cbiAgICAvLyBiZWdpbiB0aGUgZ2FtZSFcbiAgICBwdWJsaWMgc3RhcnRHYW1lKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhjYm9hcmQpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgdGhlIEdhbWUhXCIpO1xuICAgICAgICB0aGlzLmdpdmVQaWVjZXNFdmVudExpc3RlbmVycygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxpc3RlbmVycyBpbiBQbGFjZVwiKVxuICAgIH1cbiAgICBcbiAgICAvLyBpbml0aWFsaXplIGV2ZW50IGxpc3RlbmVycyBvbiBwaWVjZXNcbiAgICBwcml2YXRlIGdpdmVQaWVjZXNFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMudHVybiA9PSAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZHNQaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZWRzUGllY2VzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmdldFBsYXllclBpZWNlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYWNrc1BpZWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGJsYWNrc1BpZWNlc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5nZXRQbGF5ZXJQaWVjZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPC0tLS0tLS0gR0FNRSBMT0dJQyAtLS0tLS0tPlxuXG4gICAgLy8gcGFyc2VzIHBpZWNlSWQncyBhbmQgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhhdCBwaWVjZSdzIHBsYWNlIG9uIHRoZSBib2FyZFxuICAgIHByaXZhdGUgZmluZFBpZWNlKHBpZWNlSWQ6IHN0cmluZykge1xuICAgICAgICBsZXQgcGFyc2VkID0gcGFyc2VJbnQocGllY2VJZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmluZGV4T2YocGFyc2VkKTtcbiAgICB9O1xuXG4gICAgLy8gaG9sZHMgdGhlIGxlbmd0aCBvZiB0aGUgcGxheWVycyBwaWVjZSBjb3VudFxuICAgIHByaXZhdGUgZ2V0UGxheWVyUGllY2VzKCkge1xuICAgICAgICBpZiAodGhpcy50dXJuID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyUGllY2VzID0gcmVkc1BpZWNlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyUGllY2VzID0gYmxhY2tzUGllY2VzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQ2VsbG9uY2xpY2soKTtcbiAgICAgICAgdGhpcy5yZXNldEJvcmRlcnMoKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmVzIHBvc3NpYmxlIG1vdmVzIGZyb20gb2xkIHNlbGVjdGVkIHBpZWNlICgqIHRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIHVzZXIgbWlnaHQgcmUtc2VsZWN0IGEgcGllY2UgKilcbiAgICBwcml2YXRlIHJlbW92ZUNlbGxvbmNsaWNrKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjZWxsc1tpXS5yZW1vdmVBdHRyaWJ1dGUoXCJvbmNsaWNrXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzZXRzIGJvcmRlcnMgdG8gZGVmYXVsdFxuICAgIHByaXZhdGUgcmVzZXRCb3JkZXJzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGxheWVyUGllY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllclBpZWNlc1tpXS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB3aGl0ZVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3RlZFBpZWNlUHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLmdldFNlbGVjdGVkUGllY2UoKTtcbiAgICB9XG5cbiAgICAvLyByZXNldHMgc2VsZWN0ZWQgcGllY2UgcHJvcGVydGllc1xuICAgIHByaXZhdGUgcmVzZXRTZWxlY3RlZFBpZWNlUHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLnBpZWNlSWQgPSAtMTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLnBpZWNlSWQgPSAtMTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLmlzS2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2Uuc2V2ZW50aFNwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5uaW50aFNwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5mb3VydGVlbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLmVpZ2h0ZWVudGhTcGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNTZXZlbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzTmludGhTcGFjZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNGb3VydGVlbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzRWlnaHRlZW50aFNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZ2V0cyBJRCBhbmQgaW5kZXggb2YgdGhlIGJvYXJkIGNlbGwgaXRzIG9uXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZFBpZWNlKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQhLmN1cnJlbnRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudFxuICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UucGllY2VJZCA9IHBhcnNlSW50KGVsZW1lbnQhLmlkKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlID0gdGhpcy5maW5kUGllY2UodGhpcy5zZWxlY3RlZFBpZWNlLnBpZWNlSWQpO1xuICAgICAgICB0aGlzLmlzUGllY2VLaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2tzIGlmIHNlbGVjdGVkIHBpZWNlIGlzIGEga2luZ1xuICAgIHByaXZhdGUgaXNQaWVjZUtpbmcoKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzIS5zZWxlY3RlZFBpZWNlIS5waWVjZUlkKSEuY2xhc3NMaXN0LmNvbnRhaW5zKFwia2luZ1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLmlzS2luZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UuaXNLaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRBdmFpbGFibGVTcGFjZXMoKTtcbiAgICB9XG5cbiAgICAvLyBnZXRzIHRoZSBtb3ZlcyB0aGF0IHRoZSBzZWxlY3RlZCBwaWVjZSBjYW4gbWFrZVxuICAgIHByaXZhdGUgZ2V0QXZhaWxhYmxlU3BhY2VzKCkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgKyA3XSA9PT0gbnVsbCAmJiBcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDddLmNsYXNzTGlzdC5jb250YWlucyhcIm5vUGllY2VIZXJlXCIpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2Uuc2V2ZW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgKyA5XSA9PT0gbnVsbCAmJiBcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDldLmNsYXNzTGlzdC5jb250YWlucyhcIm5vUGllY2VIZXJlXCIpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubmludGhTcGFjZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gN10gPT09IG51bGwgJiYgXG4gICAgICAgICAgICBjZWxsc1t0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgLSA3XS5jbGFzc0xpc3QuY29udGFpbnMoXCJub1BpZWNlSGVyZVwiKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzU2V2ZW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgLSA5XSA9PT0gbnVsbCAmJiBcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDldLmNsYXNzTGlzdC5jb250YWlucyhcIm5vUGllY2VIZXJlXCIpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNOaW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrQXZhaWxhYmxlSnVtcFNwYWNlcygpO1xuICAgIH1cblxuICBcbiAgICAvLyBnZXRzIHRoZSBtb3ZlcyB0aGF0IHRoZSBzZWxlY3RlZCBwaWVjZSBjYW4ganVtcFxuICAgIHByaXZhdGUgY2hlY2tBdmFpbGFibGVKdW1wU3BhY2VzKCkge1xuICAgICAgICBpZiAodGhpcy50dXJuID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE0XSA9PT0gbnVsbCBcbiAgICAgICAgICAgICYmIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE0XS5jbGFzc0xpc3QuY29udGFpbnMoXCJub1BpZWNlSGVyZVwiKSAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgdGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgKyA3XSA+PSAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5mb3VydGVlbnRoU3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlICsgMThdID09PSBudWxsIFxuICAgICAgICAgICAgJiYgY2VsbHNbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlICsgMThdLmNsYXNzTGlzdC5jb250YWlucyhcIm5vUGllY2VIZXJlXCIpICE9PSB0cnVlXG4gICAgICAgICAgICAmJiB0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDldID49IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLmVpZ2h0ZWVudGhTcGFjZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgLSAxNF0gPT09IG51bGwgXG4gICAgICAgICAgICAmJiBjZWxsc1t0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgLSAxNF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9QaWVjZUhlcmVcIikgIT09IHRydWVcbiAgICAgICAgICAgICYmIHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gN10gPj0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNGb3VydGVlbnRoU3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gMThdID09PSBudWxsIFxuICAgICAgICAgICAgJiYgY2VsbHNbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gMThdLmNsYXNzTGlzdC5jb250YWlucyhcIm5vUGllY2VIZXJlXCIpICE9PSB0cnVlXG4gICAgICAgICAgICAmJiB0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDldID49IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzRWlnaHRlZW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE0XSA9PT0gbnVsbCBcbiAgICAgICAgICAgICYmIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE0XS5jbGFzc0xpc3QuY29udGFpbnMoXCJub1BpZWNlSGVyZVwiKSAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgdGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgKyA3XSA8IDEyICYmIHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlICsgN10gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UuZm91cnRlZW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE4XSA9PT0gbnVsbCBcbiAgICAgICAgICAgICYmIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE4XS5jbGFzc0xpc3QuY29udGFpbnMoXCJub1BpZWNlSGVyZVwiKSAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgdGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgKyA5XSA8IDEyICYmIHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlICsgOV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UuZWlnaHRlZW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDE0XSA9PT0gbnVsbCAmJiBjZWxsc1t0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgLSAxNF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9QaWVjZUhlcmVcIikgIT09IHRydWVcbiAgICAgICAgICAgICYmIHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gN10gPCAxMiBcbiAgICAgICAgICAgICYmIHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gN10gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNGb3VydGVlbnRoU3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gMThdID09PSBudWxsICYmIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDE4XS5jbGFzc0xpc3QuY29udGFpbnMoXCJub1BpZWNlSGVyZVwiKSAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgdGhpcy5ib2FyZFt0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgLSA5XSA8IDEyXG4gICAgICAgICAgICAmJiB0aGlzLmJvYXJkW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzRWlnaHRlZW50aFNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrUGllY2VDb25kaXRpb25zKCk7XG4gICAgfVxuXG4gICAgLy8gcmVzdHJpY3RzIG1vdmVtZW50IGlmIHRoZSBwaWVjZSBpcyBhIGtpbmdcbiAgICBwcml2YXRlIGNoZWNrUGllY2VDb25kaXRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBpZWNlLmlzS2luZykge1xuICAgICAgICAgICAgdGhpcy5naXZlUGllY2VCb3JkZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR1cm4gPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5taW51c1NldmVudGhTcGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5taW51c05pbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNGb3VydGVlbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUGllY2UubWludXNFaWdodGVlbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLnNldmVudGhTcGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5uaW50aFNwYWNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFBpZWNlLmZvdXJ0ZWVudGhTcGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWVjZS5laWdodGVlbnRoU3BhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2l2ZVBpZWNlQm9yZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnaXZlcyB0aGUgcGllY2UgYSBncmVlbiBoaWdobGlnaHQgZm9yIHRoZSB1c2VyIChzaG93aW5nIGl0cyBtb3ZhYmxlKVxuICAgIHByaXZhdGUgZ2l2ZVBpZWNlQm9yZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBpZWNlLnNldmVudGhTcGFjZSB8fCB0aGlzLnNlbGVjdGVkUGllY2UubmludGhTcGFjZSB8fCB0aGlzLnNlbGVjdGVkUGllY2UuZm91cnRlZW50aFNwYWNlIHx8IHRoaXMuc2VsZWN0ZWRQaWVjZS5laWdodGVlbnRoU3BhY2VcbiAgICAgICAgfHwgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzU2V2ZW50aFNwYWNlIHx8IHRoaXMuc2VsZWN0ZWRQaWVjZS5taW51c05pbnRoU3BhY2UgfHwgdGhpcy5zZWxlY3RlZFBpZWNlLm1pbnVzRm91cnRlZW50aFNwYWNlIHx8IHRoaXMuc2VsZWN0ZWRQaWVjZS5taW51c0VpZ2h0ZWVudGhTcGFjZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcyEuc2VsZWN0ZWRQaWVjZSEucGllY2VJZCkhLnN0eWxlLmJvcmRlciA9IFwiM3B4IHNvbGlkIGdyZWVuXCI7XG4gICAgICAgICAgICB0aGlzLmdpdmVDZWxsc0NsaWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnaXZlcyB0aGUgY2VsbHMgb24gdGhlIGJvYXJkIGEgJ2NsaWNrJyBiYXNzZWQgb24gdGhlIHBvc3NpYmxlIG1vdmVzXG4gICAgcHJpdmF0ZSBnaXZlQ2VsbHNDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQaWVjZS5zZXZlbnRoU3BhY2UpIHtcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDddLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtYWtlTW92ZSg3KVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBpZWNlLm5pbnRoU3BhY2UpIHtcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDldLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtYWtlTW92ZSg5KVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBpZWNlLmZvdXJ0ZWVudGhTcGFjZSkge1xuICAgICAgICAgICAgY2VsbHNbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlICsgMTRdLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtYWtlTW92ZSgxNClcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQaWVjZS5laWdodGVlbnRoU3BhY2UpIHtcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIDE4XS5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIFwibWFrZU1vdmUoMTgpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUGllY2UubWludXNTZXZlbnRoU3BhY2UpIHtcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDddLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtYWtlTW92ZSgtNylcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQaWVjZS5taW51c05pbnRoU3BhY2UpIHtcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDldLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtYWtlTW92ZSgtOSlcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQaWVjZS5taW51c0ZvdXJ0ZWVudGhTcGFjZSkge1xuICAgICAgICAgICAgY2VsbHNbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlIC0gMTRdLnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtYWtlTW92ZSgtMTQpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUGllY2UubWludXNFaWdodGVlbnRoU3BhY2UpIHtcbiAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSAtIDE4XS5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIFwibWFrZU1vdmUoLTE4KVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgXG5cbiAgICAvLyBtYWtlcyB0aGUgbW92ZSB0aGF0IHdhcyBjbGlja2VkXG4gICAgcHJpdmF0ZSBtYWtlTW92ZShudW1iZXI6IG51bWJlcikge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzIS5zZWxlY3RlZFBpZWNlIS5waWVjZUlkKSEucmVtb3ZlKCk7XG4gICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZV0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMudHVybiA9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBpZWNlLmlzS2luZykge1xuICAgICAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIG51bWJlcl0uaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwicmVkLXBpZWNlIGtpbmdcIiBpZD1cIiR7dGhpcy5zZWxlY3RlZFBpZWNlLnBpZWNlSWR9XCI+PC9wPmA7XG4gICAgICAgICAgICAgICAgcmVkc1BpZWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJwXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjZWxsc1t0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2UgKyBudW1iZXJdLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cInJlZC1waWVjZVwiIGlkPVwiJHt0aGlzLnNlbGVjdGVkUGllY2UucGllY2VJZH1cIj48L3A+YDtcbiAgICAgICAgICAgICAgICByZWRzUGllY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFBpZWNlLmlzS2luZykge1xuICAgICAgICAgICAgICAgIGNlbGxzW3RoaXMuc2VsZWN0ZWRQaWVjZS5pbmRleE9mQm9hcmRQaWVjZSArIG51bWJlcl0uaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiYmxhY2stcGllY2Uga2luZ1wiIGlkPVwiJHt0aGlzLnNlbGVjdGVkUGllY2UucGllY2VJZH1cIj48L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBibGFja3NQaWVjZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2VsbHNbdGhpcy5zZWxlY3RlZFBpZWNlLmluZGV4T2ZCb2FyZFBpZWNlICsgbnVtYmVyXS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJibGFjay1waWVjZVwiIGlkPVwiJHt0aGlzLnNlbGVjdGVkUGllY2UucGllY2VJZH1cIj48L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBibGFja3NQaWVjZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3BhblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleE9mUGllY2UgPSB0aGlzLnNlbGVjdGVkUGllY2UuaW5kZXhPZkJvYXJkUGllY2VcbiAgICAgICAgaWYgKG51bWJlciA9PT0gMTQgfHwgbnVtYmVyID09PSAtMTQgfHwgbnVtYmVyID09PSAxOCB8fCBudW1iZXIgPT09IC0xOCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRhKGluZGV4T2ZQaWVjZSwgaW5kZXhPZlBpZWNlICsgbnVtYmVyLCBpbmRleE9mUGllY2UgKyBudW1iZXIgLyAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0YShpbmRleE9mUGllY2UsIGluZGV4T2ZQaWVjZSArIG51bWJlciwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIENoYW5nZXMgdGhlIGJvYXJkIHN0YXRlcyBkYXRhIG9uIHRoZSBiYWNrZW5kXG4gICAgcHJpdmF0ZSBjaGFuZ2VEYXRhKGluZGV4T2ZCb2FyZFBpZWNlOiBudW1iZXIsIG1vZGlmaWVkSW5kZXg6IG51bWJlciwgcmVtb3ZlUGllY2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmJvYXJkW2luZGV4T2ZCb2FyZFBpZWNlXSA9IG51bGw7XG4gICAgICAgIHRoaXMuYm9hcmRbbW9kaWZpZWRJbmRleF0gPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkUGllY2UucGllY2VJZCk7XG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT0gMCAmJiB0aGlzLnNlbGVjdGVkUGllY2UucGllY2VJZCA8IDEyICYmIG1vZGlmaWVkSW5kZXggPj0gNTcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMhLnNlbGVjdGVkUGllY2UhLnBpZWNlSWQpIS5jbGFzc0xpc3QuYWRkKFwia2luZ1wiKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT09IDEgJiYgdGhpcy5zZWxlY3RlZFBpZWNlLnBpZWNlSWQgPj0gMTIgJiYgbW9kaWZpZWRJbmRleCA8PSA3KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzIS5zZWxlY3RlZFBpZWNlIS5waWVjZUlkKSEuY2xhc3NMaXN0LmFkZChcImtpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbW92ZVBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3JlbW92ZVBpZWNlXSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy50dXJuID09IDAgJiYgdGhpcy5zZWxlY3RlZFBpZWNlLnBpZWNlSWQgPCAxMikge1xuICAgICAgICAgICAgICAgIGNlbGxzW3JlbW92ZVBpZWNlXS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuYmxhY2tTY29yZS0tXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50dXJuID09PSAxICYmIHRoaXMuc2VsZWN0ZWRQaWVjZS5waWVjZUlkID49IDEyKSB7XG4gICAgICAgICAgICAgICAgY2VsbHNbcmVtb3ZlUGllY2VdLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRTY29yZS0tXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdGVkUGllY2VQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2VsbG9uY2xpY2soKTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZXMgdGhlICdvbkNsaWNrJyBldmVudCBsaXN0ZW5lcnMgZm9yIHBpZWNlc1xuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWRzUGllY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVkc1BpZWNlc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5nZXRQbGF5ZXJQaWVjZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibGFja3NQaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBibGFja3NQaWVjZXNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuZ2V0UGxheWVyUGllY2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrRm9yV2luKCk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2tzIGZvciBhIHdpblxuICAgIHByaXZhdGUgY2hlY2tGb3JXaW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmJsYWNrU2NvcmUgPT09IDApIHtcbiAgICAgICAgICAgIGRpdmlkZXIhLnN0eWxlIS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZFR1cm5UZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVkVHVyblRleHRbaV0uc3R5bGUhLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIGJsYWNrVHVybnRleHRbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIHJlZFR1cm5UZXh0W2ldLnRleHRDb250ZW50ID0gXCJSRUQgV0lOUyFcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlZFNjb3JlID09PSAwKSB7XG4gICAgICAgICAgICBkaXZpZGVyIS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYWNrVHVybnRleHQubGVuZ3RoOyBpKyspIHsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBibGFja1R1cm50ZXh0W2ldLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIHJlZFR1cm5UZXh0W2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBibGFja1R1cm50ZXh0W2ldLnRleHRDb250ZW50ID0gXCJCTEFDSyBXSU5TIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgLy8gU3dpdGNoZXMgcGxheWVycyB0dXJuXG4gICAgcHJpdmF0ZSBjaGFuZ2VQbGF5ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy50dXJuID0gMTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVkVHVyblRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZWRUdXJuVGV4dFtpXS5zdHlsZS5jb2xvciA9IFwibGlnaHRHcmV5XCI7XG4gICAgICAgICAgICAgICAgYmxhY2tUdXJudGV4dFtpXS5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHVybiA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsYWNrVHVybnRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBibGFja1R1cm50ZXh0W2ldLnN0eWxlLmNvbG9yID0gXCJsaWdodEdyZXlcIjtcbiAgICAgICAgICAgICAgICByZWRUdXJuVGV4dFtpXS5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdpdmVQaWVjZXNFdmVudExpc3RlbmVycygpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9