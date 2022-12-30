import {
  CollabIDSerializer,
  DefaultSerializer,
  Serializer,
  Collab,
  InitToken,
  Pre,
  AbstractCSetCObject,
  CollabID,
} from "@collabs/core";
import { AddWinsCSet } from "./add_wins_set";
import { DeletingMutCSet } from "./deleting_mut_set";

/**
 * Collab-valued [[CSet]] where deletions only "archive"
 * values.
 *
 * Archived values can continue being used on their own
 * and later be restored in the set, unlike in
 * [[DeletingMutCSet]]. Note that this comes at the
 * cost of increased memory usage: since deleted values
 * stick around forever, they consume memory forever.
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
   * [constructor description]
   * @param valueConstructor [description]
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
      Pre(DeletingMutCSet)(valueConstructor, initialValuesArgs, argsSerializer)
    );
    this.members = this.addChild(
      "0",
      Pre(AddWinsCSet)(new CollabIDSerializer<C>(this.mutSet))
    );
    this.deletedInitialValues = this.addChild(
      "1",
      Pre(AddWinsCSet)(new CollabIDSerializer<C>(this.mutSet))
    );
    this.initialValues = new Set(this.mutSet);

    // Events
    this.members.on("Add", (event) =>
      this.emit("Add", {
        value: event.value.get(this.mutSet)!,
        meta: event.meta,
      })
    );
    this.members.on("Delete", (event) =>
      this.emit("Delete", {
        value: event.value.get(this.mutSet)!,
        meta: event.meta,
      })
    );
  }

  add(...args: AddArgs): C {
    const value = this.mutSet.add(...args);
    this.members.add(CollabID.fromCollab(value, this.mutSet));
    return value;
  }

  restore(value: C) {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    this.members.add(CollabID.fromCollab(value, this.mutSet));
  }

  delete(value: C) {
    if (
      this.initialValues.has(value) &&
      !this.deletedInitialValues.has(CollabID.fromCollab(value, this.mutSet))
    ) {
      this.deletedInitialValues.add(CollabID.fromCollab(value, this.mutSet));
    }
    this.members.delete(CollabID.fromCollab(value, this.mutSet));
  }

  owns(value: C) {
    return this.mutSet.owns(value);
  }

  has(value: C) {
    if (this.initialValues.has(value)) {
      if (
        !this.deletedInitialValues.has(CollabID.fromCollab(value, this.mutSet))
      )
        return true;
    }
    return this.members.has(CollabID.fromCollab(value, this.mutSet));
  }

  /**
   * @param  value [description]
   * @return the AddArgs used to add value
   * @throws if !this.owns(value)
   */
  getArgs(value: C): AddArgs {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    return this.mutSet.getArgs(value);
  }

  *values() {
    for (const valueID of this.members.values())
      yield valueID.get(this.mutSet)!;
  }

  get size(): number {
    return this.members.size;
  }
}
