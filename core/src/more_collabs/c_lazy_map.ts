import {
  Collab,
  CollabEventsRecord,
  CollabID,
  collabIDOf,
  InitToken,
  IParent,
  MetaRequest,
  Parent,
  SavedStateTree,
  UpdateMeta,
} from "../core";
import {
  Bytes,
  DefaultSerializer,
  Optional,
  Serializer,
  WeakValueMap,
} from "../util";
// Import from specific file to avoid circular dependencies.
import { AbstractMap_Collab } from "../data_types/abstract_maps";

/**
 * A collaborative "lazy" map with keys of type K and *mutable*
 * values of type C.
 *
 * "Lazy" means that every key-value pair implicitly exists,
 * but only nontrivial values are actually stored in memory.
 * [[get]](key) will construct its value if needed using
 * the `valueConstructor` passed to the constructor.
 * This is inspired by [Apache Commons
 * LazyMap](https://commons.apache.org/proper/commons-collections/apidocs/org/apache/commons/collections4/map/LazyMap.html).
 *
 * Due to laziness, there is no explicit operation to "set"
 * the value at a key. (The [[set]] method
 * is a no-op.) Instead, all replicas [[get]] the same value,
 * and any operations they perform on that value are "merged",
 * affecting everyone.
 * This contrasts with [[CMap]], in which each [[set]] operation
 * overwrites the previous value at its key, erasing any
 * changes (including concurrent ones).
 *
 * See also: [[CMap]], [[CValueMap]].
 *
 * ## Key Presence
 *
 * All values implicitly exist, and [[get]] always returns non-undefined.
 * However, [[has]], [[getIfPresent]], [[size]], and iterators
 * determine key presence by:
 * a key is present if its value is nontrivial, i.e., not in the
 * initial state returned by `valueConstructor`.
 *
 * For example, a [[CVar]] is nontrivial after [[CVar.value]] is first set.
 * It becomes trivial again if [[CVar.clear]] is called and there are no
 * concurrent operations. (Generally, a `clear` method makes its Collab
 * trivial, except for lists.)
 *
 * "Set" and "Delete" events respect these key presence
 * rules: "Set" is emitted for a key when its value
 * goes from trivial to nontrivial, and "Delete"
 * is emitted when its value goes from nontrivial to trivial.
 * Because a "Set" event is not emitted until after a value becomes
 * nontrivial, it is important to register values' event handlers in
 * `valueConstructor` instead of during the "Set" event.
 *
 * [[delete]] and [[clear]] throw errors (grow-only semantics).
 * [[set]] has no effect; it just returns the same value
 * as [[get]].
 *
 * ## Garbage Collection
 *
 * Internally, a value is considered trivial if its [[Collab.canGC]]
 * method returns true or if it has performed no operations.
 * Trivial values are only weakly referenced and so may be garbage
 * collected. After garbage collection, they are re-created using
 * valueConstructor if needed.
 *
 * @typeParam K The type of keys.
 * @typeParam C The type of mutable values, represented by a Collab.
 */
