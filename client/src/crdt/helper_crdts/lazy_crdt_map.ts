import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
  WeakValueMap,
} from "../../util";
import { Crdt, CrdtEvent, CrdtEventsRecord, CrdtParent } from "../core";

export interface LazyCrdtMapEvent<K, C extends Crdt> extends CrdtEvent {
  caller: LazyCrdtMap<K, C>;
  key: K;
  valueCrdt: C;
}

export interface LazyCrdtMapEventsRecord<K, C extends Crdt>
  extends CrdtEventsRecord {
  /**
   * Emitted when a value Crdt is explicitly created.
   * Listen to this event to register event handlers
   * on value Crdts.
   *
   * Note that this event may be
   * dispatched multiple times for a given key,
   * if the previous value Crdt was garbage collected.
   *
   * Do not depend on this event to update state
   * consistently across replicas.  Different replicas
   * may create, garbage collect, and recreate value
   * Crdts differently.  The only invariant is that
   * a Crdt such that canGc() is false, will not be
   * garbage collected.
   */
  NewValueCrdt: LazyCrdtMapEvent<K, C>;
  /**
   * Emitted when a value Crdt emits a Change event.
   *
   * Listening to this event is more memory efficient
   * than adding oneself as a Change listener to
   * every value Crdt.  TODO: remove?
   */
  ValueCrdtChange: LazyCrdtMapEvent<K, C>;
}

export class LazyCrdtMap<K, C extends Crdt>
  extends Crdt<LazyCrdtMapEventsRecord<K, C>>
  implements CrdtParent
{
  private readonly internalMap: Map<string, C> = new Map();
  private readonly backupMap: WeakValueMap<string, C> = new WeakValueMap();
  /**
   * Like a CrdtMap but with all keys present, with their values
   * initialized to default values (and possibly GC'd and
   * re-initialized as needed).  Like Apache Common's
   * LazyMap.
   *
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
  ): [value: C, nontrivial: boolean, isNew: boolean] {
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
        return [value, false, true];
      }
      return [value, false, false];
    } else return [value, true, false];
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
    let [value, nontrivialStart, isNew] = this.getInternal(key, keyString);
    targetPath.length--;
    value.receive(targetPath, timestamp, message);

    // If the value became GC-able, move it to the
    // backup map
    if (nontrivialStart && value.canGc()) {
      this.internalMap.delete(keyString);
      this.backupMap.set(keyString, value);
    }
    // If the value became nontrivial, move it to the
    // main map
    else if (!nontrivialStart && !value.canGc()) {
      this.backupMap.delete(keyString);
      this.internalMap.set(keyString, value);
    }

    // Dispatch events
    if (isNew) {
      this.emit("NewValueCrdt", {
        caller: this,
        timestamp,
        key,
        valueCrdt: value,
      });
    }
    this.emit("ValueCrdtChange", {
      caller: this,
      timestamp,
      key,
      valueCrdt: value,
    });
  }

  get(key: K): C {
    return this.getInternal(key, this.keyAsString(key))[0];
  }

  /**
   * Returns true if valueCrdt is owned by this
   * LazyCrdtMap, i.e., it is an output of this.get.
   */
  owns(valueCrdt: C): boolean {
    return valueCrdt.parent === this;
  }

  private checkOwns(valueCrdt: C) {
    if (!this.owns(valueCrdt)) {
      throw new Error("valueCrdt is not owned by this LazyCrdtMap");
    }
  }

  /**
   * Returns valueCrdt's key.
   */
  keyOf(valueCrdt: C): K {
    this.checkOwns(valueCrdt);
    return this.stringAsKey(valueCrdt.name);
  }

  nontrivialHas(key: K): boolean {
    return this.internalMap.has(this.keyAsString(key));
  }

  nontrivialHasValue(valueCrdt: C): boolean {
    this.checkOwns(valueCrdt);
    return !valueCrdt.canGc();
  }

  nontrivialGet(key: K): C | undefined {
    return this.internalMap.get(this.keyAsString(key));
  }

  *nontrivialKeys(): IterableIterator<K> {
    for (let str of this.internalMap.keys()) {
      yield this.stringAsKey(str);
    }
  }

  nontrivialValues(): IterableIterator<C> {
    return this.internalMap.values();
  }

  *nontrivialEntries(): IterableIterator<[K, C]> {
    for (let entry of this.internalMap) {
      yield [this.stringAsKey(entry[0]), entry[1]];
    }
  }

  get nontrivialSize(): number {
    return this.internalMap.size;
  }

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let keyString = targetPath[targetPath.length - 1];
    let value = this.getInternal(this.stringAsKey(keyString), keyString)[0];
    targetPath.length--;
    return value.getDescendant(targetPath);
  }

  canGc() {
    /*
     * We don't need to check here that the backup
     * map is nonempty (which would be expensive):
     * each value Crdt points to us (due to Crdt.parent),
     * so we will only be forgotten by a containing
     * LazyCrdtMap if all of our children have no
     * references to them, which is equivalent to the
     * backup map being empty(able).
     */
    return this.internalMap.size === 0;
  }
}
