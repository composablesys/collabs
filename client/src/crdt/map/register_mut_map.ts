import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import {
  AggregateCRegisterMeta,
  DeletingMutCRegister,
  TombstoneMutCRegister,
} from "../register";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { RegisterCMap } from "./register_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.
export abstract class RegisterMutCMap<
  K,
  C extends Crdt,
  SetArgs extends any[]
> extends AbstractCMapCompositeCrdt<K, C, SetArgs> {
  protected internalMap: RegisterCMap<
    K,
    Optional<C>,
    SetArgs,
    | DeletingMutCRegister<C, SetArgs>
    | (TombstoneMutCRegister<C, SetArgs> & Resettable)
  >;

  constructor(
    regConstructor: (
      key: K
    ) => DeletingMutCRegister<C, SetArgs> | TombstoneMutCRegister<C, SetArgs>,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    // TODO: unsafe type case is okay because we never
    // call delete or clear, which would call reset.
    // Can we instead make RegisterCMap not assume resettable,
    // and have subclasses that need to reset on delete,
    // do so themselves?
    this.internalMap = this.addChild(
      "",
      new RegisterCMap(
        regConstructor as (
          key: K
        ) =>
          | DeletingMutCRegister<C, SetArgs>
          | (TombstoneMutCRegister<C, SetArgs> & Resettable),
        keySerializer
      )
    );

    // Events
    this.internalMap.internalMap.on("ValueInit", (event) => {
      // Register listeners on event.value, which is a new
      // MutCRegister.
      event.value.on("ValueInit", (event2) => {
        this.emit("ValueInit", { key: event.value, value: event2.value });
      });
    });
    this.internalMap.on("Set", (event) => this.emit("Set", event));
    this.internalMap.on("Delete", (event) => this.emit("Delete", event));
    // TODO: restore, if not covered by Set
  }

  set(key: K, ...args: SetArgs): C {
    return this.internalMap.set(key, ...args).get();
  }

  get(key: K): C | undefined {
    const optional = this.internalMap.get(key);
    if (optional === undefined || !optional.isPresent) return undefined;
    else return optional.get();
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
  getConflicts(key: K): C[] {
    const valueCrdt = this.internalMap.internalMap.getIfPresent(key);
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
  getConflictsMeta(key: K): AggregateCRegisterMeta<C>[] {
    const valueCrdt = this.internalMap.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? [] : valueCrdt.conflictsMeta();
  }

  owns(value: C): boolean {
    // TODO: this is abstraction-busting, brittle;
    // also needs testing.
    try {
      return value.parent.parent.parent.parent.parent === this;
    } catch (e) {
      // Assume this happened because we hit the root
      // while traversing parents
      return false;
    }
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  /**
   * Returns whether value is currently set as the value
   * of some key.
   * @param  value [description]
   * @return       [description]
   */
  hasValue(value: C): boolean {
    const key = this.keyOf(value);
    if (key === undefined) return false;
    return this.get(key) === value;
  }

  /**
   * Returns whether the given value is owned by
   * this map and still usable, i.e.,
   * it can still accept Crdt operations.
   */
  isUsable(value: C): boolean {
    const key = this.keyOf(value);
    if (key === undefined) return false;
    const register = this.internalMap.internalMap.getIfPresent(key);
    // If register is not present, then all of its values
    // are deleted, hence not usable
    if (register === undefined) return false;
    return register.isUsable(value);
  }

  getUsableValues(key: K): IterableIterator<C> {
    const register = this.internalMap.internalMap.getIfPresent(key);
    // If register is not present, then all of its values
    // are deleted, hence not usable
    if (register === undefined) return [].values();
    return register.usableValues();
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
   * @throws if value is not owned by this map, it was
   * not a previous value at key, or
   * it is unusable
   */
  restore(value: C) {
    const key = this.keyOf(value);
    if (key === undefined) {
      throw new Error("this.owns(value) is false");
    }
    const register = this.internalMap.internalMap.getIfPresent(key);
    // If register is not present, then all of its values
    // are deleted, hence not usable
    if (register === undefined) {
      throw new Error("value is not usable");
    }
    register.restore(value);
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (const [key, value] of this.internalMap) {
      if (value.isPresent) yield [key, value.get()];
    }
  }

  /**
   * TODO: note this returns the key even if the searchElement
   * is currently not set.  Make clear this is okay in
   * CMap.  It only returns undefined if
   * !this.owns(searchElement).
   */
  keyOf(searchElement: C): K | undefined {
    if (!this.owns(searchElement)) return undefined;
    // TODO: this is abstraction-busting, brittle;
    // also needs testing.
    return this.internalMap.internalMap.keyOf(
      searchElement.parent.parent as DeletingMutCRegister<C, SetArgs>
    );
  }
}
