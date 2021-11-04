import {
  bytesAsString,
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
  stringAsBytes,
  WeakValueMap,
} from "../../util";
import {
  CausalTimestamp,
  Crdt,
  CrdtEventMeta,
  CrdtInitToken,
} from "../../core";
import { Resettable } from "../../abilities";
import { AbstractCMapCrdt } from "./abstract_map";

/**
 * A basic CMap of mutable values that implicitly manages membership.
 * Its main purpose is to manage Crdts sorted by key,
 * in such a way that concurrent operations on the same
 * key's value are merged.
 *
 * For the
 * purpose of the iterators and has, a key is considered
 * to be present in the map if its value is nontrivial,
 * specifically, if value.canGc() returns false.
 * Note that this implies that a just-added key may
 * not be present in the map.  This unusual semantics
 * is necessary because the map does not necessarily
 * maintain all elements internally, only the nontrivial
 * ones, and so the iterators are unable to consistently return
 * all trivial elements.
 *
 * delete and clear throw errors (grow-only semantics).
 * set has no effect, just
 * returning a value by calling get.
 */
export class GrowOnlyImplicitMergingMutCMap<
  K,
  C extends Crdt
> extends AbstractCMapCrdt<K, C, []> {
  private readonly nontrivialMap: Map<string, C> = new Map();
  private readonly trivialMap: WeakValueMap<string, C> = new WeakValueMap();
  /**
   * @param valueConstructor A function used to initialize
   * values when initKey() or getForce() is called on
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
    initToken: CrdtInitToken,
    private readonly valueConstructor: (
      valueInitToken: CrdtInitToken,
      key: K
    ) => C,
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken);
  }

  private keyAsString(key: K) {
    return bytesAsString(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(stringAsBytes(str), this.runtime);
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
        value = this.valueConstructor(new CrdtInitToken(keyString, this), key);

        if (this.inLoad) {
          // We can assume value will be nontrivial once
          // it is recursively loaded, since save only
          // returns the nontrivial children.
          this.nontrivialMap.set(keyString, value);
        } else {
          // The value starts trivial; if it becomes nontrivial
          // due to a message, receiveInternal will move
          // it to nontrivialMap.
          this.trivialMap.set(keyString, value);
        }

        return [value, false];
      }
      return [value, false];
    } else return [value, true];
  }

  private inReceiveKeyStr?: string = undefined;
  private inReceiveValue?: C = undefined;

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const keyString = targetPath[targetPath.length - 1];
    this.inReceiveKeyStr = keyString;
    try {
      // Message for a child
      let key = this.stringAsKey(keyString);
      let [value, nontrivialStart] = this.getInternal(key, keyString);
      this.inReceiveValue = value;

      targetPath.length--;
      value.receive(targetPath, timestamp, message);

      // If the value became GC-able, move it to the
      // backup map
      if (nontrivialStart && value.canGc()) {
        this.nontrivialMap.delete(keyString);
        this.trivialMap.set(keyString, value);
        this.emit("Delete", {
          key,
          deletedValue: value,
          meta: CrdtEventMeta.fromTimestamp(timestamp),
        });
      }
      // If the value became nontrivial, move it to the
      // main map
      else if (!nontrivialStart && !value.canGc()) {
        this.trivialMap.delete(keyString);
        this.nontrivialMap.set(keyString, value);
        this.emit("Set", {
          key,
          // Empty to emphasize that the previous value was
          // not present.
          previousValue: Optional.empty<C>(),
          meta: CrdtEventMeta.fromTimestamp(timestamp),
        });
        // We won't dispatch Set events when the value
        // is not new because there can only ever be one
        // value at a given key, due to Merging semantics.
        // An exception is replacement due to GC-ing, but
        // we consider such values "the same"; if users care
        // about the distinction (e.g. because they need
        // to register event handlers), they should do so
        // in valueConstructor, not on Set events.
      }
    } finally {
      this.inReceiveKeyStr = undefined;
      this.inReceiveValue = undefined;
    }
  }

  getChild(name: string): Crdt {
    return this.getInternal(this.stringAsKey(name), name)[0];
  }

  set(key: K): C {
    // No-op, just return the value
    return this.get(key);
  }

  /**
   * Unsupported (throws error).
   */
  delete(_key: K): void {
    throw new Error("Unsupported operation: delete");
  }

  /**
   * Unsupported (throws error).
   */
  clear(): void {
    throw new Error("Unsupported operation: delete");
  }

  /**
   * Note: returns the value even if has = false, so
   * that it's possible to get it, and so that common
   * get! idioms work.  getIfPresent does the usual
   * get semantics.
   * @param  key [description]
   * @return     [description]
   */
  get(key: K): C {
    return this.getInternal(key, this.keyAsString(key))[0];
  }

  getIfPresent(key: K): C | undefined {
    const str = this.keyAsString(key);
    if (this.inReceiveKeyStr === str) {
      // The state of nontrivialMap cannot be relied
      // upon, since it hasn't been recalculated yet.
      // Instead, use canGc directly.
      if (!this.inReceiveValue!.canGc()) {
        return this.inReceiveValue!;
      } else return undefined;
    }
    return this.nontrivialMap.get(this.keyAsString(key));
  }

  has(key: K): boolean {
    const str = this.keyAsString(key);
    if (this.inReceiveKeyStr === str) {
      // The state of nontrivialMap cannot be relied
      // upon, since it hasn't been recalculated yet.
      // Instead, use canGc directly.
      return !this.inReceiveValue!.canGc();
    } else return this.nontrivialMap.has(str);
  }

  hasValue(value: C): boolean {
    return this.owns(value) && !value.canGc();
  }

  /**
   * Returns true if value is owned by this
   * map, i.e., it is an output of this.get.
   */
  owns(value: C): boolean {
    return value.parent === this;
  }

  get size(): number {
    return this.nontrivialMap.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (let [keyStr, value] of this.nontrivialMap) {
      yield [this.stringAsKey(keyStr), value];
    }
  }

  values(): IterableIterator<C> {
    // Override for efficiency
    return this.nontrivialMap.values();
  }

  /**
   * Returns value's key.
   */
  keyOf(value: C): K | undefined {
    if (!this.owns(value)) return undefined;
    return this.stringAsKey(value.name);
  }

  canGc() {
    /*
     * We don't need to check here that the backup
     * map is nonempty (which would be expensive):
     * each value points to us (due to Crdt.parent),
     * so we will only be forgotten by a containing
     * implicit map if all of our children have no
     * references to them, which is equivalent to the
     * backup map being empty(able).
     */
    return this.nontrivialMap.size === 0;
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    return [new Uint8Array(), this.nontrivialMap];
  }

  private inLoad = false;
  load(_saveData: Uint8Array): boolean {
    this.inLoad = true;
    return true;
  }

  postLoad() {
    this.inLoad = false;
  }
}

