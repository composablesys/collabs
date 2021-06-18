import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
  WeakValueMap,
} from "../../util";
import { Resettable } from "../helper_crdts";
import { Crdt } from "../core";
import { AddWinsPlainSet, GPlainSet, PlainSet } from "../set";
import { AbstractCrdtMap } from "./abstract_maps";
import { CrdtParent } from "../core";
import { CausalTimestamp } from "../../net";
import { CrdtMap, CrdtMapEventsRecord } from "./interfaces";
import { DecoratedCrdtMap } from "./decorated_maps";

/**
 * Options for Riak-style CrdtMaps:
 * - Key membership:
 *     - Implicit: contains only keys whose valueCrdts are nontrivial (canGc is false))
 *     - Explicit: determined by a given PlainSet
 *     - Both: union of implicit and explicit members
 * - Whether deletes perform a reset on the valueCrdt (T/F)
 *
 * TODO: violations of sequential semantics.
 *
 * The three membership options correspond to
 * ImplicitCrdtMap, ExplicitCrdtMap w/ includeImplicit =
 * false, and ExplicitCrdtMap w/ includeImplicit = true.
 * For those, deletes don't perform a reset; to change that,
 * input them to ResettingCrdtMap.
 *
 * RiakCrdtMap has "both" membership, and deletes do perform
 * a reset.  TODO: discuss GC-able options.
 */

/**
 * A basic CrdtMap that implicitly manages membership.
 * Its main purpose is to manage Crdts sorted by key,
 * in such a way that concurrent operations on the same
 * key's value are merged.
 *
 * For the
 * purpose of the iterators and has, a key is considered
 * to be present in the map if its valuCrdt is nontrivial,
 * specifically, if valueCrdt.canGc() returns false.
 * Note that this implies that a just-added key may
 * not be present in the map.  This unusual semantics
 * is necessary because the map does not necessarily
 * maintain all elements internally, only the nontrivial
 * ones, and so the iterators are unable to consistently return
 * all trivial elements.
 *
 * delete, clear, reset, and restore have no effect.
 */
