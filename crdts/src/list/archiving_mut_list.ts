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
import { ListPosition } from "./list_position_source";

/**
 * A list of mutable values, each represented by a [[Collab]] of type `C`.
 *
 * Because the values are Collabs, you can't insert a new value by sending
 * it over the network directly. Instead, you supply arbitrary InsertArgs
 * to [[insert]], which sends those values over the network. Then all replicas
 * construct the actual value - replicas of a new Collab - by calling
 * the `valueConstructor` callback that you supply in the constructor.
 * See the constructor's docs for an example.
 *
 * When a value is deleted with [[delete]], it is archived and can still
 * be used, and it can be restored later with [[restore]]. Note this comes
 * at the cost of increased memory usage: since values are never deleted,
 * they will occupy memory forever once inserted.
 * See [[DeletingMutCList]] for an alternative semantics.
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
  /**
   * Constructs an [[ArchivingMutCList]] with the given valueConstructor and
   * optional arguments.
   *
   * The valueConstructor is a callback used to construct newly inserted
   * values. It takes (arbitrary) InsertArgs, plus an [[InitToken]], and returns
   * a new value replica. For example, with value type [[CCounter]],
   * and taking an initial value as
   * the InsertArgs (`InsertArgs = [initialValue: number]`):
   * ```
   * import * as collabs from "@collabs/collabs";
   * // ...
   *
   * function valueConstructor(valueInitToken: collabs.InitToken, initialValue: number) {
   *   return new collabs.CCounter(valueInitToken, initialValue);
   * }
   * // app is a CRDTApp or CRDTContainer
   * const list = app.registerCollab(
   *   "list",
   *   (initToken) => new collabs.ArchivingMutCList(initToken, valueConstructor)
   * );
   * ```
   * Then when any replica calls `list.insert(index, initialValue)`, e.g. in response to
   * a user button click, all replicas run `valueConstructor` to create
   * a new counter value. These values are all linked, i.e., they
   * start with the same value (`initialValue`) and replicate each other's operations.
   *
   * For more info, see the [Guide](../../../guide/initialization.html#dynamically-created-collabs).
   *
   * @param initToken         [description]
   * @param valueConstructor  [description]
   * @param initialValuesArgs = [] Optional, use this to specify InsertArgs for
   * initial values that are present when the list is created.
   * @param argsSerializer = DefaultSerializer.getInstance() Optional,
   * use this to specify a custom [[Serializer]] for InsertArgs.
   */
  constructor(
    initToken: InitToken,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      (setValueConstuctor, setInitialValuesArgs, setArgsSerializer) =>
        Pre(ArchivingMutCSet)(
          setValueConstuctor,
          setInitialValuesArgs,
          setArgsSerializer
        ),
      ConstructorAsFunction(LWWCVariable),
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
      value.parent as MovableMutCListEntry<C, LWWCVariable<ListPosition>>
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
      value.parent as MovableMutCListEntry<C, LWWCVariable<ListPosition>>
    );
  }

  getArgs(index: number): InsertArgs {
    return this.set.getArgs(
      this.get(index).parent as MovableMutCListEntry<
        C,
        LWWCVariable<ListPosition>
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
      value.parent as MovableMutCListEntry<C, LWWCVariable<ListPosition>>
    )[1];
  }
}
