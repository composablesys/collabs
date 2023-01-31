import {
  Collab,
  DefaultSerializer,
  InitToken,
  isRuntime,
  Serializer,
} from "@collabs/core";
import { DeletingMutCSet } from "../set";
import { LWWCVariable } from "../variable";
import { ListPosition } from "./list_position_source";
import {
  MovableMutCListEntry,
  MovableMutCListFromSet,
} from "./movable_mut_list_from_set";

export class DeletingMutCList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends MovableMutCListFromSet<
  C,
  InsertArgs,
  LWWCVariable<ListPosition>,
  DeletingMutCSet<
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
      (setInit, setValueConstructor, setInitialValuesArgs, setArgsSerializer) =>
        new DeletingMutCSet(
          setInit,
          setValueConstructor,
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

  hasValue(value: C): boolean {
    // Avoid errors from value.parent in case it
    // is the root.
    if (isRuntime(value.parent)) return false;

    return this.set.has(
      value.parent as MovableMutCListEntry<C, LWWCVariable<ListPosition>>
    );
  }
}
