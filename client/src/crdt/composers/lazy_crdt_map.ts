import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util/serialization";
import { WeakValueMap } from "../../util/weak_value_map";
import { Crdt, CrdtEvent, CrdtEventsRecord } from "./crdt";
import { CrdtParent } from "./interfaces";

// TODO: import from map interfaces
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
