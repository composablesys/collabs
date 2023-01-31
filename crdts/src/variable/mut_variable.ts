import {
  CObject,
  Collab,
  CollabID,
  CollabIDSerializer,
  CSetEvent,
  CVariable,
  CVariableEventsRecord,
  DefaultSerializer,
  InitToken,
  Optional,
  OptionalSerializer,
  Serializer,
} from "@collabs/core";
import { DeletingMutCSet } from "../set";
import { LWWCVariable } from "./lww_variable";

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
  private readonly valueFactory: DeletingMutCSet<C, SetArgs>;
  private readonly variable: LWWCVariable<Optional<CollabID<C>>>;

  constructor(
    init: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: SetArgs) => C,
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(init);
    this.valueFactory = this.addChild(
      "",
      (init) => new DeletingMutCSet(init, valueConstructor, [], argsSerializer)
    );
    this.variable = this.addChild(
      "0",
      (init) =>
        new LWWCVariable(
          init,
          Optional.empty(),
          OptionalSerializer.getInstance(
            new CollabIDSerializer(this.valueFactory)
          )
        )
    );

    // Events
    this.variable.on("Set", (event) => {
      const previousValue = event.previousValue.isPresent
        ? Optional.of(event.previousValue.get().get()!)
        : Optional.empty<C>();
      this.emit("Set", { value: this.value, previousValue, meta: event.meta });
    });
    this.valueFactory.on("Delete", (event) => this.emit("Delete", event));
  }

  set(...args: SetArgs): Optional<C> {
    this.valueFactory.clear();
    const value = this.valueFactory.add(...args);
    this.variable.set(Optional.of(CollabID.of(value, this.valueFactory)));
    return Optional.of(value);
  }

  get value(): Optional<C> {
    const optionalValue = this.variable.value;
    return optionalValue.isPresent
      ? Optional.of(optionalValue.get().get()!)
      : Optional.empty<C>();
  }

  conflicts(): C[] {
    return this.variable.conflicts().map((valueID) => valueID.get().get()!);
  }

  // TODO: would like to remove this, but it's used by the selector demo.
  getArgs(): Optional<SetArgs> {
    return this.variable.value.map((value) =>
      this.valueFactory.getArgs(value.get()!)
    );
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
