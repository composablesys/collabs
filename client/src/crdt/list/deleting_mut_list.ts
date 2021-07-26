import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet } from "../set";
import { MovableMutCList, MovableMutCListEntry } from "./movable_mut_list";
import {
  TreedocDenseLocalList,
  TreedocLocWrapper,
} from "./treedoc_dense_local_list";

// TODO: reset.  It only actually works if DenseLocalList
// has no tombstones.  Perhaps this is a reason to just
// fix it to a particular implementation?

export class DeletingMutCList<C extends Crdt, InsertArgs extends any[]>
  extends MovableMutCList<
    C,
    InsertArgs,
    TreedocLocWrapper,
    DeletingMutCSet<
      MovableMutCListEntry<C, TreedocLocWrapper>,
      [TreedocLocWrapper, InsertArgs]
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
    return this.set.owns(
      value.parent as MovableMutCListEntry<C, TreedocLocWrapper>
    );
  }

  reset() {
    super.set.reset();
  }
}
