import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { AbstractCSetCompositeCrdt } from "./abstract_set";
import { AddWinsCSet } from "./add_wins_set";
import {
  DeletingMutCSet,
  DeletingMutCSetValueSerializer,
} from "./deleting_mut_set";

// TODO: generalized set version (not just AddWinsSet)?
// Tricky because of custom serializer.
// Would that work with concurrentOpRestores?  (Should be
// eventually consistent, but won't be exactly the intended
// semantics.)

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
    valueConstructor: (...args: AddArgs) => C,
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
      new AddWinsCSet(new DeletingMutCSetValueSerializer(this.mutSet))
    );

    if (concurrentOpRestores) {
      // Every operation on a value makes it present in
      // this.members.  Specifically, we make it as if there
      // is a this.restore(value) operation accompanying
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

  /**
   * Returns a short unique identifier for value
   * which can be passed to getById to retrieve
   * value later.
   *
   * TODO: should this be included?  In principle you can
   * always just use the Crdts themselves and let them
   * be serialized in long-form; this is just an opt,
   * which could in theory be supplanted by serialization/
   * batching opts.  Including for now since Geordie is
   * using it, however, I will leave it out of related classes.
   *
   * TODO: rename getId.
   *
   * @param  value [description]
   * @return           [description]
   * @throws if !this.owns(value)
   */
  idOf(value: C): string {
    return this.mutSet.idOf(value);
  }

  /**
   * Returns the value with the given uid, obtained
   * from idOf.  If value has been deleted, returns
   * undefined.
   *
   * @param  uid [description]
   * @return     [description]
   */
  getById(id: string): C | undefined {
    return this.mutSet.getById(id);
  }

  // TODO: doesn't seem useful, and it is not yet
  // present on TombstoneMutMap.
  // get sizeIncludeTombstones(): number {
  //   return this.mutSet.size;
  // }
}
