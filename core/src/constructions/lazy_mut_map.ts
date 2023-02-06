import { LazyMutCMapSave } from "../../generated/proto_compiled";
import {
  Collab,
  CollabEventsRecord,
  ICollabParent,
  InitToken,
  MetaRequest,
  UpdateMeta,
} from "../core";
import {
  Bytes,
  DefaultSerializer,
  Optional,
  Serializer,
  WeakValueMap,
} from "../util";
// Import AbstractCMapCollab from its specific file.
// Otherwise, AbstractCMapCObject and LazyMutCMap
// create a circular dependency between constructions
// and data_types.
import { AbstractCMapCollab } from "../data_types/abstract_map";

/**
 * A IMap of mutable values where every key is
 * implicitly always present, although only nontrivial
 * values are actually stored in memory.
 *
 * Alternatively, you can think of this like a [[CObject]]
 * with one property/child per key (potentially infinitely
 * many). Like a [[CObject]], it makes sense for general
 * Collabs, not just CRDTs.
 *
 * The "always exists" nature means that, unlike in
 * [[DeletingMutCMap]] and [[ArchivingMutCMap]], there
 * is no conflict when two users concurrently "create"
 * values with the same key. Instead, they are just accessing
 * the same value. If they perform operations on that
 * value concurrently, then those operations will all
 * apply to the value, effectively merging their changes.
 *
 * ## Laziness
 *
 * The name "LazyMap" references the [Apache Commons
 * LazyMap](https://commons.apache.org/proper/commons-collections/apidocs/org/apache/commons/collections4/map/LazyMap.html).
 * That map likewise creates values on demand using a
 * factory method, to give the impression that all
 * keys are always present.
 *
 * ## Key Presence
 *
 * For the
 * purpose of the iterators and has, a key is considered
 * to be present in the map if its value is nontrivial,
 * specifically, if value.canGC() returns false.
 * Note that this implies that a just-added key may
 * not be present in the map.  This unusual semantics
 * is necessary because the map does not necessarily
 * maintain all elements internally, only the nontrivial
 * ones, and so the iterators are unable to consistently return
 * all trivial elements.
 *
 * [[delete]] and [[clear]] throw errors (grow-only semantics).
 * [[set]] has no effect; it just returns the same value
 * as [[get]].
 *
 * "Set" and "Delete" events respect these key presence
 * rules: "Set" is emitted for a key when its value
 * goes from trivial to nontrivial, and "Delete"
 * is emitted when its vale goes from nontrivial to trivial.
 * Since this is a bit weird, we expect these events to
 * be used rarely.
 *
 * Since a value can be created without emitting a
 * "Set" event (in case it remains trivial), you should
 * register event handlers on values in `valueConstructor`,
 * not in a "Set" handler.
 *
 * ## Garbage Collection
 *
 * A value may be garbage collected if:
 * (1) `value.canGC` returns false ([[Collab.canGC]])
 * (2) There are no other references to the value.
 *
 * In this case, the JavaScript garbage collector is
 * allowed to reclaim the value. If the value is
 * referenced later (either by calling [[get]] locally
 * or because it receives a message), then it is
 * recreated using `valueConstructor`. This is okay
 * by the contract of [[Collab.canGC]].
 */
