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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.network = exports.crdts = void 0;
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
exports.LwwRegister = exports.LwwEvent = exports.LwwState = exports.MultiValueRegister = exports.MvrEvent = exports.MvrEntry = exports.GSetCrdt = exports.SetAddEvent = exports.MultRegisterCrdt = exports.MultEvent = exports.CounterCrdt = exports.NumberState = exports.AddEvent = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
const proto_compiled_1 = __webpack_require__(/*! ../proto_compiled */ "../client/build/src/proto_compiled.js");
const utils_1 = __webpack_require__(/*! ./utils */ "../client/build/src/crdts/utils.js");
class AddEvent {
    constructor(caller, timestamp, valueAdded) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.valueAdded = valueAdded;
        this.type = "Add";
    }
}
exports.AddEvent = AddEvent;
class NumberState {
    constructor(value) {
        this.value = value;
    }
}
exports.NumberState = NumberState;
// TODO: make resettable
class CounterCrdt extends crdt_core_1.Crdt {
    constructor(parentOrRuntime, id, initialValue = 0) {
        super(parentOrRuntime, id, new NumberState(initialValue));
    }
    add(toAdd) {
        if (toAdd !== 0) {
            let message = proto_compiled_1.CounterMessage.create({ toAdd: toAdd });
            let buffer = proto_compiled_1.CounterMessage.encode(message).finish();
            super.send(buffer);
        }
    }
    receiveInternal(timestamp, message) {
        try {
            let decoded = proto_compiled_1.CounterMessage.decode(message);
            this.state.value += decoded.toAdd;
            this.dispatchEvent(new AddEvent(this, timestamp, decoded.toAdd));
            return true;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }
    get value() {
        return this.state.value;
    }
    /**
     * Performs an equivalent add.
     */
    set value(value) {
        this.add(value - this.value);
    }
}
exports.CounterCrdt = CounterCrdt;
class MultEvent {
    constructor(caller, timestamp, valueMulted) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.valueMulted = valueMulted;
        this.type = "Mult";
    }
}
exports.MultEvent = MultEvent;
class MultRegisterCrdt extends crdt_core_1.Crdt {
    constructor(parentOrRuntime, id, initialValue = 1) {
        super(parentOrRuntime, id, new NumberState(initialValue));
    }
    mult(toMult) {
        if (toMult !== 1) {
            let message = proto_compiled_1.MultRegisterMessage.create({ toMult: toMult });
            let buffer = proto_compiled_1.MultRegisterMessage.encode(message).finish();
            super.send(buffer);
        }
    }
    receiveInternal(timestamp, message) {
        try {
            let decoded = proto_compiled_1.MultRegisterMessage.decode(message);
            this.state.value *= decoded.toMult;
            this.dispatchEvent(new MultEvent(this, timestamp, decoded.toMult));
            return true;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }
    get value() {
        return this.state.value;
    }
    /**
     * Performs an equivalent mult.
     */
    set value(value) {
        this.mult(value / this.value);
    }
}
exports.MultRegisterCrdt = MultRegisterCrdt;
class SetAddEvent {
    constructor(caller, timestamp, valueAdded) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.valueAdded = valueAdded;
        this.type = "SetAdd";
    }
}
exports.SetAddEvent = SetAddEvent;
class GSetCrdt extends crdt_core_1.Crdt {
    /**
     * Grow-only set with elements of type T.
     *
     * The default serializer supports types string, number,
     * and Crdt.  string and number types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are not supported and will cause an
     * error when you attempt to add them; use a custom
     * serializer and deserializer instead, being
     * aware of JS's clunky set semantics (all Objects
     * are stored by-reference only, while naive
     * serialization/deserialization, e.g. with JSON,
     * will create non-equal
     * copies of Objects on other replicas,
     * even if they intuitively correspond to the "same"
     * variable.)
     */
    constructor(parentOrRuntime, id, serialize = utils_1.defaultCollectionSerializer, deserialize = utils_1.newDefaultCollectionDeserializer(parentOrRuntime)) {
        super(parentOrRuntime, id, new Set());
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
    add(value) {
        // TODO: if we make this resettable, send values
        // anyway (or make that an option).
        if (!this.has(value)) {
            let message = proto_compiled_1.GSetMessage.create({
                toAdd: this.serialize(value)
            });
            let buffer = proto_compiled_1.GSetMessage.encode(message).finish();
            super.send(buffer);
        }
    }
    has(value) {
        return this.state.has(value);
    }
    receiveInternal(timestamp, message) {
        try {
            let decoded = proto_compiled_1.GSetMessage.decode(message);
            let value = this.deserialize(decoded.toAdd);
            if (!this.state.has(value)) {
                this.state.add(value);
                this.dispatchEvent(new SetAddEvent(this, timestamp, value));
                return true;
            }
            else
                return false;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }
    /**
     * Don't mutate this directly.
     */
    get value() {
        return this.state;
    }
}
exports.GSetCrdt = GSetCrdt;
class MvrEntry {
    constructor(value, sender, counter) {
        this.value = value;
        this.sender = sender;
        this.counter = counter;
    }
}
exports.MvrEntry = MvrEntry;
class MvrEvent {
    constructor(caller, timestamp, valueAdded, valuesRemoved) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.valueAdded = valueAdded;
        this.valuesRemoved = valuesRemoved;
        this.type = "Mvr";
    }
}
exports.MvrEvent = MvrEvent;
class MultiValueRegister extends crdt_core_1.Crdt {
    /**
     * Multi-value register of type T.
     *
     * The default serializer supports types string, number,
     * and Crdt.  string and number types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are not supported and will cause an
     * error when you attempt to add them; use a custom
     * serializer and deserializer instead, being
     * aware of JS's clunky set semantics (all Objects
     * are stored by-reference only, while naive
     * serialization/deserialization, e.g. with JSON,
     * will create non-equal
     * copies of Objects on other replicas,
     * even if they intuitively correspond to the "same"
     * variable.)
     */
    constructor(parentOrRuntime, id, initialValue, serialize = utils_1.defaultCollectionSerializer, deserialize = utils_1.newDefaultCollectionDeserializer(parentOrRuntime)) {
        let initialSet = new Set();
        // TODO: use generic way (runLocally), to
        // reduce code duplication.
        initialSet.add(new MvrEntry(initialValue, null, -1));
        super(parentOrRuntime, id, initialSet);
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
    set value(value) {
        let message = proto_compiled_1.MvrMessage.create({
            value: this.serialize(value)
        });
        let buffer = proto_compiled_1.MvrMessage.encode(message).finish();
        super.send(buffer);
    }
    receiveInternal(timestamp, message) {
        try {
            let decoded = proto_compiled_1.MvrMessage.decode(message);
            let value = this.deserialize(decoded.value);
            let removed = new Set();
            let vc = timestamp.asVectorClock();
            for (let entry of this.state) {
                if (entry.sender === null) {
                    // Initial element
                    this.state.delete(entry);
                }
                else {
                    let vcEntry = vc.get(entry.sender);
                    if (vcEntry !== undefined && vcEntry >= entry.counter) {
                        this.state.delete(entry);
                        removed.add(entry.value);
                    }
                }
            }
            this.state.add(new MvrEntry(value, timestamp.getSender(), timestamp.getSenderCounter()));
            if (removed.size === 1 && removed.entries().next().value === value) {
                return false; // no change to actual value
            }
            else {
                // TODO: don't dispatch if value stayed put?
                this.dispatchEvent(new MvrEvent(this, timestamp, value, removed));
                return true;
            }
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }
    /**
     * Return the current set of values, i.e., the
     * set of non-overwritten values.  This may have
     * more than one element due to concurrent writes,
     * but it will never have zero elements.  (If you
     * want to allow null/undefined values, include
     * that in T's type.)
     */
    get valueSet() {
        let values = new Set();
        for (let entry of this.state)
            values.add(entry.value);
        return values;
    }
}
exports.MultiValueRegister = MultiValueRegister;
class LwwState {
    constructor(value, sender, counter, time) {
        this.value = value;
        this.sender = sender;
        this.counter = counter;
        this.time = time;
    }
}
exports.LwwState = LwwState;
class LwwEvent {
    constructor(caller, timestamp, value, timeSet) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.value = value;
        this.timeSet = timeSet;
        this.type = "Lww";
    }
}
exports.LwwEvent = LwwEvent;
class LwwRegister extends crdt_core_1.Crdt {
    /**
     * Last-writer-wins (LWW) register of type T.  Ties
     * between concurrent messages are based on UTC
     * timestamps (however, a message will always overwrite
     * a causally prior value regardless of timestamps).
     *
     * The default serializer supports types string, number,
     * and Crdt.  string and number types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are not supported and will cause an
     * error when you attempt to add them; use a custom
     * serializer and deserializer instead, being
     * aware of JS's clunky set semantics (all Objects
     * are stored by-reference only, while naive
     * serialization/deserialization, e.g. with JSON,
     * will create non-equal
     * copies of Objects on other replicas,
     * even if they intuitively correspond to the "same"
     * variable.)
     */
    constructor(parentOrRuntime, id, initialValue, serialize = utils_1.defaultCollectionSerializer, deserialize = utils_1.newDefaultCollectionDeserializer(parentOrRuntime)) {
        let initialState = new LwwState(initialValue, null, -1, null);
        super(parentOrRuntime, id, initialState);
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
    set value(value) {
        let message = proto_compiled_1.LwwMessage.create({
            value: this.serialize(value),
            time: Date.now()
        });
        let buffer = proto_compiled_1.LwwMessage.encode(message).finish();
        super.send(buffer);
    }
    get value() {
        return this.state.value;
    }
    receiveInternal(timestamp, message) {
        try {
            let decoded = proto_compiled_1.LwwMessage.decode(message);
            let value = this.deserialize(decoded.value);
            // See if it's causally greater than the current state
            let vc = timestamp.asVectorClock();
            let overwrite = false;
            if (this.state.sender === null) {
                // Initial element
                overwrite = true;
            }
            else {
                let vcEntry = vc.get(this.state.sender);
                if (vcEntry !== undefined && vcEntry >= this.state.counter) {
                    overwrite = true;
                }
            }
            // If it's concurrent, compare timestamps.  Use
            // arbitrary order on sender as tiebreaker.
            if (!overwrite) {
                if (decoded.time > this.state.time)
                    overwrite = true;
                else if (decoded.time == this.state.time) {
                    overwrite = (timestamp.getSender() > this.state.sender);
                }
            }
            if (overwrite) {
                let changed = (this.state.value !== value);
                this.state.counter = timestamp.getSenderCounter();
                this.state.sender = timestamp.getSender();
                this.state.time = decoded.time;
                this.state.value = value;
                if (changed) {
                    this.dispatchEvent(new LwwEvent(this, timestamp, value, new Date(decoded.time)));
                }
                return changed;
            }
            else
                return false;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }
}
exports.LwwRegister = LwwRegister;
// TODO: make above Crdts optional resettable, with
// settable reset values (either in constructor or via
// a builder pattern).  Perhaps more generally, Crdts
// should allow a reset callback, that gets run locally in
// hardReset (check this is EC).
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
exports.CrdtRuntime = exports.Crdt = void 0;
const proto_compiled_1 = __webpack_require__(/*! ../proto_compiled */ "../client/build/src/proto_compiled.js");
class Crdt {
    /**
     * @param parentOrRuntime A parent for this Crdt, either another
     * Crdt, or the CrdtRuntime if this has no Crdt parent.
     * Typically parent will be the Crdt containing this
     * as an instance variable, or the CrdtRuntime if there is
     * no such Crdt.  Crdts with the same parent share a common
     * namespace and causal consistency group, and the default
     * reset() behavior is to call reset() on each child.
     * Different replicas of a Crdt must be assigned parents
     * which are also replicas of each other.
     * @param id      An id for this Crdt.  All Crdts with the
     * same parent must have distinct ids, and the ids must
     * be the same for all replicas of a given CRDT, in order
     * for the CrdtRuntime to route messages to them properly.
     */
    constructor(parentOrRuntime, id, state) {
        this.isCrdt = true;
        this.children = new Map();
        this.eventListeners = new Map();
        this.inReceiveInternal = false;
        this.id = id;
        this.state = state;
        if ("isCrdt" in parentOrRuntime) {
            this.parent = parentOrRuntime;
            this.runtime = this.parent.runtime;
            this.pathToRoot = [id, ...this.parent.pathToRoot];
            this.rootId = this.parent.rootId;
            this.parent.registerChild(this);
        }
        else {
            this.parent = null;
            this.runtime = parentOrRuntime;
            this.pathToRoot = [];
            this.rootId = id;
            this.runtime.registerRoot(this);
        }
    }
    registerChild(child) {
        this.children.set(child.id, child);
    }
    // TODO: typing, or at least check type exists?
    // TODO: ability to remove listeners?  Look at how DOM does it.
    /**
     * TODO: copy DOM description.
     * @param  type     [description]
     * @param  listener [description]
     * @param  receiveLocal = false  If false, events with isLocal = true
     * are not delivered.
     * @return          [description]
     */
    addEventListener(type, listener, receiveLocal = false) {
        let list = this.eventListeners.get(type);
        if (list === undefined) {
            list = [];
            this.eventListeners.set(type, list);
        }
        list.push([listener, receiveLocal]);
    }
    /**
     * A subclass should call this in a remote method
     * when it has an event
     * it wants to deliver to listeners.
     */
    dispatchEvent(event) {
        let list = this.eventListeners.get(event.type);
        if (list === undefined)
            return;
        for (let [listener, receiveLocal] of list) {
            if (receiveLocal || !event.timestamp.isLocal()) {
                try {
                    listener(event);
                }
                catch (e) { }
            }
        }
    }
    send(message) {
        this.runtime.send(this, message);
    }
    /**
      * Callback used by CrdtRuntime or a parent Crdt.
      * @targetPath: the target Crdt's id followed by
      * the ids of its ancestors in ascending order,
      * excluding the current Crdt.
      * @param timestamp The timestamp of the received message
      * @param message   The received message
      */
    receive(targetPath, timestamp, message) {
        // TODO: use (homebrew?) iterator for targetPath.
        // Make it easy to copy for multiple uses (copying
        // index but not the underlying array).
        let changed = false;
        if (targetPath.length === 0) {
            // We are the target
            changed = this.receiveInternal(timestamp, message);
        }
        else {
            let child = this.children.get(targetPath[targetPath.length - 1]);
            if (child === undefined) {
                // TODO: deliver error somewhere reasonable
                throw new Error("Unknown child: " + targetPath[targetPath.length - 1] +
                    " in: " + JSON.stringify(targetPath) + ", children: " + JSON.stringify([...this.children.keys()]));
            }
            targetPath.length--;
            changed = this.receiveInternalForChild(child, targetPath, timestamp, message);
        }
        // TODO: changed event
        return changed;
    }
    /**
     * Override this to receive messages sent by send
     * on replicas of this crdt (including those sent
     * locally).
     * @param  timestamp  [description]
     * @param  message    [description]
     * @return Whether this Crdt's state was changed, i.e.,
     * CrdtEvent's of type "Change" should be
     * dispatched.
     */
    receiveInternal(_timestamp, _message) {
        throw new Error("Received a message but receiveInternal is not overridden");
    }
    /**
     * Override this to receive messages sent by send
     * on children of this Crdt.
     * The default behavior is to pass the
     * message to child unchanged, by
     * calling child.receive(targetPath, timestamp, message).
     * @param child The child
     * @param  targetPath The targetPath that would normally
     * be delivered to the child, i.e., the ids of the Crdts
     * on the path
     * from the message's ultimate target to child, excluding
     * child.
     * @param  timestamp  [description]
     * @param  message    [description]
     * @return Whether this Crdt's state was changed, i.e.,
     * a CrdtEvent of type "Change" should be
     * dispatched.
     */
    receiveInternalForChild(child, targetPath, timestamp, message) {
        return child.receive(targetPath, timestamp, message);
    }
}
exports.Crdt = Crdt;
// TODO: generic change events from return values
class CrdtRuntime {
    constructor(network) {
        this.network = network;
        this.rootCrdts = new Map();
        this.network.register(this);
    }
    registerRoot(crdt) {
        this.rootCrdts.set(crdt.id, crdt);
    }
    send(sender, message) {
        let timestamp = this.network.getNextTimestamp(sender.rootId);
        // Deliver to self
        // TODO: error handling
        this.rootCrdts.get(sender.rootId).receive(sender.pathToRoot.slice(), timestamp, message);
        let runtimeMessage = proto_compiled_1.CrdtRuntimeMessage.create({
            innerMessage: message,
            pathToRoot: sender.pathToRoot
        });
        let buffer = proto_compiled_1.CrdtRuntimeMessage.encode(runtimeMessage).finish();
        this.network.send(sender.rootId, buffer, timestamp);
    }
    /**
     * Callback for CrdtNetwork.
     */
    receive(group, message, timestamp) {
        try {
            let decoded = proto_compiled_1.CrdtRuntimeMessage.decode(message);
            this.rootCrdts.get(group).receive(decoded.pathToRoot, timestamp, decoded.innerMessage);
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
        }
    }
    getReplicaId() {
        return this.network.getReplicaId();
    }
    getCrdtByReference(rootId, pathToRoot) {
        // TODO: optimize?
        let currentCrdt = this.rootCrdts.get(rootId);
        if (!currentCrdt) {
            throw new Error("Unknown rootId: " + rootId);
        }
        for (let i = pathToRoot.length - 1; i >= 0; i--) {
            currentCrdt = currentCrdt.children.get(pathToRoot[i]);
            if (!currentCrdt) {
                throw new Error("Unknown child: " + pathToRoot[i] +
                    " at index " + i + " in reference: rootId=" +
                    rootId + ", pathToRoot=" + pathToRoot);
            }
        }
        return currentCrdt;
    }
}
exports.CrdtRuntime = CrdtRuntime;
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
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./basic_crdts */ "../client/build/src/crdts/basic_crdts.js"), exports);
__exportStar(__webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js"), exports);
__exportStar(__webpack_require__(/*! ./utils */ "../client/build/src/crdts/utils.js"), exports);
//export * from './json';
//export * from './multi_semidirect';
__exportStar(__webpack_require__(/*! ./resettable */ "../client/build/src/crdts/resettable.js"), exports);
__exportStar(__webpack_require__(/*! ./semidirect */ "../client/build/src/crdts/semidirect.js"), exports);
//export * from './standard';
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../client/build/src/crdts/resettable.js":
/*!***********************************************!*\
  !*** ../client/build/src/crdts/resettable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalResettableSemidirectProduct = exports.OptionalResettableCrdt = exports.ResetWrapperCrdt = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
const semidirect_1 = __webpack_require__(/*! ./semidirect */ "../client/build/src/crdts/semidirect.js");
class ResetComponentMessage extends Uint8Array {
    constructor() {
        super(...arguments);
        this.isResetComponentMessage = true;
        this.replay = [];
    }
}
class ResetComponent extends crdt_core_1.Crdt {
    constructor(parent, id, targetCrdt) {
        super(parent, id, null);
        this.targetCrdt = targetCrdt;
    }
    reset() {
        super.send(new Uint8Array());
    }
    receiveInternal(timestamp, message) {
        this.targetCrdt.hardReset();
        this.parent.dispatchResetEvent(timestamp);
        if ("isResetComponentMessage" in message) {
            // Replay message.replay
            for (let toReplay of message.replay) {
                this.targetCrdt.receive(...toReplay);
            }
        }
        return true;
    }
}
class ResetWrapperCrdt extends semidirect_1.SemidirectProduct {
    /**
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(parentOrRuntime, id, keepOnlyMaximal = false) {
        super(parentOrRuntime, id, true, true, keepOnlyMaximal);
    }
    setupReset(targetCrdt) {
        this.resetComponent = new ResetComponent(this, this.id + "_comp", targetCrdt);
        super.setup(this.resetComponent, targetCrdt, this.action.bind(this), targetCrdt.state);
    }
    action(m2TargetPath, m2Timestamp, m2Message, m1TargetPath, _m1Timestamp, m1Message) {
        if (!("isResetComponentMessage" in m1Message)) {
            m1Message = new ResetComponentMessage();
        }
        m1Message.replay.push([m2TargetPath.slice(), m2Timestamp, m2Message]);
        return [m1TargetPath, m1Message];
    }
    dispatchResetEvent(timestamp) {
        this.dispatchEvent({
            caller: this,
            type: "Reset",
            timestamp: timestamp
        });
    }
    reset() {
        this.resetComponent.reset();
    }
}
exports.ResetWrapperCrdt = ResetWrapperCrdt;
class OptionalResettableCrdt extends crdt_core_1.Crdt {
    /**
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(parentOrRuntime, id, initialState, resettable = true, keepOnlyMaximal = false) {
        if (resettable) {
            let resetWrapperCrdt = new ResetWrapperCrdt(parentOrRuntime, id + "_reset", keepOnlyMaximal);
            super(resetWrapperCrdt, id, initialState);
            this.resetWrapperCrdt = resetWrapperCrdt;
            resetWrapperCrdt.setupReset(this);
            resetWrapperCrdt.addEventListener("Reset", (event) => this.dispatchEvent({
                caller: this,
                type: event.type,
                timestamp: event.timestamp
            }), true);
        }
        else
            super(parentOrRuntime, id, initialState);
        this.resettable = resettable;
    }
    reset() {
        if (this.resettable) {
            this.resetWrapperCrdt.reset();
        }
        else {
            throw new Error("reset() called but resettable is false");
        }
    }
}
exports.OptionalResettableCrdt = OptionalResettableCrdt;
class OptionalResettableSemidirectProduct extends semidirect_1.SemidirectProduct {
    /**
     * For more parameter descriptions, see
     * SemidirectProduct.
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(parentOrRuntime, id, resettable, keepOnlyMaximal = false, historyTimestamps = true, historyDiscard1Dominated = false, historyDiscard2Dominated = false) {
        if (resettable) {
            let resetWrapperCrdt = new ResetWrapperCrdt(parentOrRuntime, id + "_reset", keepOnlyMaximal);
            super(resetWrapperCrdt, id, historyTimestamps, historyDiscard1Dominated, historyDiscard2Dominated);
            this.resetWrapperCrdt = resetWrapperCrdt;
            resetWrapperCrdt.setupReset(this);
            resetWrapperCrdt.addEventListener("Reset", (event) => this.dispatchEvent({
                caller: this,
                type: event.type,
                timestamp: event.timestamp
            }), true);
        }
        else
            super(parentOrRuntime, id, historyTimestamps, historyDiscard1Dominated, historyDiscard2Dominated);
        this.resettable = resettable;
    }
    reset() {
        if (this.resetWrapperCrdt) {
            this.resetWrapperCrdt.reset();
        }
    }
    hardReset() {
        this.state.hardReset();
        this.hardResetInternal();
    }
}
exports.OptionalResettableSemidirectProduct = OptionalResettableSemidirectProduct;
// TODO: reset wins?
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
exports.SemidirectProduct = exports.SemidirectState = void 0;
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
class StoredMessage {
    constructor(senderCounter, receiptCounter, targetPath, timestamp, message) {
        this.senderCounter = senderCounter;
        this.receiptCounter = receiptCounter;
        this.targetPath = targetPath;
        this.timestamp = timestamp;
        this.message = message;
    }
}
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
    constructor(historyTimestamps, historyDiscard1Dominated, historyDiscard2Dominated) {
        this.historyTimestamps = historyTimestamps;
        this.historyDiscard1Dominated = historyDiscard1Dominated;
        this.historyDiscard2Dominated = historyDiscard2Dominated;
        this.receiptCounter = 0;
        /**
         * Maps a replica id to an array of messages sent by that
         * replica, in order.  Keep in mind that per-sender message
         * counters may not be contiguous, since they are shared between
         * all Crdts with a given root.
         */
        this.history = new Map();
    }
    /**
     * Add message to the history with the given timestamp.
     * replicaId is our replica id.
     */
    add(replicaId, targetPath, timestamp, message) {
        if (this.historyDiscard2Dominated) {
            this.processTimestamp(replicaId, timestamp, false, true);
        }
        let senderHistory = this.history.get(timestamp.getSender());
        if (senderHistory === undefined) {
            senderHistory = [];
            this.history.set(timestamp.getSender(), senderHistory);
        }
        senderHistory.push(new StoredMessage(timestamp.getSenderCounter(), this.receiptCounter, targetPath, (this.historyTimestamps ? timestamp : null), message));
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
            // Sort the concurrent messages in receipt order.
            concurrent.sort((a, b) => (a.receiptCounter - b.receiptCounter));
            // Strip away everything except the messages.
            return concurrent;
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
    hardReset() {
        this.receiptCounter = 0;
        this.history.clear();
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
            if (sparseArray[i].senderCounter > value)
                return i;
        }
        return sparseArray.length;
    }
}
exports.SemidirectState = SemidirectState;
class SemidirectProduct extends crdt_core_1.Crdt {
    constructor(parentOrRuntime, id, historyTimestamps = false, historyDiscard1Dominated = false, historyDiscard2Dominated = false) {
        super(parentOrRuntime, id, new SemidirectState(historyTimestamps, historyDiscard1Dominated, historyDiscard2Dominated));
    }
    setup(crdt1, crdt2, action, initialState) {
        this.state.internalState = initialState;
        if (this.children.get(crdt1.id) !== crdt1) {
            throw new Error("crdt1 (" + crdt1.id + ") is not our child" +
                " (is it using a wrapper crdt, e.g., becuase resettable = true?)");
        }
        if (this.children.get(crdt2.id) !== crdt2) {
            throw new Error("crdt2 (" + crdt2.id + ") is not our child" +
                " (is it using a wrapper crdt, e.g., becuase resettable = true?)");
        }
        this.crdt1 = crdt1;
        this.crdt2 = crdt2;
        // @ts-ignore Ignore readonly
        crdt1.state = initialState;
        // @ts-ignore Ignore readonly
        crdt2.state = initialState;
        this.actionVar = action;
    }
    receiveInternalForChild(child, targetPath, timestamp, message) {
        switch (child) {
            case this.crdt2:
                this.state.add(this.runtime.getReplicaId(), targetPath.slice(), timestamp, message);
                return this.crdt2.receive(targetPath, timestamp, message);
            case this.crdt1:
                let concurrent = this.state.getConcurrent(this.runtime.getReplicaId(), timestamp);
                let mAct = [targetPath, message];
                for (let i = 0; i < concurrent.length; i++) {
                    // TODO: can we avoid serializing and
                    // deserializing each time?  Like
                    // with ResetComponent.
                    let mActOrNull = this.actionVar(concurrent[i].targetPath, concurrent[i].timestamp, concurrent[i].message, mAct[0], timestamp, mAct[1]);
                    if (mActOrNull === null)
                        return false;
                    else
                        mAct = mActOrNull;
                }
                return this.crdt1.receive(mAct[0], timestamp, mAct[1]);
            default:
                // Not involved with semidirect product
                return child.receive(targetPath, timestamp, message);
        }
    }
}
exports.SemidirectProduct = SemidirectProduct;
//# sourceMappingURL=semidirect.js.map

/***/ }),

/***/ "../client/build/src/crdts/utils.js":
/*!******************************************!*\
  !*** ../client/build/src/crdts/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.newDefaultCollectionDeserializer = exports.defaultCollectionSerializer = void 0;
const proto_compiled_1 = __webpack_require__(/*! ../proto_compiled */ "../client/build/src/proto_compiled.js");
const crdt_core_1 = __webpack_require__(/*! ./crdt_core */ "../client/build/src/crdts/crdt_core.js");
/**
 * Serializer for string, number, and Crdt types.
 * string and number types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types cause an error.
 */
function defaultCollectionSerializer(value) {
    let message;
    switch (typeof value) {
        case "string":
            message = { stringValue: value };
            break;
        case "number":
            message = { numberValue: value };
            break;
        default:
            if (value instanceof crdt_core_1.Crdt) {
                message = {
                    crdtValue: proto_compiled_1.CrdtReference.create({
                        rootId: value.rootId,
                        pathToRoot: value.pathToRoot
                    })
                };
            }
            else {
                throw new Error("defaultCollectionSerializer only works with values of type string | number | Crdt");
            }
    }
    return proto_compiled_1.DefaultSerializerMessage.encode(message).finish();
}
exports.defaultCollectionSerializer = defaultCollectionSerializer;
/**
 * Returns a deserializer for string, number, and Crdt types.
 * string and number types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types are not supported.
 */
function newDefaultCollectionDeserializer(parentOrRuntime) {
    let runtime;
    if ("isCrdt" in parentOrRuntime)
        runtime = parentOrRuntime.runtime;
    else
        runtime = parentOrRuntime;
    // TODO: how to error if it's not actually T?
    return (message) => defaultCollectionDeserializer(runtime, message);
}
exports.newDefaultCollectionDeserializer = newDefaultCollectionDeserializer;
function defaultCollectionDeserializer(runtime, message) {
    let decoded = proto_compiled_1.DefaultSerializerMessage.decode(message);
    switch (decoded.value) {
        case "stringValue":
            return decoded.stringValue;
        case "numberValue":
            return decoded.numberValue;
        case "crdtValue":
            return runtime.getCrdtByReference(decoded.crdtValue.rootId, decoded.crdtValue.pathToRoot);
        default:
            throw new Error("Bad message format: decoded.value=" + decoded.value);
    }
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../client/build/src/network/crdt_network_interface.js":
/*!*************************************************************!*\
  !*** ../client/build/src/network/crdt_network_interface.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// First attempt at the interface between the runtime
// (causal broadcast network, etc.) and the Crdts.
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=crdt_network_interface.js.map

/***/ }),

/***/ "../client/build/src/network/crdt_network_runtime.js":
/*!***********************************************************!*\
  !*** ../client/build/src/network/crdt_network_runtime.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketNetwork = exports.myMessage = void 0;
const _1 = __webpack_require__(/*! . */ "../client/build/src/network/index.js");
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
    constructor(message, group, timestamp) {
        this.message = message;
        this.group = group;
        this.timestamp = timestamp;
    }
    /**
     * customized toJSON function to convert message as JSON format.
     * TODO: use protobufs.  For now we base64 encode the
     * inner message.
     *
     * @returns package info in JSON format.
     */
    toJSON() {
        return JSON.stringify({ "message": Array.from(this.message.values()),
            "group": this.group,
            "timestamp": {
                "uid": this.timestamp.uid,
                "vectorMap": Array.from(this.timestamp.vectorMap.entries())
            }
        });
    }
}
exports.myMessage = myMessage;
/**
 * WebSocketNetwork:
 *
 * Process initialization when starting a new user node.
 *
 * Communicate with CRDT's runtime and send/receive message via
 * central broadcast server with WebSocket protocol.
 *
 * Perform casuality check to ensure message ordering.
 */
class WebSocketNetwork {
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
            this.messageBuffer.push([myPackage.message, myPackage.group, myPackage.timestamp]);
            this.checkMessageBuffer();
        };
        this.uid = replicaId;
        this.vcMap = new Map();
        this.messageBuffer = new Array();
        this.sendBuffer = new Array();
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
     * Register CrdtRuntime CasualBroadcastNetwork.
     *
     * @param crdtRuntime
     */
    register(crdtRuntime) {
        this.crdtRuntime = crdtRuntime;
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
     * @param group An identifier for the group that
     * this message should be broadcast to.  A group
     * encompasses both a set of replicas and a unit
     * of causal consistency, i.e., messages should
     * be causally consistent within a group but need
     * not be across groups.
     * @param message The message to send
     * @param timestamp The CausalTimestamp returned by the
     * last call to getNextTimestamp(group).
     */
    send(group, message, timestamp) {
        let vc = timestamp;
        this.vcMap.set(group, vc);
        let myPackage = new myMessage(message, group, vc);
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
    getNextTimestamp(group) {
        // Copy a new vector clock.
        let vc = this.vcMap.get(group);
        if (!vc) {
            vc = new _1.VectorClock(this.uid, true);
            this.vcMap.set(group, vc);
        }
        let vcCopy = new _1.VectorClock(this.uid, true);
        vcCopy.vectorMap = new Map(vc.asVectorClock());
        // Update the timestamp of this replica with next value.
        vcCopy.increment();
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
        let vc = new _1.VectorClock(dataJSON.timestamp.uid, this.uid === dataJSON.timestamp.uid);
        vc.vectorMap = new Map(dataJSON.timestamp.vectorMap);
        let message = Uint8Array.from(dataJSON.message);
        let myPackage = new myMessage(message, dataJSON.group, vc);
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
        let index = this.messageBuffer.length - 1;
        while (index >= 0) {
            let group = this.messageBuffer[index][1];
            let curVectorClock = this.messageBuffer[index][2];
            let myVectorClock = this.vcMap.get(group);
            if (!myVectorClock) {
                myVectorClock = new _1.VectorClock(this.uid, true);
                this.vcMap.set(group, myVectorClock);
            }
            if (myVectorClock.isready(curVectorClock)) {
                /**
                 * Send back the received messages to crdtRuntime.

                 */
                this.crdtRuntime.receive(this.messageBuffer[index][1], this.messageBuffer[index][0], this.messageBuffer[index][2]);
                myVectorClock.incrementSender(curVectorClock);
                this.messageBuffer.splice(index, 1);
            }
            index--;
        }
    }
}
exports.WebSocketNetwork = WebSocketNetwork;
//# sourceMappingURL=crdt_network_runtime.js.map

/***/ }),

/***/ "../client/build/src/network/crdt_network_webrtc_runtime.js":
/*!******************************************************************!*\
  !*** ../client/build/src/network/crdt_network_webrtc_runtime.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRtcNetwork = void 0;
const _1 = __webpack_require__(/*! . */ "../client/build/src/network/index.js");
const crdts_1 = __webpack_require__(/*! ../crdts */ "../client/build/src/crdts/index.js");
const crdt_network_runtime_1 = __webpack_require__(/*! ./crdt_network_runtime */ "../client/build/src/network/crdt_network_runtime.js");
// The webrtc network designed for a two-way interactive
// communication session among two users using WebRtc.
//
// Also ensure the order of delivery with casuality check.
/**
 * WebRtcNetwork:
 *
 * Process initialization when starting a new user node.
 *
 * Communicate with CRDT's runtime and send/receive message via
 * central server with WebSocket protocol to exchange signals.
 * Then create channels for peer-to-peer communications by using
 * WebRtc
 *
 * Perform casuality check to ensure message ordering.
 */
