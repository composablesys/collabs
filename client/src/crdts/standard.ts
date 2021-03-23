import { CausalTimestamp } from "../network";
import {
  MultRegisterMessage,
  CounterPureBaseMessage,
} from "../../generated/proto_compiled";
import {
  LwwRegister,
  MultRegisterBase,
  NumberState,
  CounterPureBase,
  CounterEventsRecord,
  MultEventsRecord,
} from "./basic_crdts";
import {
  CompositeCrdt,
  Crdt,
  CrdtEvent,
  CrdtEventsRecord,
  CrdtParent,
  PrimitiveCrdt,
} from "./crdt_core";
import { SemidirectProduct } from "./semidirect";
import { makeEventAdder } from "./mixins/mixin";
import { LocallyResettableState, ResetWrapClass } from "./resettable";
import { Resettable, StrongResettable } from "./mixins";
import { DefaultElementSerializer, ElementSerializer } from "./utils";
import { Buffer } from "buffer";

// interface NumberEventsRecord extends CounterEventsRecord, MultEventsRecord {}

interface NumberEventsRecord extends CounterEventsRecord, MultEventsRecord {}

export interface INumber extends Crdt<NumberEventsRecord> {
  add(toAdd: number): void;
  mult(toMult: number, affectConcurrentAdds?: boolean): void;
  readonly value: number;
}

export class NumberBase
  extends SemidirectProduct<NumberState, NumberEventsRecord>
  implements INumber {
  private addCrdt: CounterPureBase;
  private multCrdt: MultRegisterBase;
  constructor(initialValue: number = 0) {
    super(false);
    this.addCrdt = new CounterPureBase(0);
    this.multCrdt = new MultRegisterBase(0);
    super.setup(this.addCrdt, this.multCrdt, new NumberState(initialValue));
    this.addCrdt.on("Add", (event) =>
      super.emit("Add", { ...event, caller: this })
    );
    this.multCrdt.on("Mult", (event) =>
      super.emit("Mult", { ...event, caller: this })
    );
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    let m2Decoded = MultRegisterMessage.decode(m2Message);
    let m1Decoded = CounterPureBaseMessage.decode(m1Message);
    let acted = CounterPureBaseMessage.create({
      toAdd: m2Decoded.toMult * m1Decoded.toAdd,
    });
    return {
      m1TargetPath: [],
      m1Message: CounterPureBaseMessage.encode(acted).finish(),
    };
  }

  add(toAdd: number) {
    this.addCrdt.add(toAdd);
  }

  mult(toMult: number, affectConcurrentAdds = true) {
    if (affectConcurrentAdds) this.multCrdt.mult(toMult);
    else {
      // Perform an equivalent add
      this.add(toMult * this.value - this.value);
    }
  }

  get value(): number {
    return this.state.internalState.value;
  }
}

const AddNumberEvents = makeEventAdder<NumberEventsRecord>();

export class NumberCrdt
  extends AddNumberEvents(ResetWrapClass(NumberBase))
  implements INumber, Resettable {
  constructor(initialValue: number = 0) {
    super(initialValue);
    this.original.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
    this.original.on("Mult", (event) =>
      this.emit("Mult", { ...event, caller: this })
    );
  }
  add(toAdd: number): void {
    this.original.add(toAdd);
  }
  mult(toMult: number, affectConcurrentAdds = true) {
    this.original.mult(toMult, affectConcurrentAdds);
  }
  get value(): number {
    return this.original.value;
  }
}
// TODO: StrongResettable

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

// TODO: move to basic_crdts; use in benchmarks
export class NoopState implements LocallyResettableState {
  resetLocalState(): void {}
  static instance = new NoopState();
}

export class NoopCrdt
  extends PrimitiveCrdt<NoopState>
  implements Resettable, StrongResettable {
  constructor() {
    super(NoopState.instance);
  }
  noop() {
    this.send(new Uint8Array());
  }
  protected receive(_timestamp: CausalTimestamp, message: Uint8Array): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for NoopCrdt");
  }
  reset() {}
  strongReset() {}
}

export interface FlagEventsRecord extends CrdtEventsRecord {
  Enable: CrdtEvent;
  Disable: CrdtEvent;
}

// TODO: remove old boolean return values (everywhere) from receive

export interface IFlag extends Crdt<FlagEventsRecord> {
  enable(): void;
  disable(): void;
  enabled: boolean;
  value: boolean;
}

// TODO: makeEventAdder: preserve constructor args
const AddFlagEvents = makeEventAdder<FlagEventsRecord>();

