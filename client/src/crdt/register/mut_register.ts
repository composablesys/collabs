import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet, DeletingMutCSetValueSerializer } from "../set";
import { CRegisterEntryMeta } from "./aggregate_register";
import { CRegister, CRegisterEventsRecord } from "./interfaces";
import { LwwCRegister } from "./wins_registers";

export class MutCRegisterFromRegister<
    C extends Crdt,
    SetArgs extends any[],
    R extends CRegister<C>
  >
  extends CompositeCrdt<CRegisterEventsRecord>
  implements CRegister<C, SetArgs>
{
  protected readonly crdtFactory: DeletingMutCSet<C, SetArgs>;
  protected readonly register: R;

  /**
   * Note initial value behavior (including possibly
   * throwing errors on get value() in the initial state)
   * depends on that of the register returned by
   * registerCallback.
   *
   * @param registerCallback [description]
   */
  constructor(
    registerCallback: (valueSerializer: ElementSerializer<C>) => R,
    valueConstructor: (...args: SetArgs) => C,
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.crdtFactory = this.addChild(
      "",
      new DeletingMutCSet(valueConstructor, [], argsSerializer)
    );
    this.register = this.addChild(
      "0",
      registerCallback(new DeletingMutCSetValueSerializer(this.crdtFactory))
    );

    // Events
    this.register.on("Set", (event) => this.emit("Set", event));
  }

  set(...args: SetArgs): void {
    this.crdtFactory.clear();
    this.register.set(this.crdtFactory.add(...args));
  }

  get value(): C {
    return this.register.value;
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
    this.register.set(value);
  }
}

/**
 * TODO: initial value (including after reset) throws
 * an error; optionalValue is the safe way to access it.
 */
export class LwwMutCRegister<C extends Crdt, SetArgs extends any[]>
  extends MutCRegisterFromRegister<C, SetArgs, LwwCRegister<C>>
  implements Resettable
{
  constructor(
    valueConstructor: (...args: SetArgs) => C,
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (registerValueSerializer) =>
        new LwwCRegister({ error: true }, registerValueSerializer),
      valueConstructor,
      argsSerializer
    );
  }

  get optionalValue(): Optional<C> {
    return this.register.optionalValue;
  }

  conflicts(): C[] {
    return this.register.conflicts();
  }

  conflictsMeta(): CRegisterEntryMeta<C>[] {
    return this.register.conflictsMeta();
  }

  reset() {
    this.crdtFactory.reset();
    this.register.reset();
  }
}
