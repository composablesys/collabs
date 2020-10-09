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
     * Crdt, undefined, and null.  string, number,
     * undefined, and null types are stored
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
     * Crdt, undefined, and null.  string, number,
     * undefined, and null types are stored
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
     * Crdt, undefined, and null.  string, number,
     * undefined, and null types are stored
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
        this.idCounter = 0;
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
    /**
     * @return A unique string that will only appear once
     * in this CrdtRuntime, obtained by concatenating our
     * replica id with a counter.
     */
    getUid() {
        return (this.idCounter++) + " " + this.getReplicaId();
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
        case "undefined":
            message = { undefinedValue: true };
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
            else if (value === null) {
                message = { nullValue: true };
            }
            else {
                throw new Error("defaultCollectionSerializer only works with values of type string | number | Crdt | undefined | null");
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
        case "undefinedValue":
            return undefined;
        case "nullValue":
            return null;
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
// NOTE: This WebRTC network layer is just a prototype, which only
// two users peer-to-peer connection.
//
// The webrtc network designed for a two-way peer-to-peer interactive
// communication session among two users using WebRTC protocol.
//
// The whole infrastructure is based-on the WebSocket protocol to
// initialize the connection between WebRTC candidates.
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
 * the WebRtc.
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
        console.log("Create dataChannel");
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
                 * Send back the received messages from network to the
                 * registered crdtRuntime.
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
     * @property {boolean|null} [undefinedValue] DefaultSerializerMessage undefinedValue
     * @property {boolean|null} [nullValue] DefaultSerializerMessage nullValue
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

    /**
     * DefaultSerializerMessage undefinedValue.
     * @member {boolean} undefinedValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.undefinedValue = false;

    /**
     * DefaultSerializerMessage nullValue.
     * @member {boolean} nullValue
     * @memberof DefaultSerializerMessage
     * @instance
     */
    DefaultSerializerMessage.prototype.nullValue = false;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * DefaultSerializerMessage value.
     * @member {"stringValue"|"numberValue"|"crdtValue"|"undefinedValue"|"nullValue"|undefined} value
     * @memberof DefaultSerializerMessage
     * @instance
     */
    Object.defineProperty(DefaultSerializerMessage.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["stringValue", "numberValue", "crdtValue", "undefinedValue", "nullValue"]),
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
        if (message.undefinedValue != null && Object.hasOwnProperty.call(message, "undefinedValue"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.undefinedValue);
        if (message.nullValue != null && Object.hasOwnProperty.call(message, "nullValue"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.nullValue);
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
            case 4:
                message.undefinedValue = reader.bool();
                break;
            case 5:
                message.nullValue = reader.bool();
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
        if (message.undefinedValue != null && message.hasOwnProperty("undefinedValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.undefinedValue !== "boolean")
                return "undefinedValue: boolean expected";
        }
        if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            if (typeof message.nullValue !== "boolean")
                return "nullValue: boolean expected";
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
        if (object.undefinedValue != null)
            message.undefinedValue = Boolean(object.undefinedValue);
        if (object.nullValue != null)
            message.nullValue = Boolean(object.nullValue);
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
        if (message.undefinedValue != null && message.hasOwnProperty("undefinedValue")) {
            object.undefinedValue = message.undefinedValue;
            if (options.oneofs)
                object.value = "undefinedValue";
        }
        if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
            object.nullValue = message.nullValue;
            if (options.oneofs)
                object.value = "nullValue";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3V0aWxzLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9uZXR3b3JrL2NyZHRfbmV0d29ya19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX3dlYnJ0Y19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvcHJvdG9fY29tcGlsZWQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYXNwcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Jhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9ldmVudGVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZmxvYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvaW5xdWlyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9wb29sL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL3V0ZjgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL2luZGV4LW1pbmltYWwuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcm9vdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy9zZXJ2aWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3V0aWwvbG9uZ2JpdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvdXRpbC9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy93cml0ZXJfYnVmZmVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jb3VudGVyd2VicnRjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsNkJBQTZCLG1CQUFPLENBQUMsdURBQWE7QUFDbEQsK0JBQStCLG1CQUFPLENBQUMsMkRBQWU7QUFDdEQsaUM7Ozs7Ozs7Ozs7OztBQ3hCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkRBQWE7QUFDekMseUJBQXlCLG1CQUFPLENBQUMsZ0VBQW1CO0FBQ3BELGdCQUFnQixtQkFBTyxDQUFDLG1EQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLGVBQWU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsaUJBQWlCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7O0FDdlphO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx5QkFBeUIsbUJBQU8sQ0FBQyxnRUFBbUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsUUFBUTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUN2TmE7QUFDYjtBQUNBO0FBQ0Esa0NBQWtDLG9DQUFvQyxhQUFhLEVBQUUsRUFBRTtBQUN2RixDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0Q7Ozs7Ozs7Ozs7OztBQ3JPYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLCtDQUFHO0FBQ3RCLGdCQUFnQixtQkFBTyxDQUFDLG9EQUFVO0FBQ2xDLCtCQUErQixtQkFBTyxDQUFDLG1GQUF3QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwQ0FBMEM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ2xCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsV0FBVztBQUN0QixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssSUFBSTs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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YSxHQUFHLElBQUksNEJBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRS9ELG9CQUFvQjtBQUNwQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpELGdFQUFnRTtBQUNoRSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3RDLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDLENBQUMsQ0FBQztBQUVILDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDLE9BQU8sR0FBRztJQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLE9BQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN4RCxDQUFDO0FBRUQsc0VBQXNFO0FBQ3RFLDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsSUFBSSIsImZpbGUiOiJkZXBsb3kvc2l0ZS9jb3VudGVyd2VicnRjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2l0ZS9jb3VudGVyd2VicnRjLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubmV0d29yayA9IGV4cG9ydHMuY3JkdHMgPSB2b2lkIDA7XG5leHBvcnRzLmNyZHRzID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9jcmR0c1wiKSk7XG5leHBvcnRzLm5ldHdvcmsgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL25ldHdvcmtcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkx3d1JlZ2lzdGVyID0gZXhwb3J0cy5Md3dFdmVudCA9IGV4cG9ydHMuTHd3U3RhdGUgPSBleHBvcnRzLk11bHRpVmFsdWVSZWdpc3RlciA9IGV4cG9ydHMuTXZyRXZlbnQgPSBleHBvcnRzLk12ckVudHJ5ID0gZXhwb3J0cy5HU2V0Q3JkdCA9IGV4cG9ydHMuU2V0QWRkRXZlbnQgPSBleHBvcnRzLk11bHRSZWdpc3RlckNyZHQgPSBleHBvcnRzLk11bHRFdmVudCA9IGV4cG9ydHMuQ291bnRlckNyZHQgPSBleHBvcnRzLk51bWJlclN0YXRlID0gZXhwb3J0cy5BZGRFdmVudCA9IHZvaWQgMDtcbmNvbnN0IGNyZHRfY29yZV8xID0gcmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpO1xuY29uc3QgcHJvdG9fY29tcGlsZWRfMSA9IHJlcXVpcmUoXCIuLi9wcm90b19jb21waWxlZFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbmNsYXNzIEFkZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVBZGRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiQWRkXCI7XG4gICAgfVxufVxuZXhwb3J0cy5BZGRFdmVudCA9IEFkZEV2ZW50O1xuY2xhc3MgTnVtYmVyU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLk51bWJlclN0YXRlID0gTnVtYmVyU3RhdGU7XG4vLyBUT0RPOiBtYWtlIHJlc2V0dGFibGVcbmNsYXNzIENvdW50ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlID0gMCkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgTnVtYmVyU3RhdGUoaW5pdGlhbFZhbHVlKSk7XG4gICAgfVxuICAgIGFkZCh0b0FkZCkge1xuICAgICAgICBpZiAodG9BZGQgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5Db3VudGVyTWVzc2FnZS5jcmVhdGUoeyB0b0FkZDogdG9BZGQgfSk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5Db3VudGVyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLkNvdW50ZXJNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudmFsdWUgKz0gZGVjb2RlZC50b0FkZDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQWRkRXZlbnQodGhpcywgdGltZXN0YW1wLCBkZWNvZGVkLnRvQWRkKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IGFkZC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGQodmFsdWUgLSB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXJDcmR0ID0gQ291bnRlckNyZHQ7XG5jbGFzcyBNdWx0RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZU11bHRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVNdWx0ZWQgPSB2YWx1ZU11bHRlZDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJNdWx0XCI7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0RXZlbnQgPSBNdWx0RXZlbnQ7XG5jbGFzcyBNdWx0UmVnaXN0ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlID0gMSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgTnVtYmVyU3RhdGUoaW5pdGlhbFZhbHVlKSk7XG4gICAgfVxuICAgIG11bHQodG9NdWx0KSB7XG4gICAgICAgIGlmICh0b011bHQgIT09IDEpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5NdWx0UmVnaXN0ZXJNZXNzYWdlLmNyZWF0ZSh7IHRvTXVsdDogdG9NdWx0IH0pO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuTXVsdFJlZ2lzdGVyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLk11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSAqPSBkZWNvZGVkLnRvTXVsdDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTXVsdEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgZGVjb2RlZC50b011bHQpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tdWx0KHZhbHVlIC8gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gTXVsdFJlZ2lzdGVyQ3JkdDtcbmNsYXNzIFNldEFkZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsZXIsIHRpbWVzdGFtcCwgdmFsdWVBZGRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVBZGRlZCA9IHZhbHVlQWRkZWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiU2V0QWRkXCI7XG4gICAgfVxufVxuZXhwb3J0cy5TZXRBZGRFdmVudCA9IFNldEFkZEV2ZW50O1xuY2xhc3MgR1NldENyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBHcm93LW9ubHkgc2V0IHdpdGggZWxlbWVudHMgb2YgdHlwZSBULlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBzdXBwb3J0cyB0eXBlcyBzdHJpbmcsIG51bWJlcixcbiAgICAgKiBDcmR0LCB1bmRlZmluZWQsIGFuZCBudWxsLiAgc3RyaW5nLCBudW1iZXIsXG4gICAgICogdW5kZWZpbmVkLCBhbmQgbnVsbCB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktdmFsdWUsIGFzIGluIG9yZGluYXJ5IEpTIFNldCdzLCBzbyB0aGF0IGRpZmZlcmVudFxuICAgICAqIGluc3RhbmNlcyBvZiB0aGUgc2FtZSB2YWx1ZSBhcmUgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudFxuICAgICAqIHJlcGxpY2FzKS4gIENyZHQgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXJlZmVyZW5jZSwgYXMgdGhleSB3b3VsZCBiZSBpbiBvcmRpbmFyeSBKUyBzZXQncyxcbiAgICAgKiB3aXRoIHJlcGxpY2FzIG9mIHRoZSBzYW1lIENyZHQgYmVpbmcgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudCByZXBsaWNhcykuXG4gICAgICogT3RoZXIgdHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgY2F1c2UgYW5cbiAgICAgKiBlcnJvciB3aGVuIHlvdSBhdHRlbXB0IHRvIGFkZCB0aGVtOyB1c2UgYSBjdXN0b21cbiAgICAgKiBzZXJpYWxpemVyIGFuZCBkZXNlcmlhbGl6ZXIgaW5zdGVhZCwgYmVpbmdcbiAgICAgKiBhd2FyZSBvZiBKUydzIGNsdW5reSBzZXQgc2VtYW50aWNzIChhbGwgT2JqZWN0c1xuICAgICAqIGFyZSBzdG9yZWQgYnktcmVmZXJlbmNlIG9ubHksIHdoaWxlIG5haXZlXG4gICAgICogc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24sIGUuZy4gd2l0aCBKU09OLFxuICAgICAqIHdpbGwgY3JlYXRlIG5vbi1lcXVhbFxuICAgICAqIGNvcGllcyBvZiBPYmplY3RzIG9uIG90aGVyIHJlcGxpY2FzLFxuICAgICAqIGV2ZW4gaWYgdGhleSBpbnR1aXRpdmVseSBjb3JyZXNwb25kIHRvIHRoZSBcInNhbWVcIlxuICAgICAqIHZhcmlhYmxlLilcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBzZXJpYWxpemUgPSB1dGlsc18xLmRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplciwgZGVzZXJpYWxpemUgPSB1dGlsc18xLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHBhcmVudE9yUnVudGltZSkpIHtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgbmV3IFNldCgpKTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemUgPSBkZXNlcmlhbGl6ZTtcbiAgICB9XG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIC8vIFRPRE86IGlmIHdlIG1ha2UgdGhpcyByZXNldHRhYmxlLCBzZW5kIHZhbHVlc1xuICAgICAgICAvLyBhbnl3YXkgKG9yIG1ha2UgdGhhdCBhbiBvcHRpb24pLlxuICAgICAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLkdTZXRNZXNzYWdlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdG9BZGQ6IHRoaXMuc2VyaWFsaXplKHZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5HU2V0TWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmhhcyh2YWx1ZSk7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5HU2V0TWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRlc2VyaWFsaXplKGRlY29kZWQudG9BZGQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBTZXRBZGRFdmVudCh0aGlzLCB0aW1lc3RhbXAsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERvbid0IG11dGF0ZSB0aGlzIGRpcmVjdGx5LlxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgfVxufVxuZXhwb3J0cy5HU2V0Q3JkdCA9IEdTZXRDcmR0O1xuY2xhc3MgTXZyRW50cnkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBzZW5kZXIsIGNvdW50ZXIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcbiAgICAgICAgdGhpcy5jb3VudGVyID0gY291bnRlcjtcbiAgICB9XG59XG5leHBvcnRzLk12ckVudHJ5ID0gTXZyRW50cnk7XG5jbGFzcyBNdnJFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCB0aW1lc3RhbXAsIHZhbHVlQWRkZWQsIHZhbHVlc1JlbW92ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlQWRkZWQgPSB2YWx1ZUFkZGVkO1xuICAgICAgICB0aGlzLnZhbHVlc1JlbW92ZWQgPSB2YWx1ZXNSZW1vdmVkO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIk12clwiO1xuICAgIH1cbn1cbmV4cG9ydHMuTXZyRXZlbnQgPSBNdnJFdmVudDtcbmNsYXNzIE11bHRpVmFsdWVSZWdpc3RlciBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIE11bHRpLXZhbHVlIHJlZ2lzdGVyIG9mIHR5cGUgVC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgc3VwcG9ydHMgdHlwZXMgc3RyaW5nLCBudW1iZXIsXG4gICAgICogQ3JkdCwgdW5kZWZpbmVkLCBhbmQgbnVsbC4gIHN0cmluZywgbnVtYmVyLFxuICAgICAqIHVuZGVmaW5lZCwgYW5kIG51bGwgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXZhbHVlLCBhcyBpbiBvcmRpbmFyeSBKUyBTZXQncywgc28gdGhhdCBkaWZmZXJlbnRcbiAgICAgKiBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgdmFsdWUgYXJlIGlkZW50aWZpZWRcbiAgICAgKiAoZXZlbiBpZiB0aGV5IGFyZSBhZGRlZCBieSBkaWZmZXJlbnRcbiAgICAgKiByZXBsaWNhcykuICBDcmR0IHR5cGVzIGFyZSBzdG9yZWRcbiAgICAgKiBieS1yZWZlcmVuY2UsIGFzIHRoZXkgd291bGQgYmUgaW4gb3JkaW5hcnkgSlMgc2V0J3MsXG4gICAgICogd2l0aCByZXBsaWNhcyBvZiB0aGUgc2FtZSBDcmR0IGJlaW5nIGlkZW50aWZpZWRcbiAgICAgKiAoZXZlbiBpZiB0aGV5IGFyZSBhZGRlZCBieSBkaWZmZXJlbnQgcmVwbGljYXMpLlxuICAgICAqIE90aGVyIHR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkIGFuZCB3aWxsIGNhdXNlIGFuXG4gICAgICogZXJyb3Igd2hlbiB5b3UgYXR0ZW1wdCB0byBhZGQgdGhlbTsgdXNlIGEgY3VzdG9tXG4gICAgICogc2VyaWFsaXplciBhbmQgZGVzZXJpYWxpemVyIGluc3RlYWQsIGJlaW5nXG4gICAgICogYXdhcmUgb2YgSlMncyBjbHVua3kgc2V0IHNlbWFudGljcyAoYWxsIE9iamVjdHNcbiAgICAgKiBhcmUgc3RvcmVkIGJ5LXJlZmVyZW5jZSBvbmx5LCB3aGlsZSBuYWl2ZVxuICAgICAqIHNlcmlhbGl6YXRpb24vZGVzZXJpYWxpemF0aW9uLCBlLmcuIHdpdGggSlNPTixcbiAgICAgKiB3aWxsIGNyZWF0ZSBub24tZXF1YWxcbiAgICAgKiBjb3BpZXMgb2YgT2JqZWN0cyBvbiBvdGhlciByZXBsaWNhcyxcbiAgICAgKiBldmVuIGlmIHRoZXkgaW50dWl0aXZlbHkgY29ycmVzcG9uZCB0byB0aGUgXCJzYW1lXCJcbiAgICAgKiB2YXJpYWJsZS4pXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlLCBzZXJpYWxpemUgPSB1dGlsc18xLmRlZmF1bHRDb2xsZWN0aW9uU2VyaWFsaXplciwgZGVzZXJpYWxpemUgPSB1dGlsc18xLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyKHBhcmVudE9yUnVudGltZSkpIHtcbiAgICAgICAgbGV0IGluaXRpYWxTZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIFRPRE86IHVzZSBnZW5lcmljIHdheSAocnVuTG9jYWxseSksIHRvXG4gICAgICAgIC8vIHJlZHVjZSBjb2RlIGR1cGxpY2F0aW9uLlxuICAgICAgICBpbml0aWFsU2V0LmFkZChuZXcgTXZyRW50cnkoaW5pdGlhbFZhbHVlLCBudWxsLCAtMSkpO1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsU2V0KTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemUgPSBkZXNlcmlhbGl6ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5NdnJNZXNzYWdlLmNyZWF0ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zZXJpYWxpemUodmFsdWUpXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5NdnJNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgc3VwZXIuc2VuZChidWZmZXIpO1xuICAgIH1cbiAgICByZWNlaXZlSW50ZXJuYWwodGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuTXZyTWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRlc2VyaWFsaXplKGRlY29kZWQudmFsdWUpO1xuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5zZW5kZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5pdGlhbCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZGVsZXRlKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2Y0VudHJ5ID0gdmMuZ2V0KGVudHJ5LnNlbmRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2Y0VudHJ5ICE9PSB1bmRlZmluZWQgJiYgdmNFbnRyeSA+PSBlbnRyeS5jb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRlbGV0ZShlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkLmFkZChlbnRyeS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmFkZChuZXcgTXZyRW50cnkodmFsdWUsIHRpbWVzdGFtcC5nZXRTZW5kZXIoKSwgdGltZXN0YW1wLmdldFNlbmRlckNvdW50ZXIoKSkpO1xuICAgICAgICAgICAgaWYgKHJlbW92ZWQuc2l6ZSA9PT0gMSAmJiByZW1vdmVkLmVudHJpZXMoKS5uZXh0KCkudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBubyBjaGFuZ2UgdG8gYWN0dWFsIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb24ndCBkaXNwYXRjaCBpZiB2YWx1ZSBzdGF5ZWQgcHV0P1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTXZyRXZlbnQodGhpcywgdGltZXN0YW1wLCB2YWx1ZSwgcmVtb3ZlZCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgY3VycmVudCBzZXQgb2YgdmFsdWVzLCBpLmUuLCB0aGVcbiAgICAgKiBzZXQgb2Ygbm9uLW92ZXJ3cml0dGVuIHZhbHVlcy4gIFRoaXMgbWF5IGhhdmVcbiAgICAgKiBtb3JlIHRoYW4gb25lIGVsZW1lbnQgZHVlIHRvIGNvbmN1cnJlbnQgd3JpdGVzLFxuICAgICAqIGJ1dCBpdCB3aWxsIG5ldmVyIGhhdmUgemVybyBlbGVtZW50cy4gIChJZiB5b3VcbiAgICAgKiB3YW50IHRvIGFsbG93IG51bGwvdW5kZWZpbmVkIHZhbHVlcywgaW5jbHVkZVxuICAgICAqIHRoYXQgaW4gVCdzIHR5cGUuKVxuICAgICAqL1xuICAgIGdldCB2YWx1ZVNldCgpIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHZhbHVlcy5hZGQoZW50cnkudmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVyID0gTXVsdGlWYWx1ZVJlZ2lzdGVyO1xuY2xhc3MgTHd3U3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBzZW5kZXIsIGNvdW50ZXIsIHRpbWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNlbmRlciA9IHNlbmRlcjtcbiAgICAgICAgdGhpcy5jb3VudGVyID0gY291bnRlcjtcbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICB9XG59XG5leHBvcnRzLkx3d1N0YXRlID0gTHd3U3RhdGU7XG5jbGFzcyBMd3dFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCB0aW1lc3RhbXAsIHZhbHVlLCB0aW1lU2V0KSB7XG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRpbWVTZXQgPSB0aW1lU2V0O1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkx3d1wiO1xuICAgIH1cbn1cbmV4cG9ydHMuTHd3RXZlbnQgPSBMd3dFdmVudDtcbmNsYXNzIEx3d1JlZ2lzdGVyIGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgLyoqXG4gICAgICogTGFzdC13cml0ZXItd2lucyAoTFdXKSByZWdpc3RlciBvZiB0eXBlIFQuICBUaWVzXG4gICAgICogYmV0d2VlbiBjb25jdXJyZW50IG1lc3NhZ2VzIGFyZSBiYXNlZCBvbiBVVENcbiAgICAgKiB0aW1lc3RhbXBzIChob3dldmVyLCBhIG1lc3NhZ2Ugd2lsbCBhbHdheXMgb3ZlcndyaXRlXG4gICAgICogYSBjYXVzYWxseSBwcmlvciB2YWx1ZSByZWdhcmRsZXNzIG9mIHRpbWVzdGFtcHMpLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBzdXBwb3J0cyB0eXBlcyBzdHJpbmcsIG51bWJlcixcbiAgICAgKiBDcmR0LCB1bmRlZmluZWQsIGFuZCBudWxsLiAgc3RyaW5nLCBudW1iZXIsXG4gICAgICogdW5kZWZpbmVkLCBhbmQgbnVsbCB0eXBlcyBhcmUgc3RvcmVkXG4gICAgICogYnktdmFsdWUsIGFzIGluIG9yZGluYXJ5IEpTIFNldCdzLCBzbyB0aGF0IGRpZmZlcmVudFxuICAgICAqIGluc3RhbmNlcyBvZiB0aGUgc2FtZSB2YWx1ZSBhcmUgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudFxuICAgICAqIHJlcGxpY2FzKS4gIENyZHQgdHlwZXMgYXJlIHN0b3JlZFxuICAgICAqIGJ5LXJlZmVyZW5jZSwgYXMgdGhleSB3b3VsZCBiZSBpbiBvcmRpbmFyeSBKUyBzZXQncyxcbiAgICAgKiB3aXRoIHJlcGxpY2FzIG9mIHRoZSBzYW1lIENyZHQgYmVpbmcgaWRlbnRpZmllZFxuICAgICAqIChldmVuIGlmIHRoZXkgYXJlIGFkZGVkIGJ5IGRpZmZlcmVudCByZXBsaWNhcykuXG4gICAgICogT3RoZXIgdHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgY2F1c2UgYW5cbiAgICAgKiBlcnJvciB3aGVuIHlvdSBhdHRlbXB0IHRvIGFkZCB0aGVtOyB1c2UgYSBjdXN0b21cbiAgICAgKiBzZXJpYWxpemVyIGFuZCBkZXNlcmlhbGl6ZXIgaW5zdGVhZCwgYmVpbmdcbiAgICAgKiBhd2FyZSBvZiBKUydzIGNsdW5reSBzZXQgc2VtYW50aWNzIChhbGwgT2JqZWN0c1xuICAgICAqIGFyZSBzdG9yZWQgYnktcmVmZXJlbmNlIG9ubHksIHdoaWxlIG5haXZlXG4gICAgICogc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24sIGUuZy4gd2l0aCBKU09OLFxuICAgICAqIHdpbGwgY3JlYXRlIG5vbi1lcXVhbFxuICAgICAqIGNvcGllcyBvZiBPYmplY3RzIG9uIG90aGVyIHJlcGxpY2FzLFxuICAgICAqIGV2ZW4gaWYgdGhleSBpbnR1aXRpdmVseSBjb3JyZXNwb25kIHRvIHRoZSBcInNhbWVcIlxuICAgICAqIHZhcmlhYmxlLilcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsVmFsdWUsIHNlcmlhbGl6ZSA9IHV0aWxzXzEuZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyLCBkZXNlcmlhbGl6ZSA9IHV0aWxzXzEubmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocGFyZW50T3JSdW50aW1lKSkge1xuICAgICAgICBsZXQgaW5pdGlhbFN0YXRlID0gbmV3IEx3d1N0YXRlKGluaXRpYWxWYWx1ZSwgbnVsbCwgLTEsIG51bGwpO1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsU3RhdGUpO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLkx3d01lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSksXG4gICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5Md3dNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgc3VwZXIuc2VuZChidWZmZXIpO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICByZWNlaXZlSW50ZXJuYWwodGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuTHd3TWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRlc2VyaWFsaXplKGRlY29kZWQudmFsdWUpO1xuICAgICAgICAgICAgLy8gU2VlIGlmIGl0J3MgY2F1c2FsbHkgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXAuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICAgICAgbGV0IG92ZXJ3cml0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2VuZGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbCBlbGVtZW50XG4gICAgICAgICAgICAgICAgb3ZlcndyaXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB2Y0VudHJ5ID0gdmMuZ2V0KHRoaXMuc3RhdGUuc2VuZGVyKTtcbiAgICAgICAgICAgICAgICBpZiAodmNFbnRyeSAhPT0gdW5kZWZpbmVkICYmIHZjRW50cnkgPj0gdGhpcy5zdGF0ZS5jb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgaXQncyBjb25jdXJyZW50LCBjb21wYXJlIHRpbWVzdGFtcHMuICBVc2VcbiAgICAgICAgICAgIC8vIGFyYml0cmFyeSBvcmRlciBvbiBzZW5kZXIgYXMgdGllYnJlYWtlci5cbiAgICAgICAgICAgIGlmICghb3ZlcndyaXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY29kZWQudGltZSA+IHRoaXMuc3RhdGUudGltZSlcbiAgICAgICAgICAgICAgICAgICAgb3ZlcndyaXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWNvZGVkLnRpbWUgPT0gdGhpcy5zdGF0ZS50aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJ3cml0ZSA9ICh0aW1lc3RhbXAuZ2V0U2VuZGVyKCkgPiB0aGlzLnN0YXRlLnNlbmRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VkID0gKHRoaXMuc3RhdGUudmFsdWUgIT09IHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvdW50ZXIgPSB0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2VuZGVyID0gdGltZXN0YW1wLmdldFNlbmRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGltZSA9IGRlY29kZWQudGltZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBMd3dFdmVudCh0aGlzLCB0aW1lc3RhbXAsIHZhbHVlLCBuZXcgRGF0ZShkZWNvZGVkLnRpbWUpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTHd3UmVnaXN0ZXIgPSBMd3dSZWdpc3Rlcjtcbi8vIFRPRE86IG1ha2UgYWJvdmUgQ3JkdHMgb3B0aW9uYWwgcmVzZXR0YWJsZSwgd2l0aFxuLy8gc2V0dGFibGUgcmVzZXQgdmFsdWVzIChlaXRoZXIgaW4gY29uc3RydWN0b3Igb3IgdmlhXG4vLyBhIGJ1aWxkZXIgcGF0dGVybikuICBQZXJoYXBzIG1vcmUgZ2VuZXJhbGx5LCBDcmR0c1xuLy8gc2hvdWxkIGFsbG93IGEgcmVzZXQgY2FsbGJhY2ssIHRoYXQgZ2V0cyBydW4gbG9jYWxseSBpblxuLy8gaGFyZFJlc2V0IChjaGVjayB0aGlzIGlzIEVDKS5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2ljX2NyZHRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DcmR0UnVudGltZSA9IGV4cG9ydHMuQ3JkdCA9IHZvaWQgMDtcbmNvbnN0IHByb3RvX2NvbXBpbGVkXzEgPSByZXF1aXJlKFwiLi4vcHJvdG9fY29tcGlsZWRcIik7XG5jbGFzcyBDcmR0IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFyZW50T3JSdW50aW1lIEEgcGFyZW50IGZvciB0aGlzIENyZHQsIGVpdGhlciBhbm90aGVyXG4gICAgICogQ3JkdCwgb3IgdGhlIENyZHRSdW50aW1lIGlmIHRoaXMgaGFzIG5vIENyZHQgcGFyZW50LlxuICAgICAqIFR5cGljYWxseSBwYXJlbnQgd2lsbCBiZSB0aGUgQ3JkdCBjb250YWluaW5nIHRoaXNcbiAgICAgKiBhcyBhbiBpbnN0YW5jZSB2YXJpYWJsZSwgb3IgdGhlIENyZHRSdW50aW1lIGlmIHRoZXJlIGlzXG4gICAgICogbm8gc3VjaCBDcmR0LiAgQ3JkdHMgd2l0aCB0aGUgc2FtZSBwYXJlbnQgc2hhcmUgYSBjb21tb25cbiAgICAgKiBuYW1lc3BhY2UgYW5kIGNhdXNhbCBjb25zaXN0ZW5jeSBncm91cCwgYW5kIHRoZSBkZWZhdWx0XG4gICAgICogcmVzZXQoKSBiZWhhdmlvciBpcyB0byBjYWxsIHJlc2V0KCkgb24gZWFjaCBjaGlsZC5cbiAgICAgKiBEaWZmZXJlbnQgcmVwbGljYXMgb2YgYSBDcmR0IG11c3QgYmUgYXNzaWduZWQgcGFyZW50c1xuICAgICAqIHdoaWNoIGFyZSBhbHNvIHJlcGxpY2FzIG9mIGVhY2ggb3RoZXIuXG4gICAgICogQHBhcmFtIGlkICAgICAgQW4gaWQgZm9yIHRoaXMgQ3JkdC4gIEFsbCBDcmR0cyB3aXRoIHRoZVxuICAgICAqIHNhbWUgcGFyZW50IG11c3QgaGF2ZSBkaXN0aW5jdCBpZHMsIGFuZCB0aGUgaWRzIG11c3RcbiAgICAgKiBiZSB0aGUgc2FtZSBmb3IgYWxsIHJlcGxpY2FzIG9mIGEgZ2l2ZW4gQ1JEVCwgaW4gb3JkZXJcbiAgICAgKiBmb3IgdGhlIENyZHRSdW50aW1lIHRvIHJvdXRlIG1lc3NhZ2VzIHRvIHRoZW0gcHJvcGVybHkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5pc0NyZHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmluUmVjZWl2ZUludGVybmFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICBpZiAoXCJpc0NyZHRcIiBpbiBwYXJlbnRPclJ1bnRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50T3JSdW50aW1lO1xuICAgICAgICAgICAgdGhpcy5ydW50aW1lID0gdGhpcy5wYXJlbnQucnVudGltZTtcbiAgICAgICAgICAgIHRoaXMucGF0aFRvUm9vdCA9IFtpZCwgLi4udGhpcy5wYXJlbnQucGF0aFRvUm9vdF07XG4gICAgICAgICAgICB0aGlzLnJvb3RJZCA9IHRoaXMucGFyZW50LnJvb3RJZDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlZ2lzdGVyQ2hpbGQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUgPSBwYXJlbnRPclJ1bnRpbWU7XG4gICAgICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucm9vdElkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUucmVnaXN0ZXJSb290KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZ2lzdGVyQ2hpbGQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zZXQoY2hpbGQuaWQsIGNoaWxkKTtcbiAgICB9XG4gICAgLy8gVE9ETzogdHlwaW5nLCBvciBhdCBsZWFzdCBjaGVjayB0eXBlIGV4aXN0cz9cbiAgICAvLyBUT0RPOiBhYmlsaXR5IHRvIHJlbW92ZSBsaXN0ZW5lcnM/ICBMb29rIGF0IGhvdyBET00gZG9lcyBpdC5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBjb3B5IERPTSBkZXNjcmlwdGlvbi5cbiAgICAgKiBAcGFyYW0gIHR5cGUgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIGxpc3RlbmVyIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcGFyYW0gIHJlY2VpdmVMb2NhbCA9IGZhbHNlICBJZiBmYWxzZSwgZXZlbnRzIHdpdGggaXNMb2NhbCA9IHRydWVcbiAgICAgKiBhcmUgbm90IGRlbGl2ZXJlZC5cbiAgICAgKiBAcmV0dXJuICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCByZWNlaXZlTG9jYWwgPSBmYWxzZSkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZ2V0KHR5cGUpO1xuICAgICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnNldCh0eXBlLCBsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnB1c2goW2xpc3RlbmVyLCByZWNlaXZlTG9jYWxdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzdWJjbGFzcyBzaG91bGQgY2FsbCB0aGlzIGluIGEgcmVtb3RlIG1ldGhvZFxuICAgICAqIHdoZW4gaXQgaGFzIGFuIGV2ZW50XG4gICAgICogaXQgd2FudHMgdG8gZGVsaXZlciB0byBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgZGlzcGF0Y2hFdmVudChldmVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50LnR5cGUpO1xuICAgICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBbbGlzdGVuZXIsIHJlY2VpdmVMb2NhbF0gb2YgbGlzdCkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVMb2NhbCB8fCAhZXZlbnQudGltZXN0YW1wLmlzTG9jYWwoKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlbmQobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnJ1bnRpbWUuc2VuZCh0aGlzLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICAqIENhbGxiYWNrIHVzZWQgYnkgQ3JkdFJ1bnRpbWUgb3IgYSBwYXJlbnQgQ3JkdC5cbiAgICAgICogQHRhcmdldFBhdGg6IHRoZSB0YXJnZXQgQ3JkdCdzIGlkIGZvbGxvd2VkIGJ5XG4gICAgICAqIHRoZSBpZHMgb2YgaXRzIGFuY2VzdG9ycyBpbiBhc2NlbmRpbmcgb3JkZXIsXG4gICAgICAqIGV4Y2x1ZGluZyB0aGUgY3VycmVudCBDcmR0LlxuICAgICAgKiBAcGFyYW0gdGltZXN0YW1wIFRoZSB0aW1lc3RhbXAgb2YgdGhlIHJlY2VpdmVkIG1lc3NhZ2VcbiAgICAgICogQHBhcmFtIG1lc3NhZ2UgICBUaGUgcmVjZWl2ZWQgbWVzc2FnZVxuICAgICAgKi9cbiAgICByZWNlaXZlKHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICAvLyBUT0RPOiB1c2UgKGhvbWVicmV3PykgaXRlcmF0b3IgZm9yIHRhcmdldFBhdGguXG4gICAgICAgIC8vIE1ha2UgaXQgZWFzeSB0byBjb3B5IGZvciBtdWx0aXBsZSB1c2VzIChjb3B5aW5nXG4gICAgICAgIC8vIGluZGV4IGJ1dCBub3QgdGhlIHVuZGVybHlpbmcgYXJyYXkpLlxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGFyZ2V0UGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSB0aGUgdGFyZ2V0XG4gICAgICAgICAgICBjaGFuZ2VkID0gdGhpcy5yZWNlaXZlSW50ZXJuYWwodGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW4uZ2V0KHRhcmdldFBhdGhbdGFyZ2V0UGF0aC5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGl2ZXIgZXJyb3Igc29tZXdoZXJlIHJlYXNvbmFibGVcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGNoaWxkOiBcIiArIHRhcmdldFBhdGhbdGFyZ2V0UGF0aC5sZW5ndGggLSAxXSArXG4gICAgICAgICAgICAgICAgICAgIFwiIGluOiBcIiArIEpTT04uc3RyaW5naWZ5KHRhcmdldFBhdGgpICsgXCIsIGNoaWxkcmVuOiBcIiArIEpTT04uc3RyaW5naWZ5KFsuLi50aGlzLmNoaWxkcmVuLmtleXMoKV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldFBhdGgubGVuZ3RoLS07XG4gICAgICAgICAgICBjaGFuZ2VkID0gdGhpcy5yZWNlaXZlSW50ZXJuYWxGb3JDaGlsZChjaGlsZCwgdGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBjaGFuZ2VkIGV2ZW50XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHJlY2VpdmUgbWVzc2FnZXMgc2VudCBieSBzZW5kXG4gICAgICogb24gcmVwbGljYXMgb2YgdGhpcyBjcmR0IChpbmNsdWRpbmcgdGhvc2Ugc2VudFxuICAgICAqIGxvY2FsbHkpLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgdGhpcyBDcmR0J3Mgc3RhdGUgd2FzIGNoYW5nZWQsIGkuZS4sXG4gICAgICogQ3JkdEV2ZW50J3Mgb2YgdHlwZSBcIkNoYW5nZVwiIHNob3VsZCBiZVxuICAgICAqIGRpc3BhdGNoZWQuXG4gICAgICovXG4gICAgcmVjZWl2ZUludGVybmFsKF90aW1lc3RhbXAsIF9tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlY2VpdmVkIGEgbWVzc2FnZSBidXQgcmVjZWl2ZUludGVybmFsIGlzIG5vdCBvdmVycmlkZGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHJlY2VpdmUgbWVzc2FnZXMgc2VudCBieSBzZW5kXG4gICAgICogb24gY2hpbGRyZW4gb2YgdGhpcyBDcmR0LlxuICAgICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHBhc3MgdGhlXG4gICAgICogbWVzc2FnZSB0byBjaGlsZCB1bmNoYW5nZWQsIGJ5XG4gICAgICogY2FsbGluZyBjaGlsZC5yZWNlaXZlKHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZFxuICAgICAqIEBwYXJhbSAgdGFyZ2V0UGF0aCBUaGUgdGFyZ2V0UGF0aCB0aGF0IHdvdWxkIG5vcm1hbGx5XG4gICAgICogYmUgZGVsaXZlcmVkIHRvIHRoZSBjaGlsZCwgaS5lLiwgdGhlIGlkcyBvZiB0aGUgQ3JkdHNcbiAgICAgKiBvbiB0aGUgcGF0aFxuICAgICAqIGZyb20gdGhlIG1lc3NhZ2UncyB1bHRpbWF0ZSB0YXJnZXQgdG8gY2hpbGQsIGV4Y2x1ZGluZ1xuICAgICAqIGNoaWxkLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgdGhpcyBDcmR0J3Mgc3RhdGUgd2FzIGNoYW5nZWQsIGkuZS4sXG4gICAgICogYSBDcmR0RXZlbnQgb2YgdHlwZSBcIkNoYW5nZVwiIHNob3VsZCBiZVxuICAgICAqIGRpc3BhdGNoZWQuXG4gICAgICovXG4gICAgcmVjZWl2ZUludGVybmFsRm9yQ2hpbGQoY2hpbGQsIHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQucmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdCA9IENyZHQ7XG4vLyBUT0RPOiBnZW5lcmljIGNoYW5nZSBldmVudHMgZnJvbSByZXR1cm4gdmFsdWVzXG5jbGFzcyBDcmR0UnVudGltZSB7XG4gICAgY29uc3RydWN0b3IobmV0d29yaykge1xuICAgICAgICB0aGlzLm5ldHdvcmsgPSBuZXR3b3JrO1xuICAgICAgICB0aGlzLnJvb3RDcmR0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5pZENvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLm5ldHdvcmsucmVnaXN0ZXIodGhpcyk7XG4gICAgfVxuICAgIHJlZ2lzdGVyUm9vdChjcmR0KSB7XG4gICAgICAgIHRoaXMucm9vdENyZHRzLnNldChjcmR0LmlkLCBjcmR0KTtcbiAgICB9XG4gICAgc2VuZChzZW5kZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubmV0d29yay5nZXROZXh0VGltZXN0YW1wKHNlbmRlci5yb290SWQpO1xuICAgICAgICAvLyBEZWxpdmVyIHRvIHNlbGZcbiAgICAgICAgLy8gVE9ETzogZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhpcy5yb290Q3JkdHMuZ2V0KHNlbmRlci5yb290SWQpLnJlY2VpdmUoc2VuZGVyLnBhdGhUb1Jvb3Quc2xpY2UoKSwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgbGV0IHJ1bnRpbWVNZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5DcmR0UnVudGltZU1lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgIGlubmVyTWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHBhdGhUb1Jvb3Q6IHNlbmRlci5wYXRoVG9Sb290XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5DcmR0UnVudGltZU1lc3NhZ2UuZW5jb2RlKHJ1bnRpbWVNZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrLnNlbmQoc2VuZGVyLnJvb3RJZCwgYnVmZmVyLCB0aW1lc3RhbXApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3IgQ3JkdE5ldHdvcmsuXG4gICAgICovXG4gICAgcmVjZWl2ZShncm91cCwgbWVzc2FnZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuQ3JkdFJ1bnRpbWVNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucm9vdENyZHRzLmdldChncm91cCkucmVjZWl2ZShkZWNvZGVkLnBhdGhUb1Jvb3QsIHRpbWVzdGFtcCwgZGVjb2RlZC5pbm5lck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV0d29yay5nZXRSZXBsaWNhSWQoKTtcbiAgICB9XG4gICAgZ2V0Q3JkdEJ5UmVmZXJlbmNlKHJvb3RJZCwgcGF0aFRvUm9vdCkge1xuICAgICAgICAvLyBUT0RPOiBvcHRpbWl6ZT9cbiAgICAgICAgbGV0IGN1cnJlbnRDcmR0ID0gdGhpcy5yb290Q3JkdHMuZ2V0KHJvb3RJZCk7XG4gICAgICAgIGlmICghY3VycmVudENyZHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gcm9vdElkOiBcIiArIHJvb3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IHBhdGhUb1Jvb3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRDcmR0ID0gY3VycmVudENyZHQuY2hpbGRyZW4uZ2V0KHBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Q3JkdCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gY2hpbGQ6IFwiICsgcGF0aFRvUm9vdFtpXSArXG4gICAgICAgICAgICAgICAgICAgIFwiIGF0IGluZGV4IFwiICsgaSArIFwiIGluIHJlZmVyZW5jZTogcm9vdElkPVwiICtcbiAgICAgICAgICAgICAgICAgICAgcm9vdElkICsgXCIsIHBhdGhUb1Jvb3Q9XCIgKyBwYXRoVG9Sb290KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudENyZHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gQSB1bmlxdWUgc3RyaW5nIHRoYXQgd2lsbCBvbmx5IGFwcGVhciBvbmNlXG4gICAgICogaW4gdGhpcyBDcmR0UnVudGltZSwgb2J0YWluZWQgYnkgY29uY2F0ZW5hdGluZyBvdXJcbiAgICAgKiByZXBsaWNhIGlkIHdpdGggYSBjb3VudGVyLlxuICAgICAqL1xuICAgIGdldFVpZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlkQ291bnRlcisrKSArIFwiIFwiICsgdGhpcy5nZXRSZXBsaWNhSWQoKTtcbiAgICB9XG59XG5leHBvcnRzLkNyZHRSdW50aW1lID0gQ3JkdFJ1bnRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X2NvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsc1wiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vanNvbic7XG4vL2V4cG9ydCAqIGZyb20gJy4vbXVsdGlfc2VtaWRpcmVjdCc7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVzZXR0YWJsZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc2VtaWRpcmVjdFwiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vc3RhbmRhcmQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk9wdGlvbmFsUmVzZXR0YWJsZVNlbWlkaXJlY3RQcm9kdWN0ID0gZXhwb3J0cy5PcHRpb25hbFJlc2V0dGFibGVDcmR0ID0gZXhwb3J0cy5SZXNldFdyYXBwZXJDcmR0ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuY2xhc3MgUmVzZXRDb21wb25lbnRNZXNzYWdlIGV4dGVuZHMgVWludDhBcnJheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuaXNSZXNldENvbXBvbmVudE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxheSA9IFtdO1xuICAgIH1cbn1cbmNsYXNzIFJlc2V0Q29tcG9uZW50IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBpZCwgdGFyZ2V0Q3JkdCkge1xuICAgICAgICBzdXBlcihwYXJlbnQsIGlkLCBudWxsKTtcbiAgICAgICAgdGhpcy50YXJnZXRDcmR0ID0gdGFyZ2V0Q3JkdDtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHN1cGVyLnNlbmQobmV3IFVpbnQ4QXJyYXkoKSk7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy50YXJnZXRDcmR0LmhhcmRSZXNldCgpO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaFJlc2V0RXZlbnQodGltZXN0YW1wKTtcbiAgICAgICAgaWYgKFwiaXNSZXNldENvbXBvbmVudE1lc3NhZ2VcIiBpbiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAvLyBSZXBsYXkgbWVzc2FnZS5yZXBsYXlcbiAgICAgICAgICAgIGZvciAobGV0IHRvUmVwbGF5IG9mIG1lc3NhZ2UucmVwbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRDcmR0LnJlY2VpdmUoLi4udG9SZXBsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc2V0V3JhcHBlckNyZHQgZXh0ZW5kcyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdFByb2R1Y3Qge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCB0cnVlLCB0cnVlLCBrZWVwT25seU1heGltYWwpO1xuICAgIH1cbiAgICBzZXR1cFJlc2V0KHRhcmdldENyZHQpIHtcbiAgICAgICAgdGhpcy5yZXNldENvbXBvbmVudCA9IG5ldyBSZXNldENvbXBvbmVudCh0aGlzLCB0aGlzLmlkICsgXCJfY29tcFwiLCB0YXJnZXRDcmR0KTtcbiAgICAgICAgc3VwZXIuc2V0dXAodGhpcy5yZXNldENvbXBvbmVudCwgdGFyZ2V0Q3JkdCwgdGhpcy5hY3Rpb24uYmluZCh0aGlzKSwgdGFyZ2V0Q3JkdC5zdGF0ZSk7XG4gICAgfVxuICAgIGFjdGlvbihtMlRhcmdldFBhdGgsIG0yVGltZXN0YW1wLCBtMk1lc3NhZ2UsIG0xVGFyZ2V0UGF0aCwgX20xVGltZXN0YW1wLCBtMU1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCEoXCJpc1Jlc2V0Q29tcG9uZW50TWVzc2FnZVwiIGluIG0xTWVzc2FnZSkpIHtcbiAgICAgICAgICAgIG0xTWVzc2FnZSA9IG5ldyBSZXNldENvbXBvbmVudE1lc3NhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBtMU1lc3NhZ2UucmVwbGF5LnB1c2goW20yVGFyZ2V0UGF0aC5zbGljZSgpLCBtMlRpbWVzdGFtcCwgbTJNZXNzYWdlXSk7XG4gICAgICAgIHJldHVybiBbbTFUYXJnZXRQYXRoLCBtMU1lc3NhZ2VdO1xuICAgIH1cbiAgICBkaXNwYXRjaFJlc2V0RXZlbnQodGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgICBjYWxsZXI6IHRoaXMsXG4gICAgICAgICAgICB0eXBlOiBcIlJlc2V0XCIsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDb21wb25lbnQucmVzZXQoKTtcbiAgICB9XG59XG5leHBvcnRzLlJlc2V0V3JhcHBlckNyZHQgPSBSZXNldFdyYXBwZXJDcmR0O1xuY2xhc3MgT3B0aW9uYWxSZXNldHRhYmxlQ3JkdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsU3RhdGUsIHJlc2V0dGFibGUgPSB0cnVlLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICBpZiAocmVzZXR0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHJlc2V0V3JhcHBlckNyZHQgPSBuZXcgUmVzZXRXcmFwcGVyQ3JkdChwYXJlbnRPclJ1bnRpbWUsIGlkICsgXCJfcmVzZXRcIiwga2VlcE9ubHlNYXhpbWFsKTtcbiAgICAgICAgICAgIHN1cGVyKHJlc2V0V3JhcHBlckNyZHQsIGlkLCBpbml0aWFsU3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFdyYXBwZXJDcmR0ID0gcmVzZXRXcmFwcGVyQ3JkdDtcbiAgICAgICAgICAgIHJlc2V0V3JhcHBlckNyZHQuc2V0dXBSZXNldCh0aGlzKTtcbiAgICAgICAgICAgIHJlc2V0V3JhcHBlckNyZHQuYWRkRXZlbnRMaXN0ZW5lcihcIlJlc2V0XCIsIChldmVudCkgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICAgICAgICBjYWxsZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgdHlwZTogZXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGV2ZW50LnRpbWVzdGFtcFxuICAgICAgICAgICAgfSksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxTdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXR0YWJsZSA9IHJlc2V0dGFibGU7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5yZXNldHRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0V3JhcHBlckNyZHQucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlc2V0KCkgY2FsbGVkIGJ1dCByZXNldHRhYmxlIGlzIGZhbHNlXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5PcHRpb25hbFJlc2V0dGFibGVDcmR0ID0gT3B0aW9uYWxSZXNldHRhYmxlQ3JkdDtcbmNsYXNzIE9wdGlvbmFsUmVzZXR0YWJsZVNlbWlkaXJlY3RQcm9kdWN0IGV4dGVuZHMgc2VtaWRpcmVjdF8xLlNlbWlkaXJlY3RQcm9kdWN0IHtcbiAgICAvKipcbiAgICAgKiBGb3IgbW9yZSBwYXJhbWV0ZXIgZGVzY3JpcHRpb25zLCBzZWVcbiAgICAgKiBTZW1pZGlyZWN0UHJvZHVjdC5cbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgcmVzZXR0YWJsZSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UsIGhpc3RvcnlUaW1lc3RhbXBzID0gdHJ1ZSwgaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChyZXNldHRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgcmVzZXRXcmFwcGVyQ3JkdCA9IG5ldyBSZXNldFdyYXBwZXJDcmR0KHBhcmVudE9yUnVudGltZSwgaWQgKyBcIl9yZXNldFwiLCBrZWVwT25seU1heGltYWwpO1xuICAgICAgICAgICAgc3VwZXIocmVzZXRXcmFwcGVyQ3JkdCwgaWQsIGhpc3RvcnlUaW1lc3RhbXBzLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0V3JhcHBlckNyZHQgPSByZXNldFdyYXBwZXJDcmR0O1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5zZXR1cFJlc2V0KHRoaXMpO1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5hZGRFdmVudExpc3RlbmVyKFwiUmVzZXRcIiwgKGV2ZW50KSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICAgIGNhbGxlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZXZlbnQudGltZXN0YW1wXG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICAgICAgdGhpcy5yZXNldHRhYmxlID0gcmVzZXR0YWJsZTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0V3JhcHBlckNyZHQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcmRSZXNldCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5oYXJkUmVzZXQoKTtcbiAgICAgICAgdGhpcy5oYXJkUmVzZXRJbnRlcm5hbCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuT3B0aW9uYWxSZXNldHRhYmxlU2VtaWRpcmVjdFByb2R1Y3QgPSBPcHRpb25hbFJlc2V0dGFibGVTZW1pZGlyZWN0UHJvZHVjdDtcbi8vIFRPRE86IHJlc2V0IHdpbnM/XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNldHRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZW1pZGlyZWN0UHJvZHVjdCA9IGV4cG9ydHMuU2VtaWRpcmVjdFN0YXRlID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jbGFzcyBTdG9yZWRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZW5kZXJDb3VudGVyLCByZWNlaXB0Q291bnRlciwgdGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2VuZGVyQ291bnRlciA9IHNlbmRlckNvdW50ZXI7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSByZWNlaXB0Q291bnRlcjtcbiAgICAgICAgdGhpcy50YXJnZXRQYXRoID0gdGFyZ2V0UGF0aDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxufVxuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmNsYXNzIFNlbWlkaXJlY3RTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMgPSBoaXN0b3J5VGltZXN0YW1wcztcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIEtlZXAgaW4gbWluZCB0aGF0IHBlci1zZW5kZXIgbWVzc2FnZVxuICAgICAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gcm9vdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChuZXcgU3RvcmVkTWVzc2FnZSh0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpLCB0aGlzLnJlY2VpcHRDb3VudGVyLCB0YXJnZXRQYXRoLCAodGhpcy5oaXN0b3J5VGltZXN0YW1wcyA/IHRpbWVzdGFtcCA6IG51bGwpLCBtZXNzYWdlKSk7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIrKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHRydWUsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc3BlY2lmaWVkIGFjdGlvbnMgb24gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5OlxuICAgICAqIC0gaWYgcmV0dXJuQ29uY3VycmVudCBpcyB0cnVlLCByZXR1cm5zIHRoZSBsaXN0IG9mXG4gICAgICogYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGltZXN0YW1wLCBpblxuICAgICAqIHJlY2VpcHQgb3JkZXIuXG4gICAgICogLSBpZiBkaXNjYXJkRG9taW5hdGVkIGlzIHRydWUsIGRlbGV0ZXMgYWxsIG1lc3NhZ2VzIGZyb21cbiAgICAgKiB0aGUgaGlzdG9yeSB3aG9zZSB0aW1lc3RhbXBzIGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnlcbiAgICAgKiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gdGltZXN0YW1wLiAgKE5vdGUgdGhhdCB0aGlzIG1lYW5zIHRoYXRcbiAgICAgKiBpZiB3ZSB3YW50IHRvIGtlZXAgYSBtZXNzYWdlIHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcCBpblxuICAgICAqIHRoZSBoaXN0b3J5LCBpdCBtdXN0IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IGFmdGVyIGNhbGxpbmdcbiAgICAgKiB0aGlzIG1ldGhvZC4pXG4gICAgICovXG4gICAgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudCwgZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPSBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYS5yZWNlaXB0Q291bnRlciAtIGIucmVjZWlwdENvdW50ZXIpKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCkge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBoYXJkUmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIHdvcmtpbmcgd2l0aCB0aGUgcGVyLXNlbmRlciBoaXN0b3J5XG4gICAgICogYXJyYXlzLiAgUmV0dXJucyB0aGUgaW5kZXggYWZ0ZXIgdGhlIGxhc3QgZW50cnkgd2hvc2VcbiAgICAgKiBwZXItc2VuZGVyIGNvdW50ZXIgKHRoZSBmaXJzdCB0dXBsZSBlbGVtZW50KSBpcyA8PVxuICAgICAqIHZhbHVlLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmRleEFmdGVyKHNwYXJzZUFycmF5LCB2YWx1ZSkge1xuICAgICAgICAvLyBUT0RPOiBiaW5hcnkgc2VhcmNoIHdoZW4gc3BhcnNlQXJyYXkgaXMgbGFyZ2VcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZXJlIG1heSBiZSBkdXBsaWNhdGUgdGltZXN0YW1wcy5cbiAgICAgICAgLy8gU28gaXQgd291bGQgYmUgaW5hcHByb3ByaWF0ZSB0byBmaW5kIGFuIGVudHJ5IHdob3NlXG4gICAgICAgIC8vIHBlci1zZW5kZXIgY291bnRlciBlcXVhbHMgdmFsdWUgYW5kIGluZmVyIHRoYXRcbiAgICAgICAgLy8gdGhlIGRlc2lyZWQgaW5kZXggaXMgMSBncmVhdGVyLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYXJzZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3BhcnNlQXJyYXlbaV0uc2VuZGVyQ291bnRlciA+IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSBTZW1pZGlyZWN0U3RhdGU7XG5jbGFzcyBTZW1pZGlyZWN0UHJvZHVjdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgU2VtaWRpcmVjdFN0YXRlKGhpc3RvcnlUaW1lc3RhbXBzLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCkpO1xuICAgIH1cbiAgICBzZXR1cChjcmR0MSwgY3JkdDIsIGFjdGlvbiwgaW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4uZ2V0KGNyZHQxLmlkKSAhPT0gY3JkdDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZHQxIChcIiArIGNyZHQxLmlkICsgXCIpIGlzIG5vdCBvdXIgY2hpbGRcIiArXG4gICAgICAgICAgICAgICAgXCIgKGlzIGl0IHVzaW5nIGEgd3JhcHBlciBjcmR0LCBlLmcuLCBiZWN1YXNlIHJlc2V0dGFibGUgPSB0cnVlPylcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4uZ2V0KGNyZHQyLmlkKSAhPT0gY3JkdDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZHQyIChcIiArIGNyZHQyLmlkICsgXCIpIGlzIG5vdCBvdXIgY2hpbGRcIiArXG4gICAgICAgICAgICAgICAgXCIgKGlzIGl0IHVzaW5nIGEgd3JhcHBlciBjcmR0LCBlLmcuLCBiZWN1YXNlIHJlc2V0dGFibGUgPSB0cnVlPylcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgSWdub3JlIHJlYWRvbmx5XG4gICAgICAgIGNyZHQxLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICAvLyBAdHMtaWdub3JlIElnbm9yZSByZWFkb25seVxuICAgICAgICBjcmR0Mi5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgdGhpcy5hY3Rpb25WYXIgPSBhY3Rpb247XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbEZvckNoaWxkKGNoaWxkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChjaGlsZCkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLmNyZHQyOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWRkKHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGFyZ2V0UGF0aC5zbGljZSgpLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQyLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5jcmR0MTpcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudCA9IHRoaXMuc3RhdGUuZ2V0Q29uY3VycmVudCh0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgbGV0IG1BY3QgPSBbdGFyZ2V0UGF0aCwgbWVzc2FnZV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNhbiB3ZSBhdm9pZCBzZXJpYWxpemluZyBhbmRcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVzZXJpYWxpemluZyBlYWNoIHRpbWU/ICBMaWtlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpdGggUmVzZXRDb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtQWN0T3JOdWxsID0gdGhpcy5hY3Rpb25WYXIoY29uY3VycmVudFtpXS50YXJnZXRQYXRoLCBjb25jdXJyZW50W2ldLnRpbWVzdGFtcCwgY29uY3VycmVudFtpXS5tZXNzYWdlLCBtQWN0WzBdLCB0aW1lc3RhbXAsIG1BY3RbMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobUFjdE9yTnVsbCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgbUFjdCA9IG1BY3RPck51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQxLnJlY2VpdmUobUFjdFswXSwgdGltZXN0YW1wLCBtQWN0WzFdKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gTm90IGludm9sdmVkIHdpdGggc2VtaWRpcmVjdCBwcm9kdWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtaWRpcmVjdFByb2R1Y3QgPSBTZW1pZGlyZWN0UHJvZHVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbWlkaXJlY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyID0gZXhwb3J0cy5kZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIgPSB2b2lkIDA7XG5jb25zdCBwcm90b19jb21waWxlZF8xID0gcmVxdWlyZShcIi4uL3Byb3RvX2NvbXBpbGVkXCIpO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG4vKipcbiAqIFNlcmlhbGl6ZXIgZm9yIHN0cmluZywgbnVtYmVyLCBhbmQgQ3JkdCB0eXBlcy5cbiAqIHN0cmluZyBhbmQgbnVtYmVyIHR5cGVzIGFyZSBwYXNzZWQgYnktdmFsdWUuXG4gKiBDcmR0IHR5cGVzIGFyZSBzZW50IGJ5LXJlZmVyZW5jZSwgdXNpbmcgdGhlIENyZHQnc1xuICogcm9vdElkIGFuZCBwYXRoVG9Sb290IHRvIGlkZW50aWZ5IGRpZmZlcmVudCByZXBsaWNhc1xuICogb2YgdGhlIHNhbWUgQ3JkdC4gIE90aGVyIHR5cGVzIGNhdXNlIGFuIGVycm9yLlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q29sbGVjdGlvblNlcmlhbGl6ZXIodmFsdWUpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICBtZXNzYWdlID0geyBzdHJpbmdWYWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICBtZXNzYWdlID0geyBudW1iZXJWYWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICBtZXNzYWdlID0geyB1bmRlZmluZWRWYWx1ZTogdHJ1ZSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBjcmR0X2NvcmVfMS5DcmR0KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3JkdFZhbHVlOiBwcm90b19jb21waWxlZF8xLkNyZHRSZWZlcmVuY2UuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RJZDogdmFsdWUucm9vdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aFRvUm9vdDogdmFsdWUucGF0aFRvUm9vdFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB7IG51bGxWYWx1ZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyIG9ubHkgd29ya3Mgd2l0aCB2YWx1ZXMgb2YgdHlwZSBzdHJpbmcgfCBudW1iZXIgfCBDcmR0IHwgdW5kZWZpbmVkIHwgbnVsbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3RvX2NvbXBpbGVkXzEuRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbn1cbmV4cG9ydHMuZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyID0gZGVmYXVsdENvbGxlY3Rpb25TZXJpYWxpemVyO1xuLyoqXG4gKiBSZXR1cm5zIGEgZGVzZXJpYWxpemVyIGZvciBzdHJpbmcsIG51bWJlciwgYW5kIENyZHQgdHlwZXMuXG4gKiBzdHJpbmcgYW5kIG51bWJlciB0eXBlcyBhcmUgcGFzc2VkIGJ5LXZhbHVlLlxuICogQ3JkdCB0eXBlcyBhcmUgc2VudCBieS1yZWZlcmVuY2UsIHVzaW5nIHRoZSBDcmR0J3NcbiAqIHJvb3RJZCBhbmQgcGF0aFRvUm9vdCB0byBpZGVudGlmeSBkaWZmZXJlbnQgcmVwbGljYXNcbiAqIG9mIHRoZSBzYW1lIENyZHQuICBPdGhlciB0eXBlcyBhcmUgbm90IHN1cHBvcnRlZC5cbiAqL1xuZnVuY3Rpb24gbmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocGFyZW50T3JSdW50aW1lKSB7XG4gICAgbGV0IHJ1bnRpbWU7XG4gICAgaWYgKFwiaXNDcmR0XCIgaW4gcGFyZW50T3JSdW50aW1lKVxuICAgICAgICBydW50aW1lID0gcGFyZW50T3JSdW50aW1lLnJ1bnRpbWU7XG4gICAgZWxzZVxuICAgICAgICBydW50aW1lID0gcGFyZW50T3JSdW50aW1lO1xuICAgIC8vIFRPRE86IGhvdyB0byBlcnJvciBpZiBpdCdzIG5vdCBhY3R1YWxseSBUP1xuICAgIHJldHVybiAobWVzc2FnZSkgPT4gZGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXIocnVudGltZSwgbWVzc2FnZSk7XG59XG5leHBvcnRzLm5ld0RlZmF1bHRDb2xsZWN0aW9uRGVzZXJpYWxpemVyID0gbmV3RGVmYXVsdENvbGxlY3Rpb25EZXNlcmlhbGl6ZXI7XG5mdW5jdGlvbiBkZWZhdWx0Q29sbGVjdGlvbkRlc2VyaWFsaXplcihydW50aW1lLCBtZXNzYWdlKSB7XG4gICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgc3dpdGNoIChkZWNvZGVkLnZhbHVlKSB7XG4gICAgICAgIGNhc2UgXCJzdHJpbmdWYWx1ZVwiOlxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZWQuc3RyaW5nVmFsdWU7XG4gICAgICAgIGNhc2UgXCJudW1iZXJWYWx1ZVwiOlxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZWQubnVtYmVyVmFsdWU7XG4gICAgICAgIGNhc2UgXCJjcmR0VmFsdWVcIjpcbiAgICAgICAgICAgIHJldHVybiBydW50aW1lLmdldENyZHRCeVJlZmVyZW5jZShkZWNvZGVkLmNyZHRWYWx1ZS5yb290SWQsIGRlY29kZWQuY3JkdFZhbHVlLnBhdGhUb1Jvb3QpO1xuICAgICAgICBjYXNlIFwidW5kZWZpbmVkVmFsdWVcIjpcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNhc2UgXCJudWxsVmFsdWVcIjpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG1lc3NhZ2UgZm9ybWF0OiBkZWNvZGVkLnZhbHVlPVwiICsgZGVjb2RlZC52YWx1ZSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBGaXJzdCBhdHRlbXB0IGF0IHRoZSBpbnRlcmZhY2UgYmV0d2VlbiB0aGUgcnVudGltZVxuLy8gKGNhdXNhbCBicm9hZGNhc3QgbmV0d29yaywgZXRjLikgYW5kIHRoZSBDcmR0cy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya19pbnRlcmZhY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldlYlNvY2tldE5ldHdvcmsgPSBleHBvcnRzLm15TWVzc2FnZSA9IHZvaWQgMDtcbmNvbnN0IF8xID0gcmVxdWlyZShcIi5cIik7XG4vLyBUaGUgY2FzdWFsIGJyb2FkY2FzdCBuZXR3b3JrIGRlc2lnbmVkIGZvciBhIHR3by13YXkgaW50ZXJhY3RpdmVcbi8vIGNvbW11bmljYXRpb24gc2Vzc2lvbiBiZXR3ZWVuIHVzZXIgYW5kIHNlcnZlciB1c2luZyBXZWJTb2NrZXQgQVBJLlxuLy9cbi8vIEFsc28gZW5zdXJlIHRoZSBvcmRlciBvZiBkZWxpdmVyeSB3aXRoIGNhc3VhbGl0eSBjaGVjay5cbi8qKlxuICogQ3VzdG9taXplZCBtZXNzYWdlIGV2ZW50IHRoYXQgdHJhdmVsIHRocm91Z2hcbiAqIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrLlxuICovXG5jbGFzcyBteU1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGdyb3VwLCB0aW1lc3RhbXApIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3VzdG9taXplZCB0b0pTT04gZnVuY3Rpb24gdG8gY29udmVydCBtZXNzYWdlIGFzIEpTT04gZm9ybWF0LlxuICAgICAqIFRPRE86IHVzZSBwcm90b2J1ZnMuICBGb3Igbm93IHdlIGJhc2U2NCBlbmNvZGUgdGhlXG4gICAgICogaW5uZXIgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHBhY2thZ2UgaW5mbyBpbiBKU09OIGZvcm1hdC5cbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IFwibWVzc2FnZVwiOiBBcnJheS5mcm9tKHRoaXMubWVzc2FnZS52YWx1ZXMoKSksXG4gICAgICAgICAgICBcImdyb3VwXCI6IHRoaXMuZ3JvdXAsXG4gICAgICAgICAgICBcInRpbWVzdGFtcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJ1aWRcIjogdGhpcy50aW1lc3RhbXAudWlkLFxuICAgICAgICAgICAgICAgIFwidmVjdG9yTWFwXCI6IEFycmF5LmZyb20odGhpcy50aW1lc3RhbXAudmVjdG9yTWFwLmVudHJpZXMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5teU1lc3NhZ2UgPSBteU1lc3NhZ2U7XG4vKipcbiAqIFdlYlNvY2tldE5ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgYnJvYWRjYXN0IHNlcnZlciB3aXRoIFdlYlNvY2tldCBwcm90b2NvbC5cbiAqXG4gKiBQZXJmb3JtIGNhc3VhbGl0eSBjaGVjayB0byBlbnN1cmUgbWVzc2FnZSBvcmRlcmluZy5cbiAqL1xuY2xhc3MgV2ViU29ja2V0TmV0d29yayB7XG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCB3ZWJTb2NrZXRBcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGUgc2VuZCBtZXNzYWdlIGJ1ZmZlciBoYXMgYW55IG1lc3NhZ2Ugd2FpdGluZyB0byBiZSBzZW50LlxuICAgICAgICAgKiBJZiB0aGVyZSBleGlzdCwgdGhlbiBzZW5kIGl0IHZpYSBXZWJTb2NrZXQgYW5kIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGJ1ZmZlci5cbiAgICAgICAgICogSWYgbm90LCB0aGVuIHdhaXQgYSBjdXN0b21pemVkIHRpbWUgcGVyaW9kIGFuZCBjaGVjayBhZ2Fpbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIC8vIFVzZSBoZWFydGJlYXQgdG8ga2VlcCBjbGllbnQgYWxpdmUuXG4gICAgICAgICAgICAvLyB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlIGhlYXJ0YmVhdCBmdW5jdGlvbiB0byBrZWVwIGNsaWVudHMgYWxpdmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRPRE86XG4gICAgICAgICAqIFRoZSBtZXNzYWdlIHNlbmRpbmcgdG8gc2VydmVyIGlzICdoZWFydGJlYXQnIHJpZ2h0IG5vdy5cbiAgICAgICAgICogVGhlIHRpbWVvdXQgaW50ZXJ2YWwgaXMgc2V0IHRvIDUwMDAgbWlsbGlvbnNlY29uZHMuXG4gICAgICAgICAqL1xuICAgICAgICAvLyBoZWFydGJlYXQoKSA6IHZvaWQge1xuICAgICAgICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy53cy5zZW5kKCdoZWFydGJlYXQnKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlYXJ0YmVhdCgpO1xuICAgICAgICAvLyAgICAgfSwgNTAwMCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhcnNlIEpTT04gZm9ybWF0IGRhdGEgYmFjayBpbnRvIG15TWVzc2FnZSB0eXBlLlxuICAgICAgICAgKiBQdXNoIHRoZSBtZXNzYWdlIGludG8gcmVjZWl2ZWQgbWVzc2FnZSBidWZmZXIuXG4gICAgICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYWxsIHRoZSBtZXNzYWdlcyBhbmQgZGVsaXZlciB0byBhcHBsaWNhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgc2VuZCB2aWEgbmV0d29ya1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGxldCBteVBhY2thZ2UgPSB0aGlzLnBhcnNlSlNPTihkYXRhLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuZ3JvdXAsIG15UGFja2FnZS50aW1lc3RhbXBdKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudWlkID0gcmVwbGljYUlkO1xuICAgICAgICB0aGlzLnZjTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcGVuIFdlYlNvY2tldCBjb25uZWN0aW9uIHdpdGggc2VydmVyLlxuICAgICAgICAgKiBSZWdpc3RlciBFdmVudExpc3RlbmVyIHdpdGggY29ycmVzcG9uZGluZyBldmVudCBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0QXJncyk7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIHRoaXMuc2VuZEFjdGlvbik7XG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMucmVjZWl2ZUFjdGlvbik7XG4gICAgICAgIC8vIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcigncGluZycsIGZ1bmN0aW9uKHBpbmdNZXNzYWdlKXtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlIGEgcGluZyA6ICcgKyBwaW5nTWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgdGhlIGZ1bmN0aW9uIGRlZmluZWQgaW4gQ3JkdFJ1bnRpbWUgaW50ZXJmYWNlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoaXMgcmVwbGljYSdzIGlkLCB1c2VkIGJ5IHNvbWUgQ1JEVHMgaW50ZXJuYWxseVxuICAgICAqIChlLmcuLCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRlbnRpZmllcnMgb2YgdGhlIGZvcm0gKHJlcGxpY2EgaWQsIGNvdW50ZXIpKS5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBDcmR0UnVudGltZSBDYXN1YWxCcm9hZGNhc3ROZXR3b3JrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRSdW50aW1lXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY3JkdFJ1bnRpbWUpIHtcbiAgICAgICAgdGhpcy5jcmR0UnVudGltZSA9IGNyZHRSdW50aW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGZ1bmN0aW9uIG9uIGNhc3VhbGJyb2FkY2FzdCBuZXR3b3JrIGxheWVyLCB3aGljaCBjYWxsZWRcbiAgICAgKiBieSBjcmR0J3MgcnVudGltZSBsYXllci5cbiAgICAgKlxuICAgICAqIFRoZSBtZXNzYWdlIGlzIHdyYXBwZWQgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0aW1lc3RhbXAgKGJhc2ljIHNlbmRlciBub2RlXG4gICAgICogaW5mbyBhbmQgdmVjdG9yIGNsb2NrKS5cbiAgICAgKlxuICAgICAqIFVzaW5nIFdlYlNvY2tldCBhcyBuZXR3b3JrIHRyYW5zbWlzc2lvbiBwcm90b2NvbC5cbiAgICAgKiBVc2luZyBKU09OIGZvcm1hdCBhcyBtZXNzYWdlIHR5cGUuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgbm90IE9wZW4sIHRoZW4gYnVmZmVyIHRoZSBtZXNzYWdlIGFuZFxuICAgICAqIHdhaXQgdW50aWwgV2ViU29ja2V0IG9wZW4uXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIE9wZW4sIHRoZW4gc2VuZCBpdCB3aXRoIHdzLnNlbmQoKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncm91cCBBbiBpZGVudGlmaWVyIGZvciB0aGUgZ3JvdXAgdGhhdFxuICAgICAqIHRoaXMgbWVzc2FnZSBzaG91bGQgYmUgYnJvYWRjYXN0IHRvLiAgQSBncm91cFxuICAgICAqIGVuY29tcGFzc2VzIGJvdGggYSBzZXQgb2YgcmVwbGljYXMgYW5kIGEgdW5pdFxuICAgICAqIG9mIGNhdXNhbCBjb25zaXN0ZW5jeSwgaS5lLiwgbWVzc2FnZXMgc2hvdWxkXG4gICAgICogYmUgY2F1c2FsbHkgY29uc2lzdGVudCB3aXRoaW4gYSBncm91cCBidXQgbmVlZFxuICAgICAqIG5vdCBiZSBhY3Jvc3MgZ3JvdXBzLlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgKiBAcGFyYW0gdGltZXN0YW1wIFRoZSBDYXVzYWxUaW1lc3RhbXAgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogbGFzdCBjYWxsIHRvIGdldE5leHRUaW1lc3RhbXAoZ3JvdXApLlxuICAgICAqL1xuICAgIHNlbmQoZ3JvdXAsIG1lc3NhZ2UsIHRpbWVzdGFtcCkge1xuICAgICAgICBsZXQgdmMgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmNNYXAuc2V0KGdyb3VwLCB2Yyk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGdyb3VwLCB2Yyk7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIG1lc3NhZ2UgaW50byBKU09OXG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud3Muc2VuZChteVBhY2thZ2UudG9KU09OKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gobXlQYWNrYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBjcmR0SWQgaW4gdGhpcyByZXBsaWNhLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBjcmR0SWQgdGhhdCB3b3VsZCBsaWtlIHRvIHJldHVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdGltZXN0YW1wIHRoYXQgd291bGQgYmUgYXNzaWduZWQgdG8gYSBDUkRUXG4gICAgICogbWVzc2FnZSBzZW50IGJ5IHRoaXMgcmVwbGljYSBhbmQgZ2l2ZW4gY3JkdElkIHJpZ2h0IG5vdy5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldE5leHRUaW1lc3RhbXAoZ3JvdXApIHtcbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2suXG4gICAgICAgIGxldCB2YyA9IHRoaXMudmNNYXAuZ2V0KGdyb3VwKTtcbiAgICAgICAgaWYgKCF2Yykge1xuICAgICAgICAgICAgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIHZjKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAodmMuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lc3RhbXAgb2YgdGhpcyByZXBsaWNhIHdpdGggbmV4dCB2YWx1ZS5cbiAgICAgICAgdmNDb3B5LmluY3JlbWVudCgpO1xuICAgICAgICByZXR1cm4gdmNDb3B5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgdG8gY3VzdG9taXplZCBkYXRhIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSB0cmF2ZWwgdGhyb3VnaCBuZXR3b3JrLlxuICAgICAqIEByZXR1cm5zIHRoZSBjdXN0b21pemVkIGRhdGEgdHlwZSA9PiBteU1lc3NhZ2VcbiAgICAgKi9cbiAgICBwYXJzZUpTT04oZGF0YSkge1xuICAgICAgICBsZXQgZGF0YUpTT04gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2soZGF0YUpTT04udGltZXN0YW1wLnVpZCwgdGhpcy51aWQgPT09IGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IFVpbnQ4QXJyYXkuZnJvbShkYXRhSlNPTi5tZXNzYWdlKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBteU1lc3NhZ2UobWVzc2FnZSwgZGF0YUpTT04uZ3JvdXAsIHZjKTtcbiAgICAgICAgcmV0dXJuIG15UGFja2FnZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNhc3VhbGl0eSBvZiBidWZmZXJlZCBtZXNzYWdlcyBhbmQgZGVsaXZlcnkgdGhlXG4gICAgICogbWVzc2FnZXMgYmFjayB0byBjcmR0TWVzc2FnZUxpc3RlbmVyIHdoaWNoIGFyZSByZWFkeS5cbiAgICAgKlxuICAgICAqIFRoZSBjaGVja2luZyBvcmRlciBpcyBmcm9tIHRoZSBsYXN0ZXN0IHRvIHRoZSBvbGRlc3QuXG4gICAgICogVXBkYXRlIHRoZSBWZWN0b3JDbG9jayBlbnRyeSBhbmQgTWVzc2FnZUJ1ZmZlciB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFNlbmQgdGhlIG1lc3NhZ2UgYmFjayB0byBjcmR0UnVudGltZSB3aXRoIGNvcnJlc3BvbmRpbmdcbiAgICAgKiBjcmR0TWVzc2FnZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIGNoZWNrTWVzc2FnZUJ1ZmZlcigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tZXNzYWdlQnVmZmVyLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdO1xuICAgICAgICAgICAgbGV0IGN1clZlY3RvckNsb2NrID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsyXTtcbiAgICAgICAgICAgIGxldCBteVZlY3RvckNsb2NrID0gdGhpcy52Y01hcC5nZXQoZ3JvdXApO1xuICAgICAgICAgICAgaWYgKCFteVZlY3RvckNsb2NrKSB7XG4gICAgICAgICAgICAgICAgbXlWZWN0b3JDbG9jayA9IG5ldyBfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIG15VmVjdG9yQ2xvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15VmVjdG9yQ2xvY2suaXNyZWFkeShjdXJWZWN0b3JDbG9jaykpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBTZW5kIGJhY2sgdGhlIHJlY2VpdmVkIG1lc3NhZ2VzIHRvIGNyZHRSdW50aW1lLlxuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5jcmR0UnVudGltZS5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV0sIHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl0pO1xuICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLldlYlNvY2tldE5ldHdvcmsgPSBXZWJTb2NrZXROZXR3b3JrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9uZXR3b3JrX3J1bnRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldlYlJ0Y05ldHdvcmsgPSB2b2lkIDA7XG5jb25zdCBfMSA9IHJlcXVpcmUoXCIuXCIpO1xuY29uc3QgY3JkdHNfMSA9IHJlcXVpcmUoXCIuLi9jcmR0c1wiKTtcbmNvbnN0IGNyZHRfbmV0d29ya19ydW50aW1lXzEgPSByZXF1aXJlKFwiLi9jcmR0X25ldHdvcmtfcnVudGltZVwiKTtcbi8vIE5PVEU6IFRoaXMgV2ViUlRDIG5ldHdvcmsgbGF5ZXIgaXMganVzdCBhIHByb3RvdHlwZSwgd2hpY2ggb25seVxuLy8gdHdvIHVzZXJzIHBlZXItdG8tcGVlciBjb25uZWN0aW9uLlxuLy9cbi8vIFRoZSB3ZWJydGMgbmV0d29yayBkZXNpZ25lZCBmb3IgYSB0d28td2F5IHBlZXItdG8tcGVlciBpbnRlcmFjdGl2ZVxuLy8gY29tbXVuaWNhdGlvbiBzZXNzaW9uIGFtb25nIHR3byB1c2VycyB1c2luZyBXZWJSVEMgcHJvdG9jb2wuXG4vL1xuLy8gVGhlIHdob2xlIGluZnJhc3RydWN0dXJlIGlzIGJhc2VkLW9uIHRoZSBXZWJTb2NrZXQgcHJvdG9jb2wgdG9cbi8vIGluaXRpYWxpemUgdGhlIGNvbm5lY3Rpb24gYmV0d2VlbiBXZWJSVEMgY2FuZGlkYXRlcy5cbi8vXG4vLyBBbHNvIGVuc3VyZSB0aGUgb3JkZXIgb2YgZGVsaXZlcnkgd2l0aCBjYXN1YWxpdHkgY2hlY2suXG4vKipcbiAqIFdlYlJ0Y05ldHdvcms6XG4gKlxuICogUHJvY2VzcyBpbml0aWFsaXphdGlvbiB3aGVuIHN0YXJ0aW5nIGEgbmV3IHVzZXIgbm9kZS5cbiAqXG4gKiBDb21tdW5pY2F0ZSB3aXRoIENSRFQncyBydW50aW1lIGFuZCBzZW5kL3JlY2VpdmUgbWVzc2FnZSB2aWFcbiAqIGNlbnRyYWwgc2VydmVyIHdpdGggV2ViU29ja2V0IHByb3RvY29sIHRvIGV4Y2hhbmdlIHNpZ25hbHMuXG4gKiBUaGVuIGNyZWF0ZSBjaGFubmVscyBmb3IgcGVlci10by1wZWVyIGNvbW11bmljYXRpb25zIGJ5IHVzaW5nXG4gKiB0aGUgV2ViUnRjLlxuICpcbiAqIFBlcmZvcm0gY2FzdWFsaXR5IGNoZWNrIHRvIGVuc3VyZSBtZXNzYWdlIG9yZGVyaW5nLlxuICovXG5jbGFzcyBXZWJSdGNOZXR3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcihyZXBsaWNhSWQsIHdlYlNvY2tldEFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBzZW5kIG1lc3NhZ2UgYnVmZmVyIGhhcyBhbnkgbWVzc2FnZSB3YWl0aW5nIHRvIGJlIHNlbnQuXG4gICAgICAgICAqIElmIHRoZXJlIGV4aXN0LCB0aGVuIHNlbmQgaXQgdmlhIFdlYlNvY2tldCBhbmQgcmVtb3ZlIHRoZSBpdGVtIGZyb20gYnVmZmVyLlxuICAgICAgICAgKiBJZiBub3QsIHRoZW4gd2FpdCBhIGN1c3RvbWl6ZWQgdGltZSBwZXJpb2QgYW5kIGNoZWNrIGFnYWluLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZW5kV2ViU29ja2V0RGF0YSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zZW5kQnVmZmVyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKEpTT04uc3RyaW5naWZ5KHRoaXMuc2VuZEJ1ZmZlcltpbmRleF0pKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBzaWduYWwgbWVzc2FnZSBhbmQgY2hlY2sgc2lnbmFsIG1lc3NhZ2UgdHlwZS5cbiAgICAgICAgICogSnVtcCB0byB0aGUgY29ycmVzcG9uZGluZyBzaWduYWwgaGFuZGxlciBmb3IgZnVydGhlciBzdGVwcyB0b1xuICAgICAgICAgKiBidWlsZCBXZWJSdGMgY2hhbm5lbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG1zZyB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQWN0aW9uID0gKG1zZykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3QgbWVzc2FnZVwiLCBtc2cuZGF0YSk7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UobXNnLmRhdGEpO1xuICAgICAgICAgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVnaXN0ZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVSZWdpc3RlcihkYXRhLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29ubmVjdFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3QoZGF0YS51c2Vycyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZlclwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9mZmVyKGRhdGEub2ZmZXIsIGRhdGEucmVxdWVzdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYW5zd2VyXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQW5zd2VyKGRhdGEuYW5zd2VyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhbmRpZGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNhbmRpZGF0ZShkYXRhLmNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsZWF2ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUxlYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGljZWNhbmRpZGF0ZSBldmVudCB3aGVuIGFuIFJUQ0ljZUNhbmRpZGF0ZSBoYXMgYmVlblxuICAgICAgICAgKiBpZGVudGlmaWVkIGFuZCBhZGRlZCB0byB0aGUgbG9jYWwgcGVlciBieSBhIGNhbGwuXG4gICAgICAgICAqIFNlbmQgc2lnbmFsIG1lc3NhZ2UgdG8gdGhlIGNlbnRyYWwgc2VydmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQgSWNlIGNhbmRpZGF0ZSBldmVudCB0aGF0IHNob3VsZCBiZSBoYW5kbGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhhbmRsZUljZUNhbmRpZGF0ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU2lnbmFsaW5nTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2FuZGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGVlclJ0Y1JlY2VpdmVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVjZWl2ZUNoYW5uZWwgPSBldmVudC5jaGFubmVsO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVjZWl2ZUNoYW5uZWwpO1xuICAgICAgICAgICAgcmVjZWl2ZUNoYW5uZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5kYXRhQ2hhbmVsUmVjZWl2ZU1zZyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YUNoYW5lbFJlY2VpdmVNc2cgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgbGV0IG15UGFja2FnZSA9IHRoaXMucGFyc2VKU09OKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnB1c2goW215UGFja2FnZS5tZXNzYWdlLCBteVBhY2thZ2UuZ3JvdXAsIG15UGFja2FnZS50aW1lc3RhbXBdKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNZXNzYWdlQnVmZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VuZFdlYlJ0Y0RhdGEgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkYXRhIGNoYW5uZWwgaXMgb3BlblwiKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0aGlzLmRhdGFCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhQnVmZmVyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbC5zZW5kKHRoaXMuZGF0YUJ1ZmZlcltpbmRleF0udG9KU09OKCkpO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMudmNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5kYXRhQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBcIlwiO1xuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aXRoIHNlcnZlci5cbiAgICAgICAgICogUmVnaXN0ZXIgRXZlbnRMaXN0ZW5lciB3aXRoIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldEFyZ3MpO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLnNlbmRXZWJTb2NrZXREYXRhKTtcbiAgICAgICAgdGhpcy53cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5yZWNlaXZlQWN0aW9uKTtcbiAgICAgICAgLyoqXG4gICAgICAgICogT3BlbiBXZWJSdGMgcGVlciBjb25uZWN0aW9uLlxuICAgICAgICAqIFJlZ2lzdGVyIEV2ZW50TGlzdGVuZXIgd2l0aCBjb3JyZXNwb25kaW5nIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICovXG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0ge1xuICAgICAgICAgICAgXCJpY2VTZXJ2ZXJzXCI6IFt7IFwidXJsc1wiOiBcInN0dW46c3R1bjIuMS5nb29nbGUuY29tOjE5MzAyXCIgfV1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wZWVyUnRjID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLnBlZXJSdGMuYWRkRXZlbnRMaXN0ZW5lcignaWNlY2FuZGlkYXRlJywgdGhpcy5oYW5kbGVJY2VDYW5kaWRhdGUpO1xuICAgICAgICB0aGlzLnBlZXJSdGMuYWRkRXZlbnRMaXN0ZW5lcignZGF0YWNoYW5uZWwnLCB0aGlzLnBlZXJSdGNSZWNlaXZlTWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgc2lnbmFsIG1lc3NhZ2UgaW4gSlNPTiBmb3JtYXQgYnkgdXNpbmcgV2ViU29ja2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSB0aGUgSlNPTiBmb3JtYXQgZGF0YSBzZW5kIHZpYSBuZXR3b3JrXG4gICAgICovXG4gICAgc2VuZFNpZ25hbGluZ01lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlLndlYlJ0YyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMud3Muc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgcmVnaXN0ZXIgc2lnbmFsIHNlbnQgYmFjayBmcm9tIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgKiBDaGVjayBpZiBsb2dpbiBzdWNjZXNzZnVsbHkgb3Igbm90LlxuICAgICAqXG4gICAgICogQHBhcmFtIHN1Y2Nlc3NTdGF0dXMgQSByZWdpc3RlciBzdGF0dXMgc2VudCBiYWNrIGZyb20gdGhlIHNlcnZlci5cbiAgICAgKi9cbiAgICBoYW5kbGVSZWdpc3RlcihzdWNjZXNzU3RhdHVzKSB7XG4gICAgICAgIGlmIChzdWNjZXNzU3RhdHVzID09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIGZhaWxlZDogZHVwbGljYXRlIENSRFQgaWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBzdWNjZXNzZnVsbHkgaW4gc2VydmVyLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY29ubmVjdCBzaWduYWwgc2VudCBmcm9tIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgKiBDcmVhdGUgYW4gb2ZmZXIgYW5kIHNlbmQgaXQgdG8gdGhlIHJlcXVlc3RlZCB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHVzZXJzIEFuIGFycmF5IG9mIHVzZXJzIHRoYXQgc2hhcmVkIGEgc2FtZSBDUkRUcy5cbiAgICAgKi9cbiAgICBoYW5kbGVDb25uZWN0KHVzZXJzKSB7XG4gICAgICAgIC8vIFRoaXMgbG9vcCBpcyB0byBjaGVjayB0aGUgY29ycmVjdCB1c2VyIHRvIGNvbm5lY3QuXG4gICAgICAgIC8vIERlc2lnbiBmb3IgdGhlIG11bHRpcGxlIHVzZXJzLlxuICAgICAgICAvLyBUT0RPOiBDb21wbGV0ZSBtdWx0aXBsZSB1c2VycyBjb25uZWN0aW9uIGJ1aWx0LlxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPCB1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh1c2Vyc1tpbmRleF0gIT0gdGhpcy51aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJOYW1lID0gdXNlcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYW4gb2ZmZXIgdG8gYnVpbGQgV2ViUnRjIGNvbm5lY3Rpb24uXG4gICAgICAgIC8vIFNldCBvZmZlciBhcyB0aGUgbG9jYWwgZGVzY3JpdGlvbi5cbiAgICAgICAgdGhpcy5wZWVyUnRjLmNyZWF0ZU9mZmVyKCkudGhlbigob2ZmZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwib2ZmZXJcIixcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgICAgIG9mZmVyOiBvZmZlcixcbiAgICAgICAgICAgICAgICByZXF1ZXN0TmFtZTogdGhpcy51aWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wZWVyUnRjLnNldExvY2FsRGVzY3JpcHRpb24ob2ZmZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIG9mZmVyIHNpZ25hbCBzZW50IGZyb20gdGhlIHNlcnZlci5cbiAgICAgKiBDcmVhdGUgYW4gYW5zd2VyIGFzIGEgcmVzcG9uc2UgYW5kIHNlbmQgdGhlIGFuc3dlciB0byB0aGUgc2VydmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZmVyIFRoZSBvZmZlciByZWNlaXZlZCBmcm9tIHRoZSBjZW50cmFsIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiBhIHVzZXIgd2hvIHNlbmRzIHRoaXMgb2ZmZXIuXG4gICAgICovXG4gICAgaGFuZGxlT2ZmZXIob2ZmZXIsIG5hbWUpIHtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucGVlclJ0Yy5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG9mZmVyKSk7XG4gICAgICAgIHRoaXMucGVlclJ0Yy5jcmVhdGVBbnN3ZXIoKS50aGVuKChhbnN3ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYW5zd2VyXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgICBhbnN3ZXI6IGFuc3dlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBlZXJSdGMuc2V0TG9jYWxEZXNjcmlwdGlvbihhbnN3ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbnN3ZXIgc2lnbmFsIHNlbnQgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICogU2V0dXAgcmVtb3RlIGRlc2NyaXB0aW9uIGJ5IHVzaW5nIHRoZSBhbnN3ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYW5zd2VyIFRoZSBhbnN3ZXIgcmVjZWl2ZWQgZnJvbSB0aGUgY2VudHJhbCBzZXJ2ZXIuXG4gICAgICovXG4gICAgaGFuZGxlQW5zd2VyKGFuc3dlcikge1xuICAgICAgICB0aGlzLnBlZXJSdGMuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpKTtcbiAgICB9XG4gICAgO1xuICAgIGhhbmRsZUNhbmRpZGF0ZShjYW5kaWRhdGUpIHtcbiAgICAgICAgdGhpcy5wZWVyUnRjLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZSkpXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgICB9XG4gICAgO1xuICAgIGhhbmRsZUxlYXZlKCkge1xuICAgICAgICB0aGlzLnBlZXJSdGMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5wZWVyUnRjLm9uaWNlY2FuZGlkYXRlID0gbnVsbDtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCB0aGUgZnVuY3Rpb24gZGVmaW5lZCBpbiBDcmR0UnVudGltZSBpbnRlcmZhY2VzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhpcyByZXBsaWNhJ3MgaWQsIHVzZWQgYnkgc29tZSBDUkRUcyBpbnRlcm5hbGx5XG4gICAgICogKGUuZy4sIHRvIGdlbmVyYXRlIHVuaXF1ZSBpZGVudGlmaWVycyBvZiB0aGUgZm9ybSAocmVwbGljYSBpZCwgY291bnRlcikpLlxuICAgICAqXG4gICAgICovXG4gICAgZ2V0UmVwbGljYUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG5ld2x5IGNyZWF0ZWQgY3JkdCB3aXRoIGl0cyBJRCBhbmQgY29ycmVzcG9uZGluZyBtZXNzYWdlXG4gICAgICogbGlzdGVuZXIgb24gQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0TWVzc2FnZUxpc3RlbmVyIHRoZSBtZXNzYWdlIGxpc3RlbmVyIG9mIGVhY2ggY3JkdC5cbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBJRCBvZiBlYWNoIGNyZHQuXG4gICAgICpcbiAgICAgKi9cbiAgICByZWdpc3RlcihjcmR0UnVudGltZSkge1xuICAgICAgICB0aGlzLmNyZHRSdW50aW1lID0gY3JkdFJ1bnRpbWU7XG4gICAgICAgIHRoaXMuc2VuZFNpZ25hbGluZ01lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJyZWdpc3RlclwiLFxuICAgICAgICAgICAgbmFtZTogdGhpcy51aWQsXG4gICAgICAgICAgICBjcmR0TmFtZTogY3JkdHNfMS5DcmR0UnVudGltZS5uYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNyZWF0ZSBkYXRhQ2hhbm5lbFwiKTtcbiAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbCA9IHRoaXMucGVlclJ0Yy5jcmVhdGVEYXRhQ2hhbm5lbChcImNoYW5uZWwxXCIpO1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JzOiBcIiwgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsIHRoaXMuc2VuZFdlYlJ0Y0RhdGEpO1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEgY2hhbm5lbCBpcyBjbG9zZWRcIik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgZnVuY3Rpb24gb24gY2FzdWFsYnJvYWRjYXN0IG5ldHdvcmsgbGF5ZXIsIHdoaWNoIGNhbGxlZFxuICAgICAqIGJ5IGNyZHQncyBydW50aW1lIGxheWVyLlxuICAgICAqXG4gICAgICogVGhlIG1lc3NhZ2UgaXMgd3JhcHBlZCB3aXRoIGl0cyBjb3JyZXNwb25kaW5nIHRpbWVzdGFtcCAoYmFzaWMgc2VuZGVyIG5vZGVcbiAgICAgKiBpbmZvIGFuZCB2ZWN0b3IgY2xvY2spLlxuICAgICAqXG4gICAgICogVXNpbmcgV2ViU29ja2V0IGFzIG5ldHdvcmsgdHJhbnNtaXNzaW9uIHByb3RvY29sLlxuICAgICAqIFVzaW5nIEpTT04gZm9ybWF0IGFzIG1lc3NhZ2UgdHlwZS5cbiAgICAgKlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBub3QgT3BlbiwgdGhlbiBidWZmZXIgdGhlIG1lc3NhZ2UgYW5kXG4gICAgICogd2FpdCB1bnRpbCBXZWJTb2NrZXQgb3Blbi5cbiAgICAgKiBJZiB0aGUgV2ViU29ja2V0IFJlYWR5c3RhdGUgaXMgT3BlbiwgdGhlbiBzZW5kIGl0IHdpdGggd3Muc2VuZCgpLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgdGhlIGNyZHQgdXBkYXRlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgdW5pcXVlIElEIGZvciBlYWNoIGNyZHQuXG4gICAgICovXG4gICAgc2VuZChncm91cCwgbWVzc2FnZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjcmR0SWQgZXhpc3QgaW4gdGhlIG1hcC5cbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgdmMpO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IGNyZHRfbmV0d29ya19ydW50aW1lXzEubXlNZXNzYWdlKG1lc3NhZ2UsIGdyb3VwLCB2Yyk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFDaGFubmVsLnJlYWR5U3RhdGUgPT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUNoYW5uZWwuc2VuZChteVBhY2thZ2UudG9KU09OKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhQnVmZmVyLnB1c2gobXlQYWNrYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBjcmR0SWQgaW4gdGhpcyByZXBsaWNhLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBwYXNzZWQgdG8gQ3JkdEludGVybmFsLmVmZmVjdCB3aGVuIGEgcmVwbGljYSBwcm9jZXNzZXMgaXRzIG93blxuICAgICAqIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY3JkdElkIHRoZSBjcmR0SWQgdGhhdCB3b3VsZCBsaWtlIHRvIHJldHVybi5cbiAgICAgKiBAcmV0dXJucyBUaGUgdGltZXN0YW1wIHRoYXQgd291bGQgYmUgYXNzaWduZWQgdG8gYSBDUkRUXG4gICAgICogbWVzc2FnZSBzZW50IGJ5IHRoaXMgcmVwbGljYSBhbmQgZ2l2ZW4gY3JkdElkIHJpZ2h0IG5vdy5cbiAgICAgKlxuICAgICAqL1xuICAgIGdldE5leHRUaW1lc3RhbXAoZ3JvdXApIHtcbiAgICAgICAgLy8gQ29weSBhIG5ldyB2ZWN0b3IgY2xvY2suXG4gICAgICAgIGxldCB2YyA9IHRoaXMudmNNYXAuZ2V0KGdyb3VwKTtcbiAgICAgICAgaWYgKCF2Yykge1xuICAgICAgICAgICAgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52Y01hcC5zZXQoZ3JvdXAsIHZjKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmNDb3B5ID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgdmNDb3B5LnZlY3Rvck1hcCA9IG5ldyBNYXAodmMuYXNWZWN0b3JDbG9jaygpKTtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lc3RhbXAgb2YgdGhpcyByZXBsaWNhIHdpdGggbmV4dCB2YWx1ZS5cbiAgICAgICAgdmNDb3B5LmluY3JlbWVudCgpO1xuICAgICAgICByZXR1cm4gdmNDb3B5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgdG8gY3VzdG9taXplZCBkYXRhIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgSlNPTiBmb3JtYXQgZGF0YSB0cmF2ZWwgdGhyb3VnaCBuZXR3b3JrLlxuICAgICAqIEByZXR1cm5zIHRoZSBjdXN0b21pemVkIGRhdGEgdHlwZSA9PiBteU1lc3NhZ2VcbiAgICAgKi9cbiAgICBwYXJzZUpTT04oZGF0YSkge1xuICAgICAgICBsZXQgZGF0YUpTT04gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICBsZXQgdmMgPSBuZXcgXzEuVmVjdG9yQ2xvY2soZGF0YUpTT04udGltZXN0YW1wLnVpZCwgdGhpcy51aWQgPT09IGRhdGFKU09OLnRpbWVzdGFtcC51aWQpO1xuICAgICAgICB2Yy52ZWN0b3JNYXAgPSBuZXcgTWFwKGRhdGFKU09OLnRpbWVzdGFtcC52ZWN0b3JNYXApO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IFVpbnQ4QXJyYXkuZnJvbShkYXRhSlNPTi5tZXNzYWdlKTtcbiAgICAgICAgbGV0IG15UGFja2FnZSA9IG5ldyBjcmR0X25ldHdvcmtfcnVudGltZV8xLm15TWVzc2FnZShtZXNzYWdlLCBkYXRhSlNPTi5ncm91cCwgdmMpO1xuICAgICAgICByZXR1cm4gbXlQYWNrYWdlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGJ1ZmZlcmVkIG1lc3NhZ2VzIGFuZCBkZWxpdmVyeSB0aGVcbiAgICAgKiBtZXNzYWdlcyBiYWNrIHRvIGNyZHRNZXNzYWdlTGlzdGVuZXIgd2hpY2ggYXJlIHJlYWR5LlxuICAgICAqXG4gICAgICogVGhlIGNoZWNraW5nIG9yZGVyIGlzIGZyb20gdGhlIGxhc3Rlc3QgdG8gdGhlIG9sZGVzdC5cbiAgICAgKiBVcGRhdGUgdGhlIFZlY3RvckNsb2NrIGVudHJ5IGFuZCBNZXNzYWdlQnVmZmVyIHdoZW4gbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogU2VuZCB0aGUgbWVzc2FnZSBiYWNrIHRvIGNyZHRSdW50aW1lIHdpdGggY29ycmVzcG9uZGluZ1xuICAgICAqIGNyZHRNZXNzYWdlTGlzdGVuZXIuXG4gICAgICovXG4gICAgY2hlY2tNZXNzYWdlQnVmZmVyKCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1lc3NhZ2VCdWZmZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGxldCBncm91cCA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV07XG4gICAgICAgICAgICBsZXQgY3VyVmVjdG9yQ2xvY2sgPSB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzJdO1xuICAgICAgICAgICAgbGV0IG15VmVjdG9yQ2xvY2sgPSB0aGlzLnZjTWFwLmdldChncm91cCk7XG4gICAgICAgICAgICBpZiAoIW15VmVjdG9yQ2xvY2spIHtcbiAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgbXlWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlWZWN0b3JDbG9jay5pc3JlYWR5KGN1clZlY3RvckNsb2NrKSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFNlbmQgYmFjayB0aGUgcmVjZWl2ZWQgbWVzc2FnZXMgZnJvbSBuZXR3b3JrIHRvIHRoZVxuICAgICAgICAgICAgICAgICAqIHJlZ2lzdGVyZWQgY3JkdFJ1bnRpbWUuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5jcmR0UnVudGltZS5yZWNlaXZlKHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMV0sIHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMF0sIHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl0pO1xuICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2suaW5jcmVtZW50U2VuZGVyKGN1clZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLldlYlJ0Y05ldHdvcmsgPSBXZWJSdGNOZXR3b3JrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JkdF9uZXR3b3JrX3dlYnJ0Y19ydW50aW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9uZXR3b3JrX2ludGVyZmFjZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9uZXR3b3JrX3J1bnRpbWVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2NyZHRfbmV0d29ya193ZWJydGNfcnVudGltZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdmVjdG9yX2Nsb2NrXCIpLCBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5WZWN0b3JDbG9jayA9IHZvaWQgMDtcbi8vIFRoZSB2ZWN0b3IgY2xvY2sgZGVzaWduZWQgZm9yIENSRFQgbGlicmFyeSBhbmQgY2FzdWFsIGJyb2FkY2FzdGluZ1xuLy8gcnVudGltZSB0byBlbnN1cmUgY29ycmVjdCBjYXVzYWxpdHkuXG4vKipcbiAqIFRoZSB2ZWN0b3IgY2xvY2sgY2xhc3MgZm9yIGVuc3VyaW5nIGNhc3VhbGl0eS5cbiAqL1xuY2xhc3MgVmVjdG9yQ2xvY2sge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIHZlY3RvciB3aXRoIHJlcGxpY2EncyBvd24gZW50cnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGljYUlkLCBsb2NhbCkge1xuICAgICAgICB0aGlzLnVpZCA9IHJlcGxpY2FJZDtcbiAgICAgICAgdGhpcy5sb2NhbCA9IGxvY2FsO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHVuaXF1ZSBJRCBmb3IgdGhpcyByZXBsaWNhKHJlcGxpY2FJZCkuXG4gICAgICovXG4gICAgZ2V0U2VuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuICAgIGlzTG9jYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0aGUgdmVjdG9yIGNsb2NrIHdpdGggYWxsIHRoZSBlbnRyaWVzLlxuICAgICAqL1xuICAgIGFzVmVjdG9yQ2xvY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZpc2libGUgbnVtYmVyIG9mIHRoZSBjb3VudGVyIGZyb20gc2VuZGVyIGluXG4gICAgICogdGhpcyB2ZWN0b3JjbG9jay5cbiAgICAgKi9cbiAgICBnZXRTZW5kZXJDb3VudGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuZ2V0KHRoaXMudWlkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiByZXBsaWNhcyBpbnZvdmxlZCBpbiB0aGlzIGNyZHRzLlxuICAgICAqL1xuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvck1hcC5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZlY3RvciBvZiB0aGUgdWlkKHJlcGxpY2FJZCkgZW50cnkuXG4gICAgICovXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQodGhpcy51aWQsIG9sZFZhbHVlICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYSBtZXNzYWdlIHdpdGggYSBjZXJ0YWluIHRpbWVzdGFtcCBpcyByZWFkeSBmb3IgZGVsaXZlcnlcbiAgICAgKiB0byBlbnN1cmUgY29ycmVjdCBjYXN1YWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmMgdGhlIFZlY3RvckNsb2NrIGZyb20gb3RoZXIgcmVwbGljYS5cbiAgICAgKiBAcmV0dXJucyB0aGUgbWVzc2FnZSBpcyByZWFkeSBvciBub3QuXG4gICAgICovXG4gICAgaXNyZWFkeSh2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBpZiAodGhpcy52ZWN0b3JNYXAuaGFzKG90aGVyVWlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmdldChvdGhlclVpZCkgPT09IG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgLSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpZCAhPT0gb3RoZXJVaWQgJiYgKHRoaXMudmVjdG9yTWFwLmdldChpZCkgPCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5jcmVtZW50IHNlbmRlcidzIGxhc3Rlc3QgZW50cnkgcmVjZWl2ZWQgaW4gdGhpcyBWZWN0b3JDbG9ja1xuICAgICAqIGluIHRoZSByZXBsaWNhJ3Mgb3duIHZlY3Rvck1hcC5cbiAgICAgKlxuICAgICAqIFRoaXMgb3BlcmF0aW9uIGlzIG1haW5seSBkb25lIGFmdGVyIGNvcnJlY3RseSBkZWxpdmVyIHRoZSBtZXNzYWdlXG4gICAgICogd2hlbiBpc1JlYWR5KCkgZnVuY3Rpb24gcmV0dXJucyB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgaW5jcmVtZW50U2VuZGVyKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclVpZCA9IHZjLmdldFNlbmRlcigpO1xuICAgICAgICBsZXQgb3RoZXJWZWN0b3JNYXAgPSB2Yy5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChvdGhlclVpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIGN1cnJlbnQgVmVjdG9yQ2xvY2sgd2l0aCB0aGUgdmVjdG9yIGNsb2NrIHJlY2V2aWVkIGZyb21cbiAgICAgKiBvdGhlciByZXBsaWNhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICovXG4gICAgbWVyZ2UodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICBmb3IgKGxldCBpZCBvZiBvdGhlclZlY3Rvck1hcC5rZXlzKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVjdG9yTWFwLnNldChpZCwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIE1hdGgubWF4KHRoaXMudmVjdG9yTWFwLmdldChpZCksIG90aGVyVmVjdG9yTWFwLmdldChpZCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb21lVWlkIHRoZSByZXBsaWNhJ3MgdWlkLlxuICAgICAqIEBwYXJhbSBjbG9ja1ZhbHVlIHRoZSBjbG9jayBudW1iZXIgb2YgdGhlIHJlcGxpY2EuXG4gICAgICovXG4gICAgc2V0RW50cnkoc29tZVVpZCwgY2xvY2tWYWx1ZSkge1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoc29tZVVpZCwgY2xvY2tWYWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5WZWN0b3JDbG9jayA9IFZlY3RvckNsb2NrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVjdG9yX2Nsb2NrLmpzLm1hcCIsIi8qZXNsaW50LWRpc2FibGUgYmxvY2stc2NvcGVkLXZhciwgaWQtbGVuZ3RoLCBuby1jb250cm9sLXJlZ2V4LCBuby1tYWdpYy1udW1iZXJzLCBuby1wcm90b3R5cGUtYnVpbHRpbnMsIG5vLXJlZGVjbGFyZSwgbm8tc2hhZG93LCBuby12YXIsIHNvcnQtdmFycyovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyICRwcm90b2J1ZiA9IHJlcXVpcmUoXCJwcm90b2J1ZmpzL21pbmltYWxcIik7XG5cbi8vIENvbW1vbiBhbGlhc2VzXG52YXIgJFJlYWRlciA9ICRwcm90b2J1Zi5SZWFkZXIsICRXcml0ZXIgPSAkcHJvdG9idWYuV3JpdGVyLCAkdXRpbCA9ICRwcm90b2J1Zi51dGlsO1xuXG4vLyBFeHBvcnRlZCByb290IG5hbWVzcGFjZVxudmFyICRyb290ID0gJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSB8fCAoJHByb3RvYnVmLnJvb3RzW1wiZGVmYXVsdFwiXSA9IHt9KTtcblxuJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIENyZHRSdW50aW1lTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBpbm5lck1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlIGlubmVyTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz58bnVsbH0gW3BhdGhUb1Jvb3RdIENyZHRSdW50aW1lTWVzc2FnZSBwYXRoVG9Sb290XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IENyZHRSdW50aW1lTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDcmR0UnVudGltZU1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSUNyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SUNyZHRSdW50aW1lTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENyZHRSdW50aW1lTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZHRSdW50aW1lTWVzc2FnZSBpbm5lck1lc3NhZ2UuXG4gICAgICogQG1lbWJlciB7VWludDhBcnJheX0gaW5uZXJNZXNzYWdlXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5wcm90b3R5cGUuaW5uZXJNZXNzYWdlID0gJHV0aWwubmV3QnVmZmVyKFtdKTtcblxuICAgIC8qKlxuICAgICAqIENyZHRSdW50aW1lTWVzc2FnZSBwYXRoVG9Sb290LlxuICAgICAqIEBtZW1iZXIge0FycmF5LjxzdHJpbmc+fSBwYXRoVG9Sb290XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5wcm90b3R5cGUucGF0aFRvUm9vdCA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENyZHRSdW50aW1lTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJ1bnRpbWVNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3JkdFJ1bnRpbWVNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENyZHRSdW50aW1lTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UnVudGltZU1lc3NhZ2V9IG1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS5pbm5lck1lc3NhZ2UpO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXRoVG9Sb290ICE9IG51bGwgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aClcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMiA9Ki8xOCkuc3RyaW5nKG1lc3NhZ2UucGF0aFRvUm9vdFtpXSk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ3JkdFJ1bnRpbWVNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUNyZHRSdW50aW1lTWVzc2FnZX0gbWVzc2FnZSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJ1bnRpbWVNZXNzYWdlfSBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5DcmR0UnVudGltZU1lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJNZXNzYWdlID0gcmVhZGVyLmJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5wYXRoVG9Sb290ICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QucHVzaChyZWFkZXIuc3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwiaW5uZXJNZXNzYWdlXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2lubmVyTWVzc2FnZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7Q3JkdFJ1bnRpbWVNZXNzYWdlfSBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLmlubmVyTWVzc2FnZSAmJiB0eXBlb2YgbWVzc2FnZS5pbm5lck1lc3NhZ2UubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UuaW5uZXJNZXNzYWdlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJpbm5lck1lc3NhZ2U6IGJ1ZmZlciBleHBlY3RlZFwiO1xuICAgICAgICBpZiAobWVzc2FnZS5wYXRoVG9Sb290ICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInBhdGhUb1Jvb3RcIikpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlLnBhdGhUb1Jvb3QpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInBhdGhUb1Jvb3Q6IGFycmF5IGV4cGVjdGVkXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UucGF0aFRvUm9vdFtpXSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhdGhUb1Jvb3Q6IHN0cmluZ1tdIGV4cGVjdGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZSBmcm9tIGEgcGxhaW4gb2JqZWN0LiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byB0aGVpciByZXNwZWN0aXZlIGludGVybmFsIHR5cGVzLlxuICAgICAqIEBmdW5jdGlvbiBmcm9tT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlKCk7XG4gICAgICAgIGlmIChvYmplY3QuaW5uZXJNZXNzYWdlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5pbm5lck1lc3NhZ2UgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QuaW5uZXJNZXNzYWdlLCBtZXNzYWdlLmlubmVyTWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC5pbm5lck1lc3NhZ2UpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QuaW5uZXJNZXNzYWdlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlubmVyTWVzc2FnZSA9IG9iamVjdC5pbm5lck1lc3NhZ2U7XG4gICAgICAgIGlmIChvYmplY3QucGF0aFRvUm9vdCkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG9iamVjdC5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCIuQ3JkdFJ1bnRpbWVNZXNzYWdlLnBhdGhUb1Jvb3Q6IGFycmF5IGV4cGVjdGVkXCIpO1xuICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5wYXRoVG9Sb290Lmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdFtpXSA9IFN0cmluZyhvYmplY3QucGF0aFRvUm9vdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0NyZHRSdW50aW1lTWVzc2FnZX0gbWVzc2FnZSBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmFycmF5cyB8fCBvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmlubmVyTWVzc2FnZSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzICE9PSBBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmlubmVyTWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QuaW5uZXJNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UuaW5uZXJNZXNzYWdlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlubmVyTWVzc2FnZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UuaW5uZXJNZXNzYWdlLCAwLCBtZXNzYWdlLmlubmVyTWVzc2FnZS5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLmlubmVyTWVzc2FnZSkgOiBtZXNzYWdlLmlubmVyTWVzc2FnZTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3QucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2opXG4gICAgICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3Rbal0gPSBtZXNzYWdlLnBhdGhUb1Jvb3Rbal07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBDcmR0UnVudGltZU1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBDcmR0UnVudGltZU1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5DcmR0UmVmZXJlbmNlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIENyZHRSZWZlcmVuY2UuXG4gICAgICogQGV4cG9ydHMgSUNyZHRSZWZlcmVuY2VcbiAgICAgKiBAaW50ZXJmYWNlIElDcmR0UmVmZXJlbmNlXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJvb3RJZCBDcmR0UmVmZXJlbmNlIHJvb3RJZFxuICAgICAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz58bnVsbH0gW3BhdGhUb1Jvb3RdIENyZHRSZWZlcmVuY2UgcGF0aFRvUm9vdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBDcmR0UmVmZXJlbmNlLlxuICAgICAqIEBleHBvcnRzIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDcmR0UmVmZXJlbmNlLlxuICAgICAqIEBpbXBsZW1lbnRzIElDcmR0UmVmZXJlbmNlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtJQ3JkdFJlZmVyZW5jZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENyZHRSZWZlcmVuY2UocHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmR0UmVmZXJlbmNlIHJvb3RJZC5cbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHJvb3RJZFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ3JkdFJlZmVyZW5jZS5wcm90b3R5cGUucm9vdElkID0gXCJcIjtcblxuICAgIC8qKlxuICAgICAqIENyZHRSZWZlcmVuY2UgcGF0aFRvUm9vdC5cbiAgICAgKiBAbWVtYmVyIHtBcnJheS48c3RyaW5nPn0gcGF0aFRvUm9vdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ3JkdFJlZmVyZW5jZS5wcm90b3R5cGUucGF0aFRvUm9vdCA9ICR1dGlsLmVtcHR5QXJyYXk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IENyZHRSZWZlcmVuY2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UmVmZXJlbmNlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3JkdFJlZmVyZW5jZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENyZHRSZWZlcmVuY2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ3JkdFJlZmVyZW5jZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJlZmVyZW5jZX0gbWVzc2FnZSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLnN0cmluZyhtZXNzYWdlLnJvb3RJZCk7XG4gICAgICAgIGlmIChtZXNzYWdlLnBhdGhUb1Jvb3QgIT0gbnVsbCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS5wYXRoVG9Sb290W2ldKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENyZHRSZWZlcmVuY2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ3JkdFJlZmVyZW5jZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJlZmVyZW5jZX0gbWVzc2FnZSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJlZmVyZW5jZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yb290SWQgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKCEobWVzc2FnZS5wYXRoVG9Sb290ICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QucHVzaChyZWFkZXIuc3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwicm9vdElkXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3Jvb3RJZCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBDcmR0UmVmZXJlbmNlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UmVmZXJlbmNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtDcmR0UmVmZXJlbmNlfSBDcmR0UmVmZXJlbmNlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIENyZHRSZWZlcmVuY2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5yb290SWQpKVxuICAgICAgICAgICAgcmV0dXJuIFwicm9vdElkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJwYXRoVG9Sb290XCIpKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZS5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBzdHJpbmdbXSBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge0NyZHRSZWZlcmVuY2V9IENyZHRSZWZlcmVuY2VcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuQ3JkdFJlZmVyZW5jZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkNyZHRSZWZlcmVuY2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5yb290SWQgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2Uucm9vdElkID0gU3RyaW5nKG9iamVjdC5yb290SWQpO1xuICAgICAgICBpZiAob2JqZWN0LnBhdGhUb1Jvb3QpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QucGF0aFRvUm9vdCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkNyZHRSZWZlcmVuY2UucGF0aFRvUm9vdDogYXJyYXkgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290W2ldID0gU3RyaW5nKG9iamVjdC5wYXRoVG9Sb290W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQ3JkdFJlZmVyZW5jZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtDcmR0UmVmZXJlbmNlfSBtZXNzYWdlIENyZHRSZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIENyZHRSZWZlcmVuY2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5hcnJheXMgfHwgb3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290ID0gW107XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnJvb3RJZCA9IFwiXCI7XG4gICAgICAgIGlmIChtZXNzYWdlLnJvb3RJZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJyb290SWRcIikpXG4gICAgICAgICAgICBvYmplY3Qucm9vdElkID0gbWVzc2FnZS5yb290SWQ7XG4gICAgICAgIGlmIChtZXNzYWdlLnBhdGhUb1Jvb3QgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290W2pdID0gbWVzc2FnZS5wYXRoVG9Sb290W2pdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgQ3JkdFJlZmVyZW5jZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJlZmVyZW5jZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBDcmR0UmVmZXJlbmNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3JkdFJlZmVyZW5jZTtcbn0pKCk7XG5cbiRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IFtzdHJpbmdWYWx1ZV0gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIHN0cmluZ1ZhbHVlXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ8bnVsbH0gW251bWJlclZhbHVlXSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbnVtYmVyVmFsdWVcbiAgICAgKiBAcHJvcGVydHkge0lDcmR0UmVmZXJlbmNlfG51bGx9IFtjcmR0VmFsdWVdIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBjcmR0VmFsdWVcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW58bnVsbH0gW3VuZGVmaW5lZFZhbHVlXSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgdW5kZWZpbmVkVmFsdWVcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW58bnVsbH0gW251bGxWYWx1ZV0gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG51bGxWYWx1ZVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBzdHJpbmdWYWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHN0cmluZ1ZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUuc3RyaW5nVmFsdWUgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG51bWJlclZhbHVlLlxuICAgICAqIEBtZW1iZXIge251bWJlcn0gbnVtYmVyVmFsdWVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZS5udW1iZXJWYWx1ZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgY3JkdFZhbHVlLlxuICAgICAqIEBtZW1iZXIge0lDcmR0UmVmZXJlbmNlfG51bGx8dW5kZWZpbmVkfSBjcmR0VmFsdWVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZS5jcmR0VmFsdWUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIHVuZGVmaW5lZFZhbHVlLlxuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IHVuZGVmaW5lZFZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUudW5kZWZpbmVkVmFsdWUgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBudWxsVmFsdWUuXG4gICAgICogQG1lbWJlciB7Ym9vbGVhbn0gbnVsbFZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5wcm90b3R5cGUubnVsbFZhbHVlID0gZmFsc2U7XG5cbiAgICAvLyBPbmVPZiBmaWVsZCBuYW1lcyBib3VuZCB0byB2aXJ0dWFsIGdldHRlcnMgYW5kIHNldHRlcnNcbiAgICB2YXIgJG9uZU9mRmllbGRzO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIHZhbHVlLlxuICAgICAqIEBtZW1iZXIge1wic3RyaW5nVmFsdWVcInxcIm51bWJlclZhbHVlXCJ8XCJjcmR0VmFsdWVcInxcInVuZGVmaW5lZFZhbHVlXCJ8XCJudWxsVmFsdWVcInx1bmRlZmluZWR9IHZhbHVlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiAkdXRpbC5vbmVPZkdldHRlcigkb25lT2ZGaWVsZHMgPSBbXCJzdHJpbmdWYWx1ZVwiLCBcIm51bWJlclZhbHVlXCIsIFwiY3JkdFZhbHVlXCIsIFwidW5kZWZpbmVkVmFsdWVcIiwgXCJudWxsVmFsdWVcIl0pLFxuICAgICAgICBzZXQ6ICR1dGlsLm9uZU9mU2V0dGVyKCRvbmVPZkZpZWxkcylcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SURlZmF1bHRTZXJpYWxpemVyTWVzc2FnZX0gbWVzc2FnZSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc3RyaW5nVmFsdWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcInN0cmluZ1ZhbHVlXCIpKVxuICAgICAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5zdHJpbmcobWVzc2FnZS5zdHJpbmdWYWx1ZSk7XG4gICAgICAgIGlmIChtZXNzYWdlLm51bWJlclZhbHVlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJudW1iZXJWYWx1ZVwiKSlcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMiwgd2lyZVR5cGUgMSA9Ki8xNykuZG91YmxlKG1lc3NhZ2UubnVtYmVyVmFsdWUpO1xuICAgICAgICBpZiAobWVzc2FnZS5jcmR0VmFsdWUgIT0gbnVsbCAmJiBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtZXNzYWdlLCBcImNyZHRWYWx1ZVwiKSlcbiAgICAgICAgICAgICRyb290LkNyZHRSZWZlcmVuY2UuZW5jb2RlKG1lc3NhZ2UuY3JkdFZhbHVlLCB3cml0ZXIudWludDMyKC8qIGlkIDMsIHdpcmVUeXBlIDIgPSovMjYpLmZvcmsoKSkubGRlbGltKCk7XG4gICAgICAgIGlmIChtZXNzYWdlLnVuZGVmaW5lZFZhbHVlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJ1bmRlZmluZWRWYWx1ZVwiKSlcbiAgICAgICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgNCwgd2lyZVR5cGUgMCA9Ki8zMikuYm9vbChtZXNzYWdlLnVuZGVmaW5lZFZhbHVlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UubnVsbFZhbHVlICE9IG51bGwgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobWVzc2FnZSwgXCJudWxsVmFsdWVcIikpXG4gICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDUsIHdpcmVUeXBlIDAgPSovNDApLmJvb2wobWVzc2FnZS5udWxsVmFsdWUpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2V9IG1lc3NhZ2UgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge0RlZmF1bHRTZXJpYWxpemVyTWVzc2FnZX0gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnN0cmluZ1ZhbHVlID0gcmVhZGVyLnN0cmluZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubnVtYmVyVmFsdWUgPSByZWFkZXIuZG91YmxlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jcmR0VmFsdWUgPSAkcm9vdC5DcmR0UmVmZXJlbmNlLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS51bmRlZmluZWRWYWx1ZSA9IHJlYWRlci5ib29sKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5udWxsVmFsdWUgPSByZWFkZXIuYm9vbCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICBpZiAobWVzc2FnZS5zdHJpbmdWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJzdHJpbmdWYWx1ZVwiKSkge1xuICAgICAgICAgICAgcHJvcGVydGllcy52YWx1ZSA9IDE7XG4gICAgICAgICAgICBpZiAoISR1dGlsLmlzU3RyaW5nKG1lc3NhZ2Uuc3RyaW5nVmFsdWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1ZhbHVlOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5udW1iZXJWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJudW1iZXJWYWx1ZVwiKSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMudmFsdWUgPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidmFsdWU6IG11bHRpcGxlIHZhbHVlc1wiO1xuICAgICAgICAgICAgcHJvcGVydGllcy52YWx1ZSA9IDE7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UubnVtYmVyVmFsdWUgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibnVtYmVyVmFsdWU6IG51bWJlciBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmNyZHRWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJjcmR0VmFsdWVcIikpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLnZhbHVlID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInZhbHVlOiBtdWx0aXBsZSB2YWx1ZXNcIjtcbiAgICAgICAgICAgIHByb3BlcnRpZXMudmFsdWUgPSAxO1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICRyb290LkNyZHRSZWZlcmVuY2UudmVyaWZ5KG1lc3NhZ2UuY3JkdFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNyZHRWYWx1ZS5cIiArIGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLnVuZGVmaW5lZFZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVuZGVmaW5lZFZhbHVlXCIpKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2YWx1ZTogbXVsdGlwbGUgdmFsdWVzXCI7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gMTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS51bmRlZmluZWRWYWx1ZSAhPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkVmFsdWU6IGJvb2xlYW4gZXhwZWN0ZWRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5udWxsVmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwibnVsbFZhbHVlXCIpKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy52YWx1ZSA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ2YWx1ZTogbXVsdGlwbGUgdmFsdWVzXCI7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gMTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS5udWxsVmFsdWUgIT09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxWYWx1ZTogYm9vbGVhbiBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2V9IERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqL1xuICAgIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkRlZmF1bHRTZXJpYWxpemVyTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnN0cmluZ1ZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnN0cmluZ1ZhbHVlID0gU3RyaW5nKG9iamVjdC5zdHJpbmdWYWx1ZSk7XG4gICAgICAgIGlmIChvYmplY3QubnVtYmVyVmFsdWUgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2UubnVtYmVyVmFsdWUgPSBOdW1iZXIob2JqZWN0Lm51bWJlclZhbHVlKTtcbiAgICAgICAgaWYgKG9iamVjdC5jcmR0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuY3JkdFZhbHVlICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIi5EZWZhdWx0U2VyaWFsaXplck1lc3NhZ2UuY3JkdFZhbHVlOiBvYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgICBtZXNzYWdlLmNyZHRWYWx1ZSA9ICRyb290LkNyZHRSZWZlcmVuY2UuZnJvbU9iamVjdChvYmplY3QuY3JkdFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0LnVuZGVmaW5lZFZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnVuZGVmaW5lZFZhbHVlID0gQm9vbGVhbihvYmplY3QudW5kZWZpbmVkVmFsdWUpO1xuICAgICAgICBpZiAob2JqZWN0Lm51bGxWYWx1ZSAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS5udWxsVmFsdWUgPSBCb29sZWFuKG9iamVjdC5udWxsVmFsdWUpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7RGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlfSBtZXNzYWdlIERlZmF1bHRTZXJpYWxpemVyTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc3RyaW5nVmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwic3RyaW5nVmFsdWVcIikpIHtcbiAgICAgICAgICAgIG9iamVjdC5zdHJpbmdWYWx1ZSA9IG1lc3NhZ2Uuc3RyaW5nVmFsdWU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5vbmVvZnMpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gXCJzdHJpbmdWYWx1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLm51bWJlclZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcIm51bWJlclZhbHVlXCIpKSB7XG4gICAgICAgICAgICBvYmplY3QubnVtYmVyVmFsdWUgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UubnVtYmVyVmFsdWUpID8gU3RyaW5nKG1lc3NhZ2UubnVtYmVyVmFsdWUpIDogbWVzc2FnZS5udW1iZXJWYWx1ZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm9uZW9mcylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIm51bWJlclZhbHVlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UuY3JkdFZhbHVlICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImNyZHRWYWx1ZVwiKSkge1xuICAgICAgICAgICAgb2JqZWN0LmNyZHRWYWx1ZSA9ICRyb290LkNyZHRSZWZlcmVuY2UudG9PYmplY3QobWVzc2FnZS5jcmR0VmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMub25lb2ZzKVxuICAgICAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IFwiY3JkdFZhbHVlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UudW5kZWZpbmVkVmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidW5kZWZpbmVkVmFsdWVcIikpIHtcbiAgICAgICAgICAgIG9iamVjdC51bmRlZmluZWRWYWx1ZSA9IG1lc3NhZ2UudW5kZWZpbmVkVmFsdWU7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5vbmVvZnMpXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gXCJ1bmRlZmluZWRWYWx1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLm51bGxWYWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJudWxsVmFsdWVcIikpIHtcbiAgICAgICAgICAgIG9iamVjdC5udWxsVmFsdWUgPSBtZXNzYWdlLm51bGxWYWx1ZTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm9uZW9mcylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIm51bGxWYWx1ZVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBEZWZhdWx0U2VyaWFsaXplck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRGVmYXVsdFNlcmlhbGl6ZXJNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuQ291bnRlck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQ291bnRlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUNvdW50ZXJNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdG9BZGQgQ291bnRlck1lc3NhZ2UgdG9BZGRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQ291bnRlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDb3VudGVyTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENvdW50ZXJNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3VudGVyTWVzc2FnZSB0b0FkZC5cbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRvQWRkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UucHJvdG90eXBlLnRvQWRkID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ291bnRlck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ291bnRlck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7Q291bnRlck1lc3NhZ2V9IENvdW50ZXJNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudGVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENvdW50ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ291bnRlck1lc3NhZ2V9IG1lc3NhZ2UgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDEgPSovOSkuZG91YmxlKG1lc3NhZ2UudG9BZGQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ291bnRlck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZX0gbWVzc2FnZSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkNvdW50ZXJNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRvQWRkID0gcmVhZGVyLmRvdWJsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9BZGQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS50b0FkZCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRvQWRkOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkNvdW50ZXJNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ291bnRlck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b0FkZCAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IE51bWJlcihvYmplY3QudG9BZGQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0NvdW50ZXJNZXNzYWdlfSBtZXNzYWdlIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnRvQWRkID0gMDtcbiAgICAgICAgaWYgKG1lc3NhZ2UudG9BZGQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICBvYmplY3QudG9BZGQgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UudG9BZGQpID8gU3RyaW5nKG1lc3NhZ2UudG9BZGQpIDogbWVzc2FnZS50b0FkZDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBDb3VudGVyTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb3VudGVyTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290Lk11bHRSZWdpc3Rlck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSU11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdG9NdWx0IE11bHRSZWdpc3Rlck1lc3NhZ2UgdG9NdWx0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IE11bHRSZWdpc3Rlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSU11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTXVsdFJlZ2lzdGVyTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXVsdFJlZ2lzdGVyTWVzc2FnZSB0b011bHQuXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSB0b011bHRcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UucHJvdG90eXBlLnRvTXVsdCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE11bHRSZWdpc3Rlck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTXVsdFJlZ2lzdGVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXVsdFJlZ2lzdGVyTWVzc2FnZX0gbWVzc2FnZSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDEgPSovOSkuZG91YmxlKG1lc3NhZ2UudG9NdWx0KTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXVsdFJlZ2lzdGVyTWVzc2FnZX0gbWVzc2FnZSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b011bHQgPSByZWFkZXIuZG91YmxlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b011bHRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9NdWx0J1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRvTXVsdCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRvTXVsdDogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lk11bHRSZWdpc3Rlck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b011bHQgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2UudG9NdWx0ID0gTnVtYmVyKG9iamVjdC50b011bHQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtNdWx0UmVnaXN0ZXJNZXNzYWdlfSBtZXNzYWdlIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC50b011bHQgPSAwO1xuICAgICAgICBpZiAobWVzc2FnZS50b011bHQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9NdWx0XCIpKVxuICAgICAgICAgICAgb2JqZWN0LnRvTXVsdCA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS50b011bHQpID8gU3RyaW5nKG1lc3NhZ2UudG9NdWx0KSA6IG1lc3NhZ2UudG9NdWx0O1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIE11bHRSZWdpc3Rlck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE11bHRSZWdpc3Rlck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5HU2V0TWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBHU2V0TWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJR1NldE1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElHU2V0TWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0gdG9BZGQgR1NldE1lc3NhZ2UgdG9BZGRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgR1NldE1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgR1NldE1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHU2V0TWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJR1NldE1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lHU2V0TWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdTZXRNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHU2V0TWVzc2FnZSB0b0FkZC5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB0b0FkZFxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnByb3RvdHlwZS50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEdTZXRNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0dTZXRNZXNzYWdlfSBHU2V0TWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgR1NldE1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHU2V0TWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBHU2V0TWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlfSBtZXNzYWdlIEdTZXRNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5ieXRlcyhtZXNzYWdlLnRvQWRkKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdTZXRNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEdTZXRNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7R1NldE1lc3NhZ2V9IEdTZXRNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5HU2V0TWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9BZGQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgR1NldE1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIEdTZXRNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2UudG9BZGQgJiYgdHlwZW9mIG1lc3NhZ2UudG9BZGQubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudG9BZGQpKSlcbiAgICAgICAgICAgIHJldHVybiBcInRvQWRkOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkdTZXRNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuR1NldE1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b0FkZCAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QudG9BZGQgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QudG9BZGQsIG1lc3NhZ2UudG9BZGQgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QudG9BZGQpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QudG9BZGQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudG9BZGQgPSBvYmplY3QudG9BZGQ7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBHU2V0TWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7R1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3QudG9BZGQgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QudG9BZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS50b0FkZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b0FkZFwiKSlcbiAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS50b0FkZCwgMCwgbWVzc2FnZS50b0FkZC5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLnRvQWRkKSA6IG1lc3NhZ2UudG9BZGQ7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgR1NldE1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gR1NldE1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5NdnJNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIE12ck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSU12ck1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElNdnJNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSB2YWx1ZSBNdnJNZXNzYWdlIHZhbHVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IE12ck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTXZyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIE12ck1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSU12ck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lNdnJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTXZyTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXZyTWVzc2FnZSB2YWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB2YWx1ZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5wcm90b3R5cGUudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNdnJNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtNdnJNZXNzYWdlfSBNdnJNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IE12ck1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBNdnJNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIE12ck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SU12ck1lc3NhZ2V9IG1lc3NhZ2UgTXZyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5ieXRlcyhtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE12ck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXZyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZX0gbWVzc2FnZSBNdnJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE12ck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXZyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS52YWx1ZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndmFsdWUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgTXZyTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7TXZyTWVzc2FnZX0gTXZyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLnZhbHVlICYmIHR5cGVvZiBtZXNzYWdlLnZhbHVlLmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnZhbHVlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJ2YWx1ZTogYnVmZmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXZyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2VcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuTXZyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lk12ck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC52YWx1ZSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QudmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QudmFsdWUsIG1lc3NhZ2UudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QudmFsdWUpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudmFsdWUgPSBvYmplY3QudmFsdWU7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBNdnJNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge012ck1lc3NhZ2V9IG1lc3NhZ2UgTXZyTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UudmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICBvYmplY3QudmFsdWUgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UudmFsdWUsIDAsIG1lc3NhZ2UudmFsdWUubGVuZ3RoKSA6IG9wdGlvbnMuYnl0ZXMgPT09IEFycmF5ID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZS52YWx1ZSkgOiBtZXNzYWdlLnZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIE12ck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE12ck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5Md3dNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIEx3d01lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUx3d01lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElMd3dNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSB2YWx1ZSBMd3dNZXNzYWdlIHZhbHVlXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWUgTHd3TWVzc2FnZSB0aW1lXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEx3d01lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTHd3TWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIEx3d01lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSUx3d01lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTHd3TWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTHd3TWVzc2FnZSB2YWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB2YWx1ZVxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5wcm90b3R5cGUudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogTHd3TWVzc2FnZSB0aW1lLlxuICAgICAqIEBtZW1iZXIge251bWJlcn0gdGltZVxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5wcm90b3R5cGUudGltZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEx3d01lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0x3d01lc3NhZ2V9IEx3d01lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTHd3TWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEx3d01lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTHd3TWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTHd3TWVzc2FnZX0gbWVzc2FnZSBMd3dNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDEgPSovMTcpLmRvdWJsZShtZXNzYWdlLnRpbWUpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgTHd3TWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBMd3dNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lMd3dNZXNzYWdlfSBtZXNzYWdlIEx3d01lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIEx3d01lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7THd3TWVzc2FnZX0gTHd3TWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTHd3TWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5Md3dNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnZhbHVlID0gcmVhZGVyLmJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50aW1lID0gcmVhZGVyLmRvdWJsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndmFsdWUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInRpbWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndGltZSdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBMd3dNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtMd3dNZXNzYWdlfSBMd3dNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIEx3d01lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2UudmFsdWUgJiYgdHlwZW9mIG1lc3NhZ2UudmFsdWUubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudmFsdWUpKSlcbiAgICAgICAgICAgIHJldHVybiBcInZhbHVlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRpbWUgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICByZXR1cm4gXCJ0aW1lOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBMd3dNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBMd3dNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG9iamVjdCBQbGFpbiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7THd3TWVzc2FnZX0gTHd3TWVzc2FnZVxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiAkcm9vdC5Md3dNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTHd3TWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LnZhbHVlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC52YWx1ZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC52YWx1ZSwgbWVzc2FnZS52YWx1ZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC52YWx1ZSkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS52YWx1ZSA9IG9iamVjdC52YWx1ZTtcbiAgICAgICAgaWYgKG9iamVjdC50aW1lICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnRpbWUgPSBOdW1iZXIob2JqZWN0LnRpbWUpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgTHd3TWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEx3d01lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtMd3dNZXNzYWdlfSBtZXNzYWdlIEx3d01lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIEx3d01lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iamVjdC50aW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS52YWx1ZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC52YWx1ZSA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS52YWx1ZSwgMCwgbWVzc2FnZS52YWx1ZS5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLnZhbHVlKSA6IG1lc3NhZ2UudmFsdWU7XG4gICAgICAgIGlmIChtZXNzYWdlLnRpbWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidGltZVwiKSlcbiAgICAgICAgICAgIG9iamVjdC50aW1lID0gb3B0aW9ucy5qc29uICYmICFpc0Zpbml0ZShtZXNzYWdlLnRpbWUpID8gU3RyaW5nKG1lc3NhZ2UudGltZSkgOiBtZXNzYWdlLnRpbWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgTHd3TWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgTHd3TWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBMd3dNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTHd3TWVzc2FnZTtcbn0pKCk7XG5cbiRyb290LkdNYXBNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIEdNYXBNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIElHTWFwTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSUdNYXBNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSBrZXlUb0luaXQgR01hcE1lc3NhZ2Uga2V5VG9Jbml0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEdNYXBNZXNzYWdlLlxuICAgICAqIEBleHBvcnRzIEdNYXBNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgR01hcE1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSUdNYXBNZXNzYWdlXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtJR01hcE1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBHTWFwTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR01hcE1lc3NhZ2Uga2V5VG9Jbml0LlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IGtleVRvSW5pdFxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLnByb3RvdHlwZS5rZXlUb0luaXQgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBHTWFwTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHTWFwTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IEdNYXBNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR01hcE1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgR01hcE1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHTWFwTWVzc2FnZX0gbWVzc2FnZSBHTWFwTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS5rZXlUb0luaXQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgR01hcE1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgR01hcE1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lHTWFwTWVzc2FnZX0gbWVzc2FnZSBHTWFwTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIEdNYXBNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdNYXBNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkdNYXBNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmtleVRvSW5pdCA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwia2V5VG9Jbml0XCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ2tleVRvSW5pdCdcIiwgeyBpbnN0YW5jZTogbWVzc2FnZSB9KTtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHTWFwTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0dNYXBNZXNzYWdlfSBHTWFwTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgR01hcE1lc3NhZ2UgbWVzc2FnZS5cbiAgICAgKiBAZnVuY3Rpb24gdmVyaWZ5XG4gICAgICogQG1lbWJlcm9mIEdNYXBNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS5rZXlUb0luaXQgJiYgdHlwZW9mIG1lc3NhZ2Uua2V5VG9Jbml0Lmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmtleVRvSW5pdCkpKVxuICAgICAgICAgICAgcmV0dXJuIFwia2V5VG9Jbml0OiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHTWFwTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtHTWFwTWVzc2FnZX0gR01hcE1lc3NhZ2VcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkdNYXBNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuR01hcE1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5rZXlUb0luaXQgIT0gbnVsbClcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0LmtleVRvSW5pdCA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAkdXRpbC5iYXNlNjQuZGVjb2RlKG9iamVjdC5rZXlUb0luaXQsIG1lc3NhZ2Uua2V5VG9Jbml0ID0gJHV0aWwubmV3QnVmZmVyKCR1dGlsLmJhc2U2NC5sZW5ndGgob2JqZWN0LmtleVRvSW5pdCkpLCAwKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKG9iamVjdC5rZXlUb0luaXQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2Uua2V5VG9Jbml0ID0gb2JqZWN0LmtleVRvSW5pdDtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwbGFpbiBvYmplY3QgZnJvbSBhIEdNYXBNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR01hcE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtHTWFwTWVzc2FnZX0gbWVzc2FnZSBHTWFwTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgR01hcE1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcpXG4gICAgICAgICAgICAgICAgb2JqZWN0LmtleVRvSW5pdCA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3Qua2V5VG9Jbml0ID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3Qua2V5VG9Jbml0ID0gJHV0aWwubmV3QnVmZmVyKG9iamVjdC5rZXlUb0luaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS5rZXlUb0luaXQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwia2V5VG9Jbml0XCIpKVxuICAgICAgICAgICAgb2JqZWN0LmtleVRvSW5pdCA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS5rZXlUb0luaXQsIDAsIG1lc3NhZ2Uua2V5VG9Jbml0Lmxlbmd0aCkgOiBvcHRpb25zLmJ5dGVzID09PSBBcnJheSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2Uua2V5VG9Jbml0KSA6IG1lc3NhZ2Uua2V5VG9Jbml0O1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIEdNYXBNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBHTWFwTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gSlNPTiBvYmplY3RcbiAgICAgKi9cbiAgICBHTWFwTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEdNYXBNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge1VpbnQ4QXJyYXl9IG1lc3NhZ2UgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1bmlxdWVJZCBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSB1bmlxdWVJZFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7SVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gUnVudGltZUdlbmVyYXRvck1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzW2tleXNbaV1dICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5c1tpXV0gPSBwcm9wZXJ0aWVzW2tleXNbaV1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQG1lbWJlciB7VWludDhBcnJheX0gbWVzc2FnZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLnByb3RvdHlwZS5tZXNzYWdlID0gJHV0aWwubmV3QnVmZmVyKFtdKTtcblxuICAgIC8qKlxuICAgICAqIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIHVuaXF1ZUlkLlxuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdW5pcXVlSWRcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5wcm90b3R5cGUudW5pcXVlSWQgPSBcIlwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBpbnN0YW5jZSB1c2luZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAgICogQGZ1bmN0aW9uIGNyZWF0ZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lSdW50aW1lR2VuZXJhdG9yTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKHByb3BlcnRpZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gbWVzc2FnZSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICBpZiAoIXdyaXRlcilcbiAgICAgICAgICAgIHdyaXRlciA9ICRXcml0ZXIuY3JlYXRlKCk7XG4gICAgICAgIHdyaXRlci51aW50MzIoLyogaWQgMSwgd2lyZVR5cGUgMiA9Ki8xMCkuYnl0ZXMobWVzc2FnZS5tZXNzYWdlKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAyLCB3aXJlVHlwZSAyID0qLzE4KS5zdHJpbmcobWVzc2FnZS51bmlxdWVJZCk7XG4gICAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLCBsZW5ndGggZGVsaW1pdGVkLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SVJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlfSBtZXNzYWdlIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5lbmNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWQobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZShtZXNzYWdlLCB3cml0ZXIpLmxkZWxpbSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlci5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlXG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge1J1bnRpbWVHZW5lcmF0b3JNZXNzYWdlfSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuUnVudGltZUdlbmVyYXRvck1lc3NhZ2UoKTtcbiAgICAgICAgd2hpbGUgKHJlYWRlci5wb3MgPCBlbmQpIHtcbiAgICAgICAgICAgIHZhciB0YWcgPSByZWFkZXIudWludDMyKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZyA+Pj4gMykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudW5pcXVlSWQgPSByZWFkZXIuc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXNzYWdlXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ21lc3NhZ2UnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVuaXF1ZUlkXCIpKVxuICAgICAgICAgICAgdGhyb3cgJHV0aWwuUHJvdG9jb2xFcnJvcihcIm1pc3NpbmcgcmVxdWlyZWQgJ3VuaXF1ZUlkJ1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7UnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLm1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UubWVzc2FnZS5sZW5ndGggPT09IFwibnVtYmVyXCIgfHwgJHV0aWwuaXNTdHJpbmcobWVzc2FnZS5tZXNzYWdlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJtZXNzYWdlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnVuaXF1ZUlkKSlcbiAgICAgICAgICAgIHJldHVybiBcInVuaXF1ZUlkOiBzdHJpbmcgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtSdW50aW1lR2VuZXJhdG9yTWVzc2FnZX0gUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKi9cbiAgICBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LlJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuUnVudGltZUdlbmVyYXRvck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC5tZXNzYWdlICE9IG51bGwpXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5tZXNzYWdlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICR1dGlsLmJhc2U2NC5kZWNvZGUob2JqZWN0Lm1lc3NhZ2UsIG1lc3NhZ2UubWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcigkdXRpbC5iYXNlNjQubGVuZ3RoKG9iamVjdC5tZXNzYWdlKSksIDApO1xuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0Lm1lc3NhZ2UubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZSA9IG9iamVjdC5tZXNzYWdlO1xuICAgICAgICBpZiAob2JqZWN0LnVuaXF1ZUlkICE9IG51bGwpXG4gICAgICAgICAgICBtZXNzYWdlLnVuaXF1ZUlkID0gU3RyaW5nKG9iamVjdC51bmlxdWVJZCk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7UnVudGltZUdlbmVyYXRvck1lc3NhZ2V9IG1lc3NhZ2UgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIFJ1bnRpbWVHZW5lcmF0b3JNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcpXG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5tZXNzYWdlID0gJHV0aWwubmV3QnVmZmVyKG9iamVjdC5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9iamVjdC51bmlxdWVJZCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UubWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJtZXNzYWdlXCIpKVxuICAgICAgICAgICAgb2JqZWN0Lm1lc3NhZ2UgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UubWVzc2FnZSwgMCwgbWVzc2FnZS5tZXNzYWdlLmxlbmd0aCkgOiBvcHRpb25zLmJ5dGVzID09PSBBcnJheSA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UubWVzc2FnZSkgOiBtZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlLnVuaXF1ZUlkICE9IG51bGwgJiYgbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcInVuaXF1ZUlkXCIpKVxuICAgICAgICAgICAgb2JqZWN0LnVuaXF1ZUlkID0gbWVzc2FnZS51bmlxdWVJZDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgUnVudGltZUdlbmVyYXRvck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgUnVudGltZUdlbmVyYXRvck1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBSdW50aW1lR2VuZXJhdG9yTWVzc2FnZTtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gJHJvb3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBhc1Byb21pc2U7XHJcblxyXG4vKipcclxuICogQ2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5hc1Byb21pc2V9LlxyXG4gKiBAdHlwZWRlZiBhc1Byb21pc2VDYWxsYmFja1xyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueVxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBBZGRpdGlvbmFsIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcHJvbWlzZSBmcm9tIGEgbm9kZS1zdHlsZSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHthc1Byb21pc2VDYWxsYmFja30gZm4gRnVuY3Rpb24gdG8gY2FsbFxyXG4gKiBAcGFyYW0geyp9IGN0eCBGdW5jdGlvbiBjb250ZXh0XHJcbiAqIEBwYXJhbSB7Li4uKn0gcGFyYW1zIEZ1bmN0aW9uIGFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTwqPn0gUHJvbWlzaWZpZWQgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGFzUHJvbWlzZShmbiwgY3R4LyosIHZhcmFyZ3MgKi8pIHtcclxuICAgIHZhciBwYXJhbXMgID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSxcclxuICAgICAgICBvZmZzZXQgID0gMCxcclxuICAgICAgICBpbmRleCAgID0gMixcclxuICAgICAgICBwZW5kaW5nID0gdHJ1ZTtcclxuICAgIHdoaWxlIChpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGgpXHJcbiAgICAgICAgcGFyYW1zW29mZnNldCsrXSA9IGFyZ3VtZW50c1tpbmRleCsrXTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBleGVjdXRvcihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBwYXJhbXNbb2Zmc2V0XSA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVyci8qLCB2YXJhcmdzICovKSB7XHJcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldCA8IHBhcmFtcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbb2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlLmFwcGx5KG51bGwsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KGN0eCB8fCBudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgYmFzZTY0IGltcGxlbWVudGF0aW9uIGZvciBudW1iZXIgYXJyYXlzLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgYmFzZTY0ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBieXRlIGxlbmd0aCBvZiBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBCYXNlNjQgZW5jb2RlZCBzdHJpbmdcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZSBsZW5ndGhcclxuICovXHJcbmJhc2U2NC5sZW5ndGggPSBmdW5jdGlvbiBsZW5ndGgoc3RyaW5nKSB7XHJcbiAgICB2YXIgcCA9IHN0cmluZy5sZW5ndGg7XHJcbiAgICBpZiAoIXApXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB2YXIgbiA9IDA7XHJcbiAgICB3aGlsZSAoLS1wICUgNCA+IDEgJiYgc3RyaW5nLmNoYXJBdChwKSA9PT0gXCI9XCIpXHJcbiAgICAgICAgKytuO1xyXG4gICAgcmV0dXJuIE1hdGguY2VpbChzdHJpbmcubGVuZ3RoICogMykgLyA0IC0gbjtcclxufTtcclxuXHJcbi8vIEJhc2U2NCBlbmNvZGluZyB0YWJsZVxyXG52YXIgYjY0ID0gbmV3IEFycmF5KDY0KTtcclxuXHJcbi8vIEJhc2U2NCBkZWNvZGluZyB0YWJsZVxyXG52YXIgczY0ID0gbmV3IEFycmF5KDEyMyk7XHJcblxyXG4vLyA2NS4uOTAsIDk3Li4xMjIsIDQ4Li41NywgNDMsIDQ3XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgNjQ7KVxyXG4gICAgczY0W2I2NFtpXSA9IGkgPCAyNiA/IGkgKyA2NSA6IGkgPCA1MiA/IGkgKyA3MSA6IGkgPCA2MiA/IGkgLSA0IDogaSAtIDU5IHwgNDNdID0gaSsrO1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZXMgYSBidWZmZXIgdG8gYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFNvdXJjZSBzdGFydFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFNvdXJjZSBlbmRcclxuICogQHJldHVybnMge3N0cmluZ30gQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqL1xyXG5iYXNlNjQuZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKGJ1ZmZlciwgc3RhcnQsIGVuZCkge1xyXG4gICAgdmFyIHBhcnRzID0gbnVsbCxcclxuICAgICAgICBjaHVuayA9IFtdO1xyXG4gICAgdmFyIGkgPSAwLCAvLyBvdXRwdXQgaW5kZXhcclxuICAgICAgICBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIHdoaWxlIChzdGFydCA8IGVuZCkge1xyXG4gICAgICAgIHZhciBiID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIHN3aXRjaCAoaikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgPj4gMl07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAzKSA8PCA0O1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0IHwgYiA+PiA0XTtcclxuICAgICAgICAgICAgICAgIHQgPSAoYiAmIDE1KSA8PCAyO1xyXG4gICAgICAgICAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFt0IHwgYiA+PiA2XTtcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbYiAmIDYzXTtcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID4gODE5MSkge1xyXG4gICAgICAgICAgICAocGFydHMgfHwgKHBhcnRzID0gW10pKS5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuaykpO1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaikge1xyXG4gICAgICAgIGNodW5rW2krK10gPSBiNjRbdF07XHJcbiAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gNjE7XHJcbiAgICB9XHJcbiAgICBpZiAocGFydHMpIHtcclxuICAgICAgICBpZiAoaSlcclxuICAgICAgICAgICAgcGFydHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpKTtcclxuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmsuc2xpY2UoMCwgaSkpO1xyXG59O1xyXG5cclxudmFyIGludmFsaWRFbmNvZGluZyA9IFwiaW52YWxpZCBlbmNvZGluZ1wiO1xyXG5cclxuLyoqXHJcbiAqIERlY29kZXMgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBidWZmZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gTnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW5cclxuICogQHRocm93cyB7RXJyb3J9IElmIGVuY29kaW5nIGlzIGludmFsaWRcclxuICovXHJcbmJhc2U2NC5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0O1xyXG4gICAgdmFyIGogPSAwLCAvLyBnb3RvIGluZGV4XHJcbiAgICAgICAgdDsgICAgIC8vIHRlbXBvcmFyeVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOykge1xyXG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSsrKTtcclxuICAgICAgICBpZiAoYyA9PT0gNjEgJiYgaiA+IDEpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGlmICgoYyA9IHM2NFtjXSkgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEVuY29kaW5nKTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gdCA8PCAyIHwgKGMgJiA0OCkgPj4gNDtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMTUpIDw8IDQgfCAoYyAmIDYwKSA+PiAyO1xyXG4gICAgICAgICAgICAgICAgdCA9IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHQgJiAzKSA8PCA2IHwgYztcclxuICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGogPT09IDEpXHJcbiAgICAgICAgdGhyb3cgRXJyb3IoaW52YWxpZEVuY29kaW5nKTtcclxuICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHN0cmluZyBhcHBlYXJzIHRvIGJlIGJhc2U2NCBlbmNvZGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZyB0byB0ZXN0XHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgcHJvYmFibHkgYmFzZTY0IGVuY29kZWQsIG90aGVyd2lzZSBmYWxzZVxyXG4gKi9cclxuYmFzZTY0LnRlc3QgPSBmdW5jdGlvbiB0ZXN0KHN0cmluZykge1xyXG4gICAgcmV0dXJuIC9eKD86W0EtWmEtejAtOSsvXXs0fSkqKD86W0EtWmEtejAtOSsvXXsyfT09fFtBLVphLXowLTkrL117M309KT8kLy50ZXN0KHN0cmluZyk7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGV2ZW50IGVtaXR0ZXIgaW5zdGFuY2UuXHJcbiAqIEBjbGFzc2Rlc2MgQSBtaW5pbWFsIGV2ZW50IGVtaXR0ZXIuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsKj59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lci5cclxuICogQHBhcmFtIHtzdHJpbmd9IGV2dCBFdmVudCBuYW1lXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIExpc3RlbmVyXHJcbiAqIEBwYXJhbSB7Kn0gW2N0eF0gTGlzdGVuZXIgY29udGV4dFxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2dCwgZm4sIGN0eCkge1xyXG4gICAgKHRoaXMuX2xpc3RlbmVyc1tldnRdIHx8ICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSA9IFtdKSkucHVzaCh7XHJcbiAgICAgICAgZm4gIDogZm4sXHJcbiAgICAgICAgY3R4IDogY3R4IHx8IHRoaXNcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBvciBhbnkgbWF0Y2hpbmcgbGlzdGVuZXJzIGlmIGFyZ3VtZW50cyBhcmUgb21pdHRlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IFtldnRdIEV2ZW50IG5hbWUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBpZiBvbWl0dGVkLlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbZm5dIExpc3RlbmVyIHRvIHJlbW92ZS4gUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIG9mIGBldnRgIGlmIG9taXR0ZWQuXHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldnQsIGZuKSB7XHJcbiAgICBpZiAoZXZ0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoZm4gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldnRdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7KVxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiA9PT0gZm4pXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdHMgYW4gZXZlbnQgYnkgY2FsbGluZyBpdHMgbGlzdGVuZXJzIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgQXJndW1lbnRzXHJcbiAqIEByZXR1cm5zIHt1dGlsLkV2ZW50RW1pdHRlcn0gYHRoaXNgXHJcbiAqL1xyXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xyXG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc1tldnRdO1xyXG4gICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sXHJcbiAgICAgICAgICAgIGkgPSAxO1xyXG4gICAgICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDspXHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2krK10uY3R4LCBhcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShmYWN0b3J5KTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyAvIHdyaXRlcyBmbG9hdHMgLyBkb3VibGVzIGZyb20gLyB0byBidWZmZXJzLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0XHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgMzIgYml0IGZsb2F0IHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZUZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDMyIGJpdCBmbG9hdCBmcm9tIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRmxvYXRMRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgU291cmNlIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFNvdXJjZSBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0QkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDY0IGJpdCBkb3VibGUgdG8gYSBidWZmZXIgdXNpbmcgbGl0dGxlIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRG91YmxlTEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDY0IGJpdCBkb3VibGUgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRG91YmxlQkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWYgVGFyZ2V0IGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRhcmdldCBidWZmZXIgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgNjQgYml0IGRvdWJsZSBmcm9tIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRG91YmxlTEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgNjQgYml0IGRvdWJsZSBmcm9tIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC5yZWFkRG91YmxlQkVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvbiBmb3IgdGhlIHB1cnBvc2Ugb2Ygbm9kZS1iYXNlZCB0ZXN0aW5nIGluIG1vZGlmaWVkIGdsb2JhbCBlbnZpcm9ubWVudHNcclxuZnVuY3Rpb24gZmFjdG9yeShleHBvcnRzKSB7XHJcblxyXG4gICAgLy8gZmxvYXQ6IHR5cGVkIGFycmF5XHJcbiAgICBpZiAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gXCJ1bmRlZmluZWRcIikgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZjMyID0gbmV3IEZsb2F0MzJBcnJheShbIC0wIF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmMzIuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzNdID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX2NweSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzBdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9mMzJfcmV2KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjMyWzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVGbG9hdExFID0gbGUgPyB3cml0ZUZsb2F0X2YzMl9jcHkgOiB3cml0ZUZsb2F0X2YzMl9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRCRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfcmV2IDogd3JpdGVGbG9hdF9mMzJfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfZjMyX2NweShidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIHJldHVybiBmMzJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRmxvYXRfZjMyX3JldihidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIHJldHVybiBmMzJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0TEUgPSBsZSA/IHJlYWRGbG9hdF9mMzJfY3B5IDogcmVhZEZsb2F0X2YzMl9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gbGUgPyByZWFkRmxvYXRfZjMyX3JldiA6IHJlYWRGbG9hdF9mMzJfY3B5O1xyXG5cclxuICAgIC8vIGZsb2F0OiBpZWVlNzU0XHJcbiAgICB9KSgpOyBlbHNlIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVGbG9hdF9pZWVlNzU0KHdyaXRlVWludCwgdmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IHZhbCA8IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgaWYgKHNpZ24pXHJcbiAgICAgICAgICAgICAgICB2YWwgPSAtdmFsO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAwKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChpc05hTih2YWwpKVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDIxNDMyODkzNDQsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsID4gMy40MDI4MjM0NjYzODUyODg2ZSszOCkgLy8gKy1JbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjEzOTA5NTA0MCkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsIDwgMS4xNzU0OTQzNTA4MjIyODc1ZS0zOCkgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IE1hdGgucm91bmQodmFsIC8gMS40MDEyOTg0NjQzMjQ4MTdlLTQ1KSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbCkgLyBNYXRoLkxOMiksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSBNYXRoLnJvdW5kKHZhbCAqIE1hdGgucG93KDIsIC1leHBvbmVudCkgKiA4Mzg4NjA4KSAmIDgzODg2MDc7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBleHBvbmVudCArIDEyNyA8PCAyMyB8IG1hbnRpc3NhKSA+Pj4gMCwgYnVmLCBwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IHdyaXRlRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludExFKTtcclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRCRSA9IHdyaXRlRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludEJFKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2llZWU3NTQocmVhZFVpbnQsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciB1aW50ID0gcmVhZFVpbnQoYnVmLCBwb3MpLFxyXG4gICAgICAgICAgICAgICAgc2lnbiA9ICh1aW50ID4+IDMxKSAqIDIgKyAxLFxyXG4gICAgICAgICAgICAgICAgZXhwb25lbnQgPSB1aW50ID4+PiAyMyAmIDI1NSxcclxuICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdWludCAmIDgzODg2MDc7XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvbmVudCA9PT0gMjU1XHJcbiAgICAgICAgICAgICAgICA/IG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA/IE5hTlxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIDogZXhwb25lbnQgPT09IDAgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgID8gc2lnbiAqIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSAqIG1hbnRpc3NhXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBNYXRoLnBvdygyLCBleHBvbmVudCAtIDE1MCkgKiAobWFudGlzc2EgKyA4Mzg4NjA4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0TEUgPSByZWFkRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50TEUpO1xyXG4gICAgICAgIGV4cG9ydHMucmVhZEZsb2F0QkUgPSByZWFkRmxvYXRfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50QkUpO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gZG91YmxlOiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDY0QXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGY2NCA9IG5ldyBGbG9hdDY0QXJyYXkoWy0wXSksXHJcbiAgICAgICAgICAgIGY4YiA9IG5ldyBVaW50OEFycmF5KGY2NC5idWZmZXIpLFxyXG4gICAgICAgICAgICBsZSAgPSBmOGJbN10gPT09IDEyODtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X2NweSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzBdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbNF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzZdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbN107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZURvdWJsZV9mNjRfcmV2KHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjY0WzBdID0gdmFsO1xyXG4gICAgICAgICAgICBidWZbcG9zICAgIF0gPSBmOGJbN107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAxXSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDJdID0gZjhiWzVdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgM10gPSBmOGJbNF07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA0XSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDVdID0gZjhiWzJdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNl0gPSBmOGJbMV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA3XSA9IGY4YlswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUxFID0gbGUgPyB3cml0ZURvdWJsZV9mNjRfY3B5IDogd3JpdGVEb3VibGVfZjY0X3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X3JldiA6IHdyaXRlRG91YmxlX2Y2NF9jcHk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfZjY0X2NweShidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIGY4Yls0XSA9IGJ1Zltwb3MgKyA0XTtcclxuICAgICAgICAgICAgZjhiWzVdID0gYnVmW3BvcyArIDVdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgNl07XHJcbiAgICAgICAgICAgIGY4Yls3XSA9IGJ1Zltwb3MgKyA3XTtcclxuICAgICAgICAgICAgcmV0dXJuIGY2NFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfZjY0X3JldihidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICAgIF07XHJcbiAgICAgICAgICAgIGY4Yls2XSA9IGJ1Zltwb3MgKyAxXTtcclxuICAgICAgICAgICAgZjhiWzVdID0gYnVmW3BvcyArIDJdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgM107XHJcbiAgICAgICAgICAgIGY4YlszXSA9IGJ1Zltwb3MgKyA0XTtcclxuICAgICAgICAgICAgZjhiWzJdID0gYnVmW3BvcyArIDVdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgNl07XHJcbiAgICAgICAgICAgIGY4YlswXSA9IGJ1Zltwb3MgKyA3XTtcclxuICAgICAgICAgICAgcmV0dXJuIGY2NFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlTEUgPSBsZSA/IHJlYWREb3VibGVfZjY0X2NweSA6IHJlYWREb3VibGVfZjY0X3JldjtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUJFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9yZXYgOiByZWFkRG91YmxlX2Y2NF9jcHk7XHJcblxyXG4gICAgLy8gZG91YmxlOiBpZWVlNzU0XHJcbiAgICB9KSgpOyBlbHNlIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfaWVlZTc1NCh3cml0ZVVpbnQsIG9mZjAsIG9mZjEsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMSAvIHZhbCA+IDAgPyAvKiBwb3NpdGl2ZSAqLyAwIDogLyogbmVnYXRpdmUgMCAqLyAyMTQ3NDgzNjQ4LCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDIxNDY5NTkzNjAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsID4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpIHsgLy8gKy1JbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCAyMTQ2NDM1MDcyKSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYW50aXNzYTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgPCAyLjIyNTA3Mzg1ODUwNzIwMTRlLTMwOCkgeyAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsIC8gNWUtMzI0O1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludChtYW50aXNzYSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBtYW50aXNzYSAvIDQyOTQ5NjcyOTYpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwb25lbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbCkgLyBNYXRoLkxOMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cG9uZW50ID09PSAxMDI0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvbmVudCA9IDEwMjM7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFudGlzc2EgPSB2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludChtYW50aXNzYSAqIDQ1MDM1OTk2MjczNzA0OTYgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMDIzIDw8IDIwIHwgbWFudGlzc2EgKiAxMDQ4NTc2ICYgMTA0ODU3NSkgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZURvdWJsZUJFID0gd3JpdGVEb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHdyaXRlVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZERvdWJsZV9pZWVlNzU0KHJlYWRVaW50LCBvZmYwLCBvZmYxLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgbG8gPSByZWFkVWludChidWYsIHBvcyArIG9mZjApLFxyXG4gICAgICAgICAgICAgICAgaGkgPSByZWFkVWludChidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB2YXIgc2lnbiA9IChoaSA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gaGkgPj4+IDIwICYgMjA0NyxcclxuICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gNDI5NDk2NzI5NiAqIChoaSAmIDEwNDg1NzUpICsgbG87XHJcbiAgICAgICAgICAgIHJldHVybiBleHBvbmVudCA9PT0gMjA0N1xyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiA1ZS0zMjQgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxMDc1KSAqIChtYW50aXNzYSArIDQ1MDM1OTk2MjczNzA0OTYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlTEUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFLCAwLCA0KTtcclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IHJlYWREb3VibGVfaWVlZTc1NC5iaW5kKG51bGwsIHJlYWRVaW50QkUsIDQsIDApO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgcmV0dXJuIGV4cG9ydHM7XHJcbn1cclxuXHJcbi8vIHVpbnQgaGVscGVyc1xyXG5cclxuZnVuY3Rpb24gd3JpdGVVaW50TEUodmFsLCBidWYsIHBvcykge1xyXG4gICAgYnVmW3BvcyAgICBdID0gIHZhbCAgICAgICAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiA4ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDNdID0gIHZhbCA+Pj4gMjQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludEJFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgPj4+IDI0O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gMTYgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiA4ICAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludExFKGJ1ZiwgcG9zKSB7XHJcbiAgICByZXR1cm4gKGJ1Zltwb3MgICAgXVxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMV0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgMTZcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDNdIDw8IDI0KSA+Pj4gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRCRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF0gPDwgMjRcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAyXSA8PCA4XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSkgPj4+IDA7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gaW5xdWlyZTtcclxuXHJcbi8qKlxyXG4gKiBSZXF1aXJlcyBhIG1vZHVsZSBvbmx5IGlmIGF2YWlsYWJsZS5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZU5hbWUgTW9kdWxlIHRvIHJlcXVpcmVcclxuICogQHJldHVybnMgez9PYmplY3R9IFJlcXVpcmVkIG1vZHVsZSBpZiBhdmFpbGFibGUgYW5kIG5vdCBlbXB0eSwgb3RoZXJ3aXNlIGBudWxsYFxyXG4gKi9cclxuZnVuY3Rpb24gaW5xdWlyZShtb2R1bGVOYW1lKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBtb2QgPSBldmFsKFwicXVpcmVcIi5yZXBsYWNlKC9eLyxcInJlXCIpKShtb2R1bGVOYW1lKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXHJcbiAgICAgICAgaWYgKG1vZCAmJiAobW9kLmxlbmd0aCB8fCBPYmplY3Qua2V5cyhtb2QpLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIHJldHVybiBtb2Q7XHJcbiAgICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBwb29sO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFsbG9jYXRvciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sQWxsb2NhdG9yXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlclxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHNsaWNlciBhcyB1c2VkIGJ5IHtAbGluayB1dGlsLnBvb2x9LlxyXG4gKiBAdHlwZWRlZiBQb29sU2xpY2VyXHJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG9mZnNldFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIEVuZCBvZmZzZXRcclxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEJ1ZmZlciBzbGljZVxyXG4gKiBAdGhpcyB7VWludDhBcnJheX1cclxuICovXHJcblxyXG4vKipcclxuICogQSBnZW5lcmFsIHB1cnBvc2UgYnVmZmVyIHBvb2wuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1Bvb2xBbGxvY2F0b3J9IGFsbG9jIEFsbG9jYXRvclxyXG4gKiBAcGFyYW0ge1Bvb2xTbGljZXJ9IHNsaWNlIFNsaWNlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3NpemU9ODE5Ml0gU2xhYiBzaXplXHJcbiAqIEByZXR1cm5zIHtQb29sQWxsb2NhdG9yfSBQb29sZWQgYWxsb2NhdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBwb29sKGFsbG9jLCBzbGljZSwgc2l6ZSkge1xyXG4gICAgdmFyIFNJWkUgICA9IHNpemUgfHwgODE5MjtcclxuICAgIHZhciBNQVggICAgPSBTSVpFID4+PiAxO1xyXG4gICAgdmFyIHNsYWIgICA9IG51bGw7XHJcbiAgICB2YXIgb2Zmc2V0ID0gU0laRTtcclxuICAgIHJldHVybiBmdW5jdGlvbiBwb29sX2FsbG9jKHNpemUpIHtcclxuICAgICAgICBpZiAoc2l6ZSA8IDEgfHwgc2l6ZSA+IE1BWClcclxuICAgICAgICAgICAgcmV0dXJuIGFsbG9jKHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgKyBzaXplID4gU0laRSkge1xyXG4gICAgICAgICAgICBzbGFiID0gYWxsb2MoU0laRSk7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWYgPSBzbGljZS5jYWxsKHNsYWIsIG9mZnNldCwgb2Zmc2V0ICs9IHNpemUpO1xyXG4gICAgICAgIGlmIChvZmZzZXQgJiA3KSAvLyBhbGlnbiB0byAzMiBiaXRcclxuICAgICAgICAgICAgb2Zmc2V0ID0gKG9mZnNldCB8IDcpICsgMTtcclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgVVRGOCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIHV0ZjggPSBleHBvcnRzO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIFVURjggYnl0ZSBsZW5ndGggb2YgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG51dGY4Lmxlbmd0aCA9IGZ1bmN0aW9uIHV0ZjhfbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIGxlbiA9IDAsXHJcbiAgICAgICAgYyA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYyA8IDEyOClcclxuICAgICAgICAgICAgbGVuICs9IDE7XHJcbiAgICAgICAgZWxzZSBpZiAoYyA8IDIwNDgpXHJcbiAgICAgICAgICAgIGxlbiArPSAyO1xyXG4gICAgICAgIGVsc2UgaWYgKChjICYgMHhGQzAwKSA9PT0gMHhEODAwICYmIChzdHJpbmcuY2hhckNvZGVBdChpICsgMSkgJiAweEZDMDApID09PSAweERDMDApIHtcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICBsZW4gKz0gNDtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgbGVuICs9IDM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIFVURjggYnl0ZXMgYXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFNvdXJjZSBzdGFydFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFNvdXJjZSBlbmRcclxuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIHJlYWRcclxuICovXHJcbnV0ZjgucmVhZCA9IGZ1bmN0aW9uIHV0ZjhfcmVhZChidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcclxuICAgIGlmIChsZW4gPCAxKVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgdmFyIHBhcnRzID0gbnVsbCxcclxuICAgICAgICBjaHVuayA9IFtdLFxyXG4gICAgICAgIGkgPSAwLCAvLyBjaGFyIG9mZnNldFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIHdoaWxlIChzdGFydCA8IGVuZCkge1xyXG4gICAgICAgIHQgPSBidWZmZXJbc3RhcnQrK107XHJcbiAgICAgICAgaWYgKHQgPCAxMjgpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSB0O1xyXG4gICAgICAgIGVsc2UgaWYgKHQgPiAxOTEgJiYgdCA8IDIyNClcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMzEpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MztcclxuICAgICAgICBlbHNlIGlmICh0ID4gMjM5ICYmIHQgPCAzNjUpIHtcclxuICAgICAgICAgICAgdCA9ICgodCAmIDcpIDw8IDE4IHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCAxMiB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgNiB8IGJ1ZmZlcltzdGFydCsrXSAmIDYzKSAtIDB4MTAwMDA7XHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAweEQ4MDAgKyAodCA+PiAxMCk7XHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAweERDMDAgKyAodCAmIDEwMjMpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gKHQgJiAxNSkgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MztcclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSBzdHJpbmcgYXMgVVRGOCBieXRlcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTb3VyY2Ugc3RyaW5nXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIERlc3RpbmF0aW9uIGJ1ZmZlclxyXG4gKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IERlc3RpbmF0aW9uIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlcyB3cml0dGVuXHJcbiAqL1xyXG51dGY4LndyaXRlID0gZnVuY3Rpb24gdXRmOF93cml0ZShzdHJpbmcsIGJ1ZmZlciwgb2Zmc2V0KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBvZmZzZXQsXHJcbiAgICAgICAgYzEsIC8vIGNoYXJhY3RlciAxXHJcbiAgICAgICAgYzI7IC8vIGNoYXJhY3RlciAyXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGMxID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMxIDwgMTI4KSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGMxIDwgMjA0OCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgICAgICB8IDE5MjtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIGlmICgoYzEgJiAweEZDMDApID09PSAweEQ4MDAgJiYgKChjMiA9IHN0cmluZy5jaGFyQ29kZUF0KGkgKyAxKSkgJiAweEZDMDApID09PSAweERDMDApIHtcclxuICAgICAgICAgICAgYzEgPSAweDEwMDAwICsgKChjMSAmIDB4MDNGRikgPDwgMTApICsgKGMyICYgMHgwM0ZGKTtcclxuICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTggICAgICB8IDI0MDtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gMTIgICAgICB8IDIyNDtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXQgLSBzdGFydDtcclxufTtcclxuIiwiLy8gbWluaW1hbCBsaWJyYXJ5IGVudHJ5IHBvaW50LlxuXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vc3JjL2luZGV4LW1pbmltYWxcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBwcm90b2J1ZiA9IGV4cG9ydHM7XG5cbi8qKlxuICogQnVpbGQgdHlwZSwgb25lIG9mIGBcImZ1bGxcImAsIGBcImxpZ2h0XCJgIG9yIGBcIm1pbmltYWxcImAuXG4gKiBAbmFtZSBidWlsZFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5wcm90b2J1Zi5idWlsZCA9IFwibWluaW1hbFwiO1xuXG4vLyBTZXJpYWxpemF0aW9uXG5wcm90b2J1Zi5Xcml0ZXIgICAgICAgPSByZXF1aXJlKFwiLi93cml0ZXJcIik7XG5wcm90b2J1Zi5CdWZmZXJXcml0ZXIgPSByZXF1aXJlKFwiLi93cml0ZXJfYnVmZmVyXCIpO1xucHJvdG9idWYuUmVhZGVyICAgICAgID0gcmVxdWlyZShcIi4vcmVhZGVyXCIpO1xucHJvdG9idWYuQnVmZmVyUmVhZGVyID0gcmVxdWlyZShcIi4vcmVhZGVyX2J1ZmZlclwiKTtcblxuLy8gVXRpbGl0eVxucHJvdG9idWYudXRpbCAgICAgICAgID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xucHJvdG9idWYucnBjICAgICAgICAgID0gcmVxdWlyZShcIi4vcnBjXCIpO1xucHJvdG9idWYucm9vdHMgICAgICAgID0gcmVxdWlyZShcIi4vcm9vdHNcIik7XG5wcm90b2J1Zi5jb25maWd1cmUgICAgPSBjb25maWd1cmU7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4vKipcbiAqIFJlY29uZmlndXJlcyB0aGUgbGlicmFyeSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50LlxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gY29uZmlndXJlKCkge1xuICAgIHByb3RvYnVmLnV0aWwuX2NvbmZpZ3VyZSgpO1xuICAgIHByb3RvYnVmLldyaXRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlcldyaXRlcik7XG4gICAgcHJvdG9idWYuUmVhZGVyLl9jb25maWd1cmUocHJvdG9idWYuQnVmZmVyUmVhZGVyKTtcbn1cblxuLy8gU2V0IHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnRcbmNvbmZpZ3VyZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWRlcjtcblxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxudmFyIEJ1ZmZlclJlYWRlcjsgLy8gY3ljbGljXG5cbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIGluZGV4T3V0T2ZSYW5nZShyZWFkZXIsIHdyaXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIFJhbmdlRXJyb3IoXCJpbmRleCBvdXQgb2YgcmFuZ2U6IFwiICsgcmVhZGVyLnBvcyArIFwiICsgXCIgKyAod3JpdGVMZW5ndGggfHwgMSkgKyBcIiA+IFwiICsgcmVhZGVyLmxlbik7XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyByZWFkZXIgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBgVWludDhBcnJheWAgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgYEFycmF5YC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICovXG5mdW5jdGlvbiBSZWFkZXIoYnVmZmVyKSB7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlci5cbiAgICAgKiBAdHlwZSB7VWludDhBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmJ1ZiA9IGJ1ZmZlcjtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIHBvc2l0aW9uLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5wb3MgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSBidWZmZXIubGVuZ3RoO1xufVxuXG52YXIgY3JlYXRlX2FycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCJcbiAgICA/IGZ1bmN0aW9uIGNyZWF0ZV90eXBlZF9hcnJheShidWZmZXIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwgQXJyYXkuaXNBcnJheShidWZmZXIpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWFkZXIoYnVmZmVyKTtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJpbGxlZ2FsIGJ1ZmZlclwiKTtcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICA6IGZ1bmN0aW9uIGNyZWF0ZV9hcnJheShidWZmZXIpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfTtcblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gdXRpbC5CdWZmZXJcbiAgICAgICAgPyBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyX3NldHVwKGJ1ZmZlcikge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFkZXIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcihidWZmZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbC5CdWZmZXIuaXNCdWZmZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBCdWZmZXJSZWFkZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZV9hcnJheShidWZmZXIpO1xuICAgICAgICAgICAgfSkoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IGNyZWF0ZV9hcnJheTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyByZWFkZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBidWZmZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7VWludDhBcnJheXxCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKiBAcmV0dXJucyB7UmVhZGVyfEJ1ZmZlclJlYWRlcn0gQSB7QGxpbmsgQnVmZmVyUmVhZGVyfSBpZiBgYnVmZmVyYCBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGEge0BsaW5rIFJlYWRlcn1cbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgYnVmZmVyYCBpcyBub3QgYSB2YWxpZCBidWZmZXJcbiAqL1xuUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuXG5SZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnN1YmFycmF5IHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnVpbnQzMiA9IChmdW5jdGlvbiByZWFkX3VpbnQzMl9zZXR1cCgpIHtcbiAgICB2YXIgdmFsdWUgPSA0Mjk0OTY3Mjk1OyAvLyBvcHRpbWl6ZXIgdHlwZS1oaW50LCB0ZW5kcyB0byBkZW9wdCBvdGhlcndpc2UgKD8hKVxuICAgIHJldHVybiBmdW5jdGlvbiByZWFkX3VpbnQzMigpIHtcbiAgICAgICAgdmFsdWUgPSAoICAgICAgICAgdGhpcy5idWZbdGhpcy5wb3NdICYgMTI3ICAgICAgICkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8ICA3KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMTQpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAyMSkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAgMTUpIDw8IDI4KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICgodGhpcy5wb3MgKz0gNSkgPiB0aGlzLmxlbikge1xuICAgICAgICAgICAgdGhpcy5wb3MgPSB0aGlzLmxlbjtcbiAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHJlYWRfaW50MzIoKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgMzIgYml0IHZhbHVlLlxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ludDMyKCkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMudWludDMyKCk7XG4gICAgcmV0dXJuIHZhbHVlID4+PiAxIF4gLSh2YWx1ZSAmIDEpIHwgMDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5mdW5jdGlvbiByZWFkTG9uZ1ZhcmludCgpIHtcbiAgICAvLyB0ZW5kcyB0byBkZW9wdCB3aXRoIGxvY2FsIHZhcnMgZm9yIG9jdGV0IGV0Yy5cbiAgICB2YXIgYml0cyA9IG5ldyBMb25nQml0cygwLCAwKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGxvKVxuICAgICAgICBmb3IgKDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgLy8gMXN0Li40dGhcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLyA1dGhcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjgpID4+PiAwO1xuICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA+PiAgNCkgPj4+IDA7XG4gICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICBpID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaSA8IDM7ICsraSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICAgICAgLy8gMXN0Li4zdGhcbiAgICAgICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3KSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLyA0dGhcbiAgICAgICAgYml0cy5sbyA9IChiaXRzLmxvIHwgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgIHJldHVybiBiaXRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5sZW4gLSB0aGlzLnBvcyA+IDQpIHsgLy8gZmFzdCByb3V0ZSAoaGkpXG4gICAgICAgIGZvciAoOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICAvLyA2dGguLjEwdGhcbiAgICAgICAgICAgIGJpdHMuaGkgPSAoYml0cy5oaSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IGkgKiA3ICsgMykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW4pXG4gICAgICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMpO1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHZhcmludCBlbmNvZGluZ1wiKTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjaW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgdmFyaW50IGFzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZS5cbiAqIEBuYW1lIFJlYWRlciN1aW50NjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIGEgemlnLXphZyBlbmNvZGVkIHZhcmludCBhcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjc2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIGJvb2xlYW4uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmJvb2wgPSBmdW5jdGlvbiByZWFkX2Jvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDMyKCkgIT09IDA7XG59O1xuXG5mdW5jdGlvbiByZWFkRml4ZWQzMl9lbmQoYnVmLCBlbmQpIHsgLy8gbm90ZSB0aGF0IHRoaXMgdXNlcyBgZW5kYCwgbm90IGBwb3NgXG4gICAgcmV0dXJuIChidWZbZW5kIC0gNF1cbiAgICAgICAgICB8IGJ1ZltlbmQgLSAzXSA8PCA4XG4gICAgICAgICAgfCBidWZbZW5kIC0gMl0gPDwgMTZcbiAgICAgICAgICB8IGJ1ZltlbmQgLSAxXSA8PCAyNCkgPj4+IDA7XG59XG5cbi8qKlxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgaW50ZWdlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5maXhlZDMyID0gZnVuY3Rpb24gcmVhZF9maXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KTtcbn07XG5cbi8qKlxuICogUmVhZHMgZml4ZWQgMzIgYml0cyBhcyBhIHNpZ25lZCAzMiBiaXQgaW50ZWdlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkMzIoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA0ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHJldHVybiByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpIHwgMDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWludmFsaWQtdGhpcyAqL1xuXG5mdW5jdGlvbiByZWFkRml4ZWQ2NCgvKiB0aGlzOiBSZWFkZXIgKi8pIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDggPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDgpO1xuXG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhyZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpLCByZWFkRml4ZWQzMl9lbmQodGhpcy5idWYsIHRoaXMucG9zICs9IDQpKTtcbn1cblxuLyogZXNsaW50LWVuYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuLyoqXG4gKiBSZWFkcyBmaXhlZCA2NCBiaXRzLlxuICogQG5hbWUgUmVhZGVyI2ZpeGVkNjRcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0xvbmd9IFZhbHVlIHJlYWRcbiAqL1xuXG4vKipcbiAqIFJlYWRzIHppZy16YWcgZW5jb2RlZCBmaXhlZCA2NCBiaXRzLlxuICogQG5hbWUgUmVhZGVyI3NmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIGZsb2F0ICgzMiBiaXQpIGFzIGEgbnVtYmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiByZWFkX2Zsb2F0KCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWRGbG9hdExFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XG4gICAgdGhpcy5wb3MgKz0gNDtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgZG91YmxlICg2NCBiaXQgZmxvYXQpIGFzIGEgbnVtYmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gcmVhZF9kb3VibGUoKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA0KTtcblxuICAgIHZhciB2YWx1ZSA9IHV0aWwuZmxvYXQucmVhZERvdWJsZUxFKHRoaXMuYnVmLCB0aGlzLnBvcyk7XG4gICAgdGhpcy5wb3MgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gcmVhZF9ieXRlcygpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy51aW50MzIoKSxcbiAgICAgICAgc3RhcnQgID0gdGhpcy5wb3MsXG4gICAgICAgIGVuZCAgICA9IHRoaXMucG9zICsgbGVuZ3RoO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGVuZCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcblxuICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmJ1ZikpIC8vIHBsYWluIGFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLmJ1Zi5zbGljZShzdGFydCwgZW5kKTtcbiAgICByZXR1cm4gc3RhcnQgPT09IGVuZCAvLyBmaXggZm9yIElFIDEwL1dpbjggYW5kIG90aGVycycgc3ViYXJyYXkgcmV0dXJuaW5nIGFycmF5IG9mIHNpemUgMVxuICAgICAgICA/IG5ldyB0aGlzLmJ1Zi5jb25zdHJ1Y3RvcigwKVxuICAgICAgICA6IHRoaXMuX3NsaWNlLmNhbGwodGhpcy5idWYsIHN0YXJ0LCBlbmQpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHN0cmluZyBwcmVjZWVkZWQgYnkgaXRzIGJ5dGUgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge3N0cmluZ30gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHJlYWRfc3RyaW5nKCkge1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXMoKTtcbiAgICByZXR1cm4gdXRmOC5yZWFkKGJ5dGVzLCAwLCBieXRlcy5sZW5ndGgpO1xufTtcblxuLyoqXG4gKiBTa2lwcyB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBieXRlcyBpZiBzcGVjaWZpZWQsIG90aGVyd2lzZSBza2lwcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBMZW5ndGggaWYga25vd24sIG90aGVyd2lzZSBhIHZhcmludCBpcyBhc3N1bWVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gc2tpcChsZW5ndGgpIHtcbiAgICBpZiAodHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKHRoaXMucG9zICsgbGVuZ3RoID4gdGhpcy5sZW4pXG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gbGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5idWZbdGhpcy5wb3MrK10gJiAxMjgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIG5leHQgZWxlbWVudCBvZiB0aGUgc3BlY2lmaWVkIHdpcmUgdHlwZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3aXJlVHlwZSBXaXJlIHR5cGUgcmVjZWl2ZWRcbiAqIEByZXR1cm5zIHtSZWFkZXJ9IGB0aGlzYFxuICovXG5SZWFkZXIucHJvdG90eXBlLnNraXBUeXBlID0gZnVuY3Rpb24od2lyZVR5cGUpIHtcbiAgICBzd2l0Y2ggKHdpcmVUeXBlKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHRoaXMuc2tpcCg4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy51aW50MzIoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgd2hpbGUgKCh3aXJlVHlwZSA9IHRoaXMudWludDMyKCkgJiA3KSAhPT0gNCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2tpcFR5cGUod2lyZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHRoaXMuc2tpcCg0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgd2lyZSB0eXBlIFwiICsgd2lyZVR5cGUgKyBcIiBhdCBvZmZzZXQgXCIgKyB0aGlzLnBvcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJSZWFkZXJfKSB7XG4gICAgQnVmZmVyUmVhZGVyID0gQnVmZmVyUmVhZGVyXztcbiAgICBSZWFkZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyUmVhZGVyLl9jb25maWd1cmUoKTtcblxuICAgIHZhciBmbiA9IHV0aWwuTG9uZyA/IFwidG9Mb25nXCIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBcInRvTnVtYmVyXCI7XG4gICAgdXRpbC5tZXJnZShSZWFkZXIucHJvdG90eXBlLCB7XG5cbiAgICAgICAgaW50NjQ6IGZ1bmN0aW9uIHJlYWRfaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVpbnQ2NDogZnVuY3Rpb24gcmVhZF91aW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2ludDY0OiBmdW5jdGlvbiByZWFkX3NpbnQ2NCgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWFkTG9uZ1ZhcmludC5jYWxsKHRoaXMpLnp6RGVjb2RlKClbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmaXhlZDY0OiBmdW5jdGlvbiByZWFkX2ZpeGVkNjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0odHJ1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2ZpeGVkNjQ6IGZ1bmN0aW9uIHJlYWRfc2ZpeGVkNjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZEZpeGVkNjQuY2FsbCh0aGlzKVtmbl0oZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyUmVhZGVyO1xuXG4vLyBleHRlbmRzIFJlYWRlclxudmFyIFJlYWRlciA9IHJlcXVpcmUoXCIuL3JlYWRlclwiKTtcbihCdWZmZXJSZWFkZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShSZWFkZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJSZWFkZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHJlYWRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgcmVhZGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cbiAqIEBleHRlbmRzIFJlYWRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gQnVmZmVyUmVhZGVyKGJ1ZmZlcikge1xuICAgIFJlYWRlci5jYWxsKHRoaXMsIGJ1ZmZlcik7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlci5cbiAgICAgKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnVmXG4gICAgICogQHR5cGUge0J1ZmZlcn1cbiAgICAgKi9cbn1cblxuQnVmZmVyUmVhZGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAodXRpbC5CdWZmZXIpXG4gICAgICAgIEJ1ZmZlclJlYWRlci5wcm90b3R5cGUuX3NsaWNlID0gdXRpbC5CdWZmZXIucHJvdG90eXBlLnNsaWNlO1xufTtcblxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJSZWFkZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHJlYWRfc3RyaW5nX2J1ZmZlcigpIHtcbiAgICB2YXIgbGVuID0gdGhpcy51aW50MzIoKTsgLy8gbW9kaWZpZXMgcG9zXG4gICAgcmV0dXJuIHRoaXMuYnVmLnV0ZjhTbGljZVxuICAgICAgICA/IHRoaXMuYnVmLnV0ZjhTbGljZSh0aGlzLnBvcywgdGhpcy5wb3MgPSBNYXRoLm1pbih0aGlzLnBvcyArIGxlbiwgdGhpcy5sZW4pKVxuICAgICAgICA6IHRoaXMuYnVmLnRvU3RyaW5nKFwidXRmLThcIiwgdGhpcy5wb3MsIHRoaXMucG9zID0gTWF0aC5taW4odGhpcy5wb3MgKyBsZW4sIHRoaXMubGVuKSk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMgcHJlY2VlZGVkIGJ5IGl0cyBsZW5ndGggYXMgYSB2YXJpbnQuXG4gKiBAbmFtZSBCdWZmZXJSZWFkZXIjYnl0ZXNcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcn0gVmFsdWUgcmVhZFxuICovXG5cbkJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0ge307XG5cbi8qKlxuICogTmFtZWQgcm9vdHMuXG4gKiBUaGlzIGlzIHdoZXJlIHBianMgc3RvcmVzIGdlbmVyYXRlZCBzdHJ1Y3R1cmVzICh0aGUgb3B0aW9uIGAtciwgLS1yb290YCBzcGVjaWZpZXMgYSBuYW1lKS5cbiAqIENhbiBhbHNvIGJlIHVzZWQgbWFudWFsbHkgdG8gbWFrZSByb290cyBhdmFpbGFibGUgYWNjcm9zcyBtb2R1bGVzLlxuICogQG5hbWUgcm9vdHNcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZyxSb290Pn1cbiAqIEBleGFtcGxlXG4gKiAvLyBwYmpzIC1yIG15cm9vdCAtbyBjb21waWxlZC5qcyAuLi5cbiAqXG4gKiAvLyBpbiBhbm90aGVyIG1vZHVsZTpcbiAqIHJlcXVpcmUoXCIuL2NvbXBpbGVkLmpzXCIpO1xuICpcbiAqIC8vIGluIGFueSBzdWJzZXF1ZW50IG1vZHVsZTpcbiAqIHZhciByb290ID0gcHJvdG9idWYucm9vdHNbXCJteXJvb3RcIl07XG4gKi9cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFN0cmVhbWluZyBSUEMgaGVscGVycy5cbiAqIEBuYW1lc3BhY2VcbiAqL1xudmFyIHJwYyA9IGV4cG9ydHM7XG5cbi8qKlxuICogUlBDIGltcGxlbWVudGF0aW9uIHBhc3NlZCB0byB7QGxpbmsgU2VydmljZSNjcmVhdGV9IHBlcmZvcm1pbmcgYSBzZXJ2aWNlIHJlcXVlc3Qgb24gbmV0d29yayBsZXZlbCwgaS5lLiBieSB1dGlsaXppbmcgaHR0cCByZXF1ZXN0cyBvciB3ZWJzb2NrZXRzLlxuICogQHR5cGVkZWYgUlBDSW1wbFxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8TWVzc2FnZTx7fT4sTWVzc2FnZTx7fT4+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2QgYmVpbmcgY2FsbGVkXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IHJlcXVlc3REYXRhIFJlcXVlc3QgZGF0YVxuICogQHBhcmFtIHtSUENJbXBsQ2FsbGJhY2t9IGNhbGxiYWNrIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIHJwY0ltcGwobWV0aG9kLCByZXF1ZXN0RGF0YSwgY2FsbGJhY2spIHtcbiAqICAgICBpZiAocHJvdG9idWYudXRpbC5sY0ZpcnN0KG1ldGhvZC5uYW1lKSAhPT0gXCJteU1ldGhvZFwiKSAvLyBjb21wYXRpYmxlIHdpdGggc3RhdGljIGNvZGVcbiAqICAgICAgICAgdGhyb3cgRXJyb3IoXCJubyBzdWNoIG1ldGhvZFwiKTtcbiAqICAgICBhc3luY2hyb25vdXNseU9idGFpbkFSZXNwb25zZShyZXF1ZXN0RGF0YSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZURhdGEpIHtcbiAqICAgICAgICAgY2FsbGJhY2soZXJyLCByZXNwb25zZURhdGEpO1xuICogICAgIH0pO1xuICogfVxuICovXG5cbi8qKlxuICogTm9kZS1zdHlsZSBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBSUENJbXBsfS5cbiAqIEB0eXBlZGVmIFJQQ0ltcGxDYWxsYmFja1xuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55LCBvdGhlcndpc2UgYG51bGxgXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8bnVsbH0gW3Jlc3BvbnNlXSBSZXNwb25zZSBkYXRhIG9yIGBudWxsYCB0byBzaWduYWwgZW5kIG9mIHN0cmVhbSwgaWYgdGhlcmUgaGFzbid0IGJlZW4gYW4gZXJyb3JcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxucnBjLlNlcnZpY2UgPSByZXF1aXJlKFwiLi9ycGMvc2VydmljZVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBTZXJ2aWNlO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsL21pbmltYWxcIik7XG5cbi8vIEV4dGVuZHMgRXZlbnRFbWl0dGVyXG4oU2VydmljZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHV0aWwuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gU2VydmljZTtcblxuLyoqXG4gKiBBIHNlcnZpY2UgbWV0aG9kIGNhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHJwYy5TZXJ2aWNlTWV0aG9kfFNlcnZpY2VNZXRob2R9LlxuICpcbiAqIERpZmZlcnMgZnJvbSB7QGxpbmsgUlBDSW1wbENhbGxiYWNrfSBpbiB0aGF0IGl0IGlzIGFuIGFjdHVhbCBjYWxsYmFjayBvZiBhIHNlcnZpY2UgbWV0aG9kIHdoaWNoIG1heSBub3QgcmV0dXJuIGByZXNwb25zZSA9IG51bGxgLlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RDYWxsYmFja1xuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcbiAqIEBwYXJhbSB7VFJlc30gW3Jlc3BvbnNlXSBSZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBwYXJ0IG9mIGEge0BsaW5rIHJwYy5TZXJ2aWNlfSBhcyBjcmVhdGVkIGJ5IHtAbGluayBTZXJ2aWNlLmNyZWF0ZX0uXG4gKiBAdHlwZWRlZiBycGMuU2VydmljZU1ldGhvZFxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gW2NhbGxiYWNrXSBOb2RlLXN0eWxlIGNhbGxiYWNrIGNhbGxlZCB3aXRoIHRoZSBlcnJvciwgaWYgYW55LCBhbmQgdGhlIHJlc3BvbnNlIG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPE1lc3NhZ2U8VFJlcz4+fSBQcm9taXNlIGlmIGBjYWxsYmFja2AgaGFzIGJlZW4gb21pdHRlZCwgb3RoZXJ3aXNlIGB1bmRlZmluZWRgXG4gKi9cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IFJQQyBzZXJ2aWNlIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBBbiBSUEMgc2VydmljZSBhcyByZXR1cm5lZCBieSB7QGxpbmsgU2VydmljZSNjcmVhdGV9LlxuICogQGV4cG9ydHMgcnBjLlNlcnZpY2VcbiAqIEBleHRlbmRzIHV0aWwuRXZlbnRFbWl0dGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UlBDSW1wbH0gcnBjSW1wbCBSUEMgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVlc3REZWxpbWl0ZWQ9ZmFsc2VdIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc3BvbnNlRGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZFxuICovXG5mdW5jdGlvbiBTZXJ2aWNlKHJwY0ltcGwsIHJlcXVlc3REZWxpbWl0ZWQsIHJlc3BvbnNlRGVsaW1pdGVkKSB7XG5cbiAgICBpZiAodHlwZW9mIHJwY0ltcGwgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicnBjSW1wbCBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG5cbiAgICB1dGlsLkV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogUlBDIGltcGxlbWVudGF0aW9uLiBCZWNvbWVzIGBudWxsYCBvbmNlIHRoZSBzZXJ2aWNlIGlzIGVuZGVkLlxuICAgICAqIEB0eXBlIHtSUENJbXBsfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5ycGNJbXBsID0gcnBjSW1wbDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcmVxdWVzdHMgYXJlIGxlbmd0aC1kZWxpbWl0ZWQuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5yZXF1ZXN0RGVsaW1pdGVkID0gQm9vbGVhbihyZXF1ZXN0RGVsaW1pdGVkKTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcmVzcG9uc2VzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVzcG9uc2VEZWxpbWl0ZWQgPSBCb29sZWFuKHJlc3BvbnNlRGVsaW1pdGVkKTtcbn1cblxuLyoqXG4gKiBDYWxscyBhIHNlcnZpY2UgbWV0aG9kIHRocm91Z2gge0BsaW5rIHJwYy5TZXJ2aWNlI3JwY0ltcGx8cnBjSW1wbH0uXG4gKiBAcGFyYW0ge01ldGhvZHxycGMuU2VydmljZU1ldGhvZDxUUmVxLFRSZXM+fSBtZXRob2QgUmVmbGVjdGVkIG9yIHN0YXRpYyBtZXRob2RcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcT59IHJlcXVlc3RDdG9yIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Q29uc3RydWN0b3I8VFJlcz59IHJlc3BvbnNlQ3RvciBSZXNwb25zZSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtUUmVxfFByb3BlcnRpZXM8VFJlcT59IHJlcXVlc3QgUmVxdWVzdCBtZXNzYWdlIG9yIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtycGMuU2VydmljZU1ldGhvZENhbGxiYWNrPFRSZXM+fSBjYWxsYmFjayBTZXJ2aWNlIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQHRlbXBsYXRlIFRSZXEgZXh0ZW5kcyBNZXNzYWdlPFRSZXE+XG4gKiBAdGVtcGxhdGUgVFJlcyBleHRlbmRzIE1lc3NhZ2U8VFJlcz5cbiAqL1xuU2VydmljZS5wcm90b3R5cGUucnBjQ2FsbCA9IGZ1bmN0aW9uIHJwY0NhbGwobWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0LCBjYWxsYmFjaykge1xuXG4gICAgaWYgKCFyZXF1ZXN0KVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZXF1ZXN0IG11c3QgYmUgc3BlY2lmaWVkXCIpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICghY2FsbGJhY2spXG4gICAgICAgIHJldHVybiB1dGlsLmFzUHJvbWlzZShycGNDYWxsLCBzZWxmLCBtZXRob2QsIHJlcXVlc3RDdG9yLCByZXNwb25zZUN0b3IsIHJlcXVlc3QpO1xuXG4gICAgaWYgKCFzZWxmLnJwY0ltcGwpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soRXJyb3IoXCJhbHJlYWR5IGVuZGVkXCIpKTsgfSwgMCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHNlbGYucnBjSW1wbChcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHJlcXVlc3RDdG9yW3NlbGYucmVxdWVzdERlbGltaXRlZCA/IFwiZW5jb2RlRGVsaW1pdGVkXCIgOiBcImVuY29kZVwiXShyZXF1ZXN0KS5maW5pc2goKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJwY0NhbGxiYWNrKGVyciwgcmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmQoLyogZW5kZWRCeVJQQyAqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIShyZXNwb25zZSBpbnN0YW5jZW9mIHJlc3BvbnNlQ3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2VDdG9yW3NlbGYucmVzcG9uc2VEZWxpbWl0ZWQgPyBcImRlY29kZURlbGltaXRlZFwiIDogXCJkZWNvZGVcIl0ocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KFwiZGF0YVwiLCByZXNwb25zZSwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGVycik7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn07XG5cbi8qKlxuICogRW5kcyB0aGlzIHNlcnZpY2UgYW5kIGVtaXRzIHRoZSBgZW5kYCBldmVudC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuZGVkQnlSUEM9ZmFsc2VdIFdoZXRoZXIgdGhlIHNlcnZpY2UgaGFzIGJlZW4gZW5kZWQgYnkgdGhlIFJQQyBpbXBsZW1lbnRhdGlvbi5cbiAqIEByZXR1cm5zIHtycGMuU2VydmljZX0gYHRoaXNgXG4gKi9cblNlcnZpY2UucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIGVuZChlbmRlZEJ5UlBDKSB7XG4gICAgaWYgKHRoaXMucnBjSW1wbCkge1xuICAgICAgICBpZiAoIWVuZGVkQnlSUEMpIC8vIHNpZ25hbCBlbmQgdG8gcnBjSW1wbFxuICAgICAgICAgICAgdGhpcy5ycGNJbXBsKG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICB0aGlzLnJwY0ltcGwgPSBudWxsO1xuICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIikub2ZmKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBMb25nQml0cztcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cy5cbiAqIEBjbGFzc2Rlc2MgSGVscGVyIGNsYXNzIGZvciB3b3JraW5nIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtudW1iZXJ9IGxvIExvdyAzMiBiaXRzLCB1bnNpZ25lZFxuICogQHBhcmFtIHtudW1iZXJ9IGhpIEhpZ2ggMzIgYml0cywgdW5zaWduZWRcbiAqL1xuZnVuY3Rpb24gTG9uZ0JpdHMobG8sIGhpKSB7XG5cbiAgICAvLyBub3RlIHRoYXQgdGhlIGNhc3RzIGJlbG93IGFyZSB0aGVvcmV0aWNhbGx5IHVubmVjZXNzYXJ5IGFzIG9mIHRvZGF5LCBidXQgb2xkZXIgc3RhdGljYWxseVxuICAgIC8vIGdlbmVyYXRlZCBjb252ZXJ0ZXIgY29kZSBtaWdodCBzdGlsbCBjYWxsIHRoZSBjdG9yIHdpdGggc2lnbmVkIDMyYml0cy4ga2VwdCBmb3IgY29tcGF0LlxuXG4gICAgLyoqXG4gICAgICogTG93IGJpdHMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxvID0gbG8gPj4+IDA7XG5cbiAgICAvKipcbiAgICAgKiBIaWdoIGJpdHMuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmhpID0gaGkgPj4+IDA7XG59XG5cbi8qKlxuICogWmVybyBiaXRzLlxuICogQG1lbWJlcm9mIHV0aWwuTG9uZ0JpdHNcbiAqIEB0eXBlIHt1dGlsLkxvbmdCaXRzfVxuICovXG52YXIgemVybyA9IExvbmdCaXRzLnplcm8gPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG5cbnplcm8udG9OdW1iZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG56ZXJvLnp6RW5jb2RlID0gemVyby56ekRlY29kZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfTtcbnplcm8ubGVuZ3RoID0gZnVuY3Rpb24oKSB7IHJldHVybiAxOyB9O1xuXG4vKipcbiAqIFplcm8gaGFzaC5cbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG52YXIgemVyb0hhc2ggPSBMb25nQml0cy56ZXJvSGFzaCA9IFwiXFwwXFwwXFwwXFwwXFwwXFwwXFwwXFwwXCI7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWVcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxuICovXG5Mb25nQml0cy5mcm9tTnVtYmVyID0gZnVuY3Rpb24gZnJvbU51bWJlcih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gMClcbiAgICAgICAgcmV0dXJuIHplcm87XG4gICAgdmFyIHNpZ24gPSB2YWx1ZSA8IDA7XG4gICAgaWYgKHNpZ24pXG4gICAgICAgIHZhbHVlID0gLXZhbHVlO1xuICAgIHZhciBsbyA9IHZhbHVlID4+PiAwLFxuICAgICAgICBoaSA9ICh2YWx1ZSAtIGxvKSAvIDQyOTQ5NjcyOTYgPj4+IDA7XG4gICAgaWYgKHNpZ24pIHtcbiAgICAgICAgaGkgPSB+aGkgPj4+IDA7XG4gICAgICAgIGxvID0gfmxvID4+PiAwO1xuICAgICAgICBpZiAoKytsbyA+IDQyOTQ5NjcyOTUpIHtcbiAgICAgICAgICAgIGxvID0gMDtcbiAgICAgICAgICAgIGlmICgrK2hpID4gNDI5NDk2NzI5NSlcbiAgICAgICAgICAgICAgICBoaSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhsbywgaGkpO1xufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMgZnJvbSBhIG51bWJlciwgbG9uZyBvciBzdHJpbmcuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWVcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBJbnN0YW5jZVxuICovXG5Mb25nQml0cy5mcm9tID0gZnVuY3Rpb24gZnJvbSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgICAgIHZhbHVlID0gdXRpbC5Mb25nLmZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcihwYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLmxvdyB8fCB2YWx1ZS5oaWdoID8gbmV3IExvbmdCaXRzKHZhbHVlLmxvdyA+Pj4gMCwgdmFsdWUuaGlnaCA+Pj4gMCkgOiB6ZXJvO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIHBvc3NpYmx5IHVuc2FmZSBKYXZhU2NyaXB0IG51bWJlci5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Vuc2lnbmVkPWZhbHNlXSBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICogQHJldHVybnMge251bWJlcn0gUG9zc2libHkgdW5zYWZlIG51bWJlclxuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9OdW1iZXIgPSBmdW5jdGlvbiB0b051bWJlcih1bnNpZ25lZCkge1xuICAgIGlmICghdW5zaWduZWQgJiYgdGhpcy5oaSA+Pj4gMzEpIHtcbiAgICAgICAgdmFyIGxvID0gfnRoaXMubG8gKyAxID4+PiAwLFxuICAgICAgICAgICAgaGkgPSB+dGhpcy5oaSAgICAgPj4+IDA7XG4gICAgICAgIGlmICghbG8pXG4gICAgICAgICAgICBoaSA9IGhpICsgMSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIC0obG8gKyBoaSAqIDQyOTQ5NjcyOTYpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sbyArIHRoaXMuaGkgKiA0Mjk0OTY3Mjk2O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIGxvbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfSBMb25nXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b0xvbmcgPSBmdW5jdGlvbiB0b0xvbmcodW5zaWduZWQpIHtcbiAgICByZXR1cm4gdXRpbC5Mb25nXG4gICAgICAgID8gbmV3IHV0aWwuTG9uZyh0aGlzLmxvIHwgMCwgdGhpcy5oaSB8IDAsIEJvb2xlYW4odW5zaWduZWQpKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA6IHsgbG93OiB0aGlzLmxvIHwgMCwgaGlnaDogdGhpcy5oaSB8IDAsIHVuc2lnbmVkOiBCb29sZWFuKHVuc2lnbmVkKSB9O1xufTtcblxudmFyIGNoYXJDb2RlQXQgPSBTdHJpbmcucHJvdG90eXBlLmNoYXJDb2RlQXQ7XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gdGhlIHNwZWNpZmllZCA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IEJpdHNcbiAqL1xuTG9uZ0JpdHMuZnJvbUhhc2ggPSBmdW5jdGlvbiBmcm9tSGFzaChoYXNoKSB7XG4gICAgaWYgKGhhc2ggPT09IHplcm9IYXNoKVxuICAgICAgICByZXR1cm4gemVybztcbiAgICByZXR1cm4gbmV3IExvbmdCaXRzKFxuICAgICAgICAoIGNoYXJDb2RlQXQuY2FsbChoYXNoLCAwKVxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAxKSA8PCA4XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDIpIDw8IDE2XG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDMpIDw8IDI0KSA+Pj4gMFxuICAgICxcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNClcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNSkgPDwgOFxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA2KSA8PCAxNlxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCA3KSA8PCAyNCkgPj4+IDBcbiAgICApO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIGxvbmcgYml0cyB0byBhIDggY2hhcmFjdGVycyBsb25nIGhhc2guXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBIYXNoXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS50b0hhc2ggPSBmdW5jdGlvbiB0b0hhc2goKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgICAgIHRoaXMubG8gICAgICAgICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiA4ICAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gMTYgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDI0ICAgICAgLFxuICAgICAgICB0aGlzLmhpICAgICAgICAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gOCAgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDE2ICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiAyNFxuICAgICk7XG59O1xuXG4vKipcbiAqIFppZy16YWcgZW5jb2RlcyB0aGlzIGxvbmcgYml0cy5cbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnp6RW5jb2RlID0gZnVuY3Rpb24genpFbmNvZGUoKSB7XG4gICAgdmFyIG1hc2sgPSAgIHRoaXMuaGkgPj4gMzE7XG4gICAgdGhpcy5oaSAgPSAoKHRoaXMuaGkgPDwgMSB8IHRoaXMubG8gPj4+IDMxKSBeIG1hc2spID4+PiAwO1xuICAgIHRoaXMubG8gID0gKCB0aGlzLmxvIDw8IDEgICAgICAgICAgICAgICAgICAgXiBtYXNrKSA+Pj4gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogWmlnLXphZyBkZWNvZGVzIHRoaXMgbG9uZyBiaXRzLlxuICogQHJldHVybnMge3V0aWwuTG9uZ0JpdHN9IGB0aGlzYFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUuenpEZWNvZGUgPSBmdW5jdGlvbiB6ekRlY29kZSgpIHtcbiAgICB2YXIgbWFzayA9IC0odGhpcy5sbyAmIDEpO1xuICAgIHRoaXMubG8gID0gKCh0aGlzLmxvID4+PiAxIHwgdGhpcy5oaSA8PCAzMSkgXiBtYXNrKSA+Pj4gMDtcbiAgICB0aGlzLmhpICA9ICggdGhpcy5oaSA+Pj4gMSAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGlzIGxvbmdiaXRzIHdoZW4gZW5jb2RlZCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKCkge1xuICAgIHZhciBwYXJ0MCA9ICB0aGlzLmxvLFxuICAgICAgICBwYXJ0MSA9ICh0aGlzLmxvID4+PiAyOCB8IHRoaXMuaGkgPDwgNCkgPj4+IDAsXG4gICAgICAgIHBhcnQyID0gIHRoaXMuaGkgPj4+IDI0O1xuICAgIHJldHVybiBwYXJ0MiA9PT0gMFxuICAgICAgICAgPyBwYXJ0MSA9PT0gMFxuICAgICAgICAgICA/IHBhcnQwIDwgMTYzODRcbiAgICAgICAgICAgICA/IHBhcnQwIDwgMTI4ID8gMSA6IDJcbiAgICAgICAgICAgICA6IHBhcnQwIDwgMjA5NzE1MiA/IDMgOiA0XG4gICAgICAgICAgIDogcGFydDEgPCAxNjM4NFxuICAgICAgICAgICAgID8gcGFydDEgPCAxMjggPyA1IDogNlxuICAgICAgICAgICAgIDogcGFydDEgPCAyMDk3MTUyID8gNyA6IDhcbiAgICAgICAgIDogcGFydDIgPCAxMjggPyA5IDogMTA7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IGV4cG9ydHM7XG5cbi8vIHVzZWQgdG8gcmV0dXJuIGEgUHJvbWlzZSB3aGVyZSBjYWxsYmFjayBpcyBvbWl0dGVkXG51dGlsLmFzUHJvbWlzZSA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9hc3Byb21pc2VcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG51dGlsLmJhc2U2NCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9iYXNlNjRcIik7XG5cbi8vIGJhc2UgY2xhc3Mgb2YgcnBjLlNlcnZpY2VcbnV0aWwuRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2V2ZW50ZW1pdHRlclwiKTtcblxuLy8gZmxvYXQgaGFuZGxpbmcgYWNjcm9zcyBicm93c2Vyc1xudXRpbC5mbG9hdCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9mbG9hdFwiKTtcblxuLy8gcmVxdWlyZXMgbW9kdWxlcyBvcHRpb25hbGx5IGFuZCBoaWRlcyB0aGUgY2FsbCBmcm9tIGJ1bmRsZXJzXG51dGlsLmlucXVpcmUgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvaW5xdWlyZVwiKTtcblxuLy8gY29udmVydHMgdG8gLyBmcm9tIHV0ZjggZW5jb2RlZCBzdHJpbmdzXG51dGlsLnV0ZjggPSByZXF1aXJlKFwiQHByb3RvYnVmanMvdXRmOFwiKTtcblxuLy8gcHJvdmlkZXMgYSBub2RlLWxpa2UgYnVmZmVyIHBvb2wgaW4gdGhlIGJyb3dzZXJcbnV0aWwucG9vbCA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9wb29sXCIpO1xuXG4vLyB1dGlsaXR5IHRvIHdvcmsgd2l0aCB0aGUgbG93IGFuZCBoaWdoIGJpdHMgb2YgYSA2NCBiaXQgdmFsdWVcbnV0aWwuTG9uZ0JpdHMgPSByZXF1aXJlKFwiLi9sb25nYml0c1wiKTtcblxuLyoqXG4gKiBXaGV0aGVyIHJ1bm5pbmcgd2l0aGluIG5vZGUgb3Igbm90LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG51dGlsLmlzTm9kZSA9IEJvb2xlYW4odHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbFxuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnNcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzcy52ZXJzaW9ucy5ub2RlKTtcblxuLyoqXG4gKiBHbG9iYWwgb2JqZWN0IHJlZmVyZW5jZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG51dGlsLmdsb2JhbCA9IHV0aWwuaXNOb2RlICYmIGdsb2JhbFxuICAgICAgICAgICB8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1xuICAgICAgICAgICB8fCB0eXBlb2Ygc2VsZiAgICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGZcbiAgICAgICAgICAgfHwgdGhpczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbnZhbGlkLXRoaXNcblxuLyoqXG4gKiBBbiBpbW11YWJsZSBlbXB0eSBhcnJheS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7QXJyYXkuPCo+fVxuICogQGNvbnN0XG4gKi9cbnV0aWwuZW1wdHlBcnJheSA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKFtdKSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIFtdOyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBBbiBpbW11dGFibGUgZW1wdHkgb2JqZWN0LlxuICogQHR5cGUge09iamVjdH1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSA/IE9iamVjdC5mcmVlemUoe30pIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8ge307IC8vIHVzZWQgb24gcHJvdG90eXBlc1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBpbnRlZ2VyXG4gKi9cbnV0aWwuaXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlciB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKHZhbHVlKSAmJiBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nXG4gKi9cbnV0aWwuaXNTdHJpbmcgPSBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0XG4gKi9cbnV0aWwuaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBUaGlzIGlzIGFuIGFsaWFzIG9mIHtAbGluayB1dGlsLmlzU2V0fS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNzZXQgPVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHByb3BlcnR5IG9uIGEgbWVzc2FnZSBpcyBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFBsYWluIG9iamVjdCBvciBtZXNzYWdlIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSBuYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGNvbnNpZGVyZWQgdG8gYmUgcHJlc2VudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xudXRpbC5pc1NldCA9IGZ1bmN0aW9uIGlzU2V0KG9iaiwgcHJvcCkge1xuICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxLCBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoKSA+IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBCdWZmZXIgaW5zdGFuY2UuXG4gKiBUaGlzIGlzIGEgbWluaW1hbCBzdGFuZC1hbG9uZSBkZWZpbml0aW9uIG9mIGEgQnVmZmVyIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBub2RlJ3MgdHlwaW5ncy5cbiAqIEBpbnRlcmZhY2UgQnVmZmVyXG4gKiBAZXh0ZW5kcyBVaW50OEFycmF5XG4gKi9cblxuLyoqXG4gKiBOb2RlJ3MgQnVmZmVyIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxCdWZmZXI+fVxuICovXG51dGlsLkJ1ZmZlciA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgQnVmZmVyID0gdXRpbC5pbnF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcjtcbiAgICAgICAgLy8gcmVmdXNlIHRvIHVzZSBub24tbm9kZSBidWZmZXJzIGlmIG5vdCBleHBsaWNpdGx5IGFzc2lnbmVkIChwZXJmIHJlYXNvbnMpOlxuICAgICAgICByZXR1cm4gQnVmZmVyLnByb3RvdHlwZS51dGY4V3JpdGUgPyBCdWZmZXIgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSkoKTtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZ1bGwgZm9yIEJ1ZmZlci5mcm9tLlxudXRpbC5fQnVmZmVyX2Zyb20gPSBudWxsO1xuXG4vLyBJbnRlcm5hbCBhbGlhcyBvZiBvciBwb2x5ZmlsbCBmb3IgQnVmZmVyLmFsbG9jVW5zYWZlLlxudXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGJ1ZmZlciBvZiB3aGF0ZXZlciB0eXBlIHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQuXG4gKiBAcGFyYW0ge251bWJlcnxudW1iZXJbXX0gW3NpemVPckFycmF5PTBdIEJ1ZmZlciBzaXplIG9yIG51bWJlciBhcnJheVxuICogQHJldHVybnMge1VpbnQ4QXJyYXl8QnVmZmVyfSBCdWZmZXJcbiAqL1xudXRpbC5uZXdCdWZmZXIgPSBmdW5jdGlvbiBuZXdCdWZmZXIoc2l6ZU9yQXJyYXkpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHJldHVybiB0eXBlb2Ygc2l6ZU9yQXJyYXkgPT09IFwibnVtYmVyXCJcbiAgICAgICAgPyB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZU9yQXJyYXkpXG4gICAgICAgICAgICA6IG5ldyB1dGlsLkFycmF5KHNpemVPckFycmF5KVxuICAgICAgICA6IHV0aWwuQnVmZmVyXG4gICAgICAgICAgICA/IHV0aWwuX0J1ZmZlcl9mcm9tKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiB0eXBlb2YgVWludDhBcnJheSA9PT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgID8gc2l6ZU9yQXJyYXlcbiAgICAgICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KHNpemVPckFycmF5KTtcbn07XG5cbi8qKlxuICogQXJyYXkgaW1wbGVtZW50YXRpb24gdXNlZCBpbiB0aGUgYnJvd3Nlci4gYFVpbnQ4QXJyYXlgIGlmIHN1cHBvcnRlZCwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8VWludDhBcnJheT59XG4gKi9cbnV0aWwuQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IFVpbnQ4QXJyYXkgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOiBBcnJheTtcblxuLyoqXG4gKiBBbnkgY29tcGF0aWJsZSBMb25nIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIExvbmcgaW5zdGFuY2UuIFRoZSBhY3R1YWwgdHlwZSBpcyB0aGF0IGV4cG9ydGVkIGJ5IGxvbmcuanMuXG4gKiBAaW50ZXJmYWNlIExvbmdcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsb3cgTG93IGJpdHNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoaWdoIEhpZ2ggYml0c1xuICogQHByb3BlcnR5IHtib29sZWFufSB1bnNpZ25lZCBXaGV0aGVyIHVuc2lnbmVkIG9yIG5vdFxuICovXG5cbi8qKlxuICogTG9uZy5qcydzIExvbmcgY2xhc3MgaWYgYXZhaWxhYmxlLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPExvbmc+fVxuICovXG51dGlsLkxvbmcgPSAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPICYmIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLmRjb2RlSU8uTG9uZ1xuICAgICAgICAgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuTG9uZ1xuICAgICAgICAgfHwgdXRpbC5pbnF1aXJlKFwibG9uZ1wiKTtcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMiBiaXQgKGBib29sYCkgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MlJlID0gL150cnVlfGZhbHNlfDB8MSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSAzMiBiaXQgKGBpbnQzMmAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5MzJSZSA9IC9eLT8oPzowfFsxLTldWzAtOV0qKSQvO1xuXG4vKipcbiAqIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHZlcmlmeSA2NCBiaXQgKGBpbnQ2NGAgZXRjLikgbWFwIGtleXMuXG4gKiBAdHlwZSB7UmVnRXhwfVxuICogQGNvbnN0XG4gKi9cbnV0aWwua2V5NjRSZSA9IC9eKD86W1xcXFx4MDAtXFxcXHhmZl17OH18LT8oPzowfFsxLTldWzAtOV0qKSkkLztcblxuLyoqXG4gKiBDb252ZXJ0cyBhIG51bWJlciBvciBsb25nIHRvIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcn0gdmFsdWUgVmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG51dGlsLmxvbmdUb0hhc2ggPSBmdW5jdGlvbiBsb25nVG9IYXNoKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgID8gdXRpbC5Mb25nQml0cy5mcm9tKHZhbHVlKS50b0hhc2goKVxuICAgICAgICA6IHV0aWwuTG9uZ0JpdHMuemVyb0hhc2g7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIDggY2hhcmFjdGVycyBsb25nIGhhc2ggc3RyaW5nIHRvIGEgbG9uZyBvciBudW1iZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCBIYXNoXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtMb25nfG51bWJlcn0gT3JpZ2luYWwgdmFsdWVcbiAqL1xudXRpbC5sb25nRnJvbUhhc2ggPSBmdW5jdGlvbiBsb25nRnJvbUhhc2goaGFzaCwgdW5zaWduZWQpIHtcbiAgICB2YXIgYml0cyA9IHV0aWwuTG9uZ0JpdHMuZnJvbUhhc2goaGFzaCk7XG4gICAgaWYgKHV0aWwuTG9uZylcbiAgICAgICAgcmV0dXJuIHV0aWwuTG9uZy5mcm9tQml0cyhiaXRzLmxvLCBiaXRzLmhpLCB1bnNpZ25lZCk7XG4gICAgcmV0dXJuIGJpdHMudG9OdW1iZXIoQm9vbGVhbih1bnNpZ25lZCkpO1xufTtcblxuLyoqXG4gKiBNZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IGRzdCBEZXN0aW5hdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IHNyYyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpZk5vdFNldD1mYWxzZV0gTWVyZ2VzIG9ubHkgaWYgdGhlIGtleSBpcyBub3QgYWxyZWFkeSBzZXRcbiAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gRGVzdGluYXRpb24gb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIG1lcmdlKGRzdCwgc3JjLCBpZk5vdFNldCkgeyAvLyB1c2VkIGJ5IGNvbnZlcnRlcnNcbiAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKSwgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKVxuICAgICAgICBpZiAoZHN0W2tleXNbaV1dID09PSB1bmRlZmluZWQgfHwgIWlmTm90U2V0KVxuICAgICAgICAgICAgZHN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgIHJldHVybiBkc3Q7XG59XG5cbnV0aWwubWVyZ2UgPSBtZXJnZTtcblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgc3RyaW5nIHRvIGxvd2VyIGNhc2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDb252ZXJ0ZWQgc3RyaW5nXG4gKi9cbnV0aWwubGNGaXJzdCA9IGZ1bmN0aW9uIGxjRmlyc3Qoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjdXN0b20gZXJyb3IgY29uc3RydWN0b3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgRXJyb3IgbmFtZVxuICogQHJldHVybnMge0NvbnN0cnVjdG9yPEVycm9yPn0gQ3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIG5ld0Vycm9yKG5hbWUpIHtcblxuICAgIGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UsIHByb3BlcnRpZXMpIHtcblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ3VzdG9tRXJyb3IpKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAvLyBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgICAgICAvLyBeIGp1c3QgcmV0dXJucyBhIG5ldyBlcnJvciBpbnN0YW5jZSBiZWNhdXNlIHRoZSBjdG9yIGNhbiBiZSBjYWxsZWQgYXMgYSBmdW5jdGlvblxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1lc3NhZ2VcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWVzc2FnZTsgfSB9KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIC8vIG5vZGVcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIEN1c3RvbUVycm9yKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3RhY2tcIiwgeyB2YWx1ZTogbmV3IEVycm9yKCkuc3RhY2sgfHwgXCJcIiB9KTtcblxuICAgICAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgICAgIG1lcmdlKHRoaXMsIHByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIChDdXN0b21FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ3VzdG9tRXJyb3IucHJvdG90eXBlLCBcIm5hbWVcIiwgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmFtZTsgfSB9KTtcblxuICAgIEN1c3RvbUVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5tZXNzYWdlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3VzdG9tRXJyb3I7XG59XG5cbnV0aWwubmV3RXJyb3IgPSBuZXdFcnJvcjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHByb3RvY29sIGVycm9yLlxuICogQGNsYXNzZGVzYyBFcnJvciBzdWJjbGFzcyBpbmRpY2F0aW5nIGEgcHJvdG9jb2wgc3BlY2lmYyBlcnJvci5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAZXh0ZW5kcyBFcnJvclxuICogQHRlbXBsYXRlIFQgZXh0ZW5kcyBNZXNzYWdlPFQ+XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIEVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IFtwcm9wZXJ0aWVzXSBBZGRpdGlvbmFsIHByb3BlcnRpZXNcbiAqIEBleGFtcGxlXG4gKiB0cnkge1xuICogICAgIE15TWVzc2FnZS5kZWNvZGUoc29tZUJ1ZmZlcik7IC8vIHRocm93cyBpZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAqIH0gY2F0Y2ggKGUpIHtcbiAqICAgICBpZiAoZSBpbnN0YW5jZW9mIFByb3RvY29sRXJyb3IgJiYgZS5pbnN0YW5jZSlcbiAqICAgICAgICAgY29uc29sZS5sb2coXCJkZWNvZGVkIHNvIGZhcjogXCIgKyBKU09OLnN0cmluZ2lmeShlLmluc3RhbmNlKSk7XG4gKiB9XG4gKi9cbnV0aWwuUHJvdG9jb2xFcnJvciA9IG5ld0Vycm9yKFwiUHJvdG9jb2xFcnJvclwiKTtcblxuLyoqXG4gKiBTbyBmYXIgZGVjb2RlZCBtZXNzYWdlIGluc3RhbmNlLlxuICogQG5hbWUgdXRpbC5Qcm90b2NvbEVycm9yI2luc3RhbmNlXG4gKiBAdHlwZSB7TWVzc2FnZTxUPn1cbiAqL1xuXG4vKipcbiAqIEEgT25lT2YgZ2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mR2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mR2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gU2V0IGZpZWxkIG5hbWUsIGlmIGFueVxuICovXG5cbi8qKlxuICogQnVpbGRzIGEgZ2V0dGVyIGZvciBhIG9uZW9mJ3MgcHJlc2VudCBmaWVsZCBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGROYW1lcyBGaWVsZCBuYW1lc1xuICogQHJldHVybnMge09uZU9mR2V0dGVyfSBVbmJvdW5kIGdldHRlclxuICovXG51dGlsLm9uZU9mR2V0dGVyID0gZnVuY3Rpb24gZ2V0T25lT2YoZmllbGROYW1lcykge1xuICAgIHZhciBmaWVsZE1hcCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGROYW1lcy5sZW5ndGg7ICsraSlcbiAgICAgICAgZmllbGRNYXBbZmllbGROYW1lc1tpXV0gPSAxO1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgICAgIGZvciAodmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKSwgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+IC0xOyAtLWkpXG4gICAgICAgICAgICBpZiAoZmllbGRNYXBba2V5c1tpXV0gPT09IDEgJiYgdGhpc1trZXlzW2ldXSAhPT0gdW5kZWZpbmVkICYmIHRoaXNba2V5c1tpXV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXNbaV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogQSBPbmVPZiBzZXR0ZXIgYXMgcmV0dXJuZWQgYnkge0BsaW5rIHV0aWwub25lT2ZTZXR0ZXJ9LlxuICogQHR5cGVkZWYgT25lT2ZTZXR0ZXJcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gdmFsdWUgRmllbGQgbmFtZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIHNldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZlNldHRlcn0gVW5ib3VuZCBzZXR0ZXJcbiAqL1xudXRpbC5vbmVPZlNldHRlciA9IGZ1bmN0aW9uIHNldE9uZU9mKGZpZWxkTmFtZXMpIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEZpZWxkIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqIEB0aGlzIE9iamVjdFxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBpZiAoZmllbGROYW1lc1tpXSAhPT0gbmFtZSlcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tmaWVsZE5hbWVzW2ldXTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGNvbnZlcnNpb24gb3B0aW9ucyB1c2VkIGZvciB7QGxpbmsgTWVzc2FnZSN0b0pTT059IGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiBUaGVzZSBvcHRpb25zIGFyZSBjbG9zZSB0byBwcm90bzMncyBKU09OIG1hcHBpbmcgd2l0aCB0aGUgZXhjZXB0aW9uIHRoYXQgaW50ZXJuYWwgdHlwZXMgbGlrZSBBbnkgYXJlIGhhbmRsZWQganVzdCBsaWtlIG1lc3NhZ2VzLiBNb3JlIHByZWNpc2VseTpcbiAqXG4gKiAtIExvbmdzIGJlY29tZSBzdHJpbmdzXG4gKiAtIEVudW1zIGJlY29tZSBzdHJpbmcga2V5c1xuICogLSBCeXRlcyBiZWNvbWUgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICogLSAoU3ViLSlNZXNzYWdlcyBiZWNvbWUgcGxhaW4gb2JqZWN0c1xuICogLSBNYXBzIGJlY29tZSBwbGFpbiBvYmplY3RzIHdpdGggYWxsIHN0cmluZyBrZXlzXG4gKiAtIFJlcGVhdGVkIGZpZWxkcyBiZWNvbWUgYXJyYXlzXG4gKiAtIE5hTiBhbmQgSW5maW5pdHkgZm9yIGZsb2F0IGFuZCBkb3VibGUgZmllbGRzIGJlY29tZSBzdHJpbmdzXG4gKlxuICogQHR5cGUge0lDb252ZXJzaW9uT3B0aW9uc31cbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcHJvdG9jb2wtYnVmZmVycy9kb2NzL3Byb3RvMz9obD1lbiNqc29uXG4gKi9cbnV0aWwudG9KU09OT3B0aW9ucyA9IHtcbiAgICBsb25nczogU3RyaW5nLFxuICAgIGVudW1zOiBTdHJpbmcsXG4gICAgYnl0ZXM6IFN0cmluZyxcbiAgICBqc29uOiB0cnVlXG59O1xuXG4vLyBTZXRzIHVwIGJ1ZmZlciB1dGlsaXR5IGFjY29yZGluZyB0byB0aGUgZW52aXJvbm1lbnQgKGNhbGxlZCBpbiBpbmRleC1taW5pbWFsKVxudXRpbC5fY29uZmlndXJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEJ1ZmZlciA9IHV0aWwuQnVmZmVyO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghQnVmZmVyKSB7XG4gICAgICAgIHV0aWwuX0J1ZmZlcl9mcm9tID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBiZWNhdXNlIG5vZGUgNC54IGJ1ZmZlcnMgYXJlIGluY29tcGF0aWJsZSAmIGltbXV0YWJsZVxuICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Rjb2RlSU8vcHJvdG9idWYuanMvcHVsbC82NjVcbiAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IEJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gJiYgQnVmZmVyLmZyb20gfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2Zyb20odmFsdWUsIGVuY29kaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmcpO1xuICAgICAgICB9O1xuICAgIHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSB8fFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBmdW5jdGlvbiBCdWZmZXJfYWxsb2NVbnNhZmUoc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoc2l6ZSk7XG4gICAgICAgIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IFdyaXRlcjtcblxudmFyIHV0aWwgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxudmFyIEJ1ZmZlcldyaXRlcjsgLy8gY3ljbGljXG5cbnZhciBMb25nQml0cyAgPSB1dGlsLkxvbmdCaXRzLFxuICAgIGJhc2U2NCAgICA9IHV0aWwuYmFzZTY0LFxuICAgIHV0ZjggICAgICA9IHV0aWwudXRmODtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB3cml0ZXIgb3BlcmF0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIFVpbnQ4QXJyYXksIG51bWJlcil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7Kn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIE9wKGZuLCBsZW4sIHZhbCkge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gY2FsbC5cbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oVWludDhBcnJheSwgbnVtYmVyLCAqKX1cbiAgICAgKi9cbiAgICB0aGlzLmZuID0gZm47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSBieXRlIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gbGVuO1xuXG4gICAgLyoqXG4gICAgICogTmV4dCBvcGVyYXRpb24uXG4gICAgICogQHR5cGUge1dyaXRlci5PcHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgdG8gd3JpdGUuXG4gICAgICogQHR5cGUgeyp9XG4gICAgICovXG4gICAgdGhpcy52YWwgPSB2YWw7IC8vIHR5cGUgdmFyaWVzXG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBub29wKCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eS1mdW5jdGlvblxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIHN0YXRlIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBDb3BpZWQgd3JpdGVyIHN0YXRlLlxuICogQG1lbWJlcm9mIFdyaXRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1dyaXRlcn0gd3JpdGVyIFdyaXRlciB0byBjb3B5IHN0YXRlIGZyb21cbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gU3RhdGUod3JpdGVyKSB7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGhlYWQuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLmhlYWQgPSB3cml0ZXIuaGVhZDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgdGFpbC5cbiAgICAgKiBAdHlwZSB7V3JpdGVyLk9wfVxuICAgICAqL1xuICAgIHRoaXMudGFpbCA9IHdyaXRlci50YWlsO1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBidWZmZXIgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSB3cml0ZXIubGVuO1xuXG4gICAgLyoqXG4gICAgICogTmV4dCBzdGF0ZS5cbiAgICAgKiBAdHlwZSB7U3RhdGV8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLm5leHQgPSB3cml0ZXIuc3RhdGVzO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgd3JpdGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCB3cml0ZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gV3JpdGVyKCkge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zIGhlYWQuXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmhlYWQgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG5cbiAgICAvKipcbiAgICAgKiBPcGVyYXRpb25zIHRhaWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMudGFpbCA9IHRoaXMuaGVhZDtcblxuICAgIC8qKlxuICAgICAqIExpbmtlZCBmb3JrZWQgc3RhdGVzLlxuICAgICAqIEB0eXBlIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlcyA9IG51bGw7XG5cbiAgICAvLyBXaGVuIGEgdmFsdWUgaXMgd3JpdHRlbiwgdGhlIHdyaXRlciBjYWxjdWxhdGVzIGl0cyBieXRlIGxlbmd0aCBhbmQgcHV0cyBpdCBpbnRvIGEgbGlua2VkXG4gICAgLy8gbGlzdCBvZiBvcGVyYXRpb25zIHRvIHBlcmZvcm0gd2hlbiBmaW5pc2goKSBpcyBjYWxsZWQuIFRoaXMgYm90aCBhbGxvd3MgdXMgdG8gYWxsb2NhdGVcbiAgICAvLyBidWZmZXJzIG9mIHRoZSBleGFjdCByZXF1aXJlZCBzaXplIGFuZCByZWR1Y2VzIHRoZSBhbW91bnQgb2Ygd29yayB3ZSBoYXZlIHRvIGRvIGNvbXBhcmVkXG4gICAgLy8gdG8gZmlyc3QgY2FsY3VsYXRpbmcgb3ZlciBvYmplY3RzIGFuZCB0aGVuIGVuY29kaW5nIG92ZXIgb2JqZWN0cy4gSW4gb3VyIGNhc2UsIHRoZSBlbmNvZGluZ1xuICAgIC8vIHBhcnQgaXMganVzdCBhIGxpbmtlZCBsaXN0IHdhbGsgY2FsbGluZyBvcGVyYXRpb25zIHdpdGggYWxyZWFkeSBwcmVwYXJlZCB2YWx1ZXMuXG59XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cCgpIHtcbiAgICAgICAgICAgIHJldHVybiAoV3JpdGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXJXcml0ZXIoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdyaXRlcigpO1xuICAgICAgICB9O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHdyaXRlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcldyaXRlcnxXcml0ZXJ9IEEge0BsaW5rIEJ1ZmZlcldyaXRlcn0gd2hlbiBCdWZmZXJzIGFyZSBzdXBwb3J0ZWQsIG90aGVyd2lzZSBhIHtAbGluayBXcml0ZXJ9XG4gKi9cbldyaXRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuLyoqXG4gKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgQnVmZmVyIHNpemVcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcbiAqL1xuV3JpdGVyLmFsbG9jID0gZnVuY3Rpb24gYWxsb2Moc2l6ZSkge1xuICAgIHJldHVybiBuZXcgdXRpbC5BcnJheShzaXplKTtcbn07XG5cbi8vIFVzZSBVaW50OEFycmF5IGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyLCBqdXN0IGxpa2Ugbm9kZSBkb2VzIHdpdGggYnVmZmVyc1xuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbmlmICh1dGlsLkFycmF5ICE9PSBBcnJheSlcbiAgICBXcml0ZXIuYWxsb2MgPSB1dGlsLnBvb2woV3JpdGVyLmFsbG9jLCB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSk7XG5cbi8qKlxuICogUHVzaGVzIGEgbmV3IG9wZXJhdGlvbiB0byB0aGUgcXVldWUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHByaXZhdGVcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5fcHVzaCA9IGZ1bmN0aW9uIHB1c2goZm4sIGxlbiwgdmFsKSB7XG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgT3AoZm4sIGxlbiwgdmFsKTtcbiAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUJ5dGUodmFsLCBidWYsIHBvcykge1xuICAgIGJ1Zltwb3NdID0gdmFsICYgMjU1O1xufVxuXG5mdW5jdGlvbiB3cml0ZVZhcmludDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICB3aGlsZSAodmFsID4gMTI3KSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwgJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbCA+Pj49IDc7XG4gICAgfVxuICAgIGJ1Zltwb3NdID0gdmFsO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgdmFyaW50IHdyaXRlciBvcGVyYXRpb24gaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFNjaGVkdWxlZCB2YXJpbnQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBleHRlbmRzIE9wXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW4gVmFsdWUgYnl0ZSBsZW5ndGhcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgVmFsdWUgdG8gd3JpdGVcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gVmFyaW50T3AobGVuLCB2YWwpIHtcbiAgICB0aGlzLmxlbiA9IGxlbjtcbiAgICB0aGlzLm5leHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52YWwgPSB2YWw7XG59XG5cblZhcmludE9wLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT3AucHJvdG90eXBlKTtcblZhcmludE9wLnByb3RvdHlwZS5mbiA9IHdyaXRlVmFyaW50MzI7XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUudWludDMyID0gZnVuY3Rpb24gd3JpdGVfdWludDMyKHZhbHVlKSB7XG4gICAgLy8gaGVyZSwgdGhlIGNhbGwgdG8gdGhpcy5wdXNoIGhhcyBiZWVuIGlubGluZWQgYW5kIGEgdmFyaW50IHNwZWNpZmljIE9wIHN1YmNsYXNzIGlzIHVzZWQuXG4gICAgLy8gdWludDMyIGlzIGJ5IGZhciB0aGUgbW9zdCBmcmVxdWVudGx5IHVzZWQgb3BlcmF0aW9uIGFuZCBiZW5lZml0cyBzaWduaWZpY2FudGx5IGZyb20gdGhpcy5cbiAgICB0aGlzLmxlbiArPSAodGhpcy50YWlsID0gdGhpcy50YWlsLm5leHQgPSBuZXcgVmFyaW50T3AoXG4gICAgICAgICh2YWx1ZSA9IHZhbHVlID4+PiAwKVxuICAgICAgICAgICAgICAgIDwgMTI4ICAgICAgID8gMVxuICAgICAgICA6IHZhbHVlIDwgMTYzODQgICAgID8gMlxuICAgICAgICA6IHZhbHVlIDwgMjA5NzE1MiAgID8gM1xuICAgICAgICA6IHZhbHVlIDwgMjY4NDM1NDU2ID8gNFxuICAgICAgICA6ICAgICAgICAgICAgICAgICAgICAgNSxcbiAgICB2YWx1ZSkpLmxlbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5pbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ludDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIDwgMFxuICAgICAgICA/IHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgMTAsIExvbmdCaXRzLmZyb21OdW1iZXIodmFsdWUpKSAvLyAxMCBieXRlcyBwZXIgc3BlY1xuICAgICAgICA6IHRoaXMudWludDMyKHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgMzIgYml0IHZhbHVlIGFzIGEgdmFyaW50LCB6aWctemFnIGVuY29kZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3NpbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigodmFsdWUgPDwgMSBeIHZhbHVlID4+IDMxKSA+Pj4gMCk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZVZhcmludDY0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICB3aGlsZSAodmFsLmhpKSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbC5sbyA9ICh2YWwubG8gPj4+IDcgfCB2YWwuaGkgPDwgMjUpID4+PiAwO1xuICAgICAgICB2YWwuaGkgPj4+PSA3O1xuICAgIH1cbiAgICB3aGlsZSAodmFsLmxvID4gMTI3KSB7XG4gICAgICAgIGJ1Zltwb3MrK10gPSB2YWwubG8gJiAxMjcgfCAxMjg7XG4gICAgICAgIHZhbC5sbyA9IHZhbC5sbyA+Pj4gNztcbiAgICB9XG4gICAgYnVmW3BvcysrXSA9IHZhbC5sbztcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUudWludDY0ID0gZnVuY3Rpb24gd3JpdGVfdWludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZVZhcmludDY0LCBiaXRzLmxlbmd0aCgpLCBiaXRzKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50NjQgPSBXcml0ZXIucHJvdG90eXBlLnVpbnQ2NDtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGEgdmFyaW50LCB6aWctemFnIGVuY29kZWQuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50NjQgPSBmdW5jdGlvbiB3cml0ZV9zaW50NjQodmFsdWUpIHtcbiAgICB2YXIgYml0cyA9IExvbmdCaXRzLmZyb20odmFsdWUpLnp6RW5jb2RlKCk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIGJvb2xpc2ggdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gd3JpdGVfYm9vbCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgdmFsdWUgPyAxIDogMCk7XG59O1xuXG5mdW5jdGlvbiB3cml0ZUZpeGVkMzIodmFsLCBidWYsIHBvcykge1xuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICAmIDI1NTtcbiAgICBidWZbcG9zICsgMV0gPSAgdmFsID4+PiA4ICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gMTYgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xufVxuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHdyaXRlX2ZpeGVkMzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIHZhbHVlID4+PiAwKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZSBhcyBmaXhlZCAzMiBiaXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDMyID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkNjQgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMubG8pLl9wdXNoKHdyaXRlRml4ZWQzMiwgNCwgYml0cy5oaSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgZml4ZWQgNjQgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ZpeGVkNjQgPSBXcml0ZXIucHJvdG90eXBlLmZpeGVkNjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgZmxvYXQgKDMyIGJpdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZmxvYXQgPSBmdW5jdGlvbiB3cml0ZV9mbG9hdCh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHV0aWwuZmxvYXQud3JpdGVGbG9hdExFLCA0LCB2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KS5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5kb3VibGUgPSBmdW5jdGlvbiB3cml0ZV9kb3VibGUodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRG91YmxlTEUsIDgsIHZhbHVlKTtcbn07XG5cbnZhciB3cml0ZUJ5dGVzID0gdXRpbC5BcnJheS5wcm90b3R5cGUuc2V0XG4gICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGJ1Zi5zZXQodmFsLCBwb3MpOyAvLyBhbHNvIHdvcmtzIGZvciBwbGFpbiBhcnJheSB2YWx1ZXNcbiAgICB9XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICA6IGZ1bmN0aW9uIHdyaXRlQnl0ZXNfZm9yKHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBidWZbcG9zICsgaV0gPSB2YWxbaV07XG4gICAgfTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzZXF1ZW5jZSBvZiBieXRlcy5cbiAqIEBwYXJhbSB7VWludDhBcnJheXxzdHJpbmd9IHZhbHVlIEJ1ZmZlciBvciBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXModmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xuICAgIGlmICghbGVuKVxuICAgICAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xuICAgIGlmICh1dGlsLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICB2YXIgYnVmID0gV3JpdGVyLmFsbG9jKGxlbiA9IGJhc2U2NC5sZW5ndGgodmFsdWUpKTtcbiAgICAgICAgYmFzZTY0LmRlY29kZSh2YWx1ZSwgYnVmLCAwKTtcbiAgICAgICAgdmFsdWUgPSBidWY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHdyaXRlQnl0ZXMsIGxlbiwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnN0cmluZyA9IGZ1bmN0aW9uIHdyaXRlX3N0cmluZyh2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB1dGY4Lmxlbmd0aCh2YWx1ZSk7XG4gICAgcmV0dXJuIGxlblxuICAgICAgICA/IHRoaXMudWludDMyKGxlbikuX3B1c2godXRmOC53cml0ZSwgbGVuLCB2YWx1ZSlcbiAgICAgICAgOiB0aGlzLl9wdXNoKHdyaXRlQnl0ZSwgMSwgMCk7XG59O1xuXG4vKipcbiAqIEZvcmtzIHRoaXMgd3JpdGVyJ3Mgc3RhdGUgYnkgcHVzaGluZyBpdCB0byBhIHN0YWNrLlxuICogQ2FsbGluZyB7QGxpbmsgV3JpdGVyI3Jlc2V0fHJlc2V0fSBvciB7QGxpbmsgV3JpdGVyI2xkZWxpbXxsZGVsaW19IHJlc2V0cyB0aGUgd3JpdGVyIHRvIHRoZSBwcmV2aW91cyBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZvcmsgPSBmdW5jdGlvbiBmb3JrKCkge1xuICAgIHRoaXMuc3RhdGVzID0gbmV3IFN0YXRlKHRoaXMpO1xuICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICB0aGlzLmxlbiA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0aGlzIGluc3RhbmNlIHRvIHRoZSBsYXN0IHN0YXRlLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZXMpIHtcbiAgICAgICAgdGhpcy5oZWFkICAgPSB0aGlzLnN0YXRlcy5oZWFkO1xuICAgICAgICB0aGlzLnRhaWwgICA9IHRoaXMuc3RhdGVzLnRhaWw7XG4gICAgICAgIHRoaXMubGVuICAgID0gdGhpcy5zdGF0ZXMubGVuO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLm5leHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuICAgICAgICB0aGlzLmxlbiAgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzZXRzIHRvIHRoZSBsYXN0IHN0YXRlIGFuZCBhcHBlbmRzIHRoZSBmb3JrIHN0YXRlJ3MgY3VycmVudCB3cml0ZSBsZW5ndGggYXMgYSB2YXJpbnQgZm9sbG93ZWQgYnkgaXRzIG9wZXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5sZGVsaW0gPSBmdW5jdGlvbiBsZGVsaW0oKSB7XG4gICAgdmFyIGhlYWQgPSB0aGlzLmhlYWQsXG4gICAgICAgIHRhaWwgPSB0aGlzLnRhaWwsXG4gICAgICAgIGxlbiAgPSB0aGlzLmxlbjtcbiAgICB0aGlzLnJlc2V0KCkudWludDMyKGxlbik7XG4gICAgaWYgKGxlbikge1xuICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGhlYWQubmV4dDsgLy8gc2tpcCBub29wXG4gICAgICAgIHRoaXMudGFpbCA9IHRhaWw7XG4gICAgICAgIHRoaXMubGVuICs9IGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gRmluaXNoZWQgYnVmZmVyXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gZmluaXNoKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLm5leHQsIC8vIHNraXAgbm9vcFxuICAgICAgICBidWYgID0gdGhpcy5jb25zdHJ1Y3Rvci5hbGxvYyh0aGlzLmxlbiksXG4gICAgICAgIHBvcyAgPSAwO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICAgIGhlYWQuZm4oaGVhZC52YWwsIGJ1ZiwgcG9zKTtcbiAgICAgICAgcG9zICs9IGhlYWQubGVuO1xuICAgICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgIH1cbiAgICAvLyB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgIHJldHVybiBidWY7XG59O1xuXG5Xcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKEJ1ZmZlcldyaXRlcl8pIHtcbiAgICBCdWZmZXJXcml0ZXIgPSBCdWZmZXJXcml0ZXJfO1xuICAgIFdyaXRlci5jcmVhdGUgPSBjcmVhdGUoKTtcbiAgICBCdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSgpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBCdWZmZXJXcml0ZXI7XG5cbi8vIGV4dGVuZHMgV3JpdGVyXG52YXIgV3JpdGVyID0gcmVxdWlyZShcIi4vd3JpdGVyXCIpO1xuKEJ1ZmZlcldyaXRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFdyaXRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEJ1ZmZlcldyaXRlcjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBidWZmZXIgd3JpdGVyIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCB3cml0ZXIgdXNpbmcgbm9kZSBidWZmZXJzLlxuICogQGV4dGVuZHMgV3JpdGVyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQnVmZmVyV3JpdGVyKCkge1xuICAgIFdyaXRlci5jYWxsKHRoaXMpO1xufVxuXG5CdWZmZXJXcml0ZXIuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBBbGxvY2F0ZXMgYSBidWZmZXIgb2YgdGhlIHNwZWNpZmllZCBzaXplLlxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gICAgICogQHJldHVybnMge0J1ZmZlcn0gQnVmZmVyXG4gICAgICovXG4gICAgQnVmZmVyV3JpdGVyLmFsbG9jID0gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlO1xuXG4gICAgQnVmZmVyV3JpdGVyLndyaXRlQnl0ZXNCdWZmZXIgPSB1dGlsLkJ1ZmZlciAmJiB1dGlsLkJ1ZmZlci5wcm90b3R5cGUgaW5zdGFuY2VvZiBVaW50OEFycmF5ICYmIHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zZXQubmFtZSA9PT0gXCJzZXRcIlxuICAgICAgICA/IGZ1bmN0aW9uIHdyaXRlQnl0ZXNCdWZmZXJfc2V0KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gZmFzdGVyIHRoYW4gY29weSAocmVxdWlyZXMgbm9kZSA+PSA0IHdoZXJlIEJ1ZmZlcnMgZXh0ZW5kIFVpbnQ4QXJyYXkgYW5kIHNldCBpcyBwcm9wZXJseSBpbmhlcml0ZWQpXG4gICAgICAgICAgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX2NvcHkodmFsLCBidWYsIHBvcykge1xuICAgICAgICAgIGlmICh2YWwuY29weSkgLy8gQnVmZmVyIHZhbHVlc1xuICAgICAgICAgICAgdmFsLmNvcHkoYnVmLCBwb3MsIDAsIHZhbC5sZW5ndGgpO1xuICAgICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOykgLy8gcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgICAgICAgICBidWZbcG9zKytdID0gdmFsW2krK107XG4gICAgICAgIH07XG59O1xuXG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlcldyaXRlci5wcm90b3R5cGUuYnl0ZXMgPSBmdW5jdGlvbiB3cml0ZV9ieXRlc19idWZmZXIodmFsdWUpIHtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpXG4gICAgICAgIHZhbHVlID0gdXRpbC5fQnVmZmVyX2Zyb20odmFsdWUsIFwiYmFzZTY0XCIpO1xuICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGggPj4+IDA7XG4gICAgdGhpcy51aW50MzIobGVuKTtcbiAgICBpZiAobGVuKVxuICAgICAgICB0aGlzLl9wdXNoKEJ1ZmZlcldyaXRlci53cml0ZUJ5dGVzQnVmZmVyLCBsZW4sIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHdyaXRlU3RyaW5nQnVmZmVyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBpZiAodmFsLmxlbmd0aCA8IDQwKSAvLyBwbGFpbiBqcyBpcyBmYXN0ZXIgZm9yIHNob3J0IHN0cmluZ3MgKHByb2JhYmx5IGR1ZSB0byByZWR1bmRhbnQgYXNzZXJ0aW9ucylcbiAgICAgICAgdXRpbC51dGY4LndyaXRlKHZhbCwgYnVmLCBwb3MpO1xuICAgIGVsc2UgaWYgKGJ1Zi51dGY4V3JpdGUpXG4gICAgICAgIGJ1Zi51dGY4V3JpdGUodmFsLCBwb3MpO1xuICAgIGVsc2VcbiAgICAgICAgYnVmLndyaXRlKHZhbCwgcG9zKTtcbn1cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmdfYnVmZmVyKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHV0aWwuQnVmZmVyLmJ5dGVMZW5ndGgodmFsdWUpO1xuICAgIHRoaXMudWludDMyKGxlbik7XG4gICAgaWYgKGxlbilcbiAgICAgICAgdGhpcy5fcHVzaCh3cml0ZVN0cmluZ0J1ZmZlciwgbGVuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogRmluaXNoZXMgdGhlIHdyaXRlIG9wZXJhdGlvbi5cbiAqIEBuYW1lIEJ1ZmZlcldyaXRlciNmaW5pc2hcbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge0J1ZmZlcn0gRmluaXNoZWQgYnVmZmVyXG4gKi9cblxuQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbiIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW1xuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXG4gIF0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZihtc0NyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbXG4gICAgICAgIHNlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgICAgIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXG4gICAgICBdO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH1cblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyByZXF1aXJlKCcuLi90ZXN0L3Rlc3QnKTsgLy8gcnVuIHRlc3QudHNcbmltcG9ydCB7IGNyZHRzLCBuZXR3b3JrIH0gZnJvbSAnY29tcG92ZW50dWFscy1jbGllbnQnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG4vKipcbiAqIEdldCBIZXJva3Ugc2VydmVyIGhvc3QgV2Vic29ja2V0LlxuICovXG52YXIgSE9TVCA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpXG5cbi8qKlxuICogR2VuZXJhdGUgdXVpZCBmb3IgZWFjaCBjbGllbnQuXG4gKi9cbmNvbnN0IGNsaWVudF91dWlkIDogc3RyaW5nID0gdXVpZCgpO1xuXG4vKipcbiAqIEdlbmVyYXRlIENSRFRzJyBSdW50aW1lIG9uIGVhY2ggY2xpZW50IGFuZCBjcmVhdGUgQ1JEVHMgKGUuZy4gQ291bnRlckNyZHQpLlxuICovXG5cbmxldCBjbGllbnQgPSBuZXcgY3JkdHMuQ3JkdFJ1bnRpbWUobmV3IG5ldHdvcmsuV2ViUnRjTmV0d29yayhjbGllbnRfdXVpZCwgSE9TVCkpO1xuLy9sZXQgY2xpZW50Q291bnRlciA9IG5ldyBjcmR0cy5Db3VudGVyQ3JkdChcImNvdW50ZXJJZFwiLCBjbGllbnQpO1xubGV0IGNsaWVudENvdW50ZXIgPSBuZXcgY3JkdHMuQ291bnRlckNyZHQoY2xpZW50LCBcImNvdW50ZXJJZFwiKTtcblxuLyogSFRNTCB2YXJpYWJsZXMgKi9cbnZhciBjb3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3VudGVyXCIpO1xuXG4vKiBDdXN0b21pemUgdGhlIGV2ZW50IGxpc3RlbmVyIGZvciBDUkRUIGFzIHJlZnJlc2ggdGhlIHZhbHVlICovXG5jbGllbnRDb3VudGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJBZGRcIiwgXyA9PiB7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufSk7XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgaW5jcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBpbmNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2YgZGVjcmVtZW50IGJ1dHRvbiB3aXRoIENSRFQgb3BlcmF0aW9uICovXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlY3JlbWVudFwiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZCBkZWNyZW1lbnRcIik7XG4gICAgY2xpZW50Q291bnRlci5hZGQoLTEwMCk7XG4gICAgY291bnRlciEuaW5uZXJIVE1MID0gY2xpZW50Q291bnRlci52YWx1ZS50b1N0cmluZygpO1xufVxuXG4vLyAvKiBDdXN0b21pemUgb25jbGljaygpIGZ1bmN0aW9uIG9mIHN5bmMgdG8gc3luY2hyb25pemUgdGhlIHZhbHVlICovXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN5bmNcIikhLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbi8vICAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG4vLyB9XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==