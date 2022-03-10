import { CObject } from "../../constructions";
import { Collab, InitToken, Pre } from "../../core";
import { CRegister, CRegisterEventsRecord, CSetEvent } from "../../data_types";
import {
  DefaultSerializer,
  Optional,
  CollabSerializer,
  Serializer,
} from "../../util";
import { DeletingMutCSet } from "../set";
import { CRegisterEntryMeta } from "./aggregate_register";
import { OptionalLWWCRegister } from "./wins_registers";

export interface MutCRegisterEventsRecord<C extends Collab, Value>
  extends CRegisterEventsRecord<Value> {
  /**
   * Emitted when a value is deleted from the value factory.
   *
   * This happens only when the value is overwritten by
   * a *causally greater* value (or cleared). It does not always
   * happen when the value becomes no longer the set value,
   * since that may be due to a concurrently set value.
   *
   * Listen on this event to do cleanup for value that should
   * only happen when it's deleted from the value factory
   * (essentially, permanently deleted),
   * not just shadowed by a concurrently set value.
   */
  Delete: CSetEvent<C>;
}

export class MutCRegisterFromRegister<
    C extends Collab,
    SetArgs extends unknown[],
    Value,
    RegT extends CRegister<Value, [C]>,
    Events extends MutCRegisterEventsRecord<
      C,
      Value
    > = MutCRegisterEventsRecord<C, Value>
  >
  extends CObject<Events>
  implements CRegister<Value, SetArgs>
{
  protected readonly valueFactory: DeletingMutCSet<C, SetArgs>;
  protected readonly register: RegT;

  /**
   * Note initial value behavior
   * depends on that of the register returned by
   * registerCallback.
   *
   * @param registerCallback [description]
   */
  constructor(
    initToken: InitToken,
    registerCallback: (valueSerializer: Serializer<C>) => Pre<RegT>,
    valueConstructor: (valueInitToken: InitToken, ...args: SetArgs) => C,
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(initToken);
    this.valueFactory = this.addChild(
      "",
      Pre(DeletingMutCSet)(valueConstructor, [], argsSerializer)
    );
    this.register = this.addChild(
      "0",
      // CollabSerializer is safe here because we never perform set
      // operations referencing deleted values, hence this will never try to
      // deserialize a deleted value.
      // Note that would cease to be true if we added e.g. a restore op -
      // we would then need to use a TombstoneMutCSet instead.
      registerCallback(new CollabSerializer(this.valueFactory))
    );

    // Events
    this.register.on("Set", (event) => this.emit("Set", event));
    this.valueFactory.on("Delete", (event) => this.emit("Delete", event));
  }

  set(...args: SetArgs): Value | undefined {
    this.valueFactory.clear();
    return this.register.set(this.valueFactory.add(...args));
  }

  get value(): Value {
    return this.register.value;
  }

  owns(value: C): boolean {
    return this.valueFactory.owns(value);
  }

  /**
   * [getArgs description]
   * @param  value [description]
   * @return the SetArgs used to set value
   * @throws if value has been superseded by a causally
   * greater set value
   */
  getArgsByValue(value: C): SetArgs {
    return this.valueFactory.getArgs(value);
  }

  /**
   * @return this.value + ""
   */
  toString(): string {
    return String(this.value);
  }
}

export class LWWMutCRegister<
  C extends Collab,
  SetArgs extends unknown[]
> extends MutCRegisterFromRegister<
  C,
  SetArgs,
  Optional<C>,
  OptionalLWWCRegister<C>
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: SetArgs) => C,
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      Pre(OptionalLWWCRegister),
      valueConstructor,
      argsSerializer
    );
  }

  // Override set to state that it definitely
  // returns a value, since this is true of OptionalLWWCRegister.set.

  set(...args: SetArgs): Optional<C> {
    return super.set(...args)!;
  }

  conflicts(): C[] {
    return this.register.conflicts();
  }

  conflictsMeta(): CRegisterEntryMeta<C>[] {
    return this.register.conflictsMeta();
  }

  clear() {
    this.valueFactory.clear();
    this.register.clear();
  }

  /**
   * [getArgs description]
   * @return an Optional of the SetArgs used to set this.value
   * (empty if this.value is an empty Optional)
   */
  getArgs(): Optional<SetArgs> {
    const value = this.value;
    if (value.isPresent) return Optional.of(super.getArgsByValue(value.get()));
    else return Optional.empty();
  }
}
