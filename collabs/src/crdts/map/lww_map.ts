import {
  byteArrayEquals,
  DefaultSerializer,
  Optional,
  Serializer,
} from "../../util";
import { Resettable } from "../abilities";
import { CRegisterEntryMeta, OptionalLwwCRegister } from "../register";
import { InitToken, Pre } from "../../core";
import {
  AbstractCMapCObject,
  CMapEventsRecord,
  CRegister,
} from "../../data_types";
import { ImplicitMergingMutCMap } from "./implicit_merging_mut_map";

export class CMapFromRegister<
    K,
    V,
    SetArgs extends unknown[],
    RegT extends CRegister<Optional<V>, SetArgs> & Resettable
  >
  extends AbstractCMapCObject<K, V, SetArgs, CMapEventsRecord<K, V>>
  implements Resettable
{
  protected readonly internalMap: ImplicitMergingMutCMap<K, RegT>;

  /**
   * register is assumed to have value Optional.empty()
   * iff it is in the initial/reset state.  In particular,
   * value must be present right after a set() call.
   */
  constructor(
    initToken: InitToken,
    protected readonly registerConstructor: (
      registerInitToken: InitToken,
      key: K
    ) => RegT,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);

    this.internalMap = this.addChild(
      "",
      Pre(ImplicitMergingMutCMap)(
        this.internalRegisterConstructor.bind(this),
        keySerializer
      )
    );

    // Events emitters are added in internalRegisterConstructor.
  }

  private internalRegisterConstructor(
    registerInitToken: InitToken,
    key: K
  ): RegT {
    const register = this.registerConstructor(registerInitToken, key);
    register.on("Set", (event) => {
      if (register.value.isPresent) {
        // The value was set (possibly overwriting a
        // a previously set value), not deleted.
        this.emit("Set", {
          key,
          previousValue: event.previousValue,
          meta: event.meta,
        });
      } else if (event.previousValue.isPresent && !register.value.isPresent) {
        // The value was deleted, deleting a previously
        // set value.
        this.emit("Delete", {
          key,
          deletedValue: event.previousValue.get(),
          meta: event.meta,
        });
      }
    });
    return register;
  }

  set(key: K, ...args: SetArgs): V {
    const register = this.internalMap.get(key);
    // After setting, the register's value is present.
    return register.set(...args).get();
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
    for (const [key, valueRegister] of this.internalMap) {
      yield [key, valueRegister.value.get()];
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
    initToken: InitToken,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(
      initToken.runtime
    ),
    private readonly valueSerializer: Serializer<V> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      (registerInitToken) =>
        new OptionalLwwCRegister(registerInitToken, valueSerializer),
      keySerializer
    );
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
    const valueRegister = this.internalMap.getIfPresent(key);
    return valueRegister === undefined ? [] : valueRegister.conflicts();
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
    const valueRegister = this.internalMap.getIfPresent(key);
    return valueRegister === undefined ? [] : valueRegister.conflictsMeta();
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
