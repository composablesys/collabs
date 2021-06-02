import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util/serialization";
import { WeakValueMap } from "../../util/weak_value_map";
import { Crdt } from "../core/crdt";
import { CrdtParent } from "../core/interfaces";

// TODO: events

export class LazyCrdtMap<K, C extends Crdt> extends Crdt implements CrdtParent {
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
  }

  /**
   * TODO: don't mutate directly.
   *
   * The nontrivial map entries.  TODO: by key instead
   * of string.
   */
  nontrivialMap(): Map<string, C> {
    return this.internalMap;
  }

  getDescendant(targetPath: string[]): Crdt {
    if (targetPath.length === 0) return this;

    let keyString = targetPath[targetPath.length - 1];
    let value = this.getInternal(this.stringAsKey(keyString), keyString)[0];
    targetPath.length--;
    return value.getDescendant(targetPath);
  }

  canGc() {
    return this.internalMap.size === 0;
  }
}
