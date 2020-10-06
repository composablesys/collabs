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
exports.MultiValueRegister = exports.MvrEvent = exports.MvrEntry = exports.GSetCrdt = exports.GSetAddEvent = exports.MultRegisterCrdt = exports.MultEvent = exports.CounterCrdt = exports.NumberState = exports.AddEvent = void 0;
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
            console.log("Added, value=" + this.value);
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
class GSetAddEvent {
    constructor(caller, timestamp, valueAdded) {
        this.caller = caller;
        this.timestamp = timestamp;
        this.valueAdded = valueAdded;
        this.type = "GSetAdd";
    }
}
exports.GSetAddEvent = GSetAddEvent;
class GSetCrdt extends crdt_core_1.Crdt {
    constructor(parentOrRuntime, id, initialValue = new Set(), serialize = utils_1.Utils.jsonSerialize, deserialize = utils_1.Utils.jsonDeserialize) {
        super(parentOrRuntime, id, initialValue);
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
    add(value) {
        let message = proto_compiled_1.GSetMessage.create({
            toAdd: this.serialize(value)
        });
        let buffer = proto_compiled_1.GSetMessage.encode(message).finish();
        super.send(buffer);
    }
    receiveInternal(timestamp, message) {
        try {
            let decoded = proto_compiled_1.GSetMessage.decode(message);
            let value = this.deserialize(decoded.toAdd);
            if (!this.state.has(value)) {
                this.state.add(value);
                this.dispatchEvent(new GSetAddEvent(this, timestamp, value));
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
    constructor(parentOrRuntime, id, initialValue, serialize = utils_1.Utils.jsonSerialize, deserialize = utils_1.Utils.jsonDeserialize) {
        let initialSet = new Set();
        if (initialValue !== undefined) {
            initialSet.add(new MvrEntry(initialValue, null, -1));
        }
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
                // TODO: exception if value stayed put?
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
    get valueSet() {
        let values = new Set();
        for (let entry of this.state)
            values.add(entry.value);
        return values;
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
            this.runtime.register(this);
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
                // TODO: deliver error somewhere
                console.log("Unknown child: " + child +
                    " in: " + JSON.stringify(this.pathToRoot));
                return false;
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
    register(crdt) {
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
    setup(targetCrdt) {
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
            resetWrapperCrdt.setup(this);
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
            resetWrapperCrdt.setup(this);
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
exports.Utils = void 0;
class Utils {
    static jsonSerialize(value) {
        return new TextEncoder().encode(JSON.stringify(value));
    }
    static jsonDeserialize(serialized) {
        return JSON.parse(new TextDecoder().decode(serialized));
    }
}
exports.Utils = Utils;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9iYXNpY19jcmR0cy5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9jcmR0X2NvcmUuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvY3JkdHMvcmVzZXR0YWJsZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9jcmR0cy9zZW1pZGlyZWN0LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL2NyZHRzL3V0aWxzLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvY3JkdF9uZXR3b3JrX2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L2J1aWxkL3NyYy9uZXR3b3JrL2NyZHRfbmV0d29ya19ydW50aW1lLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvYnVpbGQvc3JjL25ldHdvcmsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvbmV0d29yay92ZWN0b3JfY2xvY2suanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9idWlsZC9zcmMvcHJvdG9fY29tcGlsZWQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvYXNwcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL2Jhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9ldmVudGVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvZmxvYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvQHByb3RvYnVmanMvaW5xdWlyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9AcHJvdG9idWZqcy9wb29sL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL0Bwcm90b2J1ZmpzL3V0ZjgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL2luZGV4LW1pbmltYWwuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcmVhZGVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JlYWRlcl9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcm9vdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvcnBjLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3JwYy9zZXJ2aWNlLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3V0aWwvbG9uZ2JpdHMuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4uL2NsaWVudC9ub2RlX21vZHVsZXMvcHJvdG9idWZqcy9zcmMvdXRpbC9taW5pbWFsLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uLi9jbGllbnQvbm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvc3JjL3dyaXRlci5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi4vY2xpZW50L25vZGVfbW9kdWxlcy9wcm90b2J1ZmpzL3NyYy93cml0ZXJfYnVmZmVyLmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovL2NvbXBvdmVudHVhbHMtZGVtby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vY29tcG92ZW50dWFscy1kZW1vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9jb21wb3ZlbnR1YWxzLWRlbW8vLi9zcmMvc2l0ZS9jb3VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsNkJBQTZCLG1CQUFPLENBQUMsdURBQWE7QUFDbEQsK0JBQStCLG1CQUFPLENBQUMsMkRBQWU7QUFDdEQs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCwwQkFBMEI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHVCQUF1QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QVcsV0FBVztBQUN0QixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSyxJQUFJOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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Q3BGLGlFQUFpRTtBQUNqRSxJQUFJLGFBQWEsR0FBRyxJQUFJLDRCQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUUvRCxvQkFBb0I7QUFDcEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVqRCxnRUFBZ0U7QUFDaEUsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtJQUN0QyxPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUM7QUFFSCwwRUFBMEU7QUFDMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUUsQ0FBQyxPQUFPLEdBQUc7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsT0FBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3hELENBQUM7QUFFRCwwRUFBMEU7QUFDMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUUsQ0FBQyxPQUFPLEdBQUc7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixPQUFRLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEQsQ0FBQztBQUVELHNFQUFzRTtBQUN0RSwwREFBMEQ7QUFDMUQsMkRBQTJEO0FBQzNELElBQUkiLCJmaWxlIjoiZGVwbG95L3NpdGUvY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NpdGUvY291bnRlci50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5ldHdvcmsgPSBleHBvcnRzLmNyZHRzID0gdm9pZCAwO1xuZXhwb3J0cy5jcmR0cyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvY3JkdHNcIikpO1xuZXhwb3J0cy5uZXR3b3JrID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL3NyYy9uZXR3b3JrXCIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NdWx0aVZhbHVlUmVnaXN0ZXIgPSBleHBvcnRzLk12ckV2ZW50ID0gZXhwb3J0cy5NdnJFbnRyeSA9IGV4cG9ydHMuR1NldENyZHQgPSBleHBvcnRzLkdTZXRBZGRFdmVudCA9IGV4cG9ydHMuTXVsdFJlZ2lzdGVyQ3JkdCA9IGV4cG9ydHMuTXVsdEV2ZW50ID0gZXhwb3J0cy5Db3VudGVyQ3JkdCA9IGV4cG9ydHMuTnVtYmVyU3RhdGUgPSBleHBvcnRzLkFkZEV2ZW50ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBwcm90b19jb21waWxlZF8xID0gcmVxdWlyZShcIi4uL3Byb3RvX2NvbXBpbGVkXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY2xhc3MgQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZUFkZGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy52YWx1ZUFkZGVkID0gdmFsdWVBZGRlZDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJBZGRcIjtcbiAgICB9XG59XG5leHBvcnRzLkFkZEV2ZW50ID0gQWRkRXZlbnQ7XG5jbGFzcyBOdW1iZXJTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuTnVtYmVyU3RhdGUgPSBOdW1iZXJTdGF0ZTtcbi8vIFRPRE86IG1ha2UgcmVzZXR0YWJsZVxuY2xhc3MgQ291bnRlckNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsVmFsdWUgPSAwKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIG5ldyBOdW1iZXJTdGF0ZShpbml0aWFsVmFsdWUpKTtcbiAgICB9XG4gICAgYWRkKHRvQWRkKSB7XG4gICAgICAgIGlmICh0b0FkZCAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLkNvdW50ZXJNZXNzYWdlLmNyZWF0ZSh7IHRvQWRkOiB0b0FkZCB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b19jb21waWxlZF8xLkNvdW50ZXJNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgICAgIHN1cGVyLnNlbmQoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWNlaXZlSW50ZXJuYWwodGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuQ291bnRlck1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSArPSBkZWNvZGVkLnRvQWRkO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBBZGRFdmVudCh0aGlzLCB0aW1lc3RhbXAsIGRlY29kZWQudG9BZGQpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkZWQsIHZhbHVlPVwiICsgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlcXVpdmFsZW50IGFkZC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hZGQodmFsdWUgLSB0aGlzLnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLkNvdW50ZXJDcmR0ID0gQ291bnRlckNyZHQ7XG5jbGFzcyBNdWx0RXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZU11bHRlZCkge1xuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMudmFsdWVNdWx0ZWQgPSB2YWx1ZU11bHRlZDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJNdWx0XCI7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0RXZlbnQgPSBNdWx0RXZlbnQ7XG5jbGFzcyBNdWx0UmVnaXN0ZXJDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlID0gMSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgTnVtYmVyU3RhdGUoaW5pdGlhbFZhbHVlKSk7XG4gICAgfVxuICAgIG11bHQodG9NdWx0KSB7XG4gICAgICAgIGlmICh0b011bHQgIT09IDEpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5NdWx0UmVnaXN0ZXJNZXNzYWdlLmNyZWF0ZSh7IHRvTXVsdDogdG9NdWx0IH0pO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuTXVsdFJlZ2lzdGVyTWVzc2FnZS5lbmNvZGUobWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGRlY29kZWQgPSBwcm90b19jb21waWxlZF8xLk11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS52YWx1ZSAqPSBkZWNvZGVkLnRvTXVsdDtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTXVsdEV2ZW50KHRoaXMsIHRpbWVzdGFtcCwgZGVjb2RlZC50b011bHQpKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVxdWl2YWxlbnQgbXVsdC5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tdWx0KHZhbHVlIC8gdGhpcy52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NdWx0UmVnaXN0ZXJDcmR0ID0gTXVsdFJlZ2lzdGVyQ3JkdDtcbmNsYXNzIEdTZXRBZGRFdmVudCB7XG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCB0aW1lc3RhbXAsIHZhbHVlQWRkZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZhbHVlQWRkZWQgPSB2YWx1ZUFkZGVkO1xuICAgICAgICB0aGlzLnR5cGUgPSBcIkdTZXRBZGRcIjtcbiAgICB9XG59XG5leHBvcnRzLkdTZXRBZGRFdmVudCA9IEdTZXRBZGRFdmVudDtcbmNsYXNzIEdTZXRDcmR0IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlID0gbmV3IFNldCgpLCBzZXJpYWxpemUgPSB1dGlsc18xLlV0aWxzLmpzb25TZXJpYWxpemUsIGRlc2VyaWFsaXplID0gdXRpbHNfMS5VdGlscy5qc29uRGVzZXJpYWxpemUpIHtcbiAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBzZXJpYWxpemU7XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemUgPSBkZXNlcmlhbGl6ZTtcbiAgICB9XG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5HU2V0TWVzc2FnZS5jcmVhdGUoe1xuICAgICAgICAgICAgdG9BZGQ6IHRoaXMuc2VyaWFsaXplKHZhbHVlKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvX2NvbXBpbGVkXzEuR1NldE1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5HU2V0TWVzc2FnZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRlc2VyaWFsaXplKGRlY29kZWQudG9BZGQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBHU2V0QWRkRXZlbnQodGhpcywgdGltZXN0YW1wLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGluZyBlcnJvcjogXCIgKyBlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEb24ndCBtdXRhdGUgdGhpcyBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH1cbn1cbmV4cG9ydHMuR1NldENyZHQgPSBHU2V0Q3JkdDtcbmNsYXNzIE12ckVudHJ5IHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgc2VuZGVyLCBjb3VudGVyKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZW5kZXIgPSBzZW5kZXI7XG4gICAgICAgIHRoaXMuY291bnRlciA9IGNvdW50ZXI7XG4gICAgfVxufVxuZXhwb3J0cy5NdnJFbnRyeSA9IE12ckVudHJ5O1xuY2xhc3MgTXZyRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxlciwgdGltZXN0YW1wLCB2YWx1ZUFkZGVkLCB2YWx1ZXNSZW1vdmVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyID0gY2FsbGVyO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgdGhpcy52YWx1ZUFkZGVkID0gdmFsdWVBZGRlZDtcbiAgICAgICAgdGhpcy52YWx1ZXNSZW1vdmVkID0gdmFsdWVzUmVtb3ZlZDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJNdnJcIjtcbiAgICB9XG59XG5leHBvcnRzLk12ckV2ZW50ID0gTXZyRXZlbnQ7XG5jbGFzcyBNdWx0aVZhbHVlUmVnaXN0ZXIgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBpbml0aWFsVmFsdWUsIHNlcmlhbGl6ZSA9IHV0aWxzXzEuVXRpbHMuanNvblNlcmlhbGl6ZSwgZGVzZXJpYWxpemUgPSB1dGlsc18xLlV0aWxzLmpzb25EZXNlcmlhbGl6ZSkge1xuICAgICAgICBsZXQgaW5pdGlhbFNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbml0aWFsU2V0LmFkZChuZXcgTXZyRW50cnkoaW5pdGlhbFZhbHVlLCBudWxsLCAtMSkpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHBhcmVudE9yUnVudGltZSwgaWQsIGluaXRpYWxTZXQpO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IHNlcmlhbGl6ZTtcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBwcm90b19jb21waWxlZF8xLk12ck1lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b19jb21waWxlZF8xLk12ck1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xuICAgICAgICBzdXBlci5zZW5kKGJ1ZmZlcik7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBkZWNvZGVkID0gcHJvdG9fY29tcGlsZWRfMS5NdnJNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZGVzZXJpYWxpemUoZGVjb2RlZC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBlbnRyeSBvZiB0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LnNlbmRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5kZWxldGUoZW50cnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZjRW50cnkgPSB2Yy5nZXQoZW50cnkuc2VuZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZjRW50cnkgIT09IHVuZGVmaW5lZCAmJiB2Y0VudHJ5ID49IGVudHJ5LmNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZGVsZXRlKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQuYWRkKGVudHJ5LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhdGUuYWRkKG5ldyBNdnJFbnRyeSh2YWx1ZSwgdGltZXN0YW1wLmdldFNlbmRlcigpLCB0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpKSk7XG4gICAgICAgICAgICBpZiAocmVtb3ZlZC5zaXplID09PSAxICYmIHJlbW92ZWQuZW50cmllcygpLm5leHQoKS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG5vIGNoYW5nZSB0byBhY3R1YWwgdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGV4Y2VwdGlvbiBpZiB2YWx1ZSBzdGF5ZWQgcHV0P1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTXZyRXZlbnQodGhpcywgdGltZXN0YW1wLCB2YWx1ZSwgcmVtb3ZlZCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB2YWx1ZVNldCgpIHtcbiAgICAgICAgbGV0IHZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChsZXQgZW50cnkgb2YgdGhpcy5zdGF0ZSlcbiAgICAgICAgICAgIHZhbHVlcy5hZGQoZW50cnkudmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbn1cbmV4cG9ydHMuTXVsdGlWYWx1ZVJlZ2lzdGVyID0gTXVsdGlWYWx1ZVJlZ2lzdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzaWNfY3JkdHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNyZHRSdW50aW1lID0gZXhwb3J0cy5DcmR0ID0gdm9pZCAwO1xuY29uc3QgcHJvdG9fY29tcGlsZWRfMSA9IHJlcXVpcmUoXCIuLi9wcm90b19jb21waWxlZFwiKTtcbmNsYXNzIENyZHQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYXJlbnRPclJ1bnRpbWUgQSBwYXJlbnQgZm9yIHRoaXMgQ3JkdCwgZWl0aGVyIGFub3RoZXJcbiAgICAgKiBDcmR0LCBvciB0aGUgQ3JkdFJ1bnRpbWUgaWYgdGhpcyBoYXMgbm8gQ3JkdCBwYXJlbnQuXG4gICAgICogVHlwaWNhbGx5IHBhcmVudCB3aWxsIGJlIHRoZSBDcmR0IGNvbnRhaW5pbmcgdGhpc1xuICAgICAqIGFzIGFuIGluc3RhbmNlIHZhcmlhYmxlLCBvciB0aGUgQ3JkdFJ1bnRpbWUgaWYgdGhlcmUgaXNcbiAgICAgKiBubyBzdWNoIENyZHQuICBDcmR0cyB3aXRoIHRoZSBzYW1lIHBhcmVudCBzaGFyZSBhIGNvbW1vblxuICAgICAqIG5hbWVzcGFjZSBhbmQgY2F1c2FsIGNvbnNpc3RlbmN5IGdyb3VwLCBhbmQgdGhlIGRlZmF1bHRcbiAgICAgKiByZXNldCgpIGJlaGF2aW9yIGlzIHRvIGNhbGwgcmVzZXQoKSBvbiBlYWNoIGNoaWxkLlxuICAgICAqIERpZmZlcmVudCByZXBsaWNhcyBvZiBhIENyZHQgbXVzdCBiZSBhc3NpZ25lZCBwYXJlbnRzXG4gICAgICogd2hpY2ggYXJlIGFsc28gcmVwbGljYXMgb2YgZWFjaCBvdGhlci5cbiAgICAgKiBAcGFyYW0gaWQgICAgICBBbiBpZCBmb3IgdGhpcyBDcmR0LiAgQWxsIENyZHRzIHdpdGggdGhlXG4gICAgICogc2FtZSBwYXJlbnQgbXVzdCBoYXZlIGRpc3RpbmN0IGlkcywgYW5kIHRoZSBpZHMgbXVzdFxuICAgICAqIGJlIHRoZSBzYW1lIGZvciBhbGwgcmVwbGljYXMgb2YgYSBnaXZlbiBDUkRULCBpbiBvcmRlclxuICAgICAqIGZvciB0aGUgQ3JkdFJ1bnRpbWUgdG8gcm91dGUgbWVzc2FnZXMgdG8gdGhlbSBwcm9wZXJseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLmlzQ3JkdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuaW5SZWNlaXZlSW50ZXJuYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIGlmIChcImlzQ3JkdFwiIGluIHBhcmVudE9yUnVudGltZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRPclJ1bnRpbWU7XG4gICAgICAgICAgICB0aGlzLnJ1bnRpbWUgPSB0aGlzLnBhcmVudC5ydW50aW1lO1xuICAgICAgICAgICAgdGhpcy5wYXRoVG9Sb290ID0gW2lkLCAuLi50aGlzLnBhcmVudC5wYXRoVG9Sb290XTtcbiAgICAgICAgICAgIHRoaXMucm9vdElkID0gdGhpcy5wYXJlbnQucm9vdElkO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQucmVnaXN0ZXJDaGlsZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucnVudGltZSA9IHBhcmVudE9yUnVudGltZTtcbiAgICAgICAgICAgIHRoaXMucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yb290SWQgPSBpZDtcbiAgICAgICAgICAgIHRoaXMucnVudGltZS5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWdpc3RlckNoaWxkKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc2V0KGNoaWxkLmlkLCBjaGlsZCk7XG4gICAgfVxuICAgIC8vIFRPRE86IHR5cGluZywgb3IgYXQgbGVhc3QgY2hlY2sgdHlwZSBleGlzdHM/XG4gICAgLy8gVE9ETzogYWJpbGl0eSB0byByZW1vdmUgbGlzdGVuZXJzPyAgTG9vayBhdCBob3cgRE9NIGRvZXMgaXQuXG4gICAgLyoqXG4gICAgICogVE9ETzogY29weSBET00gZGVzY3JpcHRpb24uXG4gICAgICogQHBhcmFtICB0eXBlICAgICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBsaXN0ZW5lciBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICByZWNlaXZlTG9jYWwgPSBmYWxzZSAgSWYgZmFsc2UsIGV2ZW50cyB3aXRoIGlzTG9jYWwgPSB0cnVlXG4gICAgICogYXJlIG5vdCBkZWxpdmVyZWQuXG4gICAgICogQHJldHVybiAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgcmVjZWl2ZUxvY2FsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmdldCh0eXBlKTtcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5zZXQodHlwZSwgbGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5wdXNoKFtsaXN0ZW5lciwgcmVjZWl2ZUxvY2FsXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc3ViY2xhc3Mgc2hvdWxkIGNhbGwgdGhpcyBpbiBhIHJlbW90ZSBtZXRob2RcbiAgICAgKiB3aGVuIGl0IGhhcyBhbiBldmVudFxuICAgICAqIGl0IHdhbnRzIHRvIGRlbGl2ZXIgdG8gbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmdldChldmVudC50eXBlKTtcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgW2xpc3RlbmVyLCByZWNlaXZlTG9jYWxdIG9mIGxpc3QpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlTG9jYWwgfHwgIWV2ZW50LnRpbWVzdGFtcC5pc0xvY2FsKCkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZW5kKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5ydW50aW1lLnNlbmQodGhpcywgbWVzc2FnZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBDYWxsYmFjayB1c2VkIGJ5IENyZHRSdW50aW1lIG9yIGEgcGFyZW50IENyZHQuXG4gICAgICAqIEB0YXJnZXRQYXRoOiB0aGUgdGFyZ2V0IENyZHQncyBpZCBmb2xsb3dlZCBieVxuICAgICAgKiB0aGUgaWRzIG9mIGl0cyBhbmNlc3RvcnMgaW4gYXNjZW5kaW5nIG9yZGVyLFxuICAgICAgKiBleGNsdWRpbmcgdGhlIGN1cnJlbnQgQ3JkdC5cbiAgICAgICogQHBhcmFtIHRpbWVzdGFtcCBUaGUgdGltZXN0YW1wIG9mIHRoZSByZWNlaXZlZCBtZXNzYWdlXG4gICAgICAqIEBwYXJhbSBtZXNzYWdlICAgVGhlIHJlY2VpdmVkIG1lc3NhZ2VcbiAgICAgICovXG4gICAgcmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgLy8gVE9ETzogdXNlIChob21lYnJldz8pIGl0ZXJhdG9yIGZvciB0YXJnZXRQYXRoLlxuICAgICAgICAvLyBNYWtlIGl0IGVhc3kgdG8gY29weSBmb3IgbXVsdGlwbGUgdXNlcyAoY29weWluZ1xuICAgICAgICAvLyBpbmRleCBidXQgbm90IHRoZSB1bmRlcmx5aW5nIGFycmF5KS5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRhcmdldFBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBhcmUgdGhlIHRhcmdldFxuICAgICAgICAgICAgY2hhbmdlZCA9IHRoaXMucmVjZWl2ZUludGVybmFsKHRpbWVzdGFtcCwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuLmdldCh0YXJnZXRQYXRoW3RhcmdldFBhdGgubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWxpdmVyIGVycm9yIHNvbWV3aGVyZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBjaGlsZDogXCIgKyBjaGlsZCArXG4gICAgICAgICAgICAgICAgICAgIFwiIGluOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucGF0aFRvUm9vdCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldFBhdGgubGVuZ3RoLS07XG4gICAgICAgICAgICBjaGFuZ2VkID0gdGhpcy5yZWNlaXZlSW50ZXJuYWxGb3JDaGlsZChjaGlsZCwgdGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBjaGFuZ2VkIGV2ZW50XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHJlY2VpdmUgbWVzc2FnZXMgc2VudCBieSBzZW5kXG4gICAgICogb24gcmVwbGljYXMgb2YgdGhpcyBjcmR0IChpbmNsdWRpbmcgdGhvc2Ugc2VudFxuICAgICAqIGxvY2FsbHkpLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgdGhpcyBDcmR0J3Mgc3RhdGUgd2FzIGNoYW5nZWQsIGkuZS4sXG4gICAgICogQ3JkdEV2ZW50J3Mgb2YgdHlwZSBcIkNoYW5nZVwiIHNob3VsZCBiZVxuICAgICAqIGRpc3BhdGNoZWQuXG4gICAgICovXG4gICAgcmVjZWl2ZUludGVybmFsKF90aW1lc3RhbXAsIF9tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlY2VpdmVkIGEgbWVzc2FnZSBidXQgcmVjZWl2ZUludGVybmFsIGlzIG5vdCBvdmVycmlkZGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIHRvIHJlY2VpdmUgbWVzc2FnZXMgc2VudCBieSBzZW5kXG4gICAgICogb24gY2hpbGRyZW4gb2YgdGhpcyBDcmR0LlxuICAgICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHBhc3MgdGhlXG4gICAgICogbWVzc2FnZSB0byBjaGlsZCB1bmNoYW5nZWQsIGJ5XG4gICAgICogY2FsbGluZyBjaGlsZC5yZWNlaXZlKHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkuXG4gICAgICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZFxuICAgICAqIEBwYXJhbSAgdGFyZ2V0UGF0aCBUaGUgdGFyZ2V0UGF0aCB0aGF0IHdvdWxkIG5vcm1hbGx5XG4gICAgICogYmUgZGVsaXZlcmVkIHRvIHRoZSBjaGlsZCwgaS5lLiwgdGhlIGlkcyBvZiB0aGUgQ3JkdHNcbiAgICAgKiBvbiB0aGUgcGF0aFxuICAgICAqIGZyb20gdGhlIG1lc3NhZ2UncyB1bHRpbWF0ZSB0YXJnZXQgdG8gY2hpbGQsIGV4Y2x1ZGluZ1xuICAgICAqIGNoaWxkLlxuICAgICAqIEBwYXJhbSAgdGltZXN0YW1wICBbZGVzY3JpcHRpb25dXG4gICAgICogQHBhcmFtICBtZXNzYWdlICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgKiBAcmV0dXJuIFdoZXRoZXIgdGhpcyBDcmR0J3Mgc3RhdGUgd2FzIGNoYW5nZWQsIGkuZS4sXG4gICAgICogYSBDcmR0RXZlbnQgb2YgdHlwZSBcIkNoYW5nZVwiIHNob3VsZCBiZVxuICAgICAqIGRpc3BhdGNoZWQuXG4gICAgICovXG4gICAgcmVjZWl2ZUludGVybmFsRm9yQ2hpbGQoY2hpbGQsIHRhcmdldFBhdGgsIHRpbWVzdGFtcCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQucmVjZWl2ZSh0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3JkdCA9IENyZHQ7XG4vLyBUT0RPOiBnZW5lcmljIGNoYW5nZSBldmVudHMgZnJvbSByZXR1cm4gdmFsdWVzXG5jbGFzcyBDcmR0UnVudGltZSB7XG4gICAgY29uc3RydWN0b3IobmV0d29yaykge1xuICAgICAgICB0aGlzLm5ldHdvcmsgPSBuZXR3b3JrO1xuICAgICAgICB0aGlzLnJvb3RDcmR0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrLnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cbiAgICByZWdpc3RlcihjcmR0KSB7XG4gICAgICAgIHRoaXMucm9vdENyZHRzLnNldChjcmR0LmlkLCBjcmR0KTtcbiAgICB9XG4gICAgc2VuZChzZW5kZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubmV0d29yay5nZXROZXh0VGltZXN0YW1wKHNlbmRlci5yb290SWQpO1xuICAgICAgICAvLyBEZWxpdmVyIHRvIHNlbGZcbiAgICAgICAgLy8gVE9ETzogZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhpcy5yb290Q3JkdHMuZ2V0KHNlbmRlci5yb290SWQpLnJlY2VpdmUoc2VuZGVyLnBhdGhUb1Jvb3Quc2xpY2UoKSwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgbGV0IHJ1bnRpbWVNZXNzYWdlID0gcHJvdG9fY29tcGlsZWRfMS5DcmR0UnVudGltZU1lc3NhZ2UuY3JlYXRlKHtcbiAgICAgICAgICAgIGlubmVyTWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgIHBhdGhUb1Jvb3Q6IHNlbmRlci5wYXRoVG9Sb290XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9fY29tcGlsZWRfMS5DcmR0UnVudGltZU1lc3NhZ2UuZW5jb2RlKHJ1bnRpbWVNZXNzYWdlKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrLnNlbmQoc2VuZGVyLnJvb3RJZCwgYnVmZmVyLCB0aW1lc3RhbXApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBmb3IgQ3JkdE5ldHdvcmsuXG4gICAgICovXG4gICAgcmVjZWl2ZShncm91cCwgbWVzc2FnZSwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZGVjb2RlZCA9IHByb3RvX2NvbXBpbGVkXzEuQ3JkdFJ1bnRpbWVNZXNzYWdlLmRlY29kZShtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucm9vdENyZHRzLmdldChncm91cCkucmVjZWl2ZShkZWNvZGVkLnBhdGhUb1Jvb3QsIHRpbWVzdGFtcCwgZGVjb2RlZC5pbm5lck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kaW5nIGVycm9yOiBcIiArIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFJlcGxpY2FJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV0d29yay5nZXRSZXBsaWNhSWQoKTtcbiAgICB9XG59XG5leHBvcnRzLkNyZHRSdW50aW1lID0gQ3JkdFJ1bnRpbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmR0X2NvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9iYXNpY19jcmR0c1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9jb3JlXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsc1wiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vanNvbic7XG4vL2V4cG9ydCAqIGZyb20gJy4vbXVsdGlfc2VtaWRpcmVjdCc7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVzZXR0YWJsZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc2VtaWRpcmVjdFwiKSwgZXhwb3J0cyk7XG4vL2V4cG9ydCAqIGZyb20gJy4vc3RhbmRhcmQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk9wdGlvbmFsUmVzZXR0YWJsZVNlbWlkaXJlY3RQcm9kdWN0ID0gZXhwb3J0cy5PcHRpb25hbFJlc2V0dGFibGVDcmR0ID0gZXhwb3J0cy5SZXNldFdyYXBwZXJDcmR0ID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jb25zdCBzZW1pZGlyZWN0XzEgPSByZXF1aXJlKFwiLi9zZW1pZGlyZWN0XCIpO1xuY2xhc3MgUmVzZXRDb21wb25lbnRNZXNzYWdlIGV4dGVuZHMgVWludDhBcnJheSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuaXNSZXNldENvbXBvbmVudE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlcGxheSA9IFtdO1xuICAgIH1cbn1cbmNsYXNzIFJlc2V0Q29tcG9uZW50IGV4dGVuZHMgY3JkdF9jb3JlXzEuQ3JkdCB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBpZCwgdGFyZ2V0Q3JkdCkge1xuICAgICAgICBzdXBlcihwYXJlbnQsIGlkLCBudWxsKTtcbiAgICAgICAgdGhpcy50YXJnZXRDcmR0ID0gdGFyZ2V0Q3JkdDtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHN1cGVyLnNlbmQobmV3IFVpbnQ4QXJyYXkoKSk7XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbCh0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy50YXJnZXRDcmR0LmhhcmRSZXNldCgpO1xuICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaFJlc2V0RXZlbnQodGltZXN0YW1wKTtcbiAgICAgICAgaWYgKFwiaXNSZXNldENvbXBvbmVudE1lc3NhZ2VcIiBpbiBtZXNzYWdlKSB7XG4gICAgICAgICAgICAvLyBSZXBsYXkgbWVzc2FnZS5yZXBsYXlcbiAgICAgICAgICAgIGZvciAobGV0IHRvUmVwbGF5IG9mIG1lc3NhZ2UucmVwbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRDcmR0LnJlY2VpdmUoLi4udG9SZXBsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmNsYXNzIFJlc2V0V3JhcHBlckNyZHQgZXh0ZW5kcyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdFByb2R1Y3Qge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCB0cnVlLCB0cnVlLCBrZWVwT25seU1heGltYWwpO1xuICAgIH1cbiAgICBzZXR1cCh0YXJnZXRDcmR0KSB7XG4gICAgICAgIHRoaXMucmVzZXRDb21wb25lbnQgPSBuZXcgUmVzZXRDb21wb25lbnQodGhpcywgdGhpcy5pZCArIFwiX2NvbXBcIiwgdGFyZ2V0Q3JkdCk7XG4gICAgICAgIHN1cGVyLnNldHVwKHRoaXMucmVzZXRDb21wb25lbnQsIHRhcmdldENyZHQsIHRoaXMuYWN0aW9uLmJpbmQodGhpcyksIHRhcmdldENyZHQuc3RhdGUpO1xuICAgIH1cbiAgICBhY3Rpb24obTJUYXJnZXRQYXRoLCBtMlRpbWVzdGFtcCwgbTJNZXNzYWdlLCBtMVRhcmdldFBhdGgsIF9tMVRpbWVzdGFtcCwgbTFNZXNzYWdlKSB7XG4gICAgICAgIGlmICghKFwiaXNSZXNldENvbXBvbmVudE1lc3NhZ2VcIiBpbiBtMU1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBtMU1lc3NhZ2UgPSBuZXcgUmVzZXRDb21wb25lbnRNZXNzYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbTFNZXNzYWdlLnJlcGxheS5wdXNoKFttMlRhcmdldFBhdGguc2xpY2UoKSwgbTJUaW1lc3RhbXAsIG0yTWVzc2FnZV0pO1xuICAgICAgICByZXR1cm4gW20xVGFyZ2V0UGF0aCwgbTFNZXNzYWdlXTtcbiAgICB9XG4gICAgZGlzcGF0Y2hSZXNldEV2ZW50KHRpbWVzdGFtcCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgY2FsbGVyOiB0aGlzLFxuICAgICAgICAgICAgdHlwZTogXCJSZXNldFwiLFxuICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnJlc2V0Q29tcG9uZW50LnJlc2V0KCk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXNldFdyYXBwZXJDcmR0ID0gUmVzZXRXcmFwcGVyQ3JkdDtcbmNsYXNzIE9wdGlvbmFsUmVzZXR0YWJsZUNyZHQgZXh0ZW5kcyBjcmR0X2NvcmVfMS5DcmR0IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ga2VlcE9ubHlNYXhpbWFsPWZhbHNlIFN0b3JlIG9ubHkgY2F1c2FsbHkgbWF4aW1hbFxuICAgICAqIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5LCB0byBzYXZlIHNwYWNlIChhbHRob3VnaCBwb3NzaWJseVxuICAgICAqIGF0IHNvbWUgQ1BVIGNvc3QpLiAgVGhpcyBpcyBvbmx5IGFsbG93ZWQgaWYgdGhlIHN0YXRlXG4gICAgICogb25seSBldmVyIGRlcGVuZHMgb24gdGhlIGNhdXNhbGx5IG1heGltYWwgbWVzc2FnZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFN0YXRlLCByZXNldHRhYmxlID0gdHJ1ZSwga2VlcE9ubHlNYXhpbWFsID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHJlc2V0dGFibGUpIHtcbiAgICAgICAgICAgIGxldCByZXNldFdyYXBwZXJDcmR0ID0gbmV3IFJlc2V0V3JhcHBlckNyZHQocGFyZW50T3JSdW50aW1lLCBpZCArIFwiX3Jlc2V0XCIsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgICAgICAgICBzdXBlcihyZXNldFdyYXBwZXJDcmR0LCBpZCwgaW5pdGlhbFN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdCA9IHJlc2V0V3JhcHBlckNyZHQ7XG4gICAgICAgICAgICByZXNldFdyYXBwZXJDcmR0LnNldHVwKHRoaXMpO1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5hZGRFdmVudExpc3RlbmVyKFwiUmVzZXRcIiwgKGV2ZW50KSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICAgIGNhbGxlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZXZlbnQudGltZXN0YW1wXG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaW5pdGlhbFN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldHRhYmxlID0gcmVzZXR0YWJsZTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0dGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVzZXQoKSBjYWxsZWQgYnV0IHJlc2V0dGFibGUgaXMgZmFsc2VcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk9wdGlvbmFsUmVzZXR0YWJsZUNyZHQgPSBPcHRpb25hbFJlc2V0dGFibGVDcmR0O1xuY2xhc3MgT3B0aW9uYWxSZXNldHRhYmxlU2VtaWRpcmVjdFByb2R1Y3QgZXh0ZW5kcyBzZW1pZGlyZWN0XzEuU2VtaWRpcmVjdFByb2R1Y3Qge1xuICAgIC8qKlxuICAgICAqIEZvciBtb3JlIHBhcmFtZXRlciBkZXNjcmlwdGlvbnMsIHNlZVxuICAgICAqIFNlbWlkaXJlY3RQcm9kdWN0LlxuICAgICAqIEBwYXJhbSBrZWVwT25seU1heGltYWw9ZmFsc2UgU3RvcmUgb25seSBjYXVzYWxseSBtYXhpbWFsXG4gICAgICogbWVzc2FnZXMgaW4gdGhlIGhpc3RvcnksIHRvIHNhdmUgc3BhY2UgKGFsdGhvdWdoIHBvc3NpYmx5XG4gICAgICogYXQgc29tZSBDUFUgY29zdCkuICBUaGlzIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGUgc3RhdGVcbiAgICAgKiBvbmx5IGV2ZXIgZGVwZW5kcyBvbiB0aGUgY2F1c2FsbHkgbWF4aW1hbCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRPclJ1bnRpbWUsIGlkLCByZXNldHRhYmxlLCBrZWVwT25seU1heGltYWwgPSBmYWxzZSwgaGlzdG9yeVRpbWVzdGFtcHMgPSB0cnVlLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBmYWxzZSwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHJlc2V0dGFibGUpIHtcbiAgICAgICAgICAgIGxldCByZXNldFdyYXBwZXJDcmR0ID0gbmV3IFJlc2V0V3JhcHBlckNyZHQocGFyZW50T3JSdW50aW1lLCBpZCArIFwiX3Jlc2V0XCIsIGtlZXBPbmx5TWF4aW1hbCk7XG4gICAgICAgICAgICBzdXBlcihyZXNldFdyYXBwZXJDcmR0LCBpZCwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdCA9IHJlc2V0V3JhcHBlckNyZHQ7XG4gICAgICAgICAgICByZXNldFdyYXBwZXJDcmR0LnNldHVwKHRoaXMpO1xuICAgICAgICAgICAgcmVzZXRXcmFwcGVyQ3JkdC5hZGRFdmVudExpc3RlbmVyKFwiUmVzZXRcIiwgKGV2ZW50KSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICAgICAgICAgIGNhbGxlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogZXZlbnQudGltZXN0YW1wXG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VwZXIocGFyZW50T3JSdW50aW1lLCBpZCwgaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKTtcbiAgICAgICAgdGhpcy5yZXNldHRhYmxlID0gcmVzZXR0YWJsZTtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0V3JhcHBlckNyZHQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRXcmFwcGVyQ3JkdC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcmRSZXNldCgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5oYXJkUmVzZXQoKTtcbiAgICAgICAgdGhpcy5oYXJkUmVzZXRJbnRlcm5hbCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuT3B0aW9uYWxSZXNldHRhYmxlU2VtaWRpcmVjdFByb2R1Y3QgPSBPcHRpb25hbFJlc2V0dGFibGVTZW1pZGlyZWN0UHJvZHVjdDtcbi8vIFRPRE86IHJlc2V0IHdpbnM/XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNldHRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TZW1pZGlyZWN0UHJvZHVjdCA9IGV4cG9ydHMuU2VtaWRpcmVjdFN0YXRlID0gdm9pZCAwO1xuY29uc3QgY3JkdF9jb3JlXzEgPSByZXF1aXJlKFwiLi9jcmR0X2NvcmVcIik7XG5jbGFzcyBTdG9yZWRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzZW5kZXJDb3VudGVyLCByZWNlaXB0Q291bnRlciwgdGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2VuZGVyQ291bnRlciA9IHNlbmRlckNvdW50ZXI7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSByZWNlaXB0Q291bnRlcjtcbiAgICAgICAgdGhpcy50YXJnZXRQYXRoID0gdGFyZ2V0UGF0aDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxufVxuLy8gVE9ETzogZnV0dXJlIG9wdHM6IGluZGV4ZWQgbWVzc2FnZXM7IHNldHRpbmcgdGhlIGhpc3Rvcnlcbi8vIHRvIGEgc3Vic2V0OyBjYXVzYWwgc3RhYmlsaXR5LlxuLy8gVE9ETzogZm9yIHRoaXMgdG8gd29yaywgcmVwbGljYUlkJ3MgbXVzdCBiZSBjb21wYXJhYmxlIGFjY29yZGluZ1xuLy8gdG8gdGhlIHNhbWUtZXF1YWxzIGFwcHJvYWNoLiAgVHlwaWNhbGx5LCB0aGlzIHJlcXVpcmVzIHRoZW1cbi8vIHRvIGJlIHByaW1pdGl2ZSB0eXBlcywgYXMgb2JqZWN0cyB3aGljaCBhcmUgZXF1YWwtdmFsdWVkIGJ1dCBoYXZlXG4vLyBkaWZmZXJlbnQgcG9pbnRlcnMgd2lsbCBiZSBjb25zaWRlcmVkIGRpZmZlcmVudC5cbi8vIFRPRE86IG1lbnRpb24gdGhhdCB0byBnZXQgYSBwcm9wZXIgQ1JEVCAoZXF1YWwgaW50ZXJuYWwgc3RhdGVzKSxcbi8vIHdlIHRlY2huaWNhbGx5IG11c3QgY29tcGFyZSByZWNlaXB0IG9yZGVycyBhcyBlcXVpdmFsZW50IGlmXG4vLyB0aGV5IGFyZSBib3RoIGluIGNhdXNhbCBvcmRlci5cbmNsYXNzIFNlbWlkaXJlY3RTdGF0ZSB7XG4gICAgY29uc3RydWN0b3IoaGlzdG9yeVRpbWVzdGFtcHMsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCwgaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVRpbWVzdGFtcHMgPSBoaXN0b3J5VGltZXN0YW1wcztcbiAgICAgICAgdGhpcy5oaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQgPSBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQ7XG4gICAgICAgIHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkID0gaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkO1xuICAgICAgICB0aGlzLnJlY2VpcHRDb3VudGVyID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcHMgYSByZXBsaWNhIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHNlbnQgYnkgdGhhdFxuICAgICAgICAgKiByZXBsaWNhLCBpbiBvcmRlci4gIEtlZXAgaW4gbWluZCB0aGF0IHBlci1zZW5kZXIgbWVzc2FnZVxuICAgICAgICAgKiBjb3VudGVycyBtYXkgbm90IGJlIGNvbnRpZ3VvdXMsIHNpbmNlIHRoZXkgYXJlIHNoYXJlZCBiZXR3ZWVuXG4gICAgICAgICAqIGFsbCBDcmR0cyB3aXRoIGEgZ2l2ZW4gcm9vdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIGhpc3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gdGltZXN0YW1wLlxuICAgICAqIHJlcGxpY2FJZCBpcyBvdXIgcmVwbGljYSBpZC5cbiAgICAgKi9cbiAgICBhZGQocmVwbGljYUlkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeURpc2NhcmQyRG9taW5hdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VuZGVySGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5nZXQodGltZXN0YW1wLmdldFNlbmRlcigpKTtcbiAgICAgICAgaWYgKHNlbmRlckhpc3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZGVySGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oaXN0b3J5LnNldCh0aW1lc3RhbXAuZ2V0U2VuZGVyKCksIHNlbmRlckhpc3RvcnkpO1xuICAgICAgICB9XG4gICAgICAgIHNlbmRlckhpc3RvcnkucHVzaChuZXcgU3RvcmVkTWVzc2FnZSh0aW1lc3RhbXAuZ2V0U2VuZGVyQ291bnRlcigpLCB0aGlzLnJlY2VpcHRDb3VudGVyLCB0YXJnZXRQYXRoLCAodGhpcy5oaXN0b3J5VGltZXN0YW1wcyA/IHRpbWVzdGFtcCA6IG51bGwpLCBtZXNzYWdlKSk7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIrKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBtZXNzYWdlcyBpbiB0aGUgaGlzdG9yeSBjb25jdXJyZW50IHRvIHRoZSBnaXZlblxuICAgICAqIHRpbWVzdGFtcCwgaW4gc29tZSBjYXVzYWwgb3JkZXIgKHNwZWNpZmljYWxseSwgdGhpcyByZXBsaWNhJ3NcbiAgICAgKiByZWNlaXB0IG9yZGVyKS4gIElmIHdlIGFyZSB0aGUgc2VuZGVyIChpLmUuLCByZXBsaWNhSWQgPT09XG4gICAgICogdGltZXN0YW1wLmdldFNlbmRlcigpKSwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB0aW1lc3RhbXAgaXNcbiAgICAgKiBjYXVzYWxseSBncmVhdGVyIHRoYW4gYWxsIHByaW9yIG1lc3NhZ2VzLCBhcyBkZXNjcmliZWQgaW5cbiAgICAgKiBDcmR0SW50ZXJuYWwuZWZmZWN0LCBoZW5jZSBbXSBpcyByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBnZXRDb25jdXJyZW50KHJlcGxpY2FJZCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NUaW1lc3RhbXAocmVwbGljYUlkLCB0aW1lc3RhbXAsIHRydWUsIHRoaXMuaGlzdG9yeURpc2NhcmQxRG9taW5hdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc3BlY2lmaWVkIGFjdGlvbnMgb24gYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5OlxuICAgICAqIC0gaWYgcmV0dXJuQ29uY3VycmVudCBpcyB0cnVlLCByZXR1cm5zIHRoZSBsaXN0IG9mXG4gICAgICogYWxsIG1lc3NhZ2VzIGluIHRoZSBoaXN0b3J5IGNvbmN1cnJlbnQgdG8gdGltZXN0YW1wLCBpblxuICAgICAqIHJlY2VpcHQgb3JkZXIuXG4gICAgICogLSBpZiBkaXNjYXJkRG9taW5hdGVkIGlzIHRydWUsIGRlbGV0ZXMgYWxsIG1lc3NhZ2VzIGZyb21cbiAgICAgKiB0aGUgaGlzdG9yeSB3aG9zZSB0aW1lc3RhbXBzIGFyZSBjYXVzYWxseSBkb21pbmF0ZWQgYnlcbiAgICAgKiBvciBlcXVhbCB0byB0aGUgZ2l2ZW4gdGltZXN0YW1wLiAgKE5vdGUgdGhhdCB0aGlzIG1lYW5zIHRoYXRcbiAgICAgKiBpZiB3ZSB3YW50IHRvIGtlZXAgYSBtZXNzYWdlIHdpdGggdGhlIGdpdmVuIHRpbWVzdGFtcCBpblxuICAgICAqIHRoZSBoaXN0b3J5LCBpdCBtdXN0IGJlIGFkZGVkIHRvIHRoZSBoaXN0b3J5IGFmdGVyIGNhbGxpbmdcbiAgICAgKiB0aGlzIG1ldGhvZC4pXG4gICAgICovXG4gICAgcHJvY2Vzc1RpbWVzdGFtcChyZXBsaWNhSWQsIHRpbWVzdGFtcCwgcmV0dXJuQ29uY3VycmVudCwgZGlzY2FyZERvbWluYXRlZCkge1xuICAgICAgICBpZiAocmVwbGljYUlkID09PSB0aW1lc3RhbXAuZ2V0U2VuZGVyKCkpIHtcbiAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90aGluZydzIGNvbmN1cnJlbnQsIHNvIGNsZWFyIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHYXRoZXIgdXAgdGhlIGNvbmN1cnJlbnQgbWVzc2FnZXMuICBUaGVzZSBhcmUgYWxsXG4gICAgICAgIC8vIG1lc3NhZ2VzIGJ5IGVhY2ggcmVwbGljYUlkIHdpdGggc2VuZGVyIGNvdW50ZXJcbiAgICAgICAgLy8gZ3JlYXRlciB0aGFuIHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCkuZ2V0KHJlcGxpY2FJZCkuXG4gICAgICAgIGxldCBjb25jdXJyZW50ID0gW107XG4gICAgICAgIGxldCB2YyA9IHRpbWVzdGFtcC5hc1ZlY3RvckNsb2NrKCk7XG4gICAgICAgIGZvciAobGV0IGVudHJ5IG9mIHZjLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgbGV0IHNlbmRlckhpc3RvcnkgPSB0aGlzLmhpc3RvcnkuZ2V0KGVudHJ5WzBdKTtcbiAgICAgICAgICAgIGlmIChzZW5kZXJIaXN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudEluZGV4U3RhcnQgPSBTZW1pZGlyZWN0U3RhdGUuaW5kZXhBZnRlcihzZW5kZXJIaXN0b3J5LCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbmN1cnJlbnRJbmRleFN0YXJ0OyBpIDwgc2VuZGVySGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY3VycmVudC5wdXNoKHNlbmRlckhpc3RvcnlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkRG9taW5hdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgb25seSB0aGUgbWVzc2FnZXMgd2l0aCBpbmRleFxuICAgICAgICAgICAgICAgICAgICAvLyA+PSBjb25jdXJyZW50SW5kZXhTdGFydFxuICAgICAgICAgICAgICAgICAgICBzZW5kZXJIaXN0b3J5LnNwbGljZSgwLCBjb25jdXJyZW50SW5kZXhTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRlbGV0ZSBpdCBmcm9tIHRoZSBtYXAgaWYgZW1wdHksXG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGEgZm9ybSBvZiBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYWxzbyBtYWtlcyBpc0hpc3RvcnlFbXB0eSBzaW1wbGVyLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0dXJuQ29uY3VycmVudCkge1xuICAgICAgICAgICAgLy8gU29ydCB0aGUgY29uY3VycmVudCBtZXNzYWdlcyBpbiByZWNlaXB0IG9yZGVyLlxuICAgICAgICAgICAgY29uY3VycmVudC5zb3J0KChhLCBiKSA9PiAoYS5yZWNlaXB0Q291bnRlciAtIGIucmVjZWlwdENvdW50ZXIpKTtcbiAgICAgICAgICAgIC8vIFN0cmlwIGF3YXkgZXZlcnl0aGluZyBleGNlcHQgdGhlIG1lc3NhZ2VzLlxuICAgICAgICAgICAgcmV0dXJuIGNvbmN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHN0b3JlZCBpbiB0aGUgaGlzdG9yeSxcbiAgICAgKiBpLmUuLCBlaXRoZXIgdGhlcmUgaGF2ZSBiZWVuIG5vIGNyZDEgbWVzc2FnZXMsIG9yXG4gICAgICogb3VyIFNlbWlkaXJlY3RJbnRlcm5hbCdzIGhpc3RvcnlLZWVwT25seUNvbmN1cnJlbnQgZmxhZyBpcyB0cnVlXG4gICAgICogYW5kIGFsbCBjcmR0MSBtZXNzYWdlcyBoYXZlIGJlZW4gY2F1c2FsbHkgbGVzcyB0aGFuIGEgY3JkdDJcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIGlzSGlzdG9yeUVtcHR5KCkge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLmhpc3RvcnkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBoYXJkUmVzZXQoKSB7XG4gICAgICAgIHRoaXMucmVjZWlwdENvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLmhpc3RvcnkuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBtZXRob2QgZm9yIHdvcmtpbmcgd2l0aCB0aGUgcGVyLXNlbmRlciBoaXN0b3J5XG4gICAgICogYXJyYXlzLiAgUmV0dXJucyB0aGUgaW5kZXggYWZ0ZXIgdGhlIGxhc3QgZW50cnkgd2hvc2VcbiAgICAgKiBwZXItc2VuZGVyIGNvdW50ZXIgKHRoZSBmaXJzdCB0dXBsZSBlbGVtZW50KSBpcyA8PVxuICAgICAqIHZhbHVlLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmRleEFmdGVyKHNwYXJzZUFycmF5LCB2YWx1ZSkge1xuICAgICAgICAvLyBUT0RPOiBiaW5hcnkgc2VhcmNoIHdoZW4gc3BhcnNlQXJyYXkgaXMgbGFyZ2VcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZXJlIG1heSBiZSBkdXBsaWNhdGUgdGltZXN0YW1wcy5cbiAgICAgICAgLy8gU28gaXQgd291bGQgYmUgaW5hcHByb3ByaWF0ZSB0byBmaW5kIGFuIGVudHJ5IHdob3NlXG4gICAgICAgIC8vIHBlci1zZW5kZXIgY291bnRlciBlcXVhbHMgdmFsdWUgYW5kIGluZmVyIHRoYXRcbiAgICAgICAgLy8gdGhlIGRlc2lyZWQgaW5kZXggaXMgMSBncmVhdGVyLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYXJzZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3BhcnNlQXJyYXlbaV0uc2VuZGVyQ291bnRlciA+IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFyc2VBcnJheS5sZW5ndGg7XG4gICAgfVxufVxuZXhwb3J0cy5TZW1pZGlyZWN0U3RhdGUgPSBTZW1pZGlyZWN0U3RhdGU7XG5jbGFzcyBTZW1pZGlyZWN0UHJvZHVjdCBleHRlbmRzIGNyZHRfY29yZV8xLkNyZHQge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE9yUnVudGltZSwgaWQsIGhpc3RvcnlUaW1lc3RhbXBzID0gZmFsc2UsIGhpc3RvcnlEaXNjYXJkMURvbWluYXRlZCA9IGZhbHNlLCBoaXN0b3J5RGlzY2FyZDJEb21pbmF0ZWQgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwYXJlbnRPclJ1bnRpbWUsIGlkLCBuZXcgU2VtaWRpcmVjdFN0YXRlKGhpc3RvcnlUaW1lc3RhbXBzLCBoaXN0b3J5RGlzY2FyZDFEb21pbmF0ZWQsIGhpc3RvcnlEaXNjYXJkMkRvbWluYXRlZCkpO1xuICAgIH1cbiAgICBzZXR1cChjcmR0MSwgY3JkdDIsIGFjdGlvbiwgaW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUuaW50ZXJuYWxTdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4uZ2V0KGNyZHQxLmlkKSAhPT0gY3JkdDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZHQxIChcIiArIGNyZHQxLmlkICsgXCIpIGlzIG5vdCBvdXIgY2hpbGRcIiArXG4gICAgICAgICAgICAgICAgXCIgKGlzIGl0IHVzaW5nIGEgd3JhcHBlciBjcmR0LCBlLmcuLCBiZWN1YXNlIHJlc2V0dGFibGUgPSB0cnVlPylcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4uZ2V0KGNyZHQyLmlkKSAhPT0gY3JkdDIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNyZHQyIChcIiArIGNyZHQyLmlkICsgXCIpIGlzIG5vdCBvdXIgY2hpbGRcIiArXG4gICAgICAgICAgICAgICAgXCIgKGlzIGl0IHVzaW5nIGEgd3JhcHBlciBjcmR0LCBlLmcuLCBiZWN1YXNlIHJlc2V0dGFibGUgPSB0cnVlPylcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jcmR0MSA9IGNyZHQxO1xuICAgICAgICB0aGlzLmNyZHQyID0gY3JkdDI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgSWdub3JlIHJlYWRvbmx5XG4gICAgICAgIGNyZHQxLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICAvLyBAdHMtaWdub3JlIElnbm9yZSByZWFkb25seVxuICAgICAgICBjcmR0Mi5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICAgICAgdGhpcy5hY3Rpb25WYXIgPSBhY3Rpb247XG4gICAgfVxuICAgIHJlY2VpdmVJbnRlcm5hbEZvckNoaWxkKGNoaWxkLCB0YXJnZXRQYXRoLCB0aW1lc3RhbXAsIG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChjaGlsZCkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLmNyZHQyOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWRkKHRoaXMucnVudGltZS5nZXRSZXBsaWNhSWQoKSwgdGFyZ2V0UGF0aC5zbGljZSgpLCB0aW1lc3RhbXAsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQyLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIGNhc2UgdGhpcy5jcmR0MTpcbiAgICAgICAgICAgICAgICBsZXQgY29uY3VycmVudCA9IHRoaXMuc3RhdGUuZ2V0Q29uY3VycmVudCh0aGlzLnJ1bnRpbWUuZ2V0UmVwbGljYUlkKCksIHRpbWVzdGFtcCk7XG4gICAgICAgICAgICAgICAgbGV0IG1BY3QgPSBbdGFyZ2V0UGF0aCwgbWVzc2FnZV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25jdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNhbiB3ZSBhdm9pZCBzZXJpYWxpemluZyBhbmRcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVzZXJpYWxpemluZyBlYWNoIHRpbWU/ICBMaWtlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpdGggUmVzZXRDb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgIGxldCBtQWN0T3JOdWxsID0gdGhpcy5hY3Rpb25WYXIoY29uY3VycmVudFtpXS50YXJnZXRQYXRoLCBjb25jdXJyZW50W2ldLnRpbWVzdGFtcCwgY29uY3VycmVudFtpXS5tZXNzYWdlLCBtQWN0WzBdLCB0aW1lc3RhbXAsIG1BY3RbMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobUFjdE9yTnVsbCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgbUFjdCA9IG1BY3RPck51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZHQxLnJlY2VpdmUobUFjdFswXSwgdGltZXN0YW1wLCBtQWN0WzFdKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gTm90IGludm9sdmVkIHdpdGggc2VtaWRpcmVjdCBwcm9kdWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLnJlY2VpdmUodGFyZ2V0UGF0aCwgdGltZXN0YW1wLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuU2VtaWRpcmVjdFByb2R1Y3QgPSBTZW1pZGlyZWN0UHJvZHVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbWlkaXJlY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlV0aWxzID0gdm9pZCAwO1xuY2xhc3MgVXRpbHMge1xuICAgIHN0YXRpYyBqc29uU2VyaWFsaXplKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICB9XG4gICAgc3RhdGljIGpzb25EZXNlcmlhbGl6ZShzZXJpYWxpemVkKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShzZXJpYWxpemVkKSk7XG4gICAgfVxufVxuZXhwb3J0cy5VdGlscyA9IFV0aWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBGaXJzdCBhdHRlbXB0IGF0IHRoZSBpbnRlcmZhY2UgYmV0d2VlbiB0aGUgcnVudGltZVxuLy8gKGNhdXNhbCBicm9hZGNhc3QgbmV0d29yaywgZXRjLikgYW5kIHRoZSBDcmR0cy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya19pbnRlcmZhY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldlYlNvY2tldE5ldHdvcmsgPSBleHBvcnRzLm15TWVzc2FnZSA9IHZvaWQgMDtcbmNvbnN0IF8xID0gcmVxdWlyZShcIi5cIik7XG4vLyBpbXBvcnQgV2ViU29ja2V0ID0gcmVxdWlyZShcIndzXCIpO1xuLy8gVGhlIGNhc3VhbCBicm9hZGNhc3QgbmV0d29yayBkZXNpZ25lZCBmb3IgYSB0d28td2F5IGludGVyYWN0aXZlXG4vLyBjb21tdW5pY2F0aW9uIHNlc3Npb24gYmV0d2VlbiB1c2VyIGFuZCBzZXJ2ZXIgdXNpbmcgV2ViU29ja2V0IEFQSS5cbi8vXG4vLyBBbHNvIGVuc3VyZSB0aGUgb3JkZXIgb2YgZGVsaXZlcnkgd2l0aCBjYXN1YWxpdHkgY2hlY2suXG4vKipcbiAqIEN1c3RvbWl6ZWQgbWVzc2FnZSBldmVudCB0aGF0IHRyYXZlbCB0aHJvdWdoXG4gKiBjYXN1YWxicm9hZGNhc3QgbmV0d29yay5cbiAqL1xuY2xhc3MgbXlNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBncm91cCwgdGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGN1c3RvbWl6ZWQgdG9KU09OIGZ1bmN0aW9uIHRvIGNvbnZlcnQgbWVzc2FnZSBhcyBKU09OIGZvcm1hdC5cbiAgICAgKiBUT0RPOiB1c2UgcHJvdG9idWZzLiAgRm9yIG5vdyB3ZSBiYXNlNjQgZW5jb2RlIHRoZVxuICAgICAqIGlubmVyIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBwYWNrYWdlIGluZm8gaW4gSlNPTiBmb3JtYXQuXG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBcIm1lc3NhZ2VcIjogQXJyYXkuZnJvbSh0aGlzLm1lc3NhZ2UudmFsdWVzKCkpLFxuICAgICAgICAgICAgXCJncm91cFwiOiB0aGlzLmdyb3VwLFxuICAgICAgICAgICAgXCJ0aW1lc3RhbXBcIjoge1xuICAgICAgICAgICAgICAgIFwidWlkXCI6IHRoaXMudGltZXN0YW1wLnVpZCxcbiAgICAgICAgICAgICAgICBcInZlY3Rvck1hcFwiOiBBcnJheS5mcm9tKHRoaXMudGltZXN0YW1wLnZlY3Rvck1hcC5lbnRyaWVzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMubXlNZXNzYWdlID0gbXlNZXNzYWdlO1xuLyoqXG4gKiBXZWJTb2NrZXROZXR3b3JrOlxuICpcbiAqIFByb2Nlc3MgaW5pdGlhbGl6YXRpb24gd2hlbiBzdGFydGluZyBhIG5ldyB1c2VyIG5vZGUuXG4gKlxuICogQ29tbXVuaWNhdGUgd2l0aCBDUkRUJ3MgcnVudGltZSBhbmQgc2VuZC9yZWNlaXZlIG1lc3NhZ2UgdmlhXG4gKiBjZW50cmFsIGJyb2FkY2FzdCBzZXJ2ZXIgd2l0aCBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gKlxuICogUGVyZm9ybSBjYXN1YWxpdHkgY2hlY2sgdG8gZW5zdXJlIG1lc3NhZ2Ugb3JkZXJpbmcuXG4gKi9cbmNsYXNzIFdlYlNvY2tldE5ldHdvcmsge1xuICAgIGNvbnN0cnVjdG9yKHJlcGxpY2FJZCwgd2ViU29ja2V0QXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgdGhlIHNlbmQgbWVzc2FnZSBidWZmZXIgaGFzIGFueSBtZXNzYWdlIHdhaXRpbmcgdG8gYmUgc2VudC5cbiAgICAgICAgICogSWYgdGhlcmUgZXhpc3QsIHRoZW4gc2VuZCBpdCB2aWEgV2ViU29ja2V0IGFuZCByZW1vdmUgdGhlIGl0ZW0gZnJvbSBidWZmZXIuXG4gICAgICAgICAqIElmIG5vdCwgdGhlbiB3YWl0IGEgY3VzdG9taXplZCB0aW1lIHBlcmlvZCBhbmQgY2hlY2sgYWdhaW4uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlbmRBY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZCh0aGlzLnNlbmRCdWZmZXJbaW5kZXhdLnRvSlNPTigpKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAvLyBVc2UgaGVhcnRiZWF0IHRvIGtlZXAgY2xpZW50IGFsaXZlLlxuICAgICAgICAgICAgLy8gdGhpcy5oZWFydGJlYXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9rZSBoZWFydGJlYXQgZnVuY3Rpb24gdG8ga2VlcCBjbGllbnRzIGFsaXZlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUT0RPOlxuICAgICAgICAgKiBUaGUgbWVzc2FnZSBzZW5kaW5nIHRvIHNlcnZlciBpcyAnaGVhcnRiZWF0JyByaWdodCBub3cuXG4gICAgICAgICAqIFRoZSB0aW1lb3V0IGludGVydmFsIGlzIHNldCB0byA1MDAwIG1pbGxpb25zZWNvbmRzLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gaGVhcnRiZWF0KCkgOiB2b2lkIHtcbiAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMud3Muc2VuZCgnaGVhcnRiZWF0Jyk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5oZWFydGJlYXQoKTtcbiAgICAgICAgLy8gICAgIH0sIDUwMDApO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYXJzZSBKU09OIGZvcm1hdCBkYXRhIGJhY2sgaW50byBteU1lc3NhZ2UgdHlwZS5cbiAgICAgICAgICogUHVzaCB0aGUgbWVzc2FnZSBpbnRvIHJlY2VpdmVkIG1lc3NhZ2UgYnVmZmVyLlxuICAgICAgICAgKiBDaGVjayB0aGUgY2FzdWFsaXR5IG9mIGFsbCB0aGUgbWVzc2FnZXMgYW5kIGRlbGl2ZXIgdG8gYXBwbGljYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHRoZSBKU09OIGZvcm1hdCBkYXRhIHNlbmQgdmlhIG5ldHdvcmtcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVjZWl2ZUFjdGlvbiA9IChkYXRhKSA9PiB7XG4gICAgICAgICAgICBsZXQgbXlQYWNrYWdlID0gdGhpcy5wYXJzZUpTT04oZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUJ1ZmZlci5wdXNoKFtteVBhY2thZ2UubWVzc2FnZSwgbXlQYWNrYWdlLmdyb3VwLCBteVBhY2thZ2UudGltZXN0YW1wXSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTWVzc2FnZUJ1ZmZlcigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVpZCA9IHJlcGxpY2FJZDtcbiAgICAgICAgdGhpcy52Y01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aXRoIHNlcnZlci5cbiAgICAgICAgICogUmVnaXN0ZXIgRXZlbnRMaXN0ZW5lciB3aXRoIGNvcnJlc3BvbmRpbmcgZXZlbnQgaGFuZGxlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldEFyZ3MpO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCB0aGlzLnNlbmRBY3Rpb24pO1xuICAgICAgICB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLnJlY2VpdmVBY3Rpb24pO1xuICAgICAgICAvLyB0aGlzLndzLmFkZEV2ZW50TGlzdGVuZXIoJ3BpbmcnLCBmdW5jdGlvbihwaW5nTWVzc2FnZSl7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnUmVjZWl2ZSBhIHBpbmcgOiAnICsgcGluZ01lc3NhZ2UpO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IHRoZSBmdW5jdGlvbiBkZWZpbmVkIGluIENyZHRSdW50aW1lIGludGVyZmFjZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGlzIHJlcGxpY2EncyBpZCwgdXNlZCBieSBzb21lIENSRFRzIGludGVybmFsbHlcbiAgICAgKiAoZS5nLiwgdG8gZ2VuZXJhdGUgdW5pcXVlIGlkZW50aWZpZXJzIG9mIHRoZSBmb3JtIChyZXBsaWNhIGlkLCBjb3VudGVyKSkuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRSZXBsaWNhSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgQ3JkdFJ1bnRpbWUgQ2FzdWFsQnJvYWRjYXN0TmV0d29yay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjcmR0UnVudGltZVxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGNyZHRSdW50aW1lKSB7XG4gICAgICAgIHRoaXMuY3JkdFJ1bnRpbWUgPSBjcmR0UnVudGltZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBmdW5jdGlvbiBvbiBjYXN1YWxicm9hZGNhc3QgbmV0d29yayBsYXllciwgd2hpY2ggY2FsbGVkXG4gICAgICogYnkgY3JkdCdzIHJ1bnRpbWUgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbWVzc2FnZSBpcyB3cmFwcGVkIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdGltZXN0YW1wIChiYXNpYyBzZW5kZXIgbm9kZVxuICAgICAqIGluZm8gYW5kIHZlY3RvciBjbG9jaykuXG4gICAgICpcbiAgICAgKiBVc2luZyBXZWJTb2NrZXQgYXMgbmV0d29yayB0cmFuc21pc3Npb24gcHJvdG9jb2wuXG4gICAgICogVXNpbmcgSlNPTiBmb3JtYXQgYXMgbWVzc2FnZSB0eXBlLlxuICAgICAqXG4gICAgICogSWYgdGhlIFdlYlNvY2tldCBSZWFkeXN0YXRlIGlzIG5vdCBPcGVuLCB0aGVuIGJ1ZmZlciB0aGUgbWVzc2FnZSBhbmRcbiAgICAgKiB3YWl0IHVudGlsIFdlYlNvY2tldCBvcGVuLlxuICAgICAqIElmIHRoZSBXZWJTb2NrZXQgUmVhZHlzdGF0ZSBpcyBPcGVuLCB0aGVuIHNlbmQgaXQgd2l0aCB3cy5zZW5kKCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JvdXAgQW4gaWRlbnRpZmllciBmb3IgdGhlIGdyb3VwIHRoYXRcbiAgICAgKiB0aGlzIG1lc3NhZ2Ugc2hvdWxkIGJlIGJyb2FkY2FzdCB0by4gIEEgZ3JvdXBcbiAgICAgKiBlbmNvbXBhc3NlcyBib3RoIGEgc2V0IG9mIHJlcGxpY2FzIGFuZCBhIHVuaXRcbiAgICAgKiBvZiBjYXVzYWwgY29uc2lzdGVuY3ksIGkuZS4sIG1lc3NhZ2VzIHNob3VsZFxuICAgICAqIGJlIGNhdXNhbGx5IGNvbnNpc3RlbnQgd2l0aGluIGEgZ3JvdXAgYnV0IG5lZWRcbiAgICAgKiBub3QgYmUgYWNyb3NzIGdyb3Vwcy5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAgICogQHBhcmFtIHRpbWVzdGFtcCBUaGUgQ2F1c2FsVGltZXN0YW1wIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIGxhc3QgY2FsbCB0byBnZXROZXh0VGltZXN0YW1wKGdyb3VwKS5cbiAgICAgKi9cbiAgICBzZW5kKGdyb3VwLCBtZXNzYWdlLCB0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IHZjID0gdGltZXN0YW1wO1xuICAgICAgICB0aGlzLnZjTWFwLnNldChncm91cCwgdmMpO1xuICAgICAgICBsZXQgbXlQYWNrYWdlID0gbmV3IG15TWVzc2FnZShtZXNzYWdlLCBncm91cCwgdmMpO1xuICAgICAgICAvLyBDb252ZXJ0IHRoZSBtZXNzYWdlIGludG8gSlNPTlxuICAgICAgICBpZiAodGhpcy53cy5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndzLnNlbmQobXlQYWNrYWdlLnRvSlNPTigpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKG15UGFja2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuZXh0IHRpbWVzdGFtcCBvZiB0aGUgZ2l2ZW4gY3JkdElkIGluIHRoaXMgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgcGFzc2VkIHRvIENyZHRJbnRlcm5hbC5lZmZlY3Qgd2hlbiBhIHJlcGxpY2EgcHJvY2Vzc2VzIGl0cyBvd25cbiAgICAgKiBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNyZHRJZCB0aGUgY3JkdElkIHRoYXQgd291bGQgbGlrZSB0byByZXR1cm4uXG4gICAgICogQHJldHVybnMgVGhlIHRpbWVzdGFtcCB0aGF0IHdvdWxkIGJlIGFzc2lnbmVkIHRvIGEgQ1JEVFxuICAgICAqIG1lc3NhZ2Ugc2VudCBieSB0aGlzIHJlcGxpY2EgYW5kIGdpdmVuIGNyZHRJZCByaWdodCBub3cuXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXROZXh0VGltZXN0YW1wKGdyb3VwKSB7XG4gICAgICAgIC8vIENvcHkgYSBuZXcgdmVjdG9yIGNsb2NrLlxuICAgICAgICBsZXQgdmMgPSB0aGlzLnZjTWFwLmdldChncm91cCk7XG4gICAgICAgIGlmICghdmMpIHtcbiAgICAgICAgICAgIHZjID0gbmV3IF8xLlZlY3RvckNsb2NrKHRoaXMudWlkLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGdyb3VwLCB2Yyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZjQ29weSA9IG5ldyBfMS5WZWN0b3JDbG9jayh0aGlzLnVpZCwgdHJ1ZSk7XG4gICAgICAgIHZjQ29weS52ZWN0b3JNYXAgPSBuZXcgTWFwKHZjLmFzVmVjdG9yQ2xvY2soKSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdGltZXN0YW1wIG9mIHRoaXMgcmVwbGljYSB3aXRoIG5leHQgdmFsdWUuXG4gICAgICAgIHZjQ29weS5pbmNyZW1lbnQoKTtcbiAgICAgICAgcmV0dXJuIHZjQ29weTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGFyc2UgSlNPTiBmb3JtYXQgZGF0YSBiYWNrIHRvIGN1c3RvbWl6ZWQgZGF0YSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIEpTT04gZm9ybWF0IGRhdGEgdHJhdmVsIHRocm91Z2ggbmV0d29yay5cbiAgICAgKiBAcmV0dXJucyB0aGUgY3VzdG9taXplZCBkYXRhIHR5cGUgPT4gbXlNZXNzYWdlXG4gICAgICovXG4gICAgcGFyc2VKU09OKGRhdGEpIHtcbiAgICAgICAgbGV0IGRhdGFKU09OID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgbGV0IHZjID0gbmV3IF8xLlZlY3RvckNsb2NrKGRhdGFKU09OLnRpbWVzdGFtcC51aWQsIHRoaXMudWlkID09PSBkYXRhSlNPTi50aW1lc3RhbXAudWlkKTtcbiAgICAgICAgdmMudmVjdG9yTWFwID0gbmV3IE1hcChkYXRhSlNPTi50aW1lc3RhbXAudmVjdG9yTWFwKTtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBVaW50OEFycmF5LmZyb20oZGF0YUpTT04ubWVzc2FnZSk7XG4gICAgICAgIGxldCBteVBhY2thZ2UgPSBuZXcgbXlNZXNzYWdlKG1lc3NhZ2UsIGRhdGFKU09OLmdyb3VwLCB2Yyk7XG4gICAgICAgIHJldHVybiBteVBhY2thZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSBjYXN1YWxpdHkgb2YgYnVmZmVyZWQgbWVzc2FnZXMgYW5kIGRlbGl2ZXJ5IHRoZVxuICAgICAqIG1lc3NhZ2VzIGJhY2sgdG8gY3JkdE1lc3NhZ2VMaXN0ZW5lciB3aGljaCBhcmUgcmVhZHkuXG4gICAgICpcbiAgICAgKiBUaGUgY2hlY2tpbmcgb3JkZXIgaXMgZnJvbSB0aGUgbGFzdGVzdCB0byB0aGUgb2xkZXN0LlxuICAgICAqIFVwZGF0ZSB0aGUgVmVjdG9yQ2xvY2sgZW50cnkgYW5kIE1lc3NhZ2VCdWZmZXIgd2hlbiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBTZW5kIHRoZSBtZXNzYWdlIGJhY2sgdG8gY3JkdFJ1bnRpbWUgd2l0aCBjb3JyZXNwb25kaW5nXG4gICAgICogY3JkdE1lc3NhZ2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBjaGVja01lc3NhZ2VCdWZmZXIoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubWVzc2FnZUJ1ZmZlci5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5tZXNzYWdlQnVmZmVyW2luZGV4XVsxXTtcbiAgICAgICAgICAgIGxldCBjdXJWZWN0b3JDbG9jayA9IHRoaXMubWVzc2FnZUJ1ZmZlcltpbmRleF1bMl07XG4gICAgICAgICAgICBsZXQgbXlWZWN0b3JDbG9jayA9IHRoaXMudmNNYXAuZ2V0KGdyb3VwKTtcbiAgICAgICAgICAgIGlmICghbXlWZWN0b3JDbG9jaykge1xuICAgICAgICAgICAgICAgIG15VmVjdG9yQ2xvY2sgPSBuZXcgXzEuVmVjdG9yQ2xvY2sodGhpcy51aWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudmNNYXAuc2V0KGdyb3VwLCBteVZlY3RvckNsb2NrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteVZlY3RvckNsb2NrLmlzcmVhZHkoY3VyVmVjdG9yQ2xvY2spKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogU2VuZCBiYWNrIHRoZSByZWNlaXZlZCBtZXNzYWdlcyB0byBjcmR0UnVudGltZS5cblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuY3JkdFJ1bnRpbWUucmVjZWl2ZSh0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzFdLCB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzBdLCB0aGlzLm1lc3NhZ2VCdWZmZXJbaW5kZXhdWzJdKTtcbiAgICAgICAgICAgICAgICBteVZlY3RvckNsb2NrLmluY3JlbWVudFNlbmRlcihjdXJWZWN0b3JDbG9jayk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5XZWJTb2NrZXROZXR3b3JrID0gV2ViU29ja2V0TmV0d29yaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZHRfbmV0d29ya19ydW50aW1lLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9uZXR3b3JrX2ludGVyZmFjZVwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vY3JkdF9uZXR3b3JrX3J1bnRpbWVcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3ZlY3Rvcl9jbG9ja1wiKSwgZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSB2b2lkIDA7XG4vLyBUaGUgdmVjdG9yIGNsb2NrIGRlc2lnbmVkIGZvciBDUkRUIGxpYnJhcnkgYW5kIGNhc3VhbCBicm9hZGNhc3Rpbmdcbi8vIHJ1bnRpbWUgdG8gZW5zdXJlIGNvcnJlY3QgY2F1c2FsaXR5LlxuLyoqXG4gKiBUaGUgdmVjdG9yIGNsb2NrIGNsYXNzIGZvciBlbnN1cmluZyBjYXN1YWxpdHkuXG4gKi9cbmNsYXNzIFZlY3RvckNsb2NrIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSB2ZWN0b3Igd2l0aCByZXBsaWNhJ3Mgb3duIGVudHJ5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcGxpY2FJZCwgbG9jYWwpIHtcbiAgICAgICAgdGhpcy51aWQgPSByZXBsaWNhSWQ7XG4gICAgICAgIHRoaXMubG9jYWwgPSBsb2NhbDtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudmVjdG9yTWFwLnNldCh0aGlzLnVpZCwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVwbGljYShyZXBsaWNhSWQpLlxuICAgICAqL1xuICAgIGdldFNlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cbiAgICBpc0xvY2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdGhlIHZlY3RvciBjbG9jayB3aXRoIGFsbCB0aGUgZW50cmllcy5cbiAgICAgKi9cbiAgICBhc1ZlY3RvckNsb2NrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB2aXNpYmxlIG51bWJlciBvZiB0aGUgY291bnRlciBmcm9tIHNlbmRlciBpblxuICAgICAqIHRoaXMgdmVjdG9yY2xvY2suXG4gICAgICovXG4gICAgZ2V0U2VuZGVyQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yTWFwLmdldCh0aGlzLnVpZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgcmVwbGljYXMgaW52b3ZsZWQgaW4gdGhpcyBjcmR0cy5cbiAgICAgKi9cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3JNYXAuc2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2ZWN0b3Igb2YgdGhlIHVpZChyZXBsaWNhSWQpIGVudHJ5LlxuICAgICAqL1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnZlY3Rvck1hcC5nZXQodGhpcy51aWQpO1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHRoaXMudWlkLCBvbGRWYWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGEgbWVzc2FnZSB3aXRoIGEgY2VydGFpbiB0aW1lc3RhbXAgaXMgcmVhZHkgZm9yIGRlbGl2ZXJ5XG4gICAgICogdG8gZW5zdXJlIGNvcnJlY3QgY2FzdWFsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZjIHRoZSBWZWN0b3JDbG9jayBmcm9tIG90aGVyIHJlcGxpY2EuXG4gICAgICogQHJldHVybnMgdGhlIG1lc3NhZ2UgaXMgcmVhZHkgb3Igbm90LlxuICAgICAqL1xuICAgIGlzcmVhZHkodmMpIHtcbiAgICAgICAgbGV0IG90aGVyVWlkID0gdmMuZ2V0U2VuZGVyKCk7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgaWYgKHRoaXMudmVjdG9yTWFwLmhhcyhvdGhlclVpZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlY3Rvck1hcC5nZXQob3RoZXJVaWQpID09PSBvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpIC0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIG90aGVyVmVjdG9yTWFwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaWQgIT09IG90aGVyVWlkICYmICF0aGlzLnZlY3Rvck1hcC5oYXMoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQgIT09IG90aGVyVWlkICYmICh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpIDwgb3RoZXJWZWN0b3JNYXAuZ2V0KGlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvdGhlclZlY3Rvck1hcC5nZXQob3RoZXJVaWQpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3RoZXJWZWN0b3JNYXAuZ2V0KG90aGVyVWlkKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAhdGhpcy52ZWN0b3JNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkICE9PSBvdGhlclVpZCAmJiAodGhpcy52ZWN0b3JNYXAuZ2V0KGlkKSA8IG90aGVyVmVjdG9yTWFwLmdldChpZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBzZW5kZXIncyBsYXN0ZXN0IGVudHJ5IHJlY2VpdmVkIGluIHRoaXMgVmVjdG9yQ2xvY2tcbiAgICAgKiBpbiB0aGUgcmVwbGljYSdzIG93biB2ZWN0b3JNYXAuXG4gICAgICpcbiAgICAgKiBUaGlzIG9wZXJhdGlvbiBpcyBtYWlubHkgZG9uZSBhZnRlciBjb3JyZWN0bHkgZGVsaXZlciB0aGUgbWVzc2FnZVxuICAgICAqIHdoZW4gaXNSZWFkeSgpIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIGluY3JlbWVudFNlbmRlcih2Yykge1xuICAgICAgICBsZXQgb3RoZXJVaWQgPSB2Yy5nZXRTZW5kZXIoKTtcbiAgICAgICAgbGV0IG90aGVyVmVjdG9yTWFwID0gdmMuYXNWZWN0b3JDbG9jaygpO1xuICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQob3RoZXJVaWQsIG90aGVyVmVjdG9yTWFwLmdldChvdGhlclVpZCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSBjdXJyZW50IFZlY3RvckNsb2NrIHdpdGggdGhlIHZlY3RvciBjbG9jayByZWNldmllZCBmcm9tXG4gICAgICogb3RoZXIgcmVwbGljYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YyB0aGUgVmVjdG9yQ2xvY2sgZnJvbSBvdGhlciByZXBsaWNhLlxuICAgICAqL1xuICAgIG1lcmdlKHZjKSB7XG4gICAgICAgIGxldCBvdGhlclZlY3Rvck1hcCA9IHZjLmFzVmVjdG9yQ2xvY2soKTtcbiAgICAgICAgZm9yIChsZXQgaWQgb2Ygb3RoZXJWZWN0b3JNYXAua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlY3Rvck1hcC5zZXQoaWQsIG90aGVyVmVjdG9yTWFwLmdldChpZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KGlkLCBNYXRoLm1heCh0aGlzLnZlY3Rvck1hcC5nZXQoaWQpLCBvdGhlclZlY3Rvck1hcC5nZXQoaWQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29tZVVpZCB0aGUgcmVwbGljYSdzIHVpZC5cbiAgICAgKiBAcGFyYW0gY2xvY2tWYWx1ZSB0aGUgY2xvY2sgbnVtYmVyIG9mIHRoZSByZXBsaWNhLlxuICAgICAqL1xuICAgIHNldEVudHJ5KHNvbWVVaWQsIGNsb2NrVmFsdWUpIHtcbiAgICAgICAgdGhpcy52ZWN0b3JNYXAuc2V0KHNvbWVVaWQsIGNsb2NrVmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuVmVjdG9yQ2xvY2sgPSBWZWN0b3JDbG9jaztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlY3Rvcl9jbG9jay5qcy5tYXAiLCIvKmVzbGludC1kaXNhYmxlIGJsb2NrLXNjb3BlZC12YXIsIGlkLWxlbmd0aCwgbm8tY29udHJvbC1yZWdleCwgbm8tbWFnaWMtbnVtYmVycywgbm8tcHJvdG90eXBlLWJ1aWx0aW5zLCBuby1yZWRlY2xhcmUsIG5vLXNoYWRvdywgbm8tdmFyLCBzb3J0LXZhcnMqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkcHJvdG9idWYgPSByZXF1aXJlKFwicHJvdG9idWZqcy9taW5pbWFsXCIpO1xuXG4vLyBDb21tb24gYWxpYXNlc1xudmFyICRSZWFkZXIgPSAkcHJvdG9idWYuUmVhZGVyLCAkV3JpdGVyID0gJHByb3RvYnVmLldyaXRlciwgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcblxuLy8gRXhwb3J0ZWQgcm9vdCBuYW1lc3BhY2VcbnZhciAkcm9vdCA9ICRwcm90b2J1Zi5yb290c1tcImRlZmF1bHRcIl0gfHwgKCRwcm90b2J1Zi5yb290c1tcImRlZmF1bHRcIl0gPSB7fSk7XG5cbiRyb290LkNyZHRSdW50aW1lTWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBDcmR0UnVudGltZU1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUNyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSUNyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0gaW5uZXJNZXNzYWdlIENyZHRSdW50aW1lTWVzc2FnZSBpbm5lck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fG51bGx9IFtwYXRoVG9Sb290XSBDcmR0UnVudGltZU1lc3NhZ2UgcGF0aFRvUm9vdFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBDcmR0UnVudGltZU1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQGNsYXNzZGVzYyBSZXByZXNlbnRzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlLlxuICAgICAqIEBpbXBsZW1lbnRzIElDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lDcmR0UnVudGltZU1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDcmR0UnVudGltZU1lc3NhZ2UocHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmR0UnVudGltZU1lc3NhZ2UgaW5uZXJNZXNzYWdlLlxuICAgICAqIEBtZW1iZXIge1VpbnQ4QXJyYXl9IGlubmVyTWVzc2FnZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UucHJvdG90eXBlLmlubmVyTWVzc2FnZSA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmR0UnVudGltZU1lc3NhZ2UgcGF0aFRvUm9vdC5cbiAgICAgKiBAbWVtYmVyIHtBcnJheS48c3RyaW5nPn0gcGF0aFRvUm9vdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UucHJvdG90eXBlLnBhdGhUb1Jvb3QgPSAkdXRpbC5lbXB0eUFycmF5O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBDcmR0UnVudGltZU1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUNyZHRSdW50aW1lTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtDcmR0UnVudGltZU1lc3NhZ2V9IENyZHRSdW50aW1lTWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IENyZHRSdW50aW1lTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBDcmR0UnVudGltZU1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ3JkdFJ1bnRpbWVNZXNzYWdlfSBtZXNzYWdlIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDIgPSovMTApLmJ5dGVzKG1lc3NhZ2UuaW5uZXJNZXNzYWdlKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGgpXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2UucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDIsIHdpcmVUeXBlIDIgPSovMTgpLnN0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENyZHRSdW50aW1lTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDcmR0UnVudGltZU1lc3NhZ2V9IG1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENyZHRSdW50aW1lTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ3JkdFJ1bnRpbWVNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlubmVyTWVzc2FnZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmICghKG1lc3NhZ2UucGF0aFRvUm9vdCAmJiBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290ID0gW107XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5wYXRoVG9Sb290LnB1c2gocmVhZGVyLnN0cmluZygpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVhZGVyLnNraXBUeXBlKHRhZyAmIDcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWVzc2FnZS5oYXNPd25Qcm9wZXJ0eShcImlubmVyTWVzc2FnZVwiKSlcbiAgICAgICAgICAgIHRocm93ICR1dGlsLlByb3RvY29sRXJyb3IoXCJtaXNzaW5nIHJlcXVpcmVkICdpbm5lck1lc3NhZ2UnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIsIGxlbmd0aCBkZWxpbWl0ZWQuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge0NyZHRSdW50aW1lTWVzc2FnZX0gQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gbWVzc2FnZSBQbGFpbiBvYmplY3QgdG8gdmVyaWZ5XG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfSBgbnVsbGAgaWYgdmFsaWQsIG90aGVyd2lzZSB0aGUgcmVhc29uIHdoeSBpdCBpcyBub3RcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKCEobWVzc2FnZS5pbm5lck1lc3NhZ2UgJiYgdHlwZW9mIG1lc3NhZ2UuaW5uZXJNZXNzYWdlLmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLmlubmVyTWVzc2FnZSkpKVxuICAgICAgICAgICAgcmV0dXJuIFwiaW5uZXJNZXNzYWdlOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKG1lc3NhZ2UucGF0aFRvUm9vdCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJwYXRoVG9Sb290XCIpKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZS5wYXRoVG9Sb290KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlLnBhdGhUb1Jvb3QubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKCEkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnBhdGhUb1Jvb3RbaV0pKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXRoVG9Sb290OiBzdHJpbmdbXSBleHBlY3RlZFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgQ3JkdFJ1bnRpbWVNZXNzYWdlIG1lc3NhZ2UgZnJvbSBhIHBsYWluIG9iamVjdC4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBpbnRlcm5hbCB0eXBlcy5cbiAgICAgKiBAZnVuY3Rpb24gZnJvbU9iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtDcmR0UnVudGltZU1lc3NhZ2V9IENyZHRSdW50aW1lTWVzc2FnZVxuICAgICAqL1xuICAgIENyZHRSdW50aW1lTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkNyZHRSdW50aW1lTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290LkNyZHRSdW50aW1lTWVzc2FnZSgpO1xuICAgICAgICBpZiAob2JqZWN0LmlubmVyTWVzc2FnZSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QuaW5uZXJNZXNzYWdlID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICR1dGlsLmJhc2U2NC5kZWNvZGUob2JqZWN0LmlubmVyTWVzc2FnZSwgbWVzc2FnZS5pbm5lck1lc3NhZ2UgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QuaW5uZXJNZXNzYWdlKSksIDApO1xuICAgICAgICAgICAgZWxzZSBpZiAob2JqZWN0LmlubmVyTWVzc2FnZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbm5lck1lc3NhZ2UgPSBvYmplY3QuaW5uZXJNZXNzYWdlO1xuICAgICAgICBpZiAob2JqZWN0LnBhdGhUb1Jvb3QpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmplY3QucGF0aFRvUm9vdCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwiLkNyZHRSdW50aW1lTWVzc2FnZS5wYXRoVG9Sb290OiBhcnJheSBleHBlY3RlZFwiKTtcbiAgICAgICAgICAgIG1lc3NhZ2UucGF0aFRvUm9vdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QucGF0aFRvUm9vdC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnBhdGhUb1Jvb3RbaV0gPSBTdHJpbmcob2JqZWN0LnBhdGhUb1Jvb3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBDcmR0UnVudGltZU1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtDcmR0UnVudGltZU1lc3NhZ2V9IG1lc3NhZ2UgQ3JkdFJ1bnRpbWVNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBDcmR0UnVudGltZU1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5hcnJheXMgfHwgb3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290ID0gW107XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QuaW5uZXJNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5pbm5lck1lc3NhZ2UgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LmlubmVyTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGlmIChtZXNzYWdlLmlubmVyTWVzc2FnZSAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJpbm5lck1lc3NhZ2VcIikpXG4gICAgICAgICAgICBvYmplY3QuaW5uZXJNZXNzYWdlID0gb3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nID8gJHV0aWwuYmFzZTY0LmVuY29kZShtZXNzYWdlLmlubmVyTWVzc2FnZSwgMCwgbWVzc2FnZS5pbm5lck1lc3NhZ2UubGVuZ3RoKSA6IG9wdGlvbnMuYnl0ZXMgPT09IEFycmF5ID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZS5pbm5lck1lc3NhZ2UpIDogbWVzc2FnZS5pbm5lck1lc3NhZ2U7XG4gICAgICAgIGlmIChtZXNzYWdlLnBhdGhUb1Jvb3QgJiYgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0LnBhdGhUb1Jvb3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWVzc2FnZS5wYXRoVG9Sb290Lmxlbmd0aDsgKytqKVxuICAgICAgICAgICAgICAgIG9iamVjdC5wYXRoVG9Sb290W2pdID0gbWVzc2FnZS5wYXRoVG9Sb290W2pdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgQ3JkdFJ1bnRpbWVNZXNzYWdlIHRvIEpTT04uXG4gICAgICogQGZ1bmN0aW9uIHRvSlNPTlxuICAgICAqIEBtZW1iZXJvZiBDcmR0UnVudGltZU1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgQ3JkdFJ1bnRpbWVNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ3JkdFJ1bnRpbWVNZXNzYWdlO1xufSkoKTtcblxuJHJvb3QuQ291bnRlck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgQ291bnRlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSUNvdW50ZXJNZXNzYWdlXG4gICAgICogQGludGVyZmFjZSBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdG9BZGQgQ291bnRlck1lc3NhZ2UgdG9BZGRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgQ291bnRlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBDb3VudGVyTWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENvdW50ZXJNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3VudGVyTWVzc2FnZSB0b0FkZC5cbiAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IHRvQWRkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UucHJvdG90eXBlLnRvQWRkID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgQ291bnRlck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ291bnRlck1lc3NhZ2U9fSBbcHJvcGVydGllc10gUHJvcGVydGllcyB0byBzZXRcbiAgICAgKiBAcmV0dXJucyB7Q291bnRlck1lc3NhZ2V9IENvdW50ZXJNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudGVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIENvdW50ZXJNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJQ291bnRlck1lc3NhZ2V9IG1lc3NhZ2UgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDEgPSovOSkuZG91YmxlKG1lc3NhZ2UudG9BZGQpO1xuICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmNvZGVzIHRoZSBzcGVjaWZpZWQgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgQ291bnRlck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lDb3VudGVyTWVzc2FnZX0gbWVzc2FnZSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UuZW5jb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkKG1lc3NhZ2UsIHdyaXRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGUobWVzc2FnZSwgd3JpdGVyKS5sZGVsaW0oKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTWVzc2FnZSBsZW5ndGggaWYga25vd24gYmVmb3JlaGFuZFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShyZWFkZXIsIGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9ICRSZWFkZXIuY3JlYXRlKHJlYWRlcik7XG4gICAgICAgIHZhciBlbmQgPSBsZW5ndGggPT09IHVuZGVmaW5lZCA/IHJlYWRlci5sZW4gOiByZWFkZXIucG9zICsgbGVuZ3RoLCBtZXNzYWdlID0gbmV3ICRyb290LkNvdW50ZXJNZXNzYWdlKCk7XG4gICAgICAgIHdoaWxlIChyZWFkZXIucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdGFnID0gcmVhZGVyLnVpbnQzMigpO1xuICAgICAgICAgICAgc3dpdGNoICh0YWcgPj4+IDMpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRvQWRkID0gcmVhZGVyLmRvdWJsZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9BZGQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIENvdW50ZXJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIENvdW50ZXJNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZS50b0FkZCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRvQWRkOiBudW1iZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBDb3VudGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtDb3VudGVyTWVzc2FnZX0gQ291bnRlck1lc3NhZ2VcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkNvdW50ZXJNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuQ291bnRlck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b0FkZCAhPSBudWxsKVxuICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IE51bWJlcihvYmplY3QudG9BZGQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgQ291bnRlck1lc3NhZ2UgbWVzc2FnZS4gQWxzbyBjb252ZXJ0cyB2YWx1ZXMgdG8gb3RoZXIgdHlwZXMgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBmdW5jdGlvbiB0b09iamVjdFxuICAgICAqIEBtZW1iZXJvZiBDb3VudGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0NvdW50ZXJNZXNzYWdlfSBtZXNzYWdlIENvdW50ZXJNZXNzYWdlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuSUNvbnZlcnNpb25PcHRpb25zfSBbb3B0aW9uc10gQ29udmVyc2lvbiBvcHRpb25zXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBQbGFpbiBvYmplY3RcbiAgICAgKi9cbiAgICBDb3VudGVyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgb2JqZWN0LnRvQWRkID0gMDtcbiAgICAgICAgaWYgKG1lc3NhZ2UudG9BZGQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICBvYmplY3QudG9BZGQgPSBvcHRpb25zLmpzb24gJiYgIWlzRmluaXRlKG1lc3NhZ2UudG9BZGQpID8gU3RyaW5nKG1lc3NhZ2UudG9BZGQpIDogbWVzc2FnZS50b0FkZDtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBDb3VudGVyTWVzc2FnZSB0byBKU09OLlxuICAgICAqIEBmdW5jdGlvbiB0b0pTT05cbiAgICAgKiBAbWVtYmVyb2YgQ291bnRlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgQ291bnRlck1lc3NhZ2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9PYmplY3QodGhpcywgJHByb3RvYnVmLnV0aWwudG9KU09OT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb3VudGVyTWVzc2FnZTtcbn0pKCk7XG5cbiRyb290Lk11bHRSZWdpc3Rlck1lc3NhZ2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIG9mIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnRlcmZhY2UgSU11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdG9NdWx0IE11bHRSZWdpc3Rlck1lc3NhZ2UgdG9NdWx0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IE11bHRSZWdpc3Rlck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSU11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTXVsdFJlZ2lzdGVyTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXVsdFJlZ2lzdGVyTWVzc2FnZSB0b011bHQuXG4gICAgICogQG1lbWJlciB7bnVtYmVyfSB0b011bHRcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UucHJvdG90eXBlLnRvTXVsdCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE11bHRSZWdpc3Rlck1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBmdW5jdGlvbiBjcmVhdGVcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge0lNdWx0UmVnaXN0ZXJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTXVsdFJlZ2lzdGVyTWVzc2FnZShwcm9wZXJ0aWVzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZS4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXVsdFJlZ2lzdGVyTWVzc2FnZX0gbWVzc2FnZSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgaWYgKCF3cml0ZXIpXG4gICAgICAgICAgICB3cml0ZXIgPSAkV3JpdGVyLmNyZWF0ZSgpO1xuICAgICAgICB3cml0ZXIudWludDMyKC8qIGlkIDEsIHdpcmVUeXBlIDEgPSovOSkuZG91YmxlKG1lc3NhZ2UudG9NdWx0KTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXVsdFJlZ2lzdGVyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXVsdFJlZ2lzdGVyTWVzc2FnZX0gbWVzc2FnZSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdWx0UmVnaXN0ZXJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdWx0UmVnaXN0ZXJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b011bHQgPSByZWFkZXIuZG91YmxlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlYWRlci5za2lwVHlwZSh0YWcgJiA3KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b011bHRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9NdWx0J1wiLCB7IGluc3RhbmNlOiBtZXNzYWdlIH0pO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhIE11bHRSZWdpc3Rlck1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UuZGVjb2RlRGVsaW1pdGVkID0gZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkKHJlYWRlcikge1xuICAgICAgICBpZiAoIShyZWFkZXIgaW5zdGFuY2VvZiAkUmVhZGVyKSlcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyAkUmVhZGVyKHJlYWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY29kZShyZWFkZXIsIHJlYWRlci51aW50MzIoKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFZlcmlmaWVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLlxuICAgICAqIEBmdW5jdGlvbiB2ZXJpZnlcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UudmVyaWZ5ID0gZnVuY3Rpb24gdmVyaWZ5KG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSBcIm9iamVjdFwiIHx8IG1lc3NhZ2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gXCJvYmplY3QgZXhwZWN0ZWRcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlLnRvTXVsdCAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIHJldHVybiBcInRvTXVsdDogbnVtYmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXVsdFJlZ2lzdGVyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge011bHRSZWdpc3Rlck1lc3NhZ2V9IE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKi9cbiAgICBNdWx0UmVnaXN0ZXJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuTXVsdFJlZ2lzdGVyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lk11bHRSZWdpc3Rlck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b011bHQgIT0gbnVsbClcbiAgICAgICAgICAgIG1lc3NhZ2UudG9NdWx0ID0gTnVtYmVyKG9iamVjdC50b011bHQpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBsYWluIG9iamVjdCBmcm9tIGEgTXVsdFJlZ2lzdGVyTWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtNdWx0UmVnaXN0ZXJNZXNzYWdlfSBtZXNzYWdlIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIE11bHRSZWdpc3Rlck1lc3NhZ2UudG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdChtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICBpZiAob3B0aW9ucy5kZWZhdWx0cylcbiAgICAgICAgICAgIG9iamVjdC50b011bHQgPSAwO1xuICAgICAgICBpZiAobWVzc2FnZS50b011bHQgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9NdWx0XCIpKVxuICAgICAgICAgICAgb2JqZWN0LnRvTXVsdCA9IG9wdGlvbnMuanNvbiAmJiAhaXNGaW5pdGUobWVzc2FnZS50b011bHQpID8gU3RyaW5nKG1lc3NhZ2UudG9NdWx0KSA6IG1lc3NhZ2UudG9NdWx0O1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIE11bHRSZWdpc3Rlck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIE11bHRSZWdpc3Rlck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgTXVsdFJlZ2lzdGVyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE11bHRSZWdpc3Rlck1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5HU2V0TWVzc2FnZSA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgb2YgYSBHU2V0TWVzc2FnZS5cbiAgICAgKiBAZXhwb3J0cyBJR1NldE1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElHU2V0TWVzc2FnZVxuICAgICAqIEBwcm9wZXJ0eSB7VWludDhBcnJheX0gdG9BZGQgR1NldE1lc3NhZ2UgdG9BZGRcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgR1NldE1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgR1NldE1lc3NhZ2VcbiAgICAgKiBAY2xhc3NkZXNjIFJlcHJlc2VudHMgYSBHU2V0TWVzc2FnZS5cbiAgICAgKiBAaW1wbGVtZW50cyBJR1NldE1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lHU2V0TWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdTZXRNZXNzYWdlKHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllc1trZXlzW2ldXSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleXNbaV1dID0gcHJvcGVydGllc1trZXlzW2ldXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHU2V0TWVzc2FnZSB0b0FkZC5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB0b0FkZFxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnByb3RvdHlwZS50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcihbXSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IEdTZXRNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0dTZXRNZXNzYWdlfSBHU2V0TWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgR1NldE1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBHU2V0TWVzc2FnZSBtZXNzYWdlLiBEb2VzIG5vdCBpbXBsaWNpdGx5IHtAbGluayBHU2V0TWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SUdTZXRNZXNzYWdlfSBtZXNzYWdlIEdTZXRNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5ieXRlcyhtZXNzYWdlLnRvQWRkKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIEdTZXRNZXNzYWdlIG1lc3NhZ2UsIGxlbmd0aCBkZWxpbWl0ZWQuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIEdTZXRNZXNzYWdlLnZlcmlmeXx2ZXJpZnl9IG1lc3NhZ2VzLlxuICAgICAqIEBmdW5jdGlvbiBlbmNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJR1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2UgbWVzc2FnZSBvciBwbGFpbiBvYmplY3QgdG8gZW5jb2RlXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuV3JpdGVyfSBbd3JpdGVyXSBXcml0ZXIgdG8gZW5jb2RlIHRvXG4gICAgICogQHJldHVybnMgeyRwcm90b2J1Zi5Xcml0ZXJ9IFdyaXRlclxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHskcHJvdG9idWYuUmVhZGVyfFVpbnQ4QXJyYXl9IHJlYWRlciBSZWFkZXIgb3IgYnVmZmVyIHRvIGRlY29kZSBmcm9tXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdIE1lc3NhZ2UgbGVuZ3RoIGlmIGtub3duIGJlZm9yZWhhbmRcbiAgICAgKiBAcmV0dXJucyB7R1NldE1lc3NhZ2V9IEdTZXRNZXNzYWdlXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXlsb2FkIGlzIG5vdCBhIHJlYWRlciBvciB2YWxpZCBidWZmZXJcbiAgICAgKiBAdGhyb3dzIHskcHJvdG9idWYudXRpbC5Qcm90b2NvbEVycm9yfSBJZiByZXF1aXJlZCBmaWVsZHMgYXJlIG1pc3NpbmdcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5kZWNvZGUgPSBmdW5jdGlvbiBkZWNvZGUocmVhZGVyLCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSAkUmVhZGVyLmNyZWF0ZShyZWFkZXIpO1xuICAgICAgICB2YXIgZW5kID0gbGVuZ3RoID09PSB1bmRlZmluZWQgPyByZWFkZXIubGVuIDogcmVhZGVyLnBvcyArIGxlbmd0aCwgbWVzc2FnZSA9IG5ldyAkcm9vdC5HU2V0TWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS50b0FkZCA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidG9BZGRcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndG9BZGQnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgR1NldE1lc3NhZ2UgbWVzc2FnZSBmcm9tIHRoZSBzcGVjaWZpZWQgcmVhZGVyIG9yIGJ1ZmZlciwgbGVuZ3RoIGRlbGltaXRlZC5cbiAgICAgKiBAZnVuY3Rpb24gZGVjb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLmRlY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGRlY29kZURlbGltaXRlZChyZWFkZXIpIHtcbiAgICAgICAgaWYgKCEocmVhZGVyIGluc3RhbmNlb2YgJFJlYWRlcikpXG4gICAgICAgICAgICByZWFkZXIgPSBuZXcgJFJlYWRlcihyZWFkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGUocmVhZGVyLCByZWFkZXIudWludDMyKCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBWZXJpZmllcyBhIEdTZXRNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBHU2V0TWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBtZXNzYWdlIFBsYWluIG9iamVjdCB0byB2ZXJpZnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9IGBudWxsYCBpZiB2YWxpZCwgb3RoZXJ3aXNlIHRoZSByZWFzb24gd2h5IGl0IGlzIG5vdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnZlcmlmeSA9IGZ1bmN0aW9uIHZlcmlmeShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJvYmplY3RcIiB8fCBtZXNzYWdlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFwib2JqZWN0IGV4cGVjdGVkXCI7XG4gICAgICAgIGlmICghKG1lc3NhZ2UudG9BZGQgJiYgdHlwZW9mIG1lc3NhZ2UudG9BZGQubGVuZ3RoID09PSBcIm51bWJlclwiIHx8ICR1dGlsLmlzU3RyaW5nKG1lc3NhZ2UudG9BZGQpKSlcbiAgICAgICAgICAgIHJldHVybiBcInRvQWRkOiBidWZmZXIgZXhwZWN0ZWRcIjtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHU2V0TWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgR1NldE1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywqPn0gb2JqZWN0IFBsYWluIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtHU2V0TWVzc2FnZX0gR1NldE1lc3NhZ2VcbiAgICAgKi9cbiAgICBHU2V0TWVzc2FnZS5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mICRyb290LkdTZXRNZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgJHJvb3QuR1NldE1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC50b0FkZCAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QudG9BZGQgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QudG9BZGQsIG1lc3NhZ2UudG9BZGQgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QudG9BZGQpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QudG9BZGQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudG9BZGQgPSBvYmplY3QudG9BZGQ7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBHU2V0TWVzc2FnZSBtZXNzYWdlLiBBbHNvIGNvbnZlcnRzIHZhbHVlcyB0byBvdGhlciB0eXBlcyBpZiBzcGVjaWZpZWQuXG4gICAgICogQGZ1bmN0aW9uIHRvT2JqZWN0XG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7R1NldE1lc3NhZ2V9IG1lc3NhZ2UgR1NldE1lc3NhZ2VcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5JQ29udmVyc2lvbk9wdGlvbnN9IFtvcHRpb25zXSBDb252ZXJzaW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IFBsYWluIG9iamVjdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24gdG9PYmplY3QobWVzc2FnZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVmYXVsdHMpXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyA9PT0gU3RyaW5nKVxuICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IFwiXCI7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmplY3QudG9BZGQgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ieXRlcyAhPT0gQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC50b0FkZCA9ICR1dGlsLm5ld0J1ZmZlcihvYmplY3QudG9BZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZS50b0FkZCAhPSBudWxsICYmIG1lc3NhZ2UuaGFzT3duUHJvcGVydHkoXCJ0b0FkZFwiKSlcbiAgICAgICAgICAgIG9iamVjdC50b0FkZCA9IG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZyA/ICR1dGlsLmJhc2U2NC5lbmNvZGUobWVzc2FnZS50b0FkZCwgMCwgbWVzc2FnZS50b0FkZC5sZW5ndGgpIDogb3B0aW9ucy5ieXRlcyA9PT0gQXJyYXkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChtZXNzYWdlLnRvQWRkKSA6IG1lc3NhZ2UudG9BZGQ7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgR1NldE1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIEdTZXRNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCo+fSBKU09OIG9iamVjdFxuICAgICAqL1xuICAgIEdTZXRNZXNzYWdlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRvT2JqZWN0KHRoaXMsICRwcm90b2J1Zi51dGlsLnRvSlNPTk9wdGlvbnMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gR1NldE1lc3NhZ2U7XG59KSgpO1xuXG4kcm9vdC5NdnJNZXNzYWdlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyBvZiBhIE12ck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgSU12ck1lc3NhZ2VcbiAgICAgKiBAaW50ZXJmYWNlIElNdnJNZXNzYWdlXG4gICAgICogQHByb3BlcnR5IHtVaW50OEFycmF5fSB2YWx1ZSBNdnJNZXNzYWdlIHZhbHVlXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IE12ck1lc3NhZ2UuXG4gICAgICogQGV4cG9ydHMgTXZyTWVzc2FnZVxuICAgICAqIEBjbGFzc2Rlc2MgUmVwcmVzZW50cyBhIE12ck1lc3NhZ2UuXG4gICAgICogQGltcGxlbWVudHMgSU12ck1lc3NhZ2VcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0lNdnJNZXNzYWdlPX0gW3Byb3BlcnRpZXNdIFByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgZnVuY3Rpb24gTXZyTWVzc2FnZShwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXNba2V5c1tpXV0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXlzW2ldXSA9IHByb3BlcnRpZXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXZyTWVzc2FnZSB2YWx1ZS5cbiAgICAgKiBAbWVtYmVyIHtVaW50OEFycmF5fSB2YWx1ZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5wcm90b3R5cGUudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoW10pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNdnJNZXNzYWdlIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICAgKiBAZnVuY3Rpb24gY3JlYXRlXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZT19IFtwcm9wZXJ0aWVzXSBQcm9wZXJ0aWVzIHRvIHNldFxuICAgICAqIEByZXR1cm5zIHtNdnJNZXNzYWdlfSBNdnJNZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUocHJvcGVydGllcykge1xuICAgICAgICByZXR1cm4gbmV3IE12ck1lc3NhZ2UocHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuY29kZXMgdGhlIHNwZWNpZmllZCBNdnJNZXNzYWdlIG1lc3NhZ2UuIERvZXMgbm90IGltcGxpY2l0bHkge0BsaW5rIE12ck1lc3NhZ2UudmVyaWZ5fHZlcmlmeX0gbWVzc2FnZXMuXG4gICAgICogQGZ1bmN0aW9uIGVuY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7SU12ck1lc3NhZ2V9IG1lc3NhZ2UgTXZyTWVzc2FnZSBtZXNzYWdlIG9yIHBsYWluIG9iamVjdCB0byBlbmNvZGVcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5Xcml0ZXJ9IFt3cml0ZXJdIFdyaXRlciB0byBlbmNvZGUgdG9cbiAgICAgKiBAcmV0dXJucyB7JHByb3RvYnVmLldyaXRlcn0gV3JpdGVyXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUobWVzc2FnZSwgd3JpdGVyKSB7XG4gICAgICAgIGlmICghd3JpdGVyKVxuICAgICAgICAgICAgd3JpdGVyID0gJFdyaXRlci5jcmVhdGUoKTtcbiAgICAgICAgd3JpdGVyLnVpbnQzMigvKiBpZCAxLCB3aXJlVHlwZSAyID0qLzEwKS5ieXRlcyhtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5jb2RlcyB0aGUgc3BlY2lmaWVkIE12ck1lc3NhZ2UgbWVzc2FnZSwgbGVuZ3RoIGRlbGltaXRlZC4gRG9lcyBub3QgaW1wbGljaXRseSB7QGxpbmsgTXZyTWVzc2FnZS52ZXJpZnl8dmVyaWZ5fSBtZXNzYWdlcy5cbiAgICAgKiBAZnVuY3Rpb24gZW5jb2RlRGVsaW1pdGVkXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtJTXZyTWVzc2FnZX0gbWVzc2FnZSBNdnJNZXNzYWdlIG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0IHRvIGVuY29kZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLldyaXRlcn0gW3dyaXRlcl0gV3JpdGVyIHRvIGVuY29kZSB0b1xuICAgICAqIEByZXR1cm5zIHskcHJvdG9idWYuV3JpdGVyfSBXcml0ZXJcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmVuY29kZURlbGltaXRlZCA9IGZ1bmN0aW9uIGVuY29kZURlbGltaXRlZChtZXNzYWdlLCB3cml0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlKG1lc3NhZ2UsIHdyaXRlcikubGRlbGltKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UgZnJvbSB0aGUgc3BlY2lmaWVkIHJlYWRlciBvciBidWZmZXIuXG4gICAgICogQGZ1bmN0aW9uIGRlY29kZVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLlJlYWRlcnxVaW50OEFycmF5fSByZWFkZXIgUmVhZGVyIG9yIGJ1ZmZlciB0byBkZWNvZGUgZnJvbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoXSBNZXNzYWdlIGxlbmd0aCBpZiBrbm93biBiZWZvcmVoYW5kXG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2VcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHBheWxvYWQgaXMgbm90IGEgcmVhZGVyIG9yIHZhbGlkIGJ1ZmZlclxuICAgICAqIEB0aHJvd3MgeyRwcm90b2J1Zi51dGlsLlByb3RvY29sRXJyb3J9IElmIHJlcXVpcmVkIGZpZWxkcyBhcmUgbWlzc2luZ1xuICAgICAqL1xuICAgIE12ck1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHJlYWRlciwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gJFJlYWRlci5jcmVhdGUocmVhZGVyKTtcbiAgICAgICAgdmFyIGVuZCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gcmVhZGVyLmxlbiA6IHJlYWRlci5wb3MgKyBsZW5ndGgsIG1lc3NhZ2UgPSBuZXcgJHJvb3QuTXZyTWVzc2FnZSgpO1xuICAgICAgICB3aGlsZSAocmVhZGVyLnBvcyA8IGVuZCkge1xuICAgICAgICAgICAgdmFyIHRhZyA9IHJlYWRlci51aW50MzIoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGFnID4+PiAzKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWVzc2FnZS52YWx1ZSA9IHJlYWRlci5ieXRlcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWFkZXIuc2tpcFR5cGUodGFnICYgNyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICB0aHJvdyAkdXRpbC5Qcm90b2NvbEVycm9yKFwibWlzc2luZyByZXF1aXJlZCAndmFsdWUnXCIsIHsgaW5zdGFuY2U6IG1lc3NhZ2UgfSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGEgTXZyTWVzc2FnZSBtZXNzYWdlIGZyb20gdGhlIHNwZWNpZmllZCByZWFkZXIgb3IgYnVmZmVyLCBsZW5ndGggZGVsaW1pdGVkLlxuICAgICAqIEBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWRcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0geyRwcm90b2J1Zi5SZWFkZXJ8VWludDhBcnJheX0gcmVhZGVyIFJlYWRlciBvciBidWZmZXIgdG8gZGVjb2RlIGZyb21cbiAgICAgKiBAcmV0dXJucyB7TXZyTWVzc2FnZX0gTXZyTWVzc2FnZVxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGF5bG9hZCBpcyBub3QgYSByZWFkZXIgb3IgdmFsaWQgYnVmZmVyXG4gICAgICogQHRocm93cyB7JHByb3RvYnVmLnV0aWwuUHJvdG9jb2xFcnJvcn0gSWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5kZWNvZGVEZWxpbWl0ZWQgPSBmdW5jdGlvbiBkZWNvZGVEZWxpbWl0ZWQocmVhZGVyKSB7XG4gICAgICAgIGlmICghKHJlYWRlciBpbnN0YW5jZW9mICRSZWFkZXIpKVxuICAgICAgICAgICAgcmVhZGVyID0gbmV3ICRSZWFkZXIocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKHJlYWRlciwgcmVhZGVyLnVpbnQzMigpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZpZXMgYSBNdnJNZXNzYWdlIG1lc3NhZ2UuXG4gICAgICogQGZ1bmN0aW9uIHZlcmlmeVxuICAgICAqIEBtZW1iZXJvZiBNdnJNZXNzYWdlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsKj59IG1lc3NhZ2UgUGxhaW4gb2JqZWN0IHRvIHZlcmlmeVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gYG51bGxgIGlmIHZhbGlkLCBvdGhlcndpc2UgdGhlIHJlYXNvbiB3aHkgaXQgaXMgbm90XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS52ZXJpZnkgPSBmdW5jdGlvbiB2ZXJpZnkobWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09IFwib2JqZWN0XCIgfHwgbWVzc2FnZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdCBleHBlY3RlZFwiO1xuICAgICAgICBpZiAoIShtZXNzYWdlLnZhbHVlICYmIHR5cGVvZiBtZXNzYWdlLnZhbHVlLmxlbmd0aCA9PT0gXCJudW1iZXJcIiB8fCAkdXRpbC5pc1N0cmluZyhtZXNzYWdlLnZhbHVlKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJ2YWx1ZTogYnVmZmVyIGV4cGVjdGVkXCI7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTXZyTWVzc2FnZSBtZXNzYWdlIGZyb20gYSBwbGFpbiBvYmplY3QuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgaW50ZXJuYWwgdHlwZXMuXG4gICAgICogQGZ1bmN0aW9uIGZyb21PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBvYmplY3QgUGxhaW4gb2JqZWN0XG4gICAgICogQHJldHVybnMge012ck1lc3NhZ2V9IE12ck1lc3NhZ2VcbiAgICAgKi9cbiAgICBNdnJNZXNzYWdlLmZyb21PYmplY3QgPSBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgJHJvb3QuTXZyTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3ICRyb290Lk12ck1lc3NhZ2UoKTtcbiAgICAgICAgaWYgKG9iamVjdC52YWx1ZSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QudmFsdWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgJHV0aWwuYmFzZTY0LmRlY29kZShvYmplY3QudmFsdWUsIG1lc3NhZ2UudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIoJHV0aWwuYmFzZTY0Lmxlbmd0aChvYmplY3QudmFsdWUpKSwgMCk7XG4gICAgICAgICAgICBlbHNlIGlmIChvYmplY3QudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UudmFsdWUgPSBvYmplY3QudmFsdWU7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGxhaW4gb2JqZWN0IGZyb20gYSBNdnJNZXNzYWdlIG1lc3NhZ2UuIEFsc28gY29udmVydHMgdmFsdWVzIHRvIG90aGVyIHR5cGVzIGlmIHNwZWNpZmllZC5cbiAgICAgKiBAZnVuY3Rpb24gdG9PYmplY3RcbiAgICAgKiBAbWVtYmVyb2YgTXZyTWVzc2FnZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge012ck1lc3NhZ2V9IG1lc3NhZ2UgTXZyTWVzc2FnZVxuICAgICAqIEBwYXJhbSB7JHByb3RvYnVmLklDb252ZXJzaW9uT3B0aW9uc30gW29wdGlvbnNdIENvbnZlcnNpb24gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywqPn0gUGxhaW4gb2JqZWN0XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS50b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKVxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgIGlmIChvcHRpb25zLmRlZmF1bHRzKVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgPT09IFN0cmluZylcbiAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYnl0ZXMgIT09IEFycmF5KVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QudmFsdWUgPSAkdXRpbC5uZXdCdWZmZXIob2JqZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UudmFsdWUgIT0gbnVsbCAmJiBtZXNzYWdlLmhhc093blByb3BlcnR5KFwidmFsdWVcIikpXG4gICAgICAgICAgICBvYmplY3QudmFsdWUgPSBvcHRpb25zLmJ5dGVzID09PSBTdHJpbmcgPyAkdXRpbC5iYXNlNjQuZW5jb2RlKG1lc3NhZ2UudmFsdWUsIDAsIG1lc3NhZ2UudmFsdWUubGVuZ3RoKSA6IG9wdGlvbnMuYnl0ZXMgPT09IEFycmF5ID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZS52YWx1ZSkgOiBtZXNzYWdlLnZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIE12ck1lc3NhZ2UgdG8gSlNPTi5cbiAgICAgKiBAZnVuY3Rpb24gdG9KU09OXG4gICAgICogQG1lbWJlcm9mIE12ck1lc3NhZ2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IEpTT04gb2JqZWN0XG4gICAgICovXG4gICAgTXZyTWVzc2FnZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci50b09iamVjdCh0aGlzLCAkcHJvdG9idWYudXRpbC50b0pTT05PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE12ck1lc3NhZ2U7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICRyb290O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gYXNQcm9taXNlO1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIGFzIHVzZWQgYnkge0BsaW5rIHV0aWwuYXNQcm9taXNlfS5cclxuICogQHR5cGVkZWYgYXNQcm9taXNlQ2FsbGJhY2tcclxuICogQHR5cGUge2Z1bmN0aW9ufVxyXG4gKiBAcGFyYW0ge0Vycm9yfG51bGx9IGVycm9yIEVycm9yLCBpZiBhbnlcclxuICogQHBhcmFtIHsuLi4qfSBwYXJhbXMgQWRkaXRpb25hbCBhcmd1bWVudHNcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIHByb21pc2UgZnJvbSBhIG5vZGUtc3R5bGUgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7YXNQcm9taXNlQ2FsbGJhY2t9IGZuIEZ1bmN0aW9uIHRvIGNhbGxcclxuICogQHBhcmFtIHsqfSBjdHggRnVuY3Rpb24gY29udGV4dFxyXG4gKiBAcGFyYW0gey4uLip9IHBhcmFtcyBGdW5jdGlvbiBhcmd1bWVudHNcclxuICogQHJldHVybnMge1Byb21pc2U8Kj59IFByb21pc2lmaWVkIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBhc1Byb21pc2UoZm4sIGN0eC8qLCB2YXJhcmdzICovKSB7XHJcbiAgICB2YXIgcGFyYW1zICA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSksXHJcbiAgICAgICAgb2Zmc2V0ICA9IDAsXHJcbiAgICAgICAgaW5kZXggICA9IDIsXHJcbiAgICAgICAgcGVuZGluZyA9IHRydWU7XHJcbiAgICB3aGlsZSAoaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoKVxyXG4gICAgICAgIHBhcmFtc1tvZmZzZXQrK10gPSBhcmd1bWVudHNbaW5kZXgrK107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgcGFyYW1zW29mZnNldF0gPSBmdW5jdGlvbiBjYWxsYmFjayhlcnIvKiwgdmFyYXJncyAqLykge1xyXG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBwYXJhbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbb2Zmc2V0KytdID0gYXJndW1lbnRzW29mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZS5hcHBseShudWxsLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmbi5hcHBseShjdHggfHwgbnVsbCwgcGFyYW1zKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBmb3IgbnVtYmVyIGFycmF5cy5cclxuICogQG1lbWJlcm9mIHV0aWxcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIGJhc2U2NCA9IGV4cG9ydHM7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYnl0ZSBsZW5ndGggb2YgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgQmFzZTY0IGVuY29kZWQgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEJ5dGUgbGVuZ3RoXHJcbiAqL1xyXG5iYXNlNjQubGVuZ3RoID0gZnVuY3Rpb24gbGVuZ3RoKHN0cmluZykge1xyXG4gICAgdmFyIHAgPSBzdHJpbmcubGVuZ3RoO1xyXG4gICAgaWYgKCFwKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgdmFyIG4gPSAwO1xyXG4gICAgd2hpbGUgKC0tcCAlIDQgPiAxICYmIHN0cmluZy5jaGFyQXQocCkgPT09IFwiPVwiKVxyXG4gICAgICAgICsrbjtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoc3RyaW5nLmxlbmd0aCAqIDMpIC8gNCAtIG47XHJcbn07XHJcblxyXG4vLyBCYXNlNjQgZW5jb2RpbmcgdGFibGVcclxudmFyIGI2NCA9IG5ldyBBcnJheSg2NCk7XHJcblxyXG4vLyBCYXNlNjQgZGVjb2RpbmcgdGFibGVcclxudmFyIHM2NCA9IG5ldyBBcnJheSgxMjMpO1xyXG5cclxuLy8gNjUuLjkwLCA5Ny4uMTIyLCA0OC4uNTcsIDQzLCA0N1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IDY0OylcclxuICAgIHM2NFtiNjRbaV0gPSBpIDwgMjYgPyBpICsgNjUgOiBpIDwgNTIgPyBpICsgNzEgOiBpIDwgNjIgPyBpIC0gNCA6IGkgLSA1OSB8IDQzXSA9IGkrKztcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGVzIGEgYnVmZmVyIHRvIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2U2NCBlbmNvZGVkIHN0cmluZ1xyXG4gKi9cclxuYmFzZTY0LmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShidWZmZXIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXTtcclxuICAgIHZhciBpID0gMCwgLy8gb3V0cHV0IGluZGV4XHJcbiAgICAgICAgaiA9IDAsIC8vIGdvdG8gaW5kZXhcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB2YXIgYiA9IGJ1ZmZlcltzdGFydCsrXTtcclxuICAgICAgICBzd2l0Y2ggKGopIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY2h1bmtbaSsrXSA9IGI2NFtiID4+IDJdO1xyXG4gICAgICAgICAgICAgICAgdCA9IChiICYgMykgPDwgNDtcclxuICAgICAgICAgICAgICAgIGogPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNF07XHJcbiAgICAgICAgICAgICAgICB0ID0gKGIgJiAxNSkgPDwgMjtcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNodW5rW2krK10gPSBiNjRbdCB8IGIgPj4gNl07XHJcbiAgICAgICAgICAgICAgICBjaHVua1tpKytdID0gYjY0W2IgJiA2M107XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA+IDgxOTEpIHtcclxuICAgICAgICAgICAgKHBhcnRzIHx8IChwYXJ0cyA9IFtdKSkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY2h1bmspKTtcclxuICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGopIHtcclxuICAgICAgICBjaHVua1tpKytdID0gYjY0W3RdO1xyXG4gICAgICAgIGNodW5rW2krK10gPSA2MTtcclxuICAgICAgICBpZiAoaiA9PT0gMSlcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9IDYxO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhcnRzKSB7XHJcbiAgICAgICAgaWYgKGkpXHJcbiAgICAgICAgICAgIHBhcnRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rLnNsaWNlKDAsIGkpKTtcclxufTtcclxuXHJcbnZhciBpbnZhbGlkRW5jb2RpbmcgPSBcImludmFsaWQgZW5jb2RpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGEgYnVmZmVyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFNvdXJjZSBzdHJpbmdcclxuICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXIgRGVzdGluYXRpb24gYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgRGVzdGluYXRpb24gb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE51bWJlciBvZiBieXRlcyB3cml0dGVuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBlbmNvZGluZyBpcyBpbnZhbGlkXHJcbiAqL1xyXG5iYXNlNjQuZGVjb2RlID0gZnVuY3Rpb24gZGVjb2RlKHN0cmluZywgYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgIHZhciBzdGFydCA9IG9mZnNldDtcclxuICAgIHZhciBqID0gMCwgLy8gZ290byBpbmRleFxyXG4gICAgICAgIHQ7ICAgICAvLyB0ZW1wb3JhcnlcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDspIHtcclxuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkrKyk7XHJcbiAgICAgICAgaWYgKGMgPT09IDYxICYmIGogPiAxKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBpZiAoKGMgPSBzNjRbY10pID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICAgICAgc3dpdGNoIChqKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHQgPDwgMiB8IChjICYgNDgpID4+IDQ7XHJcbiAgICAgICAgICAgICAgICB0ID0gYztcclxuICAgICAgICAgICAgICAgIGogPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSAodCAmIDE1KSA8PCA0IHwgKGMgJiA2MCkgPj4gMjtcclxuICAgICAgICAgICAgICAgIHQgPSBjO1xyXG4gICAgICAgICAgICAgICAgaiA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9ICh0ICYgMykgPDwgNiB8IGM7XHJcbiAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChqID09PSAxKVxyXG4gICAgICAgIHRocm93IEVycm9yKGludmFsaWRFbmNvZGluZyk7XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgdGhlIHNwZWNpZmllZCBzdHJpbmcgYXBwZWFycyB0byBiZSBiYXNlNjQgZW5jb2RlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdGVzdFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHByb2JhYmx5IGJhc2U2NCBlbmNvZGVkLCBvdGhlcndpc2UgZmFsc2VcclxuICovXHJcbmJhc2U2NC50ZXN0ID0gZnVuY3Rpb24gdGVzdChzdHJpbmcpIHtcclxuICAgIHJldHVybiAvXig/OltBLVphLXowLTkrL117NH0pKig/OltBLVphLXowLTkrL117Mn09PXxbQS1aYS16MC05Ky9dezN9PSk/JC8udGVzdChzdHJpbmcpO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XHJcblxyXG4vKipcclxuICogQ29uc3RydWN0cyBhIG5ldyBldmVudCBlbWl0dGVyIGluc3RhbmNlLlxyXG4gKiBAY2xhc3NkZXNjIEEgbWluaW1hbCBldmVudCBlbWl0dGVyLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyZWQgbGlzdGVuZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdC48c3RyaW5nLCo+fVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnQgRXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiBMaXN0ZW5lclxyXG4gKiBAcGFyYW0geyp9IFtjdHhdIExpc3RlbmVyIGNvbnRleHRcclxuICogQHJldHVybnMge3V0aWwuRXZlbnRFbWl0dGVyfSBgdGhpc2BcclxuICovXHJcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldnQsIGZuLCBjdHgpIHtcclxuICAgICh0aGlzLl9saXN0ZW5lcnNbZXZ0XSB8fCAodGhpcy5fbGlzdGVuZXJzW2V2dF0gPSBbXSkpLnB1c2goe1xyXG4gICAgICAgIGZuICA6IGZuLFxyXG4gICAgICAgIGN0eCA6IGN0eCB8fCB0aGlzXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgb3IgYW55IG1hdGNoaW5nIGxpc3RlbmVycyBpZiBhcmd1bWVudHMgYXJlIG9taXR0ZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZ0XSBFdmVudCBuYW1lLiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgaWYgb21pdHRlZC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gW2ZuXSBMaXN0ZW5lciB0byByZW1vdmUuIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBgZXZ0YCBpZiBvbWl0dGVkLlxyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYoZXZ0LCBmbikge1xyXG4gICAgaWYgKGV2dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGZuID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldnRdID0gW107XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gPT09IGZuKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXRzIGFuIGV2ZW50IGJ5IGNhbGxpbmcgaXRzIGxpc3RlbmVycyB3aXRoIHRoZSBzcGVjaWZpZWQgYXJndW1lbnRzLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0IEV2ZW50IG5hbWVcclxuICogQHBhcmFtIHsuLi4qfSBhcmdzIEFyZ3VtZW50c1xyXG4gKiBAcmV0dXJucyB7dXRpbC5FdmVudEVtaXR0ZXJ9IGB0aGlzYFxyXG4gKi9cclxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZ0XTtcclxuICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLFxyXG4gICAgICAgICAgICBpID0gMTtcclxuICAgICAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7KVxyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOylcclxuICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpKytdLmN0eCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoZmFjdG9yeSk7XHJcblxyXG4vKipcclxuICogUmVhZHMgLyB3cml0ZXMgZmxvYXRzIC8gZG91YmxlcyBmcm9tIC8gdG8gYnVmZmVycy5cclxuICogQG5hbWUgdXRpbC5mbG9hdFxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdyaXRlcyBhIDMyIGJpdCBmbG9hdCB0byBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQud3JpdGVGbG9hdExFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSAzMiBiaXQgZmxvYXQgdG8gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LndyaXRlRmxvYXRCRVxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCBWYWx1ZSB0byB3cml0ZVxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBUYXJnZXQgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGFyZ2V0IGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge3VuZGVmaW5lZH1cclxuICovXHJcblxyXG4vKipcclxuICogUmVhZHMgYSAzMiBiaXQgZmxvYXQgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZEZsb2F0TEVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFNvdXJjZSBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBTb3VyY2UgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlYWRzIGEgMzIgYml0IGZsb2F0IGZyb20gYSBidWZmZXIgdXNpbmcgYmlnIGVuZGlhbiBieXRlIG9yZGVyLlxyXG4gKiBAbmFtZSB1dGlsLmZsb2F0LnJlYWRGbG9hdEJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGxpdHRsZSBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXcml0ZXMgYSA2NCBiaXQgZG91YmxlIHRvIGEgYnVmZmVyIHVzaW5nIGJpZyBlbmRpYW4gYnl0ZSBvcmRlci5cclxuICogQG5hbWUgdXRpbC5mbG9hdC53cml0ZURvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXHJcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmIFRhcmdldCBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUYXJnZXQgYnVmZmVyIG9mZnNldFxyXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBsaXR0bGUgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUxFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBhIDY0IGJpdCBkb3VibGUgZnJvbSBhIGJ1ZmZlciB1c2luZyBiaWcgZW5kaWFuIGJ5dGUgb3JkZXIuXHJcbiAqIEBuYW1lIHV0aWwuZmxvYXQucmVhZERvdWJsZUJFXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZiBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgU291cmNlIGJ1ZmZlciBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxyXG4gKi9cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb24gZm9yIHRoZSBwdXJwb3NlIG9mIG5vZGUtYmFzZWQgdGVzdGluZyBpbiBtb2RpZmllZCBnbG9iYWwgZW52aXJvbm1lbnRzXHJcbmZ1bmN0aW9uIGZhY3RvcnkoZXhwb3J0cykge1xyXG5cclxuICAgIC8vIGZsb2F0OiB0eXBlZCBhcnJheVxyXG4gICAgaWYgKHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09IFwidW5kZWZpbmVkXCIpIChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGYzMiA9IG5ldyBGbG9hdDMyQXJyYXkoWyAtMCBdKSxcclxuICAgICAgICAgICAgZjhiID0gbmV3IFVpbnQ4QXJyYXkoZjMyLmJ1ZmZlciksXHJcbiAgICAgICAgICAgIGxlICA9IGY4YlszXSA9PT0gMTI4O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB3cml0ZUZsb2F0X2YzMl9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmMzJbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfZjMyX3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGYzMlswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzNdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4YlsxXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRmxvYXRMRSA9IGxlID8gd3JpdGVGbG9hdF9mMzJfY3B5IDogd3JpdGVGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSBsZSA/IHdyaXRlRmxvYXRfZjMyX3JldiA6IHdyaXRlRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEZsb2F0X2YzMl9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsxXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICByZXR1cm4gZjMyWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gbGUgPyByZWFkRmxvYXRfZjMyX2NweSA6IHJlYWRGbG9hdF9mMzJfcmV2O1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRmxvYXRCRSA9IGxlID8gcmVhZEZsb2F0X2YzMl9yZXYgOiByZWFkRmxvYXRfZjMyX2NweTtcclxuXHJcbiAgICAvLyBmbG9hdDogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRmxvYXRfaWVlZTc1NCh3cml0ZVVpbnQsIHZhbCwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSB2YWwgPCAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgIGlmIChzaWduKVxyXG4gICAgICAgICAgICAgICAgdmFsID0gLXZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgxIC8gdmFsID4gMCA/IC8qIHBvc2l0aXZlICovIDAgOiAvKiBuZWdhdGl2ZSAwICovIDIxNDc0ODM2NDgsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4odmFsKSlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQzMjg5MzQ0LCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA+IDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpIC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IDIxMzkwOTUwNDApID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA8IDEuMTc1NDk0MzUwODIyMjg3NWUtMzgpIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoKHNpZ24gPDwgMzEgfCBNYXRoLnJvdW5kKHZhbCAvIDEuNDAxMjk4NDY0MzI0ODE3ZS00NSkpID4+PiAwLCBidWYsIHBvcyk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gTWF0aC5yb3VuZCh2YWwgKiBNYXRoLnBvdygyLCAtZXhwb25lbnQpICogODM4ODYwOCkgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgZXhwb25lbnQgKyAxMjcgPDwgMjMgfCBtYW50aXNzYSkgPj4+IDAsIGJ1ZiwgcG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0TEUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRMRSk7XHJcbiAgICAgICAgZXhwb3J0cy53cml0ZUZsb2F0QkUgPSB3cml0ZUZsb2F0X2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWRGbG9hdF9pZWVlNzU0KHJlYWRVaW50LCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICB2YXIgdWludCA9IHJlYWRVaW50KGJ1ZiwgcG9zKSxcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAodWludCA+PiAzMSkgKiAyICsgMSxcclxuICAgICAgICAgICAgICAgIGV4cG9uZW50ID0gdWludCA+Pj4gMjMgJiAyNTUsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHVpbnQgJiA4Mzg4NjA3O1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDI1NVxyXG4gICAgICAgICAgICAgICAgPyBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgPyBOYU5cclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIEluZmluaXR5XHJcbiAgICAgICAgICAgICAgICA6IGV4cG9uZW50ID09PSAwIC8vIGRlbm9ybWFsXHJcbiAgICAgICAgICAgICAgICA/IHNpZ24gKiAxLjQwMTI5ODQ2NDMyNDgxN2UtNDUgKiBtYW50aXNzYVxyXG4gICAgICAgICAgICAgICAgOiBzaWduICogTWF0aC5wb3coMiwgZXhwb25lbnQgLSAxNTApICogKG1hbnRpc3NhICsgODM4ODYwOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdExFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludExFKTtcclxuICAgICAgICBleHBvcnRzLnJlYWRGbG9hdEJFID0gcmVhZEZsb2F0X2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vIGRvdWJsZTogdHlwZWQgYXJyYXlcclxuICAgIGlmICh0eXBlb2YgRmxvYXQ2NEFycmF5ICE9PSBcInVuZGVmaW5lZFwiKSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBmNjQgPSBuZXcgRmxvYXQ2NEFycmF5KFstMF0pLFxyXG4gICAgICAgICAgICBmOGIgPSBuZXcgVWludDhBcnJheShmNjQuYnVmZmVyKSxcclxuICAgICAgICAgICAgbGUgID0gZjhiWzddID09PSAxMjg7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2Y2NF9jcHkodmFsLCBidWYsIHBvcykge1xyXG4gICAgICAgICAgICBmNjRbMF0gPSB2YWw7XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgICAgXSA9IGY4YlswXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDFdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMl0gPSBmOGJbMl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAzXSA9IGY4YlszXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDRdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNV0gPSBmOGJbNV07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA2XSA9IGY4Yls2XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDddID0gZjhiWzddO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd3JpdGVEb3VibGVfZjY0X3Jldih2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIGY2NFswXSA9IHZhbDtcclxuICAgICAgICAgICAgYnVmW3BvcyAgICBdID0gZjhiWzddO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgMV0gPSBmOGJbNl07XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyAyXSA9IGY4Yls1XTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDNdID0gZjhiWzRdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgNF0gPSBmOGJbM107XHJcbiAgICAgICAgICAgIGJ1Zltwb3MgKyA1XSA9IGY4YlsyXTtcclxuICAgICAgICAgICAgYnVmW3BvcyArIDZdID0gZjhiWzFdO1xyXG4gICAgICAgICAgICBidWZbcG9zICsgN10gPSBmOGJbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVMRSA9IGxlID8gd3JpdGVEb3VibGVfZjY0X2NweSA6IHdyaXRlRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlQkUgPSBsZSA/IHdyaXRlRG91YmxlX2Y2NF9yZXYgOiB3cml0ZURvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9jcHkoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzBdID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbMV0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzNdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbNF0gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzZdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbN10gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZWFkRG91YmxlX2Y2NF9yZXYoYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgZjhiWzddID0gYnVmW3BvcyAgICBdO1xyXG4gICAgICAgICAgICBmOGJbNl0gPSBidWZbcG9zICsgMV07XHJcbiAgICAgICAgICAgIGY4Yls1XSA9IGJ1Zltwb3MgKyAyXTtcclxuICAgICAgICAgICAgZjhiWzRdID0gYnVmW3BvcyArIDNdO1xyXG4gICAgICAgICAgICBmOGJbM10gPSBidWZbcG9zICsgNF07XHJcbiAgICAgICAgICAgIGY4YlsyXSA9IGJ1Zltwb3MgKyA1XTtcclxuICAgICAgICAgICAgZjhiWzFdID0gYnVmW3BvcyArIDZdO1xyXG4gICAgICAgICAgICBmOGJbMF0gPSBidWZbcG9zICsgN107XHJcbiAgICAgICAgICAgIHJldHVybiBmNjRbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gbGUgPyByZWFkRG91YmxlX2Y2NF9jcHkgOiByZWFkRG91YmxlX2Y2NF9yZXY7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICAgICAgICBleHBvcnRzLnJlYWREb3VibGVCRSA9IGxlID8gcmVhZERvdWJsZV9mNjRfcmV2IDogcmVhZERvdWJsZV9mNjRfY3B5O1xyXG5cclxuICAgIC8vIGRvdWJsZTogaWVlZTc1NFxyXG4gICAgfSkoKTsgZWxzZSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlRG91YmxlX2llZWU3NTQod3JpdGVVaW50LCBvZmYwLCBvZmYxLCB2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gdmFsIDwgMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBpZiAoc2lnbilcclxuICAgICAgICAgICAgICAgIHZhbCA9IC12YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KDEgLyB2YWwgPiAwID8gLyogcG9zaXRpdmUgKi8gMCA6IC8qIG5lZ2F0aXZlIDAgKi8gMjE0NzQ4MzY0OCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc05hTih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZVVpbnQoMCwgYnVmLCBwb3MgKyBvZmYwKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgyMTQ2OTU5MzYwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4KSB7IC8vICstSW5maW5pdHlcclxuICAgICAgICAgICAgICAgIHdyaXRlVWludCgwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgMjE0NjQzNTA3MikgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFudGlzc2E7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsIDwgMi4yMjUwNzM4NTg1MDcyMDE0ZS0zMDgpIHsgLy8gZGVub3JtYWxcclxuICAgICAgICAgICAgICAgICAgICBtYW50aXNzYSA9IHZhbCAvIDVlLTMyNDtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgPj4+IDAsIGJ1ZiwgcG9zICsgb2ZmMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVVaW50KChzaWduIDw8IDMxIHwgbWFudGlzc2EgLyA0Mjk0OTY3Mjk2KSA+Pj4gMCwgYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWwpIC8gTWF0aC5MTjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBvbmVudCA9PT0gMTAyNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb25lbnQgPSAxMDIzO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbnRpc3NhID0gdmFsICogTWF0aC5wb3coMiwgLWV4cG9uZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZVVpbnQobWFudGlzc2EgKiA0NTAzNTk5NjI3MzcwNDk2ID4+PiAwLCBidWYsIHBvcyArIG9mZjApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVWludCgoc2lnbiA8PCAzMSB8IGV4cG9uZW50ICsgMTAyMyA8PCAyMCB8IG1hbnRpc3NhICogMTA0ODU3NiAmIDEwNDg1NzUpID4+PiAwLCBidWYsIHBvcyArIG9mZjEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnRzLndyaXRlRG91YmxlTEUgPSB3cml0ZURvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgd3JpdGVVaW50TEUsIDAsIDQpO1xyXG4gICAgICAgIGV4cG9ydHMud3JpdGVEb3VibGVCRSA9IHdyaXRlRG91YmxlX2llZWU3NTQuYmluZChudWxsLCB3cml0ZVVpbnRCRSwgNCwgMCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHJlYWREb3VibGVfaWVlZTc1NChyZWFkVWludCwgb2ZmMCwgb2ZmMSwgYnVmLCBwb3MpIHtcclxuICAgICAgICAgICAgdmFyIGxvID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYwKSxcclxuICAgICAgICAgICAgICAgIGhpID0gcmVhZFVpbnQoYnVmLCBwb3MgKyBvZmYxKTtcclxuICAgICAgICAgICAgdmFyIHNpZ24gPSAoaGkgPj4gMzEpICogMiArIDEsXHJcbiAgICAgICAgICAgICAgICBleHBvbmVudCA9IGhpID4+PiAyMCAmIDIwNDcsXHJcbiAgICAgICAgICAgICAgICBtYW50aXNzYSA9IDQyOTQ5NjcyOTYgKiAoaGkgJiAxMDQ4NTc1KSArIGxvO1xyXG4gICAgICAgICAgICByZXR1cm4gZXhwb25lbnQgPT09IDIwNDdcclxuICAgICAgICAgICAgICAgID8gbWFudGlzc2FcclxuICAgICAgICAgICAgICAgID8gTmFOXHJcbiAgICAgICAgICAgICAgICA6IHNpZ24gKiBJbmZpbml0eVxyXG4gICAgICAgICAgICAgICAgOiBleHBvbmVudCA9PT0gMCAvLyBkZW5vcm1hbFxyXG4gICAgICAgICAgICAgICAgPyBzaWduICogNWUtMzI0ICogbWFudGlzc2FcclxuICAgICAgICAgICAgICAgIDogc2lnbiAqIE1hdGgucG93KDIsIGV4cG9uZW50IC0gMTA3NSkgKiAobWFudGlzc2EgKyA0NTAzNTk5NjI3MzcwNDk2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydHMucmVhZERvdWJsZUxFID0gcmVhZERvdWJsZV9pZWVlNzU0LmJpbmQobnVsbCwgcmVhZFVpbnRMRSwgMCwgNCk7XHJcbiAgICAgICAgZXhwb3J0cy5yZWFkRG91YmxlQkUgPSByZWFkRG91YmxlX2llZWU3NTQuYmluZChudWxsLCByZWFkVWludEJFLCA0LCAwKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBleHBvcnRzO1xyXG59XHJcblxyXG4vLyB1aW50IGhlbHBlcnNcclxuXHJcbmZ1bmN0aW9uIHdyaXRlVWludExFKHZhbCwgYnVmLCBwb3MpIHtcclxuICAgIGJ1Zltwb3MgICAgXSA9ICB2YWwgICAgICAgICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgMl0gPSAgdmFsID4+PiAxNiAmIDI1NTtcclxuICAgIGJ1Zltwb3MgKyAzXSA9ICB2YWwgPj4+IDI0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZVVpbnRCRSh2YWwsIGJ1ZiwgcG9zKSB7XHJcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsID4+PiAyNDtcclxuICAgIGJ1Zltwb3MgKyAxXSA9ICB2YWwgPj4+IDE2ICYgMjU1O1xyXG4gICAgYnVmW3BvcyArIDJdID0gIHZhbCA+Pj4gOCAgJiAyNTU7XHJcbiAgICBidWZbcG9zICsgM10gPSAgdmFsICAgICAgICAmIDI1NTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnRMRShidWYsIHBvcykge1xyXG4gICAgcmV0dXJuIChidWZbcG9zICAgIF1cclxuICAgICAgICAgIHwgYnVmW3BvcyArIDFdIDw8IDhcclxuICAgICAgICAgIHwgYnVmW3BvcyArIDJdIDw8IDE2XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAzXSA8PCAyNCkgPj4+IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50QkUoYnVmLCBwb3MpIHtcclxuICAgIHJldHVybiAoYnVmW3BvcyAgICBdIDw8IDI0XHJcbiAgICAgICAgICB8IGJ1Zltwb3MgKyAxXSA8PCAxNlxyXG4gICAgICAgICAgfCBidWZbcG9zICsgMl0gPDwgOFxyXG4gICAgICAgICAgfCBidWZbcG9zICsgM10pID4+PiAwO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGlucXVpcmU7XHJcblxyXG4vKipcclxuICogUmVxdWlyZXMgYSBtb2R1bGUgb25seSBpZiBhdmFpbGFibGUuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVOYW1lIE1vZHVsZSB0byByZXF1aXJlXHJcbiAqIEByZXR1cm5zIHs/T2JqZWN0fSBSZXF1aXJlZCBtb2R1bGUgaWYgYXZhaWxhYmxlIGFuZCBub3QgZW1wdHksIG90aGVyd2lzZSBgbnVsbGBcclxuICovXHJcbmZ1bmN0aW9uIGlucXVpcmUobW9kdWxlTmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB2YXIgbW9kID0gZXZhbChcInF1aXJlXCIucmVwbGFjZSgvXi8sXCJyZVwiKSkobW9kdWxlTmFtZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxyXG4gICAgICAgIGlmIChtb2QgJiYgKG1vZC5sZW5ndGggfHwgT2JqZWN0LmtleXMobW9kKS5sZW5ndGgpKVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kO1xyXG4gICAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDtcclxuXHJcbi8qKlxyXG4gKiBBbiBhbGxvY2F0b3IgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbEFsbG9jYXRvclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXJcclxuICovXHJcblxyXG4vKipcclxuICogQSBzbGljZXIgYXMgdXNlZCBieSB7QGxpbmsgdXRpbC5wb29sfS5cclxuICogQHR5cGVkZWYgUG9vbFNsaWNlclxyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTdGFydCBvZmZzZXRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgb2Zmc2V0XHJcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fSBCdWZmZXIgc2xpY2VcclxuICogQHRoaXMge1VpbnQ4QXJyYXl9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgZ2VuZXJhbCBwdXJwb3NlIGJ1ZmZlciBwb29sLlxyXG4gKiBAbWVtYmVyb2YgdXRpbFxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtIHtQb29sQWxsb2NhdG9yfSBhbGxvYyBBbGxvY2F0b3JcclxuICogQHBhcmFtIHtQb29sU2xpY2VyfSBzbGljZSBTbGljZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IFtzaXplPTgxOTJdIFNsYWIgc2l6ZVxyXG4gKiBAcmV0dXJucyB7UG9vbEFsbG9jYXRvcn0gUG9vbGVkIGFsbG9jYXRvclxyXG4gKi9cclxuZnVuY3Rpb24gcG9vbChhbGxvYywgc2xpY2UsIHNpemUpIHtcclxuICAgIHZhciBTSVpFICAgPSBzaXplIHx8IDgxOTI7XHJcbiAgICB2YXIgTUFYICAgID0gU0laRSA+Pj4gMTtcclxuICAgIHZhciBzbGFiICAgPSBudWxsO1xyXG4gICAgdmFyIG9mZnNldCA9IFNJWkU7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gcG9vbF9hbGxvYyhzaXplKSB7XHJcbiAgICAgICAgaWYgKHNpemUgPCAxIHx8IHNpemUgPiBNQVgpXHJcbiAgICAgICAgICAgIHJldHVybiBhbGxvYyhzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICsgc2l6ZSA+IFNJWkUpIHtcclxuICAgICAgICAgICAgc2xhYiA9IGFsbG9jKFNJWkUpO1xyXG4gICAgICAgICAgICBvZmZzZXQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmID0gc2xpY2UuY2FsbChzbGFiLCBvZmZzZXQsIG9mZnNldCArPSBzaXplKTtcclxuICAgICAgICBpZiAob2Zmc2V0ICYgNykgLy8gYWxpZ24gdG8gMzIgYml0XHJcbiAgICAgICAgICAgIG9mZnNldCA9IChvZmZzZXQgfCA3KSArIDE7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH07XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKipcclxuICogQSBtaW5pbWFsIFVURjggaW1wbGVtZW50YXRpb24gZm9yIG51bWJlciBhcnJheXMuXHJcbiAqIEBtZW1iZXJvZiB1dGlsXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB1dGY4ID0gZXhwb3J0cztcclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBVVEY4IGJ5dGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFN0cmluZ1xyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBCeXRlIGxlbmd0aFxyXG4gKi9cclxudXRmOC5sZW5ndGggPSBmdW5jdGlvbiB1dGY4X2xlbmd0aChzdHJpbmcpIHtcclxuICAgIHZhciBsZW4gPSAwLFxyXG4gICAgICAgIGMgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaWYgKGMgPCAxMjgpXHJcbiAgICAgICAgICAgIGxlbiArPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKGMgPCAyMDQ4KVxyXG4gICAgICAgICAgICBsZW4gKz0gMjtcclxuICAgICAgICBlbHNlIGlmICgoYyAmIDB4RkMwMCkgPT09IDB4RDgwMCAmJiAoc3RyaW5nLmNoYXJDb2RlQXQoaSArIDEpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgbGVuICs9IDQ7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGxlbiArPSAzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkcyBVVEY4IGJ5dGVzIGFzIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBTb3VyY2UgYnVmZmVyXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBTb3VyY2Ugc3RhcnRcclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBTb3VyY2UgZW5kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZWFkXHJcbiAqL1xyXG51dGY4LnJlYWQgPSBmdW5jdGlvbiB1dGY4X3JlYWQoYnVmZmVyLCBzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XHJcbiAgICBpZiAobGVuIDwgMSlcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciBwYXJ0cyA9IG51bGwsXHJcbiAgICAgICAgY2h1bmsgPSBbXSxcclxuICAgICAgICBpID0gMCwgLy8gY2hhciBvZmZzZXRcclxuICAgICAgICB0OyAgICAgLy8gdGVtcG9yYXJ5XHJcbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcclxuICAgICAgICB0ID0gYnVmZmVyW3N0YXJ0KytdO1xyXG4gICAgICAgIGlmICh0IDwgMTI4KVxyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gdDtcclxuICAgICAgICBlbHNlIGlmICh0ID4gMTkxICYmIHQgPCAyMjQpXHJcbiAgICAgICAgICAgIGNodW5rW2krK10gPSAodCAmIDMxKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgZWxzZSBpZiAodCA+IDIzOSAmJiB0IDwgMzY1KSB7XHJcbiAgICAgICAgICAgIHQgPSAoKHQgJiA3KSA8PCAxOCB8IChidWZmZXJbc3RhcnQrK10gJiA2MykgPDwgMTIgfCAoYnVmZmVyW3N0YXJ0KytdICYgNjMpIDw8IDYgfCBidWZmZXJbc3RhcnQrK10gJiA2MykgLSAweDEwMDAwO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEODAwICsgKHQgPj4gMTApO1xyXG4gICAgICAgICAgICBjaHVua1tpKytdID0gMHhEQzAwICsgKHQgJiAxMDIzKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgY2h1bmtbaSsrXSA9ICh0ICYgMTUpIDw8IDEyIHwgKGJ1ZmZlcltzdGFydCsrXSAmIDYzKSA8PCA2IHwgYnVmZmVyW3N0YXJ0KytdICYgNjM7XHJcbiAgICAgICAgaWYgKGkgPiA4MTkxKSB7XHJcbiAgICAgICAgICAgIChwYXJ0cyB8fCAocGFydHMgPSBbXSkpLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNodW5rKSk7XHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwYXJ0cykge1xyXG4gICAgICAgIGlmIChpKVxyXG4gICAgICAgICAgICBwYXJ0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSkpO1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjaHVuay5zbGljZSgwLCBpKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV3JpdGVzIGEgc3RyaW5nIGFzIFVURjggYnl0ZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU291cmNlIHN0cmluZ1xyXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciBEZXN0aW5hdGlvbiBidWZmZXJcclxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBEZXN0aW5hdGlvbiBvZmZzZXRcclxuICogQHJldHVybnMge251bWJlcn0gQnl0ZXMgd3JpdHRlblxyXG4gKi9cclxudXRmOC53cml0ZSA9IGZ1bmN0aW9uIHV0Zjhfd3JpdGUoc3RyaW5nLCBidWZmZXIsIG9mZnNldCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0LFxyXG4gICAgICAgIGMxLCAvLyBjaGFyYWN0ZXIgMVxyXG4gICAgICAgIGMyOyAvLyBjaGFyYWN0ZXIgMlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBjMSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjMSA8IDEyOCkge1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjMSA8IDIwNDgpIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDYgICAgICAgfCAxOTI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSAgICAgICAmIDYzIHwgMTI4O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKGMxICYgMHhGQzAwKSA9PT0gMHhEODAwICYmICgoYzIgPSBzdHJpbmcuY2hhckNvZGVBdChpICsgMSkpICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7XHJcbiAgICAgICAgICAgIGMxID0gMHgxMDAwMCArICgoYzEgJiAweDAzRkYpIDw8IDEwKSArIChjMiAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDE4ICAgICAgfCAyNDA7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiAxMiAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgPj4gNiAgJiA2MyB8IDEyODtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxICAgICAgICYgNjMgfCAxMjg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IGMxID4+IDEyICAgICAgfCAyMjQ7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSBjMSA+PiA2ICAmIDYzIHwgMTI4O1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gYzEgICAgICAgJiA2MyB8IDEyODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Zmc2V0IC0gc3RhcnQ7XHJcbn07XHJcbiIsIi8vIG1pbmltYWwgbGlicmFyeSBlbnRyeSBwb2ludC5cblxuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3NyYy9pbmRleC1taW5pbWFsXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgcHJvdG9idWYgPSBleHBvcnRzO1xuXG4vKipcbiAqIEJ1aWxkIHR5cGUsIG9uZSBvZiBgXCJmdWxsXCJgLCBgXCJsaWdodFwiYCBvciBgXCJtaW5pbWFsXCJgLlxuICogQG5hbWUgYnVpbGRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAY29uc3RcbiAqL1xucHJvdG9idWYuYnVpbGQgPSBcIm1pbmltYWxcIjtcblxuLy8gU2VyaWFsaXphdGlvblxucHJvdG9idWYuV3JpdGVyICAgICAgID0gcmVxdWlyZShcIi4vd3JpdGVyXCIpO1xucHJvdG9idWYuQnVmZmVyV3JpdGVyID0gcmVxdWlyZShcIi4vd3JpdGVyX2J1ZmZlclwiKTtcbnByb3RvYnVmLlJlYWRlciAgICAgICA9IHJlcXVpcmUoXCIuL3JlYWRlclwiKTtcbnByb3RvYnVmLkJ1ZmZlclJlYWRlciA9IHJlcXVpcmUoXCIuL3JlYWRlcl9idWZmZXJcIik7XG5cbi8vIFV0aWxpdHlcbnByb3RvYnVmLnV0aWwgICAgICAgICA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcbnByb3RvYnVmLnJwYyAgICAgICAgICA9IHJlcXVpcmUoXCIuL3JwY1wiKTtcbnByb3RvYnVmLnJvb3RzICAgICAgICA9IHJlcXVpcmUoXCIuL3Jvb3RzXCIpO1xucHJvdG9idWYuY29uZmlndXJlICAgID0gY29uZmlndXJlO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLyoqXG4gKiBSZWNvbmZpZ3VyZXMgdGhlIGxpYnJhcnkgYWNjb3JkaW5nIHRvIHRoZSBlbnZpcm9ubWVudC5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGNvbmZpZ3VyZSgpIHtcbiAgICBwcm90b2J1Zi51dGlsLl9jb25maWd1cmUoKTtcbiAgICBwcm90b2J1Zi5Xcml0ZXIuX2NvbmZpZ3VyZShwcm90b2J1Zi5CdWZmZXJXcml0ZXIpO1xuICAgIHByb3RvYnVmLlJlYWRlci5fY29uZmlndXJlKHByb3RvYnVmLkJ1ZmZlclJlYWRlcik7XG59XG5cbi8vIFNldCB1cCBidWZmZXIgdXRpbGl0eSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50XG5jb25maWd1cmUoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFkZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJSZWFkZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBpbmRleE91dE9mUmFuZ2UocmVhZGVyLCB3cml0ZUxlbmd0aCkge1xuICAgIHJldHVybiBSYW5nZUVycm9yKFwiaW5kZXggb3V0IG9mIHJhbmdlOiBcIiArIHJlYWRlci5wb3MgKyBcIiArIFwiICsgKHdyaXRlTGVuZ3RoIHx8IDEpICsgXCIgPiBcIiArIHJlYWRlci5sZW4pO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgcmVhZGVyIGluc3RhbmNlIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGNsYXNzZGVzYyBXaXJlIGZvcm1hdCByZWFkZXIgdXNpbmcgYFVpbnQ4QXJyYXlgIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGBBcnJheWAuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnVmZmVyIEJ1ZmZlciB0byByZWFkIGZyb21cbiAqL1xuZnVuY3Rpb24gUmVhZGVyKGJ1ZmZlcikge1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQHR5cGUge1VpbnQ4QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5idWYgPSBidWZmZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGJ1ZmZlciBwb3NpdGlvbi5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMucG9zID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJlYWQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gYnVmZmVyLmxlbmd0aDtcbn1cblxudmFyIGNyZWF0ZV9hcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgPyBmdW5jdGlvbiBjcmVhdGVfdHlwZWRfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVhZGVyKGJ1ZmZlcik7XG4gICAgICAgIHRocm93IEVycm9yKFwiaWxsZWdhbCBidWZmZXJcIik7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiBjcmVhdGVfYXJyYXkoYnVmZmVyKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1ZmZlcikpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlYWRlcihidWZmZXIpO1xuICAgICAgICB0aHJvdyBFcnJvcihcImlsbGVnYWwgYnVmZmVyXCIpO1xuICAgIH07XG5cbnZhciBjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIHV0aWwuQnVmZmVyXG4gICAgICAgID8gZnVuY3Rpb24gY3JlYXRlX2J1ZmZlcl9zZXR1cChidWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoUmVhZGVyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXIoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHV0aWwuQnVmZmVyLmlzQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgQnVmZmVyUmVhZGVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgICAgICAgICAgOiBjcmVhdGVfYXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgIH0pKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiBjcmVhdGVfYXJyYXk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcmVhZGVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgYnVmZmVyLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8QnVmZmVyfSBidWZmZXIgQnVmZmVyIHRvIHJlYWQgZnJvbVxuICogQHJldHVybnMge1JlYWRlcnxCdWZmZXJSZWFkZXJ9IEEge0BsaW5rIEJ1ZmZlclJlYWRlcn0gaWYgYGJ1ZmZlcmAgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBhIHtAbGluayBSZWFkZXJ9XG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYGJ1ZmZlcmAgaXMgbm90IGEgdmFsaWQgYnVmZmVyXG4gKi9cblJlYWRlci5jcmVhdGUgPSBjcmVhdGUoKTtcblxuUmVhZGVyLnByb3RvdHlwZS5fc2xpY2UgPSB1dGlsLkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLkFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS51aW50MzIgPSAoZnVuY3Rpb24gcmVhZF91aW50MzJfc2V0dXAoKSB7XG4gICAgdmFyIHZhbHVlID0gNDI5NDk2NzI5NTsgLy8gb3B0aW1pemVyIHR5cGUtaGludCwgdGVuZHMgdG8gZGVvcHQgb3RoZXJ3aXNlICg/ISlcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVhZF91aW50MzIoKSB7XG4gICAgICAgIHZhbHVlID0gKCAgICAgICAgIHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNyAgICAgICApID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCAgNykgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICB2YWx1ZSA9ICh2YWx1ZSB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDE0KSA+Pj4gMDsgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KSByZXR1cm4gdmFsdWU7XG4gICAgICAgIHZhbHVlID0gKHZhbHVlIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgMjEpID4+PiAwOyBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSAodmFsdWUgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgIDE1KSA8PCAyOCkgPj4+IDA7IGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOCkgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoKHRoaXMucG9zICs9IDUpID4gdGhpcy5sZW4pIHtcbiAgICAgICAgICAgIHRoaXMucG9zID0gdGhpcy5sZW47XG4gICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiByZWFkX2ludDMyKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpIHwgMDtcbn07XG5cbi8qKlxuICogUmVhZHMgYSB6aWctemFnIGVuY29kZWQgdmFyaW50IGFzIGEgc2lnbmVkIDMyIGJpdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiByZWFkX3NpbnQzMigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnVpbnQzMigpO1xuICAgIHJldHVybiB2YWx1ZSA+Pj4gMSBeIC0odmFsdWUgJiAxKSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZExvbmdWYXJpbnQoKSB7XG4gICAgLy8gdGVuZHMgdG8gZGVvcHQgd2l0aCBsb2NhbCB2YXJzIGZvciBvY3RldCBldGMuXG4gICAgdmFyIGJpdHMgPSBuZXcgTG9uZ0JpdHMoMCwgMCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmICh0aGlzLmxlbiAtIHRoaXMucG9zID4gNCkgeyAvLyBmYXN0IHJvdXRlIChsbylcbiAgICAgICAgZm9yICg7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIC8vIDFzdC4uNHRoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNXRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvc10gJiAxMjcpIDw8IDI4KSA+Pj4gMDtcbiAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPj4gIDQpID4+PiAwO1xuICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgaSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDFzdC4uM3RoXG4gICAgICAgICAgICBiaXRzLmxvID0gKGJpdHMubG8gfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNykgPj4+IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5idWZbdGhpcy5wb3MrK10gPCAxMjgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNHRoXG4gICAgICAgIGJpdHMubG8gPSAoYml0cy5sbyB8ICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSAmIDEyNykgPDwgaSAqIDcpID4+PiAwO1xuICAgICAgICByZXR1cm4gYml0cztcbiAgICB9XG4gICAgaWYgKHRoaXMubGVuIC0gdGhpcy5wb3MgPiA0KSB7IC8vIGZhc3Qgcm91dGUgKGhpKVxuICAgICAgICBmb3IgKDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgLy8gNnRoLi4xMHRoXG4gICAgICAgICAgICBiaXRzLmhpID0gKGJpdHMuaGkgfCAodGhpcy5idWZbdGhpcy5wb3NdICYgMTI3KSA8PCBpICogNyArIDMpID4+PiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuYnVmW3RoaXMucG9zKytdIDwgMTI4KVxuICAgICAgICAgICAgICAgIHJldHVybiBiaXRzO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICg7IGkgPCA1OyArK2kpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuKVxuICAgICAgICAgICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzKTtcbiAgICAgICAgICAgIC8vIDZ0aC4uMTB0aFxuICAgICAgICAgICAgYml0cy5oaSA9IChiaXRzLmhpIHwgKHRoaXMuYnVmW3RoaXMucG9zXSAmIDEyNykgPDwgaSAqIDcgKyAzKSA+Pj4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA8IDEyOClcbiAgICAgICAgICAgICAgICByZXR1cm4gYml0cztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHRocm93IEVycm9yKFwiaW52YWxpZCB2YXJpbnQgZW5jb2RpbmdcIik7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI2ludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHZhcmludCBhcyBhbiB1bnNpZ25lZCA2NCBiaXQgdmFsdWUuXG4gKiBAbmFtZSBSZWFkZXIjdWludDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyBhIHppZy16YWcgZW5jb2RlZCB2YXJpbnQgYXMgYSBzaWduZWQgNjQgYml0IHZhbHVlLlxuICogQG5hbWUgUmVhZGVyI3NpbnQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSB2YXJpbnQgYXMgYSBib29sZWFuLlxuICogQHJldHVybnMge2Jvb2xlYW59IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ib29sID0gZnVuY3Rpb24gcmVhZF9ib29sKCkge1xuICAgIHJldHVybiB0aGlzLnVpbnQzMigpICE9PSAwO1xufTtcblxuZnVuY3Rpb24gcmVhZEZpeGVkMzJfZW5kKGJ1ZiwgZW5kKSB7IC8vIG5vdGUgdGhhdCB0aGlzIHVzZXMgYGVuZGAsIG5vdCBgcG9zYFxuICAgIHJldHVybiAoYnVmW2VuZCAtIDRdXG4gICAgICAgICAgfCBidWZbZW5kIC0gM10gPDwgOFxuICAgICAgICAgIHwgYnVmW2VuZCAtIDJdIDw8IDE2XG4gICAgICAgICAgfCBidWZbZW5kIC0gMV0gPDwgMjQpID4+PiAwO1xufVxuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYW4gdW5zaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuZml4ZWQzMiA9IGZ1bmN0aW9uIHJlYWRfZml4ZWQzMigpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgcmV0dXJuIHJlYWRGaXhlZDMyX2VuZCh0aGlzLmJ1ZiwgdGhpcy5wb3MgKz0gNCk7XG59O1xuXG4vKipcbiAqIFJlYWRzIGZpeGVkIDMyIGJpdHMgYXMgYSBzaWduZWQgMzIgYml0IGludGVnZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBWYWx1ZSByZWFkXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2ZpeGVkMzIgPSBmdW5jdGlvbiByZWFkX3NmaXhlZDMyKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgNCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICByZXR1cm4gcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSB8IDA7XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cblxuZnVuY3Rpb24gcmVhZEZpeGVkNjQoLyogdGhpczogUmVhZGVyICovKSB7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodGhpcy5wb3MgKyA4ID4gdGhpcy5sZW4pXG4gICAgICAgIHRocm93IGluZGV4T3V0T2ZSYW5nZSh0aGlzLCA4KTtcblxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMocmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSwgcmVhZEZpeGVkMzJfZW5kKHRoaXMuYnVmLCB0aGlzLnBvcyArPSA0KSk7XG59XG5cbi8qIGVzbGludC1lbmFibGUgbm8taW52YWxpZC10aGlzICovXG5cbi8qKlxuICogUmVhZHMgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNmaXhlZDY0XG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtMb25nfSBWYWx1ZSByZWFkXG4gKi9cblxuLyoqXG4gKiBSZWFkcyB6aWctemFnIGVuY29kZWQgZml4ZWQgNjQgYml0cy5cbiAqIEBuYW1lIFJlYWRlciNzZml4ZWQ2NFxuICogQGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7TG9uZ30gVmFsdWUgcmVhZFxuICovXG5cbi8qKlxuICogUmVhZHMgYSBmbG9hdCAoMzIgYml0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gcmVhZF9mbG9hdCgpIHtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0aGlzLnBvcyArIDQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIDQpO1xuXG4gICAgdmFyIHZhbHVlID0gdXRpbC5mbG9hdC5yZWFkRmxvYXRMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIGRvdWJsZSAoNjQgYml0IGZsb2F0KSBhcyBhIG51bWJlci5cbiAqIEBmdW5jdGlvblxuICogQHJldHVybnMge251bWJlcn0gVmFsdWUgcmVhZFxuICovXG5SZWFkZXIucHJvdG90eXBlLmRvdWJsZSA9IGZ1bmN0aW9uIHJlYWRfZG91YmxlKCkge1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHRoaXMucG9zICsgOCA+IHRoaXMubGVuKVxuICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcywgNCk7XG5cbiAgICB2YXIgdmFsdWUgPSB1dGlsLmZsb2F0LnJlYWREb3VibGVMRSh0aGlzLmJ1ZiwgdGhpcy5wb3MpO1xuICAgIHRoaXMucG9zICs9IDg7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHJlYWRfYnl0ZXMoKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMudWludDMyKCksXG4gICAgICAgIHN0YXJ0ICA9IHRoaXMucG9zLFxuICAgICAgICBlbmQgICAgPSB0aGlzLnBvcyArIGxlbmd0aDtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChlbmQgPiB0aGlzLmxlbilcbiAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG5cbiAgICB0aGlzLnBvcyArPSBsZW5ndGg7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5idWYpKSAvLyBwbGFpbiBhcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5idWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSBlbmQgLy8gZml4IGZvciBJRSAxMC9XaW44IGFuZCBvdGhlcnMnIHN1YmFycmF5IHJldHVybmluZyBhcnJheSBvZiBzaXplIDFcbiAgICAgICAgPyBuZXcgdGhpcy5idWYuY29uc3RydWN0b3IoMClcbiAgICAgICAgOiB0aGlzLl9zbGljZS5jYWxsKHRoaXMuYnVmLCBzdGFydCwgZW5kKTtcbn07XG5cbi8qKlxuICogUmVhZHMgYSBzdHJpbmcgcHJlY2VlZGVkIGJ5IGl0cyBieXRlIGxlbmd0aCBhcyBhIHZhcmludC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFZhbHVlIHJlYWRcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZygpIHtcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzKCk7XG4gICAgcmV0dXJuIHV0ZjgucmVhZChieXRlcywgMCwgYnl0ZXMubGVuZ3RoKTtcbn07XG5cbi8qKlxuICogU2tpcHMgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgYnl0ZXMgaWYgc3BlY2lmaWVkLCBvdGhlcndpc2Ugc2tpcHMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aF0gTGVuZ3RoIGlmIGtub3duLCBvdGhlcndpc2UgYSB2YXJpbnQgaXMgYXNzdW1lZFxuICogQHJldHVybnMge1JlYWRlcn0gYHRoaXNgXG4gKi9cblJlYWRlci5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIHNraXAobGVuZ3RoKSB7XG4gICAgaWYgKHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICh0aGlzLnBvcyArIGxlbmd0aCA+IHRoaXMubGVuKVxuICAgICAgICAgICAgdGhyb3cgaW5kZXhPdXRPZlJhbmdlKHRoaXMsIGxlbmd0aCk7XG4gICAgICAgIHRoaXMucG9zICs9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnBvcyA+PSB0aGlzLmxlbilcbiAgICAgICAgICAgICAgICB0aHJvdyBpbmRleE91dE9mUmFuZ2UodGhpcyk7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuYnVmW3RoaXMucG9zKytdICYgMTI4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNraXBzIHRoZSBuZXh0IGVsZW1lbnQgb2YgdGhlIHNwZWNpZmllZCB3aXJlIHR5cGUuXG4gKiBAcGFyYW0ge251bWJlcn0gd2lyZVR5cGUgV2lyZSB0eXBlIHJlY2VpdmVkXG4gKiBAcmV0dXJucyB7UmVhZGVyfSBgdGhpc2BcbiAqL1xuUmVhZGVyLnByb3RvdHlwZS5za2lwVHlwZSA9IGZ1bmN0aW9uKHdpcmVUeXBlKSB7XG4gICAgc3dpdGNoICh3aXJlVHlwZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB0aGlzLnNraXAoOCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5za2lwKHRoaXMudWludDMyKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHdoaWxlICgod2lyZVR5cGUgPSB0aGlzLnVpbnQzMigpICYgNykgIT09IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNraXBUeXBlKHdpcmVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB0aGlzLnNraXAoNCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHdpcmUgdHlwZSBcIiArIHdpcmVUeXBlICsgXCIgYXQgb2Zmc2V0IFwiICsgdGhpcy5wb3MpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cblJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24oQnVmZmVyUmVhZGVyXykge1xuICAgIEJ1ZmZlclJlYWRlciA9IEJ1ZmZlclJlYWRlcl87XG4gICAgUmVhZGVyLmNyZWF0ZSA9IGNyZWF0ZSgpO1xuICAgIEJ1ZmZlclJlYWRlci5fY29uZmlndXJlKCk7XG5cbiAgICB2YXIgZm4gPSB1dGlsLkxvbmcgPyBcInRvTG9uZ1wiIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gXCJ0b051bWJlclwiO1xuICAgIHV0aWwubWVyZ2UoUmVhZGVyLnByb3RvdHlwZSwge1xuXG4gICAgICAgIGludDY0OiBmdW5jdGlvbiByZWFkX2ludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1aW50NjQ6IGZ1bmN0aW9uIHJlYWRfdWludDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRMb25nVmFyaW50LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNpbnQ2NDogZnVuY3Rpb24gcmVhZF9zaW50NjQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZExvbmdWYXJpbnQuY2FsbCh0aGlzKS56ekRlY29kZSgpW2ZuXShmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZml4ZWQ2NDogZnVuY3Rpb24gcmVhZF9maXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNmaXhlZDY0OiBmdW5jdGlvbiByZWFkX3NmaXhlZDY0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRGaXhlZDY0LmNhbGwodGhpcylbZm5dKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlclJlYWRlcjtcblxuLy8gZXh0ZW5kcyBSZWFkZXJcbnZhciBSZWFkZXIgPSByZXF1aXJlKFwiLi9yZWFkZXJcIik7XG4oQnVmZmVyUmVhZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUmVhZGVyLnByb3RvdHlwZSkpLmNvbnN0cnVjdG9yID0gQnVmZmVyUmVhZGVyO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IGJ1ZmZlciByZWFkZXIgaW5zdGFuY2UuXG4gKiBAY2xhc3NkZXNjIFdpcmUgZm9ybWF0IHJlYWRlciB1c2luZyBub2RlIGJ1ZmZlcnMuXG4gKiBAZXh0ZW5kcyBSZWFkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBCdWZmZXIgdG8gcmVhZCBmcm9tXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlclJlYWRlcihidWZmZXIpIHtcbiAgICBSZWFkZXIuY2FsbCh0aGlzLCBidWZmZXIpO1xuXG4gICAgLyoqXG4gICAgICogUmVhZCBidWZmZXIuXG4gICAgICogQG5hbWUgQnVmZmVyUmVhZGVyI2J1ZlxuICAgICAqIEB0eXBlIHtCdWZmZXJ9XG4gICAgICovXG59XG5cbkJ1ZmZlclJlYWRlci5fY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHV0aWwuQnVmZmVyKVxuICAgICAgICBCdWZmZXJSZWFkZXIucHJvdG90eXBlLl9zbGljZSA9IHV0aWwuQnVmZmVyLnByb3RvdHlwZS5zbGljZTtcbn07XG5cblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqL1xuQnVmZmVyUmVhZGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiByZWFkX3N0cmluZ19idWZmZXIoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMudWludDMyKCk7IC8vIG1vZGlmaWVzIHBvc1xuICAgIHJldHVybiB0aGlzLmJ1Zi51dGY4U2xpY2VcbiAgICAgICAgPyB0aGlzLmJ1Zi51dGY4U2xpY2UodGhpcy5wb3MsIHRoaXMucG9zID0gTWF0aC5taW4odGhpcy5wb3MgKyBsZW4sIHRoaXMubGVuKSlcbiAgICAgICAgOiB0aGlzLmJ1Zi50b1N0cmluZyhcInV0Zi04XCIsIHRoaXMucG9zLCB0aGlzLnBvcyA9IE1hdGgubWluKHRoaXMucG9zICsgbGVuLCB0aGlzLmxlbikpO1xufTtcblxuLyoqXG4gKiBSZWFkcyBhIHNlcXVlbmNlIG9mIGJ5dGVzIHByZWNlZWRlZCBieSBpdHMgbGVuZ3RoIGFzIGEgdmFyaW50LlxuICogQG5hbWUgQnVmZmVyUmVhZGVyI2J5dGVzXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFZhbHVlIHJlYWRcbiAqL1xuXG5CdWZmZXJSZWFkZXIuX2NvbmZpZ3VyZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vKipcbiAqIE5hbWVkIHJvb3RzLlxuICogVGhpcyBpcyB3aGVyZSBwYmpzIHN0b3JlcyBnZW5lcmF0ZWQgc3RydWN0dXJlcyAodGhlIG9wdGlvbiBgLXIsIC0tcm9vdGAgc3BlY2lmaWVzIGEgbmFtZSkuXG4gKiBDYW4gYWxzbyBiZSB1c2VkIG1hbnVhbGx5IHRvIG1ha2Ugcm9vdHMgYXZhaWxhYmxlIGFjY3Jvc3MgbW9kdWxlcy5cbiAqIEBuYW1lIHJvb3RzXG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsUm9vdD59XG4gKiBAZXhhbXBsZVxuICogLy8gcGJqcyAtciBteXJvb3QgLW8gY29tcGlsZWQuanMgLi4uXG4gKlxuICogLy8gaW4gYW5vdGhlciBtb2R1bGU6XG4gKiByZXF1aXJlKFwiLi9jb21waWxlZC5qc1wiKTtcbiAqXG4gKiAvLyBpbiBhbnkgc3Vic2VxdWVudCBtb2R1bGU6XG4gKiB2YXIgcm9vdCA9IHByb3RvYnVmLnJvb3RzW1wibXlyb290XCJdO1xuICovXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBTdHJlYW1pbmcgUlBDIGhlbHBlcnMuXG4gKiBAbmFtZXNwYWNlXG4gKi9cbnZhciBycGMgPSBleHBvcnRzO1xuXG4vKipcbiAqIFJQQyBpbXBsZW1lbnRhdGlvbiBwYXNzZWQgdG8ge0BsaW5rIFNlcnZpY2UjY3JlYXRlfSBwZXJmb3JtaW5nIGEgc2VydmljZSByZXF1ZXN0IG9uIG5ldHdvcmsgbGV2ZWwsIGkuZS4gYnkgdXRpbGl6aW5nIGh0dHAgcmVxdWVzdHMgb3Igd2Vic29ja2V0cy5cbiAqIEB0eXBlZGVmIFJQQ0ltcGxcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7TWV0aG9kfHJwYy5TZXJ2aWNlTWV0aG9kPE1lc3NhZ2U8e30+LE1lc3NhZ2U8e30+Pn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kIGJlaW5nIGNhbGxlZFxuICogQHBhcmFtIHtVaW50OEFycmF5fSByZXF1ZXN0RGF0YSBSZXF1ZXN0IGRhdGFcbiAqIEBwYXJhbSB7UlBDSW1wbENhbGxiYWNrfSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBycGNJbXBsKG1ldGhvZCwgcmVxdWVzdERhdGEsIGNhbGxiYWNrKSB7XG4gKiAgICAgaWYgKHByb3RvYnVmLnV0aWwubGNGaXJzdChtZXRob2QubmFtZSkgIT09IFwibXlNZXRob2RcIikgLy8gY29tcGF0aWJsZSB3aXRoIHN0YXRpYyBjb2RlXG4gKiAgICAgICAgIHRocm93IEVycm9yKFwibm8gc3VjaCBtZXRob2RcIik7XG4gKiAgICAgYXN5bmNocm9ub3VzbHlPYnRhaW5BUmVzcG9uc2UocmVxdWVzdERhdGEsIGZ1bmN0aW9uKGVyciwgcmVzcG9uc2VEYXRhKSB7XG4gKiAgICAgICAgIGNhbGxiYWNrKGVyciwgcmVzcG9uc2VEYXRhKTtcbiAqICAgICB9KTtcbiAqIH1cbiAqL1xuXG4vKipcbiAqIE5vZGUtc3R5bGUgY2FsbGJhY2sgYXMgdXNlZCBieSB7QGxpbmsgUlBDSW1wbH0uXG4gKiBAdHlwZWRlZiBSUENJbXBsQ2FsbGJhY2tcbiAqIEB0eXBlIHtmdW5jdGlvbn1cbiAqIEBwYXJhbSB7RXJyb3J8bnVsbH0gZXJyb3IgRXJyb3IsIGlmIGFueSwgb3RoZXJ3aXNlIGBudWxsYFxuICogQHBhcmFtIHtVaW50OEFycmF5fG51bGx9IFtyZXNwb25zZV0gUmVzcG9uc2UgZGF0YSBvciBgbnVsbGAgdG8gc2lnbmFsIGVuZCBvZiBzdHJlYW0sIGlmIHRoZXJlIGhhc24ndCBiZWVuIGFuIGVycm9yXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5cbnJwYy5TZXJ2aWNlID0gcmVxdWlyZShcIi4vcnBjL3NlcnZpY2VcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gU2VydmljZTtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vLyBFeHRlbmRzIEV2ZW50RW1pdHRlclxuKFNlcnZpY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh1dGlsLkV2ZW50RW1pdHRlci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IFNlcnZpY2U7XG5cbi8qKlxuICogQSBzZXJ2aWNlIG1ldGhvZCBjYWxsYmFjayBhcyB1c2VkIGJ5IHtAbGluayBycGMuU2VydmljZU1ldGhvZHxTZXJ2aWNlTWV0aG9kfS5cbiAqXG4gKiBEaWZmZXJzIGZyb20ge0BsaW5rIFJQQ0ltcGxDYWxsYmFja30gaW4gdGhhdCBpdCBpcyBhbiBhY3R1YWwgY2FsbGJhY2sgb2YgYSBzZXJ2aWNlIG1ldGhvZCB3aGljaCBtYXkgbm90IHJldHVybiBgcmVzcG9uc2UgPSBudWxsYC5cbiAqIEB0eXBlZGVmIHJwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2tcbiAqIEB0ZW1wbGF0ZSBUUmVzIGV4dGVuZHMgTWVzc2FnZTxUUmVzPlxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHBhcmFtIHtFcnJvcnxudWxsfSBlcnJvciBFcnJvciwgaWYgYW55XG4gKiBAcGFyYW0ge1RSZXN9IFtyZXNwb25zZV0gUmVzcG9uc2UgbWVzc2FnZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuXG4vKipcbiAqIEEgc2VydmljZSBtZXRob2QgcGFydCBvZiBhIHtAbGluayBycGMuU2VydmljZX0gYXMgY3JlYXRlZCBieSB7QGxpbmsgU2VydmljZS5jcmVhdGV9LlxuICogQHR5cGVkZWYgcnBjLlNlcnZpY2VNZXRob2RcbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge1RSZXF8UHJvcGVydGllczxUUmVxPn0gcmVxdWVzdCBSZXF1ZXN0IG1lc3NhZ2Ugb3IgcGxhaW4gb2JqZWN0XG4gKiBAcGFyYW0ge3JwYy5TZXJ2aWNlTWV0aG9kQ2FsbGJhY2s8VFJlcz59IFtjYWxsYmFja10gTm9kZS1zdHlsZSBjYWxsYmFjayBjYWxsZWQgd2l0aCB0aGUgZXJyb3IsIGlmIGFueSwgYW5kIHRoZSByZXNwb25zZSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxNZXNzYWdlPFRSZXM+Pn0gUHJvbWlzZSBpZiBgY2FsbGJhY2tgIGhhcyBiZWVuIG9taXR0ZWQsIG90aGVyd2lzZSBgdW5kZWZpbmVkYFxuICovXG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBSUEMgc2VydmljZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQW4gUlBDIHNlcnZpY2UgYXMgcmV0dXJuZWQgYnkge0BsaW5rIFNlcnZpY2UjY3JlYXRlfS5cbiAqIEBleHBvcnRzIHJwYy5TZXJ2aWNlXG4gKiBAZXh0ZW5kcyB1dGlsLkV2ZW50RW1pdHRlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1JQQ0ltcGx9IHJwY0ltcGwgUlBDIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1ZXN0RGVsaW1pdGVkPWZhbHNlXSBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNwb25zZURlbGltaXRlZD1mYWxzZV0gV2hldGhlciByZXNwb25zZXMgYXJlIGxlbmd0aC1kZWxpbWl0ZWRcbiAqL1xuZnVuY3Rpb24gU2VydmljZShycGNJbXBsLCByZXF1ZXN0RGVsaW1pdGVkLCByZXNwb25zZURlbGltaXRlZCkge1xuXG4gICAgaWYgKHR5cGVvZiBycGNJbXBsICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihcInJwY0ltcGwgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuXG4gICAgdXRpbC5FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIC8qKlxuICAgICAqIFJQQyBpbXBsZW1lbnRhdGlvbi4gQmVjb21lcyBgbnVsbGAgb25jZSB0aGUgc2VydmljZSBpcyBlbmRlZC5cbiAgICAgKiBAdHlwZSB7UlBDSW1wbHxudWxsfVxuICAgICAqL1xuICAgIHRoaXMucnBjSW1wbCA9IHJwY0ltcGw7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlcXVlc3RzIGFyZSBsZW5ndGgtZGVsaW1pdGVkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMucmVxdWVzdERlbGltaXRlZCA9IEJvb2xlYW4ocmVxdWVzdERlbGltaXRlZCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHJlc3BvbnNlcyBhcmUgbGVuZ3RoLWRlbGltaXRlZC5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlc3BvbnNlRGVsaW1pdGVkID0gQm9vbGVhbihyZXNwb25zZURlbGltaXRlZCk7XG59XG5cbi8qKlxuICogQ2FsbHMgYSBzZXJ2aWNlIG1ldGhvZCB0aHJvdWdoIHtAbGluayBycGMuU2VydmljZSNycGNJbXBsfHJwY0ltcGx9LlxuICogQHBhcmFtIHtNZXRob2R8cnBjLlNlcnZpY2VNZXRob2Q8VFJlcSxUUmVzPn0gbWV0aG9kIFJlZmxlY3RlZCBvciBzdGF0aWMgbWV0aG9kXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXE+fSByZXF1ZXN0Q3RvciBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbnN0cnVjdG9yPFRSZXM+fSByZXNwb25zZUN0b3IgUmVzcG9uc2UgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7VFJlcXxQcm9wZXJ0aWVzPFRSZXE+fSByZXF1ZXN0IFJlcXVlc3QgbWVzc2FnZSBvciBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7cnBjLlNlcnZpY2VNZXRob2RDYWxsYmFjazxUUmVzPn0gY2FsbGJhY2sgU2VydmljZSBjYWxsYmFja1xuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqIEB0ZW1wbGF0ZSBUUmVxIGV4dGVuZHMgTWVzc2FnZTxUUmVxPlxuICogQHRlbXBsYXRlIFRSZXMgZXh0ZW5kcyBNZXNzYWdlPFRSZXM+XG4gKi9cblNlcnZpY2UucHJvdG90eXBlLnJwY0NhbGwgPSBmdW5jdGlvbiBycGNDYWxsKG1ldGhvZCwgcmVxdWVzdEN0b3IsIHJlc3BvbnNlQ3RvciwgcmVxdWVzdCwgY2FsbGJhY2spIHtcblxuICAgIGlmICghcmVxdWVzdClcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVxdWVzdCBtdXN0IGJlIHNwZWNpZmllZFwiKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoIWNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gdXRpbC5hc1Byb21pc2UocnBjQ2FsbCwgc2VsZiwgbWV0aG9kLCByZXF1ZXN0Q3RvciwgcmVzcG9uc2VDdG9yLCByZXF1ZXN0KTtcblxuICAgIGlmICghc2VsZi5ycGNJbXBsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKEVycm9yKFwiYWxyZWFkeSBlbmRlZFwiKSk7IH0sIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJwY0ltcGwoXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICByZXF1ZXN0Q3RvcltzZWxmLnJlcXVlc3REZWxpbWl0ZWQgPyBcImVuY29kZURlbGltaXRlZFwiIDogXCJlbmNvZGVcIl0ocmVxdWVzdCkuZmluaXNoKCksXG4gICAgICAgICAgICBmdW5jdGlvbiBycGNDYWxsYmFjayhlcnIsIHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVyciwgbWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kKC8qIGVuZGVkQnlSUEMgKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiByZXNwb25zZUN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlQ3RvcltzZWxmLnJlc3BvbnNlRGVsaW1pdGVkID8gXCJkZWNvZGVEZWxpbWl0ZWRcIiA6IFwiZGVjb2RlXCJdKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuZW1pdChcImRhdGFcIiwgcmVzcG9uc2UsIG1ldGhvZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyLCBtZXRob2QpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhlcnIpOyB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEVuZHMgdGhpcyBzZXJ2aWNlIGFuZCBlbWl0cyB0aGUgYGVuZGAgZXZlbnQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmRlZEJ5UlBDPWZhbHNlXSBXaGV0aGVyIHRoZSBzZXJ2aWNlIGhhcyBiZWVuIGVuZGVkIGJ5IHRoZSBSUEMgaW1wbGVtZW50YXRpb24uXG4gKiBAcmV0dXJucyB7cnBjLlNlcnZpY2V9IGB0aGlzYFxuICovXG5TZXJ2aWNlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiBlbmQoZW5kZWRCeVJQQykge1xuICAgIGlmICh0aGlzLnJwY0ltcGwpIHtcbiAgICAgICAgaWYgKCFlbmRlZEJ5UlBDKSAvLyBzaWduYWwgZW5kIHRvIHJwY0ltcGxcbiAgICAgICAgICAgIHRoaXMucnBjSW1wbChudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgdGhpcy5ycGNJbXBsID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KFwiZW5kXCIpLm9mZigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gTG9uZ0JpdHM7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWwvbWluaW1hbFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIG5ldyBsb25nIGJpdHMuXG4gKiBAY2xhc3NkZXNjIEhlbHBlciBjbGFzcyBmb3Igd29ya2luZyB3aXRoIHRoZSBsb3cgYW5kIGhpZ2ggYml0cyBvZiBhIDY0IGJpdCB2YWx1ZS5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBsbyBMb3cgMzIgYml0cywgdW5zaWduZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaSBIaWdoIDMyIGJpdHMsIHVuc2lnbmVkXG4gKi9cbmZ1bmN0aW9uIExvbmdCaXRzKGxvLCBoaSkge1xuXG4gICAgLy8gbm90ZSB0aGF0IHRoZSBjYXN0cyBiZWxvdyBhcmUgdGhlb3JldGljYWxseSB1bm5lY2Vzc2FyeSBhcyBvZiB0b2RheSwgYnV0IG9sZGVyIHN0YXRpY2FsbHlcbiAgICAvLyBnZW5lcmF0ZWQgY29udmVydGVyIGNvZGUgbWlnaHQgc3RpbGwgY2FsbCB0aGUgY3RvciB3aXRoIHNpZ25lZCAzMmJpdHMuIGtlcHQgZm9yIGNvbXBhdC5cblxuICAgIC8qKlxuICAgICAqIExvdyBiaXRzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sbyA9IGxvID4+PiAwO1xuXG4gICAgLyoqXG4gICAgICogSGlnaCBiaXRzLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5oaSA9IGhpID4+PiAwO1xufVxuXG4vKipcbiAqIFplcm8gYml0cy5cbiAqIEBtZW1iZXJvZiB1dGlsLkxvbmdCaXRzXG4gKiBAdHlwZSB7dXRpbC5Mb25nQml0c31cbiAqL1xudmFyIHplcm8gPSBMb25nQml0cy56ZXJvID0gbmV3IExvbmdCaXRzKDAsIDApO1xuXG56ZXJvLnRvTnVtYmVyID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuemVyby56ekVuY29kZSA9IHplcm8uenpEZWNvZGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH07XG56ZXJvLmxlbmd0aCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMTsgfTtcblxuLyoqXG4gKiBaZXJvIGhhc2guXG4gKiBAbWVtYmVyb2YgdXRpbC5Mb25nQml0c1xuICogQHR5cGUge3N0cmluZ31cbiAqL1xudmFyIHplcm9IYXNoID0gTG9uZ0JpdHMuemVyb0hhc2ggPSBcIlxcMFxcMFxcMFxcMFxcMFxcMFxcMFxcMFwiO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcbiAqL1xuTG9uZ0JpdHMuZnJvbU51bWJlciA9IGZ1bmN0aW9uIGZyb21OdW1iZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IDApXG4gICAgICAgIHJldHVybiB6ZXJvO1xuICAgIHZhciBzaWduID0gdmFsdWUgPCAwO1xuICAgIGlmIChzaWduKVxuICAgICAgICB2YWx1ZSA9IC12YWx1ZTtcbiAgICB2YXIgbG8gPSB2YWx1ZSA+Pj4gMCxcbiAgICAgICAgaGkgPSAodmFsdWUgLSBsbykgLyA0Mjk0OTY3Mjk2ID4+PiAwO1xuICAgIGlmIChzaWduKSB7XG4gICAgICAgIGhpID0gfmhpID4+PiAwO1xuICAgICAgICBsbyA9IH5sbyA+Pj4gMDtcbiAgICAgICAgaWYgKCsrbG8gPiA0Mjk0OTY3Mjk1KSB7XG4gICAgICAgICAgICBsbyA9IDA7XG4gICAgICAgICAgICBpZiAoKytoaSA+IDQyOTQ5NjcyOTUpXG4gICAgICAgICAgICAgICAgaGkgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTG9uZ0JpdHMobG8sIGhpKTtcbn07XG5cbi8qKlxuICogQ29uc3RydWN0cyBuZXcgbG9uZyBiaXRzIGZyb20gYSBudW1iZXIsIGxvbmcgb3Igc3RyaW5nLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gSW5zdGFuY2VcbiAqL1xuTG9uZ0JpdHMuZnJvbSA9IGZ1bmN0aW9uIGZyb20odmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgICAgICByZXR1cm4gTG9uZ0JpdHMuZnJvbU51bWJlcih2YWx1ZSk7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICAgIGlmICh1dGlsLkxvbmcpXG4gICAgICAgICAgICB2YWx1ZSA9IHV0aWwuTG9uZy5mcm9tU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIExvbmdCaXRzLmZyb21OdW1iZXIocGFyc2VJbnQodmFsdWUsIDEwKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5sb3cgfHwgdmFsdWUuaGlnaCA/IG5ldyBMb25nQml0cyh2YWx1ZS5sb3cgPj4+IDAsIHZhbHVlLmhpZ2ggPj4+IDApIDogemVybztcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBwb3NzaWJseSB1bnNhZmUgSmF2YVNjcmlwdCBudW1iZXIuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1bnNpZ25lZD1mYWxzZV0gV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFBvc3NpYmx5IHVuc2FmZSBudW1iZXJcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnRvTnVtYmVyID0gZnVuY3Rpb24gdG9OdW1iZXIodW5zaWduZWQpIHtcbiAgICBpZiAoIXVuc2lnbmVkICYmIHRoaXMuaGkgPj4+IDMxKSB7XG4gICAgICAgIHZhciBsbyA9IH50aGlzLmxvICsgMSA+Pj4gMCxcbiAgICAgICAgICAgIGhpID0gfnRoaXMuaGkgICAgID4+PiAwO1xuICAgICAgICBpZiAoIWxvKVxuICAgICAgICAgICAgaGkgPSBoaSArIDEgPj4+IDA7XG4gICAgICAgIHJldHVybiAtKGxvICsgaGkgKiA0Mjk0OTY3Mjk2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG8gKyB0aGlzLmhpICogNDI5NDk2NzI5Njtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSBsb25nLlxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7TG9uZ30gTG9uZ1xuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9Mb25nID0gZnVuY3Rpb24gdG9Mb25nKHVuc2lnbmVkKSB7XG4gICAgcmV0dXJuIHV0aWwuTG9uZ1xuICAgICAgICA/IG5ldyB1dGlsLkxvbmcodGhpcy5sbyB8IDAsIHRoaXMuaGkgfCAwLCBCb29sZWFuKHVuc2lnbmVkKSlcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgOiB7IGxvdzogdGhpcy5sbyB8IDAsIGhpZ2g6IHRoaXMuaGkgfCAwLCB1bnNpZ25lZDogQm9vbGVhbih1bnNpZ25lZCkgfTtcbn07XG5cbnZhciBjaGFyQ29kZUF0ID0gU3RyaW5nLnByb3RvdHlwZS5jaGFyQ29kZUF0O1xuXG4vKipcbiAqIENvbnN0cnVjdHMgbmV3IGxvbmcgYml0cyBmcm9tIHRoZSBzcGVjaWZpZWQgOCBjaGFyYWN0ZXJzIGxvbmcgaGFzaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIEhhc2hcbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBCaXRzXG4gKi9cbkxvbmdCaXRzLmZyb21IYXNoID0gZnVuY3Rpb24gZnJvbUhhc2goaGFzaCkge1xuICAgIGlmIChoYXNoID09PSB6ZXJvSGFzaClcbiAgICAgICAgcmV0dXJuIHplcm87XG4gICAgcmV0dXJuIG5ldyBMb25nQml0cyhcbiAgICAgICAgKCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMClcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgMSkgPDwgOFxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAyKSA8PCAxNlxuICAgICAgICB8IGNoYXJDb2RlQXQuY2FsbChoYXNoLCAzKSA8PCAyNCkgPj4+IDBcbiAgICAsXG4gICAgICAgICggY2hhckNvZGVBdC5jYWxsKGhhc2gsIDQpXG4gICAgICAgIHwgY2hhckNvZGVBdC5jYWxsKGhhc2gsIDUpIDw8IDhcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNikgPDwgMTZcbiAgICAgICAgfCBjaGFyQ29kZUF0LmNhbGwoaGFzaCwgNykgPDwgMjQpID4+PiAwXG4gICAgKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgdGhpcyBsb25nIGJpdHMgdG8gYSA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoLlxuICogQHJldHVybnMge3N0cmluZ30gSGFzaFxuICovXG5Mb25nQml0cy5wcm90b3R5cGUudG9IYXNoID0gZnVuY3Rpb24gdG9IYXNoKCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICB0aGlzLmxvICAgICAgICAmIDI1NSxcbiAgICAgICAgdGhpcy5sbyA+Pj4gOCAgJiAyNTUsXG4gICAgICAgIHRoaXMubG8gPj4+IDE2ICYgMjU1LFxuICAgICAgICB0aGlzLmxvID4+PiAyNCAgICAgICxcbiAgICAgICAgdGhpcy5oaSAgICAgICAgJiAyNTUsXG4gICAgICAgIHRoaXMuaGkgPj4+IDggICYgMjU1LFxuICAgICAgICB0aGlzLmhpID4+PiAxNiAmIDI1NSxcbiAgICAgICAgdGhpcy5oaSA+Pj4gMjRcbiAgICApO1xufTtcblxuLyoqXG4gKiBaaWctemFnIGVuY29kZXMgdGhpcyBsb25nIGJpdHMuXG4gKiBAcmV0dXJucyB7dXRpbC5Mb25nQml0c30gYHRoaXNgXG4gKi9cbkxvbmdCaXRzLnByb3RvdHlwZS56ekVuY29kZSA9IGZ1bmN0aW9uIHp6RW5jb2RlKCkge1xuICAgIHZhciBtYXNrID0gICB0aGlzLmhpID4+IDMxO1xuICAgIHRoaXMuaGkgID0gKCh0aGlzLmhpIDw8IDEgfCB0aGlzLmxvID4+PiAzMSkgXiBtYXNrKSA+Pj4gMDtcbiAgICB0aGlzLmxvICA9ICggdGhpcy5sbyA8PCAxICAgICAgICAgICAgICAgICAgIF4gbWFzaykgPj4+IDA7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFppZy16YWcgZGVjb2RlcyB0aGlzIGxvbmcgYml0cy5cbiAqIEByZXR1cm5zIHt1dGlsLkxvbmdCaXRzfSBgdGhpc2BcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLnp6RGVjb2RlID0gZnVuY3Rpb24genpEZWNvZGUoKSB7XG4gICAgdmFyIG1hc2sgPSAtKHRoaXMubG8gJiAxKTtcbiAgICB0aGlzLmxvICA9ICgodGhpcy5sbyA+Pj4gMSB8IHRoaXMuaGkgPDwgMzEpIF4gbWFzaykgPj4+IDA7XG4gICAgdGhpcy5oaSAgPSAoIHRoaXMuaGkgPj4+IDEgICAgICAgICAgICAgICAgICBeIG1hc2spID4+PiAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhpcyBsb25nYml0cyB3aGVuIGVuY29kZWQgYXMgYSB2YXJpbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGhcbiAqL1xuTG9uZ0JpdHMucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aCgpIHtcbiAgICB2YXIgcGFydDAgPSAgdGhpcy5sbyxcbiAgICAgICAgcGFydDEgPSAodGhpcy5sbyA+Pj4gMjggfCB0aGlzLmhpIDw8IDQpID4+PiAwLFxuICAgICAgICBwYXJ0MiA9ICB0aGlzLmhpID4+PiAyNDtcbiAgICByZXR1cm4gcGFydDIgPT09IDBcbiAgICAgICAgID8gcGFydDEgPT09IDBcbiAgICAgICAgICAgPyBwYXJ0MCA8IDE2Mzg0XG4gICAgICAgICAgICAgPyBwYXJ0MCA8IDEyOCA/IDEgOiAyXG4gICAgICAgICAgICAgOiBwYXJ0MCA8IDIwOTcxNTIgPyAzIDogNFxuICAgICAgICAgICA6IHBhcnQxIDwgMTYzODRcbiAgICAgICAgICAgICA/IHBhcnQxIDwgMTI4ID8gNSA6IDZcbiAgICAgICAgICAgICA6IHBhcnQxIDwgMjA5NzE1MiA/IDcgOiA4XG4gICAgICAgICA6IHBhcnQyIDwgMTI4ID8gOSA6IDEwO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSBleHBvcnRzO1xuXG4vLyB1c2VkIHRvIHJldHVybiBhIFByb21pc2Ugd2hlcmUgY2FsbGJhY2sgaXMgb21pdHRlZFxudXRpbC5hc1Byb21pc2UgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvYXNwcm9taXNlXCIpO1xuXG4vLyBjb252ZXJ0cyB0byAvIGZyb20gYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xudXRpbC5iYXNlNjQgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvYmFzZTY0XCIpO1xuXG4vLyBiYXNlIGNsYXNzIG9mIHJwYy5TZXJ2aWNlXG51dGlsLkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJAcHJvdG9idWZqcy9ldmVudGVtaXR0ZXJcIik7XG5cbi8vIGZsb2F0IGhhbmRsaW5nIGFjY3Jvc3MgYnJvd3NlcnNcbnV0aWwuZmxvYXQgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvZmxvYXRcIik7XG5cbi8vIHJlcXVpcmVzIG1vZHVsZXMgb3B0aW9uYWxseSBhbmQgaGlkZXMgdGhlIGNhbGwgZnJvbSBidW5kbGVyc1xudXRpbC5pbnF1aXJlID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL2lucXVpcmVcIik7XG5cbi8vIGNvbnZlcnRzIHRvIC8gZnJvbSB1dGY4IGVuY29kZWQgc3RyaW5nc1xudXRpbC51dGY4ID0gcmVxdWlyZShcIkBwcm90b2J1ZmpzL3V0ZjhcIik7XG5cbi8vIHByb3ZpZGVzIGEgbm9kZS1saWtlIGJ1ZmZlciBwb29sIGluIHRoZSBicm93c2VyXG51dGlsLnBvb2wgPSByZXF1aXJlKFwiQHByb3RvYnVmanMvcG9vbFwiKTtcblxuLy8gdXRpbGl0eSB0byB3b3JrIHdpdGggdGhlIGxvdyBhbmQgaGlnaCBiaXRzIG9mIGEgNjQgYml0IHZhbHVlXG51dGlsLkxvbmdCaXRzID0gcmVxdWlyZShcIi4vbG9uZ2JpdHNcIik7XG5cbi8qKlxuICogV2hldGhlciBydW5uaW5nIHdpdGhpbiBub2RlIG9yIG5vdC5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xudXRpbC5pc05vZGUgPSBCb29sZWFuKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAmJiBnbG9iYWwucHJvY2Vzc1xuICAgICAgICAgICAgICAgICAgICYmIGdsb2JhbC5wcm9jZXNzLnZlcnNpb25zXG4gICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLnByb2Nlc3MudmVyc2lvbnMubm9kZSk7XG5cbi8qKlxuICogR2xvYmFsIG9iamVjdCByZWZlcmVuY2UuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge09iamVjdH1cbiAqL1xudXRpbC5nbG9iYWwgPSB1dGlsLmlzTm9kZSAmJiBnbG9iYWxcbiAgICAgICAgICAgfHwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3dcbiAgICAgICAgICAgfHwgdHlwZW9mIHNlbGYgICAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmXG4gICAgICAgICAgIHx8IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW52YWxpZC10aGlzXG5cbi8qKlxuICogQW4gaW1tdWFibGUgZW1wdHkgYXJyYXkuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQHR5cGUge0FycmF5LjwqPn1cbiAqIEBjb25zdFxuICovXG51dGlsLmVtcHR5QXJyYXkgPSBPYmplY3QuZnJlZXplID8gT2JqZWN0LmZyZWV6ZShbXSkgOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBbXTsgLy8gdXNlZCBvbiBwcm90b3R5cGVzXG5cbi8qKlxuICogQW4gaW1tdXRhYmxlIGVtcHR5IG9iamVjdC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAY29uc3RcbiAqL1xudXRpbC5lbXB0eU9iamVjdCA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKHt9KSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHt9OyAvLyB1c2VkIG9uIHByb3RvdHlwZXNcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlclxuICovXG51dGlsLmlzSW50ZWdlciA9IE51bWJlci5pc0ludGVnZXIgfHwgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZ1xuICovXG51dGlsLmlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgbm9uLW51bGwgb2JqZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhIG5vbi1udWxsIG9iamVjdFxuICovXG51dGlsLmlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxuICogVGhpcyBpcyBhbiBhbGlhcyBvZiB7QGxpbmsgdXRpbC5pc1NldH0uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogUGxhaW4gb2JqZWN0IG9yIG1lc3NhZ2UgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LCBvdGhlcndpc2UgYGZhbHNlYFxuICovXG51dGlsLmlzc2V0ID1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBvbiBhIG1lc3NhZ2UgaXMgY29uc2lkZXJlZCB0byBiZSBwcmVzZW50LlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBQbGFpbiBvYmplY3Qgb3IgbWVzc2FnZSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiBjb25zaWRlcmVkIHRvIGJlIHByZXNlbnQsIG90aGVyd2lzZSBgZmFsc2VgXG4gKi9cbnV0aWwuaXNTZXQgPSBmdW5jdGlvbiBpc1NldChvYmosIHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBvYmpbcHJvcF07XG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgb2JqLmhhc093blByb3BlcnR5KHByb3ApKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcSwgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCkgPiAwO1xuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQW55IGNvbXBhdGlibGUgQnVmZmVyIGluc3RhbmNlLlxuICogVGhpcyBpcyBhIG1pbmltYWwgc3RhbmQtYWxvbmUgZGVmaW5pdGlvbiBvZiBhIEJ1ZmZlciBpbnN0YW5jZS4gVGhlIGFjdHVhbCB0eXBlIGlzIHRoYXQgZXhwb3J0ZWQgYnkgbm9kZSdzIHR5cGluZ3MuXG4gKiBAaW50ZXJmYWNlIEJ1ZmZlclxuICogQGV4dGVuZHMgVWludDhBcnJheVxuICovXG5cbi8qKlxuICogTm9kZSdzIEJ1ZmZlciBjbGFzcyBpZiBhdmFpbGFibGUuXG4gKiBAdHlwZSB7Q29uc3RydWN0b3I8QnVmZmVyPn1cbiAqL1xudXRpbC5CdWZmZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIEJ1ZmZlciA9IHV0aWwuaW5xdWlyZShcImJ1ZmZlclwiKS5CdWZmZXI7XG4gICAgICAgIC8vIHJlZnVzZSB0byB1c2Ugbm9uLW5vZGUgYnVmZmVycyBpZiBub3QgZXhwbGljaXRseSBhc3NpZ25lZCAocGVyZiByZWFzb25zKTpcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5wcm90b3R5cGUudXRmOFdyaXRlID8gQnVmZmVyIDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0pKCk7XG5cbi8vIEludGVybmFsIGFsaWFzIG9mIG9yIHBvbHlmdWxsIGZvciBCdWZmZXIuZnJvbS5cbnV0aWwuX0J1ZmZlcl9mcm9tID0gbnVsbDtcblxuLy8gSW50ZXJuYWwgYWxpYXMgb2Ygb3IgcG9seWZpbGwgZm9yIEJ1ZmZlci5hbGxvY1Vuc2FmZS5cbnV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBidWZmZXIgb2Ygd2hhdGV2ZXIgdHlwZSBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50LlxuICogQHBhcmFtIHtudW1iZXJ8bnVtYmVyW119IFtzaXplT3JBcnJheT0wXSBCdWZmZXIgc2l6ZSBvciBudW1iZXIgYXJyYXlcbiAqIEByZXR1cm5zIHtVaW50OEFycmF5fEJ1ZmZlcn0gQnVmZmVyXG4gKi9cbnV0aWwubmV3QnVmZmVyID0gZnVuY3Rpb24gbmV3QnVmZmVyKHNpemVPckFycmF5KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4gdHlwZW9mIHNpemVPckFycmF5ID09PSBcIm51bWJlclwiXG4gICAgICAgID8gdXRpbC5CdWZmZXJcbiAgICAgICAgICAgID8gdXRpbC5fQnVmZmVyX2FsbG9jVW5zYWZlKHNpemVPckFycmF5KVxuICAgICAgICAgICAgOiBuZXcgdXRpbC5BcnJheShzaXplT3JBcnJheSlcbiAgICAgICAgOiB1dGlsLkJ1ZmZlclxuICAgICAgICAgICAgPyB1dGlsLl9CdWZmZXJfZnJvbShzaXplT3JBcnJheSlcbiAgICAgICAgICAgIDogdHlwZW9mIFVpbnQ4QXJyYXkgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICA/IHNpemVPckFycmF5XG4gICAgICAgICAgICAgICAgOiBuZXcgVWludDhBcnJheShzaXplT3JBcnJheSk7XG59O1xuXG4vKipcbiAqIEFycmF5IGltcGxlbWVudGF0aW9uIHVzZWQgaW4gdGhlIGJyb3dzZXIuIGBVaW50OEFycmF5YCBpZiBzdXBwb3J0ZWQsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQHR5cGUge0NvbnN0cnVjdG9yPFVpbnQ4QXJyYXk+fVxuICovXG51dGlsLkFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCIgPyBVaW50OEFycmF5IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDogQXJyYXk7XG5cbi8qKlxuICogQW55IGNvbXBhdGlibGUgTG9uZyBpbnN0YW5jZS5cbiAqIFRoaXMgaXMgYSBtaW5pbWFsIHN0YW5kLWFsb25lIGRlZmluaXRpb24gb2YgYSBMb25nIGluc3RhbmNlLiBUaGUgYWN0dWFsIHR5cGUgaXMgdGhhdCBleHBvcnRlZCBieSBsb25nLmpzLlxuICogQGludGVyZmFjZSBMb25nXG4gKiBAcHJvcGVydHkge251bWJlcn0gbG93IExvdyBiaXRzXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGlnaCBIaWdoIGJpdHNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdW5zaWduZWQgV2hldGhlciB1bnNpZ25lZCBvciBub3RcbiAqL1xuXG4vKipcbiAqIExvbmcuanMncyBMb25nIGNsYXNzIGlmIGF2YWlsYWJsZS5cbiAqIEB0eXBlIHtDb25zdHJ1Y3RvcjxMb25nPn1cbiAqL1xudXRpbC5Mb25nID0gLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gdXRpbC5nbG9iYWwuZGNvZGVJTyAmJiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyB1dGlsLmdsb2JhbC5kY29kZUlPLkxvbmdcbiAgICAgICAgIHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIHV0aWwuZ2xvYmFsLkxvbmdcbiAgICAgICAgIHx8IHV0aWwuaW5xdWlyZShcImxvbmdcIik7XG5cbi8qKlxuICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gdmVyaWZ5IDIgYml0IChgYm9vbGApIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTJSZSA9IC9edHJ1ZXxmYWxzZXwwfDEkLztcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgMzIgYml0IChgaW50MzJgIGV0Yy4pIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTMyUmUgPSAvXi0/KD86MHxbMS05XVswLTldKikkLztcblxuLyoqXG4gKiBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byB2ZXJpZnkgNjQgYml0IChgaW50NjRgIGV0Yy4pIG1hcCBrZXlzLlxuICogQHR5cGUge1JlZ0V4cH1cbiAqIEBjb25zdFxuICovXG51dGlsLmtleTY0UmUgPSAvXig/OltcXFxceDAwLVxcXFx4ZmZdezh9fC0/KD86MHxbMS05XVswLTldKikpJC87XG5cbi8qKlxuICogQ29udmVydHMgYSBudW1iZXIgb3IgbG9uZyB0byBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZy5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEhhc2hcbiAqL1xudXRpbC5sb25nVG9IYXNoID0gZnVuY3Rpb24gbG9uZ1RvSGFzaCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICA/IHV0aWwuTG9uZ0JpdHMuZnJvbSh2YWx1ZSkudG9IYXNoKClcbiAgICAgICAgOiB1dGlsLkxvbmdCaXRzLnplcm9IYXNoO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiA4IGNoYXJhY3RlcnMgbG9uZyBoYXNoIHN0cmluZyB0byBhIGxvbmcgb3IgbnVtYmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggSGFzaFxuICogQHBhcmFtIHtib29sZWFufSBbdW5zaWduZWQ9ZmFsc2VdIFdoZXRoZXIgdW5zaWduZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7TG9uZ3xudW1iZXJ9IE9yaWdpbmFsIHZhbHVlXG4gKi9cbnV0aWwubG9uZ0Zyb21IYXNoID0gZnVuY3Rpb24gbG9uZ0Zyb21IYXNoKGhhc2gsIHVuc2lnbmVkKSB7XG4gICAgdmFyIGJpdHMgPSB1dGlsLkxvbmdCaXRzLmZyb21IYXNoKGhhc2gpO1xuICAgIGlmICh1dGlsLkxvbmcpXG4gICAgICAgIHJldHVybiB1dGlsLkxvbmcuZnJvbUJpdHMoYml0cy5sbywgYml0cy5oaSwgdW5zaWduZWQpO1xuICAgIHJldHVybiBiaXRzLnRvTnVtYmVyKEJvb2xlYW4odW5zaWduZWQpKTtcbn07XG5cbi8qKlxuICogTWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBtZW1iZXJvZiB1dGlsXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBkc3QgRGVzdGluYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBzcmMgU291cmNlIG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBbaWZOb3RTZXQ9ZmFsc2VdIE1lcmdlcyBvbmx5IGlmIHRoZSBrZXkgaXMgbm90IGFscmVhZHkgc2V0XG4gKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsKj59IERlc3RpbmF0aW9uIG9iamVjdFxuICovXG5mdW5jdGlvbiBtZXJnZShkc3QsIHNyYywgaWZOb3RTZXQpIHsgLy8gdXNlZCBieSBjb252ZXJ0ZXJzXG4gICAgZm9yICh2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyksIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSlcbiAgICAgICAgaWYgKGRzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkIHx8ICFpZk5vdFNldClcbiAgICAgICAgICAgIGRzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICByZXR1cm4gZHN0O1xufVxuXG51dGlsLm1lcmdlID0gbWVyZ2U7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIHN0cmluZyB0byBsb3dlciBjYXNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBTdHJpbmcgdG8gY29udmVydFxuICogQHJldHVybnMge3N0cmluZ30gQ29udmVydGVkIHN0cmluZ1xuICovXG51dGlsLmxjRmlyc3QgPSBmdW5jdGlvbiBsY0ZpcnN0KHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHIuc3Vic3RyaW5nKDEpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3VzdG9tIGVycm9yIGNvbnN0cnVjdG9yLlxuICogQG1lbWJlcm9mIHV0aWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEVycm9yIG5hbWVcbiAqIEByZXR1cm5zIHtDb25zdHJ1Y3RvcjxFcnJvcj59IEN1c3RvbSBlcnJvciBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBuZXdFcnJvcihuYW1lKSB7XG5cbiAgICBmdW5jdGlvbiBDdXN0b21FcnJvcihtZXNzYWdlLCBwcm9wZXJ0aWVzKSB7XG5cbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEN1c3RvbUVycm9yKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3VzdG9tRXJyb3IobWVzc2FnZSwgcHJvcGVydGllcyk7XG5cbiAgICAgICAgLy8gRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcbiAgICAgICAgLy8gXiBqdXN0IHJldHVybnMgYSBuZXcgZXJyb3IgaW5zdGFuY2UgYmVjYXVzZSB0aGUgY3RvciBjYW4gYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb25cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtZXNzYWdlXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1lc3NhZ2U7IH0gfSk7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSAvLyBub2RlXG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBDdXN0b21FcnJvcik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0YWNrXCIsIHsgdmFsdWU6IG5ldyBFcnJvcigpLnN0YWNrIHx8IFwiXCIgfSk7XG5cbiAgICAgICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgICAgICBtZXJnZSh0aGlzLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICAoQ3VzdG9tRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpKS5jb25zdHJ1Y3RvciA9IEN1c3RvbUVycm9yO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEN1c3RvbUVycm9yLnByb3RvdHlwZSwgXCJuYW1lXCIsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG5hbWU7IH0gfSk7XG5cbiAgICBDdXN0b21FcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiOiBcIiArIHRoaXMubWVzc2FnZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEN1c3RvbUVycm9yO1xufVxuXG51dGlsLm5ld0Vycm9yID0gbmV3RXJyb3I7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBwcm90b2NvbCBlcnJvci5cbiAqIEBjbGFzc2Rlc2MgRXJyb3Igc3ViY2xhc3MgaW5kaWNhdGluZyBhIHByb3RvY29sIHNwZWNpZmMgZXJyb3IuXG4gKiBAbWVtYmVyb2YgdXRpbFxuICogQGV4dGVuZHMgRXJyb3JcbiAqIEB0ZW1wbGF0ZSBUIGV4dGVuZHMgTWVzc2FnZTxUPlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBFcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCo+fSBbcHJvcGVydGllc10gQWRkaXRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAZXhhbXBsZVxuICogdHJ5IHtcbiAqICAgICBNeU1lc3NhZ2UuZGVjb2RlKHNvbWVCdWZmZXIpOyAvLyB0aHJvd3MgaWYgcmVxdWlyZWQgZmllbGRzIGFyZSBtaXNzaW5nXG4gKiB9IGNhdGNoIChlKSB7XG4gKiAgICAgaWYgKGUgaW5zdGFuY2VvZiBQcm90b2NvbEVycm9yICYmIGUuaW5zdGFuY2UpXG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVjb2RlZCBzbyBmYXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZS5pbnN0YW5jZSkpO1xuICogfVxuICovXG51dGlsLlByb3RvY29sRXJyb3IgPSBuZXdFcnJvcihcIlByb3RvY29sRXJyb3JcIik7XG5cbi8qKlxuICogU28gZmFyIGRlY29kZWQgbWVzc2FnZSBpbnN0YW5jZS5cbiAqIEBuYW1lIHV0aWwuUHJvdG9jb2xFcnJvciNpbnN0YW5jZVxuICogQHR5cGUge01lc3NhZ2U8VD59XG4gKi9cblxuLyoqXG4gKiBBIE9uZU9mIGdldHRlciBhcyByZXR1cm5lZCBieSB7QGxpbmsgdXRpbC5vbmVPZkdldHRlcn0uXG4gKiBAdHlwZWRlZiBPbmVPZkdldHRlclxuICogQHR5cGUge2Z1bmN0aW9ufVxuICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9IFNldCBmaWVsZCBuYW1lLCBpZiBhbnlcbiAqL1xuXG4vKipcbiAqIEJ1aWxkcyBhIGdldHRlciBmb3IgYSBvbmVvZidzIHByZXNlbnQgZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nW119IGZpZWxkTmFtZXMgRmllbGQgbmFtZXNcbiAqIEByZXR1cm5zIHtPbmVPZkdldHRlcn0gVW5ib3VuZCBnZXR0ZXJcbiAqL1xudXRpbC5vbmVPZkdldHRlciA9IGZ1bmN0aW9uIGdldE9uZU9mKGZpZWxkTmFtZXMpIHtcbiAgICB2YXIgZmllbGRNYXAgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkTmFtZXMubGVuZ3RoOyArK2kpXG4gICAgICAgIGZpZWxkTWFwW2ZpZWxkTmFtZXNbaV1dID0gMTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBTZXQgZmllbGQgbmFtZSwgaWYgYW55XG4gICAgICogQHRoaXMgT2JqZWN0XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbigpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICAgICAgICBmb3IgKHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcyksIGkgPSBrZXlzLmxlbmd0aCAtIDE7IGkgPiAtMTsgLS1pKVxuICAgICAgICAgICAgaWYgKGZpZWxkTWFwW2tleXNbaV1dID09PSAxICYmIHRoaXNba2V5c1tpXV0gIT09IHVuZGVmaW5lZCAmJiB0aGlzW2tleXNbaV1dICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXlzW2ldO1xuICAgIH07XG59O1xuXG4vKipcbiAqIEEgT25lT2Ygc2V0dGVyIGFzIHJldHVybmVkIGJ5IHtAbGluayB1dGlsLm9uZU9mU2V0dGVyfS5cbiAqIEB0eXBlZGVmIE9uZU9mU2V0dGVyXG4gKiBAdHlwZSB7ZnVuY3Rpb259XG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHZhbHVlIEZpZWxkIG5hbWVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cblxuLyoqXG4gKiBCdWlsZHMgYSBzZXR0ZXIgZm9yIGEgb25lb2YncyBwcmVzZW50IGZpZWxkIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWVsZE5hbWVzIEZpZWxkIG5hbWVzXG4gKiBAcmV0dXJucyB7T25lT2ZTZXR0ZXJ9IFVuYm91bmQgc2V0dGVyXG4gKi9cbnV0aWwub25lT2ZTZXR0ZXIgPSBmdW5jdGlvbiBzZXRPbmVPZihmaWVsZE5hbWVzKSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBGaWVsZCBuYW1lXG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKiBAdGhpcyBPYmplY3RcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZE5hbWVzLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgaWYgKGZpZWxkTmFtZXNbaV0gIT09IG5hbWUpXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbZmllbGROYW1lc1tpXV07XG4gICAgfTtcbn07XG5cbi8qKlxuICogRGVmYXVsdCBjb252ZXJzaW9uIG9wdGlvbnMgdXNlZCBmb3Ige0BsaW5rIE1lc3NhZ2UjdG9KU09OfSBpbXBsZW1lbnRhdGlvbnMuXG4gKlxuICogVGhlc2Ugb3B0aW9ucyBhcmUgY2xvc2UgdG8gcHJvdG8zJ3MgSlNPTiBtYXBwaW5nIHdpdGggdGhlIGV4Y2VwdGlvbiB0aGF0IGludGVybmFsIHR5cGVzIGxpa2UgQW55IGFyZSBoYW5kbGVkIGp1c3QgbGlrZSBtZXNzYWdlcy4gTW9yZSBwcmVjaXNlbHk6XG4gKlxuICogLSBMb25ncyBiZWNvbWUgc3RyaW5nc1xuICogLSBFbnVtcyBiZWNvbWUgc3RyaW5nIGtleXNcbiAqIC0gQnl0ZXMgYmVjb21lIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqIC0gKFN1Yi0pTWVzc2FnZXMgYmVjb21lIHBsYWluIG9iamVjdHNcbiAqIC0gTWFwcyBiZWNvbWUgcGxhaW4gb2JqZWN0cyB3aXRoIGFsbCBzdHJpbmcga2V5c1xuICogLSBSZXBlYXRlZCBmaWVsZHMgYmVjb21lIGFycmF5c1xuICogLSBOYU4gYW5kIEluZmluaXR5IGZvciBmbG9hdCBhbmQgZG91YmxlIGZpZWxkcyBiZWNvbWUgc3RyaW5nc1xuICpcbiAqIEB0eXBlIHtJQ29udmVyc2lvbk9wdGlvbnN9XG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9wcm90bzM/aGw9ZW4janNvblxuICovXG51dGlsLnRvSlNPTk9wdGlvbnMgPSB7XG4gICAgbG9uZ3M6IFN0cmluZyxcbiAgICBlbnVtczogU3RyaW5nLFxuICAgIGJ5dGVzOiBTdHJpbmcsXG4gICAganNvbjogdHJ1ZVxufTtcblxuLy8gU2V0cyB1cCBidWZmZXIgdXRpbGl0eSBhY2NvcmRpbmcgdG8gdGhlIGVudmlyb25tZW50IChjYWxsZWQgaW4gaW5kZXgtbWluaW1hbClcbnV0aWwuX2NvbmZpZ3VyZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBCdWZmZXIgPSB1dGlsLkJ1ZmZlcjtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIUJ1ZmZlcikge1xuICAgICAgICB1dGlsLl9CdWZmZXJfZnJvbSA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZSA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYmVjYXVzZSBub2RlIDQueCBidWZmZXJzIGFyZSBpbmNvbXBhdGlibGUgJiBpbW11dGFibGVcbiAgICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY29kZUlPL3Byb3RvYnVmLmpzL3B1bGwvNjY1XG4gICAgdXRpbC5fQnVmZmVyX2Zyb20gPSBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tICYmIEJ1ZmZlci5mcm9tIHx8XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGZ1bmN0aW9uIEJ1ZmZlcl9mcm9tKHZhbHVlLCBlbmNvZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIodmFsdWUsIGVuY29kaW5nKTtcbiAgICAgICAgfTtcbiAgICB1dGlsLl9CdWZmZXJfYWxsb2NVbnNhZmUgPSBCdWZmZXIuYWxsb2NVbnNhZmUgfHxcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZnVuY3Rpb24gQnVmZmVyX2FsbG9jVW5zYWZlKHNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyKHNpemUpO1xuICAgICAgICB9O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBXcml0ZXI7XG5cbnZhciB1dGlsICAgICAgPSByZXF1aXJlKFwiLi91dGlsL21pbmltYWxcIik7XG5cbnZhciBCdWZmZXJXcml0ZXI7IC8vIGN5Y2xpY1xuXG52YXIgTG9uZ0JpdHMgID0gdXRpbC5Mb25nQml0cyxcbiAgICBiYXNlNjQgICAgPSB1dGlsLmJhc2U2NCxcbiAgICB1dGY4ICAgICAgPSB1dGlsLnV0Zjg7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgd3JpdGVyIG9wZXJhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBVaW50OEFycmF5LCBudW1iZXIpfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0geyp9IHZhbCBWYWx1ZSB0byB3cml0ZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBPcChmbiwgbGVuLCB2YWwpIHtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGNhbGwuXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKFVpbnQ4QXJyYXksIG51bWJlciwgKil9XG4gICAgICovXG4gICAgdGhpcy5mbiA9IGZuO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgYnl0ZSBsZW5ndGguXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmxlbiA9IGxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgb3BlcmF0aW9uLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHRvIHdyaXRlLlxuICAgICAqIEB0eXBlIHsqfVxuICAgICAqL1xuICAgIHRoaXMudmFsID0gdmFsOyAvLyB0eXBlIHZhcmllc1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gbm9vcCgpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBzdGF0ZSBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgQ29waWVkIHdyaXRlciBzdGF0ZS5cbiAqIEBtZW1iZXJvZiBXcml0ZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtXcml0ZXJ9IHdyaXRlciBXcml0ZXIgdG8gY29weSBzdGF0ZSBmcm9tXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFN0YXRlKHdyaXRlcikge1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBoZWFkLlxuICAgICAqIEB0eXBlIHtXcml0ZXIuT3B9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gd3JpdGVyLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHRhaWwuXG4gICAgICogQHR5cGUge1dyaXRlci5PcH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB3cml0ZXIudGFpbDtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgYnVmZmVyIGxlbmd0aC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMubGVuID0gd3JpdGVyLmxlbjtcblxuICAgIC8qKlxuICAgICAqIE5leHQgc3RhdGUuXG4gICAgICogQHR5cGUge1N0YXRlfG51bGx9XG4gICAgICovXG4gICAgdGhpcy5uZXh0ID0gd3JpdGVyLnN0YXRlcztcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIGBVaW50OEFycmF5YCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBgQXJyYXlgLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFdyaXRlcigpIHtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgbGVuZ3RoLlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5sZW4gPSAwO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyBoZWFkLlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5oZWFkID0gbmV3IE9wKG5vb3AsIDAsIDApO1xuXG4gICAgLyoqXG4gICAgICogT3BlcmF0aW9ucyB0YWlsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnRhaWwgPSB0aGlzLmhlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBMaW5rZWQgZm9ya2VkIHN0YXRlcy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZXMgPSBudWxsO1xuXG4gICAgLy8gV2hlbiBhIHZhbHVlIGlzIHdyaXR0ZW4sIHRoZSB3cml0ZXIgY2FsY3VsYXRlcyBpdHMgYnl0ZSBsZW5ndGggYW5kIHB1dHMgaXQgaW50byBhIGxpbmtlZFxuICAgIC8vIGxpc3Qgb2Ygb3BlcmF0aW9ucyB0byBwZXJmb3JtIHdoZW4gZmluaXNoKCkgaXMgY2FsbGVkLiBUaGlzIGJvdGggYWxsb3dzIHVzIHRvIGFsbG9jYXRlXG4gICAgLy8gYnVmZmVycyBvZiB0aGUgZXhhY3QgcmVxdWlyZWQgc2l6ZSBhbmQgcmVkdWNlcyB0aGUgYW1vdW50IG9mIHdvcmsgd2UgaGF2ZSB0byBkbyBjb21wYXJlZFxuICAgIC8vIHRvIGZpcnN0IGNhbGN1bGF0aW5nIG92ZXIgb2JqZWN0cyBhbmQgdGhlbiBlbmNvZGluZyBvdmVyIG9iamVjdHMuIEluIG91ciBjYXNlLCB0aGUgZW5jb2RpbmdcbiAgICAvLyBwYXJ0IGlzIGp1c3QgYSBsaW5rZWQgbGlzdCB3YWxrIGNhbGxpbmcgb3BlcmF0aW9ucyB3aXRoIGFscmVhZHkgcHJlcGFyZWQgdmFsdWVzLlxufVxuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHJldHVybiB1dGlsLkJ1ZmZlclxuICAgICAgICA/IGZ1bmN0aW9uIGNyZWF0ZV9idWZmZXJfc2V0dXAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKFdyaXRlci5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGVfYnVmZmVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQnVmZmVyV3JpdGVyKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gY3JlYXRlX2FycmF5KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBXcml0ZXIoKTtcbiAgICAgICAgfTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB3cml0ZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJXcml0ZXJ8V3JpdGVyfSBBIHtAbGluayBCdWZmZXJXcml0ZXJ9IHdoZW4gQnVmZmVycyBhcmUgc3VwcG9ydGVkLCBvdGhlcndpc2UgYSB7QGxpbmsgV3JpdGVyfVxuICovXG5Xcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG5cbi8qKlxuICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIEJ1ZmZlciBzaXplXG4gKiBAcmV0dXJucyB7VWludDhBcnJheX0gQnVmZmVyXG4gKi9cbldyaXRlci5hbGxvYyA9IGZ1bmN0aW9uIGFsbG9jKHNpemUpIHtcbiAgICByZXR1cm4gbmV3IHV0aWwuQXJyYXkoc2l6ZSk7XG59O1xuXG4vLyBVc2UgVWludDhBcnJheSBidWZmZXIgcG9vbCBpbiB0aGUgYnJvd3NlciwganVzdCBsaWtlIG5vZGUgZG9lcyB3aXRoIGJ1ZmZlcnNcbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAodXRpbC5BcnJheSAhPT0gQXJyYXkpXG4gICAgV3JpdGVyLmFsbG9jID0gdXRpbC5wb29sKFdyaXRlci5hbGxvYywgdXRpbC5BcnJheS5wcm90b3R5cGUuc3ViYXJyYXkpO1xuXG4vKipcbiAqIFB1c2hlcyBhIG5ldyBvcGVyYXRpb24gdG8gdGhlIHF1ZXVlLlxuICogQHBhcmFtIHtmdW5jdGlvbihVaW50OEFycmF5LCBudW1iZXIsICopfSBmbiBGdW5jdGlvbiB0byBjYWxsXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEBwcml2YXRlXG4gKi9cbldyaXRlci5wcm90b3R5cGUuX3B1c2ggPSBmdW5jdGlvbiBwdXNoKGZuLCBsZW4sIHZhbCkge1xuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IE9wKGZuLCBsZW4sIHZhbCk7XG4gICAgdGhpcy5sZW4gKz0gbGVuO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gd3JpdGVCeXRlKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zXSA9IHZhbCAmIDI1NTtcbn1cblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQzMih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbCA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwgPj4+PSA3O1xuICAgIH1cbiAgICBidWZbcG9zXSA9IHZhbDtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgbmV3IHZhcmludCB3cml0ZXIgb3BlcmF0aW9uIGluc3RhbmNlLlxuICogQGNsYXNzZGVzYyBTY2hlZHVsZWQgdmFyaW50IHdyaXRlciBvcGVyYXRpb24uXG4gKiBAZXh0ZW5kcyBPcFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFZhbHVlIGJ5dGUgbGVuZ3RoXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsIFZhbHVlIHRvIHdyaXRlXG4gKiBAaWdub3JlXG4gKi9cbmZ1bmN0aW9uIFZhcmludE9wKGxlbiwgdmFsKSB7XG4gICAgdGhpcy5sZW4gPSBsZW47XG4gICAgdGhpcy5uZXh0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmFsID0gdmFsO1xufVxuXG5WYXJpbnRPcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9wLnByb3RvdHlwZSk7XG5WYXJpbnRPcC5wcm90b3R5cGUuZm4gPSB3cml0ZVZhcmludDMyO1xuXG4vKipcbiAqIFdyaXRlcyBhbiB1bnNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQzMiA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQzMih2YWx1ZSkge1xuICAgIC8vIGhlcmUsIHRoZSBjYWxsIHRvIHRoaXMucHVzaCBoYXMgYmVlbiBpbmxpbmVkIGFuZCBhIHZhcmludCBzcGVjaWZpYyBPcCBzdWJjbGFzcyBpcyB1c2VkLlxuICAgIC8vIHVpbnQzMiBpcyBieSBmYXIgdGhlIG1vc3QgZnJlcXVlbnRseSB1c2VkIG9wZXJhdGlvbiBhbmQgYmVuZWZpdHMgc2lnbmlmaWNhbnRseSBmcm9tIHRoaXMuXG4gICAgdGhpcy5sZW4gKz0gKHRoaXMudGFpbCA9IHRoaXMudGFpbC5uZXh0ID0gbmV3IFZhcmludE9wKFxuICAgICAgICAodmFsdWUgPSB2YWx1ZSA+Pj4gMClcbiAgICAgICAgICAgICAgICA8IDEyOCAgICAgICA/IDFcbiAgICAgICAgOiB2YWx1ZSA8IDE2Mzg0ICAgICA/IDJcbiAgICAgICAgOiB2YWx1ZSA8IDIwOTcxNTIgICA/IDNcbiAgICAgICAgOiB2YWx1ZSA8IDI2ODQzNTQ1NiA/IDRcbiAgICAgICAgOiAgICAgICAgICAgICAgICAgICAgIDUsXG4gICAgdmFsdWUpKS5sZW47XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9pbnQzMih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA8IDBcbiAgICAgICAgPyB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIDEwLCBMb25nQml0cy5mcm9tTnVtYmVyKHZhbHVlKSkgLy8gMTAgYnl0ZXMgcGVyIHNwZWNcbiAgICAgICAgOiB0aGlzLnVpbnQzMih2YWx1ZSk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIDMyIGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zaW50MzIgPSBmdW5jdGlvbiB3cml0ZV9zaW50MzIodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy51aW50MzIoKHZhbHVlIDw8IDEgXiB2YWx1ZSA+PiAzMSkgPj4+IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVWYXJpbnQ2NCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgd2hpbGUgKHZhbC5oaSkge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSAodmFsLmxvID4+PiA3IHwgdmFsLmhpIDw8IDI1KSA+Pj4gMDtcbiAgICAgICAgdmFsLmhpID4+Pj0gNztcbiAgICB9XG4gICAgd2hpbGUgKHZhbC5sbyA+IDEyNykge1xuICAgICAgICBidWZbcG9zKytdID0gdmFsLmxvICYgMTI3IHwgMTI4O1xuICAgICAgICB2YWwubG8gPSB2YWwubG8gPj4+IDc7XG4gICAgfVxuICAgIGJ1Zltwb3MrK10gPSB2YWwubG87XG59XG5cbi8qKlxuICogV3JpdGVzIGFuIHVuc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludC5cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnVpbnQ2NCA9IGZ1bmN0aW9uIHdyaXRlX3VpbnQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVWYXJpbnQ2NCwgYml0cy5sZW5ndGgoKSwgYml0cyk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCA2NCBiaXQgdmFsdWUgYXMgYSB2YXJpbnQuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLmludDY0ID0gV3JpdGVyLnByb3RvdHlwZS51aW50NjQ7XG5cbi8qKlxuICogV3JpdGVzIGEgc2lnbmVkIDY0IGJpdCB2YWx1ZSBhcyBhIHZhcmludCwgemlnLXphZyBlbmNvZGVkLlxuICogQHBhcmFtIHtMb25nfG51bWJlcnxzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYHZhbHVlYCBpcyBhIHN0cmluZyBhbmQgbm8gbG9uZyBsaWJyYXJ5IGlzIHByZXNlbnQuXG4gKi9cbldyaXRlci5wcm90b3R5cGUuc2ludDY0ID0gZnVuY3Rpb24gd3JpdGVfc2ludDY0KHZhbHVlKSB7XG4gICAgdmFyIGJpdHMgPSBMb25nQml0cy5mcm9tKHZhbHVlKS56ekVuY29kZSgpO1xuICAgIHJldHVybiB0aGlzLl9wdXNoKHdyaXRlVmFyaW50NjQsIGJpdHMubGVuZ3RoKCksIGJpdHMpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBib29saXNoIHZhbHVlIGFzIGEgdmFyaW50LlxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuYm9vbCA9IGZ1bmN0aW9uIHdyaXRlX2Jvb2wodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIHZhbHVlID8gMSA6IDApO1xufTtcblxuZnVuY3Rpb24gd3JpdGVGaXhlZDMyKHZhbCwgYnVmLCBwb3MpIHtcbiAgICBidWZbcG9zICAgIF0gPSAgdmFsICAgICAgICAgJiAyNTU7XG4gICAgYnVmW3BvcyArIDFdID0gIHZhbCA+Pj4gOCAgICYgMjU1O1xuICAgIGJ1Zltwb3MgKyAyXSA9ICB2YWwgPj4+IDE2ICAmIDI1NTtcbiAgICBidWZbcG9zICsgM10gPSAgdmFsID4+PiAyNDtcbn1cblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgMzIgYml0IHZhbHVlIGFzIGZpeGVkIDMyIGJpdHMuXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpeGVkMzIgPSBmdW5jdGlvbiB3cml0ZV9maXhlZDMyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCB2YWx1ZSA+Pj4gMCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHNpZ25lZCAzMiBiaXQgdmFsdWUgYXMgZml4ZWQgMzIgYml0cy5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zZml4ZWQzMiA9IFdyaXRlci5wcm90b3R5cGUuZml4ZWQzMjtcblxuLyoqXG4gKiBXcml0ZXMgYW4gdW5zaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAcGFyYW0ge0xvbmd8bnVtYmVyfHN0cmluZ30gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBgdmFsdWVgIGlzIGEgc3RyaW5nIGFuZCBubyBsb25nIGxpYnJhcnkgaXMgcHJlc2VudC5cbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0ID0gZnVuY3Rpb24gd3JpdGVfZml4ZWQ2NCh2YWx1ZSkge1xuICAgIHZhciBiaXRzID0gTG9uZ0JpdHMuZnJvbSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVGaXhlZDMyLCA0LCBiaXRzLmxvKS5fcHVzaCh3cml0ZUZpeGVkMzIsIDQsIGJpdHMuaGkpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBzaWduZWQgNjQgYml0IHZhbHVlIGFzIGZpeGVkIDY0IGJpdHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7TG9uZ3xudW1iZXJ8c3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGB2YWx1ZWAgaXMgYSBzdHJpbmcgYW5kIG5vIGxvbmcgbGlicmFyeSBpcyBwcmVzZW50LlxuICovXG5Xcml0ZXIucHJvdG90eXBlLnNmaXhlZDY0ID0gV3JpdGVyLnByb3RvdHlwZS5maXhlZDY0O1xuXG4vKipcbiAqIFdyaXRlcyBhIGZsb2F0ICgzMiBiaXQpLlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgVmFsdWUgdG8gd3JpdGVcbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZsb2F0ID0gZnVuY3Rpb24gd3JpdGVfZmxvYXQodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaCh1dGlsLmZsb2F0LndyaXRlRmxvYXRMRSwgNCwgdmFsdWUpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBkb3VibGUgKDY0IGJpdCBmbG9hdCkuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBWYWx1ZSB0byB3cml0ZVxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUuZG91YmxlID0gZnVuY3Rpb24gd3JpdGVfZG91YmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2godXRpbC5mbG9hdC53cml0ZURvdWJsZUxFLCA4LCB2YWx1ZSk7XG59O1xuXG52YXIgd3JpdGVCeXRlcyA9IHV0aWwuQXJyYXkucHJvdG90eXBlLnNldFxuICAgID8gZnVuY3Rpb24gd3JpdGVCeXRlc19zZXQodmFsLCBidWYsIHBvcykge1xuICAgICAgICBidWYuc2V0KHZhbCwgcG9zKTsgLy8gYWxzbyB3b3JrcyBmb3IgcGxhaW4gYXJyYXkgdmFsdWVzXG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgOiBmdW5jdGlvbiB3cml0ZUJ5dGVzX2Zvcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgYnVmW3BvcyArIGldID0gdmFsW2ldO1xuICAgIH07XG5cbi8qKlxuICogV3JpdGVzIGEgc2VxdWVuY2Ugb2YgYnl0ZXMuXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl8c3RyaW5nfSB2YWx1ZSBCdWZmZXIgb3IgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5ieXRlcyA9IGZ1bmN0aW9uIHdyaXRlX2J5dGVzKHZhbHVlKSB7XG4gICAgdmFyIGxlbiA9IHZhbHVlLmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAoIWxlbilcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1c2god3JpdGVCeXRlLCAxLCAwKTtcbiAgICBpZiAodXRpbC5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IFdyaXRlci5hbGxvYyhsZW4gPSBiYXNlNjQubGVuZ3RoKHZhbHVlKSk7XG4gICAgICAgIGJhc2U2NC5kZWNvZGUodmFsdWUsIGJ1ZiwgMCk7XG4gICAgICAgIHZhbHVlID0gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy51aW50MzIobGVuKS5fcHVzaCh3cml0ZUJ5dGVzLCBsZW4sIHZhbHVlKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHdyaXRlXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5zdHJpbmcgPSBmdW5jdGlvbiB3cml0ZV9zdHJpbmcodmFsdWUpIHtcbiAgICB2YXIgbGVuID0gdXRmOC5sZW5ndGgodmFsdWUpO1xuICAgIHJldHVybiBsZW5cbiAgICAgICAgPyB0aGlzLnVpbnQzMihsZW4pLl9wdXNoKHV0Zjgud3JpdGUsIGxlbiwgdmFsdWUpXG4gICAgICAgIDogdGhpcy5fcHVzaCh3cml0ZUJ5dGUsIDEsIDApO1xufTtcblxuLyoqXG4gKiBGb3JrcyB0aGlzIHdyaXRlcidzIHN0YXRlIGJ5IHB1c2hpbmcgaXQgdG8gYSBzdGFjay5cbiAqIENhbGxpbmcge0BsaW5rIFdyaXRlciNyZXNldHxyZXNldH0gb3Ige0BsaW5rIFdyaXRlciNsZGVsaW18bGRlbGltfSByZXNldHMgdGhlIHdyaXRlciB0byB0aGUgcHJldmlvdXMgc3RhdGUuXG4gKiBAcmV0dXJucyB7V3JpdGVyfSBgdGhpc2BcbiAqL1xuV3JpdGVyLnByb3RvdHlwZS5mb3JrID0gZnVuY3Rpb24gZm9yaygpIHtcbiAgICB0aGlzLnN0YXRlcyA9IG5ldyBTdGF0ZSh0aGlzKTtcbiAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBuZXcgT3Aobm9vcCwgMCwgMCk7XG4gICAgdGhpcy5sZW4gPSAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXNldHMgdGhpcyBpbnN0YW5jZSB0byB0aGUgbGFzdCBzdGF0ZS5cbiAqIEByZXR1cm5zIHtXcml0ZXJ9IGB0aGlzYFxuICovXG5Xcml0ZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuaGVhZCAgID0gdGhpcy5zdGF0ZXMuaGVhZDtcbiAgICAgICAgdGhpcy50YWlsICAgPSB0aGlzLnN0YXRlcy50YWlsO1xuICAgICAgICB0aGlzLmxlbiAgICA9IHRoaXMuc3RhdGVzLmxlbjtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSB0aGlzLnN0YXRlcy5uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG5ldyBPcChub29wLCAwLCAwKTtcbiAgICAgICAgdGhpcy5sZW4gID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlc2V0cyB0byB0aGUgbGFzdCBzdGF0ZSBhbmQgYXBwZW5kcyB0aGUgZm9yayBzdGF0ZSdzIGN1cnJlbnQgd3JpdGUgbGVuZ3RoIGFzIGEgdmFyaW50IGZvbGxvd2VkIGJ5IGl0cyBvcGVyYXRpb25zLlxuICogQHJldHVybnMge1dyaXRlcn0gYHRoaXNgXG4gKi9cbldyaXRlci5wcm90b3R5cGUubGRlbGltID0gZnVuY3Rpb24gbGRlbGltKCkge1xuICAgIHZhciBoZWFkID0gdGhpcy5oZWFkLFxuICAgICAgICB0YWlsID0gdGhpcy50YWlsLFxuICAgICAgICBsZW4gID0gdGhpcy5sZW47XG4gICAgdGhpcy5yZXNldCgpLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pIHtcbiAgICAgICAgdGhpcy50YWlsLm5leHQgPSBoZWFkLm5leHQ7IC8vIHNraXAgbm9vcFxuICAgICAgICB0aGlzLnRhaWwgPSB0YWlsO1xuICAgICAgICB0aGlzLmxlbiArPSBsZW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBGaW5pc2hlcyB0aGUgd3JpdGUgb3BlcmF0aW9uLlxuICogQHJldHVybnMge1VpbnQ4QXJyYXl9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5Xcml0ZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZC5uZXh0LCAvLyBza2lwIG5vb3BcbiAgICAgICAgYnVmICA9IHRoaXMuY29uc3RydWN0b3IuYWxsb2ModGhpcy5sZW4pLFxuICAgICAgICBwb3MgID0gMDtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgICBoZWFkLmZuKGhlYWQudmFsLCBidWYsIHBvcyk7XG4gICAgICAgIHBvcyArPSBoZWFkLmxlbjtcbiAgICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICB9XG4gICAgLy8gdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICByZXR1cm4gYnVmO1xufTtcblxuV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbihCdWZmZXJXcml0ZXJfKSB7XG4gICAgQnVmZmVyV3JpdGVyID0gQnVmZmVyV3JpdGVyXztcbiAgICBXcml0ZXIuY3JlYXRlID0gY3JlYXRlKCk7XG4gICAgQnVmZmVyV3JpdGVyLl9jb25maWd1cmUoKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gQnVmZmVyV3JpdGVyO1xuXG4vLyBleHRlbmRzIFdyaXRlclxudmFyIFdyaXRlciA9IHJlcXVpcmUoXCIuL3dyaXRlclwiKTtcbihCdWZmZXJXcml0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShXcml0ZXIucHJvdG90eXBlKSkuY29uc3RydWN0b3IgPSBCdWZmZXJXcml0ZXI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC9taW5pbWFsXCIpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBuZXcgYnVmZmVyIHdyaXRlciBpbnN0YW5jZS5cbiAqIEBjbGFzc2Rlc2MgV2lyZSBmb3JtYXQgd3JpdGVyIHVzaW5nIG5vZGUgYnVmZmVycy5cbiAqIEBleHRlbmRzIFdyaXRlclxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlcldyaXRlcigpIHtcbiAgICBXcml0ZXIuY2FsbCh0aGlzKTtcbn1cblxuQnVmZmVyV3JpdGVyLl9jb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQWxsb2NhdGVzIGEgYnVmZmVyIG9mIHRoZSBzcGVjaWZpZWQgc2l6ZS5cbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBCdWZmZXIgc2l6ZVxuICAgICAqIEByZXR1cm5zIHtCdWZmZXJ9IEJ1ZmZlclxuICAgICAqL1xuICAgIEJ1ZmZlcldyaXRlci5hbGxvYyA9IHV0aWwuX0J1ZmZlcl9hbGxvY1Vuc2FmZTtcblxuICAgIEJ1ZmZlcldyaXRlci53cml0ZUJ5dGVzQnVmZmVyID0gdXRpbC5CdWZmZXIgJiYgdXRpbC5CdWZmZXIucHJvdG90eXBlIGluc3RhbmNlb2YgVWludDhBcnJheSAmJiB1dGlsLkJ1ZmZlci5wcm90b3R5cGUuc2V0Lm5hbWUgPT09IFwic2V0XCJcbiAgICAgICAgPyBmdW5jdGlvbiB3cml0ZUJ5dGVzQnVmZmVyX3NldCh2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgICAgICAgYnVmLnNldCh2YWwsIHBvcyk7IC8vIGZhc3RlciB0aGFuIGNvcHkgKHJlcXVpcmVzIG5vZGUgPj0gNCB3aGVyZSBCdWZmZXJzIGV4dGVuZCBVaW50OEFycmF5IGFuZCBzZXQgaXMgcHJvcGVybHkgaW5oZXJpdGVkKVxuICAgICAgICAgIC8vIGFsc28gd29ya3MgZm9yIHBsYWluIGFycmF5IHZhbHVlc1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIDogZnVuY3Rpb24gd3JpdGVCeXRlc0J1ZmZlcl9jb3B5KHZhbCwgYnVmLCBwb3MpIHtcbiAgICAgICAgICBpZiAodmFsLmNvcHkpIC8vIEJ1ZmZlciB2YWx1ZXNcbiAgICAgICAgICAgIHZhbC5jb3B5KGJ1ZiwgcG9zLCAwLCB2YWwubGVuZ3RoKTtcbiAgICAgICAgICBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDspIC8vIHBsYWluIGFycmF5IHZhbHVlc1xuICAgICAgICAgICAgYnVmW3BvcysrXSA9IHZhbFtpKytdO1xuICAgICAgICB9O1xufTtcblxuXG4vKipcbiAqIEBvdmVycmlkZVxuICovXG5CdWZmZXJXcml0ZXIucHJvdG90eXBlLmJ5dGVzID0gZnVuY3Rpb24gd3JpdGVfYnl0ZXNfYnVmZmVyKHZhbHVlKSB7XG4gICAgaWYgKHV0aWwuaXNTdHJpbmcodmFsdWUpKVxuICAgICAgICB2YWx1ZSA9IHV0aWwuX0J1ZmZlcl9mcm9tKHZhbHVlLCBcImJhc2U2NFwiKTtcbiAgICB2YXIgbGVuID0gdmFsdWUubGVuZ3RoID4+PiAwO1xuICAgIHRoaXMudWludDMyKGxlbik7XG4gICAgaWYgKGxlbilcbiAgICAgICAgdGhpcy5fcHVzaChCdWZmZXJXcml0ZXIud3JpdGVCeXRlc0J1ZmZlciwgbGVuLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiB3cml0ZVN0cmluZ0J1ZmZlcih2YWwsIGJ1ZiwgcG9zKSB7XG4gICAgaWYgKHZhbC5sZW5ndGggPCA0MCkgLy8gcGxhaW4ganMgaXMgZmFzdGVyIGZvciBzaG9ydCBzdHJpbmdzIChwcm9iYWJseSBkdWUgdG8gcmVkdW5kYW50IGFzc2VydGlvbnMpXG4gICAgICAgIHV0aWwudXRmOC53cml0ZSh2YWwsIGJ1ZiwgcG9zKTtcbiAgICBlbHNlIGlmIChidWYudXRmOFdyaXRlKVxuICAgICAgICBidWYudXRmOFdyaXRlKHZhbCwgcG9zKTtcbiAgICBlbHNlXG4gICAgICAgIGJ1Zi53cml0ZSh2YWwsIHBvcyk7XG59XG5cbi8qKlxuICogQG92ZXJyaWRlXG4gKi9cbkJ1ZmZlcldyaXRlci5wcm90b3R5cGUuc3RyaW5nID0gZnVuY3Rpb24gd3JpdGVfc3RyaW5nX2J1ZmZlcih2YWx1ZSkge1xuICAgIHZhciBsZW4gPSB1dGlsLkJ1ZmZlci5ieXRlTGVuZ3RoKHZhbHVlKTtcbiAgICB0aGlzLnVpbnQzMihsZW4pO1xuICAgIGlmIChsZW4pXG4gICAgICAgIHRoaXMuX3B1c2god3JpdGVTdHJpbmdCdWZmZXIsIGxlbiwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIEZpbmlzaGVzIHRoZSB3cml0ZSBvcGVyYXRpb24uXG4gKiBAbmFtZSBCdWZmZXJXcml0ZXIjZmluaXNoXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IEZpbmlzaGVkIGJ1ZmZlclxuICovXG5cbkJ1ZmZlcldyaXRlci5fY29uZmlndXJlKCk7XG4iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gcmVxdWlyZSgnLi4vdGVzdC90ZXN0Jyk7IC8vIHJ1biB0ZXN0LnRzXG5pbXBvcnQgeyBjcmR0cywgbmV0d29yayB9IGZyb20gJ2NvbXBvdmVudHVhbHMtY2xpZW50JztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcblxuLyoqXG4gKiBHZXQgSGVyb2t1IHNlcnZlciBob3N0IFdlYnNvY2tldC5cbiAqL1xudmFyIEhPU1QgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKVxuXG4vKipcbiAqIEdlbmVyYXRlIHV1aWQgZm9yIGVhY2ggY2xpZW50LlxuICovXG5jb25zdCBjbGllbnRfdXVpZCA6IHN0cmluZyA9IHV1aWQoKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDUkRUcycgUnVudGltZSBvbiBlYWNoIGNsaWVudCBhbmQgY3JlYXRlIENSRFRzIChlLmcuIENvdW50ZXJDcmR0KS5cbiAqL1xubGV0IGNsaWVudCA9IG5ldyBjcmR0cy5DcmR0UnVudGltZShuZXcgbmV0d29yay5XZWJTb2NrZXROZXR3b3JrKGNsaWVudF91dWlkLCBIT1NUKSk7XG4vL2xldCBjbGllbnRDb3VudGVyID0gbmV3IGNyZHRzLkNvdW50ZXJDcmR0KFwiY291bnRlcklkXCIsIGNsaWVudCk7XG5sZXQgY2xpZW50Q291bnRlciA9IG5ldyBjcmR0cy5Db3VudGVyQ3JkdChjbGllbnQsIFwiY291bnRlcklkXCIpO1xuXG4vKiBIVE1MIHZhcmlhYmxlcyAqL1xudmFyIGNvdW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50ZXJcIik7XG5cbi8qIEN1c3RvbWl6ZSB0aGUgZXZlbnQgbGlzdGVuZXIgZm9yIENSRFQgYXMgcmVmcmVzaCB0aGUgdmFsdWUgKi9cbmNsaWVudENvdW50ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIkFkZFwiLCBfID0+IHtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59KTtcblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBpbmNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5jcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGluY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgxMDApO1xuICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbn1cblxuLyogQ3VzdG9taXplIG9uY2xpY2soKSBmdW5jdGlvbiBvZiBkZWNyZW1lbnQgYnV0dG9uIHdpdGggQ1JEVCBvcGVyYXRpb24gKi9cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVjcmVtZW50XCIpIS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJjbGlja2VkIGRlY3JlbWVudFwiKTtcbiAgICBjbGllbnRDb3VudGVyLmFkZCgtMTAwKTtcbiAgICBjb3VudGVyIS5pbm5lckhUTUwgPSBjbGllbnRDb3VudGVyLnZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbi8vIC8qIEN1c3RvbWl6ZSBvbmNsaWNrKCkgZnVuY3Rpb24gb2Ygc3luYyB0byBzeW5jaHJvbml6ZSB0aGUgdmFsdWUgKi9cbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3luY1wiKSEub25jbGljayA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvdW50ZXIhLmlubmVySFRNTCA9IGNsaWVudENvdW50ZXIudmFsdWUudG9TdHJpbmcoKTtcbi8vIH1cbiJdLCJzb3VyY2VSb290IjoiIn0=