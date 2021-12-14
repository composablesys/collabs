import { CollabSerializer, DefaultSerializer } from "../../util";
import { Collab, InitToken, Serializer, Pre } from "../../core";
import { AbstractCSetCObject } from "./abstract_set";
import { AddWinsCSet } from "./add_wins_set";
import { DeletingMutCSet } from "./deleting_mut_set";

/**
 * Warning: tombstones, so uses ever-growing memory.  Use
 * with caution (e.g. only if it is itself in a
 * DeletingMut collection and will be deleted later).
 * Discuss alternatives.
 */
export class TombstoneMutCSet<
  C extends Collab,
  AddArgs extends any[]
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
    argsSerializer: Serializer<AddArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);

    this.mutSet = this.addChild(
      "",
      Pre(DeletingMutCSet)(valueConstructor, undefined, argsSerializer)
    );
    // Use a custom serializer that uses mutSet's ids instead
    // of full pathToRoot's, for network efficiency.
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
