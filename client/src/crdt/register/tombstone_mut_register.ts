import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { DeletingMutCSet } from "../set";
import { AggregateCRegisterMeta } from "./aggregate_register";
import { CRegister } from "./interfaces";
import { FwwCRegister, LwwCRegister } from "./wins_registers";

// TODO: events: default change events will be odd because
// you'll see intermediate states if you listen to all that.
// Perhaps this is an argument for a Set: CrdtEvent in general?

/**
 * TODO: warning: tombstones.
 */
export class TombstoneMutCRegister<C extends Crdt, SetArgs extends any[]>
  extends CompositeCrdt
  implements CRegister<Optional<C>, SetArgs>
{
  protected readonly crdtFactory: DeletingMutCSet<C, SetArgs>;
  protected readonly register: FwwCRegister<C> | LwwCRegister<C>;

  /**
   * TODO: concurrentOpsRestore warning: thrashing (even
   * before it's deleted).
   * (Is there a better way to do this?  E.g. make it
   * appear in conflicts() only.  It should at least
   * be okay if you don't have conflicts - then in maps,
   * it serves to revive map keys that were deleted but
   * get edited concurrently.)
   */
  constructor(
    valueConstructor: (...args: SetArgs) => C,
    writerWinsRule: "first" | "last" = "last",
    concurrentOpRestores = false,
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

    if (concurrentOpRestores) {
      // Every operation on a value makes it the set
      // value.  Specifically, we make it as if there
      // is a this.restore(value) operation accompanying
      // every operation on value.
      this.crdtFactory.on("ValueInit", (event) => {
        const value = event.value;
        value.on("Change", (event2) => {
          this.runtime.runLocally(event2.timestamp, () => {
            (this.register.value as C) = value;
          });
        });
      });
    }

    // TODO: events.  Including ValueInit, restore?
  }

  set(...args: SetArgs): void {
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
   * For TombstoneMutCRegister, this is equivalent to
   * this.owns(value), since all owned values are always
   * usable (because they are kept as tombstones).
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
    // Don't reset the set, to keep tombstones
    this.register.reset();
  }
}
