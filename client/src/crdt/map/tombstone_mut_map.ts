import { DeletingMutCMapSave } from "../../../generated/proto_compiled";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
  stringAsArray,
} from "../../util";
import { Crdt } from "../core";
import {
  AddWinsCSet,
  DeletingMutCSet,
  DeletingMutCSetValueSerializer,
} from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.

// TODO: concurrentOpRestores?  (key or value?)

/**
 * TODO: warning: tombstones.  Benefit is that you can
 * restoreKey, and you can always restoreValue (always
 * usable).
 */
export class TombstoneMutCMap<
  K,
  C extends Crdt,
  SetArgs extends any[]
> extends AbstractCMapCompositeCrdt<K, C, SetArgs> {
  private readonly crdtFactory: DeletingMutCSet<C, [K, SetArgs]>;
  private readonly map: LwwCMap<K, C>;
  private readonly keySet: AddWinsCSet<K>;
  // Used to perform keyOf lookups in O(1) time, which are
  // necessary for restore calls.
  // TODO: when is this needed?  Can we choose not to pay
  // for this if we don't need it?
  private readonly keyByValue: WeakMap<C, K> = new WeakMap();

  // TODO: FWW option?  (Like in MutCRegister.)
  // Perhaps have LwwMap be a generic "WW" map with a
  // first/last option, to make this easy.
  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    concurrentOpRestores = false,
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();

    this.crdtFactory = this.addChild(
      "",
      new DeletingMutCSet(
        (key, args) => {
          const value = valueConstructor(key, ...args);
          if (concurrentOpRestores) {
            // Any operation on value does a restoreKey
            value.on("Change", (event) => {
              this.runtime.runLocally(event.timestamp, () => {
                this.keySet.add(key);
              });
            });
          }
          return value;
        },
        undefined,
        new PairSerializer(keySerializer, argsSerializer)
      )
    );
    this.map = this.addChild(
      "0",
      new LwwCMap(
        keySerializer,
        new DeletingMutCSetValueSerializer(this.crdtFactory)
      )
    );
    this.keySet = this.addChild("1", new AddWinsCSet(keySerializer));

    // TODO: dispatch events
  }

  set(key: K, ...args: SetArgs): C {
    const value = this.crdtFactory.add(key, args);
    this.keySet.add(key);
    this.map.set(key, value);
    return value;
  }

  delete(key: K): void {
    this.keySet.delete(key);
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.map.get(key);
    else return undefined;
  }

  has(key: K): boolean {
    return this.keySet.has(key);
  }

  get size(): number {
    return this.keySet.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (const key of this.keySet) {
      // Since we never delete from this.map, and
      // this.keySet only adds if there is a value
      // already/nearly present, we can be sure that if
      // key is present, this.map.get(key) exists.
      yield [key, this.map.get(key)!];
    }
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.keySet.clear();
  }

  keyOf(searchElement: C): K | undefined {
    return this.keyByValue.get(searchElement);
  }

  /**
   * Returns whether the given value is owned by
   * this map and still usable, i.e.,
   * it can still accept Crdt operations.  Since this
   * map stores tombstones, this just checks that value
   * is owned by this map.
   */
  isUsable(value: C): boolean {
    return this.crdtFactory.has(value);
  }

  /**
   * Set the value at key to a previous value for key that isUsable
   * (e.g., an element of getConflicts(key)).
   *
   * A typical use case is if multiple users set the
   * value concurrently and each do some work on their
   * value, causing a conflict, they can inspect the conflicts
   * (using getConflicts(key)) and choose one to appear as
   * the main value.  In case multiple users do so
   * concurrently, one of their choices will be chosen
   * using the usual conflict resolution rule (LWW or FWW)
   * for this map.
   *
   * @param key    [description]
   * @param  value [description]
   * @return       [description]
   * @throws if value is not owned by this map, or it was
   * not a previous value at key
   */
  restoreValue(value: C) {
    if (!this.isUsable(value)) {
      throw new Error("value is not usable");
    }
    const key = this.keyOf(value)!;
    this.keySet.add(key);
    this.map.set(key, value);
  }

  /**
   * TODO: key must have previously had a value
   * @param  key [description]
   * @return     [description]
   */
  restoreKey(key: K) {
    if (!this.map.has(key)) {
      throw new Error(
        "key did not previously have a value, nothing to restore"
      );
    }
    this.keySet.add(key);
  }

  saveComposite(): Uint8Array {
    // Need to save keysByValue, which we can use to
    // load itself and usableValues.

    // TODO: optimize to avoid repeating keys?
    // Shouldn't really be a problem because most keys
    // won't be repeated, at least when there are no
    // tombstones.
    const keys = new Array<Uint8Array>(this.crdtFactory.size);
    const ids = new Array<Uint8Array>(this.crdtFactory.size);
    let i = 0;
    for (const value of this.crdtFactory) {
      keys[i] = this.keySerializer.serialize(this.keyOf(value)!);
      ids[i] = stringAsArray(this.crdtFactory.idOf(value));
      i++;
    }
    const message = DeletingMutCMapSave.create({ keys, ids });
    return DeletingMutCMapSave.encode(message).finish();
  }

  saveData?: Uint8Array;
  loadComposite(saveData: Uint8Array): void {
    // Need to wait until postLoad so we can call
    // this.crdtFactory.getById
    this.saveData = saveData;
  }

  postLoad() {
    const decoded = DeletingMutCMapSave.decode(this.saveData!);
    delete this.saveData;
    for (let i = 0; i < decoded.ids.length; i++) {
      const key = this.keySerializer.deserialize(decoded.keys[i], this.runtime);
      const value = this.crdtFactory.getById(arrayAsString(decoded.ids[i]))!;
      this.keyByValue.set(value, key);
    }
  }
}