class WebRtcNetwork {
    constructor(replicaId, webSocketArgs) {
        /**
         * Check if the send message buffer has any message waiting to be sent.
         * If there exist, then send it via WebSocket and remove the item from buffer.
         * If not, then wait a customized time period and check again.
         */
        this.sendWebSocketData = () => {
            let index = 0;
            while (index < this.sendBuffer.length) {
                console.log(this.sendBuffer[index]);
                this.ws.send(JSON.stringify(this.sendBuffer[index]));
                index++;
            }
            this.sendBuffer = new Array();
        };
        /**
         * Parse JSON format signal message and check signal message type.
         * Jump to the corresponding signal handler for further steps to
         * build WebRtc channel.
         *
         * @param msg the JSON format data send via network.
         */
        this.receiveAction = (msg) => {
            console.log("Got message", msg.data);
            var data = JSON.parse(msg.data);
            switch (data.type) {
                case "register":
                    this.handleRegister(data.success);
                    break;
                case "connect":
                    this.handleConnect(data.users);
                    break;
                case "offer":
                    this.handleOffer(data.offer, data.requestName);
                    break;
                case "answer":
                    this.handleAnswer(data.answer);
                    break;
                case "candidate":
                    this.handleCandidate(data.candidate);
                    break;
                case "leave":
                    this.handleLeave();
                    break;
                default:
                    break;
            }
        };
        /**
         * Handle icecandidate event when an RTCIceCandidate has been
         * identified and added to the local peer by a call.
         * Send signal message to the central server.
         *
         * @param event Ice candidate event that should be handled
         */
        this.handleIceCandidate = (event) => {
            if (event.candidate != null) {
                this.sendSignalingMessage({
                    type: "candidate",
                    candidate: event.candidate,
                    name: this.userName
                });
            }
        };
        this.peerRtcReceiveMessage = (event) => {
            let receiveChannel = event.channel;
            console.log(receiveChannel);
            receiveChannel.addEventListener("message", this.dataChanelReceiveMsg);
        };
        this.dataChanelReceiveMsg = (event) => {
            console.log(event.data);
            let myPackage = this.parseJSON(event.data);
            this.messageBuffer.push([myPackage.message, myPackage.group, myPackage.timestamp]);
            this.checkMessageBuffer();
        };
        this.sendWebRtcData = () => {
            console.log("The data channel is open");
            let index = 0;
            while (index < this.dataBuffer.length) {
                console.log(this.dataBuffer[index]);
                this.dataChannel.send(this.dataBuffer[index].toJSON());
                index++;
            }
            this.dataBuffer = new Array();
        };
        this.uid = replicaId;
        this.vcMap = new Map();
        this.messageBuffer = new Array();
        this.sendBuffer = new Array();
        this.dataBuffer = new Array();
        this.userName = "";
        /**
         * Open WebSocket connection with server.
         * Register EventListener with corresponding event handler.
         */
        this.ws = new WebSocket(webSocketArgs);
        this.ws.addEventListener('open', this.sendWebSocketData);
        this.ws.addEventListener('message', this.receiveAction);
        /**
        * Open WebRtc peer connection.
        * Register EventListener with corresponding event handler.
        */
        let configuration = {
            "iceServers": [{ "urls": "stun:stun2.1.google.com:19302" }]
        };
        this.peerRtc = new RTCPeerConnection(configuration);
        this.peerRtc.addEventListener('icecandidate', this.handleIceCandidate);
        this.peerRtc.addEventListener('datachannel', this.peerRtcReceiveMessage);
    }
    /**
     * Send signal message in JSON format by using WebSocket
     *
     * @param message the JSON format data send via network
     */
    sendSignalingMessage(message) {
        message.webRtc = true;
        if (this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(message));
        }
        else {
            this.sendBuffer.push(message);
        }
    }
    /**
     * Handle register signal sent back from the central server.
     * Check if login successfully or not.
     *
     * @param successStatus A register status sent back from the server.
     */
    handleRegister(successStatus) {
        if (successStatus == false) {
            console.log("Register failed: duplicate CRDT id.");
        }
        else {
            console.log("Register successfully in server.");
        }
    }
    /**
     * Handle connect signal sent from the central server.
     * Create an offer and send it to the requested user.
     *
     * @param users An array of users that shared a same CRDTs.
     */
    handleConnect(users) {
        // This loop is to check the correct user to connect.
        // Design for the multiple users.
        // TODO: Complete multiple users connection built.
        let index = 0;
        while (index < users.length) {
            if (users[index] != this.uid) {
                this.userName = users[index];
                break;
            }
            index++;
        }
        // Create an offer to build WebRtc connection.
        // Set offer as the local descrition.
        this.peerRtc.createOffer().then((offer) => {
            this.sendSignalingMessage({
                type: "offer",
                name: this.userName,
                offer: offer,
                requestName: this.uid
            });
            this.peerRtc.setLocalDescription(offer);
        });
    }
    /**
     * Handle offer signal sent from the server.
     * Create an answer as a response and send the answer to the server.
     *
     * @param offer The offer received from the central server.
     * @param name The name of a user who sends this offer.
     */
    handleOffer(offer, name) {
        this.userName = name;
        this.peerRtc.setRemoteDescription(new RTCSessionDescription(offer));
        this.peerRtc.createAnswer().then((answer) => {
            this.sendSignalingMessage({
                type: "answer",
                name: this.userName,
                answer: answer
            });
            this.peerRtc.setLocalDescription(answer);
        });
    }
    ;
    /**
     * Handle answer signal sent from the central server.
     * Setup remote description by using the answer.
     *
     * @param answer The answer received from the central server.
     */
    handleAnswer(answer) {
        this.peerRtc.setRemoteDescription(new RTCSessionDescription(answer));
    }
    ;
    handleCandidate(candidate) {
        this.peerRtc.addIceCandidate(new RTCIceCandidate(candidate))
            .catch(e => console.error(e));
    }
    ;
    handleLeave() {
        this.peerRtc.close();
        this.peerRtc.onicecandidate = null;
    }
    ;
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
     * Register newly created crdt with its ID and corresponding message
     * listener on CasualBroadcastNetwork.
     *
     * @param crdtMessageListener the message listener of each crdt.
     * @param crdtId the ID of each crdt.
     *
     */
    register(crdtRuntime) {
        this.crdtRuntime = crdtRuntime;
        this.sendSignalingMessage({
            type: "register",
            name: this.uid,
            crdtName: crdts_1.CrdtRuntime.name
        });
        console.log("Create dataChnnel");
        this.dataChannel = this.peerRtc.createDataChannel("channel1");
        this.dataChannel.onerror = function (error) {
            console.log("Errors: ", error);
        };
        this.dataChannel.addEventListener("open", this.sendWebRtcData);
        this.dataChannel.onclose = function () {
            console.log("data channel is closed");
        };
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
    send(group, message, timestamp) {
        // Check if the crdtId exist in the map.
        let vc = timestamp;
        this.vcMap.set(group, vc);
        let myPackage = new crdt_network_runtime_1.myMessage(message, group, vc);
        if (this.dataChannel.readyState == "open") {
            this.dataChannel.send(myPackage.toJSON());
        }
        else {
            this.dataBuffer.push(myPackage);
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
    getNextTimestamp(group) {
        // Copy a new vector clock.
        let vc = this.vcMap.get(group);
        if (!vc) {
            vc = new _1.VectorClock(this.uid, true);
            this.vcMap.set(group, vc);
        }
        let vcCopy = new _1.VectorClock(this.uid, true);
        vcCopy.vectorMap = new Map(vc.asVectorClock());
        // Update the timestamp of this replica with next value.
        vcCopy.increment();
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
        let vc = new _1.VectorClock(dataJSON.timestamp.uid, this.uid === dataJSON.timestamp.uid);
        vc.vectorMap = new Map(dataJSON.timestamp.vectorMap);
        let message = Uint8Array.from(dataJSON.message);
        let myPackage = new crdt_network_runtime_1.myMessage(message, dataJSON.group, vc);
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
        let index = this.messageBuffer.length - 1;
        while (index >= 0) {
            let group = this.messageBuffer[index][1];
            let curVectorClock = this.messageBuffer[index][2];
            let myVectorClock = this.vcMap.get(group);
            if (!myVectorClock) {
                myVectorClock = new _1.VectorClock(this.uid, true);
                this.vcMap.set(group, myVectorClock);
            }
            if (myVectorClock.isready(curVectorClock)) {
                /**
                 * Send back the received messages to crdtRuntime.

                 */
                this.crdtRuntime.receive(this.messageBuffer[index][1], this.messageBuffer[index][0], this.messageBuffer[index][2]);
                myVectorClock.incrementSender(curVectorClock);
                this.messageBuffer.splice(index, 1);
            }
            index--;
        }
    }
}
exports.WebRtcNetwork = WebRtcNetwork;
//# sourceMappingURL=crdt_network_webrtc_runtime.js.map

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
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./crdt_network_interface */ "../client/build/src/network/crdt_network_interface.js"), exports);
__exportStar(__webpack_require__(/*! ./crdt_network_runtime */ "../client/build/src/network/crdt_network_runtime.js"), exports);
__exportStar(__webpack_require__(/*! ./crdt_network_webrtc_runtime */ "../client/build/src/network/crdt_network_webrtc_runtime.js"), exports);
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
    constructor(replicaId, local) {
        this.uid = replicaId;
        this.local = local;
        this.vectorMap = new Map();
        this.vectorMap.set(this.uid, 0);
    }
    /**
     * @returns the unique ID for this replica(replicaId).
     */
    getSender() {
        return this.uid;
    }
    isLocal() {
        return this.local;
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

/***/ "../client/build/src/proto_compiled.js":
/*!*********************************************!*\
  !*** ../client/build/src/proto_compiled.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/


var $protobuf = __webpack_require__(/*! protobufjs/minimal */ "../client/node_modules/protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.GMapMessage = (function() {

    /**
     * Properties of a GMapMessage.
     * @exports IGMapMessage
     * @interface IGMapMessage
     * @property {Uint8Array} keyToInit GMapMessage keyToInit
     */

    /**
     * Constructs a new GMapMessage.
     * @exports GMapMessage
     * @classdesc Represents a GMapMessage.
     * @implements IGMapMessage
     * @constructor
     * @param {IGMapMessage=} [properties] Properties to set
     */
    function GMapMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GMapMessage keyToInit.
     * @member {Uint8Array} keyToInit
     * @memberof GMapMessage
     * @instance
     */
    GMapMessage.prototype.keyToInit = $util.newBuffer([]);

    /**
     * Creates a new GMapMessage instance using the specified properties.
     * @function create
     * @memberof GMapMessage
     * @static
     * @param {IGMapMessage=} [properties] Properties to set
     * @returns {GMapMessage} GMapMessage instance
     */
    GMapMessage.create = function create(properties) {
        return new GMapMessage(properties);
    };

    /**
     * Encodes the specified GMapMessage message. Does not implicitly {@link GMapMessage.verify|verify} messages.
     * @function encode
     * @memberof GMapMessage
     * @static
     * @param {IGMapMessage} message GMapMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GMapMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.keyToInit);
        return writer;
    };

    /**
     * Encodes the specified GMapMessage message, length delimited. Does not implicitly {@link GMapMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GMapMessage
     * @static
     * @param {IGMapMessage} message GMapMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GMapMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GMapMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GMapMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GMapMessage} GMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GMapMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GMapMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.keyToInit = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("keyToInit"))
            throw $util.ProtocolError("missing required 'keyToInit'", { instance: message });
        return message;
    };

    /**
     * Decodes a GMapMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GMapMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GMapMessage} GMapMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GMapMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GMapMessage message.
     * @function verify
     * @memberof GMapMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GMapMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.keyToInit && typeof message.keyToInit.length === "number" || $util.isString(message.keyToInit)))
            return "keyToInit: buffer expected";
        return null;
    };

    /**
     * Creates a GMapMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GMapMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GMapMessage} GMapMessage
     */
    GMapMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GMapMessage)
            return object;
        var message = new $root.GMapMessage();
        if (object.keyToInit != null)
            if (typeof object.keyToInit === "string")
                $util.base64.decode(object.keyToInit, message.keyToInit = $util.newBuffer($util.base64.length(object.keyToInit)), 0);
            else if (object.keyToInit.length)
                message.keyToInit = object.keyToInit;
        return message;
    };

    /**
     * Creates a plain object from a GMapMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GMapMessage
     * @static
     * @param {GMapMessage} message GMapMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GMapMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.keyToInit = "";
            else {
                object.keyToInit = [];
                if (options.bytes !== Array)
                    object.keyToInit = $util.newBuffer(object.keyToInit);
            }
        if (message.keyToInit != null && message.hasOwnProperty("keyToInit"))
            object.keyToInit = options.bytes === String ? $util.base64.encode(message.keyToInit, 0, message.keyToInit.length) : options.bytes === Array ? Array.prototype.slice.call(message.keyToInit) : message.keyToInit;
        return object;
    };

    /**
     * Converts this GMapMessage to JSON.
     * @function toJSON
     * @memberof GMapMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GMapMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GMapMessage;
})();

$root.RuntimeGeneratorMessage = (function() {

    /**
     * Properties of a RuntimeGeneratorMessage.
     * @exports IRuntimeGeneratorMessage
     * @interface IRuntimeGeneratorMessage
     * @property {Uint8Array} message RuntimeGeneratorMessage message
     * @property {string} uniqueId RuntimeGeneratorMessage uniqueId
     */

    /**
     * Constructs a new RuntimeGeneratorMessage.
     * @exports RuntimeGeneratorMessage
     * @classdesc Represents a RuntimeGeneratorMessage.
     * @implements IRuntimeGeneratorMessage
     * @constructor
     * @param {IRuntimeGeneratorMessage=} [properties] Properties to set
     */
    function RuntimeGeneratorMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RuntimeGeneratorMessage message.
     * @member {Uint8Array} message
     * @memberof RuntimeGeneratorMessage
     * @instance
     */
    RuntimeGeneratorMessage.prototype.message = $util.newBuffer([]);

    /**
     * RuntimeGeneratorMessage uniqueId.
     * @member {string} uniqueId
     * @memberof RuntimeGeneratorMessage
     * @instance
     */
    RuntimeGeneratorMessage.prototype.uniqueId = "";

    /**
     * Creates a new RuntimeGeneratorMessage instance using the specified properties.
     * @function create
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {IRuntimeGeneratorMessage=} [properties] Properties to set
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage instance
     */
    RuntimeGeneratorMessage.create = function create(properties) {
        return new RuntimeGeneratorMessage(properties);
    };

    /**
     * Encodes the specified RuntimeGeneratorMessage message. Does not implicitly {@link RuntimeGeneratorMessage.verify|verify} messages.
     * @function encode
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {IRuntimeGeneratorMessage} message RuntimeGeneratorMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeGeneratorMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.message);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.uniqueId);
        return writer;
    };

    /**
     * Encodes the specified RuntimeGeneratorMessage message, length delimited. Does not implicitly {@link RuntimeGeneratorMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {IRuntimeGeneratorMessage} message RuntimeGeneratorMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RuntimeGeneratorMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RuntimeGeneratorMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeGeneratorMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RuntimeGeneratorMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.message = reader.bytes();
                break;
            case 2:
                message.uniqueId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("message"))
            throw $util.ProtocolError("missing required 'message'", { instance: message });
        if (!message.hasOwnProperty("uniqueId"))
            throw $util.ProtocolError("missing required 'uniqueId'", { instance: message });
        return message;
    };

    /**
     * Decodes a RuntimeGeneratorMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RuntimeGeneratorMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RuntimeGeneratorMessage message.
     * @function verify
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RuntimeGeneratorMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
            return "message: buffer expected";
        if (!$util.isString(message.uniqueId))
            return "uniqueId: string expected";
        return null;
    };

    /**
     * Creates a RuntimeGeneratorMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RuntimeGeneratorMessage} RuntimeGeneratorMessage
     */
    RuntimeGeneratorMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.RuntimeGeneratorMessage)
            return object;
        var message = new $root.RuntimeGeneratorMessage();
        if (object.message != null)
            if (typeof object.message === "string")
                $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
            else if (object.message.length)
                message.message = object.message;
        if (object.uniqueId != null)
            message.uniqueId = String(object.uniqueId);
        return message;
    };

    /**
     * Creates a plain object from a RuntimeGeneratorMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RuntimeGeneratorMessage
     * @static
     * @param {RuntimeGeneratorMessage} message RuntimeGeneratorMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RuntimeGeneratorMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.message = "";
            else {
                object.message = [];
                if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message);
            }
            object.uniqueId = "";
        }
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId"))
            object.uniqueId = message.uniqueId;
        return object;
    };

    /**
     * Converts this RuntimeGeneratorMessage to JSON.
     * @function toJSON
     * @memberof RuntimeGeneratorMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RuntimeGeneratorMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RuntimeGeneratorMessage;
})();

$root.CrdtReference = (function() {

    /**
     * Properties of a CrdtReference.
     * @exports ICrdtReference
     * @interface ICrdtReference
     * @property {string} rootId CrdtReference rootId
     * @property {Array.<string>|null} [pathToRoot] CrdtReference pathToRoot
     */

    /**
     * Constructs a new CrdtReference.
     * @exports CrdtReference
     * @classdesc Represents a CrdtReference.
     * @implements ICrdtReference
     * @constructor
     * @param {ICrdtReference=} [properties] Properties to set
     */
    function CrdtReference(properties) {
        this.pathToRoot = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CrdtReference rootId.
     * @member {string} rootId
     * @memberof CrdtReference
     * @instance
     */
    CrdtReference.prototype.rootId = "";

    /**
     * CrdtReference pathToRoot.
     * @member {Array.<string>} pathToRoot
     * @memberof CrdtReference
     * @instance
     */
    CrdtReference.prototype.pathToRoot = $util.emptyArray;

    /**
     * Creates a new CrdtReference instance using the specified properties.
     * @function create
     * @memberof CrdtReference
     * @static
     * @param {ICrdtReference=} [properties] Properties to set
     * @returns {CrdtReference} CrdtReference instance
     */
    CrdtReference.create = function create(properties) {
        return new CrdtReference(properties);
    };

    /**
     * Encodes the specified CrdtReference message. Does not implicitly {@link CrdtReference.verify|verify} messages.
     * @function encode
     * @memberof CrdtReference
     * @static
     * @param {ICrdtReference} message CrdtReference message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtReference.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.rootId);
        if (message.pathToRoot != null && message.pathToRoot.length)
            for (var i = 0; i < message.pathToRoot.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pathToRoot[i]);
        return writer;
    };

    /**
     * Encodes the specified CrdtReference message, length delimited. Does not implicitly {@link CrdtReference.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CrdtReference
     * @static
     * @param {ICrdtReference} message CrdtReference message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtReference.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CrdtReference message from the specified reader or buffer.
     * @function decode
     * @memberof CrdtReference
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CrdtReference} CrdtReference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtReference.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CrdtReference();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.rootId = reader.string();
                break;
            case 2:
                if (!(message.pathToRoot && message.pathToRoot.length))
                    message.pathToRoot = [];
                message.pathToRoot.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("rootId"))
            throw $util.ProtocolError("missing required 'rootId'", { instance: message });
        return message;
    };

    /**
     * Decodes a CrdtReference message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CrdtReference
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CrdtReference} CrdtReference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtReference.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CrdtReference message.
     * @function verify
     * @memberof CrdtReference
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CrdtReference.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.rootId))
            return "rootId: string expected";
        if (message.pathToRoot != null && message.hasOwnProperty("pathToRoot")) {
            if (!Array.isArray(message.pathToRoot))
                return "pathToRoot: array expected";
            for (var i = 0; i < message.pathToRoot.length; ++i)
                if (!$util.isString(message.pathToRoot[i]))
                    return "pathToRoot: string[] expected";
        }
        return null;
    };

    /**
     * Creates a CrdtReference message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CrdtReference
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CrdtReference} CrdtReference
     */
    CrdtReference.fromObject = function fromObject(object) {
        if (object instanceof $root.CrdtReference)
            return object;
        var message = new $root.CrdtReference();
        if (object.rootId != null)
            message.rootId = String(object.rootId);
        if (object.pathToRoot) {
            if (!Array.isArray(object.pathToRoot))
                throw TypeError(".CrdtReference.pathToRoot: array expected");
            message.pathToRoot = [];
            for (var i = 0; i < object.pathToRoot.length; ++i)
                message.pathToRoot[i] = String(object.pathToRoot[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a CrdtReference message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CrdtReference
     * @static
     * @param {CrdtReference} message CrdtReference
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CrdtReference.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.pathToRoot = [];
        if (options.defaults)
            object.rootId = "";
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            object.rootId = message.rootId;
        if (message.pathToRoot && message.pathToRoot.length) {
            object.pathToRoot = [];
            for (var j = 0; j < message.pathToRoot.length; ++j)
                object.pathToRoot[j] = message.pathToRoot[j];
        }
        return object;
    };

    /**
     * Converts this CrdtReference to JSON.
     * @function toJSON
     * @memberof CrdtReference
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CrdtReference.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CrdtReference;
})();

$root.DefaultSerializerMessage = (function() {

    /**
     * Properties of a DefaultSerializerMessage.
     * @exports IDefaultSerializerMessage
     * @interface IDefaultSerializerMessage
     * @property {string|null} [stringValue] DefaultSerializerMessage stringValue
     * @property {number|null} [numberValue] DefaultSerializerMessage numberValue
     * @property {ICrdtReference|null} [crdtValue] DefaultSerializerMessage crdtValue
     */

    /**
     * Constructs a new DefaultSerializerMessage.
     * @exports DefaultSerializerMessage
     * @classdesc Represents a DefaultSerializerMessage.
     * @implements IDefaultSerializerMessage
     * @constructor
     * @param {IDefaultSerializerMessage=} [properties] Properties to set
     */
    function DefaultSerializerMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DefaultSerializerMessage stringValue.
     * @member {string} stringValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.stringValue = "";

    /**
     * DefaultSerializerMessage numberValue.
     * @member {number} numberValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.numberValue = 0;

    /**
     * DefaultSerializerMessage crdtValue.
     * @member {ICrdtReference|null|undefined} crdtValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.crdtValue = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * DefaultSerializerMessage value.
     * @member {"stringValue"|"numberValue"|"crdtValue"|undefined} value
     * @memberof DefaultSerializerMessage
     * @instance
     */
    Object.defineProperty(DefaultSerializerMessage.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["stringValue", "numberValue", "crdtValue"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new DefaultSerializerMessage instance using the specified properties.
     * @function create
     * @memberof DefaultSerializerMessage
     * @static
     * @param {IDefaultSerializerMessage=} [properties] Properties to set
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage instance
     */
    DefaultSerializerMessage.create = function create(properties) {
        return new DefaultSerializerMessage(properties);
    };

    /**
     * Encodes the specified DefaultSerializerMessage message. Does not implicitly {@link DefaultSerializerMessage.verify|verify} messages.
     * @function encode
     * @memberof DefaultSerializerMessage
     * @static
     * @param {IDefaultSerializerMessage} message DefaultSerializerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultSerializerMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringValue);
        if (message.numberValue != null && Object.hasOwnProperty.call(message, "numberValue"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.numberValue);
        if (message.crdtValue != null && Object.hasOwnProperty.call(message, "crdtValue"))
            $root.CrdtReference.encode(message.crdtValue, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DefaultSerializerMessage message, length delimited. Does not implicitly {@link DefaultSerializerMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DefaultSerializerMessage
     * @static
     * @param {IDefaultSerializerMessage} message DefaultSerializerMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DefaultSerializerMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DefaultSerializerMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DefaultSerializerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultSerializerMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DefaultSerializerMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.stringValue = reader.string();
                break;
            case 2:
                message.numberValue = reader.double();
                break;
            case 3:
                message.crdtValue = $root.CrdtReference.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DefaultSerializerMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DefaultSerializerMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DefaultSerializerMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DefaultSerializerMessage message.
     * @function verify
     * @memberof DefaultSerializerMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DefaultSerializerMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
            properties.value = 1;
            if (!$util.isString(message.stringValue))
                return "stringValue: string expected";
        }
        if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.numberValue !== "number")
                return "numberValue: number expected";
        }
        if (message.crdtValue != null && message.hasOwnProperty("crdtValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.CrdtReference.verify(message.crdtValue);
                if (error)
                    return "crdtValue." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DefaultSerializerMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DefaultSerializerMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DefaultSerializerMessage} DefaultSerializerMessage
     */
    DefaultSerializerMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.DefaultSerializerMessage)
            return object;
        var message = new $root.DefaultSerializerMessage();
        if (object.stringValue != null)
            message.stringValue = String(object.stringValue);
        if (object.numberValue != null)
            message.numberValue = Number(object.numberValue);
        if (object.crdtValue != null) {
            if (typeof object.crdtValue !== "object")
                throw TypeError(".DefaultSerializerMessage.crdtValue: object expected");
            message.crdtValue = $root.CrdtReference.fromObject(object.crdtValue);
        }
        return message;
    };

    /**
     * Creates a plain object from a DefaultSerializerMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DefaultSerializerMessage
     * @static
     * @param {DefaultSerializerMessage} message DefaultSerializerMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DefaultSerializerMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
            object.stringValue = message.stringValue;
            if (options.oneofs)
                object.value = "stringValue";
        }
        if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
            object.numberValue = options.json && !isFinite(message.numberValue) ? String(message.numberValue) : message.numberValue;
            if (options.oneofs)
                object.value = "numberValue";
        }
        if (message.crdtValue != null && message.hasOwnProperty("crdtValue")) {
            object.crdtValue = $root.CrdtReference.toObject(message.crdtValue, options);
            if (options.oneofs)
                object.value = "crdtValue";
        }
        return object;
    };

    /**
     * Converts this DefaultSerializerMessage to JSON.
     * @function toJSON
     * @memberof DefaultSerializerMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DefaultSerializerMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DefaultSerializerMessage;
})();

$root.CounterMessage = (function() {

    /**
     * Properties of a CounterMessage.
     * @exports ICounterMessage
     * @interface ICounterMessage
     * @property {number} toAdd CounterMessage toAdd
     */

    /**
     * Constructs a new CounterMessage.
     * @exports CounterMessage
     * @classdesc Represents a CounterMessage.
     * @implements ICounterMessage
     * @constructor
     * @param {ICounterMessage=} [properties] Properties to set
     */
    function CounterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CounterMessage toAdd.
     * @member {number} toAdd
     * @memberof CounterMessage
     * @instance
     */
    CounterMessage.prototype.toAdd = 0;

    /**
     * Creates a new CounterMessage instance using the specified properties.
     * @function create
     * @memberof CounterMessage
     * @static
     * @param {ICounterMessage=} [properties] Properties to set
     * @returns {CounterMessage} CounterMessage instance
     */
    CounterMessage.create = function create(properties) {
        return new CounterMessage(properties);
    };

    /**
     * Encodes the specified CounterMessage message. Does not implicitly {@link CounterMessage.verify|verify} messages.
     * @function encode
     * @memberof CounterMessage
     * @static
     * @param {ICounterMessage} message CounterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CounterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 1 =*/9).double(message.toAdd);
        return writer;
    };

    /**
     * Encodes the specified CounterMessage message, length delimited. Does not implicitly {@link CounterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CounterMessage
     * @static
     * @param {ICounterMessage} message CounterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CounterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CounterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof CounterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CounterMessage} CounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CounterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CounterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toAdd = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toAdd"))
            throw $util.ProtocolError("missing required 'toAdd'", { instance: message });
        return message;
    };

    /**
     * Decodes a CounterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CounterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CounterMessage} CounterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CounterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CounterMessage message.
     * @function verify
     * @memberof CounterMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CounterMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.toAdd !== "number")
            return "toAdd: number expected";
        return null;
    };

    /**
     * Creates a CounterMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CounterMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CounterMessage} CounterMessage
     */
    CounterMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.CounterMessage)
            return object;
        var message = new $root.CounterMessage();
        if (object.toAdd != null)
            message.toAdd = Number(object.toAdd);
        return message;
    };

    /**
     * Creates a plain object from a CounterMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CounterMessage
     * @static
     * @param {CounterMessage} message CounterMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CounterMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.toAdd = 0;
        if (message.toAdd != null && message.hasOwnProperty("toAdd"))
            object.toAdd = options.json && !isFinite(message.toAdd) ? String(message.toAdd) : message.toAdd;
        return object;
    };

    /**
     * Converts this CounterMessage to JSON.
     * @function toJSON
     * @memberof CounterMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CounterMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CounterMessage;
})();

$root.MultRegisterMessage = (function() {

    /**
     * Properties of a MultRegisterMessage.
     * @exports IMultRegisterMessage
     * @interface IMultRegisterMessage
     * @property {number} toMult MultRegisterMessage toMult
     */

    /**
     * Constructs a new MultRegisterMessage.
     * @exports MultRegisterMessage
     * @classdesc Represents a MultRegisterMessage.
     * @implements IMultRegisterMessage
     * @constructor
     * @param {IMultRegisterMessage=} [properties] Properties to set
     */
    function MultRegisterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MultRegisterMessage toMult.
     * @member {number} toMult
     * @memberof MultRegisterMessage
     * @instance
     */
    MultRegisterMessage.prototype.toMult = 0;

    /**
     * Creates a new MultRegisterMessage instance using the specified properties.
     * @function create
     * @memberof MultRegisterMessage
     * @static
     * @param {IMultRegisterMessage=} [properties] Properties to set
     * @returns {MultRegisterMessage} MultRegisterMessage instance
     */
    MultRegisterMessage.create = function create(properties) {
        return new MultRegisterMessage(properties);
    };

    /**
     * Encodes the specified MultRegisterMessage message. Does not implicitly {@link MultRegisterMessage.verify|verify} messages.
     * @function encode
     * @memberof MultRegisterMessage
     * @static
     * @param {IMultRegisterMessage} message MultRegisterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MultRegisterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 1 =*/9).double(message.toMult);
        return writer;
    };

    /**
     * Encodes the specified MultRegisterMessage message, length delimited. Does not implicitly {@link MultRegisterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MultRegisterMessage
     * @static
     * @param {IMultRegisterMessage} message MultRegisterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MultRegisterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MultRegisterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MultRegisterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MultRegisterMessage} MultRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MultRegisterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MultRegisterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toMult = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toMult"))
            throw $util.ProtocolError("missing required 'toMult'", { instance: message });
        return message;
    };

    /**
     * Decodes a MultRegisterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MultRegisterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MultRegisterMessage} MultRegisterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MultRegisterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MultRegisterMessage message.
     * @function verify
     * @memberof MultRegisterMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MultRegisterMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (typeof message.toMult !== "number")
            return "toMult: number expected";
        return null;
    };

    /**
     * Creates a MultRegisterMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MultRegisterMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MultRegisterMessage} MultRegisterMessage
     */
    MultRegisterMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MultRegisterMessage)
            return object;
        var message = new $root.MultRegisterMessage();
        if (object.toMult != null)
            message.toMult = Number(object.toMult);
        return message;
    };

    /**
     * Creates a plain object from a MultRegisterMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MultRegisterMessage
     * @static
     * @param {MultRegisterMessage} message MultRegisterMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MultRegisterMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.toMult = 0;
        if (message.toMult != null && message.hasOwnProperty("toMult"))
            object.toMult = options.json && !isFinite(message.toMult) ? String(message.toMult) : message.toMult;
        return object;
    };

    /**
     * Converts this MultRegisterMessage to JSON.
     * @function toJSON
     * @memberof MultRegisterMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MultRegisterMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MultRegisterMessage;
})();

$root.GSetMessage = (function() {

    /**
     * Properties of a GSetMessage.
     * @exports IGSetMessage
     * @interface IGSetMessage
     * @property {Uint8Array} toAdd GSetMessage toAdd
     */

    /**
     * Constructs a new GSetMessage.
     * @exports GSetMessage
     * @classdesc Represents a GSetMessage.
     * @implements IGSetMessage
     * @constructor
     * @param {IGSetMessage=} [properties] Properties to set
     */
    function GSetMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GSetMessage toAdd.
     * @member {Uint8Array} toAdd
     * @memberof GSetMessage
     * @instance
     */
    GSetMessage.prototype.toAdd = $util.newBuffer([]);

    /**
     * Creates a new GSetMessage instance using the specified properties.
     * @function create
     * @memberof GSetMessage
     * @static
     * @param {IGSetMessage=} [properties] Properties to set
     * @returns {GSetMessage} GSetMessage instance
     */
    GSetMessage.create = function create(properties) {
        return new GSetMessage(properties);
    };

    /**
     * Encodes the specified GSetMessage message. Does not implicitly {@link GSetMessage.verify|verify} messages.
     * @function encode
     * @memberof GSetMessage
     * @static
     * @param {IGSetMessage} message GSetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GSetMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.toAdd);
        return writer;
    };

    /**
     * Encodes the specified GSetMessage message, length delimited. Does not implicitly {@link GSetMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GSetMessage
     * @static
     * @param {IGSetMessage} message GSetMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GSetMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GSetMessage message from the specified reader or buffer.
     * @function decode
     * @memberof GSetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GSetMessage} GSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GSetMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GSetMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.toAdd = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("toAdd"))
            throw $util.ProtocolError("missing required 'toAdd'", { instance: message });
        return message;
    };

    /**
     * Decodes a GSetMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GSetMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GSetMessage} GSetMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GSetMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GSetMessage message.
     * @function verify
     * @memberof GSetMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GSetMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.toAdd && typeof message.toAdd.length === "number" || $util.isString(message.toAdd)))
            return "toAdd: buffer expected";
        return null;
    };

    /**
     * Creates a GSetMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GSetMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GSetMessage} GSetMessage
     */
    GSetMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.GSetMessage)
            return object;
        var message = new $root.GSetMessage();
        if (object.toAdd != null)
            if (typeof object.toAdd === "string")
                $util.base64.decode(object.toAdd, message.toAdd = $util.newBuffer($util.base64.length(object.toAdd)), 0);
            else if (object.toAdd.length)
                message.toAdd = object.toAdd;
        return message;
    };

    /**
     * Creates a plain object from a GSetMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GSetMessage
     * @static
     * @param {GSetMessage} message GSetMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GSetMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.toAdd = "";
            else {
                object.toAdd = [];
                if (options.bytes !== Array)
                    object.toAdd = $util.newBuffer(object.toAdd);
            }
        if (message.toAdd != null && message.hasOwnProperty("toAdd"))
            object.toAdd = options.bytes === String ? $util.base64.encode(message.toAdd, 0, message.toAdd.length) : options.bytes === Array ? Array.prototype.slice.call(message.toAdd) : message.toAdd;
        return object;
    };

    /**
     * Converts this GSetMessage to JSON.
     * @function toJSON
     * @memberof GSetMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GSetMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GSetMessage;
})();

$root.MvrMessage = (function() {

    /**
     * Properties of a MvrMessage.
     * @exports IMvrMessage
     * @interface IMvrMessage
     * @property {Uint8Array} value MvrMessage value
     */

    /**
     * Constructs a new MvrMessage.
     * @exports MvrMessage
     * @classdesc Represents a MvrMessage.
     * @implements IMvrMessage
     * @constructor
     * @param {IMvrMessage=} [properties] Properties to set
     */
    function MvrMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MvrMessage value.
     * @member {Uint8Array} value
     * @memberof MvrMessage
     * @instance
     */
    MvrMessage.prototype.value = $util.newBuffer([]);

    /**
     * Creates a new MvrMessage instance using the specified properties.
     * @function create
     * @memberof MvrMessage
     * @static
     * @param {IMvrMessage=} [properties] Properties to set
     * @returns {MvrMessage} MvrMessage instance
     */
    MvrMessage.create = function create(properties) {
        return new MvrMessage(properties);
    };

    /**
     * Encodes the specified MvrMessage message. Does not implicitly {@link MvrMessage.verify|verify} messages.
     * @function encode
     * @memberof MvrMessage
     * @static
     * @param {IMvrMessage} message MvrMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MvrMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
        return writer;
    };

    /**
     * Encodes the specified MvrMessage message, length delimited. Does not implicitly {@link MvrMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MvrMessage
     * @static
     * @param {IMvrMessage} message MvrMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MvrMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MvrMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MvrMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MvrMessage} MvrMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MvrMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MvrMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        return message;
    };

    /**
     * Decodes a MvrMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MvrMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MvrMessage} MvrMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MvrMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MvrMessage message.
     * @function verify
     * @memberof MvrMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MvrMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
            return "value: buffer expected";
        return null;
    };

    /**
     * Creates a MvrMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MvrMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MvrMessage} MvrMessage
     */
    MvrMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.MvrMessage)
            return object;
        var message = new $root.MvrMessage();
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        return message;
    };

    /**
     * Creates a plain object from a MvrMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MvrMessage
     * @static
     * @param {MvrMessage} message MvrMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MvrMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.value = "";
            else {
                object.value = [];
                if (options.bytes !== Array)
                    object.value = $util.newBuffer(object.value);
            }
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        return object;
    };

    /**
     * Converts this MvrMessage to JSON.
     * @function toJSON
     * @memberof MvrMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MvrMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MvrMessage;
})();

$root.LwwMessage = (function() {

    /**
     * Properties of a LwwMessage.
     * @exports ILwwMessage
     * @interface ILwwMessage
     * @property {Uint8Array} value LwwMessage value
     * @property {number} time LwwMessage time
     */

    /**
     * Constructs a new LwwMessage.
     * @exports LwwMessage
     * @classdesc Represents a LwwMessage.
     * @implements ILwwMessage
     * @constructor
     * @param {ILwwMessage=} [properties] Properties to set
     */
    function LwwMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LwwMessage value.
     * @member {Uint8Array} value
     * @memberof LwwMessage
     * @instance
     */
    LwwMessage.prototype.value = $util.newBuffer([]);

    /**
     * LwwMessage time.
     * @member {number} time
     * @memberof LwwMessage
     * @instance
     */
    LwwMessage.prototype.time = 0;

    /**
     * Creates a new LwwMessage instance using the specified properties.
     * @function create
     * @memberof LwwMessage
     * @static
     * @param {ILwwMessage=} [properties] Properties to set
     * @returns {LwwMessage} LwwMessage instance
     */
    LwwMessage.create = function create(properties) {
        return new LwwMessage(properties);
    };

    /**
     * Encodes the specified LwwMessage message. Does not implicitly {@link LwwMessage.verify|verify} messages.
     * @function encode
     * @memberof LwwMessage
     * @static
     * @param {ILwwMessage} message LwwMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LwwMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
        writer.uint32(/* id 2, wireType 1 =*/17).double(message.time);
        return writer;
    };

    /**
     * Encodes the specified LwwMessage message, length delimited. Does not implicitly {@link LwwMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LwwMessage
     * @static
     * @param {ILwwMessage} message LwwMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LwwMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LwwMessage message from the specified reader or buffer.
     * @function decode
     * @memberof LwwMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LwwMessage} LwwMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LwwMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LwwMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.bytes();
                break;
            case 2:
                message.time = reader.double();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("value"))
            throw $util.ProtocolError("missing required 'value'", { instance: message });
        if (!message.hasOwnProperty("time"))
            throw $util.ProtocolError("missing required 'time'", { instance: message });
        return message;
    };

    /**
     * Decodes a LwwMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LwwMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LwwMessage} LwwMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LwwMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LwwMessage message.
     * @function verify
     * @memberof LwwMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LwwMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
            return "value: buffer expected";
        if (typeof message.time !== "number")
            return "time: number expected";
        return null;
    };

    /**
     * Creates a LwwMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LwwMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LwwMessage} LwwMessage
     */
    LwwMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.LwwMessage)
            return object;
        var message = new $root.LwwMessage();
        if (object.value != null)
            if (typeof object.value === "string")
                $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
            else if (object.value.length)
                message.value = object.value;
        if (object.time != null)
            message.time = Number(object.time);
        return message;
    };

    /**
     * Creates a plain object from a LwwMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LwwMessage
     * @static
     * @param {LwwMessage} message LwwMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LwwMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.value = "";
            else {
                object.value = [];
                if (options.bytes !== Array)
                    object.value = $util.newBuffer(object.value);
            }
            object.time = 0;
        }
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
        if (message.time != null && message.hasOwnProperty("time"))
            object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
        return object;
    };

    /**
     * Converts this LwwMessage to JSON.
     * @function toJSON
     * @memberof LwwMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LwwMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return LwwMessage;
})();

$root.CrdtRuntimeMessage = (function() {

    /**
     * Properties of a CrdtRuntimeMessage.
     * @exports ICrdtRuntimeMessage
     * @interface ICrdtRuntimeMessage
     * @property {Uint8Array} innerMessage CrdtRuntimeMessage innerMessage
     * @property {Array.<string>|null} [pathToRoot] CrdtRuntimeMessage pathToRoot
     */

    /**
     * Constructs a new CrdtRuntimeMessage.
     * @exports CrdtRuntimeMessage
     * @classdesc Represents a CrdtRuntimeMessage.
     * @implements ICrdtRuntimeMessage
     * @constructor
     * @param {ICrdtRuntimeMessage=} [properties] Properties to set
     */
    function CrdtRuntimeMessage(properties) {
        this.pathToRoot = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CrdtRuntimeMessage innerMessage.
     * @member {Uint8Array} innerMessage
     * @memberof CrdtRuntimeMessage
     * @instance
     */
    CrdtRuntimeMessage.prototype.innerMessage = $util.newBuffer([]);

    /**
     * CrdtRuntimeMessage pathToRoot.
     * @member {Array.<string>} pathToRoot
     * @memberof CrdtRuntimeMessage
     * @instance
     */
    CrdtRuntimeMessage.prototype.pathToRoot = $util.emptyArray;

    /**
     * Creates a new CrdtRuntimeMessage instance using the specified properties.
     * @function create
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {ICrdtRuntimeMessage=} [properties] Properties to set
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage instance
     */
    CrdtRuntimeMessage.create = function create(properties) {
        return new CrdtRuntimeMessage(properties);
    };

    /**
     * Encodes the specified CrdtRuntimeMessage message. Does not implicitly {@link CrdtRuntimeMessage.verify|verify} messages.
     * @function encode
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {ICrdtRuntimeMessage} message CrdtRuntimeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtRuntimeMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.innerMessage);
        if (message.pathToRoot != null && message.pathToRoot.length)
            for (var i = 0; i < message.pathToRoot.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pathToRoot[i]);
        return writer;
    };

    /**
     * Encodes the specified CrdtRuntimeMessage message, length delimited. Does not implicitly {@link CrdtRuntimeMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {ICrdtRuntimeMessage} message CrdtRuntimeMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CrdtRuntimeMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CrdtRuntimeMessage message from the specified reader or buffer.
     * @function decode
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtRuntimeMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CrdtRuntimeMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.innerMessage = reader.bytes();
                break;
            case 2:
                if (!(message.pathToRoot && message.pathToRoot.length))
                    message.pathToRoot = [];
                message.pathToRoot.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("innerMessage"))
            throw $util.ProtocolError("missing required 'innerMessage'", { instance: message });
        return message;
    };

    /**
     * Decodes a CrdtRuntimeMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CrdtRuntimeMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CrdtRuntimeMessage message.
     * @function verify
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CrdtRuntimeMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.innerMessage && typeof message.innerMessage.length === "number" || $util.isString(message.innerMessage)))
            return "innerMessage: buffer expected";
        if (message.pathToRoot != null && message.hasOwnProperty("pathToRoot")) {
            if (!Array.isArray(message.pathToRoot))
                return "pathToRoot: array expected";
            for (var i = 0; i < message.pathToRoot.length; ++i)
                if (!$util.isString(message.pathToRoot[i]))
                    return "pathToRoot: string[] expected";
        }
        return null;
    };

    /**
     * Creates a CrdtRuntimeMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CrdtRuntimeMessage} CrdtRuntimeMessage
     */
    CrdtRuntimeMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.CrdtRuntimeMessage)
            return object;
        var message = new $root.CrdtRuntimeMessage();
        if (object.innerMessage != null)
            if (typeof object.innerMessage === "string")
                $util.base64.decode(object.innerMessage, message.innerMessage = $util.newBuffer($util.base64.length(object.innerMessage)), 0);
            else if (object.innerMessage.length)
                message.innerMessage = object.innerMessage;
        if (object.pathToRoot) {
            if (!Array.isArray(object.pathToRoot))
                throw TypeError(".CrdtRuntimeMessage.pathToRoot: array expected");
            message.pathToRoot = [];
            for (var i = 0; i < object.pathToRoot.length; ++i)
                message.pathToRoot[i] = String(object.pathToRoot[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a CrdtRuntimeMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CrdtRuntimeMessage
     * @static
     * @param {CrdtRuntimeMessage} message CrdtRuntimeMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CrdtRuntimeMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.pathToRoot = [];
        if (options.defaults)
            if (options.bytes === String)
                object.innerMessage = "";
            else {
                object.innerMessage = [];
                if (options.bytes !== Array)
                    object.innerMessage = $util.newBuffer(object.innerMessage);
            }
        if (message.innerMessage != null && message.hasOwnProperty("innerMessage"))
            object.innerMessage = options.bytes === String ? $util.base64.encode(message.innerMessage, 0, message.innerMessage.length) : options.bytes === Array ? Array.prototype.slice.call(message.innerMessage) : message.innerMessage;
        if (message.pathToRoot && message.pathToRoot.length) {
            object.pathToRoot = [];
            for (var j = 0; j < message.pathToRoot.length; ++j)
                object.pathToRoot[j] = message.pathToRoot[j];
        }
        return object;
    };

    /**
     * Converts this CrdtRuntimeMessage to JSON.
     * @function toJSON
     * @memberof CrdtRuntimeMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CrdtRuntimeMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CrdtRuntimeMessage;
})();

module.exports = $root;


/***/ }),

