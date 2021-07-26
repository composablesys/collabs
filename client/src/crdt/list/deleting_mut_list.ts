import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { DeletingMutCSet } from "../set";
import { DenseLocalList } from "./dense_local_list";
import { MovableMutCList, MovableMutCListEntry } from "./movable_mut_list";

// TODO: reset.  It only actually works if DenseLocalList
// has no tombstones.  Perhaps this is a reason to just
// fix it to a particular implementation?

export class DeletingMutCList<
  C extends Crdt,
  InsertArgs extends any[],
  I = TreedocLoc
> extends MovableMutCList<C, InsertArgs, I> {
  constructor(
    valueConstructor: (...args: InsertArgs) => C,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance(),
    denseLocalList: DenseLocalList<
      I,
      MovableMutCListEntry<C, I>
    > = new TreedocDenseLocalList()
  ) {
    super(
      (setValueConstructor, setArgsSerializer) =>
        new DeletingMutCSet(setValueConstructor, undefined, setArgsSerializer),
      valueConstructor,
      argsSerializer,
      denseLocalList
    );
  }

  owns(value: C): boolean {
    // TODO: might throw error due to double-parent.
    // Should change both owns methods to guard against this
    // (return false on rootCrdt).
    return (
      this.set as DeletingMutCSet<MovableMutCListEntry<C, I>, [I, InsertArgs]>
    ).owns(value.parent as MovableMutCListEntry<C, I>);
  }

  restore(value: C): void {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    (
      this.set as DeletingMutCSet<MovableMutCListEntry<C, I>, [I, InsertArgs]>
    ).restore(value.parent as MovableMutCListEntry<C, I>);
  }
}
