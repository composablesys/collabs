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
  CollabIDSerializer,
  Serializer,
  CollabID,
} from "@collabs/core";
import { DeletingMutCSet } from "../set";
import { CVariableEntryMeta } from "./aggregate_variable";
import { OptionalLWWCVariable } from "./wins_variables";

export interface LWWMutCVariableEventsRecord<C extends Collab>
  extends CVariableEventsRecord<Optional<C>> {
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

export class LWWMutCVariable<C extends Collab, SetArgs extends unknown[]>
  extends CObject<LWWMutCVariableEventsRecord<C>>
  implements CVariable<Optional<C>, SetArgs>
{
  protected readonly valueFactory: DeletingMutCSet<C, SetArgs>;
  protected readonly variable: OptionalLWWCVariable<CollabID<C>>;

  constructor(
    initToken: InitToken,
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
      // We never perform set
      // operations referencing deleted values, hence our get() calls
      //  will never try to dereference a deleted value.
      // Note that would cease to be true if we added e.g. a restore op -
      // we would then need to use a ArchivingMutCSet instead.
      Pre(OptionalLWWCVariable)(new CollabIDSerializer(this.valueFactory))
    );

    // Events
    this.variable.on("Set", (event) => {
      const previousValue = event.previousValue.isPresent
        ? Optional.of(event.previousValue.get().get(this.valueFactory)!)
        : Optional.empty<C>();
      this.emit("Set", { previousValue, meta: event.meta });
    });
    this.valueFactory.on("Delete", (event) => this.emit("Delete", event));
  }

  set(...args: SetArgs): Optional<C> {
    this.valueFactory.clear();
    const value = this.valueFactory.add(...args);
    this.variable.set(CollabID.fromCollab(value, this.valueFactory));
    return Optional.of(value);
  }

  get value(): Optional<C> {
    const optionalValue = this.variable.value;
    return optionalValue.isPresent
      ? Optional.of(optionalValue.get().get(this.valueFactory)!)
      : Optional.empty<C>();
  }

  owns(value: C): boolean {
    return this.valueFactory.owns(value);
  }

  /**
   * [getArgs description]
   * @return an Optional of the SetArgs used to set this.value
   * (empty if this.value is an empty Optional)
   */
  getArgs(): Optional<SetArgs> {
    const value = this.value;
    if (value.isPresent) return Optional.of(this.getArgsByValue(value.get()));
    else return Optional.empty();
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

  conflicts(): C[] {
    return this.variable
      .conflicts()
      .map((valueID) => valueID.get(this.valueFactory)!);
  }

  conflictsMeta(): CVariableEntryMeta<C>[] {
    return this.variable.conflictsMeta().map((valueIDMeta) => {
      return {
        ...valueIDMeta,
        value: valueIDMeta.value.get(this.valueFactory)!,
      };
    });
  }

  clear() {
    this.valueFactory.clear();
    this.variable.clear();
  }

  /**
   * @return this.value + ""
   */
  toString(): string {
    return String(this.value);
  }
}