export class ImplicitCrdtMap<K, C extends Crdt>
  extends Crdt<CrdtMapEventsRecord<K, C>>
  implements CrdtMap<K, C>, CrdtParent
{
  private readonly nontrivialMap: Map<string, C> = new Map();
  private readonly trivialMap: WeakValueMap<string, C> = new WeakValueMap();
  /**
   * Map keys and their serializer/deserializer are handled as in
   * GSetCrdt.
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
   */
  constructor(
    private readonly valueConstructor: (key: K) => C,
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
  }

  private keyAsString(key: K) {
    return arrayAsString(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(stringAsArray(str), this.runtime);
  }

  private getInternal(
    key: K,
    keyString: string
  ): [value: C, nontrivial: boolean] {
    let value = this.nontrivialMap.get(keyString);
    if (value === undefined) {
      // Check the backup map
      value = this.trivialMap.get(keyString);
      if (value === undefined) {
        // Create it, but only in the backup map,
        // since it is currently GC-able
        value = this.valueConstructor(key);

        this.childBeingAdded = value;
        value.init(keyString, this);
        this.childBeingAdded = undefined;

        this.trivialMap.set(keyString, value);

        // Dispatch ValueInit event immediately, so that listeners
        // can register any messages are received.
        this.emit("ValueInit", {
          key,
          value,
        });
        return [value, false];
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

  private inReceiveKeyStr: string | undefined = undefined;
  private inReceiveValueCrdt: C | undefined = undefined;

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // TODO: like many (?) things, this will break if
    // a message is received (e.g. due to a local operation)
    // during one of the event handlers.
    const keyString = targetPath[targetPath.length - 1];
    this.inReceiveKeyStr = keyString;
    try {
      // Message for a child
      let key = this.stringAsKey(keyString);
      let [value, nontrivialStart] = this.getInternal(key, keyString);
      this.inReceiveValueCrdt = value;

      targetPath.length--;
      value.receive(targetPath, timestamp, message);

      // If the value became GC-able, move it to the
      // backup map
      if (nontrivialStart && value.canGc()) {
        this.nontrivialMap.delete(keyString);
        this.trivialMap.set(keyString, value);
        this.emit("KeyDelete", { key, timestamp });
      }
      // If the value became nontrivial, move it to the
      // main map
      else if (!nontrivialStart && !value.canGc()) {
        this.trivialMap.delete(keyString);
        this.nontrivialMap.set(keyString, value);
        this.emit("KeyAdd", { key, timestamp });
      }
    } finally {
      this.inReceiveKeyStr = undefined;
      this.inReceiveValueCrdt = undefined;
    }
  }

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let keyString = targetPath[targetPath.length - 1];
    let value = this.getInternal(this.stringAsKey(keyString), keyString)[0];
    targetPath.length--;
    return value.getDescendant(targetPath);
  }

  clear(): void {
    // No-op
  }

  delete(key: K): boolean {
    // No-op
    return this.has(key);
  }

  /**
   * TODO: returns the value even if has = false, so
   * that it's possible to get it, and so that common
   * get! idioms work.  getIfPresent does the usual
   * get semantics.  (TODO: Swap these roles?)
   * @param  key [description]
   * @return     [description]
   */
  get(key: K): C {
    return this.getInternal(key, this.keyAsString(key))[0];
  }

  getIfPresent(key: K): C | undefined {
    return this.nontrivialMap.get(this.keyAsString(key));
  }

  /**
   * Returns true if valueCrdt is owned by this
   * ImplicitCrdtMap, i.e., it is an output of this.get.
   */
  owns(valueCrdt: C): boolean {
    return valueCrdt.parent === this;
  }

  private checkOwns(valueCrdt: C) {
    if (!this.owns(valueCrdt)) {
      throw new Error("valueCrdt is not owned by this ImplicitCrdtMap");
    }
  }

  has(key: K): boolean {
    const str = this.keyAsString(key);
    if (this.inReceiveKeyStr === str) {
      // The state of nontrivialMap cannot be relied
      // upon, since it hasn't been recalculated yet.
      // Instead, use canGc directly.
      return !this.inReceiveValueCrdt!.canGc();
    } else return this.nontrivialMap.has(str);
  }

  hasValue(valueCrdt: C): boolean {
    this.checkOwns(valueCrdt);
    return !valueCrdt.canGc();
  }

  addKey(_key: K): this {
    // No-op
    return this;
  }

  /**
   * Returns valueCrdt's key.
   */
  keyOf(valueCrdt: C): K {
    this.checkOwns(valueCrdt);
    return this.stringAsKey(valueCrdt.name);
  }

  get size(): number {
    return this.nontrivialMap.size;
  }

  [Symbol.iterator](): IterableIterator<[K, C]> {
    return this.entries();
  }

  *entries(): IterableIterator<[K, C]> {
    for (let [keyStr, valueCrdt] of this.nontrivialMap) {
      yield [this.stringAsKey(keyStr), valueCrdt];
    }
  }

  *keys(): IterableIterator<K> {
    for (let str of this.nontrivialMap.keys()) {
      yield this.stringAsKey(str);
    }
  }

  values(): IterableIterator<C> {
    return this.nontrivialMap.values();
  }

  reset() {
    // No-op
  }

  canGc() {
    /*
     * We don't need to check here that the backup
     * map is nonempty (which would be expensive):
     * each value Crdt points to us (due to Crdt.parent),
     * so we will only be forgotten by a containing
     * ImplicitCrdtMap if all of our children have no
     * references to them, which is equivalent to the
     * backup map being empty(able).
     */
    return this.nontrivialMap.size === 0;
  }
}

export class ExplicitCrdtMap<K, C extends Crdt> extends AbstractCrdtMap<K, C> {
  protected readonly implicitMap: ImplicitCrdtMap<K, C>;
  protected readonly keySet: PlainSet<K>;
  protected readonly includeImplicit: boolean;

  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySet: PlainSet<K>,
    settings: { includeImplicit: boolean },
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.implicitMap = this.addChild(
      "",
      new ImplicitCrdtMap(valueCrdtConstructor, keySerializer)
    );
    this.keySet = this.addChild("0", keySet);
    this.includeImplicit = settings.includeImplicit;

    // Events
    // TODO: optimize to reduce closures?
    this.implicitMap.on("ValueInit", (event) => {
      if (this.includeImplicit) {
        event.value.on("Change", (event2) => {
          if (this.has(event.key)) {
            this.emit("KeyAdd", {
              key: event.key,
              timestamp: event2.timestamp,
            });
          } else {
            this.emit("KeyDelete", {
              key: event.key,
              timestamp: event2.timestamp,
            });
          }
        });
      }
      this.emit("ValueInit", event);
    });
    this.keySet.on("Add", (event) =>
      this.emit("KeyAdd", { key: event.value, timestamp: event.timestamp })
    );
    this.keySet.on("Delete", (event) => {
      // We should check it's really deleted, if includeImplicit
      // is true.
      if (!this.includeImplicit || !this.has(event.value)) {
        this.emit("KeyDelete", {
          key: event.value,
          timestamp: event.timestamp,
        });
      }
    });
  }

  clear(): void {
    this.keySet.clear();
  }

  delete(key: K): boolean {
    const had = this.has(key);
    this.keySet.delete(key);
    return had;
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.implicitMap.get(key);
    else return undefined;
  }

  owns(valueCrdt: C): boolean {
    return this.implicitMap.owns(valueCrdt);
  }

  has(key: K): boolean {
    return (
      this.keySet.has(key) ||
      (this.includeImplicit && this.implicitMap.has(key))
    );
  }

  addKey(key: K): this {
    this.keySet.add(key);
    return this;
  }

  keyOf(valueCrdt: C): K {
    return this.implicitMap.keyOf(valueCrdt);
  }

  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }

  *entries(): IterableIterator<[K, C]> {
    // TODO: can we make the order EC?
    for (let key of this.keySet) yield [key, this.implicitMap.get(key)];
    if (this.includeImplicit) {
      // TODO: this might get weird if there are
      // concurrent mutations.
      for (let [key, valueCrdt] of this.implicitMap) {
        // Only yield it if it has not been yielded already.
        if (!this.keySet.has(key)) yield [key, valueCrdt];
      }
    }
  }

  /**
   * TODO: doesn't reset values, so canGc might be false afterwards
   */
  reset(): void {
    this.keySet.reset();
  }
}

