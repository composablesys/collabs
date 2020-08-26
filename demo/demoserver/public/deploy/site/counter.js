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
exports.MultiValueRegister = exports.GSetCrdt = exports.MultRegisterCrdt = exports.MultRegisterInternal = exports.CounterCrdt = exports.CounterInternal = void 0;
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
exports.MapCrdt = exports.AddWinsSet = exports.CrdtObject = exports.GMapInternal = exports.DisableWinsFlag = exports.EnableWinsFlag = exports.NoOpCrdtInternal = exports.OrthogonalCrdt = exports.IntRegisterCrdt = exports.UnresettableIntRegisterCrdt = void 0;
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
let clientCounter = new compoventuals_client_1.crdts.CounterCrdt("counterId", client);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvanNvbi5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9yZXNldHRhYmxlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3NlbWlkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvc3RhbmRhcmQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay9jcmR0X25ldHdvcmtfcnVudGltZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9uZXR3b3JrL2NyZHRfcnVudGltZV9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9uZXR3b3JrL3ZlY3Rvcl9jbG9jay5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL3NyYy9zaXRlL2NvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlDQUF5Qyw2QkFBNkI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsNkJBQTZCLG1CQUFPLENBQUMsdURBQWE7QUFDbEQsK0JBQStCLG1CQUFPLENBQUMsMkRBQWU7QUFDdEQsaUM7Ozs7Ozs7Ozs7OztBQ3ZCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDOzs7Ozs7Ozs7Ozs7QUM1UWE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7Ozs7Ozs7Ozs7OztBQ2xQYTtBQUNiO0FBQ0E7QUFDQSxrQ0FBa0Msb0NBQW9DLGFBQWEsRUFBRSxFQUFFO0FBQ3ZGLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQywrREFBZTtBQUNwQyxhQUFhLG1CQUFPLENBQUMsMkRBQWE7QUFDbEMsYUFBYSxtQkFBTyxDQUFDLGlEQUFRO0FBQzdCO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLDZEQUFjO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyw2REFBYztBQUNuQyxhQUFhLG1CQUFPLENBQUMseURBQVk7QUFDakMsaUM7Ozs7Ozs7Ozs7OztBQ25CYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMseURBQVk7QUFDdkMsc0JBQXNCLG1CQUFPLENBQUMsK0RBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7Ozs7Ozs7OztBQ3RjYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMscUJBQXFCLG1CQUFPLENBQUMsNkRBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMElBQTBJLGFBQWEsV0FBVyxFQUFFO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDdlFhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx1Q0FBdUM7QUFDdkMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQzs7Ozs7Ozs7Ozs7O0FDOVdhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQyxzQkFBc0IsbUJBQU8sQ0FBQywrREFBZTtBQUM3QyxvQkFBb0IsbUJBQU8sQ0FBQywyREFBYTtBQUN6QyxxQkFBcUIsbUJBQU8sQ0FBQyw2REFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0M7Ozs7Ozs7Ozs7OztBQy9yQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHVCQUF1QixtQkFBTyxDQUFDLG1FQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7Ozs7QUN6UGE7QUFDYjtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsa0Q7Ozs7Ozs7Ozs7OztBQ0phO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLHVGQUEwQjtBQUMvQyxhQUFhLG1CQUFPLENBQUMsbUZBQXdCO0FBQzdDLGFBQWEsbUJBQU8sQ0FBQyxtRUFBZ0I7QUFDckMsaUM7Ozs7Ozs7Ozs7OztBQ2ZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDOzs7Ozs7Ozs7OztBQ3JJQSxTQUFTLG1CQUFPLENBQUMsdUNBQU07QUFDdkIsU0FBUyxtQkFBTyxDQUFDLHVDQUFNOztBQUV2QjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakNBLFVBQVUsbUJBQU8sQ0FBQyx5REFBVztBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxpRUFBbUI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1R0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFXO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLGlFQUFtQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSwwQ0FBMEM7QUFDMUMsMkdBQXNEO0FBQ3RELCtFQUFrQztBQUVsQzs7R0FFRztBQUNILElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7QUFFakQ7O0dBRUc7QUFDSCxNQUFNLFdBQVcsR0FBWSxTQUFJLEVBQUUsQ0FBQztBQUVwQzs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLElBQUksOEJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0QsSUFBSSxhQUFhLEdBQUcsSUFBSSw0QkFBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFL0Qsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFakQsNERBQTREO0FBQzVELGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDM0IsT0FBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUFBLENBQUMsQ0FBQyxDQUFDO0FBRTFELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsSUFBSSIsImZpbGUiOiJkZXBsb3kvc2l0ZS9jb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2l0ZS9jb3VudGVyLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmR0cyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY3JkdHNcIikpO1xuZXhwb3J0cy5uZXR3b3JrID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9uZXR3b3JrXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXIgPSBleHBvcnRzLkdTZXRDcmR0ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJJbnRlcm5hbCA9IGV4cG9ydHMuQ291bnRlckNyZHQgPSBleHBvcnRzLkNvdW50ZXJJbnRlcm5hbCA9IHZvaWQgMDtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gYWRkL2FkZGVkLlxuICogVE9ETzogb3B0aW1pemUgYXdheSAwIGFkZHM/XG4gKi9cbmNsYXNzIENvdW50ZXJJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxEYXRhO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIFtzdGF0ZSArIG1lc3NhZ2UsIG1lc3NhZ2VdO1xuICAgIH1cbn1cbmV4cG9ydHMuQ291bnRlckludGVybmFsID0gQ291bnRlckludGVybmFsO1xuQ291bnRlckludGVybmFsLmluc3RhbmNlID0gbmV3IENvdW50ZXJJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIHNpbXBsZSBjb3VudGVyIENSRFQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgYWRkZWQuXG4gKlxuICogV2FybmluZzogYWRkaXRpb24gaXMgbm90IGFjdHVhbGx5IGNvbW11dGF0aXZlIGlmIHRoZXJlIGlzIGFuXG4gKiBvdmVyZmxvdyBvciBpZiB5b3UgdXNlIGZsb2F0aW5nIHBvaW50IG51bWJlcnMuICBUT0RPOiBpcyB0aGVyZSBhXG4gKiBiZXR0ZXIgdHlwZSB3ZSBjYW4gdXNlP1xuICovXG5jbGFzcyBDb3VudGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgQ291bnRlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgYWRkLiAgQXMgYSBjb25zZXF1ZW5jZSxcbiAgICAgKiBjb3VudGVyLnZhbHVlICs9IG4gYW5kIGNvdW50ZXIudmFsdWUgLT0gbiB3b3JrXG4gICAgICogYXMgZXhwZWN0ZWQgKGNvbnZlcnRlZCB0byBDUkRUIGFkZGl0aW9ucykuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlIC0gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVyQ3JkdCA9IENvdW50ZXJDcmR0O1xuLyoqXG4gKiBPcGVyYXRpb25zLCBtZXNzYWdlcywgYW5kIGRlc2NyaXB0aW9ucyBhcmUgYWxsIGp1c3QgdGhlXG4gKiBudW1iZXIgdG8gbXVsdGlwbHkvbXVsdGlwbGllZC5cbiAqIFRPRE86IG9wdGltaXplIGF3YXkgMSBtdWx0cz9cbiAqL1xuY2xhc3MgTXVsdFJlZ2lzdGVySW50ZXJuYWwge1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiBbc3RhdGUgKiBtZXNzYWdlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5leHBvcnRzLk11bHRSZWdpc3RlckludGVybmFsID0gTXVsdFJlZ2lzdGVySW50ZXJuYWw7XG5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNdWx0UmVnaXN0ZXJJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIHNpbXBsZSBudW1lcmljYWwgcmVnaXN0ZXIgQ1JEVCB3aXRoIG11bHRpcGxpY2F0aW9uIG9wZXJhdGlvbnMuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBudW1iZXIgdGhhdCB3YXMgbXVsdGlwbGllZC5cbiAqXG4gKiBXYXJuaW5nOiBtdWx0aXBsaWNhdGlvbiBpcyBub3QgYWN0dWFsbHkgY29tbXV0YXRpdmUgaWYgdGhlcmUgaXMgYW5cbiAqIG92ZXJmbG93IG9yIGlmIHlvdSB1c2UgZmxvYXRpbmcgcG9pbnQgbnVtYmVycy4gIFRPRE86IGlzIHRoZXJlIGFcbiAqIGJldHRlciB0eXBlIHdlIGNhbiB1c2U/XG4gKi9cbmNsYXNzIE11bHRSZWdpc3RlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIE11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIG11bHQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3Aobik7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdGlwbGljYXRpb24uICBBcyBhIGNvbnNlcXVlbmNlLFxuICAgICAqIHJlZ2lzdGVyLnZhbHVlICo9IG4gYW5kIHJlZ2lzdGVyLnZhbHVlIC89IG4gd29ya1xuICAgICAqIGFzIGV4cGVjdGVkIChjb252ZXJ0ZWQgdG8gQ1JEVCBtdWx0aXBsaWNhdGlvbnMpLlxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgY3VycmVudCB2YWx1ZSBpcyAwLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW1wb3NzaWJsZSB0byBzZXQgdG8gbm9uemVybyB2YWx1ZSB3aGVuIGN1cnJlbnQgdmFsdWUgaXMgemVyb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIDAgLT4gMCBpcyBuby1vcFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubXVsdChuZXdWYWx1ZSAvIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdFJlZ2lzdGVyQ3JkdCA9IE11bHRSZWdpc3RlckNyZHQ7XG4vLyBleHBvcnQgY2xhc3MgQ291bnRlck1vZEludGVybmFsIGltcGxlbWVudHMgQ3JkdEludGVybmFsPG51bWJlcj4ge1xuLy8gICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1vZHVsdXM6IG51bWJlcikge1xuLy8gICAgICAgICBpZiAobW9kdWx1cyA8IDApIHRocm93IG5ldyBFcnJvcihcIm1vZHVsdXMgaXMgbmVnYXRpdmU6IFwiICsgbW9kdWx1cyk7XG4vLyAgICAgfVxuLy8gICAgIGNyZWF0ZShpbml0aWFsRGF0YT86IG51bWJlcik6IG51bWJlciB7XG4vLyAgICAgICAgIGlmIChpbml0aWFsRGF0YSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5pdGlhbERhdGE7XG4vLyAgICAgICAgIGVsc2UgcmV0dXJuIDA7XG4vLyAgICAgfVxuLy8gICAgIHByZXBhcmUob3BlcmF0aW9uOiBudW1iZXIsIF9zdGF0ZTogbnVtYmVyKTogbnVtYmVyIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMubW9kKG9wZXJhdGlvbik7XG4vLyAgICAgfVxuLy8gICAgIGVmZmVjdChtZXNzYWdlOiBudW1iZXIsIHN0YXRlOiBudW1iZXIsIF9yZXBsaWNhSWQ6IGFueSwgX3RpbWVzdGFtcDogQ2F1c2FsVGltZXN0YW1wKTogW251bWJlciwgbnVtYmVyXSB7XG4vLyAgICAgICAgIHJldHVybiBbdGhpcy5tb2Qoc3RhdGUgKyBtZXNzYWdlKSwgbWVzc2FnZV07XG4vLyAgICAgfVxuLy8gICAgIG1vZCh4OiBudW1iZXIpOiBudW1iZXIge1xuLy8gICAgICAgICBpZiAoeCA+PSAwKSByZXR1cm4geCAlIHRoaXMubW9kdWx1cztcbi8vICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5tb2R1bHVzIC0gKCgteCkgJSB0aGlzLm1vZHVsdXMpO1xuLy8gICAgIH1cbi8vIH1cbi8qKlxuICogT3BlcmF0aW9ucyBhbmQgbWVzc2FnZXMgYXJlIHRoZSBlbGVtZW50IHRvIGFkZC4gIFRPRE86XG4gKiB0aGlzIG1lYW5zIHRoYXQgYWRkaW5nIG51bGwgd29uJ3Qgd29yayBhcyBHU2V0Q3JkdCB3aWxsIHRyZWF0XG4gKiBpdHMgbWVzc2FnZSBhcyBhIG5vLW9wLiAgRGVzY3JpcHRpb24gaXMgdGhlIGVsZW1lbnQgYWRkZWRcbiAqIChpZiBpdCdzIHJlZHVuZGFudCwgZGVzY3JpcHRpb24gaXMgbnVsbCwgc28gb25jaGFuZ2Ugd29uJ3RcbiAqIHNlZSBhbnl0aGluZykuXG4gKi9cbmNsYXNzIEdTZXRJbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5oYXMob3BlcmF0aW9uKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH1cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHN0YXRlLmhhcyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgLy8gZG9lcyBub3RoaW5nXG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmFkZChtZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG1lc3NhZ2VdO1xuICAgICAgICB9XG4gICAgfVxufVxuR1NldEludGVybmFsLmluc3RhbmNlID0gbmV3IEdTZXRJbnRlcm5hbCgpO1xuLyoqXG4gKiBBIGdyb3ctb25seSBzZXQuXG4gKlxuICogSW4gb25jaGFuZ2UsIGV2ZW50LmRlc2NyaXB0aW9uIGlzIHRoZSBhcnJheSBvZiBlbGVtZW50cyBhZGRlZFxuICogKFtdIG9yIFthZGRlZCBlbGVtZW50XSkuXG4gKlxuICogVE9ETzogYWRkaW5nIGEgbnVsbCB2YWx1ZSB3aWxsIGJlIGlnbm9yZWQuXG4gKiBUT0RPOiBhZGQgYSB0eXBlIGFubm90YXRpb25cbiAqIFRPRE86IHNhbWUgaW50ZXJmYWNlIGFzIEpTIFNldFxuICovXG5jbGFzcyBHU2V0Q3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsRGF0YSkge1xuICAgICAgICBzdXBlcihpZCwgR1NldEludGVybmFsLmluc3RhbmNlLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIGFkZChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChlbGVtZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybiBUaGUgY3VycmVudCBzZXQuICBUaGlzIHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMuc3RhdGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuR1NldENyZHQgPSBHU2V0Q3JkdDtcbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlckludGVybmFsIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGluaXRpYWxEYXRhIEFuIGluaXRpYWwgdmFsdWUgdG8gc2V0LlxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0KFtbaW5pdGlhbERhdGEsIG51bGwsIC0xXV0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zOlxuICAgICAqIC0gW1wic2V0XCIsIHZhbHVlXTogc2V0IHRvIHRoZSBnaXZlbiBzaW5nbGUgdmFsdWUuXG4gICAgICogLSBbXCJyZXNldFwiXTogcmVzZXQsIHNldHRpbmcgdGhlIHZhbHVlIHNldCB0byBbXS5cbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBfc3RhdGUgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlLCBfcmVwbGljYUlkKSB7XG4gICAgICAgIGlmICghKChvcGVyYXRpb25bMF0gPT09IFwic2V0XCIgJiYgb3BlcmF0aW9uWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB8fCBvcGVyYXRpb25bMF0gPT09IFwicmVzZXRcIikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuZWQgZGVzY3JpcHRpb24gaXM6XG4gICAgICogLSBmb3Igc2V0IG1lc3NhZ2UsIFtcInNldFwiLCBzZXQgdmFsdWVdIChldmVuIGlmIGl0XG4gICAgICogZG9lc24ndCBlbGltaW5hdGUgYWxsIGNhdXNhbGx5IHByaW9yIHZhbHVlcykuXG4gICAgICogLSBmb3IgcmVzZXRzLCBbXCJyZXNldFwiXS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIF9yZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICBpZiAoISgobWVzc2FnZVswXSA9PT0gXCJzZXRcIiAmJiBtZXNzYWdlWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB8fCBtZXNzYWdlWzBdID09PSBcInJlc2V0XCIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgbWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2Ygc3RhdGUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUodmFsdWUpOyAvL2luaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQodmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSB2YWx1ZVsyXSlcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZVswXSA9PT0gXCJzZXRcIikge1xuICAgICAgICAgICAgc3RhdGUuYWRkKFttZXNzYWdlWzFdLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG59XG5NdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbCgpO1xuY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVyIGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHN1cGVyKGlkLCBNdWx0aVZhbHVlUmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFtcInNldFwiLCB2YWx1ZV0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWVTZXQoKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlWzBdKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbXCJyZXNldFwiXSk7XG4gICAgfVxuICAgIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVyID0gTXVsdGlWYWx1ZVJlZ2lzdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzaWNfY3JkdHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNyZHQgPSBleHBvcnRzLkNyZHRDaGFuZ2VFdmVudCA9IHZvaWQgMDtcbi8qKlxuICogQW4gZXZlbnQgaXNzdWVkIHdoZW4gYSBDUkRUIGlzIGNoYW5nZWQgYnkgYW5vdGhlciByZXBsaWNhLlxuICogQHBhcmFtIGNhbGxlciAgICAgIFRoZSBDcmR0IGluc3RhbmNlIHRoYXQgd2FzIGNoYW5nZWQuXG4gKiBAcGFyYW0gZGVzY3JpcHRpb24gQW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgZGVzY3JwdGlvbiBvZiB0aGUgY2hhbmdlLlxuICogQHBhcmFtIHRpbWVzdGFtcCAgIFRoZSBjYXVzYWwgdGltZXN0YW1wIG9mIHRoZSBjaGFuZ2UuIE5vdGUgdGhhdFxuICogYmVjYXVzZSBzZXZlcmFsIENSRFRzIGNhbiBzaGFyZSB0aGUgc2FtZSBydW50aW1lLCB0aW1lc3RhbXBzXG4gKiBtYXkgbm90IGJlIGNvbnRpbmd1b3VzIChlLmcuLCBlbnRyaWVzIGluIHRoZWlyIHZlY3RvciBjbG9ja3NcbiAqIG1pZ2h0IHNraXAgbnVtYmVycykuICBIb3dldmVyLCBjYXVzYWxseSBvcmRlcmVkIGRlbGl2ZXJ5IGlzXG4gKiBzdGlsbCBndWFyYW50ZWVkLlxuICovXG5jbGFzcyBDcmR0Q2hhbmdlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgZGVzY3JpcHRpb24sIHRpbWVzdGFtcCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG59XG5leHBvcnRzLkNyZHRDaGFuZ2VFdmVudCA9IENyZHRDaGFuZ2VFdmVudDtcbi8vIFVzZXItZmFjaW5nIHdyYXBwZXJzIGFyb3VuZCBDUkRUcyBzaG91bGQgZXh0ZW5kIHRoaXMgY2xhc3MsXG4vLyBhZGRpbmcgbWV0aG9kcyBmb3IgdGhlIENSRFQncyBvcGVyYXRpb25zIChlLmcuLCBpbmNyZW1lbnQoKSlcbi8vIHdoaWNoIGNhbGwgdGhpcyBjbGFzcydzIGFwcGx5IG1ldGhvZC5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYXBwbGljYXRpb24tZmFjaW5nIENSRFQgaW1wbGVtZW50YXRpb25zLlxuICogSW5zdGVhZCBvZiBleHBvc2luZyBDcmR0SW50ZXJuYWwgaW1wbGVtZW50YXRpb25zIGRpcmVjdGx5LFxuICogd2hpY2ggaGF2ZSBhbiB1bmZyaWVuZGx5IHByZXBhcmUvZWZmZWN0IGludGVyZmFjZSxcbiAqIGVhY2ggQ1JEVCBpbXBsZW1lbnRhdGlvbiBzaG91bGQgZGVmaW5lIGEgc3ViY2xhc3Mgb2YgdGhpc1xuICogY2xhc3Mgd2l0aCBvcmRpbmFyeS1sb29raW5nIG1ldGhvZHMgdG8gcGVyZm9ybSBvcGVyYXRpb25zXG4gKiBhbmQgcXVlcnkgdGhlIHN0YXRlLiAgTWV0aG9kcyBwZXJmb3JtaW5nIG9wZXJhdGlvbnMgc2hvdWxkXG4gKiBjYWxsIGFwcGx5T3Agd2l0aCB0aGUgY29ycmVzcG9uZGluZyBDcmR0SW50ZXJuYWwgb3BlcmF0aW9uLlxuICogVGhpcyBjbGFzcyB0aGVuIGF1dG9tYXRpY2FsbHkgaGFuZGxlcyBzZW5kaW5nIGFuZCByZWNlaXZpbmdcbiAqIG9mIG1lc3NhZ2VzLlxuICogQ2YuIEFsZ29yaXRobSAxIGluIHRoZSBzZW1pZGlyZWN0IHByb2R1Y3QgcGFwZXIuXG4gKiBAcGFyYW0gUyBUaGUgc3RhdGUgdHlwZSBvZiBDLlxuICovXG5jbGFzcyBDcmR0IHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ1JEVC4gIEFsbCBDUkRUcyB1c2luZyB0aGVcbiAgICAgKiBzYW1lIENyZHRSdW50aW1lIG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICogQHBhcmFtIGNyZHRJbnRlcm5hbCAgICBUaGUgQ3JkdEludGVybmFsIHRvIHVzZS4gIE5vdGUgdGhhdCBzaW5jZVxuICAgICAqIENyZHRJbnRlcm5hbCdzIGRvbid0IHN0b3JlIHN0YXRlcywgbXVsdGlwbGUgb2JqZWN0cyBtYXlcbiAgICAgKiBzaGFyZSB0aGUgc2FtZSBDcmR0SW50ZXJuYWwgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgVGhlIENyZHRSdW50aW1lIHRvIHVzZSBmb3Igc2VuZGluZyBhbmRcbiAgICAgKiByZWNlaXZpbmcgbWVzc2FnZXMuXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICBPcHRpb25hbCBpbml0aWFsIGRhdGEgdG8gdXNlIHdoZW5cbiAgICAgKiBzZXR0aW5nIHRoZSBDcmR0SW50ZXJuYWwncyBpbml0aWFsIHN0YXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBjcmR0SW50ZXJuYWwsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5jcmR0SW50ZXJuYWwgPSBjcmR0SW50ZXJuYWw7XG4gICAgICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyB0byBsaXN0ZW4gZm9yIHdoZW4gYW5vdGhlciByZXBsaWNhIHVwZGF0ZXNcbiAgICAgICAgICogdGhpcyBvYmplY3QncyBzdGF0ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub25jaGFuZ2UgPSAoKF8pID0+IHsgfSk7XG4gICAgICAgIC8vIFRPRE86IGRlc2NyaWJlIFwidHJhbnNhY3Rpb25zXCIuICBSaWdodCB3b3JkPyAgUmVuYW1lXG4gICAgICAgIC8vIFwiYXRvbWljXCIgc3R1ZmYgYmVsb3cuICBNdXN0IGhhcHBlbiBzeW5jaHJvbm91c2x5IHNvXG4gICAgICAgIC8vIHRoYXQgcnVudGltZS5nZXRUaW1lc3RhbXAoKSBkb2Vzbid0IGNoYW5nZSBhbmRcbiAgICAgICAgLy8gbm8gbWVzc2FnZXMgYXJlIHJlY2VpdmVkIGluIHRoZSBpbnRlcmltLlxuICAgICAgICAvLyBBbGxvdyBjYWxsZXIgdG8gc3RhcnQvZW5kIHRyYW5zYWN0aW9ucz9cbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25NZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLmNyZHRJbnRlcm5hbC5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXIodGhpcywgdGhpcy5pZCk7XG4gICAgfVxuICAgIHN0YXJ0VHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgdHJhbnNhY3Rpb24gaXMgYWxyZWFkeSBpbiBwcm9ncmVzcy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pblRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogUmV0dXJucyB0aGUgZGVzY3JpcHRpb25zICh0cmFuc2xhdGVkKVxuICAgIGVuZFRyYW5zYWN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZCh0aGlzLnRyYW5zYWN0aW9uTWVzc2FnZXMsIHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzID0gW107XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25EZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9ucy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IHRoZSBnaXZlbiBvcGVyYXRpb24gdG8gdGhlIHN0YXRlLCB1c2luZyBwcmVwYXJlIGFuZCBlZmZlY3QsXG4gICAgICogYW5kIHNlbmRzIHRoZSBnZW5lcmF0ZWQgbWVzc2FnZSBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIElmIGEgdHJhbnNhY3Rpb24gaXMgaW4gcHJvZ3Jlc3MsIHRoaXMgc2VuZGluZyBpcyBkZWxheWVkXG4gICAgICogdW50aWxcbiAgICAgKiBAcGFyYW0gIG9wZXJhdGlvbiBUaGUgb3BlcmF0aW9uIHRvIGFwcGx5LlxuICAgICAqIEByZXR1cm4gICAgICAgICAgIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgY2hhbmdlcy5cbiAgICAgKiBUaGlzIGlzIHRoZSBsaXN0IG9mIGluZGl2aWR1YWwgbWVzc2FnZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnlcbiAgICAgKiBlZmZlY3QgKHNraXBwaW5nIG51bGwgbWVzc2FnZXMpLFxuICAgICAqIGFmdGVyIGJlaW5nIHBhc3NlZCB0aHJvdWdoIHRyYW5zbGF0ZURlc2NyaXB0aW9uLiAgQW4gZXhjZXB0aW9uXG4gICAgICogaXMgdGhhdCBpZiBhbGwgbWVzc2FnZXMgYXJlXG4gICAgICogbnVsbCwgbnVsbCBpcyByZXR1cm5lZCB3aXRob3V0IGNhbGxpbmcgdHJhbnNsYXRlRGVzY3JpcHRpb24uXG4gICAgICogVE9ETzogbnVsbCBpZiBpbiBhIHRyYW5zYWN0aW9uICh1c2UgZW5kVHJhbnNhY3Rpb24gaW5zdGVhZCkuXG4gICAgICogVE9ETzogYnV0IHdoYXQgaWYgd2Ugd2FudCBpdCB0byBkZWNpZGUgd2hhdCB0byBkbyBuZXh0P1xuICAgICAqL1xuICAgIGFwcGx5T3Aob3BlcmF0aW9uKSB7XG4gICAgICAgIGxldCBvd25UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaW5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgb3duVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMucnVudGltZS5nZXROZXh0VGltZXN0YW1wKHRoaXMuaWQpO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuY3JkdEludGVybmFsLnByZXBhcmUob3BlcmF0aW9uLCB0aGlzLnN0YXRlLCB0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCkpO1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0KG1lc3NhZ2UsIHRoaXMuc3RhdGUsIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3duVHJhbnNhY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byB0cmFuc2xhdGUgdGhlIGRlc2NyaXB0aW9ucyByZXR1cm5lZCBieSB0aGVcbiAgICAgKiBDcmR0SW50ZXJuYWwgYmVmb3JlIHBhc3NpbmcgaXQgdG8gb25jaGFuZ2UuICBUaGlzIGlzXG4gICAgICogdXNlZnVsIGZvciBzZW1pZGlyZWN0IHByb2R1Y3RzIGJlY2F1c2UgdGhlIGRlZmF1bHRcbiAgICAgKiBTZW1pZGlyZWN0SW50ZXJuYWwgZGVzY3JpcHRpb25zIGFyZSBub3QgdXNlci1mcmllbmRseS5cbiAgICAgKiBJZiB0aGlzIG1ldGhvZCByZXR1cm5zIG51bGwsIG9uY2hhbmdlIGlzIG5vdCBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRpb24gcmV0dXJucyBkZXNjcmlwdGlvbnNbMF0uICBJdCBpc1xuICAgICAqIGFwcHJvcHJpYXRlIHdoZW4gdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0IGFscmVhZHkgcmV0dXJuc1xuICAgICAqIHVzZXItZnJpZW5kbHkgZGVzY3JpcHRpb25zIGFuZCBhcHBseU9wcyBpcyBvbmx5IGV2ZXIgY2FsbGVkXG4gICAgICogd2l0aCBzaW5nbGUgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAgZGVzY3JpcHRpb25zIEEgbGlzdCBvZiB0aGUgZGVzY3JpcHRpb25zIHJldHVybmVkIGJ5XG4gICAgICogdGhpcy5jcmR0SW50ZXJuYWwuZWZmZWN0LiAgVGhpcyB3aWxsIGFsd2F5cyBiZSBub24tZW1wdHkuXG4gICAgICogQHJldHVybiBUaGUgdHJhbnNsYXRlZCBkZXNjcmlwdGlvbiB0byBwYXNzIHRvIHRoaXMub25jaGFuZ2UsXG4gICAgICogb3IgbnVsbCBpZiB0aGlzLm9uY2hhbmdlIHNob3VsZCBub3QgYmUgY2FsbGVkLlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uc1swXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byBpbXBsZW1lbnQgbm9uLXRyaXZpYWwgb2JzZXJ2ZWQgcmVzZXRzXG4gICAgICogZm9yIHdoZW4gYSBDcmR0T2JqZWN0IGNvbnRhaW5pbmcgdGhpcyBDcmR0IGlzXG4gICAgICogcmVzZXQuICBUaGVcbiAgICAgKiBkZWZhdWx0IHJldHVybnMgbnVsbCwgc28gc3VjaCBtYXAgcmVzZXRzIGRvIG5vdGhpbmcuXG4gICAgICogQHJldHVybiBBIG1lc3NhZ2UgKG5vdCBvcGVyYXRpb24pIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG9cbiAgICAgKiB0aGlzIENyZHQgdG9nZXRoZXIgd2l0aCBhbnkgdGltZXN0YW1wXG4gICAgICogdG8gY2F1c2UgYW4gb2JzZXJ2ZWQtcmVzZXQgb3BlcmF0aW9uLCBvciBudWxsIHRvIGRvXG4gICAgICogbm90aGluZy4gIEZvciB0aGlzIENyZHRcbiAgICAgKiB0byBiZSBjb3JyZWN0IChldmVudHVhbGx5IGNvbnNpc3RlbnQpIHdoZW4gdXNlZCBhcyBhXG4gICAgICogcHJvcGVydHkgaW4gYW4gQ3JkdE9iamVjdCwgdGhlIHJldHVybmVkIG1lc3NhZ2VcbiAgICAgKiBtdXN0IHNhdGlzZnk6XG4gICAgICogLSB3aGVuIHBhaXJlZCB3aXRoIGFueSBDYXVzYWxUaW1lc3RhbXAsIGl0IGNvbW11dGVzIHdpdGhcbiAgICAgKiBjb25jdXJyZW50IG1lc3NhZ2VzICh1c3VhbCBDcmR0IHJlcXVpcmVtZW50KSwgaW5jbHVkaW5nXG4gICAgICogY29uY3VycmVudCByZXNldHMgYW5kIHN0cm9uZy1yZXNldHMuXG4gICAgICogLSB3aGVuIGFwcGxpZWQgdG8gYSBzdGF0ZSB3aGljaCBoYXMgbm90IHJlY2VpdmVkIGFueVxuICAgICAqIG1lc3NhZ2VzIGNhdXNhbGx5IHByaW9yIHRvIHRoZSB0aW1lc3RhbXAsIGl0IGhhc1xuICAgICAqIG5vIGVmZmVjdC4gIEluIG90aGVyIHdvcmRzLCBhcHBseWluZyBpdCB0byBhIGNvbmN1cnJlbnRseVxuICAgICAqIGluaXRpYWxpemVkIHN0YXRlIGhhcyBubyBlZmZlY3QuXG4gICAgICogT3RoZXJ3aXNlLCBpdCBpcyBmcmVlIHRvIGhhdmUgYW55IHNlbWFudGljcywgaW5jbHVkaW5nXG4gICAgICogZG9pbmcgbm90aGluZy4gIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBvYnNlcnZlZC1yZXNldCBzZW1hbnRpY3MuXG4gICAgICpcbiAgICAgKiBUT0RPOiByZXR1cm4gbGlzdCBvZiBtZXNzYWdlcyBpbnN0ZWFkLCBmb3IgZ2VuZXJhbGl0eT9cbiAgICAgKi9cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub250cml2aWFsIG9ic2VydmVkLXJlc2V0cy5cbiAgICAgKiBVbmxpa2UgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCksIHRoZXJlIGFyZSBubyBzcGVjaWFsXG4gICAgICogcmVxdWlyZW1lbnRzIChvdGhlciB0aGFuIHRoZSB1c3VhbCBDcmR0IGNvbW11dGF0aXZpdHkpLlxuICAgICAqIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgICAqIHRoZSBvYnNlcnZlZC1yZXNldCBzZW1hbnRpY3MuXG4gICAgICovXG4gICAgcmVzZXQoKSB7IH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIGltcGxlbWVudCBub250cml2aWFsIHN0cm9uZy1yZXNldHMuXG4gICAgICogVW5saWtlIGdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpLCB0aGVyZSBhcmUgbm8gc3BlY2lhbFxuICAgICAqIHJlcXVpcmVtZW50cyAob3RoZXIgdGhhbiB0aGUgdXN1YWwgQ3JkdCBjb21tdXRhdGl2aXR5KS5cbiAgICAgKiBIb3dldmVyLCB0aGUgaW50ZW50IGlzIHRoYXQgaXRcbiAgICAgKiBhdCBsZWFzdCBhcHByb3hpbWF0ZXNcbiAgICAgKiB0aGUgc3Ryb25nLXJlc2V0IHNlbWFudGljcy5cbiAgICAgKi9cbiAgICByZXNldFN0cm9uZygpIHsgfVxuICAgIC8vIC8qKlxuICAgIC8vICAqIE92ZXJyaWRlIHRoaXMgdG8gaW1wbGVtZW50IG5vbi10cml2aWFsIHN0cm9uZyByZXNldHMuICBUaGVcbiAgICAvLyAgKiBkZWZhdWx0IHJldHVybnMgbnVsbCwgc28gcmVzZXRzIGRvIG5vdGhpbmcuXG4gICAgLy8gICogQHJldHVybiBBIG1lc3NhZ2UgKG5vdCBvcGVyYXRpb24pIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG9cbiAgICAvLyAgKiB0aGlzIENyZHQgdG9nZXRoZXIgd2l0aCBhbnkgdGltZXN0YW1wXG4gICAgLy8gICogdG8gY2F1c2UgYSBzdHJvbmctcmVzZXQgb3BlcmF0aW9uLCBvciBudWxsIHRvIGRvXG4gICAgLy8gICogbm90aGluZy4gIEZvciB0aGlzIENyZHRcbiAgICAvLyAgKiB0byBiZSBjb3JyZWN0IChldmVudHVhbGx5IGNvbnNpc3RlbnQpIHdoZW4gdXNlZCBhcyBhXG4gICAgLy8gICogcHJvcGVydHkgaW4gYW4gQ3JkdE9iamVjdCwgdGhlIHJldHVybmVkIG1lc3NhZ2VcbiAgICAvLyAgKiBtdXN0IHNhdGlzZnk6XG4gICAgLy8gICogLSB3aGVuIHBhaXJlZCB3aXRoIGFueSBDYXVzYWxUaW1lc3RhbXAsIGl0IGNvbW11dGVzIHdpdGhcbiAgICAvLyAgKiBjb25jdXJyZW50IG1lc3NhZ2VzICh1c3VhbCBDcmR0IHJlcXVpcmVtZW50KSwgaW5jbHVkaW5nXG4gICAgLy8gICogY29uY3VycmVudCByZXNldHMgYW5kIHN0cm9uZy1yZXNldHMuXG4gICAgLy8gICogT3RoZXJ3aXNlLCBpdCBpcyBmcmVlIHRvIGhhdmUgYW55IHNlbWFudGljcywgaW5jbHVkaW5nXG4gICAgLy8gICogZG9pbmcgbm90aGluZy4gIEhvd2V2ZXIsIHRoZSBpbnRlbnQgaXMgdGhhdCBpdFxuICAgIC8vICAqIGF0IGxlYXN0IGFwcHJveGltYXRlc1xuICAgIC8vICAqIHRoZSBzdHJvbmctcmVzZXQgc2VtYW50aWNzLlxuICAgIC8vICAqL1xuICAgIC8vIGdldFVuaXZlcnNhbFJlc2V0U3Ryb25nTWVzc2FnZSgpOiBhbnkge1xuICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIHRoaXMucnVudGltZSB3aGVuIGFuIGF0b21pYyBsaXN0IG9mXG4gICAgICogbWVzc2FnZXMgaXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgcmVjZWl2ZShtZXNzYWdlcywgdGltZXN0YW1wKSB7XG4gICAgICAgIGlmICh0aGlzLmluVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluIHRyYW5zYWN0aW9uOyB0aGUgdHJhbnNhY3Rpb24gbXVzdCBcIiArXG4gICAgICAgICAgICAgICAgXCJiZSBlbmRlZCBzeW5jaHJvbm91c2x5IHNvIHRoYXQgbWVzc2FnZXMgXCIgK1xuICAgICAgICAgICAgICAgIFwiY2Fubm90IGJlIHJlY2VpdmVkIGluIHRoZSBpbnRlcmltLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNyZHRJbnRlcm5hbC5lZmZlY3QobWVzc2FnZSwgdGhpcy5zdGF0ZSwgdGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9ucy5wdXNoKHJlc3VsdFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25jaGFuZ2UgJiYgZGVzY3JpcHRpb25zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWQgPSB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9ucyhkZXNjcmlwdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2hhbmdlKG5ldyBDcmR0Q2hhbmdlRXZlbnQodGhpcywgdHJhbnNsYXRlZCwgdGltZXN0YW1wKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNyZHQgPSBDcmR0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9jb3JlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2Jhc2ljX2NyZHRzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X2NvcmVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2pzb25cIiksIGV4cG9ydHMpO1xuLy9leHBvcnQgKiBmcm9tICcuL211bHRpX3NlbWlkaXJlY3QnO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3Jlc2V0dGFibGVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3NlbWlkaXJlY3RcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3N0YW5kYXJkXCIpLCBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Kc29uQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHN0YW5kYXJkXzEgPSByZXF1aXJlKFwiLi9zdGFuZGFyZFwiKTtcbmNvbnN0IGJhc2ljX2NyZHRzXzEgPSByZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKTtcbmNsYXNzIEpzb25DcmR0IGV4dGVuZHMgc3RhbmRhcmRfMS5DcmR0T2JqZWN0IHtcbiAgICAvLyBUT0RPOiBhcnJheXMgKHNlcXVlbmNlcykuICBVc2VzIG1hcHMgZm9yIG5vdy5cbiAgICAvLyBUT0RPOiBudWxscz9cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHBhc3MgaW5pdGlhbCB2YWx1ZSAod2hpY2ggaXMgbm90IHN5bmNlZCkuXG4gICAgLy8gTW9yZSBnZW5lcmFsbHksIGFiaWxpdHkgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIHlvdXJcbiAgICAvLyBwcmVkZWZpbmVkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHN5bmNlZD9cbiAgICAvLyBVc2UgdGhlIGV4aXN0aW5nIGZsYWcgYW5kIGJsb2NrIG1lc3NhZ2VzIGluIENyZHRPYmplY3QuXG4gICAgY29uc3RydWN0b3IoY3JkdElkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGNyZHRJZCwgcnVudGltZSk7XG4gICAgICAgIHRoaXMuc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpO1xuICAgICAgICB0aGlzLmJvb2xlYW5zID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcImJvb2xlYW5zXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IHN0YW5kYXJkXzEuRW5hYmxlV2luc0ZsYWcoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5udW1iZXJzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcIm51bWJlcnNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5JbnRSZWdpc3RlckNyZHQoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcInN0cmluZ3NcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgYmFzaWNfY3JkdHNfMS5NdWx0aVZhbHVlUmVnaXN0ZXIoa2V5LCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICAgICAgdGhpcy5zZXRzID0gbmV3IHN0YW5kYXJkXzEuTWFwQ3JkdChcInNldHNcIiwgdGhpcywgKGtleSwgaW50ZXJuYWxSdW50aW1lKSA9PiBuZXcgc3RhbmRhcmRfMS5BZGRXaW5zU2V0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMub2JqZWN0cyA9IG5ldyBzdGFuZGFyZF8xLk1hcENyZHQoXCJvYmplY3RzXCIsIHRoaXMsIChrZXksIGludGVybmFsUnVudGltZSkgPT4gbmV3IEpzb25DcmR0KGtleSwgaW50ZXJuYWxSdW50aW1lKSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBDcmR0IHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgc3RvcmluZ1xuICAgICAqIHZhbHVlcyB3aXRoIHRoZSBzYW1lIHR5cGUgYXMgdHlwZUluZGljYXRvcixcbiAgICAgKiBvciB1bmRlZmluZWQgaWYgdGhlIGtleSBpcyBub3QgcHJlc2VudCAoaW5jbHVkaW5nXG4gICAgICogaWYgaXQgcHJldmlvdXNseSB3YXMgcHJlc2VudCBidXQgd2FzIHJlbW92ZWQpLlxuICAgICAqIChVc2UgaW5pdCBpbnN0ZWFkIGlmIHlvdSB3YW50IGEgZ3VhcmFudGVlZC1kZWZpbmVkXG4gICAgICogcmV0dXJuIHZhbHVlLilcbiAgICAgKiAoVE9ETzogZXhwbGFpbiBrZXlzIGFyZVxuICAgICAqIHNlZ3JlZ2F0ZWQgYnkgdmFsdWUgdHlwZSkuXG4gICAgICogRS5nLiBnZXQoXCJhXCIsIDApIHRvIGdldCB0aGUgbnVtYmVyIHZhbHVlIHdpdGgga2V5IDAuXG4gICAgICogU3RhbmRhcmQgdHlwZUluZGljYXRvciB2YWx1ZXM6XG4gICAgICogLSBmYWxzZTogYm9vbGVhbiAoRW5hYmxlV2luc0ZsYWcpXG4gICAgICogLSAwOiBudW1iZXIgKEludFJlZ2lzdGVyQ3JkdClcbiAgICAgKiAtIFwiXCI6IHN0cmluZyAoTXVsdGlWYWx1ZVJlZ2lzdGVyPHN0cmluZz4pXG4gICAgICogLSBuZXcgU2V0KCk6IHNldCAoQWRkV2luc1NldClcbiAgICAgKiAtIHt9OiBvYmplY3QgKEpzb25DcmR0KVxuICAgICAqXG4gICAgICogVE9ETzogZXhwbGljdGx5IHR5cGVkIHZlcnNpb25zPyAgQ2FuIHdlIGRvIHRoaXMgY2xldmVybHlcbiAgICAgKiB3aXRoIGdlbmVyaWNzIGFuZCB0eXBlIHBvbHltb3JwaGlzbSBvciBzb21ldGhpbmc/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIGtleSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgdHlwZUluZGljYXRvciBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBnZXQoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmdldChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXMoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gdGhpcy5udW1iZXJzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gdGhpcy5zdHJpbmdzLmhhcyhrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0cy5oYXMoa2V5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHR5cGVJbmRpY2F0b3IgdHlwZTogXCIgK1xuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHR5cGVJbmRpY2F0b3IpICsgXCIgKFwiICsgdHlwZUluZGljYXRvciArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGUoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ib29sZWFucy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmluZ3MuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCB0eXBlSW5kaWNhdG9yIHR5cGU6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiB0eXBlSW5kaWNhdG9yKSArIFwiIChcIiArIHR5cGVJbmRpY2F0b3IgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBnZXQsIGJ1dCBpbnN0ZWFkIG9mIHJldHVybmluZyB0aGUgdmFsdWUgQ3JkdCxcbiAgICAgKiByZXR1cm5zIGl0cyB2YWx1ZS4gIE5vdGUgZm9yIHN0cmluZ3MsIGlmIHRoZSBDcmR0XG4gICAgICogZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSB2YWx1ZSAoZWl0aGVyIG9yIDIrKSxcbiAgICAgKiB3aGljaCBpcyBwb3NzaWJsZSBkdWUgdG8gdGhlIE11bHRpVmFsdWVSZWdpc3RlclxuICAgICAqIHNlbWFudGljcywgd2UgcmV0dXJuIHRoZSBzZXQgb2YgYWxsIGN1cnJlbnQgdmFsdWVzXG4gICAgICogaW5zdGVhZCBvZiBhIHNpbmdsZSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBUT0RPOiB1c2UgZ2VuZXJpY3MgdG8gc2F5IHRoYXQgcmV0dXJuIHZhbHVlIGlzXG4gICAgICogc2FtZSBhcyB0eXBlSW5kaWNhdG9yIHR5cGUgfCB1bmRlZmluZWQ/XG4gICAgICogV29ya3MgZXhjZXB0IGZvciBzdHJpbmdzLFxuICAgICAqIHdoaWNoIGNvdWxkIGluc3RlYWQgcmV0dXJuIGEgU2V0PHN0cmluZz4uXG4gICAgICogQ291bGQgaW5zdGVhZCBoYXZlIHNwZWNpZmljYWxseSB0eXBlZCB2ZXJzaW9ucyBvZiB0aGUgbWV0aG9kLlxuICAgICAqL1xuICAgIGdldFZhbHVlKGtleSwgdHlwZUluZGljYXRvcikge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5nZXQoa2V5LCB0eXBlSW5kaWNhdG9yKTtcbiAgICAgICAgaWYgKHZhbHVlQ3JkdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWVDcmR0IGluc3RhbmNlb2YgYmFzaWNfY3JkdHNfMS5NdWx0aVZhbHVlUmVnaXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTZXQgPSB2YWx1ZUNyZHQudmFsdWVTZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU2V0LnNpemUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlU2V0LnZhbHVlcygpLm5leHQoKS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVTZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcy9yZXZpdmVzIHRoZSBnaXZlbiBrZXkgd2l0aCB0aGUgaW5kaWNhdGVkIHR5cGUgaWZcbiAgICAgKiBuZWVkZWQsIG1ha2luZyBpdCBwcmVzZW50IGluIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB0eXBlSW5kaWNhdG9yIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIHRoZSB2YWx1ZSBDcmR0LlxuICAgICAqL1xuICAgIGluaXQoa2V5LCB0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIC8vIFRPRE86IGNhbiB3ZSBnZW5lcmlmeSB0aGlzIGZ1bmN0aW9uIHBhdHRlcm4/XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmluaXQoa2V5KTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5pbml0KGtleSk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3MuaW5pdChrZXkpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMuaW5pdChrZXkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIGF0IHRoZSBnaXZlbiBrZXkgdG8gYSBjb3B5IG9mIHRoZSBnaXZlblxuICAgICAqIChub24tQ3JkdCkgdmFsdWUsIHVzaW5nIHRoZSBDcmR0J3MgLnZhbHVlID0gbWV0aG9kLlxuICAgICAqIFRoaXMgZ2VuZXJhbGx5IGhhcyB0aGUgZWZmZWN0IG9mIHJlc2V0dGluZyB0aGUgY3VycmVudCBDcmR0XG4gICAgICogYW5kIHRoZW4gcGVyZm9ybWluZyBvcGVyYXRpb25zIHRvIGRyaXZlIGl0IHRvIHRoZSBkZXNpcmVkXG4gICAgICogdmFsdWUuICBJZiB5b3Ugd2FudCBtb3JlIGNvbnRyb2wgb3ZlciBob3cgdGhlIHZhbHVlIGlzIHNldFxuICAgICAqIChlLmcuLCBwYXNzaW5nIGFuIG9wdGlvbiB0byBKc29uQ3JkdC5nZXRBc09iamVjdCB3aGVuIHNldHRpbmdcbiAgICAgKiBhbiBvYmplY3QncyB2YWx1ZSksIHlvdSBjYW4gaW5zdGVhZCBnZXQgdGhlIENyZHQgd2l0aFxuICAgICAqIHRoaXMuaW5pdChrZXksIHZhbHVlKSBhbmQgdGhlbiBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaXRcbiAgICAgKiBkaXJlY3RseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICB2YWx1ZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBUaGUgcmVzdWx0aW5nIHZhbHVlIENyZHQgKHRoaXMuZ2V0KGtleSwgdmFsdWUpKS5cbiAgICAgKi9cbiAgICBzZXRWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5zZXRWYWx1ZUludGVybmFsKGtleSwgdmFsdWUpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHJldHVybiB2YWx1ZUNyZHQ7XG4gICAgfVxuICAgIHNldFZhbHVlSW50ZXJuYWwoa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgdmFsdWVDcmR0ID0gdGhpcy5pbml0KGtleSwgdmFsdWUpO1xuICAgICAgICB2YWx1ZUNyZHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlQ3JkdDtcbiAgICB9XG4gICAga2V5c0J5VHlwZSh0eXBlSW5kaWNhdG9yKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHR5cGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiB0aGlzLmJvb2xlYW5zLmtleXMoKTtcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIHRoaXMubnVtYmVycy5rZXlzKCk7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiB0aGlzLnN0cmluZ3Mua2V5cygpO1xuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgIGlmICh0eXBlSW5kaWNhdG9yIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHMua2V5cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHMua2V5cygpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgdHlwZUluZGljYXRvciB0eXBlOiBcIiArXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgdHlwZUluZGljYXRvcikgKyBcIiAoXCIgKyB0eXBlSW5kaWNhdG9yICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gQXJyYXkgb2YgW2tleSwgdHlwZSBuYW1lXSBwYWlyc1xuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMuYm9vbGVhbnMua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJib29sZWFuXCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMubnVtYmVycy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcIm51bWJlclwiXSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLnN0cmluZ3Mua2V5cygpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgXCJzdHJpbmdcIl0pO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5zZXRzLmtleXMoKSlcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtrZXksIFwic2V0XCJdKTtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub2JqZWN0cy5rZXlzKCkpXG4gICAgICAgICAgICByZXN1bHQucHVzaChba2V5LCBcIm9iamVjdFwiXSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBjaGVja0tleUNvbmZsaWN0UnVsZShrZXlDb25mbGljdFJ1bGUpIHtcbiAgICAgICAgaWYgKCEoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcyB8fFxuICAgICAgICAgICAga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FcnJvck9uQ29uZmxpY3QgfHxcbiAgICAgICAgICAgIGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBrZXlDb25mbGljdFJ1bGU6IFwiICtcbiAgICAgICAgICAgICAgICBrZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoaXMgQ3JkdCdzIHZhbHVlIGluIE9iamVjdCBmb3JtLlxuICAgICAqIENoYW5naW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBoYXMgbm8gZWZmZWN0IG9uIHRoZSBDcmR0IHN0YXRlLlxuICAgICAqIE5vdGUgdGhhdCBzZXQgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gSmF2YXNjcmlwdCBTZXRzLFxuICAgICAqIHJlc3VsdGluZyBpbiBhIG5vdC1xdWl0ZS1KU09OIGZvcm1hdCBvYmplY3QuXG4gICAgICogQSBzdHJpbmcgTXVsdGlWYWx1ZVJlZ2lzdGVyIGlzIGNvbnZlcnRlZCB0byBhIHN0cmluZyBpZiBpdCBoYXNcbiAgICAgKiBhIHNpbmdsZSB2YWx1ZTsgb3RoZXJ3aXNlICgwIG9yIDIrIHZhbHVlcykgaXRcbiAgICAgKiBpcyBjb252ZXJ0ZWQgdG8gYSBTZXQ8c3RyaW5nPlxuICAgICAqIChBcnJheTxzdHJpbmc+IGlmIHNldHNBc0FycmF5cz10cnVlKVxuICAgICAqIG9mIGFsbCBjdXJyZW50IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAga2V5Q29uZmxpY3RSdWxlPUpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3RcbiAgICAgKiBQb2xpY3kgZm9yIGhhbmRsaW5nIGtleXMgb2YgZGlmZmVyZW50IHR5cGVzIHRoYXQgaGF2ZSB0aGVcbiAgICAgKiBzYW1lIG5hbWUuICBPcHRpb25zOlxuICAgICAqIC0gRXJyb3JPbkNvbmZsaWN0IChkZWZhdWx0KTogdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3QuXG4gICAgICogLSBQcmVmaXhUeXBlczogcHJlZml4IHRoZSB0eXBlIG5hbWUgZm9sbG93ZWQgYnkgXCI6XCIgdG8gZWFjaCBrZXksXG4gICAgICogZS5nLiBcIm51bWJlcjpteUtleVwiLiAgVHlwZSBuYW1lcyBhcmUgXCJib29sZWFuXCIsIFwibnVtYmVyXCIsXG4gICAgICogXCJzdHJpbmdcIiwgXCJzZXRcIiwgXCJvYmplY3RcIi5cbiAgICAgKiAtIEV4cGFuZE9uQ29uZmxpY3Q6IGlmIHRoZXJlIGlzIGEgY29uZmxpY3Qgb25cbiAgICAgKiBhIGtleSwgc2V0IGl0cyB2YWx1ZSB0byBlcXVhbCBhbiBvYmplY3QgY29udGFpbmluZyBlYWNoIG9mXG4gICAgICogdGhlIGNvbmZsaWN0aW5nIHZhbHVlcywgcGx1cyBhIGZsYWcgXCJqc29uQ3JkdEtleUV4cGFuZGVkID0gdHJ1ZVwiLiAgRS5nLlxuICAgICAqIFwibXlLZXlcIjoge1wianNvbkNyZHRLZXlFeHBhbmRlZFwiOiB0cnVlLCBcInN0cmluZ1wiOiBcInN0cmluZ1ZhbHVlXCIsXG4gICAgICogXCJudW1iZXJcIjogN31cbiAgICAgKiBAcGFyYW0gc2V0c0FzQXJyYXlzID0gZmFsc2UgSWYgdHJ1ZSwgU2V0IHZhbHVlcyBhcmUgY29udmVydGVkXG4gICAgICogdG8gYXJyYXlzLCBzbyB0aGF0IHRoZSByZXN1bHRpbmcgT2JqZWN0IGlzIGluIHJlZ3VsYXIgSlNPTlxuICAgICAqIGZvcm1hdC4gIFRoaXMgaW5jbHVkZXMgU2V0PHN0cmluZz4gdmFsdWVzIHJlc3VsdGluZyBmcm9tXG4gICAgICogc3RyaW5nIE11bHRpVmFsdWVSZWdpc3RlcnMgdGhhdCBoYXZlIDAgb3IgMisgdmFsdWVzLlxuICAgICAqL1xuICAgIGdldEFzT2JqZWN0KGtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCwgc2V0c0FzQXJyYXlzID0gZmFsc2UpIHtcbiAgICAgICAgSnNvbkNyZHQuY2hlY2tLZXlDb25mbGljdFJ1bGUoa2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgbGV0IG9iamVjdCA9IHt9O1xuICAgICAgICAvLyBNYXBzIGtleXMgdG8gdGhlIG5hbWUgb2YgdGhlaXIgZmlyc3QgdHlwZVxuICAgICAgICBsZXQga2V5c1NvRmFyID0gbmV3IE1hcCgpO1xuICAgICAgICBsZXQgY29uZmxpY3RlZEtleXNTb0ZhciA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuYm9vbGVhbnMsIFwiYm9vbGVhblwiLCB2YWx1ZSA9PiB2YWx1ZS52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2V0QXNPYmplY3RJbnRlcm5hbChvYmplY3QsIGtleXNTb0ZhciwgY29uZmxpY3RlZEtleXNTb0Zhciwga2V5Q29uZmxpY3RSdWxlLCB0aGlzLm51bWJlcnMsIFwibnVtYmVyXCIsIHZhbHVlID0+IHZhbHVlLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc3RyaW5ncywgXCJzdHJpbmdcIiwgdmFsdWUgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLnZhbHVlU2V0O1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5zaXplID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAoc2V0c0FzQXJyYXlzID8gWy4uLnJlc3VsdC52YWx1ZXMoKV0gOiByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIHRoaXMuc2V0cywgXCJzZXRcIiwgdmFsdWUgPT4gKHNldHNBc0FycmF5cyA/IFsuLi52YWx1ZS52YWx1ZV0gOiB2YWx1ZS52YWx1ZSkpO1xuICAgICAgICB0aGlzLmdldEFzT2JqZWN0SW50ZXJuYWwob2JqZWN0LCBrZXlzU29GYXIsIGNvbmZsaWN0ZWRLZXlzU29GYXIsIGtleUNvbmZsaWN0UnVsZSwgdGhpcy5vYmplY3RzLCBcIm9iamVjdFwiLCB2YWx1ZSA9PiB2YWx1ZS5nZXRBc09iamVjdChrZXlDb25mbGljdFJ1bGUsIHNldHNBc0FycmF5cykpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBnZXRBc09iamVjdEludGVybmFsKG9iamVjdCwga2V5c1NvRmFyLCBjb25mbGljdGVkS2V5c1NvRmFyLCBrZXlDb25mbGljdFJ1bGUsIG1hcCwgdHlwZU5hbWUsIHZhbHVlRnVuYykge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgbWFwLmtleXMoKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVGdW5jKG1hcC5nZXQoa2V5KSk7XG4gICAgICAgICAgICBpZiAoa2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5QcmVmaXhUeXBlcykge1xuICAgICAgICAgICAgICAgIG9iamVjdFt0eXBlTmFtZSArIFwiOlwiICsga2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5c1NvRmFyLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gS2V5IGNvbmZsaWN0XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBrZXk6IFwiICsga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiIHdoZW4ga2V5Q29uZmxpY3RSdWxlPVwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5Q29uZmxpY3RSdWxlID09PSBKc29uQ3JkdC5FeHBhbmRPbkNvbmZsaWN0XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29uZmxpY3RlZEtleXNTb0Zhci5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhwYW5kIHRoZSBleGlzdGluZyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmxpY3RlZEtleXNTb0Zhci5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHBhbmRlZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpzb25DcmR0S2V5RXhwYW5kZWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFtrZXlzU29GYXIuZ2V0KGtleSldID0gb2JqZWN0W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Rba2V5XSA9IGV4cGFuZGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldW3R5cGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vIGtleSBjb25mbGljdFxuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAga2V5c1NvRmFyLnNldChrZXksIHR5cGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhpcyBvYmplY3QgYW5kIHRoZW4gcGVyZm9ybXMgb3BlcmF0aW9ucyB0b1xuICAgICAqIGRyaXZlIGl0cyB2YWx1ZSB0byB0aGUgZ2l2ZW4gSlNPTi1saWtlIE9iamVjdC5cbiAgICAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBib29sZWFucywgbnVtYmVycywgc3RyaW5ncyxcbiAgICAgKiBTZXRzLCBvciBvYmplY3RzIGFyZSBpZ25vcmVkOyBvYmplY3RzIGJlc2lkZXMgU2V0c1xuICAgICAqIGFyZSBwcm9jZXNzZWQgcmVjdXJzaXZlbHkuXG4gICAgICpcbiAgICAgKiBUT0RPOiBmb3Igbm93LCBhcnJheXMgYXJlIGNvbnZlcnRlZCB0byBzZXRzLlxuICAgICAqXG4gICAgICogSWYgbmV3VmFsdWUgY29tZXMgZnJvbSBhIEpzb25DcmR0J3MgLnZhbHVlIG9yIGdldEFzT2JqZWN0XG4gICAgICogbWV0aG9kcywgbm90ZSB0aGF0IHNldHMvYXJyYXlzIG9mIHN0cmluZ3MgcmVzdWx0aW5nIGZyb21cbiAgICAgKiBtdWx0aS12YWx1ZSByZWdpc3RlcnMgd2lsbCBiZSB0cmVhdGVkIGFzIHNldHMsIG5vdFxuICAgICAqIHN0cmluZyB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIG5ld1ZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdG8uXG4gICAgICogQHBhcmFtIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0XG4gICAgICogSWYgbmV3VmFsdWUgd2FzIGdlbmVyYXRlZCBieSBnZXRBc09iamVjdCwgdGhlIGtleUNvbmZsaWN0UnVsZVxuICAgICAqIHVzZWQgdG8gZ2VuZXJhdGUgaXQsIHNvIHRoYXQgd2UgY2FuIHVuZG8gdGhlIGVmZmVjdFxuICAgICAqIG9mIHRoYXQgcnVsZS4gIE9wdGlvbnM6XG4gICAgICogLSBFcnJvck9uQ29uZmxpY3QgKGRlZmF1bHQpOiBrZXlzIGFuZCB2YWx1ZXMgYXJlIHVzZWQgbGl0ZXJhbGx5LFxuICAgICAqIHdpdGggaW5mZXJyZWQgdHlwZXMuXG4gICAgICogVGhpcyBpcyBhcHByb3ByaWF0ZSBmb3IgT2JqZWN0cyBub3QgY29taW5nIGZyb20gYSBKc29uQ3JkdCdzXG4gICAgICogZ2V0QXNPYmplY3QgZnVuY3Rpb24sIGluIHdoaWNoIHdlIHdhbnQgdG8ga2VlcCBrZXlzIGFzXG4gICAgICogdGhleSBhcmUuXG4gICAgICogLSBQcmVmaXhUeXBlczogVHlwZXMgYXJlIHRha2VuIGZyb20gcHJlZml4ZXMgb24ga2V5cy4gIElmIGFcbiAgICAgKiBrZXkgZG9lcyBub3QgaGF2ZSBhIHR5cGUgcHJlZml4LCBpdCBpcyBpZ25vcmVkLlxuICAgICAqIC0gRXhwYW5kT25Db25mbGljdDogb2JqZWN0cyB3aXRoIGEgcHJvcGVydHkgXCJqc29uQ3JkdEtleUV4cGFuZGVkXCIgc2V0XG4gICAgICogdG8gdHJ1ZSBhcmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHJlc3VsdCBvZiBleHBhbmRpbmcgYVxuICAgICAqIGtleSBkdWUgdG8gYSBjb25mbGljdC4gIElmIHN1Y2ggYW4gb2JqZWN0IGRvZXMgbm90IGhhdmVcbiAgICAgKiB0aGUgZXhwZWN0ZWQgZm9ybWF0LCBhbnkgcHJvcGVydGllcyB3aXRoIHVucmVjb2duaXplZCBuYW1lc1xuICAgICAqIGFyZSBpZ25vcmVkLlxuICAgICAqL1xuICAgIHNldFRvT2JqZWN0KG5ld1ZhbHVlLCBuZXdWYWx1ZUtleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwobmV3VmFsdWUsIG5ld1ZhbHVlS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIG9wZXJhdGlvbnMgdG8gZHJpdmUgdGhpcyBDcmR0J3MgdmFsdWUgdG8gdGhlXG4gICAgICogZ2l2ZW4gSlNPTi1saWtlIE9iamVjdCdzIHN0YXRlLCBidXQgd2l0aG91dCByZXNldHRpbmdcbiAgICAgKiB0aGUgY3VycmVudCB2YWx1ZS4gIFRoZSBtYWluIGVmZmVjdCBvZiB0aGlzIGlzIHRvXG4gICAgICogbWVyZ2Uga2V5czsgaW4gY2FzZSBvZiBrZXkgY29uZmxpY3RzLCB0aGUgdmFsdWVzIGFyZSBtZXJnZWRcbiAgICAgKiBpbiBhIHR5cGUtc3BlY2lmaWMgd2F5IChUT0RPOiBkZXRhaWxzKS5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBpcyBub3QgYSBtZXJnZSBpbiB0aGUgc2Vuc2Ugb2YgYSBzdGF0ZS1iYXNlZCBDcmR0LlxuICAgICAqIEluc3RlYWQsIGl0IHRoZSBDcmR0IHZlcnNpb24gb2YgbWVyZ2luZyBvcmRpbmFyeSAobm9uLUNyZHQpXG4gICAgICogT2JqZWN0cywgYnkgcmVjdXJzaXZlbHkgY29tYmluaW5nIHRoZWlyIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIFRPRE86IGZvciBub3csIGFycmF5cyBhcmUgY29udmVydGVkIHRvIHNldHMuXG4gICAgICpcbiAgICAgKiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHNldFRvT2JqZWN0IGZvciBkaXNjbGFpbWVycyBhbmRcbiAgICAgKiBvdGhlcktleUNvbmZsaWN0UnVsZS5cbiAgICAgKlxuICAgICAqIFRPRE86IHJldHVybiBsaXN0IG9mIGNoYW5nZXM/XG4gICAgICogQHBhcmFtICBvdGhlciBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgbWVyZ2VPYmplY3Qob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlID0gSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLm1lcmdlT2JqZWN0SW50ZXJuYWwob3RoZXIsIG90aGVyS2V5Q29uZmxpY3RSdWxlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICBtZXJnZU9iamVjdEludGVybmFsKG90aGVyLCBvdGhlcktleUNvbmZsaWN0UnVsZSA9IEpzb25DcmR0LkVycm9yT25Db25mbGljdCkge1xuICAgICAgICBKc29uQ3JkdC5jaGVja0tleUNvbmZsaWN0UnVsZShvdGhlcktleUNvbmZsaWN0UnVsZSk7XG4gICAgICAgIC8vIEV4dHJhY3QgcHJvcGVydGllcyBhcyBhbiBhcnJheSBvZiBbbmFtZSwgdHlwZSwgdmFsdWVdXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gW107XG4gICAgICAgIGZvciAobGV0IHByb3BOYW1lIGluIG90aGVyKSB7XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gb3RoZXJbcHJvcE5hbWVdO1xuICAgICAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgICAgICBpZiAob3RoZXJLZXlDb25mbGljdFJ1bGUgPT09IEpzb25DcmR0LlByZWZpeFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gcHJvcE5hbWUuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgICAgIHR5cGUgPSBwcm9wTmFtZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBwcm9wTmFtZS5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gTXVsdGktdmFsdWVkIHN0cmluZ3MgYXJlIHRyZWF0ZWQgYXMgc2V0c1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiICYmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcInNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBTZXQgfHwgcHJvcFZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJzZXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCB0eXBlLCBvdGhlcltwcm9wTmFtZV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlIHByb3BlcnRpZXMgbWF5IGdyb3cgZHVyaW5nIGV4ZWN1dGlvbiBkdWUgdG9cbiAgICAgICAgLy8gdW5wYWNraW5nIGV4cGFuZGVkIGtleXMuXG4gICAgICAgIGxldCBvcmlnaW5hbExlbmd0aCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IHByb3BlcnRpZXNbaV1bMF07XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHByb3BlcnRpZXNbaV1bMV07XG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlID0gcHJvcGVydGllc1tpXVsyXTtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhbiBleHBhbmRlZCBrZXlcbiAgICAgICAgICAgIGlmIChvdGhlcktleUNvbmZsaWN0UnVsZSA9PT0gSnNvbkNyZHQuRXhwYW5kT25Db25mbGljdCAmJlxuICAgICAgICAgICAgICAgIGkgPCBvcmlnaW5hbExlbmd0aCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBwcm9wVmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWVbXCJqc29uQ3JkdEtleUV4cGFuZGVkXCJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgLy8gVW5wYWNrIHRoZSBvYmplY3Qgb250byB0aGUgZW5kIG9mIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBleHBhbmRlZE5hbWUgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBhbmRlZE5hbWUgIT09IFwianNvbkNyZHRLZXlFeHBhbmRlZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goW3Byb3BOYW1lLCBleHBhbmRlZE5hbWUsIHByb3BWYWx1ZVtleHBhbmRlZE5hbWVdXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBwcm9wZXJ0eSwgY2hlY2tpbmcgdGhhdCBpdCdzIHR5cGVcbiAgICAgICAgICAgICAgICAvLyBpcyBvbmUgd2UgZXhwZWN0LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3Q6IG1lcmdlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQocHJvcE5hbWUsIHt9KS5tZXJnZU9iamVjdEludGVybmFsKHByb3BWYWx1ZSwgb3RoZXJLZXlDb25mbGljdFJ1bGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmc6IG92ZXJ3cml0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUludGVybmFsKHByb3BOYW1lLCBwcm9wVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFwic2V0XCIgJiYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFNldCB8fCBwcm9wVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0OiBhZGQgYWxsIHZhbHVlcyBpbiBzZXRcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldENyZHQgPSB0aGlzLmluaXQocHJvcE5hbWUsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHByb3BWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENyZHQuYWRkKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBza2lwIHRoZSBlbnRyeSAobm90IGEgcmVjb2duaXplZCB0eXBlKS5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgdGhpcy5nZXRBc09iamVjdCgpLlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXNPYmplY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHRoaXMuc2V0QXNPYmplY3QobmV3VmFsdWUpLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnNldFRvT2JqZWN0KG5ld1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkpzb25DcmR0ID0gSnNvbkNyZHQ7XG4vLyBUT0RPOiBkZWxldGVcbi8vIFRPRE86IGRlbGV0ZVN0cm9uZyAob25jZSBtYXAgc3VwcG9ydHMgaXQuICBQZXJoYXBzIHRocm93XG4vLyBlcnJvciBvbiBtYXAgdmFsdWVzIG9ubHk/KVxuSnNvbkNyZHQuRXJyb3JPbkNvbmZsaWN0ID0gMTtcbkpzb25DcmR0LlByZWZpeFR5cGVzID0gMjtcbkpzb25DcmR0LkV4cGFuZE9uQ29uZmxpY3QgPSAzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVmYXVsdFJlc2V0dGFibGVDcmR0ID0gZXhwb3J0cy5PYnNlcnZlZFJlc2V0Q29tcG9uZW50ID0gZXhwb3J0cy5EZWZhdWx0UmVzZXRXaW5zQ3JkdCA9IGV4cG9ydHMuUmVzZXRXaW5zQ29tcG9uZW50ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuLy8gVE9ETzogaG93IHRvIGRvIGdhcmJhZ2UgY29sbGVjdGlvbiBvZiByZXNldC13aW5zIG9wZXJhdGlvbnM/XG4vLyBFLmcuIGZvciBmbGFncyBpbiBhIHNldDogZ2FyYmFnZSBjb2xsZWN0aW9uIHdpbGwgZmFpbCBpZlxuLy8gdGhlcmUgYXJlIHJlc2V0LXdpbnMgb3BzIGluIHRoZSBoaXN0b3J5LCBhcyBpdCBzaG91bGQsIGJ1dFxuLy8gd2Ugd291bGQgbGlrZSB0byBnYXJiYWdlIGNvbGxlY3QgYW55d2F5IG9uY2UgYWxsIHRoZSByZXNldC13aW5zXG4vLyBhcmUgY2F1c2FsbHkgc3RhYmxlLlxuY2xhc3MgUmVzZXRXaW5zQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbENyZHQsIHJlc2V0SW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbENyZHQgPSBvcmlnaW5hbENyZHQ7XG4gICAgICAgIHRoaXMucmVzZXRJbml0aWFsRGF0YSA9IHJlc2V0SW5pdGlhbERhdGE7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSkge1xuICAgICAgICBpZiAob3BlcmF0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBvcGVyYXRpb246IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShvcGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJyZXNldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBhbHdheXMgXCJyZXNldFwiLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBfc3RhdGUsIF9yZXBsaWNhSWQsIF90aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIG1lc3NhZ2U6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90ZSB3ZSBzaG91bGQgcmV0dXJuIGEgY2xvbmUgb2YgdGhlIHJlc2V0IHN0YXRlLCBub3RcbiAgICAgICAgLy8gYSBmaXhlZCBcInJlc2V0IHN0YXRlXCIsIHNpbmNlIHRoZSByZXR1cm5lZCBzdGF0ZSBtYXlcbiAgICAgICAgLy8gYmUgbXV0YXRlZCBsYXRlci5cbiAgICAgICAgcmV0dXJuIFt0aGlzLm9yaWdpbmFsQ3JkdC5jcmVhdGUodGhpcy5yZXNldEluaXRpYWxEYXRhKSwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvKG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwob3JpZ2luYWxDcmR0LCBuZXcgUmVzZXRXaW5zQ29tcG9uZW50KG9yaWdpbmFsQ3JkdCwgcmVzZXRJbml0aWFsRGF0YSksIChfbTIsIF9tMSkgPT4gbnVsbCwgMSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG59XG5leHBvcnRzLlJlc2V0V2luc0NvbXBvbmVudCA9IFJlc2V0V2luc0NvbXBvbmVudDtcbmNsYXNzIERlZmF1bHRSZXNldFdpbnNDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBvcmlnaW5hbENyZHRJbnRlcm5hbCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSByZXNldEluaXRpYWxEYXRhICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBpbml0aWFsRGF0YSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgbGV0IGNyZHRXcmFwcGVkID0gUmVzZXRXaW5zQ29tcG9uZW50LmFkZFRvKG9yaWdpbmFsQ3JkdEludGVybmFsLCByZXNldEluaXRpYWxEYXRhKTtcbiAgICAgICAgc3VwZXIoaWQsIGNyZHRXcmFwcGVkLCBydW50aW1lLCBpbml0aWFsRGF0YSk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWxSZXNldFdpbnMgPSBvcmlnaW5hbENyZHRJbnRlcm5hbDtcbiAgICB9XG4gICAgcmVzZXRTdHJvbmcoKSB7XG4gICAgICAgIHN1cGVyLmFwcGx5T3AoWzIsIFwicmVzZXRcIl0pO1xuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldFN0cm9uZ01lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiBbMiwgXCJyZXNldFwiXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbHkgb3BlcmF0aW9ucyBpbnRlbmRlZCBmb3IgdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCxcbiAgICAgKiBieSB0cmFuc2xhdGluZyB0aGVtIGZvciB0aGUgcmVzZXR0YWJsZSBDUkRUIGFuZCBjYWxsaW5nXG4gICAgICogc3VwZXIuYXBwbHlPcHMuXG4gICAgICovXG4gICAgYXBwbHlPcChvcGVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFwcGx5T3AoWzEsIG9wZXJhdGlvbl0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJjbGFzc2VzIHRoYXQgd2FudCB0byB0cmFuc2xhdGUgb3BlcmF0aW9ucyBmcm9tXG4gICAgICogdGhpcy5vcmlnaW5hbENyZHRJbnRlcm5hbCBzaG91bGQgb3ZlcnJpZGVcbiAgICAgKiB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIFRyYW5zbGF0ZXMgaW50ZXJuYWwgKHNlbWlkaXJlY3QgcHJvZHVjdC1iYXNlZCkgZGVzY3JpcHRpb25zXG4gICAgICogc28gdGhhdDpcbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhIHJlc2V0LXdpbnMgb3BlcmF0aW9uIGlzXG4gICAgICogW1wicmVzZXRTdHJvbmdcIl0sIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBpdCBjaGFuZ2VkIHRoZSBzdGF0ZS5cbiAgICAgKiAtIFRoZSBkZXNjcmlwdGlvbiBvZiBhbiBvcGVyYXRpb24gdGhhdCBnZXRzIGtpbGxlZCBieVxuICAgICAqIGEgY29uY3VycmVudCByZXNldC13aW5zIGlzIHNraXBwZWQuXG4gICAgICogLSBUaGUgZGVzY3JpcHRpb24gb2YgYW4gb3JpZ2luYWxDcmR0SW50ZXJuYWxcbiAgICAgKiBvcGVyYXRpb25zIGlzIHVuY2hhbmdlZCwgZXhjZXB0IGZvciBudWxsIGRlc2NyaXB0aW9ucyxcbiAgICAgKiB3aGljaCBhcmUgc2tpcHBlZC5cbiAgICAgKiBUaGVuIHJldHVybnMgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIHRoaXMgbGlzdCB0b1xuICAgICAqIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0V2lucywgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC13aW5zIGRlc2NyaXB0aW9uIGlzIFsyLCBcInJlc2V0XCJdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAyICYmIGRlc2NbMV0gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChbXCJyZXNldFN0cm9uZ1wiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvcmlnaW5hbENyZHRPcGVyYXRpb24gaXMgb2YgdGhlIGZvcm0gWzEsIGRlc2NdXG4gICAgICAgICAgICBlbHNlIGlmIChkZXNjWzBdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2NbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGRlc2MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNsYXRlZC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKHRyYW5zbGF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGluc3RlYWQgb2YgdHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqIFNlZSBDcmR0LnRyYW5zbGF0ZURlc2NyaXB0aW9ucy5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldFdpbnMoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXRXaW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmYXVsdFJlc2V0V2luc0NyZHQgPSBEZWZhdWx0UmVzZXRXaW5zQ3JkdDtcbi8vIFRPRE86IHJlbmFtZSBvcmlnaW5hbENyZHRJbnRlcm5hbCAoYWJvdmUpIGFuZCBvcmlnaW5hbENyZHRcbi8vIHRvIHJlZmxlY3QgcmVzZXQtd2lucyB2cyByZXNldCwgdG8gYXZvaWQgY29uZnVzaW9uLlxuY2xhc3MgT2JzZXJ2ZWRSZXNldENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxDcmR0ID0gb3JpZ2luYWxDcmR0O1xuICAgICAgICB0aGlzLnJlc2V0SW5pdGlhbERhdGEgPSByZXNldEluaXRpYWxEYXRhO1xuICAgIH1cbiAgICBjcmVhdGUoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxDcmR0LmNyZWF0ZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmV0dXJuZWQgZGVzY3JpcHRpb24gaXMgW1wicmVzZXRcIiwgbGlzdCBvZlxuICAgICAqIHRoZSBkZXNjcmlwdGlvbnMgcmV0dXJuZWQgYnkgb3JpZ2luYWxDcmR0IHdoZW4gcHJvY2Vzc2luZ1xuICAgICAqIHRoZSBtZXNzYWdlcyBhcHBlYXJpbmcgaW4gbWVzc2FnZSAoaS5lLiwgdGhlIG1lc3NhZ2VzIHRoYXRcbiAgICAgKiBhdm9pZGVkIGJlaW5nIHJlc2V0IGJlY2F1c2UgdGhleSB3ZXJlIGNvbmN1cnJlbnQgdG8gdGhlXG4gICAgICogcmVzZXQgb3BlcmF0aW9uKV0uXG4gICAgICovXG4gICAgZWZmZWN0KG1lc3NhZ2UsIF9zdGF0ZSwgcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCByZXNldFN0YXRlID0gdGhpcy5vcmlnaW5hbENyZHQuY3JlYXRlKHRoaXMucmVzZXRJbml0aWFsRGF0YSk7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgY29uY3VycmVudE1lc3NhZ2Ugb2YgbWVzc2FnZSkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMub3JpZ2luYWxDcmR0LmVmZmVjdChjb25jdXJyZW50TWVzc2FnZVswXSwgcmVzZXRTdGF0ZSwgcmVwbGljYUlkLCBjb25jdXJyZW50TWVzc2FnZVsxXSk7XG4gICAgICAgICAgICByZXNldFN0YXRlID0gcmVzdWx0WzBdO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25zLnB1c2gocmVzdWx0WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3Jlc2V0U3RhdGUsIFtcInJlc2V0XCIsIGRlc2NyaXB0aW9uc11dO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkVG8ob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0SW50ZXJuYWwobmV3IE9ic2VydmVkUmVzZXRDb21wb25lbnQob3JpZ2luYWxDcmR0LCByZXNldEluaXRpYWxEYXRhKSwgb3JpZ2luYWxDcmR0LCAobTIsIG0xKSA9PiB7IG0xLnB1c2gobTIpOyByZXR1cm4gbTE7IH0sIDIsIHRydWUsIHRydWUsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZlZFJlc2V0Q29tcG9uZW50ID0gT2JzZXJ2ZWRSZXNldENvbXBvbmVudDtcbmNsYXNzIERlZmF1bHRSZXNldHRhYmxlQ3JkdCBleHRlbmRzIERlZmF1bHRSZXNldFdpbnNDcmR0IHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIG9yaWdpbmFsQ3JkdEludGVybmFsICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJlc2V0SW5pdGlhbERhdGEgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHJ1bnRpbWUgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGluaXRpYWxEYXRhICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIGtlZXBPbmx5TWF4aW1hbD1mYWxzZSBTdG9yZSBvbmx5IGNhdXNhbGx5IG1heGltYWxcbiAgICAgKiBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSwgdG8gc2F2ZSBzcGFjZSAoYWx0aG91Z2ggcG9zc2libHlcbiAgICAgKiBhdCBzb21lIENQVSBjb3N0KS4gIFRoaXMgaXMgb25seSBhbGxvd2VkIGlmIHRoZSBzdGF0ZVxuICAgICAqIG9ubHkgZXZlciBkZXBlbmRzIG9uIHRoZSBjYXVzYWxseSBtYXhpbWFsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBvcmlnaW5hbENyZHRJbnRlcm5hbCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBjcmR0V3JhcHBlZCA9IE9ic2VydmVkUmVzZXRDb21wb25lbnQuYWRkVG8ob3JpZ2luYWxDcmR0SW50ZXJuYWwsIHJlc2V0SW5pdGlhbERhdGEsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgICAgIHN1cGVyKGlkLCBjcmR0V3JhcHBlZCwgcmVzZXRJbml0aWFsRGF0YSwgcnVudGltZSwgaW5pdGlhbERhdGEpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ3JkdEludGVybmFsID0gb3JpZ2luYWxDcmR0SW50ZXJuYWw7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIG9wIGlmIHdlJ3JlIGFscmVhZHkgcmVzZXQgKG9rYXkgZ2l2ZW5cbiAgICAgICAgLy8gb2JzZXJ2ZS1yZXNldCBzZW1hbnRpY3MpLlxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pc0hpc3RvcnlFbXB0eSgpKSB7XG4gICAgICAgICAgICBzdXBlci5hcHBseU9wKFsxLCBcInJlc2V0XCJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIE5vdGUgaGVyZSB3ZSBoYXZlIHRvIGFjY291bnQgZm9yIHRoZSByZXNldC13aW5zIGxheWVyXG4gICAgICAgIC8vIChpdCdzIG5vdCB3cmFwcGVkIGF1dG9tYXRpY2FsbHkgbGlrZSBpbiBzdXBlci5hcHBseU9wcykuXG4gICAgICAgIHJldHVybiBbMSwgWzEsIFtdXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGx5IG9wZXJhdGlvbnMgaW50ZW5kZWQgZm9yIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwsXG4gICAgICogYnkgdHJhbnNsYXRpbmcgdGhlbSBmb3IgdGhlIHJlc2V0dGFibGUgQ1JEVCBhbmQgY2FsbGluZ1xuICAgICAqIHN1cGVyLmFwcGx5T3BzLlxuICAgICAqL1xuICAgIGFwcGx5T3Aob3BlcmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hcHBseU9wKFsyLCBvcGVyYXRpb25dKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3ViY2xhc3NlcyB0aGF0IHdhbnQgdG8gdHJhbnNsYXRlIG9wZXJhdGlvbnMgZnJvbVxuICAgICAqIHRoaXMub3JpZ2luYWxDcmR0SW50ZXJuYWwgc2hvdWxkIG92ZXJyaWRlXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSBpbnN0ZWFkIG9mIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogVHJhbnNsYXRlcyBpbnRlcm5hbCAoc2VtaWRpcmVjdCBwcm9kdWN0LWJhc2VkKSBkZXNjcmlwdGlvbnNcbiAgICAgKiBzbyB0aGF0OlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9ic2VydmVkLXJlc2V0IG9wZXJhdGlvbiBpc1xuICAgICAqIFtcInJlc2V0XCIsIFtUT0RPOiByZS1hcHBsaWVkIG9wc11dLlxuICAgICAqIC0gVGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9yaWdpbmFsQ3JkdEludGVybmFsXG4gICAgICogaXMgdW5jaGFuZ2VkLCBleGNlcHQgZm9yIG51bGwgZGVzY3JpcHRpb25zLCB3aGljaFxuICAgICAqIGFyZSBza2lwcGVkLlxuICAgICAqIFRoZW4gcmV0dXJucyB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgdGhpcyBsaXN0IHRvXG4gICAgICogdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXR0YWJsZSwgb3IgbnVsbCBpZiBhbGxcbiAgICAgKiBkZXNjcmlwdGlvbnMgYXJlIG51bGwuXG4gICAgICovXG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zUmVzZXRXaW5zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBkZXNjIG9mIGRlc2NyaXB0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRlc2MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBSZXNldC1zdHJvbmcgKGFscmVhZHkgdHJhbnNsYXRlZCBieSBEZWZhdWx0UmVzZXRXaW5zQ3JkdClcbiAgICAgICAgICAgIC8vIGRlc2NyaXB0aW9uIGlzIFwicmVzZXRTdHJvbmdcIlxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZC5wdXNoKGRlc2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT2JzZXJ2ZWQgcmVzZXQgZGVzY3JpcHRpb24gaXMgWzEsIFtcInJlc2V0XCIsXG4gICAgICAgICAgICAvLyBsaXN0IG9mIHJlLWFwcGxpZWQgb3BzXV1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRlc2NbMF0gPT09IDEgJiYgZGVzY1sxXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW4gdGhlIHNlY29uZCBlbnRyeSwgcHV0IHRoZSB0cmFuc2xhdGVkXG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9ucyB0aGF0IGRpZG4ndCBnZXQgcmVzZXQuICBLZWVwIGluXG4gICAgICAgICAgICAgICAgLy8gbWluZCB0aGF0IHRoZXNlIHdpbGwgYmUgZGVzY3JpcHRpb25zIGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gaW5uZXJtb3N0IHNlbWlkaXJlY3QgcHJvZHVjdC4gIFdoYXQgdG8gZG9cbiAgICAgICAgICAgICAgICAvLyBhYm91dCBvcGVyYXRpb25zIHRoYXQgd2VyZSBvcmlnaW5hbGx5IGdyb3VwZWRcbiAgICAgICAgICAgICAgICAvLyBhdG9taWNhbGx5LCBzaW5jZSB0cmFuc2xhdGUgZXhwZWN0cyB0aG9zZVxuICAgICAgICAgICAgICAgIC8vIHRvIGJlIGRlbGl2ZXJlZCB0b2dldGhlcj9cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkLnB1c2goW1wicmVzZXRcIiwgZGVzY1sxXVsxXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3JpZ2luYWxDcmR0T3BlcmF0aW9uIGlzIG9mIHRoZSBmb3JtIFsyLCBkZXNjXVxuICAgICAgICAgICAgZWxzZSBpZiAoZGVzY1swXSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChkZXNjWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShkZXNjKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZWQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUodHJhbnNsYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaW5zdGVhZCBvZiB0cmFuc2xhdGVEZXNjcmlwdGlvbnMuXG4gICAgICogU2VlIENyZHQudHJhbnNsYXRlRGVzY3JpcHRpb25zLlxuICAgICAqL1xuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbnNbMF07XG4gICAgfVxuICAgIGdldCBvcmlnaW5hbFN0YXRlUmVzZXR0YWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZS5pbnRlcm5hbFN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmYXVsdFJlc2V0dGFibGVDcmR0ID0gRGVmYXVsdFJlc2V0dGFibGVDcmR0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzZXR0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlyZWN0SW50ZXJuYWwgPSBleHBvcnRzLlNlbWlkaXJlY3RJbnRlcm5hbCA9IGV4cG9ydHMuU2VtaWRpcmVjdFN0YXRlID0gdm9pZCAwO1xuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmNsYXNzIFNlbWlkaXJlY3RTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoaW50ZXJuYWxTdGF0ZSwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxTdGF0ZSA9IGludGVybmFsU3RhdGU7XG4gICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMgPSBoaXN0b3J5VGltZXN0YW1wcztcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIFNwZWNpZmljYWxseSwgYXJyYXkgZWxlbWVudHMgYXJlIHR1cGxlc1xuICAgICAgICAgKiBbcGVyLXNlbmRlciBtZXNzYWdlIGNvdW50ZXIsIHRoaXMgcmVwbGljYSdzIHJlY2VpcHQgY291bnRlcixcbiAgICAgICAgICogbWVzc2FnZV0uICBLZWVwIGluIG1pbmQgdGhhdCBwZXItc2VuZGVyIG1lc3NhZ2VcbiAgICAgICAgICogY291bnRlcnMgbWF5IG5vdCBiZSBjb250aWd1b3VzLCBzaW5jZSB0aGV5IGFyZSBzaGFyZWQgYmV0d2VlblxuICAgICAgICAgKiBhbGwgQ3JkdHMgd2l0aCBhIGdpdmVuIENyZHRSdW50aW1lIGFuZCBiZXR3ZWVuXG4gICAgICAgICAqIGEgc2VtaWRpcmVjdCBwcm9kdWN0IGFuZCBpdHMgY29tcG9uZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkLCBtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXNzYWdlTWF5YmVXaXRoVGltZXN0YW1wID0gdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA/XG4gICAgICAgICAgICBbbWVzc2FnZSwgdGltZXN0YW1wXSA6IG1lc3NhZ2U7XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChbdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKSwgdGhpcy5yZWNlaXB0Q291bnRlciwgbWVzc2FnZU1heWJlV2l0aFRpbWVzdGFtcF0pO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyKys7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aGUgZ2l2ZW5cbiAgICAgKiB0aW1lc3RhbXAsIGluIHNvbWUgY2F1c2FsIG9yZGVyIChzcGVjaWZpY2FsbHksIHRoaXMgcmVwbGljYSdzXG4gICAgICogcmVjZWlwdCBvcmRlcikuICBJZiB3ZSBhcmUgdGhlIHNlbmRlciAoaS5lLiwgcmVwbGljYUlkID09PVxuICAgICAqIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSksIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdGltZXN0YW1wIGlzXG4gICAgICogY2F1c2FsbHkgZ3JlYXRlciB0aGFuIGFsbCBwcmlvciBtZXNzYWdlcywgYXMgZGVzY3JpYmVkIGluXG4gICAgICogQ3JkdEludGVybmFsLmVmZmVjdCwgaGVuY2UgW10gaXMgcmV0dXJuZWQuXG4gICAgICovXG4gICAgZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCB0cnVlLCB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNwZWNpZmllZCBhY3Rpb25zIG9uIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeTpcbiAgICAgKiAtIGlmIHJldHVybkNvbmN1cnJlbnQgaXMgdHJ1ZSwgcmV0dXJucyB0aGUgbGlzdCBvZlxuICAgICAqIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRpbWVzdGFtcCwgaW5cbiAgICAgKiByZWNlaXB0IG9yZGVyLlxuICAgICAqIC0gaWYgZGlzY2FyZERvbWluYXRlZCBpcyB0cnVlLCBkZWxldGVzIGFsbCBtZXNzYWdlcyBmcm9tXG4gICAgICogdGhlIGhpc3Rvcnkgd2hvc2UgdGltZXN0YW1wcyBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5XG4gICAgICogb3IgZXF1YWwgdG8gdGhlIGdpdmVuIHRpbWVzdGFtcC4gIChOb3RlIHRoYXQgdGhpcyBtZWFucyB0aGF0XG4gICAgICogaWYgd2Ugd2FudCB0byBrZWVwIGEgbWVzc2FnZSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAgaW5cbiAgICAgKiB0aGUgaGlzdG9yeSwgaXQgbXVzdCBiZSBhZGRlZCB0byB0aGUgaGlzdG9yeSBhZnRlciBjYWxsaW5nXG4gICAgICogdGhpcyBtZXRob2QuKVxuICAgICAqL1xuICAgIHByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHJldHVybkNvbmN1cnJlbnQsIGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgaWYgKHJlcGxpY2FJZCA9PT0gdGltZXN0YW1wLmdldFNlbmRlcigpKSB7XG4gICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcncyBjb25jdXJyZW50LCBzbyBjbGVhciBldmVyeXRoaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5LmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2F0aGVyIHVwIHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzLiAgVGhlc2UgYXJlIGFsbFxuICAgICAgICAvLyBtZXNzYWdlcyBieSBlYWNoIHJlcGxpY2FJZCB3aXRoIHNlbmRlciBjb3VudGVyXG4gICAgICAgIC8vIGdyZWF0ZXIgdGhhbiB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpLmdldChyZXBsaWNhSWQpLlxuICAgICAgICBsZXQgY29uY3VycmVudCA9IFtdO1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB2Yy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldChlbnRyeVswXSk7XG4gICAgICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmN1cnJlbnRJbmRleFN0YXJ0ID0gU2VtaWRpcmVjdFN0YXRlLmluZGV4QWZ0ZXIoc2VuZGVySGlzdG9yeSwgZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb25jdXJyZW50SW5kZXhTdGFydDsgaSA8IHNlbmRlckhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmN1cnJlbnQucHVzaChzZW5kZXJIaXN0b3J5W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIG1lc3NhZ2VzIHdpdGggaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgLy8gPj0gY29uY3VycmVudEluZGV4U3RhcnRcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVySGlzdG9yeS5zcGxpY2UoMCwgY29uY3VycmVudEluZGV4U3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxldGUgaXQgZnJvbSB0aGUgbWFwIGlmIGVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBhIGZvcm0gb2YgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGFsc28gbWFrZXMgaXNIaXN0b3J5RW1wdHkgc2ltcGxlci5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNvcnQgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMgaW4gcmVjZWlwdCBvcmRlciAoaS5lLixcbiAgICAgICAgICAgIC8vIGJ5IHRoZSBzZWNvbmQgZW50cnkgaW4gZWFjaCB0cmlwbGUpLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYVsxXSAtIGJbMV0pKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQubWFwKGEgPT4gYVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCkge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3Igd29ya2luZyB3aXRoIHRoZSBwZXItc2VuZGVyIGhpc3RvcnlcbiAgICAgKiBhcnJheXMuICBSZXR1cm5zIHRoZSBpbmRleCBhZnRlciB0aGUgbGFzdCBlbnRyeSB3aG9zZVxuICAgICAqIHBlci1zZW5kZXIgY291bnRlciAodGhlIGZpcnN0IHR1cGxlIGVsZW1lbnQpIGlzIDw9XG4gICAgICogdmFsdWUuXG4gICAgICovXG4gICAgc3RhdGljIGluZGV4QWZ0ZXIoc3BhcnNlQXJyYXksIHZhbHVlKSB7XG4gICAgICAgIC8vIFRPRE86IGJpbmFyeSBzZWFyY2ggd2hlbiBzcGFyc2VBcnJheSBpcyBsYXJnZVxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlcmUgbWF5IGJlIGR1cGxpY2F0ZSB0aW1lc3RhbXBzLlxuICAgICAgICAvLyBTbyBpdCB3b3VsZCBiZSBpbmFwcHJvcHJpYXRlIHRvIGZpbmQgYW4gZW50cnkgd2hvc2VcbiAgICAgICAgLy8gcGVyLXNlbmRlciBjb3VudGVyIGVxdWFscyB2YWx1ZSBhbmQgaW5mZXIgdGhhdFxuICAgICAgICAvLyB0aGUgZGVzaXJlZCBpbmRleCBpcyAxIGdyZWF0ZXIuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhcnNlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzcGFyc2VBcnJheVtpXVswXSA+IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSBTZW1pZGlyZWN0U3RhdGU7XG5jbGFzcyBTZW1pZGlyZWN0SW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIENyZHRJbnRlcm5hbCBpbXBsZW1lbnRpbmcgdGhlIHNlbWlkaXJlY3QgcHJvZHVjdCBvZlxuICAgICAqIGNyZHQxIGFuZCBjcmR0MiB3aXRoIHRoZSBnaXZlbiBhY3Rpb24sIHdoaWNoIGlzIGEgZnVuY3Rpb25cbiAgICAgKiAobTI6IGNyZHQyIG1lc3NhZ2UsIG0xOiBjcmR0MSBtZXNzYWdlKTogY3JkdDEgbWVzc2FnZS5cbiAgICAgKiBjcmR0MSwgY3JkdDIsIGFuZCBhY3Rpb24gbXVzdCBzYXRpc2Z5IHRoZSBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICAgKiBhc3N1bXB0aW9ucyBmcm9tIG91ciBwYXBlci5cbiAgICAgKlxuICAgICAqIFRPRE86IG9wdGlvbnMgYW5kIHRoZWlyIHRoZW9yZXRpY2FsIHNpZ25pZmljYW5jZS4gIEZvcm1hbGx5LFxuICAgICAqIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSBtZWFucyB0aGF0IHRpbWVzdGFtcHMgYmVjb21lXG4gICAgICogcGFydCBvZiB0aGUgY3JkdDIgbWVzc2FnZXMuICBBbHNvIGNyZWF0ZUNyZHRJbmRleC5cbiAgICAgKiBEb21pbmF0ZWQgc3RhdHMgY29udHJvbCB3aGV0aGVyIHlvdSBkaXNjYXJkIG1lc3NhZ2VzIGluIHRoZVxuICAgICAqIGhpc3RvcnkgdGhhdCBhcmUgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGNyZHQxL2NyZHQyIG1lc3NhZ2VzO1xuICAgICAqIG5lZWQgdG8gZW5zdXJlIHRoYXQgYWN0aW9uIGlzIHRoZSBzYW1lIHdpdGggdGhvc2UgbWVzc2FnZXNcbiAgICAgKiBkaXNjYXJkZWQuICBJZiBkb21pbmF0ZWQxIGlzIHNldCwgdGhlbiBzdGF0ZS5pc0hpc3RvcnlFbXB0eSgpXG4gICAgICogYmVjb21lcyAodGhlcmUgZXhpc3RzIGEgY3JkdDIgbWVzc2FnZSBub3QgY2F1c2FsbHkgZG9taW5hdGVkIGJ5IGFcbiAgICAgKiBjcmR0MSBtZXNzYWdlKS4gIENoZWNrIHRoaXMgaXMgc3RpbGwgdHJ1ZSBpZiBkb21pbmF0ZWQyIGlzIHNldC4pXG4gICAgICogRXhwbGFpbiBleGFtcGxlcyB3aGVyZSB0aGlzIGlzIHVzZWQgKHJlc2V0dGFibGUsIGZsYWdzKTsgaXQnc1xuICAgICAqIG5vdCBxdWl0ZSBpbiB0aGUgc2VtaWRpcmVjdCBwcm9kdWN0IHNwaXJpdCB1bmxlc3MgeW91IHRoaW5rXG4gICAgICogb2YgaXQgYXMgdXNpbmcgdGhlIGhpc3RvcnkgYXMgcGFydCBvZiB0aGUgY3JkdDEvMiBzdGF0ZS5cbiAgICAgKiBQb3RlbnRpYWwgb3B0aW1pemF0aW9uOiBvbmx5IGRlbGV0ZSBkb21pbmF0ZWQgbWVzc2FnZXMgd2hlblxuICAgICAqIHJlY2VpdmluZyBvdXIgb3duIG1lc3NhZ2UgKGl0J3MgYmFzaWNhbGx5IGZyZWUgYW5kIGFsd2F5c1xuICAgICAqIGNsZWFycyB0aGUgaGlzdG9yeSksIG9yIG9ubHkgc29tZXRpbWVzICh3aWxsIG1pc3Mgc29tZVxuICAgICAqIG1lc3NhZ2VzLCBzbyBuZWVkIHRvIGVuc3VyZSBjb3JyZWN0bmVzcyBpbiB0aGF0IGNhc2VcbiAgICAgKiAoSSB0aGluayBpdCBpcyBva2F5IGZvciBkb21pbmF0ZWQyIGJ1dCBub3QgZG9taW5hdGVkMSBpbiBvdXJcbiAgICAgKiB0YXJnZXQgdXNlIGNhc2VzKSwgYnV0XG4gICAgICogc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50IGR1ZSB0byBiYXRjaGluZyBhbmQgc3RpbGwga2lsbFxuICAgICAqIG9mZiBtb3N0IG1lc3NhZ2VzKS4gIFRoaXMgdHJhZGVzIGEgc21hbGwgaW5jcmVhc2UgaW4gc3BhY2VcbiAgICAgKiB1c2FnZSBmb3IgYSBkZWNyZWFzZSBpbiBDUFUgdGltZS5cbiAgICAgKlxuICAgICAqIEFzIGRlc2NyaWJlZCBpbiBDcmR0SW50ZXJuYWwgYW5kIENyZHQsIG51bGwgbWVzc2FnZXMgYXJlIHRyZWF0ZWRcbiAgICAgKiBhcyB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gaWQsIGFsbG93aW5nIHRoZW0gdG8gYmUgb3B0aW1pemVkIGF3YXkuXG4gICAgICogQmVjYXVzZSBvZiB0aGlzLCBhY3Rpb24gd2lsbCBuZXZlciBiZSBjYWxsZWQgd2l0aCBudWxsIGFzXG4gICAgICogZWl0aGVyIGlucHV0LiAgSW5zdGVhZCwgd2UgYmVoYXZlIGFzIGlmXG4gICAgICogKGFjdGlvbihpZCAoaS5lLiwgbnVsbCksIG0xKSA9IG0xKVxuICAgICAqIGZvciBhbGwgbTEgYW5kIChhY3Rpb24obTIsIGlkKSA9IGlkKSBmb3IgYWxsIG0yLiAgVGhlIHNlbWlkaXJlY3RcbiAgICAgKiBwcm9kdWN0IGFzc3VtcHRpb25zIG11c3QgaG9sZCBnaXZlbiB0aGVzZSBhc3NpZ25tZW50cy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjcmR0MSwgY3JkdDIsIGFjdGlvbiwgY3JlYXRlQ3JkdEluZGV4LCBoaXN0b3J5VGltZXN0YW1wcyA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZUNyZHRJbmRleCA9IGNyZWF0ZUNyZHRJbmRleDtcbiAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA9IGhpc3RvcnlUaW1lc3RhbXBzO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBsZXQgaW50ZXJuYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlQ3JkdEluZGV4ID09PSAxKVxuICAgICAgICAgICAgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDEuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaW50ZXJuYWxTdGF0ZSA9IHRoaXMuY3JkdDIuY3JlYXRlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTZW1pZGlyZWN0U3RhdGUoaW50ZXJuYWxTdGF0ZSwgdGhpcy5oaXN0b3J5VGltZXN0YW1wcywgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uL21lc3NhZ2UgZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogb3BlcmF0aW9uL21lc3NhZ2UgZm9yIHRoYXQgY3JkdF0uICBBbiBleGNlcHRpb24gaXMgaWZcbiAgICAgKiB0aGUgaW50ZXJuYWwgY3JkdCByZXR1cm5zIGEgbnVsbCBtZXNzYWdlLCBpbiB3aGljaCBjYXNlXG4gICAgICogd2UganVzdCByZXR1cm4gbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uICBUaGlzXG4gICAgICogYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgc2VuZGluZyB0aGVcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogVE9ETyAoZ2VuZXJhbCk6IGVycm9yIGNoZWNraW5nXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvblswXSA9PT0gMSkge1xuICAgICAgICAgICAgbGV0IG9wMSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCk7XG4gICAgICAgICAgICBpZiAob3AxID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbMSwgb3AxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcDIgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZS5pbnRlcm5hbFN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgaWYgKG9wMiA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG9wMl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVzc2FnZS9kZXNjcnB0aW9uIGZvcm1hdDogW2NyZHQgbnVtYmVyICgxIG9yIDIpLFxuICAgICAqIG1lc3NhZ2UgZm9yL2Rlc2NyaXB0aW9uIGZyb20gdGhhdCBjcmR0XS4gIEZvciB0aGlzLmNyZHQxXG4gICAgICogbWVzc2FnZXMsIHRoZSBkZXNjcmlwdGlvbiBpcyBmb3IgdGhlIGFjdGVkLW9uIG1lc3NhZ2UgdGhhdFxuICAgICAqIGlzIGFjdHVhbGx5IGFwcGxpZWQgdG8gdGhpcy5pbnRlcm5hbFN0YXRlLCBub3QgdGhlIGlucHV0XG4gICAgICogbWVzc2FnZS4gIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwgKG9yIGlmIHRoZSBtZXNzYWdlIGdldHMgYWN0ZWQgb24gdG8gYmVjb21lIG51bGwpLFxuICAgICAqIHRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyBqdXN0IG51bGwsIG5vdCBbMSwgbnVsbF0gb3IgWzIsIG51bGxdLlxuICAgICAqIFRoaXMgYWxsb3dzIHRoZSBDcmR0IGNsYXNzIHRvIG9wdGltaXplIGF3YXkgY2FsbGluZyBvbmNoYW5nZS5cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChtZXNzYWdlWzBdID09PSAyKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUuaW50ZXJuYWxTdGF0ZSwgcmVwbGljYUlkLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgIHN0YXRlLmFkZChyZXBsaWNhSWQsIG1lc3NhZ2VbMV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFsyLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjb25jdXJyZW50ID0gc3RhdGUuZ2V0Q29uY3VycmVudChyZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICBsZXQgbUFjdCA9IG1lc3NhZ2VbMV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBtQWN0ID0gdGhpcy5hY3Rpb24oY29uY3VycmVudFtpXSwgbUFjdCk7XG4gICAgICAgICAgICAgICAgaWYgKG1BY3QgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1BY3QsIHN0YXRlLmludGVybmFsU3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgIHN0YXRlLmludGVybmFsU3RhdGUgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIG51bGxdO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFsxLCByZXN1bHRbMV1dXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtaWRpcmVjdEludGVybmFsID0gU2VtaWRpcmVjdEludGVybmFsO1xuY2xhc3MgRGlyZWN0SW50ZXJuYWwge1xuICAgIC8qKlxuICAgICAqIERpcmVjdCBwcm9kdWN0IG9mIENyZHRJbnRlcm5hbCdzLiAgVGhpcyBpcyB0aGVcbiAgICAgKiBzcGVjaWFsIGNhc2Ugb2YgU2VtaWRpcmVjdEludGVybmFsIHdoZW4gdGhlIGFjdGlvbiBpcyB0cml2aWFsXG4gICAgICogKChtXzIsIG0xKSA9PiBtMSkuICBJbiB0aGlzIGNhc2Ugd2UgY2FuIG9wdGltaXplXG4gICAgICogYnkgbm90IGtlZXBpbmcgdGhlIGhpc3Rvcnkgb3IgYWN0aW5nIG9uIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogRm9yIHRoaXMgdG8gYmUgYSBDcmR0LCBjb25jdXJyZW50IG1lc3NhZ2VzIG9mIHRoZSB0d28gaW5wdXRcbiAgICAgKiBDcmR0cyBtdXN0IGNvbW11dGUuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoaXMgY29uc3RydWN0aW9uIGlzIHN5bW1ldHJpYyAoc3dpdGNoaW5nIGNyZHQxIGFuZFxuICAgICAqIGNyZHQyIGRvZXNuJ3QgY2hhbmdlIHRoZSBzZW1hbnRpY3MpLCBleGNlcHQgZm9yIHN3YXBwaW5nXG4gICAgICogdGhlIG1lYW5pbmcgb2YgdGhlIG51bWJlcnMgMS8yIGluIGNyZWF0ZUNyZHRJbmRleCBhbmRcbiAgICAgKiBpbiB0aGUgZmlyc3QgY29vcmRpbmF0ZXMgb2YgbWVzc2FnZXMgYW5kIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JlYXRlQ3JkdEluZGV4IFdoaWNoIGNyZHQncyBjcmVhdGUgbWV0aG9kIHRvIHVzZVxuICAgICAqIGluIGNyZWF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjcmR0MSwgY3JkdDIsIGNyZWF0ZUNyZHRJbmRleCkge1xuICAgICAgICB0aGlzLmNyZHQxID0gY3JkdDE7XG4gICAgICAgIHRoaXMuY3JkdDIgPSBjcmR0MjtcbiAgICAgICAgdGhpcy5jcmVhdGVDcmR0SW5kZXggPSBjcmVhdGVDcmR0SW5kZXg7XG4gICAgICAgIGlmIChjcmVhdGVDcmR0SW5kZXggIT09IDEgJiYgY3JlYXRlQ3JkdEluZGV4ICE9PSAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgY3JlYXRlQ3JkdEluZGV4IChtdXN0IGJlIDEgb3IgMik6XCIgK1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNyZHRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtICBpbml0aWFsRGF0YSBJbml0aWFsIGRhdGEgdXNlZCB0byBpbml0aWFsaXplIHRoaXMuY3JkdDEuXG4gICAgICogQHJldHVyblxuICAgICAqL1xuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVDcmR0SW5kZXggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmR0MS5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmR0Mi5jcmVhdGUoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb24vbWVzc2FnZSBmb3JtYXQ6IFtjcmR0IG51bWJlciAoMSBvciAyKSxcbiAgICAgKiBvcGVyYXRpb24vbWVzc2FnZSBmb3IgdGhhdCBjcmR0XS4gIEFuIGV4Y2VwdGlvbiBpcyBpZlxuICAgICAqIHRoZSBpbnRlcm5hbCBjcmR0IHJldHVybnMgYSBudWxsIG1lc3NhZ2UsIGluIHdoaWNoIGNhc2VcbiAgICAgKiB3ZSBqdXN0IHJldHVybiBudWxsLCBub3QgWzEsIG51bGxdIG9yIFsyLCBudWxsXS4gIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBzZW5kaW5nIHRoZVxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgcHJlcGFyZShvcGVyYXRpb24sIHN0YXRlLCByZXBsaWNhSWQpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uWzBdKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuY3JkdDEucHJlcGFyZShvcGVyYXRpb25bMV0sIHN0YXRlLCByZXBsaWNhSWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmNyZHQyLnByZXBhcmUob3BlcmF0aW9uWzFdLCBzdGF0ZSwgcmVwbGljYUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG9wZXJhdGlvbjogXCIgKyBvcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtvcGVyYXRpb25bMF0sIG1lc3NhZ2VdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlL2Rlc2NycHRpb24gZm9ybWF0OiBbY3JkdCBudW1iZXIgKDEgb3IgMiksXG4gICAgICogbWVzc2FnZSBmb3IvZGVzY3JpcHRpb24gZnJvbSB0aGF0IGNyZHRdLlxuICAgICAqIEFuIGV4Y2VwdGlvbiBpcyBpZiB0aGUgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW50ZXJuYWxcbiAgICAgKiBjcmR0IGlzIG51bGwsXG4gICAgICogdGhlIHJldHVybmVkIGRlc2NyaXB0aW9uIGlzIGp1c3QgbnVsbCwgbm90IFsxLCBudWxsXSBvciBbMiwgbnVsbF0uXG4gICAgICogVGhpcyBhbGxvd3MgdGhlIENyZHQgY2xhc3MgdG8gb3B0aW1pemUgYXdheSBjYWxsaW5nIG9uY2hhbmdlLlxuICAgICAqIFRPRE86IHBlcmhhcHMgYWRkIHRyYW5zbGF0aW5nIGRlc2NyaXB0aW9ucyB0byB0aGlzIGNsYXNzLCBzb1xuICAgICAqIHRoZSBDcmR0IGRvZXNuJ3QgaGF2ZSB0byB1bmRlcnN0YW5kIGFsbCBvZiB0aGUgbGF5ZXJzIGF0XG4gICAgICogb25jZT9cbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVswXSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY3JkdDEuZWZmZWN0KG1lc3NhZ2VbMV0sIHN0YXRlLCByZXBsaWNhSWQsIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmR0Mi5lZmZlY3QobWVzc2FnZVsxXSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIGNyZHQgbnVtYmVyIGluIG1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdFsxXSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0WzBdLCBudWxsXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtyZXN1bHRbMF0sIFttZXNzYWdlWzBdLCByZXN1bHRbMV1dXTtcbiAgICB9XG59XG5leHBvcnRzLkRpcmVjdEludGVybmFsID0gRGlyZWN0SW50ZXJuYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZW1pZGlyZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NYXBDcmR0ID0gZXhwb3J0cy5BZGRXaW5zU2V0ID0gZXhwb3J0cy5DcmR0T2JqZWN0ID0gZXhwb3J0cy5HTWFwSW50ZXJuYWwgPSBleHBvcnRzLkRpc2FibGVXaW5zRmxhZyA9IGV4cG9ydHMuRW5hYmxlV2luc0ZsYWcgPSBleHBvcnRzLk5vT3BDcmR0SW50ZXJuYWwgPSBleHBvcnRzLk9ydGhvZ29uYWxDcmR0ID0gZXhwb3J0cy5JbnRSZWdpc3RlckNyZHQgPSBleHBvcnRzLlVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHJlc2V0dGFibGVfMSA9IHJlcXVpcmUoXCIuL3Jlc2V0dGFibGVcIik7XG5jb25zdCBiYXNpY19jcmR0c18xID0gcmVxdWlyZShcIi4vYmFzaWNfY3JkdHNcIik7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbmNvbnN0IHNlbWlkaXJlY3RfMSA9IHJlcXVpcmUoXCIuL3NlbWlkaXJlY3RcIik7XG5jbGFzcyBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbERhdGEpIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJ1bnRpbWUsIGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgxKTtcbiAgICB9XG4gICAgZGVjcmVtZW50KCkge1xuICAgICAgICB0aGlzLmFkZCgtMSk7XG4gICAgfVxuICAgIGFkZChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMSwgbl0pO1xuICAgIH1cbiAgICBtdWx0KG4pIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsyLCBuXSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZTtcbiAgICB9XG4gICAgdHJhbnNsYXRlRGVzY3JpcHRpb25zKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW1wibXVsdFwiLCBkZXNjcmlwdGlvblsxXV07XG4gICAgfVxufVxuZXhwb3J0cy5VbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQgPSBVbnJlc2V0dGFibGVJbnRSZWdpc3RlckNyZHQ7XG4vLyBzZW1pZGlyZWN0SW5zdGFuY2UgY29tcGxldGVseSBkZXNjcmliZXMgdGhpcyBzZW1pZGlyZWN0IHByb2R1Y3RcblVucmVzZXR0YWJsZUludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UgPSBuZXcgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RJbnRlcm5hbChiYXNpY19jcmR0c18xLkNvdW50ZXJJbnRlcm5hbC5pbnN0YW5jZSwgYmFzaWNfY3JkdHNfMS5NdWx0UmVnaXN0ZXJJbnRlcm5hbC5pbnN0YW5jZSwgKG0yLCBtMSkgPT4gbTIgKiBtMSwgMSk7XG5jbGFzcyBJbnRSZWdpc3RlckNyZHQgZXh0ZW5kcyByZXNldHRhYmxlXzEuRGVmYXVsdFJlc2V0dGFibGVDcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihpZCwgcnVudGltZSwgaW5pdGlhbFZhbHVlID0gMCwgcmVzZXRWYWx1ZSA9IDApIHtcbiAgICAgICAgc3VwZXIoaWQsIEludFJlZ2lzdGVyQ3JkdC5zZW1pZGlyZWN0SW5zdGFuY2UsIHJlc2V0VmFsdWUsIHJ1bnRpbWUsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoMSk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5hZGQoLTEpO1xuICAgIH1cbiAgICBhZGQobikge1xuICAgICAgICB0aGlzLmFwcGx5T3AoWzEsIG5dKTtcbiAgICB9XG4gICAgbXVsdChuKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgbl0pO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgcmVzZXQtdGhlbi1hZGQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuYWRkKG5ld1ZhbHVlKTtcbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy8gVHJhbnNhY3Rpb24gZHVlIHRvIHNldCB2YWx1ZSwgcmV0dXJuIHRoZSByZXN1bHRpbmcgc3RhdGVcbiAgICAgICAgICAgIHJldHVybiBbXCJzZXRcIiwgZGVzY3JpcHRpb25zWzFdWzFdXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbnNbMF07XG4gICAgICAgIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBbXCJhZGRcIiwgZGVzY3JpcHRpb25bMV1dO1xuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvblswXSA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtkZXNjcmlwdGlvblswXSwgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cbmV4cG9ydHMuSW50UmVnaXN0ZXJDcmR0ID0gSW50UmVnaXN0ZXJDcmR0O1xuSW50UmVnaXN0ZXJDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdEludGVybmFsKGJhc2ljX2NyZHRzXzEuQ291bnRlckludGVybmFsLmluc3RhbmNlLCBiYXNpY19jcmR0c18xLk11bHRSZWdpc3RlckludGVybmFsLmluc3RhbmNlLCAobTIsIG0xKSA9PiBtMiAqIG0xLCAxKTtcbmZ1bmN0aW9uIHBvc2l0aXZlTW9kKGEsIGIpIHtcbiAgICBpZiAoYSA+PSAwKVxuICAgICAgICByZXR1cm4gYSAlIGI7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gYiAtICgoLWEpICUgYik7XG59XG5jbGFzcyBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbCB7XG4gICAgY3JlYXRlKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIFswLCBmYWxzZV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBpbml0aWFsRGF0YTtcbiAgICB9XG4gICAgcHJlcGFyZShvcGVyYXRpb24sIF9zdGF0ZSwgX3JlcGxpY2FJZCkge1xuICAgICAgICByZXR1cm4gcG9zaXRpdmVNb2Qob3BlcmF0aW9uLCAyICogTWF0aC5QSSk7XG4gICAgfVxuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gW1twb3NpdGl2ZU1vZChzdGF0ZVswXSArIG1lc3NhZ2UsIDIgKiBNYXRoLlBJKSwgc3RhdGVbMV1dLCBtZXNzYWdlXTtcbiAgICB9XG59XG5PcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbC5pbnN0YW5jZSA9IG5ldyBPcnRob2dvbmFsUm90YXRpb25JbnRlcm5hbCgpO1xuY2xhc3MgT3J0aG9nb25hbFJlZmxlY3Rpb25JbnRlcm5hbCB7XG4gICAgY3JlYXRlKF9pbml0aWFsRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIHByZXBhcmUob3BlcmF0aW9uLCBfc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiAhPT0gXCJyZWZsZWN0XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIG9wZXJhdGlvbik7XG4gICAgICAgIHJldHVybiBcInJlZmxlY3RcIjtcbiAgICB9XG4gICAgZWZmZWN0KG1lc3NhZ2UsIHN0YXRlLCBfcmVwbGljYUlkLCBfdGltZXN0YW1wKSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSBcInJlZmxlY3RcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAvLyBSZWZsZWN0aW9uIG9wZXJhdGlvbiBpcyBtdWx0aXBseWluZyBvbiB0aGUgbGVmdCxcbiAgICAgICAgLy8gc28gdG8gcHV0IGl0IGluIGNhbm9uaWNhbCBmb3JtIChnMSwgZzIpLCB3ZSBoYXZlIHRvXG4gICAgICAgIC8vIGNvbW11dGUgaXQgd2l0aCB0aGUgY3VycmVudCBnMSAocm90YXRpb24pIHZhbHVlIGJ5XG4gICAgICAgIC8vIGFjdGluZyBvbiBpdC5cbiAgICAgICAgcmV0dXJuIFtbcG9zaXRpdmVNb2QoLXN0YXRlWzBdLCAyICogTWF0aC5QSSksICFzdGF0ZVsxXV0sIFwicmVmbGVjdFwiXTtcbiAgICB9XG59XG5PcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsLmluc3RhbmNlID0gbmV3IE9ydGhvZ29uYWxSZWZsZWN0aW9uSW50ZXJuYWwoKTtcbi8qKlxuICogQ3JkdCBmb3IgdGhlIDItZGltZW5zaW9uYWwgb3J0aG9nb25hbCBncm91cCwgd2hpY2ggYWxsb3dzXG4gKiByb3RhdGlvbnMgYW5kIHJlZmxlY3Rpb25zIChhYm91dCB0aGUgb3JpZ2luKSBvZiBhbiBvYmplY3QgaW4gdGhlXG4gKiBwbGFuZS4gIEV4YW1wbGUgdXNhZ2U6IHJvdGF0aW5nIGFuZCByZWZsZWN0aW5nIG9iamVjdHMgaW5cbiAqIFBvd2VycG9pbnQuXG4gKlxuICogU3RhdGUgaXMgc3RvcmVkIGFzIHRoZSBjYW5vbmljYWwgZWxlbWVudCBvZiB0aGUgc2VtaWRpcmVjdFxuICogcHJvZHVjdCBncm91cCwgaS5lLiwgaW4gdGhlIGZvcm0gKGcxLCBnMikgZm9yIGcxIGluIHRoZSByb3RhdGlvblxuICogZ3JvdXAgKHJlYWxzIG1vZCAycGkpIGFuZCBnMiBpbiB0aGUgcmVmbGVjdGlvbiBncm91cCAoYm9vbGVhbnNcbiAqIHdpdGggdHJ1ZSBmb3IgMSBhbmQgZmFsc2UgZm9yIDApLlxuICovXG5jbGFzcyBPcnRob2dvbmFsQ3JkdCBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBpbml0aWFsVmFsdWUgPSBbMCwgZmFsc2VdLCByZXNldFZhbHVlID0gWzAsIGZhbHNlXSkge1xuICAgICAgICBzdXBlcihpZCwgT3J0aG9nb25hbENyZHQuc2VtaWRpcmVjdEluc3RhbmNlLCByZXNldFZhbHVlLCBydW50aW1lLCBpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbmdsZSBpcyBpbiByYWRpYW5zIENDVy5cbiAgICAgKi9cbiAgICByb3RhdGUoYW5nbGUpIHtcbiAgICAgICAgdGhpcy5hcHBseU9wKFsxLCBhbmdsZV0pO1xuICAgIH1cbiAgICByZWZsZWN0SG9yaXpvbnRhbEF4aXMoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChbMiwgXCJyZWZsZWN0XCJdKTtcbiAgICB9XG4gICAgcmVmbGVjdFZlcnRpY2FsQXhpcygpIHtcbiAgICAgICAgdGhpcy5yZWZsZWN0KE1hdGguUEkgLyAyKTtcbiAgICB9XG4gICAgcmVmbGVjdChhbmdsZUF4aXMpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucm90YXRlKC1hbmdsZUF4aXMpO1xuICAgICAgICB0aGlzLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgICAgICB0aGlzLnJvdGF0ZShhbmdsZUF4aXMpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIGlzIGdpdmVuIGJ5OiByZWZsZWN0IGFjcm9zcyB0aGUgeC1heGlzXG4gICAgICogaWYgcmVmbGVjdGVkIGlzIHRydWUsIHRoZW4gcm90YXRlIGJ5IGFuZ2xlIChDQ1csIGluIHJhZGlhbnMpLlxuICAgICAqL1xuICAgIGdldCByZWZsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsU3RhdGVSZXNldHRhYmxlLmludGVybmFsU3RhdGVbMV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHN0YXRlIGlzIGdpdmVuIGJ5OiByZWZsZWN0IGFjcm9zcyB0aGUgeC1heGlzXG4gICAgICogaWYgcmVmbGVjdGVkIGlzIHRydWUsIHRoZW4gcm90YXRlIGJ5IGFuZ2xlIChDQ1csIGluIHJhZGlhbnMpLlxuICAgICAqL1xuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTdGF0ZVJlc2V0dGFibGUuaW50ZXJuYWxTdGF0ZVswXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogW3JlZmxlY3RlZCwgYW5nbGVdXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuYW5nbGUsIHRoaXMucmVmbGVjdGVkXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCByZXNldC10aGVuLXNldC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5yb3RhdGUobmV3VmFsdWVbMF0pO1xuICAgICAgICBpZiAobmV3VmFsdWVbMV0pXG4gICAgICAgICAgICB0aGlzLnJlZmxlY3RIb3Jpem9udGFsQXhpcygpO1xuICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgfVxuICAgIC8vIFRPRE86IG1hdHJpeCB2ZXJzaW9ucyBvZiBnZXQgYW5kIHNldC5cbiAgICAvLyAvKipcbiAgICAvLyAgKiBAcmV0dXJuIFRoZSBjdXJyZW50IHRyYW5zZm9ybWF0aW9uIGFzIGEgMngyIG9ydGhvZ29uYWxcbiAgICAvLyAgKiBtYXRyaXguXG4gICAgLy8gICovXG4gICAgLy8gZ2V0IG1hdHJpeCgpOiBbW251bWJlciwgbnVtYmVyXSwgW251bWJlciwgbnVtYmVyXV0ge1xuICAgIC8vXG4gICAgLy8gfVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoX2Rlc2NyaXB0aW9ucykge1xuICAgICAgICAvLyBUT0RPLiAgSnVzdCByZXR1cm5zIHRoZSByZXN1bHRpbmcgc3RhdGUgZm9yIG5vdy5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIC8vICAgICAvLyBUcmFuc2FjdGlvbiBkdWUgdG8gc2V0IHZhbHVlLCByZXR1cm4gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICAgICAgICAvLyAgICAgcmV0dXJuIFtcInNldFwiLCBkZXNjcmlwdGlvbnNbMV1bMV1dO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uc1swXTtcbiAgICAgICAgLy8gaWYgKGRlc2NyaXB0aW9uWzBdID09PSAxKSByZXR1cm4gW1wiYWRkXCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgLy8gZWxzZSBpZiAoZGVzY3JpcHRpb25bMF0gPT09IDEpIHJldHVybiBbXCJtdWx0XCIsIGRlc2NyaXB0aW9uWzFdXTtcbiAgICAgICAgLy8gZWxzZSByZXR1cm4gW2Rlc2NyaXB0aW9uWzBdIGFzIHN0cmluZywgdGhpcy52YWx1ZV07IC8vIHJlc2V0c1xuICAgIH1cbn1cbmV4cG9ydHMuT3J0aG9nb25hbENyZHQgPSBPcnRob2dvbmFsQ3JkdDtcbk9ydGhvZ29uYWxDcmR0LnNlbWlkaXJlY3RJbnN0YW5jZSA9IG5ldyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdEludGVybmFsKE9ydGhvZ29uYWxSb3RhdGlvbkludGVybmFsLmluc3RhbmNlLCBPcnRob2dvbmFsUmVmbGVjdGlvbkludGVybmFsLmluc3RhbmNlLCAoX20yLCBtMSkgPT4gLW0xLCAxKTtcbi8qKlxuICogQ3JkdEludGVybmFsIHdoaWNoIHVzZXMgYW55IHN0cmluZyBhcyBhbiBvcGVyYXRpb24vbWVzc2FnZVxuICogd2hpY2ggZG9lcyBub3RoaW5nLiAgVW5saWtlIHVzaW5nIG51bGwgbWVzc2FnZXMgdG8gaW5kaWNhdGUgdGhhdFxuICogbm90aGluZyBoYXBwZW5lZCwgdGhlIG5vb3AgbWVzc2FnZSBpcyBhbiBleHBsaWNpdCBub24tbnVsbFxuICogc3RyaW5nIHN1cHBsaWVkIGFzIHRoZSBvcGVyYXRpb24uXG4gKlxuICogVHdvIHVzZSBjYXNlczpcbiAqIC0gVG8gdW5yZXNldCBhIHN0YXRlIChlLmcuIGluIEVuYWJsZVdpbnNGbGFnIGJlbG93KS5cbiAqIC0gQXMgYSBcImhlYWRlclwiIGZvciBzZXF1ZW5jZSBvZiBvcGVyYXRpb25zIHBhc3NlZCB0byBhcHBseU9wcyxcbiAqIHNvIHRoYXQgcmVjaXBpZW50cyBjYW4ga25vdyB3aGF0IGVuZC11c2VyIG9wZXJhdGlvbiB0aGUgc2VxdWVuY2VcbiAqIGNvcnJlc3BvbmRzIHRvLlxuICovXG5jbGFzcyBOb09wQ3JkdEludGVybmFsIHtcbiAgICBjb25zdHJ1Y3RvcihjcmVhdGVGdW5jKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRnVuYyA9IGNyZWF0ZUZ1bmM7XG4gICAgfVxuICAgIGNyZWF0ZShpbml0aWFsRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5jcmVhdGVGdW5jKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRnVuYyhpbml0aWFsRGF0YSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNyZWF0ZUZ1bmMgbm90IHN1cHBsaWVkXCIpO1xuICAgIH1cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgX3N0YXRlKSB7XG4gICAgICAgIHJldHVybiBvcGVyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZXR1cm5lZCBkZXNjcmlwdGlvbiBpcyB0aGUgb3JpZ2luYWwgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIGVmZmVjdChtZXNzYWdlLCBzdGF0ZSwgX3JlcGxpY2FJZCwgX3RpbWVzdGFtcCkge1xuICAgICAgICByZXR1cm4gW3N0YXRlLCBtZXNzYWdlXTtcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvKG9yaWdpbmFsQ3JkdCkge1xuICAgICAgICByZXR1cm4gbmV3IHNlbWlkaXJlY3RfMS5EaXJlY3RJbnRlcm5hbChvcmlnaW5hbENyZHQsIG5ldyBOb09wQ3JkdEludGVybmFsKCksIDEpO1xuICAgIH1cbn1cbmV4cG9ydHMuTm9PcENyZHRJbnRlcm5hbCA9IE5vT3BDcmR0SW50ZXJuYWw7XG5jbGFzcyBFbmFibGVXaW5zRmxhZyBleHRlbmRzIHJlc2V0dGFibGVfMS5EZWZhdWx0UmVzZXR0YWJsZUNyZHQge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lKSB7XG4gICAgICAgIHN1cGVyKGlkLCBuZXcgTm9PcENyZHRJbnRlcm5hbCgoKSA9PiBudWxsKSwgbnVsbCwgcnVudGltZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmFwcGx5T3AoXCJlXCIpO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIGRpc2FibGVTdHJvbmcoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTdHJvbmcoKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCk7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBkaXNhYmxlIChidXQgb25seSBpZiBpdCBhY3R1YWxseSB3b3JrZWQpLiAgUGVyaGFwcyBhZGQgbm9vcCBpbmRpY2F0b3Igb3V0IGZyb250P1xuICAgIC8vIChOZWVkIHRvIGFkZCBhIG5vLW9wIGNyZHQgYXQgdGhlIHRvcCBsZXZlbClcbiAgICB0cmFuc2xhdGVEZXNjcmlwdGlvbnNSZXNldHRhYmxlKGRlc2NyaXB0aW9ucykge1xuICAgICAgICBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF0gPT09IFwiZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJkaXNhYmxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSAmJiBkZXNjcmlwdGlvbnNbMF1bMF0gPT09IFwicmVzZXRTdHJvbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiZGlzYWJsZVN0cm9uZ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIGRlc2NyaXB0aW9uczogXCIgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlc2NyaXB0aW9ucykpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FbmFibGVXaW5zRmxhZyA9IEVuYWJsZVdpbnNGbGFnO1xuY2xhc3MgRGlzYWJsZVdpbnNGbGFnIGV4dGVuZHMgcmVzZXR0YWJsZV8xLkRlZmF1bHRSZXNldHRhYmxlQ3JkdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgc3VwZXIoaWQsIG5ldyBOb09wQ3JkdEludGVybmFsKCgpID0+IG51bGwpLCBudWxsLCBydW50aW1lLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgZW5hYmxlU3Ryb25nKCkge1xuICAgICAgICB0aGlzLnJlc2V0U3Ryb25nKCk7XG4gICAgfVxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcChcImRcIik7XG4gICAgfVxuICAgIGdldCBlbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlLmlzSGlzdG9yeUVtcHR5KCk7XG4gICAgfVxuICAgIHNldCBlbmFibGVkKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgfVxuICAgIHNldCB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgZXF1aXZhbGVudCB0byBkb2luZyBhIHJlc2V0IGJlZm9yZSBzZXR0aW5nXG4gICAgICAgIC8vIHRvIG5ld1ZhbHVlLCBpbiBlaXRoZXIgY2FzZSwgc2luY2UgYW55IG1lc3NhZ2Ugb2J2aWF0ZXNcbiAgICAgICAgLy8gY2F1c2FsbHkgbGVzc2VyIG1lc3NhZ2VzLlxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gVE9ETzogd291bGQgYWxzbyBsaWtlIHRvIHRyYW5zbGF0ZSBvYnNlcnZlZC1yZXNldHMgdG9cbiAgICAvLyBlbmFibGUgKGJ1dCBvbmx5IGlmIGl0IGFjdHVhbGx5IHdvcmtlZCkuICBQZXJoYXBzIGFkZCBub29wIGluZGljYXRvciBvdXQgZnJvbnQ/XG4gICAgLy8gKE5lZWQgdG8gYWRkIGEgbm8tb3AgY3JkdCBhdCB0aGUgdG9wIGxldmVsKVxuICAgIHRyYW5zbGF0ZURlc2NyaXB0aW9uc1Jlc2V0dGFibGUoZGVzY3JpcHRpb25zKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXSA9PT0gXCJkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcImRpc2FibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdGlvbnMubGVuZ3RoID09PSAxICYmIGRlc2NyaXB0aW9uc1swXVswXSA9PT0gXCJyZXNldFN0cm9uZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJlbmFibGVTdHJvbmdcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBkZXNjcmlwdGlvbnM6IFwiICtcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZXNjcmlwdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRGlzYWJsZVdpbnNGbGFnID0gRGlzYWJsZVdpbnNGbGFnO1xuY2xhc3MgR01hcEludGVybmFsIHtcbiAgICAvKipcbiAgICAgKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtIHZhbHVlQ3JkdEludGVybmFsIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gc2hvdWxkR2MgR2l2ZW4gYSB2YWx1ZSBzdGF0ZSwgcmV0dXJuIHdoZXRoZXIgaXQgaXMgc2FmZVxuICAgICAqIHRvIGdhcmJhZ2UgY29sbGVjdCBpdCwgcmVtb3ZpbmcgaXRzIGtleS12YWx1ZSBwYWlyIGZyb20gdGhlXG4gICAgICogbWFwLiAgRm9yIGNvcnJlY3RuZXNzLCBpZiBzaG91bGRHYyh2YWx1ZVN0YXRlKSBpcyB0cnVlLCB0aGVuXG4gICAgICogdmFsdWVTdGF0ZSBtdXN0IGJlIGlkZW50aWNhbCB0byB2YWx1ZUNyZHRJbnRlcm5hbC5jcmVhdGUodmFsdWVJbml0aWFsRGF0YSk7XG4gICAgICogYW5kIGlmIHNob3VsZEdjIGlzIG5vbnRyaXZpYWwsIHRoZW4gdXNlcnMgc2hvdWxkIGtlZXAgaW5cbiAgICAgKiBtaW5kIHRoYXQgc3RhdGUuaGFzKGtleSkgaXMgbm90IHJlbGlhYmxlLCBzaW5jZSBpdCBtYXkgYmVcbiAgICAgKiBmYWxzZSBldmVuIGFmdGVyIGtleSBoYXMgYmVlbiBpbml0aWFsaXplZCBiZWNhdXNlIHRoZSB2YWx1ZVxuICAgICAqIGhhcyBiZWVuIGdhcmJhZ2UgY29sbGVjdGVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNob3VsZEdjID0gKCgpID0+IGZhbHNlKSkge1xuICAgICAgICB0aGlzLnNob3VsZEdjID0gc2hvdWxkR2M7XG4gICAgfVxuICAgIGNyZWF0ZShfaW5pdGlhbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9uczpcbiAgICAgKiAtIFtcImFwcGx5XCIsIGtleSwgQyBtZXNzYWdlXTogYXBwbGllcyB0aGUgQyBtZXNzYWdlIHRvXG4gICAgICogdGhlIGdpdmVuIGtleSwgaW5pdGlhbGl6aW5nIHRoZSBrZXkgaWYgbmVlZGVkLlxuICAgICAqIC0gW1wiYXBwbHlTa2lwXCIsIGtleSwgQyBtZXNzYWdlXTogYXBwbGllcyB0aGUgQyBtZXNzYWdlIHRvXG4gICAgICogdGhlIGdpdmVuIGtleSwgZXhjZXB0IGZvciB0aGVpciBzZW5kZXIsIHdobyBpcyBhc3N1bWVkXG4gICAgICogdG8gaGF2ZSBhbHJlYWR5IGFwcGxpZWQgdGhlIG1lc3NhZ2UuICBUaGlzIGlzIHVzZWQgYnlcbiAgICAgKiBDcmR0VmFsdWVkR3Jvd09ubHlNYXBJbnRlcm5hbCwgd2hvc2UgbWVzc2FnZXMgYXJlXG4gICAgICogc29tZXRpbWVzIGRlcml2ZWQgZnJvbSB2YWx1ZXMgYXBwbHlpbmcgbWVzc2FnZXMgdG9cbiAgICAgKiB0aGVtc2VsdmVzLiAgVE9ETzogaW4gcHJpbmNpcGxlIGNhbiBvcHRpbWl6ZSBzbyB3ZVxuICAgICAqIGRvbid0IGhhdmUgdG8gc2VuZCBcInNraXBcIiBvdmVyIHRoZSBuZXR3b3JrLlxuICAgICAqIC0gW1wiaW5pdFwiLCBrZXldOiBpbml0aWFsaXplcyB0aGUgZ2l2ZW4ga2V5IHVzaW5nIGluaXRGYWN0b3J5XG4gICAgICogaWYgaXQgaXMgbm90IGFscmVhZHkgcHJlc2VudCBpbiB0aGUgbWFwLlxuICAgICAqIC0gW1wicmVzZXRcIl06IHJlc2V0cyBldmVyeSB2YWx1ZSBpbiB0aGUgbWFwICh1c2luZ1xuICAgICAqIGVhY2ggdmFsdWUncyBnZXRVbml2ZXJzYWxSZXNldE9wZXJhdGlvbigpKS5cbiAgICAgKi9cbiAgICBwcmVwYXJlKG9wZXJhdGlvbiwgc3RhdGUsIF9yZXBsaWNhSWQpIHtcbiAgICAgICAgbGV0IGtleSA9IG9wZXJhdGlvblsxXTtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb25bMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJhcHBseVwiLCBrZXksIG9wZXJhdGlvblsyXV07XG4gICAgICAgICAgICBjYXNlIFwiYXBwbHlTa2lwXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImFwcGx5U2tpcFwiLCBrZXksIG9wZXJhdGlvblsyXV07XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGlmICghc3RhdGUuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJpbml0XCIsIGtleV07XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRcIjogcmV0dXJuIFtcInJlc2V0XCJdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgb3BlcmF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wZXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluIGFkZGl0aW9uIHRvIHRoZSBtZXNzYWdlIG91dHB1dCBieSBwcmVwYXJlLCB3ZSBoYXZlXG4gICAgICogbWVzc2FnZXMgKGFyaXNpbmcgdGhyb3VnaCBzZW1kaXJlY3QgcHJvZHVjdCk6XG4gICAgICogLSBbXCJpbml0UmVzZXRcIiwga2V5XTogZG9lcyBbXCJpbml0XCIsIGtleV0gZm9sbG93ZWQgYnlcbiAgICAgKiBkZWxpdmVyaW5nIGEgcmVzZXQgbWVzc2FnZSB0byB0aGUga2V5LlxuICAgICAqIC0gW1wiaW5pdFJlc2V0U3Ryb25nXCIsIGtleV06IGRvZXMgW1wiaW5pdFwiLCBrZXldIGZvbGxvd2VkXG4gICAgICogYnkgZGVsaXZlcmluZyBhIHJlc2V0LXN0cm9uZyBtZXNzYWdlIHRvIHRoZSBrZXkuXG4gICAgICpcbiAgICAgKiBEZXNjcmlwdGlvbiBmb3JtYXQ6XG4gICAgICogLSBmb3IgYW4gYXBwbHkvYXBwbHlTa2lwIG9wZXJhdGlvbjpcbiAgICAgKiBudWxsIChUT0RPKVxuICAgICAqIC0gZm9yIGFuIGluaXQgb3BlcmF0aW9uOiBudWxsIGlmIHRoZSBrZXkgYWxyZWFkeSBleGlzdGVkLFxuICAgICAqIG90aGVyd2lzZSBbXCJpbml0XCIsIGtleV1cbiAgICAgKiAtIGZvciBhIHJlc2V0IG9wZXJhdGlvbjogW1wicmVzZXRcIl0gKFRPRE86IGRlc2NyaXB0aW9ucyBmcm9tXG4gICAgICogcmVzZXQga2V5cylcbiAgICAgKi9cbiAgICBlZmZlY3QobWVzc2FnZSwgc3RhdGUsIHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCBrZXkgPSBtZXNzYWdlWzFdO1xuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcHBseVNraXBcIjpcbiAgICAgICAgICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBhcHBseWluZyBpdCB0byB0aGUgc3RhdGUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbiBzdGlsbCBnYywgdGhvdWdoLCBpbiBjYXNlIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5LWFwcGxpZWQgbWVzc2FnZSBoYXMgbWFkZSBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBnYy1hYmxlLlxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleVN0YXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkR2Moa2V5U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBudWxsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgZmFsbCB0aHJvdWdoLlxuICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6IHtcbiAgICAgICAgICAgICAgICBsZXQga2V5U3RhdGUgPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5U3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlTdGF0ZSA9IHRoaXMuaW5pdEZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5U3RhdGUucmVjZWl2ZShtZXNzYWdlWzJdLCB0aW1lc3RhbXApO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZEdjKGtleVN0YXRlKSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOlxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtzdGF0ZSwgbnVsbF07XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbml0U3RhdGUgPSB0aGlzLmluaXRGYWN0b3J5KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zaG91bGRHYyhpbml0U3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zZXQoa2V5LCBpbml0U3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbc3RhdGUsIFtcImluaXRcIiwga2V5XV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2Ygc3RhdGUuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNldE1lc3NhZ2UgPSBlbnRyeVsxXS5nZXRVbml2ZXJzYWxSZXNldE1lc3NhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2V0TWVzc2FnZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5WzFdLnJlY2VpdmUoW3Jlc2V0TWVzc2FnZV0sIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZEdjKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGVsZXRlKGVudHJ5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW3N0YXRlLCBbXCJyZXNldFwiXV07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBtZXNzYWdlOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuR01hcEludGVybmFsID0gR01hcEludGVybmFsO1xuLyoqXG4gKiBDb252ZW5pZW50IHJlcHJlc2VudGF0aW9uIG9mIGEgQ3JkdC12YWx1ZWQgZ3Jvdy1vbmx5IG1hcC5cbiAqXG4gKiBUT0RPOiBTb21ld2hlcmU6IG5vdGUgdGhhdCBpbml0aWFsIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIG11c3QgYmVcbiAqIGEgZnVuY3Rpb24gb2YgdGhlaXIga2V5IG9ubHkgKHNvIGNhbid0IGhhdmUgdmFyeWluZyB0eXBlcyBvclxuICogaW5pdGlhbCBkYXRhKS5cbiAqXG4gKiBOIGlzIHRoZSB0eXBlIG9mIG1lbWJlciBuYW1lcyAodHlwaWNhbGx5IHN0cmluZykuXG4gKi9cbmNsYXNzIENyZHRPYmplY3QgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBUT0RPOiBwcmVkZWZpbmVkIHZzIGR5bmFtaWMgcHJvcGVydHkgY3JlYXRpb24uICBQcmVkZWZpbmVkIG9uZXNcbiAgICAgKiBoYXZlIHRvIGJlIGNyZWF0ZWQgaWRlbnRpY2FsbHkgb24gYWxsIHJlcGxpY2FzIGluXG4gICAgICogYmV0d2VlbiBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkgYW5kXG4gICAgICogZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKSwgaWRlYWxseSBpbiB0aGUgY29uc3RydWN0b3IuIFRoZXlcbiAgICAgKiBhcmUgbm90IHN5bmNlZCAoZm9yIGVmZmljaWVuY3kgYW5kIHRvIHNhdmUgdGhlIHRyb3VibGVcbiAgICAgKiBvZiBzcGVjaWZ5aW5nIHByb3BlcnR5RmFjdG9yeSkuICBEeW5hbWljIHByb3BlcnRpZXNcbiAgICAgKiBjYW4gb25seSBiZSBjcmVhdGVkIHRocm91Z2ggaW5pdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBydW50aW1lICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eUZhY3RvcnkgW2Rlc2NyaXB0aW9uXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCBwcm9wZXJ0eUZhY3RvcnkgPSBDcmR0T2JqZWN0LmRlZmF1bHRQcm9wZXJ0eUZhY3RvcnkpIHtcbiAgICAgICAgLy8gVE9ETzogZ2MgYWJpbGl0eVxuICAgICAgICBsZXQgY3JkdEludGVybmFsID0gbmV3IEdNYXBJbnRlcm5hbCgpO1xuICAgICAgICBzdXBlcihpZCwgY3JkdEludGVybmFsLCBydW50aW1lKTtcbiAgICAgICAgY3JkdEludGVybmFsLmluaXRGYWN0b3J5ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbkluaXQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHByb3BlcnR5RmFjdG9yeShrZXksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbkluaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5QcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluSW5pdCA9IGZhbHNlO1xuICAgIH1cbiAgICBzdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCkge1xuICAgICAgICB0aGlzLmluUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIHtcbiAgICAgICAgdGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uID0gZmFsc2U7XG4gICAgfVxuICAgIHJlZ2lzdGVyKGNyZHQsIG5hbWUpIHtcbiAgICAgICAgaWYgKCEodGhpcy5pblByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uIHx8IHRoaXMuaW5Jbml0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvcGVydGllcyBjYW4gb25seSBiZSBkaXJlY3RseSBcIiArXG4gICAgICAgICAgICAgICAgXCJyZWdpc3RlcmVkIGJldHdlZW4gc3RhcnRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpIFwiICtcbiAgICAgICAgICAgICAgICBcImFuZCBlbmRQcmVkZWZpbmVkUHJvcGVydHlDcmVhdGlvbigpLiAgRHluYW1pYyBwcm9wZXJ0aWVzIFwiICtcbiAgICAgICAgICAgICAgICBcIm11c3QgYmUgY3JlYXRlZCB3aXRoIGluaXQobmFtZSkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIHByb3BlcnR5IG5hbWU6IFwiICsgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5zZXQobmFtZSwgY3JkdCk7XG4gICAgICAgIC8vIFNraXAgc2VuZGluZyBhbiBpbml0IG1lc3NhZ2UgYWJvdXQgaXQuICBPa2F5IGJlY2F1c2Ugb2YgdGhlXG4gICAgICAgIC8vIHByZWRlZmluZWQgaW5pdGlhbGl6YXRpb24gY29udHJhY3QuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgbmFtZSBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiAgICAgIFRoZSBpbml0aWFsaXplZCBDcmR0LlxuICAgICAqL1xuICAgIGluaXRQcm9wZXJ0eShuYW1lKSB7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWUgPSB0aGlzLnN0YXRlLmdldChuYW1lKTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3AoW1wiaW5pdFwiLCBuYW1lXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlPcCh0aGlzLmdldFVuaXZlcnNhbFJlc2V0TWVzc2FnZSgpKTtcbiAgICB9XG4gICAgZ2V0VW5pdmVyc2FsUmVzZXRNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gW1wicmVzZXRcIl07XG4gICAgfVxuICAgIGdldFByb3BlcnR5KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KG5hbWUpO1xuICAgIH1cbiAgICBwcm9wZXJ0eU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5rZXlzKCk7XG4gICAgfVxuICAgIHByb3BlcnR5VmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZXMoKTtcbiAgICB9XG4gICAgcHJvcGVydHlFbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5lbnRyaWVzKCk7XG4gICAgfVxuICAgIHNlbmQobWVzc2FnZSwgbmFtZSkge1xuICAgICAgICAvLyBDb252ZXJ0IGludG8gYW4gYXBwbHlTa2lwIG1lc3NhZ2UgZm9yIHRoZSBtYXAgdmFsdWVcbiAgICAgICAgLy8gYXQgbmFtZS4gIEhlcmUgd2Ugd2FudCB0byBza2lwIGJlY2F1c2VcbiAgICAgICAgLy8gb3VyIHJlcGxpY2EncyB2YWx1ZSBoYXMgYWxyZWFkeSBhcHBsaWVkIHRoZVxuICAgICAgICAvLyBvcGVyYXRpb24gaW50ZXJuYWxseS5cbiAgICAgICAgdGhpcy5hcHBseU9wKFtcImFwcGx5U2tpcFwiLCBuYW1lLCBtZXNzYWdlXSk7XG4gICAgfVxuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKTtcbiAgICB9XG4gICAgZ2V0TmV4dFRpbWVzdGFtcChfY3JkdElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZ2V0TmV4dFRpbWVzdGFtcCh0aGlzLmlkKTtcbiAgICB9XG59XG5leHBvcnRzLkNyZHRPYmplY3QgPSBDcmR0T2JqZWN0O1xuQ3JkdE9iamVjdC5kZWZhdWx0UHJvcGVydHlGYWN0b3J5ID0gKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkR5bmFtaWNhbGx5IGNyZWF0ZWQgcHJvcGVydGllcyBhcmUgb25seSBcIiArXG4gICAgICAgIFwiYWxsb3dlZCBpZiBwcm9wZXJ0eUZhY3RvcnkgaXMgcGFzc2VkIHRvIHRoZSBcIiArXG4gICAgICAgIFwiQ3JkdE9iamVjdCBjb25zdHJ1Y3RvclwiKTtcbn07XG5jbGFzcyBBZGRXaW5zU2V0IGV4dGVuZHMgQ3JkdE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoaWQsIHJ1bnRpbWUpIHtcbiAgICAgICAgLy8gVE9ETzogYWRkIGdjIG9uY2Ugd2UgaGF2ZSB0cmFuc2FjdGlvbnNcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUsIChuYW1lLCBpbnRlcm5hbFJ1bnRpbWUpID0+IG5ldyBFbmFibGVXaW5zRmxhZyhuYW1lLCBpbnRlcm5hbFJ1bnRpbWUpKTtcbiAgICB9XG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICB0aGlzLmluaXRQcm9wZXJ0eSh2YWx1ZSkuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICB9XG4gICAgZGVsZXRlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVTdHJvbmcodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9wZXJ0eSh2YWx1ZSkucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXModmFsdWUpIHtcbiAgICAgICAgbGV0IHZhbHVlRmxhZyA9IHRoaXMuZ2V0UHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVGbGFnID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZUZsYWcuZW5hYmxlZDtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnByb3BlcnR5RW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoZW50cnlbMV0uZW5hYmxlZClcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGVudHJ5WzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzZXQgdmFsdWUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmRUcmFuc2FjdGlvbigpO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIC8vIFRPRE86IG9uY2UgaXQncyBnYydkIHdlIGNhbiBqdXN0IHVzZSB0aGlzLnN0YXRlLmtleXMoKVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS52YWx1ZXMoKTtcbiAgICB9XG59XG5leHBvcnRzLkFkZFdpbnNTZXQgPSBBZGRXaW5zU2V0O1xuY2xhc3MgTWFwQ3JkdCBleHRlbmRzIENyZHRPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGlkLCBydW50aW1lLCB2YWx1ZUZhY3RvcnkpIHtcbiAgICAgICAgc3VwZXIoaWQsIHJ1bnRpbWUpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRmxhZyBpbmRpY2F0aW5nIHRoYXQgd2UgYXJlIGluIHRoZSBib2R5IG9mIGEgZGVsZXRlL1xuICAgICAgICAgKiBkZWxldGVTdHJvbmcgY2FsbCwgaGVuY2Ugd2Ugc2hvdWxkIG5vdCBhZGQgdGhpbmdzXG4gICAgICAgICAqIHRvIGtleVNldCAoYXMgYW4gb3B0aW1pemF0aW9uKS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydFByZWRlZmluZWRQcm9wZXJ0eUNyZWF0aW9uKCk7XG4gICAgICAgIHRoaXMua2V5U2V0ID0gbmV3IEFkZFdpbnNTZXQoXCJrZXlTZXRcIiwgdGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWVNYXAgPSBuZXcgQ3JkdE9iamVjdChcInZhbHVlTWFwXCIsIHRoaXMsIHZhbHVlRmFjdG9yeSk7XG4gICAgICAgIHRoaXMuZW5kUHJlZGVmaW5lZFByb3BlcnR5Q3JlYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgQ3JkdE9iamVjdC5zZW5kIHNvIHRoYXQgd2UgY2FuIGNhcHR1cmVcbiAgICAgKiBhIHNlbmQgYnkgYSB2YWx1ZU1hcCB2YWx1ZSBhbmQgZm9sbG93IGl0IHVwIHdpdGhcbiAgICAgKiBhbiBhZGQgdG8ga2V5U2V0LCB0aHVzIHJldml2aW5nIHRoZSB2YWx1ZSdzIGtleVxuICAgICAqIGlmIGFwcHJvcHJpYXRlLlxuICAgICAqXG4gICAgICogVE9ETzogc2tpcCBhZGRpbmcgdGhlIGtleSBpZiBpdCdzIGEgcmVzZXQgbWVzc2FnZT9cbiAgICAgKiBOb3Qgc3VyZSBpZiB0aGlzIGlzIHBvc3NpYmxlIGluIGdlbmVyYWwuICBCdXQgc2hvdWxkIGF0XG4gICAgICogbGVhc3QgYmUgcG9zc2libGUgZm9yIG91ciBvd24gZGVsZXRlcy5cbiAgICAgKi9cbiAgICBzZW5kKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIuc2VuZChtZXNzYWdlLCBuYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLmluRGVsZXRlICYmIG5hbWUgPT09IFwidmFsdWVNYXBcIikge1xuICAgICAgICAgICAgLy8gVE9ETzogZG8gdGhpcyByZWNlaXZlciBzaWRlIGluc3RlYWQsIGZvciBuZXR3b3JrIGVmZmljaWVuY3k/XG4gICAgICAgICAgICAvLyBXb3VsZCBuZWVkIHRvIHBsYWNlIHRoZSBhZGQgZmlyc3QsIHNvIHRoYXQgaXQgY2FuXG4gICAgICAgICAgICAvLyBiZSBvdmVycmlkZGVuIGJ5IGFueSBpbmNsdWRlZCBkZWxldGVzLlxuICAgICAgICAgICAgLy8gV291bGQgYWxzbyBuZWVkIHRvIGFjY291bnQgZm9yIHBvc3NpYmlsaXR5IG9mXG4gICAgICAgICAgICAvLyB0cmFuc2FjdGlvbnMuXG4gICAgICAgICAgICAvLyBBbHNvLCBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSAoc2VuZGVyKSBkbyBpdCB0b28uXG4gICAgICAgICAgICBmb3IgKGxldCBzdWJtZXNzYWdlIG9mIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VibWVzc2FnZVswXSA9PT0gXCJhcHBseVNraXBcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gc3VibWVzc2FnZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlTZXQuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoa2V5KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2FjdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMuaW5EZWxldGUpXG4gICAgICAgICAgICB0aGlzLmtleVNldC5hZGQoa2V5KTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMudmFsdWVNYXAuaW5pdFByb3BlcnR5KGtleSk7XG4gICAgICAgIHRoaXMuZW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlTZXQuaGFzKGtleSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU1hcC5nZXRQcm9wZXJ0eShrZXkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaW5EZWxldGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nZXQoa2V5KS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLmluRGVsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlU3Ryb25nKGtleSkge1xuICAgICAgICB0aGlzLmluRGVsZXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0KGtleSkucmVzZXRTdHJvbmcoKTtcbiAgICAgICAgdGhpcy5rZXlTZXQuZGVsZXRlU3Ryb25nKGtleSk7XG4gICAgICAgIHRoaXMuaW5EZWxldGUgPSBmYWxzZTtcbiAgICB9XG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5U2V0LnZhbHVlcygpO1xuICAgIH1cbn1cbmV4cG9ydHMuTWFwQ3JkdCA9IE1hcENyZHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGFuZGFyZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3JkdE5ldHdvcmtSdW50aW1lID0gZXhwb3J0cy5teU1lc3NhZ2UgPSB2b2lkIDA7XG5jb25zdCB2ZWN0b3JfY2xvY2tfMSA9IHJlcXVpcmUoXCIuL3ZlY3Rvcl9jbG9ja1wiKTtcbi8vIGltcG9ydCBXZWJTb2NrZXQgPSByZXF1aXJlKFwid3NcIik7XG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5jbGFzcyBteU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNyZHRJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY3JkdElkID0gY3JkdElkO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgcGFja2FnZSBpbmZvIGluIEpTT04gZm9ybWF0LlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgXCJtZXNzYWdlXCI6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIFwiY3JkdElkXCI6IHRoaXMuY3JkdElkLFxuICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIjoge1xuICAgICAgICAgICAgICAgIFwidWlkXCI6IHRoaXMudGltZXN0YW1wLnVpZCxcbiAgICAgICAgICAgICAgICBcInZlY3Rvck1hcFwiOiBBcnJheS5mcm9tKHRoaXMudGltZXN0YW1wLnZlY3Rvck1hcC5lbnRyaWVzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubXlNZXNzYWdlID0gbXlNZXNzYWdlO1xuLyoqXG4gKiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrOlxuICpcbiAqIFByb2Nlc3MgaW5pdGlhbGl6YXRpb24gd2hlbiBzdGFydGluZyBhIG5ldyB1c2VyIG5vZGUuXG4gKlxuICogQ29tbXVuaWNhdGUgd2l0aCBDUkRUJ3MgcnVudGltZSBhbmQgc2VuZC9yZWNlaXZlIG1lc3NhZ2UgdmlhXG4gKiBjZW50cmFsIGJyb2FkY2FzdCBzZXJ2ZXIgd2l0aCBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gKlxuICogUGVyZm9ybSBjYXN1YWxpdHkgY2hlY2sgdG8gZW5zdXJlIG1lc3NhZ2Ugb3JkZXJpbmcuXG4gKi9cbmNsYXNzIENyZHROZXR3b3JrUnVudGltZSB7XG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCB3ZWJTb2NrZXRBcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAgICAgKiBJZiB0aGVyZSBleGlzdCwgdGhlbiBzZW5kIGl0IHZpYSBXZWJTb2NrZXQgYW5kIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGJ1ZmZlci5cbiAgICAgICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIC8vIFVzZSBoZWFydGJlYXQgdG8ga2VlcCBjbGllbnQgYWxpdmUuXG4gICAgICAgICAgICAvLyB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlIGhlYXJ0YmVhdCBmdW5jdGlvbiB0byBrZWVwIGNsaWVudHMgYWxpdmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRPRE86XG4gICAgICAgICAqIFRoZSBtZXNzYWdlIHNlbmRpbmcgdG8gc2VydmVyIGlzICdoZWFydGJlYXQnIHJpZ2h0IG5vdy5cbiAgICAgICAgICogVGhlIHRpbWVvdXQgaW50ZXJ2YWwgaXMgc2V0IHRvIDUwMDAgbWlsbGlvbnNlY29uZHMuXG4gICAgICAgICAqL1xuICAgICAgICAvLyBoZWFydGJlYXQoKSA6IHZvaWQge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy53cy5zZW5kKCdoZWFydGJlYXQnKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICAvLyAgICAgfSwgNTAwMCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayBpbnRvIG15TWVzc2FnZSB0eXBlLlxuICAgICAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYWxsIHRoZSBtZXNzYWdlcyBhbmQgZGVsaXZlciB0byBhcHBsaWNhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihkYXRhLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuY3JkdElkLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWVzc2FnZUJ1ZmZlcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVpZCA9IHJlcGxpY2FJZDtcbiAgICAgICAgdGhpcy52Y01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyc0J5SWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8vIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcigncGluZycsIGZ1bmN0aW9uKHBpbmdNZXNzYWdlKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlIGEgcGluZyA6ICcgKyBwaW5nTWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHRJZCBvbiBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ3JkdElkKGNyZHRJZCkge1xuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGNyZHRJZDogXCIgKyBjcmR0SWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdCB3aXRoIGl0cyBJRCBhbmQgY29ycmVzcG9uZGluZyBtZXNzYWdlXG4gICAgICogbGlzdGVuZXIgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0TWVzc2FnZUxpc3RlbmVyIHRoZSBtZXNzYWdlIGxpc3RlbmVyIG9mIGVhY2ggY3JkdC5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBJRCBvZiBlYWNoIGNyZHQuXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0TWVzc2FnZUxpc3RlbmVyLCBjcmR0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3JkdElkKSB8fCB0aGlzLnZjTWFwLmhhcyhjcmR0SWQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgY3JkdElkOiBcIiArIGNyZHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5lcnNCeUlkLnNldChjcmR0SWQsIGNyZHRNZXNzYWdlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChjcmR0SWQsIG5ldyB2ZWN0b3JfY2xvY2tfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGZ1bmN0aW9uIG9uIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrIGxheWVyLCB3aGljaCBjYWxsZWRcbiAgICAgKiBieSBjcmR0J3MgcnVudGltZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRoZSBtZXNzYWdlIGlzIHdyYXBwZWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0aW1lc3RhbXAgKGJhc2ljIHNlbmRlciBub2RlXG4gICAgICogaW5mbyBhbmQgdmVjdG9yIGNsb2NrKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIFdlYlNvY2tldCBhcyBuZXR3b3JrIHRyYW5zbWlzc2lvbiBwcm90b2NvbC5cbiAgICAgKiBVc2luZyBKU09OIGZvcm1hdCBhcyBtZXNzYWdlIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgbm90IE9wZW4sIHRoZW4gYnVmZmVyIHRoZSBtZXNzYWdlIGFuZFxuICAgICAqIHdhaXQgdW50aWwgV2ViU29ja2V0IG9wZW4uXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIE9wZW4sIHRoZW4gc2VuZCBpdCB3aXRoIHdzLnNlbmQoKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHRoZSBjcmR0IHVwZGF0ZSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIHVuaXF1ZSBJRCBmb3IgZWFjaCBjcmR0LlxuICAgICAqL1xuICAgIHNlbmQobWVzc2FnZSwgY3JkdElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNyZHRJZCBleGlzdCBpbiB0aGUgbWFwLlxuICAgICAgICBpZiAodGhpcy52Y01hcC5oYXMoY3JkdElkKSkge1xuICAgICAgICAgICAgdGhpcy52Y01hcC5nZXQoY3JkdElkKS5pbmNyZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGNyZHRJZCwgbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLmdldChjcmR0SWQpLmluY3JlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrIGZvciBzZW5kaW5nXG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgdmVjdG9yX2Nsb2NrXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcCgoX2EgPSB0aGlzLnZjTWFwLmdldChjcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgY3JkdElkLCB2Y0NvcHkpO1xuICAgICAgICAvLyBDb252ZXJ0IHRoZSBtZXNzYWdlIGludG8gSlNPTlxuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQobXlQYWNrYWdlLnRvSlNPTigpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKG15UGFja2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuZXh0IHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gY3JkdElkIGluIHRoaXMgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgcGFzc2VkIHRvIENyZHRJbnRlcm5hbC5lZmZlY3Qgd2hlbiBhIHJlcGxpY2EgcHJvY2Vzc2VzIGl0cyBvd25cbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXROZXh0VGltZXN0YW1wKGNyZHRJZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrLlxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKHRoaXMudWlkKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAoKF9hID0gdGhpcy52Y01hcC5nZXQoY3JkdElkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFzVmVjdG9yQ2xvY2soKSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuXG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCB2Y0NvcHkudmVjdG9yTWFwLmdldCh0aGlzLnVpZCkgKyAxKTtcbiAgICAgICAgcmV0dXJuIHZjQ29weTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIHRvIGN1c3RvbWl6ZWQgZGF0YSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgdHJhdmVsIHRocm91Z2ggbmV0d29yay5cbiAgICAgKiBAcmV0dXJucyB0aGUgY3VzdG9taXplZCBkYXRhIHR5cGUgPT4gbXlNZXNzYWdlXG4gICAgICovXG4gICAgcGFyc2VKU09OKGRhdGEpIHtcbiAgICAgICAgbGV0IGRhdGFKU09OID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IHZjID0gbmV3IHZlY3Rvcl9jbG9ja18xLlZlY3RvckNsb2NrKGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShkYXRhSlNPTi5tZXNzYWdlLCBkYXRhSlNPTi5jcmR0SWQsIHZjKTtcbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmdcbiAgICAgKiBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGNoZWNrTWVzc2FnZUJ1ZmZlcigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJDcmR0SWQgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdO1xuICAgICAgICAgICAgbGV0IGN1clZlY3RvckNsb2NrID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXTtcbiAgICAgICAgICAgIGlmICghdGhpcy52Y01hcC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG15VmVjdG9yQ2xvY2sgPSB0aGlzLnZjTWFwLmdldChjdXJDcmR0SWQpO1xuICAgICAgICAgICAgICAgIGlmIChteVZlY3RvckNsb2NrID09PSBudWxsIHx8IG15VmVjdG9yQ2xvY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG15VmVjdG9yQ2xvY2suaXNyZWFkeShjdXJWZWN0b3JDbG9jaykpIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lci5cblxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzQnlJZC5oYXMoY3VyQ3JkdElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5saXN0ZW5lcnNCeUlkLmdldChjdXJDcmR0SWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVjZWl2ZSh0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzBdLCBjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrLmluY3JlbWVudFNlbmRlcihjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNyZHROZXR3b3JrUnVudGltZSA9IENyZHROZXR3b3JrUnVudGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya19ydW50aW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gRmlyc3QgYXR0ZW1wdCBhdCB0aGUgaW50ZXJmYWNlIGJldHdlZW4gdGhlIHJ1bnRpbWVcbi8vIChjYXVzYWwgYnJvYWRjYXN0IG5ldHdvcmssIGV0Yy4pIGFuZCB0aGUgQ1JEVHMuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X3J1bnRpbWVfaW50ZXJmYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfcnVudGltZV9pbnRlcmZhY2VcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya19ydW50aW1lXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi92ZWN0b3JfY2xvY2tcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZlY3RvckNsb2NrID0gdm9pZCAwO1xuLy8gVGhlIHZlY3RvciBjbG9jayBkZXNpZ25lZCBmb3IgQ1JEVCBsaWJyYXJ5IGFuZCBjYXN1YWwgYnJvYWRjYXN0aW5nXG4vLyBydW50aW1lIHRvIGVuc3VyZSBjb3JyZWN0IGNhdXNhbGl0eS5cbi8qKlxuICogVGhlIHZlY3RvciBjbG9jayBjbGFzcyBmb3IgZW5zdXJpbmcgY2FzdWFsaXR5LlxuICovXG5jbGFzcyBWZWN0b3JDbG9jayB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgdmVjdG9yIHdpdGggcmVwbGljYSdzIG93biBlbnRyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdW5pcXVlIElEIGZvciB0aGlzIHJlcGxpY2EocmVwbGljYUlkKS5cbiAgICAgKi9cbiAgICBnZXRTZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZlY3RvciBjbG9jayB3aXRoIGFsbCB0aGUgZW50cmllcy5cbiAgICAgKi9cbiAgICBhc1ZlY3RvckNsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpblxuICAgICAqIHRoaXMgdmVjdG9yY2xvY2suXG4gICAgICovXG4gICAgZ2V0U2VuZGVyQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVwbGljYXMgaW52b3ZsZWQgaW4gdGhpcyBjcmR0cy5cbiAgICAgKi9cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2ZWN0b3Igb2YgdGhlIHVpZChyZXBsaWNhSWQpIGVudHJ5LlxuICAgICAqL1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCBvbGRWYWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGEgbWVzc2FnZSB3aXRoIGEgY2VydGFpbiB0aW1lc3RhbXAgaXMgcmVhZHkgZm9yIGRlbGl2ZXJ5XG4gICAgICogdG8gZW5zdXJlIGNvcnJlY3QgY2FzdWFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmhhcyhvdGhlclVpZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICpcbiAgICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBtYWlubHkgZG9uZSBhZnRlciBjb3JyZWN0bHkgZGVsaXZlciB0aGUgbWVzc2FnZVxuICAgICAqIHdoZW4gaXNSZWFkeSgpIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIGluY3JlbWVudFNlbmRlcih2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQob3RoZXJVaWQsIG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSBjdXJyZW50IFZlY3RvckNsb2NrIHdpdGggdGhlIHZlY3RvciBjbG9jayByZWNldmllZCBmcm9tXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIG1lcmdlKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIG90aGVyVmVjdG9yTWFwLmdldChpZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBNYXRoLm1heCh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29tZVVpZCB0aGUgcmVwbGljYSdzIHVpZC5cbiAgICAgKiBAcGFyYW0gY2xvY2tWYWx1ZSB0aGUgY2xvY2sgbnVtYmVyIG9mIHRoZSByZXBsaWNhLlxuICAgICAqL1xuICAgIHNldEVudHJ5KHNvbWVVaWQsIGNsb2NrVmFsdWUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSBWZWN0b3JDbG9jaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlY3Rvcl9jbG9jay5qcy5tYXAiLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiLy8gcmVxdWlyZSgnLi4vdGVzdC90ZXN0Jyk7IC8vIHJ1biB0ZXN0LnRzXG5pbXBvcnQgeyBjcmR0cywgbmV0d29yayB9IGZyb20gJ2NvbXBvdmVudHVhbHMtY2xpZW50JztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuLyoqXG4gKiBHZXQgSGVyb2t1IHNlcnZlciBob3N0IFdlYnNvY2tldC5cbiAqL1xudmFyIEhPU1QgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKVxuXG4vKipcbiAqIEdlbmVyYXRlIHV1aWQgZm9yIGVhY2ggY2xpZW50LlxuICovXG5jb25zdCBjbGllbnRfdXVpZCA6IHN0cmluZyA9IHV1aWQoKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDUkRUcycgUnVudGltZSBvbiBlYWNoIGNsaWVudCBhbmQgY3JlYXRlIENSRFRzIChlLmcuIENvdW50ZXJDcmR0KS5cbiAqL1xubGV0IGNsaWVudCA9IG5ldyBuZXR3b3JrLkNyZHROZXR3b3JrUnVudGltZShjbGllbnRfdXVpZCwgSE9TVCk7XG5sZXQgY2xpZW50Q291bnRlciA9IG5ldyBjcmR0cy5Db3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBjbGllbnQpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgb25jaGFuZ2UoKSBmb3IgQ1JEVCBhcyByZWZyZXNoIHRoZSB2YWx1ZSAqL1xuY2xpZW50Q291bnRlci5vbmNoYW5nZSA9ICgoKSA9PiB7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpfSk7XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgaW5jcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpbmNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgZGVjcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBkZWNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoLTEwMCk7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufVxuXG4vLyAvKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIHN5bmMgdG8gc3luY2hyb25pemUgdGhlIHZhbHVlICovXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5bmNcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbi8vICAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG4vLyB9XG4iXSwic291cmNlUm9vdCI6IiJ9