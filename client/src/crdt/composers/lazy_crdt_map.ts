import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util/serialization";
import {
  SerializingMap,
  SerializingWeakValueMap,
} from "../../util/serializing_collections";
import { WeakValueMap } from "../../util/weak_value_map";
import { Crdt } from "../core/crdt";
import { CrdtParent } from "../core/interfaces";

// TODO: events

export class LazyCrdtMap<K, C extends Crdt> extends Crdt implements CrdtParent {
  private internalMap!: SerializingMap<K, C>;
  private backupMap!: SerializingWeakValueMap<K, C>;

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

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    // TODO: move to constructor; make props readonly,
    // remove !; don't store keySerializer
    this.internalMap = new SerializingMap(this.runtime, this.keySerializer);
    this.backupMap = new SerializingWeakValueMap(
      this.runtime,
      this.keySerializer
    );
  }

  get(key: K): C {
    return this.getInternal(key)[0];
  }

  private getInternal(key: K): [value: C, nontrivial: boolean] {
    let value = this.internalMap.get(key);
    if (value === undefined) {
      // Check the backup map
      value = this.backupMap.get(key);
      if (value === undefined) {
        // Create it, but only in the backup map,
        // since it is currently GC-able
        value = this.valueConstructor(key);

        this.childBeingAdded = value;
        value.init(this.internalMap.keyAsString(key), this);
        this.childBeingAdded = undefined;

        this.backupMap.set(key, value);
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
    let key = this.internalMap.stringAsKey(keyString);
    // TODO: here we can optimize the subsequent map calls
    // by keeping around keyString, like in the pre-cleanup
    // implementation.  However it makes us deal with
    // strings more.
    let [value, nontrivialStart] = this.getInternal(key);
    targetPath.length--;
    value.receive(targetPath, timestamp, message);

    // If the value became GC-able, move it to the
    // backup map
    if (nontrivialStart && value.canGc()) {
      this.internalMap.delete(key);
      this.backupMap.set(key, value);
    }
    // If the value became nontrivial, move it to the
    // main map
    else if (!nontrivialStart && !value.canGc()) {
      this.backupMap.delete(key);
      this.internalMap.set(key, value);
    }
  }

  /**
   * TODO: don't mutate directly.
   *
   * The nontrivial map entries.
   */
  nontrivialMap(): SerializingMap<K, C> {
    return this.internalMap;
  }

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let keyString = targetPath[targetPath.length - 1];
    let value = this.getInternal(this.internalMap.stringAsKey(keyString))[0];
    targetPath.length--;
    return value.getDescendant(targetPath);
  }

  canGc() {
    /**
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
