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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/site/minesweeper.ts");
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
exports.MinesweeperCrdt = exports.MinesweeperInternal = exports.MultiValueRegister = exports.MultiValueRegisterInternal = exports.GSetCrdt = exports.MultRegisterCrdt = exports.MultRegisterInternal = exports.CounterCrdt = exports.CounterInternal = void 0;
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
class MinesweeperInternal {
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
exports.MinesweeperInternal = MinesweeperInternal;
MinesweeperInternal.instance = new MinesweeperInternal();
class MinesweeperCrdt extends crdt_core_1.Crdt {
    constructor(id, runtime, initialData) {
        super(id, MinesweeperInternal.instance, runtime, initialData);
    }
    get value() {
        return this.state;
    }
    set value(newValue) {
        this.applyOp(newValue);
    }
}
exports.MinesweeperCrdt = MinesweeperCrdt;
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
        super.applyOp(this.getUniversalResetStrongMessage());
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
     * Message/description format: [crdt number (1 or 2),
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

/***/ "../node_modules/rand-seed/dist/rand-seed.es.js":
/*!******************************************************!*\
  !*** ../node_modules/rand-seed/dist/rand-seed.es.js ***!
  \******************************************************/
/*! exports provided: default, PRNG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRNG", function() { return n; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t=function(r,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n])})(r,n)};function r(r,n){function i(){this.constructor=r}t(r,n),r.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}var n,i=function(){function t(){}return t._xfnv1a=function(t){for(var r=2166136261,n=0;n<t.length;n++)r=Math.imul(r^t.charCodeAt(n),16777619);return function(){return r+=r<<13,r^=r>>>7,r+=r<<3,r^=r>>>17,(r+=r<<5)>>>0}},t}(),s=function(t){function n(r){var i=t.call(this)||this;return i._a=n._xfnv1a(r)(),i}return r(n,t),n.prototype.next=function(){var t=this._a+=1831565813;return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/4294967296},n}(i),e=function(t){function n(r){var i=t.call(this)||this,s=n._xfnv1a(r);return i._a=s(),i._b=s(),i._c=s(),i._d=s(),i}return r(n,t),n.prototype.next=function(){this._a>>>=0,this._b>>>=0,this._c>>>=0,this._d>>>=0;var t=this._a+this._b|0;return this._a=this._b^this._b>>>9,this._b=this._c+(this._c<<3)|0,this._c=this._c<<21|this._c>>>11,this._d=this._d+1|0,t=t+this._d|0,this._c=this._c+t|0,(t>>>0)/4294967296},n}(i),o=function(t){function n(r){var i=t.call(this)||this,s=n._xfnv1a(r);return i._a=s(),i._b=s(),i._c=s(),i._d=s(),i}return r(n,t),n.prototype.next=function(){var t=this._b<<9,r=5*this._a;return r=9*(r<<7|r>>>25),this._c^=this._a,this._d^=this._b,this._b^=this._c,this._a^=this._d,this._c^=t,this._d=this._d<<11|this._d>>>21,(r>>>0)/4294967296},n}(i);!function(t){t.sfc32="sfc32",t.mulberry32="mulberry32",t.xoshiro128ss="xoshiro128ss"}(n||(n={}));var _=function(){function t(t,r){void 0===r&&(r=n.sfc32),this._str=t,this._prng=r,this._generator=this._initializeGenerator()}return t.prototype.next=function(){return this._generator.next()},t.prototype._initializeGenerator=function(){if(function(t){return null===t}(t=this._str)||function(t){return void 0===t}(t))return this._wrap();var t;switch(this._prng){case"sfc32":return new e(this._str);case"mulberry32":return new s(this._str);case"xoshiro128ss":return new o(this._str);default:return this._wrap()}},t.prototype._wrap=function(){return{next:function(){return Math.random()}}},t}();/* harmony default export */ __webpack_exports__["default"] = (_);
//# sourceMappingURL=rand-seed.es.js.map


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

/***/ "./src/site/minesweeper.ts":
/*!*********************************!*\
  !*** ./src/site/minesweeper.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* Creating the grid */
const minesweeper_crdt_1 = __webpack_require__(/*! ./minesweeper_crdt */ "./src/site/minesweeper_crdt.ts");
const compoventuals_client_1 = __webpack_require__(/*! compoventuals-client */ "../client/build/index.js");
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
function grid(game) {
    let board = document.getElementById("board");
    // @ts-ignore
    board.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 16; j++) {
            let box = document.createElement("th");
            box.setAttribute("row", i.toString());
            box.setAttribute("col", j.toString());
            box.className = "cell";
            box.id = "row_" + i.toString() + "_" + j.toString();
            box.addEventListener("click", function () {
                game.leftClicked(i, j);
                grid(game);
            });
            // box.addEventListener("contextmenu", function (e) {
            //     e.preventDefault();
            //     game.rightClicked(i, j);
            //     grid(game);
            // });
            box.appendChild(document.createTextNode(game.display(i, j)));
            box.style.color = game.color(i, j);
            row.appendChild(box);
        }
        // @ts-ignore
        board.appendChild(row);
    }
}
let HOST = location.origin.replace(/^http/, 'ws');
const client_uuid = uuid_1.v4();
/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new compoventuals_client_1.network.CrdtNetworkRuntime(client_uuid, HOST);
let seed = '42';
let game = new minesweeper_crdt_1.MinesweeperCrdt("minesweeperId", client, 16, 16, 40, seed);
grid(game);


/***/ }),

/***/ "./src/site/minesweeper_crdt.ts":
/*!**************************************!*\
  !*** ./src/site/minesweeper_crdt.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinesweeperCrdt = void 0;
const compoventuals_client_1 = __webpack_require__(/*! compoventuals-client */ "../client/build/index.js");
const rand_seed_1 = __importDefault(__webpack_require__(/*! rand-seed */ "../node_modules/rand-seed/dist/rand-seed.es.js"));
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["BOOM"] = 0] = "BOOM";
    GameStatus[GameStatus["WON"] = 1] = "WON";
    GameStatus[GameStatus["CONT"] = 2] = "CONT";
})(GameStatus || (GameStatus = {}));
var TileStatus;
(function (TileStatus) {
    TileStatus[TileStatus["COVERED"] = 0] = "COVERED";
    TileStatus[TileStatus["REVEALED_EMPTY"] = -1] = "REVEALED_EMPTY";
    TileStatus[TileStatus["BOOM"] = -2] = "BOOM";
})(TileStatus || (TileStatus = {}));
class MinesweeperCrdt extends compoventuals_client_1.crdts.Crdt {
    constructor(id, runtime, width, height, numMines, seed) {
        let board = Array(width * height);
        super(id, new compoventuals_client_1.crdts.ArrayCrdtInternal(new compoventuals_client_1.crdts.MinesweeperInternal()), runtime, board);
        this.width = width;
        this.height = height;
        this.rand = new rand_seed_1.default(seed);
        this.mines = this.placeMines(width, height, numMines);
    }
    leftClicked(x, y) {
        if (this.isMine(x, y)) {
            this.setValue(x, y, TileStatus.BOOM);
            return GameStatus.BOOM;
        }
        if (this.isRevealed(x, y)) {
            return GameStatus.CONT;
        }
        this.reveal(x, y);
        return this.hasWon();
    }
    /**
     * A user wins when only mines are covered or flagged.
     */
    hasWon() {
        for (let i = 0; i < this.width * this.height; i++) {
            let value = this.get(i);
            if (value === TileStatus.COVERED && !this.mines.has(value)) {
                return GameStatus.CONT;
            }
        }
        return GameStatus.WON;
    }
    /**
     * Recursively traverses the board starting from (x, y) until there is
     * at least one neighbor mine.
     * It assumes that (x, y) is not a mine.
     */
    reveal(x, y) {
        let neighbors = this.resolveNeighbors(x, y);
        let neighboringMines = 0;
        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor] = neighbor;
            if (this.isMine(x_neighbor, y_neighbor)) {
                neighboringMines += 1;
            }
        }
        // There is at least one mine in the surroundings
        if (neighboringMines > 0) {
            this.setValue(x, y, neighboringMines);
            return;
        }
        this.setValue(x, y, TileStatus.REVEALED_EMPTY);
        // Recursively call reveal on the non-revealed (or flagged) neighbors
        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor] = neighbor;
            if (!this.isRevealed(x_neighbor, y_neighbor)) {
                this.reveal(x_neighbor, y_neighbor);
            }
        }
    }
    setValue(x, y, value) {
        let idx = this.getIndex(x, y);
        this.applyOp([idx, value]);
        return;
    }
    getValue(x, y) {
        let idx = this.getIndex(x, y);
        return this.get(idx);
    }
    get(idx) {
        return this.state[idx];
    }
    /**
     * For coordinates [x, y], it finds the corresponding index in the values array.
     * @param x
     * @param y
     * @private
     */
    getIndex(x, y) {
        if (!(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < this.width && y >= 0 && y < this.height)) {
            throw new Error("Out of bounds: [" + x + ", " + y + "]");
        }
        return x * this.width + y;
    }
    // <------- UTILITIES ------->
    /**
     * Returns true if the current cell has been revealed, false otherwise.
     * Revealed means either it has a number, or has been flipped.
     */
    isRevealed(x, y) {
        let value = this.getValue(x, y);
        return value === TileStatus.REVEALED_EMPTY || value > 0;
    }
    /**
     * Returns true if the current cell is a mine, false otherwise.
     */
    isMine(x, y) {
        let idx = this.getIndex(x, y);
        return this.mines.has(idx);
    }
    /**
     * Given a coordinate, it finds all of it's neighbors.
     * A neighbor is defined as the 8 surrounding cells (unless on the border,
     * which would be any surrounding cell not outside he board).
     * Source: https://stackoverflow.com/questions/652106/finding-neighbours-in-a-two-dimensional-array
     * PD.: Sorry for being lazy and looking this up.
     */
    resolveNeighbors(x, y) {
        let neighbors = [];
        for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, this.width - 1); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, this.height - 1); j++) {
                if (x !== i || y !== j) {
                    neighbors.push([i, j]);
                }
            }
        }
        return neighbors;
    }
    /**
     * Resolves what to display on the board.
     * @param x the x coordinate.
     * @param y the y coordinate.
     */
    display(x, y) {
        if (this.getValue(x, y) > 0) {
            return this.getValue(x, y).toString();
        }
        if (this.isRevealed(x, y)) {
            return "R";
        }
        if (this.getValue(x, y) === TileStatus.COVERED) {
            return "";
        }
        // if it got here it is a mine
        return "X";
    }
    /**
     * Resolves what color should the tile be.
     * @param x the x coordinate.
     * @param y the y coordinate.
     */
    color(x, y) {
        let value = this.getValue(x, y);
        switch (value) {
            case 1:
                return "blue";
            case 2:
                return "green";
            case 3:
                return "red";
            case 4:
                return "purple";
            case 5:
                return "black";
            case 6:
                return "maroon";
            case 7:
                return "grey";
            case 8:
                return "turquoise";
            case TileStatus.REVEALED_EMPTY:
                return "Gainsboro";
            default:
                return "black";
        }
    }
    /**
     * Utility function to get a number in range [0, max)
     */
    getRandomInt(max) {
        return Math.floor(this.rand.next() * Math.floor(max));
    }
    /**
     * Randomly places the mines on the board.
     * TODO - revisit this, as it doesnt hold.
     */
    placeMines(width, height, numMines) {
        let indices = [...Array(width * height).keys()];
        let mines = Array(numMines);
        while (numMines > 0) {
            let minePos = this.getRandomInt(indices.length);
            mines[numMines - 1] = indices[minePos];
            indices.splice(minePos, 1);
            numMines--;
        }
        console.debug(mines.toString());
        return new Set(mines);
    }
}
exports.MinesweeperCrdt = MinesweeperCrdt;