/***/ "../client/node_modules/@protobufjs/aspromise/index.js":
/*!*************************************************************!*\
  !*** ../client/node_modules/@protobufjs/aspromise/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ "../client/node_modules/@protobufjs/base64/index.js":
/*!**********************************************************!*\
  !*** ../client/node_modules/@protobufjs/base64/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ "../client/node_modules/@protobufjs/eventemitter/index.js":
/*!****************************************************************!*\
  !*** ../client/node_modules/@protobufjs/eventemitter/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ "../client/node_modules/@protobufjs/float/index.js":
/*!*********************************************************!*\
  !*** ../client/node_modules/@protobufjs/float/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ "../client/node_modules/@protobufjs/inquire/index.js":
/*!***********************************************************!*\
  !*** ../client/node_modules/@protobufjs/inquire/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ "../client/node_modules/@protobufjs/pool/index.js":
/*!********************************************************!*\
  !*** ../client/node_modules/@protobufjs/pool/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ "../client/node_modules/@protobufjs/utf8/index.js":
/*!********************************************************!*\
  !*** ../client/node_modules/@protobufjs/utf8/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ "../client/node_modules/protobufjs/minimal.js":
/*!****************************************************!*\
  !*** ../client/node_modules/protobufjs/minimal.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(/*! ./src/index-minimal */ "../client/node_modules/protobufjs/src/index-minimal.js");


/***/ }),

/***/ "../client/node_modules/protobufjs/src/index-minimal.js":
/*!**************************************************************!*\
  !*** ../client/node_modules/protobufjs/src/index-minimal.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(/*! ./writer */ "../client/node_modules/protobufjs/src/writer.js");
protobuf.BufferWriter = __webpack_require__(/*! ./writer_buffer */ "../client/node_modules/protobufjs/src/writer_buffer.js");
protobuf.Reader       = __webpack_require__(/*! ./reader */ "../client/node_modules/protobufjs/src/reader.js");
protobuf.BufferReader = __webpack_require__(/*! ./reader_buffer */ "../client/node_modules/protobufjs/src/reader_buffer.js");

// Utility
protobuf.util         = __webpack_require__(/*! ./util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");
protobuf.rpc          = __webpack_require__(/*! ./rpc */ "../client/node_modules/protobufjs/src/rpc.js");
protobuf.roots        = __webpack_require__(/*! ./roots */ "../client/node_modules/protobufjs/src/roots.js");
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}

// Set up buffer utility according to the environment
configure();


/***/ }),

/***/ "../client/node_modules/protobufjs/src/reader.js":
/*!*******************************************************!*\
  !*** ../client/node_modules/protobufjs/src/reader.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(/*! ./util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup(buffer) {
            return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                    ? new BufferReader(buffer)
                    /* istanbul ignore next */
                    : create_array(buffer);
            })(buffer);
        }
        /* istanbul ignore next */
        : create_array;
};

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = create();

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),

/***/ "../client/node_modules/protobufjs/src/reader_buffer.js":
/*!**************************************************************!*\
  !*** ../client/node_modules/protobufjs/src/reader_buffer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(/*! ./reader */ "../client/node_modules/protobufjs/src/reader.js");
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(/*! ./util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

BufferReader._configure = function () {
    /* istanbul ignore else */
    if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
};


/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice
        ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len))
        : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

BufferReader._configure();


/***/ }),

/***/ "../client/node_modules/protobufjs/src/roots.js":
/*!******************************************************!*\
  !*** ../client/node_modules/protobufjs/src/roots.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),

/***/ "../client/node_modules/protobufjs/src/rpc.js":
/*!****************************************************!*\
  !*** ../client/node_modules/protobufjs/src/rpc.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(/*! ./rpc/service */ "../client/node_modules/protobufjs/src/rpc/service.js");


/***/ }),

/***/ "../client/node_modules/protobufjs/src/rpc/service.js":
/*!************************************************************!*\
  !*** ../client/node_modules/protobufjs/src/rpc/service.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(/*! ../util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ "../client/node_modules/protobufjs/src/util/longbits.js":
/*!**************************************************************!*\
  !*** ../client/node_modules/protobufjs/src/util/longbits.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(/*! ../util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ "../client/node_modules/protobufjs/src/util/minimal.js":
/*!*************************************************************!*\
  !*** ../client/node_modules/protobufjs/src/util/minimal.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(/*! @protobufjs/aspromise */ "../client/node_modules/@protobufjs/aspromise/index.js");

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(/*! @protobufjs/base64 */ "../client/node_modules/@protobufjs/base64/index.js");

// base class of rpc.Service
util.EventEmitter = __webpack_require__(/*! @protobufjs/eventemitter */ "../client/node_modules/@protobufjs/eventemitter/index.js");

// float handling accross browsers
util.float = __webpack_require__(/*! @protobufjs/float */ "../client/node_modules/@protobufjs/float/index.js");

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(/*! @protobufjs/inquire */ "../client/node_modules/@protobufjs/inquire/index.js");

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(/*! @protobufjs/utf8 */ "../client/node_modules/@protobufjs/utf8/index.js");

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(/*! @protobufjs/pool */ "../client/node_modules/@protobufjs/pool/index.js");

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(/*! ./longbits */ "../client/node_modules/protobufjs/src/util/longbits.js");

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */
util.isNode = Boolean(typeof global !== "undefined"
                   && global
                   && global.process
                   && global.process.versions
                   && global.process.versions.node);

/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */
util.global = util.isNode && global
           || typeof window !== "undefined" && window
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../demo/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../client/node_modules/protobufjs/src/writer.js":
/*!*******************************************************!*\
  !*** ../client/node_modules/protobufjs/src/writer.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(/*! ./util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

var create = function create() {
    return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
                return new BufferWriter();
            })();
        }
        /* istanbul ignore next */
        : function create_array() {
            return new Writer();
        };
};

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = create();

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};


/***/ }),

/***/ "../client/node_modules/protobufjs/src/writer_buffer.js":
/*!**************************************************************!*\
  !*** ../client/node_modules/protobufjs/src/writer_buffer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(/*! ./writer */ "../client/node_modules/protobufjs/src/writer.js");
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(/*! ./util/minimal */ "../client/node_modules/protobufjs/src/util/minimal.js");

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

BufferWriter._configure = function () {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */
    BufferWriter.alloc = util._Buffer_allocUnsafe;

    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set"
        ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
          // also works for plain array values
        }
        /* istanbul ignore next */
        : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
        };
};


/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else if (buf.utf8Write)
        buf.utf8Write(val, pos);
    else
        buf.write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