export class ResettingCrdtMap<
  K,
  C extends Crdt & Resettable
> extends DecoratedCrdtMap<K, C> {
  constructor(map: CrdtMap<K, C>) {
    super(map);
  }

  delete(key: K): boolean {
    const had = this.has(key);
    // TODO: avoid creating the CRDT for implicit map?
    const valueCrdt = this.map.get(key);
    if (valueCrdt !== undefined) valueCrdt.reset();
    super.delete(key);
    return had;
  }

  clear(): void {
    // TODO: inefficient for implicit map because this
    // might create valueCrdts that are explicitly
    // present but not implicitly present, just
    // to reset them.  Probably not worth breaking
    // the decorator abstract to optimize, though,
    // especially since such reset calls are no-ops,
    // it is just the cost of creating trivial valueCrdts.
    // Likewise for reset() below.
    for (let valueCrdt of this.values()) valueCrdt.reset();
    super.clear();
  }

  reset(): void {
    for (let valueCrdt of this.values()) valueCrdt.reset();
    super.reset();
  }
}

// TODO: better name?
// TODO: indicate that this is the default for CrdtMaps
export class RiakCrdtMap<
  K,
  C extends Crdt & Resettable
> extends ResettingCrdtMap<K, C> {
  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(
      new ExplicitCrdtMap(
        valueCrdtConstructor,
        new AddWinsPlainSet(keySerializer),
        {
          includeImplicit: true,
        },
        keySerializer
      )
    );
  }
}

// TODO: note which methods will throw errors
// (due to errors from GPlainSet).
export class GCrdtMap<K, C extends Crdt> extends ExplicitCrdtMap<K, C> {
  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(
      valueCrdtConstructor,
      new GPlainSet(keySerializer),
      {
        includeImplicit: false,
      },
      keySerializer
    );
  }
}
