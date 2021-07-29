import {
  ElementSerializer,
  DefaultElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt, Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet } from "../set";
import { CRegisterEntryMeta } from "./aggregate_register";
import { CRegister, CRegisterEventsRecord } from "./interfaces";
import { OptionalLwwCRegister } from "./wins_registers";

export class MutCRegisterFromRegister<
    C extends Crdt,
    SetArgs extends any[],
    Value,
    R extends CRegister<Value, [C]>,
    Events extends CRegisterEventsRecord<Value> = CRegisterEventsRecord<Value>
  >
  extends CompositeCrdt<Events>
  implements CRegister<Value, SetArgs> 
{
  protected readonly crdtFactory: DeletingMutCSet<C, SetArgs>;
  protected readonly register: R;

  /**
   * Note initial value behavior
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

  get value(): Value {
    return this.register.value;
  }

  owns(value: C): boolean {
    return this.crdtFactory.owns(value);
  }
}

export class LwwMutCRegister<C extends Crdt, SetArgs extends any[]>
  extends MutCRegisterFromRegister<
    C,
    SetArgs,
    Optional<C>,
    OptionalLwwCRegister<C>
  >
  implements Resettable
{
  constructor(
    valueConstructor: (...args: SetArgs) => C,
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (registerValueSerializer) =>
        new OptionalLwwCRegister(registerValueSerializer),
      valueConstructor,
      argsSerializer
    );
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
