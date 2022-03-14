import {
  CVariable,
  CVariableEventsRecord,
  CSetEvent,
  DefaultSerializer,
  Collab,
  InitToken,
  Pre,
  CObject,
  Optional,
  CollabSerializer,
  Serializer,
} from "@collabs/core";
import { DeletingMutCSet } from "../set";
import { CVariableEntryMeta } from "./aggregate_variable";
import { OptionalLWWCVariable } from "./wins_variables";

export interface MutCVariableEventsRecord<C extends Collab, Value>
  extends CVariableEventsRecord<Value> {
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

export class MutCVariableFromVariable<
    C extends Collab,
    SetArgs extends unknown[],
    Value,
    VarT extends CVariable<Value, [C]>,
    Events extends MutCVariableEventsRecord<
      C,
      Value
    > = MutCVariableEventsRecord<C, Value>
  >
  extends CObject<Events>
  implements CVariable<Value, SetArgs>
{
  protected readonly valueFactory: DeletingMutCSet<C, SetArgs>;
  protected readonly variable: VarT;

  /**
   * Note initial value behavior
   * depends on that of the variable returned by
   * variableCallback.
   *
   * @param variableCallback [description]
   */
  constructor(
    initToken: InitToken,
    variableCallback: (valueSerializer: Serializer<C>) => Pre<VarT>,
    valueConstructor: (valueInitToken: InitToken, ...args: SetArgs) => C,
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(initToken);
    this.valueFactory = this.addChild(
      "",
      Pre(DeletingMutCSet)(valueConstructor, [], argsSerializer)
    );
    this.variable = this.addChild(
      "0",
      // CollabSerializer is safe here because we never perform set
      // operations referencing deleted values, hence this will never try to
      // deserialize a deleted value.
      // Note that would cease to be true if we added e.g. a restore op -
      // we would then need to use a ArchivingMutCSet instead.
      variableCallback(new CollabSerializer(this.valueFactory))
    );

    // Events
    this.variable.on("Set", (event) => this.emit("Set", event));
    this.valueFactory.on("Delete", (event) => this.emit("Delete", event));
  }

  set(...args: SetArgs): Value | undefined {
    this.valueFactory.clear();
    return this.variable.set(this.valueFactory.add(...args));
  }

  get value(): Value {
    return this.variable.value;
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

export class LWWMutCVariable<
  C extends Collab,
  SetArgs extends unknown[]
> extends MutCVariableFromVariable<
  C,
  SetArgs,
  Optional<C>,
  OptionalLWWCVariable<C>
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: SetArgs) => C,
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      Pre(OptionalLWWCVariable),
      valueConstructor,
      argsSerializer
    );
  }

  // Override set to state that it definitely
  // returns a value, since this is true of OptionalLWWCVariable.set.

  set(...args: SetArgs): Optional<C> {
    return super.set(...args)!;
  }

  conflicts(): C[] {
    return this.variable.conflicts();
  }

  conflictsMeta(): CVariableEntryMeta<C>[] {
    return this.variable.conflictsMeta();
  }

  clear() {
    this.valueFactory.clear();
    this.variable.clear();
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
