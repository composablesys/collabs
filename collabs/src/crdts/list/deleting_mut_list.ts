import { Collab, InitToken, Pre, isRuntime } from "../../core";
import {
  ConstructorAsFunction,
  DefaultSerializer,
  Serializer,
} from "../../util";
import { LWWCVariable } from "../variable";
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
  LWWCVariable<RgaLoc>,
  DeletingMutCSet<
    MovableMutCListEntry<C, RgaLoc, LWWCVariable<RgaLoc>>,
    [RgaLoc, InsertArgs]
  >,
  RgaDenseLocalList<MovableMutCListEntry<C, RgaLoc, LWWCVariable<RgaLoc>>>
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      Pre(DeletingMutCSet),
      ConstructorAsFunction(LWWCVariable),
      new RgaDenseLocalList(initToken.runtime),
      valueConstructor,
      initialValuesArgs,
      argsSerializer
    );
  }

  // Override insertion methods to state that they definitely
  // return a value, since this is true of DeletingMutCSet.add.

  insert(index: number, ...args: InsertArgs): C {
    return super.insert(index, ...args)!;
  }

  push(...args: InsertArgs): C {
    return super.push(...args)!;
  }

  unshift(...args: InsertArgs): C {
    return super.unshift(...args)!;
  }

  owns(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.owns(
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCVariable<RgaLoc>>
    );
  }

  hasValue(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.has(
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCVariable<RgaLoc>>
    );
  }

  getArgs(index: number): InsertArgs {
    return this.set.getArgs(
      this.get(index).parent as MovableMutCListEntry<
        C,
        RgaLoc,
        LWWCVariable<RgaLoc>
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
      value.parent as MovableMutCListEntry<C, RgaLoc, LWWCVariable<RgaLoc>>
    )[1];
  }
}