export class LazyMutCMap<K, C extends Collab>
  extends AbstractCMapCollab<K, C, []>
  implements ICollabParent
{
  private readonly nontrivialMap: Map<string, C> = new Map();
  private readonly trivialMap: WeakValueMap<string, C> = new WeakValueMap();
  /**
   * @param valueConstructor Used to construct the
   * value with the given key. For each key, the constructed values
   * must be the same on all replicas, i.e., the
   * same class and constructor arguments.
   */
  constructor(
    init: InitToken,
    private readonly valueConstructor: (valueInitToken: InitToken, key: K) => C,
    private readonly keySerializer: Serializer<K> = DefaultSerializer.getInstance()
  ) {
    super(init);
  }

  private keyAsString(key: K) {
    return Bytes.stringify(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(Bytes.parse(str));
  }

  private getInternal(
    key: K,
    keyString: string,
    inLoad: boolean
  ): [value: C, nontrivial: boolean] {
    let value = this.nontrivialMap.get(keyString);
    if (value === undefined) {
      // Check the backup map
      value = this.trivialMap.get(keyString);
      if (value === undefined) {
        // Create it.
        value = this.valueConstructor(new InitToken(keyString, this), key);

        if (inLoad) {
          // We are in this.load.
          // So, value.load will be called by this.load
          // right after the value is returned;
          // we don't need to do it here.
          // Also, we can assume value will be nontrivial once
          // it is recursively loaded, since save only
          // returns the nontrivial children.
          this.nontrivialMap.set(keyString, value);
        } else {
          // The value starts trivial; if it becomes nontrivial
          // due to a message, receive will move
          // it to nontrivialMap.
          this.trivialMap.set(keyString, value);
        }

        return [value, false];
      }
      return [value, false];
    } else return [value, true];
  }

  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: Uint8Array[],
    metaRequests: MetaRequest[]
  ): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    messagePath.push(child.name);
    this.send(messagePath, metaRequests);
  }

  private inReceiveKeyStr?: string = undefined;
  private inReceiveValue?: C = undefined;

  receive(messagePath: Uint8Array[], meta: UpdateMeta): void {
    const keyString = <string>messagePath[messagePath.length - 1];
    this.inReceiveKeyStr = keyString;
    try {
      // Message for a child
      const key = this.stringAsKey(keyString);
      const [value, nontrivialStart] = this.getInternal(key, keyString, false);
      this.inReceiveValue = value;

      messagePath.length--;
      value.receive(messagePath, meta);

      // If the value became GC-able, move it to the
      // backup map
      if (nontrivialStart && value.canGC()) {
        this.nontrivialMap.delete(keyString);
        this.trivialMap.set(keyString, value);
        this.emit("Delete", { key, value, meta });
      }
      // If the value became nontrivial, move it to the
      // main map
      else if (!nontrivialStart && !value.canGC()) {
        this.trivialMap.delete(keyString);
        this.nontrivialMap.set(keyString, value);
        this.emit("Set", {
          key,
          value,
          previousValue: Optional.empty<C>(),
          meta,
        });
        // We don't dispatch Set events when the value
        // is not new because there can only ever be one
        // value at a given key.
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
    return this.getInternal(key, this.keyAsString(key), false)[0];
  }

  getIfPresent(key: K): C | undefined {
    const str = this.keyAsString(key);
    if (this.inReceiveKeyStr === str) {
      // The state of nontrivialMap cannot be relied
      // upon, since it hasn't been recalculated yet.
      // Instead, use canGC directly.
      if (!this.inReceiveValue!.canGC()) {
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
      // Instead, use canGC directly.
      return !this.inReceiveValue!.canGC();
    } else return this.nontrivialMap.has(str);
  }

  get size(): number {
    return this.nontrivialMap.size;
  }

  *entries(): IterableIterator<[K, C]> {
    // Note: this doesn't check inReceiveValue. Should document.
    for (const [keyStr, value] of this.nontrivialMap) {
      yield [this.stringAsKey(keyStr), value];
    }
  }

  values(): IterableIterator<C> {
    // Override for efficiency.
    // Note: this doesn't check inReceiveValue. Should document.
    return this.nontrivialMap.values();
  }

  /**
   * Returns the unique key associated to a value owned
   * by this map. If
   * the value is not owned by this map, returns undefined.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: C): K | undefined {
    if (searchElement.parent !== this) return undefined;
    return this.stringAsKey(searchElement.name);
  }

  save(): Uint8Array {
    const childSaves: { [name: string]: Uint8Array } = {};
    // Only need to save nontrivial children, since trivial
    // children are in their initial states.
    for (const [name, child] of this.nontrivialMap) {
      childSaves[name] = child.save();
    }
    const saveMessage = LazyMutCMapSave.create({
      childSaves,
    });
    return LazyMutCMapSave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array, meta: UpdateMeta): void {
    const saveMessage = LazyMutCMapSave.decode(saveData);
    for (const [name, childSave] of Object.entries(saveMessage.childSaves)) {
      const child = this.getInternal(this.stringAsKey(name), name, true)[0];
      child.load(childSave, meta);
    }
  }

  getDescendant(namePath: Iterator<string>): Collab | undefined {
    const next = namePath.next();

    if (next.done) return this;

    const name = next.value;
    const child = this.getInternal(this.stringAsKey(name), name, false)[0];
    return child.getDescendant(namePath);
  }

  canGC() {
    /*
     * We don't need to check here that the backup
     * map is nonempty (which would be expensive):
     * each value points to us (due to Collab.parent),
     * so we will only be forgotten by a containing
     * implicit map if all of our children have no
     * references to them, which is equivalent to the
     * backup map being empty(able).
     */
    return this.nontrivialMap.size === 0;
  }
}
