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
import { RgaDenseLocalList, RgaLoc } from "./rga_dense_local_list";

export class DeletingMutCList<C extends Crdt, InsertArgs extends any[]>
  extends MovableMutCListFromSet<
    C,
    InsertArgs,
    RgaLoc,
    LwwCRegister<RgaLoc>,
    DeletingMutCSet<
      MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>,
      [RgaLoc, InsertArgs]
    >,
    RgaDenseLocalList<MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>>
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
      new RgaDenseLocalList(initToken.runtime),
      valueConstructor,
      argsSerializer
    );
  }

  owns(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.owns(
      value.parent as MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>
    );
  }

  hasValue(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.has(
      value.parent as MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>
    );
  }

  reset() {
    // This is a proper observed-reset since RgaDenseLocalList
    // has no tombstones.
    super.set.reset();
  }

  getArgs(index: number): InsertArgs {
    return this.set.getArgs(
      this.get(index).parent as MovableMutCListEntry<
        C,
        RgaLoc,
        LwwCRegister<RgaLoc>
      >
    )[1];
  }

  /**
   * [getArgsByValue description]
   * @param  value [description]
   * @return       [description]
   * @throws if !this.hasValue(value)
   */
  getArgsByValue(value: C): InsertArgs {
    if (!this.hasValue(value)) {
      throw new Error("this.hasValue(value) is false");
    }

    return this.set.getArgs(
      value.parent as MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>
    )[1];
  }

  // TODO: conflicts methods for move locations?
  // Likewise for TombstoneMutCList.
}
