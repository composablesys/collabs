import { CausalTimestamp } from "../network";
import { CounterMessage, MultRegisterMessage } from "../proto_compiled";
import { AddEvent, CounterCrdt, MultEvent, MultRegisterCrdt, NumberState } from "./basic_crdts";
import { Crdt, CrdtEvent, CrdtRuntime } from "./crdt_core";
import { SemidirectProduct } from "./semidirect";

// TODO: make resettable
export class NumberCrdt extends SemidirectProduct<NumberState> {
    private addCrdt: CounterCrdt;
    private multCrdt: MultRegisterCrdt;
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 0
    ) {
        super(parentOrRuntime, id);
        this.addCrdt = new CounterCrdt(this, "add", 0/*, false*/);
        this.multCrdt = new MultRegisterCrdt(this, "mult", 0/*, false*/);
        super.setup(
            this.addCrdt, this.multCrdt,
            this.action.bind(this),
            new NumberState(initialValue)
        )
        this.addCrdt.addEventListener(
            "Add", (event: CrdtEvent) => {
                super.dispatchEvent(new AddEvent(
                    this, event.timestamp,
                    (event as AddEvent).valueAdded
                ))
            },
            true
        );
        this.multCrdt.addEventListener(
            "Mult", (event: CrdtEvent) => {
                super.dispatchEvent(new MultEvent(
                    this, event.timestamp,
                    (event as MultEvent).valueMulted
                ))
            },
            true
        );
    }

    action(
        _m2TargetPath: string[],
        _m2Timestamp: CausalTimestamp | null,
        m2Message: Uint8Array,
        _m1TargetPath: string[],
        _m1Timestamp: CausalTimestamp,
        m1Message: Uint8Array
    ): [string[], Uint8Array] | null {
        try {
            let m2Decoded = MultRegisterMessage.decode(m2Message);
            let m1Decoded = CounterMessage.decode(m1Message);
            let acted = CounterMessage.create({toAdd: m2Decoded.toMult * m1Decoded.toAdd});
            return [[], CounterMessage.encode(acted).finish()]
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return null;
        }
    }

    add(n: number) {
        this.addCrdt.add(n);
    }

    mult(n: number) {
        this.multCrdt.mult(n);
    }

    get value(): number {
        return this.state.internalState.value;
    }
}