BufferWriter._configure();


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
let client = new compoventuals_client_1.crdts.CrdtRuntime(new compoventuals_client_1.network.WebSocketNetwork(client_uuid, HOST));
//let clientCounter = new crdts.CounterCrdt("counterId", client);
let clientCounter = new compoventuals_client_1.crdts.CounterCrdt(client, "counterId");
/* HTML variables */
var counter = document.getElementById("counter");
/* Customize the event listener for CRDT as refresh the value */
clientCounter.addEventListener("Add", _ => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3V0aWxzLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9uZXR3b3JrL2NyZHRfbmV0d29ya19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3dlYnJ0Y19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvcHJvdG9fY29tcGlsZWQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYXNwcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Jhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9ldmVudGVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZmxvYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvaW5xdWlyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9wb29sL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL3V0ZjgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL2luZGV4LW1pbmltYWwuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcm9vdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy9zZXJ2aWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3V0aWwvbG9uZ2JpdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvdXRpbC9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy93cml0ZXJfYnVmZmVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jb3VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsNkJBQTZCLG1CQUFPLENBQUMsdURBQWE7QUFDbEQsK0JBQStCLG1CQUFPLENBQUMsMkRBQWU7QUFDdEQsaUM7Ozs7Ozs7Ozs7OztBQ3hCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMseUJBQXlCLG1CQUFPLENBQUMsZ0VBQW1CO0FBQ3BELGdCQUFnQixtQkFBTyxDQUFDLG1EQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLGVBQWU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsaUJBQWlCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7O0FDcFphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx5QkFBeUIsbUJBQU8sQ0FBQyxnRUFBbUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRDs7Ozs7Ozs7Ozs7O0FDdE9hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxXQUFXLG1CQUFPLENBQUMsK0NBQUc7QUFDdEIsZ0JBQWdCLG1CQUFPLENBQUMsb0RBQVU7QUFDbEMsK0JBQStCLG1CQUFPLENBQUMsbUZBQXdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBDQUEwQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLLElBQUk7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWEsMENBQTBDO0FBQ3ZEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOVVhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FB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QUFDeEQsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsSUFBSSIsImZpbGUiOiJkZXBsb3kvc2l0ZS9jb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2l0ZS9jb3VudGVyLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubmV0d29yayA9IGV4cG9ydHMuY3JkdHMgPSB2b2lkIDA7XG5leHBvcnRzLmNyZHRzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9jcmR0c1wiKSk7XG5leHBvcnRzLm5ldHdvcmsgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL25ldHdvcmtcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkx3d1JlZ2lzdGVyID0gZXhwb3J0cy5Md3dFdmVudCA9IGV4cG9ydHMuTHd3U3RhdGUgPSBleHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlciA9IGV4cG9ydHMuTXZyRXZlbnQgPSBleHBvcnRzLk12ckVudHJ5ID0gZXhwb3J0cy5HU2V0Q3JkdCA9IGV4cG9ydHMuU2V0QWRkRXZlbnQgPSBleHBvcnRzLk11bHRSZWdpc3RlckNyZHQgPSBleHBvcnRzLk11bHRFdmVudCA9IGV4cG9ydHMuQ291bnRlckNyZHQgPSBleHBvcnRzLk51bWJlclN0YXRlID0gZXhwb3J0cy5BZGRFdmVudCA9IHZvaWQgMDtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuY29uc3QgcHJvdG9fY29tcGlsZWRfMSA9IHJlcXVpcmUoXCIuLi9wcm90b19jb21waWxlZFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbmNsYXNzIEFkZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVBZGRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiQWRkXCI7XG4gICAgfVxufVxuZXhwb3J0cy5BZGRFdmVudCA9IEFkZEV2ZW50O1xuY2xhc3MgTnVtYmVyU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLk51bWJlclN0YXRlID0gTnVtYmVyU3RhdGU7XG4vLyBUT0RPOiBtYWtlIHJlc2V0dGFibGVcbmNsYXNzIENvdW50ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlID0gMCkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgTnVtYmVyU3RhdGUoaW5pdGlhbFZhbHVlKSk7XG4gICAgfVxuICAgIGFkZCh0b0FkZCkge1xuICAgICAgICBpZiAodG9BZGQgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5Db3VudGVyTWVzc2FnZS5jcmVhdGUoeyB0b0FkZDogdG9BZGQgfSk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5Db3VudGVyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLkNvdW50ZXJNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgKz0gZGVjb2RlZC50b0FkZDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQWRkRXZlbnQodGhpcywgdGltZXN0YW1wLCBkZWNvZGVkLnRvQWRkKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IGFkZC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGQodmFsdWUgLSB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXJDcmR0ID0gQ291bnRlckNyZHQ7XG5jbGFzcyBNdWx0RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZU11bHRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVNdWx0ZWQgPSB2YWx1ZU11bHRlZDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJNdWx0XCI7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0RXZlbnQgPSBNdWx0RXZlbnQ7XG5jbGFzcyBNdWx0UmVnaXN0ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlID0gMSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgTnVtYmVyU3RhdGUoaW5pdGlhbFZhbHVlKSk7XG4gICAgfVxuICAgIG11bHQodG9NdWx0KSB7XG4gICAgICAgIGlmICh0b011bHQgIT09IDEpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5NdWx0UmVnaXN0ZXJNZXNzYWdlLmNyZWF0ZSh7IHRvTXVsdDogdG9NdWx0IH0pO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuTXVsdFJlZ2lzdGVyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLk11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSAqPSBkZWNvZGVkLnRvTXVsdDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTXVsdEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgZGVjb2RlZC50b011bHQpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tdWx0KHZhbHVlIC8gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gTXVsdFJlZ2lzdGVyQ3JkdDtcbmNsYXNzIFNldEFkZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVBZGRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiU2V0QWRkXCI7XG4gICAgfVxufVxuZXhwb3J0cy5TZXRBZGRFdmVudCA9IFNldEFkZEV2ZW50O1xuY2xhc3MgR1NldENyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBHcm93LW9ubHkgc2V0IHdpdGggZWxlbWVudHMgb2YgdHlwZSBULlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBzdXBwb3J0cyB0eXBlcyBzdHJpbmcsIG51bWJlcixcbiAgICAgKiBhbmQgQ3JkdC4gIHN0cmluZyBhbmQgbnVtYmVyIHR5cGVzIGFyZSBzdG9yZWRcbiAgICAgKiBieS12YWx1ZSwgYXMgaW4gb3JkaW5hcnkgSlMgU2V0J3MsIHNvIHRoYXQgZGlmZmVyZW50XG4gICAgICogaW5zdGFuY2VzIG9mIHRoZSBzYW1lIHZhbHVlIGFyZSBpZGVudGlmaWVkXG4gICAgICogKGV2ZW4gaWYgdGhleSBhcmUgYWRkZWQgYnkgZGlmZmVyZW50XG4gICAgICogcmVwbGljYXMpLiAgQ3JkdCB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktcmVmZXJlbmNlLCBhcyB0aGV5IHdvdWxkIGJlIGluIG9yZGluYXJ5IEpTIHNldCdzLFxuICAgICAqIHdpdGggcmVwbGljYXMgb2YgdGhlIHNhbWUgQ3JkdCBiZWluZyBpZGVudGlmaWVkXG4gICAgICogKGV2ZW4gaWYgdGhleSBhcmUgYWRkZWQgYnkgZGlmZmVyZW50IHJlcGxpY2FzKS5cbiAgICAgKiBPdGhlciB0eXBlcyBhcmUgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBjYXVzZSBhblxuICAgICAqIGVycm9yIHdoZW4geW91IGF0dGVtcHQgdG8gYWRkIHRoZW07IHVzZSBhIGN1c3RvbVxuICAgICAqIHNlcmlhbGl6ZXIgYW5kIGRlc2VyaWFsaXplciBpbnN0ZWFkLCBiZWluZ1xuICAgICAqIGF3YXJlIG9mIEpTJ3MgY2x1bmt5IHNldCBzZW1hbnRpY3MgKGFsbCBPYmplY3RzXG4gICAgICogYXJlIHN0b3JlZCBieS1yZWZlcmVuY2Ugb25seSwgd2hpbGUgbmFpdmVcbiAgICAgKiBzZXJpYWxpemF0aW9uL2Rlc2VyaWFsaXphdGlvbiwgZS5nLiB3aXRoIEpTT04sXG4gICAgICogd2lsbCBjcmVhdGUgbm9uLWVxdWFsXG4gICAgICogY29waWVzIG9mIE9iamVjdHMgb24gb3RoZXIgcmVwbGljYXMsXG4gICAgICogZXZlbiBpZiB0aGV5IGludHVpdGl2ZWx5IGNvcnJlc3BvbmQgdG8gdGhlIFwic2FtZVwiXG4gICAgICogdmFyaWFibGUuKVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIHNlcmlhbGl6ZSA9IHV0aWxzXzEuZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyLCBkZXNlcmlhbGl6ZSA9IHV0aWxzXzEubmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocGFyZW50T3JSdW50aW1lKSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgU2V0KCkpO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplO1xuICAgIH1cbiAgICBhZGQodmFsdWUpIHtcbiAgICAgICAgLy8gVE9ETzogaWYgd2UgbWFrZSB0aGlzIHJlc2V0dGFibGUsIHNlbmQgdmFsdWVzXG4gICAgICAgIC8vIGFueXdheSAob3IgbWFrZSB0aGF0IGFuIG9wdGlvbikuXG4gICAgICAgIGlmICghdGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHByb3RvX2NvbXBpbGVkXzEuR1NldE1lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0b0FkZDogdGhpcy5zZXJpYWxpemUodmFsdWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b19jb21waWxlZF8xLkdTZXRNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgICAgIHN1cGVyLnNlbmQoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaGFzKHZhbHVlKTtcbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLkdTZXRNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZGVzZXJpYWxpemUoZGVjb2RlZC50b0FkZCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFNldEFkZEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVjb2RpbmcgZXJyb3I6IFwiICsgZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRG9uJ3QgbXV0YXRlIHRoaXMgZGlyZWN0bHkuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG59XG5leHBvcnRzLkdTZXRDcmR0ID0gR1NldENyZHQ7XG5jbGFzcyBNdnJFbnRyeSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHNlbmRlciwgY291bnRlcikge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgIH1cbn1cbmV4cG9ydHMuTXZyRW50cnkgPSBNdnJFbnRyeTtcbmNsYXNzIE12ckV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVBZGRlZCwgdmFsdWVzUmVtb3ZlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMudmFsdWVzUmVtb3ZlZCA9IHZhbHVlc1JlbW92ZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiTXZyXCI7XG4gICAgfVxufVxuZXhwb3J0cy5NdnJFdmVudCA9IE12ckV2ZW50O1xuY2xhc3MgTXVsdGlWYWx1ZVJlZ2lzdGVyIGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogTXVsdGktdmFsdWUgcmVnaXN0ZXIgb2YgdHlwZSBULlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBzdXBwb3J0cyB0eXBlcyBzdHJpbmcsIG51bWJlcixcbiAgICAgKiBhbmQgQ3JkdC4gIHN0cmluZyBhbmQgbnVtYmVyIHR5cGVzIGFyZSBzdG9yZWRcbiAgICAgKiBieS12YWx1ZSwgYXMgaW4gb3JkaW5hcnkgSlMgU2V0J3MsIHNvIHRoYXQgZGlmZmVyZW50XG4gICAgICogaW5zdGFuY2VzIG9mIHRoZSBzYW1lIHZhbHVlIGFyZSBpZGVudGlmaWVkXG4gICAgICogKGV2ZW4gaWYgdGhleSBhcmUgYWRkZWQgYnkgZGlmZmVyZW50XG4gICAgICogcmVwbGljYXMpLiAgQ3JkdCB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktcmVmZXJlbmNlLCBhcyB0aGV5IHdvdWxkIGJlIGluIG9yZGluYXJ5IEpTIHNldCdzLFxuICAgICAqIHdpdGggcmVwbGljYXMgb2YgdGhlIHNhbWUgQ3JkdCBiZWluZyBpZGVudGlmaWVkXG4gICAgICogKGV2ZW4gaWYgdGhleSBhcmUgYWRkZWQgYnkgZGlmZmVyZW50IHJlcGxpY2FzKS5cbiAgICAgKiBPdGhlciB0eXBlcyBhcmUgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBjYXVzZSBhblxuICAgICAqIGVycm9yIHdoZW4geW91IGF0dGVtcHQgdG8gYWRkIHRoZW07IHVzZSBhIGN1c3RvbVxuICAgICAqIHNlcmlhbGl6ZXIgYW5kIGRlc2VyaWFsaXplciBpbnN0ZWFkLCBiZWluZ1xuICAgICAqIGF3YXJlIG9mIEpTJ3MgY2x1bmt5IHNldCBzZW1hbnRpY3MgKGFsbCBPYmplY3RzXG4gICAgICogYXJlIHN0b3JlZCBieS1yZWZlcmVuY2Ugb25seSwgd2hpbGUgbmFpdmVcbiAgICAgKiBzZXJpYWxpemF0aW9uL2Rlc2VyaWFsaXphdGlvbiwgZS5nLiB3aXRoIEpTT04sXG4gICAgICogd2lsbCBjcmVhdGUgbm9uLWVxdWFsXG4gICAgICogY29waWVzIG9mIE9iamVjdHMgb24gb3RoZXIgcmVwbGljYXMsXG4gICAgICogZXZlbiBpZiB0aGV5IGludHVpdGl2ZWx5IGNvcnJlc3BvbmQgdG8gdGhlIFwic2FtZVwiXG4gICAgICogdmFyaWFibGUuKVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxWYWx1ZSwgc2VyaWFsaXplID0gdXRpbHNfMS5kZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIsIGRlc2VyaWFsaXplID0gdXRpbHNfMS5uZXdEZWZhdWx0Q29sbGVjdGlvbkRlc2VyaWFsaXplcihwYXJlbnRPclJ1bnRpbWUpKSB7XG4gICAgICAgIGxldCBpbml0aWFsU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAvLyBUT0RPOiB1c2UgZ2VuZXJpYyB3YXkgKHJ1bkxvY2FsbHkpLCB0b1xuICAgICAgICAvLyByZWR1Y2UgY29kZSBkdXBsaWNhdGlvbi5cbiAgICAgICAgaW5pdGlhbFNldC5hZGQobmV3IE12ckVudHJ5KGluaXRpYWxWYWx1ZSwgbnVsbCwgLTEpKTtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFNldCk7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplID0gc2VyaWFsaXplO1xuICAgICAgICB0aGlzLmRlc2VyaWFsaXplID0gZGVzZXJpYWxpemU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHByb3RvX2NvbXBpbGVkXzEuTXZyTWVzc2FnZS5jcmVhdGUoe1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2VyaWFsaXplKHZhbHVlKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuTXZyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgIHN1cGVyLnNlbmQoYnVmZmVyKTtcbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLk12ck1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kZXNlcmlhbGl6ZShkZWNvZGVkLnZhbHVlKTtcbiAgICAgICAgICAgIGxldCByZW1vdmVkID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuc2VuZGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRlbGV0ZShlbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmNFbnRyeSA9IHZjLmdldChlbnRyeS5zZW5kZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmNFbnRyeSAhPT0gdW5kZWZpbmVkICYmIHZjRW50cnkgPj0gZW50cnkuY291bnRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5kZWxldGUoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZC5hZGQoZW50cnkudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5hZGQobmV3IE12ckVudHJ5KHZhbHVlLCB0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCkpKTtcbiAgICAgICAgICAgIGlmIChyZW1vdmVkLnNpemUgPT09IDEgJiYgcmVtb3ZlZC5lbnRyaWVzKCkubmV4dCgpLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gbm8gY2hhbmdlIHRvIGFjdHVhbCB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG9uJ3QgZGlzcGF0Y2ggaWYgdmFsdWUgc3RheWVkIHB1dD9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE12ckV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgdmFsdWUsIHJlbW92ZWQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgc2V0IG9mIHZhbHVlcywgaS5lLiwgdGhlXG4gICAgICogc2V0IG9mIG5vbi1vdmVyd3JpdHRlbiB2YWx1ZXMuICBUaGlzIG1heSBoYXZlXG4gICAgICogbW9yZSB0aGFuIG9uZSBlbGVtZW50IGR1ZSB0byBjb25jdXJyZW50IHdyaXRlcyxcbiAgICAgKiBidXQgaXQgd2lsbCBuZXZlciBoYXZlIHplcm8gZWxlbWVudHMuICAoSWYgeW91XG4gICAgICogd2FudCB0byBhbGxvdyBudWxsL3VuZGVmaW5lZCB2YWx1ZXMsIGluY2x1ZGVcbiAgICAgKiB0aGF0IGluIFQncyB0eXBlLilcbiAgICAgKi9cbiAgICBnZXQgdmFsdWVTZXQoKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHRoaXMuc3RhdGUpXG4gICAgICAgICAgICB2YWx1ZXMuYWRkKGVudHJ5LnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG59XG5leHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlciA9IE11bHRpVmFsdWVSZWdpc3RlcjtcbmNsYXNzIEx3d1N0YXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgc2VuZGVyLCBjb3VudGVyLCB0aW1lKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZW5kZXIgPSBzZW5kZXI7XG4gICAgICAgIHRoaXMuY291bnRlciA9IGNvdW50ZXI7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgfVxufVxuZXhwb3J0cy5Md3dTdGF0ZSA9IEx3d1N0YXRlO1xuY2xhc3MgTHd3RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZSwgdGltZVNldCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy50aW1lU2V0ID0gdGltZVNldDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJMd3dcIjtcbiAgICB9XG59XG5leHBvcnRzLkx3d0V2ZW50ID0gTHd3RXZlbnQ7XG5jbGFzcyBMd3dSZWdpc3RlciBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIExhc3Qtd3JpdGVyLXdpbnMgKExXVykgcmVnaXN0ZXIgb2YgdHlwZSBULiAgVGllc1xuICAgICAqIGJldHdlZW4gY29uY3VycmVudCBtZXNzYWdlcyBhcmUgYmFzZWQgb24gVVRDXG4gICAgICogdGltZXN0YW1wcyAoaG93ZXZlciwgYSBtZXNzYWdlIHdpbGwgYWx3YXlzIG92ZXJ3cml0ZVxuICAgICAqIGEgY2F1c2FsbHkgcHJpb3IgdmFsdWUgcmVnYXJkbGVzcyBvZiB0aW1lc3RhbXBzKS5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgc3VwcG9ydHMgdHlwZXMgc3RyaW5nLCBudW1iZXIsXG4gICAgICogYW5kIENyZHQuICBzdHJpbmcgYW5kIG51bWJlciB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktdmFsdWUsIGFzIGluIG9yZGluYXJ5IEpTIFNldCdzLCBzbyB0aGF0IGRpZmZlcmVudFxuICAgICAqIGluc3RhbmNlcyBvZiB0aGUgc2FtZSB2YWx1ZSBhcmUgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudFxuICAgICAqIHJlcGxpY2FzKS4gIENyZHQgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXJlZmVyZW5jZSwgYXMgdGhleSB3b3VsZCBiZSBpbiBvcmRpbmFyeSBKUyBzZXQncyxcbiAgICAgKiB3aXRoIHJlcGxpY2FzIG9mIHRoZSBzYW1lIENyZHQgYmVpbmcgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudCByZXBsaWNhcykuXG4gICAgICogT3RoZXIgdHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgY2F1c2UgYW5cbiAgICAgKiBlcnJvciB3aGVuIHlvdSBhdHRlbXB0IHRvIGFkZCB0aGVtOyB1c2UgYSBjdXN0b21cbiAgICAgKiBzZXJpYWxpemVyIGFuZCBkZXNlcmlhbGl6ZXIgaW5zdGVhZCwgYmVpbmdcbiAgICAgKiBhd2FyZSBvZiBKUydzIGNsdW5reSBzZXQgc2VtYW50aWNzIChhbGwgT2JqZWN0c1xuICAgICAqIGFyZSBzdG9yZWQgYnktcmVmZXJlbmNlIG9ubHksIHdoaWxlIG5haXZlXG4gICAgICogc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24sIGUuZy4gd2l0aCBKU09OLFxuICAgICAqIHdpbGwgY3JlYXRlIG5vbi1lcXVhbFxuICAgICAqIGNvcGllcyBvZiBPYmplY3RzIG9uIG90aGVyIHJlcGxpY2FzLFxuICAgICAqIGV2ZW4gaWYgdGhleSBpbnR1aXRpdmVseSBjb3JyZXNwb25kIHRvIHRoZSBcInNhbWVcIlxuICAgICAqIHZhcmlhYmxlLilcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsVmFsdWUsIHNlcmlhbGl6ZSA9IHV0aWxzXzEuZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyLCBkZXNlcmlhbGl6ZSA9IHV0aWxzXzEubmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocGFyZW50T3JSdW50aW1lKSkge1xuICAgICAgICBsZXQgaW5pdGlhbFN0YXRlID0gbmV3IEx3d1N0YXRlKGluaXRpYWxWYWx1ZSwgbnVsbCwgLTEsIG51bGwpO1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsU3RhdGUpO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLkx3d01lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSksXG4gICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5Md3dNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgc3VwZXIuc2VuZChidWZmZXIpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICByZWNlaXZlSW50ZXJuYWwodGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuTHd3TWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRlc2VyaWFsaXplKGRlY29kZWQudmFsdWUpO1xuICAgICAgICAgICAgLy8gU2VlIGlmIGl0J3MgY2F1c2FsbHkgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICAgICAgbGV0IG92ZXJ3cml0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VuZGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbCBlbGVtZW50XG4gICAgICAgICAgICAgICAgb3ZlcndyaXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB2Y0VudHJ5ID0gdmMuZ2V0KHRoaXMuc3RhdGUuc2VuZGVyKTtcbiAgICAgICAgICAgICAgICBpZiAodmNFbnRyeSAhPT0gdW5kZWZpbmVkICYmIHZjRW50cnkgPj0gdGhpcy5zdGF0ZS5jb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgaXQncyBjb25jdXJyZW50LCBjb21wYXJlIHRpbWVzdGFtcHMuICBVc2VcbiAgICAgICAgICAgIC8vIGFyYml0cmFyeSBvcmRlciBvbiBzZW5kZXIgYXMgdGllYnJlYWtlci5cbiAgICAgICAgICAgIGlmICghb3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY29kZWQudGltZSA+IHRoaXMuc3RhdGUudGltZSlcbiAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWNvZGVkLnRpbWUgPT0gdGhpcy5zdGF0ZS50aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZSA9ICh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkgPiB0aGlzLnN0YXRlLnNlbmRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VkID0gKHRoaXMuc3RhdGUudmFsdWUgIT09IHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvdW50ZXIgPSB0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VuZGVyID0gdGltZXN0YW1wLmdldFNlbmRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZSA9IGRlY29kZWQudGltZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBMd3dFdmVudCh0aGlzLCB0aW1lc3RhbXAsIHZhbHVlLCBuZXcgRGF0ZShkZWNvZGVkLnRpbWUpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTHd3UmVnaXN0ZXIgPSBMd3dSZWdpc3Rlcjtcbi8vIFRPRE86IG1ha2UgYWJvdmUgQ3JkdHMgb3B0aW9uYWwgcmVzZXR0YWJsZSwgd2l0aFxuLy8gc2V0dGFibGUgcmVzZXQgdmFsdWVzIChlaXRoZXIgaW4gY29uc3RydWN0b3Igb3IgdmlhXG4vLyBhIGJ1aWxkZXIgcGF0dGVybikuICBQZXJoYXBzIG1vcmUgZ2VuZXJhbGx5LCBDcmR0c1xuLy8gc2hvdWxkIGFsbG93IGEgcmVzZXQgY2FsbGJhY2ssIHRoYXQgZ2V0cyBydW4gbG9jYWxseSBpblxuLy8gaGFyZFJlc2V0IChjaGVjayB0aGlzIGlzIEVDKS5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2ljX2NyZHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmR0UnVudGltZSA9IGV4cG9ydHMuQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHByb3RvX2NvbXBpbGVkXzEgPSByZXF1aXJlKFwiLi4vcHJvdG9fY29tcGlsZWRcIik7XG5jbGFzcyBDcmR0IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFyZW50T3JSdW50aW1lIEEgcGFyZW50IGZvciB0aGlzIENyZHQsIGVpdGhlciBhbm90aGVyXG4gICAgICogQ3JkdCwgb3IgdGhlIENyZHRSdW50aW1lIGlmIHRoaXMgaGFzIG5vIENyZHQgcGFyZW50LlxuICAgICAqIFR5cGljYWxseSBwYXJlbnQgd2lsbCBiZSB0aGUgQ3JkdCBjb250YWluaW5nIHRoaXNcbiAgICAgKiBhcyBhbiBpbnN0YW5jZSB2YXJpYWJsZSwgb3IgdGhlIENyZHRSdW50aW1lIGlmIHRoZXJlIGlzXG4gICAgICogbm8gc3VjaCBDcmR0LiAgQ3JkdHMgd2l0aCB0aGUgc2FtZSBwYXJlbnQgc2hhcmUgYSBjb21tb25cbiAgICAgKiBuYW1lc3BhY2UgYW5kIGNhdXNhbCBjb25zaXN0ZW5jeSBncm91cCwgYW5kIHRoZSBkZWZhdWx0XG4gICAgICogcmVzZXQoKSBiZWhhdmlvciBpcyB0byBjYWxsIHJlc2V0KCkgb24gZWFjaCBjaGlsZC5cbiAgICAgKiBEaWZmZXJlbnQgcmVwbGljYXMgb2YgYSBDcmR0IG11c3QgYmUgYXNzaWduZWQgcGFyZW50c1xuICAgICAqIHdoaWNoIGFyZSBhbHNvIHJlcGxpY2FzIG9mIGVhY2ggb3RoZXIuXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ3JkdC4gIEFsbCBDcmR0cyB3aXRoIHRoZVxuICAgICAqIHNhbWUgcGFyZW50IG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5pc0NyZHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmluUmVjZWl2ZUludGVybmFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICBpZiAoXCJpc0NyZHRcIiBpbiBwYXJlbnRPclJ1bnRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50T3JSdW50aW1lO1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lID0gdGhpcy5wYXJlbnQucnVudGltZTtcbiAgICAgICAgICAgIHRoaXMucGF0aFRvUm9vdCA9IFtpZCwgLi4udGhpcy5wYXJlbnQucGF0aFRvUm9vdF07XG4gICAgICAgICAgICB0aGlzLnJvb3RJZCA9IHRoaXMucGFyZW50LnJvb3RJZDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlZ2lzdGVyQ2hpbGQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUgPSBwYXJlbnRPclJ1bnRpbWU7XG4gICAgICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucm9vdElkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXJSb290KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZ2lzdGVyQ2hpbGQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zZXQoY2hpbGQuaWQsIGNoaWxkKTtcbiAgICB9XG4gICAgLy8gVE9ETzogdHlwaW5nLCBvciBhdCBsZWFzdCBjaGVjayB0eXBlIGV4aXN0cz9cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHJlbW92ZSBsaXN0ZW5lcnM/ICBMb29rIGF0IGhvdyBET00gZG9lcyBpdC5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBjb3B5IERPTSBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcGFyYW0gIHR5cGUgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIGxpc3RlbmVyIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHJlY2VpdmVMb2NhbCA9IGZhbHNlICBJZiBmYWxzZSwgZXZlbnRzIHdpdGggaXNMb2NhbCA9IHRydWVcbiAgICAgKiBhcmUgbm90IGRlbGl2ZXJlZC5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCByZWNlaXZlTG9jYWwgPSBmYWxzZSkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZ2V0KHR5cGUpO1xuICAgICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnNldCh0eXBlLCBsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnB1c2goW2xpc3RlbmVyLCByZWNlaXZlTG9jYWxdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzdWJjbGFzcyBzaG91bGQgY2FsbCB0aGlzIGluIGEgcmVtb3RlIG1ldGhvZFxuICAgICAqIHdoZW4gaXQgaGFzIGFuIGV2ZW50XG4gICAgICogaXQgd2FudHMgdG8gZGVsaXZlciB0byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgZGlzcGF0Y2hFdmVudChldmVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50LnR5cGUpO1xuICAgICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBbbGlzdGVuZXIsIHJlY2VpdmVMb2NhbF0gb2YgbGlzdCkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVMb2NhbCB8fCAhZXZlbnQudGltZXN0YW1wLmlzTG9jYWwoKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlbmQobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZCh0aGlzLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICAqIENhbGxiYWNrIHVzZWQgYnkgQ3JkdFJ1bnRpbWUgb3IgYSBwYXJlbnQgQ3JkdC5cbiAgICAgICogQHRhcmdldFBhdGg6IHRoZSB0YXJnZXQgQ3JkdCdzIGlkIGZvbGxvd2VkIGJ5XG4gICAgICAqIHRoZSBpZHMgb2YgaXRzIGFuY2VzdG9ycyBpbiBhc2NlbmRpbmcgb3JkZXIsXG4gICAgICAqIGV4Y2x1ZGluZyB0aGUgY3VycmVudCBDcmR0LlxuICAgICAgKiBAcGFyYW0gdGltZXN0YW1wIFRoZSB0aW1lc3RhbXAgb2YgdGhlIHJlY2VpdmVkIG1lc3NhZ2VcbiAgICAgICogQHBhcmFtIG1lc3NhZ2UgICBUaGUgcmVjZWl2ZWQgbWVzc2FnZVxuICAgICAgKi9cbiAgICByZWNlaXZlKHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICAvLyBUT0RPOiB1c2UgKGhvbWVicmV3PykgaXRlcmF0b3IgZm9yIHRhcmdldFBhdGguXG4gICAgICAgIC8vIE1ha2UgaXQgZWFzeSB0byBjb3B5IGZvciBtdWx0aXBsZSB1c2VzIChjb3B5aW5nXG4gICAgICAgIC8vIGluZGV4IGJ1dCBub3QgdGhlIHVuZGVybHlpbmcgYXJyYXkpLlxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGFyZ2V0UGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSB0aGUgdGFyZ2V0XG4gICAgICAgICAgICBjaGFuZ2VkID0gdGhpcy5yZWNlaXZlSW50ZXJuYWwodGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW4uZ2V0KHRhcmdldFBhdGhbdGFyZ2V0UGF0aC5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGl2ZXIgZXJyb3Igc29tZXdoZXJlIHJlYXNvbmFibGVcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGNoaWxkOiBcIiArIHRhcmdldFBhdGhbdGFyZ2V0UGF0aC5sZW5ndGggLSAxXSArXG4gICAgICAgICAgICAgICAgICAgIFwiIGluOiBcIiArIEpTT04uc3RyaW5naWZ5KHRhcmdldFBhdGgpICsgXCIsIGNoaWxkcmVuOiBcIiArIEpTT04uc3RyaW5naWZ5KFsuLi50aGlzLmNoaWxkcmVuLmtleXMoKV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldFBhdGgubGVuZ3RoLS07XG4gICAgICAgICAgICBjaGFuZ2VkID0gdGhpcy5yZWNlaXZlSW50ZXJuYWxGb3JDaGlsZChjaGlsZCwgdGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBjaGFuZ2VkIGV2ZW50XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHJlY2VpdmUgbWVzc2FnZXMgc2VudCBieSBzZW5kXG4gICAgICogb24gcmVwbGljYXMgb2YgdGhpcyBjcmR0IChpbmNsdWRpbmcgdGhvc2Ugc2VudFxuICAgICAqIGxvY2FsbHkpLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgdGhpcyBDcmR0J3Mgc3RhdGUgd2FzIGNoYW5nZWQsIGkuZS4sXG4gICAgICogQ3JkdEV2ZW50J3Mgb2YgdHlwZSBcIkNoYW5nZVwiIHNob3VsZCBiZVxuICAgICAqIGRpc3BhdGNoZWQuXG4gICAgICovXG4gICAgcmVjZWl2ZUludGVybmFsKF90aW1lc3RhbXAsIF9tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlY2VpdmVkIGEgbWVzc2FnZSBidXQgcmVjZWl2ZUludGVybmFsIGlzIG5vdCBvdmVycmlkZGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHJlY2VpdmUgbWVzc2FnZXMgc2VudCBieSBzZW5kXG4gICAgICogb24gY2hpbGRyZW4gb2YgdGhpcyBDcmR0LlxuICAgICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHBhc3MgdGhlXG4gICAgICogbWVzc2FnZSB0byBjaGlsZCB1bmNoYW5nZWQsIGJ5XG4gICAgICogY2FsbGluZyBjaGlsZC5yZWNlaXZlKHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZFxuICAgICAqIEBwYXJhbSAgdGFyZ2V0UGF0aCBUaGUgdGFyZ2V0UGF0aCB0aGF0IHdvdWxkIG5vcm1hbGx5XG4gICAgICogYmUgZGVsaXZlcmVkIHRvIHRoZSBjaGlsZCwgaS5lLiwgdGhlIGlkcyBvZiB0aGUgQ3JkdHNcbiAgICAgKiBvbiB0aGUgcGF0aFxuICAgICAqIGZyb20gdGhlIG1lc3NhZ2UncyB1bHRpbWF0ZSB0YXJnZXQgdG8gY2hpbGQsIGV4Y2x1ZGluZ1xuICAgICAqIGNoaWxkLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgdGhpcyBDcmR0J3Mgc3RhdGUgd2FzIGNoYW5nZWQsIGkuZS4sXG4gICAgICogYSBDcmR0RXZlbnQgb2YgdHlwZSBcIkNoYW5nZVwiIHNob3VsZCBiZVxuICAgICAqIGRpc3BhdGNoZWQuXG4gICAgICovXG4gICAgcmVjZWl2ZUludGVybmFsRm9yQ2hpbGQoY2hpbGQsIHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQucmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdCA9IENyZHQ7XG4vLyBUT0RPOiBnZW5lcmljIGNoYW5nZSBldmVudHMgZnJvbSByZXR1cm4gdmFsdWVzXG5jbGFzcyBDcmR0UnVudGltZSB7XG4gICAgY29uc3RydWN0b3IobmV0d29yaykge1xuICAgICAgICB0aGlzLm5ldHdvcmsgPSBuZXR3b3JrO1xuICAgICAgICB0aGlzLnJvb3RDcmR0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrLnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cbiAgICByZWdpc3RlclJvb3QoY3JkdCkge1xuICAgICAgICB0aGlzLnJvb3RDcmR0cy5zZXQoY3JkdC5pZCwgY3JkdCk7XG4gICAgfVxuICAgIHNlbmQoc2VuZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLm5ldHdvcmsuZ2V0TmV4dFRpbWVzdGFtcChzZW5kZXIucm9vdElkKTtcbiAgICAgICAgLy8gRGVsaXZlciB0byBzZWxmXG4gICAgICAgIC8vIFRPRE86IGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoaXMucm9vdENyZHRzLmdldChzZW5kZXIucm9vdElkKS5yZWNlaXZlKHNlbmRlci5wYXRoVG9Sb290LnNsaWNlKCksIHRpbWVzdGFtcCwgbWVzc2FnZSk7XG4gICAgICAgIGxldCBydW50aW1lTWVzc2FnZSA9IHByb3RvX2NvbXBpbGVkXzEuQ3JkdFJ1bnRpbWVNZXNzYWdlLmNyZWF0ZSh7XG4gICAgICAgICAgICBpbm5lck1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICBwYXRoVG9Sb290OiBzZW5kZXIucGF0aFRvUm9vdFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuQ3JkdFJ1bnRpbWVNZXNzYWdlLmVuY29kZShydW50aW1lTWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMubmV0d29yay5zZW5kKHNlbmRlci5yb290SWQsIGJ1ZmZlciwgdGltZXN0YW1wKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZm9yIENyZHROZXR3b3JrLlxuICAgICAqL1xuICAgIHJlY2VpdmUoZ3JvdXAsIG1lc3NhZ2UsIHRpbWVzdGFtcCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLkNyZHRSdW50aW1lTWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnJvb3RDcmR0cy5nZXQoZ3JvdXApLnJlY2VpdmUoZGVjb2RlZC5wYXRoVG9Sb290LCB0aW1lc3RhbXAsIGRlY29kZWQuaW5uZXJNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ldHdvcmsuZ2V0UmVwbGljYUlkKCk7XG4gICAgfVxuICAgIGdldENyZHRCeVJlZmVyZW5jZShyb290SWQsIHBhdGhUb1Jvb3QpIHtcbiAgICAgICAgLy8gVE9ETzogb3B0aW1pemU/XG4gICAgICAgIGxldCBjdXJyZW50Q3JkdCA9IHRoaXMucm9vdENyZHRzLmdldChyb290SWQpO1xuICAgICAgICBpZiAoIWN1cnJlbnRDcmR0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHJvb3RJZDogXCIgKyByb290SWQpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBwYXRoVG9Sb290Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjdXJyZW50Q3JkdCA9IGN1cnJlbnRDcmR0LmNoaWxkcmVuLmdldChwYXRoVG9Sb290W2ldKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudENyZHQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGNoaWxkOiBcIiArIHBhdGhUb1Jvb3RbaV0gK1xuICAgICAgICAgICAgICAgICAgICBcIiBhdCBpbmRleCBcIiArIGkgKyBcIiBpbiByZWZlcmVuY2U6IHJvb3RJZD1cIiArXG4gICAgICAgICAgICAgICAgICAgIHJvb3RJZCArIFwiLCBwYXRoVG9Sb290PVwiICsgcGF0aFRvUm9vdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDcmR0O1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdFJ1bnRpbWUgPSBDcmR0UnVudGltZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfY29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2Jhc2ljX2NyZHRzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X2NvcmVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3V0aWxzXCIpLCBleHBvcnRzKTtcbi8vZXhwb3J0ICogZnJvbSAnLi9qc29uJztcbi8vZXhwb3J0ICogZnJvbSAnLi9tdWx0aV9zZW1pZGlyZWN0Jztcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9yZXNldHRhYmxlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpLCBleHBvcnRzKTtcbi8vZXhwb3J0ICogZnJvbSAnLi9zdGFuZGFyZCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT3B0aW9uYWxSZXNldHRhYmxlU2VtaWRpcmVjdFByb2R1Y3QgPSBleHBvcnRzLk9wdGlvbmFsUmVzZXR0YWJsZUNyZHQgPSBleHBvcnRzLlJlc2V0V3JhcHBlckNyZHQgPSB2b2lkIDA7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbmNvbnN0IHNlbWlkaXJlY3RfMSA9IHJlcXVpcmUoXCIuL3NlbWlkaXJlY3RcIik7XG5jbGFzcyBSZXNldENvbXBvbmVudE1lc3NhZ2UgZXh0ZW5kcyBVaW50OEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5pc1Jlc2V0Q29tcG9uZW50TWVzc2FnZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVwbGF5ID0gW107XG4gICAgfVxufVxuY2xhc3MgUmVzZXRDb21wb25lbnQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGlkLCB0YXJnZXRDcmR0KSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCwgaWQsIG51bGwpO1xuICAgICAgICB0aGlzLnRhcmdldENyZHQgPSB0YXJnZXRDcmR0O1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgc3VwZXIuc2VuZChuZXcgVWludDhBcnJheSgpKTtcbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnRhcmdldENyZHQuaGFyZFJlc2V0KCk7XG4gICAgICAgIHRoaXMucGFyZW50LmRpc3BhdGNoUmVzZXRFdmVudCh0aW1lc3RhbXApO1xuICAgICAgICBpZiAoXCJpc1Jlc2V0Q29tcG9uZW50TWVzc2FnZVwiIGluIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIC8vIFJlcGxheSBtZXNzYWdlLnJlcGxheVxuICAgICAgICAgICAgZm9yIChsZXQgdG9SZXBsYXkgb2YgbWVzc2FnZS5yZXBsYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldENyZHQucmVjZWl2ZSguLi50b1JlcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuY2xhc3MgUmVzZXRXcmFwcGVyQ3JkdCBleHRlbmRzIHNlbWlkaXJlY3RfMS5TZW1pZGlyZWN0UHJvZHVjdCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtlZXBPbmx5TWF4aW1hbD1mYWxzZSBTdG9yZSBvbmx5IGNhdXNhbGx5IG1heGltYWxcbiAgICAgKiBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSwgdG8gc2F2ZSBzcGFjZSAoYWx0aG91Z2ggcG9zc2libHlcbiAgICAgKiBhdCBzb21lIENQVSBjb3N0KS4gIFRoaXMgaXMgb25seSBhbGxvd2VkIGlmIHRoZSBzdGF0ZVxuICAgICAqIG9ubHkgZXZlciBkZXBlbmRzIG9uIHRoZSBjYXVzYWxseSBtYXhpbWFsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIHRydWUsIHRydWUsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgfVxuICAgIHNldHVwUmVzZXQodGFyZ2V0Q3JkdCkge1xuICAgICAgICB0aGlzLnJlc2V0Q29tcG9uZW50ID0gbmV3IFJlc2V0Q29tcG9uZW50KHRoaXMsIHRoaXMuaWQgKyBcIl9jb21wXCIsIHRhcmdldENyZHQpO1xuICAgICAgICBzdXBlci5zZXR1cCh0aGlzLnJlc2V0Q29tcG9uZW50LCB0YXJnZXRDcmR0LCB0aGlzLmFjdGlvbi5iaW5kKHRoaXMpLCB0YXJnZXRDcmR0LnN0YXRlKTtcbiAgICB9XG4gICAgYWN0aW9uKG0yVGFyZ2V0UGF0aCwgbTJUaW1lc3RhbXAsIG0yTWVzc2FnZSwgbTFUYXJnZXRQYXRoLCBfbTFUaW1lc3RhbXAsIG0xTWVzc2FnZSkge1xuICAgICAgICBpZiAoIShcImlzUmVzZXRDb21wb25lbnRNZXNzYWdlXCIgaW4gbTFNZXNzYWdlKSkge1xuICAgICAgICAgICAgbTFNZXNzYWdlID0gbmV3IFJlc2V0Q29tcG9uZW50TWVzc2FnZSgpO1xuICAgICAgICB9XG4gICAgICAgIG0xTWVzc2FnZS5yZXBsYXkucHVzaChbbTJUYXJnZXRQYXRoLnNsaWNlKCksIG0yVGltZXN0YW1wLCBtMk1lc3NhZ2VdKTtcbiAgICAgICAgcmV0dXJuIFttMVRhcmdldFBhdGgsIG0xTWVzc2FnZV07XG4gICAgfVxuICAgIGRpc3BhdGNoUmVzZXRFdmVudCh0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgIGNhbGxlcjogdGhpcyxcbiAgICAgICAgICAgIHR5cGU6IFwiUmVzZXRcIixcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5yZXNldENvbXBvbmVudC5yZXNldCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVzZXRXcmFwcGVyQ3JkdCA9IFJlc2V0V3JhcHBlckNyZHQ7XG5jbGFzcyBPcHRpb25hbFJlc2V0dGFibGVDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtlZXBPbmx5TWF4aW1hbD1mYWxzZSBTdG9yZSBvbmx5IGNhdXNhbGx5IG1heGltYWxcbiAgICAgKiBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSwgdG8gc2F2ZSBzcGFjZSAoYWx0aG91Z2ggcG9zc2libHlcbiAgICAgKiBhdCBzb21lIENQVSBjb3N0KS4gIFRoaXMgaXMgb25seSBhbGxvd2VkIGlmIHRoZSBzdGF0ZVxuICAgICAqIG9ubHkgZXZlciBkZXBlbmRzIG9uIHRoZSBjYXVzYWxseSBtYXhpbWFsIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxTdGF0ZSwgcmVzZXR0YWJsZSA9IHRydWUsIGtlZXBPbmx5TWF4aW1hbCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChyZXNldHRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgcmVzZXRXcmFwcGVyQ3JkdCA9IG5ldyBSZXNldFdyYXBwZXJDcmR0KHBhcmVudE9yUnVudGltZSwgaWQgKyBcIl9yZXNldFwiLCBrZWVwT25seU1heGltYWwpO1xuICAgICAgICAgICAgc3VwZXIocmVzZXRXcmFwcGVyQ3JkdCwgaWQsIGluaXRpYWxTdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0V3JhcHBlckNyZHQgPSByZXNldFdyYXBwZXJDcmR0O1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5zZXR1cFJlc2V0KHRoaXMpO1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5hZGRFdmVudExpc3RlbmVyKFwiUmVzZXRcIiwgKGV2ZW50KSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICAgIGNhbGxlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZXZlbnQudGltZXN0YW1wXG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldHRhYmxlID0gcmVzZXR0YWJsZTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0dGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVzZXQoKSBjYWxsZWQgYnV0IHJlc2V0dGFibGUgaXMgZmFsc2VcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk9wdGlvbmFsUmVzZXR0YWJsZUNyZHQgPSBPcHRpb25hbFJlc2V0dGFibGVDcmR0O1xuY2xhc3MgT3B0aW9uYWxSZXNldHRhYmxlU2VtaWRpcmVjdFByb2R1Y3QgZXh0ZW5kcyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdFByb2R1Y3Qge1xuICAgIC8qKlxuICAgICAqIEZvciBtb3JlIHBhcmFtZXRlciBkZXNjcmlwdGlvbnMsIHNlZVxuICAgICAqIFNlbWlkaXJlY3RQcm9kdWN0LlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCByZXNldHRhYmxlLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSwgaGlzdG9yeVRpbWVzdGFtcHMgPSB0cnVlLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHJlc2V0dGFibGUpIHtcbiAgICAgICAgICAgIGxldCByZXNldFdyYXBwZXJDcmR0ID0gbmV3IFJlc2V0V3JhcHBlckNyZHQocGFyZW50T3JSdW50aW1lLCBpZCArIFwiX3Jlc2V0XCIsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgICAgICAgICBzdXBlcihyZXNldFdyYXBwZXJDcmR0LCBpZCwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdCA9IHJlc2V0V3JhcHBlckNyZHQ7XG4gICAgICAgICAgICByZXNldFdyYXBwZXJDcmR0LnNldHVwUmVzZXQodGhpcyk7XG4gICAgICAgICAgICByZXNldFdyYXBwZXJDcmR0LmFkZEV2ZW50TGlzdGVuZXIoXCJSZXNldFwiLCAoZXZlbnQpID0+IHRoaXMuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICAgICAgY2FsbGVyOiB0aGlzLFxuICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBldmVudC50aW1lc3RhbXBcbiAgICAgICAgICAgIH0pLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBoaXN0b3J5VGltZXN0YW1wcywgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpO1xuICAgICAgICB0aGlzLnJlc2V0dGFibGUgPSByZXNldHRhYmxlO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzZXRXcmFwcGVyQ3JkdCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFdyYXBwZXJDcmR0LnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFyZFJlc2V0KCkge1xuICAgICAgICB0aGlzLnN0YXRlLmhhcmRSZXNldCgpO1xuICAgICAgICB0aGlzLmhhcmRSZXNldEludGVybmFsKCk7XG4gICAgfVxufVxuZXhwb3J0cy5PcHRpb25hbFJlc2V0dGFibGVTZW1pZGlyZWN0UHJvZHVjdCA9IE9wdGlvbmFsUmVzZXR0YWJsZVNlbWlkaXJlY3RQcm9kdWN0O1xuLy8gVE9ETzogcmVzZXQgd2lucz9cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc2V0dGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNlbWlkaXJlY3RQcm9kdWN0ID0gZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSB2b2lkIDA7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbmNsYXNzIFN0b3JlZE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNlbmRlckNvdW50ZXIsIHJlY2VpcHRDb3VudGVyLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zZW5kZXJDb3VudGVyID0gc2VuZGVyQ291bnRlcjtcbiAgICAgICAgdGhpcy5yZWNlaXB0Q291bnRlciA9IHJlY2VpcHRDb3VudGVyO1xuICAgICAgICB0aGlzLnRhcmdldFBhdGggPSB0YXJnZXRQYXRoO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG59XG4vLyBUT0RPOiBmdXR1cmUgb3B0czogaW5kZXhlZCBtZXNzYWdlczsgc2V0dGluZyB0aGUgaGlzdG9yeVxuLy8gdG8gYSBzdWJzZXQ7IGNhdXNhbCBzdGFiaWxpdHkuXG4vLyBUT0RPOiBmb3IgdGhpcyB0byB3b3JrLCByZXBsaWNhSWQncyBtdXN0IGJlIGNvbXBhcmFibGUgYWNjb3JkaW5nXG4vLyB0byB0aGUgc2FtZS1lcXVhbHMgYXBwcm9hY2guICBUeXBpY2FsbHksIHRoaXMgcmVxdWlyZXMgdGhlbVxuLy8gdG8gYmUgcHJpbWl0aXZlIHR5cGVzLCBhcyBvYmplY3RzIHdoaWNoIGFyZSBlcXVhbC12YWx1ZWQgYnV0IGhhdmVcbi8vIGRpZmZlcmVudCBwb2ludGVycyB3aWxsIGJlIGNvbnNpZGVyZWQgZGlmZmVyZW50LlxuLy8gVE9ETzogbWVudGlvbiB0aGF0IHRvIGdldCBhIHByb3BlciBDUkRUIChlcXVhbCBpbnRlcm5hbCBzdGF0ZXMpLFxuLy8gd2UgdGVjaG5pY2FsbHkgbXVzdCBjb21wYXJlIHJlY2VpcHQgb3JkZXJzIGFzIGVxdWl2YWxlbnQgaWZcbi8vIHRoZXkgYXJlIGJvdGggaW4gY2F1c2FsIG9yZGVyLlxuY2xhc3MgU2VtaWRpcmVjdFN0YXRlIHtcbiAgICBjb25zdHJ1Y3RvcihoaXN0b3J5VGltZXN0YW1wcywgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5VGltZXN0YW1wcyA9IGhpc3RvcnlUaW1lc3RhbXBzO1xuICAgICAgICB0aGlzLmhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZDtcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogTWFwcyBhIHJlcGxpY2EgaWQgdG8gYW4gYXJyYXkgb2YgbWVzc2FnZXMgc2VudCBieSB0aGF0XG4gICAgICAgICAqIHJlcGxpY2EsIGluIG9yZGVyLiAgS2VlcCBpbiBtaW5kIHRoYXQgcGVyLXNlbmRlciBtZXNzYWdlXG4gICAgICAgICAqIGNvdW50ZXJzIG1heSBub3QgYmUgY29udGlndW91cywgc2luY2UgdGhleSBhcmUgc2hhcmVkIGJldHdlZW5cbiAgICAgICAgICogYWxsIENyZHRzIHdpdGggYSBnaXZlbiByb290LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgbWVzc2FnZSB0byB0aGUgaGlzdG9yeSB3aXRoIHRoZSBnaXZlbiB0aW1lc3RhbXAuXG4gICAgICogcmVwbGljYUlkIGlzIG91ciByZXBsaWNhIGlkLlxuICAgICAqL1xuICAgIGFkZChyZXBsaWNhSWQsIHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5oaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZW5kZXJIaXN0b3J5ID0gdGhpcy5oaXN0b3J5LmdldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpO1xuICAgICAgICBpZiAoc2VuZGVySGlzdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW5kZXJIaXN0b3J5ID0gW107XG4gICAgICAgICAgICB0aGlzLmhpc3Rvcnkuc2V0KHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgc2VuZGVySGlzdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZGVySGlzdG9yeS5wdXNoKG5ldyBTdG9yZWRNZXNzYWdlKHRpbWVzdGFtcC5nZXRTZW5kZXJDb3VudGVyKCksIHRoaXMucmVjZWlwdENvdW50ZXIsIHRhcmdldFBhdGgsICh0aGlzLmhpc3RvcnlUaW1lc3RhbXBzID8gdGltZXN0YW1wIDogbnVsbCksIG1lc3NhZ2UpKTtcbiAgICAgICAgdGhpcy5yZWNlaXB0Q291bnRlcisrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGhlIGdpdmVuXG4gICAgICogdGltZXN0YW1wLCBpbiBzb21lIGNhdXNhbCBvcmRlciAoc3BlY2lmaWNhbGx5LCB0aGlzIHJlcGxpY2Enc1xuICAgICAqIHJlY2VpcHQgb3JkZXIpLiAgSWYgd2UgYXJlIHRoZSBzZW5kZXIgKGkuZS4sIHJlcGxpY2FJZCA9PT1cbiAgICAgKiB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpLCBpdCBpcyBhc3N1bWVkIHRoYXQgdGhlIHRpbWVzdGFtcCBpc1xuICAgICAqIGNhdXNhbGx5IGdyZWF0ZXIgdGhhbiBhbGwgcHJpb3IgbWVzc2FnZXMsIGFzIGRlc2NyaWJlZCBpblxuICAgICAqIENyZHRJbnRlcm5hbC5lZmZlY3QsIGhlbmNlIFtdIGlzIHJldHVybmVkLlxuICAgICAqL1xuICAgIGdldENvbmN1cnJlbnQocmVwbGljYUlkLCB0aW1lc3RhbXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgdHJ1ZSwgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBzcGVjaWZpZWQgYWN0aW9ucyBvbiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3Rvcnk6XG4gICAgICogLSBpZiByZXR1cm5Db25jdXJyZW50IGlzIHRydWUsIHJldHVybnMgdGhlIGxpc3Qgb2ZcbiAgICAgKiBhbGwgbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnkgY29uY3VycmVudCB0byB0aW1lc3RhbXAsIGluXG4gICAgICogcmVjZWlwdCBvcmRlci5cbiAgICAgKiAtIGlmIGRpc2NhcmREb21pbmF0ZWQgaXMgdHJ1ZSwgZGVsZXRlcyBhbGwgbWVzc2FnZXMgZnJvbVxuICAgICAqIHRoZSBoaXN0b3J5IHdob3NlIHRpbWVzdGFtcHMgYXJlIGNhdXNhbGx5IGRvbWluYXRlZCBieVxuICAgICAqIG9yIGVxdWFsIHRvIHRoZSBnaXZlbiB0aW1lc3RhbXAuICAoTm90ZSB0aGF0IHRoaXMgbWVhbnMgdGhhdFxuICAgICAqIGlmIHdlIHdhbnQgdG8ga2VlcCBhIG1lc3NhZ2Ugd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wIGluXG4gICAgICogdGhlIGhpc3RvcnksIGl0IG11c3QgYmUgYWRkZWQgdG8gdGhlIGhpc3RvcnkgYWZ0ZXIgY2FsbGluZ1xuICAgICAqIHRoaXMgbWV0aG9kLilcbiAgICAgKi9cbiAgICBwcm9jZXNzVGltZXN0YW1wKHJlcGxpY2FJZCwgdGltZXN0YW1wLCByZXR1cm5Db25jdXJyZW50LCBkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgIGlmIChyZXBsaWNhSWQgPT09IHRpbWVzdGFtcC5nZXRTZW5kZXIoKSkge1xuICAgICAgICAgICAgaWYgKGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RoaW5nJ3MgY29uY3VycmVudCwgc28gY2xlYXIgZXZlcnl0aGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuaGlzdG9yeS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdhdGhlciB1cCB0aGUgY29uY3VycmVudCBtZXNzYWdlcy4gIFRoZXNlIGFyZSBhbGxcbiAgICAgICAgLy8gbWVzc2FnZXMgYnkgZWFjaCByZXBsaWNhSWQgd2l0aCBzZW5kZXIgY291bnRlclxuICAgICAgICAvLyBncmVhdGVyIHRoYW4gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKS5nZXQocmVwbGljYUlkKS5cbiAgICAgICAgbGV0IGNvbmN1cnJlbnQgPSBbXTtcbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdmMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQoZW50cnlbMF0pO1xuICAgICAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCBjb25jdXJyZW50SW5kZXhTdGFydCA9IFNlbWlkaXJlY3RTdGF0ZS5pbmRleEFmdGVyKHNlbmRlckhpc3RvcnksIGVudHJ5WzFdKTtcbiAgICAgICAgICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gY29uY3VycmVudEluZGV4U3RhcnQ7IGkgPCBzZW5kZXJIaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jdXJyZW50LnB1c2goc2VuZGVySGlzdG9yeVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRpc2NhcmREb21pbmF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBvbmx5IHRoZSBtZXNzYWdlcyB3aXRoIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIC8vID49IGNvbmN1cnJlbnRJbmRleFN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIHNlbmRlckhpc3Rvcnkuc3BsaWNlKDAsIGNvbmN1cnJlbnRJbmRleFN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZGVsZXRlIGl0IGZyb20gdGhlIG1hcCBpZiBlbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgYSBmb3JtIG9mIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBhbHNvIG1ha2VzIGlzSGlzdG9yeUVtcHR5IHNpbXBsZXIuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXR1cm5Db25jdXJyZW50KSB7XG4gICAgICAgICAgICAvLyBTb3J0IHRoZSBjb25jdXJyZW50IG1lc3NhZ2VzIGluIHJlY2VpcHQgb3JkZXIuXG4gICAgICAgICAgICBjb25jdXJyZW50LnNvcnQoKGEsIGIpID0+IChhLnJlY2VpcHRDb3VudGVyIC0gYi5yZWNlaXB0Q291bnRlcikpO1xuICAgICAgICAgICAgLy8gU3RyaXAgYXdheSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgbWVzc2FnZXMuXG4gICAgICAgICAgICByZXR1cm4gY29uY3VycmVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbWVzc2FnZXMgc3RvcmVkIGluIHRoZSBoaXN0b3J5LFxuICAgICAqIGkuZS4sIGVpdGhlciB0aGVyZSBoYXZlIGJlZW4gbm8gY3JkMSBtZXNzYWdlcywgb3JcbiAgICAgKiBvdXIgU2VtaWRpcmVjdEludGVybmFsJ3MgaGlzdG9yeUtlZXBPbmx5Q29uY3VycmVudCBmbGFnIGlzIHRydWVcbiAgICAgKiBhbmQgYWxsIGNyZHQxIG1lc3NhZ2VzIGhhdmUgYmVlbiBjYXVzYWxseSBsZXNzIHRoYW4gYSBjcmR0MlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgaXNIaXN0b3J5RW1wdHkoKSB7XG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuaGlzdG9yeS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGhhcmRSZXNldCgpIHtcbiAgICAgICAgdGhpcy5yZWNlaXB0Q291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IG1ldGhvZCBmb3Igd29ya2luZyB3aXRoIHRoZSBwZXItc2VuZGVyIGhpc3RvcnlcbiAgICAgKiBhcnJheXMuICBSZXR1cm5zIHRoZSBpbmRleCBhZnRlciB0aGUgbGFzdCBlbnRyeSB3aG9zZVxuICAgICAqIHBlci1zZW5kZXIgY291bnRlciAodGhlIGZpcnN0IHR1cGxlIGVsZW1lbnQpIGlzIDw9XG4gICAgICogdmFsdWUuXG4gICAgICovXG4gICAgc3RhdGljIGluZGV4QWZ0ZXIoc3BhcnNlQXJyYXksIHZhbHVlKSB7XG4gICAgICAgIC8vIFRPRE86IGJpbmFyeSBzZWFyY2ggd2hlbiBzcGFyc2VBcnJheSBpcyBsYXJnZVxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlcmUgbWF5IGJlIGR1cGxpY2F0ZSB0aW1lc3RhbXBzLlxuICAgICAgICAvLyBTbyBpdCB3b3VsZCBiZSBpbmFwcHJvcHJpYXRlIHRvIGZpbmQgYW4gZW50cnkgd2hvc2VcbiAgICAgICAgLy8gcGVyLXNlbmRlciBjb3VudGVyIGVxdWFscyB2YWx1ZSBhbmQgaW5mZXIgdGhhdFxuICAgICAgICAvLyB0aGUgZGVzaXJlZCBpbmRleCBpcyAxIGdyZWF0ZXIuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BhcnNlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzcGFyc2VBcnJheVtpXS5zZW5kZXJDb3VudGVyID4gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYXJzZUFycmF5Lmxlbmd0aDtcbiAgICB9XG59XG5leHBvcnRzLlNlbWlkaXJlY3RTdGF0ZSA9IFNlbWlkaXJlY3RTdGF0ZTtcbmNsYXNzIFNlbWlkaXJlY3RQcm9kdWN0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaGlzdG9yeVRpbWVzdGFtcHMgPSBmYWxzZSwgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIG5ldyBTZW1pZGlyZWN0U3RhdGUoaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSk7XG4gICAgfVxuICAgIHNldHVwKGNyZHQxLCBjcmR0MiwgYWN0aW9uLCBpbml0aWFsU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5pbnRlcm5hbFN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5nZXQoY3JkdDEuaWQpICE9PSBjcmR0MSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3JkdDEgKFwiICsgY3JkdDEuaWQgKyBcIikgaXMgbm90IG91ciBjaGlsZFwiICtcbiAgICAgICAgICAgICAgICBcIiAoaXMgaXQgdXNpbmcgYSB3cmFwcGVyIGNyZHQsIGUuZy4sIGJlY3Vhc2UgcmVzZXR0YWJsZSA9IHRydWU/KVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5nZXQoY3JkdDIuaWQpICE9PSBjcmR0Mikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3JkdDIgKFwiICsgY3JkdDIuaWQgKyBcIikgaXMgbm90IG91ciBjaGlsZFwiICtcbiAgICAgICAgICAgICAgICBcIiAoaXMgaXQgdXNpbmcgYSB3cmFwcGVyIGNyZHQsIGUuZy4sIGJlY3Vhc2UgcmVzZXR0YWJsZSA9IHRydWU/KVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNyZHQxID0gY3JkdDE7XG4gICAgICAgIHRoaXMuY3JkdDIgPSBjcmR0MjtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBJZ25vcmUgcmVhZG9ubHlcbiAgICAgICAgY3JkdDEuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgSWdub3JlIHJlYWRvbmx5XG4gICAgICAgIGNyZHQyLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICB0aGlzLmFjdGlvblZhciA9IGFjdGlvbjtcbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsRm9yQ2hpbGQoY2hpbGQsIHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKGNoaWxkKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMuY3JkdDI6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hZGQodGhpcy5ydW50aW1lLmdldFJlcGxpY2FJZCgpLCB0YXJnZXRQYXRoLnNsaWNlKCksIHRpbWVzdGFtcCwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JkdDIucmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgY2FzZSB0aGlzLmNyZHQxOlxuICAgICAgICAgICAgICAgIGxldCBjb25jdXJyZW50ID0gdGhpcy5zdGF0ZS5nZXRDb25jdXJyZW50KHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICBsZXQgbUFjdCA9IFt0YXJnZXRQYXRoLCBtZXNzYWdlXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmN1cnJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2FuIHdlIGF2b2lkIHNlcmlhbGl6aW5nIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyBkZXNlcmlhbGl6aW5nIGVhY2ggdGltZT8gIExpa2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2l0aCBSZXNldENvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1BY3RPck51bGwgPSB0aGlzLmFjdGlvblZhcihjb25jdXJyZW50W2ldLnRhcmdldFBhdGgsIGNvbmN1cnJlbnRbaV0udGltZXN0YW1wLCBjb25jdXJyZW50W2ldLm1lc3NhZ2UsIG1BY3RbMF0sIHRpbWVzdGFtcCwgbUFjdFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtQWN0T3JOdWxsID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBtQWN0ID0gbUFjdE9yTnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JkdDEucmVjZWl2ZShtQWN0WzBdLCB0aW1lc3RhbXAsIG1BY3RbMV0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBOb3QgaW52b2x2ZWQgd2l0aCBzZW1pZGlyZWN0IHByb2R1Y3RcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQucmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0UHJvZHVjdCA9IFNlbWlkaXJlY3RQcm9kdWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VtaWRpcmVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIgPSBleHBvcnRzLmRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplciA9IHZvaWQgMDtcbmNvbnN0IHByb3RvX2NvbXBpbGVkXzEgPSByZXF1aXJlKFwiLi4vcHJvdG9fY29tcGlsZWRcIik7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbi8qKlxuICogU2VyaWFsaXplciBmb3Igc3RyaW5nLCBudW1iZXIsIGFuZCBDcmR0IHR5cGVzLlxuICogc3RyaW5nIGFuZCBudW1iZXIgdHlwZXMgYXJlIHBhc3NlZCBieS12YWx1ZS5cbiAqIENyZHQgdHlwZXMgYXJlIHNlbnQgYnktcmVmZXJlbmNlLCB1c2luZyB0aGUgQ3JkdCdzXG4gKiByb290SWQgYW5kIHBhdGhUb1Jvb3QgdG8gaWRlbnRpZnkgZGlmZmVyZW50IHJlcGxpY2FzXG4gKiBvZiB0aGUgc2FtZSBDcmR0LiAgT3RoZXIgdHlwZXMgY2F1c2UgYW4gZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplcih2YWx1ZSkge1xuICAgIGxldCBtZXNzYWdlO1xuICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB7IHN0cmluZ1ZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB7IG51bWJlclZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBjcmR0X2NvcmVfMS5DcmR0KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3JkdFZhbHVlOiBwcm90b19jb21waWxlZF8xLkNyZHRSZWZlcmVuY2UuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RJZDogdmFsdWUucm9vdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aFRvUm9vdDogdmFsdWUucGF0aFRvUm9vdFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIgb25seSB3b3JrcyB3aXRoIHZhbHVlcyBvZiB0eXBlIHN0cmluZyB8IG51bWJlciB8IENyZHRcIik7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm90b19jb21waWxlZF8xLkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG59XG5leHBvcnRzLmRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplciA9IGRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplcjtcbi8qKlxuICogUmV0dXJucyBhIGRlc2VyaWFsaXplciBmb3Igc3RyaW5nLCBudW1iZXIsIGFuZCBDcmR0IHR5cGVzLlxuICogc3RyaW5nIGFuZCBudW1iZXIgdHlwZXMgYXJlIHBhc3NlZCBieS12YWx1ZS5cbiAqIENyZHQgdHlwZXMgYXJlIHNlbnQgYnktcmVmZXJlbmNlLCB1c2luZyB0aGUgQ3JkdCdzXG4gKiByb290SWQgYW5kIHBhdGhUb1Jvb3QgdG8gaWRlbnRpZnkgZGlmZmVyZW50IHJlcGxpY2FzXG4gKiBvZiB0aGUgc2FtZSBDcmR0LiAgT3RoZXIgdHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXG4gKi9cbmZ1bmN0aW9uIG5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHBhcmVudE9yUnVudGltZSkge1xuICAgIGxldCBydW50aW1lO1xuICAgIGlmIChcImlzQ3JkdFwiIGluIHBhcmVudE9yUnVudGltZSlcbiAgICAgICAgcnVudGltZSA9IHBhcmVudE9yUnVudGltZS5ydW50aW1lO1xuICAgIGVsc2VcbiAgICAgICAgcnVudGltZSA9IHBhcmVudE9yUnVudGltZTtcbiAgICAvLyBUT0RPOiBob3cgdG8gZXJyb3IgaWYgaXQncyBub3QgYWN0dWFsbHkgVD9cbiAgICByZXR1cm4gKG1lc3NhZ2UpID0+IGRlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHJ1bnRpbWUsIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5uZXdEZWZhdWx0Q29sbGVjdGlvbkRlc2VyaWFsaXplciA9IG5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyO1xuZnVuY3Rpb24gZGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocnVudGltZSwgbWVzc2FnZSkge1xuICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgIHN3aXRjaCAoZGVjb2RlZC52YWx1ZSkge1xuICAgICAgICBjYXNlIFwic3RyaW5nVmFsdWVcIjpcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVkLnN0cmluZ1ZhbHVlO1xuICAgICAgICBjYXNlIFwibnVtYmVyVmFsdWVcIjpcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVkLm51bWJlclZhbHVlO1xuICAgICAgICBjYXNlIFwiY3JkdFZhbHVlXCI6XG4gICAgICAgICAgICByZXR1cm4gcnVudGltZS5nZXRDcmR0QnlSZWZlcmVuY2UoZGVjb2RlZC5jcmR0VmFsdWUucm9vdElkLCBkZWNvZGVkLmNyZHRWYWx1ZS5wYXRoVG9Sb290KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBtZXNzYWdlIGZvcm1hdDogZGVjb2RlZC52YWx1ZT1cIiArIGRlY29kZWQudmFsdWUpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gRmlyc3QgYXR0ZW1wdCBhdCB0aGUgaW50ZXJmYWNlIGJldHdlZW4gdGhlIHJ1bnRpbWVcbi8vIChjYXVzYWwgYnJvYWRjYXN0IG5ldHdvcmssIGV0Yy4pIGFuZCB0aGUgQ3JkdHMuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X25ldHdvcmtfaW50ZXJmYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XZWJTb2NrZXROZXR3b3JrID0gZXhwb3J0cy5teU1lc3NhZ2UgPSB2b2lkIDA7XG5jb25zdCBfMSA9IHJlcXVpcmUoXCIuXCIpO1xuLy8gaW1wb3J0IFdlYlNvY2tldCA9IHJlcXVpcmUoXCJ3c1wiKTtcbi8vIFRoZSBjYXN1YWwgYnJvYWRjYXN0IG5ldHdvcmsgZGVzaWduZWQgZm9yIGEgdHdvLXdheSBpbnRlcmFjdGl2ZVxuLy8gY29tbXVuaWNhdGlvbiBzZXNzaW9uIGJldHdlZW4gdXNlciBhbmQgc2VydmVyIHVzaW5nIFdlYlNvY2tldCBBUEkuXG4vL1xuLy8gQWxzbyBlbnN1cmUgdGhlIG9yZGVyIG9mIGRlbGl2ZXJ5IHdpdGggY2FzdWFsaXR5IGNoZWNrLlxuLyoqXG4gKiBDdXN0b21pemVkIG1lc3NhZ2UgZXZlbnQgdGhhdCB0cmF2ZWwgdGhyb3VnaFxuICogY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsuXG4gKi9cbmNsYXNzIG15TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgZ3JvdXAsIHRpbWVzdGFtcCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjdXN0b21pemVkIHRvSlNPTiBmdW5jdGlvbiB0byBjb252ZXJ0IG1lc3NhZ2UgYXMgSlNPTiBmb3JtYXQuXG4gICAgICogVE9ETzogdXNlIHByb3RvYnVmcy4gIEZvciBub3cgd2UgYmFzZTY0IGVuY29kZSB0aGVcbiAgICAgKiBpbm5lciBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgcGFja2FnZSBpbmZvIGluIEpTT04gZm9ybWF0LlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgXCJtZXNzYWdlXCI6IEFycmF5LmZyb20odGhpcy5tZXNzYWdlLnZhbHVlcygpKSxcbiAgICAgICAgICAgIFwiZ3JvdXBcIjogdGhpcy5ncm91cCxcbiAgICAgICAgICAgIFwidGltZXN0YW1wXCI6IHtcbiAgICAgICAgICAgICAgICBcInVpZFwiOiB0aGlzLnRpbWVzdGFtcC51aWQsXG4gICAgICAgICAgICAgICAgXCJ2ZWN0b3JNYXBcIjogQXJyYXkuZnJvbSh0aGlzLnRpbWVzdGFtcC52ZWN0b3JNYXAuZW50cmllcygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLm15TWVzc2FnZSA9IG15TWVzc2FnZTtcbi8qKlxuICogV2ViU29ja2V0TmV0d29yazpcbiAqXG4gKiBQcm9jZXNzIGluaXRpYWxpemF0aW9uIHdoZW4gc3RhcnRpbmcgYSBuZXcgdXNlciBub2RlLlxuICpcbiAqIENvbW11bmljYXRlIHdpdGggQ1JEVCdzIHJ1bnRpbWUgYW5kIHNlbmQvcmVjZWl2ZSBtZXNzYWdlIHZpYVxuICogY2VudHJhbCBicm9hZGNhc3Qgc2VydmVyIHdpdGggV2ViU29ja2V0IHByb3RvY29sLlxuICpcbiAqIFBlcmZvcm0gY2FzdWFsaXR5IGNoZWNrIHRvIGVuc3VyZSBtZXNzYWdlIG9yZGVyaW5nLlxuICovXG5jbGFzcyBXZWJTb2NrZXROZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQsIHdlYlNvY2tldEFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBzZW5kIG1lc3NhZ2UgYnVmZmVyIGhhcyBhbnkgbWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQuXG4gICAgICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAgICAgKiBJZiBub3QsIHRoZW4gd2FpdCBhIGN1c3RvbWl6ZWQgdGltZSBwZXJpb2QgYW5kIGNoZWNrIGFnYWluLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZW5kQWN0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQodGhpcy5zZW5kQnVmZmVyW2luZGV4XS50b0pTT04oKSk7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgLy8gVXNlIGhlYXJ0YmVhdCB0byBrZWVwIGNsaWVudCBhbGl2ZS5cbiAgICAgICAgICAgIC8vIHRoaXMuaGVhcnRiZWF0KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2UgaGVhcnRiZWF0IGZ1bmN0aW9uIHRvIGtlZXAgY2xpZW50cyBhbGl2ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogVE9ETzpcbiAgICAgICAgICogVGhlIG1lc3NhZ2Ugc2VuZGluZyB0byBzZXJ2ZXIgaXMgJ2hlYXJ0YmVhdCcgcmlnaHQgbm93LlxuICAgICAgICAgKiBUaGUgdGltZW91dCBpbnRlcnZhbCBpcyBzZXQgdG8gNTAwMCBtaWxsaW9uc2Vjb25kcy5cbiAgICAgICAgICovXG4gICAgICAgIC8vIGhlYXJ0YmVhdCgpIDogdm9pZCB7XG4gICAgICAgIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLndzLnNlbmQoJ2hlYXJ0YmVhdCcpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVhcnRiZWF0KCk7XG4gICAgICAgIC8vICAgICB9LCA1MDAwKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvKipcbiAgICAgICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIGludG8gbXlNZXNzYWdlIHR5cGUuXG4gICAgICAgICAqIFB1c2ggdGhlIG1lc3NhZ2UgaW50byByZWNlaXZlZCBtZXNzYWdlIGJ1ZmZlci5cbiAgICAgICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBhbGwgdGhlIG1lc3NhZ2VzIGFuZCBkZWxpdmVyIHRvIGFwcGxpY2F0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY2VpdmVBY3Rpb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IG15UGFja2FnZSA9IHRoaXMucGFyc2VKU09OKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIucHVzaChbbXlQYWNrYWdlLm1lc3NhZ2UsIG15UGFja2FnZS5ncm91cCwgbXlQYWNrYWdlLnRpbWVzdGFtcF0pO1xuICAgICAgICAgICAgdGhpcy5jaGVja01lc3NhZ2VCdWZmZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9wZW4gV2ViU29ja2V0IGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXIuXG4gICAgICAgICAqIFJlZ2lzdGVyIEV2ZW50TGlzdGVuZXIgd2l0aCBjb3JyZXNwb25kaW5nIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndzID0gbmV3IFdlYlNvY2tldCh3ZWJTb2NrZXRBcmdzKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgdGhpcy5zZW5kQWN0aW9uKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5yZWNlaXZlQWN0aW9uKTtcbiAgICAgICAgLy8gdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdwaW5nJywgZnVuY3Rpb24ocGluZ01lc3NhZ2Upe1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1JlY2VpdmUgYSBwaW5nIDogJyArIHBpbmdNZXNzYWdlKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCB0aGUgZnVuY3Rpb24gZGVmaW5lZCBpbiBDcmR0UnVudGltZSBpbnRlcmZhY2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyByZXBsaWNhJ3MgaWQsIHVzZWQgYnkgc29tZSBDUkRUcyBpbnRlcm5hbGx5XG4gICAgICogKGUuZy4sIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZGVudGlmaWVycyBvZiB0aGUgZm9ybSAocmVwbGljYSBpZCwgY291bnRlcikpLlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIENyZHRSdW50aW1lIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdFJ1bnRpbWVcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0UnVudGltZSkge1xuICAgICAgICB0aGlzLmNyZHRSdW50aW1lID0gY3JkdFJ1bnRpbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgZnVuY3Rpb24gb24gY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsgbGF5ZXIsIHdoaWNoIGNhbGxlZFxuICAgICAqIGJ5IGNyZHQncyBydW50aW1lIGxheWVyLlxuICAgICAqXG4gICAgICogVGhlIG1lc3NhZ2UgaXMgd3JhcHBlZCB3aXRoIGl0cyBjb3JyZXNwb25kaW5nIHRpbWVzdGFtcCAoYmFzaWMgc2VuZGVyIG5vZGVcbiAgICAgKiBpbmZvIGFuZCB2ZWN0b3IgY2xvY2spLlxuICAgICAqXG4gICAgICogVXNpbmcgV2ViU29ja2V0IGFzIG5ldHdvcmsgdHJhbnNtaXNzaW9uIHByb3RvY29sLlxuICAgICAqIFVzaW5nIEpTT04gZm9ybWF0IGFzIG1lc3NhZ2UgdHlwZS5cbiAgICAgKlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBub3QgT3BlbiwgdGhlbiBidWZmZXIgdGhlIG1lc3NhZ2UgYW5kXG4gICAgICogd2FpdCB1bnRpbCBXZWJTb2NrZXQgb3Blbi5cbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgT3BlbiwgdGhlbiBzZW5kIGl0IHdpdGggd3Muc2VuZCgpLlxuICAgICAqXG4gICAgICogQHBhcmFtIGdyb3VwIEFuIGlkZW50aWZpZXIgZm9yIHRoZSBncm91cCB0aGF0XG4gICAgICogdGhpcyBtZXNzYWdlIHNob3VsZCBiZSBicm9hZGNhc3QgdG8uICBBIGdyb3VwXG4gICAgICogZW5jb21wYXNzZXMgYm90aCBhIHNldCBvZiByZXBsaWNhcyBhbmQgYSB1bml0XG4gICAgICogb2YgY2F1c2FsIGNvbnNpc3RlbmN5LCBpLmUuLCBtZXNzYWdlcyBzaG91bGRcbiAgICAgKiBiZSBjYXVzYWxseSBjb25zaXN0ZW50IHdpdGhpbiBhIGdyb3VwIGJ1dCBuZWVkXG4gICAgICogbm90IGJlIGFjcm9zcyBncm91cHMuXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgICAqIEBwYXJhbSB0aW1lc3RhbXAgVGhlIENhdXNhbFRpbWVzdGFtcCByZXR1cm5lZCBieSB0aGVcbiAgICAgKiBsYXN0IGNhbGwgdG8gZ2V0TmV4dFRpbWVzdGFtcChncm91cCkuXG4gICAgICovXG4gICAgc2VuZChncm91cCwgbWVzc2FnZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIHZjKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgZ3JvdXAsIHZjKTtcbiAgICAgICAgLy8gQ29udmVydCB0aGUgbWVzc2FnZSBpbnRvIEpTT05cbiAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy53cy5zZW5kKG15UGFja2FnZS50b0pTT04oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChteVBhY2thZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmV4dCB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGNyZHRJZCBpbiB0aGlzIHJlcGxpY2EuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHBhc3NlZCB0byBDcmR0SW50ZXJuYWwuZWZmZWN0IHdoZW4gYSByZXBsaWNhIHByb2Nlc3NlcyBpdHMgb3duXG4gICAgICogbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIGNyZHRJZCB0aGF0IHdvdWxkIGxpa2UgdG8gcmV0dXJuLlxuICAgICAqIEByZXR1cm5zIFRoZSB0aW1lc3RhbXAgdGhhdCB3b3VsZCBiZSBhc3NpZ25lZCB0byBhIENSRFRcbiAgICAgKiBtZXNzYWdlIHNlbnQgYnkgdGhpcyByZXBsaWNhIGFuZCBnaXZlbiBjcmR0SWQgcmlnaHQgbm93LlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0TmV4dFRpbWVzdGFtcChncm91cCkge1xuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jay5cbiAgICAgICAgbGV0IHZjID0gdGhpcy52Y01hcC5nZXQoZ3JvdXApO1xuICAgICAgICBpZiAoIXZjKSB7XG4gICAgICAgICAgICB2YyA9IG5ldyBfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgdmMpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcCh2Yy5hc1ZlY3RvckNsb2NrKCkpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWVzdGFtcCBvZiB0aGlzIHJlcGxpY2Egd2l0aCBuZXh0IHZhbHVlLlxuICAgICAgICB2Y0NvcHkuaW5jcmVtZW50KCk7XG4gICAgICAgIHJldHVybiB2Y0NvcHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayB0byBjdXN0b21pemVkIGRhdGEgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHRyYXZlbCB0aHJvdWdoIG5ldHdvcmsuXG4gICAgICogQHJldHVybnMgdGhlIGN1c3RvbWl6ZWQgZGF0YSB0eXBlID0+IG15TWVzc2FnZVxuICAgICAqL1xuICAgIHBhcnNlSlNPTihkYXRhKSB7XG4gICAgICAgIGxldCBkYXRhSlNPTiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGxldCB2YyA9IG5ldyBfMS5WZWN0b3JDbG9jayhkYXRhSlNPTi50aW1lc3RhbXAudWlkLCB0aGlzLnVpZCA9PT0gZGF0YUpTT04udGltZXN0YW1wLnVpZCk7XG4gICAgICAgIHZjLnZlY3Rvck1hcCA9IG5ldyBNYXAoZGF0YUpTT04udGltZXN0YW1wLnZlY3Rvck1hcCk7XG4gICAgICAgIGxldCBtZXNzYWdlID0gVWludDhBcnJheS5mcm9tKGRhdGFKU09OLm1lc3NhZ2UpO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShtZXNzYWdlLCBkYXRhSlNPTi5ncm91cCwgdmMpO1xuICAgICAgICByZXR1cm4gbXlQYWNrYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGJ1ZmZlcmVkIG1lc3NhZ2VzIGFuZCBkZWxpdmVyeSB0aGVcbiAgICAgKiBtZXNzYWdlcyBiYWNrIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIgd2hpY2ggYXJlIHJlYWR5LlxuICAgICAqXG4gICAgICogVGhlIGNoZWNraW5nIG9yZGVyIGlzIGZyb20gdGhlIGxhc3Rlc3QgdG8gdGhlIG9sZGVzdC5cbiAgICAgKiBVcGRhdGUgdGhlIFZlY3RvckNsb2NrIGVudHJ5IGFuZCBNZXNzYWdlQnVmZmVyIHdoZW4gbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogU2VuZCB0aGUgbWVzc2FnZSBiYWNrIHRvIGNyZHRSdW50aW1lIHdpdGggY29ycmVzcG9uZGluZ1xuICAgICAqIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICovXG4gICAgY2hlY2tNZXNzYWdlQnVmZmVyKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBncm91cCA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV07XG4gICAgICAgICAgICBsZXQgY3VyVmVjdG9yQ2xvY2sgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzJdO1xuICAgICAgICAgICAgbGV0IG15VmVjdG9yQ2xvY2sgPSB0aGlzLnZjTWFwLmdldChncm91cCk7XG4gICAgICAgICAgICBpZiAoIW15VmVjdG9yQ2xvY2spIHtcbiAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgbXlWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlWZWN0b3JDbG9jay5pc3JlYWR5KGN1clZlY3RvckNsb2NrKSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgdG8gY3JkdFJ1bnRpbWUuXG5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNyZHRSdW50aW1lLnJlY2VpdmUodGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXSwgdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVswXSwgdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXSk7XG4gICAgICAgICAgICAgICAgbXlWZWN0b3JDbG9jay5pbmNyZW1lbnRTZW5kZXIoY3VyVmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuV2ViU29ja2V0TmV0d29yayA9IFdlYlNvY2tldE5ldHdvcms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X25ldHdvcmtfcnVudGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV2ViUnRjTmV0d29yayA9IHZvaWQgMDtcbmNvbnN0IF8xID0gcmVxdWlyZShcIi5cIik7XG5jb25zdCBjcmR0c18xID0gcmVxdWlyZShcIi4uL2NyZHRzXCIpO1xuY29uc3QgY3JkdF9uZXR3b3JrX3J1bnRpbWVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya19ydW50aW1lXCIpO1xuLy8gVGhlIHdlYnJ0YyBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBhbW9uZyB0d28gdXNlcnMgdXNpbmcgV2ViUnRjLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cbi8qKlxuICogV2ViUnRjTmV0d29yazpcbiAqXG4gKiBQcm9jZXNzIGluaXRpYWxpemF0aW9uIHdoZW4gc3RhcnRpbmcgYSBuZXcgdXNlciBub2RlLlxuICpcbiAqIENvbW11bmljYXRlIHdpdGggQ1JEVCdzIHJ1bnRpbWUgYW5kIHNlbmQvcmVjZWl2ZSBtZXNzYWdlIHZpYVxuICogY2VudHJhbCBzZXJ2ZXIgd2l0aCBXZWJTb2NrZXQgcHJvdG9jb2wgdG8gZXhjaGFuZ2Ugc2lnbmFscy5cbiAqIFRoZW4gY3JlYXRlIGNoYW5uZWxzIGZvciBwZWVyLXRvLXBlZXIgY29tbXVuaWNhdGlvbnMgYnkgdXNpbmdcbiAqIFdlYlJ0Y1xuICpcbiAqIFBlcmZvcm0gY2FzdWFsaXR5IGNoZWNrIHRvIGVuc3VyZSBtZXNzYWdlIG9yZGVyaW5nLlxuICovXG5jbGFzcyBXZWJSdGNOZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQsIHdlYlNvY2tldEFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBzZW5kIG1lc3NhZ2UgYnVmZmVyIGhhcyBhbnkgbWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQuXG4gICAgICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAgICAgKiBJZiBub3QsIHRoZW4gd2FpdCBhIGN1c3RvbWl6ZWQgdGltZSBwZXJpb2QgYW5kIGNoZWNrIGFnYWluLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZW5kV2ViU29ja2V0RGF0YSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZW5kQnVmZmVyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKEpTT04uc3RyaW5naWZ5KHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0pKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBzaWduYWwgbWVzc2FnZSBhbmQgY2hlY2sgc2lnbmFsIG1lc3NhZ2UgdHlwZS5cbiAgICAgICAgICogSnVtcCB0byB0aGUgY29ycmVzcG9uZGluZyBzaWduYWwgaGFuZGxlciBmb3IgZnVydGhlciBzdGVwcyB0b1xuICAgICAgICAgKiBidWlsZCBXZWJSdGMgY2hhbm5lbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG1zZyB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKG1zZykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3QgbWVzc2FnZVwiLCBtc2cuZGF0YSk7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UobXNnLmRhdGEpO1xuICAgICAgICAgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVnaXN0ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZWdpc3RlcihkYXRhLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29ubmVjdFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3QoZGF0YS51c2Vycyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZlclwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9mZmVyKGRhdGEub2ZmZXIsIGRhdGEucmVxdWVzdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYW5zd2VyXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQW5zd2VyKGRhdGEuYW5zd2VyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhbmRpZGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNhbmRpZGF0ZShkYXRhLmNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsZWF2ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUxlYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGljZWNhbmRpZGF0ZSBldmVudCB3aGVuIGFuIFJUQ0ljZUNhbmRpZGF0ZSBoYXMgYmVlblxuICAgICAgICAgKiBpZGVudGlmaWVkIGFuZCBhZGRlZCB0byB0aGUgbG9jYWwgcGVlciBieSBhIGNhbGwuXG4gICAgICAgICAqIFNlbmQgc2lnbmFsIG1lc3NhZ2UgdG8gdGhlIGNlbnRyYWwgc2VydmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQgSWNlIGNhbmRpZGF0ZSBldmVudCB0aGF0IHNob3VsZCBiZSBoYW5kbGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhhbmRsZUljZUNhbmRpZGF0ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU2lnbmFsaW5nTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2FuZGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGVlclJ0Y1JlY2VpdmVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVjZWl2ZUNoYW5uZWwgPSBldmVudC5jaGFubmVsO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVjZWl2ZUNoYW5uZWwpO1xuICAgICAgICAgICAgcmVjZWl2ZUNoYW5uZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5kYXRhQ2hhbmVsUmVjZWl2ZU1zZyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YUNoYW5lbFJlY2VpdmVNc2cgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgbGV0IG15UGFja2FnZSA9IHRoaXMucGFyc2VKU09OKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuZ3JvdXAsIG15UGFja2FnZS50aW1lc3RhbXBdKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VuZFdlYlJ0Y0RhdGEgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkYXRhIGNoYW5uZWwgaXMgb3BlblwiKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLmRhdGFCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhQnVmZmVyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbC5zZW5kKHRoaXMuZGF0YUJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5kYXRhQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBcIlwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aXRoIHNlcnZlci5cbiAgICAgICAgICogUmVnaXN0ZXIgRXZlbnRMaXN0ZW5lciB3aXRoIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldEFyZ3MpO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLnNlbmRXZWJTb2NrZXREYXRhKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5yZWNlaXZlQWN0aW9uKTtcbiAgICAgICAgLyoqXG4gICAgICAgICogT3BlbiBXZWJSdGMgcGVlciBjb25uZWN0aW9uLlxuICAgICAgICAqIFJlZ2lzdGVyIEV2ZW50TGlzdGVuZXIgd2l0aCBjb3JyZXNwb25kaW5nIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICovXG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0ge1xuICAgICAgICAgICAgXCJpY2VTZXJ2ZXJzXCI6IFt7IFwidXJsc1wiOiBcInN0dW46c3R1bjIuMS5nb29nbGUuY29tOjE5MzAyXCIgfV1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wZWVyUnRjID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLnBlZXJSdGMuYWRkRXZlbnRMaXN0ZW5lcignaWNlY2FuZGlkYXRlJywgdGhpcy5oYW5kbGVJY2VDYW5kaWRhdGUpO1xuICAgICAgICB0aGlzLnBlZXJSdGMuYWRkRXZlbnRMaXN0ZW5lcignZGF0YWNoYW5uZWwnLCB0aGlzLnBlZXJSdGNSZWNlaXZlTWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgc2lnbmFsIG1lc3NhZ2UgaW4gSlNPTiBmb3JtYXQgYnkgdXNpbmcgV2ViU29ja2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrXG4gICAgICovXG4gICAgc2VuZFNpZ25hbGluZ01lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlLndlYlJ0YyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud3Muc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgcmVnaXN0ZXIgc2lnbmFsIHNlbnQgYmFjayBmcm9tIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgKiBDaGVjayBpZiBsb2dpbiBzdWNjZXNzZnVsbHkgb3Igbm90LlxuICAgICAqXG4gICAgICogQHBhcmFtIHN1Y2Nlc3NTdGF0dXMgQSByZWdpc3RlciBzdGF0dXMgc2VudCBiYWNrIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKi9cbiAgICBoYW5kbGVSZWdpc3RlcihzdWNjZXNzU3RhdHVzKSB7XG4gICAgICAgIGlmIChzdWNjZXNzU3RhdHVzID09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIGZhaWxlZDogZHVwbGljYXRlIENSRFQgaWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBzdWNjZXNzZnVsbHkgaW4gc2VydmVyLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY29ubmVjdCBzaWduYWwgc2VudCBmcm9tIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgKiBDcmVhdGUgYW4gb2ZmZXIgYW5kIHNlbmQgaXQgdG8gdGhlIHJlcXVlc3RlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHVzZXJzIEFuIGFycmF5IG9mIHVzZXJzIHRoYXQgc2hhcmVkIGEgc2FtZSBDUkRUcy5cbiAgICAgKi9cbiAgICBoYW5kbGVDb25uZWN0KHVzZXJzKSB7XG4gICAgICAgIC8vIFRoaXMgbG9vcCBpcyB0byBjaGVjayB0aGUgY29ycmVjdCB1c2VyIHRvIGNvbm5lY3QuXG4gICAgICAgIC8vIERlc2lnbiBmb3IgdGhlIG11bHRpcGxlIHVzZXJzLlxuICAgICAgICAvLyBUT0RPOiBDb21wbGV0ZSBtdWx0aXBsZSB1c2VycyBjb25uZWN0aW9uIGJ1aWx0LlxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPCB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh1c2Vyc1tpbmRleF0gIT0gdGhpcy51aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gdXNlcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYW4gb2ZmZXIgdG8gYnVpbGQgV2ViUnRjIGNvbm5lY3Rpb24uXG4gICAgICAgIC8vIFNldCBvZmZlciBhcyB0aGUgbG9jYWwgZGVzY3JpdGlvbi5cbiAgICAgICAgdGhpcy5wZWVyUnRjLmNyZWF0ZU9mZmVyKCkudGhlbigob2ZmZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwib2ZmZXJcIixcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgICAgIG9mZmVyOiBvZmZlcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0TmFtZTogdGhpcy51aWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wZWVyUnRjLnNldExvY2FsRGVzY3JpcHRpb24ob2ZmZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIG9mZmVyIHNpZ25hbCBzZW50IGZyb20gdGhlIHNlcnZlci5cbiAgICAgKiBDcmVhdGUgYW4gYW5zd2VyIGFzIGEgcmVzcG9uc2UgYW5kIHNlbmQgdGhlIGFuc3dlciB0byB0aGUgc2VydmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZmVyIFRoZSBvZmZlciByZWNlaXZlZCBmcm9tIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiBhIHVzZXIgd2hvIHNlbmRzIHRoaXMgb2ZmZXIuXG4gICAgICovXG4gICAgaGFuZGxlT2ZmZXIob2ZmZXIsIG5hbWUpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGVlclJ0Yy5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG9mZmVyKSk7XG4gICAgICAgIHRoaXMucGVlclJ0Yy5jcmVhdGVBbnN3ZXIoKS50aGVuKChhbnN3ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYW5zd2VyXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICBhbnN3ZXI6IGFuc3dlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBlZXJSdGMuc2V0TG9jYWxEZXNjcmlwdGlvbihhbnN3ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbnN3ZXIgc2lnbmFsIHNlbnQgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICogU2V0dXAgcmVtb3RlIGRlc2NyaXB0aW9uIGJ5IHVzaW5nIHRoZSBhbnN3ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYW5zd2VyIFRoZSBhbnN3ZXIgcmVjZWl2ZWQgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICovXG4gICAgaGFuZGxlQW5zd2VyKGFuc3dlcikge1xuICAgICAgICB0aGlzLnBlZXJSdGMuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpKTtcbiAgICB9XG4gICAgO1xuICAgIGhhbmRsZUNhbmRpZGF0ZShjYW5kaWRhdGUpIHtcbiAgICAgICAgdGhpcy5wZWVyUnRjLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSkpXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgICB9XG4gICAgO1xuICAgIGhhbmRsZUxlYXZlKCkge1xuICAgICAgICB0aGlzLnBlZXJSdGMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5wZWVyUnRjLm9uaWNlY2FuZGlkYXRlID0gbnVsbDtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCB0aGUgZnVuY3Rpb24gZGVmaW5lZCBpbiBDcmR0UnVudGltZSBpbnRlcmZhY2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyByZXBsaWNhJ3MgaWQsIHVzZWQgYnkgc29tZSBDUkRUcyBpbnRlcm5hbGx5XG4gICAgICogKGUuZy4sIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZGVudGlmaWVycyBvZiB0aGUgZm9ybSAocmVwbGljYSBpZCwgY291bnRlcikpLlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdCB3aXRoIGl0cyBJRCBhbmQgY29ycmVzcG9uZGluZyBtZXNzYWdlXG4gICAgICogbGlzdGVuZXIgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0TWVzc2FnZUxpc3RlbmVyIHRoZSBtZXNzYWdlIGxpc3RlbmVyIG9mIGVhY2ggY3JkdC5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBJRCBvZiBlYWNoIGNyZHQuXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0UnVudGltZSkge1xuICAgICAgICB0aGlzLmNyZHRSdW50aW1lID0gY3JkdFJ1bnRpbWU7XG4gICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJyZWdpc3RlclwiLFxuICAgICAgICAgICAgbmFtZTogdGhpcy51aWQsXG4gICAgICAgICAgICBjcmR0TmFtZTogY3JkdHNfMS5DcmR0UnVudGltZS5uYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSBkYXRhQ2hubmVsXCIpO1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsID0gdGhpcy5wZWVyUnRjLmNyZWF0ZURhdGFDaGFubmVsKFwiY2hhbm5lbDFcIik7XG4gICAgICAgIHRoaXMuZGF0YUNoYW5uZWwub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcnM6IFwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YUNoYW5uZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgdGhpcy5zZW5kV2ViUnRjRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YUNoYW5uZWwub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YSBjaGFubmVsIGlzIGNsb3NlZFwiKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBmdW5jdGlvbiBvbiBjYXN1YWxicm9hZGNhc3QgbmV0d29yayBsYXllciwgd2hpY2ggY2FsbGVkXG4gICAgICogYnkgY3JkdCdzIHJ1bnRpbWUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBpcyB3cmFwcGVkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdGltZXN0YW1wIChiYXNpYyBzZW5kZXIgbm9kZVxuICAgICAqIGluZm8gYW5kIHZlY3RvciBjbG9jaykuXG4gICAgICpcbiAgICAgKiBVc2luZyBXZWJTb2NrZXQgYXMgbmV0d29yayB0cmFuc21pc3Npb24gcHJvdG9jb2wuXG4gICAgICogVXNpbmcgSlNPTiBmb3JtYXQgYXMgbWVzc2FnZSB0eXBlLlxuICAgICAqXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIG5vdCBPcGVuLCB0aGVuIGJ1ZmZlciB0aGUgbWVzc2FnZSBhbmRcbiAgICAgKiB3YWl0IHVudGlsIFdlYlNvY2tldCBvcGVuLlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBPcGVuLCB0aGVuIHNlbmQgaXQgd2l0aCB3cy5zZW5kKCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgY3JkdCB1cGRhdGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSB1bmlxdWUgSUQgZm9yIGVhY2ggY3JkdC5cbiAgICAgKi9cbiAgICBzZW5kKGdyb3VwLCBtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNyZHRJZCBleGlzdCBpbiB0aGUgbWFwLlxuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGdyb3VwLCB2Yyk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgY3JkdF9uZXR3b3JrX3J1bnRpbWVfMS5teU1lc3NhZ2UobWVzc2FnZSwgZ3JvdXAsIHZjKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUNoYW5uZWwucmVhZHlTdGF0ZSA9PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbC5zZW5kKG15UGFja2FnZS50b0pTT04oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCdWZmZXIucHVzaChteVBhY2thZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmV4dCB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGNyZHRJZCBpbiB0aGlzIHJlcGxpY2EuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIHBhc3NlZCB0byBDcmR0SW50ZXJuYWwuZWZmZWN0IHdoZW4gYSByZXBsaWNhIHByb2Nlc3NlcyBpdHMgb3duXG4gICAgICogbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0SWQgdGhlIGNyZHRJZCB0aGF0IHdvdWxkIGxpa2UgdG8gcmV0dXJuLlxuICAgICAqIEByZXR1cm5zIFRoZSB0aW1lc3RhbXAgdGhhdCB3b3VsZCBiZSBhc3NpZ25lZCB0byBhIENSRFRcbiAgICAgKiBtZXNzYWdlIHNlbnQgYnkgdGhpcyByZXBsaWNhIGFuZCBnaXZlbiBjcmR0SWQgcmlnaHQgbm93LlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0TmV4dFRpbWVzdGFtcChncm91cCkge1xuICAgICAgICAvLyBDb3B5IGEgbmV3IHZlY3RvciBjbG9jay5cbiAgICAgICAgbGV0IHZjID0gdGhpcy52Y01hcC5nZXQoZ3JvdXApO1xuICAgICAgICBpZiAoIXZjKSB7XG4gICAgICAgICAgICB2YyA9IG5ldyBfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgdmMpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2Y0NvcHkgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICB2Y0NvcHkudmVjdG9yTWFwID0gbmV3IE1hcCh2Yy5hc1ZlY3RvckNsb2NrKCkpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWVzdGFtcCBvZiB0aGlzIHJlcGxpY2Egd2l0aCBuZXh0IHZhbHVlLlxuICAgICAgICB2Y0NvcHkuaW5jcmVtZW50KCk7XG4gICAgICAgIHJldHVybiB2Y0NvcHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayB0byBjdXN0b21pemVkIGRhdGEgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHRyYXZlbCB0aHJvdWdoIG5ldHdvcmsuXG4gICAgICogQHJldHVybnMgdGhlIGN1c3RvbWl6ZWQgZGF0YSB0eXBlID0+IG15TWVzc2FnZVxuICAgICAqL1xuICAgIHBhcnNlSlNPTihkYXRhKSB7XG4gICAgICAgIGxldCBkYXRhSlNPTiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGxldCB2YyA9IG5ldyBfMS5WZWN0b3JDbG9jayhkYXRhSlNPTi50aW1lc3RhbXAudWlkLCB0aGlzLnVpZCA9PT0gZGF0YUpTT04udGltZXN0YW1wLnVpZCk7XG4gICAgICAgIHZjLnZlY3Rvck1hcCA9IG5ldyBNYXAoZGF0YUpTT04udGltZXN0YW1wLnZlY3Rvck1hcCk7XG4gICAgICAgIGxldCBtZXNzYWdlID0gVWludDhBcnJheS5mcm9tKGRhdGFKU09OLm1lc3NhZ2UpO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IGNyZHRfbmV0d29ya19ydW50aW1lXzEubXlNZXNzYWdlKG1lc3NhZ2UsIGRhdGFKU09OLmdyb3VwLCB2Yyk7XG4gICAgICAgIHJldHVybiBteVBhY2thZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYnVmZmVyZWQgbWVzc2FnZXMgYW5kIGRlbGl2ZXJ5IHRoZVxuICAgICAqIG1lc3NhZ2VzIGJhY2sgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lciB3aGljaCBhcmUgcmVhZHkuXG4gICAgICpcbiAgICAgKiBUaGUgY2hlY2tpbmcgb3JkZXIgaXMgZnJvbSB0aGUgbGFzdGVzdCB0byB0aGUgb2xkZXN0LlxuICAgICAqIFVwZGF0ZSB0aGUgVmVjdG9yQ2xvY2sgZW50cnkgYW5kIE1lc3NhZ2VCdWZmZXIgd2hlbiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBTZW5kIHRoZSBtZXNzYWdlIGJhY2sgdG8gY3JkdFJ1bnRpbWUgd2l0aCBjb3JyZXNwb25kaW5nXG4gICAgICogY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBjaGVja01lc3NhZ2VCdWZmZXIoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubWVzc2FnZUJ1ZmZlci5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXTtcbiAgICAgICAgICAgIGxldCBjdXJWZWN0b3JDbG9jayA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl07XG4gICAgICAgICAgICBsZXQgbXlWZWN0b3JDbG9jayA9IHRoaXMudmNNYXAuZ2V0KGdyb3VwKTtcbiAgICAgICAgICAgIGlmICghbXlWZWN0b3JDbG9jaykge1xuICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2sgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGdyb3VwLCBteVZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteVZlY3RvckNsb2NrLmlzcmVhZHkoY3VyVmVjdG9yQ2xvY2spKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogU2VuZCBiYWNrIHRoZSByZWNlaXZlZCBtZXNzYWdlcyB0byBjcmR0UnVudGltZS5cblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuY3JkdFJ1bnRpbWUucmVjZWl2ZSh0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdLCB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzBdLCB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzJdKTtcbiAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrLmluY3JlbWVudFNlbmRlcihjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5XZWJSdGNOZXR3b3JrID0gV2ViUnRjTmV0d29yaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya193ZWJydGNfcnVudGltZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya19pbnRlcmZhY2VcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya19ydW50aW1lXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X25ldHdvcmtfd2VicnRjX3J1bnRpbWVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3ZlY3Rvcl9jbG9ja1wiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSB2b2lkIDA7XG4vLyBUaGUgdmVjdG9yIGNsb2NrIGRlc2lnbmVkIGZvciBDUkRUIGxpYnJhcnkgYW5kIGNhc3VhbCBicm9hZGNhc3Rpbmdcbi8vIHJ1bnRpbWUgdG8gZW5zdXJlIGNvcnJlY3QgY2F1c2FsaXR5LlxuLyoqXG4gKiBUaGUgdmVjdG9yIGNsb2NrIGNsYXNzIGZvciBlbnN1cmluZyBjYXN1YWxpdHkuXG4gKi9cbmNsYXNzIFZlY3RvckNsb2NrIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSB2ZWN0b3Igd2l0aCByZXBsaWNhJ3Mgb3duIGVudHJ5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcGxpY2FJZCwgbG9jYWwpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbDtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVwbGljYShyZXBsaWNhSWQpLlxuICAgICAqL1xuICAgIGdldFNlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICBpc0xvY2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZlY3RvciBjbG9jayB3aXRoIGFsbCB0aGUgZW50cmllcy5cbiAgICAgKi9cbiAgICBhc1ZlY3RvckNsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpblxuICAgICAqIHRoaXMgdmVjdG9yY2xvY2suXG4gICAgICovXG4gICAgZ2V0U2VuZGVyQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVwbGljYXMgaW52b3ZsZWQgaW4gdGhpcyBjcmR0cy5cbiAgICAgKi9cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2ZWN0b3Igb2YgdGhlIHVpZChyZXBsaWNhSWQpIGVudHJ5LlxuICAgICAqL1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCBvbGRWYWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGEgbWVzc2FnZSB3aXRoIGEgY2VydGFpbiB0aW1lc3RhbXAgaXMgcmVhZHkgZm9yIGRlbGl2ZXJ5XG4gICAgICogdG8gZW5zdXJlIGNvcnJlY3QgY2FzdWFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmhhcyhvdGhlclVpZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICpcbiAgICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBtYWlubHkgZG9uZSBhZnRlciBjb3JyZWN0bHkgZGVsaXZlciB0aGUgbWVzc2FnZVxuICAgICAqIHdoZW4gaXNSZWFkeSgpIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIGluY3JlbWVudFNlbmRlcih2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQob3RoZXJVaWQsIG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSBjdXJyZW50IFZlY3RvckNsb2NrIHdpdGggdGhlIHZlY3RvciBjbG9jayByZWNldmllZCBmcm9tXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIG1lcmdlKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIG90aGVyVmVjdG9yTWFwLmdldChpZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBNYXRoLm1heCh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29tZVVpZCB0aGUgcmVwbGljYSdzIHVpZC5cbiAgICAgKiBAcGFyYW0gY2xvY2tWYWx1ZSB0aGUgY2xvY2sgbnVtYmVyIG9mIHRoZSByZXBsaWNhLlxuICAgICAqL1xuICAgIHNldEVudHJ5KHNvbWVVaWQsIGNsb2NrVmFsdWUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSBWZWN0b3JDbG9jaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlY3Rvcl9jbG9jay5qcy5tYXAiLCIvKmVzbGludC1kaXNhYmxlIGJsb2NrLXNjb3BlZC12YXIsIGlkLWxlbmd0aCwgbm8tY29udHJvbC1yZWdleCwgbm8tbWFnaWMtbnVtYmVycywgbm8tcHJvdG90eXBlLWJ1aWx0aW5zLCBuby1yZWRlY2xhcmUsIG5vLXNoYWRvdywgbm8tdmFyLCBzb3J0LXZhcnMqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkcHJvdG9idWYgPSByZXF1aXJlKFwicHJvdG9idWZqcy9taW5pbWFsXCIpO1xuXG4vLyBDb21tb24gYWxpYXNlc1xudmFyICRSZWFkZXIgPSAkcHJvdG9idWYuUmVhZGVyLCAkV3JpdGVyID0gJHByb3RvYnVmLldyaXRlciwgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcblxuLy8gRXhwb3J0ZWQgcm9vdCBuYW1lc3BhY2VcbnZhciAkcm9vdCA9ICRwcm90b2J1Zi5yb290c1tcImRlZmF1bHRcIl0gfHwgKCRwcm90b2J1Zi5yb290c1tcImRlZmF1bHRcIl0gPSB7fSk7XG5cbiRyb290LkdNYXBNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIEdNYXBNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIElHTWFwTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSUdNYXBNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBrZXlUb0luaXQgR01hcE1lc3NhZ2Uga2V5VG9Jbml0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEdNYXBNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIEdNYXBNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgR01hcE1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSUdNYXBNZXNzYWdlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtJR01hcE1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBHTWFwTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR01hcE1lc3NhZ2Uga2V5VG9Jbml0LlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IGtleVRvSW5pdFxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLnByb3RvdHlwZS5rZXlUb0luaXQgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBHTWFwTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHTWFwTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IEdNYXBNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR01hcE1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgR01hcE1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHTWFwTWVzc2FnZX0gbWVzc2FnZSBHTWFwTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS5rZXlUb0luaXQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR01hcE1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgR01hcE1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHTWFwTWVzc2FnZX0gbWVzc2FnZSBHTWFwTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIEdNYXBNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkdNYXBNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmtleVRvSW5pdCA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwia2V5VG9Jbml0XCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2tleVRvSW5pdCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHTWFwTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0dNYXBNZXNzYWdlfSBHTWFwTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgR01hcE1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIEdNYXBNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS5rZXlUb0luaXQgJiYgdHlwZW9mIG1lc3NhZ2Uua2V5VG9Jbml0Lmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmtleVRvSW5pdCkpKVxuICAgICAgICAgICAgcmV0dXJuIFwia2V5VG9Jbml0OiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHTWFwTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2VcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkdNYXBNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuR01hcE1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5rZXlUb0luaXQgIT0gbnVsbClcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmtleVRvSW5pdCA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC5rZXlUb0luaXQsIG1lc3NhZ2Uua2V5VG9Jbml0ID0gJHV0aWwubmV3QnVmZmVyKCR1dGlsLmJhc2U2NC5sZW5ndGgob2JqZWN0LmtleVRvSW5pdCkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC5rZXlUb0luaXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2Uua2V5VG9Jbml0ID0gb2JqZWN0LmtleVRvSW5pdDtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEdNYXBNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtHTWFwTWVzc2FnZX0gbWVzc2FnZSBHTWFwTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmtleVRvSW5pdCA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3Qua2V5VG9Jbml0ID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3Qua2V5VG9Jbml0ID0gJHV0aWwubmV3QnVmZmVyKG9iamVjdC5rZXlUb0luaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5rZXlUb0luaXQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwia2V5VG9Jbml0XCIpKVxuICAgICAgICAgICAgb2JqZWN0LmtleVRvSW5pdCA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS5rZXlUb0luaXQsIDAsIG1lc3NhZ2Uua2V5VG9Jbml0Lmxlbmd0aCkgOiBvcHRpb25zLmJ5dGVzID09PSBBcnJheSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2Uua2V5VG9Jbml0KSA6IG1lc3NhZ2Uua2V5VG9Jbml0O1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIEdNYXBNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEdNYXBNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge1VpbnQ4QXJyYXl9IG1lc3NhZ2UgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1bmlxdWVJZCBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSB1bmlxdWVJZFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gUnVudGltZUdlbmVyYXRvck1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQG1lbWJlciB7VWludDhBcnJheX0gbWVzc2FnZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLnByb3RvdHlwZS5tZXNzYWdlID0gJHV0aWwubmV3QnVmZmVyKFtdKTtcblxuICAgIC8qKlxuICAgICAqIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIHVuaXF1ZUlkLlxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdW5pcXVlSWRcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5wcm90b3R5cGUudW5pcXVlSWQgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lSdW50aW1lR2VuZXJhdG9yTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gbWVzc2FnZSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS5tZXNzYWdlKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS51bmlxdWVJZCk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlfSBtZXNzYWdlIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge1J1bnRpbWVHZW5lcmF0b3JNZXNzYWdlfSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuUnVudGltZUdlbmVyYXRvck1lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudW5pcXVlSWQgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXNzYWdlXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ21lc3NhZ2UnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVuaXF1ZUlkXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3VuaXF1ZUlkJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7UnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLm1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UubWVzc2FnZS5sZW5ndGggPT09IFwibnVtYmVyXCIgfHwgJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5tZXNzYWdlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJtZXNzYWdlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnVuaXF1ZUlkKSlcbiAgICAgICAgICAgIHJldHVybiBcInVuaXF1ZUlkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LlJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuUnVudGltZUdlbmVyYXRvck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5tZXNzYWdlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5tZXNzYWdlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICR1dGlsLmJhc2U2NC5kZWNvZGUob2JqZWN0Lm1lc3NhZ2UsIG1lc3NhZ2UubWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC5tZXNzYWdlKSksIDApO1xuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0Lm1lc3NhZ2UubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZSA9IG9iamVjdC5tZXNzYWdlO1xuICAgICAgICBpZiAob2JqZWN0LnVuaXF1ZUlkICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnVuaXF1ZUlkID0gU3RyaW5nKG9iamVjdC51bmlxdWVJZCk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7UnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IG1lc3NhZ2UgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcpXG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5tZXNzYWdlID0gJHV0aWwubmV3QnVmZmVyKG9iamVjdC5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iamVjdC51bmlxdWVJZCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UubWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXNzYWdlXCIpKVxuICAgICAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UubWVzc2FnZSwgMCwgbWVzc2FnZS5tZXNzYWdlLmxlbmd0aCkgOiBvcHRpb25zLmJ5dGVzID09PSBBcnJheSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UubWVzc2FnZSkgOiBtZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlLnVuaXF1ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVuaXF1ZUlkXCIpKVxuICAgICAgICAgICAgb2JqZWN0LnVuaXF1ZUlkID0gbWVzc2FnZS51bmlxdWVJZDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290LkNyZHRSZWZlcmVuY2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQ3JkdFJlZmVyZW5jZS5cbiAgICAgKiBAZXhwb3J0cyBJQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBpbnRlcmZhY2UgSUNyZHRSZWZlcmVuY2VcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gcm9vdElkIENyZHRSZWZlcmVuY2Ugcm9vdElkXG4gICAgICogQHByb3BlcnR5IHtBcnJheS48c3RyaW5nPnxudWxsfSBbcGF0aFRvUm9vdF0gQ3JkdFJlZmVyZW5jZSBwYXRoVG9Sb290XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IENyZHRSZWZlcmVuY2UuXG4gICAgICogQGV4cG9ydHMgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIENyZHRSZWZlcmVuY2UuXG4gICAgICogQGltcGxlbWVudHMgSUNyZHRSZWZlcmVuY2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lDcmR0UmVmZXJlbmNlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gQ3JkdFJlZmVyZW5jZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZHRSZWZlcmVuY2Ugcm9vdElkLlxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gcm9vdElkXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLnByb3RvdHlwZS5yb290SWQgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JkdFJlZmVyZW5jZSBwYXRoVG9Sb290LlxuICAgICAqIEBtZW1iZXIge0FycmF5LjxzdHJpbmc+fSBwYXRoVG9Sb290XG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLnByb3RvdHlwZS5wYXRoVG9Sb290ID0gJHV0aWwuZW1wdHlBcnJheTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ3JkdFJlZmVyZW5jZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUNyZHRSZWZlcmVuY2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJlZmVyZW5jZX0gQ3JkdFJlZmVyZW5jZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDcmR0UmVmZXJlbmNlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBDcmR0UmVmZXJlbmNlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UmVmZXJlbmNlfSBtZXNzYWdlIENyZHRSZWZlcmVuY2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuc3RyaW5nKG1lc3NhZ2Uucm9vdElkKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDIgPSovMTgpLnN0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBDcmR0UmVmZXJlbmNlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UmVmZXJlbmNlfSBtZXNzYWdlIENyZHRSZWZlcmVuY2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENyZHRSZWZlcmVuY2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJlZmVyZW5jZX0gQ3JkdFJlZmVyZW5jZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgQ3JkdFJlZmVyZW5jZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5DcmR0UmVmZXJlbmNlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnJvb3RJZCA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZiAoIShtZXNzYWdlLnBhdGhUb1Jvb3QgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdC5wdXNoKHJlYWRlci5zdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb290SWRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAncm9vdElkJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENyZHRSZWZlcmVuY2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnJvb3RJZCkpXG4gICAgICAgICAgICByZXR1cm4gXCJyb290SWQ6IHN0cmluZyBleHBlY3RlZFwiO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXRoVG9Sb290ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInBhdGhUb1Jvb3RcIikpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLnBhdGhUb1Jvb3QpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInBhdGhUb1Jvb3Q6IGFycmF5IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UucGF0aFRvUm9vdFtpXSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhdGhUb1Jvb3Q6IHN0cmluZ1tdIGV4cGVjdGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJlZmVyZW5jZX0gQ3JkdFJlZmVyZW5jZVxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5DcmR0UmVmZXJlbmNlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJlZmVyZW5jZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnJvb3RJZCAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS5yb290SWQgPSBTdHJpbmcob2JqZWN0LnJvb3RJZCk7XG4gICAgICAgIGlmIChvYmplY3QucGF0aFRvUm9vdCkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQ3JkdFJlZmVyZW5jZS5wYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3RbaV0gPSBTdHJpbmcob2JqZWN0LnBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0NyZHRSZWZlcmVuY2V9IG1lc3NhZ2UgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgQ3JkdFJlZmVyZW5jZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmFycmF5cyB8fCBvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBvYmplY3Qucm9vdElkID0gXCJcIjtcbiAgICAgICAgaWYgKG1lc3NhZ2Uucm9vdElkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInJvb3RJZFwiKSlcbiAgICAgICAgICAgIG9iamVjdC5yb290SWQgPSBtZXNzYWdlLnJvb3RJZDtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3QucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2opXG4gICAgICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3Rbal0gPSBtZXNzYWdlLnBhdGhUb1Jvb3Rbal07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBDcmR0UmVmZXJlbmNlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBDcmR0UmVmZXJlbmNlO1xufSkoKTtcblxuJHJvb3QuRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd8bnVsbH0gW3N0cmluZ1ZhbHVlXSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2Ugc3RyaW5nVmFsdWVcbiAgICAgKiBAcHJvcGVydHkge251bWJlcnxudWxsfSBbbnVtYmVyVmFsdWVdIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBudW1iZXJWYWx1ZVxuICAgICAqIEBwcm9wZXJ0eSB7SUNyZHRSZWZlcmVuY2V8bnVsbH0gW2NyZHRWYWx1ZV0gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIGNyZHRWYWx1ZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBzdHJpbmdWYWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHN0cmluZ1ZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUuc3RyaW5nVmFsdWUgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG51bWJlclZhbHVlLlxuICAgICAqIEBtZW1iZXIge251bWJlcn0gbnVtYmVyVmFsdWVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZS5udW1iZXJWYWx1ZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgY3JkdFZhbHVlLlxuICAgICAqIEBtZW1iZXIge0lDcmR0UmVmZXJlbmNlfG51bGx8dW5kZWZpbmVkfSBjcmR0VmFsdWVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZS5jcmR0VmFsdWUgPSBudWxsO1xuXG4gICAgLy8gT25lT2YgZmllbGQgbmFtZXMgYm91bmQgdG8gdmlydHVhbCBnZXR0ZXJzIGFuZCBzZXR0ZXJzXG4gICAgdmFyICRvbmVPZkZpZWxkcztcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSB2YWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtcInN0cmluZ1ZhbHVlXCJ8XCJudW1iZXJWYWx1ZVwifFwiY3JkdFZhbHVlXCJ8dW5kZWZpbmVkfSB2YWx1ZVxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgIGdldDogJHV0aWwub25lT2ZHZXR0ZXIoJG9uZU9mRmllbGRzID0gW1wic3RyaW5nVmFsdWVcIiwgXCJudW1iZXJWYWx1ZVwiLCBcImNyZHRWYWx1ZVwiXSksXG4gICAgICAgIHNldDogJHV0aWwub25lT2ZTZXR0ZXIoJG9uZU9mRmllbGRzKVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2V9IERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBtZXNzYWdlIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICBpZiAobWVzc2FnZS5zdHJpbmdWYWx1ZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwic3RyaW5nVmFsdWVcIikpXG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLnN0cmluZ1ZhbHVlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UubnVtYmVyVmFsdWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcIm51bWJlclZhbHVlXCIpKVxuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAxID0qLzE3KS5kb3VibGUobWVzc2FnZS5udW1iZXJWYWx1ZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLmNyZHRWYWx1ZSAhPSBudWxsICYmIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1lc3NhZ2UsIFwiY3JkdFZhbHVlXCIpKVxuICAgICAgICAgICAgJHJvb3QuQ3JkdFJlZmVyZW5jZS5lbmNvZGUobWVzc2FnZS5jcmR0VmFsdWUsIHdyaXRlci51aW50MzIoLyogaWQgMywgd2lyZVR5cGUgMiA9Ki8yNikuZm9yaygpKS5sZGVsaW0oKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBtZXNzYWdlIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2V9IERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5zdHJpbmdWYWx1ZSA9IHJlYWRlci5zdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm51bWJlclZhbHVlID0gcmVhZGVyLmRvdWJsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuY3JkdFZhbHVlID0gJHJvb3QuQ3JkdFJlZmVyZW5jZS5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICBpZiAobWVzc2FnZS5zdHJpbmdWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJzdHJpbmdWYWx1ZVwiKSkge1xuICAgICAgICAgICAgcHJvcGVydGllcy52YWx1ZSA9IDE7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2Uuc3RyaW5nVmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1ZhbHVlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5udW1iZXJWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJudW1iZXJWYWx1ZVwiKSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidmFsdWU6IG11bHRpcGxlIHZhbHVlc1wiO1xuICAgICAgICAgICAgcHJvcGVydGllcy52YWx1ZSA9IDE7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UubnVtYmVyVmFsdWUgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibnVtYmVyVmFsdWU6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmNyZHRWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJjcmR0VmFsdWVcIikpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInZhbHVlOiBtdWx0aXBsZSB2YWx1ZXNcIjtcbiAgICAgICAgICAgIHByb3BlcnRpZXMudmFsdWUgPSAxO1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkNyZHRSZWZlcmVuY2UudmVyaWZ5KG1lc3NhZ2UuY3JkdFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNyZHRWYWx1ZS5cIiArIGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2V9IERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnN0cmluZ1ZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnN0cmluZ1ZhbHVlID0gU3RyaW5nKG9iamVjdC5zdHJpbmdWYWx1ZSk7XG4gICAgICAgIGlmIChvYmplY3QubnVtYmVyVmFsdWUgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2UubnVtYmVyVmFsdWUgPSBOdW1iZXIob2JqZWN0Lm51bWJlclZhbHVlKTtcbiAgICAgICAgaWYgKG9iamVjdC5jcmR0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuY3JkdFZhbHVlICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuY3JkdFZhbHVlOiBvYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICBtZXNzYWdlLmNyZHRWYWx1ZSA9ICRyb290LkNyZHRSZWZlcmVuY2UuZnJvbU9iamVjdChvYmplY3QuY3JkdFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBtZXNzYWdlIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc3RyaW5nVmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwic3RyaW5nVmFsdWVcIikpIHtcbiAgICAgICAgICAgIG9iamVjdC5zdHJpbmdWYWx1ZSA9IG1lc3NhZ2Uuc3RyaW5nVmFsdWU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5vbmVvZnMpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gXCJzdHJpbmdWYWx1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLm51bWJlclZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm51bWJlclZhbHVlXCIpKSB7XG4gICAgICAgICAgICBvYmplY3QubnVtYmVyVmFsdWUgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UubnVtYmVyVmFsdWUpID8gU3RyaW5nKG1lc3NhZ2UubnVtYmVyVmFsdWUpIDogbWVzc2FnZS5udW1iZXJWYWx1ZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm9uZW9mcylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIm51bWJlclZhbHVlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UuY3JkdFZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImNyZHRWYWx1ZVwiKSkge1xuICAgICAgICAgICAgb2JqZWN0LmNyZHRWYWx1ZSA9ICRyb290LkNyZHRSZWZlcmVuY2UudG9PYmplY3QobWVzc2FnZS5jcmR0VmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMub25lb2ZzKVxuICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IFwiY3JkdFZhbHVlXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5Db3VudGVyTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBDb3VudGVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElDb3VudGVyTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b0FkZCBDb3VudGVyTWVzc2FnZSB0b0FkZFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBDb3VudGVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIENvdW50ZXJNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElDb3VudGVyTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SUNvdW50ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gQ291bnRlck1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvdW50ZXJNZXNzYWdlIHRvQWRkLlxuICAgICAqIEBtZW1iZXIge251bWJlcn0gdG9BZGRcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5wcm90b3R5cGUudG9BZGQgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDb3VudGVyTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IENvdW50ZXJNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ291bnRlck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ291bnRlck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZX0gbWVzc2FnZSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMSA9Ki85KS5kb3VibGUobWVzc2FnZS50b0FkZCk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDb3VudGVyTWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBDb3VudGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUNvdW50ZXJNZXNzYWdlfSBtZXNzYWdlIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge0NvdW50ZXJNZXNzYWdlfSBDb3VudGVyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ291bnRlck1lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudG9BZGQgPSByZWFkZXIuZG91YmxlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b0FkZFwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd0b0FkZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0NvdW50ZXJNZXNzYWdlfSBDb3VudGVyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRvQWRkICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgcmV0dXJuIFwidG9BZGQ6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge0NvdW50ZXJNZXNzYWdlfSBDb3VudGVyTWVzc2FnZVxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuQ291bnRlck1lc3NhZ2UpXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5Db3VudGVyTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnRvQWRkICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnRvQWRkID0gTnVtYmVyKG9iamVjdC50b0FkZCk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7Q291bnRlck1lc3NhZ2V9IG1lc3NhZ2UgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBvYmplY3QudG9BZGQgPSAwO1xuICAgICAgICBpZiAobWVzc2FnZS50b0FkZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b0FkZFwiKSlcbiAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS50b0FkZCkgPyBTdHJpbmcobWVzc2FnZS50b0FkZCkgOiBtZXNzYWdlLnRvQWRkO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIENvdW50ZXJNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvdW50ZXJNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBNdWx0UmVnaXN0ZXJNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIElNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b011bHQgTXVsdFJlZ2lzdGVyTWVzc2FnZSB0b011bHRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgTXVsdFJlZ2lzdGVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SU11bHRSZWdpc3Rlck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNdWx0UmVnaXN0ZXJNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNdWx0UmVnaXN0ZXJNZXNzYWdlIHRvTXVsdC5cbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRvTXVsdFxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS5wcm90b3R5cGUudG9NdWx0ID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgTXVsdFJlZ2lzdGVyTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SU11bHRSZWdpc3Rlck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7TXVsdFJlZ2lzdGVyTWVzc2FnZX0gTXVsdFJlZ2lzdGVyTWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdWx0UmVnaXN0ZXJNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBNdWx0UmVnaXN0ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlfSBtZXNzYWdlIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMSA9Ki85KS5kb3VibGUobWVzc2FnZS50b011bHQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBNdWx0UmVnaXN0ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlfSBtZXNzYWdlIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7TXVsdFJlZ2lzdGVyTWVzc2FnZX0gTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5NdWx0UmVnaXN0ZXJNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRvTXVsdCA9IHJlYWRlci5kb3VibGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRvTXVsdFwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd0b011bHQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7TXVsdFJlZ2lzdGVyTWVzc2FnZX0gTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UudG9NdWx0ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgcmV0dXJuIFwidG9NdWx0OiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7TXVsdFJlZ2lzdGVyTWVzc2FnZX0gTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5NdWx0UmVnaXN0ZXJNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnRvTXVsdCAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS50b011bHQgPSBOdW1iZXIob2JqZWN0LnRvTXVsdCk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge011bHRSZWdpc3Rlck1lc3NhZ2V9IG1lc3NhZ2UgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnRvTXVsdCA9IDA7XG4gICAgICAgIGlmIChtZXNzYWdlLnRvTXVsdCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b011bHRcIikpXG4gICAgICAgICAgICBvYmplY3QudG9NdWx0ID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLnRvTXVsdCkgPyBTdHJpbmcobWVzc2FnZS50b011bHQpIDogbWVzc2FnZS50b011bHQ7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgTXVsdFJlZ2lzdGVyTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTXVsdFJlZ2lzdGVyTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290LkdTZXRNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIEdTZXRNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIElHU2V0TWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSUdTZXRNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSB0b0FkZCBHU2V0TWVzc2FnZSB0b0FkZFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBHU2V0TWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBHU2V0TWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEdTZXRNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElHU2V0TWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gR1NldE1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdTZXRNZXNzYWdlIHRvQWRkLlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IHRvQWRkXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UucHJvdG90eXBlLnRvQWRkID0gJHV0aWwubmV3QnVmZmVyKFtdKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgR1NldE1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR1NldE1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7R1NldE1lc3NhZ2V9IEdTZXRNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHU2V0TWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdTZXRNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEdTZXRNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UudG9BZGQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR1NldE1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgR1NldE1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHU2V0TWVzc2FnZX0gbWVzc2FnZSBHU2V0TWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIEdTZXRNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkdTZXRNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRvQWRkID0gcmVhZGVyLmJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b0FkZFwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd0b0FkZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0dTZXRNZXNzYWdlfSBHU2V0TWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgR1NldE1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS50b0FkZCAmJiB0eXBlb2YgbWVzc2FnZS50b0FkZC5sZW5ndGggPT09IFwibnVtYmVyXCIgfHwgJHV0aWwuaXNTdHJpbmcobWVzc2FnZS50b0FkZCkpKVxuICAgICAgICAgICAgcmV0dXJuIFwidG9BZGQ6IGJ1ZmZlciBleHBlY3RlZFwiO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdTZXRNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge0dTZXRNZXNzYWdlfSBHU2V0TWVzc2FnZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuR1NldE1lc3NhZ2UpXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5HU2V0TWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnRvQWRkICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC50b0FkZCA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC50b0FkZCwgbWVzc2FnZS50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC50b0FkZCkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC50b0FkZC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IG9iamVjdC50b0FkZDtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEdTZXRNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtHU2V0TWVzc2FnZX0gbWVzc2FnZSBHU2V0TWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnRvQWRkID0gXCJcIjtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzICE9PSBBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnRvQWRkID0gJHV0aWwubmV3QnVmZmVyKG9iamVjdC50b0FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLnRvQWRkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRvQWRkXCIpKVxuICAgICAgICAgICAgb2JqZWN0LnRvQWRkID0gb3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nID8gJHV0aWwuYmFzZTY0LmVuY29kZShtZXNzYWdlLnRvQWRkLCAwLCBtZXNzYWdlLnRvQWRkLmxlbmd0aCkgOiBvcHRpb25zLmJ5dGVzID09PSBBcnJheSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UudG9BZGQpIDogbWVzc2FnZS50b0FkZDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBHU2V0TWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgR1NldE1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBHU2V0TWVzc2FnZTtcbn0pKCk7XG5cbiRyb290Lk12ck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgTXZyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJTXZyTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSU12ck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge1VpbnQ4QXJyYXl9IHZhbHVlIE12ck1lc3NhZ2UgdmFsdWVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgTXZyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBNdnJNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgTXZyTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJTXZyTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SU12ck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNdnJNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNdnJNZXNzYWdlIHZhbHVlLlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IHZhbHVlXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLnByb3RvdHlwZS52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE12ck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdnJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTXZyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE12ck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXZyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZX0gbWVzc2FnZSBNdnJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgTXZyTWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBNdnJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdnJNZXNzYWdlfSBtZXNzYWdlIE12ck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIE12ck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIE12ck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7TXZyTWVzc2FnZX0gTXZyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5NdnJNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnZhbHVlID0gcmVhZGVyLmJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd2YWx1ZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtNdnJNZXNzYWdlfSBNdnJNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIE12ck1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2UudmFsdWUgJiYgdHlwZW9mIG1lc3NhZ2UudmFsdWUubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudmFsdWUpKSlcbiAgICAgICAgICAgIHJldHVybiBcInZhbHVlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7TXZyTWVzc2FnZX0gTXZyTWVzc2FnZVxuICAgICAqL1xuICAgIE12ck1lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5NdnJNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXZyTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC52YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC52YWx1ZSwgbWVzc2FnZS52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC52YWx1ZSkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS52YWx1ZSA9IG9iamVjdC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIE12ck1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7TXZyTWVzc2FnZX0gbWVzc2FnZSBNdnJNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS52YWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS52YWx1ZSwgMCwgbWVzc2FnZS52YWx1ZS5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLnZhbHVlKSA6IG1lc3NhZ2UudmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgTXZyTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTXZyTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290Lkx3d01lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgTHd3TWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJTHd3TWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSUx3d01lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge1VpbnQ4QXJyYXl9IHZhbHVlIEx3d01lc3NhZ2UgdmFsdWVcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdGltZSBMd3dNZXNzYWdlIHRpbWVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgTHd3TWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBMd3dNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgTHd3TWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJTHd3TWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SUx3d01lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMd3dNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMd3dNZXNzYWdlIHZhbHVlLlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IHZhbHVlXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLnByb3RvdHlwZS52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBMd3dNZXNzYWdlIHRpbWUuXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSB0aW1lXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLnByb3RvdHlwZS50aW1lID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgTHd3TWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUx3d01lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7THd3TWVzc2FnZX0gTHd3TWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMd3dNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgTHd3TWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBMd3dNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlfSBtZXNzYWdlIEx3d01lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS52YWx1ZSk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMSA9Ki8xNykuZG91YmxlKG1lc3NhZ2UudGltZSk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBMd3dNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEx3d01lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUx3d01lc3NhZ2V9IG1lc3NhZ2UgTHd3TWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgTHd3TWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtMd3dNZXNzYWdlfSBMd3dNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290Lkx3d01lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudmFsdWUgPSByZWFkZXIuYnl0ZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRpbWUgPSByZWFkZXIuZG91YmxlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd2YWx1ZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGltZVwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd0aW1lJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIEx3d01lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0x3d01lc3NhZ2V9IEx3d01lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgTHd3TWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS52YWx1ZSAmJiB0eXBlb2YgbWVzc2FnZS52YWx1ZS5sZW5ndGggPT09IFwibnVtYmVyXCIgfHwgJHV0aWwuaXNTdHJpbmcobWVzc2FnZS52YWx1ZSkpKVxuICAgICAgICAgICAgcmV0dXJuIFwidmFsdWU6IGJ1ZmZlciBleHBlY3RlZFwiO1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UudGltZSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRpbWU6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEx3d01lc3NhZ2UgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxuICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtMd3dNZXNzYWdlfSBMd3dNZXNzYWdlXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290Lkx3d01lc3NhZ2UpXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5Md3dNZXNzYWdlKCk7XG4gICAgICAgIGlmIChvYmplY3QudmFsdWUgIT0gbnVsbClcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LnZhbHVlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICR1dGlsLmJhc2U2NC5kZWNvZGUob2JqZWN0LnZhbHVlLCBtZXNzYWdlLnZhbHVlID0gJHV0aWwubmV3QnVmZmVyKCR1dGlsLmJhc2U2NC5sZW5ndGgob2JqZWN0LnZhbHVlKSksIDApO1xuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0LnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnZhbHVlID0gb2JqZWN0LnZhbHVlO1xuICAgICAgICBpZiAob2JqZWN0LnRpbWUgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2UudGltZSA9IE51bWJlcihvYmplY3QudGltZSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBMd3dNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0x3d01lc3NhZ2V9IG1lc3NhZ2UgTHd3TWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgTHd3TWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqZWN0LnRpbWUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLnZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInZhbHVlXCIpKVxuICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gb3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nID8gJHV0aWwuYmFzZTY0LmVuY29kZShtZXNzYWdlLnZhbHVlLCAwLCBtZXNzYWdlLnZhbHVlLmxlbmd0aCkgOiBvcHRpb25zLmJ5dGVzID09PSBBcnJheSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UudmFsdWUpIDogbWVzc2FnZS52YWx1ZTtcbiAgICAgICAgaWYgKG1lc3NhZ2UudGltZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0aW1lXCIpKVxuICAgICAgICAgICAgb2JqZWN0LnRpbWUgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UudGltZSkgPyBTdHJpbmcobWVzc2FnZS50aW1lKSA6IG1lc3NhZ2UudGltZTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBMd3dNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBMd3dNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIENyZHRSdW50aW1lTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBpbm5lck1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlIGlubmVyTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz58bnVsbH0gW3BhdGhUb1Jvb3RdIENyZHRSdW50aW1lTWVzc2FnZSBwYXRoVG9Sb290XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IENyZHRSdW50aW1lTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDcmR0UnVudGltZU1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSUNyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SUNyZHRSdW50aW1lTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENyZHRSdW50aW1lTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZHRSdW50aW1lTWVzc2FnZSBpbm5lck1lc3NhZ2UuXG4gICAgICogQG1lbWJlciB7VWludDhBcnJheX0gaW5uZXJNZXNzYWdlXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5wcm90b3R5cGUuaW5uZXJNZXNzYWdlID0gJHV0aWwubmV3QnVmZmVyKFtdKTtcblxuICAgIC8qKlxuICAgICAqIENyZHRSdW50aW1lTWVzc2FnZSBwYXRoVG9Sb290LlxuICAgICAqIEBtZW1iZXIge0FycmF5LjxzdHJpbmc+fSBwYXRoVG9Sb290XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5wcm90b3R5cGUucGF0aFRvUm9vdCA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENyZHRSdW50aW1lTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJ1bnRpbWVNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3JkdFJ1bnRpbWVNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENyZHRSdW50aW1lTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UnVudGltZU1lc3NhZ2V9IG1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS5pbm5lck1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXRoVG9Sb290ICE9IG51bGwgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aClcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMiA9Ki8xOCkuc3RyaW5nKG1lc3NhZ2UucGF0aFRvUm9vdFtpXSk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ3JkdFJ1bnRpbWVNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUNyZHRSdW50aW1lTWVzc2FnZX0gbWVzc2FnZSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJ1bnRpbWVNZXNzYWdlfSBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5DcmR0UnVudGltZU1lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJNZXNzYWdlID0gcmVhZGVyLmJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5wYXRoVG9Sb290ICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QucHVzaChyZWFkZXIuc3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiaW5uZXJNZXNzYWdlXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2lubmVyTWVzc2FnZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJ1bnRpbWVNZXNzYWdlfSBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLmlubmVyTWVzc2FnZSAmJiB0eXBlb2YgbWVzc2FnZS5pbm5lck1lc3NhZ2UubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuaW5uZXJNZXNzYWdlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJpbm5lck1lc3NhZ2U6IGJ1ZmZlciBleHBlY3RlZFwiO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXRoVG9Sb290ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInBhdGhUb1Jvb3RcIikpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLnBhdGhUb1Jvb3QpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInBhdGhUb1Jvb3Q6IGFycmF5IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UucGF0aFRvUm9vdFtpXSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhdGhUb1Jvb3Q6IHN0cmluZ1tdIGV4cGVjdGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxuICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlKCk7XG4gICAgICAgIGlmIChvYmplY3QuaW5uZXJNZXNzYWdlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5pbm5lck1lc3NhZ2UgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QuaW5uZXJNZXNzYWdlLCBtZXNzYWdlLmlubmVyTWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC5pbm5lck1lc3NhZ2UpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QuaW5uZXJNZXNzYWdlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlubmVyTWVzc2FnZSA9IG9iamVjdC5pbm5lck1lc3NhZ2U7XG4gICAgICAgIGlmIChvYmplY3QucGF0aFRvUm9vdCkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQ3JkdFJ1bnRpbWVNZXNzYWdlLnBhdGhUb1Jvb3Q6IGFycmF5IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5wYXRoVG9Sb290Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdFtpXSA9IFN0cmluZyhvYmplY3QucGF0aFRvUm9vdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0NyZHRSdW50aW1lTWVzc2FnZX0gbWVzc2FnZSBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmFycmF5cyB8fCBvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmlubmVyTWVzc2FnZSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzICE9PSBBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmlubmVyTWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QuaW5uZXJNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UuaW5uZXJNZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlubmVyTWVzc2FnZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UuaW5uZXJNZXNzYWdlLCAwLCBtZXNzYWdlLmlubmVyTWVzc2FnZS5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLmlubmVyTWVzc2FnZSkgOiBtZXNzYWdlLmlubmVyTWVzc2FnZTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3QucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2opXG4gICAgICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3Rbal0gPSBtZXNzYWdlLnBhdGhUb1Jvb3Rbal07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBDcmR0UnVudGltZU1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBDcmR0UnVudGltZU1lc3NhZ2U7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICRyb290O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gYXNQcm9taXNlO1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwuYXNQcm9taXNlfS5cclxuICogQHR5cGVkZWYgYXNQcm9taXNlQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgQWRkaXRpb25hbCBhcmd1bWVudHNcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHByb21pc2UgZnJvbSBhIG5vZGUtc3R5bGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7YXNQcm9taXNlQ2FsbGJhY2t9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcclxuICogQHBhcmFtIHsqfSBjdHggRnVuY3Rpb24gY29udGV4dFxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBGdW5jdGlvbiBhcmd1bWVudHNcclxuICogQHJldHVybnMge1Byb21pc2U8Kj59IFByb21pc2lmaWVkIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBhc1Byb21pc2UoZm4sIGN0eC8qLCB2YXJhcmdzICovKSB7XHJcbiAgICB2YXIgcGFyYW1zICA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgb2Zmc2V0ICA9IDAsXHJcbiAgICAgICAgaW5kZXggICA9IDIsXHJcbiAgICAgICAgcGVuZGluZyA9IHRydWU7XHJcbiAgICB3aGlsZSAoaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoKVxyXG4gICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbaW5kZXgrK107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgcGFyYW1zW29mZnNldF0gPSBmdW5jdGlvbiBjYWxsYmFjayhlcnIvKiwgdmFyYXJncyAqLykge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBwYXJhbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW29mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseShudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmbi5hcHBseShjdHggfHwgbnVsbCwgcGFyYW1zKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIGJhc2U2NCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYnl0ZSBsZW5ndGggb2YgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG5iYXNlNjQubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIHAgPSBzdHJpbmcubGVuZ3RoO1xyXG4gICAgaWYgKCFwKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgdmFyIG4gPSAwO1xyXG4gICAgd2hpbGUgKC0tcCAlIDQgPiAxICYmIHN0cmluZy5jaGFyQXQocCkgPT09IFwiPVwiKVxyXG4gICAgICAgICsrbjtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoc3RyaW5nLmxlbmd0aCAqIDMpIC8gNCAtIG47XHJcbn07XHJcblxyXG4vLyBCYXNlNjQgZW5jb2RpbmcgdGFibGVcclxudmFyIGI2NCA9IG5ldyBBcnJheSg2NCk7XHJcblxyXG4vLyBCYXNlNjQgZGVjb2RpbmcgdGFibGVcclxudmFyIHM2NCA9IG5ldyBBcnJheSgxMjMpO1xyXG5cclxuLy8gNjUuLjkwLCA5Ny4uMTIyLCA0OC4uNTcsIDQzLCA0N1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IDY0OylcclxuICAgIHM2NFtiNjRbaV0gPSBpIDwgMjYgPyBpICsgNjUgOiBpIDwgNTIgPyBpICsgNzEgOiBpIDwgNjIgPyBpIC0gNCA6IGkgLSA1OSB8IDQzXSA9IGkrKztcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGVzIGEgYnVmZmVyIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKi9cclxuYmFzZTY0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXTtcclxuICAgIHZhciBpID0gMCwgLy8gb3V0cHV0IGluZGV4XHJcbiAgICAgICAgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB2YXIgYiA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiID4+IDJdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMykgPDwgNDtcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNF07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAxNSkgPDwgMjtcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNl07XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgJiA2M107XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGopIHtcclxuICAgICAgICBjaHVua1tpKytdID0gYjY0W3RdO1xyXG4gICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgICAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbnZhciBpbnZhbGlkRW5jb2RpbmcgPSBcImludmFsaWQgZW5jb2RpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGEgYnVmZmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBieXRlcyB3cml0dGVuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBlbmNvZGluZyBpcyBpbnZhbGlkXHJcbiAqL1xyXG5iYXNlNjQuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgIHZhciBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDspIHtcclxuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgaWYgKGMgPT09IDYxICYmIGogPiAxKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBpZiAoKGMgPSBzNjRbY10pID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHQgPDwgMiB8IChjICYgNDgpID4+IDQ7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDE1KSA8PCA0IHwgKGMgJiA2MCkgPj4gMjtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMykgPDwgNiB8IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBzdHJpbmcgYXBwZWFycyB0byBiZSBiYXNlNjQgZW5jb2RlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHByb2JhYmx5IGJhc2U2NCBlbmNvZGVkLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmJhc2U2NC50ZXN0ID0gZnVuY3Rpb24gdGVzdChzdHJpbmcpIHtcclxuICAgIHJldHVybiAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC8udGVzdChzdHJpbmcpO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBldmVudCBlbWl0dGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEEgbWluaW1hbCBldmVudCBlbWl0dGVyLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBMaXN0ZW5lclxyXG4gKiBAcGFyYW0geyp9IFtjdHhdIExpc3RlbmVyIGNvbnRleHRcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldnQsIGZuLCBjdHgpIHtcclxuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSB8fCAodGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXSkpLnB1c2goe1xyXG4gICAgICAgIGZuICA6IGZuLFxyXG4gICAgICAgIGN0eCA6IGN0eCB8fCB0aGlzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgb3IgYW55IG1hdGNoaW5nIGxpc3RlbmVycyBpZiBhcmd1bWVudHMgYXJlIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0XSBFdmVudCBuYW1lLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgaWYgb21pdHRlZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZuXSBMaXN0ZW5lciB0byByZW1vdmUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBgZXZ0YCBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZ0LCBmbikge1xyXG4gICAgaWYgKGV2dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGZuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXRzIGFuIGV2ZW50IGJ5IGNhbGxpbmcgaXRzIGxpc3RlbmVycyB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLFxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpKytdLmN0eCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoZmFjdG9yeSk7XHJcblxyXG4vKipcclxuICogUmVhZHMgLyB3cml0ZXMgZmxvYXRzIC8gZG91YmxlcyBmcm9tIC8gdG8gYnVmZmVycy5cclxuICogQG5hbWUgdXRpbC5mbG9hdFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIHRoZSBwdXJwb3NlIG9mIG5vZGUtYmFzZWQgdGVzdGluZyBpbiBtb2RpZmllZCBnbG9iYWwgZW52aXJvbm1lbnRzXHJcbmZ1bmN0aW9uIGZhY3RvcnkoZXhwb3J0cykge1xyXG5cclxuICAgIC8vIGZsb2F0OiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGYzMiA9IG5ldyBGbG9hdDMyQXJyYXkoWyAtMCBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjMyLmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4YlszXSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfY3B5IDogd3JpdGVGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX3JldiA6IHdyaXRlRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gbGUgPyByZWFkRmxvYXRfZjMyX2NweSA6IHJlYWRGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9yZXYgOiByZWFkRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAvLyBmbG9hdDogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfaWVlZTc1NCh3cml0ZVVpbnQsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4odmFsKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQzMjg5MzQ0LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA+IDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpIC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxMzkwOTUwNDApID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA8IDEuMTc1NDk0MzUwODIyMjg3NWUtMzgpIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBNYXRoLnJvdW5kKHZhbCAvIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSkpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gTWF0aC5yb3VuZCh2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpICogODM4ODYwOCkgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMjcgPDwgMjMgfCBtYW50aXNzYSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9pZWVlNzU0KHJlYWRVaW50LCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgdWludCA9IHJlYWRVaW50KGJ1ZiwgcG9zKSxcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAodWludCA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gdWludCA+Pj4gMjMgJiAyNTUsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHVpbnQgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDI1NVxyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxNTApICogKG1hbnRpc3NhICsgODM4ODYwOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFKTtcclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vIGRvdWJsZTogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQ2NEFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmNjQgPSBuZXcgRmxvYXQ2NEFycmF5KFstMF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmNjQuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzddID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzddO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X2NweSA6IHdyaXRlRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9yZXYgOiB3cml0ZURvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9jcHkgOiByZWFkRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfcmV2IDogcmVhZERvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgIC8vIGRvdWJsZTogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2llZWU3NTQod3JpdGVVaW50LCBvZmYwLCBvZmYxLCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc05hTih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQ2OTU5MzYwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4KSB7IC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjE0NjQzNTA3MikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFudGlzc2E7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMi4yMjUwNzM4NTg1MDcyMDE0ZS0zMDgpIHsgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAvIDVlLTMyNDtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgbWFudGlzc2EgLyA0Mjk0OTY3Mjk2KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBvbmVudCA9PT0gMTAyNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb25lbnQgPSAxMDIzO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgKiA0NTAzNTk5NjI3MzcwNDk2ID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTAyMyA8PCAyMCB8IG1hbnRpc3NhICogMTA0ODU3NiAmIDEwNDg1NzUpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfaWVlZTc1NChyZWFkVWludCwgb2ZmMCwgb2ZmMSwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIGxvID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYwKSxcclxuICAgICAgICAgICAgICAgIGhpID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSAoaGkgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IGhpID4+PiAyMCAmIDIwNDcsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IDQyOTQ5NjcyOTYgKiAoaGkgJiAxMDQ4NTc1KSArIGxvO1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDIwNDdcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogNWUtMzI0ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTA3NSkgKiAobWFudGlzc2EgKyA0NTAzNTk5NjI3MzcwNDk2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBleHBvcnRzO1xyXG59XHJcblxyXG4vLyB1aW50IGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludExFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRCRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsID4+PiAyNDtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsICAgICAgICAmIDI1NTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRMRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF1cclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSA8PCAyNCkgPj4+IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50QkUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdIDw8IDI0XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10pID4+PiAwO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGlucXVpcmU7XHJcblxyXG4vKipcclxuICogUmVxdWlyZXMgYSBtb2R1bGUgb25seSBpZiBhdmFpbGFibGUuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIE1vZHVsZSB0byByZXF1aXJlXHJcbiAqIEByZXR1cm5zIHs/T2JqZWN0fSBSZXF1aXJlZCBtb2R1bGUgaWYgYXZhaWxhYmxlIGFuZCBub3QgZW1wdHksIG90aGVyd2lzZSBgbnVsbGBcclxuICovXHJcbmZ1bmN0aW9uIGlucXVpcmUobW9kdWxlTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgbW9kID0gZXZhbChcInF1aXJlXCIucmVwbGFjZSgvXi8sXCJyZVwiKSkobW9kdWxlTmFtZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxyXG4gICAgICAgIGlmIChtb2QgJiYgKG1vZC5sZW5ndGggfHwgT2JqZWN0LmtleXMobW9kKS5sZW5ndGgpKVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kO1xyXG4gICAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDtcclxuXHJcbi8qKlxyXG4gKiBBbiBhbGxvY2F0b3IgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbEFsbG9jYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcclxuICovXHJcblxyXG4vKipcclxuICogQSBzbGljZXIgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbFNsaWNlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBvZmZzZXRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXIgc2xpY2VcclxuICogQHRoaXMge1VpbnQ4QXJyYXl9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgZ2VuZXJhbCBwdXJwb3NlIGJ1ZmZlciBwb29sLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtQb29sQWxsb2NhdG9yfSBhbGxvYyBBbGxvY2F0b3JcclxuICogQHBhcmFtIHtQb29sU2xpY2VyfSBzbGljZSBTbGljZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTgxOTJdIFNsYWIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7UG9vbEFsbG9jYXRvcn0gUG9vbGVkIGFsbG9jYXRvclxyXG4gKi9cclxuZnVuY3Rpb24gcG9vbChhbGxvYywgc2xpY2UsIHNpemUpIHtcclxuICAgIHZhciBTSVpFICAgPSBzaXplIHx8IDgxOTI7XHJcbiAgICB2YXIgTUFYICAgID0gU0laRSA+Pj4gMTtcclxuICAgIHZhciBzbGFiICAgPSBudWxsO1xyXG4gICAgdmFyIG9mZnNldCA9IFNJWkU7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcG9vbF9hbGxvYyhzaXplKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiBNQVgpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxvYyhzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICsgc2l6ZSA+IFNJWkUpIHtcclxuICAgICAgICAgICAgc2xhYiA9IGFsbG9jKFNJWkUpO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmID0gc2xpY2UuY2FsbChzbGFiLCBvZmZzZXQsIG9mZnNldCArPSBzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICYgNykgLy8gYWxpZ24gdG8gMzIgYml0XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgfCA3KSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH07XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIFVURjggaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGY4ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBVVEY4IGJ5dGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxudXRmOC5sZW5ndGggPSBmdW5jdGlvbiB1dGY4X2xlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBsZW4gPSAwLFxyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMgPCAxMjgpXHJcbiAgICAgICAgICAgIGxlbiArPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBlbHNlIGlmICgoYyAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgbGVuICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGxlbiArPSAzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBVVEY4IGJ5dGVzIGFzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAqL1xyXG51dGY4LnJlYWQgPSBmdW5jdGlvbiB1dGY4X3JlYWQoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICBpZiAobGVuIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXSxcclxuICAgICAgICBpID0gMCwgLy8gY2hhciBvZmZzZXRcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB0ID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIGlmICh0IDwgMTI4KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gdDtcclxuICAgICAgICBlbHNlIGlmICh0ID4gMTkxICYmIHQgPCAyMjQpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDMxKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDIzOSAmJiB0IDwgMzY1KSB7XHJcbiAgICAgICAgICAgIHQgPSAoKHQgJiA3KSA8PCAxOCB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MykgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEODAwICsgKHQgPj4gMTApO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEQzAwICsgKHQgJiAxMDIzKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMTUpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nIGFzIFVURjggYnl0ZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZXMgd3JpdHRlblxyXG4gKi9cclxudXRmOC53cml0ZSA9IGZ1bmN0aW9uIHV0Zjhfd3JpdGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGMxLCAvLyBjaGFyYWN0ZXIgMVxyXG4gICAgICAgIGMyOyAvLyBjaGFyYWN0ZXIgMlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjMSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjMSA8IDEyOCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjMSA8IDIwNDgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICAgICAgfCAxOTI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGMxICYgMHhGQzAwKSA9PT0gMHhEODAwICYmICgoYzIgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgIGMxID0gMHgxMDAwMCArICgoYzEgJiAweDAzRkYpIDw8IDEwKSArIChjMiAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDE4ICAgICAgfCAyNDA7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICAgICAgfCAyMjQ7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcbiIsIi8vIG1pbmltYWwgbGlicmFyeSBlbnRyeSBwb2ludC5cblxuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3NyYy9pbmRleC1taW5pbWFsXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcHJvdG9idWYgPSBleHBvcnRzO1xuXG4vKipcbiAqIEJ1aWxkIHR5cGUsIG9uZSBvZiBgXCJmdWxsXCJgLCBgXCJsaWdodFwiYCBvciBgXCJtaW5pbWFsXCJgLlxuICogQG5hbWUgYnVpbGRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAY29uc3RcbiAqL1xucHJvdG9idWYuYnVpbGQgPSBcIm1pbmltYWxcIjtcblxuLy8gU2VyaWFsaXphdGlvblxucHJvdG9idWYuV3JpdGVyICAgICAgID0gcmVxdWlyZShcIi4vd3JpdGVyXCIpO1xucHJvdG9idWYuQnVmZmVyV3JpdGVyID0gcmVxdWlyZShcIi4vd3JpdGVyX2J1ZmZlclwiKTtcbnByb3RvYnVmLlJlYWRlciAgICAgICA9IHJlcXVpcmUoXCIuL3JlYWRlclwiKTtcbnByb3RvYnVmLkJ1ZmZlclJlYWRlciA9IHJlcXVpcmUoXCIuL3JlYWRlcl9idWZmZXJcIik7XG5cbi8vIFV0aWxpdHlcbnByb3RvYnVmLnV0aWwgICAgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcbnByb3RvYnVmLnJwYyAgICAgICAgICA9IHJlcXVpcmUoXCIuL3JwY1wiKTtcbnByb3RvYnVmLnJvb3RzICAgICAgICA9IHJlcXVpcmUoXCIuL3Jvb3RzXCIpO1xucHJvdG9idWYuY29uZmlndXJlICAgID0gY29uZmlndXJlO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyoqXG4gKiBSZWNvbmZpZ3VyZXMgdGhlIGxpYnJhcnkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudC5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGNvbmZpZ3VyZSgpIHtcbiAgICBwcm90b2J1Zi51dGlsLl9jb25maWd1cmUoKTtcbiAgICBwcm90b2J1Zi5Xcml0ZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJXcml0ZXIpO1xuICAgIHByb3RvYnVmLlJlYWRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlclJlYWRlcik7XG59XG5cbi8vIFNldCB1cCBidWZmZXIgdXRpbGl0eSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50XG5jb25maWd1cmUoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFkZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJSZWFkZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBpbmRleE91dE9mUmFuZ2UocmVhZGVyLCB3cml0ZUxlbmd0aCkge1xuICAgIHJldHVybiBSYW5nZUVycm9yKFwiaW5kZXggb3V0IG9mIHJhbmdlOiBcIiArIHJlYWRlci5wb3MgKyBcIiArIFwiICsgKHdyaXRlTGVuZ3RoIHx8IDEpICsgXCIgPiBcIiArIHJlYWRlci5sZW4pO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgcmVhZGVyIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gUmVhZGVyKGJ1ZmZlcikge1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQHR5cGUge1VpbnQ4QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5idWYgPSBidWZmZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBwb3NpdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucG9zID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gYnVmZmVyLmxlbmd0aDtcbn1cblxudmFyIGNyZWF0ZV9hcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgPyBmdW5jdGlvbiBjcmVhdGVfdHlwZWRfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1ZmZlcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xuICAgIH07XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cChidWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhZGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWwuQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgQnVmZmVyUmVhZGVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICAgICAgOiBjcmVhdGVfYXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgIH0pKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBjcmVhdGVfYXJyYXk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcmVhZGVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICogQHJldHVybnMge1JlYWRlcnxCdWZmZXJSZWFkZXJ9IEEge0BsaW5rIEJ1ZmZlclJlYWRlcn0gaWYgYGJ1ZmZlcmAgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBhIHtAbGluayBSZWFkZXJ9XG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ1ZmZlcmAgaXMgbm90IGEgdmFsaWQgYnVmZmVyXG4gKi9cblJlYWRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLkFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS51aW50MzIgPSAoZnVuY3Rpb24gcmVhZF91aW50MzJfc2V0dXAoKSB7XG4gICAgdmFyIHZhbHVlID0gNDI5NDk2NzI5NTsgLy8gb3B0aW1pemVyIHR5cGUtaGludCwgdGVuZHMgdG8gZGVvcHQgb3RoZXJ3aXNlICg/ISlcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVhZF91aW50MzIoKSB7XG4gICAgICAgIHZhbHVlID0gKCAgICAgICAgIHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNyAgICAgICApID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAgNykgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDE0KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjEpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgIDE1KSA8PCAyOCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoKHRoaXMucG9zICs9IDUpID4gdGhpcy5sZW4pIHtcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5sZW47XG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiByZWFkX2ludDMyKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpIHwgMDtcbn07XG5cbi8qKlxuICogUmVhZHMgYSB6aWctemFnIGVuY29kZWQgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiByZWFkX3NpbnQzMigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnVpbnQzMigpO1xuICAgIHJldHVybiB2YWx1ZSA+Pj4gMSBeIC0odmFsdWUgJiAxKSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZExvbmdWYXJpbnQoKSB7XG4gICAgLy8gdGVuZHMgdG8gZGVvcHQgd2l0aCBsb2NhbCB2YXJzIGZvciBvY3RldCBldGMuXG4gICAgdmFyIGJpdHMgPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChsbylcbiAgICAgICAgZm9yICg7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIC8vIDFzdC4uNHRoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNXRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDI4KSA+Pj4gMDtcbiAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPj4gIDQpID4+PiAwO1xuICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgaSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDFzdC4uM3RoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNHRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICByZXR1cm4gYml0cztcbiAgICB9XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGhpKVxuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxuICAgICAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcgKyAzKSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB2YXJpbnQgZW5jb2RpbmdcIik7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjdWludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI3NpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBib29sZWFuLlxuICogQHJldHVybnMge2Jvb2xlYW59IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gcmVhZF9ib29sKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpICE9PSAwO1xufTtcblxuZnVuY3Rpb24gcmVhZEZpeGVkMzJfZW5kKGJ1ZiwgZW5kKSB7IC8vIG5vdGUgdGhhdCB0aGlzIHVzZXMgYGVuZGAsIG5vdCBgcG9zYFxuICAgIHJldHVybiAoYnVmW2VuZCAtIDRdXG4gICAgICAgICAgfCBidWZbZW5kIC0gM10gPDwgOFxuICAgICAgICAgIHwgYnVmW2VuZCAtIDJdIDw8IDE2XG4gICAgICAgICAgfCBidWZbZW5kIC0gMV0gPDwgMjQpID4+PiAwO1xufVxuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfZml4ZWQzMigpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYSBzaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX3NmaXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZEZpeGVkNjQoLyogdGhpczogUmVhZGVyICovKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA4KTtcblxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMocmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSwgcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSk7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyB6aWctemFnIGVuY29kZWQgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNzZml4ZWQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSBmbG9hdCAoMzIgYml0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gcmVhZF9mbG9hdCgpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRmxvYXRMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHJlYWRfZG91YmxlKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDg7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHJlYWRfYnl0ZXMoKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMudWludDMyKCksXG4gICAgICAgIHN0YXJ0ICA9IHRoaXMucG9zLFxuICAgICAgICBlbmQgICAgPSB0aGlzLnBvcyArIGxlbmd0aDtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlbmQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG5cbiAgICB0aGlzLnBvcyArPSBsZW5ndGg7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5idWYpKSAvLyBwbGFpbiBhcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5idWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSBlbmQgLy8gZml4IGZvciBJRSAxMC9XaW44IGFuZCBvdGhlcnMnIHN1YmFycmF5IHJldHVybmluZyBhcnJheSBvZiBzaXplIDFcbiAgICAgICAgPyBuZXcgdGhpcy5idWYuY29uc3RydWN0b3IoMClcbiAgICAgICAgOiB0aGlzLl9zbGljZS5jYWxsKHRoaXMuYnVmLCBzdGFydCwgZW5kKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzdHJpbmcgcHJlY2VlZGVkIGJ5IGl0cyBieXRlIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZygpIHtcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzKCk7XG4gICAgcmV0dXJuIHV0ZjgucmVhZChieXRlcywgMCwgYnl0ZXMubGVuZ3RoKTtcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYnl0ZXMgaWYgc3BlY2lmaWVkLCBvdGhlcndpc2Ugc2tpcHMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTGVuZ3RoIGlmIGtub3duLCBvdGhlcndpc2UgYSB2YXJpbnQgaXMgYXNzdW1lZFxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIHNraXAobGVuZ3RoKSB7XG4gICAgaWYgKHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh0aGlzLnBvcyArIGxlbmd0aCA+IHRoaXMubGVuKVxuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG4gICAgICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNraXBzIHRoZSBuZXh0IGVsZW1lbnQgb2YgdGhlIHNwZWNpZmllZCB3aXJlIHR5cGUuXG4gKiBAcGFyYW0ge251bWJlcn0gd2lyZVR5cGUgV2lyZSB0eXBlIHJlY2VpdmVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwVHlwZSA9IGZ1bmN0aW9uKHdpcmVUeXBlKSB7XG4gICAgc3dpdGNoICh3aXJlVHlwZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLnNraXAoOCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5za2lwKHRoaXMudWludDMyKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHdoaWxlICgod2lyZVR5cGUgPSB0aGlzLnVpbnQzMigpICYgNykgIT09IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBUeXBlKHdpcmVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB0aGlzLnNraXAoNCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHdpcmUgdHlwZSBcIiArIHdpcmVUeXBlICsgXCIgYXQgb2Zmc2V0IFwiICsgdGhpcy5wb3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cblJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyUmVhZGVyXykge1xuICAgIEJ1ZmZlclJlYWRlciA9IEJ1ZmZlclJlYWRlcl87XG4gICAgUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuICAgIEJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG5cbiAgICB2YXIgZm4gPSB1dGlsLkxvbmcgPyBcInRvTG9uZ1wiIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXCJ0b051bWJlclwiO1xuICAgIHV0aWwubWVyZ2UoUmVhZGVyLnByb3RvdHlwZSwge1xuXG4gICAgICAgIGludDY0OiBmdW5jdGlvbiByZWFkX2ludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1aW50NjQ6IGZ1bmN0aW9uIHJlYWRfdWludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNpbnQ2NDogZnVuY3Rpb24gcmVhZF9zaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKS56ekRlY29kZSgpW2ZuXShmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9maXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNmaXhlZDY0OiBmdW5jdGlvbiByZWFkX3NmaXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlclJlYWRlcjtcblxuLy8gZXh0ZW5kcyBSZWFkZXJcbnZhciBSZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG4oQnVmZmVyUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVhZGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyUmVhZGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciByZWFkZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXG4gKiBAZXh0ZW5kcyBSZWFkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlclJlYWRlcihidWZmZXIpIHtcbiAgICBSZWFkZXIuY2FsbCh0aGlzLCBidWZmZXIpO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQG5hbWUgQnVmZmVyUmVhZGVyI2J1ZlxuICAgICAqIEB0eXBlIHtCdWZmZXJ9XG4gICAgICovXG59XG5cbkJ1ZmZlclJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHV0aWwuQnVmZmVyKVxuICAgICAgICBCdWZmZXJSZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zbGljZTtcbn07XG5cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZ19idWZmZXIoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMudWludDMyKCk7IC8vIG1vZGlmaWVzIHBvc1xuICAgIHJldHVybiB0aGlzLmJ1Zi51dGY4U2xpY2VcbiAgICAgICAgPyB0aGlzLmJ1Zi51dGY4U2xpY2UodGhpcy5wb3MsIHRoaXMucG9zID0gTWF0aC5taW4odGhpcy5wb3MgKyBsZW4sIHRoaXMubGVuKSlcbiAgICAgICAgOiB0aGlzLmJ1Zi50b1N0cmluZyhcInV0Zi04XCIsIHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQG5hbWUgQnVmZmVyUmVhZGVyI2J5dGVzXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFZhbHVlIHJlYWRcbiAqL1xuXG5CdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vKipcbiAqIE5hbWVkIHJvb3RzLlxuICogVGhpcyBpcyB3aGVyZSBwYmpzIHN0b3JlcyBnZW5lcmF0ZWQgc3RydWN0dXJlcyAodGhlIG9wdGlvbiBgLXIsIC0tcm9vdGAgc3BlY2lmaWVzIGEgbmFtZSkuXG4gKiBDYW4gYWxzbyBiZSB1c2VkIG1hbnVhbGx5IHRvIG1ha2Ugcm9vdHMgYXZhaWxhYmxlIGFjY3Jvc3MgbW9kdWxlcy5cbiAqIEBuYW1lIHJvb3RzXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsUm9vdD59XG4gKiBAZXhhbXBsZVxuICogLy8gcGJqcyAtciBteXJvb3QgLW8gY29tcGlsZWQuanMgLi4uXG4gKlxuICogLy8gaW4gYW5vdGhlciBtb2R1bGU6XG4gKiByZXF1aXJlKFwiLi9jb21waWxlZC5qc1wiKTtcbiAqXG4gKiAvLyBpbiBhbnkgc3Vic2VxdWVudCBtb2R1bGU6XG4gKiB2YXIgcm9vdCA9IHByb3RvYnVmLnJvb3RzW1wibXlyb290XCJdO1xuICovXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBTdHJlYW1pbmcgUlBDIGhlbHBlcnMuXG4gKiBAbmFtZXNwYWNlXG4gKi9cbnZhciBycGMgPSBleHBvcnRzO1xuXG4vKipcbiAqIFJQQyBpbXBsZW1lbnRhdGlvbiBwYXNzZWQgdG8ge0BsaW5rIFNlcnZpY2UjY3JlYXRlfSBwZXJmb3JtaW5nIGEgc2VydmljZSByZXF1ZXN0IG9uIG5ldHdvcmsgbGV2ZWwsIGkuZS4gYnkgdXRpbGl6aW5nIGh0dHAgcmVxdWVzdHMgb3Igd2Vic29ja2V0cy5cbiAqIEB0eXBlZGVmIFJQQ0ltcGxcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7TWV0aG9kfHJwYy5TZXJ2aWNlTWV0aG9kPE1lc3NhZ2U8e30+LE1lc3NhZ2U8e30+Pn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kIGJlaW5nIGNhbGxlZFxuICogQHBhcmFtIHtVaW50OEFycmF5fSByZXF1ZXN0RGF0YSBSZXF1ZXN0IGRhdGFcbiAqIEBwYXJhbSB7UlBDSW1wbENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBycGNJbXBsKG1ldGhvZCwgcmVxdWVzdERhdGEsIGNhbGxiYWNrKSB7XG4gKiAgICAgaWYgKHByb3RvYnVmLnV0aWwubGNGaXJzdChtZXRob2QubmFtZSkgIT09IFwibXlNZXRob2RcIikgLy8gY29tcGF0aWJsZSB3aXRoIHN0YXRpYyBjb2RlXG4gKiAgICAgICAgIHRocm93IEVycm9yKFwibm8gc3VjaCBtZXRob2RcIik7XG4gKiAgICAgYXN5bmNocm9ub3VzbHlPYnRhaW5BUmVzcG9uc2UocmVxdWVzdERhdGEsIGZ1bmN0aW9uKGVyciwgcmVzcG9uc2VEYXRhKSB7XG4gKiAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzcG9uc2VEYXRhKTtcbiAqICAgICB9KTtcbiAqIH1cbiAqL1xuXG4vKipcbiAqIE5vZGUtc3R5bGUgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgUlBDSW1wbH0uXG4gKiBAdHlwZWRlZiBSUENJbXBsQ2FsbGJhY2tcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueSwgb3RoZXJ3aXNlIGBudWxsYFxuICogQHBhcmFtIHtVaW50OEFycmF5fG51bGx9IFtyZXNwb25zZV0gUmVzcG9uc2UgZGF0YSBvciBgbnVsbGAgdG8gc2lnbmFsIGVuZCBvZiBzdHJlYW0sIGlmIHRoZXJlIGhhc24ndCBiZWVuIGFuIGVycm9yXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbnJwYy5TZXJ2aWNlID0gcmVxdWlyZShcIi4vcnBjL3NlcnZpY2VcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gU2VydmljZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vLyBFeHRlbmRzIEV2ZW50RW1pdHRlclxuKFNlcnZpY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh1dGlsLkV2ZW50RW1pdHRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFNlcnZpY2U7XG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBycGMuU2VydmljZU1ldGhvZHxTZXJ2aWNlTWV0aG9kfS5cbiAqXG4gKiBEaWZmZXJzIGZyb20ge0BsaW5rIFJQQ0ltcGxDYWxsYmFja30gaW4gdGhhdCBpdCBpcyBhbiBhY3R1YWwgY2FsbGJhY2sgb2YgYSBzZXJ2aWNlIG1ldGhvZCB3aGljaCBtYXkgbm90IHJldHVybiBgcmVzcG9uc2UgPSBudWxsYC5cbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2tcbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XG4gKiBAcGFyYW0ge1RSZXN9IFtyZXNwb25zZV0gUmVzcG9uc2UgbWVzc2FnZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEEgc2VydmljZSBtZXRob2QgcGFydCBvZiBhIHtAbGluayBycGMuU2VydmljZX0gYXMgY3JlYXRlZCBieSB7QGxpbmsgU2VydmljZS5jcmVhdGV9LlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RcbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IFtjYWxsYmFja10gTm9kZS1zdHlsZSBjYWxsYmFjayBjYWxsZWQgd2l0aCB0aGUgZXJyb3IsIGlmIGFueSwgYW5kIHRoZSByZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNZXNzYWdlPFRSZXM+Pn0gUHJvbWlzZSBpZiBgY2FsbGJhY2tgIGhhcyBiZWVuIG9taXR0ZWQsIG90aGVyd2lzZSBgdW5kZWZpbmVkYFxuICovXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBSUEMgc2VydmljZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQW4gUlBDIHNlcnZpY2UgYXMgcmV0dXJuZWQgYnkge0BsaW5rIFNlcnZpY2UjY3JlYXRlfS5cbiAqIEBleHBvcnRzIHJwYy5TZXJ2aWNlXG4gKiBAZXh0ZW5kcyB1dGlsLkV2ZW50RW1pdHRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1JQQ0ltcGx9IHJwY0ltcGwgUlBDIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0RGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNwb25zZURlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqL1xuZnVuY3Rpb24gU2VydmljZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCkge1xuXG4gICAgaWYgKHR5cGVvZiBycGNJbXBsICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJwY0ltcGwgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuXG4gICAgdXRpbC5FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIFJQQyBpbXBsZW1lbnRhdGlvbi4gQmVjb21lcyBgbnVsbGAgb25jZSB0aGUgc2VydmljZSBpcyBlbmRlZC5cbiAgICAgKiBAdHlwZSB7UlBDSW1wbHxudWxsfVxuICAgICAqL1xuICAgIHRoaXMucnBjSW1wbCA9IHJwY0ltcGw7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVxdWVzdERlbGltaXRlZCA9IEJvb2xlYW4ocmVxdWVzdERlbGltaXRlZCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlc3BvbnNlRGVsaW1pdGVkID0gQm9vbGVhbihyZXNwb25zZURlbGltaXRlZCk7XG59XG5cbi8qKlxuICogQ2FsbHMgYSBzZXJ2aWNlIG1ldGhvZCB0aHJvdWdoIHtAbGluayBycGMuU2VydmljZSNycGNJbXBsfHJwY0ltcGx9LlxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8VFJlcSxUUmVzPn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXE+fSByZXF1ZXN0Q3RvciBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXM+fSByZXNwb25zZUN0b3IgUmVzcG9uc2UgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gY2FsbGJhY2sgU2VydmljZSBjYWxsYmFja1xuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKi9cblNlcnZpY2UucHJvdG90eXBlLnJwY0NhbGwgPSBmdW5jdGlvbiBycGNDYWxsKG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCwgY2FsbGJhY2spIHtcblxuICAgIGlmICghcmVxdWVzdClcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVxdWVzdCBtdXN0IGJlIHNwZWNpZmllZFwiKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoIWNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gdXRpbC5hc1Byb21pc2UocnBjQ2FsbCwgc2VsZiwgbWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0KTtcblxuICAgIGlmICghc2VsZi5ycGNJbXBsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKEVycm9yKFwiYWxyZWFkeSBlbmRlZFwiKSk7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJwY0ltcGwoXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICByZXF1ZXN0Q3RvcltzZWxmLnJlcXVlc3REZWxpbWl0ZWQgPyBcImVuY29kZURlbGltaXRlZFwiIDogXCJlbmNvZGVcIl0ocmVxdWVzdCkuZmluaXNoKCksXG4gICAgICAgICAgICBmdW5jdGlvbiBycGNDYWxsYmFjayhlcnIsIHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kKC8qIGVuZGVkQnlSUEMgKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiByZXNwb25zZUN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlQ3RvcltzZWxmLnJlc3BvbnNlRGVsaW1pdGVkID8gXCJkZWNvZGVEZWxpbWl0ZWRcIiA6IFwiZGVjb2RlXCJdKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImRhdGFcIiwgcmVzcG9uc2UsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhlcnIpOyB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEVuZHMgdGhpcyBzZXJ2aWNlIGFuZCBlbWl0cyB0aGUgYGVuZGAgZXZlbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmRlZEJ5UlBDPWZhbHNlXSBXaGV0aGVyIHRoZSBzZXJ2aWNlIGhhcyBiZWVuIGVuZGVkIGJ5IHRoZSBSUEMgaW1wbGVtZW50YXRpb24uXG4gKiBAcmV0dXJucyB7cnBjLlNlcnZpY2V9IGB0aGlzYFxuICovXG5TZXJ2aWNlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiBlbmQoZW5kZWRCeVJQQykge1xuICAgIGlmICh0aGlzLnJwY0ltcGwpIHtcbiAgICAgICAgaWYgKCFlbmRlZEJ5UlBDKSAvLyBzaWduYWwgZW5kIHRvIHJwY0ltcGxcbiAgICAgICAgICAgIHRoaXMucnBjSW1wbChudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdGhpcy5ycGNJbXBsID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KFwiZW5kXCIpLm9mZigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gTG9uZ0JpdHM7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMuXG4gKiBAY2xhc3NkZXNjIEhlbHBlciBjbGFzcyBmb3Igd29ya2luZyB3aXRoIHRoZSBsb3cgYW5kIGhpZ2ggYml0cyBvZiBhIDY0IGJpdCB2YWx1ZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBsbyBMb3cgMzIgYml0cywgdW5zaWduZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaSBIaWdoIDMyIGJpdHMsIHVuc2lnbmVkXG4gKi9cbmZ1bmN0aW9uIExvbmdCaXRzKGxvLCBoaSkge1xuXG4gICAgLy8gbm90ZSB0aGF0IHRoZSBjYXN0cyBiZWxvdyBhcmUgdGhlb3JldGljYWxseSB1bm5lY2Vzc2FyeSBhcyBvZiB0b2RheSwgYnV0IG9sZGVyIHN0YXRpY2FsbHlcbiAgICAvLyBnZW5lcmF0ZWQgY29udmVydGVyIGNvZGUgbWlnaHQgc3RpbGwgY2FsbCB0aGUgY3RvciB3aXRoIHNpZ25lZCAzMmJpdHMuIGtlcHQgZm9yIGNvbXBhdC5cblxuICAgIC8qKlxuICAgICAqIExvdyBiaXRzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sbyA9IGxvID4+PiAwO1xuXG4gICAgLyoqXG4gICAgICogSGlnaCBiaXRzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5oaSA9IGhpID4+PiAwO1xufVxuXG4vKipcbiAqIFplcm8gYml0cy5cbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXG4gKiBAdHlwZSB7dXRpbC5Mb25nQml0c31cbiAqL1xudmFyIHplcm8gPSBMb25nQml0cy56ZXJvID0gbmV3IExvbmdCaXRzKDAsIDApO1xuXG56ZXJvLnRvTnVtYmVyID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuemVyby56ekVuY29kZSA9IHplcm8uenpEZWNvZGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH07XG56ZXJvLmxlbmd0aCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMTsgfTtcblxuLyoqXG4gKiBaZXJvIGhhc2guXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xuICogQHR5cGUge3N0cmluZ31cbiAqL1xudmFyIHplcm9IYXNoID0gTG9uZ0JpdHMuemVyb0hhc2ggPSBcIlxcMFxcMFxcMFxcMFxcMFxcMFxcMFxcMFwiO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcbiAqL1xuTG9uZ0JpdHMuZnJvbU51bWJlciA9IGZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApXG4gICAgICAgIHJldHVybiB6ZXJvO1xuICAgIHZhciBzaWduID0gdmFsdWUgPCAwO1xuICAgIGlmIChzaWduKVxuICAgICAgICB2YWx1ZSA9IC12YWx1ZTtcbiAgICB2YXIgbG8gPSB2YWx1ZSA+Pj4gMCxcbiAgICAgICAgaGkgPSAodmFsdWUgLSBsbykgLyA0Mjk0OTY3Mjk2ID4+PiAwO1xuICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpID0gfmhpID4+PiAwO1xuICAgICAgICBsbyA9IH5sbyA+Pj4gMDtcbiAgICAgICAgaWYgKCsrbG8gPiA0Mjk0OTY3Mjk1KSB7XG4gICAgICAgICAgICBsbyA9IDA7XG4gICAgICAgICAgICBpZiAoKytoaSA+IDQyOTQ5NjcyOTUpXG4gICAgICAgICAgICAgICAgaGkgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMobG8sIGhpKTtcbn07XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gYSBudW1iZXIsIGxvbmcgb3Igc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcbiAqL1xuTG9uZ0JpdHMuZnJvbSA9IGZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh1dGlsLkxvbmcpXG4gICAgICAgICAgICB2YWx1ZSA9IHV0aWwuTG9uZy5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIocGFyc2VJbnQodmFsdWUsIDEwKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5sb3cgfHwgdmFsdWUuaGlnaCA/IG5ldyBMb25nQml0cyh2YWx1ZS5sb3cgPj4+IDAsIHZhbHVlLmhpZ2ggPj4+IDApIDogemVybztcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBwb3NzaWJseSB1bnNhZmUgSmF2YVNjcmlwdCBudW1iZXIuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFBvc3NpYmx5IHVuc2FmZSBudW1iZXJcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIodW5zaWduZWQpIHtcbiAgICBpZiAoIXVuc2lnbmVkICYmIHRoaXMuaGkgPj4+IDMxKSB7XG4gICAgICAgIHZhciBsbyA9IH50aGlzLmxvICsgMSA+Pj4gMCxcbiAgICAgICAgICAgIGhpID0gfnRoaXMuaGkgICAgID4+PiAwO1xuICAgICAgICBpZiAoIWxvKVxuICAgICAgICAgICAgaGkgPSBoaSArIDEgPj4+IDA7XG4gICAgICAgIHJldHVybiAtKGxvICsgaGkgKiA0Mjk0OTY3Mjk2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG8gKyB0aGlzLmhpICogNDI5NDk2NzI5Njtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBsb25nLlxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7TG9uZ30gTG9uZ1xuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9Mb25nID0gZnVuY3Rpb24gdG9Mb25nKHVuc2lnbmVkKSB7XG4gICAgcmV0dXJuIHV0aWwuTG9uZ1xuICAgICAgICA/IG5ldyB1dGlsLkxvbmcodGhpcy5sbyB8IDAsIHRoaXMuaGkgfCAwLCBCb29sZWFuKHVuc2lnbmVkKSlcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiB7IGxvdzogdGhpcy5sbyB8IDAsIGhpZ2g6IHRoaXMuaGkgfCAwLCB1bnNpZ25lZDogQm9vbGVhbih1bnNpZ25lZCkgfTtcbn07XG5cbnZhciBjaGFyQ29kZUF0ID0gU3RyaW5nLnByb3RvdHlwZS5jaGFyQ29kZUF0O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIEhhc2hcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBCaXRzXG4gKi9cbkxvbmdCaXRzLmZyb21IYXNoID0gZnVuY3Rpb24gZnJvbUhhc2goaGFzaCkge1xuICAgIGlmIChoYXNoID09PSB6ZXJvSGFzaClcbiAgICAgICAgcmV0dXJuIHplcm87XG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMClcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMSkgPDwgOFxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAyKSA8PCAxNlxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAzKSA8PCAyNCkgPj4+IDBcbiAgICAsXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDQpXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDUpIDw8IDhcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNikgPDwgMTZcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNykgPDwgMjQpID4+PiAwXG4gICAgKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9IYXNoID0gZnVuY3Rpb24gdG9IYXNoKCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICB0aGlzLmxvICAgICAgICAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gOCAgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDE2ICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiAyNCAgICAgICxcbiAgICAgICAgdGhpcy5oaSAgICAgICAgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDggICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiAxNiAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gMjRcbiAgICApO1xufTtcblxuLyoqXG4gKiBaaWctemFnIGVuY29kZXMgdGhpcyBsb25nIGJpdHMuXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS56ekVuY29kZSA9IGZ1bmN0aW9uIHp6RW5jb2RlKCkge1xuICAgIHZhciBtYXNrID0gICB0aGlzLmhpID4+IDMxO1xuICAgIHRoaXMuaGkgID0gKCh0aGlzLmhpIDw8IDEgfCB0aGlzLmxvID4+PiAzMSkgXiBtYXNrKSA+Pj4gMDtcbiAgICB0aGlzLmxvICA9ICggdGhpcy5sbyA8PCAxICAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFppZy16YWcgZGVjb2RlcyB0aGlzIGxvbmcgYml0cy5cbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnp6RGVjb2RlID0gZnVuY3Rpb24genpEZWNvZGUoKSB7XG4gICAgdmFyIG1hc2sgPSAtKHRoaXMubG8gJiAxKTtcbiAgICB0aGlzLmxvICA9ICgodGhpcy5sbyA+Pj4gMSB8IHRoaXMuaGkgPDwgMzEpIF4gbWFzaykgPj4+IDA7XG4gICAgdGhpcy5oaSAgPSAoIHRoaXMuaGkgPj4+IDEgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhpcyBsb25nYml0cyB3aGVuIGVuY29kZWQgYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGhcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aCgpIHtcbiAgICB2YXIgcGFydDAgPSAgdGhpcy5sbyxcbiAgICAgICAgcGFydDEgPSAodGhpcy5sbyA+Pj4gMjggfCB0aGlzLmhpIDw8IDQpID4+PiAwLFxuICAgICAgICBwYXJ0MiA9ICB0aGlzLmhpID4+PiAyNDtcbiAgICByZXR1cm4gcGFydDIgPT09IDBcbiAgICAgICAgID8gcGFydDEgPT09IDBcbiAgICAgICAgICAgPyBwYXJ0MCA8IDE2Mzg0XG4gICAgICAgICAgICAgPyBwYXJ0MCA8IDEyOCA/IDEgOiAyXG4gICAgICAgICAgICAgOiBwYXJ0MCA8IDIwOTcxNTIgPyAzIDogNFxuICAgICAgICAgICA6IHBhcnQxIDwgMTYzODRcbiAgICAgICAgICAgICA/IHBhcnQxIDwgMTI4ID8gNSA6IDZcbiAgICAgICAgICAgICA6IHBhcnQxIDwgMjA5NzE1MiA/IDcgOiA4XG4gICAgICAgICA6IHBhcnQyIDwgMTI4ID8gOSA6IDEwO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSBleHBvcnRzO1xuXG4vLyB1c2VkIHRvIHJldHVybiBhIFByb21pc2Ugd2hlcmUgY2FsbGJhY2sgaXMgb21pdHRlZFxudXRpbC5hc1Byb21pc2UgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvYXNwcm9taXNlXCIpO1xuXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xudXRpbC5iYXNlNjQgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvYmFzZTY0XCIpO1xuXG4vLyBiYXNlIGNsYXNzIG9mIHJwYy5TZXJ2aWNlXG51dGlsLkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9ldmVudGVtaXR0ZXJcIik7XG5cbi8vIGZsb2F0IGhhbmRsaW5nIGFjY3Jvc3MgYnJvd3NlcnNcbnV0aWwuZmxvYXQgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvZmxvYXRcIik7XG5cbi8vIHJlcXVpcmVzIG1vZHVsZXMgb3B0aW9uYWxseSBhbmQgaGlkZXMgdGhlIGNhbGwgZnJvbSBidW5kbGVyc1xudXRpbC5pbnF1aXJlID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2lucXVpcmVcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSB1dGY4IGVuY29kZWQgc3RyaW5nc1xudXRpbC51dGY4ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL3V0ZjhcIik7XG5cbi8vIHByb3ZpZGVzIGEgbm9kZS1saWtlIGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyXG51dGlsLnBvb2wgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvcG9vbFwiKTtcblxuLy8gdXRpbGl0eSB0byB3b3JrIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlXG51dGlsLkxvbmdCaXRzID0gcmVxdWlyZShcIi4vbG9uZ2JpdHNcIik7XG5cbi8qKlxuICogV2hldGhlciBydW5uaW5nIHdpdGhpbiBub2RlIG9yIG5vdC5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xudXRpbC5pc05vZGUgPSBCb29sZWFuKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzc1xuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnMubm9kZSk7XG5cbi8qKlxuICogR2xvYmFsIG9iamVjdCByZWZlcmVuY2UuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge09iamVjdH1cbiAqL1xudXRpbC5nbG9iYWwgPSB1dGlsLmlzTm9kZSAmJiBnbG9iYWxcbiAgICAgICAgICAgfHwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3dcbiAgICAgICAgICAgfHwgdHlwZW9mIHNlbGYgICAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmXG4gICAgICAgICAgIHx8IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW52YWxpZC10aGlzXG5cbi8qKlxuICogQW4gaW1tdWFibGUgZW1wdHkgYXJyYXkuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge0FycmF5LjwqPn1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZShbXSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBbXTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXG5cbi8qKlxuICogQW4gaW1tdXRhYmxlIGVtcHR5IG9iamVjdC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5lbXB0eU9iamVjdCA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKHt9KSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHt9OyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlclxuICovXG51dGlsLmlzSW50ZWdlciA9IE51bWJlci5pc0ludGVnZXIgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZ1xuICovXG51dGlsLmlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdFxuICovXG51dGlsLmlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxuICogVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgdXRpbC5pc1NldH0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogUGxhaW4gb2JqZWN0IG9yIG1lc3NhZ2UgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxuICovXG51dGlsLmlzc2V0ID1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNTZXQgPSBmdW5jdGlvbiBpc1NldChvYmosIHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBvYmpbcHJvcF07XG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcSwgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCkgPiAwO1xuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQW55IGNvbXBhdGlibGUgQnVmZmVyIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIEJ1ZmZlciBpbnN0YW5jZS4gVGhlIGFjdHVhbCB0eXBlIGlzIHRoYXQgZXhwb3J0ZWQgYnkgbm9kZSdzIHR5cGluZ3MuXG4gKiBAaW50ZXJmYWNlIEJ1ZmZlclxuICogQGV4dGVuZHMgVWludDhBcnJheVxuICovXG5cbi8qKlxuICogTm9kZSdzIEJ1ZmZlciBjbGFzcyBpZiBhdmFpbGFibGUuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8QnVmZmVyPn1cbiAqL1xudXRpbC5CdWZmZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIEJ1ZmZlciA9IHV0aWwuaW5xdWlyZShcImJ1ZmZlclwiKS5CdWZmZXI7XG4gICAgICAgIC8vIHJlZnVzZSB0byB1c2Ugbm9uLW5vZGUgYnVmZmVycyBpZiBub3QgZXhwbGljaXRseSBhc3NpZ25lZCAocGVyZiByZWFzb25zKTpcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5wcm90b3R5cGUudXRmOFdyaXRlID8gQnVmZmVyIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0pKCk7XG5cbi8vIEludGVybmFsIGFsaWFzIG9mIG9yIHBvbHlmdWxsIGZvciBCdWZmZXIuZnJvbS5cbnV0aWwuX0J1ZmZlcl9mcm9tID0gbnVsbDtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZpbGwgZm9yIEJ1ZmZlci5hbGxvY1Vuc2FmZS5cbnV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBidWZmZXIgb2Ygd2hhdGV2ZXIgdHlwZSBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50LlxuICogQHBhcmFtIHtudW1iZXJ8bnVtYmVyW119IFtzaXplT3JBcnJheT0wXSBCdWZmZXIgc2l6ZSBvciBudW1iZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fEJ1ZmZlcn0gQnVmZmVyXG4gKi9cbnV0aWwubmV3QnVmZmVyID0gZnVuY3Rpb24gbmV3QnVmZmVyKHNpemVPckFycmF5KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gdHlwZW9mIHNpemVPckFycmF5ID09PSBcIm51bWJlclwiXG4gICAgICAgID8gdXRpbC5CdWZmZXJcbiAgICAgICAgICAgID8gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiBuZXcgdXRpbC5BcnJheShzaXplT3JBcnJheSlcbiAgICAgICAgOiB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfZnJvbShzaXplT3JBcnJheSlcbiAgICAgICAgICAgIDogdHlwZW9mIFVpbnQ4QXJyYXkgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICA/IHNpemVPckFycmF5XG4gICAgICAgICAgICAgICAgOiBuZXcgVWludDhBcnJheShzaXplT3JBcnJheSk7XG59O1xuXG4vKipcbiAqIEFycmF5IGltcGxlbWVudGF0aW9uIHVzZWQgaW4gdGhlIGJyb3dzZXIuIGBVaW50OEFycmF5YCBpZiBzdXBwb3J0ZWQsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPFVpbnQ4QXJyYXk+fVxuICovXG51dGlsLkFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCIgPyBVaW50OEFycmF5IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDogQXJyYXk7XG5cbi8qKlxuICogQW55IGNvbXBhdGlibGUgTG9uZyBpbnN0YW5jZS5cbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBMb25nIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBsb25nLmpzLlxuICogQGludGVyZmFjZSBMb25nXG4gKiBAcHJvcGVydHkge251bWJlcn0gbG93IExvdyBiaXRzXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGlnaCBIaWdoIGJpdHNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqL1xuXG4vKipcbiAqIExvbmcuanMncyBMb25nIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxMb25nPn1cbiAqL1xudXRpbC5Mb25nID0gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuZGNvZGVJTyAmJiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPLkxvbmdcbiAgICAgICAgIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLkxvbmdcbiAgICAgICAgIHx8IHV0aWwuaW5xdWlyZShcImxvbmdcIik7XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDIgYml0IChgYm9vbGApIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTJSZSA9IC9edHJ1ZXxmYWxzZXwwfDEkLztcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMzIgYml0IChgaW50MzJgIGV0Yy4pIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTMyUmUgPSAvXi0/KD86MHxbMS05XVswLTldKikkLztcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgNjQgYml0IChgaW50NjRgIGV0Yy4pIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTY0UmUgPSAvXig/OltcXFxceDAwLVxcXFx4ZmZdezh9fC0/KD86MHxbMS05XVswLTldKikpJC87XG5cbi8qKlxuICogQ29udmVydHMgYSBudW1iZXIgb3IgbG9uZyB0byBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcbiAqL1xudXRpbC5sb25nVG9IYXNoID0gZnVuY3Rpb24gbG9uZ1RvSGFzaCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICA/IHV0aWwuTG9uZ0JpdHMuZnJvbSh2YWx1ZSkudG9IYXNoKClcbiAgICAgICAgOiB1dGlsLkxvbmdCaXRzLnplcm9IYXNoO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZyB0byBhIGxvbmcgb3IgbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7TG9uZ3xudW1iZXJ9IE9yaWdpbmFsIHZhbHVlXG4gKi9cbnV0aWwubG9uZ0Zyb21IYXNoID0gZnVuY3Rpb24gbG9uZ0Zyb21IYXNoKGhhc2gsIHVuc2lnbmVkKSB7XG4gICAgdmFyIGJpdHMgPSB1dGlsLkxvbmdCaXRzLmZyb21IYXNoKGhhc2gpO1xuICAgIGlmICh1dGlsLkxvbmcpXG4gICAgICAgIHJldHVybiB1dGlsLkxvbmcuZnJvbUJpdHMoYml0cy5sbywgYml0cy5oaSwgdW5zaWduZWQpO1xuICAgIHJldHVybiBiaXRzLnRvTnVtYmVyKEJvb2xlYW4odW5zaWduZWQpKTtcbn07XG5cbi8qKlxuICogTWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBkc3QgRGVzdGluYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBzcmMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBbaWZOb3RTZXQ9ZmFsc2VdIE1lcmdlcyBvbmx5IGlmIHRoZSBrZXkgaXMgbm90IGFscmVhZHkgc2V0XG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IERlc3RpbmF0aW9uIG9iamVjdFxuICovXG5mdW5jdGlvbiBtZXJnZShkc3QsIHNyYywgaWZOb3RTZXQpIHsgLy8gdXNlZCBieSBjb252ZXJ0ZXJzXG4gICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYgKGRzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkIHx8ICFpZk5vdFNldClcbiAgICAgICAgICAgIGRzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICByZXR1cm4gZHN0O1xufVxuXG51dGlsLm1lcmdlID0gbWVyZ2U7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyB0byBsb3dlciBjYXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gQ29udmVydGVkIHN0cmluZ1xuICovXG51dGlsLmxjRmlyc3QgPSBmdW5jdGlvbiBsY0ZpcnN0KHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHIuc3Vic3RyaW5nKDEpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEVycm9yIG5hbWVcbiAqIEByZXR1cm5zIHtDb25zdHJ1Y3RvcjxFcnJvcj59IEN1c3RvbSBlcnJvciBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBuZXdFcnJvcihuYW1lKSB7XG5cbiAgICBmdW5jdGlvbiBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKSB7XG5cbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEN1c3RvbUVycm9yKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRXJyb3IobWVzc2FnZSwgcHJvcGVydGllcyk7XG5cbiAgICAgICAgLy8gRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcbiAgICAgICAgLy8gXiBqdXN0IHJldHVybnMgYSBuZXcgZXJyb3IgaW5zdGFuY2UgYmVjYXVzZSB0aGUgY3RvciBjYW4gYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb25cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtZXNzYWdlXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1lc3NhZ2U7IH0gfSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSAvLyBub2RlXG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDdXN0b21FcnJvcik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0YWNrXCIsIHsgdmFsdWU6IG5ldyBFcnJvcigpLnN0YWNrIHx8IFwiXCIgfSk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBtZXJnZSh0aGlzLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICAoQ3VzdG9tRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEN1c3RvbUVycm9yO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEN1c3RvbUVycm9yLnByb3RvdHlwZSwgXCJuYW1lXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG5hbWU7IH0gfSk7XG5cbiAgICBDdXN0b21FcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiOiBcIiArIHRoaXMubWVzc2FnZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEN1c3RvbUVycm9yO1xufVxuXG51dGlsLm5ld0Vycm9yID0gbmV3RXJyb3I7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBwcm90b2NvbCBlcnJvci5cbiAqIEBjbGFzc2Rlc2MgRXJyb3Igc3ViY2xhc3MgaW5kaWNhdGluZyBhIHByb3RvY29sIHNwZWNpZmMgZXJyb3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQGV4dGVuZHMgRXJyb3JcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBFcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbcHJvcGVydGllc10gQWRkaXRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAZXhhbXBsZVxuICogdHJ5IHtcbiAqICAgICBNeU1lc3NhZ2UuZGVjb2RlKHNvbWVCdWZmZXIpOyAvLyB0aHJvd3MgaWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gKiB9IGNhdGNoIChlKSB7XG4gKiAgICAgaWYgKGUgaW5zdGFuY2VvZiBQcm90b2NvbEVycm9yICYmIGUuaW5zdGFuY2UpXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVjb2RlZCBzbyBmYXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZS5pbnN0YW5jZSkpO1xuICogfVxuICovXG51dGlsLlByb3RvY29sRXJyb3IgPSBuZXdFcnJvcihcIlByb3RvY29sRXJyb3JcIik7XG5cbi8qKlxuICogU28gZmFyIGRlY29kZWQgbWVzc2FnZSBpbnN0YW5jZS5cbiAqIEBuYW1lIHV0aWwuUHJvdG9jb2xFcnJvciNpbnN0YW5jZVxuICogQHR5cGUge01lc3NhZ2U8VD59XG4gKi9cblxuLyoqXG4gKiBBIE9uZU9mIGdldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZkdldHRlcn0uXG4gKiBAdHlwZWRlZiBPbmVPZkdldHRlclxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIGdldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZkdldHRlcn0gVW5ib3VuZCBnZXR0ZXJcbiAqL1xudXRpbC5vbmVPZkdldHRlciA9IGZ1bmN0aW9uIGdldE9uZU9mKGZpZWxkTmFtZXMpIHtcbiAgICB2YXIgZmllbGRNYXAgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIGZpZWxkTWFwW2ZpZWxkTmFtZXNbaV1dID0gMTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBTZXQgZmllbGQgbmFtZSwgaWYgYW55XG4gICAgICogQHRoaXMgT2JqZWN0XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbigpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcyksIGkgPSBrZXlzLmxlbmd0aCAtIDE7IGkgPiAtMTsgLS1pKVxuICAgICAgICAgICAgaWYgKGZpZWxkTWFwW2tleXNbaV1dID09PSAxICYmIHRoaXNba2V5c1tpXV0gIT09IHVuZGVmaW5lZCAmJiB0aGlzW2tleXNbaV1dICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzW2ldO1xuICAgIH07XG59O1xuXG4vKipcbiAqIEEgT25lT2Ygc2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mU2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mU2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHZhbHVlIEZpZWxkIG5hbWVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBzZXR0ZXIgZm9yIGEgb25lb2YncyBwcmVzZW50IGZpZWxkIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXG4gKiBAcmV0dXJucyB7T25lT2ZTZXR0ZXJ9IFVuYm91bmQgc2V0dGVyXG4gKi9cbnV0aWwub25lT2ZTZXR0ZXIgPSBmdW5jdGlvbiBzZXRPbmVPZihmaWVsZE5hbWVzKSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBGaWVsZCBuYW1lXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgaWYgKGZpZWxkTmFtZXNbaV0gIT09IG5hbWUpXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbZmllbGROYW1lc1tpXV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVmYXVsdCBjb252ZXJzaW9uIG9wdGlvbnMgdXNlZCBmb3Ige0BsaW5rIE1lc3NhZ2UjdG9KU09OfSBpbXBsZW1lbnRhdGlvbnMuXG4gKlxuICogVGhlc2Ugb3B0aW9ucyBhcmUgY2xvc2UgdG8gcHJvdG8zJ3MgSlNPTiBtYXBwaW5nIHdpdGggdGhlIGV4Y2VwdGlvbiB0aGF0IGludGVybmFsIHR5cGVzIGxpa2UgQW55IGFyZSBoYW5kbGVkIGp1c3QgbGlrZSBtZXNzYWdlcy4gTW9yZSBwcmVjaXNlbHk6XG4gKlxuICogLSBMb25ncyBiZWNvbWUgc3RyaW5nc1xuICogLSBFbnVtcyBiZWNvbWUgc3RyaW5nIGtleXNcbiAqIC0gQnl0ZXMgYmVjb21lIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqIC0gKFN1Yi0pTWVzc2FnZXMgYmVjb21lIHBsYWluIG9iamVjdHNcbiAqIC0gTWFwcyBiZWNvbWUgcGxhaW4gb2JqZWN0cyB3aXRoIGFsbCBzdHJpbmcga2V5c1xuICogLSBSZXBlYXRlZCBmaWVsZHMgYmVjb21lIGFycmF5c1xuICogLSBOYU4gYW5kIEluZmluaXR5IGZvciBmbG9hdCBhbmQgZG91YmxlIGZpZWxkcyBiZWNvbWUgc3RyaW5nc1xuICpcbiAqIEB0eXBlIHtJQ29udmVyc2lvbk9wdGlvbnN9XG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9wcm90bzM/aGw9ZW4janNvblxuICovXG51dGlsLnRvSlNPTk9wdGlvbnMgPSB7XG4gICAgbG9uZ3M6IFN0cmluZyxcbiAgICBlbnVtczogU3RyaW5nLFxuICAgIGJ5dGVzOiBTdHJpbmcsXG4gICAganNvbjogdHJ1ZVxufTtcblxuLy8gU2V0cyB1cCBidWZmZXIgdXRpbGl0eSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50IChjYWxsZWQgaW4gaW5kZXgtbWluaW1hbClcbnV0aWwuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBCdWZmZXIgPSB1dGlsLkJ1ZmZlcjtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIUJ1ZmZlcikge1xuICAgICAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYmVjYXVzZSBub2RlIDQueCBidWZmZXJzIGFyZSBpbmNvbXBhdGlibGUgJiBpbW11dGFibGVcbiAgICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZUlPL3Byb3RvYnVmLmpzL3B1bGwvNjY1XG4gICAgdXRpbC5fQnVmZmVyX2Zyb20gPSBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tICYmIEJ1ZmZlci5mcm9tIHx8XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZ1bmN0aW9uIEJ1ZmZlcl9mcm9tKHZhbHVlLCBlbmNvZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUsIGVuY29kaW5nKTtcbiAgICAgICAgfTtcbiAgICB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBCdWZmZXIuYWxsb2NVbnNhZmUgfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2FsbG9jVW5zYWZlKHNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyKHNpemUpO1xuICAgICAgICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBXcml0ZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJXcml0ZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICBiYXNlNjQgICAgPSB1dGlsLmJhc2U2NCxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBVaW50OEFycmF5LCBudW1iZXIpfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0geyp9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBPcChmbiwgbGVuLCB2YWwpIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNhbGwuXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9XG4gICAgICovXG4gICAgdGhpcy5mbiA9IGZuO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgYnl0ZSBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IGxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgb3BlcmF0aW9uLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHRvIHdyaXRlLlxuICAgICAqIEB0eXBlIHsqfVxuICAgICAqL1xuICAgIHRoaXMudmFsID0gdmFsOyAvLyB0eXBlIHZhcmllc1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gbm9vcCgpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBzdGF0ZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQ29waWVkIHdyaXRlciBzdGF0ZS5cbiAqIEBtZW1iZXJvZiBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtXcml0ZXJ9IHdyaXRlciBXcml0ZXIgdG8gY29weSBzdGF0ZSBmcm9tXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFN0YXRlKHdyaXRlcikge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBoZWFkLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gd3JpdGVyLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHRhaWwuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB3cml0ZXIudGFpbDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gd3JpdGVyLmxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgc3RhdGUuXG4gICAgICogQHR5cGUge1N0YXRlfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gd3JpdGVyLnN0YXRlcztcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFdyaXRlcigpIHtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSAwO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyBoZWFkLlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyB0YWlsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB0aGlzLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBMaW5rZWQgZm9ya2VkIHN0YXRlcy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuXG4gICAgLy8gV2hlbiBhIHZhbHVlIGlzIHdyaXR0ZW4sIHRoZSB3cml0ZXIgY2FsY3VsYXRlcyBpdHMgYnl0ZSBsZW5ndGggYW5kIHB1dHMgaXQgaW50byBhIGxpbmtlZFxuICAgIC8vIGxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBwZXJmb3JtIHdoZW4gZmluaXNoKCkgaXMgY2FsbGVkLiBUaGlzIGJvdGggYWxsb3dzIHVzIHRvIGFsbG9jYXRlXG4gICAgLy8gYnVmZmVycyBvZiB0aGUgZXhhY3QgcmVxdWlyZWQgc2l6ZSBhbmQgcmVkdWNlcyB0aGUgYW1vdW50IG9mIHdvcmsgd2UgaGF2ZSB0byBkbyBjb21wYXJlZFxuICAgIC8vIHRvIGZpcnN0IGNhbGN1bGF0aW5nIG92ZXIgb2JqZWN0cyBhbmQgdGhlbiBlbmNvZGluZyBvdmVyIG9iamVjdHMuIEluIG91ciBjYXNlLCB0aGUgZW5jb2RpbmdcbiAgICAvLyBwYXJ0IGlzIGp1c3QgYSBsaW5rZWQgbGlzdCB3YWxrIGNhbGxpbmcgb3BlcmF0aW9ucyB3aXRoIGFscmVhZHkgcHJlcGFyZWQgdmFsdWVzLlxufVxuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiB1dGlsLkJ1ZmZlclxuICAgICAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFdyaXRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyV3JpdGVyKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoKTtcbiAgICAgICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB3cml0ZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJXcml0ZXJ8V3JpdGVyfSBBIHtAbGluayBCdWZmZXJXcml0ZXJ9IHdoZW4gQnVmZmVycyBhcmUgc3VwcG9ydGVkLCBvdGhlcndpc2UgYSB7QGxpbmsgV3JpdGVyfVxuICovXG5Xcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG5cbi8qKlxuICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXG4gKi9cbldyaXRlci5hbGxvYyA9IGZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgICByZXR1cm4gbmV3IHV0aWwuQXJyYXkoc2l6ZSk7XG59O1xuXG4vLyBVc2UgVWludDhBcnJheSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlciwganVzdCBsaWtlIG5vZGUgZG9lcyB3aXRoIGJ1ZmZlcnNcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAodXRpbC5BcnJheSAhPT0gQXJyYXkpXG4gICAgV3JpdGVyLmFsbG9jID0gdXRpbC5wb29sKFdyaXRlci5hbGxvYywgdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkpO1xuXG4vKipcbiAqIFB1c2hlcyBhIG5ldyBvcGVyYXRpb24gdG8gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEBwcml2YXRlXG4gKi9cbldyaXRlci5wcm90b3R5cGUuX3B1c2ggPSBmdW5jdGlvbiBwdXNoKGZuLCBsZW4sIHZhbCkge1xuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IE9wKGZuLCBsZW4sIHZhbCk7XG4gICAgdGhpcy5sZW4gKz0gbGVuO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVCeXRlKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zXSA9IHZhbCAmIDI1NTtcbn1cblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQzMih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbCA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwgPj4+PSA3O1xuICAgIH1cbiAgICBidWZbcG9zXSA9IHZhbDtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHZhcmludCB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgdmFyaW50IHdyaXRlciBvcGVyYXRpb24uXG4gKiBAZXh0ZW5kcyBPcFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFZhcmludE9wKGxlbiwgdmFsKSB7XG4gICAgdGhpcy5sZW4gPSBsZW47XG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsID0gdmFsO1xufVxuXG5WYXJpbnRPcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSk7XG5WYXJpbnRPcC5wcm90b3R5cGUuZm4gPSB3cml0ZVZhcmludDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQzMih2YWx1ZSkge1xuICAgIC8vIGhlcmUsIHRoZSBjYWxsIHRvIHRoaXMucHVzaCBoYXMgYmVlbiBpbmxpbmVkIGFuZCBhIHZhcmludCBzcGVjaWZpYyBPcCBzdWJjbGFzcyBpcyB1c2VkLlxuICAgIC8vIHVpbnQzMiBpcyBieSBmYXIgdGhlIG1vc3QgZnJlcXVlbnRseSB1c2VkIG9wZXJhdGlvbiBhbmQgYmVuZWZpdHMgc2lnbmlmaWNhbnRseSBmcm9tIHRoaXMuXG4gICAgdGhpcy5sZW4gKz0gKHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IFZhcmludE9wKFxuICAgICAgICAodmFsdWUgPSB2YWx1ZSA+Pj4gMClcbiAgICAgICAgICAgICAgICA8IDEyOCAgICAgICA/IDFcbiAgICAgICAgOiB2YWx1ZSA8IDE2Mzg0ICAgICA/IDJcbiAgICAgICAgOiB2YWx1ZSA8IDIwOTcxNTIgICA/IDNcbiAgICAgICAgOiB2YWx1ZSA8IDI2ODQzNTQ1NiA/IDRcbiAgICAgICAgOiAgICAgICAgICAgICAgICAgICAgIDUsXG4gICAgdmFsdWUpKS5sZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9pbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA8IDBcbiAgICAgICAgPyB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIDEwLCBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKSkgLy8gMTAgYnl0ZXMgcGVyIHNwZWNcbiAgICAgICAgOiB0aGlzLnVpbnQzMih2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9zaW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKHZhbHVlIDw8IDEgXiB2YWx1ZSA+PiAzMSkgPj4+IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQ2NCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbC5oaSkge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSAodmFsLmxvID4+PiA3IHwgdmFsLmhpIDw8IDI1KSA+Pj4gMDtcbiAgICAgICAgdmFsLmhpID4+Pj0gNztcbiAgICB9XG4gICAgd2hpbGUgKHZhbC5sbyA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSB2YWwubG8gPj4+IDc7XG4gICAgfVxuICAgIGJ1Zltwb3MrK10gPSB2YWwubG87XG59XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmludDY0ID0gV3JpdGVyLnByb3RvdHlwZS51aW50NjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ludDY0ID0gZnVuY3Rpb24gd3JpdGVfc2ludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKS56ekVuY29kZSgpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBib29saXNoIHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHdyaXRlX2Jvb2wodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIHZhbHVlID8gMSA6IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVGaXhlZDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICAmIDI1NTtcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCB2YWx1ZSA+Pj4gMCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IFdyaXRlci5wcm90b3R5cGUuZml4ZWQzMjtcblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0ID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmxvKS5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMuaGkpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDY0ID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0O1xuXG4vKipcbiAqIFdyaXRlcyBhIGZsb2F0ICgzMiBiaXQpLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gd3JpdGVfZmxvYXQodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRmxvYXRMRSwgNCwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gd3JpdGVfZG91YmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2godXRpbC5mbG9hdC53cml0ZURvdWJsZUxFLCA4LCB2YWx1ZSk7XG59O1xuXG52YXIgd3JpdGVCeXRlcyA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnNldFxuICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc19zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzX2Zvcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYnVmW3BvcyArIGldID0gdmFsW2ldO1xuICAgIH07XG5cbi8qKlxuICogV3JpdGVzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMuXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8c3RyaW5nfSB2YWx1ZSBCdWZmZXIgb3IgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAoIWxlbilcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IFdyaXRlci5hbGxvYyhsZW4gPSBiYXNlNjQubGVuZ3RoKHZhbHVlKSk7XG4gICAgICAgIGJhc2U2NC5kZWNvZGUodmFsdWUsIGJ1ZiwgMCk7XG4gICAgICAgIHZhbHVlID0gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy51aW50MzIobGVuKS5fcHVzaCh3cml0ZUJ5dGVzLCBsZW4sIHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmcodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRmOC5sZW5ndGgodmFsdWUpO1xuICAgIHJldHVybiBsZW5cbiAgICAgICAgPyB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHV0Zjgud3JpdGUsIGxlbiwgdmFsdWUpXG4gICAgICAgIDogdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xufTtcblxuLyoqXG4gKiBGb3JrcyB0aGlzIHdyaXRlcidzIHN0YXRlIGJ5IHB1c2hpbmcgaXQgdG8gYSBzdGFjay5cbiAqIENhbGxpbmcge0BsaW5rIFdyaXRlciNyZXNldHxyZXNldH0gb3Ige0BsaW5rIFdyaXRlciNsZGVsaW18bGRlbGltfSByZXNldHMgdGhlIHdyaXRlciB0byB0aGUgcHJldmlvdXMgc3RhdGUuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5mb3JrID0gZnVuY3Rpb24gZm9yaygpIHtcbiAgICB0aGlzLnN0YXRlcyA9IG5ldyBTdGF0ZSh0aGlzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG4gICAgdGhpcy5sZW4gPSAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldHMgdGhpcyBpbnN0YW5jZSB0byB0aGUgbGFzdCBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuaGVhZCAgID0gdGhpcy5zdGF0ZXMuaGVhZDtcbiAgICAgICAgdGhpcy50YWlsICAgPSB0aGlzLnN0YXRlcy50YWlsO1xuICAgICAgICB0aGlzLmxlbiAgICA9IHRoaXMuc3RhdGVzLmxlbjtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICAgICAgdGhpcy5sZW4gID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0byB0aGUgbGFzdCBzdGF0ZSBhbmQgYXBwZW5kcyB0aGUgZm9yayBzdGF0ZSdzIGN1cnJlbnQgd3JpdGUgbGVuZ3RoIGFzIGEgdmFyaW50IGZvbGxvd2VkIGJ5IGl0cyBvcGVyYXRpb25zLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUubGRlbGltID0gZnVuY3Rpb24gbGRlbGltKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLFxuICAgICAgICB0YWlsID0gdGhpcy50YWlsLFxuICAgICAgICBsZW4gID0gdGhpcy5sZW47XG4gICAgdGhpcy5yZXNldCgpLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pIHtcbiAgICAgICAgdGhpcy50YWlsLm5leHQgPSBoZWFkLm5leHQ7IC8vIHNraXAgbm9vcFxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuICAgICAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZC5uZXh0LCAvLyBza2lwIG5vb3BcbiAgICAgICAgYnVmICA9IHRoaXMuY29uc3RydWN0b3IuYWxsb2ModGhpcy5sZW4pLFxuICAgICAgICBwb3MgID0gMDtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgICBoZWFkLmZuKGhlYWQudmFsLCBidWYsIHBvcyk7XG4gICAgICAgIHBvcyArPSBoZWFkLmxlbjtcbiAgICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgLy8gdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICByZXR1cm4gYnVmO1xufTtcblxuV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJXcml0ZXJfKSB7XG4gICAgQnVmZmVyV3JpdGVyID0gQnVmZmVyV3JpdGVyXztcbiAgICBXcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyV3JpdGVyO1xuXG4vLyBleHRlbmRzIFdyaXRlclxudmFyIFdyaXRlciA9IHJlcXVpcmUoXCIuL3dyaXRlclwiKTtcbihCdWZmZXJXcml0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShXcml0ZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJXcml0ZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cbiAqIEBleHRlbmRzIFdyaXRlclxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlcldyaXRlcigpIHtcbiAgICBXcml0ZXIuY2FsbCh0aGlzKTtcbn1cblxuQnVmZmVyV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxuICAgICAqIEByZXR1cm5zIHtCdWZmZXJ9IEJ1ZmZlclxuICAgICAqL1xuICAgIEJ1ZmZlcldyaXRlci5hbGxvYyA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZTtcblxuICAgIEJ1ZmZlcldyaXRlci53cml0ZUJ5dGVzQnVmZmVyID0gdXRpbC5CdWZmZXIgJiYgdXRpbC5CdWZmZXIucHJvdG90eXBlIGluc3RhbmNlb2YgVWludDhBcnJheSAmJiB1dGlsLkJ1ZmZlci5wcm90b3R5cGUuc2V0Lm5hbWUgPT09IFwic2V0XCJcbiAgICAgICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgICAgYnVmLnNldCh2YWwsIHBvcyk7IC8vIGZhc3RlciB0aGFuIGNvcHkgKHJlcXVpcmVzIG5vZGUgPj0gNCB3aGVyZSBCdWZmZXJzIGV4dGVuZCBVaW50OEFycmF5IGFuZCBzZXQgaXMgcHJvcGVybHkgaW5oZXJpdGVkKVxuICAgICAgICAgIC8vIGFsc28gd29ya3MgZm9yIHBsYWluIGFycmF5IHZhbHVlc1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9jb3B5KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgICBpZiAodmFsLmNvcHkpIC8vIEJ1ZmZlciB2YWx1ZXNcbiAgICAgICAgICAgIHZhbC5jb3B5KGJ1ZiwgcG9zLCAwLCB2YWwubGVuZ3RoKTtcbiAgICAgICAgICBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDspIC8vIHBsYWluIGFycmF5IHZhbHVlc1xuICAgICAgICAgICAgYnVmW3BvcysrXSA9IHZhbFtpKytdO1xuICAgICAgICB9O1xufTtcblxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXNfYnVmZmVyKHZhbHVlKSB7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IHV0aWwuX0J1ZmZlcl9mcm9tKHZhbHVlLCBcImJhc2U2NFwiKTtcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xuICAgIHRoaXMudWludDMyKGxlbik7XG4gICAgaWYgKGxlbilcbiAgICAgICAgdGhpcy5fcHVzaChCdWZmZXJXcml0ZXIud3JpdGVCeXRlc0J1ZmZlciwgbGVuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cml0ZVN0cmluZ0J1ZmZlcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgaWYgKHZhbC5sZW5ndGggPCA0MCkgLy8gcGxhaW4ganMgaXMgZmFzdGVyIGZvciBzaG9ydCBzdHJpbmdzIChwcm9iYWJseSBkdWUgdG8gcmVkdW5kYW50IGFzc2VydGlvbnMpXG4gICAgICAgIHV0aWwudXRmOC53cml0ZSh2YWwsIGJ1ZiwgcG9zKTtcbiAgICBlbHNlIGlmIChidWYudXRmOFdyaXRlKVxuICAgICAgICBidWYudXRmOFdyaXRlKHZhbCwgcG9zKTtcbiAgICBlbHNlXG4gICAgICAgIGJ1Zi53cml0ZSh2YWwsIHBvcyk7XG59XG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlcldyaXRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gd3JpdGVfc3RyaW5nX2J1ZmZlcih2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB1dGlsLkJ1ZmZlci5ieXRlTGVuZ3RoKHZhbHVlKTtcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pXG4gICAgICAgIHRoaXMuX3B1c2god3JpdGVTdHJpbmdCdWZmZXIsIGxlbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXG4gKiBAbmFtZSBCdWZmZXJXcml0ZXIjZmluaXNoXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5cbkJ1ZmZlcldyaXRlci5fY29uZmlndXJlKCk7XG4iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gcmVxdWlyZSgnLi4vdGVzdC90ZXN0Jyk7IC8vIHJ1biB0ZXN0LnRzXG5pbXBvcnQgeyBjcmR0cywgbmV0d29yayB9IGZyb20gJ2NvbXBvdmVudHVhbHMtY2xpZW50JztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuLyoqXG4gKiBHZXQgSGVyb2t1IHNlcnZlciBob3N0IFdlYnNvY2tldC5cbiAqL1xudmFyIEhPU1QgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKVxuXG4vKipcbiAqIEdlbmVyYXRlIHV1aWQgZm9yIGVhY2ggY2xpZW50LlxuICovXG5jb25zdCBjbGllbnRfdXVpZCA6IHN0cmluZyA9IHV1aWQoKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDUkRUcycgUnVudGltZSBvbiBlYWNoIGNsaWVudCBhbmQgY3JlYXRlIENSRFRzIChlLmcuIENvdW50ZXJDcmR0KS5cbiAqL1xubGV0IGNsaWVudCA9IG5ldyBjcmR0cy5DcmR0UnVudGltZShuZXcgbmV0d29yay5XZWJTb2NrZXROZXR3b3JrKGNsaWVudF91dWlkLCBIT1NUKSk7XG4vL2xldCBjbGllbnRDb3VudGVyID0gbmV3IGNyZHRzLkNvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGNsaWVudCk7XG5sZXQgY2xpZW50Q291bnRlciA9IG5ldyBjcmR0cy5Db3VudGVyQ3JkdChjbGllbnQsIFwiY291bnRlcklkXCIpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgZXZlbnQgbGlzdGVuZXIgZm9yIENSRFQgYXMgcmVmcmVzaCB0aGUgdmFsdWUgKi9cbmNsaWVudENvdW50ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIkFkZFwiLCBfID0+IHtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59KTtcblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBpbmNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5jcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGluY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgxMDApO1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbn1cblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBkZWNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVjcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGRlY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgtMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8vIC8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2Ygc3luYyB0byBzeW5jaHJvbml6ZSB0aGUgdmFsdWUgKi9cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3luY1wiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbi8vIH1cbiJdLCJzb3VyY2VSb290IjoiIn0=