/**
 * A basic CMap that implicitly manages membership.
 * Its main purpose is to manage Crdts sorted by key,
 * in such a way that concurrent operations on the same
 * key's value are merged.
 *
 * For the
 * purpose of the iterators and has, a key is considered
 * to be present in the map if its value is nontrivial,
 * specifically, if value.canGc() returns false.
 * Note that this implies that a just-added key may
 * not be present in the map.  This unusual semantics
 * is necessary because the map does not necessarily
 * maintain all elements internally, only the nontrivial
 * ones, and so the iterators are unable to consistently return
 * all trivial elements.
 *
 * delete and clear reset the affected values, making
 * them no longer present, as one would expect.
 *
 * set has no effect, just
 * returning a value by calling get.
 */
export class ImplicitMergingMutCMap<
  K,
  C extends Crdt & Resettable
> extends GrowOnlyImplicitMergingMutCMap<K, C> {
  constructor(
    initToken: CrdtInitToken,
    valueConstructor: (valueInitToken: CrdtInitToken, key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken, valueConstructor, keySerializer);
  }

  delete(key: K): void {
    this.getIfPresent(key)?.reset();
  }

  clear() {
    for (const value of this.values()) value.reset();
  }

  reset() {
    // Clear is an observed-reset
    this.clear();
  }
}