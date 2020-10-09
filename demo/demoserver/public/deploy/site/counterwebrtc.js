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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/site/counterwebrtc.ts");
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

/***/ "./src/site/counterwebrtc.ts":
/*!***********************************!*\
  !*** ./src/site/counterwebrtc.ts ***!
  \***********************************/
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
let client = new compoventuals_client_1.crdts.CrdtRuntime(new compoventuals_client_1.network.WebRtcNetwork(client_uuid, HOST));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3V0aWxzLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9uZXR3b3JrL2NyZHRfbmV0d29ya19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3dlYnJ0Y19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvcHJvdG9fY29tcGlsZWQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYXNwcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Jhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9ldmVudGVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZmxvYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvaW5xdWlyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9wb29sL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL3V0ZjgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL2luZGV4LW1pbmltYWwuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcm9vdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy9zZXJ2aWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3V0aWwvbG9uZ2JpdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvdXRpbC9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy93cml0ZXJfYnVmZmVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jb3VudGVyd2VicnRjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsNkJBQTZCLG1CQUFPLENBQUMsdURBQWE7QUFDbEQsK0JBQStCLG1CQUFPLENBQUMsMkRBQWU7QUFDdEQsaUM7Ozs7Ozs7Ozs7OztBQ3hCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMseUJBQXlCLG1CQUFPLENBQUMsZ0VBQW1CO0FBQ3BELGdCQUFnQixtQkFBTyxDQUFDLG1EQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLGVBQWU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsaUJBQWlCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7O0FDcFphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx5QkFBeUIsbUJBQU8sQ0FBQyxnRUFBbUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRDs7Ozs7Ozs7Ozs7O0FDdE9hO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxXQUFXLG1CQUFPLENBQUMsK0NBQUc7QUFDdEIsZ0JBQWdCLG1CQUFPLENBQUMsb0RBQVU7QUFDbEMsK0JBQStCLG1CQUFPLENBQUMsbUZBQXdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBDQUEwQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLLElBQUk7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWEsMENBQTBDO0FBQ3ZEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOVVhO0FBQ2I7O0FBRUE7QUFDQTtB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QUFDO0FBQ3hELENBQUM7QUFFRCwwRUFBMEU7QUFDMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUUsQ0FBQyxPQUFPLEdBQUc7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELHNFQUFzRTtBQUN0RSwwREFBMEQ7QUFDMUQsMkRBQTJEO0FBQzNELElBQUkiLCJmaWxlIjoiZGVwbG95L3NpdGUvY291bnRlcndlYnJ0Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NpdGUvY291bnRlcndlYnJ0Yy50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5ldHdvcmsgPSBleHBvcnRzLmNyZHRzID0gdm9pZCAwO1xuZXhwb3J0cy5jcmR0cyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY3JkdHNcIikpO1xuZXhwb3J0cy5uZXR3b3JrID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9uZXR3b3JrXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Md3dSZWdpc3RlciA9IGV4cG9ydHMuTHd3RXZlbnQgPSBleHBvcnRzLkx3d1N0YXRlID0gZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXIgPSBleHBvcnRzLk12ckV2ZW50ID0gZXhwb3J0cy5NdnJFbnRyeSA9IGV4cG9ydHMuR1NldENyZHQgPSBleHBvcnRzLlNldEFkZEV2ZW50ID0gZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gZXhwb3J0cy5NdWx0RXZlbnQgPSBleHBvcnRzLkNvdW50ZXJDcmR0ID0gZXhwb3J0cy5OdW1iZXJTdGF0ZSA9IGV4cG9ydHMuQWRkRXZlbnQgPSB2b2lkIDA7XG5jb25zdCBjcmR0X2NvcmVfMSA9IHJlcXVpcmUoXCIuL2NyZHRfY29yZVwiKTtcbmNvbnN0IHByb3RvX2NvbXBpbGVkXzEgPSByZXF1aXJlKFwiLi4vcHJvdG9fY29tcGlsZWRcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5jbGFzcyBBZGRFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCB0aW1lc3RhbXAsIHZhbHVlQWRkZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlQWRkZWQgPSB2YWx1ZUFkZGVkO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkFkZFwiO1xuICAgIH1cbn1cbmV4cG9ydHMuQWRkRXZlbnQgPSBBZGRFdmVudDtcbmNsYXNzIE51bWJlclN0YXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5OdW1iZXJTdGF0ZSA9IE51bWJlclN0YXRlO1xuLy8gVE9ETzogbWFrZSByZXNldHRhYmxlXG5jbGFzcyBDb3VudGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxWYWx1ZSA9IDApIHtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgbmV3IE51bWJlclN0YXRlKGluaXRpYWxWYWx1ZSkpO1xuICAgIH1cbiAgICBhZGQodG9BZGQpIHtcbiAgICAgICAgaWYgKHRvQWRkICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHByb3RvX2NvbXBpbGVkXzEuQ291bnRlck1lc3NhZ2UuY3JlYXRlKHsgdG9BZGQ6IHRvQWRkIH0pO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuQ291bnRlck1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICAgICAgc3VwZXIuc2VuZChidWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5Db3VudGVyTWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlICs9IGRlY29kZWQudG9BZGQ7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEFkZEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgZGVjb2RlZC50b0FkZCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVjb2RpbmcgZXJyb3I6IFwiICsgZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXF1aXZhbGVudCBhZGQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkKHZhbHVlIC0gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGVyQ3JkdCA9IENvdW50ZXJDcmR0O1xuY2xhc3MgTXVsdEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVNdWx0ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlTXVsdGVkID0gdmFsdWVNdWx0ZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiTXVsdFwiO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdEV2ZW50ID0gTXVsdEV2ZW50O1xuY2xhc3MgTXVsdFJlZ2lzdGVyQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxWYWx1ZSA9IDEpIHtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgbmV3IE51bWJlclN0YXRlKGluaXRpYWxWYWx1ZSkpO1xuICAgIH1cbiAgICBtdWx0KHRvTXVsdCkge1xuICAgICAgICBpZiAodG9NdWx0ICE9PSAxKSB7XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHByb3RvX2NvbXBpbGVkXzEuTXVsdFJlZ2lzdGVyTWVzc2FnZS5jcmVhdGUoeyB0b011bHQ6IHRvTXVsdCB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b19jb21waWxlZF8xLk11bHRSZWdpc3Rlck1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICAgICAgc3VwZXIuc2VuZChidWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5NdWx0UmVnaXN0ZXJNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgKj0gZGVjb2RlZC50b011bHQ7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE11bHRFdmVudCh0aGlzLCB0aW1lc3RhbXAsIGRlY29kZWQudG9NdWx0KSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IG11bHQuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubXVsdCh2YWx1ZSAvIHRoaXMudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdFJlZ2lzdGVyQ3JkdCA9IE11bHRSZWdpc3RlckNyZHQ7XG5jbGFzcyBTZXRBZGRFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCB0aW1lc3RhbXAsIHZhbHVlQWRkZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlQWRkZWQgPSB2YWx1ZUFkZGVkO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIlNldEFkZFwiO1xuICAgIH1cbn1cbmV4cG9ydHMuU2V0QWRkRXZlbnQgPSBTZXRBZGRFdmVudDtcbmNsYXNzIEdTZXRDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogR3Jvdy1vbmx5IHNldCB3aXRoIGVsZW1lbnRzIG9mIHR5cGUgVC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgc3VwcG9ydHMgdHlwZXMgc3RyaW5nLCBudW1iZXIsXG4gICAgICogYW5kIENyZHQuICBzdHJpbmcgYW5kIG51bWJlciB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktdmFsdWUsIGFzIGluIG9yZGluYXJ5IEpTIFNldCdzLCBzbyB0aGF0IGRpZmZlcmVudFxuICAgICAqIGluc3RhbmNlcyBvZiB0aGUgc2FtZSB2YWx1ZSBhcmUgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudFxuICAgICAqIHJlcGxpY2FzKS4gIENyZHQgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXJlZmVyZW5jZSwgYXMgdGhleSB3b3VsZCBiZSBpbiBvcmRpbmFyeSBKUyBzZXQncyxcbiAgICAgKiB3aXRoIHJlcGxpY2FzIG9mIHRoZSBzYW1lIENyZHQgYmVpbmcgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudCByZXBsaWNhcykuXG4gICAgICogT3RoZXIgdHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgY2F1c2UgYW5cbiAgICAgKiBlcnJvciB3aGVuIHlvdSBhdHRlbXB0IHRvIGFkZCB0aGVtOyB1c2UgYSBjdXN0b21cbiAgICAgKiBzZXJpYWxpemVyIGFuZCBkZXNlcmlhbGl6ZXIgaW5zdGVhZCwgYmVpbmdcbiAgICAgKiBhd2FyZSBvZiBKUydzIGNsdW5reSBzZXQgc2VtYW50aWNzIChhbGwgT2JqZWN0c1xuICAgICAqIGFyZSBzdG9yZWQgYnktcmVmZXJlbmNlIG9ubHksIHdoaWxlIG5haXZlXG4gICAgICogc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24sIGUuZy4gd2l0aCBKU09OLFxuICAgICAqIHdpbGwgY3JlYXRlIG5vbi1lcXVhbFxuICAgICAqIGNvcGllcyBvZiBPYmplY3RzIG9uIG90aGVyIHJlcGxpY2FzLFxuICAgICAqIGV2ZW4gaWYgdGhleSBpbnR1aXRpdmVseSBjb3JyZXNwb25kIHRvIHRoZSBcInNhbWVcIlxuICAgICAqIHZhcmlhYmxlLilcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBzZXJpYWxpemUgPSB1dGlsc18xLmRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplciwgZGVzZXJpYWxpemUgPSB1dGlsc18xLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHBhcmVudE9yUnVudGltZSkpIHtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemUgPSBkZXNlcmlhbGl6ZTtcbiAgICB9XG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIC8vIFRPRE86IGlmIHdlIG1ha2UgdGhpcyByZXNldHRhYmxlLCBzZW5kIHZhbHVlc1xuICAgICAgICAvLyBhbnl3YXkgKG9yIG1ha2UgdGhhdCBhbiBvcHRpb24pLlxuICAgICAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLkdTZXRNZXNzYWdlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG9BZGQ6IHRoaXMuc2VyaWFsaXplKHZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5HU2V0TWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmhhcyh2YWx1ZSk7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5HU2V0TWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRlc2VyaWFsaXplKGRlY29kZWQudG9BZGQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBTZXRBZGRFdmVudCh0aGlzLCB0aW1lc3RhbXAsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERvbid0IG11dGF0ZSB0aGlzIGRpcmVjdGx5LlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5HU2V0Q3JkdCA9IEdTZXRDcmR0O1xuY2xhc3MgTXZyRW50cnkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBzZW5kZXIsIGNvdW50ZXIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcbiAgICAgICAgdGhpcy5jb3VudGVyID0gY291bnRlcjtcbiAgICB9XG59XG5leHBvcnRzLk12ckVudHJ5ID0gTXZyRW50cnk7XG5jbGFzcyBNdnJFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCB0aW1lc3RhbXAsIHZhbHVlQWRkZWQsIHZhbHVlc1JlbW92ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlQWRkZWQgPSB2YWx1ZUFkZGVkO1xuICAgICAgICB0aGlzLnZhbHVlc1JlbW92ZWQgPSB2YWx1ZXNSZW1vdmVkO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIk12clwiO1xuICAgIH1cbn1cbmV4cG9ydHMuTXZyRXZlbnQgPSBNdnJFdmVudDtcbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlciBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIE11bHRpLXZhbHVlIHJlZ2lzdGVyIG9mIHR5cGUgVC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgc3VwcG9ydHMgdHlwZXMgc3RyaW5nLCBudW1iZXIsXG4gICAgICogYW5kIENyZHQuICBzdHJpbmcgYW5kIG51bWJlciB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktdmFsdWUsIGFzIGluIG9yZGluYXJ5IEpTIFNldCdzLCBzbyB0aGF0IGRpZmZlcmVudFxuICAgICAqIGluc3RhbmNlcyBvZiB0aGUgc2FtZSB2YWx1ZSBhcmUgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudFxuICAgICAqIHJlcGxpY2FzKS4gIENyZHQgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXJlZmVyZW5jZSwgYXMgdGhleSB3b3VsZCBiZSBpbiBvcmRpbmFyeSBKUyBzZXQncyxcbiAgICAgKiB3aXRoIHJlcGxpY2FzIG9mIHRoZSBzYW1lIENyZHQgYmVpbmcgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudCByZXBsaWNhcykuXG4gICAgICogT3RoZXIgdHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgY2F1c2UgYW5cbiAgICAgKiBlcnJvciB3aGVuIHlvdSBhdHRlbXB0IHRvIGFkZCB0aGVtOyB1c2UgYSBjdXN0b21cbiAgICAgKiBzZXJpYWxpemVyIGFuZCBkZXNlcmlhbGl6ZXIgaW5zdGVhZCwgYmVpbmdcbiAgICAgKiBhd2FyZSBvZiBKUydzIGNsdW5reSBzZXQgc2VtYW50aWNzIChhbGwgT2JqZWN0c1xuICAgICAqIGFyZSBzdG9yZWQgYnktcmVmZXJlbmNlIG9ubHksIHdoaWxlIG5haXZlXG4gICAgICogc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24sIGUuZy4gd2l0aCBKU09OLFxuICAgICAqIHdpbGwgY3JlYXRlIG5vbi1lcXVhbFxuICAgICAqIGNvcGllcyBvZiBPYmplY3RzIG9uIG90aGVyIHJlcGxpY2FzLFxuICAgICAqIGV2ZW4gaWYgdGhleSBpbnR1aXRpdmVseSBjb3JyZXNwb25kIHRvIHRoZSBcInNhbWVcIlxuICAgICAqIHZhcmlhYmxlLilcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsVmFsdWUsIHNlcmlhbGl6ZSA9IHV0aWxzXzEuZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyLCBkZXNlcmlhbGl6ZSA9IHV0aWxzXzEubmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocGFyZW50T3JSdW50aW1lKSkge1xuICAgICAgICBsZXQgaW5pdGlhbFNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gVE9ETzogdXNlIGdlbmVyaWMgd2F5IChydW5Mb2NhbGx5KSwgdG9cbiAgICAgICAgLy8gcmVkdWNlIGNvZGUgZHVwbGljYXRpb24uXG4gICAgICAgIGluaXRpYWxTZXQuYWRkKG5ldyBNdnJFbnRyeShpbml0aWFsVmFsdWUsIG51bGwsIC0xKSk7XG4gICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxTZXQpO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLk12ck1lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b19jb21waWxlZF8xLk12ck1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5NdnJNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZGVzZXJpYWxpemUoZGVjb2RlZC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnNlbmRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5kZWxldGUoZW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQoZW50cnkuc2VuZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZjRW50cnkgIT09IHVuZGVmaW5lZCAmJiB2Y0VudHJ5ID49IGVudHJ5LmNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZGVsZXRlKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQuYWRkKGVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhdGUuYWRkKG5ldyBNdnJFbnRyeSh2YWx1ZSwgdGltZXN0YW1wLmdldFNlbmRlcigpLCB0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpKSk7XG4gICAgICAgICAgICBpZiAocmVtb3ZlZC5zaXplID09PSAxICYmIHJlbW92ZWQuZW50cmllcygpLm5leHQoKS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG5vIGNoYW5nZSB0byBhY3R1YWwgdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvbid0IGRpc3BhdGNoIGlmIHZhbHVlIHN0YXllZCBwdXQ/XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNdnJFdmVudCh0aGlzLCB0aW1lc3RhbXAsIHZhbHVlLCByZW1vdmVkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVjb2RpbmcgZXJyb3I6IFwiICsgZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBjdXJyZW50IHNldCBvZiB2YWx1ZXMsIGkuZS4sIHRoZVxuICAgICAqIHNldCBvZiBub24tb3ZlcndyaXR0ZW4gdmFsdWVzLiAgVGhpcyBtYXkgaGF2ZVxuICAgICAqIG1vcmUgdGhhbiBvbmUgZWxlbWVudCBkdWUgdG8gY29uY3VycmVudCB3cml0ZXMsXG4gICAgICogYnV0IGl0IHdpbGwgbmV2ZXIgaGF2ZSB6ZXJvIGVsZW1lbnRzLiAgKElmIHlvdVxuICAgICAqIHdhbnQgdG8gYWxsb3cgbnVsbC91bmRlZmluZWQgdmFsdWVzLCBpbmNsdWRlXG4gICAgICogdGhhdCBpbiBUJ3MgdHlwZS4pXG4gICAgICovXG4gICAgZ2V0IHZhbHVlU2V0KCkge1xuICAgICAgICBsZXQgdmFsdWVzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnN0YXRlKVxuICAgICAgICAgICAgdmFsdWVzLmFkZChlbnRyeS52YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXIgPSBNdWx0aVZhbHVlUmVnaXN0ZXI7XG5jbGFzcyBMd3dTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHNlbmRlciwgY291bnRlciwgdGltZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSBjb3VudGVyO1xuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgIH1cbn1cbmV4cG9ydHMuTHd3U3RhdGUgPSBMd3dTdGF0ZTtcbmNsYXNzIEx3d0V2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWUsIHRpbWVTZXQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudGltZVNldCA9IHRpbWVTZXQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiTHd3XCI7XG4gICAgfVxufVxuZXhwb3J0cy5Md3dFdmVudCA9IEx3d0V2ZW50O1xuY2xhc3MgTHd3UmVnaXN0ZXIgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBMYXN0LXdyaXRlci13aW5zIChMV1cpIHJlZ2lzdGVyIG9mIHR5cGUgVC4gIFRpZXNcbiAgICAgKiBiZXR3ZWVuIGNvbmN1cnJlbnQgbWVzc2FnZXMgYXJlIGJhc2VkIG9uIFVUQ1xuICAgICAqIHRpbWVzdGFtcHMgKGhvd2V2ZXIsIGEgbWVzc2FnZSB3aWxsIGFsd2F5cyBvdmVyd3JpdGVcbiAgICAgKiBhIGNhdXNhbGx5IHByaW9yIHZhbHVlIHJlZ2FyZGxlc3Mgb2YgdGltZXN0YW1wcykuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIHN1cHBvcnRzIHR5cGVzIHN0cmluZywgbnVtYmVyLFxuICAgICAqIGFuZCBDcmR0LiAgc3RyaW5nIGFuZCBudW1iZXIgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXZhbHVlLCBhcyBpbiBvcmRpbmFyeSBKUyBTZXQncywgc28gdGhhdCBkaWZmZXJlbnRcbiAgICAgKiBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgdmFsdWUgYXJlIGlkZW50aWZpZWRcbiAgICAgKiAoZXZlbiBpZiB0aGV5IGFyZSBhZGRlZCBieSBkaWZmZXJlbnRcbiAgICAgKiByZXBsaWNhcykuICBDcmR0IHR5cGVzIGFyZSBzdG9yZWRcbiAgICAgKiBieS1yZWZlcmVuY2UsIGFzIHRoZXkgd291bGQgYmUgaW4gb3JkaW5hcnkgSlMgc2V0J3MsXG4gICAgICogd2l0aCByZXBsaWNhcyBvZiB0aGUgc2FtZSBDcmR0IGJlaW5nIGlkZW50aWZpZWRcbiAgICAgKiAoZXZlbiBpZiB0aGV5IGFyZSBhZGRlZCBieSBkaWZmZXJlbnQgcmVwbGljYXMpLlxuICAgICAqIE90aGVyIHR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkIGFuZCB3aWxsIGNhdXNlIGFuXG4gICAgICogZXJyb3Igd2hlbiB5b3UgYXR0ZW1wdCB0byBhZGQgdGhlbTsgdXNlIGEgY3VzdG9tXG4gICAgICogc2VyaWFsaXplciBhbmQgZGVzZXJpYWxpemVyIGluc3RlYWQsIGJlaW5nXG4gICAgICogYXdhcmUgb2YgSlMncyBjbHVua3kgc2V0IHNlbWFudGljcyAoYWxsIE9iamVjdHNcbiAgICAgKiBhcmUgc3RvcmVkIGJ5LXJlZmVyZW5jZSBvbmx5LCB3aGlsZSBuYWl2ZVxuICAgICAqIHNlcmlhbGl6YXRpb24vZGVzZXJpYWxpemF0aW9uLCBlLmcuIHdpdGggSlNPTixcbiAgICAgKiB3aWxsIGNyZWF0ZSBub24tZXF1YWxcbiAgICAgKiBjb3BpZXMgb2YgT2JqZWN0cyBvbiBvdGhlciByZXBsaWNhcyxcbiAgICAgKiBldmVuIGlmIHRoZXkgaW50dWl0aXZlbHkgY29ycmVzcG9uZCB0byB0aGUgXCJzYW1lXCJcbiAgICAgKiB2YXJpYWJsZS4pXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlLCBzZXJpYWxpemUgPSB1dGlsc18xLmRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplciwgZGVzZXJpYWxpemUgPSB1dGlsc18xLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHBhcmVudE9yUnVudGltZSkpIHtcbiAgICAgICAgbGV0IGluaXRpYWxTdGF0ZSA9IG5ldyBMd3dTdGF0ZShpbml0aWFsVmFsdWUsIG51bGwsIC0xLCBudWxsKTtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemUgPSBkZXNlcmlhbGl6ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5Md3dNZXNzYWdlLmNyZWF0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zZXJpYWxpemUodmFsdWUpLFxuICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuTHd3TWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgIHN1cGVyLnNlbmQoYnVmZmVyKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLkx3d01lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kZXNlcmlhbGl6ZShkZWNvZGVkLnZhbHVlKTtcbiAgICAgICAgICAgIC8vIFNlZSBpZiBpdCdzIGNhdXNhbGx5IGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgICAgIGxldCBvdmVyd3JpdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNlbmRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIEluaXRpYWwgZWxlbWVudFxuICAgICAgICAgICAgICAgIG92ZXJ3cml0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdmNFbnRyeSA9IHZjLmdldCh0aGlzLnN0YXRlLnNlbmRlcik7XG4gICAgICAgICAgICAgICAgaWYgKHZjRW50cnkgIT09IHVuZGVmaW5lZCAmJiB2Y0VudHJ5ID49IHRoaXMuc3RhdGUuY291bnRlcikge1xuICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGl0J3MgY29uY3VycmVudCwgY29tcGFyZSB0aW1lc3RhbXBzLiAgVXNlXG4gICAgICAgICAgICAvLyBhcmJpdHJhcnkgb3JkZXIgb24gc2VuZGVyIGFzIHRpZWJyZWFrZXIuXG4gICAgICAgICAgICBpZiAoIW92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkZWNvZGVkLnRpbWUgPiB0aGlzLnN0YXRlLnRpbWUpXG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVjb2RlZC50aW1lID09IHRoaXMuc3RhdGUudGltZSkge1xuICAgICAgICAgICAgICAgICAgICBvdmVyd3JpdGUgPSAodGltZXN0YW1wLmdldFNlbmRlcigpID4gdGhpcy5zdGF0ZS5zZW5kZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlZCA9ICh0aGlzLnN0YXRlLnZhbHVlICE9PSB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jb3VudGVyID0gdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlbmRlciA9IHRpbWVzdGFtcC5nZXRTZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRpbWUgPSBkZWNvZGVkLnRpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTHd3RXZlbnQodGhpcywgdGltZXN0YW1wLCB2YWx1ZSwgbmV3IERhdGUoZGVjb2RlZC50aW1lKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVjb2RpbmcgZXJyb3I6IFwiICsgZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkx3d1JlZ2lzdGVyID0gTHd3UmVnaXN0ZXI7XG4vLyBUT0RPOiBtYWtlIGFib3ZlIENyZHRzIG9wdGlvbmFsIHJlc2V0dGFibGUsIHdpdGhcbi8vIHNldHRhYmxlIHJlc2V0IHZhbHVlcyAoZWl0aGVyIGluIGNvbnN0cnVjdG9yIG9yIHZpYVxuLy8gYSBidWlsZGVyIHBhdHRlcm4pLiAgUGVyaGFwcyBtb3JlIGdlbmVyYWxseSwgQ3JkdHNcbi8vIHNob3VsZCBhbGxvdyBhIHJlc2V0IGNhbGxiYWNrLCB0aGF0IGdldHMgcnVuIGxvY2FsbHkgaW5cbi8vIGhhcmRSZXNldCAoY2hlY2sgdGhpcyBpcyBFQykuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNpY19jcmR0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ3JkdFJ1bnRpbWUgPSBleHBvcnRzLkNyZHQgPSB2b2lkIDA7XG5jb25zdCBwcm90b19jb21waWxlZF8xID0gcmVxdWlyZShcIi4uL3Byb3RvX2NvbXBpbGVkXCIpO1xuY2xhc3MgQ3JkdCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhcmVudE9yUnVudGltZSBBIHBhcmVudCBmb3IgdGhpcyBDcmR0LCBlaXRoZXIgYW5vdGhlclxuICAgICAqIENyZHQsIG9yIHRoZSBDcmR0UnVudGltZSBpZiB0aGlzIGhhcyBubyBDcmR0IHBhcmVudC5cbiAgICAgKiBUeXBpY2FsbHkgcGFyZW50IHdpbGwgYmUgdGhlIENyZHQgY29udGFpbmluZyB0aGlzXG4gICAgICogYXMgYW4gaW5zdGFuY2UgdmFyaWFibGUsIG9yIHRoZSBDcmR0UnVudGltZSBpZiB0aGVyZSBpc1xuICAgICAqIG5vIHN1Y2ggQ3JkdC4gIENyZHRzIHdpdGggdGhlIHNhbWUgcGFyZW50IHNoYXJlIGEgY29tbW9uXG4gICAgICogbmFtZXNwYWNlIGFuZCBjYXVzYWwgY29uc2lzdGVuY3kgZ3JvdXAsIGFuZCB0aGUgZGVmYXVsdFxuICAgICAqIHJlc2V0KCkgYmVoYXZpb3IgaXMgdG8gY2FsbCByZXNldCgpIG9uIGVhY2ggY2hpbGQuXG4gICAgICogRGlmZmVyZW50IHJlcGxpY2FzIG9mIGEgQ3JkdCBtdXN0IGJlIGFzc2lnbmVkIHBhcmVudHNcbiAgICAgKiB3aGljaCBhcmUgYWxzbyByZXBsaWNhcyBvZiBlYWNoIG90aGVyLlxuICAgICAqIEBwYXJhbSBpZCAgICAgIEFuIGlkIGZvciB0aGlzIENyZHQuICBBbGwgQ3JkdHMgd2l0aCB0aGVcbiAgICAgKiBzYW1lIHBhcmVudCBtdXN0IGhhdmUgZGlzdGluY3QgaWRzLCBhbmQgdGhlIGlkcyBtdXN0XG4gICAgICogYmUgdGhlIHNhbWUgZm9yIGFsbCByZXBsaWNhcyBvZiBhIGdpdmVuIENSRFQsIGluIG9yZGVyXG4gICAgICogZm9yIHRoZSBDcmR0UnVudGltZSB0byByb3V0ZSBtZXNzYWdlcyB0byB0aGVtIHByb3Blcmx5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIHN0YXRlKSB7XG4gICAgICAgIHRoaXMuaXNDcmR0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5pblJlY2VpdmVJbnRlcm5hbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgaWYgKFwiaXNDcmR0XCIgaW4gcGFyZW50T3JSdW50aW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudE9yUnVudGltZTtcbiAgICAgICAgICAgIHRoaXMucnVudGltZSA9IHRoaXMucGFyZW50LnJ1bnRpbWU7XG4gICAgICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbaWQsIC4uLnRoaXMucGFyZW50LnBhdGhUb1Jvb3RdO1xuICAgICAgICAgICAgdGhpcy5yb290SWQgPSB0aGlzLnBhcmVudC5yb290SWQ7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5yZWdpc3RlckNoaWxkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lID0gcGFyZW50T3JSdW50aW1lO1xuICAgICAgICAgICAgdGhpcy5wYXRoVG9Sb290ID0gW107XG4gICAgICAgICAgICB0aGlzLnJvb3RJZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lLnJlZ2lzdGVyUm9vdCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWdpc3RlckNoaWxkKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc2V0KGNoaWxkLmlkLCBjaGlsZCk7XG4gICAgfVxuICAgIC8vIFRPRE86IHR5cGluZywgb3IgYXQgbGVhc3QgY2hlY2sgdHlwZSBleGlzdHM/XG4gICAgLy8gVE9ETzogYWJpbGl0eSB0byByZW1vdmUgbGlzdGVuZXJzPyAgTG9vayBhdCBob3cgRE9NIGRvZXMgaXQuXG4gICAgLyoqXG4gICAgICogVE9ETzogY29weSBET00gZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtICB0eXBlICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBsaXN0ZW5lciBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICByZWNlaXZlTG9jYWwgPSBmYWxzZSAgSWYgZmFsc2UsIGV2ZW50cyB3aXRoIGlzTG9jYWwgPSB0cnVlXG4gICAgICogYXJlIG5vdCBkZWxpdmVyZWQuXG4gICAgICogQHJldHVybiAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgcmVjZWl2ZUxvY2FsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmdldCh0eXBlKTtcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5zZXQodHlwZSwgbGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5wdXNoKFtsaXN0ZW5lciwgcmVjZWl2ZUxvY2FsXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc3ViY2xhc3Mgc2hvdWxkIGNhbGwgdGhpcyBpbiBhIHJlbW90ZSBtZXRob2RcbiAgICAgKiB3aGVuIGl0IGhhcyBhbiBldmVudFxuICAgICAqIGl0IHdhbnRzIHRvIGRlbGl2ZXIgdG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmdldChldmVudC50eXBlKTtcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgW2xpc3RlbmVyLCByZWNlaXZlTG9jYWxdIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlTG9jYWwgfHwgIWV2ZW50LnRpbWVzdGFtcC5pc0xvY2FsKCkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQodGhpcywgbWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBDYWxsYmFjayB1c2VkIGJ5IENyZHRSdW50aW1lIG9yIGEgcGFyZW50IENyZHQuXG4gICAgICAqIEB0YXJnZXRQYXRoOiB0aGUgdGFyZ2V0IENyZHQncyBpZCBmb2xsb3dlZCBieVxuICAgICAgKiB0aGUgaWRzIG9mIGl0cyBhbmNlc3RvcnMgaW4gYXNjZW5kaW5nIG9yZGVyLFxuICAgICAgKiBleGNsdWRpbmcgdGhlIGN1cnJlbnQgQ3JkdC5cbiAgICAgICogQHBhcmFtIHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIG9mIHRoZSByZWNlaXZlZCBtZXNzYWdlXG4gICAgICAqIEBwYXJhbSBtZXNzYWdlICAgVGhlIHJlY2VpdmVkIG1lc3NhZ2VcbiAgICAgICovXG4gICAgcmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgLy8gVE9ETzogdXNlIChob21lYnJldz8pIGl0ZXJhdG9yIGZvciB0YXJnZXRQYXRoLlxuICAgICAgICAvLyBNYWtlIGl0IGVhc3kgdG8gY29weSBmb3IgbXVsdGlwbGUgdXNlcyAoY29weWluZ1xuICAgICAgICAvLyBpbmRleCBidXQgbm90IHRoZSB1bmRlcmx5aW5nIGFycmF5KS5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRhcmdldFBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBhcmUgdGhlIHRhcmdldFxuICAgICAgICAgICAgY2hhbmdlZCA9IHRoaXMucmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuLmdldCh0YXJnZXRQYXRoW3RhcmdldFBhdGgubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxpdmVyIGVycm9yIHNvbWV3aGVyZSByZWFzb25hYmxlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBjaGlsZDogXCIgKyB0YXJnZXRQYXRoW3RhcmdldFBhdGgubGVuZ3RoIC0gMV0gK1xuICAgICAgICAgICAgICAgICAgICBcIiBpbjogXCIgKyBKU09OLnN0cmluZ2lmeSh0YXJnZXRQYXRoKSArIFwiLCBjaGlsZHJlbjogXCIgKyBKU09OLnN0cmluZ2lmeShbLi4udGhpcy5jaGlsZHJlbi5rZXlzKCldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXRQYXRoLmxlbmd0aC0tO1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRoaXMucmVjZWl2ZUludGVybmFsRm9yQ2hpbGQoY2hpbGQsIHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogY2hhbmdlZCBldmVudFxuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byByZWNlaXZlIG1lc3NhZ2VzIHNlbnQgYnkgc2VuZFxuICAgICAqIG9uIHJlcGxpY2FzIG9mIHRoaXMgY3JkdCAoaW5jbHVkaW5nIHRob3NlIHNlbnRcbiAgICAgKiBsb2NhbGx5KS5cbiAgICAgKiBAcGFyYW0gIHRpbWVzdGFtcCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgbWVzc2FnZSAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBXaGV0aGVyIHRoaXMgQ3JkdCdzIHN0YXRlIHdhcyBjaGFuZ2VkLCBpLmUuLFxuICAgICAqIENyZHRFdmVudCdzIG9mIHR5cGUgXCJDaGFuZ2VcIiBzaG91bGQgYmVcbiAgICAgKiBkaXNwYXRjaGVkLlxuICAgICAqL1xuICAgIHJlY2VpdmVJbnRlcm5hbChfdGltZXN0YW1wLCBfbWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNlaXZlZCBhIG1lc3NhZ2UgYnV0IHJlY2VpdmVJbnRlcm5hbCBpcyBub3Qgb3ZlcnJpZGRlblwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyB0byByZWNlaXZlIG1lc3NhZ2VzIHNlbnQgYnkgc2VuZFxuICAgICAqIG9uIGNoaWxkcmVuIG9mIHRoaXMgQ3JkdC5cbiAgICAgKiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyB0byBwYXNzIHRoZVxuICAgICAqIG1lc3NhZ2UgdG8gY2hpbGQgdW5jaGFuZ2VkLCBieVxuICAgICAqIGNhbGxpbmcgY2hpbGQucmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpLlxuICAgICAqIEBwYXJhbSBjaGlsZCBUaGUgY2hpbGRcbiAgICAgKiBAcGFyYW0gIHRhcmdldFBhdGggVGhlIHRhcmdldFBhdGggdGhhdCB3b3VsZCBub3JtYWxseVxuICAgICAqIGJlIGRlbGl2ZXJlZCB0byB0aGUgY2hpbGQsIGkuZS4sIHRoZSBpZHMgb2YgdGhlIENyZHRzXG4gICAgICogb24gdGhlIHBhdGhcbiAgICAgKiBmcm9tIHRoZSBtZXNzYWdlJ3MgdWx0aW1hdGUgdGFyZ2V0IHRvIGNoaWxkLCBleGNsdWRpbmdcbiAgICAgKiBjaGlsZC5cbiAgICAgKiBAcGFyYW0gIHRpbWVzdGFtcCAgW2Rlc2NyaXB0aW9uXVxuICAgICAqIEBwYXJhbSAgbWVzc2FnZSAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHJldHVybiBXaGV0aGVyIHRoaXMgQ3JkdCdzIHN0YXRlIHdhcyBjaGFuZ2VkLCBpLmUuLFxuICAgICAqIGEgQ3JkdEV2ZW50IG9mIHR5cGUgXCJDaGFuZ2VcIiBzaG91bGQgYmVcbiAgICAgKiBkaXNwYXRjaGVkLlxuICAgICAqL1xuICAgIHJlY2VpdmVJbnRlcm5hbEZvckNoaWxkKGNoaWxkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICB9XG59XG5leHBvcnRzLkNyZHQgPSBDcmR0O1xuLy8gVE9ETzogZ2VuZXJpYyBjaGFuZ2UgZXZlbnRzIGZyb20gcmV0dXJuIHZhbHVlc1xuY2xhc3MgQ3JkdFJ1bnRpbWUge1xuICAgIGNvbnN0cnVjdG9yKG5ldHdvcmspIHtcbiAgICAgICAgdGhpcy5uZXR3b3JrID0gbmV0d29yaztcbiAgICAgICAgdGhpcy5yb290Q3JkdHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubmV0d29yay5yZWdpc3Rlcih0aGlzKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJSb290KGNyZHQpIHtcbiAgICAgICAgdGhpcy5yb290Q3JkdHMuc2V0KGNyZHQuaWQsIGNyZHQpO1xuICAgIH1cbiAgICBzZW5kKHNlbmRlciwgbWVzc2FnZSkge1xuICAgICAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5uZXR3b3JrLmdldE5leHRUaW1lc3RhbXAoc2VuZGVyLnJvb3RJZCk7XG4gICAgICAgIC8vIERlbGl2ZXIgdG8gc2VsZlxuICAgICAgICAvLyBUT0RPOiBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGlzLnJvb3RDcmR0cy5nZXQoc2VuZGVyLnJvb3RJZCkucmVjZWl2ZShzZW5kZXIucGF0aFRvUm9vdC5zbGljZSgpLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgICAgICBsZXQgcnVudGltZU1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLkNyZHRSdW50aW1lTWVzc2FnZS5jcmVhdGUoe1xuICAgICAgICAgICAgaW5uZXJNZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgcGF0aFRvUm9vdDogc2VuZGVyLnBhdGhUb1Jvb3RcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b19jb21waWxlZF8xLkNyZHRSdW50aW1lTWVzc2FnZS5lbmNvZGUocnVudGltZU1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLm5ldHdvcmsuc2VuZChzZW5kZXIucm9vdElkLCBidWZmZXIsIHRpbWVzdGFtcCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGZvciBDcmR0TmV0d29yay5cbiAgICAgKi9cbiAgICByZWNlaXZlKGdyb3VwLCBtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5DcmR0UnVudGltZU1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5yb290Q3JkdHMuZ2V0KGdyb3VwKS5yZWNlaXZlKGRlY29kZWQucGF0aFRvUm9vdCwgdGltZXN0YW1wLCBkZWNvZGVkLmlubmVyTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVjb2RpbmcgZXJyb3I6IFwiICsgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXR3b3JrLmdldFJlcGxpY2FJZCgpO1xuICAgIH1cbiAgICBnZXRDcmR0QnlSZWZlcmVuY2Uocm9vdElkLCBwYXRoVG9Sb290KSB7XG4gICAgICAgIC8vIFRPRE86IG9wdGltaXplP1xuICAgICAgICBsZXQgY3VycmVudENyZHQgPSB0aGlzLnJvb3RDcmR0cy5nZXQocm9vdElkKTtcbiAgICAgICAgaWYgKCFjdXJyZW50Q3JkdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biByb290SWQ6IFwiICsgcm9vdElkKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gcGF0aFRvUm9vdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY3VycmVudENyZHQgPSBjdXJyZW50Q3JkdC5jaGlsZHJlbi5nZXQocGF0aFRvUm9vdFtpXSk7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRDcmR0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBjaGlsZDogXCIgKyBwYXRoVG9Sb290W2ldICtcbiAgICAgICAgICAgICAgICAgICAgXCIgYXQgaW5kZXggXCIgKyBpICsgXCIgaW4gcmVmZXJlbmNlOiByb290SWQ9XCIgK1xuICAgICAgICAgICAgICAgICAgICByb290SWQgKyBcIiwgcGF0aFRvUm9vdD1cIiArIHBhdGhUb1Jvb3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50Q3JkdDtcbiAgICB9XG59XG5leHBvcnRzLkNyZHRSdW50aW1lID0gQ3JkdFJ1bnRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X2NvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsc1wiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vanNvbic7XG4vL2V4cG9ydCAqIGZyb20gJy4vbXVsdGlfc2VtaWRpcmVjdCc7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVzZXR0YWJsZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc2VtaWRpcmVjdFwiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vc3RhbmRhcmQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk9wdGlvbmFsUmVzZXR0YWJsZVNlbWlkaXJlY3RQcm9kdWN0ID0gZXhwb3J0cy5PcHRpb25hbFJlc2V0dGFibGVDcmR0ID0gZXhwb3J0cy5SZXNldFdyYXBwZXJDcmR0ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuY2xhc3MgUmVzZXRDb21wb25lbnRNZXNzYWdlIGV4dGVuZHMgVWludDhBcnJheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuaXNSZXNldENvbXBvbmVudE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxheSA9IFtdO1xuICAgIH1cbn1cbmNsYXNzIFJlc2V0Q29tcG9uZW50IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBpZCwgdGFyZ2V0Q3JkdCkge1xuICAgICAgICBzdXBlcihwYXJlbnQsIGlkLCBudWxsKTtcbiAgICAgICAgdGhpcy50YXJnZXRDcmR0ID0gdGFyZ2V0Q3JkdDtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHN1cGVyLnNlbmQobmV3IFVpbnQ4QXJyYXkoKSk7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy50YXJnZXRDcmR0LmhhcmRSZXNldCgpO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaFJlc2V0RXZlbnQodGltZXN0YW1wKTtcbiAgICAgICAgaWYgKFwiaXNSZXNldENvbXBvbmVudE1lc3NhZ2VcIiBpbiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAvLyBSZXBsYXkgbWVzc2FnZS5yZXBsYXlcbiAgICAgICAgICAgIGZvciAobGV0IHRvUmVwbGF5IG9mIG1lc3NhZ2UucmVwbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRDcmR0LnJlY2VpdmUoLi4udG9SZXBsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc2V0V3JhcHBlckNyZHQgZXh0ZW5kcyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdFByb2R1Y3Qge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCB0cnVlLCB0cnVlLCBrZWVwT25seU1heGltYWwpO1xuICAgIH1cbiAgICBzZXR1cFJlc2V0KHRhcmdldENyZHQpIHtcbiAgICAgICAgdGhpcy5yZXNldENvbXBvbmVudCA9IG5ldyBSZXNldENvbXBvbmVudCh0aGlzLCB0aGlzLmlkICsgXCJfY29tcFwiLCB0YXJnZXRDcmR0KTtcbiAgICAgICAgc3VwZXIuc2V0dXAodGhpcy5yZXNldENvbXBvbmVudCwgdGFyZ2V0Q3JkdCwgdGhpcy5hY3Rpb24uYmluZCh0aGlzKSwgdGFyZ2V0Q3JkdC5zdGF0ZSk7XG4gICAgfVxuICAgIGFjdGlvbihtMlRhcmdldFBhdGgsIG0yVGltZXN0YW1wLCBtMk1lc3NhZ2UsIG0xVGFyZ2V0UGF0aCwgX20xVGltZXN0YW1wLCBtMU1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCEoXCJpc1Jlc2V0Q29tcG9uZW50TWVzc2FnZVwiIGluIG0xTWVzc2FnZSkpIHtcbiAgICAgICAgICAgIG0xTWVzc2FnZSA9IG5ldyBSZXNldENvbXBvbmVudE1lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBtMU1lc3NhZ2UucmVwbGF5LnB1c2goW20yVGFyZ2V0UGF0aC5zbGljZSgpLCBtMlRpbWVzdGFtcCwgbTJNZXNzYWdlXSk7XG4gICAgICAgIHJldHVybiBbbTFUYXJnZXRQYXRoLCBtMU1lc3NhZ2VdO1xuICAgIH1cbiAgICBkaXNwYXRjaFJlc2V0RXZlbnQodGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICBjYWxsZXI6IHRoaXMsXG4gICAgICAgICAgICB0eXBlOiBcIlJlc2V0XCIsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDb21wb25lbnQucmVzZXQoKTtcbiAgICB9XG59XG5leHBvcnRzLlJlc2V0V3JhcHBlckNyZHQgPSBSZXNldFdyYXBwZXJDcmR0O1xuY2xhc3MgT3B0aW9uYWxSZXNldHRhYmxlQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsU3RhdGUsIHJlc2V0dGFibGUgPSB0cnVlLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICBpZiAocmVzZXR0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHJlc2V0V3JhcHBlckNyZHQgPSBuZXcgUmVzZXRXcmFwcGVyQ3JkdChwYXJlbnRPclJ1bnRpbWUsIGlkICsgXCJfcmVzZXRcIiwga2VlcE9ubHlNYXhpbWFsKTtcbiAgICAgICAgICAgIHN1cGVyKHJlc2V0V3JhcHBlckNyZHQsIGlkLCBpbml0aWFsU3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFdyYXBwZXJDcmR0ID0gcmVzZXRXcmFwcGVyQ3JkdDtcbiAgICAgICAgICAgIHJlc2V0V3JhcHBlckNyZHQuc2V0dXBSZXNldCh0aGlzKTtcbiAgICAgICAgICAgIHJlc2V0V3JhcHBlckNyZHQuYWRkRXZlbnRMaXN0ZW5lcihcIlJlc2V0XCIsIChldmVudCkgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgICBjYWxsZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGV2ZW50LnRpbWVzdGFtcFxuICAgICAgICAgICAgfSksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxTdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXR0YWJsZSA9IHJlc2V0dGFibGU7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5yZXNldHRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0V3JhcHBlckNyZHQucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlc2V0KCkgY2FsbGVkIGJ1dCByZXNldHRhYmxlIGlzIGZhbHNlXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5PcHRpb25hbFJlc2V0dGFibGVDcmR0ID0gT3B0aW9uYWxSZXNldHRhYmxlQ3JkdDtcbmNsYXNzIE9wdGlvbmFsUmVzZXR0YWJsZVNlbWlkaXJlY3RQcm9kdWN0IGV4dGVuZHMgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RQcm9kdWN0IHtcbiAgICAvKipcbiAgICAgKiBGb3IgbW9yZSBwYXJhbWV0ZXIgZGVzY3JpcHRpb25zLCBzZWVcbiAgICAgKiBTZW1pZGlyZWN0UHJvZHVjdC5cbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgcmVzZXR0YWJsZSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UsIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSwgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChyZXNldHRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgcmVzZXRXcmFwcGVyQ3JkdCA9IG5ldyBSZXNldFdyYXBwZXJDcmR0KHBhcmVudE9yUnVudGltZSwgaWQgKyBcIl9yZXNldFwiLCBrZWVwT25seU1heGltYWwpO1xuICAgICAgICAgICAgc3VwZXIocmVzZXRXcmFwcGVyQ3JkdCwgaWQsIGhpc3RvcnlUaW1lc3RhbXBzLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0V3JhcHBlckNyZHQgPSByZXNldFdyYXBwZXJDcmR0O1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5zZXR1cFJlc2V0KHRoaXMpO1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5hZGRFdmVudExpc3RlbmVyKFwiUmVzZXRcIiwgKGV2ZW50KSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICAgIGNhbGxlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZXZlbnQudGltZXN0YW1wXG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICAgICAgdGhpcy5yZXNldHRhYmxlID0gcmVzZXR0YWJsZTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0V3JhcHBlckNyZHQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcmRSZXNldCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5oYXJkUmVzZXQoKTtcbiAgICAgICAgdGhpcy5oYXJkUmVzZXRJbnRlcm5hbCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuT3B0aW9uYWxSZXNldHRhYmxlU2VtaWRpcmVjdFByb2R1Y3QgPSBPcHRpb25hbFJlc2V0dGFibGVTZW1pZGlyZWN0UHJvZHVjdDtcbi8vIFRPRE86IHJlc2V0IHdpbnM/XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNldHRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZW1pZGlyZWN0UHJvZHVjdCA9IGV4cG9ydHMuU2VtaWRpcmVjdFN0YXRlID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jbGFzcyBTdG9yZWRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZW5kZXJDb3VudGVyLCByZWNlaXB0Q291bnRlciwgdGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2VuZGVyQ291bnRlciA9IHNlbmRlckNvdW50ZXI7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSByZWNlaXB0Q291bnRlcjtcbiAgICAgICAgdGhpcy50YXJnZXRQYXRoID0gdGFyZ2V0UGF0aDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxufVxuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmNsYXNzIFNlbWlkaXJlY3RTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMgPSBoaXN0b3J5VGltZXN0YW1wcztcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIEtlZXAgaW4gbWluZCB0aGF0IHBlci1zZW5kZXIgbWVzc2FnZVxuICAgICAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gcm9vdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChuZXcgU3RvcmVkTWVzc2FnZSh0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpLCB0aGlzLnJlY2VpcHRDb3VudGVyLCB0YXJnZXRQYXRoLCAodGhpcy5oaXN0b3J5VGltZXN0YW1wcyA/IHRpbWVzdGFtcCA6IG51bGwpLCBtZXNzYWdlKSk7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIrKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHRydWUsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc3BlY2lmaWVkIGFjdGlvbnMgb24gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5OlxuICAgICAqIC0gaWYgcmV0dXJuQ29uY3VycmVudCBpcyB0cnVlLCByZXR1cm5zIHRoZSBsaXN0IG9mXG4gICAgICogYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGltZXN0YW1wLCBpblxuICAgICAqIHJlY2VpcHQgb3JkZXIuXG4gICAgICogLSBpZiBkaXNjYXJkRG9taW5hdGVkIGlzIHRydWUsIGRlbGV0ZXMgYWxsIG1lc3NhZ2VzIGZyb21cbiAgICAgKiB0aGUgaGlzdG9yeSB3aG9zZSB0aW1lc3RhbXBzIGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnlcbiAgICAgKiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gdGltZXN0YW1wLiAgKE5vdGUgdGhhdCB0aGlzIG1lYW5zIHRoYXRcbiAgICAgKiBpZiB3ZSB3YW50IHRvIGtlZXAgYSBtZXNzYWdlIHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcCBpblxuICAgICAqIHRoZSBoaXN0b3J5LCBpdCBtdXN0IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IGFmdGVyIGNhbGxpbmdcbiAgICAgKiB0aGlzIG1ldGhvZC4pXG4gICAgICovXG4gICAgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudCwgZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPSBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYS5yZWNlaXB0Q291bnRlciAtIGIucmVjZWlwdENvdW50ZXIpKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCkge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBoYXJkUmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIHdvcmtpbmcgd2l0aCB0aGUgcGVyLXNlbmRlciBoaXN0b3J5XG4gICAgICogYXJyYXlzLiAgUmV0dXJucyB0aGUgaW5kZXggYWZ0ZXIgdGhlIGxhc3QgZW50cnkgd2hvc2VcbiAgICAgKiBwZXItc2VuZGVyIGNvdW50ZXIgKHRoZSBmaXJzdCB0dXBsZSBlbGVtZW50KSBpcyA8PVxuICAgICAqIHZhbHVlLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmRleEFmdGVyKHNwYXJzZUFycmF5LCB2YWx1ZSkge1xuICAgICAgICAvLyBUT0RPOiBiaW5hcnkgc2VhcmNoIHdoZW4gc3BhcnNlQXJyYXkgaXMgbGFyZ2VcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZXJlIG1heSBiZSBkdXBsaWNhdGUgdGltZXN0YW1wcy5cbiAgICAgICAgLy8gU28gaXQgd291bGQgYmUgaW5hcHByb3ByaWF0ZSB0byBmaW5kIGFuIGVudHJ5IHdob3NlXG4gICAgICAgIC8vIHBlci1zZW5kZXIgY291bnRlciBlcXVhbHMgdmFsdWUgYW5kIGluZmVyIHRoYXRcbiAgICAgICAgLy8gdGhlIGRlc2lyZWQgaW5kZXggaXMgMSBncmVhdGVyLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYXJzZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3BhcnNlQXJyYXlbaV0uc2VuZGVyQ291bnRlciA+IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSBTZW1pZGlyZWN0U3RhdGU7XG5jbGFzcyBTZW1pZGlyZWN0UHJvZHVjdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgU2VtaWRpcmVjdFN0YXRlKGhpc3RvcnlUaW1lc3RhbXBzLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCkpO1xuICAgIH1cbiAgICBzZXR1cChjcmR0MSwgY3JkdDIsIGFjdGlvbiwgaW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4uZ2V0KGNyZHQxLmlkKSAhPT0gY3JkdDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZHQxIChcIiArIGNyZHQxLmlkICsgXCIpIGlzIG5vdCBvdXIgY2hpbGRcIiArXG4gICAgICAgICAgICAgICAgXCIgKGlzIGl0IHVzaW5nIGEgd3JhcHBlciBjcmR0LCBlLmcuLCBiZWN1YXNlIHJlc2V0dGFibGUgPSB0cnVlPylcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4uZ2V0KGNyZHQyLmlkKSAhPT0gY3JkdDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZHQyIChcIiArIGNyZHQyLmlkICsgXCIpIGlzIG5vdCBvdXIgY2hpbGRcIiArXG4gICAgICAgICAgICAgICAgXCIgKGlzIGl0IHVzaW5nIGEgd3JhcHBlciBjcmR0LCBlLmcuLCBiZWN1YXNlIHJlc2V0dGFibGUgPSB0cnVlPylcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgSWdub3JlIHJlYWRvbmx5XG4gICAgICAgIGNyZHQxLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICAvLyBAdHMtaWdub3JlIElnbm9yZSByZWFkb25seVxuICAgICAgICBjcmR0Mi5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgdGhpcy5hY3Rpb25WYXIgPSBhY3Rpb247XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbEZvckNoaWxkKGNoaWxkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChjaGlsZCkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLmNyZHQyOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWRkKHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGFyZ2V0UGF0aC5zbGljZSgpLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQyLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5jcmR0MTpcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudCA9IHRoaXMuc3RhdGUuZ2V0Q29uY3VycmVudCh0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgbGV0IG1BY3QgPSBbdGFyZ2V0UGF0aCwgbWVzc2FnZV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNhbiB3ZSBhdm9pZCBzZXJpYWxpemluZyBhbmRcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVzZXJpYWxpemluZyBlYWNoIHRpbWU/ICBMaWtlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpdGggUmVzZXRDb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtQWN0T3JOdWxsID0gdGhpcy5hY3Rpb25WYXIoY29uY3VycmVudFtpXS50YXJnZXRQYXRoLCBjb25jdXJyZW50W2ldLnRpbWVzdGFtcCwgY29uY3VycmVudFtpXS5tZXNzYWdlLCBtQWN0WzBdLCB0aW1lc3RhbXAsIG1BY3RbMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobUFjdE9yTnVsbCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgbUFjdCA9IG1BY3RPck51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQxLnJlY2VpdmUobUFjdFswXSwgdGltZXN0YW1wLCBtQWN0WzFdKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gTm90IGludm9sdmVkIHdpdGggc2VtaWRpcmVjdCBwcm9kdWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtaWRpcmVjdFByb2R1Y3QgPSBTZW1pZGlyZWN0UHJvZHVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbWlkaXJlY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyID0gZXhwb3J0cy5kZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIgPSB2b2lkIDA7XG5jb25zdCBwcm90b19jb21waWxlZF8xID0gcmVxdWlyZShcIi4uL3Byb3RvX2NvbXBpbGVkXCIpO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG4vKipcbiAqIFNlcmlhbGl6ZXIgZm9yIHN0cmluZywgbnVtYmVyLCBhbmQgQ3JkdCB0eXBlcy5cbiAqIHN0cmluZyBhbmQgbnVtYmVyIHR5cGVzIGFyZSBwYXNzZWQgYnktdmFsdWUuXG4gKiBDcmR0IHR5cGVzIGFyZSBzZW50IGJ5LXJlZmVyZW5jZSwgdXNpbmcgdGhlIENyZHQnc1xuICogcm9vdElkIGFuZCBwYXRoVG9Sb290IHRvIGlkZW50aWZ5IGRpZmZlcmVudCByZXBsaWNhc1xuICogb2YgdGhlIHNhbWUgQ3JkdC4gIE90aGVyIHR5cGVzIGNhdXNlIGFuIGVycm9yLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIodmFsdWUpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICBtZXNzYWdlID0geyBzdHJpbmdWYWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICBtZXNzYWdlID0geyBudW1iZXJWYWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgY3JkdF9jb3JlXzEuQ3JkdCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZHRWYWx1ZTogcHJvdG9fY29tcGlsZWRfMS5DcmR0UmVmZXJlbmNlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICByb290SWQ6IHZhbHVlLnJvb3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhUb1Jvb3Q6IHZhbHVlLnBhdGhUb1Jvb3RcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyIG9ubHkgd29ya3Mgd2l0aCB2YWx1ZXMgb2YgdHlwZSBzdHJpbmcgfCBudW1iZXIgfCBDcmR0XCIpO1xuICAgICAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvdG9fY29tcGlsZWRfMS5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xufVxuZXhwb3J0cy5kZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIgPSBkZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXI7XG4vKipcbiAqIFJldHVybnMgYSBkZXNlcmlhbGl6ZXIgZm9yIHN0cmluZywgbnVtYmVyLCBhbmQgQ3JkdCB0eXBlcy5cbiAqIHN0cmluZyBhbmQgbnVtYmVyIHR5cGVzIGFyZSBwYXNzZWQgYnktdmFsdWUuXG4gKiBDcmR0IHR5cGVzIGFyZSBzZW50IGJ5LXJlZmVyZW5jZSwgdXNpbmcgdGhlIENyZHQnc1xuICogcm9vdElkIGFuZCBwYXRoVG9Sb290IHRvIGlkZW50aWZ5IGRpZmZlcmVudCByZXBsaWNhc1xuICogb2YgdGhlIHNhbWUgQ3JkdC4gIE90aGVyIHR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkLlxuICovXG5mdW5jdGlvbiBuZXdEZWZhdWx0Q29sbGVjdGlvbkRlc2VyaWFsaXplcihwYXJlbnRPclJ1bnRpbWUpIHtcbiAgICBsZXQgcnVudGltZTtcbiAgICBpZiAoXCJpc0NyZHRcIiBpbiBwYXJlbnRPclJ1bnRpbWUpXG4gICAgICAgIHJ1bnRpbWUgPSBwYXJlbnRPclJ1bnRpbWUucnVudGltZTtcbiAgICBlbHNlXG4gICAgICAgIHJ1bnRpbWUgPSBwYXJlbnRPclJ1bnRpbWU7XG4gICAgLy8gVE9ETzogaG93IHRvIGVycm9yIGlmIGl0J3Mgbm90IGFjdHVhbGx5IFQ/XG4gICAgcmV0dXJuIChtZXNzYWdlKSA9PiBkZWZhdWx0Q29sbGVjdGlvbkRlc2VyaWFsaXplcihydW50aW1lLCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMubmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIgPSBuZXdEZWZhdWx0Q29sbGVjdGlvbkRlc2VyaWFsaXplcjtcbmZ1bmN0aW9uIGRlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHJ1bnRpbWUsIG1lc3NhZ2UpIHtcbiAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICBzd2l0Y2ggKGRlY29kZWQudmFsdWUpIHtcbiAgICAgICAgY2FzZSBcInN0cmluZ1ZhbHVlXCI6XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlZC5zdHJpbmdWYWx1ZTtcbiAgICAgICAgY2FzZSBcIm51bWJlclZhbHVlXCI6XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlZC5udW1iZXJWYWx1ZTtcbiAgICAgICAgY2FzZSBcImNyZHRWYWx1ZVwiOlxuICAgICAgICAgICAgcmV0dXJuIHJ1bnRpbWUuZ2V0Q3JkdEJ5UmVmZXJlbmNlKGRlY29kZWQuY3JkdFZhbHVlLnJvb3RJZCwgZGVjb2RlZC5jcmR0VmFsdWUucGF0aFRvUm9vdCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgbWVzc2FnZSBmb3JtYXQ6IGRlY29kZWQudmFsdWU9XCIgKyBkZWNvZGVkLnZhbHVlKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8vIEZpcnN0IGF0dGVtcHQgYXQgdGhlIGludGVyZmFjZSBiZXR3ZWVuIHRoZSBydW50aW1lXG4vLyAoY2F1c2FsIGJyb2FkY2FzdCBuZXR3b3JrLCBldGMuKSBhbmQgdGhlIENyZHRzLlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9uZXR3b3JrX2ludGVyZmFjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV2ViU29ja2V0TmV0d29yayA9IGV4cG9ydHMubXlNZXNzYWdlID0gdm9pZCAwO1xuY29uc3QgXzEgPSByZXF1aXJlKFwiLlwiKTtcbi8vIGltcG9ydCBXZWJTb2NrZXQgPSByZXF1aXJlKFwid3NcIik7XG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5jbGFzcyBteU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGdyb3VwLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqIFRPRE86IHVzZSBwcm90b2J1ZnMuICBGb3Igbm93IHdlIGJhc2U2NCBlbmNvZGUgdGhlXG4gICAgICogaW5uZXIgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHBhY2thZ2UgaW5mbyBpbiBKU09OIGZvcm1hdC5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IFwibWVzc2FnZVwiOiBBcnJheS5mcm9tKHRoaXMubWVzc2FnZS52YWx1ZXMoKSksXG4gICAgICAgICAgICBcImdyb3VwXCI6IHRoaXMuZ3JvdXAsXG4gICAgICAgICAgICBcInRpbWVzdGFtcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJ1aWRcIjogdGhpcy50aW1lc3RhbXAudWlkLFxuICAgICAgICAgICAgICAgIFwidmVjdG9yTWFwXCI6IEFycmF5LmZyb20odGhpcy50aW1lc3RhbXAudmVjdG9yTWFwLmVudHJpZXMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5teU1lc3NhZ2UgPSBteU1lc3NhZ2U7XG4vKipcbiAqIFdlYlNvY2tldE5ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgYnJvYWRjYXN0IHNlcnZlciB3aXRoIFdlYlNvY2tldCBwcm90b2NvbC5cbiAqXG4gKiBQZXJmb3JtIGNhc3VhbGl0eSBjaGVjayB0byBlbnN1cmUgbWVzc2FnZSBvcmRlcmluZy5cbiAqL1xuY2xhc3MgV2ViU29ja2V0TmV0d29yayB7XG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCB3ZWJTb2NrZXRBcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAgICAgKiBJZiB0aGVyZSBleGlzdCwgdGhlbiBzZW5kIGl0IHZpYSBXZWJTb2NrZXQgYW5kIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGJ1ZmZlci5cbiAgICAgICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIC8vIFVzZSBoZWFydGJlYXQgdG8ga2VlcCBjbGllbnQgYWxpdmUuXG4gICAgICAgICAgICAvLyB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlIGhlYXJ0YmVhdCBmdW5jdGlvbiB0byBrZWVwIGNsaWVudHMgYWxpdmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRPRE86XG4gICAgICAgICAqIFRoZSBtZXNzYWdlIHNlbmRpbmcgdG8gc2VydmVyIGlzICdoZWFydGJlYXQnIHJpZ2h0IG5vdy5cbiAgICAgICAgICogVGhlIHRpbWVvdXQgaW50ZXJ2YWwgaXMgc2V0IHRvIDUwMDAgbWlsbGlvbnNlY29uZHMuXG4gICAgICAgICAqL1xuICAgICAgICAvLyBoZWFydGJlYXQoKSA6IHZvaWQge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy53cy5zZW5kKCdoZWFydGJlYXQnKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICAvLyAgICAgfSwgNTAwMCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayBpbnRvIG15TWVzc2FnZSB0eXBlLlxuICAgICAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYWxsIHRoZSBtZXNzYWdlcyBhbmQgZGVsaXZlciB0byBhcHBsaWNhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihkYXRhLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuZ3JvdXAsIG15UGFja2FnZS50aW1lc3RhbXBdKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZjTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8vIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcigncGluZycsIGZ1bmN0aW9uKHBpbmdNZXNzYWdlKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlIGEgcGluZyA6ICcgKyBwaW5nTWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBDcmR0UnVudGltZSBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRSdW50aW1lXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy5jcmR0UnVudGltZSA9IGNyZHRSdW50aW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGZ1bmN0aW9uIG9uIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrIGxheWVyLCB3aGljaCBjYWxsZWRcbiAgICAgKiBieSBjcmR0J3MgcnVudGltZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRoZSBtZXNzYWdlIGlzIHdyYXBwZWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0aW1lc3RhbXAgKGJhc2ljIHNlbmRlciBub2RlXG4gICAgICogaW5mbyBhbmQgdmVjdG9yIGNsb2NrKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIFdlYlNvY2tldCBhcyBuZXR3b3JrIHRyYW5zbWlzc2lvbiBwcm90b2NvbC5cbiAgICAgKiBVc2luZyBKU09OIGZvcm1hdCBhcyBtZXNzYWdlIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgbm90IE9wZW4sIHRoZW4gYnVmZmVyIHRoZSBtZXNzYWdlIGFuZFxuICAgICAqIHdhaXQgdW50aWwgV2ViU29ja2V0IG9wZW4uXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIE9wZW4sIHRoZW4gc2VuZCBpdCB3aXRoIHdzLnNlbmQoKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncm91cCBBbiBpZGVudGlmaWVyIGZvciB0aGUgZ3JvdXAgdGhhdFxuICAgICAqIHRoaXMgbWVzc2FnZSBzaG91bGQgYmUgYnJvYWRjYXN0IHRvLiAgQSBncm91cFxuICAgICAqIGVuY29tcGFzc2VzIGJvdGggYSBzZXQgb2YgcmVwbGljYXMgYW5kIGEgdW5pdFxuICAgICAqIG9mIGNhdXNhbCBjb25zaXN0ZW5jeSwgaS5lLiwgbWVzc2FnZXMgc2hvdWxkXG4gICAgICogYmUgY2F1c2FsbHkgY29uc2lzdGVudCB3aXRoaW4gYSBncm91cCBidXQgbmVlZFxuICAgICAqIG5vdCBiZSBhY3Jvc3MgZ3JvdXBzLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgKiBAcGFyYW0gdGltZXN0YW1wIFRoZSBDYXVzYWxUaW1lc3RhbXAgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogbGFzdCBjYWxsIHRvIGdldE5leHRUaW1lc3RhbXAoZ3JvdXApLlxuICAgICAqL1xuICAgIHNlbmQoZ3JvdXAsIG1lc3NhZ2UsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGdyb3VwLCB2Yyk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGdyb3VwLCB2Yyk7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIG1lc3NhZ2UgaW50byBKU09OXG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud3Muc2VuZChteVBhY2thZ2UudG9KU09OKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gobXlQYWNrYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBjcmR0SWQgaW4gdGhpcyByZXBsaWNhLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBjcmR0SWQgdGhhdCB3b3VsZCBsaWtlIHRvIHJldHVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdGltZXN0YW1wIHRoYXQgd291bGQgYmUgYXNzaWduZWQgdG8gYSBDUkRUXG4gICAgICogbWVzc2FnZSBzZW50IGJ5IHRoaXMgcmVwbGljYSBhbmQgZ2l2ZW4gY3JkdElkIHJpZ2h0IG5vdy5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldE5leHRUaW1lc3RhbXAoZ3JvdXApIHtcbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2suXG4gICAgICAgIGxldCB2YyA9IHRoaXMudmNNYXAuZ2V0KGdyb3VwKTtcbiAgICAgICAgaWYgKCF2Yykge1xuICAgICAgICAgICAgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIHZjKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAodmMuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lc3RhbXAgb2YgdGhpcyByZXBsaWNhIHdpdGggbmV4dCB2YWx1ZS5cbiAgICAgICAgdmNDb3B5LmluY3JlbWVudCgpO1xuICAgICAgICByZXR1cm4gdmNDb3B5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgdG8gY3VzdG9taXplZCBkYXRhIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSB0cmF2ZWwgdGhyb3VnaCBuZXR3b3JrLlxuICAgICAqIEByZXR1cm5zIHRoZSBjdXN0b21pemVkIGRhdGEgdHlwZSA9PiBteU1lc3NhZ2VcbiAgICAgKi9cbiAgICBwYXJzZUpTT04oZGF0YSkge1xuICAgICAgICBsZXQgZGF0YUpTT04gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2soZGF0YUpTT04udGltZXN0YW1wLnVpZCwgdGhpcy51aWQgPT09IGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IFVpbnQ4QXJyYXkuZnJvbShkYXRhSlNPTi5tZXNzYWdlKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgZGF0YUpTT04uZ3JvdXAsIHZjKTtcbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmdcbiAgICAgKiBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGNoZWNrTWVzc2FnZUJ1ZmZlcigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tZXNzYWdlQnVmZmVyLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdO1xuICAgICAgICAgICAgbGV0IGN1clZlY3RvckNsb2NrID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXTtcbiAgICAgICAgICAgIGxldCBteVZlY3RvckNsb2NrID0gdGhpcy52Y01hcC5nZXQoZ3JvdXApO1xuICAgICAgICAgICAgaWYgKCFteVZlY3RvckNsb2NrKSB7XG4gICAgICAgICAgICAgICAgbXlWZWN0b3JDbG9jayA9IG5ldyBfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIG15VmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15VmVjdG9yQ2xvY2suaXNyZWFkeShjdXJWZWN0b3JDbG9jaykpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBTZW5kIGJhY2sgdGhlIHJlY2VpdmVkIG1lc3NhZ2VzIHRvIGNyZHRSdW50aW1lLlxuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5jcmR0UnVudGltZS5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV0sIHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl0pO1xuICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLldlYlNvY2tldE5ldHdvcmsgPSBXZWJTb2NrZXROZXR3b3JrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9uZXR3b3JrX3J1bnRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldlYlJ0Y05ldHdvcmsgPSB2b2lkIDA7XG5jb25zdCBfMSA9IHJlcXVpcmUoXCIuXCIpO1xuY29uc3QgY3JkdHNfMSA9IHJlcXVpcmUoXCIuLi9jcmR0c1wiKTtcbmNvbnN0IGNyZHRfbmV0d29ya19ydW50aW1lXzEgPSByZXF1aXJlKFwiLi9jcmR0X25ldHdvcmtfcnVudGltZVwiKTtcbi8vIFRoZSB3ZWJydGMgbmV0d29yayBkZXNpZ25lZCBmb3IgYSB0d28td2F5IGludGVyYWN0aXZlXG4vLyBjb21tdW5pY2F0aW9uIHNlc3Npb24gYW1vbmcgdHdvIHVzZXJzIHVzaW5nIFdlYlJ0Yy5cbi8vXG4vLyBBbHNvIGVuc3VyZSB0aGUgb3JkZXIgb2YgZGVsaXZlcnkgd2l0aCBjYXN1YWxpdHkgY2hlY2suXG4vKipcbiAqIFdlYlJ0Y05ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgc2VydmVyIHdpdGggV2ViU29ja2V0IHByb3RvY29sIHRvIGV4Y2hhbmdlIHNpZ25hbHMuXG4gKiBUaGVuIGNyZWF0ZSBjaGFubmVscyBmb3IgcGVlci10by1wZWVyIGNvbW11bmljYXRpb25zIGJ5IHVzaW5nXG4gKiBXZWJSdGNcbiAqXG4gKiBQZXJmb3JtIGNhc3VhbGl0eSBjaGVjayB0byBlbnN1cmUgbWVzc2FnZSBvcmRlcmluZy5cbiAqL1xuY2xhc3MgV2ViUnRjTmV0d29yayB7XG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCB3ZWJTb2NrZXRBcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAgICAgKiBJZiB0aGVyZSBleGlzdCwgdGhlbiBzZW5kIGl0IHZpYSBXZWJTb2NrZXQgYW5kIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGJ1ZmZlci5cbiAgICAgICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZFdlYlNvY2tldERhdGEgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0pO1xuICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChKU09OLnN0cmluZ2lmeSh0aGlzLnNlbmRCdWZmZXJbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUGFyc2UgSlNPTiBmb3JtYXQgc2lnbmFsIG1lc3NhZ2UgYW5kIGNoZWNrIHNpZ25hbCBtZXNzYWdlIHR5cGUuXG4gICAgICAgICAqIEp1bXAgdG8gdGhlIGNvcnJlc3BvbmRpbmcgc2lnbmFsIGhhbmRsZXIgZm9yIGZ1cnRoZXIgc3RlcHMgdG9cbiAgICAgICAgICogYnVpbGQgV2ViUnRjIGNoYW5uZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBtc2cgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29yay5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVjZWl2ZUFjdGlvbiA9IChtc2cpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR290IG1lc3NhZ2VcIiwgbXNnLmRhdGEpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKG1zZy5kYXRhKTtcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJlZ2lzdGVyXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUmVnaXN0ZXIoZGF0YS5zdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNvbm5lY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0KGRhdGEudXNlcnMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwib2ZmZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPZmZlcihkYXRhLm9mZmVyLCBkYXRhLnJlcXVlc3ROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFuc3dlclwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFuc3dlcihkYXRhLmFuc3dlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjYW5kaWRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5kaWRhdGUoZGF0YS5jYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibGVhdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVMZWF2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBpY2VjYW5kaWRhdGUgZXZlbnQgd2hlbiBhbiBSVENJY2VDYW5kaWRhdGUgaGFzIGJlZW5cbiAgICAgICAgICogaWRlbnRpZmllZCBhbmQgYWRkZWQgdG8gdGhlIGxvY2FsIHBlZXIgYnkgYSBjYWxsLlxuICAgICAgICAgKiBTZW5kIHNpZ25hbCBtZXNzYWdlIHRvIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGV2ZW50IEljZSBjYW5kaWRhdGUgZXZlbnQgdGhhdCBzaG91bGQgYmUgaGFuZGxlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oYW5kbGVJY2VDYW5kaWRhdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5jYW5kaWRhdGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImNhbmRpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBlZXJSdGNSZWNlaXZlTWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlY2VpdmVDaGFubmVsID0gZXZlbnQuY2hhbm5lbDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlY2VpdmVDaGFubmVsKTtcbiAgICAgICAgICAgIHJlY2VpdmVDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuZGF0YUNoYW5lbFJlY2VpdmVNc2cpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGFDaGFuZWxSZWNlaXZlTXNnID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcbiAgICAgICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihldmVudC5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5wdXNoKFtteVBhY2thZ2UubWVzc2FnZSwgbXlQYWNrYWdlLmdyb3VwLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWVzc2FnZUJ1ZmZlcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNlbmRXZWJSdGNEYXRhID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgZGF0YSBjaGFubmVsIGlzIG9wZW5cIik7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5kYXRhQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YUJ1ZmZlcltpbmRleF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoYW5uZWwuc2VuZCh0aGlzLmRhdGFCdWZmZXJbaW5kZXhdLnRvSlNPTigpKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRhQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZjTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuZGF0YUJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gXCJcIjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9wZW4gV2ViU29ja2V0IGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXIuXG4gICAgICAgICAqIFJlZ2lzdGVyIEV2ZW50TGlzdGVuZXIgd2l0aCBjb3JyZXNwb25kaW5nIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndzID0gbmV3IFdlYlNvY2tldCh3ZWJTb2NrZXRBcmdzKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgdGhpcy5zZW5kV2ViU29ja2V0RGF0YSk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE9wZW4gV2ViUnRjIHBlZXIgY29ubmVjdGlvbi5cbiAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAqL1xuICAgICAgICBsZXQgY29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIFwiaWNlU2VydmVyc1wiOiBbeyBcInVybHNcIjogXCJzdHVuOnN0dW4yLjEuZ29vZ2xlLmNvbToxOTMwMlwiIH1dXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGVlclJ0YyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihjb25maWd1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5wZWVyUnRjLmFkZEV2ZW50TGlzdGVuZXIoJ2ljZWNhbmRpZGF0ZScsIHRoaXMuaGFuZGxlSWNlQ2FuZGlkYXRlKTtcbiAgICAgICAgdGhpcy5wZWVyUnRjLmFkZEV2ZW50TGlzdGVuZXIoJ2RhdGFjaGFubmVsJywgdGhpcy5wZWVyUnRjUmVjZWl2ZU1lc3NhZ2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIHNpZ25hbCBtZXNzYWdlIGluIEpTT04gZm9ybWF0IGJ5IHVzaW5nIFdlYlNvY2tldFxuICAgICAqXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAqL1xuICAgIHNlbmRTaWduYWxpbmdNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZS53ZWJSdGMgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHJlZ2lzdGVyIHNpZ25hbCBzZW50IGJhY2sgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICogQ2hlY2sgaWYgbG9naW4gc3VjY2Vzc2Z1bGx5IG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdWNjZXNzU3RhdHVzIEEgcmVnaXN0ZXIgc3RhdHVzIHNlbnQgYmFjayBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICovXG4gICAgaGFuZGxlUmVnaXN0ZXIoc3VjY2Vzc1N0YXR1cykge1xuICAgICAgICBpZiAoc3VjY2Vzc1N0YXR1cyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBmYWlsZWQ6IGR1cGxpY2F0ZSBDUkRUIGlkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgc3VjY2Vzc2Z1bGx5IGluIHNlcnZlci5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNvbm5lY3Qgc2lnbmFsIHNlbnQgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICogQ3JlYXRlIGFuIG9mZmVyIGFuZCBzZW5kIGl0IHRvIHRoZSByZXF1ZXN0ZWQgdXNlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VycyBBbiBhcnJheSBvZiB1c2VycyB0aGF0IHNoYXJlZCBhIHNhbWUgQ1JEVHMuXG4gICAgICovXG4gICAgaGFuZGxlQ29ubmVjdCh1c2Vycykge1xuICAgICAgICAvLyBUaGlzIGxvb3AgaXMgdG8gY2hlY2sgdGhlIGNvcnJlY3QgdXNlciB0byBjb25uZWN0LlxuICAgICAgICAvLyBEZXNpZ24gZm9yIHRoZSBtdWx0aXBsZSB1c2Vycy5cbiAgICAgICAgLy8gVE9ETzogQ29tcGxldGUgbXVsdGlwbGUgdXNlcnMgY29ubmVjdGlvbiBidWlsdC5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgdXNlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodXNlcnNbaW5kZXhdICE9IHRoaXMudWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyTmFtZSA9IHVzZXJzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3JlYXRlIGFuIG9mZmVyIHRvIGJ1aWxkIFdlYlJ0YyBjb25uZWN0aW9uLlxuICAgICAgICAvLyBTZXQgb2ZmZXIgYXMgdGhlIGxvY2FsIGRlc2NyaXRpb24uXG4gICAgICAgIHRoaXMucGVlclJ0Yy5jcmVhdGVPZmZlcigpLnRoZW4oKG9mZmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRTaWduYWxpbmdNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9mZmVyXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICBvZmZlcjogb2ZmZXIsXG4gICAgICAgICAgICAgICAgcmVxdWVzdE5hbWU6IHRoaXMudWlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGVlclJ0Yy5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBvZmZlciBzaWduYWwgc2VudCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICogQ3JlYXRlIGFuIGFuc3dlciBhcyBhIHJlc3BvbnNlIGFuZCBzZW5kIHRoZSBhbnN3ZXIgdG8gdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZlciBUaGUgb2ZmZXIgcmVjZWl2ZWQgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgYSB1c2VyIHdobyBzZW5kcyB0aGlzIG9mZmVyLlxuICAgICAqL1xuICAgIGhhbmRsZU9mZmVyKG9mZmVyLCBuYW1lKSB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnBlZXJSdGMuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihvZmZlcikpO1xuICAgICAgICB0aGlzLnBlZXJSdGMuY3JlYXRlQW5zd2VyKCkudGhlbigoYW5zd2VyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRTaWduYWxpbmdNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFuc3dlclwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMudXNlck5hbWUsXG4gICAgICAgICAgICAgICAgYW5zd2VyOiBhbnN3ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wZWVyUnRjLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW5zd2VyIHNpZ25hbCBzZW50IGZyb20gdGhlIGNlbnRyYWwgc2VydmVyLlxuICAgICAqIFNldHVwIHJlbW90ZSBkZXNjcmlwdGlvbiBieSB1c2luZyB0aGUgYW5zd2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFuc3dlciBUaGUgYW5zd2VyIHJlY2VpdmVkIGZyb20gdGhlIGNlbnRyYWwgc2VydmVyLlxuICAgICAqL1xuICAgIGhhbmRsZUFuc3dlcihhbnN3ZXIpIHtcbiAgICAgICAgdGhpcy5wZWVyUnRjLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oYW5zd2VyKSk7XG4gICAgfVxuICAgIDtcbiAgICBoYW5kbGVDYW5kaWRhdGUoY2FuZGlkYXRlKSB7XG4gICAgICAgIHRoaXMucGVlclJ0Yy5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjYW5kaWRhdGUpKVxuICAgICAgICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAgfVxuICAgIDtcbiAgICBoYW5kbGVMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5wZWVyUnRjLmNsb3NlKCk7XG4gICAgICAgIHRoaXMucGVlclJ0Yy5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBuZXdseSBjcmVhdGVkIGNyZHQgd2l0aCBpdHMgSUQgYW5kIGNvcnJlc3BvbmRpbmcgbWVzc2FnZVxuICAgICAqIGxpc3RlbmVyIG9uIENhc3VhbEJyb2FkY2FzdE5ldHdvcmsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdE1lc3NhZ2VMaXN0ZW5lciB0aGUgbWVzc2FnZSBsaXN0ZW5lciBvZiBlYWNoIGNyZHQuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgSUQgb2YgZWFjaCBjcmR0LlxuICAgICAqXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy5jcmR0UnVudGltZSA9IGNyZHRSdW50aW1lO1xuICAgICAgICB0aGlzLnNlbmRTaWduYWxpbmdNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6IFwicmVnaXN0ZXJcIixcbiAgICAgICAgICAgIG5hbWU6IHRoaXMudWlkLFxuICAgICAgICAgICAgY3JkdE5hbWU6IGNyZHRzXzEuQ3JkdFJ1bnRpbWUubmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJDcmVhdGUgZGF0YUNobm5lbFwiKTtcbiAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbCA9IHRoaXMucGVlclJ0Yy5jcmVhdGVEYXRhQ2hhbm5lbChcImNoYW5uZWwxXCIpO1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JzOiBcIiwgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsIHRoaXMuc2VuZFdlYlJ0Y0RhdGEpO1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEgY2hhbm5lbCBpcyBjbG9zZWRcIik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgZnVuY3Rpb24gb24gY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsgbGF5ZXIsIHdoaWNoIGNhbGxlZFxuICAgICAqIGJ5IGNyZHQncyBydW50aW1lIGxheWVyLlxuICAgICAqXG4gICAgICogVGhlIG1lc3NhZ2UgaXMgd3JhcHBlZCB3aXRoIGl0cyBjb3JyZXNwb25kaW5nIHRpbWVzdGFtcCAoYmFzaWMgc2VuZGVyIG5vZGVcbiAgICAgKiBpbmZvIGFuZCB2ZWN0b3IgY2xvY2spLlxuICAgICAqXG4gICAgICogVXNpbmcgV2ViU29ja2V0IGFzIG5ldHdvcmsgdHJhbnNtaXNzaW9uIHByb3RvY29sLlxuICAgICAqIFVzaW5nIEpTT04gZm9ybWF0IGFzIG1lc3NhZ2UgdHlwZS5cbiAgICAgKlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBub3QgT3BlbiwgdGhlbiBidWZmZXIgdGhlIG1lc3NhZ2UgYW5kXG4gICAgICogd2FpdCB1bnRpbCBXZWJTb2NrZXQgb3Blbi5cbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgT3BlbiwgdGhlbiBzZW5kIGl0IHdpdGggd3Muc2VuZCgpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgdGhlIGNyZHQgdXBkYXRlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgdW5pcXVlIElEIGZvciBlYWNoIGNyZHQuXG4gICAgICovXG4gICAgc2VuZChncm91cCwgbWVzc2FnZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjcmR0SWQgZXhpc3QgaW4gdGhlIG1hcC5cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgdmMpO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IGNyZHRfbmV0d29ya19ydW50aW1lXzEubXlNZXNzYWdlKG1lc3NhZ2UsIGdyb3VwLCB2Yyk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFDaGFubmVsLnJlYWR5U3RhdGUgPT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUNoYW5uZWwuc2VuZChteVBhY2thZ2UudG9KU09OKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhQnVmZmVyLnB1c2gobXlQYWNrYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBjcmR0SWQgaW4gdGhpcyByZXBsaWNhLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBjcmR0SWQgdGhhdCB3b3VsZCBsaWtlIHRvIHJldHVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdGltZXN0YW1wIHRoYXQgd291bGQgYmUgYXNzaWduZWQgdG8gYSBDUkRUXG4gICAgICogbWVzc2FnZSBzZW50IGJ5IHRoaXMgcmVwbGljYSBhbmQgZ2l2ZW4gY3JkdElkIHJpZ2h0IG5vdy5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldE5leHRUaW1lc3RhbXAoZ3JvdXApIHtcbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2suXG4gICAgICAgIGxldCB2YyA9IHRoaXMudmNNYXAuZ2V0KGdyb3VwKTtcbiAgICAgICAgaWYgKCF2Yykge1xuICAgICAgICAgICAgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIHZjKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAodmMuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lc3RhbXAgb2YgdGhpcyByZXBsaWNhIHdpdGggbmV4dCB2YWx1ZS5cbiAgICAgICAgdmNDb3B5LmluY3JlbWVudCgpO1xuICAgICAgICByZXR1cm4gdmNDb3B5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgdG8gY3VzdG9taXplZCBkYXRhIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSB0cmF2ZWwgdGhyb3VnaCBuZXR3b3JrLlxuICAgICAqIEByZXR1cm5zIHRoZSBjdXN0b21pemVkIGRhdGEgdHlwZSA9PiBteU1lc3NhZ2VcbiAgICAgKi9cbiAgICBwYXJzZUpTT04oZGF0YSkge1xuICAgICAgICBsZXQgZGF0YUpTT04gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2soZGF0YUpTT04udGltZXN0YW1wLnVpZCwgdGhpcy51aWQgPT09IGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IFVpbnQ4QXJyYXkuZnJvbShkYXRhSlNPTi5tZXNzYWdlKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBjcmR0X25ldHdvcmtfcnVudGltZV8xLm15TWVzc2FnZShtZXNzYWdlLCBkYXRhSlNPTi5ncm91cCwgdmMpO1xuICAgICAgICByZXR1cm4gbXlQYWNrYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGJ1ZmZlcmVkIG1lc3NhZ2VzIGFuZCBkZWxpdmVyeSB0aGVcbiAgICAgKiBtZXNzYWdlcyBiYWNrIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIgd2hpY2ggYXJlIHJlYWR5LlxuICAgICAqXG4gICAgICogVGhlIGNoZWNraW5nIG9yZGVyIGlzIGZyb20gdGhlIGxhc3Rlc3QgdG8gdGhlIG9sZGVzdC5cbiAgICAgKiBVcGRhdGUgdGhlIFZlY3RvckNsb2NrIGVudHJ5IGFuZCBNZXNzYWdlQnVmZmVyIHdoZW4gbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogU2VuZCB0aGUgbWVzc2FnZSBiYWNrIHRvIGNyZHRSdW50aW1lIHdpdGggY29ycmVzcG9uZGluZ1xuICAgICAqIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICovXG4gICAgY2hlY2tNZXNzYWdlQnVmZmVyKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBncm91cCA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV07XG4gICAgICAgICAgICBsZXQgY3VyVmVjdG9yQ2xvY2sgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzJdO1xuICAgICAgICAgICAgbGV0IG15VmVjdG9yQ2xvY2sgPSB0aGlzLnZjTWFwLmdldChncm91cCk7XG4gICAgICAgICAgICBpZiAoIW15VmVjdG9yQ2xvY2spIHtcbiAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgbXlWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlWZWN0b3JDbG9jay5pc3JlYWR5KGN1clZlY3RvckNsb2NrKSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgdG8gY3JkdFJ1bnRpbWUuXG5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmNyZHRSdW50aW1lLnJlY2VpdmUodGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXSwgdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVswXSwgdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXSk7XG4gICAgICAgICAgICAgICAgbXlWZWN0b3JDbG9jay5pbmNyZW1lbnRTZW5kZXIoY3VyVmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuV2ViUnRjTmV0d29yayA9IFdlYlJ0Y05ldHdvcms7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X25ldHdvcmtfd2VicnRjX3J1bnRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X25ldHdvcmtfaW50ZXJmYWNlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jcmR0X25ldHdvcmtfcnVudGltZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9uZXR3b3JrX3dlYnJ0Y19ydW50aW1lXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi92ZWN0b3JfY2xvY2tcIiksIGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZlY3RvckNsb2NrID0gdm9pZCAwO1xuLy8gVGhlIHZlY3RvciBjbG9jayBkZXNpZ25lZCBmb3IgQ1JEVCBsaWJyYXJ5IGFuZCBjYXN1YWwgYnJvYWRjYXN0aW5nXG4vLyBydW50aW1lIHRvIGVuc3VyZSBjb3JyZWN0IGNhdXNhbGl0eS5cbi8qKlxuICogVGhlIHZlY3RvciBjbG9jayBjbGFzcyBmb3IgZW5zdXJpbmcgY2FzdWFsaXR5LlxuICovXG5jbGFzcyBWZWN0b3JDbG9jayB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgdmVjdG9yIHdpdGggcmVwbGljYSdzIG93biBlbnRyeS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQsIGxvY2FsKSB7XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLmxvY2FsID0gbG9jYWw7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdW5pcXVlIElEIGZvciB0aGlzIHJlcGxpY2EocmVwbGljYUlkKS5cbiAgICAgKi9cbiAgICBnZXRTZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG4gICAgaXNMb2NhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2ZWN0b3IgY2xvY2sgd2l0aCBhbGwgdGhlIGVudHJpZXMuXG4gICAgICovXG4gICAgYXNWZWN0b3JDbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmlzaWJsZSBudW1iZXIgb2YgdGhlIGNvdW50ZXIgZnJvbSBzZW5kZXIgaW5cbiAgICAgKiB0aGlzIHZlY3RvcmNsb2NrLlxuICAgICAqL1xuICAgIGdldFNlbmRlckNvdW50ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIHJlcGxpY2FzIGludm92bGVkIGluIHRoaXMgY3JkdHMuXG4gICAgICovXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLnNpemU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmVjdG9yIG9mIHRoZSB1aWQocmVwbGljYUlkKSBlbnRyeS5cbiAgICAgKi9cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgb2xkVmFsdWUgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBhIG1lc3NhZ2Ugd2l0aCBhIGNlcnRhaW4gdGltZXN0YW1wIGlzIHJlYWR5IGZvciBkZWxpdmVyeVxuICAgICAqIHRvIGVuc3VyZSBjb3JyZWN0IGNhc3VhbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqIEByZXR1cm5zIHRoZSBtZXNzYWdlIGlzIHJlYWR5IG9yIG5vdC5cbiAgICAgKi9cbiAgICBpc3JlYWR5KHZjKSB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5oYXMob3RoZXJVaWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSA9PT0gb3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSAtIDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmNyZW1lbnQgc2VuZGVyJ3MgbGFzdGVzdCBlbnRyeSByZWNlaXZlZCBpbiB0aGlzIFZlY3RvckNsb2NrXG4gICAgICogaW4gdGhlIHJlcGxpY2EncyBvd24gdmVjdG9yTWFwLlxuICAgICAqXG4gICAgICogVGhpcyBvcGVyYXRpb24gaXMgbWFpbmx5IGRvbmUgYWZ0ZXIgY29ycmVjdGx5IGRlbGl2ZXIgdGhlIG1lc3NhZ2VcbiAgICAgKiB3aGVuIGlzUmVhZHkoKSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBpbmNyZW1lbnRTZW5kZXIodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KG90aGVyVWlkLCBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgY3VycmVudCBWZWN0b3JDbG9jayB3aXRoIHRoZSB2ZWN0b3IgY2xvY2sgcmVjZXZpZWQgZnJvbVxuICAgICAqIG90aGVyIHJlcGxpY2EuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKi9cbiAgICBtZXJnZSh2Yykge1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgTWF0aC5tYXgodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvbWVVaWQgdGhlIHJlcGxpY2EncyB1aWQuXG4gICAgICogQHBhcmFtIGNsb2NrVmFsdWUgdGhlIGNsb2NrIG51bWJlciBvZiB0aGUgcmVwbGljYS5cbiAgICAgKi9cbiAgICBzZXRFbnRyeShzb21lVWlkLCBjbG9ja1ZhbHVlKSB7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChzb21lVWlkLCBjbG9ja1ZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLlZlY3RvckNsb2NrID0gVmVjdG9yQ2xvY2s7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZWN0b3JfY2xvY2suanMubWFwIiwiLyplc2xpbnQtZGlzYWJsZSBibG9jay1zY29wZWQtdmFyLCBpZC1sZW5ndGgsIG5vLWNvbnRyb2wtcmVnZXgsIG5vLW1hZ2ljLW51bWJlcnMsIG5vLXByb3RvdHlwZS1idWlsdGlucywgbm8tcmVkZWNsYXJlLCBuby1zaGFkb3csIG5vLXZhciwgc29ydC12YXJzKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgJHByb3RvYnVmID0gcmVxdWlyZShcInByb3RvYnVmanMvbWluaW1hbFwiKTtcblxuLy8gQ29tbW9uIGFsaWFzZXNcbnZhciAkUmVhZGVyID0gJHByb3RvYnVmLlJlYWRlciwgJFdyaXRlciA9ICRwcm90b2J1Zi5Xcml0ZXIsICR1dGlsID0gJHByb3RvYnVmLnV0aWw7XG5cbi8vIEV4cG9ydGVkIHJvb3QgbmFtZXNwYWNlXG52YXIgJHJvb3QgPSAkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdIHx8ICgkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdID0ge30pO1xuXG4kcm9vdC5HTWFwTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBHTWFwTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJR01hcE1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElHTWFwTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0ga2V5VG9Jbml0IEdNYXBNZXNzYWdlIGtleVRvSW5pdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBHTWFwTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBHTWFwTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEdNYXBNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElHTWFwTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SUdNYXBNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gR01hcE1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdNYXBNZXNzYWdlIGtleVRvSW5pdC5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSBrZXlUb0luaXRcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5wcm90b3R5cGUua2V5VG9Jbml0ID0gJHV0aWwubmV3QnVmZmVyKFtdKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgR01hcE1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR01hcE1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7R01hcE1lc3NhZ2V9IEdNYXBNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHTWFwTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdNYXBNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEdNYXBNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR01hcE1lc3NhZ2V9IG1lc3NhZ2UgR01hcE1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2Uua2V5VG9Jbml0KTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdNYXBNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEdNYXBNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR01hcE1lc3NhZ2V9IG1lc3NhZ2UgR01hcE1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHTWFwTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7R01hcE1lc3NhZ2V9IEdNYXBNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5HTWFwTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5rZXlUb0luaXQgPSByZWFkZXIuYnl0ZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImtleVRvSW5pdFwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdrZXlUb0luaXQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgR01hcE1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIEdNYXBNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIEdNYXBNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2Uua2V5VG9Jbml0ICYmIHR5cGVvZiBtZXNzYWdlLmtleVRvSW5pdC5sZW5ndGggPT09IFwibnVtYmVyXCIgfHwgJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5rZXlUb0luaXQpKSlcbiAgICAgICAgICAgIHJldHVybiBcImtleVRvSW5pdDogYnVmZmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR01hcE1lc3NhZ2UgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxuICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEdNYXBNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7R01hcE1lc3NhZ2V9IEdNYXBNZXNzYWdlXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5HTWFwTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkdNYXBNZXNzYWdlKCk7XG4gICAgICAgIGlmIChvYmplY3Qua2V5VG9Jbml0ICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5rZXlUb0luaXQgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3Qua2V5VG9Jbml0LCBtZXNzYWdlLmtleVRvSW5pdCA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC5rZXlUb0luaXQpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3Qua2V5VG9Jbml0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmtleVRvSW5pdCA9IG9iamVjdC5rZXlUb0luaXQ7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBHTWFwTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEdNYXBNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7R01hcE1lc3NhZ2V9IG1lc3NhZ2UgR01hcE1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC5rZXlUb0luaXQgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmtleVRvSW5pdCA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzICE9PSBBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmtleVRvSW5pdCA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3Qua2V5VG9Jbml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2Uua2V5VG9Jbml0ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImtleVRvSW5pdFwiKSlcbiAgICAgICAgICAgIG9iamVjdC5rZXlUb0luaXQgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2Uua2V5VG9Jbml0LCAwLCBtZXNzYWdlLmtleVRvSW5pdC5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLmtleVRvSW5pdCkgOiBtZXNzYWdlLmtleVRvSW5pdDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBHTWFwTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBHTWFwTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290LlJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIElSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBtZXNzYWdlIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ30gdW5pcXVlSWQgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgdW5pcXVlSWRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lSdW50aW1lR2VuZXJhdG9yTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IG1lc3NhZ2VcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5wcm90b3R5cGUubWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSB1bmlxdWVJZC5cbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHVuaXF1ZUlkXG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UucHJvdG90eXBlLnVuaXF1ZUlkID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJUnVudGltZUdlbmVyYXRvck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7UnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJUnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IG1lc3NhZ2UgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UubWVzc2FnZSk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMiA9Ki8xOCkuc3RyaW5nKG1lc3NhZ2UudW5pcXVlSWQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gbWVzc2FnZSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LlJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm1lc3NhZ2UgPSByZWFkZXIuYnl0ZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnVuaXF1ZUlkID0gcmVhZGVyLnN0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwibWVzc2FnZVwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdtZXNzYWdlJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ1bmlxdWVJZFwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICd1bmlxdWVJZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge1J1bnRpbWVHZW5lcmF0b3JNZXNzYWdlfSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS5tZXNzYWdlICYmIHR5cGVvZiBtZXNzYWdlLm1lc3NhZ2UubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UubWVzc2FnZSkpKVxuICAgICAgICAgICAgcmV0dXJuIFwibWVzc2FnZTogYnVmZmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS51bmlxdWVJZCkpXG4gICAgICAgICAgICByZXR1cm4gXCJ1bmlxdWVJZDogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxuICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7UnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5SdW50aW1lR2VuZXJhdG9yTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LlJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKCk7XG4gICAgICAgIGlmIChvYmplY3QubWVzc2FnZSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QubWVzc2FnZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC5tZXNzYWdlLCBtZXNzYWdlLm1lc3NhZ2UgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QubWVzc2FnZSkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC5tZXNzYWdlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm1lc3NhZ2UgPSBvYmplY3QubWVzc2FnZTtcbiAgICAgICAgaWYgKG9iamVjdC51bmlxdWVJZCAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS51bmlxdWVJZCA9IFN0cmluZyhvYmplY3QudW5pcXVlSWQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge1J1bnRpbWVHZW5lcmF0b3JNZXNzYWdlfSBtZXNzYWdlIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC5tZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdC5tZXNzYWdlID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QubWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmplY3QudW5pcXVlSWQgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLm1lc3NhZ2UgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibWVzc2FnZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC5tZXNzYWdlID0gb3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nID8gJHV0aWwuYmFzZTY0LmVuY29kZShtZXNzYWdlLm1lc3NhZ2UsIDAsIG1lc3NhZ2UubWVzc2FnZS5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLm1lc3NhZ2UpIDogbWVzc2FnZS5tZXNzYWdlO1xuICAgICAgICBpZiAobWVzc2FnZS51bmlxdWVJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ1bmlxdWVJZFwiKSlcbiAgICAgICAgICAgIG9iamVjdC51bmlxdWVJZCA9IG1lc3NhZ2UudW5pcXVlSWQ7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUnVudGltZUdlbmVyYXRvck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5DcmR0UmVmZXJlbmNlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIENyZHRSZWZlcmVuY2UuXG4gICAgICogQGV4cG9ydHMgSUNyZHRSZWZlcmVuY2VcbiAgICAgKiBAaW50ZXJmYWNlIElDcmR0UmVmZXJlbmNlXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJvb3RJZCBDcmR0UmVmZXJlbmNlIHJvb3RJZFxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz58bnVsbH0gW3BhdGhUb1Jvb3RdIENyZHRSZWZlcmVuY2UgcGF0aFRvUm9vdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBDcmR0UmVmZXJlbmNlLlxuICAgICAqIEBleHBvcnRzIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDcmR0UmVmZXJlbmNlLlxuICAgICAqIEBpbXBsZW1lbnRzIElDcmR0UmVmZXJlbmNlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtJQ3JkdFJlZmVyZW5jZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENyZHRSZWZlcmVuY2UocHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmR0UmVmZXJlbmNlIHJvb3RJZC5cbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHJvb3RJZFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ3JkdFJlZmVyZW5jZS5wcm90b3R5cGUucm9vdElkID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIENyZHRSZWZlcmVuY2UgcGF0aFRvUm9vdC5cbiAgICAgKiBAbWVtYmVyIHtBcnJheS48c3RyaW5nPn0gcGF0aFRvUm9vdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ3JkdFJlZmVyZW5jZS5wcm90b3R5cGUucGF0aFRvUm9vdCA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENyZHRSZWZlcmVuY2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UmVmZXJlbmNlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3JkdFJlZmVyZW5jZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENyZHRSZWZlcmVuY2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ3JkdFJlZmVyZW5jZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJlZmVyZW5jZX0gbWVzc2FnZSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLnJvb3RJZCk7XG4gICAgICAgIGlmIChtZXNzYWdlLnBhdGhUb1Jvb3QgIT0gbnVsbCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS5wYXRoVG9Sb290W2ldKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENyZHRSZWZlcmVuY2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ3JkdFJlZmVyZW5jZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJlZmVyZW5jZX0gbWVzc2FnZSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJlZmVyZW5jZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yb290SWQgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5wYXRoVG9Sb290ICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QucHVzaChyZWFkZXIuc3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwicm9vdElkXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3Jvb3RJZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtDcmR0UmVmZXJlbmNlfSBDcmR0UmVmZXJlbmNlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIENyZHRSZWZlcmVuY2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5yb290SWQpKVxuICAgICAgICAgICAgcmV0dXJuIFwicm9vdElkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJwYXRoVG9Sb290XCIpKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZS5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBzdHJpbmdbXSBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2VcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuQ3JkdFJlZmVyZW5jZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkNyZHRSZWZlcmVuY2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5yb290SWQgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2Uucm9vdElkID0gU3RyaW5nKG9iamVjdC5yb290SWQpO1xuICAgICAgICBpZiAob2JqZWN0LnBhdGhUb1Jvb3QpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QucGF0aFRvUm9vdCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkNyZHRSZWZlcmVuY2UucGF0aFRvUm9vdDogYXJyYXkgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290W2ldID0gU3RyaW5nKG9iamVjdC5wYXRoVG9Sb290W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtDcmR0UmVmZXJlbmNlfSBtZXNzYWdlIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5hcnJheXMgfHwgb3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290ID0gW107XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnJvb3RJZCA9IFwiXCI7XG4gICAgICAgIGlmIChtZXNzYWdlLnJvb3RJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb290SWRcIikpXG4gICAgICAgICAgICBvYmplY3Qucm9vdElkID0gbWVzc2FnZS5yb290SWQ7XG4gICAgICAgIGlmIChtZXNzYWdlLnBhdGhUb1Jvb3QgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290W2pdID0gbWVzc2FnZS5wYXRoVG9Sb290W2pdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgQ3JkdFJlZmVyZW5jZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3JkdFJlZmVyZW5jZTtcbn0pKCk7XG5cbiRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtzdHJpbmdWYWx1ZV0gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIHN0cmluZ1ZhbHVlXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW251bWJlclZhbHVlXSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbnVtYmVyVmFsdWVcbiAgICAgKiBAcHJvcGVydHkge0lDcmR0UmVmZXJlbmNlfG51bGx9IFtjcmR0VmFsdWVdIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBjcmR0VmFsdWVcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtJRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2Ugc3RyaW5nVmFsdWUuXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSBzdHJpbmdWYWx1ZVxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UucHJvdG90eXBlLnN0cmluZ1ZhbHVlID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBudW1iZXJWYWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IG51bWJlclZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUubnVtYmVyVmFsdWUgPSAwO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIGNyZHRWYWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtJQ3JkdFJlZmVyZW5jZXxudWxsfHVuZGVmaW5lZH0gY3JkdFZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUuY3JkdFZhbHVlID0gbnVsbDtcblxuICAgIC8vIE9uZU9mIGZpZWxkIG5hbWVzIGJvdW5kIHRvIHZpcnR1YWwgZ2V0dGVycyBhbmQgc2V0dGVyc1xuICAgIHZhciAkb25lT2ZGaWVsZHM7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgdmFsdWUuXG4gICAgICogQG1lbWJlciB7XCJzdHJpbmdWYWx1ZVwifFwibnVtYmVyVmFsdWVcInxcImNyZHRWYWx1ZVwifHVuZGVmaW5lZH0gdmFsdWVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xuICAgICAgICBnZXQ6ICR1dGlsLm9uZU9mR2V0dGVyKCRvbmVPZkZpZWxkcyA9IFtcInN0cmluZ1ZhbHVlXCIsIFwibnVtYmVyVmFsdWVcIiwgXCJjcmR0VmFsdWVcIl0pLFxuICAgICAgICBzZXQ6ICR1dGlsLm9uZU9mU2V0dGVyKCRvbmVPZkZpZWxkcylcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZX0gbWVzc2FnZSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc3RyaW5nVmFsdWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInN0cmluZ1ZhbHVlXCIpKVxuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5zdHJpbmcobWVzc2FnZS5zdHJpbmdWYWx1ZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLm51bWJlclZhbHVlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJudW1iZXJWYWx1ZVwiKSlcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMSA9Ki8xNykuZG91YmxlKG1lc3NhZ2UubnVtYmVyVmFsdWUpO1xuICAgICAgICBpZiAobWVzc2FnZS5jcmR0VmFsdWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcImNyZHRWYWx1ZVwiKSlcbiAgICAgICAgICAgICRyb290LkNyZHRSZWZlcmVuY2UuZW5jb2RlKG1lc3NhZ2UuY3JkdFZhbHVlLCB3cml0ZXIudWludDMyKC8qIGlkIDMsIHdpcmVUeXBlIDIgPSovMjYpLmZvcmsoKSkubGRlbGltKCk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZX0gbWVzc2FnZSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2Uuc3RyaW5nVmFsdWUgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5udW1iZXJWYWx1ZSA9IHJlYWRlci5kb3VibGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmNyZHRWYWx1ZSA9ICRyb290LkNyZHRSZWZlcmVuY2UuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0RlZmF1bHRTZXJpYWxpemVyTWVzc2FnZX0gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc3RyaW5nVmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwic3RyaW5nVmFsdWVcIikpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMudmFsdWUgPSAxO1xuICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnN0cmluZ1ZhbHVlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdWYWx1ZTogc3RyaW5nIGV4cGVjdGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UubnVtYmVyVmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibnVtYmVyVmFsdWVcIikpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInZhbHVlOiBtdWx0aXBsZSB2YWx1ZXNcIjtcbiAgICAgICAgICAgIHByb3BlcnRpZXMudmFsdWUgPSAxO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLm51bWJlclZhbHVlICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIm51bWJlclZhbHVlOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5jcmR0VmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwiY3JkdFZhbHVlXCIpKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2YWx1ZTogbXVsdGlwbGUgdmFsdWVzXCI7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gMTtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAkcm9vdC5DcmR0UmVmZXJlbmNlLnZlcmlmeShtZXNzYWdlLmNyZHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjcmR0VmFsdWUuXCIgKyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UpXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB2YXIgbWVzc2FnZSA9IG5ldyAkcm9vdC5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5zdHJpbmdWYWx1ZSAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS5zdHJpbmdWYWx1ZSA9IFN0cmluZyhvYmplY3Quc3RyaW5nVmFsdWUpO1xuICAgICAgICBpZiAob2JqZWN0Lm51bWJlclZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLm51bWJlclZhbHVlID0gTnVtYmVyKG9iamVjdC5udW1iZXJWYWx1ZSk7XG4gICAgICAgIGlmIChvYmplY3QuY3JkdFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmNyZHRWYWx1ZSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLmNyZHRWYWx1ZTogb2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgbWVzc2FnZS5jcmR0VmFsdWUgPSAkcm9vdC5DcmR0UmVmZXJlbmNlLmZyb21PYmplY3Qob2JqZWN0LmNyZHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0RlZmF1bHRTZXJpYWxpemVyTWVzc2FnZX0gbWVzc2FnZSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChtZXNzYWdlLnN0cmluZ1ZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInN0cmluZ1ZhbHVlXCIpKSB7XG4gICAgICAgICAgICBvYmplY3Quc3RyaW5nVmFsdWUgPSBtZXNzYWdlLnN0cmluZ1ZhbHVlO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMub25lb2ZzKVxuICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IFwic3RyaW5nVmFsdWVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5udW1iZXJWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJudW1iZXJWYWx1ZVwiKSkge1xuICAgICAgICAgICAgb2JqZWN0Lm51bWJlclZhbHVlID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLm51bWJlclZhbHVlKSA/IFN0cmluZyhtZXNzYWdlLm51bWJlclZhbHVlKSA6IG1lc3NhZ2UubnVtYmVyVmFsdWU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5vbmVvZnMpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gXCJudW1iZXJWYWx1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmNyZHRWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJjcmR0VmFsdWVcIikpIHtcbiAgICAgICAgICAgIG9iamVjdC5jcmR0VmFsdWUgPSAkcm9vdC5DcmR0UmVmZXJlbmNlLnRvT2JqZWN0KG1lc3NhZ2UuY3JkdFZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm9uZW9mcylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcImNyZHRWYWx1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuQ291bnRlck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQ291bnRlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUNvdW50ZXJNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdG9BZGQgQ291bnRlck1lc3NhZ2UgdG9BZGRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQ291bnRlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDb3VudGVyTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENvdW50ZXJNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3VudGVyTWVzc2FnZSB0b0FkZC5cbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRvQWRkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UucHJvdG90eXBlLnRvQWRkID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ291bnRlck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ291bnRlck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7Q291bnRlck1lc3NhZ2V9IENvdW50ZXJNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudGVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENvdW50ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ291bnRlck1lc3NhZ2V9IG1lc3NhZ2UgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDEgPSovOSkuZG91YmxlKG1lc3NhZ2UudG9BZGQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ291bnRlck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZX0gbWVzc2FnZSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkNvdW50ZXJNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRvQWRkID0gcmVhZGVyLmRvdWJsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9BZGQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS50b0FkZCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRvQWRkOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkNvdW50ZXJNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ291bnRlck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b0FkZCAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IE51bWJlcihvYmplY3QudG9BZGQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0NvdW50ZXJNZXNzYWdlfSBtZXNzYWdlIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnRvQWRkID0gMDtcbiAgICAgICAgaWYgKG1lc3NhZ2UudG9BZGQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICBvYmplY3QudG9BZGQgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UudG9BZGQpID8gU3RyaW5nKG1lc3NhZ2UudG9BZGQpIDogbWVzc2FnZS50b0FkZDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBDb3VudGVyTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb3VudGVyTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290Lk11bHRSZWdpc3Rlck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSU11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdG9NdWx0IE11bHRSZWdpc3Rlck1lc3NhZ2UgdG9NdWx0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IE11bHRSZWdpc3Rlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSU11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTXVsdFJlZ2lzdGVyTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXVsdFJlZ2lzdGVyTWVzc2FnZSB0b011bHQuXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSB0b011bHRcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UucHJvdG90eXBlLnRvTXVsdCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE11bHRSZWdpc3Rlck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTXVsdFJlZ2lzdGVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXVsdFJlZ2lzdGVyTWVzc2FnZX0gbWVzc2FnZSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDEgPSovOSkuZG91YmxlKG1lc3NhZ2UudG9NdWx0KTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXVsdFJlZ2lzdGVyTWVzc2FnZX0gbWVzc2FnZSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b011bHQgPSByZWFkZXIuZG91YmxlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b011bHRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9NdWx0J1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRvTXVsdCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRvTXVsdDogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lk11bHRSZWdpc3Rlck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b011bHQgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2UudG9NdWx0ID0gTnVtYmVyKG9iamVjdC50b011bHQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtNdWx0UmVnaXN0ZXJNZXNzYWdlfSBtZXNzYWdlIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC50b011bHQgPSAwO1xuICAgICAgICBpZiAobWVzc2FnZS50b011bHQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9NdWx0XCIpKVxuICAgICAgICAgICAgb2JqZWN0LnRvTXVsdCA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS50b011bHQpID8gU3RyaW5nKG1lc3NhZ2UudG9NdWx0KSA6IG1lc3NhZ2UudG9NdWx0O1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIE11bHRSZWdpc3Rlck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE11bHRSZWdpc3Rlck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5HU2V0TWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBHU2V0TWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJR1NldE1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElHU2V0TWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0gdG9BZGQgR1NldE1lc3NhZ2UgdG9BZGRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgR1NldE1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgR1NldE1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHU2V0TWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJR1NldE1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lHU2V0TWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdTZXRNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHU2V0TWVzc2FnZSB0b0FkZC5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB0b0FkZFxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnByb3RvdHlwZS50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEdTZXRNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0dTZXRNZXNzYWdlfSBHU2V0TWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgR1NldE1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHU2V0TWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBHU2V0TWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlfSBtZXNzYWdlIEdTZXRNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5ieXRlcyhtZXNzYWdlLnRvQWRkKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdTZXRNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEdTZXRNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7R1NldE1lc3NhZ2V9IEdTZXRNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5HU2V0TWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9BZGQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgR1NldE1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIEdTZXRNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2UudG9BZGQgJiYgdHlwZW9mIG1lc3NhZ2UudG9BZGQubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudG9BZGQpKSlcbiAgICAgICAgICAgIHJldHVybiBcInRvQWRkOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkdTZXRNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuR1NldE1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b0FkZCAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QudG9BZGQgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QudG9BZGQsIG1lc3NhZ2UudG9BZGQgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QudG9BZGQpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QudG9BZGQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudG9BZGQgPSBvYmplY3QudG9BZGQ7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBHU2V0TWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7R1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3QudG9BZGQgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QudG9BZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS50b0FkZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b0FkZFwiKSlcbiAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS50b0FkZCwgMCwgbWVzc2FnZS50b0FkZC5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLnRvQWRkKSA6IG1lc3NhZ2UudG9BZGQ7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgR1NldE1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gR1NldE1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5NdnJNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIE12ck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSU12ck1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElNdnJNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSB2YWx1ZSBNdnJNZXNzYWdlIHZhbHVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IE12ck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTXZyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIE12ck1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSU12ck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lNdnJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTXZyTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXZyTWVzc2FnZSB2YWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB2YWx1ZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5wcm90b3R5cGUudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNdnJNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtNdnJNZXNzYWdlfSBNdnJNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IE12ck1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBNdnJNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIE12ck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SU12ck1lc3NhZ2V9IG1lc3NhZ2UgTXZyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5ieXRlcyhtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE12ck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXZyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZX0gbWVzc2FnZSBNdnJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE12ck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXZyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS52YWx1ZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndmFsdWUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgTXZyTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7TXZyTWVzc2FnZX0gTXZyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLnZhbHVlICYmIHR5cGVvZiBtZXNzYWdlLnZhbHVlLmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnZhbHVlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJ2YWx1ZTogYnVmZmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXZyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2VcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuTXZyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lk12ck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC52YWx1ZSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QudmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QudmFsdWUsIG1lc3NhZ2UudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QudmFsdWUpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudmFsdWUgPSBvYmplY3QudmFsdWU7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBNdnJNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge012ck1lc3NhZ2V9IG1lc3NhZ2UgTXZyTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UudmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICBvYmplY3QudmFsdWUgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UudmFsdWUsIDAsIG1lc3NhZ2UudmFsdWUubGVuZ3RoKSA6IG9wdGlvbnMuYnl0ZXMgPT09IEFycmF5ID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZS52YWx1ZSkgOiBtZXNzYWdlLnZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIE12ck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE12ck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5Md3dNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIEx3d01lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUx3d01lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElMd3dNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSB2YWx1ZSBMd3dNZXNzYWdlIHZhbHVlXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWUgTHd3TWVzc2FnZSB0aW1lXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEx3d01lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTHd3TWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEx3d01lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSUx3d01lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTHd3TWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTHd3TWVzc2FnZSB2YWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB2YWx1ZVxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5wcm90b3R5cGUudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogTHd3TWVzc2FnZSB0aW1lLlxuICAgICAqIEBtZW1iZXIge251bWJlcn0gdGltZVxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5wcm90b3R5cGUudGltZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEx3d01lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0x3d01lc3NhZ2V9IEx3d01lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTHd3TWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEx3d01lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTHd3TWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTHd3TWVzc2FnZX0gbWVzc2FnZSBMd3dNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDEgPSovMTcpLmRvdWJsZShtZXNzYWdlLnRpbWUpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgTHd3TWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBMd3dNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlfSBtZXNzYWdlIEx3d01lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIEx3d01lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7THd3TWVzc2FnZX0gTHd3TWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5Md3dNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnZhbHVlID0gcmVhZGVyLmJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50aW1lID0gcmVhZGVyLmRvdWJsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndmFsdWUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRpbWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndGltZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBMd3dNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtMd3dNZXNzYWdlfSBMd3dNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIEx3d01lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2UudmFsdWUgJiYgdHlwZW9mIG1lc3NhZ2UudmFsdWUubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudmFsdWUpKSlcbiAgICAgICAgICAgIHJldHVybiBcInZhbHVlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRpbWUgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICByZXR1cm4gXCJ0aW1lOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBMd3dNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7THd3TWVzc2FnZX0gTHd3TWVzc2FnZVxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5Md3dNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTHd3TWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC52YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC52YWx1ZSwgbWVzc2FnZS52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC52YWx1ZSkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS52YWx1ZSA9IG9iamVjdC52YWx1ZTtcbiAgICAgICAgaWYgKG9iamVjdC50aW1lICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnRpbWUgPSBOdW1iZXIob2JqZWN0LnRpbWUpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgTHd3TWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtMd3dNZXNzYWdlfSBtZXNzYWdlIEx3d01lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iamVjdC50aW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS52YWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS52YWx1ZSwgMCwgbWVzc2FnZS52YWx1ZS5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLnZhbHVlKSA6IG1lc3NhZ2UudmFsdWU7XG4gICAgICAgIGlmIChtZXNzYWdlLnRpbWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGltZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC50aW1lID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLnRpbWUpID8gU3RyaW5nKG1lc3NhZ2UudGltZSkgOiBtZXNzYWdlLnRpbWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgTHd3TWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTHd3TWVzc2FnZTtcbn0pKCk7XG5cbiRyb290LkNyZHRSdW50aW1lTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBDcmR0UnVudGltZU1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUNyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSUNyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0gaW5uZXJNZXNzYWdlIENyZHRSdW50aW1lTWVzc2FnZSBpbm5lck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fG51bGx9IFtwYXRoVG9Sb290XSBDcmR0UnVudGltZU1lc3NhZ2UgcGF0aFRvUm9vdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBDcmR0UnVudGltZU1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lDcmR0UnVudGltZU1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDcmR0UnVudGltZU1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmR0UnVudGltZU1lc3NhZ2UgaW5uZXJNZXNzYWdlLlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IGlubmVyTWVzc2FnZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UucHJvdG90eXBlLmlubmVyTWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmR0UnVudGltZU1lc3NhZ2UgcGF0aFRvUm9vdC5cbiAgICAgKiBAbWVtYmVyIHtBcnJheS48c3RyaW5nPn0gcGF0aFRvUm9vdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UucHJvdG90eXBlLnBhdGhUb1Jvb3QgPSAkdXRpbC5lbXB0eUFycmF5O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDcmR0UnVudGltZU1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUNyZHRSdW50aW1lTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtDcmR0UnVudGltZU1lc3NhZ2V9IENyZHRSdW50aW1lTWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IENyZHRSdW50aW1lTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBDcmR0UnVudGltZU1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJ1bnRpbWVNZXNzYWdlfSBtZXNzYWdlIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UuaW5uZXJNZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDIgPSovMTgpLnN0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENyZHRSdW50aW1lTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UnVudGltZU1lc3NhZ2V9IG1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlubmVyTWVzc2FnZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmICghKG1lc3NhZ2UucGF0aFRvUm9vdCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290ID0gW107XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290LnB1c2gocmVhZGVyLnN0cmluZygpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlubmVyTWVzc2FnZVwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdpbm5lck1lc3NhZ2UnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS5pbm5lck1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UuaW5uZXJNZXNzYWdlLmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmlubmVyTWVzc2FnZSkpKVxuICAgICAgICAgICAgcmV0dXJuIFwiaW5uZXJNZXNzYWdlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJwYXRoVG9Sb290XCIpKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZS5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBzdHJpbmdbXSBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtDcmR0UnVudGltZU1lc3NhZ2V9IENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkNyZHRSdW50aW1lTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkNyZHRSdW50aW1lTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LmlubmVyTWVzc2FnZSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuaW5uZXJNZXNzYWdlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICR1dGlsLmJhc2U2NC5kZWNvZGUob2JqZWN0LmlubmVyTWVzc2FnZSwgbWVzc2FnZS5pbm5lck1lc3NhZ2UgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QuaW5uZXJNZXNzYWdlKSksIDApO1xuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0LmlubmVyTWVzc2FnZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbm5lck1lc3NhZ2UgPSBvYmplY3QuaW5uZXJNZXNzYWdlO1xuICAgICAgICBpZiAob2JqZWN0LnBhdGhUb1Jvb3QpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QucGF0aFRvUm9vdCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkNyZHRSdW50aW1lTWVzc2FnZS5wYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3RbaV0gPSBTdHJpbmcob2JqZWN0LnBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtDcmR0UnVudGltZU1lc3NhZ2V9IG1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5hcnJheXMgfHwgb3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290ID0gW107XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QuaW5uZXJNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LmlubmVyTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmlubmVyTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJpbm5lck1lc3NhZ2VcIikpXG4gICAgICAgICAgICBvYmplY3QuaW5uZXJNZXNzYWdlID0gb3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nID8gJHV0aWwuYmFzZTY0LmVuY29kZShtZXNzYWdlLmlubmVyTWVzc2FnZSwgMCwgbWVzc2FnZS5pbm5lck1lc3NhZ2UubGVuZ3RoKSA6IG9wdGlvbnMuYnl0ZXMgPT09IEFycmF5ID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZS5pbm5lck1lc3NhZ2UpIDogbWVzc2FnZS5pbm5lck1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlLnBhdGhUb1Jvb3QgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290W2pdID0gbWVzc2FnZS5wYXRoVG9Sb290W2pdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgQ3JkdFJ1bnRpbWVNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3JkdFJ1bnRpbWVNZXNzYWdlO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSAkcm9vdDtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFzUHJvbWlzZTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLmFzUHJvbWlzZX0uXHJcbiAqIEB0eXBlZGVmIGFzUHJvbWlzZUNhbGxiYWNrXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEFkZGl0aW9uYWwgYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBwcm9taXNlIGZyb20gYSBub2RlLXN0eWxlIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge2FzUHJvbWlzZUNhbGxiYWNrfSBmbiBGdW5jdGlvbiB0byBjYWxsXHJcbiAqIEBwYXJhbSB7Kn0gY3R4IEZ1bmN0aW9uIGNvbnRleHRcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgRnVuY3Rpb24gYXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBQcm9taXNpZmllZCBmdW5jdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gYXNQcm9taXNlKGZuLCBjdHgvKiwgdmFyYXJncyAqLykge1xyXG4gICAgdmFyIHBhcmFtcyAgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgIG9mZnNldCAgPSAwLFxyXG4gICAgICAgIGluZGV4ICAgPSAyLFxyXG4gICAgICAgIHBlbmRpbmcgPSB0cnVlO1xyXG4gICAgd2hpbGUgKGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aClcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW2luZGV4KytdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHBhcmFtc1tvZmZzZXRdID0gZnVuY3Rpb24gY2FsbGJhY2soZXJyLyosIHZhcmFyZ3MgKi8pIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgcGFyYW1zLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tvZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUuYXBwbHkobnVsbCwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZm4uYXBwbHkoY3R4IHx8IG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWluaW1hbCBiYXNlNjQgaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciBiYXNlNjQgPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGJ5dGUgbGVuZ3RoIG9mIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxuYmFzZTY0Lmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBwID0gc3RyaW5nLmxlbmd0aDtcclxuICAgIGlmICghcClcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIHZhciBuID0gMDtcclxuICAgIHdoaWxlICgtLXAgJSA0ID4gMSAmJiBzdHJpbmcuY2hhckF0KHApID09PSBcIj1cIilcclxuICAgICAgICArK247XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKHN0cmluZy5sZW5ndGggKiAzKSAvIDQgLSBuO1xyXG59O1xyXG5cclxuLy8gQmFzZTY0IGVuY29kaW5nIHRhYmxlXHJcbnZhciBiNjQgPSBuZXcgQXJyYXkoNjQpO1xyXG5cclxuLy8gQmFzZTY0IGRlY29kaW5nIHRhYmxlXHJcbnZhciBzNjQgPSBuZXcgQXJyYXkoMTIzKTtcclxuXHJcbi8vIDY1Li45MCwgOTcuLjEyMiwgNDguLjU3LCA0MywgNDdcclxuZm9yICh2YXIgaSA9IDA7IGkgPCA2NDspXHJcbiAgICBzNjRbYjY0W2ldID0gaSA8IDI2ID8gaSArIDY1IDogaSA8IDUyID8gaSArIDcxIDogaSA8IDYyID8gaSAtIDQgOiBpIC0gNTkgfCA0M10gPSBpKys7XHJcblxyXG4vKipcclxuICogRW5jb2RlcyBhIGJ1ZmZlciB0byBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZy5cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU291cmNlIHN0YXJ0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgU291cmNlIGVuZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICovXHJcbmJhc2U2NC5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgcGFydHMgPSBudWxsLFxyXG4gICAgICAgIGNodW5rID0gW107XHJcbiAgICB2YXIgaSA9IDAsIC8vIG91dHB1dCBpbmRleFxyXG4gICAgICAgIGogPSAwLCAvLyBnb3RvIGluZGV4XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICAgICAgdmFyIGIgPSBidWZmZXJbc3RhcnQrK107XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbYiA+PiAyXTtcclxuICAgICAgICAgICAgICAgIHQgPSAoYiAmIDMpIDw8IDQ7XHJcbiAgICAgICAgICAgICAgICBqID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W3QgfCBiID4+IDRdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMTUpIDw8IDI7XHJcbiAgICAgICAgICAgICAgICBqID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W3QgfCBiID4+IDZdO1xyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiICYgNjNdO1xyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqKSB7XHJcbiAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0XTtcclxuICAgICAgICBjaHVua1tpKytdID0gNjE7XHJcbiAgICAgICAgaWYgKGogPT09IDEpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG52YXIgaW52YWxpZEVuY29kaW5nID0gXCJpbnZhbGlkIGVuY29kaW5nXCI7XHJcblxyXG4vKipcclxuICogRGVjb2RlcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0byBhIGJ1ZmZlci5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTb3VyY2Ugc3RyaW5nXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIERlc3RpbmF0aW9uIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IERlc3RpbmF0aW9uIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBOdW1iZXIgb2YgYnl0ZXMgd3JpdHRlblxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgZW5jb2RpbmcgaXMgaW52YWxpZFxyXG4gKi9cclxuYmFzZTY0LmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShzdHJpbmcsIGJ1ZmZlciwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQ7XHJcbiAgICB2YXIgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7KSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKyspO1xyXG4gICAgICAgIGlmIChjID09PSA2MSAmJiBqID4gMSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgaWYgKChjID0gczY0W2NdKSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkRW5jb2RpbmcpO1xyXG4gICAgICAgIHN3aXRjaCAoaikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSB0IDw8IDIgfCAoYyAmIDQ4KSA+PiA0O1xyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHQgJiAxNSkgPDwgNCB8IChjICYgNjApID4+IDI7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDMpIDw8IDYgfCBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICB0aHJvdyBFcnJvcihpbnZhbGlkRW5jb2RpbmcpO1xyXG4gICAgcmV0dXJuIG9mZnNldCAtIHN0YXJ0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgc3RyaW5nIGFwcGVhcnMgdG8gYmUgYmFzZTY0IGVuY29kZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3RyaW5nIHRvIHRlc3RcclxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBwcm9iYWJseSBiYXNlNjQgZW5jb2RlZCwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAqL1xyXG5iYXNlNjQudGVzdCA9IGZ1bmN0aW9uIHRlc3Qoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvLnRlc3Qoc3RyaW5nKTtcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xyXG5cclxuLyoqXHJcbiAqIENvbnN0cnVjdHMgYSBuZXcgZXZlbnQgZW1pdHRlciBpbnN0YW5jZS5cclxuICogQGNsYXNzZGVzYyBBIG1pbmltYWwgZXZlbnQgZW1pdHRlci5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcmVkIGxpc3RlbmVycy5cclxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywqPn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG59XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gTGlzdGVuZXJcclxuICogQHBhcmFtIHsqfSBbY3R4XSBMaXN0ZW5lciBjb250ZXh0XHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZ0LCBmbiwgY3R4KSB7XHJcbiAgICAodGhpcy5fbGlzdGVuZXJzW2V2dF0gfHwgKHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW10pKS5wdXNoKHtcclxuICAgICAgICBmbiAgOiBmbixcclxuICAgICAgICBjdHggOiBjdHggfHwgdGhpc1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIG9yIGFueSBtYXRjaGluZyBsaXN0ZW5lcnMgaWYgYXJndW1lbnRzIGFyZSBvbWl0dGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2V2dF0gRXZlbnQgbmFtZS4gUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGlmIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtmbl0gTGlzdGVuZXIgdG8gcmVtb3ZlLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgb2YgYGV2dGAgaWYgb21pdHRlZC5cclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gb2ZmKGV2dCwgZm4pIHtcclxuICAgIGlmIChldnQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChmbiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZ0XSA9IFtdO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2dF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDspXHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldLmZuID09PSBmbilcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0cyBhbiBldmVudCBieSBjYWxsaW5nIGl0cyBsaXN0ZW5lcnMgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGV2dCBFdmVudCBuYW1lXHJcbiAqIEBwYXJhbSB7Li4uKn0gYXJncyBBcmd1bWVudHNcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2dF07XHJcbiAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSxcclxuICAgICAgICAgICAgaSA9IDE7XHJcbiAgICAgICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOylcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDspXHJcbiAgICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaSsrXS5jdHgsIGFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KGZhY3RvcnkpO1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIC8gd3JpdGVzIGZsb2F0cyAvIGRvdWJsZXMgZnJvbSAvIHRvIGJ1ZmZlcnMuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXRcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgNjQgYml0IGRvdWJsZSB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVEb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSA2NCBiaXQgZG91YmxlIGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWREb3VibGVCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uIGZvciB0aGUgcHVycG9zZSBvZiBub2RlLWJhc2VkIHRlc3RpbmcgaW4gbW9kaWZpZWQgZ2xvYmFsIGVudmlyb25tZW50c1xyXG5mdW5jdGlvbiBmYWN0b3J5KGV4cG9ydHMpIHtcclxuXHJcbiAgICAvLyBmbG9hdDogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmMzIgPSBuZXcgRmxvYXQzMkFycmF5KFsgLTAgXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGYzMi5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbM10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX2NweSA6IHdyaXRlRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9yZXYgOiB3cml0ZUZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9mMzJfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgcmV0dXJuIGYzMlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9jcHkgOiByZWFkRmxvYXRfZjMyX3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfcmV2IDogcmVhZEZsb2F0X2YzMl9jcHk7XHJcblxyXG4gICAgLy8gZmxvYXQ6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2llZWU3NTQod3JpdGVVaW50LCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKHZhbCkpXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0MzI4OTM0NCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPiAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KSAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTM5MDk1MDQwKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgPCAxLjE3NTQ5NDM1MDgyMjI4NzVlLTM4KSAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgTWF0aC5yb3VuZCh2YWwgLyAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUpKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKSxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IE1hdGgucm91bmQodmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KSAqIDgzODg2MDgpICYgODM4ODYwNztcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTI3IDw8IDIzIHwgbWFudGlzc2EpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdEJFID0gd3JpdGVGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfaWVlZTc1NChyZWFkVWludCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHVpbnQgPSByZWFkVWludChidWYsIHBvcyksXHJcbiAgICAgICAgICAgICAgICBzaWduID0gKHVpbnQgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IHVpbnQgPj4+IDIzICYgMjU1LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSB1aW50ICYgODM4ODYwNztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyNTVcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogMS40MDEyOTg0NjQzMjQ4MTdlLTQ1ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTUwKSAqIChtYW50aXNzYSArIDgzODg2MDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRMRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IHJlYWRGbG9hdF9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBkb3VibGU6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjY0ID0gbmV3IEZsb2F0NjRBcnJheShbLTBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjY0LmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4Yls3XSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfY3B5KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbMF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4Yls3XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9yZXYodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4Yls3XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4Yls0XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9jcHkgOiB3cml0ZURvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfcmV2IDogd3JpdGVEb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfY3B5KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9mNjRfcmV2KGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgICAgXTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDFdO1xyXG4gICAgICAgICAgICBmOGJbNV0gPSBidWZbcG9zICsgMl07XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyAzXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDRdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgNV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyA2XTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDddO1xyXG4gICAgICAgICAgICByZXR1cm4gZjY0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfY3B5IDogcmVhZERvdWJsZV9mNjRfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSBsZSA/IHJlYWREb3VibGVfZjY0X3JldiA6IHJlYWREb3VibGVfZjY0X2NweTtcclxuXHJcbiAgICAvLyBkb3VibGU6IGllZWU3NTRcclxuICAgIH0pKCk7IGVsc2UgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9pZWVlNzU0KHdyaXRlVWludCwgb2ZmMCwgb2ZmMSwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsKSkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMjE0Njk1OTM2MCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCkgeyAvLyArLUluZmluaXR5XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxNDY0MzUwNzIpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hbnRpc3NhO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbCA8IDIuMjI1MDczODU4NTA3MjAxNGUtMzA4KSB7IC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgLyA1ZS0zMjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IG1hbnRpc3NhIC8gNDI5NDk2NzI5NikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsKSAvIE1hdGguTE4yKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb25lbnQgPT09IDEwMjQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gMTAyMztcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KG1hbnRpc3NhICogNDUwMzU5OTYyNzM3MDQ5NiA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEwMjMgPDwgMjAgfCBtYW50aXNzYSAqIDEwNDg1NzYgJiAxMDQ4NTc1KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50QkUsIDQsIDApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2llZWU3NTQocmVhZFVpbnQsIG9mZjAsIG9mZjEsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBsbyA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMCksXHJcbiAgICAgICAgICAgICAgICBoaSA9IHJlYWRVaW50KGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gKGhpID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSBoaSA+Pj4gMjAgJiAyMDQ3LFxyXG4gICAgICAgICAgICAgICAgbWFudGlzc2EgPSA0Mjk0OTY3Mjk2ICogKGhpICYgMTA0ODU3NSkgKyBsbztcclxuICAgICAgICAgICAgcmV0dXJuIGV4cG9uZW50ID09PSAyMDQ3XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDVlLTMyNCAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDEwNzUpICogKG1hbnRpc3NhICsgNDUwMzU5OTYyNzM3MDQ5Nik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVMRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gZXhwb3J0cztcclxufVxyXG5cclxuLy8gdWludCBoZWxwZXJzXHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRMRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50QkUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCA+Pj4gMjQ7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDggICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50TEUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdXHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10gPDwgMjQpID4+PiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludEJFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXSA8PCAyNFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdKSA+Pj4gMDtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBpbnF1aXJlO1xyXG5cclxuLyoqXHJcbiAqIFJlcXVpcmVzIGEgbW9kdWxlIG9ubHkgaWYgYXZhaWxhYmxlLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlTmFtZSBNb2R1bGUgdG8gcmVxdWlyZVxyXG4gKiBAcmV0dXJucyB7P09iamVjdH0gUmVxdWlyZWQgbW9kdWxlIGlmIGF2YWlsYWJsZSBhbmQgbm90IGVtcHR5LCBvdGhlcndpc2UgYG51bGxgXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnF1aXJlKG1vZHVsZU5hbWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIG1vZCA9IGV2YWwoXCJxdWlyZVwiLnJlcGxhY2UoL14vLFwicmVcIikpKG1vZHVsZU5hbWUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcclxuICAgICAgICBpZiAobW9kICYmIChtb2QubGVuZ3RoIHx8IE9iamVjdC5rZXlzKG1vZCkubGVuZ3RoKSlcclxuICAgICAgICAgICAgcmV0dXJuIG1vZDtcclxuICAgIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHBvb2w7XHJcblxyXG4vKipcclxuICogQW4gYWxsb2NhdG9yIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwucG9vbH0uXHJcbiAqIEB0eXBlZGVmIFBvb2xBbGxvY2F0b3JcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgc2xpY2VyIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwucG9vbH0uXHJcbiAqIEB0eXBlZGVmIFBvb2xTbGljZXJcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU3RhcnQgb2Zmc2V0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyIHNsaWNlXHJcbiAqIEB0aGlzIHtVaW50OEFycmF5fVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIGdlbmVyYWwgcHVycG9zZSBidWZmZXIgcG9vbC5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7UG9vbEFsbG9jYXRvcn0gYWxsb2MgQWxsb2NhdG9yXHJcbiAqIEBwYXJhbSB7UG9vbFNsaWNlcn0gc2xpY2UgU2xpY2VyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT04MTkyXSBTbGFiIHNpemVcclxuICogQHJldHVybnMge1Bvb2xBbGxvY2F0b3J9IFBvb2xlZCBhbGxvY2F0b3JcclxuICovXHJcbmZ1bmN0aW9uIHBvb2woYWxsb2MsIHNsaWNlLCBzaXplKSB7XHJcbiAgICB2YXIgU0laRSAgID0gc2l6ZSB8fCA4MTkyO1xyXG4gICAgdmFyIE1BWCAgICA9IFNJWkUgPj4+IDE7XHJcbiAgICB2YXIgc2xhYiAgID0gbnVsbDtcclxuICAgIHZhciBvZmZzZXQgPSBTSVpFO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBvb2xfYWxsb2Moc2l6ZSkge1xyXG4gICAgICAgIGlmIChzaXplIDwgMSB8fCBzaXplID4gTUFYKVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsb2Moc2l6ZSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCArIHNpemUgPiBTSVpFKSB7XHJcbiAgICAgICAgICAgIHNsYWIgPSBhbGxvYyhTSVpFKTtcclxuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJ1ZiA9IHNsaWNlLmNhbGwoc2xhYiwgb2Zmc2V0LCBvZmZzZXQgKz0gc2l6ZSk7XHJcbiAgICAgICAgaWYgKG9mZnNldCAmIDcpIC8vIGFsaWduIHRvIDMyIGJpdFxyXG4gICAgICAgICAgICBvZmZzZXQgPSAob2Zmc2V0IHwgNykgKyAxO1xyXG4gICAgICAgIHJldHVybiBidWY7XHJcbiAgICB9O1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbWluaW1hbCBVVEY4IGltcGxlbWVudGF0aW9uIGZvciBudW1iZXIgYXJyYXlzLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgdXRmOCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgVVRGOCBieXRlIGxlbmd0aCBvZiBhIHN0cmluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmdcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZSBsZW5ndGhcclxuICovXHJcbnV0ZjgubGVuZ3RoID0gZnVuY3Rpb24gdXRmOF9sZW5ndGgoc3RyaW5nKSB7XHJcbiAgICB2YXIgbGVuID0gMCxcclxuICAgICAgICBjID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjIDwgMTI4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMTtcclxuICAgICAgICBlbHNlIGlmIChjIDwgMjA0OClcclxuICAgICAgICAgICAgbGVuICs9IDI7XHJcbiAgICAgICAgZWxzZSBpZiAoKGMgJiAweEZDMDApID09PSAweEQ4MDAgJiYgKHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4RkMwMCkgPT09IDB4REMwMCkge1xyXG4gICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgIGxlbiArPSA0O1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBsZW4gKz0gMztcclxuICAgIH1cclxuICAgIHJldHVybiBsZW47XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHMgVVRGOCBieXRlcyBhcyBhIHN0cmluZy5cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgU291cmNlIHN0YXJ0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgU291cmNlIGVuZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgcmVhZFxyXG4gKi9cclxudXRmOC5yZWFkID0gZnVuY3Rpb24gdXRmOF9yZWFkKGJ1ZmZlciwgc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xyXG4gICAgaWYgKGxlbiA8IDEpXHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgcGFydHMgPSBudWxsLFxyXG4gICAgICAgIGNodW5rID0gW10sXHJcbiAgICAgICAgaSA9IDAsIC8vIGNoYXIgb2Zmc2V0XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XHJcbiAgICAgICAgdCA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBpZiAodCA8IDEyOClcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IHQ7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDE5MSAmJiB0IDwgMjI0KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gKHQgJiAzMSkgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzO1xyXG4gICAgICAgIGVsc2UgaWYgKHQgPiAyMzkgJiYgdCA8IDM2NSkge1xyXG4gICAgICAgICAgICB0ID0gKCh0ICYgNykgPDwgMTggfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjMpIC0gMHgxMDAwMDtcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDB4RDgwMCArICh0ID4+IDEwKTtcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDB4REMwMCArICh0ICYgMTAyMyk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDE1KSA8PCAxMiB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzO1xyXG4gICAgICAgIGlmIChpID4gODE5MSkge1xyXG4gICAgICAgICAgICAocGFydHMgfHwgKHBhcnRzID0gW10pKS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuaykpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGFydHMpIHtcclxuICAgICAgICBpZiAoaSlcclxuICAgICAgICAgICAgcGFydHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpKTtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIHN0cmluZyBhcyBVVEY4IGJ5dGVzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGVzIHdyaXR0ZW5cclxuICovXHJcbnV0Zjgud3JpdGUgPSBmdW5jdGlvbiB1dGY4X3dyaXRlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldCxcclxuICAgICAgICBjMSwgLy8gY2hhcmFjdGVyIDFcclxuICAgICAgICBjMjsgLy8gY2hhcmFjdGVyIDJcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYzEgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYzEgPCAxMjgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYzEgPCAyMDQ4KSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAgICAgIHwgMTkyO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9IGVsc2UgaWYgKChjMSAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoKGMyID0gc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpKSAmIDB4RkMwMCkgPT09IDB4REMwMCkge1xyXG4gICAgICAgICAgICBjMSA9IDB4MTAwMDAgKyAoKGMxICYgMHgwM0ZGKSA8PCAxMCkgKyAoYzIgJiAweDAzRkYpO1xyXG4gICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxOCAgICAgIHwgMjQwO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTIgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAgICAgIHwgMjI0O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mZnNldCAtIHN0YXJ0O1xyXG59O1xyXG4iLCIvLyBtaW5pbWFsIGxpYnJhcnkgZW50cnkgcG9pbnQuXG5cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9zcmMvaW5kZXgtbWluaW1hbFwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHByb3RvYnVmID0gZXhwb3J0cztcblxuLyoqXG4gKiBCdWlsZCB0eXBlLCBvbmUgb2YgYFwiZnVsbFwiYCwgYFwibGlnaHRcImAgb3IgYFwibWluaW1hbFwiYC5cbiAqIEBuYW1lIGJ1aWxkXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGNvbnN0XG4gKi9cbnByb3RvYnVmLmJ1aWxkID0gXCJtaW5pbWFsXCI7XG5cbi8vIFNlcmlhbGl6YXRpb25cbnByb3RvYnVmLldyaXRlciAgICAgICA9IHJlcXVpcmUoXCIuL3dyaXRlclwiKTtcbnByb3RvYnVmLkJ1ZmZlcldyaXRlciA9IHJlcXVpcmUoXCIuL3dyaXRlcl9idWZmZXJcIik7XG5wcm90b2J1Zi5SZWFkZXIgICAgICAgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG5wcm90b2J1Zi5CdWZmZXJSZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJfYnVmZmVyXCIpO1xuXG4vLyBVdGlsaXR5XG5wcm90b2J1Zi51dGlsICAgICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5wcm90b2J1Zi5ycGMgICAgICAgICAgPSByZXF1aXJlKFwiLi9ycGNcIik7XG5wcm90b2J1Zi5yb290cyAgICAgICAgPSByZXF1aXJlKFwiLi9yb290c1wiKTtcbnByb3RvYnVmLmNvbmZpZ3VyZSAgICA9IGNvbmZpZ3VyZTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbi8qKlxuICogUmVjb25maWd1cmVzIHRoZSBsaWJyYXJ5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBjb25maWd1cmUoKSB7XG4gICAgcHJvdG9idWYudXRpbC5fY29uZmlndXJlKCk7XG4gICAgcHJvdG9idWYuV3JpdGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyV3JpdGVyKTtcbiAgICBwcm90b2J1Zi5SZWFkZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJSZWFkZXIpO1xufVxuXG4vLyBTZXQgdXAgYnVmZmVyIHV0aWxpdHkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudFxuY29uZmlndXJlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gUmVhZGVyO1xuXG52YXIgdXRpbCAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG52YXIgQnVmZmVyUmVhZGVyOyAvLyBjeWNsaWNcblxudmFyIExvbmdCaXRzICA9IHV0aWwuTG9uZ0JpdHMsXG4gICAgdXRmOCAgICAgID0gdXRpbC51dGY4O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gaW5kZXhPdXRPZlJhbmdlKHJlYWRlciwgd3JpdGVMZW5ndGgpIHtcbiAgICByZXR1cm4gUmFuZ2VFcnJvcihcImluZGV4IG91dCBvZiByYW5nZTogXCIgKyByZWFkZXIucG9zICsgXCIgKyBcIiArICh3cml0ZUxlbmd0aCB8fCAxKSArIFwiID4gXCIgKyByZWFkZXIubGVuKTtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHJlYWRlciBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIGJ1ZmZlci5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgcmVhZGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKi9cbmZ1bmN0aW9uIFJlYWRlcihidWZmZXIpIHtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyLlxuICAgICAqIEB0eXBlIHtVaW50OEFycmF5fVxuICAgICAqL1xuICAgIHRoaXMuYnVmID0gYnVmZmVyO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIgcG9zaXRpb24uXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnBvcyA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IGJ1ZmZlci5sZW5ndGg7XG59XG5cbnZhciBjcmVhdGVfYXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gZnVuY3Rpb24gY3JlYXRlX3R5cGVkX2FycmF5KGJ1ZmZlcikge1xuICAgICAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBBcnJheS5pc0FycmF5KGJ1ZmZlcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KGJ1ZmZlcikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShidWZmZXIpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbGxlZ2FsIGJ1ZmZlclwiKTtcbiAgICB9O1xuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiB1dGlsLkJ1ZmZlclxuICAgICAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoYnVmZmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1dGlsLkJ1ZmZlci5pc0J1ZmZlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IEJ1ZmZlclJlYWRlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgIDogY3JlYXRlX2FycmF5KGJ1ZmZlcik7XG4gICAgICAgICAgICB9KShidWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogY3JlYXRlX2FycmF5O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHJlYWRlciB1c2luZyB0aGUgc3BlY2lmaWVkIGJ1ZmZlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtVaW50OEFycmF5fEJ1ZmZlcn0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqIEByZXR1cm5zIHtSZWFkZXJ8QnVmZmVyUmVhZGVyfSBBIHtAbGluayBCdWZmZXJSZWFkZXJ9IGlmIGBidWZmZXJgIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgYSB7QGxpbmsgUmVhZGVyfVxuICogQHRocm93cyB7RXJyb3J9IElmIGBidWZmZXJgIGlzIG5vdCBhIHZhbGlkIGJ1ZmZlclxuICovXG5SZWFkZXIuY3JlYXRlID0gY3JlYXRlKCk7XG5cblJlYWRlci5wcm90b3R5cGUuX3NsaWNlID0gdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5BcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUudWludDMyID0gKGZ1bmN0aW9uIHJlYWRfdWludDMyX3NldHVwKCkge1xuICAgIHZhciB2YWx1ZSA9IDQyOTQ5NjcyOTU7IC8vIG9wdGltaXplciB0eXBlLWhpbnQsIHRlbmRzIHRvIGRlb3B0IG90aGVyd2lzZSAoPyEpXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlYWRfdWludDMyKCkge1xuICAgICAgICB2YWx1ZSA9ICggICAgICAgICB0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcgICAgICAgKSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgIDcpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAxNCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDIxKSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmICAxNSkgPDwgMjgpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCh0aGlzLnBvcyArPSA1KSA+IHRoaXMubGVuKSB7XG4gICAgICAgICAgICB0aGlzLnBvcyA9IHRoaXMubGVuO1xuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmludDMyID0gZnVuY3Rpb24gcmVhZF9pbnQzMigpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKSB8IDA7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2ludDMyID0gZnVuY3Rpb24gcmVhZF9zaW50MzIoKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy51aW50MzIoKTtcbiAgICByZXR1cm4gdmFsdWUgPj4+IDEgXiAtKHZhbHVlICYgMSkgfCAwO1xufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXG5cbmZ1bmN0aW9uIHJlYWRMb25nVmFyaW50KCkge1xuICAgIC8vIHRlbmRzIHRvIGRlb3B0IHdpdGggbG9jYWwgdmFycyBmb3Igb2N0ZXQgZXRjLlxuICAgIHZhciBiaXRzID0gbmV3IExvbmdCaXRzKDAsIDApO1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAodGhpcy5sZW4gLSB0aGlzLnBvcyA+IDQpIHsgLy8gZmFzdCByb3V0ZSAobG8pXG4gICAgICAgIGZvciAoOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICAvLyAxc3QuLjR0aFxuICAgICAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIDV0aFxuICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyOCkgPj4+IDA7XG4gICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpID4+ICA0KSA+Pj4gMDtcbiAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIGkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoOyBpIDwgMzsgKytpKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgICAgICAvLyAxc3QuLjN0aFxuICAgICAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgICAgIC8vIDR0aFxuICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3MrK10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgfVxuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChoaSlcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxuICAgICAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcgKyAzKSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgICAgICAvLyA2dGguLjEwdGhcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICB0aHJvdyBFcnJvcihcImludmFsaWQgdmFyaW50IGVuY29kaW5nXCIpO1xufVxuXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciNpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI3VpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB6aWctemFnIGVuY29kZWQgdmFyaW50IGFzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciNzaW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgYm9vbGVhbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHJlYWRfYm9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKSAhPT0gMDtcbn07XG5cbmZ1bmN0aW9uIHJlYWRGaXhlZDMyX2VuZChidWYsIGVuZCkgeyAvLyBub3RlIHRoYXQgdGhpcyB1c2VzIGBlbmRgLCBub3QgYHBvc2BcbiAgICByZXR1cm4gKGJ1ZltlbmQgLSA0XVxuICAgICAgICAgIHwgYnVmW2VuZCAtIDNdIDw8IDhcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAyXSA8PCAxNlxuICAgICAgICAgIHwgYnVmW2VuZCAtIDFdIDw8IDI0KSA+Pj4gMDtcbn1cblxuLyoqXG4gKiBSZWFkcyBmaXhlZCAzMiBiaXRzIGFzIGFuIHVuc2lnbmVkIDMyIGJpdCBpbnRlZ2VyLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX2ZpeGVkMzIoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHJldHVybiByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBmaXhlZCAzMiBiaXRzIGFzIGEgc2lnbmVkIDMyIGJpdCBpbnRlZ2VyLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNmaXhlZDMyID0gZnVuY3Rpb24gcmVhZF9zZml4ZWQzMigpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCkgfCAwO1xufTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8taW52YWxpZC10aGlzICovXG5cbmZ1bmN0aW9uIHJlYWRGaXhlZDY0KC8qIHRoaXM6IFJlYWRlciAqLykge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgOCk7XG5cbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCksIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCkpO1xufVxuXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDY0IGJpdHMuXG4gKiBAbmFtZSBSZWFkZXIjZml4ZWQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgemlnLXphZyBlbmNvZGVkIGZpeGVkIDY0IGJpdHMuXG4gKiBAbmFtZSBSZWFkZXIjc2ZpeGVkNjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgZmxvYXQgKDMyIGJpdCkgYXMgYSBudW1iZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5mbG9hdCA9IGZ1bmN0aW9uIHJlYWRfZmxvYXQoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHZhciB2YWx1ZSA9IHV0aWwuZmxvYXQucmVhZEZsb2F0TEUodGhpcy5idWYsIHRoaXMucG9zKTtcbiAgICB0aGlzLnBvcyArPSA0O1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkgYXMgYSBudW1iZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiByZWFkX2RvdWJsZSgpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRG91YmxlTEUodGhpcy5idWYsIHRoaXMucG9zKTtcbiAgICB0aGlzLnBvcyArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzZXF1ZW5jZSBvZiBieXRlcyBwcmVjZWVkZWQgYnkgaXRzIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiByZWFkX2J5dGVzKCkge1xuICAgIHZhciBsZW5ndGggPSB0aGlzLnVpbnQzMigpLFxuICAgICAgICBzdGFydCAgPSB0aGlzLnBvcyxcbiAgICAgICAgZW5kICAgID0gdGhpcy5wb3MgKyBsZW5ndGg7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZW5kID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCBsZW5ndGgpO1xuXG4gICAgdGhpcy5wb3MgKz0gbGVuZ3RoO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuYnVmKSkgLy8gcGxhaW4gYXJyYXlcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgIHJldHVybiBzdGFydCA9PT0gZW5kIC8vIGZpeCBmb3IgSUUgMTAvV2luOCBhbmQgb3RoZXJzJyBzdWJhcnJheSByZXR1cm5pbmcgYXJyYXkgb2Ygc2l6ZSAxXG4gICAgICAgID8gbmV3IHRoaXMuYnVmLmNvbnN0cnVjdG9yKDApXG4gICAgICAgIDogdGhpcy5fc2xpY2UuY2FsbCh0aGlzLmJ1Ziwgc3RhcnQsIGVuZCk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc3RyaW5nIHByZWNlZWRlZCBieSBpdHMgYnl0ZSBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmcoKSB7XG4gICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcygpO1xuICAgIHJldHVybiB1dGY4LnJlYWQoYnl0ZXMsIDAsIGJ5dGVzLmxlbmd0aCk7XG59O1xuXG4vKipcbiAqIFNraXBzIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGJ5dGVzIGlmIHNwZWNpZmllZCwgb3RoZXJ3aXNlIHNraXBzIGEgdmFyaW50LlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIExlbmd0aCBpZiBrbm93biwgb3RoZXJ3aXNlIGEgdmFyaW50IGlzIGFzc3VtZWRcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiBza2lwKGxlbmd0aCkge1xuICAgIGlmICh0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAodGhpcy5wb3MgKyBsZW5ndGggPiB0aGlzLmxlbilcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCBsZW5ndGgpO1xuICAgICAgICB0aGlzLnBvcyArPSBsZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICB9IHdoaWxlICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyOCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTa2lwcyB0aGUgbmV4dCBlbGVtZW50IG9mIHRoZSBzcGVjaWZpZWQgd2lyZSB0eXBlLlxuICogQHBhcmFtIHtudW1iZXJ9IHdpcmVUeXBlIFdpcmUgdHlwZSByZWNlaXZlZFxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2tpcFR5cGUgPSBmdW5jdGlvbih3aXJlVHlwZSkge1xuICAgIHN3aXRjaCAod2lyZVR5cGUpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgdGhpcy5za2lwKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgdGhpcy5za2lwKDgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLnVpbnQzMigpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICB3aGlsZSAoKHdpcmVUeXBlID0gdGhpcy51aW50MzIoKSAmIDcpICE9PSA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5za2lwVHlwZSh3aXJlVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgdGhpcy5za2lwKDQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB3aXJlIHR5cGUgXCIgKyB3aXJlVHlwZSArIFwiIGF0IG9mZnNldCBcIiArIHRoaXMucG9zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZWFkZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKEJ1ZmZlclJlYWRlcl8pIHtcbiAgICBCdWZmZXJSZWFkZXIgPSBCdWZmZXJSZWFkZXJfO1xuICAgIFJlYWRlci5jcmVhdGUgPSBjcmVhdGUoKTtcbiAgICBCdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSgpO1xuXG4gICAgdmFyIGZuID0gdXRpbC5Mb25nID8gXCJ0b0xvbmdcIiA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFwidG9OdW1iZXJcIjtcbiAgICB1dGlsLm1lcmdlKFJlYWRlci5wcm90b3R5cGUsIHtcblxuICAgICAgICBpbnQ2NDogZnVuY3Rpb24gcmVhZF9pbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpW2ZuXShmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdWludDY0OiBmdW5jdGlvbiByZWFkX3VpbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpW2ZuXSh0cnVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaW50NjQ6IGZ1bmN0aW9uIHJlYWRfc2ludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcykuenpEZWNvZGUoKVtmbl0oZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZpeGVkNjQ6IGZ1bmN0aW9uIHJlYWRfZml4ZWQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkRml4ZWQ2NC5jYWxsKHRoaXMpW2ZuXSh0cnVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9zZml4ZWQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkRml4ZWQ2NC5jYWxsKHRoaXMpW2ZuXShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJSZWFkZXI7XG5cbi8vIGV4dGVuZHMgUmVhZGVyXG52YXIgUmVhZGVyID0gcmVxdWlyZShcIi4vcmVhZGVyXCIpO1xuKEJ1ZmZlclJlYWRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJlYWRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlclJlYWRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgcmVhZGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxuICogQGV4dGVuZHMgUmVhZGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICovXG5mdW5jdGlvbiBCdWZmZXJSZWFkZXIoYnVmZmVyKSB7XG4gICAgUmVhZGVyLmNhbGwodGhpcywgYnVmZmVyKTtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyLlxuICAgICAqIEBuYW1lIEJ1ZmZlclJlYWRlciNidWZcbiAgICAgKiBAdHlwZSB7QnVmZmVyfVxuICAgICAqL1xufVxuXG5CdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICh1dGlsLkJ1ZmZlcilcbiAgICAgICAgQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkJ1ZmZlci5wcm90b3R5cGUuc2xpY2U7XG59O1xuXG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlclJlYWRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gcmVhZF9zdHJpbmdfYnVmZmVyKCkge1xuICAgIHZhciBsZW4gPSB0aGlzLnVpbnQzMigpOyAvLyBtb2RpZmllcyBwb3NcbiAgICByZXR1cm4gdGhpcy5idWYudXRmOFNsaWNlXG4gICAgICAgID8gdGhpcy5idWYudXRmOFNsaWNlKHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpXG4gICAgICAgIDogdGhpcy5idWYudG9TdHJpbmcoXCJ1dGYtOFwiLCB0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzZXF1ZW5jZSBvZiBieXRlcyBwcmVjZWVkZWQgYnkgaXRzIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEBuYW1lIEJ1ZmZlclJlYWRlciNieXRlc1xuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBWYWx1ZSByZWFkXG4gKi9cblxuQnVmZmVyUmVhZGVyLl9jb25maWd1cmUoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqXG4gKiBOYW1lZCByb290cy5cbiAqIFRoaXMgaXMgd2hlcmUgcGJqcyBzdG9yZXMgZ2VuZXJhdGVkIHN0cnVjdHVyZXMgKHRoZSBvcHRpb24gYC1yLCAtLXJvb3RgIHNwZWNpZmllcyBhIG5hbWUpLlxuICogQ2FuIGFsc28gYmUgdXNlZCBtYW51YWxseSB0byBtYWtlIHJvb3RzIGF2YWlsYWJsZSBhY2Nyb3NzIG1vZHVsZXMuXG4gKiBAbmFtZSByb290c1xuICogQHR5cGUge09iamVjdC48c3RyaW5nLFJvb3Q+fVxuICogQGV4YW1wbGVcbiAqIC8vIHBianMgLXIgbXlyb290IC1vIGNvbXBpbGVkLmpzIC4uLlxuICpcbiAqIC8vIGluIGFub3RoZXIgbW9kdWxlOlxuICogcmVxdWlyZShcIi4vY29tcGlsZWQuanNcIik7XG4gKlxuICogLy8gaW4gYW55IHN1YnNlcXVlbnQgbW9kdWxlOlxuICogdmFyIHJvb3QgPSBwcm90b2J1Zi5yb290c1tcIm15cm9vdFwiXTtcbiAqL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogU3RyZWFtaW5nIFJQQyBoZWxwZXJzLlxuICogQG5hbWVzcGFjZVxuICovXG52YXIgcnBjID0gZXhwb3J0cztcblxuLyoqXG4gKiBSUEMgaW1wbGVtZW50YXRpb24gcGFzc2VkIHRvIHtAbGluayBTZXJ2aWNlI2NyZWF0ZX0gcGVyZm9ybWluZyBhIHNlcnZpY2UgcmVxdWVzdCBvbiBuZXR3b3JrIGxldmVsLCBpLmUuIGJ5IHV0aWxpemluZyBodHRwIHJlcXVlc3RzIG9yIHdlYnNvY2tldHMuXG4gKiBAdHlwZWRlZiBSUENJbXBsXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxNZXNzYWdlPHt9PixNZXNzYWdlPHt9Pj59IG1ldGhvZCBSZWZsZWN0ZWQgb3Igc3RhdGljIG1ldGhvZCBiZWluZyBjYWxsZWRcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gcmVxdWVzdERhdGEgUmVxdWVzdCBkYXRhXG4gKiBAcGFyYW0ge1JQQ0ltcGxDYWxsYmFja30gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiBAZXhhbXBsZVxuICogZnVuY3Rpb24gcnBjSW1wbChtZXRob2QsIHJlcXVlc3REYXRhLCBjYWxsYmFjaykge1xuICogICAgIGlmIChwcm90b2J1Zi51dGlsLmxjRmlyc3QobWV0aG9kLm5hbWUpICE9PSBcIm15TWV0aG9kXCIpIC8vIGNvbXBhdGlibGUgd2l0aCBzdGF0aWMgY29kZVxuICogICAgICAgICB0aHJvdyBFcnJvcihcIm5vIHN1Y2ggbWV0aG9kXCIpO1xuICogICAgIGFzeW5jaHJvbm91c2x5T2J0YWluQVJlc3BvbnNlKHJlcXVlc3REYXRhLCBmdW5jdGlvbihlcnIsIHJlc3BvbnNlRGF0YSkge1xuICogICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3BvbnNlRGF0YSk7XG4gKiAgICAgfSk7XG4gKiB9XG4gKi9cblxuLyoqXG4gKiBOb2RlLXN0eWxlIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIFJQQ0ltcGx9LlxuICogQHR5cGVkZWYgUlBDSW1wbENhbGxiYWNrXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnksIG90aGVyd2lzZSBgbnVsbGBcbiAqIEBwYXJhbSB7VWludDhBcnJheXxudWxsfSBbcmVzcG9uc2VdIFJlc3BvbnNlIGRhdGEgb3IgYG51bGxgIHRvIHNpZ25hbCBlbmQgb2Ygc3RyZWFtLCBpZiB0aGVyZSBoYXNuJ3QgYmVlbiBhbiBlcnJvclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG5ycGMuU2VydmljZSA9IHJlcXVpcmUoXCIuL3JwYy9zZXJ2aWNlXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFNlcnZpY2U7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWwvbWluaW1hbFwiKTtcblxuLy8gRXh0ZW5kcyBFdmVudEVtaXR0ZXJcbihTZXJ2aWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUodXRpbC5FdmVudEVtaXR0ZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBTZXJ2aWNlO1xuXG4vKipcbiAqIEEgc2VydmljZSBtZXRob2QgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgcnBjLlNlcnZpY2VNZXRob2R8U2VydmljZU1ldGhvZH0uXG4gKlxuICogRGlmZmVycyBmcm9tIHtAbGluayBSUENJbXBsQ2FsbGJhY2t9IGluIHRoYXQgaXQgaXMgYW4gYWN0dWFsIGNhbGxiYWNrIG9mIGEgc2VydmljZSBtZXRob2Qgd2hpY2ggbWF5IG5vdCByZXR1cm4gYHJlc3BvbnNlID0gbnVsbGAuXG4gKiBAdHlwZWRlZiBycGMuU2VydmljZU1ldGhvZENhbGxiYWNrXG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueVxuICogQHBhcmFtIHtUUmVzfSBbcmVzcG9uc2VdIFJlc3BvbnNlIG1lc3NhZ2VcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxuLyoqXG4gKiBBIHNlcnZpY2UgbWV0aG9kIHBhcnQgb2YgYSB7QGxpbmsgcnBjLlNlcnZpY2V9IGFzIGNyZWF0ZWQgYnkge0BsaW5rIFNlcnZpY2UuY3JlYXRlfS5cbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kXG4gKiBAdGVtcGxhdGUgVFJlcSBleHRlbmRzIE1lc3NhZ2U8VFJlcT5cbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtycGMuU2VydmljZU1ldGhvZENhbGxiYWNrPFRSZXM+fSBbY2FsbGJhY2tdIE5vZGUtc3R5bGUgY2FsbGJhY2sgY2FsbGVkIHdpdGggdGhlIGVycm9yLCBpZiBhbnksIGFuZCB0aGUgcmVzcG9uc2UgbWVzc2FnZVxuICogQHJldHVybnMge1Byb21pc2U8TWVzc2FnZTxUUmVzPj59IFByb21pc2UgaWYgYGNhbGxiYWNrYCBoYXMgYmVlbiBvbWl0dGVkLCBvdGhlcndpc2UgYHVuZGVmaW5lZGBcbiAqL1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgUlBDIHNlcnZpY2UgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIEFuIFJQQyBzZXJ2aWNlIGFzIHJldHVybmVkIGJ5IHtAbGluayBTZXJ2aWNlI2NyZWF0ZX0uXG4gKiBAZXhwb3J0cyBycGMuU2VydmljZVxuICogQGV4dGVuZHMgdXRpbC5FdmVudEVtaXR0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtSUENJbXBsfSBycGNJbXBsIFJQQyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBbcmVxdWVzdERlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxuICogQHBhcmFtIHtib29sZWFufSBbcmVzcG9uc2VEZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXG4gKi9cbmZ1bmN0aW9uIFNlcnZpY2UocnBjSW1wbCwgcmVxdWVzdERlbGltaXRlZCwgcmVzcG9uc2VEZWxpbWl0ZWQpIHtcblxuICAgIGlmICh0eXBlb2YgcnBjSW1wbCAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJycGNJbXBsIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcblxuICAgIHV0aWwuRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICAvKipcbiAgICAgKiBSUEMgaW1wbGVtZW50YXRpb24uIEJlY29tZXMgYG51bGxgIG9uY2UgdGhlIHNlcnZpY2UgaXMgZW5kZWQuXG4gICAgICogQHR5cGUge1JQQ0ltcGx8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLnJwY0ltcGwgPSBycGNJbXBsO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciByZXF1ZXN0cyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlcXVlc3REZWxpbWl0ZWQgPSBCb29sZWFuKHJlcXVlc3REZWxpbWl0ZWQpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXNwb25zZURlbGltaXRlZCA9IEJvb2xlYW4ocmVzcG9uc2VEZWxpbWl0ZWQpO1xufVxuXG4vKipcbiAqIENhbGxzIGEgc2VydmljZSBtZXRob2QgdGhyb3VnaCB7QGxpbmsgcnBjLlNlcnZpY2UjcnBjSW1wbHxycGNJbXBsfS5cbiAqIEBwYXJhbSB7TWV0aG9kfHJwYy5TZXJ2aWNlTWV0aG9kPFRSZXEsVFJlcz59IG1ldGhvZCBSZWZsZWN0ZWQgb3Igc3RhdGljIG1ldGhvZFxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUUmVxPn0gcmVxdWVzdEN0b3IgUmVxdWVzdCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtDb25zdHJ1Y3RvcjxUUmVzPn0gcmVzcG9uc2VDdG9yIFJlc3BvbnNlIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IGNhbGxiYWNrIFNlcnZpY2UgY2FsbGJhY2tcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiBAdGVtcGxhdGUgVFJlcSBleHRlbmRzIE1lc3NhZ2U8VFJlcT5cbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICovXG5TZXJ2aWNlLnByb3RvdHlwZS5ycGNDYWxsID0gZnVuY3Rpb24gcnBjQ2FsbChtZXRob2QsIHJlcXVlc3RDdG9yLCByZXNwb25zZUN0b3IsIHJlcXVlc3QsIGNhbGxiYWNrKSB7XG5cbiAgICBpZiAoIXJlcXVlc3QpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJlcXVlc3QgbXVzdCBiZSBzcGVjaWZpZWRcIik7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIHV0aWwuYXNQcm9taXNlKHJwY0NhbGwsIHNlbGYsIG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCk7XG5cbiAgICBpZiAoIXNlbGYucnBjSW1wbCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhFcnJvcihcImFscmVhZHkgZW5kZWRcIikpOyB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gc2VsZi5ycGNJbXBsKFxuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgcmVxdWVzdEN0b3Jbc2VsZi5yZXF1ZXN0RGVsaW1pdGVkID8gXCJlbmNvZGVEZWxpbWl0ZWRcIiA6IFwiZW5jb2RlXCJdKHJlcXVlc3QpLmZpbmlzaCgpLFxuICAgICAgICAgICAgZnVuY3Rpb24gcnBjQ2FsbGJhY2soZXJyLCByZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZCgvKiBlbmRlZEJ5UlBDICovIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghKHJlc3BvbnNlIGluc3RhbmNlb2YgcmVzcG9uc2VDdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZUN0b3Jbc2VsZi5yZXNwb25zZURlbGltaXRlZCA/IFwiZGVjb2RlRGVsaW1pdGVkXCIgOiBcImRlY29kZVwiXShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJkYXRhXCIsIHJlc3BvbnNlLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soZXJyKTsgfSwgMCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufTtcblxuLyoqXG4gKiBFbmRzIHRoaXMgc2VydmljZSBhbmQgZW1pdHMgdGhlIGBlbmRgIGV2ZW50LlxuICogQHBhcmFtIHtib29sZWFufSBbZW5kZWRCeVJQQz1mYWxzZV0gV2hldGhlciB0aGUgc2VydmljZSBoYXMgYmVlbiBlbmRlZCBieSB0aGUgUlBDIGltcGxlbWVudGF0aW9uLlxuICogQHJldHVybnMge3JwYy5TZXJ2aWNlfSBgdGhpc2BcbiAqL1xuU2VydmljZS5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gZW5kKGVuZGVkQnlSUEMpIHtcbiAgICBpZiAodGhpcy5ycGNJbXBsKSB7XG4gICAgICAgIGlmICghZW5kZWRCeVJQQykgLy8gc2lnbmFsIGVuZCB0byBycGNJbXBsXG4gICAgICAgICAgICB0aGlzLnJwY0ltcGwobnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMucnBjSW1wbCA9IG51bGw7XG4gICAgICAgIHRoaXMuZW1pdChcImVuZFwiKS5vZmYoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IExvbmdCaXRzO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzLlxuICogQGNsYXNzZGVzYyBIZWxwZXIgY2xhc3MgZm9yIHdvcmtpbmcgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWUuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbG8gTG93IDMyIGJpdHMsIHVuc2lnbmVkXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgSGlnaCAzMiBiaXRzLCB1bnNpZ25lZFxuICovXG5mdW5jdGlvbiBMb25nQml0cyhsbywgaGkpIHtcblxuICAgIC8vIG5vdGUgdGhhdCB0aGUgY2FzdHMgYmVsb3cgYXJlIHRoZW9yZXRpY2FsbHkgdW5uZWNlc3NhcnkgYXMgb2YgdG9kYXksIGJ1dCBvbGRlciBzdGF0aWNhbGx5XG4gICAgLy8gZ2VuZXJhdGVkIGNvbnZlcnRlciBjb2RlIG1pZ2h0IHN0aWxsIGNhbGwgdGhlIGN0b3Igd2l0aCBzaWduZWQgMzJiaXRzLiBrZXB0IGZvciBjb21wYXQuXG5cbiAgICAvKipcbiAgICAgKiBMb3cgYml0cy5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubG8gPSBsbyA+Pj4gMDtcblxuICAgIC8qKlxuICAgICAqIEhpZ2ggYml0cy5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuaGkgPSBoaSA+Pj4gMDtcbn1cblxuLyoqXG4gKiBaZXJvIGJpdHMuXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xuICogQHR5cGUge3V0aWwuTG9uZ0JpdHN9XG4gKi9cbnZhciB6ZXJvID0gTG9uZ0JpdHMuemVybyA9IG5ldyBMb25nQml0cygwLCAwKTtcblxuemVyby50b051bWJlciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbnplcm8uenpFbmNvZGUgPSB6ZXJvLnp6RGVjb2RlID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9O1xuemVyby5sZW5ndGggPSBmdW5jdGlvbigpIHsgcmV0dXJuIDE7IH07XG5cbi8qKlxuICogWmVybyBoYXNoLlxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbnZhciB6ZXJvSGFzaCA9IExvbmdCaXRzLnplcm9IYXNoID0gXCJcXDBcXDBcXDBcXDBcXDBcXDBcXDBcXDBcIjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIG51bWJlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZVxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXG4gKi9cbkxvbmdCaXRzLmZyb21OdW1iZXIgPSBmdW5jdGlvbiBmcm9tTnVtYmVyKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAwKVxuICAgICAgICByZXR1cm4gemVybztcbiAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMDtcbiAgICBpZiAoc2lnbilcbiAgICAgICAgdmFsdWUgPSAtdmFsdWU7XG4gICAgdmFyIGxvID0gdmFsdWUgPj4+IDAsXG4gICAgICAgIGhpID0gKHZhbHVlIC0gbG8pIC8gNDI5NDk2NzI5NiA+Pj4gMDtcbiAgICBpZiAoc2lnbikge1xuICAgICAgICBoaSA9IH5oaSA+Pj4gMDtcbiAgICAgICAgbG8gPSB+bG8gPj4+IDA7XG4gICAgICAgIGlmICgrK2xvID4gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgbG8gPSAwO1xuICAgICAgICAgICAgaWYgKCsraGkgPiA0Mjk0OTY3Mjk1KVxuICAgICAgICAgICAgICAgIGhpID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKGxvLCBoaSk7XG59O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIGEgbnVtYmVyLCBsb25nIG9yIHN0cmluZy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZVxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEluc3RhbmNlXG4gKi9cbkxvbmdCaXRzLmZyb20gPSBmdW5jdGlvbiBmcm9tKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAodXRpbC5Mb25nKVxuICAgICAgICAgICAgdmFsdWUgPSB1dGlsLkxvbmcuZnJvbVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUubG93IHx8IHZhbHVlLmhpZ2ggPyBuZXcgTG9uZ0JpdHModmFsdWUubG93ID4+PiAwLCB2YWx1ZS5oaWdoID4+PiAwKSA6IHplcm87XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgcG9zc2libHkgdW5zYWZlIEphdmFTY3JpcHQgbnVtYmVyLlxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7bnVtYmVyfSBQb3NzaWJseSB1bnNhZmUgbnVtYmVyXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b051bWJlciA9IGZ1bmN0aW9uIHRvTnVtYmVyKHVuc2lnbmVkKSB7XG4gICAgaWYgKCF1bnNpZ25lZCAmJiB0aGlzLmhpID4+PiAzMSkge1xuICAgICAgICB2YXIgbG8gPSB+dGhpcy5sbyArIDEgPj4+IDAsXG4gICAgICAgICAgICBoaSA9IH50aGlzLmhpICAgICA+Pj4gMDtcbiAgICAgICAgaWYgKCFsbylcbiAgICAgICAgICAgIGhpID0gaGkgKyAxID4+PiAwO1xuICAgICAgICByZXR1cm4gLShsbyArIGhpICogNDI5NDk2NzI5Nik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvICsgdGhpcy5oaSAqIDQyOTQ5NjcyOTY7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgbG9uZy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge0xvbmd9IExvbmdcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvTG9uZyA9IGZ1bmN0aW9uIHRvTG9uZyh1bnNpZ25lZCkge1xuICAgIHJldHVybiB1dGlsLkxvbmdcbiAgICAgICAgPyBuZXcgdXRpbC5Mb25nKHRoaXMubG8gfCAwLCB0aGlzLmhpIHwgMCwgQm9vbGVhbih1bnNpZ25lZCkpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogeyBsb3c6IHRoaXMubG8gfCAwLCBoaWdoOiB0aGlzLmhpIHwgMCwgdW5zaWduZWQ6IEJvb2xlYW4odW5zaWduZWQpIH07XG59O1xuXG52YXIgY2hhckNvZGVBdCA9IFN0cmluZy5wcm90b3R5cGUuY2hhckNvZGVBdDtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSB0aGUgc3BlY2lmaWVkIDggY2hhcmFjdGVycyBsb25nIGhhc2guXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gQml0c1xuICovXG5Mb25nQml0cy5mcm9tSGFzaCA9IGZ1bmN0aW9uIGZyb21IYXNoKGhhc2gpIHtcbiAgICBpZiAoaGFzaCA9PT0gemVyb0hhc2gpXG4gICAgICAgIHJldHVybiB6ZXJvO1xuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMoXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDApXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDEpIDw8IDhcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMikgPDwgMTZcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMykgPDwgMjQpID4+PiAwXG4gICAgLFxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCA0KVxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA1KSA8PCA4XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDYpIDw8IDE2XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDcpIDw8IDI0KSA+Pj4gMFxuICAgICk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIHRoaXMgbG9uZyBiaXRzIHRvIGEgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvSGFzaCA9IGZ1bmN0aW9uIHRvSGFzaCgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgdGhpcy5sbyAgICAgICAgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDggICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiAxNiAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gMjQgICAgICAsXG4gICAgICAgIHRoaXMuaGkgICAgICAgICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiA4ICAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gMTYgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDI0XG4gICAgKTtcbn07XG5cbi8qKlxuICogWmlnLXphZyBlbmNvZGVzIHRoaXMgbG9uZyBiaXRzLlxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IGB0aGlzYFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUuenpFbmNvZGUgPSBmdW5jdGlvbiB6ekVuY29kZSgpIHtcbiAgICB2YXIgbWFzayA9ICAgdGhpcy5oaSA+PiAzMTtcbiAgICB0aGlzLmhpICA9ICgodGhpcy5oaSA8PCAxIHwgdGhpcy5sbyA+Pj4gMzEpIF4gbWFzaykgPj4+IDA7XG4gICAgdGhpcy5sbyAgPSAoIHRoaXMubG8gPDwgMSAgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBaaWctemFnIGRlY29kZXMgdGhpcyBsb25nIGJpdHMuXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS56ekRlY29kZSA9IGZ1bmN0aW9uIHp6RGVjb2RlKCkge1xuICAgIHZhciBtYXNrID0gLSh0aGlzLmxvICYgMSk7XG4gICAgdGhpcy5sbyAgPSAoKHRoaXMubG8gPj4+IDEgfCB0aGlzLmhpIDw8IDMxKSBeIG1hc2spID4+PiAwO1xuICAgIHRoaXMuaGkgID0gKCB0aGlzLmhpID4+PiAxICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoaXMgbG9uZ2JpdHMgd2hlbiBlbmNvZGVkIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoKSB7XG4gICAgdmFyIHBhcnQwID0gIHRoaXMubG8sXG4gICAgICAgIHBhcnQxID0gKHRoaXMubG8gPj4+IDI4IHwgdGhpcy5oaSA8PCA0KSA+Pj4gMCxcbiAgICAgICAgcGFydDIgPSAgdGhpcy5oaSA+Pj4gMjQ7XG4gICAgcmV0dXJuIHBhcnQyID09PSAwXG4gICAgICAgICA/IHBhcnQxID09PSAwXG4gICAgICAgICAgID8gcGFydDAgPCAxNjM4NFxuICAgICAgICAgICAgID8gcGFydDAgPCAxMjggPyAxIDogMlxuICAgICAgICAgICAgIDogcGFydDAgPCAyMDk3MTUyID8gMyA6IDRcbiAgICAgICAgICAgOiBwYXJ0MSA8IDE2Mzg0XG4gICAgICAgICAgICAgPyBwYXJ0MSA8IDEyOCA/IDUgOiA2XG4gICAgICAgICAgICAgOiBwYXJ0MSA8IDIwOTcxNTIgPyA3IDogOFxuICAgICAgICAgOiBwYXJ0MiA8IDEyOCA/IDkgOiAxMDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gZXhwb3J0cztcblxuLy8gdXNlZCB0byByZXR1cm4gYSBQcm9taXNlIHdoZXJlIGNhbGxiYWNrIGlzIG9taXR0ZWRcbnV0aWwuYXNQcm9taXNlID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2FzcHJvbWlzZVwiKTtcblxuLy8gY29udmVydHMgdG8gLyBmcm9tIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbnV0aWwuYmFzZTY0ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2Jhc2U2NFwiKTtcblxuLy8gYmFzZSBjbGFzcyBvZiBycGMuU2VydmljZVxudXRpbC5FdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvZXZlbnRlbWl0dGVyXCIpO1xuXG4vLyBmbG9hdCBoYW5kbGluZyBhY2Nyb3NzIGJyb3dzZXJzXG51dGlsLmZsb2F0ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2Zsb2F0XCIpO1xuXG4vLyByZXF1aXJlcyBtb2R1bGVzIG9wdGlvbmFsbHkgYW5kIGhpZGVzIHRoZSBjYWxsIGZyb20gYnVuZGxlcnNcbnV0aWwuaW5xdWlyZSA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9pbnF1aXJlXCIpO1xuXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gdXRmOCBlbmNvZGVkIHN0cmluZ3NcbnV0aWwudXRmOCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy91dGY4XCIpO1xuXG4vLyBwcm92aWRlcyBhIG5vZGUtbGlrZSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlclxudXRpbC5wb29sID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL3Bvb2xcIik7XG5cbi8vIHV0aWxpdHkgdG8gd29yayB3aXRoIHRoZSBsb3cgYW5kIGhpZ2ggYml0cyBvZiBhIDY0IGJpdCB2YWx1ZVxudXRpbC5Mb25nQml0cyA9IHJlcXVpcmUoXCIuL2xvbmdiaXRzXCIpO1xuXG4vKipcbiAqIFdoZXRoZXIgcnVubmluZyB3aXRoaW4gbm9kZSBvciBub3QuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbnV0aWwuaXNOb2RlID0gQm9vbGVhbih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9uc1xuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuXG4vKipcbiAqIEdsb2JhbCBvYmplY3QgcmVmZXJlbmNlLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnV0aWwuZ2xvYmFsID0gdXRpbC5pc05vZGUgJiYgZ2xvYmFsXG4gICAgICAgICAgIHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93XG4gICAgICAgICAgIHx8IHR5cGVvZiBzZWxmICAgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZlxuICAgICAgICAgICB8fCB0aGlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWludmFsaWQtdGhpc1xuXG4vKipcbiAqIEFuIGltbXVhYmxlIGVtcHR5IGFycmF5LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtBcnJheS48Kj59XG4gKiBAY29uc3RcbiAqL1xudXRpbC5lbXB0eUFycmF5ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoW10pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gW107IC8vIHVzZWQgb24gcHJvdG90eXBlc1xuXG4vKipcbiAqIEFuIGltbXV0YWJsZSBlbXB0eSBvYmplY3QuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQGNvbnN0XG4gKi9cbnV0aWwuZW1wdHlPYmplY3QgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZSh7fSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB7fTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXJcbiAqL1xudXRpbC5pc0ludGVnZXIgPSBOdW1iZXIuaXNJbnRlZ2VyIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmdcbiAqL1xudXRpbC5pc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZztcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3RcbiAqL1xudXRpbC5pc09iamVjdCA9IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgb24gYSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudC5cbiAqIFRoaXMgaXMgYW4gYWxpYXMgb2Yge0BsaW5rIHV0aWwuaXNTZXR9LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xudXRpbC5pc3NldCA9XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgb24gYSBtZXNzYWdlIGlzIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogUGxhaW4gb2JqZWN0IG9yIG1lc3NhZ2UgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxuICovXG51dGlsLmlzU2V0ID0gZnVuY3Rpb24gaXNTZXQob2JqLCBwcm9wKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXEsIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGgpID4gMDtcbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIEFueSBjb21wYXRpYmxlIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBCdWZmZXIgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IG5vZGUncyB0eXBpbmdzLlxuICogQGludGVyZmFjZSBCdWZmZXJcbiAqIEBleHRlbmRzIFVpbnQ4QXJyYXlcbiAqL1xuXG4vKipcbiAqIE5vZGUncyBCdWZmZXIgY2xhc3MgaWYgYXZhaWxhYmxlLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPEJ1ZmZlcj59XG4gKi9cbnV0aWwuQnVmZmVyID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBCdWZmZXIgPSB1dGlsLmlucXVpcmUoXCJidWZmZXJcIikuQnVmZmVyO1xuICAgICAgICAvLyByZWZ1c2UgdG8gdXNlIG5vbi1ub2RlIGJ1ZmZlcnMgaWYgbm90IGV4cGxpY2l0bHkgYXNzaWduZWQgKHBlcmYgcmVhc29ucyk6XG4gICAgICAgIHJldHVybiBCdWZmZXIucHJvdG90eXBlLnV0ZjhXcml0ZSA/IEJ1ZmZlciA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59KSgpO1xuXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZnVsbCBmb3IgQnVmZmVyLmZyb20uXG51dGlsLl9CdWZmZXJfZnJvbSA9IG51bGw7XG5cbi8vIEludGVybmFsIGFsaWFzIG9mIG9yIHBvbHlmaWxsIGZvciBCdWZmZXIuYWxsb2NVbnNhZmUuXG51dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBudWxsO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYnVmZmVyIG9mIHdoYXRldmVyIHR5cGUgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfG51bWJlcltdfSBbc2l6ZU9yQXJyYXk9MF0gQnVmZmVyIHNpemUgb3IgbnVtYmVyIGFycmF5XG4gKiBAcmV0dXJucyB7VWludDhBcnJheXxCdWZmZXJ9IEJ1ZmZlclxuICovXG51dGlsLm5ld0J1ZmZlciA9IGZ1bmN0aW9uIG5ld0J1ZmZlcihzaXplT3JBcnJheSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcmV0dXJuIHR5cGVvZiBzaXplT3JBcnJheSA9PT0gXCJudW1iZXJcIlxuICAgICAgICA/IHV0aWwuQnVmZmVyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZShzaXplT3JBcnJheSlcbiAgICAgICAgICAgIDogbmV3IHV0aWwuQXJyYXkoc2l6ZU9yQXJyYXkpXG4gICAgICAgIDogdXRpbC5CdWZmZXJcbiAgICAgICAgICAgID8gdXRpbC5fQnVmZmVyX2Zyb20oc2l6ZU9yQXJyYXkpXG4gICAgICAgICAgICA6IHR5cGVvZiBVaW50OEFycmF5ID09PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgPyBzaXplT3JBcnJheVxuICAgICAgICAgICAgICAgIDogbmV3IFVpbnQ4QXJyYXkoc2l6ZU9yQXJyYXkpO1xufTtcblxuLyoqXG4gKiBBcnJheSBpbXBsZW1lbnRhdGlvbiB1c2VkIGluIHRoZSBicm93c2VyLiBgVWludDhBcnJheWAgaWYgc3VwcG9ydGVkLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxVaW50OEFycmF5Pn1cbiAqL1xudXRpbC5BcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiID8gVWludDhBcnJheSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA6IEFycmF5O1xuXG4vKipcbiAqIEFueSBjb21wYXRpYmxlIExvbmcgaW5zdGFuY2UuXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgTG9uZyBpbnN0YW5jZS4gVGhlIGFjdHVhbCB0eXBlIGlzIHRoYXQgZXhwb3J0ZWQgYnkgbG9uZy5qcy5cbiAqIEBpbnRlcmZhY2UgTG9uZ1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGxvdyBMb3cgYml0c1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGhpZ2ggSGlnaCBiaXRzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHVuc2lnbmVkIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKi9cblxuLyoqXG4gKiBMb25nLmpzJ3MgTG9uZyBjbGFzcyBpZiBhdmFpbGFibGUuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8TG9uZz59XG4gKi9cbnV0aWwuTG9uZyA9IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLmRjb2RlSU8gJiYgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuZGNvZGVJTy5Mb25nXG4gICAgICAgICB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5Mb25nXG4gICAgICAgICB8fCB1dGlsLmlucXVpcmUoXCJsb25nXCIpO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAyIGJpdCAoYGJvb2xgKSBtYXAga2V5cy5cbiAqIEB0eXBlIHtSZWdFeHB9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5rZXkyUmUgPSAvXnRydWV8ZmFsc2V8MHwxJC87XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDMyIGJpdCAoYGludDMyYCBldGMuKSBtYXAga2V5cy5cbiAqIEB0eXBlIHtSZWdFeHB9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5rZXkzMlJlID0gL14tPyg/OjB8WzEtOV1bMC05XSopJC87XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDY0IGJpdCAoYGludDY0YCBldGMuKSBtYXAga2V5cy5cbiAqIEB0eXBlIHtSZWdFeHB9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5rZXk2NFJlID0gL14oPzpbXFxcXHgwMC1cXFxceGZmXXs4fXwtPyg/OjB8WzEtOV1bMC05XSopKSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgbnVtYmVyIG9yIGxvbmcgdG8gYW4gOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaCBzdHJpbmcuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXG4gKi9cbnV0aWwubG9uZ1RvSGFzaCA9IGZ1bmN0aW9uIGxvbmdUb0hhc2godmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgPyB1dGlsLkxvbmdCaXRzLmZyb20odmFsdWUpLnRvSGFzaCgpXG4gICAgICAgIDogdXRpbC5Mb25nQml0cy56ZXJvSGFzaDtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYW4gOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaCBzdHJpbmcgdG8gYSBsb25nIG9yIG51bWJlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIEhhc2hcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge0xvbmd8bnVtYmVyfSBPcmlnaW5hbCB2YWx1ZVxuICovXG51dGlsLmxvbmdGcm9tSGFzaCA9IGZ1bmN0aW9uIGxvbmdGcm9tSGFzaChoYXNoLCB1bnNpZ25lZCkge1xuICAgIHZhciBiaXRzID0gdXRpbC5Mb25nQml0cy5mcm9tSGFzaChoYXNoKTtcbiAgICBpZiAodXRpbC5Mb25nKVxuICAgICAgICByZXR1cm4gdXRpbC5Mb25nLmZyb21CaXRzKGJpdHMubG8sIGJpdHMuaGksIHVuc2lnbmVkKTtcbiAgICByZXR1cm4gYml0cy50b051bWJlcihCb29sZWFuKHVuc2lnbmVkKSk7XG59O1xuXG4vKipcbiAqIE1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgc291cmNlIG9iamVjdCBpbnRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gZHN0IERlc3RpbmF0aW9uIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gc3JjIFNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lmTm90U2V0PWZhbHNlXSBNZXJnZXMgb25seSBpZiB0aGUga2V5IGlzIG5vdCBhbHJlYWR5IHNldFxuICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBEZXN0aW5hdGlvbiBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoZHN0LCBzcmMsIGlmTm90U2V0KSB7IC8vIHVzZWQgYnkgY29udmVydGVyc1xuICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgIGlmIChkc3Rba2V5c1tpXV0gPT09IHVuZGVmaW5lZCB8fCAhaWZOb3RTZXQpXG4gICAgICAgICAgICBkc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XG4gICAgcmV0dXJuIGRzdDtcbn1cblxudXRpbC5tZXJnZSA9IG1lcmdlO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYSBzdHJpbmcgdG8gbG93ZXIgY2FzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgU3RyaW5nIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IENvbnZlcnRlZCBzdHJpbmdcbiAqL1xudXRpbC5sY0ZpcnN0ID0gZnVuY3Rpb24gbGNGaXJzdChzdHIpIHtcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cmluZygxKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGN1c3RvbSBlcnJvciBjb25zdHJ1Y3Rvci5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBFcnJvciBuYW1lXG4gKiBAcmV0dXJucyB7Q29uc3RydWN0b3I8RXJyb3I+fSBDdXN0b20gZXJyb3IgY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gbmV3RXJyb3IobmFtZSkge1xuXG4gICAgZnVuY3Rpb24gQ3VzdG9tRXJyb3IobWVzc2FnZSwgcHJvcGVydGllcykge1xuXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDdXN0b21FcnJvcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpO1xuXG4gICAgICAgIC8vIEVycm9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG4gICAgICAgIC8vIF4ganVzdCByZXR1cm5zIGEgbmV3IGVycm9yIGluc3RhbmNlIGJlY2F1c2UgdGhlIGN0b3IgY2FuIGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uXG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibWVzc2FnZVwiLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtZXNzYWdlOyB9IH0pO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkgLy8gbm9kZVxuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ3VzdG9tRXJyb3IpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzdGFja1wiLCB7IHZhbHVlOiBuZXcgRXJyb3IoKS5zdGFjayB8fCBcIlwiIH0pO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgbWVyZ2UodGhpcywgcHJvcGVydGllcyk7XG4gICAgfVxuXG4gICAgKEN1c3RvbUVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBDdXN0b21FcnJvcjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDdXN0b21FcnJvci5wcm90b3R5cGUsIFwibmFtZVwiLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBuYW1lOyB9IH0pO1xuXG4gICAgQ3VzdG9tRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIjogXCIgKyB0aGlzLm1lc3NhZ2U7XG4gICAgfTtcblxuICAgIHJldHVybiBDdXN0b21FcnJvcjtcbn1cblxudXRpbC5uZXdFcnJvciA9IG5ld0Vycm9yO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgcHJvdG9jb2wgZXJyb3IuXG4gKiBAY2xhc3NkZXNjIEVycm9yIHN1YmNsYXNzIGluZGljYXRpbmcgYSBwcm90b2NvbCBzcGVjaWZjIGVycm9yLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBleHRlbmRzIEVycm9yXG4gKiBAdGVtcGxhdGUgVCBleHRlbmRzIE1lc3NhZ2U8VD5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gW3Byb3BlcnRpZXNdIEFkZGl0aW9uYWwgcHJvcGVydGllc1xuICogQGV4YW1wbGVcbiAqIHRyeSB7XG4gKiAgICAgTXlNZXNzYWdlLmRlY29kZShzb21lQnVmZmVyKTsgLy8gdGhyb3dzIGlmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICogfSBjYXRjaCAoZSkge1xuICogICAgIGlmIChlIGluc3RhbmNlb2YgUHJvdG9jb2xFcnJvciAmJiBlLmluc3RhbmNlKVxuICogICAgICAgICBjb25zb2xlLmxvZyhcImRlY29kZWQgc28gZmFyOiBcIiArIEpTT04uc3RyaW5naWZ5KGUuaW5zdGFuY2UpKTtcbiAqIH1cbiAqL1xudXRpbC5Qcm90b2NvbEVycm9yID0gbmV3RXJyb3IoXCJQcm90b2NvbEVycm9yXCIpO1xuXG4vKipcbiAqIFNvIGZhciBkZWNvZGVkIG1lc3NhZ2UgaW5zdGFuY2UuXG4gKiBAbmFtZSB1dGlsLlByb3RvY29sRXJyb3IjaW5zdGFuY2VcbiAqIEB0eXBlIHtNZXNzYWdlPFQ+fVxuICovXG5cbi8qKlxuICogQSBPbmVPZiBnZXR0ZXIgYXMgcmV0dXJuZWQgYnkge0BsaW5rIHV0aWwub25lT2ZHZXR0ZXJ9LlxuICogQHR5cGVkZWYgT25lT2ZHZXR0ZXJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBTZXQgZmllbGQgbmFtZSwgaWYgYW55XG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBnZXR0ZXIgZm9yIGEgb25lb2YncyBwcmVzZW50IGZpZWxkIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXG4gKiBAcmV0dXJucyB7T25lT2ZHZXR0ZXJ9IFVuYm91bmQgZ2V0dGVyXG4gKi9cbnV0aWwub25lT2ZHZXR0ZXIgPSBmdW5jdGlvbiBnZXRPbmVPZihmaWVsZE5hbWVzKSB7XG4gICAgdmFyIGZpZWxkTWFwID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxuICAgICAgICBmaWVsZE1hcFtmaWVsZE5hbWVzW2ldXSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxuICAgICAqIEB0aGlzIE9iamVjdFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpLCBpID0ga2V5cy5sZW5ndGggLSAxOyBpID4gLTE7IC0taSlcbiAgICAgICAgICAgIGlmIChmaWVsZE1hcFtrZXlzW2ldXSA9PT0gMSAmJiB0aGlzW2tleXNbaV1dICE9PSB1bmRlZmluZWQgJiYgdGhpc1trZXlzW2ldXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5c1tpXTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBBIE9uZU9mIHNldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZlNldHRlcn0uXG4gKiBAdHlwZWRlZiBPbmVPZlNldHRlclxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSB2YWx1ZSBGaWVsZCBuYW1lXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbi8qKlxuICogQnVpbGRzIGEgc2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xuICogQHJldHVybnMge09uZU9mU2V0dGVyfSBVbmJvdW5kIHNldHRlclxuICovXG51dGlsLm9uZU9mU2V0dGVyID0gZnVuY3Rpb24gc2V0T25lT2YoZmllbGROYW1lcykge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRmllbGQgbmFtZVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICogQHRoaXMgT2JqZWN0XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGlmIChmaWVsZE5hbWVzW2ldICE9PSBuYW1lKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2ZpZWxkTmFtZXNbaV1dO1xuICAgIH07XG59O1xuXG4vKipcbiAqIERlZmF1bHQgY29udmVyc2lvbiBvcHRpb25zIHVzZWQgZm9yIHtAbGluayBNZXNzYWdlI3RvSlNPTn0gaW1wbGVtZW50YXRpb25zLlxuICpcbiAqIFRoZXNlIG9wdGlvbnMgYXJlIGNsb3NlIHRvIHByb3RvMydzIEpTT04gbWFwcGluZyB3aXRoIHRoZSBleGNlcHRpb24gdGhhdCBpbnRlcm5hbCB0eXBlcyBsaWtlIEFueSBhcmUgaGFuZGxlZCBqdXN0IGxpa2UgbWVzc2FnZXMuIE1vcmUgcHJlY2lzZWx5OlxuICpcbiAqIC0gTG9uZ3MgYmVjb21lIHN0cmluZ3NcbiAqIC0gRW51bXMgYmVjb21lIHN0cmluZyBrZXlzXG4gKiAtIEJ5dGVzIGJlY29tZSBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG4gKiAtIChTdWItKU1lc3NhZ2VzIGJlY29tZSBwbGFpbiBvYmplY3RzXG4gKiAtIE1hcHMgYmVjb21lIHBsYWluIG9iamVjdHMgd2l0aCBhbGwgc3RyaW5nIGtleXNcbiAqIC0gUmVwZWF0ZWQgZmllbGRzIGJlY29tZSBhcnJheXNcbiAqIC0gTmFOIGFuZCBJbmZpbml0eSBmb3IgZmxvYXQgYW5kIGRvdWJsZSBmaWVsZHMgYmVjb21lIHN0cmluZ3NcbiAqXG4gKiBAdHlwZSB7SUNvbnZlcnNpb25PcHRpb25zfVxuICogQHNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcHJvdG8zP2hsPWVuI2pzb25cbiAqL1xudXRpbC50b0pTT05PcHRpb25zID0ge1xuICAgIGxvbmdzOiBTdHJpbmcsXG4gICAgZW51bXM6IFN0cmluZyxcbiAgICBieXRlczogU3RyaW5nLFxuICAgIGpzb246IHRydWVcbn07XG5cbi8vIFNldHMgdXAgYnVmZmVyIHV0aWxpdHkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudCAoY2FsbGVkIGluIGluZGV4LW1pbmltYWwpXG51dGlsLl9jb25maWd1cmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgQnVmZmVyID0gdXRpbC5CdWZmZXI7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCFCdWZmZXIpIHtcbiAgICAgICAgdXRpbC5fQnVmZmVyX2Zyb20gPSB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGJlY2F1c2Ugbm9kZSA0LnggYnVmZmVycyBhcmUgaW5jb21wYXRpYmxlICYgaW1tdXRhYmxlXG4gICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNvZGVJTy9wcm90b2J1Zi5qcy9wdWxsLzY2NVxuICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gQnVmZmVyLmZyb20gIT09IFVpbnQ4QXJyYXkuZnJvbSAmJiBCdWZmZXIuZnJvbSB8fFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfZnJvbSh2YWx1ZSwgZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyKHZhbHVlLCBlbmNvZGluZyk7XG4gICAgICAgIH07XG4gICAgdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gQnVmZmVyLmFsbG9jVW5zYWZlIHx8XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZ1bmN0aW9uIEJ1ZmZlcl9hbGxvY1Vuc2FmZShzaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzaXplKTtcbiAgICAgICAgfTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gV3JpdGVyO1xuXG52YXIgdXRpbCAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG52YXIgQnVmZmVyV3JpdGVyOyAvLyBjeWNsaWNcblxudmFyIExvbmdCaXRzICA9IHV0aWwuTG9uZ0JpdHMsXG4gICAgYmFzZTY0ICAgID0gdXRpbC5iYXNlNjQsXG4gICAgdXRmOCAgICAgID0gdXRpbC51dGY4O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIG9wZXJhdGlvbiBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgU2NoZWR1bGVkIHdyaXRlciBvcGVyYXRpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgVWludDhBcnJheSwgbnVtYmVyKX0gZm4gRnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxuICogQHBhcmFtIHsqfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gT3AoZm4sIGxlbiwgdmFsKSB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBjYWxsLlxuICAgICAqIEB0eXBlIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfVxuICAgICAqL1xuICAgIHRoaXMuZm4gPSBmbjtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIGJ5dGUgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSBsZW47XG5cbiAgICAvKipcbiAgICAgKiBOZXh0IG9wZXJhdGlvbi5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSB0byB3cml0ZS5cbiAgICAgKiBAdHlwZSB7Kn1cbiAgICAgKi9cbiAgICB0aGlzLnZhbCA9IHZhbDsgLy8gdHlwZSB2YXJpZXNcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIG5vb3AoKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5LWZ1bmN0aW9uXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgc3RhdGUgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIENvcGllZCB3cml0ZXIgc3RhdGUuXG4gKiBAbWVtYmVyb2YgV3JpdGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7V3JpdGVyfSB3cml0ZXIgV3JpdGVyIHRvIGNvcHkgc3RhdGUgZnJvbVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBTdGF0ZSh3cml0ZXIpIHtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaGVhZC5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxuICAgICAqL1xuICAgIHRoaXMuaGVhZCA9IHdyaXRlci5oZWFkO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCB0YWlsLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XG4gICAgICovXG4gICAgdGhpcy50YWlsID0gd3JpdGVyLnRhaWw7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGJ1ZmZlciBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IHdyaXRlci5sZW47XG5cbiAgICAvKipcbiAgICAgKiBOZXh0IHN0YXRlLlxuICAgICAqIEB0eXBlIHtTdGF0ZXxudWxsfVxuICAgICAqL1xuICAgIHRoaXMubmV4dCA9IHdyaXRlci5zdGF0ZXM7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBXcml0ZXIoKSB7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gMDtcblxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnMgaGVhZC5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuaGVhZCA9IG5ldyBPcChub29wLCAwLCAwKTtcblxuICAgIC8qKlxuICAgICAqIE9wZXJhdGlvbnMgdGFpbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy50YWlsID0gdGhpcy5oZWFkO1xuXG4gICAgLyoqXG4gICAgICogTGlua2VkIGZvcmtlZCBzdGF0ZXMuXG4gICAgICogQHR5cGUge09iamVjdHxudWxsfVxuICAgICAqL1xuICAgIHRoaXMuc3RhdGVzID0gbnVsbDtcblxuICAgIC8vIFdoZW4gYSB2YWx1ZSBpcyB3cml0dGVuLCB0aGUgd3JpdGVyIGNhbGN1bGF0ZXMgaXRzIGJ5dGUgbGVuZ3RoIGFuZCBwdXRzIGl0IGludG8gYSBsaW5rZWRcbiAgICAvLyBsaXN0IG9mIG9wZXJhdGlvbnMgdG8gcGVyZm9ybSB3aGVuIGZpbmlzaCgpIGlzIGNhbGxlZC4gVGhpcyBib3RoIGFsbG93cyB1cyB0byBhbGxvY2F0ZVxuICAgIC8vIGJ1ZmZlcnMgb2YgdGhlIGV4YWN0IHJlcXVpcmVkIHNpemUgYW5kIHJlZHVjZXMgdGhlIGFtb3VudCBvZiB3b3JrIHdlIGhhdmUgdG8gZG8gY29tcGFyZWRcbiAgICAvLyB0byBmaXJzdCBjYWxjdWxhdGluZyBvdmVyIG9iamVjdHMgYW5kIHRoZW4gZW5jb2Rpbmcgb3ZlciBvYmplY3RzLiBJbiBvdXIgY2FzZSwgdGhlIGVuY29kaW5nXG4gICAgLy8gcGFydCBpcyBqdXN0IGEgbGlua2VkIGxpc3Qgd2FsayBjYWxsaW5nIG9wZXJhdGlvbnMgd2l0aCBhbHJlYWR5IHByZXBhcmVkIHZhbHVlcy5cbn1cblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gdXRpbC5CdWZmZXJcbiAgICAgICAgPyBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyX3NldHVwKCkge1xuICAgICAgICAgICAgcmV0dXJuIChXcml0ZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcldyaXRlcigpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGZ1bmN0aW9uIGNyZWF0ZV9hcnJheSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgV3JpdGVyKCk7XG4gICAgICAgIH07XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgd3JpdGVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyV3JpdGVyfFdyaXRlcn0gQSB7QGxpbmsgQnVmZmVyV3JpdGVyfSB3aGVuIEJ1ZmZlcnMgYXJlIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGEge0BsaW5rIFdyaXRlcn1cbiAqL1xuV3JpdGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuXG4vKipcbiAqIEFsbG9jYXRlcyBhIGJ1ZmZlciBvZiB0aGUgc3BlY2lmaWVkIHNpemUuXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxuICovXG5Xcml0ZXIuYWxsb2MgPSBmdW5jdGlvbiBhbGxvYyhzaXplKSB7XG4gICAgcmV0dXJuIG5ldyB1dGlsLkFycmF5KHNpemUpO1xufTtcblxuLy8gVXNlIFVpbnQ4QXJyYXkgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXIsIGp1c3QgbGlrZSBub2RlIGRvZXMgd2l0aCBidWZmZXJzXG4vKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuaWYgKHV0aWwuQXJyYXkgIT09IEFycmF5KVxuICAgIFdyaXRlci5hbGxvYyA9IHV0aWwucG9vbChXcml0ZXIuYWxsb2MsIHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5KTtcblxuLyoqXG4gKiBQdXNoZXMgYSBuZXcgb3BlcmF0aW9uIHRvIHRoZSBxdWV1ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oVWludDhBcnJheSwgbnVtYmVyLCAqKX0gZm4gRnVuY3Rpb24gdG8gY2FsbFxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAcHJpdmF0ZVxuICovXG5Xcml0ZXIucHJvdG90eXBlLl9wdXNoID0gZnVuY3Rpb24gcHVzaChmbiwgbGVuLCB2YWwpIHtcbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwubmV4dCA9IG5ldyBPcChmbiwgbGVuLCB2YWwpO1xuICAgIHRoaXMubGVuICs9IGxlbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHdyaXRlQnl0ZSh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgYnVmW3Bvc10gPSB2YWwgJiAyNTU7XG59XG5cbmZ1bmN0aW9uIHdyaXRlVmFyaW50MzIodmFsLCBidWYsIHBvcykge1xuICAgIHdoaWxlICh2YWwgPiAxMjcpIHtcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbCAmIDEyNyB8IDEyODtcbiAgICAgICAgdmFsID4+Pj0gNztcbiAgICB9XG4gICAgYnVmW3Bvc10gPSB2YWw7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB2YXJpbnQgd3JpdGVyIG9wZXJhdGlvbiBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgU2NoZWR1bGVkIHZhcmludCB3cml0ZXIgb3BlcmF0aW9uLlxuICogQGV4dGVuZHMgT3BcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbiBWYWx1ZSBieXRlIGxlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBWYXJpbnRPcChsZW4sIHZhbCkge1xuICAgIHRoaXMubGVuID0gbGVuO1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnZhbCA9IHZhbDtcbn1cblxuVmFyaW50T3AucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPcC5wcm90b3R5cGUpO1xuVmFyaW50T3AucHJvdG90eXBlLmZuID0gd3JpdGVWYXJpbnQzMjtcblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS51aW50MzIgPSBmdW5jdGlvbiB3cml0ZV91aW50MzIodmFsdWUpIHtcbiAgICAvLyBoZXJlLCB0aGUgY2FsbCB0byB0aGlzLnB1c2ggaGFzIGJlZW4gaW5saW5lZCBhbmQgYSB2YXJpbnQgc3BlY2lmaWMgT3Agc3ViY2xhc3MgaXMgdXNlZC5cbiAgICAvLyB1aW50MzIgaXMgYnkgZmFyIHRoZSBtb3N0IGZyZXF1ZW50bHkgdXNlZCBvcGVyYXRpb24gYW5kIGJlbmVmaXRzIHNpZ25pZmljYW50bHkgZnJvbSB0aGlzLlxuICAgIHRoaXMubGVuICs9ICh0aGlzLnRhaWwgPSB0aGlzLnRhaWwubmV4dCA9IG5ldyBWYXJpbnRPcChcbiAgICAgICAgKHZhbHVlID0gdmFsdWUgPj4+IDApXG4gICAgICAgICAgICAgICAgPCAxMjggICAgICAgPyAxXG4gICAgICAgIDogdmFsdWUgPCAxNjM4NCAgICAgPyAyXG4gICAgICAgIDogdmFsdWUgPCAyMDk3MTUyICAgPyAzXG4gICAgICAgIDogdmFsdWUgPCAyNjg0MzU0NTYgPyA0XG4gICAgICAgIDogICAgICAgICAgICAgICAgICAgICA1LFxuICAgIHZhbHVlKSkubGVuO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmludDMyID0gZnVuY3Rpb24gd3JpdGVfaW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPCAwXG4gICAgICAgID8gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCAxMCwgTG9uZ0JpdHMuZnJvbU51bWJlcih2YWx1ZSkpIC8vIDEwIGJ5dGVzIHBlciBzcGVjXG4gICAgICAgIDogdGhpcy51aW50MzIodmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQsIHppZy16YWcgZW5jb2RlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ludDMyID0gZnVuY3Rpb24gd3JpdGVfc2ludDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCh2YWx1ZSA8PCAxIF4gdmFsdWUgPj4gMzEpID4+PiAwKTtcbn07XG5cbmZ1bmN0aW9uIHdyaXRlVmFyaW50NjQodmFsLCBidWYsIHBvcykge1xuICAgIHdoaWxlICh2YWwuaGkpIHtcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbC5sbyAmIDEyNyB8IDEyODtcbiAgICAgICAgdmFsLmxvID0gKHZhbC5sbyA+Pj4gNyB8IHZhbC5oaSA8PCAyNSkgPj4+IDA7XG4gICAgICAgIHZhbC5oaSA+Pj49IDc7XG4gICAgfVxuICAgIHdoaWxlICh2YWwubG8gPiAxMjcpIHtcbiAgICAgICAgYnVmW3BvcysrXSA9IHZhbC5sbyAmIDEyNyB8IDEyODtcbiAgICAgICAgdmFsLmxvID0gdmFsLmxvID4+PiA3O1xuICAgIH1cbiAgICBidWZbcG9zKytdID0gdmFsLmxvO1xufVxuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS51aW50NjQgPSBmdW5jdGlvbiB3cml0ZV91aW50NjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5pbnQ2NCA9IFdyaXRlci5wcm90b3R5cGUudWludDY0O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQsIHppZy16YWcgZW5jb2RlZC5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSkuenpFbmNvZGUoKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCBiaXRzLmxlbmd0aCgpLCBiaXRzKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgYm9vbGlzaCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiB3cml0ZV9ib29sKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCB2YWx1ZSA/IDEgOiAwKTtcbn07XG5cbmZ1bmN0aW9uIHdyaXRlRml4ZWQzMih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCAgICAgICAgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDggICAmIDI1NTtcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiAxNiAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCA+Pj4gMjQ7XG59XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBmaXhlZCAzMiBiaXRzLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maXhlZDMyID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQzMih2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgdmFsdWUgPj4+IDApO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkMzI7XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBmaXhlZCA2NCBiaXRzLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZml4ZWQ2NCA9IGZ1bmN0aW9uIHdyaXRlX2ZpeGVkNjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgYml0cy5sbykuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmhpKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBmaXhlZCA2NCBiaXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zZml4ZWQ2NCA9IFdyaXRlci5wcm90b3R5cGUuZml4ZWQ2NDtcblxuLyoqXG4gKiBXcml0ZXMgYSBmbG9hdCAoMzIgYml0KS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5mbG9hdCA9IGZ1bmN0aW9uIHdyaXRlX2Zsb2F0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2godXRpbC5mbG9hdC53cml0ZUZsb2F0TEUsIDQsIHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHdyaXRlX2RvdWJsZSh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVEb3VibGVMRSwgOCwgdmFsdWUpO1xufTtcblxudmFyIHdyaXRlQnl0ZXMgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zZXRcbiAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfc2V0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgYnVmLnNldCh2YWwsIHBvcyk7IC8vIGFsc28gd29ya3MgZm9yIHBsYWluIGFycmF5IHZhbHVlc1xuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIDogZnVuY3Rpb24gd3JpdGVCeXRlc19mb3IodmFsLCBidWYsIHBvcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGJ1Zltwb3MgKyBpXSA9IHZhbFtpXTtcbiAgICB9O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNlcXVlbmNlIG9mIGJ5dGVzLlxuICogQHBhcmFtIHtVaW50OEFycmF5fHN0cmluZ30gdmFsdWUgQnVmZmVyIG9yIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiB3cml0ZV9ieXRlcyh2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGggPj4+IDA7XG4gICAgaWYgKCFsZW4pXG4gICAgICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIHZhciBidWYgPSBXcml0ZXIuYWxsb2MobGVuID0gYmFzZTY0Lmxlbmd0aCh2YWx1ZSkpO1xuICAgICAgICBiYXNlNjQuZGVjb2RlKHZhbHVlLCBidWYsIDApO1xuICAgICAgICB2YWx1ZSA9IGJ1ZjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudWludDMyKGxlbikuX3B1c2god3JpdGVCeXRlcywgbGVuLCB2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gd3JpdGVfc3RyaW5nKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHV0ZjgubGVuZ3RoKHZhbHVlKTtcbiAgICByZXR1cm4gbGVuXG4gICAgICAgID8gdGhpcy51aW50MzIobGVuKS5fcHVzaCh1dGY4LndyaXRlLCBsZW4sIHZhbHVlKVxuICAgICAgICA6IHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcbn07XG5cbi8qKlxuICogRm9ya3MgdGhpcyB3cml0ZXIncyBzdGF0ZSBieSBwdXNoaW5nIGl0IHRvIGEgc3RhY2suXG4gKiBDYWxsaW5nIHtAbGluayBXcml0ZXIjcmVzZXR8cmVzZXR9IG9yIHtAbGluayBXcml0ZXIjbGRlbGltfGxkZWxpbX0gcmVzZXRzIHRoZSB3cml0ZXIgdG8gdGhlIHByZXZpb3VzIHN0YXRlLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZm9yayA9IGZ1bmN0aW9uIGZvcmsoKSB7XG4gICAgdGhpcy5zdGF0ZXMgPSBuZXcgU3RhdGUodGhpcyk7XG4gICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuICAgIHRoaXMubGVuID0gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzZXRzIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGxhc3Qgc3RhdGUuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGlmICh0aGlzLnN0YXRlcykge1xuICAgICAgICB0aGlzLmhlYWQgICA9IHRoaXMuc3RhdGVzLmhlYWQ7XG4gICAgICAgIHRoaXMudGFpbCAgID0gdGhpcy5zdGF0ZXMudGFpbDtcbiAgICAgICAgdGhpcy5sZW4gICAgPSB0aGlzLnN0YXRlcy5sZW47XG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5zdGF0ZXMubmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG4gICAgICAgIHRoaXMubGVuICA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldHMgdG8gdGhlIGxhc3Qgc3RhdGUgYW5kIGFwcGVuZHMgdGhlIGZvcmsgc3RhdGUncyBjdXJyZW50IHdyaXRlIGxlbmd0aCBhcyBhIHZhcmludCBmb2xsb3dlZCBieSBpdHMgb3BlcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmxkZWxpbSA9IGZ1bmN0aW9uIGxkZWxpbSgpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZCxcbiAgICAgICAgdGFpbCA9IHRoaXMudGFpbCxcbiAgICAgICAgbGVuICA9IHRoaXMubGVuO1xuICAgIHRoaXMucmVzZXQoKS51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKSB7XG4gICAgICAgIHRoaXMudGFpbC5uZXh0ID0gaGVhZC5uZXh0OyAvLyBza2lwIG5vb3BcbiAgICAgICAgdGhpcy50YWlsID0gdGFpbDtcbiAgICAgICAgdGhpcy5sZW4gKz0gbGVuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRmluaXNoZXMgdGhlIHdyaXRlIG9wZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBGaW5pc2hlZCBidWZmZXJcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQubmV4dCwgLy8gc2tpcCBub29wXG4gICAgICAgIGJ1ZiAgPSB0aGlzLmNvbnN0cnVjdG9yLmFsbG9jKHRoaXMubGVuKSxcbiAgICAgICAgcG9zICA9IDA7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgICAgaGVhZC5mbihoZWFkLnZhbCwgYnVmLCBwb3MpO1xuICAgICAgICBwb3MgKz0gaGVhZC5sZW47XG4gICAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgfVxuICAgIC8vIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgcmV0dXJuIGJ1Zjtcbn07XG5cbldyaXRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyV3JpdGVyXykge1xuICAgIEJ1ZmZlcldyaXRlciA9IEJ1ZmZlcldyaXRlcl87XG4gICAgV3JpdGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuICAgIEJ1ZmZlcldyaXRlci5fY29uZmlndXJlKCk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcldyaXRlcjtcblxuLy8gZXh0ZW5kcyBXcml0ZXJcbnZhciBXcml0ZXIgPSByZXF1aXJlKFwiLi93cml0ZXJcIik7XG4oQnVmZmVyV3JpdGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoV3JpdGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyV3JpdGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciB3cml0ZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHdyaXRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXG4gKiBAZXh0ZW5kcyBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBCdWZmZXJXcml0ZXIoKSB7XG4gICAgV3JpdGVyLmNhbGwodGhpcyk7XG59XG5cbkJ1ZmZlcldyaXRlci5fY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEFsbG9jYXRlcyBhIGJ1ZmZlciBvZiB0aGUgc3BlY2lmaWVkIHNpemUuXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcbiAgICAgKiBAcmV0dXJucyB7QnVmZmVyfSBCdWZmZXJcbiAgICAgKi9cbiAgICBCdWZmZXJXcml0ZXIuYWxsb2MgPSB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmU7XG5cbiAgICBCdWZmZXJXcml0ZXIud3JpdGVCeXRlc0J1ZmZlciA9IHV0aWwuQnVmZmVyICYmIHV0aWwuQnVmZmVyLnByb3RvdHlwZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgJiYgdXRpbC5CdWZmZXIucHJvdG90eXBlLnNldC5uYW1lID09PSBcInNldFwiXG4gICAgICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBmYXN0ZXIgdGhhbiBjb3B5IChyZXF1aXJlcyBub2RlID49IDQgd2hlcmUgQnVmZmVycyBleHRlbmQgVWludDhBcnJheSBhbmQgc2V0IGlzIHByb3Blcmx5IGluaGVyaXRlZClcbiAgICAgICAgICAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfY29weSh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgICAgaWYgKHZhbC5jb3B5KSAvLyBCdWZmZXIgdmFsdWVzXG4gICAgICAgICAgICB2YWwuY29weShidWYsIHBvcywgMCwgdmFsLmxlbmd0aCk7XG4gICAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7KSAvLyBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICAgICAgICAgIGJ1Zltwb3MrK10gPSB2YWxbaSsrXTtcbiAgICAgICAgfTtcbn07XG5cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzX2J1ZmZlcih2YWx1ZSkge1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSlcbiAgICAgICAgdmFsdWUgPSB1dGlsLl9CdWZmZXJfZnJvbSh2YWx1ZSwgXCJiYXNlNjRcIik7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pXG4gICAgICAgIHRoaXMuX3B1c2goQnVmZmVyV3JpdGVyLndyaXRlQnl0ZXNCdWZmZXIsIGxlbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVTdHJpbmdCdWZmZXIodmFsLCBidWYsIHBvcykge1xuICAgIGlmICh2YWwubGVuZ3RoIDwgNDApIC8vIHBsYWluIGpzIGlzIGZhc3RlciBmb3Igc2hvcnQgc3RyaW5ncyAocHJvYmFibHkgZHVlIHRvIHJlZHVuZGFudCBhc3NlcnRpb25zKVxuICAgICAgICB1dGlsLnV0Zjgud3JpdGUodmFsLCBidWYsIHBvcyk7XG4gICAgZWxzZSBpZiAoYnVmLnV0ZjhXcml0ZSlcbiAgICAgICAgYnVmLnV0ZjhXcml0ZSh2YWwsIHBvcyk7XG4gICAgZWxzZVxuICAgICAgICBidWYud3JpdGUodmFsLCBwb3MpO1xufVxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZ19idWZmZXIodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRpbC5CdWZmZXIuYnl0ZUxlbmd0aCh2YWx1ZSk7XG4gICAgdGhpcy51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKVxuICAgICAgICB0aGlzLl9wdXNoKHdyaXRlU3RyaW5nQnVmZmVyLCBsZW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQG5hbWUgQnVmZmVyV3JpdGVyI2ZpbmlzaFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBGaW5pc2hlZCBidWZmZXJcbiAqL1xuXG5CdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSgpO1xuIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1cbiAgXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcbnZhciBfY2xvY2tzZXE7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIHJlcXVpcmUoJy4uL3Rlc3QvdGVzdCcpOyAvLyBydW4gdGVzdC50c1xuaW1wb3J0IHsgY3JkdHMsIG5ldHdvcmsgfSBmcm9tICdjb21wb3ZlbnR1YWxzLWNsaWVudCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbi8qKlxuICogR2V0IEhlcm9rdSBzZXJ2ZXIgaG9zdCBXZWJzb2NrZXQuXG4gKi9cbnZhciBIT1NUID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJylcblxuLyoqXG4gKiBHZW5lcmF0ZSB1dWlkIGZvciBlYWNoIGNsaWVudC5cbiAqL1xuY29uc3QgY2xpZW50X3V1aWQgOiBzdHJpbmcgPSB1dWlkKCk7XG5cbi8qKlxuICogR2VuZXJhdGUgQ1JEVHMnIFJ1bnRpbWUgb24gZWFjaCBjbGllbnQgYW5kIGNyZWF0ZSBDUkRUcyAoZS5nLiBDb3VudGVyQ3JkdCkuXG4gKi9cblxubGV0IGNsaWVudCA9IG5ldyBjcmR0cy5DcmR0UnVudGltZShuZXcgbmV0d29yay5XZWJSdGNOZXR3b3JrKGNsaWVudF91dWlkLCBIT1NUKSk7XG4vL2xldCBjbGllbnRDb3VudGVyID0gbmV3IGNyZHRzLkNvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGNsaWVudCk7XG5sZXQgY2xpZW50Q291bnRlciA9IG5ldyBjcmR0cy5Db3VudGVyQ3JkdChjbGllbnQsIFwiY291bnRlcklkXCIpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgZXZlbnQgbGlzdGVuZXIgZm9yIENSRFQgYXMgcmVmcmVzaCB0aGUgdmFsdWUgKi9cbmNsaWVudENvdW50ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIkFkZFwiLCBfID0+IHtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59KTtcblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBpbmNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5jcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGluY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgxMDApO1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbn1cblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBkZWNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVjcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGRlY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgtMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8vIC8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2Ygc3luYyB0byBzeW5jaHJvbml6ZSB0aGUgdmFsdWUgKi9cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3luY1wiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbi8vIH1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9