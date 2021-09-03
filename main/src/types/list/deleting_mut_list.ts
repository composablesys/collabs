import { Resettable } from "../../abilities";
import { Crdt, CrdtInitToken, Pre, isRuntime } from "../../core";
import {
  ConstructorAsFunction,
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util";
import { LwwCRegister } from "../register";
import { DeletingMutCSet } from "../set";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";
import {
  TreedocDenseLocalList,
  TreedocLocWrapper,
} from "./treedoc_dense_local_list";

export class DeletingMutCList<C extends Crdt, InsertArgs extends any[]>
  extends MovableMutCListFromSet<
    C,
    InsertArgs,
    TreedocLocWrapper,
    LwwCRegister<TreedocLocWrapper>,
    DeletingMutCSet<
      MovableMutCListEntry<
        C,
        TreedocLocWrapper,
        LwwCRegister<TreedocLocWrapper>
      >,
      [TreedocLocWrapper, InsertArgs]
    >,
    TreedocDenseLocalList<
      MovableMutCListEntry<
        C,
        TreedocLocWrapper,
        LwwCRegister<TreedocLocWrapper>
      >
    >
  >
  implements Resettable
{
  constructor(
    initToken: CrdtInitToken,
    valueConstructor: (valueInitToken: CrdtInitToken, ...args: InsertArgs) => C,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      initToken,
      (setValueConstructor, setArgsSerializer) =>
        Pre(DeletingMutCSet)(setValueConstructor, undefined, setArgsSerializer),
      ConstructorAsFunction(LwwCRegister),
      new TreedocDenseLocalList(initToken.runtime),
      valueConstructor,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.owns(
      value.parent as MovableMutCListEntry<
        C,
        TreedocLocWrapper,
        LwwCRegister<TreedocLocWrapper>
      >
    );
  }

  reset() {
    // This is a proper observed-reset since TreedocDenseLocalList
    // has no tombstones.
    super.set.reset();
  }

  // TODO: conflicts methods for move locations?
  // Likewise for TombstoneMutCList.
}
