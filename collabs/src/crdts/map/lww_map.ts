import {
  byteArrayEquals,
  DefaultSerializer,
  Optional,
  Serializer,
} from "../../util";
import { CRegisterEntryMeta, OptionalLWWCRegister } from "../register";
import { InitToken, Pre } from "../../core";
import {
  AbstractCMapCObject,
  CMapEventsRecord,
  CRegister,
} from "../../data_types";
import { LazyMutCMap } from "./lazy_mut_map";

export interface ClearableCRegister<T, SetArgs extends unknown[]>
  extends CRegister<T, SetArgs> {
  /**
   * Sets the state to its initial value.
   *
   * This method is called by [[CMapFromRegister.delete]]
   * when this value's key is deleted.
   *
   * This may have different semantics than literally
   * setting the register to its initial value
   * (using [[CRegister.set]]).
   * In particular:
   * - To allow garbage-collecting deleted values when
   * this is used in a [[CMapFromRegister]],
   * this should restore the register to a state where
   * [[Collab.canGC]] is true.
   * - As a consequence, in the face of
   * concurrent calls to [[clear]] and [[CRegister.set]],
   * the `set` should win.
   */
  clear(): void;
}

export class CMapFromRegister<
  K,
  V,
  SetArgs extends unknown[],
  RegT extends ClearableCRegister<Optional<V>, SetArgs>
> extends AbstractCMapCObject<K, V, SetArgs, CMapEventsRecord<K, V>> {
  protected readonly internalMap: LazyMutCMap<K, RegT>;

  /**
   * Register requirements:
   * - `set` must return a value (not undefined).
   * THe value must
   * be a present `Optional`. Otherwise, [[set]] will
   * throw an error.
   * - Immediately after calling `clear()`, it
   * should have value [[Optional.empty]]`()`.
   * Otherwise, [[delete]] will not actually delete.
   * - It should have value [[Optional.empty]]`()`
   * in its initial state. Otherwise, not-yet-used keys
   * will be considered not present, contrary
   * to the register's state.
   * - Calling `clear` in its initial state should
   * do nothing. Otherwise, when you call [[delete]] on
   * a key whose value is in its initial state, you will
   * expect us to do something by calling `clear`, but
   * actually we will skip calling it.
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
      Pre(LazyMutCMap)(
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
    return register.set(...args)!.get();
  }

  delete(key: K): void {
    const register = this.internalMap.getIfPresent(key);
    if (register !== undefined) register.clear();
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
}

export class LWWCMap<K, V> extends CMapFromRegister<
  K,
  V,
  [V],
  OptionalLWWCRegister<V>
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
        new OptionalLWWCRegister(registerInitToken, valueSerializer),
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
