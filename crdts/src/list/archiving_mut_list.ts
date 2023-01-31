import {
  Collab,
  DefaultSerializer,
  InitToken,
  Serializer,
} from "@collabs/core";
import { ArchivingMutCSet } from "../set";
import { LWWCVariable } from "../variable";
import { ListPosition } from "./list_position_source";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";

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
  LWWCVariable<ListPosition>,
  ArchivingMutCSet<
    MovableMutCListEntry<C, LWWCVariable<ListPosition>>,
    [ListPosition, InsertArgs]
  >
> {
  constructor(
    init: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      init,
      (setInit, setValueConstuctor, setInitialValuesArgs, setArgsSerializer) =>
        new ArchivingMutCSet(
          setInit,
          setValueConstuctor,
          setInitialValuesArgs,
          setArgsSerializer
        ),
      (variableInit, initialValue, variableSerializer) =>
        new LWWCVariable(variableInit, initialValue, variableSerializer),
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

  /**
   * Note: event will show up as Insert (if it is indeed
   * inserted, i.e., the restore wasn't redundant).
   * @param value [description]
   */
  restore(value: C): void {
    this.set.restore(
      value.parent as MovableMutCListEntry<C, LWWCVariable<ListPosition>>
    );
  }
}