export class EnableWinsFlag
  extends AddFlagEvents(ResetWrapClass(NoopCrdt, true))
  implements IFlag, Resettable {
  constructor() {
    super();
    this.on("Reset", (event) => this.emit("Disable", { ...event }));
    this.original.on("Change", (event) =>
      this.emit("Enable", { ...event, caller: this })
    );
  }

  enable() {
    this.original.noop();
  }
  disable() {
    this.reset();
  }
  // strongDisable() {
  //   this.strongReset();
  // }

  get enabled(): boolean {
    return !this.state.isHistoryEmpty();
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

export class DisableWinsFlag
  extends AddFlagEvents(ResetWrapClass(NoopCrdt, true))
  implements IFlag, Resettable {
  constructor() {
    super();
    this.on("Reset", (event) => this.emit("Enable", { ...event }));
    this.original.on("Change", (event) =>
      this.emit("Disable", { ...event, caller: this })
    );
  }

  enable() {
    this.reset();
  }
  disable() {
    this.original.noop();
  }
  // strongDisable() {
  //   this.strongReset();
  // }
  get enabled(): boolean {
    return this.state.isHistoryEmpty();
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

export interface MapEvent<K, V> extends CrdtEvent {
  readonly key: K;
  readonly value: V;
}

export interface LazyMapEventsRecord<K, C extends Crdt>
  extends CrdtEventsRecord {
  ValueChange: MapEvent<K, C>;
}

// TODO: rename ValueChange event, because it is not
// necessarily equal to the child throwing a Change event?
// Unless we move Change events to Crdt, which seems
// like a good idea.  I.e. they correspond to message
// delivery.

// TODO: resettable if C is resettable?
// TODO: strong resets if C is resettable?
// TODO: weak value map, to allow GC even when
// flag is not passed.

export class LazyMap<K, C extends Crdt>
  extends Crdt<LazyMapEventsRecord<K, C>>
  implements CrdtParent {
  private readonly internalMap: Map<string, C> = new Map();
  /**
   * TODO: a map with all keys present, with their values
   * initialized to default values (and possibly GC'd and
   * re-initialized as needed).  Like Apache Common's
   * LazyMap.
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
    private readonly valueConstructor: (key: K) => C,
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
  }

  // TODO: move to utils (also useful in network)
  private static ENCODING: "base64" = "base64";
  private static arrayAsString(array: Uint8Array) {
    return Buffer.from(array).toString(LazyMap.ENCODING);
  }
  private static stringAsArray(str: string) {
    return new Uint8Array(Buffer.from(str, LazyMap.ENCODING));
  }

  private keyAsString(key: K) {
    return LazyMap.arrayAsString(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(
      LazyMap.stringAsArray(str),
      this.runtime
    );
  }

  get(key: K): C {
    return this.getInternal(key, this.keyAsString(key));
  }

  private getInternal(key: K, keyString: string): C {
    let value = this.internalMap.get(keyString);
    if (value === undefined) {
      // Create it
      value = this.valueConstructor(key);

      this.childBeingAdded = value;
      value.init(keyString, this);
      this.childBeingAdded = undefined;

      this.internalMap.set(keyString, value);
    }
    return value;
  }

  private childBeingAdded?: C;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (GMap manages its own children - they are its values)"
      );
    }
  }

  receiveGeneral(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // Message for a child
    let keyString = targetPath[targetPath.length - 1];
    let key = this.stringAsKey(keyString);
    let value = this.getInternal(key, keyString);
    targetPath.length--;
    value.receiveGeneral(targetPath, timestamp, message);
    this.emit("ValueChange", {
      key,
      value,
      caller: this,
      timestamp,
    });
    // Dispatch a generic Change event
    this.emit("Change", {
      caller: this,
      timestamp: timestamp,
    });
  }

  // TODO: hack for MapCrdt; remove later
  receiveLocal(
    key: K,
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    this.receiveGeneral(
      [...targetPath, this.keyAsString(key)],
      timestamp,
      message
    );
  }

  // TODO: ChangeEvent's whenever children are changed

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let keyString = targetPath[targetPath.length - 1];
    let value = this.getInternal(this.stringAsKey(keyString), keyString);
    targetPath.length--;
    return value.getDescendant(targetPath);
  }

  // TODO: map helper methods?

  /**
   * Returns a Map of all entries that are explicitly
   * present in this LazyMap.  All other entries
   * all implicitly given by their initial states.
   * @return [description]
   */
  explicitEntries(): Map<K, C> {
    let ans = new Map<K, C>();
    for (let entry of this.internalMap.entries()) {
      ans.set(this.stringAsKey(entry[0]), entry[1]);
    }
    return ans;
  }

  explicitKeys(): Set<K> {
    let ans = new Set<K>();
    for (let keyString of this.internalMap.keys()) {
      ans.add(this.stringAsKey(keyString));
    }
    return ans;
  }

  explicitValues() {
    return this.internalMap.values();
  }
}

// TODO: for now, let decoding errors propogate, instead of
// catching them

// TODO: also have GSet use string-based keys like GMap.
// Move the conversion functionality to ElementSerializer?

export interface SetEvent<T> extends CrdtEvent {
  readonly element: T;
}

export interface SetEventsRecord<T> extends CrdtEventsRecord {
  SetAdd: SetEvent<T>;
  SetDelete: SetEvent<T>;
}

export class AddWinsSet<T>
  extends CompositeCrdt<SetEventsRecord<T>>
  implements Resettable {
  private readonly flagMap: LazyMap<T, EnableWinsFlag>;
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
    elementSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.flagMap = this.addChild(
      "flagMap",
      new LazyMap(() => new EnableWinsFlag(), elementSerializer)
    );
    this.flagMap.on("ValueChange", (event) => {
      let type: "SetAdd" | "SetDelete" = event.value.enabled
        ? "SetAdd"
        : "SetDelete";
      this.emit(type, {
        element: event.key,
        caller: this,
        timestamp: event.timestamp,
      });
    });
  }

  add(value: T) {
    this.flagMap.get(value).enable();
  }

  delete(value: T) {
    this.flagMap.get(value).disable();
  }

  // TODO: optimize (just one message)
  reset(): void {
    for (let value of this.flagMap.explicitValues()) {
      value.disable();
    }
  }

  // TODO: replace this with general receiveLocal way
  // once that's implemented
  receiveAdd(value: T, timestamp: CausalTimestamp) {
    this.flagMap.receiveLocal(
      value,
      [SemidirectProduct.crdt2Name],
      timestamp,
      new Uint8Array()
    );
  }

  // strongRemove(value: T) {
  //   let flag = this.flagMap.get(value);
  //   if (flag) flag.strongDisable();
  // }
  //
  // strongDelete(value: T) {
  //   this.strongRemove(value);
  // }

  has(value: T) {
    return this.flagMap.get(value).enabled;
  }

  get value(): Set<T> {
    let set = new Set<T>();
    for (let entry of this.flagMap.explicitEntries().entries()) {
      if (entry[1].enabled) set.add(entry[0]);
    }
    return set;
  }

  values() {
    return this.value.values();
  }

  // TODO: other helper methods?
}

// TODO: strong resets (individual elements and whole map,
// by deferring to child LazyMap).

// TODO: RemoveWinsSet
// TODO: LwwSet?

export interface KeyEvent<K> extends CrdtEvent {
  key: K;
}

export interface MapEventsRecord<K, C extends Crdt> extends CrdtEventsRecord {
  ValueChange: MapEvent<K, C>;
  KeyAdd: KeyEvent<K>;
  KeyDelete: KeyEvent<K>;
}

// TODO: garbage collection

export class MapCrdt<K, C extends Crdt & Resettable>
  extends CompositeCrdt<MapEventsRecord<K, C>>
  implements Resettable {
  private readonly keySet: AddWinsSet<K>;
  private readonly valueMap: LazyMap<K, C>;
  /**
   * TODO.
   *
   * TODO: make key revivals from concurrent ops optional.
   * When off, should have no performance/memory footprint.
   * Remark that key deletion semantics is add-wins.
   * Also: if allow value strong resets, current approach would
   * report ops concurrent to them as reviving the key,
   * since we don't know what effect they have on the Crdt
   * (although strong deletes are okay because they will
   * also kill the key set operation).
   *
   * TODO: garbage collection?  Can we ever release the
   * reference to a deleted value, e.g., using weakrefs?
   */
  constructor(
    valueConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.keySet = this.addChild("keySet", new AddWinsSet(keySerializer));
    this.valueMap = this.addChild(
      "valueMap",
      new LazyMap(valueConstructor, keySerializer)
    );
    this.keySet.on("SetAdd", (event) =>
      this.emit("KeyAdd", {
        key: event.element,
        caller: this,
        timestamp: event.timestamp,
      })
    );
    this.keySet.on("SetDelete", (event) =>
      this.emit("KeyDelete", {
        key: event.element,
        caller: this,
        timestamp: event.timestamp,
      })
    );
    this.valueMap.on("ValueChange", (event) =>
      this.emit("ValueChange", { ...event, caller: this })
    );
    // TODO: note events might correspond to actual changes,
    // it might have been re-added or just received an op.
    // Can we fix this?
    this.valueMap.on("ValueChange", (event) =>
      this.keySet.receiveAdd(event.key, event.timestamp)
    );
  }
  // TODO: strong delete and reset.

  get(key: K): C | undefined {
    if (this.has(key)) return this.valueMap.get(key);
    else return undefined;
  }

  /**
   * Gets the value at key even if it is not
   * present in the map, (re-)initializing it
   * if necessary.
   *
   * TODO: delete this method?
   * TODO: analogous iterator methods?
   */
  getIncludeDeleted(key: K): C {
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

  has(key: K): boolean {
    return this.keySet.has(key);
  }

  delete(key: K) {
    // TODO: return whether actually deleted?  Semantically difficult.
    this.valueMap.get(key).reset();
    this.keySet.delete(key);
  }

  /**
   * Makes key present in the map.
   */
  addKey(key: K) {
    this.keySet.add(key);
  }

  // TODO: optimize if possible (pure resets)?
  // TODO: move the reset-all-values function to
  // LazyMap, if it has Resettable values?
  // (In that case this is just the generic
  // CompositeCrdt reset.)
  reset() {
    for (let value of this.valueMap.explicitValues()) {
      value.reset();
    }
    this.keySet.reset();
  }

  keys() {
    return this.keySet.values();
  }

  values() {
    return this.value.values();
  }

  get value(): Map<K, C> {
    let result = new Map<K, C>();
    for (let key of this.keys()) {
      result.set(key, this.valueMap.get(key));
    }
    return result;
  }

  // TODO: other map methods (e.g. symbol iterator)
  // TODO: strong-resets (keys, values, whole thing)
  // TODO: preserve-state delete?
}

// // TODO: refactor
// export interface NewCrdtEvent<C extends Crdt> extends CrdtEvent {
//   readonly newCrdt: C;
// }
//
// export interface RuntimeCrdtEventsRecord<C extends Crdt>
//   extends CrdtEventsRecord {
//   NewCrdt: NewCrdtEvent<C>;
// }
//
// export class RuntimeCrdtGenerator<C extends Crdt> extends Crdt<
//   RuntimeCrdtEventsRecord<C>
// > {
//   private readonly generator: (
//     parent: Crdt,
//     id: string,
//     message: Uint8Array
//   ) => C;
//   /**
//    * Use this class to generate Crdt's dynamically at
//    * runtime.  Specifically, when this.generate(message)
//    * is called, all replicas will call generator(message)
//    * and return the generated Crdt via a NewCrdtEvent.
//    * To ensure eventual consistency, generator must
//    * give the same result on all replicas even if they are
//    * in different states; the simplest way to ensure
//    * this is for the result to depend only on the given
//    * message.
//    *
//    * Notes:
//    * - generator must use the given parent and id for its
//    * generated Crdt.  parent will be this.
//    * - generator should not call operations on its Crdt,
//    * since those will happen at every replica, hence take
//    * effect once per replica.  Instead, either do the operations
//    * you want to do only on the replica that called
//    * this.generate(), or use local operations in generator
//    * (TODO: not yet implemented).
//    * - You'll probably want to store the generated Crdt's
//    * somewhere to keep track of them.  If you store them
//    * in a Crdt collection (e.g., an AddWinsSet), make sure
//    * to add them only on the replica that called
//    * this.generate(), or use local operations on the collection
//    * (TODO: not yet implemented).  Otherwise, every replica
//    * will cause an add operation.  On the flipside, if
//    * you store them in a non-Crdt collection (e.g., a JS Set),
//    * make sure to add them on every replica.
//    *
//    * MapCrdt and LazyMap offer similar but less flexible behavior:
//    * initializing a map key creates a value Crdt dynamically.
//    * Unlike those classes, this class does not constrain
//    * the initialization data to be a unique (not previously
//    * initialized) key, and it does not store the resulting
//    * Crdt anywhere.
//    */
//   constructor(
//     parentOrRuntime: Crdt | CrdtRuntime,
//     id: string,
//     generator: (parent: Crdt, id: string, message: Uint8Array) => C
//   ) {
//     super(parentOrRuntime, id, {});
//     this.generator = generator;
//   }
//
//   // Used to return our own generated Crdt's in generate().
//   private lastGenerated?: C;
//
//   generate(message: Uint8Array): C {
//     let genMessage = RuntimeGeneratorMessage.create({
//       message: message,
//       uniqueId: this.runtime.getUid(),
//     });
//     super.send(RuntimeGeneratorMessage.encode(genMessage).finish());
//     return this.lastGenerated!;
//   }
//
//   receiveInternal(timestamp: CausalTimestamp, message: Uint8Array): boolean {
//       let decoded = RuntimeGeneratorMessage.decode(message);
//       let newCrdt = this.generator(this, decoded.uniqueId, decoded.message);
//       this.emit("NewCrdt", { caller: this, timestamp, newCrdt });
//       if (timestamp.isLocal()) this.lastGenerated = newCrdt;
//       return false;
//   }
// }

export interface LwwMapEventsRecord<K, V> extends CrdtEventsRecord {
  //KeyAdd: MapEvent<K, V>; // TODO
  KeyDelete: KeyEvent<K>;
  ValueChange: MapEvent<K, V>; // TODO: include old value?
}

export class LwwMap<K, V>
  extends CompositeCrdt<LwwMapEventsRecord<K, V>>
  implements Resettable {
  private readonly internalMap: LazyMap<K, LwwRegister<V>>;
  /**
   * A map in which the value associated to each key follows
   * last-writer-wins (LWW) semantics, i.e., the current
   * value will be the causally maximal value with the
   * highest timestamp.  However, deleting keys follows
   * add-wins semantics, for memory efficiency (TODO).
   *
   * TODO: usual comment about serializers.  Applies to
   * both keys and values.
   */
  constructor(
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super();
    // Any register value present in the map will
    // have its value set to V; however, LwwRegister
    // requires us to provide an initial value.
    // We just pass null and cast it to V.
    this.internalMap = this.addChild(
      "internalMap",
      new LazyMap(
        () => new LwwRegister((null as unknown) as V, valueSerializer),
        keySerializer
      )
    );

    this.internalMap.on("ValueChange", (event) => {
      if (event.value.value === null) {
        // The key was deleted (value was reset)
        this.emit("KeyDelete", {
          caller: this,
          timestamp: event.timestamp,
          key: event.key,
        });
      } else {
        this.emit("ValueChange", {
          caller: this,
          timestamp: event.timestamp,
          key: event.key,
          value: event.value.value,
        });
      }
    });

    // TODO: events
    // this.internalMap.on("KeyAdd", (event) => {
    //   event.value.on("Lww", (innerEvent) => {
    //     // TODO: remove listeners if GC'd
    //     if (innerEvent.value === undefined) {
    //       this.emit("KeyDelete", {
    //         caller: this,
    //         timestamp: innerEvent.timestamp,
    //         key: event.key,
    //       });
    //     } else {
    //       this.emit("ValueChange", {
    //         caller: this,
    //         timestamp: innerEvent.timestamp,
    //         key: event.key,
    //         value: innerEvent.value!,
    //       });
    //     }
    //   });
    //   this.emit("KeyAdd", {
    //     caller: this,
    //     timestamp: event.timestamp,
    //     key: event.key,
    //     value: event.value.value!,
    //   });
    // });
  }

  get(key: K): V | undefined {
    if (!this.has(key)) return undefined;
    else return this.internalMap.get(key).value;
  }

  has(key: K): boolean {
    // TODO: way to optimize checking if the value is
    // not present?  Currently this creates the value
    // and will then immediately GC it.
    return !this.internalMap.get(key).isInInitialState();
  }

  set(key: K, value: V) {
    this.internalMap.get(key).value = value;
  }

  delete(key: K) {
    this.internalMap.get(key).reset();
  }

  keys() {
    let keys: K[] = [];
    for (let key of this.internalMap.explicitKeys()) {
      if (this.has(key)) keys.push(key);
    }
    return keys.values();
  }

  values() {
    let values: V[] = [];
    for (let crdt of this.internalMap.explicitValues()) {
      if (!crdt.isInInitialState()) values.push(crdt.value);
    }
    return values.values();
  }

  entries() {
    let entries: [K, V][] = [];
    for (let entry of this.internalMap.explicitEntries().entries()) {
      if (!entry[1].isInInitialState())
        entries.push([entry[0], entry[1].value]);
    }
    return entries.values();
  }

  reset() {
    // TODO: optimize (just one message)
    for (let crdt of this.internalMap.explicitValues()) {
      crdt.reset();
    }
  }
}

// TODO: set/map return things: can't use set for values in case of duplicates? (what do Set/Map do?)