/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvY3JkdHMyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2pzb24uanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3N0YW5kYXJkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL25vZGVfbW9kdWxlcy9yYW5kLXNlZWQvZGlzdC9yYW5kLXNlZWQuZXMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9taW5lc3dlZXBlci50cyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9taW5lc3dlZXBlcl9jcmR0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELDZCQUE2QixtQkFBTyxDQUFDLHVEQUFhO0FBQ2xELCtCQUErQixtQkFBTyxDQUFDLDJEQUFlO0FBQ3RELGlDOzs7Ozs7Ozs7Ozs7QUN2QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJEQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7QUM5U2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQ2xQYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7O0FDOUZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLCtEQUFlO0FBQ3BDLGFBQWEsbUJBQU8sQ0FBQywyREFBYTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsaURBQVE7QUFDN0I7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkRBQWM7QUFDbkMsYUFBYSxtQkFBTyxDQUFDLDZEQUFjO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyx5REFBWTtBQUNqQyxhQUFhLG1CQUFPLENBQUMscURBQVU7QUFDL0IsaUM7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMseURBQVk7QUFDdkMsc0JBQXNCLG1CQUFPLENBQUMsK0RBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7OztBQ3RjYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsNkRBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMElBQTBJLGFBQWEsV0FBVyxFQUFFO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDdlFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx1Q0FBdUM7QUFDdkMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDOVdhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywrREFBZTtBQUM3QyxvQkFBb0IsbUJBQU8sQ0FBQywyREFBYTtBQUN6QyxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7O0FDaHZCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsbUVBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7Ozs7OztBQ3pQYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxrRDs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsdUZBQTBCO0FBQy9DLGFBQWEsbUJBQU8sQ0FBQyxtRkFBd0I7QUFDN0MsYUFBYSxtQkFBTyxDQUFDLG1FQUFnQjtBQUNyQyxpQzs7Ozs7Ozs7Ozs7O0FDZmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3JJQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUNBQWlDLGFBQWEsZ0NBQWdDLGNBQWMsZ0JBQWdCLGdEQUFnRCxRQUFRLGdCQUFnQixhQUFhLG1CQUFtQiw2RUFBNkUsbUJBQW1CLGNBQWMsNkJBQTZCLHlCQUF5QixXQUFXLDRDQUE0QyxrQkFBa0IsMERBQTBELEdBQUcsaUJBQWlCLGNBQWMseUJBQXlCLDZCQUE2QiwwQ0FBMEMsMEJBQTBCLDBGQUEwRixHQUFHLGtCQUFrQixjQUFjLHdDQUF3Qyw2Q0FBNkMsMENBQTBDLG9EQUFvRCx3QkFBd0IsNEtBQTRLLEdBQUcsa0JBQWtCLGNBQWMsd0NBQXdDLDZDQUE2QywwQ0FBMEMsNkJBQTZCLDRKQUE0SixHQUFHLElBQUksYUFBYSx3RUFBd0UsU0FBUyxHQUFHLGlCQUFpQixnQkFBZ0IsNkZBQTZGLG1DQUFtQyw4QkFBOEIsNkNBQTZDLGVBQWUsZ0JBQWdCLDJCQUEyQixrQkFBa0Isd0JBQXdCLE1BQU0sbUJBQW1CLG9DQUFvQyx5Q0FBeUMsMkNBQTJDLDZCQUE2Qiw4QkFBOEIsT0FBTyxnQkFBZ0IsdUJBQXVCLEdBQUcsR0FBa0IsZ0VBQUMsRUFBbUI7QUFDcnRFOzs7Ozs7Ozs7Ozs7QUNmQSxTQUFTLG1CQUFPLENBQUMsdUNBQU07QUFDdkIsU0FBUyxtQkFBTyxDQUFDLHVDQUFNOztBQUV2QjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakNBLFVBQVUsbUJBQU8sQ0FBQyx5REFBVztBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1R0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFXO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLGlFQUFtQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSx1QkFBdUI7QUFDdkIsMkdBQW1EO0FBQ25ELDJHQUErQztBQUMvQywrRUFBa0M7QUFFbEMsU0FBUyxJQUFJLENBQUMsSUFBcUI7SUFDL0IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7SUFDNUMsYUFBYTtJQUNiLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtJQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztZQUNILHFEQUFxRDtZQUNyRCwwQkFBMEI7WUFDMUIsK0JBQStCO1lBQy9CLGtCQUFrQjtZQUNsQixNQUFNO1lBQ04sR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFFRCxhQUFhO1FBQ2IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjtBQUNMLENBQUM7QUFFRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO0FBRWpELE1BQU0sV0FBVyxHQUFZLFNBQUksRUFBRSxDQUFDO0FBRXBDOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsSUFBSSw4QkFBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUUvRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFFaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDO0FBRXhFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25EWCwyR0FBb0Q7QUFDcEQsNEhBQTZCO0FBRTdCLElBQUssVUFJSjtBQUpELFdBQUssVUFBVTtJQUNYLDJDQUFJO0lBQ0oseUNBQUc7SUFDSCwyQ0FBSTtBQUNSLENBQUMsRUFKSSxVQUFVLEtBQVYsVUFBVSxRQUlkO0FBRUQsSUFBSyxVQUlKO0FBSkQsV0FBSyxVQUFVO0lBQ1gsaURBQVc7SUFDWCxnRUFBbUI7SUFDbkIsNENBQVM7QUFDYixDQUFDLEVBSkksVUFBVSxLQUFWLFVBQVUsUUFJZDtBQUVELE1BQWEsZUFBZ0IsU0FBUSw0QkFBSyxDQUFDLElBQWM7SUFPckQsWUFBWSxFQUFPLEVBQUUsT0FBNEIsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLFFBQWdCLEVBQUUsSUFBWTtRQUM1RyxJQUFJLEtBQUssR0FBYSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FDRCxFQUFFLEVBQ0YsSUFBSSw0QkFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksNEJBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEVBQzVELE9BQU8sRUFDUCxLQUFLLENBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxtQkFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNwQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxNQUFNO1FBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksS0FBSyxLQUFLLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEQsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxNQUFNLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDL0IsSUFBSSxTQUFTLEdBQTRCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxnQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFakMsS0FBSyxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsR0FBcUIsUUFBUSxDQUFDO1lBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUU7Z0JBQ3JDLGdCQUFnQixJQUFJLENBQUMsQ0FBQzthQUN6QjtTQUNKO1FBRUQsaURBQWlEO1FBQ2pELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFL0MscUVBQXFFO1FBQ3JFLEtBQUssSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFO1lBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEdBQXFCLFFBQVEsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzthQUN0QztTQUNKO0lBQ0wsQ0FBQztJQUVPLFFBQVEsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWE7UUFDaEQsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQixPQUFPO0lBQ1gsQ0FBQztJQUVPLFFBQVEsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUNqQyxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxHQUFHLENBQUMsR0FBVztRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2pDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4RyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELDhCQUE4QjtJQUU5Qjs7O09BR0c7SUFDSyxVQUFVLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQyxjQUFjLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxNQUFNLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLGdCQUFnQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3pDLElBQUksU0FBUyxHQUE0QixFQUFFLENBQUM7UUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hFLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3BCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3pCO2FBQ0o7U0FDSjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDekM7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sR0FBRztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzVDLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCw4QkFBOEI7UUFDOUIsT0FBTyxHQUFHO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDdEIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZDLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxDQUFDO2dCQUNGLE9BQU8sTUFBTTtZQUNqQixLQUFLLENBQUM7Z0JBQ0YsT0FBTyxPQUFPO1lBQ2xCLEtBQUssQ0FBQztnQkFDRixPQUFPLEtBQUs7WUFDaEIsS0FBSyxDQUFDO2dCQUNGLE9BQU8sUUFBUTtZQUNuQixLQUFLLENBQUM7Z0JBQ0YsT0FBTyxPQUFPLENBQUM7WUFDbkIsS0FBSyxDQUFDO2dCQUNGLE9BQU8sUUFBUSxDQUFDO1lBQ3BCLEtBQUssQ0FBQztnQkFDRixPQUFPLE1BQU0sQ0FBQztZQUNsQixLQUFLLENBQUM7Z0JBQ0YsT0FBTyxXQUFXO1lBQ3RCLEtBQUssVUFBVSxDQUFDLGNBQWM7Z0JBQzFCLE9BQU8sV0FBVztZQUN0QjtnQkFDSSxPQUFPLE9BQU8sQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLFlBQVksQ0FBQyxHQUFXO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssVUFBVSxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsUUFBZ0I7UUFDOUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNqQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsUUFBUSxFQUFFLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBbE9ELDBDQWtPQyIsImZpbGUiOiJkZXBsb3kvc2l0ZS9taW5lc3dlZXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NpdGUvbWluZXN3ZWVwZXIudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZHRzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9jcmR0c1wiKSk7XG5leHBvcnRzLm5ldHdvcmsgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL25ldHdvcmtcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1pbmVzd2VlcGVyQ3JkdCA9IGV4cG9ydHMuTWluZXN3ZWVwZXJJbnRlcm5hbCA9IGV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVyID0gZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCA9IGV4cG9ydHMuR1NldENyZHQgPSBleHBvcnRzLk11bHRSZWdpc3RlckNyZHQgPSBleHBvcnRzLk11bHRSZWdpc3RlckludGVybmFsID0gZXhwb3J0cy5Db3VudGVyQ3JkdCA9IGV4cG9ydHMuQ291bnRlckludGVybmFsID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG4vKipcbiAqIE9wZXJhdGlvbnMsIG1lc3NhZ2VzLCBhbmQgZGVzY3JpcHRpb25zIGFyZSBhbGwganVzdCB0aGVcbiAqIG51bWJlciB0byBhZGQvYWRkZWQuXG4gKiBUT0RPOiBvcHRpbWl6ZSBhd2F5IDAgYWRkcz9cbiAqL1xuY2xhc3MgQ291bnRlckludGVybmFsIHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gW3N0YXRlICsgbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVySW50ZXJuYWwgPSBDb3VudGVySW50ZXJuYWw7XG5Db3VudGVySW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgQ291bnRlckludGVybmFsKCk7XG4vKipcbiAqIEEgc2ltcGxlIGNvdW50ZXIgQ1JEVC5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIG51bWJlciB0aGF0IHdhcyBhZGRlZC5cbiAqXG4gKiBXYXJuaW5nOiBhZGRpdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmNsYXNzIENvdW50ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBDb3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBhZGQuICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIGNvdW50ZXIudmFsdWUgKz0gbiBhbmQgY291bnRlci52YWx1ZSAtPSBuIHdvcmtcbiAgICAgKiBhcyBleHBlY3RlZCAoY29udmVydGVkIHRvIENSRFQgYWRkaXRpb25zKS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGQobmV3VmFsdWUgLSB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXJDcmR0ID0gQ291bnRlckNyZHQ7XG4vKipcbiAqIE9wZXJhdGlvbnMsIG1lc3NhZ2VzLCBhbmQgZGVzY3JpcHRpb25zIGFyZSBhbGwganVzdCB0aGVcbiAqIG51bWJlciB0byBtdWx0aXBseS9tdWx0aXBsaWVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAxIG11bHRzP1xuICovXG5jbGFzcyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSAqIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdFJlZ2lzdGVySW50ZXJuYWwgPSBNdWx0UmVnaXN0ZXJJbnRlcm5hbDtcbk11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlID0gbmV3IE11bHRSZWdpc3RlckludGVybmFsKCk7XG4vKipcbiAqIEEgc2ltcGxlIG51bWVyaWNhbCByZWdpc3RlciBDUkRUIHdpdGggbXVsdGlwbGljYXRpb24gb3BlcmF0aW9ucy5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIG51bWJlciB0aGF0IHdhcyBtdWx0aXBsaWVkLlxuICpcbiAqIFdhcm5pbmc6IG11bHRpcGxpY2F0aW9uIGlzIG5vdCBhY3R1YWxseSBjb21tdXRhdGl2ZSBpZiB0aGVyZSBpcyBhblxuICogb3ZlcmZsb3cgb3IgaWYgeW91IHVzZSBmbG9hdGluZyBwb2ludCBudW1iZXJzLiAgVE9ETzogaXMgdGhlcmUgYVxuICogYmV0dGVyIHR5cGUgd2UgY2FuIHVzZT9cbiAqL1xuY2xhc3MgTXVsdFJlZ2lzdGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgbXVsdChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBtdWx0aXBsaWNhdGlvbi4gIEFzIGEgY29uc2VxdWVuY2UsXG4gICAgICogcmVnaXN0ZXIudmFsdWUgKj0gbiBhbmQgcmVnaXN0ZXIudmFsdWUgLz0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIG11bHRpcGxpY2F0aW9ucykuXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjdXJyZW50IHZhbHVlIGlzIDAuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbXBvc3NpYmxlIHRvIHNldCB0byBub256ZXJvIHZhbHVlIHdoZW4gY3VycmVudCB2YWx1ZSBpcyB6ZXJvXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gMCAtPiAwIGlzIG5vLW9wXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tdWx0KG5ld1ZhbHVlIC8gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gTXVsdFJlZ2lzdGVyQ3JkdDtcbi8vIGV4cG9ydCBjbGFzcyBDb3VudGVyTW9kSW50ZXJuYWwgaW1wbGVtZW50cyBDcmR0SW50ZXJuYWw8bnVtYmVyPiB7XG4vLyAgICAgY29uc3RydWN0b3IocmVhZG9ubHkgbW9kdWx1czogbnVtYmVyKSB7XG4vLyAgICAgICAgIGlmIChtb2R1bHVzIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwibW9kdWx1cyBpcyBuZWdhdGl2ZTogXCIgKyBtb2R1bHVzKTtcbi8vICAgICB9XG4vLyAgICAgY3JlYXRlKGluaXRpYWxEYXRhPzogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpIHJldHVybiBpbml0aWFsRGF0YTtcbi8vICAgICAgICAgZWxzZSByZXR1cm4gMDtcbi8vICAgICB9XG4vLyAgICAgcHJlcGFyZShvcGVyYXRpb246IG51bWJlciwgX3N0YXRlOiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5tb2Qob3BlcmF0aW9uKTtcbi8vICAgICB9XG4vLyAgICAgZWZmZWN0KG1lc3NhZ2U6IG51bWJlciwgc3RhdGU6IG51bWJlciwgX3JlcGxpY2FJZDogYW55LCBfdGltZXN0YW1wOiBDYXVzYWxUaW1lc3RhbXApOiBbbnVtYmVyLCBudW1iZXJdIHtcbi8vICAgICAgICAgcmV0dXJuIFt0aGlzLm1vZChzdGF0ZSArIG1lc3NhZ2UpLCBtZXNzYWdlXTtcbi8vICAgICB9XG4vLyAgICAgbW9kKHg6IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmICh4ID49IDApIHJldHVybiB4ICUgdGhpcy5tb2R1bHVzO1xuLy8gICAgICAgICBlbHNlIHJldHVybiB0aGlzLm1vZHVsdXMgLSAoKC14KSAlIHRoaXMubW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gfVxuLyoqXG4gKiBPcGVyYXRpb25zIGFuZCBtZXNzYWdlcyBhcmUgdGhlIGVsZW1lbnQgdG8gYWRkLiAgVE9ETzpcbiAqIHRoaXMgbWVhbnMgdGhhdCBhZGRpbmcgbnVsbCB3b24ndCB3b3JrIGFzIEdTZXRDcmR0IHdpbGwgdHJlYXRcbiAqIGl0cyBtZXNzYWdlIGFzIGEgbm8tb3AuICBEZXNjcmlwdGlvbiBpcyB0aGUgZWxlbWVudCBhZGRlZFxuICogKGlmIGl0J3MgcmVkdW5kYW50LCBkZXNjcmlwdGlvbiBpcyBudWxsLCBzbyBvbmNoYW5nZSB3b24ndFxuICogc2VlIGFueXRoaW5nKS5cbiAqL1xuY2xhc3MgR1NldEludGVybmFsIHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhvcGVyYXRpb24pKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3RpbWVzdGFtcCkge1xuICAgICAgICBpZiAoc3RhdGUuaGFzKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAvLyBkb2VzIG5vdGhpbmdcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUuYWRkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgICAgIH1cbiAgICB9XG59XG5HU2V0SW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgR1NldEludGVybmFsKCk7XG4vKipcbiAqIEEgZ3Jvdy1vbmx5IHNldC5cbiAqXG4gKiBJbiBvbmNoYW5nZSwgZXZlbnQuZGVzY3JpcHRpb24gaXMgdGhlIGFycmF5IG9mIGVsZW1lbnRzIGFkZGVkXG4gKiAoW10gb3IgW2FkZGVkIGVsZW1lbnRdKS5cbiAqXG4gKiBUT0RPOiBhZGRpbmcgYSBudWxsIHZhbHVlIHdpbGwgYmUgaWdub3JlZC5cbiAqIFRPRE86IGFkZCBhIHR5cGUgYW5ub3RhdGlvblxuICogVE9ETzogc2FtZSBpbnRlcmZhY2UgYXMgSlMgU2V0XG4gKi9cbmNsYXNzIEdTZXRDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBHU2V0SW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgYWRkKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKGVsZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHNldC4gIFRoaXMgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQodGhpcy5zdGF0ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5HU2V0Q3JkdCA9IEdTZXRDcmR0O1xuY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgQW4gaW5pdGlhbCB2YWx1ZSB0byBzZXQuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQoW1tpbml0aWFsRGF0YSwgbnVsbCwgLTFdXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnM6XG4gICAgICogLSBbXCJzZXRcIiwgdmFsdWVdOiBzZXQgdG8gdGhlIGdpdmVuIHNpbmdsZSB2YWx1ZS5cbiAgICAgKiAtIFtcInJlc2V0XCJdOiByZXNldCwgc2V0dGluZyB0aGUgdmFsdWUgc2V0IHRvIFtdLlxuICAgICAqIEBwYXJhbSAgb3BlcmF0aW9uIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIF9zdGF0ZSAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKCEoKG9wZXJhdGlvblswXSA9PT0gXCJzZXRcIiAmJiBvcGVyYXRpb25bMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHx8IG9wZXJhdGlvblswXSA9PT0gXCJyZXNldFwiKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpczpcbiAgICAgKiAtIGZvciBzZXQgbWVzc2FnZSwgW1wic2V0XCIsIHNldCB2YWx1ZV0gKGV2ZW4gaWYgaXRcbiAgICAgKiBkb2Vzbid0IGVsaW1pbmF0ZSBhbGwgY2F1c2FsbHkgcHJpb3IgdmFsdWVzKS5cbiAgICAgKiAtIGZvciByZXNldHMsIFtcInJlc2V0XCJdLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGlmICghKChtZXNzYWdlWzBdID09PSBcInNldFwiICYmIG1lc3NhZ2VbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHx8IG1lc3NhZ2VbMF0gPT09IFwicmVzZXRcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlWzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZSh2YWx1ZSk7IC8vaW5pdGlhbCBlbGVtZW50XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdmNFbnRyeSA9IHZjLmdldCh2YWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHZjRW50cnkgIT09IHVuZGVmaW5lZCAmJiB2Y0VudHJ5ID49IHZhbHVlWzJdKVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlWzBdID09PSBcInNldFwiKSB7XG4gICAgICAgICAgICBzdGF0ZS5hZGQoW21lc3NhZ2VbMV0sIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwgPSBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbDtcbk11bHRpVmFsdWVSZWdpc3RlckludGVybmFsLmluc3RhbmNlID0gbmV3IE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsKCk7XG5jbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXIgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoW1wic2V0XCIsIHZhbHVlXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZVNldCgpIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHZhbHVlcy5hZGQodmFsdWVbMF0pO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInJlc2V0XCJdKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXIgPSBNdWx0aVZhbHVlUmVnaXN0ZXI7XG5jbGFzcyBNaW5lc3dlZXBlckludGVybmFsIHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICBpZiAoc3RhdGUgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFttZXNzYWdlLCBtZXNzYWdlXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTWluZXN3ZWVwZXJJbnRlcm5hbCA9IE1pbmVzd2VlcGVySW50ZXJuYWw7XG5NaW5lc3dlZXBlckludGVybmFsLmluc3RhbmNlID0gbmV3IE1pbmVzd2VlcGVySW50ZXJuYWwoKTtcbmNsYXNzIE1pbmVzd2VlcGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgTWluZXN3ZWVwZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKG5ld1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLk1pbmVzd2VlcGVyQ3JkdCA9IE1pbmVzd2VlcGVyQ3JkdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2ljX2NyZHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmR0ID0gZXhwb3J0cy5DcmR0Q2hhbmdlRXZlbnQgPSB2b2lkIDA7XG4vKipcbiAqIEFuIGV2ZW50IGlzc3VlZCB3aGVuIGEgQ1JEVCBpcyBjaGFuZ2VkIGJ5IGFub3RoZXIgcmVwbGljYS5cbiAqIEBwYXJhbSBjYWxsZXIgICAgICBUaGUgQ3JkdCBpbnN0YW5jZSB0aGF0IHdhcyBjaGFuZ2VkLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIEFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIGRlc2NycHRpb24gb2YgdGhlIGNoYW5nZS5cbiAqIEBwYXJhbSB0aW1lc3RhbXAgICBUaGUgY2F1c2FsIHRpbWVzdGFtcCBvZiB0aGUgY2hhbmdlLiBOb3RlIHRoYXRcbiAqIGJlY2F1c2Ugc2V2ZXJhbCBDUkRUcyBjYW4gc2hhcmUgdGhlIHNhbWUgcnVudGltZSwgdGltZXN0YW1wc1xuICogbWF5IG5vdCBiZSBjb250aW5ndW91cyAoZS5nLiwgZW50cmllcyBpbiB0aGVpciB2ZWN0b3IgY2xvY2tzXG4gKiBtaWdodCBza2lwIG51bWJlcnMpLiAgSG93ZXZlciwgY2F1c2FsbHkgb3JkZXJlZCBkZWxpdmVyeSBpc1xuICogc3RpbGwgZ3VhcmFudGVlZC5cbiAqL1xuY2xhc3MgQ3JkdENoYW5nZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIGRlc2NyaXB0aW9uLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0Q2hhbmdlRXZlbnQgPSBDcmR0Q2hhbmdlRXZlbnQ7XG4vLyBVc2VyLWZhY2luZyB3cmFwcGVycyBhcm91bmQgQ1JEVHMgc2hvdWxkIGV4dGVuZCB0aGlzIGNsYXNzLFxuLy8gYWRkaW5nIG1ldGhvZHMgZm9yIHRoZSBDUkRUJ3Mgb3BlcmF0aW9ucyAoZS5nLiwgaW5jcmVtZW50KCkpXG4vLyB3aGljaCBjYWxsIHRoaXMgY2xhc3MncyBhcHBseSBtZXRob2QuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFwcGxpY2F0aW9uLWZhY2luZyBDUkRUIGltcGxlbWVudGF0aW9ucy5cbiAqIEluc3RlYWQgb2YgZXhwb3NpbmcgQ3JkdEludGVybmFsIGltcGxlbWVudGF0aW9ucyBkaXJlY3RseSxcbiAqIHdoaWNoIGhhdmUgYW4gdW5mcmllbmRseSBwcmVwYXJlL2VmZmVjdCBpbnRlcmZhY2UsXG4gKiBlYWNoIENSRFQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGRlZmluZSBhIHN1YmNsYXNzIG9mIHRoaXNcbiAqIGNsYXNzIHdpdGggb3JkaW5hcnktbG9va2luZyBtZXRob2RzIHRvIHBlcmZvcm0gb3BlcmF0aW9uc1xuICogYW5kIHF1ZXJ5IHRoZSBzdGF0ZS4gIE1ldGhvZHMgcGVyZm9ybWluZyBvcGVyYXRpb25zIHNob3VsZFxuICogY2FsbCBhcHBseU9wIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgQ3JkdEludGVybmFsIG9wZXJhdGlvbi5cbiAqIFRoaXMgY2xhc3MgdGhlbiBhdXRvbWF0aWNhbGx5IGhhbmRsZXMgc2VuZGluZyBhbmQgcmVjZWl2aW5nXG4gKiBvZiBtZXNzYWdlcy5cbiAqIENmLiBBbGdvcml0aG0gMSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHBhcGVyLlxuICogQHBhcmFtIFMgVGhlIHN0YXRlIHR5cGUgb2YgQy5cbiAqL1xuY2xhc3MgQ3JkdCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgIEFuIGlkIGZvciB0aGlzIENSRFQuICBBbGwgQ1JEVHMgdXNpbmcgdGhlXG4gICAgICogc2FtZSBDcmR0UnVudGltZSBtdXN0IGhhdmUgZGlzdGluY3QgaWRzLCBhbmQgdGhlIGlkcyBtdXN0XG4gICAgICogYmUgdGhlIHNhbWUgZm9yIGFsbCByZXBsaWNhcyBvZiBhIGdpdmVuIENSRFQsIGluIG9yZGVyXG4gICAgICogZm9yIHRoZSBDcmR0UnVudGltZSB0byByb3V0ZSBtZXNzYWdlcyB0byB0aGVtIHByb3Blcmx5LlxuICAgICAqIEBwYXJhbSBjcmR0SW50ZXJuYWwgICAgVGhlIENyZHRJbnRlcm5hbCB0byB1c2UuICBOb3RlIHRoYXQgc2luY2VcbiAgICAgKiBDcmR0SW50ZXJuYWwncyBkb24ndCBzdG9yZSBzdGF0ZXMsIG11bHRpcGxlIG9iamVjdHMgbWF5XG4gICAgICogc2hhcmUgdGhlIHNhbWUgQ3JkdEludGVybmFsIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBydW50aW1lIFRoZSBDcmR0UnVudGltZSB0byB1c2UgZm9yIHNlbmRpbmcgYW5kXG4gICAgICogcmVjZWl2aW5nIG1lc3NhZ2VzLlxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIHRvIHVzZSB3aGVuXG4gICAgICogc2V0dGluZyB0aGUgQ3JkdEludGVybmFsJ3MgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgY3JkdEludGVybmFsLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY3JkdEludGVybmFsID0gY3JkdEludGVybmFsO1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoaXMgdG8gbGlzdGVuIGZvciB3aGVuIGFub3RoZXIgcmVwbGljYSB1cGRhdGVzXG4gICAgICAgICAqIHRoaXMgb2JqZWN0J3Mgc3RhdGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm9uY2hhbmdlID0gKChfKSA9PiB7IH0pO1xuICAgICAgICAvLyBUT0RPOiBkZXNjcmliZSBcInRyYW5zYWN0aW9uc1wiLiAgUmlnaHQgd29yZD8gIFJlbmFtZVxuICAgICAgICAvLyBcImF0b21pY1wiIHN0dWZmIGJlbG93LiAgTXVzdCBoYXBwZW4gc3luY2hyb25vdXNseSBzb1xuICAgICAgICAvLyB0aGF0IHJ1bnRpbWUuZ2V0VGltZXN0YW1wKCkgZG9lc24ndCBjaGFuZ2UgYW5kXG4gICAgICAgIC8vIG5vIG1lc3NhZ2VzIGFyZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cbiAgICAgICAgLy8gQWxsb3cgY2FsbGVyIHRvIHN0YXJ0L2VuZCB0cmFuc2FjdGlvbnM/XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5jcmR0SW50ZXJuYWwuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgdGhpcy5ydW50aW1lLnJlZ2lzdGVyKHRoaXMsIHRoaXMuaWQpO1xuICAgIH1cbiAgICBzdGFydFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHRyYW5zYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIC8vIFRPRE86IFJldHVybnMgdGhlIGRlc2NyaXB0aW9ucyAodHJhbnNsYXRlZClcbiAgICBlbmRUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQodGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLCB0aGlzLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucztcbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgZ2l2ZW4gb3BlcmF0aW9uIHRvIHRoZSBzdGF0ZSwgdXNpbmcgcHJlcGFyZSBhbmQgZWZmZWN0LFxuICAgICAqIGFuZCBzZW5kcyB0aGUgZ2VuZXJhdGVkIG1lc3NhZ2Ugb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiBJZiBhIHRyYW5zYWN0aW9uIGlzIGluIHByb2dyZXNzLCB0aGlzIHNlbmRpbmcgaXMgZGVsYXllZFxuICAgICAqIHVudGlsXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gVGhlIG9wZXJhdGlvbiB0byBhcHBseS5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgICBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNoYW5nZXMuXG4gICAgICogVGhpcyBpcyB0aGUgbGlzdCBvZiBpbmRpdmlkdWFsIG1lc3NhZ2UgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5XG4gICAgICogZWZmZWN0IChza2lwcGluZyBudWxsIG1lc3NhZ2VzKSxcbiAgICAgKiBhZnRlciBiZWluZyBwYXNzZWQgdGhyb3VnaCB0cmFuc2xhdGVEZXNjcmlwdGlvbi4gIEFuIGV4Y2VwdGlvblxuICAgICAqIGlzIHRoYXQgaWYgYWxsIG1lc3NhZ2VzIGFyZVxuICAgICAqIG51bGwsIG51bGwgaXMgcmV0dXJuZWQgd2l0aG91dCBjYWxsaW5nIHRyYW5zbGF0ZURlc2NyaXB0aW9uLlxuICAgICAqIFRPRE86IG51bGwgaWYgaW4gYSB0cmFuc2FjdGlvbiAodXNlIGVuZFRyYW5zYWN0aW9uIGluc3RlYWQpLlxuICAgICAqIFRPRE86IGJ1dCB3aGF0IGlmIHdlIHdhbnQgaXQgdG8gZGVjaWRlIHdoYXQgdG8gZG8gbmV4dD9cbiAgICAgKi9cbiAgICBhcHBseU9wKG9wZXJhdGlvbikge1xuICAgICAgICBsZXQgb3duVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIG93blRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmNyZHRJbnRlcm5hbC5wcmVwYXJlKG9wZXJhdGlvbiwgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLCB0aGlzLnN0YXRlLCB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG93blRyYW5zYWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gdHJhbnNsYXRlIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogQ3JkdEludGVybmFsIGJlZm9yZSBwYXNzaW5nIGl0IHRvIG9uY2hhbmdlLiAgVGhpcyBpc1xuICAgICAqIHVzZWZ1bCBmb3Igc2VtaWRpcmVjdCBwcm9kdWN0cyBiZWNhdXNlIHRoZSBkZWZhdWx0XG4gICAgICogU2VtaWRpcmVjdEludGVybmFsIGRlc2NyaXB0aW9ucyBhcmUgbm90IHVzZXItZnJpZW5kbHkuXG4gICAgICogSWYgdGhpcyBtZXRob2QgcmV0dXJucyBudWxsLCBvbmNoYW5nZSBpcyBub3QgY2FsbGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50aW9uIHJldHVybnMgZGVzY3JpcHRpb25zWzBdLiAgSXQgaXNcbiAgICAgKiBhcHByb3ByaWF0ZSB3aGVuIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdCBhbHJlYWR5IHJldHVybnNcbiAgICAgKiB1c2VyLWZyaWVuZGx5IGRlc2NyaXB0aW9ucyBhbmQgYXBwbHlPcHMgaXMgb25seSBldmVyIGNhbGxlZFxuICAgICAqIHdpdGggc2luZ2xlIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGRlc2NyaXB0aW9ucyBBIGxpc3Qgb2YgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIHRoaXMuY3JkdEludGVybmFsLmVmZmVjdC4gIFRoaXMgd2lsbCBhbHdheXMgYmUgbm9uLWVtcHR5LlxuICAgICAqIEByZXR1cm4gVGhlIHRyYW5zbGF0ZWQgZGVzY3JpcHRpb24gdG8gcGFzcyB0byB0aGlzLm9uY2hhbmdlLFxuICAgICAqIG9yIG51bGwgaWYgdGhpcy5vbmNoYW5nZSBzaG91bGQgbm90IGJlIGNhbGxlZC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIG9ic2VydmVkIHJlc2V0c1xuICAgICAqIGZvciB3aGVuIGEgQ3JkdE9iamVjdCBjb250YWluaW5nIHRoaXMgQ3JkdCBpc1xuICAgICAqIHJlc2V0LiAgVGhlXG4gICAgICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHN1Y2ggbWFwIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgICAqIHRvIGNhdXNlIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgICogbXVzdCBzYXRpc2Z5OlxuICAgICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgICAqIC0gd2hlbiBhcHBsaWVkIHRvIGEgc3RhdGUgd2hpY2ggaGFzIG5vdCByZWNlaXZlZCBhbnlcbiAgICAgKiBtZXNzYWdlcyBjYXVzYWxseSBwcmlvciB0byB0aGUgdGltZXN0YW1wLCBpdCBoYXNcbiAgICAgKiBubyBlZmZlY3QuICBJbiBvdGhlciB3b3JkcywgYXBwbHlpbmcgaXQgdG8gYSBjb25jdXJyZW50bHlcbiAgICAgKiBpbml0aWFsaXplZCBzdGF0ZSBoYXMgbm8gZWZmZWN0LlxuICAgICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqXG4gICAgICogVE9ETzogcmV0dXJuIGxpc3Qgb2YgbWVzc2FnZXMgaW5zdGVhZCwgZm9yIGdlbmVyYWxpdHk/XG4gICAgICovXG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBvYnNlcnZlZC1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgb2JzZXJ2ZWQtcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0KCkgeyB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9udHJpdmlhbCBzdHJvbmctcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXRTdHJvbmcoKSB7IH1cbiAgICAvLyAvKipcbiAgICAvLyAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBzdHJvbmcgcmVzZXRzLiAgVGhlXG4gICAgLy8gICogZGVmYXVsdCByZXR1cm5zIG51bGwsIHNvIHJlc2V0cyBkbyBub3RoaW5nLlxuICAgIC8vICAqIEByZXR1cm4gQSBtZXNzYWdlIChub3Qgb3BlcmF0aW9uKSB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvXG4gICAgLy8gICogdGhpcyBDcmR0IHRvZ2V0aGVyIHdpdGggYW55IHRpbWVzdGFtcFxuICAgIC8vICAqIHRvIGNhdXNlIGEgc3Ryb25nLXJlc2V0IG9wZXJhdGlvbiwgb3IgbnVsbCB0byBkb1xuICAgIC8vICAqIG5vdGhpbmcuICBGb3IgdGhpcyBDcmR0XG4gICAgLy8gICogdG8gYmUgY29ycmVjdCAoZXZlbnR1YWxseSBjb25zaXN0ZW50KSB3aGVuIHVzZWQgYXMgYVxuICAgIC8vICAqIHByb3BlcnR5IGluIGFuIENyZHRPYmplY3QsIHRoZSByZXR1cm5lZCBtZXNzYWdlXG4gICAgLy8gICogbXVzdCBzYXRpc2Z5OlxuICAgIC8vICAqIC0gd2hlbiBwYWlyZWQgd2l0aCBhbnkgQ2F1c2FsVGltZXN0YW1wLCBpdCBjb21tdXRlcyB3aXRoXG4gICAgLy8gICogY29uY3VycmVudCBtZXNzYWdlcyAodXN1YWwgQ3JkdCByZXF1aXJlbWVudCksIGluY2x1ZGluZ1xuICAgIC8vICAqIGNvbmN1cnJlbnQgcmVzZXRzIGFuZCBzdHJvbmctcmVzZXRzLlxuICAgIC8vICAqIE90aGVyd2lzZSwgaXQgaXMgZnJlZSB0byBoYXZlIGFueSBzZW1hbnRpY3MsIGluY2x1ZGluZ1xuICAgIC8vICAqIGRvaW5nIG5vdGhpbmcuICBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAvLyAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAvLyAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAvLyAgKi9cbiAgICAvLyBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKTogYW55IHtcbiAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciB0aGlzLnJ1bnRpbWUgd2hlbiBhbiBhdG9taWMgbGlzdCBvZlxuICAgICAqIG1lc3NhZ2VzIGlzIHJlY2VpdmVkIGZyb20gYW5vdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIHJlY2VpdmUobWVzc2FnZXMsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbiB0cmFuc2FjdGlvbjsgdGhlIHRyYW5zYWN0aW9uIG11c3QgXCIgK1xuICAgICAgICAgICAgICAgIFwiYmUgZW5kZWQgc3luY2hyb25vdXNseSBzbyB0aGF0IG1lc3NhZ2VzIFwiICtcbiAgICAgICAgICAgICAgICBcImNhbm5vdCBiZSByZWNlaXZlZCBpbiB0aGUgaW50ZXJpbS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uY2hhbmdlICYmIGRlc2NyaXB0aW9ucy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkID0gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNoYW5nZShuZXcgQ3JkdENoYW5nZUV2ZW50KHRoaXMsIHRyYW5zbGF0ZWQsIHRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0ID0gQ3JkdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfY29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ291bnRlcjIgPSBleHBvcnRzLkNvdW50ZXIyQWRkRXZlbnQgPSBleHBvcnRzLkNyZHQyID0gdm9pZCAwO1xuY2xhc3MgQ3JkdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgYXJncykge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB9XG59XG5jbGFzcyBDcmR0MiB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuICAgIGNhbGxSZW1vdGUobWV0aG9kLCAuLi5hcmdzKSB7XG4gICAgICAgIC8vIFNlcmlhbGl6ZSB0aGUgbWV0aG9kIG5hbWUgYW5kIGFyZ3NcbiAgICAgICAgLy8gRG8gdGhpcyBmaXJzdCBpbiBjYXNlIGNhbGxpbmcgbWV0aG9kIGNoYW5nZXMgdGhlbVxuICAgICAgICBsZXQgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG5ldyBDcmR0TWVzc2FnZShtZXRob2QubmFtZSwgYXJncykpO1xuICAgICAgICAvLyBDYWxsIHRoZSBsb2NhbCBmdW5jdGlvblxuICAgICAgICAvLyBAdHMtaWdub3JlOiBUaGlzIHNob3VsZCB3b3JrIGJ1dCBUUyBpcyBjb25mdXNlZCBieSBhcmdzW10gdnMgQW55XG4gICAgICAgIGxldCByZXN1bHQgPSBtZXRob2QuY2FsbCh0aGlzLCBmYWxzZSwgdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCksIC4uLmFyZ3MpO1xuICAgICAgICAvLyBTZW5kIG1lc3NhZ2Ugb24gdGhlIG5ldHdvcmtcbiAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQobWVzc2FnZSwgdGhpcy5pZCk7XG4gICAgICAgIC8vIFJldHVybiBsb2NhbCByZXN1bHRcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIHRoaXMucnVudGltZSB3aGVuIGFuIGF0b21pYyBsaXN0IG9mXG4gICAgICogbWVzc2FnZXMgaXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgcmVjZWl2ZShtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VPYmogPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZU9iai5tZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gVE9ETzogZG9uJ3QgdGhyb3cgaGVyZSwgdG8gYXZvaWQgbWVzc2luZ1xuICAgICAgICAgICAgLy8gd2l0aCBjYWxsZXIuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBwYXJzZSBDcmR0TWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlOiBDYWxsIG1ldGhvZCBieSBuYW1lXG4gICAgICAgIGxldCBtZXRob2QgPSB0aGlzW21lc3NhZ2VPYmoubWV0aG9kXTtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBkb24ndCB0aHJvdyBoZXJlLCB0byBhdm9pZCBtZXNzaW5nXG4gICAgICAgICAgICAvLyB3aXRoIGNhbGxlci5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBtZXRob2QgY2FsbGVkIHJlbW90ZWx5OiBcIiArIG1lc3NhZ2VPYmoubWV0aG9kKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBDaGVjayB0eXBlPyAgQXQgbGVhc3QgbWFrZSBzdXJlIGl0J3MgYSBmdW5jdGlvbj9cbiAgICAgICAgbWV0aG9kLmNhbGwodGhpcywgdHJ1ZSwgdGltZXN0YW1wLCAuLi5tZXNzYWdlT2JqLmFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdDIgPSBDcmR0MjtcbmNsYXNzIENvdW50ZXIyQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZUFkZGVkLCBuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMubmV3VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy50eXBlID0gXCJhZGRcIjtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXIyQWRkRXZlbnQgPSBDb3VudGVyMkFkZEV2ZW50O1xuY2xhc3MgQ291bnRlcjIgZXh0ZW5kcyBDcmR0MiB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsVmFsdWU7XG4gICAgfVxuICAgIHJlbW90ZUFkZChyZW1vdGVDYWxsZXIsIHRpbWVzdGFtcCwgdG9BZGQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSArPSB0b0FkZDtcbiAgICAgICAgaWYgKHJlbW90ZUNhbGxlciAmJiB0aGlzLm9uY2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLm9uY2hhbmdlKG5ldyBDb3VudGVyMkFkZEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgdG9BZGQsIHRoaXMuc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGQodG9BZGQpIHtcbiAgICAgICAgc3VwZXIuY2FsbFJlbW90ZSh0aGlzLnJlbW90ZUFkZCwgdG9BZGQpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ291bnRlcjIgPSBDb3VudGVyMjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRzMi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9qc29uXCIpLCBleHBvcnRzKTtcbi8vZXhwb3J0ICogZnJvbSAnLi9tdWx0aV9zZW1pZGlyZWN0Jztcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9yZXNldHRhYmxlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zdGFuZGFyZFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdHMyXCIpLCBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Kc29uQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHN0YW5kYXJkXzEgPSByZXF1aXJlKFwiLi9zdGFuZGFyZFwiKTtcbmNvbnN0IGJhc2ljX2NyZHRzXzEgPSByZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKTtcbmNsYXNzIEpzb25DcmR0IGV4dGVuZHMgc3RhbmRhcmRfMS5DcmR0T2JqZWN0IHtcbiAgICAvLyBUT0RPOiBhcnJheXMgKHNlcXVlbmNlcykuICBVc2VzIG1hcHMgZm9yIG5vdy5cbiAgICAvLyBUT0RPOiBudWxscz9cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHBhc3MgaW5pdGlhbCB2YWx1ZSAod2hpY2ggaXMgbm90IHN5bmNlZCkuXG4gICAgLy8gTW9yZSBnZW5lcmFsbHksIGFiaWxpdHkgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIHlvdXJcbiAgICAvLyBwcmVkZWZpbmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHN5bmNlZD9cbiAgICAvLyBVc2UgdGhlIGV4aXN0aW5nIGZsYWcgYW5kIGJsb2NrIG1lc3NhZ2VzIGluIENyZHRPYmplY3QuXG4gICAgY29uc3RydWN0b3IoY3JkdElkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmJvb2xlYW5zID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcImJvb2xlYW5zXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IHN0YW5kYXJkXzEuRW5hYmxlV2luc0ZsYWcoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5udW1iZXJzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcIm51bWJlcnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5JbnRSZWdpc3RlckNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcInN0cmluZ3NcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgYmFzaWNfY3JkdHNfMS5NdWx0aVZhbHVlUmVnaXN0ZXIoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5zZXRzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcInNldHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5BZGRXaW5zU2V0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMub2JqZWN0cyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJvYmplY3RzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IEpzb25DcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBDcmR0IHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgc3RvcmluZ1xuICAgICAqIHZhbHVlcyB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdHlwZUluZGljYXRvcixcbiAgICAgKiBvciB1bmRlZmluZWQgaWYgdGhlIGtleSBpcyBub3QgcHJlc2VudCAoaW5jbHVkaW5nXG4gICAgICogaWYgaXQgcHJldmlvdXNseSB3YXMgcHJlc2VudCBidXQgd2FzIHJlbW92ZWQpLlxuICAgICAqIChVc2UgaW5pdCBpbnN0ZWFkIGlmIHlvdSB3YW50IGEgZ3VhcmFudGVlZC1kZWZpbmVkXG4gICAgICogcmV0dXJuIHZhbHVlLilcbiAgICAgKiAoVE9ETzogZXhwbGFpbiBrZXlzIGFyZVxuICAgICAqIHNlZ3JlZ2F0ZWQgYnkgdmFsdWUgdHlwZSkuXG4gICAgICogRS5nLiBnZXQoXCJhXCIsIDApIHRvIGdldCB0aGUgbnVtYmVyIHZhbHVlIHdpdGgga2V5IDAuXG4gICAgICogU3RhbmRhcmQgdHlwZUluZGljYXRvciB2YWx1ZXM6XG4gICAgICogLSBmYWxzZTogYm9vbGVhbiAoRW5hYmxlV2luc0ZsYWcpXG4gICAgICogLSAwOiBudW1iZXIgKEludFJlZ2lzdGVyQ3JkdClcbiAgICAgKiAtIFwiXCI6IHN0cmluZyAoTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4pXG4gICAgICogLSBuZXcgU2V0KCk6IHNldCAoQWRkV2luc1NldClcbiAgICAgKiAtIHt9OiBvYmplY3QgKEpzb25DcmR0KVxuICAgICAqXG4gICAgICogVE9ETzogZXhwbGljdGx5IHR5cGVkIHZlcnNpb25zPyAgQ2FuIHdlIGRvIHRoaXMgY2xldmVybHlcbiAgICAgKiB3aXRoIGdlbmVyaWNzIGFuZCB0eXBlIHBvbHltb3JwaGlzbSBvciBzb21ldGhpbmc/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBnZXQoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXMoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ib29sZWFucy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmluZ3MuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBnZXQsIGJ1dCBpbnN0ZWFkIG9mIHJldHVybmluZyB0aGUgdmFsdWUgQ3JkdCxcbiAgICAgKiByZXR1cm5zIGl0cyB2YWx1ZS4gIE5vdGUgZm9yIHN0cmluZ3MsIGlmIHRoZSBDcmR0XG4gICAgICogZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSB2YWx1ZSAoZWl0aGVyIG9yIDIrKSxcbiAgICAgKiB3aGljaCBpcyBwb3NzaWJsZSBkdWUgdG8gdGhlIE11bHRpVmFsdWVSZWdpc3RlclxuICAgICAqIHNlbWFudGljcywgd2UgcmV0dXJuIHRoZSBzZXQgb2YgYWxsIGN1cnJlbnQgdmFsdWVzXG4gICAgICogaW5zdGVhZCBvZiBhIHNpbmdsZSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBUT0RPOiB1c2UgZ2VuZXJpY3MgdG8gc2F5IHRoYXQgcmV0dXJuIHZhbHVlIGlzXG4gICAgICogc2FtZSBhcyB0eXBlSW5kaWNhdG9yIHR5cGUgfCB1bmRlZmluZWQ/XG4gICAgICogV29ya3MgZXhjZXB0IGZvciBzdHJpbmdzLFxuICAgICAqIHdoaWNoIGNvdWxkIGluc3RlYWQgcmV0dXJuIGEgU2V0PHN0cmluZz4uXG4gICAgICogQ291bGQgaW5zdGVhZCBoYXZlIHNwZWNpZmljYWxseSB0eXBlZCB2ZXJzaW9ucyBvZiB0aGUgbWV0aG9kLlxuICAgICAqL1xuICAgIGdldFZhbHVlKGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5nZXQoa2V5LCB0eXBlSW5kaWNhdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlQ3JkdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDcmR0IGluc3RhbmNlb2YgYmFzaWNfY3JkdHNfMS5NdWx0aVZhbHVlUmVnaXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTZXQgPSB2YWx1ZUNyZHQudmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU2V0LnNpemUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcy9yZXZpdmVzIHRoZSBnaXZlbiBrZXkgd2l0aCB0aGUgaW5kaWNhdGVkIHR5cGUgaWZcbiAgICAgKiBuZWVkZWQsIG1ha2luZyBpdCBwcmVzZW50IGluIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHRoZSB2YWx1ZSBDcmR0LlxuICAgICAqL1xuICAgIGluaXQoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIC8vIFRPRE86IGNhbiB3ZSBnZW5lcmlmeSB0aGlzIGZ1bmN0aW9uIHBhdHRlcm4/XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgdG8gYSBjb3B5IG9mIHRoZSBnaXZlblxuICAgICAqIChub24tQ3JkdCkgdmFsdWUsIHVzaW5nIHRoZSBDcmR0J3MgLnZhbHVlID0gbWV0aG9kLlxuICAgICAqIFRoaXMgZ2VuZXJhbGx5IGhhcyB0aGUgZWZmZWN0IG9mIHJlc2V0dGluZyB0aGUgY3VycmVudCBDcmR0XG4gICAgICogYW5kIHRoZW4gcGVyZm9ybWluZyBvcGVyYXRpb25zIHRvIGRyaXZlIGl0IHRvIHRoZSBkZXNpcmVkXG4gICAgICogdmFsdWUuICBJZiB5b3Ugd2FudCBtb3JlIGNvbnRyb2wgb3ZlciBob3cgdGhlIHZhbHVlIGlzIHNldFxuICAgICAqIChlLmcuLCBwYXNzaW5nIGFuIG9wdGlvbiB0byBKc29uQ3JkdC5nZXRBc09iamVjdCB3aGVuIHNldHRpbmdcbiAgICAgKiBhbiBvYmplY3QncyB2YWx1ZSksIHlvdSBjYW4gaW5zdGVhZCBnZXQgdGhlIENyZHQgd2l0aFxuICAgICAqIHRoaXMuaW5pdChrZXksIHZhbHVlKSBhbmQgdGhlbiBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaXRcbiAgICAgKiBkaXJlY3RseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB2YWx1ZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIHZhbHVlIENyZHQgKHRoaXMuZ2V0KGtleSwgdmFsdWUpKS5cbiAgICAgKi9cbiAgICBzZXRWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuICAgIHNldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5pbml0KGtleSwgdmFsdWUpO1xuICAgICAgICB2YWx1ZUNyZHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG4gICAga2V5c0J5VHlwZSh0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3Mua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMua2V5cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMua2V5cygpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gQXJyYXkgb2YgW2tleSwgdHlwZSBuYW1lXSBwYWlyc1xuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuYm9vbGVhbnMua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJib29sZWFuXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMubnVtYmVycy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcIm51bWJlclwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnN0cmluZ3Mua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJzdHJpbmdcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zZXRzLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwic2V0XCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub2JqZWN0cy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcIm9iamVjdFwiXSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBjaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGUpIHtcbiAgICAgICAgaWYgKCEoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcyB8fFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QgfHxcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBrZXlDb25mbGljdFJ1bGU6IFwiICtcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoaXMgQ3JkdCdzIHZhbHVlIGluIE9iamVjdCBmb3JtLlxuICAgICAqIENoYW5naW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBDcmR0IHN0YXRlLlxuICAgICAqIE5vdGUgdGhhdCBzZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gSmF2YXNjcmlwdCBTZXRzLFxuICAgICAqIHJlc3VsdGluZyBpbiBhIG5vdC1xdWl0ZS1KU09OIGZvcm1hdCBvYmplY3QuXG4gICAgICogQSBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVyIGlzIGNvbnZlcnRlZCB0byBhIHN0cmluZyBpZiBpdCBoYXNcbiAgICAgKiBhIHNpbmdsZSB2YWx1ZTsgb3RoZXJ3aXNlICgwIG9yIDIrIHZhbHVlcykgaXRcbiAgICAgKiBpcyBjb252ZXJ0ZWQgdG8gYSBTZXQ8c3RyaW5nPlxuICAgICAqIChBcnJheTxzdHJpbmc+IGlmIHNldHNBc0FycmF5cz10cnVlKVxuICAgICAqIG9mIGFsbCBjdXJyZW50IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5Q29uZmxpY3RSdWxlPUpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgKiBQb2xpY3kgZm9yIGhhbmRsaW5nIGtleXMgb2YgZGlmZmVyZW50IHR5cGVzIHRoYXQgaGF2ZSB0aGVcbiAgICAgKiBzYW1lIG5hbWUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KTogdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3QuXG4gICAgICogLSBQcmVmaXhUeXBlczogcHJlZml4IHRoZSB0eXBlIG5hbWUgZm9sbG93ZWQgYnkgXCI6XCIgdG8gZWFjaCBrZXksXG4gICAgICogZS5nLiBcIm51bWJlcjpteUtleVwiLiAgVHlwZSBuYW1lcyBhcmUgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsXG4gICAgICogXCJzdHJpbmdcIiwgXCJzZXRcIiwgXCJvYmplY3RcIi5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IGlmIHRoZXJlIGlzIGEgY29uZmxpY3Qgb25cbiAgICAgKiBhIGtleSwgc2V0IGl0cyB2YWx1ZSB0byBlcXVhbCBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIG9mXG4gICAgICogdGhlIGNvbmZsaWN0aW5nIHZhbHVlcywgcGx1cyBhIGZsYWcgXCJqc29uQ3JkdEtleUV4cGFuZGVkID0gdHJ1ZVwiLiAgRS5nLlxuICAgICAqIFwibXlLZXlcIjoge1wianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLCBcInN0cmluZ1wiOiBcInN0cmluZ1ZhbHVlXCIsXG4gICAgICogXCJudW1iZXJcIjogN31cbiAgICAgKiBAcGFyYW0gc2V0c0FzQXJyYXlzID0gZmFsc2UgSWYgdHJ1ZSwgU2V0IHZhbHVlcyBhcmUgY29udmVydGVkXG4gICAgICogdG8gYXJyYXlzLCBzbyB0aGF0IHRoZSByZXN1bHRpbmcgT2JqZWN0IGlzIGluIHJlZ3VsYXIgSlNPTlxuICAgICAqIGZvcm1hdC4gIFRoaXMgaW5jbHVkZXMgU2V0PHN0cmluZz4gdmFsdWVzIHJlc3VsdGluZyBmcm9tXG4gICAgICogc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlcnMgdGhhdCBoYXZlIDAgb3IgMisgdmFsdWVzLlxuICAgICAqL1xuICAgIGdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgc2V0c0FzQXJyYXlzID0gZmFsc2UpIHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgbGV0IG9iamVjdCA9IHt9O1xuICAgICAgICAvLyBNYXBzIGtleXMgdG8gdGhlIG5hbWUgb2YgdGhlaXIgZmlyc3QgdHlwZVxuICAgICAgICBsZXQga2V5c1NvRmFyID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgY29uZmxpY3RlZEtleXNTb0ZhciA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuYm9vbGVhbnMsIFwiYm9vbGVhblwiLCB2YWx1ZSA9PiB2YWx1ZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLm51bWJlcnMsIFwibnVtYmVyXCIsIHZhbHVlID0+IHZhbHVlLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc3RyaW5ncywgXCJzdHJpbmdcIiwgdmFsdWUgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLnZhbHVlU2V0O1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5zaXplID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAoc2V0c0FzQXJyYXlzID8gWy4uLnJlc3VsdC52YWx1ZXMoKV0gOiByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc2V0cywgXCJzZXRcIiwgdmFsdWUgPT4gKHNldHNBc0FycmF5cyA/IFsuLi52YWx1ZS52YWx1ZV0gOiB2YWx1ZS52YWx1ZSkpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5vYmplY3RzLCBcIm9iamVjdFwiLCB2YWx1ZSA9PiB2YWx1ZS5nZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUsIHNldHNBc0FycmF5cykpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBnZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIG1hcCwgdHlwZU5hbWUsIHZhbHVlRnVuYykge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgbWFwLmtleXMoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVGdW5jKG1hcC5nZXQoa2V5KSk7XG4gICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIG9iamVjdFt0eXBlTmFtZSArIFwiOlwiICsga2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gS2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBrZXk6IFwiICsga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIHdoZW4ga2V5Q29uZmxpY3RSdWxlPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29uZmxpY3RlZEtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhwYW5kIHRoZSBleGlzdGluZyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmxpY3RlZEtleXNTb0Zhci5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHBhbmRlZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFtrZXlzU29GYXIuZ2V0KGtleSldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IGV4cGFuZGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldW3R5cGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAga2V5c1NvRmFyLnNldChrZXksIHR5cGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhpcyBvYmplY3QgYW5kIHRoZW4gcGVyZm9ybXMgb3BlcmF0aW9ucyB0b1xuICAgICAqIGRyaXZlIGl0cyB2YWx1ZSB0byB0aGUgZ2l2ZW4gSlNPTi1saWtlIE9iamVjdC5cbiAgICAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBib29sZWFucywgbnVtYmVycywgc3RyaW5ncyxcbiAgICAgKiBTZXRzLCBvciBvYmplY3RzIGFyZSBpZ25vcmVkOyBvYmplY3RzIGJlc2lkZXMgU2V0c1xuICAgICAqIGFyZSBwcm9jZXNzZWQgcmVjdXJzaXZlbHkuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogSWYgbmV3VmFsdWUgY29tZXMgZnJvbSBhIEpzb25DcmR0J3MgLnZhbHVlIG9yIGdldEFzT2JqZWN0XG4gICAgICogbWV0aG9kcywgbm90ZSB0aGF0IHNldHMvYXJyYXlzIG9mIHN0cmluZ3MgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBtdWx0aS12YWx1ZSByZWdpc3RlcnMgd2lsbCBiZSB0cmVhdGVkIGFzIHNldHMsIG5vdFxuICAgICAqIHN0cmluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG5ld1ZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdG8uXG4gICAgICogQHBhcmFtIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XG4gICAgICogSWYgbmV3VmFsdWUgd2FzIGdlbmVyYXRlZCBieSBnZXRBc09iamVjdCwgdGhlIGtleUNvbmZsaWN0UnVsZVxuICAgICAqIHVzZWQgdG8gZ2VuZXJhdGUgaXQsIHNvIHRoYXQgd2UgY2FuIHVuZG8gdGhlIGVmZmVjdFxuICAgICAqIG9mIHRoYXQgcnVsZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiBrZXlzIGFuZCB2YWx1ZXMgYXJlIHVzZWQgbGl0ZXJhbGx5LFxuICAgICAqIHdpdGggaW5mZXJyZWQgdHlwZXMuXG4gICAgICogVGhpcyBpcyBhcHByb3ByaWF0ZSBmb3IgT2JqZWN0cyBub3QgY29taW5nIGZyb20gYSBKc29uQ3JkdCdzXG4gICAgICogZ2V0QXNPYmplY3QgZnVuY3Rpb24sIGluIHdoaWNoIHdlIHdhbnQgdG8ga2VlcCBrZXlzIGFzXG4gICAgICogdGhleSBhcmUuXG4gICAgICogLSBQcmVmaXhUeXBlczogVHlwZXMgYXJlIHRha2VuIGZyb20gcHJlZml4ZXMgb24ga2V5cy4gIElmIGFcbiAgICAgKiBrZXkgZG9lcyBub3QgaGF2ZSBhIHR5cGUgcHJlZml4LCBpdCBpcyBpZ25vcmVkLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogb2JqZWN0cyB3aXRoIGEgcHJvcGVydHkgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIgc2V0XG4gICAgICogdG8gdHJ1ZSBhcmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHJlc3VsdCBvZiBleHBhbmRpbmcgYVxuICAgICAqIGtleSBkdWUgdG8gYSBjb25mbGljdC4gIElmIHN1Y2ggYW4gb2JqZWN0IGRvZXMgbm90IGhhdmVcbiAgICAgKiB0aGUgZXhwZWN0ZWQgZm9ybWF0LCBhbnkgcHJvcGVydGllcyB3aXRoIHVucmVjb2duaXplZCBuYW1lc1xuICAgICAqIGFyZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHNldFRvT2JqZWN0KG5ld1ZhbHVlLCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwobmV3VmFsdWUsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIG9wZXJhdGlvbnMgdG8gZHJpdmUgdGhpcyBDcmR0J3MgdmFsdWUgdG8gdGhlXG4gICAgICogZ2l2ZW4gSlNPTi1saWtlIE9iamVjdCdzIHN0YXRlLCBidXQgd2l0aG91dCByZXNldHRpbmdcbiAgICAgKiB0aGUgY3VycmVudCB2YWx1ZS4gIFRoZSBtYWluIGVmZmVjdCBvZiB0aGlzIGlzIHRvXG4gICAgICogbWVyZ2Uga2V5czsgaW4gY2FzZSBvZiBrZXkgY29uZmxpY3RzLCB0aGUgdmFsdWVzIGFyZSBtZXJnZWRcbiAgICAgKiBpbiBhIHR5cGUtc3BlY2lmaWMgd2F5IChUT0RPOiBkZXRhaWxzKS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBpcyBub3QgYSBtZXJnZSBpbiB0aGUgc2Vuc2Ugb2YgYSBzdGF0ZS1iYXNlZCBDcmR0LlxuICAgICAqIEluc3RlYWQsIGl0IHRoZSBDcmR0IHZlcnNpb24gb2YgbWVyZ2luZyBvcmRpbmFyeSAobm9uLUNyZHQpXG4gICAgICogT2JqZWN0cywgYnkgcmVjdXJzaXZlbHkgY29tYmluaW5nIHRoZWlyIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHNldFRvT2JqZWN0IGZvciBkaXNjbGFpbWVycyBhbmRcbiAgICAgKiBvdGhlcktleUNvbmZsaWN0UnVsZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIGNoYW5nZXM/XG4gICAgICogQHBhcmFtICBvdGhlciBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgbWVyZ2VPYmplY3Qob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBtZXJnZU9iamVjdEludGVybmFsKG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIC8vIEV4dHJhY3QgcHJvcGVydGllcyBhcyBhbiBhcnJheSBvZiBbbmFtZSwgdHlwZSwgdmFsdWVdXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gW107XG4gICAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIG90aGVyKSB7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb3RoZXJbcHJvcE5hbWVdO1xuICAgICAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gcHJvcE5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBwcm9wTmFtZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBwcm9wTmFtZS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gTXVsdGktdmFsdWVkIHN0cmluZ3MgYXJlIHRyZWF0ZWQgYXMgc2V0c1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCB0eXBlLCBvdGhlcltwcm9wTmFtZV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIHByb3BlcnRpZXMgbWF5IGdyb3cgZHVyaW5nIGV4ZWN1dGlvbiBkdWUgdG9cbiAgICAgICAgLy8gdW5wYWNraW5nIGV4cGFuZGVkIGtleXMuXG4gICAgICAgIGxldCBvcmlnaW5hbExlbmd0aCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IHByb3BlcnRpZXNbaV1bMF07XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHByb3BlcnRpZXNbaV1bMV07XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gcHJvcGVydGllc1tpXVsyXTtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhbiBleHBhbmRlZCBrZXlcbiAgICAgICAgICAgIGlmIChvdGhlcktleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCAmJlxuICAgICAgICAgICAgICAgIGkgPCBvcmlnaW5hbExlbmd0aCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWVbXCJqc29uQ3JkdEtleUV4cGFuZGVkXCJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gVW5wYWNrIHRoZSBvYmplY3Qgb250byB0aGUgZW5kIG9mIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBleHBhbmRlZE5hbWUgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBhbmRlZE5hbWUgIT09IFwianNvbkNyZHRLZXlFeHBhbmRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCBleHBhbmRlZE5hbWUsIHByb3BWYWx1ZVtleHBhbmRlZE5hbWVdXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBwcm9wZXJ0eSwgY2hlY2tpbmcgdGhhdCBpdCdzIHR5cGVcbiAgICAgICAgICAgICAgICAvLyBpcyBvbmUgd2UgZXhwZWN0LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3Q6IG1lcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQocHJvcE5hbWUsIHt9KS5tZXJnZU9iamVjdEludGVybmFsKHByb3BWYWx1ZSwgb3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmc6IG92ZXJ3cml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUludGVybmFsKHByb3BOYW1lLCBwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwic2V0XCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0OiBhZGQgYWxsIHZhbHVlcyBpbiBzZXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldENyZHQgPSB0aGlzLmluaXQocHJvcE5hbWUsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHByb3BWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENyZHQuYWRkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBza2lwIHRoZSBlbnRyeSAobm90IGEgcmVjb2duaXplZCB0eXBlKS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgdGhpcy5nZXRBc09iamVjdCgpLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXNPYmplY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuc2V0QXNPYmplY3QobmV3VmFsdWUpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldFRvT2JqZWN0KG5ld1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkpzb25DcmR0ID0gSnNvbkNyZHQ7XG4vLyBUT0RPOiBkZWxldGVcbi8vIFRPRE86IGRlbGV0ZVN0cm9uZyAob25jZSBtYXAgc3VwcG9ydHMgaXQuICBQZXJoYXBzIHRocm93XG4vLyBlcnJvciBvbiBtYXAgdmFsdWVzIG9ubHk/KVxuSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0ID0gMTtcbkpzb25DcmR0LlByZWZpeFR5cGVzID0gMjtcbkpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QgPSAzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVmYXVsdFJlc2V0dGFibGVDcmR0ID0gZXhwb3J0cy5PYnNlcnZlZFJlc2V0Q29tcG9uZW50ID0gZXhwb3J0cy5EZWZhdWx0UmVzZXRXaW5zQ3JkdCA9IGV4cG9ydHMuUmVzZXRXaW5zQ29tcG9uZW50ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuLy8gVE9ETzogaG93IHRvIGRvIGdhcmJhZ2UgY29sbGVjdGlvbiBvZiByZXNldC13aW5zIG9wZXJhdGlvbnM/XG4vLyBFLmcuIGZvciBmbGFncyBpbiBhIHNldDogZ2FyYmFnZSBjb2xsZWN0aW9uIHdpbGwgZmFpbCBpZlxuLy8gdGhlcmUgYXJlIHJlc2V0LXdpbnMgb3BzIGluIHRoZSBoaXN0b3J5LCBhcyBpdCBzaG91bGQsIGJ1dFxuLy8gd2Ugd291bGQgbGlrZSB0byBnYXJiYWdlIGNvbGxlY3QgYW55d2F5IG9uY2UgYWxsIHRoZSByZXNldC13aW5zXG4vLyBhcmUgY2F1c2FsbHkgc3RhYmxlLlxuY2xhc3MgUmVzZXRXaW5zQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHQgPSBvcmlnaW5hbENyZHQ7XG4gICAgICAgIHRoaXMucmVzZXRJbml0aWFsRGF0YSA9IHJlc2V0SW5pdGlhbERhdGE7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBhbHdheXMgXCJyZXNldFwiLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBfc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSB3ZSBzaG91bGQgcmV0dXJuIGEgY2xvbmUgb2YgdGhlIHJlc2V0IHN0YXRlLCBub3RcbiAgICAgICAgLy8gYSBmaXhlZCBcInJlc2V0IHN0YXRlXCIsIHNpbmNlIHRoZSByZXR1cm5lZCBzdGF0ZSBtYXlcbiAgICAgICAgLy8gYmUgbXV0YXRlZCBsYXRlci5cbiAgICAgICAgcmV0dXJuIFt0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKSwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvKG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwob3JpZ2luYWxDcmR0LCBuZXcgUmVzZXRXaW5zQ29tcG9uZW50KG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSksIChfbTIsIF9tMSkgPT4gbnVsbCwgMSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG59XG5leHBvcnRzLlJlc2V0V2luc0NvbXBvbmVudCA9IFJlc2V0V2luc0NvbXBvbmVudDtcbmNsYXNzIERlZmF1bHRSZXNldFdpbnNDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gUmVzZXRXaW5zQ29tcG9uZW50LmFkZFRvKG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWxSZXNldFdpbnMgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXRTdHJvbmcoKSB7XG4gICAgICAgIHN1cGVyLmFwcGx5T3AodGhpcy5nZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0U3Ryb25nTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFsyLCBcInJlc2V0XCJdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSBvcGVyYXRpb25zIGludGVuZGVkIGZvciB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsLFxuICAgICAqIGJ5IHRyYW5zbGF0aW5nIHRoZW0gZm9yIHRoZSByZXNldHRhYmxlIENSRFQgYW5kIGNhbGxpbmdcbiAgICAgKiBzdXBlci5hcHBseU9wcy5cbiAgICAgKi9cbiAgICBhcHBseU9wKG9wZXJhdGlvbikge1xuICAgICAgICByZXR1cm4gc3VwZXIuYXBwbHlPcChbMSwgb3BlcmF0aW9uXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YmNsYXNzZXMgdGhhdCB3YW50IHRvIHRyYW5zbGF0ZSBvcGVyYXRpb25zIGZyb21cbiAgICAgKiB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsIHNob3VsZCBvdmVycmlkZVxuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGEgcmVzZXQtd2lucyBvcGVyYXRpb24gaXNcbiAgICAgKiBbXCJyZXNldFN0cm9uZ1wiXSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGl0IGNoYW5nZWQgdGhlIHN0YXRlLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9wZXJhdGlvbiB0aGF0IGdldHMga2lsbGVkIGJ5XG4gICAgICogYSBjb25jdXJyZW50IHJlc2V0LXdpbnMgaXMgc2tpcHBlZC5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcmlnaW5hbENyZHRJbnRlcm5hbFxuICAgICAqIG9wZXJhdGlvbnMgaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLFxuICAgICAqIHdoaWNoIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zLCBvciBudWxsIGlmIGFsbFxuICAgICAqIGRlc2NyaXB0aW9ucyBhcmUgbnVsbC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gW107XG4gICAgICAgIGZvciAobGV0IGRlc2Mgb2YgZGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZGVzYyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXdpbnMgZGVzY3JpcHRpb24gaXMgWzIsIFwicmVzZXRcIl1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDIgJiYgZGVzY1sxXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKFtcInJlc2V0U3Ryb25nXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG9yaWdpbmFsQ3JkdE9wZXJhdGlvbiBpcyBvZiB0aGUgZm9ybSBbMSwgZGVzY11cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzY1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzYykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVkLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnModHJhbnNsYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucyhkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG4gICAgZ2V0IG9yaWdpbmFsU3RhdGVSZXNldFdpbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZhdWx0UmVzZXRXaW5zQ3JkdCA9IERlZmF1bHRSZXNldFdpbnNDcmR0O1xuLy8gVE9ETzogcmVuYW1lIG9yaWdpbmFsQ3JkdEludGVybmFsIChhYm92ZSkgYW5kIG9yaWdpbmFsQ3JkdFxuLy8gdG8gcmVmbGVjdCByZXNldC13aW5zIHZzIHJlc2V0LCB0byBhdm9pZCBjb25mdXNpb24uXG5jbGFzcyBPYnNlcnZlZFJlc2V0Q29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHQgPSBvcmlnaW5hbENyZHQ7XG4gICAgICAgIHRoaXMucmVzZXRJbml0aWFsRGF0YSA9IHJlc2V0SW5pdGlhbERhdGE7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBbXCJyZXNldFwiLCBsaXN0IG9mXG4gICAgICogdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieSBvcmlnaW5hbENyZHQgd2hlbiBwcm9jZXNzaW5nXG4gICAgICogdGhlIG1lc3NhZ2VzIGFwcGVhcmluZyBpbiBtZXNzYWdlIChpLmUuLCB0aGUgbWVzc2FnZXMgdGhhdFxuICAgICAqIGF2b2lkZWQgYmVpbmcgcmVzZXQgYmVjYXVzZSB0aGV5IHdlcmUgY29uY3VycmVudCB0byB0aGVcbiAgICAgKiByZXNldCBvcGVyYXRpb24pXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgX3N0YXRlLCByZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IHJlc2V0U3RhdGUgPSB0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBjb25jdXJyZW50TWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5vcmlnaW5hbENyZHQuZWZmZWN0KGNvbmN1cnJlbnRNZXNzYWdlWzBdLCByZXNldFN0YXRlLCByZXBsaWNhSWQsIGNvbmN1cnJlbnRNZXNzYWdlWzFdKTtcbiAgICAgICAgICAgIHJlc2V0U3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBkZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmVzZXRTdGF0ZSwgW1wicmVzZXRcIiwgZGVzY3JpcHRpb25zXV07XG4gICAgfVxuICAgIHN0YXRpYyBhZGRUbyhvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChuZXcgT2JzZXJ2ZWRSZXNldENvbXBvbmVudChvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpLCBvcmlnaW5hbENyZHQsIChtMiwgbTEpID0+IHsgbTEucHVzaChtMik7IHJldHVybiBtMTsgfSwgMiwgdHJ1ZSwgdHJ1ZSwga2VlcE9ubHlNYXhpbWFsKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmVkUmVzZXRDb21wb25lbnQgPSBPYnNlcnZlZFJlc2V0Q29tcG9uZW50O1xuY2xhc3MgRGVmYXVsdFJlc2V0dGFibGVDcmR0IGV4dGVuZHMgRGVmYXVsdFJlc2V0V2luc0NyZHQge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhLCBydW50aW1lLCBpbml0aWFsRGF0YSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudC5hZGRUbyhvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwga2VlcE9ubHlNYXhpbWFsKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCByZXNldEluaXRpYWxEYXRhLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgb3AgaWYgd2UncmUgYWxyZWFkeSByZXNldCAob2theSBnaXZlblxuICAgICAgICAvLyBvYnNlcnZlLXJlc2V0IHNlbWFudGljcykuXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCkpIHtcbiAgICAgICAgICAgIHN1cGVyLmFwcGx5T3AoWzEsIFwicmVzZXRcIl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gTm90ZSBoZXJlIHdlIGhhdmUgdG8gYWNjb3VudCBmb3IgdGhlIHJlc2V0LXdpbnMgbGF5ZXJcbiAgICAgICAgLy8gKGl0J3Mgbm90IHdyYXBwZWQgYXV0b21hdGljYWxseSBsaWtlIGluIHN1cGVyLmFwcGx5T3BzKS5cbiAgICAgICAgcmV0dXJuIFsxLCBbMSwgW11dXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgYXBwbHlPcChvcGVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzIsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlIGluc3RlYWQgb2YgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBUcmFuc2xhdGVzIGludGVybmFsIChzZW1pZGlyZWN0IHByb2R1Y3QtYmFzZWQpIGRlc2NyaXB0aW9uc1xuICAgICAqIHNvIHRoYXQ6XG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb2JzZXJ2ZWQtcmVzZXQgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRcIiwgW1RPRE86IHJlLWFwcGxpZWQgb3BzXV0uXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBpcyB1bmNoYW5nZWQsIGV4Y2VwdCBmb3IgbnVsbCBkZXNjcmlwdGlvbnMsIHdoaWNoXG4gICAgICogYXJlIHNraXBwZWQuXG4gICAgICogVGhlbiByZXR1cm5zIHRoZSByZXN1bHQgb2YgcGFzc2luZyB0aGlzIGxpc3QgdG9cbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlLCBvciBudWxsIGlmIGFsbFxuICAgICAqIGRlc2NyaXB0aW9ucyBhcmUgbnVsbC5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gW107XG4gICAgICAgIGZvciAobGV0IGRlc2Mgb2YgZGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoZGVzYyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIFJlc2V0LXN0cm9uZyAoYWxyZWFkeSB0cmFuc2xhdGVkIGJ5IERlZmF1bHRSZXNldFdpbnNDcmR0KVxuICAgICAgICAgICAgLy8gZGVzY3JpcHRpb24gaXMgXCJyZXNldFN0cm9uZ1wiXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goZGVzYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPYnNlcnZlZCByZXNldCBkZXNjcmlwdGlvbiBpcyBbMSwgW1wicmVzZXRcIixcbiAgICAgICAgICAgIC8vIGxpc3Qgb2YgcmUtYXBwbGllZCBvcHNdXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMSAmJiBkZXNjWzFdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBpbiB0aGUgc2Vjb25kIGVudHJ5LCBwdXQgdGhlIHRyYW5zbGF0ZWRcbiAgICAgICAgICAgICAgICAvLyBvcGVyYXRpb25zIHRoYXQgZGlkbid0IGdldCByZXNldC4gIEtlZXAgaW5cbiAgICAgICAgICAgICAgICAvLyBtaW5kIHRoYXQgdGhlc2Ugd2lsbCBiZSBkZXNjcmlwdGlvbnMgZnJvbSB0aGVcbiAgICAgICAgICAgICAgICAvLyBpbm5lcm1vc3Qgc2VtaWRpcmVjdCBwcm9kdWN0LiAgV2hhdCB0byBkb1xuICAgICAgICAgICAgICAgIC8vIGFib3V0IG9wZXJhdGlvbnMgdGhhdCB3ZXJlIG9yaWdpbmFsbHkgZ3JvdXBlZFxuICAgICAgICAgICAgICAgIC8vIGF0b21pY2FsbHksIHNpbmNlIHRyYW5zbGF0ZSBleHBlY3RzIHRob3NlXG4gICAgICAgICAgICAgICAgLy8gdG8gYmUgZGVsaXZlcmVkIHRvZ2V0aGVyP1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFwiLCBkZXNjWzFdWzFdXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzIsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSh0cmFuc2xhdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpbnN0ZWFkIG9mIHRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKiBTZWUgQ3JkdC50cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG4gICAgZ2V0IG9yaWdpbmFsU3RhdGVSZXNldHRhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZhdWx0UmVzZXR0YWJsZUNyZHQgPSBEZWZhdWx0UmVzZXR0YWJsZUNyZHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNldHRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EaXJlY3RJbnRlcm5hbCA9IGV4cG9ydHMuU2VtaWRpcmVjdEludGVybmFsID0gZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSB2b2lkIDA7XG4vLyBUT0RPOiBmdXR1cmUgb3B0czogaW5kZXhlZCBtZXNzYWdlczsgc2V0dGluZyB0aGUgaGlzdG9yeVxuLy8gdG8gYSBzdWJzZXQ7IGNhdXNhbCBzdGFiaWxpdHkuXG4vLyBUT0RPOiBmb3IgdGhpcyB0byB3b3JrLCByZXBsaWNhSWQncyBtdXN0IGJlIGNvbXBhcmFibGUgYWNjb3JkaW5nXG4vLyB0byB0aGUgc2FtZS1lcXVhbHMgYXBwcm9hY2guICBUeXBpY2FsbHksIHRoaXMgcmVxdWlyZXMgdGhlbVxuLy8gdG8gYmUgcHJpbWl0aXZlIHR5cGVzLCBhcyBvYmplY3RzIHdoaWNoIGFyZSBlcXVhbC12YWx1ZWQgYnV0IGhhdmVcbi8vIGRpZmZlcmVudCBwb2ludGVycyB3aWxsIGJlIGNvbnNpZGVyZWQgZGlmZmVyZW50LlxuLy8gVE9ETzogbWVudGlvbiB0aGF0IHRvIGdldCBhIHByb3BlciBDUkRUIChlcXVhbCBpbnRlcm5hbCBzdGF0ZXMpLFxuLy8gd2UgdGVjaG5pY2FsbHkgbXVzdCBjb21wYXJlIHJlY2VpcHQgb3JkZXJzIGFzIGVxdWl2YWxlbnQgaWZcbi8vIHRoZXkgYXJlIGJvdGggaW4gY2F1c2FsIG9yZGVyLlxuY2xhc3MgU2VtaWRpcmVjdFN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihpbnRlcm5hbFN0YXRlLCBoaXN0b3J5VGltZXN0YW1wcywgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgdGhpcy5pbnRlcm5hbFN0YXRlID0gaW50ZXJuYWxTdGF0ZTtcbiAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA9IGhpc3RvcnlUaW1lc3RhbXBzO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogTWFwcyBhIHJlcGxpY2EgaWQgdG8gYW4gYXJyYXkgb2YgbWVzc2FnZXMgc2VudCBieSB0aGF0XG4gICAgICAgICAqIHJlcGxpY2EsIGluIG9yZGVyLiAgU3BlY2lmaWNhbGx5LCBhcnJheSBlbGVtZW50cyBhcmUgdHVwbGVzXG4gICAgICAgICAqIFtwZXItc2VuZGVyIG1lc3NhZ2UgY291bnRlciwgdGhpcyByZXBsaWNhJ3MgcmVjZWlwdCBjb3VudGVyLFxuICAgICAgICAgKiBtZXNzYWdlXS4gIEtlZXAgaW4gbWluZCB0aGF0IHBlci1zZW5kZXIgbWVzc2FnZVxuICAgICAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gQ3JkdFJ1bnRpbWUgYW5kIGJldHdlZW5cbiAgICAgICAgICogYSBzZW1pZGlyZWN0IHByb2R1Y3QgYW5kIGl0cyBjb21wb25lbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgbWVzc2FnZSB0byB0aGUgaGlzdG9yeSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAuXG4gICAgICogcmVwbGljYUlkIGlzIG91ciByZXBsaWNhIGlkLlxuICAgICAqL1xuICAgIGFkZChyZXBsaWNhSWQsIG1lc3NhZ2UsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAodGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpO1xuICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW5kZXJIaXN0b3J5ID0gW107XG4gICAgICAgICAgICB0aGlzLmhpc3Rvcnkuc2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgc2VuZGVySGlzdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1lc3NhZ2VNYXliZVdpdGhUaW1lc3RhbXAgPSB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzID9cbiAgICAgICAgICAgIFttZXNzYWdlLCB0aW1lc3RhbXBdIDogbWVzc2FnZTtcbiAgICAgICAgc2VuZGVySGlzdG9yeS5wdXNoKFt0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpLCB0aGlzLnJlY2VpcHRDb3VudGVyLCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wXSk7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIrKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHRydWUsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc3BlY2lmaWVkIGFjdGlvbnMgb24gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5OlxuICAgICAqIC0gaWYgcmV0dXJuQ29uY3VycmVudCBpcyB0cnVlLCByZXR1cm5zIHRoZSBsaXN0IG9mXG4gICAgICogYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGltZXN0YW1wLCBpblxuICAgICAqIHJlY2VpcHQgb3JkZXIuXG4gICAgICogLSBpZiBkaXNjYXJkRG9taW5hdGVkIGlzIHRydWUsIGRlbGV0ZXMgYWxsIG1lc3NhZ2VzIGZyb21cbiAgICAgKiB0aGUgaGlzdG9yeSB3aG9zZSB0aW1lc3RhbXBzIGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnlcbiAgICAgKiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gdGltZXN0YW1wLiAgKE5vdGUgdGhhdCB0aGlzIG1lYW5zIHRoYXRcbiAgICAgKiBpZiB3ZSB3YW50IHRvIGtlZXAgYSBtZXNzYWdlIHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcCBpblxuICAgICAqIHRoZSBoaXN0b3J5LCBpdCBtdXN0IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IGFmdGVyIGNhbGxpbmdcbiAgICAgKiB0aGlzIG1ldGhvZC4pXG4gICAgICovXG4gICAgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudCwgZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPSBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyIChpLmUuLFxuICAgICAgICAgICAgLy8gYnkgdGhlIHNlY29uZCBlbnRyeSBpbiBlYWNoIHRyaXBsZSkuXG4gICAgICAgICAgICBjb25jdXJyZW50LnNvcnQoKGEsIGIpID0+IChhWzFdIC0gYlsxXSkpO1xuICAgICAgICAgICAgLy8gU3RyaXAgYXdheSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgbWVzc2FnZXMuXG4gICAgICAgICAgICByZXR1cm4gY29uY3VycmVudC5tYXAoYSA9PiBhWzJdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbWVzc2FnZXMgc3RvcmVkIGluIHRoZSBoaXN0b3J5LFxuICAgICAqIGkuZS4sIGVpdGhlciB0aGVyZSBoYXZlIGJlZW4gbm8gY3JkMSBtZXNzYWdlcywgb3JcbiAgICAgKiBvdXIgU2VtaWRpcmVjdEludGVybmFsJ3MgaGlzdG9yeUtlZXBPbmx5Q29uY3VycmVudCBmbGFnIGlzIHRydWVcbiAgICAgKiBhbmQgYWxsIGNyZHQxIG1lc3NhZ2VzIGhhdmUgYmVlbiBjYXVzYWxseSBsZXNzIHRoYW4gYSBjcmR0MlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgaXNIaXN0b3J5RW1wdHkoKSB7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuaGlzdG9yeS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIGZvciB3b3JraW5nIHdpdGggdGhlIHBlci1zZW5kZXIgaGlzdG9yeVxuICAgICAqIGFycmF5cy4gIFJldHVybnMgdGhlIGluZGV4IGFmdGVyIHRoZSBsYXN0IGVudHJ5IHdob3NlXG4gICAgICogcGVyLXNlbmRlciBjb3VudGVyICh0aGUgZmlyc3QgdHVwbGUgZWxlbWVudCkgaXMgPD1cbiAgICAgKiB2YWx1ZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5kZXhBZnRlcihzcGFyc2VBcnJheSwgdmFsdWUpIHtcbiAgICAgICAgLy8gVE9ETzogYmluYXJ5IHNlYXJjaCB3aGVuIHNwYXJzZUFycmF5IGlzIGxhcmdlXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGVyZSBtYXkgYmUgZHVwbGljYXRlIHRpbWVzdGFtcHMuXG4gICAgICAgIC8vIFNvIGl0IHdvdWxkIGJlIGluYXBwcm9wcmlhdGUgdG8gZmluZCBhbiBlbnRyeSB3aG9zZVxuICAgICAgICAvLyBwZXItc2VuZGVyIGNvdW50ZXIgZXF1YWxzIHZhbHVlIGFuZCBpbmZlciB0aGF0XG4gICAgICAgIC8vIHRoZSBkZXNpcmVkIGluZGV4IGlzIDEgZ3JlYXRlci5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGFyc2VBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNwYXJzZUFycmF5W2ldWzBdID4gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYXJzZUFycmF5Lmxlbmd0aDtcbiAgICB9XG59XG5leHBvcnRzLlNlbWlkaXJlY3RTdGF0ZSA9IFNlbWlkaXJlY3RTdGF0ZTtcbmNsYXNzIFNlbWlkaXJlY3RJbnRlcm5hbCB7XG4gICAgLyoqXG4gICAgICogQ3JkdEludGVybmFsIGltcGxlbWVudGluZyB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IG9mXG4gICAgICogY3JkdDEgYW5kIGNyZHQyIHdpdGggdGhlIGdpdmVuIGFjdGlvbiwgd2hpY2ggaXMgYSBmdW5jdGlvblxuICAgICAqIChtMjogY3JkdDIgbWVzc2FnZSwgbTE6IGNyZHQxIG1lc3NhZ2UpOiBjcmR0MSBtZXNzYWdlLlxuICAgICAqIGNyZHQxLCBjcmR0MiwgYW5kIGFjdGlvbiBtdXN0IHNhdGlzZnkgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdFxuICAgICAqIGFzc3VtcHRpb25zIGZyb20gb3VyIHBhcGVyLlxuICAgICAqXG4gICAgICogVE9ETzogb3B0aW9ucyBhbmQgdGhlaXIgdGhlb3JldGljYWwgc2lnbmlmaWNhbmNlLiAgRm9ybWFsbHksXG4gICAgICogaGlzdG9yeVRpbWVzdGFtcHMgPSB0cnVlIG1lYW5zIHRoYXQgdGltZXN0YW1wcyBiZWNvbWVcbiAgICAgKiBwYXJ0IG9mIHRoZSBjcmR0MiBtZXNzYWdlcy4gIEFsc28gY3JlYXRlQ3JkdEluZGV4LlxuICAgICAqIERvbWluYXRlZCBzdGF0cyBjb250cm9sIHdoZXRoZXIgeW91IGRpc2NhcmQgbWVzc2FnZXMgaW4gdGhlXG4gICAgICogaGlzdG9yeSB0aGF0IGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnkgY3JkdDEvY3JkdDIgbWVzc2FnZXM7XG4gICAgICogbmVlZCB0byBlbnN1cmUgdGhhdCBhY3Rpb24gaXMgdGhlIHNhbWUgd2l0aCB0aG9zZSBtZXNzYWdlc1xuICAgICAqIGRpc2NhcmRlZC4gIElmIGRvbWluYXRlZDEgaXMgc2V0LCB0aGVuIHN0YXRlLmlzSGlzdG9yeUVtcHR5KClcbiAgICAgKiBiZWNvbWVzICh0aGVyZSBleGlzdHMgYSBjcmR0MiBtZXNzYWdlIG5vdCBjYXVzYWxseSBkb21pbmF0ZWQgYnkgYVxuICAgICAqIGNyZHQxIG1lc3NhZ2UpLiAgQ2hlY2sgdGhpcyBpcyBzdGlsbCB0cnVlIGlmIGRvbWluYXRlZDIgaXMgc2V0LilcbiAgICAgKiBFeHBsYWluIGV4YW1wbGVzIHdoZXJlIHRoaXMgaXMgdXNlZCAocmVzZXR0YWJsZSwgZmxhZ3MpOyBpdCdzXG4gICAgICogbm90IHF1aXRlIGluIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3Qgc3Bpcml0IHVubGVzcyB5b3UgdGhpbmtcbiAgICAgKiBvZiBpdCBhcyB1c2luZyB0aGUgaGlzdG9yeSBhcyBwYXJ0IG9mIHRoZSBjcmR0MS8yIHN0YXRlLlxuICAgICAqIFBvdGVudGlhbCBvcHRpbWl6YXRpb246IG9ubHkgZGVsZXRlIGRvbWluYXRlZCBtZXNzYWdlcyB3aGVuXG4gICAgICogcmVjZWl2aW5nIG91ciBvd24gbWVzc2FnZSAoaXQncyBiYXNpY2FsbHkgZnJlZSBhbmQgYWx3YXlzXG4gICAgICogY2xlYXJzIHRoZSBoaXN0b3J5KSwgb3Igb25seSBzb21ldGltZXMgKHdpbGwgbWlzcyBzb21lXG4gICAgICogbWVzc2FnZXMsIHNvIG5lZWQgdG8gZW5zdXJlIGNvcnJlY3RuZXNzIGluIHRoYXQgY2FzZVxuICAgICAqIChJIHRoaW5rIGl0IGlzIG9rYXkgZm9yIGRvbWluYXRlZDIgYnV0IG5vdCBkb21pbmF0ZWQxIGluIG91clxuICAgICAqIHRhcmdldCB1c2UgY2FzZXMpLCBidXRcbiAgICAgKiBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgZHVlIHRvIGJhdGNoaW5nIGFuZCBzdGlsbCBraWxsXG4gICAgICogb2ZmIG1vc3QgbWVzc2FnZXMpLiAgVGhpcyB0cmFkZXMgYSBzbWFsbCBpbmNyZWFzZSBpbiBzcGFjZVxuICAgICAqIHVzYWdlIGZvciBhIGRlY3JlYXNlIGluIENQVSB0aW1lLlxuICAgICAqXG4gICAgICogQXMgZGVzY3JpYmVkIGluIENyZHRJbnRlcm5hbCBhbmQgQ3JkdCwgbnVsbCBtZXNzYWdlcyBhcmUgdHJlYXRlZFxuICAgICAqIGFzIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBpZCwgYWxsb3dpbmcgdGhlbSB0byBiZSBvcHRpbWl6ZWQgYXdheS5cbiAgICAgKiBCZWNhdXNlIG9mIHRoaXMsIGFjdGlvbiB3aWxsIG5ldmVyIGJlIGNhbGxlZCB3aXRoIG51bGwgYXNcbiAgICAgKiBlaXRoZXIgaW5wdXQuICBJbnN0ZWFkLCB3ZSBiZWhhdmUgYXMgaWZcbiAgICAgKiAoYWN0aW9uKGlkIChpLmUuLCBudWxsKSwgbTEpID0gbTEpXG4gICAgICogZm9yIGFsbCBtMSBhbmQgKGFjdGlvbihtMiwgaWQpID0gaWQpIGZvciBhbGwgbTIuICBUaGUgc2VtaWRpcmVjdFxuICAgICAqIHByb2R1Y3QgYXNzdW1wdGlvbnMgbXVzdCBob2xkIGdpdmVuIHRoZXNlIGFzc2lnbm1lbnRzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNyZHQxLCBjcmR0MiwgYWN0aW9uLCBjcmVhdGVDcmR0SW5kZXgsIGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmNyZHQxID0gY3JkdDE7XG4gICAgICAgIHRoaXMuY3JkdDIgPSBjcmR0MjtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMuY3JlYXRlQ3JkdEluZGV4ID0gY3JlYXRlQ3JkdEluZGV4O1xuICAgICAgICB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzID0gaGlzdG9yeVRpbWVzdGFtcHM7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZDtcbiAgICAgICAgaWYgKGNyZWF0ZUNyZHRJbmRleCAhPT0gMSAmJiBjcmVhdGVDcmR0SW5kZXggIT09IDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmVhdGVDcmR0SW5kZXggKG11c3QgYmUgMSBvciAyKTpcIiArXG4gICAgICAgICAgICAgICAgY3JlYXRlQ3JkdEluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEluaXRpYWwgZGF0YSB1c2VkIHRvIGluaXRpYWxpemUgdGhpcy5jcmR0MS5cbiAgICAgKiBAcmV0dXJuXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGxldCBpbnRlcm5hbFN0YXRlO1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpXG4gICAgICAgICAgICBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpbnRlcm5hbFN0YXRlID0gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICByZXR1cm4gbmV3IFNlbWlkaXJlY3RTdGF0ZShpbnRlcm5hbFN0YXRlLCB0aGlzLmhpc3RvcnlUaW1lc3RhbXBzLCB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBUT0RPIChnZW5lcmFsKTogZXJyb3IgY2hlY2tpbmdcbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUsIHJlcGxpY2FJZCkge1xuICAgICAgICBpZiAob3BlcmF0aW9uWzBdID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgb3AxID0gdGhpcy5jcmR0MS5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgIGlmIChvcDEgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsxLCBvcDFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG9wMiA9IHRoaXMuY3JkdDIucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AyID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgb3AyXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NyaXB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS4gIEZvciB0aGlzLmNyZHQxXG4gICAgICogbWVzc2FnZXMsIHRoZSBkZXNjcmlwdGlvbiBpcyBmb3IgdGhlIGFjdGVkLW9uIG1lc3NhZ2UgdGhhdFxuICAgICAqIGlzIGFjdHVhbGx5IGFwcGxpZWQgdG8gdGhpcy5pbnRlcm5hbFN0YXRlLCBub3QgdGhlIGlucHV0XG4gICAgICogbWVzc2FnZS4gIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwgKG9yIGlmIHRoZSBtZXNzYWdlIGdldHMgYWN0ZWQgb24gdG8gYmVjb21lIG51bGwpLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChtZXNzYWdlWzBdID09PSAyKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHN0YXRlLmFkZChyZXBsaWNhSWQsIG1lc3NhZ2VbMV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFsyLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb25jdXJyZW50ID0gc3RhdGUuZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBsZXQgbUFjdCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtQWN0ID0gdGhpcy5hY3Rpb24oY29uY3VycmVudFtpXSwgbUFjdCk7XG4gICAgICAgICAgICAgICAgaWYgKG1BY3QgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1BY3QsIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFsxLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtaWRpcmVjdEludGVybmFsID0gU2VtaWRpcmVjdEludGVybmFsO1xuY2xhc3MgRGlyZWN0SW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIERpcmVjdCBwcm9kdWN0IG9mIENyZHRJbnRlcm5hbCdzLiAgVGhpcyBpcyB0aGVcbiAgICAgKiBzcGVjaWFsIGNhc2Ugb2YgU2VtaWRpcmVjdEludGVybmFsIHdoZW4gdGhlIGFjdGlvbiBpcyB0cml2aWFsXG4gICAgICogKChtXzIsIG0xKSA9PiBtMSkuICBJbiB0aGlzIGNhc2Ugd2UgY2FuIG9wdGltaXplXG4gICAgICogYnkgbm90IGtlZXBpbmcgdGhlIGhpc3Rvcnkgb3IgYWN0aW5nIG9uIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogRm9yIHRoaXMgdG8gYmUgYSBDcmR0LCBjb25jdXJyZW50IG1lc3NhZ2VzIG9mIHRoZSB0d28gaW5wdXRcbiAgICAgKiBDcmR0cyBtdXN0IGNvbW11dGUuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgY29uc3RydWN0aW9uIGlzIHN5bW1ldHJpYyAoc3dpdGNoaW5nIGNyZHQxIGFuZFxuICAgICAqIGNyZHQyIGRvZXNuJ3QgY2hhbmdlIHRoZSBzZW1hbnRpY3MpLCBleGNlcHQgZm9yIHN3YXBwaW5nXG4gICAgICogdGhlIG1lYW5pbmcgb2YgdGhlIG51bWJlcnMgMS8yIGluIGNyZWF0ZUNyZHRJbmRleCBhbmRcbiAgICAgKiBpbiB0aGUgZmlyc3QgY29vcmRpbmF0ZXMgb2YgbWVzc2FnZXMgYW5kIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JlYXRlQ3JkdEluZGV4IFdoaWNoIGNyZHQncyBjcmVhdGUgbWV0aG9kIHRvIHVzZVxuICAgICAqIGluIGNyZWF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjcmR0MSwgY3JkdDIsIGNyZWF0ZUNyZHRJbmRleCkge1xuICAgICAgICB0aGlzLmNyZHQxID0gY3JkdDE7XG4gICAgICAgIHRoaXMuY3JkdDIgPSBjcmR0MjtcbiAgICAgICAgdGhpcy5jcmVhdGVDcmR0SW5kZXggPSBjcmVhdGVDcmR0SW5kZXg7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtvcGVyYXRpb25bMF0sIG1lc3NhZ2VdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLlxuICAgICAqIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwsXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqIFRPRE86IHBlcmhhcHMgYWRkIHRyYW5zbGF0aW5nIGRlc2NyaXB0aW9ucyB0byB0aGlzIGNsYXNzLCBzb1xuICAgICAqIHRoZSBDcmR0IGRvZXNuJ3QgaGF2ZSB0byB1bmRlcnN0YW5kIGFsbCBvZiB0aGUgbGF5ZXJzIGF0XG4gICAgICogb25jZT9cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0WzBdLCBudWxsXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRbMF0sIFttZXNzYWdlWzBdLCByZXN1bHRbMV1dXTtcbiAgICB9XG59XG5leHBvcnRzLkRpcmVjdEludGVybmFsID0gRGlyZWN0SW50ZXJuYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZW1pZGlyZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BcnJheUNyZHRJbnRlcm5hbCA9IGV4cG9ydHMuTWFwQ3JkdCA9IGV4cG9ydHMuQWRkV2luc1NldCA9IGV4cG9ydHMuQ3JkdE9iamVjdCA9IGV4cG9ydHMuR01hcEludGVybmFsID0gZXhwb3J0cy5EaXNhYmxlV2luc0ZsYWcgPSBleHBvcnRzLkVuYWJsZVdpbnNGbGFnID0gZXhwb3J0cy5Ob09wQ3JkdEludGVybmFsID0gZXhwb3J0cy5PcnRob2dvbmFsQ3JkdCA9IGV4cG9ydHMuSW50UmVnaXN0ZXJDcmR0ID0gZXhwb3J0cy5VbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgPSB2b2lkIDA7XG5jb25zdCByZXNldHRhYmxlXzEgPSByZXF1aXJlKFwiLi9yZXNldHRhYmxlXCIpO1xuY29uc3QgYmFzaWNfY3JkdHNfMSA9IHJlcXVpcmUoXCIuL2Jhc2ljX2NyZHRzXCIpO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuY2xhc3MgVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIG5dKTtcbiAgICB9XG4gICAgbXVsdChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgIH1cbn1cbmV4cG9ydHMuVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0ID0gVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0O1xuLy8gc2VtaWRpcmVjdEluc3RhbmNlIGNvbXBsZXRlbHkgZGVzY3JpYmVzIHRoaXMgc2VtaWRpcmVjdCBwcm9kdWN0XG5VbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwoYmFzaWNfY3JkdHNfMS5Db3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIGJhc2ljX2NyZHRzXzEuTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIChtMiwgbTEpID0+IG0yICogbTEsIDEpO1xuY2xhc3MgSW50UmVnaXN0ZXJDcmR0IGV4dGVuZHMgcmVzZXR0YWJsZV8xLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSA9IDAsIHJlc2V0VmFsdWUgPSAwKSB7XG4gICAgICAgIHN1cGVyKGlkLCBJbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBuXSk7XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIG5dKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tYWRkLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmFkZChuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vIFRyYW5zYWN0aW9uIGR1ZSB0byBzZXQgdmFsdWUsIHJldHVybiB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gICAgICAgICAgICByZXR1cm4gW1wic2V0XCIsIGRlc2NyaXB0aW9uc1sxXVsxXV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbZGVzY3JpcHRpb25bMF0sIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5leHBvcnRzLkludFJlZ2lzdGVyQ3JkdCA9IEludFJlZ2lzdGVyQ3JkdDtcbkludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChiYXNpY19jcmR0c18xLkNvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgYmFzaWNfY3JkdHNfMS5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgKG0yLCBtMSkgPT4gbTIgKiBtMSwgMSk7XG5mdW5jdGlvbiBwb3NpdGl2ZU1vZChhLCBiKSB7XG4gICAgaWYgKGEgPj0gMClcbiAgICAgICAgcmV0dXJuIGEgJSBiO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGIgLSAoKC1hKSAlIGIpO1xufVxuY2xhc3MgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBbMCwgZmFsc2VdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gaW5pdGlhbERhdGE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgcmV0dXJuIHBvc2l0aXZlTW9kKG9wZXJhdGlvbiwgMiAqIE1hdGguUEkpO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2Qoc3RhdGVbMF0gKyBtZXNzYWdlLCAyICogTWF0aC5QSSksIHN0YXRlWzFdXSwgbWVzc2FnZV07XG4gICAgfVxufVxuT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwoKTtcbmNsYXNzIE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwge1xuICAgIGNyZWF0ZShfaW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gIT09IFwicmVmbGVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICByZXR1cm4gXCJyZWZsZWN0XCI7XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gXCJyZWZsZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICAgICAgLy8gUmVmbGVjdGlvbiBvcGVyYXRpb24gaXMgbXVsdGlwbHlpbmcgb24gdGhlIGxlZnQsXG4gICAgICAgIC8vIHNvIHRvIHB1dCBpdCBpbiBjYW5vbmljYWwgZm9ybSAoZzEsIGcyKSwgd2UgaGF2ZSB0b1xuICAgICAgICAvLyBjb21tdXRlIGl0IHdpdGggdGhlIGN1cnJlbnQgZzEgKHJvdGF0aW9uKSB2YWx1ZSBieVxuICAgICAgICAvLyBhY3Rpbmcgb24gaXQuXG4gICAgICAgIHJldHVybiBbW3Bvc2l0aXZlTW9kKC1zdGF0ZVswXSwgMiAqIE1hdGguUEkpLCAhc3RhdGVbMV1dLCBcInJlZmxlY3RcIl07XG4gICAgfVxufVxuT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsKCk7XG4vKipcbiAqIENyZHQgZm9yIHRoZSAyLWRpbWVuc2lvbmFsIG9ydGhvZ29uYWwgZ3JvdXAsIHdoaWNoIGFsbG93c1xuICogcm90YXRpb25zIGFuZCByZWZsZWN0aW9ucyAoYWJvdXQgdGhlIG9yaWdpbikgb2YgYW4gb2JqZWN0IGluIHRoZVxuICogcGxhbmUuICBFeGFtcGxlIHVzYWdlOiByb3RhdGluZyBhbmQgcmVmbGVjdGluZyBvYmplY3RzIGluXG4gKiBQb3dlcnBvaW50LlxuICpcbiAqIFN0YXRlIGlzIHN0b3JlZCBhcyB0aGUgY2Fub25pY2FsIGVsZW1lbnQgb2YgdGhlIHNlbWlkaXJlY3RcbiAqIHByb2R1Y3QgZ3JvdXAsIGkuZS4sIGluIHRoZSBmb3JtIChnMSwgZzIpIGZvciBnMSBpbiB0aGUgcm90YXRpb25cbiAqIGdyb3VwIChyZWFscyBtb2QgMnBpKSBhbmQgZzIgaW4gdGhlIHJlZmxlY3Rpb24gZ3JvdXAgKGJvb2xlYW5zXG4gKiB3aXRoIHRydWUgZm9yIDEgYW5kIGZhbHNlIGZvciAwKS5cbiAqL1xuY2xhc3MgT3J0aG9nb25hbENyZHQgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbFZhbHVlID0gWzAsIGZhbHNlXSwgcmVzZXRWYWx1ZSA9IFswLCBmYWxzZV0pIHtcbiAgICAgICAgc3VwZXIoaWQsIE9ydGhvZ29uYWxDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcmVzZXRWYWx1ZSwgcnVudGltZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW5nbGUgaXMgaW4gcmFkaWFucyBDQ1cuXG4gICAgICovXG4gICAgcm90YXRlKGFuZ2xlKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgYW5nbGVdKTtcbiAgICB9XG4gICAgcmVmbGVjdEhvcml6b250YWxBeGlzKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIFwicmVmbGVjdFwiXSk7XG4gICAgfVxuICAgIHJlZmxlY3RWZXJ0aWNhbEF4aXMoKSB7XG4gICAgICAgIHRoaXMucmVmbGVjdChNYXRoLlBJIC8gMik7XG4gICAgfVxuICAgIHJlZmxlY3QoYW5nbGVBeGlzKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJvdGF0ZSgtYW5nbGVBeGlzKTtcbiAgICAgICAgdGhpcy5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoYW5nbGVBeGlzKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAqIGlmIHJlZmxlY3RlZCBpcyB0cnVlLCB0aGVuIHJvdGF0ZSBieSBhbmdsZSAoQ0NXLCBpbiByYWRpYW5zKS5cbiAgICAgKi9cbiAgICBnZXQgcmVmbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlWzFdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzdGF0ZSBpcyBnaXZlbiBieTogcmVmbGVjdCBhY3Jvc3MgdGhlIHgtYXhpc1xuICAgICAqIGlmIHJlZmxlY3RlZCBpcyB0cnVlLCB0aGVuIHJvdGF0ZSBieSBhbmdsZSAoQ0NXLCBpbiByYWRpYW5zKS5cbiAgICAgKi9cbiAgICBnZXQgYW5nbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFtyZWZsZWN0ZWQsIGFuZ2xlXVxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLmFuZ2xlLCB0aGlzLnJlZmxlY3RlZF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1zZXQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMucm90YXRlKG5ld1ZhbHVlWzBdKTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlWzFdKVxuICAgICAgICAgICAgdGhpcy5yZWZsZWN0SG9yaXpvbnRhbEF4aXMoKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvLyBUT0RPOiBtYXRyaXggdmVyc2lvbnMgb2YgZ2V0IGFuZCBzZXQuXG4gICAgLy8gLyoqXG4gICAgLy8gICogQHJldHVybiBUaGUgY3VycmVudCB0cmFuc2Zvcm1hdGlvbiBhcyBhIDJ4MiBvcnRob2dvbmFsXG4gICAgLy8gICogbWF0cml4LlxuICAgIC8vICAqL1xuICAgIC8vIGdldCBtYXRyaXgoKTogW1tudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl1dIHtcbiAgICAvL1xuICAgIC8vIH1cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKF9kZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgLy8gVE9ETy4gIEp1c3QgcmV0dXJucyB0aGUgcmVzdWx0aW5nIHN0YXRlIGZvciBub3cuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAvLyAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgLy8gICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIC8vIGVsc2UgcmV0dXJuIFtkZXNjcmlwdGlvblswXSBhcyBzdHJpbmcsIHRoaXMudmFsdWVdOyAvLyByZXNldHNcbiAgICB9XG59XG5leHBvcnRzLk9ydGhvZ29uYWxDcmR0ID0gT3J0aG9nb25hbENyZHQ7XG5PcnRob2dvbmFsQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbC5pbnN0YW5jZSwgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbC5pbnN0YW5jZSwgKF9tMiwgbTEpID0+IC1tMSwgMSk7XG4vKipcbiAqIENyZHRJbnRlcm5hbCB3aGljaCB1c2VzIGFueSBzdHJpbmcgYXMgYW4gb3BlcmF0aW9uL21lc3NhZ2VcbiAqIHdoaWNoIGRvZXMgbm90aGluZy4gIFVubGlrZSB1c2luZyBudWxsIG1lc3NhZ2VzIHRvIGluZGljYXRlIHRoYXRcbiAqIG5vdGhpbmcgaGFwcGVuZWQsIHRoZSBub29wIG1lc3NhZ2UgaXMgYW4gZXhwbGljaXQgbm9uLW51bGxcbiAqIHN0cmluZyBzdXBwbGllZCBhcyB0aGUgb3BlcmF0aW9uLlxuICpcbiAqIFR3byB1c2UgY2FzZXM6XG4gKiAtIFRvIHVucmVzZXQgYSBzdGF0ZSAoZS5nLiBpbiBFbmFibGVXaW5zRmxhZyBiZWxvdykuXG4gKiAtIEFzIGEgXCJoZWFkZXJcIiBmb3Igc2VxdWVuY2Ugb2Ygb3BlcmF0aW9ucyBwYXNzZWQgdG8gYXBwbHlPcHMsXG4gKiBzbyB0aGF0IHJlY2lwaWVudHMgY2FuIGtub3cgd2hhdCBlbmQtdXNlciBvcGVyYXRpb24gdGhlIHNlcXVlbmNlXG4gKiBjb3JyZXNwb25kcyB0by5cbiAqL1xuY2xhc3MgTm9PcENyZHRJbnRlcm5hbCB7XG4gICAgY29uc3RydWN0b3IoY3JlYXRlRnVuYykge1xuICAgICAgICB0aGlzLmNyZWF0ZUZ1bmMgPSBjcmVhdGVGdW5jO1xuICAgIH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlRnVuYylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUZ1bmMoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDcmVhdGVGdW5jIG5vdCBzdXBwbGllZFwiKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgdGhlIG9yaWdpbmFsIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbWVzc2FnZV07XG4gICAgfVxuICAgIHN0YXRpYyBhZGRUbyhvcmlnaW5hbENyZHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBzZW1pZGlyZWN0XzEuRGlyZWN0SW50ZXJuYWwob3JpZ2luYWxDcmR0LCBuZXcgTm9PcENyZHRJbnRlcm5hbCgpLCAxKTtcbiAgICB9XG59XG5leHBvcnRzLk5vT3BDcmR0SW50ZXJuYWwgPSBOb09wQ3JkdEludGVybmFsO1xuY2xhc3MgRW5hYmxlV2luc0ZsYWcgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSkge1xuICAgICAgICBzdXBlcihpZCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKCkgPT4gbnVsbCksIG51bGwsIHJ1bnRpbWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFwiZVwiKTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBkaXNhYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZG9pbmcgYSByZXNldCBiZWZvcmUgc2V0dGluZ1xuICAgICAgICAvLyB0byBuZXdWYWx1ZSwgaW4gZWl0aGVyIGNhc2UsIHNpbmNlIGFueSBtZXNzYWdlIG9idmlhdGVzXG4gICAgICAgIC8vIGNhdXNhbGx5IGxlc3NlciBtZXNzYWdlcy5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIFRPRE86IHdvdWxkIGFsc28gbGlrZSB0byB0cmFuc2xhdGUgb2JzZXJ2ZWQtcmVzZXRzIHRvXG4gICAgLy8gZGlzYWJsZSAoYnV0IG9ubHkgaWYgaXQgYWN0dWFsbHkgd29ya2VkKS4gIFBlcmhhcHMgYWRkIG5vb3AgaW5kaWNhdG9yIG91dCBmcm9udD9cbiAgICAvLyAoTmVlZCB0byBhZGQgYSBuby1vcCBjcmR0IGF0IHRoZSB0b3AgbGV2ZWwpXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdID09PSBcImVcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRW5hYmxlV2luc0ZsYWcgPSBFbmFibGVXaW5zRmxhZztcbmNsYXNzIERpc2FibGVXaW5zRmxhZyBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCwgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGVuYWJsZVN0cm9uZygpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0cm9uZygpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJkXCIpO1xuICAgIH1cbiAgICBnZXQgZW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpO1xuICAgIH1cbiAgICBzZXQgZW5hYmxlZChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIGVxdWl2YWxlbnQgdG8gZG9pbmcgYSByZXNldCBiZWZvcmUgc2V0dGluZ1xuICAgICAgICAvLyB0byBuZXdWYWx1ZSwgaW4gZWl0aGVyIGNhc2UsIHNpbmNlIGFueSBtZXNzYWdlIG9idmlhdGVzXG4gICAgICAgIC8vIGNhdXNhbGx5IGxlc3NlciBtZXNzYWdlcy5cbiAgICAgICAgdGhpcy5lbmFibGVkID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIFRPRE86IHdvdWxkIGFsc28gbGlrZSB0byB0cmFuc2xhdGUgb2JzZXJ2ZWQtcmVzZXRzIHRvXG4gICAgLy8gZW5hYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZW5hYmxlU3Ryb25nXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb25zOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVzY3JpcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRpc2FibGVXaW5zRmxhZyA9IERpc2FibGVXaW5zRmxhZztcbmNsYXNzIEdNYXBJbnRlcm5hbCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSB2YWx1ZUNyZHRJbnRlcm5hbCBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHNob3VsZEdjIEdpdmVuIGEgdmFsdWUgc3RhdGUsIHJldHVybiB3aGV0aGVyIGl0IGlzIHNhZmVcbiAgICAgKiB0byBnYXJiYWdlIGNvbGxlY3QgaXQsIHJlbW92aW5nIGl0cyBrZXktdmFsdWUgcGFpciBmcm9tIHRoZVxuICAgICAqIG1hcC4gIEZvciBjb3JyZWN0bmVzcywgaWYgc2hvdWxkR2ModmFsdWVTdGF0ZSkgaXMgdHJ1ZSwgdGhlblxuICAgICAqIHZhbHVlU3RhdGUgbXVzdCBiZSBpZGVudGljYWwgdG8gdmFsdWVDcmR0SW50ZXJuYWwuY3JlYXRlKHZhbHVlSW5pdGlhbERhdGEpO1xuICAgICAqIGFuZCBpZiBzaG91bGRHYyBpcyBub250cml2aWFsLCB0aGVuIHVzZXJzIHNob3VsZCBrZWVwIGluXG4gICAgICogbWluZCB0aGF0IHN0YXRlLmhhcyhrZXkpIGlzIG5vdCByZWxpYWJsZSwgc2luY2UgaXQgbWF5IGJlXG4gICAgICogZmFsc2UgZXZlbiBhZnRlciBrZXkgaGFzIGJlZW4gaW5pdGlhbGl6ZWQgYmVjYXVzZSB0aGUgdmFsdWVcbiAgICAgKiBoYXMgYmVlbiBnYXJiYWdlIGNvbGxlY3RlZC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzaG91bGRHYyA9ICgoKSA9PiBmYWxzZSkpIHtcbiAgICAgICAgdGhpcy5zaG91bGRHYyA9IHNob3VsZEdjO1xuICAgIH1cbiAgICBjcmVhdGUoX2luaXRpYWxEYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnM6XG4gICAgICogLSBbXCJhcHBseVwiLCBrZXksIEMgbWVzc2FnZV06IGFwcGxpZXMgdGhlIEMgbWVzc2FnZSB0b1xuICAgICAqIHRoZSBnaXZlbiBrZXksIGluaXRpYWxpemluZyB0aGUga2V5IGlmIG5lZWRlZC5cbiAgICAgKiAtIFtcImFwcGx5U2tpcFwiLCBrZXksIEMgbWVzc2FnZV06IGFwcGxpZXMgdGhlIEMgbWVzc2FnZSB0b1xuICAgICAqIHRoZSBnaXZlbiBrZXksIGV4Y2VwdCBmb3IgdGhlaXIgc2VuZGVyLCB3aG8gaXMgYXNzdW1lZFxuICAgICAqIHRvIGhhdmUgYWxyZWFkeSBhcHBsaWVkIHRoZSBtZXNzYWdlLiAgVGhpcyBpcyB1c2VkIGJ5XG4gICAgICogQ3JkdFZhbHVlZEdyb3dPbmx5TWFwSW50ZXJuYWwsIHdob3NlIG1lc3NhZ2VzIGFyZVxuICAgICAqIHNvbWV0aW1lcyBkZXJpdmVkIGZyb20gdmFsdWVzIGFwcGx5aW5nIG1lc3NhZ2VzIHRvXG4gICAgICogdGhlbXNlbHZlcy4gIFRPRE86IGluIHByaW5jaXBsZSBjYW4gb3B0aW1pemUgc28gd2VcbiAgICAgKiBkb24ndCBoYXZlIHRvIHNlbmQgXCJza2lwXCIgb3ZlciB0aGUgbmV0d29yay5cbiAgICAgKiAtIFtcImluaXRcIiwga2V5XTogaW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGtleSB1c2luZyBpbml0RmFjdG9yeVxuICAgICAqIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQgaW4gdGhlIG1hcC5cbiAgICAgKiAtIFtcInJlc2V0XCJdOiByZXNldHMgZXZlcnkgdmFsdWUgaW4gdGhlIG1hcCAodXNpbmdcbiAgICAgKiBlYWNoIHZhbHVlJ3MgZ2V0VW5pdmVyc2FsUmVzZXRPcGVyYXRpb24oKSkuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGxldCBrZXkgPSBvcGVyYXRpb25bMV07XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlcIiwga2V5LCBvcGVyYXRpb25bMl1dO1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5U2tpcFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJhcHBseVNraXBcIiwga2V5LCBvcGVyYXRpb25bMl1dO1xuICAgICAgICAgICAgY2FzZSBcImluaXRcIjpcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiaW5pdFwiLCBrZXldO1xuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6IHJldHVybiBbXCJyZXNldFwiXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG9wZXJhdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbiBhZGRpdGlvbiB0byB0aGUgbWVzc2FnZSBvdXRwdXQgYnkgcHJlcGFyZSwgd2UgaGF2ZVxuICAgICAqIG1lc3NhZ2VzIChhcmlzaW5nIHRocm91Z2ggc2VtZGlyZWN0IHByb2R1Y3QpOlxuICAgICAqIC0gW1wiaW5pdFJlc2V0XCIsIGtleV06IGRvZXMgW1wiaW5pdFwiLCBrZXldIGZvbGxvd2VkIGJ5XG4gICAgICogZGVsaXZlcmluZyBhIHJlc2V0IG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKiAtIFtcImluaXRSZXNldFN0cm9uZ1wiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZFxuICAgICAqIGJ5IGRlbGl2ZXJpbmcgYSByZXNldC1zdHJvbmcgbWVzc2FnZSB0byB0aGUga2V5LlxuICAgICAqXG4gICAgICogRGVzY3JpcHRpb24gZm9ybWF0OlxuICAgICAqIC0gZm9yIGFuIGFwcGx5L2FwcGx5U2tpcCBvcGVyYXRpb246XG4gICAgICogbnVsbCAoVE9ETylcbiAgICAgKiAtIGZvciBhbiBpbml0IG9wZXJhdGlvbjogbnVsbCBpZiB0aGUga2V5IGFscmVhZHkgZXhpc3RlZCxcbiAgICAgKiBvdGhlcndpc2UgW1wiaW5pdFwiLCBrZXldXG4gICAgICogLSBmb3IgYSByZXNldCBvcGVyYXRpb246IFtcInJlc2V0XCJdIChUT0RPOiBkZXNjcmlwdGlvbnMgZnJvbVxuICAgICAqIHJlc2V0IGtleXMpXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQga2V5ID0gbWVzc2FnZVsxXTtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlWzBdKSB7XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlTa2lwXCI6XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNraXAgYXBwbHlpbmcgaXQgdG8gdGhlIHN0YXRlLlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4gc3RpbGwgZ2MsIHRob3VnaCwgaW4gY2FzZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxyZWFkeS1hcHBsaWVkIG1lc3NhZ2UgaGFzIG1hZGUgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2MtYWJsZS5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlTdGF0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGZhbGwgdGhyb3VnaC5cbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOiB7XG4gICAgICAgICAgICAgICAgbGV0IGtleVN0YXRlID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleVN0YXRlLnJlY2VpdmUobWVzc2FnZVsyXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcImluaXRcIjpcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5pdFN0YXRlID0gdGhpcy5pbml0RmFjdG9yeShrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvdWxkR2MoaW5pdFN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuc2V0KGtleSwgaW5pdFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbXCJpbml0XCIsIGtleV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHN0YXRlLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzZXRNZXNzYWdlID0gZW50cnlbMV0uZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNldE1lc3NhZ2UgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeVsxXS5yZWNlaXZlKFtyZXNldE1lc3NhZ2VdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRHYyhlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShlbnRyeVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wicmVzZXRcIl1dO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkdNYXBJbnRlcm5hbCA9IEdNYXBJbnRlcm5hbDtcbi8qKlxuICogQ29udmVuaWVudCByZXByZXNlbnRhdGlvbiBvZiBhIENyZHQtdmFsdWVkIGdyb3ctb25seSBtYXAuXG4gKlxuICogVE9ETzogU29tZXdoZXJlOiBub3RlIHRoYXQgaW5pdGlhbCB2YWx1ZXMgb2YgcHJvcGVydGllcyBtdXN0IGJlXG4gKiBhIGZ1bmN0aW9uIG9mIHRoZWlyIGtleSBvbmx5IChzbyBjYW4ndCBoYXZlIHZhcnlpbmcgdHlwZXMgb3JcbiAqIGluaXRpYWwgZGF0YSkuXG4gKlxuICogTiBpcyB0aGUgdHlwZSBvZiBtZW1iZXIgbmFtZXMgKHR5cGljYWxseSBzdHJpbmcpLlxuICovXG5jbGFzcyBDcmR0T2JqZWN0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogVE9ETzogcHJlZGVmaW5lZCB2cyBkeW5hbWljIHByb3BlcnR5IGNyZWF0aW9uLiAgUHJlZGVmaW5lZCBvbmVzXG4gICAgICogaGF2ZSB0byBiZSBjcmVhdGVkIGlkZW50aWNhbGx5IG9uIGFsbCByZXBsaWNhcyBpblxuICAgICAqIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIGFuZFxuICAgICAqIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCksIGlkZWFsbHkgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGV5XG4gICAgICogYXJlIG5vdCBzeW5jZWQgKGZvciBlZmZpY2llbmN5IGFuZCB0byBzYXZlIHRoZSB0cm91YmxlXG4gICAgICogb2Ygc3BlY2lmeWluZyBwcm9wZXJ0eUZhY3RvcnkpLiAgRHluYW1pYyBwcm9wZXJ0aWVzXG4gICAgICogY2FuIG9ubHkgYmUgY3JlYXRlZCB0aHJvdWdoIGluaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcHJvcGVydHlGYWN0b3J5IFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgcHJvcGVydHlGYWN0b3J5ID0gQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5KSB7XG4gICAgICAgIC8vIFRPRE86IGdjIGFiaWxpdHlcbiAgICAgICAgbGV0IGNyZHRJbnRlcm5hbCA9IG5ldyBHTWFwSW50ZXJuYWwoKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRJbnRlcm5hbCwgcnVudGltZSk7XG4gICAgICAgIGNyZHRJbnRlcm5hbC5pbml0RmFjdG9yeSA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBwcm9wZXJ0eUZhY3Rvcnkoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgICByZWdpc3RlcihjcmR0LCBuYW1lKSB7XG4gICAgICAgIGlmICghKHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiB8fCB0aGlzLmluSW5pdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3BlcnRpZXMgY2FuIG9ubHkgYmUgZGlyZWN0bHkgXCIgK1xuICAgICAgICAgICAgICAgIFwicmVnaXN0ZXJlZCBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBcIiArXG4gICAgICAgICAgICAgICAgXCJhbmQgZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKS4gIER5bmFtaWMgcHJvcGVydGllcyBcIiArXG4gICAgICAgICAgICAgICAgXCJtdXN0IGJlIGNyZWF0ZWQgd2l0aCBpbml0KG5hbWUpLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBwcm9wZXJ0eSBuYW1lOiBcIiArIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KG5hbWUsIGNyZHQpO1xuICAgICAgICAvLyBTa2lwIHNlbmRpbmcgYW4gaW5pdCBtZXNzYWdlIGFib3V0IGl0LiAgT2theSBiZWNhdXNlIG9mIHRoZVxuICAgICAgICAvLyBwcmVkZWZpbmVkIGluaXRpYWxpemF0aW9uIGNvbnRyYWN0LlxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICBUaGUgaW5pdGlhbGl6ZWQgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0UHJvcGVydHkobmFtZSkge1xuICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseU9wKFtcImluaXRcIiwgbmFtZV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AodGhpcy5nZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cbiAgICBnZXRQcm9wZXJ0eShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICB9XG4gICAgcHJvcGVydHlOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUua2V5cygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWVzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5RW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgICAgLy8gQ29udmVydCBpbnRvIGFuIGFwcGx5U2tpcCBtZXNzYWdlIGZvciB0aGUgbWFwIHZhbHVlXG4gICAgICAgIC8vIGF0IG5hbWUuICBIZXJlIHdlIHdhbnQgdG8gc2tpcCBiZWNhdXNlXG4gICAgICAgIC8vIG91ciByZXBsaWNhJ3MgdmFsdWUgaGFzIGFscmVhZHkgYXBwbGllZCB0aGVcbiAgICAgICAgLy8gb3BlcmF0aW9uIGludGVybmFsbHkuXG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJhcHBseVNraXBcIiwgbmFtZSwgbWVzc2FnZV0pO1xuICAgIH1cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCk7XG4gICAgfVxuICAgIGdldE5leHRUaW1lc3RhbXAoX2NyZHRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCk7XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0T2JqZWN0ID0gQ3JkdE9iamVjdDtcbkNyZHRPYmplY3QuZGVmYXVsdFByb3BlcnR5RmFjdG9yeSA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJEeW5hbWljYWxseSBjcmVhdGVkIHByb3BlcnRpZXMgYXJlIG9ubHkgXCIgK1xuICAgICAgICBcImFsbG93ZWQgaWYgcHJvcGVydHlGYWN0b3J5IGlzIHBhc3NlZCB0byB0aGUgXCIgK1xuICAgICAgICBcIkNyZHRPYmplY3QgY29uc3RydWN0b3JcIik7XG59O1xuY2xhc3MgQWRkV2luc1NldCBleHRlbmRzIENyZHRPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIC8vIFRPRE86IGFkZCBnYyBvbmNlIHdlIGhhdmUgdHJhbnNhY3Rpb25zXG4gICAgICAgIHN1cGVyKGlkLCBydW50aW1lLCAobmFtZSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgRW5hYmxlV2luc0ZsYWcobmFtZSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgfVxuICAgIGFkZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5pbml0UHJvcGVydHkodmFsdWUpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIGRlbGV0ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmdldFByb3BlcnR5KHZhbHVlKS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKHZhbHVlKSB7XG4gICAgICAgIGxldCB2YWx1ZUZsYWcgPSB0aGlzLmdldFByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlRmxhZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVGbGFnLmVuYWJsZWQ7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5wcm9wZXJ0eUVudHJpZXMoKSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5WzFdLmVuYWJsZWQpXG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChlbnRyeVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgdmFsdWVzKCkge1xuICAgICAgICAvLyBUT0RPOiBvbmNlIGl0J3MgZ2MnZCB3ZSBjYW4ganVzdCB1c2UgdGhpcy5zdGF0ZS5rZXlzKClcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUudmFsdWVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BZGRXaW5zU2V0ID0gQWRkV2luc1NldDtcbmNsYXNzIE1hcENyZHQgZXh0ZW5kcyBDcmR0T2JqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgdmFsdWVGYWN0b3J5KSB7XG4gICAgICAgIHN1cGVyKGlkLCBydW50aW1lKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZsYWcgaW5kaWNhdGluZyB0aGF0IHdlIGFyZSBpbiB0aGUgYm9keSBvZiBhIGRlbGV0ZS9cbiAgICAgICAgICogZGVsZXRlU3Ryb25nIGNhbGwsIGhlbmNlIHdlIHNob3VsZCBub3QgYWRkIHRoaW5nc1xuICAgICAgICAgKiB0byBrZXlTZXQgKGFzIGFuIG9wdGltaXphdGlvbikuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmtleVNldCA9IG5ldyBBZGRXaW5zU2V0KFwia2V5U2V0XCIsIHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlTWFwID0gbmV3IENyZHRPYmplY3QoXCJ2YWx1ZU1hcFwiLCB0aGlzLCB2YWx1ZUZhY3RvcnkpO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIENyZHRPYmplY3Quc2VuZCBzbyB0aGF0IHdlIGNhbiBjYXB0dXJlXG4gICAgICogYSBzZW5kIGJ5IGEgdmFsdWVNYXAgdmFsdWUgYW5kIGZvbGxvdyBpdCB1cCB3aXRoXG4gICAgICogYW4gYWRkIHRvIGtleVNldCwgdGh1cyByZXZpdmluZyB0aGUgdmFsdWUncyBrZXlcbiAgICAgKiBpZiBhcHByb3ByaWF0ZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHNraXAgYWRkaW5nIHRoZSBrZXkgaWYgaXQncyBhIHJlc2V0IG1lc3NhZ2U/XG4gICAgICogTm90IHN1cmUgaWYgdGhpcyBpcyBwb3NzaWJsZSBpbiBnZW5lcmFsLiAgQnV0IHNob3VsZCBhdFxuICAgICAqIGxlYXN0IGJlIHBvc3NpYmxlIGZvciBvdXIgb3duIGRlbGV0ZXMuXG4gICAgICovXG4gICAgc2VuZChtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyLnNlbmQobWVzc2FnZSwgbmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSAmJiBuYW1lID09PSBcInZhbHVlTWFwXCIpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvIHRoaXMgcmVjZWl2ZXIgc2lkZSBpbnN0ZWFkLCBmb3IgbmV0d29yayBlZmZpY2llbmN5P1xuICAgICAgICAgICAgLy8gV291bGQgbmVlZCB0byBwbGFjZSB0aGUgYWRkIGZpcnN0LCBzbyB0aGF0IGl0IGNhblxuICAgICAgICAgICAgLy8gYmUgb3ZlcnJpZGRlbiBieSBhbnkgaW5jbHVkZWQgZGVsZXRlcy5cbiAgICAgICAgICAgIC8vIFdvdWxkIGFsc28gbmVlZCB0byBhY2NvdW50IGZvciBwb3NzaWJpbGl0eSBvZlxuICAgICAgICAgICAgLy8gdHJhbnNhY3Rpb25zLlxuICAgICAgICAgICAgLy8gQWxzbywgbmVlZCB0byBtYWtlIHN1cmUgd2UgKHNlbmRlcikgZG8gaXQgdG9vLlxuICAgICAgICAgICAgZm9yIChsZXQgc3VibWVzc2FnZSBvZiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1Ym1lc3NhZ2VbMF0gPT09IFwiYXBwbHlTa2lwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IHN1Ym1lc3NhZ2VbMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5U2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0KGtleSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlKVxuICAgICAgICAgICAgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnZhbHVlTWFwLmluaXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LmhhcyhrZXkpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVNYXAuZ2V0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0KGtleSkucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyhrZXkpIHtcbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5pdChrZXkpLnJlc2V0U3Ryb25nKCk7XG4gICAgICAgIHRoaXMua2V5U2V0LmRlbGV0ZVN0cm9uZyhrZXkpO1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC52YWx1ZXMoKTtcbiAgICB9XG59XG5leHBvcnRzLk1hcENyZHQgPSBNYXBDcmR0O1xuLy8gVE9ETzogbWFrZSBjb3JyZXNwb25kaW5nIENyZHQgZm9yIHVzZSBpbiBDcmR0T2JqZWN0J3MsXG4vLyBzbyB1c2VycyBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHRyYW5zbGF0aW5nIG9wc1xuLy8gYW5kIHRvIHN1cHBvcnQgYnVsay9SUEMvaG9tYXAgb3BzLlxuY2xhc3MgQXJyYXlDcmR0SW50ZXJuYWwge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRDcmR0KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudENyZHQgPSBlbGVtZW50Q3JkdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBBbiBhcnJheSBvZiBpbml0aWFsRGF0YSB0b1xuICAgICAqIHBhc3MgdG8gZWFjaCBlbnRyeSdzIGNyZWF0ZSBtZXRob2QuICBUaGUgZW50cmllc1xuICAgICAqIG1heSBiZSB1bmRlZmluZWQsIGluIHdoaWNoIGNhc2UgdW5kZWZpbmVkIHdpbGxcbiAgICAgKiBiZSBwYXNzZWQgdG8gdGhlIGVudHJ5J3MgY3JlYXRlIG1ldGhvZC4gIEluIGFueVxuICAgICAqIGNhc2UsIGluaXRpYWxEYXRhLmxlbmd0aCBpcyB1c2VkIHRvIHNldCB0aGVcbiAgICAgKiBsZW5ndGguXG4gICAgICogQHJldHVybiAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbml0aWFsRGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBhbiBhcnJheTogXCIgKyBpbml0aWFsRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXRlID0gW107XG4gICAgICAgIHN0YXRlLmxlbmd0aCA9IGluaXRpYWxEYXRhLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3RhdGVbaV0gPSB0aGlzLmVsZW1lbnRDcmR0LmNyZWF0ZShpbml0aWFsRGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBbaW5kZXgsIG9wXVxuICAgICAqIEByZXR1cm4gbWVzc2FnZSBvZiB0aGUgZm9ybSBbaW5kZXgsIG1lc3NhZ2VdXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKCEob3BlcmF0aW9uWzBdID49IDAgJiYgb3BlcmF0aW9uWzBdIDwgc3RhdGUubGVuZ3RoICYmIE51bWJlci5pc0ludGVnZXIob3BlcmF0aW9uWzBdKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluZGV4IG91dCBvZiBib3VuZHM6IFwiICsgb3BlcmF0aW9uWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW29wZXJhdGlvblswXSwgdGhpcy5lbGVtZW50Q3JkdC5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGVbMV0sIHJlcGxpY2FJZCldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGlvbiBmb3JtYXQ6IFtpbmRleCwgcmV0dXJuZWQgZGVzY3JpcHRpb25dXG4gICAgICogKHNhbWUgYXMgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtpbmRleCwgbWVzc2FnZV1cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBkZXNjO1xuICAgICAgICBbc3RhdGVbbWVzc2FnZVswXV0sIGRlc2NdID0gdGhpcy5lbGVtZW50Q3JkdC5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGVbbWVzc2FnZVswXV0sIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW21lc3NhZ2VbMF0sIGRlc2NdXTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5Q3JkdEludGVybmFsID0gQXJyYXlDcmR0SW50ZXJuYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGFuZGFyZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3JkdE5ldHdvcmtSdW50aW1lID0gZXhwb3J0cy5teU1lc3NhZ2UgPSB2b2lkIDA7XG5jb25zdCB2ZWN0b3JfY2xvY2tfMSA9IHJlcXVpcmUoXCIuL3ZlY3Rvcl9jbG9ja1wiKTtcbi8vIGltcG9ydCBXZWJTb2NrZXQgPSByZXF1aXJlKFwid3NcIik7XG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5jbGFzcyBteU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNyZHRJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY3JkdElkID0gY3JkdElkO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgcGFja2FnZSBpbmZvIGluIEpTT04gZm9ybWF0LlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgXCJtZXNzYWdlXCI6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIFwiY3JkdElkXCI6IHRoaXMuY3JkdElkLFxuICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIjoge1xuICAgICAgICAgICAgICAgIFwidWlkXCI6IHRoaXMudGltZXN0YW1wLnVpZCxcbiAgICAgICAgICAgICAgICBcInZlY3Rvck1hcFwiOiBBcnJheS5mcm9tKHRoaXMudGltZXN0YW1wLnZlY3Rvck1hcC5lbnRyaWVzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubXlNZXNzYWdlID0gbXlNZXNzYWdlO1xuLyoqXG4gKiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrOlxuICpcbiAqIFByb2Nlc3MgaW5pdGlhbGl6YXRpb24gd2hlbiBzdGFydGluZyBhIG5ldyB1c2VyIG5vZGUuXG4gKlxuICogQ29tbXVuaWNhdGUgd2l0aCBDUkRUJ3MgcnVudGltZSBhbmQgc2VuZC9yZWNlaXZlIG1lc3NhZ2UgdmlhXG4gKiBjZW50cmFsIGJyb2FkY2FzdCBzZXJ2ZXIgd2l0aCBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gKlxuICogUGVyZm9ybSBjYXN1YWxpdHkgY2hlY2sgdG8gZW5zdXJlIG1lc3NhZ2Ugb3JkZXJpbmcuXG4gKi9cbmNsYXNzIENyZHROZXR3b3JrUnVudGltZSB7XG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCB3ZWJTb2NrZXRBcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAgICAgKiBJZiB0aGVyZSBleGlzdCwgdGhlbiBzZW5kIGl0IHZpYSBXZWJTb2NrZXQgYW5kIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGJ1ZmZlci5cbiAgICAgICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIC8vIFVzZSBoZWFydGJlYXQgdG8ga2VlcCBjbGllbnQgYWxpdmUuXG4gICAgICAgICAgICAvLyB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlIGhlYXJ0YmVhdCBmdW5jdGlvbiB0byBrZWVwIGNsaWVudHMgYWxpdmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRPRE86XG4gICAgICAgICAqIFRoZSBtZXNzYWdlIHNlbmRpbmcgdG8gc2VydmVyIGlzICdoZWFydGJlYXQnIHJpZ2h0IG5vdy5cbiAgICAgICAgICogVGhlIHRpbWVvdXQgaW50ZXJ2YWwgaXMgc2V0IHRvIDUwMDAgbWlsbGlvbnNlY29uZHMuXG4gICAgICAgICAqL1xuICAgICAgICAvLyBoZWFydGJlYXQoKSA6IHZvaWQge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy53cy5zZW5kKCdoZWFydGJlYXQnKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICAvLyAgICAgfSwgNTAwMCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayBpbnRvIG15TWVzc2FnZSB0eXBlLlxuICAgICAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYWxsIHRoZSBtZXNzYWdlcyBhbmQgZGVsaXZlciB0byBhcHBsaWNhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihkYXRhLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuY3JkdElkLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWVzc2FnZUJ1ZmZlcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVpZCA9IHJlcGxpY2FJZDtcbiAgICAgICAgdGhpcy52Y01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyc0J5SWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8vIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcigncGluZycsIGZ1bmN0aW9uKHBpbmdNZXNzYWdlKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlIGEgcGluZyA6ICcgKyBwaW5nTWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHRJZCBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3JkdElkKGNyZHRJZCkge1xuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdCB3aXRoIGl0cyBJRCBhbmQgY29ycmVzcG9uZGluZyBtZXNzYWdlXG4gICAgICogbGlzdGVuZXIgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0TWVzc2FnZUxpc3RlbmVyIHRoZSBtZXNzYWdlIGxpc3RlbmVyIG9mIGVhY2ggY3JkdC5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBJRCBvZiBlYWNoIGNyZHQuXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0TWVzc2FnZUxpc3RlbmVyLCBjcmR0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSB8fCB0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgY3JkdElkOiBcIiArIGNyZHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLnNldChjcmR0SWQsIGNyZHRNZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGZ1bmN0aW9uIG9uIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrIGxheWVyLCB3aGljaCBjYWxsZWRcbiAgICAgKiBieSBjcmR0J3MgcnVudGltZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRoZSBtZXNzYWdlIGlzIHdyYXBwZWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0aW1lc3RhbXAgKGJhc2ljIHNlbmRlciBub2RlXG4gICAgICogaW5mbyBhbmQgdmVjdG9yIGNsb2NrKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIFdlYlNvY2tldCBhcyBuZXR3b3JrIHRyYW5zbWlzc2lvbiBwcm90b2NvbC5cbiAgICAgKiBVc2luZyBKU09OIGZvcm1hdCBhcyBtZXNzYWdlIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgbm90IE9wZW4sIHRoZW4gYnVmZmVyIHRoZSBtZXNzYWdlIGFuZFxuICAgICAqIHdhaXQgdW50aWwgV2ViU29ja2V0IG9wZW4uXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIE9wZW4sIHRoZW4gc2VuZCBpdCB3aXRoIHdzLnNlbmQoKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHRoZSBjcmR0IHVwZGF0ZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIHVuaXF1ZSBJRCBmb3IgZWFjaCBjcmR0LlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZSwgY3JkdElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNyZHRJZCBleGlzdCBpbiB0aGUgbWFwLlxuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhpcy52Y01hcC5nZXQoY3JkdElkKS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpLmluY3JlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrIGZvciBzZW5kaW5nXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcCgoX2EgPSB0aGlzLnZjTWFwLmdldChjcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgY3JkdElkLCB2Y0NvcHkpO1xuICAgICAgICAvLyBDb252ZXJ0IHRoZSBtZXNzYWdlIGludG8gSlNPTlxuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQobXlQYWNrYWdlLnRvSlNPTigpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKG15UGFja2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuZXh0IHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gY3JkdElkIGluIHRoaXMgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgcGFzc2VkIHRvIENyZHRJbnRlcm5hbC5lZmZlY3Qgd2hlbiBhIHJlcGxpY2EgcHJvY2Vzc2VzIGl0cyBvd25cbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXROZXh0VGltZXN0YW1wKGNyZHRJZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrLlxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAoKF9hID0gdGhpcy52Y01hcC5nZXQoY3JkdElkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFzVmVjdG9yQ2xvY2soKSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuXG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCB2Y0NvcHkudmVjdG9yTWFwLmdldCh0aGlzLnVpZCkgKyAxKTtcbiAgICAgICAgcmV0dXJuIHZjQ29weTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIHRvIGN1c3RvbWl6ZWQgZGF0YSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgdHJhdmVsIHRocm91Z2ggbmV0d29yay5cbiAgICAgKiBAcmV0dXJucyB0aGUgY3VzdG9taXplZCBkYXRhIHR5cGUgPT4gbXlNZXNzYWdlXG4gICAgICovXG4gICAgcGFyc2VKU09OKGRhdGEpIHtcbiAgICAgICAgbGV0IGRhdGFKU09OID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IHZjID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShkYXRhSlNPTi5tZXNzYWdlLCBkYXRhSlNPTi5jcmR0SWQsIHZjKTtcbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmdcbiAgICAgKiBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGNoZWNrTWVzc2FnZUJ1ZmZlcigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJDcmR0SWQgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdO1xuICAgICAgICAgICAgbGV0IGN1clZlY3RvckNsb2NrID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXTtcbiAgICAgICAgICAgIGlmICghdGhpcy52Y01hcC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG15VmVjdG9yQ2xvY2sgPSB0aGlzLnZjTWFwLmdldChjdXJDcmR0SWQpO1xuICAgICAgICAgICAgICAgIGlmIChteVZlY3RvckNsb2NrID09PSBudWxsIHx8IG15VmVjdG9yQ2xvY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG15VmVjdG9yQ2xvY2suaXNyZWFkeShjdXJWZWN0b3JDbG9jaykpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lci5cblxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5saXN0ZW5lcnNCeUlkLmdldChjdXJDcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVjZWl2ZSh0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzBdLCBjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrLmluY3JlbWVudFNlbmRlcihjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNyZHROZXR3b3JrUnVudGltZSA9IENyZHROZXR3b3JrUnVudGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya19ydW50aW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gRmlyc3QgYXR0ZW1wdCBhdCB0aGUgaW50ZXJmYWNlIGJldHdlZW4gdGhlIHJ1bnRpbWVcbi8vIChjYXVzYWwgYnJvYWRjYXN0IG5ldHdvcmssIGV0Yy4pIGFuZCB0aGUgQ1JEVHMuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya19ydW50aW1lXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi92ZWN0b3JfY2xvY2tcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZlY3RvckNsb2NrID0gdm9pZCAwO1xuLy8gVGhlIHZlY3RvciBjbG9jayBkZXNpZ25lZCBmb3IgQ1JEVCBsaWJyYXJ5IGFuZCBjYXN1YWwgYnJvYWRjYXN0aW5nXG4vLyBydW50aW1lIHRvIGVuc3VyZSBjb3JyZWN0IGNhdXNhbGl0eS5cbi8qKlxuICogVGhlIHZlY3RvciBjbG9jayBjbGFzcyBmb3IgZW5zdXJpbmcgY2FzdWFsaXR5LlxuICovXG5jbGFzcyBWZWN0b3JDbG9jayB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgdmVjdG9yIHdpdGggcmVwbGljYSdzIG93biBlbnRyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdW5pcXVlIElEIGZvciB0aGlzIHJlcGxpY2EocmVwbGljYUlkKS5cbiAgICAgKi9cbiAgICBnZXRTZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZlY3RvciBjbG9jayB3aXRoIGFsbCB0aGUgZW50cmllcy5cbiAgICAgKi9cbiAgICBhc1ZlY3RvckNsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpblxuICAgICAqIHRoaXMgdmVjdG9yY2xvY2suXG4gICAgICovXG4gICAgZ2V0U2VuZGVyQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVwbGljYXMgaW52b3ZsZWQgaW4gdGhpcyBjcmR0cy5cbiAgICAgKi9cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2ZWN0b3Igb2YgdGhlIHVpZChyZXBsaWNhSWQpIGVudHJ5LlxuICAgICAqL1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCBvbGRWYWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGEgbWVzc2FnZSB3aXRoIGEgY2VydGFpbiB0aW1lc3RhbXAgaXMgcmVhZHkgZm9yIGRlbGl2ZXJ5XG4gICAgICogdG8gZW5zdXJlIGNvcnJlY3QgY2FzdWFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmhhcyhvdGhlclVpZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICpcbiAgICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBtYWlubHkgZG9uZSBhZnRlciBjb3JyZWN0bHkgZGVsaXZlciB0aGUgbWVzc2FnZVxuICAgICAqIHdoZW4gaXNSZWFkeSgpIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIGluY3JlbWVudFNlbmRlcih2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQob3RoZXJVaWQsIG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSBjdXJyZW50IFZlY3RvckNsb2NrIHdpdGggdGhlIHZlY3RvciBjbG9jayByZWNldmllZCBmcm9tXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIG1lcmdlKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIG90aGVyVmVjdG9yTWFwLmdldChpZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBNYXRoLm1heCh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29tZVVpZCB0aGUgcmVwbGljYSdzIHVpZC5cbiAgICAgKiBAcGFyYW0gY2xvY2tWYWx1ZSB0aGUgY2xvY2sgbnVtYmVyIG9mIHRoZSByZXBsaWNhLlxuICAgICAqL1xuICAgIHNldEVudHJ5KHNvbWVVaWQsIGNsb2NrVmFsdWUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSBWZWN0b3JDbG9jaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlY3Rvcl9jbG9jay5qcy5tYXAiLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbnZhciB0PWZ1bmN0aW9uKHIsbil7cmV0dXJuKHQ9T2JqZWN0LnNldFByb3RvdHlwZU9mfHx7X19wcm90b19fOltdfWluc3RhbmNlb2YgQXJyYXkmJmZ1bmN0aW9uKHQscil7dC5fX3Byb3RvX189cn18fGZ1bmN0aW9uKHQscil7Zm9yKHZhciBuIGluIHIpci5oYXNPd25Qcm9wZXJ0eShuKSYmKHRbbl09cltuXSl9KShyLG4pfTtmdW5jdGlvbiByKHIsbil7ZnVuY3Rpb24gaSgpe3RoaXMuY29uc3RydWN0b3I9cn10KHIsbiksci5wcm90b3R5cGU9bnVsbD09PW4/T2JqZWN0LmNyZWF0ZShuKTooaS5wcm90b3R5cGU9bi5wcm90b3R5cGUsbmV3IGkpfXZhciBuLGk9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7fXJldHVybiB0Ll94Zm52MWE9ZnVuY3Rpb24odCl7Zm9yKHZhciByPTIxNjYxMzYyNjEsbj0wO248dC5sZW5ndGg7bisrKXI9TWF0aC5pbXVsKHJedC5jaGFyQ29kZUF0KG4pLDE2Nzc3NjE5KTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gcis9cjw8MTMscl49cj4+Pjcscis9cjw8MyxyXj1yPj4+MTcsKHIrPXI8PDUpPj4+MH19LHR9KCkscz1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKHIpe3ZhciBpPXQuY2FsbCh0aGlzKXx8dGhpcztyZXR1cm4gaS5fYT1uLl94Zm52MWEocikoKSxpfXJldHVybiByKG4sdCksbi5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2ErPTE4MzE1NjU4MTM7cmV0dXJuIHQ9TWF0aC5pbXVsKHRedD4+PjE1LDF8dCksKCgodF49dCtNYXRoLmltdWwodF50Pj4+Nyw2MXx0KSledD4+PjE0KT4+PjApLzQyOTQ5NjcyOTZ9LG59KGkpLGU9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gbihyKXt2YXIgaT10LmNhbGwodGhpcyl8fHRoaXMscz1uLl94Zm52MWEocik7cmV0dXJuIGkuX2E9cygpLGkuX2I9cygpLGkuX2M9cygpLGkuX2Q9cygpLGl9cmV0dXJuIHIobix0KSxuLnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7dGhpcy5fYT4+Pj0wLHRoaXMuX2I+Pj49MCx0aGlzLl9jPj4+PTAsdGhpcy5fZD4+Pj0wO3ZhciB0PXRoaXMuX2ErdGhpcy5fYnwwO3JldHVybiB0aGlzLl9hPXRoaXMuX2JedGhpcy5fYj4+PjksdGhpcy5fYj10aGlzLl9jKyh0aGlzLl9jPDwzKXwwLHRoaXMuX2M9dGhpcy5fYzw8MjF8dGhpcy5fYz4+PjExLHRoaXMuX2Q9dGhpcy5fZCsxfDAsdD10K3RoaXMuX2R8MCx0aGlzLl9jPXRoaXMuX2MrdHwwLCh0Pj4+MCkvNDI5NDk2NzI5Nn0sbn0oaSksbz1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKHIpe3ZhciBpPXQuY2FsbCh0aGlzKXx8dGhpcyxzPW4uX3hmbnYxYShyKTtyZXR1cm4gaS5fYT1zKCksaS5fYj1zKCksaS5fYz1zKCksaS5fZD1zKCksaX1yZXR1cm4gcihuLHQpLG4ucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9iPDw5LHI9NSp0aGlzLl9hO3JldHVybiByPTkqKHI8PDd8cj4+PjI1KSx0aGlzLl9jXj10aGlzLl9hLHRoaXMuX2RePXRoaXMuX2IsdGhpcy5fYl49dGhpcy5fYyx0aGlzLl9hXj10aGlzLl9kLHRoaXMuX2NePXQsdGhpcy5fZD10aGlzLl9kPDwxMXx0aGlzLl9kPj4+MjEsKHI+Pj4wKS80Mjk0OTY3Mjk2fSxufShpKTshZnVuY3Rpb24odCl7dC5zZmMzMj1cInNmYzMyXCIsdC5tdWxiZXJyeTMyPVwibXVsYmVycnkzMlwiLHQueG9zaGlybzEyOHNzPVwieG9zaGlybzEyOHNzXCJ9KG58fChuPXt9KSk7dmFyIF89ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQscil7dm9pZCAwPT09ciYmKHI9bi5zZmMzMiksdGhpcy5fc3RyPXQsdGhpcy5fcHJuZz1yLHRoaXMuX2dlbmVyYXRvcj10aGlzLl9pbml0aWFsaXplR2VuZXJhdG9yKCl9cmV0dXJuIHQucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZ2VuZXJhdG9yLm5leHQoKX0sdC5wcm90b3R5cGUuX2luaXRpYWxpemVHZW5lcmF0b3I9ZnVuY3Rpb24oKXtpZihmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09PXR9KHQ9dGhpcy5fc3RyKXx8ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXR9KHQpKXJldHVybiB0aGlzLl93cmFwKCk7dmFyIHQ7c3dpdGNoKHRoaXMuX3Bybmcpe2Nhc2VcInNmYzMyXCI6cmV0dXJuIG5ldyBlKHRoaXMuX3N0cik7Y2FzZVwibXVsYmVycnkzMlwiOnJldHVybiBuZXcgcyh0aGlzLl9zdHIpO2Nhc2VcInhvc2hpcm8xMjhzc1wiOnJldHVybiBuZXcgbyh0aGlzLl9zdHIpO2RlZmF1bHQ6cmV0dXJuIHRoaXMuX3dyYXAoKX19LHQucHJvdG90eXBlLl93cmFwPWZ1bmN0aW9uKCl7cmV0dXJue25leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5yYW5kb20oKX19fSx0fSgpO2V4cG9ydCBkZWZhdWx0IF87ZXhwb3J0e24gYXMgUFJOR307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5kLXNlZWQuZXMuanMubWFwXG4iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiLyogQ3JlYXRpbmcgdGhlIGdyaWQgKi9cbmltcG9ydCB7TWluZXN3ZWVwZXJDcmR0fSBmcm9tIFwiLi9taW5lc3dlZXBlcl9jcmR0XCI7XG5pbXBvcnQgeyBuZXR3b3JrIH0gZnJvbSAnY29tcG92ZW50dWFscy1jbGllbnQnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG5mdW5jdGlvbiBncmlkKGdhbWU6IE1pbmVzd2VlcGVyQ3JkdCkge1xuICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgYm9hcmQuaW5uZXJIVE1MID0gXCJcIlxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgaisrKSB7XG4gICAgICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcInJvd1wiLCBpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZShcImNvbFwiLCBqLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgYm94LmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgICAgICAgYm94LmlkID0gXCJyb3dfXCIgKyBpLnRvU3RyaW5nKCkgKyBcIl9cIiArIGoudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGdhbWUubGVmdENsaWNrZWQoaSwgaik7XG4gICAgICAgICAgICAgICAgZ3JpZChnYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vICAgICBnYW1lLnJpZ2h0Q2xpY2tlZChpLCBqKTtcbiAgICAgICAgICAgIC8vICAgICBncmlkKGdhbWUpO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICBib3guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZ2FtZS5kaXNwbGF5KGksIGopKSlcbiAgICAgICAgICAgIGJveC5zdHlsZS5jb2xvciA9IGdhbWUuY29sb3IoaSwgailcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChib3gpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH1cbn1cblxubGV0IEhPU1QgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKVxuXG5jb25zdCBjbGllbnRfdXVpZCA6IHN0cmluZyA9IHV1aWQoKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDUkRUcycgUnVudGltZSBvbiBlYWNoIGNsaWVudCBhbmQgY3JlYXRlIENSRFRzIChlLmcuIENvdW50ZXJDcmR0KS5cbiAqL1xubGV0IGNsaWVudCA9IG5ldyBuZXR3b3JrLkNyZHROZXR3b3JrUnVudGltZShjbGllbnRfdXVpZCwgSE9TVCk7XG5cbmxldCBzZWVkID0gJzQyJztcblxubGV0IGdhbWUgPSBuZXcgTWluZXN3ZWVwZXJDcmR0KFwibWluZXN3ZWVwZXJJZFwiLCBjbGllbnQsMTYsIDE2LCA0MCwgc2VlZClcblxuZ3JpZChnYW1lKTtcblxuIiwiaW1wb3J0IHtjcmR0cywgbmV0d29ya30gZnJvbSBcImNvbXBvdmVudHVhbHMtY2xpZW50XCI7XG5pbXBvcnQgUmFuZCBmcm9tICdyYW5kLXNlZWQnO1xuXG5lbnVtIEdhbWVTdGF0dXMge1xuICAgIEJPT00sXG4gICAgV09OLFxuICAgIENPTlRcbn1cblxuZW51bSBUaWxlU3RhdHVzIHtcbiAgICBDT1ZFUkVEID0gMCxcbiAgICBSRVZFQUxFRF9FTVBUWSA9IC0xLFxuICAgIEJPT00gPSAtMixcbn1cblxuZXhwb3J0IGNsYXNzIE1pbmVzd2VlcGVyQ3JkdCBleHRlbmRzIGNyZHRzLkNyZHQ8bnVtYmVyW10+IHtcblxuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgbWluZXM6IFNldDxudW1iZXI+O1xuICAgIHJhbmQ6IFJhbmQ7XG5cbiAgICBjb25zdHJ1Y3RvcihpZDogYW55LCBydW50aW1lOiBuZXR3b3JrLkNyZHRSdW50aW1lLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbnVtTWluZXM6IG51bWJlciwgc2VlZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBib2FyZDogbnVtYmVyW10gPSBBcnJheSh3aWR0aCAqIGhlaWdodCk7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBuZXcgY3JkdHMuQXJyYXlDcmR0SW50ZXJuYWwobmV3IGNyZHRzLk1pbmVzd2VlcGVySW50ZXJuYWwoKSksXG4gICAgICAgICAgICBydW50aW1lLFxuICAgICAgICAgICAgYm9hcmRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5yYW5kID0gbmV3IFJhbmQoc2VlZCk7XG4gICAgICAgIHRoaXMubWluZXMgPSB0aGlzLnBsYWNlTWluZXMod2lkdGgsIGhlaWdodCwgbnVtTWluZXMpO1xuICAgIH1cblxuICAgIGxlZnRDbGlja2VkKHg6IG51bWJlciwgeTogbnVtYmVyKTogR2FtZVN0YXR1cyB7XG4gICAgICAgIGlmICh0aGlzLmlzTWluZSh4LCB5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh4LCB5LCBUaWxlU3RhdHVzLkJPT00pXG4gICAgICAgICAgICByZXR1cm4gR2FtZVN0YXR1cy5CT09NO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNSZXZlYWxlZCh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuIEdhbWVTdGF0dXMuQ09OVDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmV2ZWFsKHgsIHkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmhhc1dvbigpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB1c2VyIHdpbnMgd2hlbiBvbmx5IG1pbmVzIGFyZSBjb3ZlcmVkIG9yIGZsYWdnZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYXNXb24oKTogR2FtZVN0YXR1cyB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBUaWxlU3RhdHVzLkNPVkVSRUQgJiYgIXRoaXMubWluZXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lU3RhdHVzLkNPTlQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEdhbWVTdGF0dXMuV09OO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlcyB0aGUgYm9hcmQgc3RhcnRpbmcgZnJvbSAoeCwgeSkgdW50aWwgdGhlcmUgaXNcbiAgICAgKiBhdCBsZWFzdCBvbmUgbmVpZ2hib3IgbWluZS5cbiAgICAgKiBJdCBhc3N1bWVzIHRoYXQgKHgsIHkpIGlzIG5vdCBhIG1pbmUuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXZlYWwoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG5laWdoYm9yczogQXJyYXk8W251bWJlciwgbnVtYmVyXT4gPSB0aGlzLnJlc29sdmVOZWlnaGJvcnMoeCwgeSk7XG4gICAgICAgIGxldCBuZWlnaGJvcmluZ01pbmVzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IG5laWdoYm9yIG9mIG5laWdoYm9ycykge1xuICAgICAgICAgICAgbGV0IFt4X25laWdoYm9yLCB5X25laWdoYm9yXTogW251bWJlciwgbnVtYmVyXSA9IG5laWdoYm9yO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNaW5lKHhfbmVpZ2hib3IsIHlfbmVpZ2hib3IpKSB7XG4gICAgICAgICAgICAgICAgbmVpZ2hib3JpbmdNaW5lcyArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlcmUgaXMgYXQgbGVhc3Qgb25lIG1pbmUgaW4gdGhlIHN1cnJvdW5kaW5nc1xuICAgICAgICBpZiAobmVpZ2hib3JpbmdNaW5lcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoeCwgeSwgbmVpZ2hib3JpbmdNaW5lcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFZhbHVlKHgsIHksIFRpbGVTdGF0dXMuUkVWRUFMRURfRU1QVFkpO1xuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGwgcmV2ZWFsIG9uIHRoZSBub24tcmV2ZWFsZWQgKG9yIGZsYWdnZWQpIG5laWdoYm9yc1xuICAgICAgICBmb3IgKGxldCBuZWlnaGJvciBvZiBuZWlnaGJvcnMpIHtcbiAgICAgICAgICAgIGxldCBbeF9uZWlnaGJvciwgeV9uZWlnaGJvcl06IFtudW1iZXIsIG51bWJlcl0gPSBuZWlnaGJvcjtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1JldmVhbGVkKHhfbmVpZ2hib3IsIHlfbmVpZ2hib3IpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlYWwoeF9uZWlnaGJvciwgeV9uZWlnaGJvcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VmFsdWUoeDogbnVtYmVyLCB5OiBudW1iZXIsIHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlkeDogbnVtYmVyID0gdGhpcy5nZXRJbmRleCh4LCB5KTtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtpZHgsIHZhbHVlXSlcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VmFsdWUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSB0aGlzLmdldEluZGV4KHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaWR4KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0KGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVbaWR4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3IgY29vcmRpbmF0ZXMgW3gsIHldLCBpdCBmaW5kcyB0aGUgY29ycmVzcG9uZGluZyBpbmRleCBpbiB0aGUgdmFsdWVzIGFycmF5LlxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0SW5kZXgoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCEoTnVtYmVyLmlzSW50ZWdlcih4KSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHkpICYmIHggPj0gMCAmJiB4IDwgdGhpcy53aWR0aCAmJiB5ID49IDAgJiYgeSA8IHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT3V0IG9mIGJvdW5kczogW1wiICsgeCArIFwiLCBcIiArIHkgKyBcIl1cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggKiB0aGlzLndpZHRoICsgeTtcbiAgICB9XG5cbiAgICAvLyA8LS0tLS0tLSBVVElMSVRJRVMgLS0tLS0tLT5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBjZWxsIGhhcyBiZWVuIHJldmVhbGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICogUmV2ZWFsZWQgbWVhbnMgZWl0aGVyIGl0IGhhcyBhIG51bWJlciwgb3IgaGFzIGJlZW4gZmxpcHBlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGlzUmV2ZWFsZWQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSh4LCB5KVxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IFRpbGVTdGF0dXMuUkVWRUFMRURfRU1QVFkgfHwgdmFsdWUgPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBjZWxsIGlzIGEgbWluZSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNNaW5lKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmdldEluZGV4KHgsIHkpXG4gICAgICAgIHJldHVybiB0aGlzLm1pbmVzLmhhcyhpZHgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgY29vcmRpbmF0ZSwgaXQgZmluZHMgYWxsIG9mIGl0J3MgbmVpZ2hib3JzLlxuICAgICAqIEEgbmVpZ2hib3IgaXMgZGVmaW5lZCBhcyB0aGUgOCBzdXJyb3VuZGluZyBjZWxscyAodW5sZXNzIG9uIHRoZSBib3JkZXIsXG4gICAgICogd2hpY2ggd291bGQgYmUgYW55IHN1cnJvdW5kaW5nIGNlbGwgbm90IG91dHNpZGUgaGUgYm9hcmQpLlxuICAgICAqIFNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjUyMTA2L2ZpbmRpbmctbmVpZ2hib3Vycy1pbi1hLXR3by1kaW1lbnNpb25hbC1hcnJheVxuICAgICAqIFBELjogU29ycnkgZm9yIGJlaW5nIGxhenkgYW5kIGxvb2tpbmcgdGhpcyB1cC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc29sdmVOZWlnaGJvcnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPiB7XG4gICAgICAgIGxldCBuZWlnaGJvcnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBNYXRoLm1heCgwLCB4IC0gMSk7IGkgPD0gTWF0aC5taW4oeCArIDEsIHRoaXMud2lkdGggLSAxKTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gTWF0aC5tYXgoMCwgeSAtIDEpOyBqIDw9IE1hdGgubWluKHkgKyAxLCB0aGlzLmhlaWdodCAtIDEpOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoeCAhPT0gaSB8fCB5ICE9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFtpLCBqXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmVpZ2hib3JzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmVzIHdoYXQgdG8gZGlzcGxheSBvbiB0aGUgYm9hcmQuXG4gICAgICogQHBhcmFtIHggdGhlIHggY29vcmRpbmF0ZS5cbiAgICAgKiBAcGFyYW0geSB0aGUgeSBjb29yZGluYXRlLlxuICAgICAqL1xuICAgIGRpc3BsYXkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5nZXRWYWx1ZSh4LCB5KSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKHgsIHkpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1JldmVhbGVkKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJSXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdldFZhbHVlKHgsIHkpID09PSBUaWxlU3RhdHVzLkNPVkVSRUQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgZ290IGhlcmUgaXQgaXMgYSBtaW5lXG4gICAgICAgIHJldHVybiBcIlhcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmVzIHdoYXQgY29sb3Igc2hvdWxkIHRoZSB0aWxlIGJlLlxuICAgICAqIEBwYXJhbSB4IHRoZSB4IGNvb3JkaW5hdGUuXG4gICAgICogQHBhcmFtIHkgdGhlIHkgY29vcmRpbmF0ZS5cbiAgICAgKi9cbiAgICBjb2xvcih4OiBudW1iZXIsIHk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGhpcy5nZXRWYWx1ZSh4LCB5KVxuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJibHVlXCJcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJncmVlblwiXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicmVkXCJcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwdXJwbGVcIlxuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiBcImJsYWNrXCI7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWFyb29uXCI7XG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHJldHVybiBcInR1cnF1b2lzZVwiXG4gICAgICAgICAgICBjYXNlIFRpbGVTdGF0dXMuUkVWRUFMRURfRU1QVFk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiR2FpbnNib3JvXCJcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYmxhY2tcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gZ2V0IGEgbnVtYmVyIGluIHJhbmdlIFswLCBtYXgpXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21JbnQobWF4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5yYW5kLm5leHQoKSAqIE1hdGguZmxvb3IobWF4KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmFuZG9tbHkgcGxhY2VzIHRoZSBtaW5lcyBvbiB0aGUgYm9hcmQuXG4gICAgICogVE9ETyAtIHJldmlzaXQgdGhpcywgYXMgaXQgZG9lc250IGhvbGQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwbGFjZU1pbmVzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBudW1NaW5lczogbnVtYmVyKTogU2V0PG51bWJlcj4ge1xuICAgICAgICBsZXQgaW5kaWNlcyA9IFsuLi5BcnJheSh3aWR0aCAqIGhlaWdodCkua2V5cygpXVxuICAgICAgICBsZXQgbWluZXMgPSBBcnJheShudW1NaW5lcyk7XG4gICAgICAgIHdoaWxlIChudW1NaW5lcyA+IDApIHtcbiAgICAgICAgICAgIGxldCBtaW5lUG9zID0gdGhpcy5nZXRSYW5kb21JbnQoaW5kaWNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgbWluZXNbbnVtTWluZXMgLSAxXSA9IGluZGljZXNbbWluZVBvc11cbiAgICAgICAgICAgIGluZGljZXMuc3BsaWNlKG1pbmVQb3MsIDEpO1xuICAgICAgICAgICAgbnVtTWluZXMtLTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRlYnVnKG1pbmVzLnRvU3RyaW5nKCkpXG4gICAgICAgIHJldHVybiBuZXcgU2V0KG1pbmVzKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9