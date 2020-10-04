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
let clientCounter = new compoventuals_client_1.crdts.Counter2("counterId", client);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvY3JkdHMyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL2pzb24uanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3N0YW5kYXJkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmctYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC92NC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jb3VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELDZCQUE2QixtQkFBTyxDQUFDLHVEQUFhO0FBQ2xELCtCQUErQixtQkFBTyxDQUFDLDJEQUFlO0FBQ3RELGlDOzs7Ozs7Ozs7Ozs7QUN2QmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJEQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7QUM5U2E7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQ2xQYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQzs7Ozs7Ozs7Ozs7O0FDOUZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLCtEQUFlO0FBQ3BDLGFBQWEsbUJBQU8sQ0FBQywyREFBYTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsaURBQVE7QUFDN0I7QUFDQSxhQUFhLG1CQUFPLENBQUMsNkRBQWM7QUFDbkMsYUFBYSxtQkFBTyxDQUFDLDZEQUFjO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyx5REFBWTtBQUNqQyxhQUFhLG1CQUFPLENBQUMscURBQVU7QUFDL0IsaUM7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMseURBQVk7QUFDdkMsc0JBQXNCLG1CQUFPLENBQUMsK0RBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7OztBQ3RjYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsNkRBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMElBQTBJLGFBQWEsV0FBVyxFQUFFO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDdlFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx1Q0FBdUM7QUFDdkMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDOVdhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywrREFBZTtBQUM3QyxvQkFBb0IsbUJBQU8sQ0FBQywyREFBYTtBQUN6QyxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7O0FDaHZCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsbUVBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7Ozs7OztBQ3pQYTtBQUNiO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxrRDs7Ozs7Ozs7Ozs7O0FDSmE7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxhQUFhLG1CQUFPLENBQUMsdUZBQTBCO0FBQy9DLGFBQWEsbUJBQU8sQ0FBQyxtRkFBd0I7QUFDN0MsYUFBYSxtQkFBTyxDQUFDLG1FQUFnQjtBQUNyQyxpQzs7Ozs7Ozs7Ozs7O0FDZmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0M7Ozs7Ozs7Ozs7O0FDcklBLFNBQVMsbUJBQU8sQ0FBQyx1Q0FBTTtBQUN2QixTQUFTLG1CQUFPLENBQUMsdUNBQU07O0FBRXZCO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqQ0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFXO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLGlFQUFtQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzVHQSxVQUFVLG1CQUFPLENBQUMseURBQVc7QUFDN0Isa0JBQWtCLG1CQUFPLENBQUMsaUVBQW1COztBQUU3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBLDBDQUEwQztBQUMxQywyR0FBc0Q7QUFDdEQsK0VBQWtDO0FBRWxDOztHQUVHO0FBQ0gsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztBQUVqRDs7R0FFRztBQUNILE1BQU0sV0FBVyxHQUFZLFNBQUksRUFBRSxDQUFDO0FBRXBDOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsSUFBSSw4QkFBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvRCxpRUFBaUU7QUFDakUsSUFBSSxhQUFhLEdBQUcsSUFBSSw0QkFBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFNUQsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFakQsNERBQTREO0FBQzVELGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDM0IsT0FBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUFBLENBQUMsQ0FBQyxDQUFDO0FBRTFELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsSUFBSSIsImZpbGUiOiJkZXBsb3kvc2l0ZS9jb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2l0ZS9jb3VudGVyLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmR0cyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY3JkdHNcIikpO1xuZXhwb3J0cy5uZXR3b3JrID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9uZXR3b3JrXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NaW5lc3dlZXBlckNyZHQgPSBleHBvcnRzLk1pbmVzd2VlcGVySW50ZXJuYWwgPSBleHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlciA9IGV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWwgPSBleHBvcnRzLkdTZXRDcmR0ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJJbnRlcm5hbCA9IGV4cG9ydHMuQ291bnRlckNyZHQgPSBleHBvcnRzLkNvdW50ZXJJbnRlcm5hbCA9IHZvaWQgMDtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gYWRkL2FkZGVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAwIGFkZHM/XG4gKi9cbmNsYXNzIENvdW50ZXJJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSArIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbn1cbmV4cG9ydHMuQ291bnRlckludGVybmFsID0gQ291bnRlckludGVybmFsO1xuQ291bnRlckludGVybmFsLmluc3RhbmNlID0gbmV3IENvdW50ZXJJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIHNpbXBsZSBjb3VudGVyIENSRFQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgYWRkZWQuXG4gKlxuICogV2FybmluZzogYWRkaXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5jbGFzcyBDb3VudGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgYWRkLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiBjb3VudGVyLnZhbHVlICs9IG4gYW5kIGNvdW50ZXIudmFsdWUgLT0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIGFkZGl0aW9ucykuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlIC0gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVyQ3JkdCA9IENvdW50ZXJDcmR0O1xuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gbXVsdGlwbHkvbXVsdGlwbGllZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMSBtdWx0cz9cbiAqL1xuY2xhc3MgTXVsdFJlZ2lzdGVySW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKiBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRSZWdpc3RlckludGVybmFsID0gTXVsdFJlZ2lzdGVySW50ZXJuYWw7XG5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIHNpbXBsZSBudW1lcmljYWwgcmVnaXN0ZXIgQ1JEVCB3aXRoIG11bHRpcGxpY2F0aW9uIG9wZXJhdGlvbnMuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgbXVsdGlwbGllZC5cbiAqXG4gKiBXYXJuaW5nOiBtdWx0aXBsaWNhdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmNsYXNzIE11bHRSZWdpc3RlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdGlwbGljYXRpb24uICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIHJlZ2lzdGVyLnZhbHVlICo9IG4gYW5kIHJlZ2lzdGVyLnZhbHVlIC89IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBtdWx0aXBsaWNhdGlvbnMpLlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgY3VycmVudCB2YWx1ZSBpcyAwLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1wb3NzaWJsZSB0byBzZXQgdG8gbm9uemVybyB2YWx1ZSB3aGVuIGN1cnJlbnQgdmFsdWUgaXMgemVyb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIDAgLT4gMCBpcyBuby1vcFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubXVsdChuZXdWYWx1ZSAvIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdFJlZ2lzdGVyQ3JkdCA9IE11bHRSZWdpc3RlckNyZHQ7XG4vLyBleHBvcnQgY2xhc3MgQ291bnRlck1vZEludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuLy8gICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1vZHVsdXM6IG51bWJlcikge1xuLy8gICAgICAgICBpZiAobW9kdWx1cyA8IDApIHRocm93IG5ldyBFcnJvcihcIm1vZHVsdXMgaXMgbmVnYXRpdmU6IFwiICsgbW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4vLyAgICAgICAgIGVsc2UgcmV0dXJuIDA7XG4vLyAgICAgfVxuLy8gICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMubW9kKG9wZXJhdGlvbik7XG4vLyAgICAgfVxuLy8gICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4vLyAgICAgICAgIHJldHVybiBbdGhpcy5tb2Qoc3RhdGUgKyBtZXNzYWdlKSwgbWVzc2FnZV07XG4vLyAgICAgfVxuLy8gICAgIG1vZCh4OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICBpZiAoeCA+PSAwKSByZXR1cm4geCAlIHRoaXMubW9kdWx1cztcbi8vICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5tb2R1bHVzIC0gKCgteCkgJSB0aGlzLm1vZHVsdXMpO1xuLy8gICAgIH1cbi8vIH1cbi8qKlxuICogT3BlcmF0aW9ucyBhbmQgbWVzc2FnZXMgYXJlIHRoZSBlbGVtZW50IHRvIGFkZC4gIFRPRE86XG4gKiB0aGlzIG1lYW5zIHRoYXQgYWRkaW5nIG51bGwgd29uJ3Qgd29yayBhcyBHU2V0Q3JkdCB3aWxsIHRyZWF0XG4gKiBpdHMgbWVzc2FnZSBhcyBhIG5vLW9wLiAgRGVzY3JpcHRpb24gaXMgdGhlIGVsZW1lbnQgYWRkZWRcbiAqIChpZiBpdCdzIHJlZHVuZGFudCwgZGVzY3JpcHRpb24gaXMgbnVsbCwgc28gb25jaGFuZ2Ugd29uJ3RcbiAqIHNlZSBhbnl0aGluZykuXG4gKi9cbmNsYXNzIEdTZXRJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5oYXMob3BlcmF0aW9uKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgfVxufVxuR1NldEludGVybmFsLmluc3RhbmNlID0gbmV3IEdTZXRJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIGdyb3ctb25seSBzZXQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBhcnJheSBvZiBlbGVtZW50cyBhZGRlZFxuICogKFtdIG9yIFthZGRlZCBlbGVtZW50XSkuXG4gKlxuICogVE9ETzogYWRkaW5nIGEgbnVsbCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gKiBUT0RPOiBhZGQgYSB0eXBlIGFubm90YXRpb25cbiAqIFRPRE86IHNhbWUgaW50ZXJmYWNlIGFzIEpTIFNldFxuICovXG5jbGFzcyBHU2V0Q3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgR1NldEludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGFkZChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChlbGVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBzZXQuICBUaGlzIHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMuc3RhdGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuR1NldENyZHQgPSBHU2V0Q3JkdDtcbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGluaXRpYWwgdmFsdWUgdG8gc2V0LlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KFtbaW5pdGlhbERhdGEsIG51bGwsIC0xXV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wic2V0XCIsIHZhbHVlXTogc2V0IHRvIHRoZSBnaXZlbiBzaW5nbGUgdmFsdWUuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXQsIHNldHRpbmcgdGhlIHZhbHVlIHNldCB0byBbXS5cbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBfc3RhdGUgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGlmICghKChvcGVyYXRpb25bMF0gPT09IFwic2V0XCIgJiYgb3BlcmF0aW9uWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB8fCBvcGVyYXRpb25bMF0gPT09IFwicmVzZXRcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXM6XG4gICAgICogLSBmb3Igc2V0IG1lc3NhZ2UsIFtcInNldFwiLCBzZXQgdmFsdWVdIChldmVuIGlmIGl0XG4gICAgICogZG9lc24ndCBlbGltaW5hdGUgYWxsIGNhdXNhbGx5IHByaW9yIHZhbHVlcykuXG4gICAgICogLSBmb3IgcmVzZXRzLCBbXCJyZXNldFwiXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAoISgobWVzc2FnZVswXSA9PT0gXCJzZXRcIiAmJiBtZXNzYWdlWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB8fCBtZXNzYWdlWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUodmFsdWUpOyAvL2luaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQodmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSB2YWx1ZVsyXSlcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gXCJzZXRcIikge1xuICAgICAgICAgICAgc3RhdGUuYWRkKFttZXNzYWdlWzFdLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlckludGVybmFsID0gTXVsdGlWYWx1ZVJlZ2lzdGVySW50ZXJuYWw7XG5NdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCgpO1xuY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVyIGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInNldFwiLCB2YWx1ZV0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWVTZXQoKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlWzBdKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJyZXNldFwiXSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVyID0gTXVsdGlWYWx1ZVJlZ2lzdGVyO1xuY2xhc3MgTWluZXN3ZWVwZXJJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHN0YXRlICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZSwgbWVzc2FnZV07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk1pbmVzd2VlcGVySW50ZXJuYWwgPSBNaW5lc3dlZXBlckludGVybmFsO1xuTWluZXN3ZWVwZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNaW5lc3dlZXBlckludGVybmFsKCk7XG5jbGFzcyBNaW5lc3dlZXBlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIE1pbmVzd2VlcGVySW50ZXJuYWwuaW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChuZXdWYWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NaW5lc3dlZXBlckNyZHQgPSBNaW5lc3dlZXBlckNyZHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNpY19jcmR0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3JkdCA9IGV4cG9ydHMuQ3JkdENoYW5nZUV2ZW50ID0gdm9pZCAwO1xuLyoqXG4gKiBBbiBldmVudCBpc3N1ZWQgd2hlbiBhIENSRFQgaXMgY2hhbmdlZCBieSBhbm90aGVyIHJlcGxpY2EuXG4gKiBAcGFyYW0gY2FsbGVyICAgICAgVGhlIENyZHQgaW5zdGFuY2UgdGhhdCB3YXMgY2hhbmdlZC5cbiAqIEBwYXJhbSBkZXNjcmlwdGlvbiBBbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBkZXNjcnB0aW9uIG9mIHRoZSBjaGFuZ2UuXG4gKiBAcGFyYW0gdGltZXN0YW1wICAgVGhlIGNhdXNhbCB0aW1lc3RhbXAgb2YgdGhlIGNoYW5nZS4gTm90ZSB0aGF0XG4gKiBiZWNhdXNlIHNldmVyYWwgQ1JEVHMgY2FuIHNoYXJlIHRoZSBzYW1lIHJ1bnRpbWUsIHRpbWVzdGFtcHNcbiAqIG1heSBub3QgYmUgY29udGluZ3VvdXMgKGUuZy4sIGVudHJpZXMgaW4gdGhlaXIgdmVjdG9yIGNsb2Nrc1xuICogbWlnaHQgc2tpcCBudW1iZXJzKS4gIEhvd2V2ZXIsIGNhdXNhbGx5IG9yZGVyZWQgZGVsaXZlcnkgaXNcbiAqIHN0aWxsIGd1YXJhbnRlZWQuXG4gKi9cbmNsYXNzIENyZHRDaGFuZ2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCBkZXNjcmlwdGlvbiwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdENoYW5nZUV2ZW50ID0gQ3JkdENoYW5nZUV2ZW50O1xuLy8gVXNlci1mYWNpbmcgd3JhcHBlcnMgYXJvdW5kIENSRFRzIHNob3VsZCBleHRlbmQgdGhpcyBjbGFzcyxcbi8vIGFkZGluZyBtZXRob2RzIGZvciB0aGUgQ1JEVCdzIG9wZXJhdGlvbnMgKGUuZy4sIGluY3JlbWVudCgpKVxuLy8gd2hpY2ggY2FsbCB0aGlzIGNsYXNzJ3MgYXBwbHkgbWV0aG9kLlxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhcHBsaWNhdGlvbi1mYWNpbmcgQ1JEVCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJbnN0ZWFkIG9mIGV4cG9zaW5nIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbnMgZGlyZWN0bHksXG4gKiB3aGljaCBoYXZlIGFuIHVuZnJpZW5kbHkgcHJlcGFyZS9lZmZlY3QgaW50ZXJmYWNlLFxuICogZWFjaCBDUkRUIGltcGxlbWVudGF0aW9uIHNob3VsZCBkZWZpbmUgYSBzdWJjbGFzcyBvZiB0aGlzXG4gKiBjbGFzcyB3aXRoIG9yZGluYXJ5LWxvb2tpbmcgbWV0aG9kcyB0byBwZXJmb3JtIG9wZXJhdGlvbnNcbiAqIGFuZCBxdWVyeSB0aGUgc3RhdGUuICBNZXRob2RzIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyBzaG91bGRcbiAqIGNhbGwgYXBwbHlPcCB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIENyZHRJbnRlcm5hbCBvcGVyYXRpb24uXG4gKiBUaGlzIGNsYXNzIHRoZW4gYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgYW5kIHJlY2VpdmluZ1xuICogb2YgbWVzc2FnZXMuXG4gKiBDZi4gQWxnb3JpdGhtIDEgaW4gdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBwYXBlci5cbiAqIEBwYXJhbSBTIFRoZSBzdGF0ZSB0eXBlIG9mIEMuXG4gKi9cbmNsYXNzIENyZHQge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICBBbiBpZCBmb3IgdGhpcyBDUkRULiAgQWxsIENSRFRzIHVzaW5nIHRoZVxuICAgICAqIHNhbWUgQ3JkdFJ1bnRpbWUgbXVzdCBoYXZlIGRpc3RpbmN0IGlkcywgYW5kIHRoZSBpZHMgbXVzdFxuICAgICAqIGJlIHRoZSBzYW1lIGZvciBhbGwgcmVwbGljYXMgb2YgYSBnaXZlbiBDUkRULCBpbiBvcmRlclxuICAgICAqIGZvciB0aGUgQ3JkdFJ1bnRpbWUgdG8gcm91dGUgbWVzc2FnZXMgdG8gdGhlbSBwcm9wZXJseS5cbiAgICAgKiBAcGFyYW0gY3JkdEludGVybmFsICAgIFRoZSBDcmR0SW50ZXJuYWwgdG8gdXNlLiAgTm90ZSB0aGF0IHNpbmNlXG4gICAgICogQ3JkdEludGVybmFsJ3MgZG9uJ3Qgc3RvcmUgc3RhdGVzLCBtdWx0aXBsZSBvYmplY3RzIG1heVxuICAgICAqIHNoYXJlIHRoZSBzYW1lIENyZHRJbnRlcm5hbCBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0gcnVudGltZSBUaGUgQ3JkdFJ1bnRpbWUgdG8gdXNlIGZvciBzZW5kaW5nIGFuZFxuICAgICAqIHJlY2VpdmluZyBtZXNzYWdlcy5cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgIE9wdGlvbmFsIGluaXRpYWwgZGF0YSB0byB1c2Ugd2hlblxuICAgICAqIHNldHRpbmcgdGhlIENyZHRJbnRlcm5hbCdzIGluaXRpYWwgc3RhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIGNyZHRJbnRlcm5hbCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmNyZHRJbnRlcm5hbCA9IGNyZHRJbnRlcm5hbDtcbiAgICAgICAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGlzIHRvIGxpc3RlbiBmb3Igd2hlbiBhbm90aGVyIHJlcGxpY2EgdXBkYXRlc1xuICAgICAgICAgKiB0aGlzIG9iamVjdCdzIHN0YXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbmNoYW5nZSA9ICgoXykgPT4geyB9KTtcbiAgICAgICAgLy8gVE9ETzogZGVzY3JpYmUgXCJ0cmFuc2FjdGlvbnNcIi4gIFJpZ2h0IHdvcmQ/ICBSZW5hbWVcbiAgICAgICAgLy8gXCJhdG9taWNcIiBzdHVmZiBiZWxvdy4gIE11c3QgaGFwcGVuIHN5bmNocm9ub3VzbHkgc29cbiAgICAgICAgLy8gdGhhdCBydW50aW1lLmdldFRpbWVzdGFtcCgpIGRvZXNuJ3QgY2hhbmdlIGFuZFxuICAgICAgICAvLyBubyBtZXNzYWdlcyBhcmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXG4gICAgICAgIC8vIEFsbG93IGNhbGxlciB0byBzdGFydC9lbmQgdHJhbnNhY3Rpb25zP1xuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzID0gW107XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuY3JkdEludGVybmFsLmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMucnVudGltZS5yZWdpc3Rlcih0aGlzLCB0aGlzLmlkKTtcbiAgICB9XG4gICAgc3RhcnRUcmFuc2FjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSB0cmFuc2FjdGlvbiBpcyBhbHJlYWR5IGluIHByb2dyZXNzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiBSZXR1cm5zIHRoZSBkZXNjcmlwdGlvbnMgKHRyYW5zbGF0ZWQpXG4gICAgZW5kVHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB0cmFuc2FjdGlvbiBpcyBpbiBwcm9ncmVzcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucnVudGltZS5zZW5kKHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcywgdGhpcy5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRlc2NyaXB0aW9ucyA9IHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnM7XG4gICAgICAgIHRoaXMuaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRlc2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgdGhlIGdpdmVuIG9wZXJhdGlvbiB0byB0aGUgc3RhdGUsIHVzaW5nIHByZXBhcmUgYW5kIGVmZmVjdCxcbiAgICAgKiBhbmQgc2VuZHMgdGhlIGdlbmVyYXRlZCBtZXNzYWdlIG92ZXIgdGhlIG5ldHdvcmsuXG4gICAgICogSWYgYSB0cmFuc2FjdGlvbiBpcyBpbiBwcm9ncmVzcywgdGhpcyBzZW5kaW5nIGlzIGRlbGF5ZWRcbiAgICAgKiB1bnRpbFxuICAgICAqIEBwYXJhbSAgb3BlcmF0aW9uIFRoZSBvcGVyYXRpb24gdG8gYXBwbHkuXG4gICAgICogQHJldHVybiAgICAgICAgICAgVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjaGFuZ2VzLlxuICAgICAqIFRoaXMgaXMgdGhlIGxpc3Qgb2YgaW5kaXZpZHVhbCBtZXNzYWdlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieVxuICAgICAqIGVmZmVjdCAoc2tpcHBpbmcgbnVsbCBtZXNzYWdlcyksXG4gICAgICogYWZ0ZXIgYmVpbmcgcGFzc2VkIHRocm91Z2ggdHJhbnNsYXRlRGVzY3JpcHRpb24uICBBbiBleGNlcHRpb25cbiAgICAgKiBpcyB0aGF0IGlmIGFsbCBtZXNzYWdlcyBhcmVcbiAgICAgKiBudWxsLCBudWxsIGlzIHJldHVybmVkIHdpdGhvdXQgY2FsbGluZyB0cmFuc2xhdGVEZXNjcmlwdGlvbi5cbiAgICAgKiBUT0RPOiBudWxsIGlmIGluIGEgdHJhbnNhY3Rpb24gKHVzZSBlbmRUcmFuc2FjdGlvbiBpbnN0ZWFkKS5cbiAgICAgKiBUT0RPOiBidXQgd2hhdCBpZiB3ZSB3YW50IGl0IHRvIGRlY2lkZSB3aGF0IHRvIGRvIG5leHQ/XG4gICAgICovXG4gICAgYXBwbHlPcChvcGVyYXRpb24pIHtcbiAgICAgICAgbGV0IG93blRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5pblRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICBvd25UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5ydW50aW1lLmdldE5leHRUaW1lc3RhbXAodGhpcy5pZCk7XG4gICAgICAgIGxldCBtZXNzYWdlID0gdGhpcy5jcmR0SW50ZXJuYWwucHJlcGFyZShvcGVyYXRpb24sIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSk7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QobWVzc2FnZSwgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMucHVzaChyZXN1bHRbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvd25UcmFuc2FjdGlvbilcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHRyYW5zbGF0ZSB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIENyZHRJbnRlcm5hbCBiZWZvcmUgcGFzc2luZyBpdCB0byBvbmNoYW5nZS4gIFRoaXMgaXNcbiAgICAgKiB1c2VmdWwgZm9yIHNlbWlkaXJlY3QgcHJvZHVjdHMgYmVjYXVzZSB0aGUgZGVmYXVsdFxuICAgICAqIFNlbWlkaXJlY3RJbnRlcm5hbCBkZXNjcmlwdGlvbnMgYXJlIG5vdCB1c2VyLWZyaWVuZGx5LlxuICAgICAqIElmIHRoaXMgbWV0aG9kIHJldHVybnMgbnVsbCwgb25jaGFuZ2UgaXMgbm90IGNhbGxlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGlvbiByZXR1cm5zIGRlc2NyaXB0aW9uc1swXS4gIEl0IGlzXG4gICAgICogYXBwcm9wcmlhdGUgd2hlbiB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QgYWxyZWFkeSByZXR1cm5zXG4gICAgICogdXNlci1mcmllbmRseSBkZXNjcmlwdGlvbnMgYW5kIGFwcGx5T3BzIGlzIG9ubHkgZXZlciBjYWxsZWRcbiAgICAgKiB3aXRoIHNpbmdsZSBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtICBkZXNjcmlwdGlvbnMgQSBsaXN0IG9mIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QuICBUaGlzIHdpbGwgYWx3YXlzIGJlIG5vbi1lbXB0eS5cbiAgICAgKiBAcmV0dXJuIFRoZSB0cmFuc2xhdGVkIGRlc2NyaXB0aW9uIHRvIHBhc3MgdG8gdGhpcy5vbmNoYW5nZSxcbiAgICAgKiBvciBudWxsIGlmIHRoaXMub25jaGFuZ2Ugc2hvdWxkIG5vdCBiZSBjYWxsZWQuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25zWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub24tdHJpdmlhbCBvYnNlcnZlZCByZXNldHNcbiAgICAgKiBmb3Igd2hlbiBhIENyZHRPYmplY3QgY29udGFpbmluZyB0aGlzIENyZHQgaXNcbiAgICAgKiByZXNldC4gIFRoZVxuICAgICAqIGRlZmF1bHQgcmV0dXJucyBudWxsLCBzbyBzdWNoIG1hcCByZXNldHMgZG8gbm90aGluZy5cbiAgICAgKiBAcmV0dXJuIEEgbWVzc2FnZSAobm90IG9wZXJhdGlvbikgdGhhdCBjYW4gYmUgYXBwbGllZCB0b1xuICAgICAqIHRoaXMgQ3JkdCB0b2dldGhlciB3aXRoIGFueSB0aW1lc3RhbXBcbiAgICAgKiB0byBjYXVzZSBhbiBvYnNlcnZlZC1yZXNldCBvcGVyYXRpb24sIG9yIG51bGwgdG8gZG9cbiAgICAgKiBub3RoaW5nLiAgRm9yIHRoaXMgQ3JkdFxuICAgICAqIHRvIGJlIGNvcnJlY3QgKGV2ZW50dWFsbHkgY29uc2lzdGVudCkgd2hlbiB1c2VkIGFzIGFcbiAgICAgKiBwcm9wZXJ0eSBpbiBhbiBDcmR0T2JqZWN0LCB0aGUgcmV0dXJuZWQgbWVzc2FnZVxuICAgICAqIG11c3Qgc2F0aXNmeTpcbiAgICAgKiAtIHdoZW4gcGFpcmVkIHdpdGggYW55IENhdXNhbFRpbWVzdGFtcCwgaXQgY29tbXV0ZXMgd2l0aFxuICAgICAqIGNvbmN1cnJlbnQgbWVzc2FnZXMgKHVzdWFsIENyZHQgcmVxdWlyZW1lbnQpLCBpbmNsdWRpbmdcbiAgICAgKiBjb25jdXJyZW50IHJlc2V0cyBhbmQgc3Ryb25nLXJlc2V0cy5cbiAgICAgKiAtIHdoZW4gYXBwbGllZCB0byBhIHN0YXRlIHdoaWNoIGhhcyBub3QgcmVjZWl2ZWQgYW55XG4gICAgICogbWVzc2FnZXMgY2F1c2FsbHkgcHJpb3IgdG8gdGhlIHRpbWVzdGFtcCwgaXQgaGFzXG4gICAgICogbm8gZWZmZWN0LiAgSW4gb3RoZXIgd29yZHMsIGFwcGx5aW5nIGl0IHRvIGEgY29uY3VycmVudGx5XG4gICAgICogaW5pdGlhbGl6ZWQgc3RhdGUgaGFzIG5vIGVmZmVjdC5cbiAgICAgKiBPdGhlcndpc2UsIGl0IGlzIGZyZWUgdG8gaGF2ZSBhbnkgc2VtYW50aWNzLCBpbmNsdWRpbmdcbiAgICAgKiBkb2luZyBub3RoaW5nLiAgSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIG9ic2VydmVkLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIG1lc3NhZ2VzIGluc3RlYWQsIGZvciBnZW5lcmFsaXR5P1xuICAgICAqL1xuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbnRyaXZpYWwgb2JzZXJ2ZWQtcmVzZXRzLlxuICAgICAqIFVubGlrZSBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSwgdGhlcmUgYXJlIG5vIHNwZWNpYWxcbiAgICAgKiByZXF1aXJlbWVudHMgKG90aGVyIHRoYW4gdGhlIHVzdWFsIENyZHQgY29tbXV0YXRpdml0eSkuXG4gICAgICogSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgICogdGhlIG9ic2VydmVkLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKi9cbiAgICByZXNldCgpIHsgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbnRyaXZpYWwgc3Ryb25nLXJlc2V0cy5cbiAgICAgKiBVbmxpa2UgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCksIHRoZXJlIGFyZSBubyBzcGVjaWFsXG4gICAgICogcmVxdWlyZW1lbnRzIChvdGhlciB0aGFuIHRoZSB1c3VhbCBDcmR0IGNvbW11dGF0aXZpdHkpLlxuICAgICAqIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBzdHJvbmctcmVzZXQgc2VtYW50aWNzLlxuICAgICAqL1xuICAgIHJlc2V0U3Ryb25nKCkgeyB9XG4gICAgLy8gLyoqXG4gICAgLy8gICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9uLXRyaXZpYWwgc3Ryb25nIHJlc2V0cy4gIFRoZVxuICAgIC8vICAqIGRlZmF1bHQgcmV0dXJucyBudWxsLCBzbyByZXNldHMgZG8gbm90aGluZy5cbiAgICAvLyAgKiBAcmV0dXJuIEEgbWVzc2FnZSAobm90IG9wZXJhdGlvbikgdGhhdCBjYW4gYmUgYXBwbGllZCB0b1xuICAgIC8vICAqIHRoaXMgQ3JkdCB0b2dldGhlciB3aXRoIGFueSB0aW1lc3RhbXBcbiAgICAvLyAgKiB0byBjYXVzZSBhIHN0cm9uZy1yZXNldCBvcGVyYXRpb24sIG9yIG51bGwgdG8gZG9cbiAgICAvLyAgKiBub3RoaW5nLiAgRm9yIHRoaXMgQ3JkdFxuICAgIC8vICAqIHRvIGJlIGNvcnJlY3QgKGV2ZW50dWFsbHkgY29uc2lzdGVudCkgd2hlbiB1c2VkIGFzIGFcbiAgICAvLyAgKiBwcm9wZXJ0eSBpbiBhbiBDcmR0T2JqZWN0LCB0aGUgcmV0dXJuZWQgbWVzc2FnZVxuICAgIC8vICAqIG11c3Qgc2F0aXNmeTpcbiAgICAvLyAgKiAtIHdoZW4gcGFpcmVkIHdpdGggYW55IENhdXNhbFRpbWVzdGFtcCwgaXQgY29tbXV0ZXMgd2l0aFxuICAgIC8vICAqIGNvbmN1cnJlbnQgbWVzc2FnZXMgKHVzdWFsIENyZHQgcmVxdWlyZW1lbnQpLCBpbmNsdWRpbmdcbiAgICAvLyAgKiBjb25jdXJyZW50IHJlc2V0cyBhbmQgc3Ryb25nLXJlc2V0cy5cbiAgICAvLyAgKiBPdGhlcndpc2UsIGl0IGlzIGZyZWUgdG8gaGF2ZSBhbnkgc2VtYW50aWNzLCBpbmNsdWRpbmdcbiAgICAvLyAgKiBkb2luZyBub3RoaW5nLiAgSG93ZXZlciwgdGhlIGludGVudCBpcyB0aGF0IGl0XG4gICAgLy8gICogYXQgbGVhc3QgYXBwcm94aW1hdGVzXG4gICAgLy8gICogdGhlIHN0cm9uZy1yZXNldCBzZW1hbnRpY3MuXG4gICAgLy8gICovXG4gICAgLy8gZ2V0VW5pdmVyc2FsUmVzZXRTdHJvbmdNZXNzYWdlKCk6IGFueSB7XG4gICAgLy8gICAgIHJldHVybiBudWxsO1xuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3IgdGhpcy5ydW50aW1lIHdoZW4gYW4gYXRvbWljIGxpc3Qgb2ZcbiAgICAgKiBtZXNzYWdlcyBpcyByZWNlaXZlZCBmcm9tIGFub3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICByZWNlaXZlKG1lc3NhZ2VzLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW4gdHJhbnNhY3Rpb247IHRoZSB0cmFuc2FjdGlvbiBtdXN0IFwiICtcbiAgICAgICAgICAgICAgICBcImJlIGVuZGVkIHN5bmNocm9ub3VzbHkgc28gdGhhdCBtZXNzYWdlcyBcIiArXG4gICAgICAgICAgICAgICAgXCJjYW5ub3QgYmUgcmVjZWl2ZWQgaW4gdGhlIGludGVyaW0uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdEludGVybmFsLmVmZmVjdChtZXNzYWdlLCB0aGlzLnN0YXRlLCB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbmNoYW5nZSAmJiBkZXNjcmlwdGlvbnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucyk7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25jaGFuZ2UobmV3IENyZHRDaGFuZ2VFdmVudCh0aGlzLCB0cmFuc2xhdGVkLCB0aW1lc3RhbXApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdCA9IENyZHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X2NvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvdW50ZXIyID0gZXhwb3J0cy5Db3VudGVyMkFkZEV2ZW50ID0gZXhwb3J0cy5DcmR0MiA9IHZvaWQgMDtcbmNsYXNzIENyZHRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRob2QsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxufVxuY2xhc3MgQ3JkdDIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpZCAgICAgIEFuIGlkIGZvciB0aGlzIENSRFQuICBBbGwgQ1JEVHMgdXNpbmcgdGhlXG4gICAgICogc2FtZSBDcmR0UnVudGltZSBtdXN0IGhhdmUgZGlzdGluY3QgaWRzLCBhbmQgdGhlIGlkcyBtdXN0XG4gICAgICogYmUgdGhlIHNhbWUgZm9yIGFsbCByZXBsaWNhcyBvZiBhIGdpdmVuIENSRFQsIGluIG9yZGVyXG4gICAgICogZm9yIHRoZSBDcmR0UnVudGltZSB0byByb3V0ZSBtZXNzYWdlcyB0byB0aGVtIHByb3Blcmx5LlxuICAgICAqIEBwYXJhbSBydW50aW1lIFRoZSBDcmR0UnVudGltZSB0byB1c2UgZm9yIHNlbmRpbmcgYW5kXG4gICAgICogcmVjZWl2aW5nIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgICAgICAgdGhpcy5ydW50aW1lLnJlZ2lzdGVyKHRoaXMsIHRoaXMuaWQpO1xuICAgIH1cbiAgICBjYWxsUmVtb3RlKG1ldGhvZCwgLi4uYXJncykge1xuICAgICAgICAvLyBTZXJpYWxpemUgdGhlIG1ldGhvZCBuYW1lIGFuZCBhcmdzXG4gICAgICAgIC8vIERvIHRoaXMgZmlyc3QgaW4gY2FzZSBjYWxsaW5nIG1ldGhvZCBjaGFuZ2VzIHRoZW1cbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShuZXcgQ3JkdE1lc3NhZ2UobWV0aG9kLm5hbWUsIGFyZ3MpKTtcbiAgICAgICAgLy8gQ2FsbCB0aGUgbG9jYWwgZnVuY3Rpb25cbiAgICAgICAgLy8gQHRzLWlnbm9yZTogVGhpcyBzaG91bGQgd29yayBidXQgVFMgaXMgY29uZnVzZWQgYnkgYXJnc1tdIHZzIEFueVxuICAgICAgICBsZXQgcmVzdWx0ID0gbWV0aG9kLmNhbGwodGhpcywgZmFsc2UsIHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpLCAuLi5hcmdzKTtcbiAgICAgICAgLy8gU2VuZCBtZXNzYWdlIG9uIHRoZSBuZXR3b3JrXG4gICAgICAgIHRoaXMucnVudGltZS5zZW5kKG1lc3NhZ2UsIHRoaXMuaWQpO1xuICAgICAgICAvLyBSZXR1cm4gbG9jYWwgcmVzdWx0XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciB0aGlzLnJ1bnRpbWUgd2hlbiBhbiBhdG9taWMgbGlzdCBvZlxuICAgICAqIG1lc3NhZ2VzIGlzIHJlY2VpdmVkIGZyb20gYW5vdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIHJlY2VpdmUobWVzc2FnZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBtZXNzYWdlT2JqID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VPYmoubWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGRvbid0IHRocm93IGhlcmUsIHRvIGF2b2lkIG1lc3NpbmdcbiAgICAgICAgICAgIC8vIHdpdGggY2FsbGVyLlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gcGFyc2UgQ3JkdE1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZTogQ2FsbCBtZXRob2QgYnkgbmFtZVxuICAgICAgICBsZXQgbWV0aG9kID0gdGhpc1ttZXNzYWdlT2JqLm1ldGhvZF07XG4gICAgICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gVE9ETzogZG9uJ3QgdGhyb3cgaGVyZSwgdG8gYXZvaWQgbWVzc2luZ1xuICAgICAgICAgICAgLy8gd2l0aCBjYWxsZXIuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWV0aG9kIGNhbGxlZCByZW1vdGVseTogXCIgKyBtZXNzYWdlT2JqLm1ldGhvZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogQ2hlY2sgdHlwZT8gIEF0IGxlYXN0IG1ha2Ugc3VyZSBpdCdzIGEgZnVuY3Rpb24/XG4gICAgICAgIG1ldGhvZC5jYWxsKHRoaXMsIHRydWUsIHRpbWVzdGFtcCwgLi4ubWVzc2FnZU9iai5hcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLkNyZHQyID0gQ3JkdDI7XG5jbGFzcyBDb3VudGVyMkFkZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVBZGRlZCwgbmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlQWRkZWQgPSB2YWx1ZUFkZGVkO1xuICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiYWRkXCI7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVyMkFkZEV2ZW50ID0gQ291bnRlcjJBZGRFdmVudDtcbmNsYXNzIENvdW50ZXIyIGV4dGVuZHMgQ3JkdDIge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUpO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgICAgIGlmIChpbml0aWFsVmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICByZW1vdGVBZGQocmVtb3RlQ2FsbGVyLCB0aW1lc3RhbXAsIHRvQWRkKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgKz0gdG9BZGQ7XG4gICAgICAgIGlmIChyZW1vdGVDYWxsZXIgJiYgdGhpcy5vbmNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5vbmNoYW5nZShuZXcgQ291bnRlcjJBZGRFdmVudCh0aGlzLCB0aW1lc3RhbXAsIHRvQWRkLCB0aGlzLnN0YXRlKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkKHRvQWRkKSB7XG4gICAgICAgIHN1cGVyLmNhbGxSZW1vdGUodGhpcy5yZW1vdGVBZGQsIHRvQWRkKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXIyID0gQ291bnRlcjI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0czIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vYmFzaWNfY3JkdHNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vanNvblwiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vbXVsdGlfc2VtaWRpcmVjdCc7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVzZXR0YWJsZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc2VtaWRpcmVjdFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3RhbmRhcmRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRzMlwiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSnNvbkNyZHQgPSB2b2lkIDA7XG5jb25zdCBzdGFuZGFyZF8xID0gcmVxdWlyZShcIi4vc3RhbmRhcmRcIik7XG5jb25zdCBiYXNpY19jcmR0c18xID0gcmVxdWlyZShcIi4vYmFzaWNfY3JkdHNcIik7XG5jbGFzcyBKc29uQ3JkdCBleHRlbmRzIHN0YW5kYXJkXzEuQ3JkdE9iamVjdCB7XG4gICAgLy8gVE9ETzogYXJyYXlzIChzZXF1ZW5jZXMpLiAgVXNlcyBtYXBzIGZvciBub3cuXG4gICAgLy8gVE9ETzogbnVsbHM/XG4gICAgLy8gVE9ETzogYWJpbGl0eSB0byBwYXNzIGluaXRpYWwgdmFsdWUgKHdoaWNoIGlzIG5vdCBzeW5jZWQpLlxuICAgIC8vIE1vcmUgZ2VuZXJhbGx5LCBhYmlsaXR5IHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiB5b3VyXG4gICAgLy8gcHJlZGVmaW5lZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBzeW5jZWQ/XG4gICAgLy8gVXNlIHRoZSBleGlzdGluZyBmbGFnIGFuZCBibG9jayBtZXNzYWdlcyBpbiBDcmR0T2JqZWN0LlxuICAgIGNvbnN0cnVjdG9yKGNyZHRJZCwgcnVudGltZSkge1xuICAgICAgICBzdXBlcihjcmR0SWQsIHJ1bnRpbWUpO1xuICAgICAgICB0aGlzLnN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICAgICAgdGhpcy5ib29sZWFucyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJib29sZWFuc1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBzdGFuZGFyZF8xLkVuYWJsZVdpbnNGbGFnKGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMubnVtYmVycyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJudW1iZXJzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IHN0YW5kYXJkXzEuSW50UmVnaXN0ZXJDcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMuc3RyaW5ncyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJzdHJpbmdzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IGJhc2ljX2NyZHRzXzEuTXVsdGlWYWx1ZVJlZ2lzdGVyKGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMuc2V0cyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJzZXRzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IHN0YW5kYXJkXzEuQWRkV2luc1NldChrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBuZXcgc3RhbmRhcmRfMS5NYXBDcmR0KFwib2JqZWN0c1wiLCB0aGlzLCAoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBKc29uQ3JkdChrZXksIGludGVybmFsUnVudGltZSkpO1xuICAgICAgICB0aGlzLmVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgQ3JkdCB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHN0b3JpbmdcbiAgICAgKiB2YWx1ZXMgd2l0aCB0aGUgc2FtZSB0eXBlIGFzIHR5cGVJbmRpY2F0b3IsXG4gICAgICogb3IgdW5kZWZpbmVkIGlmIHRoZSBrZXkgaXMgbm90IHByZXNlbnQgKGluY2x1ZGluZ1xuICAgICAqIGlmIGl0IHByZXZpb3VzbHkgd2FzIHByZXNlbnQgYnV0IHdhcyByZW1vdmVkKS5cbiAgICAgKiAoVXNlIGluaXQgaW5zdGVhZCBpZiB5b3Ugd2FudCBhIGd1YXJhbnRlZWQtZGVmaW5lZFxuICAgICAqIHJldHVybiB2YWx1ZS4pXG4gICAgICogKFRPRE86IGV4cGxhaW4ga2V5cyBhcmVcbiAgICAgKiBzZWdyZWdhdGVkIGJ5IHZhbHVlIHR5cGUpLlxuICAgICAqIEUuZy4gZ2V0KFwiYVwiLCAwKSB0byBnZXQgdGhlIG51bWJlciB2YWx1ZSB3aXRoIGtleSAwLlxuICAgICAqIFN0YW5kYXJkIHR5cGVJbmRpY2F0b3IgdmFsdWVzOlxuICAgICAqIC0gZmFsc2U6IGJvb2xlYW4gKEVuYWJsZVdpbnNGbGFnKVxuICAgICAqIC0gMDogbnVtYmVyIChJbnRSZWdpc3RlckNyZHQpXG4gICAgICogLSBcIlwiOiBzdHJpbmcgKE11bHRpVmFsdWVSZWdpc3RlcjxzdHJpbmc+KVxuICAgICAqIC0gbmV3IFNldCgpOiBzZXQgKEFkZFdpbnNTZXQpXG4gICAgICogLSB7fTogb2JqZWN0IChKc29uQ3JkdClcbiAgICAgKlxuICAgICAqIFRPRE86IGV4cGxpY3RseSB0eXBlZCB2ZXJzaW9ucz8gIENhbiB3ZSBkbyB0aGlzIGNsZXZlcmx5XG4gICAgICogd2l0aCBnZW5lcmljcyBhbmQgdHlwZSBwb2x5bW9ycGhpc20gb3Igc29tZXRoaW5nP1xuICAgICAqXG4gICAgICogQHBhcmFtICBrZXkgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHR5cGVJbmRpY2F0b3IgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgZ2V0KGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuZ2V0KGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIHRoaXMuc3RyaW5ncy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmhhcyhrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuaGFzKGtleSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlKGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYm9vbGVhbnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVycy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpa2UgZ2V0LCBidXQgaW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlIHZhbHVlIENyZHQsXG4gICAgICogcmV0dXJucyBpdHMgdmFsdWUuICBOb3RlIGZvciBzdHJpbmdzLCBpZiB0aGUgQ3JkdFxuICAgICAqIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgdmFsdWUgKGVpdGhlciBvciAyKyksXG4gICAgICogd2hpY2ggaXMgcG9zc2libGUgZHVlIHRvIHRoZSBNdWx0aVZhbHVlUmVnaXN0ZXJcbiAgICAgKiBzZW1hbnRpY3MsIHdlIHJldHVybiB0aGUgc2V0IG9mIGFsbCBjdXJyZW50IHZhbHVlc1xuICAgICAqIGluc3RlYWQgb2YgYSBzaW5nbGUgc3RyaW5nLlxuICAgICAqXG4gICAgICogVE9ETzogdXNlIGdlbmVyaWNzIHRvIHNheSB0aGF0IHJldHVybiB2YWx1ZSBpc1xuICAgICAqIHNhbWUgYXMgdHlwZUluZGljYXRvciB0eXBlIHwgdW5kZWZpbmVkP1xuICAgICAqIFdvcmtzIGV4Y2VwdCBmb3Igc3RyaW5ncyxcbiAgICAgKiB3aGljaCBjb3VsZCBpbnN0ZWFkIHJldHVybiBhIFNldDxzdHJpbmc+LlxuICAgICAqIENvdWxkIGluc3RlYWQgaGF2ZSBzcGVjaWZpY2FsbHkgdHlwZWQgdmVyc2lvbnMgb2YgdGhlIG1ldGhvZC5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZShrZXksIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgbGV0IHZhbHVlQ3JkdCA9IHRoaXMuZ2V0KGtleSwgdHlwZUluZGljYXRvcik7XG4gICAgICAgIGlmICh2YWx1ZUNyZHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHZhbHVlQ3JkdCBpbnN0YW5jZW9mIGJhc2ljX2NyZHRzXzEuTXVsdGlWYWx1ZVJlZ2lzdGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlU2V0ID0gdmFsdWVDcmR0LnZhbHVlU2V0O1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVNldC5zaXplID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVNldC52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUNyZHQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMvcmV2aXZlcyB0aGUgZ2l2ZW4ga2V5IHdpdGggdGhlIGluZGljYXRlZCB0eXBlIGlmXG4gICAgICogbmVlZGVkLCBtYWtpbmcgaXQgcHJlc2VudCBpbiB0aGUgc3RhdGVcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiB0aGUgdmFsdWUgQ3JkdC5cbiAgICAgKi9cbiAgICBpbml0KGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICAvLyBUT0RPOiBjYW4gd2UgZ2VuZXJpZnkgdGhpcyBmdW5jdGlvbiBwYXR0ZXJuP1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmluaXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4ga2V5IHRvIGEgY29weSBvZiB0aGUgZ2l2ZW5cbiAgICAgKiAobm9uLUNyZHQpIHZhbHVlLCB1c2luZyB0aGUgQ3JkdCdzIC52YWx1ZSA9IG1ldGhvZC5cbiAgICAgKiBUaGlzIGdlbmVyYWxseSBoYXMgdGhlIGVmZmVjdCBvZiByZXNldHRpbmcgdGhlIGN1cnJlbnQgQ3JkdFxuICAgICAqIGFuZCB0aGVuIHBlcmZvcm1pbmcgb3BlcmF0aW9ucyB0byBkcml2ZSBpdCB0byB0aGUgZGVzaXJlZFxuICAgICAqIHZhbHVlLiAgSWYgeW91IHdhbnQgbW9yZSBjb250cm9sIG92ZXIgaG93IHRoZSB2YWx1ZSBpcyBzZXRcbiAgICAgKiAoZS5nLiwgcGFzc2luZyBhbiBvcHRpb24gdG8gSnNvbkNyZHQuZ2V0QXNPYmplY3Qgd2hlbiBzZXR0aW5nXG4gICAgICogYW4gb2JqZWN0J3MgdmFsdWUpLCB5b3UgY2FuIGluc3RlYWQgZ2V0IHRoZSBDcmR0IHdpdGhcbiAgICAgKiB0aGlzLmluaXQoa2V5LCB2YWx1ZSkgYW5kIHRoZW4gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGl0XG4gICAgICogZGlyZWN0bHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdmFsdWUgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gVGhlIHJlc3VsdGluZyB2YWx1ZSBDcmR0ICh0aGlzLmdldChrZXksIHZhbHVlKSkuXG4gICAgICovXG4gICAgc2V0VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgbGV0IHZhbHVlQ3JkdCA9IHRoaXMuc2V0VmFsdWVJbnRlcm5hbChrZXksIHZhbHVlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICByZXR1cm4gdmFsdWVDcmR0O1xuICAgIH1cbiAgICBzZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IHZhbHVlQ3JkdCA9IHRoaXMuaW5pdChrZXksIHZhbHVlKTtcbiAgICAgICAgdmFsdWVDcmR0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuICAgIGtleXNCeVR5cGUodHlwZUluZGljYXRvcikge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gdGhpcy5ib29sZWFucy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiB0aGlzLm51bWJlcnMua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgICAgICBpZiAodHlwZUluZGljYXRvciBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRzLmtleXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RzLmtleXMoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIEFycmF5IG9mIFtrZXksIHR5cGUgbmFtZV0gcGFpcnNcbiAgICAgKi9cbiAgICBrZXlzKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLmJvb2xlYW5zLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwiYm9vbGVhblwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLm51bWJlcnMua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJudW1iZXJcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zdHJpbmdzLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwic3RyaW5nXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuc2V0cy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcInNldFwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLm9iamVjdHMua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJvYmplY3RcIl0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlKSB7XG4gICAgICAgIGlmICghKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMgfHxcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0IHx8XG4gICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQga2V5Q29uZmxpY3RSdWxlOiBcIiArXG4gICAgICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY29weSBvZiB0aGlzIENyZHQncyB2YWx1ZSBpbiBPYmplY3QgZm9ybS5cbiAgICAgKiBDaGFuZ2luZyB0aGUgcmV0dXJuZWQgdmFsdWUgaGFzIG5vIGVmZmVjdCBvbiB0aGUgQ3JkdCBzdGF0ZS5cbiAgICAgKiBOb3RlIHRoYXQgc2V0IHZhbHVlcyBhcmUgY29udmVydGVkIHRvIEphdmFzY3JpcHQgU2V0cyxcbiAgICAgKiByZXN1bHRpbmcgaW4gYSBub3QtcXVpdGUtSlNPTiBmb3JtYXQgb2JqZWN0LlxuICAgICAqIEEgc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlciBpcyBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgaWYgaXQgaGFzXG4gICAgICogYSBzaW5nbGUgdmFsdWU7IG90aGVyd2lzZSAoMCBvciAyKyB2YWx1ZXMpIGl0XG4gICAgICogaXMgY29udmVydGVkIHRvIGEgU2V0PHN0cmluZz5cbiAgICAgKiAoQXJyYXk8c3RyaW5nPiBpZiBzZXRzQXNBcnJheXM9dHJ1ZSlcbiAgICAgKiBvZiBhbGwgY3VycmVudCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleUNvbmZsaWN0UnVsZT1Kc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICogUG9saWN5IGZvciBoYW5kbGluZyBrZXlzIG9mIGRpZmZlcmVudCB0eXBlcyB0aGF0IGhhdmUgdGhlXG4gICAgICogc2FtZSBuYW1lLiAgT3B0aW9uczpcbiAgICAgKiAtIEVycm9yT25Db25mbGljdCAoZGVmYXVsdCk6IHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIGEga2V5IGNvbmZsaWN0LlxuICAgICAqIC0gUHJlZml4VHlwZXM6IHByZWZpeCB0aGUgdHlwZSBuYW1lIGZvbGxvd2VkIGJ5IFwiOlwiIHRvIGVhY2gga2V5LFxuICAgICAqIGUuZy4gXCJudW1iZXI6bXlLZXlcIi4gIFR5cGUgbmFtZXMgYXJlIFwiYm9vbGVhblwiLCBcIm51bWJlclwiLFxuICAgICAqIFwic3RyaW5nXCIsIFwic2V0XCIsIFwib2JqZWN0XCIuXG4gICAgICogLSBFeHBhbmRPbkNvbmZsaWN0OiBpZiB0aGVyZSBpcyBhIGNvbmZsaWN0IG9uXG4gICAgICogYSBrZXksIHNldCBpdHMgdmFsdWUgdG8gZXF1YWwgYW4gb2JqZWN0IGNvbnRhaW5pbmcgZWFjaCBvZlxuICAgICAqIHRoZSBjb25mbGljdGluZyB2YWx1ZXMsIHBsdXMgYSBmbGFnIFwianNvbkNyZHRLZXlFeHBhbmRlZCA9IHRydWVcIi4gIEUuZy5cbiAgICAgKiBcIm15S2V5XCI6IHtcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSwgXCJzdHJpbmdcIjogXCJzdHJpbmdWYWx1ZVwiLFxuICAgICAqIFwibnVtYmVyXCI6IDd9XG4gICAgICogQHBhcmFtIHNldHNBc0FycmF5cyA9IGZhbHNlIElmIHRydWUsIFNldCB2YWx1ZXMgYXJlIGNvbnZlcnRlZFxuICAgICAqIHRvIGFycmF5cywgc28gdGhhdCB0aGUgcmVzdWx0aW5nIE9iamVjdCBpcyBpbiByZWd1bGFyIEpTT05cbiAgICAgKiBmb3JtYXQuICBUaGlzIGluY2x1ZGVzIFNldDxzdHJpbmc+IHZhbHVlcyByZXN1bHRpbmcgZnJvbVxuICAgICAqIHN0cmluZyBNdWx0aVZhbHVlUmVnaXN0ZXJzIHRoYXQgaGF2ZSAwIG9yIDIrIHZhbHVlcy5cbiAgICAgKi9cbiAgICBnZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QsIHNldHNBc0FycmF5cyA9IGZhbHNlKSB7XG4gICAgICAgIEpzb25DcmR0LmNoZWNrS2V5Q29uZmxpY3RSdWxlKGtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIGxldCBvYmplY3QgPSB7fTtcbiAgICAgICAgLy8gTWFwcyBrZXlzIHRvIHRoZSBuYW1lIG9mIHRoZWlyIGZpcnN0IHR5cGVcbiAgICAgICAgbGV0IGtleXNTb0ZhciA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGNvbmZsaWN0ZWRLZXlzU29GYXIgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLmJvb2xlYW5zLCBcImJvb2xlYW5cIiwgdmFsdWUgPT4gdmFsdWUudmFsdWUpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5udW1iZXJzLCBcIm51bWJlclwiLCB2YWx1ZSA9PiB2YWx1ZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLnN0cmluZ3MsIFwic3RyaW5nXCIsIHZhbHVlID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZS52YWx1ZVNldDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc2l6ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNldHNBc0FycmF5cyA/IFsuLi5yZXN1bHQudmFsdWVzKCldIDogcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLnNldHMsIFwic2V0XCIsIHZhbHVlID0+IChzZXRzQXNBcnJheXMgPyBbLi4udmFsdWUudmFsdWVdIDogdmFsdWUudmFsdWUpKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMub2JqZWN0cywgXCJvYmplY3RcIiwgdmFsdWUgPT4gdmFsdWUuZ2V0QXNPYmplY3Qoa2V5Q29uZmxpY3RSdWxlLCBzZXRzQXNBcnJheXMpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCBtYXAsIHR5cGVOYW1lLCB2YWx1ZUZ1bmMpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIG1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHZhbHVlRnVuYyhtYXAuZ2V0KGtleSkpO1xuICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuUHJlZml4VHlwZXMpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbdHlwZU5hbWUgKyBcIjpcIiArIGtleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIEtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIGlmIChrZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUga2V5OiBcIiArIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIiB3aGVuIGtleUNvbmZsaWN0UnVsZT1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkpzb25DcmR0LkVycm9yT25Db25mbGljdFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmZsaWN0ZWRLZXlzU29GYXIuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4cGFuZCB0aGUgZXhpc3RpbmcgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZsaWN0ZWRLZXlzU29GYXIuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhwYW5kZWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRba2V5c1NvRmFyLmdldChrZXkpXSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBleHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmplY3Rba2V5XVt0eXBlTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBObyBrZXkgY29uZmxpY3RcbiAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGtleXNTb0Zhci5zZXQoa2V5LCB0eXBlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoaXMgb2JqZWN0IGFuZCB0aGVuIHBlcmZvcm1zIG9wZXJhdGlvbnMgdG9cbiAgICAgKiBkcml2ZSBpdHMgdmFsdWUgdG8gdGhlIGdpdmVuIEpTT04tbGlrZSBPYmplY3QuXG4gICAgICogUHJvcGVydGllcyB0aGF0IGFyZSBub3QgYm9vbGVhbnMsIG51bWJlcnMsIHN0cmluZ3MsXG4gICAgICogU2V0cywgb3Igb2JqZWN0cyBhcmUgaWdub3JlZDsgb2JqZWN0cyBiZXNpZGVzIFNldHNcbiAgICAgKiBhcmUgcHJvY2Vzc2VkIHJlY3Vyc2l2ZWx5LlxuICAgICAqXG4gICAgICogVE9ETzogZm9yIG5vdywgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgdG8gc2V0cy5cbiAgICAgKlxuICAgICAqIElmIG5ld1ZhbHVlIGNvbWVzIGZyb20gYSBKc29uQ3JkdCdzIC52YWx1ZSBvciBnZXRBc09iamVjdFxuICAgICAqIG1ldGhvZHMsIG5vdGUgdGhhdCBzZXRzL2FycmF5cyBvZiBzdHJpbmdzIHJlc3VsdGluZyBmcm9tXG4gICAgICogbXVsdGktdmFsdWUgcmVnaXN0ZXJzIHdpbGwgYmUgdHJlYXRlZCBhcyBzZXRzLCBub3RcbiAgICAgKiBzdHJpbmcgdmFsdWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICBuZXdWYWx1ZSBUaGUgdmFsdWUgdG8gc2V0IHRvLlxuICAgICAqIEBwYXJhbSBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdFxuICAgICAqIElmIG5ld1ZhbHVlIHdhcyBnZW5lcmF0ZWQgYnkgZ2V0QXNPYmplY3QsIHRoZSBrZXlDb25mbGljdFJ1bGVcbiAgICAgKiB1c2VkIHRvIGdlbmVyYXRlIGl0LCBzbyB0aGF0IHdlIGNhbiB1bmRvIHRoZSBlZmZlY3RcbiAgICAgKiBvZiB0aGF0IHJ1bGUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KToga2V5cyBhbmQgdmFsdWVzIGFyZSB1c2VkIGxpdGVyYWxseSxcbiAgICAgKiB3aXRoIGluZmVycmVkIHR5cGVzLlxuICAgICAqIFRoaXMgaXMgYXBwcm9wcmlhdGUgZm9yIE9iamVjdHMgbm90IGNvbWluZyBmcm9tIGEgSnNvbkNyZHQnc1xuICAgICAqIGdldEFzT2JqZWN0IGZ1bmN0aW9uLCBpbiB3aGljaCB3ZSB3YW50IHRvIGtlZXAga2V5cyBhc1xuICAgICAqIHRoZXkgYXJlLlxuICAgICAqIC0gUHJlZml4VHlwZXM6IFR5cGVzIGFyZSB0YWtlbiBmcm9tIHByZWZpeGVzIG9uIGtleXMuICBJZiBhXG4gICAgICoga2V5IGRvZXMgbm90IGhhdmUgYSB0eXBlIHByZWZpeCwgaXQgaXMgaWdub3JlZC5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IG9iamVjdHMgd2l0aCBhIHByb3BlcnR5IFwianNvbkNyZHRLZXlFeHBhbmRlZFwiIHNldFxuICAgICAqIHRvIHRydWUgYXJlIGludGVycHJldGVkIGFzIHRoZSByZXN1bHQgb2YgZXhwYW5kaW5nIGFcbiAgICAgKiBrZXkgZHVlIHRvIGEgY29uZmxpY3QuICBJZiBzdWNoIGFuIG9iamVjdCBkb2VzIG5vdCBoYXZlXG4gICAgICogdGhlIGV4cGVjdGVkIGZvcm1hdCwgYW55IHByb3BlcnRpZXMgd2l0aCB1bnJlY29nbml6ZWQgbmFtZXNcbiAgICAgKiBhcmUgaWdub3JlZC5cbiAgICAgKi9cbiAgICBzZXRUb09iamVjdChuZXdWYWx1ZSwgbmV3VmFsdWVLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5tZXJnZU9iamVjdEludGVybmFsKG5ld1ZhbHVlLCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBvcGVyYXRpb25zIHRvIGRyaXZlIHRoaXMgQ3JkdCdzIHZhbHVlIHRvIHRoZVxuICAgICAqIGdpdmVuIEpTT04tbGlrZSBPYmplY3QncyBzdGF0ZSwgYnV0IHdpdGhvdXQgcmVzZXR0aW5nXG4gICAgICogdGhlIGN1cnJlbnQgdmFsdWUuICBUaGUgbWFpbiBlZmZlY3Qgb2YgdGhpcyBpcyB0b1xuICAgICAqIG1lcmdlIGtleXM7IGluIGNhc2Ugb2Yga2V5IGNvbmZsaWN0cywgdGhlIHZhbHVlcyBhcmUgbWVyZ2VkXG4gICAgICogaW4gYSB0eXBlLXNwZWNpZmljIHdheSAoVE9ETzogZGV0YWlscykuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgaXMgbm90IGEgbWVyZ2UgaW4gdGhlIHNlbnNlIG9mIGEgc3RhdGUtYmFzZWQgQ3JkdC5cbiAgICAgKiBJbnN0ZWFkLCBpdCB0aGUgQ3JkdCB2ZXJzaW9uIG9mIG1lcmdpbmcgb3JkaW5hcnkgKG5vbi1DcmR0KVxuICAgICAqIE9iamVjdHMsIGJ5IHJlY3Vyc2l2ZWx5IGNvbWJpbmluZyB0aGVpciBrZXktdmFsdWUgcGFpcnMuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiBzZXRUb09iamVjdCBmb3IgZGlzY2xhaW1lcnMgYW5kXG4gICAgICogb3RoZXJLZXlDb25mbGljdFJ1bGUuXG4gICAgICpcbiAgICAgKiBUT0RPOiByZXR1cm4gbGlzdCBvZiBjaGFuZ2VzP1xuICAgICAqIEBwYXJhbSAgb3RoZXIgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIG1lcmdlT2JqZWN0KG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5tZXJnZU9iamVjdEludGVybmFsKG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgbWVyZ2VPYmplY3RJbnRlcm5hbChvdGhlciwgb3RoZXJLZXlDb25mbGljdFJ1bGUgPSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QpIHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUob3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICAvLyBFeHRyYWN0IHByb3BlcnRpZXMgYXMgYW4gYXJyYXkgb2YgW25hbWUsIHR5cGUsIHZhbHVlXVxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBvdGhlcikge1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IG90aGVyW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGxldCB0eXBlO1xuICAgICAgICAgICAgaWYgKG90aGVyS2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHByb3BOYW1lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgICAgICB0eXBlID0gcHJvcE5hbWUuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHByb3BOYW1lID0gcHJvcE5hbWUuc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vIE11bHRpLXZhbHVlZCBzdHJpbmdzIGFyZSB0cmVhdGVkIGFzIHNldHNcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgU2V0IHx8IHByb3BWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwic2V0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKFtwcm9wTmFtZSwgdHlwZSwgb3RoZXJbcHJvcE5hbWVdXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSBwcm9wZXJ0aWVzIG1heSBncm93IGR1cmluZyBleGVjdXRpb24gZHVlIHRvXG4gICAgICAgIC8vIHVucGFja2luZyBleHBhbmRlZCBrZXlzLlxuICAgICAgICBsZXQgb3JpZ2luYWxMZW5ndGggPSBwcm9wZXJ0aWVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcHJvcE5hbWUgPSBwcm9wZXJ0aWVzW2ldWzBdO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBwcm9wZXJ0aWVzW2ldWzFdO1xuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZSA9IHByb3BlcnRpZXNbaV1bMl07XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgYW4gZXhwYW5kZWQga2V5XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QgJiZcbiAgICAgICAgICAgICAgICBpIDwgb3JpZ2luYWxMZW5ndGggJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgcHJvcFZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgcHJvcFZhbHVlW1wianNvbkNyZHRLZXlFeHBhbmRlZFwiXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIFVucGFjayB0aGUgb2JqZWN0IG9udG8gdGhlIGVuZCBvZiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZXhwYW5kZWROYW1lIGluIHByb3BWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwYW5kZWROYW1lICE9PSBcImpzb25DcmR0S2V5RXhwYW5kZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKFtwcm9wTmFtZSwgZXhwYW5kZWROYW1lLCBwcm9wVmFsdWVbZXhwYW5kZWROYW1lXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgcHJvcGVydHksIGNoZWNraW5nIHRoYXQgaXQncyB0eXBlXG4gICAgICAgICAgICAgICAgLy8gaXMgb25lIHdlIGV4cGVjdC5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0OiBtZXJnZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KHByb3BOYW1lLCB7fSkubWVyZ2VPYmplY3RJbnRlcm5hbChwcm9wVmFsdWUsIG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBcImJvb2xlYW5cIiB8fCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJvb2xlYW4sIG51bWJlciwgc3RyaW5nOiBvdmVyd3JpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVJbnRlcm5hbChwcm9wTmFtZSwgcHJvcFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBcInNldFwiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldDogYWRkIGFsbCB2YWx1ZXMgaW4gc2V0XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRDcmR0ID0gdGhpcy5pbml0KHByb3BOYW1lLCBuZXcgU2V0KCkpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBwcm9wVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDcmR0LmFkZChlbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVsc2Ugc2tpcCB0aGUgZW50cnkgKG5vdCBhIHJlY29nbml6ZWQgdHlwZSkuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuZ2V0QXNPYmplY3QoKS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFzT2JqZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGlzLnNldEFzT2JqZWN0KG5ld1ZhbHVlKS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRUb09iamVjdChuZXdWYWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Kc29uQ3JkdCA9IEpzb25DcmR0O1xuLy8gVE9ETzogZGVsZXRlXG4vLyBUT0RPOiBkZWxldGVTdHJvbmcgKG9uY2UgbWFwIHN1cHBvcnRzIGl0LiAgUGVyaGFwcyB0aHJvd1xuLy8gZXJyb3Igb24gbWFwIHZhbHVlcyBvbmx5Pylcbkpzb25DcmR0LkVycm9yT25Db25mbGljdCA9IDE7XG5Kc29uQ3JkdC5QcmVmaXhUeXBlcyA9IDI7XG5Kc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0ID0gMztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCA9IGV4cG9ydHMuT2JzZXJ2ZWRSZXNldENvbXBvbmVudCA9IGV4cG9ydHMuRGVmYXVsdFJlc2V0V2luc0NyZHQgPSBleHBvcnRzLlJlc2V0V2luc0NvbXBvbmVudCA9IHZvaWQgMDtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuY29uc3Qgc2VtaWRpcmVjdF8xID0gcmVxdWlyZShcIi4vc2VtaWRpcmVjdFwiKTtcbi8vIFRPRE86IGhvdyB0byBkbyBnYXJiYWdlIGNvbGxlY3Rpb24gb2YgcmVzZXQtd2lucyBvcGVyYXRpb25zP1xuLy8gRS5nLiBmb3IgZmxhZ3MgaW4gYSBzZXQ6IGdhcmJhZ2UgY29sbGVjdGlvbiB3aWxsIGZhaWwgaWZcbi8vIHRoZXJlIGFyZSByZXNldC13aW5zIG9wcyBpbiB0aGUgaGlzdG9yeSwgYXMgaXQgc2hvdWxkLCBidXRcbi8vIHdlIHdvdWxkIGxpa2UgdG8gZ2FyYmFnZSBjb2xsZWN0IGFueXdheSBvbmNlIGFsbCB0aGUgcmVzZXQtd2luc1xuLy8gYXJlIGNhdXNhbGx5IHN0YWJsZS5cbmNsYXNzIFJlc2V0V2luc0NvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0ID0gb3JpZ2luYWxDcmR0O1xuICAgICAgICB0aGlzLnJlc2V0SW5pdGlhbERhdGEgPSByZXNldEluaXRpYWxEYXRhO1xuICAgIH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwicmVzZXRcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgYWx3YXlzIFwicmVzZXRcIi5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgX3N0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdGUgd2Ugc2hvdWxkIHJldHVybiBhIGNsb25lIG9mIHRoZSByZXNldCBzdGF0ZSwgbm90XG4gICAgICAgIC8vIGEgZml4ZWQgXCJyZXNldCBzdGF0ZVwiLCBzaW5jZSB0aGUgcmV0dXJuZWQgc3RhdGUgbWF5XG4gICAgICAgIC8vIGJlIG11dGF0ZWQgbGF0ZXIuXG4gICAgICAgIHJldHVybiBbdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSksIFwicmVzZXRcIl07XG4gICAgfVxuICAgIHN0YXRpYyBhZGRUbyhvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdEludGVybmFsKG9yaWdpbmFsQ3JkdCwgbmV3IFJlc2V0V2luc0NvbXBvbmVudChvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpLCAoX20yLCBfbTEpID0+IG51bGwsIDEsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXNldFdpbnNDb21wb25lbnQgPSBSZXNldFdpbnNDb21wb25lbnQ7XG5jbGFzcyBEZWZhdWx0UmVzZXRXaW5zQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxDcmR0SW50ZXJuYWwgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcmVzZXRJbml0aWFsRGF0YSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gcnVudGltZSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gaW5pdGlhbERhdGEgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgb3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGEsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IFJlc2V0V2luc0NvbXBvbmVudC5hZGRUbyhvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsUmVzZXRXaW5zID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0U3Ryb25nKCkge1xuICAgICAgICBzdXBlci5hcHBseU9wKHRoaXMuZ2V0VW5pdmVyc2FsUmVzZXRTdHJvbmdNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbMiwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgYXBwbHlPcChvcGVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzEsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhIHJlc2V0LXdpbnMgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRTdHJvbmdcIl0sIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBpdCBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcGVyYXRpb24gdGhhdCBnZXRzIGtpbGxlZCBieVxuICAgICAqIGEgY29uY3VycmVudCByZXNldC13aW5zIGlzIHNraXBwZWQuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBvcGVyYXRpb25zIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucyxcbiAgICAgKiB3aGljaCBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucywgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC13aW5zIGRlc2NyaXB0aW9uIGlzIFsyLCBcInJlc2V0XCJdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyICYmIGRlc2NbMV0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFN0cm9uZ1wiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzEsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKHRyYW5zbGF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGluc3RlYWQgb2YgdHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqIFNlZSBDcmR0LnRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXRXaW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmYXVsdFJlc2V0V2luc0NyZHQgPSBEZWZhdWx0UmVzZXRXaW5zQ3JkdDtcbi8vIFRPRE86IHJlbmFtZSBvcmlnaW5hbENyZHRJbnRlcm5hbCAoYWJvdmUpIGFuZCBvcmlnaW5hbENyZHRcbi8vIHRvIHJlZmxlY3QgcmVzZXQtd2lucyB2cyByZXNldCwgdG8gYXZvaWQgY29uZnVzaW9uLlxuY2xhc3MgT2JzZXJ2ZWRSZXNldENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0ID0gb3JpZ2luYWxDcmR0O1xuICAgICAgICB0aGlzLnJlc2V0SW5pdGlhbERhdGEgPSByZXNldEluaXRpYWxEYXRhO1xuICAgIH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgW1wicmVzZXRcIiwgbGlzdCBvZlxuICAgICAqIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgb3JpZ2luYWxDcmR0IHdoZW4gcHJvY2Vzc2luZ1xuICAgICAqIHRoZSBtZXNzYWdlcyBhcHBlYXJpbmcgaW4gbWVzc2FnZSAoaS5lLiwgdGhlIG1lc3NhZ2VzIHRoYXRcbiAgICAgKiBhdm9pZGVkIGJlaW5nIHJlc2V0IGJlY2F1c2UgdGhleSB3ZXJlIGNvbmN1cnJlbnQgdG8gdGhlXG4gICAgICogcmVzZXQgb3BlcmF0aW9uKV0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIF9zdGF0ZSwgcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCByZXNldFN0YXRlID0gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgY29uY3VycmVudE1lc3NhZ2Ugb2YgbWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMub3JpZ2luYWxDcmR0LmVmZmVjdChjb25jdXJyZW50TWVzc2FnZVswXSwgcmVzZXRTdGF0ZSwgcmVwbGljYUlkLCBjb25jdXJyZW50TWVzc2FnZVsxXSk7XG4gICAgICAgICAgICByZXNldFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Jlc2V0U3RhdGUsIFtcInJlc2V0XCIsIGRlc2NyaXB0aW9uc11dO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkVG8ob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwobmV3IE9ic2VydmVkUmVzZXRDb21wb25lbnQob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSwgb3JpZ2luYWxDcmR0LCAobTIsIG0xKSA9PiB7IG0xLnB1c2gobTIpOyByZXR1cm4gbTE7IH0sIDIsIHRydWUsIHRydWUsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZlZFJlc2V0Q29tcG9uZW50ID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudDtcbmNsYXNzIERlZmF1bHRSZXNldHRhYmxlQ3JkdCBleHRlbmRzIERlZmF1bHRSZXNldFdpbnNDcmR0IHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIG9yaWdpbmFsQ3JkdEludGVybmFsICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJlc2V0SW5pdGlhbERhdGEgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGtlZXBPbmx5TWF4aW1hbD1mYWxzZSBTdG9yZSBvbmx5IGNhdXNhbGx5IG1heGltYWxcbiAgICAgKiBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSwgdG8gc2F2ZSBzcGFjZSAoYWx0aG91Z2ggcG9zc2libHlcbiAgICAgKiBhdCBzb21lIENQVSBjb3N0KS4gIFRoaXMgaXMgb25seSBhbGxvd2VkIGlmIHRoZSBzdGF0ZVxuICAgICAqIG9ubHkgZXZlciBkZXBlbmRzIG9uIHRoZSBjYXVzYWxseSBtYXhpbWFsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IE9ic2VydmVkUmVzZXRDb21wb25lbnQuYWRkVG8ob3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIG9wIGlmIHdlJ3JlIGFscmVhZHkgcmVzZXQgKG9rYXkgZ2l2ZW5cbiAgICAgICAgLy8gb2JzZXJ2ZS1yZXNldCBzZW1hbnRpY3MpLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpKSB7XG4gICAgICAgICAgICBzdXBlci5hcHBseU9wKFsxLCBcInJlc2V0XCJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIE5vdGUgaGVyZSB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIHRoZSByZXNldC13aW5zIGxheWVyXG4gICAgICAgIC8vIChpdCdzIG5vdCB3cmFwcGVkIGF1dG9tYXRpY2FsbHkgbGlrZSBpbiBzdXBlci5hcHBseU9wcykuXG4gICAgICAgIHJldHVybiBbMSwgWzEsIFtdXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIGFwcGx5T3Aob3BlcmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsyLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0XCIsIFtUT0RPOiByZS1hcHBsaWVkIG9wc11dLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLCB3aGljaFxuICAgICAqIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSwgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC1zdHJvbmcgKGFscmVhZHkgdHJhbnNsYXRlZCBieSBEZWZhdWx0UmVzZXRXaW5zQ3JkdClcbiAgICAgICAgICAgIC8vIGRlc2NyaXB0aW9uIGlzIFwicmVzZXRTdHJvbmdcIlxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT2JzZXJ2ZWQgcmVzZXQgZGVzY3JpcHRpb24gaXMgWzEsIFtcInJlc2V0XCIsXG4gICAgICAgICAgICAvLyBsaXN0IG9mIHJlLWFwcGxpZWQgb3BzXV1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEgJiYgZGVzY1sxXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW4gdGhlIHNlY29uZCBlbnRyeSwgcHV0IHRoZSB0cmFuc2xhdGVkXG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9ucyB0aGF0IGRpZG4ndCBnZXQgcmVzZXQuICBLZWVwIGluXG4gICAgICAgICAgICAgICAgLy8gbWluZCB0aGF0IHRoZXNlIHdpbGwgYmUgZGVzY3JpcHRpb25zIGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gaW5uZXJtb3N0IHNlbWlkaXJlY3QgcHJvZHVjdC4gIFdoYXQgdG8gZG9cbiAgICAgICAgICAgICAgICAvLyBhYm91dCBvcGVyYXRpb25zIHRoYXQgd2VyZSBvcmlnaW5hbGx5IGdyb3VwZWRcbiAgICAgICAgICAgICAgICAvLyBhdG9taWNhbGx5LCBzaW5jZSB0cmFuc2xhdGUgZXhwZWN0cyB0aG9zZVxuICAgICAgICAgICAgICAgIC8vIHRvIGJlIGRlbGl2ZXJlZCB0b2dldGhlcj9cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goW1wicmVzZXRcIiwgZGVzY1sxXVsxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3JpZ2luYWxDcmR0T3BlcmF0aW9uIGlzIG9mIHRoZSBmb3JtIFsyLCBkZXNjXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXNjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZWQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUodHJhbnNsYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXR0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmYXVsdFJlc2V0dGFibGVDcmR0ID0gRGVmYXVsdFJlc2V0dGFibGVDcmR0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzZXR0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlyZWN0SW50ZXJuYWwgPSBleHBvcnRzLlNlbWlkaXJlY3RJbnRlcm5hbCA9IGV4cG9ydHMuU2VtaWRpcmVjdFN0YXRlID0gdm9pZCAwO1xuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmNsYXNzIFNlbWlkaXJlY3RTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoaW50ZXJuYWxTdGF0ZSwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxTdGF0ZSA9IGludGVybmFsU3RhdGU7XG4gICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMgPSBoaXN0b3J5VGltZXN0YW1wcztcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIFNwZWNpZmljYWxseSwgYXJyYXkgZWxlbWVudHMgYXJlIHR1cGxlc1xuICAgICAgICAgKiBbcGVyLXNlbmRlciBtZXNzYWdlIGNvdW50ZXIsIHRoaXMgcmVwbGljYSdzIHJlY2VpcHQgY291bnRlcixcbiAgICAgICAgICogbWVzc2FnZV0uICBLZWVwIGluIG1pbmQgdGhhdCBwZXItc2VuZGVyIG1lc3NhZ2VcbiAgICAgICAgICogY291bnRlcnMgbWF5IG5vdCBiZSBjb250aWd1b3VzLCBzaW5jZSB0aGV5IGFyZSBzaGFyZWQgYmV0d2VlblxuICAgICAgICAgKiBhbGwgQ3JkdHMgd2l0aCBhIGdpdmVuIENyZHRSdW50aW1lIGFuZCBiZXR3ZWVuXG4gICAgICAgICAqIGEgc2VtaWRpcmVjdCBwcm9kdWN0IGFuZCBpdHMgY29tcG9uZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkLCBtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wID0gdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA/XG4gICAgICAgICAgICBbbWVzc2FnZSwgdGltZXN0YW1wXSA6IG1lc3NhZ2U7XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChbdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKSwgdGhpcy5yZWNlaXB0Q291bnRlciwgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcF0pO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyKys7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aGUgZ2l2ZW5cbiAgICAgKiB0aW1lc3RhbXAsIGluIHNvbWUgY2F1c2FsIG9yZGVyIChzcGVjaWZpY2FsbHksIHRoaXMgcmVwbGljYSdzXG4gICAgICogcmVjZWlwdCBvcmRlcikuICBJZiB3ZSBhcmUgdGhlIHNlbmRlciAoaS5lLiwgcmVwbGljYUlkID09PVxuICAgICAqIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSksIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdGltZXN0YW1wIGlzXG4gICAgICogY2F1c2FsbHkgZ3JlYXRlciB0aGFuIGFsbCBwcmlvciBtZXNzYWdlcywgYXMgZGVzY3JpYmVkIGluXG4gICAgICogQ3JkdEludGVybmFsLmVmZmVjdCwgaGVuY2UgW10gaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCB0cnVlLCB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNwZWNpZmllZCBhY3Rpb25zIG9uIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeTpcbiAgICAgKiAtIGlmIHJldHVybkNvbmN1cnJlbnQgaXMgdHJ1ZSwgcmV0dXJucyB0aGUgbGlzdCBvZlxuICAgICAqIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRpbWVzdGFtcCwgaW5cbiAgICAgKiByZWNlaXB0IG9yZGVyLlxuICAgICAqIC0gaWYgZGlzY2FyZERvbWluYXRlZCBpcyB0cnVlLCBkZWxldGVzIGFsbCBtZXNzYWdlcyBmcm9tXG4gICAgICogdGhlIGhpc3Rvcnkgd2hvc2UgdGltZXN0YW1wcyBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5XG4gICAgICogb3IgZXF1YWwgdG8gdGhlIGdpdmVuIHRpbWVzdGFtcC4gIChOb3RlIHRoYXQgdGhpcyBtZWFucyB0aGF0XG4gICAgICogaWYgd2Ugd2FudCB0byBrZWVwIGEgbWVzc2FnZSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAgaW5cbiAgICAgKiB0aGUgaGlzdG9yeSwgaXQgbXVzdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBhZnRlciBjYWxsaW5nXG4gICAgICogdGhpcyBtZXRob2QuKVxuICAgICAqL1xuICAgIHByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHJldHVybkNvbmN1cnJlbnQsIGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcncyBjb25jdXJyZW50LCBzbyBjbGVhciBldmVyeXRoaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5LmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2F0aGVyIHVwIHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzLiAgVGhlc2UgYXJlIGFsbFxuICAgICAgICAvLyBtZXNzYWdlcyBieSBlYWNoIHJlcGxpY2FJZCB3aXRoIHNlbmRlciBjb3VudGVyXG4gICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpLmdldChyZXBsaWNhSWQpLlxuICAgICAgICBsZXQgY29uY3VycmVudCA9IFtdO1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB2Yy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldChlbnRyeVswXSk7XG4gICAgICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnRJbmRleFN0YXJ0ID0gU2VtaWRpcmVjdFN0YXRlLmluZGV4QWZ0ZXIoc2VuZGVySGlzdG9yeSwgZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb25jdXJyZW50SW5kZXhTdGFydDsgaSA8IHNlbmRlckhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmN1cnJlbnQucHVzaChzZW5kZXJIaXN0b3J5W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIG1lc3NhZ2VzIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLy8gPj0gY29uY3VycmVudEluZGV4U3RhcnRcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVySGlzdG9yeS5zcGxpY2UoMCwgY29uY3VycmVudEluZGV4U3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxldGUgaXQgZnJvbSB0aGUgbWFwIGlmIGVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBhIGZvcm0gb2YgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsc28gbWFrZXMgaXNIaXN0b3J5RW1wdHkgc2ltcGxlci5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNvcnQgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMgaW4gcmVjZWlwdCBvcmRlciAoaS5lLixcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBzZWNvbmQgZW50cnkgaW4gZWFjaCB0cmlwbGUpLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYVsxXSAtIGJbMV0pKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQubWFwKGEgPT4gYVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCkge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3Igd29ya2luZyB3aXRoIHRoZSBwZXItc2VuZGVyIGhpc3RvcnlcbiAgICAgKiBhcnJheXMuICBSZXR1cm5zIHRoZSBpbmRleCBhZnRlciB0aGUgbGFzdCBlbnRyeSB3aG9zZVxuICAgICAqIHBlci1zZW5kZXIgY291bnRlciAodGhlIGZpcnN0IHR1cGxlIGVsZW1lbnQpIGlzIDw9XG4gICAgICogdmFsdWUuXG4gICAgICovXG4gICAgc3RhdGljIGluZGV4QWZ0ZXIoc3BhcnNlQXJyYXksIHZhbHVlKSB7XG4gICAgICAgIC8vIFRPRE86IGJpbmFyeSBzZWFyY2ggd2hlbiBzcGFyc2VBcnJheSBpcyBsYXJnZVxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlcmUgbWF5IGJlIGR1cGxpY2F0ZSB0aW1lc3RhbXBzLlxuICAgICAgICAvLyBTbyBpdCB3b3VsZCBiZSBpbmFwcHJvcHJpYXRlIHRvIGZpbmQgYW4gZW50cnkgd2hvc2VcbiAgICAgICAgLy8gcGVyLXNlbmRlciBjb3VudGVyIGVxdWFscyB2YWx1ZSBhbmQgaW5mZXIgdGhhdFxuICAgICAgICAvLyB0aGUgZGVzaXJlZCBpbmRleCBpcyAxIGdyZWF0ZXIuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhcnNlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzcGFyc2VBcnJheVtpXVswXSA+IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSBTZW1pZGlyZWN0U3RhdGU7XG5jbGFzcyBTZW1pZGlyZWN0SW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRpbmcgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBvZlxuICAgICAqIGNyZHQxIGFuZCBjcmR0MiB3aXRoIHRoZSBnaXZlbiBhY3Rpb24sIHdoaWNoIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAobTI6IGNyZHQyIG1lc3NhZ2UsIG0xOiBjcmR0MSBtZXNzYWdlKTogY3JkdDEgbWVzc2FnZS5cbiAgICAgKiBjcmR0MSwgY3JkdDIsIGFuZCBhY3Rpb24gbXVzdCBzYXRpc2Z5IHRoZSBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICAgKiBhc3N1bXB0aW9ucyBmcm9tIG91ciBwYXBlci5cbiAgICAgKlxuICAgICAqIFRPRE86IG9wdGlvbnMgYW5kIHRoZWlyIHRoZW9yZXRpY2FsIHNpZ25pZmljYW5jZS4gIEZvcm1hbGx5LFxuICAgICAqIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSBtZWFucyB0aGF0IHRpbWVzdGFtcHMgYmVjb21lXG4gICAgICogcGFydCBvZiB0aGUgY3JkdDIgbWVzc2FnZXMuICBBbHNvIGNyZWF0ZUNyZHRJbmRleC5cbiAgICAgKiBEb21pbmF0ZWQgc3RhdHMgY29udHJvbCB3aGV0aGVyIHlvdSBkaXNjYXJkIG1lc3NhZ2VzIGluIHRoZVxuICAgICAqIGhpc3RvcnkgdGhhdCBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGNyZHQxL2NyZHQyIG1lc3NhZ2VzO1xuICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoYXQgYWN0aW9uIGlzIHRoZSBzYW1lIHdpdGggdGhvc2UgbWVzc2FnZXNcbiAgICAgKiBkaXNjYXJkZWQuICBJZiBkb21pbmF0ZWQxIGlzIHNldCwgdGhlbiBzdGF0ZS5pc0hpc3RvcnlFbXB0eSgpXG4gICAgICogYmVjb21lcyAodGhlcmUgZXhpc3RzIGEgY3JkdDIgbWVzc2FnZSBub3QgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGFcbiAgICAgKiBjcmR0MSBtZXNzYWdlKS4gIENoZWNrIHRoaXMgaXMgc3RpbGwgdHJ1ZSBpZiBkb21pbmF0ZWQyIGlzIHNldC4pXG4gICAgICogRXhwbGFpbiBleGFtcGxlcyB3aGVyZSB0aGlzIGlzIHVzZWQgKHJlc2V0dGFibGUsIGZsYWdzKTsgaXQnc1xuICAgICAqIG5vdCBxdWl0ZSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHNwaXJpdCB1bmxlc3MgeW91IHRoaW5rXG4gICAgICogb2YgaXQgYXMgdXNpbmcgdGhlIGhpc3RvcnkgYXMgcGFydCBvZiB0aGUgY3JkdDEvMiBzdGF0ZS5cbiAgICAgKiBQb3RlbnRpYWwgb3B0aW1pemF0aW9uOiBvbmx5IGRlbGV0ZSBkb21pbmF0ZWQgbWVzc2FnZXMgd2hlblxuICAgICAqIHJlY2VpdmluZyBvdXIgb3duIG1lc3NhZ2UgKGl0J3MgYmFzaWNhbGx5IGZyZWUgYW5kIGFsd2F5c1xuICAgICAqIGNsZWFycyB0aGUgaGlzdG9yeSksIG9yIG9ubHkgc29tZXRpbWVzICh3aWxsIG1pc3Mgc29tZVxuICAgICAqIG1lc3NhZ2VzLCBzbyBuZWVkIHRvIGVuc3VyZSBjb3JyZWN0bmVzcyBpbiB0aGF0IGNhc2VcbiAgICAgKiAoSSB0aGluayBpdCBpcyBva2F5IGZvciBkb21pbmF0ZWQyIGJ1dCBub3QgZG9taW5hdGVkMSBpbiBvdXJcbiAgICAgKiB0YXJnZXQgdXNlIGNhc2VzKSwgYnV0XG4gICAgICogc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IGR1ZSB0byBiYXRjaGluZyBhbmQgc3RpbGwga2lsbFxuICAgICAqIG9mZiBtb3N0IG1lc3NhZ2VzKS4gIFRoaXMgdHJhZGVzIGEgc21hbGwgaW5jcmVhc2UgaW4gc3BhY2VcbiAgICAgKiB1c2FnZSBmb3IgYSBkZWNyZWFzZSBpbiBDUFUgdGltZS5cbiAgICAgKlxuICAgICAqIEFzIGRlc2NyaWJlZCBpbiBDcmR0SW50ZXJuYWwgYW5kIENyZHQsIG51bGwgbWVzc2FnZXMgYXJlIHRyZWF0ZWRcbiAgICAgKiBhcyB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gaWQsIGFsbG93aW5nIHRoZW0gdG8gYmUgb3B0aW1pemVkIGF3YXkuXG4gICAgICogQmVjYXVzZSBvZiB0aGlzLCBhY3Rpb24gd2lsbCBuZXZlciBiZSBjYWxsZWQgd2l0aCBudWxsIGFzXG4gICAgICogZWl0aGVyIGlucHV0LiAgSW5zdGVhZCwgd2UgYmVoYXZlIGFzIGlmXG4gICAgICogKGFjdGlvbihpZCAoaS5lLiwgbnVsbCksIG0xKSA9IG0xKVxuICAgICAqIGZvciBhbGwgbTEgYW5kIChhY3Rpb24obTIsIGlkKSA9IGlkKSBmb3IgYWxsIG0yLiAgVGhlIHNlbWlkaXJlY3RcbiAgICAgKiBwcm9kdWN0IGFzc3VtcHRpb25zIG11c3QgaG9sZCBnaXZlbiB0aGVzZSBhc3NpZ25tZW50cy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjcmR0MSwgY3JkdDIsIGFjdGlvbiwgY3JlYXRlQ3JkdEluZGV4LCBoaXN0b3J5VGltZXN0YW1wcyA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZUNyZHRJbmRleCA9IGNyZWF0ZUNyZHRJbmRleDtcbiAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA9IGhpc3RvcnlUaW1lc3RhbXBzO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBsZXQgaW50ZXJuYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ3JkdEluZGV4ID09PSAxKVxuICAgICAgICAgICAgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0U3RhdGUoaW50ZXJuYWxTdGF0ZSwgdGhpcy5oaXN0b3J5VGltZXN0YW1wcywgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogVE9ETyAoZ2VuZXJhbCk6IGVycm9yIGNoZWNraW5nXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvblswXSA9PT0gMSkge1xuICAgICAgICAgICAgbGV0IG9wMSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AxID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbMSwgb3AxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcDIgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMiA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG9wMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcmlwdGlvbiBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBtZXNzYWdlIGZvci9kZXNjcmlwdGlvbiBmcm9tIHRoYXQgY3JkdF0uICBGb3IgdGhpcy5jcmR0MVxuICAgICAqIG1lc3NhZ2VzLCB0aGUgZGVzY3JpcHRpb24gaXMgZm9yIHRoZSBhY3RlZC1vbiBtZXNzYWdlIHRoYXRcbiAgICAgKiBpcyBhY3R1YWxseSBhcHBsaWVkIHRvIHRoaXMuaW50ZXJuYWxTdGF0ZSwgbm90IHRoZSBpbnB1dFxuICAgICAqIG1lc3NhZ2UuICBBbiBleGNlcHRpb24gaXMgaWYgdGhlIGRlc2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsXG4gICAgICogY3JkdCBpcyBudWxsIChvciBpZiB0aGUgbWVzc2FnZSBnZXRzIGFjdGVkIG9uIHRvIGJlY29tZSBudWxsKSxcbiAgICAgKiB0aGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMganVzdCBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS5cbiAgICAgKiBUaGlzIGFsbG93cyB0aGUgQ3JkdCBjbGFzcyB0byBvcHRpbWl6ZSBhd2F5IGNhbGxpbmcgb25jaGFuZ2UuXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gMikge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDIuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBzdGF0ZS5hZGQocmVwbGljYUlkLCBtZXNzYWdlWzFdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbMiwgcmVzdWx0WzFdXV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY29uY3VycmVudCA9IHN0YXRlLmdldENvbmN1cnJlbnQocmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgbGV0IG1BY3QgPSBtZXNzYWdlWzFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbUFjdCA9IHRoaXMuYWN0aW9uKGNvbmN1cnJlbnRbaV0sIG1BY3QpO1xuICAgICAgICAgICAgICAgIGlmIChtQWN0ID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHQxLmVmZmVjdChtQWN0LCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBzdGF0ZS5pbnRlcm5hbFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbMSwgcmVzdWx0WzFdXV07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNlbWlkaXJlY3RJbnRlcm5hbCA9IFNlbWlkaXJlY3RJbnRlcm5hbDtcbmNsYXNzIERpcmVjdEludGVybmFsIHtcbiAgICAvKipcbiAgICAgKiBEaXJlY3QgcHJvZHVjdCBvZiBDcmR0SW50ZXJuYWwncy4gIFRoaXMgaXMgdGhlXG4gICAgICogc3BlY2lhbCBjYXNlIG9mIFNlbWlkaXJlY3RJbnRlcm5hbCB3aGVuIHRoZSBhY3Rpb24gaXMgdHJpdmlhbFxuICAgICAqICgobV8yLCBtMSkgPT4gbTEpLiAgSW4gdGhpcyBjYXNlIHdlIGNhbiBvcHRpbWl6ZVxuICAgICAqIGJ5IG5vdCBrZWVwaW5nIHRoZSBoaXN0b3J5IG9yIGFjdGluZyBvbiBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEZvciB0aGlzIHRvIGJlIGEgQ3JkdCwgY29uY3VycmVudCBtZXNzYWdlcyBvZiB0aGUgdHdvIGlucHV0XG4gICAgICogQ3JkdHMgbXVzdCBjb21tdXRlLlxuICAgICAqXG4gICAgICogTm90ZSB0aGlzIGNvbnN0cnVjdGlvbiBpcyBzeW1tZXRyaWMgKHN3aXRjaGluZyBjcmR0MSBhbmRcbiAgICAgKiBjcmR0MiBkb2Vzbid0IGNoYW5nZSB0aGUgc2VtYW50aWNzKSwgZXhjZXB0IGZvciBzd2FwcGluZ1xuICAgICAqIHRoZSBtZWFuaW5nIG9mIHRoZSBudW1iZXJzIDEvMiBpbiBjcmVhdGVDcmR0SW5kZXggYW5kXG4gICAgICogaW4gdGhlIGZpcnN0IGNvb3JkaW5hdGVzIG9mIG1lc3NhZ2VzIGFuZCBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZWF0ZUNyZHRJbmRleCBXaGljaCBjcmR0J3MgY3JlYXRlIG1ldGhvZCB0byB1c2VcbiAgICAgKiBpbiBjcmVhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3JkdDEsIGNyZHQyLCBjcmVhdGVDcmR0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIHRoaXMuY3JlYXRlQ3JkdEluZGV4ID0gY3JlYXRlQ3JkdEluZGV4O1xuICAgICAgICBpZiAoY3JlYXRlQ3JkdEluZGV4ICE9PSAxICYmIGNyZWF0ZUNyZHRJbmRleCAhPT0gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZWF0ZUNyZHRJbmRleCAobXVzdCBiZSAxIG9yIDIpOlwiICtcbiAgICAgICAgICAgICAgICBjcmVhdGVDcmR0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgSW5pdGlhbCBkYXRhIHVzZWQgdG8gaW5pdGlhbGl6ZSB0aGlzLmNyZHQxLlxuICAgICAqIEByZXR1cm5cbiAgICAgKi9cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ3JkdEluZGV4ID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uLCBzdGF0ZSwgcmVwbGljYUlkKSB7XG4gICAgICAgIGxldCBtZXNzYWdlO1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQxLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5jcmR0Mi5wcmVwYXJlKG9wZXJhdGlvblsxXSwgc3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmR0IG51bWJlciBpbiBvcGVyYXRpb246IFwiICsgb3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbb3BlcmF0aW9uWzBdLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS5cbiAgICAgKiBBbiBleGNlcHRpb24gaXMgaWYgdGhlIGRlc2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsXG4gICAgICogY3JkdCBpcyBudWxsLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKiBUT0RPOiBwZXJoYXBzIGFkZCB0cmFuc2xhdGluZyBkZXNjcmlwdGlvbnMgdG8gdGhpcyBjbGFzcywgc29cbiAgICAgKiB0aGUgQ3JkdCBkb2Vzbid0IGhhdmUgdG8gdW5kZXJzdGFuZCBhbGwgb2YgdGhlIGxheWVycyBhdFxuICAgICAqIG9uY2U/XG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmNyZHQxLmVmZmVjdChtZXNzYWdlWzFdLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDIuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBjcmR0IG51bWJlciBpbiBtZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRbMV0gPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW3Jlc3VsdFswXSwgbnVsbF07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0WzBdLCBbbWVzc2FnZVswXSwgcmVzdWx0WzFdXV07XG4gICAgfVxufVxuZXhwb3J0cy5EaXJlY3RJbnRlcm5hbCA9IERpcmVjdEludGVybmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VtaWRpcmVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXJyYXlDcmR0SW50ZXJuYWwgPSBleHBvcnRzLk1hcENyZHQgPSBleHBvcnRzLkFkZFdpbnNTZXQgPSBleHBvcnRzLkNyZHRPYmplY3QgPSBleHBvcnRzLkdNYXBJbnRlcm5hbCA9IGV4cG9ydHMuRGlzYWJsZVdpbnNGbGFnID0gZXhwb3J0cy5FbmFibGVXaW5zRmxhZyA9IGV4cG9ydHMuTm9PcENyZHRJbnRlcm5hbCA9IGV4cG9ydHMuT3J0aG9nb25hbENyZHQgPSBleHBvcnRzLkludFJlZ2lzdGVyQ3JkdCA9IGV4cG9ydHMuVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0ID0gdm9pZCAwO1xuY29uc3QgcmVzZXR0YWJsZV8xID0gcmVxdWlyZShcIi4vcmVzZXR0YWJsZVwiKTtcbmNvbnN0IGJhc2ljX2NyZHRzXzEgPSByZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKTtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuY29uc3Qgc2VtaWRpcmVjdF8xID0gcmVxdWlyZShcIi4vc2VtaWRpcmVjdFwiKTtcbmNsYXNzIFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKDEpO1xuICAgIH1cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkKC0xKTtcbiAgICB9XG4gICAgYWRkKG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBuXSk7XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzIsIG5dKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICB9XG59XG5leHBvcnRzLlVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCA9IFVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdDtcbi8vIHNlbWlkaXJlY3RJbnN0YW5jZSBjb21wbGV0ZWx5IGRlc2NyaWJlcyB0aGlzIHNlbWlkaXJlY3QgcHJvZHVjdFxuVW5yZXNldHRhYmxlSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdEludGVybmFsKGJhc2ljX2NyZHRzXzEuQ291bnRlckludGVybmFsLmluc3RhbmNlLCBiYXNpY19jcmR0c18xLk11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCAobTIsIG0xKSA9PiBtMiAqIG0xLCAxKTtcbmNsYXNzIEludFJlZ2lzdGVyQ3JkdCBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsVmFsdWUgPSAwLCByZXNldFZhbHVlID0gMCkge1xuICAgICAgICBzdXBlcihpZCwgSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSwgcmVzZXRWYWx1ZSwgcnVudGltZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgbl0pO1xuICAgIH1cbiAgICBtdWx0KG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBuXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCByZXNldC10aGVuLWFkZC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5hZGQobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAvLyBUcmFuc2FjdGlvbiBkdWUgdG8gc2V0IHZhbHVlLCByZXR1cm4gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICAgICAgICAgICAgcmV0dXJuIFtcInNldFwiLCBkZXNjcmlwdGlvbnNbMV1bMV1dO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIFtcImFkZFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW2Rlc2NyaXB0aW9uWzBdLCB0aGlzLnZhbHVlXTsgLy8gcmVzZXRzXG4gICAgfVxufVxuZXhwb3J0cy5JbnRSZWdpc3RlckNyZHQgPSBJbnRSZWdpc3RlckNyZHQ7XG5JbnRSZWdpc3RlckNyZHQuc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwoYmFzaWNfY3JkdHNfMS5Db3VudGVySW50ZXJuYWwuaW5zdGFuY2UsIGJhc2ljX2NyZHRzXzEuTXVsdFJlZ2lzdGVySW50ZXJuYWwuaW5zdGFuY2UsIChtMiwgbTEpID0+IG0yICogbTEsIDEpO1xuZnVuY3Rpb24gcG9zaXRpdmVNb2QoYSwgYikge1xuICAgIGlmIChhID49IDApXG4gICAgICAgIHJldHVybiBhICUgYjtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBiIC0gKCgtYSkgJSBiKTtcbn1cbmNsYXNzIE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsIHtcbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKGluaXRpYWxEYXRhID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gWzAsIGZhbHNlXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIHJldHVybiBwb3NpdGl2ZU1vZChvcGVyYXRpb24sIDIgKiBNYXRoLlBJKTtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiBbW3Bvc2l0aXZlTW9kKHN0YXRlWzBdICsgbWVzc2FnZSwgMiAqIE1hdGguUEkpLCBzdGF0ZVsxXV0sIG1lc3NhZ2VdO1xuICAgIH1cbn1cbk9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsLmluc3RhbmNlID0gbmV3IE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsKCk7XG5jbGFzcyBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsIHtcbiAgICBjcmVhdGUoX2luaXRpYWxEYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlZmxlY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgb3BlcmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIFwicmVmbGVjdFwiO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVmbGVjdFwiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIC8vIFJlZmxlY3Rpb24gb3BlcmF0aW9uIGlzIG11bHRpcGx5aW5nIG9uIHRoZSBsZWZ0LFxuICAgICAgICAvLyBzbyB0byBwdXQgaXQgaW4gY2Fub25pY2FsIGZvcm0gKGcxLCBnMiksIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gY29tbXV0ZSBpdCB3aXRoIHRoZSBjdXJyZW50IGcxIChyb3RhdGlvbikgdmFsdWUgYnlcbiAgICAgICAgLy8gYWN0aW5nIG9uIGl0LlxuICAgICAgICByZXR1cm4gW1twb3NpdGl2ZU1vZCgtc3RhdGVbMF0sIDIgKiBNYXRoLlBJKSwgIXN0YXRlWzFdXSwgXCJyZWZsZWN0XCJdO1xuICAgIH1cbn1cbk9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwuaW5zdGFuY2UgPSBuZXcgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCgpO1xuLyoqXG4gKiBDcmR0IGZvciB0aGUgMi1kaW1lbnNpb25hbCBvcnRob2dvbmFsIGdyb3VwLCB3aGljaCBhbGxvd3NcbiAqIHJvdGF0aW9ucyBhbmQgcmVmbGVjdGlvbnMgKGFib3V0IHRoZSBvcmlnaW4pIG9mIGFuIG9iamVjdCBpbiB0aGVcbiAqIHBsYW5lLiAgRXhhbXBsZSB1c2FnZTogcm90YXRpbmcgYW5kIHJlZmxlY3Rpbmcgb2JqZWN0cyBpblxuICogUG93ZXJwb2ludC5cbiAqXG4gKiBTdGF0ZSBpcyBzdG9yZWQgYXMgdGhlIGNhbm9uaWNhbCBlbGVtZW50IG9mIHRoZSBzZW1pZGlyZWN0XG4gKiBwcm9kdWN0IGdyb3VwLCBpLmUuLCBpbiB0aGUgZm9ybSAoZzEsIGcyKSBmb3IgZzEgaW4gdGhlIHJvdGF0aW9uXG4gKiBncm91cCAocmVhbHMgbW9kIDJwaSkgYW5kIGcyIGluIHRoZSByZWZsZWN0aW9uIGdyb3VwIChib29sZWFuc1xuICogd2l0aCB0cnVlIGZvciAxIGFuZCBmYWxzZSBmb3IgMCkuXG4gKi9cbmNsYXNzIE9ydGhvZ29uYWxDcmR0IGV4dGVuZHMgcmVzZXR0YWJsZV8xLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSA9IFswLCBmYWxzZV0sIHJlc2V0VmFsdWUgPSBbMCwgZmFsc2VdKSB7XG4gICAgICAgIHN1cGVyKGlkLCBPcnRob2dvbmFsQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJlc2V0VmFsdWUsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuZ2xlIGlzIGluIHJhZGlhbnMgQ0NXLlxuICAgICAqL1xuICAgIHJvdGF0ZShhbmdsZSkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIGFuZ2xlXSk7XG4gICAgfVxuICAgIHJlZmxlY3RIb3Jpem9udGFsQXhpcygpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBcInJlZmxlY3RcIl0pO1xuICAgIH1cbiAgICByZWZsZWN0VmVydGljYWxBeGlzKCkge1xuICAgICAgICB0aGlzLnJlZmxlY3QoTWF0aC5QSSAvIDIpO1xuICAgIH1cbiAgICByZWZsZWN0KGFuZ2xlQXhpcykge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoLWFuZ2xlQXhpcyk7XG4gICAgICAgIHRoaXMucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgICAgIHRoaXMucm90YXRlKGFuZ2xlQXhpcyk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RhdGUgaXMgZ2l2ZW4gYnk6IHJlZmxlY3QgYWNyb3NzIHRoZSB4LWF4aXNcbiAgICAgKiBpZiByZWZsZWN0ZWQgaXMgdHJ1ZSwgdGhlbiByb3RhdGUgYnkgYW5nbGUgKENDVywgaW4gcmFkaWFucykuXG4gICAgICovXG4gICAgZ2V0IHJlZmxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZVsxXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc3RhdGUgaXMgZ2l2ZW4gYnk6IHJlZmxlY3QgYWNyb3NzIHRoZSB4LWF4aXNcbiAgICAgKiBpZiByZWZsZWN0ZWQgaXMgdHJ1ZSwgdGhlbiByb3RhdGUgYnkgYW5nbGUgKENDVywgaW4gcmFkaWFucykuXG4gICAgICovXG4gICAgZ2V0IGFuZ2xlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFN0YXRlUmVzZXR0YWJsZS5pbnRlcm5hbFN0YXRlWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBbcmVmbGVjdGVkLCBhbmdsZV1cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5hbmdsZSwgdGhpcy5yZWZsZWN0ZWRdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IHJlc2V0LXRoZW4tc2V0LlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLnJvdGF0ZShuZXdWYWx1ZVswXSk7XG4gICAgICAgIGlmIChuZXdWYWx1ZVsxXSlcbiAgICAgICAgICAgIHRoaXMucmVmbGVjdEhvcml6b250YWxBeGlzKCk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgLy8gVE9ETzogbWF0cml4IHZlcnNpb25zIG9mIGdldCBhbmQgc2V0LlxuICAgIC8vIC8qKlxuICAgIC8vICAqIEByZXR1cm4gVGhlIGN1cnJlbnQgdHJhbnNmb3JtYXRpb24gYXMgYSAyeDIgb3J0aG9nb25hbFxuICAgIC8vICAqIG1hdHJpeC5cbiAgICAvLyAgKi9cbiAgICAvLyBnZXQgbWF0cml4KCk6IFtbbnVtYmVyLCBudW1iZXJdLCBbbnVtYmVyLCBudW1iZXJdXSB7XG4gICAgLy9cbiAgICAvLyB9XG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShfZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIC8vIFRPRE8uICBKdXN0IHJldHVybnMgdGhlIHJlc3VsdGluZyBzdGF0ZSBmb3Igbm93LlxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgLy8gaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgLy8gICAgIC8vIFRyYW5zYWN0aW9uIGR1ZSB0byBzZXQgdmFsdWUsIHJldHVybiB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gICAgICAgIC8vICAgICByZXR1cm4gW1wic2V0XCIsIGRlc2NyaXB0aW9uc1sxXVsxXV07XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gbGV0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25zWzBdO1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICAvLyBlbHNlIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSkgcmV0dXJuIFtcIm11bHRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICAvLyBlbHNlIHJldHVybiBbZGVzY3JpcHRpb25bMF0gYXMgc3RyaW5nLCB0aGlzLnZhbHVlXTsgLy8gcmVzZXRzXG4gICAgfVxufVxuZXhwb3J0cy5PcnRob2dvbmFsQ3JkdCA9IE9ydGhvZ29uYWxDcmR0O1xuT3J0aG9nb25hbENyZHQuc2VtaWRpcmVjdEluc3RhbmNlID0gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwoT3J0aG9nb25hbFJvdGF0aW9uSW50ZXJuYWwuaW5zdGFuY2UsIE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwuaW5zdGFuY2UsIChfbTIsIG0xKSA9PiAtbTEsIDEpO1xuLyoqXG4gKiBDcmR0SW50ZXJuYWwgd2hpY2ggdXNlcyBhbnkgc3RyaW5nIGFzIGFuIG9wZXJhdGlvbi9tZXNzYWdlXG4gKiB3aGljaCBkb2VzIG5vdGhpbmcuICBVbmxpa2UgdXNpbmcgbnVsbCBtZXNzYWdlcyB0byBpbmRpY2F0ZSB0aGF0XG4gKiBub3RoaW5nIGhhcHBlbmVkLCB0aGUgbm9vcCBtZXNzYWdlIGlzIGFuIGV4cGxpY2l0IG5vbi1udWxsXG4gKiBzdHJpbmcgc3VwcGxpZWQgYXMgdGhlIG9wZXJhdGlvbi5cbiAqXG4gKiBUd28gdXNlIGNhc2VzOlxuICogLSBUbyB1bnJlc2V0IGEgc3RhdGUgKGUuZy4gaW4gRW5hYmxlV2luc0ZsYWcgYmVsb3cpLlxuICogLSBBcyBhIFwiaGVhZGVyXCIgZm9yIHNlcXVlbmNlIG9mIG9wZXJhdGlvbnMgcGFzc2VkIHRvIGFwcGx5T3BzLFxuICogc28gdGhhdCByZWNpcGllbnRzIGNhbiBrbm93IHdoYXQgZW5kLXVzZXIgb3BlcmF0aW9uIHRoZSBzZXF1ZW5jZVxuICogY29ycmVzcG9uZHMgdG8uXG4gKi9cbmNsYXNzIE5vT3BDcmR0SW50ZXJuYWwge1xuICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUZ1bmMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVGdW5jID0gY3JlYXRlRnVuYztcbiAgICB9XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZUZ1bmMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGdW5jKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ3JlYXRlRnVuYyBub3Qgc3VwcGxpZWRcIik7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIHRoZSBvcmlnaW5hbCBvcGVyYXRpb24uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkVG8ob3JpZ2luYWxDcmR0KSB7XG4gICAgICAgIHJldHVybiBuZXcgc2VtaWRpcmVjdF8xLkRpcmVjdEludGVybmFsKG9yaWdpbmFsQ3JkdCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKSwgMSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ob09wQ3JkdEludGVybmFsID0gTm9PcENyZHRJbnRlcm5hbDtcbmNsYXNzIEVuYWJsZVdpbnNGbGFnIGV4dGVuZHMgcmVzZXR0YWJsZV8xLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLCBydW50aW1lLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChcImVcIik7XG4gICAgfVxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZGlzYWJsZVN0cm9uZygpIHtcbiAgICAgICAgdGhpcy5yZXNldFN0cm9uZygpO1xuICAgIH1cbiAgICBnZXQgZW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKTtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKVxuICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGRvaW5nIGEgcmVzZXQgYmVmb3JlIHNldHRpbmdcbiAgICAgICAgLy8gdG8gbmV3VmFsdWUsIGluIGVpdGhlciBjYXNlLCBzaW5jZSBhbnkgbWVzc2FnZSBvYnZpYXRlc1xuICAgICAgICAvLyBjYXVzYWxseSBsZXNzZXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3b3VsZCBhbHNvIGxpa2UgdG8gdHJhbnNsYXRlIG9ic2VydmVkLXJlc2V0cyB0b1xuICAgIC8vIGRpc2FibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlU3Ryb25nXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZGVzY3JpcHRpb25zOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGVzY3JpcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkVuYWJsZVdpbnNGbGFnID0gRW5hYmxlV2luc0ZsYWc7XG5jbGFzcyBEaXNhYmxlV2luc0ZsYWcgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSkge1xuICAgICAgICBzdXBlcihpZCwgbmV3IE5vT3BDcmR0SW50ZXJuYWwoKCkgPT4gbnVsbCksIG51bGwsIHJ1bnRpbWUsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBlbmFibGVTdHJvbmcoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTdHJvbmcoKTtcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFwiZFwiKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmludGVybmFsU3RhdGUuaXNIaXN0b3J5RW1wdHkoKTtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKVxuICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIC8vIE5vdGUgdGhpcyBpcyBlcXVpdmFsZW50IHRvIGRvaW5nIGEgcmVzZXQgYmVmb3JlIHNldHRpbmdcbiAgICAgICAgLy8gdG8gbmV3VmFsdWUsIGluIGVpdGhlciBjYXNlLCBzaW5jZSBhbnkgbWVzc2FnZSBvYnZpYXRlc1xuICAgICAgICAvLyBjYXVzYWxseSBsZXNzZXIgbWVzc2FnZXMuXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3b3VsZCBhbHNvIGxpa2UgdG8gdHJhbnNsYXRlIG9ic2VydmVkLXJlc2V0cyB0b1xuICAgIC8vIGVuYWJsZSAoYnV0IG9ubHkgaWYgaXQgYWN0dWFsbHkgd29ya2VkKS4gIFBlcmhhcHMgYWRkIG5vb3AgaW5kaWNhdG9yIG91dCBmcm9udD9cbiAgICAvLyAoTmVlZCB0byBhZGQgYSBuby1vcCBjcmR0IGF0IHRoZSB0b3AgbGV2ZWwpXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZShkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdID09PSBcImRcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDEgJiYgZGVzY3JpcHRpb25zWzBdWzBdID09PSBcInJlc2V0U3Ryb25nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImVuYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5EaXNhYmxlV2luc0ZsYWcgPSBEaXNhYmxlV2luc0ZsYWc7XG5jbGFzcyBHTWFwSW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIFtjb25zdHJ1Y3RvciBkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gdmFsdWVDcmR0SW50ZXJuYWwgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBzaG91bGRHYyBHaXZlbiBhIHZhbHVlIHN0YXRlLCByZXR1cm4gd2hldGhlciBpdCBpcyBzYWZlXG4gICAgICogdG8gZ2FyYmFnZSBjb2xsZWN0IGl0LCByZW1vdmluZyBpdHMga2V5LXZhbHVlIHBhaXIgZnJvbSB0aGVcbiAgICAgKiBtYXAuICBGb3IgY29ycmVjdG5lc3MsIGlmIHNob3VsZEdjKHZhbHVlU3RhdGUpIGlzIHRydWUsIHRoZW5cbiAgICAgKiB2YWx1ZVN0YXRlIG11c3QgYmUgaWRlbnRpY2FsIHRvIHZhbHVlQ3JkdEludGVybmFsLmNyZWF0ZSh2YWx1ZUluaXRpYWxEYXRhKTtcbiAgICAgKiBhbmQgaWYgc2hvdWxkR2MgaXMgbm9udHJpdmlhbCwgdGhlbiB1c2VycyBzaG91bGQga2VlcCBpblxuICAgICAqIG1pbmQgdGhhdCBzdGF0ZS5oYXMoa2V5KSBpcyBub3QgcmVsaWFibGUsIHNpbmNlIGl0IG1heSBiZVxuICAgICAqIGZhbHNlIGV2ZW4gYWZ0ZXIga2V5IGhhcyBiZWVuIGluaXRpYWxpemVkIGJlY2F1c2UgdGhlIHZhbHVlXG4gICAgICogaGFzIGJlZW4gZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc2hvdWxkR2MgPSAoKCkgPT4gZmFsc2UpKSB7XG4gICAgICAgIHRoaXMuc2hvdWxkR2MgPSBzaG91bGRHYztcbiAgICB9XG4gICAgY3JlYXRlKF9pbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wiYXBwbHlcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBpbml0aWFsaXppbmcgdGhlIGtleSBpZiBuZWVkZWQuXG4gICAgICogLSBbXCJhcHBseVNraXBcIiwga2V5LCBDIG1lc3NhZ2VdOiBhcHBsaWVzIHRoZSBDIG1lc3NhZ2UgdG9cbiAgICAgKiB0aGUgZ2l2ZW4ga2V5LCBleGNlcHQgZm9yIHRoZWlyIHNlbmRlciwgd2hvIGlzIGFzc3VtZWRcbiAgICAgKiB0byBoYXZlIGFscmVhZHkgYXBwbGllZCB0aGUgbWVzc2FnZS4gIFRoaXMgaXMgdXNlZCBieVxuICAgICAqIENyZHRWYWx1ZWRHcm93T25seU1hcEludGVybmFsLCB3aG9zZSBtZXNzYWdlcyBhcmVcbiAgICAgKiBzb21ldGltZXMgZGVyaXZlZCBmcm9tIHZhbHVlcyBhcHBseWluZyBtZXNzYWdlcyB0b1xuICAgICAqIHRoZW1zZWx2ZXMuICBUT0RPOiBpbiBwcmluY2lwbGUgY2FuIG9wdGltaXplIHNvIHdlXG4gICAgICogZG9uJ3QgaGF2ZSB0byBzZW5kIFwic2tpcFwiIG92ZXIgdGhlIG5ldHdvcmsuXG4gICAgICogLSBbXCJpbml0XCIsIGtleV06IGluaXRpYWxpemVzIHRoZSBnaXZlbiBrZXkgdXNpbmcgaW5pdEZhY3RvcnlcbiAgICAgKiBpZiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50IGluIHRoZSBtYXAuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXRzIGV2ZXJ5IHZhbHVlIGluIHRoZSBtYXAgKHVzaW5nXG4gICAgICogZWFjaCB2YWx1ZSdzIGdldFVuaXZlcnNhbFJlc2V0T3BlcmF0aW9uKCkpLlxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uLCBzdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICBsZXQga2V5ID0gb3BlcmF0aW9uWzFdO1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvblswXSkge1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5XCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYXBwbHlTa2lwXCIsIGtleSwgb3BlcmF0aW9uWzJdXTtcbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImluaXRcIiwga2V5XTtcbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFwiOiByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW4gYWRkaXRpb24gdG8gdGhlIG1lc3NhZ2Ugb3V0cHV0IGJ5IHByZXBhcmUsIHdlIGhhdmVcbiAgICAgKiBtZXNzYWdlcyAoYXJpc2luZyB0aHJvdWdoIHNlbWRpcmVjdCBwcm9kdWN0KTpcbiAgICAgKiAtIFtcImluaXRSZXNldFwiLCBrZXldOiBkb2VzIFtcImluaXRcIiwga2V5XSBmb2xsb3dlZCBieVxuICAgICAqIGRlbGl2ZXJpbmcgYSByZXNldCBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICogLSBbXCJpbml0UmVzZXRTdHJvbmdcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWRcbiAgICAgKiBieSBkZWxpdmVyaW5nIGEgcmVzZXQtc3Ryb25nIG1lc3NhZ2UgdG8gdGhlIGtleS5cbiAgICAgKlxuICAgICAqIERlc2NyaXB0aW9uIGZvcm1hdDpcbiAgICAgKiAtIGZvciBhbiBhcHBseS9hcHBseVNraXAgb3BlcmF0aW9uOlxuICAgICAqIG51bGwgKFRPRE8pXG4gICAgICogLSBmb3IgYW4gaW5pdCBvcGVyYXRpb246IG51bGwgaWYgdGhlIGtleSBhbHJlYWR5IGV4aXN0ZWQsXG4gICAgICogb3RoZXJ3aXNlIFtcImluaXRcIiwga2V5XVxuICAgICAqIC0gZm9yIGEgcmVzZXQgb3BlcmF0aW9uOiBbXCJyZXNldFwiXSAoVE9ETzogZGVzY3JpcHRpb25zIGZyb21cbiAgICAgKiByZXNldCBrZXlzKVxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IGtleSA9IG1lc3NhZ2VbMV07XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSBcImFwcGx5U2tpcFwiOlxuICAgICAgICAgICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHRpbWVzdGFtcC5nZXRTZW5kZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIGFwcGx5aW5nIGl0IHRvIHRoZSBzdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuIHN0aWxsIGdjLCB0aG91Z2gsIGluIGNhc2UgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGFscmVhZHktYXBwbGllZCBtZXNzYWdlIGhhcyBtYWRlIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGdjLWFibGUuXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlTdGF0ZSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5U3RhdGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG91bGRHYyhrZXlTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBmYWxsIHRocm91Z2guXG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjoge1xuICAgICAgICAgICAgICAgIGxldCBrZXlTdGF0ZSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChrZXlTdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleVN0YXRlID0gdGhpcy5pbml0RmFjdG9yeShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXlTdGF0ZS5yZWNlaXZlKG1lc3NhZ2VbMl0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkR2Moa2V5U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluaXRTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3VsZEdjKGluaXRTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnNldChrZXksIGluaXRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgW1wiaW5pdFwiLCBrZXldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiBzdGF0ZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc2V0TWVzc2FnZSA9IGVudHJ5WzFdLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzZXRNZXNzYWdlICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlbMV0ucmVjZWl2ZShbcmVzZXRNZXNzYWdlXSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkR2MoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoZW50cnlbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFtcInJlc2V0XCJdXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5HTWFwSW50ZXJuYWwgPSBHTWFwSW50ZXJuYWw7XG4vKipcbiAqIENvbnZlbmllbnQgcmVwcmVzZW50YXRpb24gb2YgYSBDcmR0LXZhbHVlZCBncm93LW9ubHkgbWFwLlxuICpcbiAqIFRPRE86IFNvbWV3aGVyZTogbm90ZSB0aGF0IGluaXRpYWwgdmFsdWVzIG9mIHByb3BlcnRpZXMgbXVzdCBiZVxuICogYSBmdW5jdGlvbiBvZiB0aGVpciBrZXkgb25seSAoc28gY2FuJ3QgaGF2ZSB2YXJ5aW5nIHR5cGVzIG9yXG4gKiBpbml0aWFsIGRhdGEpLlxuICpcbiAqIE4gaXMgdGhlIHR5cGUgb2YgbWVtYmVyIG5hbWVzICh0eXBpY2FsbHkgc3RyaW5nKS5cbiAqL1xuY2xhc3MgQ3JkdE9iamVjdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIFRPRE86IHByZWRlZmluZWQgdnMgZHluYW1pYyBwcm9wZXJ0eSBjcmVhdGlvbi4gIFByZWRlZmluZWQgb25lc1xuICAgICAqIGhhdmUgdG8gYmUgY3JlYXRlZCBpZGVudGljYWxseSBvbiBhbGwgcmVwbGljYXMgaW5cbiAgICAgKiBiZXR3ZWVuIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSBhbmRcbiAgICAgKiBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpLCBpZGVhbGx5IGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhleVxuICAgICAqIGFyZSBub3Qgc3luY2VkIChmb3IgZWZmaWNpZW5jeSBhbmQgdG8gc2F2ZSB0aGUgdHJvdWJsZVxuICAgICAqIG9mIHNwZWNpZnlpbmcgcHJvcGVydHlGYWN0b3J5KS4gIER5bmFtaWMgcHJvcGVydGllc1xuICAgICAqIGNhbiBvbmx5IGJlIGNyZWF0ZWQgdGhyb3VnaCBpbml0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHByb3BlcnR5RmFjdG9yeSBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIHByb3BlcnR5RmFjdG9yeSA9IENyZHRPYmplY3QuZGVmYXVsdFByb3BlcnR5RmFjdG9yeSkge1xuICAgICAgICAvLyBUT0RPOiBnYyBhYmlsaXR5XG4gICAgICAgIGxldCBjcmR0SW50ZXJuYWwgPSBuZXcgR01hcEludGVybmFsKCk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0SW50ZXJuYWwsIHJ1bnRpbWUpO1xuICAgICAgICBjcmR0SW50ZXJuYWwuaW5pdEZhY3RvcnkgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluSW5pdCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gcHJvcGVydHlGYWN0b3J5KGtleSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmluSW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5Jbml0ID0gZmFsc2U7XG4gICAgfVxuICAgIHN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSB7XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgcmVnaXN0ZXIoY3JkdCwgbmFtZSkge1xuICAgICAgICBpZiAoISh0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gfHwgdGhpcy5pbkluaXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQcm9wZXJ0aWVzIGNhbiBvbmx5IGJlIGRpcmVjdGx5IFwiICtcbiAgICAgICAgICAgICAgICBcInJlZ2lzdGVyZWQgYmV0d2VlbiBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkgXCIgK1xuICAgICAgICAgICAgICAgIFwiYW5kIGVuZFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkuICBEeW5hbWljIHByb3BlcnRpZXMgXCIgK1xuICAgICAgICAgICAgICAgIFwibXVzdCBiZSBjcmVhdGVkIHdpdGggaW5pdChuYW1lKS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgcHJvcGVydHkgbmFtZTogXCIgKyBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNldChuYW1lLCBjcmR0KTtcbiAgICAgICAgLy8gU2tpcCBzZW5kaW5nIGFuIGluaXQgbWVzc2FnZSBhYm91dCBpdC4gIE9rYXkgYmVjYXVzZSBvZiB0aGVcbiAgICAgICAgLy8gcHJlZGVmaW5lZCBpbml0aWFsaXphdGlvbiBjb250cmFjdC5cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBuYW1lIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuICAgICAgVGhlIGluaXRpYWxpemVkIENyZHQuXG4gICAgICovXG4gICAgaW5pdFByb3BlcnR5KG5hbWUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlPcChbXCJpbml0XCIsIG5hbWVdKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKHRoaXMuZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbXCJyZXNldFwiXTtcbiAgICB9XG4gICAgZ2V0UHJvcGVydHkobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgfVxuICAgIHByb3BlcnR5TmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmtleXMoKTtcbiAgICB9XG4gICAgcHJvcGVydHlWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlcygpO1xuICAgIH1cbiAgICBwcm9wZXJ0eUVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVudHJpZXMoKTtcbiAgICB9XG4gICAgc2VuZChtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIC8vIENvbnZlcnQgaW50byBhbiBhcHBseVNraXAgbWVzc2FnZSBmb3IgdGhlIG1hcCB2YWx1ZVxuICAgICAgICAvLyBhdCBuYW1lLiAgSGVyZSB3ZSB3YW50IHRvIHNraXAgYmVjYXVzZVxuICAgICAgICAvLyBvdXIgcmVwbGljYSdzIHZhbHVlIGhhcyBhbHJlYWR5IGFwcGxpZWQgdGhlXG4gICAgICAgIC8vIG9wZXJhdGlvbiBpbnRlcm5hbGx5LlxuICAgICAgICB0aGlzLmFwcGx5T3AoW1wiYXBwbHlTa2lwXCIsIG5hbWUsIG1lc3NhZ2VdKTtcbiAgICB9XG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpO1xuICAgIH1cbiAgICBnZXROZXh0VGltZXN0YW1wKF9jcmR0SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdE9iamVjdCA9IENyZHRPYmplY3Q7XG5DcmR0T2JqZWN0LmRlZmF1bHRQcm9wZXJ0eUZhY3RvcnkgPSAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRHluYW1pY2FsbHkgY3JlYXRlZCBwcm9wZXJ0aWVzIGFyZSBvbmx5IFwiICtcbiAgICAgICAgXCJhbGxvd2VkIGlmIHByb3BlcnR5RmFjdG9yeSBpcyBwYXNzZWQgdG8gdGhlIFwiICtcbiAgICAgICAgXCJDcmR0T2JqZWN0IGNvbnN0cnVjdG9yXCIpO1xufTtcbmNsYXNzIEFkZFdpbnNTZXQgZXh0ZW5kcyBDcmR0T2JqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSkge1xuICAgICAgICAvLyBUT0RPOiBhZGQgZ2Mgb25jZSB3ZSBoYXZlIHRyYW5zYWN0aW9uc1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSwgKG5hbWUsIGludGVybmFsUnVudGltZSkgPT4gbmV3IEVuYWJsZVdpbnNGbGFnKG5hbWUsIGludGVybmFsUnVudGltZSkpO1xuICAgIH1cbiAgICBhZGQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMuaW5pdFByb3BlcnR5KHZhbHVlKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBkZWxldGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSkuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVN0cm9uZyh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmdldFByb3BlcnR5KHZhbHVlKS5yZXNldFN0cm9uZygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcyh2YWx1ZSkge1xuICAgICAgICBsZXQgdmFsdWVGbGFnID0gdGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZUZsYWcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlRmxhZy5lbmFibGVkO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMucHJvcGVydHlFbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeVsxXS5lbmFibGVkKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoZW50cnlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIHZhbHVlcygpIHtcbiAgICAgICAgLy8gVE9ETzogb25jZSBpdCdzIGdjJ2Qgd2UgY2FuIGp1c3QgdXNlIHRoaXMuc3RhdGUua2V5cygpXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnZhbHVlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuQWRkV2luc1NldCA9IEFkZFdpbnNTZXQ7XG5jbGFzcyBNYXBDcmR0IGV4dGVuZHMgQ3JkdE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIHZhbHVlRmFjdG9yeSkge1xuICAgICAgICBzdXBlcihpZCwgcnVudGltZSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGbGFnIGluZGljYXRpbmcgdGhhdCB3ZSBhcmUgaW4gdGhlIGJvZHkgb2YgYSBkZWxldGUvXG4gICAgICAgICAqIGRlbGV0ZVN0cm9uZyBjYWxsLCBoZW5jZSB3ZSBzaG91bGQgbm90IGFkZCB0aGluZ3NcbiAgICAgICAgICogdG8ga2V5U2V0IChhcyBhbiBvcHRpbWl6YXRpb24pLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0UHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICAgICAgdGhpcy5rZXlTZXQgPSBuZXcgQWRkV2luc1NldChcImtleVNldFwiLCB0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZU1hcCA9IG5ldyBDcmR0T2JqZWN0KFwidmFsdWVNYXBcIiwgdGhpcywgdmFsdWVGYWN0b3J5KTtcbiAgICAgICAgdGhpcy5lbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBDcmR0T2JqZWN0LnNlbmQgc28gdGhhdCB3ZSBjYW4gY2FwdHVyZVxuICAgICAqIGEgc2VuZCBieSBhIHZhbHVlTWFwIHZhbHVlIGFuZCBmb2xsb3cgaXQgdXAgd2l0aFxuICAgICAqIGFuIGFkZCB0byBrZXlTZXQsIHRodXMgcmV2aXZpbmcgdGhlIHZhbHVlJ3Mga2V5XG4gICAgICogaWYgYXBwcm9wcmlhdGUuXG4gICAgICpcbiAgICAgKiBUT0RPOiBza2lwIGFkZGluZyB0aGUga2V5IGlmIGl0J3MgYSByZXNldCBtZXNzYWdlP1xuICAgICAqIE5vdCBzdXJlIGlmIHRoaXMgaXMgcG9zc2libGUgaW4gZ2VuZXJhbC4gIEJ1dCBzaG91bGQgYXRcbiAgICAgKiBsZWFzdCBiZSBwb3NzaWJsZSBmb3Igb3VyIG93biBkZWxldGVzLlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZSwgbmFtZSkge1xuICAgICAgICBzdXBlci5zZW5kKG1lc3NhZ2UsIG5hbWUpO1xuICAgICAgICBpZiAoIXRoaXMuaW5EZWxldGUgJiYgbmFtZSA9PT0gXCJ2YWx1ZU1hcFwiKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBkbyB0aGlzIHJlY2VpdmVyIHNpZGUgaW5zdGVhZCwgZm9yIG5ldHdvcmsgZWZmaWNpZW5jeT9cbiAgICAgICAgICAgIC8vIFdvdWxkIG5lZWQgdG8gcGxhY2UgdGhlIGFkZCBmaXJzdCwgc28gdGhhdCBpdCBjYW5cbiAgICAgICAgICAgIC8vIGJlIG92ZXJyaWRkZW4gYnkgYW55IGluY2x1ZGVkIGRlbGV0ZXMuXG4gICAgICAgICAgICAvLyBXb3VsZCBhbHNvIG5lZWQgdG8gYWNjb3VudCBmb3IgcG9zc2liaWxpdHkgb2ZcbiAgICAgICAgICAgIC8vIHRyYW5zYWN0aW9ucy5cbiAgICAgICAgICAgIC8vIEFsc28sIG5lZWQgdG8gbWFrZSBzdXJlIHdlIChzZW5kZXIpIGRvIGl0IHRvby5cbiAgICAgICAgICAgIGZvciAobGV0IHN1Ym1lc3NhZ2Ugb2YgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJtZXNzYWdlWzBdID09PSBcImFwcGx5U2tpcFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzdWJtZXNzYWdlWzFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleVNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdChrZXkpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGlmICghdGhpcy5pbkRlbGV0ZSlcbiAgICAgICAgICAgIHRoaXMua2V5U2V0LmFkZChrZXkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy52YWx1ZU1hcC5pbml0UHJvcGVydHkoa2V5KTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVNldC5oYXMoa2V5KTtcbiAgICB9XG4gICAgZ2V0KGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlTWFwLmdldFByb3BlcnR5KGtleSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldChrZXkpLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmtleVNldC5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVTdHJvbmcoa2V5KSB7XG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmluaXQoa2V5KS5yZXNldFN0cm9uZygpO1xuICAgICAgICB0aGlzLmtleVNldC5kZWxldGVTdHJvbmcoa2V5KTtcbiAgICAgICAgdGhpcy5pbkRlbGV0ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlTZXQudmFsdWVzKCk7XG4gICAgfVxufVxuZXhwb3J0cy5NYXBDcmR0ID0gTWFwQ3JkdDtcbi8vIFRPRE86IG1ha2UgY29ycmVzcG9uZGluZyBDcmR0IGZvciB1c2UgaW4gQ3JkdE9iamVjdCdzLFxuLy8gc28gdXNlcnMgZG9uJ3QgaGF2ZSB0byB3b3JyeSBhYm91dCB0cmFuc2xhdGluZyBvcHNcbi8vIGFuZCB0byBzdXBwb3J0IGJ1bGsvUlBDL2hvbWFwIG9wcy5cbmNsYXNzIEFycmF5Q3JkdEludGVybmFsIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50Q3JkdCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRDcmR0ID0gZWxlbWVudENyZHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgaW5pdGlhbERhdGEgQW4gYXJyYXkgb2YgaW5pdGlhbERhdGEgdG9cbiAgICAgKiBwYXNzIHRvIGVhY2ggZW50cnkncyBjcmVhdGUgbWV0aG9kLiAgVGhlIGVudHJpZXNcbiAgICAgKiBtYXkgYmUgdW5kZWZpbmVkLCBpbiB3aGljaCBjYXNlIHVuZGVmaW5lZCB3aWxsXG4gICAgICogYmUgcGFzc2VkIHRvIHRoZSBlbnRyeSdzIGNyZWF0ZSBtZXRob2QuICBJbiBhbnlcbiAgICAgKiBjYXNlLCBpbml0aWFsRGF0YS5sZW5ndGggaXMgdXNlZCB0byBzZXQgdGhlXG4gICAgICogbGVuZ3RoLlxuICAgICAqIEByZXR1cm4gICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaW5pdGlhbERhdGEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYW4gYXJyYXk6IFwiICsgaW5pdGlhbERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdGF0ZSA9IFtdO1xuICAgICAgICBzdGF0ZS5sZW5ndGggPSBpbml0aWFsRGF0YS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN0YXRlW2ldID0gdGhpcy5lbGVtZW50Q3JkdC5jcmVhdGUoaW5pdGlhbERhdGFbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBvcGVyYXRpb24gW2luZGV4LCBvcF1cbiAgICAgKiBAcmV0dXJuIG1lc3NhZ2Ugb2YgdGhlIGZvcm0gW2luZGV4LCBtZXNzYWdlXVxuICAgICAqL1xuICAgIHByZXBhcmUob3BlcmF0aW9uLCBzdGF0ZSwgcmVwbGljYUlkKSB7XG4gICAgICAgIGlmICghKG9wZXJhdGlvblswXSA+PSAwICYmIG9wZXJhdGlvblswXSA8IHN0YXRlLmxlbmd0aCAmJiBOdW1iZXIuaXNJbnRlZ2VyKG9wZXJhdGlvblswXSkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmRleCBvdXQgb2YgYm91bmRzOiBcIiArIG9wZXJhdGlvblswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtvcGVyYXRpb25bMF0sIHRoaXMuZWxlbWVudENyZHQucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlWzFdLCByZXBsaWNhSWQpXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzY3JpcHRpb24gZm9ybWF0OiBbaW5kZXgsIHJldHVybmVkIGRlc2NyaXB0aW9uXVxuICAgICAqIChzYW1lIGFzIG1lc3NhZ2UpLlxuICAgICAqIEBwYXJhbSAgbWVzc2FnZSAgICBbaW5kZXgsIG1lc3NhZ2VdXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQgZGVzYztcbiAgICAgICAgW3N0YXRlW21lc3NhZ2VbMF1dLCBkZXNjXSA9IHRoaXMuZWxlbWVudENyZHQuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlW21lc3NhZ2VbMF1dLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgIHJldHVybiBbc3RhdGUsIFttZXNzYWdlWzBdLCBkZXNjXV07XG4gICAgfVxufVxuZXhwb3J0cy5BcnJheUNyZHRJbnRlcm5hbCA9IEFycmF5Q3JkdEludGVybmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhbmRhcmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNyZHROZXR3b3JrUnVudGltZSA9IGV4cG9ydHMubXlNZXNzYWdlID0gdm9pZCAwO1xuY29uc3QgdmVjdG9yX2Nsb2NrXzEgPSByZXF1aXJlKFwiLi92ZWN0b3JfY2xvY2tcIik7XG4vLyBpbXBvcnQgV2ViU29ja2V0ID0gcmVxdWlyZShcIndzXCIpO1xuLy8gVGhlIGNhc3VhbCBicm9hZGNhc3QgbmV0d29yayBkZXNpZ25lZCBmb3IgYSB0d28td2F5IGludGVyYWN0aXZlXG4vLyBjb21tdW5pY2F0aW9uIHNlc3Npb24gYmV0d2VlbiB1c2VyIGFuZCBzZXJ2ZXIgdXNpbmcgV2ViU29ja2V0IEFQSS5cbi8vXG4vLyBBbHNvIGVuc3VyZSB0aGUgb3JkZXIgb2YgZGVsaXZlcnkgd2l0aCBjYXN1YWxpdHkgY2hlY2suXG4vKipcbiAqIEN1c3RvbWl6ZWQgbWVzc2FnZSBldmVudCB0aGF0IHRyYXZlbCB0aHJvdWdoXG4gKiBjYXN1YWxicm9hZGNhc3QgbmV0d29yay5cbiAqL1xuY2xhc3MgbXlNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjcmR0SWQsIHRpbWVzdGFtcCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmNyZHRJZCA9IGNyZHRJZDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGN1c3RvbWl6ZWQgdG9KU09OIGZ1bmN0aW9uIHRvIGNvbnZlcnQgbWVzc2FnZSBhcyBKU09OIGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHBhY2thZ2UgaW5mbyBpbiBKU09OIGZvcm1hdC5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IFwibWVzc2FnZVwiOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICBcImNyZHRJZFwiOiB0aGlzLmNyZHRJZCxcbiAgICAgICAgICAgIFwidGltZXN0YW1wXCI6IHtcbiAgICAgICAgICAgICAgICBcInVpZFwiOiB0aGlzLnRpbWVzdGFtcC51aWQsXG4gICAgICAgICAgICAgICAgXCJ2ZWN0b3JNYXBcIjogQXJyYXkuZnJvbSh0aGlzLnRpbWVzdGFtcC52ZWN0b3JNYXAuZW50cmllcygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLm15TWVzc2FnZSA9IG15TWVzc2FnZTtcbi8qKlxuICogQ2FzdWFsQnJvYWRjYXN0TmV0d29yazpcbiAqXG4gKiBQcm9jZXNzIGluaXRpYWxpemF0aW9uIHdoZW4gc3RhcnRpbmcgYSBuZXcgdXNlciBub2RlLlxuICpcbiAqIENvbW11bmljYXRlIHdpdGggQ1JEVCdzIHJ1bnRpbWUgYW5kIHNlbmQvcmVjZWl2ZSBtZXNzYWdlIHZpYVxuICogY2VudHJhbCBicm9hZGNhc3Qgc2VydmVyIHdpdGggV2ViU29ja2V0IHByb3RvY29sLlxuICpcbiAqIFBlcmZvcm0gY2FzdWFsaXR5IGNoZWNrIHRvIGVuc3VyZSBtZXNzYWdlIG9yZGVyaW5nLlxuICovXG5jbGFzcyBDcmR0TmV0d29ya1J1bnRpbWUge1xuICAgIGNvbnN0cnVjdG9yKHJlcGxpY2FJZCwgd2ViU29ja2V0QXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgdGhlIHNlbmQgbWVzc2FnZSBidWZmZXIgaGFzIGFueSBtZXNzYWdlIHdhaXRpbmcgdG8gYmUgc2VudC5cbiAgICAgICAgICogSWYgdGhlcmUgZXhpc3QsIHRoZW4gc2VuZCBpdCB2aWEgV2ViU29ja2V0IGFuZCByZW1vdmUgdGhlIGl0ZW0gZnJvbSBidWZmZXIuXG4gICAgICAgICAqIElmIG5vdCwgdGhlbiB3YWl0IGEgY3VzdG9taXplZCB0aW1lIHBlcmlvZCBhbmQgY2hlY2sgYWdhaW4uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlbmRBY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZCh0aGlzLnNlbmRCdWZmZXJbaW5kZXhdLnRvSlNPTigpKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAvLyBVc2UgaGVhcnRiZWF0IHRvIGtlZXAgY2xpZW50IGFsaXZlLlxuICAgICAgICAgICAgLy8gdGhpcy5oZWFydGJlYXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9rZSBoZWFydGJlYXQgZnVuY3Rpb24gdG8ga2VlcCBjbGllbnRzIGFsaXZlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUT0RPOlxuICAgICAgICAgKiBUaGUgbWVzc2FnZSBzZW5kaW5nIHRvIHNlcnZlciBpcyAnaGVhcnRiZWF0JyByaWdodCBub3cuXG4gICAgICAgICAqIFRoZSB0aW1lb3V0IGludGVydmFsIGlzIHNldCB0byA1MDAwIG1pbGxpb25zZWNvbmRzLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gaGVhcnRiZWF0KCkgOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMud3Muc2VuZCgnaGVhcnRiZWF0Jyk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5oZWFydGJlYXQoKTtcbiAgICAgICAgLy8gICAgIH0sIDUwMDApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgaW50byBteU1lc3NhZ2UgdHlwZS5cbiAgICAgICAgICogUHVzaCB0aGUgbWVzc2FnZSBpbnRvIHJlY2VpdmVkIG1lc3NhZ2UgYnVmZmVyLlxuICAgICAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGFsbCB0aGUgbWVzc2FnZXMgYW5kIGRlbGl2ZXIgdG8gYXBwbGljYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHNlbmQgdmlhIG5ldHdvcmtcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVjZWl2ZUFjdGlvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgICAgICBsZXQgbXlQYWNrYWdlID0gdGhpcy5wYXJzZUpTT04oZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5wdXNoKFtteVBhY2thZ2UubWVzc2FnZSwgbXlQYWNrYWdlLmNyZHRJZCwgbXlQYWNrYWdlLnRpbWVzdGFtcF0pO1xuICAgICAgICAgICAgdGhpcy5jaGVja01lc3NhZ2VCdWZmZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkID0gbmV3IE1hcCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aXRoIHNlcnZlci5cbiAgICAgICAgICogUmVnaXN0ZXIgRXZlbnRMaXN0ZW5lciB3aXRoIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldEFyZ3MpO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLnNlbmRBY3Rpb24pO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLnJlY2VpdmVBY3Rpb24pO1xuICAgICAgICAvLyB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ3BpbmcnLCBmdW5jdGlvbihwaW5nTWVzc2FnZSl7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnUmVjZWl2ZSBhIHBpbmcgOiAnICsgcGluZ01lc3NhZ2UpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRoZSBmdW5jdGlvbiBkZWZpbmVkIGluIENyZHRSdW50aW1lIGludGVyZmFjZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIHJlcGxpY2EncyBpZCwgdXNlZCBieSBzb21lIENSRFRzIGludGVybmFsbHlcbiAgICAgKiAoZS5nLiwgdG8gZ2VuZXJhdGUgdW5pcXVlIGlkZW50aWZpZXJzIG9mIHRoZSBmb3JtIChyZXBsaWNhIGlkLCBjb3VudGVyKSkuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgbmV3bHkgY3JlYXRlZCBjcmR0SWQgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0SWRcbiAgICAgKi9cbiAgICByZWdpc3RlckNyZHRJZChjcmR0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBjcmR0SWQ6IFwiICsgY3JkdElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHQgd2l0aCBpdHMgSUQgYW5kIGNvcnJlc3BvbmRpbmcgbWVzc2FnZVxuICAgICAqIGxpc3RlbmVyIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdE1lc3NhZ2VMaXN0ZW5lciB0aGUgbWVzc2FnZSBsaXN0ZW5lciBvZiBlYWNoIGNyZHQuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgSUQgb2YgZWFjaCBjcmR0LlxuICAgICAqXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdE1lc3NhZ2VMaXN0ZW5lciwgY3JkdElkKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc0J5SWQuaGFzKGNyZHRJZCkgfHwgdGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuZXJzQnlJZC5zZXQoY3JkdElkLCBjcmR0TWVzc2FnZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy52Y01hcC5zZXQoY3JkdElkLCBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBmdW5jdGlvbiBvbiBjYXN1YWxicm9hZGNhc3QgbmV0d29yayBsYXllciwgd2hpY2ggY2FsbGVkXG4gICAgICogYnkgY3JkdCdzIHJ1bnRpbWUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBpcyB3cmFwcGVkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdGltZXN0YW1wIChiYXNpYyBzZW5kZXIgbm9kZVxuICAgICAqIGluZm8gYW5kIHZlY3RvciBjbG9jaykuXG4gICAgICpcbiAgICAgKiBVc2luZyBXZWJTb2NrZXQgYXMgbmV0d29yayB0cmFuc21pc3Npb24gcHJvdG9jb2wuXG4gICAgICogVXNpbmcgSlNPTiBmb3JtYXQgYXMgbWVzc2FnZSB0eXBlLlxuICAgICAqXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIG5vdCBPcGVuLCB0aGVuIGJ1ZmZlciB0aGUgbWVzc2FnZSBhbmRcbiAgICAgKiB3YWl0IHVudGlsIFdlYlNvY2tldCBvcGVuLlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBPcGVuLCB0aGVuIHNlbmQgaXQgd2l0aCB3cy5zZW5kKCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgY3JkdCB1cGRhdGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSB1bmlxdWUgSUQgZm9yIGVhY2ggY3JkdC5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UsIGNyZHRJZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjcmR0SWQgZXhpc3QgaW4gdGhlIG1hcC5cbiAgICAgICAgaWYgKHRoaXMudmNNYXAuaGFzKGNyZHRJZCkpIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuZ2V0KGNyZHRJZCkuaW5jcmVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgICAgICAgICAgdGhpcy52Y01hcC5nZXQoY3JkdElkKS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jayBmb3Igc2VuZGluZ1xuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAoKF9hID0gdGhpcy52Y01hcC5nZXQoY3JkdElkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFzVmVjdG9yQ2xvY2soKSk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGNyZHRJZCwgdmNDb3B5KTtcbiAgICAgICAgLy8gQ29udmVydCB0aGUgbWVzc2FnZSBpbnRvIEpTT05cbiAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKG15UGFja2FnZS50b0pTT04oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChteVBhY2thZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmV4dCB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGNyZHRJZCBpbiB0aGlzIHJlcGxpY2EuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHBhc3NlZCB0byBDcmR0SW50ZXJuYWwuZWZmZWN0IHdoZW4gYSByZXBsaWNhIHByb2Nlc3NlcyBpdHMgb3duXG4gICAgICogbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIGNyZHRJZCB0aGF0IHdvdWxkIGxpa2UgdG8gcmV0dXJuLlxuICAgICAqIEByZXR1cm5zIFRoZSB0aW1lc3RhbXAgdGhhdCB3b3VsZCBiZSBhc3NpZ25lZCB0byBhIENSRFRcbiAgICAgKiBtZXNzYWdlIHNlbnQgYnkgdGhpcyByZXBsaWNhIGFuZCBnaXZlbiBjcmR0SWQgcmlnaHQgbm93LlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0TmV4dFRpbWVzdGFtcChjcmR0SWQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jay5cbiAgICAgICAgbGV0IHZjQ29weSA9IG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCk7XG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAgPSBuZXcgTWFwKChfYSA9IHRoaXMudmNNYXAuZ2V0KGNyZHRJZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hc1ZlY3RvckNsb2NrKCkpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWVzdGFtcCBvZiB0aGlzIHJlcGxpY2Egd2l0aCBuZXh0IHZhbHVlLlxuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgdmNDb3B5LnZlY3Rvck1hcC5nZXQodGhpcy51aWQpICsgMSk7XG4gICAgICAgIHJldHVybiB2Y0NvcHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayB0byBjdXN0b21pemVkIGRhdGEgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHRyYXZlbCB0aHJvdWdoIG5ldHdvcmsuXG4gICAgICogQHJldHVybnMgdGhlIGN1c3RvbWl6ZWQgZGF0YSB0eXBlID0+IG15TWVzc2FnZVxuICAgICAqL1xuICAgIHBhcnNlSlNPTihkYXRhKSB7XG4gICAgICAgIGxldCBkYXRhSlNPTiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGxldCB2YyA9IG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayhkYXRhSlNPTi50aW1lc3RhbXAudWlkKTtcbiAgICAgICAgdmMudmVjdG9yTWFwID0gbmV3IE1hcChkYXRhSlNPTi50aW1lc3RhbXAudmVjdG9yTWFwKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UoZGF0YUpTT04ubWVzc2FnZSwgZGF0YUpTT04uY3JkdElkLCB2Yyk7XG4gICAgICAgIHJldHVybiBteVBhY2thZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYnVmZmVyZWQgbWVzc2FnZXMgYW5kIGRlbGl2ZXJ5IHRoZVxuICAgICAqIG1lc3NhZ2VzIGJhY2sgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lciB3aGljaCBhcmUgcmVhZHkuXG4gICAgICpcbiAgICAgKiBUaGUgY2hlY2tpbmcgb3JkZXIgaXMgZnJvbSB0aGUgbGFzdGVzdCB0byB0aGUgb2xkZXN0LlxuICAgICAqIFVwZGF0ZSB0aGUgVmVjdG9yQ2xvY2sgZW50cnkgYW5kIE1lc3NhZ2VCdWZmZXIgd2hlbiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBTZW5kIHRoZSBtZXNzYWdlIGJhY2sgdG8gY3JkdFJ1bnRpbWUgd2l0aCBjb3JyZXNwb25kaW5nXG4gICAgICogY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBjaGVja01lc3NhZ2VCdWZmZXIoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tZXNzYWdlQnVmZmVyLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgY3VyQ3JkdElkID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXTtcbiAgICAgICAgICAgIGxldCBjdXJWZWN0b3JDbG9jayA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl07XG4gICAgICAgICAgICBpZiAoIXRoaXMudmNNYXAuaGFzKGN1ckNyZHRJZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBteVZlY3RvckNsb2NrID0gdGhpcy52Y01hcC5nZXQoY3VyQ3JkdElkKTtcbiAgICAgICAgICAgICAgICBpZiAobXlWZWN0b3JDbG9jayA9PT0gbnVsbCB8fCBteVZlY3RvckNsb2NrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBteVZlY3RvckNsb2NrLmlzcmVhZHkoY3VyVmVjdG9yQ2xvY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBTZW5kIGJhY2sgdGhlIHJlY2VpdmVkIG1lc3NhZ2VzIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc0J5SWQuaGFzKGN1ckNyZHRJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIChfYSA9IHRoaXMubGlzdGVuZXJzQnlJZC5nZXQoY3VyQ3JkdElkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlY2VpdmUodGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVswXSwgY3VyVmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlWZWN0b3JDbG9jay5pbmNyZW1lbnRTZW5kZXIoY3VyVmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5DcmR0TmV0d29ya1J1bnRpbWUgPSBDcmR0TmV0d29ya1J1bnRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X25ldHdvcmtfcnVudGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIEZpcnN0IGF0dGVtcHQgYXQgdGhlIGludGVyZmFjZSBiZXR3ZWVuIHRoZSBydW50aW1lXG4vLyAoY2F1c2FsIGJyb2FkY2FzdCBuZXR3b3JrLCBldGMuKSBhbmQgdGhlIENSRFRzLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9ydW50aW1lX2ludGVyZmFjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X3J1bnRpbWVfaW50ZXJmYWNlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X25ldHdvcmtfcnVudGltZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdmVjdG9yX2Nsb2NrXCIpLCBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5WZWN0b3JDbG9jayA9IHZvaWQgMDtcbi8vIFRoZSB2ZWN0b3IgY2xvY2sgZGVzaWduZWQgZm9yIENSRFQgbGlicmFyeSBhbmQgY2FzdWFsIGJyb2FkY2FzdGluZ1xuLy8gcnVudGltZSB0byBlbnN1cmUgY29ycmVjdCBjYXVzYWxpdHkuXG4vKipcbiAqIFRoZSB2ZWN0b3IgY2xvY2sgY2xhc3MgZm9yIGVuc3VyaW5nIGNhc3VhbGl0eS5cbiAqL1xuY2xhc3MgVmVjdG9yQ2xvY2sge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIHZlY3RvciB3aXRoIHJlcGxpY2EncyBvd24gZW50cnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkKSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyByZXBsaWNhKHJlcGxpY2FJZCkuXG4gICAgICovXG4gICAgZ2V0U2VuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2ZWN0b3IgY2xvY2sgd2l0aCBhbGwgdGhlIGVudHJpZXMuXG4gICAgICovXG4gICAgYXNWZWN0b3JDbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmlzaWJsZSBudW1iZXIgb2YgdGhlIGNvdW50ZXIgZnJvbSBzZW5kZXIgaW5cbiAgICAgKiB0aGlzIHZlY3RvcmNsb2NrLlxuICAgICAqL1xuICAgIGdldFNlbmRlckNvdW50ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIHJlcGxpY2FzIGludm92bGVkIGluIHRoaXMgY3JkdHMuXG4gICAgICovXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLnNpemU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmVjdG9yIG9mIHRoZSB1aWQocmVwbGljYUlkKSBlbnRyeS5cbiAgICAgKi9cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgb2xkVmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBhIG1lc3NhZ2Ugd2l0aCBhIGNlcnRhaW4gdGltZXN0YW1wIGlzIHJlYWR5IGZvciBkZWxpdmVyeVxuICAgICAqIHRvIGVuc3VyZSBjb3JyZWN0IGNhc3VhbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqIEByZXR1cm5zIHRoZSBtZXNzYWdlIGlzIHJlYWR5IG9yIG5vdC5cbiAgICAgKi9cbiAgICBpc3JlYWR5KHZjKSB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5oYXMob3RoZXJVaWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSA9PT0gb3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSAtIDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmNyZW1lbnQgc2VuZGVyJ3MgbGFzdGVzdCBlbnRyeSByZWNlaXZlZCBpbiB0aGlzIFZlY3RvckNsb2NrXG4gICAgICogaW4gdGhlIHJlcGxpY2EncyBvd24gdmVjdG9yTWFwLlxuICAgICAqXG4gICAgICogVGhpcyBvcGVyYXRpb24gaXMgbWFpbmx5IGRvbmUgYWZ0ZXIgY29ycmVjdGx5IGRlbGl2ZXIgdGhlIG1lc3NhZ2VcbiAgICAgKiB3aGVuIGlzUmVhZHkoKSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBpbmNyZW1lbnRTZW5kZXIodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KG90aGVyVWlkLCBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgY3VycmVudCBWZWN0b3JDbG9jayB3aXRoIHRoZSB2ZWN0b3IgY2xvY2sgcmVjZXZpZWQgZnJvbVxuICAgICAqIG90aGVyIHJlcGxpY2EuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBtZXJnZSh2Yykge1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgTWF0aC5tYXgodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvbWVVaWQgdGhlIHJlcGxpY2EncyB1aWQuXG4gICAgICogQHBhcmFtIGNsb2NrVmFsdWUgdGhlIGNsb2NrIG51bWJlciBvZiB0aGUgcmVwbGljYS5cbiAgICAgKi9cbiAgICBzZXRFbnRyeShzb21lVWlkLCBjbG9ja1ZhbHVlKSB7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChzb21lVWlkLCBjbG9ja1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLlZlY3RvckNsb2NrID0gVmVjdG9yQ2xvY2s7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZWN0b3JfY2xvY2suanMubWFwIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1cbiAgXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcbnZhciBfY2xvY2tzZXE7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsIi8vIHJlcXVpcmUoJy4uL3Rlc3QvdGVzdCcpOyAvLyBydW4gdGVzdC50c1xuaW1wb3J0IHsgY3JkdHMsIG5ldHdvcmsgfSBmcm9tICdjb21wb3ZlbnR1YWxzLWNsaWVudCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbi8qKlxuICogR2V0IEhlcm9rdSBzZXJ2ZXIgaG9zdCBXZWJzb2NrZXQuXG4gKi9cbnZhciBIT1NUID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJylcblxuLyoqXG4gKiBHZW5lcmF0ZSB1dWlkIGZvciBlYWNoIGNsaWVudC5cbiAqL1xuY29uc3QgY2xpZW50X3V1aWQgOiBzdHJpbmcgPSB1dWlkKCk7XG5cbi8qKlxuICogR2VuZXJhdGUgQ1JEVHMnIFJ1bnRpbWUgb24gZWFjaCBjbGllbnQgYW5kIGNyZWF0ZSBDUkRUcyAoZS5nLiBDb3VudGVyQ3JkdCkuXG4gKi9cbmxldCBjbGllbnQgPSBuZXcgbmV0d29yay5DcmR0TmV0d29ya1J1bnRpbWUoY2xpZW50X3V1aWQsIEhPU1QpO1xuLy9sZXQgY2xpZW50Q291bnRlciA9IG5ldyBjcmR0cy5Db3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBjbGllbnQpO1xubGV0IGNsaWVudENvdW50ZXIgPSBuZXcgY3JkdHMuQ291bnRlcjIoXCJjb3VudGVySWRcIiwgY2xpZW50KTtcblxuLyogSFRNTCB2YXJpYWJsZXMgKi9cbnZhciBjb3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGVyXCIpO1xuXG4vKiBDdXN0b21pemUgdGhlIG9uY2hhbmdlKCkgZm9yIENSRFQgYXMgcmVmcmVzaCB0aGUgdmFsdWUgKi9cbmNsaWVudENvdW50ZXIub25jaGFuZ2UgPSAoKCkgPT4ge1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKX0pO1xuXG4vKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIGluY3JlbWVudCBidXR0b24gd2l0aCBDUkRUIG9wZXJhdGlvbiAqL1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmNyZW1lbnRcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcImNsaWNrZWQgaW5jcmVtZW50XCIpO1xuICAgIGNsaWVudENvdW50ZXIuYWRkKDEwMCk7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufVxuXG4vKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIGRlY3JlbWVudCBidXR0b24gd2l0aCBDUkRUIG9wZXJhdGlvbiAqL1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWNyZW1lbnRcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcImNsaWNrZWQgZGVjcmVtZW50XCIpO1xuICAgIGNsaWVudENvdW50ZXIuYWRkKC0xMDApO1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbn1cblxuLy8gLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBzeW5jIHRvIHN5bmNocm9uaXplIHRoZSB2YWx1ZSAqL1xuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzeW5jXCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xuLy8gfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==