export class CLazyMap<K, C extends Collab>
  extends AbstractMap_Collab<K, C, []>
  implements IParent
{
  private readonly nontrivialMap: Map<string, C> = new Map();
  private readonly trivialMap: WeakValueMap<string, C> = new WeakValueMap();

  private readonly keySerializer: Serializer<K>;

  /**
   * Constructs a CLazyMap with the given `valueConstructor`.
   *
   * @param valueConstructor Callback used to construct a
   * value Collab with the given key. See [dynamically-created Collabs](../../../guide/initialization.html#dynamically-created-collabs)
   * for example usage.
   * This may be called multiple times for the same key due to garbage
   * collection (see class header).
   * @param options.keySerializer A serializer for keys.
   * Defaults to [[DefaultSerializer]].
   */
  constructor(
    init: InitToken,
    private readonly valueConstructor: (valueInitToken: InitToken, key: K) => C,
    options: { keySerializer?: Serializer<K> } = {}
  ) {
    super(init);

    this.keySerializer =
      options.keySerializer ?? DefaultSerializer.getInstance();
  }

  private keyAsString(key: K) {
    return Bytes.stringify(this.keySerializer.serialize(key));
  }
  private stringAsKey(str: string) {
    return this.keySerializer.deserialize(Bytes.parse(str));
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
        // Create it.
        value = this.valueConstructor(new InitToken(keyString, this), key);
        // The value starts trivial; if it becomes nontrivial
        // due to a message, receive/load will move
        // it to nontrivialMap.
        this.trivialMap.set(keyString, value);
      }
      return [value, false];
    } else return [value, true];
  }

  private inUpdateKeyString?: string = undefined;
  private inUpdateValue?: C = undefined;

  private applyUpdate(
    keyString: string,
    update: (value: C) => void,
    meta: UpdateMeta
  ): void {
    this.inUpdateKeyString = keyString;
    try {
      const key = this.stringAsKey(keyString);
      const [value, nontrivialStart] = this.getInternal(key, keyString);
      this.inUpdateValue = value;

      update(value);

      // If the value became GC-able, move it to the backup map.
      if (nontrivialStart && value.canGC()) {
        this.nontrivialMap.delete(keyString);
        this.trivialMap.set(keyString, value);
        this.emit("Delete", { key, value, meta });
      }
      // If the value became nontrivial, move it to the main map.
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
      this.inUpdateKeyString = undefined;
      this.inUpdateValue = undefined;
    }
  }

  childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    if (child.parent !== this) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    messageStack.push(child.name);
    this.send(messageStack, metaRequests);
  }

  receive(messageStack: (Uint8Array | string)[], meta: UpdateMeta): void {
    const keyString = <string>messageStack.pop();
    this.applyUpdate(
      keyString,
      // Message for a child
      (value) => value.receive(messageStack, meta),
      meta
    );
  }

  /**
   * No-op, just returns [[get]](key).
   */
  set(key: K): C {
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
   * Returns the value associated to key, constructing it with `valueConstructor`
   * if needed.
   *
   * This will never return undefined, even if [[has]](key) is false.
   * See [[getIfPresent]].
   */
  get(key: K): C {
    return this.getInternal(key, this.keyAsString(key))[0];
  }

  /**
   * Returns the value associated to key, or `undefined` if it is not present.
   *
   * Key presence is defined in the class header.
   */
  getIfPresent(key: K): C | undefined {
    const str = this.keyAsString(key);
    if (this.inUpdateKeyString === str) {
      // The state of nontrivialMap cannot be relied
      // upon, since it hasn't been recalculated yet.
      // Instead, use canGC directly.
      if (!this.inUpdateValue!.canGC()) {
        return this.inUpdateValue!;
      } else return undefined;
    }
    return this.nontrivialMap.get(this.keyAsString(key));
  }

  has(key: K): boolean {
    const str = this.keyAsString(key);
    if (this.inUpdateKeyString === str) {
      // The state of nontrivialMap cannot be relied
      // upon, since it hasn't been recalculated yet.
      // Instead, use canGC directly.
      return !this.inUpdateValue!.canGC();
    } else return this.nontrivialMap.has(str);
  }

  /**
   * The number of present (nontrivial) values in the map.
   */
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
   * Returns the unique key associated to a value
   * in this map, in O(1) time.
   *
   * If value is not a value in this map, returned undefined.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: C): K | undefined {
    if (searchElement.parent !== this) return undefined;
    return this.stringAsKey(searchElement.name);
  }

  save(): SavedStateTree {
    const childSaves = new Map<string, SavedStateTree>();
    // Only need to save nontrivial children, since trivial
    // children are in their initial states.
    for (const [name, child] of this.nontrivialMap) {
      childSaves.set(name, child.save());
    }
    return {
      children: childSaves,
    };
  }

  load(savedStateTree: SavedStateTree | null, meta: UpdateMeta): void {
    if (savedStateTree === null) {
      // Pass the null on to children that might override canGC().
      for (const child of this.nontrivialMap.values()) child.load(null, meta);
      return;
    }

    for (const [name, childSave] of savedStateTree.children!) {
      this.applyUpdate(name, (child) => child.load(childSave, meta), meta);
    }
    // Call null on other (nontrivial) children, in case they weren't saved
    // because they had canGC() = true in the saved state.
    for (const name of this.nontrivialMap.keys()) {
      if (!savedStateTree.children!.has(name)) {
        this.applyUpdate(name, (child) => child.load(null, meta), meta);
      }
    }
  }

  idOf<C extends Collab<CollabEventsRecord>>(descendant: C): CollabID<C> {
    return collabIDOf(descendant, this);
  }

  fromID<D extends Collab>(id: CollabID<D>, startIndex = 0): D | undefined {
    const name = id.namePath[startIndex];
    const child = this.getInternal(this.stringAsKey(name), name)[0] as Collab;
    // Terminal case.
    // Note that this cast is unsafe, but convenient.
    if (startIndex === id.namePath.length - 1) return child as D;
    // Recursive case.
    if ((child as Parent).fromID === undefined) {
      throw new Error("child is not a parent, but CollabID is its descendant");
    }
    return (child as Parent).fromID(id, startIndex + 1);
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
