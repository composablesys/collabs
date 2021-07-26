import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet } from "../set";
import { MovableMutCList, MovableMutCListEntry } from "./movable_mut_list";

// TODO: reset.  It only actually works if DenseLocalList
// has no tombstones.  Perhaps this is a reason to just
// fix it to a particular implementation?

export class DeletingMutCList<C extends Crdt, InsertArgs extends any[]>
  extends MovableMutCList<
    C,
    InsertArgs,
    TreedocLoc,
    DeletingMutCSet<
      MovableMutCListEntry<C, TreedocLoc>,
      [TreedocLoc, InsertArgs]
    >
  >
  implements Resettable
{
  constructor(
    valueConstructor: (...args: InsertArgs) => C,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (setValueConstructor, setArgsSerializer) =>
        new DeletingMutCSet(setValueConstructor, undefined, setArgsSerializer),
      new TreedocDenseLocalList(),
      valueConstructor,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    // TODO: might throw error due to double-parent.
    // Should change both owns methods to guard against this
    // (return false on rootCrdt).
    return this.set.owns(value.parent as MovableMutCListEntry<C, TreedocLoc>);
  }

  reset() {
    super.set.reset();
  }
}
