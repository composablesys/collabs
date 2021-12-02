import { DefaultSerializer, Optional } from "../../util";
import { Crdt, InitToken, Serializer, Pre } from "../../core";
import { Resettable } from "../../abilities";
import { AddWinsCSet } from "../set";
import { AbstractCMapCObject } from "./abstract_map";
import { ImplicitMergingMutCMap } from "./implicit_merging_mut_map";

export class MergingMutCMap<K, C extends Crdt & Resettable>
  extends AbstractCMapCObject<K, C, []>
  implements Resettable
{
  private readonly internalMap: ImplicitMergingMutCMap<K, C>;
  private readonly keySet: AddWinsCSet<K>;
  private cachedSize = 0;

  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, key: K) => C,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);

    this.internalMap = this.addChild(
      "",
      Pre(ImplicitMergingMutCMap)(valueConstructor, keySerializer)
    );
    this.keySet = this.addChild("0", Pre(AddWinsCSet)(keySerializer));

    // Events
    this.internalMap.on("Set", (event) => {
      if (!event.previousValue.isPresent) {
        // The set key is new to internalMap.
        if (!this.keySet.has(event.key)) {
          // The key was (is) not already present in this
          // map due to the keySet.
          // Therefore the key is new.
          this.cachedSize++;
          this.emit("Set", {
            key: event.key,
            previousValue: Optional.empty<C>(),
            meta: event.meta,
          });
        }
      }
      // We won't dispatch Set events when the value
      // is not new because there can only ever be one
      // value at a given key, due to Merging semantics.
      // An exception is replacement due to GC-ing, but
      // we consider such values "the same"; if users care
      // about the distinction (e.g. because they need
      // to register event handlers), they should do so
      // in valueConstructor, not on Set events.
    });
    this.keySet.on("Add", (event) => {
      // Sets only dispatch Add events for values that
      // are actually new (not redundant).
      if (!this.internalMap.has(event.value)) {
        // The key was (is) not already present in this
        // map due to the internalMap.
        // Therefore the key is new.
        this.cachedSize++;
        this.emit("Set", {
          key: event.value,
          previousValue: Optional.empty<C>(),
          meta: event.meta,
        });
      }
    });
    this.internalMap.on("Delete", (event) => {
      // Maps only dispatch Delete events for values that
      // are actually deleted (not redundant).
      if (!this.has(event.key)) {
        // The key is now actually deleted.
        this.cachedSize--;
        this.emit("Delete", {
          key: event.key,
          // This shouldn't be a performance issue because
          // the value most likely still exists in
          // internalMap's trivialMap (hasn't been GC'd yet).
          deletedValue: this.internalMap.get(event.key),
          meta: event.meta,
        });
      }
    });
    this.keySet.on("Delete", (event) => {
      // Sets only dispatch Delete events for values that
      // are actually deleted (not redundant).
      if (!this.has(event.value)) {
        // The key is now actually deleted.
        this.cachedSize--;
        const outerThis = this;
        this.emit("Delete", {
          key: event.value,
          // Use a getter to avoid forcing internalMap
          // to create the value unless demanded.
          get deletedValue() {
            return outerThis.internalMap.get(event.value);
          },
          meta: event.meta,
        });
      }
    });
  }

  set(key: K): C {
    this.keySet.add(key);
    return this.internalMap.set(key);
  }

  delete(key: K): void {
    this.keySet.delete(key);
    this.internalMap.delete(key);
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.internalMap.get(key);
    else return undefined;
  }

  has(key: K): boolean {
    return this.keySet.has(key) || this.internalMap.has(key);
  }

  owns(value: C): boolean {
    return this.internalMap.owns(value);
  }

  restore(key: K): void {
    this.keySet.add(key);
  }

  keyOf(value: C): K | undefined {
    return this.internalMap.keyOf(value);
  }

  get size(): number {
    return this.cachedSize;
  }

  *entries(): IterableIterator<[K, C]> {
    // TODO: could get weird if there is concurrent modification
    for (const entry of this.internalMap.entries()) yield entry;
    for (const key of this.keySet) {
      // Skip already yielded ones
      if (!this.internalMap.has(key)) {
        yield [key, this.internalMap.get(key)];
      }
    }
  }

  clear() {
    // Someday this may be more efficient than deleting
    // every element
    this.keySet.clear();
    this.internalMap.clear();
  }

  reset() {
    this.keySet.reset();
    this.internalMap.reset();
  }

  postLoad() {
    // Compute cachedSize directly.
    for (const _ of this.values()) this.cachedSize++;
  }
}
