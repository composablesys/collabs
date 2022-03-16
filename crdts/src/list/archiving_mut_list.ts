import {
  Collab,
  InitToken,
  Pre,
  isRuntime,
  ConstructorAsFunction,
  DefaultSerializer,
  Serializer,
} from "@collabs/core";
import { LWWCVariable } from "../variable";
import { ArchivingMutCSet } from "../set";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";
import { Position } from "./position_source";

/**
 * Collab-valued [[CList]] where deletions only "archive"
 * values.
 *
 * Archived values can continue being used on their own
 * and later be restored in the list, unlike in
 * [[DeletingMutCList]]. Note that this comes at the
 * cost of increased memory usage: since deleted values
 * stick around forever, they consume memory forever.
 */
export class ArchivingMutCList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends MovableMutCListFromSet<
  C,
  InsertArgs,
  LWWCVariable<Position>,
  ArchivingMutCSet<
    MovableMutCListEntry<C, LWWCVariable<Position>>,
    [Position, InsertArgs]
  >
> {
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      (setValueConstuctor, setInitialValuesArgs, setArgsSerializer) =>
        Pre(ArchivingMutCSet)(setValueConstuctor, setArgsSerializer),
      ConstructorAsFunction(LWWCVariable),
      valueConstructor,
      [],
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
      value.parent as MovableMutCListEntry<C, LWWCVariable<Position>>
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
      value.parent as MovableMutCListEntry<C, LWWCVariable<Position>>
    );
  }

  getArgs(index: number): InsertArgs {
    return this.set.getArgs(
      this.get(index).parent as MovableMutCListEntry<C, LWWCVariable<Position>>
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
      value.parent as MovableMutCListEntry<C, LWWCVariable<Position>>
    )[1];
  }
}
