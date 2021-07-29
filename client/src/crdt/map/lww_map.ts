import {
  byteArrayEquals,
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import { Resettable } from "../helper_crdts";
import {
  CRegister,
  CRegisterEntryMeta,
  OptionalLwwCRegister,
} from "../register";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { ImplicitMergingMutCMap } from "./implicit_merging_mut_map";
import { CMapEventsRecord } from "./interfaces";

export class CMapFromRegister<
    K,
    V,
    SetArgs extends any[],
    R extends CRegister<Optional<V>, SetArgs> & Resettable
  >
  extends AbstractCMapCompositeCrdt<K, V, SetArgs, CMapEventsRecord<K, V>>
  implements Resettable
{
  protected readonly internalMap: ImplicitMergingMutCMap<K, R>;

  /**
   * register is assumed to have value Optional.empty()
   * iff it is in the initial/reset state.  In particular,
   * value must be present right after a set() call.
   */
  constructor(
    private readonly registerConstructor: (key: K) => R,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.internalMap = this.addChild(
      "",
      new ImplicitMergingMutCMap(
        this.internalRegisterConstructor.bind(this),
        keySerializer
      )
    );

    // Events emitters are added in internalRegisterConstructor.
  }

  private internalRegisterConstructor(key: K): R {
    const register = this.registerConstructor(key);
    register.on("Set", (event) => {
      if (register.value.isPresent) {
        // The value was set, not deleted.
        this.emit("Set", {
          key,
          previousValue: event.previousValue,
          timestamp: event.timestamp,
        });
      } else {
        // The value was deleted.
        this.emit("Delete", {
          key,
          deletedValue: event.previousValue.get(),
          timestamp: event.timestamp,
        });
      }
    });
    return register;
  }

  set(key: K, ...args: SetArgs): V {
    const register = this.internalMap.get(key);
    register.set(...args);
    // The register has just been set, so its value is present.
    return register.value.get();
  }

  delete(key: K): void {
    this.internalMap.delete(key);
  }

  get(key: K): V | undefined {
    const register = this.internalMap.getIfPresent(key);
    return register === undefined ? undefined : register.value.get();
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (let [key, valueCrdt] of this.internalMap) {
      yield [key, valueCrdt.value.get()];
    }
  }

  // Use inherited keyOf with === comparisons.
  // In case SetArgs = [V], you should override keyOf
  // to use serialization equality.

  clear(): void {
    this.internalMap.clear();
  }

  reset(): void {
    // This should be equivalent to clear.
    this.internalMap.reset();
  }
}

export class LwwCMap<K, V> extends CMapFromRegister<
  K,
  V,
  [V],
  OptionalLwwCRegister<V>
> {
  constructor(
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    private readonly valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
  ) {
    super(() => new OptionalLwwCRegister(valueSerializer), keySerializer);
  }

  /**
   * Return the current conflicting values at key, i.e., the
   * non-overwritten values.  This may have
   * more than one element due to concurrent writes.
   * If key is not present, returns [].
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflicts(key: K): V[] {
    const valueCrdt = this.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? [] : valueCrdt.conflicts();
  }

  /**
   * Return the current conflicting values with metadata.
   * If key is not present, returns [].
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflictsMeta(key: K): CRegisterEntryMeta<V>[] {
    const valueCrdt = this.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? [] : valueCrdt.conflictsMeta();
  }

  /**
   * O(n), but uses serialization equality
   * instead of ===.
   */
  keyOf(searchElement: V): K | undefined {
    const searchSerialized = this.valueSerializer.serialize(searchElement);
    for (const [key, value] of this) {
      const valueSerialized = this.valueSerializer.serialize(value);
      if (byteArrayEquals(searchSerialized, valueSerialized)) return key;
    }
    return undefined;
  }
}
