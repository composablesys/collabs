import { Collab, InitToken, Pre, isRuntime } from "../../core";
import {
  ConstructorAsFunction,
  DefaultSerializer,
  Serializer,
} from "../../util";
import { LWWCRegister } from "../register";
import { DeletingMutCSet } from "../set";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";
import { RgaDenseLocalList, RgaLoc } from "./rga_dense_local_list";

export class DeletingMutCList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends MovableMutCListFromSet<
  C,
  InsertArgs,
  RgaLoc,
  LWWCRegister<RgaLoc>,
  DeletingMutCSet<
    MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>,
    [RgaLoc, InsertArgs]
  >,
  RgaDenseLocalList<MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>>
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      Pre(DeletingMutCSet),
      ConstructorAsFunction(LWWCRegister),
      new RgaDenseLocalList(initToken.runtime),
      valueConstructor,
      initialValuesArgs,
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

  hasValue(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.has(
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
   * @throws if !this.hasValue(value)
   */
  getArgsByValue(value: C): InsertArgs {
    if (!this.hasValue(value)) {
      throw new Error("this.hasValue(value) is false");
    }

    return this.set.getArgs(
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCRegister<RgaLoc>>
    )[1];
  }
}