//
// function positiveMod(a: number, b: number) {
//     if (a >= 0) return a % b;
//     else return b - ((-a) % b);
// }
//
// class OrthogonalRotationInternal implements CrdtInternal<[number, boolean]> {
//     create(initialData?: [number, boolean]): [number, boolean] {
//         if (initialData === undefined) return [0, false];
//         else return initialData;
//     }
//     prepare(operation: number, _state: [number, boolean], _replicaId: any) {
//         return positiveMod(operation, 2*Math.PI);
//     }
//     effect(message: number, state: [number, boolean], _replicaId: any, _timestamp: CausalTimestamp): [[number, boolean], number] {
//         return [[positiveMod(state[0] + message, 2*Math.PI), state[1]], message];
//     }
//     static instance = new OrthogonalRotationInternal();
// }
//
// class OrthogonalReflectionInternal implements CrdtInternal<[number, boolean]> {
//     create(_initialData?: [number, boolean]): [number, boolean] {
//         throw new Error("Not implemented");
//     }
//     prepare(operation: string, _state: [number, boolean], _replicaId: any) {
//         if (operation !== "reflect") throw new Error("Unrecognized operation: " + operation);
//         return "reflect";
//     }
//     effect(message: string, state: [number, boolean], _replicaId: any, _timestamp: CausalTimestamp): [[number, boolean], string] {
//         if (message !== "reflect") throw new Error("Unrecognized message: " + message);
//         // Reflection operation is multiplying on the left,
//         // so to put it in canonical form (g1, g2), we have to
//         // commute it with the current g1 (rotation) value by
//         // acting on it.
//         return [[positiveMod(-state[0], 2*Math.PI), !state[1]], "reflect"];
//     }
//     static instance = new OrthogonalReflectionInternal();
// }
//
// /**
//  * Crdt for the 2-dimensional orthogonal group, which allows
//  * rotations and reflections (about the origin) of an object in the
//  * plane.  Example usage: rotating and reflecting objects in
//  * Powerpoint.
//  *
//  * State is stored as the canonical element of the semidirect
//  * product group, i.e., in the form (g1, g2) for g1 in the rotation
//  * group (reals mod 2pi) and g2 in the reflection group (booleans
//  * with true for 1 and false for 0).
//  */
// export class OrthogonalCrdt extends DefaultResettableCrdt<SemidirectState<[number, boolean]>> {
//     static semidirectInstance = new SemidirectInternal<[number, boolean]>(
//         OrthogonalRotationInternal.instance, OrthogonalReflectionInternal.instance,
//         (_m2: string, m1: number) => -m1, 1
//     );
//     constructor(id: any, runtime: CrdtRuntime,
//             initialValue: [number, boolean] = [0, false],
//             resetValue: [number, boolean] = [0, false]) {
//         super(id, OrthogonalCrdt.semidirectInstance, resetValue, runtime, initialValue);
//     }
//     /**
//      * Angle is in radians CCW.
//      */
//     rotate(angle: number) {
//         this.applyOp([1, angle]);
//     }
//     reflectHorizontalAxis() {
//         this.applyOp([2, "reflect"]);
//     }
//     reflectVerticalAxis() {
//         this.reflect(Math.PI/2);
//     }
//     reflect(angleAxis: number) {
//         this.startTransaction();
//         this.rotate(-angleAxis);
//         this.reflectHorizontalAxis();
//         this.rotate(angleAxis);
//         this.endTransaction();
//     }
//     /**
//      * The current state is given by: reflect across the x-axis
//      * if reflected is true, then rotate by angle (CCW, in radians).
//      */
//      get reflected(): boolean {
//          return this.originalStateResettable.internalState[1];
//      }
//      /**
//       * The current state is given by: reflect across the x-axis
//       * if reflected is true, then rotate by angle (CCW, in radians).
//       */
//      get angle(): number {
//          return this.originalStateResettable.internalState[0];
//      }
//      /**
//       * [reflected, angle]
//       */
//      get value(): [number, boolean] {
//          return [this.angle, this.reflected];
//      }
//      /**
//       * Performs an equivalent reset-then-set.
//       */
//      set value(newValue: [number, boolean]) {
//          this.startTransaction();
//          this.reset();
//          this.rotate(newValue[0]);
//          if (newValue[1]) this.reflectHorizontalAxis();
//          this.endTransaction();
//      }
//      // TODO: matrix versions of get and set.
//      // /**
//      //  * @return The current transformation as a 2x2 orthogonal
//      //  * matrix.
//      //  */
//      // get matrix(): [[number, number], [number, number]] {
//      //
//      // }
//
//     protected translateDescriptionsResettable(_descriptions: Array<[number | string, number]>) {
//         // TODO.  Just returns the resulting state for now.
//         return this.value;
//         // if (descriptions.length === 2) {
//         //     // Transaction due to set value, return the resulting state
//         //     return ["set", descriptions[1][1]];
//         // }
//         // let description = descriptions[0];
//         // if (description[0] === 1) return ["add", description[1]];
//         // else if (description[0] === 1) return ["mult", description[1]];
//         // else return [description[0] as string, this.value]; // resets
//     }
// }
//
// /**
//  * CrdtInternal which uses any string as an operation/message
//  * which does nothing.  Unlike using null messages to indicate that
//  * nothing happened, the noop message is an explicit non-null
//  * string supplied as the operation.
//  *
//  * Two use cases:
//  * - To unreset a state (e.g. in EnableWinsFlag below).
//  * - As a "header" for sequence of operations passed to applyOps,
//  * so that recipients can know what end-user operation the sequence
//  * corresponds to.
//  */
// export class NoOpCrdtInternal<S> implements CrdtInternal<S> {
//     constructor(public createFunc?: (initialData: any) => S) {}
//     create(initialData?: any): S {
//         if (this.createFunc) return this.createFunc(initialData);
//         else throw new Error("CreateFunc not supplied");
//     }
//     prepare(operation: string, _state: S) {
//         return operation;
//     }
//     /**
//      * The returned description is the original operation.
//      */
//     effect(message: string, state: S, _replicaId: any, _timestamp: CausalTimestamp): [S, string] {
//         return [state, message];
//     }
//
//     static addTo<S>(originalCrdt: CrdtInternal<S>) {
//         return new DirectInternal<S>(originalCrdt,
//             new NoOpCrdtInternal<S>(), 1
//         );
//     }
// }
//
// export class EnableWinsFlag extends DefaultResettableCrdt<null> {
//     constructor(id: any, runtime: CrdtRuntime) {
//         super(id, new NoOpCrdtInternal(() => null), null,
//             runtime, undefined, true);
//     }
//     enable() {
//         this.applyOp("e");
//     }
//     disable() {
//         this.reset();
//     }
//     disableStrong() {
//         this.resetStrong();
//     }
//     get enabled() : boolean {
//         return !this.state.internalState.isHistoryEmpty();
//     }
//     set enabled(newValue: boolean) {
//         if (newValue) this.enable();
//         else this.disable();
//     }
//     get value() {
//         return this.enabled;
//     }
//     set value(newValue: boolean) {
//         // Note this is equivalent to doing a reset before setting
//         // to newValue, in either case, since any message obviates
//         // causally lesser messages.
//         this.enabled = newValue;
//     }
//     // TODO: would also like to translate observed-resets to
//     // disable (but only if it actually worked).  Perhaps add noop indicator out front?
//     // (Need to add a no-op crdt at the top level)
//     protected translateDescriptionsResettable(descriptions: Array<string>): string {
//         if (descriptions.length === 1 && descriptions[0] === "e") {
//             return "enable";
//         }
//         else if (descriptions.length === 1 && descriptions[0][0] === "reset") {
//             return "disable";
//         }
//         else if (descriptions.length === 1 && descriptions[0][0] === "resetStrong") {
//             return "disableStrong";
//         }
//         else {
//             throw new Error("Unrecognized descriptions: " +
//                 JSON.stringify(descriptions))
//         }
//     }
// }
//
//
// export class DisableWinsFlag extends DefaultResettableCrdt<null> {
//     constructor(id: any, runtime: CrdtRuntime) {
//         super(id, new NoOpCrdtInternal(() => null), null,
//             runtime, undefined, true);
//     }
//     enable() {
//         this.reset();
//     }
//     enableStrong() {
//         this.resetStrong();
//     }
//     disable() {
//         this.applyOp("d");
//     }
//     get enabled() : boolean {
//         return this.state.internalState.isHistoryEmpty();
//     }
//     set enabled(newValue: boolean) {
//         if (newValue) this.enable();
//         else this.disable();
//     }
//     get value() {
//         return this.enabled;
//     }
//     set value(newValue: boolean) {
//         // Note this is equivalent to doing a reset before setting
//         // to newValue, in either case, since any message obviates
//         // causally lesser messages.
//         this.enabled = newValue;
//     }
//     // TODO: would also like to translate observed-resets to
//     // enable (but only if it actually worked).  Perhaps add noop indicator out front?
//     // (Need to add a no-op crdt at the top level)
//     protected translateDescriptionsResettable(descriptions: Array<string>): string {
//         if (descriptions.length === 1 && descriptions[0] === "d") {
//             return "disable";
//         }
//         else if (descriptions.length === 1 && descriptions[0][0] === "reset") {
//             return "enable";
//         }
//         else if (descriptions.length === 1 && descriptions[0][0] === "resetStrong") {
//             return "enableStrong";
//         }
//         else {
//             throw new Error("Unrecognized descriptions: " +
//                 JSON.stringify(descriptions))
//         }
//     }
// }
//
//
//
// export class GMapInternal<K, C extends Crdt<any>> implements CrdtInternal<Map<K, C>> {
//     /**
//      * [constructor description]
//      * @param valueCrdtInternal [description]
//      * @param shouldGc Given a value state, return whether it is safe
//      * to garbage collect it, removing its key-value pair from the
//      * map.  For correctness, if shouldGc(valueState) is true, then
//      * valueState must be identical to valueCrdtInternal.create(valueInitialData);
//      * and if shouldGc is nontrivial, then users should keep in
//      * mind that state.has(key) is not reliable, since it may be
//      * false even after key has been initialized because the value
//      * has been garbage collected.
//      */
//     constructor(public readonly shouldGc: (valueState: C) => boolean = (() => false)) {
//     }
//     /**
//      * TODO.  Needs to be set.  Allow it to be set outside constructor
//      * because CrdtObject needs to call super before it can set this.
//      */
//     public initFactory!: (key: K) => C;
//     create(_initialData?: any): Map<K, C> {
//         return new Map<K, C>();
//     }
//     /**
//      * Operations:
//      * - ["apply", key, C message]: applies the C message to
//      * the given key, initializing the key if needed.
//      * - ["applySkip", key, C message]: applies the C message to
//      * the given key, except for their sender, who is assumed
//      * to have already applied the message.  This is used by
//      * CrdtValuedGrowOnlyMapInternal, whose messages are
//      * sometimes derived from values applying messages to
//      * themselves.  TODO: in principle can optimize so we
//      * don't have to send "skip" over the network.
//      * - ["init", key]: initializes the given key using initFactory
//      * if it is not already present in the map.
//      * - ["reset"]: resets every value in the map (using
//      * each value's getUniversalResetOperation()).
//      */
//     prepare(operation: [string, K, any], state: Map<K, C>, _replicaId: any): [string, K?, any?] {
//         let key = operation[1];
//         switch (operation[0]) {
//             case "apply":
//                 return ["apply", key, operation[2]];
//             case "applySkip":
//                 return ["applySkip", key, operation[2]];
//             case "init":
//                 if (!state.has(key)) return ["init", key];
//             case "reset": return ["reset"];
//             default:
//                 throw new Error("Unrecognized operation: " + JSON.stringify(operation));
//         }
//     }
//     /**
//      * In addition to the message output by prepare, we have
//      * messages (arising through semdirect product):
//      * - ["initReset", key]: does ["init", key] followed by
//      * delivering a reset message to the key.
//      * - ["initResetStrong", key]: does ["init", key] followed
//      * by delivering a reset-strong message to the key.
//      *
//      * Description format:
//      * - for an apply/applySkip operation:
//      * null (TODO)
//      * - for an init operation: null if the key already existed,
//      * otherwise ["init", key]
//      * - for a reset operation: ["reset"] (TODO: descriptions from
//      * reset keys)
//      */
//     effect(message: [string, K, any?], state: Map<K, C>,
//             replicaId: any, timestamp: CausalTimestamp):
//             [Map<K, C>, [string, K?, any?] | null] {
//         let key = message[1];
//         switch (message[0]) {
//             case "applySkip":
//                 if (replicaId === timestamp.getSender()) {
//                     // Skip applying it to the state.
//                     // We can still gc, though, in case the
//                     // already-applied message has made it
//                     // gc-able.
//                     let keyState = state.get(key);
//                     if (keyState !== undefined &&
//                             this.shouldGc(keyState)) {
//                         state.delete(key);
//                     }
//                     return [state, null];
//                 }
//                 // Otherwise fall through.
//             case "apply":{
//                 let keyState = state.get(key);
//                 if (keyState === undefined) {
//                     keyState = this.initFactory(key);
//                 }
//                 keyState.receive(message[2], timestamp);
//                 if (this.shouldGc(keyState)) {
//                     state.delete(key);
//                 }
//                 return [state, null];}
//             case "init":
//                 if (state.has(key)) return [state, null];
//                 else {
//                     let initState = this.initFactory(key);
//                     if (!this.shouldGc(initState)) {
//                         state.set(key, initState);
//                     }
//                     return [state, ["init", key]];
//                 }
//             case "reset":
//                 for (let entry of state.entries()) {
//                     let resetMessage = entry[1].getUniversalResetMessage();
//                     if (resetMessage !== null) entry[1].receive([resetMessage], timestamp);
//                     if (this.shouldGc(entry[1])) {
//                         state.delete(entry[0]);
//                     }
//                 }
//                 return [state, ["reset"]];
//             default:
//                 throw new Error("Unrecognized message: " + JSON.stringify(message));
//         }
//     }
// }
//
//
// /**
//  * Convenient representation of a Crdt-valued grow-only map.
//  *
//  * TODO: Somewhere: note that initial values of properties must be
//  * a function of their key only (so can't have varying types or
//  * initial data).
//  *
//  * N is the type of member names (typically string).
//  */
// export class CrdtObject<N, C extends Crdt<any>> extends Crdt<Map<N, C>> implements CrdtRuntime {
//     static defaultPropertyFactory = () => {
//         throw new Error("Dynamically created properties are only " +
//                 "allowed if propertyFactory is passed to the " +
//                 "CrdtObject constructor");
//     };
//     /**
//      * TODO: predefined vs dynamic property creation.  Predefined ones
//      * have to be created identically on all replicas in
//      * between startPredefinedPropertyCreation() and
//      * endPredefinedPropertyCreation(), ideally in the constructor. They
//      * are not synced (for efficiency and to save the trouble
//      * of specifying propertyFactory).  Dynamic properties
//      * can only be created through init.
//      *
//      * @param id              [description]
//      * @param runtime         [description]
//      * @param propertyFactory [description]
//      */
//     constructor(id: any, runtime: CrdtRuntime,
//             propertyFactory: (name: N, internalRuntime: CrdtRuntime) => C
//             = CrdtObject.defaultPropertyFactory) {
//         // TODO: gc ability
//         let crdtInternal = new GMapInternal<N, C>();
//         super(id, crdtInternal, runtime);
//         crdtInternal.initFactory = (key: N) => {
//             this.inInit = true;
//             let result = propertyFactory(key, this);
//             this.inInit = false;
//             return result;
//         };
//         this.inPredefinedPropertyCreation = false;
//         this.inInit = false;
//     }
//
//     private inPredefinedPropertyCreation: boolean;
//     startPredefinedPropertyCreation() {
//         this.inPredefinedPropertyCreation = true;
//     }
//     endPredefinedPropertyCreation() {
//         this.inPredefinedPropertyCreation = false;
//     }
//     private inInit: boolean;
//     register(crdt: C, name: N): void {
//         if (!(this.inPredefinedPropertyCreation || this.inInit)) {
//             throw new Error("Properties can only be directly " +
//                 "registered between startPredefinedPropertyCreation() " +
//                 "and endPredefinedPropertyCreation().  Dynamic properties " +
//                 "must be created with init(name).");
//         }
//         if (this.state.has(name)) {
//             throw new Error("Duplicate property name: " + name);
//         }
//         this.state.set(name, crdt);
//         // Skip sending an init message about it.  Okay because of the
//         // predefined initialization contract.
//     }
//     /**
//      * @param  name [description]
//      * @return      The initialized Crdt.
//      */
//     initProperty(name: N): C {
//         let currentValue = this.state.get(name);
//         if (currentValue !== undefined) return currentValue;
//         else {
//             this.applyOp(["init", name]);
//             return this.state.get(name) as C;
//         }
//     }
//     reset() {
//         this.applyOp(this.getUniversalResetMessage());
//     }
//     getUniversalResetMessage() {
//         return ["reset"];
//     }
//
//     getProperty(name: N): C | undefined {
//         return this.state.get(name);
//     }
//     propertyNames() {
//         return this.state.keys();
//     }
//     propertyValues() {
//         return this.state.values();
//     }
//     propertyEntries() {
//         return this.state.entries();
//     }
//
//     send(message: any, name: N): void {
//         // Convert into an applySkip message for the map value
//         // at name.  Here we want to skip because
//         // our replica's value has already applied the
//         // operation internally.
//         this.applyOp(["applySkip", name, message]);
//     }
//
//     getReplicaId() {
//         return this.runtime.getReplicaId();
//     }
//     getNextTimestamp(_crdtId: any): CausalTimestamp {
//         return this.runtime.getNextTimestamp(this.id);
//     }
// }
//
// export class AddWinsSet<T> extends CrdtObject<T, EnableWinsFlag> {
//     constructor(id: any, runtime: CrdtRuntime) {
//         // TODO: add gc once we have transactions
//         super(id, runtime, (name: T, internalRuntime: CrdtRuntime) =>
//                 new EnableWinsFlag(name, internalRuntime));
//     }
//     add(value: T) {
//         this.startTransaction();
//         this.initProperty(value).enable();
//         this.endTransaction();
//     }
//     delete(value: T) {
//         if (this.has(value)) {
//             (this.getProperty(value) as EnableWinsFlag).disable();
//         }
//     }
//     deleteStrong(value: T) {
//         if (this.has(value)) {
//             (this.getProperty(value) as EnableWinsFlag).resetStrong();
//         }
//     }
//     has(value: T) {
//         let valueFlag = this.getProperty(value);
//         if (valueFlag === undefined) return false;
//         else return valueFlag.enabled;
//     }
//     get value(): Set<T> {
//         let result = new Set<T>();
//         for (let entry of this.propertyEntries()) {
//             if (entry[1].enabled) result.add(entry[0]);
//         }
//         return result;
//     }
//     set value(newValue: Set<T>) {
//         this.startTransaction();
//         this.reset();
//         for (let element of newValue) {
//             this.add(element);
//         }
//         this.endTransaction();
//     }
//     values() {
//         // TODO: once it's gc'd we can just use this.state.keys()
//         return this.value.values();
//     }
//     // TODO: other set properties (e.g. symbol iterator)
//     // TODO: capturing and translating descriptions
// }
//
// export class MapCrdt<K, C extends Crdt<any>> extends CrdtObject<string, AddWinsSet<K> | CrdtObject<K, C>> {
//     private readonly keySet: AddWinsSet<K>;
//     private readonly valueMap: CrdtObject<K, C>;
//     constructor(id: any, runtime: CrdtRuntime,
//             valueFactory: (key: K, internalRuntime: CrdtRuntime) => C) {
//         super(id, runtime);
//         this.startPredefinedPropertyCreation();
//         this.keySet = new AddWinsSet("keySet", this);
//         this.valueMap = new CrdtObject("valueMap", this, valueFactory);
//         this.endPredefinedPropertyCreation();
//     }
//     /**
//      * Flag indicating that we are in the body of a delete/
//      * deleteStrong call, hence we should not add things
//      * to keySet (as an optimization).
//      */
//     private inDelete = false;
//     /**
//      * Override CrdtObject.send so that we can capture
//      * a send by a valueMap value and follow it up with
//      * an add to keySet, thus reviving the value's key
//      * if appropriate.
//      *
//      * TODO: skip adding the key if it's a reset message?
//      * Not sure if this is possible in general.  But should at
//      * least be possible for our own deletes.
//      */
//     send(message: any, name: string): void {
//         super.send(message, name);
//         if (!this.inDelete && name === "valueMap") {
//             // TODO: do this receiver side instead, for network efficiency?
//             // Would need to place the add first, so that it can
//             // be overridden by any included deletes.
//             // Would also need to account for possibility of
//             // transactions.
//             // Also, need to make sure we (sender) do it too.
//             for (let submessage of message) {
//                 if (submessage[0] === "applySkip") {
//                     let key = submessage[1] as K;
//                     this.keySet.add(key);
//                 }
//             }
//         }
//     }
//     init(key: K): C {
//         this.startTransaction();
//         if (!this.inDelete) this.keySet.add(key);
//         let result = this.valueMap.initProperty(key);
//         this.endTransaction();
//         return result;
//     }
//     has(key: K) {
//         return this.keySet.has(key);
//     }
//     get(key: K) {
//         if (this.has(key)) return this.valueMap.getProperty(key);
//         else return undefined;
//     }
//     delete(key: K) {
//         if (this.has(key)) {
//             this.startTransaction();
//             this.inDelete = true;
//             (this.get(key) as C).reset();
//             this.keySet.delete(key);
//             this.inDelete = false;
//             this.endTransaction();
//         }
//     }
//     deleteStrong(key: K) {
//         this.inDelete = true;
//         this.init(key).resetStrong();
//         this.keySet.deleteStrong(key);
//         this.inDelete = false;
//     }
//     keys() {
//         return this.keySet.values();
//     }
//
//     // TODO: other map methods (e.g. symbol iterator)
//     // TODO: strong-reset
//     // TODO: preserve-state delete, reset?
// }
//
// // TODO: make corresponding Crdt for use in CrdtObject's,
// // so users don't have to worry about translating ops
// // and to support bulk/RPC/homap ops.
// export class ArrayCrdtInternal<S> implements CrdtInternal<S[]> {
//     constructor(public readonly elementCrdt: CrdtInternal<S>) { }
//     /**
//      * @param  initialData An array of initialData to
//      * pass to each entry's create method.  The entries
//      * may be undefined, in which case undefined will
//      * be passed to the entry's create method.  In any
//      * case, initialData.length is used to set the
//      * length.
//      * @return             [description]
//      */
//     create(initialData: any[]): S[] {
//         if (!Array.isArray(initialData)) {
//             throw new Error("Not an array: " + initialData);
//         }
//         let state: S[] = [];
//         state.length = initialData.length;
//         for (let i = 0; i < initialData.length; i++) {
//             state[i] = this.elementCrdt.create(initialData[i]);
//         }
//         return state;
//     }
//     /**
//      * @param  operation [index, op]
//      * @return message of the form [index, message]
//      */
//     prepare(operation: [number, any], state: S[], replicaId: any): [number, any] {
//         if (!(operation[0] >= 0 && operation[0] < state.length && Number.isInteger(operation[0]))) {
//             throw new Error("Index out of bounds: " + operation[0]);
//         }
//         return [operation[0], this.elementCrdt.prepare(operation[1], state[1], replicaId)];
//     }
//     /**
//      * Description format: [index, returned description]
//      * (same as message).
//      * @param  message    [index, message]
//      */
//     effect(message: [number, any], state: S[], replicaId: any, timestamp: CausalTimestamp): [S[], [number, number]] {
//         let desc;
//         [state[message[0]], desc] = this.elementCrdt.effect(
//             message[1], state[message[0]], replicaId, timestamp
//         );
//         return [state, [message[0], desc]];
//     }
// }
