import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet } from "../set";
import { CRegisterEntryMeta } from "./aggregate_register";
import {
  CRegister,
  CRegisterEventsRecord,
  OptionalCRegister,
  OptionalCRegisterEventsRecord,
} from "./interfaces";
import { LwwCRegister } from "./wins_registers";

export class MutCRegisterFromRegister<
    C extends Crdt,
    SetArgs extends any[],
    R extends CRegister<C>,
    Events extends CRegisterEventsRecord<C> = CRegisterEventsRecord<C>
  >
  extends CompositeCrdt<Events>
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
      registerCallback(this.crdtFactory.valueSerializer())
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
}

/**
 * Initial value (including after reset) throws
 * an error; optionalValue is the safe way to access it.
 * Sim for SetOptional event and its previousOptionalValue.
 */
export class LwwMutCRegister<C extends Crdt, SetArgs extends any[]>
  extends MutCRegisterFromRegister<
    C,
    SetArgs,
    LwwCRegister<C>,
    OptionalCRegisterEventsRecord<C>
  >
  implements OptionalCRegister<C, SetArgs>, Resettable
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

    // Events
    this.register.on("OptionalSet", (event) => this.emit("OptionalSet", event));
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
