import {
  CollabSerializer,
  DefaultSerializer,
  Serializer,
  Collab,
  InitToken,
  Pre,
  AbstractCSetCObject,
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
  private readonly members: AddWinsCSet<C>;

  /**
   * [constructor description]
   * @param valueConstructor [description]
   */
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: AddArgs) => C,
    argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance()
  ) {
    super(initToken);

    this.mutSet = this.addChild(
      "",
      Pre(DeletingMutCSet)(valueConstructor, undefined, argsSerializer)
    );
    // CollabSerializer is safe here because we never call mutSet.delete
    // or mutSet.clear.
    this.members = this.addChild(
      "0",
      Pre(AddWinsCSet)(new CollabSerializer<C>(this.mutSet))
    );

    // Events
    this.members.on("Add", (event) => this.emit("Add", event));
    this.members.on("Delete", (event) => this.emit("Delete", event));
  }

  add(...args: AddArgs): C {
    const value = this.mutSet.add(...args);
    this.members.add(value);
    return value;
  }

  restore(value: C) {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    this.members.add(value);
  }

  delete(value: C) {
    this.members.delete(value);
  }

  owns(value: C) {
    return this.mutSet.owns(value);
  }

  has(value: C) {
    return this.members.has(value);
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

  values() {
    return this.members.values();
  }

  get size(): number {
    return this.members.size;
  }
}
