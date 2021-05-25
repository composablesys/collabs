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
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
  OptionalSerializer,
  stringAsArray,
} from "./utils";
import { WeakValueMap } from "../utils/weak_value_map";

// interface NumberEventsRecord extends CounterEventsRecord, MultEventsRecord {}

interface NumberEventsRecord extends CounterEventsRecord, MultEventsRecord {}

export interface INumber extends Crdt<NumberEventsRecord> {
  add(toAdd: number): void;
  mult(toMult: number, affectConcurrentAdds?: boolean): void;
  readonly value: number;
}

export class NumberBase
  extends SemidirectProduct<NumberState, NumberEventsRecord>
  implements INumber
{
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

  mult(toMult: number) {
    this.multCrdt.mult(toMult);
  }

  multAsAdd(toMult: number) {
    // Perform an equivalent add
    this.add(toMult * this.value - this.value);
  }

  get value(): number {
    return this.addCrdt.value;
  }
}

const AddNumberEvents = makeEventAdder<NumberEventsRecord>();

export class NumberCrdt
  extends AddNumberEvents(ResetWrapClass(NumberBase))
  implements INumber, Resettable
{
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

  mult(toMult: number) {
    this.original.mult(toMult);
  }

  multAsAdd(toMult: number) {
    this.original.multAsAdd(toMult);
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
  implements Resettable, StrongResettable
{
  constructor() {
    super(NoopState.instance);
  }
  noop() {
    this.send(new Uint8Array());
  }
  protected receivePrimitive(
    _timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (message.length !== 0)
      throw new Error("Unexpected nontrivial message for NoopCrdt");
  }
  reset() {}
  strongReset() {}

  canGC() {
    return true;
  }
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
  extends AddFlagEvents(ResetWrapClass(NoopCrdt, true, false))
  implements IFlag, Resettable
{
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
  extends AddFlagEvents(ResetWrapClass(NoopCrdt, true, false))
  implements IFlag, Resettable
{
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
  implements CrdtParent
{
  private readonly internalMap: Map<string, C> = new Map();
  private readonly backupMap: WeakValueMap<string, C> = new WeakValueMap();
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
   * @param gcValues If true, value Crdt's that are garbage
   * collectible (canGC() is true) will occasionally be deleted
   * from this map's explicit keys to save space, later being
   * recreated with valueConstructor if necessary.  This is only safe
   * if value Crdt's and their descendants are never stored by-reference
   * across event loops.
   */
  constructor(
    private readonly valueConstructor: (key: K) => C,
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    private readonly gcValues = false
  ) {
    super();
  }

  private keyAsString(key: K) {
    return arrayAsString(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(stringAsArray(str), this.runtime);
  }

  get(key: K): C {
    return this.getInternal(key, this.keyAsString(key))[0];
  }

  private getInternal(
    key: K,
    keyString: string
  ): [value: C, nontrivial: boolean] {
    let value = this.internalMap.get(keyString);
    if (value === undefined) {
      // Check the backup map
      value = this.backupMap.get(keyString);
      if (value === undefined) {
        // Create it, but only in the backup map,
        // since it is currently GC-able
        value = this.valueConstructor(key);

        this.childBeingAdded = value;
        value.init(keyString, this);
        this.childBeingAdded = undefined;

        this.backupMap.set(keyString, value);
      }
      return [value, false];
    } else return [value, true];
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

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // Message for a child
    let keyString = targetPath[targetPath.length - 1];
    let key = this.stringAsKey(keyString);
    let [value, nontrivialStart] = this.getInternal(key, keyString);
    targetPath.length--;
    value.receive(targetPath, timestamp, message);
    this.emit("ValueChange", {
      key,
      value,
      caller: this,
      timestamp,
    });

    // If the value became GC-able, move it to the
    // backup map
    if (nontrivialStart && value.canGC()) {
      this.internalMap.delete(keyString);
      this.backupMap.set(keyString, value);
    }
    // If the value became nontrivial, move it to the
    // main map
    else if (!nontrivialStart && !value.canGC()) {
      this.backupMap.delete(keyString);
      this.internalMap.set(keyString, value);
    }
  }

  // TODO: hack for MapCrdt; remove later
  receiveLocal(
    key: K,
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    this.receive([...targetPath, this.keyAsString(key)], timestamp, message);
  }

  // TODO: ChangeEvent's whenever children are changed

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let keyString = targetPath[targetPath.length - 1];
    let value = this.getInternal(this.stringAsKey(keyString), keyString)[0];
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
    for (let entry of this.backupMap.entries()) {
      ans.set(this.stringAsKey(entry[0]), entry[1]);
    }
    return ans;
  }

  explicitKeys(): Set<K> {
    let ans = new Set<K>();
    for (let keyString of this.internalMap.keys()) {
      ans.add(this.stringAsKey(keyString));
    }
    for (let entry of this.backupMap.entries()) {
      ans.add(this.stringAsKey(entry[0]));
    }
    return ans;
  }

  explicitValues() {
    let ans: C[] = [];
    for (let value of this.internalMap.values()) {
      ans.push(value);
    }
    for (let entry of this.backupMap.entries()) {
      ans.push(entry[1]);
    }
    return ans;
  }

  get explicitSize(): number {
    // TODO: make run in constant time?  Or remove this method?
    return this.internalMap.size + this.backupMap.entries().length;
  }

  canGC() {
    return this.internalMap.size === 0;
  }
}

export interface SetEvent<T> extends CrdtEvent {
  readonly element: T;
}

export interface SetEventsRecord<T> extends CrdtEventsRecord {
  SetAdd: SetEvent<T>;
  SetDelete: SetEvent<T>;
}

export class AddWinsSet<T>
  extends CompositeCrdt<SetEventsRecord<T>>
  implements Resettable
{
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
      "1",
      new LazyMap(() => new EnableWinsFlag(), elementSerializer, true)
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

  get size(): number {
    // TODO: optimize.  This should take constant time.
    return this.value.size;
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
  implements Resettable
{
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
   *
   * @param gcValues If true, value Crdt's that are garbage
   * collectible (canGC() is true) will occasionally be deleted
   * from this map's explicit keys to save space, later being
   * recreated with valueConstructor if necessary.  This is only safe
   * if value Crdt's and their descendants are never stored by-reference
   * across event loops.
   */
  constructor(
    valueConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    gcValues = false
  ) {
    super();
    this.keySet = this.addChild("1", new AddWinsSet(keySerializer));
    this.valueMap = this.addChild(
      "2",
      new LazyMap(valueConstructor, keySerializer, gcValues)
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
    if (!this.has(key)) this.addKey(key);
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

  get size(): number {
    return this.keySet.size;
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

export interface LwwMapEventsRecord<K, V> extends CrdtEventsRecord {
  //KeyAdd: MapEvent<K, V>; // TODO
  KeyDelete: KeyEvent<K>;
  ValueChange: MapEvent<K, V>; // TODO: include old value?
}

export class LwwMap<K, V>
  extends CompositeCrdt<LwwMapEventsRecord<K, V>>
  implements Resettable
{
  private readonly internalMap: LazyMap<K, LwwRegister<Optional<V>>>;
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
      "1",
      new LazyMap(
        () =>
          new LwwRegister(
            Optional.empty(),
            new OptionalSerializer(valueSerializer)
          ),
        keySerializer,
        true
      )
    );

    // TODO: use LwwRegister's LwwEvent's instead
    // so we can report old value & whether the
    // value is new
    this.internalMap.on("ValueChange", (event) => {
      if (!event.value.value.isPresent) {
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
          value: event.value.value.get(),
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
    else return this.internalMap.get(key).value.get();
  }

  has(key: K): boolean {
    // TODO: way to optimize checking if the value is
    // not present?  Currently this creates the value
    // and will then immediately GC it.
    return this.internalMap.get(key).value.isPresent;
  }

  set(key: K, value: V) {
    this.internalMap.get(key).value = Optional.of(value);
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
      if (crdt.value.isPresent) values.push(crdt.value.get());
    }
    return values.values();
  }

  entries() {
    let entries: [K, V][] = [];
    for (let entry of this.internalMap.explicitEntries().entries()) {
      if (entry[1].value.isPresent)
        entries.push([entry[0], entry[1].value.get()]);
    }
    return entries.values();
  }

  get size(): number {
    // TODO: optimize.  This should take constant time.
    let ans = 0;
    for (let key of this.internalMap.explicitKeys()) {
      if (this.has(key)) ans++;
    }
    return ans;
  }

  reset() {
    // TODO: optimize (just one message)
    for (let crdt of this.internalMap.explicitValues()) {
      crdt.reset();
    }
  }
}

// TODO: set/map return things: can't use set for values in case of duplicates? (what do Set/Map do?)

export interface NewCrdtEvent<C extends Crdt> extends CrdtEvent {
  readonly newCrdt: C;
}

export interface DynamicCrdtSourceEventsRecord<C extends Crdt>
  extends CrdtEventsRecord {
  NewCrdt: NewCrdtEvent<C>;
}

// TODO: resets/canGC, to allow proper nesting?
// What would the use case and semantics be?
// TODO: use crdtConstructor type as generic type instead
// of explicitly separating args and C?  Makes using the
// type more intuitive.
export class DynamicCrdtSource<
  TArgs extends any[],
  C extends Crdt
> extends Crdt<DynamicCrdtSourceEventsRecord<C>> {
  private readonly children: Map<string, C> = new Map();

  /**
   * If you use the default argsSerializer, then args
   * (as an array) must be serializable with BSON.
   * In particular, undefined (e.g. due to optional
   * arguments), functions, and serializers
   * are not allowed.
   * TODO: nicer way to do this?
   * @param crdtConstructor [description]
   */
  constructor(
    private readonly crdtConstructor: (...args: TArgs) => C,
    private readonly argsSerializer: ElementSerializer<TArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
  }

  private ourCreatedCrdt: C | undefined = undefined;
  new(...args: TArgs): C {
    this.runtime.send(this, this.argsSerializer.serialize(args));
    let created = this.ourCreatedCrdt;
    if (created === undefined) {
      // TODO: use assertion instead
      throw new Error("Bug: created was undefined");
    }
    this.ourCreatedCrdt = undefined;
    return created;
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length === 0) {
      // It's a new Crdt message.
      const args = this.argsSerializer.deserialize(message, this.runtime);
      const newCrdt = this.crdtConstructor(...args);
      // Add as child with "counter:sender" as id.  Similar
      // to CompositeCrdt#addChild.
      let name = timestamp.getSenderCounter() + ":" + timestamp.getSender();
      if (this.children.has(name)) {
        throw new Error(
          'Duplicate newCrdt name (was timestamp reused?): "' + name + '"'
        );
      }
      this.children.set(name, newCrdt);
      this.childBeingAdded = newCrdt;
      newCrdt.init(name, this);
      this.childBeingAdded = undefined;

      this.emit("NewCrdt", { caller: this, newCrdt, timestamp });

      if (timestamp.isLocal()) {
        this.ourCreatedCrdt = newCrdt;
      }
    } else {
      // Message for an existing child.  Proceed as in
      // CompositeCrdt.
      let child = this.children.get(targetPath[targetPath.length - 1]);
      if (child === undefined) {
        // TODO: deliver error somewhere reasonable
        throw new Error(
          "Unknown child: " +
            targetPath[targetPath.length - 1] +
            " in: " +
            JSON.stringify(targetPath) +
            ", children: " +
            JSON.stringify([...this.children.keys()])
        );
      }
      targetPath.length--;
      child.receive(targetPath, timestamp, message);
    }
  }

  private childBeingAdded?: C;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (use this.new or a CompositeCrdt instead)"
      );
    }
  }

  getDescendant(targetPath: string[]): Crdt<CrdtEventsRecord> {
    // Copied from CompositeCrdt.  TODO: unify implementations?
    if (targetPath.length === 0) return this;

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    targetPath.length--;
    return child.getDescendant(targetPath);
  }

  canGC(): boolean {
    return this.children.size === 0;
  }

  // /**
  //  * Constructor args must be serializable with the
  //  * default serializer (basically BSON).
  //  *
  //  * @param  [description]
  //  * @return          [description]
  //  */
  // static for<TArgs extends any[], C extends Crdt>(
  //   CrdtClass: ConstructorArgs<TArgs, C>
  // ): DynamicCrdtSource<TArgs, C> {
  //   return new DynamicCrdtSource((...args: TArgs) => new CrdtClass(...args));
  // }
}
