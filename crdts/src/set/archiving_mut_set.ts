import {
  AbstractCSetCObject,
  Collab,
  CollabID,
  CollabIDSerializer,
  DefaultSerializer,
  InitToken,
  Serializer,
} from "@collabs/core";
import { AddWinsCSet } from "./add_wins_set";
import { DeletingMutCSet } from "./deleting_mut_set";

/**
 * A set of mutable values, each represented by a [[Collab]] of type `C`.
 *
 * Because the values are Collabs, you can't add a new value by sending
 * it over the network directly. Instead, you supply arbitrary AddArgs
 * to [[add]], which sends those values over the network. Then all replicas
 * construct the actual value - replicas of a new Collab - by calling
 * the `valueConstructor` callback that you supply in the constructor.
 * See the constructor's docs for an example.
 *
 * When a value is deleted with [[delete]], it is archived and can still
 * be used, and it can be restored later with [[restore]]. Note this comes
 * at the cost of increased memory usage: since values are never deleted,
 * they will occupy memory forever once inserted.
 * See [[DeletingMutCList]] for an alternative semantics.
 */
export class ArchivingMutCSet<
  C extends Collab,
  AddArgs extends unknown[]
> extends AbstractCSetCObject<C, AddArgs> {
  private readonly mutSet: DeletingMutCSet<C, AddArgs>;
  private readonly members: AddWinsCSet<CollabID<C>>;
  private readonly initialValues: Set<C>;
  // OPT: doesn't need to be an add-wins set, it's just an "add once" set.
  private readonly deletedInitialValues: AddWinsCSet<CollabID<C>>;

  /**
   * Constructs a [[ArchivingMutCSet]] with the given valueConstructor and
   * optional arguments.
   *
   * The valueConstructor is a callback used to construct newly inserted
   * values. It takes arbitrary AddArgs, plus an [[InitToken]], and returns
   * a new value replica. For example, with value type [[CCounter]],
   * and taking an initial value as
   * the AddArgs (`AddArgs = [initialValue: number]`):
   * ```
   * import * as collabs from "@collabs/collabs";
   * // ...
   *
   * function valueConstructor(valueInitToken: collabs.InitToken, initialValue: number) {
   *   return new collabs.CCounter(valueInitToken, initialValue);
   * }
   * // app is a CRDTApp or CRDTContainer
   * const set = app.registerCollab(
   *   "set",
   *   (initToken) => new collabs.ArchivingMutCSet(initToken, valueConstructor)
   * );
   * ```
   * Then when any replica calls `list.add(initialValue)`, e.g. in response to
   * a user button click, all replicas run `valueConstructor` to create
   * a new counter value. These values are all linked, i.e., they
   * start with the same value (`initialValue`) and replicate each other's operations.
   *
   * For more info, see the [Guide](../../../guide/initialization.html#dynamically-created-collabs).
   *
   * @param initToken         [description]
   * @param valueConstructor  [description]
   * @param initialValuesArgs = [] Optional, use this to specify AddArgs for
   * initial values that are present when the list is created.
   * @param argsSerializer = DefaultSerializer.getInstance() Optional,
   * use this to specify a custom [[Serializer]] for InsertArgs.
   */
  constructor(
    init: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: AddArgs) => C,
    initialValuesArgs: AddArgs[] = [],
    argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance()
  ) {
    super(init);

    this.mutSet = this.addChild(
      "",
      (init) =>
        new DeletingMutCSet(
          init,
          valueConstructor,
          initialValuesArgs,
          argsSerializer
        )
    );
    this.members = this.addChild(
      "0",
      (init) => new AddWinsCSet(init, new CollabIDSerializer<C>(this.mutSet))
    );
    this.deletedInitialValues = this.addChild(
      "1",
      (init) => new AddWinsCSet(init, new CollabIDSerializer<C>(this.mutSet))
    );
    // TODO: mixin issues confusing eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.initialValues = new Set(this.mutSet);

    // Events
    this.members.on("Add", (event) =>
      this.emit("Add", {
        value: event.value.get()!,
        meta: event.meta,
      })
    );
    this.members.on("Delete", (event) =>
      this.emit("Delete", {
        value: event.value.get()!,
        meta: event.meta,
      })
    );
  }

  add(...args: AddArgs): C {
    const value = this.mutSet.add(...args);
    this.members.add(CollabID.of(value, this.mutSet));
    return value;
  }

  restore(value: C) {
    if (!this.mutSet.has(value)) {
      throw new Error("value did not originate from this set");
    }
    this.members.add(CollabID.of(value, this.mutSet));
  }

  delete(value: C) {
    if (
      this.initialValues.has(value) &&
      !this.deletedInitialValues.has(CollabID.of(value, this.mutSet))
    ) {
      this.deletedInitialValues.add(CollabID.of(value, this.mutSet));
    }
    this.members.delete(CollabID.of(value, this.mutSet));
  }

  has(value: C) {
    if (this.initialValues.has(value)) {
      if (!this.deletedInitialValues.has(CollabID.of(value, this.mutSet)))
        return true;
    }
    return this.members.has(CollabID.of(value, this.mutSet));
  }

  *values() {
    for (const value of this.initialValues) {
      if (!this.deletedInitialValues.has(CollabID.of(value, this.mutSet))) {
        yield value;
      }
    }
    for (const valueID of this.members.values()) yield valueID.get()!;
  }

  get size(): number {
    return (
      this.members.size +
      this.initialValues.size -
      this.deletedInitialValues.size
    );
  }
}
