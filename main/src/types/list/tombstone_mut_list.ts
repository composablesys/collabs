import {
  ConstructorAsFunction,
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util";
import { Crdt, CrdtInitToken, Pre, isRuntime } from "../../core";
import { LwwCRegister } from "../register";
import { TombstoneMutCSet } from "../set";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";
import { RgaDenseLocalList, RgaLoc } from "./rga_dense_local_list";

export class TombstoneMutCList<
  C extends Crdt,
  InsertArgs extends any[]
> extends MovableMutCListFromSet<
  C,
  InsertArgs,
  RgaLoc,
  LwwCRegister<RgaLoc>,
  TombstoneMutCSet<
    MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>,
    [RgaLoc, InsertArgs]
  >,
  RgaDenseLocalList<MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>>
> {
  constructor(
    initToken: CrdtInitToken,
    valueConstructor: (valueInitToken: CrdtInitToken, ...args: InsertArgs) => C,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      initToken,
      Pre(TombstoneMutCSet),
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

  /**
   * Note: event will show up as Insert (if it is indeed
   * inserted, i.e., the restore wasn't redundant).
   * @param value [description]
   */
  restore(value: C): void {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    this.set.restore(
      value.parent as MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>
    );
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
   * @throws if this.owns(value) is false
   */
  getArgsByValue(value: C): InsertArgs {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) {
      throw new Error("this.owns(value) is false");
    }

    return this.set.getArgs(
      value.parent as MovableMutCListEntry<C, RgaLoc, LwwCRegister<RgaLoc>>
    )[1];
  }
}
