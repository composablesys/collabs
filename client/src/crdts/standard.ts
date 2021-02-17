import { CausalTimestamp } from "../network";
import {
  GMapMessage,
  MultRegisterMessage,
  RuntimeGeneratorMessage,
  CounterPureBaseMessage,
} from "../../generated/proto_compiled";
import {
  LwwRegister,
  MultRegisterBase,
  NumberState,
  CounterPureBase,
  CounterEventsRecord,
  MultEventsRecord,
  GSetEventsRecord,
} from "./basic_crdts";
import { Crdt, CrdtEvent, CrdtEventsRecord, CrdtRuntime } from "./crdt_core";
import {
  defaultCollectionSerializer,
  newDefaultCollectionDeserializer,
} from "./utils";
import { SemidirectProduct } from "./semidirect";
import { AddAllAbilitiesViaHistory } from "./mixins";
import { HardResettable } from "./resettable";
import { makeEventAdder } from "./mixins/mixin";

type NumberEventsRecord = CounterEventsRecord & MultEventsRecord;

export class NumberBase extends SemidirectProduct<
  NumberState,
  NumberEventsRecord
> {
  private addCrdt: CounterPureBase;
  private multCrdt: MultRegisterBase;
  readonly resetValue: number;
  constructor(
    parentOrRuntime: Crdt | CrdtRuntime,
    id: string,
    initialValue: number = 0,
    resetValue = initialValue
  ) {
    super(parentOrRuntime, id);
    this.addCrdt = new CounterPureBase(this, "add", 0);
    this.multCrdt = new MultRegisterBase(this, "mult", 0);
    super.setup(
      this.addCrdt,
      this.multCrdt,
      this.action.bind(this),
      new NumberState(initialValue)
    );
    this.addCrdt.on("Add", (event) =>
      super.emit("Add", { ...event, caller: this })
    );
    this.multCrdt.on("Mult", (event) =>
      super.emit("Mult", { ...event, caller: this })
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
      let m1Decoded = CounterPureBaseMessage.decode(m1Message);
      let acted = CounterPureBaseMessage.create({
        toAdd: m2Decoded.toMult * m1Decoded.toAdd,
      });
      return [[], CounterPureBaseMessage.encode(acted).finish()];
    } catch (e) {
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

  hardReset(): void {
    this.state.hardReset();
    this.state.internalState.value = this.resetValue;
  }
}

export class NumberCrdt extends AddAllAbilitiesViaHistory(NumberBase, true) {}

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

class TrivialCrdt extends Crdt<null> implements HardResettable {
  constructor(parentOrRuntime: Crdt | CrdtRuntime, id: string) {
    super(parentOrRuntime, id, null);
  }
  hardReset() {}
}

interface FlagEventsRecord extends CrdtEventsRecord {
  Enable: CrdtEvent;
  Disable: CrdtEvent;
}

const AddFlagEvents = makeEventAdder<FlagEventsRecord>();

export class EnableWinsFlag extends AddFlagEvents(
  AddAllAbilitiesViaHistory(TrivialCrdt)
) {
  constructor(parent: Crdt | CrdtRuntime, id: string) {
    super(parent, id);
    this.on("Reset", (event) =>
      this.emit("Disable", { ...event, caller: this })
    );
  }

  enable() {
    this.send(new Uint8Array());
  }
  receiveInternal(timestamp: CausalTimestamp, _message: Uint8Array): boolean {
    // TODO: only do this if previously disabled.  How to check?
    this.emit("Enable", {
      caller: this,
      timestamp: timestamp,
    });
    return true;
  }
  disable() {
    this.reset();
  }
  strongDisable() {
    this.strongReset();
  }
  get enabled(): boolean {
    return !this.getResetState().isHistoryEmpty();
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
}

export class DisableWinsFlag extends AddFlagEvents(
  AddAllAbilitiesViaHistory(TrivialCrdt)
) {
  constructor(parent: Crdt | CrdtRuntime, id: string) {
    super(parent, id);
    this.on("Reset", (event) =>
      this.emit("Enable", { ...event, caller: this })
    );
  }

  disable() {
    this.send(new Uint8Array());
  }
  receiveInternal(timestamp: CausalTimestamp, _message: Uint8Array): boolean {
    // TODO: only do this if previously enabled.  How to check?
    this.emit("Disable", {
      caller: this,
      timestamp: timestamp,
    });
    return true;
  }
  enable() {
    this.reset();
  }
  strongEnable() {
    this.strongReset();
  }
  get enabled(): boolean {
    return this.getResetState().isHistoryEmpty();
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
}

export interface KeyAddEvent<K, V> extends CrdtEvent {
  readonly key: K;
  readonly value: V;
}

export interface GMapCrdtEventsRecord<K, C extends Crdt>
  extends CrdtEventsRecord {
  KeyAdd: KeyAddEvent<K, C>;
}

export class GMapCrdt<K, C extends Crdt> extends Crdt<
  Map<K, C>,
  GMapCrdtEventsRecord<K, C>
> {
  private readonly valueConstructor: (parent: Crdt, id: string, key: K) => C;
  private readonly serialize: (value: K) => Uint8Array;
  private readonly deserialize: (serialized: Uint8Array) => K;
  /**
   * A grow-only map Crdt.
   *
   * Map keys and their serializer/deserializer are handled as in
   * GSetCrdt.
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
    deserialize: (
      serialized: Uint8Array
    ) => K = newDefaultCollectionDeserializer(parentOrRuntime)
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
    this.addKey(key);
    let value = this.get(key);
    if (value === undefined) {
      throw new Error("addKey failed for key " + key);
    }
    return value;
  }

  has(key: K): boolean {
    return this.state.has(key);
  }

  addKey(key: K) {
    if (!this.has(key)) {
      let message = GMapMessage.create({
        keyToInit: this.serialize(key),
      });
      let buffer = GMapMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  receiveInternal(timestamp: CausalTimestamp, message: Uint8Array): boolean {
    try {
      let decoded = GMapMessage.decode(message);
      let key = this.deserialize(decoded.keyToInit);
      if (!this.has(key)) {
        // TODO: smaller rep of keys.  Hash?  Base64?
        let value = this.valueConstructor(
          this,
          Array.from(decoded.keyToInit).toString(),
          key
        );
        this.state.set(key, value);
        this.emit("KeyAdd", { caller: this, timestamp, key, value });
        return true;
      } else return false;
    } catch (e) {
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

  keys() {
    return this.state.keys();
  }

  values() {
    return this.state.values();
  }

  // TODO: map helper methods.

  // TODO: reset method (reset all values but
  // don't reset the state, so Crdt refs still
  // make sense).
}

export interface SetDeleteEvent<T> extends CrdtEvent {
  readonly valueDeleted: T;
}

export interface SetEventsRecord<T> extends GSetEventsRecord<T> {
  SetDelete: SetDeleteEvent<T>;
}

export class AddWinsSet<T> extends Crdt<Object | null, SetEventsRecord<T>> {
  private readonly flagMap: GMapCrdt<T, EnableWinsFlag>;
  /**
   * Add-wins set with elements of type T.
   *
   * The default serializer behaves as follows.  string, number,
   * undefined, and null types are stored
   * by-value, as in ordinary JS Set's, so that different
   * instances of the same value are identified
   * (even if they are added by different
   * replicas).  Crdt types are stored
   * by-reference, as they would be in ordinary JS set's,
   * with replicas of the same Crdt being identified
   * (even if they are added by different replicas).
   * Other types are serialized using BSON (via
   * https://github.com/mongodb/js-bson).  Note this means
   * that they will effectively be sent by-value to other
   * replicas, but on each replica, they are treated by reference,
   * following JS's usual set semantics.
   */
  constructor(
    parentOrRuntime: Crdt | CrdtRuntime,
    id: string,
    //_abilityFlag: AbilityFlag,
    serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
    deserialize: (
      serialized: Uint8Array
    ) => T = newDefaultCollectionDeserializer(parentOrRuntime)
  ) {
    super(parentOrRuntime, id, {});
    this.flagMap = new GMapCrdt(
      this,
      "flagMap",
      (parent: Crdt, id: string, _) => new EnableWinsFlag(parent, id),
      serialize,
      deserialize
    );
    // TODO: use GMap garbage collection.  Then revise below.
    this.flagMap.on("KeyAdd", (addEvent) => {
      const flag = addEvent.value;
      flag.on("Enable", (enableEvent) =>
        this.emit("SetAdd", {
          caller: this,
          timestamp: enableEvent.timestamp,
          valueAdded: addEvent.key,
        })
      );
      flag.on("Enable", (disableEvent) =>
        this.emit("SetDelete", {
          caller: this,
          timestamp: disableEvent.timestamp,
          valueDeleted: addEvent.key,
        })
      );
    });
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

  strongRemove(value: T) {
    let flag = this.flagMap.get(value);
    if (flag) flag.strongDisable();
  }

  strongDelete(value: T) {
    this.strongRemove(value);
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

  // TODO: other helper methods, events
}

// TODO
// export class AddWinsSet<T> extends AddAbilitiesViaChildren(AddWinsSetInternal)<T> {}

export class MapCrdt<K, C extends Crdt> extends Crdt {
  private readonly keySet: AddWinsSet<K>;
  private readonly valueMap: GMapCrdt<K, C>;
  /**
   * TODO.
   *
   * TODO: make key revivals from concurrent ops optional.
   * When off, should have no performance/memory footprint.
   * Remark that key deletion semantics is add-wins.
   *
   * TODO: garbage collection?  Can we ever release the
   * reference to a deleted value, e.g., using weakrefs?
   */
  constructor(
    parentOrRuntime: Crdt | CrdtRuntime,
    id: string,
    valueConstructor: (parent: Crdt, id: string, key: K) => C,
    serialize: (key: K) => Uint8Array = defaultCollectionSerializer,
    deserialize: (
      serialized: Uint8Array
    ) => K = newDefaultCollectionDeserializer(parentOrRuntime)
  ) {
    super(parentOrRuntime, id, {});
    this.keySet = new AddWinsSet(this, "keySet", serialize, deserialize);
    this.valueMap = new GMapCrdt(
      this,
      "valueMap",
      valueConstructor,
      serialize,
      deserialize
    );
    // TODO: events, propagated from children.
  }
  // TODO: revive removed elements if they have
  // a change event.  (Need to implement
  // change events, including for children,
  // as well as local ops.)
  // TODO: resets.
  // TODO: strong delete and reset.

  // /**
  //  * Flag indicating that we are in the body of a delete/
  //  * deleteStrong call, hence we should not add things
  //  * to keySet (as an optimization).
  //  */
  // private inDelete = false;
  // /**
  //  * Override CrdtObject.send so that we can capture
  //  * a send by a valueMap value and follow it up with
  //  * an add to keySet, thus reviving the value's key
  //  * if appropriate.
  //  *
  //  * TODO: skip adding the key if it's a reset message?
  //  * Not sure if this is possible in general.  But should at
  //  * least be possible for our own deletes.
  //  */
  // send(message: any, name: string): void {
  //     super.send(message, name);
  //     if (!this.inDelete && name === "valueMap") {
  //         // TODO: do this receiver side instead, for network efficiency?
  //         // Would need to place the add first, so that it can
  //         // be overridden by any included deletes.
  //         // Would also need to account for possibility of
  //         // transactions.
  //         // Also, need to make sure we (sender) do it too.
  //         for (let submessage of message) {
  //             if (submessage[0] === "applySkip") {
  //                 let key = submessage[1] as K;
  //                 this.keySet.add(key);
  //             }
  //         }
  //     }
  // }

  get(key: K): C | undefined {
    if (this.has(key)) return this.valueMap.get(key);
    else return undefined;
  }

  /**
   * Gets the value at key even if has since
   * been deleted (grow-only map semantics).
   * Note that value Crdts
   * stick around internally (and possibly via
   * get-ted references) even if they are deleted,
   * and if they are changed, they will become
   * present in the map again.
   */
  getIncludeDeleted(key: K): C | undefined {
    return this.valueMap.get(key);
  }

  /**
   * Return the value at key, adding it if needed.
   * @param  key [description]
   * @return     [description]
   */
  getForce(key: K): C {
    this.addKey(key);
    return this.get(key)!;
  }

  /**
   * Return the value at key, initilizing it if needed
   * (but not adding it).
   * @param  key [description]
   * @return     [description]
   */
  getForceNoAdd(key: K): C {
    this.initKeyNoAdd(key);
    return this.getIncludeDeleted(key)!;
  }

  has(key: K): boolean {
    return this.keySet.has(key);
  }

  delete(key: K) {
    // TODO: return whether actually deleted?  Semantically difficult.
    this.keySet.delete(key);
  }

  /**
   * Returns whether key has ever been
   * initialized, even if it has since
   * been deleted, (grow-only map semantics),
   * including if it has never been present
   * on this replica.
   * Note that value Crdts
   * stick around internally (and possibly via
   * get-ted references) even if they are deleted,
   * and if they are changed, they will become
   * present in the map again.
   */
  hasIncludeDeleted(key: K): boolean {
    return this.valueMap.has(key);
  }

  /**
   * Makes key present in the map, initializing
   * it if needed.
   */
  addKey(key: K) {
    this.initKeyNoAdd(key);
    this.keySet.add(key);
  }

  /**
   * Initializes the value at key if it is not
   * already initialized but does not mark
   * it present in the map.  To mark it present
   * as well, use addKey instead.
   */
  initKeyNoAdd(key: K) {
    this.valueMap.addKey(key);
  }

  keys() {
    return this.keySet.values();
  }

  keysIncludeDeleted() {
    return this.valueMap.keys();
  }

  values() {
    return this.value.values();
  }

  valuesIncludeDeleted() {
    return this.valueMap.values();
  }

  get value(): Map<K, C> {
    let result = new Map<K, C>();
    for (let key of this.keys()) {
      result.set(key, this.get(key)!);
    }
    return result;
  }

  /**
   * Don't mutate this directly.
   */
  get valueIncludedDeleted(): Map<K, C> {
    return this.valueMap.value;
  }

  // TODO: other map methods (e.g. symbol iterator)
  // TODO: strong-reset
  // TODO: preserve-state delete, reset?
}

export interface NewCrdtEvent<C extends Crdt> extends CrdtEvent {
  readonly newCrdt: C;
}

export interface RuntimeCrdtEventsRecord<C extends Crdt>
  extends CrdtEventsRecord {
  NewCrdt: NewCrdtEvent<C>;
}

export class RuntimeCrdtGenerator<C extends Crdt> extends Crdt<
  Object | null,
  RuntimeCrdtEventsRecord<C>
> {
  private readonly generator: (
    parent: Crdt,
    id: string,
    message: Uint8Array
  ) => C;
  /**
   * Use this class to generate Crdt's dynamically at
   * runtime.  Specifically, when this.generate(message)
   * is called, all replicas will call generator(message)
   * and return the generated Crdt via a NewCrdtEvent.
   * To ensure eventual consistency, generator must
   * give the same result on all replicas even if they are
   * in different states; the simplest way to ensure
   * this is for the result to depend only on the given
   * message.
   *
   * Notes:
   * - generator must use the given parent and id for its
   * generated Crdt.  parent will be this.
   * - generator should not call operations on its Crdt,
   * since those will happen at every replica, hence take
   * effect once per replica.  Instead, either do the operations
   * you want to do only on the replica that called
   * this.generate(), or use local operations in generator
   * (TODO: not yet implemented).
   * - You'll probably want to store the generated Crdt's
   * somewhere to keep track of them.  If you store them
   * in a Crdt collection (e.g., an AddWinsSet), make sure
   * to add them only on the replica that called
   * this.generate(), or use local operations on the collection
   * (TODO: not yet implemented).  Otherwise, every replica
   * will cause an add operation.  On the flipside, if
   * you store them in a non-Crdt collection (e.g., a JS Set),
   * make sure to add them on every replica.
   *
   * MapCrdt and GMapCrdt offer similar but less flexible behavior:
   * initializing a map key creates a value Crdt dynamically.
   * Unlike those classes, this class does not constrain
   * the initialization data to be a unique (not previously
   * initialized) key, and it does not store the resulting
   * Crdt anywhere.
   */
  constructor(
    parentOrRuntime: Crdt | CrdtRuntime,
    id: string,
    generator: (parent: Crdt, id: string, message: Uint8Array) => C
  ) {
    super(parentOrRuntime, id, {});
    this.generator = generator;
  }

  // Used to return our own generated Crdt's in generate().
  private lastGenerated?: C;

  generate(message: Uint8Array): C {
    let genMessage = RuntimeGeneratorMessage.create({
      message: message,
      uniqueId: this.runtime.getUid(),
    });
    super.send(RuntimeGeneratorMessage.encode(genMessage).finish());
    return this.lastGenerated!;
  }

  receiveInternal(timestamp: CausalTimestamp, message: Uint8Array): boolean {
    try {
      let decoded = RuntimeGeneratorMessage.decode(message);
      let newCrdt = this.generator(this, decoded.uniqueId, decoded.message);
      this.emit("NewCrdt", { caller: this, timestamp, newCrdt });
      if (timestamp.isLocal()) this.lastGenerated = newCrdt;
      return false;
    } catch (e) {
      // TODO
      console.log("Decoding/generator error: " + e);
      return false;
    }
  }
}

// TODO: also include old values?
export interface KeyDeleteEvent<K> extends CrdtEvent {
  readonly key: K;
}

export interface ValueChangeEvent<K, V> extends CrdtEvent {
  readonly key: K;
  readonly value: V;
}

export interface LwwMapEventsRecord<K, V> extends CrdtEventsRecord {
  KeyAdd: KeyAddEvent<K, V>;
  KeyDelete: KeyDeleteEvent<K>;
  ValueChange: ValueChangeEvent<K, V>;
}

export class LwwMap<K, V> extends Crdt<null, LwwMapEventsRecord<K, V>> {
  private readonly internalMap: GMapCrdt<K, LwwRegister<V | undefined>>;
  /**
   * A map in which the value associated to each key follows
   * last-writer-wins (LWW) semantics, i.e., the current
   * value will be the causally maximal value with the
   * highest timestamp.  Deleting keys also follows
   * last-writer-wins semantics and is equivalent to
   * setting the value to undefined.  This is in contrast to
   * MapCrdt, in which deleting keys follows add-wins
   * semantics, possibly with revivals.
   *
   * TODO: usual comment about serializers.  Applies to
   * both keys and values.  For now we require the value
   * serializer to handle undefined's; could wrap around
   * this instead.
   *
   * TODO: garbage collect undefined values?
   */
  constructor(
    parentOrRuntime: Crdt | CrdtRuntime,
    id: string,
    keySerialize: (key: K) => Uint8Array = defaultCollectionSerializer,
    keyDeserialize: (
      serialized: Uint8Array
    ) => K = newDefaultCollectionDeserializer(parentOrRuntime),
    valueSerialize: (
      value: V | undefined
    ) => Uint8Array = defaultCollectionSerializer,
    valueDeserialize: (
      serialized: Uint8Array
    ) => V | undefined = newDefaultCollectionDeserializer(parentOrRuntime)
  ) {
    super(parentOrRuntime, id, null);
    // Register values are always set immediately
    this.internalMap = new GMapCrdt(
      this,
      "internalMap",
      (parent, id, _) =>
        new LwwRegister(
          parent,
          id,
          undefined,
          valueSerialize,
          valueDeserialize
        ),
      keySerialize,
      keyDeserialize
    );
    this.internalMap.on("KeyAdd", (event) => {
      event.value.on("Lww", (innerEvent) => {
        // TODO: remove listeners if GC'd
        if (innerEvent.value === undefined) {
          this.emit("KeyDelete", {
            caller: this,
            timestamp: innerEvent.timestamp,
            key: event.key,
          });
        } else {
          this.emit("ValueChange", {
            caller: this,
            timestamp: innerEvent.timestamp,
            key: event.key,
            value: innerEvent.value!,
          });
        }
      });
      this.emit("KeyAdd", {
        caller: this,
        timestamp: event.timestamp,
        key: event.key,
        value: event.value.value!,
      });
    });
  }

  get(key: K): V | undefined {
    let crdt = this.internalMap.get(key);
    if (crdt === undefined) return undefined;
    return crdt.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  set(key: K, value: V) {
    let crdt = this.internalMap.getForce(key);
    crdt.value = value;
  }

  delete(key: K): boolean {
    let crdt = this.internalMap.get(key);
    if (crdt === undefined) return false;
    let deleted = crdt.value !== undefined;
    crdt.value = undefined;
    return deleted;
  }

  keys() {
    let keys: K[] = [];
    for (let key of this.internalMap.keys()) {
      if (this.has(key)) keys.push(key);
    }
    return keys.values();
  }

  values() {
    let values: V[] = [];
    for (let key of this.internalMap.keys()) {
      let value = this.get(key);
      if (value !== undefined) values.push(value);
    }
    return values.values();
  }

  entries() {
    let entries: [K, V][] = [];
    for (let key of this.internalMap.keys()) {
      let value = this.get(key);
      if (value !== undefined) entries.push([key, value]);
    }
    return entries.values();
  }

  // TODO: reset/clear
}
