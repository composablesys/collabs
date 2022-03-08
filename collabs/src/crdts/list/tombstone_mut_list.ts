import {
  ConstructorAsFunction,
  DefaultSerializer,
  Serializer,
} from "../../util";
import { Collab, InitToken, Pre, isRuntime } from "../../core";
import { LWWCRegister } from "../register";
import { TombstoneMutCSet } from "../set";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";
import { RgaDenseLocalList, RgaLoc } from "./rga_dense_local_list";

export class TombstoneMutCList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends MovableMutCListFromSet<
  C,
  InsertArgs,
  RgaLoc,
  LWWCRegister<RgaLoc>,
  TombstoneMutCSet<
    MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>,
    [RgaLoc, InsertArgs]
  >,
  RgaDenseLocalList<MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>>
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      (setValueConstuctor, setInitialValuesArgs, setArgsSerializer) =>
        Pre(TombstoneMutCSet)(setValueConstuctor, setArgsSerializer),
      ConstructorAsFunction(LWWCRegister),
      new RgaDenseLocalList(initToken.runtime),
      valueConstructor,
      [],
      argsSerializer
    );
  }

  owns(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.owns(
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>
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
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>
    );
  }

  getArgs(index: number): InsertArgs {
    return this.set.getArgs(
      this.get(index).parent as MovableMutCListEntry<
        C,
        RgaLoc,
        LWWCRegister<RgaLoc>
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
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>
    )[1];
  }
}
