import {
  byteArrayEquals,
  DefaultSerializer,
  Optional,
  Serializer,
  InitToken,
  Pre,
  AbstractCMapCObject,
  CMapEventsRecord,
  CVariable,
  LazyMutCMap,
} from "@collabs/core";
import { CVariableEntryMeta, OptionalLWWCVariable } from "../variable";

export interface ClearableCVariable<T, SetArgs extends unknown[]>
  extends CVariable<T, SetArgs> {
  /**
   * Sets the state to its initial value.
   *
   * This method is called by [[CMapFromVariable.delete]]
   * when this value's key is deleted.
   *
   * This may have different semantics than literally
   * setting the variable to its initial value
   * (using [[CVariable.set]]).
   * In particular:
   * - To allow garbage-collecting deleted values when
   * this is used in a [[CMapFromVariable]],
   * this should restore the variable to a state where
   * [[Collab.canGC]] is true.
   * - As a consequence, in the face of
   * concurrent calls to [[clear]] and [[CVariable.set]],
   * the `set` should win.
   */
  clear(): void;
}

export class CMapFromVariable<
  K,
  V,
  SetArgs extends unknown[],
  VarT extends ClearableCVariable<Optional<V>, SetArgs>
> extends AbstractCMapCObject<K, V, SetArgs, CMapEventsRecord<K, V>> {
  protected readonly internalMap: LazyMutCMap<K, VarT>;

  /**
   * Variable requirements:
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
   * to the variable's state.
   * - Calling `clear` in its initial state should
   * do nothing. Otherwise, when you call [[delete]] on
   * a key whose value is in its initial state, you will
   * expect us to do something by calling `clear`, but
   * actually we will skip calling it.
   */
  constructor(
    initToken: InitToken,
    protected readonly variableConstructor: (
      variableInitToken: InitToken,
      key: K
    ) => VarT,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance()
  ) {
    super(initToken);

    this.internalMap = this.addChild(
      "",
      Pre(LazyMutCMap)(
        this.internalVariableConstructor.bind(this),
        keySerializer
      )
    );

    // Events emitters are added in internalVariableConstructor.
  }

  private internalVariableConstructor(
    variableInitToken: InitToken,
    key: K
  ): VarT {
    const variable = this.variableConstructor(variableInitToken, key);
    variable.on("Set", (event) => {
      if (variable.value.isPresent) {
        // The value was set (possibly overwriting a
        // a previously set value), not deleted.
        this.emit("Set", {
          key,
          previousValue: event.previousValue,
          meta: event.meta,
        });
      } else if (event.previousValue.isPresent && !variable.value.isPresent) {
        // The value was deleted, deleting a previously
        // set value.
        this.emit("Delete", {
          key,
          deletedValue: event.previousValue.get(),
          meta: event.meta,
        });
      }
    });
    return variable;
  }

  set(key: K, ...args: SetArgs): V {
    const variable = this.internalMap.get(key);
    // After setting, the variable's value is present.
    return variable.set(...args)!.get();
  }

  delete(key: K): void {
    const variable = this.internalMap.getIfPresent(key);
    if (variable !== undefined) variable.clear();
  }

  get(key: K): V | undefined {
    const variable = this.internalMap.getIfPresent(key);
    return variable === undefined ? undefined : variable.value.get();
  }

  // TODO: not sure about this.
  getVariable(key: K): VarT {
    return this.internalMap.get(key);
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const [key, valueVariable] of this.internalMap) {
      yield [key, valueVariable.value.get()];
    }
  }

  // Use inherited keyOf with === comparisons.
  // In case SetArgs = [V], you should override keyOf
  // to use serialization equality.
}

export class LWWCMap<K, V> extends CMapFromVariable<
  K,
  V,
  [V],
  OptionalLWWCVariable<V>
> {
  constructor(
    initToken: InitToken,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    private readonly valueSerializer: Serializer<V> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      (variableInitToken) =>
        new OptionalLWWCVariable(variableInitToken, valueSerializer),
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
    const valueVariable = this.internalMap.getIfPresent(key);
    return valueVariable === undefined ? [] : valueVariable.conflicts();
  }

  /**
   * Return the current conflicting values with metadata.
   * If key is not present, returns [].
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflictsMeta(key: K): CVariableEntryMeta<V>[] {
    const valueVariable = this.internalMap.getIfPresent(key);
    return valueVariable === undefined ? [] : valueVariable.conflictsMeta();
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
