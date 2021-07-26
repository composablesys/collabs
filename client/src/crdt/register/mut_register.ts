import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet, DeletingMutCSetValueSerializer } from "../set";
import { AggregateCRegisterMeta } from "./aggregate_register";
import { CRegister } from "./interfaces";
import { FwwCRegister, LwwCRegister } from "./wins_registers";

// TODO: events: default change events will be odd because
// you'll see intermediate states if you listen to all that.
// Perhaps this is an argument for a Set: CrdtEvent in general?

export class MutCRegister<C extends Crdt, SetArgs extends any[]>
  extends CompositeCrdt
  implements CRegister<Optional<C>, SetArgs>, Resettable
{
  protected readonly crdtFactory: DeletingMutCSet<C, SetArgs>;
  // TODO: use custom interface description CRegister +
  // conflicts etc. methods, instead of this union type?
  protected readonly register: FwwCRegister<C> | LwwCRegister<C>;

  constructor(
    valueConstructor: (...args: SetArgs) => C,
    writerWinsRule: "first" | "last" = "last",
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.crdtFactory = this.addChild(
      "",
      new DeletingMutCSet(valueConstructor, [], argsSerializer)
    );
    // Initial value hacking is okay since we only ever
    // consult optionalValue.
    const serializer = new DeletingMutCSetValueSerializer(this.crdtFactory);
    switch (writerWinsRule) {
      case "first":
        this.register = this.addChild(
          "0",
          new FwwCRegister<C>(undefined as unknown as C, serializer)
        );
        break;
      case "last":
        this.register = this.addChild(
          "0",
          new LwwCRegister<C>(undefined as unknown as C, serializer)
        );
        break;
    }

    // TODO: events.  Including ValueInit, restore?
  }

  set(...args: SetArgs): void {
    this.crdtFactory.clear();
    // TypeScript doesn't understand that value is of type
    // C, not an arbitrary T, due to the union type
    (this.register.value as C) = this.crdtFactory.add(...args);
  }

  get value(): Optional<C> {
    return this.register.optionalValue;
  }

  conflicts(): C[] {
    return this.register.conflicts();
  }

  conflictsMeta(): AggregateCRegisterMeta<C>[] {
    return this.register.conflictsMeta();
  }

  owns(value: C): boolean {
    return this.crdtFactory.owns(value);
  }

  /**
   * Returns whether the given value is owned by
   * this register and still usable, i.e.,
   * it can still accept Crdt operations.
   *
   * Values are made unusable once they are overwritten
   * by a causally later call to set or reset (but not
   * restore).
   *
   * isUsable is always true for the set value and
   * elements of conflicts().  It is true for value
   * not in conflicts() only if value has been
   * overwritten by restore but not by set or reset.
   */
  isUsable(value: C): boolean {
    return this.crdtFactory.has(value);
  }

  usableValues(): IterableIterator<C> {
    return this.crdtFactory.values();
  }

  /**
   * Restores this.value to a previous value.  The value
   * must be usable, i.e., this.isUsable(value).
   *
   * A typical use case is if multiple users set the
   * value concurrently and each do some work on their
   * value, causing a conflict, they can manually resolve
   * the conflict by inspecting conflicts(), choosing
   * one, and calling restore() on it.  In case multiple users do so
   * concurrently, one of their choices will be chosen
   * using the usual conflict resolution rule (LWW or FWW)
   * for this register.
   *
   * Unlike set, this method does not delete (make unusable)
   * other existing elements; instead, they will be still
   * be usable as standalone CRDTs, and they can be
   * passed to a future or concurrent call to restore.
   * That is so that if two users concurrently call
   * restore on different conflicting values, the
   * winning value will still be usable as a Crdt.
   * Existing values will instead be deleted on the next
   * call to set or reset.
   *
   * @param  value [description]
   * @return       [description]
   * @throws if !this.isUsable(value)
   */
  restore(value: C) {
    if (!this.isUsable(value)) {
      throw new Error("value is not usable");
    }
    // TypeScript doesn't understand that value is of type
    // C, not an arbitrary T, due to the union type
    (this.register.value as C) = value;
  }

  clear() {
    this.crdtFactory.clear();
    this.register.reset();
  }

  reset() {
    this.crdtFactory.reset();
    this.register.reset();
  }
}
