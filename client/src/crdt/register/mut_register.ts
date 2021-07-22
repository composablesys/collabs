import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { DeletingMutCSet } from "../set";
import { AggregateCRegisterMeta } from "./aggregate_register";
import { CRegister } from "./interfaces";
import { FwwCRegister, LwwCRegister } from "./wins_registers";

// TODO: events: default change events will be odd because
// you'll see intermediate states if you listen to all that.
// Perhaps this is an argument for a Set: CrdtEvent in general?

export class MutCRegister<C extends Crdt, SetArgs extends any[]>
  extends CompositeCrdt<ResettableEventsRecord>
  implements CRegister<Optional<C>, SetArgs>, Resettable 
{
  private readonly crdtFactory: DeletingMutCSet<C, SetArgs>;
  private readonly register: FwwCRegister<C> | LwwCRegister<C>;

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
    // TODO: use optimized serializer (just Set id, not full
    // pathToRoot).
    // Initial value hacking is okay since we only ever
    // consult optionalValue.
    switch (writerWinsRule) {
      case "first":
        this.register = this.addChild(
          "0",
          new FwwCRegister<C>(undefined as unknown as C)
        );
        break;
      case "last":
        this.register = this.addChild(
          "0",
          new LwwCRegister<C>(undefined as unknown as C)
        );
        break;
    }

    // TODO: events.  Including ValueInit?
    this.register.on("Reset", (event) => {
      this.emit("Reset", event);
    });
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
   * Values are made unusable once they are overwritten
   * by a causally later call to set or reset (but not
   * setExisting).
   *
   * isUsable is always true for the set value and
   * elements of conflicts().  It is true for value
   * not in conflicts() only if value has been
   * overwritten by setExisting but not by set or reset.
   */
  isUsable(value: C): boolean {
    return this.crdtFactory.has(value);
  }

  /**
   * Set the value to a previous value that isUsable
   * (e.g., an element of conflicts()).
   *
   * A typical use case is if multiple users set the
   * value concurrently and each do some work on their
   * value, causing a conflict, they can inspect the conflicts
   * (using conflicts()) and choose one to appear as
   * the main value.  In case multiple users do so
   * concurrently, one of their choices will be chosen
   * using the usual conflict resolution rule (LWW or FWW)
   * for this register.
   *
   * Unlike set, this method does not delete (make unusable)
   * other existing elements; instead, they will be still
   * be usable as standalone CRDTs, and they can be
   * passed to a future or concurrent call to setExisting.
   * That is so that if two users concurrently call
   * setExisting on different conflicting values, the
   * winning value will still be usable as a Crdt.
   * Existing values will instead be deleted on the next
   * call to set or reset, in which case they will
   * be deleted and made unusable even if they no
   * longer appear in conflicts().
   *
   * @param  value [description]
   * @return       [description]
   * @throws if value is not owned by this register or
   * it has been deleted (made unusable), due to a causally
   * greater call to delete or set (but not setExisting).
   */
  setExisting(value: C) {
    if (!this.isUsable(value)) {
      throw new Error("value has already been deleted or is not owned by us");
    }
    // TypeScript doesn't understand that value is of type
    // C, not an arbitrary T, due to the union type
    (this.register.value as C) = value;
  }

  reset() {
    this.crdtFactory.reset();
    this.register.reset();
  }
}
