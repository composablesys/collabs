import { CausalTimestamp } from "../network";
import { CounterMessage, GMapMessage, MultRegisterMessage } from "../proto_compiled";
import { AddEvent, CounterCrdt, MultEvent, MultRegisterCrdt, NumberState, SetAddEvent } from "./basic_crdts";
import { Crdt, CrdtEvent, CrdtRuntime } from "./crdt_core";
import { OptionalResettableCrdt, OptionalResettableSemidirectProduct } from "./resettable";
import { defaultCollectionSerializer, newDefaultCollectionDeserializer } from "./utils";

export class NumberCrdt extends OptionalResettableSemidirectProduct<NumberState> {
    private addCrdt: CounterCrdt;
    private multCrdt: MultRegisterCrdt;
    readonly resetValue: number;
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 0,
        resettable = true,
        resetValue = initialValue
    ) {
        super(parentOrRuntime, id, resettable);
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
        this.resetValue = resetValue;
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

    hardResetInternal(): void {
        this.state.internalState.value = this.resetValue;
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

export class EnableWinsFlag extends OptionalResettableCrdt<Object> {
    constructor(parentOrRuntime: Crdt | CrdtRuntime, id: string, initialValue = false) {
        super(parentOrRuntime, id, {}, true, true);
        this.addEventListener(
            "Reset", (event: CrdtEvent) => this.dispatchEvent({
                type: "Disable",
                caller: this,
                timestamp: event.timestamp
            })
        );
        if (initialValue) {
            // TODO: enable.  Maybe once we have locally
            // callable pure ops this will be easy?
        }
    }

    enable() {
        this.send(new Uint8Array());
    }
    disable() {
        this.reset();
    }
    get enabled() : boolean {
        return !this.resetWrapperCrdt!.state.isHistoryEmpty();
    }
    set enabled(newValue: boolean) {
        if (newValue) this.enable();
        else this.disable();
    }
    get value() {
        return this.enabled;
    }
    set value(newValue: boolean) {
        this.enabled = newValue;
    }

    hardReset() {}
    receiveInternal(
        timestamp: CausalTimestamp,
        _message: Uint8Array
    ): boolean {
        // TODO: only do this if previously disabled.  How to check?
        this.dispatchEvent({
            type: "Enable",
            caller: this,
            timestamp: timestamp
        });
        return true;
    }
}

export class DisableWinsFlag extends OptionalResettableCrdt<Object> {
    constructor(parentOrRuntime: Crdt | CrdtRuntime, id: string, initialValue = true) {
        super(parentOrRuntime, id, {}, true, true);
        this.addEventListener(
            "Reset", (event: CrdtEvent) => this.dispatchEvent({
                type: "Enable",
                caller: this,
                timestamp: event.timestamp
            })
        );
        if (!initialValue) {
            // TODO: disable.  Maybe once we have locally
            // callable pure ops this will be easy?
        }
    }

    enable() {
        this.reset();
    }
    disable() {
        this.send(new Uint8Array());
    }
    get enabled() : boolean {
        return this.resetWrapperCrdt!.state.isHistoryEmpty();
    }
    set enabled(newValue: boolean) {
        if (newValue) this.enable();
        else this.disable();
    }
    get value() {
        return this.enabled;
    }
    set value(newValue: boolean) {
        this.enabled = newValue;
    }

    hardReset() {}
    receiveInternal(
        timestamp: CausalTimestamp,
        _message: Uint8Array
    ): boolean {
        // TODO: only do this if previously enabled.  How to check?
        this.dispatchEvent({
            type: "Disable",
            caller: this,
            timestamp: timestamp
        });
        return true;
    }
}

export class MapInitEvent<K, C extends Crdt> implements CrdtEvent {
    type = "MapInit";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly key: K,
        public readonly value: C
    ) { }
}

export class GMapCrdt<K, C extends Crdt> extends Crdt<Map<K, C>> {
    private readonly valueConstructor: (parent: Crdt, id: string, key: K) => C;
    private readonly serialize: (value: K) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => K;
    /**
     * A grow-only map Crdt.
     *
     * Map keys and their serializer/deserializer are handled as in
     * GSetCrdt; in particular, only types string, number, and
     * Crdt are supported by default, with the same semantics
     * as the usual JS map.
     *
     * Map values are constrained to be Crdts of a type
     * determined at construction, via the valueConstructor
     * function (see below).  To set the value at a key,
     * you must first initialize it using initKey() or
     * getForce(), then portion operations on the resulting
     * value Crdt, which can be obtained via get() or getForce().
     * Intuitively, this constrains the map values to be
     * "by-value" instead of "by-reference": it does not
     * make sense to use an existing Crdt reference as a
     * map value (although see TODO: register maps for a way
     * around this), but you can copy a desired value into
     * a map value by performing operations on the
     * initialized Crdt.  However, getting a map value always
     * returns the same Crdt reference, so operations on it
     * are reflected in the map.
     *
     * @param valueConstructor A function used to initialize
     * value Crdts when initKey() or getForce() is called on
     * their key.  The Crdt must have given the parent and id.
     * In the simplest usage, this function just calls C's
     * constructor with the given parent and id, and default
     * values otherwise (independent of key).
     * If desired,
     * the result can instead depend on key (e.g., using
     * varying subclasses of C, or performing local operations
     * to drive the Crdt to a desired state depending on K).
     * However, the result must be identical on all replicas,
     * even if they are in different global states.  The
     * easiest way to ensure this is to have the result be
     * a function of the given arguments only.
     *
     * TODO: garbage collection stuff for AWSet.
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        valueConstructor: (parent: Crdt, id: string, key: K) => C,
        serialize: (key: K) => Uint8Array = defaultCollectionSerializer,
        deserialize: (serialized: Uint8Array) => K = newDefaultCollectionDeserializer(parentOrRuntime)
    ) {
        super(parentOrRuntime, id, new Map());
        this.valueConstructor = valueConstructor;
        this.serialize = serialize;
        this.deserialize = deserialize;
    }

    get(key: K): C | undefined {
        return this.state.get(key);
    }

    getForce(key: K): C {
        this.initKey(key);
        return this.get(key)!;
    }

    has(key: K): boolean {
        return this.state.has(key);
    }

    initKey(key: K) {
        // TODO: if we make this resettable, send values
        // anyway (or make that an option).  But don't do
        // so when called via getForce.
        if (!this.has(key)) {
            let message = GMapMessage.create({
                keyToInit: this.serialize(key)
            });
            let buffer = GMapMessage.encode(message).finish()
            super.send(buffer);
        }
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): boolean {
        try {
            let decoded = GMapMessage.decode(message);
            let key = this.deserialize(decoded.keyToInit);
            if (!this.has(key)) {
                let value = this.valueConstructor(
                    this,
                    new TextDecoder("utf8").decode(message),
                    key
                );
                this.state.set(key, value);
                this.dispatchEvent(new MapInitEvent(
                    this, timestamp, key, value
                ));
                return true;
            }
            else return false;
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
    get value(): Map<K, C> {
        return this.state;
    }

    // TODO: map helper methods.

    // TODO: reset method (reset all values but
    // don't reset the state, so Crdt refs still
    // make sense).
}

export class SetDeleteEvent<T> implements CrdtEvent {
    type = "SetDelete";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueDeleted: T) { }
}

export class AddWinsSet<T> extends Crdt {
    private readonly flagMap: GMapCrdt<T, EnableWinsFlag>;
    /**
     * Add-wins set with elements of type T.
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
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
        deserialize: (serialized: Uint8Array) => T = newDefaultCollectionDeserializer(parentOrRuntime)
    ) {
        super(parentOrRuntime, id, {});
        this.flagMap = new GMapCrdt(
            this, "flagMap",
            (parent: Crdt, id: string, _) => new EnableWinsFlag(
                parent, id
            ),
            serialize, deserialize
        );
        // TODO: use GMap garbage collection.  Then revise below.
        this.flagMap.addEventListener(
            "MapInit",
            event => {
                let initEvent = event as MapInitEvent<T, EnableWinsFlag>;
                initEvent.value.addEventListener(
                    "Enable",
                    enableEvent => this.dispatchEvent(new SetAddEvent(
                        this, enableEvent.timestamp, initEvent.key
                    )),
                    true
                );
                initEvent.value.addEventListener(
                    "Disable",
                    enableEvent => this.dispatchEvent(new SetDeleteEvent(
                        this, enableEvent.timestamp, initEvent.key
                    )),
                    true
                );
            },
            true
        );
    }

    add(value: T) {
        // TODO: init flags by default instead of doing so here
        this.flagMap.getForce(value).enable();
    }

    remove(value: T) {
        let flag = this.flagMap.get(value);
        if (flag) flag.disable();
    }

    delete(value: T) {
        this.remove(value);
    }

    has(value: T) {
        let flag = this.flagMap.get(value);
        if (!flag) return false;
        return flag.enabled;
    }

    get value(): Set<T> {
        let set = new Set<T>();
        for (let entry of this.flagMap.value.entries()) {
            if (entry[1].enabled) set.add(entry[0]);
        }
        return set;
    }

    values() {
        return this.value.values();
    }

    // TODO: other helper methods
}

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
