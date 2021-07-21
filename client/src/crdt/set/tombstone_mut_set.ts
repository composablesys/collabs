import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util";
import { Crdt, Runtime } from "../core";
import { AbstractCSetCompositeCrdt } from "./abstract_set";
import { AddWinsCSet } from "./add_wins_set";
import { DeletingMutCSet } from "./deleting_mut_set";

// TODO: generalized set version (not just AddWinsSet)?
// Tricky because of custom serializer.
// Would that work with concurrentOpRestores?  (Should be
// eventually consistent, but won't be exactly the intended
// semantics.)

class TombstoneMutCSetSerializer<C extends Crdt>
  implements ElementSerializer<C>
{
  constructor(private readonly mutSet: DeletingMutCSet<C, any>) {}

  serialize(value: C): Uint8Array {
    return stringAsArray(this.mutSet.idOf(value));
  }

  deserialize(message: Uint8Array, _runtime: Runtime): C {
    return this.mutSet.getById(arrayAsString(message))!;
  }
}

/**
 * TODO: tombstones, so uses ever-growing memory.  Use
 * with caution (e.g. only if it is itself in a
 * DeletingMut collection and will be deleted later).
 * Discuss alternatives.
 */
export class TombstoneMutCSet<
  C extends Crdt,
  AddArgs extends any[]
> extends AbstractCSetCompositeCrdt<C, AddArgs> {
  private readonly mutSet: DeletingMutCSet<C, AddArgs>;
  private readonly members: AddWinsCSet<C>;

  /**
   * [constructor description]
   * @param valueConstructor [description]
   * @param concurrentOpRestores if true, then when an
   * operation is performed on a value concurrent to its
   * deletion, the value is automatically restored.  This may
   * match user expectations in some scenarios, e.g., if
   * one user is working on something while another deletes it,
   * their concurrent work undoes the deletion.  Defaults to false.
   */
  constructor(
    valueConstructor: (sender: string, ...args: AddArgs) => C,
    concurrentOpRestores = false,
    argsSerializer: ElementSerializer<AddArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.mutSet = this.addChild(
      "",
      new DeletingMutCSet(valueConstructor, undefined, argsSerializer)
    );
    // Use a custom serializer that uses mutSet's ids instead
    // of full pathToRoot's, for network efficiency.
    this.members = this.addChild(
      "0",
      new AddWinsCSet(new TombstoneMutCSetSerializer(this.mutSet))
    );

    if (concurrentOpRestores) {
      // Every operation on a value makes it present in
      // this.members.  Specifically, we make it as if there
      // is a this.members.add(value) operation accompanying
      // every operation on value.
      this.mutSet.on("ValueInit", (event) => {
        const value = event.value;
        value.on("Change", (event2) => {
          this.runtime.runLocally(event2.timestamp, () => {
            this.members.add(value);
          });
        });
      });
    }

    // Events
    this.members.on("Add", (event) => this.emit("Add", event));
    this.members.on("Delete", (event) => this.emit("Delete", event));
    this.mutSet.on("ValueInit", (event) => this.emit("ValueInit", event));
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

  values() {
    return this.members.values();
  }

  get size(): number {
    return this.members.size;
  }

  valuesIncludeTombstones() {
    return this.mutSet.values();
  }

  get sizeIncludeTombstones(): number {
    return this.mutSet.size;
  }
}
