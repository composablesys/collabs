import {
  byteArrayEquals,
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import { Resettable } from "../../abilities";
import {
  CRegister,
  CRegisterEntryMeta,
  OptionalLwwCRegister,
} from "../register";
import { AbstractCMapCObject } from "./abstract_map";
import { ImplicitMergingMutCMap } from "./implicit_merging_mut_map";
import { CMapEventsRecord } from "./interfaces";
import { CrdtInitToken } from "../../core";

export class CMapFromRegister<
    K,
    V,
    SetArgs extends any[],
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
    initToken: CrdtInitToken,
    protected readonly registerConstructor: (
      registerInitToken: CrdtInitToken,
      key: K
    ) => RegT,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken);
    // TODO: with the usual class-based addChild, TypeScript's
    // generic type inference appeared to get overwhelmed
    // and not infer the inner types correctly, leading to
    // an error.  We work around it by writing an explicit
    // Pre callback instead.
    this.internalMap = this.addChild(
      "",
      (childInitToken) =>
        new ImplicitMergingMutCMap(
          childInitToken,
          this.internalRegisterConstructor.bind(this),
          keySerializer
        )
    );

    // Events emitters are added in internalRegisterConstructor.
  }

  private internalRegisterConstructor(
    registerInitToken: CrdtInitToken,
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
          timestamp: event.timestamp,
        });
      } else if (event.previousValue.isPresent && !register.value.isPresent) {
        // The value was deleted, deleting a previously
        // set value.
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
    initToken: CrdtInitToken,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    private readonly valueSerializer: ElementSerializer<V> = DefaultElementSerializer.getInstance()
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
